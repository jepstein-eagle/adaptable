import { EditableConfigEntityState } from './Components/SharedProps/EditableConfigEntityState'
import { DataType, FontWeight, FontStyle, StatusColour, MessageType } from '../Utilities/Enums';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { IAdaptableBlotterOptions } from '../Api/Interface/IAdaptableBlotterOptions';
import { IStyle } from '../Api/Interface/IAdaptableBlotterObjects';
import { ExpressionBuilderPageState } from './ExpressionBuilder/ExpressionBuilderPage';
import { Expression } from '../Utilities/Expression';
import { SUCCESS_BSSTYLE, WARNING_BSSTYLE, DANGER_BSSTYLE, INFO_BSSTYLE } from '../Utilities/Constants/StyleConstants';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';


export module UIHelper {
    export function getDefaultColors(): string[] {
        return [
            "#000000", //  {/* black */}
            "#ffffff", //  {/* white */}
            "#C0C0C0", //  {/* light gray */}
            "#808080", //  {/* dark gray */}
            "#800000", //  {/* brown */}

            "#808000", //  {/* olive */}
            "#008000", //  {/* dark green */}
            "#00FF00", //  {/* light green */}
            "#FFFF00", //  {/* yellow */}
            "#FFFFCC", //  {/* pale yellow (quick search default) */}

            "#000080", //  {/* dark blue */}
            "#0000FF", //  {/* blue */}
            "#008080", //  {/* cyan */}
            "#00FFFF", //  {/* light blue */}
            "#FF00FF", //  {/* pink */}

            "#800080", //  {/* purple */}
            "#8B0000", //  {/* dark red */}
            "#FF0000", //  {/* red */}
            "#FF6961", //  {/* pastel red */}
            "#FFA500", //  {/* orange */}
        ]
    }

    export function getEmptyConfigState(): EditableConfigEntityState {
        return {
            EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1,
        }
    }


    export function getExpressionBuilderState(expression: Expression): ExpressionBuilderPageState {
        return {
            Expression: expression, SelectedColumnId: "", SelectedTab: null
        }
    }

    export function getExpressionBuilderStateWithColumn(expression: Expression, columnId: string): ExpressionBuilderPageState {
        return {
            Expression: expression, SelectedColumnId: columnId, SelectedTab: null
        }
    }

    export function getDescriptionForDataType(dataType: DataType) {
        switch (dataType) {
            case DataType.String:
                return "string"
            case DataType.Number:
                return "number"
            case DataType.Date:
                return "date"
        }
    }

    export function getPlaceHolderforDataType(dataType: DataType) {
        switch (dataType) {
            case DataType.String:
                return "Enter Value"
            case DataType.Number:
                return "Enter Number"
            case DataType.Date:
                return "Enter Date"
        }
    }


    export function getModalContainer(blotterOptions: IAdaptableBlotterOptions, document: Document): HTMLElement {
        let modalContainer: HTMLElement;
        if (blotterOptions.containerOptions.modalContainer) { // this has been set, so we use the property
            modalContainer = document.getElementById(blotterOptions.containerOptions.modalContainer)
            if (modalContainer) {
                const modalContainerClassName: string = " modal-container"
                if (!modalContainer.className.includes(modalContainerClassName)) {
                    modalContainer.className += modalContainerClassName;
                }
            }
        }
        if (!modalContainer) {
            modalContainer = document.body
        }
        return modalContainer;
    }

    export function getChartContainer(blotterOptions: IAdaptableBlotterOptions, document: Document, showModal: boolean): HTMLElement {
        let chartContainer: HTMLElement;
        if (StringExtensions.IsNotNullOrEmpty(blotterOptions.containerOptions.chartContainer)) { // they have provided one so get that
            chartContainer = document.getElementById(blotterOptions.containerOptions.chartContainer)
            if (chartContainer) {
                const chartContainerClassName: string = " chart-container"
                if (!chartContainer.className.includes(chartContainerClassName)) {
                    chartContainer.className += chartContainerClassName;
                }
            } else {
                LoggingHelper.LogError("Chart div name cannot be found: " + blotterOptions.containerOptions.chartContainer)
            }
        } else {  // not provided one so return whole document if modal, or 'chart' if not
            chartContainer = (showModal) ? document.body : document.getElementById("ad");
        }
        return chartContainer;
    }

    export function IsNotEmptyStyle(style: IStyle): boolean {
        return style.BackColor != null || style.ForeColor != null || style.FontWeight != FontWeight.Normal || style.FontStyle != FontStyle.Normal || style.FontSize != null || StringExtensions.IsNotNullOrEmpty(style.ClassName)

    }


    export function getMessageTypeByStatusColour(statusColour: StatusColour): MessageType {
        switch (statusColour) {
            case StatusColour.Red:
                return MessageType.Error;
            case StatusColour.Amber:
                return MessageType.Warning;
            case StatusColour.Green:
                return MessageType.Info;
        }
    }

    export function getStyleNameByStatusColour(statusColour: StatusColour): string {
        switch (statusColour) {
            case StatusColour.Red:
                return DANGER_BSSTYLE
            case StatusColour.Amber:
                return WARNING_BSSTYLE;
            case StatusColour.Green:
                return SUCCESS_BSSTYLE;
        }
    }

    export function getGlyphByMessageType(messageType: MessageType): string {
        switch (messageType) {
            case MessageType.Info:
                return "info-sign"
            case MessageType.Warning:
                return "warning-sign";
            case MessageType.Error:
                return "exclamation-sign";
        }
    }

    export function getStyleNameByMessageType(messageType: MessageType): string {
        switch (messageType) {
            case MessageType.Error:
                return DANGER_BSSTYLE;
            case MessageType.Warning:
                return WARNING_BSSTYLE;
            case MessageType.Info:
                return INFO_BSSTYLE;
        }
    }




}