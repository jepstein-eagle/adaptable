/// <reference path="../typings/index.d.ts" />

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import * as ReactDOM from "react-dom";

interface MyProps {
    name: string;
}

class HelloWorld extends React.Component<MyProps, {}> {
    constructor(props: MyProps) {
        super(props);
    }
    render() {
        return (<div> Hello {this.props.name} </div>);
    }
}

ReactDOM.render(<HelloWorld name="World From React" />, document.getElementById('content'));