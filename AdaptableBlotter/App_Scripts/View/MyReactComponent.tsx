/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Button } from 'react-bootstrap';

interface MyProps {
    name: string;
}

export default class HelloWorld extends React.Component<MyProps, {}> {
    constructor(props: MyProps) {
        super(props);
    }
    render() {
        return (<div> Hello {this.props.name} </div>);
    }
}

//ReactDOM.render(<HelloWorld name="World From React" />, document.getElementById('content'));
