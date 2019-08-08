import * as React from 'react';

import { ColumnMenuTab } from '../../../PredefinedConfig/Common/Enums';

import { Flex } from 'rebass';
import Panel, { PanelProps } from '../../../components/Panel';
import Radio from '../../../components/Radio';

export interface FilterFormPanelProps extends PanelProps {
  clearFilterButton?: React.ReactElement<any>;

  saveButton?: React.ReactElement<any>;

  closeButton?: React.ReactElement<any>;

  ColumnMenuTab: ColumnMenuTab;
  ColumnMenuTabChanged: (e: any) => void;

  IsAlwaysFilter: boolean;

  showCloseButton: boolean;
}

export class FilterFormPanel extends React.Component<FilterFormPanelProps, {}> {
  render() {
    let header = (
      <Flex alignItems="center" flexDirection="row" style={{ width: '100%' }}>
        {this.props.IsAlwaysFilter ? (
          <Flex flex={6} marginRight={2}>
            Filter
          </Flex>
        ) : (
          <Flex flex={6} flexDirection="column">
            <Flex>
              <Flex flex={3} />
              <Flex flex={9}>
                <Radio
                  value="Menu"
                  checked={this.props.ColumnMenuTab == ColumnMenuTab.Menu}
                  onChange={() => this.onSelectMenu()}
                >
                  Menu
                </Radio>
              </Flex>
            </Flex>
            <Flex>
              <Flex flex={3} />
              <Flex flex={9}>
                <Radio
                  value="Filter"
                  checked={this.props.ColumnMenuTab == ColumnMenuTab.Filter}
                  onChange={() => this.onSelectFilter()}
                >
                  Filter
                </Radio>
              </Flex>
            </Flex>
          </Flex>
        )}

        <Flex flex={2}>
          {this.props.clearFilterButton &&
            this.props.ColumnMenuTab == ColumnMenuTab.Filter &&
            this.props.clearFilterButton}
        </Flex>
        <Flex flex={2}>
          {this.props.saveButton &&
            this.props.ColumnMenuTab == ColumnMenuTab.Filter &&
            this.props.saveButton}
        </Flex>
      </Flex>
    );
    return (
      <div>
        <Panel
          header={header}
          style={this.props.style}
          bodyProps={{ padding: 1, style: { maxHeight: '50vh' } }}
          bodyScroll
          border="none"
        >
          {this.props.children}
        </Panel>
      </div>
    );
  }

  onSelectMenu(): any {
    this.props.ColumnMenuTabChanged(ColumnMenuTab.Menu);
  }

  onSelectFilter(): any {
    this.props.ColumnMenuTabChanged(ColumnMenuTab.Filter);
  }
}
