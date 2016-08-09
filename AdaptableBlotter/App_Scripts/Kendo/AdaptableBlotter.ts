/// <reference path="../../typings/index.d.ts" />

import AdaptableBlotterPopup from '../AdaptableBlotterPopup';

    class AdaptableBlotter {
        private popup: AdaptableBlotterPopup;
        constructor(private grid: kendo.ui.Grid) {
            this.popup = new AdaptableBlotterPopup();
        }

        showPopup()
        {
            this.popup.setState({ show: false });
        }
    }