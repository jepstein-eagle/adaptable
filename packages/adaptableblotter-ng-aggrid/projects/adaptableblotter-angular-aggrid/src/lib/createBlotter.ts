import { AdaptableOptions } from '../adaptableblotter/types';

import Adaptable from '../adaptableblotter/App_Scripts/agGrid';
import { Grid, GridOptions } from 'ag-grid-community';

export function createBlotter({
  blotterOptions,

  blotterContainerId,
  gridContainerId,
}: {
  blotterOptions: AdaptableOptions;

  blotterContainerId: string;
  gridContainerId: string;
}) {
  return (gridOptions: GridOptions, gridParams: any) => {
    return new Adaptable(
      {
        ...blotterOptions,
        containerOptions: {
          ...blotterOptions.containerOptions,
          adaptableBlotterContainer: blotterContainerId,
          vendorContainer: gridContainerId,
        },
        vendorGrid: gridOptions,
      },
      true,
      {
        instantiateGrid: (vendorContainer: HTMLElement, gridOptions) => {
          return new Grid(vendorContainer, gridOptions, gridParams);
        },
      }
    );
  };
}
