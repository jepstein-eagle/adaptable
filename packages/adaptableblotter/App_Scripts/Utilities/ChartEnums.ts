// Chart Enums

export enum ChartVisibility {
    Maximised = 'Maximised',
    Minimised = 'Minimised',
    Hidden = 'Hidden',
}

export enum ChartType {
    CategoryChart = 'CategoryChart',
    PieChart = 'PieChart',
    Data='Data'
}


export enum CategoryChartType {
    Column = 'Column',
    Area = 'Area',
    Line = 'Line',
    Point = 'Point',
    Spline = 'Spline',
    SplineArea = 'SplineArea',
    StepArea = 'StepArea',
    StepLine = 'StepLine',
    Waterfall = 'Waterfall'
}

export enum CrosshairDisplayMode {
    None = 'None',
    Horizontal = 'Horizontal',
    Vertical = 'Vertical',
    Both = 'Both'
}

export enum AxisLabelsLocation {
    OutsideTop = 'OutsideTop',
    OutsideBottom = 'OutsideBottom',
    OutsideLeft = 'OutsideLeft',
    OutsideRight = 'OutsideRight',
    // these enums are used only when using crossingAxis and crossingValue properties:
    InsideTop = 'InsideTop',
    InsideBottom = 'InsideBottom',
    InsideLeft = 'InsideLeft',
    InsideRight = 'InsideRight',
}

export enum AxisScale {
    Linear = 'Linear',
    Log = 'Log',
}

export enum HorizontalAlignment {
    Left = 'Left',
    Center = 'Center',
    Right = 'Right',
}

export enum AxisTotal {
    Sum = 'Sum',
    Average = 'Average',
}

export enum LabelVisibility {
    Visible = 'visible',
    Collapsed = 'collapsed',
}

export enum ToolTipType {
    Default = 'Default',
    Item = 'Item',
    Category = 'Category',
    None = 'None'
}

export enum PieChartLabelPositions {
  BestFit = 'BestFit',
  Center = 'Center',
  InsideEnd = 'InsideEnd',
  OutsideEnd = 'OutsideEnd',
  None = 'None'
}

export enum AxisAngle {
    Horizontal = 'Horizontal',
    Diagonal = 'Diagonal',
    Vertical = 'Vertical'
}

export enum MarkerType {
    // Unset = 'Unset',  // commented out because Default is more descriptive enum
    Default = 'Default', // added special enum to resolve marker type based on chart type
    Automatic = 'Automatic', // assigns different markers for each series in the chart, e.g.  Circle, Triangle, etc
    Circle = 'Circle',
    Triangle = 'Triangle',
    Pyramid = 'Pyramid',
    Square = 'Square',
    Diamond = 'Diamond',
    Pentagon = 'Pentagon',
    Hexagon = 'Hexagon',
    Tetragram = 'Tetragram',
    Pentagram = 'Pentagram',
    Hexagram = 'Hexagram',
    None = 'None',
}

export enum CalloutsType {
    None = 'None',
    DataRanges = 'Data Ranges',
    DataPoints = 'Data Points',
    DataChangesInValues = 'Data Changes',
    DataChangesInPercentage = 'Data Changes (%)',
    // note populate getCalloutTypeOptions() with names of non-numeric data columns
    // to add more callout types
}

export enum SecondaryColumnOperation {
    Sum = 'Sum',
    Count = 'Count',
}
