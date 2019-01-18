import { IAdaptableBlotterOptions } from "../Utilities/Interface/IAdaptableBlotterOptions";
import { IAdaptableBlotter } from "../Api/Interface/IAdaptableBlotter";
import { BlotterFactoryAgGrid } from "../agGrid/BlotterFactoryAgGrid";
import { BlotterFactoryHypergrid } from "../Hypergrid/BlotterFactoryHypergrid";

export module BlotterFactory {

  export function CreateAdaptableBlotter(adaptableBlotterOptions: IAdaptableBlotterOptions,  vendorGridName: 'agGrid' | 'Hypergrid' ): IAdaptableBlotter {
          switch (vendorGridName) {
          case 'agGrid':
            return BlotterFactoryAgGrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
          case 'Hypergrid':
            return BlotterFactoryHypergrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
            }
    }
}
