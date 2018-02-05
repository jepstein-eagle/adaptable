import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import {  FormControl, ControlLabel, Col, FormGroup } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'

interface ThemePopupProps extends IStrategyViewPopupProps<ThemePopupComponent> {
    AvailableThemes: Array<string>;
    CurrentTheme: string;
    SelectTheme: (newTheme: string) => ThemeRedux.ThemeSelectAction;
}

class ThemePopupComponent extends React.Component<ThemePopupProps, {}> {
    render() {
        let infoBody: any[] = ["Choose a theme to change the look & feel of the Adaptable Blotter screens.", <br />, <br />, "Select ", <i>None</i>, " if you prefer to upload your own custom theme or ", <i>Default</i>, " to use the standard Bootstrap theme."]

        let optionThemes = this.props.AvailableThemes.map(x => {
            return <option value={x} key={x}>{x}</option>
        })
        return (
            <PanelWithButton headerText={StrategyNames.ThemeStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.ThemeGlyph} infoBody={infoBody}>
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="themepicker">
                        <Col xs={2} >
                            <ControlLabel >Current</ControlLabel>
                        </Col>
                        <Col xs={7}>
                            <FormControl componentClass="select" placeholder="select" value={this.props.CurrentTheme} onChange={(x) => this.onChangeTheme(x)} >
                                {optionThemes}
                            </FormControl>
                        </Col>
                    </FormGroup>
                </AdaptableBlotterForm>
            </PanelWithButton>
        );
    }

    onChangeTheme(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.SelectTheme(e.value);
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
        SelectTheme: (newTheme: string) => dispatch(ThemeRedux.ThemeSelect(newTheme))
    };
}

export let ThemePopup = connect(mapStateToProps, mapDispatchToProps)(ThemePopupComponent);
