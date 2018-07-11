import '../src/scss/styles.scss';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CalculationsTable } from '@screens/project/components/calculations-table';
import { ICalculations } from '@screens/project/models';

storiesOf('Calculations table story', module)
  .add('Three rows with pre-defined calculations', () =>
    <CalculationsTable
      calculations={[{
        dailyPredictionError: 1.7,
        dailyAnomalies: 12,
        rainfallIntensity: 20,
        rainfallTimeSeries: null,
        flowTimeSeries: null,
        predictionTimeSeries: null,
        flowChannelId: '10021-451',
        flowChannelName: 'Flow-Mocked-A',
        rainfallChannelId: '10021-452',
        rainfallChannelName: 'Rainfall Mocked A',
      } as ICalculations,
      {
        dailyPredictionError: 2.1,
        dailyAnomalies: 32,
        rainfallIntensity: 15,
        rainfallTimeSeries: null,
        flowTimeSeries: null,
        predictionTimeSeries: null,
        flowChannelId: '10023-452',
        flowChannelName: 'Flow-Mocked-B',
        rainfallChannelId: '10024-453',
        rainfallChannelName: 'Rainfall Mocked B',
      } as ICalculations,
      {
        dailyPredictionError: 2.1,
        dailyAnomalies: 32,
        rainfallIntensity: 15,
        rainfallTimeSeries: null,
        flowTimeSeries: null,
        predictionTimeSeries: null,
        flowChannelId: '10025-458',
        flowChannelName: 'Flow-Mocked-C',
        rainfallChannelId: '10026-451',
        rainfallChannelName: 'Rainfall Mocked C',
      } as ICalculations]}
      rowClicked={(rowIndex: number) => console.log(`Clicked index ${rowIndex}`)}
    />,
  );