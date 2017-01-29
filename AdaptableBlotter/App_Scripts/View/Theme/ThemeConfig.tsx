/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Panel, Form, FormControl } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../PanelWithImage';


interface ThemeConfigProps extends IStrategyViewPopupProps<ThemeConfigComponent> {
    AvailableThemes: Array<string>;
    CurrentTheme: string;
    SetCurrentTheme: (newTheme: string) => ThemeRedux.SetCurrentThemeAction;
}

class ThemeConfigComponent extends React.Component<ThemeConfigProps, {}> {
    render() {
        let optionThemes = this.props.AvailableThemes.map(x => {
            return <option value={x} key={x}>{x}</option>
        })
        return (
            <PanelWithImage header="Theme" bsStyle="primary" glyphicon="leaf">
                <Form>
                    <FormControl componentClass="select" placeholder="select" value={this.props.CurrentTheme} onChange={(x) => this.onChangeTheme(x)} >
                        {optionThemes}
                    </FormControl>
                </Form>
            </PanelWithImage>
        );
    }

    onChangeTheme(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.SetCurrentTheme(e.value);
    }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AvailableThemes: state.Theme.AvailableThemes,
        CurrentTheme: state.Theme.CurrentTheme
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        SetCurrentTheme: (newTheme: string) => dispatch(ThemeRedux.SetCurrentTheme(newTheme))
    };
}

export let ThemeConfig = connect(mapStateToProps, mapDispatchToProps)(ThemeConfigComponent);
