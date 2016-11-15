
import { ISearchService } from './Interface/ISearchService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';


export class SearchService implements ISearchService {

 constructor(private blotter: IAdaptableBlotter) {
 }
    public ApplySearch(searchText: string): void {
        this.blotter.applySearch(null, searchText);
    }

}
