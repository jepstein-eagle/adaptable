import * as React from "react";
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from "../UIInterfaces";
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IChartDefinition } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { ButtonShowChart } from "../Components/Buttons/ButtonShowChart";

export interface ChartEntityRowProps extends SharedEntityRowProps<ChartEntityRow> {
    onShowChart: (chart: string) => void;
}

export class ChartEntityRow extends React.Component<ChartEntityRowProps, {}> {
    render(): any {
        let Chart: IChartDefinition = this.props.AdaptableBlotterObject as IChartDefinition;
        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = Chart.Name
        colItems[1].Content = Chart.Type
        colItems[2].Content = <ButtonShowChart
            key={"key:" + Chart.Name}
            style={{ marginLeft: "2px" }}
            cssClassName={this.props.cssClassName}
            onClick={() => this.props.onShowChart(Chart.Name)}
            size={"small"}
            overrideTooltip="Show Chart"
            DisplayMode="Glyph" />
        colItems[3].Content = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, Chart)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            overrideDisableEdit={null}
            ConfigEntity={Chart}
            EntityName="Chart">
        </EntityListActionButtons>

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }

}