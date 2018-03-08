import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ICalculatedColumn } from '../../Strategy/Interface/ICalculatedColumnStrategy';
import { SummaryRowItem } from '../Components/StrategySummary/SummaryRowItem';
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { CalculatedColumnWizard } from './Wizard/CalculatedColumnWizard'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { UIHelper } from '../UIHelper';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'

export interface CalculatedColumnSummaryProps extends StrategySummaryProps<CalculatedColumnSummaryComponent> {
    CalculatedColumns: ICalculatedColumn[]
    onEdit: (index: number, calculatedColumn: ICalculatedColumn) => void;
    onDeleteConfirm: Redux.Action;
    EditedCalculatedColumnInvalidErrorMsg: string
    IsExpressionValid: (expression: string) => CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction
}

export class CalculatedColumnSummaryComponent extends React.Component<CalculatedColumnSummaryProps, EditableConfigEntityState> {

    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState();
    }

    render(): any {
       let detailRow;

       let sharing =this.props.TeamSharingActivated;

        this.props.CalculatedColumns.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                 detailRow =
                <StrategyDetail
                    key={"UF" + index}
                    Item1={StrategyNames.CalculatedColumnStrategyName}
                    Item2={item.GetValueFunc}
                    ConfigEnity={item}
                    showShare={this.props.TeamSharingActivated}
                    EntityName={StrategyNames.CalculatedColumnStrategyName}
                    onEdit={() => this.onEdit(index, item)}
                    onShare={() => this.props.onShare(item)}
                    onDelete={CalculatedColumnRedux.CalculatedColumnDelete(index)}
                    showBold={true}
                />   
            }
        })

        return <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
             {detailRow}

            {this.state.EditedAdaptableBlotterObject &&
                <CalculatedColumnWizard
                    EditedCalculatedColumn={this.state.EditedAdaptableBlotterObject as ICalculatedColumn}
                    Columns={this.props.Columns}
                    GetErrorMessage={() => this.props.EditedCalculatedColumnInvalidErrorMsg}
                    IsExpressionValid={(expression) => this.props.IsExpressionValid(expression)}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </div>
    }

    onEdit(index: number, calculatedColumn: ICalculatedColumn) {
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(calculatedColumn), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }

    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let calculatedColumn: ICalculatedColumn = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        this.props.onEdit(this.state.EditedAdaptableBlotterObjectIndex, calculatedColumn);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        EditedCalculatedColumnInvalidErrorMsg: state.CalculatedColumn.EditedCalculatedColumnInvalidErrorMsg
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onEdit: (index: number, calculatedColumn: ICalculatedColumn) => dispatch(CalculatedColumnRedux.CalculatedColumnEdit(index, calculatedColumn)),
        IsExpressionValid: (expression: string) => dispatch(CalculatedColumnRedux.CalculatedColumnIsExpressionValid(expression))
    };
}

export let CalculatedColumnSummary = connect(mapStateToProps, mapDispatchToProps)(CalculatedColumnSummaryComponent);
