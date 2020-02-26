import * as React from 'react';
import { PanelProps } from '../../../../components/Panel';
import { DashboardToolbar as DashboardToolbarUI } from '../../../../components/Dashboard';

export interface PanelDashboardProps extends PanelProps {
  headerText: string;
  glyphicon: string;
  onClose: () => void;
  onConfigure: () => void;
  onMinimise?: () => void;
  showCloseButton?: boolean;
  showConfigureButton?: boolean;
  showMinimiseButton?: boolean;
  showGlyphIcon?: boolean;
  useDefaultPanelStyle?: boolean;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelDashboard extends React.Component<PanelDashboardProps, {}> {
  public static defaultProps: PanelDashboardProps = {
    showCloseButton: true,
    showConfigureButton: true,
    showMinimiseButton: false,
    headerText: 'Function',
    glyphicon: 'home',
    onClose: null,
    onConfigure: null,
    onMinimise: null,
    showGlyphIcon: true,
  };
  render() {
    const {
      useDefaultPanelStyle,
      onMinimise,
      glyphicon,
      showGlyphIcon,
      headerText,
      showMinimiseButton,
      showConfigureButton,
      showCloseButton,
      onClose,
      onConfigure,
      children,
    } = this.props;

    return (
      <DashboardToolbarUI title={headerText} onConfigure={onConfigure}>
        {children}
      </DashboardToolbarUI>
    );
  }
}
