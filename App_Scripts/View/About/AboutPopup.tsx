import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { AdaptableObjectRow } from "../Components/AdaptableObjectRow";
import { IColItem, KeyValuePair } from "../UIInterfaces";
import { PanelWithRow } from "../Components/Panels/PanelWithRow";
import { Helper } from "../../Core/Helpers/Helper";
import * as StyleConstants from '../../Core/Constants/StyleConstants';


interface AboutPopupComponentProps extends StrategyViewPopupProps<AboutPopupComponent> {
}



interface AboutState {
    KeyValuePairs: KeyValuePair[]
}

class AboutPopupComponent extends React.Component<AboutPopupComponentProps, AboutState> {

    constructor() {
        super();
        this.state = { KeyValuePairs: [] }
    }

    componentDidMount() {
        let keyValuePairs: KeyValuePair[] = []
        let paramItems: string[] = this.props.PopupParams.split("|");
        paramItems.forEach(y => {
            let paramItem: string[] = y.split(":")
            let keyValuePair: KeyValuePair = { Key: paramItem[0], Value: paramItem[1] }
            keyValuePairs.push(keyValuePair);
        })
        this.setState({ KeyValuePairs: keyValuePairs })
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__about";
        let colItems: IColItem[] = [
            { Content: "Property", Size: 6 },
            { Content: "Value", Size: 6 },
        ]

        let count = this.state.KeyValuePairs.length

        let aboutItems = this.state.KeyValuePairs.map((x, index) => {
            let rowColItems: IColItem[] = Helper.cloneObject(colItems)
            rowColItems[0].Content = x.Key
            rowColItems[1].Content = x.Value
            return <AdaptableObjectRow cssClassName={cssClassName} key={index} colItems={rowColItems} />
        })

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyNames.AboutStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.AboutGlyph}>
                <div className={this.props.cssClassName + StyleConstants.ITEMS_TABLE}>
                    <PanelWithRow cssClassName={cssClassName} colItems={colItems} bsStyle="info" />
                    <div className={cssClassName + StyleConstants.ITEMS_TABLE_BODY}>
                        {aboutItems}
                    </div>
                </div>
            </PanelWithImage>
        </div>
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

export let AboutPopup = connect(mapStateToProps, mapDispatchToProps)(AboutPopupComponent);

