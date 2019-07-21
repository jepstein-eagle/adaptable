import { ITooltipComp, ITooltipParams } from 'ag-grid-community';
import AdaptableBlotter from '../../agGrid';

export class PercentBarTooltip implements ITooltipComp {
  private eGui: any;

  // gets called once before the renderer is used
  init(params: ITooltipParams): void {
    var eGui = document.createElement('div');
    var color = 'white';
    var data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    console.log(data.changeOnYear);

    // eGui.classList.add('custom-tooltip');
    //eGui.style['background-color'] = color;
    eGui.style.backgroundColor = 'white';
    eGui.style.position = 'absolute';
    eGui.style.width = '50px';
    eGui.style.height = '20px';
    eGui.style.border = '1px solid cornflowerblue';
    eGui.style.pointerEvents = 'none';
    eGui.style.opacity = '1';
    eGui.style.transition = 'opacity 1s';

    eGui.innerHTML = '<p><span class"name">' + data.changeOnYear + '</span></p>';

    this.eGui = eGui;
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
