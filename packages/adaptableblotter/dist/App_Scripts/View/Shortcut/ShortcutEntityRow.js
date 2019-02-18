"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../Utilities/Enums");
const Enums_2 = require("../../Utilities/Enums");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
class ShortcutEntityRow extends React.Component {
    render() {
        let shortcut = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = shortcut.ColumnType == Enums_1.DataType.Date ? "Date" : "Numeric";
        colItems[1].Content =
            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true, key: shortcut.ShortcutKey },
                React.createElement(react_bootstrap_1.FormGroup, { controlId: shortcut.ShortcutKey },
                    React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", value: shortcut.ShortcutKey, onChange: (x) => this.onKeySelectChange(x) }, this.props.AvailableKeys.map(x => {
                        return React.createElement("option", { value: x, key: x }, x);
                    }))));
        colItems[2].Content =
            shortcut.ColumnType == Enums_1.DataType.Date ?
                "Replace Cell"
                :
                    React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", value: shortcut.ShortcutOperation, onChange: (x) => this.onActionChange(x) }, this.props.AvailableActions.map((shortcutOperation) => {
                        return React.createElement("option", { key: Enums_2.MathOperation[shortcutOperation], value: shortcutOperation }, Enums_2.MathOperation[shortcutOperation]);
                    }));
        colItems[3].Content =
            shortcut.IsDynamic ?
                shortcut.ShortcutResult :
                React.createElement(react_bootstrap_1.FormControl, { type: shortcut.ColumnType == Enums_1.DataType.Date ? "date" : "number", placeholder: "Shortcut Result", onChange: (e) => this.onResultChange(e), value: shortcut.ShortcutResult });
        colItems[4].Content =
            React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, showEdit: false, shareClick: () => this.props.onShare(), showShare: this.props.TeamSharingActivated, ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.ShortcutStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
    onResultChange(event) {
        let e = event.target;
        this.props.onChangeResult(this.props.AdaptableBlotterObject, e.value);
    }
    onKeySelectChange(event) {
        let e = event.target;
        this.props.onChangeKey(this.props.AdaptableBlotterObject, e.value);
    }
    onActionChange(event) {
        let e = event.target;
        this.props.onChangeOperation(this.props.AdaptableBlotterObject, e.value);
    }
}
exports.ShortcutEntityRow = ShortcutEntityRow;
