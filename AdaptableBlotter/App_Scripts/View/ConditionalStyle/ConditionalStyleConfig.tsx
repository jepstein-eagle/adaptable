/// <reference path="../../../typings/index.d.ts" />
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Button, Form, Col, Panel, Row, Well } from 'react-bootstrap';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../../Core/Enums'
import { ConditionalStyleConfigItem } from './ConditionalStyleConfigItem'
import { AdaptableWizard } from './..//Wizard/AdaptableWizard'
import { ConditionalStyleSettingsWizard } from './ConditionalStyleSettingsWizard'
import { ConditionalStyleColumnWizard } from './ConditionalStyleColumnWizard'
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard'
import { Helper } from '../../Core/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { IUserFilter } from '../../Core/Interface/IExpression'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions'

interface ConditionalStyleConfigProps extends IStrategyViewPopupProps<ConditionalStyleConfigComponent> {
    ConditionalStyleConditions: Array<IConditionalStyleCondition>,
    Columns: IColumn[],
    UserFilters: IUserFilter[],
    onAddEditConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition) => ConditionalStyleRedux.ConditionalStyleAddUpdateAction
    onChangeColumnConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColumnId: string) => ConditionalStyleRedux.ConditionalStyleEditColumnAction
    onChangeStyleConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, backColor: string, foreColor: string, fontWeight: FontWeight, fontStyle: FontStyle, fontSize: FontSize) => ConditionalStyleRedux.ConditionalStyleEditStyleAction
}

interface ConditionalStyleConfigState {
    EditedConditionalStyleCondition: IConditionalStyleCondition
    WizardStartIndex: number
}

class ConditionalStyleConfigComponent extends React.Component<ConditionalStyleConfigProps, ConditionalStyleConfigState> {

    constructor() {
        super();
        this.state = { EditedConditionalStyleCondition: null, WizardStartIndex: 0 }
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let _editedConditionalStyle: IConditionalStyleCondition = ObjectFactory.CreateEmptyConditionalStyle();
                _editedConditionalStyle.ColumnId = arrayParams[1]
                _editedConditionalStyle.ConditionalStyleScope == ConditionalStyleScope.Column
                this.setState({ EditedConditionalStyleCondition: _editedConditionalStyle, WizardStartIndex: 1 });
            }
        }
    }

    render() {

        let cellInfo: [string, number][] = [["Where Applied", 3], ["Style",2], ["Description", 4], ["", 3]];

        let conditionalStyleConditions = this.props.ConditionalStyleConditions.map((conditionalStyleCondition: IConditionalStyleCondition) => {
            return <ConditionalStyleConfigItem
                ConditionalStyleCondition={conditionalStyleCondition}
                key={conditionalStyleCondition.Uid}
                UserFilters={this.props.UserFilters}
                Columns={this.props.Columns}
                onEdit={(conditionalStyleCondition) => this.onEdit(conditionalStyleCondition)}
                onChangeColumn={(conditionalStyleCondition, newColumnId) => this.props.onChangeColumnConditionalStyle(conditionalStyleCondition, newColumnId)}
                onChangeStyle={(conditionalStyleCondition, backColor, foreColor, fontWeight, fontStyle, fontSize) => this.props.onChangeStyleConditionalStyle(conditionalStyleCondition, backColor, foreColor, fontWeight, fontStyle, fontSize)}
                onDeleteConfirm={ConditionalStyleRedux.ConditionalStyleDelete(conditionalStyleCondition)} >
            </ConditionalStyleConfigItem>
        });

        let newButton = <ButtonNew onClick={() => this.onAdd()}
            overrideTooltip="Create Conditional Style"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText="Conditional Style"
            button={newButton}
            bsStyle="primary" style={panelStyle} glyphicon={"tint"}>

            {this.props.ConditionalStyleConditions.length == 0 ?
                <Well bsSize="small">Click 'New' to create a new conditional style to be applied at row or column level.</Well>
                : <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            }

            <ListGroup style={divStyle}>
                {conditionalStyleConditions}
            </ListGroup>

            {this.state.EditedConditionalStyleCondition != null &&
                <AdaptableWizard Steps={
                    [
                        <ConditionalStyleColumnWizard Columns={this.props.Columns} />,
                        <ConditionalStyleSettingsWizard />,
                        <ConditionalStyleExpressionWizard
                            ColumnList={this.props.Columns}
                            UserFilters={this.props.UserFilters}
                            SelectedColumnId={null}
                            getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />
                    ]}
                    Data={this.state.EditedConditionalStyleCondition}
                    StepStartIndex={this.state.WizardStartIndex}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>}

        </PanelWithButton>
    }

    onAdd() {
        let _editedConditionalStyle: IConditionalStyleCondition = ObjectFactory.CreateEmptyConditionalStyle();
        this.setState({ EditedConditionalStyleCondition: _editedConditionalStyle, WizardStartIndex: 0 });
    }

    onEdit(condition: IConditionalStyleCondition) {
        let clonedObject: IConditionalStyleCondition = Helper.cloneObject(condition);
        this.setState({ EditedConditionalStyleCondition: clonedObject, WizardStartIndex: 1 });
    }

    closeWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConditionalStyleCondition: null, WizardStartIndex: 0 });
    }

    WizardFinish() {
        this.props.onAddEditConditionalStyle(this.state.EditedConditionalStyleCondition);
        this.setState({ EditedConditionalStyleCondition: null, WizardStartIndex: 0 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ConditionalStyleConditions: state.ConditionalStyle.ConditionalStyleConditions,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddEditConditionalStyle: (conditionalStyleCondition: IConditionalStyleCondition) => dispatch(ConditionalStyleRedux.ConditionalStyleAddUpdate(conditionalStyleCondition)),
        onChangeColumnConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColumnId: string) => dispatch(ConditionalStyleRedux.ConditionalStyleEditColumn(condiditionalStyleCondition, newColumnId)),
        onChangeStyleConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, backColor: string, foreColor: string, fontWeight: FontWeight, fontStyle: FontStyle, fontSize: FontSize) => dispatch(ConditionalStyleRedux.ConditionalStyleEditStyle(condiditionalStyleCondition, backColor, foreColor, fontWeight, fontStyle, fontSize)),
    };
}

export let ConditionalStyleConfig = connect(mapStateToProps, mapDispatchToProps)(ConditionalStyleConfigComponent);

let panelStyle = {
    width: '800px'
}

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}