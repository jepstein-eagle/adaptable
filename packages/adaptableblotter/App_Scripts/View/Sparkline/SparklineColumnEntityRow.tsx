import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';

import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';

import { EntityRowItem } from '../Components/EntityRowItem';
import Input from '../../components/Input';
import { SparklineColumn } from '../../PredefinedConfig/SparklineColumnState';
import { SparklineTypeDropdown } from './Wizard/SparklineColumnSettingsWizard';
import { ColorPicker } from '../ColorPicker';
import { SparklineTypeEnum } from '../../PredefinedConfig/Common/ChartEnums';

export interface SparklineColumnEntityRowProps
  extends SharedEntityExpressionRowProps<SparklineColumnEntityRow> {
  Column: AdaptableBlotterColumn;
  ColorPalette: string[];

  onSparklineTypeChange: (
    sparklineColumn: SparklineColumn,
    sparklineType: SparklineTypeEnum
  ) => void;
  onMinimumValueChanged: (sparklineColumn: SparklineColumn, minimumValue: number) => void;
  onMaximumValueChanged: (sparklineColumn: SparklineColumn, maximumValue: number) => void;
  onLineColorChanged: (sparklineColumn: SparklineColumn, positiveColor: string) => void;
}

export class SparklineColumnEntityRow extends React.Component<SparklineColumnEntityRowProps, {}> {
  render(): any {
    let sparklineColumn: SparklineColumn = this.props.AdaptableBlotterObject as SparklineColumn;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem
        Content={ColumnHelper.getFriendlyNameFromColumn(
          sparklineColumn.ColumnId,
          this.props.Column
        )}
      />
    );

    colItems[1].Content = (
      <EntityRowItem
        Content={
          <SparklineTypeDropdown
            value={sparklineColumn.SparklineType as SparklineTypeEnum}
            onChange={(sparklineType: SparklineTypeEnum) => {
              this.props.onSparklineTypeChange(
                this.props.AdaptableBlotterObject as SparklineColumn,
                sparklineType
              );
            }}
          />
        }
      />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={
          sparklineColumn.MinimumValue != null ? (
            <Input
              type={'number'}
              style={{ width: '100%' }}
              placeholder="Min Value"
              onChange={(e: any) => this.onMinimumValueChanged(e)}
              value={sparklineColumn.MinimumValue}
            />
          ) : (
            'Cell min value'
          )
        }
      />
    );
    colItems[3].Content = (
      <EntityRowItem
        Content={
          sparklineColumn.MaximumValue != null ? (
            <Input
              type={'number'}
              style={{ width: '100%' }}
              placeholder="Max Value"
              onChange={(e: React.SyntheticEvent) => this.onMaximumValueChanged(e)}
              value={sparklineColumn.MaximumValue}
            />
          ) : (
            'Cell max value'
          )
        }
      />
    );
    colItems[4].Content = (
      <EntityRowItem
        Content={
          <ColorPicker
            style={{ width: '100%' }}
            ColorPalette={this.props.ColorPalette}
            value={sparklineColumn.LineColor}
            onChange={x => this.onLineColorChanged(x)}
          />
        }
      />
    );
    colItems[5].Content = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(sparklineColumn)}
        shareClick={() => this.props.onShare()}
        overrideDisableEdit={!this.props.Column}
        showDelete={false}
        EntityType={StrategyConstants.SparklineColumnStrategyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  onMinimumValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (!isNaN(Number(e.value))) {
      let minValue: number = Number(e.value);
      this.props.onMinimumValueChanged(
        this.props.AdaptableBlotterObject as SparklineColumn,
        minValue
      );
    }
  }

  onMaximumValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (!isNaN(Number(e.value))) {
      let maxValue: number = Number(e.value);
      this.props.onMaximumValueChanged(
        this.props.AdaptableBlotterObject as SparklineColumn,
        maxValue
      );
    }
  }

  onLineColorChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onLineColorChanged(this.props.AdaptableBlotterObject as SparklineColumn, e.value);
  }
}
