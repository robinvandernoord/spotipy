'use strict';(function(){/*jshint eqeqeq:false curly:false latedef:false */'use strict';function a(a){function b(b,d){var f,n,r=b==window,u=d&&void 0!==d.message?d.message:void 0;if(d=a.extend({},a.blockUI.defaults,d||{}),!(d.ignoreIfBlocked&&a(b).data('blockUI.isBlocked'))){// if an existing element is being used as the blocking content then we capture
// its current place in the DOM (and current display style) so we can restore
// it when we unblock
if(d.overlayCSS=a.extend({},a.blockUI.defaults.overlayCSS,d.overlayCSS||{}),f=a.extend({},a.blockUI.defaults.css,d.css||{}),d.onOverlayClick&&(d.overlayCSS.cursor='pointer'),n=a.extend({},a.blockUI.defaults.themedCSS,d.themedCSS||{}),u=void 0===u?d.message:u,r&&p&&c(window,{fadeOut:0}),u&&'string'!=typeof u&&(u.parentNode||u.jquery)){var v=u.jquery?u[0]:u,w={};a(b).data('blockUI.history',w),w.el=v,w.parent=v.parentNode,w.display=v.style.display,w.position=v.style.position,w.parent&&w.parent.removeChild(v)}a(b).data('blockUI.onUnblock',d.onUnblock);var x,y,A,B,C=d.baseZ;// blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
// layer1 is the iframe layer which is used to supress bleed through of underlying content
// layer2 is the overlay layer which has opacity and a wait cursor (by default)
// layer3 is the message content that is displayed while blocking
x=k||d.forceIframe?a('<iframe class="blockUI" style="z-index:'+C++ +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+d.iframeSrc+'"></iframe>'):a('<div class="blockUI" style="display:none"></div>'),y=d.theme?a('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+C++ +';display:none"></div>'):a('<div class="blockUI blockOverlay" style="z-index:'+C++ +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'),d.theme&&r?(B='<div class="blockUI '+d.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(C+10)+';display:none;position:fixed">',d.title&&(B+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(d.title||'&nbsp;')+'</div>'),B+='<div class="ui-widget-content ui-dialog-content"></div>',B+='</div>'):d.theme?(B='<div class="blockUI '+d.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(C+10)+';display:none;position:absolute">',d.title&&(B+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(d.title||'&nbsp;')+'</div>'),B+='<div class="ui-widget-content ui-dialog-content"></div>',B+='</div>'):r?B='<div class="blockUI '+d.blockMsgClass+' blockPage" style="z-index:'+(C+10)+';display:none;position:fixed"></div>':B='<div class="blockUI '+d.blockMsgClass+' blockElement" style="z-index:'+(C+10)+';display:none;position:absolute"></div>',A=a(B),u&&(d.theme?(A.css(n),A.addClass('ui-widget-content')):A.css(f)),d.theme||/*&& (!opts.applyPlatformOpacityRules)*/y.css(d.overlayCSS),y.css('position',r?'fixed':'absolute'),(k||d.forceIframe)&&x.css('opacity',0);//$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
var D=[x,y,A],E=r?a('body'):a(b);a.each(D,function(){this.appendTo(E)}),d.theme&&d.draggable&&a.fn.draggable&&A.draggable({handle:'.ui-dialog-titlebar',cancel:'li'});// ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
var F=o&&(!a.support.boxModel||0<a('object,embed',r?null:b).length);if(m||F){// fix ie6 issue when blocked element has a border width
if(r&&d.allowBodyStretch&&a.support.boxModel&&a('html,body').css('height','100%'),(m||!a.support.boxModel)&&!r)var G=i(b,'borderTopWidth'),t=i(b,'borderLeftWidth'),l=G?'(0 - '+G+')':0,H=t?'(0 - '+t+')':0;// simulate fixed position
a.each(D,function(a,b){var c=b[0].style;if(c.position='absolute',2>a)r?c.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:'+d.quirksmodeOffsetHack+') + "px"'):c.setExpression('height','this.parentNode.offsetHeight + "px"'),r?c.setExpression('width','jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):c.setExpression('width','this.parentNode.offsetWidth + "px"'),H&&c.setExpression('left',H),l&&c.setExpression('top',l);else if(d.centerY)r&&c.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),c.marginTop=0;else if(!d.centerY&&r){var e=d.css&&d.css.top?parseInt(d.css.top,10):0;c.setExpression('top','((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+e+') + "px"')}})}// show the message
// opacity is zero
if(u&&(d.theme?A.find('.ui-widget-content').append(u):A.append(u),(u.jquery||u.nodeType)&&a(u).show()),(k||d.forceIframe)&&d.showOverlay&&x.show(),d.fadeIn){var I=d.onBlock?d.onBlock:j,J=d.showOverlay&&!u?I:j,K=u?I:j;d.showOverlay&&y._fadeIn(d.fadeIn,J),u&&A._fadeIn(d.fadeIn,K)}else d.showOverlay&&y.show(),u&&A.show(),d.onBlock&&d.onBlock.bind(A)();// bind key and mouse events
if(e(1,b,d),r?(p=A[0],q=a(d.focusableElements,p),d.focusInput&&setTimeout(g,20)):h(A[0],d.centerX,d.centerY),d.timeout){// auto-unblock
var L=setTimeout(function(){r?a.unblockUI(d):a(b).unblock(d)},d.timeout);a(b).data('blockUI.timeout',L)}}}// remove the block
function c(b,c){var f,g=b==window,h=a(b),i=h.data('blockUI.history'),j=h.data('blockUI.timeout');j&&(clearTimeout(j),h.removeData('blockUI.timeout')),c=a.extend({},a.blockUI.defaults,c||{}),e(0,b,c),null===c.onUnblock&&(c.onUnblock=h.data('blockUI.onUnblock'),h.removeData('blockUI.onUnblock'));var k;k=g?// crazy selector to handle odd field errors in ie6/7
a('body').children().filter('.blockUI').add('body > .blockUI'):h.find('>.blockUI'),c.cursorReset&&(1<k.length&&(k[1].style.cursor=c.cursorReset),2<k.length&&(k[2].style.cursor=c.cursorReset)),g&&(p=q=null),c.fadeOut?(f=k.length,k.stop().fadeOut(c.fadeOut,function(){0==--f&&d(k,i,c,b)})):d(k,i,c,b)}// move blocking element back into the DOM where it started
function d(b,c,d,e){var f=a(e);if(!f.data('blockUI.isBlocked')){b.each(function(){this.parentNode&&this.parentNode.removeChild(this)}),c&&c.el&&(c.el.style.display=c.display,c.el.style.position=c.position,c.el.style.cursor='default',c.parent&&c.parent.appendChild(c.el),f.removeData('blockUI.history')),f.data('blockUI.static')&&f.css('position','static'),'function'==typeof d.onUnblock&&d.onUnblock(e,d);// fix issue in Safari 6 where block artifacts remain until reflow
var g=a(document.body),h=g.width(),i=g[0].style.width;g.width(h-1).width(h),g[0].style.width=i}}// bind/unbind the handler
function e(c,b,d){var e=b==window,g=a(b);// don't bother unbinding if there is nothing to unbind
// bind anchors and inputs for mouse and key events
if((c||(!e||p)&&(e||g.data('blockUI.isBlocked')))&&(g.data('blockUI.isBlocked',c),e&&d.bindEvents&&(!c||d.showOverlay)))// don't bind events when overlay is not in use or if bindEvents is false
{c?a(document).bind('mousedown mouseup keydown keypress keyup touchstart touchend touchmove',d,f):a(document).unbind('mousedown mouseup keydown keypress keyup touchstart touchend touchmove',f)}}// event handler to suppress keyboard/mouse events when blocking
function f(b){// allow tab navigation (conditionally)
if('keydown'===b.type&&b.keyCode&&9==b.keyCode&&p&&b.data.constrainTabKey){var c=q,d=!b.shiftKey&&b.target===c[c.length-1],e=b.shiftKey&&b.target===c[0];if(d||e)return setTimeout(function(){g(e)},10),!1}var f=b.data,h=a(b.target);// allow events within the message content
return h.hasClass('blockOverlay')&&f.onOverlayClick&&f.onOverlayClick(b),!!(0<h.parents('div.'+f.blockMsgClass).length)||0===h.parents().children().filter('div.blockUI').length;// allow events for content that is not being blocked
}function g(a){if(q){var b=q[!0===a?q.length-1:0];b&&b.focus()}}function h(a,b,c){var d=a.parentNode,e=a.style,f=(d.offsetWidth-a.offsetWidth)/2.25-i(d,'borderLeftWidth'),g=(d.offsetHeight-a.offsetHeight)/4-i(d,'borderTopWidth');// TAS CUSTOM
b&&(e.left=0<f?f+'px':'0'),c&&(e.top=0<g?g+'px':'0')}function i(b,c){return parseInt(a.css(b,c),10)||0}a.fn._fadeIn=a.fn.fadeIn;var j=a.noop||function(){},k=/MSIE/.test(navigator.userAgent),m=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent),n=document.documentMode||0,o=a.isFunction(document.createElement('div').style.setExpression);// this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
// confusing userAgent strings on Vista)
// global $ methods for blocking/unblocking the entire page
a.blockUI=function(a){b(window,a)},a.unblockUI=function(a){c(window,a)},a.growlUI=function(b,c,d,e){var f=a('<div class="growlUI"></div>');b&&f.append('<h1>'+b+'</h1>'),c&&f.append('<h2>'+c+'</h2>'),d===void 0&&(d=3e3);// Added by konapun: Set timeout to 30 seconds if this growl is moused over, like normal toast notifications
var g=function(b){b=b||{},a.blockUI({message:f,fadeIn:'undefined'==typeof b.fadeIn?700:b.fadeIn,fadeOut:'undefined'==typeof b.fadeOut?1e3:b.fadeOut,timeout:'undefined'==typeof b.timeout?d:b.timeout,centerY:!1,showOverlay:!1,onUnblock:e,css:a.blockUI.defaults.growlCSS})};g();f.css('opacity');f.mouseover(function(){g({fadeIn:0,timeout:3e4});var b=a('.blockMsg');// cancel fadeout if it has started
b.stop(),b.fadeTo(300,1)}// make it easier to read the message by removing transparency
).mouseout(function(){a('.blockMsg').fadeOut(1e3)})},a.fn.block=function(c){if(this[0]===window)return a.blockUI(c),this;var d=a.extend({},a.blockUI.defaults,c||{});return this.each(function(){var b=a(this);d.ignoreIfBlocked&&b.data('blockUI.isBlocked')||b.unblock({fadeOut:0})}),this.each(function(){'static'==a.css(this,'position')&&(this.style.position='relative',a(this).data('blockUI.static',!0)),this.style.zoom=1,b(this,c)})},a.fn.unblock=function(b){return this[0]===window?(a.unblockUI(b),this):this.each(function(){c(this,b)})},a.blockUI.version=2.7,a.blockUI.defaults={// message displayed when blocking (use null for no message)
message:'<h1>Please wait...</h1>',title:null,// title string; only used when theme == true
draggable:!0,// only used when theme == true (requires jquery-ui.js to be loaded)
theme:!1,// set to true to use with jQuery UI themes
// styles for the message when blocking; if you wish to disable
// these and use an external stylesheet then do this in your code:
// $.blockUI.defaults.css = {};
css:{padding:0,margin:0,width:'30%',top:'20%',left:'35%',textAlign:'center',color:'#000',border:'3px solid #aaa',backgroundColor:'#fff',cursor:'wait'},// minimal style set used when themes are used
themedCSS:{width:'30%',top:'20%',left:'35%'},// styles for the overlay
// TAS CUSTOM
overlayCSS:{backgroundColor:'#000',opacity:.6,cursor:'not-allowed'},// style to replace wait cursor before unblocking to correct issue
// of lingering wait cursor
cursorReset:'default',// styles applied when using $.growlUI
growlCSS:{width:'350px',top:'10px',left:'',right:'10px',border:'none',padding:'5px',opacity:.6,cursor:'default',color:'#fff',backgroundColor:'#000',"-webkit-border-radius":'10px',"-moz-border-radius":'10px',"border-radius":'10px'},// IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
// (hat tip to Jorge H. N. de Vasconcelos)
/*jshint scripturl:true */iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank',// force usage of iframe in non-IE browsers (handy for blocking applets)
forceIframe:!1,// z-index for the blocking overlay
baseZ:1e3,// set these to true to have the message automatically centered
centerX:!0,// <-- only effects element blocking (page block controlled via css above)
centerY:!0,// allow body element to be stetched in ie6; this makes blocking look better
// on "short" pages.  disable if you wish to prevent changes to the body height
allowBodyStretch:!0,// enable if you want key and mouse events to be disabled for content that is blocked
bindEvents:!0,// be default blockUI will supress tab navigation from leaving blocking content
// (if bindEvents is true)
constrainTabKey:!0,// fadeIn time in millis; set to 0 to disable fadeIn on block
fadeIn:200,// fadeOut time in millis; set to 0 to disable fadeOut on unblock
fadeOut:400,// time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
timeout:0,// disable if you don't want to show the overlay
showOverlay:!0,// if true, focus will be placed in the first available input field when
// page blocking
focusInput:!0,// elements that can receive focus
focusableElements:':input:enabled:visible',// suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
// no longer needed in 2012
// applyPlatformOpacityRules: true,
// callback method invoked when fadeIn has completed and blocking message is visible
onBlock:null,// callback method invoked when unblocking has completed; the callback is
// passed the element that has been unblocked (which is the window object for page
// blocks) and the options that were passed to the unblock call:
//	onUnblock(element, options)
onUnblock:null,// callback method invoked when the overlay area is clicked.
// setting this will turn the cursor to a pointer, otherwise cursor defined in overlayCss will be used.
onOverlayClick:null,// don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
quirksmodeOffsetHack:4,// class name of the message block
blockMsgClass:'blockMsg',// if it is already blocked, then ignore it (don't unblock and reblock)
ignoreIfBlocked:!1};// private data and functions follow...
var p=null,q=[]}/*global define:true */'function'==typeof define&&define.amd&&define.amd.jQuery?define(['jquery'],a):a(jQuery)})();/*!
 * jQuery blockUI plugin
 * Version 2.70.0-2014.11.23
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
//# sourceMappingURL=blockui.js.map