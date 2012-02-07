/*!
 * NWMatcher 1.2.3beta - Fast CSS3 Selector Engine
 * Copyright (C) 2007-2010 Diego Perini
 * See http://nwbox.com/license
 */
(function(s){var ct='nwmatcher-1.2.3beta',i=s.document,n=i.documentElement,M=Array.prototype.slice,bn='',B='',bo='',bp='',U=false,N=false,bq=i,br=i,V='[.:#]?',bK='([~*^$|!]?={1})',x='[\\x20\\t\\n\\r\\f]*',bL='[\\x20]|[>+~][^>+~]',bM='[-+]?\\d*n?[-+]?\\d*',W='"[^"]*"'+"|'[^']*'",p='(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)+',C='(?:-?[_a-zA-Z]{1}[-\\w]*|[^\\x00-\\xa0]+|\\\\.+)',F=x+'('+p+':?'+p+')'+x+'(?:'+bK+x+'('+W+'|'+C+'))?'+x,X='((?:'+bM+'|'+W+'|'+V+'|'+p+'|\\['+F+'\\]|\\(.+\\)|'+x+'|,)+)',bN=".+",Y="(?=\s*[^>+~(){}<>])(\\*|(?:"+V+C+")|"+bL+"|\\["+F+"\\]|\\("+X+"\\)|\\{"+bN+"\\}|,)+",O=new RegExp(Y,"g"),bO=Y.replace(X,'.*'),P=new RegExp("^"+x+"|"+x+"$","g"),bP=new RegExp("^((?!:not)("+V+"|"+C+"|\\([^()]*\\))+|\\["+F+"\\])$"),bQ='\\([^()]+\\)|\\(.*\\)',bR='\\{[^{}]+\\}|\\{.*\\}',bS='\\[[^[\\]]*\\]|\\[.*\\]',Z='\\[.*\\]|\\(.*\\)|\\{.*\\}',ba=new RegExp("([^(,)\\\\\\[\\]]+|\\[(?:"+bS+"|"+W+"|[^\\[\\]]+)+\\]|"+bQ+"|"+bR+"|\\\\.)+","g"),bT=new RegExp("(\\("+X+"\\)|\\["+F+"\\]|[^\x20>+~]|\\\\.)+","g"),bs=new RegExp("("+C+")"),cu=new RegExp("#("+C+")"),bt=/[\x20\t\n\r\f]+/g,bU=/^\s*[>+~]{1}/,bV=/[>+~]{1}\s*$/,y=(function(){var k=(s.open+'').replace(/open/g,'');return function(b,a){var c=b?b[a]:false,f=new RegExp(a,'g');return!!(c&&typeof c!='string'&&k===(c+'').replace(f,''))}})(),G=function(c){return typeof c.compatMode=='string'?c.compatMode.indexOf('CSS')<0:(function(){var b=c.createElement('div'),a=b.style&&(b.style.width=1)&&b.style.width!='1px';b=null;return!a})()},Q='xmlVersion'in i?function(b){return!!b.xmlVersion||(/xml$/).test(b.contentType)||!(/html/i).test(b.documentElement.nodeName)}:function(b){return b.firstChild.nodeType==7&&(/xml/i).test(b.firstChild.nodeName)||!(/html/i).test(b.documentElement.nodeName)},H=G(i),o=Q(i),bW=y(i,'hasFocus'),bb=y(i,'querySelector'),bX=y(i,'getElementById'),bY=y(n,'getElementsByTagName'),bu=y(n,'getElementsByClassName'),bZ=y(n,'getAttribute'),ca=y(n,'hasAttribute'),bc=(function(){var b=false,a=n.id;n.id='length';try{b=!!M.call(i.childNodes,0)[0]}catch(e){}n.id=a;return b})(),bv='nextElementSibling'in n&&'previousElementSibling'in n,cb=bX?(function(){var b=true,a='x'+String(+new Date),c=i.createElementNS?'a':'<a name="'+a+'">';(c=i.createElement(c)).name=a;n.insertBefore(c,n.firstChild);b=!!i.getElementById(a);n.removeChild(c);c=null;return b})():true,bw=bY?(function(){var b,a=i.createElement('div');a.appendChild(i.createComment(''));b=a.getElementsByTagName('*')[0];a.removeChild(a.firstChild);a=null;return!!b})():true,bx=bu?(function(){var b,a=i.createElement('div'),c='\u53f0\u5317';a.appendChild(i.createElement('span')).setAttribute('class',c+'abc '+c);a.appendChild(i.createElement('span')).setAttribute('class','x');b=!a.getElementsByClassName(c)[0];a.lastChild.className=c;if(!b)b=a.getElementsByClassName(c).length!==2;a.removeChild(a.firstChild);a.removeChild(a.firstChild);a=null;return b})():true,cc=bZ?(function(){var b,a;(a=i.createElement('input')).setAttribute('value','5');return b=a.defaultValue!=5})():true,by=ca?(function(){var b,a=i.createElement('option');a.setAttribute('selected','selected');b=!a.hasAttribute('selected');return b})():true,cd=bb?(function(){var b=[],a=i.createElement('div'),c;a.appendChild(i.createElement('p')).setAttribute('class','xXx');a.appendChild(i.createElement('p')).setAttribute('class','xxx');if(G(i)&&(a.querySelectorAll('[class~=xxx]').length!=2||a.querySelectorAll('.xXx').length!=2)){b.push('(?:\\[[\\x20\\t\\n\\r\\f]*class\\b|\\.'+C+')')}a.removeChild(a.firstChild);a.removeChild(a.firstChild);a.appendChild(i.createElement('p')).setAttribute('class','');try{a.querySelectorAll('[class^=""]').length===1&&b.push('\\[\\s*.*(?=\\^=|\\$=|\\*=).*]')}catch(e){}a.removeChild(a.firstChild);c=i.createElement('input');c.setAttribute('type','checkbox');c.setAttribute('checked','checked');a.appendChild(c);try{a.querySelectorAll(':checked').length!==1&&b.push(':checked')}catch(e){}a.removeChild(a.firstChild);(c=i.createElement('input')).setAttribute('type','hidden');a.appendChild(c);try{a.querySelectorAll(':enabled').length===1&&b.push(':enabled',':disabled')}catch(e){}a.removeChild(a.firstChild);a.appendChild(i.createElement('a')).setAttribute('href','x');a.querySelectorAll(':link').length!==1&&b.push(':link');a.removeChild(a.firstChild);if(by){b.push('\\[\\s*value','\\[\\s*ismap','\\[\\s*checked','\\[\\s*disabled','\\[\\s*multiple','\\[\\s*readonly','\\[\\s*selected')}a=null;return b.length?new RegExp(b.join('|')):{'test':function(){return false}}})():true,ce=new RegExp(!(bw&&bx)?'^(?:\\*|[.#]?-?[_a-zA-Z]{1}'+p+')$':'^#?-?[_a-zA-Z]{1}'+p+'$'),cf={'a':1,'A':1,'area':1,'AREA':1,'link':1,'LINK':1},cg={'9':1,'11':1},ch={checked:1,disabled:1,ismap:1,multiple:1,readonly:1,selected:1},R={value:'defaultValue',checked:'defaultChecked',selected:'defaultSelected'},bz={'class':'className','for':'htmlFor'},ci={'action':2,'cite':2,'codebase':2,'data':2,'href':2,'longdesc':2,'lowsrc':2,'src':2,'usemap':2},bA={'class':0,'accept':1,'accept-charset':1,'align':1,'alink':1,'axis':1,'bgcolor':1,'charset':1,'checked':1,'clear':1,'codetype':1,'color':1,'compact':1,'declare':1,'defer':1,'dir':1,'direction':1,'disabled':1,'enctype':1,'face':1,'frame':1,'hreflang':1,'http-equiv':1,'lang':1,'language':1,'link':1,'media':1,'method':1,'multiple':1,'nohref':1,'noresize':1,'noshade':1,'nowrap':1,'readonly':1,'rel':1,'rev':1,'rules':1,'scope':1,'scrolling':1,'selected':1,'shape':1,'target':1,'text':1,'type':1,'valign':1,'valuetype':1,'vlink':1},cj={'accept':1,'accept-charset':1,'alink':1,'axis':1,'bgcolor':1,'charset':1,'codetype':1,'color':1,'enctype':1,'face':1,'hreflang':1,'http-equiv':1,'lang':1,'language':1,'link':1,'media':1,'rel':1,'rev':1,'target':1,'text':1,'type':1,'vlink':1},z={},S={'=':"n=='%m'",'^=':"n.indexOf('%m')==0",'*=':"n.indexOf('%m')>-1",'|=':"(n+'-').indexOf('%m-')==0",'~=':"(' '+n+' ').indexOf(' %m ')>-1",'$=':"n.substr(n.length-'%m'.length)=='%m'"},D={ID:new RegExp("^#("+p+")|"+Z),TAG:new RegExp("^("+p+")|"+Z),CLASS:new RegExp("^\\.("+p+"$)|"+Z),NAME:/\[\s*name\s*=\s*((["']*)([^'"()]*?)\2)?\s*\]/},q={spseudos:/^\:(root|empty|nth)?-?(first|last|only)?-?(child)?-?(of-type)?(?:\(([^\x29]*)\))?(.*)/,dpseudos:/^\:([\w]+|[^\x00-\xa0]+)(?:\((["']*)(.*?(\(.*\))?[^'"()]*?)\2\))?(.*)/,attribute:new RegExp("^\\["+F+"\\](.*)"),children:/^[\x20\t\n\r\f]*\>[\x20\t\n\r\f]*(.*)/,adjacent:/^[\x20\t\n\r\f]*\+[\x20\t\n\r\f]*(.*)/,relative:/^[\x20\t\n\r\f]*\~[\x20\t\n\r\f]*(.*)/,ancestor:/^[\x20\t\n\r\f]+(.*)/,universal:/^\*(.*)/,id:new RegExp("^#("+p+")(.*)"),tagName:new RegExp("^("+p+")(.*)"),className:new RegExp("^\\.("+p+")(.*)")},bB={Structural:{'root':3,'empty':3,'nth-child':3,'nth-last-child':3,'nth-of-type':3,'nth-last-of-type':3,'first-child':3,'last-child':3,'only-child':3,'first-of-type':3,'last-of-type':3,'only-of-type':3},Others:{'link':3,'visited':3,'target':3,'lang':3,'not':3,'active':3,'focus':3,'hover':3,'checked':3,'disabled':3,'enabled':3}},ck=function(b,a){var c=-1,f;if(b.length===0&&Array.slice)return Array.slice(a);while((f=a[++c]))b[b.length]=f;return b},bC=function(b,a,c){var f=-1,k;while((k=a[++f]))c(b[b.length]=k);return b},bd=function(b,a){var c=-1,f=null;while((f=a[++c])){if(f.getAttribute('id')==b){break}}return f},I=!cb?function(b,a){a||(a=i);b=b.replace(/\\/g,'');if(o||a.nodeType!=9){return bd(b,a.getElementsByTagName('*'))}return a.getElementById(b)}:function(b,a){var c=null;a||(a=i);b=b.replace(/\\/g,'');if(o||a.nodeType!=9){return bd(b,a.getElementsByTagName('*'))}if((c=a.getElementById(b))&&c.name==b&&a.getElementsByName){return bd(b,a.getElementsByName(b))}return c},cl=function(b,a){var c=b=='*',f=a,k=[],j=f.firstChild;c||(b=b.toUpperCase());while((f=j)){if(f.tagName>'@'&&(c||f.tagName.toUpperCase()==b)){k[k.length]=f}if(j=f.firstChild||f.nextSibling)continue;while(!j&&(f=f.parentNode)&&f!=a){j=f.nextSibling}}return k},A=!bw&&bc?function(b,a){a||(a=i);return M.call(a.getElementsByTagName?a.getElementsByTagName(b):cl(b,a),0)}:function(b,a){var c=-1,f=[],k,j=(a||i).getElementsByTagName(b);if(b=='*'){var g=-1;while((k=j[++c])){if(k.nodeName>'@')f[++g]=k}}else{while((k=j[++c])){f[c]=k}}return f},bD=function(b,a){return be('[name="'+b.replace(/\\/g,'')+'"]',a||i)},J=!bx&&bc?function(b,a){return M.call((a||i).getElementsByClassName(b.replace(/\\/g,'')),0)}:function(b,a){a||(a=i);var c=-1,f=c,k=[],j,g=A('*',a),h=a.ownerDocument||a,d=G(h),m=Q(h),r=d?b.toLowerCase():b;b=' '+r.replace(/\\/g,'')+' ';while((j=g[++c])){r=m?j.getAttribute('class'):j.className;if(r&&r.length&&(' '+(d?r.toLowerCase():r).replace(bt,' ')+' ').indexOf(b)>-1){k[++f]=j}}return k},cm='compareDocumentPosition'in n?function(b,a){return(b.compareDocumentPosition(a)&16)==16}:'contains'in n?function(b,a){return b!==a&&b.contains(a)}:function(b,a){while((a=a.parentNode)){if(a===b)return true}return false},cn=function(b){var a=0,c,f=b[t]||(b[t]=++T);if(!K[f]){c={};b=b.firstChild;while(b){if(b.nodeName>'@'){c[b[t]||(b[t]=++T)]=++a}b=b.nextSibling}c.length=a;K[f]=c}return K[f]},co=function(b,a){var c=0,f,k=b[t]||(b[t]=++T);if(!w[k]||!w[k][a]){f={};b=b.firstChild;while(b){if(b.nodeName.toUpperCase()==a){f[b[t]||(b[t]=++T)]=++c}b=b.nextSibling}f.length=c;w[k]||(w[k]={});w[k][a]=f}return w[k]},bE=!cc?function(b,a){return b.getAttribute(a)||''}:function(b,a){a=a.toLowerCase();if(R[a]in b){return b[R[a]]||''}return(ci[a]?b.getAttribute(a,2)||'':ch[a]?b.getAttribute(a)?a:'':((b=b.getAttributeNode(a))&&b.value)||'')},bf=!by?function(b,a){return b.hasAttribute(a)}:function(b,a){a=a.toLowerCase();a=a in bz?bz[a]:a;if(R[a]in b){return!!b[R[a]]}b=b.getAttributeNode(a);return!!(b&&(b.specified||b.nodeValue))},cp=function(b){b=b.firstChild;while(b){if(b.nodeType==3||b.nodeName>'@')return false;b=b.nextSibling}return true},cq=function(b){return bf(b,'href')&&cf[b.nodeName]},cr=function(b,a){return E(b,'',a||false)},cs=function(b){for(var a in b){if(a=='VERBOSITY'){bF=!!b[a]}else if(a=='SIMPLENOT'){bG=!!b[a];bg={};bh={};bi={};bj={};bk=false;O=new RegExp(bO,"g")}else if(a=='SHORTCUTS'){bH=!!b[a]}else if(a=='USE_QSAPI'){bk=!!b[a]&&bb;O=new RegExp(Y,"g")}}},u=function(b){if(bF){if(typeof s.DOMException!=='undefined'){var a=new Error();a.name='SYNTAX_ERR';a.message='(Selectors) '+b;a.code=12;throw a;}else{throw new Error(12,'SYNTAX_ERR: (Selectors) '+b);}}else{var c=s.console;if(c&&c.log){c.log(b)}else{if(/exception/i.test(b)){s.status=b;s.defaultStatus=b}else{s.status+=b}}}},bG=true,bH=false,bF=true,bk=bb,bl='f&&f(c[k]);r[r.length]=c[k];continue main;',bI=i.createElement('nAv').nodeName=='nAv'?'.toUpperCase()':'',E=function(b,a,c){var f=-1,k={},j,g;if((j=b.match(ba))){while((g=j[++f])){g=g.replace(P,'');if(!k[g]){k[g]=true;a+=f>0?(c?'e=c[k];':'e=k;'):'';a+=L(g,c?bl:'f&&f(k);return true;')}}}if(c){return new Function('c,s,r,d,h,g,f','var N,n,x=0,k=-1,e;main:while(e=c[++k]){'+a+'}return r;')}else{return new Function('e,s,r,d,h,g,f','var N,n,x=0,k=e;'+a+'return false;')}},L=function(b,a){var c,f,k,j,g,h,d,m,r,v,l;g=0;while(b){if((d=b.match(q.universal))){c=true}else if((d=b.match(q.id))){a='if('+(o?'s.getAttribute(e,"id")':'(e.submit?s.getAttribute(e,"id"):e.id)')+'=="'+d[1]+'"){'+a+'}'}else if((d=b.match(q.tagName))){a='if(e.nodeName'+(o?'=="'+d[1]+'"':bI+'=="'+d[1].toUpperCase()+'"')+'){'+a+'}'}else if((d=b.match(q.className))){a='if((n='+(o?'s.getAttribute(e,"class")':'e.className')+')&&n.length&&(" "+'+(H?'n.toLowerCase()':'n')+'.replace('+bt+'," ")+" ").indexOf(" '+(H?d[1].toLowerCase():d[1])+' ")>-1){'+a+'}'}else if((d=b.match(q.attribute))){if(d[3])d[3]=d[3].replace(/^\x22|\x22$/g,'').replace(/^\x27|\x27$/g,'');h=d[1].split(':');h=h.length==2?h[1]:h[0]+'';if(d[2]&&!S[d[2]]){u('Unsupported operator in attribute selectors "'+b+'"');return''}if(d[2]&&d[3]&&(l=S[d[2]])){bA['class']=H?1:0;d[3]=d[3].replace(/\\([0-9a-f]{2,2})/,'\\x$1');v=(o?cj:bA)[h.toLowerCase()];l=l.replace(/\%m/g,v?d[3].toLowerCase():d[3])}else{v=false;l=d[2]=='='?'n==""':'false'}h='n=s.'+(d[2]?'get':'has')+'Attribute(e,"'+d[1]+'")'+(v?'.toLowerCase();':';');a=h+'if('+(d[2]?l:'n')+'){'+a+'}'}else if((d=b.match(q.adjacent))){g++;a=bv?'var N'+g+'=e;if(e&&(e=e.previousElementSibling)){'+a+'}e=N'+g+';':'var N'+g+'=e;while(e&&(e=e.previousSibling)){if(e.nodeName>"@"){'+a+'break;}}e=N'+g+';'}else if((d=b.match(q.relative))){g++;a=bv?('var N'+g+'=e;e=e.parentNode.firstElementChild;while(e&&e!=N'+g+'){'+a+'e=e.nextElementSibling}e=N'+g+';'):('var N'+g+'=e;e=e.parentNode.firstChild;while(e&&e!=N'+g+'){if(e.nodeName>"@"){'+a+'}e=e.nextSibling}e=N'+g+';');}else if((d=b.match(q.children))){g++;a='var N'+g+'=e;if(e&&e!==h&&e!==g&&(e=e.parentNode)){'+a+'}e=N'+g+';';}else if((d=b.match(q.ancestor))){g++;a='var N'+g+'=e;while(e&&e!==h&&e!==g&&(e=e.parentNode)){'+a+'}e=N'+g+';';}else if((d=b.match(q.spseudos))&&bB.Structural[b.match(bs)[0]]){switch(d[1]){case'root':a='if(e===h){'+a+'}';break;case'empty':a='if(s.isEmpty(e)){'+a+'}';break;default:if(d[1]&&d[5]){if(d[5]=='n'){a='if(e!==h){'+a+'}';break;}else if(d[5]=='even'){f=2;k=0;}else if(d[5]=='odd'){f=2;k=1;}else{k=((j=d[5].match(/(-?\d+)$/))?parseInt(j[1],10):0);f=((j=d[5].match(/(-?\d*)n/))?parseInt(j[1],10):0);if(j&&j[1]=='-')f=-1;}l=d[4]?'n[N]':'n';h=d[2]=='last'&&k>=0?l+'.length-('+(k-1)+')':k;l=l+'[e.'+t+']';v=k<1&&f>1?'('+l+'-('+h+'))%'+f+'==0':f>+1?(d[2]=='last')?'('+l+'-('+h+'))%'+f+'==0':l+'>='+h+'&&('+l+'-('+h+'))%'+f+'==0':f<-1?(d[2]=='last')?'('+l+'-('+h+'))%'+f+'==0':l+'<='+h+'&&('+l+'-('+h+'))%'+f+'==0':f===0?l+'=='+h:(d[2]=='last')?f==-1?l+'>='+h:l+'<='+h:f==-1?l+'<='+h:l+'>='+h;a=(d[4]?'N=e.nodeName'+bI+';':'')+'if(e!==h){n=s.getIndexesBy'+(d[4]?'NodeName':'NodeType')+'(e.parentNode'+(d[4]?',N':'')+');if('+v+'){'+a+'}}';}else{f=d[2]=='first'?'previous':'next';j=d[2]=='only'?'previous':'next';k=d[2]=='first'||d[2]=='last';l=d[4]?'&&n.nodeName!=e.nodeName':'&&n.nodeName<"@"';a='if(e!==h){'+('n=e;while((n=n.'+f+'Sibling)'+l+');if(!n){'+(k?a:'n=e;while((n=n.'+j+'Sibling)'+l+');if(!n){'+a+'}')+'}')+'}';}break;}}else if((d=b.match(q.dpseudos))&&bB.Others[b.match(bs)[0]]){switch(d[1]){case'not':h=d[3].replace(P,'');if(bG&&!bP.test(h)){u('Negation pseudo-class only accepts simple selectors "'+b+'"');return'';}else{if('compatMode'in i){a='N='+E(h,'',false)+'(e,s,r,d,h,g);if(!N){'+a+'}';}else{a='if(!s.match(e, "'+h.replace(/\x22/g,'\\"')+'",r)){'+a+'}';}}break;case'checked':a='if(((typeof e.form!=="undefined"&&(/radio|checkbox/i).test(e.type))||/option/i.test(e.nodeName))&&(e.checked||e.selected)){'+a+'}';break;case'enabled':a='if(((typeof e.form!=="undefined"&&!(/hidden/i).test(e.type))||s.isLink(e))&&!e.disabled){'+a+'}';break;case'disabled':a='if(((typeof e.form!=="undefined"&&!(/hidden/i).test(e.type))||s.isLink(e))&&e.disabled){'+a+'}';break;case'lang':v='';if(d[3])v=d[3].substr(0,2)+'-';a='do{(n=e.lang||"").toLowerCase();if((n==""&&h.lang=="'+d[3].toLowerCase()+'")||(n&&(n=="'+d[3].toLowerCase()+'"||n.substr(0,3)=="'+v.toLowerCase()+'"))){'+a+'break;}}while((e=e.parentNode)&&e!==g);';break;case'target':j=i.location?i.location.hash:'';if(j){a='if(e.id=="'+j.slice(1)+'"){'+a+'}';}break;case'link':a='if(s.isLink(e)&&!e.visited){'+a+'}';break;case'visited':a='if(s.isLink(e)&&e.visited){'+a+'}';break;case'active':if(o)break;a='if(e===d.activeElement){'+a+'}';break;case'hover':if(o)break;a='if(e===d.hoverElement){'+a+'}';break;case'focus':if(o)break;a=bW?'if(e===d.activeElement&&d.hasFocus()&&(e.type||e.href)){'+a+'}':'if(e===d.activeElement&&(e.type||e.href)){'+a+'}';break;default:break;}}else{h=false;r=true;for(h in z){if((d=b.match(z[h].Expression))){m=z[h].Callback(d,a);a=m.source;r=m.status;if(r)break;}}if(!r){u('Unknown pseudo-class selector "'+b+'"');return'';}if(!h){u('Unknown token in selector "'+b+'"');return'';}}if(!d){u('Invalid syntax in selector "'+b+'"');return'';}b=d&&d[d.length-1];}return a;},bm=function(b,a,c,f){var k,j,g;if(!b||b.nodeName<'A'||!a)return false;if(c&&c.nodeType==1){if(!cm(c,b))return false;}a=a.replace(P,'');c||(c=i);if(bq!=c){bq=c;n=(i=b.ownerDocument||b).documentElement;H=G(i);o=Q(i);}if(k=bo!=a){if((j=a.match(O))&&j[0]==a){bo=a;U=(j=a.match(ba)).length<2;}else{u('The string "'+a+'", is not a valid CSS selector');return false;}}if(o&&!(g=bj[a])){g=bj[a]=U?new Function('e,s,r,d,h,g,f','var N,n,x=0,k=e;'+L(a,'f&&f(k);return true;')+'return false;'):E(a,'',false);}else if(!(g=bi[a])){g=bi[a]=U?new Function('e,s,r,d,h,g,f','var N,n,x=0,k=e;'+L(a,'f&&f(k);return true;')+'return false;'):E(a,'',false);}K={};w={};return g(b,bJ,[],i,n,c||i,f);},be=function(b,a,c){var f,k,j,g,h,d,m;if(arguments.length===0){u('Missing required selector parameters');return[];}else if(b===''){u('Empty selector string');return[];}else if(typeof b!='string'){return[];}b=b.replace(P,'');a||(a=i);if(bH){if(bU.test(b)){b=a.nodeType==9?'* '+b:a.id?'#'+a.id+' '+b:b;}if(bV.test(b)){b=b+' *';}}if(ce.test(b)){switch(b.charAt(0)){case'#':if((j=I(b.slice(1),a))){c&&c(j);return[j];}return[];case'.':g=J(b.slice(1),a);break;default:g=A(b,a);break;}return c?bC([],g,c):g;}if(bk&&!cd.test(b)&&cg[a.nodeType]){bn=null;try{g=a.querySelectorAll(b);}catch(e){bn=e;if(b==='')throw e;}if(g){switch(g.length){case 0:return[];case 1:j=g.item(0);c&&c(j);return[j];default:return c?bC([],g,c):bc?M.call(g):ck([],g);}}}if(br!=a){br=a;n=(i=a.ownerDocument||a).documentElement;H=G(i);o=Q(i);}if(k=bp!=b){if((h=b.match(O))&&h[0]==b){bp=b;N=(h=b.match(ba)).length<2;}else{u('The string "'+b+'", is not a valid CSS selector');return[];}}if(N&&a.nodeType!=11){if(k){h=b.match(bT);m=h[h.length-1];B=m.split(':not')[0];}if((h=B.match(D.ID))&&(m=h[1])){if((j=I(m,a))){if(bm(j,b)){c&&c(j);return[j];}}return[];}else if((h=b.match(D.ID))&&(m=h[1])){if((j=I(m,i))){if(/[>+~]/.test(b)){a=j.parentNode;}else{b=b.replace('#'+m,'*');a=j;}}else return[];}if(bu){if((h=B.match(D.CLASS))&&(m=h[1])){if((g=J(m,a)).length===0){return[];}}else if((h=B.match(D.TAG))&&(m=h[1])){if((g=A(m,a)).length===0){return[];}}}else{if((h=B.match(D.TAG))&&(m=h[1])){if((g=A(m,a)).length===0){return[];}}else if((h=B.match(D.CLASS))&&(m=h[1])){if((g=J(m,a)).length===0){return[];}}}}if(!g){g=A('*',a);}if(o&&!(d=bh[b])){d=bh[b]=N?new Function('c,s,r,d,h,g,f','var N,n,x=0,k=-1,e;main:while(e=c[++k]){'+L(b,bl)+'}return r;'):E(b,'',true);}else if(!(d=bg[b])){d=bg[b]=N?new Function('c,s,r,d,h,g,f','var N,n,x=0,k=-1,e;main:while(e=c[++k]){'+L(b,bl)+'}return r;'):E(b,'',true);}K={};w={};return d(g,bJ,[],i,n,a,c);},T=1,t='uniqueID'in n?'uniqueID':'CSS_ID',K={},w={},bg={},bh={},bi={},bj={},bJ={getIndexesByNodeType:cn,getIndexesByNodeName:co,getAttribute:bE,hasAttribute:bf,byClass:J,byName:bD,byTag:A,byId:I,isEmpty:cp,isLink:cq,select:be,match:bm};s.NW||(s.NW={});NW.Dom={byId:I,byTag:A,byName:bD,byClass:J,getAttribute:bE,hasAttribute:bf,match:bm,select:be,compile:cr,configure:cs,registerOperator:function(b,a){if(!S[b]){S[b]=a}},registerSelector:function(b,a,c){if(!z[b]){z[b]={};z[b].Expression=a;z[b].Callback=c}}}})(this);

/*!
 * selectivizr v1.0.2 - (c) Keith Clark, freely distributable under the terms of the MIT license.
 * selectivizr.com
 */
(function(j){function A(a){return a.replace(B,h).replace(C,function(a,d,b){for(var a=b.split(","),b=0,e=a.length;b<e;b++){var s=D(a[b].replace(E,h).replace(F,h))+o,l=[];a[b]=s.replace(G,function(a,b,c,d,e){if(b){if(l.length>0){var a=l,f,e=s.substring(0,e).replace(H,i);if(e==i||e.charAt(e.length-1)==o)e+="*";try{f=t(e)}catch(k){}if(f){e=0;for(c=f.length;e<c;e++){for(var d=f[e],h=d.className,j=0,m=a.length;j<m;j++){var g=a[j];if(!RegExp("(^|\\s)"+g.className+"(\\s|$)").test(d.className)&&g.b&&(g.b===!0||g.b(d)===!0))h=u(h,g.className,!0)}d.className=h}}l=[]}return b}else{if(b=c?I(c):!v||v.test(d)?{className:w(d),b:!0}:null)return l.push(b),"."+b.className;return a}})}return d+a.join(",")})}function I(a){var c=!0,d=w(a.slice(1)),b=a.substring(0,5)==":not(",e,f;b&&(a=a.slice(5,-1));var l=a.indexOf("(");l>-1&&(a=a.substring(0,l));if(a.charAt(0)==":")switch(a.slice(1)){case "root":c=function(a){return b?a!=p:a==p};break;case "target":if(m==8){c=function(a){function c(){var d=location.hash,e=d.slice(1);return b?d==i||a.id!=e:d!=i&&a.id==e}k(j,"hashchange",function(){g(a,d,c())});return c()};break}return!1;case "checked":c=function(a){J.test(a.type)&&k(a,"propertychange",function(){event.propertyName=="checked"&&g(a,d,a.checked!==b)});return a.checked!==b};break;case "disabled":b=!b;case "enabled":c=function(c){if(K.test(c.tagName))return k(c,"propertychange",function(){event.propertyName=="$disabled"&&g(c,d,c.a===b)}),q.push(c),c.a=c.disabled,c.disabled===b;return a==":enabled"?b:!b};break;case "focus":e="focus",f="blur";case "hover":e||(e="mouseenter",f="mouseleave");c=function(a){k(a,b?f:e,function(){g(a,d,!0)});k(a,b?e:f,function(){g(a,d,!1)});return b};break;default:if(!L.test(a))return!1}return{className:d,b:c}}function w(a){return M+"-"+(m==6&&N?O++:a.replace(P,function(a){return a.charCodeAt(0)}))}function D(a){return a.replace(x,h).replace(Q,o)}function g(a,c,d){var b=a.className,c=u(b,c,d);if(c!=b)a.className=c,a.parentNode.className+=i}function u(a,c,d){var b=RegExp("(^|\\s)"+c+"(\\s|$)"),e=b.test(a);return d?e?a:a+o+c:e?a.replace(b,h).replace(x,h):a}function k(a,c,d){a.attachEvent("on"+c,d)}function r(a,c){if(/^https?:\/\//i.test(a))return c.substring(0,c.indexOf("/",8))==a.substring(0,a.indexOf("/",8))?a:null;if(a.charAt(0)=="/")return c.substring(0,c.indexOf("/",8))+a;var d=c.split(/[?#]/)[0];a.charAt(0)!="?"&&d.charAt(d.length-1)!="/"&&(d=d.substring(0,d.lastIndexOf("/")+1));return d+a}function y(a){if(a)return n.open("GET",a,!1),n.send(),(n.status==200?n.responseText:i).replace(R,i).replace(S,function(c,d,b,e,f){return y(r(b||f,a))}).replace(T,function(c,d,b){d=d||i;return" url("+d+r(b,a)+d+") "});return i}function U(){var a,c;a=f.getElementsByTagName("BASE");for(var d=a.length>0?a[0].href:f.location.href,b=0;b<f.styleSheets.length;b++)if(c=f.styleSheets[b],c.href!=i&&(a=r(c.href,d)))c.cssText=A(y(a));q.length>0&&setInterval(function(){for(var a=0,c=q.length;a<c;a++){var b=q[a];if(b.disabled!==b.a)b.disabled?(b.disabled=!1,b.a=!0,b.disabled=!0):b.a=b.disabled}},250)}if(!/*@cc_on!@*/true){var f=document,p=f.documentElement,n=function(){if(j.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(a){return null}}(),m=/MSIE (\d+)/.exec(navigator.userAgent)[1];if(!(f.compatMode!="CSS1Compat"||m<6||m>8||!n)){var z={NW:"*.Dom.select",MooTools:"$$",DOMAssistant:"*.$",Prototype:"$$",YAHOO:"*.util.Selector.query",Sizzle:"*",jQuery:"*",dojo:"*.query"},t,q=[],O=0,N=!0,M="slvzr",R=/(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*/g,S=/@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))[^;]*;/g,T=/\burl\(\s*(["']?)(?!data:)([^"')]+)\1\s*\)/g,L=/^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/,B=/:(:first-(?:line|letter))/g,C=/(^|})\s*([^\{]*?[\[:][^{]+)/g,G=/([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g,H=/(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g,P=/[^\w-]/g,K=/^(INPUT|SELECT|TEXTAREA|BUTTON)$/,J=/^(checkbox|radio)$/,v=m>6?/[\$\^*]=(['"])\1/:null,E=/([(\[+~])\s+/g,F=/\s+([)\]+~])/g,Q=/\s+/g,x=/^\s*((?:[\S\s]*\S)?)\s*$/,i="",o=" ",h="$1";(function(a,c){function d(){try{p.doScroll("left")}catch(a){setTimeout(d,1);return}b("poll")}function b(d){if(!(d.type=="readystatechange"&&f.readyState!="complete")&&((d.type=="load"?a:f).detachEvent("on"+d.type,b,!1),!e&&(e=!0)))c.call(a,d.type||d)}var e=!1,g=!0;if(f.readyState=="complete")c.call(a,i);else{if(f.createEventObject&&p.doScroll){try{g=!a.frameElement}catch(h){}g&&d()}k(f,"readystatechange",b);k(a,"load",b)}})(j,function(){for(var a in z){var c,d,b=j;if(j[a]){for(c=z[a].replace("*",a).split(".");(d=c.shift())&&(b=b[d]););if(typeof b=="function"){t=b;U();break}}}})}}})(this);