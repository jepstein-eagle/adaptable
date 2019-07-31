import * as React from 'react';
import { AdaptablePopover } from '../../AdaptablePopover';
import SimpleButton from '../../../components/SimpleButton';
import Panel, { PanelProps } from '../../../components/Panel';
import { Flex, Box, BoxProps } from 'rebass';
import icons from '../../../components/icons';
import { ReactComponentLike } from 'prop-types';

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
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithButton extends React.Component<PanelWithButtonProps & PanelProps, {}> {
  render() {
    let { buttonContent } = this.props;

    const IconCmp = icons[this.props.glyphicon!] as ReactComponentLike;
    let header = (
      <Flex alignItems="center" width="100%">
        <Flex alignItems="center">
          {this.props.glyphicon != null && (IconCmp ? <IconCmp /> : null)}
          <Box marginRight={2} />
          {this.props.headerText}
          <Box marginRight={3} />
          {this.props.infoBody != null && (
            <AdaptablePopover headerText="" bodyText={this.props.infoBody} />
          )}
        </Flex>
        <Box style={{ flex: 1 }} />

        {buttonContent ? (
          <SimpleButton
            variant="raised"
            tone="accent"
            disabled={this.props.buttonDisabled}
            onClick={() => (this.props.buttonClick ? this.props.buttonClick() : null)}
          >
            {buttonContent}
          </SimpleButton>
        ) : null}

        {this.props.button ? React.cloneElement(this.props.button) : null}
      </Flex>
    );
    return (
      <Panel
        flex={1}
        bodyScroll={this.props.bodyScroll != null ? this.props.bodyScroll : true}
        bodyProps={this.props.bodyProps}
        variant={this.props.variant || 'primary'}
        header={header}
        style={this.props.style}
        borderRadius={(this.props.borderRadius || 'none') as any}
        border={(this.props.border || 'none') as any}
      >
        {this.props.children}
      </Panel>
    );
  }
}
