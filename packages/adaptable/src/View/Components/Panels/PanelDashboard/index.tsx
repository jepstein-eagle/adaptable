import * as React from 'react';
import { PanelProps } from '../../../../components/Panel';
import { DashboardToolbar as DashboardToolbarUI } from '../../../../components/Dashboard';

export interface PanelDashboardProps extends PanelProps {
  headerText: string;
  onConfigure: () => void;
  showConfigureButton?: boolean;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelDashboard extends React.Component<PanelDashboardProps, {}> {
  public static defaultProps: PanelDashboardProps = {
    showConfigureButton: true,
    headerText: 'Function',
    onConfigure: null,
  };
  render() {
    const { headerText, showConfigureButton, onConfigure, children } = this.props;

    return (
      <DashboardToolbarUI
        title={headerText}
        onConfigure={onConfigure}
        showConfigure={showConfigureButton}
      >
        {children}
      </DashboardToolbarUI>
    );
  }
}
