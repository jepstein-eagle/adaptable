import * as React from 'react';
import { EntityListActionButtons } from '@adaptabletools/adaptable/src/View/Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '@adaptabletools/adaptable/src/View/Components/AdaptableObjectRow';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { SharedEntityRowProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '@adaptabletools/adaptable/src/View/UIInterfaces';

import { EntityRowItem } from '@adaptabletools/adaptable/src/View/Components/EntityRowItem';
import Input from '@adaptabletools/adaptable/src/components/Input';
import { SparklineColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/SparklineColumnState';
import { SparklineTypeDropdown } from './Wizard/SparklineColumnSettingsWizard';
import { ColorPicker } from '@adaptabletools/adaptable/src/View/ColorPicker';
import { SparklineTypeEnum } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';

export interface SparklineColumnEntityRowProps
  extends SharedEntityRowProps<SparklineColumnEntityRow> {
  Column: AdaptableColumn;

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
    let sparklineColumn: SparklineColumn = this.props.adaptableObject as SparklineColumn;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem
        Content={this.props.api.columnApi.getFriendlyNameFromColumn(
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
                this.props.adaptableObject as SparklineColumn,
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
            api={this.props.api}
            value={sparklineColumn.LineColor}
            onChange={(x: any) => this.onLineColorChanged(x)}
          />
        }
      />
    );
    colItems[5].Content = (
      <EntityListActionButtons
        confirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.teamSharingActivated}
        editClick={() => this.props.onEdit(sparklineColumn)}
        shareClick={(description: string) => this.props.onShare(description)}
        overrideDisableEdit={!this.props.Column}
        showDelete={false}
        entityType={StrategyConstants.SparklineColumnStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  onMinimumValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (!isNaN(Number(e.value))) {
      let minValue: number = Number(e.value);
      this.props.onMinimumValueChanged(this.props.adaptableObject as SparklineColumn, minValue);
    }
  }

  onMaximumValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (!isNaN(Number(e.value))) {
      let maxValue: number = Number(e.value);
      this.props.onMaximumValueChanged(this.props.adaptableObject as SparklineColumn, maxValue);
    }
  }

  onLineColorChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onLineColorChanged(this.props.adaptableObject as SparklineColumn, e.value);
  }
}
