import { IToolPanel, IToolPanelParams, IToolPanelComp } from "ag-grid-community"
import { AdaptableBlotter, } from './AdaptableBlotter'


export let ToolPanelWrapperFactory = (blotter: AdaptableBlotter) => {
    return <any>class ToolPanelWrapper implements IToolPanelComp  {
        private toolPanelContainer: HTMLDivElement
       
        // Can be left blank if no custom refresh logic is required.
        refresh(): void{

        }

        init(params: IToolPanelParams): void {
            console.log("hello world")
            this.toolPanelContainer = document.createElement("div")
            this.toolPanelContainer.id = "adaptableBlotterToolPanel" ;

            this.toolPanelContainer.innerHTML = "<span>HelloWorld</span>"        }

       getGui(): HTMLElement {
            return this.toolPanelContainer
        }

    
    }
};

