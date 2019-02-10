"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
class ExpressionBuilderUserFilter extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__queryuserfilters";
        var systemFilterNames = this.props.AvailableSystemFilterNames.map((sf, index) => {
            return React.createElement(react_bootstrap_1.ListGroupItem, { key: index, bsSize: "xsmall", onClick: () => this.onClickColum(sf), active: this.props.SelectedFilterNames.find(f => f == sf) }, sf);
        });
        var userFilterNames = this.props.AvailableUserFilterNames.map((uf, index) => {
            return React.createElement(react_bootstrap_1.ListGroupItem, { key: index, bsSize: "xsmall", onClick: () => this.onClickColum(uf), active: this.props.SelectedFilterNames.find(f => f == uf) },
                React.createElement("i", null, uf));
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { className: "ab_no-padding-anywhere-panel", style: divStyle },
                React.createElement(react_bootstrap_1.ListGroup, null,
                    systemFilterNames,
                    userFilterNames)));
    }
    onClickColum(filterName) {
        let newArray = [];
        let existingUserFilterExpression = this.props.SelectedFilterNames.find(f => f == filterName);
        if (existingUserFilterExpression != null) { // it exists
            let index = this.props.SelectedFilterNames.indexOf(existingUserFilterExpression);
            newArray = [...this.props.SelectedFilterNames];
            newArray.splice(index, 1);
        }
        else {
            newArray = [...this.props.SelectedFilterNames];
            newArray.push(filterName);
        }
        this.props.onFilterNameChange(newArray);
    }
}
exports.ExpressionBuilderUserFilter = ExpressionBuilderUserFilter;
let divStyle = {
    'overflowY': 'auto',
    'height': '350px',
};
