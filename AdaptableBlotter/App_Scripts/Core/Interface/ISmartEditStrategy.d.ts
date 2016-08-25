interface ISmartEditPreview{
    ColumnId: string,
    InitialValueLabel :string,
    ComputedValueLabel: string,
    Values: ISmartEditValueTuple[]
}

interface ISmartEditValueTuple{
    Id: any, InitialValue: number, ComputedValue:number
}

interface ISmartEditStrategy extends IStragegy {
    BuildPreviewValues(smartEditValue: number, smartEditOperation: SmartEditOperation): ISmartEditPreviewReturn;
    ApplySmartEdit(smartEditValue: number, smartEditOperation: SmartEditOperation) : void;
}

interface ISmartEditPreviewReturn extends IStrategyActionReturn<ISmartEditPreview> {

}