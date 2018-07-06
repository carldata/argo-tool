import '../src/scss/styles.scss';

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { RdiiChartWrapper } from './rdii-chart-wrapper';

storiesOf('RDII Chart', module)
  .add('Start of November 2013', () =>
    <RdiiChartWrapper
      flowIntensityUnits={'gpm'}
      rainfallUnits={'in'}
      scss={{
        predictionColor: 'green',
        flowColor: 'blue',
        widthPx: 1200,
        heightPx: 600,
        marginBottomPx: 50,
        marginTopPx: 50,
        marginLeftPx: 50,
        marginRightPx: 50,
        rainfallColor: 'blue',
        rainfallToSignalsHeightRatio: 0.45,
      }}
      url='start-nov-2013.json' />)
  .add('Mid of August 2015', () =>
    <RdiiChartWrapper
      flowIntensityUnits={'gpm'}
      rainfallUnits={'in'}
      scss={{
        predictionColor: 'red',
        flowColor: 'blue',
        widthPx: 600,
        heightPx: 600,
        marginBottomPx: 50,
        marginTopPx: 50,
        marginLeftPx: 50,
        marginRightPx: 50,
        rainfallColor: 'blue',
        rainfallToSignalsHeightRatio: 0.45,
      }}
      url='mid-aug-2015.json' />)
  .add('Prediction', () => {


    return <RdiiChartWrapper
      flowIntensityUnits={'gpm'}
      rainfallUnits={'in'}
      scss={{
        predictionColor: 'yellow',
        flowColor: 'green',
        widthPx: 600,
        heightPx: 600,
        marginBottomPx: 50,
        marginTopPx: 50,
        marginLeftPx: 50,
        marginRightPx: 50,
        rainfallColor: 'blue',
        rainfallToSignalsHeightRatio: 0.45,
      }}
      url='mid-aug-2015prediction.json' />;
  });