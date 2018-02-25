import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import {  FormGroup, ControlLabel, FormControl, Col,  Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helpers/Helper';
import { PlusMinusWizard } from './Wizard/PlusMinusWizard'
import { IPlusMinusCondition } from '../../Strategy/Interface/IPlusMinusStrategy'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { PlusMinusEntityRow } from './PlusMinusEntityRow'
import { EntityCollectionView } from '../Components/EntityCollectionView';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';

interface PlusMinusPopupProps extends StrategyViewPopupProps<PlusMinusPopupComponent> {
    DefaultNudgeValue: number,
    Columns: IColumn[],
    UserFilters: IUserFilter[],
    PlusMinusConditions: IPlusMinusCondition[]
    onSetDefaultNudgeValue: (value: number) => PlusMinusRedux.PlusMinusSetDefaultNudgeAction
    onEditColumnDefaultNudgeValue: (Index: number, ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }) => PlusMinusRedux.PlusMinusEditConditionAction
    onAddColumnDefaultNudgeValue: (Index: number, ColumnsDefaultNudge: IPlusMinusCondition) => PlusMinusRedux.PlusMinusAddUpdateConditionAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

class PlusMinusPopupComponent extends React.Component<PlusMinusPopupProps, EditableConfigEntityState> {
    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState() ;
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let plusMinus = ObjectFactory.CreateEmptyPlusMinusCondition(this.props.DefaultNudgeValue)
                plusMinus.ColumnId = arrayParams[1]
                this.setState({ EditedConfigEntity: plusMinus, EditedIndexConfigEntity: -1, WizardStartIndex: 1 });
            }
        }
    }

    render() {
        let infoBody: any[] = ["Enables the creation of Plus/Minus 'Nudge' Rules (i.e. how much to increment numeric cells when ", <i>'+'</i>, " or ", <i>'-'</i>, " keys are pressed on the keyboard).", <br />, <br />, "Plus Minus Rules can be set for", <ul><li>The Whole Blotter</li><li>A Single Column</li><li>A Column dependent on other values in the row (created using the expression wizard)</li></ul>]

        let colItems: IColItem[] = [
            { Content: "Column", Size: 3 },
            { Content: "Nudge Value", Size: 2 },
            { Content: "Row Condition", Size: 4 },
            { Content: "", Size: 3 },
        ]
        let plusMinusConditions = this.props.PlusMinusConditions.map((x, index) => {
            let column = this.props.Columns.find(y => y.ColumnId == x.ColumnId)

            return <PlusMinusEntityRow
                ColItems={colItems}
                ConfigEntity={x}
                key={index}
                Index={index}
                UserFilters={this.props.UserFilters}
                Columns={this.props.Columns}
                onEdit={(index, customSort) => this.onEdit(index, x as IPlusMinusCondition)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onShare={() => this.props.onShare(x)}
                onDeleteConfirm={PlusMinusRedux.PlusMinusDeleteCondition(index)}
                Column={column}
                onColumnDefaultNudgeValueChange={(index, event) => this.onColumnDefaultNudgeValueChange(index, event)} />
        })

        let newButton = <ButtonNew onClick={() => this.createColumnNudgeValue()}
            overrideTooltip="Create Plus / Minus Rule"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <PanelWithButton headerText={StrategyNames.PlusMinusStrategyName} bsStyle="primary" style={panelStyle}
            button={newButton} glyphicon={StrategyGlyphs.PlusMinusGlyph}
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


            {plusMinusConditions.length > 0 &&
                <EntityCollectionView ColItems={colItems} items={plusMinusConditions} />
            }

            {plusMinusConditions.length == 0 &&
                <Well bsSize="small">Click 'New' to create new Nudge Value rules for when the '+' or '-' keys are clicked while in a numeric cell.</Well>
            }

            {this.state.EditedConfigEntity != null &&

                <PlusMinusWizard
                    EditedPlusMinusCondition={this.state.EditedConfigEntity as IPlusMinusCondition}
                    PlusMinusConditions={this.props.PlusMinusConditions}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    WizardStartIndex={this.state.WizardStartIndex}
                    SelectedColumnId={null}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </PanelWithButton>
    }


    createColumnNudgeValue() {
        this.setState({ EditedConfigEntity: ObjectFactory.CreateEmptyPlusMinusCondition(this.props.DefaultNudgeValue), EditedIndexConfigEntity: -1, WizardStartIndex: 0 });
    }
    onEdit(index: number, condition: IPlusMinusCondition) {
        let clonedObject: IPlusMinusCondition = Helper.cloneObject(condition);
        this.setState({ EditedConfigEntity: clonedObject, EditedIndexConfigEntity: index, WizardStartIndex: 1 });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
    }
    
    onFinishWizard() {
        let plusMinus = this.state.EditedConfigEntity as IPlusMinusCondition
         this.props.onAddColumnDefaultNudgeValue(this.state.EditedIndexConfigEntity, plusMinus);
         this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
     }

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
        UserFilters: state.UserFilter.UserFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSetDefaultNudgeValue: (value: number) => dispatch(PlusMinusRedux.PlusMinusSetDefaultNudge(value)),
        onEditColumnDefaultNudgeValue: (Index: number, ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }) => dispatch(PlusMinusRedux.PlusMinusEditCondition(Index, ColumnDefaultNudge)),
        onAddColumnDefaultNudgeValue: (Index: number, ColumnsDefaultNudge: IPlusMinusCondition) => dispatch(PlusMinusRedux.PlusMinusAddUpdateCondition(Index, ColumnsDefaultNudge)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.PlusMinusStrategyId))
    };
}

export let PlusMinusPopup = connect(mapStateToProps, mapDispatchToProps)(PlusMinusPopupComponent);

let panelStyle = {
    width: '800px'
}
