import { BlotterFactoryAgGrid } from "./Vendors/agGrid/BlotterFactoryAgGrid";
import { VendorGridName } from "./Core/Enums";
import { BlotterFactoryHypergrid } from "./Vendors/Hypergrid/BlotterFactoryHypergrid";
import { IAdaptableBlotter } from "./Core/Interface/IAdaptableBlotter";
import { BlotterFactoryKendo } from "./Vendors/Kendo/BlotterFactoryKendo";
import { IAdaptableBlotterOptions } from "./Core/Api/Interface/IAdaptableBlotterOptions";

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
            return BlotterFactoryHypergrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
        }
    }
}
