"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[991],{8991:function(e,t,n){n.r(t),n.d(t,{default:function(){return R}});var s=n(7294),r=n(29),a=n(7794),l=n.n(a),o=n(7191),i=n(5893),c=function(e){return(0,o.Z)(e),(0,i.jsxs)("div",{className:"grid justify-items-center text-white bg-blue p-10 text-3xl font-semibold",children:[(0,i.jsx)("h1",{children:"You have successfuly completed the course! "}),(0,i.jsx)("h2",{children:"VC should appear in your wallet shortly!"})]})},u=n(1144),d=n.n(u);var x={name:"dclo7w",styles:"display:block;margin:0 auto;border-color:#05386b"},h=function(e){var t=e.loading,n=e.msg,r=(0,s.useState)("#05386b"),a=r[0];r[1];return(0,i.jsxs)("div",{className:"sweet-loading pt-5",children:[t&&(0,i.jsx)("div",{className:"text-blue p-3 text-2xl pb-6",children:n}),(0,i.jsx)(d(),{color:a,loading:t,css:x,size:100})]})},p=function(e){var t=e.connMetaMask;return(0,i.jsx)("div",{children:(0,i.jsx)("button",{className:"py-3 px-3 m-4 text-white text-3xl bg-blue hover:outline-blue hover:text-blue hover:bg-white outline outline-blue outline-8",onClick:t,children:"connect MetaMask"})})},f=function(e){var t=e.connected,n=e.address,s=e.connMetaMask;return(0,i.jsxs)("div",{className:"flex justify-between p-3",children:[(0,i.jsx)("div",{className:"text-blue text-6xl font-bold m-2",children:"Solidity Course"}),!t&&(0,i.jsx)(p,{connMetaMask:s}),t&&(0,i.jsx)("div",{className:"text-brown text-2xl font-bold m-2 p-5 bg-blue",children:(null===n||void 0===n?void 0:n.substring(0,10))+"..."})]})},m=function(e){var t=e.msg;return(0,i.jsx)("div",{className:"grid justify-items-center text-white bg-blue p-10 text-3xl font-semibold",children:(0,i.jsx)("h1",{children:t})})},b=function(e){var t=e.completeCourse,n=(0,s.useState)(""),r=n[0],a=n[1],l=(0,s.useState)(!1),o=l[0],c=l[1],u=function(e){c("true"===e.currentTarget.value)};return(0,i.jsx)("div",{className:"flex justify-center w-2/5 bg-blue text-white p-5 pt-10",children:(0,i.jsxs)("form",{onSubmit:function(e){e.preventDefault(),""==r||!1===o?console.log("Fill form first"):t(r),console.log("Name",r,o)},children:[(0,i.jsx)("div",{className:"text-4xl font-semibold",children:(0,i.jsxs)("label",{children:["NAME",(0,i.jsx)("input",{type:"text",name:"name",onChange:function(e){a(e.currentTarget.value)},className:"ml-2 pl-2 text-blue outline-none bg-white w-2/3"})]})}),(0,i.jsx)("br",{}),(0,i.jsx)("div",{className:"p-2 text-2xl",children:(0,i.jsxs)("label",{children:["Are you familiar with Solidity?",(0,i.jsxs)("div",{className:"pt-1",children:[(0,i.jsx)("input",{type:"radio",value:"true",name:"canProgram",onChange:u,className:"form-radio mr-2 text-green bg-white"})," ","Yes",(0,i.jsx)("input",{type:"radio",value:"false",name:"canProgram",onChange:u,className:"form-radio ml-4 text-green bg-white",defaultChecked:!0})," ","No"]})]})}),(0,i.jsx)("br",{}),(0,i.jsx)("br",{}),(0,i.jsx)("br",{}),(0,i.jsx)("div",{className:"w-full flex justify-center",children:(0,i.jsx)("input",{className:"absolute mt-[-20px] py-2 px-5 m-2 text-blue text-3xl bg-white hover:outline-green hover:bg-blue hover:text-white outline outline-blue outline-8",type:"submit",value:"submit"})})]})})},v=n(6486),g=function(e){var t=e.switchView,n=e.hasVC,s=e.openSecretRoom,r=function(e){e.preventDefault();var n=e.target.name;t((0,v.toNumber)(n))};return(0,i.jsxs)("div",{className:"w-full flex justify-start text-3xl pl-3 text-bold text-blue",children:[(0,i.jsx)("button",{className:"p-3 font-bold hover:text-white hover:bg-blue",onClick:r,name:"0",children:"Course"}),(0,i.jsx)("button",{className:"p-3 font-bold hover:text-white hover:bg-blue",onClick:r,name:"1",children:"Profile"}),n&&(0,i.jsx)("button",{className:"p-3 font-bold hover:text-white hover:bg-blue",onClick:s,children:"Secret Room"})]})},j=function(e){var t=e.startCourse;return(0,i.jsxs)("div",{className:"w-3/5",children:[(0,i.jsx)("div",{className:"grid justify-items-center bg-blue p-8",children:(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{className:"text-3xl text-center text-white mb-10",children:"Start the course to recieve your VC!"}),(0,i.jsx)("br",{}),(0,i.jsx)("br",{})]})}),(0,i.jsx)("div",{className:"flex justify-center m-[-65px]",children:(0,i.jsx)("button",{className:"py-5 px-5 m-2 text-blue text-3xl bg-white hover:outline-green hover:bg-blue hover:text-white outline outline-blue outline-8",onClick:t,children:"start"})})]})},w=function(e){var t=e.VC,n=(0,s.useState)([]),r=n[0],a=n[1],l=(0,s.useState)(!1),o=l[0],c=l[1];(0,s.useEffect)((function(){var e=JSON.stringify(t.credentialSubject).substring(1,JSON.stringify(t.credentialSubject).length-1);a(e.split(",")),console.log(e)}),[]);var u=function(){c(!o)};return(0,i.jsxs)("div",{className:"grid bg-white p-3 max-w-xl break-all m-3",children:[(0,i.jsx)("b",{children:"Issuer:"})," ",(0,i.jsx)("p",{children:t.issuer.id}),(0,i.jsx)("b",{children:"Subject:"}),(0,i.jsx)("div",{className:"p-2",children:r.map((function(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("a",{children:e.toString()}),(0,i.jsx)("br",{})]})}))}),(0,i.jsx)("b",{children:"Issuance Date:"})," ",t.issuanceDate,(0,i.jsx)("br",{}),!o&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("b",{children:"Proof:"})," ",t.proof.jwt.substring(0,50),"..."]}),o&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("b",{children:"Proof:"})," ",t.proof.jwt]}),(0,i.jsx)("br",{}),!o&&(0,i.jsx)("button",{className:"text-xl text-blue",onClick:u,children:"More..."}),o&&(0,i.jsx)("button",{className:"text-xl text-blue",onClick:u,children:"Less..."})]})},C=function(e){var t=e.VCs;return(0,i.jsx)("div",{className:"w-full p-3 flex justify-center",children:t.map((function(e,t){return(0,i.jsx)(w,{VC:e},t)}))})},N=function(e){e.mmAddress;var t=e.api,n=(0,s.useState)([]),a=n[0],o=n[1];(0,s.useEffect)((function(){console.log("Getting VCs..."),c()}),[]);var c=function(){var e=(0,r.Z)(l().mark((function e(){var n;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.getVCs();case 3:n=e.sent,console.log(n),o(n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return(0,i.jsxs)("div",{className:"w-full",children:[(0,i.jsx)("div",{className:"flex justify-center text-2xl font-bold",children:(0,i.jsx)("h1",{children:"My VCs"})}),(0,i.jsx)(C,{VCs:a})]})},k=function(e){return(0,o.Z)(e),(0,i.jsx)("footer",{className:"p-3 bg-blue text-white",children:(0,i.jsx)("div",{className:"w-full mx-auto",children:(0,i.jsx)("div",{className:"",children:(0,i.jsxs)("div",{className:" flex justify-center text-center text-sm text-white",children:[(0,i.jsx)("a",{href:"https://blockchain-lab.um.si/",className:"mx-6 hover:text-green",children:"Blockchain Lab:UM"}),(0,i.jsx)("a",{href:"https://github.com/blockchain-lab-um",className:"mx-6 hover:text-green",children:"Github"}),(0,i.jsxs)("span",{className:"mx-5",children:["Mail:",(0,i.jsx)("a",{href:"mailto:blockchain-lab@um.si",className:"mx-1 hover:text-green",children:"blockchain-lab@um.si"})]})]})})})})},y=function(e){return(0,o.Z)(e),(0,i.jsx)("div",{className:"w-full",children:(0,i.jsx)("div",{className:"flex justify-center text-2xl font-bold mt-10",children:(0,i.jsx)("div",{className:"w-3/5",children:(0,i.jsx)("div",{className:"grid justify-items-center bg-blue p-8",children:(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{className:"text-3xl text-center text-white mb-10",children:"Congratulations! You've discovered a secret room only accessible with a valid VC!"}),(0,i.jsx)("br",{}),(0,i.jsx)("br",{})]})})})})})},S=function(e){var t=e.mmAddress,n=e.connectMetamask,s=e.spinner,r=e.courseCompleted,a=e.snapInitialized,l=e.hasVC,o=e.completeCourse,u=e.spinnerMsg,d=e.switchView,x=e.view,p=e.startCourse,v=e.courseStarted,w=e.openSecretRoom,C=e.api;return window.ethereum?(0,i.jsxs)("div",{className:"flex flex-col h-screen justify-between",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(f,{address:t,connected:null!=t,connMetaMask:n}),(0,i.jsx)(g,{switchView:d,hasVC:l,openSecretRoom:w}),(0,i.jsxs)("div",{children:[0==x&&(0,i.jsxs)("div",{className:"flex justify-center pt-5",children:[null==t&&!s&&(0,i.jsx)("div",{className:"text-2xl pt-32",children:"Connect to the MetaMask to start the Course!"}),null!=t&&!s&&0==v&&(0,i.jsx)(j,{startCourse:p}),r&&v&&(0,i.jsx)(c,{}),null!=t&&!r&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(h,{loading:s,msg:u}),a&&a&&!l&&!s&&v&&(0,i.jsx)(b,{completeCourse:o}),a&&l&&!s&&(0,i.jsx)(m,{msg:"You already have a valid VC!"})]})]}),1==x&&(0,i.jsxs)("div",{className:"flex justify-center pt-5",children:[null==t&&(0,i.jsx)("div",{className:"text-2xl pt-32",children:"Connect to the MetaMask to view Profile!"}),null!=t&&(0,i.jsx)(N,{mmAddress:t,api:C})]}),2==x&&(0,i.jsx)(y,{})]})]}),(0,i.jsx)(k,{})]}):(0,i.jsx)(m,{msg:"MetaMask not installed!"})},V=n(6621);function M(e){return A.apply(this,arguments)}function A(){return A=(0,r.Z)(l().mark((function e(t){var n;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("Attempting to connect to snap..."),e.next=4,(0,V.enableSSISnap)(t,{version:"latest"});case 4:return n=e.sent,!0,console.log("Snap installed!"),e.abrupt("return",{isSnapInstalled:!0,snap:n});case 10:return e.prev=10,e.t0=e.catch(0),console.error(e.t0),!1,e.abrupt("return",{isSnapInstalled:!1});case 15:case"end":return e.stop()}}),e,null,[[0,10]])}))),A.apply(this,arguments)}var P=n(9669),Z="local:http://localhost:8081/",I="https://bclabum.informatika.uni-mb.si/ssi-demo-backend",U="did:ethr:rinkeby:0x0241abd662da06d0af2f0152a80bc037f65a7f901160cfe1eb35ef3f0c532a2a4d";console.log("BACKEND",I,Z,U);var E=function(){var e=(0,s.useState)(null),t=e[0],n=e[1],a=(0,s.useState)(!1),o=a[0],c=a[1],u=(0,s.useState)(!1),d=u[0],x=u[1],h=(0,s.useState)(!1),p=h[0],f=h[1],m=(0,s.useState)("loading..."),b=m[0],v=m[1],g=(0,s.useState)(0),j=g[0],w=g[1],C=(0,s.useState)(!1),N=C[0],k=C[1],y=(0,s.useState)(void 0),V=y[0],A=y[1],E=function(){var e=(0,r.Z)(l().mark((function e(){var t,s,r;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=null,!window.ethereum){e.next=12;break}return window.ethereum.request({method:"eth_requestAccounts"}).then((function(e){console.log("Setting MM address!"),t=e[0],n(t)})),e.next=5,M(Z);case 5:if(!(s=e.sent).isSnapInstalled){e.next=12;break}return e.t0=A,e.next=10,null===(r=s.snap)||void 0===r?void 0:r.getSSISnapApi();case 10:e.t1=e.sent,(0,e.t0)(e.t1);case 12:return e.abrupt("return");case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=function(){var e=(0,r.Z)(l().mark((function e(){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null==t||0!=N){e.next=5;break}return console.log("Starting course..."),k(!0),e.next=5,D(t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();var D=function(){var e=(0,r.Z)(l().mark((function e(t){var n;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x(!0),v("checking for existing vc..."),console.log("Checking if user already has a valid VC.."),e.prev=3,!V){e.next=12;break}return console.log("API",V),console.log("Getting VCs..."),e.next=9,V.getVCs({});case 9:n=e.sent,console.log(n);try{n.length>0&&n.map((function(e){console.log(e.credentialSubject.id.split(":")[3].toString().toUpperCase(),t,U.toUpperCase(),e.issuer.id.toString().toUpperCase()),e.credentialSubject.id.split(":")[3].toString().toUpperCase()===t.toUpperCase()&&e.issuer.id.toString().toUpperCase()===U.toUpperCase()&&(console.log("Valid VC found!"),f(!0))}))}catch(s){console.log("No valid VCs found!",s),x(!1),v("loading...")}case 12:e.next=20;break;case 14:e.prev=14,e.t0=e.catch(3),console.error(e.t0),alert("Problem happened: "+e.t0.message||0),x(!1),v("loading...");case 20:x(!1),v("loading...");case 22:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(t){return e.apply(this,arguments)}}(),F=function(){var e=(0,r.Z)(l().mark((function e(){var t,n;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}},e.next=3,P.post(I+"/api/vc/generate-challenge",t).then((function(e){return e.data})).catch((function(e){console.log(e)}));case 3:return n=e.sent,console.log("Challenge",n),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(){var e=(0,r.Z)(l().mark((function e(n,s,r){var a,o,i;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(!0),v("Verifying validity of VP"),a={headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}},o={vp:n,challenge:r,domain:s,subjectAddress:t},e.next=6,P.post(I+"/api/vc/verify-vp",o,a).then((function(e){return e.data})).catch((function(e){console.log(e)}));case 6:return i=e.sent,console.log(i),x(!1),e.abrupt("return",i);case 10:case"end":return e.stop()}}),e)})));return function(t,n,s){return e.apply(this,arguments)}}(),T=function(){var e=(0,r.Z)(l().mark((function e(n){var s,r,a,o;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(n,"Completed the course!",t),s={headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}},r={name:n,id:"did:ethr:rinkeby:"+t},e.next=5,P.post(I+"/api/vc/issue-vc",r,s).then((function(e){return e.data})).catch((function(e){console.log(e)}));case 5:if(a=e.sent,console.log(a),e.prev=7,!V){e.next=13;break}return e.next=11,V.saveVC(a);case 11:o=e.sent,console.log(o);case 13:e.next=19;break;case 15:e.prev=15,e.t0=e.catch(7),console.error(e.t0),alert("Problem happened: "+e.t0.message||0);case 19:c(!0);case 20:case"end":return e.stop()}}),e,null,[[7,15]])})));return function(t){return e.apply(this,arguments)}}(),_=function(){var e=(0,r.Z)(l().mark((function e(){var t,n,s,r;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(!0),v("Requesting VP"),e.next=4,F();case 4:if(t=e.sent,!V){e.next=33;break}return e.next=8,V.getVCs({});case 8:if(n=e.sent,console.log(n),!(n.length>0)){e.next=33;break}if(s=n[0].key,console.log(s),!(t&&t.domain&&t.challenge)){e.next=33;break}return e.prev=14,e.next=17,V.getVP(s,t.domain,t.challenge);case 17:return r=e.sent,console.log(r),e.next=21,O(r,t.domain,t.challenge);case 21:if(e.t0=e.sent,0==e.t0){e.next=25;break}return w(2),e.abrupt("return",!0);case 25:e.next=31;break;case 27:e.prev=27,e.t1=e.catch(14),console.log(e.t1),x(!1);case 31:return x(!1),e.abrupt("return",!1);case 33:return x(!1),v("loading..."),e.abrupt("return",!1);case 36:case"end":return e.stop()}}),e,null,[[14,27]])})));return function(){return e.apply(this,arguments)}}();return(0,i.jsx)(S,{mmAddress:t,connectMetamask:E,spinner:d,courseCompleted:o,snapInitialized:!0,hasVC:p,completeCourse:T,spinnerMsg:b,switchView:function(e){j!=e&&w(e)},view:j,startCourse:R,courseStarted:N,openSecretRoom:_,api:V})};function R(){return(0,i.jsx)("div",{className:"bg-green min-h-screen font-mono",children:(0,i.jsx)(E,{})})}}}]);