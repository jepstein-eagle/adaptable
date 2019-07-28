import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';
import Panel, { PanelProps } from '../../../../components/Panel';
import * as StyleConstants from '../../../../Utilities/Constants/StyleConstants';
import { ButtonClose } from '../../Buttons/ButtonClose';
import { ButtonConfigure } from '../../Buttons/ButtonConfigure';
import { ButtonMinimise } from '../../Buttons/ButtonMinimise';

import { Flex } from 'rebass';
import join from '../../../../components/utils/join';

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
    headerText: 'Function',
    glyphicon: 'home',
    onClose: null,
    onConfigure: null,
    onMinimise: null,
    showGlyphIcon: true,
    cssClassName: '',
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
      ...props
    } = this.props;

    let header = (
      <>
        {showMinimiseButton ? (
          <ButtonMinimise onClick={() => onMinimise()} marginRight={2} />
        ) : null}
        {showGlyphIcon ? (
          <Glyphicon
            style={{
              alignSelf: 'center',
              fontSize: 'small',
              color: 'var(--ab-cmp-dashboardpanel_header__fill)',
            }}
            glyph={glyphicon}
          />
        ) : null}

        <Flex flex={1} alignItems="center" marginLeft={showGlyphIcon || showMinimiseButton ? 2 : 0}>
          {headerText}
        </Flex>
        {showConfigureButton ? (
          <ButtonConfigure
            iconSize={16}
            marginLeft={3}
            tooltip={'Configure ' + headerText}
            onClick={() => onConfigure()}
          />
        ) : null}
        {showCloseButton ? (
          <ButtonClose
            marginLeft={showConfigureButton ? 0 : 3}
            tooltip={'Close ' + headerText}
            onClick={() => onClose()}
          />
        ) : null}
      </>
    );
    return (
      <Panel
        border="none"
        {...props}
        className={join('ab-DashboardPanel', props.className)}
        header={header}
        style={{
          color: 'var(--ab-cmp-dashboardpanel__color)',
          fill: 'var(--ab-cmp-dashboardpanel__fill)',
          ...props.style,
        }}
        headerProps={{
          ...props.headerProps,
          alignItems: 'stretch',
          style: {
            padding: 'var(--ab-cmp-dashboardpanel_header__padding)',
            background: 'var(--ab-cmp-dashboardpanel_header__background)',

            color: 'var(--ab-cmp-dashboardpanel_header__color)',
            fill: 'var(--ab-cmp-dashboardpanel_header__fill)',
            ...(props.headerProps ? props.headerProps.style : null),
          },
        }}
        bodyProps={{
          ...props.bodyProps,
          style: {
            padding: 'var(--ab-cmp-dashboardpanel_body__padding)',
            background: 'var(--ab-cmp-dashboardpanel_body__background)',
            ...(props.bodyProps ? props.bodyProps.style : null),
            display: 'flex',
            alignItems: 'center',
          },
        }}
      />
    );
  }
}
