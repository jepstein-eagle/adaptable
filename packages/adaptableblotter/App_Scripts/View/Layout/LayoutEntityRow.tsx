import * as React from "react";
import { Radio } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { IColItem } from "../UIInterfaces";
import { DEFAULT_LAYOUT } from "../../Utilities/Constants/GeneralConstants";
import { IColumn } from "../../Utilities/Interface/IColumn";
import { SortOrder } from "../../Utilities/Enums";
import { LayoutHelper } from "../../Utilities/Helpers/LayoutHelper";
import { ILayout } from "../../Utilities/Interface/IAdaptableBlotterObjects";


export interface LayoutEntityRowProps<LayoutEntityRow> extends SharedEntityExpressionRowProps<LayoutEntityRow> {
    IsCurrentLayout: boolean;
    onSelect: (Layout: ILayout) => void;
}

export class LayoutEntityRow extends React.Component<LayoutEntityRowProps<LayoutEntityRow>, {}> {

    render(): any {
        let layout: ILayout = this.props.AdaptableBlotterObject as ILayout;

        let colItems: IColItem[] = [].concat(this.props.colItems);


        colItems[0].Content = <Radio style={{ padding: "0px", margin: "0px" }} onChange={() => this.props.onSelect(layout)} checked={this.props.IsCurrentLayout} />
        colItems[1].Content = layout.Name;
        colItems[2].Content = LayoutHelper.getLayoutDescription(layout, this.props.Columns)

        let buttons: any = <EntityListActionButtons
        cssClassName={this.props.cssClassName}
          ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, layout)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={false}
            overrideDisableDelete={layout.Name == DEFAULT_LAYOUT}
             EntityName={StrategyConstants.LayoutStrategyName} />

        colItems[3].Content = buttons;

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }

    

}
