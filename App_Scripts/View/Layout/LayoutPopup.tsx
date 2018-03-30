import * as React from "react";
import * as Redux from "redux";
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { connect } from 'react-redux';
import { FormControl, Panel, FormGroup, ControlLabel, Row, Col, HelpBlock, Grid } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy'
import { IColumn } from '../../Core/Interface/IColumn';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { Helper } from '../../Core/Helpers/Helper';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonShare } from "../Components/Buttons/ButtonShare";
import { IAdaptableBlotterObject, IGridSort } from "../../Core/Interface/Interfaces";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { IColItem } from "../UIInterfaces";
import { LayoutEntityRow } from "./LayoutEntityRow";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { AdaptableObjectCollection } from "../Components/AdaptableObjectCollection";

interface LayoutPopupProps extends StrategyViewPopupProps<LayoutPopupComponent> {
    Layouts: ILayout[];
    CurrentLayout: string;
    GridSort: IGridSort;
    onLoadLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction;
    onSaveLayout: (columns: string[], GgidSort: IGridSort, layoutName: string) => LayoutRedux.LayoutAddAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

interface LayoutPopupState {
    NewLayoutName: string,
    ErrorMessage: string
}

class LayoutPopupComponent extends React.Component<LayoutPopupProps, LayoutPopupState> {
    constructor() {
        super();
        this.state = {
            NewLayoutName: "",
            ErrorMessage: null
        }
    }

    render() {
        let infoBody: any[] = ["Use layouts to create and manage multiple named, sets of ordered columns", <br />, <br />, "To change a layout choose an item from the dropdown (you can also use the dropdown in the layout toolbar)", <br />, <br />, "To create a new layout, enter a name in the 'Save As New Layout' textbox."]

        let colItems: IColItem[] = [
            { Content: "Current", Size: 1 },
            { Content: "Name", Size: 2 },
            { Content: "Description", Size: 7 },
            { Content: "", Size: 2 },
        ]

        let layoutRows = this.props.Layouts.map((x, index) => {
            return <LayoutEntityRow
                key={index}
                ColItems={colItems}
                IsCurrentLayout={x.Name == this.props.CurrentLayout}
                AdaptableBlotterObject={x}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={null}
                onShare={() => this.props.onShare(x)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={LayoutRedux.LayoutDelete(x.Name)}
                onSelect={() => this.onSelectLayout(x.Name)}
            >
            </LayoutEntityRow>
        })

        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";

        return <div className="adaptable_blotter_style_popup_advancedsearch">


            <PanelWithImage bsStyle="primary" header={StrategyNames.LayoutStrategyName} infoBody={infoBody}
                glyphicon={StrategyGlyphs.LayoutGlyph} className="adaptableblotter_modal_main_popup" >
                    <AdaptableBlotterForm horizontal>
                        <Row>
                            <Col xs={12} >
                                <HelpBlock>
                                    Enter a name and then click 'Save' in order to create a new layout; this will contain the Blotter's current column order and sort.
                                </HelpBlock>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} >
                                <ControlLabel >Name</ControlLabel>
                            </Col>
                            <Col xs={6}>
                                <FormGroup controlId="formInlineName" validationState={validationState}>
                                    <FormControl type="text" placeholder="Enter a Layout Name" onChange={(e) => this.onSaveLayoutNameChanged(e)} />
                                    <FormControl.Feedback />
                                    <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={4}>
                                <ButtonSave onClick={() => this.onSaveLayoutClicked()}
                                    overrideDisableButton={StringExtensions.IsNullOrEmpty(this.state.NewLayoutName) || StringExtensions.IsNotNullOrEmpty(this.state.ErrorMessage)}
                                    DisplayMode="Glyph+Text" />
                            </Col>
                        </Row>
                    </AdaptableBlotterForm>
                 <AdaptableObjectCollection ColItems={colItems} items={layoutRows} reducedPanel={true} />
            </PanelWithImage>
        </div>
    }

    private onSelectLayout(layout: string) {
        this.props.onLoadLayout(layout);
    }

    private onSaveLayoutNameChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            NewLayoutName: e.value,
            ErrorMessage: this.props.Layouts.findIndex(x => x.Name == e.value) > -1 ? "A Layout already exists with that name" : null
        });
    }

    private onSaveLayoutClicked() {
        let layoutName: string = this.state.NewLayoutName;
        this.setState({ NewLayoutName: "" });
        this.props.onSaveLayout(this.props.Columns.filter(c => c.Visible).map(x => x.ColumnId), this.props.GridSort, layoutName);
        this.setState({ NewLayoutName: "" });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Layouts: state.Layout.AvailableLayouts,
        CurrentLayout: state.Layout.CurrentLayout,
        GridSort: state.Grid.GridSort
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onLoadLayout: (layoutName: string) => dispatch(LayoutRedux.LayoutSelect(layoutName)),
        onSaveLayout: (Columns: string[], GridSort: IGridSort, LayoutName: string) => dispatch(LayoutRedux.LayoutAdd(Columns, GridSort, LayoutName)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.LayoutStrategyId))
    };
}

export let LayoutPopup = connect(mapStateToProps, mapDispatchToProps)(LayoutPopupComponent);
