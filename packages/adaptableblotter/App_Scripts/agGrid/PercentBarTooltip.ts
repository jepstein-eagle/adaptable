import { ITooltipComp, ITooltipParams } from 'ag-grid-community';

export class PercentBarTooltip implements ITooltipComp {
  private eGui: any;

  // gets called once before the renderer is used
  init(params: ITooltipParams): void {
    // console.log('in tooltip');
    // console.log(params);
    // console.log(params.value);
    //  var eGui = document.createElement('div');
    this.eGui = document.createElement('div');
    // this.eGui.classList.add('custom-tooltip');
    var color = 'white';
    // var data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;

    // eGui.classList.add('custom-tooltip');
    // eGui.style['background-color'] = color;
    this.eGui.innerHTML = params.value;
    //   eGui.innerHTML = 'hello';

    // this.eGui = eGui;
  }

  // gets called once when grid ready to insert the element
  getGui(): HTMLElement {
    //  console.log('getting gui');
    return this.eGui;
  }
}

/*
.custom-tooltip {
    position: absolute;
    width: 150px;
    height: 70px;
    border: 1px solid cornflowerblue;
    overflow: hidden;
    pointer-events: none;
    transition: opacity 1s;
}

.custom-tooltip.ag-tooltip-hiding {
    opacity: 0;
}

.custom-tooltip p {
    margin: 5px;
    white-space: nowrap;
}

.custom-tooltip p:first-of-type {
    font-weight: bold;
}

*/
