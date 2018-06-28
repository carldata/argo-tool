import * as _ from 'lodash';
import * as React from 'react';
import * as d3 from 'd3';
import { IResizableScss, withFitToParent, IUnixTimePoint } from 'time-series-scroller';
import { FlowIntensityUnits, RainfallUnits } from '@components/auxiliary/units';
import { convertToDateSignal } from './calculations';
import { plotPredictions } from './plotting/prediction-plotting';
import { IStormEvent } from './models/storm-event';
import { plotLegend } from './plotting/legend-plotting';
import { ISample } from './models/signal-sample';

export { IStormEvent };

export interface IRdiiScss extends IResizableScss {
  marginLeftPx: number;
  marginRightPx: number;
  marginTopPx: number;
  marginBottomPx: number;
  rainfallToSignalsHeightRatio: number;
  flowColor: string;
  rdii1Color: string;
  rdii2Color: string;
  rdii3Color: string;
  dwpColor: string;
  rainfallColor: string;
}

export interface IRdiiChartProps {
  stormEvent: IStormEvent<Date>;
  flowIntensityUnits: FlowIntensityUnits;
  rainfallUnits: RainfallUnits;
  scss: IRdiiScss;
  refCallback?: (ref: any) => void;
}

class RdiiChartChartBase extends React.Component<IRdiiChartProps> {
  private svgRef: SVGElement;
  private strokeOpacity: number = 0;

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
      .domain(d3.extent(this.props.stormEvent.index));

    const se = this.props.stormEvent;

    const yMin = _.min(_.concat(se.dwp, se.flow, se.rdii1, se.rdii2, se.rdii3));
    const yMax = _.max(_.concat(se.dwp, se.flow, se.rdii1, se.rdii2, se.rdii3));

    const flowY = d3.scaleLinear()
      .range([(1.0 - this.props.scss.rainfallToSignalsHeightRatio) * height, 0])
      .domain([yMin, yMax]);

    const rainY = d3.scaleLinear()
      .range([0, (this.props.scss.rainfallToSignalsHeightRatio * height) - this.props.scss.marginTopPx])
      .domain(d3.extent(se.rainfall));

    const line = d3.line()
      .x((d: ISample<Date>) => time(d.index))
      .y((d: ISample<Date>) => flowY(d.value));

    const flowData = convertToDateSignal(se.index, se.flow);
    const rdii1Data = convertToDateSignal(se.index, se.rdii1);
    const rdii2Data = convertToDateSignal(se.index, se.rdii2);
    const rdii3Data = convertToDateSignal(se.index, se.rdii3);
    const dryWeatherPatternFlowData = convertToDateSignal(se.index, se.dwp);
    const rainfallData = convertToDateSignal(se.index, se.rainfall);

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
      .datum(dryWeatherPatternFlowData)
      .attr('stroke', this.props.scss.dwpColor)
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', line);

    if (!_.isEmpty(rdii1Data)) {
      plotPredictions(singalsG, rdii1Data, this.props.scss.rdii1Color, line, flowY, time);
    }
    if (!_.isEmpty(rdii2Data)) {
      plotPredictions(singalsG, rdii2Data, this.props.scss.rdii2Color, line, flowY, time);
    }
    if (!_.isEmpty(rdii3Data)) {
      plotPredictions(singalsG, rdii3Data, this.props.scss.rdii3Color, line, flowY, time);
    }

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
      .text(`Flow ${this.props.flowIntensityUnits}`);

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

    plotLegend(g, this.props.scss, !_.isEmpty(this.props.stormEvent.rdii2), !_.isEmpty(this.props.stormEvent.rdii3));
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
      id='rdii-storm-events-chart'
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