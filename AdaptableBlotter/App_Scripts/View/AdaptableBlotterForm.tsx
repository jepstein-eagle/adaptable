/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { Form, FormProps } from 'react-bootstrap';



interface AdaptableBlotterFormProps extends FormProps {
}

export class AdaptableBlotterForm extends React.Component<AdaptableBlotterFormProps, {}> {
    render(): any {
        return <Form {...this.props} onSubmit={(e) => this.CancelOnFormSubmit(e)} >
            {this.props.children}
        </Form>
    }
    CancelOnFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(null);
        }
    }
}