import { AdaptableOptions } from '@adaptabletools/adaptable/types';

import Adaptable from '@adaptabletools/adaptable/src/agGrid';
import { Grid, GridOptions, Module } from '@ag-grid-community/all-modules';

import {
  AllCommunityModules,
  ModuleRegistry,
} from '@ag-grid-community/all-modules';

ModuleRegistry.registerModules(AllCommunityModules);

export function createAdaptable({
  adaptableOptions,
  adaptableContainerId,
  gridContainerId,
  modules,
}: {
  adaptableOptions: AdaptableOptions;
  adaptableContainerId: string;
  gridContainerId: string;
  modules?: Module[];
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
        instantiateGrid: (vendorContainer: HTMLElement, theGridOptions) => {
          gridParams.modules = modules;
          return new Grid(vendorContainer, theGridOptions, gridParams);
        },
      },
      true
    );
  };
}
