import * as React from 'react';
import { PanelProps, Panel, Row, Col, Glyphicon } from 'react-bootstrap';
import { withTheme } from 'styled-components';
import { AdaptablePopover } from '../../AdaptablePopover';
import { MessageType } from '../../../Utilities/Enums';
import { AdaptableBlotterForm } from '../Forms/AdaptableBlotterForm';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import NewPanel from '../../../components/Panel';
import { Box, Flex } from 'rebass';

export interface PanelWithImageProps extends PanelProps {
  glyphicon?: string;
  infoBody?: any[];
  cssClassName: string;
  borderRadius?: string;
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
      <AdaptableBlotterForm
        inline
        style={{ flex: 1, '--ab-cmp-panel-icon-fill': this.props.theme.colors.almostwhite }}
      >
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
        bsStyle={this.props.bsStyle}
        bsSize={this.props.bsSize}
        style={this.props.style}
        borderRadius={this.props.borderRadius || 'none'}
        headerProps={{ style: { border: 'none' } }}
        bodyProps={{ style: { border: 'none' } }}
      >
        {this.props.children}
      </NewPanel>
    );
  }
}

export const PanelWithImage = withTheme(PanelWithImageCmp);
