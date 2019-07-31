import * as React from 'react';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from '../UIInterfaces';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import {
  ChartDefinition,
  CategoryChartDefinition,
} from '../../PredefinedConfig/RunTimeState/ChartState';
import { ButtonShowChart } from '../Components/Buttons/ButtonShowChart';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { EntityRowItem } from '../Components/EntityRowItem';
import { ChartType } from '../../PredefinedConfig/Common/ChartEnums';

export interface ChartEntityRowProps extends SharedEntityRowProps<ChartEntityRow> {
  onShowChart: (chart: string) => void;
  AccessLevel: AccessLevel;
}

export class ChartEntityRow extends React.Component<ChartEntityRowProps, {}> {
  render(): any {
    // assuming only category charts for now - silly assumption to make in due course...
    let Chart: CategoryChartDefinition = this.props
      .AdaptableBlotterObject as CategoryChartDefinition;
    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={Chart.Name} />;
    colItems[1].Content = <EntityRowItem Content={Chart.Description} />;
    colItems[2].Content = <EntityRowItem Content={this.getChartType(Chart.ChartType)} />;
    colItems[3].Content = (
      <ButtonShowChart
        onClick={() => this.props.onShowChart(Chart.Name)}
        tooltip="Show Chart"
        variant="raised"
        AccessLevel={this.props.AccessLevel}
      />
    );
    colItems[4].Content = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(Chart)}
        shareClick={() => this.props.onShare()}
        showShare={this.props.TeamSharingActivated}
        overrideDisableEdit={undefined}
        EntityType={StrategyConstants.ChartStrategyName}
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
    }
  }
}
