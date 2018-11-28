export declare const RGB_COLOR_REGEX: RegExp;
export declare class Color {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor();
    constructor(colorStr?: string);
    constructor(r?: string | number, g?: number, b?: number);
    toHex(): string;
    convertRadix(input: number): string;
    toRgb(): string;
    toRgba(): string;
}
