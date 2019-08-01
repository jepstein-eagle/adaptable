import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';

import { IUIConfirmation } from '../../../Utilities/Interface/IMessage';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface DeleteButtonProps extends SimpleButtonProps {
  onConfirmWarning?: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
  ConfirmAction: Redux.Action;
  ConfirmationMsg: string;
  ConfirmationTitle: string;
  onClickAction?: () => void;
}

class ButtonDeleteComponent extends React.Component<DeleteButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        tooltip="Delete"
        variant="text"
        icon="trash"
        iconSize={20}
        {...this.props}
        onClick={() => this.onClick()}
      />
    );
  }

  onClick() {
    if (this.props.ConfirmAction) {
      let confirmation: IUIConfirmation = {
        CancelButtonText: 'Cancel',
        Header: this.props.ConfirmationTitle,
        Msg: this.props.ConfirmationMsg,
        ConfirmButtonText: 'Delete',
        CancelAction: null,
        ConfirmAction: this.props.ConfirmAction,
        ShowInputBox: false,
        MessageType: MessageType.Warning,
      };
      this.props.onConfirmWarning(confirmation);
    } else {
      this.props.onClickAction();
    }
  }
}

//Here we bypass slightly how the whole thing works and consider Delete as a smart component that will show the warning
//Purist will say that we should pass in everything we need through the props but I don't think it's really needed in that case
//and it makes the component where we use the DeleteButton slighlty less verbos
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    ConfirmAction: ownProps.ConfirmAction,
    ConfirmationMsg: ownProps.ConfirmationMsg,
    ConfirmationTitle: ownProps.ConfirmationTitle,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onConfirmWarning: (confirmation: IUIConfirmation) =>
      dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
  };
}

export let ButtonDelete = connect<{}, {}, DeleteButtonProps>(
  mapStateToProps,
  mapDispatchToProps
)(ButtonDeleteComponent);
