import { IAlertDefinition } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../../Api/Interface/IColumn';
export declare module AlertHelper {
    function createAlertDescription(alertDefinition: IAlertDefinition, columns: IColumn[]): string;
}
