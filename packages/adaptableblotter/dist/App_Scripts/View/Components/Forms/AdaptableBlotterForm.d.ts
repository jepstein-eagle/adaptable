import * as React from "react";
import { FormProps } from 'react-bootstrap';
export interface AdaptableBlotterFormProps extends FormProps {
}
export declare class AdaptableBlotterForm extends React.Component<AdaptableBlotterFormProps, {}> {
    render(): JSX.Element;
    CancelOnFormSubmit(e: React.FormEvent<any>): void;
}
