import { AdaptableBlotter } from './AdaptableBlotter';
import { AdaptableBlotterOptions } from '../BlotterOptions/AdaptableBlotterOptions';

export module BlotterFactoryHypergrid {
  export function CreateAdaptableBlotter(
    blotterOptions: AdaptableBlotterOptions,
    renderGrid: boolean
  ): AdaptableBlotter {
    return new AdaptableBlotter(blotterOptions, renderGrid);
  }
}
