import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CustomColumnRedux from '../../Redux/ActionsReducers/CustomColumnRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions'
import { ICustomColumn } from "../../Core/Interface/ICustomColumnStrategy";

interface CustomColumnConfigProps extends IStrategyViewPopupProps<CustomColumnConfigComponent> {
    onAddCustomColumn: (customColumn: ICustomColumn) => CustomColumnRedux.CustomColumnAddAction
    onEditCustomSort: (index: number, customColumn: ICustomColumn) => CustomColumnRedux.CustomColumnEditAction
    CustomColumns: Array<ICustomColumn>
    Columns: Array<IColumn>
}

interface CustomColumnConfigInternalState {
    EditedCustomColumn: ICustomColumn
    WizardStartIndex: number
}

class CustomColumnConfigComponent extends React.Component<CustomColumnConfigProps, CustomColumnConfigInternalState> {
    constructor() {
        super();
        this.state = { EditedCustomColumn: null, WizardStartIndex: 0 }

    }


    render() {
        let infoBody: any[] = ["Custom Column Blah blah blah."]


        let customColumns = this.props.CustomColumns.map((customSort: ICustomColumn) => {
            let column = this.props.Columns.find(x => x.ColumnId == customSort.ColumnId);
            return null
            // return <CustomSortConfigItem CustomSort={customSort} key={customSort.ColumnId}
            //     onEdit={(customSort) => this.onEditCustomSort(customSort)}
            //     onDeleteConfirm={CustomSortRedux.CustomSortDelete(customSort)}
            //     ColumnLabel={column ? column.FriendlyName : customSort.ColumnId + Helper.MissingColumnMagicString}></CustomSortConfigItem>
        });


        //         {this.state.EditedCustomColumn &&
        //     <AdaptableWizard Steps={[<CustomSortColumnWizard Columns={this.props.Columns} />,
        //     <CustomSortValuesWizard Columns={this.props.Columns} getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />]}
        //         Data={this.state.EditedCustomSort}
        //         StepStartIndex={this.state.WizardStartIndex}
        //         onHide={() => this.closeWizard()}
        //         onFinish={() => this.WizardFinish()} ></AdaptableWizard>
        // }
        let cellInfo: [string, number][] = [["Custom Column", 3], ["Column Description", 6], ["", 3]];
        let newButton = <ButtonNew onClick={() => {/*this.CreateCustomColumn()*/}}
            overrideTooltip="Create Custom Column"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText="Custom Column" style={panelStyle} infoBody={infoBody}
            button={newButton} bsStyle="primary" glyphicon={"th"}>
            {this.props.CustomColumns.length == 0 ?
                <Well bsSize="small">Click 'New' to create a new Custom Column.</Well>
                : <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            }

            <ListGroup style={divStyle}>
                {customColumns}
            </ListGroup>

        </PanelWithButton>
    }
    private wizardSteps: JSX.Element[]

    closeWizard() {
        this.setState({ EditedCustomColumn: null, WizardStartIndex: 0 });
    }
    WizardFinish() {
        // if (this.props.CustomColumns.find(x => x.ColumnId == this.state.EditedCustomSort.ColumnId)) {
        //     this.props.onEditCustomSort(this.state.EditedCustomSort)
        // }
        // else {
        //     this.props.onAddCustomSort(this.state.EditedCustomSort)
        // }


        this.setState({ EditedCustomColumn: null, WizardStartIndex: 0 });
    }

    private onEditCustomColumn(customColumn: ICustomColumn) {
        //so we dont mutate original object
        this.setState({ EditedCustomColumn: Helper.cloneObject(customColumn), WizardStartIndex: 1 });
    }

    CreateCustomSort() {
        this.setState({ EditedCustomColumn: ObjectFactory.CreateEmptyCustomColumn(), WizardStartIndex: 0 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CustomColumns: state.CustomColumn.CustomColumns,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddCustomColumn: (customColumn: ICustomColumn) => dispatch(CustomColumnRedux.CustomColumnAdd(customColumn)),
        onEditCustomSort: (index: number, customColumn: ICustomColumn) => dispatch(CustomColumnRedux.CustomColumnEdit(index, customColumn)),
    };
}

export let CustomColumnConfig = connect(mapStateToProps, mapDispatchToProps)(CustomColumnConfigComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let panelStyle = {
    width: '800px'
}