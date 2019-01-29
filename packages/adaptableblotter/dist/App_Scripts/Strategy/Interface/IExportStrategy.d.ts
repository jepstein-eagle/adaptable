import { IStrategy } from './IStrategy';
import { ExportDestination } from '../../Utilities/Enums';
export interface IExportStrategy extends IStrategy {
    Export(rangeName: string, exportDestination: ExportDestination, folder?: string, page?: string): void;
}
