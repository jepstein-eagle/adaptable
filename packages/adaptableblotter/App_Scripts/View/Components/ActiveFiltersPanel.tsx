import * as React from "react";
import { Glyphicon, Panel, Table } from "react-bootstrap";
import { ExpressionHelper } from "../../Utilities/Helpers/ExpressionHelper";
import { IColumn } from "../../Utilities/Interface/IColumn";
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { IColumnFilter } from "../../Utilities/Interface/BlotterObjects/IColumnFilter";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { ButtonSave } from "./Buttons/ButtonSave";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { ButtonClear } from "./Buttons/ButtonClear";
import { AccessLevel } from "../../Utilities/Enums";

export interface ActiveFiltersPanelProps extends React.ClassAttributes<ActiveFiltersPanel> {
    ColumnFilters: IColumnFilter[];
    Columns: IColumn[];
    cssClassName: string;
    AccessLevel: AccessLevel;
    onClear: (columnFilter: IColumnFilter) => void;
    onSaveColumnFilterasUserFilter: (columnFilter: IColumnFilter) => void;
}

export class ActiveFiltersPanel extends React.Component<ActiveFiltersPanelProps, {}> {
    render(): any {
        let cssClassName: string = this.props.cssClassName + StyleConstants.ACTIVE_FILTERS;

        var activeFilters = this.props.ColumnFilters.map((columnFilter: IColumnFilter, index: number) => {
            return <tr key={index} >
                <td>{ColumnHelper.getFriendlyNameFromColumnId(columnFilter.ColumnId, this.props.Columns)}</td>
                <td colSpan={2}> {ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns, false)}</td>

                <td>
                    <span style={{alignContent: "right"}}>
                        <ButtonSave cssClassName={this.props.cssClassName}
                            onClick={() => this.props.onSaveColumnFilterasUserFilter(columnFilter)}
                            overrideTooltip="Save as User Filter"
                            bsStyle={"primary"}
                            DisplayMode="Glyph"
                            size={"xsmall"}
                            overrideDisableButton={columnFilter == null || ArrayExtensions.IsNotNullOrEmpty(columnFilter.Filter.FilterExpressions)}
                            AccessLevel={this.props.AccessLevel}
                        />
                        {' '}
                        <ButtonClear cssClassName={this.props.cssClassName}
                            onClick={() => this.props.onClear(columnFilter)}
                            overrideTooltip="Clear Column Filter"
                            bsStyle={StyleConstants.DEFAULT_BSSTYLE}
                            DisplayMode="Glyph"
                            size={"xs"}
                            overrideDisableButton={columnFilter == null}
                            AccessLevel={this.props.AccessLevel}
                        />
                    </span>

                </td>

            </tr>
        });
        var header = <thead>
            <tr>
                <th>Column</th>
                <th>Filter</th>
                <th></th>
                <th ></th>
            </tr>
        </thead>

        return <div className={cssClassName}>
            <Panel header={""} bsStyle="info" className="ab_preview_panel">
                <div>
                    <Table style={{ margin: "0px", padding: "0px" }} >
                        {header}
                        <tbody >
                            {activeFilters}
                        </tbody>
                    </Table>
                </div>
            </Panel>
        </div>
    }

}


