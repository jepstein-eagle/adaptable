import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import {  InputGroup, DropdownButton, FormControl, MenuItem } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { ButtonApply } from '../Components/Buttons/ButtonApply';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { IPreviewInfo } from "../../Core/Interface/IPreviewResult";
import { IUIConfirmation } from "../../Core/Interface/IMessage";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import { AdaptablePopover } from "../AdaptablePopover";
import { StatusColour, MathOperation } from "../../Core/Enums";
import { PreviewResultsPanel } from "../Components/PreviewResultsPanel";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";
import { EnumExtensions } from "../../Core/Extensions/EnumExtensions";
import { UIHelper } from "../UIHelper";

interface SmartEditToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<SmartEditToolbarControlComponent> {
    SmartEditValue: string;
    MathOperation: MathOperation;
    IsValidSelection: boolean;
    PreviewInfo: IPreviewInfo;
    onSmartEditValueChange: (value: number) => SmartEditRedux.SmartEditChangeValueAction;
    onSmartEditOperationChange: (MathOperation: MathOperation) => SmartEditRedux.SmartEditChangeOperationAction;
    onSmartEditCheckSelectedCells: () => SmartEditRedux.SmartEditCheckCellSelectionAction;
    onApplySmartEdit: () => SmartEditRedux.SmartEditApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}

interface SmartEditToolbarControlComponentState {
    SelectedColumnId: string
    SubFunc: any
}

class SmartEditToolbarControlComponent extends React.Component<SmartEditToolbarControlComponentProps, SmartEditToolbarControlComponentState> {
    constructor(props: SmartEditToolbarControlComponentProps) {
        super(props);
        this.state = {
            SelectedColumnId: "",
            SubFunc: (sender: IAdaptableBlotter, event: IAdaptableBlotter) => {
                this.onSelectionChanged()
            }
        }
    }
    public componentDidMount() {
        if (this.props.Blotter) {
            this.props.Blotter.onSelectedCellsChanged().Subscribe(this.state.SubFunc)
        }
    }

    public componentWillUnmount() {
        if (this.props.Blotter) {
            this.props.Blotter.onSelectedCellsChanged().Unsubscribe(this.state.SubFunc)
        }
    }


    render() {

        let statusColour: StatusColour = this.getStatusColour()
      
        let cssClassName: string = this.props.cssClassName + "__SmartEdit";

        let selctedColumn = ColumnHelper.getColumnFromId(this.state.SelectedColumnId, this.props.Columns);
        let previewPanel =
            <PreviewResultsPanel
                cssClassName={cssClassName}
                UpdateValue={this.props.SmartEditValue}
                PreviewInfo={this.props.PreviewInfo}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SelectedColumn={selctedColumn}
                ShowPanel={true}
                ShowHeader={false}
            />

        let operationMenuItems = EnumExtensions.getNames(MathOperation).filter(e => e != MathOperation.Replace).map((mathOperation: MathOperation, index) => {
            return <MenuItem key={index} eventKey="index" onClick={() => this.props.onSmartEditOperationChange(mathOperation)}>{mathOperation as MathOperation}</MenuItem>
        })

        let content = <span>
            <div className={this.props.IsReadOnly || !this.props.IsValidSelection ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <InputGroup>

                    <DropdownButton style={{ marginRight: "3px", width: "75px" }} title={this.props.MathOperation} id="SmartEdit_Operation" bsSize="small" componentClass={InputGroup.Button}>
                        {operationMenuItems}
                    </DropdownButton>

                    <FormControl value={this.props.SmartEditValue.toString()} style={{ width: "70px" }} type="number" placeholder="Enter a Number" bsSize="small" step="any" onChange={(e) => this.onSmartEditValueChange(e)} />
                </InputGroup>

                {this.props.IsValidSelection &&
                    <ButtonApply cssClassName={cssClassName}
                        style={{ marginLeft: "3px" }}
                        onClick={() => this.onApplyClick()}
                        size={"small"}
                        glyph={"ok"}
                        bsStyle={UIHelper.getStyleNameByStatusColour(statusColour)}
                        overrideTooltip="Apply Smart Edit"
                        overrideDisableButton={StringExtensions.IsNullOrEmpty(this.props.SmartEditValue) || (this.props.PreviewInfo != null && this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent)}
                        DisplayMode="Glyph" />
                }

                {this.props.IsValidSelection &&
                    <span style={{ marginLeft: "3px" }}>
                        <AdaptablePopover cssClassName={cssClassName} headerText="Preview Results" tooltipText="Preview Results" bodyText={[previewPanel]} MessageType={UIHelper.getMessageTypeByStatusColour(statusColour)} useButton={true} triggerAction={"click"} />
                    </span>
                }

            </div>
        </span>

        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyNames.SmartEditStrategyName} glyphicon={StrategyGlyphs.SmartEditGlyph} onClose={() => this.props.onClose(StrategyIds.SmartEditStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
            {content}
        </PanelDashboard>
    }

    private onSmartEditValueChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        this.props.onSmartEditValueChange(Number(e.value));
    }

    private onSelectionChanged(): void {
        this.props.onSmartEditCheckSelectedCells();
    }


    private getStatusColour(): StatusColour {
        if (StringExtensions.IsNotNullOrEmpty(this.props.SmartEditValue) && this.props.PreviewInfo) {
            if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
                return StatusColour.Red;
            }
            if (this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning || this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) {
                return StatusColour.Amber;
            }
        }
        return StatusColour.Green;
    }

    private getMathOperationSymbol(mathOperation: MathOperation): string {
        switch (mathOperation) {
            case MathOperation.Add:
                return "+"
            case MathOperation.Subtract:
                return "-";
            case MathOperation.Multiply:
                return "x";
            case MathOperation.Divide:
                return "/";
        }
    }

    private onApplyClick(): void {
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ?
            this.onConfirmWarningCellValidation() :
            this.onApplySmartEdit()
    }

    private onConfirmWarningCellValidation() {
        let confirmation: IUIConfirmation = {
            CancelText: "Cancel Edit",
            ConfirmationTitle: "Cell Validation Failed",
            ConfirmationMsg: "Do you want to continue?",
            ConfirmationText: "Bypass Rule",
            CancelAction: SmartEditRedux.SmartEditApply(false),
            ConfirmAction: SmartEditRedux.SmartEditApply(true),
            ShowCommentBox: true
        }
        this.props.onConfirmWarningCellValidation(confirmation)
    }

    onApplySmartEdit(): any {
        this.props.onApplySmartEdit()
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        SmartEditValue: state.SmartEdit.SmartEditValue,
        MathOperation: state.SmartEdit.MathOperation,
        IsValidSelection: state.SmartEdit.IsValidSelection,
        PreviewInfo: state.SmartEdit.PreviewInfo,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSmartEditValueChange: (value: number) => dispatch(SmartEditRedux.SmartEditChangeValue(value)),
        onSmartEditOperationChange: (SmartEditOperation: MathOperation) => dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation)),
        onSmartEditCheckSelectedCells: () => dispatch(SmartEditRedux.SmartEditCheckCellSelection()),
        onApplySmartEdit: () => dispatch(SmartEditRedux.SmartEditApply(false)),
        onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShowScreen(ScreenPopups.SmartEditPopup, isReadOnly))
    };
}

export let SmartEditToolbarControl = connect(mapStateToProps, mapDispatchToProps)(SmartEditToolbarControlComponent);
