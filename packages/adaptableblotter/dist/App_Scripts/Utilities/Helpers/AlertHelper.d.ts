import { IAlertDefinition } from "../Interface/BlotterObjects/IAlertDefinition";
import { IColumn } from '../Interface/IColumn';
export declare module AlertHelper {
    function createAlertDescription(alertDefinition: IAlertDefinition, columns: IColumn[]): string;
}
