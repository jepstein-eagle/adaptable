import { ITooltipComp, ITooltipParams } from 'ag-grid-community';

export class PercentBarTooltip implements ITooltipComp {
  private eGui: any;

  // gets called once before the renderer is used
  init(params: ITooltipParams): void {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = params.value;
  }

  // gets called once when grid ready to insert the element
  getGui(): HTMLElement {
    return this.eGui;
  }
}
