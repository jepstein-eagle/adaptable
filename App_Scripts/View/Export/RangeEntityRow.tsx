import { IRange } from '../../Strategy/Interface/IExportStrategy';
import * as React from "react";
import * as Redux from "redux";
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import { Helper } from '../../Core/Helpers/Helper';
import { Button, Col, Row, ButtonGroup, Panel, Dropdown, DropdownButton, Glyphicon, OverlayTrigger, Tooltip, MenuItem } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { RangeColumnScope, ExportDestination } from '../../Core/Enums';
import { RangeHelper } from '../../Core/Helpers/RangeHelper';
import { OpenfinHelper } from '../../Core/Helpers/OpenfinHelper';
import { ILiveRange } from '../../Strategy/Interface/IExportStrategy';
import { iPushPullHelper } from '../../Core/Helpers/iPushPullHelper';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';

export interface RangeEntityRowProps extends SharedEntityExpressionRowProps<RangeEntityRow> {
    IsLast: boolean
    LiveRanges: ILiveRange[]
    onExport: (exportDestination: ExportDestination) => void;
    onRangeStopLive: (exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => void,
    isDropUp: boolean;
}

export class RangeEntityRow extends React.Component<RangeEntityRowProps, {}> {
    render(): any {
        let range: IRange = this.props.ConfigEntity as IRange;
        let csvMenuItem: any = <MenuItem onClick={() => this.props.onExport(ExportDestination.CSV)} key={"csv"}>{"Export to CSV"}</MenuItem>
        let clipboardMenuItem: any = <MenuItem onClick={() => this.props.onExport(ExportDestination.Clipboard)} key={"clipboard"}> {"Export to Clipboard"}</MenuItem>
        let openfinExcelMenuItem = (this.props.LiveRanges.find(x => x.Range == range.Name)) ?
            <MenuItem onClick={() => this.props.onRangeStopLive(ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Stop Live Openfin Excel"}</MenuItem>
            : <MenuItem onClick={() => this.props.onExport(ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Start Live Openfin Excel"}</MenuItem>

        let iPushPullExcelMenuItem = (this.props.LiveRanges.find(x => x.Range == range.Name && x.ExportDestination == ExportDestination.iPushPull)) ?
            <MenuItem onClick={() => this.props.onRangeStopLive(ExportDestination.iPushPull)} key={"IPPExcel"}> {"Stop Sync with iPushPull"}</MenuItem>
            : <MenuItem onClick={() => this.props.onExport(ExportDestination.iPushPull)} key={"IPPExcel"}> {"Start Sync with iPushPull"}</MenuItem>

        let hasLive = this.props.LiveRanges.find(x => x.Range == range.Name && x.ExportDestination == ExportDestination.iPushPull) != null

        let myCols: IColItem[] = []
        myCols.push({
            size: this.props.EntityRowInfo[0].Width, content: range.Name
        });
        myCols.push({ size: this.props.EntityRowInfo[1].Width, content: RangeHelper.GetRangeColumnsDescription(range, this.props.Columns) });
        myCols.push({ size:this.props.EntityRowInfo[2].Width, content: RangeHelper.GetRangeExpressionDescription(range, this.props.Columns, this.props.UserFilters) });
        myCols.push({
            size: this.props.EntityRowInfo[3].Width, content:

                <DropdownButton dropup={this.props.isDropUp}
                    bsSize={"small"}
                    bsStyle={"default"}
                    title={"Export"}
                    key={range.Name}
                    id={range.Name}                >
                    {csvMenuItem}
                    {clipboardMenuItem}
                    {OpenfinHelper.isRunningInOpenfin() && OpenfinHelper.isExcelOpenfinLoaded() && openfinExcelMenuItem}
                    {iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem}

                </DropdownButton>

        });
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, range)}
            shareClick={() => this.props.onShare()}
            ConfigEntity={range}
            EntityName="Range" />
        myCols.push({ size: this.props.EntityRowInfo[4].Width, content: buttons });

        return <ConfigEntityRowItem items={myCols} />
    }
}


var expressionFontSizeStyle = {
    fontSize: 'small'
};