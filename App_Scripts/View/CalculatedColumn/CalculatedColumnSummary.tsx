import * as React from "react";
import * as Redux from "redux";
import { Col, Row, FormControl, Button } from 'react-bootstrap';
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { Provider, connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyNames from '../../Core/StrategyNames'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import { ICalculatedColumn } from '../../Strategy/Interface/ICalculatedColumnStrategy';
import * as FlashingCellRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import { SummaryRowItem } from '../Components/SummaryRowItem';
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { CalculatedColumnWizard } from './Wizard/CalculatedColumnWizard'
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';


export interface CalculatedColumnSummaryProps extends IStrategySummaryProps<CalculatedColumnSummaryComponent> {
    CalculatedColumns: ICalculatedColumn[]
    onEdit: (index: number, calculatedColumn: ICalculatedColumn) => void;
    onDeleteConfirm: Redux.Action;
    EditedCalculatedColumnInvalidErrorMsg: string
    IsExpressionValid: (expression: string) => CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction
}

export class CalculatedColumnSummaryComponent extends React.Component<CalculatedColumnSummaryProps, EditableConfigEntityInternalState> {
   
    constructor() {
        super();
        this.state = { EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 }
    }
    
    render(): any {
        let summaryItems: any[] = []

        this.props.CalculatedColumns.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                summaryItems.push(<b>{StrategyNames.CalculatedColumnStrategyName}</b> );
                summaryItems.push(item.GetValueFunc );
                summaryItems.push(<ButtonEdit onClick={() => this.onEdit(index, item)} DisplayMode="Glyph" /> );
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
        //   this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }

    onFinishWizard() {
        this.props.onEdit(this.state.EditedIndexConfigEntity, this.state.EditedConfigEntity as ICalculatedColumn);
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
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

export let  CalculatedColumnSummary = connect(mapStateToProps, mapDispatchToProps)(CalculatedColumnSummaryComponent);
