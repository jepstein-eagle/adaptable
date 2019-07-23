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
import { AdaptableBlotterOptions } from '../BlotterOptions/AdaptableBlotterOptions';
import { IStyle } from '../PredefinedConfig/Common/IStyle';
import { ExpressionBuilderPageState } from './ExpressionBuilder/ExpressionBuilderPage';
import { Expression } from '../PredefinedConfig/Common/Expression/Expression';
import {
  SUCCESS_BSSTYLE,
  WARNING_BSSTYLE,
  DANGER_BSSTYLE,
  INFO_BSSTYLE,
} from '../Utilities/Constants/StyleConstants';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { Schedule } from '../PredefinedConfig/Common/Schedule';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import ExpressionHelper from '../Utilities/Helpers/ExpressionHelper';

export function getDefaultColors(): string[] {
  return [
    '#000000', //  {/* black */}
    '#ffffff', //  {/* white */}
    '#C0C0C0', //  {/* light gray */}
    '#808080', //  {/* dark gray */}
    '#800000', //  {/* brown */}

    '#808000', //  {/* olive */}
    '#008000', //  {/* dark green */}
    '#00FF00', //  {/* light green */}
    '#FFFF00', //  {/* yellow */}
    '#FFFFCC', //  {/* pale yellow (quick search default) */}

    '#000080', //  {/* dark blue */}
    '#0000FF', //  {/* blue */}
    '#008080', //  {/* cyan */}
    '#00FFFF', //  {/* light blue */}
    '#FF00FF', //  {/* pink */}

    '#800080', //  {/* purple */}
    '#8B0000', //  {/* dark red */}
    '#FF0000', //  {/* red */}
    '#FF6961', //  {/* pastel red */}
    '#FFA500', //  {/* orange */}
  ];
}

export function getEmptyConfigState(): EditableConfigEntityState {
  return {
    EditedAdaptableBlotterObject: null,
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
  blotterOptions: AdaptableBlotterOptions,
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
  blotterOptions: AdaptableBlotterOptions,
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
      LoggingHelper.LogAdaptableBlotterError(
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
  blotterOptions: AdaptableBlotterOptions,
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

export function getStyleNameByStatusColour(statusColour: StatusColour): string {
  switch (statusColour) {
    case StatusColour.Red:
      return DANGER_BSSTYLE;
    case StatusColour.Amber:
      return WARNING_BSSTYLE;
    case StatusColour.Green:
      return SUCCESS_BSSTYLE;
    case StatusColour.Blue:
      return INFO_BSSTYLE;
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

export function getStyleNameByMessageType(messageType: MessageType): string {
  switch (messageType) {
    case MessageType.Error:
      return DANGER_BSSTYLE;
    case MessageType.Warning:
      return WARNING_BSSTYLE;
    case MessageType.Success:
      return SUCCESS_BSSTYLE;
    case MessageType.Info:
      return INFO_BSSTYLE;
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

export function getStyleForSystemStatusButton(statusColour: StatusColour): CSSProperties {
  let result;

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

export function getGlyphForSystemStatusButton(statusColour: StatusColour): string {
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

export function GetScheduleDescription(schedule: Schedule): string {
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

export const UIHelper = {
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
  getStyleNameByStatusColour,
  getGlyphByMessageType,
  getStyleNameByMessageType,
  getStyleForSystemStatusButton,
  getGlyphForSystemStatusButton,
  GetScheduleDescription,
  getColorByMessageType,
};
export default UIHelper;
