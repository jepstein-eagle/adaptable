"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const PanelWithRow_1 = require("../Components/Panels/PanelWithRow");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyProfile_1 = require("../Components/StrategyProfile");
const StyleVisualItem_1 = require("../Components/StyleVisualItem");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const Enums_1 = require("../../Core/Enums");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
class TeamSharingPopupComponent extends React.Component {
    componentDidMount() {
        this.props.onGetSharedItems();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__teamsharing";
        let infoBody = ["Team Sharing"];
        let colItems = [
            { Content: "Function", Size: 2 },
            { Content: "Audit", Size: 3 },
            { Content: "Details", Size: 6 },
            { Content: "", Size: 1 },
        ];
        let sharedItems = this.props.Entities.sort((a, b) => { return a.strategy < b.strategy ? -1 : 1; }).map((x, index) => {
            return React.createElement("li", { className: "list-group-item", key: index },
                React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { xs: 2 },
                        React.createElement(StrategyProfile_1.StrategyProfile, { cssClassName: cssClassName, StrategyId: x.strategy })),
                    React.createElement(react_bootstrap_1.Col, { xs: 3 },
                        x.user,
                        React.createElement("br", null),
                        x.timestamp.toLocaleString()),
                    React.createElement(react_bootstrap_1.Col, { xs: 6, style: { fontSize: 'small' } },
                        React.createElement(react_bootstrap_1.Panel, { bsStyle: "primary", className: "ab_small-padding-panel" }, this.getSharedItemDetails(x))),
                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                        React.createElement(react_bootstrap_1.OverlayTrigger, { overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipButton" }, "Import") },
                            React.createElement(react_bootstrap_1.Button, { onClick: () => this.props.onImportItem(x.entity, x.strategy) },
                                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "import" }))))));
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyIds.TeamSharingStrategyName, infoBody: infoBody, bsStyle: "primary", glyphicon: StrategyIds.TeamSharingGlyph },
                this.props.Entities.length == 0 ?
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" }, "Shared Items will appear here when available.")
                    : React.createElement(PanelWithRow_1.PanelWithRow, { cssClassName: cssClassName, colItems: colItems, bsStyle: "info" }),
                React.createElement(react_bootstrap_1.ListGroup, null, sharedItems)));
    }
    getSharedItemDetails(sharedEntity) {
        switch (sharedEntity.strategy) {
            case StrategyIds.CustomSortStrategyId: {
                let customSort = sharedEntity.entity;
                return React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { xs: 4 }, ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(customSort.ColumnId, this.props.Columns)),
                    React.createElement(react_bootstrap_1.Col, { xs: 8 }, customSort.SortedValues.join(', ')));
            }
            case StrategyIds.CalculatedColumnStrategyId: {
                let calcCol = sharedEntity.entity;
                return React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { xs: 4 }, calcCol.ColumnId),
                    React.createElement(react_bootstrap_1.Col, { xs: 8 }, calcCol.ColumnExpression));
            }
            case StrategyIds.CellValidationStrategyId: {
                let cellVal = sharedEntity.entity;
                return React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { xs: 4 }, ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(cellVal.ColumnId, this.props.Columns)),
                    React.createElement(react_bootstrap_1.Col, { xs: 4 }, cellVal.Description),
                    React.createElement(react_bootstrap_1.Col, { xs: 4 }, (ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(cellVal.Expression)) ?
                        ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(cellVal.Expression, this.props.Columns) :
                        "No Expression"));
            }
            case StrategyIds.ConditionalStyleStrategyId: {
                let cs = sharedEntity.entity;
                return React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { md: 4 }, cs.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column ?
                        ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(cs.ColumnId, this.props.Columns) :
                        "Whole Row"),
                    React.createElement(react_bootstrap_1.Col, { md: 3 },
                        React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: cs.Style })),
                    React.createElement(react_bootstrap_1.Col, { xs: 5 }, ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(cs.Expression, this.props.Columns)));
            }
            case StrategyIds.PlusMinusStrategyId: {
                let plusMinus = sharedEntity.entity;
                return React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { xs: 4 }, ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(plusMinus.ColumnId, this.props.Columns)),
                    React.createElement(react_bootstrap_1.Col, { xs: 3 }, plusMinus.NudgeValue.toString()),
                    React.createElement(react_bootstrap_1.Col, { xs: 5 }, ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(plusMinus.Expression, this.props.Columns)));
            }
            case StrategyIds.ShortcutStrategyId: {
                let shortcut = sharedEntity.entity;
                return React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { md: 4 }, shortcut.ColumnType),
                    React.createElement(react_bootstrap_1.Col, { md: 4 }, shortcut.ShortcutKey),
                    React.createElement(react_bootstrap_1.Col, { md: 4 }, shortcut.ShortcutResult));
            }
            case StrategyIds.UserFilterStrategyId: {
                let filter = sharedEntity.entity;
                let expressionString = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(filter.Expression, this.props.Columns);
                return React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { xs: 4 }, filter.Name),
                    React.createElement(react_bootstrap_1.Col, { xs: 8 }, expressionString));
            }
            case StrategyIds.AdvancedSearchStrategyId: {
                let search = sharedEntity.entity;
                let expressionString = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(search.Expression, this.props.Columns);
                return React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { xs: 4 }, search.Name),
                    React.createElement(react_bootstrap_1.Col, { xs: 8 }, expressionString));
            }
            case StrategyIds.LayoutStrategyId: {
                let layout = sharedEntity.entity;
                return React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { xs: 4 }, layout.Name),
                    React.createElement(react_bootstrap_1.Col, { xs: 8 }, layout.Columns.join(', ')));
            }
            case StrategyIds.FormatColumnStrategyId: {
                let fc = sharedEntity.entity;
                return React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { xs: 4 }, ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(fc.ColumnId, this.props.Columns)),
                    React.createElement(react_bootstrap_1.Col, { md: 8 },
                        React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: fc.Style })));
            }
            case StrategyIds.ExportStrategyId: {
                let range = sharedEntity.entity;
                let expressionString = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(range.Expression, this.props.Columns);
                return React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                    React.createElement(react_bootstrap_1.Col, { xs: 4 }, range.Name),
                    React.createElement(react_bootstrap_1.Col, { xs: 8 }, expressionString));
            }
            case StrategyIds.ColumnFilterStrategyId: {
                return "NEED TO DO  COLUMN FILTER"; // not sure actually
            }
            default:
                return "NOT IMPLEMENTED";
        }
    }
}
function mapStateToProps(state, ownProps) {
    return {
        Entities: state.TeamSharing.SharedEntities,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onGetSharedItems: () => dispatch(TeamSharingRedux.TeamSharingGet()),
        onImportItem: (entity, strategy) => dispatch(TeamSharingRedux.TeamSharingImportItem(entity, strategy))
    };
}
exports.TeamSharingPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TeamSharingPopupComponent);
