import { ApiBase } from './ApiBase';
import { IApplicationApi } from './Interface/IApplicationApi';

import ReactDOM from 'react-dom';
import {
  ApplicationToolbarButton,
  ApplicationState,
} from '../PredefinedConfig/DesignTimeState/ApplicationState';

export class ApplicationApi extends ApiBase implements IApplicationApi {
  public getApplicationState(): ApplicationState {
    return this.getBlotterState().Application;
  }

  public getApplicationToolbarButtons(): ApplicationToolbarButton[] {
    return this.getApplicationState().ApplicationToolbarButtons;
  }

  /**
   * Renders the Application Toolbar with the element it is given.
   *
   * @param element the element to be rendered - presumably a <div> but can be anything which is easily renderable.
   */
  public getApplicationToolbarContentsDivId(): string {
    return 'ab-ApplicationToolbar__contents';
  }

  public getApplicationToolbarContentsDiv(): HTMLElement | null {
    return document.getElementById(this.getApplicationToolbarContentsDivId());
  }
}
