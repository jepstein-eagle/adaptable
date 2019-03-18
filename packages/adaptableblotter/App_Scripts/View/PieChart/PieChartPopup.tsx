import * as React from "react";
import * as Redux from "redux";
import * as _ from 'lodash'
import { connect } from 'react-redux';
import { ControlLabel, FormGroup, Col, Row, Radio } from 'react-bootstrap';
import { SelectionMode } from '../../Utilities/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { PieChartComponent } from "./PieChartComponent";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { IColumn } from "../../Utilities/Interface/IColumn";

interface PieChartPopupProps extends StrategyViewPopupProps<PieChartPopupComponent> {
    PieChartText: string;

}

interface PieChartPopupState {
    SelectedColumnId: string
    ShowVisibleOnly: boolean
}

class PieChartPopupComponent extends React.Component<PieChartPopupProps, PieChartPopupState> {

    constructor(props: PieChartPopupProps) {
        super(props);
        this.state = {
            SelectedColumnId: "", ShowVisibleOnly: false
        }
    }


    componentDidMount() {

        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            this.setState({ SelectedColumnId: this.props.PopupParams })
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__PieChart";

        let infoBody: any[] = ["Run a simple text search across all visible cells in the Blotter.", <br />, <br />, "Use Quick Search Options to set search operator, behaviour and back colour (all automatically saved).", <br />, <br />, "For a more powerful, multi-column, saveable search with a wide range of options, use ", <i>Advanced Search</i>, "."]

        let pieChartData: any[] = (StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)) ?
            this.props.Blotter.ChartService.BuildPieChartData(this.state.SelectedColumnId, this.state.ShowVisibleOnly)
            :
            []

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.PieChartStrategyName} bsStyle="primary" glyphicon={StrategyConstants.PieChartGlyph} infoBody={infoBody}>

                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="pieChartSettings">
                        <Row>
                            <Col xs={2} componentClass={ControlLabel}>Column: </Col>

                            <Col xs={8} >
                                <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.state.SelectedColumnId]}
                                    ColumnList={this.props.Columns}
                                    onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                                    SelectionMode={SelectionMode.Single} />
                            </Col>
                            <Col xs={2}>{' '} </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col xs={2} />
                            <Col xs={10} >
                                <Radio inline value="AllRows" checked={this.state.ShowVisibleOnly == false} onChange={(e) => this.onShowGridPropertiesChanged(e)}>All Rows</Radio>
                                <Radio inline value="VisibleRowsOnly" checked={this.state.ShowVisibleOnly == true} onChange={(e) => this.onShowGridPropertiesChanged(e)}>Visible Rows Only</Radio>
                            </Col>
                        </Row>
                    </FormGroup>

                </AdaptableBlotterForm>



                {ArrayExtensions.IsNotNullOrEmpty(pieChartData) &&
                    <PieChartComponent
                        PieData={pieChartData}
                        LabelMember={"ColumnValue"}
                        ValueMember={"ColumnCount"}
                        Width={400}
                        Height={400}
                    />
                }

            </PanelWithImage>
        </div>

    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : null })
    }

    private onShowGridPropertiesChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShowVisibleOnly: (e.value == "VisibleRowsOnly") } as PieChartPopupState)
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {


    };
}

function mapDispatchToProps() {
    return {

    };
}

export let PieChartPopup = connect(mapStateToProps, mapDispatchToProps)(PieChartPopupComponent);
