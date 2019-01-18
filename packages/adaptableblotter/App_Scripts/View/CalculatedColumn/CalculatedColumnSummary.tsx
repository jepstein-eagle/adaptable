import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux'
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { CalculatedColumnWizard } from './Wizard/CalculatedColumnWizard'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { UIHelper } from '../UIHelper';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { ICalculatedColumn } from "../../Utilities/Interface/IAdaptableBlotterObjects";

export interface CalculatedColumnSummaryProps extends StrategySummaryProps<CalculatedColumnSummaryComponent> {
    CalculatedColumns: ICalculatedColumn[]
    onEdit: (index: number, calculatedColumn: ICalculatedColumn) => void;
    onDeleteConfirm: Redux.Action;
    CalculatedColumnErrorMessage: string
    IsExpressionValid: (expression: string) => CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction
}

export class CalculatedColumnSummaryComponent extends React.Component<CalculatedColumnSummaryProps, EditableConfigEntityState> {

    constructor(props: CalculatedColumnSummaryProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();
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
                        Item1={StrategyConstants.CalculatedColumnStrategyName}
                        Item2={item.ColumnExpression}
                        ConfigEnity={item}
                        showShare={this.props.TeamSharingActivated}
                        EntityName={StrategyConstants.CalculatedColumnStrategyName}
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
                     ModalContainer={this.props.ModalContainer}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    GetErrorMessage={() => this.props.CalculatedColumnErrorMessage}
                    IsExpressionValid={(expression) => this.props.IsExpressionValid(expression)}
                     Blotter={this.props.Blotter}
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
        CalculatedColumnErrorMessage: state.System.CalculatedColumnErrorMessage
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onEdit: (index: number, calculatedColumn: ICalculatedColumn) => dispatch(CalculatedColumnRedux.CalculatedColumnEdit(index, calculatedColumn)),
        IsExpressionValid: (expression: string) => dispatch(CalculatedColumnRedux.CalculatedColumnIsExpressionValid(expression))
    };
}

export let CalculatedColumnSummary = connect(mapStateToProps, mapDispatchToProps)(CalculatedColumnSummaryComponent);
