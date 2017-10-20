import { IRange } from '../../Core/Interface/IRangeStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as RangeRedux from '../../Redux/ActionsReducers/RangeRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { RangeConfigItem } from './RangeConfigItem'
import { RangeColumnsWizard } from './RangeColumnsWizard'
import { RangeNameWizard } from './RangeNameWizard'
import { RangeExpressionWizard } from './RangeExpressionWizard'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions'
import { IUserFilter } from '../../Core/Interface/IExpression';

interface RangeConfigProps extends IStrategyViewPopupProps<RangeConfigComponent> {
    onAddUpdateRange: (Range: IRange) => RangeRedux.RangeAddUpdateAction
    Ranges: Array<IRange>
    UserFilters: IUserFilter[]
    Columns: Array<IColumn>
    CurrentRangeUid: string;
}

interface RangeConfigInternalState {
    EditedRange: IRange
    WizardStartIndex: number
}

class RangeConfigComponent extends React.Component<RangeConfigProps, RangeConfigInternalState> {
    constructor() {
        super();
        this.state = { EditedRange: null, WizardStartIndex: 0 }
    }
  
    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNewRange()
        }
        if (this.props.PopupParams == "Edit") {
            let clonedRange: IRange = this.getClonedSelectedRange();
            this.onEditRange(clonedRange)
        }
    }

    render() {
        let infoBody: any[] = ["Sentence one on ranges", <br />, <br />,
            "Sentence two on ranges"]


        let Ranges = this.props.Ranges.map((range: IRange) => {
            return <RangeConfigItem Range={range} key={range.Uid}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                onEdit={(Range) => this.onEditRange(range)}
                onDeleteConfirm={RangeRedux.RangeDelete(range)} />
        });

        let cellInfo: [string, number][] = [["Name", 2], ["Columns", 3], ["Expression", 4], ["", 3]];
        let newButton = <ButtonNew onClick={() => this.onNewRange()}
            overrideTooltip="Create Range"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText="Range" style={panelStyle} infoBody={infoBody}
            button={newButton} bsStyle="primary" glyphicon={"tag"}>
            {this.props.Ranges.length == 0 ?
                <Well bsSize="small">Click 'New' to create a new Range.  A range is named group of columns and Unique values..</Well>
                : <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            }

            <ListGroup style={divStyle}>
                {Ranges}
            </ListGroup>
            {this.state.EditedRange &&
                <AdaptableWizard Steps={[
                    <RangeColumnsWizard Columns={this.props.Columns} />,
                    <RangeExpressionWizard ColumnList={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SelectedColumnId={null}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
         <RangeNameWizard />,
                ]}
                    Data={this.state.EditedRange}
                    StepStartIndex={this.state.WizardStartIndex}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} >
                </AdaptableWizard>
            }
        </PanelWithButton>
    }
    private wizardSteps: JSX.Element[]

    closeWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedRange: null, WizardStartIndex: 0 });
    }
    WizardFinish() {
        this.props.onAddUpdateRange(this.state.EditedRange)
        this.setState({ EditedRange: null, WizardStartIndex: 0 });
    }

    onNewRange() {
        this.setState({ EditedRange: ObjectFactory.CreateEmptyRange(),  WizardStartIndex: 0})
    }

    // Edit range: sets the edited range to the current selected range which will force the wizard to show
    onEditRange(rangeToEdit: IRange) {
        this.setState({ EditedRange:  rangeToEdit,  WizardStartIndex: 0})
    }

     private getClonedSelectedRange() {
        //we clone the object since there are methods that change directly the object from the state and 
        //I'm rewrtting enough of the component like that
        let selectedRange: IRange = this.props.Ranges.find(a => a.Uid == this.props.CurrentRangeUid);
        if (selectedRange) {
            selectedRange = Helper.cloneObject(selectedRange)
        }
        return selectedRange
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Ranges: state.Range.Ranges,
        CurrentRangeUid: state.Range.CurrentRangeId,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateRange: (Range: IRange) => dispatch(RangeRedux.RangeAddUpdate(Range)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam())
    };
}

export let RangeConfig = connect(mapStateToProps, mapDispatchToProps)(RangeConfigComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let panelStyle = {
    width: '800px'
}