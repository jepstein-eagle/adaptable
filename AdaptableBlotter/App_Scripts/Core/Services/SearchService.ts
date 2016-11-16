
import { ISearchService } from './Interface/ISearchService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';

// Currently doesnt do much but I'm sure we will need this soon when we implement search more thoroughly so might as well have the stub...

export class SearchService implements ISearchService {

 constructor(private blotter: IAdaptableBlotter) {
 }
    public ApplySearch(quickSearchText: string): void {
        this.blotter.applyQuickSearch(quickSearchText);
    }

}
