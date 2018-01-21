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
import { RangeColumnScope, ExportDestination } from '../../../Core/Enums';
import { RangeHelper } from '../../../Core/Services/RangeHelper';
import { OpenfinHelper } from '../../../Core/OpenfinHelper';
import { ILiveRange } from '../../../Core/Interface/IExportStrategy';
import { iPushPullHelper } from '../../../Core/iPushPullHelper';

export interface RangeConfigItemProps extends React.ClassAttributes<RangeConfigItem> {
    Range: IRange
    IsLast: boolean
    UserFilters: IUserFilter[]
    LiveRanges: ILiveRange[]
    onEdit: () => void;
    onExport: (exportDestination: ExportDestination) => void;
    onRangeStopLive: (exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => void,
    onDeleteConfirm: Redux.Action;
    Columns: Array<IColumn>;
    onShare: () => void;
}

export class RangeConfigItem extends React.Component<RangeConfigItemProps, {}> {
    render(): any {

        let csvMenuItem: any = <MenuItem onClick={() => this.props.onExport(ExportDestination.CSV)} key={"csv"}>{"Export to CSV"}</MenuItem>
        let clipboardMenuItem: any = <MenuItem onClick={() => this.props.onExport(ExportDestination.Clipboard)} key={"clipboard"}> {"Export to Clipboard"}</MenuItem>
        let openfinExcelMenuItem
        if (this.props.LiveRanges.find(x => x.Range == this.props.Range.Name)) {
            openfinExcelMenuItem = <MenuItem onClick={() => this.props.onRangeStopLive(ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Stop Live Openfin Excel"}</MenuItem>
        }
        else {
            openfinExcelMenuItem = <MenuItem onClick={() => this.props.onExport(ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Start Live Openfin Excel"}</MenuItem>
        }
        let iPushPullExcelMenuItem
        if (this.props.LiveRanges.find(x => x.Range == this.props.Range.Name && x.ExportDestination == ExportDestination.iPushPull)) {
            iPushPullExcelMenuItem = <MenuItem onClick={() => this.props.onRangeStopLive(ExportDestination.iPushPull)} key={"IPPExcel"}> {"Stop Sync with iPushPull"}</MenuItem>
        }
        else {
            iPushPullExcelMenuItem = <MenuItem onClick={() => this.props.onExport(ExportDestination.iPushPull)} key={"IPPExcel"}> {"Start Sync with iPushPull"}</MenuItem>
        }
        let hasLive = this.props.LiveRanges.find(x => x.Range == this.props.Range.Name && x.ExportDestination == ExportDestination.iPushPull) != null

        return <li
            className="list-group-item"
            onClick={() => { 
// stuff here -nee to change

            }}>
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
                    <OverlayTrigger overlay={<Tooltip id="tooltipShowInformation">{hasLive ? "Has a live export active." : "Export"}</Tooltip>}>
                        <Dropdown id="dropdown-functions" dropup={this.props.IsLast}  >
                            <Dropdown.Toggle bsStyle={hasLive ? "success" : "default"}>
                                <Glyphicon glyph="export" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                {csvMenuItem}
                                {clipboardMenuItem}
                                {
                                    OpenfinHelper.isRunningInOpenfin() && OpenfinHelper.isExcelOpenfinLoaded() && openfinExcelMenuItem
                                }
                                {
                                    iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </OverlayTrigger>
                </Col>
                <Col xs={3}>
                    <EntityListActionButtons
                        ConfirmDeleteAction={this.props.onDeleteConfirm}
                        editClick={() => this.props.onEdit()}
                        shareClick={() => this.props.onShare()}
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