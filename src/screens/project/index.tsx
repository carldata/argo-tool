import * as React from 'react';
import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '@store/state';
import {
  ISelectedDateChangedActionCreator,
  selectedDateChanged,
} from './action-creators';
import { GenericMessageModalContainer } from '@components/generic-message-modal';
import { IUiSettings } from '@business-logic/configuration/models/ui-settings';
import { IProjectScreenState } from './models';
import { DataGrid } from './components/data-grid';
import { PredictionChart, IPrediction } from './components/prediction-chart';
import { createPredictionFromTimeSeries } from './algorithms/create-prediction-from-time-series';

interface IScreenProps extends IProjectScreenState {
  uiSettings: IUiSettings;
}

interface IScreenState {
  date: Date;
  prediction: IPrediction<Date>;
}

interface IDispatchProps {
  selectedDateChanged: ISelectedDateChangedActionCreator;
}

export class ProjectScreen extends React.Component<IScreenProps & IDispatchProps, IScreenState> {
  constructor(props: IScreenProps & IDispatchProps) {
    super(props);
    this.state = {
      date: new Date(),
      prediction: null,
    };
  }

  public componentWillReceiveProps(nextProps: IScreenProps) {
    if ((JSON.stringify(this.props.calculations) !== JSON.stringify(nextProps.calculations)) && (!_.isEmpty(nextProps.calculations))) {
      this.setState({
        prediction: createPredictionFromTimeSeries(
          _.first(nextProps.calculations).flowTimeSeries,
          _.first(nextProps.calculations).predictionTimeSeries,
          _.first(nextProps.calculations).rainfallTimeSeries),
      });
    }
  }

  public render() {
    return <div>
      <h5>Project Screen</h5>
      <form>
        <div className='form-group'>
          <label>Selected date:</label>
          <input
            type='date'
            onChange={(e) => {
              this.setState({ date: dateFns.parse(e.currentTarget.value) });
              this.props.selectedDateChanged(dateFns.parse(e.currentTarget.value));
            }}
            value={dateFns.format(this.state.date, 'YYYY-MM-DD')} />
        </div>
        <div className='form-group'>
          <DataGrid
            columns={[
              { key: 'flowChannelId', name: 'Flow Channel ID' },
              { key: 'flowChannelName', name: 'Flow Channel Name' },
              { key: 'rainfallChannelId', name: 'Rainfall Channel ID' },
              { key: 'rainfallChannelName', name: 'Rainfall Channel Name' },
              { key: 'dailyPredictionError', name: 'Daily Prediction Error' },
              { key: 'dailyAnomalies', name: 'Daily Anomalies' },
              { key: 'rainfallIntensity', name: 'Rainfall Intensity' }]}
            rows={this.props.calculations}
            rowClicked={(index: number) => {
              this.setState({
                prediction: createPredictionFromTimeSeries(
                  this.props.calculations[index].flowTimeSeries,
                  this.props.calculations[index].predictionTimeSeries,
                  this.props.calculations[index].rainfallTimeSeries),
              });
            } } />
        </div>
        <div className='form-group'>
          {_.isObject(this.state.prediction) && <PredictionChart
            fitToParent={{ toWidth: true }}
            flowIntensityUnits={'l/s'}
            rainfallUnits={'mm'}
            scss={{
              predictionColor: 'green',
              flowColor: 'orange',
              widthPx: 800,
              heightPx: 600,
              marginBottomPx: 50,
              marginTopPx: 50,
              marginLeftPx: 50,
              marginRightPx: 50,
              rainfallColor: 'blue',
              rainfallToSignalsHeightRatio: 0.45,
            }}
            prediction={this.state.prediction} />}
        </div>
      </form>
      <GenericMessageModalContainer />
    </div>;
  }
}

const mapStateToProps = (state: IAppState): IScreenProps => {
  return {
    ...state.projectScreenState,
    uiSettings: state.configuration.uiSettings,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<void>) => {
  return bindActionCreators({
    selectedDateChanged,
  }, dispatch);
};

export { IProjectScreenState } from '@screens/project/models/project-screen-state';
export { projectScreenReducer, ProjectScreenActionsTypes } from '@screens/project/reducers';
export {
  loadProjectSaga,
  loadDataSaga,
} from './sagas';

export const ProjectScreenContainer = connect<IScreenProps, IDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(ProjectScreen);