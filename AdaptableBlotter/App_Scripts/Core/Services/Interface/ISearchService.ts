

export interface ISearchService {
  
  ApplySearchOnGrid(): void 

   ApplySearchOnRow(rowIdentifier: any): void

    ApplySearchOnFilters(namedExpressionIds: string[]):void
    

}