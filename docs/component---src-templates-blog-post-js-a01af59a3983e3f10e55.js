(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{191:function(e,t,r){"use strict";r.r(t),r.d(t,"default",function(){return a}),r.d(t,"pageQuery",function(){return u});var n=r(0),o=r(195),c=r(202);function a(e){var t=e.data.mdx;return n.default.createElement("article",{className:"blog-post"},n.default.createElement("div",{className:"blog-post__top-nav"},n.default.createElement(o.a,{to:"/"},"← Back to home")),n.default.createElement("header",null,n.default.createElement("h1",null,t.frontmatter.title),n.default.createElement("div",{className:"blog-post__meta"},n.default.createElement("span",{className:"blog-post__meta-item"},t.frontmatter.date),n.default.createElement("span",{className:"blog-post__meta-item"},t.frontmatter.category))),n.default.createElement("div",{className:"blog-post__body"},n.default.createElement(c.MDXRenderer,null,t.body)),n.default.createElement("footer",{className:"blog-post__footer"},n.default.createElement("div",{className:"blog-post__footer-links"},n.default.createElement("a",{href:"https://mobile.twitter.com/search?q="+encodeURIComponent("https://sysoev.org/"+t.fields.slug)},"Discuss on Twitter"),n.default.createElement("a",{href:t.fields.editUrl},"Edit on GitHub"))))}var u="2377551404"},194:function(e,t,r){var n;e.exports=(n=r(196))&&n.default||n},195:function(e,t,r){"use strict";var n=r(0),o=r(60),c=r.n(o);r.d(t,"a",function(){return c.a});r(194),r(9).default.enqueue,n.default.createContext({})},196:function(e,t,r){"use strict";r.r(t);r(49),r(27),r(25),r(26),r(12),r(39);var n=r(0),o=r(96);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}t.default=function(e){var t=e.location,r=e.pageResources;return r?n.default.createElement(o.a,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(r,!0).forEach(function(t){a(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({location:t,pageResources:r},r.json)):null}},199:function(e,t,r){var n=r(1),o=r(51),c=r(28),a=r(5),u=r(6),l=r(8),i=r(138),f=(r(4).Reflect||{}).construct,s=l(function(){function e(){}return!(f(function(){},[],e)instanceof e)}),p=!l(function(){f(function(){})});n(n.S+n.F*(s||p),"Reflect",{construct:function(e,t){c(e),a(t);var r=arguments.length<3?e:c(arguments[2]);if(p&&!s)return f(e,t,r);if(e==r){switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3])}var n=[null];return n.push.apply(n,t),new(i.apply(e,n))}var l=r.prototype,d=o(u(l)?l:Object.prototype),m=Function.apply.call(e,d,t);return u(m)?m:d}})},202:function(e,t,r){var n=r(203);e.exports={MDXRenderer:n}},203:function(e,t,r){function n(e,t,r){return(n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var c=new(Function.bind.apply(e,n));return r&&o(c,r.prototype),c}).apply(null,arguments)}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(r,!0).forEach(function(t){l(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r(49),r(26),r(39),r(134),r(133),r(62),r(27),r(25),r(131),r(132),r(12),r(199),r(199),r(131),r(134),r(133),r(132),r(62),r(49),r(27),r(25),r(26),r(12),r(39);var i=r(0),f=r(92),s=f.useMDXComponents,p=f.mdx,d=r(116).useMDXScope;e.exports=function(e){var t=e.scope,r=e.components,o=e.children,a=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,["scope","components","children"]),l=s(r),f=d(t),m=i.useMemo(function(){if(!o)return null;var e=u({React:i,mdx:p},f),t=Object.keys(e),r=t.map(function(t){return e[t]});return n(Function,["_fn"].concat(c(t),[""+o])).apply(void 0,[{}].concat(c(r)))},[o,t]);return i.createElement(m,u({components:l},a))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-a01af59a3983e3f10e55.js.map