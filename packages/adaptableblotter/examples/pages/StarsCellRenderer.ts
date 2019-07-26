import { ICellRendererComp, ICellRendererParams } from 'ag-grid-community';

export class StarsCellRenderer implements ICellRendererComp {
  private eGui: any;
  private params: any;

  // gets called once before the renderer is used
  init(params: ICellRendererParams): void {
    this.params = params;
    this.eGui = document.createElement('span');
    var text = '';
    // one star for each medal
    for (var i = 0; i < params.value; i++) {
      text += '*';
    }
    this.eGui.innerHTML = text;
  }
  // gets called once when grid ready to insert the element
  getGui(): HTMLElement {
    return this.eGui;
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: any): boolean {
    // return true to tell the grid we refreshed successfully
    // this feels wrong but works - is same code as above.
    var text = '';
    // one star for each medal
    for (var i = 0; i < params.value; i++) {
      text += '*';
    }
    this.eGui.innerHTML = text;
    // return true to tell the grid we refreshed successfully
    return true;
  }

  // gets called when the cell is removed from the grid
  destroy(): void {
    // todo
  }
}
