import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { DualListBoxEditor } from './../DualListBoxEditor'
import * as ColumnChooserRedux from '../../Redux/ActionsReducers/ColumnChooserRedux'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'


interface ColumnChooserPopupProps extends IStrategyViewPopupProps<ColumnChooserPopupComponent> {
    Columns: Array<IColumn>
    onNewColumnListOrder: (VisibleColumnList: IColumn[]) => ColumnChooserRedux.SetNewColumnListOrderAction
}

class ColumnChooserPopupComponent extends React.Component<ColumnChooserPopupProps, {}> {
    render() {
        let infoBody:any[] = ["Move items between the 'Hidden Columns' and 'Visible Columns' listboxes to hide / show them.",<br/>,<br/>,
        "Use the buttons on the right of the 'Visible Columns' listbox to order them as required.",<br/>,<br/>,
        "All changes made while using the Column Chooser are implemented in the Blotter immediately."]

        return <PanelWithImage header={StrategyNames.ColumnChooserStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.ColumnChooserGlyph} infoBody={infoBody}>
            <DualListBoxEditor AvailableValues={this.props.Columns.filter(x => !x.Visible)}
                SelectedValues={this.props.Columns.filter(x => x.Visible).map(x => x.FriendlyName)}
                HeaderAvailable="Hidden Columns"
                HeaderSelected="Visible Columns"
                DisplayMember="FriendlyName"
                SortMember="FriendlyName"
                ValueMember="FriendlyName"
                onChange={(SelectedValues) => this.ColumnListChange(SelectedValues)}></DualListBoxEditor>
        </PanelWithImage>
    }

    private ColumnListChange(columnList: Array<string>) {
        this.props.onNewColumnListOrder(columnList.map(friendlyName => this.props.Columns.find(x => x.FriendlyName == friendlyName)))
    }
}


function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onNewColumnListOrder: (VisibleColumnList: IColumn[]) => dispatch(ColumnChooserRedux.SetNewColumnListOrder(VisibleColumnList))
    };
}

export let ColumnChooserPopup = connect(mapStateToProps, mapDispatchToProps)(ColumnChooserPopupComponent);