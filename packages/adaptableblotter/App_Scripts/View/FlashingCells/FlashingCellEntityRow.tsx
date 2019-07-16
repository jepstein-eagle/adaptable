import * as React from 'react';

import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ColorPicker } from '../ColorPicker';
import { IColItem } from '../UIInterfaces';
import { FlashingCell } from '../../PredefinedConfig/RunTimeState/FlashingCellState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { EntityRowItem } from '../Components/EntityRowItem';
import Checkbox from '../../components/CheckBox';
import Dropdown from '../../components/Dropdown';

export interface FlashingCellEntityRowProps
  extends SharedEntityExpressionRowProps<FlashingCellEntityRow> {
  FlashingCellDurations: any[];
  ColorPalette: string[];
  onSelect: (flashingCell: FlashingCell) => void;
  onChangeFlashingDuration: (flashingCell: FlashingCell, NewFlashDuration: number) => void;
  onChangeDownColorFlashingCell: (flashingCell: FlashingCell, DownColor: string) => void;
  onChangeUpColorFlashingCell: (flashingCell: FlashingCell, UpColor: string) => void;
}

export class FlashingCellEntityRow extends React.Component<FlashingCellEntityRowProps, {}> {
  render(): any {
    let flashingCell: FlashingCell = this.props.AdaptableBlotterObject as FlashingCell;

    let durations = this.props.FlashingCellDurations.map(flashingCellDuration => {
      return {
        label: this.getFriendlyFlashingDuration(flashingCellDuration),
        value: flashingCellDuration,
      };
    });
    if (!this.props.FlashingCellDurations.find(x => x == flashingCell.FlashingCellDuration)) {
      durations.push({
        value: flashingCell.FlashingCellDuration,
        label: this.getFriendlyFlashingDuration(flashingCell.FlashingCellDuration),
      });
    }

    let isDisabled = false; // TODO:  need to get from Entitlements !  flashingCell.IsReadOnly
    let column = ColumnHelper.getColumnFromId(flashingCell.ColumnId, this.props.Columns);
    if (!column) {
      return null;
    }

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem
        Content={
          <Checkbox
            disabled={isDisabled}
            onChange={() => this.props.onSelect(flashingCell)}
            checked={flashingCell.IsLive}
          />
        }
      />
    );
    colItems[1].Content = <EntityRowItem Content={column.FriendlyName} />;
    colItems[2].Content = (
      <Dropdown
        disabled={isDisabled}
        value={flashingCell.FlashingCellDuration}
        onChange={(x: any) => this.onActionChange(x)}
        options={durations}
      ></Dropdown>
    );
    colItems[3].Content = (
      <EntityRowItem
        Content={
          <ColorPicker
            ColorPalette={this.props.ColorPalette}
            disabled={isDisabled}
            value={flashingCell.UpColor}
            onChange={x => this.onUpColorChange(x)}
          />
        }
      />
    );
    colItems[4].Content = (
      <EntityRowItem
        Content={
          <ColorPicker
            ColorPalette={this.props.ColorPalette}
            disabled={isDisabled}
            value={flashingCell.DownColor}
            onChange={x => this.onDownColorChange(x)}
          />
        }
      />
    );
    return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />;
  }

  onActionChange(value: any) {
    this.props.onChangeFlashingDuration(
      this.props.AdaptableBlotterObject as FlashingCell,
      Number.parseInt(value)
    );
  }

  onDownColorChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onChangeDownColorFlashingCell(
      this.props.AdaptableBlotterObject as FlashingCell,
      e.value
    );
  }

  onUpColorChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onChangeUpColorFlashingCell(
      this.props.AdaptableBlotterObject as FlashingCell,
      e.value
    );
  }

  getFriendlyFlashingDuration(duration: number) {
    switch (duration) {
      case 250:
        return '1/4 Second';
      case 500:
        return '1/2 Second';
      case 750:
        return '3/4 Second';
      case 1000:
        return '1 Second';
      default:
        return String(duration) + ' ms';
    }
  }
}
