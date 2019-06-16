import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Utilities/Interface/IColumn';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { PercentBar } from '../../PredefinedConfig/IUserState/PercentBarState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { ColorPicker } from '../ColorPicker';
import { IAdaptableBlotter } from '../../Utilities/Interface/IAdaptableBlotter';
import { FormControl } from 'react-bootstrap';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { EntityRowItem } from '../Components/EntityRowItem';

export interface PercentBarEntityRowProps
  extends SharedEntityExpressionRowProps<PercentBarEntityRow> {
  Column: IColumn;
  ColorPalette: string[];
  onMinimumValueChanged: (PercentBar: PercentBar, minimumValue: number) => void;
  onMaximumValueChanged: (PercentBar: PercentBar, maximumValue: number) => void;
  onPositiveColorChanged: (PercentBar: PercentBar, positiveColor: string) => void;
  onNegativeColorChanged: (PercentBar: PercentBar, negativeColor: string) => void;
}

export class PercentBarEntityRow extends React.Component<PercentBarEntityRowProps, {}> {
  render(): any {
    let PercentBar: PercentBar = this.props.AdaptableBlotterObject as PercentBar;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem
        Content={ColumnHelper.getFriendlyNameFromColumn(PercentBar.ColumnId, this.props.Column)}
      />
    );
    colItems[1].Content = (
      <EntityRowItem
        Content={
          StringExtensions.IsNullOrEmpty(PercentBar.MinValueColumnId) ? (
            <FormControl
              bsSize={'small'}
              type={'number'}
              placeholder="Min Value"
              onChange={e => this.onMinimumValueChanged(e)}
              value={PercentBar.MinValue}
            />
          ) : (
            '[' +
            ColumnHelper.getFriendlyNameFromColumnId(
              PercentBar.MinValueColumnId,
              this.props.Columns
            ) +
            ']'
          )
        }
      />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={
          StringExtensions.IsNullOrEmpty(PercentBar.MaxValueColumnId) ? (
            <FormControl
              bsSize={'small'}
              type={'number'}
              placeholder="Max Value"
              onChange={e => this.onMaximumValueChanged(e)}
              value={PercentBar.MaxValue}
            />
          ) : (
            '[' +
            ColumnHelper.getFriendlyNameFromColumnId(
              PercentBar.MaxValueColumnId,
              this.props.Columns
            ) +
            ']'
          )
        }
      />
    );
    colItems[3].Content = (
      <EntityRowItem
        Content={
          <ColorPicker
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
            ColorPalette={this.props.ColorPalette}
            value={PercentBar.NegativeColor}
            onChange={x => this.onNegativeColorChanged(x)}
          />
        }
      />
    );

    colItems[5].Content = (
      <EntityListActionButtons
        cssClassName={this.props.cssClassName}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(PercentBar)}
        shareClick={() => this.props.onShare()}
        overrideDisableEdit={!this.props.Column}
        EntityType={StrategyConstants.PercentBarStrategyName}
      />
    );

    return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />;
  }

  onMinimumValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (!isNaN(Number(e.value))) {
      let minValue: number = Number(e.value);
      this.props.onMinimumValueChanged(this.props.AdaptableBlotterObject as PercentBar, minValue);
    }
  }

  onMaximumValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (!isNaN(Number(e.value))) {
      let maxValue: number = Number(e.value);
      this.props.onMaximumValueChanged(this.props.AdaptableBlotterObject as PercentBar, maxValue);
    }
  }

  onPositiveColorChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onPositiveColorChanged(this.props.AdaptableBlotterObject as PercentBar, e.value);
  }

  onNegativeColorChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onNegativeColorChanged(this.props.AdaptableBlotterObject as PercentBar, e.value);
  }
}
