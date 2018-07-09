import '../src/scss/styles.scss';

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { PredictionChartWrapper } from './prediction-chart-wrapper';

storiesOf('Predictions Chart', module)
  .add('7881-11742 Flow, 3231-3048 Rainfall', () =>
    <PredictionChartWrapper
      flowIntensityUnits={'gpm'}
      rainfallUnits={'in'}
      scss={{
        predictionColor: 'green',
        flowColor: 'orange',
        widthPx: 800,
        heightPx: 450,
        marginBottomPx: 50,
        marginTopPx: 50,
        marginLeftPx: 50,
        marginRightPx: 50,
        rainfallColor: 'blue',
        rainfallToSignalsHeightRatio: 0.45,
      }}
      flowCsvName='7881-11742.data.csv'
      predictionCsvName='7881-11742.predictions.csv'
      rainfallCsvName='3231-3048.rainfall.csv' />
  );