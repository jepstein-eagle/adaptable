export interface ISmartEditApi {
    EditMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void;
    GetMathOperation(): string;
    EditValue(smartEditValue: number): void;
    GetValue(): number;
}
