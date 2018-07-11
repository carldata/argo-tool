import { D3LegendGridLayout, ID3LegendConfig } from '@components/auxiliary/d3-legend-grid-layout';
import { IPredictionScss } from '../index';

export const plotLegend = (rootElement, rdiiScss: IPredictionScss) => {
  const gridLayout = new D3LegendGridLayout({
    columns: 5,
    rows: 1,
    drawBorder: true,
    horizontalSpacing: 5,
    verticalSpacing: 5,
    positionX: rdiiScss.marginLeftPx + 10,
    positionY: 0,
    margin: 8,
  } as ID3LegendConfig);

  gridLayout.plot(rootElement, (element, indices) => {
    switch (indices.seqIndex) {
      case 0:
        return {
          ...indices,
          gElementAttached: gridLayout.circleWithLabel(rdiiScss.rainfallColor, true, 'Rainfall'),
        };
      case 1:
        return {
          ...indices,
          gElementAttached: gridLayout.circleWithLabel(rdiiScss.flowColor, true, 'Flow'),
        };
      case 2:
        return {
          ...indices,
          gElementAttached: gridLayout.circleWithLabel(rdiiScss.predictionColor, true, 'Prediction'),
        };
      default:
        return {
          ...indices,
          gElementAttached: null,
        };
    }
  });
}

