import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { withTheme } from 'styled-components';
import { AdaptablePopover } from '../../AdaptablePopover';

import { AdaptableBlotterForm } from '../Forms/AdaptableBlotterForm';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import NewPanel, { PanelProps } from '../../../components/Panel';
import { Box, Flex, BoxProps } from 'rebass';

export interface PanelWithImageProps extends PanelProps {
  glyphicon?: string;
  infoBody?: any[];
  cssClassName: string;
  borderRadius?: string;
  bodyProps?: BoxProps;
  theme: any;
  button?: React.ReactElement<any>;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
class PanelWithImageCmp extends React.Component<PanelWithImageProps, {}> {
  render() {
    let cssClassName = this.props.cssClassName + StyleConstants.PANEL_WITH_IMAGE;

    let headerRow = (
      <AdaptableBlotterForm inline style={{ flex: 1 }}>
        <Flex>
          <Box>
            {<Glyphicon glyph={this.props.glyphicon} className="ab_large_right_margin_style" />}
            {this.props.header}{' '}
            {this.props.infoBody != null && (
              <span>
                <label> </label>
                <span>
                  {' '}
                  <AdaptablePopover
                    cssClassName={cssClassName}
                    headerText=""
                    bodyText={this.props.infoBody}
                  />
                </span>
              </span>
            )}
          </Box>
          <Box flex={1} />
          {this.props.button && React.cloneElement(this.props.button)}
        </Flex>
      </AdaptableBlotterForm>
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
