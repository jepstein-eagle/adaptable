import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from "../UIInterfaces";
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { ILinkedColumn } from "../../Core/Interface/Interfaces";
import { ArrayExtensions } from "../../Core/Extensions/ArrayExtensions";

export interface ColumnChooserSummaryProps extends StrategySummaryProps<ColumnChooserSummaryComponent> {
    LinkedColumns: ILinkedColumn[]
}

export class ColumnChooserSummaryComponent extends React.Component<ColumnChooserSummaryProps, EditableConfigEntityState> {
    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__ColumnChoosers";
        //   alert("AccessLevel for chooser: " + this.props.AccessLevel)

        let linkedColumn: ILinkedColumn;
        this.props.LinkedColumns.forEach(lk => {
            if (ArrayExtensions.ContainsItem(lk.ColumnIds, this.props.SummarisedColumn.ColumnId)) {
                linkedColumn = lk;
            };
        });

        let colItems: IColItem[] = []
        colItems.push({ Size: 3, Content: <b>{'Linked Column'}</b> });
        colItems.push({ Size: 5, Content: linkedColumn ? linkedColumn.LinkedColumnId : "None" });
        colItems.push({ Size: 3, Content: null });

        return <AdaptableObjectRow cssClassName={cssWizardClassName} colItems={colItems} />
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        LinkedColumns: state.LinkedColumn.LinkedColumns,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
    };
}

export let ColumnChooserSummary = connect(mapStateToProps, mapDispatchToProps)(ColumnChooserSummaryComponent);
