import * as React from 'react';
import { Flex } from 'rebass';
import { SortOrder, SelectionMode } from '../../../../PredefinedConfig/Common/Enums';
import { ListBoxFilterSortComponent } from '../ListBoxFilterSortComponent';
import { StringExtensions } from '../../../../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../../../../Utilities/Extensions/ArrayExtensions';
import ListGroupItem from '../../../../components/List/ListGroupItem';
import ListGroup from '../../../../components/List/ListGroup';
import SelectableList from '../../../../components/SelectableList';
import Helper from '../../../../Utilities/Helpers/Helper';

export interface SingleListBoxProps {
  Values: Array<any>;
  UiSelectedValues: Array<any>;
  onSelectedChange: (SelectedValues: Array<any>) => void;
  //if not primitive objects all DisplayMember and ValueMember and SortMember need to be used
  DisplayMember?: string;
  ValueMember?: string;
  SortMember?: string;
  SelectionMode: SelectionMode;
  style?: React.CSSProperties;
  listStyle?: React.CSSProperties;
}

export interface SingleListBoxState extends React.ClassAttributes<SingleListBox> {
  Values: Array<any>;
  UiSelectedValues: Array<any>;
  FilterValue: string;
  SortOrder: SortOrder;
}

export class SingleListBox extends React.Component<SingleListBoxProps, SingleListBoxState> {
  constructor(props: SingleListBoxProps) {
    super(props);
    this.state = {
      Values: ArrayExtensions.sortArrayWithProperty(
        SortOrder.Ascending,
        this.props.Values,
        this.props.SortMember
      ),
      UiSelectedValues: this.props.UiSelectedValues,
      FilterValue: '',
      SortOrder: SortOrder.Ascending,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps: SingleListBoxProps, nextContext: any) {
    this.setState({
      Values: ArrayExtensions.sortArrayWithProperty(
        this.state.SortOrder,
        nextProps.Values,
        this.props.SortMember
      ),
      UiSelectedValues: nextProps.UiSelectedValues,
      FilterValue: this.state.FilterValue,
      SortOrder: this.state.SortOrder,
    });
  }
  render() {
    let itemsElements = this.state.Values.map((x, index) => {
      let isActive: boolean;
      if (this.props.ValueMember) {
        isActive = this.state.UiSelectedValues.indexOf(x[this.props.ValueMember]) >= 0;
      } else {
        isActive = this.state.UiSelectedValues.indexOf(x) >= 0;
      }

      let display: string = this.props.DisplayMember ? x[this.props.DisplayMember] : x;
      // possible that a column will cellrendeer has no display value; in that scenario lets return null
      if (Helper.objectNotExists(display)) {
        return null;
      }
      let value = this.props.ValueMember ? x[this.props.ValueMember] : x;
      if (
        StringExtensions.IsNotEmpty(this.state.FilterValue) &&
        display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0
      ) {
        return null;
      } else {
        return (
          <ListGroupItem key={value + index} index={index} active={isActive} value={value}>
            {display}
          </ListGroupItem>
        );
      }
    });

    let header = (
      <ListBoxFilterSortComponent
        FilterValue={this.state.FilterValue}
        sortColumnValues={() => this.sortColumnValues()}
        SortOrder={this.state.SortOrder}
        handleChangeFilterValue={e => this.handleChangeFilterValue(e)}
        DisableSort={false}
      />
    );

    return (
      <Flex flex={1} flexDirection="column" style={{ width: '100%' }}>
        {header}
        <SelectableList onSelectedChange={this.onSelectionChange} getItemId={this.getItemId}>
          <ListGroup marginTop={2} style={{ overflow: 'auto', flex: 1, ...this.props.listStyle }}>
            {itemsElements}
          </ListGroup>
        </SelectableList>
      </Flex>
    );
  }

  private getItemId = (index: number) => {
    const item = this.state.Values[index];

    if (!item) {
      return -1;
    }

    let value = this.props.ValueMember ? item[this.props.ValueMember] : item;

    return value;
  };

  handleChangeFilterValue(x: string) {
    this.setState({
      FilterValue: x,
    } as SingleListBoxState);
  }

  sortColumnValues() {
    if (this.state.SortOrder == SortOrder.Ascending) {
      this.setState({
        Values: ArrayExtensions.sortArrayWithProperty(
          SortOrder.Descending,
          this.state.Values,
          this.props.SortMember
        ),
        SortOrder: SortOrder.Descending,
      } as SingleListBoxState);
    } else {
      this.setState({
        Values: ArrayExtensions.sortArrayWithProperty(
          SortOrder.Ascending,
          this.state.Values,
          this.props.SortMember
        ),
        SortOrder: SortOrder.Ascending,
      } as SingleListBoxState);
    }
  }

  raiseOnChange() {
    this.props.onSelectedChange(this.state.UiSelectedValues);
  }

  private onSelectionChange = (selection: { [key: string]: boolean }) => {
    let UiSelectedValues = Object.keys(selection);

    this.setState({ UiSelectedValues } as SingleListBoxState, () => this.raiseOnChange());
  };
}
