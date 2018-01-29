import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'
import { Button, Form, Col, Panel, Row, Well } from 'react-bootstrap';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../../Core/Enums'
import { ConditionalStyleConfigItem } from './ConditionalStyleConfigItem'
import { AdaptableWizard } from './..//Wizard/AdaptableWizard'
import { ConditionalStyleWizard } from './ConditionalStyleWizard'
import { Helper } from '../../Core/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { IUserFilter } from '../../Core/Interface/IExpression'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions'
import { EntityItemList } from '../Components/EntityItemList';

interface ConditionalStyleConfigProps extends IStrategyViewPopupProps<ConditionalStyleConfigComponent> {
    ConditionalStyles: Array<IConditionalStyleCondition>,
    Columns: IColumn[],
    UserFilters: IUserFilter[],
    PredefinedColorChoices: string[],
    onAddUpdateConditionalStyle: (index: number, condiditionalStyleCondition: IConditionalStyleCondition) => ConditionalStyleRedux.ConditionalStyleAddUpdateAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

interface ConditionalStyleConfigState {
    EditedConditionalStyle: IConditionalStyleCondition
    EditedIndexConditionalStyleCondition: number
    WizardStartIndex: number
}

class ConditionalStyleConfigComponent extends React.Component<ConditionalStyleConfigProps, ConditionalStyleConfigState> {

    constructor() {
        super();
        this.state = { EditedConditionalStyle: null, WizardStartIndex: 0, EditedIndexConditionalStyleCondition: -1 }
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let _editedConditionalStyle: IConditionalStyleCondition = ObjectFactory.CreateEmptyConditionalStyle();
                _editedConditionalStyle.ColumnId = arrayParams[1]
                _editedConditionalStyle.ConditionalStyleScope = ConditionalStyleScope.Column
                this.setState({ EditedConditionalStyle: _editedConditionalStyle, WizardStartIndex: 1 });
            }
        }
    }

    render() {

        let infoBody: any[] = ["Conditional Styles enable columns and rows to be given distinct styles according to user rules.", <br />, <br />,
            "Styles include selection of fore and back colours, and font properties."]

        let cellInfo: [string, number][] = [["Where Applied", 3], ["Style", 2], ["Description", 4], ["", 3]];

        let conditionalStyleConditions = this.props.ConditionalStyles.map((conditionalStyleCondition: IConditionalStyleCondition, index) => {
            return <ConditionalStyleConfigItem
                ConditionalStyleCondition={conditionalStyleCondition}
                key={"CS" + index}
                onShare={() => this.props.onShare(conditionalStyleCondition)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                UserFilters={this.props.UserFilters}
                Columns={this.props.Columns}
                onEdit={(conditionalStyleCondition) => this.onEdit(index, conditionalStyleCondition)}
                onDeleteConfirm={ConditionalStyleRedux.ConditionalStyleDelete(index, conditionalStyleCondition)} >
            </ConditionalStyleConfigItem>
        });

        let newButton = <ButtonNew onClick={() => this.onAdd()}
            overrideTooltip="Create Conditional Style"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <PanelWithButton headerText={StrategyNames.ConditionalStyleStrategyName} button={newButton} bsStyle="primary" style={panelStyle} glyphicon={StrategyGlyphs.ConditionalStyleGlyph} infoBody={infoBody}>

            {this.props.ConditionalStyles.length == 0 &&
                <Well bsSize="small">Click 'New' to create a new conditional style to be applied at row or column level.</Well>
            }

            {conditionalStyleConditions.length > 0 &&
                <EntityItemList cellInfo={cellInfo} items={conditionalStyleConditions} />
            }

            {this.state.EditedConditionalStyle != null &&
                <ConditionalStyleWizard
                    EditedConditionalStyleCondition={this.state.EditedConditionalStyle}
                    PredefinedColorChoices={this.props.PredefinedColorChoices}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </PanelWithButton>
    }

    onAdd() {
        let _editedConditionalStyle: IConditionalStyleCondition = ObjectFactory.CreateEmptyConditionalStyle();
        this.setState({ EditedConditionalStyle: _editedConditionalStyle, WizardStartIndex: 0, EditedIndexConditionalStyleCondition: -1 });
    }

    onEdit(index: number, condition: IConditionalStyleCondition) {
        let clonedObject: IConditionalStyleCondition = Helper.cloneObject(condition);
        this.setState({ EditedConditionalStyle: clonedObject, WizardStartIndex: 0, EditedIndexConditionalStyleCondition: index });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConditionalStyle: null, WizardStartIndex: 0, EditedIndexConditionalStyleCondition: -1 });
    }

    onFinishWizard() {
        this.props.onAddUpdateConditionalStyle(this.state.EditedIndexConditionalStyleCondition, this.state.EditedConditionalStyle);
        this.setState({ EditedConditionalStyle: null, WizardStartIndex: 0, EditedIndexConditionalStyleCondition: -1 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ConditionalStyles: state.ConditionalStyle.ConditionalStyleConditions,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        PredefinedColorChoices: state.UIControlConfig.PredefinedColorChoices
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateConditionalStyle: (index: number, conditionalStyleCondition: IConditionalStyleCondition) => dispatch(ConditionalStyleRedux.ConditionalStyleAddUpdate(index, conditionalStyleCondition)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ConditionalStyleStrategyId))
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