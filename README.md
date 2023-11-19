# Perf Ninja

_Front-End performance monitoring tool_

## Installation and Usage

To install a SDK, simply add the package:

```sh
npm install --save perfninja
yarn add perfninja
```

If you want to measure you own custom metric:

```javascript
import { mark, measure } from 'perfninja';

mark('pageTransitionStart');

setTimeout(() => {
  measure(
    '3699c7ca-b7bf-434f-bfdf-ec32c6ee3386', // Perf Ninja Chart Id 
    {
      markName: 'pageTransitionStart', 
    }
  )
}, 1000);
```

You can also measure from NavigationTiming API marks.

Simply call `measure` method without marking before. Just pass one of the [NavigationTiming](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Navigation_timing) keys to the markName prop:

```javascript
import { mark, measure } from 'perfninja';

measure(
  '3699c7ca-b7bf-434f-bfdf-ec32c6ee3386', // Perf Ninja Chart Id
  {
    markName: 'requestStart',
  }
);
```

## Usage from CDN

Embed following code before any of your site scripts:

```javascript
!function(){"use strict";!function(n,e){var r=function(){n[e].q.push(arguments[0],Array.prototype.slice.call(arguments,1))},t=["init","mark","measure"];n[e]={q:[]};for(var i=0;i<2;i++)n[e][t[i]]=r.bind({},t[i]);var a=n.document.createElement("script");a.src="https://cdn.jsdelivr.net/gh/perfninja/browser@1.0.0/index.min.js",n.document.head&&n.document.head.appendChild(a)}(window,"perfninja")}();
```
 
Call methods in your site from `perfninja` global variable:

```javascript
window.perfninja.measure(
  '3699c7ca-b7bf-434f-bfdf-ec32c6ee3386', // Perf Ninja Chart Id
  {
    markName: 'requestStart',
  }
);
```

## Links

* [Documentation](https://perfninja.com/docs)