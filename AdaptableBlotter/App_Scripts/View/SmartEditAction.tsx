/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import * as ReactBootstrap from 'react-bootstrap';

import * as AdaptableBlotterStore from '../Redux/Store/AdaptableBlotterStore'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'

interface SmartEditActionProps extends React.ClassAttributes<SmartEditAction> {

}

export class SmartEditAction extends React.Component<SmartEditActionProps, {}> {
    render() {
        return (
            <div>
                <ReactBootstrap.Panel header="Edit Details" bsStyle="primary">
                    <ReactBootstrap.Form inline>
                        <ReactBootstrap.FormGroup controlId="formInlineName">
                            <ReactBootstrap.SplitButton title="Sum">
                            </ReactBootstrap.SplitButton>
                            <ReactBootstrap.FormControl type="text" placeholder="Enter a Number" />
                        </ReactBootstrap.FormGroup>
                        {' '}
                        <ReactBootstrap.Button bsStyle="primary">Apply to Grid</ReactBootstrap.Button>
                    </ReactBootstrap.Form>
                </ReactBootstrap.Panel>
                <ReactBootstrap.Panel header="Preview Results" bsStyle="success">
                    <ReactBootstrap.Table responsive>
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>BidOffSpread Initial Value</th>
                                <th>BidOffSpread Computed Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>WHEAT</td>
                                <td>0.05</td>
                                <td>0.10</td>
                            </tr>
                            <tr>
                                <td>CORN</td>
                                <td>0.05</td>
                                <td>0.10</td>
                            </tr>
                            <tr>
                                <td>SUGAR</td>
                                <td>0.05</td>
                                <td>0.10</td>
                            </tr>
                            <tr>
                                <td>SOYBEAN</td>
                                <td>0.05</td>
                                <td>0.10</td>
                            </tr>
                            <tr>
                                <td>SOY OIL</td>
                                <td>0.05</td>
                                <td>0.10</td>
                            </tr>
                        </tbody>
                    </ReactBootstrap.Table>
                </ReactBootstrap.Panel>
            </div>
        );
    }
}