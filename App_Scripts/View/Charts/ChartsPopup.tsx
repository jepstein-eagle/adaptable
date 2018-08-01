import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { IgrCategoryChart } from 'igniteui-react-charts/ES2015/igr-category-chart';
import { IgrCategoryChartModule } from 'igniteui-react-charts/ES2015/igr-category-chart-module';


interface ChartsPopupComponentProps extends StrategyViewPopupProps<ChartsPopupComponent> {
    Charts: string[]
}

interface ChartsState {
    name: string;
    data: any[]
}

class ChartsPopupComponent extends React.Component<ChartsPopupComponentProps, ChartsState> {

    constructor() {
        super();

        // this line is commented out as we cannot run it otherwise...
        //      IgrCategoryChartModule.register();
        this.state = {
            name: 'React',
            data: [
                { Label: "A", Value: 5, Value2: 4 },
                { Label: "B", Value: 8, Value2: 2 },
                { Label: "C", Value: 2, Value2: 3 },
                { Label: "D", Value: 4, Value2: 4 },
                { Label: "E", Value: 5, Value2: 5 },
                { Label: "F", Value: 6, Value2: 4 },
                { Label: "G", Value: 3, Value2: 4 }
            ]
        };

    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__Charts";

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyNames.ChartsStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.ChartsGlyph}>

                <span>This functionality is coming soon...</span>

            </PanelWithImage>
        </div>
    }

    /*
    <IgrCategoryChart
                    yAxisMinimumValue={0}
                    chartTitle="test"
                    width="500px"
                    height="500px"
                    dataSource={this.state.data} />
                    */
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Charts: state.Charts.Charts,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        // onChartsInfoCreate: () => dispatch(ChartsRedux.ChartsInfoCreate()),
    };
}

export let ChartsPopup = connect(mapStateToProps, mapDispatchToProps)(ChartsPopupComponent);

