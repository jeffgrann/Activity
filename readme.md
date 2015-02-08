
Activity v1.0
=============

Activity is a [4D](http://www.4d.com) v14 component which provides thermometer/barber pole progress indicators that are animated while executing code in the same process. It allows the developer to customize many aspects of its display objects (including colors, fonts, etc.), display and change text messages displayed along with the progress indicator, enable or disable an associated cancel button and determine if the user has clicked the cancel button. The developer can freely switch between a thermometer and barber pole during complex processing. In addition, multiple progress indicators can appear within the same form, each with their own characteristics.

-----

Thermometer example:

![Thermometer](http://www.successware.net/documentation/components/activity/thermometer.png)

Barber pole example:

![Barber Pole](http://www.successware.net/documentation/components/activity/barberPole.png)

Contents
--------
* [Example](#EXAMPLE)
* [Installation](#INSTALLATION)
* [Dependencies](#DEPENDENCIES)
* [Adding a Progress Indicator to a Form](#ADDING_TO_FORM)
* [Methods](#COMPONENT_METHODS)
    * [Activity_DisableCancelButton (SubformObjectName)](#Activity_DisableCancelButton)
    * [Activity_EnableCancelButton (SubformObjectName)](#Activity_EnableCancelButton)
    * [Activity_Hide (SubformObjectName)](#Activity_Hide)
    * [Activity_ResetUserCanceled (SubformObjectName)](#Activity_ResetUserCanceled)
    * [Activity_Resize (SubformObjectName)](#Activity_Resize)
    * [Activity_SetBackgroundColor (SubformObjectName; Color)](#Activity_SetBackgroundColor)
    * [Activity_SetCancelButtonColors (SubformObjectName; EnabledColor; {HoverColor; ClickColor; DisabledColor})](#Activity_SetCancelButtonColors)
    * [Activity_SetFontColor (SubformObjectName; Color)](#Activity_SetFontColor)
    * [Activity_SetFontFamily (SubformObjectName; FontFamily)](#Activity_SetFontFamily)
    * [Activity_SetFontWeight (SubformObjectName; FontWeight)](#Activity_SetFontWeight)
    * [Activity_SetMeterBackgrndColor (SubformObjectName; Color)](#Activity_SetMeterBackgrndColor)
    * [Activity_SetMeterBorderColor (SubformObjectName; Color)](#Activity_SetMeterBorderColor)
    * [Activity_SetMeterColor (SubformObjectName; Color)](#Activity_SetMeterColor)
    * [Activity_SetStepsCompleted (SubformObjectName; Steps)](#Activity_SetStepsCompleted)
    * [Activity_SetText (SubformObjectName; Text)](#Activity_SetText)
    * [Activity_SetTextWidthPercentage (SubformObjectName; Percentage)](#Activity_SetTextWidthPercentage)
    * [Activity_SetTotalSteps (SubformObjectName; Steps)](#Activity_SetTotalSteps)
    * [Activity_Show (SubformObjectName)](#Activity_Show)
    * [Activity_ShowBarberPole (SubformObjectName)](#Activity_ShowBarberPole)
    * [Activity_UserCanceled (SubformObjectName)](#Activity_UserCanceled)
* [Known Issues](#KNOWN_ISSUES)
    * [Subform Resizing](#SUBFORM_RESIZING)
    * [URL Drops](#URL_DROPS)
* [Support](#SUPPORT)
* [Testing](#TESTING)
* [Contributions](#CONTRIBUTIONS)
* [Contributors](#Contributors)
* [License](#LICENSE)


<a id="EXAMPLE"></a>
Example
-------

```4D
C_TEXT($ProgressIndicator)$ProgressIndicator:="Progress"Activity_ResetUserCanceled ($ProgressIndicator)Activity_EnableCancelButton ($ProgressIndicator)Activity_SetTextWidthPercentage ($ProgressIndicator;60)Activity_SetText ($ProgressIndicator;"Searching for clients...")Activity_ShowBarberPole ($ProgressIndicator)Activity_Show ($ProgressIndicator)QUERY([Clients];[Clients]School="Valley High")Activity_SetText ($ProgressIndicator;"Capitalizing client names...")Activity_SetStepsCompleted ($ProgressIndicator;0)Activity_SetTotalSteps ($ProgressIndicator;Records in selection([Clients]))While (Not(End selection([Clients])) & Not(Activity_UserCanceled ($ProgressIndicator)))     [Clients]LastName:=Uppercase([Clients]LastName)     SAVE RECORD([Clients])     Activity_SetStepsCompleted ($ProgressIndicator;Selected record number([Clients]))End while Activity_Hide ($ProgressIndicator)```

<a id="INSTALLATION"></a>
Installation
------------
Simply copy the Activity.4dbase component file into the Components folder for your 4D structure file. 

<a id="DEPENDENCIES"></a>
Dependencies
------------

* 4D v14.3+ (tested with v14.3)

<a id="ADDING_TO_FORM"></a>
Adding a Progress Indicator to a Form
-------------------------------------

###Using the Activity Object Library

1. Choose File > Open > Object Library.
2. Open the Activity.4dlibrary 4D object library file supplied with the Activity component.
3. Drag the Progress Area object onto the form.
4. Size the object as desired. The progress indicator will automatically resize its contents to fill the available area.  
  
  The progress indicators are designed to be horizontal, so it is better to make the horizontal length greater than the height. The minimum height to be sure the cancel button can fit properly is 15 pixels. If you plan on displaying text, be sure to include enough space to fit the anticipated longest message.
5. Call [Activity_Resize](#Activity_Resize) in the form method when the subform area is resized.

###Manually Adding Using a Subform Object

1. Add a subform object to the form.
2. Size the subform object as desired. The progress indicator will automatically resize its contents to fill the available area.  
  
  The progress indicators are designed to be horizontal, so it is better to make the horizontal length greater than the height. The minimum height to be sure the cancel button can fit properly is 15 pixels. If you plan on displaying text, be sure to include enough space to fit the anticipated longest message.
3. Uncheck Output Subform in the subform's property list.
4. Enter Activity_Subform into the Detail Form field in the subform's property list.
5. Uncheck Horizontal Scroll Bar and Vertical Scroll Bar in the subform's property list.
6. You will probably want to uncheck Focusable in the subform's property list.
7. Call [Activity_Resize](#Activity_Resize) in the form method when the subform area is resized.

<a id="COMPONENT_METHODS"></a>
Methods
-------
<a id="Activity_DisableCancelButton"></a>
### Activity_DisableCancelButton (SubformObjectName)

Disables the stop button for the progress indicator within the given subform. After calling this method, user clicks on the stop button have no effect.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

Examples:

```4D
Activity_DisableCancelButton("ProgressIndicator")
```

<a id="Activity_EnableCancelButton"></a>
### Activity_EnableCancelButton (SubformObjectName)

Enables the stop button for the progress indicator within the given subform. After calling this method, user clicks on the stop button will be honored.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

Examples:

```4D
Activity_EnableCancelButton("ProgressIndicator")
```

<a id="Activity_Hide"></a>
### Activity_Hide (SubformObjectName)

Makes the progress indicator invisible within the given subform. Use [Activity_Show](#Activity_Show) to make it visible.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

Examples:

```4D
Activity_Hide("ProgressIndicator")
```

<a id="Activity_ResetUserCanceled"></a>
### Activity_ResetUserCanceled (SubformObjectName)

Sets the user canceled indicator to False within the given subform.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

Examples:

```4D
Activity_ResetUserCanceled("ProgressIndicator")
```

<a id="Activity_Resize"></a>
### Activity_Resize (SubformObjectName)

Call this method if the subform object containing the progress indicator is resized.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

Examples:

```4D
Activity_Resize("ProgressIndicator")
```

<a id="Activity_SetBackgroundColor"></a>
### Activity_SetBackgroundColor (SubformObjectName; Color)

Sets the background color of the progress indicator area. This will typically be the background color of the area where the subform is located on the form.

![Background Color](http://www.successware.net/documentation/components/activity/backgroundColor.png)

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `Color` *String* - The color to use for the background. Any [css color value](http://www.w3schools.com/cssref/css_colors_legal.asp) is accepted.

Examples:

```4D
Activity_SetBackgroundColor("ProgressIndicator")
```

<a id="Activity_SetCancelButtonColors"></a>
### Activity_SetCancelButtonColors (SubformObjectName; EnabledColor; {HoverColor; ClickColor; DisabledColor})

Sets the colors to be displayed for the cancel button.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `EnabledColor` *String* - The normal color of the cancel button when it is enabled. Any [css color value](http://www.w3schools.com/cssref/css_colors_legal.asp) is accepted.

#### Optional Arguments

* `HoverColor` *String* - The color of the cancel button when the mouse cursor is hovering over it. Any [css color value](http://www.w3schools.com/cssref/css_colors_legal.asp) is accepted.

* `ClickColor` *String* - The color of the cancel button when the mouse is clicking on it. Any [css color value](http://www.w3schools.com/cssref/css_colors_legal.asp) is accepted.

* `DisabledColor` *String* - The color of the cancel button when it is disabled. Any [css color value](http://www.w3schools.com/cssref/css_colors_legal.asp) is accepted.

Examples:

```4D
Activity_SetCancelButtonColors("ProgressIndicator";"#666";#333";"black";"rgba(0, 0, 0, 0.3)")
```

<a id="Activity_SetFontColor"></a>
### Activity_SetFontColor (SubformObjectName; Color)

Sets the color of the progress indicator text.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `Color` *String* - The color of the text. Any [css color value](http://www.w3schools.com/cssref/css_colors_legal.asp) is accepted.

Examples:

```4D
Activity_SetFontColor("ProgressIndicator";"#666")
```

<a id="Activity_SetFontFamily"></a>
### Activity_SetFontFamily (SubformObjectName; FontFamily)

Sets the font family for the progress indicator text.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `FontFamily` *String* - The [font family](http://www.w3schools.com/cssref/pr_font_font-family.asp) for the text.

Examples:

```4D
Activity_SetFontFamily("ProgressIndicator";"\"Times New Roman\", Georgia, Serif")
```

<a id="Activity_SetFontWeight"></a>
### Activity_SetFontWeight (SubformObjectName; FontWeight)

Sets the font weight for the progress indicator text.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `FontWeight` *String* - The [font weight](http://www.w3schools.com/cssref/pr_font_weight.asp) for the text.

Examples:

```4D
Activity_SetFontWeight("ProgressIndicator";"300")
```

<a id="Activity_SetMeterBackgrndColor"></a>
### Activity_SetMeterBackgrndColor (SubformObjectName; Color)

Sets the color of the progress meter background which extends from its border to the thermometer or barber pole graphic.

![Meter Background Color](http://www.successware.net/documentation/components/activity/meterBackgroundColor.png)

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `Color` *String* - The color of the meter background. Any [css color value](http://www.w3schools.com/cssref/css_colors_legal.asp) is accepted.

Examples:

```4D
Activity_SetMeterBackgrndColor("ProgressIndicator";"white")
```

<a id="Activity_SetMeterBorderColor"></a>
### Activity_SetMeterBorderColor (SubformObjectName; Color)

Sets the color of the progress meter border.

![Meter Border Color](http://www.successware.net/documentation/components/activity/meterBorderColor.png)

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `Color` *String* - The color of the meter border. Any [css color value](http://www.w3schools.com/cssref/css_colors_legal.asp) is accepted.

Examples:

```4D
Activity_SetMeterBorderColor("ProgressIndicator";"DarkGray")
```

<a id="Activity_SetMeterColor"></a>
### Activity_SetMeterColor (SubformObjectName; Color)

Sets the color of the progress meter. When displaying a thermometer, the given solid color is used. For a barber pole, the given solid color with lighter stripes is used. Therefore, light colors don't work as well for barber poles.

![Meter Color](http://www.successware.net/documentation/components/activity/meterColor.png)

![Meter Barber Pole Color](http://www.successware.net/documentation/components/activity/meterColorPole.png)

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `Color` *String* - The color of the meter. Any [css color value](http://www.w3schools.com/cssref/css_colors_legal.asp) is accepted.

Examples:

```4D
Activity_SetMeterColor("ProgressIndicator";"orange")
```

<a id="Activity_SetStepsCompleted"></a>
### Activity_SetStepsCompleted (SubformObjectName; Steps)

Sets the number of steps completed during a determinate task. The percentage completed is displayed in the progress meter indicator based on this value and that set using [Activity_SetTotalSteps](#Activity_SetTotalSteps).

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `Steps` *Longint* - The number of steps completed. This value must be greater than or equal to 0.

Examples:

```4D
Activity_SetStepsCompleted("ProgressIndicator";Selected record number([Clients]))
```

<a id="Activity_SetText"></a>
### Activity_SetText (SubformObjectName; Text)

Sets the text to display. Be sure that the text width percentage is set greater than 0 by setting this value using the [Activity_SetTextWidthPercentage](#Activity_SetTextWidthPercentage) method.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `Text` *String* - The text to display.

Examples:

```4D
Activity_SetText("ProgressIndicator";"Searching...")
```

<a id="Activity_SetTextWidthPercentage"></a>
### Activity_SetTextWidthPercentage (SubformObjectName; Percentage)

Sets the percentage of the subform area to devote to displaying text using the [Activity_SetText](#Activity_SetText) method.

![Text Width Percentage](http://www.successware.net/documentation/components/activity/textWidthPct.png)

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `Percentage` *Real* - The percentage of the subform area to devote to displaying text. If a text value is too long to fit within this width, it is clipped with an added ellipsis. Set this value to 0 to display the progress meter across the entire width of the subform area and text will no longer appear.

Examples:

```4D
Activity_SetTextWidthPercentage("ProgressIndicator";60)
```

<a id="Activity_SetTotalSteps"></a>
### Activity_SetTotalSteps (SubformObjectName; Steps)

Sets the total number of steps to be completed during a determinate task. The percentage completed is displayed in the progress meter indicator based on this value and that set using [Activity_SetStepsCompleted](#Activity_SetStepsCompleted).

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

* `Steps` *Longint* - The number of steps to be completed. This value must be greater than 0.

Examples:

```4D
Activity_SetTotalSteps("ProgressIndicator";Records in selection([Clients]))
```

<a id="Activity_Show"></a>
### Activity_Show (SubformObjectName)

Makes the progress indicator visible within the given subform. Use [Activity_Hide](#Activity_Hide) to make it invisible.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

Examples:

```4D
Activity_Show("ProgressIndicator")
```

<a id="Activity_ShowBarberPole"></a>
### Activity_ShowBarberPole (SubformObjectName)

Displays a barber pole in the progress indicator.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

Examples:

```4D
Activity_ShowBarberPole("ProgressIndicator")
```

<a id="Activity_UserCanceled"></a>
### Activity_UserCanceled (SubformObjectName)

Returns **True** if the user clicked the cancel button and returns **False** otherwise.

#### Arguments

* `SubformObjectName` *String* - The name of the subform object containing the progress indicator.

    ##### Return Value

    * A boolean value indicating if the user clicked the cancel button (**True**) or has not clicked it (**False**). If the user clicked the cancel button, the value can be reset to **False** by calling the [Activity_ResetUserCanceled](#Activity_ResetUserCanceled) method.

Examples:

```4D
Activity_UserCanceled("ProgressIndicator")
```

<a id="KNOWN_ISSUES"></a>
Known Issues
------------
<a id="SUBFORM_RESIZING"></a>
### Subform Resizing

When the subform object is resized, the web area used to display the progress indicator does not behave properly. I hope to address this issue in a future release. Until then, it is recommended that you use non-resizable subform areas.

<a id="URL_DROPS"></a>
### URL Drops

Need to disallow the dropping of URLs or files onto the web area. The version of 4D past v14.3 is needed for this.

<a id="SUPPORT"></a>
Support
-------
This component is offered "as is" with no support. If you have a question, feature request or bug report, please email <jeff@successware.net>, however a response is not guaranteed.

<a id="TESTING"></a>
Testing
-------
This component has been tested with 4D v14.3 on Mac OS X 10.9.5 and Windows 7 Service Pack 1.

<a id="CONTRIBUTIONS"></a>
Contributions
-------------
If you wish to contribute to the development of this component, send a pull request. Please remember to update this markdown documentation if the public interface changes.

<a id="Contributors"></a>
Contributors
------------
Thanks to Chris Coyier and his [CSS-TRICKS](http://css-tricks.com) website. Progress meter code and ideas were derived from http://css-tricks.com/css3-progress-bars/.

Cancel button code from http://enjoycss.com/gallery/shapes/gn#text.

<a id="LICENSE"></a>
License
-------
Licensed under MIT.

Copyright (C) 2015 [Jeff Grann](https://github.com/jeffgrann) <jeff@successware.net>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software. 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
