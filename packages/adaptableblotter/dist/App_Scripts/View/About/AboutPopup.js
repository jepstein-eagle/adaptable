"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const Helper_1 = require("../../Core/Helpers/Helper");
const AboutRedux = require("../../Redux/ActionsReducers/AboutRedux");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
class AboutPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { KeyValuePairs: [] };
    }
    componentDidMount() {
        this.props.onAboutInfoCreate();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__about";
        let colItems = [
            { Content: "Property", Size: 6 },
            { Content: "Value", Size: 6 },
        ];
        let aboutItems = this.props.AboutInfo.map((x, index) => {
            let rowColItems = Helper_1.Helper.cloneObject(colItems);
            rowColItems[0].Content = x.Key;
            rowColItems[1].Content = x.Value;
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: cssClassName, key: index, colItems: rowColItems });
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyIds.AboutStrategyName, bsStyle: "primary", glyphicon: StrategyIds.AboutGlyph },
                React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: aboutItems })));
    }
}
function mapStateToProps(state, ownProps) {
    return {
        AboutInfo: state.About.AboutInfo,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAboutInfoCreate: () => dispatch(AboutRedux.AboutInfoCreate()),
    };
}
exports.AboutPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AboutPopupComponent);
