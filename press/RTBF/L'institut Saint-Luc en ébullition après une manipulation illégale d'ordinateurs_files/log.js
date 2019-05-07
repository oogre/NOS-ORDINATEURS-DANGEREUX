/* Copyright 2011-2018 HeatMap Inc. - All rights reserved */
if(!self.heatmap){self.heatmap=heatmap={}}if(!heatmap.log){heatmap.log={h:function(c){if(!c){return 0}for(var b=0,d=5381,a=c.length;b<a;b++){d=((d<<5)+d)+c.charCodeAt(b)}return d&4294967295},t:function(c){var b=this,a=c.tagName;if(!b.t.d){b.t.d={BODY:"0",H1:"1",H2:"2",H3:"3",H4:"4",H5:"5",H6:"6",SUB:"_",STRIKE:"-",OUTPUT:":",IFRAME:"!",SMALL:".",FIGCAPTION:"(",FIGURE:")",HEADER:"[",FOOTER:"]",FIELDSET:"{",ASIDE:"}",PATH:"§",ABBR:"@",ARTICLE:"*",I:"/",VIDEO:"#",PROGRESS:"%",METER:"^",SUP:"°",HGROUP:"+",DATALIST:"<",BUTTON:"=",MARK:">",SECTION:"|",AUDIO:"~",TIME:"$",A:"a",AREA:"A",B:"B",BLOCKQUOTE:"b",CENTER:"c",CITE:"C",CANVAS:"D",DIV:"d",EM:"E",EMBED:"e",OBJECT:"e",FONT:"f",FORM:"F",BIG:"G",STRONG:"g",HR:"h",TH:"H",IMG:"i",INPUT:"I",SAMP:"j",TT:"J",KBD:"k",S:"K",LABEL:"l",LI:"L",MAP:"m",SVG:"M",MENU:"n",NAV:"N",OL:"O",OPTION:"o",P:"p",PRE:"P",CODE:"Q",Q:"q",BDI:"R",TR:"r",SELECT:"s",SPAN:"S",TABLE:"T",TD:"t",ADDRESS:"U",UL:"u",U:"v",VAR:"V",DD:"w",DL:"W",DT:"X",TEXTAREA:"x",CAPTION:"Y",LEGEND:"y",DETAILS:"z",SUMMARY:"Z"}}return(!a?"":b.t.d[a]||b.t.d[a.toUpperCase()]||"'")},p:function(e){var c=this,a=document.body,d="";while(e&&e!=a){d=c.t(e)+d;e=e.parentNode}return d},peq:function(c,d){var a=document.body;while(c&&d&&c!=a&&d!=a){if(c==d){return true}else{if(c.tagName==d.tagName){c=c.parentNode;d=d.parentNode}else{return false}}}return(c==d)},trou:function(d){if(d==document.body){return{t:"0",r:0,o:0,u:0,path:"",url:""}}if(!d){return{t:"",r:0,o:0,u:0,path:"",url:""}}var g=this;var m=g.p(d),b=g.url(d);var a=g.h(m),h=g.h(b),c=1;if(document.getElementsByTagName){var f,e,j,k=document.getElementsByTagName(d.tagName);for(f=0,e=k.length;f<e;f++){j=k[f];if(d==j){break}if(g.peq(d,j)){c++}}}return{t:g.t(d),r:a,o:(c>1?c:0),u:h,path:m,url:b}},css:function(f,b,d){if(!f||!b){return""}var a=this;if(!a.cssf){if(window.getComputedStyle){a.cssf=function(k,i,j){try{var h=getComputedStyle(k,j);return h?h.getPropertyValue(i):""}catch(g){return""}}}else{if(f.currentStyle){var c=/(\-([a-z]){1})/g;a.cssf=function(h,g){if(g=="float"){g="styleFloat"}if(c.test(g)){g=g.replace(c,function(){return arguments[2].toUpperCase()})}return(h.currentStyle?h.currentStyle[g]:"")}}else{a.cssf=function(h,g){return(!h.style?"":h.style[g])}}}}return a.cssf(f,b,d)},cssi:function(c,a,b){return Math.round(parseFloat(this.css(c,a,b)))||0},pos_area:function(e){var q=this,l=document,m=e.hm_area,j;if(!m){m=e.hm_area={l:0,t:0,r:0,b:0}}if(!m.k&&!m.img&&l.getElementsByTagName){m.k=1;var b=e.parentNode,k=l.getElementsByTagName("IMG"),f=k.length,g="#"+b.id;for(j=0;j<f;j++){if(k[j].useMap==g){m.img=k[j];break}}}if(!m.img){return{x:0,y:0,xf:0,yf:0,fixed:false,w:0,h:0,bcr:1}}var c=q.pos_bcr(m.img);if(!m.s&&e.shape&&e.shape.match(/(rect|poly)/i)&&e.coords){m.s=1;var r=e.coords.split(","),h=r.length,n;for(j=0;j<h;j++){n=parseInt(r[j],10);if(j%2){m.t=(j==1?n:Math.min(m.t,n));m.b=(j==1?n:Math.max(m.b,n))}else{m.l=(!j?n:Math.min(m.l,n));m.r=(!j?n:Math.max(m.r,n))}}}return m.s?{x:c.x+m.l,y:c.y+m.t,fixed:c.fixed,xf:c.xf+m.l,yf:c.yf+m.t,w:m.r-m.l+1,h:m.b-m.t+1,v:c.v,bcr:1}:c},pos_grow:function(g,v,n,f){if(!v){v=g.getBoundingClientRect()}var p,h=g.childNodes,d,q,e,k,j=v.left,w=v.top,a=v.right,s=v.bottom;for(var m=0,u=Math.min(h.length,10);m<u;m++){p=h[m];v=(p.getBoundingClientRect?p.getBoundingClientRect():0);if(!v||!v.width||!v.height){if(!f||!p.children||!p.children.length){continue}v=this.pos_grow(p,v,false,true);if(!v||v.left==v.right||v.top==v.bottom){continue}}d=v.left;q=v.right;e=v.top;k=v.bottom;if(n){if(this.css(p,"float")!="none"||this.css(p,"position")=="absolute"){j=d;a=q}w=e;s=k;n=false}if(j>d){j=d}if(a<q){a=q}if(w>e){w=e}if(s<k){s=k}}return{left:j,top:w,right:a,bottom:s}},pos_bcr:function(z){var L=this,F=document,G=F.body,q="";if(!z||!z.getBoundingClientRect){return{x:0,y:0,w:0,h:0,v:(!z?"no obj":"no bcr"),bcr:1}}else{if(z==G){var y=L.ds();return{x:0,y:0,w:y.w,h:y.h,v:"body",bcr:1}}else{if(z.tagName=="AREA"&&z.parentNode&&z.parentNode.id){return L.pos_area(z)}else{var K=z,h=0,a=L.ws(),w=L.pos.v,p=z.getBoundingClientRect(),A=p.left,u=p.top,x=p.right,I=p.bottom;do{if(L.css(K,"position")=="fixed"){h=true}K=K.offsetParent}while(K&&!h);var f=(z.tagName=="A"&&/inline/.test(L.css(z,"display")));if(f){var k=z.childNodes,m,j,n=0,E=0,B=0,g=/\S/;for(var D=0,s=Math.min(k.length,10);D<s;D++){m=k[D];j=m.nodeType;if(!n&&j==3&&g.test(m.nodeValue)){n=1}else{if(!E&&j==1){E=1;B=L.cssi(z,"padding-left")||L.cssi(z,"padding-top")}}}if(E){var H=!n&&!B,J=L.pos_grow(z,p,H);A=J.left;u=J.top;x=J.right;I=J.bottom;if(w){q+="inline fix hasText="+n+" hasPadding="+B+" reset="+H+"<br>"}}}if(A==x||u==I){if(w){q+="flat size fix<br>"}var e=L.pos_grow(z,p,true,true);A=e.left;u=e.top;x=e.right;I=e.bottom}if(A==x||u==I){if(w){q+="before/after fix<br>"}for(var D=0,c=[null,":before",":after"],C=c.length;D<C;D++){if(A==x){x+=L.cssi(z,"width",c[D])}if(u==I){I+=L.cssi(z,"height",c[D])}}}if(w){q+=z.tagName+" l="+A+" "+(z.className||"")+" offsetLeft="+z.offsetLeft+" scrollLeft="+z.scrollLeft+"<br>";q+=z.tagName+" t="+u+" "+(z.className||"")+" offsetTop="+z.offsetTop+" scrollTop="+z.scrollTop+"<br>";if(!h){q+="scroll l="+(A+a.l)+" ws.l="+a.l+"<br>";q+="scroll t="+(u+a.t)+" ws.t="+a.t+"<br>"}}return{x:A+a.l,y:u+a.t,fixed:h,xf:A,yf:u,w:x-A,h:I-u,v:q,bcr:1}}}}},use_bcr:function(a){return 1},pos:function(K){var T=this,O=document,R=O.body;if(!K||K==R){return{x:0,y:0}}if(K.tagName=="PATH"){return T.pos_bcr(K)}if(K.tagName=="AREA"&&K.parentNode&&K.parentNode.id){return T.pos_bcr(K)}var L=0,J=0,y=0,B=0,h=0,r="",N=O.documentElement,Q=T.ws(),H="";var k=K,p=T.nav(),D=p.ff,c=p.wk,E=p.ie,f,x,g=(T.ext("bcr")&&K.getBoundingClientRect),a=T.pos.v;x=(g?T.css(K,"transform"):"");if(x&&x!="none"){return T.pos_bcr(k)}if(T.css(K,"box-sizing")=="border-box"){f=false}else{f=D||c}L=K.offsetLeft-K.scrollLeft+(f?T.cssi(K,"border-left-width"):0);r=T.css(K,"position");if(a){H+=K.tagName+" l="+L+" "+(K.className||"")+" "+r+" offsetLeft="+K.offsetLeft+" scrollLeft="+K.scrollLeft+" border-left-width="+(f?T.cssi(K,"border-left-width"):0)+"<br>"}var m=(K.tagName=="A"&&T.css(K,"display")=="inline"&&K.innerHTML.match(/<(img|div|h1|h2|h3)/i));var z,G,u,F,C,n,w;if(m){z=K.style;G=z.display;u=z.width;F=z.height;C=z.margin;n=z.marginTop;w=z.marginBottom;var j=K.parentNode,s=j.align,S=T.css(j,"text-align"),M=T.css(j,"float");var I=T.cssi(K,"padding-top"),P=T.cssi(K,"padding-bottom");z.marginTop=(-I)+"px";z.marginBottom=(-P)+"px";z.display="inline-block";if(D){L=K.offsetLeft-K.scrollLeft+(f?T.cssi(K,"border-left-width"):0);if(a){H+=K.tagName+" !FF! l="+L+" "+(K.className||"")+" "+r+" offsetLeft="+K.offsetLeft+" scrollLeft="+K.scrollLeft+" border-left-width="+(f?T.cssi(K,"border-left-width"):0)+"<br>"}}z.width=(s=="right"||s=="center"||S=="right"||S=="center"||M=="right"?"auto":"1px");z.height="auto"}J=K.offsetTop-K.scrollTop+(f?T.cssi(K,"border-top-width"):0);if(a){H+=K.tagName+" t="+J+" "+(K.className||"")+" "+r+" offsetTop="+K.offsetTop+" scrollTop="+K.scrollTop+" border-top-width="+(f?T.cssi(K,"border-top-width"):0)+"<br>"}if(m){z.display=G;z.width=u;z.height=F;z.margin=C;z.marginTop=n;z.marginBottom=w}while(K=K.offsetParent){x=(g?T.css(K,"transform"):"");if(x&&x!="none"){return T.pos_bcr(k)}var A=T.css(K,"position");if(T.css(K,"display")=="inline"&&A=="relative"&&r!="absolute"){L=T.cssi(K,"padding-left");J=T.cssi(K,"padding-top");if(a){H+=K.tagName+" RESET l="+L+" "+T.css(K,"display")+" "+A+"<br>"}if(a){H+=K.tagName+" RESET t="+J+" "+T.css(K,"display")+" "+A+"<br>"}}if(T.css(K,"box-sizing")=="border-box"){f=false}else{f=D||c}L+=K.offsetLeft+(f&&K!=R?T.cssi(K,"border-left-width"):0);J+=K.offsetTop+(f&&K!=R?T.cssi(K,"border-top-width"):0);if(A=="absolute"&&r!="fixed"){r=A}else{if(A=="relative"&&r=="absolute"){r=A}else{if(A=="fixed"){r=A}}}if(a){H+=K.tagName+" l="+L+" "+(K.className||"")+" "+A+" offsetLeft="+K.offsetLeft+" scrollLeft="+(K!=R?K.scrollLeft:0)+" border-left-width="+(f&&K!=R?T.cssi(K,"border-left-width"):0)+"<br>"}if(a){H+=K.tagName+" t="+J+" "+(K.className||"")+" "+A+" offsetTop="+K.offsetTop+" scrollTop="+(K!=R?K.scrollTop:0)+" border-top-width="+(f&&K!=R?T.cssi(K,"border-top-width"):0)+"<br>"}}while((k=k.parentNode)&&k!=R){L-=k.scrollLeft;J-=k.scrollTop}var i=false;if(r=="fixed"){h=true;y=L;B=J;L+=Q.l-(N.clientLeft||R.clientLeft||0)+T.cssi(R,"border-left-width");J+=Q.t-(N.clientTop||R.clientTop||0)+T.cssi(R,"border-top-width");if(a){H+="fixed, l+= "+(Q.l-(N.clientLeft||R.clientLeft||0)+T.cssi(R,"border-left-width"))+"<br>"}if(a){H+="fixed, t+= "+(Q.t-(N.clientTop||R.clientTop||0)+T.cssi(R,"border-top-width"))+"<br>"}}else{if(T.css(R,"position")=="relative"){if(R.getBoundingClientRect){i=true;var q=R.getBoundingClientRect();L+=q.left+Q.l;J+=q.top+Q.t;if(a){H+="body relative, l+= "+(q.left+Q.l)+"<br>"}if(a){H+="body relative, t+= "+(q.top+Q.t)+"<br>"}}else{L+=T.cssi(R,"left");J+=T.cssi(R,"top");if(a){H+="body relative, l+= "+T.cssi(R,"left")+"<br>"}if(a){H+="body relative, t+= "+T.cssi(R,"top")+"<br>"}}}}if(N&&!i&&!E&&r!="absolute"){L+=T.cssi(N,"margin-left");J+=T.cssi(N,"margin-top");if(a){H+="html margin, l+= "+T.cssi(N,"margin-left")+"<br>"}if(a){H+="html margin, t+= "+T.cssi(N,"margin-top")+"<br>"}}return{x:L,y:J,fixed:h,xf:y,yf:B,v:H}},nav:function(){var b=this;if(typeof(b.nav.v)=="undefined"){var c=navigator.userAgent.toLowerCase(),a={};a={ie:c.match(/(msie|trident)/),wk:c.match(/(chrome|safari|webkit)/)};a.ff=(c.indexOf("firefox")>-1&&!a.ie&&!a.wk);b.nav.v=a}return b.nav.v},ifr:function(b){var v=this;if(!v.ifr.c&&b){v.ifr.c=b}if(!v.ifr.init){v.ifr.init=1}else{return}var m=0,l=0,p=0,n=0,j=0,h=0,g=0,e=function(y){if(v.ifr.v){console.log(y)}},w=function(y){if(!y){y=window.event}return(y?y.target||y.srcElement:0)},c=function(A,z,y){return Math.min(Math.max(z,A),y)},r=function(D){var y=(new Date()).getTime(),z=y-g;if(z<20){return}var A=v.mpos(D),C=A.x,B=A.y;if(!g){m=C;l=B;g=y;return}var F=(C-m)/z,E=(B-l)/z;var H=(F-p)/z,G=(E-n)/z;m=C;l=B;p=(F+4*p)/5;n=(E+4*n)/5;j=(H+2*j)/3;h=(G+2*h)/3;g=y},q=function(B){var y=(new Date()).getTime(),I=y-g+20,G=10;if(I<G||(!p&&!n)){return{x:m,y:l}}var O=m,N=l,Q=p,P=n,L=j,K=h,z,D=0,C=0;var E=B.offsetWidth/2,M=B.offsetHeight/2;var A=(v.use_bcr(B)?v.pos_bcr(B):v.pos(B)),H=A.x+E,F=A.y+M;O=c(O,A.x,H+E);N=c(N,A.y,F+M);if(I>2000){I=2000}for(var J=0;J<=I;J+=G){if(E){D=O<H?Q<0:Q>0;D=D?1-Math.abs(O-H)/E:1;if(D<0){D=0}}if(M){C=N<F?P<0:P>0;C=C?1-Math.abs(N-F)/M:1;if(C<0){C=0}}z=Math.pow(1-J/I,2);L=j*z*D;K=h*z*C;Q=(Q+L*G)*z*D;P=(P+K*G)*z*C;O+=Q*G;N+=P*G}O=c(O,A.x,H+E);N=c(N,A.y,F+M);return{x:O,y:N}};var f=v.nav(),x=document,i=x.body,t=null,a=false,d=null,s=function(z){d=z;var A=q(z),y=v.url(z)||"";a=y.match(/facebook.com\/plugins\/comments.php/gi)||(y=="iframe")||(z.offsetWidth*z.offsetHeight>22500);if(v.ifr.c){v.ifr.c(z,A)}v.clk({target:z,pageX:Math.round(A.x),pageY:Math.round(A.y)});e("click "+y)},u=false,k=function(C){var z=x.activeElement;if(z&&z.tagName!="IFRAME"&&z!=i){return}var A=x.createElement("INPUT"),B=A.style,y=v.mpos(C);A.type="text";B.position="absolute";B.width=B.height="1px";B.opacity="0.01";B.left=(y.x+20)+"px";B.top=(y.y+20)+"px";i.appendChild(A);A.focus();i.removeChild(A);e("focusFF");u=true},o=function(y){if(f.ie){return}if(f.ff){k(y)}window.focus();e("focus window")};if(f.ie){v.listen("focusin",function(z){var y=w(z);if(y&&y.tagName=="IFRAME"&&y!=d){s(y)}e("focusin "+(y?y.tagName+" "+y.id:""))})}else{if(f.wk||f.ff){v.listen("mouseover",function(z){var y=w(z);if(y&&y.tagName=="IFRAME"){if(y!=t){if((f.ff&&!u)||(d&&y!=d)){o(z)}t=y;d=null}}else{if(t){if(d&&!a){o(z);d=null}t=null}}e("over "+(t?t.tagName+" "+t.id:""))});v.listen("blur",function(z){if(t){var y=w(z);if(y!=t&&y!=d&&d!=t){var A=(t==x.activeElement);if(A||!f.wk){s(t)}}e("blur "+(y?y.tagName+" "+y.id:"")+" "+x.activeElement)}else{e("blur "+x.activeElement)}},window)}}v.listen("mousemove",function(y){r(y)});v.listen("mouseover",function(y){if(w(y).tagName=="IFRAME"){r(y)}})},ws:function(c){if(c===false){delete this.ws.r}var a=this.ws.r;if(a){return a}var g=window,m=document,n=m.body,k=m.documentElement;var o=(g.innerWidth||k.clientWidth||n.clientWidth||0);var j=(g.innerHeight||k.clientHeight||n.clientHeight||0);var f=(g.pageXOffset||k.scrollLeft||n.scrollLeft||0);var p=(g.pageYOffset||k.scrollTop||n.scrollTop||0);a={l:f,t:p,r:f+o,b:p+j,w:o,h:j};if(c===true){this.ws.r=a}return a},ds:function(){var f=document,a=f.body,c=f.documentElement;return{w:Math.max(a.scrollWidth,c.scrollWidth,a.offsetWidth,c.offsetWidth,a.clientWidth,c.clientWidth),h:Math.max(a.scrollHeight,c.scrollHeight,a.offsetHeight,c.offsetHeight,a.clientHeight,c.clientHeight)}},mpos:function(b){if(!b){b=window.event}var a=this.ws();return{x:(b.clientX?b.clientX+a.l:b.pageX),y:(b.clientY?b.clientY+a.t:b.pageY)}},clean:function(a){if(typeof(a)!="string"){try{a=a.toString()}catch(c){return""}}var b=(this.ext("cleanupURL",a)||a);b=b.toLowerCase();b=b.replace(/[\s\n]+/gi,"");b=b.replace(/%20/gi,"");b=b.replace(/\/\*.*?\*\//gi,"");b=b.replace(/^function.+?{/gi,"").replace(/}$/gi,"");b=b.replace(/(\()[+](\d)/gi,"$1$2");b=b.replace(/^(document.|\s*)location.href=['"]([^'"]+)['"].*/gi,"$2");b=b.replace(/dev\./gi,"www.");b=b.replace(/(http.+?\/a\/clic\/[^\d]+\d+)([^\s]*)/gi,"$1");b=b.replace(/^(\/a\/clic\/[^\d]+\d+)([^\s]*)/gi,"$1");b=b.replace(/(http.+?\/clic\/countgo[^\d]+\d+[^\d]+\d+)([^\s]*)/gi,"$1");b=b.replace(/(http.+?\/call\/cliccommand\/\d+)([^\s]*)/gi,"$1");b=b.replace(/(http.+?\/diff\/\d+\/\d+\/.+?)(\?[^\s]*)/gi,"$1");b=b.replace(/(http.+?serving-sys.com\/.+?)(\?[^\s]*)/gi,"$1");b=b.replace(/(http.+?adtech.de\/adlink[\/\d]+AdId=\d+)([^\s]*)/gi,"$1");try{if(b.match(/^http[s]?:\/\/www\.facebook\.com[^?]+plugins/i)){b=b.match(/(^[^?]+|[?&](?:action|href|id|appid|app_id)=[^&]*)/gi).join("")}if(b.match(/^http[s]?:\/\/apis\.google\.com[^?]*\/_\//i)){b=b.match(/(^[^?]+|[?&](?:clientid|origin|url)=[^&]*)/gi).join("")}if(b.match(/^http[s]?:\/\/platform\.twitter\.com[^?]+widgets/i)){b=b.match(/(^[^#]+|[#&](?:url|text)=[^&]*)/gi).join("")}b=b.replace(/(^http[s]?[:\/\.a-z]+wufoo\.com\/embed\/[^\/]+\/)(.*)$/gi,"$1");b=b.replace(/^https/i,"http")}catch(c){}b=b.replace(/[{}"';]/gi,"");b=b.replace(/[\u25C4\u25C0]/gi,"<");b=b.replace(/[\u25BA\u25B6]/gi,">");b=b.replace(/[?&#]$/,"");return b},ext:function(h,f,d,k){if(typeof(heatmap_ext)!="undefined"){var g=heatmap_ext[h],j=typeof(g);if(j=="function"&&g.length<=3){try{return g(f,d,k)}catch(i){return null}}else{if(j!="undefined"){return g}}}},txt:function(c){if(c==document.body){return""}var b=c.tagName;if(b=="IMG"&&c.alt){return c.alt}else{if(b=="INPUT"&&c.placeholder){return c.placeholder}}var a="",d;for(d=c.firstChild;d&&a.length<300;d=d.nextSibling){switch(d.nodeType){case 3:case 4:a+=d.nodeValue;break;case 8:break;case 1:if(d.tagName=="SCRIPT"){break}default:a+=this.txt(d);break}}return a},mix:function(b,e){var a=this;var d=a.clean(b).substr(0,200);if(d&&!d.match(/^http/gi)){var c=a.txt(e);if(c){c=a.clean(c);d=d.substr(0,99);d=c.substr(0,200-d.length)+d}}return d},attr:function(b,a){return b.getAttribute?b.getAttribute(a):""},getLibEvent:function(d,a){var k,i,b,j=this;try{if(window.jQuery){var c=d,f=jQuery,h=f(d);while(c){k=(f._data||f.data)(c,"events");if(k){i=f.grep(k.vclick||k.click||[],c==d?function(l){return !l.selector}:function(l){return h.is(l.selector)});if(i.length>0){if(!a){return true}else{b=f.data(d,"url");if(b){return j.clean(b)}else{b=f.map(i,function(l){return l.handler.toString()}).join();return j.mix(b,d)}}}}c=c.parentNode}}if(window.MooTools){k=(d.retrieve?d.retrieve("events"):d.$events);if(k&&k.click){if(!a){return true}else{b=Array.map(k.click.keys,function(e){return e.toString()}).join();return j.mix(b,d)}}}if(window.Prototype){k=(Event&&Event.cache&&Event.cache[d._prototypeUID||d._eventId||(d._prototypeEventID||[])[0]]);if(k&&k.click){if(!a){return true}else{b=k.click.map(function(l){return l.handler.toString()}).join();return j.mix(b,d)}}k=d.getStorage&&d.getStorage().get("prototype_event_registry");if(k&&k.get("click")){if(!a){return true}else{return j.clean(j.txt(d)).substr(0,200)}}}if(window.angular){b=j.attr(d,"ui-sref");if(!a){return !!b}else{return j.clean(b)}}}catch(g){heatmap.log.err(g)}},fn2str:function(f,c){var b,a=this;try{if(b=f["on"+c]){return a.clean(b.toString())}else{if(b=a.attr(f,"ng-"+c)){return a.clean(b.toString())}}}catch(d){}},labelFor:function(f){var e=this.attr(f,"for");if(e){return document.getElementById(e)}var d=f.childNodes;for(var b=0,a=Math.min(d.length,10);b<a;b++){if(/(INPUT|SELECT|TEXTAREA|BUTTON)/.test(d[b].tagName)){return d[b]}}var g=f.getElementsByTagName("INPUT");if(g&&g[0]){return g[0]}},isActive:function(c){if(!c||c==document.body){return true}var a=this;if(a.fn2str(c,"mousedown")||c.hm_oldmousedown){return true}var b=c.tagName;if(a.fn2str(c,"click")){return true}if(b=="A"&&c.href){return true}if(b=="OBJECT"||b=="EMBED"){return true}if(b=="INPUT"||b=="SELECT"||b=="TEXTAREA"||b=="BUTTON"){return true}if(b=="AREA"&&c.href){return true}if(b=="IFRAME"){return true}if(b=="LABEL"&&a.labelFor(c)){return true}if(a.getLibEvent(c)){return true}if(a.ext("isActive",c)){return true}return false},url:function(b){if(b==document.body){return""}var l=this,m="",f=b.tagName,k,h;if(k=l.fn2str(b,"mousedown")){m=l.mix(k,b);if(!b.hm_oldmousedown){b.hm_oldmousedown=m}}else{if(b.hm_oldmousedown){m=b.hm_oldmousedown}else{if(k=l.fn2str(b,"click")){m=l.mix(k+(b.href?l.clean(b.href):""),b)}else{if(f=="A"&&b.href){var i=l.attr(b,"href")||b.href;if((i=="#"||i=="")&&l.getLibEvent(b)){m=l.getLibEvent(b,true)}else{m=l.clean(b.href)}}else{if(f=="OBJECT"||f=="EMBED"){var a=l.attr(b,"src")||b.src||l.attr(b,"data")||b.data;if(a){m=l.clean(a)}else{for(var j=b.firstChild;j;j=j.nextSibling){if(j.name&&j.name.toLowerCase()=="movie"){m=l.clean(j.value)}}}}else{if(f=="INPUT"||f=="SELECT"||f=="TEXTAREA"||f=="BUTTON"){var p="",d=(b.name||"");if(f=="INPUT"){p=(b.type?b.type:"")}if(d||p){m=l.clean(d+p)}if(!m&&l.getLibEvent(b)){m=l.getLibEvent(b,true)}if(!m){m="untitled"}}else{if(f=="AREA"&&b.href){m=l.clean(b.href)}else{if(f=="IFRAME"){try{m=l.clean(b.src)}catch(g){}if(!m){m="iframe"}}else{if(f=="LABEL"&&(h=l.labelFor(b))){m=l.url(h)}else{if(l.getLibEvent(b)){m=l.clean(l.ext("getURL",b)||"");if(!m){m=l.getLibEvent(b,true)}}else{if(l.ext("isActive",b)){m=l.clean(l.ext("getURL",b)||"")}else{if(b.id){m="id="+l.clean(b.id)}}}}}}}}}}}}return(m?m.replace(/[\s\n]+/gi,"").substr(0,200):"")},curl:function(F){var I=this,p=window.location,j=I.ext("getCurrentURL"),f=/^([a-z]+):\/\/([^\/]+)/i;if(j&&f.test(j)){var z=j.match(f),q=/^www\./i,o=(z&&z.length==3?z[2]:"").replace(q,""),v=p.host.replace(q,""),l=(o.length<v.length),h=(l?o:v),A=(l?v:o);if(A!=h&&A.slice(-h.length-1)!="."+h){j=j.replace(f,"$1://"+p.host)}}else{j=p.href.replace(/#(.*)$/,"")}j=j.replace(/[\s\n]+/gi,"");j=j.replace(/[?&#]$/,"");j=j.replace(/'/g,"%27");j=j.replace(/(http[^#]+)(#heatmap.*)/gi,"$1");var y="",B="",g="",c="",G;try{if(j.match(/\?/)){G=document.createElement("a");G.href=j;var k=G.search.substr(1);var H=k.split("&");H.sort();var x=["utm_source","utm_medium","utm_term","utm_campaign","utm_content","utm_referrer","utm_expid","gclid","_ga","fbclid"];var r=["fus","fum","fut","fuc","fuo"];var w=H.length,u=r.length;var b=(Array.prototype.indexOf?function(a,e){return a.indexOf(e)}:function(a,t){for(var m=0,e=a.length;m<e;m++){if(a[m]===t){return m}}return -1});for(var C=0;C<w;C++){var E=H[C].split("=");var d=b(x,E[0].toLowerCase());if(d>=0){if(F&&d<u){y+="&"+r[d]+"="+E[1]}}else{B+=(B?"&":"")+H[C]}}G.search=(B?"?"+B:"");j=G.href;if(!B){j=j.replace(/(?:[?&])(#|$)/,"$1")}}if(F){g=document.referrer;if(g){G=document.createElement("a");G.href=g;g=G.hostname;y+="&fr="+encodeURIComponent(g)}var J=I.ext("getTemplates",j),n=(J?J.length:0),s;if(n){for(var C=0;C<n;C++){s=J[C];if(s&&s.name&&(s.value||s.on)){c+=(c?".":"")+I.h(s.name)}}}}}catch(D){heatmap.log.err(D)}return F?{url:j,filter:y,referrer:g,templates:c||"."}:j},query:function(d){var b=this,c="",a="";for(a in d){if(d.hasOwnProperty&&!d.hasOwnProperty(a)){continue}if(d[a]===""){continue}c+=(c?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(typeof(d[a])=="object"?b.query(d[a]):d[a])}return c},conv:function(b,e){var g=this,a=0,l=g.ext("getConversions",b,e),j={},c="",h;if(l){if(l.length){for(var d=0,f=l.length;d<f;d++){c=l[d].name;h=parseFloat(l[d].value);if(!isNaN(h)&&h){j[c]=h;a++}}}else{for(c in l){if(l.hasOwnProperty&&!l.hasOwnProperty(c)){continue}h=parseFloat(l[c]);if(!isNaN(h)&&h){j[c]=h;a++}}}}return(a?j:"")},sid:function(n){var o=this,a=o.ext("getSessionName"),k;if(!a){return""}a=a.replace(/[^a-zA-Z_]/g,"");if(!o.sid.id){k=document.cookie.match(new RegExp(a+"[^;]*=[^;]*\\d+_\\d+[^;]*","gi"));if(k){var f=k[0].match(/\d+/gi);o.sid.id=f[0];o.sid.n=f[1]}}if(!o.sid.id){o.sid.id=1+Math.floor(Math.random()*2147483646);o.sid.n=0;n=true}if(n){o.sid.n++;k=o.sid.id+"_"+o.sid.n;var l=new RegExp(a+"[^;]*=[^;]*"+k,"gi");var e=new Date();e.setTime(e.getTime()+1800000);var b=window.location.hostname.split(".").reverse(),j,h;for(j=b[0],h=1;h<b.length;h++){try{j=b[h]+"."+j;document.cookie=a+"="+k+"; expires="+e.toGMTString()+"; path=/; domain="+j;if(document.cookie.match(l)){break}}catch(g){}}}return o.sid.id+"_"+o.sid.n},isDisabled:function(c){var a=this;if(a.disabled){return true}var b=a.ext("recordDisabled")||a.ext("logDisabled");return(b=="pv"?b==c:b)},pv:function(d){var b=this;var a=b.curl(true);if(b.isDisabled("pv")){b.ourl=a}if(!b.ourl||b.ourl.url!=a.url){b.ourl=a;b.lastEvent=null;b.lastTime=0;b.lastTarget=null;b.logs=[];b.logs[0]={i1:new Image()};var g=b.ext("getTitle")||document.title,f={pid:heatmap.property_id||0,u:a.url,tpl:a.templates,sid:b.sid(true),conv:b.conv(a.url),pw:b.ext("getAuthor")||"",pt:(g?g.substr(0,200):""),debug:(b.debug?1:""),t:Math.floor(999999*Math.random())};b.logs[0].i1.src="//"+heatmap.dom_api+"/log/pv?"+b.query(f)+a.filter}if(!d){d=window.event}if(d){var c=(d.target||d.srcElement);if(c){c=b.target(c);if(c&&c.onmousedown&&!c.hm_oldmousedown){b.url(c)}}}},clk:function(r){var s=this;if(s.isDisabled()){return}if(!s.ourl){s.pv()}if(!r){r=window.event}if(!r||r==s.lastEvent){return}s.lastEvent=r;var k=(r.target||r.srcElement);if(!k){return}var n=(new Date()).getTime();if(s.lastTarget==k&&(n-(s.lastTime||0))<500){return}s.lastTarget=k;s.lastTime=n;var l=s.mpos(r),j=l.x,h=l.y;var i=s.target(k);if(i==document.body){var a=s.ws();if(Math.abs(a.r-j)<20||Math.abs(a.b-h)<20){return}var p=s.ext("align");if(!p||p=="center"){h=-h;j-=Math.floor(Math.max(a.w,s.ds().w)/2)}}var m,d="",c=0;try{m=(s.use_bcr(i)?s.pos_bcr(i):s.pos(i))}catch(q){m={x:0,y:0};d=q.message||q.toString()}var o=s.trou(i);if(m.bcr&&i!=document.body){c=100000;if(Math.random()<0.1&&i.tagName!="SELECT"){if(!m.w||!m.h){d="bcr flat"}if(d){d+=" "+s.h(o.r+"|"+o.u)}}}var b=(new Date()).getTime();if((s.maxTime||-1)<(b-n)){s.maxTime=(b-n)}if(o.t){var g=s.logs.length;var f={pid:heatmap.property_id||0,u:s.ourl.url,sid:s.sid(),dpath:o.path,durl:o.url,dt:o.t,dr:o.r,"do":o.o,du:o.u,mx:Math.round(j-m.x)+c,my:Math.round(h-m.y),mn:g,mt:s.maxTime,conv:s.conv(s.ourl.url,i),debug:(s.debug?1:""),t:Math.floor(999999*Math.random())};if(d){f.err=d.substr(0,50)}s.logs[g]={i1:new Image()};s.logs[g].i1.src="//"+heatmap.dom_api+"/log/clk?"+s.query(f)+s.ourl.filter}else{}if(!s.ourl||s.ourl.url!=s.curl()){s.pv()}},target:function(d){var b=this,c=d,a=document.body;while(c&&!b.isActive(c)){c=c.parentNode}if(c==a){c=d;while(c&&!c.id&&c!=a){c=c.parentNode}}return c},cook:function(g){var i=this,a=(window.location.hash||""),d=i.h(a);if(g||i.cook.h!=d){i.cook.h=d;var e=17947688,b=1229391198,k=-634150890,j=i.h(navigator.userAgent.substr(12,19));if(g||d==e||d==b){i.cook.v=Math.round(((new Date()).getTime()-(new Date("01/01/2016")).getTime())/1000);if(d==b){i.cook.s=a.substr(9)}}else{if(j==k){i.cook.v=Math.round(((new Date()).getTime()-(new Date("01/01/2016")).getTime())/1000);i.cook.s="heatmap.me/scrn"}else{var f=document.cookie.match(/hmuicdmm[^;]*=[^;]*start\d+[^;]*/gi);if(f){i.cook.v=f[0].match(/\d+/gi)[0];i.cook.s=f[0].match(/[^\d]+$/gi,"");i.cook.s=(i.cook.s?i.cook.s[0]:"")}}}}return(i.cook.v?{v:i.cook.v,d3v:i.cook.s}:null)},keydown:function(c){var b=this;if(b.ext("altShiftH")===false){return}if(!c){c=window.event}if(!c){return}var a=String.fromCharCode(c.keyCode);if(a){a=(c.altKey?"ALT-":"")+(c.ctrlKey?"CTRL-":"")+(c.metaKey?"META-":"")+(c.shiftKey?"SHIFT-":"")+a;if(a&&b.h(a)==1575243174){b.startui()}}},load:function(c){var d=navigator.userAgent.toLowerCase(),b=(d.indexOf("msie")!=-1)?parseInt(d.split("msie")[1]):false,a=function(){var f=document.createElement("script");f.type="text/javascript";f.async=true;f.src=c;var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(f,e)};if(b&&b<9){window.setTimeout(a,1)}else{a()}},startui:function(){var a=this;if(heatmap.sidebar){heatmap.sidebar.toggleAll()}else{if(!a.disabled){var b=a.cook();if(!b){b=a.cook(1)}a.load("//"+(b.d3v||"u.heatmap.it/ui.js")+"?v="+b.v)}}a.disabled=true},listen:function(c,b,d){var a=function(g,f,k,j,i){try{return b(g,f,k,j,i)}catch(h){heatmap.log.err(h)}};if(!d){d=document}if(d.addEventListener){d.addEventListener(c,a,true)}else{if(d.attachEvent){d.attachEvent("on"+c,a)}}},err:function(b,n,d,h,g){if(!b){return}if(heatmap.property_id!=42260){return}if(!g&&typeof b!="string"){g=b.error||b}var k=this;if(!k.err.i){k.err.i=[]}else{if(k.err.i.length>10){return}}var j=(g?g.stack||(g.error||{}).stack:"")||"";var f=new Image(),a={u:k.curl(),m:j||(g?g.message||g.description:"")||b.message||b.type+JSON.stringify(b)||b||"",p:(g?g.file||g.fileName||g.filename:"")||n||(b.target||{}).src||"",l:(g?g.line||g.lineNumber||g.lineno:0)||d||0,t:Math.floor(999999*Math.random())};a.m=(""+a.m).replace(/[\n\r\s]/g," ").replace(/\s{2,}/g," ").replace(/(^\s|\s$)/g,"");if(!a.m||(/(^Script error|isTrusted=true)/i).test(a.m)){return}f.src="//"+heatmap.dom_api+"/log/err?"+k.query(a);k.err.i.push(f)},conf:function(){var a=this,b=a.cook();if(a.confed){return}else{a.confed=true}if(b&&b.d3v){a.startui()}else{if(!(/\b(googlebot|mediapartners|adsbot|bot)\b/i).test(navigator.userAgent)){a.load("//u.heatmap.it/conf/"+window.location.hostname+".js")}}a.listen("keydown",function(c){return a.keydown(c)})},start:function(a,c){var b=this;heatmap.dom_api=(c||"eu1")+".heatmap.it";if(!a){return}else{heatmap.property_id=a}if(b.started){return}else{b.started=true}if(b.cook()){b.startui()}else{b.pv();b.listen("mouseover",function(d){b.pv(d)});b.listen("mousedown",function(d){b.clk(d)});b.ifr();b.listen("hashchange",function(d){b.pv()});window.setInterval(function(){try{var e=window.location.href;if(b.loc!=e){if(b.loc){b.pv()}b.loc=e}}catch(d){heatmap.log.err(d)}},1000)}}}}heatmap.log.conf();