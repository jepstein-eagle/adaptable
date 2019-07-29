import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { withTheme } from 'styled-components';
import { AdaptablePopover } from '../../AdaptablePopover';

import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import NewPanel, { PanelProps } from '../../../components/Panel';
import { Box, Flex, BoxProps } from 'rebass';

import icons from '../../../components/icons';
import { ReactComponentLike } from 'prop-types';

export interface PanelWithImageProps extends PanelProps {
  glyphicon?: string;
  icon?: string;
  infoBody?: any[];
  cssClassName?: string;
  borderRadius?: string;
  bodyProps?: BoxProps;
  theme: any;
  headerColor?: string;
  button?: React.ReactElement<any>;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
class PanelWithImageCmp extends React.Component<PanelWithImageProps, {}> {
  render() {
    let cssClassName = this.props.cssClassName
      ? this.props.cssClassName + StyleConstants.PANEL_WITH_IMAGE
      : '';

    const IconCmp = icons[(this.props.icon || this.props.glyphicon)!] as ReactComponentLike;
    const headerStyle: any = {};

    if (this.props.headerColor) {
      headerStyle.color = this.props.headerColor;
      headerStyle.fill = this.props.headerColor;
    }

    let headerRow = (
      <Flex style={{ flex: 1 }}>
        <Flex alignItems="center">
          <Flex alignItems="center" style={headerStyle}>
            {IconCmp ? <IconCmp /> : <Glyphicon glyph={this.props.glyphicon} />}
            <Box marginRight={2} />
            {this.props.header}
            <Box marginRight={3} />
            {this.props.infoBody != null && (
              <AdaptablePopover
                cssClassName={cssClassName}
                headerText=""
                bodyText={this.props.infoBody}
              />
            )}
          </Flex>
          <Box flex={1} />
          {this.props.button && React.cloneElement(this.props.button)}
        </Flex>
      </Flex>
    );
    return (
      <NewPanel
        header={headerRow}
        className={cssClassName}
        variant={this.props.variant}
        style={this.props.style}
        bodyScroll={this.props.bodyScroll !== undefined ? this.props.bodyScroll : true}
        border="none"
        borderRadius={this.props.borderRadius || 'none'}
        bodyProps={{
          padding: 0,
          ...this.props.bodyProps,
        }}
      >
        {this.props.children}
      </NewPanel>
    );
  }
}

export const PanelWithImage = withTheme(PanelWithImageCmp);
