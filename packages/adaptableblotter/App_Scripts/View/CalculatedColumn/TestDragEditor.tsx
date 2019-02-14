import * as React from "react";
import * as ReactDOM from "react-dom";
import { SortOrder } from "../../Utilities/Enums";
import { ListGroupItem, Col, Panel, ListGroup } from "react-bootstrap";
import { ListBoxFilterSortComponent } from "../Components/ListBox/ListBoxFilterSortComponent";





export interface TestDragEditorProps extends React.ClassAttributes<TestDragEditor> {
    SelectedValues: Array<any>
    AvailableValues: Array<any>
    HeaderAvailable: string
    HeaderSelected: string
      cssClassName: string
}

export interface TestDragEditorState extends React.ClassAttributes<TestDragEditor> {
    SelectedValues: Array<any>
    AvailableValues: Array<any>
    UiSelectedAvailableValues: Array<any>
    UiSelectedSelectedValues: Array<any>
    FilterValue: string
    SortOrder: SortOrder
    AllValues: Array<any>
   
}

export class TestDragEditor extends React.Component<TestDragEditorProps, TestDragEditorState> {
    private placeholder: HTMLButtonElement
    constructor(props: TestDragEditorProps) {
        super(props);
        this.placeholder = document.createElement("button");
        this.placeholder.className = "placeholder"
        this.placeholder.classList.add("list-group-item")
        this.placeholder.type = "button"
        let availableValues = new Array<any>();

        this.props.AvailableValues.forEach(x => {
               if (this.props.SelectedValues.indexOf(x) < 0) {
                    availableValues.push(x);
                }
            
        })
        this.state = {
            SelectedValues: this.props.SelectedValues,
            AvailableValues: availableValues,
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            FilterValue: "",
            SortOrder: SortOrder.Ascending,
            AllValues: this.props.AvailableValues,
     }
    }

    componentWillReceiveProps(nextProps: TestDragEditorProps, nextContext: any) {
        let availableValues = new Array<any>();
        nextProps.AvailableValues.forEach(x => {
               if (nextProps.SelectedValues.indexOf(x) < 0) {
                    availableValues.push(x);
               }
        })
        //we need to rebuild the list of UI Selected items in case we are managing non primitive objects as we compare stuff on instance rather than properties
        let uiAvailableSelected: Array<any>
        let uiSelectedSelected: Array<any>
      
            uiAvailableSelected = this.state.UiSelectedAvailableValues
            uiSelectedSelected = this.state.UiSelectedSelectedValues
       
        this.setState({
            SelectedValues: nextProps.SelectedValues,
            AvailableValues: availableValues,
            UiSelectedAvailableValues: uiAvailableSelected,
            UiSelectedSelectedValues: uiSelectedSelected,
            FilterValue: this.state.FilterValue,
            SortOrder: this.state.SortOrder,
          });
        }


    render() {
        let cssClassName: string = this.props.cssClassName;
        let setRefFirstSelected = true
       
        // build selected elements
        let selectedElements = this.state.SelectedValues.map(x => {
            let isActive = this.state.UiSelectedSelectedValues.indexOf(x) >= 0;
            if (isActive && setRefFirstSelected) {
                setRefFirstSelected = false
                return <ListGroupItem key={x}
                    className="Selected"
                    draggable={true}
                    onClick={() => this.onClickSelectedItem(x)}
                    active={isActive}
                    ref="FirstSelectedSelected"
                    onDragStart={(event) => this.DragSelectedStart(event, x)}
                    onDragEnd={() => this.DragSelectedEnd()}
                    value={x}>{x}</ListGroupItem>
            }
            else {
                return <ListGroupItem key={x}
                    className="Selected"
                     draggable={true}
                    onClick={() => this.onClickSelectedItem(x)}
                    bsSize={'small'} active={isActive}
                    onDragStart={(event) => this.DragSelectedStart(event, x)}
                    onDragEnd={() => this.DragSelectedEnd()}
                    value={x}>{x}</ListGroupItem>
            }
        })

        // build available elements - might have master/children
        let availableElements = this.state.AvailableValues.map(x => {
            let isActive = this.state.UiSelectedAvailableValues.indexOf(x) >= 0;
           
                  return <span key={x}>
                   
                       <ListGroupItem
                            bsSize={'small'}
                            className="Available"
                            active={isActive}
                            draggable={true}
                            onClick={() => this.onClickAvailableValuesItem(x)}
                            key={x}
                            onDragStart={(event) => this.DragAvailableStart(event, x)}
                            onDragEnd={() => this.DragAvailableEnd()}
                            value={x}>
                            {x}

                        </ListGroupItem>
           
                </span>
           
        })

        let headerFirstListBox = <ListBoxFilterSortComponent
            FilterValue={this.state.FilterValue}
            sortColumnValues={null}
            SortOrder={this.state.SortOrder}
            handleChangeFilterValue={(e) => this.handleChangeFilterValue(e)}
            DisableSort={true} />

    
        return (<div className={cssClassName}>
            <Col xs={4}>
                <Panel header={this.props.HeaderAvailable} className="ab_no-padding-anywhere-panel" bsStyle="info">
                    <div>
                        {headerFirstListBox}
                        <ListGroup className="AvailableDropZone" 
                            onDragEnter={(event) => this.DragEnterAvailable(event)}
                            onDragOver={(event) => this.DragOverAvailable(event)}
                            onDragLeave={(event) => this.DragLeaveAvailable(event)}>
                            {availableElements}
                        </ListGroup>
                    </div>
                </Panel>
            </Col>
           
              <Col xs={4} >
                <Panel header={this.props.HeaderSelected} className="ab_no-padding-anywhere-panel" bsStyle="info">
                    <div>
                        <ListGroup  className="SelectedDropZone"
                            onDragEnter={(event) => this.DragEnterSelected(event)}
                            onDragOver={(event) => this.DragOverSelected(event)}
                            onDragLeave={(event) => this.DragLeaveSelected(event)}>
                            {selectedElements}
                        </ListGroup>
                    </div>
                </Panel>
            </Col>
           
        </div>
        );
    }

   


  

   

    ensureFirstSelectedItemVisible(top: boolean) {
        var itemComponent = this.refs['FirstSelectedSelected'];
        if (itemComponent) {
            var domNode = ReactDOM.findDOMNode(itemComponent) as HTMLElement;
            domNode.scrollIntoView(top);
        }
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
            let newSelectedArray: Array<any>
            let newAvailableValues: Array<any>
            if (this.overHTMLElement.classList.contains("Available")) {
                    to = this.state.AvailableValues.indexOf(this.overHTMLElement.innerText);
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newAvailableValues = [...this.state.AvailableValues];
                 let originalItem = this.state.AllValues.find(y => y == this.draggedElement)
                    if (originalItem) {
                        let checkForExistig: any = newAvailableValues.find(x => x == originalItem)
                        if (!checkForExistig) {
                            newAvailableValues.splice(to, 0, originalItem)
                       
                    }
                }
            }
            else if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newAvailableValues = [...this.state.AvailableValues];
                     let originalItem = this.state.AllValues.find(y => y == this.draggedElement)
                    if (originalItem) {
                        let checkForExistig: any = newAvailableValues.find(x => x == originalItem)
                        if (!checkForExistig) {
                            newAvailableValues.push(originalItem)
                        }
                    
                }
            }
            else if (this.overHTMLElement.classList.contains("Selected")) {
                to = this.state.SelectedValues.indexOf(this.overHTMLElement.innerText);
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newSelectedArray.splice(to, 0, this.draggedElement);
                newAvailableValues = [...this.state.AvailableValues];
            }
            else if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newSelectedArray.push(this.draggedElement);
                newAvailableValues = [...this.state.AvailableValues];
            }
            //We remove our awesome placeholder
            if (this.overHTMLElement.classList.contains('SelectedDropZone') || this.overHTMLElement.classList.contains('AvailableDropZone')) {
                this.overHTMLElement.removeChild(this.placeholder);
            }
            else {
                this.overHTMLElement.parentNode.removeChild(this.placeholder);
            }
            this.overHTMLElement = null;
            this.draggedHTMLElement = null;
            this.draggedElement = null
            // Update state 
            newAvailableValues = newAvailableValues;

            this.setState({
                SelectedValues: newSelectedArray,
                AvailableValues: newAvailableValues,
                UiSelectedSelectedValues: [],
                UiSelectedAvailableValues: [],
            } as TestDragEditorState
                , () => this.raiseOnChange());
        }
    }
    DragAvailableStart(e: React.DragEvent<any>, listElement: any) {
        this.draggedHTMLElement = e.currentTarget as HTMLElement;
        this.draggedElement = listElement
    }
    DragAvailableEnd() {
        if (this.overHTMLElement && this.draggedElement) {
            let to: number;
            let from = this.state.AvailableValues.indexOf(this.draggedElement);
            let newSelectedArray: Array<any>
            let newAvailableValues: Array<any>

            if (this.overHTMLElement.classList.contains("Selected")) {
                from = this.state.AvailableValues.indexOf(this.draggedElement);
                to = this.state.SelectedValues.indexOf(this.overHTMLElement.innerText);
                newSelectedArray = [...this.state.SelectedValues];
                    newSelectedArray.splice(to, 0, this.draggedElement)
                newAvailableValues = [...this.state.AvailableValues];
                newAvailableValues.splice(from, 1);
            }
            else if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                     newSelectedArray.push(this.draggedElement)
                newAvailableValues = [...this.state.AvailableValues];
                newAvailableValues.splice(from, 1);
            }

            //We remove our awesome placeholder
            if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                this.overHTMLElement.removeChild(this.placeholder);
            }
            else {
                this.overHTMLElement.parentNode.removeChild(this.placeholder);
            }
            this.overHTMLElement = null;
            this.draggedHTMLElement = null;
            this.draggedElement = null;

            // Update state
            this.setState({
                SelectedValues: newSelectedArray,
                AvailableValues: newAvailableValues,
                UiSelectedSelectedValues: [],
                UiSelectedAvailableValues: [],
            } as TestDragEditorState
                , () => this.raiseOnChange());
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
        if (!this.draggedHTMLElement.classList.contains("Selected")) {
            e.dataTransfer.dropEffect = 'none';
            return;
        }
        let targetElement = (e.target) as HTMLElement;
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains("placeholder")) { return; }
        this.overHTMLElement = targetElement;
        if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
            targetElement.appendChild(this.placeholder);
        }
        else {
            targetElement.parentNode.insertBefore(this.placeholder, targetElement);
        }
    }
    DragLeaveAvailable(e: React.DragEvent<any>) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target) as HTMLElement;
        if (targetElement.classList.contains("AvailableDropZone") || targetElement.classList.contains("placeholder")) {
            if (this.overHTMLElement) {
                if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
                    this.overHTMLElement.removeChild(this.placeholder);
                }
                else {
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
        let targetElement = (e.target) as HTMLElement;
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains("placeholder")) { return; }
        this.overHTMLElement = targetElement;
        if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
            targetElement.appendChild(this.placeholder);
        }
        else {
            targetElement.parentNode.insertBefore(this.placeholder, targetElement);
        }
    }
    DragLeaveSelected(e: React.DragEvent<any>) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target) as HTMLElement;
        if (targetElement.classList.contains("SelectedDropZone") || targetElement.classList.contains("placeholder")) {
            if (this.overHTMLElement) {
                if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                    this.overHTMLElement.removeChild(this.placeholder);
                }
                else {
                    this.overHTMLElement.parentNode.removeChild(this.placeholder);
                }
                this.overHTMLElement = null;
            }
        }
    }

    handleChangeFilterValue(x: string) {
        this.setState({
            FilterValue: x
        } as TestDragEditorState);
    }

  
    raiseOnChange() {
      //  this.props.onChange(this.state.SelectedValues);
    }

    onClickSelectedItem(item: any) {
        let index = this.state.UiSelectedSelectedValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedSelectedValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedSelectedValues: newArray } as TestDragEditorState)
        }
        else {
            let newArray = [...this.state.UiSelectedSelectedValues];
            newArray.push(item)
            //we reorder the array so UiSelectedSelectedValues hass the same order as the list displayed on screen
            newArray.sort((a, b) => (this.state.SelectedValues.indexOf(a) < this.state.SelectedValues.indexOf(b)) ? -1 : (this.state.SelectedValues.indexOf(a) > this.state.SelectedValues.indexOf(b)) ? 1 : 0)
            this.setState({ UiSelectedSelectedValues: newArray } as TestDragEditorState)
        }
    }
    onClickAvailableValuesItem(item: any) {
        let index = this.state.UiSelectedAvailableValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedAvailableValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedAvailableValues: newArray } as TestDragEditorState)
        }
        else {
            let newArray = [...this.state.UiSelectedAvailableValues];
            newArray.push(item)
            //we reorder the array so UiSelectedAvailableValues hass the same order as the list displayed on screen
            newArray.sort((a, b) => (this.state.AvailableValues.indexOf(a) < this.state.AvailableValues.indexOf(b)) ? -1 : (this.state.AvailableValues.indexOf(a) > this.state.AvailableValues.indexOf(b)) ? 1 : 0)
            this.setState({ UiSelectedAvailableValues: newArray } as TestDragEditorState)
        }
    }

}

