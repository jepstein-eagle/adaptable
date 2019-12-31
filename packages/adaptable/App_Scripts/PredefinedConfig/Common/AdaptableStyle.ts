export interface AdaptableStyle {
  BackColor?: string;
  ForeColor?: string;
  FontWeight?: 'Normal' | 'Bold';
  FontStyle?: 'Normal' | 'Italic';
  FontSize?: 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
  ClassName?: string;
}

/*
BackColor

string (hex number)

The colour background of the cell.

ForeColor

string (hex number)

The font colour in the cell.

FontWeight

string

How the font appears. Permitted values are Normal (the default) or Bold.

FontStyle

string

The style of the font. Permitted values are Normal (the default) or Italic.

FontSize

string

The size of the font. Permitted values are Medium (the default), XSmall, Small, Large, and XLarge.

ClassName

string

The name of an existing Css Class. Use this instead of setting the properties above.

Warning
If you set this property, then the other properties in the object will be ignored.

Make sure that you include a style element with the same name in your own css files.

Note
Note all underlying grids support a ClassName, e.g. the Hypergird which is canvas-based and doesnt use css.


Note
The User Interface config has a StyleClassNames property.  This lists all the css classes that the user is able to pick in the Style screen.

However if you are providing the object in predefined config, the style name provided doesn't need to be present in the User Interface config.



Example 48. Style Config Example

"UserInterface": {        
 "StyleClassNames": [ 
 "styleBackBrown", 
 "styleForeYellow" 
 ]
},
 "QuickSearch": {        
    "Style": {            
        "ClassName": "styleBackGreen"        
        },    
},
"FormatColumn": {        
    "FormatColumns": [            
        {                
            "ColumnId": "notional",                
            "Style": {                    
                "BackColor": "#ff0000",                    
                "ForeColor": null,                    
                "FontWeight": "Normal",                    
                "FontStyle": "Normal",                    
                "FontSize": null                
            },            
        }        
    ],    
},
In this example we have set up 2 named Css Styles in the User Interface config.  We then use one of them in Quick Search.  

However for Format Column we create our own style and dont use a named Css style. 





*/
