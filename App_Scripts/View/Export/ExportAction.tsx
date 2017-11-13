import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'
import { FormControl, Panel, Form, FormGroup, MenuItem, Button, ControlLabel, Checkbox, Row, Col, Well, HelpBlock, OverlayTrigger, Tooltip, DropdownButton } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as RangeRedux from '../../Redux/ActionsReducers/RangeRedux'
import { ExportDestination, PopoverType, SortOrder } from '../../Core/Enums'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import * as StrategyIds from '../../Core/StrategyIds'
import { StringExtensions } from '../../Core/Extensions';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { IUIConfirmation } from '../../Core/Interface/IStrategy';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IRange } from "../../Core/Interface/IExportStrategy";
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { RangeHelper } from "../../Core/Services/RangeHelper";
import { Helper } from '../../Core/Helper';


interface ExportActionProps extends IStrategyViewPopupProps<ExportActionComponent> {
    Ranges: IRange[],
    CurrentRange: string,
    onExport: (value: string, exportDestination: ExportDestination) => ExportRedux.ExportAction;
    onSelectRange: (rangeUid: string) => RangeRedux.RangeSelectAction;
    onNewRange: () => PopupRedux.PopupShowAction;
    onEditRange: () => PopupRedux.PopupShowAction;

}

class ExportActionComponent extends React.Component<ExportActionProps, {}> {

    render() {

        let infoBody: any[] = ["Use layouts to create and manage multiple named, sets of ordered columns", <br />, <br />, "To change a layout choose an item from the dropdown (you can also use the dropdown in the layout toolbar)", <br />, <br />, "To create a new layout, enter a name in the 'Save As New Layout' textbox."]
        let sortedRanges = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.Ranges, "Name")
        let rangeEntity = this.props.Ranges.find(x => x.Uid == this.props.CurrentRange)
        let rangeEntityUid = rangeEntity ? rangeEntity.Uid : ""
        let rangeEntityName = rangeEntity ? rangeEntity.Name : ""

        let csvMenuItem: any = <MenuItem onClick={() => this.props.onExport(rangeEntityUid, ExportDestination.CSV)} key={"csv"}>{"CSV"}</MenuItem>
        let clipboardMenuItem: any = <MenuItem onClick={() => this.props.onExport(rangeEntityUid, ExportDestination.Clipboard)} key={"clipboard"}> {"Clipboard"}</MenuItem>

        return (
            <PanelWithImage header="Export" bsStyle="primary" glyphicon="th" infoBody={infoBody}>

                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="load">
                    <Col xs={2} >
                                <ControlLabel >Range:</ControlLabel>
                            </Col>
                              <Col xs={4}>
                            <Typeahead className={"adaptable_blotter_typeahead_inline"} ref="typeahead" emptyLabel={"No Ranges found with that search"}
                                placeholder={"Select a Range"}
                                labelKey={"Name"}
                                filterBy={["Name"]}
                                clearButton={true}
                                selected={rangeEntity ? [rangeEntity] : []}
                                onChange={(selected) => { this.onSelectedRangeChanged(selected) }}
                                options={sortedRanges}
                            />
                        </Col>
                        <Col xs={6}>
                            {' '}
                            <DropdownButton bsStyle="default" title="Export To" id="exportDropdown" disabled={rangeEntityName == ""} >
                                {csvMenuItem}
                                {clipboardMenuItem}
                            </DropdownButton>
                            {' '}
                            <ButtonEdit onClick={() => this.props.onEditRange()}
                                overrideTooltip="Edit Range"
                                overrideDisableButton={RangeHelper.IsSystemRange(rangeEntity)}
                                ConfigEntity={rangeEntity}
                                DisplayMode="Glyph" />
                            {' '}
                            <ButtonNew onClick={() => this.props.onNewRange()}
                                overrideTooltip="Create New Range"
                                DisplayMode="Glyph" />
                            {' '}
                            <ButtonDelete
                                overrideTooltip="Delete Range"
                                overrideDisableButton={RangeHelper.IsSystemRange(rangeEntity)}
                                ConfigEntity={rangeEntity}
                                DisplayMode="Glyph"
                                ConfirmAction={RangeRedux.RangeDelete(rangeEntity)}
                                ConfirmationMsg={"Are you sure you want to delete '" + rangeEntityName + "'?"}
                                ConfirmationTitle={"Delete Range"} />
                        </Col>
                    </FormGroup>
                </AdaptableBlotterForm>

            </PanelWithImage>
        );
    }

    onSelectedRangeChanged(selected: IRange[]) {
        this.props.onSelectRange(selected.length > 0 ? selected[0].Uid : "");
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Ranges: state.Range.Ranges,
        CurrentRange: state.Range.CurrentRangeId,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectRange: (value: string) => dispatch(RangeRedux.RangeSelect(value)),
        onExport: (value: string, exportDestination: ExportDestination) => dispatch(ExportRedux.Export(value, exportDestination)),
        onNewRange: () => dispatch(PopupRedux.PopupShow("RangeConfig", false, "New")),
        onEditRange: () => dispatch(PopupRedux.PopupShow("RangeConfig", false, "Edit"))
    };
}

export let ExportAction = connect(mapStateToProps, mapDispatchToProps)(ExportActionComponent);

