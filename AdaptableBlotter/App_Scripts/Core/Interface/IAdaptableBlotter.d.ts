interface IAdaptableBlotter {
    AdaptableBlotterStore: IAdaptableBlotterStore;
    Strategies: IAdaptableStrategyCollection
    getSelectedCells(): ISelectedCells
    getColumnType(columnId: string): ColumnType
    getColumnHeader(columnId: string): string
     setValue(id: any, columnId:string, value: any) : void
}

interface ISelectedCells {
    //map of UUID with their associated values/columns
    Selection: Map<any, { columnID: string, value: any }[]>
}

interface IAdaptableStrategyCollection extends Map<string, IStragegy> {

}