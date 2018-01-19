import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../Core/Helper';
import { Button, Col, Row, ButtonGroup, Panel } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRow, IColItem } from '../Components/ConfigEntityRow';

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
<<<<<<< HEAD
        let myCols: IColItem[] = []
        myCols.push({ size: 3, content: this.props.ColumnLabel });
        myCols.push({ size: 6, content: this.props.CustomSort.CustomSortItems.join(', ') });
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.CustomSort)}
            overrideDisableEdit={this.props.ColumnLabel.includes(Helper.MissingColumnMagicString)}
            ConfigEntity={this.props.CustomSort}
            EntityName="Custom Sort">
        </EntityListActionButtons>
        myCols.push({ size: 3, content: buttons });

        return <ConfigEntityRow
            items={myCols}
            />
=======
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={3}>{this.props.ColumnLabel}</Col>
                <Col xs={6} >
                    {this.props.CustomSort.CustomSortItems.join(', ')}
                </Col>
                <Col xs={3}>
                    <EntityListActionButtons
                        ConfirmDeleteAction={this.props.onDeleteConfirm}
                        showShare={this.props.TeamSharingActivated}
                        shareClick={() => this.props.onShare()}
                        editClick={() => this.props.onEdit(this.props.CustomSort)}
                        overrideDisableEdit={this.props.ColumnLabel.includes(Helper.MissingColumnMagicString)}
                        ConfigEntity={this.props.CustomSort}
                        EntityName="Custom Sort">
                    </EntityListActionButtons>
                </Col>
            </Row>
        </li>
>>>>>>> d8124607be5295d24aac33c46b01b2409145eb0c
    }

}