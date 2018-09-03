import * as React from "react";
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IFlashingCell } from "../../Core/Api/Interface/AdaptableBlotterObjects";
export interface FlashingCellEntityRowProps extends SharedEntityExpressionRowProps<FlashingCellEntityRow> {
    FlashingCellDurations: any[];
    ColorPalette: string[];
    onSelect: (flashingCell: IFlashingCell) => void;
    onChangeFlashingDuration: (flashingCell: IFlashingCell, NewFlashDuration: number) => void;
    onChangeDownColorFlashingCell: (flashingCell: IFlashingCell, DownColor: string) => void;
    onChangeUpColorFlashingCell: (flashingCell: IFlashingCell, UpColor: string) => void;
}
export declare class FlashingCellEntityRow extends React.Component<FlashingCellEntityRowProps, {}> {
    render(): any;
    onActionChange(event: React.FormEvent<any>): void;
    onDownColorChange(event: React.FormEvent<any>): void;
    onUpColorChange(event: React.FormEvent<any>): void;
    getFriendlyFlashingDuration(duration: number): string;
}
