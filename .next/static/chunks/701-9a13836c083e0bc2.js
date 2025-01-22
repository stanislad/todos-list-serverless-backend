"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[701],{6046:(t,e,r)=>{var s=r(6658);r.o(s,"useRouter")&&r.d(e,{useRouter:function(){return s.useRouter}})},5848:(t,e,r)=>{r.d(e,{n:()=>l});var s=r(2115),i=r(1049),n=r(5586),u=r(9323),a=r(4403),h=class extends u.Q{#t;#e=void 0;#r;#s;constructor(t,e){super(),this.#t=t,this.setOptions(e),this.bindMethods(),this.#i()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){let e=this.options;this.options=this.#t.defaultMutationOptions(t),(0,a.f8)(this.options,e)||this.#t.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#r,observer:this}),e?.mutationKey&&this.options.mutationKey&&(0,a.EN)(e.mutationKey)!==(0,a.EN)(this.options.mutationKey)?this.reset():this.#r?.state.status==="pending"&&this.#r.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#r?.removeObserver(this)}onMutationUpdate(t){this.#i(),this.#n(t)}getCurrentResult(){return this.#e}reset(){this.#r?.removeObserver(this),this.#r=void 0,this.#i(),this.#n()}mutate(t,e){return this.#s=e,this.#r?.removeObserver(this),this.#r=this.#t.getMutationCache().build(this.#t,this.options),this.#r.addObserver(this),this.#r.execute(t)}#i(){let t=this.#r?.state??(0,i.$)();this.#e={...t,isPending:"pending"===t.status,isSuccess:"success"===t.status,isError:"error"===t.status,isIdle:"idle"===t.status,mutate:this.mutate,reset:this.reset}}#n(t){n.j.batch(()=>{if(this.#s&&this.hasListeners()){let e=this.#e.variables,r=this.#e.context;t?.type==="success"?(this.#s.onSuccess?.(t.data,e,r),this.#s.onSettled?.(t.data,null,e,r)):t?.type==="error"&&(this.#s.onError?.(t.error,e,r),this.#s.onSettled?.(void 0,t.error,e,r))}this.listeners.forEach(t=>{t(this.#e)})})}},o=r(5906),c=r(6373);function l(t,e){let r=(0,o.jE)(e),[i]=s.useState(()=>new h(r,t));s.useEffect(()=>{i.setOptions(t)},[i,t]);let u=s.useSyncExternalStore(s.useCallback(t=>i.subscribe(n.j.batchCalls(t)),[i]),()=>i.getCurrentResult(),()=>i.getCurrentResult()),a=s.useCallback((t,e)=>{i.mutate(t,e).catch(c.l)},[i]);if(u.error&&(0,c.G)(i.options.throwOnError,[u.error]))throw u.error;return{...u,mutate:a,mutateAsync:u.mutate}}},547:(t,e,r)=>{r.d(e,{I:()=>M});var s=r(4017),i=r(5586),n=r(7702),u=r(9323),a=r(1277),h=r(4403),o=class extends u.Q{constructor(t,e){super(),this.options=e,this.#t=t,this.#u=null,this.#a=(0,a.T)(),this.options.experimental_prefetchInRender||this.#a.reject(Error("experimental_prefetchInRender feature flag is not enabled")),this.bindMethods(),this.setOptions(e)}#t;#h=void 0;#o=void 0;#e=void 0;#c;#l;#a;#u;#d;#p;#f;#y;#R;#v;#b=new Set;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){1===this.listeners.size&&(this.#h.addObserver(this),c(this.#h,this.options)?this.#m():this.updateResult(),this.#Q())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return l(this.#h,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return l(this.#h,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#O(),this.#g(),this.#h.removeObserver(this)}setOptions(t,e){let r=this.options,s=this.#h;if(this.options=this.#t.defaultQueryOptions(t),void 0!==this.options.enabled&&"boolean"!=typeof this.options.enabled&&"function"!=typeof this.options.enabled&&"boolean"!=typeof(0,h.Eh)(this.options.enabled,this.#h))throw Error("Expected enabled to be a boolean or a callback that returns a boolean");this.#I(),this.#h.setOptions(this.options),r._defaulted&&!(0,h.f8)(this.options,r)&&this.#t.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#h,observer:this});let i=this.hasListeners();i&&d(this.#h,s,this.options,r)&&this.#m(),this.updateResult(e),i&&(this.#h!==s||(0,h.Eh)(this.options.enabled,this.#h)!==(0,h.Eh)(r.enabled,this.#h)||(0,h.d2)(this.options.staleTime,this.#h)!==(0,h.d2)(r.staleTime,this.#h))&&this.#E();let n=this.#S();i&&(this.#h!==s||(0,h.Eh)(this.options.enabled,this.#h)!==(0,h.Eh)(r.enabled,this.#h)||n!==this.#v)&&this.#C(n)}getOptimisticResult(t){let e=this.#t.getQueryCache().build(this.#t,t),r=this.createResult(e,t);return(0,h.f8)(this.getCurrentResult(),r)||(this.#e=r,this.#l=this.options,this.#c=this.#h.state),r}getCurrentResult(){return this.#e}trackResult(t,e){let r={};return Object.keys(t).forEach(s=>{Object.defineProperty(r,s,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(s),e?.(s),t[s])})}),r}trackProp(t){this.#b.add(t)}getCurrentQuery(){return this.#h}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){let e=this.#t.defaultQueryOptions(t),r=this.#t.getQueryCache().build(this.#t,e);return r.fetch().then(()=>this.createResult(r,e))}fetch(t){return this.#m({...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#e))}#m(t){this.#I();let e=this.#h.fetch(this.options,t);return t?.throwOnError||(e=e.catch(h.lQ)),e}#E(){this.#O();let t=(0,h.d2)(this.options.staleTime,this.#h);if(h.S$||this.#e.isStale||!(0,h.gn)(t))return;let e=(0,h.j3)(this.#e.dataUpdatedAt,t);this.#y=setTimeout(()=>{this.#e.isStale||this.updateResult()},e+1)}#S(){return("function"==typeof this.options.refetchInterval?this.options.refetchInterval(this.#h):this.options.refetchInterval)??!1}#C(t){this.#g(),this.#v=t,!h.S$&&!1!==(0,h.Eh)(this.options.enabled,this.#h)&&(0,h.gn)(this.#v)&&0!==this.#v&&(this.#R=setInterval(()=>{(this.options.refetchIntervalInBackground||s.m.isFocused())&&this.#m()},this.#v))}#Q(){this.#E(),this.#C(this.#S())}#O(){this.#y&&(clearTimeout(this.#y),this.#y=void 0)}#g(){this.#R&&(clearInterval(this.#R),this.#R=void 0)}createResult(t,e){let r;let s=this.#h,i=this.options,u=this.#e,o=this.#c,l=this.#l,f=t!==s?t.state:this.#o,{state:y}=t,R={...y},v=!1;if(e._optimisticResults){let r=this.hasListeners(),u=!r&&c(t,e),a=r&&d(t,s,e,i);(u||a)&&(R={...R,...(0,n.k)(y.data,t.options)}),"isRestoring"===e._optimisticResults&&(R.fetchStatus="idle")}let{error:b,errorUpdatedAt:m,status:Q}=R;if(e.select&&void 0!==R.data){if(u&&R.data===o?.data&&e.select===this.#d)r=this.#p;else try{this.#d=e.select,r=e.select(R.data),r=(0,h.pl)(u?.data,r,e),this.#p=r,this.#u=null}catch(t){this.#u=t}}else r=R.data;if(void 0!==e.placeholderData&&void 0===r&&"pending"===Q){let t;if(u?.isPlaceholderData&&e.placeholderData===l?.placeholderData)t=u.data;else if(t="function"==typeof e.placeholderData?e.placeholderData(this.#f?.state.data,this.#f):e.placeholderData,e.select&&void 0!==t)try{t=e.select(t),this.#u=null}catch(t){this.#u=t}void 0!==t&&(Q="success",r=(0,h.pl)(u?.data,t,e),v=!0)}this.#u&&(b=this.#u,r=this.#p,m=Date.now(),Q="error");let O="fetching"===R.fetchStatus,g="pending"===Q,I="error"===Q,E=g&&O,S=void 0!==r,C={status:Q,fetchStatus:R.fetchStatus,isPending:g,isSuccess:"success"===Q,isError:I,isInitialLoading:E,isLoading:E,data:r,dataUpdatedAt:R.dataUpdatedAt,error:b,errorUpdatedAt:m,failureCount:R.fetchFailureCount,failureReason:R.fetchFailureReason,errorUpdateCount:R.errorUpdateCount,isFetched:R.dataUpdateCount>0||R.errorUpdateCount>0,isFetchedAfterMount:R.dataUpdateCount>f.dataUpdateCount||R.errorUpdateCount>f.errorUpdateCount,isFetching:O,isRefetching:O&&!g,isLoadingError:I&&!S,isPaused:"paused"===R.fetchStatus,isPlaceholderData:v,isRefetchError:I&&S,isStale:p(t,e),refetch:this.refetch,promise:this.#a};if(this.options.experimental_prefetchInRender){let e=t=>{"error"===C.status?t.reject(C.error):void 0!==C.data&&t.resolve(C.data)},r=()=>{e(this.#a=C.promise=(0,a.T)())},i=this.#a;switch(i.status){case"pending":t.queryHash===s.queryHash&&e(i);break;case"fulfilled":("error"===C.status||C.data!==i.value)&&r();break;case"rejected":("error"!==C.status||C.error!==i.reason)&&r()}}return C}updateResult(t){let e=this.#e,r=this.createResult(this.#h,this.options);if(this.#c=this.#h.state,this.#l=this.options,void 0!==this.#c.data&&(this.#f=this.#h),(0,h.f8)(r,e))return;this.#e=r;let s={};t?.listeners!==!1&&(()=>{if(!e)return!0;let{notifyOnChangeProps:t}=this.options,r="function"==typeof t?t():t;if("all"===r||!r&&!this.#b.size)return!0;let s=new Set(r??this.#b);return this.options.throwOnError&&s.add("error"),Object.keys(this.#e).some(t=>this.#e[t]!==e[t]&&s.has(t))})()&&(s.listeners=!0),this.#n({...s,...t})}#I(){let t=this.#t.getQueryCache().build(this.#t,this.options);if(t===this.#h)return;let e=this.#h;this.#h=t,this.#o=t.state,this.hasListeners()&&(e?.removeObserver(this),t.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#Q()}#n(t){i.j.batch(()=>{t.listeners&&this.listeners.forEach(t=>{t(this.#e)}),this.#t.getQueryCache().notify({query:this.#h,type:"observerResultsUpdated"})})}};function c(t,e){return!1!==(0,h.Eh)(e.enabled,t)&&void 0===t.state.data&&!("error"===t.state.status&&!1===e.retryOnMount)||void 0!==t.state.data&&l(t,e,e.refetchOnMount)}function l(t,e,r){if(!1!==(0,h.Eh)(e.enabled,t)){let s="function"==typeof r?r(t):r;return"always"===s||!1!==s&&p(t,e)}return!1}function d(t,e,r,s){return(t!==e||!1===(0,h.Eh)(s.enabled,t))&&(!r.suspense||"error"!==t.state.status)&&p(t,r)}function p(t,e){return!1!==(0,h.Eh)(e.enabled,t)&&t.isStaleByTime((0,h.d2)(e.staleTime,t))}var f=r(2115),y=r(5906);r(5155);var R=f.createContext(function(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}()),v=()=>f.useContext(R),b=r(6373),m=(t,e)=>{(t.suspense||t.throwOnError||t.experimental_prefetchInRender)&&!e.isReset()&&(t.retryOnMount=!1)},Q=t=>{f.useEffect(()=>{t.clearReset()},[t])},O=t=>{let{result:e,errorResetBoundary:r,throwOnError:s,query:i}=t;return e.isError&&!r.isReset()&&!e.isFetching&&i&&(0,b.G)(s,[e.error,i])},g=f.createContext(!1),I=()=>f.useContext(g);g.Provider;var E=t=>{t.suspense&&(void 0===t.staleTime&&(t.staleTime=1e3),"number"==typeof t.gcTime&&(t.gcTime=Math.max(t.gcTime,1e3)))},S=(t,e)=>t.isLoading&&t.isFetching&&!e,C=(t,e)=>t?.suspense&&e.isPending,T=(t,e,r)=>e.fetchOptimistic(t).catch(()=>{r.clearReset()});function M(t,e){return function(t,e,r){var s,n,u,a,o;let c=(0,y.jE)(r),l=I(),d=v(),p=c.defaultQueryOptions(t);null===(n=c.getDefaultOptions().queries)||void 0===n||null===(s=n._experimental_beforeQuery)||void 0===s||s.call(n,p),p._optimisticResults=l?"isRestoring":"optimistic",E(p),m(p,d),Q(d);let R=!c.getQueryCache().get(p.queryHash),[g]=f.useState(()=>new e(c,p)),M=g.getOptimisticResult(p);if(f.useSyncExternalStore(f.useCallback(t=>{let e=l?b.l:g.subscribe(i.j.batchCalls(t));return g.updateResult(),e},[g,l]),()=>g.getCurrentResult(),()=>g.getCurrentResult()),f.useEffect(()=>{g.setOptions(p,{listeners:!1})},[p,g]),C(p,M))throw T(p,g,d);if(O({result:M,errorResetBoundary:d,throwOnError:p.throwOnError,query:c.getQueryCache().get(p.queryHash)}))throw M.error;if(null===(a=c.getDefaultOptions().queries)||void 0===a||null===(u=a._experimental_afterQuery)||void 0===u||u.call(a,p,M),p.experimental_prefetchInRender&&!h.S$&&S(M,l)){let t=R?T(p,g,d):null===(o=c.getQueryCache().get(p.queryHash))||void 0===o?void 0:o.promise;null==t||t.catch(b.l).finally(()=>{g.updateResult()})}return p.notifyOnChangeProps?M:g.trackResult(M)}(t,o,e)}},6373:(t,e,r)=>{function s(t,e){return"function"==typeof t?t(...e):!!t}function i(){}r.d(e,{G:()=>s,l:()=>i})}}]);