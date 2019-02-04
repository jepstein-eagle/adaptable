import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { IColItem } from "../UIInterfaces";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { IColumnCategory } from "../../Utilities/Interface/BlotterObjects/IColumnCategory";


export interface ColumnCategoryEntityRowProps<ColumnCategoryEntityRow> extends SharedEntityExpressionRowProps<ColumnCategoryEntityRow> {
}

export class ColumnCategoryEntityRow extends React.Component<ColumnCategoryEntityRowProps<ColumnCategoryEntityRow>, {}> {

    render(): any {
        let ColumnCategory: IColumnCategory = this.props.AdaptableBlotterObject as IColumnCategory;

        let colItems: IColItem[] = [].concat(this.props.colItems);
        let columnNames: string[] = ColumnCategory.ColumnIds.map(ci => { return ColumnHelper.getFriendlyNameFromColumnId(ci, this.props.Columns) });

        colItems[0].Content = ColumnCategory.ColumnCategoryId;
        colItems[1].Content = columnNames.join(', ')

        let buttons: any = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, ColumnCategory)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={false}
            EntityName={StrategyConstants.ColumnCategoryStrategyName} />

        colItems[2].Content = buttons;

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }



}
