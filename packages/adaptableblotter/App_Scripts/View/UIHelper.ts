import { CSSProperties } from 'react';
import {
  EditableConfigEntityState,
  WizardStatus,
} from './Components/SharedProps/EditableConfigEntityState';
import {
  DataType,
  FontWeight,
  FontStyle,
  StatusColour,
  MessageType,
  DayOfWeek,
} from '../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { IStyle } from '../PredefinedConfig/Common/IStyle';
import { ExpressionBuilderPageState } from './ExpressionBuilder/ExpressionBuilderPage';
import { Expression } from '../PredefinedConfig/Common/Expression';

import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { Schedule } from '../PredefinedConfig/Common/Schedule';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import ExpressionHelper from '../Utilities/Helpers/ExpressionHelper';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { AdaptableOptions } from '../types';

export const BLACK: string = 'Black';
export const WHITE: string = 'White';
export const LIGHT_GRAY: string = 'LightGray';
export const GRAY: string = 'Gray';
export const BROWN: string = 'Brown';

export const DARK_GREEN: string = 'DarkGreen';
export const GREEN: string = 'Green';
export const LIME_GREEN: string = 'LimeGreen';
export const YELLOW: string = 'Yellow';
export const LIGHT_YELLOW: string = 'LightYellow';

export const DARK_BLUE: string = 'DarkBlue';
export const BLUE: string = 'Blue';
export const LIGHT_BLUE: string = 'LightBlue';
//xport const LIGHT_GREEN: string = 'LightGreen';
export const CYAN: string = 'Cyan';
export const MAGENTA: string = 'Magenta';

export const PURPLE: string = 'Purple';
export const DARK_RED: string = 'DarkRed';
export const RED: string = 'Red';
export const LIGHT_RED: string = 'LightRed';
export const ORANGE: string = 'Orange';

export function getHexForName(name: string): string {
  switch (name) {
    case BLACK:
      return '#000000';
    case WHITE:
      return '#FFFFFF';
    case LIGHT_GRAY:
      return '#D3D3D3';
    case GRAY:
      return '#808080';
    case BROWN:
      return '#A52A2A';
    case DARK_GREEN:
      return '#006400';
    case GREEN:
      return '#008000';
    case LIME_GREEN:
      return '#32CD32';
    case YELLOW:
      return '#FFFF00';
    case LIGHT_YELLOW:
      return '#FFFFE0';
    case DARK_BLUE:
      return '#00008B';
    case BLUE:
      return '#0000FF';
    case LIGHT_BLUE:
      return '#87CEFA';
    case CYAN:
      return '#00FFFF';
    case MAGENTA:
      return '#FF00FF';
    case PURPLE:
      return '#800080';
    case DARK_RED:
      return '#8B0000';
    case RED:
      return '#FF0000';
    case LIGHT_RED:
      return '#DC143C';
    case ORANGE:
      return '#FFA500';
    default:
      return 'not found';
  }
}

export function getDefaultColors(): string[] {
  return [
    getHexForName(BLACK),
    getHexForName(WHITE),
    getHexForName(LIGHT_GRAY),
    getHexForName(GRAY),
    getHexForName(BROWN),

    getHexForName(DARK_GREEN),
    getHexForName(GREEN),
    getHexForName(LIME_GREEN),
    getHexForName(YELLOW),
    getHexForName(LIGHT_YELLOW), //  (quick search default)

    getHexForName(DARK_BLUE),
    getHexForName(BLUE),
    getHexForName(LIGHT_BLUE),
    getHexForName(CYAN),
    getHexForName(MAGENTA),

    getHexForName(PURPLE),
    getHexForName(DARK_RED),
    getHexForName(RED),
    getHexForName(LIGHT_RED),
    getHexForName(ORANGE),
  ];
}

export function getEmptyConfigState(): EditableConfigEntityState {
  return {
    EditedAdaptableObject: null,
    WizardStartIndex: 0,
    WizardStatus: WizardStatus.None,
  };
}

export function getExpressionBuilderState(expression: Expression): ExpressionBuilderPageState {
  // add any missing arrays here to avoid issues later
  ExpressionHelper.AddMissingProperties(expression);

  return {
    Expression: expression,
    SelectedColumnId: '',
    SelectedTab: null,
  };
}

export function getExpressionBuilderStateWithColumn(
  expression: Expression,
  columnId: string
): ExpressionBuilderPageState {
  return {
    Expression: expression,
    SelectedColumnId: columnId,
    SelectedTab: null,
  };
}

export function getDescriptionForDataType(dataType: DataType) {
  switch (dataType) {
    case DataType.String:
      return 'string';
    case DataType.Number:
      return 'number';
    case DataType.Date:
      return 'date';
  }
}

export function getPlaceHolderforDataType(dataType: DataType) {
  switch (dataType) {
    case DataType.String:
      return 'Enter Value';
    case DataType.Number:
      return 'Enter Number';
    case DataType.Date:
      return 'Enter Date';
  }
}

export function getModalContainer(
  blotterOptions: AdaptableOptions,
  document: Document
): HTMLElement {
  let modalContainer: HTMLElement;
  if (blotterOptions.containerOptions.modalContainer) {
    // this has been set, so we use the property
    modalContainer = document.getElementById(blotterOptions.containerOptions.modalContainer);
    if (modalContainer) {
      const modalContainerClassName: string = ' modal-container';
      if (!modalContainer.className.includes(modalContainerClassName)) {
        modalContainer.className += modalContainerClassName;
      }
    }
  }
  if (!modalContainer) {
    modalContainer = document.body;
  }
  return modalContainer;
}

export function getChartContainer(
  blotterOptions: AdaptableOptions,
  document: Document,
  showModal: boolean
): HTMLElement {
  let chartContainer: HTMLElement;
  if (StringExtensions.IsNotNullOrEmpty(blotterOptions.containerOptions.chartContainer)) {
    // they have provided one so get that
    chartContainer = document.getElementById(blotterOptions.containerOptions.chartContainer);
    if (chartContainer) {
      const chartContainerClassName: string = ' chart-container';
      if (!chartContainer.className.includes(chartContainerClassName)) {
        chartContainer.className += chartContainerClassName;
      }
    } else {
      LoggingHelper.LogAdaptableError(
        `Chart div called '${blotterOptions.containerOptions.chartContainer}' not found: so creating standard div`
      );
      chartContainer = document.getElementById('ad');
    }
  } else {
    // not provided one so return whole document if modal, or 'chart' if not
    chartContainer = showModal ? document.body : document.getElementById('ad');
  }
  return chartContainer;
}

export function isValidUserChartContainer(
  blotterOptions: AdaptableOptions,
  document: Document
): boolean {
  if (StringExtensions.IsNotNullOrEmpty(blotterOptions.containerOptions.chartContainer)) {
    return document.getElementById(blotterOptions.containerOptions.chartContainer) != null;
  }
  return false;
}

export function IsNotEmptyStyle(style: IStyle): boolean {
  return (
    style.BackColor != null ||
    style.ForeColor != null ||
    style.FontWeight != FontWeight.Normal ||
    style.FontStyle != FontStyle.Normal ||
    style.FontSize != null ||
    StringExtensions.IsNotNullOrEmpty(style.ClassName)
  );
}

export function getMessageTypeByStatusColour(statusColour: StatusColour): MessageType {
  switch (statusColour) {
    case StatusColour.Red:
      return MessageType.Error;
    case StatusColour.Amber:
      return MessageType.Warning;
    case StatusColour.Green:
      return MessageType.Success;
    case StatusColour.Blue:
      return MessageType.Info;
  }
}

export function getGlyphByMessageType(messageType: MessageType): string {
  switch (messageType) {
    case MessageType.Info:
      return 'info';
    case MessageType.Success:
      return 'check';
    case MessageType.Warning:
      return 'warning';
    case MessageType.Error:
      return 'error';
  }
}

export function getColorByMessageType(messageType: MessageType): string {
  switch (messageType) {
    case MessageType.Error:
      return 'var(--ab-color-error)';
    case MessageType.Warning:
      return 'var(--ab-color-warn)';
    case MessageType.Success:
      return 'var(--ab-color-success)';
    case MessageType.Info:
      return 'var(--ab-color-info)';
  }
}

export function getStyleForStatusColour(statusColour: StatusColour): CSSProperties {
  let result: any;

  switch (statusColour) {
    case StatusColour.Blue:
      result = {
        fill: 'var(--ab-color-info)',
      };
      break;
    case StatusColour.Green:
      result = {
        fill: 'var(--ab-color-success)',
      };
      break;
    case StatusColour.Amber:
      result = {
        fill: 'var(--ab-color-warn)',
      };
      break;
    case StatusColour.Red:
      result = {
        fill: 'var(--ab-color-error)',
      };
      break;
  }
  if (result) {
    result.color = result.fill;
  }
  return result;
}

export function getStyleForMessageType(messageType: MessageType): CSSProperties {
  let result: any;

  switch (messageType) {
    case MessageType.Info:
      result = {
        fill: 'var(--ab-color-info)',
      };
      break;
    case MessageType.Success:
      result = {
        fill: 'var(--ab-color-success)',
      };
      break;
    case MessageType.Warning:
      result = {
        fill: 'var(--ab-color-warn)',
      };
      break;
    case MessageType.Error:
      result = {
        fill: 'var(--ab-color-error)',
      };
      break;
  }
  if (result) {
    result.color = result.fill;
  }
  return result;
}

export function getGlyphForStatusColour(statusColour: StatusColour): string {
  switch (statusColour) {
    case StatusColour.Blue:
      return 'info';
    case StatusColour.Green:
      return 'check';
    case StatusColour.Amber:
      return 'warning';
    case StatusColour.Red:
      return 'error';
  }
}

export function getGlyphForMessageType(messageType: MessageType): string {
  switch (messageType) {
    case MessageType.Info:
      return 'info';
    case MessageType.Success:
      return 'check';
    case MessageType.Warning:
      return 'warning';
    case MessageType.Error:
      return 'error';
  }
}

export function getButtonToneForMessageType(
  messageType: MessageType
): 'info' | 'warning' | 'error' | 'success' {
  switch (messageType) {
    case MessageType.Info:
      return 'info';
    case MessageType.Warning:
      return 'warning';
    case MessageType.Error:
      return 'error';
    case MessageType.Success:
      return 'success';
  }
}

export function getScheduleDescription(schedule: Schedule): string {
  if (schedule == null) {
    return '[No Schedule]';
  }

  let dateString: string;
  if (schedule.OneOffDate == null) {
    if (
      ArrayExtensions.ContainsItem(schedule.DaysOfWeek, DayOfWeek.Monday) &&
      ArrayExtensions.ContainsItem(schedule.DaysOfWeek, DayOfWeek.Tuesday) &&
      ArrayExtensions.ContainsItem(schedule.DaysOfWeek, DayOfWeek.Wednesday) &&
      ArrayExtensions.ContainsItem(schedule.DaysOfWeek, DayOfWeek.Thursday) &&
      ArrayExtensions.ContainsItem(schedule.DaysOfWeek, DayOfWeek.Friday)
    ) {
      if (
        ArrayExtensions.ContainsItem(schedule.DaysOfWeek, DayOfWeek.Sunday) &&
        ArrayExtensions.ContainsItem(schedule.DaysOfWeek, DayOfWeek.Saturday)
      ) {
        dateString = 'Everyday';
      } else {
        dateString = 'Weekdays';
      }
    } else {
      const names: string[] = schedule.DaysOfWeek.sort().map(d => DayOfWeek[d]);
      dateString = ArrayExtensions.createCommaSeparatedString(names);
    }
  } else {
    dateString = new Date(schedule.OneOffDate).toDateString();
  }
  return `${dateString} at ${addLeadingZero(schedule.Hour)}:${addLeadingZero(schedule.Minute)}`;
}

function addLeadingZero(item: number): string {
  item = item || 0;
  if (item < 10) {
    return `0${item && item.toString ? item.toString() : item}`;
  }
  return item.toString();
}

export function getMessageTypeFromAdaptableAlerts(adaptableAlerts: AdaptableAlert[]): MessageType {
  if (adaptableAlerts.find(a => a.AlertDefinition.MessageType == MessageType.Error) != null) {
    return MessageType.Error;
  }
  if (adaptableAlerts.find(a => a.AlertDefinition.MessageType == MessageType.Warning) != null) {
    return MessageType.Warning;
  }
  if (adaptableAlerts.find(a => a.AlertDefinition.MessageType == MessageType.Success) != null) {
    return MessageType.Success;
  }
  return MessageType.Info;
}

export function getButtonColourForAdaptableAlerts(
  adaptableAlerts: AdaptableAlert[],
  messageTypeColor: string
): string {
  return ArrayExtensions.IsNotNullOrEmpty(adaptableAlerts) ? messageTypeColor : 'primary';
}

export function getButtonTextColourForArrayandMessageType(
  adaptableAlerts: AdaptableAlert[],
  messageType: MessageType
): string {
  if (ArrayExtensions.IsNullOrEmpty(adaptableAlerts)) {
    return 'text-on-primary';
  }
  return this.getButtonTextColourForMessageType(messageType);
}

export function getButtonTextColourForMessageType(messageType: MessageType): string {
  switch (messageType) {
    case MessageType.Info:
      return 'var( --ab-color-text-on-info)';
    case MessageType.Success:
      return 'var( --ab-color-text-on-success)';
    case MessageType.Warning:
      return 'var( --ab-color-text-on-warn)';
    case MessageType.Error:
      return 'var( --ab-color-text-on-error)';
  }
}

export const UIHelper = {
  getHexForName,
  getDefaultColors,
  getEmptyConfigState,
  getExpressionBuilderState,
  getExpressionBuilderStateWithColumn,
  getDescriptionForDataType,
  getPlaceHolderforDataType,
  getModalContainer,
  getChartContainer,
  isValidUserChartContainer,
  IsNotEmptyStyle,
  getMessageTypeByStatusColour,
  getGlyphByMessageType,
  getStyleForStatusColour,
  getGlyphForStatusColour,
  getButtonToneForMessageType,
  getScheduleDescription,
  getColorByMessageType,
  getGlyphForMessageType,
  getStyleForMessageType,
  getMessageTypeFromAdaptableAlerts,
  getButtonColourForAdaptableAlerts,
  getButtonTextColourForArrayandMessageType,
  getButtonTextColourForMessageType,
};
export default UIHelper;
