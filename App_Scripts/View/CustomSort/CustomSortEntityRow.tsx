import { ICustomSort } from '../../Strategy/Interface/ICustomSortStrategy';
import * as React from "react";
import { Helper } from '../../Core/Helpers/Helper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem } from '../Components/ConfigEntityRowItem';
import { IColItem } from "../UIInterfaces";
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants';

export interface CustomSortEntityRowProps extends SharedEntityRowProps<CustomSortEntityRow> {
    ColumnLabel: string
}

export class CustomSortEntityRow extends React.Component<CustomSortEntityRowProps, {}> {
    render(): any {
        let customSort: ICustomSort = this.props.AdaptableBlotterObject as ICustomSort;
        let colItems: IColItem[] = [].concat(this.props.ColItems);

        colItems[0].Content = this.props.ColumnLabel
        colItems[1].Content = customSort.CustomSortItems.join(', ')
        colItems[2].Content = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, customSort)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            overrideDisableEdit={this.props.ColumnLabel.includes(GeneralConstants.MISSING_COLUMN)}
            ConfigEntity={customSort}
            EntityName="Custom Sort">
        </EntityListActionButtons>

        return <ConfigEntityRowItem ColItems={colItems} />
    }

}