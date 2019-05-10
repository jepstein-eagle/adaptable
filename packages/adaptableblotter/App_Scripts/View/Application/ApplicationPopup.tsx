import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';

interface ApplicationPopupComponentProps
  extends StrategyViewPopupProps<ApplicationPopupComponent> {}

class ApplicationPopupComponent extends React.Component<ApplicationPopupComponentProps, {}> {
  render() {
    let cssClassName: string = this.props.cssClassName + '__Application';

    return <div className={cssClassName} />;
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {};
}

export let ApplicationPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationPopupComponent);
