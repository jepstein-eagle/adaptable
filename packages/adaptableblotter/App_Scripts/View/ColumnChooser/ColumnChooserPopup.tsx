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


interface ColumnChooserPopupProps extends StrategyViewPopupProps<ColumnChooserPopupComponent> {
    onNewColumnListOrder: (VisibleColumnList: IColumn[]) => ColumnChooserRedux.SetNewColumnListOrderAction
}

class ColumnChooserPopupComponent extends React.Component<ColumnChooserPopupProps, {}> {
    render() {
        let cssClassName: string = this.props.cssClassName + "__columnchooser";

        let infoBody: any[] = ["Move items between the 'Hidden Columns' and 'Visible Columns' listboxes to hide / show them.", <br />, <br />,
            "Use the buttons on the right of the 'Visible Columns' listbox to order them as required.", <br />, <br />,
            "All changes made while using the Column Chooser are implemented in the Blotter immediately."]

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.ColumnChooserStrategyName} bsStyle="primary" glyphicon={StrategyConstants.ColumnChooserGlyph} infoBody={infoBody}>
                <DualListBoxEditor AvailableValues={this.props.Columns.filter(x => !x.Visible).map(x => ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x))}
                    cssClassName={cssClassName}
                    SelectedValues={this.props.Columns.filter(x => x.Visible).map(x => ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x))}
                    HeaderAvailable="Hidden Columns"
                    HeaderSelected="Visible Columns"
                    onChange={(SelectedValues) => this.ColumnListChange(SelectedValues)}></DualListBoxEditor>
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
    };
}


function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onNewColumnListOrder: (VisibleColumnList: IColumn[]) => dispatch(ColumnChooserRedux.SetNewColumnListOrder(VisibleColumnList))
    };
}

export let ColumnChooserPopup = connect(mapStateToProps, mapDispatchToProps)(ColumnChooserPopupComponent);