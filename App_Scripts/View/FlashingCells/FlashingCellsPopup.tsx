import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import * as FlashingCellsRedux from '../../Redux/ActionsReducers/FlashingCellsRedux'
import { IFlashingColumn } from '../../Strategy/Interface/IFlashingCellsStrategy';
import { IColumn } from '../../Core/Interface/IColumn';
import { FormGroup, Col, Checkbox } from 'react-bootstrap';
import { DataType, SortOrder } from '../../Core/Enums'
import { FlashingCellEntityRow } from './FlashingCellEntityRow'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { Helper } from '../../Core/Helpers/Helper'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from "../UIInterfaces";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";

interface FlashingCellsPopupProps extends StrategyViewPopupProps<FlashingCellsPopupComponent> {
    FlashingColumns: Array<IFlashingColumn>,
    Columns: IColumn[],
    PredefinedColorChoices: string[],
    onSelectColumn: (flashingCell: IFlashingColumn) => FlashingCellsRedux.FlashingCellSelectAction,
    onSelectAllColumns: (numericColumns: IFlashingColumn[]) => FlashingCellsRedux.FlashingCellSelectAllAction,
    onChangeFlashDurationFlashingColumn: (flashingCell: IFlashingColumn, newFlashDuration: number) => FlashingCellsRedux.FlashingCellChangeDurationAction
    onChangeDownColorFlashingColumn: (flashingCell: IFlashingColumn, DownColor: string) => FlashingCellsRedux.FlashingCellChangeDownColorAction
    onChangeUpColorFlashingColumn: (flashingCell: IFlashingColumn, UpColor: string) => FlashingCellsRedux.FlashingCellChangeUpColorAction

}

class FlashingCellsPopupComponent extends React.Component<FlashingCellsPopupProps, {}> {

    render() {
        let infoBody: any[] = ["Make numeric cells flash briefly as their value changes", <br />, <br />, "Click the 'Live' checkbox to turn on flashing for a particular column; or the 'All Columns' checkbox to turn on flashing for all Columns", <br />, <br />, "Defaults are Green for positive change, Red for negative change and a Duration of 0.5 seconds, but these can be amended for each column."]

        let flashingCellDurations = ObjectFactory.GetFlashingCellDurations();

        let numericColumns = this.props.Columns.filter(c => c.DataType == DataType.Number);
        numericColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, numericColumns, "FriendlyName")

        let colItems: IColItem[] = [
            { Content: "Live", Size: 1 },
            { Content: "Column", Size: 4 },
            { Content: "Flash Duration", Size: 3 },
            { Content: "Up Colour", Size: 2 },
            { Content: "Down Colour", Size: 2 },
        ]

        let allPotentialFlashingColumns: IFlashingColumn[] = [];
        numericColumns.forEach(nc => {
            let existingfc = this.props.FlashingColumns.find(e => e.ColumnName == nc.ColumnId)
            if (!existingfc) {
                allPotentialFlashingColumns.push(ObjectFactory.CreateDefaultFlashingColumn(nc))
            }
            else {
                allPotentialFlashingColumns.push(existingfc);
            }
        })

        let allFlashingColumns = allPotentialFlashingColumns.map((flashingColumn: IFlashingColumn, index) => {
            return <FlashingCellEntityRow
                AdaptableBlotterObject={flashingColumn}
                key={flashingColumn.ColumnName}
                Index={index}
                Columns={this.props.Columns}
                UserFilters={null}
                ColItems={colItems}
                FlashingCellDurations={flashingCellDurations}
                PredefinedColorChoices={this.props.PredefinedColorChoices}
                onSelect={(flashingColumn) => this.props.onSelectColumn(flashingColumn)}
                onChangeFlashingDuration={(flashingColumn, newFlashDuration) => this.props.onChangeFlashDurationFlashingColumn(flashingColumn, newFlashDuration)}
                onChangeDownColorFlashingColumn={(flashingColumn, DownColor) => this.props.onChangeDownColorFlashingColumn(flashingColumn, DownColor)}
                onChangeUpColorFlashingColumn={(flashingColumn, UpColor) => this.props.onChangeUpColorFlashingColumn(flashingColumn, UpColor)}
                TeamSharingActivated={false}
                onShare={null}
                onEdit={null}
                onDeleteConfirm={null}
            >
            </FlashingCellEntityRow>
        });

        let setAllOption = <AdaptableBlotterForm horizontal>
            <FormGroup controlId="formInlineName">
                <Col xs={12} className="medium_margin_style">
                    <Checkbox onChange={() => this.props.onSelectAllColumns(allPotentialFlashingColumns.filter(x => x.IsPredefined == false))}
                        checked={allPotentialFlashingColumns.every(f => f.IsLive)} > All Columns </Checkbox>
                </Col>
            </FormGroup>
        </AdaptableBlotterForm>;

        return <div className="adaptable_blotter_style_popup_flashingcells">
            <PanelWithImage header={StrategyNames.FlashingCellsStrategyName} bsStyle="primary" className="adaptableblotter_modal_main_panel" glyphicon={StrategyGlyphs.FlashingCellGlyph} infoBody={infoBody}>
                {setAllOption}
                <AdaptableObjectCollection ColItems={colItems} items={allFlashingColumns} />

            </PanelWithImage>
        </div>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FlashingColumns: state.FlashingCell.FlashingColumns,
        Columns: state.Grid.Columns,
        PredefinedColorChoices: state.UIControlConfig.PredefinedColorChoices
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectColumn: (flashingCell: IFlashingColumn) => dispatch(FlashingCellsRedux.FlashingCellSelect(flashingCell)),
        onSelectAllColumns: (numericColumns: IFlashingColumn[]) => dispatch(FlashingCellsRedux.FlashingCellSelectAll(numericColumns)),
        onChangeFlashDurationFlashingColumn: (flashingCell: IFlashingColumn, newFlashDuration: number) => dispatch(FlashingCellsRedux.FlashingCellChangeDuration(flashingCell, newFlashDuration)),
        onChangeDownColorFlashingColumn: (flashingCell: IFlashingColumn, DownColor: string) => dispatch(FlashingCellsRedux.FlashingCellChangeDownColor(flashingCell, DownColor)),
        onChangeUpColorFlashingColumn: (flashingCell: IFlashingColumn, UpColor: string) => dispatch(FlashingCellsRedux.FlashingCellChangeUpColor(flashingCell, UpColor))
    };
}

export let FlashingCellsPopup = connect(mapStateToProps, mapDispatchToProps)(FlashingCellsPopupComponent);


