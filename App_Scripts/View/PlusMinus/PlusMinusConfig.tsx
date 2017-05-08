import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormGroup, Panel, ControlLabel, FormControl, Row, Col, ButtonToolbar, ListGroup, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Expression } from '../../Core/Expression/Expression';
import { Helper } from '../../Core/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { PlusMinusSettingsWizard } from './PlusMinusSettingsWizard'
import { PlusMinusExpressionWizard } from './PlusMinusExpressionWizard'
import { IPlusMinusCondition } from '../../Core/Interface/IPlusMinusStrategy'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { IUserFilter } from '../../Core/Interface/IExpression'
import { ObjectFactory } from '../../Core/ObjectFactory';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { DataType } from '../../Core/Enums';
import { StringExtensions } from '../../Core/Extensions'

interface PlusMinusConfigProps extends IStrategyViewPopupProps<PlusMinusConfigComponent> {
    DefaultNudgeValue: number,
    Columns: IColumn[],
    UserFilters: IUserFilter[],
    PlusMinusConditions: IPlusMinusCondition[]
    onSetDefaultNudgeValue: (value: number) => PlusMinusRedux.PlusMinusSetDefaultNudgeAction
    onEditColumnDefaultNudgeValue: (Index: number, ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }) => PlusMinusRedux.PlusMinusEditConditionAction
    onAddColumnDefaultNudgeValue: (Index: number, ColumnsDefaultNudge: IPlusMinusCondition) => PlusMinusRedux.PlusMinusAddUpdateConditionAction
}

interface PlusMinusConfigState {
    EditedPlusMinusCondition: IPlusMinusCondition
    EditedIndexColumnNudgeValue: number
}


class PlusMinusConfigComponent extends React.Component<PlusMinusConfigProps, PlusMinusConfigState> {
    constructor() {
        super();
        this.state = { EditedPlusMinusCondition: null, EditedIndexColumnNudgeValue: -1 }

    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let plusMinus = ObjectFactory.CreateEmptyPlusMinusCondition(this.props.DefaultNudgeValue)
                plusMinus.ColumnId = arrayParams[1]
                this.setState({ EditedPlusMinusCondition: plusMinus, EditedIndexColumnNudgeValue: -1 });
            }
        }
    }
    render() {
        let infoBody: any[] = ["Enables the creation of Plus/Minus 'Nudge' Rules (i.e. how much to increment numeric cells when ", <i>'+'</i>, " or ", <i>'-'</i>, " keys are pressed on the keyboard).", <br />, <br />, "Plus Minus Rules can be set for", <ul><li>The Whole Blotter</li><li>A Single Column</li><li>A Column dependent on other values in the row (created using the expression wizard)</li></ul>]

        let cellInfo: [string, number][] = [["Column", 3], ["Nudge", 2], ["Row Condition", 4], ["", 3]];
        
        let optionColumnsItems = this.props.PlusMinusConditions.map((x, index) => {
            let column = this.props.Columns.find(y=>y.ColumnId == x.ColumnId)
            return <li
                className="list-group-item" key={x.ColumnId + index}>
                <Row >
                    <Col xs={3}>
                        {column?column.FriendlyName:x.ColumnId}
                    </Col>
                    <Col xs={2}>
                        <FormControl value={x.DefaultNudge.toString()} type="number" placeholder="Enter a Number" onChange={(e) => this.onColumnDefaultNudgeValueChange(index, e)} />
                    </Col>
                    <Col xs={4}>
                        {ExpressionHelper.ConvertExpressionToString(x.Expression, this.props.Columns, this.props.UserFilters)}
                    </Col>
                    <Col xs={3}>
                        <EntityListActionButtons
                            ConfirmDeleteAction={PlusMinusRedux.PlusMinusDeleteCondition(index)}
                            editClick={() => this.onEdit(index, x)}
                            ConfigEntity={x}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        })

        let newButton = <ButtonNew onClick={() => this.createColumnNudgeValue()}
            overrideTooltip="Create Column Nudge Value"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText="Plus / Minus" bsStyle="primary" style={panelStyle}
            button={newButton} glyphicon={"plus-sign"}
            infoBody={infoBody}>
            <AdaptableBlotterForm horizontal>
                <FormGroup controlId="formInlineName">
                    <Col xs={4}>
                        <ControlLabel >Default Nudge Value for Blotter</ControlLabel>
                    </Col>
                    <Col xs={8}>
                        <FormControl style={{ width: "Auto" }} value={this.props.DefaultNudgeValue.toString()} type="number" placeholder="Enter a Number" onChange={(e) => this.handleDefaultNudgeValueChange(e)} />
                    </Col>
                </FormGroup>
            </AdaptableBlotterForm>

            {optionColumnsItems.length == 0 ?
                <Well bsSize="small">Click 'New' to create new Nudge Value rules for when the '+' or '-' keys are clicked while in a numeric cell.</Well>
                :
                <div>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={panelColumNudge}>
                        {optionColumnsItems}
                    </ListGroup>
                </div>}
            {this.state.EditedPlusMinusCondition != null &&
                <AdaptableWizard Steps={
                    [<PlusMinusSettingsWizard
                        Columns={this.props.Columns} />,
                    <PlusMinusExpressionWizard
                        ColumnList={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SelectedColumnId={null}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />]}
                    Data={this.state.EditedPlusMinusCondition}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>}
        </PanelWithButton>
    }

    createColumnNudgeValue() {
        this.setState({ EditedPlusMinusCondition: ObjectFactory.CreateEmptyPlusMinusCondition(this.props.DefaultNudgeValue), EditedIndexColumnNudgeValue: -1 });
    }
    onEdit(index: number, condition: IPlusMinusCondition) {
        let clonedObject: IPlusMinusCondition = Helper.cloneObject(condition);
        this.setState({ EditedPlusMinusCondition: clonedObject, EditedIndexColumnNudgeValue: index });
    }
    closeWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedPlusMinusCondition: null, EditedIndexColumnNudgeValue: -1 });
    }
    WizardFinish() {
        this.props.onAddColumnDefaultNudgeValue(this.state.EditedIndexColumnNudgeValue, this.state.EditedPlusMinusCondition);
        this.setState({ EditedPlusMinusCondition: null, EditedIndexColumnNudgeValue: -1 });
    }

    // private onColumnSelectChange(index: number, column: IColumn) {
    //     let e = event.target as HTMLInputElement;
    //     this.props.onEditColumnDefaultNudgeValue(index, { ColumnId: column ? column.ColumnId : "", DefaultNudge: this.props.PlusMinusConditions[index].DefaultNudge });
    // }

    onColumnDefaultNudgeValueChange(index: number, event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onEditColumnDefaultNudgeValue(index, { ColumnId: this.props.PlusMinusConditions[index].ColumnId, DefaultNudge: parseFloat(e.value) });
    }

    handleDefaultNudgeValueChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onSetDefaultNudgeValue(parseFloat(e.value));
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DefaultNudgeValue: state.PlusMinus.DefaultNudge,
        PlusMinusConditions: state.PlusMinus.PlusMinusConditions,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSetDefaultNudgeValue: (value: number) => dispatch(PlusMinusRedux.PlusMinusSetDefaultNudge(value)),
        onEditColumnDefaultNudgeValue: (Index: number, ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }) => dispatch(PlusMinusRedux.PlusMinusEditCondition(Index, ColumnDefaultNudge)),
        onAddColumnDefaultNudgeValue: (Index: number, ColumnsDefaultNudge: IPlusMinusCondition) => dispatch(PlusMinusRedux.PlusMinusAddUpdateCondition(Index, ColumnsDefaultNudge))
    };
}

export let PlusMinusConfig = connect(mapStateToProps, mapDispatchToProps)(PlusMinusConfigComponent);

let panelColumNudge: React.CSSProperties = {
    overflowY: 'auto',
    minHeight: '100px',
    maxHeight: '300px'
};

let panelStyle = {
    width: '800px'
}
