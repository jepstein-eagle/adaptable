import { IAdaptableBlotterOptions } from "./../Api/Interface/IAdaptableBlotterOptions";
import { IAdaptableBlotter } from "../api/Interface/IAdaptableBlotter";
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
