import * as React from 'react';

import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ColorPicker } from '../ColorPicker';
import { IColItem } from '../UIInterfaces';
import { FlashingCell } from '../../PredefinedConfig/FlashingCellState';
import { EntityRowItem } from '../Components/EntityRowItem';
import Checkbox from '../../components/CheckBox';
import Dropdown from '../../components/Dropdown';

export interface FlashingCellEntityRowProps extends SharedEntityRowProps<FlashingCellEntityRow> {
  FlashingCellDurations: any[];
  onSelect: (flashingCell: FlashingCell) => void;
  onChangeFlashingDuration: (flashingCell: FlashingCell, NewFlashDuration: number) => void;
  onChangeDownColorFlashingCell: (flashingCell: FlashingCell, DownColor: string) => void;
  onChangeUpColorFlashingCell: (flashingCell: FlashingCell, UpColor: string) => void;
}

export class FlashingCellEntityRow extends React.Component<FlashingCellEntityRowProps, {}> {
  render(): any {
    let flashingCell: FlashingCell = this.props.AdaptableObject as FlashingCell;

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
    let column = this.props.api.columnApi.getColumnFromId(flashingCell.ColumnId);
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
        showEmptyItem={false}
        showClearButton={false}
        value={flashingCell.FlashingCellDuration}
        onChange={(x: any) => this.onActionChange(x)}
        options={durations}
      ></Dropdown>
    );
    colItems[3].Content = (
      <EntityRowItem
        Content={
          <ColorPicker
            Api={this.props.api}
            disabled={isDisabled}
            value={flashingCell.UpColor}
            onChange={(x: any) => this.onUpColorChange(x)}
          />
        }
      />
    );
    colItems[4].Content = (
      <EntityRowItem
        Content={
          <ColorPicker
            Api={this.props.api}
            disabled={isDisabled}
            value={flashingCell.DownColor}
            onChange={(x: any) => this.onDownColorChange(x)}
          />
        }
      />
    );
    return <AdaptableObjectRow colItems={colItems} />;
  }

  onActionChange(value: any) {
    this.props.onChangeFlashingDuration(
      this.props.AdaptableObject as FlashingCell,
      Number.parseInt(value)
    );
  }

  onDownColorChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onChangeDownColorFlashingCell(this.props.AdaptableObject as FlashingCell, e.value);
  }

  onUpColorChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onChangeUpColorFlashingCell(this.props.AdaptableObject as FlashingCell, e.value);
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
        return String(typeof duration === 'number' ? duration : 'unknown') + ' ms';
    }
  }
}
