import * as React from "react";
import {  FormGroup, InputGroup, FormControl, Glyphicon, Button } from 'react-bootstrap';
import { SortOrder } from '../../../Core/Enums'
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";

export interface ListBoxFilterSortComponentProps extends React.ClassAttributes<ListBoxFilterSortComponent> {
    FilterValue: string
    SortOrder: SortOrder
    handleChangeFilterValue: (value: string) => void
    sortColumnValues: () => void
    DisableSort: boolean
}

export class ListBoxFilterSortComponent extends React.Component<ListBoxFilterSortComponentProps, {}> {
    render() {
        return <div>
            <AdaptableBlotterForm horizontal>
            <FormGroup style={{ margin: 0 }}>
                <InputGroup>
                    <FormControl
                        type="text"
                        value={this.props.FilterValue}
                        placeholder="Search"
                        onChange={(e) => this.handleChangeFilterValue(e)}
                        />
                    <InputGroup.Button>
                        <Button onClick={() => this.clearFilter()}><Glyphicon glyph="remove" /></Button>
                    </InputGroup.Button>
                    <InputGroup.Button>
                        {this.props.SortOrder == SortOrder.Ascending ?
                            <Button disabled={this.props.DisableSort} onClick={() => this.props.sortColumnValues()} ><Glyphicon glyph="sort-by-alphabet" /></Button> :
                            <Button disabled={this.props.DisableSort} onClick={() => this.props.sortColumnValues()} ><Glyphicon glyph="sort-by-alphabet-alt" /></Button>
                        }
                    </InputGroup.Button>
                </InputGroup>
                <InputGroup>

                </InputGroup>
            </FormGroup>
        </AdaptableBlotterForm>
        </div>
    }

    handleChangeFilterValue(x: React.FormEvent<any>) {
        let e = x.target as HTMLInputElement;
        this.props.handleChangeFilterValue(e.value)
    }

    clearFilter() {
        this.props.handleChangeFilterValue("")
    }
}