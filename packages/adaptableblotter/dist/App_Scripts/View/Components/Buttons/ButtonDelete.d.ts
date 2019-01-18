import * as React from "react";
import * as Redux from "redux";
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { ButtonProps } from './ButtonBase';
import { IUIConfirmation } from "../../../Utilities/Interface/IMessage";
export interface DeleteButtonProps extends ButtonProps {
    onConfirmWarning?: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
    ConfirmAction: Redux.Action;
    ConfirmationMsg: string;
    ConfirmationTitle: string;
    onClickAction?: () => void;
}
export declare let ButtonDelete: React.ComponentClass<DeleteButtonProps, any>;
