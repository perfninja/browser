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
!function(e,n){var r=function(){e[n].q.push(arguments[0],Array.prototype.slice.call(arguments,1))},i=["init","mark","measure"];e[n]={q:[]};for(var t=0;t<2;t++)e[n][i[t]]=r.bind({},i[t]);var a=e.document.createElement("script");a.src="https://cdn.jsdelivr.net/gh/perfninja/browser@1.0.0/index.min.js",e.document.head&&e.document.head.appendChild(a)}(window,"perfninja");
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