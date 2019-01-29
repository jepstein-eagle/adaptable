export interface IContainerOptions {
    /**
     * Name of the <div> which contains the Adaptable Blotter
     * Defaults to "adaptableBlotter"
     */
    adaptableBlotterContainer?: string;
    /**
    * Name of the <div> which contains the underlying vendor grid
    * Defaults to "grid"
    */
    vendorContainer?: string;
    /**
     * Name of the <div> where the modals should appear
     * If not set, modals will be displayed in the middle of the page
     */
    modalContainer?: string;
    /**
         * Name of the <div> where charts should appear
         * If not set, charts will be displayed directly the toolbar
         * Make sure you create a div of the same name as that provided here
         */
    chartContainer?: string;
}
