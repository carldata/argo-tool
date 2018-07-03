import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { RdiiChartWrapper } from './rdii-chart-wrapper';
import { PredictionsTable } from '@screens/project/components/predictions-table';

storiesOf('Predictions table story', module)
  .add('default', () =>
    <PredictionsTable />,
  );