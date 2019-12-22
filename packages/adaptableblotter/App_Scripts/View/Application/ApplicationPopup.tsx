import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';

interface ApplicationPopupComponentProps
  extends StrategyViewPopupProps<ApplicationPopupComponent> {}

class ApplicationPopupComponent extends React.Component<ApplicationPopupComponentProps, {}> {
  render() {
    return <div />;
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {};
}

export let ApplicationPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationPopupComponent);
