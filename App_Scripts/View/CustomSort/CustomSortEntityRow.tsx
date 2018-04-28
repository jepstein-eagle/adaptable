import * as React from "react";
import { Helper } from '../../Core/Helpers/Helper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from "../UIInterfaces";
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants';
import { ICustomSort } from "../../Core/Api/AdaptableBlotterObjects";

export interface CustomSortEntityRowProps extends SharedEntityRowProps<CustomSortEntityRow> {
    ColumnLabel: string
}

export class CustomSortEntityRow extends React.Component<CustomSortEntityRowProps, {}> {
    render(): any {
        let customSort: ICustomSort = this.props.AdaptableBlotterObject as ICustomSort;
        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = this.props.ColumnLabel
        colItems[1].Content = customSort.Values.join(', ')
        colItems[2].Content = <EntityListActionButtons
        cssClassName={this.props.cssClassName}
         ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, customSort)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            overrideDisableEdit={this.props.ColumnLabel.includes(GeneralConstants.MISSING_COLUMN)}
            ConfigEntity={customSort}
            EntityName="Custom Sort">
        </EntityListActionButtons>

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }

}