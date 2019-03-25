import * as React from "react";
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from "../UIInterfaces";
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IChartDefinition, ICategoryChartDefinition } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ButtonShowChart } from "../Components/Buttons/ButtonShowChart";
import { AccessLevel } from "../../Utilities/Enums";

export interface ChartEntityRowProps extends SharedEntityRowProps<ChartEntityRow> {
    onShowChart: (chart: string) => void;
    AccessLevel: AccessLevel
}

export class ChartEntityRow extends React.Component<ChartEntityRowProps, {}> {
    render(): any {
        // assuming only category charts for now - silly assumption to make in due course...
        let Chart: ICategoryChartDefinition = this.props.AdaptableBlotterObject as ICategoryChartDefinition;
        let colItems: IColItem[] = [].concat(this.props.colItems);
       
        colItems[0].Content = Chart.Name
        colItems[1].Content = Chart.Description
        colItems[2].Content = Chart.ChartType
        colItems[3].Content = <ButtonShowChart
            key={"key:" + Chart.Name}
            style={{ marginLeft: "2px" }}
            cssClassName={this.props.cssClassName}
            onClick={() => this.props.onShowChart(Chart.Name)}
            size={"small"}
            overrideTooltip="Show Chart"
            DisplayMode="Glyph" 
            AccessLevel={this.props.AccessLevel}
            />
        colItems[4].Content = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, Chart)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            overrideDisableEdit={null}
            EntityType={StrategyConstants.ChartStrategyName} />
         return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }

}