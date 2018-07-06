import * as _ from 'lodash';
import * as React from 'react';
import { RdiiChart, IPredictionScss } from '@components/prediction-chart';
import axios, { AxiosResponse } from 'axios';
import { FlowIntensityUnits, RainfallUnits } from '@components/auxiliary/units';
import { IPrediction } from '@components/prediction-chart/models/prediction';

export interface IRdiiChartWrapperProps {
  url: string;
  flowIntensityUnits: FlowIntensityUnits;
  rainfallUnits: RainfallUnits;
  scss: IPredictionScss;
}

interface IRdiiChartWrapperState {
  prediction: IPrediction<Date>;
}

export class RdiiChartWrapper extends React.Component<IRdiiChartWrapperProps, IRdiiChartWrapperState> {
  constructor(props) {
    super(props);
    this.state = {
      prediction: null,
    };
  }

  public componentDidMount() {
    axios.get<IPrediction<string>>(`json/rdiis/${this.props.url}`).then((d: AxiosResponse<IPrediction<string>>) => {
      this.setState({
        prediction: { ...d.data, index: _.map(d.data.index, (i) => new Date(i)) },
      });
    });
  }

  public render() {
    return _.isObject(this.state.prediction) ?
      <RdiiChart {...this.props} prediction={this.state.prediction} /> :
      <div>Is loading</div>;
  }
}