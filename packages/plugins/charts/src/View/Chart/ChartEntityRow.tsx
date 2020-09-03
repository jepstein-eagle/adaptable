import * as React from 'react';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { EntityListActionButtons } from '@adaptabletools/adaptable/src/View/Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '@adaptabletools/adaptable/src/View/Components/AdaptableObjectRow';
import { IColItem } from '@adaptabletools/adaptable/src/View/UIInterfaces';
import { SharedEntityRowProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/ConfigEntityRowProps';
import {
  ChartDefinition,
  CategoryChartDefinition,
} from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { ButtonShowChart } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonShowChart';
import { AccessLevel } from '@adaptabletools/adaptable/src/PredefinedConfig/EntitlementState';
import { EntityRowItem } from '@adaptabletools/adaptable/src/View/Components/EntityRowItem';
import { ChartType } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';

export interface ChartEntityRowProps extends SharedEntityRowProps<ChartEntityRow> {
  onShowChart: (chart: string) => void;
  accessLevel: AccessLevel;
}

export class ChartEntityRow extends React.Component<ChartEntityRowProps, {}> {
  render(): any {
    // assuming only category charts for now - silly assumption to make in due course...
    let Chart: CategoryChartDefinition = this.props.adaptableObject as CategoryChartDefinition;
    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={Chart.Name} />;
    colItems[1].Content = <EntityRowItem Content={Chart.Description} />;
    colItems[2].Content = <EntityRowItem Content={this.getChartType(Chart.ChartType)} />;
    colItems[3].Content = (
      <ButtonShowChart
        onClick={() => this.props.onShowChart(Chart.Name)}
        tooltip="Show Chart"
        variant="raised"
        accessLevel={this.props.accessLevel}
      />
    );
    colItems[4].Content = (
      <EntityListActionButtons
        confirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(Chart)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.teamSharingActivated}
        overrideDisableEdit={undefined}
        entityType={StrategyConstants.ChartStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );
    return <AdaptableObjectRow colItems={colItems} />;
  }

  private getChartType(chartType: ChartType): string {
    switch (chartType) {
      case ChartType.CategoryChart:
        return 'Category Chart';
      case ChartType.PieChart:
        return 'Pie Chart';
      case ChartType.SparklinesChart:
        return 'Sparkline';
    }
  }
}
