(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,a=void 0!==r&&r,o=e.hasQuery,u=void 0!==o&&o;return n||a&&u}},3579:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=o.default,a={loading:function(e){e.error,e.isLoading;return e.pastDelay,null}};e instanceof Promise?a.loader=function(){return e}:"function"===typeof e?a.loader=e:"object"===typeof e&&(a=r({},a,e));if((a=r({},a,t)).suspense)throw new Error("Invalid suspense option usage in next/dynamic. Read more: https://nextjs.org/docs/messages/invalid-dynamic-suspense");a.loadableGenerated&&delete(a=r({},a,a.loadableGenerated)).loadableGenerated;if("boolean"===typeof a.ssr&&!a.suspense){if(!a.ssr)return delete a.ssr,u(n,a);delete a.ssr}return n(a)},t.noSSR=u;var r=n(6495).Z,a=n(2648).Z,o=(a(n(7294)),a(n(3668)));function u(e,t){return delete t.webpack,delete t.modules,e(t)}("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=d,t.default=void 0;var r=n(6495).Z,a=n(2648).Z,o=(0,n(1598).Z)(n(7294)),u=a(n(1585)),i=n(8e3),l=n(5850),s=n(9470);n(9475);function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var c=["name","httpEquiv","charSet","itemProp"];function p(e,t){return e.reduce(f,[]).reverse().concat(d(t.inAmpMode).reverse()).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(a){var o=!0,u=!1;if(a.key&&"number"!==typeof a.key&&a.key.indexOf("$")>0){u=!0;var i=a.key.slice(a.key.indexOf("$")+1);e.has(i)?o=!1:e.add(i)}switch(a.type){case"title":case"base":t.has(a.type)?o=!1:t.add(a.type);break;case"meta":for(var l=0,s=c.length;l<s;l++){var d=c[l];if(a.props.hasOwnProperty(d))if("charSet"===d)n.has(d)?o=!1:n.add(d);else{var f=a.props[d],p=r[d]||new Set;"name"===d&&u||!p.has(f)?(p.add(f),r[d]=p):o=!1}}}return o}}()).reverse().map((function(e,n){var a=e.key||n;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var u=r({},e.props||{});return u["data-href"]=u.href,u.href=void 0,u["data-optimized-fonts"]=!0,o.default.cloneElement(e,u)}return o.default.cloneElement(e,{key:a})}))}var h=function(e){var t=e.children,n=o.useContext(i.AmpStateContext),r=o.useContext(l.HeadManagerContext);return o.default.createElement(u.default,{reduceComponentsToState:p,headManager:r,inAmpMode:s.isInAmpMode(n)},t)};t.default=h,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3982:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LoadableContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext(null);t.LoadableContext=r},3668:function(e,t,n){"use strict";var r=n(3227),a=n(8361);function o(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"===typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){l=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw o}}}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(6495).Z,l=(0,n(2648).Z)(n(7294)),s=n(3982),d=n(1688).useSyncExternalStore,f=[],c=[],p=!1;function h(e){var t=e(),n={loading:!0,loaded:null,error:null};return n.promise=t.then((function(e){return n.loading=!1,n.loaded=e,e})).catch((function(e){throw n.loading=!1,n.error=e,e})),n}var y=function(){function e(t,n){r(this,e),this._loadFn=t,this._opts=n,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}return a(e,[{key:"promise",value:function(){return this._res.promise}},{key:"retry",value:function(){var e=this;this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};var t=this._res,n=this._opts;t.loading&&("number"===typeof n.delay&&(0===n.delay?this._state.pastDelay=!0:this._delay=setTimeout((function(){e._update({pastDelay:!0})}),n.delay)),"number"===typeof n.timeout&&(this._timeout=setTimeout((function(){e._update({timedOut:!0})}),n.timeout))),this._res.promise.then((function(){e._update({}),e._clearTimeouts()})).catch((function(t){e._update({}),e._clearTimeouts()})),this._update({})}},{key:"_update",value:function(e){this._state=i({},this._state,{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach((function(e){return e()}))}},{key:"_clearTimeouts",value:function(){clearTimeout(this._delay),clearTimeout(this._timeout)}},{key:"getCurrentValue",value:function(){return this._state}},{key:"subscribe",value:function(e){var t=this;return this._callbacks.add(e),function(){t._callbacks.delete(e)}}}]),e}();function v(e){return function(e,t){var n=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null,suspense:!1},t);n.suspense&&(n.lazy=l.default.lazy(n.loader));var r=null;function a(){if(!r){var t=new y(e,n);r={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return r.promise()}if(!p){var u=n.webpack?n.webpack():n.modules;u&&c.push((function(e){var t,n=o(u);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(-1!==e.indexOf(r))return a()}}catch(i){n.e(i)}finally{n.f()}}))}function f(){a();var e=l.default.useContext(s.LoadableContext);e&&Array.isArray(n.modules)&&n.modules.forEach((function(t){e(t)}))}var h=n.suspense?function(e,t){return f(),l.default.createElement(n.lazy,i({},e,{ref:t}))}:function(e,t){f();var a=d(r.subscribe,r.getCurrentValue,r.getCurrentValue);return l.default.useImperativeHandle(t,(function(){return{retry:r.retry}}),[]),l.default.useMemo((function(){return a.loading||a.error?l.default.createElement(n.loading,{isLoading:a.loading,pastDelay:a.pastDelay,timedOut:a.timedOut,error:a.error,retry:r.retry}):a.loaded?l.default.createElement((t=a.loaded)&&t.__esModule?t.default:t,e):null;var t}),[e,a])};return h.preload=function(){return a()},h.displayName="LoadableComponent",l.default.forwardRef(h)}(h,e)}function m(e,t){for(var n=[];e.length;){var r=e.pop();n.push(r(t))}return Promise.all(n).then((function(){if(e.length)return m(e,t)}))}v.preloadAll=function(){return new Promise((function(e,t){m(f).then(e,t)}))},v.preloadReady=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise((function(t){var n=function(){return p=!0,t()};m(c,e).then(n,n)}))},window.__NEXT_PRELOADREADY=v.preloadReady;var _=v;t.default=_},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.headManager,n=e.reduceComponentsToState;function i(){if(t&&t.mountedInstances){var a=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(n(a,e))}}if(a){var l;null==t||null==(l=t.mountedInstances)||l.add(e.children),i()}return o((function(){var n;return null==t||null==(n=t.mountedInstances)||n.add(e.children),function(){var n;null==t||null==(n=t.mountedInstances)||n.delete(e.children)}})),o((function(){return t&&(t._pendingUpdate=i),function(){t&&(t._pendingUpdate=i)}})),u((function(){return t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),function(){t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)}})),null};var r=(0,n(1598).Z)(n(7294));var a=!1,o=a?function(){}:r.useLayoutEffect,u=a?function(){}:r.useEffect},3639:function(e,t,n){"use strict";n.r(t);var r=n(9008),a=n.n(r),o=n(5152),u=n.n(o),i=n(5893),l=u()((function(){return Promise.all([n.e(662),n.e(231),n.e(991)]).then(n.bind(n,8991))}),{ssr:!1,loadableGenerated:{webpack:function(){return[8991]}}});t.default=function(){return(0,i.jsxs)("div",{children:[(0,i.jsxs)(a(),{children:[(0,i.jsx)("title",{children:"Solidity Course"}),(0,i.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,i.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com"}),(0,i.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap",rel:"stylesheet"})]}),(0,i.jsx)(l,{})]})}},8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3639)}])},5152:function(e,t,n){e.exports=n(3579)},9008:function(e,t,n){e.exports=n(2717)},3250:function(e,t,n){"use strict";var r=n(7294);var a="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t},o=r.useState,u=r.useEffect,i=r.useLayoutEffect,l=r.useDebugValue;function s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!a(e,n)}catch(r){return!0}}var d="undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),r=o({inst:{value:n,getSnapshot:t}}),a=r[0].inst,d=r[1];return i((function(){a.value=n,a.getSnapshot=t,s(a)&&d({inst:a})}),[e,n,t]),u((function(){return s(a)&&d({inst:a}),e((function(){s(a)&&d({inst:a})}))}),[e]),l(n),n};t.useSyncExternalStore=void 0!==r.useSyncExternalStore?r.useSyncExternalStore:d},1688:function(e,t,n){"use strict";e.exports=n(3250)}},function(e){e.O(0,[774,888,179],(function(){return t=8312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);