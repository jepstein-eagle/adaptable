import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../Core/Helper';
import { Button, Col, Row, ButtonGroup, Panel } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';

export interface CustomSortConfigItemProps extends React.ClassAttributes<CustomSortConfigItem> {
    CustomSort: ICustomSort
    ColumnLabel: string
    onEdit: (CustomSort: ICustomSort) => void;
    onShare: () => void;
    TeamSharingActivated: boolean
    onDeleteConfirm: Redux.Action;
}


export class CustomSortConfigItem extends React.Component<CustomSortConfigItemProps, {}> {
    render(): any {
        let myCols: IColItem[] = []
        myCols.push({ size: 3, content: this.props.ColumnLabel });
        myCols.push({ size: 6, content: this.props.CustomSort.CustomSortItems.join(', ') });
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.CustomSort)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            overrideDisableEdit={this.props.ColumnLabel.includes(Helper.MissingColumnMagicString)}
            ConfigEntity={this.props.CustomSort}
            EntityName="Custom Sort">
        </EntityListActionButtons>
        myCols.push({ size: 3, content: buttons });

        return <ConfigEntityRowItem
            items={myCols}
            />
    }

}