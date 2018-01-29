import * as React from "react";
import * as Redux from "redux";
import { Col, Row, Checkbox, FormControl, Button } from 'react-bootstrap';
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { StrategySummaryInternalState } from '../../Core/Interface/IStrategySummary'
import { Provider, connect } from 'react-redux';
import { Helper } from '../../Core/Helper';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyNames from '../../Core/StrategyNames'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import { ICalculatedColumn } from '../../Core/Interface/ICalculatedColumnStrategy';
import * as FlashingCellRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { CalculatedColumnWizard } from './Wizard/CalculatedColumnWizard'


export interface CalculatedColumnSummaryProps extends IStrategySummaryProps<CalculatedColumnSummaryComponent> {
    CalculatedColumns: ICalculatedColumn[]
    onEdit: (index: number, calculatedColumn: ICalculatedColumn) => void;
    onDeleteConfirm: Redux.Action;
    EditedCalculatedColumnInvalidErrorMsg: string
    IsExpressionValid: (expression: string) => CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction
}

export class CalculatedColumnSummaryComponent extends React.Component<CalculatedColumnSummaryProps, StrategySummaryInternalState> {
   
    constructor() {
        super();
        this.state = { EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 }
    }
    
    render(): any {
        let myCols: IColItem[] = []

        this.props.CalculatedColumns.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                myCols.push({ size: 3, content: <b>{StrategyNames.CalculatedColumnStrategyName}</b> });
                myCols.push({ size: 6, content: item.GetValueFunc });
                myCols.push({ size: 3, content: <ButtonEdit onClick={() => this.onEdit(index, item)} DisplayMode="Glyph" /> });
            }
        })

        return <div>
            {(myCols.length > 0) ? <ConfigEntityRowItem items={myCols} /> : null}

            {this.state.EditedItem &&
                <CalculatedColumnWizard
                    EditedCalculatedColumn={this.state.EditedItem as ICalculatedColumn}
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
        this.setState({ EditedItem: Helper.cloneObject(calculatedColumn), WizardStartIndex: 1, EditedItemIndex: index });
    }

    onCloseWizard() {
        //   this.props.onClearPopupParams()
        this.setState({ EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 });
    }

    onFinishWizard() {
        this.props.onEdit(this.state.EditedItemIndex, this.state.EditedItem as ICalculatedColumn);
        this.setState({ EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 });
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
