

export interface ISearchService {
  
  ApplySearchOnGrid(): void 

   ApplySearchOnRow(rowIdentifier: any): void

    ApplySearchOnUserFilterExpressions(userFilterExpressionIds: string[]):void
    

}