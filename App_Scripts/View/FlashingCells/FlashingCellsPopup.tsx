import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import * as FlashingCellsRedux from '../../Redux/ActionsReducers/FlashingCellsRedux'
import { IFlashingCell } from '../../Strategy/Interface/IFlashingCellsStrategy';
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
    FlashingCells: Array<IFlashingCell>,
    onSelectColumn: (flashingCell: IFlashingCell) => FlashingCellsRedux.FlashingCellSelectAction,
    onSelectAllColumns: (numericColumns: IFlashingCell[]) => FlashingCellsRedux.FlashingCellSelectAllAction,
    onChangeFlashDuration: (flashingCell: IFlashingCell, newFlashDuration: number) => FlashingCellsRedux.FlashingCellChangeDurationAction
    onChangeDownColorFlashingCell: (flashingCell: IFlashingCell, DownColor: string) => FlashingCellsRedux.FlashingCellChangeDownColorAction
    onChangeUpColorFlashingCell: (flashingCell: IFlashingCell, UpColor: string) => FlashingCellsRedux.FlashingCellChangeUpColorAction

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

        let allPotentialFlashingCells: IFlashingCell[] = [];
        numericColumns.forEach(nc => {
            let existingfc = this.props.FlashingCells.find(e => e.ColumnName == nc.ColumnId)
            if (!existingfc) {
                allPotentialFlashingCells.push(ObjectFactory.CreateDefaultFlashingCell(nc))
            }
            else {
                allPotentialFlashingCells.push(existingfc);
            }
        })

        let allFlashingCells = allPotentialFlashingCells.map((flashingcell: IFlashingCell, index) => {
            return <FlashingCellEntityRow
                AdaptableBlotterObject={flashingcell}
                key={flashingcell.ColumnName}
                Index={index}
                Columns={this.props.Columns}
                UserFilters={null}
                ColItems={colItems}
                FlashingCellDurations={flashingCellDurations}
                ColorPalette={this.props.ColorPalette}
                onSelect={(flashingcell) => this.props.onSelectColumn(flashingcell)}
                onChangeFlashingDuration={(flashingcell, newFlashDuration) => this.props.onChangeFlashDuration(flashingcell, newFlashDuration)}
                onChangeDownColorFlashingCell={(flashingcell, DownColor) => this.props.onChangeDownColorFlashingCell(flashingcell, DownColor)}
                onChangeUpColorFlashingCell={(flashingcell, UpColor) => this.props.onChangeUpColorFlashingCell(flashingcell, UpColor)}
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
                    <Checkbox onChange={() => this.props.onSelectAllColumns(allPotentialFlashingCells.filter(x => x.IsPredefined == false))}
                        checked={allPotentialFlashingCells.every(f => f.IsLive)} > All Columns </Checkbox>
                </Col>
            </FormGroup>
        </AdaptableBlotterForm>;

        return <div className="adaptable_blotter_style_popup_flashingcells">
            <PanelWithImage header={StrategyNames.FlashingCellsStrategyName} bsStyle="primary" className="adaptableblotter_modal_main_panel" glyphicon={StrategyGlyphs.FlashingCellGlyph} infoBody={infoBody}>
                {setAllOption}
                <AdaptableObjectCollection ColItems={colItems} items={allFlashingCells} />

            </PanelWithImage>
        </div>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FlashingCells: state.FlashingCell.FlashingCells,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectColumn: (flashingCell: IFlashingCell) => dispatch(FlashingCellsRedux.FlashingCellSelect(flashingCell)),
        onSelectAllColumns: (numericColumns: IFlashingCell[]) => dispatch(FlashingCellsRedux.FlashingCellSelectAll(numericColumns)),
        onChangeFlashDuration: (flashingCell: IFlashingCell, newFlashDuration: number) => dispatch(FlashingCellsRedux.FlashingCellChangeDuration(flashingCell, newFlashDuration)),
        onChangeDownColorFlashingCell: (flashingCell: IFlashingCell, DownColor: string) => dispatch(FlashingCellsRedux.FlashingCellChangeDownColor(flashingCell, DownColor)),
        onChangeUpColorFlashingCell: (flashingCell: IFlashingCell, UpColor: string) => dispatch(FlashingCellsRedux.FlashingCellChangeUpColor(flashingCell, UpColor))
    };
}

export let FlashingCellsPopup = connect(mapStateToProps, mapDispatchToProps)(FlashingCellsPopupComponent);


