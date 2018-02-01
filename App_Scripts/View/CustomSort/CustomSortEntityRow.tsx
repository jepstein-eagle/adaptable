import { ICustomSort } from '../../Strategy/Interface/ICustomSortStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../Core/Helpers/Helper';
import { Button, Col, Row, ButtonGroup, Panel } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
    import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';

export interface CustomSortEntityRowProps extends SharedEntityRowProps<CustomSortEntityRow> {
    ColumnLabel: string
}

export class CustomSortEntityRow extends React.Component<CustomSortEntityRowProps, {}> {
    render(): any {
        let customSort: ICustomSort = this.props.ConfigEntity as ICustomSort;
        let myCols: IColItem[] = []
        myCols.push({ size: this.props.EntityRowInfo[0].Width, content: this.props.ColumnLabel });
        myCols.push({ size: this.props.EntityRowInfo[1].Width, content: customSort.CustomSortItems.join(', ') });
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, customSort)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            overrideDisableEdit={this.props.ColumnLabel.includes(Helper.MissingColumnMagicString)}
            ConfigEntity={customSort}
            EntityName="Custom Sort">
        </EntityListActionButtons>
        myCols.push({ size: this.props.EntityRowInfo[2].Width, content: buttons });

        return <ConfigEntityRowItem
            items={myCols}
        />
    }

}