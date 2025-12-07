import{j as b,d as De,s as Ie,e as Le,F as G,g as Re,_ as v,c as z,b as M,i as E,u as ae,f as le,h as Ne,a as $,k as Ae,l as Te,m as Be,n as Qe,o as ge,p as B,q as Ue,r as Z,t as k,v as Oe,S as Fe,w as P,x as He,y as we,z as We,A as de,B as Ge,C as Q}from"./q-DnSbdkyx.js";const ee={manifestHash:"5c5y4n",core:"q-D7PC44-e.js",preloader:"q-DoNi8vyY.js",qwikLoader:"q-naDMFAHy.js",bundleGraphAsset:"assets/CwJhd-W2-bundle-graph.json",injections:[{tag:"link",location:"head",attributes:{rel:"stylesheet",href:"/assets/BlUbkrw1-style.css"}}],mapping:{s_oFbhCpo86kE:"q-DhefrQx-.js",s_4MLn2FyEQ5w:"q-D0J7NYM9.js",s_6oEBS041MdY:"q-qUj-QbRc.js",s_8hJxqlEA4aY:"q-Cj_Jal7G.js",s_9qu7c2w0mTE:"q-DhefrQx-.js",s_IcmZd0BN6QQ:"q-CMCWorRF.js",s_aTJZB9EboWU:"q-BAXzHCBw.js",s_hDH4i9qfLeA:"q-BKzs1w1G.js",s_hH77Fe50UV4:"q-DD6KQGsy.js",s_jewA00KSy68:"q-CuXGkJEs.js",s_jiTSKmRqlVk:"q-DoRsmWqo.js",s_lrZU6AmTyzg:"q-qUj-QbRc.js",s_oevP13mb0I8:"q-Ds2F2jO1.js",s_rFNzEoWD10o:"q-BWKE2Kts.js",s_t1Gr3ryASyk:"q-CW13TmjN.js",s_twNWa50Pu3A:"q-FczVRBjP.js",s_uNYGznbgjZw:"q-CBJUGNp9.js",s_yZW4f4TVhxQ:"q-mtmxI4BX.js",s_IcklmpF1eHg:"q-DhefrQx-.js",s_6dUAoXBLJxY:"q-CUOhqyhs.js",s_Di7hQXcIGc0:"q-BPGjlhMs.js",s_DmKvc0UhS4Y:"q-C7syUalb.js",s_R1zyzTkPNd4:"q-BbpLHJmn.js",s_40Ln4mTU9A8:"q-BKzs1w1G.js",s_9OvrikGDcF4:"q-DhefrQx-.js",s_BjvotIlHLJg:"q-qUj-QbRc.js",s_IheMnbfrtys:"q-BKzs1w1G.js",s_LtFU0bkuneE:"q-qUj-QbRc.js",s_RCUaIeLJo1U:"q-qUj-QbRc.js",s_Y2XixpY5THQ:"q-DhefrQx-.js",s_jVSbbM6VOyk:"q-DD6KQGsy.js",s_zD97EtZwrE8:"q-CMCWorRF.js"}};/**
 * @license
 * @builder.io/qwik/server 1.17.2
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */var ze=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')}),Je="<sync>";function Ve(t,e){const n=e==null?void 0:e.mapper,o=t.symbolMapper?t.symbolMapper:(s,a,i)=>{var l;if(n){const f=F(s),c=n[f];if(!c){if(f===Je)return[f,""];if((l=globalThis.__qwik_reg_symbols)==null?void 0:l.has(f))return[s,"_"];if(i)return[s,`${i}?qrl=${s}`];console.error("Cannot resolve symbol",s,"in",n,i)}return c}};return{isServer:!0,async importSymbol(s,a,i){var d;const l=F(i),f=(d=globalThis.__qwik_reg_symbols)==null?void 0:d.get(l);if(f)return f;let c=String(a);c.endsWith(".js")||(c+=".js");const u=ze(c);if(!(i in u))throw new Error(`Q-ERROR: missing symbol '${i}' in module '${c}'.`);return u[i]},raf:()=>(console.error("server can not rerender"),Promise.resolve()),nextTick:s=>new Promise(a=>{setTimeout(()=>{a(s())})}),chunkForSymbol(s,a,i){return o(s,n,i)}}}async function Ye(t,e){const n=Ve(t,e);Ie(n)}var F=t=>{const e=t.lastIndexOf("_");return e>-1?t.slice(e+1):t},Ke="q:instance",te={$DEBUG$:!1,$invPreloadProbability$:.65},Ze=Date.now(),Xe=/\.[mc]?js$/,qe=0,Me=1,et=2,tt=3,ne,re,nt=(t,e)=>({$name$:t,$state$:Xe.test(t)?qe:tt,$deps$:$e?e==null?void 0:e.map(n=>({...n,$factor$:1})):e,$inverseProbability$:1,$createdTs$:Date.now(),$waitedMs$:0,$loadedMs$:0}),rt=t=>{const e=new Map;let n=0;for(;n<t.length;){const o=t[n++],r=[];let s,a=1;for(;s=t[n],typeof s=="number";)s<0?a=-s/10:r.push({$name$:t[s],$importProbability$:a,$factor$:1}),n++;e.set(o,r)}return e},_e=t=>{let e=oe.get(t);if(!e){let n;if(re){if(n=re.get(t),!n)return;n.length||(n=void 0)}e=nt(t,n),oe.set(t,e)}return e},ot=(t,e)=>{e&&("debug"in e&&(te.$DEBUG$=!!e.debug),typeof e.preloadProbability=="number"&&(te.$invPreloadProbability$=1-e.preloadProbability)),!(ne!=null||!t)&&(ne="",re=rt(t))},oe=new Map,$e,H,Se=0,N=[],st=(...t)=>{console.log(`Preloader ${Date.now()-Ze}ms ${Se}/${N.length} queued>`,...t)},it=()=>{oe.clear(),H=!1,$e=!0,Se=0,N.length=0},at=()=>{H&&(N.sort((t,e)=>t.$inverseProbability$-e.$inverseProbability$),H=!1)},lt=()=>{at();let t=.4;const e=[];for(const n of N){const o=Math.round((1-n.$inverseProbability$)*10);o!==t&&(t=o,e.push(t)),e.push(n.$name$)}return e},ke=(t,e,n)=>{if(n!=null&&n.has(t))return;const o=t.$inverseProbability$;if(t.$inverseProbability$=e,!(o-t.$inverseProbability$<.01)&&(ne!=null&&t.$state$<et&&(t.$state$===qe&&(t.$state$=Me,N.push(t),te.$DEBUG$&&st(`queued ${Math.round((1-t.$inverseProbability$)*100)}%`,t.$name$)),H=!0),t.$deps$)){n||(n=new Set),n.add(t);const r=1-t.$inverseProbability$;for(const s of t.$deps$){const a=_e(s.$name$);if(a.$inverseProbability$===0)continue;let i;if(r===1||r>=.99&&se<100)se++,i=Math.min(.01,1-s.$importProbability$);else{const l=1-s.$importProbability$*r,f=s.$factor$,c=l/f;i=Math.max(.02,a.$inverseProbability$*c),s.$factor$=c}ke(a,i,n)}}},he=(t,e)=>{const n=_e(t);n&&n.$inverseProbability$>e&&ke(n,e)},se,ct=(t,e)=>{if(!(t!=null&&t.length))return;se=0;let n=e?1-e:.4;if(Array.isArray(t))for(let o=t.length-1;o>=0;o--){const r=t[o];typeof r=="number"?n=1-r/10:he(r,n)}else he(t,n)};function ut(t){const e=[],n=o=>{if(o)for(const r of o)e.includes(r.url)||(e.push(r.url),r.imports&&n(r.imports))};return n(t),e}var ft=t=>{var n;const e=Re();return(n=t==null?void 0:t.qrls)==null?void 0:n.map(o=>{var i;const r=o.$refSymbol$||o.$symbol$,s=o.$chunk$,a=e.chunkForSymbol(r,s,(i=o.dev)==null?void 0:i.file);return a?a[1]:s}).filter(Boolean)};function mt(t,e,n){const o=e.prefetchStrategy;if(o===null)return[];if(!(n!=null&&n.manifest.bundleGraph))return ft(t);if(typeof(o==null?void 0:o.symbolsToPrefetch)=="function")try{const s=o.symbolsToPrefetch({manifest:n.manifest});return ut(s)}catch(s){console.error("getPrefetchUrls, symbolsToPrefetch()",s)}const r=new Set;for(const s of(t==null?void 0:t.qrls)||[]){const a=F(s.$refSymbol$||s.$symbol$);a&&a.length>=10&&r.add(a)}return[...r]}var dt=(t,e)=>{if(!(e!=null&&e.manifest.bundleGraph))return[...new Set(t)];it();let n=.99;for(const o of t.slice(0,15))ct(o,n),n*=.85;return lt()},ie=(t,e)=>{if(e==null)return null;const n=`${t}${e}`.split("/"),o=[];for(const r of n)r===".."&&o.length>0?o.pop():o.push(r);return o.join("/")},ht=(t,e,n,o,r)=>{var l;const s=ie(t,(l=e==null?void 0:e.manifest)==null?void 0:l.preloader),a="/"+(e==null?void 0:e.manifest.bundleGraphAsset);if(s&&a&&n!==!1){const f=typeof n=="object"?{debug:n.debug,preloadProbability:n.ssrPreloadProbability}:void 0;ot(e==null?void 0:e.manifest.bundleGraph,f);const c=[];n!=null&&n.debug&&c.push("d:1"),n!=null&&n.maxIdlePreloads&&c.push(`P:${n.maxIdlePreloads}`),n!=null&&n.preloadProbability&&c.push(`Q:${n.preloadProbability}`);const u=c.length?`,{${c.join(",")}}`:"",d=`let b=fetch("${a}");import("${s}").then(({l})=>l(${JSON.stringify(t)},b${u}));`;o.push(b("link",{rel:"modulepreload",href:s,nonce:r}),b("link",{rel:"preload",href:a,as:"fetch",crossorigin:"anonymous",nonce:r}),b("script",{type:"module",async:!0,dangerouslySetInnerHTML:d,nonce:r}))}const i=ie(t,e==null?void 0:e.manifest.core);i&&o.push(b("link",{rel:"modulepreload",href:i,nonce:r}))},pt=(t,e,n,o,r)=>{if(o.length===0||n===!1)return null;const{ssrPreloads:s,ssrPreloadProbability:a}=bt(typeof n=="boolean"?void 0:n);let i=s;const l=[],f=[],c=e==null?void 0:e.manifest.manifestHash;if(i){const h=e==null?void 0:e.manifest.preloader,m=e==null?void 0:e.manifest.core,w=dt(o,e);let _=4;const D=a*10;for(const y of w)if(typeof y=="string"){if(_<D)break;if(y===h||y===m)continue;if(f.push(y),--i===0)break}else _=y}const u=ie(t,c&&(e==null?void 0:e.manifest.preloader));let g=f.length?`${JSON.stringify(f)}.map((l,e)=>{e=document.createElement('link');e.rel='modulepreload';e.href=${JSON.stringify(t)}+l;document.head.appendChild(e)});`:"";return u&&(g+=`window.addEventListener('load',f=>{f=_=>import("${u}").then(({p})=>p(${JSON.stringify(o)}));try{requestIdleCallback(f,{timeout:2000})}catch(e){setTimeout(f,200)}})`),g&&l.push(b("script",{type:"module","q:type":"preload",async:!0,dangerouslySetInnerHTML:g,nonce:r})),l.length>0?b(G,{children:l}):null},yt=(t,e,n,o,r)=>{var s;if(n.preloader!==!1){const a=mt(e,n,o);if(a.length>0){const i=pt(t,o,n.preloader,a,(s=n.serverData)==null?void 0:s.nonce);i&&r.push(i)}}};function bt(t){return{...vt,...t}}var vt={ssrPreloads:7,ssrPreloadProbability:.5,debug:!1,maxIdlePreloads:25,preloadProbability:.35},gt='const t=document,e=window,n=new Set,o=new Set([t]);let r;const s=(t,e)=>Array.from(t.querySelectorAll(e)),a=t=>{const e=[];return o.forEach(n=>e.push(...s(n,t))),e},i=t=>{w(t),s(t,"[q\\\\:shadowroot]").forEach(t=>{const e=t.shadowRoot;e&&i(e)})},c=t=>t&&"function"==typeof t.then,l=(t,e,n=e.type)=>{a("[on"+t+"\\\\:"+n+"]").forEach(o=>{b(o,t,e,n)})},f=e=>{if(void 0===e._qwikjson_){let n=(e===t.documentElement?t.body:e).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===n.getAttribute("type")){e._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},p=(t,e)=>new CustomEvent(t,{detail:e}),b=async(e,n,o,r=o.type)=>{const s="on"+n+":"+r;e.hasAttribute("preventdefault:"+r)&&o.preventDefault(),e.hasAttribute("stoppropagation:"+r)&&o.stopPropagation();const a=e._qc_,i=a&&a.li.filter(t=>t[0]===s);if(i&&i.length>0){for(const t of i){const n=t[1].getFn([e,o],()=>e.isConnected)(o,e),r=o.cancelBubble;c(n)&&await n,r&&o.stopPropagation()}return}const l=e.getAttribute(s);if(l){const n=e.closest("[q\\\\:container]"),r=n.getAttribute("q:base"),s=n.getAttribute("q:version")||"unknown",a=n.getAttribute("q:manifest-hash")||"dev",i=new URL(r,t.baseURI);for(const p of l.split("\\n")){const l=new URL(p,i),b=l.href,h=l.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",q=performance.now();let _,d,y;const w=p.startsWith("#"),g={qBase:r,qManifest:a,qVersion:s,href:b,symbol:h,element:e,reqTime:q};if(w){const e=n.getAttribute("q:instance");_=(t["qFuncs_"+e]||[])[Number.parseInt(h)],_||(d="sync",y=Error("sym:"+h))}else{u("qsymbol",g);const t=l.href.split("#")[0];try{const e=import(t);f(n),_=(await e)[h],_||(d="no-symbol",y=Error(`${h} not in ${t}`))}catch(t){d||(d="async"),y=t}}if(!_){u("qerror",{importError:d,error:y,...g}),console.error(y);break}const m=t.__q_context__;if(e.isConnected)try{t.__q_context__=[e,o,l];const n=_(o,e);c(n)&&await n}catch(t){u("qerror",{error:t,...g})}finally{t.__q_context__=m}}}},u=(e,n)=>{t.dispatchEvent(p(e,n))},h=t=>t.replace(/([A-Z])/g,t=>"-"+t.toLowerCase()),q=async t=>{let e=h(t.type),n=t.target;for(l("-document",t,e);n&&n.getAttribute;){const o=b(n,"",t,e);let r=t.cancelBubble;c(o)&&await o,r||(r=r||t.cancelBubble||n.hasAttribute("stoppropagation:"+t.type)),n=t.bubbles&&!0!==r?n.parentElement:null}},_=t=>{l("-window",t,h(t.type))},d=()=>{const s=t.readyState;if(!r&&("interactive"==s||"complete"==s)&&(o.forEach(i),r=1,u("qinit"),(e.requestIdleCallback??e.setTimeout).bind(e)(()=>u("qidle")),n.has("qvisible"))){const t=a("[on\\\\:qvisible]"),e=new IntersectionObserver(t=>{for(const n of t)n.isIntersecting&&(e.unobserve(n.target),b(n.target,"",p("qvisible",n)))});t.forEach(t=>e.observe(t))}},y=(t,e,n,o=!1)=>{t.addEventListener(e,n,{capture:o,passive:!1})},w=(...t)=>{for(const r of t)"string"==typeof r?n.has(r)||(o.forEach(t=>y(t,r,q,!0)),y(e,r,_,!0),n.add(r)):o.has(r)||(n.forEach(t=>y(r,t,q,!0)),o.add(r))};if(!("__q_context__"in t)){t.__q_context__=0;const r=e.qwikevents;r&&(Array.isArray(r)?w(...r):w("click","input")),e.qwikevents={events:n,roots:o,push:w},y(t,"readystatechange",d),d()}',wt=`const doc = document;
const win = window;
const events = /* @__PURE__ */ new Set();
const roots = /* @__PURE__ */ new Set([doc]);
let hasInitialized;
const nativeQuerySelectorAll = (root, selector) => Array.from(root.querySelectorAll(selector));
const querySelectorAll = (query) => {
  const elements = [];
  roots.forEach((root) => elements.push(...nativeQuerySelectorAll(root, query)));
  return elements;
};
const findShadowRoots = (fragment) => {
  processEventOrNode(fragment);
  nativeQuerySelectorAll(fragment, "[q\\\\:shadowroot]").forEach((parent) => {
    const shadowRoot = parent.shadowRoot;
    shadowRoot && findShadowRoots(shadowRoot);
  });
};
const isPromise = (promise) => promise && typeof promise.then === "function";
const broadcast = (infix, ev, type = ev.type) => {
  querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((el) => {
    dispatch(el, infix, ev, type);
  });
};
const resolveContainer = (containerEl) => {
  if (containerEl._qwikjson_ === void 0) {
    const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
    let script = parentJSON.lastElementChild;
    while (script) {
      if (script.tagName === "SCRIPT" && script.getAttribute("type") === "qwik/json") {
        containerEl._qwikjson_ = JSON.parse(
          script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1")
        );
        break;
      }
      script = script.previousElementSibling;
    }
  }
};
const createEvent = (eventName, detail) => new CustomEvent(eventName, {
  detail
});
const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {
  const attrName = "on" + onPrefix + ":" + eventName;
  if (element.hasAttribute("preventdefault:" + eventName)) {
    ev.preventDefault();
  }
  if (element.hasAttribute("stoppropagation:" + eventName)) {
    ev.stopPropagation();
  }
  const ctx = element._qc_;
  const relevantListeners = ctx && ctx.li.filter((li) => li[0] === attrName);
  if (relevantListeners && relevantListeners.length > 0) {
    for (const listener of relevantListeners) {
      const results = listener[1].getFn([element, ev], () => element.isConnected)(ev, element);
      const cancelBubble = ev.cancelBubble;
      if (isPromise(results)) {
        await results;
      }
      if (cancelBubble) {
        ev.stopPropagation();
      }
    }
    return;
  }
  const attrValue = element.getAttribute(attrName);
  if (attrValue) {
    const container = element.closest("[q\\\\:container]");
    const qBase = container.getAttribute("q:base");
    const qVersion = container.getAttribute("q:version") || "unknown";
    const qManifest = container.getAttribute("q:manifest-hash") || "dev";
    const base = new URL(qBase, doc.baseURI);
    for (const qrl of attrValue.split("\\n")) {
      const url = new URL(qrl, base);
      const href = url.href;
      const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";
      const reqTime = performance.now();
      let handler;
      let importError;
      let error;
      const isSync = qrl.startsWith("#");
      const eventData = {
        qBase,
        qManifest,
        qVersion,
        href,
        symbol,
        element,
        reqTime
      };
      if (isSync) {
        const hash = container.getAttribute("q:instance");
        handler = (doc["qFuncs_" + hash] || [])[Number.parseInt(symbol)];
        if (!handler) {
          importError = "sync";
          error = new Error("sym:" + symbol);
        }
      } else {
        emitEvent("qsymbol", eventData);
        const uri = url.href.split("#")[0];
        try {
          const module = import(
                        uri
          );
          resolveContainer(container);
          handler = (await module)[symbol];
          if (!handler) {
            importError = "no-symbol";
            error = new Error(\`\${symbol} not in \${uri}\`);
          }
        } catch (err) {
          importError || (importError = "async");
          error = err;
        }
      }
      if (!handler) {
        emitEvent("qerror", {
          importError,
          error,
          ...eventData
        });
        console.error(error);
        break;
      }
      const previousCtx = doc.__q_context__;
      if (element.isConnected) {
        try {
          doc.__q_context__ = [element, ev, url];
          const results = handler(ev, element);
          if (isPromise(results)) {
            await results;
          }
        } catch (error2) {
          emitEvent("qerror", { error: error2, ...eventData });
        } finally {
          doc.__q_context__ = previousCtx;
        }
      }
    }
  }
};
const emitEvent = (eventName, detail) => {
  doc.dispatchEvent(createEvent(eventName, detail));
};
const camelToKebab = (str) => str.replace(/([A-Z])/g, (a) => "-" + a.toLowerCase());
const processDocumentEvent = async (ev) => {
  let type = camelToKebab(ev.type);
  let element = ev.target;
  broadcast("-document", ev, type);
  while (element && element.getAttribute) {
    const results = dispatch(element, "", ev, type);
    let cancelBubble = ev.cancelBubble;
    if (isPromise(results)) {
      await results;
    }
    cancelBubble || (cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type));
    element = ev.bubbles && cancelBubble !== true ? element.parentElement : null;
  }
};
const processWindowEvent = (ev) => {
  broadcast("-window", ev, camelToKebab(ev.type));
};
const processReadyStateChange = () => {
  const readyState = doc.readyState;
  if (!hasInitialized && (readyState == "interactive" || readyState == "complete")) {
    roots.forEach(findShadowRoots);
    hasInitialized = 1;
    emitEvent("qinit");
    const riC = win.requestIdleCallback ?? win.setTimeout;
    riC.bind(win)(() => emitEvent("qidle"));
    if (events.has("qvisible")) {
      const results = querySelectorAll("[on\\\\:qvisible]");
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            dispatch(entry.target, "", createEvent("qvisible", entry));
          }
        }
      });
      results.forEach((el) => observer.observe(el));
    }
  }
};
const addEventListener = (el, eventName, handler, capture = false) => {
  el.addEventListener(eventName, handler, { capture, passive: false });
};
const processEventOrNode = (...eventNames) => {
  for (const eventNameOrNode of eventNames) {
    if (typeof eventNameOrNode === "string") {
      if (!events.has(eventNameOrNode)) {
        roots.forEach(
          (root) => addEventListener(root, eventNameOrNode, processDocumentEvent, true)
        );
        addEventListener(win, eventNameOrNode, processWindowEvent, true);
        events.add(eventNameOrNode);
      }
    } else {
      if (!roots.has(eventNameOrNode)) {
        events.forEach(
          (eventName) => addEventListener(eventNameOrNode, eventName, processDocumentEvent, true)
        );
        roots.add(eventNameOrNode);
      }
    }
  }
};
if (!("__q_context__" in doc)) {
  doc.__q_context__ = 0;
  const qwikevents = win.qwikevents;
  if (qwikevents) {
    if (Array.isArray(qwikevents)) {
      processEventOrNode(...qwikevents);
    } else {
      processEventOrNode("click", "input");
    }
  }
  win.qwikevents = {
    events,
    roots,
    push: processEventOrNode
  };
  addEventListener(doc, "readystatechange", processReadyStateChange);
  processReadyStateChange();
}`;function qt(t={}){return t.debug?wt:gt}function X(){if(typeof performance>"u")return()=>0;const t=performance.now();return()=>(performance.now()-t)/1e6}function _t(t){let e=t.base;return typeof t.base=="function"&&(e=t.base(t)),typeof e=="string"?(e.endsWith("/")||(e+="/"),e):"/build/"}var $t="<!DOCTYPE html>";async function St(t,e){var ce,ue;let n=e.stream,o=0,r=0,s=0,a=0,i="",l;const f=((ce=e.streaming)==null?void 0:ce.inOrder)??{strategy:"auto",maximunInitialChunk:5e4,maximunChunk:3e4},c=e.containerTagName??"html",u=e.containerAttributes??{},d=n,g=X(),h=_t(e),m=Et(e.manifest),w=(ue=e.serverData)==null?void 0:ue.nonce;function _(){i&&(d.write(i),i="",o=0,s++,s===1&&(a=g()))}function D(p){const q=p.length;o+=q,r+=q,i+=p}switch(f.strategy){case"disabled":n={write:D};break;case"direct":n=d;break;case"auto":let p=0,q=!1;const fe=f.maximunChunk??0,K=f.maximunInitialChunk??0;n={write(I){I==="<!--qkssr-f-->"?q||(q=!0):I==="<!--qkssr-pu-->"?p++:I==="<!--qkssr-po-->"?p--:D(I),p===0&&(q||o>=(s===0?K:fe))&&(q=!1,_())}};break}c==="html"?n.write($t):n.write("<!--cq-->"),m||console.warn("Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build."),await Ye(e,m);const y=m==null?void 0:m.manifest.injections,C=y?y.map(p=>b(p.tag,p.attributes??{})):[];let S=e.qwikLoader?typeof e.qwikLoader=="object"?e.qwikLoader.include==="never"?2:0:e.qwikLoader==="inline"?1:e.qwikLoader==="never"?2:0:0;const A=m==null?void 0:m.manifest.qwikLoader;if(S===0&&!A&&(S=1),S===0)C.unshift(b("link",{rel:"modulepreload",href:`${h}${A}`,nonce:w}),b("script",{type:"module",async:!0,src:`${h}${A}`,nonce:w}));else if(S===1){const p=qt({debug:e.debug});C.unshift(b("script",{id:"qwikloader",type:"module",async:!0,nonce:w,dangerouslySetInnerHTML:p}))}ht(h,m,e.preloader,C,w);const J=X(),V=[];let T=0,j=0;await De(t,{stream:n,containerTagName:c,containerAttributes:u,serverData:e.serverData,base:h,beforeContent:C,beforeClose:async(p,q,fe,K)=>{T=J();const I=X();l=await Le(p,q,void 0,K);const L=[];yt(h,l,e,m,L);const xe=JSON.stringify(l.state,void 0,void 0);if(L.push(b("script",{type:"qwik/json",dangerouslySetInnerHTML:Pt(xe),nonce:w})),l.funcs.length>0){const R=u[Ke];L.push(b("script",{"q:func":"qwik/json",dangerouslySetInnerHTML:xt(R,l.funcs),nonce:w}))}const me=Array.from(q.$events$,R=>JSON.stringify(R));if(me.length>0){const R=`(window.qwikevents||(window.qwikevents=[])).push(${me.join(",")})`;L.push(b("script",{dangerouslySetInnerHTML:R,nonce:w}))}return Ct(V,p),j=I(),b(G,{children:L})},manifestHash:(m==null?void 0:m.manifest.manifestHash)||"dev"+kt()}),c!=="html"&&n.write("<!--/cq-->"),_();const Y=l.resources.some(p=>p._cache!==1/0);return{prefetchResources:void 0,snapshotResult:l,flushes:s,manifest:m==null?void 0:m.manifest,size:r,isStatic:!Y,timing:{render:T,snapshot:j,firstFlush:a}}}function kt(){return Math.random().toString(36).slice(2)}function Et(t){const e=t?{...ee,...t}:ee;if(!e||"mapper"in e)return e;if(e.mapping){const n={};return Object.entries(e.mapping).forEach(([o,r])=>{n[F(o)]=[o,r]}),{mapper:n,manifest:e,injections:e.injections||[]}}}var Pt=t=>t.replace(/<(\/?script)/gi,"\\x3C$1");function Ct(t,e){var n;for(const o of e){const r=(n=o.$componentQrl$)==null?void 0:n.getSymbol();r&&!t.includes(r)&&t.push(r)}}var jt='document["qFuncs_HASH"]=';function xt(t,e){return jt.replace("HASH",t)+`[${e.join(`,
`)}]`}const Dt=`
"serviceWorker"in navigator&&navigator.serviceWorker.getRegistrations().then(r=>{for(const e of r){const c='/service-worker.js'.split("/").pop();e.active?.scriptURL.endsWith(c||"service-worker.js")&&e.unregister().catch(console.error)}}),"caches"in window&&caches.keys().then(r=>{const e=r.find(c=>c.startsWith("QwikBuild"));e&&caches.delete(e).catch(console.error)}).catch(console.error)
`,It=P("qc-s"),Lt=P("qc-c"),Ee=P("qc-ic"),Pe=P("qc-h"),Ce=P("qc-l"),Rt=P("qc-n"),Nt=P("qc-a"),At=P("qc-p"),Tt=Te(He("s_Di7hQXcIGc0")),Bt=()=>{if(!le("containerAttributes"))throw new Error("PrefetchServiceWorker component must be rendered on the server.");Ne();const e=ae(Ee);if(e.value&&e.value.length>0){const n=e.value.length;let o=null;for(let r=n-1;r>=0;r--)e.value[r].default&&(o=$(e.value[r].default,{children:o},1,"UD_0"));return $(G,{children:[o,v("script",{"document:onQCInit$":Tt,"document:onQInit$":Ae(()=>{((r,s)=>{var a;if(!r._qcs&&s.scrollRestoration==="manual"){r._qcs=!0;const i=(a=s.state)==null?void 0:a._qCityScroll;i&&r.scrollTo(i.x,i.y),document.dispatchEvent(new Event("qcinit"))}})(window,history)},'()=>{((w,h)=>{if(!w._qcs&&h.scrollRestoration==="manual"){w._qcs=true;const s=h.state?._qCityScroll;if(s){w.scrollTo(s.x,s.y);}document.dispatchEvent(new Event("qcinit"));}})(window,history);}')},null,null,2,"UD_1")]},1,"UD_2")}return Be},Qt=z(E(Bt,"s_oevP13mb0I8")),Ut=(t,e)=>new URL(t,e.href),pe=(t,e)=>t.origin===e.origin,ye=t=>t.endsWith("/")?t:t+"/",Ot=({pathname:t},{pathname:e})=>{const n=Math.abs(t.length-e.length);return n===0?t===e:n===1&&ye(t)===ye(e)},Ft=(t,e)=>t.search===e.search,W=(t,e)=>Ft(t,e)&&Ot(t,e),Ht=t=>t&&typeof t.then=="function",Wt=(t,e,n,o)=>{const r=je(),a={head:r,withLocale:i=>de(o,i),resolveValue:i=>{const l=i.__id;if(i.__brand==="server_loader"&&!(l in t.loaders))throw new Error("You can not get the returned data of a loader that has not been executed for this request.");const f=t.loaders[l];if(Ht(f))throw new Error("Loaders returning a promise can not be resolved for the head function.");return f},...e};for(let i=n.length-1;i>=0;i--){const l=n[i]&&n[i].head;l&&(typeof l=="function"?be(r,de(o,()=>l(a))):typeof l=="object"&&be(r,l))}return a.head},be=(t,e)=>{typeof e.title=="string"&&(t.title=e.title),U(t.meta,e.meta),U(t.links,e.links),U(t.styles,e.styles),U(t.scripts,e.scripts),Object.assign(t.frontmatter,e.frontmatter)},U=(t,e)=>{if(Array.isArray(e))for(const n of e){if(typeof n.key=="string"){const o=t.findIndex(r=>r.key===n.key);if(o>-1){t[o]=n;continue}}t.push(n)}},je=()=>({title:"",meta:[],links:[],styles:[],scripts:[],frontmatter:{}}),Gt=()=>ae(Pe),zt=()=>ae(Ce),Jt=()=>ge(le("qwikcity")),ve={},O={navCount:0},Vt=":root{view-transition-name:none}",Yt=t=>{},Kt=async(t,e)=>{const[n,o,r,s]=we(),{type:a="link",forceReload:i=t===void 0,replaceState:l=!1,scroll:f=!0}=typeof e=="object"?e:{forceReload:e};O.navCount++;const c=r.value.dest,u=t===void 0?c:typeof t=="number"?t:Ut(t,s.url);if(ve.$cbs$&&(i||typeof u=="number"||!W(u,c)||!pe(u,c))){const d=O.navCount,g=await Promise.all([...ve.$cbs$.values()].map(h=>h(u)));if(d!==O.navCount||g.some(Boolean)){d===O.navCount&&a==="popstate"&&history.pushState(null,"",c);return}}if(typeof u!="number"&&pe(u,c)&&!(!i&&W(u,c)))return r.value={type:a,dest:u,forceReload:i,replaceState:l,scroll:f},n.value=void 0,s.isNavigating=!0,new Promise(d=>{o.r=d})},Zt=({track:t})=>{const[e,n,o,r,s,a,i,l,f,c,u]=we();async function d(){const h=t(c),m=t(e),w=We(""),_=u.url,D=m?"form":h.type;h.replaceState;let y,C,S=null;if(y=new URL(h.dest,u.url),S=s.loadedRoute,C=s.response,S){const[A,J,V,T]=S,j=V,Y=j[j.length-1];h.dest.search&&W(y,_)&&(y.search=h.dest.search),W(y,_)||(u.prevUrl=_),u.url=y,u.params={...J},c.untrackedValue={type:D,dest:y};const x=Wt(C,u,j,w);n.headings=Y.headings,n.menu=T,o.value=ge(j),r.links=x.links,r.meta=x.meta,r.styles=x.styles,r.scripts=x.scripts,r.title=x.title,r.frontmatter=x.frontmatter}}return d()},Xt=t=>{Qe(E(Vt,"s_IcklmpF1eHg"));const e=Jt();if(!(e!=null&&e.params))throw new Error("Missing Qwik City Env Data for help visit https://github.com/QwikDev/qwik/issues/6237");const n=le("url");if(!n)throw new Error("Missing Qwik URL Env Data");if(e.ev.originalUrl.pathname!==e.ev.url.pathname)throw new Error('enableRequestRewrite is an experimental feature and is not enabled. Please enable the feature flag by adding `experimental: ["enableRequestRewrite"]` to your qwikVite plugin options.');const o=new URL(n),r=B({url:o,params:e.params,isNavigating:!1,prevUrl:void 0},{deep:!1}),s={},a=Ue(B(e.response.loaders,{deep:!1})),i=Z({type:"initial",dest:o,forceReload:!1,replaceState:!1,scroll:!0}),l=B(je),f=B({headings:void 0,menu:void 0}),c=Z(),u=e.response.action,d=u?e.response.loaders[u]:void 0,g=Z(d?{id:u,data:e.response.formData,output:{result:d,status:e.response.status}}:void 0),h=E(Yt,"s_Y2XixpY5THQ"),m=E(Kt,"s_9OvrikGDcF4",[g,s,i,r]);return k(Lt,f),k(Ee,c),k(Pe,l),k(Ce,r),k(Rt,m),k(It,a),k(Nt,g),k(At,h),Oe(E(Zt,"s_oFbhCpo86kE",[g,f,c,l,e,m,a,s,t,i,r])),$(Fe,null,3,"UD_3")},Mt=z(E(Xt,"s_9qu7c2w0mTE")),en=t=>v("script",{nonce:M(t,"nonce")},{type:"module",dangerouslySetInnerHTML:Dt},null,3,"UD_7"),tn=()=>{const t=Gt(),e=zt();return $(G,{children:[v("title",null,null,t.title,1,null),v("link",null,{rel:"canonical",href:Ge(n=>n.url.href,[e],"p0.url.href")},null,3,null),v("meta",null,{name:"viewport",content:"width=device-width, initial-scale=1.0"},null,3,null),v("link",null,{rel:"icon",type:"image/svg+xml",href:"/favicon.svg"},null,3,null),t.meta.map(n=>Q("meta",{...n},null,0,n.key)),t.links.map(n=>Q("link",{...n},null,0,n.key)),t.styles.map(n=>Q("style",{...n.props,get dangerouslySetInnerHTML(){return n.style},dangerouslySetInnerHTML:M(n,"style")},null,0,n.key)),t.scripts.map(n=>Q("script",{...n.props,get dangerouslySetInnerHTML(){return n.script},dangerouslySetInnerHTML:M(n,"script")},null,0,n.key))]},1,"PX_0")},nn=z(E(tn,"s_yZW4f4TVhxQ")),rn=()=>$(Mt,{children:[v("head",null,null,[v("meta",null,{charset:"utf-8"},null,3,null),v("link",null,{rel:"manifest",href:"/manifest.json"},null,3,null),v("link",null,{rel:"preconnect",href:"https://fonts.googleapis.com"},null,3,null),v("link",null,{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},null,3,null),v("link",null,{href:"https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Sora:wght@300;400;500;600;700&display=swap",rel:"stylesheet"},null,3,null),$(nn,null,3,"ZV_0"),$(en,null,3,"ZV_1")],1,null),v("body",null,{lang:"en",class:"bg-cream-50 text-ink-900 antialiased"},$(Qt,null,3,"ZV_2"),1,null)]},1,"ZV_3"),on=z(E(rn,"s_rFNzEoWD10o"));function an(t){return St($(on,null,3,"GT_0"),{manifest:ee,...t,containerAttributes:{lang:"en",...t.containerAttributes},serverData:{...t.serverData}})}export{an as default};
