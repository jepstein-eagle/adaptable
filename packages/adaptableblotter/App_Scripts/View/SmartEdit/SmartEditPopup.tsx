import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { FormControl, Panel, FormGroup, DropdownButton, Button, Table, MenuItem, InputGroup, Glyphicon } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux'
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { MathOperation, MessageType } from '../../Utilities/Enums'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { IColumn } from '../../Api/Interface/IColumn';
import { AdaptablePopover } from '../AdaptablePopover';
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { PreviewResultsPanel } from "../Components/PreviewResultsPanel";
import { PreviewHelper } from "../../Utilities/Helpers/PreviewHelper";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { ICellValidationRule } from "../../Utilities/Interface/IAdaptableBlotterObjects";
import { DEFAULT_BSSTYLE, WARNING_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { IPreviewInfo } from "../../Utilities/Interface/IPreview";
import { IUIConfirmation } from "../../Utilities/Interface/IMessage";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";

interface SmartEditPopupProps extends StrategyViewPopupProps<SmartEditPopupComponent> {
    SmartEditValue: string;
    MathOperation: MathOperation;
    PreviewInfo: IPreviewInfo;
    onSmartEditValueChange: (value: number) => SmartEditRedux.SmartEditChangeValueAction;
    onSmartEditOperationChange: (MathOperation: MathOperation) => SmartEditRedux.SmartEditChangeOperationAction;
    onSmartEditCheckSelectedCells: () => SystemRedux.SmartEditCheckCellSelectionAction;
    onApplySmartEdit: () => SmartEditRedux.SmartEditApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}

class SmartEditPopupComponent extends React.Component<SmartEditPopupProps, {}> {

    constructor(props:SmartEditPopupProps) {
        super(props);
        this.state = { isShowingError: false, errorText: "" }
    }

    public componentDidMount() {
        this.props.onSmartEditCheckSelectedCells();
    }


    render() {
        let cssClassName: string = this.props.cssClassName + "__smartedit";
        let infoBody: any[] = ["Click ", <i><b>Apply to Grid</b></i>,
            " button to update all selected cells with the values showing in the Preview Results grid.", <br />, <br />,
            "This value will be calculated based on the Maths operation selected in the dropdown", <br />, <br />,
            "Smart Edits that break Cell Validation Rules will be flagged and prevented."]

        let col: IColumn
        if (this.props.PreviewInfo) {
            col = ColumnHelper.getColumnFromId(this.props.PreviewInfo.ColumnId, this.props.Columns);
        }


        let globalValidationMessage: string = PreviewHelper.GetValidationMessage(this.props.PreviewInfo, this.props.SmartEditValue);

        let showPanel: boolean = this.props.PreviewInfo && StringExtensions.IsNotNullOrEmpty(this.props.SmartEditValue)

        let previewPanel = showPanel ?
            <PreviewResultsPanel
                cssClassName={cssClassName}
                UpdateValue={this.props.SmartEditValue}
                PreviewInfo={this.props.PreviewInfo}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SelectedColumn={col}
                ShowPanel={showPanel}
                ShowHeader={true}
            /> :
            null

        let operationMenuItems = EnumExtensions.getNames(MathOperation).filter(e => e != MathOperation.Replace).map((mathOperation: MathOperation, index) => {
            return <MenuItem key={index} eventKey="index" onClick={() => this.props.onSmartEditOperationChange(mathOperation)}>{mathOperation as MathOperation}</MenuItem>
        })

        return (<div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.SmartEditStrategyName} bsStyle="primary" glyphicon={StrategyConstants.SmartEditGlyph} infoBody={infoBody}>
                <AdaptableBlotterForm inline onSubmit={() => this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplySmartEdit()}>
                    <FormGroup controlId="formInlineName">
                        <InputGroup>
                            <DropdownButton title={MathOperation[this.props.MathOperation]} id="SmartEdit_Operation" componentClass={InputGroup.Button}>
                                {operationMenuItems}
                            </DropdownButton>
                            <FormControl value={this.props.SmartEditValue.toString()} type="number" placeholder="Enter a Number" step="any" onChange={(e) => this.onSmartEditValueChange(e)} />
                        </InputGroup>
                    </FormGroup>
                    {' '}
                    <Button bsStyle={this.getButtonStyle()}
                        disabled={StringExtensions.IsNullOrEmpty(this.props.SmartEditValue) || (this.props.PreviewInfo && this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent)}
                        onClick={() => { this.props.PreviewInfo && this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplySmartEdit() }} >Apply to Grid</Button>
                    {' '}
                    {(this.props.PreviewInfo && this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning) &&
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Validation Error"} bodyText={[globalValidationMessage]} MessageType={MessageType.Warning} />}
                    {(this.props.PreviewInfo && !this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning && this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) &&
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Validation Error"} bodyText={[globalValidationMessage]} MessageType={MessageType.Error} />}
                </AdaptableBlotterForm>
            </PanelWithImage>
            {previewPanel}
        </div>
        );
    }

    private onSmartEditValueChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        this.props.onSmartEditValueChange(Number(e.value));
    }

    private onApplySmartEdit(): void {
        this.props.onApplySmartEdit()
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

    private getButtonStyle(): string {
        if (this.props.PreviewInfo) {
            if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
                return DEFAULT_BSSTYLE;
            }
            if (this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning || this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) {
                return WARNING_BSSTYLE;
            }
        }
        return "success";
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        SmartEditValue: state.SmartEdit.SmartEditValue,
        MathOperation: state.SmartEdit.MathOperation,
        PreviewInfo: state.System.SmartEditPreviewInfo,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSmartEditValueChange: (value: number) => dispatch(SmartEditRedux.SmartEditChangeValue(value)),
        onSmartEditOperationChange: (SmartEditOperation: MathOperation) => dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation)),
        onSmartEditCheckSelectedCells: () => dispatch(SystemRedux.SmartEditCheckCellSelection()),
        onApplySmartEdit: () => dispatch(SmartEditRedux.SmartEditApply(false)),
        onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    };
}

export let SmartEditPopup = connect(mapStateToProps, mapDispatchToProps)(SmartEditPopupComponent);

