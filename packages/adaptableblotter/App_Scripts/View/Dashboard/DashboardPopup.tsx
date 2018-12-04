import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { FormControl, ControlLabel } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { DualListBoxEditor } from "../Components/ListBox/DualListBoxEditor";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { IEntitlement } from "../../Api/Interface/Interfaces";


interface DashboardPopupProps extends StrategyViewPopupProps<DashboardPopupComponent> {
    AvailableToolbars: string[];
    VisibleToolbars: string[];
    Entitlements: IEntitlement[];
    Zoom: Number;
    onDashboardSetToolbars: (StrategyConstants: string[]) => DashboardRedux.DashboardSetToolbarsAction
    onSetDashboardZoom: (zoom: number) => DashboardRedux.DashboardSetZoomAction,
    onMoveControl: (strategyName: string, newIndex: number) => DashboardRedux.DashboardMoveItemAction
}
interface DashboardPopupState {
    CurrentDashboardPopup: string;
    EditedZoomFactor: Number;
}

class DashboardPopupComponent extends React.Component<DashboardPopupProps, DashboardPopupState> {
    constructor(props: DashboardPopupProps) {
        super(props)
        this.state = { CurrentDashboardPopup: "", EditedZoomFactor: props.Zoom }
    }
    render() {
        let cssClassName: string = this.props.cssClassName + "__dashboard";

        let availableToolbarNames: string[] = this.props.AvailableToolbars.filter(at=>this.isVisibleStrategy(at)).map(at => {
            return StrategyConstants.getNameForStrategyId(at)
        })

        let visibleToolbarNames: string[] = this.props.VisibleToolbars.filter(at=>this.isVisibleStrategy(at)).map(vt => {
            return StrategyConstants.getNameForStrategyId(vt)
        })

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText="Dashboard Toolbars" bsStyle="primary" glyphicon={StrategyConstants.FunctionsGlyph} className="ab_main_popup">

                <AdaptableBlotterForm inline >
                    <ControlLabel>Dashboard Zoom Factor : </ControlLabel>
                    {' '}
                    <FormControl value={this.state.EditedZoomFactor.toString()} type="number" min="0.5" step="0.05" max="1" placeholder="Enter a Number" onChange={(e) => this.onSetFactorChange(e)} />
                </AdaptableBlotterForm>
                {' '}
                <div><br /></div>

                <DualListBoxEditor AvailableValues={availableToolbarNames}
                    cssClassName={cssClassName}
                    SelectedValues={visibleToolbarNames}
                    HeaderAvailable="Available Toolbars"
                    HeaderSelected="Visible Toolbars"
                    onChange={(SelectedValues) => this.ListChange(SelectedValues)}
                    ReducedDisplay={true} />

            </PanelWithButton>
        </div>
    }

    isVisibleStrategy(strategyId: string): boolean {
        let entitlement: IEntitlement = this.props.Entitlements.find(x => x.FunctionName == strategyId);
        if (entitlement) {
            return entitlement.AccessLevel != "Hidden"
        }
        return true;
    }
    
    private ListChange(selectedValues: string[]) {
        let selectedColumnIds: string[] = selectedValues.map(sv => {
            return StrategyConstants.getIdForStrategyName(sv)
        })
        this.props.onDashboardSetToolbars(selectedColumnIds)
    }

    private onSetFactorChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        let factor = Number(e.value)
        if (factor > 1) {
            factor = 1
        }
        if (factor < 0.5 && factor != 0) {
            factor = 0.5
        }
        this.setState({ EditedZoomFactor: factor });
        if (factor != 0) {
            this.props.onSetDashboardZoom(factor);
        }
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AvailableToolbars: state.Dashboard.AvailableToolbars,
        VisibleToolbars: state.Dashboard.VisibleToolbars,
        Entitlements: state.Entitlements.FunctionEntitlements,
        Zoom: state.Dashboard.Zoom,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDashboardSetToolbars: (StrategyConstants: string[]) => dispatch(DashboardRedux.DashboardSetToolbars(StrategyConstants)),
        onSetDashboardZoom: (zoom: number) => dispatch(DashboardRedux.DashboardSetZoom(zoom)),
        onMoveControl: (controlName: string, NewIndex: number) => dispatch(DashboardRedux.DashboardMoveItem(controlName, NewIndex)),
    };
}

export let DashboardPopup = connect(mapStateToProps, mapDispatchToProps)(DashboardPopupComponent);
