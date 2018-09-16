import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'switch-root',
  template: `<div>
    <button (click)="showWrapper(1)">Angular Wrapper</button>
    <button (click)="showWrapper(2)">AgGrid Angular Wrapper</button>
    <button (click)="showWrapper(3)">HyperGrid Angular Wrapper</button>
    <div [hidden]="show !== 1">
      <h3>Adaptable Blotter Angular Wrapper - working alongside ag-Grid angular component</h3>
      <adaptableblotter-root></adaptableblotter-root>
    </div>
    <div [hidden]="show !== 2">
      <h3>AgGrid Angular Wrapper - wraps Adaptable Blotter AND ag-Grid components</h3>
      <adaptableblotter-aggrid-root></adaptableblotter-aggrid-root>
    </div>
    <div [hidden]="show !== 3">
      <h3>HyperGrid Angular Wrapper - wraps Adaptable Blotter AND hypergrid components</h3>
      <adaptableblotter-hypergrid-root></adaptableblotter-hypergrid-root>
    </div>
  </div>`
})
export class SwitchComponent implements OnInit {
  private styles: Map<string, string> = new Map();
  show;

  ngOnInit() {
    this.showWrapper(1);
  }

  showWrapper(num) {
    let rootId, interval;

    this.styles.forEach((val, key) => {
      document.getElementById(key).innerText = val;
    });
    this.styles.clear();

    switch (num) {
      case 1:
        rootId = 'adaptableblotter-root';
        break;
      case 2:
        rootId = 'adaptableblotter-aggrid-root';
        break;
      case 3:
        rootId = 'adaptableblotter-hypergrid-root';
        break;
      default:
        return;
    }

    interval = setInterval(() => {
      const el = document.querySelector(rootId).querySelector('adaptable-blotter').querySelector('[id^=adaptableBlotter]');
      if (el) {
        clearInterval(interval);
        Array.from(document.querySelectorAll('style')).forEach(style => {
          if (style.id.includes('adaptableBlotter') && !style.id.startsWith(el.id)) {
            this.styles.set(style.id, style.innerText);
            style.innerText = '';
          }
        });

        this.show = num;
      }
    }, 100);
  }
}
