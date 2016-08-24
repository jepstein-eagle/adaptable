interface ISmartEditPreview{
    ColumnId: string,
    InitialValueLabel :string,
    ComputedValueLabel: string,
    Values: ISmartEditValueTuple[]
}

interface ISmartEditValueTuple{
    Id: any, InitialValue: number, ComputedValue:number
}

