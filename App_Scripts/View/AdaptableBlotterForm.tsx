import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helpers/Helper'
import { Form, FormProps } from 'react-bootstrap';

export interface AdaptableBlotterFormProps extends FormProps {
}

export class AdaptableBlotterForm extends React.Component<AdaptableBlotterFormProps, {}> {
    render() {
        const { children, ...attrs } = this.props;
        return <Form {...attrs} onSubmit={(e) => this.CancelOnFormSubmit(e)} >
            {this.props.children}
        </Form>
    }
    CancelOnFormSubmit(e: React.FormEvent<any>) {
        e.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(null);
        }
    }
}