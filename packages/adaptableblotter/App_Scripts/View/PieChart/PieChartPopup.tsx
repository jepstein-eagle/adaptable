import * as React from "react";
import * as Redux from "redux";
import * as _ from 'lodash'
import { connect } from 'react-redux';
import { FormControl, ControlLabel, Panel, FormGroup, Col, Checkbox, Row } from 'react-bootstrap';
import { LeafExpressionOperator, DisplayAction, MessageType, SelectionMode } from '../../Utilities/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as PieChartRedux from '../../Redux/ActionsReducers/PieChartRedux'
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ColorPicker } from '../ColorPicker';
import { AdaptablePopover } from '../AdaptablePopover';
import { AdaptableBlotterFormControlTextClear } from '../Components/Forms/AdaptableBlotterFormControlTextClear';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { IStyle } from "../../Utilities/Interface/IStyle";
import { QUICK_SEARCH_DEFAULT_BACK_COLOR, QUICK_SEARCH_DEFAULT_FORE_COLOR } from "../../Utilities/Constants/GeneralConstants";
import { PieChartComponent } from "./PieChartComponent";
import { IValueTotalCount } from "../UIInterfaces";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { ObjectFactory } from "../../Utilities/ObjectFactory";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { IColumn } from "../../Utilities/Interface/IColumn";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";

interface PieChartPopupProps extends StrategyViewPopupProps<PieChartPopupComponent> {
    PieChartText: string;

}

interface PieChartPopupState {
    SelectedColumnId: string
    //   ShowSelector: boolean
}

class PieChartPopupComponent extends React.Component<PieChartPopupProps, PieChartPopupState> {

    constructor(props: PieChartPopupProps) {
        super(props);
        this.state = {
            SelectedColumnId: ""
        }
    }


    componentDidMount() {

        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            //   let column = ColumnHelper.getColumnFromId(this.props.PopupParams, this.props.Columns);
            this.setState({ SelectedColumnId: this.props.PopupParams })
        }


    }




    render() {
        let cssClassName: string = this.props.cssClassName + "__PieChart";

        let infoBody: any[] = ["Run a simple text search across all visible cells in the Blotter.", <br />, <br />, "Use Quick Search Options to set search operator, behaviour and back colour (all automatically saved).", <br />, <br />, "For a more powerful, multi-column, saveable search with a wide range of options, use ", <i>Advanced Search</i>, "."]


        let pieChartData: any[] = (StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)) ?
            this.props.Blotter.ChartService.BuildPieChartData(this.state.SelectedColumnId)
            :
            []



        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.PieChartStrategyName} bsStyle="primary" glyphicon={StrategyConstants.PieChartGlyph} infoBody={infoBody}>

                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="searchName">
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
                    </FormGroup>

                </AdaptableBlotterForm>



                {ArrayExtensions.IsNotNullOrEmpty(pieChartData) &&
                    <PieChartComponent
                        PieData={pieChartData}
                        LabelMember={"ColumnValue"}
                        ValueMember={"ColumnCount"}
                        Width={450}
                        Height={450}
                    />
                }

            </PanelWithImage>
        </div>

    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : null })
    }

}



function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {


    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {

    };
}

export let PieChartPopup = connect(mapStateToProps, mapDispatchToProps)(PieChartPopupComponent);
