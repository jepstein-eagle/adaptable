import { IRange } from '../../../Core/Interface/IExportStrategy';
import * as React from "react";
import * as Redux from "redux";
import * as ExportRedux from '../../../Redux/ActionsReducers/ExportRedux'
import { Helper } from '../../../Core/Helper';
import { Button, Col, Row, ButtonGroup, Panel, Dropdown, Glyphicon, OverlayTrigger, Tooltip, MenuItem } from 'react-bootstrap';
import { EntityListActionButtons } from '../../Components/Buttons/EntityListActionButtons';
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { ExpressionHelper } from '../../../Core/Expression/ExpressionHelper';
import { IUserFilter } from '../../../Core/Interface/IExpression';
import { RangeScope, ExportDestination } from '../../../Core/Enums';
import { RangeHelper } from '../../../Core/Services/RangeHelper';

export interface RangeConfigItemProps extends React.ClassAttributes<RangeConfigItem> {
    Range: IRange
    UserFilters: IUserFilter[]
    onEdit: (Range: IRange) => void;
    onExport: (value: string, exportDestination: ExportDestination) => void;
    onDeleteConfirm: Redux.Action;
    Columns: Array<IColumn>
}

export class RangeConfigItem extends React.Component<RangeConfigItemProps, {}> {
    render(): any {

        let csvMenuItem: any = <MenuItem onClick={() => this.props.onExport(this.props.Range.Uid, ExportDestination.CSV)} key={"csv"}>{"Export to CSV"}</MenuItem>
        let clipboardMenuItem: any = <MenuItem onClick={() => this.props.onExport(this.props.Range.Uid, ExportDestination.Clipboard)} key={"clipboard"}> {"Export to Clipboard"}</MenuItem>

        return <li
            className="list-group-item"
            onClick={() => { }}>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={2}><span style={expressionFontSizeStyle}>
                    {this.props.Range.Name}
                </span>
                </Col>
                <Col xs={3} >
                    <span style={expressionFontSizeStyle}>
                        {RangeHelper.GetRangeColumnsDescription(this.props.Range, this.props.Columns)}
                    </span>
                </Col>
                <Col xs={3} >
                    <span style={expressionFontSizeStyle}>
                        {RangeHelper.GetRangeExpressionDescription(this.props.Range, this.props.Columns, this.props.UserFilters)}
                    </span>
                </Col>
                <Col xs={1}>
                    <OverlayTrigger overlay={<Tooltip id="tooltipShowInformation">Export</Tooltip>}>
                        <Dropdown id="dropdown-functions" >
                            <Dropdown.Toggle>
                                <Glyphicon glyph="export" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                {csvMenuItem}
                                {clipboardMenuItem}
                            </Dropdown.Menu>
                        </Dropdown>
                    </OverlayTrigger>
                </Col>
                <Col xs={3}>
                    <EntityListActionButtons
                        ConfirmDeleteAction={this.props.onDeleteConfirm}
                        editClick={() => this.props.onEdit(this.props.Range)}
                        ConfigEntity={this.props.Range}
                        EntityName="Range">
                    </EntityListActionButtons>
                </Col>
            </Row>
        </li>
    }
}


var expressionFontSizeStyle = {
    fontSize: 'small'
};