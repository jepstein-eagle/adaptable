import * as React from 'react';
import {
  PanelProps,
  // Panel,
  Glyphicon,
  Button,
  Label,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { AdaptableBlotterForm } from '../Forms/AdaptableBlotterForm';
import Panel from '../../../components/Panel';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { ButtonClose } from '../Buttons/ButtonClose';
import { ButtonConfigure } from '../Buttons/ButtonConfigure';
import { ButtonMinimise } from '../Buttons/ButtonMinimise';
import { FontSize } from '../../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';

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
  cssClassName: string;
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
    useDefaultPanelStyle: true,
    headerText: 'Function',
    glyphicon: 'home',
    onClose: null,
    onConfigure: null,
    onMinimise: null,
    showGlyphIcon: true,
    cssClassName: '',
  };
  render() {
    let cssClassName = this.props.cssClassName + StyleConstants.DASHBOARD_PANEL;

    let panelStyle = this.props.useDefaultPanelStyle
      ? StyleConstants.DEFAULT_BSSTYLE
      : StyleConstants.PRIMARY_BSSTYLE;

    let header = (
      <>
        {this.props.showMinimiseButton ? (
          <ButtonMinimise
            className={cssClassName}
            onClick={() => this.props.onMinimise()}
            marginRight={2}
          />
        ) : null}
        {this.props.showGlyphIcon ? (
          <Glyphicon style={{ fontSize: 'small' }} glyph={this.props.glyphicon} />
        ) : null}

        <Flex flex={1} alignItems="center">
          {this.props.headerText}
        </Flex>
        {this.props.showConfigureButton ? (
          <ButtonConfigure
            cssClassName={cssClassName}
            overrideTooltip={'Configure ' + this.props.headerText}
            size="xs"
            bsStyle={panelStyle}
            DisplayMode={'Glyph'}
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              float: 'right',
              marginLeft: '0px',
              marginRight: '0px',
              border: '0px',
              background: 'none',
              borderRadius: '0px',
              boxShadow: 'none',
            }}
            onClick={() => this.props.onConfigure()}
          />
        ) : null}
        {this.props.showCloseButton ? (
          <ButtonClose
            cssClassName={cssClassName}
            overrideTooltip={'Close ' + this.props.headerText}
            size="xs"
            bsStyle={panelStyle}
            DisplayMode={'Glyph'}
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              float: 'right',
              marginLeft: '0px',
              marginRight: '0px',
              border: '0px',
              background: 'none',
              borderRadius: '0px',
              boxShadow: 'none',
            }}
            onClick={() => this.props.onClose()}
          />
        ) : null}
      </>
    );
    return (
      <div className={cssClassName}>
        <Panel
          className="ab_small-padding-panel ab-panel-header-dashboard"
          header={header}
          style={this.props.style}
        >
          <AdaptableBlotterForm inline>{this.props.children}</AdaptableBlotterForm>
        </Panel>
      </div>
    );
  }
}
