import * as React from 'react';

import { AdaptablePopover } from '../../AdaptablePopover';

import WizardPanel from '../../../components/WizardPanel';
import icons from '../../../components/icons';
import { ReactComponentLike } from 'prop-types';
import { Flex, Text } from 'rebass';
import { PanelProps } from '../../../components/Panel';

const ChartIcon = icons['bar-chart'] as ReactComponentLike;

export interface PanelWithImageThreeButtonsProps extends PanelProps {
  firstButton?: React.ReactElement<any>;

  secondButton?: React.ReactElement<any>;

  thirdButton?: React.ReactElement<any>;

  infoBody?: any[];
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithImageThreeButtons extends React.Component<
  PanelWithImageThreeButtonsProps,
  {}
> {
  render() {
    let { firstButton, secondButton, thirdButton, infoBody, header, ...panelProps } = this.props;

    header = (
      <Flex alignItems="center" width="100%">
        <ChartIcon />
        <Text mx={2}>{header}</Text>
        {infoBody != null && <AdaptablePopover headerText="" bodyText={infoBody} />}

        <div style={{ flex: 1 }} />

        {firstButton}
        {secondButton}
        {thirdButton}
      </Flex>
    );
    return <WizardPanel {...panelProps} header={header}></WizardPanel>;
  }
}
