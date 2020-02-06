import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { GradientColumn } from '../../PredefinedConfig/GradientColumnState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { ColorPicker } from '../ColorPicker';

import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { EntityRowItem } from '../Components/EntityRowItem';
import Input from '../../components/Input';

export interface GradientColumnEntityRowProps
  extends SharedEntityExpressionRowProps<GradientColumnEntityRow> {
  Column: AdaptableColumn;
  ColorPalette: string[];
  onNegativeValueChanged: (GradientColumn: GradientColumn, minimumValue: number) => void;
  onPositiveValueChanged: (GradientColumn: GradientColumn, maximumValue: number) => void;
  onBaseValueChanged: (GradientColumn: GradientColumn, maximumValue: number) => void;
  onPositiveColorChanged: (GradientColumn: GradientColumn, positiveColor: string) => void;
  onNegativeColorChanged: (GradientColumn: GradientColumn, negativeColor: string) => void;
}

export class GradientColumnEntityRow extends React.Component<GradientColumnEntityRowProps, {}> {
  render(): any {
    let GradientColumn: GradientColumn = this.props.AdaptableObject as GradientColumn;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem
        Content={ColumnHelper.getFriendlyNameFromColumn(GradientColumn.ColumnId, this.props.Column)}
      />
    );
    colItems[1].Content = (
      <EntityRowItem
        Content={
          <Input
            type={'number'}
            style={{ width: '100%' }}
            placeholder="Positive Value"
            onChange={(e: React.SyntheticEvent) => this.onPositiveValueChanged(e)}
            value={GradientColumn.PositiveValue}
          />
        }
      />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={
          <Input
            type={'number'}
            style={{ width: '100%' }}
            placeholder="Negative Value"
            onChange={(e: any) => this.onNegativeValueChanged(e)}
            value={GradientColumn.NegativeValue}
          />
        }
      />
    );
    colItems[3].Content = (
      <EntityRowItem
        Content={
          <Input
            type={'number'}
            style={{ width: '100%' }}
            placeholder="Base Value"
            onChange={(e: React.SyntheticEvent) => this.onBaseValueChanged(e)}
            value={GradientColumn.BaseValue}
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
            value={GradientColumn.PositiveColor}
            onChange={x => this.onPositiveColorChanged(x)}
          />
        }
      />
    );
    colItems[5].Content = (
      <EntityRowItem
        Content={
          <ColorPicker
            style={{ width: '100%' }}
            ColorPalette={this.props.ColorPalette}
            value={GradientColumn.NegativeColor}
            onChange={x => this.onNegativeColorChanged(x)}
          />
        }
      />
    );

    colItems[6].Content = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(GradientColumn)}
        shareClick={() => this.props.onShare()}
        overrideDisableEdit={!this.props.Column}
        EntityType={StrategyConstants.GradientColumnStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  onNegativeValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (!isNaN(Number(e.value))) {
      let minValue: number = Number(e.value);
      this.props.onNegativeValueChanged(this.props.AdaptableObject as GradientColumn, minValue);
    }
  }

  onPositiveValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (!isNaN(Number(e.value))) {
      let maxValue: number = Number(e.value);
      this.props.onPositiveValueChanged(this.props.AdaptableObject as GradientColumn, maxValue);
    }
  }
  onBaseValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (!isNaN(Number(e.value))) {
      let maxValue: number = Number(e.value);
      this.props.onBaseValueChanged(this.props.AdaptableObject as GradientColumn, maxValue);
    }
  }

  onPositiveColorChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onPositiveColorChanged(this.props.AdaptableObject as GradientColumn, e.value);
  }

  onNegativeColorChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onNegativeColorChanged(this.props.AdaptableObject as GradientColumn, e.value);
  }
}
