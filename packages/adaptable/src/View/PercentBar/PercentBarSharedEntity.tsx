import * as React from 'react';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { Flex } from 'rebass';
import { PercentBar } from '../../PredefinedConfig/PercentBarState';

export class PercentBarSharedEntity extends React.Component<
  SharedEntityComponent<PercentBarSharedEntity>,
  {}
> {
  render(): any {
    let percentBar: PercentBar = this.props.Entity as PercentBar;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={3}>{'Postive Value: ' + percentBar.PositiveValue}</Flex>
        <Flex flex={3}>{'Negative Value: ' + percentBar.NegativeValue}</Flex>
        <Flex flex={3}>
          {
            <div
              style={{
                textAlign: 'center',
                margin: '2px',
                padding: '0px',
                background: percentBar.PositiveColor,
              }}
            >
              Pos Colour
            </div>
          }
        </Flex>
        <Flex flex={3}>
          {
            <div
              style={{
                textAlign: 'center',
                margin: '2px',
                padding: '0px',
                background: percentBar.NegativeColor,
              }}
            >
              Neg Colour
            </div>
          }
        </Flex>
      </Flex>
    );
  }
}
