"# TZ-for-PeaceIT" 
====================
Author: Izhykov Anton
------------------------

English test is located in the index.html file. One can move to other pages from it. Tasks are divided by pages, the header is present on all of them for easy viewing.
***
#### Header
The **logo** in the `Header` redirects to the **_PeaceIT_**-school website from the main page, and to the main page (index.html) from other pages. In the tab named “`My website templates`” there are links to my last two templates, made only in html-css. The stylization of this example can be conditional and general. 
***
####ToDo List
`ToDo List` is located in the _`toDoList.html`_ file.
`ToDo List` is bound to `Locale Storage`. If there is no task list there, a "create" button appears. Then we work with `Locale Storage`. After each adding, deleting, or marking "Done", the object with the tasks is saved in LS.
The method **`createToDolist`()** of the variable **`myToDoList`** is responsible for the task list creation. 
Module creates and uses the following classes:
* .task-list
* .done
* .delete-button
* .done-button
* .warning
* .input-field

Using these classes ToDo List can be styled in any ways.
***
####Form elements styling
Form elements styling is located in the _`elements.html`_ file. Click on the name to open the element group window.
- cheсkbox: blue square and green circle.
- radio: 3 radio buttons and 3 tabs with pictures, a link to my template, where the color of  `:hover`-effect of pictures changes according to the chosen section
- input and textarea are styled without any problems
- select and range are implemented in two versions (js and css). CSS gives less workload on the site, but it can be not enough if you need to add some more functions.
***
####The color calculator
The color calculator is located on the _`colors.html`_ page.
the top option transfers color from RGB to HEX. Input check is not strict. the calculator filters all letters or characters, and if there are no numbers left, it will add 0. Thus, `@test,for.ColorCalc1!@` will be converted to `#000001`.
the hex - to - rgb option has more demanding checking system: there can be only Latin letters, not more than 9 characters, it accepts numbers with and without the # sign.
   * 4th character and the 7-8 pair are responsible for transparency.
   * If there are 5 characters at all, the 5th one is discarded.
   * There should be more than 3 characters
- the third option of the task accepts only hex-color. Checking is the same: at different lengths of value groups ​​(3 or 4) the smallest one is used.
###### It is necessary to take into account the background color of the output window. The color name is displayed in the color resulting from the translation. Therefore, a gray color on a gray background or a color in rgba with 0 (zero) transparency will not be visible (but it can be selected with the mouse).


