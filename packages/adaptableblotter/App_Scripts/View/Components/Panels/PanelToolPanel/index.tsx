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
  onConfigure: () => void;
  onClose: () => void;
  onMinimiseChanged?: () => void;
  isMinimised: boolean;
  useDefaultPanelStyle?: boolean;
}

export class PanelToolPanel extends React.Component<PanelToolPanelProps, {}> {
  public static defaultProps: PanelToolPanelProps = {
    headerText: '',
    onClose: null,
    onConfigure: null,
    onMinimiseChanged: null,
    isMinimised: true,
  };
  render() {
    const {
      useDefaultPanelStyle,
      isMinimised,
      onMinimiseChanged,
      headerText,
      onClose,
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

        <Flex
          className="ab-DashboardPanel__header-text"
          flex={1}
          alignItems="center"
          marginLeft={0}
        >
          {headerText}
        </Flex>
        <ButtonConfigure
          iconSize={16}
          marginLeft={1}
          className="ab-DashboardPanel__header-configure-button"
          tooltip={'Configure ' + headerText}
          onClick={() => onConfigure()}
        />
        <ButtonClose
          marginLeft={0}
          className="ab-DashboardPanel__header-close-button"
          tooltip={'Close ' + headerText}
          onClick={() => onClose()}
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
          minWidth: 180,
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
