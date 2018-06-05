# Skeletize.js

A very simple helper for building and applying Skeleton Screens over child elements of a node for ajax loading purposes.

## Requirements

You don't need anything. This thing is pure Javascript. I'll just warn that this should only be used in modern browsers.

## Install 

```
bower install --save https://github.com/picklepilot/Skeletize.js.git
```

###### Add the default styles to your head

```
<link rel="stylesheet" href="skeletize.min.css">
```

###### Add the script to your footer

```
<script src="skeletize.js"></script>
```

###### Initialize

```
let skeletize = new Skeletize();
```

_Note: Skeletize.js is more of a helper to call on elements on demand, therefor initialization is just to register the main caller._

## Usage

###### Create basic skeleton screen over element

```
skeletize.setTarget('.target-element').create();
```

This will create a skeleton screen over `.target-element`. Make sure to give the target a `position:relative` at least. Skeletize.js will automatically detect an element's `width`, `height`, `offsets` and position the built skeleton screen over the target.     

###### Create skeleton screen with message

Via `data-skeletize-text`

```
<div class="target-element" data-skeletize-text="Loading new stuff..."></div>
```

This will automatically inject the text into the skeleton part.
