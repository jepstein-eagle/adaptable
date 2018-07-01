import { VendorGridName } from "./Enums";
import { IAdaptableBlotterOptions } from "./Api/Interface/IAdaptableBlotterOptions";
import { IAdaptableBlotter } from "./Interface/IAdaptableBlotter";
import { BlotterFactoryHypergrid } from "../Vendors/Hypergrid/BlotterFactoryHypergrid";
import { BlotterFactoryAgGrid } from "../Vendors/agGrid/BlotterFactoryAgGrid";
import { BlotterFactoryKendo } from "../Vendors/Kendo/BlotterFactoryKendo";
import { BlotterFactoryAdaptableGrid } from "../Vendors/AdaptableGrid/BlotterFactoryAdaptableGrid";

export module BlotterFactory {

  export function CreateAdaptableBlotter(adaptableBlotterOptions: IAdaptableBlotterOptions, vendorGrid: VendorGridName): IAdaptableBlotter {
          switch (vendorGrid) {
          case VendorGridName.agGrid:
            return BlotterFactoryAgGrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
          case VendorGridName.Hypergrid:
            return BlotterFactoryHypergrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
          case VendorGridName.Kendo:
            return BlotterFactoryKendo.CreateAdaptableBlotter(adaptableBlotterOptions, false);
          case VendorGridName.AdaptableGrid:
            return BlotterFactoryAdaptableGrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
        }
    }
}
