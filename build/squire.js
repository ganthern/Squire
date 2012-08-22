/* Copyright © 2011-2012 by Neil Jenkins. Licensed under the MIT license. */(function(e){"use strict";var t=!e.createTreeWalker;window.ie===9&&(t=!0),t||function(){var n=e.createElement("div"),r=e.createTextNode("");n.appendChild(r);var i=n.cloneNode(!0),s=n.cloneNode(!0),o=n.cloneNode(!0),u=e.createTreeWalker(n,1,function(e){return 1},!1);n.appendChild(i),n.appendChild(s),n.appendChild(o),u.currentNode=o,u.previousNode()!==s&&(t=!0)}();if(!t)return;var n={1:1,2:2,3:4,8:128,9:256,11:1024},r=1,i=function(e,t,n){this.root=this.currentNode=e,this.nodeType=t,this.filter=n};i.prototype.nextNode=function(){var e=this.currentNode,t=this.root,i=this.nodeType,s=this.filter,o;for(;;){o=e.firstChild;while(!o&&e){if(e===t)break;o=e.nextSibling,o||(e=e.parentNode)}if(!o)return null;if(n[o.nodeType]&i&&s(o)===r)return this.currentNode=o,o;e=o}},i.prototype.previousNode=function(){var e=this.currentNode,t=this.root,i=this.nodeType,s=this.filter,o;for(;;){if(e===t)return null;o=e.previousSibling;if(o)while(e=o.lastChild)o=e;else o=e.parentNode;if(!o)return null;if(n[o.nodeType]&i&&s(o)===r)return this.currentNode=o,o;e=o}},e.createTreeWalker=function(e,t,n){return new i(e,t,n)}})(document),function(){"use strict";var e=function(e,t){var n=e.length,r,i;while(n--){r=e[n].prototype;for(i in t)r[i]=t[i]}},t=function(e,t){var n=e.length;while(n--)if(!t(e[n]))return!1;return!0},n=function(){return!1},r=function(){return!0},i=/^(?:A(?:BBR|CRONYM)?|B(?:R|D[IO])?|C(?:ITE|ODE)|D(?:FN|EL)|EM|FONT|HR|I(?:NPUT|MG|NS)?|KBD|Q|R(?:P|T|UBY)|S(?:U[BP]|PAN|TRONG|AMP)|U)$/,s={BR:1,IMG:1,INPUT:1},o=function(e,t){var n=t.parentNode;return n&&n.replaceChild(e,t),e},u=1,a=3,f=1,l=1,c=3,h=function(e){return e.isBlock()?l:c},p=!!window.opera||!!window.ie,d=/WebKit/.test(navigator.userAgent)||!!window.ie;e(window.Node?[Node]:[Text,Element,HTMLDocument],{isInline:n,isBlock:n,isContainer:n,getPath:function(){var e=this.parentNode;return e?e.getPath():""},detach:function(){var e=this.parentNode;return e&&e.removeChild(this),this},replaceWith:function(e){return o(e,this),this},replaces:function(e){return o(this,e),this},nearest:function(e,t){var n=this.parentNode;return n?n.nearest(e,t):null},getPreviousBlock:function(){var e=this.ownerDocument,t=e.createTreeWalker(e.body,f,h,!1);return t.currentNode=this,t.previousNode()},getNextBlock:function(){var e=this.ownerDocument,t=e.createTreeWalker(e.body,f,h,!1);return t.currentNode=this,t.nextNode()},split:function(e,t){return e},mergeContainers:function(){}}),e([Text],{isLeaf:n,isInline:r,getLength:function(){return this.length},isLike:function(e){return e.nodeType===a},split:function(e,t){var n=this;return n===t?e:n.parentNode.split(n.splitText(e),t)}}),e([Element],{isLeaf:function(){return!!s[this.nodeName]},isInline:function(){return i.test(this.nodeName)},isBlock:function(){return!this.isInline()&&t(this.childNodes,function(e){return e.isInline()})},isContainer:function(){return!this.isInline()&&!this.isBlock()},getLength:function(){return this.childNodes.length},getPath:function(){var e=this.nodeName;if(e==="BODY")return e;var t=this.parentNode.getPath(),n=this.id,r=this.className.trim();return t+=">"+e,n&&(t+="#"+n),r&&(r=r.split(/\s\s*/),r.sort(),t+=".",t+=r.join(".")),t},wraps:function(e){return o(this,e).appendChild(e),this},empty:function(){var e=this.ownerDocument.createDocumentFragment(),t=this.childNodes.length;while(t--)e.appendChild(this.firstChild);return e},is:function(e,t){if(this.nodeName!==e)return!1;var n;for(n in t)if(this.getAttribute(n)!==t[n])return!1;return!0},nearest:function(e,t){var n=this;do if(n.is(e,t))return n;while((n=n.parentNode)&&n.nodeType===u);return null},isLike:function(e){return e.nodeType===u&&e.nodeName===this.nodeName&&e.className===this.className&&e.style.cssText===this.style.cssText},mergeInlines:function(e){var t=this.childNodes,n=t.length,r=[],i,o,f;while(n--){i=t[n],o=n&&t[n-1];if(n&&i.isInline()&&i.isLike(o)&&!s[i.nodeName])e.startContainer===i&&(e.startContainer=o,e.startOffset+=o.getLength()),e.endContainer===i&&(e.endContainer=o,e.endOffset+=o.getLength()),e.startContainer===this&&(e.startOffset>n?e.startOffset-=1:e.startOffset===n&&(e.startContainer=o,e.startOffset=o.getLength())),e.endContainer===this&&(e.endOffset>n?e.endOffset-=1:e.endOffset===n&&(e.endContainer=o,e.endOffset=o.getLength())),i.detach(),i.nodeType===a?o.appendData(i.data.replace(/\u200B/g,"")):r.push(i.empty());else if(i.nodeType===u){f=r.length;while(f--)i.appendChild(r.pop());i.mergeInlines(e)}}},mergeWithBlock:function(e,t){var n=this,r=e,i,s,o;while(r.parentNode.childNodes.length===1)r=r.parentNode;r.detach(),s=n.childNodes.length,i=n.lastChild,i&&i.nodeName==="BR"&&(n.removeChild(i),s-=1),o={startContainer:n,startOffset:s,endContainer:n,endOffset:s},n.appendChild(e.empty()),n.mergeInlines(o),t.setStart(o.startContainer,o.startOffset),t.collapse(!0),window.opera&&(i=n.lastChild)&&i.nodeName==="BR"&&n.removeChild(i)},mergeContainers:function(){var e=this.previousSibling,t=this.firstChild;e&&e.isLike(this)&&e.isContainer()&&(e.appendChild(this.detach().empty()),t&&t.mergeContainers())},split:function(e,t){var n=this;typeof e=="number"&&(e=e<n.childNodes.length?n.childNodes[e]:null);if(n===t)return e;var r=n.parentNode,i=n.cloneNode(!1),s;while(e)s=e.nextSibling,i.appendChild(e),e=s;return n.fixCursor(),i.fixCursor(),(s=n.nextSibling)?r.insertBefore(i,s):r.appendChild(i),r.split(i,t)},fixCursor:function(){var e=this,t=e.ownerDocument,n,r;e.nodeName==="BODY"&&(!(r=e.firstChild)||r.nodeName==="BR")&&(n=t.createElement("DIV"),r?e.replaceChild(n,r):e.appendChild(n),e=n,n=null);if(e.isInline())e.firstChild||(d?(n=t.createTextNode("​"),editor._setPlaceholderTextNode(n)):n=t.createTextNode(""));else if(p){while(e.nodeType!==a&&!e.isLeaf()){r=e.firstChild;if(!r){n=t.createTextNode("");break}e=r}e.nodeType===a?/^ +$/.test(e.data)&&(e.data=""):e.isLeaf()&&e.parentNode.insertBefore(t.createTextNode(""),e)}else if(!e.querySelector("BR")){n=t.createElement("BR");while((r=e.lastElementChild)&&!r.isInline())e=r}return n&&e.appendChild(n),this}});if(function(){var e=document.createElement("div"),t=document.createTextNode("12");return e.appendChild(t),t.splitText(2),e.childNodes.length!==2}())Text.prototype.splitText=function(e){var t=this.ownerDocument.createTextNode(this.data.slice(e)),n=this.nextSibling,r=this.parentNode,i=this.length-e;return n?r.insertBefore(t,n):r.appendChild(t),i&&this.deleteData(e,i),t}}(),function(){"use strict";var e=function(e,t){var n;for(n in t)e[n]=t[n]},t=Array.prototype.indexOf,n=1,r=3,i=4,s=1,o=0,u=1,a=2,f=3,l=function(e,t){var r=e.childNodes;while(t&&e.nodeType===n)e=r[t-1],r=e.childNodes,t=r.length;return e},c=function(e,t){if(e.nodeType===n){var r=e.childNodes;if(t<r.length)e=r[t];else{while(e&&!e.nextSibling)e=e.parentNode;e&&(e=e.nextSibling)}}return e};e(Range.prototype,{forEachTextNode:function(e){var t=this.cloneRange();t.moveBoundariesDownTree();var n=t.startContainer,r=t.endContainer,o=t.commonAncestorContainer,u=o.ownerDocument.createTreeWalker(o,i,function(e){return s},!1),a=u.currentNode=n;while(!e(a,t)&&a!==r&&(a=u.nextNode()));},getTextContent:function(){var e="";return this.forEachTextNode(function(t,n){var r=t.data;r&&/\S/.test(r)&&(t===n.endContainer&&(r=r.slice(0,n.endOffset)),t===n.startContainer&&(r=r.slice(n.startOffset)),e+=r)}),e},_insertNode:function(e){var n=this.startContainer,i=this.startOffset,s=this.endContainer,o=this.endOffset,u,a,f,l;return n.nodeType===r?(u=n.parentNode,a=u.childNodes,i===n.length?(i=t.call(a,n)+1,this.collapsed&&(s=u,o=i)):(i&&(l=n.splitText(i),s===n?(o-=i,s=l):s===u&&(o+=1),n=l),i=t.call(a,n)),n=u):a=n.childNodes,f=a.length,i===f?n.appendChild(e):n.insertBefore(e,a[i]),n===s&&(o+=a.length-f),this.setStart(n,i),this.setEnd(s,o),this},_extractContents:function(e){var n=this.startContainer,i=this.startOffset,s=this.endContainer,o=this.endOffset;e||(e=this.commonAncestorContainer),e.nodeType===r&&(e=e.parentNode);var u=s.split(o,e),a=n.split(i,e),f=e.ownerDocument.createDocumentFragment(),l;while(a!==u)l=a.nextSibling,f.appendChild(a),a=l;return this.setStart(e,u?t.call(e.childNodes,u):e.childNodes.length),this.collapse(!0),e.fixCursor(),f},_deleteContents:function(){this.moveBoundariesUpTree(),this._extractContents();var e=this.getStartBlock(),t=this.getEndBlock();e&&t&&e!==t&&e.mergeWithBlock(t,this),e&&e.fixCursor();var n=this.endContainer.ownerDocument.body,r=n.firstChild;if(!r||r.nodeName==="BR")n.fixCursor(),this.selectNodeContents(n.firstChild);var i=this.collapsed;return this.moveBoundariesDownTree(),i&&this.collapse(!0),this},insertTreeFragment:function(e){var t=!0,r=e.childNodes,i=r.length;while(i--)if(!r[i].isInline()){t=!1;break}this.collapsed||this._deleteContents(),this.moveBoundariesDownTree();if(t)this._insertNode(e),this.collapse(!1);else{var s=this.startContainer.split(this.startOffset,this.startContainer.ownerDocument.body),o=s.previousSibling,u=o,a=u.childNodes.length,f=s,l=0,c=s.parentNode,h,p;while((h=u.lastChild)&&h.nodeType===n&&h.nodeName!=="BR")u=h,a=u.childNodes.length;while((h=f.firstChild)&&h.nodeType===n&&h.nodeName!=="BR")f=h;while((h=e.firstChild)&&h.isInline())u.appendChild(h);while((h=e.lastChild)&&h.isInline())f.insertBefore(h,f.firstChild),l+=1;p=e;while(p=p.getNextBlock())p.fixCursor();c.insertBefore(e,s),s.mergeContainers(),o.nextSibling.mergeContainers(),s===f&&!f.textContent&&(f=f.previousSibling,l=f.getLength(),c.removeChild(s)),o===u&&!u.textContent&&(u=u.nextSibling,a=0,c.removeChild(o)),this.setStart(u,a),this.setEnd(f,l),this.moveBoundariesDownTree()}},containsNode:function(e,t){var n=this,r=e.ownerDocument.createRange();r.selectNode(e);if(t){var i=n.compareBoundaryPoints(f,r)>-1,s=n.compareBoundaryPoints(u,r)<1;return!i&&!s}var l=n.compareBoundaryPoints(o,r)<1,c=n.compareBoundaryPoints(a,r)>-1;return l&&c},moveBoundariesDownTree:function(){var e=this.startContainer,t=this.startOffset,n=this.endContainer,i=this.endOffset,s;while(e.nodeType!==r){s=e.childNodes[t];if(!s||s.isLeaf())break;e=s,t=0}if(i)while(n.nodeType!==r){s=n.childNodes[i-1];if(!s||s.isLeaf())break;n=s,i=n.getLength()}else while(n.nodeType!==r){s=n.firstChild;if(!s||s.isLeaf())break;n=s}return this.collapsed?(this.setStart(n,i),this.setEnd(e,t)):(this.setStart(e,t),this.setEnd(n,i)),this},moveBoundariesUpTree:function(e){var n=this.startContainer,r=this.startOffset,i=this.endContainer,s=this.endOffset,o;e||(e=this.commonAncestorContainer);while(n!==e&&!r)o=n.parentNode,r=t.call(o.childNodes,n),n=o;while(i!==e&&s===i.getLength())o=i.parentNode,s=t.call(o.childNodes,i)+1,i=o;return this.setStart(n,r),this.setEnd(i,s),this},getStartBlock:function(){var e=this.startContainer,t;return e.isInline()?t=e.getPreviousBlock():e.isBlock()?t=e:(t=l(e,this.startOffset),t=t.getNextBlock()),t&&this.containsNode(t,!0)?t:null},getEndBlock:function(){var e=this.endContainer,t,n;if(e.isInline())t=e.getPreviousBlock();else if(e.isBlock())t=e;else{t=c(e,this.endOffset);if(!t){t=e.ownerDocument.body;while(n=t.lastChild)t=n}t=t.getPreviousBlock()}return t&&this.containsNode(t,!0)?t:null},startsAtBlockBoundary:function(){var e=this.startContainer,n=this.startOffset,r,i;while(e.isInline()){if(n)return!1;r=e.parentNode,n=t.call(r.childNodes,e),e=r}while(n&&(i=e.childNodes[n-1])&&(i.data===""||i.nodeName==="BR"))n-=1;return!n},endsAtBlockBoundary:function(){var e=this.endContainer,n=this.endOffset,r=e.getLength(),i,s;while(e.isInline()){if(n!==r)return!1;i=e.parentNode,n=t.call(i.childNodes,e)+1,e=i,r=e.childNodes.length}while(n<r&&(s=e.childNodes[n])&&(s.data===""||s.nodeName==="BR"))n+=1;return n===r},expandToBlockBoundaries:function(){var e=this.getStartBlock(),n=this.getEndBlock(),r;return e&&n&&(r=e.parentNode,this.setStart(r,t.call(r.childNodes,e)),r=n.parentNode,this.setEnd(r,t.call(r.childNodes,n)+1)),this}})}(),function(e){"use strict";var t=2,n=1,r=3,i=4,s=1,o=3,u=e.defaultView,a=e.body,f=navigator.userAgent,l=!!u.opera,c=!!u.ie,h=u.ie===8,p=/Gecko\//.test(f),d=/WebKit/.test(f),v=/iP(?:ad|hone|od)/.test(f),m=c||l,g=c||d,y=c,b=function(t,n,r){var i=e.createElement(t),s,o,u;n instanceof Array&&(r=n,n=null);if(n)for(s in n)i.setAttribute(s,n[s]);if(r)for(o=0,u=r.length;o<u;o+=1)i.appendChild(r[o]);return i},w={cut:1,paste:1,focus:1,blur:1,pathChange:1,select:1,input:1,undoStateChange:1},E={},S=function(e,t){var n=E[e],r,i,s;if(n){t||(t={}),t.type!==e&&(t.type=e);for(r=0,i=n.length;r<i;r+=1)s=n[r],s.handleEvent?s.handleEvent(t):s(t)}},x=function(e){S(e.type,e)},T=function(t,n){var r=E[t];r||(r=E[t]=[],w[t]||e.addEventListener(t,x,!1)),r.push(n)},N=function(t,n){var r=E[t],i;if(r){i=r.length;while(i--)r[i]===n&&r.splice(i,1);r.length||(delete E[t],w[t]||e.removeEventListener(t,x,!1))}},C=function(t,n,r,i){if(t instanceof Range)return t.cloneRange();var s=e.createRange();return s.setStart(t,n),r?s.setEnd(r,i):s.setEnd(t,n),s},k=u.getSelection(),L=null,A=function(e){e&&(v&&u.focus(),k.removeAllRanges(),k.addRange(e))},O=function(){return k.rangeCount&&(L=k.getRangeAt(0).cloneRange(),L.startContainer.isLeaf()&&L.setStartBefore(L.startContainer),L.endContainer.isLeaf()&&L.setEndBefore(L.endContainer)),L};y&&u.addEventListener("beforedeactivate",O,!0);var M=null,_=!0,D=!1,P=function(){_=!0,D=!1},H=function(e){M&&(_=!0,B()),D||(setTimeout(P,0),D=!0),_=!1,M=e},B=function(){if(!_)return;var e=M,t;M=null;if(e.parentNode){while((t=e.data.indexOf("​"))>-1)e.deleteData(t,1);!e.data&&!e.nextSibling&&!e.previousSibling&&e.parentNode.isInline()&&e.parentNode.detach()}},j,F,I="",q=function(e,t){M&&!t&&B(e);var n=e.startContainer,r=e.endContainer,i;if(t||n!==j||r!==F)j=n,F=r,i=n&&r?n===r?r.getPath():"(selection)":"",I!==i&&(I=i,S("pathChange",{path:i}));n!==r&&S("select")},R=function(){q(O())};T("keyup",R),T("mouseup",R);var U=function(){p&&a.focus(),u.focus()},z=function(){p&&a.blur(),top.focus()};u.addEventListener("focus",x,!1),u.addEventListener("blur",x,!1);var W=function(){return a.innerHTML},X=function(e){var t=a;t.innerHTML=e;do t.fixCursor();while(t=t.getNextBlock())},V=function(e,t){t||(t=O()),t.collapse(!0),t._insertNode(e),t.setStartAfter(e),A(t),q(t)},$=Array.prototype.indexOf,J="ss-"+Date.now()+"-"+Math.random(),K="es-"+Date.now()+"-"+Math.random(),Q=function(e){var n=b("INPUT",{id:J,type:"hidden"}),r=b("INPUT",{id:K,type:"hidden"}),i;e._insertNode(n),e.collapse(!1),e._insertNode(r),n.compareDocumentPosition(r)&t&&(n.id=K,r.id=J,i=n,n=r,r=i),e.setStartAfter(n),e.setEndBefore(r)},G=function(t){var n=e.getElementById(J),r=e.getElementById(K);if(n&&r){var i=n.parentNode,s=r.parentNode,o,u={startContainer:i,endContainer:s,startOffset:$.call(i.childNodes,n),endOffset:$.call(s.childNodes,r)};i===s&&(u.endOffset-=1),n.detach(),r.detach(),i.mergeInlines(u),i!==s&&s.mergeInlines(u),t||(t=e.createRange()),t.setStart(u.startContainer,u.startOffset),t.setEnd(u.endContainer,u.endOffset),o=t.collapsed,t.moveBoundariesDownTree(),o&&t.collapse(!0)}return t},Y,Z,et,tt,nt=function(){tt&&(tt=!1,S("undoStateChange",{canUndo:!0,canRedo:!1})),S("input")};T("keyup",function(e){var t=e.keyCode;!e.ctrlKey&&!e.metaKey&&!e.altKey&&(t<16||t>20)&&(t<33||t>45)&&nt()});var rt=function(e){tt||(Y+=1,Y<et&&(Z.length=et=Y),e&&Q(e),Z[Y]=W(),et+=1,tt=!0)},it=function(){if(Y!==0||!tt){rt(O()),Y-=1,X(Z[Y]);var e=G();e&&A(e),tt=!0,S("undoStateChange",{canUndo:Y!==0,canRedo:!0}),S("input")}},st=function(){if(Y+1<et&&tt){Y+=1,X(Z[Y]);var e=G();e&&A(e),S("undoStateChange",{canUndo:!0,canRedo:Y+1<et}),S("input")}},ot=function(t,n,u){t=t.toUpperCase(),n||(n={});if(!u&&!(u=O()))return!1;var a=u.commonAncestorContainer,f,l;if(a.nearest(t,n))return!0;if(a.nodeType===r)return!1;f=e.createTreeWalker(a,i,function(e){return u.containsNode(e,!0)?s:o},!1);var c=!1;while(l=f.nextNode()){if(!l.nearest(t,n))return!1;c=!0}return c},ut=function(t,n,u){if(u.collapsed){var a=b(t,n).fixCursor();u._insertNode(a),u.setStart(a.firstChild,a.firstChild.length),u.collapse(!0)}else{var f=e.createTreeWalker(u.commonAncestorContainer,i,function(e){return u.containsNode(e,!0)?s:o},!1),l,c,h=0,p=0,d=f.currentNode=u.startContainer,v;d.nodeType!==r&&(d=f.nextNode());do v=!d.nearest(t,n),d===u.endContainer&&(v&&d.length>u.endOffset?d.splitText(u.endOffset):p=u.endOffset),d===u.startContainer&&(v&&u.startOffset?d=d.splitText(u.startOffset):h=u.startOffset),v&&(b(t,n).wraps(d),p=d.length),c=d,l||(l=c);while(d=f.nextNode());u=C(l,h,c,p)}return u},at=function(t,n,i,s){Q(i);var o;i.collapsed&&(g?(o=e.createTextNode("​"),H(o)):o=e.createTextNode(""),i._insertNode(o));var u=i.commonAncestorContainer;while(u.isInline())u=u.parentNode;var a=i.startContainer,f=i.startOffset,l=i.endContainer,c=i.endOffset,h=[],p=function(e,t){if(i.containsNode(e,!1))return;var n=e.nodeType===r,s,o;if(!i.containsNode(e,!0)){e.nodeName!=="INPUT"&&(!n||e.data)&&h.push([t,e]);return}if(n)e===l&&c!==e.length&&h.push([t,e.splitText(c)]),e===a&&f&&(e.splitText(f),h.push([t,e]));else for(s=e.firstChild;s;s=o)o=s.nextSibling,p(s,t)},d=Array.prototype.filter.call(u.getElementsByTagName(t),function(e){return i.containsNode(e,!0)&&e.is(t,n)});s||d.forEach(function(e){p(e,e)}),h.forEach(function(e){e[0].cloneNode(!1).wraps(e[1])}),d.forEach(function(e){e.replaceWith(e.empty())}),G(i),o&&i.collapse(!1);var v={startContainer:i.startContainer,startOffset:i.startOffset,endContainer:i.endContainer,endOffset:i.endOffset};return u.mergeInlines(v),i.setStart(v.startContainer,v.startOffset),i.setEnd(v.endContainer,v.endOffset),i},ft=function(e,t,n,r){if(!n&&!(n=O()))return;rt(n),G(n),t&&(n=at(t.tag.toUpperCase(),t.attributes||{},n,r)),e&&(n=ut(e.tag.toUpperCase(),e.attributes||{},n)),A(n),q(n,!0),nt()},lt={DIV:"DIV",PRE:"DIV",H1:"DIV",H2:"DIV",H3:"DIV",H4:"DIV",H5:"DIV",H6:"DIV",P:"DIV",DT:"DD",DD:"DT",LI:"LI"},ct=function(e,t,n){var r=lt[e.nodeName],i=t.split(n,e.parentNode);return i.nodeName!==r&&(e=b(r),e.className=i.dir==="rtl"?"dir-rtl":"",e.dir=i.dir,e.replaces(i).appendChild(i.empty()),i=e),i},ht=function(e,t,n){if(!n&&!(n=O()))return;t&&(rt(n),G(n));var r=n.getStartBlock(),i=n.getEndBlock();if(r&&i)do if(e(r)||r===i)break;while(r=r.getNextBlock());t&&(A(n),q(n,!0),nt())},pt=function(e,t){if(!t&&!(t=O()))return;l||a.setAttribute("contenteditable","false"),tt?Q(t):rt(t),t.expandToBlockBoundaries(),t.moveBoundariesUpTree(a);var n=t._extractContents(a);t._insertNode(e(n)),t.endOffset<t.endContainer.childNodes.length&&t.endContainer.childNodes[t.endOffset].mergeContainers(),t.startContainer.childNodes[t.startOffset].mergeContainers(),l||a.setAttribute("contenteditable","true"),G(t),A(t),q(t,!0),nt()},dt=function(e){return b("BLOCKQUOTE",[e])},vt=function(e){var t=e.querySelectorAll("blockquote");return Array.prototype.filter.call(t,function(e){return!e.parentNode.nearest("BLOCKQUOTE")}).forEach(function(e){e.replaceWith(e.empty())}),e},mt=function(e){var t=e.querySelectorAll("blockquote"),n=t.length,r;while(n--)r=t[n],r.replaceWith(r.empty());return e},gt=function(e,t){var n,r,i,s,o,u;for(n=0,r=e.length;n<r;n+=1)i=e[n],s=i.nodeName,i.isBlock()?s!=="LI"&&(u=b("LI",{"class":i.dir==="rtl"?"dir-rtl":"",dir:i.dir},[i.empty()]),i.parentNode.nodeName===t?i.replaceWith(u):(o=i.previousSibling)&&o.nodeName===t?(o.appendChild(u),i.detach(),n-=1,r-=1):i.replaceWith(b(t,[u]))):i.isContainer()&&(s!==t&&/^[DOU]L$/.test(s)?i.replaceWith(b(t,[i.empty()])):gt(i.childNodes,t))},yt=function(e){return gt(e.childNodes,"UL"),e},bt=function(e){return gt(e.childNodes,"OL"),e},wt=function(e){var t=e.querySelectorAll("UL, OL");return Array.prototype.filter.call(t,function(e){return!e.parentNode.nearest("UL")&&!e.parentNode.nearest("OL")}).forEach(function(e){var t=e.empty(),n=t.childNodes,r=n.length,i;while(r--)i=n[r],i.nodeName==="LI"&&t.replaceChild(b("DIV",{"class":i.dir==="rtl"?"dir-rtl":"",dir:i.dir},[i.empty()]),i);e.replaceWith(t)}),e},Et=/\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\([^\s()<>]+\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’])|(?:[\w\-.%+]+@(?:[\w\-]+\.)+[A-Z]{2,4}))/i,St=function(e){var t=e.ownerDocument,n=t.createTreeWalker(e,i,function(e){return e.nearest("A")?o:s},!1),r,u,a,f,l,c,h;while(r=n.nextNode()){u=r.data.split(Et),f=u.length;if(f>1){c=r.parentNode,h=r.nextSibling;for(a=0;a<f;a+=1)l=u[a],a?(a%2?(r=t.createElement("A"),r.textContent=l,r.href=/@/.test(l)?"mailto:"+l:/^https?:/.test(l)?l:"http://"+l):r=t.createTextNode(l),h?c.insertBefore(r,h):c.appendChild(r)):r.data=l;n.currentNode=r}}},xt=/^A(?:DDRESS|RTICLE|SIDE)|BLOCKQUOTE|CAPTION|D(?:[DLT]|IV)|F(?:IGURE|OOTER)|H[1-6]|HEADER|L(?:ABEL|EGEND|I)|O(?:L|UTPUT)|P(?:RE)?|SECTION|T(?:ABLE|BODY|D|FOOT|H|HEAD|R)|UL$/,Tt={color:{regexp:/\S/,replace:function(e){return b("SPAN",{"class":"colour",style:"color:"+e})}},fontWeight:{regexp:/^bold/i,replace:function(){return b("B")}},fontStyle:{regexp:/^italic/i,replace:function(){return b("I")}},fontFamily:{regexp:/\S/,replace:function(e){return b("SPAN",{"class":"font",style:"font-family:"+e})}},fontSize:{regexp:/\S/,replace:function(e){return b("SPAN",{"class":"size",style:"font-size:"+e})}}},Nt={SPAN:function(e,t){var n=e.style,r,i,s,o,u,a;for(r in Tt)i=Tt[r],s=n[r],s&&i.regexp.test(s)&&(a=i.replace(s),o&&o.appendChild(a),o=a,u||(u=a));return u&&(o.appendChild(e.empty()),t.replaceChild(u,e)),o||e},STRONG:function(e,t){var n=b("B");return t.replaceChild(n,e),n.appendChild(e.empty()),n},EM:function(e,t){var n=b("I");return t.replaceChild(n,e),n.appendChild(e.empty()),n},TT:function(e,t){var n=b("SPAN",{"class":"font",style:'font-family:menlo,consolas,"courier new",monospace'});return t.replaceChild(n,e),n.appendChild(e.empty()),n}},Ct=function(e,t){var i=e.childNodes,s,o,u,a,f,l,c;for(s=0,o=i.length;s<o;s+=1){u=i[s],a=u.nodeName,f=u.nodeType,l=Nt[a];if(f===n){c=u.childNodes.length;if(l)u=l(u,e);else if(!xt.test(a)&&!u.isInline()){s-=1,o+=c-1,e.replaceChild(u.empty(),u);continue}!t&&u.style.cssText&&u.removeAttribute("style"),c&&Ct(u,t)}else if(f!==r||!/\S/.test(u.data))e.removeChild(u),s-=1,o-=1}return e},kt=function(e,t){var n=e.childNodes,r=null,i,s,o,u;for(i=0,s=n.length;i<s;i+=1){o=n[i],u=o.nodeName==="BR";if(!u&&o.isInline())r||(r=b(t)),r.appendChild(o),i-=1,s-=1;else if(u||r)r||(r=b(t)),r.fixCursor(),u?e.replaceChild(r,o):(e.insertBefore(r,o),i+=1,s+=1),r=null}return r&&e.appendChild(r.fixCursor()),e},Lt=function(e){var t=e.querySelectorAll("BR"),n=t.length,r,i;while(n--){r=t[n],i=r.parentNode;if(!i)continue;if(r.nextSibling&&r.previousSibling){while(i.isInline())i=i.parentNode;i.isBlock()?lt[i.nodeName]&&(ct(i,r.parentNode,r),r.detach()):kt(i,"DIV")}else r.detach()}},At=function(){a.fixCursor()};e.addEventListener(c?"beforecut":"cut",function(){var e=O();rt(e),G(e),setTimeout(At,0)},!1);var Ot=!1;e.addEventListener(c?"beforepaste":"paste",function(e){if(Ot)return;var t=e.clipboardData,n=t&&t.items,r=!1,i;if(n){i=n.length;while(i--)if(/^image\/.*/.test(n[i].type)){e.preventDefault(),S("dragover",{dataTransfer:t,preventDefault:function(){r=!0}}),r&&S("drop",{dataTransfer:t});return}}Ot=!0;var s=O(),o=s.startContainer,u=s.startOffset,f=s.endContainer,l=s.endOffset,c=b("DIV",{style:"position: absolute; overflow: hidden;top: -100px; left: -100px; width: 1px; height: 1px;"});a.appendChild(c),s.selectNodeContents(c),A(s),setTimeout(function(){var e=c.detach().empty(),t=e.firstChild,n=C(o,u,f,l);if(t){t===e.lastChild&&t.nodeName==="DIV"&&e.replaceChild(t.empty(),t),e.normalize(),St(e),Ct(e,!1),Lt(e);var r=e,i=!0;while(r=r.getNextBlock())r.fixCursor();S("willPaste",{fragment:e,preventDefault:function(){i=!1}}),i&&(n.insertTreeFragment(e),nt(),n.collapse(!1))}A(n),q(n,!0),Ot=!1},0)},!1);var Mt={8:"backspace",9:"tab",13:"enter",32:"space",46:"delete"},_t=function(e){return function(t){t.preventDefault(),e()}},Dt=function(e){return function(t){t.preventDefault();var n=O();ot(e,null,n)?ft(null,{tag:e},n):ft({tag:e},null,n)}},Pt=function(){var e=O(),t=e.startContainer,n;t.nodeType===r&&(t=t.parentNode);if(t.isInline()&&!t.textContent){do n=t.parentNode;while(n.isInline()&&!n.textContent&&(t=n));e.setStart(n,$.call(n.childNodes,t)),e.collapse(!0),n.removeChild(t),n.isBlock()||(n=n.getPreviousBlock()),n.fixCursor(),e.moveBoundariesDownTree(),A(e),q(e)}};h&&T("keyup",function(e){var t=a.firstChild;t.nodeName==="P"&&(Q(O()),t.replaceWith(b("DIV",[t.empty()])),A(G()))});var Ht={enter:function(t){t.preventDefault();var i=O();if(!i)return;rt(i),G(i),i.collapsed||i._deleteContents();var s=i.getStartBlock(),o=s?s.nodeName:"DIV",u=lt[o],f;if(!s){i._insertNode(b("BR")),i.collapse(!1),A(i),q(i,!0),nt();return}var c=i.startContainer,h=i.startOffset,p;if(!u){if(c===s){c=h?c.childNodes[h-1]:null,h=0;if(c){c.nodeName==="BR"?c=c.nextSibling:h=c.getLength();if(!c||c.nodeName==="BR")p=b("DIV").fixCursor(),c?s.replaceChild(p,c):s.appendChild(p),c=p}}kt(s,"DIV"),u="DIV",c||(c=s.firstChild),i.setStart(c,h),i.setEnd(c,h),s=i.getStartBlock()}if(!s.textContent){if(s.nearest("UL")||s.nearest("OL"))return pt(wt,i);if(s.nearest("BLOCKQUOTE"))return pt(mt,i)}f=ct(s,c,h);while(f.nodeType===n){var d=f.firstChild,v;if(f.nodeName==="A"){f.replaceWith(f.empty()),f=d;continue}while(d&&d.nodeType===r&&!d.data){v=d.nextSibling;if(!v||v.nodeName==="BR")break;d.detach(),d=v}if(!d||d.nodeName==="BR"||d.nodeType===r&&!l)break;f=d}i=C(f,0),A(i),q(i,!0),f.nodeType===r&&(f=f.parentNode),f.offsetTop+f.offsetHeight>(e.documentElement.scrollTop||a.scrollTop)+a.offsetHeight&&f.scrollIntoView(!1),nt()},backspace:function(e){var t=O();if(!t.collapsed)e.preventDefault(),t._deleteContents(),A(t),q(t,!0);else if(t.startsAtBlockBoundary()){e.preventDefault();var n=t.getStartBlock(),r=n.getPreviousBlock();if(r){if(!r.isContentEditable){r.detach();return}r.mergeWithBlock(n,t),n=r.parentNode;while(n&&!n.nextSibling)n=n.parentNode;n&&(n=n.nextSibling)&&n.mergeContainers(),A(t)}else{if(n.nearest("UL")||n.nearest("OL"))return pt(wt,t);if(n.nearest("BLOCKQUOTE"))return pt(vt,t);A(t),q(t,!0)}}else setTimeout(Pt,0)},"delete":function(e){var t=O();if(!t.collapsed)e.preventDefault(),t._deleteContents(),A(t),q(t,!0);else if(t.endsAtBlockBoundary()){e.preventDefault();var n=t.getStartBlock(),r=n.getNextBlock();if(r){if(!r.isContentEditable){r.detach();return}n.mergeWithBlock(r,t),r=n.parentNode;while(r&&!r.nextSibling)r=r.parentNode;r&&(r=r.nextSibling)&&r.mergeContainers(),A(t),q(t,!0)}}else setTimeout(Pt,0)},space:function(){var e=O();rt(e),G(e),A(e)},"ctrl-b":Dt("B"),"ctrl-i":Dt("I"),"ctrl-u":Dt("U"),"ctrl-y":_t(st),"ctrl-z":_t(it),"ctrl-shift-z":_t(st)};T(l?"keypress":"keydown",function(e){var t=e.keyCode,n=Mt[t]||String.fromCharCode(t).toLowerCase(),r="";l&&e.which===46&&(n="."),111<t&&t<124&&(n="f"+(t-111)),e.altKey&&(r+="alt-");if(e.ctrlKey||e.metaKey)r+="ctrl-";e.shiftKey&&(r+="shift-"),n=r+n,Ht[n]&&Ht[n](e)});var Bt=function(e){return function(){return e.apply(null,arguments),this}},jt=function(e,t,n){return function(){return e(t,n),U(),this}};u.editor={_setPlaceholderTextNode:H,addEventListener:Bt(T),removeEventListener:Bt(N),focus:Bt(U),blur:Bt(z),getDocument:function(){return e},addStyles:function(t){if(t){var n=e.documentElement.firstChild,r=b("STYLE",{type:"text/css"});r.styleSheet?(n.appendChild(r),r.styleSheet.cssText=t):(r.appendChild(e.createTextNode(t)),n.appendChild(r))}return this},getHTML:function(){var e=[],t,n,r,i;if(m){t=a;while(t=t.getNextBlock())!t.textContent&&!t.querySelector("BR")&&(n=b("BR"),t.appendChild(n),e.push(n))}r=W();if(m){i=e.length;while(i--)e[i].detach()}return r},setHTML:function(t){var n=e.createDocumentFragment(),r=b("DIV"),i;r.innerHTML=t,n.appendChild(r.empty()),Ct(n,!0),Lt(n),kt(n,"DIV");var s=n;while(s=s.getNextBlock())s.fixCursor();while(i=a.lastChild)a.removeChild(i);a.appendChild(n),a.fixCursor(),Y=-1,Z=[],et=0,tt=!1;var o=C(a.firstChild,0);return rt(o),G(o),y?L=o:A(o),q(o,!0),this},getSelectedText:function(){return O().getTextContent()},insertElement:Bt(V),insertImage:function(e){var t=b("IMG",{src:e});return V(t),t},getPath:function(){return I},getSelection:O,setSelection:Bt(A),undo:Bt(it),redo:Bt(st),hasFormat:ot,changeFormat:Bt(ft),bold:jt(ft,{tag:"B"}),italic:jt(ft,{tag:"I"}),underline:jt(ft,{tag:"U"}),removeBold:jt(ft,null,{tag:"B"}),removeItalic:jt(ft,null,{tag:"I"}),removeUnderline:jt(ft,null,{tag:"U"}),makeLink:function(t){t=encodeURI(t);var n=O();if(n.collapsed){var r=t.indexOf(":")+1;if(r)while(t[r]==="/")r+=1;n._insertNode(e.createTextNode(t.slice(r)))}return ft({tag:"A",attributes:{href:t}},{tag:"A"},n),U(),this},removeLink:function(){return ft(null,{tag:"A"},O(),!0),U(),this},setFontFace:function(e){return ft({tag:"SPAN",attributes:{"class":"font",style:"font-family: "+e+", sans-serif;"}},{tag:"SPAN",attributes:{"class":"font"}}),U(),this},setFontSize:function(e){return ft({tag:"SPAN",attributes:{"class":"size",style:"font-size: "+(typeof e=="number"?e+"px":e)}},{tag:"SPAN",attributes:{"class":"size"}}),U(),this},setTextColour:function(e){return ft({tag:"SPAN",attributes:{"class":"colour",style:"color: "+e}},{tag:"SPAN",attributes:{"class":"colour"}}),U(),this},setHighlightColour:function(e){return ft({tag:"SPAN",attributes:{"class":"highlight",style:"background-color: "+e}},{tag:"SPAN",attributes:{"class":"highlight"}}),U(),this},setTextAlignment:function(e){return ht(function(t){t.className=(t.className.split(/\s+/).filter(function(e){return!/align/.test(e)}).join(" ")+" align-"+e).trim(),t.style.textAlign=e},!0),U(),this},setTextDirection:function(e){return ht(function(t){t.className=(t.className.split(/\s+/).filter(function(e){return!/dir/.test(e)}).join(" ")+" dir-"+e).trim(),t.dir=e},!0),U(),this},forEachBlock:Bt(ht),modifyBlocks:Bt(pt),increaseQuoteLevel:jt(pt,dt),decreaseQuoteLevel:jt(pt,vt),makeUnorderedList:jt(pt,yt),makeOrderedList:jt(pt,bt),removeList:jt(pt,wt)},a.setAttribute("contenteditable","true"),u.editor.setHTML(""),u.onEditorLoad&&(u.onEditorLoad(u.editor),u.onEditorLoad=null)}(document);