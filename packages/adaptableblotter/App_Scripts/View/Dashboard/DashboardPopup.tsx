import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { FormControl, ControlLabel } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { DualListBoxEditor } from "../Components/ListBox/DualListBoxEditor";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";


interface DashboardPopupProps extends StrategyViewPopupProps<DashboardPopupComponent> {
    AvailableToolbars: Array<string>;
    VisibleToolbars: Array<string>;
    Zoom: Number;
    onDashboardSetToolbars: (strategyIds: string[]) => DashboardRedux.DashboardSetToolbarsAction
    onSetDashboardZoom: (zoom: number) => DashboardRedux.DashboardSetZoomAction,
    onMoveControl: (strategyName: string, newIndex: number) => DashboardRedux.DashboardMoveItemAction
}
interface DashboardPopupState {
    CurrentDashboardPopup: string;
    EditedZoomFactor: Number;
}

class DashboardPopupComponent extends React.Component<DashboardPopupProps, DashboardPopupState> {
    private placeholder: HTMLButtonElement
    constructor(props: DashboardPopupProps) {
        super(props)
        this.state = { CurrentDashboardPopup: "", EditedZoomFactor: props.Zoom }
    }
    render() {
        let cssClassName: string = this.props.cssClassName + "__dashboard";

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText="Dashboard Toolbars" bsStyle="primary" glyphicon={StrategyIds.FunctionsGlyph} className="ab_main_popup">

                <AdaptableBlotterForm inline >
                    <ControlLabel>Dashboard Zoom Factor : </ControlLabel>
                    {' '}
                    <FormControl value={this.state.EditedZoomFactor.toString()} type="number" min="0.5" step="0.05" max="1" placeholder="Enter a Number" onChange={(e) => this.onSetFactorChange(e)} />
                </AdaptableBlotterForm>
                {' '}
                <div><br /></div>

                <DualListBoxEditor AvailableValues={this.props.AvailableToolbars}
                    cssClassName={cssClassName}
                    SelectedValues={this.props.VisibleToolbars}
                    HeaderAvailable="Available Toolbars"
                    HeaderSelected="Visible Toolbars"
                    onChange={(SelectedValues) => this.ListChange(SelectedValues)}
                    ReducedDisplay={true} />

            </PanelWithButton>
        </div>

    }

    private ListChange(selectedValues: string[]) {
        this.props.onDashboardSetToolbars(selectedValues)
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
        Zoom: state.Dashboard.Zoom,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDashboardSetToolbars: (strategyIds: string[]) => dispatch(DashboardRedux.DashboardSetToolbars(strategyIds)),
        onSetDashboardZoom: (zoom: number) => dispatch(DashboardRedux.DashboardSetZoom(zoom)),
        onMoveControl: (controlName: string, NewIndex: number) => dispatch(DashboardRedux.DashboardMoveItem(controlName, NewIndex)),
    };
}

export let DashboardPopup = connect(mapStateToProps, mapDispatchToProps)(DashboardPopupComponent);
