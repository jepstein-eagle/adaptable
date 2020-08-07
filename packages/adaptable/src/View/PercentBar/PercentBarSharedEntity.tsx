import * as React from 'react';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { Flex, Box } from 'rebass';
import { PercentBar } from '../../PredefinedConfig/PercentBarState';
import { StyleVisualItem } from '../Components/StyleVisualItem';

export class PercentBarSharedEntity extends React.Component<
  SharedEntityComponent<PercentBarSharedEntity>,
  {}
> {
  render(): any {
    let percentBar: PercentBar = this.props.Entity as PercentBar;

    let ranges: any = percentBar.Ranges.map((r, i) => (
      <Flex key={i} alignItems="center" mr={3}>
        <Box mr={1}>
          {r.Min} to {r.Max}{' '}
        </Box>
        <StyleVisualItem
          Style={{
            BackColor: r.Color,
            ForeColor: r.Color,
          }}
        />
      </Flex>
    ));

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={3}>
          {'Column: ' + this.props.Api.gridApi.getFriendlyNameFromColumnId(percentBar.ColumnId)}
        </Flex>
        <Flex flex={3}>{ranges}</Flex>
      </Flex>
    );
  }
}
