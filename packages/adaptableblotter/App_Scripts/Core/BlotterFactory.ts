import { IAdaptableBlotterOptions } from "./../Api/Interface/IAdaptableBlotterOptions";
import { BlotterFactoryHypergrid } from "../../Hypergrid/BlotterFactoryHypergrid";
import { BlotterFactoryAgGrid } from "../../agGrid/BlotterFactoryAgGrid";
import { IAdaptableBlotter } from "../api/Interface/IAdaptableBlotter";

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
