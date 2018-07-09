import * as _ from 'lodash';
import * as React from 'react';
import { RdiiChart, IPredictionScss } from '@components/prediction-chart';
import axios, { AxiosResponse } from 'axios';
import { FlowIntensityUnits, RainfallUnits } from '@components/auxiliary/units';
import { IPrediction } from '@components/prediction-chart/models/prediction';
import { convertCsvStringToTimeSeries } from '@screens/project/algorithms/auxiliary';
import { IUnixTimePoint } from '../node_modules/time-series-scroller';

export interface IPredictionChartWrapperProps {
  flowCsvName: string;
  predictionCsvName: string;
  rainfallCsvName: string;
  flowIntensityUnits: FlowIntensityUnits;
  rainfallUnits: RainfallUnits;
  scss: IPredictionScss;
}

interface IPredictionChartWrapperState {
  prediction: IPrediction<Date>;
}

export class PredictionChartWrapper extends React.Component<IPredictionChartWrapperProps, IPredictionChartWrapperState> {
  constructor(props) {
    super(props);
    this.state = {
      prediction: null,
    };
  }

  public componentDidMount() {
    Promise
      .all([axios.get(`http://localhost:3900/static-csv/${this.props.flowCsvName}`),
            axios.get(`http://localhost:3900/static-csv/${this.props.predictionCsvName}`),
            axios.get(`http://localhost:3900/static-csv/${this.props.rainfallCsvName}`)])
      .then((results) => {
        const [flowResult, predictionResult, rainfallResult] = results;
        const flowTimeSeries = convertCsvStringToTimeSeries(flowResult.data);
        const predictionTimeSeries = convertCsvStringToTimeSeries(predictionResult.data);
        const rainfallTimeSeries = convertCsvStringToTimeSeries(rainfallResult.data);
        const indexMapByFlow: Map<number, Date> = _.reduce<IUnixTimePoint[], Map<number, Date>>(flowTimeSeries, (acc, el) => acc, new Map<number, Date>());

        this.setState({
          prediction: {
            index: _.toArray(indexMapByFlow.values),
            flow: flowTimeSeries.map((el) => indexMapByFlow.has(el.unix) ? el.value : 0),
            prediction: predictionTimeSeries.map((el) => indexMapByFlow.has(el.unix) ? el.value : 0),
            rainfall: rainfallTimeSeries.map((el) => indexMapByFlow.has(el.unix) ? el.value : 0),
          }
        });
      });
  }

  public render() {
    return _.isObject(this.state.prediction) ?
      <RdiiChart {...this.props} prediction={this.state.prediction} /> :
      <div>Is loading</div>;
  }
}