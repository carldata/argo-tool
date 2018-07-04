import * as _ from 'lodash';
import * as React from 'react';
import { RdiiChart, IStormEvent, IRdiiScss } from '@components/prediction-chart';
import axios, { AxiosResponse } from 'axios';
import { FlowIntensityUnits, RainfallUnits } from '@components/auxiliary/units';
import { IPrediction } from '@components/prediction-chart/models/prediction';

export interface IRdiiChartWrapperProps {
  url: string;
  urlPredictions?: string;
  flowIntensityUnits: FlowIntensityUnits;
  rainfallUnits: RainfallUnits;
  scss: IRdiiScss;
}

interface IRdiiChartWrapperState {
  stormEvent?: IStormEvent<Date>;
  prediction: IPrediction<Date>;
}

export class RdiiChartWrapper extends React.Component<IRdiiChartWrapperProps, IRdiiChartWrapperState> {
  constructor(props) {
    super(props);
    this.state = {
      stormEvent: null,
      prediction: null,
    };
  }

  public componentDidMount() {
    axios.get<IStormEvent<string>>(`json/rdiis/${this.props.url}`).then((d: AxiosResponse<IStormEvent<string>>) => {
      this.setState({
        stormEvent: { ...d.data, index: _.map(d.data.index, (i) => new Date(i)) },
      });
    });

    axios.get<IPrediction<string>>(`json/rdiis/${this.props.url}`).then((d: AxiosResponse<IPrediction<string>>) => {
      this.setState({
        prediction: { ...d.data, index: _.map(d.data.index, (i) => new Date(i)) },
      });
    });
  }

  public render() {
    return _.isObject(this.state.stormEvent) ?
      <RdiiChart {...this.props} stormEvent={this.state.stormEvent} prediction={this.state.prediction}  /> :
      <div>Is loading</div>;
  }
}