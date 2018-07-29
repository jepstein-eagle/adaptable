import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { CalculatedColumnWizard } from './Wizard/CalculatedColumnWizard'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { UIHelper } from '../UIHelper';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { StringExtensions } from "../../Core/Extensions/StringExtensions";
import { ICalculatedColumn } from "../../Core/Api/Interface/AdaptableBlotterObjects";

export interface CalculatedColumnSummaryProps extends StrategySummaryProps<CalculatedColumnSummaryComponent> {
    CalculatedColumns: ICalculatedColumn[]
    onEdit: (index: number, calculatedColumn: ICalculatedColumn) => void;
    onDeleteConfirm: Redux.Action;
    CalculatedColumnErrorMessage: string
    IsExpressionValid: (expression: string) => CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction
}

export class CalculatedColumnSummaryComponent extends React.Component<CalculatedColumnSummaryProps, EditableConfigEntityState> {

    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState();
    }

    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__calculatedcolumn";
         let detailRow;

        let sharing = this.props.TeamSharingActivated;

        this.props.CalculatedColumns.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                detailRow =
                    <StrategyDetail
                        cssClassName={this.props.cssClassName}
                        key={"UF" + index}
                        Item1={StrategyNames.CalculatedColumnStrategyName}
                        Item2={item.ColumnExpression}
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

        return <div>
            {detailRow}

            {this.state.EditedAdaptableBlotterObject &&
                <CalculatedColumnWizard
                   cssClassName={cssWizardClassName}
                    EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as ICalculatedColumn}
                    ConfigEntities={this.props.CalculatedColumns}
                    Columns={this.props.Columns}
                    BlotterOptions={this.props.BlotterOptions}
                    BlotterApi={this.props.BlotterApi}
                    ModalContainer={this.props.ModalContainer}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    GetErrorMessage={() => this.props.CalculatedColumnErrorMessage}
                    IsExpressionValid={(expression) => this.props.IsExpressionValid(expression)}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    onCloseWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                    canFinishWizard={()=>this.canFinishWizard()} />
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

    canFinishWizard() {
        let calculatedColumn = this.state.EditedAdaptableBlotterObject as ICalculatedColumn
        return StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnId)  && StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnExpression)
      }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        CalculatedColumnErrorMessage: state.CalculatedColumn.CalculatedColumnErrorMessage
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onEdit: (index: number, calculatedColumn: ICalculatedColumn) => dispatch(CalculatedColumnRedux.CalculatedColumnEdit(index, calculatedColumn)),
        IsExpressionValid: (expression: string) => dispatch(CalculatedColumnRedux.CalculatedColumnIsExpressionValid(expression))
    };
}

export let CalculatedColumnSummary = connect(mapStateToProps, mapDispatchToProps)(CalculatedColumnSummaryComponent);
