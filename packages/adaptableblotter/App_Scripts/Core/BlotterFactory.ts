import { IAdaptableBlotterOptions } from "./Api/Interface/IAdaptableBlotterOptions";
import { IAdaptableBlotter } from "./Interface/IAdaptableBlotter";
import { BlotterFactoryHypergrid } from "../Vendors/Hypergrid/BlotterFactoryHypergrid";
import { BlotterFactoryAgGrid } from "../Vendors/agGrid/BlotterFactoryAgGrid";
import { BlotterFactoryKendo } from "../Vendors/Kendo/BlotterFactoryKendo";
import { BlotterFactoryAdaptableGrid } from "../Vendors/AdaptableGrid/BlotterFactoryAdaptableGrid";

export module BlotterFactory {

  export function CreateAdaptableBlotter(adaptableBlotterOptions: IAdaptableBlotterOptions,  vendorGridName: 'agGrid' | 'Hypergrid' | 'Kendo' | 'AdaptableGrid'): IAdaptableBlotter {
          switch (vendorGridName) {
          case 'agGrid':
            return BlotterFactoryAgGrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
          case 'Hypergrid':
            return BlotterFactoryHypergrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
          case  'Kendo':
            return BlotterFactoryKendo.CreateAdaptableBlotter(adaptableBlotterOptions, false);
          case  'AdaptableGrid':
            return BlotterFactoryAdaptableGrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
        }
    }
}
