export interface IPPStyle {
    Header: {
        headerColor: string;
        headerBackColor: string;
        headerFontFamily: string;
        headerFontStyle: string;
        headerFontSize: string;
        headerFontWeight: string;
        height: number;
        Columns: {
            columnFriendlyName: string;
            width: number;
            textAlign: string;
        }[];
    };
    Row: {
        color: string;
        backColor: string;
        altBackColor: string;
        fontFamily: string;
        fontStyle: string;
        fontSize: string;
        fontWeight: string;
        height: number;
        Columns: {
            columnFriendlyName: string;
            width: number;
            textAlign: string;
        }[];
    };
}
