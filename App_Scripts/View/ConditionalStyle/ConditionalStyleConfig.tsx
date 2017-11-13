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
    PredefinedColorChoices: string[],
    onAddEditConditionalStyle: (index: number, condiditionalStyleCondition: IConditionalStyleCondition) => ConditionalStyleRedux.ConditionalStyleAddUpdateAction
}

interface ConditionalStyleConfigState {
    EditedConditionalStyleCondition: IConditionalStyleCondition
    EditedIndexConditionalStyleCondition: number
    WizardStartIndex: number
}

class ConditionalStyleConfigComponent extends React.Component<ConditionalStyleConfigProps, ConditionalStyleConfigState> {

    constructor() {
        super();
        this.state = { EditedConditionalStyleCondition: null, WizardStartIndex: 0, EditedIndexConditionalStyleCondition: -1 }
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let _editedConditionalStyle: IConditionalStyleCondition = ObjectFactory.CreateEmptyConditionalStyle();
                _editedConditionalStyle.ColumnId = arrayParams[1]
                _editedConditionalStyle.ConditionalStyleScope = ConditionalStyleScope.Column
                this.setState({ EditedConditionalStyleCondition: _editedConditionalStyle, WizardStartIndex: 1 });
            }
        }
    }

    render() {

        let infoBody: any[] = ["Conditional Styles enable columns and rows to be given distinct styles according to user rules.", <br />, <br />,
            "Styles include selection of fore and back colours, and font properties."]

        let cellInfo: [string, number][] = [["Where Applied", 3], ["Style", 2], ["Description", 4], ["", 3]];

        let conditionalStyleConditions = this.props.ConditionalStyleConditions.map((conditionalStyleCondition: IConditionalStyleCondition, index) => {
            return <ConditionalStyleConfigItem
                ConditionalStyleCondition={conditionalStyleCondition}
                key={"CS" + index}
                UserFilters={this.props.UserFilters}
                Columns={this.props.Columns}
                onEdit={(conditionalStyleCondition) => this.onEdit(index, conditionalStyleCondition)}
                onDeleteConfirm={ConditionalStyleRedux.ConditionalStyleDelete(index, conditionalStyleCondition)} >
            </ConditionalStyleConfigItem>
        });

        let newButton = <ButtonNew onClick={() => this.onAdd()}
            overrideTooltip="Create Conditional Style"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText="Conditional Style"
            button={newButton}
            bsStyle="primary" style={panelStyle} glyphicon={"tint"} infoBody={infoBody}>

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
                        <ConditionalStyleSettingsWizard PredefinedColorChoices={this.props.PredefinedColorChoices} />,
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
        this.setState({ EditedConditionalStyleCondition: _editedConditionalStyle, WizardStartIndex: 0, EditedIndexConditionalStyleCondition: -1 });
    }

    onEdit(index: number, condition: IConditionalStyleCondition) {
        let clonedObject: IConditionalStyleCondition = Helper.cloneObject(condition);
        this.setState({ EditedConditionalStyleCondition: clonedObject, WizardStartIndex: 0, EditedIndexConditionalStyleCondition: index });
    }

    closeWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConditionalStyleCondition: null, WizardStartIndex: 0, EditedIndexConditionalStyleCondition: -1 });
    }

    WizardFinish() {
        this.props.onAddEditConditionalStyle(this.state.EditedIndexConditionalStyleCondition, this.state.EditedConditionalStyleCondition);
        this.setState({ EditedConditionalStyleCondition: null, WizardStartIndex: 0, EditedIndexConditionalStyleCondition: -1 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ConditionalStyleConditions: state.ConditionalStyle.ConditionalStyleConditions,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters,
        PredefinedColorChoices: state.UIControlConfig.PredefinedColorChoices
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddEditConditionalStyle: (index: number, conditionalStyleCondition: IConditionalStyleCondition) => dispatch(ConditionalStyleRedux.ConditionalStyleAddUpdate(index, conditionalStyleCondition)),
    };
}

export let ConditionalStyleConfig = connect(mapStateToProps, mapDispatchToProps)(ConditionalStyleConfigComponent);

let panelStyle = {
    width: '800px'
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}