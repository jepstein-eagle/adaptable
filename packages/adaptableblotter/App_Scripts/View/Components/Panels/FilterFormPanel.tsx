import * as React from 'react';

import { ColumnMenuTab } from '../../../PredefinedConfig/Common/Enums';

import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { Flex } from 'rebass';
import Panel, { PanelProps } from '../../../components/Panel';
import Radio from '../../../components/Radio';

export interface FilterFormPanelProps extends PanelProps {
  clearFilterButton?: React.ReactElement<any>;

  saveButton?: React.ReactElement<any>;

  closeButton?: React.ReactElement<any>;

  cssClassName: string;

  ColumnMenuTab: ColumnMenuTab;
  ColumnMenuTabChanged: (e: any) => void;

  IsAlwaysFilter: boolean;

  showCloseButton: boolean;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class FilterFormPanel extends React.Component<FilterFormPanelProps, {}> {
  render() {
    let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_PANEL;

    let className = 'ab_panel-with-button';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    className += ' ' + 'ab_panel-with-button-reduce-header-padding';
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
      <div className={cssClassName}>
        <Panel
          header={header}
          className={className}
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
