(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(1725)}])},1725:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return N}});var r=t(5893),l=t(7294),a=t(6010),s=function(e){var n=e.children,t=e.className,l=e.innerPadding,s=void 0===l||l;return(0,r.jsx)("div",{className:(0,a.Z)(t,{"p-2 sm:p-6":s},"w-full text-md mb-4 rounded-lg bg-white shadow-md"),children:n})},i=t(1799),o=t(797),c=t(1337),u=function(){return(0,r.jsxs)("svg",{role:"status",className:"w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),(0,r.jsx)("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]})},d=t(8767),f=t(3737),x=function(e){return function(n){var t=n.signal;return fetch("/supplier-static/stocks.json?q="+e,{signal:t}).then((function(e){return e.json()}))}},h=function(e){var n=undefined,t=(0,l.useState)(""),a=t[0],h=t[1],p=(0,d.useQuery)("stocks-query"+a,(function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return x(a).apply(n,(0,o.Z)(t))}),{enabled:!!a}),m=p.isLoading;p.error,p.data;return(0,c.Z)((function(){return h(e.value)}),500,[e.value]),(0,r.jsx)("div",{className:"flex flex-col w-full",children:(0,r.jsx)(s,{children:(0,r.jsxs)("div",{className:"flex flex-row items-center lg:space-x-4",children:[(0,r.jsx)("input",(0,i.Z)({type:"text",className:"form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding text-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"},e)),(0,r.jsx)(f.Z,{className:"h-7 w-7 inline"}),m?(0,r.jsx)(u,{}):null]})})})},p=t(9396),m=t(5162),g=t(9534),b=(0,l.forwardRef)((function(e,n){var t=e.variant,l=e.children,s=e.rounded,o=void 0===s||s,c=(0,g.Z)(e,["variant","children","rounded"]),u="space-x-3 px-4 py-2 flex items-center border ";switch(t){case"primary":u+="text-white bg-blue-600 active:bg-blue-800 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0";break;case"dashed":u+="text-indigo-500 border-indigo-500 hover:bg-gray-100 border-dashed";break;default:u+="text-gray-600 transition-colors duration-200 transform bg-white hover:bg-gray-100 focus:outline-none"}return(0,r.jsx)("button",(0,p.Z)((0,i.Z)({ref:n,className:(0,a.Z)(u,{"rounded-lg ":o})},c),{children:l}))})),v=t(491),j={borderColor:"#838897"},w={borderColor:"#00e676"},C={borderColor:"#ff1744"},y=function(e){var n=e.onUpload,t=(0,l.useState)(!1),a=t[0],s=t[1],o=(0,l.useCallback)((function(e){var t=e[e.length-1];n(t),s(!1)}),[]),c=(0,m.uI)({accept:{"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":[]},onDrop:o}),u=c.getRootProps,d=c.getInputProps,f=c.isDragActive,x=c.isDragAccept,h=c.isDragReject,g=(0,l.useMemo)((function(){return(0,i.Z)({},f?j:{},x?w:{},h?C:{})}),[f,h,x]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(b,(0,p.Z)((0,i.Z)({variant:"dashed"},u({style:g})),{children:[(0,r.jsx)(v.Z,{className:"h-5 w-5"}),(0,r.jsxs)("span",{className:"hidden md:inline",children:[a?"Loading...":"Upload xlsx file"," "]})]})),(0,r.jsx)("input",(0,i.Z)({},d()))]})};function N(){var e=(0,l.useState)(""),n=e[0],t=e[1],a=(0,l.useState)("Kategorijos preki\u0173"),i=a[0],o=a[1],c=(0,l.useState)(null),u=c[0],d=c[1];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"flex flex-col lg:flex-row lg:space-x-4 pt-16",children:(0,r.jsx)(s,{children:(0,r.jsxs)("div",{className:"p-3 flex justify-between items-center",children:[u?null:(0,r.jsx)(y,{onUpload:function(e){return d(e)}}),u?u.name:null]})})}),u?(0,r.jsx)("div",{className:"justify-center flex pt-5",children:(0,r.jsx)("div",{className:"flex flex-col w-full",children:(0,r.jsxs)(s,{children:[(0,r.jsx)("label",{className:"form-label inline-block mb-1 text-gray-700 pt-2 text-md font-medium",children:"Categories column name"}),(0,r.jsx)("div",{className:"flex flex-row items-center lg:space-x-4",children:(0,r.jsx)("input",{name:"categoryColumn",type:"text",className:"form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding text-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",onChange:function(e){return o(e.target.value)},value:i})})]})})}):null,u?(0,r.jsx)("div",{className:"justify-center flex pt-5",children:(0,r.jsx)(h,{placeholder:"Categories to filter",onChange:function(e){return t(e.target.value)},value:n})}):null,u?(0,r.jsx)("div",{className:"flex justify-end pt-5",children:(0,r.jsx)(b,{variant:"primary",onClick:function(){var e=new FormData;e.append("file",u),e.append("searchQuery",n),e.append("categoryColumn",i),fetch("https://fleshascs.github.io/supplier-static/api/filter",{method:"POST",body:e}).then((function(e){return e.blob()})).then((function(e){var n=window.URL.createObjectURL(e);window.location.assign(n)})).catch((function(){alert("Failed")}))},children:(0,r.jsx)("span",{className:"hidden md:inline",children:"Filter and download"})})}):null]})}}},function(e){e.O(0,[619,774,888,179],(function(){return n=8312,e(e.s=n);var n}));var n=e.O();_N_E=n}]);