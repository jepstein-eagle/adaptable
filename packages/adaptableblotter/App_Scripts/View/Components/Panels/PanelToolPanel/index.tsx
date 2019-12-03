import * as React from 'react';

import Panel, { PanelProps } from '../../../../components/Panel';

import { ButtonClose } from '../../Buttons/ButtonClose';
import { ButtonConfigure } from '../../Buttons/ButtonConfigure';
import { ButtonMinimise } from '../../Buttons/ButtonMinimise';

import { Flex } from 'rebass';
import join from '../../../../components/utils/join';
import { Icon } from '../../../../components/icons';
import { ButtonMaximise } from '../../Buttons/ButtonMaximise';

export interface PanelToolPanelProps extends PanelProps {
  headerText: string;
  glyphicon: string;
  onConfigure: () => void;
  onMinimiseChanged?: () => void;
  isMinimised: boolean; // this you have to give I think
  showGlyphIcon?: boolean;

  useDefaultPanelStyle?: boolean;
}

export class PanelToolPanel extends React.Component<PanelToolPanelProps, {}> {
  public static defaultProps: PanelToolPanelProps = {
    headerText: 'Function',
    glyphicon: 'home',
    onConfigure: null,
    onMinimiseChanged: null,
    showGlyphIcon: true,
    isMinimised: false,
  };
  render() {
    const {
      useDefaultPanelStyle,
      isMinimised,
      glyphicon,
      showGlyphIcon,
      onMinimiseChanged,
      headerText,
      onConfigure,
      ...props
    } = this.props;

    let header = (
      <>
        {!isMinimised ? (
          <ButtonMinimise
            className="ab-DashboardPanel__header-minimise"
            onClick={() => onMinimiseChanged()}
            marginRight={1}
          />
        ) : (
          <ButtonMaximise
            className="ab-DashboardPanel__header-maximise"
            onClick={() => onMinimiseChanged()}
            marginRight={1}
          />
        )}
        {showGlyphIcon ? (
          <Icon
            style={{
              alignSelf: 'center',
              marginLeft: 'var(--ab-space-2)',
              color: 'var(--ab-cmp-dashboardpanel_header__fill)',
            }}
            className="ab-DashboardPanel__header-icon"
            name={glyphicon}
          />
        ) : null}

        <Flex
          className="ab-DashboardPanel__header-text"
          flex={1}
          alignItems="center"
          marginLeft={showGlyphIcon ? 2 : 0}
        >
          {headerText}
        </Flex>
        <ButtonConfigure
          iconSize={16}
          marginLeft={2}
          className="ab-DashboardPanel__header-configure-button"
          tooltip={'Configure ' + headerText}
          onClick={() => onConfigure()}
        />
      </>
    );
    return (
      <Panel
        border="var(--ab-cmp-dashboardpanel__border)"
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
