import { IAlertDefinition } from '../../api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../../api/Interface/IColumn';
export declare module AlertHelper {
    function createAlertDescription(alertDefinition: IAlertDefinition, columns: IColumn[]): string;
}
