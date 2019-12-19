import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { SortOrder } from '../../../PredefinedConfig/Common/Enums';
import { ListBoxFilterSortComponent } from './ListBoxFilterSortComponent';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { IMasterChildren } from '../../../Utilities/Interface/IMasterChildren';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import ListGroupItem from '../../../components/List/ListGroupItem';
import Checkbox from '../../../components/CheckBox';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';
import { Flex } from 'rebass';
import Panel from '../../../components/Panel';
import ListGroup from '../../../components/List/ListGroup';
import SelectableList from '../../../components/SelectableList';

export enum DisplaySize {
  Large,
  Small,
  XSmall,
}
export interface IMasterValue {
  value: string;
  isOpen: boolean;
  isAvailable: boolean;
}

export interface DualListBoxEditorProps extends React.ClassAttributes<DualListBoxEditor> {
  SelectedValues: Array<any>;
  AvailableValues: Array<any>;
  onChange: (SelectedValues: Array<any>) => void;
  HeaderAvailable: string;
  HeaderSelected: string;
  //if not primitive objects all DisplayMember and ValueMember and sortmember need to be used
  DisplayMember?: string;
  style?: React.CSSProperties;
  ValueMember?: string;
  SortMember?: string;
  DisplaySize?: DisplaySize;
  MasterChildren?: IMasterChildren[];
}

export interface DualListBoxEditorState extends React.ClassAttributes<DualListBoxEditor> {
  SelectedValues: Array<any>;
  AvailableValues: Array<any>;
  UiSelectedAvailableValues: Array<any>;
  UiSelectedSelectedValues: Array<any>;
  FilterValue: string;
  SelectedValuesFilterValue: string;
  SortOrder: SortOrder;
  SelectedValuesSortOrder: SortOrder;
  AllValues: Array<any>;
  MasterValues: Array<IMasterValue>;
}

const ButtonDirection = (props: SimpleButtonProps) => (
  <SimpleButton
    {...props}
    style={{ whiteSpace: 'nowrap', justifyContent: 'center', ...props.style }}
  />
);

export class DualListBoxEditor extends React.Component<
  DualListBoxEditorProps,
  DualListBoxEditorState
> {
  private placeholder: HTMLButtonElement;
  private firstSelected: HTMLElement;
  private refFirstSelectedSelected: (node: HTMLElement) => void;
  constructor(props: DualListBoxEditorProps) {
    super(props);
    this.placeholder = document.createElement('button');
    this.placeholder.className = 'placeholder';
    this.placeholder.classList.add('list-group-item');
    this.placeholder.type = 'button';
    let availableValues = new Array<any>();

    this.refFirstSelectedSelected = node => {
      this.firstSelected = node;
    };

    this.props.AvailableValues.forEach(x => {
      if (this.props.ValueMember) {
        if (this.props.SelectedValues.findIndex(y => y == x[this.props.ValueMember]) < 0) {
          availableValues.push(x);
        }
      } else {
        if (this.props.SelectedValues.indexOf(x) < 0) {
          availableValues.push(x);
        }
      }
    });
    this.state = {
      SelectedValues: this.props.SelectedValues,
      AvailableValues: this.createAvailableValuesList(
        availableValues,
        SortOrder.Ascending,
        this.props.SortMember
      ),
      UiSelectedSelectedValues: [],
      UiSelectedAvailableValues: [],
      FilterValue: '',
      SelectedValuesFilterValue: '',
      SortOrder: SortOrder.Ascending,
      SelectedValuesSortOrder: SortOrder.Ascending,
      AllValues: this.props.AvailableValues,
      MasterValues: this.buildMasterValues(this.props.MasterChildren),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: DualListBoxEditorProps, nextContext: any) {
    let availableValues = new Array<any>();
    nextProps.AvailableValues.forEach(x => {
      if (nextProps.ValueMember) {
        if (nextProps.SelectedValues.findIndex(y => y == x[nextProps.ValueMember]) < 0) {
          availableValues.push(x);
        }
      } else {
        if (nextProps.SelectedValues.indexOf(x) < 0) {
          availableValues.push(x);
        }
      }
    });
    //we need to rebuild the list of UI Selected items in case we are managing non primitive objects as we compare stuff on instance rather than properties
    let uiAvailableSelected: Array<any>;
    let uiSelectedSelected: Array<any>;
    if (nextProps.ValueMember) {
      uiAvailableSelected = [];
      this.state.UiSelectedAvailableValues.forEach(x => {
        let item = availableValues.find(y => y[nextProps.ValueMember] == x[nextProps.ValueMember]);
        if (item) {
          uiAvailableSelected.push(item);
        }
      });
      uiSelectedSelected = [];
      this.state.UiSelectedSelectedValues.forEach(x => {
        let item = nextProps.SelectedValues.find(y => y == x);
        if (item) {
          uiSelectedSelected.push(item);
        }
      });
    } else {
      uiAvailableSelected = this.state.UiSelectedAvailableValues;
      uiSelectedSelected = this.state.UiSelectedSelectedValues;
    }

    this.setState({
      SelectedValues: nextProps.SelectedValues,
      AvailableValues: this.createAvailableValuesList(
        availableValues,
        this.state.SortOrder,
        nextProps.SortMember
      ),
      UiSelectedAvailableValues: uiAvailableSelected,
      UiSelectedSelectedValues: uiSelectedSelected,
      FilterValue: this.state.FilterValue,
      SortOrder: this.state.SortOrder,
      MasterValues: this.buildMasterValues(nextProps.MasterChildren),
    });
  }
  render() {
    let setRefFirstSelectedSelected = true;
    let displaySize: DisplaySize = this.props.DisplaySize
      ? this.props.DisplaySize
      : DisplaySize.Large;

    // build selected elements
    let selectedElements = this.state.SelectedValues.map((x, index) => {
      let isActive = this.state.UiSelectedSelectedValues.indexOf(x) >= 0;

      let display = this.props.DisplayMember ? x[this.props.DisplayMember] : x;
      if (
        this.isValueFilteredOut(
          display,
          this.state.SelectedValuesFilterValue,
          this.state.SelectedValues
        )
      ) {
        return null;
      }

      const result = (
        <ListGroupItem
          key={`${x}-1`}
          index={index}
          className="Selected"
          draggable={true}
          style={listGroupItemStyle}
          active={isActive}
          ref={isActive && setRefFirstSelectedSelected ? this.refFirstSelectedSelected : null}
          onDragStart={event => this.DragSelectedStart(event, x)}
          onDragEnd={() => this.DragSelectedEnd()}
          value={x}
        >
          {x}
        </ListGroupItem>
      );
      if (isActive && setRefFirstSelectedSelected) {
        setRefFirstSelectedSelected = false;
      }

      return result;
    });

    // build available elements - might have master/children
    let availableElements = this.state.AvailableValues.map((x, index) => {
      let isActive = this.state.UiSelectedAvailableValues.indexOf(x) >= 0;
      let display = this.props.DisplayMember ? x[this.props.DisplayMember] : x;
      let value = this.props.ValueMember ? x[this.props.ValueMember] : x;
      let masterValue: IMasterValue = this.state.MasterValues.find(mv => mv.value == x);
      let isMasterElement = masterValue != null;

      if (this.isValueFilteredOut(display)) {
        return null;
      } else {
        return isMasterElement ? (
          <ListGroupItem
            key={`${value}-master`}
            className="Available"
            index={index}
            selectionId={value}
            style={listGroupItemStyle}
            active={isActive}
            draggable={false}
            value={value}
          >
            <Checkbox
              key={masterValue.value}
              checked={masterValue.isOpen}
              onChange={(checked: boolean) => this.onMasterValueCheckChanged(checked, x)}
            >
              {display}
            </Checkbox>
          </ListGroupItem>
        ) : (
          <ListGroupItem
            className="Available"
            style={listGroupItemStyle}
            active={isActive}
            index={index}
            draggable={true}
            key={`${value}-not-master`}
            onDragStart={event => this.DragAvailableStart(event, x)}
            onDragEnd={() => this.DragAvailableEnd()}
            value={value}
          >
            {display}
          </ListGroupItem>
        );
      }
    });

    let headerFirstListBox = (
      <ListBoxFilterSortComponent
        FilterValue={this.state.FilterValue}
        sortColumnValues={() => this.sortColumnValues()}
        SortOrder={this.state.SortOrder}
        handleChangeFilterValue={e => this.handleChangeFilterValue(e)}
        DisableSort={ArrayExtensions.IsNotEmpty(this.state.MasterValues)}
      />
    );

    let headerSecondListBox = (
      <ListBoxFilterSortComponent
        FilterValue={this.state.SelectedValuesFilterValue}
        sortColumnValues={() => this.sortSelectedColumnValues()}
        SortOrder={this.state.SelectedValuesSortOrder}
        handleChangeFilterValue={e => this.handleChangeSelectedValuesFilterValue(e)}
        DisableSort={ArrayExtensions.IsNotEmpty(this.state.MasterValues)}
      />
    );

    return (
      <Flex
        alignItems="stretch"
        flexDirection="row"
        style={{ ...this.props.style, maxHeight: '100%', width: '100%' }}
      >
        <Panel
          header={this.props.HeaderAvailable}
          bodyProps={{ padding: 0 }}
          marginRight={2}
          style={{ flex: '4 0 0%' }}
          bodyScroll
        >
          {headerFirstListBox}
          <SelectableList
            getItemId={this.getAvailableItemId}
            onSelectedChange={this.onAvailableListSelectionChange}
          >
            <ListGroup
              className="ab-AvailableDropZone"
              style={listGroupStyle}
              onDragEnter={(event: any) => this.DragEnterAvailable(event)}
              onDragOver={(event: any) => this.DragOverAvailable(event)}
              onDragLeave={(event: any) => this.DragLeaveAvailable(event)}
            >
              {availableElements}
            </ListGroup>
          </SelectableList>
        </Panel>

        <Flex flexDirection="column" justifyContent="center">
          <ButtonDirection
            marginBottom={2}
            icon="fast-forward"
            iconPosition="end"
            disabled={this.state.AvailableValues.length == 0}
            onClick={() => this.AddAll()}
          >
            Add All
          </ButtonDirection>
          <ButtonDirection
            iconPosition="end"
            icon={'arrow-right'}
            marginBottom={3}
            disabled={this.state.UiSelectedAvailableValues.length == 0}
            onClick={() => this.Add()}
          >
            Add
          </ButtonDirection>
          <ButtonDirection
            icon={'arrow-left'}
            marginBottom={2}
            iconPosition="start"
            disabled={this.state.UiSelectedSelectedValues.length == 0}
            onClick={() => this.Remove()}
          >
            Remove
          </ButtonDirection>
          <ButtonDirection
            marginBottom={2}
            icon="fast-backward"
            iconPosition="start"
            disabled={this.state.SelectedValues.length == 0}
            onClick={() => this.RemoveAll()}
          >
            Remove All
          </ButtonDirection>
        </Flex>

        <Panel
          header={this.props.HeaderSelected}
          bodyScroll
          bodyProps={{
            padding: 0,
          }}
          style={{ flex: '4 0 0%' }}
          marginLeft={2}
          marginRight={2}
        >
          {headerSecondListBox}
          <SelectableList
            getItemId={this.getSelectedItemId}
            onSelectedChange={this.onSelectedListSelectionChange}
          >
            <ListGroup
              style={listGroupStyle}
              className="ab-SelectedDropZone"
              onDragEnter={(event: any) => this.DragEnterSelected(event)}
              onDragOver={(event: any) => this.DragOverSelected(event)}
              onDragLeave={(event: any) => this.DragLeaveSelected(event)}
            >
              {selectedElements}
            </ListGroup>
          </SelectableList>
        </Panel>

        <Flex flexDirection="column" justifyContent="center">
          <ButtonDirection
            marginBottom={2}
            iconPosition="start"
            icon="triangle-up"
            disabled={!this.canGoTopOrUp()}
            onClick={() => this.Top()}
          >
            Top
          </ButtonDirection>
          <ButtonDirection
            marginBottom={2}
            iconPosition="start"
            icon="arrow-up"
            disabled={!this.canGoTopOrUp()}
            onClick={() => this.Up()}
          >
            Up
          </ButtonDirection>
          <ButtonDirection
            marginBottom={2}
            icon="arrow-down"
            iconPosition="start"
            disabled={!this.canGoDownOrBottom()}
            onClick={() => this.Down()}
          >
            Down
          </ButtonDirection>
          <ButtonDirection
            marginBottom={2}
            icon="triangle-down"
            iconPosition="start"
            disabled={!this.canGoDownOrBottom()}
            onClick={() => this.Bottom()}
          >
            Bottom
          </ButtonDirection>
        </Flex>
      </Flex>
    );
  }

  buildMasterValues(masterChildren: IMasterChildren[]): IMasterValue[] {
    if (ArrayExtensions.IsNullOrEmpty(masterChildren)) {
      return [];
    }
    return this.props.MasterChildren.map(mc => {
      return { value: mc.Master, isAvailable: false, isOpen: true };
    });
  }

  onMasterValueCheckChanged(checked: boolean, item: any): void {
    let masterValues = [].concat(this.state.MasterValues);
    let currentMasterValue: IMasterValue = masterValues.find(mv => mv.value == item);

    currentMasterValue.isOpen = checked;
    let newArray = [...this.state.UiSelectedAvailableValues];

    let index = this.state.UiSelectedAvailableValues.indexOf(item);
    if (index >= 0) {
      let newArray = [...this.state.UiSelectedAvailableValues];
      newArray.splice(index, 1);
    }

    this.setState({
      MasterValues: masterValues,
      UiSelectedAvailableValues: newArray,
    } as DualListBoxEditorState);
  }

  createAvailableValuesList(
    availableValues: any[],
    sortOrder: SortOrder,
    sortMember: string
  ): any[] {
    // if there are no master / children then sort the values
    if (ArrayExtensions.IsNullOrEmpty(this.props.MasterChildren)) {
      let valstoReturn: any[] = ArrayExtensions.sortArrayWithProperty(
        sortOrder,
        availableValues,
        sortMember
      );
      return valstoReturn;
    }

    // we do have master / children
    let returnValues: any[] = [];

    // first add any orphans = that are not masters or are not children
    availableValues.forEach(av => {
      let masterChildren: IMasterChildren = this.props.MasterChildren.find(
        mc => mc.Master == av || ArrayExtensions.ContainsItem(mc.Children, av)
      );
      if (!masterChildren) {
        returnValues.push(av);
      }
    });

    // now add all the Master Children
    this.props.MasterChildren.forEach(mc => {
      let availableChildren: any[] = [];

      mc.Children.forEach(c => {
        if (ArrayExtensions.ContainsItem(availableValues, c)) {
          availableChildren.push(c);
        }
      });
      // only add the item if there are available children
      if (ArrayExtensions.IsNotEmpty(availableChildren)) {
        returnValues.push(mc.Master);
        availableChildren.forEach(c => {
          returnValues.push(c);
        });
      }
    });
    return returnValues;
  }

  isValueFilteredOut = (
    item: string,
    FilterValue: string = this.state.FilterValue,
    Values: Array<any> = this.state.AvailableValues
  ): boolean => {
    // if not master child then simply filter on the value
    if (ArrayExtensions.IsNullOrEmpty(this.state.MasterValues)) {
      return (
        FilterValue != '' && item.toLocaleLowerCase().indexOf(FilterValue.toLocaleLowerCase()) < 0
      );
    }

    let masterNames = this.state.MasterValues.map(mv => {
      return mv.value;
    });
    let isFilterMode: boolean = StringExtensions.IsNotEmpty(FilterValue);

    if (ArrayExtensions.ContainsItem(masterNames, item)) {
      let masterChildren: IMasterChildren = this.props.MasterChildren.find(mc => mc.Master == item);
      let filterMaster: boolean = true;
      if (masterChildren) {
        // so we are dealing with a Master

        masterChildren.Children.forEach(c => {
          if (ArrayExtensions.ContainsItem(Values, c)) {
            // we need the child to be present to show the master
            if (isFilterMode) {
              // if there is a filter then the child needs to pass that in order to display the Master
              if (c.toLocaleLowerCase().indexOf(FilterValue.toLocaleLowerCase()) >= 0) {
                filterMaster = false;
              }
            } else {
              // if no filter, then always show the Master
              filterMaster = false;
            }
          }
        });
      }
      return filterMaster;
    } else {
      // its a child - so first check that the Master is open
      let masterChildren: IMasterChildren = this.props.MasterChildren.find(mc =>
        ArrayExtensions.ContainsItem(mc.Children, item)
      );
      if (masterChildren) {
        let masterValue: IMasterValue = this.state.MasterValues.find(
          mv => mv.value == masterChildren.Master
        );
        if (!masterValue.isOpen) {
          // no open Master so always filter
          return true;
        } else {
          // if there is a filter then check on that, otherwise return false
          if (isFilterMode) {
            return item.toLocaleLowerCase().indexOf(FilterValue.toLocaleLowerCase()) < 0;
          } else {
            return false;
          }
        }
      } else {
        // for orphans filter as normal
        return item.toLocaleLowerCase().indexOf(FilterValue.toLocaleLowerCase()) < 0;
      }
    }
  };

  canGoTopOrUp(): boolean {
    return (
      this.state.UiSelectedSelectedValues.length != 0 &&
      this.state.UiSelectedSelectedValues.every(x => this.state.SelectedValues.indexOf(x) > 0)
    );
  }

  canGoDownOrBottom(): boolean {
    return (
      this.state.UiSelectedSelectedValues.length != 0 &&
      this.state.UiSelectedSelectedValues.every(
        x => this.state.SelectedValues.indexOf(x) < this.state.SelectedValues.length - 1
      )
    );
  }

  ensureFirstSelectedItemVisible(top: boolean) {
    var itemComponentDOMNode = this.firstSelected;
    if (itemComponentDOMNode) {
      itemComponentDOMNode.scrollIntoView(top);
    }
  }

  Top(): void {
    let newSelectedValues = [].concat(
      this.state.UiSelectedSelectedValues,
      this.state.SelectedValues.filter(x => this.state.UiSelectedSelectedValues.indexOf(x) < 0)
    );

    this.setState(
      {
        SelectedValues: newSelectedValues,
        UiSelectedSelectedValues: [],
      } as DualListBoxEditorState,
      () => {
        this.raiseOnChange();
        this.ensureFirstSelectedItemVisible(true);
      }
    );
  }

  Up(): void {
    let newSelectedValues = [...this.state.SelectedValues];
    for (let selElement of this.state.UiSelectedSelectedValues) {
      let index = newSelectedValues.indexOf(selElement);
      ArrayExtensions.moveArray(newSelectedValues, index, index - 1);
    }

    this.setState(
      {
        SelectedValues: newSelectedValues,
      } as DualListBoxEditorState,
      () => {
        this.raiseOnChange();
        this.ensureFirstSelectedItemVisible(false);
      }
    );
  }

  Bottom(): void {
    let newSelectedValues = [].concat(
      this.state.SelectedValues.filter(x => this.state.UiSelectedSelectedValues.indexOf(x) < 0),
      this.state.UiSelectedSelectedValues
    );

    this.setState(
      {
        SelectedValues: newSelectedValues,
        UiSelectedSelectedValues: [],
      } as DualListBoxEditorState,
      () => {
        this.raiseOnChange();
        this.ensureFirstSelectedItemVisible(true);
      }
    );
  }

  Down(): void {
    let newSelectedValues = [...this.state.SelectedValues];
    for (var index = this.state.UiSelectedSelectedValues.length - 1; index >= 0; index--) {
      let indexglob = newSelectedValues.indexOf(this.state.UiSelectedSelectedValues[index]);
      ArrayExtensions.moveArray(newSelectedValues, indexglob, indexglob + 1);
    }

    this.setState(
      {
        SelectedValues: newSelectedValues,
      } as DualListBoxEditorState,
      () => {
        this.raiseOnChange();
        this.ensureFirstSelectedItemVisible(false);
      }
    );
  }

  Add() {
    let newSelectedValues = [...this.state.SelectedValues];
    let newAvailableValues = [...this.state.AvailableValues];
    let valuesToAdd = this.getValuesToAdd(this.state.UiSelectedAvailableValues);

    valuesToAdd.forEach(x => {
      let index = newAvailableValues.indexOf(x);
      newAvailableValues.splice(index, 1);
      if (this.props.ValueMember) {
        newSelectedValues.push(x[this.props.ValueMember]);
      } else {
        newSelectedValues.push(x);
      }
    });
    newAvailableValues = this.createAvailableValuesList(
      newAvailableValues,
      this.state.SortOrder,
      this.props.SortMember
    );

    this.setState(
      {
        UiSelectedAvailableValues: [],
        SelectedValues: newSelectedValues,
        AvailableValues: newAvailableValues,
      } as DualListBoxEditorState,
      () => this.raiseOnChange()
    );
  }

  AddAll() {
    let newSelectedValues = [].concat(this.state.SelectedValues);
    let valuesToAdd = this.getValuesToAdd(this.state.AvailableValues);
    valuesToAdd.forEach(x => {
      if (this.props.ValueMember) {
        newSelectedValues.push(x[this.props.ValueMember]);
      } else {
        if (ArrayExtensions.NotContainsItem(this.state.MasterValues, x)) {
          newSelectedValues.push(x);
        }
      }
    });

    let newAvailableValues: string[] = [];

    this.setState(
      {
        UiSelectedSelectedValues: [],
        UiSelectedAvailableValues: [],
        SelectedValues: newSelectedValues,
        AvailableValues: newAvailableValues,
      } as DualListBoxEditorState,
      () => this.raiseOnChange()
    );
  }

  getValuesToAdd(addedValues: any[]): any[] {
    if (ArrayExtensions.IsNullOrEmpty(this.props.MasterChildren)) {
      return addedValues;
    }

    let newAvailableValues: any[] = [];

    addedValues.forEach(av => {
      let masterChildren: IMasterChildren = this.props.MasterChildren.find(mc => mc.Master == av);
      if (masterChildren) {
        masterChildren.Children.forEach(c => {
          if (ArrayExtensions.ContainsItem(this.state.AvailableValues, c)) {
            ArrayExtensions.AddItem(newAvailableValues, c);
          }
        });
      } else {
        ArrayExtensions.AddItem(newAvailableValues, av);
      }
    });
    return newAvailableValues;
  }

  RemoveAll() {
    let newSelectedValues: string[] = [];
    let newAvailableValues = [].concat(this.state.AllValues);
    newAvailableValues = this.createAvailableValuesList(
      newAvailableValues,
      this.state.SortOrder,
      this.props.SortMember
    );
    this.setState(
      {
        UiSelectedSelectedValues: [],
        UiSelectedAvailableValues: [],
        SelectedValues: newSelectedValues,
        AvailableValues: newAvailableValues,
      } as DualListBoxEditorState,
      () => this.raiseOnChange()
    );
  }

  Remove() {
    let newSelectedValues = [...this.state.SelectedValues];
    let newAvailableValues = [...this.state.AvailableValues];
    this.state.UiSelectedSelectedValues.forEach(x => {
      let index = newSelectedValues.indexOf(x);
      newSelectedValues.splice(index, 1);
      if (this.props.ValueMember) {
        let originalItem = this.state.AllValues.find(y => y[this.props.ValueMember] == x);
        if (originalItem) {
          newAvailableValues.push(originalItem);
        }
      } else {
        let originalItem = this.state.AllValues.find(y => y == x);
        if (originalItem) {
          newAvailableValues.push(originalItem);
        }
      }
    });
    newAvailableValues = this.createAvailableValuesList(
      newAvailableValues,
      this.state.SortOrder,
      this.props.SortMember
    );
    this.setState(
      {
        UiSelectedSelectedValues: [],
        SelectedValues: newSelectedValues,
        AvailableValues: newAvailableValues,
      } as DualListBoxEditorState,
      () => this.raiseOnChange()
    );
  }

  private draggedHTMLElement: HTMLElement;
  private draggedElement: any;
  private overHTMLElement: HTMLElement;
  DragSelectedStart(e: React.DragEvent<any>, listElement: any) {
    this.draggedHTMLElement = e.currentTarget as HTMLElement;
    this.draggedElement = listElement;
  }
  DragSelectedEnd() {
    if (this.overHTMLElement && this.draggedElement) {
      //now we need to check in which drop area we dropped the selected item
      let to: number;
      let from = this.state.SelectedValues.indexOf(this.draggedElement);
      let newSelectedArray: Array<any>;
      let newAvailableValues: Array<any>;
      if (this.overHTMLElement.classList.contains('Available')) {
        if (this.props.DisplayMember) {
          to = this.state.AvailableValues.findIndex(
            x => x[this.props.DisplayMember] == this.overHTMLElement.innerText
          );
        } else {
          to = this.state.AvailableValues.indexOf(this.overHTMLElement.innerText);
        }
        newSelectedArray = [...this.state.SelectedValues];
        newSelectedArray.splice(from, 1);
        newAvailableValues = [...this.state.AvailableValues];
        if (this.props.ValueMember) {
          let originalItem = this.state.AllValues.find(
            y => y[this.props.ValueMember] == this.draggedElement
          );
          if (originalItem) {
            let checkForExistig: any = newAvailableValues.find(x => x == originalItem);
            if (!checkForExistig) {
              newAvailableValues.splice(to, 0, originalItem);
            }
          }
        } else {
          let originalItem = this.state.AllValues.find(y => y == this.draggedElement);
          if (originalItem) {
            let checkForExistig: any = newAvailableValues.find(x => x == originalItem);
            if (!checkForExistig) {
              newAvailableValues.splice(to, 0, originalItem);
            }
          }
        }
      } else if (this.overHTMLElement.classList.contains('ab-AvailableDropZone')) {
        newSelectedArray = [...this.state.SelectedValues];
        newSelectedArray.splice(from, 1);
        newAvailableValues = [...this.state.AvailableValues];
        if (this.props.ValueMember) {
          let originalItem = this.state.AllValues.find(
            y => y[this.props.ValueMember] == this.draggedElement
          );
          if (originalItem) {
            let checkForExistig: any = newAvailableValues.find(x => x == originalItem);
            if (!checkForExistig) {
              newAvailableValues.push(originalItem);
            }
          }
        } else {
          let originalItem = this.state.AllValues.find(y => y == this.draggedElement);
          if (originalItem) {
            let checkForExistig: any = newAvailableValues.find(x => x == originalItem);
            if (!checkForExistig) {
              newAvailableValues.push(originalItem);
            }
          }
        }
      } else if (this.overHTMLElement.classList.contains('Selected')) {
        to = this.state.SelectedValues.indexOf(this.overHTMLElement.innerText);
        newSelectedArray = [...this.state.SelectedValues];
        newSelectedArray.splice(from, 1);
        newSelectedArray.splice(to, 0, this.draggedElement);
        newAvailableValues = [...this.state.AvailableValues];
      } else if (this.overHTMLElement.classList.contains('ab-SelectedDropZone')) {
        newSelectedArray = [...this.state.SelectedValues];
        newSelectedArray.splice(from, 1);
        newSelectedArray.push(this.draggedElement);
        newAvailableValues = [...this.state.AvailableValues];
      }
      //We remove our awesome placeholder
      if (
        this.overHTMLElement.classList.contains('ab-SelectedDropZone') ||
        this.overHTMLElement.classList.contains('ab-AvailableDropZone')
      ) {
        this.overHTMLElement.removeChild(this.placeholder);
      } else {
        this.overHTMLElement.parentNode.removeChild(this.placeholder);
      }
      this.overHTMLElement = null;
      this.draggedHTMLElement = null;
      this.draggedElement = null;
      // Update state
      newAvailableValues = this.createAvailableValuesList(
        newAvailableValues,
        this.state.SortOrder,
        this.props.SortMember
      );

      this.setState(
        {
          SelectedValues: newSelectedArray,
          AvailableValues: newAvailableValues,
          UiSelectedSelectedValues: [],
          UiSelectedAvailableValues: [],
        } as DualListBoxEditorState,
        () => this.raiseOnChange()
      );
    }
  }
  DragAvailableStart(e: React.DragEvent<any>, listElement: any) {
    this.draggedHTMLElement = e.currentTarget as HTMLElement;
    this.draggedElement = listElement;
  }
  DragAvailableEnd() {
    if (this.overHTMLElement && this.draggedElement) {
      let to: number;
      let from = this.state.AvailableValues.indexOf(this.draggedElement);
      let newSelectedArray: Array<any>;
      let newAvailableValues: Array<any>;

      if (this.overHTMLElement.classList.contains('Selected')) {
        from = this.state.AvailableValues.indexOf(this.draggedElement);
        to = this.state.SelectedValues.indexOf(this.overHTMLElement.innerText);
        newSelectedArray = [...this.state.SelectedValues];
        if (this.props.ValueMember) {
          newSelectedArray.splice(to, 0, this.draggedElement[this.props.ValueMember]);
        } else {
          newSelectedArray.splice(to, 0, this.draggedElement);
        }
        newAvailableValues = [...this.state.AvailableValues];
        newAvailableValues.splice(from, 1);
      } else if (this.overHTMLElement.classList.contains('ab-SelectedDropZone')) {
        newSelectedArray = [...this.state.SelectedValues];
        if (this.props.ValueMember) {
          newSelectedArray.push(this.draggedElement[this.props.ValueMember]);
        } else {
          newSelectedArray.push(this.draggedElement);
        }
        newAvailableValues = [...this.state.AvailableValues];
        newAvailableValues.splice(from, 1);
      }

      //We remove our awesome placeholder
      if (this.overHTMLElement.classList.contains('ab-SelectedDropZone')) {
        this.overHTMLElement.removeChild(this.placeholder);
      } else {
        this.overHTMLElement.parentNode.removeChild(this.placeholder);
      }
      this.overHTMLElement = null;
      this.draggedHTMLElement = null;
      this.draggedElement = null;

      // Update state
      this.setState(
        {
          SelectedValues: newSelectedArray,
          AvailableValues: newAvailableValues,
          UiSelectedSelectedValues: [],
          UiSelectedAvailableValues: [],
        } as DualListBoxEditorState,
        () => this.raiseOnChange()
      );
    }
  }
  DragEnterAvailable(e: React.DragEvent<any>) {
    e.preventDefault();
    e.stopPropagation();
  }
  DragOverAvailable(e: React.DragEvent<any>) {
    e.preventDefault();
    e.stopPropagation();
    //we can only drop selected data into available
    if (!this.draggedHTMLElement.classList.contains('Selected')) {
      e.dataTransfer.dropEffect = 'none';
      return;
    }
    let targetElement = e.target as HTMLElement;
    //we want to keep the reference of the last intem we were over to
    if (targetElement.classList.contains('placeholder')) {
      return;
    }
    this.overHTMLElement = targetElement;
    if (this.overHTMLElement.classList.contains('ab-AvailableDropZone')) {
      targetElement.appendChild(this.placeholder);
    } else {
      targetElement.parentNode.insertBefore(this.placeholder, targetElement);
    }
  }
  DragLeaveAvailable(e: React.DragEvent<any>) {
    e.preventDefault();
    e.stopPropagation();
    let targetElement = e.target as HTMLElement;
    if (
      targetElement.classList.contains('ab-AvailableDropZone') ||
      targetElement.classList.contains('placeholder')
    ) {
      if (this.overHTMLElement) {
        if (this.overHTMLElement.classList.contains('ab-AvailableDropZone')) {
          this.overHTMLElement.removeChild(this.placeholder);
        } else {
          this.overHTMLElement.parentNode.removeChild(this.placeholder);
        }
        this.overHTMLElement = null;
      }
    }
  }

  DragEnterSelected(e: React.DragEvent<any>) {
    e.preventDefault();
    e.stopPropagation();
  }
  DragOverSelected(e: React.DragEvent<any>) {
    e.preventDefault();
    e.stopPropagation();
    let targetElement = e.target as HTMLElement;
    //we want to keep the reference of the last intem we were over to
    if (targetElement.classList.contains('placeholder')) {
      return;
    }
    this.overHTMLElement = targetElement;
    if (this.overHTMLElement.classList.contains('ab-SelectedDropZone')) {
      targetElement.appendChild(this.placeholder);
    } else {
      targetElement.parentNode.insertBefore(this.placeholder, targetElement);
    }
  }
  DragLeaveSelected(e: React.DragEvent<any>) {
    e.preventDefault();
    e.stopPropagation();
    let targetElement = e.target as HTMLElement;
    if (
      targetElement.classList.contains('ab-SelectedDropZone') ||
      targetElement.classList.contains('placeholder')
    ) {
      if (this.overHTMLElement) {
        if (this.overHTMLElement.classList.contains('ab-SelectedDropZone')) {
          this.overHTMLElement.removeChild(this.placeholder);
        } else {
          this.overHTMLElement.parentNode.removeChild(this.placeholder);
        }
        this.overHTMLElement = null;
      }
    }
  }

  handleChangeFilterValue(x: string) {
    this.setState({
      FilterValue: x,
    } as DualListBoxEditorState);
  }

  handleChangeSelectedValuesFilterValue(x: string) {
    this.setState({
      SelectedValuesFilterValue: x,
    } as DualListBoxEditorState);
  }

  sortColumnValues() {
    if (this.state.SortOrder == SortOrder.Ascending) {
      this.setState({
        AvailableValues: ArrayExtensions.sortArrayWithProperty(
          SortOrder.Descending,
          this.state.AvailableValues,
          this.props.SortMember
        ),
        SortOrder: SortOrder.Descending,
      } as DualListBoxEditorState);
    } else {
      this.setState({
        AvailableValues: ArrayExtensions.sortArrayWithProperty(
          SortOrder.Ascending,
          this.state.AvailableValues,
          this.props.SortMember
        ),
        SortOrder: SortOrder.Ascending,
      } as DualListBoxEditorState);
    }
  }

  sortSelectedColumnValues() {
    if (this.state.SelectedValuesSortOrder == SortOrder.Ascending) {
      this.setState({
        SelectedValues: ArrayExtensions.sortArrayWithProperty(
          SortOrder.Descending,
          this.state.SelectedValues,
          this.props.SortMember
        ),
        SelectedValuesSortOrder: SortOrder.Descending,
      } as DualListBoxEditorState);
    } else {
      this.setState({
        SelectedValues: ArrayExtensions.sortArrayWithProperty(
          SortOrder.Ascending,
          this.state.SelectedValues,
          this.props.SortMember
        ),
        SelectedValuesSortOrder: SortOrder.Ascending,
      } as DualListBoxEditorState);
    }
  }

  raiseOnChange() {
    this.props.onChange(this.state.SelectedValues);
  }

  private getSelectedItemId = (index: number) => {
    const item = this.state.SelectedValues[index];

    if (!item) {
      return -1;
    }

    let display = this.props.DisplayMember ? item[this.props.DisplayMember] : item;

    if (
      this.isValueFilteredOut(
        display,
        this.state.SelectedValuesFilterValue,
        this.state.SelectedValues
      )
    ) {
      return -1;
    }

    return item;
  };

  private onSelectedListSelectionChange = (selection: { [key: string]: boolean }) => {
    const UiSelectedSelectedValues = Object.keys(selection);

    UiSelectedSelectedValues.sort(
      (a, b) => this.state.SelectedValues.indexOf(a) - this.state.SelectedValues.indexOf(b)
    );

    this.setState({ UiSelectedSelectedValues } as DualListBoxEditorState);
  };

  private getAvailableItemId = (index: number) => {
    const item = this.state.AvailableValues[index];

    if (!item) {
      return -1;
    }

    let display = this.props.DisplayMember ? item[this.props.DisplayMember] : item;
    let value = this.props.ValueMember ? item[this.props.ValueMember] : item;

    if (this.isValueFilteredOut(display)) {
      return -1;
    }

    return value;
  };

  /**
   * @param selection - is a map, values being item keys (their textual representation), while values being true
   */
  private onAvailableListSelectionChange = (selection: { [key: string]: boolean }) => {
    let UiSelectedAvailableValues = Object.keys(selection);

    let availableValues = this.state.AvailableValues;
    let availableValuesMap: { [key: string]: any } = {};

    if (this.props.ValueMember) {
      availableValues = availableValues.map(x => {
        const key = x[this.props.ValueMember];

        availableValuesMap[key] = x;
        return key;
      });
    }
    UiSelectedAvailableValues.sort(
      (a, b) => availableValues.indexOf(a) - availableValues.indexOf(b)
    );

    if (this.props.ValueMember) {
      UiSelectedAvailableValues = UiSelectedAvailableValues.map(k => availableValuesMap[k]);
    }

    this.setState({ UiSelectedAvailableValues } as DualListBoxEditorState);
  };
}

var listGroupStyle: React.CSSProperties = {
  overflowY: 'auto',
  marginBottom: '0px',
};

var listGroupItemStyle: React.CSSProperties = {
  fontSize: 'small',
  padding: 'var(--ab-space-1)',
};
