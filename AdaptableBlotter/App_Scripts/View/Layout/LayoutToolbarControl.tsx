/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { Provider, connect } from 'react-redux';
import { Form, Panel, FormControl, ControlLabel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ILayout } from '../../Core/Interface/ILayoutStrategy'
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'

interface LayoutToolbarControlComponentProps extends IStrategyViewPopupProps<LayoutToolbarControlComponent> {
    onLoadLayout: (layoutName: string) => LayoutRedux.LoadLayoutAction
    onSaveLayout: (layout: ILayout) => LayoutRedux.SaveLayoutAction,
    Columns: IColumn[],
    AvailableLayouts: ILayout[];
    CurrentLayout: string
}

class LayoutToolbarControlComponent extends React.Component<LayoutToolbarControlComponentProps, {}> {

    render(): any {

        let availableLayouts = this.props.AvailableLayouts.map((x, index) => {
            return <option value={x.Name} key={index}>{x.Name}</option>
        })

        return <Form className='navbar-form'>
            <Panel className="small-padding-panel" >
                 <FormControl componentClass="select" placeholder="select"
                    value={this.props.CurrentLayout}
                    onChange={(x) => this.onSelectedLayoutChanged(x)} >
                    {availableLayouts}
                </FormControl>

                {' '}
                <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Save a new Layout using the Blotter's current column order and visibility</Tooltip>}>
                    <Button bsSize='small' bsStyle='info' onClick={() => this.onSaveNewLayoutClicked()}>Save New Layout...</Button>
                </OverlayTrigger>

            </Panel>
        </Form>
    }

    private onSaveNewLayoutClicked() {
        let layoutName: string = prompt("Please enter a name for the new layout"); // TODO: use a nice form...
        if (StringExtensions.IsNotNullOrEmpty(layoutName)) {
            let newLayout: ILayout = { Name: layoutName, Columns: this.props.Columns.filter(c => c.Visible) };
            this.props.onSaveLayout(newLayout);
        }
    }

    private onSelectedLayoutChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onLoadLayout(e.value);
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentLayout: state.Layout.CurrentLayout,
        AvailableLayouts: state.Layout.AvailableLayouts,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onLoadLayout: (layoutName: string) => dispatch(LayoutRedux.LoadLayout(layoutName)),
        onSaveLayout: (layout: ILayout) => dispatch(LayoutRedux.SaveLayout(layout))
    };
}

export let LayoutToolbarControl = connect(mapStateToProps, mapDispatchToProps)(LayoutToolbarControlComponent);

var labelStyle = {
    marginRight: '3px'
};

