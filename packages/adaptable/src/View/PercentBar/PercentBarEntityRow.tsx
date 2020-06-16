import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { PercentBar } from '../../PredefinedConfig/PercentBarState';
import { ColorPicker } from '../ColorPicker';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { EntityRowItem } from '../Components/EntityRowItem';
import Input from '../../components/Input';

export interface PercentBarEntityRowProps extends SharedEntityRowProps<PercentBarEntityRow> {
  Column: AdaptableColumn;
  ColorPalette: string[];
  onMinimumValueChanged: (PercentBar: PercentBar, minimumValue: number) => void;
  onMaximumValueChanged: (PercentBar: PercentBar, maximumValue: number) => void;
  onPositiveColorChanged: (PercentBar: PercentBar, positiveColor: string) => void;
  onNegativeColorChanged: (PercentBar: PercentBar, negativeColor: string) => void;
}

export class PercentBarEntityRow extends React.Component<PercentBarEntityRowProps, {}> {
  render(): any {
    let PercentBar: PercentBar = this.props.AdaptableObject as PercentBar;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem
        Content={this.props.api.gridApi.getFriendlyNameFromColumn(
          PercentBar.ColumnId,
          this.props.Column
        )}
      />
    );
    colItems[1].Content = (
      <EntityRowItem
        Content={
          StringExtensions.IsNullOrEmpty(PercentBar.NegativeValueColumnId) ? (
            <Input
              type={'number'}
              style={{ width: '100%' }}
              placeholder="Min Value"
              onChange={(e: any) => this.onMinimumValueChanged(e)}
              value={PercentBar.NegativeValue}
            />
          ) : (
            '[' +
            this.props.api.gridApi.getFriendlyNameFromColumnId(PercentBar.NegativeValueColumnId) +
            ']'
          )
        }
      />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={
          StringExtensions.IsNullOrEmpty(PercentBar.PositiveValueColumnId) ? (
            <Input
              type={'number'}
              style={{ width: '100%' }}
              placeholder="Max Value"
              onChange={(e: React.SyntheticEvent) => this.onMaximumValueChanged(e)}
              value={PercentBar.PositiveValue}
            />
          ) : (
            '[' +
            this.props.api.gridApi.getFriendlyNameFromColumnId(PercentBar.PositiveValueColumnId) +
            ']'
          )
        }
      />
    );
    colItems[3].Content = (
      <EntityRowItem
        Content={
          <ColorPicker
            style={{ width: '100%' }}
            ColorPalette={this.props.ColorPalette}
            value={PercentBar.PositiveColor}
            onChange={x => this.onPositiveColorChanged(x)}
          />
        }
      />
    );
    colItems[4].Content = (
      <EntityRowItem
        Content={
          <ColorPicker
            style={{ width: '100%' }}
            ColorPalette={this.props.ColorPalette}
            value={PercentBar.NegativeColor}
            onChange={x => this.onNegativeColorChanged(x)}
          />
        }
      />
    );

    colItems[5].Content = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(PercentBar)}
        shareClick={(description: string) => this.props.onShare(description)}
        overrideDisableEdit={!this.props.Column}
        EntityType={StrategyConstants.PercentBarStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  onMinimumValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (!isNaN(Number(e.value))) {
      let minValue: number = Number(e.value);
      this.props.onMinimumValueChanged(this.props.AdaptableObject as PercentBar, minValue);
    }
  }

  onMaximumValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (!isNaN(Number(e.value))) {
      let maxValue: number = Number(e.value);
      this.props.onMaximumValueChanged(this.props.AdaptableObject as PercentBar, maxValue);
    }
  }

  onPositiveColorChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onPositiveColorChanged(this.props.AdaptableObject as PercentBar, e.value);
  }

  onNegativeColorChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onNegativeColorChanged(this.props.AdaptableObject as PercentBar, e.value);
  }
}
