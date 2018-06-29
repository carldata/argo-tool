import { D3LegendGridLayout, ID3LegendConfig } from '@components/auxiliary/d3-legend-grid-layout';
import { IRdiiScss } from '@components/prediction-chart';

export const plotLegend = (rootElement, rdiiScss: IRdiiScss, containsRdii2: boolean, containsRdii3: boolean) => {
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
          gElementAttached: gridLayout.circleWithLabel(rdiiScss.dwpColor, true, 'Dry Weather Pattern'),
        };
      case 3:
        return {
          ...indices,
          gElementAttached: gridLayout.circleWithLabel(rdiiScss.rdii1Color, true, 'RDII 1'),
        };
      case 4:
        return {
          ...indices,
          gElementAttached: containsRdii2 ? gridLayout.circleWithLabel(rdiiScss.rdii2Color, true, 'RDII 2') : null,
        };
      case 5:
        return {
          ...indices,
          gElementAttached: containsRdii3 ? gridLayout.circleWithLabel(rdiiScss.rdii3Color, true, 'RDII 3') : null,
        };
      default:
        return {
          ...indices,
          gElementAttached: null,
        };
    }
  });
}

