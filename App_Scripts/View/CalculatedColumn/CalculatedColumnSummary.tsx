import * as React from "react";
import * as Redux from "redux";
import { IStrategySummaryProps } from '../Components/SharedProps/IStrategySummary'
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

export interface CalculatedColumnSummaryProps extends IStrategySummaryProps<CalculatedColumnSummaryComponent> {
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
        let summaryItems: any[] = []

        this.props.CalculatedColumns.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                summaryItems.push(<b>{StrategyNames.CalculatedColumnStrategyName}</b>);
                summaryItems.push(item.GetValueFunc);
                summaryItems.push(<ButtonEdit onClick={() => this.onEdit(index, item)} DisplayMode="Glyph" />);
            }
        })

        return <div>
            {(summaryItems.length > 0) ? <SummaryRowItem SummaryItems={summaryItems} /> : null}

            {this.state.EditedConfigEntity &&
                <CalculatedColumnWizard
                    EditedCalculatedColumn={this.state.EditedConfigEntity as ICalculatedColumn}
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
        this.setState({ EditedConfigEntity: Helper.cloneObject(calculatedColumn), WizardStartIndex: 1, EditedIndexConfigEntity: index });
    }

    onCloseWizard() {
         this.state = UIHelper.EmptyConfigState();
    }

    onFinishWizard() {
        let calculatedColumn: ICalculatedColumn = Helper.cloneObject(this.state.EditedConfigEntity);
        this.props.onEdit(this.state.EditedIndexConfigEntity, calculatedColumn);
        this.state = UIHelper.EmptyConfigState();
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
