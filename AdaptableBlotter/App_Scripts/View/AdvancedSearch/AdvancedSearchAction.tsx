/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Accordion, FormControl, ControlLabel, Panel, Form, FormGroup, Button, OverlayTrigger, Tooltip, Row, Col, Checkbox } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { LeafExpressionOperator } from '../../Core/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import { EnumExtensions } from '../../Core/Extensions';


interface AdvancedSearchActionProps extends React.ClassAttributes<AdvancedSearchActionComponent> {
    AdvancedSearchName: string;
    AdaptableBlotter: IAdaptableBlotter;
    onSetAdvancedSearchName: (AdvancedSearchName: string) => AdvancedSearchRedux.AdvancedSearchSetSearchNameAction,
}

interface AdvancedSearchActionState {
    EditedAdvancedSearchName: string
}

class AdvancedSearchActionComponent extends React.Component<AdvancedSearchActionProps, AdvancedSearchActionState> {

    constructor() {
        super();
        this.state = { EditedAdvancedSearchName: "" }
    }

    public componentDidMount() {
        this.setState({ EditedAdvancedSearchName: this.props.AdvancedSearchName });
    }

    handleFileNameChange(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.setState({ EditedAdvancedSearchName: e.value });
    }

    onSetAdvancedSearch() {
        this.props.onSetAdvancedSearchName(this.state.EditedAdvancedSearchName);
    }

    onKeyDownAdvancedSearch(event: React.KeyboardEvent) {
        if (event.keyCode == 13) {
            event.preventDefault();
            this.onSetAdvancedSearch();
        }
    }

    onClearAdvancedSearch() {
        this.setState({ EditedAdvancedSearchName: "" });
        this.props.onSetAdvancedSearchName("");
    }

 
    render() {
        var blotter = this.props.AdaptableBlotter;

        return (
            <div >
                <Panel header="Advanced Search" bsStyle="primary">


                    <Form inline>
                        <div style={divStyle}>
                            <Panel header={"Search Name"} style={headerStyle}>
                                <FormControl
                                    style={inputStyle}
                                    value={this.state.EditedAdvancedSearchName}
                                    type="string"
                                    placeholder="Enter Advanced search name"
                                    onChange={(e: React.FormEvent) => this.handleFileNameChange(e)}
                                    onKeyDown={(x) => this.onKeyDownAdvancedSearch(x)} />
                                {' '}
                                <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Run Advanced Search</Tooltip>}>
                                    <Button bsStyle='primary' onClick={() => this.onSetAdvancedSearch()}>Search</Button>
                                </OverlayTrigger>
                                {' '}
                                <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Clear Advanced Search</Tooltip>}>
                                    <Button onClick={() => this.onClearAdvancedSearch()}>Clear</Button>
                                </OverlayTrigger>

                            </Panel>

                        </div>
                    </Form>

                   

                </Panel>
            </div>
        );
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdaptableBlotter: ownProps.AdaptableBlotter,
        AdvancedSearchName: state.AdvancedSearch.AdvancedSearchName,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSetAdvancedSearchName: (advancedSearchName: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSetSearchName(advancedSearchName)),
    };
}

export let AdvancedSearchAction = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchActionComponent);

var divStyle = {
    overflowY: 'auto',
    maxHeight: '400px',
    margin: '10px'
};

var headerStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'bolder',
    fontSize: '16px'
};

var inputStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'normal',
    textAlign: 'left',
};

var accordionStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'normal',

};