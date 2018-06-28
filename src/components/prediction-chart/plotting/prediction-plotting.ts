import * as _ from 'lodash';
import * as React from 'react';
import * as d3 from 'd3';
import { IDateSignal, ISample } from '../models/signal-sample';

export const plotPredictions = (g: d3.Selection<any>,
                                rdii: IDateSignal,
                                rdiiSignalColor: string,
                                line: any,
                                flowY: (arg: number) => void,
                                time: (arg: Date) => void): d3.Selection<any> => {
  const maxUnixTimePoint: ISample<Date> =  _.reduce(rdii,
                                                    (acc, el) => (el.value > acc.value) ? el : acc,
                                                    { index: new Date(), value: Number.MIN_SAFE_INTEGER });
  g.append('path')
    .datum(rdii)
    .attr('stroke', rdiiSignalColor)
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('d', line);

  const result = g.append('circle')
    .attr('cx', time(maxUnixTimePoint.index))
    .attr('cy', flowY(maxUnixTimePoint.value))
    .attr('r', 8)
    .attr('stroke', rdiiSignalColor)
    .attr('stroke-width', 3)
    .attr('fill', 'none');

  return result;
};
