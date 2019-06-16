import { AdaptableBlotter } from './AdaptableBlotter';
import { IAdaptableBlotterOptions } from '../BlotterOptions/IAdaptableBlotterOptions';

export module BlotterFactoryHypergrid {
  export function CreateAdaptableBlotter(
    blotterOptions: IAdaptableBlotterOptions,
    renderGrid: boolean
  ): AdaptableBlotter {
    return new AdaptableBlotter(blotterOptions, renderGrid);
  }
}
