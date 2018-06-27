import * as _ from 'lodash';
import * as d3 from 'd3';

interface IBBox { x: number; y: number; width: number; height: number; }

export interface ID3LegendConfig {
  drawBorder: boolean;
  margin: number;
  positionX: number;
  positionY: number;
  fontSize?: number;
  verticalSpacing: number;
  horizontalSpacing: number;
  rows: number;
  columns: number;
}

export interface ID3LegendLayoutCallback {
  columnIndex: number;
  rowIndex: number;
  gElementAttached: any;
}

interface ICallbackFunctionResultExtended extends ID3LegendLayoutCallback {
  bbox: IBBox;
}

export type ICallbackFunction = (parentElement: d3.Selection<any>, indices: { columnIndex: number, rowIndex: number, seqIndex: number}) => ID3LegendLayoutCallback;

export class D3LegendGridLayout {
  private groupingElement: d3.Selection<any>;
  private config: ID3LegendConfig;
  private figureDimensions = { offsetX: 5, offsetY: 5, r: 3 };
  private textDimensions = { offsetX: 10, offsetY: 10 };

  private getFontSize = (): string => _.isNumber(this.config.fontSize) ? `${this.config.fontSize}px` : '12px';

  constructor(config: ID3LegendConfig) {
    this.config = config;
  }

  public circleWithLabel(color: string, filled: boolean, label: string) {
    const result = this.groupingElement.append('g');
    const circle = result.append('circle')
      .attr('r', this.figureDimensions.r + (filled ? 1 : 0))
      .attr('cx', this.figureDimensions.offsetX)
      .attr('cy', this.figureDimensions.offsetY);
    if (filled) {
      circle.attr('fill', color);
    } else {
      circle.attr('stroke', color);
      circle.attr('stroke-width', 2);
      circle.attr('fill','none');
    }
    result.append('text')
      .attr('x', this.textDimensions.offsetX)
      .attr('y', this.textDimensions.offsetY)
      .attr('font-size', this.getFontSize())
      .text(label);
    return result;
  }

  public lineWithLabel(color: string, label: string) {
    const result = this.groupingElement.append('g');
    const text = result.append('text')
      .attr('x', this.textDimensions.offsetX)
      .attr('y', this.textDimensions.offsetY)
      .attr('font-size', this.getFontSize())
      .text(label);
    const bbox: IBBox = text.node().getBBox();
    const rect = result.append('rect')
      .attr('x', 1)
      .attr('y', 3)
      .attr('width', this.textDimensions.offsetX - 2)
      .attr('height', 4)
      .attr('fill', color);
    return result;
  }

  public squareWithLabel(color: string, filled: boolean, label: string) {
    const result = this.groupingElement.append('g');
    const rect = result.append('rect')
      .attr('x', this.figureDimensions.offsetX - this.figureDimensions.r - 1)
      .attr('y', this.figureDimensions.offsetY - this.figureDimensions.r - 1)
      .attr('width', 2 * this.figureDimensions.r + 2)
      .attr('height', 2 * this.figureDimensions.r + 2);
    if (filled) {
      rect.attr('fill', color);
    } else {
      rect.attr('stroke', color);
      rect.attr('stroke-width', 2);
      rect.attr('fill','none');
    }
    result.append('text')
      .attr('x', this.textDimensions.offsetX)
      .attr('y', this.textDimensions.offsetY)
      .attr('font-size', this.getFontSize())
      .text(label);
    return result;
  }

  public plot(parentElement: d3.Selection<any>, callback: ICallbackFunction) {
    this.groupingElement = parentElement.append('g');
    const callbackResults: ICallbackFunctionResultExtended[] = [];
    for (let columnIndex = 0; columnIndex < this.config.columns; columnIndex++) {
      for (let rowIndex = 0; rowIndex < this.config.rows; rowIndex++) {
        const callbackResult: ID3LegendLayoutCallback = callback(this.groupingElement,
          { columnIndex, rowIndex, seqIndex: columnIndex * this.config.rows + rowIndex });
        const callbackResultExtended: ICallbackFunctionResultExtended = _.extend(callbackResult, { bbox: null });
        if (_.isObject(callbackResultExtended.gElementAttached)) {
          callbackResultExtended.bbox = callbackResult.gElementAttached.node().getBBox();
        } 
        callbackResults.push(callbackResultExtended);
      }
    }
    let [x, y, maxWidthMeasuredInColumn] = [this.config.margin, this.config.margin, 0];
    for (let columnIndex = 0; columnIndex < this.config.columns; columnIndex++) {
      for (let rowIndex = 0; rowIndex < this.config.rows; rowIndex++) {
        if (rowIndex === 0) {
          y = this.config.margin;
          maxWidthMeasuredInColumn = 0;
        }
        const callbackResult = _.find(callbackResults, (el) => el.columnIndex === columnIndex && el.rowIndex === rowIndex);
        if (_.isObject(callbackResult.gElementAttached)) {
          maxWidthMeasuredInColumn = _.max([maxWidthMeasuredInColumn, callbackResult.bbox.width]);
          callbackResult.gElementAttached.attr('transform', `translate(${x}, ${y})`);
          y = y + callbackResult.bbox.height + this.config.horizontalSpacing;
        }
      }
      x = x + maxWidthMeasuredInColumn + this.config.verticalSpacing;
    }
    if (this.config.drawBorder) {
      const bbox: IBBox = this.groupingElement.node().getBBox();
      this.groupingElement
        .append('rect')
        .attr('width', bbox.width + 2 * this.config.margin)
        .attr('height', bbox.height + 2 * this.config.margin)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .attr('x', 0)
        .attr('y', 0);
    }
    this.groupingElement.attr('transform', `translate(${this.config.positionX}, ${this.config.positionY})`);
  }
}