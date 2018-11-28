import { IAlertDefinition } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../Interface/IColumn';
export declare module AlertHelper {
    function createAlertDescription(alertDefinition: IAlertDefinition, columns: IColumn[]): string;
}
