import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Core/Interface/IColumn';
import * as ColumnChooserRedux from '../../Redux/ActionsReducers/ColumnChooserRedux'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { DualListBoxEditor } from "../Components/ListBox/DualListBoxEditor";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";
import { IColumnCategory, IMasterChildren } from "../../Core/Interface/Interfaces";
import { ArrayExtensions } from "../../Core/Extensions/ArrayExtensions";


interface ColumnChooserPopupProps extends StrategyViewPopupProps<ColumnChooserPopupComponent> {
    onNewColumnListOrder: (VisibleColumnList: IColumn[]) => ColumnChooserRedux.SetNewColumnListOrderAction
    ColumnCategories: Array<IColumnCategory>
}

class ColumnChooserPopupComponent extends React.Component<ColumnChooserPopupProps, {}> {
    render() {
       alert("I order this again")
        let cssClassName: string = this.props.cssClassName + "__columnchooser";
        let availableValues: any[]
        let selectedValues: any[]
       let isMasterChild = ArrayExtensions.IsNotEmpty(this.props.ColumnCategories);
         if (isMasterChild) {
            let test: IMasterChildren[] = this.props.ColumnCategories.map(cc => {
                return {
                    Master: cc.Category,
                    Children: cc.ColumnIds.map(ci => ColumnHelper.getFriendlyNameFromColumnId(ci, this.props.Columns))
                }
            })
            console.log(test);

            availableValues = this.props.Columns.filter(x => !x.Visible).map(x => ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x));
            selectedValues = this.props.Columns.filter(x => x.Visible).map(x => ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x))
        } else {
            availableValues = this.props.Columns.filter(x => !x.Visible).map(x => ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x));
            selectedValues = this.props.Columns.filter(x => x.Visible).map(x => ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x))
        }

        let infoBody: any[] = ["Move items between the 'Hidden Columns' and 'Visible Columns' listboxes to hide / show them.", <br />, <br />,
            "Use the buttons on the right of the 'Visible Columns' listbox to order them as required.", <br />, <br />,
            "All changes made while using the Column Chooser are implemented in the Blotter immediately."]

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.ColumnChooserStrategyName} bsStyle="primary" glyphicon={StrategyConstants.ColumnChooserGlyph} infoBody={infoBody}>
                <DualListBoxEditor AvailableValues={availableValues}
                    cssClassName={cssClassName}
                    SelectedValues={selectedValues}
                    HeaderAvailable="Hidden Columns"
                    HeaderSelected="Visible Columns"
                    onChange={(SelectedValues) => this.ColumnListChange(SelectedValues)}>
                </DualListBoxEditor>
            </PanelWithImage>
        </div>
    }

    private ColumnListChange(columnList: Array<string>) {
        let cols: IColumn[] = ColumnHelper.getColumnsFromFriendlyNames(columnList, this.props.Columns)
        this.props.onNewColumnListOrder(cols)
    }
}


function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ColumnCategories: state.UserInterface.ColumnCategories,
    };
}


function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onNewColumnListOrder: (VisibleColumnList: IColumn[]) => dispatch(ColumnChooserRedux.SetNewColumnListOrder(VisibleColumnList))
    };
}

export let ColumnChooserPopup = connect(mapStateToProps, mapDispatchToProps)(ColumnChooserPopupComponent);