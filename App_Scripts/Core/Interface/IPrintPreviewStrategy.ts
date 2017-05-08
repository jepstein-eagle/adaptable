import {IStrategy} from './IStrategy';

export interface IPrintPreviewStrategy extends IStrategy {
    ApplyPrintPreview() : void;
}

