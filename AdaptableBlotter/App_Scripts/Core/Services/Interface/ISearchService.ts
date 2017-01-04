

export interface ISearchService {
  
  ApplySearchOnGrid(): void 

   ApplySearchOnRow(rowIdentifier: any): void

    ApplySearchOnNamedExpressions(namedExpressionIds: string[]):void
    

}