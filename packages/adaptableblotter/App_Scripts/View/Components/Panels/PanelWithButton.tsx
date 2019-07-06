import * as React from 'react';
import { PanelProps, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { AdaptablePopover } from '../../AdaptablePopover';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableBlotterForm } from '../Forms/AdaptableBlotterForm';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import useTheme from '../../../components/utils/useTheme';
import SimpleButton from '../../../components/SimpleButton';
import Panel, { PanelProps as TypePanelProps } from '../../../components/Panel';
import { Flex, Box, BoxProps } from 'rebass';

export interface PanelWithButtonProps extends PanelProps {
  //use either button content + buttonClick OR button
  buttonContent?: React.ReactNode;
  buttonClick?: () => void;
  button?: React.ReactElement<any>;
  headerText: string;
  bodyProps?: BoxProps;
  glyphicon?: string;
  buttonDisabled?: boolean;
  buttonStyle?: string;
  borderRadius?: string;
  infoBody?: any[];
  cssClassName: string;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithButton extends React.Component<PanelWithButtonProps & TypePanelProps, {}> {
  render() {
    let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_PANEL;
    let { buttonContent } = this.props;
    let className = 'ab_panel-with-button';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    //  if (buttonContent || this.props.button) {
    className += ' ' + 'ab_panel-with-button-reduce-header-padding';
    //   }
    let buttonStyle: string = this.props.buttonStyle ? this.props.buttonStyle : 'default';

    const theme = useTheme();
    let header = (
      <AdaptableBlotterForm
        inline
        style={{
          width: '100%',
          flex: 1,
          '--ab-cmp-panel-icon__fill': theme.colors.almostwhite,
        }}
      >
        <Flex alignItems="center">
          <Box>
            {this.props.glyphicon != null && (
              <Glyphicon glyph={this.props.glyphicon} className="ab_large_right_margin_style" />
            )}
            {this.props.headerText}{' '}
            {this.props.infoBody != null && (
              <span>
                <label> </label>
                <span>
                  {' '}
                  <AdaptablePopover
                    cssClassName={this.props.cssClassName}
                    headerText=""
                    bodyText={this.props.infoBody}
                  />
                </span>
              </span>
            )}
          </Box>
          <Box style={{ flex: 1 }} />
          <Box>
            {buttonContent ? (
              <SimpleButton
                variant="raised"
                tone="success"
                disabled={this.props.buttonDisabled}
                onClick={() => this.props.buttonClick()}
              >
                {buttonContent}
              </SimpleButton>
            ) : null}

            {this.props.button ? React.cloneElement(this.props.button) : null}
          </Box>
        </Flex>
      </AdaptableBlotterForm>
    );
    return (
      <Flex flex={1} flexDirection="column" style={this.props.style} className={cssClassName}>
        <Panel
          border="none"
          flex={1}
          bodyProps={this.props.bodyProps}
          header={header}
          className={className}
          bsStyle={this.props.bsStyle}
          bsSize={this.props.bsSize}
          borderRadius={(this.props.borderRadius || 'none') as any}
        >
          {this.props.children}
        </Panel>
      </Flex>
    );
  }
}
