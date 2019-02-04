import { Expression } from '../../Expression';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface IReport extends IAdaptableBlotterObject {
    Name: string;
    ReportColumnScope: 'AllColumns' | 'VisibleColumns' | 'SelectedColumns' | 'BespokeColumns';
    ReportRowScope: 'AllRows' | 'VisibleRows' | 'SelectedRows' | 'ExpressionRows';
    ColumnIds: string[];
    Expression: Expression;
}
