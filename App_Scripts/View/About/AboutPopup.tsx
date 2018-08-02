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
import * as AboutRedux from '../../Redux/ActionsReducers/AboutRedux'
import { AdaptableObjectCollection } from "../Components/AdaptableObjectCollection";


interface AboutPopupComponentProps extends StrategyViewPopupProps<AboutPopupComponent> {
    AboutInfo: KeyValuePair[],
    onAboutInfoCreate: () => AboutRedux.AboutInfoCreateAction;
}

interface AboutState {
    KeyValuePairs: KeyValuePair[]
}

class AboutPopupComponent extends React.Component<AboutPopupComponentProps, AboutState> {

    constructor(props: AboutPopupComponentProps) {
        super(props);
        this.state = { KeyValuePairs: [] }
    }

    componentDidMount() {
        this.props.onAboutInfoCreate();
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__about";
        let colItems: IColItem[] = [
            { Content: "Property", Size: 6 },
            { Content: "Value", Size: 6 },
        ]

        let aboutItems = this.props.AboutInfo.map((x, index) => {
            let rowColItems: IColItem[] = Helper.cloneObject(colItems)
            rowColItems[0].Content = x.Key
            rowColItems[1].Content = x.Value
            return <AdaptableObjectRow cssClassName={cssClassName} key={index} colItems={rowColItems} />
        })


        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyNames.AboutStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.AboutGlyph}>
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={aboutItems} />
            </PanelWithImage>
        </div>
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AboutInfo: state.About.AboutInfo,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAboutInfoCreate: () => dispatch(AboutRedux.AboutInfoCreate()),
    };
}

export let AboutPopup = connect(mapStateToProps, mapDispatchToProps)(AboutPopupComponent);

