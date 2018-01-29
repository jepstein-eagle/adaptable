import { IRange } from '../../../Core/Interface/IExportStrategy';
import * as React from "react";
import * as Redux from "redux";
import * as ExportRedux from '../../../Redux/ActionsReducers/ExportRedux'
import { Helper } from '../../../Core/Helper';
import { Button, Col, Row, ButtonGroup, Panel, Dropdown, DropdownButton, Glyphicon, OverlayTrigger, Tooltip, MenuItem } from 'react-bootstrap';
import { EntityListActionButtons } from '../../Components/Buttons/EntityListActionButtons';
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { ExpressionHelper } from '../../../Core/Expression/ExpressionHelper';
import { IUserFilter } from '../../../Core/Interface/IExpression';
import { RangeColumnScope, ExportDestination } from '../../../Core/Enums';
import { RangeHelper } from '../../../Core/Services/RangeHelper';
import { OpenfinHelper } from '../../../Core/OpenfinHelper';
import { ILiveRange } from '../../../Core/Interface/IExportStrategy';
import { iPushPullHelper } from '../../../Core/iPushPullHelper';
import { ConfigEntityRowItem, IColItem } from '../../Components/ConfigEntityRowItem';

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
    isDropUp: boolean;
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

        let myCols: IColItem[] = []
        myCols.push({
            size: 2, content: this.props.Range.Name
        });
        myCols.push({ size: 3, content: RangeHelper.GetRangeColumnsDescription(this.props.Range, this.props.Columns) });
        myCols.push({ size: 3, content: RangeHelper.GetRangeExpressionDescription(this.props.Range, this.props.Columns, this.props.UserFilters) });
        myCols.push({
            size: 2, content:
                   
                           <DropdownButton dropup={this.props.isDropUp}
                            bsSize={"small"}
                            bsStyle={"default"}
                            title={"Export"}

                            key={this.props.Range.Name}
                            id={this.props.Range.Name}
                        >
                             {csvMenuItem}
                             {clipboardMenuItem}
                             {OpenfinHelper.isRunningInOpenfin() && OpenfinHelper.isExcelOpenfinLoaded() && openfinExcelMenuItem}
                             {iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem}
 
                        </DropdownButton>
    
        });
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit()}
            shareClick={() => this.props.onShare()}
            ConfigEntity={this.props.Range}
            EntityName="Range" />
        myCols.push({ size: 2, content: buttons });

        return <ConfigEntityRowItem items={myCols} />
    }
}


var expressionFontSizeStyle = {
    fontSize: 'small'
};