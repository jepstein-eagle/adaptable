import { AdaptableOptions } from '../adaptableblotter/types';

import Adaptable from '../adaptableblotter/App_Scripts/agGrid';
import { Grid, GridOptions } from 'ag-grid-community';

export function createAdaptable({
  adaptableOptions,
  adaptableContainerId,
  gridContainerId,
}: {
  adaptableOptions: AdaptableOptions;
  adaptableContainerId: string;
  gridContainerId: string;
}) {
  return (gridOptions: GridOptions, gridParams: any) => {
    return new Adaptable(
      {
        ...adaptableOptions,
        containerOptions: {
          ...adaptableOptions.containerOptions,
          adaptableContainer: adaptableContainerId,
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
