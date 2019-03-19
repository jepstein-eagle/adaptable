import * as React from "react";
import { connect } from 'react-redux';
import { ControlLabel, FormGroup, Col, Row } from 'react-bootstrap';
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
    SelectedColumnId: string;
    ShowVisibleRowsOnly: boolean;
}

class PieChartPopupComponent extends React.Component<PieChartPopupProps, PieChartPopupState> {

    constructor(props: PieChartPopupProps) {
        super(props);
        this.state = {
            SelectedColumnId: "",
            ShowVisibleRowsOnly: false
        }
    }


    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            this.setState({ SelectedColumnId: this.props.PopupParams })
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__PieChart";

        let infoBody: any[] = ["See the count for each distinct value in the column as pie chart.", <br />, <br />, "There is an option to view as doughnut and to set the 'Others' threshold."]

        let pieChartData: any[] = (StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)) ?
            this.props.Blotter.ChartService.BuildPieChartData(this.state.SelectedColumnId, this.state.ShowVisibleRowsOnly) // do something around visible...
            :
            []

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.PieChartStrategyName} bsStyle="primary" glyphicon={StrategyConstants.PieChartGlyph} infoBody={infoBody}>

                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="pieChartSettings" style={{ marginBottom: '0px' }}>
                        <Row>
                            <Col xs={1}>{' '} </Col>
                            <Col xs={3}><ControlLabel>Selected Column</ControlLabel></Col>
                            <Col xs={6} >
                                <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.state.SelectedColumnId]}
                                    ColumnList={this.props.Columns}
                                    onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                                    SelectionMode={SelectionMode.Single} />
                            </Col>
                            <Col xs={2}>{' '} </Col>
                        </Row>
                        {ArrayExtensions.IsNotNullOrEmpty(pieChartData) &&
                            <Row>
                                <PieChartComponent
                                    PieData={pieChartData}
                                    LabelMember={"ColumnValue"}
                                    ValueMember={"ColumnCount"}
                                    Width={500}
                                    Height={500}
                                    ShowVisibleRows={this.state.ShowVisibleRowsOnly}
                                    showAllClick={() => this.onShowAllClick()}
                                    showVisibleClick={() => this.onShowVisibleClick()}
                                />
                            </Row>
                        }
                    </FormGroup>

                </AdaptableBlotterForm>
            </PanelWithImage>
        </div>
    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : null })
    }

    private onShowVisibleClick() {
        this.setState({ ShowVisibleRowsOnly: true })
    }

    private onShowAllClick() {
        this.setState({ ShowVisibleRowsOnly: false })
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
