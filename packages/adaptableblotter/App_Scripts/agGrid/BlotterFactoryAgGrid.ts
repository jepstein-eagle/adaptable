import { AdaptableBlotter } from './AdaptableBlotter';
import { AdaptableBlotterOptions } from '../BlotterOptions/AdaptableBlotterOptions';

export module BlotterFactoryAgGrid {
  export function CreateAdaptableBlotter(
    blotterOptions: AdaptableBlotterOptions,
    renderGrid: boolean
  ): AdaptableBlotter {
    return new AdaptableBlotter(blotterOptions, renderGrid);
  }
}
