import * as _ from 'lodash';
import * as React from 'react';
import * as d3 from 'd3';
import { IResizableScss, withFitToParent } from 'time-series-scroller';
import { FlowIntensityUnits, RainfallUnits } from '@components/auxiliary/units';
import { convertToDateSignal } from '@components/prediction-chart/calculations';
import { plotLegend } from '@components/prediction-chart/plotting/legend-plotting';
import { ISample } from '@components/prediction-chart/models/signal-sample';
import { IPrediction } from '@components/prediction-chart/models/prediction';

export { IPrediction };

export interface IPredictionScss extends IResizableScss {
  marginLeftPx: number;
  marginRightPx: number;
  marginTopPx: number;
  marginBottomPx: number;
  rainfallToSignalsHeightRatio: number;
  flowColor: string;
  predictionColor: string;
  rainfallColor: string;
}

export interface IRdiiChartProps {
  prediction: IPrediction<Date>;
  flowIntensityUnits: FlowIntensityUnits;
  rainfallUnits: RainfallUnits;
  scss: IPredictionScss;
  refCallback?: (ref: any) => void;
}

class RdiiChartChartBase extends React.Component<IRdiiChartProps> {
  private svgRef: SVGElement;

  constructor(props: IRdiiChartProps) {
    super(props);
  }

  private plot(ref: SVGElement) {
    const svg = d3.select(ref);
    svg.select('g').remove(); // clear chart
    const g = svg.append('g');
    const width = +svg.attr('width') - this.props.scss.marginLeftPx - this.props.scss.marginRightPx;
    const height = +svg.attr('height') - this.props.scss.marginTopPx - this.props.scss.marginBottomPx;
    const singalsG = g
                     .append('g')
                     .attr('transform',
                           `translate(${this.props.scss.marginLeftPx},
                                      ${this.props.scss.marginTopPx + (height * this.props.scss.rainfallToSignalsHeightRatio)})`);
    const rainG = g.append('g').attr('transform', `translate(${this.props.scss.marginLeftPx}, ${this.props.scss.marginTopPx})`);

    const time = d3.scaleTime()
      .range([0, width])
      .domain(d3.extent(this.props.prediction.index));

    const prediction = this.props.prediction;

    const yMin = _.min(_.concat(prediction.prediction, prediction.flow));
    const yMax = _.max(_.concat(prediction.prediction, prediction.flow));

    const flowY = d3.scaleLinear()
      .range([(1.0 - this.props.scss.rainfallToSignalsHeightRatio) * height, 0])
      .domain([yMin, yMax]);

    const rainY = d3.scaleLinear()
      .range([0, (this.props.scss.rainfallToSignalsHeightRatio * height) - this.props.scss.marginTopPx])
      .domain(d3.extent(prediction.rainfall));

    const line = d3.line()
      .x((d: ISample<Date>) => time(d.index))
      .y((d: ISample<Date>) => flowY(d.value));

    const flowData = convertToDateSignal(prediction.index, prediction.flow);
    const predictionData = convertToDateSignal(prediction.index, prediction.prediction);
    const rainfallData = convertToDateSignal(prediction.index, prediction.rainfall);

    singalsG
      .append('g')
      .attr('transform', `translate(0, ${(1.0 - this.props.scss.rainfallToSignalsHeightRatio) * height})`)
      .call(d3.axisBottom(time));

    singalsG
      .append('g')
      .call(d3.axisLeft(flowY));

    singalsG
      .append('path')
      .datum(flowData)
      .attr('stroke', this.props.scss.flowColor)
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', line);

    singalsG
      .append('path')
      .datum(predictionData)
      .attr('stroke', this.props.scss.predictionColor)
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', line);

    rainG
      .append('g')
      .call(d3.axisLeft(rainY))
      .append('text')
      .attr('transform', `rotate (-90) translate(${-this.props.scss.marginTopPx},${-this.props.scss.marginLeftPx})`)
      .attr('fill', 'black')
      .attr('font-size', '11px')
      .attr('dy', '0.71em')
      .text(`Rainfall ${this.props.rainfallUnits}`);

    singalsG
      .append('g')
      .call(d3.axisLeft(flowY))
      .append('text')
      .attr('transform', `rotate (-90) translate(${-this.props.scss.marginTopPx},${-this.props.scss.marginLeftPx})`)
      .attr('fill', 'black')
      .attr('font-size', '11px')
      .attr('dy', '0.71em')
      .text(`${this.props.flowIntensityUnits}`);

    rainG
      .append('g')
      .selectAll('rect')
      .data(rainfallData)
      .enter()
      .append('rect')
      .attr('x', (d: ISample<Date>) => time(d.index))
      .attr('y', 0)
      .attr('width', 4)
      .attr('height', (d: ISample<Date>) => rainY(d.value))
      .attr('fill', this.props.scss.rainfallColor);

    plotLegend(g, this.props.scss);
  }

  private plotChart = () => {
    if (!_.isObject(this.svgRef)) {
      return;
    }
    this.plot(this.svgRef);
  }

  public render() {
    this.plotChart();
    return <svg
      id='prediction-chart'
      width={this.props.scss.widthPx}
      height={this.props.scss.heightPx}
      ref={(ref) => {
        this.svgRef = ref;
        this.props.refCallback(ref);
        this.plotChart();
      }} />;
  }
}

export const RdiiChart = withFitToParent<IRdiiChartProps>(RdiiChartChartBase);