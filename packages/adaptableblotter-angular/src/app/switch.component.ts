import { Component } from '@angular/core';

@Component({
  selector: 'switch-root',
  template: `<div>
    <button (click)="showWrapper('blotter')">Angular Wrapper</button>
    <button (click)="showWrapper('blotterAgGrid')">AgGrid Angular Wrapper</button>
    <button (click)="showWrapper('blotterHyperGrid')">HyperGrid Angular Wrapper</button>
    <div [hidden]="show !== 'blotter'">
      <h3>Adaptable Blotter Angular Wrapper - working alongside ag-Grid angular component</h3>
      <adaptableblotter-root></adaptableblotter-root>
    </div>
    <div [hidden]="show !== 'blotterAgGrid'">
      <h3>AgGrid Angular Wrapper - wraps Adaptable Blotter AND ag-Grid components</h3>
      <adaptableblotter-aggrid-root></adaptableblotter-aggrid-root>
    </div>
    <div [hidden]="show !== 'blotterHyperGrid'">
      <h3>HyperGrid Angular Wrapper - wraps Adaptable Blotter AND hypergrid components</h3>
      <adaptableblotter-hypergrid-root></adaptableblotter-hypergrid-root>
    </div>
  </div>`
})
export class SwitchComponent {
  show = 'blotter';
  showWrapper(type) {
    this.show = type;
  }
}
