import {
  Comment,
  Fragment,
  Teleport,
  Text,
  Transition,
  TransitionGroup,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  customRef,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  guardReactiveProps,
  h,
  hasInjectionContext,
  inject,
  isReactive,
  isRef,
  isVNode,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  onScopeDispose,
  openBlock,
  provide,
  reactive,
  readonly,
  ref,
  render,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  shallowRef,
  toDisplayString,
  toRaw,
  toRefs,
  toValue,
  unref,
  useAttrs,
  useCssVars,
  useSlots,
  vModelText,
  vShow,
  watch,
  watchEffect,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-HVR2FF6M.js";
import "./chunk-5WRI5ZAA.js";

// node_modules/yc-design-vue/es/node_modules/@vueuse/shared/index.js
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
var localProvidedStateMap = /* @__PURE__ */ new WeakMap();
var injectLocal = (...args) => {
  var _a;
  const key = args[0];
  const instance = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy;
  if (instance == null && !hasInjectionContext())
    throw new Error("injectLocal must be called in setup");
  if (instance && localProvidedStateMap.has(instance) && key in localProvidedStateMap.get(instance))
    return localProvidedStateMap.get(instance)[key];
  return inject(...args);
};
function makeDestructurable(obj, arr) {
  if (typeof Symbol !== "undefined") {
    const clone2 = { ...obj };
    Object.defineProperty(clone2, Symbol.iterator, {
      enumerable: false,
      value() {
        let index2 = 0;
        return {
          next: () => ({
            value: arr[index2++],
            done: index2 > arr.length
          })
        };
      }
    });
    return clone2;
  } else {
    return Object.assign([...arr], obj);
  }
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var notNullish = (val) => val != null;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _a, _b;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  let lastInvoker;
  const filter = (invoke) => {
    const duration3 = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration3 <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      lastInvoker = invoke;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(lastInvoker());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke());
      }, duration3);
    });
  };
  return filter;
}
function throttleFilter(...args) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop;
  let lastValue;
  let ms;
  let trailing;
  let leading;
  let rejectOnCancel;
  if (!isRef(args[0]) && typeof args[0] === "object")
    ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0]);
  else
    [ms, trailing = true, leading = true, rejectOnCancel = false] = args;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
      lastRejector();
      lastRejector = noop;
    }
  };
  const filter = (_invoke) => {
    const duration3 = toValue(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return lastValue = _invoke();
    };
    clear();
    if (duration3 <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration3 && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve;
        timer = setTimeout(() => {
          lastExec = Date.now();
          isLeading = true;
          resolve(invoke());
          clear();
        }, Math.max(0, duration3 - elapsed));
      });
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration3);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
function cacheStringFunction(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
function createSingletonPromise(fn) {
  let _promise;
  function wrapper() {
    if (!_promise)
      _promise = fn();
    return _promise;
  }
  wrapper.reset = async () => {
    const _prev = _promise;
    _promise = void 0;
    if (_prev)
      await _prev;
  };
  return wrapper;
}
function pxValue(px) {
  return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
}
function getLifeCycleTarget(target) {
  return getCurrentInstance();
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn
  );
}
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn
  );
}
function toRefs2(objectRef, options = {}) {
  if (!isRef(objectRef))
    return toRefs(objectRef);
  const result = Array.isArray(objectRef.value) ? Array.from({ length: objectRef.value.length }) : {};
  for (const key in objectRef.value) {
    result[key] = customRef(() => ({
      get() {
        return objectRef.value[key];
      },
      set(v) {
        var _a;
        const replaceRef = (_a = toValue(options.replaceRef)) != null ? _a : true;
        if (replaceRef) {
          if (Array.isArray(objectRef.value)) {
            const copy = [...objectRef.value];
            copy[key] = v;
            objectRef.value = copy;
          } else {
            const newObject = { ...objectRef.value, [key]: v };
            Object.setPrototypeOf(newObject, Object.getPrototypeOf(objectRef.value));
            objectRef.value = newObject;
          }
        } else {
          objectRef.value[key] = v;
        }
      }
    }));
  }
  return result;
}
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget();
  if (instance)
    onMounted(fn, target);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  const isPending = shallowRef(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop2() {
    isPending.value = false;
    clear();
  }
  function start2(...args) {
    if (immediateCallback)
      cb();
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, toValue(interval));
  }
  if (immediate) {
    isPending.value = true;
    if (isClient)
      start2();
  }
  tryOnScopeDispose(stop2);
  return {
    isPending: readonly(isPending),
    start: start2,
    stop: stop2
  };
}
function watchImmediate(source, cb, options) {
  return watch(
    source,
    cb,
    {
      ...options,
      immediate: true
    }
  );
}

// node_modules/yc-design-vue/es/node_modules/@vueuse/core/index.js
function createReusableTemplate(options = {}) {
  const {
    inheritAttrs = true
  } = options;
  const render2 = shallowRef();
  const define = defineComponent({
    setup(_, { slots }) {
      return () => {
        render2.value = slots.default;
      };
    }
  });
  const reuse = defineComponent({
    inheritAttrs,
    props: options.props,
    setup(props, { attrs, slots }) {
      return () => {
        var _a;
        if (!render2.value && true)
          throw new Error("[VueUse] Failed to find the definition of reusable template");
        const vnode = (_a = render2.value) == null ? void 0 : _a.call(render2, {
          ...options.props == null ? keysToCamelKebabCase(attrs) : props,
          $slots: slots
        });
        return inheritAttrs && (vnode == null ? void 0 : vnode.length) === 1 ? vnode[0] : vnode;
      };
    }
  });
  return makeDestructurable(
    { define, reuse },
    [define, reuse]
  );
}
function keysToCamelKebabCase(obj) {
  const newObj = {};
  for (const key in obj)
    newObj[camelize(key)] = obj[key];
  return newObj;
}
var defaultWindow = isClient ? window : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : void 0;
  });
  const stopWatch = watchImmediate(
    () => {
      var _a, _b;
      return [
        (_b = (_a = firstParamTargets.value) == null ? void 0 : _a.map((e) => unrefElement(e))) != null ? _b : [defaultWindow].filter((e) => e != null),
        toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
        toArray(unref(firstParamTargets.value ? args[2] : args[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        toValue(firstParamTargets.value ? args[3] : args[2])
      ];
    },
    ([raw_targets, raw_events, raw_listeners, raw_options]) => {
      cleanup();
      if (!(raw_targets == null ? void 0 : raw_targets.length) || !(raw_events == null ? void 0 : raw_events.length) || !(raw_listeners == null ? void 0 : raw_listeners.length))
        return;
      const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
      cleanups.push(
        ...raw_targets.flatMap(
          (el) => raw_events.flatMap(
            (event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))
          )
        )
      );
    },
    { flush: "post" }
  );
  const stop2 = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(cleanup);
  return stop2;
}
var _iOSWorkaround = false;
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false, controls = false } = options;
  if (!window2) {
    return controls ? { stop: noop, cancel: noop, trigger: noop } : noop;
  }
  if (isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true;
    const listenerOptions = { passive: true };
    Array.from(window2.document.body.children).forEach((el) => useEventListener(el, "click", noop, listenerOptions));
    useEventListener(window2.document.documentElement, "click", noop, listenerOptions);
  }
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return toValue(ignore).some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  function hasMultipleRoots(target2) {
    const vm = toValue(target2);
    return vm && vm.$.subTree.shapeFlag === 16;
  }
  function checkMultipleRoots(target2, event) {
    const vm = toValue(target2);
    const children = vm.$.subTree && vm.$.subTree.children;
    if (children == null || !Array.isArray(children))
      return false;
    return children.some((child) => child.el === event.target || event.composedPath().includes(child.el));
  }
  const listener = (event) => {
    const el = unrefElement(target);
    if (event.target == null)
      return;
    if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event))
      return;
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if ("detail" in event && event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  let isProcessingClick = false;
  const cleanup = [
    useEventListener(window2, "click", (event) => {
      if (!isProcessingClick) {
        isProcessingClick = true;
        setTimeout(() => {
          isProcessingClick = false;
        }, 0);
        listener(event);
      }
    }, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      setTimeout(() => {
        var _a;
        const el = unrefElement(target);
        if (((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement))) {
          handler(event);
        }
      }, 0);
    }, { passive: true })
  ].filter(Boolean);
  const stop2 = () => cleanup.forEach((fn) => fn());
  if (controls) {
    return {
      stop: stop2,
      cancel: () => {
        shouldListen = false;
      },
      trigger: (event) => {
        shouldListen = true;
        listener(event);
        shouldListen = false;
      }
    };
  }
  return stop2;
}
function useMounted() {
  const isMounted = shallowRef(false);
  const instance = getCurrentInstance();
  if (instance) {
    onMounted(() => {
      isMounted.value = true;
    }, instance);
  }
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && "MutationObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => {
    const value = toValue(target);
    const items = toArray(value).map(unrefElement).filter(notNullish);
    return new Set(items);
  });
  const stopWatch = watch(
    () => targets.value,
    (targets2) => {
      cleanup();
      if (isSupported.value && targets2.size) {
        observer = new MutationObserver(callback);
        targets2.forEach((el) => observer.observe(el, mutationOptions));
      }
    },
    { immediate: true, flush: "post" }
  );
  const takeRecords = () => {
    return observer == null ? void 0 : observer.takeRecords();
  };
  const stop2 = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop2);
  return {
    isSupported,
    stop: stop2,
    takeRecords
  };
}
function createKeyPredicate(keyFilter) {
  if (typeof keyFilter === "function")
    return keyFilter;
  else if (typeof keyFilter === "string")
    return (event) => event.key === keyFilter;
  else if (Array.isArray(keyFilter))
    return (event) => keyFilter.includes(event.key);
  return () => true;
}
function onKeyStroke(...args) {
  let key;
  let handler;
  let options = {};
  if (args.length === 3) {
    key = args[0];
    handler = args[1];
    options = args[2];
  } else if (args.length === 2) {
    if (typeof args[1] === "object") {
      key = true;
      handler = args[0];
      options = args[1];
    } else {
      key = args[0];
      handler = args[1];
    }
  } else {
    key = true;
    handler = args[0];
  }
  const {
    target = defaultWindow,
    eventName = "keydown",
    passive = false,
    dedupe = false
  } = options;
  const predicate = createKeyPredicate(key);
  const listener = (e) => {
    if (e.repeat && toValue(dedupe))
      return;
    if (predicate(e))
      handler(e);
  };
  return useEventListener(target, eventName, listener, passive);
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
function useSSRWidth() {
  const ssrWidth = hasInjectionContext() ? injectLocal(ssrWidthSymbol, null) : null;
  return typeof ssrWidth === "number" ? ssrWidth : void 0;
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow, ssrWidth = useSSRWidth() } = options;
  const isSupported = useSupported(() => window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  const ssrSupport = shallowRef(typeof ssrWidth === "number");
  const mediaQuery = shallowRef();
  const matches = shallowRef(false);
  const handler = (event) => {
    matches.value = event.matches;
  };
  watchEffect(() => {
    if (ssrSupport.value) {
      ssrSupport.value = !isSupported.value;
      const queryStrings = toValue(query).split(",");
      matches.value = queryStrings.some((queryString) => {
        const not = queryString.includes("not all");
        const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let res = Boolean(minWidth || maxWidth);
        if (minWidth && res) {
          res = ssrWidth >= pxValue(minWidth[1]);
        }
        if (maxWidth && res) {
          res = ssrWidth <= pxValue(maxWidth[1]);
        }
        return not ? !res : res;
      });
      return;
    }
    if (!isSupported.value)
      return;
    mediaQuery.value = window2.matchMedia(toValue(query));
    matches.value = mediaQuery.value.matches;
  });
  useEventListener(mediaQuery, "change", handler, { passive: true });
  return computed(() => matches.value);
}
function usePermission(permissionDesc, options = {}) {
  const {
    controls = false,
    navigator = defaultNavigator
  } = options;
  const isSupported = useSupported(() => navigator && "permissions" in navigator);
  const permissionStatus = shallowRef();
  const desc = typeof permissionDesc === "string" ? { name: permissionDesc } : permissionDesc;
  const state = shallowRef();
  const update2 = () => {
    var _a, _b;
    state.value = (_b = (_a = permissionStatus.value) == null ? void 0 : _a.state) != null ? _b : "prompt";
  };
  useEventListener(permissionStatus, "change", update2, { passive: true });
  const query = createSingletonPromise(async () => {
    if (!isSupported.value)
      return;
    if (!permissionStatus.value) {
      try {
        permissionStatus.value = await navigator.permissions.query(desc);
      } catch (e) {
        permissionStatus.value = void 0;
      } finally {
        update2();
      }
    }
    if (controls)
      return toRaw(permissionStatus.value);
  });
  query();
  if (controls) {
    return {
      state,
      isSupported,
      query
    };
  } else {
    return state;
  }
}
function useClipboard(options = {}) {
  const {
    navigator = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
    legacy = false
  } = options;
  const isClipboardApiSupported = useSupported(() => navigator && "clipboard" in navigator);
  const permissionRead = usePermission("clipboard-read");
  const permissionWrite = usePermission("clipboard-write");
  const isSupported = computed(() => isClipboardApiSupported.value || legacy);
  const text = shallowRef("");
  const copied = shallowRef(false);
  const timeout = useTimeoutFn(() => copied.value = false, copiedDuring, { immediate: false });
  async function updateText() {
    let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionRead.value));
    if (!useLegacy) {
      try {
        text.value = await navigator.clipboard.readText();
      } catch (e) {
        useLegacy = true;
      }
    }
    if (useLegacy) {
      text.value = legacyRead();
    }
  }
  if (isSupported.value && read)
    useEventListener(["copy", "cut"], updateText, { passive: true });
  async function copy(value = toValue(source)) {
    if (isSupported.value && value != null) {
      let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionWrite.value));
      if (!useLegacy) {
        try {
          await navigator.clipboard.writeText(value);
        } catch (e) {
          useLegacy = true;
        }
      }
      if (useLegacy)
        legacyCopy(value);
      text.value = value;
      copied.value = true;
      timeout.start();
    }
  }
  function legacyCopy(value) {
    const ta = document.createElement("textarea");
    ta.value = value != null ? value : "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  function legacyRead() {
    var _a, _b, _c;
    return (_c = (_b = (_a = document == null ? void 0 : document.getSelection) == null ? void 0 : _a.call(document)) == null ? void 0 : _b.toString()) != null ? _c : "";
  }
  function isAllowed(status) {
    return status === "granted" || status === "prompt";
  }
  return {
    isSupported,
    text,
    copied,
    copy
  };
}
function useDraggable(target, options = {}) {
  var _a;
  const {
    pointerTypes,
    preventDefault,
    stopPropagation,
    exact,
    onMove,
    onEnd,
    onStart,
    initialValue,
    axis = "both",
    draggingElement = defaultWindow,
    containerElement,
    handle: draggingHandle = target,
    buttons = [0]
  } = options;
  const position = ref(
    (_a = toValue(initialValue)) != null ? _a : { x: 0, y: 0 }
  );
  const pressedDelta = ref();
  const filterEvent = (e) => {
    if (pointerTypes)
      return pointerTypes.includes(e.pointerType);
    return true;
  };
  const handleEvent = (e) => {
    if (toValue(preventDefault))
      e.preventDefault();
    if (toValue(stopPropagation))
      e.stopPropagation();
  };
  const start2 = (e) => {
    var _a2;
    if (!toValue(buttons).includes(e.button))
      return;
    if (toValue(options.disabled) || !filterEvent(e))
      return;
    if (toValue(exact) && e.target !== toValue(target))
      return;
    const container5 = toValue(containerElement);
    const containerRect = (_a2 = container5 == null ? void 0 : container5.getBoundingClientRect) == null ? void 0 : _a2.call(container5);
    const targetRect = toValue(target).getBoundingClientRect();
    const pos = {
      x: e.clientX - (container5 ? targetRect.left - containerRect.left + container5.scrollLeft : targetRect.left),
      y: e.clientY - (container5 ? targetRect.top - containerRect.top + container5.scrollTop : targetRect.top)
    };
    if ((onStart == null ? void 0 : onStart(pos, e)) === false)
      return;
    pressedDelta.value = pos;
    handleEvent(e);
  };
  const move = (e) => {
    if (toValue(options.disabled) || !filterEvent(e))
      return;
    if (!pressedDelta.value)
      return;
    const container5 = toValue(containerElement);
    const targetRect = toValue(target).getBoundingClientRect();
    let { x, y } = position.value;
    if (axis === "x" || axis === "both") {
      x = e.clientX - pressedDelta.value.x;
      if (container5)
        x = Math.min(Math.max(0, x), container5.scrollWidth - targetRect.width);
    }
    if (axis === "y" || axis === "both") {
      y = e.clientY - pressedDelta.value.y;
      if (container5)
        y = Math.min(Math.max(0, y), container5.scrollHeight - targetRect.height);
    }
    position.value = {
      x,
      y
    };
    onMove == null ? void 0 : onMove(position.value, e);
    handleEvent(e);
  };
  const end = (e) => {
    if (toValue(options.disabled) || !filterEvent(e))
      return;
    if (!pressedDelta.value)
      return;
    pressedDelta.value = void 0;
    onEnd == null ? void 0 : onEnd(position.value, e);
    handleEvent(e);
  };
  if (isClient) {
    const config = () => {
      var _a2;
      return {
        capture: (_a2 = options.capture) != null ? _a2 : true,
        passive: !toValue(preventDefault)
      };
    };
    useEventListener(draggingHandle, "pointerdown", start2, config);
    useEventListener(draggingElement, "pointermove", move, config);
    useEventListener(draggingElement, "pointerup", end, config);
  }
  return {
    ...toRefs2(position),
    position,
    isDragging: computed(() => !!pressedDelta.value),
    style: computed(
      () => `left:${position.value.x}px;top:${position.value.y}px;`
    )
  };
}
function useResizeObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...observerOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => {
    const _targets = toValue(target);
    return Array.isArray(_targets) ? _targets.map((el) => unrefElement(el)) : [unrefElement(_targets)];
  });
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup();
      if (isSupported.value && window2) {
        observer = new ResizeObserver(callback);
        for (const _el of els) {
          if (_el)
            observer.observe(_el, observerOptions);
        }
      }
    },
    { immediate: true, flush: "post" }
  );
  const stop2 = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop2);
  return {
    isSupported,
    stop: stop2
  };
}
function useElementBounding(target, options = {}) {
  const {
    reset = true,
    windowResize = true,
    windowScroll = true,
    immediate = true,
    updateTiming = "sync"
  } = options;
  const height = shallowRef(0);
  const bottom = shallowRef(0);
  const left = shallowRef(0);
  const right = shallowRef(0);
  const top = shallowRef(0);
  const width = shallowRef(0);
  const x = shallowRef(0);
  const y = shallowRef(0);
  function recalculate() {
    const el = unrefElement(target);
    if (!el) {
      if (reset) {
        height.value = 0;
        bottom.value = 0;
        left.value = 0;
        right.value = 0;
        top.value = 0;
        width.value = 0;
        x.value = 0;
        y.value = 0;
      }
      return;
    }
    const rect = el.getBoundingClientRect();
    height.value = rect.height;
    bottom.value = rect.bottom;
    left.value = rect.left;
    right.value = rect.right;
    top.value = rect.top;
    width.value = rect.width;
    x.value = rect.x;
    y.value = rect.y;
  }
  function update2() {
    if (updateTiming === "sync")
      recalculate();
    else if (updateTiming === "next-frame")
      requestAnimationFrame(() => recalculate());
  }
  useResizeObserver(target, update2);
  watch(() => unrefElement(target), (ele) => !ele && update2());
  useMutationObserver(target, update2, {
    attributeFilter: ["style", "class"]
  });
  if (windowScroll)
    useEventListener("scroll", update2, { capture: true, passive: true });
  if (windowResize)
    useEventListener("resize", update2, { passive: true });
  tryOnMounted(() => {
    if (immediate)
      update2();
  });
  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update: update2
  };
}
function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const { window: window2 = defaultWindow, box = "content-box" } = options;
  const isSVG = computed(() => {
    var _a, _b;
    return (_b = (_a = unrefElement(target)) == null ? void 0 : _a.namespaceURI) == null ? void 0 : _b.includes("svg");
  });
  const width = shallowRef(initialSize.width);
  const height = shallowRef(initialSize.height);
  const { stop: stop1 } = useResizeObserver(
    target,
    ([entry]) => {
      const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
      if (window2 && isSVG.value) {
        const $elem = unrefElement(target);
        if ($elem) {
          const rect = $elem.getBoundingClientRect();
          width.value = rect.width;
          height.value = rect.height;
        }
      } else {
        if (boxSize) {
          const formatBoxSize = toArray(boxSize);
          width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
          height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
        } else {
          width.value = entry.contentRect.width;
          height.value = entry.contentRect.height;
        }
      }
    },
    options
  );
  tryOnMounted(() => {
    const ele = unrefElement(target);
    if (ele) {
      width.value = "offsetWidth" in ele ? ele.offsetWidth : initialSize.width;
      height.value = "offsetHeight" in ele ? ele.offsetHeight : initialSize.height;
    }
  });
  const stop2 = watch(
    () => unrefElement(target),
    (ele) => {
      width.value = ele ? initialSize.width : 0;
      height.value = ele ? initialSize.height : 0;
    }
  );
  function stop3() {
    stop1();
    stop2();
  }
  return {
    width,
    height,
    stop: stop3
  };
}
var ARRIVED_STATE_THRESHOLD_PIXELS = 1;
function useScroll(element, options = {}) {
  const {
    throttle: throttle2 = 0,
    idle = 200,
    onStop = noop,
    onScroll = noop,
    offset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventListenerOptions = {
      capture: false,
      passive: true
    },
    behavior = "auto",
    window: window2 = defaultWindow,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const internalX = shallowRef(0);
  const internalY = shallowRef(0);
  const x = computed({
    get() {
      return internalX.value;
    },
    set(x2) {
      scrollTo(x2, void 0);
    }
  });
  const y = computed({
    get() {
      return internalY.value;
    },
    set(y2) {
      scrollTo(void 0, y2);
    }
  });
  function scrollTo(_x, _y) {
    var _a, _b, _c, _d;
    if (!window2)
      return;
    const _element = toValue(element);
    if (!_element)
      return;
    (_c = _element instanceof Document ? window2.document.body : _element) == null ? void 0 : _c.scrollTo({
      top: (_a = toValue(_y)) != null ? _a : y.value,
      left: (_b = toValue(_x)) != null ? _b : x.value,
      behavior: toValue(behavior)
    });
    const scrollContainer = ((_d = _element == null ? void 0 : _element.document) == null ? void 0 : _d.documentElement) || (_element == null ? void 0 : _element.documentElement) || _element;
    if (x != null)
      internalX.value = scrollContainer.scrollLeft;
    if (y != null)
      internalY.value = scrollContainer.scrollTop;
  }
  const isScrolling = shallowRef(false);
  const arrivedState = reactive({
    left: true,
    right: false,
    top: true,
    bottom: false
  });
  const directions = reactive({
    left: false,
    right: false,
    top: false,
    bottom: false
  });
  const onScrollEnd = (e) => {
    if (!isScrolling.value)
      return;
    isScrolling.value = false;
    directions.left = false;
    directions.right = false;
    directions.top = false;
    directions.bottom = false;
    onStop(e);
  };
  const onScrollEndDebounced = useDebounceFn(onScrollEnd, throttle2 + idle);
  const setArrivedState = (target) => {
    var _a;
    if (!window2)
      return;
    const el = ((_a = target == null ? void 0 : target.document) == null ? void 0 : _a.documentElement) || (target == null ? void 0 : target.documentElement) || unrefElement(target);
    const { display, flexDirection, direction } = getComputedStyle(el);
    const directionMultipler = direction === "rtl" ? -1 : 1;
    const scrollLeft = el.scrollLeft;
    directions.left = scrollLeft < internalX.value;
    directions.right = scrollLeft > internalX.value;
    const left = Math.abs(scrollLeft * directionMultipler) <= (offset.left || 0);
    const right = Math.abs(scrollLeft * directionMultipler) + el.clientWidth >= el.scrollWidth - (offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    if (display === "flex" && flexDirection === "row-reverse") {
      arrivedState.left = right;
      arrivedState.right = left;
    } else {
      arrivedState.left = left;
      arrivedState.right = right;
    }
    internalX.value = scrollLeft;
    let scrollTop = el.scrollTop;
    if (target === window2.document && !scrollTop)
      scrollTop = window2.document.body.scrollTop;
    directions.top = scrollTop < internalY.value;
    directions.bottom = scrollTop > internalY.value;
    const top = Math.abs(scrollTop) <= (offset.top || 0);
    const bottom = Math.abs(scrollTop) + el.clientHeight >= el.scrollHeight - (offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    if (display === "flex" && flexDirection === "column-reverse") {
      arrivedState.top = bottom;
      arrivedState.bottom = top;
    } else {
      arrivedState.top = top;
      arrivedState.bottom = bottom;
    }
    internalY.value = scrollTop;
  };
  const onScrollHandler = (e) => {
    var _a;
    if (!window2)
      return;
    const eventTarget = (_a = e.target.documentElement) != null ? _a : e.target;
    setArrivedState(eventTarget);
    isScrolling.value = true;
    onScrollEndDebounced(e);
    onScroll(e);
  };
  useEventListener(
    element,
    "scroll",
    throttle2 ? useThrottleFn(onScrollHandler, throttle2, true, false) : onScrollHandler,
    eventListenerOptions
  );
  tryOnMounted(() => {
    try {
      const _element = toValue(element);
      if (!_element)
        return;
      setArrivedState(_element);
    } catch (e) {
      onError(e);
    }
  });
  useEventListener(
    element,
    "scrollend",
    onScrollEnd,
    eventListenerOptions
  );
  return {
    x,
    y,
    isScrolling,
    arrivedState,
    directions,
    measure() {
      const _element = toValue(element);
      if (window2 && _element)
        setArrivedState(_element);
    }
  };
}
function useVirtualList(list, options) {
  const { containerStyle, wrapperProps, scrollTo, calculateRange, currentList, containerRef } = "itemHeight" in options ? useVerticalVirtualList(options, list) : useHorizontalVirtualList(options, list);
  return {
    list: currentList,
    scrollTo,
    containerProps: {
      ref: containerRef,
      onScroll: () => {
        calculateRange();
      },
      style: containerStyle
    },
    wrapperProps
  };
}
function useVirtualListResources(list) {
  const containerRef = shallowRef(null);
  const size = useElementSize(containerRef);
  const currentList = ref([]);
  const source = shallowRef(list);
  const state = ref({ start: 0, end: 10 });
  return { state, source, currentList, size, containerRef };
}
function createGetViewCapacity(state, source, itemSize) {
  return (containerSize) => {
    if (typeof itemSize === "number")
      return Math.ceil(containerSize / itemSize);
    const { start: start2 = 0 } = state.value;
    let sum = 0;
    let capacity = 0;
    for (let i = start2; i < source.value.length; i++) {
      const size = itemSize(i);
      sum += size;
      capacity = i;
      if (sum > containerSize)
        break;
    }
    return capacity - start2;
  };
}
function createGetOffset(source, itemSize) {
  return (scrollDirection) => {
    if (typeof itemSize === "number")
      return Math.floor(scrollDirection / itemSize) + 1;
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < source.value.length; i++) {
      const size = itemSize(i);
      sum += size;
      if (sum >= scrollDirection) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };
}
function createCalculateRange(type, overscan, getOffset, getViewCapacity, { containerRef, state, currentList, source }) {
  return () => {
    const element = containerRef.value;
    if (element) {
      const offset = getOffset(type === "vertical" ? element.scrollTop : element.scrollLeft);
      const viewCapacity = getViewCapacity(type === "vertical" ? element.clientHeight : element.clientWidth);
      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length ? source.value.length : to
      };
      currentList.value = source.value.slice(state.value.start, state.value.end).map((ele, index2) => ({
        data: ele,
        index: index2 + state.value.start
      }));
    }
  };
}
function createGetDistance(itemSize, source) {
  return (index2) => {
    if (typeof itemSize === "number") {
      const size2 = index2 * itemSize;
      return size2;
    }
    const size = source.value.slice(0, index2).reduce((sum, _, i) => sum + itemSize(i), 0);
    return size;
  };
}
function useWatchForSizes(size, list, containerRef, calculateRange) {
  watch([size.width, size.height, list, containerRef], () => {
    calculateRange();
  });
}
function createComputedTotalSize(itemSize, source) {
  return computed(() => {
    if (typeof itemSize === "number")
      return source.value.length * itemSize;
    return source.value.reduce((sum, _, index2) => sum + itemSize(index2), 0);
  });
}
var scrollToDictionaryForElementScrollKey = {
  horizontal: "scrollLeft",
  vertical: "scrollTop"
};
function createScrollTo(type, calculateRange, getDistance, containerRef) {
  return (index2) => {
    if (containerRef.value) {
      containerRef.value[scrollToDictionaryForElementScrollKey[type]] = getDistance(index2);
      calculateRange();
    }
  };
}
function useHorizontalVirtualList(options, list) {
  const resources = useVirtualListResources(list);
  const { state, source, currentList, size, containerRef } = resources;
  const containerStyle = { overflowX: "auto" };
  const { itemWidth, overscan = 5 } = options;
  const getViewCapacity = createGetViewCapacity(state, source, itemWidth);
  const getOffset = createGetOffset(source, itemWidth);
  const calculateRange = createCalculateRange("horizontal", overscan, getOffset, getViewCapacity, resources);
  const getDistanceLeft = createGetDistance(itemWidth, source);
  const offsetLeft = computed(() => getDistanceLeft(state.value.start));
  const totalWidth = createComputedTotalSize(itemWidth, source);
  useWatchForSizes(size, list, containerRef, calculateRange);
  const scrollTo = createScrollTo("horizontal", calculateRange, getDistanceLeft, containerRef);
  const wrapperProps = computed(() => {
    return {
      style: {
        height: "100%",
        width: `${totalWidth.value - offsetLeft.value}px`,
        marginLeft: `${offsetLeft.value}px`,
        display: "flex"
      }
    };
  });
  return {
    scrollTo,
    calculateRange,
    wrapperProps,
    containerStyle,
    currentList,
    containerRef
  };
}
function useVerticalVirtualList(options, list) {
  const resources = useVirtualListResources(list);
  const { state, source, currentList, size, containerRef } = resources;
  const containerStyle = { overflowY: "auto" };
  const { itemHeight, overscan = 5 } = options;
  const getViewCapacity = createGetViewCapacity(state, source, itemHeight);
  const getOffset = createGetOffset(source, itemHeight);
  const calculateRange = createCalculateRange("vertical", overscan, getOffset, getViewCapacity, resources);
  const getDistanceTop = createGetDistance(itemHeight, source);
  const offsetTop = computed(() => getDistanceTop(state.value.start));
  const totalHeight = createComputedTotalSize(itemHeight, source);
  useWatchForSizes(size, list, containerRef, calculateRange);
  const scrollTo = createScrollTo("vertical", calculateRange, getDistanceTop, containerRef);
  const wrapperProps = computed(() => {
    return {
      style: {
        width: "100%",
        height: `${totalHeight.value - offsetTop.value}px`,
        marginTop: `${offsetTop.value}px`
      }
    };
  });
  return {
    calculateRange,
    scrollTo,
    containerStyle,
    wrapperProps,
    currentList,
    containerRef
  };
}

// node_modules/yc-design-vue/es/node_modules/tinycolor2/esm/tinycolor.js
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
var trimLeft = /^\s+/;
var trimRight = /\s+$/;
function tinycolor(color, opts) {
  color = color ? color : "";
  opts = opts || {};
  if (color instanceof tinycolor) {
    return color;
  }
  if (!(this instanceof tinycolor)) {
    return new tinycolor(color, opts);
  }
  var rgb = inputToRGB(color);
  this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
  this._gradientType = opts.gradientType;
  if (this._r < 1) this._r = Math.round(this._r);
  if (this._g < 1) this._g = Math.round(this._g);
  if (this._b < 1) this._b = Math.round(this._b);
  this._ok = rgb.ok;
}
tinycolor.prototype = {
  isDark: function isDark() {
    return this.getBrightness() < 128;
  },
  isLight: function isLight() {
    return !this.isDark();
  },
  isValid: function isValid() {
    return this._ok;
  },
  getOriginalInput: function getOriginalInput() {
    return this._originalInput;
  },
  getFormat: function getFormat() {
    return this._format;
  },
  getAlpha: function getAlpha() {
    return this._a;
  },
  getBrightness: function getBrightness() {
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
  },
  getLuminance: function getLuminance() {
    var rgb = this.toRgb();
    var RsRGB, GsRGB, BsRGB, R, G, B;
    RsRGB = rgb.r / 255;
    GsRGB = rgb.g / 255;
    BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) R = RsRGB / 12.92;
    else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    if (GsRGB <= 0.03928) G = GsRGB / 12.92;
    else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    if (BsRGB <= 0.03928) B = BsRGB / 12.92;
    else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  },
  setAlpha: function setAlpha(value) {
    this._a = boundAlpha(value);
    this._roundA = Math.round(100 * this._a) / 100;
    return this;
  },
  toHsv: function toHsv() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v,
      a: this._a
    };
  },
  toHsvString: function toHsvString() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    var h2 = Math.round(hsv.h * 360), s = Math.round(hsv.s * 100), v = Math.round(hsv.v * 100);
    return this._a == 1 ? "hsv(" + h2 + ", " + s + "%, " + v + "%)" : "hsva(" + h2 + ", " + s + "%, " + v + "%, " + this._roundA + ")";
  },
  toHsl: function toHsl() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    return {
      h: hsl.h * 360,
      s: hsl.s,
      l: hsl.l,
      a: this._a
    };
  },
  toHslString: function toHslString() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    var h2 = Math.round(hsl.h * 360), s = Math.round(hsl.s * 100), l = Math.round(hsl.l * 100);
    return this._a == 1 ? "hsl(" + h2 + ", " + s + "%, " + l + "%)" : "hsla(" + h2 + ", " + s + "%, " + l + "%, " + this._roundA + ")";
  },
  toHex: function toHex(allow3Char) {
    return rgbToHex(this._r, this._g, this._b, allow3Char);
  },
  toHexString: function toHexString(allow3Char) {
    return "#" + this.toHex(allow3Char);
  },
  toHex8: function toHex8(allow4Char) {
    return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
  },
  toHex8String: function toHex8String(allow4Char) {
    return "#" + this.toHex8(allow4Char);
  },
  toRgb: function toRgb() {
    return {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a
    };
  },
  toRgbString: function toRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
  },
  toPercentageRgb: function toPercentageRgb() {
    return {
      r: Math.round(bound01(this._r, 255) * 100) + "%",
      g: Math.round(bound01(this._g, 255) * 100) + "%",
      b: Math.round(bound01(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function toPercentageRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function toName() {
    if (this._a === 0) {
      return "transparent";
    }
    if (this._a < 1) {
      return false;
    }
    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
  },
  toFilter: function toFilter(secondColor) {
    var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
    var secondHex8String = hex8String;
    var gradientType = this._gradientType ? "GradientType = 1, " : "";
    if (secondColor) {
      var s = tinycolor(secondColor);
      secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
  },
  toString: function toString2(format) {
    var formatSet = !!format;
    format = format || this._format;
    var formattedString = false;
    var hasAlpha = this._a < 1 && this._a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
    if (needsAlphaFormat) {
      if (format === "name" && this._a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format === "name") {
      formattedString = this.toName();
    }
    if (format === "hsl") {
      formattedString = this.toHslString();
    }
    if (format === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  },
  clone: function clone() {
    return tinycolor(this.toString());
  },
  _applyModification: function _applyModification(fn, args) {
    var color = fn.apply(null, [this].concat([].slice.call(args)));
    this._r = color._r;
    this._g = color._g;
    this._b = color._b;
    this.setAlpha(color._a);
    return this;
  },
  lighten: function lighten() {
    return this._applyModification(_lighten, arguments);
  },
  brighten: function brighten() {
    return this._applyModification(_brighten, arguments);
  },
  darken: function darken() {
    return this._applyModification(_darken, arguments);
  },
  desaturate: function desaturate() {
    return this._applyModification(_desaturate, arguments);
  },
  saturate: function saturate() {
    return this._applyModification(_saturate, arguments);
  },
  greyscale: function greyscale() {
    return this._applyModification(_greyscale, arguments);
  },
  spin: function spin() {
    return this._applyModification(_spin, arguments);
  },
  _applyCombination: function _applyCombination(fn, args) {
    return fn.apply(null, [this].concat([].slice.call(args)));
  },
  analogous: function analogous() {
    return this._applyCombination(_analogous, arguments);
  },
  complement: function complement() {
    return this._applyCombination(_complement, arguments);
  },
  monochromatic: function monochromatic() {
    return this._applyCombination(_monochromatic, arguments);
  },
  splitcomplement: function splitcomplement() {
    return this._applyCombination(_splitcomplement, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function triad() {
    return this._applyCombination(polyad, [3]);
  },
  tetrad: function tetrad() {
    return this._applyCombination(polyad, [4]);
  }
};
tinycolor.fromRatio = function(color, opts) {
  if (_typeof(color) == "object") {
    var newColor = {};
    for (var i in color) {
      if (color.hasOwnProperty(i)) {
        if (i === "a") {
          newColor[i] = color[i];
        } else {
          newColor[i] = convertToPercentage(color[i]);
        }
      }
    }
    color = newColor;
  }
  return tinycolor(color, opts);
};
function inputToRGB(color) {
  var rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color == "string") {
    color = stringInputToObject(color);
  }
  if (_typeof(color) == "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (color.hasOwnProperty("a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a
  };
}
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h2, s, l = (max + min) / 2;
  if (max == min) {
    h2 = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h2 = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h2 = (b - r) / d + 2;
        break;
      case b:
        h2 = (r - g) / d + 4;
        break;
    }
    h2 /= 6;
  }
  return {
    h: h2,
    s,
    l
  };
}
function hslToRgb(h2, s, l) {
  var r, g, b;
  h2 = bound01(h2, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  function hue2rgb(p2, q2, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
    if (t < 1 / 2) return q2;
    if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
    return p2;
  }
  if (s === 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h2 + 1 / 3);
    g = hue2rgb(p, q, h2);
    b = hue2rgb(p, q, h2 - 1 / 3);
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h2, s, v = max;
  var d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max == min) {
    h2 = 0;
  } else {
    switch (max) {
      case r:
        h2 = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h2 = (b - r) / d + 2;
        break;
      case b:
        h2 = (r - g) / d + 4;
        break;
    }
    h2 /= 6;
  }
  return {
    h: h2,
    s,
    v
  };
}
function hsvToRgb(h2, s, v) {
  h2 = bound01(h2, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h2), f = h2 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}
function rgbToHex(r, g, b, allow3Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16)), pad2(convertDecimalToHex(a))];
  if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}
function rgbaToArgbHex(r, g, b, a) {
  var hex = [pad2(convertDecimalToHex(a)), pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  return hex.join("");
}
tinycolor.equals = function(color1, color2) {
  if (!color1 || !color2) return false;
  return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};
tinycolor.random = function() {
  return tinycolor.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};
function _desaturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s -= amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _saturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s += amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _greyscale(color) {
  return tinycolor(color).desaturate(100);
}
function _lighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l += amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
function _brighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var rgb = tinycolor(color).toRgb();
  rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
  rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
  rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
  return tinycolor(rgb);
}
function _darken(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l -= amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
function _spin(color, amount) {
  var hsl = tinycolor(color).toHsl();
  var hue = (hsl.h + amount) % 360;
  hsl.h = hue < 0 ? 360 + hue : hue;
  return tinycolor(hsl);
}
function _complement(color) {
  var hsl = tinycolor(color).toHsl();
  hsl.h = (hsl.h + 180) % 360;
  return tinycolor(hsl);
}
function polyad(color, number) {
  if (isNaN(number) || number <= 0) {
    throw new Error("Argument to polyad must be a positive number");
  }
  var hsl = tinycolor(color).toHsl();
  var result = [tinycolor(color)];
  var step = 360 / number;
  for (var i = 1; i < number; i++) {
    result.push(tinycolor({
      h: (hsl.h + i * step) % 360,
      s: hsl.s,
      l: hsl.l
    }));
  }
  return result;
}
function _splitcomplement(color) {
  var hsl = tinycolor(color).toHsl();
  var h2 = hsl.h;
  return [tinycolor(color), tinycolor({
    h: (h2 + 72) % 360,
    s: hsl.s,
    l: hsl.l
  }), tinycolor({
    h: (h2 + 216) % 360,
    s: hsl.s,
    l: hsl.l
  })];
}
function _analogous(color, results, slices) {
  results = results || 6;
  slices = slices || 30;
  var hsl = tinycolor(color).toHsl();
  var part = 360 / slices;
  var ret = [tinycolor(color)];
  for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
    hsl.h = (hsl.h + part) % 360;
    ret.push(tinycolor(hsl));
  }
  return ret;
}
function _monochromatic(color, results) {
  results = results || 6;
  var hsv = tinycolor(color).toHsv();
  var h2 = hsv.h, s = hsv.s, v = hsv.v;
  var ret = [];
  var modification = 1 / results;
  while (results--) {
    ret.push(tinycolor({
      h: h2,
      s,
      v
    }));
    v = (v + modification) % 1;
  }
  return ret;
}
tinycolor.mix = function(color1, color2, amount) {
  amount = amount === 0 ? 0 : amount || 50;
  var rgb1 = tinycolor(color1).toRgb();
  var rgb2 = tinycolor(color2).toRgb();
  var p = amount / 100;
  var rgba = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
    a: (rgb2.a - rgb1.a) * p + rgb1.a
  };
  return tinycolor(rgba);
};
tinycolor.readability = function(color1, color2) {
  var c1 = tinycolor(color1);
  var c2 = tinycolor(color2);
  return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
};
tinycolor.isReadable = function(color1, color2, wcag2) {
  var readability = tinycolor.readability(color1, color2);
  var wcag2Parms, out;
  out = false;
  wcag2Parms = validateWCAG2Parms(wcag2);
  switch (wcag2Parms.level + wcag2Parms.size) {
    case "AAsmall":
    case "AAAlarge":
      out = readability >= 4.5;
      break;
    case "AAlarge":
      out = readability >= 3;
      break;
    case "AAAsmall":
      out = readability >= 7;
      break;
  }
  return out;
};
tinycolor.mostReadable = function(baseColor, colorList, args) {
  var bestColor = null;
  var bestScore = 0;
  var readability;
  var includeFallbackColors, level, size;
  args = args || {};
  includeFallbackColors = args.includeFallbackColors;
  level = args.level;
  size = args.size;
  for (var i = 0; i < colorList.length; i++) {
    readability = tinycolor.readability(baseColor, colorList[i]);
    if (readability > bestScore) {
      bestScore = readability;
      bestColor = tinycolor(colorList[i]);
    }
  }
  if (tinycolor.isReadable(baseColor, bestColor, {
    level,
    size
  }) || !includeFallbackColors) {
    return bestColor;
  } else {
    args.includeFallbackColors = false;
    return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
  }
};
var names = tinycolor.names = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
var hexNames = tinycolor.hexNames = flip(names);
function flip(o) {
  var flipped = {};
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      flipped[o[i]] = i;
    }
  }
  return flipped;
}
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}
function bound01(n, max) {
  if (isOnePointZero(n)) n = "100%";
  var processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }
  if (Math.abs(n - max) < 1e-6) {
    return 1;
  }
  return n % max / parseFloat(max);
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function isOnePointZero(n) {
  return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
}
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") != -1;
}
function pad2(c) {
  return c.length == 1 ? "0" + c : "" + c;
}
function convertToPercentage(n) {
  if (n <= 1) {
    n = n * 100 + "%";
  }
  return n;
}
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
function convertHexToDecimal(h2) {
  return parseIntFromHex(h2) / 255;
}
var matchers = function() {
  var CSS_INTEGER = "[-\\+]?\\d+%?";
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
  var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();
function isValidCSSUnit(color) {
  return !!matchers.CSS_UNIT.exec(color);
}
function stringInputToObject(color) {
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color == "transparent") {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  }
  var match;
  if (match = matchers.rgb.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3]
    };
  }
  if (match = matchers.rgba.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsl.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3]
    };
  }
  if (match = matchers.hsla.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsv.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3]
    };
  }
  if (match = matchers.hsva.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hex8.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex6.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  if (match = matchers.hex4.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      a: convertHexToDecimal(match[4] + "" + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex3.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function validateWCAG2Parms(parms) {
  var level, size;
  parms = parms || {
    level: "AA",
    size: "small"
  };
  level = (parms.level || "AA").toUpperCase();
  size = (parms.size || "small").toLowerCase();
  if (level !== "AA" && level !== "AAA") {
    level = "AA";
  }
  if (size !== "small" && size !== "large") {
    size = "small";
  }
  return {
    level,
    size
  };
}

// node_modules/yc-design-vue/es/_shared/utils/is.js
function isNull(value) {
  return value === null;
}
function isUndefined(value) {
  return value === void 0;
}
function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function isString(value) {
  return typeof value === "string";
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isFunction(value) {
  return typeof value === "function";
}
function isArray(value) {
  return Array.isArray(value);
}
function isObject2(value) {
  return value !== null && typeof value === "object";
}

// node_modules/yc-design-vue/es/_shared/utils/dom.js
var isServerRendering = (() => {
  try {
    return !(typeof window !== "undefined" && document !== void 0);
  } catch (e) {
    return true;
  }
})();
var querySelector = (selectors, container5) => {
  if (isServerRendering) {
    return void 0;
  }
  return (container5 ?? document).querySelector(selectors) ?? void 0;
};
var getElement = (target, container5) => {
  if (isString(target)) {
    const selector = target[0] === "#" ? `[id='${target.slice(1)}']` : target;
    return querySelector(selector, container5);
  }
  return target;
};
var getDomText = (dom) => {
  var _a;
  return ((_a = unrefElement(dom)) == null ? void 0 : _a.innerText) || "";
};
var getMedicaQueryQuerues = () => {
  return {
    xs: "(min-width: 0)",
    sm: "(min-width: 576px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 992px)",
    xl: "(min-width: 1200px)",
    xxl: "(min-width: 1600px)"
  };
};
var getBreakpointValue = (breakpoint, value, defaultValue) => {
  if (!isObject2(value)) {
    return value;
  }
  const order = ["xs", "sm", "md", "lg", "xl", "xxl"];
  const index2 = order.indexOf(breakpoint);
  for (let i = index2; i >= 0; i--) {
    const bp = order[i];
    if (isUndefined(value[bp])) continue;
    return value[bp];
  }
  for (let i = index2 + 1; i < order.length; i++) {
    const bp = order[i];
    if (isUndefined(value[bp])) continue;
    return value[bp];
  }
  return defaultValue;
};
var mediaQueryHandler = (onBreakpoint, queries = getMedicaQueryQuerues()) => {
  const breakpoints = [];
  const order = {};
  const matches = [];
  Object.keys(queries).forEach((key, i) => {
    breakpoints.push(key);
    order[key] = i;
    matches.push(useMediaQuery(queries[key]));
  });
  watch(
    matches,
    (val) => {
      const i = val.lastIndexOf(true);
      onBreakpoint(breakpoints[i], order, i);
    },
    {
      immediate: true
    }
  );
};
var findFirstScrollableParent = (element) => {
  if (!element || element === document.body) {
    return;
  }
  let currentElement = element.parentElement;
  while (currentElement && currentElement !== document.body) {
    const style = window.getComputedStyle(currentElement);
    const overflow = style.overflowY || style.overflow;
    const isScrollable = ["auto", "scroll"].includes(overflow);
    const canScroll = currentElement.scrollHeight > currentElement.clientHeight;
    if (isScrollable && canScroll) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
};

// node_modules/yc-design-vue/es/_shared/utils/fn.js
var sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
};
var throttleByRaf = (cb) => {
  let timer = 0;
  const throttle2 = (...args) => {
    if (timer) {
      window.cancelAnimationFrame(timer);
    }
    timer = window.requestAnimationFrame(() => {
      cb(...args);
      timer = 0;
    });
  };
  throttle2.cancel = () => {
    window.cancelAnimationFrame(timer);
    timer = 0;
  };
  return throttle2;
};
var debounce = (func, delay, immediate = false) => {
  let timer = null;
  let isInvoked = false;
  return function(...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    if (immediate && !isInvoked) {
      func.apply(context, args);
      isInvoked = true;
    }
    timer = setTimeout(() => {
      if (!immediate) {
        func.apply(context, args);
      }
      isInvoked = false;
    }, delay);
  };
};
var throttle = (fn, delay) => {
  let lastTime = 0;
  let timeoutId = null;
  return function(...args) {
    const now = Date.now();
    const remaining = delay - (now - lastTime);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (remaining <= 0) {
      fn.apply(this, args);
      lastTime = now;
    } else {
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
        lastTime = Date.now();
        timeoutId = null;
      }, remaining);
    }
  };
};
var valueToPx = (value) => {
  const numberReg = /^-?\d+(\.\d+)?$/;
  if (isNumber(value) || isString(value) && numberReg.test(value)) {
    return value + "px";
  }
  return value;
};

// node_modules/yc-design-vue/es/_virtual/_commonjsHelpers.js
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}

// node_modules/yc-design-vue/es/_virtual/dayjs.min.js
var dayjs_min = { exports: {} };

// node_modules/yc-design-vue/es/node_modules/dayjs/dayjs.min.js
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h2 = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
      var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
      return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
    } }, m = function(t2, e2, n2) {
      var r2 = String(t2);
      return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
    }, v = { s: m, z: function(t2) {
      var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
    }, m: function t2(e2, n2) {
      if (e2.date() < n2.date()) return -t2(n2, e2);
      var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
      return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
    }, a: function(t2) {
      return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
    }, p: function(t2) {
      return { M: c, y: h2, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t2) {
      return void 0 === t2;
    } }, g = "en", D = {};
    D[g] = M;
    var p = "$isDayjsObject", S = function(t2) {
      return t2 instanceof _ || !(!t2 || !t2[p]);
    }, w = function t2(e2, n2, r2) {
      var i2;
      if (!e2) return g;
      if ("string" == typeof e2) {
        var s2 = e2.toLowerCase();
        D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
        var u2 = e2.split("-");
        if (!i2 && u2.length > 1) return t2(u2[0]);
      } else {
        var a2 = e2.name;
        D[a2] = e2, i2 = a2;
      }
      return !r2 && i2 && (g = i2), i2 || !r2 && g;
    }, O = function(t2, e2) {
      if (S(t2)) return t2.clone();
      var n2 = "object" == typeof e2 ? e2 : {};
      return n2.date = t2, n2.args = arguments, new _(n2);
    }, b = v;
    b.l = w, b.i = S, b.w = function(t2, e2) {
      return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M2(t2) {
        this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
      }
      var m2 = M2.prototype;
      return m2.parse = function(t2) {
        this.$d = function(t3) {
          var e2 = t3.date, n2 = t3.utc;
          if (null === e2) return /* @__PURE__ */ new Date(NaN);
          if (b.u(e2)) return /* @__PURE__ */ new Date();
          if (e2 instanceof Date) return new Date(e2);
          if ("string" == typeof e2 && !/Z$/i.test(e2)) {
            var r2 = e2.match($);
            if (r2) {
              var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
              return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t2), this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return b;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t2, e2) {
        var n2 = O(t2);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return O(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < O(t2);
      }, m2.$g = function(t2, e2, n2) {
        return b.u(t2) ? this[e2] : this.set(n2, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
          var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
          return r2 ? i2 : i2.endOf(a);
        }, $2 = function(t3, e3) {
          return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
        switch (f2) {
          case h2:
            return r2 ? l2(1, 0) : l2(31, 11);
          case c:
            return r2 ? l2(1, M3) : l2(0, M3 + 1);
          case o:
            var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
            return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
          case a:
          case d:
            return $2(v2 + "Hours", 0);
          case u:
            return $2(v2 + "Minutes", 1);
          case s:
            return $2(v2 + "Seconds", 2);
          case i:
            return $2(v2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t2) {
        return this.startOf(t2, false);
      }, m2.$set = function(t2, e2) {
        var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h2] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === c || o2 === h2) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[b.p(t2)]();
      }, m2.add = function(r2, f2) {
        var d2, l2 = this;
        r2 = Number(r2);
        var $2 = b.p(f2), y2 = function(t2) {
          var e2 = O(l2);
          return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
        };
        if ($2 === c) return this.set(c, this.$M + r2);
        if ($2 === h2) return this.set(h2, this.$y + r2);
        if ($2 === a) return y2(1);
        if ($2 === o) return y2(7);
        var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
        return b.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid()) return n2.invalidDate || l;
        var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h22 = function(t3, n3, i3, s3) {
          return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
        }, d2 = function(t3) {
          return b.s(s2 % 12 || 12, t3, "0");
        }, $2 = f2 || function(t3, e3, n3) {
          var r3 = t3 < 12 ? "AM" : "PM";
          return n3 ? r3.toLowerCase() : r3;
        };
        return r2.replace(y, function(t3, r3) {
          return r3 || function(t4) {
            switch (t4) {
              case "YY":
                return String(e2.$y).slice(-2);
              case "YYYY":
                return b.s(e2.$y, 4, "0");
              case "M":
                return a2 + 1;
              case "MM":
                return b.s(a2 + 1, 2, "0");
              case "MMM":
                return h22(n2.monthsShort, a2, c2, 3);
              case "MMMM":
                return h22(c2, a2);
              case "D":
                return e2.$D;
              case "DD":
                return b.s(e2.$D, 2, "0");
              case "d":
                return String(e2.$W);
              case "dd":
                return h22(n2.weekdaysMin, e2.$W, o2, 2);
              case "ddd":
                return h22(n2.weekdaysShort, e2.$W, o2, 3);
              case "dddd":
                return o2[e2.$W];
              case "H":
                return String(s2);
              case "HH":
                return b.s(s2, 2, "0");
              case "h":
                return d2(1);
              case "hh":
                return d2(2);
              case "a":
                return $2(s2, u2, true);
              case "A":
                return $2(s2, u2, false);
              case "m":
                return String(u2);
              case "mm":
                return b.s(u2, 2, "0");
              case "s":
                return String(e2.$s);
              case "ss":
                return b.s(e2.$s, 2, "0");
              case "SSS":
                return b.s(e2.$ms, 3, "0");
              case "Z":
                return i2;
            }
            return null;
          }(t3) || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d2, l2) {
        var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
          return b.m(y2, m3);
        };
        switch (M3) {
          case h2:
            $2 = D2() / 12;
            break;
          case c:
            $2 = D2();
            break;
          case f:
            $2 = D2() / 3;
            break;
          case o:
            $2 = (g2 - v2) / 6048e5;
            break;
          case a:
            $2 = (g2 - v2) / 864e5;
            break;
          case u:
            $2 = g2 / n;
            break;
          case s:
            $2 = g2 / e;
            break;
          case i:
            $2 = g2 / t;
            break;
          default:
            $2 = g2;
        }
        return l2 ? $2 : b.a($2);
      }, m2.daysInMonth = function() {
        return this.endOf(c).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2) return this.$L;
        var n2 = this.clone(), r2 = w(t2, e2, true);
        return r2 && (n2.$L = r2), n2;
      }, m2.clone = function() {
        return b.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), k = _.prototype;
    return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h2], ["$D", d]].forEach(function(t2) {
      k[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    }), O.extend = function(t2, e2) {
      return t2.$i || (t2(e2, _, O), t2.$i = true), O;
    }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
      return O(1e3 * t2);
    }, O.en = D[g], O.Ls = D, O.p = {}, O;
  });
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
var dayjs = getDefaultExportFromCjs(dayjs_minExports);

// node_modules/yc-design-vue/es/_virtual/en.js
var en = { exports: {} };

// node_modules/yc-design-vue/es/node_modules/dayjs/locale/en.js
(function(module, exports) {
  !function(e, n) {
    module.exports = n();
  }(commonjsGlobal, function() {
    return { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(e) {
      var n = ["th", "st", "nd", "rd"], t = e % 100;
      return "[" + e + (n[(t - 20) % 10] || n[t] || n[0]) + "]";
    } };
  });
})(en);

// node_modules/yc-design-vue/es/_virtual/duration.js
var duration = { exports: {} };

// node_modules/yc-design-vue/es/node_modules/dayjs/plugin/duration.js
(function(module, exports) {
  !function(t, s) {
    module.exports = s();
  }(commonjsGlobal, function() {
    var t, s, n = 1e3, i = 6e4, e = 36e5, r = 864e5, o = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, u = 31536e6, d = 2628e6, a = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, h2 = { years: u, months: d, days: r, hours: e, minutes: i, seconds: n, milliseconds: 1, weeks: 6048e5 }, c = function(t2) {
      return t2 instanceof g;
    }, f = function(t2, s2, n2) {
      return new g(t2, n2, s2.$l);
    }, m = function(t2) {
      return s.p(t2) + "s";
    }, l = function(t2) {
      return t2 < 0;
    }, $ = function(t2) {
      return l(t2) ? Math.ceil(t2) : Math.floor(t2);
    }, y = function(t2) {
      return Math.abs(t2);
    }, v = function(t2, s2) {
      return t2 ? l(t2) ? { negative: true, format: "" + y(t2) + s2 } : { negative: false, format: "" + t2 + s2 } : { negative: false, format: "" };
    }, g = function() {
      function l2(t2, s2, n2) {
        var i2 = this;
        if (this.$d = {}, this.$l = n2, void 0 === t2 && (this.$ms = 0, this.parseFromMilliseconds()), s2) return f(t2 * h2[m(s2)], this);
        if ("number" == typeof t2) return this.$ms = t2, this.parseFromMilliseconds(), this;
        if ("object" == typeof t2) return Object.keys(t2).forEach(function(s3) {
          i2.$d[m(s3)] = t2[s3];
        }), this.calMilliseconds(), this;
        if ("string" == typeof t2) {
          var e2 = t2.match(a);
          if (e2) {
            var r2 = e2.slice(2).map(function(t3) {
              return null != t3 ? Number(t3) : 0;
            });
            return this.$d.years = r2[0], this.$d.months = r2[1], this.$d.weeks = r2[2], this.$d.days = r2[3], this.$d.hours = r2[4], this.$d.minutes = r2[5], this.$d.seconds = r2[6], this.calMilliseconds(), this;
          }
        }
        return this;
      }
      var y2 = l2.prototype;
      return y2.calMilliseconds = function() {
        var t2 = this;
        this.$ms = Object.keys(this.$d).reduce(function(s2, n2) {
          return s2 + (t2.$d[n2] || 0) * h2[n2];
        }, 0);
      }, y2.parseFromMilliseconds = function() {
        var t2 = this.$ms;
        this.$d.years = $(t2 / u), t2 %= u, this.$d.months = $(t2 / d), t2 %= d, this.$d.days = $(t2 / r), t2 %= r, this.$d.hours = $(t2 / e), t2 %= e, this.$d.minutes = $(t2 / i), t2 %= i, this.$d.seconds = $(t2 / n), t2 %= n, this.$d.milliseconds = t2;
      }, y2.toISOString = function() {
        var t2 = v(this.$d.years, "Y"), s2 = v(this.$d.months, "M"), n2 = +this.$d.days || 0;
        this.$d.weeks && (n2 += 7 * this.$d.weeks);
        var i2 = v(n2, "D"), e2 = v(this.$d.hours, "H"), r2 = v(this.$d.minutes, "M"), o2 = this.$d.seconds || 0;
        this.$d.milliseconds && (o2 += this.$d.milliseconds / 1e3, o2 = Math.round(1e3 * o2) / 1e3);
        var u2 = v(o2, "S"), d2 = t2.negative || s2.negative || i2.negative || e2.negative || r2.negative || u2.negative, a2 = e2.format || r2.format || u2.format ? "T" : "", h22 = (d2 ? "-" : "") + "P" + t2.format + s2.format + i2.format + a2 + e2.format + r2.format + u2.format;
        return "P" === h22 || "-P" === h22 ? "P0D" : h22;
      }, y2.toJSON = function() {
        return this.toISOString();
      }, y2.format = function(t2) {
        var n2 = t2 || "YYYY-MM-DDTHH:mm:ss", i2 = { Y: this.$d.years, YY: s.s(this.$d.years, 2, "0"), YYYY: s.s(this.$d.years, 4, "0"), M: this.$d.months, MM: s.s(this.$d.months, 2, "0"), D: this.$d.days, DD: s.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: s.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: s.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: s.s(this.$d.seconds, 2, "0"), SSS: s.s(this.$d.milliseconds, 3, "0") };
        return n2.replace(o, function(t3, s2) {
          return s2 || String(i2[t3]);
        });
      }, y2.as = function(t2) {
        return this.$ms / h2[m(t2)];
      }, y2.get = function(t2) {
        var s2 = this.$ms, n2 = m(t2);
        return "milliseconds" === n2 ? s2 %= 1e3 : s2 = "weeks" === n2 ? $(s2 / h2[n2]) : this.$d[n2], s2 || 0;
      }, y2.add = function(t2, s2, n2) {
        var i2;
        return i2 = s2 ? t2 * h2[m(s2)] : c(t2) ? t2.$ms : f(t2, this).$ms, f(this.$ms + i2 * (n2 ? -1 : 1), this);
      }, y2.subtract = function(t2, s2) {
        return this.add(t2, s2, true);
      }, y2.locale = function(t2) {
        var s2 = this.clone();
        return s2.$l = t2, s2;
      }, y2.clone = function() {
        return f(this.$ms, this);
      }, y2.humanize = function(s2) {
        return t().add(this.$ms, "ms").locale(this.$l).fromNow(!s2);
      }, y2.valueOf = function() {
        return this.asMilliseconds();
      }, y2.milliseconds = function() {
        return this.get("milliseconds");
      }, y2.asMilliseconds = function() {
        return this.as("milliseconds");
      }, y2.seconds = function() {
        return this.get("seconds");
      }, y2.asSeconds = function() {
        return this.as("seconds");
      }, y2.minutes = function() {
        return this.get("minutes");
      }, y2.asMinutes = function() {
        return this.as("minutes");
      }, y2.hours = function() {
        return this.get("hours");
      }, y2.asHours = function() {
        return this.as("hours");
      }, y2.days = function() {
        return this.get("days");
      }, y2.asDays = function() {
        return this.as("days");
      }, y2.weeks = function() {
        return this.get("weeks");
      }, y2.asWeeks = function() {
        return this.as("weeks");
      }, y2.months = function() {
        return this.get("months");
      }, y2.asMonths = function() {
        return this.as("months");
      }, y2.years = function() {
        return this.get("years");
      }, y2.asYears = function() {
        return this.as("years");
      }, l2;
    }(), p = function(t2, s2, n2) {
      return t2.add(s2.years() * n2, "y").add(s2.months() * n2, "M").add(s2.days() * n2, "d").add(s2.hours() * n2, "h").add(s2.minutes() * n2, "m").add(s2.seconds() * n2, "s").add(s2.milliseconds() * n2, "ms");
    };
    return function(n2, i2, e2) {
      t = e2, s = e2().$utils(), e2.duration = function(t2, s2) {
        var n3 = e2.locale();
        return f(t2, { $l: n3 }, s2);
      }, e2.isDuration = c;
      var r2 = i2.prototype.add, o2 = i2.prototype.subtract;
      i2.prototype.add = function(t2, s2) {
        return c(t2) ? p(this, t2, 1) : r2.bind(this)(t2, s2);
      }, i2.prototype.subtract = function(t2, s2) {
        return c(t2) ? p(this, t2, -1) : o2.bind(this)(t2, s2);
      };
    };
  });
})(duration);
var durationExports = duration.exports;
var duration2 = getDefaultExportFromCjs(durationExports);

// node_modules/yc-design-vue/es/_virtual/toObject.js
var toObject = { exports: {} };

// node_modules/yc-design-vue/es/node_modules/dayjs/plugin/toObject.js
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    return function(t, e) {
      e.prototype.toObject = function() {
        return { years: this.$y, months: this.$M, date: this.$D, hours: this.$H, minutes: this.$m, seconds: this.$s, milliseconds: this.$ms };
      };
    };
  });
})(toObject);
var toObjectExports = toObject.exports;
var toObject2 = getDefaultExportFromCjs(toObjectExports);

// node_modules/yc-design-vue/es/_virtual/isSameOrAfter.js
var isSameOrAfter = { exports: {} };

// node_modules/yc-design-vue/es/node_modules/dayjs/plugin/isSameOrAfter.js
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    return function(e, t) {
      t.prototype.isSameOrAfter = function(e2, t2) {
        return this.isSame(e2, t2) || this.isAfter(e2, t2);
      };
    };
  });
})(isSameOrAfter);
var isSameOrAfterExports = isSameOrAfter.exports;
var isSameOrAfter2 = getDefaultExportFromCjs(isSameOrAfterExports);

// node_modules/yc-design-vue/es/_virtual/isSameOrBefore.js
var isSameOrBefore = { exports: {} };

// node_modules/yc-design-vue/es/node_modules/dayjs/plugin/isSameOrBefore.js
(function(module, exports) {
  !function(e, i) {
    module.exports = i();
  }(commonjsGlobal, function() {
    return function(e, i) {
      i.prototype.isSameOrBefore = function(e2, i2) {
        return this.isSame(e2, i2) || this.isBefore(e2, i2);
      };
    };
  });
})(isSameOrBefore);
var isSameOrBeforeExports = isSameOrBefore.exports;
var isSameOrBefore2 = getDefaultExportFromCjs(isSameOrBeforeExports);

// node_modules/yc-design-vue/es/_shared/utils/time.js
dayjs.extend(isSameOrAfter2);
dayjs.extend(isSameOrBefore2);
dayjs.extend(toObject2);
dayjs.extend(duration2);
var isValidTimeRange = (beginDate, endDate, format) => {
  const begin = dayjs(beginDate, format).locale("en", { weekStart: 1 });
  const end = dayjs(endDate, format).locale("en", { weekStart: 1 });
  return begin.isBefore(end);
};
function generateMonthCalendar(year, month) {
  const firstDayOfMonth = dayjs(`${year}-${month}-01`);
  const firstDayOfWeek = firstDayOfMonth.day();
  const daysFromPrevMonth = firstDayOfWeek;
  const totalCalendarDays = 42;
  const calendar = [];
  const row = [];
  for (let i = 0; i < totalCalendarDays; i++) {
    const dayOffset = i - daysFromPrevMonth;
    const date = firstDayOfMonth.add(dayOffset, "day");
    const isCurrentMonth = date.month() + 1 === month;
    row.push({
      day: date.date(),
      month: date.month(),
      year: date.year(),
      fullDate: date.format("YYYY/MM/DD"),
      isCurrentMonth
    });
    if (row.length === 7) {
      calendar.push([...row]);
      row.splice(0);
    }
  }
  return calendar;
}
var formatSeconds = (time, format, type = "milliseconds") => {
  return dayjs.duration(time, type).format(format);
};
var formatDate = (value, format) => {
  return dayjs(value).format(format);
};

// node_modules/yc-design-vue/es/_shared/components/Icon.vue3.js
var _sfc_main = defineComponent({
  __name: "Icon",
  props: {
    strokeWidth: { default: 4 },
    strokeLinecap: { default: "butt" },
    strokeLinejoin: { default: "miter" },
    rotate: {},
    spin: { type: Boolean, default: false },
    size: {},
    color: {}
  },
  setup(__props) {
    const props = __props;
    const {
      size,
      spin: spin2,
      rotate,
      color,
      strokeLinecap,
      strokeLinejoin,
      strokeWidth
    } = toRefs(props);
    const $attrs = useAttrs();
    const style = computed(() => {
      let width = "";
      let height = "";
      if (Array.isArray(size.value)) {
        width = valueToPx(size.value[0]);
        height = valueToPx(size.value[1]);
      } else {
        width = size.value ? valueToPx(size.value) : "1em";
        height = size.value ? valueToPx(size.value) : "1em";
      }
      return {
        width,
        height,
        color: color.value ? color.value : "inherit",
        transform: rotate ? `rotate(${rotate.value}deg)` : "unset"
      };
    });
    const attrs = computed(() => {
      return {
        style: style.value,
        "stroke-width": strokeWidth.value,
        "stroke-linecap": strokeLinecap.value,
        "stroke-linejoin": strokeLinejoin.value,
        ...$attrs || {}
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", mergeProps({
        "aria-hidden": "true",
        focusable: "false",
        viewBox: "0 0 48 48",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        stroke: "currentColor",
        class: [
          "yc-icon",
          {
            "yc-icon-spin": unref(spin2)
          }
        ]
      }, attrs.value), [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 16);
    };
  }
});

// node_modules/yc-design-vue/es/_virtual/_plugin-vue_export-helper.js
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

// node_modules/yc-design-vue/es/_shared/components/Icon.vue2.js
var YcIcon = _export_sfc(_sfc_main, [["__scopeId", "data-v-07c3e1ec"]]);

// node_modules/yc-design-vue/es/_shared/icons/IconEmpty.vue.js
var _sfc_main2 = defineComponent({
  __name: "IconEmpty",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M24 5v6m7 1 4-4m-18 4-4-4m28.5 22H28s-1 3-4 3-4-3-4-3H6.5M40 41H8a2 2 0 0 1-2-2v-8.46a2 2 0 0 1 .272-1.007l6.15-10.54A2 2 0 0 1 14.148 18H33.85a2 2 0 0 1 1.728.992l6.149 10.541A2 2 0 0 1 42 30.541V39a2 2 0 0 1-2 2Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Empty/index.vue2.js
var _hoisted_1 = { class: "yc-empty" };
var _hoisted_2 = { class: "yc-empty-image" };
var _hoisted_3 = ["src"];
var _hoisted_4 = {
  key: 0,
  class: "yc-empty-description"
};
var _sfc_main3 = defineComponent({
  ...{
    name: "Empty"
  },
  __name: "index",
  props: {
    description: { default: "暂无数据" },
    imgSrc: { default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          renderSlot(_ctx.$slots, "image", {}, () => [
            _ctx.imgSrc ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: _ctx.imgSrc,
              alt: "图片加载失败"
            }, null, 8, _hoisted_3)) : createCommentVNode("", true),
            createVNode(unref(_sfc_main2))
          ], true)
        ]),
        _ctx.description ? (openBlock(), createElementBlock("div", _hoisted_4, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_ctx.description), 1)
          ], true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Empty/index.vue.js
var _Empty = _export_sfc(_sfc_main3, [["__scopeId", "data-v-7bbc6ff2"]]);

// node_modules/yc-design-vue/es/Empty/index.js
var Empty = Object.assign(_Empty, {
  install: (app) => {
    app.component("Yc" + _Empty.name, _Empty);
  }
});

// node_modules/yc-design-vue/es/Affix/index.vue.js
var _sfc_main4 = defineComponent({
  ...{
    name: "Affix"
  },
  __name: "index",
  props: {
    offsetTop: { default: 0 },
    offsetBottom: { default: void 0 },
    target: { default: void 0 },
    targetContainer: { default: void 0 }
  },
  emits: ["change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      target: _target,
      targetContainer: _targetContainer,
      offsetTop,
      offsetBottom
    } = toRefs(props);
    const affixRef = ref();
    const wrapperRef = ref();
    const target = computed(() => {
      return isUndefined(_target.value) ? findFirstScrollableParent(affixRef.value) : getElement(_target.value);
    });
    const targetContainer = computed(() => {
      return isUndefined(_targetContainer.value) ? findFirstScrollableParent(affixRef.value) : getElement(_targetContainer.value);
    });
    const isFixed = ref(false);
    const style = ref({});
    const width = ref(0);
    const height = ref(0);
    useResizeObserver(
      affixRef,
      () => {
        const { width: w, height: h2 } = affixRef.value.getBoundingClientRect();
        width.value = w;
        height.value = h2;
        handleScroll();
      },
      {
        box: "border-box"
      }
    );
    watch(
      () => isFixed.value,
      (val) => {
        emits("change", val);
      }
    );
    const handleScroll = throttleByRaf(() => {
      if (!target.value || !targetContainer.value || !wrapperRef.value) return;
      const { top: wrapperTop, bottom: wrapperBottom } = wrapperRef.value.getBoundingClientRect();
      const { top: targetTop, bottom: targetBottom } = targetContainer.value.getBoundingClientRect();
      isFixed.value = isUndefined(offsetBottom.value) ? wrapperTop - targetTop <= offsetTop.value : targetBottom - wrapperBottom <= offsetBottom.value;
      if (isFixed.value) {
        style.value = isUndefined(offsetBottom.value) ? { position: "fixed", top: valueToPx(targetTop + offsetTop.value) } : { position: "fixed", bottom: valueToPx(offsetBottom.value) };
      } else {
        style.value = {};
      }
    });
    useEventListener(target, "scroll", handleScroll);
    __expose({
      updatePosition() {
        handleScroll();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "wrapperRef",
        ref: wrapperRef
      }, [
        isFixed.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          style: normalizeStyle({
            width: unref(valueToPx)(width.value),
            height: unref(valueToPx)(height.value)
          })
        }, null, 4)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass([
            {
              "yc-affix": isFixed.value
            }
          ]),
          style: normalizeStyle(style.value),
          ref_key: "affixRef",
          ref: affixRef
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 6)
      ], 512);
    };
  }
});

// node_modules/yc-design-vue/es/Affix/index.js
var Affix = Object.assign(_sfc_main4, {
  install: (app) => {
    app.component("Yc" + _sfc_main4.name, _sfc_main4);
  }
});

// node_modules/yc-design-vue/es/_shared/icons/Icon403.svg.js
var Icon403 = "data:image/svg+xml,%3csvg%20viewBox='0%200%20213%20213'%20xmlns='http://www.w3.org/2000/svg'%20height='100%25'%20width='100%25'%20style='fill-rule:%20evenodd;%20clip-rule:%20evenodd;%20stroke-linejoin:%20round;%20stroke-miterlimit:%202;'%3e%3cg%20transform='matrix(1,0,0,1,-871.485,-445.62)'%3e%3cg%3e%3cg%20transform='matrix(1,0,0,1,-75.2684,-87.3801)'%3e%3ccircle%20cx='1053.23'%20cy='639.477'%20r='106.477'%20style='fill:%20rgb(235,%20238,%20246);'%3e%3c/circle%3e%3c/g%3e%3cg%20transform='matrix(1,0,0,1,246.523,295.575)'%3e%3cg%20transform='matrix(0.316667,0,0,0.316667,277.545,71.0298)'%3e%3cg%20transform='matrix(0.989011,-0.571006,1.14201,0.659341,-335.171,81.4498)'%3e%3crect%20x='495.52'%20y='1057.87'%20width='105.078'%20height='91'%20style='fill:%20rgb(253,%20243,%20228);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.164835,-0.0951676,1.14201,0.659341,116.224,-179.163)'%3e%3crect%20x='495.52'%20y='1057.87'%20width='105.078'%20height='91'%20style='fill:%20rgb(202,%20174,%20136);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.978261,-0.564799,1.26804e-16,1.30435,-337.046,42.0327)'%3e%3crect%20x='1844.06'%20y='1192.54'%20width='106.232'%20height='92'%20style='fill:%20rgb(196,%20173,%20142);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.267591,-0.154493,3.46856e-17,0.356787,992.686,475.823)'%3e%3crect%20x='1844.06'%20y='1192.54'%20width='106.232'%20height='92'%20style='fill:%20rgb(102,%20102,%20102);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(1.28257,-0.740494,1.23317e-16,1.7101,1501.14,624.071)'%3e%3cg%20transform='matrix(1,0,0,1,-6,-6)'%3e%3cpath%20d='M2.25,10.5C2.25,10.5%201.5,10.5%201.5,9.75C1.5,9%202.25,6.75%206,6.75C9.75,6.75%2010.5,9%2010.5,9.75C10.5,10.5%209.75,10.5%209.75,10.5L2.25,10.5ZM6,6C7.234,6%208.25,4.984%208.25,3.75C8.25,2.516%207.234,1.5%206,1.5C4.766,1.5%203.75,2.516%203.75,3.75C3.75,4.984%204.766,6%206,6Z'%20style='fill:%20white;'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cg%20transform='matrix(0.725806,0.419045,1.75755e-17,1.01444,155.314,212.138)'%3e%3crect%20x='1663.92'%20y='-407.511'%20width='143.183'%20height='118.292'%20style='fill:%20rgb(240,%20218,%20183);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(1.58977,-0.917857,1.15976e-16,2.2425,-1270.46,-614.379)'%3e%3crect%20x='1748.87'%20y='1226.67'%20width='10.895'%20height='13.378'%20style='fill:%20rgb(132,%2097,%200);'%3e%3c/rect%3e%3c/g%3e%3c/g%3e%3cg%20transform='matrix(0.182997,0.105653,-0.494902,0.285732,814.161,66.3087)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill-opacity:%200.1;'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.316667,0,0,0.316667,237.301,94.2647)'%3e%3cg%20transform='matrix(0.989011,-0.571006,1.14201,0.659341,-335.171,81.4498)'%3e%3crect%20x='495.52'%20y='1057.87'%20width='105.078'%20height='91'%20style='fill:%20rgb(253,%20243,%20228);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.164835,-0.0951676,1.14201,0.659341,116.224,-179.163)'%3e%3crect%20x='495.52'%20y='1057.87'%20width='105.078'%20height='91'%20style='fill:%20rgb(202,%20174,%20136);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.978261,-0.564799,1.26804e-16,1.30435,-337.046,42.0327)'%3e%3crect%20x='1844.06'%20y='1192.54'%20width='106.232'%20height='92'%20style='fill:%20rgb(196,%20173,%20142);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.267591,-0.154493,3.46856e-17,0.356787,992.686,475.823)'%3e%3crect%20x='1844.06'%20y='1192.54'%20width='106.232'%20height='92'%20style='fill:%20rgb(102,%20102,%20102);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(1.28257,-0.740494,1.23317e-16,1.7101,1501.14,624.071)'%3e%3cg%20transform='matrix(1,0,0,1,-6,-6)'%3e%3cpath%20d='M2.25,10.5C2.25,10.5%201.5,10.5%201.5,9.75C1.5,9%202.25,6.75%206,6.75C9.75,6.75%2010.5,9%2010.5,9.75C10.5,10.5%209.75,10.5%209.75,10.5L2.25,10.5ZM6,6C7.234,6%208.25,4.984%208.25,3.75C8.25,2.516%207.234,1.5%206,1.5C4.766,1.5%203.75,2.516%203.75,3.75C3.75,4.984%204.766,6%206,6Z'%20style='fill:%20white;'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cg%20transform='matrix(0.725806,0.419045,1.75755e-17,1.01444,155.314,212.138)'%3e%3crect%20x='1663.92'%20y='-407.511'%20width='143.183'%20height='118.292'%20style='fill:%20rgb(240,%20218,%20183);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(1.58977,-0.917857,1.15976e-16,2.2425,-1270.46,-614.379)'%3e%3crect%20x='1748.87'%20y='1226.67'%20width='10.895'%20height='13.378'%20style='fill:%20rgb(132,%2097,%200);'%3e%3c/rect%3e%3c/g%3e%3c/g%3e%3cg%20transform='matrix(0.474953,0,0,0.474953,538.938,8.95289)'%3e%3cg%20transform='matrix(0.180615,0.104278,-0.973879,0.562269,790.347,286.159)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill-opacity:%200.1;'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.473356,0,0,0.473356,294.481,129.741)'%3e%3cg%3e%3cg%20transform='matrix(0.1761,-0.101671,1.73518e-16,1.22207,442.564,7.31508)'%3e%3crect%20x='202.62'%20y='575.419'%20width='124.002'%20height='259.402'%20style='fill:%20rgb(235,%20235,%20235);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.0922781,0.0532768,2.03964e-16,2.20569,405.236,-248.842)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(34,%2034,%2034);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.147541,-0.0851831,1.52371e-16,1.23446,454.294,-3.8127)'%3e%3crect%20x='202.62'%20y='575.419'%20width='124.002'%20height='259.402'%20style='fill:%20rgb(51,%2051,%2051);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.0921286,0.0531905,-0.126106,0.0728076,474.688,603.724)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(102,%20102,%20102);'%3e%3c/rect%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cg%20transform='matrix(0.473356,0,0,0.473356,192.621,188.549)'%3e%3cg%3e%3cg%20transform='matrix(0.1761,-0.101671,1.73518e-16,1.22207,442.564,7.31508)'%3e%3crect%20x='202.62'%20y='575.419'%20width='124.002'%20height='259.402'%20style='fill:%20rgb(235,%20235,%20235);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.0922781,0.0532768,2.03964e-16,2.20569,405.236,-248.842)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(34,%2034,%2034);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.147541,-0.0851831,1.52371e-16,1.23446,454.294,-3.8127)'%3e%3crect%20x='202.62'%20y='575.419'%20width='124.002'%20height='259.402'%20style='fill:%20rgb(51,%2051,%2051);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.0921286,0.0531905,-0.126106,0.0728076,474.688,603.724)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(102,%20102,%20102);'%3e%3c/rect%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cg%20transform='matrix(0.668111,0,0,0.668111,-123.979,-49.2109)'%3e%3cg%20transform='matrix(0.0349225,0.0201625,1.81598e-17,0.220789,974.758,729.412)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(235,%20235,%20235);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(1.1164,-0.644557,0,0.220789,42.5091,1294.14)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(235,%20235,%20235);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.0349225,0.0201625,-1.52814,0.882275,1593.11,461.746)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(102,%20102,%20102);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(1.1164,-0.644557,0,0.220789,49.4442,1298.14)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(51,%2051,%2051);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.0349225,0.0201625,1.81598e-17,0.220789,753.056,857.412)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(34,%2034,%2034);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,898.874,529.479)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(255,%20125,%200);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,930.12,511.44)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(255,%20125,%200);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,961.365,493.4)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(248,%20248,%20248);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,992.61,475.361)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(248,%20248,%20248);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,1023.86,457.321)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(248,%20248,%20248);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,1056.25,438.617)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(255,%20125,%200);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,1085.74,421.589)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(255,%20125,%200);'%3e%3c/rect%3e%3c/g%3e%3c/g%3e%3cg%20transform='matrix(0.668111,0,0,0.668111,-123.979,-91.97)'%3e%3cg%20transform='matrix(0.0349225,0.0201625,1.81598e-17,0.220789,974.758,729.412)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(235,%20235,%20235);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(1.1164,-0.644557,0,0.220789,42.5091,1294.14)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(235,%20235,%20235);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.0349225,0.0201625,-1.52814,0.882275,1593.11,461.746)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(102,%20102,%20102);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(1.1164,-0.644557,0,0.220789,49.4442,1298.14)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(51,%2051,%2051);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.0349225,0.0201625,1.81598e-17,0.220789,753.056,857.412)'%3e%3crect%20x='657.012'%20y='404.643'%20width='198.586'%20height='145.08'%20style='fill:%20rgb(34,%2034,%2034);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,898.874,529.479)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(255,%20125,%200);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,930.12,511.44)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(255,%20125,%200);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,961.365,493.4)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(248,%20248,%20248);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,992.61,475.361)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(248,%20248,%20248);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,1023.86,457.321)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(248,%20248,%20248);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,1056.25,438.617)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(255,%20125,%200);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.142968,-0.0825428,-0.207261,0.478709,1085.74,421.589)'%3e%3crect%20x='831'%20y='1023.79'%20width='89.214'%20height='89.214'%20style='fill:%20rgb(255,%20125,%200);'%3e%3c/rect%3e%3c/g%3e%3c/g%3e%3cg%20transform='matrix(0.701585,5.16096e-35,-5.16096e-35,0.701585,-546.219,-21.3487)'%3e%3cg%20transform='matrix(0.558202,-0.322278,0,0.882275,1033.27,615.815)'%3e%3cpath%20d='M855.598,410.446C855.598,407.244%20852.515,404.643%20848.718,404.643L663.891,404.643C660.094,404.643%20657.012,407.244%20657.012,410.446L657.012,543.92C657.012,547.123%20660.094,549.723%20663.891,549.723L848.718,549.723C852.515,549.723%20855.598,547.123%20855.598,543.92L855.598,410.446Z'%20style='fill:%20white;'%3e%3c/path%3e%3c/g%3e%3cg%20transform='matrix(0.558202,-0.322278,0,0.882275,1035.25,616.977)'%3e%3cpath%20d='M855.598,410.446C855.598,407.244%20852.515,404.643%20848.718,404.643L663.891,404.643C660.094,404.643%20657.012,407.244%20657.012,410.446L657.012,543.92C657.012,547.123%20660.094,549.723%20663.891,549.723L848.718,549.723C852.515,549.723%20855.598,547.123%20855.598,543.92L855.598,410.446Z'%20style='fill:%20white;'%3e%3c/path%3e%3c/g%3e%3cg%20transform='matrix(1,0,0,1,418.673,507.243)'%3e%3cpath%20d='M1088.34,192.063C1089.79,191.209%201090.78,191.821%201090.78,191.821L1092.71,192.944C1092.71,192.944%201092.29,192.721%201091.7,192.763C1090.99,192.813%201090.34,193.215%201090.34,193.215C1090.34,193.215%201088.85,192.362%201088.34,192.063Z'%20style='fill:%20rgb(248,%20248,%20248);'%3e%3c/path%3e%3c/g%3e%3cg%20transform='matrix(1,0,0,1,235.984,-39.1315)'%3e%3cpath%20d='M1164.02,805.247C1164.05,802.517%201165.64,799.379%201167.67,798.118L1169.67,799.272C1167.58,800.648%201166.09,803.702%201166.02,806.402L1164.02,805.247Z'%20style='fill:%20url(&quot;%23_Linear1&quot;);'%3e%3c/path%3e%3c/g%3e%3cg%20transform='matrix(0.396683,0,0,0.396683,1000.22,516.921)'%3e%3cpath%20d='M1011.2,933.14C1009.31,932.075%201008.05,929.696%201007.83,926.324L1012.87,929.235C1012.87,929.235%201012.96,930.191%201013.04,930.698C1013.16,931.427%201013.42,932.344%201013.62,932.845C1013.79,933.255%201014.59,935.155%201016.22,936.046C1015.83,935.781%201011.19,933.139%201011.19,933.139L1011.2,933.14Z'%20style='fill:%20rgb(238,%20238,%20238);'%3e%3c/path%3e%3c/g%3e%3cg%20transform='matrix(0.253614,-0.146424,4.87691e-17,0.338152,1209.98,830.02)'%3e%3ccircle%20cx='975.681'%20cy='316.681'%20r='113.681'%20style='fill:%20rgb(245,%2063,%2063);'%3e%3c/circle%3e%3cg%20transform='matrix(1.08844,0,0,0.61677,-99.9184,125.436)'%3e%3cpath%20d='M1062,297.556C1062,296.697%201061.61,296%201061.12,296L915.882,296C915.395,296%20915,296.697%20915,297.556L915,333.356C915,334.215%20915.395,334.912%20915.882,334.912L1061.12,334.912C1061.61,334.912%201062,334.215%201062,333.356L1062,297.556Z'%20style='fill:%20white;'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cg%20transform='matrix(5.57947,-3.22131,0.306277,0.176829,-6260.71,4938.32)'%3e%3crect%20x='1335.54'%20y='694.688'%20width='18.525'%20height='6.511'%20style='fill:%20rgb(248,%20248,%20248);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.10726,0.0619268,-1.83335e-14,18.1609,1256.76,-11932.8)'%3e%3crect%20x='1335.54'%20y='694.688'%20width='18.525'%20height='6.511'%20style='fill:%20rgb(238,%20238,%20238);'%3e%3c/rect%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cg%20transform='matrix(0.316667,0,0,0.316667,269.139,37.8829)'%3e%3cg%20transform='matrix(0.989011,-0.571006,1.14201,0.659341,-335.171,81.4498)'%3e%3crect%20x='495.52'%20y='1057.87'%20width='105.078'%20height='91'%20style='fill:%20rgb(253,%20243,%20228);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.164835,-0.0951676,1.14201,0.659341,116.224,-179.163)'%3e%3crect%20x='495.52'%20y='1057.87'%20width='105.078'%20height='91'%20style='fill:%20rgb(202,%20174,%20136);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.978261,-0.564799,1.26804e-16,1.30435,-337.046,42.0327)'%3e%3crect%20x='1844.06'%20y='1192.54'%20width='106.232'%20height='92'%20style='fill:%20rgb(196,%20173,%20142);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(0.267591,-0.154493,3.46856e-17,0.356787,992.686,475.823)'%3e%3crect%20x='1844.06'%20y='1192.54'%20width='106.232'%20height='92'%20style='fill:%20rgb(102,%20102,%20102);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(1.28257,-0.740494,1.23317e-16,1.7101,1501.14,624.071)'%3e%3cg%20transform='matrix(1,0,0,1,-6,-6)'%3e%3cpath%20d='M2.25,10.5C2.25,10.5%201.5,10.5%201.5,9.75C1.5,9%202.25,6.75%206,6.75C9.75,6.75%2010.5,9%2010.5,9.75C10.5,10.5%209.75,10.5%209.75,10.5L2.25,10.5ZM6,6C7.234,6%208.25,4.984%208.25,3.75C8.25,2.516%207.234,1.5%206,1.5C4.766,1.5%203.75,2.516%203.75,3.75C3.75,4.984%204.766,6%206,6Z'%20style='fill:%20white;'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cg%20transform='matrix(0.725806,0.419045,1.75755e-17,1.01444,155.314,212.138)'%3e%3crect%20x='1663.92'%20y='-407.511'%20width='143.183'%20height='118.292'%20style='fill:%20rgb(240,%20218,%20183);'%3e%3c/rect%3e%3c/g%3e%3cg%20transform='matrix(1.58977,-0.917857,1.15976e-16,2.2425,-1270.46,-614.379)'%3e%3crect%20x='1748.87'%20y='1226.67'%20width='10.895'%20height='13.378'%20style='fill:%20rgb(132,%2097,%200);'%3e%3c/rect%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='_Linear1'%20x1='0'%20y1='0'%20x2='1'%20y2='0'%20gradientUnits='userSpaceOnUse'%20gradientTransform='matrix(-2.64571,4.04098,-4.04098,-2.64571,1167.67,799.269)'%3e%3cstop%20offset='0'%20style='stop-color:%20rgb(248,%20248,%20248);%20stop-opacity:%201;'%3e%3c/stop%3e%3cstop%20offset='1'%20style='stop-color:%20rgb(248,%20248,%20248);%20stop-opacity:%201;'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";

// node_modules/yc-design-vue/es/_shared/icons/Icon404.svg.js
var Icon404 = "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMTMgMjEzIiBzdHlsZT0iZmlsbC1ydWxlOiBldmVub2RkOyBjbGlwLXJ1bGU6IGV2ZW5vZGQ7IHN0cm9rZS1saW5lam9pbjogcm91bmQ7IHN0cm9rZS1taXRlcmxpbWl0OiAyOyI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwtMTI0MS45NSwtNDQ1LjYyKSI+PGc+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwyOTUuMiwtODcuMzgwMSkiPjxjaXJjbGUgY3g9IjEwNTMuMjMiIGN5PSI2MzkuNDc3IiByPSIxMDYuNDc3IiBzdHlsZT0iZmlsbDogcmdiKDIzNSwgMjM4LCAyNDYpOyI+PC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMzgyMjMsMCwwLDAuMzgyMjMsMTEyNi4xMiwyMzguNTQ5KSI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC41NjY1MzYsMC4zMjcwODksLTEuMjg3NzQsMC43NDM0OCw3NjMuNCwzMTcuMTcxKSI+PHJlY3QgeD0iNjU3LjAxMiIgeT0iNDA0LjY0MyIgd2lkdGg9IjE5OC41ODYiIGhlaWdodD0iMTQ1LjA4IiBzdHlsZT0iZmlsbC1vcGFjaXR5OiAwLjE7Ij48L3JlY3Q+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMjk1OTUsMC4xNzA4NjcsLTAuOTEwNzcsMC41MjU4MzMsODczLjc5Nyw1ODguNjI0KSI+PHJlY3QgeD0iNjU3LjAxMiIgeT0iNDA0LjY0MyIgd2lkdGg9IjE5OC41ODYiIGhlaWdodD0iMTQ1LjA4IiBzdHlsZT0iZmlsbC1vcGFjaXR5OiAwLjE7Ij48L3JlY3Q+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMjc1LC0xNSkiPjxwYXRoIGQ9Ik0yNjIuMDc3LDk1OS4wMTJMMjc2LjkyMyw5NTkuMDEyTDI3My4zODgsMTAwNC4wMUMyNzMuMzg4LDEwMDQuNTkgMjczLjAwOSwxMDA1LjE2IDI3Mi4yNSwxMDA1LjZDMjcwLjczMiwxMDA2LjQ4IDI2OC4yNjgsMTAwNi40OCAyNjYuNzUsMTAwNS42QzI2NS45OTEsMTAwNS4xNiAyNjUuNjEyLDEwMDQuNTkgMjY1LjYxMiwxMDA0LjAxTDI2Mi4wNzcsOTU5LjAxMloiIHN0eWxlPSJmaWxsOiByZ2IoMTk2LCAxNzMsIDE0Mik7Ij48L3BhdGg+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC44NjYwMjUsLTAuNSwxLDAuNTc3MzUsMCwtNDUpIj48ZWxsaXBzZSBjeD0iLTg0OC40MTYiIGN5PSIxMDA0LjI1IiByeD0iNi4wNjIiIHJ5PSI1LjI1IiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMTI1LCAwKTsiPjwvZWxsaXBzZT48L2c+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMTgzLjk1MiwtNjcuNTY2NSkiPjxwYXRoIGQ9Ik0yNjIuMDc3LDk1OS4wMTJMMjc2LjkyMyw5NTkuMDEyTDI3My4zODgsMTAwNC4wMUMyNzMuMzg4LDEwMDQuNTkgMjczLjAwOSwxMDA1LjE2IDI3Mi4yNSwxMDA1LjZDMjcwLjczMiwxMDA2LjQ4IDI2OC4yNjgsMTAwNi40OCAyNjYuNzUsMTAwNS42QzI2NS45OTEsMTAwNS4xNiAyNjUuNjEyLDEwMDQuNTkgMjY1LjYxMiwxMDA0LjAxTDI2Mi4wNzcsOTU5LjAxMloiIHN0eWxlPSJmaWxsOiByZ2IoMTk2LCAxNzMsIDE0Mik7Ij48L3BhdGg+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC44NjYwMjUsLTAuNSwxLDAuNTc3MzUsMCwtNDUpIj48ZWxsaXBzZSBjeD0iLTg0OC40MTYiIGN5PSIxMDA0LjI1IiByeD0iNi4wNjIiIHJ5PSI1LjI1IiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMTI1LCAwKTsiPjwvZWxsaXBzZT48L2c+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsNDE0LC05NS4yNTE3KSI+PHBhdGggZD0iTTI2Mi4wNzcsOTU5LjAxMkwyNzYuOTIzLDk1OS4wMTJMMjczLjM4OCwxMDA0LjAxQzI3My4zODgsMTAwNC41OSAyNzMuMDA5LDEwMDUuMTYgMjcyLjI1LDEwMDUuNkMyNzAuNzMyLDEwMDYuNDggMjY4LjI2OCwxMDA2LjQ4IDI2Ni43NSwxMDA1LjZDMjY1Ljk5MSwxMDA1LjE2IDI2NS42MTIsMTAwNC41OSAyNjUuNjEyLDEwMDQuMDFMMjYyLjA3Nyw5NTkuMDEyWiIgc3R5bGU9ImZpbGw6IHJnYigxOTYsIDE3MywgMTQyKTsiPjwvcGF0aD48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg2NjAyNSwtMC41LDEsMC41NzczNSwwLC00NSkiPjxlbGxpcHNlIGN4PSItODQ4LjQxNiIgY3k9IjEwMDQuMjUiIHJ4PSI2LjA2MiIgcnk9IjUuMjUiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAxMjUsIDApOyI+PC9lbGxpcHNlPjwvZz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwzMjIuOTUyLC0xNDcuODE4KSI+PHBhdGggZD0iTTI2Mi4wNzcsOTU5LjAxMkwyNzYuOTIzLDk1OS4wMTJMMjczLjM4OCwxMDA0LjAxQzI3My4zODgsMTAwNC41OSAyNzMuMDA5LDEwMDUuMTYgMjcyLjI1LDEwMDUuNkMyNzAuNzMyLDEwMDYuNDggMjY4LjI2OCwxMDA2LjQ4IDI2Ni43NSwxMDA1LjZDMjY1Ljk5MSwxMDA1LjE2IDI2NS42MTIsMTAwNC41OSAyNjUuNjEyLDEwMDQuMDFMMjYyLjA3Nyw5NTkuMDEyWiIgc3R5bGU9ImZpbGw6IHJnYigxOTYsIDE3MywgMTQyKTsiPjwvcGF0aD48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjg2NjAyNSwtMC41LDEsMC41NzczNSwwLC00NSkiPjxlbGxpcHNlIGN4PSItODQ4LjQxNiIgY3k9IjEwMDQuMjUiIHJ4PSI2LjA2MiIgcnk9IjUuMjUiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAxMjUsIDApOyI+PC9lbGxpcHNlPjwvZz48L2c+PGc+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS40MjMzNCwtMC44MjE3NjMsMS4xMTI3MSwwLjY0MjQyNiwtMTQzOS42NCw0NTkuNjIxKSI+PHJlY3QgeD0iNDk1LjUyIiB5PSIxMDU3Ljg3IiB3aWR0aD0iMTA1LjA3OCIgaGVpZ2h0PSI5MSIgc3R5bGU9ImZpbGw6IHJnYigyNTMsIDI0MywgMjI4KTsiPjwvcmVjdD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS40MDc4NiwtMC44MTI4MzEsNi42MDIzN2UtMTYsMS45OTA4MSwtMjA1Mi4xNywtODQuNzI4NikiPjxyZWN0IHg9IjE4NDQuMDYiIHk9IjExOTIuNTQiIHdpZHRoPSIxMDYuMjMyIiBoZWlnaHQ9IjkyIiBzdHlsZT0iZmlsbDogcmdiKDE5NiwgMTczLCAxNDIpOyI+PC9yZWN0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjI2MTU5LC0wLjcyODM4Miw1LjkxNjQyZS0xNiwxLjc4Mzk3LC0xNzc0LjY3LDExLjIzMDMpIj48cGF0aCBkPSJNMTk1MC4yOSwxMTk0LjM4QzE5NTAuMjksMTE5My4zNyAxOTQ5LjQxLDExOTIuNTQgMTk0OC4zNCwxMTkyLjU0TDE4NDYuMDEsMTE5Mi41NEMxODQ0LjkzLDExOTIuNTQgMTg0NC4wNiwxMTkzLjM3IDE4NDQuMDYsMTE5NC4zOEwxODQ0LjA2LDEyODIuN0MxODQ0LjA2LDEyODMuNzIgMTg0NC45MywxMjg0LjU0IDE4NDYuMDEsMTI4NC41NEwxOTQ4LjM0LDEyODQuNTRDMTk0OS40MSwxMjg0LjU0IDE5NTAuMjksMTI4My43MiAxOTUwLjI5LDEyODIuN0wxOTUwLjI5LDExOTQuMzhaIiBzdHlsZT0iZmlsbDogcmdiKDEzMiwgOTcsIDUxKTsiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMTk4LC0wLjcwNDI1NCw1LjcyMDQzZS0xNiwxLjcyNDg4LC0xNjk3LjYsMzcuMjEwMykiPjxwYXRoIGQ9Ik0xOTUwLjI5LDExOTQuMzhDMTk1MC4yOSwxMTkzLjM3IDE5NDkuNDEsMTE5Mi41NCAxOTQ4LjM0LDExOTIuNTRMMTg0Ni4wMSwxMTkyLjU0QzE4NDQuOTMsMTE5Mi41NCAxODQ0LjA2LDExOTMuMzcgMTg0NC4wNiwxMTk0LjM4TDE4NDQuMDYsMTI4Mi43QzE4NDQuMDYsMTI4My43MiAxODQ0LjkzLDEyODQuNTQgMTg0Ni4wMSwxMjg0LjU0TDE5NDguMzQsMTI4NC41NEMxOTQ5LjQxLDEyODQuNTQgMTk1MC4yOSwxMjgzLjcyIDE5NTAuMjksMTI4Mi43TDE5NTAuMjksMTE5NC4zOFoiIHN0eWxlPSJmaWxsOiByZ2IoMTk2LCAxNzMsIDE0Mik7Ij48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTg3LDAuNDA4Mjk1LDkuMDYxMTllLTE3LDEuNTQ4MzMsLTczMy45NDksNjgzLjYxMikiPjxyZWN0IHg9IjE2NjMuOTIiIHk9Ii00MDcuNTExIiB3aWR0aD0iMTQzLjE4MyIgaGVpZ2h0PSIxMTguMjkyIiBzdHlsZT0iZmlsbDogcmdiKDI0MCwgMjE4LCAxODMpOyI+PC9yZWN0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjY0NTUzLC0wLjk1MDA0OSwxLjE3NDgyLDAuNjc4Mjg1LC0xNjMyLjQ1LDQ3My44NzkpIj48cmVjdCB4PSI0OTUuNTIiIHk9IjEwNTcuODciIHdpZHRoPSIxMDUuMDc4IiBoZWlnaHQ9IjkxIiBzdHlsZT0iZmlsbDogcmdiKDI1MywgMjQzLCAyMjgpOyI+PC9yZWN0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjc0NjY2LDAuNDMxMDg1LDIuMzU4M2UtMTcsMC4xMzUyNTksLTgxNi42Myw1Ny4xMzk3KSI+PHJlY3QgeD0iMTY2My45MiIgeT0iLTQwNy41MTEiIHdpZHRoPSIxNDMuMTgzIiBoZWlnaHQ9IjExOC4yOTIiIHN0eWxlPSJmaWxsOiByZ2IoMjQwLCAyMTgsIDE4Myk7Ij48L3JlY3Q+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNjQ1NTMsLTAuOTUwMDQ5LDEuMTc0ODIsMC42NzgyODUsLTE2MzIuNDUsNDczLjg3OSkiPjxyZWN0IHg9IjQ5NS41MiIgeT0iMTA1Ny44NyIgd2lkdGg9IjEwNS4wNzgiIGhlaWdodD0iOTEiIHN0eWxlPSJmaWxsOiByZ2IoMjUzLCAyNDMsIDIyOCk7Ij48L3JlY3Q+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNzUwMDgyLDAsMCwwLjc1MDA4MiwxNjMuNDkxLDM1NC4xOTEpIj48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjc1OTQzLC0xLjAxNTgxLDEuNzU4NzllLTE2LDAuNjMyODkzLC0yNzIxLjU0LDE4NzYuNDMpIj48cmVjdCB4PSIxODQ0LjA2IiB5PSIxMTkyLjU0IiB3aWR0aD0iMTA2LjIzMiIgaGVpZ2h0PSI5MiIgc3R5bGU9ImZpbGw6IHJnYigxOTYsIDE3MywgMTQyKTsiPjwvcmVjdD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4yOTA5NTYsLTAuMTY3OTg0LDIuOTA4NDllLTE3LDAuMTA0NjYxLDY5LjQxOTUsOTE5LjMxMSkiPjxwYXRoIGQ9Ik0xOTUwLjI5LDEyMzguNTRDMTk1MC4yOSwxMjEzLjE1IDE5NDQuNzMsMTE5Mi41NCAxOTM3Ljg4LDExOTIuNTRMMTg1Ni40NywxMTkyLjU0QzE4NDkuNjIsMTE5Mi41NCAxODQ0LjA2LDEyMTMuMTUgMTg0NC4wNiwxMjM4LjU0QzE4NDQuMDYsMTI2My45MyAxODQ5LjYyLDEyODQuNTQgMTg1Ni40NywxMjg0LjU0TDE5MzcuODgsMTI4NC41NEMxOTQ0LjczLDEyODQuNTQgMTk1MC4yOSwxMjYzLjkzIDE5NTAuMjksMTIzOC41NFoiIHN0eWxlPSJmaWxsOiByZ2IoMTMyLCA5NywgNTEpOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjI2MjcxNiwtMC4xNTE2NzksOC4yNzQxOGUtMTgsMC4wMzY0OTk5LDEyMS40OTYsOTcwLjUzKSI+PHBhdGggZD0iTTE5NTAuMjksMTIzOC41NEMxOTUwLjI5LDEyMTMuMTUgMTk0OC4xNCwxMTkyLjU0IDE5NDUuNSwxMTkyLjU0TDE4NDguODUsMTE5Mi41NEMxODQ2LjIsMTE5Mi41NCAxODQ0LjA2LDEyMTMuMTUgMTg0NC4wNiwxMjM4LjU0QzE4NDQuMDYsMTI2My45MyAxODQ2LjIsMTI4NC41NCAxODQ4Ljg1LDEyODQuNTRMMTk0NS41LDEyODQuNTRDMTk0OC4xNCwxMjg0LjU0IDE5NTAuMjksMTI2My45MyAxOTUwLjI5LDEyMzguNTRaIiBzdHlsZT0iZmlsbDogcmdiKDI0NiwgMjIwLCAxODUpOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjc3ODc3LC0xLjAyNjk3LDAuMDU4MTc2NSwwLjAzMzU4ODIsLTQyNS4yOTMsMTIyOC4yNykiPjxyZWN0IHg9IjQ5NS41MiIgeT0iMTA1Ny44NyIgd2lkdGg9IjEwNS4wNzgiIGhlaWdodD0iOTEiIHN0eWxlPSJmaWxsOiByZ2IoMjQwLCAyMTgsIDE4Myk7Ij48L3JlY3Q+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMDM2OTc0MSwwLjAyMTM0Nyw0LjcyNzM1ZS0xNywwLjQ5MjIyNSw0NTYuMTQzLDkxOS45ODUpIj48cmVjdCB4PSIxNjYzLjkyIiB5PSItNDA3LjUxMSIgd2lkdGg9IjE0My4xODMiIGhlaWdodD0iMTE4LjI5MiIgc3R5bGU9ImZpbGw6IHJnYigyNDAsIDIxOCwgMTgzKTsiPjwvcmVjdD48L2c+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNzUwMDgyLDAsMCwwLjc1MDA4MiwxNjMuNDkxLDMwOS4xOTEpIj48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjc1OTQzLC0xLjAxNTgxLDEuNzU4NzllLTE2LDAuNjMyODkzLC0yNzIxLjU0LDE4NzYuNDMpIj48cmVjdCB4PSIxODQ0LjA2IiB5PSIxMTkyLjU0IiB3aWR0aD0iMTA2LjIzMiIgaGVpZ2h0PSI5MiIgc3R5bGU9ImZpbGw6IHJnYigxOTYsIDE3MywgMTQyKTsiPjwvcmVjdD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4yOTA5NTYsLTAuMTY3OTg0LDIuOTA4NDllLTE3LDAuMTA0NjYxLDY5LjQxOTUsOTE5LjMxMSkiPjxwYXRoIGQ9Ik0xOTUwLjI5LDEyMzguNTRDMTk1MC4yOSwxMjEzLjE1IDE5NDQuNzMsMTE5Mi41NCAxOTM3Ljg4LDExOTIuNTRMMTg1Ni40NywxMTkyLjU0QzE4NDkuNjIsMTE5Mi41NCAxODQ0LjA2LDEyMTMuMTUgMTg0NC4wNiwxMjM4LjU0QzE4NDQuMDYsMTI2My45MyAxODQ5LjYyLDEyODQuNTQgMTg1Ni40NywxMjg0LjU0TDE5MzcuODgsMTI4NC41NEMxOTQ0LjczLDEyODQuNTQgMTk1MC4yOSwxMjYzLjkzIDE5NTAuMjksMTIzOC41NFoiIHN0eWxlPSJmaWxsOiByZ2IoMTMyLCA5NywgNTEpOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjI2MjcxNiwtMC4xNTE2NzksOC4yNzQxOGUtMTgsMC4wMzY0OTk5LDEyMS40OTYsOTcwLjUzKSI+PHBhdGggZD0iTTE5NTAuMjksMTIzOC41NEMxOTUwLjI5LDEyMTMuMTUgMTk0OC4xNCwxMTkyLjU0IDE5NDUuNSwxMTkyLjU0TDE4NDguODUsMTE5Mi41NEMxODQ2LjIsMTE5Mi41NCAxODQ0LjA2LDEyMTMuMTUgMTg0NC4wNiwxMjM4LjU0QzE4NDQuMDYsMTI2My45MyAxODQ2LjIsMTI4NC41NCAxODQ4Ljg1LDEyODQuNTRMMTk0NS41LDEyODQuNTRDMTk0OC4xNCwxMjg0LjU0IDE5NTAuMjksMTI2My45MyAxOTUwLjI5LDEyMzguNTRaIiBzdHlsZT0iZmlsbDogcmdiKDI0NiwgMjIwLCAxODUpOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjc3ODc3LC0xLjAyNjk3LDAuMDU4MTc2NSwwLjAzMzU4ODIsLTQyNS4yOTMsMTIyOC4yNykiPjxyZWN0IHg9IjQ5NS41MiIgeT0iMTA1Ny44NyIgd2lkdGg9IjEwNS4wNzgiIGhlaWdodD0iOTEiIHN0eWxlPSJmaWxsOiByZ2IoMjQwLCAyMTgsIDE4Myk7Ij48L3JlY3Q+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMDM2OTc0MSwwLjAyMTM0Nyw0LjcyNzM1ZS0xNywwLjQ5MjIyNSw0NTYuMTQzLDkxOS45ODUpIj48cmVjdCB4PSIxNjYzLjkyIiB5PSItNDA3LjUxMSIgd2lkdGg9IjE0My4xODMiIGhlaWdodD0iMTE4LjI5MiIgc3R5bGU9ImZpbGw6IHJnYigyNDAsIDIxOCwgMTgzKTsiPjwvcmVjdD48L2c+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNzUwMDgyLDAsMCwwLjc1MDA4MiwxNjMuNDkxLDI2My45MzEpIj48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjc1OTQzLC0xLjAxNTgxLDEuNzU4NzllLTE2LDAuNjMyODkzLC0yNzIxLjU0LDE4NzYuNDMpIj48cmVjdCB4PSIxODQ0LjA2IiB5PSIxMTkyLjU0IiB3aWR0aD0iMTA2LjIzMiIgaGVpZ2h0PSI5MiIgc3R5bGU9ImZpbGw6IHJnYigxOTYsIDE3MywgMTQyKTsiPjwvcmVjdD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4yOTA5NTYsLTAuMTY3OTg0LDIuOTA4NDllLTE3LDAuMTA0NjYxLDY5LjQxOTUsOTE5LjMxMSkiPjxwYXRoIGQ9Ik0xOTUwLjI5LDEyMzguNTRDMTk1MC4yOSwxMjEzLjE1IDE5NDQuNzMsMTE5Mi41NCAxOTM3Ljg4LDExOTIuNTRMMTg1Ni40NywxMTkyLjU0QzE4NDkuNjIsMTE5Mi41NCAxODQ0LjA2LDEyMTMuMTUgMTg0NC4wNiwxMjM4LjU0QzE4NDQuMDYsMTI2My45MyAxODQ5LjYyLDEyODQuNTQgMTg1Ni40NywxMjg0LjU0TDE5MzcuODgsMTI4NC41NEMxOTQ0LjczLDEyODQuNTQgMTk1MC4yOSwxMjYzLjkzIDE5NTAuMjksMTIzOC41NFoiIHN0eWxlPSJmaWxsOiByZ2IoMTMyLCA5NywgNTEpOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjI2MjcxNiwtMC4xNTE2NzksOC4yNzQxOGUtMTgsMC4wMzY0OTk5LDEyMS40OTYsOTcwLjUzKSI+PHBhdGggZD0iTTE5NTAuMjksMTIzOC41NEMxOTUwLjI5LDEyMTMuMTUgMTk0OC4xNCwxMTkyLjU0IDE5NDUuNSwxMTkyLjU0TDE4NDguODUsMTE5Mi41NEMxODQ2LjIsMTE5Mi41NCAxODQ0LjA2LDEyMTMuMTUgMTg0NC4wNiwxMjM4LjU0QzE4NDQuMDYsMTI2My45MyAxODQ2LjIsMTI4NC41NCAxODQ4Ljg1LDEyODQuNTRMMTk0NS41LDEyODQuNTRDMTk0OC4xNCwxMjg0LjU0IDE5NTAuMjksMTI2My45MyAxOTUwLjI5LDEyMzguNTRaIiBzdHlsZT0iZmlsbDogcmdiKDI0NiwgMjIwLCAxODUpOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjc3ODc3LC0xLjAyNjk3LDAuMDU4MTc2NSwwLjAzMzU4ODIsLTQyNS4yOTMsMTIyOC4yNykiPjxyZWN0IHg9IjQ5NS41MiIgeT0iMTA1Ny44NyIgd2lkdGg9IjEwNS4wNzgiIGhlaWdodD0iOTEiIHN0eWxlPSJmaWxsOiByZ2IoMjQwLCAyMTgsIDE4Myk7Ij48L3JlY3Q+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMDM2OTc0MSwwLjAyMTM0Nyw0LjcyNzM1ZS0xNywwLjQ5MjIyNSw0NTYuMTQzLDkxOS45ODUpIj48cmVjdCB4PSIxNjYzLjkyIiB5PSItNDA3LjUxMSIgd2lkdGg9IjE0My4xODMiIGhlaWdodD0iMTE4LjI5MiIgc3R5bGU9ImZpbGw6IHJnYigyNDAsIDIxOCwgMTgzKTsiPjwvcmVjdD48L2c+PC9nPjxwYXRoIGQ9Ik01NTUuNzUzLDgzMi40NzRMNTU1Ljc1Myw5MjEuNDA4TDYzMC42OTMsODc4LjE0MUw2MzAuNjkzLDc4OS4yMDdMNTU1Ljc1Myw4MzIuNDc0WiIgc3R5bGU9ImZpbGwtb3BhY2l0eTogMC4xOyI+PC9wYXRoPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNzUwMDgyLDAsMCwwLjc1MDA4MiwyMzYuNDMxLDI3Mi44NTIpIj48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjY0NTUzLC0wLjk1MDA0OSwxLjE0NTUyLDAuNjYxMzY4LC0xNjA2Ljc4LDQ2Ny45MzMpIj48cmVjdCB4PSI0OTUuNTIiIHk9IjEwNTcuODciIHdpZHRoPSIxMDUuMDc4IiBoZWlnaHQ9IjkxIiBzdHlsZT0iZmlsbDogcmdiKDI1MywgMjQzLCAyMjgpOyI+PC9yZWN0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjU0NDc3LC0wLjg5MTg3MywxLjA1ODQ3LDAuNjExMTA4LC0xNDU2Ljg0LDQ5MC43MzQpIj48cmVjdCB4PSI0OTUuNTIiIHk9IjEwNTcuODciIHdpZHRoPSIxMDUuMDc4IiBoZWlnaHQ9IjkxIiBzdHlsZT0iZmlsbDogcmdiKDEzMiwgOTcsIDUxKTsiPjwvcmVjdD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yNzYwNywtMC43MzY3MzksMC43NTE0MzUsMC40MzM4NDEsLTk3MC45NTIsNjE3LjUxOSkiPjxyZWN0IHg9IjQ5NS41MiIgeT0iMTA1Ny44NyIgd2lkdGg9IjEwNS4wNzgiIGhlaWdodD0iOTEiIHN0eWxlPSJmaWxsOiByZ2IoMjQwLCAyMTgsIDE4Myk7Ij48L3JlY3Q+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNjI3NjUsLTAuOTM5NzIzLDEuNDIxNTZlLTE2LDAuNSwtMjQ3Ni44MSwxODkzLjYyKSI+PHJlY3QgeD0iMTg0NC4wNiIgeT0iMTE5Mi41NCIgd2lkdGg9IjEwNi4yMzIiIGhlaWdodD0iOTIiIHN0eWxlPSJmaWxsOiByZ2IoMTk2LCAxNzMsIDE0Mik7Ij48L3JlY3Q+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNjI3NjUsLTAuOTM5NzIzLDEuNDIxNTZlLTE2LDAuNSwtMjQ3Ni44MSwxODkzLjYyKSI+PHJlY3QgeD0iMTg0NC4wNiIgeT0iMTE5Mi41NCIgd2lkdGg9IjEwNi4yMzIiIGhlaWdodD0iOTIiIHN0eWxlPSJmaWxsOiByZ2IoMTk2LCAxNzMsIDE0Mik7Ij48L3JlY3Q+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNzI4MDM4LDAuNDIwMzMzLDMuNTI1OTVlLTE3LDAuMzc3NTg5LC03OTAuOTc4LDE1MS4yNzQpIj48cmVjdCB4PSIxNjYzLjkyIiB5PSItNDA3LjUxMSIgd2lkdGg9IjE0My4xODMiIGhlaWdodD0iMTE4LjI5MiIgc3R5bGU9ImZpbGw6IHJnYigyNDAsIDIxOCwgMTgzKTsiPjwvcmVjdD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS43NTk0MywtMS4wMTU4MSwxLjc1ODc5ZS0xNiwwLjYzMjg5MywtMjcyNi44MywxODczLjM4KSI+PHJlY3QgeD0iMTg0NC4wNiIgeT0iMTE5Mi41NCIgd2lkdGg9IjEwNi4yMzIiIGhlaWdodD0iOTIiIHN0eWxlPSJmaWxsOiByZ2IoMTk2LCAxNzMsIDE0Mik7Ij48L3JlY3Q+PC9nPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNzU5NDMsLTEuMDE1ODEsMS43NTg3OWUtMTYsMC42MzI4OTMsLTI3MjEuNTQsMTg3Ni40MykiPjxyZWN0IHg9IjE4NDQuMDYiIHk9IjExOTIuNTQiIHdpZHRoPSIxMDYuMjMyIiBoZWlnaHQ9IjkyIiBzdHlsZT0iZmlsbDogcmdiKDE5NiwgMTczLCAxNDIpOyI+PC9yZWN0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjI5MDk1NiwtMC4xNjc5ODQsMi45MDg0OWUtMTcsMC4xMDQ2NjEsNjkuNDE5NSw5MTkuMzExKSI+PHBhdGggZD0iTTE5NTAuMjksMTIzOC41NEMxOTUwLjI5LDEyMTMuMTUgMTk0NC43MywxMTkyLjU0IDE5MzcuODgsMTE5Mi41NEwxODU2LjQ3LDExOTIuNTRDMTg0OS42MiwxMTkyLjU0IDE4NDQuMDYsMTIxMy4xNSAxODQ0LjA2LDEyMzguNTRDMTg0NC4wNiwxMjYzLjkzIDE4NDkuNjIsMTI4NC41NCAxODU2LjQ3LDEyODQuNTRMMTkzNy44OCwxMjg0LjU0QzE5NDQuNzMsMTI4NC41NCAxOTUwLjI5LDEyNjMuOTMgMTk1MC4yOSwxMjM4LjU0WiIgc3R5bGU9ImZpbGw6IHJnYigxMzIsIDk3LCA1MSk7Ij48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMjYyNzE2LC0wLjE1MTY3OSw4LjI3NDE4ZS0xOCwwLjAzNjQ5OTksMTIxLjQ5Niw5NzAuNTMpIj48cGF0aCBkPSJNMTk1MC4yOSwxMjM4LjU0QzE5NTAuMjksMTIxMy4xNSAxOTQ4LjE0LDExOTIuNTQgMTk0NS41LDExOTIuNTRMMTg0OC44NSwxMTkyLjU0QzE4NDYuMiwxMTkyLjU0IDE4NDQuMDYsMTIxMy4xNSAxODQ0LjA2LDEyMzguNTRDMTg0NC4wNiwxMjYzLjkzIDE4NDYuMiwxMjg0LjU0IDE4NDguODUsMTI4NC41NEwxOTQ1LjUsMTI4NC41NEMxOTQ4LjE0LDEyODQuNTQgMTk1MC4yOSwxMjYzLjkzIDE5NTAuMjksMTIzOC41NFoiIHN0eWxlPSJmaWxsOiByZ2IoMjQ2LCAyMjAsIDE4NSk7Ij48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNzc4NzcsLTEuMDI2OTcsMC4wNTgxNzY1LDAuMDMzNTg4MiwtNDI1LjI5MywxMjI4LjI3KSI+PHJlY3QgeD0iNDk1LjUyIiB5PSIxMDU3Ljg3IiB3aWR0aD0iMTA1LjA3OCIgaGVpZ2h0PSI5MSIgc3R5bGU9ImZpbGw6IHJnYigyNDAsIDIxOCwgMTgzKTsiPjwvcmVjdD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wMzY5NzQxLDAuMDIxMzQ3LDQuNzI3MzVlLTE3LDAuNDkyMjI1LDQ1Ni4xNDMsOTE5Ljk4NSkiPjxyZWN0IHg9IjE2NjMuOTIiIHk9Ii00MDcuNTExIiB3aWR0aD0iMTQzLjE4MyIgaGVpZ2h0PSIxMTguMjkyIiBzdHlsZT0iZmlsbDogcmdiKDI0MCwgMjE4LCAxODMpOyI+PC9yZWN0PjwvZz48L2c+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNjI3NjUsLTAuOTM5NzIzLDQuODA5ODRlLTE3LDAuMTczOTEzLC0yNDY4LjgxLDIzMDcuODcpIj48cmVjdCB4PSIxODQ0LjA2IiB5PSIxMTkyLjU0IiB3aWR0aD0iMTA2LjIzMiIgaGVpZ2h0PSI5MiIgc3R5bGU9ImZpbGw6IHJnYigxOTYsIDE3MywgMTQyKTsiPjwvcmVjdD48L2c+PC9nPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNDc5MDc3LDAuMjc2NTk1LC0wLjU2NDM3NiwwLjMyNTg0Myw1OTguMzU3LC0xMjkuOTg2KSI+PHBhdGggZD0iTTE3NzYuMTQsMTMyNkMxNzc2LjE0LDEzMjEuMTkgMTc3Mi4xNSwxMzE3LjI4IDE3NjcuMjQsMTMxNy4yOEwxNjg0LjM3LDEzMTcuMjhDMTY3OS40NiwxMzE3LjI4IDE2NzUuNDcsMTMyMS4xOSAxNjc1LjQ3LDEzMjZMMTY3NS40NywxMzk1Ljc1QzE2NzUuNDcsMTQwMC41NiAxNjc5LjQ2LDE0MDQuNDYgMTY4NC4zNywxNDA0LjQ2TDE3NjcuMjQsMTQwNC40NkMxNzcyLjE1LDE0MDQuNDYgMTc3Ni4xNCwxNDAwLjU2IDE3NzYuMTQsMTM5NS43NUwxNzc2LjE0LDEzMjZaIiBzdHlsZT0iZmlsbDogd2hpdGU7Ij48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDIuNjE2MjIsMCwwLDIuNjE2MjIsLTIzMDUuNzMsMTYyLjE2MSkiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMDk5MTUsLTAuNjM0NTk3LDEuMjY5MTksMC43MzI3NywtMjk5LjE2NywtNjIuNDYxNSkiPjxlbGxpcHNlIGN4PSI0MTIuNzE5IiBjeT0iNzcwLjU3NSIgcng9IjYuMzAzIiByeT0iNS40NTkiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAxMjUsIDApOyI+PC9lbGxpcHNlPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjIzODIxMiwtMC4xMzc1MzIsMC4xNzg2NTksMC4xMDMxNDksODc1LjA2NCwyMDcuOTMpIj48dGV4dCB4PSI0MTMuNDc0cHgiIHk9Ijg5Mi4wNjdweCIgc3R5bGU9ImZvbnQtZmFtaWx5OiBOdW5pdG9TYW5zLUJvbGQsICZxdW90O051bml0byBTYW5zJnF1b3Q7OyBmb250LXdlaWdodDogNzAwOyBmb250LXNpemU6IDQxLjU2OXB4OyBmaWxsOiB3aGl0ZTsiPj88L3RleHQ+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9zdmc+";

// node_modules/yc-design-vue/es/_shared/icons/Icon500.svg.js
var Icon500 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMTMgMjEzIiBzdHlsZT0iZmlsbC1ydWxlOiBldmVub2RkOyBjbGlwLXJ1bGU6IGV2ZW5vZGQ7IHN0cm9rZS1saW5lam9pbjogcm91bmQ7IHN0cm9rZS1taXRlcmxpbWl0OiAyOyI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwtNDgzLjA1NCwtNDQ1LjQ0OCkiPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsLTQ2My42OTksLTg3LjU1MTYpIj48Y2lyY2xlIGN4PSIxMDUzLjIzIiBjeT0iNjM5LjQ3NyIgcj0iMTA2LjQ3NyIgc3R5bGU9ImZpbGw6IHJnYigyMzUsIDIzOCwgMjQ2KTsiPjwvY2lyY2xlPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM4NDUzMiwtMC4yMjIwMDksMC40NDQwMTksMC4yNTYzNTQsLTAuNTY5NzgxLDI2MC4wMjEpIj48cGF0aCBkPSJNODQuMjk5LDEyNjkuMzhDODQuMjk5LDEyNjEuOTkgNzguMzAxLDEyNTYgNzAuOTEzLDEyNTZMLTU2Ljg3NCwxMjU2Qy02NC4yNjEsMTI1NiAtNzAuMjU5LDEyNjEuOTkgLTcwLjI1OSwxMjY5LjM4TC03MC4yNTksMTM3Ni40NkMtNzAuMjU5LDEzODMuODUgLTY0LjI2MSwxMzg5Ljg1IC01Ni44NzQsMTM4OS44NUw3MC45MTMsMTM4OS44NUM3OC4zMDEsMTM4OS44NSA4NC4yOTksMTM4My44NSA4NC4yOTksMTM3Ni40Nkw4NC4yOTksMTI2OS4zOFoiIHN0eWxlPSJmaWxsLW9wYWNpdHk6IDAuMTsiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zODQ1MzIsLTAuMjIyMDA5LDAuNDQ0MDE5LDAuMjU2MzU0LC0wLjU2OTc4MSwyMTguODQ1KSI+PHBhdGggZD0iTTg0LjI5OSwxMjY5LjM4Qzg0LjI5OSwxMjYxLjk5IDc4LjMwMSwxMjU2IDcwLjkxMywxMjU2TC01Ni44NzQsMTI1NkMtNjQuMjYxLDEyNTYgLTcwLjI1OSwxMjYxLjk5IC03MC4yNTksMTI2OS4zOEwtNzAuMjU5LDEzNzYuNDZDLTcwLjI1OSwxMzgzLjg1IC02NC4yNjEsMTM4OS44NSAtNTYuODc0LDEzODkuODVMNzAuOTEzLDEzODkuODVDNzguMzAxLDEzODkuODUgODQuMjk5LDEzODMuODUgODQuMjk5LDEzNzYuNDZMODQuMjk5LDEyNjkuMzhaIiBzdHlsZT0iZmlsbDogcmdiKDY0LCAxMjgsIDI1NSk7Ij48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMzYxNDk2LC0wLjIwODcxLDAuNDE3NDIsMC4yNDA5OTcsMzQuNzgwNSwyMzguODA3KSI+PHBhdGggZD0iTTg0LjI5OSwxMjY5LjM4Qzg0LjI5OSwxMjYxLjk5IDc4LjMwMSwxMjU2IDcwLjkxMywxMjU2TC01Ni44NzQsMTI1NkMtNjQuMjYxLDEyNTYgLTcwLjI1OSwxMjYxLjk5IC03MC4yNTksMTI2OS4zOEwtNzAuMjU5LDEzNzYuNDZDLTcwLjI1OSwxMzgzLjg1IC02NC4yNjEsMTM4OS44NSAtNTYuODc0LDEzODkuODVMNzAuOTEzLDEzODkuODVDNzguMzAxLDEzODkuODUgODQuMjk5LDEzODMuODUgODQuMjk5LDEzNzYuNDZMODQuMjk5LDEyNjkuMzhaIiBzdHlsZT0iZmlsbDogcmdiKDAsIDg1LCAyNTUpOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM0MTg1MywtMC4xOTczNjksMC4zOTQ3MzgsMC4yMjc5MDIsNjQuOTI0NywyNTcuODA0KSI+PHBhdGggZD0iTTg0LjI5OSwxMjY5LjM4Qzg0LjI5OSwxMjYxLjk5IDc4LjMwMSwxMjU2IDcwLjkxMywxMjU2TC01Ni44NzQsMTI1NkMtNjQuMjYxLDEyNTYgLTcwLjI1OSwxMjYxLjk5IC03MC4yNTksMTI2OS4zOEwtNzAuMjU5LDEzNzYuNDZDLTcwLjI1OSwxMzgzLjg1IC02NC4yNjEsMTM4OS44NSAtNTYuODc0LDEzODkuODVMNzAuOTEzLDEzODkuODVDNzguMzAxLDEzODkuODUgODQuMjk5LDEzODMuODUgODQuMjk5LDEzNzYuNDZMODQuMjk5LDEyNjkuMzhaIiBzdHlsZT0iZmlsbDogcmdiKDI5LCAxMDUsIDI1NSk7Ij48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNDI4OTE2LDAsMCwwLjQyODkxNiwxOS4wNTg4LDMyOS45NTYpIj48Y2xpcFBhdGggaWQ9Il9jbGlwMSI+PHBhdGggZD0iTTE0NjEuMDcsNTI4LjQ0NUMxNDYxLjA3LDUzMC44NzYgMTQ1OS42LDUzMy4xOTYgMTQ1Ni42LDUzNC45MjhMMTM0Mi4wNCw2MDEuMDcyQzEzMzUuNDEsNjA0Ljg5NiAxMzIzLjgzLDYwNC40MTUgMTMxNi4xOCw2MDBMMTIwNS4zMyw1MzZDMTIwMS4xNCw1MzMuNTg1IDExOTksNTMwLjQ4OSAxMTk5LDUyNy41NTVMMTE5OSw1NTkuNTU1QzExOTksNTYyLjQ4OSAxMjAxLjE0LDU2NS41ODUgMTIwNS4zMyw1NjhMMTMxNi4xOCw2MzJDMTMyMy44Myw2MzYuNDE1IDEzMzUuNDEsNjM2Ljg5NiAxMzQyLjA0LDYzMy4wNzJMMTQ1Ni42LDU2Ni45MjhDMTQ1OS42LDU2NS4xOTYgMTQ2MS4wNyw1NjIuODc2IDE0NjEuMDcsNTYwLjQ0NUwxNDYxLjA3LDUyOC40NDVaIj48L3BhdGg+PC9jbGlwUGF0aD48ZyBjbGlwLXBhdGg9InVybCgjX2NsaXAxKSI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMi4zMzE0NiwtMCwtMCwyLjMzMTQ2LDEwODEuNzksMjY5LjI2NikiPjx1c2UgaHJlZj0iI19JbWFnZTIiIHg9IjUwLjU0IiB5PSIxMTIuMzAxIiB3aWR0aD0iMTEyLjQwNnB4IiBoZWlnaHQ9IjQ2LjM2NXB4IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5NDc0LDAsMCwwLjk4NjQ5LDAsMCkiPjwvdXNlPjwvZz48L2c+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMzQ3NzY5LDAuMjAwNzg1LDMuNDQ4NTJlLTE4LDAuNTQ1NDY2LDUyLjA5MjksMjY1LjQ0OCkiPjxwYXRoIGQ9Ik0xNDgwLjMzLDM0LjgxM0MxNDgwLjMzLDM0LjE2MiAxNDc5LjcsMzMuNjM0IDE0NzguOTQsMzMuNjM0TDEzOTYuMjcsMzMuNjM0QzEzOTUuNSwzMy42MzQgMTM5NC44OCwzNC4xNjIgMTM5NC44OCwzNC44MTNDMTM5NC44OCwzNS40NjQgMTM5NS41LDM1Ljk5MyAxMzk2LjI3LDM1Ljk5M0wxNDc4Ljk0LDM1Ljk5M0MxNDc5LjcsMzUuOTkzIDE0ODAuMzMsMzUuNDY0IDE0ODAuMzMsMzQuODEzWiIgc3R5bGU9ImZpbGw6IHdoaXRlOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM0Nzc2OSwwLjIwMDc4NSwzLjQ0ODUyZS0xOCwwLjU0NTQ2Niw1Mi4wOTI5LDI2OC40NSkiPjxwYXRoIGQ9Ik0xNDgwLjMzLDM0LjgxM0MxNDgwLjMzLDM0LjE2MiAxNDc5LjcsMzMuNjM0IDE0NzguOTQsMzMuNjM0TDEzOTYuMjcsMzMuNjM0QzEzOTUuNSwzMy42MzQgMTM5NC44OCwzNC4xNjIgMTM5NC44OCwzNC44MTNDMTM5NC44OCwzNS40NjQgMTM5NS41LDM1Ljk5MyAxMzk2LjI3LDM1Ljk5M0wxNDc4Ljk0LDM1Ljk5M0MxNDc5LjcsMzUuOTkzIDE0ODAuMzMsMzUuNDY0IDE0ODAuMzMsMzQuODEzWiIgc3R5bGU9ImZpbGw6IHdoaXRlOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM0Nzc2OSwwLjIwMDc4NSwzLjQ0ODUyZS0xOCwwLjU0NTQ2Niw1Mi4wOTI5LDI3MS40NTIpIj48cGF0aCBkPSJNMTQ4MC4zMywzNC44MTNDMTQ4MC4zMywzNC4xNjIgMTQ3OS43LDMzLjYzNCAxNDc4Ljk0LDMzLjYzNEwxMzk2LjI3LDMzLjYzNEMxMzk1LjUsMzMuNjM0IDEzOTQuODgsMzQuMTYyIDEzOTQuODgsMzQuODEzQzEzOTQuODgsMzUuNDY0IDEzOTUuNSwzNS45OTMgMTM5Ni4yNywzNS45OTNMMTQ3OC45NCwzNS45OTNDMTQ3OS43LDM1Ljk5MyAxNDgwLjMzLDM1LjQ2NCAxNDgwLjMzLDM0LjgxM1oiIHN0eWxlPSJmaWxsOiB3aGl0ZTsiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNjAyODksLTAuMjA4MDEzLC00LjM5ODg3ZS0xOCwwLjU3Njk0MSwzNy41ODQ3LDEyNC4yNjIpIj48cmVjdCB4PSIxNjIxLjIiIHk9IjEzNzAuNTciIHdpZHRoPSI1Ny43MzUiIGhlaWdodD0iNS45NDciIHN0eWxlPSJmaWxsOiByZ2IoMTA2LCAxNjEsIDI1NSk7Ij48L3JlY3Q+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMTg1NzI2LC0wLjEwNzIyOSwtMS44NDE2OGUtMTgsMC4yNDc2MzUsMzA3LjUwNSw0MjAuNzk2KSI+PGVsbGlwc2UgY3g9IjE1NjYuMzEiIGN5PSIxMzcyLjMiIHJ4PSI0IiByeT0iMy40NjQiIHN0eWxlPSJmaWxsOiByZ2IoNjQsIDEyOCwgMjU1KTsiPjwvZWxsaXBzZT48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4xODU3MjYsLTAuMTA3MjI5LC0xLjg0MTY4ZS0xOCwwLjI0NzYzNSwzMTAuNTA3LDQxOS4wNjIpIj48ZWxsaXBzZSBjeD0iMTU2Ni4zMSIgY3k9IjEzNzIuMyIgcng9IjQiIHJ5PSIzLjQ2NCIgc3R5bGU9ImZpbGw6IHJnYig2NCwgMTI4LCAyNTUpOyI+PC9lbGxpcHNlPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjE4NTcyNiwtMC4xMDcyMjksLTEuODQxNjhlLTE4LDAuMjQ3NjM1LDMxMy41MDksNDE3LjMyOSkiPjxlbGxpcHNlIGN4PSIxNTY2LjMxIiBjeT0iMTM3Mi4zIiByeD0iNCIgcnk9IjMuNDY0IiBzdHlsZT0iZmlsbDogd2hpdGU7Ij48L2VsbGlwc2U+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMTg1NzI2LC0wLjEwNzIyOSwtMS44NDE2OGUtMTgsMC4yNDc2MzUsMzE2LjUxMiw0MTUuNTk1KSI+PGVsbGlwc2UgY3g9IjE1NjYuMzEiIGN5PSIxMzcyLjMiIHJ4PSI0IiByeT0iMy40NjQiIHN0eWxlPSJmaWxsOiByZ2IoNjQsIDEyOCwgMjU1KTsiPjwvZWxsaXBzZT48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4xODU3MjYsLTAuMTA3MjI5LC0xLjg0MTY4ZS0xOCwwLjI0NzYzNSwzMTkuNTE0LDQxMy44NjIpIj48ZWxsaXBzZSBjeD0iMTU2Ni4zMSIgY3k9IjEzNzIuMyIgcng9IjQiIHJ5PSIzLjQ2NCIgc3R5bGU9ImZpbGw6IHJnYig2NCwgMTI4LCAyNTUpOyI+PC9lbGxpcHNlPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM4NDUzMiwtMC4yMjIwMDksMC40NDQwMTksMC4yNTYzNTQsLTAuNTY5NzgxLDE5Ni41NDIpIj48Y2xpcFBhdGggaWQ9Il9jbGlwMyI+PHBhdGggZD0iTTg0LjI5OSwxMjY5LjM4Qzg0LjI5OSwxMjYxLjk5IDc4LjMwMSwxMjU2IDcwLjkxMywxMjU2TC01Ni44NzQsMTI1NkMtNjQuMjYxLDEyNTYgLTcwLjI1OSwxMjYxLjk5IC03MC4yNTksMTI2OS4zOEwtNzAuMjU5LDEzNzYuNDZDLTcwLjI1OSwxMzgzLjg1IC02NC4yNjEsMTM4OS44NSAtNTYuODc0LDEzODkuODVMNzAuOTEzLDEzODkuODVDNzguMzAxLDEzODkuODUgODQuMjk5LDEzODMuODUgODQuMjk5LDEzNzYuNDZMODQuMjk5LDEyNjkuMzhaIj48L3BhdGg+PC9jbGlwUGF0aD48ZyBjbGlwLXBhdGg9InVybCgjX2NsaXAzKSI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4zMDAyOCwxLjEyNjA4LC0yLjI1MjE2LDEuOTUwNDIsNjguMjcxNiwxMDMwLjA3KSI+PHVzZSBocmVmPSIjX0ltYWdlNCIgeD0iNTAuNTQiIHk9IjU2LjMxMiIgd2lkdGg9IjExMi40MDZweCIgaGVpZ2h0PSI2NC44OTdweCIgdHJhbnNmb3JtPSJtYXRyaXgoMC45OTQ3NCwwLDAsMC45OTg0MjIsMCwwKSI+PC91c2U+PC9nPjwvZz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNjE0OTYsLTAuMjA4NzEsMC40MTc0MiwwLjI0MDk5NywzNC43ODA1LDIxNi43NjQpIj48cGF0aCBkPSJNODQuMjk5LDEyNjkuMzhDODQuMjk5LDEyNjEuOTkgNzguMzAxLDEyNTYgNzAuOTEzLDEyNTZMLTU2Ljg3NCwxMjU2Qy02NC4yNjEsMTI1NiAtNzAuMjU5LDEyNjEuOTkgLTcwLjI1OSwxMjY5LjM4TC03MC4yNTksMTM3Ni40NkMtNzAuMjU5LDEzODMuODUgLTY0LjI2MSwxMzg5Ljg1IC01Ni44NzQsMTM4OS44NUw3MC45MTMsMTM4OS44NUM3OC4zMDEsMTM4OS44NSA4NC4yOTksMTM4My44NSA4NC4yOTksMTM3Ni40Nkw4NC4yOTksMTI2OS4zOFoiIHN0eWxlPSJmaWxsOiByZ2IoMCwgODUsIDI1NSk7Ij48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMzQxODUzLC0wLjE5NzM2OSwwLjM5NDczOCwwLjIyNzkwMiw2NC45MjQ3LDIzNS43NjIpIj48cGF0aCBkPSJNODQuMjk5LDEyNjkuMzhDODQuMjk5LDEyNjEuOTkgNzguMzAxLDEyNTYgNzAuOTEzLDEyNTZMLTU2Ljg3NCwxMjU2Qy02NC4yNjEsMTI1NiAtNzAuMjU5LDEyNjEuOTkgLTcwLjI1OSwxMjY5LjM4TC03MC4yNTksMTM3Ni40NkMtNzAuMjU5LDEzODMuODUgLTY0LjI2MSwxMzg5Ljg1IC01Ni44NzQsMTM4OS44NUw3MC45MTMsMTM4OS44NUM3OC4zMDEsMTM4OS44NSA4NC4yOTksMTM4My44NSA4NC4yOTksMTM3Ni40Nkw4NC4yOTksMTI2OS4zOFoiIHN0eWxlPSJmaWxsOiByZ2IoMjksIDEwNSwgMjU1KTsiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC40Mjg5MTYsMCwwLDAuNDI4OTE2LDE5LjA1ODgsMzA3LjY1MikiPjxjbGlwUGF0aCBpZD0iX2NsaXA1Ij48cGF0aCBkPSJNMTQ2MS4wNyw1MjguNDQ1QzE0NjEuMDcsNTMwLjg3NiAxNDU5LjYsNTMzLjE5NiAxNDU2LjYsNTM0LjkyOEwxMzQyLjA0LDYwMS4wNzJDMTMzNS40MSw2MDQuODk2IDEzMjMuODMsNjA0LjQxNSAxMzE2LjE4LDYwMEwxMjA1LjMzLDUzNkMxMjAxLjE0LDUzMy41ODUgMTE5OSw1MzAuNDg5IDExOTksNTI3LjU1NUwxMTk5LDU1OS41NTVDMTE5OSw1NjIuNDg5IDEyMDEuMTQsNTY1LjU4NSAxMjA1LjMzLDU2OEwxMzE2LjE4LDYzMkMxMzIzLjgzLDYzNi40MTUgMTMzNS40MSw2MzYuODk2IDEzNDIuMDQsNjMzLjA3MkwxNDU2LjYsNTY2LjkyOEMxNDU5LjYsNTY1LjE5NiAxNDYxLjA3LDU2Mi44NzYgMTQ2MS4wNyw1NjAuNDQ1TDE0NjEuMDcsNTI4LjQ0NVoiPjwvcGF0aD48L2NsaXBQYXRoPjxnIGNsaXAtcGF0aD0idXJsKCNfY2xpcDUpIj48ZyB0cmFuc2Zvcm09Im1hdHJpeCgyLjMzMTQ2LC0wLC0wLDIuMzMxNDYsMTA4MS43OSwzMjEuMjY2KSI+PHVzZSBocmVmPSIjX0ltYWdlMiIgeD0iNTAuNTQiIHk9Ijg5LjY5MiIgd2lkdGg9IjExMi40MDZweCIgaGVpZ2h0PSI0Ni4zNjVweCIgdHJhbnNmb3JtPSJtYXRyaXgoMC45OTQ3NCwwLDAsMC45ODY0OSwwLDApIj48L3VzZT48L2c+PC9nPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM0Nzc2OSwwLjIwMDc4NSwzLjQ0ODUyZS0xOCwwLjU0NTQ2Niw1Mi4wOTI5LDI0My4xNDQpIj48cGF0aCBkPSJNMTQ4MC4zMywzNC44MTNDMTQ4MC4zMywzNC4xNjIgMTQ3OS43LDMzLjYzNCAxNDc4Ljk0LDMzLjYzNEwxMzk2LjI3LDMzLjYzNEMxMzk1LjUsMzMuNjM0IDEzOTQuODgsMzQuMTYyIDEzOTQuODgsMzQuODEzQzEzOTQuODgsMzUuNDY0IDEzOTUuNSwzNS45OTMgMTM5Ni4yNywzNS45OTNMMTQ3OC45NCwzNS45OTNDMTQ3OS43LDM1Ljk5MyAxNDgwLjMzLDM1LjQ2NCAxNDgwLjMzLDM0LjgxM1oiIHN0eWxlPSJmaWxsOiB3aGl0ZTsiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNDc3NjksMC4yMDA3ODUsMy40NDg1MmUtMTgsMC41NDU0NjYsNTIuMDkyOSwyNDYuMTQ2KSI+PHBhdGggZD0iTTE0ODAuMzMsMzQuODEzQzE0ODAuMzMsMzQuMTYyIDE0NzkuNywzMy42MzQgMTQ3OC45NCwzMy42MzRMMTM5Ni4yNywzMy42MzRDMTM5NS41LDMzLjYzNCAxMzk0Ljg4LDM0LjE2MiAxMzk0Ljg4LDM0LjgxM0MxMzk0Ljg4LDM1LjQ2NCAxMzk1LjUsMzUuOTkzIDEzOTYuMjcsMzUuOTkzTDE0NzguOTQsMzUuOTkzQzE0NzkuNywzNS45OTMgMTQ4MC4zMywzNS40NjQgMTQ4MC4zMywzNC44MTNaIiBzdHlsZT0iZmlsbDogd2hpdGU7Ij48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMzQ3NzY5LDAuMjAwNzg1LDMuNDQ4NTJlLTE4LDAuNTQ1NDY2LDUyLjA5MjksMjQ5LjE0OSkiPjxwYXRoIGQ9Ik0xNDgwLjMzLDM0LjgxM0MxNDgwLjMzLDM0LjE2MiAxNDc5LjcsMzMuNjM0IDE0NzguOTQsMzMuNjM0TDEzOTYuMjcsMzMuNjM0QzEzOTUuNSwzMy42MzQgMTM5NC44OCwzNC4xNjIgMTM5NC44OCwzNC44MTNDMTM5NC44OCwzNS40NjQgMTM5NS41LDM1Ljk5MyAxMzk2LjI3LDM1Ljk5M0wxNDc4Ljk0LDM1Ljk5M0MxNDc5LjcsMzUuOTkzIDE0ODAuMzMsMzUuNDY0IDE0ODAuMzMsMzQuODEzWiIgc3R5bGU9ImZpbGw6IHdoaXRlOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM2MDI4OSwtMC4yMDgwMTMsLTQuMzk4ODdlLTE4LDAuNTc2OTQxLDM3LjU4NDcsMTAxLjk1OCkiPjxyZWN0IHg9IjE2MjEuMiIgeT0iMTM3MC41NyIgd2lkdGg9IjU3LjczNSIgaGVpZ2h0PSI1Ljk0NyIgc3R5bGU9ImZpbGw6IHJnYigxMDYsIDE2MSwgMjU1KTsiPjwvcmVjdD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4xODU3MjYsLTAuMTA3MjI5LC0xLjg0MTY4ZS0xOCwwLjI0NzYzNSwzMDcuNTA1LDM5OC40OTIpIj48ZWxsaXBzZSBjeD0iMTU2Ni4zMSIgY3k9IjEzNzIuMyIgcng9IjQiIHJ5PSIzLjQ2NCIgc3R5bGU9ImZpbGw6IHJnYig2NCwgMTI4LCAyNTUpOyI+PC9lbGxpcHNlPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjE4NTcyNiwtMC4xMDcyMjksLTEuODQxNjhlLTE4LDAuMjQ3NjM1LDMxMC41MDcsMzk2Ljc1OSkiPjxlbGxpcHNlIGN4PSIxNTY2LjMxIiBjeT0iMTM3Mi4zIiByeD0iNCIgcnk9IjMuNDY0IiBzdHlsZT0iZmlsbDogd2hpdGU7Ij48L2VsbGlwc2U+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMTg1NzI2LC0wLjEwNzIyOSwtMS44NDE2OGUtMTgsMC4yNDc2MzUsMzEzLjUwOSwzOTUuMDI1KSI+PGVsbGlwc2UgY3g9IjE1NjYuMzEiIGN5PSIxMzcyLjMiIHJ4PSI0IiByeT0iMy40NjQiIHN0eWxlPSJmaWxsOiByZ2IoNjQsIDEyOCwgMjU1KTsiPjwvZWxsaXBzZT48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4xODU3MjYsLTAuMTA3MjI5LC0xLjg0MTY4ZS0xOCwwLjI0NzYzNSwzMTYuNTEyLDM5My4yOTIpIj48ZWxsaXBzZSBjeD0iMTU2Ni4zMSIgY3k9IjEzNzIuMyIgcng9IjQiIHJ5PSIzLjQ2NCIgc3R5bGU9ImZpbGw6IHJnYig2NCwgMTI4LCAyNTUpOyI+PC9lbGxpcHNlPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjE4NTcyNiwtMC4xMDcyMjksLTEuODQxNjhlLTE4LDAuMjQ3NjM1LDMxOS41MTQsMzkxLjU1OCkiPjxlbGxpcHNlIGN4PSIxNTY2LjMxIiBjeT0iMTM3Mi4zIiByeD0iNCIgcnk9IjMuNDY0IiBzdHlsZT0iZmlsbDogcmdiKDY0LCAxMjgsIDI1NSk7Ij48L2VsbGlwc2U+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMzg0NTMyLC0wLjIyMjAwOSwwLjQ0NDAxOSwwLjI1NjM1NCwtMC41Njk3ODEsMTcxLjgzMikiPjxjbGlwUGF0aCBpZD0iX2NsaXA2Ij48cGF0aCBkPSJNODQuMjk5LDEyNjkuMzhDODQuMjk5LDEyNjEuOTkgNzguMzAxLDEyNTYgNzAuOTEzLDEyNTZMLTU2Ljg3NCwxMjU2Qy02NC4yNjEsMTI1NiAtNzAuMjU5LDEyNjEuOTkgLTcwLjI1OSwxMjY5LjM4TC03MC4yNTksMTM3Ni40NkMtNzAuMjU5LDEzODMuODUgLTY0LjI2MSwxMzg5Ljg1IC01Ni44NzQsMTM4OS44NUw3MC45MTMsMTM4OS44NUM3OC4zMDEsMTM4OS44NSA4NC4yOTksMTM4My44NSA4NC4yOTksMTM3Ni40Nkw4NC4yOTksMTI2OS4zOFoiPjwvcGF0aD48L2NsaXBQYXRoPjxnIGNsaXAtcGF0aD0idXJsKCNfY2xpcDYpIj48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjMwMDI4LDEuMTI2MDgsLTIuMjUyMTYsMS45NTA0MiwxMi42MjE1LDEwNzguMjcpIj48dXNlIGhyZWY9IiNfSW1hZ2U3IiB4PSI1MC41NCIgeT0iMzEuNTYzIiB3aWR0aD0iMTEyLjQwNnB4IiBoZWlnaHQ9IjY0Ljg5N3B4IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5NDc0LDAsMCwwLjk5ODQyMiwwLDApIj48L3VzZT48L2c+PC9nPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM2MTQ5NiwtMC4yMDg3MSwwLjQxNzQyLDAuMjQwOTk3LDM0Ljc4MDUsMTkyLjA1NSkiPjxwYXRoIGQ9Ik04NC4yOTksMTI2OS4zOEM4NC4yOTksMTI2MS45OSA3OC4zMDEsMTI1NiA3MC45MTMsMTI1NkwtNTYuODc0LDEyNTZDLTY0LjI2MSwxMjU2IC03MC4yNTksMTI2MS45OSAtNzAuMjU5LDEyNjkuMzhMLTcwLjI1OSwxMzc2LjQ2Qy03MC4yNTksMTM4My44NSAtNjQuMjYxLDEzODkuODUgLTU2Ljg3NCwxMzg5Ljg1TDcwLjkxMywxMzg5Ljg1Qzc4LjMwMSwxMzg5Ljg1IDg0LjI5OSwxMzgzLjg1IDg0LjI5OSwxMzc2LjQ2TDg0LjI5OSwxMjY5LjM4WiIgc3R5bGU9ImZpbGw6IHJnYigwLCA4NSwgMjU1KTsiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNDE4NTMsLTAuMTk3MzY5LDAuMzk0NzM4LDAuMjI3OTAyLDY0LjkyNDcsMjExLjA1MikiPjxwYXRoIGQ9Ik04NC4yOTksMTI2OS4zOEM4NC4yOTksMTI2MS45OSA3OC4zMDEsMTI1NiA3MC45MTMsMTI1NkwtNTYuODc0LDEyNTZDLTY0LjI2MSwxMjU2IC03MC4yNTksMTI2MS45OSAtNzAuMjU5LDEyNjkuMzhMLTcwLjI1OSwxMzc2LjQ2Qy03MC4yNTksMTM4My44NSAtNjQuMjYxLDEzODkuODUgLTU2Ljg3NCwxMzg5Ljg1TDcwLjkxMywxMzg5Ljg1Qzc4LjMwMSwxMzg5Ljg1IDg0LjI5OSwxMzgzLjg1IDg0LjI5OSwxMzc2LjQ2TDg0LjI5OSwxMjY5LjM4WiIgc3R5bGU9ImZpbGw6IHJnYigyOSwgMTA1LCAyNTUpOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjQyODkxNiwwLDAsMC40Mjg5MTYsMTkuMDU4OCwyODIuOTQzKSI+PGNsaXBQYXRoIGlkPSJfY2xpcDgiPjxwYXRoIGQ9Ik0xNDYxLjA3LDUyOC40NDVDMTQ2MS4wNyw1MzAuODc2IDE0NTkuNiw1MzMuMTk2IDE0NTYuNiw1MzQuOTI4TDEzNDIuMDQsNjAxLjA3MkMxMzM1LjQxLDYwNC44OTYgMTMyMy44Myw2MDQuNDE1IDEzMTYuMTgsNjAwTDEyMDUuMzMsNTM2QzEyMDEuMTQsNTMzLjU4NSAxMTk5LDUzMC40ODkgMTE5OSw1MjcuNTU1TDExOTksNTU5LjU1NUMxMTk5LDU2Mi40ODkgMTIwMS4xNCw1NjUuNTg1IDEyMDUuMzMsNTY4TDEzMTYuMTgsNjMyQzEzMjMuODMsNjM2LjQxNSAxMzM1LjQxLDYzNi44OTYgMTM0Mi4wNCw2MzMuMDcyTDE0NTYuNiw1NjYuOTI4QzE0NTkuNiw1NjUuMTk2IDE0NjEuMDcsNTYyLjg3NiAxNDYxLjA3LDU2MC40NDVMMTQ2MS4wNyw1MjguNDQ1WiI+PC9wYXRoPjwvY2xpcFBhdGg+PGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwOCkiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDIuMzMxNDYsLTAsLTAsMi4zMzE0NiwxMDgxLjc5LDM3OC44NzYpIj48dXNlIGhyZWY9IiNfSW1hZ2UyIiB4PSI1MC41NCIgeT0iNjQuNjQ0IiB3aWR0aD0iMTEyLjQwNnB4IiBoZWlnaHQ9IjQ2LjM2NXB4IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5NDc0LDAsMCwwLjk4NjQ5LDAsMCkiPjwvdXNlPjwvZz48L2c+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMzQ3NzY5LDAuMjAwNzg1LDMuNDQ4NTJlLTE4LDAuNTQ1NDY2LDUyLjA5MjksMjE4LjQzNCkiPjxwYXRoIGQ9Ik0xNDgwLjMzLDM0LjgxM0MxNDgwLjMzLDM0LjE2MiAxNDc5LjcsMzMuNjM0IDE0NzguOTQsMzMuNjM0TDEzOTYuMjcsMzMuNjM0QzEzOTUuNSwzMy42MzQgMTM5NC44OCwzNC4xNjIgMTM5NC44OCwzNC44MTNDMTM5NC44OCwzNS40NjQgMTM5NS41LDM1Ljk5MyAxMzk2LjI3LDM1Ljk5M0wxNDc4Ljk0LDM1Ljk5M0MxNDc5LjcsMzUuOTkzIDE0ODAuMzMsMzUuNDY0IDE0ODAuMzMsMzQuODEzWiIgc3R5bGU9ImZpbGw6IHdoaXRlOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM0Nzc2OSwwLjIwMDc4NSwzLjQ0ODUyZS0xOCwwLjU0NTQ2Niw1Mi4wOTI5LDIyMS40MzcpIj48cGF0aCBkPSJNMTQ4MC4zMywzNC44MTNDMTQ4MC4zMywzNC4xNjIgMTQ3OS43LDMzLjYzNCAxNDc4Ljk0LDMzLjYzNEwxMzk2LjI3LDMzLjYzNEMxMzk1LjUsMzMuNjM0IDEzOTQuODgsMzQuMTYyIDEzOTQuODgsMzQuODEzQzEzOTQuODgsMzUuNDY0IDEzOTUuNSwzNS45OTMgMTM5Ni4yNywzNS45OTNMMTQ3OC45NCwzNS45OTNDMTQ3OS43LDM1Ljk5MyAxNDgwLjMzLDM1LjQ2NCAxNDgwLjMzLDM0LjgxM1oiIHN0eWxlPSJmaWxsOiB3aGl0ZTsiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNDc3NjksMC4yMDA3ODUsMy40NDg1MmUtMTgsMC41NDU0NjYsNTIuMDkyOSwyMjQuNDM5KSI+PHBhdGggZD0iTTE0ODAuMzMsMzQuODEzQzE0ODAuMzMsMzQuMTYyIDE0NzkuNywzMy42MzQgMTQ3OC45NCwzMy42MzRMMTM5Ni4yNywzMy42MzRDMTM5NS41LDMzLjYzNCAxMzk0Ljg4LDM0LjE2MiAxMzk0Ljg4LDM0LjgxM0MxMzk0Ljg4LDM1LjQ2NCAxMzk1LjUsMzUuOTkzIDEzOTYuMjcsMzUuOTkzTDE0NzguOTQsMzUuOTkzQzE0NzkuNywzNS45OTMgMTQ4MC4zMywzNS40NjQgMTQ4MC4zMywzNC44MTNaIiBzdHlsZT0iZmlsbDogd2hpdGU7Ij48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMzYwMjg5LC0wLjIwODAxMywtNC4zOTg4N2UtMTgsMC41NzY5NDEsMzcuNTg0Nyw3Ny4yNDg0KSI+PHJlY3QgeD0iMTYyMS4yIiB5PSIxMzcwLjU3IiB3aWR0aD0iNTcuNzM1IiBoZWlnaHQ9IjUuOTQ3IiBzdHlsZT0iZmlsbDogcmdiKDEwNiwgMTYxLCAyNTUpOyI+PC9yZWN0PjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjE4NTcyNiwtMC4xMDcyMjksLTEuODQxNjhlLTE4LDAuMjQ3NjM1LDMwNy41MDUsMzczLjc4MikiPjxlbGxpcHNlIGN4PSIxNTY2LjMxIiBjeT0iMTM3Mi4zIiByeD0iNCIgcnk9IjMuNDY0IiBzdHlsZT0iZmlsbDogd2hpdGU7Ij48L2VsbGlwc2U+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMTg1NzI2LC0wLjEwNzIyOSwtMS44NDE2OGUtMTgsMC4yNDc2MzUsMzEwLjUwNywzNzIuMDQ5KSI+PGVsbGlwc2UgY3g9IjE1NjYuMzEiIGN5PSIxMzcyLjMiIHJ4PSI0IiByeT0iMy40NjQiIHN0eWxlPSJmaWxsOiByZ2IoNjQsIDEyOCwgMjU1KTsiPjwvZWxsaXBzZT48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4xODU3MjYsLTAuMTA3MjI5LC0xLjg0MTY4ZS0xOCwwLjI0NzYzNSwzMTMuNTA5LDM3MC4zMTYpIj48ZWxsaXBzZSBjeD0iMTU2Ni4zMSIgY3k9IjEzNzIuMyIgcng9IjQiIHJ5PSIzLjQ2NCIgc3R5bGU9ImZpbGw6IHJnYig2NCwgMTI4LCAyNTUpOyI+PC9lbGxpcHNlPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjE4NTcyNiwtMC4xMDcyMjksLTEuODQxNjhlLTE4LDAuMjQ3NjM1LDMxNi41MTIsMzY4LjU4MikiPjxlbGxpcHNlIGN4PSIxNTY2LjMxIiBjeT0iMTM3Mi4zIiByeD0iNCIgcnk9IjMuNDY0IiBzdHlsZT0iZmlsbDogcmdiKDY0LCAxMjgsIDI1NSk7Ij48L2VsbGlwc2U+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMTg1NzI2LC0wLjEwNzIyOSwtMS44NDE2OGUtMTgsMC4yNDc2MzUsMzE5LjUxNCwzNjYuODQ5KSI+PGVsbGlwc2UgY3g9IjE1NjYuMzEiIGN5PSIxMzcyLjMiIHJ4PSI0IiByeT0iMy40NjQiIHN0eWxlPSJmaWxsOiByZ2IoNjQsIDEyOCwgMjU1KTsiPjwvZWxsaXBzZT48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNjU0NDIsLTAuMjEwOTg4LDAuNDIxOTc2LDAuMjQzNjI4LDI4LjcyNTksMTg1LjQ1KSI+PGNsaXBQYXRoIGlkPSJfY2xpcDkiPjxwYXRoIGQ9Ik04NC4yOTksMTI2OS4zOEM4NC4yOTksMTI2MS45OSA3OC4zMDEsMTI1NiA3MC45MTMsMTI1NkwtNTYuODc0LDEyNTZDLTY0LjI2MSwxMjU2IC03MC4yNTksMTI2MS45OSAtNzAuMjU5LDEyNjkuMzhMLTcwLjI1OSwxMzc2LjQ2Qy03MC4yNTksMTM4My44NSAtNjQuMjYxLDEzODkuODUgLTU2Ljg3NCwxMzg5Ljg1TDcwLjkxMywxMzg5Ljg1Qzc4LjMwMSwxMzg5Ljg1IDg0LjI5OSwxMzgzLjg1IDg0LjI5OSwxMzc2LjQ2TDg0LjI5OSwxMjY5LjM4WiI+PC9wYXRoPjwvY2xpcFBhdGg+PGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwOSkiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMzY4MjEsMS4xODQ5LC0yLjM2OTgxLDIuMDUyMzEsNS40NjkyOSwxMDcxLjkzKSI+PHVzZSBocmVmPSIjX0ltYWdlMTAiIHg9IjUzLjE1MSIgeT0iMzAuMTQiIHdpZHRoPSIxMDYuODI1cHgiIGhlaWdodD0iNjEuNjc2cHgiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk4MzY3LDAsMCwwLjk5NDc2OCwwLDApIj48L3VzZT48L2c+PC9nPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM2NTQ0MiwtMC4yMTA5ODgsMC40MjE5NzYsMC4yNDM2MjgsMjguNzI1OSwxODMuNzI5KSI+PHBhdGggZD0iTTg0LjI5OSwxMjY5LjM4Qzg0LjI5OSwxMjYxLjk5IDc4LjMwMSwxMjU2IDcwLjkxMywxMjU2TC01Ni44NzQsMTI1NkMtNjQuMjYxLDEyNTYgLTcwLjI1OSwxMjYxLjk5IC03MC4yNTksMTI2OS4zOEwtNzAuMjU5LDEzNzYuNDZDLTcwLjI1OSwxMzgzLjg1IC02NC4yNjEsMTM4OS44NSAtNTYuODc0LDEzODkuODVMNzAuOTEzLDEzODkuODVDNzguMzAxLDEzODkuODUgODQuMjk5LDEzODMuODUgODQuMjk5LDEzNzYuNDZMODQuMjk5LDEyNjkuMzhaIiBzdHlsZT0iZmlsbDogdXJsKCZxdW90OyNfTGluZWFyMTEmcXVvdDspOyI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjQwNzYyMiwwLDAsMC40MDc2MjIsNDcuMzgsMjc4KSI+PGNsaXBQYXRoIGlkPSJfY2xpcDEyIj48cGF0aCBkPSJNMTQ2MS4wNyw1NTQuMzE3QzE0NjEuMDcsNTU2Ljc0NyAxNDU5LjYsNTU5LjA2NyAxNDU2LjYsNTYwLjhMMTM0Mi4wNCw2MjYuOTQzQzEzMzUuNDEsNjMwLjc2NyAxMzIzLjgzLDYzMC4yODcgMTMxNi4xOCw2MjUuODcxTDEyMDUuMzMsNTYxLjg3MUMxMjAxLjE0LDU1OS40NTYgMTE5OSw1NTYuMzYxIDExOTksNTUzLjQyNkwxMTk5LDU1OS41NTVDMTE5OSw1NjIuNDg5IDEyMDEuMTQsNTY1LjU4NSAxMjA1LjMzLDU2OEwxMzE2LjE4LDYzMkMxMzIzLjgzLDYzNi40MTUgMTMzNS40MSw2MzYuODk2IDEzNDIuMDQsNjMzLjA3MkwxNDU2LjYsNTY2LjkyOEMxNDU5LjYsNTY1LjE5NiAxNDYxLjA3LDU2Mi44NzYgMTQ2MS4wNyw1NjAuNDQ1TDE0NjEuMDcsNTU0LjMxN1oiPjwvcGF0aD48L2NsaXBQYXRoPjxnIGNsaXAtcGF0aD0idXJsKCNfY2xpcDEyKSI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMi40NTMyNSwtMCwtMCwyLjQ1MzI1LDEwNjguODIsNDEwLjc5MykiPjx1c2UgaHJlZj0iI19JbWFnZTEzIiB4PSI1My4xNTEiIHk9IjU4Ljk3OCIgd2lkdGg9IjEwNi44MjVweCIgaGVpZ2h0PSIzMy41MTdweCIgdHJhbnNmb3JtPSJtYXRyaXgoMC45OTgzNjcsMCwwLDAuOTg1ODA4LDAsMCkiPjwvdXNlPjwvZz48L2c+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMzcxNDUyLC0wLjIxNDQ1OCwyLjM4MDk2ZS0xNywwLjQ5NTI2OSwtMTkuMzY3NywyNDguMjU2KSI+PGNsaXBQYXRoIGlkPSJfY2xpcDE0Ij48cGF0aCBkPSJNMTc3Ni4xNCwxMzI2QzE3NzYuMTQsMTMyMS4xOSAxNzcyLjIzLDEzMTcuMjggMTc2Ny40MiwxMzE3LjI4TDE2ODQuMTksMTMxNy4yOEMxNjc5LjM4LDEzMTcuMjggMTY3NS40NywxMzIxLjE5IDE2NzUuNDcsMTMyNkwxNjc1LjQ3LDEzOTUuNzVDMTY3NS40NywxNDAwLjU2IDE2NzkuMzgsMTQwNC40NiAxNjg0LjE5LDE0MDQuNDZMMTc2Ny40MiwxNDA0LjQ2QzE3NzIuMjMsMTQwNC40NiAxNzc2LjE0LDE0MDAuNTYgMTc3Ni4xNCwxMzk1Ljc1TDE3NzYuMTQsMTMyNloiPjwvcGF0aD48L2NsaXBQYXRoPjxnIGNsaXAtcGF0aD0idXJsKCNfY2xpcDE0KSI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMi42OTIxNCwxLjE2NTczLC0xLjI5NDIyZS0xNiwyLjAxOTEsMTM1Mi41OSw5ODMuODQxKSI+PHVzZSBocmVmPSIjX0ltYWdlMTUiIHg9IjEyMS44ODIiIHk9Ijc2LjAzNCIgd2lkdGg9IjM3LjM5M3B4IiBoZWlnaHQ9IjYxLjgwM3B4IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk4NDAyMSwwLDAsMC45OTY4MjUsMCwwKSI+PC91c2U+PC9nPjwvZz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNzE0NTIsLTAuMjE0NDU4LDIuMzgwOTZlLTE3LDAuNDk1MjY5LC0xNS4wNzg2LDI0OS45NzIpIj48cGF0aCBkPSJNMTc3Ni4xNCwxMzI2QzE3NzYuMTQsMTMyMS4xOSAxNzcyLjIzLDEzMTcuMjggMTc2Ny40MiwxMzE3LjI4TDE2ODQuMTksMTMxNy4yOEMxNjc5LjM4LDEzMTcuMjggMTY3NS40NywxMzIxLjE5IDE2NzUuNDcsMTMyNkwxNjc1LjQ3LDEzOTUuNzVDMTY3NS40NywxNDAwLjU2IDE2NzkuMzgsMTQwNC40NiAxNjg0LjE5LDE0MDQuNDZMMTc2Ny40MiwxNDA0LjQ2QzE3NzIuMjMsMTQwNC40NiAxNzc2LjE0LDE0MDAuNTYgMTc3Ni4xNCwxMzk1Ljc1TDE3NzYuMTQsMTMyNloiIHN0eWxlPSJmaWxsOiB3aGl0ZTsgc3RvcC1vcGFjaXR5OiAwLjk7Ij48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMjIwMTk5LC0wLjEyNzEzMiwxLjQxMTQ1ZS0xNywwLjI5MzU5OSwzMzkuNzA4LDMyNy41MykiPjxwYXRoIGQ9Ik0xMzA2LjUsMTI4Ni43M0MxMzA3LjA5LDEyODUuNzIgMTMwOC42LDEyODUuNDggMTMxMC4zNiwxMjg2LjEyQzEzMTIuMTMsMTI4Ni43NiAxMzEzLjg0LDEyODguMTYgMTMxNC43MywxMjg5LjdDMTMyNi40NCwxMzA5Ljk4IDEzNTUuNCwxMzYwLjE1IDEzNjMuNzMsMTM3NC41N0MxMzY0LjMzLDEzNzUuNjEgMTM2NC40OSwxMzc2LjYxIDEzNjQuMTgsMTM3Ny4zNUMxMzYzLjg3LDEzNzguMDkgMTM2My4xMSwxMzc4LjUgMTM2Mi4wNywxMzc4LjVDMTM0Ni40MSwxMzc4LjUgMTI4OC4xNywxMzc4LjUgMTI2NC4wNywxMzc4LjVDMTI2Mi40MiwxMzc4LjUgMTI2MC4zNywxMzc3LjQ4IDEyNTguOSwxMzc1Ljk0QzEyNTcuNDQsMTM3NC40MSAxMjU2Ljg4LDEzNzIuNjcgMTI1Ny41LDEzNzEuNkMxMjY4LjEsMTM1My4yNSAxMjk2LjgsMTMwMy41MyAxMzA2LjUsMTI4Ni43M1oiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4yNTQyNjQsLTAuMTQ2OCwxLjIyMjM1ZS0xNywwLjI1NDI2NCwzMjkuNTcsMzY0LjE0NCkiPjx0ZXh0IHg9IjExNzAuODhweCIgeT0iMTQ1MS40MnB4IiBzdHlsZT0iZm9udC1mYW1pbHk6IE51bml0b1NhbnMtQm9sZCwgJnF1b3Q7TnVuaXRvIFNhbnMmcXVvdDs7IGZvbnQtd2VpZ2h0OiA3MDA7IGZvbnQtc2l6ZTogNDEuNTY5cHg7IGZpbGw6IHdoaXRlOyBmaWxsLW9wYWNpdHk6IDAuOTsiPiE8L3RleHQ+PC9nPjwvZz48L2c+PGRlZnM+PGltYWdlIGlkPSJfSW1hZ2UyIiB3aWR0aD0iMTEzcHgiIGhlaWdodD0iNDdweCIgaHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFIRUFBQUF2Q0FZQUFBRFUraVZYQUFBQUNYQklXWE1BQUE3RUFBQU94QUdWS3c0YkFBQUJWVWxFUVZSNG5PMmFRUktDTUF4RnhVTjRPKzkvRE53NENvaVRsaVpOOHZQZlFsbTAweWt2UDNhUTVmRmMxMXNqeS9MKy9ueDhyM2ZmbTdGbjg0NWp6K2FKYTIzWE9KdmZzOVpoN05CYXd2M1lyU0d0ZGJqK3gxMGVna0Z6cFJyTnQrU1N4TWdicWtpWkpDSkRpUURvU21TZmRZRkozSkQxOEdNbWNYaERUSFV6TlpJSVhoQTFKSUpEaWIwTXB0cWlLYmhLekhxUWlBYVQ2SWxTRlZJaUFKUUlBQ1VHcExmTGhwZkl3NDlNbDhUMnY0L0pUUHlTeUlKUUkzdzdKVElZRXAyZm9uZzNGWFdKM2h1cUNFWVNOVWxZaFpSb3lhU0NvRVFBS0hFU2xxRjBrWmo5TkJnTkpoRUFTZ1NBRWdOeDlXZkNUbUx4cHlnellSSUJtQ09Sc1RJbFh4SlpFRC9razBoK0tDMXg5RTJGS0c4NnFFa01zaDgvSEc5QTZTU0dZcUFJS0RFaW5VSXBVU0REWVhpcXhBdzNKQ05NSWdEWEpUSVdZZEJKSXZ1a0syeW5BUml0NFhBU1VaNml6Q1NjUkZXS0NIMEJmTE04NG9UdzFaOEFBQUFBU1VWT1JLNUNZSUk9Ij48L2ltYWdlPjxpbWFnZSBpZD0iX0ltYWdlNCIgd2lkdGg9IjExM3B4IiBoZWlnaHQ9IjY1cHgiIGhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSEVBQUFCQkNBWUFBQURtQkV0OUFBQUFDWEJJV1hNQUFBN0VBQUFPeEFHVkt3NGJBQUFTZUVsRVFWUjRuTjJkNlpiY05wS0ZMNWNzOVVOMVc1Ym50V3hyNlhtc1dUekxRN21TSkRBL2doL2lBcFd5TGFsVXkrQWNueXBWSmtFQXNkMjRFYVFuL1Q4WWI5K1hLa25yT3VrNHBPTTR0Q3lMcGtrcXBXcFpKdTE3MFR6UEtxVm9XV1pKVXEzU2J4K202VmtYL3dqalZXL2dINy9zZFo1blRhY2M1bGtxSlQ2cnRXcWFKdFZhVlVyUk5FMjZYR2JkMys5YWxrVzFWaTNMckZLcS91dmovS3JQNGRVdS90M0hXa3VwbXVlcFdWc3BJY2pyZGRjOHoxcVdXY2RSVHVzTHdjM3ozQ3oxT0E1ZExvdU9vK280RHYzdnYxNWU1WG04dWtYLy9lZXRUdE9rZFYyMGJXRlZrclFzaytaWk9vNzRYcTNTTk1WUHFYZXh0WWFsMWxxMXJyTnFsZmI5MExyR1hQLzUvblc1MkZlejJCOC8xRnBQaVN4TExMc1VhVjJsZlpkS2laaUhrSEN0dUZXUGovNzNjdnBmTERRc2VOSnh2QjQzKytJWCtjT3ZSNVdrWlFrQmJkc2g0dUN5U050V1dreEV1TFZLeDFIT3VMZWNGamRwMy9ObldpWUtVYlN1QVhpT0l3UjhISWYrNTUvcml6K2pGNzNBbno3VldrcTRSU2tFSSttMEZ1bitmdGZsc3JhL3IrdXNmWS9mQVRWWTNEelAycmF0Q2UzTm03VWhXYXd2M0t6TzY5UHRsbEpldERCZjVNSisraFJIV1d1NFFDa09tMWg0SEgyYWdKdVZwSG1lMnVmSFVYUzV6THBlUTFCOE5zOXp1MlpkVTNnQUpkd3hGaDN6eGpVdjBjVytxQVg5K0tGV2hNVi9Vcmc2a0NVV2N4enBSdmxzbW5vM2Vod0JWaERLY1dSTVpRNnVRNEQ3SHNnSTFNcmNESVQva29UNUloYUMyOFQxN2Z1dWRWMGJXQW1oVEowUXBONTZ0aTFjcTRNWFNSMXdpV3Y2K0NoSjEydWtHcEphdW5HNXJKcG5hZDlybStOeVdWUktncWlYUWhROCt5STg3cEVpY0RRSVJBcEFnM1VTNjBndlBQWWhiQmNlcVlUSDE3REVvOFZMU1ZxV1RGR21LZEtPWlZtMExES2xxSWFFUStHZU83OTh0cHUvZlYvcVBFK25Dd3dMaXdOVmkxRmhDYVVKSUZ4YnVyeTd1eEFpd3JsZWQwazZEejZGNzhKMkZnY0JrMnFzNjZKOVQvUXJwUnQyTW9IN1JYNlpYdU8vUHkzUGNwNVBmdE1mZmowcWRCZUhGNEFsWEp3VTRFVFNHYXZVTVNzQUQxQWxxWURIdnV0MVA2MXk2UVJQTWcvZzJiYlN1ZG5KdkNOQ2dtc0ZRS0VFOFoycCsxeDZIaTcyU1cvNDdtUGs2L3UrdHh3TmE0dmZwdzRoWWkzTG9rN0FIQmlIQ2ZqQXJUcjZaRTRTZnIrVythVkFxUWdWcFVDSkpCUXExa2FzN0ZGeEFxVExaZEsvL2Z4MHdueVNHLzNMUDJzbDF1RUtVNHVYOXIxU2l1N3VsaVl3aEh3Y3RSMHkxem16NGd3TzgwZ3AzT000ZEhlM05xSUF5M1IzNmtqWDR5dlZqMzFQNE9SMEhZSmx1UFZPay9RZnYzNS9ZWDdYRy96NElWU1ZROGQxMWxwMXVjeWRzTnhsTHN1a2JRdGg0ekxuV1E4c0E4NXpXWlltN0xDaWlGRXA3SjZPNDc3ck91bDZUVTVWVXBkSGpnSm1MNFFES2lHeHptU1AzT3FKOGQrVGovMHVFLy93NjFFQkk1N2pTV2xkVWsraHhXYzlPUjFXays0V1lXTk5hRDJqbE5Lc3hkTU9FblpKN2RDM2JUY0ZtWnBRU2ltTnpYSGw4MW9rN3RuZHZBT2xXOEtYdmw5dStlaVRBbHlvSW96dUI0RGhyQXQvdzZxa2RMM2tiMUp5bWxpMHh6U0gvVmkxNTNRY0xxbUpYMHQ2YzcwZXJUcXlydXNmS2hQRWdnT2ptR3ZxQU5BSXhOWjEwci8vOHJoVytXaVRrVEk0aUNEdU9HQVorVThvc1hXZGRIKy90d01uNWlFSWVGRXN3YXNSa3JvaXI0OWw0Y0RWaE0vQmNzaGM0NEx3Q2tjS1pENnRmVzc1SkhONmpSSmxRbmxkK056ek9CNHZKZm5tU2Q1OXJIV01Ud0VrRmgzSGVEQnhEVmFJd0IxSmpseG9maFpDajBwRzdiUTk1MDhySUgrYkpxNkpVL2VhWXN5YmFjemQzZEpWUlhDWnBhalZMaEVNdWEyajVWdWVJZVp4QXFOWG5scnJOd3Z6cXkvKzZWUDFzKzZTZG5wZC9MQVl4SjFsV2JUdisybXBjOGVrZU96NVhKSU5rUEVrbmJTQUJOL2RJZkZybmlkZHI5dVptNjV0UHVkc0dTNGdMeXF6WDlaVFNnSXE5aWlwb1dmUUt5R20xcXlEeG4yK0RjVisxWVUvZmFxVnhiRVpMOEl5M0FVUlYwWjJCZ2p2OGFQVzJpeUpnYkRjZWprNFlpQ1Fud0VINmdwR3V1SHhrblY1R0FBcGUrcmhqQklNMFpzMzYyZEpBd1RNMnVOek5XQW5QUVJ0WDFQeStxSUxFSjRrWFM2VGZ2ODlFUjZEMklUTGpFUHBTV2ppQ0w4RFh2aGV6ck8wZUlodUpJTE5RNklxVVVxUzJsSkFmaWtRS1dpMDF0cTVlbkpCWEtRbi9TaUs1N0xPM1hydkR2ZHhaZ2ZTQUMreGJYdmphdDNLMmErZnlaZTQyTC8wUmZJOTRzTytIMTFTN3B0endERkNiUWNLSHVUVGl0VlpoUitnL3gxM3UrL0hHYVBXSnRCdWN3Wk9HTlFYbWRkamw5Y1lyOWZqaklselE2RW9sTzl2aklITTRZbzY1bzYrTDFDdUs3NmoyYitTbHZ6aEY5NTlyQldFeVNZOXIvSVdCeGVhcEpzeGdzOWdQOXk2Y0hsajk5cSs5endvdzh0UnpJRnI0bDRqcUhKa1BPYUF6T0Z6T25qeTN6M1padzczSEp3UlFNL1BaWnpMejVid2RIKy82ZTd1Y2lyRG54ZWlQL3NocVBONjNVMXJNbzVKNm5JL1lnaWFEOUliVWFoWDE5bXdJMWRIcCs2U1J2RGdCeklXYmFIdkl1N1ZCNGRJSEN3bHkwOWVzOFRGNDZKWkg2QUpsNGkxOEgyS3lNdVM4M3RicFN2WHVrNG5LczcweWJHQm53V2U0WFB4OHNFZi8vN3pWdGQxN1lBS05KZ2pQclNOU2pxQ3k1YkJqQm14K0Z5VUM1SXhnaHlQTTF3NzVuTUl4RjB2NnlWbWpxelFtSlQ3WWFLWVlkVUp0Q1ExWmFLandOTVBaNGlnK2R3bHh2Nm1kaTJDSm0wWnZZYWZuWWNnMWpOV1N0by8zcjR2OVpabXMvSFJsVGpLUTBnZ01RY0NYaFBjdGl3Wk9icjArN2lDOEQwbnBFSENnQnVHdTBmKy9lYk4yb1RoMVpGUWpoQVV3dkJpTU1yaUIra3BUd2kxejFQOSsrd0YwT1NBQjRIZ2dwa0R6K1dLRkY2dVYyejNmbGptNUlnVE0wWmpScVEydWtLUERTek8zYWE3b3JIaHlHT05JOEZzUjh3RDhQcmZ1czVkaC9kb25YNFBEall0WitxOGl4ZWNIVWw2bC9qSWY4TFljT0MzM0RudTJsT1FFRUFxc0tQeW1QY2hObkRCai8yeURud21tbks5aDJXRXpMaFdoaWZjbnZEaW1tNUI1eEgwZUZ3WkVhaC9sdzJ3TWRyeXVYNnNNS1RWQm5ybDg3RTdvRloxdWFnREhQWklEdXpDMi9lb0YrNTczNjh6NXBQVVRER01VYUhoamRuUFNOWGhhY2J2TzRCckJvTldRRXRoVVE3TlhTTkNjSEhRWVNueHR6amdaRnhHN2VVKzZTNW4wODU2V21KZmFPWGFjS0hUZWYvWldKNEVSQjRCWXYweE40SUo5NmZ1NENDNVkvMjk5VzdiM3BSeDMzY2R4OUdVd0tzenBGbnBWUUw4WlFwVFQ0WElMdlRMSld1UnRWWmRMdXZwY1k0R2NoQWczd25zUWRmN2ZMSmlaN251Y29sZVR2cFZpRWZSYkx1cmxLSjlQMFI5empjUTJsNVBUY3hEcElnYUxqYy9RRnZScWxMS3FXVzkwZ1NZNmFzQmJOb0o1L1FZY2QzbE1uZVFuWU5JSUFRaGprTG9UQVZLMjErZVFXckY1YkkyeU85clpCOEJwTnhUOEd3SVRFeHQza3VLcG1jUEpmdCtuQ0VqOFFIbk9VMlRMcGVsVTdKUWRoUjYwZ3pIU1dDUHc0a3ZSTnNlNkNwYjU4Tk5oTi8zK01YTnA0bG1wZms4dUl4emppeXpXaUN0NjNKdVBPTmNCUGpwVkNTYW9KaHJPUStvdFBnVXJqM2RaK3lubkdXcDBsa1RRTXNibzZLYWtsWUZtWUJGdVhzT29LUzIvclQrdVNsNzRBZThTUWh5bmpQbkRZdXNad3BWVG1GbVRKWENDNFQ3ekhYRmQwdTc1NHp2OWFRNmhKRGF3RTFpMG5yR3ROSE56cDNHeDNkRE13SktUNmVicUoyV3BTc3RMYjVTUGtMWWNiaHJzNjZNYTdXN3Axc2RHNSttcWVWMmQzZjVlRnNwMFVjS3A1bnhXdWY5bG5iWVhqQ3V0YmJRd3o3ZEszQzR0Lzd0cUJkd2xMaGo3bGdrVWhlVWkvUmxYUk1MdE5Ea1F1RFEyRXdlakU2VHhoMEd5cnBlOXhZajBNcnJkV3RhRkRlU0tjYmNEckJQdnAyUDdCWEJsUVByZ3RsWTE2bnJZTnUyb3gyMksxRWs3clY1bTVoRDV1WkF4dWxtTTE2bE43aGNMbHBYZDltSmF2RWFyQmUzN2ZHYkdPYXNVbi9teDJtcGtQSkhNNkRvV0NnTmFIRVBTWm94U1FJcnByOHNLY1RRam9jVmdpQUZLUE1FeVBuYjN5N05iWGljaVU3cWtUbEpJVFQvUG1NNVNUYVFOem40T282cWJTdGR5b09nMlhnU0VyV3pPRCtNekhPbk0vYlhibjJ3T2w0dUMxRFVLN1M3UEkvNS9NVEw4Vy9pSXZkR3dibEgvN1NYdDNoU2dNamNjLzd0d3pRRnNLaG5IT3U3enh3czNtSVd2TS9rT05SQVRnaHk3amJNNFhCQWFETmF6Ky9FeFFRMnZhdjBEak1zNys1dWJSWmZTdFdiTit0cEZSbVR3aFZ1NTZHR0pVZllBTnBIUVRzOVREMWpZVzNNRVQydHJDTnFvbENFRVhlM2JYOFEyM3dzeTNLUzl0TloyY2hxVElDc3VCOE1rYk5FZWZZNlVmQ1VqQTA5b2VSK1RqUEJSRGhNSmoveVpIZXNRTGp2SHZuRHlIY09jeis1MjVIS2czRGdRQkIyM0JOU3ZhZkZYUEhDaXZkV2UvVDBCQ0tCa0VETzV3ZnJNWjY5MGs3aUJMZnYyKy9ObmloM1pacVZ6VjZlUTJjYTFWT2Z5QVZscFlQdUFYZjZ3NjlIUlRET1NVSjFPVU9ESzRWSnlVQ2Z0VVFxRVJSbm5UejNwNDdDY3RPTjRJcG85L0JuSWp6UFEzbWMyK1dRNmQ5aEg1RGlISnozN1hESXNmNVVOaFRURlFZMzV1dUU0UXFGZWRnb3hWaFg2ZjQrRlM3ejJLUGpTc2RhTEdTRjlBZmM2VGhvK0IwdEttNlE3QTZqVHpONnJYUnF6VkdWTDlnWkRSVEJtNHdrRGUwY2JtMDlDT083enNad3lNNmxJaGozUU9NZW5UMXl4aWlzSTFNdFVENTBKSE82MTJCL3N6MDRSR2JnL1VDdTNHNmxueXRKZlZhSURJaHhLVXRQdm1rSEZINlF1TFZiTGZtT0VoR0NGMGJkLzJNSlkvdStXeXFiajgveUlGQXNuKzlXWVhwMGIyN05pUWJWWFIvSU5TeDcyNkwreHg1dzNhekxIL1J4NzhZOGJpQk8wM25ud0IvVkZQOVVpRkkrTjQvYisxd056QThBVjBUdXg4Szh5OHNKZENlVjRUMUhsd1Btd24wN0Yrb0N4STE3REIzTFFBeXZkWGE1MS9BMDFHamxkM2ZlLzlQM2xVYXVtVXFPMS9FK0crWkJ1TTZmRW8rbHY5WncvSmVFeUhqN3Z0U0U2S1c1dGxoWUR3aHdCKzVTdkdEc0tZczNYQVZLN0orN2NNRGk3aTBQMGQ5VGs0L0xjZjNZK3VDSUdxR1M4MUZaR0VFRThTbm5ESnh3ZjcrMVJOMlRlSSszZmFHZ1h6Zk0wUml5dnFSYi9JdUV5UEFuZS8wZ3ZHYm44WEFNMHFORmpNalNFYVdERmFnN05zM2ZZbzV3WVI1Zk9Eem9zaDZtWjU4c2UwaVhQM1ZLQUJkOHF5bHM3RkNnUW9NMzhhSXdydlh1YmhYUGpZVDFoaUF2bCtXcldoZS9Tb2lNZHg5cjNiYTlGWWNkc1BBVHEwTUxTVjA0U0VlQ29FOTN5eHlBSXp4SGpNc3k2WHBOQVFhQVdkcjNjWU5ZcWIvQUNFWHlaeldTZSsxZmxjS0FmUEJXakZ0OVNDUHdHb0dVZHlJZy9LOTlROGMzQ1ZGSzREUG1pdU56OHhSenFiR05EN2s0TU1GeXZKSEpFV0JlbCs0SlpjTGFvYXJJL1dMdXNXVWtyZEpEZ0lNZFZ5YkFqeU5wMGlMUXFndk0rMks1bnBxa00xZmYrcUROTnd1UndaTlFraU81MU9RUitJeUZVTStyK21maysyWW1iNWtZWFZtM01RTWl0eERvK0hRVmEvSmlyZWRtamg3OSszNWZxdlVva25jZTRHa2dTRW9wai9hcy82TUprZkgyZmFsdWhZQUY3NXFUK2tlNjZURHp4QnlYT0xwRDRxYm5wV1BxNHZrV3ZVRGpzeE9PSGhHdzl3OEZOVGJkdEdMZWZlTzRBS3Rqblc2aHhIdlcrdGlQaEQrNkVCa2dXYWZpME54TXFMTXhWMUp6Ty9uU3ZSRE1TR1V4M05XNXNCd1o4MjkzWTJNdnE2UGJzYktRQ0hsdXJORElFSTA1ck9lZlRsaVU4bjNlVFBYZGhDaXBQWFFEcVBFT3MvRmdzQjdpM21HTWdMZkNlNDZhYURJWmZZOXJudEx3YUp2MFVIbkdGQUloZUMrUVAzcm5ERTc4VktzTkVvT2RUcXoxKzc2UTRic0trZkhqaDN6OGpZUDJlSUY3OHU0emI4TjQ4MmJWL1gwKytDbGxZN0VUMHQ3ejZrMWJXQTZvT0w0VFB6Mm1wa3QveUJHN083L1ZzWGVMYlhxcUYvdzlpUkFadkNrNHF5TDlZVWs5SFVaTWNzQXdIaFlneUhOQ3JNVTVUcWwzZFFqTTA2SmI3N0Zoalo5N3hNNEpBcnpJTkQzdE8xT2ZWSWdNM3RudFZzV0lpa2MwSlhrSmEzeTJBKzMzdk0rdHlka2JLZDM1OVJybStybGNjcnlQczBrakl4UHI3YjJIcENkL0tkR3pDRkdLbENSTFRBOWZUdVNWaHMvMW5ZSW8vWkFkYVk2djlmTDZJRFZMWWg0MU8zSmNySW9PQjJJM2FRZ3gxSzk5aXRlZDNCclBKa1NHdjBrL1FVMVNYYUJJSndQR09PWXBSeUxUcWZzK3NkT2JnRDFsOFdxTDF5b2xkVXdRWGdIaFM4Ly94c1ZuRnlManh3KzEzbUpuL08xT2trNU85ZUdyb3V1TnVwMi8rTWdScVplYUhBenhYUVR0TDJ0QU9VaDduanJ1L2RHNDBRSHlQT08zRDlNRTZFR0FQVVVXTHZIMzM3Y21KQkpvcnd5RWkweHJUbGFJWnVWRE5DdGZyNGZvdDZFWEtCOVh5dzYrN0Z4THhYb3BBcFJla0NYNmVQZXhWdHpjK01aaFNjMUtuRWdBelVwWmIvU0hWcDNJZHZMWkxYUHNPaGdyTTQvQmMzNlA4ZUlXNUlQLzl3V1c1K1MzNTRoU3o2ejQrMjVJSjJCem1DdXVpWitBRm45eDRFaUt2NVFYMU40YUwzWmhQcUR3dk4vSDYzdkVOcWU2a2dickNYQUhPYmNxK2s1MDR3MWVvdlg1ZU5HTDgvR1BYNEtKQnBYaTRvaC9sTHJHZDd0UmRJVXN4N0w4OVNqRXYvRUZ1UzlkZUl4WHNVZ2Y4TEY5cDNhK28zVHNPM1VPazFlUVNMUVk1aXVscVhwSXo1OHlmT2w0Vll2MTRhd1BlWjBYcEVuRStZN0h3dXc0cnkzM2sxNmY4Qml2Y3RFKy9IOC81SUJrZkxtZnYyV2YzTklGL1pLQnk1K05WN3R3SDJPVlJQSkgxZnAzdnNHMElNVG5ldm42WTQ3L0F4WDFLNVhTZjIzN0FBQUFBRWxGVGtTdVFtQ0MiPjwvaW1hZ2U+PGltYWdlIGlkPSJfSW1hZ2U3IiB3aWR0aD0iMTEzcHgiIGhlaWdodD0iNjVweCIgaHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFIRUFBQUJCQ0FZQUFBRG1CRXQ5QUFBQUNYQklXWE1BQUE3RUFBQU94QUdWS3c0YkFBQU1ya2xFUVZSNG5PVmRXMkxiTmhBY1VENVhrbDRzY1hxeHByMFhpWDdBUXd3R3U3UmoyUkxWN284bGtuanRjM1lCeWdYL0FmcjJYT3UyYlFDQVpWa0FBTFZXbEZKUUNsQXI5bXZMVXJCdDdSNEEvSHArK2ZEQTlOQUwrUHBqcXdCUVNrRjlrVlFrT0JJRngydkxVbERyNHd2eVlTZi83YmxKZ2hhbmdsRkxjOXEyRFpmTGduWGRkcXZsOVgvK3ZEd2tQeDV1MGw5L2JGV3RUZitxOEhpZHd0MjJEYVdVWFlDdGozSDViUE5vbHZrd2syWGMwNWhIY2plcDF5azhGeTR0a3NTbWZINVpDdjc2OFJqQ1BQMGszVzN5c3hLRnRTd0xhcTB2QUdZWlhDMnZ0ZWZIbUtuOUxrdjdUS3QrQktzODlRVC8rRm5ydG5WRUNZd2dodVJ1a2ZjcE9MMU40Zmd6clovdW1nSHNidmZzVm5uS2lYMzV2bFlGSFVwTUpRQU13TVF0cXBTQ2RWM3g5SFRCdWpiWFNVVUFabVZRYTg3NkE4NFpMMDgxb1MvZjErcUFRd0dMdXN4K3Z6L3JTTlV0Yms1Rlp2Y2NwU3VPZG11dCtQdm5jaHJlbldJaWRKdkFLSlJJYVBwWlk2QitaLzZuQWxCcmlzampwNEtlektXZlJaQjNuOFFmUDJ0bEt1QldBSFMwU01acU9GU0F3dStSMVFBOXNWZGh1cEE1cmlOYXBValk5NDZYZHh2ODIzT3RIbmZJRkdwK2x2K3BaU2lhWkgvZTFnVklsbXNlQ1hSQmsxU0JGTzI2aTZmQTd4VXZiejRvUzJVQUJvYXVhNjk5WmpGSzI1Q0ovTnphanVrQmdNbU5lcnpVTnV5RDFSdzJVNlhSL2loQXpodTREL0M1NllETStRQU1ETXFTY3JVaVlNemppRGpWbWpUMmFUTHZsaHRaTGVPdkk5UnVmV1d5UkNVdDk5MDZYdDVrSUZwZjV1YVVLYXJsUjBqVXkycCtYMk5oNjIrMmJpM2ZhYXh6MUpvQkluZjFuci9XV205U2ovM1VBYjcrMktySG82aEM0Z0owa0FPTXdNU2YwUnd3U2d1OGlzTnJEcFNVMUtJVkJZOXpYK1J6OXhBYVAzbi9NeTN6VXpyV09xZGJoTHBHUHFNdUZNaGprR3U4cHhaUkt1RTVIMGxqWUZhQzB6NjBiOFpOdXRsbEFiYXRDMVBkY3h1clBmdFpndnp3VG5XREZ1aEpkU2x6SEZPb3p1ZEdzSEJzeGVNWWM1eGlIeG02amR5eDExbVZvakhWa3QyemFKLzYrYU9GK1dHZGZmbSs3aHUwenJCOXNDQzJVTGlSTlVVRjZmYTVsOUgwR2pDWDRuUnNGOUJSUHNqMmtWQzhmeW9meDg4S0M1L2xZcS91aFB0N3puaTZGRm9ldFphQ2pRVTJva1BnV0JCcXRYcmZYYmN6bVAycW16N2E1b3FBVndSNk1rdjFaejNlWHB1V3ZMdXg3akJ3b2c3Ykl5S1ROYWJvRWpRKzdaTVVsK1JRbnZkVllUS0U2UzQ4QWlENkxPZXB3TW1WVGZzNlFzdytQMS9YTlZiNXJvYWE3d0ZqeklxQWdsb0hpZGFvUnlVaVZPcnV6OU1PSUU0WnBvVmFwY2ZiZW45T0RwQXlDOU0rZGMxVVdtQ3VER25iOXdqenR4cW82NXdYTnFjTlVWRFhlQm1kYzRrV3FzS0xRQkw3OHpJY3g2VTcxYU1aZmE2eFc4NnVPZUtPYXJVNlIzZlo2bjJ5M0JqNHZjclBteDc4OWx5cng3UXNIOU9GWEM0RjZ4cW5HQkhvMGFxSkNpaHpwYStoVjMzT0VXcGsvWkdGa0pXZWgwWVZJOTUzWlNVK1VJR3l6ZVZTUUREdkhnRjRtMlVlUHNBaU5SbW9OVVhYOU5jT0lEa1R5SmhzMFI3ODIvUHhaekxBdFozWE5ZWHhlS2hNelJpdmZiVzFYbEtYLzFvYWtuM1hzVnl4WHRzbFNXK3E2MVFOamF5djFvcW5wK1ZsTW5HVnhSbm53RUtGUUFhb2NGUXg5QmtIUFdTSVYxT3lmVVVmYjJLUWVSblBMMTN3SkhXcmtlZHlaWTNhdVNmS3JISzZtSUVXN1l5VGQydHhiVmJ3MHZ1TDkvMUd4dlhQdEc1MTBXM3hzNlg0d3RYeWlKbzlUcm1sNmpvMXZxcUNhSHZPVmNkMUFXZGd6L0ZGQnU2Y1R4NHY5eTlSM0JzWk8ydVBDa00xWGwxdmh2d2kxNmo5NjdQS0tQMGN4VE1GRkM0azl1bXhsOHIybHZsbVRQYTRUWElCZXQrUkc0MTR3dmJxclZoY0w5eFoxMEhjdW82T08wUUQ4L01vaU5ucWRJS1o0cEI4QVk0cWw0VktOUTB6elUzWEdybGdqZGs2RjgwZHMzVnhIZDZ2dG8zRzhmeVRjNHgyZnRpbWxMWVJYZng5QmcvK1J4b1JBWU1JWVVYM0l4ZmRKejZmT0hQR3QrOFlpczlqU2pESG5BelJjajU2Y0RnNjg2TnppRUFMS1FOZExoUUtnODlvS1ZIdlIyNSsyQlBWQ1hFQ092a3VWR1d5bDdmbVpGN2pVQ2xqZk5CMm5lbThQMjc3YUl6aHVHMEJkSjBhZzBibTZQRUtsUVg3ZE5SNnVTd1RDR0xiN2dFVTBJMHhNRkpRem9IdDEzWGIxNkJFZEU4WjFOcFBPeWlQVzEva2JWT1VKeTYrTWFVTUd1YVcxanZFM2hsSk5ZcHRJaGZaSjZDSWQwYUwvWGhFbWRxeTd5anVScmxubXorWlUzYW1LVkNKNXNPK2xabFJFU0ZDdmJ5dVN1SGdpWHprR04zdExudDdrdUlOOXpCUEZJcHFma3RrTDROQUk0VGxWUlhWRGs2U2NZQk1JWEVCYk10OVJVZDhydVZkYUdYb1Q0V3NhMUVOWjM2bkNrams3SXdaNC9XY3YrbDFwVkhaNjZSNGtadHVBdEt4eHVkVTRJN3FTeWxZZEhLOHA5cE5CdlJGamgzcmd0cGt1dHZSd1R0WUtuSlByYVlyUTNPRjgySTVSM1YxemxCM2IwMlJsbjFNanRVdFlpNHVjQTB6U2k3V2QvL2NoRDRLMEVPQ2x5TDdzeDJZcVdBN05obno0YTdrYmR5RkRTaDlqeE14N01ZdU1IZFpGQVFuTnJZcnU0QTRNUUJEK1NxRDhYcm9pZU1yYzNVam1zOXFmRlhMSndQNnVyY3BkdXY4S1ZpOTc2Nnh1Y01ZdUxrU2pDNjFEb3FyTVgvTXIwZkY3SXIyNGs1WkJ4eTFJL2J4Ym4xdUdSSGtCdWI5dWk2MExueCtWamZKL2hYV0t5UjNONmZJVFptcGNaOS8rd3N6ZmM5VGhjTTQxZVBRbk13cmVGSkJVWWswRFhJQmR0YzVzR3hZcDdyK3BsVHR1MjZQTGIrZVM5RmlzMXBlczZoWmMyZ0ZaRWhIcThzK0dMV1RXdE10YWF6QWFMOWtKRW1odmdaN1I2TTlQbGVKZjh1TGhWZTQ4aWxxMU8rY3F3cUJIcXFIbXJJcmp6SmRsZU55NmNybDYrYWNQWnk0QitTNnhubDJEekVBT0g3Z3l5d0tXcnp5b2Fpd0k3aDhPeVk2L3FCV00ycnRuSnZSZXJMakdHT3M3UW0wSDBUMlo5UmlJeXRSaXF6SHJVN2JSV2lYYmZuWFQrZHBIMTdBOEtPZDZnMzJpbzFQbW9WdkFGalgxVnhiWEFnWUFVcHZxMmhRNldoZkxYYzVNOUR4Y1NPWEZqR2FiZlc2Q2pVcWNHVHo4WFUzSVkzdTF3RVJrS2M0dm43MnJXTjZJWHhXdlJmU1FuZ1dyRldqZlRHK2FQWjJsRnRGV3NySjZ6anFMYlFVeFRGRzFEaW1HbXE5N2hLMUxSQUxWajJITXoxYXR5dW9rM284WFUrMHFaNXRGS2RDSk9tN0V6cVp5R3FVR2RHaUlnYXhqYnBNelMzVllsdGZuRWQzdFJxN0ZPRnFuT0h6eWxpdlpXWnp6Y0tCM3N1OGhjNVRRNHNhUU9RdTNXQ09kdnBmRlNMUUQwVmxLQ3NUaFBydnZ0anhKUnFQbWQ2bk15ZGlocmFMNG1Ba2tHeW5uVmJycmpENnEzT0xHRDh4KzZBdm55T2J2K1cxdVRjSmtjU2Qvc2pzbFpGUjNJcXErc3JRNkxpaW90cjJmWTR2Yy95TVQ3NXBtK2hzYUNrOXBYRGhaM0U1VStiSVV4M0ZQaSs4djJVM1grbTNoRWppOXBXNnVLT0pSeHBIeG1nODhBMWdYZkRSK1pvdWlEbnVhTHc4aXUwVFk0THJQamI3OEw1VU9UeHNSSHhRUHIzbkRPcTdoRWp5SHdhS0RqcEZzVEp6SlpHTDNDZGFlbzdGdzFmUk0xRktRV1VCeGtJQzczSHUwWTh6ZUV4cmZjUmJWVWN1TlZONEhldTloNGl2RWlMUVVhd0Roa0FPQUxSZ3NFenhUWjl4clNjejk0a2JrRkdBNDdzYjZnNUxhYitxMFN3OVBpN1p4eGp6UDY4a3FUVnlIdnhPUG1USFVMZ1BDbHovWXVyVlFpVHB1L2ZEQUFrUWNNYTZGa2NicTE1WFZRRkd4d2Q1M3dHSXgwdWRCeEFYRnp4ZG9ySmt6K2tjVk1CdDdlM3ZSNzNyLzJGQ0pQbTdHUmtnSUpHcHdKaEFxOUQ4dEozcWljZEhMYnBIcU5hRjZDQXQzaFFlODhrSVdQbjYxS1hyWHdBZi91THBod3VSNU8vbUF6RUlVZTF1MTdYd084WTF0MXJkUVBiK2RRd2x6dzBqaEptVkhDTkFsWUdrVE1DZjhVNy9wd2tSR0grWERSaHp0QWhnUk9oVEJhVUM4U3FOV2p6SHlnQlRsZ1k0WmVqVisxYVg2YWlUMXg3dVRXR242UFczaU1ta2pCRWVXekxrNnk3VHlXT2J1OVlvYnJaMkNFdDNmTjdqZmEyMytUV05td2lScEw5ZEUwSHdhT2RiR2VJQzZlNDRQMkxwVlNHM0lIZVBmaVNRbEJVQVZORFg1bnZ2cFpzS2tVUmhacFlGNUFYcEtOM2djeDZURkRrZUtVMEVsdmczZXVrR2lCV096OS82dDJ6dUlrUmdmRmtuUW9KUmhVYUw0d282bkRLQUVWV0F2QnpvbTlhUnE0OTJWSURyWGhTOWh1NG1SSkwrTEthREUxSUUrOXZ6ODRhenU5aElnQkhBaWdDT1dxZ0tqNitqOGRyLzlyZmRuSHpMaStRdWw5ZUFlY3RIRDNycGZiZjQzbWFPaTQ0MmdYNWtnNXZjRk9aWmZtVXgvbVhZTzVBeVJDM01YV1AwbWJMVUUzQktVV3JDZHMxaXgrT1BITGUzV1hDNVhOTDUzcHRPTXhFbExhejd5YlVzdWZhZEJZOS9mdTRtdWdaZ2Y3dlp4NlNRei9odkYwNDNJU1gvTWRzb3o5UVltQ1g4Zk1ZTDBoRXF6WExXTTFtZTAya25wdVJiWHNDOHRkTSt4N3ZtV21yclFoL1A3bWdNVkdVNEEzQjVqVTQ5T2FYWC9pOEd5M04raWl6S0ViUEtrVnZzbWExUDZTRW1xZVJWSDJVOEN3R2Evd0hqWHFHKytLUFdySG5pR2VQZUVUM1VaSlgwNVZoZ0xvdVIvSDUyNnV4V2RjN1BvSWVjdEJKL2E4QjM4NzJ5b3h2SHdIeHU1MUVGQ1B3SGhBak12L2dCek5VWUlQNWR1RWVKZTBmMEwrRDc0OUhyaEtlTEFBQUFBRWxGVGtTdVFtQ0MiPjwvaW1hZ2U+PGltYWdlIGlkPSJfSW1hZ2UxMCIgd2lkdGg9IjEwN3B4IiBoZWlnaHQ9IjYycHgiIGhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBR3NBQUFBK0NBWUFBQUFzL09WSUFBQUFDWEJJV1hNQUFBN0VBQUFPeEFHVkt3NGJBQUFnQUVsRVFWUjRuTjJkV2E4c2FYYVduNWpuek1qTVBaNVQxVjN0c3JHUitUTkl2akFnQyt5MnV3MjJiSU9OekIvZ0Jna0VBb3daSmJpQkN5UitDemRJSUhEWDBHZnZzNGZNakhtTytMaFlFYkdycmFiZFF3Mm5DS2wwenRsRFJPUTNyUFd1OTMzWFZ4cGYwK3ZuLzBDcHBsRUFlSjdHODNNQlFCeUhtQ2FjenpWeDdHRVlNSTdRdGpBTUEvZi8xdEsreXZmK1dhNnY1WXQvNCs4b2xXVTVZUmdDWUpvYXd5QVRaeGdhcmd0VkJab0daVmxoV1JhbWFlSjVHbDBIUlZGeC9JL0IxKzZ6ZjYxZStKdS9vMVRYRFR3L1AzTjdlNE5oUU44cmJGdWphVVkwVFNNTWRVNm5oamgyR1Vmb2V6Qk4rYS9ySU05TExpOERIaDhMTnB1UWovK2w5clVaZzYvRmkxNytlcTAwVGFOcEdqYWJEWjZub2VzeUVZNGprMkJaVUJRS1RkUFFOSWdpeUhNWXg0bHBtbmgrZmlhS0lxNnZBejc5OU14bXN5RU1EYm9PbE9Kck1XbnY5QXUrK3M2Z0xNdmdlRHh6YzdQaitUbm40aUlDSUVscUxNdkNNQXhjVjJNWW9PdEdkRjBIb09zNk5odUg0N0hBTUF3OHowUFhJUXlocnVIeDhjd0hIK3pvKzJXaTRhTi84VzVQMkR2N2NxKy9PeXJMMGpGTkFRaGwyUklFRHRNRXd6RFJOQTJHWVdDYUpyWnRjRHdtN1BjeFZkWFFkUjM3L1lhMkhURk5nN2J0NkxxT2k0dVFwb0VnZ0dHUW5GWVVBNDVqenZjZGlXT0QvL0dQM3MxSmUrZGU2dWYvUUtra3FYRmRsekRVeUxLUi9kN2crYm1mSjBZankrVDdmZDhERUFRMkFJWWhJYkdxR2t6VHBDeEx0dHN0Y1N3VHJoU2s2WWpyR3VTNVRIWlpsbHhjeE9nNnVLNkV6amlXaWZ6di8vRGRtclIzNW1WdWY2dFhsbVV5VFlxcXF0aHVBd3hEQm0wWUJDQm9Hanc5Q1VSWFNySGJSVXlUL1A0d1RMaXVqcTVEV1k0WWhzSGJ0Mi81OE1NYkhoNEtYcjhPT1o4bmxGSk0wNFRuV1ZSVmg2N3I2THFPNyt1OGZac1F4ekdHQVVWUkV3VGVPNVhMM29rWCtjVS9WQ3BOZTdxdXczVmRiTnRnbW1RbkJBR2txWVNxNStjelYxZTdkVmVNNDBnUXVPdUVkVjJQNjFyMHZYekJzblNhUm5aa1ZWVm9ta2JYZFdpYXhtYXp3VERrNDQralFpbkZPSTY0cmtYWENiTFVkWjBnZ0tlbmR3UHFmNlV2OE9vN2d4ckhrZjNlSmswRkhCaUdobVZKMkhwNkVtQlIxeFBhdk1DVEpNR3lMRFJOSXdnQzZycG1IRWVVVW15M0VYWGRzdDg3VkJWNEhoVEZoT1BvMVBWQUZKbjBQZWk2M0I5a3h5b0ZlUzQ1c1cxSG1xYmgvZmNEMmxaMjgrTmp4ZTJ0VDVJb3Z2K24rbGMyWmwvSmczZS9saXNBd3pDNHVmRm1pSzB3VFkycWFobkhFZC8zc1N4QmJhN3JNazBUcjE0RlZKVU1jRjBMUE84NnVXZmZ5NzhmSDFzOHoxbWZWVld5QytQWW9tbWdyanRjMTBiWHdiYmgrYm5DOTMycXFzTHpQRFJOSTBrU3dqREV0azBzUys2dGFmSmYzeXQ4WCtOLy9aTXZQengrcVEvOHh0OVJDZ1IxV1paQlZUVzRyb3V1UTEyM2RGM0g5WFhFK2R4eWRlWFFkVEl4YVRwaFdmb0tBcEpFUU1mcE5MTGRTc2g4ZnE0WXh4SExzdGp2WGVwYVFtaWVLNkpJbzY1aEdHUkJMR2l3YVdReUhjZGhHQWEyVzR0cGV0bDFTVkxpdWk1WmxySGI3VkJLWVJnYW13MGNqeU4zLzhiOFVzZFAvN0llZFBHM0tyWGR3alFwMnJhbExHdkMwR1czZyswV3FxcWF3eGxvbXNieE9GQ1dFMzB2TlZQVDlIU2RvcTVoc3pFNEhnZUN3SmpCd0lScG1yeCtIWEZ4NFpJa0hZNGpmR0RYZFl5ajFGS0dJYlRVK1R6TzdNYkl4WVZMSEdzTXcwQ2VqK2k2VEZMZncvdnZCMnkzQm83akVFbDVSNVlWdkgzYlNINzdsVWUxL1J1cCtyTEc4QXRmR1gvcDd5azFqcEFrRldIb00wMENzUjFIY3NmalkwVVErS1JwTm9jZUhjT1FIVlVVaWpqV3FDcVlKaWw2bzhqQU5PR1RUeExlZXkrbWFhRHJKcnF1dy9OYzJyYkRjV3lLb3VUNk9rRFRJTXZrUGttaTJHdzBqc2R1RFh2N3ZVTlpRbEVVYkxjaGo0OUhYcjgrckNWQTI3WUVRWUJwbW96ak9JZFVlSHJxbWFZSnk3SUEyRzcxTDd3Kys4SnUva3QvcEZUZlExMlA5SDJQcnV2RXNZMVNNbEYzZHhXdlh2bGtHV3cyOHVHVlV2aStqV0hBOFNpRGwrY1ZqaU01S0F5TmxldXpySVZPR3BrbWdlUzJiV09helBCZEJ2UHlVbjczOFZGeWw2WnB1SzVKM3lzc1M4UDNoZlJkQ3VocFVuaWV4alJCVVhReisyR3NUTWVTdjJ5Ym1kM3ZzVzJac0dHUStQbEZoY2ZQUFF4ZWY3dFZ2L3pIU3RVMXBHbE5GQmxFa1F0SW5ralRqcktFL2Q3bi9yN0c4K0QrdnA0TFhwdGhnS29haWFLUVlWRG91bzZtYVd5M0JnQjEzVlBYaWs4K09kTzJMVW1Tc050WlRKTndnQXRwT3d3RFllalFOSEE2RFRQTXQrajducjVYcEdtSzV3bFFVVXJBaml3a1llYmJWaEZGTmszVG9KU0U3K014Wnh3bnVtN2cvdjVNVlVFVVdYUmRUeERBZG11UTV6bnYvMjMxaFlUR3ozV3lYbjkzVkk1ajA3WndPaVY0bmtkWktyS3NaciszQ1VQd2ZadHhoRHp2S1lxQzQ3SEI5ejBNUXhKL0ZNbEF4N0hjczY1cityN244YkVDSUF5dGVTSkN1azZLMnJLVXdmWjluYUlZYUJyd2ZZKytsL0RiZFIxUkZPQTRjSDN0c2RsSW5mWDAxT0Q3RXBZTlE1NDdETEtEaG1HZ2FSUys3M00rU3lFK0RBT2FwbkU0bURORFV0UDNjSHRyMFhXUUpBUHZ2eTlGOWVhdkorcUQzLzE4SisxejJhN1gzMjRWZ09NSTdYTTZuUUhRZFozTlpvTmxDWUw2M3ZkU1hyM2FVbFVTTW16Ym9HbDZxcXBpczlsZ21ocEprcS9FNjM2dmthYlFkVklVTjAwL2s3ZlFOQkphMjdZbERQMFZ0cHVtQ2NqQVdwWkZHT3FrYWM5bVl6RU16RVZ1ejI1blVaYlFOTzJhajJ6YlJpblpkWmVYOFZxVExYVmYwd3dZaHV4dzA5UndIQW1ocmlzNXRXMFZZYWlSSkJMU2xWSjRua1BUZER6OGUrZG5IdXVmNlFhN1g4dlY5WFdJWmNGSEh5VnpZYnJGZGZXVmZUaWYxWXpJUm5ZN243YVZBUUNKL2E0TGI5L21SRkZFWGRkNG5rZFZDZWpvdXA3OTNzS3k0SGhVNkxySUg2ZFR3cXRYTVZrMjRMb200d2hGVWM3UEQ5RTBaZ2d1ejdadEc4UFFxS3FHdnU4NUhDSzZEc3F5eERSTkhNZFowZU1DZkpvRytuN2c2c3JrNlVseWtZQU5INUNjbFNRMXRtMFRCQVp2MzBxeEhzY0JYU2Nsd2dJM1RGTnkzYy9LNnYvVXYzejU2N1dLWTNmbDRacW1JUWhjNnJyamNMRHBlM2g0U0xtOTNhNEY3TUlxWkptaUxFc3NTMEthNy9zem9Scnk5SlFUeDRLVHB3bnF1bGwzeTdJRDBqVGw5ZXM5YjkrbTJMYU5aVmwwWFVjWSt0UjF5L1cxZ0lxeWxIdWtxWVN4elNaa0hCWERNTkMyN1R5SkJwWmxjRG9sWEY3R2FKcnNFQW1KQTc3dkVZYnl6bjNmczlsSW1KOG0rYmZyMnV1N1NuNlRIUlZGUG1Fb0lHZ1loSUd4TEEzRGdQLzlUMys2U2Z1SmMxYjAxODdxbTcrajFPV2x5L2xjczlzSmxIWWNoeXdyVnoycDcyRy8zeklNOG50NUxuK2V6d054cktHVXdqUk40ampnY05CNDc3MFF6NE00anVZQkc1Z21OU05FazY3cjZQdWUzYzdBOS8wNXBBWFl0bzF0bS9QUFFSZzZISThqZVM3dlVOY2RudWNSeHlGOS84TDV0VzNMZG12VGRSMkdBUmNYTVZYVlV4UWR0aTFqK2VxVngvUHpjZjNzU2lrZUh6TUEwalJsdTdWcG1vN241eE9tQ1JjWExsSGtZWm9tZVY1eE9vMFlobkNVUlZIZysvSk9yNzR6cUp2ZjdIN2lmUFpqei9CN3Z6MHBwZFNjckYyVWt1M2ROUEloTkUyanFpb3VMbnpHVVZaYVdVck4wN1lkRnhmMmFsNFpSemdlRzRaaDRPWW01T0doSkF3RHhsRjR2RFI5Z2V0NW5yUGJDZG9vaXBLTGk0RHorUVdHVDlQRWRtdFRsaE5Cb0s5QzRrSVBDWklEM3hkQytIQXd1Yit2NWgxbEVRUTZTZExPU0hTWXc2S0VzSzU3dVVmYmRyTnR3TUp4NUJsbEtXSFE5NDA1Q2d6b3VvNXQ2M1RkUkJqS3dqVk51TDh2OFR5UHBtbldrc1Z4WlB3KytaTWZiNmY5aFR2cnc5OVg2aGYrcmxKWmxxRnBHcDdua3FZVlZkWHg5SlNUcGlrZ3VTZUtmRTZuQnR1V2lZb2ltNzRmbUthSnVvYUhoNDQ4WjRidUF1ZnJHcmJiWUthUkVzcFNhcHY5WHVxYnd5R21LRXBNRTN6ZnAybmtkN01zSTQ1TnRsdDdEck02eDJQRk9DNmM0VWhkOStpNlRQTGpZOGx1Wi9MeHh3a0FsbVdScHVtOCsrcDVVR1dINmpvOFBDU000MFJaMW96alJCaktMcFN3cXVqN2tjUEJteGVNTEVEUE0yZktDOEpRNS80K3BTd1ZhYXJZYkFLcVNoYmhRb1ZsV1UvWDlUODIxUCtSay9YNnU2TWFSNm1QdnZXdExib3VSU1NJNEhkekV4R0dJYWFwTVk0eVFJN2o4T21uQ1pxbUVVV3NWWDhVd2MyTnZTWnc0ZmxjdW02a2JVZjZuam5XMjdSdFM5Ky9jSFNPNDlBMEkwR2dNVTJLY1lUOWZyOE8wakFNZEIzWXRrM1hRWm9LRW5WZGk2WVp1YjJWY0ZtV3NOdkZYRjBKY2J2YjdhanJudXRyMmJtYmpZWmw2YlF0M043R0dJYk94WVhINGFCVGxpSzFUSlA4WEYzWEdJWThwK3RrOHBwbXhMWXR6dWVHdW9ZNDNoSUVrcXZPNTJ6KzJXN081eFZLS1c1dkxUUU5mdTczbEZwUTlmL3IrcUhiei9xcjkrckREMjhZQmtFOG1xWnhkZVZ5ZDFkd2NSRmkyN0s2aG1IQWNTek9ad0VTRHc5aUQzTWNEYVVrUHJ2dXdpaElRblljRzgrVHVpYkxGSzZya2VleUM3dE9WTm9rRVVqdGVRNm5rOGoxU3NrT0NZSUFYUmRFZURqRUt5TlNWZUp5ZW5xUytzNXhuSm15a25EcnVpNVJaRkpWaWp6UDJXNDNsR1UxMTJjT2VWNngzL3YwdllUTXRvWEh4d1RmOTlsczdEWGNQenc4OE9yVkRVVlJZZHMyNHpoUzF6V0hRend2bmhjNXgvTUVVQ3lGTjhpOTYvb2x2QzZrOHYxOU1wY3ZPbjMvdzBuaUgvaEMrS3NudGR2dFp1Z3JEUE00S3JaYmpUeVhBWllRSjFTTmhCanhOM3p3UWNnd3ZFQjFXVFV1WlNtVVUxRVU3SGJiRlkzVmRVMGNiNmlxQnQ5M0tRcUI2M2t1eU8yenhwY29pdkI5ZzJHUWlYOTYrcXltNWRQM2dtSU9CNU95aENRUm01bGxRVjFQeExITzQyT3pjb2RSWks4S2RKSVVLS1VJdzVCaEdGWlJVOU8wZFpKbE1RaXRGY2ZDeko5TzlmdzliZDc5Z25ZWHJXd2NYK2lzdDI4cmRqdC8vbnZMZGlzTHFTd2xGd3BRa1hxdXFpUnZScEY4LzdOS3RRYnd3ZThxNVRpUXBzSnphWm84WE9DbzFBd2d5RW9FUWdQTDBsWSs3WHhPdUxxS1NkTWEzeGNYa2VQQThWZ3pUUlBYMThHNkE4NW5jUmdkangyYmpYQ0ZDd2dZQmxrTVM2Z2NSN2kvenpGTms3WnQ4VHlQMTYrRlFpb0tJVjg5ejhPeWpIV1ZscVhjYndtLzR6aXV1ZUx5MHVhamo4U0dKcEtJUTEyclZiOEtRNHUybFIwa3Boc0hUUlArYjcrM3lITjVwbVZaYzhoMnNXMTUxN1pkMEdkRFhZdnpTdGQxSE1kaHV6WFdpV3pia1RBMFNGUFIxZHEyeHpBTTBqVGwxYXNkWlRsaG1qcmpxS2pyR3NkeDFsMm0vWlYvb0ZTV3NkcTA4bHlJMWZ0N1FUcTZycytlQllIb3dqNE0rTDZKYmNQcDFCRUVObFVsckVDV1RVU1J6dDFkU2h4dkdRWlJnUHUrWnh4SHd0QURwUGE1dkF4bm1rYUs0amlHTEJQcFFyZzg0UW85ajNrWHk0VEk3cFlkR3dRR2VTNkRXWmJ5L1U4L1RiQnRtemoyeWJLR3Npelo3L2Z6aEx0a21Ud3Z5ekpldjk2UXB0T3NXY1Ywblpod2x0SkNQQnB3UHFkY1gyODVuU28yRzUrK1YrdE9kQnlkdGhYSDFjV0ZUMWxLeWRFMERUYzNBb29FTGNvWTZMck9NQXdjRGo3Mzl4SnFsNUM2ZUJrWHQxWVF5T2UyYmRBWG82U3M0b3E2YnRjSkNRS0RZUmpZYkF6R2NWRm9heXpMcEs3SFdTZXk2SHZoN042OFNURU1uYTRUcmk3TGNuUmRSeWxGRU5oRWtZZW15Y0RIY2JqdW51MDJJZ3poZEpyV1dtZ3BoQTFEVm0yYWptZ2F2SG1UOE5GSEtib3V0VTZldnlUKy9WNVc5OVZWak8vN0tBVys3M0k0SENqTGNnMXBjUnlobE1KeG5CbkY2VmlXaFcwTE1YdDVhYkhiQ2RBUjI0RGk4bkpMbnZkY1h2cWN6MUkwVHRPRWJjdGttcWJPYnVldm9YdTcxVGtjZk83dUNxWkpGR1pScXh0Y1Z4YVNiY043NzhXTTQwaVdaUmlHd2VPajNQdnFLcDY5SVJJZVRSUDBzbFFVeFRDSFBtZjJJYWhWQ0d5YTVnZVM3bjd2TVUwS3h6RTRueHNCSkphRXkvMStTOThQWkZtOTFqR3lLd1V4RFFOa1dVV2VOMnZvRUdHeDQzenUxNWVXVUt0VGx0MmN2OEEwRFlaaEpJb2libSszV0JZY0R2c1pUV21jengybms4VDJjWlFvSVEwSlBab0dGeGZoQ3N1WExPQjVEcy9QRmVkelJSQUVQRDFsMUxXaTcwVkxNd3lESUJCNExvdmE0dWxKZ0lYamFCd09Ec01ndTJhaDBJWkJGblJkeTlkM3U1Q3liSEZkamRPcDVmWHJlSlZYSk1mM09JNkRydXRFa2N5QlVzd0xSeVBMSnBTU245VmxwazA4VDFaS2traUNEOE9RdHBVLzAxVFk1YjZYeEJxR0drMHpjSFVsM29nWFdNM3NrSFdwcWdyWGRibThOR1l4VVFyTnF5dWZ3OEZsR0NSK0wrS2Q0OGlmdTkxdURwa1RybXRUVlIxWlZtTlpzTnNKclZVVUUza091eDNjM1FtWXNTd0x6NU9GczRUbjh6bkZkUzJtU2RnTklXdGxsU2RKUXQrUFJKRS84NUFkdDdjYmdrQ2pLQ1JQOTMxUDIvWnN0M0ErSjJnYTNOejRhSnBHV2ZaemZsUVVSVHRyVzZJTWJMZmJXY0h1T1I0ejR0amg4Vkdvc2U5Ly84enBWSkdtL1p5clJZdjd4amRDN3U4bEg1NU9DWFVOZDNmWkxQMEl3TkVPZjdOVUMrc2d0WTdrckRSbFZWT1hMZzJaV0JkZFh4am5hYlYzTGJ4ZDMvYzBUVU1jeDBTUndmRW9xRWxXM1VDV1pXdzJHK0xZNG53V1ZzQzJyUm5pOW1SWk5zdm9JVUVnRmI1aHZEQWlTL2phN2VEUC91ekZtcWFVNHZyYTQvbTVtOE9uUWQvM0RNTXcrd0o5bnA2ZU1FMFRUZFA0NWpkamlnS3lUSmlGS05McGUxbkJTK2dSSDd3aXk3TFpweGpUOThQTVpCamMzeWZ6MzhNWmxodG9tb3lMTUJtU2I5KytmU0Y4RnlJN3o4V29vMmxTcHZSOXo4VkZ5UGxjejVLUkxPWnBtbkFjV1lqYVlsTnVtbjcxekoxT0oyNXVMZ0hXOXBsRlVaV1hrVW5iYkdRd3h4RWVINC9zOTN0c1czWlFtb3BKTWdqZzdkdHk1dlZpNmxvTUtvdG5UOWZoK1ZsSTFDVTArdjRMVTExVmtxelA1ek9PNDNBNGhPUzV3RjBweEdWQWw4dnp0Sm16OURpZHhFTDI1azFCRUFUNHZzYnhXQkZGL3VxTDMrKzFXZjRRZFRrSVJFcngvVVVzYlptbWFkYkhCbXpiWkJna1Z6WE5zT1pXWFdlV2JzWTUzenRVVlRmYkRUeGMxOEIxaFJzVmY2S3pTaSt1Szk3RUlQRFJkWG4ydzBNMXErc3VlVDRERThQUUdRYUY2ODZ6cDJsY1hGelFOQkxyUC9ua2lLN0xSTlYxTXd1RUx1TTR6bldDbWdGRFBQc2JzamxjZUxSdFAvTnIyb3krY201dVhBNEhqYjRmcWV2Mk15d0ZjNjRvU0pLT05GV3p1MG02UjB6VHhIVmRERVBZazlPcHBtM1ZISVliREVQRDh6U1NSTXdzQXFWN3FrcENlUlJwRk1VNDUyWFpCVjNYa1NTeVFOcFdFUVFXeDJOT2xoWHpUaDduV3M2Yjg0aEoyOHJBZGQxRVVSUTRqdVNvTUlTdVUrdkM2YnBwTFRlYXBxSHJGRWt5NGpnbXd6QmcyNnhDWjlQQTdhMW9jcmFRK0Z4ZStuUEJyZGp2TGJaYlYraW16VWFiZmQ2S29palFkWTNOeHFJb0dsNi9QcERuMVNwOUMzcUNLREo0Zmo2amFSclB6K2xuaWxhZHA2ZU1xb0k0bHJwRmFLQk9hb2E3aXNmSGdTZ3kyRzRsbWI1NkZWT1d6RGtrcEtvcVRGT2pycnU1UG5ONDlXcUxwbW16YVJNdUx6MGNSNGpjM2M3ajZlbTR2dVAxdFdoYTIrMldQSmU2cHlqQXNvd1phVXF4ZkgzdEVNZncrSml5MldoejJQSm8yM1pHbHdLU3p1ZVVORTF4WGJCdHNRYll0cjdTVytNNDhza25DWEdzVVJURkhMckVscDFsMlNwcXVxNHhSekIzRHJrVFJURndQQ1lraVhDSWFkcHhQSXIxNGZZMm1Fc0l5WDlyZGZ4TGY2UlVVWWpPZEhrWmtpUXRVZVRNaUdyQXNzdzExQ3hham9RUmsvTjVYRjlzQVF5N25iK1dCT0t1bFhhZFpjWDd2a1dhVnR6YytQTkFTamhJMDhVMkp0Si9IRnNvQmZmMzZZekNISnFtWVpvbXdqQ2MyZkYrVllhM1c1TWtFZlY1eVZYRE1IQnhJUzdkK2ZWb0dvSCtvaVpMN2doRGVmNUNDaHlQSlp0TlFCaXlta3Z6ZkZoRlVzc3lPWjNPeEhGTVdaYThlaFh5OENBT1ljL3o4SDJEaDRlRTI5dVl0b1dtNmZBOGU2NVhwVVlVRWZPRm9oSjBMWCt2S3ZuNVBCZjc5Zy9RVGUvOTlxUThUeVBQKzFXZ0UxbGVuN3N3MUp3SWhSNVpGRm5QZzQ4L2xtVGZkV3J0L2tpU2hJdUxBMW1XYzNzYlVWWEM2ZDNjeE5TMThJTENNNzZJYzU0bkF6a013cDYvZlNzVEtzV3lUSEtTbFBLKzd3V3pmQ0U1NDgyYlpHWVdJalliRThPQSsvdUNPQTVuNENCcTg5TDhZTnMyZmQvamVSNVpsbkYxdGVWMEttZU56SnBSc1poS054dURzcFI4c29BZThYZ2tYRnpFRklWMFczYWRqSWZZN3hyMmU1ZXFrcC9iNzJOY1Z4Yk14eDlMNGY3NnRjK2JOeFhUTkhFNGhMTUZydWI2MnFNc2YxQmQvcUZFN3ZXM1czVnhZZlB4eDBMTnlQYVZWaG14TkJlNHJzc3dERnhmdXp3OENMOG51NDdaRnFaeFBoYzRqb1ByV2l2ZGREeFdiTGMrVlNYVTF1S0IyTzhOa2tUTlpwaVhueGVYVk1uTlRVQ1dpWFZaZGtVMlc2eE5zaXhudjQ5V0MvV25ueWF6c0JuU05PSnhmM2pJdUxyYW9HbVFKQzIzdHc1M2QvTGUwL1JTNEk2akxFTERXRHp3Tlp1Tm1HK21hY0l3OUJVUkdvWkJYUXVZRVpwS0pzWDNmUzR2N2JXcnN1c2s1SUhvYzkvODVwYjdlNmxGdzlDbWJjWCtKalJhZ1czYlA5U3o4U05GTC9kWEh0WEZ4Y1VxeWkzRWJwSWszTjd1ZUhyS09Sd2ltdVpsR3h1R3dQcnZmZTh0SDN4d1ExVkpLODdpaW0wYU9KL1BjeTJpNDNtUUpCMldaZUU0VXI5RWtiVVcwR0hvRThmdy9Dd2YxdmQxaG1HUlJsNm9MTiszYVpxQnZ1OEpBbzl4bEVUdnVocEZJUXRqQVRGU1pFNnoxeU9ZL1lVRzkvZkM5S2VwaE95RlhwUDdRRkdNK0w2QjV3bGhMYmx0V2tHSTlJY3BMaStsaUJaN3RsQklTZElDektERTRmWTJwQ2dnend0MFhlZjJWcUxIanhJaWY2U2UxZnpYSyszN2Y2cHJDeUVxNnJBMjI4QkVqeEtJM1g4R2xTM281b1k4bDBROGx5RnpwMkdCYVpyMGZjLzVuSkRuUXJoTzA4VDVYSEp4WVZIWGlxNmJDQUlmenhPenpPRWdXbEJSREtScE9iTVp4c3lFMjdndU0xdnQwVFFkYmR0U1ZSVlZOVktXNVF5SDA5bnZMaldrNy90ckMxQ2FDcU14am1yMmxLalpPTk5pR0hCM2R5WU01ZXQzZHhWQm9MSGR1amlPUXh4N3pBZ2VYZGY0NUpOcU5kOTBYVWRWS2FMSW1aVnBjZmVtNlVUWDlWeGRoYlAvVWYyRml2R1BMZXZmL2xhdnhuRWtpaHpxZXNSeERMcE9HT0tsdmdCbXVmMUZzcGE2VEFxOXVtNndMSXUyYmJtOTlUbWRGaDVRNTN4T2VmMTZ1eExCRHcvQ3BBUkJnS2FKMUNDcm16VkVTbjBucEd3UVFKTDBsR1hKYmhkVGx0WHFiTnJ2L2RWU0lNeS83SWI5WHVQVFR5V25XWmFFOFBOWmR2TXdDUFFXODZtMWNwcFpKbkpIVWZUMGZjOSs3NjhPM2NmSGRtYmFoV2ZzT21aSUx3dEZoRm9CRlZuV2NuSGhrS1lUYi82MThXUE53MC9zc3ZtNTMxT3FxaVJVU2ZFcmpNRjJhL1AwVkhCOUhmTDhYSE4xNVZGVlVGWHRISnFDdWI1WTZqbDRlQ2ptNWpraFlwY2ljUnpWR3RvY0I1NmY2MWxNMUVsVEVUaVhHTCtndnNVRGNuMjlvMjBGdkx4OUsvMWRXU2JoQ2lDT1BhWkpOREVoZGgxY1Y2TnAxRXJjZnZqaGp0Tko3aDJHUGxYVkVJWXVXVlp4T1BnVXhUaGJEMlRYQXl0UnZLZ0xpM05xWWRpbFRwVG5PSTVHWGYva1hTZy90Ulh0NmpjYXRkczVaTmxBR0pvckttdWFodDNPcFcyWEx2aCtSanBDZWo0OTVWeGVSaVJKUXhSSnU4L3hXTERiaFp6UEJWRWtNZE95NEh5V015dEFFcjRVbFFabDJhNE9KU21VRFlwQ1dBckQwRW5Uakp1YnpieFlSTkpZaXRSaEdOanRJdkpjZGp2SWJoUC92Umh5N3U3T24rRW9SenpQSlF6aDZhbVp1VS94TW1aWnR4cGJGNS83UWpqYnRzRXdDSEJvVzFHNWJkdm0rdHI2cVh1VmYyYVg2Ri8rKzBySkpFbnlyU29SSklYWWxHVHEreFpkSjZ2OWZLN21WV1lUUmZEbWpmek14WVhGUngrZDEyNUdPYWRDbTNXcm1vc0xqL05adExPdVU3TVBRcGlDcFRraGloektzbDlsR1lBNE51ZXd3OXBETE1ZV0tjTEQwRmdwcmJhVlJTQ3VYNTJ5ckZZdXNlOTdvc2lucWdSSm5zL0xDVFlpTkVvWHlwWTBUV2VVS25MSTVhWEg4M096YW9PZi9xdWYzdWo1dWRpbmYvbVBwV1BrNlVuaWY1SVV2UDkrU0pxS1JMRWdTZHVXdkpBa0ZYSHMwelFDbC92K0JibTFMYXRBQjVLZzVYdkNOaGdHUEQycDJlKzNBQjloM1MzTFdPWDA1MmVwYThUVENIZDMrU3hEQkt2N1Z1NHJpSzhvcEVsOElWMlgwTHJiaWRENThIQW1paUs2cnVQbXhsODlLRUZnemZvZGxLVVlYWlVTL3RUejNQVVpuMGVuNU9mYW12TGViMDlLUXA1Qm5rdENYcHF6UDJ0cExzdVN6U2JrZEVwbTM1MlA2NzdVSkdVcGsxblhVb3d1UlBMaVV4Z0dHWUFzbTZqcm12MCs0SGdzT0J6RXpITi9MKzFDaTFJUVJVSW9QejhMVWZ2bXpSTzZybk45ZlpoYlR5WG5TRHVRdXk2V0lEQldxSjlsRXFJdGkxVnZXa0o5V1U2Y3oyY3VMdytBZkViWjZRYi84eDkvZmoxYlgwZ2YwVEpwZmQ4VGh1NmFIM3hmRUp0aEdHdU45ZndzU1h3Y3BaQVdMNGJpK2ZtWi9YNlBydXN6TWR0eU9BVGtlVDlielByWmhMT2pMS1ZvWGdqWmFSS0o0blE2OGZyMUFjdVNmS2ZyT3Vmem1mZmUyODk1cENhS1BCd0g4bnlha1p6azBKdWJrRHdYWFV1VVhtSGNYZmZscUlkUFB6M3lDNzl3NE81T2RwR2dZdkhmVDlQbmY4VFFGOVpNZC9VYmpkcHVSUVo0ZUtobStPM04vY1BkaXBTeUxPUDk5N2VNSTV6UDNicXErNzVmbStrdUx2eDFoeTZRdUcxbHdOcDJZcnZWNXc1SXhYNHZIMGtwZVB0V2xPenQxdVhoUVN4cWZkL3pqVzlJaU83N2ljMUc1L201NGZMUzVYVHF1Yml3MWlieVlaQWRFOC85UjhMTW1QVDl1RHEwdHR2dDZuSGY3WHk2N3NkMzJQNmsxeGZlcHZyNnU2TmFUQ2ROczhqMCtpbzNSSkdGNndxdDFQZk05WkkwaUtkcHpuWXJUUXJMMTVjbWlPM1c1WGdzYU51V3E2dkRMT1AwcTc0a2pYVnlGQkM4NU1IYlc0ZVBQNWI3aWdnb3UzNVJiVFZOSTQ0MTd1N0t1UmJ6U1ZPWnZMSVVvRk9XaTdHMFd3WEVzdnppejhyNDByck5seE5rbElMajhjaXJWNGYxV0FUVGxCMlQ1eE8rcjVQblBZZURXTC9PNXdURE1OaHNJb1poWExzMHRsdHIzbG1zTmRyenN5amJjazlSdDRXODFXY201QVdKMW5XTDR6Z3JrN0gwTVM4dVg4bWZQWjVuMGJiamVxQ0tsQ2JlN05VUTArb1h0WlArL1BXbG4rWHc0ZThybFNReVFIVmR6NDBBMW14RmxoRFhkZjBzOTV1a3FkUmxaU210UGxkWCt6VWtMcFkxenhQVHBpakhjbExOZSs4RnMyQXF1WE14aGNxZ082c0JhSkZGaGtIQXpDSVRYVitIcy9kQm1Qb0ZWYjU1STdMSzBxWjAray9obHphR1g4bWhKVC8vQjBxbGFiTnlpMHRINHZFbzBGZmFmV1JHZ3NCZXFhQ3lIRmUvdUZJTGRBNndMSTAwRld1MXVHdUZTTFZ0R1Z6ZjkvRThhMFdqY3A2RlBuTnpGbFVGZWQ0eFRSUDd2WXZyd3NPRHlESEx3c2l5a3NNaElFMmxGbnY3Nyt6L3Z3OHQrZk5YK0tzbnRkL3ZWbXRZMi9helZHSGp1akxnaTR6dU9BNmJqUlRKWWZpaWVTMUhOZVM1ZUJqS1VzQk0welI4NjFzN3ptY3B4c3RTaktuelFXb3preThGL0hZci92cWx0M2l4NHJWdFN4UUZORTFIR05xVVpmK1ZUTkp5ZldtSGx2eXdxL2d2ZSsyVFA5RTB5UThEUlZHc08wYUk0QTdmdDlhay8vUWtIcENQUHo3UFRXL016dGQrMXBhYStTeGNqemlPT1ovRm1aVG4zWHcyNGRMb1BjNHl5NGp2QzdzaDhqdWNUdklPZVo2dkIwcTZyczMvK1dlYTlsVk9GTHdqcDZJdDF5LytvVHp3OG1vQUFBSFlTVVJCVkZKbCtjSk9MQnJaWm1PUTUySVdUVk94UTR2eEpWaGRVa3FKb2FkdFd5ekw0bkR3MXpaV09XakVuaytnZmhINmtrU09yTk0wK1YzZmQ5ZmlmUUU5YlF2ZisrZGYvamxOUCt4NkoxN2lzOWYxdDFzbHNOdGMvZUpSRksyK2pFV1VYUHlNeTBFaWkzMXJZZmhCbXRzazF5MDd6cVRyNUo2Q0VCMzZmbVMzTStiZVh5a1p5ckttYlZ2eS83eDdwOGJublhxWnoxN2YvQjJsbXFhYnBYUmh1aGY2eUxadDhqeG5zOW5nKzhJNkxLekM2VFN1akx6bnVTdWg3SGtldG0zTUxNbzRkKzJMTXpqUE80WmhtUFdwN1R0N1Z1NDcrVktmdlY1OVoxQjFYYS9Jei9ldEdWaW85YmlFNWFpaHBWdXk3d1dHMTdYa3ZjUEI1dTR1bjIxclc1cW1ZN2V6dWJ0TDU2N01rR21TWFBsVjU2VWZkYjJ6TC9iWjYrWTNPK1c2Rm1YWnJBSmZGRmtVeGJEbXJ5aHlaeFZZV0F5aGdueWFabHhOS0xlM0h1ZXptczB1TDRlTi9DUk4yRi9sOWM2LzRHZXZYL29qcGFwS2l0TVgxZ1B5WERqQTVXeUx4VU1vTm1XWHpjYmc4YkZrdXczV0JrQTV6dlhMUHpQd1o3bStOaS82Mld2NS81QXN4NFc3cnMzcEpLMnJWMWZCM0dCOW5pZktvMjJGeGxyOGhWWFY4dmdmM0svZFovL2F2ZkJucjh0ZnI5VUMxYSt1L1BYTTl1ZG5ZYyt6YlBIK3ZmeC9TeDRlSHVqLzIrM1g4blAvWDgrampBeTJRZGlFQUFBQUFFbEZUa1N1UW1DQyI+PC9pbWFnZT48bGluZWFyR3JhZGllbnQgaWQ9Il9MaW5lYXIxMSIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0xMTguNDcsLTEwNi43OSwyMTAuNzg1LC0xODAuMTI1LDY5LjIxMjEsMTM3Mi43KSI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjogcmdiKDY0LCAxMjgsIDI1NSk7IHN0b3Atb3BhY2l0eTogMTsiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiByZ2IoNjQsIDEyOCwgMjU1KTsgc3RvcC1vcGFjaXR5OiAxOyI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGltYWdlIGlkPSJfSW1hZ2UxMyIgd2lkdGg9IjEwN3B4IiBoZWlnaHQ9IjM0cHgiIGhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBR3NBQUFBaUNBWUFBQUJZNkNlb0FBQUFDWEJJV1hNQUFBN0VBQUFPeEFHVkt3NGJBQUFCRkVsRVFWUm9nZTJhUVJLRE1BaEZteDZpdC9QK3g3QWI2NHhPbWFBRzh2bndGbldoaU9HRk9HM1RQc3U2dnBTMGRqcHVINjF6WG96NUYzczZyNHJSeGlwaWZ0ZGRlVWJwM3QxOFFvekV1My9KZmRTemdDeTVWV3BUV2NWWVNsYVBxY3ZERVVwWlFQVWRDcVVzU0FiTW9KSVZpSklWQ0JOWnJPK01IdGJqcnM0S1JNa0tCSlVzOXVYWFR4WjdKUjJnNml4MjdzbHk2Qkl4UmVJT0hkcFpXZXZvTmU2OHkyREFtVFZYRm1EQkFCOXBKMjluQllSQ2xuNWpna1Z5djFRVXNySUFKeXZ0dmcxRjdpR3lrRi9LbG5pUEc2NnpLREN5V0xJMklxd09KU3NRejJVUmJxWkVwVG9yRURDeXBuNnhuY2lWWVQrU2xiUyswOFp0MDFsSmZ2N3hCbVlaTFBwZ3k2cC9wQTlneXhJQXJLTUxYeGV4TE5pQkNUaExBQUFBQUVsRlRrU3VRbUNDIj48L2ltYWdlPjxpbWFnZSBpZD0iX0ltYWdlMTUiIHdpZHRoPSIzOHB4IiBoZWlnaHQ9IjYycHgiIGhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ1lBQUFBK0NBWUFBQUJIdUdsWUFBQUFDWEJJV1hNQUFBN0VBQUFPeEFHVkt3NGJBQUFHYUVsRVFWUm9nY1ZaU1dMak9Bd3NibEl1K29EKy96Wi9ZQzRkaThzYzdJS0xzSnpKZENkcFhHeExYSUFDVUFEcGdMOG9JWVI5aktHL3dkL2hMK20wODB1TUViMzNwd0hwUjlVQmtGTGFVN3B0VzByQkdBT0tHZ0FzeS9LamlPM0F3MTA1WjR3eDBGcERTZ210TlZQcWVyMGlmN2MyT2VlOTFvcVVFc1lZNXJaYUs1WmxRWXdSeDNIWStKK0lzU21PUWdoUHFLaHdUTzhkSVlSdlU4eVUwa3p6RW1QRUdHTlNpR08vT3ZoM0FCdHdRNFVJNVp4UlNqRUZLQnByWXd5VVV0Qjd2NkgzaFFxaGxHSWIxbG9SWTBSS0NjZHhJS1dFM3JzaFVrcVpZc3ZMSHlrV1F0aGpqSlpaR3R3cXBSUzAxaWEzTWFaQ0NLaTFjajJNTVpCUytuMVhoaEIyYnJLdUsycXRqL2hJeWVKSGtWRXlwZnQ2NzhnNUkrYzh1ZjUzRk5zQmJMb0pGNlJ3VTgwMGtpcmppbk0xOEhYY3B4VUxJZXdBTmk1S3lEV1QxbldkM0txdVhaYkY1dEdWbXEycVhPLzlVekcyZi9TU3lLM3JpdmYzOTVlMVQ1L1RtQkFDbG1YQisvdTdBbkJEKzdOSzVmd29FaUU4MjJPTTdkN2xuQkZqdEl3bG1rU01nYTk3aEJCZWxxUmRyYVRmMVNJdm5zbTEvZ0V3VkJnQ2ZNZlBwd1E2VVdnajBYR1F4Z3JmZVVXSkZJTzd0WWFjczIwV1l6UkRQYnFrRGNaczc5MFUyNWRsMmFpOXhvS0srVitvUUZFaHNwenZXWjRrQzJES1RLNnRDUkJqakR0ZDRSVlpsZ1Z2YjIvVDRscU1qK093OXlSYVJVL1hpL0U1bklrVWpXTE1wWlNReGhpYm44QzZkaHlIbFJaYTZSdTczanRLS2JZZ0RlQm1Xb3I4UE4yTExtZjhKZHlMcnNLcmxWN2hwK1hlUmEwMUcrL2pqYWo0aEdFNDlONm5nbS92VmFrUWdxVTFOOWMydVBjK3BUZExqeXFwbjdxT0Z6NlBNVTQ4UmpCc1ZjYUhyL2hxUFpWWjEzWEtNbjN2K1U0em1pV0todXI2bXBtOTk0ZGlERHdOMkJEQ3hEODB3RDlUWldxdHRpbWZFMWxQUVl5bmRWMm4zMk9NVzR4cDZqSTd2R2k4MENxU3I0OFBSWkdHa3R0U1NoTy9zVjliMTlYSGNqU2ttRVdLbVA1bWNLc2lpcGFYcy9oakNGQ1VPMW5jQVNERkdMZFhteEpCalJGRms0VmJmeE5WcFJpNmgvRjJ0Z2ZCb1JkaWF3M0xzaGlmZUNHUHNXM2hRc0NqL2xFUjVUMVNDTjNuV2Q3NnJoZWhrMElJR3hWUUM3aUFoM3habG1rc1VWUUMxZU1hUzVncVJ2ZS9Pb1hYV20vQnIwandBTkZhczNhRlN0Rk51b21sdDdpWjJhZUVyVW94OEVzcHhwOVUxR29tZ0owV1RlYzZsMjMrSGN2SVdXUElIb3l0a003bGZZV2k3dWUyMWhCWi85VGlVc3FVUFdjTVQ3NDZVNnJXT3ZWbk92ZFZKYUFZamVTY053WW9yU2VGZURMMExPODM4VzVXUS9TN1paNGtsYy80ZUwxZUxWaVpzclZXOHozOWY5YTJlS1I4dThNZzkzTnBaR3NOeDNGTUJ4VHpFb0R0N0tDcUNjRk50VE5WSzErZEsxdHJsanhLRVd5VmZEZkxMTTA1STdGejFjMTkxdFZhcmJQd0xsWE9NamVjS0tXYk10RW8vczZzOTQ1SWpXdXRCcTFhcHhicFVSOTRKQWtYMDBLdjhhU3VaRFp5bldWWlRDbHROczJWSGlrTi9EUCtva3ZPRXNDSEE2OEJQRkxhM1hvdWpacUZLbHFjdFJ4NUJmUXNTSTdpSEFDV2Vlb3lTbXZ0NmVERHNtYUllU0YxOFBiUHU1Wmp0Q3JvZTcrbVAwMXBTK1QzdFpNNEc3dXpXR0N2cE5acGRoRXhacXgycHRwUktQWDQ3b0pvc3pNRzdqMi94b0lxeDhEVTFvWUxjeHdUeGJma1BsNWpqRk40TUFQNTNwOG5Jc21WMTVHKzl5SUNYSXlLY05Iak9LWTVLanFYWTZrYzZ5elhiSzBaa2pGR2hGTEt6b0gyVUc3NXhJSVA2eHpUM1g4SEhnM0IyVEdPemFiZSsvUGlibE9mbjhVRW4zTVRvcW5JNlIwR2pmT0pvT1hOY3g3cjU1MkNMbW1Nc2VtMU5qZFg3dUdpU3FhNklVV1BhMmVaem9PdG50QlZldThYQVA4QXVGMUQ1Wnl0bUtvVkZILzBPcE5YNzlTdC9sTW81dUxuSmR6dlV6WHdwazVTaUZUcHdsdjlxbmZYWW04RitqSFBFUEppYVVSMjFnelRmOGZVeXRiYTFFMlF3L1RjU2RFQ3phUzZVOHNUU2hQUy9NS09rMjdUOUZYeHFLaXJTQmV0TmJ5OXZlSFhyMTgyWHJMMFE0VW9rVmRJbm5PMHZqMVpjK2NpSlVWMkhsb1ZYT040K2F4U0FKREoyRjRCbitwNnREOXJoYmtHa1plZS8vSlIwcnlTbEhQZWxMZk9XaFVxcUg5NjZnRkZLWVJ6N3ArZlJ1aEpzUkRDYVd0TkpmMUppSnZxa2Y2RTR5Njk5OU5zKzZ4a2JWdElFMmVuWjBYS1g0VnpQUDVIRFAyWEdJOEI4MVc1bGhUbE9aWWlWM1l1WTR3L1FzaExWSmVSL1RWT0JBMFRGNDlmaHBKS3B0WGFUL21Tb1psTFJhL1g2N2NvUkFrQWR0K09uUDJaTHZLdENsRXk4Qno0TDVUNkVZVW9VMnV0cUdtOSsybWxBTXovdnVuZnhIZGErSEdGS1A4QzZ3VzZldHQrREs4QUFBQUFTVVZPUks1Q1lJST0iPjwvaW1hZ2U+PC9kZWZzPjwvc3ZnPg==";

// node_modules/yc-design-vue/es/_shared/icons/IconCheck.vue.js
var _sfc_main5 = defineComponent({
  __name: "IconCheck",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M41.678 11.05 19.05 33.678 6.322 20.95" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconClose.vue.js
var _sfc_main6 = defineComponent({
  __name: "IconClose",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M9.857 9.858 24 24m0 0 14.142 14.142M24 24 38.142 9.858M24 24 9.857 38.142" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconError.vue.js
var _sfc_main7 = defineComponent({
  __name: "IconError",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm4.955-27.771-4.95 4.95-4.95-4.95a1 1 0 0 0-1.414 0l-1.414 1.414a1 1 0 0 0 0 1.414l4.95 4.95-4.95 4.95a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-4.95-4.95 4.95-4.95a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0Z",
            fill: "currentColor",
            stroke: "none"
          }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconInfo.vue.js
var _sfc_main8 = defineComponent({
  __name: "IconInfo",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm2-30a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2Zm0 17h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v-8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v11Z",
            fill: "currentColor",
            stroke: "none"
          }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconInfoLine.vue.js
var _sfc_main9 = defineComponent({
  __name: "IconInfoLine",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M25 39h-2V18h2z" }, null, -1),
          createBaseVNode("path", {
            fill: "currentColor",
            stroke: "none",
            d: "M25 39h-2V18h2z"
          }, null, -1),
          createBaseVNode("path", { d: "M25 11h-2V9h2z" }, null, -1),
          createBaseVNode("path", {
            fill: "currentColor",
            stroke: "none",
            d: "M25 11h-2V9h2z"
          }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconLoading.vue.js
var _sfc_main10 = defineComponent({
  __name: "IconLoading",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconSuccess.vue.js
var _sfc_main11 = defineComponent({
  __name: "IconSuccess",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm10.207-24.379a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0L22 26.172l-4.878-4.88a1 1 0 0 0-1.415 0l-1.414 1.415a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414 0l11.5-11.5Z",
            fill: "currentColor",
            stroke: "none"
          }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconWarning.vue.js
var _sfc_main12 = defineComponent({
  __name: "IconWarning",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm-2-11a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2Zm4-18a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V15Z",
            fill: "currentColor",
            stroke: "none"
          }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/constants/index.js
var TYPE_ICON_MAP = {
  success: _sfc_main11,
  warning: _sfc_main12,
  error: _sfc_main7,
  info: _sfc_main8,
  loading: _sfc_main10,
  confirm: _sfc_main8,
  "result-403": Icon403,
  "result-404": Icon404,
  "result-500": Icon500,
  "result-info": _sfc_main9,
  "result-warning": _sfc_main9,
  "result-error": _sfc_main6,
  "result-success": _sfc_main5
};
var TYPE_ICON_COLOR_MAP = {
  info: "rgb(22, 93, 255)",
  success: " rgb(0, 180, 42)",
  warning: "rgb(255, 125, 0)",
  error: "rgb(245, 63, 63)",
  danger: "rgb(245, 63, 63)",
  loading: "rgb(22, 93, 225)",
  normal: "rgb(201, 205, 212)"
};
var TAG_PRESET_COLORS = [
  "default",
  "red",
  "orangered",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "arcoblue",
  "purple",
  "pinkpurple",
  "magenta",
  "gray",
  "default"
];
var COLOR_PICKER_PRESET_COLORS = [
  "#00B42A",
  "#3C7EFF",
  "#FF7D00",
  "#F76965",
  "#F7BA1E",
  "#F5319D",
  "#D91AD9",
  "#9FDB1D",
  "#FADC19",
  "#722ED1",
  "#3491FA",
  "#7BE188",
  "#93BEFF",
  "#FFCF8B",
  "#FBB0A7",
  "#FCE996",
  "#FB9DC7",
  "#F08EE6",
  "#DCF190",
  "#FDFA94",
  "#C396ED",
  "#9FD4FD"
];
var COLOR_PICKER_FORMAT_OPTIONS = [
  {
    label: "RGB",
    value: "rgb"
  },
  {
    label: "Hex",
    value: "hex"
  }
];

// node_modules/yc-design-vue/es/_shared/components/IconButton.vue3.js
var _sfc_main13 = defineComponent({
  __name: "IconButton",
  props: {
    size: { default: 12 },
    hoverColor: { default: "rgb(242, 243, 245)" },
    hoverSize: { default: 20 },
    disabled: { type: Boolean, default: false },
    preventFocus: { type: Boolean, default: true }
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "d42bb172": _ctx.hoverColor,
      "ccfb48c6": hoverSize.value
    }));
    const props = __props;
    const { hoverSize: _hoverSize } = toRefs(props);
    const hoverSize = computed(() => valueToPx(_hoverSize.value));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-icon-button",
          {
            "yc-icon-button-disabled": _ctx.disabled
          }
        ]),
        onMousedown: _cache[0] || (_cache[0] = (e) => _ctx.preventFocus && e.preventDefault())
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createVNode(unref(_sfc_main6), { size: _ctx.size }, null, 8, ["size"])
        ], true)
      ], 34);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/components/IconButton.vue.js
var IconButton = _export_sfc(_sfc_main13, [["__scopeId", "data-v-8fb80b1e"]]);

// node_modules/yc-design-vue/es/Alert/index.vue2.js
var _hoisted_12 = {
  key: 0,
  class: "yc-alert-icon"
};
var _hoisted_22 = { class: "yc-alert-body" };
var _hoisted_32 = {
  key: 0,
  class: "yc-alert-title"
};
var _hoisted_42 = { class: "yc-alert-content" };
var _hoisted_5 = {
  key: 1,
  class: "yc-alert-action"
};
var _sfc_main14 = defineComponent({
  ...{
    name: "Alert"
  },
  __name: "index",
  props: {
    type: { default: "info" },
    showIcon: { type: Boolean, default: true },
    closable: { type: Boolean, default: false },
    title: { default: "" },
    banner: { type: Boolean, default: false },
    center: { type: Boolean, default: false }
  },
  emits: ["close", "after-close"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const visible = ref(true);
    const handleClose = (ev) => {
      visible.value = false;
      emits("close", ev);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: "slide-dynamic-origin",
        onAfterLeave: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("after-close"))
      }, {
        default: withCtx(() => [
          visible.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass([
              "yc-alert",
              `yc-alert-${_ctx.type}`,
              {
                "yc-alert-has-title": _ctx.title || _ctx.$slots.title,
                "yc-alert-center": _ctx.center || _ctx.banner,
                "yc-alert-banner": _ctx.banner
              }
            ])
          }, [
            _ctx.showIcon ? (openBlock(), createElementBlock("div", _hoisted_12, [
              renderSlot(_ctx.$slots, "icon", {}, () => [
                (openBlock(), createBlock(resolveDynamicComponent(unref(TYPE_ICON_MAP)[_ctx.type])))
              ], true)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_22, [
              _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_32, [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(_ctx.title), 1)
                ], true)
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_42, [
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ])
            ]),
            _ctx.$slots.action ? (openBlock(), createElementBlock("div", _hoisted_5, [
              renderSlot(_ctx.$slots, "action", {}, void 0, true)
            ])) : createCommentVNode("", true),
            _ctx.closable ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: "yc-alert-close-btn",
              role: "button",
              "aria-label": "Close",
              onClick: handleClose
            }, [
              renderSlot(_ctx.$slots, "close-element", {}, () => [
                createVNode(unref(IconButton))
              ], true)
            ])) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 3
      });
    };
  }
});

// node_modules/yc-design-vue/es/Alert/index.vue.js
var _Alert = _export_sfc(_sfc_main14, [["__scopeId", "data-v-5266bf6a"]]);

// node_modules/yc-design-vue/es/Alert/index.js
var Alert = Object.assign(_Alert, {
  install: (app) => {
    app.component("Yc" + _Alert.name, _Alert);
  }
});

// node_modules/yc-design-vue/es/_shared/utils/vue-utils.js
var getSlotFunction = (param) => {
  if (param) {
    return isFunction(param) ? param : () => param;
  }
  return void 0;
};
function wrapTextContent(s) {
  return h(
    "span",
    {
      class: {
        "only-child__content": true
      }
    },
    s
  );
}
function findFirstLegitChild(node) {
  if (!node) return null;
  const children = node;
  for (const child of children) {
    if (isObject2(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case "svg":
          return wrapTextContent(child);
        case Fragment:
          return findFirstLegitChild(child.children);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}
function findComponentsFromVnodes(vnodes, name) {
  const result = [];
  const traverse = (nodes) => {
    var _a, _b;
    if (!nodes) return;
    const nodeList = Array.isArray(nodes) ? nodes : [nodes];
    for (const node of nodeList) {
      if (!isVNode(node)) continue;
      const type = node.type;
      const children = node.children;
      const subTree = (_a = node.component) == null ? void 0 : _a.subTree;
      if (isObject2(type) && type.name === name) {
        result.push(node);
      }
      if (subTree) {
        traverse(subTree);
      } else if (Array.isArray(children)) {
        traverse(children);
      } else if (isObject2(children)) {
        for (const key of Object.keys(children)) {
          if (!isFunction(children[key])) continue;
          traverse(((_b = children[key]) == null ? void 0 : _b.call(children)) || []);
        }
      }
    }
  };
  traverse(vnodes);
  return result;
}

// node_modules/yc-design-vue/es/Anchor/AnchorLink.vue2.js
var _hoisted_13 = ["href"];
var _hoisted_23 = {
  key: 0,
  class: "yc-anchor-sublist"
};
var _sfc_main15 = defineComponent({
  ...{
    name: "AnchorLink"
  },
  __name: "AnchorLink",
  props: {
    title: { default: "" },
    href: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const { href } = toRefs(props);
    const { smooth, boundary, changeHash, curHref, lineLess, scrollContainer } = useContext().inject();
    const handleClick = (e) => {
      curHref.value = href.value;
      if (changeHash.value) return;
      e.preventDefault();
      const anchorDom = getElement(href.value);
      if (!anchorDom) return;
      if (isNumber(boundary.value) && scrollContainer.value) {
        const { top: anchorTop } = anchorDom.getBoundingClientRect();
        const { top: containerTop } = scrollContainer.value.getBoundingClientRect();
        const { scrollTop } = scrollContainer.value;
        scrollContainer.value.scrollTo({
          top: anchorTop - containerTop + scrollTop - boundary.value,
          behavior: smooth.value ? "smooth" : "auto"
        });
      } else {
        anchorDom.scrollIntoView({
          block: boundary.value,
          behavior: smooth.value ? "smooth" : "auto"
        });
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-anchor-link-item",
          {
            "yc-anchor-link-active": unref(curHref) == unref(href) && !unref(lineLess),
            "yc-anchor-link-lineless-active": unref(curHref) == unref(href) && unref(lineLess)
          }
        ])
      }, [
        createBaseVNode("a", {
          href: unref(href),
          class: "yc-anchor-link",
          onClick: handleClick,
          ref: "linkRef"
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_ctx.title), 1)
          ], true)
        ], 8, _hoisted_13),
        _ctx.$slots.sublist ? (openBlock(), createElementBlock("div", _hoisted_23, [
          renderSlot(_ctx.$slots, "sublist", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Anchor/AnchorLink.vue.js
var AnchorLink = _export_sfc(_sfc_main15, [["__scopeId", "data-v-cb050db9"]]);

// node_modules/yc-design-vue/es/Anchor/hooks/useContext.js
var ANCHOR_CONTEXT_KEY = "anchor-context";
var useContext = () => {
  const provide$1 = (props, listRef) => {
    const {
      changeHash,
      smooth,
      boundary,
      lineLess,
      scrollContainer: _scrollContainer
    } = toRefs(props);
    const slots = useSlots();
    const curHref = ref("");
    const hrefs = computed(() => {
      var _a;
      const nodes = findComponentsFromVnodes(
        ((_a = slots.default) == null ? void 0 : _a.call(slots)) || [],
        AnchorLink.name
      );
      return nodes.map((node) => {
        var _a2;
        return (_a2 = node.props) == null ? void 0 : _a2.href;
      });
    });
    const scrollContainer = computed(() => {
      return isUndefined(_scrollContainer.value) ? findFirstScrollableParent(listRef.value) : getElement(_scrollContainer.value);
    });
    provide(ANCHOR_CONTEXT_KEY, {
      changeHash,
      smooth,
      boundary,
      lineLess,
      curHref,
      scrollContainer
    });
    return {
      hrefs,
      curHref,
      changeHash,
      smooth,
      boundary,
      lineLess,
      scrollContainer
    };
  };
  const inject$1 = () => {
    return inject(ANCHOR_CONTEXT_KEY, {
      changeHash: ref(true),
      smooth: ref(true),
      boundary: ref("start"),
      curHref: ref(""),
      lineLess: ref(false),
      scrollContainer: ref()
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Anchor/Anchor.vue2.js
var _hoisted_14 = { class: "yc-anchor" };
var _hoisted_24 = {
  key: 0,
  class: "yc-anchor-line-track"
};
var _sfc_main16 = defineComponent({
  ...{
    name: "Anchor"
  },
  __name: "Anchor",
  props: {
    boundary: { default: "start" },
    lineLess: { type: Boolean, default: false },
    scrollContainer: { default: void 0 },
    changeHash: { type: Boolean, default: true },
    smooth: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const listRef = ref();
    const linkRefs = ref([]);
    const { curHref, hrefs } = useContext().provide(props, listRef);
    const top = computed(() => {
      const curIndex = hrefs.value.findIndex((item) => item == curHref.value);
      const offset = linkRefs.value.slice(0, curIndex + 1).map((item) => item.offsetHeight).reduce((pre, cur, index2) => {
        if (index2 == curIndex) {
          return pre + (cur - 12) / 2;
        } else {
          return pre + cur;
        }
      }, 0);
      return offset + curIndex * 2;
    });
    onMounted(() => {
      if (!hrefs.value.length) return;
      curHref.value = hrefs.value[0];
      linkRefs.value = [
        ...listRef.value.querySelectorAll(
          ".yc-anchor-link"
        )
      ];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_14, [
        !_ctx.lineLess ? (openBlock(), createElementBlock("div", _hoisted_24, [
          createBaseVNode("div", {
            class: "yc-anchor-line-slider",
            style: normalizeStyle({
              top: unref(valueToPx)(top.value)
            })
          }, null, 4)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "yc-anchor-list",
          ref_key: "listRef",
          ref: listRef
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 512)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Anchor/Anchor.vue.js
var _Anchor = _export_sfc(_sfc_main16, [["__scopeId", "data-v-027eeba9"]]);

// node_modules/yc-design-vue/es/Anchor/index.js
var Anchor = Object.assign(_Anchor, {
  link: AnchorLink,
  install: (app) => {
    app.component("Yc" + _Anchor.name, _Anchor);
    app.component("Yc" + AnchorLink.name, AnchorLink);
  }
});

// node_modules/yc-design-vue/es/_shared/utils/control.js
var useControlValue = (modelValue, defaultValue, onSet = (data) => data, onGet = (data) => data) => {
  const controlValue = ref(defaultValue);
  return computed({
    get() {
      const value = isUndefined(modelValue.value) ? controlValue.value : modelValue.value;
      return onGet(value);
    },
    set(value) {
      controlValue.value = value;
      onSet(value);
    }
  });
};

// node_modules/yc-design-vue/es/node_modules/nanoid/url-alphabet/index.js
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// node_modules/yc-design-vue/es/node_modules/nanoid/index.browser.js
var nanoid = (size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size |= 0));
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
};

// node_modules/yc-design-vue/es/Select/hooks/useSelectOptions.js
var useSelectOptions = (params) => {
  const {
    computedValue,
    multiple,
    provideOptions,
    showExtraOptions,
    getValue,
    fallbackOption,
    formatLabel
  } = params;
  const optionMap = reactive(/* @__PURE__ */ new Map());
  const options = computed(() => [...optionMap.values()]);
  const createOptions = ref([]);
  const fallbackOptions = computed(() => {
    if (!fallbackOption) return [];
    return selectValue.value.filter((v) => !options.value.find((item) => getValue(item.value) == v)).map((v) => {
      const target = fallbackOption(v);
      return {
        ...target || {},
        isFallbackOption: true
      };
    });
  });
  const renderOptions = computed(() => {
    return [
      ...provideOptions.value,
      ...createOptions.value,
      ...showExtraOptions.value ? fallbackOptions.value : []
    ].map((item) => {
      let option = item;
      if (!isObject2(item)) {
        option = {
          label: item,
          value: item
        };
      }
      return {
        id: nanoid(),
        ...option
      };
    });
  });
  const selectValue = computed(() => {
    const value = multiple.value ? computedValue.value : [computedValue.value];
    return value.map((item) => getValue(item)).filter((v) => !isEmpty(v));
  });
  const selectOptions = computed(() => {
    const opts = [...options.value, ...fallbackOptions.value];
    return selectValue.value.map((v) => {
      const option = opts.find((item) => getValue(item.value) == v) || {};
      return {
        ...option,
        id: `${v}`,
        label: option ? (formatLabel == null ? void 0 : formatLabel(option)) ?? (option == null ? void 0 : option.label) : v
      };
    });
  });
  const isEmpty = (val) => {
    return isUndefined(val) || isNull(val) || isString(val) && !val.length;
  };
  const collectOption = (props, optionLabel) => {
    if (props.isFallbackOption) return;
    const id = nanoid();
    onMounted(() => {
      const value = `${getValue(props.value)}`;
      optionMap.set(id, {
        ...props,
        label: optionLabel.value,
        value: value ? props.value : optionLabel.value
      });
    });
  };
  return {
    options,
    createOptions,
    renderOptions,
    selectOptions,
    collectOption
  };
};

// node_modules/yc-design-vue/es/Select/hooks/useSelectHotkeys.js
var useSelectHotkeys = (params) => {
  const {
    computedValue,
    computedVisible,
    options,
    hotkeys,
    multiple,
    limit,
    blur,
    emits
  } = params;
  const curIndex = ref(-1);
  if (!hotkeys.value) {
    return {
      curIndex
    };
  }
  onKeyStroke(["ArrowUp", "ArrowDown", "Enter"], (e) => {
    if (!computedVisible.value || !options.value.length) return;
    const { key } = e;
    e.preventDefault();
    if (key == "ArrowUp") {
      curIndex.value--;
      curIndex.value = curIndex.value < 0 ? options.value.length - 1 : curIndex.value;
    } else if (key == "ArrowDown") {
      curIndex.value++;
      curIndex.value = curIndex.value >= options.value.length ? 0 : curIndex.value;
    } else {
      const value = options.value[curIndex.value].value;
      if (multiple.value) {
        const curValue = computedValue.value;
        const index2 = curValue.findIndex((item) => item == value);
        if (index2 == -1) {
          if (limit.value > 0 && curValue.length == limit.value) {
            return emits("exceedLimit", value);
          }
          computedValue.value = [...curValue, value];
        } else {
          computedValue.value = curValue.filter((item) => item != value);
        }
      } else {
        computedValue.value = value;
        blur();
      }
      emits("select", value);
    }
  });
  return {
    curIndex
  };
};

// node_modules/yc-design-vue/es/Select/hooks/useContext.js
var SELECT_CONTEXT_KEY = "select-context";
var useContext2 = () => {
  const provide$1 = (props, emits, inputRef) => {
    const {
      popupVisible,
      defaultPopupVisible,
      modelValue,
      defaultValue,
      inputValue,
      defaultInputValue,
      multiple,
      fieldNames,
      limit,
      allowSearch,
      showExtraOptions,
      valueKey,
      hotkeys,
      options: provideOptions,
      showEmpty
    } = toRefs(props);
    const {
      formatLabel,
      fallbackOption,
      filterOption: _filterOption
    } = props;
    const computedVisible = useControlValue(
      popupVisible,
      defaultPopupVisible.value,
      (val) => {
        emits("update:popupVisible", val);
        emits("popup-visible-change", val);
      }
    );
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value ? defaultValue.value : multiple.value ? [] : "",
      (val) => {
        emits("change", val);
        emits("update:modelValue", val);
      },
      (val) => {
        if (multiple.value) {
          return Array.isArray(val) ? val : [val];
        }
        return val;
      }
    );
    const computedInputValue = useControlValue(
      inputValue,
      defaultInputValue.value,
      (val) => {
        emits("update:inputValue", val);
      }
    );
    const fieldKey = computed(() => {
      const keys = [
        "id",
        "label",
        "value",
        "disabled",
        "tagProps",
        "render",
        "isFallbackOption"
      ];
      return Object.fromEntries(
        keys.map((key) => {
          return [key, fieldNames.value[key] ?? key];
        })
      );
    });
    const filterFn = (option) => {
      var _a;
      const label = option == null ? void 0 : option.label;
      const keyword = (_a = computedInputValue.value.toLowerCase()) == null ? void 0 : _a.toLowerCase();
      return !!(label == null ? void 0 : label.includes(keyword));
    };
    const filterOption = (option) => {
      if (allowSearch.value) {
        return isFunction(_filterOption) ? _filterOption(computedInputValue.value, option) : filterFn(option);
      }
      if (isBoolean(_filterOption) && !_filterOption) {
        return true;
      }
      return isFunction(_filterOption) ? _filterOption(computedInputValue.value, option) : filterFn(option);
    };
    const {
      options,
      renderOptions,
      createOptions,
      selectOptions,
      collectOption
    } = useSelectOptions({
      computedValue,
      multiple,
      showExtraOptions,
      provideOptions,
      getValue,
      fallbackOption,
      formatLabel
    });
    const isEmpty = computed(() => {
      if (!showEmpty.value) {
        return showEmpty.value;
      }
      if (!allowSearch.value || isBoolean(_filterOption) && !filterOption) {
        return !options.value.length;
      }
      return options.value.every((item) => {
        return !filterOption(item);
      });
    });
    const { curIndex } = useSelectHotkeys({
      computedValue,
      computedVisible,
      hotkeys,
      limit,
      multiple,
      options,
      blur,
      emits
    });
    function getValue(value) {
      return (value == null ? void 0 : value[valueKey.value]) ?? value;
    }
    function blur() {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.blur();
    }
    provide(SELECT_CONTEXT_KEY, {
      computedValue,
      computedInputValue,
      limit,
      multiple,
      curIndex,
      options,
      isEmpty,
      fieldKey,
      renderOptions,
      slots: useSlots(),
      filterOption,
      blur,
      getValue,
      emits,
      collectOption
    });
    return {
      computedVisible,
      computedValue,
      computedInputValue,
      selectOptions,
      createOptions,
      options
    };
  };
  const inject$1 = () => {
    return inject(SELECT_CONTEXT_KEY, {
      computedValue: ref(void 0),
      computedInputValue: ref(""),
      multiple: ref(false),
      limit: ref(0),
      curIndex: ref(-1),
      options: ref([]),
      renderOptions: ref([]),
      isEmpty: ref(false),
      fieldKey: ref({}),
      slots: {},
      emits: () => {
      },
      blur: () => {
      },
      filterOption: () => {
        return true;
      },
      getValue: () => "",
      collectOption: () => {
      }
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/_shared/icons/IconArrowDown.vue.js
var _sfc_main17 = defineComponent({
  __name: "IconArrowDown",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M39.6 17.443 24.043 33 8.487 17.443" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/utils/global-config.js
var CONFIG_PROVIDER_PROVIDE_KEY = "config-props";
var getVar = (value, _value) => {
  return computed(() => {
    var _a;
    return isUndefined(value == null ? void 0 : value.value) || isString(value == null ? void 0 : value.value) && !((_a = value == null ? void 0 : value.value) == null ? void 0 : _a.length) ? _value.value : value.value;
  });
};
var getGlobalConfig = (props = {}) => {
  const {
    slots,
    zIndex,
    size: _size,
    updateAtScroll: _updateAtScroll,
    scrollToClose: _scrollToClose,
    exchangeTime: _exchangeTime,
    popupContainer: _popupContainer
  } = inject(CONFIG_PROVIDER_PROVIDE_KEY, {
    zIndex: ref(1001),
    size: ref("medium"),
    updateAtScroll: ref(true),
    scrollToClose: ref(false),
    exchangeTime: ref(true),
    popupContainer: ref("body"),
    slots: {}
  });
  const renderEmpty = (name) => {
    return slots.empty ? () => {
      var _a;
      return (_a = slots.empty) == null ? void 0 : _a.call(slots, {
        component: name
      });
    } : Empty;
  };
  const renderLoading = () => {
    return slots.loading ? slots.loading : _sfc_main10;
  };
  const { size, updateAtScroll, scrollToClose, exchangeTime, popupContainer } = toRefs(isReactive(props) ? props : reactive(props));
  return {
    slots,
    zIndex,
    size: getVar(size, _size),
    updateAtScroll: getVar(updateAtScroll, _updateAtScroll),
    scrollToClose: getVar(scrollToClose, _scrollToClose),
    popupContainer: getVar(popupContainer, _popupContainer),
    exchangeTime: getVar(exchangeTime, _exchangeTime),
    renderEmpty,
    renderLoading
  };
};

// node_modules/yc-design-vue/es/Spin/index.vue2.js
var _hoisted_15 = { class: "yc-spin" };
var _hoisted_25 = {
  key: 0,
  class: "yc-dot-loading"
};
var _hoisted_33 = {
  key: 1,
  class: "yc-spin-tip"
};
var _hoisted_43 = {
  key: 0,
  class: "yc-spin-mask"
};
var _sfc_main18 = defineComponent({
  ...{
    name: "Spin"
  },
  __name: "index",
  props: {
    size: { default: 20 },
    loading: { type: Boolean, default: false },
    dot: { type: Boolean, default: false },
    tip: { default: "" },
    hideIcon: { type: Boolean, default: false },
    isSizeInherit: { type: Boolean, default: false }
  },
  setup(__props) {
    const { define: DefineTemplate, reuse: ReuseTemplate } = createReusableTemplate();
    const { renderLoading } = getGlobalConfig();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_15, [
        createVNode(unref(DefineTemplate), null, {
          default: withCtx(() => [
            !_ctx.hideIcon ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass([
                "yc-spin-icon",
                {
                  "yc-spin-icon-loading": !_ctx.dot
                }
              ]),
              style: normalizeStyle({
                fontSize: !_ctx.isSizeInherit ? unref(valueToPx)(_ctx.size) : "inherit"
              })
            }, [
              renderSlot(_ctx.$slots, "icon", {}, () => [
                _ctx.dot ? (openBlock(), createElementBlock("div", _hoisted_25, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(5, (i) => {
                    return createBaseVNode("div", {
                      key: i,
                      class: "yc-dot-loading-item"
                    });
                  }), 64))
                ])) : (openBlock(), createBlock(resolveDynamicComponent(unref(renderLoading)()), { key: 1 }))
              ], true)
            ], 6)) : createCommentVNode("", true),
            _ctx.tip ? (openBlock(), createElementBlock("div", _hoisted_33, [
              renderSlot(_ctx.$slots, "tip", {}, () => [
                createTextVNode(toDisplayString(_ctx.tip), 1)
              ], true)
            ])) : createCommentVNode("", true)
          ]),
          _: 3
        }),
        !_ctx.$slots.default ? (openBlock(), createBlock(unref(ReuseTemplate), { key: 0 })) : (openBlock(), createBlock(Transition, {
          key: 1,
          name: "fade"
        }, {
          default: withCtx(() => [
            _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_43, [
              createVNode(unref(ReuseTemplate))
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        })),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Spin/index.vue.js
var _Spin = _export_sfc(_sfc_main18, [["__scopeId", "data-v-4d07b531"]]);

// node_modules/yc-design-vue/es/Spin/index.js
var Spin = Object.assign(_Spin, {
  install: (app) => {
    app.component("Yc" + _Spin.name, _Spin);
  }
});

// node_modules/yc-design-vue/es/Select/SelectIcon.vue2.js
var _hoisted_16 = { class: "yc-select-suffix-icon" };
var _hoisted_26 = {
  key: 0,
  class: "yc-select-search-icon"
};
var _sfc_main19 = defineComponent({
  __name: "SelectIcon",
  props: {
    loading: { type: Boolean },
    popupVisible: { type: Boolean },
    showClearBtn: { type: Boolean },
    allowSearch: { type: Boolean }
  },
  emits: ["clear"],
  setup(__props) {
    const { slots } = useContext2().inject();
    const renderIcon = (name) => {
      return slots[name];
    };
    return (_ctx, _cache) => {
      const _component_icon_search = resolveComponent("icon-search");
      return _ctx.loading ? (openBlock(), createBlock(unref(Spin), {
        key: 0,
        size: 12,
        class: "yc-select-loading-icon"
      }, createSlots({ _: 2 }, [
        _ctx.$slots["loading-icon"] ? {
          name: "icon",
          fn: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(renderIcon("loading-icon"))))
          ]),
          key: "0"
        } : void 0
      ]), 1024)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createBaseVNode("div", _hoisted_16, [
          unref(slots)["arrow-icon"] ? (openBlock(), createBlock(resolveDynamicComponent(renderIcon("arrow-icon")), { key: 0 })) : (openBlock(), createBlock(unref(_sfc_main17), {
            key: 1,
            rotate: _ctx.popupVisible ? 180 : 0
          }, null, 8, ["rotate"]))
        ]),
        _ctx.allowSearch ? (openBlock(), createElementBlock("div", _hoisted_26, [
          unref(slots)["search-icon"] ? (openBlock(), createBlock(resolveDynamicComponent(renderIcon("search-icon")), { key: 0 })) : (openBlock(), createBlock(_component_icon_search, { key: 1 }))
        ])) : createCommentVNode("", true),
        _ctx.showClearBtn ? (openBlock(), createBlock(unref(IconButton), {
          key: 1,
          class: "yc-select-clear-icon",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("clear"), ["stop"]))
        })) : createCommentVNode("", true)
      ], 64));
    };
  }
});

// node_modules/yc-design-vue/es/Select/SelectIcon.vue.js
var SelectIcon = _export_sfc(_sfc_main19, [["__scopeId", "data-v-6c36ec15"]]);

// node_modules/yc-design-vue/es/List/hooks/useScrollReach.js
var useScrollReach = (options) => {
  const {
    scrollRef,
    offset,
    onReachBottom,
    onReachLeft,
    onReachRight,
    onReachTop,
    onScroll
  } = options;
  const { arrivedState } = useScroll(scrollRef, {
    onScroll: debounce((e) => {
      onScroll == null ? void 0 : onScroll(e, arrivedState);
      arrivedState.bottom && (onReachBottom == null ? void 0 : onReachBottom(e));
      arrivedState.left && (onReachLeft == null ? void 0 : onReachLeft(e));
      arrivedState.right && (onReachRight == null ? void 0 : onReachRight(e));
      arrivedState.top && (onReachTop == null ? void 0 : onReachTop(e));
    }, 50),
    offset
  });
};

// node_modules/yc-design-vue/es/_shared/icons/IconCheckboxChecked.vue.js
var _sfc_main20 = defineComponent({
  __name: "IconCheckboxChecked",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, mergeProps({
        viewBox: "0 0 1024 1024",
        fill: "currentColor"
      }, _ctx.$attrs), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", {
            d: "M877.44815445 206.10060629a64.72691371 64.72691371 0 0 0-95.14856334 4.01306852L380.73381888 685.46812814 235.22771741 533.48933518a64.72691371 64.72691371 0 0 0-92.43003222-1.03563036l-45.82665557 45.82665443a64.72691371 64.72691371 0 0 0-0.90617629 90.61767965l239.61903446 250.10479331a64.72691371 64.72691371 0 0 0 71.19960405 15.14609778 64.33855261 64.33855261 0 0 0 35.08198741-21.23042702l36.24707186-42.71976334 40.5190474-40.77795556-3.36579926-3.49525333 411.40426297-486.74638962a64.72691371 64.72691371 0 0 0-3.88361443-87.64024149l-45.3088404-45.43829334z",
            "p-id": "840"
          }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Checkbox/hooks/useContext.js
var CHECKBOX_GROUP_CONTEXT_KEY = "checkbox-group-context";
var useContext3 = () => {
  const provide$1 = (props, emits) => {
    const {
      modelValue,
      defaultValue,
      disabled,
      max,
      options: _options
    } = toRefs(props);
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
        emits("change", val);
      }
    );
    const options = computed(() => {
      return _options.value.map((item) => {
        return isObject2(item) ? item : { label: item, value: item };
      });
    });
    provide(CHECKBOX_GROUP_CONTEXT_KEY, {
      computedValue,
      max,
      disabled,
      hasGroup: ref(true)
    });
    return {
      options
    };
  };
  const inject$1 = () => {
    return inject(CHECKBOX_GROUP_CONTEXT_KEY, {
      computedValue: ref([]),
      max: ref(1e5),
      disabled: ref(false),
      hasGroup: ref(false)
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Checkbox/Checkbox.vue2.js
var _hoisted_17 = ["value", "disabled", "checked"];
var _hoisted_27 = { class: "yc-checkbox-icon" };
var _hoisted_34 = {
  key: 0,
  class: "yc-checkbox-label text-ellipsis"
};
var _sfc_main21 = defineComponent({
  ...{
    name: "Checkbox"
  },
  __name: "Checkbox",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultChecked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    value: { type: [String, Number, Boolean], default: "" },
    indeterminate: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      modelValue,
      defaultChecked,
      value: checkboxValue,
      disabled
    } = toRefs(props);
    const {
      computedValue,
      max,
      hasGroup,
      disabled: injectDisabled
    } = useContext3().inject();
    const checked = useControlValue(
      modelValue,
      defaultChecked.value,
      (val) => {
        emits("update:modelValue", val);
      }
    );
    const computedChecked = computed(() => {
      return hasGroup.value ? computedValue.value.includes(checkboxValue.value) : checked.value;
    });
    const computedDisabled = computed(() => {
      return disabled.value || injectDisabled.value || !isUndefined(max.value) && !computedChecked.value && computedValue.value.length >= max.value;
    });
    const handleCollect = (e) => {
      var _a;
      if (!hasGroup.value) {
        const curChecked = (_a = e.target) == null ? void 0 : _a.checked;
        checked.value = curChecked;
        emits("change", curChecked, e);
      } else {
        computedValue.value = computedChecked.value ? computedValue.value.filter((item) => item != checkboxValue.value) : [...computedValue.value, checkboxValue.value];
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: normalizeClass([
          "yc-checkbox",
          {
            "yc-checkbox-disabled": computedDisabled.value,
            "yc-checkbox-unchecked": !computedChecked.value && !_ctx.indeterminate,
            "yc-checkbox-indeterminate": !computedChecked.value && _ctx.indeterminate,
            "yc-checkbox-checked": computedChecked.value
          }
        ])
      }, [
        createBaseVNode("input", {
          type: "checkbox",
          class: "yc-checkbox-target",
          value: _ctx.value,
          disabled: computedDisabled.value,
          checked: computedChecked.value,
          onChange: handleCollect
        }, null, 40, _hoisted_17),
        renderSlot(_ctx.$slots, "checkbox", {
          checked: computedChecked.value,
          disabled: computedDisabled.value
        }, () => [
          createVNode(unref(IconButton), {
            "hover-size": 24,
            "hover-color": computedChecked.value || computedDisabled.value ? "transparent" : "rgb(242, 243, 245)"
          }, {
            default: withCtx(() => [
              createBaseVNode("span", _hoisted_27, [
                createVNode(unref(_sfc_main20), { size: [8, 10] })
              ])
            ]),
            _: 1
          }, 8, ["hover-color"]),
          _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_34, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])) : createCommentVNode("", true)
        ], true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Checkbox/Checkbox.vue.js
var _Checkbox = _export_sfc(_sfc_main21, [["__scopeId", "data-v-a7abd74d"]]);

// node_modules/yc-design-vue/es/Checkbox/CheckboxGroup.vue.js
var _sfc_main22 = defineComponent({
  ...{
    name: "CheckboxGroup"
  },
  __name: "CheckboxGroup",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: () => [] },
    max: { default: void 0 },
    options: { default: () => [] },
    direction: { default: "horizontal" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { options } = useContext3().provide(props, emits);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["yc-checkbox-group", `yc-checkbox-group-direction-${_ctx.direction}`])
      }, [
        renderSlot(_ctx.$slots, "default"),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(options), (item, i) => {
          return openBlock(), createBlock(_Checkbox, {
            key: i,
            value: item.value,
            disabled: item.disabled,
            indeterminate: item.indeterminate
          }, createSlots({
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "label", { data: item }, () => [
                createTextVNode(toDisplayString(item.label), 1)
              ])
            ]),
            _: 2
          }, [
            _ctx.$slots.checkbox ? {
              name: "checkbox",
              fn: withCtx((scope) => [
                renderSlot(_ctx.$slots, "checkbox", mergeProps({ ref_for: true }, scope))
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "disabled", "indeterminate"]);
        }), 128))
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Checkbox/index.js
var Checkbox = Object.assign(_Checkbox, {
  group: _sfc_main22,
  install: (app) => {
    app.component("Yc" + _Checkbox.name, _Checkbox);
    app.component("Yc" + _sfc_main22.name, _sfc_main22);
  }
});

// node_modules/yc-design-vue/es/Select/Option.vue2.js
var _hoisted_18 = {
  key: 0,
  class: "yc-select-option-icon"
};
var _hoisted_28 = {
  key: 3,
  class: "yc-select-option-suffix"
};
var _sfc_main23 = defineComponent({
  ...{
    name: "Option"
  },
  __name: "Option",
  props: {
    label: { default: "" },
    value: { type: [String, Number, Boolean, Object, Array], default: "" },
    disabled: { type: Boolean, default: false },
    tagProps: {},
    id: {},
    isFallbackOption: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { label, disabled } = toRefs(props);
    const {
      computedValue,
      multiple,
      limit,
      curIndex,
      options,
      blur,
      filterOption,
      getValue,
      emits,
      collectOption
    } = useContext2().inject();
    const contentRef = ref();
    const optionValue = computed(() => {
      return `${props.value}` ? props.value : getDomText(contentRef);
    });
    const optionLabel = computed(() => {
      return props.label ? props.label : getDomText(contentRef);
    });
    const checked = computed(() => {
      if (!multiple.value) return false;
      const index2 = computedValue.value.findIndex((item) => {
        return getValue(item) === getValue(optionValue.value);
      });
      return index2 != -1;
    });
    const handleSingle = () => {
      if (disabled.value || isUndefined(computedValue.value)) return;
      computedValue.value = optionValue.value;
      emits("select", optionValue.value);
      blur();
    };
    const handleMuti = (v) => {
      const curValue = computedValue.value;
      const { value } = optionValue;
      if (!v) {
        computedValue.value = curValue.filter((item) => item != value);
      } else {
        if (limit.value > 0 && curValue.length == limit.value) {
          return emits("exceedLimit", value);
        }
        emits("select", optionValue.value);
        computedValue.value = [...curValue, value];
      }
    };
    collectOption(props, optionLabel);
    return (_ctx, _cache) => {
      var _a;
      return withDirectives((openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-select-option",
          {
            "yc-select-option-active": ((_a = unref(options)[unref(curIndex)]) == null ? void 0 : _a.value) == optionValue.value,
            "yc-select-option-disabled": unref(disabled)
          }
        ])
      }, [
        _ctx.$slots.icon ? (openBlock(), createElementBlock("div", _hoisted_18, [
          renderSlot(_ctx.$slots, "icon", {}, void 0, true)
        ])) : createCommentVNode("", true),
        unref(multiple) ? (openBlock(), createBlock(unref(Checkbox), {
          key: 1,
          "model-value": checked.value,
          disabled: unref(disabled),
          "onUpdate:modelValue": handleMuti,
          class: "yc-select-option-content"
        }, {
          default: withCtx(() => [
            createBaseVNode("span", {
              ref_key: "contentRef",
              ref: contentRef
            }, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(toDisplayString(unref(label)), 1)
              ], true)
            ], 512)
          ]),
          _: 3
        }, 8, ["model-value", "disabled"])) : (openBlock(), createElementBlock("div", {
          key: 2,
          class: "yc-select-option-content text-ellipsis",
          ref_key: "contentRef",
          ref: contentRef,
          onClick: handleSingle
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(unref(label)), 1)
          ], true)
        ], 512)),
        _ctx.$slots.suffix ? (openBlock(), createElementBlock("div", _hoisted_28, [
          renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ], 2)), [
        [
          vShow,
          unref(filterOption)({
            ..._ctx.$props,
            label: optionLabel.value
          })
        ]
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Select/Option.vue.js
var Option = _export_sfc(_sfc_main23, [["__scopeId", "data-v-a75a2a6f"]]);

// node_modules/yc-design-vue/es/Select/SelectVirtualList.vue2.js
var _sfc_main24 = defineComponent({
  __name: "SelectVirtualList",
  props: {
    virtualListProps: {}
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const { virtualListProps } = toRefs(props);
    const { fieldKey, renderOptions, slots, emits } = useContext2().inject();
    const { list, wrapperProps, containerProps } = useVirtualList(renderOptions, {
      overscan: ((_a = virtualListProps.value) == null ? void 0 : _a.buffer) ?? 10,
      itemHeight: ((_b = virtualListProps.value) == null ? void 0 : _b.itemHeight) || 36
    });
    const renderLabel = (option) => {
      if (slots.option) {
        return () => {
          var _a2;
          return ((_a2 = slots.option) == null ? void 0 : _a2.call(slots, {
            data: option
          })) || [];
        };
      }
      const { render: render2, label } = fieldKey.value;
      return option[render2] ? getSlotFunction(option[render2]) : getSlotFunction(option[label]);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({ class: "yc-select-dropdown-virtual-list" }, unref(containerProps)), [
        createBaseVNode("div", mergeProps({ class: "yc-select-dropdown-list" }, unref(wrapperProps)), [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(list), ({ data: v }) => {
            return openBlock(), createBlock(unref(Option), {
              key: v[unref(fieldKey).value],
              value: v[unref(fieldKey).value],
              disabled: v[unref(fieldKey).disabled],
              "is-fallback-option": v[unref(fieldKey).isFallbackOption]
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(renderLabel(v))))
              ]),
              _: 2
            }, 1032, ["value", "disabled", "is-fallback-option"]);
          }), 128))
        ], 16)
      ], 16);
    };
  }
});

// node_modules/yc-design-vue/es/Select/SelectVirtualList.vue.js
var SelectVirtualList = _export_sfc(_sfc_main24, [["__scopeId", "data-v-79815f72"]]);

// node_modules/yc-design-vue/es/Select/Optgroup.vue2.js
var _hoisted_19 = { class: "yc-option-group-label text-ellipsis" };
var _sfc_main25 = defineComponent({
  ...{
    name: "Optgroup"
  },
  __name: "Optgroup",
  props: {
    label: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_19, [
          renderSlot(_ctx.$slots, "label", {}, () => [
            createTextVNode(toDisplayString(_ctx.label), 1)
          ], true)
        ]),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 64);
    };
  }
});

// node_modules/yc-design-vue/es/Select/Optgroup.vue.js
var Optgroup = _export_sfc(_sfc_main25, [["__scopeId", "data-v-eee8bfd4"]]);

// node_modules/yc-design-vue/es/Scrollbar/hooks/useContext.js
var SCROLLBAR_CONTEXT_KEY = "scrollbar-context";
var useContext4 = () => {
  const provide$1 = (params) => {
    provide(SCROLLBAR_CONTEXT_KEY, params);
  };
  const inject$1 = () => {
    return inject(SCROLLBAR_CONTEXT_KEY, {
      curTop: ref(0),
      curLeft: ref(0),
      movableLeft: ref(0),
      movableTop: ref(0),
      thumbHeight: ref(0),
      thumbWidth: ref(0),
      scrollRef: ref(),
      isDragging: ref(false)
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Scrollbar/ScrollbarTrack.vue2.js
var _sfc_main26 = defineComponent({
  __name: "ScrollbarTrack",
  props: {
    direction: { default: "vertical" }
  },
  emits: ["drag", "resize"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { direction } = toRefs(props);
    const {
      scrollRef,
      thumbHeight,
      thumbWidth,
      movableLeft,
      movableTop,
      curTop,
      curLeft,
      isDragging: _isDragging
    } = useContext4().inject();
    const isVertical = computed(() => direction.value == "vertical");
    const thmubStyle = computed(() => {
      return isVertical.value ? {
        height: valueToPx(thumbHeight.value),
        transform: `translateY(${valueToPx(curTop.value)})`
      } : {
        width: valueToPx(thumbWidth.value),
        transform: `translateX(${valueToPx(curLeft.value)})`
      };
    });
    const trackRef = ref();
    useResizeObserver(trackRef, () => {
      const { width, height } = trackRef.value.getBoundingClientRect();
      emits("resize", isVertical.value ? width : height);
    });
    const dragRef = ref();
    const { x, y, isDragging } = useDraggable(dragRef, {
      onMove() {
        const { left, top } = scrollRef.value.getBoundingClientRect();
        const minTop = top;
        const maxTop = movableTop.value + minTop;
        const minLeft = left;
        const maxLeft = movableLeft.value + minLeft;
        if (isVertical.value) {
          y.value = y.value <= minTop ? minTop : y.value;
          y.value = y.value >= maxTop ? maxTop : y.value;
          emits("drag", true, y.value - minTop);
        } else {
          x.value = x.value <= minLeft ? minLeft : x.value;
          x.value = x.value >= maxLeft ? maxLeft : x.value;
          emits("drag", false, x.value - minLeft);
        }
      }
    });
    watchEffect(() => {
      _isDragging.value = isDragging.value;
    });
    const handleClick = (e) => {
      const { offsetX, offsetY } = e;
      if (isVertical.value) {
        const moveDistance = curTop.value < offsetY ? movableTop.value / 9 : -movableTop.value / 9;
        let value = curTop.value + moveDistance;
        value = value <= 0 ? 0 : value;
        value = value > movableTop.value ? movableTop.value : value;
        emits("drag", true, value);
      } else {
        const moveDistance = curLeft.value < offsetX ? movableLeft.value / 9 : -movableLeft.value / 9;
        let value = curLeft.value + moveDistance;
        value = value <= 0 ? 0 : value;
        value = value > movableLeft.value ? movableLeft.value : value;
        emits("drag", false, value);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["yc-scrollbar-track", `yc-scrollbar-track-direction-${unref(direction)}`]),
        ref_key: "trackRef",
        ref: trackRef,
        onClick: withModifiers(handleClick, ["self"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass([
            "yc-scrollbar-thumb",
            `yc-scrollbar-thumb-direction-${unref(direction)}`
          ]),
          style: normalizeStyle(thmubStyle.value),
          ref_key: "dragRef",
          ref: dragRef
        }, [
          createBaseVNode("div", {
            class: normalizeClass([
              "yc-scrollbar-thumb-bar",
              {
                "yc-scrollbar-thumb-bar-dragging": unref(isDragging),
                "yc-scrollbar-thumb-bar-hover": !unref(isDragging) && unref(_isDragging)
              }
            ])
          }, null, 2)
        ], 6)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Scrollbar/ScrollbarTrack.vue.js
var ScrollbarTrack = _export_sfc(_sfc_main26, [["__scopeId", "data-v-153cb12b"]]);

// node_modules/yc-design-vue/es/Scrollbar/Scrollbar.vue2.js
var _sfc_main27 = defineComponent({
  ...{
    name: "Scrollbar",
    inheritAttrs: false
  },
  __name: "Scrollbar",
  props: {
    type: { default: "embed" },
    outerClass: { default: "" },
    outerStyle: { default: () => {
      return {};
    } },
    scrollbar: { type: Boolean, default: true }
  },
  emits: ["scroll"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { type, scrollbar } = toRefs(props);
    const contentRef = ref();
    const scrollRef = ref();
    const contentWidth = ref(0);
    const contentHeight = ref(0);
    useResizeObserver(contentRef, () => {
      const { offsetWidth, offsetHeight } = contentRef.value;
      contentWidth.value = offsetWidth;
      contentHeight.value = offsetHeight;
    });
    const {
      hasVerticalBar = ref(false),
      hashorizontalBar = ref(false),
      trackHeight = ref(0),
      trackWidth = ref(0),
      scrollWidth,
      scrollHeight,
      curLeft,
      curTop,
      movableLeft,
      movableTop
    } = initScrollbar();
    const handleScroll = (e) => {
      const {
        scrollTop,
        scrollLeft,
        scrollWidth: _scrollWidth,
        scrollHeight: _scrollHeight
      } = e.target;
      emits("scroll", scrollLeft, scrollTop, e);
      if (!scrollbar.value) {
        return;
      }
      const top = scrollTop / (contentHeight.value - scrollHeight.value) * movableTop.value;
      curTop.value = top <= movableTop.value ? top : movableTop.value;
      const left = scrollLeft / (contentWidth.value - scrollWidth.value) * movableLeft.value;
      curLeft.value = left <= movableLeft.value ? left : movableLeft.value;
    };
    const handleDrag = (isVertical, value) => {
      if (isVertical) {
        curTop.value = value;
        const maxScrollbarMoveTop = contentHeight.value - scrollHeight.value;
        const scrollTop = curTop.value / movableTop.value * maxScrollbarMoveTop;
        scrollRef.value.scrollTop = scrollTop >= maxScrollbarMoveTop ? maxScrollbarMoveTop : scrollTop;
      } else {
        curLeft.value = value;
        const maxScrollbarMoveLeft = contentWidth.value - scrollWidth.value;
        const scrollLeft = curLeft.value / movableLeft.value * maxScrollbarMoveLeft;
        scrollRef.value.scrollLeft = scrollLeft >= maxScrollbarMoveLeft ? maxScrollbarMoveLeft : scrollLeft;
      }
    };
    function initScrollbar() {
      if (!scrollbar.value)
        return {
          hasVerticalBar: ref(false),
          hashorizontalBar: ref(false),
          trackHeight: ref(0),
          trackWidth: ref(0),
          contentWidth: ref(0),
          contentHeight: ref(0),
          scrollWidth: ref(0),
          scrollHeight: ref(0),
          curLeft: ref(0),
          curTop: ref(0),
          movableLeft: ref(0),
          movableTop: ref(0)
        };
      const trackWidth2 = ref(0);
      const trackHeight2 = ref(0);
      const { width: scrollWidth2, height: scrollHeight2 } = useElementSize(
        scrollRef,
        void 0,
        {
          box: "border-box"
        }
      );
      const curTop2 = ref(0);
      const curLeft2 = ref(0);
      const hasVerticalBar2 = computed(() => {
        const style = scrollRef.value ? getComputedStyle(scrollRef.value) : { overflowY: "", overflow: "" };
        const overflowY = style.overflowY;
        const overflow = style.overflow;
        const allowScroll = ["auto", "scroll"];
        return contentHeight.value > scrollHeight2.value && (allowScroll.includes(overflowY) || allowScroll.includes(overflow));
      });
      const hashorizontalBar2 = computed(() => {
        const style = scrollRef.value ? getComputedStyle(scrollRef.value) : { overflowX: "", overflow: "" };
        const overflowX = style.overflowX;
        const overflow = style.overflow;
        const allowScroll = ["auto", "scroll"];
        return contentWidth.value > scrollWidth2.value && (allowScroll.includes(overflowX) || allowScroll.includes(overflow));
      });
      const thumbHeight = computed(() => {
        if (!hasVerticalBar2.value) return 0;
        const height = +(scrollHeight2.value * scrollHeight2.value / contentHeight.value).toFixed(0);
        return height <= 20 ? 20 : height;
      });
      const thumbWidth = computed(() => {
        if (!hashorizontalBar2.value) return 0;
        const width = +(scrollWidth2.value * scrollWidth2.value / contentWidth.value).toFixed(0);
        return width <= 20 ? 20 : width;
      });
      const movableTop2 = computed(() => {
        const track = hashorizontalBar2.value ? trackHeight2.value : 0;
        return scrollHeight2.value - thumbHeight.value - track;
      });
      const movableLeft2 = computed(() => {
        const track = hasVerticalBar2.value ? trackWidth2.value : 0;
        return scrollWidth2.value - thumbWidth.value - track;
      });
      useContext4().provide({
        curLeft: curLeft2,
        curTop: curTop2,
        movableLeft: movableLeft2,
        movableTop: movableTop2,
        thumbHeight,
        thumbWidth,
        scrollRef,
        isDragging: ref(false)
      });
      return {
        hasVerticalBar: hasVerticalBar2,
        hashorizontalBar: hashorizontalBar2,
        trackWidth: trackWidth2,
        trackHeight: trackHeight2,
        contentHeight,
        contentWidth,
        scrollHeight: scrollHeight2,
        scrollWidth: scrollWidth2,
        movableLeft: movableLeft2,
        movableTop: movableTop2,
        curTop: curTop2,
        curLeft: curLeft2
      };
    }
    __expose({
      scrollTo(options) {
        var _a;
        (_a = scrollRef.value) == null ? void 0 : _a.scrollTo(options);
      },
      scrollLeft(left) {
        var _a;
        (_a = scrollRef.value) == null ? void 0 : _a.scrollTo({
          left
        });
      },
      scrollTop(top) {
        var _a;
        (_a = scrollRef.value) == null ? void 0 : _a.scrollTo({
          top
        });
      },
      getScrollRef() {
        return scrollRef.value;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-scrollbar",
          _ctx.outerClass,
          {
            "yc-scrollbar-both-track": unref(type) == "track" && unref(hasVerticalBar) && unref(hashorizontalBar),
            "yc-scrollbar-vertical-track": unref(type) == "track" && unref(hasVerticalBar),
            "yc-scrollbar-horizontal-track": unref(type) == "track" && unref(hashorizontalBar),
            "yc-scrollbar-real": !unref(scrollbar)
          }
        ]),
        style: normalizeStyle(_ctx.outerStyle)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["yc-scrollbar-container", _ctx.$attrs.class]),
          style: normalizeStyle(_ctx.$attrs.style),
          ref_key: "scrollRef",
          ref: scrollRef,
          onScroll: handleScroll
        }, [
          createBaseVNode("div", {
            class: "yc-scrollbar-content",
            ref_key: "contentRef",
            ref: contentRef
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 512)
        ], 38),
        unref(hasVerticalBar) ? (openBlock(), createBlock(ScrollbarTrack, {
          key: 0,
          direction: "vertical",
          onDrag: handleDrag,
          onResize: _cache[0] || (_cache[0] = (val) => trackWidth.value = val)
        })) : createCommentVNode("", true),
        unref(hashorizontalBar) ? (openBlock(), createBlock(ScrollbarTrack, {
          key: 1,
          direction: "horizontal",
          onDrag: handleDrag,
          onResize: _cache[1] || (_cache[1] = (val) => trackHeight.value = val)
        })) : createCommentVNode("", true)
      ], 6);
    };
  }
});

// node_modules/yc-design-vue/es/Scrollbar/Scrollbar.vue.js
var _Scrollbar = _export_sfc(_sfc_main27, [["__scopeId", "data-v-f20de904"]]);

// node_modules/yc-design-vue/es/Scrollbar/index.js
var Scrollbar = Object.assign(_Scrollbar, {
  install: (app) => {
    app.component("Yc" + _Scrollbar.name, _Scrollbar);
  }
});

// node_modules/yc-design-vue/es/Select/SelectRealList.vue2.js
var _hoisted_110 = { class: "yc-select-dropdown-list" };
var _sfc_main28 = defineComponent({
  __name: "SelectRealList",
  props: {
    scrollbar: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    const { fieldKey, renderOptions, slots, emits } = useContext2().inject();
    const scrollbarRef = ref();
    const renderLabel = (option) => {
      if (slots.option) {
        return () => {
          var _a;
          return ((_a = slots.option) == null ? void 0 : _a.call(slots, {
            data: option
          })) || [];
        };
      }
      const { render: render2, label } = fieldKey.value;
      return getSlotFunction(option[render2] ? option[render2] : option[label]);
    };
    __expose({
      getScrollRef() {
        var _a;
        return (_a = scrollbarRef.value) == null ? void 0 : _a.getScrollRef();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Scrollbar), {
        scrollbar: _ctx.scrollbar,
        class: "yc-select-dropdown-list-wrapper"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_110, [
            (openBlock(), createBlock(resolveDynamicComponent(unref(slots).default))),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(renderOptions), (option) => {
              return openBlock(), createElementBlock(Fragment, {
                key: option.id
              }, [
                option.isGroup ? (openBlock(), createBlock(Optgroup, {
                  key: 0,
                  label: option.label
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(option.options, (v) => {
                      return openBlock(), createBlock(Option, {
                        key: v[unref(fieldKey).value],
                        value: v[unref(fieldKey).value],
                        disabled: v[unref(fieldKey).disabled],
                        "tag-props": v[unref(fieldKey).tagProps],
                        "is-fallback-option": v[unref(fieldKey).isFallbackOption]
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(renderLabel(v))))
                        ]),
                        _: 2
                      }, 1032, ["value", "disabled", "tag-props", "is-fallback-option"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["label"])) : (openBlock(), createBlock(Option, {
                  key: 1,
                  value: option[unref(fieldKey).value],
                  disabled: option[unref(fieldKey).disabled],
                  "tag-props": option[unref(fieldKey).tagProps],
                  "is-fallback-option": option[unref(fieldKey).isFallbackOption]
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(renderLabel(option))))
                  ]),
                  _: 2
                }, 1032, ["value", "disabled", "tag-props", "is-fallback-option"]))
              ], 64);
            }), 128))
          ])
        ]),
        _: 1
      }, 8, ["scrollbar"]);
    };
  }
});

// node_modules/yc-design-vue/es/Select/SelectRealList.vue.js
var SelectRealList = _export_sfc(_sfc_main28, [["__scopeId", "data-v-5c59943b"]]);

// node_modules/yc-design-vue/es/Select/SelectView.vue2.js
var _hoisted_111 = { class: "yc-select-dropdown" };
var _hoisted_29 = {
  key: 0,
  class: "yc-select-dropdown-header"
};
var _hoisted_35 = {
  key: 4,
  class: "yc-select-dropdown-footer"
};
var _sfc_main29 = defineComponent({
  __name: "SelectView",
  props: {
    loading: { type: Boolean },
    scrollbar: { type: Boolean },
    showFooterOnEmpty: { type: Boolean },
    showHeaderOnEmpty: { type: Boolean },
    virtualListProps: {}
  },
  setup(__props) {
    const props = __props;
    const { virtualListProps } = toRefs(props);
    const { slots, options, isEmpty, emits } = useContext2().inject();
    const { renderEmpty } = getGlobalConfig();
    const realListRef = ref();
    const virtualListRef = ref();
    const isVirtualList = computed(() => {
      if (!virtualListProps.value) {
        return false;
      }
      return virtualListProps.value.itemHeight && (!virtualListProps.value.threshold || virtualListProps.value.threshold > options.value.length);
    });
    const scrollRef = computed(() => {
      var _a;
      return isVirtualList.value ? unrefElement(virtualListRef) : (_a = realListRef.value) == null ? void 0 : _a.getScrollRef();
    });
    useScrollReach({
      scrollRef,
      onScroll: (e) => {
        emits("dropdown-scroll", e);
      },
      onReachBottom: (e) => {
        emits("dropdown-reach-bottom", e);
      }
    });
    const renderSlots = (name) => {
      return slots[name];
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_111, [
        _ctx.loading ? (openBlock(), createBlock(unref(Spin), {
          key: 0,
          loading: _ctx.loading,
          class: "yc-select-dropdown-loading"
        }, createSlots({ _: 2 }, [
          _ctx.$slots["loading-icon"] ? {
            name: "icon",
            fn: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(renderSlots("loading-icon"))))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["loading"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(slots).header && (_ctx.showHeaderOnEmpty || !unref(isEmpty)) ? (openBlock(), createElementBlock("div", _hoisted_29, [
            (openBlock(), createBlock(resolveDynamicComponent(renderSlots("header"))))
          ])) : createCommentVNode("", true),
          isVirtualList.value ? (openBlock(), createBlock(SelectVirtualList, {
            key: 1,
            "virtual-list-props": unref(virtualListProps),
            ref_key: "virtualListRef",
            ref: virtualListRef
          }, null, 8, ["virtual-list-props"])) : (openBlock(), createBlock(SelectRealList, {
            key: 2,
            scrollbar: _ctx.scrollbar,
            ref_key: "realListRef",
            ref: realListRef
          }, null, 8, ["scrollbar"])),
          unref(isEmpty) ? (openBlock(), createBlock(resolveDynamicComponent(unref(slots).empty || unref(renderEmpty)("Select")), { key: 3 })) : createCommentVNode("", true),
          unref(slots).footer && (_ctx.showFooterOnEmpty || !unref(isEmpty)) ? (openBlock(), createElementBlock("div", _hoisted_35, [
            (openBlock(), createBlock(resolveDynamicComponent(renderSlots("footer"))))
          ])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Select/SelectView.vue.js
var SelectView = _export_sfc(_sfc_main29, [["__scopeId", "data-v-a3636179"]]);

// node_modules/yc-design-vue/es/Input/hooks/useCursor.js
var useCursor = (input) => {
  const selectionRef = ref();
  function recordCursor() {
    if (!input.value) return;
    const { selectionStart, selectionEnd, value } = input.value;
    if (selectionStart == null || selectionEnd == null) return;
    const beforeTxt = value.slice(0, Math.max(0, selectionStart));
    const afterTxt = value.slice(Math.max(0, selectionEnd));
    selectionRef.value = {
      selectionStart,
      selectionEnd,
      value,
      beforeTxt,
      afterTxt
    };
  }
  function getCursor() {
    if (!input.value || !selectionRef.value) return;
    const { value } = input.value;
    const { beforeTxt, afterTxt, selectionStart } = selectionRef.value;
    if (!beforeTxt || !afterTxt || !selectionStart) return;
    let startPos = value.length;
    if (value.endsWith(afterTxt)) {
      startPos = value.length - afterTxt.length;
    } else if (value.startsWith(beforeTxt)) {
      startPos = beforeTxt.length;
    } else {
      const beforeLastChar = beforeTxt[selectionStart - 1];
      const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
      if (newIndex !== -1) {
        startPos = newIndex + 1;
      }
    }
    return startPos;
  }
  function setCursor() {
    var _a;
    const startPos = getCursor();
    if (!startPos) return;
    (_a = input.value) == null ? void 0 : _a.setSelectionRange(startPos, startPos);
  }
  return {
    recordCursor,
    setCursor,
    getCursor,
    selectionRef
  };
};

// node_modules/yc-design-vue/es/Input/hooks/useLimitedInput.js
var useLimitedInput = (params) => {
  const { props, emits, inputRef } = params;
  const {
    modelValue,
    defaultValue,
    disabled,
    readonly: readonly2,
    allowClear,
    error: _error,
    showWordLimit: _showWordLimit,
    maxLength: _maxLength
  } = toRefs(props);
  const { wordLength, wordSlice } = props;
  const { setCursor, recordCursor } = useCursor(inputRef);
  const maxLength = computed(() => {
    var _a;
    return isNumber(_maxLength.value) ? _maxLength.value : (_a = _maxLength.value) == null ? void 0 : _a.length;
  });
  const maxLengthErrorOnly = computed(() => {
    var _a;
    return isNumber(_maxLength.value) ? false : (_a = _maxLength.value) == null ? void 0 : _a.errorOnly;
  });
  const error = useControlValue(_error, false);
  const computedValue = useControlValue(
    modelValue,
    defaultValue.value,
    (val) => {
      emits("update:modelValue", val);
    }
  );
  const showWordLimit = computed(() => {
    return isNumber(maxLength.value) && _showWordLimit.value;
  });
  const showClearBtn = computed(() => {
    return allowClear.value && !disabled.value && !readonly2.value && !!computedValue.value.length;
  });
  let wordLengthMax = 0;
  const curLength = computed(() => {
    return getValueLength(computedValue.value);
  });
  const isComposition = ref(false);
  const recordWordMaxLength = () => {
    if (curLength.value == maxLength.value) {
      wordLengthMax = computedValue.value.length;
    }
  };
  function getValueLength(value) {
    if (isFunction(wordLength)) {
      return wordLength(value);
    }
    return (value == null ? void 0 : value.length) || 0;
  }
  const keepControl = async () => {
    recordCursor();
    await nextTick();
    if (inputRef.value && computedValue.value !== inputRef.value.value) {
      inputRef.value.value = computedValue.value;
      setCursor();
    }
  };
  const updateValue = (value, e) => {
    if (maxLength.value && getValueLength(value) > maxLength.value) {
      if (!maxLengthErrorOnly.value) {
        computedValue.value = wordSlice(value, wordLengthMax);
      } else {
        computedValue.value = value;
        error.value = true;
      }
    } else {
      computedValue.value = value;
    }
    emits("input", value, e);
    keepControl();
  };
  const handleComposition = (e) => {
    const { value, selectionStart, selectionEnd } = e.target;
    isComposition.value = e.type !== "compositionend";
    if (isComposition.value) {
      if (isUndefined(maxLength.value)) {
        emits("input", value, e);
        computedValue.value = value;
      }
      return;
    }
    if (maxLength.value && !maxLengthErrorOnly.value && curLength.value >= maxLength.value && getValueLength(value) > maxLength.value && selectionStart === selectionEnd) {
      return keepControl();
    }
    updateValue(value, e);
  };
  const handleInput = async (e) => {
    const { value } = e.target;
    if (isComposition.value) {
      return;
    }
    recordWordMaxLength();
    if (maxLength.value && !maxLengthErrorOnly.value && curLength.value >= maxLength.value && getValueLength(value) > maxLength.value && e.inputType === "insertText") {
      return keepControl();
    }
    updateValue(value, e);
  };
  return {
    computedValue,
    showClearBtn,
    showWordLimit,
    curLength,
    error,
    disabled,
    maxLength,
    handleInput,
    handleComposition
  };
};

// node_modules/yc-design-vue/es/_shared/components/PreventFocus.vue.js
var _sfc_main30 = defineComponent({
  __name: "PreventFocus",
  props: {
    preventFocus: { type: Boolean, default: true },
    tag: { default: "div" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        onMousedown: _cache[0] || (_cache[0] = (e) => _ctx.preventFocus && e.preventDefault())
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 32);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconEyeClose.vue2.js
var _sfc_main31 = defineComponent({
  __name: "IconEyeClose",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", {
            d: "M24 37c6.627 0 12.627-4.333 18-13-5.373-8.667-11.373-13-18-13-6.627 0-12.627 4.333-18 13 5.373 8.667 11.373 13 18 13Z",
            "clip-rule": "evenodd"
          }, null, -1),
          createBaseVNode("path", { d: "M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconEyeOpen.vue2.js
var _sfc_main32 = defineComponent({
  __name: "IconEyeOpen",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M14 14.5c-2.69 2-5.415 5.33-8 9.5 5.373 8.667 11.373 13 18 13 3.325 0 6.491-1.09 9.5-3.271M17.463 12.5C19 11 21.75 11 24 11c6.627 0 12.627 4.333 18 13-1.766 2.848-3.599 5.228-5.5 7.14" }, null, -1),
          createBaseVNode("path", { d: "M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM6.852 7.103l34.294 34.294" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Input/InputSuffix.vue2.js
var _hoisted_112 = {
  key: 0,
  class: "yc-input-word-limit"
};
var _sfc_main33 = defineComponent({
  __name: "InputSuffix",
  props: {
    curLength: {},
    maxLength: {},
    showWordLimit: { type: Boolean },
    computedVisibility: { type: Boolean },
    isPassword: { type: Boolean },
    invisibleButton: { type: Boolean }
  },
  emits: ["clear", "visibilityChange"],
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main30), { class: "yc-input-suffix" }, {
        default: withCtx(() => [
          _ctx.showWordLimit ? (openBlock(), createElementBlock("div", _hoisted_112, toDisplayString(_ctx.curLength) + "/" + toDisplayString(_ctx.maxLength), 1)) : createCommentVNode("", true),
          _ctx.isPassword && _ctx.invisibleButton ? (openBlock(), createBlock(unref(IconButton), {
            key: 1,
            size: 14,
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("visibilityChange", !_ctx.computedVisibility))
          }, {
            default: withCtx(() => [
              _ctx.computedVisibility ? (openBlock(), createBlock(unref(_sfc_main32), { key: 0 })) : (openBlock(), createBlock(unref(_sfc_main31), { key: 1 }))
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.$slots.suffix ? renderSlot(_ctx.$slots, "suffix", { key: 2 }, void 0, true) : createCommentVNode("", true)
        ]),
        _: 3
      });
    };
  }
});

// node_modules/yc-design-vue/es/Input/InputSuffix.vue.js
var InputSuffix = _export_sfc(_sfc_main33, [["__scopeId", "data-v-7922ddd3"]]);

// node_modules/yc-design-vue/es/Input/Input.vue2.js
var _hoisted_113 = ["value", "type", "disabled", "readonly", "placeholder"];
var _sfc_main34 = defineComponent({
  ...{
    name: "Input"
  },
  __name: "Input",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: "" },
    size: { default: void 0 },
    allowClear: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    error: { type: Boolean, default: void 0 },
    placeholder: { default: "" },
    maxLength: { default: void 0 },
    wordLength: { type: Function, default: (value) => {
      return value.length;
    } },
    wordSlice: { type: Function, default: (value, maxLength) => {
      return value.slice(0, maxLength);
    } },
    showWordLimit: { type: Boolean, default: false },
    inputAttrs: { default: () => {
      return {};
    } },
    isPassword: { type: Boolean, default: false },
    visibility: { type: Boolean, default: void 0 },
    defaultVisibility: { type: Boolean, default: false },
    invisibleButton: { type: Boolean, default: true },
    showInput: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:visibility", "input", "change", "visibility-change", "pressEnter", "keydown", "clear", "focus", "blur"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { visibility, defaultVisibility } = toRefs(props);
    const { size } = getGlobalConfig(props);
    const inputRef = ref();
    const computedVisibility = useControlValue(
      visibility,
      defaultVisibility.value,
      (val) => {
        emits("update:visibility", val);
        emits("visibility-change", val);
      }
    );
    const type = computed(() => {
      return computedVisibility.value ? "password" : "text";
    });
    const {
      computedValue,
      showWordLimit,
      showClearBtn,
      curLength,
      maxLength,
      error,
      handleInput,
      handleComposition
    } = useLimitedInput({
      props,
      emits,
      inputRef
    });
    const handleEvent = async (type2, e) => {
      switch (type2) {
        case "input":
          {
            handleInput(e);
          }
          break;
        case "change":
          {
            emits("change", computedValue.value, e);
          }
          break;
        case "focus":
        case "blur":
          {
            emits(type2, e);
          }
          break;
        case "clear":
          {
            computedValue.value = "";
            emits("clear", e);
          }
          break;
        case "keydown":
          {
            const ev = e;
            emits("keydown", ev);
            ev.key == "Enter" && emits("pressEnter", ev);
          }
          break;
      }
    };
    __expose({
      focus() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      },
      blur() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.blur();
      },
      getInputRef() {
        return inputRef.value;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-input-outer",
          `yc-input-size-${unref(size)}`,
          {
            "yc-input-disabled": _ctx.disabled,
            "yc-input-error": unref(error),
            "yc-input-has-prepend": _ctx.$slots.prepend,
            "yc-input-has-append": _ctx.$slots.append
          }
        ])
      }, [
        _ctx.$slots.prepend ? (openBlock(), createBlock(unref(_sfc_main30), {
          key: 0,
          class: "yc-input-prepend"
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "prepend", {}, void 0, true)
          ]),
          _: 3
        })) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(["yc-input-wrapper", { "yc-input-wrapper-disabled": _ctx.disabled }])
        }, [
          _ctx.$slots.prefix ? (openBlock(), createBlock(unref(_sfc_main30), {
            key: 0,
            class: "yc-input-prefix"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
            ]),
            _: 3
          })) : createCommentVNode("", true),
          withDirectives(createBaseVNode("input", mergeProps({
            value: unref(computedValue),
            type: type.value,
            disabled: _ctx.disabled,
            readonly: _ctx.readonly,
            placeholder: _ctx.placeholder
          }, _ctx.inputAttrs, {
            class: "yc-input",
            ref_key: "inputRef",
            ref: inputRef,
            onInput: _cache[0] || (_cache[0] = ($event) => handleEvent("input", $event)),
            onChange: _cache[1] || (_cache[1] = ($event) => handleEvent("change", $event)),
            onCompositionstart: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => unref(handleComposition) && unref(handleComposition)(...args)),
            onCompositionupdate: _cache[3] || (_cache[3] = //@ts-ignore
            (...args) => unref(handleComposition) && unref(handleComposition)(...args)),
            onCompositionend: _cache[4] || (_cache[4] = //@ts-ignore
            (...args) => unref(handleComposition) && unref(handleComposition)(...args)),
            onFocus: _cache[5] || (_cache[5] = ($event) => handleEvent("focus", $event)),
            onBlur: _cache[6] || (_cache[6] = ($event) => handleEvent("blur", $event)),
            onKeydown: _cache[7] || (_cache[7] = withKeys(($event) => handleEvent("keydown", $event), ["enter"]))
          }), null, 16, _hoisted_113), [
            [vShow, !_ctx.$slots.label || _ctx.$slots.label && _ctx.showInput]
          ]),
          _ctx.$slots.label ? withDirectives((openBlock(), createBlock(unref(_sfc_main30), {
            key: 1,
            class: "yc-input text-ellipsis"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "label", {}, void 0, true)
            ]),
            _: 3
          }, 512)), [
            [vShow, !_ctx.showInput]
          ]) : createCommentVNode("", true),
          unref(showClearBtn) ? (openBlock(), createBlock(unref(IconButton), {
            key: 2,
            class: "yc-input-clear-button",
            onClick: _cache[8] || (_cache[8] = ($event) => handleEvent("clear", $event))
          })) : createCommentVNode("", true),
          _ctx.$slots.suffix || unref(showWordLimit) || _ctx.isPassword && _ctx.invisibleButton ? (openBlock(), createBlock(InputSuffix, {
            key: 3,
            "cur-length": unref(curLength),
            "max-length": unref(maxLength),
            "computed-value": unref(computedValue),
            "show-word-limit": unref(showWordLimit),
            "computed-visibility": unref(computedVisibility),
            "invisible-button": _ctx.invisibleButton,
            "is-password": _ctx.isPassword,
            onVisibilityChange: _cache[9] || (_cache[9] = (v) => computedVisibility.value = v)
          }, createSlots({ _: 2 }, [
            _ctx.$slots.suffix ? {
              name: "suffix",
              fn: withCtx(() => [
                renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["cur-length", "max-length", "computed-value", "show-word-limit", "computed-visibility", "invisible-button", "is-password"])) : createCommentVNode("", true)
        ], 2),
        _ctx.$slots.append ? (openBlock(), createBlock(unref(_sfc_main30), {
          key: 1,
          class: "yc-input-append"
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "append", {}, void 0, true)
          ]),
          _: 3
        })) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Input/Input.vue.js
var _Input = _export_sfc(_sfc_main34, [["__scopeId", "data-v-4ec92c2e"]]);

// node_modules/yc-design-vue/es/Input/index.js
var Input = Object.assign(_Input, {
  install: (app) => {
    app.component("Yc" + _Input.name, _Input);
  }
});

// node_modules/yc-design-vue/es/Tag/index.vue2.js
var _hoisted_114 = {
  key: 0,
  class: "yc-tag-icon"
};
var _hoisted_210 = { class: "yc-tag-label" };
var _sfc_main35 = defineComponent({
  ...{
    name: "Tag"
  },
  __name: "index",
  props: {
    color: { default: "default" },
    size: { default: void 0 },
    bordered: { type: Boolean, default: false },
    visible: { type: Boolean, default: void 0 },
    defaultVisible: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    closable: { type: Boolean, default: false },
    checkable: { type: Boolean, default: false },
    checked: { type: Boolean, default: void 0 },
    defaultChecked: { type: Boolean, default: true },
    nowrap: { type: Boolean, default: false }
  },
  emits: ["update:visible", "update:checked", "close", "check"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { visible, defaultVisible, checked, defaultChecked, checkable, color } = toRefs(props);
    const { size } = getGlobalConfig(props);
    const computedVisible = useControlValue(
      visible,
      defaultVisible.value,
      (val) => emits("update:visible", val)
    );
    const computedChecked = useControlValue(
      checked,
      defaultChecked.value,
      (val) => emits("update:checked", val)
    );
    const background = computed(() => {
      return TAG_PRESET_COLORS.includes(color.value) ? "" : color.value;
    });
    const handleEvent = (type, ev) => {
      if (type == "close") {
        computedVisible.value = false;
        emits("close", ev);
      } else if (type == "check" && checkable.value) {
        computedChecked.value = !computedChecked.value;
        emits("check", computedChecked.value, ev);
      }
    };
    return (_ctx, _cache) => {
      return unref(computedVisible) ? (openBlock(), createElementBlock("label", {
        key: 0,
        class: normalizeClass([
          "yc-tag",
          `yc-tag-color-${unref(color)}`,
          `yc-tag-size-${["small", "medium", "large"].includes(unref(size)) ? unref(size) : "medium"}`,
          unref(TAG_PRESET_COLORS).includes(unref(color)) ? "yc-tag-preset-color" : "yc-tag-custom-color",
          _ctx.nowrap ? "yc-tag-no-wrap" : "yc-tag-wrap",
          {
            "yc-tag-loading": _ctx.loading,
            "yc-tag-bordered": _ctx.bordered,
            "yc-tag-checked": unref(computedChecked),
            "yc-tag-checkable": unref(checkable)
          }
        ]),
        style: normalizeStyle({
          background: background.value
        }),
        onClick: _cache[1] || (_cache[1] = ($event) => handleEvent("check", $event))
      }, [
        _ctx.$slots.icon ? (openBlock(), createElementBlock("div", _hoisted_114, [
          renderSlot(_ctx.$slots, "icon", {}, void 0, true)
        ])) : createCommentVNode("", true),
        createBaseVNode("span", _hoisted_210, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _ctx.closable ? (openBlock(), createBlock(unref(IconButton), {
          key: 1,
          "hover-size": 16,
          "hover-color": "rgba(255, 255, 255, 0.2)",
          class: "yc-tag-close-button",
          onClick: _cache[0] || (_cache[0] = ($event) => handleEvent("close", $event))
        }, {
          default: withCtx(() => [
            _ctx.$slots["close-icon"] ? renderSlot(_ctx.$slots, "close-icon", { key: 0 }, void 0, true) : createCommentVNode("", true)
          ]),
          _: 3
        })) : createCommentVNode("", true),
        _ctx.loading ? (openBlock(), createBlock(unref(Spin), {
          key: 2,
          size: 12,
          class: "yc-tag-loading-icon"
        })) : createCommentVNode("", true)
      ], 6)) : createCommentVNode("", true);
    };
  }
});

// node_modules/yc-design-vue/es/Tag/index.vue.js
var _Tag = _export_sfc(_sfc_main35, [["__scopeId", "data-v-1f61a919"]]);

// node_modules/yc-design-vue/es/Tag/index.js
var Tag = Object.assign(_Tag, {
  install: (app) => {
    app.component("Yc" + _Tag.name, _Tag);
  }
});

// node_modules/yc-design-vue/es/InputTag/index.vue2.js
var _hoisted_115 = ["disabled", "readonly", "placeholder"];
var _sfc_main36 = defineComponent({
  ...{
    name: "InputTag"
  },
  __name: "index",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: () => [] },
    inputValue: { default: void 0 },
    defaultInputValue: { default: "" },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: false },
    size: { default: void 0 },
    maxTagCount: { default: 0 },
    retainInputValue: { type: [Boolean, Object], default: false },
    formatTag: {},
    uniqueValue: { type: Boolean, default: false },
    tagNowrap: { type: Boolean, default: false },
    fieldNames: { default: () => {
      return {
        id: "id",
        label: "label",
        value: "value",
        closeable: "closeable",
        tagProps: "tagProps"
      };
    } },
    allowCreate: { type: Boolean, default: true }
  },
  emits: ["update:modelValue", "update:inputValue", "input", "input-value-change", "focus", "blur", "press-enter", "remove", "clear"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      modelValue,
      defaultValue,
      inputValue,
      defaultInputValue,
      allowClear,
      disabled,
      readonly: readonly2,
      uniqueValue,
      retainInputValue,
      allowCreate,
      maxTagCount,
      fieldNames,
      tagNowrap
    } = toRefs(props);
    const { size } = getGlobalConfig(props);
    const inputRef = ref();
    const mirrorRef = ref();
    const fieldKey = computed(() => {
      return Object.fromEntries(
        ["id", "label", "value", "closable", "tagProps"].map((key) => [
          key,
          fieldNames.value[key] ?? key
        ])
      );
    });
    const { width } = useElementSize(mirrorRef, void 0, {
      box: "border-box"
    });
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => emits("update:modelValue", val),
      (val) => {
        const { id, label, value, closable, tagProps } = fieldKey.value;
        return val.map((v) => {
          if (isObject2(v)) {
            const val2 = v;
            val2[id] = val2[id] ?? nanoid();
            val2[closable] = val2[closable] ?? true;
            val2[tagProps] = val2[tagProps] ?? {
              bordered: true,
              nowrap: tagNowrap.value
            };
            return v;
          }
          const tagData = {};
          tagData[id] = nanoid();
          tagData[label] = v;
          tagData[value] = v;
          tagData[closable] = true;
          tagData[tagProps] = {
            bordered: true,
            nowrap: tagNowrap.value
          };
          return tagData;
        });
      }
    );
    const computedInputValue = useControlValue(
      inputValue,
      defaultInputValue.value,
      (val) => {
        emits("update:inputValue", val);
      }
    );
    const curList = computed(() => {
      const visibleList = maxTagCount.value > 0 ? computedValue.value.slice(0, maxTagCount.value) : computedValue.value;
      return {
        visibleList,
        hideList: computedValue.value.slice(maxTagCount.value)
      };
    });
    const showClearBtn = computed(
      () => allowClear.value && !disabled.value && !readonly2.value && computedValue.value.length
    );
    const clearInputValue = () => {
      if (isBoolean(retainInputValue.value) && retainInputValue.value || isObject2(retainInputValue.value) && retainInputValue.value.create) {
        return;
      }
      computedInputValue.value = "";
    };
    const handleEvent = (type, e, id) => {
      var _a, _b;
      const inputVal = (_a = computedInputValue.value) == null ? void 0 : _a.trim();
      switch (type) {
        case "input":
        case "input-value-change":
          {
            const { value } = e.target;
            emits(type, value, e);
          }
          break;
        case "focus":
        case "blur":
          {
            emits(type, e);
            if (type == "blur") {
              clearInputValue();
            }
          }
          break;
        case "pressEnter":
          {
            const { label, value, id: id2 } = fieldKey.value;
            const isUnique = !uniqueValue.value || uniqueValue.value && !computedValue.value.find(
              (item) => ((item == null ? void 0 : item[value]) ?? item) == inputVal
            );
            if (!inputVal || !allowCreate.value || !isUnique) {
              return;
            }
            const tagData = {};
            tagData[id2] = nanoid();
            tagData[label] = computedInputValue.value;
            tagData[value] = computedInputValue.value;
            computedValue.value = [...computedValue.value, tagData];
            emits("press-enter", e);
            clearInputValue();
          }
          break;
        case "close":
          {
            const arr = computedValue.value;
            const value = arr.find((v) => v.id == id);
            computedValue.value = arr.filter((v) => v.id != id);
            emits("remove", value == null ? void 0 : value.value, e);
          }
          break;
        case "remove":
          {
            if (inputVal || !((_b = computedValue.value) == null ? void 0 : _b.length)) return;
            const value = computedValue.value[computedValue.value.length - 1];
            computedValue.value = computedValue.value.slice(
              0,
              computedValue.value.length - 1
            );
            emits("remove", value.value, e);
          }
          break;
        case "clear":
          {
            computedValue.value = [];
            emits("clear", e);
          }
          break;
      }
    };
    __expose({
      focus() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      },
      blur() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.blur();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-input-tag",
          `yc-input-tag-size-${unref(size)}`,
          {
            "yc-input-tag-no-value": !unref(computedValue).length,
            "yc-input-tag-disabled": unref(disabled),
            "yc-input-tag-error": _ctx.error,
            "yc-input-tag-has-suffix": _ctx.$slots.suffix || showClearBtn.value
          }
        ]),
        onMousedown: _cache[8] || (_cache[8] = (e) => e.preventDefault()),
        onClick: _cache[9] || (_cache[9] = ($event) => {
          var _a;
          return (_a = inputRef.value) == null ? void 0 : _a.focus();
        })
      }, [
        _ctx.$slots.prefix ? (openBlock(), createBlock(unref(_sfc_main30), {
          key: 0,
          class: "yc-input-tag-prefix"
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
          ]),
          _: 3
        })) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "yc-input-tag-mirror",
          ref_key: "mirrorRef",
          ref: mirrorRef
        }, toDisplayString(unref(computedInputValue) || (unref(computedValue).length ? "" : _ctx.placeholder)), 513),
        createVNode(TransitionGroup, {
          name: "input-tag-zoom",
          tag: "div",
          class: "yc-input-tag-inner"
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(curList.value.visibleList, (item) => {
              return renderSlot(_ctx.$slots, "tag", {
                key: item == null ? void 0 : item[fieldKey.value.id],
                tag: item
              }, () => [
                createVNode(unref(Tag), {
                  closable: item[fieldKey.value.closable],
                  bordered: item[fieldKey.value.tagProps].bordered,
                  nowrap: item[fieldKey.value.tagProps].nowrap,
                  checked: false,
                  onClose: (ev) => handleEvent("close", ev, item == null ? void 0 : item[fieldKey.value.id])
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.formatTag ? _ctx.formatTag(item) : item[fieldKey.value.label]), 1)
                  ]),
                  _: 2
                }, 1032, ["closable", "bordered", "nowrap", "onClose"])
              ], true);
            }), 128)),
            unref(maxTagCount) > 0 && unref(computedValue).length > unref(maxTagCount) ? (openBlock(), createBlock(unref(Tag), {
              nowrap: unref(tagNowrap),
              checked: false,
              bordered: "",
              key: "yc-select-value-tag"
            }, {
              default: withCtx(() => [
                createTextVNode(" +" + toDisplayString(curList.value.hideList.length) + "... ", 1)
              ]),
              _: 1
            }, 8, ["nowrap"])) : createCommentVNode("", true),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(computedInputValue) ? computedInputValue.value = $event : null),
              key: "yc-input-tag-input",
              disabled: unref(disabled),
              readonly: unref(readonly2),
              placeholder: unref(computedValue).length ? "" : _ctx.placeholder,
              style: normalizeStyle({
                width: unref(valueToPx)(unref(width))
              }),
              class: "yc-input-tag-input",
              ref_key: "inputRef",
              ref: inputRef,
              onInput: _cache[1] || (_cache[1] = ($event) => handleEvent("input", $event)),
              onChange: _cache[2] || (_cache[2] = ($event) => handleEvent("input-value-change", $event)),
              onFocus: _cache[3] || (_cache[3] = ($event) => handleEvent("focus", $event)),
              onBlur: _cache[4] || (_cache[4] = ($event) => handleEvent("blur", $event)),
              onKeydown: [
                _cache[5] || (_cache[5] = withKeys(($event) => handleEvent("pressEnter", $event), ["enter"])),
                _cache[6] || (_cache[6] = withKeys(($event) => handleEvent("remove", $event), ["delete"]))
              ]
            }, null, 44, _hoisted_115), [
              [vModelText, unref(computedInputValue)]
            ])
          ]),
          _: 3
        }),
        _ctx.$slots.suffix || showClearBtn.value ? (openBlock(), createBlock(unref(_sfc_main30), {
          key: 1,
          class: "yc-input-tag-suffix"
        }, {
          default: withCtx(() => [
            showClearBtn.value ? (openBlock(), createBlock(unref(IconButton), {
              key: 0,
              class: "yc-input-tag-clear-button",
              onClick: _cache[7] || (_cache[7] = ($event) => handleEvent("clear", $event))
            })) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
          ]),
          _: 3
        })) : createCommentVNode("", true)
      ], 34);
    };
  }
});

// node_modules/yc-design-vue/es/InputTag/index.vue.js
var _InputTag = _export_sfc(_sfc_main36, [["__scopeId", "data-v-353d8392"]]);

// node_modules/yc-design-vue/es/InputTag/index.js
var InputTag = Object.assign(_InputTag, {
  install: (app) => {
    app.component("Yc" + _InputTag.name, _InputTag);
  }
});

// node_modules/yc-design-vue/es/Trigger/hooks/useContext.js
var TRIGGER_CONTEXT_KEY = "trigger-context";
var useContext5 = (params) => {
  const { trigger, popupRef, computedVisible, mouseEnterDelay } = params;
  const {
    depth: preDepth,
    curDepth,
    groupIds,
    timeout,
    hoverTimeout
  } = inject(TRIGGER_CONTEXT_KEY, {
    depth: -1,
    curDepth: ref(0),
    groupIds: ref([]),
    timeout: ref(),
    hoverTimeout: ref()
  });
  const depth = preDepth + 1;
  const groupId = nanoid(32);
  groupIds.value[depth] = groupId;
  provide(TRIGGER_CONTEXT_KEY, {
    depth,
    curDepth,
    groupIds,
    hoverTimeout,
    timeout
  });
  const isSameGroup = (el) => {
    const dataId = el.getAttribute("data-group-id");
    const dataDepth = el.getAttribute("data-group-depth");
    const isGroup = !!dataId && groupIds.value.includes(groupId);
    if (isGroup || el.tagName == "BODY") {
      return {
        isGroup,
        groupId: dataId,
        depth: isGroup ? Number.parseInt(dataDepth) : -1
      };
    } else {
      return isSameGroup(el.parentElement);
    }
  };
  const mouseEnterHandler = () => {
    if (hoverTimeout.value) {
      clearTimeout(hoverTimeout.value);
    }
    hoverTimeout.value = setTimeout(() => {
      curDepth.value = depth;
    }, mouseEnterDelay.value);
  };
  const mosueLeaveHandler = (e) => {
    if (groupIds.value.length <= 1) {
      return false;
    }
    const { isGroup } = isSameGroup(e.relatedTarget);
    if (isGroup) {
      computedVisible.value = false;
    } else {
      curDepth.value = -1;
    }
    return true;
  };
  const clickOutsideHandler = (e) => {
    if (groupIds.value.length <= 1) {
      return false;
    }
    const { isGroup, depth: _depth } = isSameGroup(
      e.target ?? e
    );
    computedVisible.value = isGroup ? depth <= _depth : computedVisible.value;
    return isGroup;
  };
  watch(
    () => curDepth.value,
    (v) => {
      if (depth <= v || trigger != "hover") {
        return;
      }
      computedVisible.value = false;
    }
  );
  watch(
    () => computedVisible.value,
    async (val) => {
      if (!val) return;
      await sleep(0);
      const popupDom = unrefElement(popupRef);
      popupDom == null ? void 0 : popupDom.setAttribute("data-group-id", groupId);
      popupDom == null ? void 0 : popupDom.setAttribute("data-group-depth", `${depth}`);
    },
    {
      immediate: true
    }
  );
  return {
    timeout,
    mouseEnterHandler,
    clickOutsideHandler,
    mosueLeaveHandler
  };
};

// node_modules/yc-design-vue/es/Trigger/hooks/useTriggerVisible.js
var useTriggerVisible = (params) => {
  const { props, emits, popupRef, triggerRef } = params;
  const {
    trigger,
    popupVisible,
    defaultPopupVisible,
    clickToClose,
    blurToClose,
    clickOutsideToClose,
    mouseEnterDelay,
    mouseLeaveDelay,
    focusDelay,
    disabled,
    scrollToCloseDistance,
    autoSetPosition,
    alignPoint
  } = toRefs(props);
  const { scrollToClose } = getGlobalConfig(props);
  const {
    onTriggerMouseclick,
    onTriggerMouseenter,
    onTriggerMouseleave,
    onTriggerBlur,
    onTriggerFocus,
    onClickOutSide
  } = props;
  const computedVisible = useControlValue(
    popupVisible,
    defaultPopupVisible.value,
    (val) => {
      emits("update:popupVisible", val);
      emits("popup-visible-change", val);
    }
  );
  const { timeout, mosueLeaveHandler, mouseEnterHandler, clickOutsideHandler } = useContext5({
    trigger: trigger.value,
    mouseEnterDelay,
    computedVisible,
    popupRef
  });
  const mouseX = ref(0);
  const mouseY = ref(0);
  let oldScrollLeft = 0;
  let oldScrollTop = 0;
  const scrollContainer = computed(() => {
    return triggerRef.value ? findFirstScrollableParent(unrefElement(triggerRef.value)) : null;
  });
  const handleClickEvent = (e, type) => {
    if (trigger.value != type || disabled.value) {
      return;
    }
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (!autoSetPosition.value && alignPoint.value) {
      const { pageX, pageY } = e;
      mouseX.value = pageX;
      mouseY.value = pageY;
    }
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
    onTriggerMouseclick == null ? void 0 : onTriggerMouseclick();
  };
  const handleMouseenter = () => {
    if (trigger.value != "hover" || disabled.value) {
      return;
    }
    mouseEnterHandler();
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (computedVisible.value) {
      return;
    }
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
      onTriggerMouseenter == null ? void 0 : onTriggerMouseenter();
    }, mouseEnterDelay.value);
  };
  const handleMouseleave = (e) => {
    if (trigger.value != "hover" || disabled.value) {
      return;
    }
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (!computedVisible.value) {
      return;
    }
    timeout.value = setTimeout(() => {
      onTriggerMouseleave == null ? void 0 : onTriggerMouseleave();
      const isHandle = mosueLeaveHandler(e);
      if (isHandle) {
        return;
      }
      computedVisible.value = false;
    }, mouseLeaveDelay.value);
  };
  const handleFocus = () => {
    if (trigger.value != "focus" || disabled.value) {
      return;
    }
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (computedVisible.value) {
      return;
    }
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
      onTriggerFocus == null ? void 0 : onTriggerFocus();
    }, focusDelay.value);
  };
  const handleBlur = () => {
    if (trigger.value != "focus" || !blurToClose.value || disabled.value) {
      return;
    }
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (!computedVisible.value) {
      return;
    }
    computedVisible.value = false;
    onTriggerBlur == null ? void 0 : onTriggerBlur();
  };
  const handleClickOutsideClose = () => {
    if (!clickOutsideToClose.value || !["click", "contextMenu"].includes(trigger.value)) {
      return;
    }
    onClickOutside(
      popupRef,
      (e) => {
        if (disabled.value) return;
        const isHandle = clickOutsideHandler(e);
        if (!computedVisible.value || isHandle) {
          return;
        }
        computedVisible.value = false;
        onClickOutSide == null ? void 0 : onClickOutSide();
      },
      {
        ignore: [triggerRef]
      }
    );
  };
  const handleScrollToClose = async () => {
    await nextTick();
    if (!scrollToClose.value || !scrollContainer.value) return;
    useEventListener(scrollContainer, "scroll", () => {
      if (!computedVisible.value) return;
      const { scrollTop, scrollLeft } = scrollContainer.value;
      if (Math.abs(scrollTop - oldScrollTop) >= scrollToCloseDistance.value || Math.abs(scrollLeft - oldScrollLeft) >= scrollToCloseDistance.value) {
        computedVisible.value = false;
        oldScrollTop = scrollTop;
        oldScrollLeft = oldScrollLeft;
      }
    });
  };
  watch(
    () => computedVisible.value,
    async () => {
      await nextTick();
      if (!scrollContainer.value) return;
      const { scrollTop, scrollLeft } = scrollContainer.value;
      oldScrollLeft = scrollLeft;
      oldScrollTop = scrollTop;
    }
  );
  handleClickOutsideClose();
  handleScrollToClose();
  return {
    mouseX,
    mouseY,
    computedVisible,
    handleClickEvent,
    handleMouseenter,
    handleMouseleave,
    handleFocus,
    handleBlur
  };
};

// node_modules/yc-design-vue/es/Trigger/hooks/useTriggerPosition.js
var useTriggerPosition = (params) => {
  const {
    props,
    computedVisible,
    popupRef,
    triggerRef,
    arrowRef,
    mouseX,
    mouseY
  } = params;
  const {
    trigger,
    alignPoint,
    popupTranslate,
    popupOffset,
    autoFitPosition,
    autoFitPopupMinWidth,
    autoFitPopupWidth,
    autoSetPosition,
    showArrow,
    position: _position,
    arrowStyle: _arrowStyle,
    contentStyle: _contentStyle
  } = toRefs(props);
  const { updateAtScroll, zIndex } = getGlobalConfig(props);
  const position = ref(_position.value);
  const { width: popupWidth, height: popupHeight } = useElementSize(
    popupRef,
    void 0,
    {
      box: "border-box"
    }
  );
  const { width: arrowWidth, height: arrowHeight } = useElementSize(
    arrowRef,
    void 0,
    {
      box: "border-box"
    }
  );
  const {
    left,
    top,
    bottom,
    right,
    width: triggerWidth,
    height: triggerHeight
  } = useElementBounding(triggerRef, {
    windowScroll: updateAtScroll.value,
    updateTiming: "next-frame"
  });
  const popupStyle = computed(() => {
    const [offsetX, offsetY] = calcPopupOffset();
    const isMousePosition = alignPoint.value && ["click", "contextMenu"].includes(trigger.value);
    if (autoSetPosition.value || isMousePosition) {
      return {
        top: valueToPx(mouseY.value + offsetY),
        left: valueToPx(
          mouseX.value - (autoFitPosition.value ? 0 : popupWidth.value / 2) + offsetX
        ),
        zIndex: zIndex.value
      };
    }
    const [offsetLeft, offsetTop] = calcPopupPosition({
      position: position.value,
      triggerWidth: triggerWidth.value,
      triggerHeight: triggerHeight.value,
      popupHeight: popupHeight.value,
      popupWidth: popupWidth.value,
      top: top.value,
      left: left.value,
      right: right.value,
      bottom: bottom.value
    });
    if (!autoFitPosition.value) {
      return {
        top: valueToPx(offsetTop + offsetY),
        left: valueToPx(offsetLeft + offsetX),
        zIndex: zIndex.value
      };
    }
    const [newLeft, newTop] = calcCurPopupPosition({
      offsetLeft,
      offsetTop,
      position: position.value,
      top: top.value,
      left: left.value,
      right: right.value,
      bottom: bottom.value,
      popupHeight: popupHeight.value,
      popupWidth: popupWidth.value
    });
    position.value = calcPositionRef({
      offsetLeft: newLeft,
      offsetTop: newTop,
      top: top.value,
      left: left.value,
      right: right.value,
      bottom: bottom.value,
      triggerWidth: triggerWidth.value,
      triggerHeight: triggerHeight.value,
      popupHeight: popupHeight.value,
      popupWidth: popupWidth.value
    });
    const [newOffsetX, newOffsetY] = calcPopupOffset();
    return {
      left: valueToPx(newLeft + newOffsetX),
      top: valueToPx(newTop + newOffsetY),
      zIndex: zIndex.value
    };
  });
  const contentStyle = computed(() => {
    return {
      width: autoFitPopupWidth.value ? valueToPx(triggerWidth.value) : "",
      minWidth: autoFitPopupMinWidth.value ? valueToPx(triggerWidth.value) : "",
      ..._contentStyle.value
    };
  });
  const arrowStyle = computed(() => {
    return {
      ..._arrowStyle.value,
      ...calcArrowPosition({
        position: position.value,
        popupWidth: popupWidth.value,
        popupHeight: popupHeight.value,
        arrowWidth: arrowWidth.value,
        arrowHeight: arrowHeight.value,
        triggerHeight: triggerHeight.value,
        triggerWidth: triggerWidth.value
      })
    };
  });
  const calcPopupOffset = () => {
    const [translateX, translateY] = popupTranslate.value;
    let offsetX = translateX;
    let offsetY = translateY;
    if (position.value.startsWith("t")) {
      offsetY = -popupOffset.value;
    } else if (position.value.startsWith("b")) {
      offsetY = popupOffset.value;
    } else if (position.value.startsWith("l")) {
      offsetX = -popupOffset.value;
    } else if (position.value.startsWith("r")) {
      offsetX = popupOffset.value;
    }
    return [offsetX, offsetY];
  };
  const calcPopupPosition = (params2) => {
    let offsetTop = 0;
    let offsetLeft = 0;
    const {
      position: position2,
      triggerWidth: triggerWidth2,
      triggerHeight: triggerHeight2,
      popupWidth: popupWidth2,
      popupHeight: popupHeight2,
      left: left2,
      top: top2,
      right: right2,
      bottom: bottom2
    } = params2;
    if (["top", "tl", "tr", "bottom", "bl", "br"].includes(position2)) {
      offsetTop = position2.startsWith("t") ? top2 - popupHeight2 : bottom2;
      if (["top", "bottom"].includes(position2)) {
        offsetLeft = left2 + (triggerWidth2 - popupWidth2) / 2;
      } else if (["tl", "bl"].includes(position2)) {
        offsetLeft = left2;
      } else {
        offsetLeft = right2 - popupWidth2;
      }
    } else {
      offsetLeft = position2.startsWith("l") ? left2 - popupWidth2 : right2;
      if (["left", "right"].includes(position2)) {
        offsetTop = top2 + (triggerHeight2 - popupHeight2) / 2;
      } else if (["lt", "rt"].includes(position2)) {
        offsetTop = top2;
      } else {
        offsetTop = bottom2 - popupHeight2;
      }
    }
    return [offsetLeft, offsetTop];
  };
  const calcCurPopupPosition = (params2) => {
    const {
      position: position2,
      offsetLeft,
      offsetTop,
      bottom: bottom2,
      left: left2,
      right: right2,
      top: top2,
      popupHeight: popupHeight2,
      popupWidth: popupWidth2
    } = params2;
    let newLeft = offsetLeft;
    let newTop = offsetTop;
    if (["top", "tl", "tr", "bottom", "bl", "br"].includes(position2)) {
      if (offsetTop < 0 && ["top", "tl", "tr"].includes(position2)) {
        newTop = bottom2;
      } else if (offsetTop + popupHeight2 > window.innerHeight && ["bottom", "bl", "br"].includes(position2)) {
        newTop = top2 - popupHeight2;
      }
      if (offsetLeft < 0) {
        newLeft = left2;
      } else if (offsetLeft + popupWidth2 > window.innerWidth) {
        newLeft = right2 - popupWidth2;
      }
    } else {
      if (offsetLeft < 0 && ["left", "lt", "lb"].includes(position2)) {
        newLeft = right2;
      } else if (offsetLeft + popupWidth2 > window.innerWidth && ["right", "rt", "rb"].includes(position2)) {
        newLeft = left2 - popupWidth2;
      }
      if (offsetTop < 0) {
        newTop = top2;
      } else if (newTop + popupHeight2 > window.innerHeight) {
        newTop = top2 - popupHeight2;
      }
    }
    return [newLeft, newTop];
  };
  const calcArrowPosition = (params2) => {
    const {
      position: position2,
      triggerWidth: triggerWidth2,
      triggerHeight: triggerHeight2,
      popupWidth: popupWidth2,
      popupHeight: popupHeight2,
      arrowHeight: arrowHeight2,
      arrowWidth: arrowWidth2
    } = params2;
    let inset;
    if (["top", "tl", "tr", "bottom", "bl", "br"].includes(position2)) {
      let arrowLeft = "";
      let arrowRight = "";
      if (["top", "bottom"].includes(position2)) {
        arrowLeft = valueToPx((popupWidth2 - arrowWidth2) / 2);
      } else if (["tl", "bl"].includes(position2)) {
        arrowLeft = valueToPx((triggerWidth2 - arrowWidth2) / 2);
      } else {
        arrowRight = valueToPx((triggerWidth2 - arrowWidth2) / 2);
      }
      inset = {
        top: position2.startsWith("b") ? "0" : "",
        right: arrowRight,
        bottom: position2.startsWith("t") ? "0" : "",
        left: arrowLeft
      };
    } else {
      let arrowTop = "";
      let arrowBottom = "";
      if (["left", "right"].includes(position2)) {
        arrowTop = valueToPx((popupHeight2 - arrowHeight2) / 2);
      } else if (["lt", "rt"].includes(position2)) {
        arrowTop = valueToPx((triggerHeight2 - arrowHeight2) / 2);
      } else {
        arrowBottom = valueToPx((triggerHeight2 - arrowHeight2) / 2);
      }
      inset = {
        top: arrowTop,
        right: position2.startsWith("l") ? "0" : "",
        bottom: arrowBottom,
        left: position2.startsWith("r") ? "0" : ""
      };
    }
    return inset;
  };
  const calcPositionRef = (params2) => {
    const {
      offsetLeft,
      offsetTop,
      top: top2,
      left: left2,
      bottom: bottom2,
      right: right2,
      triggerWidth: triggerWidth2,
      triggerHeight: triggerHeight2,
      popupHeight: popupHeight2,
      popupWidth: popupWidth2
    } = params2;
    const epsilon = 1e-5;
    const dirArray = [
      [top2 - popupHeight2, left2 + (triggerWidth2 - popupWidth2) / 2, "top"],
      [top2 - popupHeight2, left2, "tl"],
      [top2 - popupHeight2, right2 - popupWidth2, "tr"],
      [bottom2, left2 + (triggerWidth2 - popupWidth2) / 2, "bottom"],
      [bottom2, left2, "bl"],
      [bottom2, right2 - popupWidth2, "br"],
      [top2 + (triggerHeight2 - popupHeight2) / 2, left2 - popupWidth2, "left"],
      [top2, left2 - popupWidth2, "lt"],
      [bottom2 - popupHeight2, left2 - popupWidth2, "lb"],
      [top2 + (triggerHeight2 - popupHeight2) / 2, right2, "right"],
      [top2, right2, "rt"],
      [bottom2 - popupHeight2, right2, "rb"]
    ];
    const target = dirArray.find(([finalTop, finalLeft]) => {
      return Math.abs(finalLeft - offsetLeft) < epsilon && Math.abs(finalTop - offsetTop) < epsilon;
    });
    return (target == null ? void 0 : target[2]) ?? position.value;
  };
  watch(
    () => computedVisible.value,
    async (val) => {
      if (!val) return;
      await sleep(0);
      position.value = _position.value;
      const triggerDom = unrefElement(triggerRef);
      const popupDom = unrefElement(popupRef);
      if (triggerDom) {
        const {
          left: _left,
          right: _right,
          top: _top,
          bottom: _bottom,
          width: _triggerWidth,
          height: _triggerHeight
        } = triggerDom.getBoundingClientRect();
        left.value = _left;
        right.value = _right;
        top.value = _top;
        bottom.value = _bottom;
        triggerWidth.value = _triggerWidth;
        triggerHeight.value = _triggerHeight;
      }
      if (popupDom) {
        const { offsetWidth: _popupWidth, offsetHeight: _popupHeight } = popupDom;
        popupWidth.value = _popupWidth;
        popupHeight.value = _popupHeight;
      }
      if (arrowRef.value) {
        const { offsetWidth: _arrowWidth, offsetHeight: _arrowHeight } = arrowRef.value;
        arrowWidth.value = _arrowWidth;
        arrowHeight.value = _arrowHeight;
      }
    }
  );
  return {
    position,
    left,
    top,
    bottom,
    right,
    popupWidth,
    popupHeight,
    triggerWidth,
    triggerHeight,
    arrowWidth,
    arrowHeight,
    popupStyle,
    contentStyle,
    arrowStyle
  };
};

// node_modules/yc-design-vue/es/Trigger/index.vue2.js
var _sfc_main37 = defineComponent({
  ...{
    name: "Trigger",
    inheritAttrs: false
  },
  __name: "index",
  props: {
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    trigger: { default: "hover" },
    position: { default: "bottom" },
    disabled: { type: Boolean, default: false },
    popupOffset: { default: 0 },
    popupTranslate: { default: () => [0, 0] },
    showArrow: { type: Boolean, default: false },
    popuphoverStay: { type: Boolean },
    blurToClose: { type: Boolean, default: true },
    clickToClose: { type: Boolean, default: true },
    clickOutsideToClose: { type: Boolean, default: true },
    unmountOnClose: { type: Boolean, default: true },
    contentClass: { default: "" },
    contentStyle: { default: () => {
      return {};
    } },
    arrowClass: { default: "" },
    arrowStyle: { default: () => {
      return {};
    } },
    animationName: { default: "fade" },
    duration: { default: 400 },
    mouseEnterDelay: { default: 100 },
    mouseLeaveDelay: { default: 100 },
    focusDelay: { default: 0 },
    autoFitPopupWidth: { type: Boolean, default: false },
    autoFitPopupMinWidth: { type: Boolean, default: false },
    popupContainer: { default: void 0 },
    renderToBody: { type: Boolean, default: true },
    autoFitPosition: { type: Boolean, default: true },
    updateAtScroll: { type: Boolean, default: void 0 },
    preventFocus: { type: Boolean, default: false },
    alignPoint: { type: Boolean, default: false },
    scrollToClose: { type: Boolean, default: void 0 },
    scrollToCloseDistance: { default: 1 },
    needTransformOrigin: { type: Boolean, default: false },
    autoSetPosition: { type: Boolean, default: false },
    onTriggerMouseenter: {},
    onTriggerMouseleave: {},
    onTriggerMouseclick: {},
    onTriggerFocus: {},
    onTriggerBlur: {},
    onClickOutSide: {}
  },
  emits: ["update:popupVisible", "popup-visible-change", "show", "hide"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const slots = useSlots();
    const props = __props;
    const emits = __emit;
    const { popupContainer } = getGlobalConfig(props);
    const popupRef = ref();
    const triggerRef = ref();
    const arrowRef = ref();
    const vNode = computed(() => {
      var _a;
      return findFirstLegitChild(((_a = slots.default) == null ? void 0 : _a.call(slots)) || []);
    });
    const {
      computedVisible,
      mouseX,
      mouseY,
      handleClickEvent,
      handleMouseenter,
      handleMouseleave,
      handleFocus,
      handleBlur
    } = useTriggerVisible({
      props,
      emits,
      popupRef,
      triggerRef
    });
    const { position, popupStyle, contentStyle, arrowStyle } = useTriggerPosition({
      props,
      computedVisible,
      popupRef,
      triggerRef,
      arrowRef,
      mouseX,
      mouseY
    });
    __expose({
      hide() {
        computedVisible.value = false;
      },
      show() {
        computedVisible.value = true;
      },
      updatePosition(x, y) {
        mouseX.value = x;
        mouseY.value = y;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        (openBlock(), createBlock(resolveDynamicComponent(vNode.value), {
          ref_key: "triggerRef",
          ref: triggerRef,
          onClick: _cache[0] || (_cache[0] = ($event) => unref(handleClickEvent)($event, "click")),
          onContextmenu: _cache[1] || (_cache[1] = withModifiers(($event) => unref(handleClickEvent)($event, "contextMenu"), ["prevent"])),
          onMouseenter: unref(handleMouseenter),
          onMouseleave: unref(handleMouseleave),
          onFocus: unref(handleFocus),
          onBlur: unref(handleBlur)
        }, null, 40, ["onMouseenter", "onMouseleave", "onFocus", "onBlur"])),
        (openBlock(), createBlock(Teleport, {
          to: unref(popupContainer),
          disabled: !_ctx.renderToBody
        }, [
          createVNode(Transition, {
            name: _ctx.animationName,
            duration: _ctx.duration,
            onAfterLeave: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("hide")),
            onAfterEnter: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("show"))
          }, {
            default: withCtx(() => [
              !_ctx.unmountOnClose || unref(computedVisible) && !_ctx.disabled ? withDirectives((openBlock(), createBlock(unref(_sfc_main30), {
                key: 0,
                "prevent-focus": _ctx.preventFocus,
                class: normalizeClass([
                  "yc-trigger",
                  `yc-trigger-position-${unref(position)}`,
                  {
                    "yc-trigger-transform-origin": _ctx.needTransformOrigin
                  },
                  _ctx.$attrs.class
                ]),
                style: normalizeStyle({
                  ...unref(popupStyle),
                  ..._ctx.$attrs.style || {}
                }),
                ref_key: "popupRef",
                ref: popupRef,
                onMouseenter: unref(handleMouseenter),
                onMouseleave: unref(handleMouseleave)
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", {
                    class: normalizeClass(["yc-trigger-content", _ctx.contentClass]),
                    style: normalizeStyle(unref(contentStyle))
                  }, [
                    renderSlot(_ctx.$slots, "content", {}, void 0, true)
                  ], 6),
                  _ctx.showArrow ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["yc-trigger-arrow", _ctx.arrowClass]),
                    style: normalizeStyle(unref(arrowStyle)),
                    ref_key: "arrowRef",
                    ref: arrowRef
                  }, null, 6)) : createCommentVNode("", true)
                ]),
                _: 3
              }, 8, ["prevent-focus", "class", "style", "onMouseenter", "onMouseleave"])), [
                [vShow, unref(computedVisible) && !_ctx.disabled]
              ]) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["name", "duration"])
        ], 8, ["to", "disabled"]))
      ], 64);
    };
  }
});

// node_modules/yc-design-vue/es/Trigger/index.vue.js
var _Trigger = _export_sfc(_sfc_main37, [["__scopeId", "data-v-37d87bda"]]);

// node_modules/yc-design-vue/es/Trigger/index.js
var Trigger = Object.assign(_Trigger, {
  install: (app) => {
    app.component("Yc" + _Trigger.name, _Trigger);
  }
});

// node_modules/yc-design-vue/es/Select/Select.vue2.js
var _sfc_main38 = defineComponent({
  ...{
    name: "Select"
  },
  __name: "Select",
  props: {
    multiple: { type: Boolean, default: false },
    modelValue: { type: [String, Number, Boolean, Object, Array], default: void 0 },
    defaultValue: { type: [String, Number, Boolean, Object, Array], default: (props) => {
      return props.multiple ? [] : "";
    } },
    inputValue: { default: void 0 },
    defaultInputValue: { default: "" },
    size: { default: void 0 },
    placeholder: { default: "" },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: false },
    allowSearch: { type: Boolean, default: (props) => {
      return props.multiple;
    } },
    allowCreate: { type: Boolean, default: false },
    maxTagCount: { default: 0 },
    popupContainer: { default: void 0 },
    bordered: { type: Boolean, default: true },
    defaultActivefirstOption: { type: Boolean, default: false },
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    unmountonClose: { type: Boolean },
    filterOption: { type: [Boolean, Function], default: void 0 },
    options: { default: () => [] },
    virtualListProps: { default: void 0 },
    triggerProps: { default: () => {
      return {
        contentStyle: {}
      };
    } },
    formatLabel: {},
    fallbackOption: {},
    showExtraOptions: { type: Boolean, default: true },
    valueKey: { default: "" },
    searchDelay: { default: 500 },
    limit: { default: 0 },
    fieldNames: { default: () => {
      return {};
    } },
    scrollbar: { type: Boolean, default: true },
    showHeaderOnEmpty: { type: Boolean, default: false },
    showFooterOnEmpty: { type: Boolean, default: false },
    tagNowrap: { type: Boolean, default: false },
    hotkeys: { type: Boolean },
    showEmpty: { type: Boolean, default: true }
  },
  emits: ["update:modelValue", "update:inputValue", "update:popupVisible", "change", "input-value-change", "clear", "remove", "search", "exceedLimit", "popup-visible-change", "dropdown-scroll", "dropdown-reach-bottom", "select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      allowClear,
      disabled,
      loading,
      searchDelay,
      showFooterOnEmpty,
      showHeaderOnEmpty,
      multiple,
      allowSearch,
      allowCreate,
      virtualListProps
    } = toRefs(props);
    const inputRef = ref();
    const popupRef = ref();
    const {
      computedVisible,
      computedValue,
      computedInputValue,
      selectOptions,
      createOptions
    } = useContext2().provide(props, emits, inputRef);
    const showClearBtn = computed(() => {
      const hasValue = multiple.value ? computedValue.value.length : String(computedValue.value).length;
      return allowClear.value && !disabled.value && !loading.value && !!hasValue;
    });
    const isReadonly = computed(() => {
      return (!allowSearch.value || loading.value) && !allowCreate.value && isUndefined(props.filterOption);
    });
    const handleEvent = async (type, value = "") => {
      var _a, _b, _c;
      switch (type) {
        case "create":
          {
            if (!allowCreate.value) return;
            const target = createOptions.value.find(
              (item) => item == computedInputValue.value
            );
            if (target) return;
            createOptions.value.push({
              label: computedInputValue.value,
              value: computedInputValue.value
            });
            if (allowSearch.value) {
              (_a = inputRef.value) == null ? void 0 : _a.blur();
            }
          }
          break;
        case "clear":
          {
            computedValue.value = multiple.value ? [] : "";
            emits("clear");
          }
          break;
        case "search":
          {
            await sleep(searchDelay.value);
            emits("search", value);
          }
          break;
        case "focus":
          {
            if (disabled.value) return;
            if (computedVisible.value) {
              return (_b = inputRef.value) == null ? void 0 : _b.blur();
            }
            computedVisible.value = true;
            await sleep(0);
            (_c = inputRef.value) == null ? void 0 : _c.focus();
          }
          break;
        case "blur":
          {
            computedVisible.value = false;
          }
          break;
        case "updateValue":
          {
            computedValue.value = value.map(
              (item) => item.value
            );
          }
          break;
      }
    };
    __expose({
      focus() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      },
      blur() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.blur();
      },
      getPopupRef() {
        return popupRef.value;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Trigger), mergeProps({
        "popup-visible": unref(computedVisible),
        "onUpdate:popupVisible": _cache[14] || (_cache[14] = ($event) => isRef(computedVisible) ? computedVisible.value = $event : null),
        "unmount-on-close": _ctx.unmountonClose,
        "popup-container": _ctx.popupContainer,
        disabled: unref(disabled),
        "popup-offset": 4,
        trigger: "focus",
        position: "bl",
        "animation-name": "slide-dynamic-origin",
        "need-transform-origin": "",
        "auto-fit-popup-width": "",
        "prevent-focus": "",
        ref_key: "popupRef",
        ref: popupRef
      }, _ctx.triggerProps), {
        content: withCtx(() => [
          createVNode(SelectView, {
            loading: unref(loading),
            scrollbar: _ctx.scrollbar,
            "virtual-list-props": unref(virtualListProps),
            "show-footer-on-empty": unref(showFooterOnEmpty),
            "show-header-on-empty": unref(showHeaderOnEmpty)
          }, null, 8, ["loading", "scrollbar", "virtual-list-props", "show-footer-on-empty", "show-header-on-empty"])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass([
              "yc-select",
              {
                "yc-select-allow-search": unref(allowSearch),
                "yc-select-allow-clear": showClearBtn.value,
                "yc-select-no-border": !_ctx.bordered
              },
              _ctx.$attrs.class
            ]),
            style: normalizeStyle(_ctx.$attrs.style)
          }, [
            renderSlot(_ctx.$slots, "trigger", {}, () => {
              var _a;
              return [
                !unref(multiple) ? (openBlock(), createBlock(unref(Input), {
                  key: 0,
                  modelValue: unref(computedInputValue),
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(computedInputValue) ? computedInputValue.value = $event : null),
                  "show-input": unref(computedVisible),
                  readonly: isReadonly.value,
                  disabled: unref(disabled),
                  size: _ctx.size,
                  error: _ctx.error,
                  placeholder: ((_a = unref(selectOptions)[0]) == null ? void 0 : _a.label) || "",
                  ref_key: "inputRef",
                  ref: inputRef,
                  onClick: _cache[2] || (_cache[2] = ($event) => handleEvent("focus")),
                  onBlur: _cache[3] || (_cache[3] = ($event) => handleEvent("blur")),
                  onInput: _cache[4] || (_cache[4] = (v) => handleEvent("search", v)),
                  onPressEnter: _cache[5] || (_cache[5] = ($event) => handleEvent("create"))
                }, {
                  label: withCtx(() => [
                    renderSlot(_ctx.$slots, "label", {
                      data: unref(selectOptions)[0]
                    }, () => {
                      var _a2;
                      return [
                        createBaseVNode("span", {
                          class: normalizeClass([
                            {
                              "yc-input-placeholder": !unref(selectOptions).length
                            }
                          ])
                        }, toDisplayString(((_a2 = unref(selectOptions)[0]) == null ? void 0 : _a2.label) || _ctx.placeholder), 3)
                      ];
                    }, true)
                  ]),
                  suffix: withCtx(() => [
                    createVNode(SelectIcon, {
                      "popup-visible": unref(computedVisible),
                      "allow-search": unref(allowSearch),
                      loading: unref(loading),
                      "show-clear-btn": showClearBtn.value,
                      onClear: _cache[0] || (_cache[0] = ($event) => handleEvent("clear"))
                    }, null, 8, ["popup-visible", "allow-search", "loading", "show-clear-btn"])
                  ]),
                  _: 3
                }, 8, ["modelValue", "show-input", "readonly", "disabled", "size", "error", "placeholder"])) : (openBlock(), createBlock(unref(InputTag), {
                  key: 1,
                  "input-value": unref(computedInputValue),
                  "onUpdate:inputValue": _cache[7] || (_cache[7] = ($event) => isRef(computedInputValue) ? computedInputValue.value = $event : null),
                  "model-value": unref(selectOptions),
                  placeholder: _ctx.placeholder,
                  readonly: isReadonly.value,
                  disabled: unref(disabled),
                  size: _ctx.size,
                  error: _ctx.error,
                  "max-tag-count": _ctx.maxTagCount,
                  "tag-nowrap": _ctx.tagNowrap,
                  ref_key: "inputRef",
                  ref: inputRef,
                  onFocus: _cache[8] || (_cache[8] = ($event) => handleEvent("focus")),
                  onBlur: _cache[9] || (_cache[9] = ($event) => handleEvent("blur")),
                  onInput: _cache[10] || (_cache[10] = (v) => handleEvent("search", v)),
                  onRemove: _cache[11] || (_cache[11] = (v, ev) => _ctx.$emit("remove", v, ev)),
                  onPressEnter: _cache[12] || (_cache[12] = ($event) => handleEvent("create")),
                  "onUpdate:modelValue": _cache[13] || (_cache[13] = (v) => handleEvent("updateValue", v))
                }, {
                  tag: withCtx(({ tag }) => [
                    _ctx.$slots.label ? renderSlot(_ctx.$slots, "label", {
                      key: 0,
                      data: tag
                    }, void 0, true) : createCommentVNode("", true)
                  ]),
                  suffix: withCtx(() => [
                    createVNode(SelectIcon, {
                      "popup-visible": unref(computedVisible),
                      "allow-search": unref(allowSearch),
                      loading: unref(loading),
                      "show-clear-btn": showClearBtn.value,
                      onClear: _cache[6] || (_cache[6] = ($event) => handleEvent("clear"))
                    }, null, 8, ["popup-visible", "allow-search", "loading", "show-clear-btn"])
                  ]),
                  _: 3
                }, 8, ["input-value", "model-value", "placeholder", "readonly", "disabled", "size", "error", "max-tag-count", "tag-nowrap"]))
              ];
            }, true)
          ], 6)
        ]),
        _: 3
      }, 16, ["popup-visible", "unmount-on-close", "popup-container", "disabled"]);
    };
  }
});

// node_modules/yc-design-vue/es/Select/Select.vue.js
var _Select = _export_sfc(_sfc_main38, [["__scopeId", "data-v-b6b51f16"]]);

// node_modules/yc-design-vue/es/Select/index.js
var Select = Object.assign(_Select, {
  option: Option,
  group: Optgroup,
  install: (app) => {
    app.component("Yc" + _Select.name, _Select);
    app.component("Yc" + Option.name, Option);
    app.component("Yc" + Optgroup.name, Optgroup);
  }
});

// node_modules/yc-design-vue/es/Textarea/hooks/useTextareaHeight.js
var useTextareaHeight = (mirrorRef, autoSize) => {
  if (!autoSize) {
    return {};
  }
  const { height: _height } = useElementSize(mirrorRef, void 0, {
    box: "border-box"
  });
  const calcHeightFromRows = (rows) => {
    return rows * 14 * 1.5715 + 8;
  };
  const style = computed(() => {
    const { minRows: min = 1, maxRows: max = 1e4 } = autoSize;
    const minRows = min <= 1 ? 1 : min;
    const minHeight = calcHeightFromRows(min);
    const maxRows = max <= minRows ? minRows : max;
    const maxHeight = calcHeightFromRows(maxRows);
    let height = _height.value;
    height = height < minHeight ? minHeight : height;
    height = height > maxHeight ? maxHeight : height;
    return {
      minHeight: valueToPx(minHeight),
      height: valueToPx(height)
    };
  });
  return {
    style
  };
};

// node_modules/yc-design-vue/es/Textarea/index.vue2.js
var _hoisted_116 = ["value", "disabled", "readonly", "placeholder"];
var _sfc_main39 = defineComponent({
  ...{
    name: "Textarea"
  },
  __name: "index",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: "" },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: false },
    error: { type: [Boolean, Object], default: void 0 },
    maxLength: { default: void 0 },
    showWordLimit: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    autoSize: { type: [Boolean, Object], default: false },
    wordLength: { type: Function, default: (value) => {
      return value.length;
    } },
    wordSlice: { type: Function, default: (value, maxLength) => {
      return value.slice(0, maxLength);
    } },
    enterPrevent: { type: Boolean, default: false },
    showMirror: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "input", "change", "clear", "focus", "blur", "keydown"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { autoSize } = toRefs(props);
    const inputRef = ref();
    const mirrorRef = ref();
    const {
      error,
      computedValue,
      showWordLimit,
      showClearBtn,
      curLength,
      maxLength,
      handleInput,
      handleComposition
    } = useLimitedInput({
      props,
      emits,
      inputRef
    });
    const { style } = useTextareaHeight(mirrorRef, autoSize.value);
    const handleEvent = async (type, e) => {
      switch (type) {
        case "input":
          {
            handleInput(e);
          }
          break;
        case "change":
          {
            emits("change", computedValue.value, e);
          }
          break;
        case "focus":
        case "blur":
          {
            emits(type, e);
          }
          break;
        case "clear":
          {
            computedValue.value = "";
            emits("clear", e);
          }
          break;
      }
    };
    __expose({
      getInputRef() {
        return inputRef.value;
      },
      getMirrorRef() {
        return mirrorRef.value;
      },
      focus() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      },
      blur() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.blur();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-textarea-wrapper",
          {
            "yc-textarea-disabled": _ctx.disabled,
            "yc-textarea-error": unref(error),
            "yc-textarea-auto-size": unref(autoSize)
          }
        ])
      }, [
        unref(autoSize) || _ctx.showMirror ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "yc-textarea-mirror",
          ref_key: "mirrorRef",
          ref: mirrorRef
        }, toDisplayString(unref(computedValue)), 513)) : createCommentVNode("", true),
        createBaseVNode("textarea", {
          value: unref(computedValue),
          disabled: _ctx.disabled,
          readonly: _ctx.readonly,
          placeholder: _ctx.placeholder,
          style: normalizeStyle(unref(style)),
          class: "yc-textarea",
          ref_key: "inputRef",
          ref: inputRef,
          onCompositionstart: _cache[0] || (_cache[0] = //@ts-ignore
          (...args) => unref(handleComposition) && unref(handleComposition)(...args)),
          onCompositionupdate: _cache[1] || (_cache[1] = //@ts-ignore
          (...args) => unref(handleComposition) && unref(handleComposition)(...args)),
          onCompositionend: _cache[2] || (_cache[2] = //@ts-ignore
          (...args) => unref(handleComposition) && unref(handleComposition)(...args)),
          onKeydown: _cache[3] || (_cache[3] = (ev) => {
            ev.key == "Enter" && _ctx.enterPrevent && ev.preventDefault();
            _ctx.$emit("keydown", ev);
          }),
          onInput: _cache[4] || (_cache[4] = ($event) => handleEvent("input", $event)),
          onChange: _cache[5] || (_cache[5] = ($event) => handleEvent("change", $event)),
          onFocus: _cache[6] || (_cache[6] = ($event) => handleEvent("focus", $event)),
          onBlur: _cache[7] || (_cache[7] = ($event) => handleEvent("blur", $event))
        }, null, 44, _hoisted_116),
        unref(showWordLimit) ? (openBlock(), createBlock(unref(_sfc_main30), {
          key: 1,
          tag: "span",
          class: "yc-textarea-word-limit"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(curLength)) + " / " + toDisplayString(unref(maxLength)), 1)
          ]),
          _: 1
        })) : createCommentVNode("", true),
        unref(showClearBtn) ? (openBlock(), createBlock(unref(IconButton), {
          key: 2,
          class: "yc-textarea-clear-button",
          onClick: _cache[8] || (_cache[8] = ($event) => handleEvent("clear", $event))
        })) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Textarea/index.vue.js
var _Textarea = _export_sfc(_sfc_main39, [["__scopeId", "data-v-410cecd1"]]);

// node_modules/yc-design-vue/es/Textarea/index.js
var Textarea = Object.assign(_Textarea, {
  install: (app) => {
    app.component("Yc" + _Textarea.name, _Textarea);
  }
});

// node_modules/yc-design-vue/es/AutoComplete/index.vue.js
var _sfc_main40 = defineComponent({
  ...{
    name: "AutoComplete"
  },
  __name: "index",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: "" },
    disabled: { type: Boolean, default: false },
    data: { default: () => [] },
    popupContainer: { default: void 0 },
    strict: { type: Boolean, default: false },
    filterOption: { type: Function, default: void 0 },
    triggerProps: { default: () => {
      return {};
    } },
    allowClear: { type: Boolean, default: true },
    vistualListProps: {},
    isSelectSetValue: { type: Boolean, default: true },
    isSearch: { type: Boolean, default: true },
    type: { default: "input" }
  },
  emits: ["update:modelValue", "change", "search", "select", "clear", "dropdown-scroll", "dropdown-reach-bottom", "blur", "focus", "input", "keydown"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { modelValue, defaultValue, data, strict, isSelectSetValue, isSearch } = toRefs(props);
    const { filterOption } = props;
    const inputRef = ref();
    const selectRef = ref();
    const popupVisible = ref(false);
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
      }
    );
    const curOptions = ref([]);
    const defaultFilter = (inputValue, option) => {
      const labelValue = option.label;
      const label = strict.value ? labelValue : labelValue.toLowerCase();
      const value = strict.value ? inputValue : inputValue.toLowerCase();
      return label == null ? void 0 : label.includes(value);
    };
    const handleEvent = async (type, ev, value = "") => {
      switch (type) {
        case "input":
          {
            emits("input", value, ev);
            emits("search", value);
            const oldOptions = [...data.value];
            await nextTick();
            if (JSON.stringify(oldOptions) == JSON.stringify(data.value) && isSearch.value) {
              curOptions.value = data.value.filter((v) => {
                const option = isObject2(v) ? v : { label: v, value: v };
                return (filterOption == null ? void 0 : filterOption(value, option)) ?? defaultFilter(value, option);
              });
            } else {
              curOptions.value = data.value;
            }
            popupVisible.value = !!curOptions.value.length;
          }
          break;
        case "select":
          {
            popupVisible.value = false;
            if (isSelectSetValue.value) {
              computedValue.value = value;
            }
            emits("select", value);
          }
          break;
        case "focus":
          {
            popupVisible.value = !!curOptions.value.length;
            emits("focus", ev);
          }
          break;
        case "blur":
          {
            popupVisible.value = false;
            emits("blur", ev);
          }
          break;
        case "clear":
          {
            computedValue.value = "";
            emits("clear", ev);
          }
          break;
      }
    };
    __expose({
      focus() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      },
      blur() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.blur();
      },
      getInputRef() {
        var _a;
        return (_a = inputRef.value) == null ? void 0 : _a.getInputRef();
      },
      getMirrorRef() {
        var _a;
        return (_a = inputRef.value) == null ? void 0 : _a.getMirrorRef();
      },
      updatePosition(x, y) {
        var _a, _b;
        (_b = (_a = selectRef.value) == null ? void 0 : _a.getPopupRef()) == null ? void 0 : _b.updatePosition(x, y);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Select), {
        "popup-visible": popupVisible.value,
        options: curOptions.value,
        "popup-container": _ctx.popupContainer,
        "trigger-props": _ctx.triggerProps,
        "virtual-list-props": _ctx.vistualListProps,
        "show-empty": false,
        hotkeys: "",
        ref_key: "selectRef",
        ref: selectRef,
        class: "yc-auto-complete",
        onDropdownScroll: _cache[14] || (_cache[14] = (ev) => _ctx.$emit("dropdown-scroll", ev)),
        onDropdownReachBottom: _cache[15] || (_cache[15] = (ev) => _ctx.$emit("dropdown-reach-bottom", ev)),
        onSelect: _cache[16] || (_cache[16] = (v) => handleEvent("select", null, v))
      }, createSlots({
        trigger: withCtx(() => [
          renderSlot(_ctx.$slots, "trigger", {}, () => [
            _ctx.type == "input" ? (openBlock(), createBlock(unref(Input), mergeProps({
              key: 0,
              modelValue: unref(computedValue),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(computedValue) ? computedValue.value = $event : null),
              disabled: _ctx.disabled,
              "allow-clear": _ctx.allowClear
            }, _ctx.$attrs, {
              ref_key: "inputRef",
              ref: inputRef,
              onInput: _cache[1] || (_cache[1] = (v, ev) => handleEvent("input", ev, v)),
              onChange: _cache[2] || (_cache[2] = (v) => _ctx.$emit("change", v)),
              onClear: _cache[3] || (_cache[3] = (ev) => handleEvent("clear", ev)),
              onKeydown: _cache[4] || (_cache[4] = (ev) => handleEvent("keydown", ev)),
              onFocus: _cache[5] || (_cache[5] = (ev) => handleEvent("focus", ev)),
              onBlur: _cache[6] || (_cache[6] = (ev) => handleEvent("blur", ev))
            }), null, 16, ["modelValue", "disabled", "allow-clear"])) : (openBlock(), createBlock(unref(Textarea), mergeProps({
              key: 1,
              modelValue: unref(computedValue),
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => isRef(computedValue) ? computedValue.value = $event : null),
              disabled: _ctx.disabled,
              "allow-clear": _ctx.allowClear,
              "enter-prevent": "",
              "show-mirror": ""
            }, _ctx.$attrs, {
              ref_key: "inputRef",
              ref: inputRef,
              onInput: _cache[8] || (_cache[8] = (v, ev) => handleEvent("input", ev, v)),
              onChange: _cache[9] || (_cache[9] = (v) => _ctx.$emit("change", v)),
              onClear: _cache[10] || (_cache[10] = (ev) => handleEvent("clear", ev)),
              onKeydown: _cache[11] || (_cache[11] = (ev) => _ctx.$emit("keydown", ev)),
              onFocus: _cache[12] || (_cache[12] = (ev) => handleEvent("focus", ev)),
              onBlur: _cache[13] || (_cache[13] = (ev) => handleEvent("blur", ev))
            }), null, 16, ["modelValue", "disabled", "allow-clear"]))
          ])
        ]),
        _: 2
      }, [
        _ctx.$slots.option ? {
          name: "option",
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, "option", normalizeProps(guardReactiveProps(scope)))
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots.footer ? {
          name: "footer",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "footer")
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["popup-visible", "options", "popup-container", "trigger-props", "virtual-list-props"]);
    };
  }
});

// node_modules/yc-design-vue/es/AutoComplete/index.js
var AutoComplete = Object.assign(_sfc_main40, {
  install: (app) => {
    app.component("Yc" + _sfc_main40.name, _sfc_main40);
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconImageClose.vue.js
var _sfc_main41 = defineComponent({
  __name: "IconImageClose",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, null, {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M41 26V9a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v30a2 2 0 0 0 2 2h17" }, null, -1),
          createBaseVNode("path", { d: "m24 33 9-8.5V27s-2 1-3.5 2.5C27.841 31.159 27 33 27 33h-3Zm0 0-3.5-4.5L17 33h7Z" }, null, -1),
          createBaseVNode("path", {
            d: "M20.5 28.5 17 33h7l-3.5-4.5ZM33 24.5 24 33h3s.841-1.841 2.5-3.5C31 28 33 27 33 27v-2.5Z",
            fill: "currentColor",
            stroke: "none"
          }, null, -1),
          createBaseVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M46 38a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-4.95-4.782 1.74 1.74-3.045 3.046 3.046 3.046-1.74 1.74-3.047-3.045-3.046 3.046-1.74-1.74 3.046-3.047-3.046-3.046 1.74-1.74 3.046 3.046 3.046-3.046Z",
            fill: "currentColor",
            stroke: "none"
          }, null, -1),
          createBaseVNode("path", { d: "M17 15h-2v2h2v-2Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      });
    };
  }
});

// node_modules/yc-design-vue/es/Avatar/hooks/useContext.js
var AVATAR_GROUP_CONTEXT_KEY = "radio-group-context";
var useContext6 = () => {
  const provide$1 = (props) => {
    const { shape, size, autoFixFontSize } = toRefs(props);
    provide(AVATAR_GROUP_CONTEXT_KEY, {
      shape,
      size,
      autoFixFontSize
    });
  };
  const inject$1 = (props) => {
    const { shape, size, autoFixFontSize } = toRefs(props);
    const {
      shape: _shape,
      size: _size,
      autoFixFontSize: _autoFixFontSize
    } = inject(AVATAR_GROUP_CONTEXT_KEY, {
      shape: ref("round"),
      size: ref(40),
      autoFixFontSize: ref(true)
    });
    return {
      shape: computed(() => {
        return shape.value ?? _shape.value;
      }),
      size: computed(() => {
        return size.value ?? _size.value;
      }),
      autoFixFontSize: computed(() => {
        return autoFixFontSize.value ?? _autoFixFontSize.value;
      })
    };
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Avatar/Avatar.vue2.js
var _hoisted_117 = {
  key: 1,
  class: "yc-avatar-image"
};
var _hoisted_211 = ["src"];
var _hoisted_36 = {
  key: 1,
  class: "yc-avatar-image-icon"
};
var _sfc_main42 = defineComponent({
  ...{
    name: "Avatar"
  },
  __name: "Avatar",
  props: {
    shape: { default: void 0 },
    imageUrl: { default: "" },
    size: { default: void 0 },
    autoFixFontSize: { type: Boolean, default: void 0 },
    triggerType: { default: "button" },
    triggerIconStyle: { default: () => {
      return {};
    } },
    objectFit: { default: "cover" }
  },
  emits: ["click", "error", "load"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { size, autoFixFontSize, shape } = useContext6().inject(props);
    const isLoadError = ref(false);
    const scale = ref(1);
    const textRef = ref();
    const avatarRef = ref();
    const textWithImage = computed(() => {
      var _a;
      return (_a = textRef.value) == null ? void 0 : _a.querySelector("img");
    });
    const handleError = (e) => {
      isLoadError.value = true;
      emits("error", e);
    };
    const initOvserver = () => {
      if (!autoFixFontSize.value) return;
      useResizeObserver(textRef, () => {
        const avatarWidth = size.value ?? avatarRef.value.offsetWidth;
        const textWidth = textRef.value.offsetWidth;
        const textScale = avatarWidth / (textWidth + 8);
        scale.value = avatarWidth && textScale < 1 ? textScale : 1;
      });
    };
    initOvserver();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["yc-avatar", `yc-avatar-shape-${unref(shape)}`]),
        style: normalizeStyle({
          width: unref(valueToPx)(unref(size)),
          height: unref(valueToPx)(unref(size))
        }),
        ref_key: "avatarRef",
        ref: avatarRef,
        onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("click", $event))
      }, [
        _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass([textWithImage.value ? "yc-avatar-image" : "yc-avatar-text"]),
          style: normalizeStyle({
            transform: textWithImage.value ? "" : `scale(${scale.value}) translateX(-50%)`
          }),
          ref_key: "textRef",
          ref: textRef
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 6)) : _ctx.imageUrl ? (openBlock(), createElementBlock("span", _hoisted_117, [
          !isLoadError.value ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _ctx.imageUrl,
            style: normalizeStyle({
              objectFit: _ctx.objectFit
            }),
            alt: "avatar",
            onLoad: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("load", $event)),
            onError: handleError
          }, null, 44, _hoisted_211)) : (openBlock(), createElementBlock("div", _hoisted_36, [
            createVNode(unref(_sfc_main41))
          ]))
        ])) : createCommentVNode("", true),
        _ctx.$slots["trigger-icon"] ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass([
            {
              "yc-avatar-trigger-icon-button": _ctx.triggerType == "button",
              "yc-avatar-trigger-icon-mask": _ctx.triggerType == "mask"
            }
          ]),
          style: normalizeStyle(_ctx.triggerIconStyle)
        }, [
          renderSlot(_ctx.$slots, "trigger-icon", {}, void 0, true)
        ], 6)) : createCommentVNode("", true)
      ], 6);
    };
  }
});

// node_modules/yc-design-vue/es/Avatar/Avatar.vue.js
var _Avatar = _export_sfc(_sfc_main42, [["__scopeId", "data-v-ab5f9220"]]);

// node_modules/yc-design-vue/es/Popover/index.vue.js
var _hoisted_118 = {
  key: 0,
  class: "yc-popover-title"
};
var _hoisted_212 = { class: "yc-popover-content" };
var _sfc_main43 = defineComponent({
  ...{
    name: "Popover"
  },
  __name: "index",
  props: {
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    title: { default: "" },
    content: { default: "" },
    trigger: { default: "hover" },
    position: { default: "bottom" },
    contentClass: { default: "" },
    contentStyle: { default: () => {
      return {};
    } },
    arrowClass: { default: "" },
    arrowStyle: { default: () => {
      return {};
    } },
    popupContainer: { default: void 0 },
    triggerProps: { default: () => {
      return {};
    } }
  },
  emits: ["update:popupVisible", "popup-visible-change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { popupVisible, defaultPopupVisible } = toRefs(props);
    const computedVisible = useControlValue(
      popupVisible,
      defaultPopupVisible.value,
      (val) => {
        emits("update:popupVisible", val);
        emits("popup-visible-change", val);
      }
    );
    __expose({
      show() {
        computedVisible.value = true;
      },
      hide() {
        computedVisible.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Trigger), mergeProps({
        "popup-visible": unref(computedVisible),
        "onUpdate:popupVisible": _cache[0] || (_cache[0] = ($event) => isRef(computedVisible) ? computedVisible.value = $event : null),
        trigger: _ctx.trigger,
        position: _ctx.position,
        "popup-container": _ctx.popupContainer,
        "arrow-class": ["yc-popover-popup-arrow ", _ctx.arrowClass],
        "arrow-style": _ctx.arrowStyle,
        "content-class": ["yc-popover-popup-content", _ctx.contentClass],
        "content-style": _ctx.contentStyle,
        "popup-offset": 10,
        class: ["yc-popover", _ctx.$attrs.class],
        style: _ctx.$attrs.style,
        "animation-name": "zoom-in-fade-out",
        "need-transform-origin": "",
        "show-arrow": ""
      }, _ctx.triggerProps), {
        content: withCtx(() => [
          _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_118, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_212, [
            renderSlot(_ctx.$slots, "content", {}, () => [
              createTextVNode(toDisplayString(_ctx.content), 1)
            ])
          ])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["popup-visible", "trigger", "position", "popup-container", "arrow-class", "arrow-style", "content-class", "content-style", "class", "style"]);
    };
  }
});

// node_modules/yc-design-vue/es/Popover/index.js
var Popover = Object.assign(_sfc_main43, {
  install: (app) => {
    app.component("Yc" + _sfc_main43.name, _sfc_main43);
  }
});

// node_modules/yc-design-vue/es/Avatar/AvatarGroup.vue2.js
var _hoisted_119 = { class: "yc-avatar-group" };
var _sfc_main44 = defineComponent({
  ...{
    name: "AvatarGroup"
  },
  __name: "AvatarGroup",
  props: {
    shape: { default: "round" },
    size: { default: 40 },
    autoFixFontSize: { type: Boolean, default: true },
    maxCount: { default: 0 },
    zIndexAscend: { type: Boolean, default: false },
    maxStyle: { default: () => {
      return {};
    } },
    maxPopoverTriggerProps: { default: () => {
      return {};
    } }
  },
  setup(__props) {
    const slots = useSlots();
    const props = __props;
    const { maxCount } = toRefs(props);
    useContext6().provide(props);
    const nodes = computed(() => {
      var _a;
      const avatars = findComponentsFromVnodes(
        ((_a = slots.default) == null ? void 0 : _a.call(slots)) || [],
        Avatar.name
      );
      return {
        visible: maxCount.value > 0 ? avatars.slice(0, maxCount.value) : avatars,
        hide: avatars.slice(maxCount.value)
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_119, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(nodes.value.visible, (node, index2) => {
          return openBlock(), createBlock(resolveDynamicComponent(node), {
            key: index2,
            style: normalizeStyle({
              zIndex: _ctx.zIndexAscend ? index2 + 1 : nodes.value.visible.length - index2,
              marginLeft: index2 ? unref(valueToPx)(-_ctx.size / 4) : ""
            })
          }, null, 8, ["style"]);
        }), 128)),
        unref(maxCount) > 0 && nodes.value.hide.length ? (openBlock(), createBlock(unref(Popover), {
          key: 0,
          "trigger-props": _ctx.maxPopoverTriggerProps
        }, {
          content: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(nodes.value.hide, (node, index2) => {
              return openBlock(), createBlock(resolveDynamicComponent(node), {
                key: index2,
                style: normalizeStyle({
                  border: "2px solid #fff",
                  zIndex: _ctx.zIndexAscend ? index2 + 1 : nodes.value.hide.length - index2,
                  marginLeft: index2 ? unref(valueToPx)(-_ctx.size / 4) : ""
                })
              }, null, 8, ["style"]);
            }), 128))
          ]),
          default: withCtx(() => [
            createVNode(unref(Avatar), {
              style: normalizeStyle({
                zIndex: _ctx.zIndexAscend ? nodes.value.visible.length : 0,
                marginLeft: unref(valueToPx)(-_ctx.size / 4),
                ..._ctx.maxStyle
              })
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(`+${nodes.value.hide.length}`), 1)
              ]),
              _: 1
            }, 8, ["style"])
          ]),
          _: 1
        }, 8, ["trigger-props"])) : createCommentVNode("", true)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Avatar/AvatarGroup.vue.js
var AvatarGroup = _export_sfc(_sfc_main44, [["__scopeId", "data-v-9eceed96"]]);

// node_modules/yc-design-vue/es/Avatar/index.js
var Avatar = Object.assign(_Avatar, {
  group: AvatarGroup,
  install: (app) => {
    app.component("Yc" + _Avatar.name, _Avatar);
    app.component("Yc" + AvatarGroup.name, AvatarGroup);
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconToTop.vue.js
var _sfc_main45 = defineComponent({
  __name: "IconToTop",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M43 7H5M24 20v23M24 13.96 30.453 21H17.546L24 13.96Zm.736-.804Z" }, null, -1),
          createBaseVNode("path", {
            d: "m24 14-6 7h12l-6-7Z",
            fill: "currentColor",
            stroke: "none"
          }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/node_modules/b-tween/dist/b-tween.es.js
var easeInBy = function(power) {
  return function(t) {
    return Math.pow(t, power);
  };
};
var easeOutBy = function(power) {
  return function(t) {
    return 1 - Math.abs(Math.pow(t - 1, power));
  };
};
var easeInOutBy = function(power) {
  return function(t) {
    return t < 0.5 ? easeInBy(power)(t * 2) / 2 : easeOutBy(power)(t * 2 - 1) / 2 + 0.5;
  };
};
var linear = function(t) {
  return t;
};
var quadIn = easeInBy(2);
var quadOut = easeOutBy(2);
var quadInOut = easeInOutBy(2);
var cubicIn = easeInBy(3);
var cubicOut = easeOutBy(3);
var cubicInOut = easeInOutBy(3);
var quartIn = easeInBy(4);
var quartOut = easeOutBy(4);
var quartInOut = easeInOutBy(4);
var quintIn = easeInBy(5);
var quintOut = easeOutBy(5);
var quintInOut = easeInOutBy(5);
var sineIn = function(t) {
  return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);
};
var sineOut = function(t) {
  return Math.sin(Math.PI / 2 * t);
};
var sineInOut = function(t) {
  return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
};
var bounceOut = function(t) {
  var s = 7.5625;
  var p = 2.75;
  if (t < 1 / p) {
    return s * t * t;
  }
  if (t < 2 / p) {
    t -= 1.5 / p;
    return s * t * t + 0.75;
  }
  if (t < 2.5 / p) {
    t -= 2.25 / p;
    return s * t * t + 0.9375;
  }
  t -= 2.625 / p;
  return s * t * t + 0.984375;
};
var bounceIn = function(t) {
  return 1 - bounceOut(1 - t);
};
var bounceInOut = function(t) {
  return t < 0.5 ? bounceIn(t * 2) * 0.5 : bounceOut(t * 2 - 1) * 0.5 + 0.5;
};
var easing = Object.freeze({
  linear,
  quadIn,
  quadOut,
  quadInOut,
  cubicIn,
  cubicOut,
  cubicInOut,
  quartIn,
  quartOut,
  quartInOut,
  quintIn,
  quintOut,
  quintInOut,
  sineIn,
  sineOut,
  sineInOut,
  bounceOut,
  bounceIn,
  bounceInOut
});
var Tween = function Tween2(settings) {
  var from = settings.from;
  var to = settings.to;
  var duration3 = settings.duration;
  var delay = settings.delay;
  var easing2 = settings.easing;
  var onStart = settings.onStart;
  var onUpdate = settings.onUpdate;
  var onFinish = settings.onFinish;
  for (var key in from) {
    if (to[key] === void 0) {
      to[key] = from[key];
    }
  }
  for (var key$1 in to) {
    if (from[key$1] === void 0) {
      from[key$1] = to[key$1];
    }
  }
  this.from = from;
  this.to = to;
  this.duration = duration3 || 500;
  this.delay = delay || 0;
  this.easing = easing2 || "linear";
  this.onStart = onStart;
  this.onUpdate = onUpdate || function() {
  };
  this.onFinish = onFinish;
  this.startTime = Date.now() + this.delay;
  this.started = false;
  this.finished = false;
  this.timer = null;
  this.keys = {};
};
Tween.prototype.update = function update() {
  this.time = Date.now();
  if (this.time < this.startTime) {
    return;
  }
  if (this.finished) {
    return;
  }
  if (this.elapsed === this.duration) {
    if (!this.finished) {
      this.finished = true;
      this.onFinish && this.onFinish(this.keys);
    }
    return;
  }
  this.elapsed = this.time - this.startTime;
  this.elapsed = this.elapsed > this.duration ? this.duration : this.elapsed;
  for (var key in this.to) {
    this.keys[key] = this.from[key] + (this.to[key] - this.from[key]) * easing[this.easing](this.elapsed / this.duration);
  }
  if (!this.started) {
    this.onStart && this.onStart(this.keys);
    this.started = true;
  }
  this.onUpdate(this.keys);
};
Tween.prototype.start = function start() {
  var this$1$1 = this;
  this.startTime = Date.now() + this.delay;
  var tick = function() {
    this$1$1.update();
    this$1$1.timer = requestAnimationFrame(tick);
    if (this$1$1.finished) {
      cancelAnimationFrame(this$1$1.timer);
      this$1$1.timer = null;
    }
  };
  tick();
};
Tween.prototype.stop = function stop() {
  cancelAnimationFrame(this.timer);
  this.timer = null;
};

// node_modules/yc-design-vue/es/Button/hooks/useContext.js
var BUTTON_GROUP_CONTEXT_KEY = "button-group-context";
var useContext7 = () => {
  const provide$1 = (props) => {
    const { type, status, shape, disabled } = toRefs(props);
    const { size } = getGlobalConfig(props);
    provide(BUTTON_GROUP_CONTEXT_KEY, {
      type,
      status,
      size,
      shape,
      disabled
    });
  };
  const inject$1 = (props) => {
    const { size: globalSize } = getGlobalConfig(props);
    const { type, status, shape, size, disabled } = toRefs(
      props
    );
    const {
      type: _type,
      status: _status,
      shape: _shape,
      disabled: _disabled,
      size: _size
    } = inject(BUTTON_GROUP_CONTEXT_KEY, {
      type: ref("secondary"),
      status: ref("normal"),
      shape: ref("square"),
      disabled: ref(false)
    });
    const getField = (value, injectValue, globalValue) => {
      if (!isUndefined(value)) {
        return value;
      }
      if (isUndefined(globalValue)) {
        return injectValue;
      }
      return !isUndefined(injectValue) ? injectValue : globalValue;
    };
    return {
      disabled: computed(() => disabled.value ?? _disabled.value),
      type: computed(() => type.value ?? _type.value),
      status: computed(() => status.value ?? _status.value),
      shape: computed(() => shape.value ?? _shape.value),
      size: computed(
        () => getField(size.value, _size == null ? void 0 : _size.value, globalSize.value)
      )
    };
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Button/Button.vue2.js
var _hoisted_120 = ["href"];
var _hoisted_213 = {
  key: 0,
  class: "yc-button-icon"
};
var _hoisted_37 = ["type", "disabled"];
var _hoisted_44 = {
  key: 0,
  class: "yc-button-icon"
};
var _sfc_main46 = defineComponent({
  ...{
    name: "Button"
  },
  __name: "Button",
  props: {
    type: { default: void 0 },
    shape: { default: void 0 },
    status: { default: void 0 },
    size: { default: void 0 },
    long: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: void 0 },
    htmlType: { default: "button" },
    href: { default: "" }
  },
  emits: ["mousedown", "mouseup", "click", "dblclick", "contextmenu"],
  setup(__props, { emit: __emit }) {
    const slots = useSlots();
    const props = __props;
    const emits = __emit;
    const {
      loading,
      disabled: _disabled,
      type: _type,
      status: _status,
      shape: _shape,
      long
    } = toRefs(props);
    const { size, disabled, type, status, shape } = useContext7().inject(props);
    const className = computed(() => {
      return [
        "yc-button",
        `yc-button-size-${size.value}`,
        `yc-button-${type.value}`,
        `yc-button-status-${status.value}`,
        `yc-button-shape-${shape.value}`,
        {
          "yc-button-long": long.value,
          "yc-button-loading": loading.value,
          "yc-button-disabled": disabled.value,
          "yc-button-only-icon": !slots.default
        }
      ];
    });
    const handleEvent = (type2, e) => {
      if (disabled.value || loading.value) return;
      emits(type2, e);
    };
    return (_ctx, _cache) => {
      return _ctx.href ? (openBlock(), createElementBlock("a", mergeProps({
        key: 0,
        href: _ctx.href,
        class: className.value
      }, _ctx.$attrs, {
        onMousedown: _cache[0] || (_cache[0] = ($event) => handleEvent("mousedown", $event)),
        onMouseup: _cache[1] || (_cache[1] = ($event) => handleEvent("mouseup", $event)),
        onClick: _cache[2] || (_cache[2] = ($event) => handleEvent("click", $event)),
        onDblclick: _cache[3] || (_cache[3] = ($event) => handleEvent("dblclick", $event)),
        onContextmenu: _cache[4] || (_cache[4] = ($event) => handleEvent("contextmenu", $event))
      }), [
        _ctx.$slots.icon || unref(loading) ? (openBlock(), createElementBlock("span", _hoisted_213, [
          unref(loading) ? (openBlock(), createBlock(unref(Spin), {
            key: 0,
            "is-size-inherit": ""
          })) : renderSlot(_ctx.$slots, "icon", { key: 1 }, void 0, true)
        ])) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 16, _hoisted_120)) : (openBlock(), createElementBlock("button", mergeProps({
        key: 1,
        type: _ctx.htmlType,
        disabled: unref(disabled),
        class: className.value
      }, _ctx.$attrs, {
        onMousedown: _cache[5] || (_cache[5] = ($event) => handleEvent("mousedown", $event)),
        onMouseup: _cache[6] || (_cache[6] = ($event) => handleEvent("mouseup", $event)),
        onClick: _cache[7] || (_cache[7] = ($event) => handleEvent("click", $event)),
        onDblclick: _cache[8] || (_cache[8] = ($event) => handleEvent("dblclick", $event)),
        onContextmenu: _cache[9] || (_cache[9] = ($event) => handleEvent("contextmenu", $event))
      }), [
        _ctx.$slots.icon || unref(loading) ? (openBlock(), createElementBlock("span", _hoisted_44, [
          unref(loading) ? (openBlock(), createBlock(unref(Spin), {
            key: 0,
            "is-size-inherit": ""
          })) : renderSlot(_ctx.$slots, "icon", { key: 1 }, void 0, true)
        ])) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 16, _hoisted_37));
    };
  }
});

// node_modules/yc-design-vue/es/Button/Button.vue.js
var _Button = _export_sfc(_sfc_main46, [["__scopeId", "data-v-2327bc3e"]]);

// node_modules/yc-design-vue/es/Button/ButtonGroup.vue.js
var _sfc_main47 = defineComponent({
  ...{
    name: "ButtonGroup"
  },
  __name: "ButtonGroup",
  props: {
    type: { default: "secondary" },
    status: { default: "normal" },
    shape: { default: "square" },
    size: { default: void 0 },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    useContext7().provide(props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-button-group",
          `yc-button-group-${_ctx.type}`,
          `yc-button-group-status-${_ctx.status}`
        ])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Button/index.js
var Button = Object.assign(_Button, {
  group: _sfc_main47,
  install: (app) => {
    app.component("Yc" + _Button.name, _Button);
    app.component("Yc" + _sfc_main47.name, _sfc_main47);
  }
});

// node_modules/yc-design-vue/es/BackTop/index.vue2.js
var _sfc_main48 = defineComponent({
  ...{
    name: "BackTop"
  },
  __name: "index",
  props: {
    visibleHeight: { default: 200 },
    targetContainer: {},
    easeing: { default: "quadOut" },
    duration: { default: 200 }
  },
  setup(__props) {
    const props = __props;
    const { targetContainer: _targetContainer, easeing, duration: duration3 } = toRefs(props);
    const { zIndex } = getGlobalConfig(props);
    const buttonRef = ref();
    const curScroll = ref(0);
    const targetContainer = computed(() => {
      return isUndefined(_targetContainer.value) ? findFirstScrollableParent(buttonRef.value) : getElement(_targetContainer.value);
    });
    const handleTop = () => {
      if (!targetContainer.value) return;
      new Tween({
        from: { scroll: targetContainer.value.scrollTop },
        to: { scroll: 0 },
        duration: duration3.value,
        easing: easeing.value,
        onUpdate: (current) => {
          targetContainer.value.scrollTop = current.scroll;
        }
      }).start();
    };
    useEventListener(targetContainer, "scroll", () => {
      curScroll.value = targetContainer.value.scrollTop;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, { name: "fade" }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", {
            class: "yc-back-top",
            style: normalizeStyle({
              zIndex: unref(zIndex)
            }),
            ref_key: "buttonRef",
            ref: buttonRef,
            onClick: handleTop
          }, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createVNode(unref(Button), {
                type: "primary",
                shape: "circle",
                size: "large"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main45))
                ]),
                _: 1
              })
            ], true)
          ], 4), [
            [vShow, curScroll.value >= _ctx.visibleHeight]
          ])
        ]),
        _: 3
      });
    };
  }
});

// node_modules/yc-design-vue/es/BackTop/index.vue.js
var _BackTop = _export_sfc(_sfc_main48, [["__scopeId", "data-v-1a91c814"]]);

// node_modules/yc-design-vue/es/BackTop/index.js
var BackTop = Object.assign(_BackTop, {
  install: (app) => {
    app.component("Yc" + _BackTop.name, _BackTop);
  }
});

// node_modules/yc-design-vue/es/Badge/index.vue2.js
var _hoisted_121 = {
  key: 0,
  class: "yc-badge-stauts-wrapper"
};
var _hoisted_214 = {
  key: 0,
  class: "yc-badge-status-text"
};
var _sfc_main49 = defineComponent({
  ...{
    name: "Badge"
  },
  __name: "index",
  props: {
    text: { default: "" },
    dot: { type: Boolean, default: false },
    dotStyle: { default: () => {
      return {};
    } },
    maxCount: { default: 99 },
    offset: { default: () => {
      return [0, 0];
    } },
    color: { default: void 0 },
    status: { default: void 0 },
    count: { default: void 0 }
  },
  setup(__props) {
    const slots = useSlots();
    const props = __props;
    const { text, dot, count, maxCount, offset, dotStyle, status, color } = toRefs(props);
    const style = computed(() => {
      return {
        margin: `${valueToPx(offset.value[1])} ${valueToPx(-offset.value[0])} 0 0`,
        ...dotStyle.value
      };
    });
    const className = computed(() => {
      if (slots.content) return "yc-badge-custom-dot";
      if (color.value || status.value) return "yc-badge-status";
      if (text.value) return "yc-badge-text";
      if (dot.value) return "yc-badge-dot";
      else return "yc-badge-number";
    });
    const badgeText = computed(() => {
      if (color.value || status.value || text.value || dot.value) return text.value;
      else
        return count.value >= maxCount.value ? `${maxCount.value}+` : count.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["yc-badge", { "yc-badge-no-children": !_ctx.$slots.default }])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        className.value == "yc-badge-status" ? (openBlock(), createElementBlock("div", _hoisted_121, [
          createBaseVNode("div", {
            class: normalizeClass([
              "yc-badge-stauts-dot",
              {
                [`yc-badge-color-${unref(color)}`]: unref(color),
                [`yc-badge-status-${unref(status)}`]: unref(status)
              }
            ]),
            style: normalizeStyle({
              backgroundColor: !unref(TAG_PRESET_COLORS).includes(unref(color)) ? unref(color) : "",
              ...unref(dotStyle)
            })
          }, null, 6),
          badgeText.value ? (openBlock(), createElementBlock("div", _hoisted_214, toDisplayString(badgeText.value), 1)) : createCommentVNode("", true)
        ])) : className.value != "yc-badge-number" || unref(count) > 0 ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass([className.value]),
          style: normalizeStyle(style.value)
        }, [
          renderSlot(_ctx.$slots, "content", {}, () => [
            createTextVNode(toDisplayString(badgeText.value), 1)
          ], true)
        ], 6)) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Badge/index.vue.js
var _Badge = _export_sfc(_sfc_main49, [["__scopeId", "data-v-d3df3cf9"]]);

// node_modules/yc-design-vue/es/Badge/index.js
var Badge = Object.assign(_Badge, {
  install: (app) => {
    app.component("Yc" + _Badge.name, _Badge);
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconSeparator.vue.js
var _sfc_main50 = defineComponent({
  __name: "IconSeparator",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M29.506 6.502 18.493 41.498" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Breadcrumb/BreadcrumbSeparator.vue2.js
var _hoisted_122 = { class: "yc-breadcrumb-item-separator" };
var _sfc_main51 = defineComponent({
  __name: "BreadcrumbSeparator",
  props: {
    separatorSlots: { type: Function },
    separator: {},
    itemSeparatorSlots: { type: Function },
    itemSeparator: {}
  },
  setup(__props) {
    const props = __props;
    const showSeparator = computed(() => {
      if (isUndefined(props.itemSeparatorSlots)) {
        return props.separatorSlots || props.separator;
      } else {
        return props.itemSeparatorSlots || props.itemSeparator || props.separatorSlots || props.separator;
      }
    });
    const renderSeparator = () => {
      var _a, _b, _c;
      if (isUndefined(props.itemSeparatorSlots)) {
        return ((_a = props.separatorSlots) == null ? void 0 : _a.call(props)) || props.separator;
      } else {
        return ((_b = props.itemSeparatorSlots) == null ? void 0 : _b.call(props)) || props.itemSeparator || ((_c = props.separatorSlots) == null ? void 0 : _c.call(props)) || props.separator;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", _hoisted_122, [
        showSeparator.value ? (openBlock(), createBlock(resolveDynamicComponent(renderSeparator), { key: 0 })) : (openBlock(), createBlock(unref(_sfc_main50), { key: 1 }))
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Breadcrumb/BreadcrumbSeparator.vue.js
var BreadcrumbSeparator = _export_sfc(_sfc_main51, [["__scopeId", "data-v-9bd4b484"]]);

// node_modules/yc-design-vue/es/_shared/icons/IconMore.vue.js
var _sfc_main52 = defineComponent({
  __name: "IconMore",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", {
            fill: "currentColor",
            stroke: "none",
            d: "M38 25v-2h2v2h-2ZM23 25v-2h2v2h-2ZM8 25v-2h2v2H8Z"
          }, null, -1),
          createBaseVNode("path", { d: "M38 25v-2h2v2h-2ZM23 25v-2h2v2h-2ZM8 25v-2h2v2H8Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Dropdown/hooks/useContext.js
var DROPDOWN_CONTEXT_KEY = "dropdown-context";
var useContext8 = () => {
  const provide$1 = (props, emits) => {
    const {
      popupVisible,
      defaultPopupVisible,
      hideOnSelect,
      theme,
      position: _position
    } = toRefs(props);
    const computedVisible = useControlValue(
      popupVisible,
      defaultPopupVisible.value,
      (val) => {
        emits("update:popupVisible", val);
        emits("popup-visible-change", val);
      }
    );
    provide(DROPDOWN_CONTEXT_KEY, {
      theme,
      select: (value, ev) => {
        emits("select", value, ev);
        if (!hideOnSelect.value) return;
        computedVisible.value = false;
      }
    });
    return {
      computedVisible
    };
  };
  const inject$1 = () => {
    return inject(DROPDOWN_CONTEXT_KEY, {
      theme: ref("light"),
      select: () => {
      }
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Dropdown/Dropdown.vue.js
var _hoisted_123 = { class: "yc-dropdown" };
var _hoisted_215 = { class: "yc-dropdown-list" };
var _hoisted_38 = {
  key: 0,
  class: "yc-dropdown-footer"
};
var _sfc_main53 = defineComponent({
  ...{
    name: "Dropdown"
  },
  __name: "Dropdown",
  props: {
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    trigger: { default: "click" },
    position: { default: "bottom" },
    popupContainer: { default: void 0 },
    hideOnSelect: { type: Boolean, default: true },
    alignPoint: { type: Boolean, default: false },
    triggerProps: { default: () => {
      return {};
    } },
    popupMaxHeight: { type: [Number, Boolean], default: 200 },
    theme: { default: "light" }
  },
  emits: ["update:popupVisible", "popup-visible-change", "select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      trigger,
      position: _position,
      popupMaxHeight: _popupMaxHeight
    } = toRefs(props);
    const { computedVisible } = useContext8().provide(props, emits);
    const position = computed(() => {
      return ["top", "tl", "tr", "bottom", "bl", "br"].includes(_position.value) ? _position.value : "bottom";
    });
    const popupMaxHeight = computed(() => {
      if (isBoolean(_popupMaxHeight.value) && !_popupMaxHeight.value || isUndefined(_popupMaxHeight)) {
        return "";
      }
      return valueToPx(
        isBoolean(_popupMaxHeight.value) ? 200 : _popupMaxHeight.value
      );
    });
    __expose({
      show() {
        computedVisible.value = true;
      },
      hide() {
        computedVisible.value = true;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Trigger), mergeProps({
        "popup-visible": unref(computedVisible),
        "onUpdate:popupVisible": _cache[0] || (_cache[0] = ($event) => isRef(computedVisible) ? computedVisible.value = $event : null),
        trigger: unref(trigger),
        position: position.value,
        "popup-offset": 4,
        "mouse-enter-delay": 150,
        "mouse-leave-delay": 150,
        alignPoint: _ctx.alignPoint,
        "auto-fit-popup-min-width": !_ctx.alignPoint && ["top", "bottom"].includes(position.value),
        class: ["yc-dropdown-popup", , `yc-dropdown-theme-${_ctx.theme}`, _ctx.$attrs.class],
        style: _ctx.$attrs.style,
        "animation-name": "slide-dynamic-origin",
        "need-transform-origin": ""
      }, _ctx.triggerProps), {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_123, [
            createVNode(unref(Scrollbar), {
              style: normalizeStyle({
                maxHeight: popupMaxHeight.value
              })
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_215, [
                  renderSlot(_ctx.$slots, "content")
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_38, [
              renderSlot(_ctx.$slots, "footer")
            ])) : createCommentVNode("", true)
          ])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["popup-visible", "trigger", "position", "alignPoint", "auto-fit-popup-min-width", "class", "style"]);
    };
  }
});

// node_modules/yc-design-vue/es/Dropdown/Doption.vue2.js
var _hoisted_124 = {
  key: 0,
  class: "yc-dropdown-option-icon"
};
var _hoisted_216 = { class: "yc-dropdown-option-content text-ellipsis" };
var _hoisted_39 = {
  key: 1,
  class: "yc-dropdown-option-suffix"
};
var _sfc_main54 = defineComponent({
  ...{
    name: "Doption"
  },
  __name: "Doption",
  props: {
    value: { type: [String, Number, Boolean, Object] },
    disabled: { type: Boolean, default: false },
    isSubmenu: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { value: optionValue, disabled, isSubmenu } = toRefs(props);
    const { select, theme } = useContext8().inject();
    const handleClick = (ev) => {
      if (disabled.value) return;
      emits("click", ev);
      if (isSubmenu.value) return;
      select(optionValue.value, ev);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-dropdown-option",
          `yc-dropdown-option-theme-${unref(theme)}`,
          {
            "yc-dropdown-option-active": _ctx.isActive,
            "yc-dropdown-option-disabled": unref(disabled),
            "yc-dropdown-option-has-suffix": _ctx.$slots.suffix
          }
        ]),
        onClick: handleClick
      }, [
        _ctx.$slots.icon ? (openBlock(), createElementBlock("div", _hoisted_124, [
          renderSlot(_ctx.$slots, "icon", {}, void 0, true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_216, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _ctx.$slots.suffix ? (openBlock(), createElementBlock("div", _hoisted_39, [
          renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Dropdown/Doption.vue.js
var Doption = _export_sfc(_sfc_main54, [["__scopeId", "data-v-05a4bb68"]]);

// node_modules/yc-design-vue/es/Dropdown/Dgroup.vue2.js
var _hoisted_125 = { class: "yc-dropdown-group-title text-ellipsis" };
var _sfc_main55 = defineComponent({
  ...{
    name: "Dgroup"
  },
  __name: "Dgroup",
  props: {
    title: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_125, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(_ctx.title), 1)
          ], true)
        ]),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 64);
    };
  }
});

// node_modules/yc-design-vue/es/Dropdown/Dgroup.vue.js
var Dgroup = _export_sfc(_sfc_main55, [["__scopeId", "data-v-2fca632e"]]);

// node_modules/yc-design-vue/es/Dropdown/DropdownButton.vue.js
var _sfc_main56 = defineComponent({
  ...{
    name: "DropdownButton"
  },
  __name: "DropdownButton",
  props: {
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    trigger: { default: "click" },
    position: { default: "br" },
    popupContainer: { default: void 0 },
    disabled: { type: Boolean, default: false },
    type: { default: "secondary" },
    size: { default: void 0 },
    buttonProps: { default: () => {
      return {};
    } },
    hideOnSelect: { type: Boolean, default: true }
  },
  emits: ["popup-visible-change", "click", "select"],
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main47), {
        disabled: _ctx.disabled,
        type: _ctx.type,
        size: _ctx.size
      }, {
        default: withCtx(() => [
          createVNode(unref(Button), mergeProps(_ctx.buttonProps, {
            onClick: _cache[0] || (_cache[0] = (ev) => _ctx.$emit("click", ev))
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16),
          createVNode(_sfc_main53, mergeProps({
            "popup-visible": _ctx.popupVisible,
            "default-popup-visible": _ctx.defaultPopupVisible,
            trigger: _ctx.trigger,
            position: _ctx.position,
            "popup-container": _ctx.popupContainer,
            "hide-on-select": _ctx.hideOnSelect,
            disabled: _ctx.disabled
          }, _ctx.$attrs, {
            onSelect: _cache[1] || (_cache[1] = (v) => _ctx.$emit("select", v)),
            onPopupVisibleChange: _cache[2] || (_cache[2] = (v) => _ctx.$emit("popup-visible-change", v))
          }), {
            content: withCtx(() => [
              renderSlot(_ctx.$slots, "content")
            ]),
            default: withCtx(() => [
              createVNode(unref(Button), normalizeProps(guardReactiveProps(_ctx.buttonProps)), {
                icon: withCtx(() => [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    createVNode(unref(_sfc_main52))
                  ])
                ]),
                _: 3
              }, 16)
            ]),
            _: 3
          }, 16, ["popup-visible", "default-popup-visible", "trigger", "position", "popup-container", "hide-on-select", "disabled"])
        ]),
        _: 3
      }, 8, ["disabled", "type", "size"]);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconArrowRight.vue.js
var _sfc_main57 = defineComponent({
  __name: "IconArrowRight",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "m16 39.513 15.556-15.557L16 8.4" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Dropdown/Dsubmenu.vue2.js
var _hoisted_126 = { class: "yc-dropdown-list" };
var _hoisted_217 = {
  key: 0,
  class: "yc-dropdown-footer"
};
var _sfc_main58 = defineComponent({
  ...{
    name: "Dsubmenu"
  },
  __name: "Dsubmenu",
  props: {
    disabled: { type: Boolean, default: false },
    trigger: { default: "click" },
    position: { default: "rt" },
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    triggerProps: { default: () => {
      return {};
    } },
    popupMaxHeight: { default: 200 }
  },
  emits: ["update:popupVisible", "popup-visible-change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      defaultPopupVisible,
      popupVisible,
      trigger: _trigger,
      position: _position,
      popupMaxHeight: _popupMaxHeight
    } = toRefs(props);
    const { theme } = useContext8().inject();
    const computedVisible = useControlValue(
      popupVisible,
      defaultPopupVisible.value,
      (val) => {
        emits("update:popupVisible", val);
        emits("popup-visible-change", val);
      }
    );
    const optionRef = ref();
    const triggerRef = ref();
    const position = computed(() => {
      return ["rt", "lt"].includes(_position.value) ? _position.value : "rt";
    });
    const trigger = computed(() => {
      return ["hover", "click"].includes(_trigger.value) ? _trigger.value : "hover";
    });
    const popupMaxHeight = computed(() => {
      if (isBoolean(_popupMaxHeight.value) && !_popupMaxHeight.value || isUndefined(_popupMaxHeight)) {
        return "";
      }
      return valueToPx(
        isBoolean(_popupMaxHeight.value) ? 200 : _popupMaxHeight.value
      );
    });
    const handleCalcStyle = async () => {
      var _a;
      await nextTick();
      const dom = unrefElement(optionRef);
      if (!dom) return;
      const { left, top, right, width } = dom.getBoundingClientRect();
      const x = position.value == "rt" ? right : left - width;
      const y = top - 5;
      (_a = triggerRef.value) == null ? void 0 : _a.updatePosition(x, y);
    };
    __expose({
      show() {
        computedVisible.value = true;
      },
      hide() {
        computedVisible.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Trigger), mergeProps({
        "popup-visible": unref(computedVisible),
        "onUpdate:popupVisible": _cache[0] || (_cache[0] = ($event) => isRef(computedVisible) ? computedVisible.value = $event : null),
        trigger: trigger.value,
        position: position.value,
        "popup-offset": 4,
        disabled: _ctx.disabled,
        "mouse-enter-delay": 150,
        "mouse-leave-delay": 150,
        "on-trigger-mouseenter": handleCalcStyle,
        "on-trigger-mouseclick": handleCalcStyle,
        "need-transform-origin": "",
        "auto-set-position": "",
        "auto-fit-popup-min-width": "",
        ref_key: "triggerRef",
        ref: triggerRef
      }, _ctx.triggerProps), {
        content: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(["yc-dropdown", `yc-dropdown-theme-${unref(theme)}`])
          }, [
            createVNode(unref(Scrollbar), {
              style: normalizeStyle({
                maxHeight: popupMaxHeight.value
              })
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_126, [
                  renderSlot(_ctx.$slots, "content", {}, void 0, true)
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_217, [
              renderSlot(_ctx.$slots, "footer", {}, void 0, true)
            ])) : createCommentVNode("", true)
          ], 2)
        ]),
        default: withCtx(() => [
          createVNode(unref(Doption), {
            disabled: _ctx.disabled,
            theme: unref(theme),
            class: normalizeClass(_ctx.$attrs.class),
            style: normalizeStyle(_ctx.$attrs.style),
            "is-submenu": "",
            ref_key: "optionRef",
            ref: optionRef
          }, {
            suffix: withCtx(() => [
              createVNode(unref(_sfc_main57))
            ]),
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ]),
            _: 3
          }, 8, ["disabled", "theme", "class", "style"])
        ]),
        _: 3
      }, 16, ["popup-visible", "trigger", "position", "disabled"]);
    };
  }
});

// node_modules/yc-design-vue/es/Dropdown/Dsubmenu.vue.js
var Dsubmenu = _export_sfc(_sfc_main58, [["__scopeId", "data-v-7a40c502"]]);

// node_modules/yc-design-vue/es/Dropdown/index.js
var Dropdown = Object.assign(_sfc_main53, {
  option: Doption,
  group: Dgroup,
  button: _sfc_main56,
  submenu: Dsubmenu,
  install: (app) => {
    app.component("Yc" + _sfc_main53.name, _sfc_main53);
    app.component("Yc" + Doption.name, Doption);
    app.component("Yc" + Dgroup.name, Dgroup);
    app.component("Yc" + _sfc_main56.name, _sfc_main56);
    app.component("Yc" + Dsubmenu.name, Dsubmenu);
  }
});

// node_modules/yc-design-vue/es/Breadcrumb/BreadcrumbItem.vue2.js
var _hoisted_127 = { class: "yc-breadcrumb-item" };
var _hoisted_218 = ["href"];
var _hoisted_310 = {
  key: 2,
  class: "yc-breadcrumb-item-dropdown-icon"
};
var _sfc_main59 = defineComponent({
  ...{
    name: "BreadcrumbItem"
  },
  __name: "BreadcrumbItem",
  props: {
    separator: { default: "" },
    droplist: { default: () => [] },
    dropdownProps: { default: () => {
      return {};
    } },
    path: { default: "" },
    showSeparator: { type: Boolean, default: true }
  },
  setup(__props) {
    const popupVisible = ref(false);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Dropdown), mergeProps({
        "popup-visible": popupVisible.value,
        "onUpdate:popupVisible": _cache[0] || (_cache[0] = ($event) => popupVisible.value = $event)
      }, _ctx.dropdownProps, {
        disabled: !_ctx.droplist.length && !_ctx.$slots.droplist
      }), {
        content: withCtx(() => [
          renderSlot(_ctx.$slots, "droplist", {}, () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.droplist, (item) => {
              return openBlock(), createBlock(unref(Doption), {
                key: item.path,
                value: item.path
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(item.label), 1)
                ]),
                _: 2
              }, 1032, ["value"]);
            }), 128))
          ], true)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_127, [
            _ctx.path ? (openBlock(), createElementBlock("a", {
              key: 0,
              href: `#${_ctx.path}`
            }, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 8, _hoisted_218)) : renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true),
            _ctx.droplist.length || _ctx.$slots.droplist ? (openBlock(), createElementBlock("div", _hoisted_310, [
              createVNode(unref(_sfc_main17), {
                rotate: popupVisible.value ? 180 : 0
              }, null, 8, ["rotate"])
            ])) : createCommentVNode("", true)
          ])
        ]),
        _: 3
      }, 16, ["popup-visible", "disabled"]);
    };
  }
});

// node_modules/yc-design-vue/es/Breadcrumb/BreadcrumbItem.vue.js
var BreadcrumbItem = _export_sfc(_sfc_main59, [["__scopeId", "data-v-264f7f1b"]]);

// node_modules/yc-design-vue/es/Breadcrumb/BreadcrumbMore.vue.js
var _sfc_main60 = defineComponent({
  __name: "BreadcrumbMore",
  props: {
    slots: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(BreadcrumbItem, null, {
        default: withCtx(() => [
          _ctx.slots["more-icon"] ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.slots["more-icon"]), { key: 0 })) : (openBlock(), createBlock(unref(_sfc_main52), { key: 1 }))
        ]),
        _: 1
      });
    };
  }
});

// node_modules/yc-design-vue/es/Breadcrumb/Breadcrumb.vue2.js
var _hoisted_128 = { class: "yc-breadcrumb" };
var _sfc_main61 = defineComponent({
  ...{
    name: "Breadcrumb"
  },
  __name: "Breadcrumb",
  props: {
    maxCount: { default: 0 },
    routes: { default: () => [] },
    separator: { default: "" },
    customUrl: { type: Function, default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { maxCount, routes } = toRefs(props);
    const slots = useSlots();
    const breadcrumbItems = computed(() => {
      var _a;
      const nodes = findComponentsFromVnodes(
        ((_a = slots.default) == null ? void 0 : _a.call(slots)) || [],
        BreadcrumbItem.name
      );
      return maxCount.value > 0 && nodes.length > maxCount.value ? [
        ...nodes.slice(0, 1),
        {
          type: "more-icon"
        },
        ...nodes.slice(nodes.length - maxCount.value + 1, nodes.length)
      ] : nodes;
    });
    const routeData = computed(() => {
      const data = routes.value.map((item, i) => {
        return {
          ...item,
          index: i
        };
      });
      return maxCount.value > 0 && data.length > maxCount.value ? [
        ...data.slice(0, 1),
        "more-icon",
        ...data.slice(data.length - maxCount.value + 1, data.length)
      ] : routes.value;
    });
    const getPaths = (index2) => {
      return routes.value.slice(0, index2 + 1).map((item) => {
        var _a;
        return (_a = item.path) == null ? void 0 : _a.replace(/\//g, "");
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_128, [
        _ctx.$slots.default ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(breadcrumbItems.value, (node, i) => {
          var _a, _b;
          return openBlock(), createElementBlock(Fragment, { key: i }, [
            (node == null ? void 0 : node.type) == "more-icon" ? (openBlock(), createBlock(_sfc_main60, {
              key: 0,
              slots: unref(slots)
            }, null, 8, ["slots"])) : (openBlock(), createBlock(resolveDynamicComponent(node), { key: 1 })),
            i < breadcrumbItems.value.length - 1 ? (openBlock(), createBlock(BreadcrumbSeparator, {
              key: 2,
              separator: _ctx.separator,
              "separator-slots": _ctx.$slots.separator,
              "item-separator": (_a = node.props) == null ? void 0 : _a.separator,
              "item-separator-slots": (_b = node.children) == null ? void 0 : _b.separator
            }, null, 8, ["separator", "separator-slots", "item-separator", "item-separator-slots"])) : createCommentVNode("", true)
          ], 64);
        }), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(routeData.value, (route, i) => {
          return openBlock(), createElementBlock(Fragment, {
            key: route.path
          }, [
            unref(isString)(route) ? (openBlock(), createBlock(_sfc_main60, {
              key: 0,
              slots: unref(slots)
            }, null, 8, ["slots"])) : renderSlot(_ctx.$slots, "item-render", {
              key: 1,
              route,
              routes: unref(routes),
              paths: getPaths(route.index)
            }, () => {
              var _a;
              return [
                createVNode(unref(BreadcrumbItem), {
                  path: route.index == routeData.value.length - 1 ? route.path : ((_a = _ctx.customUrl) == null ? void 0 : _a.call(_ctx, getPaths(route.index))) ?? route.path,
                  droplist: route.children
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(route.label), 1)
                  ]),
                  _: 2
                }, 1032, ["path", "droplist"])
              ];
            }, true),
            i < unref(routes).length - 1 ? (openBlock(), createBlock(BreadcrumbSeparator, {
              key: 2,
              separator: _ctx.separator,
              "separator-slots": _ctx.$slots.separator
            }, null, 8, ["separator", "separator-slots"])) : createCommentVNode("", true)
          ], 64);
        }), 128))
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Breadcrumb/Breadcrumb.vue.js
var _Breadcrumb = _export_sfc(_sfc_main61, [["__scopeId", "data-v-2813e3a7"]]);

// node_modules/yc-design-vue/es/Breadcrumb/index.js
var Breadcrumb = Object.assign(_Breadcrumb, {
  item: BreadcrumbItem,
  install: (app) => {
    app.component("Yc" + _Breadcrumb.name, _Breadcrumb);
    app.component("Yc" + BreadcrumbItem.name, BreadcrumbItem);
  }
});

// node_modules/yc-design-vue/es/Card/hooks/useContext.js
var CARD_CONTEXT_KEY = "card-context";
var useContext9 = () => {
  const provide$1 = () => {
    const slots = useSlots();
    provide(CARD_CONTEXT_KEY, {
      slots
    });
    return {
      slots
    };
  };
  const inject$1 = () => {
    return inject(CARD_CONTEXT_KEY, {
      slots: {}
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Card/CardGrid.vue2.js
var _sfc_main62 = defineComponent({
  ...{
    name: "CardGrid"
  },
  __name: "CardGrid",
  props: {
    hoverable: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-card-grid",
          {
            "yc-card-grid-hoverable": _ctx.hoverable
          }
        ])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Card/CardGrid.vue.js
var CardGrid = _export_sfc(_sfc_main62, [["__scopeId", "data-v-d6581cd4"]]);

// node_modules/yc-design-vue/es/Card/CardMeta.vue2.js
var _hoisted_129 = { class: "yc-card-meta" };
var _hoisted_219 = { class: "yc-card-meta-content" };
var _hoisted_311 = {
  key: 0,
  class: "yc-card-meta-title text-ellipsis"
};
var _hoisted_45 = {
  key: 1,
  class: "yc-card-meta-description"
};
var _hoisted_52 = { class: "yc-card-meta-footer" };
var _hoisted_6 = {
  key: 0,
  class: "yc-card-meta-avatar"
};
var _hoisted_7 = {
  key: 1,
  class: "yc-card-actions"
};
var _hoisted_8 = { class: "yc-card-actions-right text-ellipsis" };
var _sfc_main63 = defineComponent({
  ...{
    name: "CardMeta"
  },
  __name: "CardMeta",
  props: {
    title: { default: "" },
    description: { default: "" }
  },
  setup(__props) {
    const { slots } = useContext9().inject();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_129, [
        createBaseVNode("div", _hoisted_219, [
          _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_311, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ], true)
          ])) : createCommentVNode("", true),
          _ctx.$slots.description || _ctx.description ? (openBlock(), createElementBlock("div", _hoisted_45, [
            renderSlot(_ctx.$slots, "description", {}, () => [
              createTextVNode(toDisplayString(_ctx.description), 1)
            ], true)
          ])) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_52, [
          _ctx.$slots.avatar ? (openBlock(), createElementBlock("div", _hoisted_6, [
            renderSlot(_ctx.$slots, "avatar", {}, void 0, true)
          ])) : createCommentVNode("", true),
          unref(slots).actions ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createBaseVNode("div", _hoisted_8, [
              (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(unref(slots).actions))))
            ])
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Card/CardMeta.vue.js
var CardMeta = _export_sfc(_sfc_main63, [["__scopeId", "data-v-3afd68ef"]]);

// node_modules/yc-design-vue/es/Card/Card.vue2.js
var _hoisted_130 = {
  key: 0,
  class: "yc-card-header-title text-ellipsis"
};
var _hoisted_220 = {
  key: 1,
  class: "yc-card-header-extra text-ellipsis"
};
var _hoisted_312 = {
  key: 1,
  class: "yc-card-cover"
};
var _hoisted_46 = {
  key: 2,
  class: "yc-card-actions"
};
var _hoisted_53 = { class: "yc-card-actions-right text-ellipsis" };
var _sfc_main64 = defineComponent({
  ...{
    name: "Card"
  },
  __name: "Card",
  props: {
    bordered: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    hoverable: { type: Boolean, default: false },
    size: { default: void 0 },
    headerStyle: { default: () => {
      return {};
    } },
    bodyStyle: { default: () => {
      return {};
    } },
    title: { default: "" },
    extra: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const { size } = getGlobalConfig(props);
    const { slots } = useContext9().provide();
    const nodes = computed(() => {
      var _a;
      return ((_a = slots.default) == null ? void 0 : _a.call(slots)) || [];
    });
    const hasMeta = computed(() => {
      const meta = findComponentsFromVnodes(nodes.value, CardMeta.name);
      return !!meta.length;
    });
    const hasGrid = computed(() => {
      const grid = findComponentsFromVnodes(nodes.value, CardGrid.name);
      return !!grid.length;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-card",
          `yc-card-size-${unref(size)}`,
          {
            "yc-card-bordered": _ctx.bordered,
            "yc-card-hoverable": _ctx.hoverable,
            "yc-card-loading": _ctx.loading,
            "yc-card-contain-grid": hasGrid.value
          }
        ])
      }, [
        _ctx.title || _ctx.extra || _ctx.$slots.title || _ctx.$slots.extra ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "yc-card-header",
          style: normalizeStyle(_ctx.headerStyle)
        }, [
          _ctx.title || _ctx.$slots.title ? (openBlock(), createElementBlock("div", _hoisted_130, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ], true)
          ])) : createCommentVNode("", true),
          _ctx.extra || _ctx.$slots.extra ? (openBlock(), createElementBlock("div", _hoisted_220, [
            renderSlot(_ctx.$slots, "extra", {}, () => [
              createTextVNode(toDisplayString(_ctx.extra), 1)
            ], true)
          ])) : createCommentVNode("", true)
        ], 4)) : createCommentVNode("", true),
        _ctx.$slots.cover ? (openBlock(), createElementBlock("div", _hoisted_312, [
          renderSlot(_ctx.$slots, "cover", {}, void 0, true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "yc-card-body",
          style: normalizeStyle(_ctx.bodyStyle)
        }, [
          _ctx.loading ? (openBlock(), createBlock(unref(Spin), {
            key: 0,
            "is-size-inherit": "",
            loading: ""
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ]),
            _: 3
          })) : renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true),
          _ctx.$slots.actions && !hasMeta.value ? (openBlock(), createElementBlock("div", _hoisted_46, [
            createBaseVNode("div", _hoisted_53, [
              renderSlot(_ctx.$slots, "actions", {}, void 0, true)
            ])
          ])) : createCommentVNode("", true)
        ], 4)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Card/Card.vue.js
var _Card = _export_sfc(_sfc_main64, [["__scopeId", "data-v-bbd45b76"]]);

// node_modules/yc-design-vue/es/Card/index.js
var Card = Object.assign(_Card, {
  meta: CardMeta,
  grid: CardGrid,
  install: (app) => {
    app.component("Yc" + _Card.name, _Card);
    app.component("Yc" + CardMeta.name, CardMeta);
    app.component("Yc" + CardGrid.name, CardGrid);
  }
});

// node_modules/yc-design-vue/es/Radio/hooks/useContext.js
var RADIO_GROUP_CONTEXT_KEY = "radio-group-context";
var useContext10 = () => {
  const provide$1 = (props, emits) => {
    const {
      modelValue,
      defaultValue,
      disabled,
      type,
      options: _options
    } = toRefs(props);
    const { size } = getGlobalConfig(props);
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
        emits("change", val);
      }
    );
    const options = computed(() => {
      return _options.value.map((item) => {
        return isObject2(item) ? item : {
          label: item,
          value: item
        };
      });
    });
    provide(RADIO_GROUP_CONTEXT_KEY, {
      computedValue,
      type,
      disabled,
      size,
      hasGroup: ref(true),
      emits
    });
    return {
      options
    };
  };
  const inject$1 = () => {
    return inject(RADIO_GROUP_CONTEXT_KEY, {
      computedValue: ref(void 0),
      disabled: ref(false),
      type: ref("radio"),
      size: ref("medium"),
      hasGroup: ref(false),
      emits: () => {
      }
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Radio/Radio.vue2.js
var _hoisted_131 = ["value", "checked", "disabled"];
var _hoisted_221 = {
  key: 0,
  class: "yc-radio-label text-ellipsis"
};
var _hoisted_313 = {
  key: 1,
  class: "yc-radio-button-content"
};
var _sfc_main65 = defineComponent({
  ...{
    name: "Radio"
  },
  __name: "Radio",
  props: {
    modelValue: { type: [String, Number, Boolean], default: void 0 },
    defaultChecked: { type: Boolean, default: false },
    value: { type: [String, Number, Boolean], default: true },
    type: { default: void 0 },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      modelValue,
      defaultChecked,
      value: radioValue,
      disabled,
      type
    } = toRefs(props);
    const {
      computedValue: _computedValue,
      disabled: injectDisabled,
      type: injectType,
      size,
      hasGroup,
      emits: _emits
    } = useContext10().inject();
    const computedValue = useControlValue(
      modelValue,
      defaultChecked.value,
      (val) => {
        emits("update:modelValue", val);
      }
    );
    const checked = computed(() => {
      return hasGroup.value ? _computedValue.value == radioValue.value : computedValue.value;
    });
    const computedDisabled = computed(() => {
      return injectDisabled.value || disabled.value;
    });
    const computedType = computed(() => {
      return type.value ?? injectType.value;
    });
    const handleChange = (e) => {
      if (computedDisabled.value) return;
      if (hasGroup.value) {
        _computedValue.value = radioValue.value;
      } else {
        computedValue.value = radioValue.value;
        emits("change", radioValue.value, e);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: normalizeClass([
          `yc-radio-button-size-${unref(size)}`,
          `yc-radio${computedType.value == "radio" ? "" : "-button"}`,
          `yc-radio-${checked.value ? "checked" : "unchecked"}`,
          {
            "yc-radio-disabled": computedDisabled.value
          }
        ]),
        onClick: handleChange
      }, [
        createBaseVNode("input", {
          type: "radio",
          class: "yc-radio-target",
          value: _ctx.value,
          checked: checked.value,
          disabled: computedDisabled.value
        }, null, 8, _hoisted_131),
        renderSlot(_ctx.$slots, "radio", {
          checked: checked.value,
          disabled: computedDisabled.value
        }, () => [
          computedType.value == "radio" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createVNode(unref(IconButton), {
              "hover-size": 24,
              "hover-color": checked.value || computedDisabled.value ? "transparent" : "rgb(242, 243, 245)"
            }, {
              default: withCtx(() => _cache[0] || (_cache[0] = [
                createBaseVNode("span", { class: "yc-radio-icon" }, null, -1)
              ])),
              _: 1,
              __: [0]
            }, 8, ["hover-color"]),
            _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_221, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ])) : createCommentVNode("", true)
          ], 64)) : (openBlock(), createElementBlock("span", _hoisted_313, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ]))
        ], true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Radio/Radio.vue.js
var _Radio = _export_sfc(_sfc_main65, [["__scopeId", "data-v-05121562"]]);

// node_modules/yc-design-vue/es/Radio/RadioGroup.vue.js
var _sfc_main66 = defineComponent({
  ...{
    name: "RadioGroup"
  },
  __name: "RadioGroup",
  props: {
    modelValue: { type: [String, Number, Boolean], default: void 0 },
    defaultValue: { type: [String, Number, Boolean], default: "" },
    size: { default: void 0 },
    type: { default: "radio" },
    options: { default: () => [] },
    direction: { default: "horizontal" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { options } = useContext10().provide(props, emits);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          _ctx.type == "radio" ? "yc-radio-group" : "yc-radio-button-group",
          _ctx.type == "radio" ? `yc-radio-group-direction-${_ctx.direction}` : `yc-radio-button-group-size-${_ctx.size}`
        ])
      }, [
        renderSlot(_ctx.$slots, "default"),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(options), (item, index2) => {
          return openBlock(), createBlock(_Radio, {
            key: index2,
            value: item.value,
            disabled: item.disabled
          }, createSlots({
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "label", { data: item }, () => [
                createTextVNode(toDisplayString(item.label), 1)
              ])
            ]),
            _: 2
          }, [
            _ctx.$slots.radio ? {
              name: "radio",
              fn: withCtx((scope) => [
                renderSlot(_ctx.$slots, "radio", mergeProps({ ref_for: true }, scope))
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "disabled"]);
        }), 128))
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Radio/index.js
var Radio = Object.assign(_Radio, {
  group: _sfc_main66,
  install: (app) => {
    app.component("Yc" + _Radio.name, _Radio);
    app.component("Yc" + _sfc_main66.name, _sfc_main66);
  }
});

// node_modules/yc-design-vue/es/Calendar/CalendarMonth.vue2.js
var _hoisted_132 = { class: "yc-calendar-week-list" };
var _hoisted_222 = { class: "yc-calendar-month-cell-body" };
var _hoisted_314 = ["onClick"];
var _hoisted_47 = { class: "yc-calendar-date" };
var _hoisted_54 = { class: "yc-calendar-date-value" };
var _hoisted_62 = { class: "yc-calendar-date-circle" };
var _sfc_main67 = defineComponent({
  __name: "CalendarMonth",
  props: {
    computedValue: {},
    recordDate: {},
    calendar: { default: void 0 },
    small: { type: Boolean, default: false }
  },
  emits: ["cell-click"],
  setup(__props) {
    const props = __props;
    const { computedValue, calendar: _calendar, small, recordDate } = toRefs(props);
    const weekList = computed(() => {
      return small.value ? ["日", "一", "二", "三", "四", "五", "六"] : ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    });
    const calendar = useControlValue(_calendar, []);
    watch(
      () => recordDate.value.month,
      () => {
        if (_calendar.value) return;
        const { year, month } = recordDate.value;
        calendar.value = generateMonthCalendar(year, month);
      },
      {
        immediate: true
      }
    );
    const isToday = (col) => {
      const { day, year, month } = col;
      const cur = dayjs();
      const _day = cur.date();
      const _month = cur.month();
      const _year = cur.year();
      return day == _day && month == _month && year == _year;
    };
    const isSelected = (col) => {
      const year = computedValue.value.getFullYear();
      const month = computedValue.value.getMonth();
      const day = computedValue.value.getDate();
      const { day: _day, year: _year, month: _month, isCurrentMonth } = col;
      const isSameDate = day == _day && month == _month && year == _year;
      return small.value ? isSameDate && isCurrentMonth : isSameDate;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-calendar-month",
          {
            "yc-calendar-month-small": unref(small)
          }
        ])
      }, [
        createBaseVNode("div", _hoisted_132, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(weekList.value, (item) => {
            return openBlock(), createElementBlock("div", {
              class: "yc-calendar-week-list-item",
              key: item
            }, toDisplayString(item), 1);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_222, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(calendar), (row, i) => {
            return openBlock(), createElementBlock("div", {
              key: i,
              class: "yc-calendar-month-row"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(row, (col, i1) => {
                return openBlock(), createElementBlock("div", {
                  key: i1,
                  class: normalizeClass([
                    "yc-calendar-cell",
                    {
                      "yc-calendar-cell-today": isToday(col),
                      "yc-calendar-cell-selected": isSelected(col),
                      "yc-calendar-cell-in-view": col.isCurrentMonth
                    }
                  ]),
                  onClick: ($event) => _ctx.$emit("cell-click", col)
                }, [
                  renderSlot(_ctx.$slots, "default", {
                    year: col.year,
                    month: col.month,
                    day: col.day
                  }, () => [
                    createBaseVNode("div", _hoisted_47, [
                      createBaseVNode("div", _hoisted_54, [
                        createBaseVNode("div", _hoisted_62, toDisplayString(col.day), 1)
                      ])
                    ])
                  ], true)
                ], 10, _hoisted_314);
              }), 128))
            ]);
          }), 128))
        ])
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Calendar/CalendarMonth.vue.js
var MonthCalendar = _export_sfc(_sfc_main67, [["__scopeId", "data-v-1a9cbaaa"]]);

// node_modules/yc-design-vue/es/Calendar/CalendarYear.vue2.js
var _hoisted_133 = { class: "yc-calendar-year" };
var _hoisted_223 = { class: "yc-calendar-year-cell-title" };
var _sfc_main68 = defineComponent({
  __name: "CalendarYear",
  props: {
    computedValue: {},
    recordDate: {}
  },
  emits: ["cell-click"],
  setup(__props) {
    const props = __props;
    const { computedValue, recordDate } = toRefs(props);
    const calendar = ref([]);
    const monthList = [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ];
    watch(
      () => recordDate.value.year,
      () => {
        const { year } = recordDate.value;
        calendar.value = [];
        const row = [];
        for (let i = 1; i <= 12; i++) {
          row.push(generateMonthCalendar(year, i));
          if (row.length == 4) {
            calendar.value.push([...row]);
            row.splice(0);
          }
        }
      },
      {
        immediate: true
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_133, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(calendar.value, (row, i) => {
          return openBlock(), createElementBlock("div", {
            key: i,
            class: "yc-calendar-year-row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(row, (col, i1) => {
              return openBlock(), createElementBlock("div", {
                key: i1,
                class: "yc-calendar-year-cell"
              }, [
                createBaseVNode("div", _hoisted_223, toDisplayString(monthList[i * 4 + i1]), 1),
                createVNode(MonthCalendar, {
                  "computed-value": unref(computedValue),
                  calendar: col,
                  "record-date": unref(recordDate),
                  small: "",
                  class: "yc-calendar-year-cell-body",
                  onCellClick: _cache[0] || (_cache[0] = (v) => _ctx.$emit("cell-click", v))
                }, createSlots({ _: 2 }, [
                  _ctx.$slots.default ? {
                    name: "default",
                    fn: withCtx(({ year, month, day }) => [
                      renderSlot(_ctx.$slots, "default", {
                        year,
                        month,
                        day
                      }, void 0, true)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["computed-value", "calendar", "record-date"])
              ]);
            }), 128))
          ]);
        }), 128))
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Calendar/CalendarYear.vue.js
var YearCalendar = _export_sfc(_sfc_main68, [["__scopeId", "data-v-345e269c"]]);

// node_modules/yc-design-vue/es/Calendar/Calendar.vue2.js
var _hoisted_134 = { class: "yc-calendar-header" };
var _hoisted_224 = { class: "yc-calendar-header-left" };
var _hoisted_315 = { class: "yc-calendar-header-value" };
var _hoisted_48 = { class: "yc-calendar-header-right" };
var _hoisted_55 = { class: "yc-calendar-body" };
var _sfc_main69 = defineComponent({
  ...{
    name: "Calendar"
  },
  __name: "Calendar",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: () => /* @__PURE__ */ new Date() },
    mode: { default: void 0 },
    defaultMode: { default: "month" },
    modes: { default: () => ["month", "year"] }
  },
  emits: ["update:modelValue", "update:mode", "change", "panel-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      modelValue,
      defaultValue,
      mode,
      defaultMode,
      modes: _modes
    } = toRefs(props);
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
        emits("change", val);
      }
    );
    const recordDate = ref({});
    watch(
      () => computedValue.value,
      (val) => {
        const date = val ? dayjs(val) : dayjs();
        recordDate.value = {
          year: date.year(),
          month: date.month() + 1,
          day: date.date()
        };
      },
      {
        immediate: true
      }
    );
    const computedMode = useControlValue(
      mode,
      defaultMode.value,
      (val) => {
        emits("update:mode", val);
        emits("panel-change", computedValue.value);
      }
    );
    const modes = computed(() => {
      const map = {
        month: "月",
        year: "年"
      };
      return _modes.value.map((item) => {
        return {
          label: map[item],
          value: item
        };
      });
    });
    const handleClick = (col) => {
      computedValue.value = new Date(col.fullDate);
    };
    const handleDateChange = (type) => {
      if (type == "today") {
        computedValue.value = /* @__PURE__ */ new Date();
        return;
      }
      const { year, month } = recordDate.value;
      if (type == "next") {
        const tempMonth = month + 1 > 12 ? 1 : month + 1;
        const tempYear = month + 1 > 12 || computedMode.value == "year" ? 1 : 0;
        recordDate.value.year = year + tempYear;
        if (computedMode.value == "year") return;
        recordDate.value.month = tempMonth;
      } else {
        const tempMonth = month - 1 < 1 ? 12 : month - 1;
        const tempYear = month - 1 < 1 || computedMode.value == "year" ? -1 : 0;
        recordDate.value.year = year + tempYear;
        if (computedMode.value == "year") return;
        recordDate.value.month = tempMonth;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["yc-calendar", `yc-calendar-mode-${unref(computedMode)}`])
      }, [
        createBaseVNode("div", _hoisted_134, [
          createBaseVNode("div", _hoisted_224, [
            createVNode(unref(IconButton), {
              class: "yc-calendar-header-icon",
              role: "button",
              tabindex: "0",
              size: 28,
              "hover-size": 28,
              onClick: _cache[0] || (_cache[0] = ($event) => handleDateChange("pre"))
            }, {
              default: withCtx(() => [
                createVNode(unref(_sfc_main57), { rotate: 180 })
              ]),
              _: 1
            }),
            createBaseVNode("div", _hoisted_315, [
              renderSlot(_ctx.$slots, "header", {
                year: recordDate.value.year,
                month: recordDate.value.month
              }, () => [
                createTextVNode(toDisplayString(recordDate.value.year) + " 年 " + toDisplayString(recordDate.value.month) + " 月 ", 1)
              ], true)
            ]),
            createVNode(unref(IconButton), {
              role: "button",
              tabindex: "0",
              class: "yc-calendar-header-icon",
              size: 28,
              "hover-size": 28,
              onClick: _cache[1] || (_cache[1] = ($event) => handleDateChange("next"))
            }, {
              default: withCtx(() => [
                createVNode(unref(_sfc_main57))
              ]),
              _: 1
            }),
            createVNode(unref(Button), {
              onClick: _cache[2] || (_cache[2] = ($event) => handleDateChange("today")),
              size: "small"
            }, {
              default: withCtx(() => _cache[4] || (_cache[4] = [
                createTextVNode(" 今天 ", -1)
              ])),
              _: 1,
              __: [4]
            })
          ]),
          createBaseVNode("div", _hoisted_48, [
            createVNode(unref(_sfc_main66), {
              modelValue: unref(computedMode),
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(computedMode) ? computedMode.value = $event : null),
              options: modes.value,
              type: "button",
              size: "small"
            }, null, 8, ["modelValue", "options"])
          ])
        ]),
        createBaseVNode("div", _hoisted_55, [
          unref(computedMode) == "month" ? (openBlock(), createBlock(MonthCalendar, {
            key: 0,
            "computed-value": unref(computedValue),
            recordDate: recordDate.value,
            onCellClick: handleClick
          }, createSlots({ _: 2 }, [
            _ctx.$slots.default ? {
              name: "default",
              fn: withCtx((scope) => [
                renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(scope)), void 0, true)
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["computed-value", "recordDate"])) : (openBlock(), createBlock(YearCalendar, {
            key: 1,
            "computed-value": unref(computedValue),
            "record-date": recordDate.value,
            onCellClick: handleClick
          }, createSlots({ _: 2 }, [
            _ctx.$slots.default ? {
              name: "default",
              fn: withCtx((scope) => [
                renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(scope)), void 0, true)
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["computed-value", "record-date"]))
        ])
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Calendar/Calendar.vue.js
var _Calendar = _export_sfc(_sfc_main69, [["__scopeId", "data-v-cea874f1"]]);

// node_modules/yc-design-vue/es/Calendar/index.js
var Calendar = Object.assign(_Calendar, {
  install: (app) => {
    app.component("Yc" + _Calendar.name, _Calendar);
  }
});

// node_modules/yc-design-vue/es/Carousel/CarouselItem.vue2.js
var _sfc_main70 = defineComponent({
  ...{
    name: "CarouselItem"
  },
  __name: "CarouselItem",
  setup(__props) {
    const {
      moveType,
      preIndex,
      computedCurrent,
      direction,
      moveSpeed,
      animationName,
      transitionTimingFunction,
      getValidIndex
    } = useContext11().inject();
    const attrs = useAttrs();
    const index2 = computed(() => attrs.index);
    const slideClass = computed(() => {
      if (animationName.value != "slide" || computedCurrent.value == preIndex.value || preIndex.value != index2.value && computedCurrent.value != index2.value) {
        return;
      }
      const slideDirection = direction.value == "horizontal" ? "-x" : "-y";
      const slideType = preIndex.value == index2.value ? "-out" : "-in";
      const siideMoveType = moveType.value == "positive" ? "" : "-reverse";
      return `yc-carousel-slide${slideDirection}${slideType}${siideMoveType}`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-carousel-item",
          slideClass.value,
          {
            "yc-carousel-item-current": index2.value == unref(getValidIndex)(unref(computedCurrent)),
            "yc-carousel-item-prev": index2.value == unref(getValidIndex)(unref(computedCurrent) - 1),
            "yc-carousel-item-next": index2.value == unref(getValidIndex)(unref(computedCurrent) + 1)
          }
        ]),
        style: normalizeStyle({
          transitionTimingFunction: unref(transitionTimingFunction),
          animationTimingFunction: unref(transitionTimingFunction),
          transitionDuration: unref(moveSpeed) + "ms",
          animationDuration: unref(moveSpeed) + "ms"
        })
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 6);
    };
  }
});

// node_modules/yc-design-vue/es/Carousel/CarouselItem.vue.js
var CarouselItem = _export_sfc(_sfc_main70, [["__scopeId", "data-v-ff083354"]]);

// node_modules/yc-design-vue/es/Carousel/hooks/useContext.js
var CAROUSEL_CONTEXT_KEY = "carousel-context";
var useContext11 = () => {
  const provide$1 = (props, emits) => {
    const {
      current,
      defaultCurrent,
      transitionTimingFunction,
      animationName,
      moveSpeed,
      direction,
      showArrow,
      arrowClass,
      autoPlay
    } = toRefs(props);
    const slots = useSlots();
    const carouselItems = computed(() => {
      var _a;
      return findComponentsFromVnodes(
        ((_a = slots.default) == null ? void 0 : _a.call(slots)) || [],
        CarouselItem.name
      );
    });
    const length = computed(() => {
      return carouselItems.value.length;
    });
    const computedCurrent = useControlValue(
      current,
      defaultCurrent.value,
      (val) => {
        emits("update:current", val);
      }
    );
    const moveType = ref("positive");
    const preIndex = ref(computedCurrent.value);
    let timer = null;
    const getValidIndex = (val) => {
      if (val < 0) {
        return length.value - 1;
      }
      return val > length.value ? val % length.value : val;
    };
    const slideTo = async (targetIndex) => {
      if (timer || targetIndex == computedCurrent.value) {
        return;
      }
      moveType.value = targetIndex > computedCurrent.value ? "positive" : "negative";
      preIndex.value = computedCurrent.value;
      computedCurrent.value = getValidIndex(targetIndex);
      emits("change", computedCurrent.value, preIndex.value, true);
      await sleep(moveSpeed.value);
      timer = null;
    };
    provide(CAROUSEL_CONTEXT_KEY, {
      length,
      computedCurrent,
      transitionTimingFunction,
      animationName,
      moveSpeed,
      direction,
      showArrow,
      arrowClass,
      moveType,
      preIndex,
      getValidIndex
    });
    return {
      carouselItems,
      computedCurrent,
      length,
      autoPlay,
      slideTo
    };
  };
  const inject$1 = () => {
    return inject(CAROUSEL_CONTEXT_KEY, {
      length: ref(0),
      computedCurrent: ref(1),
      transitionTimingFunction: ref("cubic-bezier(0.34, 0.69, 0.1, 1)"),
      animationName: ref("slide"),
      moveSpeed: ref(500),
      direction: ref("horizontal"),
      showArrow: ref("always"),
      arrowClass: ref(""),
      preIndex: ref(0),
      moveType: ref("positive"),
      getValidIndex: () => 0
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Carousel/CarouselArrow.vue2.js
var _sfc_main71 = defineComponent({
  __name: "CarouselArrow",
  props: {
    type: {}
  },
  emits: ["change"],
  setup(__props) {
    const props = __props;
    const { type } = toRefs(props);
    const { showArrow, direction, arrowClass, computedCurrent } = useContext11().inject();
    const rotate = computed(() => {
      if (type.value == "next") {
        return direction.value == "horizontal" ? 0 : 90;
      } else {
        return direction.value == "horizontal" ? 180 : -90;
      }
    });
    const positionClass = computed(() => {
      if (type.value == "next") {
        return direction.value == "horizontal" ? "yc-carousel-arrow-right" : "yc-carousel-arrow-bottom";
      } else {
        return direction.value == "horizontal" ? "yc-carousel-arrow-left" : "yc-carousel-arrow-top";
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-carousel-arrow",
          positionClass.value,
          unref(arrowClass),
          {
            "yc-carousel-arrow-show-hover": unref(showArrow) == "hover"
          }
        ]),
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit(
          "change",
          unref(type) == "next" ? unref(computedCurrent) + 1 : unref(computedCurrent) - 1
        ))
      }, [
        createVNode(unref(_sfc_main57), { rotate: rotate.value }, null, 8, ["rotate"])
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Carousel/CarouselArrow.vue.js
var CarouselArrow = _export_sfc(_sfc_main71, [["__scopeId", "data-v-d5943292"]]);

// node_modules/yc-design-vue/es/Carousel/CarouselIndicator.vue2.js
var _hoisted_135 = ["onMouseenter", "onClick"];
var _sfc_main72 = defineComponent({
  __name: "CarouselIndicator",
  props: {
    trigger: {},
    indicatorType: {},
    indicatorPosition: {},
    indicatorClass: {}
  },
  emits: ["change"],
  setup(__props) {
    const { length, computedCurrent } = useContext11().inject();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-carousel-indicator",
          `yc-carousel-indicator-shape-${_ctx.indicatorType}`,
          `yc-carousel-indicator-position-${_ctx.indicatorPosition}`,
          _ctx.indicatorClass
        ])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(length), (i) => {
          return openBlock(), createElementBlock("div", {
            key: i,
            class: normalizeClass([
              "yc-carousel-indicator-item",
              {
                "yc-carousel-indicator-item-active": unref(computedCurrent) == i
              }
            ]),
            onMouseenter: ($event) => _ctx.trigger == "hover" && unref(computedCurrent) != i && _ctx.$emit("change", i),
            onClick: ($event) => _ctx.trigger == "click" && unref(computedCurrent) != i && _ctx.$emit("change", i)
          }, null, 42, _hoisted_135);
        }), 128)),
        _ctx.indicatorType == "slider" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "yc-carousel-indicator-item-slider",
          style: normalizeStyle({
            width: ["top", "bottom", "outer"].includes(_ctx.indicatorPosition) ? unref(valueToPx)(48 / unref(length)) : "",
            height: ["left", "right"].includes(_ctx.indicatorPosition) ? unref(valueToPx)(48 / unref(length)) : "",
            transform: ["top", "bottom", "outer"].includes(_ctx.indicatorPosition) ? `translateX(calc(${unref(valueToPx)(48 / unref(length) * unref(computedCurrent))} - 100%))` : `translateY(calc(${unref(valueToPx)(48 / unref(length) * unref(computedCurrent))} - 100%))`
          })
        }, null, 4)) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Carousel/CarouselIndicator.vue.js
var CarouselIndicator = _export_sfc(_sfc_main72, [["__scopeId", "data-v-da680813"]]);

// node_modules/yc-design-vue/es/Carousel/Carousel.vue2.js
var _hoisted_136 = {
  key: 0,
  class: "yc-carousel-indicator-wrapper"
};
var _hoisted_225 = {
  key: 1,
  class: "yc-carousel-arrow-wrapper"
};
var _sfc_main73 = defineComponent({
  ...{
    name: "Carousel"
  },
  __name: "Carousel",
  props: {
    current: { default: void 0 },
    defaultCurrent: { default: 1 },
    autoPlay: { type: [Boolean, Object], default: false },
    moveSpeed: { default: 500 },
    animationName: { default: "slide" },
    trigger: { default: "click" },
    direction: { default: "horizontal" },
    showArrow: { default: "always" },
    arrowClass: { default: "" },
    indicatorType: { default: "dot" },
    indicatorPosition: { default: "bottom" },
    indicatorClass: { default: "" },
    transitionTimingFunction: { default: "cubic-bezier(0.34, 0.69, 0.1, 1)" }
  },
  emits: ["update:current", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { slideTo, computedCurrent, autoPlay, carouselItems } = useContext11().provide(props, emits);
    let autoPlayTimer = null;
    const setAutoPlay = () => {
      var _a;
      if (!autoPlay.value) return;
      autoPlayTimer = setInterval(
        () => {
          slideTo(computedCurrent.value + 1);
        },
        ((_a = autoPlay.value) == null ? void 0 : _a.interval) ?? 3e3
      );
    };
    const stopAutoPlay = () => {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    };
    const handleChange = async (index2) => {
      stopAutoPlay();
      await slideTo(index2);
      setAutoPlay();
    };
    watch(
      () => autoPlay.value,
      () => {
        if (!autoPlay.value) {
          return stopAutoPlay();
        }
        setAutoPlay();
      },
      {
        immediate: true
      }
    );
    onBeforeUnmount(() => {
      stopAutoPlay();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-carousel",
          `yc-carousel-animation-${_ctx.animationName}`,
          {
            "yc-carousel-indicator-outer": _ctx.indicatorPosition == "outer"
          }
        ])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["yc-carousel-slide", `yc-carousel-direction-${_ctx.direction}`]),
          onMouseenter: _cache[0] || (_cache[0] = ($event) => {
            var _a;
            return unref(isObject2)(unref(autoPlay)) && ((_a = unref(autoPlay)) == null ? void 0 : _a.hoverToPause) && stopAutoPlay();
          }),
          onMouseleave: _cache[1] || (_cache[1] = ($event) => {
            var _a;
            return unref(isObject2)(unref(autoPlay)) && ((_a = unref(autoPlay)) == null ? void 0 : _a.hoverToPause) && setAutoPlay();
          })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(carouselItems), (node, i) => {
            return openBlock(), createBlock(resolveDynamicComponent(node), {
              index: i + 1
            }, null, 8, ["index"]);
          }), 256))
        ], 34),
        _ctx.indicatorType != "never" ? (openBlock(), createElementBlock("div", _hoisted_136, [
          createVNode(CarouselIndicator, {
            "indicator-class": _ctx.indicatorClass,
            trigger: _ctx.trigger,
            "indicator-position": _ctx.indicatorPosition,
            "indicator-type": _ctx.indicatorType,
            onChange: handleChange
          }, null, 8, ["indicator-class", "trigger", "indicator-position", "indicator-type"])
        ])) : createCommentVNode("", true),
        _ctx.showArrow != "never" ? (openBlock(), createElementBlock("div", _hoisted_225, [
          createVNode(CarouselArrow, {
            type: "pre",
            onChange: handleChange
          }),
          createVNode(CarouselArrow, {
            type: "next",
            onChange: handleChange
          })
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Carousel/Carousel.vue.js
var _Carousel = _export_sfc(_sfc_main73, [["__scopeId", "data-v-f976facc"]]);

// node_modules/yc-design-vue/es/Carousel/index.js
var Carousel = Object.assign(_Carousel, {
  item: CarouselItem,
  install: (app) => {
    app.component("Yc" + _Carousel.name, _Carousel);
    app.component("Yc" + CarouselItem.name, CarouselItem);
  }
});

// node_modules/yc-design-vue/es/Collapse/hooks/useContext.js
var COLLAPSE_CONTEXT_KEY = "collapse-context";
var useContext12 = () => {
  const provide$1 = (props, emits) => {
    const {
      activeKey,
      defaultActiveKey,
      accordion,
      expandIconPosition,
      showExpandIcon,
      destroyOnHide
    } = toRefs(props);
    const slots = useSlots();
    const computedActiveKey = useControlValue(
      activeKey,
      defaultActiveKey.value,
      (val) => {
        emits("update:activekey", val);
        emits("change", val);
      }
    );
    provide(COLLAPSE_CONTEXT_KEY, {
      computedActiveKey,
      accordion,
      expandIconPosition,
      showExpandIcon,
      destroyOnHide,
      slots
    });
  };
  const inject$1 = (props) => {
    const { showExpandIcon, destroyOnHide } = toRefs(
      props
    );
    const injection = inject(COLLAPSE_CONTEXT_KEY, {
      computedActiveKey: ref([]),
      accordion: ref(false),
      expandIconPosition: ref("left"),
      showExpandIcon: ref(true),
      destroyOnHide: ref(false),
      slots: {}
    });
    const { showExpandIcon: _showExpandIcon, destroyOnHide: _destroyOnHide } = injection;
    return {
      ...injection,
      showExpandIcon: computed(() => {
        return showExpandIcon.value ?? _showExpandIcon.value;
      }),
      destroyOnHide: computed(() => {
        return destroyOnHide.value ?? _destroyOnHide.value;
      })
    };
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Collapse/Collapse.vue2.js
var _sfc_main74 = defineComponent({
  ...{
    name: "Collapse"
  },
  __name: "Collapse",
  props: {
    activeKey: { default: void 0 },
    defaultActiveKey: { default: () => [] },
    accordion: { type: Boolean, default: false },
    showExpandIcon: { type: Boolean, default: true },
    expandIconPosition: { default: "left" },
    bordered: { type: Boolean, default: true },
    destroyOnHide: { type: Boolean, default: false }
  },
  emits: ["update:activekey", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    useContext12().provide(props, emits);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-collapse",
          {
            "yc-collapse-bordered": _ctx.bordered
          }
        ])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Collapse/Collapse.vue.js
var _Collapse = _export_sfc(_sfc_main74, [["__scopeId", "data-v-56bab824"]]);

// node_modules/yc-design-vue/es/_shared/icons/IconRight.vue.js
var _sfc_main75 = defineComponent({
  __name: "IconRight",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", {
            d: "M34.829 23.063c.6.48.6 1.394 0 1.874L17.949 38.44c-.785.629-1.949.07-1.949-.937V10.497c0-1.007 1.164-1.566 1.95-.937l16.879 13.503Z",
            fill: "currentColor",
            stroke: "none"
          }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/components/ExpandTransition.vue3.js
var _sfc_main76 = defineComponent({
  __name: "ExpandTransition",
  setup(__props) {
    const transitions = {
      onBeforeEnter(el) {
        el.style.maxHeight = "0";
        el.style.opacity = "0";
      },
      onEnter(el) {
        el.style.maxHeight = valueToPx(el.scrollHeight);
        el.style.opacity = "1";
      },
      onAfterEnter(el) {
        el.style.maxHeight = "";
        el.style.opacity = "";
      },
      // 收起的时候卡顿
      onBeforeLeave(el) {
        el.style.maxHeight = valueToPx(el.scrollHeight);
        el.style.opacity = "1";
      },
      onLeave(el) {
        el.style.maxHeight = "0";
        el.style.opacity = "0";
      },
      onAfterLeave(el) {
        el.style.maxHeight = "";
        el.style.opacity = "";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, mergeProps({ name: "expand" }, transitions), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/components/ExpandTransition.vue2.js
var ExpandTransition = _export_sfc(_sfc_main76, [["__scopeId", "data-v-6e588238"]]);

// node_modules/yc-design-vue/es/Collapse/CollapseItem.vue2.js
var _hoisted_137 = { class: "yc-collapse-item-header-title text-ellipsis" };
var _hoisted_226 = {
  key: 1,
  class: "yc-collapse-item-header-extra"
};
var _hoisted_316 = {
  key: 0,
  role: "region",
  class: "yc-collapse-item-content"
};
var _hoisted_49 = { class: "yc-collapse-item-content-box" };
var _sfc_main77 = defineComponent({
  ...{
    name: "CollapseItem"
  },
  __name: "CollapseItem",
  props: {
    path: { default: "" },
    header: { default: "" },
    disabled: { type: Boolean, default: false },
    showExpandIcon: { type: Boolean, default: void 0 },
    destroyOnHide: { type: Boolean, default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { path, disabled } = toRefs(props);
    const {
      slots,
      computedActiveKey,
      accordion,
      expandIconPosition,
      showExpandIcon,
      destroyOnHide
    } = useContext12().inject(props);
    const handleClick = () => {
      if (disabled.value) return;
      if (computedActiveKey.value.includes(path.value)) {
        computedActiveKey.value = computedActiveKey.value.filter(
          (item) => item != path.value
        );
      } else {
        if (accordion.value) {
          computedActiveKey.value = [path.value];
        } else {
          computedActiveKey.value.push(path.value);
        }
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-collapse-item",
          `yc-collapse-item-expand-icon-${unref(expandIconPosition)}`,
          {
            "yc-collapse-item-disabled": unref(disabled)
          }
        ])
      }, [
        createBaseVNode("div", {
          role: "button",
          class: "yc-collapse-item-header",
          onClick: handleClick
        }, [
          unref(showExpandIcon) ? (openBlock(), createBlock(unref(IconButton), {
            key: 0,
            class: "yc-collapse-item-header-icon"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "expand-icon", {
                active: unref(computedActiveKey).includes(unref(path)),
                disabled: unref(disabled),
                position: unref(expandIconPosition)
              }, () => [
                unref(slots)["expand-icon"] ? (openBlock(), createBlock(resolveDynamicComponent(
                  () => {
                    var _a, _b;
                    return (_b = (_a = unref(slots))["expand-icon"]) == null ? void 0 : _b.call(_a, {
                      active: unref(computedActiveKey).includes(unref(path)),
                      disabled: unref(disabled),
                      position: unref(expandIconPosition)
                    });
                  }
                ), { key: 0 })) : (openBlock(), createBlock(unref(_sfc_main75), {
                  key: 1,
                  color: "rgb(107, 119, 133)",
                  rotate: unref(computedActiveKey).includes(unref(path)) ? 90 : unref(expandIconPosition) == "left" ? 0 : 180
                }, null, 8, ["rotate"]))
              ], true)
            ]),
            _: 3
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_137, [
            renderSlot(_ctx.$slots, "header", {}, () => [
              createTextVNode(toDisplayString(_ctx.header), 1)
            ], true)
          ]),
          _ctx.$slots.extra ? (openBlock(), createElementBlock("div", _hoisted_226, [
            renderSlot(_ctx.$slots, "extra", {}, void 0, true)
          ])) : createCommentVNode("", true)
        ]),
        createVNode(unref(ExpandTransition), null, {
          default: withCtx(() => [
            !unref(destroyOnHide) || unref(computedActiveKey).includes(unref(path)) ? withDirectives((openBlock(), createElementBlock("div", _hoisted_316, [
              createBaseVNode("div", _hoisted_49, [
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ])
            ], 512)), [
              [vShow, unref(computedActiveKey).includes(unref(path))]
            ]) : createCommentVNode("", true)
          ]),
          _: 3
        })
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Collapse/CollapseItem.vue.js
var CollapseItem = _export_sfc(_sfc_main77, [["__scopeId", "data-v-456d3caf"]]);

// node_modules/yc-design-vue/es/Collapse/index.js
var Collapse = Object.assign(_Collapse, {
  item: CollapseItem,
  install: (app) => {
    app.component("Yc" + _Collapse.name, _Collapse);
    app.component("Yc" + CollapseItem.name, CollapseItem);
  }
});

// node_modules/yc-design-vue/es/_shared/utils/color.js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var GradientColorCalculator = class {
  constructor() {
    __publicField(this, "colorStops");
    this.colorStops = [
      { pos: 0, color: "#f00" },
      { pos: 0.17, color: "#ff0" },
      { pos: 0.33, color: "#0f0" },
      { pos: 0.5, color: "#0ff" },
      { pos: 0.67, color: "#00f" },
      { pos: 0.83, color: "#f0f" },
      { pos: 1, color: "#f00" }
    ];
  }
  // 根据颜色反向计算近似位置
  getPositionForColor(color, totalWidth) {
    const targetColor = tinycolor(color);
    let minDistance = Infinity;
    let bestPosition = 0;
    const samplePoints = 100;
    for (let i = 0; i <= samplePoints; i++) {
      const position = i / samplePoints;
      const sampleColor = tinycolor(
        this.getColorAtPosition(position * totalWidth, totalWidth)
      );
      const distance = this.calculateColorDistance(targetColor, sampleColor);
      if (distance < minDistance) {
        minDistance = distance;
        bestPosition = position;
      }
    }
    return bestPosition * totalWidth;
  }
  // 计算两个颜色之间的距离（简化版）
  calculateColorDistance(color1, color2) {
    const rgb1 = color1.toRgb();
    const rgb2 = color2.toRgb();
    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2)
    );
  }
  // 更精确的颜色搜索算法（二分查找优化）
  getPrecisePositionForColor(color, totalWidth, precision = 1e-3) {
    const targetColor = tinycolor(color);
    let left = 0;
    let right = 1;
    let bestPosition = 0.5;
    let minDistance = Infinity;
    while (right - left > precision) {
      const mid1 = left + (right - left) / 3;
      const mid2 = right - (right - left) / 3;
      const color1 = tinycolor(
        this.getColorAtPosition(mid1 * totalWidth, totalWidth)
      );
      const color2 = tinycolor(
        this.getColorAtPosition(mid2 * totalWidth, totalWidth)
      );
      const distance1 = this.calculateColorDistance(targetColor, color1);
      const distance2 = this.calculateColorDistance(targetColor, color2);
      if (distance1 < distance2) {
        right = mid2;
        if (distance1 < minDistance) {
          minDistance = distance1;
          bestPosition = mid1;
        }
      } else {
        left = mid1;
        if (distance2 < minDistance) {
          minDistance = distance2;
          bestPosition = mid2;
        }
      }
    }
    return bestPosition * totalWidth;
  }
  // 根据位置获取渐变颜色
  getColorAtPosition(offsetX, totalWidth) {
    const position = this.clamp(offsetX / totalWidth, 0, 1);
    const { startStop, endStop } = this.findStops(position);
    const range = endStop.pos - startStop.pos;
    const ratio = range > 0 ? (position - startStop.pos) / range : 0;
    const startColor = tinycolor(startStop.color);
    const endColor = tinycolor(endStop.color);
    return tinycolor.mix(startColor, endColor, ratio * 100).toHexString();
  }
  // 查找包含指定位置的颜色停止点
  findStops(position) {
    for (let i = 0; i < this.colorStops.length - 1; i++) {
      if (position >= this.colorStops[i].pos && position <= this.colorStops[i + 1].pos) {
        return {
          startStop: this.colorStops[i],
          endStop: this.colorStops[i + 1]
        };
      }
    }
    return {
      startStop: this.colorStops[0],
      endStop: this.colorStops[this.colorStops.length - 1]
    };
  }
  // 限制数值在最小最大值之间
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  // 更新渐变颜色停止点
  updateColorStops(stops) {
    if (stops.length < 2) {
      throw new Error("至少需要两个颜色停止点");
    }
    if (stops[0].pos !== 0 || stops[stops.length - 1].pos !== 1) {
      throw new Error("第一个停止点位置必须为0，最后一个必须为1");
    }
    this.colorStops = stops.sort((a, b) => a.pos - b.pos);
  }
};
var parseColor = (color) => {
  return tinycolor(color);
};

// node_modules/yc-design-vue/es/ColorPicker/hooks/useContext.js
var COLOR_PICKER_CONTEXT_KEY = "color-picker-context";
var useContext13 = () => {
  const provide$1 = (props, emits) => {
    const {
      modelValue,
      defaultValue,
      format,
      disabled,
      disabledAlpha,
      showHistory,
      showPreset,
      historyColors,
      presetColors,
      hideTrigger
    } = toRefs(props);
    const { size } = getGlobalConfig(props);
    const alpha = ref(100);
    const computedColor = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
        emits("change", val);
      },
      (val) => {
        const color = parseColor(val);
        const a = color.getAlpha();
        if (a != alpha.value) {
          alpha.value = a * 100;
        }
        if (format.value == "hex") {
          return a == 1 ? color.toHexString() : color.toHex8String();
        } else {
          return color.toRgbString();
        }
      }
    );
    const baseColor = ref(computedColor.value);
    const popupVisible = ref(false);
    provide(COLOR_PICKER_CONTEXT_KEY, {
      emits,
      popupVisible,
      computedColor,
      baseColor,
      alpha,
      format,
      disabled,
      disabledAlpha,
      showHistory,
      showPreset,
      hideTrigger,
      presetColors,
      historyColors
    });
    return {
      popupVisible,
      size,
      computedColor
    };
  };
  const inject$1 = () => {
    return inject(COLOR_PICKER_CONTEXT_KEY, {
      emits: () => {
      },
      popupVisible: ref(false),
      computedColor: ref(""),
      baseColor: ref(""),
      alpha: ref(100),
      format: ref("hex"),
      disabled: ref(false),
      disabledAlpha: ref(false),
      showHistory: ref(false),
      showPreset: ref(false),
      hideTrigger: ref(false),
      presetColors: ref([]),
      historyColors: ref([])
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/ColorPicker/ColorPalette.vue2.js
var _sfc_main78 = defineComponent({
  __name: "ColorPalette",
  props: {
    color: {},
    baseColor: {},
    popupVisible: { type: Boolean },
    disabled: { type: Boolean },
    hideTrigger: { type: Boolean }
  },
  emits: ["update:color", "update:baseColor"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { popupVisible, baseColor, disabled, hideTrigger } = toRefs(props);
    const btnRef = ref();
    const paletteRef = ref();
    const { width, height, top, left } = useElementBounding(paletteRef, {
      updateTiming: "next-frame"
    });
    const hsv = computed(() => {
      return parseColor(baseColor.value).toHsv();
    });
    const { x, y } = useDraggable(btnRef, {
      disabled,
      onMove() {
        setColor();
      }
    });
    const handleClick = (e) => {
      if (disabled.value) return;
      x.value = e.pageX;
      y.value = e.pageY;
      setColor();
    };
    const setColor = () => {
      x.value = (x.value - left.value) / width.value;
      x.value = x.value < 0 ? 0 : x.value;
      x.value = x.value > 1 ? 1 : x.value;
      y.value = (y.value - top.value) / height.value;
      y.value = y.value < 0 ? 0 : y.value;
      y.value = y.value > 1 ? 1 : y.value;
      const color = parseColor({
        ...hsv.value,
        s: x.value,
        v: 1 - y.value
      }).toHexString();
      emits("update:color", color);
    };
    watch(
      () => popupVisible.value,
      async (val) => {
        if (val || hideTrigger.value) {
          await sleep(0);
          x.value = hsv.value.s;
          y.value = 1 - hsv.value.v;
        }
      },
      {
        immediate: true
      }
    );
    __expose({
      setPosition(color) {
        const { s, v } = parseColor(color).toHsv();
        x.value = s;
        y.value = 1 - v;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "yc-color-picker-palette",
        style: normalizeStyle({
          backgroundColor: unref(baseColor)
        }),
        ref_key: "paletteRef",
        ref: paletteRef,
        onClick: handleClick
      }, [
        createBaseVNode("div", {
          class: "yc-color-picker-handler",
          style: normalizeStyle({
            transform: `translate(calc(${unref(valueToPx)(unref(x) * unref(width))} - 50%),calc(${unref(valueToPx)(unref(y) * unref(height))} - 50%))`
          }),
          ref_key: "btnRef",
          ref: btnRef
        }, null, 4)
      ], 4);
    };
  }
});

// node_modules/yc-design-vue/es/ColorPicker/ColorPalette.vue.js
var ColorPalette = _export_sfc(_sfc_main78, [["__scopeId", "data-v-60bb1666"]]);

// node_modules/yc-design-vue/es/_shared/icons/IconMinus.vue2.js
var _sfc_main79 = defineComponent({
  __name: "IconMinus",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M5 24h38" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconPlus.vue.js
var _sfc_main80 = defineComponent({
  __name: "IconPlus",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M5 24h38M24 5v38" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/InputNumber/InputOperaBtn.vue2.js
var _sfc_main81 = defineComponent({
  __name: "InputOperaBtn",
  props: {
    mode: {},
    type: {},
    disabled: { type: Boolean },
    computedValue: {},
    min: {},
    max: {},
    size: {}
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const { disabled: _disabled, computedValue, min, max, type } = toRefs(props);
    const disabled = computed(() => {
      if (_disabled.value) return _disabled.value;
      return type.value == "minus" ? +computedValue.value <= min.value : +computedValue.value >= max.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Button), {
        size: _ctx.size,
        disabled: disabled.value,
        class: normalizeClass([
          {
            "yc-input-number-plus-embed": _ctx.mode == "embed"
          }
        ]),
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", unref(type)))
      }, {
        icon: withCtx(() => [
          renderSlot(_ctx.$slots, "icon", {}, () => [
            _ctx.mode == "embed" ? (openBlock(), createBlock(unref(_sfc_main17), {
              key: 0,
              rotate: unref(type) == "plus" ? 180 : 0
            }, null, 8, ["rotate"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              unref(type) == "minus" ? (openBlock(), createBlock(unref(_sfc_main79), { key: 0 })) : (openBlock(), createBlock(unref(_sfc_main80), { key: 1 }))
            ], 64))
          ], true)
        ]),
        _: 3
      }, 8, ["size", "disabled", "class"]);
    };
  }
});

// node_modules/yc-design-vue/es/InputNumber/InputOperaBtn.vue.js
var OperaBtn = _export_sfc(_sfc_main81, [["__scopeId", "data-v-07ea2c8a"]]);

// node_modules/yc-design-vue/es/InputNumber/InputNumber.vue2.js
var _hoisted_138 = { class: "yc-input-number-step" };
var _sfc_main82 = defineComponent({
  ...{
    name: "InputNumber"
  },
  __name: "InputNumber",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: "" },
    mode: { default: "embed" },
    precision: { default: 0 },
    step: { default: 1 },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    max: { default: Infinity },
    min: { default: -Infinity },
    placeholder: { default: "" },
    hideButton: { type: Boolean, default: false },
    size: { default: void 0 },
    allowClear: { type: Boolean, default: false },
    modelEvent: { default: "change" },
    formatter: {},
    parser: {},
    readonly: { type: Boolean, default: false },
    inputAttrs: { default: () => {
      return {};
    } }
  },
  emits: ["update:modelValue", "input", "change", "focus", "blur", "clear", "keydown", "pressEnter"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      modelValue,
      defaultValue,
      step,
      min,
      max,
      disabled,
      hideButton,
      mode,
      modelEvent,
      precision: _precision
    } = toRefs(props);
    const { formatter, parser } = props;
    const inputRef = ref();
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits(
          "update:modelValue",
          modelEvent.value == "change" ? val : handlePrecision(val, "number")
        );
      },
      (val) => {
        const value = isString(val) ? val : handlePrecision(val, "string");
        return formatter && isFunction(formatter) ? formatter(value) : value;
      }
    );
    const precision = computed(() => {
      var _a, _b;
      const stepPrecision = ((_b = (_a = String(step.value).match(/\.(\d+)/)) == null ? void 0 : _a[1]) == null ? void 0 : _b.length) ?? 0;
      return Math.max(...[stepPrecision, _precision.value]);
    });
    const parserValue = (v) => {
      return parser && isFunction(parser) ? parser(v) : v;
    };
    function handlePrecision(value, type) {
      const handleValue = isNumber(value) ? value : +value;
      const numberValue = precision.value ? handleValue.toFixed(precision.value) : handleValue.toFixed(0);
      return type == "number" ? +numberValue : numberValue;
    }
    const handleStep = (type) => {
      var _a;
      const handleValue = +parserValue(computedValue.value);
      let value = type == "minus" ? handleValue - step.value : handleValue + step.value;
      value = value < min.value ? min.value : value;
      value = value > max.value ? max.value : value;
      computedValue.value = handlePrecision(value, "number");
      (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const handleUpdateValue = (type, e) => {
      if (type == "blur") {
        emits("blur", e);
      } else {
        emits("pressEnter", e);
      }
      if (!computedValue.value) return;
      let value = +parserValue(computedValue.value);
      value = value < min.value ? min.value : value;
      value = value > max.value ? max.value : value;
      computedValue.value = handlePrecision(value, "number");
    };
    const handleInput = (v, e) => {
      var _a;
      if (!v) {
        computedValue.value = v;
        return;
      }
      const handleValue = parserValue(v);
      const isInValidNumber = !/^-?\d*\.?\d*$/.test(handleValue);
      const isInValidPoint = (((_a = handleValue.match(/\./g)) == null ? void 0 : _a.length) ?? 0) > 1;
      const isInValidNegative = handleValue.includes("-") && handleValue[0] != "-";
      if (isInValidNumber || isInValidPoint || isInValidNegative) {
        return;
      }
      computedValue.value = handleValue;
      emits("input", handleValue, e);
    };
    const handleClear = (ev) => {
      computedValue.value = "";
      emits("clear", ev);
    };
    __expose({
      focus() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      },
      blur() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Input), {
        "model-value": unref(computedValue),
        "allow-clear": _ctx.allowClear,
        disabled: unref(disabled),
        readonly: _ctx.readonly,
        error: _ctx.error,
        size: _ctx.size,
        placeholder: _ctx.placeholder,
        "input-attrs": _ctx.inputAttrs,
        class: "yc-input-number",
        ref_key: "inputRef",
        ref: inputRef,
        onInput: handleInput,
        onChange: _cache[0] || (_cache[0] = async (v, ev) => {
          await unref(sleep)(0);
          _ctx.$emit("change", +v, ev);
        }),
        onClear: handleClear,
        onFocus: _cache[1] || (_cache[1] = (ev) => _ctx.$emit("focus", ev)),
        onBlur: _cache[2] || (_cache[2] = (ev) => handleUpdateValue("blur", ev)),
        onKeydown: _cache[3] || (_cache[3] = (ev) => _ctx.$emit("keydown", ev)),
        onPressEnter: _cache[4] || (_cache[4] = (ev) => handleUpdateValue("pressEnter", ev))
      }, createSlots({ _: 2 }, [
        _ctx.$slots.prefix ? {
          name: "prefix",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots.suffix || !unref(hideButton) && unref(mode) == "embed" ? {
          name: "suffix",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "suffix", {}, () => [
              createBaseVNode("div", _hoisted_138, [
                createVNode(OperaBtn, {
                  type: "plus",
                  mode: unref(mode),
                  "computed-value": unref(computedValue),
                  disabled: unref(disabled),
                  min: unref(min),
                  max: unref(max),
                  size: _ctx.size,
                  onClick: handleStep
                }, createSlots({ _: 2 }, [
                  _ctx.$slots.minus ? {
                    name: "icon",
                    fn: withCtx(() => [
                      renderSlot(_ctx.$slots, "plus", {}, void 0, true)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["mode", "computed-value", "disabled", "min", "max", "size"]),
                createVNode(OperaBtn, {
                  type: "minus",
                  mode: unref(mode),
                  "computed-value": unref(computedValue),
                  disabled: unref(disabled),
                  min: unref(min),
                  max: unref(max),
                  size: _ctx.size,
                  onClick: handleStep
                }, createSlots({ _: 2 }, [
                  _ctx.$slots.plus ? {
                    name: "icon",
                    fn: withCtx(() => [
                      renderSlot(_ctx.$slots, "minus", {}, void 0, true)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["mode", "computed-value", "disabled", "min", "max", "size"])
              ])
            ], true)
          ]),
          key: "1"
        } : void 0,
        _ctx.$slots.prepend || !unref(hideButton) && unref(mode) == "button" ? {
          name: "prepend",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prepend", {}, () => [
              createVNode(OperaBtn, {
                type: "minus",
                mode: unref(mode),
                "computed-value": unref(computedValue),
                disabled: unref(disabled),
                min: unref(min),
                max: unref(max),
                size: _ctx.size,
                onClick: handleStep
              }, createSlots({ _: 2 }, [
                _ctx.$slots.minus ? {
                  name: "icon",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "minus", {}, void 0, true)
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["mode", "computed-value", "disabled", "min", "max", "size"])
            ], true)
          ]),
          key: "2"
        } : void 0,
        _ctx.$slots.append || !unref(hideButton) && unref(mode) == "button" ? {
          name: "append",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "append", {}, () => [
              createVNode(OperaBtn, {
                type: "plus",
                mode: unref(mode),
                "computed-value": unref(computedValue),
                disabled: unref(disabled),
                max: unref(max),
                min: unref(min),
                size: _ctx.size,
                onClick: handleStep
              }, createSlots({ _: 2 }, [
                _ctx.$slots.plus ? {
                  name: "icon",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "plus", {}, void 0, true)
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["mode", "computed-value", "disabled", "max", "min", "size"])
            ], true)
          ]),
          key: "3"
        } : void 0
      ]), 1032, ["model-value", "allow-clear", "disabled", "readonly", "error", "size", "placeholder", "input-attrs"]);
    };
  }
});

// node_modules/yc-design-vue/es/InputNumber/InputNumber.vue.js
var _InputNumber = _export_sfc(_sfc_main82, [["__scopeId", "data-v-e3993db7"]]);

// node_modules/yc-design-vue/es/InputNumber/index.js
var InputNumber = Object.assign(_InputNumber, {
  install: (app) => {
    app.component("Yc" + _InputNumber.name, _InputNumber);
  }
});

// node_modules/yc-design-vue/es/ColorPicker/ColorInput.vue2.js
var _hoisted_139 = { class: "yc-color-picker-input-wrapper" };
var _hoisted_227 = { class: "yc-color-picker-format" };
var _hoisted_317 = { class: "yc-color-picker-color" };
var _sfc_main83 = defineComponent({
  __name: "ColorInput",
  props: {
    color: {},
    baseColor: {},
    alpha: {},
    disabled: { type: Boolean },
    disabledAlpha: { type: Boolean }
  },
  emits: ["update:color", "update:baseColor", "update:alpha", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { color, alpha: _alpha } = toRefs(props);
    const format = ref("hex");
    const hex = ref("");
    const rgb = ref({});
    const alpha = ref(_alpha.value);
    const handleSet = (type) => {
      if (type == "hex") {
        const a = parseColor(color.value).getAlpha();
        const resultColor = parseColor(hex.value).setAlpha(a).toHex8();
        emits("update:color", resultColor);
        emits("update:baseColor", resultColor);
        emits("change", resultColor, "color");
      } else if (type == "rgb") {
        const { r, g, b } = rgb.value;
        const resultColor = `rgb(${r},${g},${b})`;
        emits("update:color", resultColor);
        emits("update:baseColor", resultColor);
        emits("change", resultColor, "color");
      } else {
        const a = +(alpha.value / 100).toFixed(2);
        const resultColor = parseColor(color.value).setAlpha(a).toRgbString();
        emits("update:color", resultColor);
        emits("update:alpha", alpha.value);
        emits("change", resultColor, "alpha");
      }
    };
    watch(
      () => color.value,
      () => {
        hex.value = parseColor(color.value).toHex();
        rgb.value = parseColor(color.value).toRgb();
      },
      {
        immediate: true
      }
    );
    watch(
      () => _alpha.value,
      () => {
        alpha.value = _alpha.value * 100;
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_139, [
        createBaseVNode("div", _hoisted_227, [
          createVNode(unref(Select), {
            modelValue: format.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => format.value = $event),
            options: unref(COLOR_PICKER_FORMAT_OPTIONS),
            "trigger-props": {
              contentClass: "yc-color-picker-format-popup-content"
            },
            size: "mini"
          }, null, 8, ["modelValue", "options"])
        ]),
        createBaseVNode("div", _hoisted_317, [
          format.value == "hex" ? (openBlock(), createBlock(unref(Input), {
            key: 0,
            modelValue: hex.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => hex.value = $event),
            "max-length": 6,
            disabled: _ctx.disabled,
            size: "mini",
            class: "hex-input",
            onBlur: _cache[2] || (_cache[2] = ($event) => handleSet("hex")),
            onPressEnter: _cache[3] || (_cache[3] = ($event) => handleSet("hex"))
          }, {
            prefix: withCtx(() => _cache[16] || (_cache[16] = [
              createTextVNode(" # ", -1)
            ])),
            _: 1
          }, 8, ["modelValue", "disabled"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createVNode(unref(InputNumber), {
              modelValue: rgb.value.r,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => rgb.value.r = $event),
              min: 0,
              max: 255,
              disabled: _ctx.disabled,
              size: "mini",
              class: "rgb-input",
              "hide-button": "",
              onBlur: _cache[5] || (_cache[5] = ($event) => handleSet("rgb")),
              onPressEnter: _cache[6] || (_cache[6] = ($event) => handleSet("rgb"))
            }, null, 8, ["modelValue", "disabled"]),
            createVNode(unref(InputNumber), {
              modelValue: rgb.value.g,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => rgb.value.g = $event),
              min: 0,
              max: 255,
              disabled: _ctx.disabled,
              size: "mini",
              class: "rgb-input",
              "hide-button": "",
              onBlur: _cache[8] || (_cache[8] = ($event) => handleSet("rgb")),
              onPressEnter: _cache[9] || (_cache[9] = ($event) => handleSet("rgb"))
            }, null, 8, ["modelValue", "disabled"]),
            createVNode(unref(InputNumber), {
              modelValue: rgb.value.b,
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => rgb.value.b = $event),
              min: 0,
              max: 255,
              disabled: _ctx.disabled,
              class: "rgb-input",
              size: "mini",
              "hide-button": "",
              onBlur: _cache[11] || (_cache[11] = ($event) => handleSet("rgb")),
              onPressEnter: _cache[12] || (_cache[12] = ($event) => handleSet("rgb"))
            }, null, 8, ["modelValue", "disabled"])
          ], 64)),
          !_ctx.disabledAlpha ? (openBlock(), createBlock(unref(InputNumber), {
            key: 2,
            modelValue: alpha.value,
            "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => alpha.value = $event),
            min: 0,
            max: 100,
            disabled: _ctx.disabled,
            size: "mini",
            "hide-button": "",
            class: "alpha-input",
            onBlur: _cache[14] || (_cache[14] = ($event) => handleSet("alpha")),
            onPressEnter: _cache[15] || (_cache[15] = ($event) => handleSet("alpha"))
          }, {
            suffix: withCtx(() => _cache[17] || (_cache[17] = [
              createTextVNode(" % ", -1)
            ])),
            _: 1
          }, 8, ["modelValue", "disabled"])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/ColorPicker/ColorInput.vue.js
var ColorInput = _export_sfc(_sfc_main83, [["__scopeId", "data-v-4a7de51a"]]);

// node_modules/yc-design-vue/es/ColorPicker/ColorList.vue2.js
var _hoisted_140 = { class: "yc-color-picker-colors-section" };
var _hoisted_228 = { class: "yc-color-picker-colors-text" };
var _hoisted_318 = {
  key: 0,
  class: "yc-color-picker-colors-empty"
};
var _hoisted_410 = { class: "yc-color-picker-colors-list" };
var _hoisted_56 = ["onClick"];
var _sfc_main84 = defineComponent({
  __name: "ColorList",
  props: {
    label: {},
    colors: {}
  },
  emits: ["colorClick"],
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_140, [
        createBaseVNode("div", _hoisted_228, toDisplayString(_ctx.label), 1),
        !_ctx.colors.length ? (openBlock(), createElementBlock("div", _hoisted_318, "暂无")) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_410, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.colors, (color, index2) => {
            return openBlock(), createElementBlock("div", {
              key: index2,
              class: "yc-color-picker-color-block",
              style: normalizeStyle({
                backgroundColor: color
              }),
              onClick: ($event) => _ctx.$emit("colorClick", color)
            }, [
              createBaseVNode("div", {
                class: "yc-color-picker-block",
                style: normalizeStyle({
                  backgroundColor: color
                })
              }, null, 4)
            ], 12, _hoisted_56);
          }), 128))
        ])
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/ColorPicker/ColorList.vue.js
var ColorList = _export_sfc(_sfc_main84, [["__scopeId", "data-v-cca9674b"]]);

// node_modules/yc-design-vue/es/ColorPicker/ColorControl.vue2.js
var _sfc_main85 = defineComponent({
  __name: "ColorControl",
  props: {
    color: {},
    baseColor: {},
    popupVisible: { type: Boolean },
    disabled: { type: Boolean },
    hideTrigger: { type: Boolean },
    mode: {}
  },
  emits: ["update:color", "update:alpha", "update:baseColor", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { color, mode, popupVisible, disabled, hideTrigger } = toRefs(props);
    const btnRef = ref();
    const barRef = ref();
    const range = ref({
      min: 0,
      max: 0
    });
    const calculator = new GradientColorCalculator();
    const { x } = useDraggable(btnRef, {
      disabled,
      onMove() {
        setColor();
      }
    });
    const setPosition = (color2) => {
      const { max, min } = range.value;
      if (mode.value == "alpha") {
        const alpha = parseColor(color2).getAlpha() * 100;
        x.value = min + alpha / 100 * (max - min);
        emits("update:alpha", alpha);
      } else {
        x.value = calculator.getPositionForColor(color2, max - min) + min;
      }
    };
    const setColor = () => {
      const { min, max } = range.value;
      x.value = x.value < min ? min : x.value;
      x.value = x.value > max ? max : x.value;
      let tempColor = "";
      if (mode.value == "alpha") {
        const a = +((x.value - min) / (max - min)).toFixed(2);
        tempColor = parseColor(color.value).setAlpha(a).toRgbString();
        emits("update:alpha", a);
      } else {
        tempColor = calculator.getColorAtPosition(x.value - min, max - min);
        emits("update:baseColor", tempColor);
        emits("change", tempColor);
      }
      emits("update:color", tempColor);
    };
    const handleClick = (e) => {
      if (disabled.value) return;
      x.value = e.pageX;
      setColor();
    };
    watch(
      () => popupVisible.value,
      async (val) => {
        if (val || hideTrigger.value) {
          await sleep(0);
          const { left, right } = barRef.value.getBoundingClientRect();
          range.value = {
            min: left,
            max: right
          };
          setPosition(color.value);
        }
      },
      {
        immediate: true
      }
    );
    __expose({
      setPosition
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "yc-color-picker-control-bar",
        style: normalizeStyle({
          background: unref(mode) == "alpha" ? `linear-gradient(to right, rgba(0, 0, 0, 0), ${_ctx.baseColor})` : ""
        }),
        ref_key: "barRef",
        ref: barRef,
        onClick: handleClick
      }, [
        createBaseVNode("div", {
          class: "yc-color-picker-control-bar-handler",
          style: normalizeStyle({
            color: unref(color),
            transform: `translate(calc(${unref(valueToPx)(unref(x) - range.value.min)} - 50%),-50%)`
          }),
          ref_key: "btnRef",
          ref: btnRef
        }, null, 4)
      ], 4);
    };
  }
});

// node_modules/yc-design-vue/es/ColorPicker/ColorControl.vue.js
var ColorControl = _export_sfc(_sfc_main85, [["__scopeId", "data-v-b854b98e"]]);

// node_modules/yc-design-vue/es/ColorPicker/ColorPanel.vue2.js
var _hoisted_141 = { class: "yc-color-picker-panel-control" };
var _hoisted_229 = { class: "yc-color-picker-control-wrapper" };
var _hoisted_319 = { class: "yc-color-picker-control-bar-bg" };
var _hoisted_411 = {
  key: 0,
  class: "yc-color-picker-panel-colors"
};
var _sfc_main86 = defineComponent({
  __name: "ColorPanel",
  setup(__props) {
    const {
      popupVisible,
      computedColor,
      baseColor,
      alpha,
      disabled,
      disabledAlpha,
      showHistory,
      showPreset,
      hideTrigger,
      presetColors,
      historyColors
    } = useContext13().inject();
    const colorBarRef = ref();
    const alphaBarRef = ref();
    const paletteRef = ref();
    const handleColorClick = (color) => {
      var _a, _b, _c;
      if (disabled.value) return;
      computedColor.value = color;
      baseColor.value = color;
      (_a = colorBarRef.value) == null ? void 0 : _a.setPosition(color);
      (_b = alphaBarRef.value) == null ? void 0 : _b.setPosition(color);
      (_c = paletteRef.value) == null ? void 0 : _c.setPosition(color);
    };
    const handleChange = (color, type) => {
      var _a, _b, _c;
      if (type == "alpha") {
        (_a = alphaBarRef.value) == null ? void 0 : _a.setPosition(color);
      } else {
        (_b = colorBarRef.value) == null ? void 0 : _b.setPosition(color);
        (_c = paletteRef.value) == null ? void 0 : _c.setPosition(color);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-color-picker-panel",
          {
            "yc-color-picker-panel-disabled": unref(disabled)
          }
        ])
      }, [
        createVNode(ColorPalette, {
          color: unref(computedColor),
          "onUpdate:color": _cache[0] || (_cache[0] = ($event) => isRef(computedColor) ? computedColor.value = $event : null),
          "base-color": unref(baseColor),
          "popup-visible": unref(popupVisible),
          "hide-trigger": unref(hideTrigger),
          disabled: unref(disabled),
          ref_key: "paletteRef",
          ref: paletteRef
        }, null, 8, ["color", "base-color", "popup-visible", "hide-trigger", "disabled"]),
        createBaseVNode("div", _hoisted_141, [
          createBaseVNode("div", _hoisted_229, [
            createBaseVNode("div", null, [
              createVNode(ColorControl, {
                mode: "color",
                color: unref(computedColor),
                "onUpdate:color": _cache[1] || (_cache[1] = ($event) => isRef(computedColor) ? computedColor.value = $event : null),
                "base-color": unref(baseColor),
                "onUpdate:baseColor": _cache[2] || (_cache[2] = ($event) => isRef(baseColor) ? baseColor.value = $event : null),
                "popup-visible": unref(popupVisible),
                disabled: unref(disabled),
                "hide-trigger": unref(hideTrigger),
                ref_key: "colorBarRef",
                ref: colorBarRef,
                onChange: _cache[3] || (_cache[3] = (v) => {
                  var _a;
                  return (_a = paletteRef.value) == null ? void 0 : _a.setPosition(v);
                })
              }, null, 8, ["color", "base-color", "popup-visible", "disabled", "hide-trigger"]),
              createBaseVNode("div", _hoisted_319, [
                createVNode(ColorControl, {
                  mode: "alpha",
                  color: unref(computedColor),
                  "onUpdate:color": _cache[4] || (_cache[4] = ($event) => isRef(computedColor) ? computedColor.value = $event : null),
                  alpha: unref(alpha),
                  "onUpdate:alpha": _cache[5] || (_cache[5] = ($event) => isRef(alpha) ? alpha.value = $event : null),
                  "base-color": unref(baseColor),
                  "popup-visible": unref(popupVisible),
                  disabled: unref(disabled),
                  "hide-trigger": unref(hideTrigger),
                  ref_key: "alphaBarRef",
                  ref: alphaBarRef
                }, null, 8, ["color", "alpha", "base-color", "popup-visible", "disabled", "hide-trigger"])
              ])
            ]),
            createBaseVNode("div", {
              class: "yc-color-picker-preview",
              style: normalizeStyle({
                backgroundColor: unref(computedColor)
              })
            }, null, 4)
          ]),
          createVNode(ColorInput, {
            color: unref(computedColor),
            "onUpdate:color": _cache[6] || (_cache[6] = ($event) => isRef(computedColor) ? computedColor.value = $event : null),
            "base-color": unref(baseColor),
            "onUpdate:baseColor": _cache[7] || (_cache[7] = ($event) => isRef(baseColor) ? baseColor.value = $event : null),
            alpha: unref(alpha),
            "onUpdate:alpha": _cache[8] || (_cache[8] = ($event) => isRef(alpha) ? alpha.value = $event : null),
            disabled: unref(disabled),
            "disabled-alpha": unref(disabledAlpha),
            onChange: handleChange
          }, null, 8, ["color", "base-color", "alpha", "disabled", "disabled-alpha"])
        ]),
        unref(showHistory) || unref(showPreset) ? (openBlock(), createElementBlock("div", _hoisted_411, [
          unref(showHistory) ? (openBlock(), createBlock(ColorList, {
            key: 0,
            label: "最近使用的颜色",
            colors: unref(historyColors),
            onColorClick: handleColorClick
          }, null, 8, ["colors"])) : createCommentVNode("", true),
          unref(showPreset) ? (openBlock(), createBlock(ColorList, {
            key: 1,
            label: "系统预设的颜色",
            colors: unref(presetColors),
            onColorClick: handleColorClick
          }, null, 8, ["colors"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/ColorPicker/ColorPanel.vue.js
var ColorPanel = _export_sfc(_sfc_main86, [["__scopeId", "data-v-0f0acfab"]]);

// node_modules/yc-design-vue/es/ColorPicker/ColorPicker.vue2.js
var _hoisted_142 = {
  key: 0,
  class: "yc-color-picker-value"
};
var _sfc_main87 = defineComponent({
  ...{
    name: "ColorPicker"
  },
  __name: "ColorPicker",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: "#FF0000" },
    format: { default: "hex" },
    size: { default: void 0 },
    showText: { type: Boolean, default: false },
    showHistory: { type: Boolean, default: false },
    showPreset: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    disabledAlpha: { type: Boolean, default: false },
    hideTrigger: { type: Boolean, default: false },
    triggerProps: { default: () => {
      return {};
    } },
    historyColors: { default: () => [] },
    presetColors: { default: () => COLOR_PICKER_PRESET_COLORS }
  },
  emits: ["update:modelValue", "change", "popup-visible-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { popupVisible, computedColor, size } = useContext13().provide(
      props,
      emits
    );
    return (_ctx, _cache) => {
      return !_ctx.hideTrigger ? (openBlock(), createBlock(unref(Trigger), mergeProps({
        key: 0,
        "popup-visible": unref(popupVisible),
        "onUpdate:popupVisible": _cache[0] || (_cache[0] = ($event) => isRef(popupVisible) ? popupVisible.value = $event : null),
        "popup-offset": 4,
        disabled: _ctx.disabled,
        "need-transform-origin": "",
        "animation-name": "slide-dynamic-origin",
        trigger: "click",
        position: "bl"
      }, _ctx.triggerProps, {
        onPopupVisibleChange: _cache[1] || (_cache[1] = (v) => _ctx.$emit("popup-visible-change", v, unref(computedColor)))
      }), {
        content: withCtx(() => [
          createVNode(ColorPanel)
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createBaseVNode("div", {
              class: normalizeClass([
                "yc-color-picker",
                `yc-color-picker-size-${unref(size)}`,
                {
                  "yc-color-picker-disabled": _ctx.disabled
                },
                _ctx.$attrs.class
              ]),
              style: normalizeStyle(_ctx.$attrs.style)
            }, [
              createBaseVNode("div", {
                class: "yc-color-picker-preview",
                style: normalizeStyle({
                  backgroundColor: unref(computedColor)
                })
              }, null, 4),
              _ctx.showText ? (openBlock(), createElementBlock("span", _hoisted_142, toDisplayString(unref(computedColor)), 1)) : createCommentVNode("", true)
            ], 6)
          ], true)
        ]),
        _: 3
      }, 16, ["popup-visible", "disabled"])) : (openBlock(), createBlock(ColorPanel, { key: 1 }));
    };
  }
});

// node_modules/yc-design-vue/es/ColorPicker/ColorPicker.vue.js
var _ColorPicker = _export_sfc(_sfc_main87, [["__scopeId", "data-v-4c78f046"]]);

// node_modules/yc-design-vue/es/ColorPicker/index.js
var ColorPicker = Object.assign(_ColorPicker, {
  install: (app) => {
    app.component("Yc" + _ColorPicker.name, _ColorPicker);
  }
});

// node_modules/yc-design-vue/es/Cascader/hooks/useContext.js
var CASCADER_CONTEXT_KEY = "cascader-context";
var transformOptions = (options, level = 1, nodePath = []) => {
  return options.map((option, index2) => {
    const baseOption = {
      ...option,
      index: index2,
      level
    };
    const curNodePath = [...nodePath, baseOption];
    const enhancedOption = {
      ...baseOption,
      nodePath: curNodePath
    };
    if (enhancedOption.children && enhancedOption.children.length > 0) {
      enhancedOption.children = transformOptions(
        enhancedOption.children,
        level + 1,
        curNodePath
      );
    }
    return enhancedOption;
  });
};
var flattenOptions = (options) => {
  const result = [];
  const traverse = (options2) => {
    options2.forEach((option) => {
      result.push(option);
      if (option.children && option.children.length > 0) {
        traverse(option.children);
      }
    });
  };
  traverse(options);
  return result;
};
var findOptions = (options, level, parentPath) => {
  return level == 1 ? options.filter((item) => item.level == level) : options.filter((v) => {
    var _a;
    return v.level == level && ((_a = v.nodePath) == null ? void 0 : _a.slice(0, v.nodePath.length - 1).map((item) => item.index).join("")) == parentPath.join("");
  });
};
function findOptionByValueAndLevel(options, value, level, currentLevel = 1) {
  if (currentLevel > level) {
    return void 0;
  }
  for (const option of options) {
    if (currentLevel === level && option.value === value) {
      return option;
    }
    if (option.children && option.children.length > 0) {
      const found = findOptionByValueAndLevel(
        option.children,
        value,
        level,
        currentLevel + 1
      );
      if (found) {
        return found;
      }
    }
  }
  return void 0;
}
var getLeafNodes = (nodes) => {
  const leafNodes = [];
  function traverse(currentNode) {
    if (!currentNode.children || currentNode.children.length === 0) {
      leafNodes.push(currentNode);
      return;
    }
    currentNode.children.forEach((child) => traverse(child));
  }
  nodes.forEach((node) => traverse(node));
  return leafNodes;
};
function transformField(options, fieldKeys) {
  return options.map((option) => {
    const transformed = {};
    transformed.label = option[fieldKeys.label] ?? option.label;
    transformed.value = option[fieldKeys.value] ?? option.value;
    if (fieldKeys.render) {
      transformed.render = option[fieldKeys.render] ?? option.render;
    }
    if (fieldKeys.disabled) {
      transformed.disabled = option[fieldKeys.disabled] ?? option.disabled;
    }
    if (fieldKeys.tagProps) {
      transformed.tagProps = option[fieldKeys.tagProps] ?? option.tagProps;
    }
    if (fieldKeys.isLeaf) {
      transformed.isLeaf = option[fieldKeys.isLeaf] ?? option.isLeaf;
    }
    if (fieldKeys.children && option[fieldKeys.children]) {
      transformed.children = transformField(
        option[fieldKeys.children],
        fieldKeys
      );
    } else if (option.children) {
      transformed.children = transformField(option.children, fieldKeys);
    }
    return transformed;
  });
}
var useContext14 = () => {
  const provide$1 = (props, emits, inputRef) => {
    const {
      modelValue,
      defaultValue,
      inputValue,
      defaultInputValue,
      popupVisible,
      defaultPopupVisible,
      pathMode,
      searchDelay,
      multiple,
      disabled,
      allowClear,
      allowSearch,
      loading,
      fieldNames,
      valueKey,
      expandTrigger,
      expandChild,
      searchOptionOnlyLabel,
      options: _options
    } = toRefs(props);
    const { formatLabel, fallback, filterOption, loadMore } = props;
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
        emits("change", val);
      }
    );
    const computedInputValue = useControlValue(
      inputValue,
      defaultInputValue.value,
      (val) => {
        emits("update:inputValue", val);
        emits("input-value-change", val);
      }
    );
    const computedVisible = useControlValue(
      popupVisible,
      defaultPopupVisible.value,
      (val) => {
        emits("update:popupVisible", val);
        emits("popup-visible-change", val);
      }
    );
    const totalOptions = ref([..._options.value]);
    const options = computed(() => {
      const keys = [
        "label",
        "value",
        "render",
        "disabled",
        "tagProps",
        "children",
        "isLeaf"
      ];
      const fieldKeys = Object.fromEntries(
        keys.map((key) => {
          var _a;
          return [key, ((_a = fieldNames.value) == null ? void 0 : _a[key]) ?? key];
        })
      );
      return flattenOptions(
        transformOptions(transformField(totalOptions.value, fieldKeys))
      );
    });
    const optionMap = computed(() => {
      return Object.fromEntries([
        ...options.value.map((item) => {
          return [getValueKey(item.nodePath.map((item2) => item2.value)), item];
        }),
        ...options.value.map((item) => {
          return [getValueKey(item), item];
        })
      ]);
    });
    const leafOptions = computed(() => {
      return options.value.filter((option) => {
        var _a;
        return !((_a = option.children) == null ? void 0 : _a.length);
      });
    });
    const searchOptions = computed(() => {
      return leafOptions.value.filter((item) => filterOption(computedInputValue.value, item)).map((item) => {
        var _a;
        return {
          ...item,
          label: searchOptionOnlyLabel.value ? item.label : (_a = item.nodePath) == null ? void 0 : _a.map((item2) => item2.label).join(" / ")
        };
      });
    });
    const selectOptions = computed(() => {
      const value = multiple.value ? computedValue.value : [computedValue.value].map((item) => item);
      return value.map((v) => {
        var _a, _b;
        const option = getOption(v);
        if (option) {
          return {
            ...option,
            id: (_a = option.nodePath) == null ? void 0 : _a.map((v1) => v1.index).join("-"),
            label: (formatLabel == null ? void 0 : formatLabel(option.nodePath)) ?? ((_b = option.nodePath) == null ? void 0 : _b.map((v1) => v1.label).join(" / "))
          };
        }
        if (isBoolean(fallback) && fallback || isFunction(fallback)) {
          return {
            id: getValueKey(v),
            label: isFunction(fallback) ? fallback(v) : getValueKey(v),
            value: getValueKey(v)
          };
        }
        return null;
      }).filter((v) => v);
    });
    const curLevel = ref(1);
    const maxLevel = computed(() => {
      return Math.max(...leafOptions.value.map((item) => item.level)) || 0;
    });
    const curPath = ref([]);
    const slots = useSlots();
    const getValue = (value) => {
      return isObject2(value) ? value[valueKey.value] : value;
    };
    const getValueKey = (value) => {
      return isArray(value) ? value.map((v) => getValue(v)).join(" / ") : getValue(value);
    };
    const getOption = (value) => {
      return optionMap.value[getValueKey(value)];
    };
    function blur() {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.blur();
    }
    watch(
      _options,
      () => {
        totalOptions.value = _options.value;
      },
      {
        deep: true
      }
    );
    provide(CASCADER_CONTEXT_KEY, {
      computedValue,
      computedInputValue,
      options,
      totalOptions,
      searchOptions,
      curLevel,
      maxLevel,
      curPath,
      expandTrigger,
      expandChild,
      pathMode,
      multiple,
      loading,
      slots,
      blur,
      getValueKey,
      getOption,
      loadMore
    });
    return {
      computedValue,
      computedInputValue,
      computedVisible,
      options,
      optionMap,
      selectOptions,
      curLevel,
      curPath,
      multiple,
      pathMode,
      disabled,
      allowClear,
      allowSearch,
      searchDelay,
      loading,
      getValue,
      getValueKey,
      getOption
    };
  };
  const inject$1 = () => {
    return inject(CASCADER_CONTEXT_KEY, {
      computedValue: ref(""),
      computedInputValue: ref(""),
      options: ref([]),
      totalOptions: ref([]),
      searchOptions: ref([]),
      expandTrigger: ref("click"),
      expandChild: ref(false),
      curLevel: ref(1),
      maxLevel: ref(0),
      curPath: ref([]),
      pathMode: ref(false),
      multiple: ref(false),
      loading: ref(false),
      slots: {},
      blur: () => {
      },
      getValueKey: () => "",
      getOption: () => {
        return {};
      }
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Cascader/CascaderOption.vue2.js
var _sfc_main88 = defineComponent({
  __name: "CascaderOption",
  props: {
    level: { default: -1 },
    index: { default: -1 },
    nodePath: { default: () => [] },
    label: { default: "" },
    value: { default: "" },
    render: { type: Function, default: void 0 },
    disabled: { type: Boolean, default: false },
    tagProps: { default: () => {
      return {};
    } },
    children: { default: () => [] },
    isLeaf: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { label, value, disabled, level, isLeaf, children, nodePath } = toRefs(props);
    const {
      totalOptions,
      computedValue,
      pathMode,
      curLevel,
      curPath,
      multiple,
      expandTrigger,
      expandChild,
      slots,
      getOption,
      getValueKey,
      blur,
      loadMore
    } = useContext14().inject();
    const loading = ref(false);
    const showArrow = computed(() => {
      if (isFunction(loadMore)) {
        return !loading.value && !isLeaf.value && !children.value.length;
      } else {
        return children.value.length;
      }
    });
    const leafNodes = computed(() => {
      return children.value.length ? getLeafNodes(children.value) : [getOption(value.value)];
    });
    const isLeafNode = computed(() => {
      return !children.value.length;
    });
    const checked = computed(() => {
      var _a;
      if (!computedValue.value) {
        return false;
      }
      if (!multiple.value) {
        const option = getOption(computedValue.value) ?? {};
        return (_a = option.nodePath) == null ? void 0 : _a.some((node) => {
          return getValueKey(node.value) == getValueKey(value.value);
        });
      }
      const valueOptions = computedValue.value.map(
        (v) => {
          return getOption(v) ?? {};
        }
      );
      if (isLeafNode.value) {
        return valueOptions.some(
          (option) => getValueKey(option == null ? void 0 : option.value) == getValueKey(value.value)
        );
      }
      const valueMap = Object.fromEntries(
        valueOptions.map((option) => [getValueKey(option == null ? void 0 : option.value), option])
      );
      return leafNodes.value.every((node) => valueMap[getValueKey(node.value)]);
    });
    const indeterminate = computed(() => {
      if (isLeafNode.value || !multiple.value) {
        return false;
      }
      const valueOptions = computedValue.value.map(
        (v) => {
          return getOption(v) ?? {};
        }
      );
      const valueMap = Object.fromEntries(
        valueOptions.map((option) => [getValueKey(option.value), option])
      );
      return leafNodes.value.some((node) => valueMap[getValueKey(node.value)]);
    });
    const handleMuti = (checked2) => {
      var _a, _b, _c, _d, _e;
      const curValue = computedValue.value;
      if (checked2) {
        const valueMap = Object.fromEntries(
          curValue.map((v) => {
            return [getValueKey(v), v];
          })
        );
        computedValue.value = [
          ...curValue,
          ...leafNodes.value.map((item) => {
            return pathMode.value ? item.nodePath.map((v) => v.value) : item.value;
          }).filter((item) => {
            return !valueMap[getValueKey(item)];
          })
        ];
        curLevel.value = ((_b = (_a = leafNodes.value) == null ? void 0 : _a[0]) == null ? void 0 : _b.level) ?? curLevel.value;
        curPath.value = ((_e = (_d = (_c = leafNodes.value) == null ? void 0 : _c[0]) == null ? void 0 : _d.nodePath) == null ? void 0 : _e.map((item) => item.index)) ?? curPath.value;
      } else {
        const valueMap = Object.fromEntries(
          leafNodes.value.map((item) => {
            return pathMode.value ? item.nodePath.map((v) => v.value) : item.value;
          }).map((v) => {
            return [getValueKey(v), v];
          })
        );
        computedValue.value = curValue.filter((item) => {
          return !valueMap[getValueKey(item)];
        });
        curLevel.value = level.value;
        curPath.value = nodePath.value.map((item) => item.index);
      }
    };
    const handleEvent = async (type) => {
      if (disabled.value || loading.value) {
        return;
      }
      if (showArrow.value && isFunction(loadMore) && expandTrigger.value == type) {
        loading.value = true;
        const option = findOptionByValueAndLevel(
          totalOptions.value,
          value.value,
          level.value
        );
        await new Promise((resolve) => {
          loadMore(option, (children2) => {
            option.children = (children2 == null ? void 0 : children2.length) ? children2 : [];
            resolve("");
          });
        });
        loading.value = false;
        await sleep(0);
      }
      if (!isLeafNode.value && expandTrigger.value == type) {
        curLevel.value = expandChild.value ? leafNodes.value[0].level : level.value + 1;
        curPath.value = expandChild.value ? leafNodes.value[0].nodePath.map((item) => item.index) : nodePath.value.map((item) => item.index);
      }
      if (isLeafNode.value && type == "click" && !multiple.value) {
        computedValue.value = pathMode.value ? nodePath.value.map((item) => item.value) : value.value;
        blur();
      }
    };
    const renderLabel = () => {
      var _a;
      return ((_a = slots.option) == null ? void 0 : _a.call(slots, {
        data: props
      })) ?? label.value;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", {
        tabindex: "0",
        role: "menuitem",
        class: normalizeClass([
          "yc-cascader-option",
          {
            "yc-cascader-option-selected": checked.value || indeterminate.value,
            "yc-cascader-option-disabled": unref(disabled)
          }
        ])
      }, [
        unref(multiple) ? (openBlock(), createBlock(unref(Checkbox), {
          key: 0,
          disabled: unref(disabled),
          "model-value": checked.value,
          indeterminate: indeterminate.value,
          "onUpdate:modelValue": handleMuti
        }, null, 8, ["disabled", "model-value", "indeterminate"])) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "yc-cascader-option-label text-ellipsis",
          onMouseenter: _cache[0] || (_cache[0] = ($event) => handleEvent("hover")),
          onClick: _cache[1] || (_cache[1] = ($event) => handleEvent("click"))
        }, [
          (openBlock(), createBlock(resolveDynamicComponent(renderLabel))),
          showArrow.value ? (openBlock(), createBlock(unref(_sfc_main57), { key: 0 })) : createCommentVNode("", true),
          loading.value ? (openBlock(), createBlock(unref(_sfc_main10), {
            key: 1,
            color: "rgb(22,93,255)",
            spin: ""
          })) : createCommentVNode("", true)
        ], 32)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Cascader/CascaderOption.vue.js
var YcCascaderOption = _export_sfc(_sfc_main88, [["__scopeId", "data-v-2b9a8f90"]]);

// node_modules/yc-design-vue/es/Cascader/CascaderPanel.vue2.js
var _hoisted_143 = {
  role: "menu",
  class: "yc-cascader-list"
};
var _sfc_main89 = defineComponent({
  __name: "CascaderPanel",
  setup(__props) {
    const { renderEmpty } = getGlobalConfig();
    const { options, curLevel, curPath, maxLevel, loading, slots } = useContext14().inject();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        tag: "div",
        name: "cascader-slide",
        class: "yc-cascader-panel"
      }, {
        default: withCtx(() => [
          unref(loading) ? (openBlock(), createBlock(unref(Spin), {
            key: 0,
            loading: unref(loading)
          }, null, 8, ["loading"])) : !unref(options).length ? (openBlock(), createBlock(resolveDynamicComponent(unref(slots).empty || unref(renderEmpty)("Select")), { key: 1 })) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(unref(maxLevel), (i) => {
            return withDirectives((openBlock(), createElementBlock("div", {
              key: i,
              style: normalizeStyle({
                zIndex: unref(maxLevel) + 1 - i
              }),
              class: "yc-cascader-panel-column"
            }, [
              createVNode(unref(Scrollbar), { class: "yc-cascader-column-content" }, {
                default: withCtx(() => [
                  createBaseVNode("ul", _hoisted_143, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(findOptions)(
                      unref(options),
                      i,
                      unref(curPath).slice(0, i - 1)
                    ), (option, i1) => {
                      return openBlock(), createBlock(YcCascaderOption, mergeProps({ key: i1 }, { ref_for: true }, option), null, 16);
                    }), 128))
                  ])
                ]),
                _: 2
              }, 1024)
            ], 4)), [
              [vShow, unref(curLevel) >= i]
            ]);
          }), 128))
        ]),
        _: 1
      });
    };
  }
});

// node_modules/yc-design-vue/es/Cascader/CascaderPanel.vue.js
var CascaderPanel = _export_sfc(_sfc_main89, [["__scopeId", "data-v-0880e9fb"]]);

// node_modules/yc-design-vue/es/Cascader/CascaderSearchPanel.vue2.js
var _hoisted_144 = { class: "yc-cascader-panel yc-cascader-search-panel" };
var _hoisted_230 = {
  key: 0,
  class: "yc-cascader-empty"
};
var _hoisted_320 = {
  role: "menu",
  class: "yc-cascader-list"
};
var _sfc_main90 = defineComponent({
  __name: "CascaderSearchPanel",
  setup(__props) {
    const { renderEmpty } = getGlobalConfig();
    const { searchOptions, slots } = useContext14().inject();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_144, [
        !unref(searchOptions).length ? (openBlock(), createElementBlock("div", _hoisted_230, [
          (openBlock(), createBlock(resolveDynamicComponent(unref(slots).empty || unref(renderEmpty)("Select"))))
        ])) : createCommentVNode("", true),
        createVNode(unref(Scrollbar), { class: "yc-cascader-column-content" }, {
          default: withCtx(() => [
            createBaseVNode("ul", _hoisted_320, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(searchOptions), (option, i1) => {
                return openBlock(), createBlock(YcCascaderOption, mergeProps({ key: i1 }, { ref_for: true }, option), null, 16);
              }), 128))
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Cascader/CascaderSearchPanel.vue.js
var CascaderSearchPanel = _export_sfc(_sfc_main90, [["__scopeId", "data-v-a7a5a3af"]]);

// node_modules/yc-design-vue/es/Cascader/CascaderIcon.vue2.js
var _hoisted_145 = { class: "yc-cascader-suffix-icon" };
var _hoisted_231 = {
  key: 0,
  class: "yc-cascader-search-icon"
};
var _sfc_main91 = defineComponent({
  __name: "CascaderIcon",
  props: {
    loading: { type: Boolean },
    popupVisible: { type: Boolean },
    showClearBtn: { type: Boolean },
    allowSearch: { type: Boolean }
  },
  emits: ["clear"],
  setup(__props) {
    const { slots } = useContext14().inject();
    const renderIcon = (name) => {
      return slots[name];
    };
    return (_ctx, _cache) => {
      const _component_icon_search = resolveComponent("icon-search");
      return _ctx.loading ? (openBlock(), createBlock(unref(Spin), {
        key: 0,
        size: 12,
        class: "yc-cascader-loading-icon"
      }, createSlots({ _: 2 }, [
        _ctx.$slots["loading-icon"] ? {
          name: "icon",
          fn: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(renderIcon("loading-icon"))))
          ]),
          key: "0"
        } : void 0
      ]), 1024)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createBaseVNode("div", _hoisted_145, [
          unref(slots)["arrow-icon"] ? (openBlock(), createBlock(resolveDynamicComponent(renderIcon("arrow-icon")), { key: 0 })) : (openBlock(), createBlock(unref(_sfc_main17), {
            key: 1,
            rotate: _ctx.popupVisible ? 180 : 0
          }, null, 8, ["rotate"]))
        ]),
        _ctx.allowSearch ? (openBlock(), createElementBlock("div", _hoisted_231, [
          unref(slots)["search-icon"] ? (openBlock(), createBlock(resolveDynamicComponent(renderIcon("search-icon")), { key: 0 })) : (openBlock(), createBlock(_component_icon_search, { key: 1 }))
        ])) : createCommentVNode("", true),
        _ctx.showClearBtn ? (openBlock(), createBlock(unref(IconButton), {
          key: 1,
          class: "yc-cascader-clear-icon",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("clear"), ["stop"]))
        })) : createCommentVNode("", true)
      ], 64));
    };
  }
});

// node_modules/yc-design-vue/es/Cascader/CascaderIcon.vue.js
var CascaderIcon = _export_sfc(_sfc_main91, [["__scopeId", "data-v-b7d4002f"]]);

// node_modules/yc-design-vue/es/Cascader/Cascader.vue2.js
var _sfc_main92 = defineComponent({
  ...{
    name: "Cascader"
  },
  __name: "Cascader",
  props: {
    pathMode: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    modelValue: { default: void 0 },
    defaultValue: { default: (props) => {
      return props.multiple ? [] : "";
    } },
    options: { default: () => [] },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    size: { default: void 0 },
    allowSearch: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: false },
    inputValue: { default: void 0 },
    defaultInputValue: { default: "" },
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    expandTrigger: { default: "click" },
    placeholder: { default: "" },
    filterOption: { type: Function, default: (inputValue, option) => {
      const label = (option.label ?? "").toLowerCase();
      return label.includes(inputValue.toLowerCase());
    } },
    popupContainer: { default: void 0 },
    maxTagCount: { default: 0 },
    formatLabel: { type: Function, default: void 0 },
    triggerProps: { default: () => {
      return {};
    } },
    loadMore: { type: Function, default: void 0 },
    loading: { type: Boolean, default: false },
    searchOptionOnlyLabel: { type: Boolean, default: false },
    searchDelay: { default: 500 },
    fieldNames: { default: () => {
      return {};
    } },
    valueKey: { default: "value" },
    fallback: { type: [Boolean, Function], default: true },
    expandChild: { type: Boolean, default: false },
    tagNowrap: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:inputValue", "update:popupVisible", "change", "input-value-change", "clear", "search", "popup-visible-change", "focus", "blur"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const inputRef = ref();
    const {
      computedValue,
      computedInputValue,
      computedVisible,
      selectOptions,
      searchDelay,
      multiple,
      pathMode,
      disabled,
      allowClear,
      allowSearch,
      loading,
      curLevel,
      curPath,
      getValueKey,
      getOption
    } = useContext14().provide(props, emits, inputRef);
    const showClearBtn = computed(() => {
      let hasValue = true;
      if (pathMode.value) {
        hasValue = multiple.value ? computedValue.value.flat(1).length : computedValue.value.length;
      } else {
        hasValue = multiple.value ? computedValue.value.length : computedValue.value;
      }
      return allowClear.value && !disabled.value && !loading.value && !!hasValue;
    });
    const isReadonly = computed(() => {
      return !allowSearch.value || loading.value;
    });
    const isSearchMode = computed(() => {
      return allowSearch.value && computedInputValue.value;
    });
    const handleEvent = async (type, value = "") => {
      var _a, _b;
      switch (type) {
        case "clear":
          {
            computedValue.value = multiple.value || pathMode.value ? [] : "";
            emits("clear");
          }
          break;
        case "search":
          {
            await sleep(searchDelay.value);
            emits("search", value);
          }
          break;
        case "focus":
          {
            if (disabled.value) {
              return;
            }
            if (computedVisible.value) {
              return (_a = inputRef.value) == null ? void 0 : _a.blur();
            }
            const value2 = getValueKey(
              multiple.value ? computedValue.value[0] : computedValue.value
            );
            const option = value2 ? getOption(value2) : null;
            if (option) {
              curPath.value = option.nodePath.map((item) => item.index);
              curLevel.value = option.level;
            } else {
              curPath.value = [];
              curLevel.value = 1;
            }
            computedVisible.value = true;
            await sleep(0);
            (_b = inputRef.value) == null ? void 0 : _b.focus();
          }
          break;
        case "blur":
          {
            computedVisible.value = false;
          }
          break;
        case "updateValue":
          {
            computedValue.value = value.map(
              (item) => item.value
            );
          }
          break;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Trigger), mergeProps({
        "popup-visible": unref(computedVisible),
        "onUpdate:popupVisible": _cache[11] || (_cache[11] = ($event) => isRef(computedVisible) ? computedVisible.value = $event : null),
        "popup-offset": 4,
        "popup-container": _ctx.popupContainer,
        disabled: unref(disabled),
        position: "bl",
        trigger: "focus",
        "animation-name": "slide-dynamic-origin",
        "prevent-focus": ""
      }, _ctx.triggerProps), {
        content: withCtx(() => [
          isSearchMode.value ? (openBlock(), createBlock(CascaderSearchPanel, { key: 0 })) : (openBlock(), createBlock(CascaderPanel, { key: 1 }))
        ]),
        default: withCtx(() => {
          var _a, _b;
          return [
            createBaseVNode("div", {
              class: normalizeClass([
                "yc-cascader",
                {
                  "yc-cascader-allow-clear": showClearBtn.value,
                  "yc-cascader-allow-search": unref(allowSearch)
                },
                _ctx.$attrs.class
              ]),
              style: normalizeStyle(_ctx.$attrs.style)
            }, [
              unref(multiple) ? (openBlock(), createBlock(unref(InputTag), {
                key: 0,
                "input-value": unref(computedInputValue),
                "onUpdate:inputValue": _cache[1] || (_cache[1] = ($event) => isRef(computedInputValue) ? computedInputValue.value = $event : null),
                "model-value": unref(selectOptions),
                placeholder: _ctx.placeholder,
                readonly: isReadonly.value,
                disabled: unref(disabled),
                size: _ctx.size,
                error: _ctx.error,
                "max-tag-count": _ctx.maxTagCount,
                "tag-nowrap": _ctx.tagNowrap,
                ref_key: "inputRef",
                ref: inputRef,
                onFocus: _cache[2] || (_cache[2] = ($event) => handleEvent("focus")),
                onBlur: _cache[3] || (_cache[3] = ($event) => handleEvent("blur")),
                onInput: _cache[4] || (_cache[4] = (v) => handleEvent("search", v)),
                "onUpdate:modelValue": _cache[5] || (_cache[5] = (v) => handleEvent("updateValue", v))
              }, createSlots({
                suffix: withCtx(() => [
                  createVNode(CascaderIcon, {
                    "popup-visible": unref(computedVisible),
                    "allow-search": unref(allowSearch),
                    loading: unref(loading),
                    "show-clear-btn": showClearBtn.value,
                    onClear: _cache[0] || (_cache[0] = ($event) => handleEvent("clear"))
                  }, null, 8, ["popup-visible", "allow-search", "loading", "show-clear-btn"])
                ]),
                _: 2
              }, [
                _ctx.$slots.label ? {
                  name: "tag",
                  fn: withCtx((scope) => [
                    renderSlot(_ctx.$slots, "label", normalizeProps(guardReactiveProps(scope)), void 0, true)
                  ]),
                  key: "0"
                } : void 0,
                _ctx.$slots.prefix ? {
                  name: "prefix",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
                  ]),
                  key: "1"
                } : void 0
              ]), 1032, ["input-value", "model-value", "placeholder", "readonly", "disabled", "size", "error", "max-tag-count", "tag-nowrap"])) : (openBlock(), createBlock(unref(Input), {
                key: 1,
                modelValue: unref(computedInputValue),
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => isRef(computedInputValue) ? computedInputValue.value = $event : null),
                "show-input": unref(computedVisible),
                readonly: isReadonly.value,
                disabled: unref(disabled),
                size: _ctx.size,
                error: _ctx.error,
                placeholder: ((_b = (_a = unref(selectOptions)[0]) == null ? void 0 : _a.label) == null ? void 0 : _b.toString()) || "",
                ref_key: "inputRef",
                ref: inputRef,
                onClick: _cache[8] || (_cache[8] = ($event) => handleEvent("focus")),
                onBlur: _cache[9] || (_cache[9] = ($event) => handleEvent("blur")),
                onInput: _cache[10] || (_cache[10] = (v) => handleEvent("search", v))
              }, createSlots({
                label: withCtx(() => [
                  renderSlot(_ctx.$slots, "label", {
                    data: unref(selectOptions)[0]
                  }, () => {
                    var _a2, _b2;
                    return [
                      createBaseVNode("span", {
                        class: normalizeClass([
                          {
                            "yc-input-placeholder": !((_a2 = unref(selectOptions)[0]) == null ? void 0 : _a2.label)
                          }
                        ])
                      }, toDisplayString(((_b2 = unref(selectOptions)[0]) == null ? void 0 : _b2.label) || _ctx.placeholder), 3)
                    ];
                  }, true)
                ]),
                suffix: withCtx(() => [
                  createVNode(CascaderIcon, {
                    "popup-visible": unref(computedVisible),
                    "allow-search": unref(allowSearch),
                    loading: unref(loading),
                    "show-clear-btn": showClearBtn.value,
                    onClear: _cache[6] || (_cache[6] = ($event) => handleEvent("clear"))
                  }, null, 8, ["popup-visible", "allow-search", "loading", "show-clear-btn"])
                ]),
                _: 2
              }, [
                _ctx.$slots.prefix ? {
                  name: "prefix",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["modelValue", "show-input", "readonly", "disabled", "size", "error", "placeholder"]))
            ], 6)
          ];
        }),
        _: 3
      }, 16, ["popup-visible", "popup-container", "disabled"]);
    };
  }
});

// node_modules/yc-design-vue/es/Cascader/Cascader.vue.js
var _Cascader = _export_sfc(_sfc_main92, [["__scopeId", "data-v-a5acb2b3"]]);

// node_modules/yc-design-vue/es/Cascader/index.js
var Cascader = Object.assign(_Cascader, {
  install: (app) => {
    app.component("Yc" + _Cascader.name, _Cascader);
  }
});

// node_modules/yc-design-vue/es/Comment/hooks/useContext.js
var COMMENT_CONTEXT_KEY = "comment-context";
var useContext15 = () => {
  const { depths } = inject(COMMENT_CONTEXT_KEY, {
    depths: reactive(/* @__PURE__ */ new Map())
  });
  const hasChildren = computed(() => depths.size > 1);
  const id = nanoid();
  depths.set(id, id);
  onBeforeUnmount(() => {
    depths.delete(id);
  });
  provide(COMMENT_CONTEXT_KEY, {
    depths
  });
  return {
    hasChildren
  };
};

// node_modules/yc-design-vue/es/Comment/index.vue2.js
var _hoisted_146 = {
  Comment: "",
  class: "yc-comment"
};
var _hoisted_232 = {
  key: 0,
  class: "yc-comment-avatar"
};
var _hoisted_321 = { class: "yc-comment-inner" };
var _hoisted_412 = { class: "yc-comment-inner-content" };
var _hoisted_57 = {
  key: 0,
  class: "yc-comment-author"
};
var _hoisted_63 = {
  key: 1,
  class: "yc-comment-datetime"
};
var _hoisted_72 = {
  key: 0,
  class: "yc-comment-content"
};
var _hoisted_82 = {
  key: 0,
  class: "yc-comment-inner-comment"
};
var _sfc_main93 = defineComponent({
  ...{
    name: "Comment"
  },
  __name: "index",
  props: {
    author: { default: "" },
    avatar: { default: "" },
    content: { default: "" },
    datetime: { default: "" },
    align: { default: "left" }
  },
  setup(__props) {
    const { hasChildren } = useContext15();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_146, [
        _ctx.$slots.avatar || _ctx.avatar ? (openBlock(), createElementBlock("div", _hoisted_232, [
          renderSlot(_ctx.$slots, "avatar", {}, () => [
            createVNode(unref(Avatar), {
              "image-url": _ctx.avatar,
              size: unref(hasChildren) ? 32 : 40
            }, null, 8, ["image-url", "size"])
          ], true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_321, [
          createBaseVNode("div", _hoisted_412, [
            createBaseVNode("div", {
              class: normalizeClass([
                "yc-comment-title",
                {
                  "yc-comment-title-align-left": _ctx.align == "left" || unref(isObject2)(_ctx.align) && _ctx.align.datetime == "left",
                  "yc-comment-title-align-right": _ctx.align == "right" || unref(isObject2)(_ctx.align) && _ctx.align.datetime == "right"
                }
              ])
            }, [
              _ctx.$slots.author || _ctx.author ? (openBlock(), createElementBlock("span", _hoisted_57, [
                renderSlot(_ctx.$slots, "author", {}, () => [
                  createTextVNode(toDisplayString(_ctx.author), 1)
                ], true)
              ])) : createCommentVNode("", true),
              _ctx.$slots.datetime || _ctx.datetime ? (openBlock(), createElementBlock("span", _hoisted_63, [
                renderSlot(_ctx.$slots, "datetime", {}, () => [
                  createTextVNode(toDisplayString(_ctx.datetime), 1)
                ], true)
              ])) : createCommentVNode("", true)
            ], 2),
            _ctx.$slots.content || _ctx.content ? (openBlock(), createElementBlock("div", _hoisted_72, [
              renderSlot(_ctx.$slots, "content", {}, () => [
                createTextVNode(toDisplayString(_ctx.content), 1)
              ], true)
            ])) : createCommentVNode("", true),
            _ctx.$slots.actions ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass([
                "yc-comment-actions",
                {
                  "yc-comment-actions-align-left": _ctx.align == "left" || unref(isObject2)(_ctx.align) && _ctx.align.datetime == "left",
                  "yc-comment-actions-align-right": _ctx.align == "right" || unref(isObject2)(_ctx.align) && _ctx.align.datetime == "right"
                }
              ])
            }, [
              renderSlot(_ctx.$slots, "actions", {}, void 0, true)
            ], 2)) : createCommentVNode("", true)
          ]),
          _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_82, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Comment/index.vue.js
var _Comment = _export_sfc(_sfc_main93, [["__scopeId", "data-v-69fc0867"]]);

// node_modules/yc-design-vue/es/Comment/index.js
var Comment2 = Object.assign(_Comment, {
  install: (app) => {
    app.component("Yc" + _Comment.name, _Comment);
  }
});

// node_modules/yc-design-vue/es/ConfigProvider/index.vue.js
var _sfc_main94 = defineComponent({
  ...{
    name: "ConfigProvider"
  },
  __name: "index",
  props: {
    zIndex: { default: 1001 },
    size: { default: "medium" },
    popupContainer: { default: "body" },
    updateAtScroll: { type: Boolean, default: true },
    scrollToClose: { type: Boolean, default: false },
    exchangeTime: { type: Boolean, default: true }
  },
  setup(__props) {
    const slots = useSlots();
    const props = __props;
    const {
      zIndex,
      size,
      updateAtScroll,
      scrollToClose,
      exchangeTime,
      popupContainer
    } = toRefs(props);
    provide(CONFIG_PROVIDER_PROVIDE_KEY, {
      slots,
      zIndex,
      size,
      updateAtScroll,
      scrollToClose,
      exchangeTime,
      popupContainer
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});

// node_modules/yc-design-vue/es/ConfigProvider/index.js
var ConfigProvider = Object.assign(_sfc_main94, {
  install: (app) => {
    app.component("Yc" + _sfc_main94.name, _sfc_main94);
  }
});

// node_modules/yc-design-vue/es/Descriptions/DescriptionsItem.vue.js
var _sfc_main95 = defineComponent({
  ...{
    name: "DescriptionsItem"
  },
  __name: "DescriptionsItem",
  props: {
    span: { default: 1 },
    label: { default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});

// node_modules/yc-design-vue/es/Descriptions/hooks/useContext.js
var DESCRIPTIONS_CONTEXT_KEY = "radio-group-context";
var useContext16 = () => {
  const provide$1 = (props) => {
    const {
      data: _data,
      column: _column,
      layout,
      labelStyle,
      valueStyle,
      bordered,
      align
    } = toRefs(props);
    const { size } = getGlobalConfig(props);
    const slots = useSlots();
    const data = computed(() => {
      var _a;
      const nodes = findComponentsFromVnodes(
        ((_a = slots.default) == null ? void 0 : _a.call(slots)) || [],
        _sfc_main95.name
      );
      if (!nodes.length) return _data.value;
      return nodes.map((node) => {
        var _a2, _b, _c, _d;
        return {
          label: ((_a2 = node.children) == null ? void 0 : _a2.label) ?? ((_b = node.props) == null ? void 0 : _b.label),
          value: (_c = node.children) == null ? void 0 : _c.default,
          span: (_d = node.props) == null ? void 0 : _d.span
        };
      });
    });
    const breakpoint = ref("xxl");
    const column = computed(() => {
      return getBreakpointValue(breakpoint.value, _column.value, 3);
    });
    mediaQueryHandler((name) => {
      breakpoint.value = name;
    });
    provide(DESCRIPTIONS_CONTEXT_KEY, {
      size,
      bordered,
      align,
      labelStyle,
      valueStyle,
      slots
    });
    return {
      data,
      size,
      column,
      layout
    };
  };
  const inject$1 = () => {
    return inject(DESCRIPTIONS_CONTEXT_KEY, {
      size: ref("medium"),
      bordered: ref(false),
      align: ref("left"),
      labelStyle: ref({}),
      valueStyle: ref({}),
      slots: {}
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Descriptions/ReuseTd.vue2.js
var _hoisted_147 = ["colspan"];
var _sfc_main96 = defineComponent({
  __name: "ReuseTd",
  props: {
    data: {},
    index: {},
    type: {},
    colspan: {}
  },
  setup(__props) {
    const { labelStyle, valueStyle, bordered, size, align, slots } = useContext16().inject();
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return openBlock(), createElementBlock("td", {
        class: normalizeClass([
          _ctx.type == "label" ? "yc-descriptions-item-label" : "yc-descriptions-item-value",
          `yc-descriptions-item-cell-size-${unref(size)}`,
          {
            "yc-descriptions-item-cell-bordered": unref(bordered)
          }
        ]),
        style: normalizeStyle({
          ..._ctx.type == "label" ? unref(labelStyle) : unref(valueStyle),
          textAlign: unref(isObject2)(unref(align)) ? unref(align)[_ctx.type] ?? "left" : unref(align)
        }),
        colspan: _ctx.colspan
      }, [
        (openBlock(), createBlock(resolveDynamicComponent(
          unref(getSlotFunction)(
            _ctx.type == "label" ? ((_b = (_a = unref(slots)).label) == null ? void 0 : _b.call(_a, {
              label: _ctx.data.label,
              index: _ctx.index,
              data: _ctx.data
            })) ?? _ctx.data.label : ((_d = (_c = unref(slots)).value) == null ? void 0 : _d.call(_c, {
              value: _ctx.data.value,
              index: _ctx.index,
              data: _ctx.data
            })) ?? _ctx.data.value
          )
        )))
      ], 14, _hoisted_147);
    };
  }
});

// node_modules/yc-design-vue/es/Descriptions/ReuseTd.vue.js
var ReuseTd = _export_sfc(_sfc_main96, [["__scopeId", "data-v-c77b36fd"]]);

// node_modules/yc-design-vue/es/Descriptions/ReuseItem.vue2.js
var _hoisted_148 = { class: "yc-descriptions-item" };
var _sfc_main97 = defineComponent({
  __name: "ReuseItem",
  props: {
    data: {},
    index: {}
  },
  setup(__props) {
    const { labelStyle, valueStyle, slots, align } = useContext16().inject();
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return openBlock(), createElementBlock("td", _hoisted_148, [
        createBaseVNode("div", {
          class: "yc-descriptions-item-label",
          style: normalizeStyle({
            ...unref(labelStyle),
            textAlign: unref(isObject2)(unref(align)) ? unref(align).label ?? "left" : unref(align)
          })
        }, [
          (openBlock(), createBlock(resolveDynamicComponent(
            unref(getSlotFunction)(
              ((_b = (_a = unref(slots)).label) == null ? void 0 : _b.call(_a, {
                label: _ctx.data.label,
                index: _ctx.index,
                data: _ctx.data
              })) ?? _ctx.data.label
            )
          )))
        ], 4),
        createBaseVNode("div", {
          class: "yc-descriptions-item-value",
          style: normalizeStyle({
            ...unref(valueStyle),
            textAlign: unref(isObject2)(unref(align)) ? unref(align).value ?? "left" : unref(align)
          })
        }, [
          (openBlock(), createBlock(resolveDynamicComponent(
            unref(getSlotFunction)(
              ((_d = (_c = unref(slots)).value) == null ? void 0 : _d.call(_c, {
                value: _ctx.data.value,
                index: _ctx.index,
                data: _ctx.data
              })) ?? _ctx.data.value
            )
          )))
        ], 4)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Descriptions/ReuseItem.vue.js
var ReuseItem = _export_sfc(_sfc_main97, [["__scopeId", "data-v-b69fc717"]]);

// node_modules/yc-design-vue/es/Descriptions/Descriptions.vue.js
var _hoisted_149 = {
  key: 0,
  class: "yc-descriptions-title"
};
var _hoisted_233 = { class: "yc-descriptions-body" };
var _hoisted_322 = { class: "yc-descriptions-table" };
var _hoisted_413 = { class: "yc-descriptions-row" };
var _hoisted_58 = { class: "yc-descriptions-row" };
var _sfc_main98 = defineComponent({
  ...{
    name: "Descriptions"
  },
  __name: "Descriptions",
  props: {
    data: { default: () => [] },
    column: { default: 3 },
    title: { default: "" },
    layout: { default: "horizontal" },
    align: { default: "left" },
    size: { default: void 0 },
    bordered: { type: Boolean, default: false },
    labelStyle: { default: () => {
      return {};
    } },
    valueStyle: { default: () => {
      return {};
    } },
    tableLayout: { default: "auto" }
  },
  setup(__props) {
    const props = __props;
    const { column, size, data, layout } = useContext16().provide(props);
    const renderArr = computed(() => {
      var _a, _b;
      let count = 0;
      const rowArray = [];
      for (let i = 0; i < data.value.length; i++) {
        const newCount = count + (((_b = (_a = data.value) == null ? void 0 : _a[i]) == null ? void 0 : _b.span) ?? 1);
        if (newCount >= column.value) {
          const pre = rowArray.length ? rowArray[rowArray.length - 1][1] : 0;
          rowArray.push([pre, i + 1]);
          count = 0;
        } else {
          count = newCount;
        }
      }
      if (rowArray.length && rowArray[rowArray.length - 1][1] != column.value) {
        rowArray.push([rowArray[rowArray.length - 1][1]]);
      }
      return rowArray.map((v) => data.value.slice(...v)).filter((item) => item.length);
    });
    function getSpan(data2) {
      const _span = data2.span || 1;
      const span = layout.value == "horizontal" ? _span * 2 - 1 : _span;
      const totalSpan = layout.value == "horizontal" ? 2 * column.value : column.value;
      return span >= totalSpan - 1 ? totalSpan - 1 : span;
    }
    const calcSpan = (i, array) => {
      return i == array.length - 1 ? array.reduce((pre, cur, index2) => {
        if (index2 < array.length - 1) {
          return pre + getSpan(cur);
        } else {
          const totalSpan = layout.value == "horizontal" ? 2 * column.value : column.value;
          const span = totalSpan - pre;
          return span <= 1 ? 1 : span;
        }
      }, 0) : getSpan(array[i]);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-descriptions",
          `yc-descriptions-size-${unref(size)}`,
          `yc-descriptions-layout-${unref(layout)}`,
          {
            "yc-descriptions-bordered": _ctx.bordered,
            "yc-descriptions-table-layout-fixed ": _ctx.tableLayout == "fixed"
          }
        ])
      }, [
        _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_149, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(_ctx.title), 1)
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_233, [
          createBaseVNode("table", _hoisted_322, [
            createBaseVNode("tbody", null, [
              unref(layout) == "horizontal" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(renderArr.value, (v, i) => {
                return openBlock(), createElementBlock("tr", {
                  key: i,
                  class: "yc-descriptions-row"
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(v, (item, i1) => {
                    return openBlock(), createElementBlock(Fragment, { key: i1 }, [
                      createVNode(ReuseTd, {
                        type: "label",
                        data: item,
                        index: v.length + i1
                      }, null, 8, ["data", "index"]),
                      createVNode(ReuseTd, {
                        type: "value",
                        data: item,
                        index: v.length + i1,
                        colspan: calcSpan(i1, v)
                      }, null, 8, ["data", "index", "colspan"])
                    ], 64);
                  }), 128))
                ]);
              }), 128)) : unref(layout) == "vertical" ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(renderArr.value, (v, i) => {
                return openBlock(), createElementBlock(Fragment, { key: i }, [
                  createBaseVNode("tr", _hoisted_413, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(v, (item, i1) => {
                      return openBlock(), createBlock(ReuseTd, {
                        key: i1,
                        type: "label",
                        data: item,
                        index: v.length + i1,
                        colspan: calcSpan(i1, v)
                      }, null, 8, ["data", "index", "colspan"]);
                    }), 128))
                  ]),
                  createBaseVNode("tr", _hoisted_58, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(v, (item, i1) => {
                      return openBlock(), createBlock(ReuseTd, {
                        key: i1,
                        type: "value",
                        data: item,
                        index: v.length + i1,
                        colspan: calcSpan(i1, v)
                      }, null, 8, ["data", "index", "colspan"]);
                    }), 128))
                  ])
                ], 64);
              }), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(renderArr.value, (v, i) => {
                return openBlock(), createElementBlock("tr", {
                  key: i,
                  class: "yc-descriptions-row"
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(v, (item, i1) => {
                    return openBlock(), createBlock(ReuseItem, {
                      key: i1,
                      data: item,
                      index: v.length + i1,
                      colspan: calcSpan(i1, v)
                    }, null, 8, ["data", "index", "colspan"]);
                  }), 128))
                ]);
              }), 128))
            ])
          ])
        ])
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Descriptions/index.js
var Descriptions = Object.assign(_sfc_main98, {
  item: _sfc_main95,
  install: (app) => {
    app.component("Yc" + _sfc_main98.name, _sfc_main98);
    app.component("Yc" + _sfc_main95.name, _sfc_main95);
  }
});

// node_modules/yc-design-vue/es/Divider/index.vue2.js
var _sfc_main99 = defineComponent({
  ...{
    name: "Divider"
  },
  __name: "index",
  props: {
    direction: { default: "horizontal" },
    orientation: { default: "center" },
    type: { default: "solid" },
    size: { default: 1 },
    margin: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { size, margin: _margin, direction, type } = toRefs(props);
    const margin = computed(() => {
      if (isUndefined(_margin.value)) {
        return direction.value == "horizontal" ? "20px 0" : "0 12px";
      }
      return direction.value == "horizontal" ? `${valueToPx(_margin.value)} 0` : `0 ${valueToPx(_margin.value)}`;
    });
    const border = computed(
      () => `${valueToPx(size.value)} ${type.value} rgb(229, 230, 235)`
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "separator",
        class: normalizeClass(["yc-divider", `yc-divider-direction-${unref(direction)}`]),
        style: normalizeStyle({
          margin: margin.value,
          borderLeft: unref(direction) == "vertical" ? border.value : "",
          borderBottom: unref(direction) == "horizontal" ? border.value : ""
        })
      }, [
        _ctx.$slots.default && unref(direction) != "vertical" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["yc-divider-text", `yc-divider-text-${_ctx.orientation}`])
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 2)) : createCommentVNode("", true)
      ], 6);
    };
  }
});

// node_modules/yc-design-vue/es/Divider/index.vue.js
var _Divider = _export_sfc(_sfc_main99, [["__scopeId", "data-v-a009a00c"]]);

// node_modules/yc-design-vue/es/Divider/index.js
var Divider = Object.assign(_Divider, {
  install: (app) => {
    app.component("Yc" + _Divider.name, _Divider);
  }
});

// node_modules/yc-design-vue/es/Modal/hooks/useOnBeforeClose.js
var useOnBeforeClose = async (type, asyncLoading, onBeforeOk, onBeforeCancel) => {
  const handleBeforeOk = () => {
    return new Promise(async (resolve) => {
      const closeResult = onBeforeOk(resolve);
      let isClose2 = true;
      if (isBoolean(closeResult)) {
        isClose2 = closeResult;
      } else if (closeResult instanceof Promise) {
        try {
          const _isClose = await closeResult;
          if (isBoolean(_isClose)) {
            isClose2 = _isClose;
          }
        } catch {
          isClose2 = false;
        }
      }
      resolve(isClose2);
    });
  };
  let isClose;
  if (type == "confirmBtn") {
    asyncLoading.value = true;
    isClose = await handleBeforeOk();
    asyncLoading.value = false;
  } else {
    isClose = onBeforeCancel();
  }
  return isClose;
};

// node_modules/yc-design-vue/es/Modal/hooks/useModalClose.js
var useModalClose = (params) => {
  const {
    maskClosable,
    escToClose,
    visible,
    defaultVisible,
    onBeforeCancel,
    onBeforeOk,
    emits
  } = params;
  const outerVisible = ref(false);
  const asyncLoading = ref(false);
  const innerVisible = useControlValue(
    visible,
    defaultVisible.value,
    (val) => {
      emits("update:visible", val);
    }
  );
  const handleAfterLeave = () => {
    emits("close");
    outerVisible.value = false;
  };
  const handleClose = async (type, ev, cancelEmits = true) => {
    const isClose = ["confirmBtn", "cancelBtn"].includes(type) ? await useOnBeforeClose(type, asyncLoading, onBeforeOk, onBeforeCancel) : true;
    if (!isClose) {
      return;
    }
    if (type == "mask" && !maskClosable.value) {
      return;
    }
    if (type == "confirmBtn") {
      emits("ok");
    }
    cancelEmits && emits("cancel", ev);
    innerVisible.value = false;
  };
  if (escToClose.value) {
    onKeyStroke(["Escape"], (ev) => {
      if (!innerVisible.value) return;
      handleClose("esc", ev);
    });
  }
  watch(
    () => innerVisible.value,
    (val) => {
      if (!val) return;
      outerVisible.value = val;
    },
    {
      immediate: true
    }
  );
  return {
    asyncLoading,
    outerVisible,
    innerVisible,
    handleClose,
    handleAfterLeave
  };
};

// node_modules/yc-design-vue/es/Drawer/Drawer.vue2.js
var _hoisted_150 = {
  key: 0,
  class: "yc-drawer-header"
};
var _hoisted_234 = { class: "yc-drawer-title text-ellipsis" };
var _hoisted_323 = { class: "yc-drawer-body" };
var _hoisted_414 = {
  key: 0,
  class: "yc-drawer-footer"
};
var _sfc_main100 = defineComponent({
  ...{
    name: "Drawer",
    inheritAttrs: false
  },
  __name: "Drawer",
  props: {
    visible: { type: Boolean, default: void 0 },
    defaultVisible: { type: Boolean, default: false },
    placement: { default: "right" },
    title: { default: "" },
    mask: { type: Boolean, default: true },
    maskClosable: { type: Boolean, default: true },
    closable: { type: Boolean, default: true },
    okText: { default: "确认" },
    cancelText: { default: "取消" },
    okLoading: { type: Boolean, default: false },
    okButtonProps: { default: () => {
      return {};
    } },
    cancelButtonProps: { default: () => {
      return {};
    } },
    unmountOnClose: { type: Boolean, default: false },
    width: { default: 250 },
    height: { default: 250 },
    popupContainer: { default: void 0 },
    drawerStyle: { default: () => {
      return {};
    } },
    escToClose: { type: Boolean, default: true },
    renderToBody: { type: Boolean, default: true },
    header: { type: Boolean, default: true },
    footer: { type: Boolean, default: true },
    hideCancel: { type: Boolean, default: false },
    onBeforeCancel: { type: Function, default: () => {
      return true;
    } },
    onBeforeOk: { type: Function, default: () => {
      return true;
    } }
  },
  emits: ["update:visible", "ok", "cancel", "before-open", "open", "before-close", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      visible,
      defaultVisible,
      width,
      height,
      placement,
      maskClosable,
      escToClose,
      drawerStyle: _drawerStyle,
      renderToBody
    } = toRefs(props);
    const { onBeforeOk, onBeforeCancel } = props;
    const { zIndex, popupContainer } = getGlobalConfig(props);
    const drawerStyle = computed(() => {
      return {
        height: placement.value == "left" || placement.value == "right" ? "100%" : valueToPx(height.value),
        width: placement.value == "left" || placement.value == "right" ? valueToPx(width.value) : `100%`,
        // 传入样式
        ..._drawerStyle.value
      };
    });
    const {
      outerVisible,
      innerVisible,
      asyncLoading,
      handleClose,
      handleAfterLeave
    } = useModalClose({
      visible,
      defaultVisible,
      escToClose,
      maskClosable,
      onBeforeCancel,
      onBeforeOk,
      emits
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, {
        to: unref(popupContainer),
        disabled: !unref(renderToBody)
      }, [
        !_ctx.unmountOnClose || unref(outerVisible) ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([
            "yc-drawer-wrapper",
            `yc-drawer-placement-${unref(placement)}`,
            _ctx.$attrs.class,
            {
              "yc-drawer-position-absolute": unref(popupContainer) || !unref(renderToBody)
            }
          ]),
          style: normalizeStyle({
            zIndex: unref(zIndex),
            ..._ctx.$attrs.style ?? {}
          })
        }, [
          createVNode(Transition, { name: "fade" }, {
            default: withCtx(() => [
              _ctx.mask ? withDirectives((openBlock(), createElementBlock("div", {
                key: 0,
                class: "yc-drawer-mask",
                onClick: _cache[0] || (_cache[0] = ($event) => unref(handleClose)("mask", $event))
              }, null, 512)), [
                [vShow, unref(innerVisible)]
              ]) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(Transition, {
            name: `slide-drawer-${unref(placement)}`,
            onBeforeEnter: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("before-open")),
            onBeforeLeave: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("before-close")),
            onAfterEnter: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("open")),
            onAfterLeave: unref(handleAfterLeave)
          }, {
            default: withCtx(() => [
              withDirectives(createBaseVNode("div", {
                class: "yc-drawer-container",
                style: normalizeStyle(drawerStyle.value)
              }, [
                renderSlot(_ctx.$slots, "header", {}, () => [
                  _ctx.header ? (openBlock(), createElementBlock("div", _hoisted_150, [
                    createBaseVNode("div", _hoisted_234, [
                      renderSlot(_ctx.$slots, "title", {}, () => [
                        createTextVNode(toDisplayString(_ctx.title), 1)
                      ], true)
                    ]),
                    _ctx.closable ? (openBlock(), createBlock(unref(IconButton), {
                      key: 0,
                      class: "yc-modal-close-button",
                      onClick: _cache[1] || (_cache[1] = ($event) => unref(handleClose)("closeBtn", $event))
                    })) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ], true),
                createBaseVNode("div", _hoisted_323, [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ]),
                renderSlot(_ctx.$slots, "footer", {}, () => [
                  _ctx.footer ? (openBlock(), createElementBlock("div", _hoisted_414, [
                    !_ctx.hideCancel ? (openBlock(), createBlock(unref(Button), mergeProps({ key: 0 }, _ctx.cancelButtonProps, {
                      onClick: _cache[2] || (_cache[2] = ($event) => unref(handleClose)("cancelBtn", $event))
                    }), {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.cancelText), 1)
                      ]),
                      _: 1
                    }, 16)) : createCommentVNode("", true),
                    createVNode(unref(Button), mergeProps({
                      type: "primary",
                      loading: _ctx.okLoading || unref(asyncLoading)
                    }, _ctx.okButtonProps, {
                      onClick: _cache[3] || (_cache[3] = ($event) => unref(handleClose)("confirmBtn", $event))
                    }), {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.okText), 1)
                      ]),
                      _: 1
                    }, 16, ["loading"])
                  ])) : createCommentVNode("", true)
                ], true)
              ], 4), [
                [vShow, unref(innerVisible)]
              ])
            ]),
            _: 3
          }, 8, ["name", "onAfterLeave"])
        ], 6)), [
          [vShow, unref(outerVisible)]
        ]) : createCommentVNode("", true)
      ], 8, ["to", "disabled"]);
    };
  }
});

// node_modules/yc-design-vue/es/Drawer/Drawer.vue.js
var _Drawer = _export_sfc(_sfc_main100, [["__scopeId", "data-v-23a10cf6"]]);

// node_modules/yc-design-vue/es/Drawer/DrawerService.vue.js
var _hoisted_151 = { class: "yc-drawer-body-content" };
var _sfc_main101 = defineComponent({
  __name: "DrawerService",
  props: {
    placement: { default: "right" },
    title: { type: [String, Array, Function], default: "" },
    mask: { type: Boolean, default: true },
    maskClosable: { type: Boolean, default: true },
    closable: { type: Boolean, default: true },
    okText: { default: "确认" },
    cancelText: { default: "取消" },
    okLoading: { type: Boolean, default: false },
    okButtonProps: { default: () => {
      return {};
    } },
    cancelButtonProps: { default: () => {
      return {};
    } },
    unmountOnClose: { type: Boolean, default: false },
    width: { default: 250 },
    height: { default: 250 },
    popupContainer: { default: "yc-overlay-drawer" },
    drawerStyle: { default: () => {
      return {};
    } },
    escToClose: { type: Boolean, default: true },
    renderToBody: { type: Boolean, default: false },
    header: { type: Boolean, default: true },
    footer: { type: Boolean, default: true },
    hideCancel: { type: Boolean, default: false },
    onBeforeCancel: { type: Function, default: () => {
      return true;
    } },
    onBeforeOk: { type: Function, default: () => {
      return true;
    } },
    content: {},
    onOk: {},
    onCancel: {},
    onOpen: {},
    onClose: {},
    onBeforeOpen: {},
    onBeforeClose: {},
    serviceClose: {}
  },
  setup(__props) {
    const props = __props;
    const { onClose, serviceClose } = props;
    const visible = ref(false);
    const handleClose = () => {
      serviceClose == null ? void 0 : serviceClose();
      onClose == null ? void 0 : onClose();
    };
    onMounted(() => {
      visible.value = true;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_Drawer, mergeProps(props, {
        visible: visible.value,
        "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => visible.value = $event),
        onOk: _cache[1] || (_cache[1] = ($event) => {
          var _a;
          return (_a = _ctx.onOk) == null ? void 0 : _a.call(_ctx);
        }),
        onCancel: _cache[2] || (_cache[2] = ($event) => {
          var _a;
          return (_a = _ctx.onCancel) == null ? void 0 : _a.call(_ctx);
        }),
        onBeforeOpen: _cache[3] || (_cache[3] = ($event) => {
          var _a;
          return (_a = _ctx.onBeforeOpen) == null ? void 0 : _a.call(_ctx);
        }),
        onBeforeClose: _cache[4] || (_cache[4] = ($event) => {
          var _a;
          return (_a = _ctx.onBeforeClose) == null ? void 0 : _a.call(_ctx);
        }),
        onOpen: _cache[5] || (_cache[5] = ($event) => {
          var _a;
          return (_a = _ctx.onOpen) == null ? void 0 : _a.call(_ctx);
        }),
        onClose: handleClose
      }), {
        title: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(_ctx.title))))
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_151, [
            (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(_ctx.content))))
          ])
        ]),
        _: 1
      }, 16, ["visible"]);
    };
  }
});

// node_modules/yc-design-vue/es/Drawer/index.js
var container;
var open = (props) => {
  if (!container) {
    container = document.createElement("div");
    container.className = "yc-overlay yc-overlay-drawer";
    document.body.append(container);
  }
  const close = () => {
    render(null, container);
  };
  const update2 = (updateProps) => {
  };
  const vnode = h(_sfc_main101, {
    ...props,
    serviceClose: close
  });
  render(vnode, container);
  return {
    close,
    update: update2
  };
};
var Drawer = Object.assign(_Drawer, {
  install: (app) => {
    app.component("Yc" + _Drawer.name, _Drawer);
    app.config.globalProperties.$drawer = Object.assign(_Drawer, {
      open
    });
  }
});

// node_modules/yc-design-vue/es/Grid/hooks/useContext.js
var GRID_CONTEXT_KEY = "grid-context";
var useContext17 = () => {
  const provide$1 = (props) => {
    const {
      gutter: _gutter = ref(0),
      cols: _cols = ref(24),
      rowGap: _rowGap = ref(0),
      colGap: _colGap = ref(0),
      collapsed = ref(false),
      collapsedRows = ref(1),
      div = ref(false)
    } = toRefs(props);
    const spanMap = reactive(/* @__PURE__ */ new Map());
    const breakpoint = ref("xxl");
    const cols = computed(() => {
      return getBreakpointValue(breakpoint.value, _cols.value, 24);
    });
    const rowGap = computed(() => {
      return getBreakpointValue(breakpoint.value, _rowGap.value);
    });
    const colGap = computed(() => {
      return getBreakpointValue(breakpoint.value, _colGap.value, 0);
    });
    const gutter = computed(() => {
      const result = isArray(_gutter.value) ? _gutter.value.map(
        (v) => getBreakpointValue(breakpoint.value, v, 0)
      ) : [getBreakpointValue(breakpoint.value, _gutter.value, 0), 0];
      return result;
    });
    provide(GRID_CONTEXT_KEY, {
      breakpoint,
      gutter,
      div,
      spanMap,
      cols,
      colGap,
      collapsed,
      collapsedRows
    });
    return {
      breakpoint,
      cols,
      colGap,
      rowGap,
      gutter
    };
  };
  const inject$1 = () => {
    const injection = inject(GRID_CONTEXT_KEY, {
      gutter: ref([0, 0]),
      breakpoint: ref("xs"),
      div: ref(false),
      colGap: ref(0),
      cols: ref(24),
      collapsed: ref(false),
      collapsedRows: ref(1),
      spanMap: /* @__PURE__ */ new Map()
    });
    const { spanMap } = injection;
    const collectSpan = (span, suffix) => {
      const id = nanoid();
      watchEffect(() => {
        spanMap.set(id, {
          id,
          suffix: suffix.value,
          span: span.value
        });
      });
      onBeforeUnmount(() => {
        spanMap.delete(id);
      });
      return {
        id
      };
    };
    return {
      ...injection,
      collectSpan
    };
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Grid/GridCol.vue.js
var _sfc_main102 = defineComponent({
  ...{
    name: "Col"
  },
  __name: "GridCol",
  props: {
    span: { default: 24 },
    offset: { default: 0 },
    order: {},
    flex: {}
  },
  setup(__props) {
    const props = __props;
    const { span, order, offset, flex } = toRefs(props);
    const { gutter, div, breakpoint } = useContext17().inject();
    const style = computed(() => {
      return {
        width: `calc((100% / 24) * ${getBreakpointValue(breakpoint.value, span.value, 24)})`,
        padding: `${valueToPx(gutter.value[1] / 2)} ${valueToPx(gutter.value[0] / 2)}`,
        marginLeft: offset.value ? `calc((100% / 24) * ${getBreakpointValue(breakpoint.value, offset.value, 0)})` : "",
        order: getBreakpointValue(breakpoint.value, order.value),
        flex: getBreakpointValue(breakpoint.value, flex.value)
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          {
            "yc-col": !unref(div)
          }
        ]),
        style: normalizeStyle(style.value)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});

// node_modules/yc-design-vue/es/Grid/GridRow.vue2.js
var _sfc_main103 = defineComponent({
  ...{
    name: "Row"
  },
  __name: "GridRow",
  props: {
    gutter: { default: 0 },
    justify: { default: "start" },
    align: { default: "start" },
    div: { type: Boolean, default: false },
    wrap: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const { div, wrap, justify, align } = toRefs(props);
    const { breakpoint, gutter } = useContext17().provide(props);
    mediaQueryHandler((name) => {
      breakpoint.value = name;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          {
            "yc-row": !unref(div),
            "yc-row-wrap": unref(wrap) && !unref(div),
            [`yc-row-align-${unref(align)}`]: !unref(div),
            [`yc-row-justify-${unref(justify)}`]: !unref(div)
          }
        ]),
        style: normalizeStyle({
          margin: `0 ${unref(valueToPx)(-unref(gutter)[0] / 2)}`
        })
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 6);
    };
  }
});

// node_modules/yc-design-vue/es/Grid/GridRow.vue.js
var GridRow = _export_sfc(_sfc_main103, [["__scopeId", "data-v-94c99e78"]]);

// node_modules/yc-design-vue/es/Grid/Grid.vue2.js
var _sfc_main104 = defineComponent({
  ...{
    name: "Grid"
  },
  __name: "Grid",
  props: {
    cols: { default: 24 },
    rowGap: { default: 0 },
    colGap: { default: 0 },
    collapsed: { type: Boolean, default: false },
    collapsedRows: { default: 1 }
  },
  setup(__props) {
    const props = __props;
    const { breakpoint, cols, rowGap } = useContext17().provide(props);
    mediaQueryHandler((name) => {
      breakpoint.value = name;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "yc-grid",
        style: normalizeStyle({
          gap: `${unref(valueToPx)(unref(rowGap))} ${unref(valueToPx)(unref(rowGap))}`,
          gridTemplateColumns: `repeat(${unref(cols)}, minmax(0px, 1fr))`
        })
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4);
    };
  }
});

// node_modules/yc-design-vue/es/Grid/Grid.vue.js
var _Grid = _export_sfc(_sfc_main104, [["__scopeId", "data-v-8bbcc82b"]]);

// node_modules/yc-design-vue/es/Grid/GridItem.vue.js
var _sfc_main105 = defineComponent({
  ...{
    name: "GridItem"
  },
  __name: "GridItem",
  props: {
    span: { default: 1 },
    offset: { default: 0 },
    suffix: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { span: _span, offset: _offset, suffix } = toRefs(props);
    const {
      cols,
      colGap,
      collapsed,
      collapsedRows,
      spanMap,
      breakpoint,
      collectSpan
    } = useContext17().inject();
    const offset = computed(() => {
      return getBreakpointValue(breakpoint.value, _offset.value);
    });
    const span = computed(() => {
      const result = getBreakpointValue(breakpoint.value, _span.value) + offset.value;
      return result >= cols.value ? cols.value : result;
    });
    const style = computed(() => {
      const start2 = suffix.value ? cols.value - span.value + 1 : `span ${span.value}`;
      return {
        gridColumn: `${start2} / span ${span.value}`,
        marginLeft: offset.value ? `calc(${100 / span.value * offset.value}% + ${valueToPx(offset.value * colGap.value)})` : ""
      };
    });
    const { id } = collectSpan(span, suffix);
    const isOverflow = computed(() => {
      if (!collapsed.value) return false;
      const values = [...spanMap.values()];
      const totalSpan = cols.value * collapsedRows.value;
      const calcSpan = values.filter(({ suffix: suffix2 }) => !suffix2).reduce((pre, cur) => pre + cur.span, 0);
      return calcSpan > totalSpan;
    });
    const isCollapsed = computed(() => {
      if (!collapsed.value || suffix.value) return false;
      const values = [...spanMap.values()];
      const suffixSpan = values.filter(({ suffix: suffix2 }) => suffix2).reduce((pre, { span: span2 }) => pre + span2, 0);
      const totalSpan = cols.value * collapsedRows.value;
      const calcSpan = values.filter(({ suffix: suffix2 }) => !suffix2);
      let curSpan = 0;
      for (let { id: _id, span: span2 } of calcSpan) {
        curSpan += span2;
        if (_id == id) break;
      }
      return curSpan > totalSpan - suffixSpan;
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        class: "yc-grid-item",
        style: normalizeStyle(style.value)
      }, [
        renderSlot(_ctx.$slots, "default", { overflow: isOverflow.value })
      ], 4)), [
        [vShow, !isCollapsed.value]
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Grid/index.js
var Grid = Object.assign(_Grid, {
  col: _sfc_main102,
  row: GridRow,
  item: _sfc_main105,
  install: (app) => {
    app.component("Yc" + _Grid.name, _Grid);
    app.component("Yc" + _sfc_main105.name, _sfc_main105);
    app.component("Yc" + GridRow.name, GridRow);
    app.component("Yc" + _sfc_main102.name, _sfc_main102);
  }
});

// node_modules/yc-design-vue/es/Icon/index.vue2.js
var _hoisted_152 = ["xlinkHref"];
var _sfc_main106 = defineComponent({
  ...{
    name: "Icon"
  },
  __name: "index",
  props: {
    type: {},
    size: {},
    rotate: {},
    spin: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { size, rotate, spin: spin2 } = toRefs(props);
    const calcSize = (type) => {
      if (isUndefined(size.value)) {
        return "1em";
      } else if (Array.isArray(size.value)) {
        return valueToPx(size.value[type == "height" ? 1 : 0]);
      } else {
        return valueToPx(size.value);
      }
    };
    const style = computed(() => {
      return {
        width: calcSize("width"),
        height: calcSize("height"),
        transform: isUndefined(rotate.value) ? "" : `rotate(${rotate.value}deg)`,
        animation: spin2.value ? "animation: spin 1s infinite cubic-bezier(0, 0, 1, 1)" : ""
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        style: normalizeStyle(style.value),
        class: "yc-icon"
      }, [
        _ctx.type ? (openBlock(), createElementBlock("use", {
          key: 0,
          xlinkHref: `#${_ctx.type}`
        }, null, 8, _hoisted_152)) : renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
      ], 4);
    };
  }
});

// node_modules/yc-design-vue/es/Icon/index.vue.js
var _Icon = _export_sfc(_sfc_main106, [["__scopeId", "data-v-52e5518c"]]);

// node_modules/yc-design-vue/es/Icon/index.js
var Icon = Object.assign(_Icon, {
  install: (app) => {
    app.component("Yc" + _Icon.name, _Icon);
  },
  urlCache: /* @__PURE__ */ new Map(),
  addFromIconFontCn(options) {
    const { src, extraProps = {} } = options;
    if ((src == null ? void 0 : src.length) && !isServerRendering && !this.urlCache.has(src)) {
      const script = document.createElement("script");
      script.setAttribute("src", src);
      script.setAttribute("data-namespace", src);
      document.body.appendChild(script);
      this.urlCache.set(src, src);
    }
    return h(_Icon, {
      ...extraProps
    });
  }
});

// node_modules/yc-design-vue/es/Image/hooks/useContext.js
var IMAGE_CONTEXT_KEY = "image-context";
var useContext18 = () => {
  const provide$1 = (props, emits) => {
    const {
      srcList: _srcList,
      current,
      defaultCurrent,
      visible,
      defaultVisible
    } = toRefs(props);
    const slots = useSlots();
    const srcList = computed(() => {
      var _a;
      if (_srcList.value.length) return _srcList.value;
      if (!slots.default) return [];
      const images = findComponentsFromVnodes(
        ((_a = slots.default) == null ? void 0 : _a.call(slots)) || [],
        _Image.name
      );
      return images.map((image) => {
        var _a2;
        return (_a2 = image == null ? void 0 : image.props) == null ? void 0 : _a2.src;
      });
    });
    const computedCurrent = useControlValue(
      current,
      defaultCurrent.value,
      (val) => {
        emits("update:current", val);
        emits("change", val);
      }
    );
    const computedVisible = useControlValue(
      visible,
      defaultVisible.value,
      (val) => {
        emits("update:visible", val);
        emits("visible-change", val);
      }
    );
    const src = computed(() => srcList.value[computedCurrent.value]);
    const handleClick = (src2) => {
      const index2 = srcList.value.findIndex((item) => item == src2);
      computedCurrent.value = index2;
      computedVisible.value = true;
    };
    provide(IMAGE_CONTEXT_KEY, {
      hasGroupFather: ref(true),
      handleClick
    });
    return {
      src,
      srcList,
      computedCurrent,
      computedVisible
    };
  };
  const inject$1 = () => {
    return inject(IMAGE_CONTEXT_KEY, {
      hasGroupFather: ref(false),
      handleClick: () => {
      }
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/_shared/icons/IconFullScreen.vue2.js
var _sfc_main107 = defineComponent({
  __name: "IconFullScreen",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M42 17V9a1 1 0 0 0-1-1h-8M6 17V9a1 1 0 0 1 1-1h8m27 23v8a1 1 0 0 1-1 1h-8M6 31v8a1 1 0 0 0 1 1h8" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconOriginSize.vue2.js
var _sfc_main108 = defineComponent({
  __name: "IconOriginSize",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "m5.5 11.5 5-2.5h1v32M34 11.5 39 9h1v32" }, null, -1),
          createBaseVNode("path", {
            d: "M24 17h1v1h-1v-1ZM24 30h1v1h-1v-1Z",
            fill: "currentColor",
            stroke: "none"
          }, null, -1),
          createBaseVNode("path", { d: "M24 17h1v1h-1v-1ZM24 30h1v1h-1v-1Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconRotateLeft.vue2.js
var _sfc_main109 = defineComponent({
  __name: "IconRotateLeft",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M10 22a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1V22ZM23 11h11a6 6 0 0 1 6 6v6M22.5 12.893 19.587 11 22.5 9.107v3.786Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconRotateRight.vue2.js
var _sfc_main110 = defineComponent({
  __name: "IconRotateRight",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M38 22a1 1 0 0 0-1-1H17a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V22ZM25 11H14a6 6 0 0 0-6 6v6M25.5 12.893 28.413 11 25.5 9.107v3.786Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconZoomIn.vue2.js
var _sfc_main111 = defineComponent({
  __name: "IconZoomIn",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M32.607 32.607A14.953 14.953 0 0 0 37 22c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15 4.142 0 7.892-1.679 10.607-4.393Zm0 0L41.5 41.5M29 22H15m7 7V15" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconZoomOut.vue2.js
var _sfc_main112 = defineComponent({
  __name: "IconZoomOut",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M32.607 32.607A14.953 14.953 0 0 0 37 22c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15 4.142 0 7.892-1.679 10.607-4.393Zm0 0L41.5 41.5M29 22H15" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Tooltip/index.vue.js
var _sfc_main113 = defineComponent({
  ...{
    name: "Tooltip"
  },
  __name: "index",
  props: {
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    content: { default: "" },
    position: { default: "bottom" },
    mini: { type: Boolean, default: false },
    backgroundColor: { default: "rgb(29,33,41)" },
    contentClass: { default: "" },
    contentStyle: { default: () => {
      return {};
    } },
    arrowClass: { default: "" },
    arrowStyle: { default: () => {
      return {};
    } },
    popupContainer: { default: void 0 },
    triggerProps: { default: () => {
      return {};
    } }
  },
  emits: ["update:popupVisible", "popup-visible-change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      arrowStyle: _arrowStyle,
      contentStyle: _contentStyle,
      backgroundColor
    } = toRefs(props);
    const { popupVisible, defaultPopupVisible } = toRefs(props);
    const computedVisible = useControlValue(
      popupVisible,
      defaultPopupVisible.value,
      (val) => {
        emits("update:popupVisible", val);
        emits("popup-visible-change", val);
      }
    );
    const contentStyle = computed(() => {
      return {
        backgroundColor: backgroundColor.value,
        ..._contentStyle.value
      };
    });
    const arrowStyle = computed(() => {
      return {
        backgroundColor: backgroundColor.value,
        ..._arrowStyle.value
      };
    });
    __expose({
      show() {
        computedVisible.value = true;
      },
      hide() {
        computedVisible.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Trigger), mergeProps({
        "popup-visible": unref(computedVisible),
        "onUpdate:popupVisible": _cache[0] || (_cache[0] = ($event) => isRef(computedVisible) ? computedVisible.value = $event : null),
        "popup-container": _ctx.popupContainer,
        position: _ctx.position,
        "arrow-class": ["yc-tooltip-popup-arrow", _ctx.arrowClass],
        "arrow-style": contentStyle.value,
        "content-class": [
          "yc-tooltip-popup-content",
          _ctx.contentClass,
          {
            "yc-tooltip-mini": _ctx.mini
          }
        ],
        "content-style": arrowStyle.value,
        "popup-offset": 10,
        class: ["yc-tooltip", _ctx.$attrs.class],
        style: _ctx.$attrs.style,
        "animation-name": "zoom-in-fade-out",
        "need-transform-origin": "",
        "show-arrow": ""
      }, _ctx.triggerProps), {
        content: withCtx(() => [
          renderSlot(_ctx.$slots, "content", {}, () => [
            createTextVNode(toDisplayString(_ctx.content), 1)
          ])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["popup-visible", "popup-container", "position", "arrow-class", "arrow-style", "content-class", "content-style", "class", "style"]);
    };
  }
});

// node_modules/yc-design-vue/es/Tooltip/index.js
var Tooltip = Object.assign(_sfc_main113, {
  install: (app) => {
    app.component("Yc" + _sfc_main113.name, _sfc_main113);
  }
});

// node_modules/yc-design-vue/es/Image/ImagePreviewAction.vue2.js
var _hoisted_153 = { class: "yc-image-preview-toolbar-action-content" };
var _sfc_main114 = defineComponent({
  ...{
    name: "ImagePreviewAction"
  },
  __name: "ImagePreviewAction",
  props: {
    name: { default: "" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["click", "dblclick", "contextmenu"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const handleEvent = (type, ev) => {
      if (props.disabled) return;
      emits(type, ev);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Tooltip), {
        content: _ctx.name,
        disabled: !_ctx.name.length,
        position: "top"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass([
              "yc-image-preview-toolbar-action",
              {
                "yc-image-preview-toolbar-action-disabled": _ctx.disabled
              }
            ]),
            onClick: _cache[0] || (_cache[0] = ($event) => handleEvent("click", $event)),
            onDblclick: _cache[1] || (_cache[1] = ($event) => handleEvent("dblclick", $event)),
            onContextmenu: _cache[2] || (_cache[2] = ($event) => handleEvent("contextmenu", $event))
          }, [
            createBaseVNode("span", _hoisted_153, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ])
          ], 34)
        ]),
        _: 3
      }, 8, ["content", "disabled"]);
    };
  }
});

// node_modules/yc-design-vue/es/Image/ImagePreviewAction.vue.js
var ImagePreviewAction = _export_sfc(_sfc_main114, [["__scopeId", "data-v-d98ed90b"]]);

// node_modules/yc-design-vue/es/Image/ImagePreviewToolbar.vue2.js
var _hoisted_154 = {
  key: 0,
  class: "yc-image-preview-toolbar"
};
var _sfc_main115 = defineComponent({
  __name: "ImagePreviewToolbar",
  props: {
    actionsLayout: { default: () => [] }
  },
  emits: ["click"],
  setup(__props) {
    const actionMap = {
      fullScreen: {
        icon: _sfc_main107,
        name: "全屏"
      },
      rotateRight: {
        icon: _sfc_main110,
        name: "向右旋转"
      },
      rotateLeft: {
        icon: _sfc_main109,
        name: "向左旋转"
      },
      zoomIn: {
        icon: _sfc_main111,
        name: "放大"
      },
      zoomOut: {
        icon: _sfc_main112,
        name: "缩小"
      },
      originalSize: {
        icon: _sfc_main108,
        name: "还原"
      }
    };
    return (_ctx, _cache) => {
      return _ctx.actionsLayout.length ? (openBlock(), createElementBlock("div", _hoisted_154, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.actionsLayout, (action) => {
          return openBlock(), createElementBlock(Fragment, { key: action }, [
            actionMap[action] ? (openBlock(), createBlock(ImagePreviewAction, {
              key: 0,
              name: actionMap[action].name,
              onClick: (ev) => _ctx.$emit("click", action, ev)
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(actionMap[action].icon)))
              ]),
              _: 2
            }, 1032, ["name", "onClick"])) : createCommentVNode("", true)
          ], 64);
        }), 128)),
        renderSlot(_ctx.$slots, "actions", {}, void 0, true)
      ])) : createCommentVNode("", true);
    };
  }
});

// node_modules/yc-design-vue/es/Image/ImagePreviewToolbar.vue.js
var ImagePreviewToolbar = _export_sfc(_sfc_main115, [["__scopeId", "data-v-f838cc3a"]]);

// node_modules/yc-design-vue/es/Image/ImagePreview.vue2.js
var _hoisted_155 = { class: "yc-image-preview-mask" };
var _hoisted_235 = { class: "yc-image-preview-wrapper" };
var _hoisted_324 = ["src"];
var _sfc_main116 = defineComponent({
  ...{
    name: "ImagePreview",
    inheritAttrs: false
  },
  __name: "ImagePreview",
  props: {
    src: { default: "" },
    visible: { type: Boolean, default: void 0 },
    defaultVisible: { type: Boolean, default: false },
    maskClosable: { type: Boolean, default: true },
    closable: { type: Boolean, default: true },
    actionsLayout: { default: () => [
      "fullScreen",
      "rotateRight",
      "rotateLeft",
      "zoomIn",
      "zoomOut",
      "originalSize"
    ] },
    popupContainer: { default: void 0 },
    escToClose: { type: Boolean, default: true },
    wheelZoom: { type: Boolean, default: true },
    keyboard: { type: Boolean, default: true },
    defaultScale: { default: 1 },
    zoomRate: { default: 1.1 }
  },
  emits: ["update:visible", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      visible,
      defaultVisible,
      maskClosable,
      escToClose,
      defaultScale,
      zoomRate,
      wheelZoom,
      keyboard,
      popupContainer: _popupContainer
    } = toRefs(props);
    const { zIndex, popupContainer } = getGlobalConfig(props);
    console.log(popupContainer.value, "popupContainer");
    const imageRef = ref();
    const scale = useControlValue(ref(), defaultScale.value);
    const rotate = ref(0);
    const { outerVisible, innerVisible, handleClose, handleAfterLeave } = useModalClose({
      visible,
      defaultVisible,
      escToClose,
      maskClosable,
      onBeforeOk: () => true,
      onBeforeCancel: () => true,
      emits
    });
    const handleAction = (action) => {
      switch (action) {
        case "rotateRight":
          {
            rotate.value += 90;
          }
          break;
        case "rotateLeft":
          {
            rotate.value -= 90;
          }
          break;
        case "zoomIn":
          {
            scale.value *= zoomRate.value;
          }
          break;
        case "zoomOut":
          {
            scale.value /= zoomRate.value;
          }
          break;
        case "originalSize":
          {
            scale.value = defaultScale.value;
            rotate.value = 0;
          }
          break;
        case "fullScreen":
          {
            const { offsetWidth, offsetHeight } = imageRef.value;
            if (offsetWidth > offsetHeight) {
              scale.value = window.innerHeight / offsetHeight;
            } else {
              scale.value = window.innerHeight / offsetWidth;
            }
          }
          break;
      }
    };
    const intLisenter = () => {
      if (wheelZoom.value) {
        useEventListener("wheel", (e) => {
          e.preventDefault();
          const delta = e.deltaY < 0 ? 1 : -1;
          scale.value *= Math.pow(zoomRate.value, delta);
        });
      }
      if (keyboard.value) {
        const map = {
          ArrowUp: "zoomIn",
          ArrowDown: "zoomOut",
          " ": "originalSize"
        };
        onKeyStroke(["ArrowUp", "ArrowDown", " "], (e) => {
          handleAction(map[e.key]);
        });
      }
    };
    intLisenter();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: unref(popupContainer) }, [
        unref(outerVisible) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([
            "yc-image-preview",
            _ctx.$attrs.class,
            {
              "yc-image-preview-absolute": !unref(isUndefined)(unref(_popupContainer))
            }
          ]),
          style: normalizeStyle({
            zIndex: unref(zIndex),
            ..._ctx.$attrs.style ?? {}
          })
        }, [
          createVNode(Transition, { name: "fade" }, {
            default: withCtx(() => [
              withDirectives(createBaseVNode("div", _hoisted_155, null, 512), [
                [vShow, unref(innerVisible)]
              ])
            ]),
            _: 1
          }),
          createVNode(Transition, {
            name: "fade",
            onAfterLeave: unref(handleAfterLeave)
          }, {
            default: withCtx(() => [
              withDirectives(createBaseVNode("div", _hoisted_235, [
                createBaseVNode("div", {
                  style: normalizeStyle({
                    transform: `scale(${unref(scale)}, ${unref(scale)})`
                  }),
                  class: "yc-image-preview-img-container",
                  onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(handleClose)("mask", $event, false), ["self"]))
                }, [
                  createBaseVNode("img", {
                    src: _ctx.src,
                    style: normalizeStyle({
                      transform: `translate(-50%, -50%) rotate(${rotate.value}deg)`
                    }),
                    class: "yc-image-preview-img",
                    ref_key: "imageRef",
                    ref: imageRef
                  }, null, 12, _hoisted_324)
                ], 4),
                createVNode(ImagePreviewToolbar, {
                  actionsLayout: _ctx.actionsLayout,
                  onClick: handleAction
                }, createSlots({ _: 2 }, [
                  _ctx.$slots.actions ? {
                    name: "actions",
                    fn: withCtx(() => [
                      renderSlot(_ctx.$slots, "actions", {}, void 0, true)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["actionsLayout"]),
                renderSlot(_ctx.$slots, "arrow", {}, void 0, true),
                _ctx.closable ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "yc-image-preview-close-btn",
                  onClick: _cache[1] || (_cache[1] = ($event) => unref(handleClose)("closeBtn", $event))
                }, [
                  createVNode(unref(_sfc_main6))
                ])) : createCommentVNode("", true)
              ], 512), [
                [vShow, unref(innerVisible)]
              ])
            ]),
            _: 3
          }, 8, ["onAfterLeave"])
        ], 6)) : createCommentVNode("", true)
      ], 8, ["to"]);
    };
  }
});

// node_modules/yc-design-vue/es/Image/ImagePreview.vue.js
var ImagePreview = _export_sfc(_sfc_main116, [["__scopeId", "data-v-094a0de9"]]);

// node_modules/yc-design-vue/es/Image/Image.vue2.js
var _hoisted_156 = ["src", "title", "alt"];
var _hoisted_236 = {
  key: 1,
  class: "yc-image-overlay"
};
var _hoisted_325 = { class: "yc-image-loader" };
var _hoisted_415 = {
  key: 2,
  class: "yc-image-overlay"
};
var _hoisted_59 = { class: "yc-image-error" };
var _hoisted_64 = { class: "yc-image-error-icon" };
var _hoisted_73 = { class: "yc-image-error-alt" };
var _hoisted_83 = { class: "yc-image-footer-caption" };
var _hoisted_9 = ["title"];
var _hoisted_10 = ["title"];
var _hoisted_11 = {
  key: 0,
  class: "yc-image-footer-extra"
};
var _sfc_main117 = defineComponent({
  ...{
    name: "Image"
  },
  __name: "Image",
  props: {
    src: { default: "" },
    width: {},
    height: {},
    title: { default: "" },
    description: { default: "" },
    fit: {},
    alt: {},
    hideFooter: { type: [Boolean, String], default: false },
    footerPosition: { default: "inner" },
    showLoader: { type: Boolean, default: false },
    preview: { type: Boolean, default: true },
    previewVisible: { type: Boolean, default: void 0 },
    defaultPreviewVisible: { type: Boolean, default: false },
    previewProps: { default: () => {
      return {};
    } },
    footerClass: { default: "" }
  },
  emits: ["update:previewVisible", "preview-visible-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { src, preview, previewVisible, defaultPreviewVisible } = toRefs(props);
    const { hasGroupFather, handleClick: previewImage } = useContext18().inject();
    const computedVisible = useControlValue(
      previewVisible,
      defaultPreviewVisible.value,
      (val) => {
        emits("update:previewVisible", val);
        emits("preview-visible-change", val);
      }
    );
    const isError = ref(false);
    const loading = ref(false);
    const handleLoad = () => {
      loading.value = false;
      isError.value = false;
    };
    const handleError = () => {
      loading.value = false;
      isError.value = true;
    };
    const handleClick = () => {
      if (hasGroupFather.value) {
        return previewImage(src.value);
      }
      if (!preview.value) return;
      computedVisible.value = true;
    };
    watch(
      () => src.value,
      () => {
        loading.value = true;
        isError.value = false;
      },
      {
        immediate: true
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "yc-image",
        style: normalizeStyle({
          width: unref(valueToPx)(_ctx.width),
          height: unref(valueToPx)(_ctx.height)
        })
      }, [
        createBaseVNode("img", {
          src: unref(src),
          title: _ctx.title,
          alt: _ctx.alt ?? _ctx.description,
          style: normalizeStyle({
            width: unref(valueToPx)(_ctx.width),
            height: unref(valueToPx)(_ctx.height),
            objectFit: _ctx.fit
          }),
          class: "yc-image-img",
          onLoad: handleLoad,
          onError: handleError,
          onClick: handleClick
        }, null, 44, _hoisted_156),
        unref(preview) ? (openBlock(), createBlock(ImagePreview, mergeProps({
          key: 0,
          visible: unref(computedVisible),
          "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => isRef(computedVisible) ? computedVisible.value = $event : null),
          src: unref(src)
        }, _ctx.previewProps), createSlots({ _: 2 }, [
          _ctx.$slots["preview-actions"] ? {
            name: "actions",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "preview-actions", {}, void 0, true)
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["visible", "src"])) : createCommentVNode("", true),
        (_ctx.showLoader || _ctx.$slots.loader) && loading.value ? (openBlock(), createElementBlock("div", _hoisted_236, [
          createBaseVNode("div", _hoisted_325, [
            renderSlot(_ctx.$slots, "loader", {}, () => [
              createVNode(unref(Spin), {
                size: 30,
                tip: "加载中"
              })
            ], true)
          ])
        ])) : createCommentVNode("", true),
        isError.value ? (openBlock(), createElementBlock("div", _hoisted_415, [
          renderSlot(_ctx.$slots, "error", {}, () => [
            createBaseVNode("div", _hoisted_59, [
              renderSlot(_ctx.$slots, "error-icon", {}, () => [
                createBaseVNode("div", _hoisted_64, [
                  createVNode(unref(_sfc_main41), { size: 60 })
                ])
              ], true),
              createBaseVNode("div", _hoisted_73, toDisplayString(_ctx.alt ?? _ctx.description), 1)
            ])
          ], true)
        ])) : createCommentVNode("", true),
        !_ctx.hideFooter && (_ctx.title || _ctx.description || _ctx.$slots.extra) ? (openBlock(), createElementBlock("div", {
          key: 3,
          class: normalizeClass([
            "yc-image-footer",
            _ctx.footerPosition == "inner" ? "yc-image-footer-inner" : "yc-image-footer-outer",
            _ctx.footerClass
          ])
        }, [
          createBaseVNode("div", _hoisted_83, [
            createBaseVNode("div", {
              class: "yc-image-footer-caption-title",
              title: _ctx.title
            }, toDisplayString(_ctx.title), 9, _hoisted_9),
            createBaseVNode("div", {
              class: "yc-image-footer-caption-description",
              title: _ctx.description
            }, toDisplayString(_ctx.description), 9, _hoisted_10)
          ]),
          _ctx.$slots.extra ? (openBlock(), createElementBlock("div", _hoisted_11, [
            renderSlot(_ctx.$slots, "extra", {}, void 0, true)
          ])) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true)
      ], 4);
    };
  }
});

// node_modules/yc-design-vue/es/Image/Image.vue.js
var _Image = _export_sfc(_sfc_main117, [["__scopeId", "data-v-3884f319"]]);

// node_modules/yc-design-vue/es/Image/ImagePreviewArrow.vue2.js
var _sfc_main118 = defineComponent({
  __name: "ImagePreviewArrow",
  props: {
    type: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([`yc-image-preview-arrow-${_ctx.type}`])
      }, [
        createVNode(unref(_sfc_main57), {
          rotate: _ctx.type == "left" ? 180 : 0
        }, null, 8, ["rotate"])
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Image/ImagePreviewArrow.vue.js
var ImagePreviewArrow = _export_sfc(_sfc_main118, [["__scopeId", "data-v-761f4ccd"]]);

// node_modules/yc-design-vue/es/Image/ImagePreviewGroup.vue.js
var _hoisted_157 = { class: "yc-image-preview-arrow" };
var _sfc_main119 = defineComponent({
  ...{
    name: "ImagePreviewGroup",
    inheritAttrs: false
  },
  __name: "ImagePreviewGroup",
  props: {
    srcList: { default: () => [] },
    current: { default: void 0 },
    defaultCurrent: { default: 0 },
    infinite: { type: Boolean, default: false },
    visible: { type: Boolean, default: void 0 },
    defaultVisible: { type: Boolean, default: false },
    maskClosable: { type: Boolean, default: true },
    closable: { type: Boolean, default: true },
    actionsLayout: { default: () => [
      "fullScreen",
      "rotateRight",
      "rotateLeft",
      "zoomIn",
      "zoomOut",
      "originalSize"
    ] },
    popupContainer: { default: void 0 },
    escToClose: { type: Boolean, default: true },
    wheelZoom: { type: Boolean, default: true },
    keyboard: { type: Boolean, default: true },
    defaultScale: { default: 1 },
    zoomRate: { default: 1.1 }
  },
  emits: ["update:visible", "update:current", "change", "visible-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { srcList: _srcList, infinite, keyboard } = toRefs(props);
    const { src, srcList, computedCurrent, computedVisible } = useContext18().provide(
      props,
      emits
    );
    const handleCurrentChange = (type) => {
      let index2 = 0;
      if (!infinite.value && (type == "pre" && computedCurrent.value == 0 || type == "next" && computedCurrent.value == srcList.value.length - 1)) {
        return;
      }
      if (type == "pre") {
        index2 = computedCurrent.value - 1;
        index2 = index2 < 0 ? srcList.value.length - 1 : index2;
      } else {
        index2 = computedCurrent.value + 1;
        index2 = index2 == srcList.value.length ? 0 : index2;
      }
      computedCurrent.value = index2;
    };
    const intLisenter = () => {
      if (keyboard.value) {
        const map = {
          ArrowLeft: "pre",
          ArrowRight: "next"
        };
        onKeyStroke(["ArrowLeft", "ArrowRight"], (e) => {
          handleCurrentChange(map[e.key]);
        });
      }
    };
    intLisenter();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _ctx.$slots.default && !unref(_srcList).length ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true),
        createVNode(ImagePreview, mergeProps(props, {
          visible: unref(computedVisible),
          "onUpdate:visible": _cache[2] || (_cache[2] = ($event) => isRef(computedVisible) ? computedVisible.value = $event : null),
          src: unref(src),
          class: _ctx.$attrs.class,
          style: _ctx.$attrs.style
        }), createSlots({
          arrow: withCtx(() => [
            createBaseVNode("div", _hoisted_157, [
              createVNode(ImagePreviewArrow, {
                type: "left",
                onClick: _cache[0] || (_cache[0] = ($event) => handleCurrentChange("pre"))
              }),
              createVNode(ImagePreviewArrow, {
                type: "right",
                onClick: _cache[1] || (_cache[1] = ($event) => handleCurrentChange("next"))
              })
            ])
          ]),
          _: 2
        }, [
          _ctx.$slots.actions ? {
            name: "actions",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "actions")
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["visible", "src", "class", "style"])
      ], 64);
    };
  }
});

// node_modules/yc-design-vue/es/Image/index.js
var Image2 = Object.assign(_Image, {
  preview: ImagePreview,
  ["preview-group"]: _sfc_main119,
  action: ImagePreviewAction,
  install: (app) => {
    app.component("Yc" + _Image.name, _Image);
    app.component("Yc" + ImagePreview.name, ImagePreview);
    app.component("Yc" + _sfc_main119.name, _sfc_main119);
    app.component("Yc" + ImagePreviewAction.name, ImagePreviewAction);
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconDragDot.vue.js
var _sfc_main120 = defineComponent({
  __name: "IconDragDot",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", {
            fill: "currentColor",
            stroke: "none",
            d: "M40 17v2h-2v-2h2ZM25 17v2h-2v-2h2ZM10 17v2H8v-2h2ZM40 29v2h-2v-2h2ZM25 29v2h-2v-2h2ZM10 29v2H8v-2h2Z"
          }, null, -1),
          createBaseVNode("path", { d: "M40 17v2h-2v-2h2ZM25 17v2h-2v-2h2ZM10 17v2H8v-2h2ZM40 29v2h-2v-2h2ZM25 29v2h-2v-2h2ZM10 29v2H8v-2h2Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/ResizeBox/index.vue2.js
var _hoisted_158 = ["dir", "onMousedown"];
var _hoisted_237 = { class: "yc-resizebox-trigger-icon-wrapper" };
var _sfc_main121 = defineComponent({
  ...{
    name: "ResizeBox"
  },
  __name: "index",
  props: {
    width: { default: void 0 },
    height: { default: void 0 },
    component: { default: "div" },
    directions: { default: () => ["right"] }
  },
  emits: ["update:width", "update:height", "moving-start", "moving", "moving-end"],
  setup(__props, { emit: __emit }) {
    useSlots();
    const props = __props;
    const emits = __emit;
    const { width, height } = toRefs(props);
    const computedWidth = useControlValue(width, 0, (val) => {
      emits("update:width", val);
    });
    const computedHeight = useControlValue(height, 0, (val) => {
      emits("update:height", val);
    });
    const triggeDoms = reactive([]);
    const triggerSize = reactive({
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    });
    const boxRef = ref();
    const dragDirection = ref(null);
    const x = ref(0);
    const y = ref(0);
    let cursor;
    const handleMovingStart = (dir, e) => {
      e.preventDefault();
      dragDirection.value = dir;
      const { width: width2, height: height2 } = boxRef.value.getBoundingClientRect();
      const { clientX, clientY } = e;
      computedWidth.value = width2;
      computedHeight.value = height2;
      x.value = clientX;
      y.value = clientY;
      cursor = getComputedStyle(document.body).cursor;
      document.body.style.cursor = ["left", "right"].includes(dir) ? "col-resize" : "row-resize";
      emits("moving-start", e);
    };
    const handleMoving = async (e) => {
      if (!dragDirection.value || !boxRef.value) {
        return;
      }
      const { clientX, clientY } = e;
      const movementX = dragDirection.value == "left" ? x.value - clientX : clientX - x.value;
      const movementY = dragDirection.value == "top" ? y.value - clientY : clientY - y.value;
      const minWidth = triggerSize.left + triggerSize.right;
      const minHeight = triggerSize.top + triggerSize.bottom;
      x.value = clientX;
      y.value = clientY;
      if (["left", "right"].includes(dragDirection.value)) {
        computedWidth.value += movementX;
        computedWidth.value <= minWidth && (computedWidth.value = minWidth);
        boxRef.value.style.width = valueToPx(computedWidth.value);
      } else {
        computedHeight.value += movementY;
        computedHeight.value <= minHeight && (computedHeight.value = minHeight);
        boxRef.value.style.height = valueToPx(computedHeight.value);
      }
      const { width: width2, height: height2 } = boxRef.value.getBoundingClientRect();
      if (computedWidth.value != width2) {
        computedWidth.value = width2;
      }
      if (height2 != computedHeight.value) {
        computedHeight.value = height2;
      }
      emits(
        "moving",
        {
          width: width2,
          height: height2
        },
        e
      );
    };
    const handleMovingEnd = (e) => {
      if (!dragDirection.value) return;
      dragDirection.value = null;
      document.body.style.cursor = cursor;
      emits("moving-end", e);
    };
    useEventListener("mousemove", handleMoving);
    useEventListener("mouseup", handleMovingEnd);
    useResizeObserver(
      () => {
        return triggeDoms;
      },
      (entries) => {
        entries.forEach((item) => {
          const direction = item.target.getAttribute("dir");
          const {
            contentRect: { width: width2, height: height2 }
          } = item;
          triggerSize[direction] = ["right", "left"].includes(direction) ? width2 : height2;
        });
      },
      {
        box: "border-box"
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.component), {
        class: "yc-resizebox",
        ref_key: "boxRef",
        ref: boxRef
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.directions, (dir, i) => {
            return openBlock(), createElementBlock("div", {
              key: dir,
              class: normalizeClass([
                "yc-resizebox-trigger",
                `yc-resizebox-direction-${dir}`,
                `yc-resizebox-trigger-${["left", "right"].includes(dir) ? "vertical" : "horizontal"}`
              ]),
              dir,
              ref_for: true,
              ref: (el) => triggeDoms[i] = el,
              onMousedown: ($event) => handleMovingStart(dir, $event)
            }, [
              renderSlot(_ctx.$slots, "resize-trigger", { direction: dir }, () => [
                createBaseVNode("div", _hoisted_237, [
                  renderSlot(_ctx.$slots, "resize-trigger-icon", { direction: dir }, () => [
                    createVNode(unref(_sfc_main120), {
                      rotate: ["left", "right"].includes(dir) ? 90 : 0
                    }, null, 8, ["rotate"])
                  ], true)
                ])
              ], true)
            ], 42, _hoisted_158);
          }), 128))
        ]),
        _: 3
      }, 512);
    };
  }
});

// node_modules/yc-design-vue/es/ResizeBox/index.vue.js
var _ResizeBox = _export_sfc(_sfc_main121, [["__scopeId", "data-v-a9bac180"]]);

// node_modules/yc-design-vue/es/ResizeBox/index.js
var ResizeBox = Object.assign(_ResizeBox, {
  install: (app) => {
    app.component("Yc" + _ResizeBox.name, _ResizeBox);
  }
});

// node_modules/yc-design-vue/es/Layout/LayoutSider.vue2.js
var _sfc_main122 = defineComponent({
  ...{
    name: "LayoutSider"
  },
  __name: "LayoutSider",
  props: {
    theme: { default: "light" },
    collapsed: { type: Boolean, default: void 0 },
    defaultCollapsed: { type: Boolean, default: false },
    collapsible: { type: Boolean, default: false },
    width: { default: 200 },
    collapsedWidth: { default: 48 },
    reverseArrow: { type: Boolean, default: false },
    breakpoint: { default: void 0 },
    hideTrigger: { type: Boolean, default: false },
    resizeDirections: { default: () => {
      return [];
    } }
  },
  emits: ["update:collapsed", "collapse", "breakpoint"],
  setup(__props, { emit: __emit }) {
    useCssVars((_ctx) => ({
      "6d1005b6": computedWidth.value,
      "c8428e7a": collapsedWidth.value
    }));
    const props = __props;
    const emits = __emit;
    const {
      collapsed,
      defaultCollapsed,
      collapsible,
      breakpoint,
      hideTrigger,
      width: _width,
      collapsedWidth: _collapsedWidth
    } = toRefs(props);
    const asideWidth = ref(_width.value);
    const computedWidth = computed(() => valueToPx(asideWidth.value));
    const collapsedWidth = computed(() => valueToPx(_collapsedWidth.value));
    const computedCollapsed = useControlValue(
      collapsed,
      defaultCollapsed.value,
      (val) => {
        emits("update:collapsed", val);
      }
    );
    const showTrigger = computed(() => {
      return !hideTrigger.value && collapsible.value;
    });
    const handleCollapse = () => {
      if (!collapsible.value) return;
      const value = !computedCollapsed.value;
      computedCollapsed.value = value;
      asideWidth.value = value ? _collapsedWidth.value : _width.value;
      emits("collapse", value, "clickTrigger");
    };
    mediaQueryHandler((_, order, i) => {
      if (!collapsible.value || !breakpoint.value) return;
      const value = i <= order[breakpoint.value];
      computedCollapsed.value = value;
      asideWidth.value = value ? _collapsedWidth.value : _width.value;
      emits("collapse", value, "responsive");
      emits("breakpoint", value);
    });
    return (_ctx, _cache) => {
      return _ctx.resizeDirections.length ? (openBlock(), createBlock(unref(ResizeBox), {
        key: 0,
        width: asideWidth.value,
        "onUpdate:width": _cache[0] || (_cache[0] = ($event) => asideWidth.value = $event),
        directions: _ctx.resizeDirections,
        class: normalizeClass([
          "yc-layout-sider",
          `yc-layout-sider-${_ctx.theme}`,
          {
            "yc-layout-sider-has-trigger": showTrigger.value
          }
        ])
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true),
          showTrigger.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "yc-collapse-button",
            onClick: handleCollapse
          }, [
            renderSlot(_ctx.$slots, "trigger", { collapsed: unref(computedCollapsed) }, () => [
              createVNode(unref(_sfc_main57), {
                rotate: unref(computedCollapsed) && !_ctx.reverseArrow ? 0 : 180
              }, null, 8, ["rotate"])
            ], true)
          ])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["width", "directions", "class"])) : (openBlock(), createElementBlock("aside", {
        key: 1,
        class: normalizeClass([
          "yc-layout-sider",
          "yc-layout-sider-translation",
          `yc-layout-sider-${_ctx.theme}`,
          {
            "yc-layout-sider-collapsed": unref(computedCollapsed),
            "yc-layout-sider-has-trigger": showTrigger.value
          }
        ])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        showTrigger.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "yc-collapse-button",
          onClick: handleCollapse
        }, [
          renderSlot(_ctx.$slots, "trigger", { collapsed: unref(computedCollapsed) }, () => [
            createVNode(unref(_sfc_main57), {
              rotate: unref(computedCollapsed) && !_ctx.reverseArrow ? 0 : 180
            }, null, 8, ["rotate"])
          ], true)
        ])) : createCommentVNode("", true)
      ], 2));
    };
  }
});

// node_modules/yc-design-vue/es/Layout/LayoutSider.vue.js
var LayoutSider = _export_sfc(_sfc_main122, [["__scopeId", "data-v-9f5b46bd"]]);

// node_modules/yc-design-vue/es/Layout/Layout.vue2.js
var _sfc_main123 = defineComponent({
  ...{
    name: "Layout"
  },
  __name: "Layout",
  props: {
    hasSider: { type: Boolean, default: void 0 }
  },
  setup(__props) {
    const slots = useSlots();
    const props = __props;
    const { hasSider: _hasSider } = toRefs(props);
    const hasSider = computed(() => {
      var _a;
      if (!isUndefined(_hasSider.value)) return _hasSider.value;
      const sider = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).find(
        (item) => item.type.name == LayoutSider.name
      );
      return !!sider;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", {
        class: normalizeClass([
          "yc-layout",
          {
            "yc-layout-has-sider": hasSider.value
          }
        ])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Layout/Layout.vue.js
var _Layout = _export_sfc(_sfc_main123, [["__scopeId", "data-v-4f591662"]]);

// node_modules/yc-design-vue/es/Layout/LayoutHeader.vue2.js
var _hoisted_159 = { class: "yc-layout-header" };
var _sfc_main124 = defineComponent({
  ...{
    name: "LayoutHeader"
  },
  __name: "LayoutHeader",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("header", _hoisted_159, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Layout/LayoutHeader.vue.js
var LayoutHeader = _export_sfc(_sfc_main124, [["__scopeId", "data-v-4f033678"]]);

// node_modules/yc-design-vue/es/Layout/LayoutFooter.vue2.js
var _hoisted_160 = { class: "yc-layout-footer" };
var _sfc_main125 = defineComponent({
  ...{
    name: "LayoutFooter"
  },
  __name: "LayoutFooter",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("footer", _hoisted_160, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Layout/LayoutFooter.vue.js
var LayoutFooter = _export_sfc(_sfc_main125, [["__scopeId", "data-v-8265ae5d"]]);

// node_modules/yc-design-vue/es/Layout/LayoutContent.vue2.js
var _hoisted_161 = { class: "yc-layout-content" };
var _sfc_main126 = defineComponent({
  ...{
    name: "LayoutContent"
  },
  __name: "LayoutContent",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("main", _hoisted_161, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Layout/LayoutContent.vue.js
var LayoutContent = _export_sfc(_sfc_main126, [["__scopeId", "data-v-d0c9cd92"]]);

// node_modules/yc-design-vue/es/Layout/index.js
var Layout = Object.assign(_Layout, {
  content: LayoutContent,
  header: LayoutHeader,
  footer: LayoutFooter,
  sider: LayoutSider,
  install: (app) => {
    app.component("Yc" + _Layout.name, _Layout);
    app.component("Yc" + LayoutHeader.name, LayoutHeader);
    app.component("Yc" + LayoutFooter.name, LayoutFooter);
    app.component("Yc" + LayoutContent.name, LayoutContent);
    app.component("Yc" + LayoutSider.name, LayoutSider);
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconLink.vue.js
var _sfc_main127 = defineComponent({
  __name: "IconLink",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "m14.1 25.414-4.95 4.95a6 6 0 0 0 8.486 8.485l8.485-8.485a6 6 0 0 0 0-8.485m7.779.707 4.95-4.95a6 6 0 1 0-8.486-8.485l-8.485 8.485a6 6 0 0 0 0 8.485" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Link/index.vue2.js
var _hoisted_162 = ["href"];
var _hoisted_238 = {
  key: 0,
  class: "yc-link-icon"
};
var _sfc_main128 = defineComponent({
  ...{
    name: "Link"
  },
  __name: "index",
  props: {
    href: { default: "" },
    icon: { type: Boolean, default: false },
    status: { default: "normal" },
    hoverable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },
  emits: ["click", "dblclick", "contextmenu"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { disabled, loading, href } = toRefs(props);
    const resultHref = computed(() => {
      if (loading.value || disabled.value) return "javascript:void(0)";
      return href.value || "javascript:void(0)";
    });
    const handleEvent = (type, e) => {
      if (disabled.value || loading.value) return;
      emits(type, e);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("a", {
        href: resultHref.value,
        class: normalizeClass([
          "yc-link",
          `yc-link-status-${_ctx.status}`,
          {
            "yc-link-hoverable": _ctx.hoverable && !unref(disabled) && !unref(loading),
            "yc-link-loading": unref(loading),
            "yc-link-disabled": unref(disabled)
          }
        ]),
        onClick: _cache[0] || (_cache[0] = ($event) => handleEvent("click", $event)),
        onDblclick: _cache[1] || (_cache[1] = ($event) => handleEvent("dblclick", $event)),
        onContextmenu: _cache[2] || (_cache[2] = ($event) => handleEvent("contextmenu", $event))
      }, [
        _ctx.$slots.icon || _ctx.icon || unref(loading) ? (openBlock(), createElementBlock("span", _hoisted_238, [
          !unref(loading) ? renderSlot(_ctx.$slots, "icon", { key: 0 }, () => [
            _ctx.icon ? (openBlock(), createBlock(unref(_sfc_main127), { key: 0 })) : createCommentVNode("", true)
          ], true) : (openBlock(), createBlock(unref(Spin), {
            key: 1,
            "is-size-inherit": ""
          }))
        ])) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 42, _hoisted_162);
    };
  }
});

// node_modules/yc-design-vue/es/Link/index.vue.js
var _Link = _export_sfc(_sfc_main128, [["__scopeId", "data-v-b403d6b8"]]);

// node_modules/yc-design-vue/es/Link/index.js
var Link = Object.assign(_Link, {
  install: (app) => {
    app.component("Yc" + _Link.name, _Link);
  }
});

// node_modules/yc-design-vue/es/Pagination/hooks/useContext.js
var PAGINATION_CONTEXT_KEY = "pagination-context";
var useContext19 = () => {
  const provide$1 = (props, emits) => {
    const {
      disabled,
      current,
      defaultCurrent,
      pageSize,
      defaultPageSize,
      pageSizeOptions,
      pageItemStyle,
      activePageItemStyle,
      baseSize,
      bufferSize,
      autoAdjust,
      total: _total
    } = toRefs(props);
    const { size } = getGlobalConfig(props);
    const total = useControlValue(
      autoAdjust.value ? _total : ref(),
      autoAdjust.value ? 0 : _total.value
    );
    const pages = computed(() => {
      const value = Math.ceil(total.value / computedPageSize.value);
      return value <= 1 ? 1 : value;
    });
    const pagesArray = computed(() => {
      if (pages.value < baseSize.value) {
        return new Array(pages.value).fill(void 0).map((_, i) => i + 1);
      }
      const result = [];
      const showLeftMore = computedCurrent.value - bufferSize.value > 1;
      const showRightMore = computedCurrent.value + bufferSize.value < pages.value;
      let start2 = 0;
      if (showLeftMore) {
        start2 = showRightMore ? computedCurrent.value - bufferSize.value : pages.value - 2 * bufferSize.value;
      } else {
        start2 = 2;
      }
      let end = 0;
      if (showRightMore) {
        end = showLeftMore ? computedCurrent.value + bufferSize.value : 1 + 2 * bufferSize.value;
      } else {
        end = pages.value - 1;
      }
      result.push(1);
      if (showLeftMore) {
        result.push("more-left");
      }
      for (let i = start2; i <= end; i++) {
        result.push(i);
      }
      if (showRightMore) {
        result.push("more-right");
      }
      result.push(pages.value);
      return result;
    });
    const computedCurrent = useControlValue(
      current,
      defaultCurrent.value,
      (val) => {
        emits("update:current", val);
        emits("change", val);
      }
    );
    const computedPageSize = useControlValue(
      pageSize,
      defaultPageSize.value,
      (val) => {
        computedCurrent.value = 1;
        emits("update:pageSize", val);
        emits("page-size-change", val);
      }
    );
    const sizeOptions = computed(() => {
      return pageSizeOptions.value.map((item) => {
        return {
          label: `${item}条/页`,
          value: item
        };
      });
    });
    provide(PAGINATION_CONTEXT_KEY, {
      computedCurrent,
      computedPageSize,
      disabled,
      pageItemStyle,
      activePageItemStyle,
      pages,
      baseSize,
      bufferSize
    });
    return {
      total,
      size,
      pages,
      pagesArray,
      computedCurrent,
      computedPageSize,
      sizeOptions
    };
  };
  const inject$1 = () => {
    return inject(PAGINATION_CONTEXT_KEY, {
      computedCurrent: ref(1),
      computedPageSize: ref(10),
      disabled: ref(false),
      pageItemStyle: ref({}),
      activePageItemStyle: ref({}),
      pages: ref(0),
      baseSize: ref(6),
      bufferSize: ref(2)
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Pagination/PaginationItem.vue2.js
var _sfc_main129 = defineComponent({
  __name: "PaginationItem",
  props: {
    type: {},
    page: { default: 1 }
  },
  setup(__props) {
    const props = __props;
    const { type, page } = toRefs(props);
    const {
      computedCurrent,
      pages,
      pageItemStyle,
      activePageItemStyle,
      bufferSize,
      disabled: _disabled
    } = useContext19().inject();
    const active = computed(() => {
      return type.value == "item" ? computedCurrent.value == page.value : false;
    });
    const disabled = computed(() => {
      if (["item", "more-right", "more-left"].includes(type.value)) {
        return _disabled.value;
      } else if (type.value == "pre") {
        return computedCurrent.value <= 1;
      } else {
        return computedCurrent.value >= pages.value;
      }
    });
    const handleClick = () => {
      let i = 0;
      if (type.value == "item") {
        i = page.value;
      } else if (type.value == "pre") {
        i = computedCurrent.value - 1;
      } else if (type.value == "next") {
        i = computedCurrent.value + 1;
      } else {
        const addSize = 2 * bufferSize.value + 1;
        i = type.value == "more-left" ? computedCurrent.value - addSize : computedCurrent.value + addSize;
        i = type.value == "more-left" && i <= 1 ? 1 : i;
        i = type.value == "more-right" && i >= pages.value ? pages.value : i;
      }
      if (disabled.value || type.value == "item" && i == computedCurrent.value || type.value == "pre" && i < 1 || type.value == "next" && i > pages.value) {
        return;
      }
      computedCurrent.value = i;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", {
        class: normalizeClass([
          "yc-pagination-item",
          {
            "yc-pagination-item-disabled": disabled.value,
            "yc-pagination-item-active": active.value
          }
        ]),
        style: normalizeStyle({
          ...unref(pageItemStyle),
          ...active.value ? unref(activePageItemStyle) : {}
        }),
        onClick: handleClick
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          ["pre", "next"].includes(unref(type)) ? (openBlock(), createBlock(unref(_sfc_main57), {
            key: 0,
            rotate: unref(type) == "pre" ? 180 : 0
          }, null, 8, ["rotate"])) : unref(type).includes("more") ? (openBlock(), createBlock(unref(_sfc_main52), { key: 1 })) : createCommentVNode("", true)
        ], true)
      ], 6);
    };
  }
});

// node_modules/yc-design-vue/es/Pagination/PaginationItem.vue.js
var PaginationItem = _export_sfc(_sfc_main129, [["__scopeId", "data-v-8b8d9ae0"]]);

// node_modules/yc-design-vue/es/Pagination/Pagination.vue2.js
var _hoisted_163 = {
  key: 0,
  class: "yc-pagination-total"
};
var _hoisted_239 = {
  key: 1,
  class: "yc-pagination-jumper yc-pagination-jumper-simple"
};
var _hoisted_326 = { class: "yc-pagination-jumper-total-page" };
var _hoisted_416 = {
  key: 1,
  class: "yc-pagination-options"
};
var _hoisted_510 = {
  key: 2,
  class: "yc-pagination-jumper"
};
var _sfc_main130 = defineComponent({
  ...{
    name: "Pagination"
  },
  __name: "Pagination",
  props: {
    total: {},
    current: { default: void 0 },
    defaultCurrent: { default: 1 },
    pageSize: { default: void 0 },
    defaultPageSize: { default: 10 },
    disabled: { type: Boolean, default: false },
    hideOnSinglePage: { type: Boolean, default: false },
    simple: { type: Boolean, default: false },
    showTotal: { type: Boolean, default: false },
    showMore: { type: Boolean, default: false },
    showJumper: { type: Boolean, default: false },
    showPageSize: { type: Boolean, default: false },
    pageSizeOptions: { default: () => [10, 20, 30, 40, 50] },
    pageSizeProps: { default: () => {
      return {};
    } },
    size: { default: void 0 },
    pageItemStyle: { default: () => {
      return {};
    } },
    activePageItemStyle: { default: () => {
      return {};
    } },
    baseSize: { default: 6 },
    bufferSize: { default: 2 },
    autoAdjust: { type: Boolean, default: true }
  },
  emits: ["update:current", "update:pageSize", "change", "page-size-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      computedCurrent,
      pages,
      pagesArray,
      computedPageSize,
      size,
      total,
      sizeOptions
    } = useContext19().provide(props, emits);
    const tempCurrent = ref(computedCurrent.value);
    watch(
      () => computedCurrent.value,
      () => {
        if (tempCurrent.value == computedCurrent.value) return;
        tempCurrent.value = computedCurrent.value;
      }
    );
    const handleBlur = async (e) => {
      if (`${tempCurrent.value}`.length) {
        computedCurrent.value = tempCurrent.value;
      }
      await sleep(0);
      const target = e.target;
      if (+target.value != computedCurrent.value) {
        target.value = computedCurrent.value;
      }
    };
    return (_ctx, _cache) => {
      return !_ctx.hideOnSinglePage || _ctx.hideOnSinglePage && unref(pages) <= 1 ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["yc-pagination", `yc-pagination-size-${unref(size)}`])
      }, [
        _ctx.showTotal ? (openBlock(), createElementBlock("span", _hoisted_163, [
          renderSlot(_ctx.$slots, "total", { total: unref(total) }, () => [
            createTextVNode(" 共 " + toDisplayString(unref(total)) + " 条 ", 1)
          ], true)
        ])) : createCommentVNode("", true),
        createBaseVNode("ul", {
          class: normalizeClass([_ctx.simple ? "yc-pagination-simple" : "yc-pagination-list"])
        }, [
          createVNode(PaginationItem, {
            type: "pre",
            class: "yc-pagination-item-previous"
          }, {
            default: withCtx(() => [
              _ctx.$slots["page-item-step"] ? renderSlot(_ctx.$slots, "page-item-step", {
                key: 0,
                type: "previous"
              }, void 0, true) : createCommentVNode("", true)
            ]),
            _: 3
          }),
          !_ctx.simple ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(pagesArray), (i) => {
            return openBlock(), createBlock(PaginationItem, {
              type: unref(isNumber)(i) ? "item" : i,
              key: i,
              page: unref(isNumber)(i) ? i : -1
            }, {
              default: withCtx(() => [
                unref(isNumber)(i) ? renderSlot(_ctx.$slots, "page-item", {
                  key: 0,
                  page: i
                }, () => [
                  createTextVNode(toDisplayString(i), 1)
                ], true) : _ctx.$slots["page-item-ellipsis"] ? renderSlot(_ctx.$slots, "page-item-ellipsis", { key: 1 }, void 0, true) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["type", "page"]);
          }), 128)) : (openBlock(), createElementBlock("span", _hoisted_239, [
            createVNode(unref(InputNumber), {
              modelValue: unref(computedCurrent),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(computedCurrent) ? computedCurrent.value = $event : null),
              "hide-button": "",
              size: unref(size),
              disabled: _ctx.disabled
            }, null, 8, ["modelValue", "size", "disabled"]),
            _cache[4] || (_cache[4] = createBaseVNode("span", { class: "yc-pagination-jumper-separator" }, "/", -1)),
            createBaseVNode("span", _hoisted_326, toDisplayString(unref(pages)), 1)
          ])),
          _ctx.showMore && !_ctx.simple ? (openBlock(), createBlock(PaginationItem, {
            key: 2,
            type: "more-right",
            class: "'yc-pagination-item-ellipsis'"
          })) : createCommentVNode("", true),
          createVNode(PaginationItem, {
            type: "next",
            class: "yc-pagination-item-next"
          }, {
            default: withCtx(() => [
              _ctx.$slots["page-item-step"] ? renderSlot(_ctx.$slots, "page-item-step", {
                key: 0,
                type: "next"
              }, void 0, true) : createCommentVNode("", true)
            ]),
            _: 3
          })
        ], 2),
        _ctx.showPageSize ? (openBlock(), createElementBlock("span", _hoisted_416, [
          createVNode(unref(Select), mergeProps({
            modelValue: unref(computedPageSize),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(computedPageSize) ? computedPageSize.value = $event : null),
            options: unref(sizeOptions),
            size: unref(size)
          }, _ctx.pageSizeProps, { disabled: _ctx.disabled }), null, 16, ["modelValue", "options", "size", "disabled"])
        ])) : createCommentVNode("", true),
        _ctx.showJumper ? (openBlock(), createElementBlock("span", _hoisted_510, [
          _cache[5] || (_cache[5] = createBaseVNode("span", { class: "yc-pagination-jumper-text-goto" }, " 前往 ", -1)),
          createVNode(unref(InputNumber), {
            modelValue: tempCurrent.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => tempCurrent.value = $event),
            "hide-button": "",
            size: unref(size),
            disabled: _ctx.disabled,
            min: 1,
            max: unref(pages),
            onFocus: _cache[3] || (_cache[3] = ($event) => tempCurrent.value = unref(computedCurrent)),
            onBlur: handleBlur
          }, null, 8, ["modelValue", "size", "disabled", "max"])
        ])) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true);
    };
  }
});

// node_modules/yc-design-vue/es/Pagination/Pagination.vue.js
var _Pagination = _export_sfc(_sfc_main130, [["__scopeId", "data-v-2482f597"]]);

// node_modules/yc-design-vue/es/Pagination/index.js
var Pagination = Object.assign(_Pagination, {
  install: (app) => {
    app.component("Yc" + _Pagination.name, _Pagination);
  }
});

// node_modules/yc-design-vue/es/List/ListVirtual.vue.js
var _sfc_main131 = defineComponent({
  __name: "ListVirtual",
  props: {
    data: {},
    virtualListProps: {}
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const { data, virtualListProps } = toRefs(props);
    const { list, containerProps, wrapperProps } = useVirtualList(data, {
      itemHeight: ((_a = virtualListProps.value) == null ? void 0 : _a.itemHeight) || 40,
      overscan: ((_b = virtualListProps.value) == null ? void 0 : _b.buffer) || 10
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({ class: "yc-virtual-list" }, unref(containerProps)), [
        createBaseVNode("div", mergeProps({ class: "yc-list-content" }, unref(wrapperProps)), [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(list), ({ data: data2, index: i }) => {
            return renderSlot(_ctx.$slots, "item", {
              key: i,
              index: i,
              item: data2
            });
          }), 128))
        ], 16)
      ], 16);
    };
  }
});

// node_modules/yc-design-vue/es/List/ListItem.vue2.js
var _hoisted_164 = {
  role: "listitem",
  class: "yc-list-item"
};
var _hoisted_240 = { class: "yc-list-item-main" };
var _hoisted_327 = {
  key: 0,
  class: "yc-list-item-meta"
};
var _hoisted_417 = { class: "yc-list-item-content" };
var _hoisted_511 = {
  key: 1,
  class: "yc-list-item-action"
};
var _hoisted_65 = {
  key: 0,
  class: "yc-list-item-action"
};
var _hoisted_74 = {
  key: 1,
  class: "list-item-extra"
};
var _sfc_main132 = defineComponent({
  ...{
    name: "ListItem"
  },
  __name: "ListItem",
  props: {
    actionLayout: { default: "horizontal" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_164, [
        createBaseVNode("div", _hoisted_240, [
          _ctx.$slots.meta ? (openBlock(), createElementBlock("div", _hoisted_327, [
            renderSlot(_ctx.$slots, "meta", {}, void 0, true)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_417, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ]),
          _ctx.$slots.actions && _ctx.actionLayout == "vertical" ? (openBlock(), createElementBlock("div", _hoisted_511, [
            renderSlot(_ctx.$slots, "actions", {}, void 0, true)
          ])) : createCommentVNode("", true)
        ]),
        _ctx.$slots.actions && _ctx.actionLayout == "horizontal" ? (openBlock(), createElementBlock("div", _hoisted_65, [
          renderSlot(_ctx.$slots, "actions", {}, void 0, true)
        ])) : createCommentVNode("", true),
        _ctx.$slots.extra ? (openBlock(), createElementBlock("div", _hoisted_74, [
          renderSlot(_ctx.$slots, "extra", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/List/ListItem.vue.js
var ListItem = _export_sfc(_sfc_main132, [["__scopeId", "data-v-6f994902"]]);

// node_modules/yc-design-vue/es/List/List.vue2.js
var _hoisted_165 = { class: "yc-list-content-wrapper" };
var _hoisted_241 = {
  key: 0,
  class: "yc-list-header"
};
var _hoisted_328 = {
  key: 2,
  role: "list",
  class: "yc-list-content"
};
var _hoisted_418 = {
  key: 4,
  class: "yc-list-footer"
};
var _sfc_main133 = defineComponent({
  ...{
    name: "List"
  },
  __name: "List",
  props: {
    data: { default: () => [] },
    size: { default: void 0 },
    bordered: { type: Boolean, default: true },
    split: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    hoverable: { type: Boolean, default: false },
    paginationProps: { default: void 0 },
    gridProps: { default: void 0 },
    maxHeight: { default: void 0 },
    bottomOffset: { default: 0 },
    virtualListProps: { default: void 0 },
    scrollbar: { type: Boolean, default: true }
  },
  emits: ["scroll", "reach-bottom", "page-change", "page-size-change"],
  setup(__props, { emit: __emit }) {
    var _a, _b;
    const props = __props;
    const emits = __emit;
    const { data, paginationProps, virtualListProps, gridProps, bottomOffset } = toRefs(props);
    const { size, renderEmpty } = getGlobalConfig(props);
    const isBottomReached = ref(false);
    const realListRef = ref();
    const virtualListRef = ref();
    const isVirtualList = computed(() => {
      if (!virtualListProps.value || paginationProps.value || gridProps.value) {
        return false;
      }
      return virtualListProps.value.itemHeight && (!virtualListProps.value.threshold || virtualListProps.value.threshold > data.value.length);
    });
    const scrollRef = computed(
      () => {
        var _a2;
        return isVirtualList.value ? unrefElement(virtualListRef) : (_a2 = realListRef.value) == null ? void 0 : _a2.getScrollRef();
      }
    );
    useScrollReach({
      scrollRef,
      offset: {
        bottom: bottomOffset.value
      },
      onScroll: (e, arriveStauts) => {
        isBottomReached.value = arriveStauts.bottom;
        emits("scroll", e);
      },
      onReachBottom: (e) => {
        emits("reach-bottom", e);
      }
    });
    const current = computed(() => {
      var _a2;
      return (_a2 = paginationProps.value) == null ? void 0 : _a2.current;
    });
    const computedCurrent = useControlValue(
      current,
      ((_a = paginationProps.value) == null ? void 0 : _a.current) || 1,
      (val) => {
        emits("page-change", val);
      }
    );
    const pageSize = computed(() => {
      var _a2;
      return (_a2 = paginationProps.value) == null ? void 0 : _a2.pageSize;
    });
    const computedPageSize = useControlValue(
      pageSize,
      ((_b = paginationProps.value) == null ? void 0 : _b.defaultPageSize) || 10,
      (val) => {
        computedCurrent.value = 1;
        emits("page-change", val);
      }
    );
    const curList = computed(() => {
      if (!paginationProps.value) return data.value;
      return data.value.slice(
        (computedCurrent.value - 1) * computedPageSize.value,
        computedCurrent.value * computedPageSize.value
      );
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-list-wrapper",
          `yc-list-size-${unref(size)}`,
          {
            "yc-list-bordered": _ctx.bordered,
            "yc-list-hoverable": _ctx.hoverable,
            "yc-list-split": _ctx.split
          }
        ])
      }, [
        createVNode(unref(Spin), {
          loading: _ctx.loading,
          class: "yc-list-spin"
        }, {
          default: withCtx(() => {
            var _a2;
            return [
              createVNode(unref(Scrollbar), {
                scrollbar: _ctx.scrollbar,
                style: normalizeStyle({
                  maxHeight: isVirtualList.value ? "" : unref(valueToPx)(_ctx.maxHeight)
                }),
                class: "yc-list",
                ref_key: "realListRef",
                ref: realListRef
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_165, [
                    _ctx.$slots.header ? (openBlock(), createElementBlock("div", _hoisted_241, [
                      renderSlot(_ctx.$slots, "header", {}, void 0, true)
                    ])) : createCommentVNode("", true),
                    isVirtualList.value ? (openBlock(), createBlock(_sfc_main131, {
                      key: 1,
                      data: unref(data),
                      "virtual-list-props": unref(virtualListProps),
                      style: normalizeStyle({
                        maxHeight: unref(valueToPx)(_ctx.maxHeight)
                      }),
                      ref_key: "virtualListRef",
                      ref: virtualListRef
                    }, createSlots({ _: 2 }, [
                      _ctx.$slots.item ? {
                        name: "item",
                        fn: withCtx((scope) => [
                          renderSlot(_ctx.$slots, "item", normalizeProps(guardReactiveProps(scope)), void 0, true)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1032, ["data", "virtual-list-props", "style"])) : (openBlock(), createElementBlock("div", _hoisted_328, [
                      renderSlot(_ctx.$slots, "default", {}, void 0, true),
                      unref(gridProps) ? (openBlock(), createBlock(unref(Grid), normalizeProps(mergeProps({ key: 0 }, unref(gridProps))), {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(curList.value, (item, i) => {
                            return openBlock(), createBlock(unref(_sfc_main105), { key: i }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "item", {
                                  index: i,
                                  item
                                }, void 0, true)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 3
                      }, 16)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(curList.value, (item, i) => {
                        return renderSlot(_ctx.$slots, "item", {
                          key: i,
                          index: i,
                          item
                        }, void 0, true);
                      }), 128))
                    ])),
                    !_ctx.$slots.default && !curList.value.length ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.empty || unref(renderEmpty)("List")), { key: 3 })) : createCommentVNode("", true),
                    _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_418, [
                      renderSlot(_ctx.$slots, "footer", {}, void 0, true)
                    ])) : createCommentVNode("", true),
                    _ctx.$slots["scroll-loading"] && isBottomReached.value ? (openBlock(), createBlock(ListItem, {
                      key: 5,
                      class: "yc-list-scroll-loading"
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "scroll-loading", {}, void 0, true)
                      ]),
                      _: 3
                    })) : createCommentVNode("", true)
                  ])
                ]),
                _: 3
              }, 8, ["scrollbar", "style"]),
              unref(paginationProps) ? (openBlock(), createBlock(unref(Pagination), {
                key: 0,
                current: unref(computedCurrent),
                "onUpdate:current": _cache[0] || (_cache[0] = ($event) => isRef(computedCurrent) ? computedCurrent.value = $event : null),
                "page-size": unref(computedPageSize),
                "onUpdate:pageSize": _cache[1] || (_cache[1] = ($event) => isRef(computedPageSize) ? computedPageSize.value = $event : null),
                total: ((_a2 = unref(paginationProps)) == null ? void 0 : _a2.total) || 0
              }, null, 8, ["current", "page-size", "total"])) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["loading"])
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/List/List.vue.js
var _List = _export_sfc(_sfc_main133, [["__scopeId", "data-v-e85a4d7e"]]);

// node_modules/yc-design-vue/es/List/ListItemMeta.vue2.js
var _hoisted_166 = { class: "yc-list-item-meta" };
var _hoisted_242 = {
  key: 0,
  class: "yc-list-item-meta-avatar"
};
var _hoisted_329 = { class: "yc-list-item-meta-content" };
var _hoisted_419 = {
  key: 0,
  class: "yc-list-item-meta-title"
};
var _hoisted_512 = {
  key: 1,
  class: "yc-list-item-meta-description"
};
var _sfc_main134 = defineComponent({
  ...{
    name: "ListItemMeta"
  },
  __name: "ListItemMeta",
  props: {
    title: { default: "" },
    description: { default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_166, [
        _ctx.$slots.avatar ? (openBlock(), createElementBlock("div", _hoisted_242, [
          renderSlot(_ctx.$slots, "avatar", {}, void 0, true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_329, [
          _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_419, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ], true)
          ])) : createCommentVNode("", true),
          _ctx.$slots.description || _ctx.description ? (openBlock(), createElementBlock("div", _hoisted_512, [
            renderSlot(_ctx.$slots, "description", {}, () => [
              createTextVNode(toDisplayString(_ctx.description), 1)
            ], true)
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/List/ListItemMeta.vue.js
var ListItemMeta = _export_sfc(_sfc_main134, [["__scopeId", "data-v-da1091ab"]]);

// node_modules/yc-design-vue/es/List/index.js
var List = Object.assign(_List, {
  item: ListItem,
  ["item-meta"]: ListItemMeta,
  install: (app) => {
    app.component("Yc" + _List.name, _List);
    app.component("Yc" + ListItem.name, ListItem);
    app.component("Yc" + ListItemMeta.name, ListItemMeta);
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconMenuFold.vue.js
var _sfc_main135 = defineComponent({
  __name: "IconMenuFold",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M42 11H6M42 24H22M42 37H6M13.66 26.912l-4.82-3.118 4.82-3.118v6.236Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconMenuUnfold.vue.js
var _sfc_main136 = defineComponent({
  __name: "IconMenuUnfold",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M6 11h36M22 24h20M6 37h36M8 20.882 12.819 24 8 27.118v-6.236Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Menu/MenuPopOption.vue.js
var _sfc_main137 = defineComponent({
  ...{
    name: "PopOption"
  },
  __name: "MenuPopOption",
  props: {
    treeNode: {},
    popupMaxHeight: {},
    triggerProps: {},
    computedSelectedKeys: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_pop_option = resolveComponent("pop-option");
      return _ctx.treeNode.type == "menuitem" ? (openBlock(), createBlock(unref(Doption), {
        key: 0,
        value: _ctx.treeNode.path,
        "is-active": _ctx.computedSelectedKeys == _ctx.treeNode.path
      }, {
        default: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent(_ctx.treeNode.label)))
        ]),
        _: 1
      }, 8, ["value", "is-active"])) : (openBlock(), createBlock(unref(Dsubmenu), {
        key: 1,
        "popup-max-height": _ctx.popupMaxHeight,
        "trigger-props": {
          popupTranslate: [-4, 0],
          ..._ctx.triggerProps
        }
      }, {
        content: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.treeNode.children, (v) => {
            return openBlock(), createBlock(_component_pop_option, {
              key: v.path,
              "tree-node": v,
              popupMaxHeight: _ctx.popupMaxHeight,
              triggerProps: _ctx.triggerProps,
              computedSelectedKeys: _ctx.computedSelectedKeys
            }, null, 8, ["tree-node", "popupMaxHeight", "triggerProps", "computedSelectedKeys"]);
          }), 128))
        ]),
        default: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent(_ctx.treeNode.label)))
        ]),
        _: 1
      }, 8, ["popup-max-height", "trigger-props"]));
    };
  }
});

// node_modules/yc-design-vue/es/Menu/MenuItem.vue2.js
var _hoisted_167 = {
  key: 1,
  class: "yc-menu-icon"
};
var _hoisted_243 = {
  key: 2,
  class: "yc-menu-icon-suffix"
};
var _sfc_main138 = defineComponent({
  ...{
    name: "MenuItem"
  },
  __name: "MenuItem",
  props: {
    path: { default: "" },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { path, disabled } = toRefs(props);
    const { reuse: ReuseTemplate, define: DefineTemplate } = createReusableTemplate();
    const attrs = useAttrs();
    const {
      computedSelectedKeys,
      computedOpenKeys,
      computedCollapsed,
      levelIndent,
      mode,
      theme,
      autoOpen,
      autoOpenSelected,
      accordion,
      triggerProps,
      tooltipProps,
      autoScrollIntoView,
      scrollConfig,
      popupMaxHeight: _popupMaxHeight,
      menuTreeNodes,
      menuTree,
      max,
      menuItemWidths,
      emits
    } = useContext20().inject();
    const curNode = computed(() => {
      const node = menuTreeNodes.value.find(
        (item) => item.path == path.value
      ) || { type: "menuitem", level: 0 };
      return node;
    });
    const curIndex = computed(() => {
      return menuTree.value.findIndex((item) => item.path == path.value);
    });
    const submenus = computed(() => {
      var _a;
      return ((_a = menuTree.value[curIndex.value]) == null ? void 0 : _a.children) || [];
    });
    const isSubmenu = computed(() => {
      return curNode.value.type == "submenu";
    });
    const isRoot = computed(() => {
      return curNode.value.level === 0;
    });
    const isSelected = computed(() => {
      return isMenuItemActive(
        menuTree.value,
        path.value,
        computedSelectedKeys.value
      );
    });
    const popupMaxHeight = computed(() => {
      return !isUndefined(attrs.popupMaxHeight) ? getPopupMaxHeight(attrs.popupMaxHeight) : _popupMaxHeight.value;
    });
    const menuItemRef = ref();
    const handleSelect = (value) => {
      if (computedSelectedKeys.value == value) return;
      computedSelectedKeys.value = value;
      emits("menu-item-click", value);
    };
    const handleClick = () => {
      if (mode.value != "vertical" && isSubmenu.value || computedCollapsed.value) {
        return;
      }
      if (!isSubmenu.value && !disabled.value && computedSelectedKeys.value != path.value) {
        computedSelectedKeys.value = path.value;
        return emits("menu-item-click", path.value);
      }
      if (computedOpenKeys.value.includes(path.value)) {
        computedOpenKeys.value = computedOpenKeys.value.filter(
          (item) => item != path.value
        );
      } else {
        computedOpenKeys.value = accordion.value ? [path.value] : [...computedOpenKeys.value, path.value];
      }
      emits("sub-menu-click", path.value, computedOpenKeys.value);
    };
    onMounted(() => {
      var _a;
      if (isRoot.value) {
        menuItemWidths.value[curIndex.value] = menuItemRef.value.offsetWidth;
      }
      if (autoScrollIntoView.value && computedSelectedKeys.value == path.value) {
        (_a = menuItemRef.value) == null ? void 0 : _a.scrollIntoView(scrollConfig.value);
      }
      if (!isSubmenu.value || !autoOpen.value || !autoOpenSelected.value || !isSelected.value) {
        return;
      }
      computedOpenKeys.value.push(path.value);
    });
    return (_ctx, _cache) => {
      return curIndex.value < unref(max) ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass([
          "yc-menu-item-wrapper",
          {
            "yc-menu-item-mode-horizontal": unref(mode) == "horizontal"
          }
        ])
      }, [
        createVNode(unref(DefineTemplate), null, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: normalizeClass([
                "yc-menu-item",
                `yc-menu-item-theme-${unref(theme)}`,
                {
                  "yc-menu-item-selected": isSelected.value,
                  "yc-menu-item-disabled": unref(disabled),
                  "yc-menu-item-collapsed": unref(computedCollapsed)
                }
              ]),
              ref_key: "menuItemRef",
              ref: menuItemRef,
              onClick: handleClick
            }, [
              !isRoot.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "yc-menu-indent",
                style: normalizeStyle({
                  width: unref(valueToPx)(unref(levelIndent) * curNode.value.level),
                  height: unref(valueToPx)(unref(levelIndent))
                })
              }, null, 4)) : createCommentVNode("", true),
              _ctx.$slots.icon ? (openBlock(), createElementBlock("div", _hoisted_167, [
                renderSlot(_ctx.$slots, "icon", {}, void 0, true)
              ])) : createCommentVNode("", true),
              withDirectives(createBaseVNode("div", {
                class: normalizeClass([
                  "yc-menu-item-title",
                  {
                    "text-ellipsis": unref(mode) != "horizontal"
                  }
                ])
              }, [
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ], 2), [
                [vShow, !unref(computedCollapsed)]
              ]),
              _ctx.$slots.suffix ? withDirectives((openBlock(), createElementBlock("div", _hoisted_243, [
                renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
              ], 512)), [
                [vShow, !unref(computedCollapsed)]
              ]) : createCommentVNode("", true)
            ], 2)
          ]),
          _: 3
        }),
        isSubmenu.value && isRoot.value && (unref(mode) != "vertical" || unref(computedCollapsed)) ? (openBlock(), createBlock(unref(Dropdown), {
          key: 0,
          "popup-max-height": popupMaxHeight.value,
          theme: unref(theme),
          "trigger-props": {
            autoFitPosition: false,
            position: unref(mode) == "horizontal" ? "bl" : "rt",
            animationName: unref(mode) == "horizontal" ? "slide-dynamic-origin" : "zoom-in-fade-out",
            popupOffset: unref(mode) == "vertical" ? 14 : 20,
            showArrow: true,
            ...unref(triggerProps)
          },
          onSelect: handleSelect
        }, {
          content: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(submenus.value, (node) => {
              return openBlock(), createBlock(_sfc_main137, {
                key: node.path,
                "tree-node": node,
                "popup-max-height": popupMaxHeight.value,
                "trigger-props": unref(triggerProps),
                "computed-selected-keys": unref(computedSelectedKeys)
              }, null, 8, ["tree-node", "popup-max-height", "trigger-props", "computed-selected-keys"]);
            }), 128))
          ]),
          default: withCtx(() => [
            createVNode(unref(ReuseTemplate))
          ]),
          _: 1
        }, 8, ["popup-max-height", "theme", "trigger-props"])) : !isSubmenu.value && isRoot.value && unref(computedCollapsed) ? (openBlock(), createBlock(unref(Tooltip), {
          key: 1,
          position: "rt",
          "trigger-props": {
            autoFitPosition: false,
            popupOffset: unref(mode) == "vertical" ? 14 : 18,
            showArrow: true,
            ...unref(tooltipProps),
            ...unref(triggerProps)
          }
        }, {
          content: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.default)))
          ]),
          default: withCtx(() => [
            createVNode(unref(ReuseTemplate))
          ]),
          _: 1
        }, 8, ["trigger-props"])) : (openBlock(), createBlock(unref(ReuseTemplate), { key: 2 }))
      ], 2)) : createCommentVNode("", true);
    };
  }
});

// node_modules/yc-design-vue/es/Menu/MenuItem.vue.js
var MenuItem = _export_sfc(_sfc_main138, [["__scopeId", "data-v-d9b48b7e"]]);

// node_modules/yc-design-vue/es/Menu/SubMenu.vue2.js
var _hoisted_168 = { class: "yc-menu-inline" };
var _hoisted_244 = { class: "yc-menu-inline-content" };
var _sfc_main139 = defineComponent({
  ...{
    name: "SubMenu"
  },
  __name: "SubMenu",
  props: {
    path: { default: "" },
    title: { default: "" },
    selectable: { type: Boolean, default: false },
    popup: { type: Boolean, default: false },
    popupMaxHeight: { type: [Boolean, Number], default: void 0 }
  },
  setup(__props) {
    const { mode, computedOpenKeys, computedCollapsed } = useContext20().inject();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_168, [
        createVNode(unref(MenuItem), {
          "is-submenu": "",
          path: _ctx.path,
          popupMaxHeight: _ctx.popupMaxHeight,
          class: "yc-menu-inline-header"
        }, createSlots({
          suffix: withCtx(() => [
            renderSlot(_ctx.$slots, "expand-icon-down", {}, () => [
              createVNode(unref(_sfc_main17), {
                rotate: unref(computedOpenKeys).includes(_ctx.path) ? 180 : 0
              }, null, 8, ["rotate"])
            ], true)
          ]),
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ], true)
          ]),
          _: 2
        }, [
          _ctx.$slots.icon ? {
            name: "icon",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "icon", {}, void 0, true)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["path", "popupMaxHeight"]),
        createVNode(unref(ExpandTransition), null, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", _hoisted_244, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 512), [
              [
                vShow,
                unref(mode) == "vertical" && !unref(computedCollapsed) && unref(computedOpenKeys).includes(_ctx.path)
              ]
            ])
          ]),
          _: 3
        })
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Menu/SubMenu.vue.js
var SubMenu = _export_sfc(_sfc_main139, [["__scopeId", "data-v-7482bc3e"]]);

// node_modules/yc-design-vue/es/Menu/hooks/useContext.js
var MENU_CONTEXT_KEY = "menu-context";
function FlattenMenuTree(vnodes, componentName) {
  const result = [];
  const traverse = (nodes, parentId = null, depth = 0) => {
    var _a, _b, _c;
    if (!nodes) return;
    const nodeList = Array.isArray(nodes) ? nodes : [nodes];
    for (const node of nodeList) {
      if (!isVNode(node)) continue;
      const id = nanoid(8);
      const name = (_a = node.type) == null ? void 0 : _a.name;
      const isSubMenu = name === SubMenu.name;
      const props = node.props;
      const children = node.children;
      const subTree = (_b = node.component) == null ? void 0 : _b.subTree;
      const childParentId = isSubMenu ? id : parentId;
      const childDepth = isSubMenu ? depth + 1 : depth;
      if (componentName.includes(name)) {
        result.push({
          id,
          type: isSubMenu ? "submenu" : "menuitem",
          label: () => {
            var _a2, _b2;
            if (isSubMenu) {
              return ((_a2 = children.title) == null ? void 0 : _a2.call(children)) || props.title;
            } else {
              return (_b2 = children.default) == null ? void 0 : _b2.call(children);
            }
          },
          path: props.path,
          parentId,
          level: depth
        });
      }
      if (subTree) {
        traverse(subTree);
      } else if (Array.isArray(children)) {
        traverse(children, childParentId, childDepth);
      } else if (isObject2(children)) {
        for (const key of Object.keys(children)) {
          if (!isFunction(children[key])) continue;
          traverse(((_c = children[key]) == null ? void 0 : _c.call(children)) || [], childParentId, childDepth);
        }
      }
    }
  };
  traverse(vnodes);
  return result;
}
function buildMenuTree(flatData) {
  const nodeMap = /* @__PURE__ */ new Map();
  const tree = [];
  flatData.forEach((node) => {
    nodeMap.set(node.id, { ...node, children: [] });
  });
  nodeMap.forEach((node) => {
    if (node.parentId === null) {
      tree.push(node);
    } else {
      const parent = nodeMap.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  });
  return tree;
}
function isMenuItemActive(menuTree, currentPath, activePath) {
  if (currentPath === activePath) {
    return true;
  }
  const findNode = (nodes, path) => {
    for (const node of nodes) {
      if (node.path === path) return node;
      if (node.children && node.children.length > 0) {
        const found = findNode(node.children, path);
        if (found) return found;
      }
    }
    return null;
  };
  const currentNode = findNode(menuTree, currentPath);
  if (!currentNode) return false;
  const checkSubtree = (node, targetPath) => {
    if (node.path === targetPath) return true;
    if (node.children) {
      return node.children.some(
        (child) => checkSubtree(child, targetPath)
      );
    }
    return false;
  };
  return checkSubtree(currentNode, activePath);
}
var getPopupMaxHeight = (popupMaxHeight) => {
  if (isUndefined(popupMaxHeight) || isBoolean(popupMaxHeight) && popupMaxHeight) {
    return 167;
  }
  if (isNumber(popupMaxHeight)) {
    return popupMaxHeight;
  }
};
var useContext20 = () => {
  const provide$1 = (props, emits, menuRef) => {
    const {
      selectedKeys,
      defaultSelectedKeys,
      openKeys,
      defaultOpenKeys,
      levelIndent,
      collapsed,
      defaultCollapsed,
      breakpoint,
      accordion,
      autoOpen,
      triggerProps,
      tooltipProps,
      autoOpenSelected,
      mode,
      theme,
      autoScrollIntoView,
      scrollConfig,
      collapsedWidth,
      popupMaxHeight: _popupMaxHeight
    } = toRefs(props);
    const computedSelectedKeys = useControlValue(
      selectedKeys,
      defaultSelectedKeys.value,
      (val) => {
        emits("update:selectedKeys", val);
      }
    );
    const computedCollapsed = useControlValue(
      collapsed,
      defaultCollapsed.value,
      (val) => {
        {
          computedOpenKeys.value = [];
        }
        emits("update:collapsed", val);
      }
    );
    const computedOpenKeys = useControlValue(
      openKeys,
      defaultOpenKeys.value,
      (val) => {
        emits("update:openKeys", val);
      }
    );
    const popupMaxHeight = computed(() => {
      return getPopupMaxHeight(_popupMaxHeight.value);
    });
    const slots = useSlots();
    const menuTreeNodes = computed(() => {
      var _a;
      return FlattenMenuTree(((_a = slots.default) == null ? void 0 : _a.call(slots)) || [], [
        SubMenu.name,
        MenuItem.name
      ]);
    });
    const menuItemWidths = ref([]);
    const menuTree = computed(() => buildMenuTree(menuTreeNodes.value));
    const max = ref(1e6);
    if (mode.value == "horizontal") {
      useResizeObserver(
        menuRef,
        throttle(() => {
          const menuWidth = menuRef.value.offsetWidth - 52;
          let maxCount = 0;
          let totalWidth = 0;
          for (let i = 0; i < menuTree.value.length; i++) {
            const gap = i > 0 ? 4 : 0;
            const curWidth = totalWidth + gap + menuItemWidths.value[i];
            if (curWidth > menuWidth) {
              break;
            }
            totalWidth = curWidth;
            maxCount++;
          }
          max.value = maxCount;
        }, 200)
      );
    }
    provide(MENU_CONTEXT_KEY, {
      computedSelectedKeys,
      computedOpenKeys,
      computedCollapsed,
      levelIndent,
      accordion,
      autoOpen,
      triggerProps,
      tooltipProps,
      mode,
      autoOpenSelected,
      popupMaxHeight,
      autoScrollIntoView,
      scrollConfig,
      theme,
      menuTreeNodes,
      menuTree,
      max,
      menuItemWidths,
      emits
    });
    return {
      computedCollapsed,
      breakpoint,
      collapsedWidth: computed(() => valueToPx(collapsedWidth.value)),
      menuTree,
      max
    };
  };
  const inject$1 = () => {
    return inject(MENU_CONTEXT_KEY, {
      computedSelectedKeys: ref(""),
      computedOpenKeys: ref([]),
      levelIndent: ref(20),
      computedCollapsed: ref(false),
      accordion: ref(false),
      autoOpen: ref(false),
      tooltipProps: ref({}),
      triggerProps: ref({}),
      autoOpenSelected: ref(false),
      mode: ref("vertical"),
      theme: ref("light"),
      popupMaxHeight: ref(),
      autoScrollIntoView: ref(false),
      scrollConfig: ref({}),
      menuTreeNodes: ref([]),
      menuTree: ref([]),
      max: ref(1e4),
      menuItemWidths: ref([]),
      emits: () => {
      }
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Menu/MenuEllipsis.vue2.js
var _hoisted_169 = {
  class: normalizeClass(["yc-menu-item-wrapper", "yc-menu-item-mode-horizontal"])
};
var _hoisted_245 = { class: "yc-menu-item-title" };
var _hoisted_330 = { class: "yc-menu-icon-suffix" };
var _sfc_main140 = defineComponent({
  __name: "MenuEllipsis",
  setup(__props) {
    const {
      computedSelectedKeys,
      theme,
      triggerProps,
      popupMaxHeight,
      menuTree,
      max,
      emits
    } = useContext20().inject();
    const submenus = computed(() => menuTree.value.slice(max.value));
    const isSelected = computed(() => {
      return submenus.value.some((item) => {
        return isMenuItemActive(
          menuTree.value,
          item.path,
          computedSelectedKeys.value
        );
      });
    });
    const handleSelect = (value) => {
      if (computedSelectedKeys.value == value) return;
      computedSelectedKeys.value = value;
      emits("menu-item-click", value);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_169, [
        createVNode(unref(Dropdown), {
          "popup-max-height": unref(popupMaxHeight),
          theme: unref(theme),
          "trigger-props": {
            position: "bl",
            popupOffset: 20,
            showArrow: true,
            ...unref(triggerProps)
          },
          onSelect: handleSelect
        }, {
          content: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(submenus.value, (node) => {
              return openBlock(), createBlock(_sfc_main137, {
                key: node.path,
                "tree-node": node,
                "popup-max-height": unref(popupMaxHeight),
                "trigger-props": unref(triggerProps),
                "computed-selected-keys": unref(computedSelectedKeys)
              }, null, 8, ["tree-node", "popup-max-height", "trigger-props", "computed-selected-keys"]);
            }), 128))
          ]),
          default: withCtx(() => [
            createBaseVNode("div", {
              class: normalizeClass([
                "yc-menu-item",
                "yc-menu-item-ellipsis",
                `yc-menu-item-theme-${unref(theme)}`,
                {
                  "yc-menu-item-selected": isSelected.value
                }
              ])
            }, [
              createBaseVNode("div", _hoisted_245, [
                createVNode(unref(_sfc_main52))
              ]),
              createBaseVNode("div", _hoisted_330, [
                createVNode(unref(_sfc_main17))
              ])
            ], 2)
          ]),
          _: 1
        }, 8, ["popup-max-height", "theme", "trigger-props"])
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Menu/MenuEllipsis.vue.js
var MenuEllipsis = _export_sfc(_sfc_main140, [["__scopeId", "data-v-b37dd55e"]]);

// node_modules/yc-design-vue/es/Menu/Menu.vue2.js
var _sfc_main141 = defineComponent({
  ...{
    name: "Menu"
  },
  __name: "Menu",
  props: {
    theme: { default: "light" },
    mode: { default: "vertical" },
    levelIndent: { default: 20 },
    autoOpen: { type: Boolean, default: false },
    collapsed: { type: Boolean, default: void 0 },
    defaultCollapsed: { type: Boolean, default: false },
    collapsedWidth: { default: 48 },
    accordion: { type: Boolean, default: false },
    showCollapseButton: { type: Boolean, default: false },
    selectedKeys: { default: void 0 },
    defaultSelectedKeys: { default: "" },
    openKeys: { default: void 0 },
    defaultOpenKeys: { default: () => [] },
    breakpoint: { default: void 0 },
    triggerProps: { default: () => {
      return {};
    } },
    tooltipProps: { default: () => {
      return {};
    } },
    autoOpenSelected: { type: Boolean, default: false },
    autoScrollIntoView: { type: Boolean, default: false },
    scrollConfig: {},
    popupMaxHeight: { type: [Boolean, Number], default: 167 }
  },
  emits: ["update:selectedKeys", "update:openKeys", "update:collapsed", "collapse", "menu-item-click", "sub-menu-click"],
  setup(__props, { emit: __emit }) {
    useCssVars((_ctx) => ({
      "05704ab3": unref(collapsedWidth)
    }));
    const props = __props;
    const emits = __emit;
    const menuRef = ref();
    const { computedCollapsed, collapsedWidth, breakpoint, menuTree, max } = useContext20().provide(props, emits, menuRef);
    const handleClick = () => {
      const value = !computedCollapsed.value;
      computedCollapsed.value = value;
      emits("collapse", value, "clickTrigger");
    };
    mediaQueryHandler((_, order, i) => {
      if (!breakpoint.value) return;
      const value = i <= order[breakpoint.value];
      computedCollapsed.value = value;
      emits("collapse", value, "responsive");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-menu",
          `yc-menu-mode-${_ctx.mode}`,
          `yc-menu-theme-${_ctx.theme}`,
          {
            "yc-menu-collapsed": unref(computedCollapsed) && _ctx.mode != "horizontal"
          }
        ])
      }, [
        createBaseVNode("div", {
          class: "yc-menu-inner",
          ref_key: "menuRef",
          ref: menuRef
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true),
          _ctx.mode == "horizontal" && unref(max) < unref(menuTree).length ? (openBlock(), createBlock(MenuEllipsis, { key: 0 })) : createCommentVNode("", true)
        ], 512),
        _ctx.showCollapseButton && _ctx.mode != "horizontal" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "yc-menu-collapse-button",
          onClick: handleClick
        }, [
          !unref(computedCollapsed) ? (openBlock(), createBlock(unref(_sfc_main135), { key: 0 })) : (openBlock(), createBlock(unref(_sfc_main136), { key: 1 }))
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Menu/Menu.vue.js
var _Menu = _export_sfc(_sfc_main141, [["__scopeId", "data-v-08122c0d"]]);

// node_modules/yc-design-vue/es/Menu/MenuItemGroup.vue2.js
var _hoisted_170 = { class: "yc-menu-group" };
var _hoisted_246 = { class: "yc-menu-group-title text-ellipsis" };
var _sfc_main142 = defineComponent({
  ...{
    name: "MenuItemGroup"
  },
  __name: "MenuItemGroup",
  props: {
    title: { default: "" }
  },
  setup(__props) {
    const { levelIndent } = useContext20().inject();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_170, [
        createBaseVNode("div", _hoisted_246, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(_ctx.title), 1)
          ], true)
        ]),
        createBaseVNode("div", {
          class: "yc-menu-group-content",
          style: normalizeStyle({
            paddingLeft: unref(valueToPx)(unref(levelIndent))
          })
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 4)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Menu/MenuItemGroup.vue.js
var MenuItemGroup = _export_sfc(_sfc_main142, [["__scopeId", "data-v-40d6387c"]]);

// node_modules/yc-design-vue/es/Menu/index.js
var Menu = Object.assign(_Menu, {
  item: MenuItem,
  submenu: SubMenu,
  group: MenuItemGroup,
  install: (app) => {
    app.component("Yc" + _Menu.name, _Menu);
    app.component("Yc" + MenuItem.name, MenuItem);
    app.component("Yc" + SubMenu.name, SubMenu);
    app.component("Yc" + MenuItemGroup.name, MenuItemGroup);
  }
});

// node_modules/yc-design-vue/es/Mention/index.vue.js
var _sfc_main143 = defineComponent({
  ...{
    name: "Mention"
  },
  __name: "index",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: "" },
    data: { default: () => [] },
    prefix: { default: "@" },
    split: { default: "" },
    type: { default: "input" },
    disabled: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change", "search", "select", "focus", "blur", "clear", "input"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      modelValue,
      defaultValue,
      allowClear,
      disabled,
      prefix,
      split,
      data,
      type: mentionType
    } = toRefs(props);
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => emits("update:modelValue", val)
    );
    const cursor = ref(0);
    const popupVisible = ref(false);
    const autoCompleteRef = ref();
    const inputRef = ref();
    const prefixTexts = computed(() => {
      return isArray(prefix.value) ? prefix.value.map((ch) => data.value.map((op) => ch + op.value)).flat(1) : data.value.map((op) => prefix.value + op.value);
    });
    const { recordCursor, getCursor } = useCursor(inputRef);
    const showPopup = async (value, ev) => {
      var _a;
      await nextTick();
      recordCursor();
      const { selectionStart } = ev.target;
      cursor.value = getCursor() ?? selectionStart;
      if (isNull(cursor.value) || !data.value.length) {
        return;
      }
      const ch = !cursor.value ? "" : value[cursor.value - 1];
      popupVisible.value = isArray(prefix.value) ? prefix.value.includes(ch) : prefix.value == ch;
      if (!popupVisible.value || mentionType.value != "textarea") {
        return;
      }
      const el = autoCompleteRef.value.getMirrorRef();
      const range = document.createRange();
      const textNode = el.childNodes[0];
      range.setStart(textNode, cursor.value);
      range.setEnd(textNode, cursor.value);
      const { bottom: y, left: x } = range.getBoundingClientRect();
      const { bottom } = inputRef.value.getBoundingClientRect();
      (_a = autoCompleteRef.value) == null ? void 0 : _a.updatePosition(x, y > bottom ? bottom : y);
    };
    const handleEvent = async (type, ev, value = "") => {
      switch (type) {
        case "input":
          {
            emits("input", value, ev);
            showPopup(value, ev);
          }
          break;
        case "select":
          {
            emits("select", value);
            popupVisible.value = false;
            const needSplit = prefixTexts.value.some((prefixText) => {
              return computedValue.value.includes(prefixText);
            });
            if (needSplit) {
              const preValue = computedValue.value.slice(0, cursor.value - 1);
              const prefixCh = computedValue.value.slice(
                cursor.value - 1,
                cursor.value
              );
              const curValue = computedValue.value.slice(cursor.value);
              computedValue.value = preValue + split.value + prefixCh + value + curValue;
            } else {
              computedValue.value = computedValue.value.slice(0, cursor.value) + value + computedValue.value.slice(cursor.value);
            }
          }
          break;
        case "focus":
          {
            emits("focus", ev);
          }
          break;
        case "blur":
          {
            popupVisible.value = false;
            emits("blur", ev);
          }
          break;
        case "keydown": {
          const e = ev;
          if (!["Backspace"].includes(e.key)) {
            return;
          }
          showPopup(
            e.key == "Backspace" ? value : computedValue.value,
            ev
          );
        }
      }
    };
    onMounted(() => {
      var _a;
      inputRef.value = (_a = autoCompleteRef.value) == null ? void 0 : _a.getInputRef();
    });
    __expose({
      focus() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      },
      blur() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.blur();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(AutoComplete), mergeProps({
        modelValue: unref(computedValue),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(computedValue) ? computedValue.value = $event : null),
        popupVisible: popupVisible.value,
        data: unref(data),
        disabled: unref(disabled),
        "allow-clear": unref(allowClear),
        "is-select-set-value": false,
        "is-search": false,
        type: _ctx.type,
        "trigger-props": {
          autoFitPopupWidth: _ctx.type == "input",
          autoSetPosition: _ctx.type == "textarea"
        },
        class: "yc-mention",
        ref_key: "autoCompleteRef",
        ref: autoCompleteRef
      }, _ctx.$attrs, {
        onInput: _cache[1] || (_cache[1] = (v, ev) => handleEvent("input", ev, v)),
        onChange: _cache[2] || (_cache[2] = (v) => _ctx.$emit("change", v)),
        onSearch: _cache[3] || (_cache[3] = (v) => _ctx.$emit("search", v)),
        onClear: _cache[4] || (_cache[4] = (ev) => _ctx.$emit("clear", ev)),
        onSelect: _cache[5] || (_cache[5] = (v) => handleEvent("select", null, v)),
        onFocus: _cache[6] || (_cache[6] = (ev) => handleEvent("focus", ev)),
        onBlur: _cache[7] || (_cache[7] = (ev) => handleEvent("blur", ev)),
        onKeydown: _cache[8] || (_cache[8] = (ev) => handleEvent("keydown", ev))
      }), createSlots({ _: 2 }, [
        _ctx.$slots.option ? {
          name: "option",
          fn: withCtx(({ data: data2 }) => [
            renderSlot(_ctx.$slots, "option", { data: data2 })
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["modelValue", "popupVisible", "data", "disabled", "allow-clear", "type", "trigger-props"]);
    };
  }
});

// node_modules/yc-design-vue/es/Mention/index.js
var Mention = Object.assign(_sfc_main143, {
  install: (app) => {
    app.component("Yc" + _sfc_main143.name, _sfc_main143);
  }
});

// node_modules/yc-design-vue/es/Modal/hooks/useModalDraggable.js
var useModalDraggable = (params) => {
  const {
    visible,
    triggerRef,
    modalRef,
    draggable,
    fullscreen,
    alignCenter,
    top
  } = params;
  const originX = ref(0);
  const originY = ref(0);
  const { x, y } = useDraggable(triggerRef, {
    onMove() {
      if (!isDraggable.value) return;
      const maxX = window.innerWidth - modalRef.value.offsetWidth;
      const maxY = window.innerHeight - modalRef.value.offsetHeight;
      x.value = x.value >= maxX ? maxX : x.value;
      x.value = x.value <= 0 ? 0 : x.value;
      y.value = y.value >= maxY ? maxY : y.value;
      y.value = y.value <= 0 ? 0 : y.value;
    }
  });
  const isDraggable = computed(() => draggable.value && !fullscreen.value);
  const dragStyle = computed(() => {
    return isDraggable.value && (x.value != originX.value || y.value != originY.value) ? {
      transform: `translate(${valueToPx(x.value)},${valueToPx(y.value)})`
    } : {
      left: valueToPx(originX.value),
      top: valueToPx(originY.value)
    };
  });
  watch(
    () => visible.value,
    async (v) => {
      if (!v) return;
      await sleep(0);
      const offsetX = (window.innerWidth - modalRef.value.offsetWidth) / 2;
      const offsetY = (window.innerHeight - modalRef.value.offsetHeight) / 2;
      const finalX = offsetX <= 0 ? 0 : offsetX;
      const finalY = offsetY <= 0 ? 0 : offsetY;
      originX.value = finalX;
      originY.value = alignCenter.value ? finalY : top.value;
      x.value = originX.value;
      y.value = originY.value;
    },
    {
      immediate: true
    }
  );
  return {
    dragStyle,
    isDraggable
  };
};

// node_modules/yc-design-vue/es/Modal/Modal.vue2.js
var _hoisted_171 = {
  key: 0,
  class: "yc-modal-footer"
};
var _sfc_main144 = defineComponent({
  ...{
    name: "Modal",
    inheritAttrs: false
  },
  __name: "Modal",
  props: {
    visible: { type: Boolean, default: void 0 },
    defaultVisible: { type: Boolean, default: false },
    width: { default: 400 },
    top: { default: 100 },
    mask: { type: Boolean, default: true },
    title: { default: "" },
    titleAlign: { default: "center" },
    alignCenter: { type: Boolean, default: true },
    unmountOnClose: { type: Boolean, default: false },
    maskClosable: { type: Boolean, default: true },
    hideCancel: { type: Boolean, default: false },
    closable: { type: Boolean, default: true },
    okText: { default: "确认" },
    cancelText: { default: "取消" },
    okLoading: { type: Boolean, default: false },
    okButtonProps: { default: () => {
      return {};
    } },
    cancelButtonProps: { default: () => {
      return {};
    } },
    footer: { type: Boolean, default: true },
    renderToBody: { type: Boolean, default: true },
    popupContainer: { default: void 0 },
    maskStyle: { default: () => {
      return {};
    } },
    modalClass: { default: "" },
    modalStyle: { default: () => {
      return {};
    } },
    escToClose: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    maskAnimationName: { default: "fade" },
    modalAnimationName: { default: "zoom-modal" },
    bodyClass: { default: "" },
    bodyStyle: { default: () => {
      return {};
    } },
    hideTitle: { type: Boolean, default: false },
    simple: { type: Boolean, default: false },
    onBeforeCancel: { type: Function, default: () => {
      return true;
    } },
    onBeforeOk: { type: Function, default: () => {
      return true;
    } }
  },
  emits: ["update:visible", "ok", "cancel", "open", "before-open", "close", "before-close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      visible,
      defaultVisible,
      width,
      top,
      alignCenter,
      maskClosable,
      escToClose,
      modalStyle: _modalStyle,
      fullscreen,
      draggable,
      renderToBody
    } = toRefs(props);
    const { onBeforeOk, onBeforeCancel } = props;
    const { popupContainer, zIndex } = getGlobalConfig(props);
    const {
      outerVisible,
      innerVisible,
      asyncLoading,
      handleClose,
      handleAfterLeave
    } = useModalClose({
      visible,
      defaultVisible,
      escToClose,
      maskClosable,
      onBeforeOk,
      onBeforeCancel,
      emits
    });
    const headerRef = ref();
    const modalRef = ref();
    const { dragStyle, isDraggable } = useModalDraggable({
      visible: innerVisible,
      draggable,
      fullscreen,
      alignCenter,
      top,
      triggerRef: headerRef,
      modalRef
    });
    const modalStyle = computed(() => {
      return {
        width: fullscreen.value ? "100%" : width.value == "auto" ? "fit-content" : valueToPx(width.value),
        ...dragStyle.value,
        ..._modalStyle.value
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, {
        to: unref(popupContainer),
        disabled: !unref(renderToBody)
      }, [
        !_ctx.unmountOnClose || unref(outerVisible) ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([
            "yc-modal-container",
            _ctx.$attrs.class,
            {
              "yc-modal-simple": _ctx.simple,
              "yc-modal-position-absolute": unref(popupContainer) || !unref(renderToBody)
            }
          ]),
          style: normalizeStyle({
            zIndex: unref(zIndex),
            ..._ctx.$attrs.style ?? {}
          })
        }, [
          createVNode(Transition, { name: _ctx.maskAnimationName }, {
            default: withCtx(() => [
              _ctx.mask ? withDirectives((openBlock(), createElementBlock("div", {
                key: 0,
                class: "yc-modal-mask",
                style: normalizeStyle(_ctx.maskStyle)
              }, null, 4)), [
                [vShow, unref(innerVisible)]
              ]) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["name"]),
          createBaseVNode("div", {
            class: "yc-modal-wrapper",
            onClick: _cache[6] || (_cache[6] = withModifiers(($event) => unref(handleClose)("mask", $event), ["self"]))
          }, [
            createVNode(Transition, {
              name: _ctx.modalAnimationName,
              onBeforeEnter: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("before-open")),
              onBeforeLeave: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("before-close")),
              onAfterEnter: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("open")),
              onAfterLeave: unref(handleAfterLeave)
            }, {
              default: withCtx(() => [
                withDirectives(createBaseVNode("div", {
                  class: normalizeClass([
                    "yc-modal",
                    _ctx.modalClass,
                    {
                      // 拖拽
                      "yc-modal-draggable": unref(isDraggable),
                      // 全屏
                      "yc-modal-fullscreen": unref(fullscreen)
                    }
                  ]),
                  style: normalizeStyle(modalStyle.value),
                  ref_key: "modalRef",
                  ref: modalRef
                }, [
                  renderSlot(_ctx.$slots, "header", {}, () => [
                    createBaseVNode("div", {
                      class: "yc-modal-header",
                      ref_key: "headerRef",
                      ref: headerRef
                    }, [
                      !_ctx.hideTitle ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        class: normalizeClass([
                          "yc-modal-title",
                          "text-ellipsis",
                          {
                            "title-align-center": _ctx.titleAlign == "center"
                          }
                        ])
                      }, [
                        renderSlot(_ctx.$slots, "title", {}, () => [
                          createTextVNode(toDisplayString(_ctx.title), 1)
                        ], true)
                      ], 2)) : createCommentVNode("", true),
                      _ctx.closable && !_ctx.simple ? (openBlock(), createBlock(unref(IconButton), {
                        key: 1,
                        class: "yc-modal-close-button",
                        onClick: _cache[0] || (_cache[0] = ($event) => unref(handleClose)("closeBtn", $event))
                      })) : createCommentVNode("", true)
                    ], 512)
                  ], true),
                  createBaseVNode("div", {
                    class: normalizeClass(["yc-modal-body", _ctx.bodyClass]),
                    style: normalizeStyle(_ctx.bodyStyle)
                  }, [
                    renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ], 6),
                  _ctx.footer ? (openBlock(), createElementBlock("div", _hoisted_171, [
                    renderSlot(_ctx.$slots, "footer", {}, () => [
                      !_ctx.hideCancel ? (openBlock(), createBlock(unref(Button), mergeProps({ key: 0 }, _ctx.cancelButtonProps, {
                        onClick: _cache[1] || (_cache[1] = ($event) => unref(handleClose)("cancelBtn", $event))
                      }), {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.cancelText), 1)
                        ]),
                        _: 1
                      }, 16)) : createCommentVNode("", true),
                      createVNode(unref(Button), mergeProps({
                        type: "primary",
                        loading: _ctx.okLoading || unref(asyncLoading)
                      }, _ctx.okButtonProps, {
                        onClick: _cache[2] || (_cache[2] = ($event) => unref(handleClose)("confirmBtn", $event))
                      }), {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.okText), 1)
                        ]),
                        _: 1
                      }, 16, ["loading"])
                    ], true)
                  ])) : createCommentVNode("", true)
                ], 6), [
                  [vShow, unref(innerVisible)]
                ])
              ]),
              _: 3
            }, 8, ["name", "onAfterLeave"])
          ])
        ], 6)), [
          [vShow, unref(outerVisible)]
        ]) : createCommentVNode("", true)
      ], 8, ["to", "disabled"]);
    };
  }
});

// node_modules/yc-design-vue/es/Modal/Modal.vue.js
var _Modal = _export_sfc(_sfc_main144, [["__scopeId", "data-v-f89e836b"]]);

// node_modules/yc-design-vue/es/Modal/ModalService.vue.js
var _hoisted_172 = {
  key: 0,
  class: "yc-modal-title-icon"
};
var _hoisted_247 = { class: "yc-modal-title-content text-ellipsis" };
var _hoisted_331 = { class: "yc-modal-body-content text-ellipsis" };
var _sfc_main145 = defineComponent({
  __name: "ModalService",
  props: {
    width: { default: 520 },
    top: { default: 100 },
    mask: { type: Boolean, default: true },
    title: { type: [String, Array, Function], default: "" },
    titleAlign: { default: "center" },
    alignCenter: { type: Boolean, default: true },
    unmountOnClose: { type: Boolean, default: false },
    maskClosable: { type: Boolean, default: true },
    hideCancel: { type: Boolean, default: false },
    closable: { type: Boolean, default: true },
    okText: { default: "确认" },
    cancelText: { default: "取消" },
    okLoading: { type: Boolean, default: false },
    okButtonProps: { default: () => {
      return {};
    } },
    cancelButtonProps: { default: () => {
      return {};
    } },
    footer: { type: Boolean, default: true },
    renderToBody: { type: Boolean, default: true },
    popupContainer: { default: ".yc-overlay-modal" },
    maskStyle: { default: () => {
      return {};
    } },
    modalClass: { default: "" },
    modalStyle: { default: () => {
      return {};
    } },
    escToClose: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    maskAnimationName: { default: "fade" },
    modalAnimationName: { default: "zoom-modal" },
    bodyClass: { default: "" },
    bodyStyle: { default: () => {
      return {};
    } },
    hideTitle: { type: Boolean, default: false },
    simple: { type: Boolean, default: false },
    onBeforeCancel: { type: Function, default: () => {
      return true;
    } },
    onBeforeOk: { type: Function, default: () => {
      return true;
    } },
    content: { type: [String, Array, Function], default: "" },
    type: {},
    onOk: {},
    onCancel: {},
    onOpen: {},
    onClose: {},
    onBeforeOpen: {},
    onBeforeClose: {},
    serviceClose: {}
  },
  setup(__props) {
    const props = __props;
    const { onClose, serviceClose } = props;
    const visible = ref(false);
    const handleClose = () => {
      serviceClose == null ? void 0 : serviceClose();
      onClose == null ? void 0 : onClose();
    };
    onMounted(() => {
      visible.value = true;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_Modal, mergeProps(props, {
        visible: visible.value,
        "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => visible.value = $event),
        "modal-class": [
          "yc-service-modal",
          {
            [`yc-service-modal-${_ctx.type}`]: !!_ctx.type
          }
        ],
        onOk: _cache[1] || (_cache[1] = ($event) => {
          var _a;
          return (_a = _ctx.onOk) == null ? void 0 : _a.call(_ctx);
        }),
        onCancel: _cache[2] || (_cache[2] = ($event) => {
          var _a;
          return (_a = _ctx.onCancel) == null ? void 0 : _a.call(_ctx);
        }),
        onBeforeOpen: _cache[3] || (_cache[3] = ($event) => {
          var _a;
          return (_a = _ctx.onBeforeOpen) == null ? void 0 : _a.call(_ctx);
        }),
        onBeforeClose: _cache[4] || (_cache[4] = ($event) => {
          var _a;
          return (_a = _ctx.onBeforeClose) == null ? void 0 : _a.call(_ctx);
        }),
        onOpen: _cache[5] || (_cache[5] = ($event) => {
          var _a;
          return (_a = _ctx.onOpen) == null ? void 0 : _a.call(_ctx);
        }),
        onClose: handleClose
      }), {
        title: withCtx(() => [
          _ctx.type ? (openBlock(), createElementBlock("span", _hoisted_172, [
            (openBlock(), createBlock(resolveDynamicComponent(unref(TYPE_ICON_MAP)[_ctx.type])))
          ])) : createCommentVNode("", true),
          createBaseVNode("span", _hoisted_247, [
            (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(_ctx.title))))
          ])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_331, [
            (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(_ctx.content))))
          ])
        ]),
        _: 1
      }, 16, ["visible", "modal-class"]);
    };
  }
});

// node_modules/yc-design-vue/es/Modal/index.js
var container2;
var open2 = (props) => {
  if (!container2) {
    container2 = document.createElement("div");
    container2.className = "yc-overlay yc-overlay-modal";
    document.body.append(container2);
  }
  const close = () => {
    render(null, container2);
  };
  const update2 = (updateProps) => {
  };
  const vnode = h(_sfc_main145, {
    ...props,
    serviceClose: close
  });
  render(vnode, container2);
  return {
    close,
    update: update2
  };
};
var modalMethod = {
  open: open2,
  ...Object.fromEntries(
    ["info", "warning", "error", "success", "confirm"].map((type) => {
      return [
        type,
        (props) => {
          return open2({
            ...props,
            type,
            simple: true,
            hideCancel: type != "confirm",
            width: 400
          });
        }
      ];
    })
  )
};
var Modal = Object.assign(_Modal, {
  install: (app) => {
    app.component("Yc" + _Modal.name, _Modal);
    app.config.globalProperties.$modal = Object.assign(Modal, modalMethod);
  },
  ...modalMethod
});

// node_modules/yc-design-vue/es/Message/Message.vue2.js
var _hoisted_173 = {
  key: 0,
  class: "yc-message-icon"
};
var _hoisted_248 = { class: "yc-message-content" };
var _sfc_main146 = defineComponent({
  ...{
    name: "Message"
  },
  __name: "Message",
  props: {
    type: { default: "info" },
    content: { type: [String, Array, Function], default: "" },
    id: { default: "" },
    icon: { type: Function, default: void 0 },
    showIcon: { type: Boolean, default: true },
    closable: { type: Boolean, default: false },
    duration: { default: 3e3 },
    isReset: { type: Boolean, default: false },
    onClose: { type: Function, default: void 0 },
    onDestory: { type: Function, default: void 0 },
    resetOnHover: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { type, id, duration: duration3, resetOnHover, isReset } = toRefs(props);
    const { onClose, onDestory } = props;
    const { start: start2, stop: stop2 } = useTimeoutFn(
      () => {
        onDestory == null ? void 0 : onDestory(id.value);
        onClose == null ? void 0 : onClose(id.value);
      },
      () => duration3.value,
      {
        immediate: false
      }
    );
    const handleClose = () => {
      stop2();
      onDestory == null ? void 0 : onDestory(id.value);
      onClose == null ? void 0 : onClose(id.value);
    };
    const handleMouseenter = () => {
      if (!resetOnHover.value || duration3.value <= 0) return;
      stop2();
    };
    const handleMouseleave = () => {
      if (!resetOnHover.value || duration3.value <= 0) return;
      start2();
    };
    watch(
      () => isReset.value,
      (val) => {
        if (duration3.value <= 0 || !val) return;
        stop2();
        start2();
      }
    );
    onMounted(() => {
      if (duration3.value <= 0) return;
      start2();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", {
        role: "alert",
        class: normalizeClass(["yc-message", `yc-message-${unref(type)}`]),
        onMouseenter: handleMouseenter,
        onMouseleave: handleMouseleave
      }, [
        (unref(type) != "normal" || !unref(isUndefined)(_ctx.icon)) && _ctx.showIcon ? (openBlock(), createElementBlock("span", _hoisted_173, [
          (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon ?? unref(TYPE_ICON_MAP)[unref(type)]), {
            spin: unref(type) == "loading"
          }, null, 8, ["spin"]))
        ])) : createCommentVNode("", true),
        createBaseVNode("span", _hoisted_248, toDisplayString(_ctx.content), 1),
        _ctx.closable ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "yc-message-close-btn",
          onClick: handleClose
        }, [
          createVNode(unref(IconButton))
        ])) : createCommentVNode("", true)
      ], 34);
    };
  }
});

// node_modules/yc-design-vue/es/Message/Message.vue.js
var _Message = _export_sfc(_sfc_main146, [["__scopeId", "data-v-2f248611"]]);

// node_modules/yc-design-vue/es/Message/MessageList.vue2.js
var _sfc_main147 = defineComponent({
  __name: "MessageList",
  props: {
    messageList: { default: () => [] },
    position: { default: "top" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        name: "fade-message",
        moveClass: "flip-list-move",
        tag: "div",
        class: normalizeClass(["yc-message-list", `yc-message-list-${_ctx.position}`])
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.messageList, (message) => {
            return openBlock(), createBlock(_Message, mergeProps({
              key: message.id
            }, { ref_for: true }, message), null, 16);
          }), 128))
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});

// node_modules/yc-design-vue/es/Message/MessageList.vue.js
var _MessageList = _export_sfc(_sfc_main147, [["__scopeId", "data-v-10428b71"]]);

// node_modules/yc-design-vue/es/Message/index.js
var container3 = /* @__PURE__ */ new Map();
var messageList = reactive({
  top: [],
  bottom: []
});
var messageId = 1;
var removeContainer = (position) => {
  if (messageList[position].length) return;
  document.body.removeChild(container3.get(position));
  container3.delete(position);
};
var open3 = (props, type = "info") => {
  const position = isString(props) ? "top" : props.position ?? "top";
  const list = messageList[position];
  if (!container3.has(position)) {
    const messageContainer = document.createElement("div");
    messageContainer.className = "yc-overlay yc-overlay-message";
    document.body.appendChild(messageContainer);
    container3.set(position, messageContainer);
    render(
      h(_MessageList, {
        messageList: list,
        position
      }),
      messageContainer
    );
  }
  const id = isString(props) || !props.id ? `__yc_message_${messageId++}` : props.id;
  const onDestory = () => {
    const index22 = list.findIndex((item) => item.id == id);
    if (index22 == -1) {
      return;
    }
    list.splice(index22, 1);
    removeContainer(position);
  };
  const message = isString(props) ? { content: props, id, onDestory, type } : { ...props, id, onDestory, type };
  const index2 = list.findIndex((item) => item.id == id);
  if (index2 != -1) {
    list[index2] = {
      ...list[index2],
      ...message,
      isReset: true
    };
    nextTick().then(() => {
      list[index2].isReset = false;
    });
  } else {
    list.push(message);
  }
  return {
    close: onDestory
  };
};
var messageMethod = {
  ...Object.fromEntries(
    ["success", "warning", "error", "info", "loading", "normal"].map((type) => {
      return [
        type,
        (props) => {
          return open3(props, type);
        }
      ];
    })
  ),
  clear(position) {
    messageList[position].splice(0);
    removeContainer(position);
  }
};
var Message = Object.assign(_Message, {
  install: (app) => {
    app.config.globalProperties.$message = Object.assign(
      _Message,
      messageMethod
    );
  },
  ...messageMethod
});

// node_modules/yc-design-vue/es/Notification/Notification.vue2.js
var _hoisted_174 = { class: "yc-notification-left" };
var _hoisted_249 = {
  key: 0,
  class: "yc-notification-icon"
};
var _hoisted_332 = { class: "yc-notification-right" };
var _hoisted_420 = {
  key: 0,
  class: "yc-notification-title"
};
var _hoisted_513 = {
  key: 1,
  class: "yc-notification-content"
};
var _hoisted_66 = {
  key: 2,
  class: "yc-notification-footer"
};
var _sfc_main148 = defineComponent({
  ...{
    name: "Notification"
  },
  __name: "Notification",
  props: {
    type: { default: "info" },
    content: { type: [String, Array, Function], default: "" },
    title: { type: [String, Array, Function], default: "" },
    icon: { type: Function, default: void 0 },
    id: { default: "" },
    style: { default: () => {
      return {};
    } },
    class: { default: "" },
    showIcon: { type: Boolean, default: true },
    closable: { type: Boolean, default: false },
    duration: { default: 3e3 },
    isReset: { type: Boolean, default: false },
    footer: { type: Function, default: void 0 },
    closeIcon: { type: Function, default: void 0 },
    closeIconElement: { type: Function, default: void 0 },
    onClose: { type: Function, default: void 0 },
    onDestory: {}
  },
  setup(__props) {
    const props = __props;
    const { type, id, duration: duration3, class: className, isReset } = toRefs(props);
    const { onClose, onDestory } = props;
    const { start: start2, stop: stop2 } = useTimeoutFn(
      () => {
        onDestory == null ? void 0 : onDestory(id.value);
        onClose == null ? void 0 : onClose(id.value);
      },
      () => duration3.value,
      {
        immediate: false
      }
    );
    watch(
      () => isReset.value,
      (newVal) => {
        if (duration3.value <= 0 || !newVal) return;
        stop2();
        start2();
      }
    );
    const handleClose = () => {
      stop2();
      onDestory == null ? void 0 : onDestory(id.value);
      onClose == null ? void 0 : onClose(id.value);
    };
    onMounted(() => {
      if (duration3.value <= 0) return;
      start2();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", {
        role: "alert",
        class: normalizeClass(["yc-notification", `yc-notification-${unref(type)}`, unref(className)]),
        style: normalizeStyle(_ctx.style)
      }, [
        createBaseVNode("div", _hoisted_174, [
          _ctx.showIcon ? (openBlock(), createElementBlock("div", _hoisted_249, [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon ?? unref(TYPE_ICON_MAP)[unref(type)])))
          ])) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_332, [
          !unref(isUndefined)(_ctx.title) ? (openBlock(), createElementBlock("div", _hoisted_420, [
            (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(_ctx.title))))
          ])) : createCommentVNode("", true),
          !unref(isUndefined)(_ctx.content) ? (openBlock(), createElementBlock("div", _hoisted_513, [
            (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(_ctx.content))))
          ])) : createCommentVNode("", true),
          unref(isFunction)(_ctx.footer) ? (openBlock(), createElementBlock("div", _hoisted_66, [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.footer)))
          ])) : createCommentVNode("", true)
        ]),
        _ctx.closable ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "yc-notification-close-btn",
          onClick: handleClose
        }, [
          _ctx.closeIconElement ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIconElement), { key: 0 })) : (openBlock(), createBlock(unref(IconButton), { key: 1 }, {
            default: withCtx(() => [
              _ctx.closeIcon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon), { key: 0 })) : createCommentVNode("", true)
            ]),
            _: 1
          }))
        ])) : createCommentVNode("", true)
      ], 6);
    };
  }
});

// node_modules/yc-design-vue/es/Notification/Notification.vue.js
var _Notification = _export_sfc(_sfc_main148, [["__scopeId", "data-v-dad0f3e0"]]);

// node_modules/yc-design-vue/es/Notification/NotificationList.vue2.js
var _sfc_main149 = defineComponent({
  __name: "NotificationList",
  props: {
    notificationList: { default: () => [] },
    position: { default: "topRight" }
  },
  setup(__props) {
    const props = __props;
    const animationName = computed(() => {
      const dir = props.position.includes("Right") ? "right" : "left";
      return `slide-${dir}-notification`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        name: animationName.value,
        class: normalizeClass(["yc-notification-list", `yc-notification-list-${_ctx.position}`]),
        tag: "div"
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.notificationList, (notification) => {
            return openBlock(), createBlock(_Notification, mergeProps({
              key: notification.id
            }, { ref_for: true }, notification), null, 16);
          }), 128))
        ]),
        _: 1
      }, 8, ["name", "class"]);
    };
  }
});

// node_modules/yc-design-vue/es/Notification/NotificationList.vue.js
var _NotificationList = _export_sfc(_sfc_main149, [["__scopeId", "data-v-79a39152"]]);

// node_modules/yc-design-vue/es/Notification/index.js
var container4 = /* @__PURE__ */ new Map();
var notificationList = reactive({
  topLeft: [],
  topRight: [],
  bottomLeft: [],
  bottomRight: []
});
var notificationId = 1;
var removeContainer2 = (position) => {
  if (notificationList[position].length) return;
  document.body.removeChild(container4.get(position));
  container4.delete(position);
};
var open4 = (props, type = "info") => {
  const position = isString(props) ? "topRight" : props.position ?? "topRight";
  const list = notificationList[position];
  if (!container4.has(position)) {
    const notificationContainer = document.createElement("div");
    notificationContainer.className = "yc-overlay yc-overlay-notification";
    document.body.appendChild(notificationContainer);
    container4.set(position, notificationContainer);
    render(
      h(_NotificationList, {
        notificationList: list,
        position
      }),
      notificationContainer
    );
  }
  const id = isString(props) || !props.id ? `__yc_notification_${notificationId++}` : props.id;
  const onDestory = () => {
    const index22 = list.findIndex((item) => item.id == id);
    if (index22 == -1) {
      return;
    }
    list.splice(index22, 1);
    removeContainer2(position);
  };
  const notification = isString(props) ? { content: props, id, onDestory, type } : { ...props, id, onDestory, type };
  const index2 = list.findIndex((item) => item.id == id);
  if (index2 != -1) {
    list[index2] = {
      ...list[index2],
      ...notification,
      isReset: true
    };
    nextTick().then(() => {
      list[index2].isReset = false;
    });
  } else {
    list.push(notification);
  }
  return {
    close: onDestory
  };
};
var NotificationMethod = {
  ...Object.fromEntries(
    ["success", "warning", "error", "info"].map((type) => {
      return [
        type,
        (props) => {
          return open4(props, type);
        }
      ];
    })
  ),
  remove(id) {
    let posi = "topRight";
    let i = -1;
    for (let [position, list] of Object.entries(notificationList)) {
      const index2 = list.findIndex((item) => item.id == id);
      if (index2 != -1) {
        posi = position;
        i = index2;
        break;
      }
    }
    if (i == -1) {
      return;
    }
    notificationList[posi].splice(i, 1);
  },
  clear(position) {
    notificationList[position].splice(0);
    removeContainer2(position);
  }
};
var Notification = Object.assign(_Notification, {
  install: (app) => {
    app.config.globalProperties.$notification = Object.assign(
      _Notification,
      NotificationMethod
    );
  },
  ...NotificationMethod
});

// node_modules/yc-design-vue/es/OverflowList/index.vue2.js
var _sfc_main150 = defineComponent({
  ...{
    name: "OverflowList"
  },
  __name: "index",
  props: {
    min: { default: 0 },
    margin: { default: 8 },
    from: { default: "end" }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const slots = useSlots();
    const props = __props;
    const emits = __emit;
    const { min, margin, from } = toRefs(props);
    const max = ref(1e4);
    const widths = ref([]);
    const tags = computed(() => {
      var _a;
      return findComponentsFromVnodes(
        ((_a = slots.default) == null ? void 0 : _a.call(slots)) || [],
        Tag.name
      );
    });
    const listRef = ref();
    const overflowRef = ref();
    const overFlowWidth = computed(() => {
      if (!overflowRef.value) return margin.value;
      return unrefElement(overflowRef).offsetWidth + margin.value;
    });
    const overflowNumber = computed(() => {
      return tags.value.length - max.value;
    });
    useResizeObserver(
      listRef,
      throttle(async () => {
        await sleep(0);
        let maxCount = 0;
        let totalWidth = 0;
        const listWidth = listRef.value.offsetWidth;
        for (let i = 0; i < widths.value.length; i++) {
          const gap = i > 0 ? margin.value : 0;
          const newWidth = totalWidth + gap + widths.value[i];
          if (newWidth > listWidth) {
            break;
          }
          totalWidth = newWidth;
          maxCount++;
        }
        max.value = maxCount > min.value ? maxCount : min.value;
      }, 180)
    );
    watch(
      () => max.value,
      () => {
        emits("change", overflowNumber.value);
      }
    );
    watch(
      () => tags.value.length,
      async () => {
        max.value = 1e5;
        await sleep(0);
        const cur = [...document.querySelectorAll("#overflowTag")].map((item) => {
          return item.offsetWidth;
        });
        widths.value = cur;
      },
      {
        immediate: true
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["yc-overflow-list", `yc-overflow-list-from-${unref(from)}`]),
        style: normalizeStyle({
          gap: unref(valueToPx)(unref(margin)),
          padding: unref(from) == "start" ? `0 0 0 ${unref(valueToPx)(overFlowWidth.value)}` : ` 0 ${unref(valueToPx)(overFlowWidth.value)} 0 0`
        }),
        ref_key: "listRef",
        ref: listRef
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(tags.value, (node, i) => {
          return openBlock(), createElementBlock(Fragment, { key: i }, [
            i < max.value ? (openBlock(), createBlock(resolveDynamicComponent(node), {
              key: 0,
              id: "overflowTag"
            })) : createCommentVNode("", true)
          ], 64);
        }), 128)),
        max.value < tags.value.length ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "yc-overflow-tag",
          ref_key: "overflowRef",
          ref: overflowRef
        }, [
          renderSlot(_ctx.$slots, "overflow", { number: overflowNumber.value }, () => [
            createVNode(unref(Tag), null, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(`+${overflowNumber.value}`), 1)
              ]),
              _: 1
            })
          ], true)
        ], 512)) : createCommentVNode("", true)
      ], 6);
    };
  }
});

// node_modules/yc-design-vue/es/OverflowList/index.vue.js
var _OverflowList = _export_sfc(_sfc_main150, [["__scopeId", "data-v-bf5ac246"]]);

// node_modules/yc-design-vue/es/OverflowList/index.js
var OverflowList = Object.assign(_OverflowList, {
  install: (app) => {
    app.component("Yc" + _OverflowList.name, _OverflowList);
  }
});

// node_modules/yc-design-vue/es/PageHeader/index.vue2.js
var _hoisted_175 = { class: "yc-page-header" };
var _hoisted_250 = { class: "yc-page-header-wrapper" };
var _hoisted_333 = {
  key: 0,
  class: "yc-page-header-breadcrumb"
};
var _hoisted_421 = { class: "yc-page-header-header" };
var _hoisted_514 = { class: "yc-page-header-main" };
var _hoisted_67 = {
  key: 0,
  class: "yc-page-header-title text-ellipsis"
};
var _hoisted_75 = {
  key: 2,
  class: "yc-page-header-subtitle text-ellipsis"
};
var _hoisted_84 = {
  key: 0,
  class: "yc-page-header-extra"
};
var _hoisted_92 = {
  key: 0,
  class: "yc-page-header-content"
};
var _sfc_main151 = defineComponent({
  ...{
    name: "PageHeader"
  },
  __name: "index",
  props: {
    title: { default: "" },
    subtitle: { default: "" },
    showBack: { type: Boolean, default: true }
  },
  emits: ["back"],
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_175, [
        createBaseVNode("div", _hoisted_250, [
          _ctx.$slots.breadcrumb ? (openBlock(), createElementBlock("div", _hoisted_333, [
            renderSlot(_ctx.$slots, "breadcrumb", {}, void 0, true)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_421, [
            createBaseVNode("div", _hoisted_514, [
              createVNode(unref(IconButton), {
                size: 14,
                "hover-size": 30,
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("back", $event))
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "back-icon", {}, () => [
                    createVNode(unref(_sfc_main57))
                  ], true)
                ]),
                _: 3
              }),
              _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_67, [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(_ctx.title), 1)
                ], true)
              ])) : createCommentVNode("", true),
              _ctx.$slots.subtitle || _ctx.subtitle ? (openBlock(), createBlock(unref(Divider), {
                key: 1,
                direction: "vertical"
              })) : createCommentVNode("", true),
              _ctx.$slots.subtitle || _ctx.subtitle ? (openBlock(), createElementBlock("div", _hoisted_75, [
                renderSlot(_ctx.$slots, "subtitle", {}, () => [
                  createTextVNode(toDisplayString(_ctx.subtitle), 1)
                ], true)
              ])) : createCommentVNode("", true)
            ]),
            _ctx.$slots.extra ? (openBlock(), createElementBlock("div", _hoisted_84, [
              renderSlot(_ctx.$slots, "extra", {}, void 0, true)
            ])) : createCommentVNode("", true)
          ])
        ]),
        _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_92, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/PageHeader/index.vue.js
var _PageHeader = _export_sfc(_sfc_main151, [["__scopeId", "data-v-be47dbe3"]]);

// node_modules/yc-design-vue/es/PageHeader/index.js
var PageHeader = Object.assign(_PageHeader, {
  install: (app) => {
    app.component("Yc" + _PageHeader.name, _PageHeader);
  }
});

// node_modules/yc-design-vue/es/Popconfirm/index.vue.js
var _hoisted_176 = { class: "yc-popconfirm-body" };
var _hoisted_251 = { class: "yc-popconfirm-icon" };
var _hoisted_334 = { class: "yc-popconfirm-content" };
var _hoisted_422 = { class: "yc-popconfirm-footer" };
var _sfc_main152 = defineComponent({
  ...{
    name: "Popconfirm"
  },
  __name: "index",
  props: {
    content: { default: "" },
    position: { default: "top" },
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    type: { default: "info" },
    okText: { default: "确定" },
    cancelText: { default: "取消" },
    okLoading: { type: Boolean, default: false },
    okButtonProps: { default: () => {
      return {};
    } },
    cancelButtonProps: { default: () => {
      return {};
    } },
    contentClass: { default: "" },
    contentStyle: { default: () => {
      return {};
    } },
    arrowClass: { default: "" },
    arrowStyle: { default: () => {
      return {};
    } },
    popupContainer: { default: void 0 },
    onBeforeOk: { type: Function, default: () => true },
    onBeforeCancel: { type: Function, default: () => true },
    triggerProps: { default: () => {
      return {};
    } }
  },
  emits: ["update:popupVisible", "popup-visible-change", "ok", "cancel"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { popupVisible, defaultPopupVisible, type } = toRefs(props);
    const { onBeforeOk, onBeforeCancel } = props;
    const asyncLoading = ref(false);
    const triggerRef = ref();
    const computedVisible = useControlValue(
      popupVisible,
      defaultPopupVisible.value,
      (val) => {
        emits("update:popupVisible", val);
        emits("popup-visible-change", val);
      }
    );
    const handleOk = () => {
      var _a;
      const isClose = useOnBeforeClose(
        "confirmBtn",
        asyncLoading,
        onBeforeOk,
        onBeforeCancel
      );
      if (!isClose) return;
      emits("ok");
      (_a = triggerRef.value) == null ? void 0 : _a.hide();
    };
    const handleCancel = () => {
      var _a;
      const isClose = useOnBeforeClose(
        "cancelBtn",
        asyncLoading,
        onBeforeOk,
        onBeforeCancel
      );
      if (!isClose) return;
      emits("cancel");
      (_a = triggerRef.value) == null ? void 0 : _a.hide();
    };
    __expose({
      show() {
        computedVisible.value = true;
      },
      hide() {
        computedVisible.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Trigger), mergeProps({
        "popup-visible": unref(computedVisible),
        "onUpdate:popupVisible": _cache[0] || (_cache[0] = ($event) => isRef(computedVisible) ? computedVisible.value = $event : null),
        position: _ctx.position,
        "popup-container": _ctx.popupContainer,
        "arrow-class": [" yc-popconfirm-popup-arrow", _ctx.arrowClass],
        "arrow-style": _ctx.arrowStyle,
        "content-class": ["yc-popconfirm-popup-content", _ctx.contentClass],
        "content-style": _ctx.contentStyle,
        "popup-offset": 10,
        class: ["yc-popconfirm", `yc-popconfirm-${unref(type)}`, _ctx.$attrs.class],
        style: _ctx.$attrs.style,
        trigger: "click",
        "animation-name": "zoom-in-fade-out",
        "need-transform-origin": "",
        "show-arrow": "",
        ref_key: "triggerRef",
        ref: triggerRef
      }, _ctx.triggerProps), {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_176, [
            createBaseVNode("div", _hoisted_251, [
              renderSlot(_ctx.$slots, "icon", {}, () => [
                (openBlock(), createBlock(resolveDynamicComponent(unref(TYPE_ICON_MAP)[unref(type)])))
              ])
            ]),
            createBaseVNode("div", _hoisted_334, [
              renderSlot(_ctx.$slots, "content", {}, () => [
                createTextVNode(toDisplayString(_ctx.content), 1)
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_422, [
            createVNode(unref(Button), mergeProps({ size: "mini" }, _ctx.cancelButtonProps, { onClick: handleCancel }), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.cancelText), 1)
              ]),
              _: 1
            }, 16),
            createVNode(unref(Button), mergeProps({
              size: "mini",
              type: "primary",
              loading: _ctx.okLoading || asyncLoading.value
            }, _ctx.okButtonProps, { onClick: handleOk }), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.okText), 1)
              ]),
              _: 1
            }, 16, ["loading"])
          ])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["popup-visible", "position", "popup-container", "arrow-class", "arrow-style", "content-class", "content-style", "class", "style"]);
    };
  }
});

// node_modules/yc-design-vue/es/Popconfirm/index.js
var Popconfirm = Object.assign(_sfc_main152, {
  install: (app) => {
    app.component("Yc" + _sfc_main152.name, _sfc_main152);
  }
});

// node_modules/yc-design-vue/es/Progress/ProgressLine.vue2.js
var _hoisted_177 = ["aria-valuenow"];
var _hoisted_252 = {
  key: 0,
  class: "yc-progress-line-text"
};
var _sfc_main153 = defineComponent({
  __name: "ProgressLine",
  props: {
    size: {},
    percent: {},
    status: {},
    showText: { type: Boolean },
    text: {},
    width: {},
    strokeWidth: {},
    color: {},
    trackColor: {}
  },
  setup(__props) {
    const props = __props;
    const {
      width,
      trackColor,
      color,
      percent,
      size,
      strokeWidth: _strokeWidth
    } = toRefs(props);
    const strokeWidth = computed(() => {
      const map = {
        small: 3,
        medium: 4,
        large: 8
      };
      return _strokeWidth.value ?? map[size.value];
    });
    const style = computed(() => ({
      width: valueToPx(width.value),
      height: valueToPx(strokeWidth.value),
      backgroundColor: trackColor.value
    }));
    const barStyle = computed(() => {
      return {
        width: `${percent.value * 100}%`,
        ...getBackground(color.value)
      };
    });
    const getBackground = (color2) => {
      if (isObject2(color2)) {
        const val = Object.keys(color2).map((key) => `${color2[key]} ${key}`).join(",");
        return {
          backgroundImage: `linear-gradient(to right, ${val})`
        };
      }
      return {
        backgroundColor: color2
      };
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": unref(percent),
        class: "yc-progress-line-wrapper"
      }, [
        createBaseVNode("div", {
          class: "yc-progress-line",
          style: normalizeStyle(style.value)
        }, [
          createBaseVNode("div", {
            class: "yc-progress-line-bar",
            style: normalizeStyle(barStyle.value)
          }, null, 4)
        ], 4),
        _ctx.showText ? (openBlock(), createElementBlock("div", _hoisted_252, [
          renderSlot(_ctx.$slots, "text", { percent: unref(percent) }, () => [
            createBaseVNode("span", null, toDisplayString(_ctx.text), 1),
            _ctx.status === "danger" ? (openBlock(), createBlock(resolveDynamicComponent(unref(TYPE_ICON_MAP).warning), {
              key: 0,
              color: unref(TYPE_ICON_COLOR_MAP).error
            }, null, 8, ["color"])) : createCommentVNode("", true)
          ], true)
        ])) : createCommentVNode("", true)
      ], 8, _hoisted_177);
    };
  }
});

// node_modules/yc-design-vue/es/Progress/ProgressLine.vue.js
var ProgressLine = _export_sfc(_sfc_main153, [["__scopeId", "data-v-ccea0502"]]);

// node_modules/yc-design-vue/es/Progress/ProgressSteps.vue.js
var _hoisted_178 = ["aria-valuenow"];
var _hoisted_253 = {
  key: 0,
  class: "yc-progress-steps-text"
};
var _sfc_main154 = defineComponent({
  __name: "ProgressSteps",
  props: {
    steps: {},
    percent: {},
    size: {},
    text: {},
    showText: { type: Boolean },
    color: {},
    trackColor: {},
    strokeWidth: {},
    status: {}
  },
  setup(__props) {
    const props = __props;
    const { steps, percent, size, strokeWidth: _strokeWidth } = toRefs(props);
    const strokeWidth = computed(() => {
      return _strokeWidth.value ?? (size.value == "small" ? 8 : 4);
    });
    const stepList = computed(() => {
      return Array(steps.value).fill(0).map((_, i) => {
        {
          return percent.value > 0 && percent.value > 1 / steps.value * i;
        }
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": unref(percent),
        class: "yc-progress-steps-wrapper"
      }, [
        createBaseVNode("div", {
          class: "yc-progress-steps",
          style: normalizeStyle({ height: unref(valueToPx)(strokeWidth.value) })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(stepList.value, (active, i) => {
            return openBlock(), createElementBlock("div", {
              key: i,
              class: normalizeClass([
                "yc-progress-steps-item",
                {
                  "yc-progress-steps-item-active": active
                }
              ]),
              style: normalizeStyle({
                backgroundColor: active ? _ctx.color : _ctx.trackColor
              })
            }, null, 6);
          }), 128))
        ], 4),
        _ctx.showText ? (openBlock(), createElementBlock("div", _hoisted_253, [
          renderSlot(_ctx.$slots, "text", { percent: unref(percent) }, () => [
            createTextVNode(toDisplayString(_ctx.text) + " ", 1),
            _ctx.status === "danger" ? (openBlock(), createBlock(resolveDynamicComponent(unref(TYPE_ICON_MAP).danger), {
              key: 0,
              color: unref(TYPE_ICON_COLOR_MAP).danger
            }, null, 8, ["color"])) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true)
      ], 8, _hoisted_178);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconExclamation.vue2.js
var _sfc_main155 = defineComponent({
  __name: "IconExclamation",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M23 9h2v21h-2z" }, null, -1),
          createBaseVNode("path", {
            fill: "currentColor",
            stroke: "none",
            d: "M23 9h2v21h-2z"
          }, null, -1),
          createBaseVNode("path", { d: "M23 37h2v2h-2z" }, null, -1),
          createBaseVNode("path", {
            fill: "currentColor",
            stroke: "none",
            d: "M23 37h2v2h-2z"
          }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Progress/ProgressCircle.vue2.js
var _hoisted_179 = ["aria-valuenow"];
var _hoisted_254 = ["viewBox"];
var _hoisted_335 = { key: 0 };
var _hoisted_423 = ["id"];
var _hoisted_515 = ["offset", "stop-color"];
var _hoisted_68 = ["cx", "cy", "r", "stroke-width"];
var _hoisted_76 = ["cx", "cy", "r", "stroke-width"];
var _hoisted_85 = {
  key: 2,
  class: normalizeClass(`yc-progress-circle-text`)
};
var _sfc_main156 = defineComponent({
  __name: "ProgressCircle",
  props: {
    type: {},
    percent: {},
    status: {},
    size: {},
    text: {},
    showText: { type: Boolean },
    width: {},
    strokeWidth: {},
    pathStrokeWidth: {},
    color: {},
    trackColor: {}
  },
  setup(__props) {
    const props = __props;
    const {
      size,
      width,
      color,
      strokeWidth: _strokeWidth,
      pathStrokeWidth: _pathStrokeWidth
    } = toRefs(props);
    let __YC_PROGRESS_SEED = 0;
    const isLinearGradient = computed(() => isObject2(color.value));
    const strokeWidth = computed(() => {
      const map = {
        mini: 4,
        small: 3,
        medium: 4,
        large: 4
      };
      return _strokeWidth.value ?? (size.value === "mini" ? width.value / 2 : map[size.value]);
    });
    const pathStrokeWidth = computed(() => {
      if (_pathStrokeWidth.value) return _pathStrokeWidth.value;
      return size.value === "mini" ? strokeWidth.value : Math.max(2, strokeWidth.value - 2);
    });
    const radius = computed(() => (width.value - strokeWidth.value) / 2);
    const perimeter = computed(() => Math.PI * 2 * radius.value);
    const center = computed(() => width.value / 2);
    const linearGradientId = computed(() => {
      __YC_PROGRESS_SEED += 1;
      return `yc-progress-circle-linear-gradient-${__YC_PROGRESS_SEED}`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": _ctx.percent,
        class: normalizeClass(`yc-progress-circle-wrapper`),
        style: normalizeStyle({ width: unref(valueToPx)(unref(width)), height: unref(valueToPx)(unref(width)) })
      }, [
        _ctx.type === "circle" && unref(size) === "mini" && _ctx.status === "success" ? (openBlock(), createBlock(unref(_sfc_main5), {
          key: 0,
          style: normalizeStyle({
            fontSize: unref(width) - 2,
            color: unref(color) ?? unref(TYPE_ICON_COLOR_MAP).success
          })
        }, null, 8, ["style"])) : (openBlock(), createElementBlock("svg", {
          key: 1,
          viewBox: `0 0 ${unref(width)} ${unref(width)}`,
          class: normalizeClass(`yc-progress-circle-svg`)
        }, [
          unref(isObject2)(unref(color)) ? (openBlock(), createElementBlock("defs", _hoisted_335, [
            createBaseVNode("linearGradient", {
              id: linearGradientId.value,
              x1: "0",
              y1: "1",
              x2: "0",
              y2: "0"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(unref(color)), (key) => {
                return openBlock(), createElementBlock("stop", {
                  key,
                  offset: key,
                  "stop-color": unref(color)[key]
                }, null, 8, _hoisted_515);
              }), 128))
            ], 8, _hoisted_423)
          ])) : createCommentVNode("", true),
          createBaseVNode("circle", {
            class: normalizeClass(`yc-progress-circle-bg`),
            fill: "none",
            cx: center.value,
            cy: center.value,
            r: radius.value,
            "stroke-width": pathStrokeWidth.value,
            style: normalizeStyle({
              stroke: _ctx.trackColor
            })
          }, null, 12, _hoisted_68),
          createBaseVNode("circle", {
            class: normalizeClass(`yc-progress-circle-bar`),
            fill: "none",
            cx: center.value,
            cy: center.value,
            r: radius.value,
            "stroke-width": strokeWidth.value,
            style: normalizeStyle({
              stroke: isLinearGradient.value ? `url(#${linearGradientId.value})` : unref(color),
              strokeDasharray: perimeter.value,
              strokeDashoffset: (_ctx.percent >= 1 ? 0 : 1 - _ctx.percent) * perimeter.value
            })
          }, null, 12, _hoisted_76)
        ], 8, _hoisted_254)),
        _ctx.showText && unref(size) !== "mini" ? (openBlock(), createElementBlock("div", _hoisted_85, [
          renderSlot(_ctx.$slots, "text", { percent: _ctx.percent }, () => [
            _ctx.status === "danger" ? (openBlock(), createBlock(unref(_sfc_main155), {
              key: 0,
              color: unref(TYPE_ICON_COLOR_MAP).error
            }, null, 8, ["color"])) : _ctx.status === "success" ? (openBlock(), createBlock(unref(_sfc_main5), {
              key: 1,
              color: unref(TYPE_ICON_COLOR_MAP).success
            }, null, 8, ["color"])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createTextVNode(toDisplayString(_ctx.text), 1)
            ], 64))
          ], true)
        ])) : createCommentVNode("", true)
      ], 12, _hoisted_179);
    };
  }
});

// node_modules/yc-design-vue/es/Progress/ProgressCircle.vue.js
var ProgressCircle = _export_sfc(_sfc_main156, [["__scopeId", "data-v-b83e3443"]]);

// node_modules/yc-design-vue/es/Progress/Progress.vue2.js
var _sfc_main157 = defineComponent({
  ...{
    name: "Progress"
  },
  __name: "Progress",
  props: {
    type: { default: "line" },
    size: { default: void 0 },
    percent: { default: 0 },
    steps: { default: 0 },
    animation: { type: Boolean, default: false },
    strokeWidth: {},
    width: {},
    color: {},
    trackColor: {},
    showText: { type: Boolean, default: true },
    status: { default: "normal" }
  },
  setup(__props) {
    const props = __props;
    const {
      steps,
      percent,
      width: _width,
      type: _type,
      status: _status,
      strokeWidth: _strokeWidth
    } = toRefs(props);
    const { size } = getGlobalConfig(props);
    const type = computed(() => steps.value > 0 ? "steps" : _type.value);
    const status = computed(() => {
      return _status.value || (percent.value >= 1 ? "success" : "normal");
    });
    const text = computed(() => `${(percent.value * 100).toFixed(0)}%`);
    const width = computed(() => {
      if (type.value == "steps" || type.value == "line" && size.value != "mini") {
        return _width.value;
      }
      const map = {
        mini: 16,
        small: 48,
        medium: 64,
        large: 80
      };
      return _width.value ?? map[size.value];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-progress",
          `yc-progress-type-${type.value}`,
          `yc-progress-size-${unref(size)}`,
          `yc-progress-status-${status.value}`
        ])
      }, [
        unref(steps) > 0 ? (openBlock(), createBlock(_sfc_main154, {
          key: 0,
          percent: unref(percent),
          size: unref(size),
          width: width.value,
          "stroke-width": _ctx.strokeWidth,
          text: text.value,
          "show-text": _ctx.showText,
          color: _ctx.color,
          "track-color": _ctx.trackColor,
          steps: unref(steps)
        }, createSlots({ _: 2 }, [
          _ctx.$slots.text ? {
            name: "text",
            fn: withCtx((scope) => [
              renderSlot(_ctx.$slots, "text", normalizeProps(guardReactiveProps(scope)), void 0, true)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["percent", "size", "width", "stroke-width", "text", "show-text", "color", "track-color", "steps"])) : type.value === "line" && unref(size) !== "mini" ? (openBlock(), createBlock(ProgressLine, {
          key: 1,
          width: width.value,
          size: unref(size),
          "stroke-width": _ctx.strokeWidth,
          color: _ctx.color,
          "track-color": _ctx.trackColor,
          text: text.value,
          "show-text": _ctx.showText,
          percent: unref(percent),
          status: status.value
        }, createSlots({ _: 2 }, [
          _ctx.$slots.text ? {
            name: "text",
            fn: withCtx((scope) => [
              renderSlot(_ctx.$slots, "text", normalizeProps(guardReactiveProps(scope)), void 0, true)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["width", "size", "stroke-width", "color", "track-color", "text", "show-text", "percent", "status"])) : (openBlock(), createBlock(ProgressCircle, {
          key: 2,
          type: type.value,
          percent: unref(percent),
          width: width.value,
          "stroke-width": type.value === "line" ? _ctx.strokeWidth || 4 : _ctx.strokeWidth,
          "path-stroke-width": type.value === "line" ? _ctx.strokeWidth || 4 : _ctx.strokeWidth,
          size: unref(size),
          "show-text": _ctx.showText,
          text: text.value,
          color: _ctx.color,
          "track-color": _ctx.trackColor,
          status: status.value
        }, createSlots({ _: 2 }, [
          _ctx.$slots.text ? {
            name: "text",
            fn: withCtx((scope) => [
              renderSlot(_ctx.$slots, "text", normalizeProps(guardReactiveProps(scope)), void 0, true)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["type", "percent", "width", "stroke-width", "path-stroke-width", "size", "show-text", "text", "color", "track-color", "status"]))
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Progress/Progress.vue.js
var _Progress = _export_sfc(_sfc_main157, [["__scopeId", "data-v-842ae8ac"]]);

// node_modules/yc-design-vue/es/Progress/index.js
var Progress = Object.assign(_Progress, {
  install: (app) => {
    app.component("Yc" + _Progress.name, _Progress);
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconFaceSmile.vue.js
var _sfc_main158 = defineComponent({
  __name: "IconFaceSmile",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", {
            fill: "currentColor",
            "fill-rule": "evenodd",
            stroke: "none",
            d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm7.321-26.873a2.625 2.625 0 1 1 0 5.25 2.625 2.625 0 0 1 0-5.25Zm-14.646 0a2.625 2.625 0 1 1 0 5.25 2.625 2.625 0 0 1 0-5.25Zm-.355 9.953a1.91 1.91 0 0 1 2.694.177 6.66 6.66 0 0 0 5.026 2.279c1.918 0 3.7-.81 4.961-2.206a1.91 1.91 0 0 1 2.834 2.558 10.476 10.476 0 0 1-7.795 3.466 10.477 10.477 0 0 1-7.897-3.58 1.91 1.91 0 0 1 .177-2.694Z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconStar.vue.js
var _sfc_main159 = defineComponent({
  __name: "IconStar",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", {
            d: "M22.683 5.415c.568-1.043 2.065-1.043 2.634 0l5.507 10.098a1.5 1.5 0 0 0 1.04.756l11.306 2.117c1.168.219 1.63 1.642.814 2.505l-7.902 8.359a1.5 1.5 0 0 0-.397 1.223l1.48 11.407c.153 1.177-1.058 2.057-2.131 1.548l-10.391-4.933a1.5 1.5 0 0 0-1.287 0l-10.39 4.933c-1.073.51-2.284-.37-2.131-1.548l1.48-11.407a1.5 1.5 0 0 0-.398-1.223L4.015 20.89c-.816-.863-.353-2.286.814-2.505l11.306-2.117a1.5 1.5 0 0 0 1.04-.756l5.508-10.098Z",
            fill: "currentColor",
            stroke: "none"
          }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Rate/index.vue2.js
var _hoisted_180 = ["onClick", "onMouseenter"];
var _hoisted_255 = ["onClick", "onMouseenter"];
var _sfc_main160 = defineComponent({
  ...{
    name: "Rate"
  },
  __name: "index",
  props: {
    count: { default: 5 },
    modelValue: { default: void 0 },
    defaultValue: { default: 0 },
    allowHalf: { type: Boolean, default: false },
    allowClear: { type: Boolean },
    grading: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    color: { default: "rgb(247, 186, 30)" }
  },
  emits: ["update:modelValue", "change", "hover-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      modelValue,
      defaultValue,
      readonly: readonly2,
      disabled,
      count,
      allowClear,
      color: _color
    } = toRefs(props);
    const chars = ref([]);
    let loading = false;
    const curHover = ref(0);
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
      }
    );
    const color = computed(() => {
      var _a;
      if (isObject2(_color.value)) {
        return ((_a = Object.entries(_color.value).find(
          ([key]) => curHover.value <= +key
        )) == null ? void 0 : _a[1]) ?? "rgb(247, 186, 30)";
      } else {
        return _color.value ?? "rgb(247, 186, 30)";
      }
    });
    const handleClick = async (index2) => {
      if (readonly2.value || disabled.value || loading) {
        return;
      }
      computedValue.value = allowClear.value && computedValue.value == index2 ? 0 : index2;
      emits("change", computedValue.value);
      loading = true;
      for (let i = 1; i <= count.value; i++) {
        if (i > computedValue.value) {
          continue;
        }
        const el = chars.value[i];
        el.classList.add("yc-rate-character-scale");
        await sleep(50);
        setTimeout(() => {
          el.classList.remove("yc-rate-character-scale");
        }, 150);
      }
      loading = false;
    };
    let timer;
    const handleMouseenter = (i) => {
      if (readonly2.value || disabled.value) return;
      if (timer) clearTimeout(timer);
      curHover.value = i;
      emits("hover-change", i);
    };
    const handleMouseleave = () => {
      if (readonly2.value || disabled.value) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        curHover.value = 0;
      }, 100);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-rate",
          {
            "yc-rate-disabled": unref(disabled),
            "yc-rate-readonly": unref(readonly2)
          }
        ])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(count), (i) => {
          return openBlock(), createElementBlock("div", {
            key: i,
            class: "yc-rate-character",
            ref_for: true,
            ref: (el) => chars.value[i] = el
          }, [
            _ctx.allowHalf ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "yc-rate-character-left",
              style: normalizeStyle({
                color: i - 0.5 <= unref(computedValue) && !curHover.value || i - 0.5 <= curHover.value ? color.value : ""
              }),
              onClick: withModifiers(($event) => handleClick(i - 0.5), ["stop"]),
              onMouseenter: ($event) => handleMouseenter(i - 0.5),
              onMouseleave: handleMouseleave
            }, [
              renderSlot(_ctx.$slots, "character", { index: i }, () => [
                _ctx.grading ? (openBlock(), createBlock(unref(_sfc_main158), { key: 0 })) : (openBlock(), createBlock(unref(_sfc_main159), { key: 1 }))
              ], true)
            ], 44, _hoisted_180)) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: "yc-rate-character-right",
              style: normalizeStyle({
                color: i <= unref(computedValue) && !curHover.value || i <= curHover.value ? color.value : ""
              }),
              onClick: ($event) => handleClick(i),
              onMouseenter: ($event) => handleMouseenter(i),
              onMouseleave: handleMouseleave
            }, [
              renderSlot(_ctx.$slots, "character", { index: i }, () => [
                _ctx.grading ? (openBlock(), createBlock(unref(_sfc_main158), { key: 0 })) : (openBlock(), createBlock(unref(_sfc_main159), { key: 1 }))
              ], true)
            ], 44, _hoisted_255)
          ]);
        }), 128))
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Rate/index.vue.js
var _Rate = _export_sfc(_sfc_main160, [["__scopeId", "data-v-18dacb32"]]);

// node_modules/yc-design-vue/es/Rate/index.js
var Rate = Object.assign(_Rate, {
  install: (app) => {
    app.component("Yc" + _Rate.name, _Rate);
  }
});

// node_modules/yc-design-vue/es/Result/index.vue2.js
var _hoisted_181 = { class: "yc-result" };
var _hoisted_256 = { class: "yc-result-icon-tip" };
var _hoisted_336 = ["src"];
var _hoisted_424 = {
  key: 1,
  class: "yc-result-title"
};
var _hoisted_516 = {
  key: 2,
  class: "yc-result-subtitle"
};
var _hoisted_69 = {
  key: 3,
  class: "yc-result-extra"
};
var _hoisted_77 = {
  key: 4,
  class: "yc-result-content"
};
var _sfc_main161 = defineComponent({
  ...{
    name: "Result"
  },
  __name: "index",
  props: {
    status: { default: "info" },
    title: { default: "" },
    subtitle: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const { status } = toRefs(props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_181, [
        _ctx.$slots.icon || unref(status) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["yc-result-icon", `yc-result-icon-${unref(status)}`])
        }, [
          createBaseVNode("div", _hoisted_256, [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              unref(status) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                ["403", "404", "500"].includes(unref(status)) ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: unref(TYPE_ICON_MAP)[`result-${unref(status)}`]
                }, null, 8, _hoisted_336)) : (openBlock(), createBlock(resolveDynamicComponent(unref(TYPE_ICON_MAP)[`result-${unref(status)}`]), { key: 1 }))
              ], 64)) : createCommentVNode("", true)
            ], true)
          ])
        ], 2)) : createCommentVNode("", true),
        _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_424, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(_ctx.title), 1)
          ], true)
        ])) : createCommentVNode("", true),
        _ctx.$slots.subtitle || _ctx.subtitle ? (openBlock(), createElementBlock("div", _hoisted_516, [
          renderSlot(_ctx.$slots, "subtitle", {}, () => [
            createTextVNode(toDisplayString(_ctx.subtitle), 1)
          ], true)
        ])) : createCommentVNode("", true),
        _ctx.$slots.extra ? (openBlock(), createElementBlock("div", _hoisted_69, [
          renderSlot(_ctx.$slots, "extra", {}, void 0, true)
        ])) : createCommentVNode("", true),
        _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_77, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Result/index.vue.js
var _Result = _export_sfc(_sfc_main161, [["__scopeId", "data-v-c5a501a4"]]);

// node_modules/yc-design-vue/es/Result/index.js
var Result = Object.assign(_Result, {
  install: (app) => {
    app.component("Yc" + _Result.name, _Result);
  }
});

// node_modules/yc-design-vue/es/Skeleton/Skeleton.vue.js
var _sfc_main162 = defineComponent({
  ...{
    name: "Skeleton"
  },
  __name: "Skeleton",
  props: {
    animation: { type: Boolean, default: false },
    loading: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const { animation, loading } = toRefs(props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-skeleton",
          {
            "yc-skeleton-animation": unref(animation)
          }
        ])
      }, [
        renderSlot(_ctx.$slots, unref(loading) ? "default" : "content")
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Skeleton/SkeletonShape.vue2.js
var _sfc_main163 = defineComponent({
  ...{
    name: "SkeletonShape"
  },
  __name: "SkeletonShape",
  props: {
    shape: { default: "sqaure" },
    size: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { size } = getGlobalConfig(props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-skeleton-shape",
          `yc-skeleton-shape-shape-${_ctx.shape}`,
          `yc-skeleton-shape-size-${unref(size)}`
        ])
      }, null, 2);
    };
  }
});

// node_modules/yc-design-vue/es/Skeleton/SkeletonShape.vue.js
var SkeletonShape = _export_sfc(_sfc_main163, [["__scopeId", "data-v-24b69272"]]);

// node_modules/yc-design-vue/es/Skeleton/SkeletonLine.vue2.js
var _sfc_main164 = defineComponent({
  ...{
    name: "SkeletonLine"
  },
  __name: "SkeletonLine",
  props: {
    rows: { default: 1 },
    widths: { default: () => [] },
    lineHeight: { default: 20 },
    lineSpacing: { default: 15 }
  },
  setup(__props) {
    const props = __props;
    const { lineSpacing } = toRefs(props);
    const gap = computed(() => valueToPx(lineSpacing.value));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "yc-skeleton-line",
        style: normalizeStyle({
          gap: gap.value
        })
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.rows, (i) => {
          return openBlock(), createElementBlock("div", {
            class: "yc-skeleton-line-row",
            key: i,
            style: normalizeStyle({
              height: unref(valueToPx)(_ctx.lineHeight),
              width: _ctx.widths[i] ? unref(valueToPx)(_ctx.widths[i]) : "100%"
            })
          }, null, 4);
        }), 128))
      ], 4);
    };
  }
});

// node_modules/yc-design-vue/es/Skeleton/SkeletonLine.vue.js
var SkeletonLine = _export_sfc(_sfc_main164, [["__scopeId", "data-v-963b904e"]]);

// node_modules/yc-design-vue/es/Skeleton/index.js
var Skeleton = Object.assign(_sfc_main162, {
  shape: SkeletonShape,
  line: SkeletonLine,
  install: (app) => {
    app.component("Yc" + _sfc_main162.name, _sfc_main162);
    app.component("Yc" + SkeletonShape.name, SkeletonShape);
    app.component("Yc" + SkeletonLine.name, SkeletonLine);
  }
});

// node_modules/yc-design-vue/es/Slider/hooks/useContext.js
var SLIDER_CONTEXT_KEY = "slider-context";
var useContext21 = () => {
  const provide$1 = (props, emits, trackRef) => {
    const {
      modelValue,
      defaultValue,
      step,
      min,
      max,
      direction,
      disabled,
      range,
      showTooltip,
      marks: _marks
    } = toRefs(props);
    const { formatTooltip } = props;
    const computedValue = useControlValue(
      modelValue,
      range.value && !isArray(defaultValue.value) ? [0, 0] : defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
        emits("change", val);
      }
    );
    const startValue = computed({
      get() {
        return range.value ? computedValue.value[0] : computedValue.value;
      },
      set(val) {
        if (range.value) {
          computedValue.value[0] = val;
        } else {
          computedValue.value = val;
        }
        tempStartValue.value = val;
      }
    });
    const tempStartValue = ref(startValue.value);
    const endValue = computed({
      get() {
        return range.value ? computedValue.value[1] : computedValue.value;
      },
      set(val) {
        if (range.value) {
          computedValue.value[1] = val;
        } else {
          computedValue.value = val;
        }
        tempEndValue.value = val;
      }
    });
    const tempEndValue = ref(endValue.value);
    const ticks = computed(() => {
      const digit = getDecimalPlaces(step.value);
      const result = [];
      for (let i = 1; i < Math.floor(max.value / step.value); i++) {
        const value = +(i * step.value).toFixed(digit);
        result.push({
          label: value,
          value
        });
      }
      return result;
    });
    const marks = computed(() => {
      return Object.entries(_marks.value).map(([key, value]) => {
        return {
          value: +key,
          label: value
        };
      });
    });
    function getDecimalPlaces(num) {
      const str = num.toString();
      const decimalIndex = str.indexOf(".");
      return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
    }
    function normalizeValue(value) {
      const totalSteps = (max.value - min.value) / step.value;
      const currentStep = (value - min.value) / step.value;
      const normalized = currentStep / totalSteps * 100;
      return Math.round(normalized);
    }
    function denormalizeValue(value) {
      const totalSteps = (max.value - min.value) / step.value;
      const stepPosition = value / 100 * totalSteps;
      const exactValue = min.value + stepPosition * step.value;
      const digit = getDecimalPlaces(step.value);
      return +(Math.round(exactValue / step.value) * step.value).toFixed(digit);
    }
    provide(SLIDER_CONTEXT_KEY, {
      startValue,
      endValue,
      tempStartValue,
      tempEndValue,
      range,
      min,
      max,
      step,
      showTooltip,
      disabled,
      direction,
      trackRef,
      formatTooltip,
      normalizeValue,
      denormalizeValue
    });
    return {
      range,
      direction,
      startValue,
      endValue,
      tempStartValue,
      tempEndValue,
      computedValue,
      ticks,
      marks,
      min,
      max,
      normalizeValue
    };
  };
  const inject$1 = () => {
    return inject(SLIDER_CONTEXT_KEY, {
      startValue: ref(0),
      endValue: ref(0),
      tempEndValue: ref(0),
      tempStartValue: ref(0),
      range: ref(false),
      min: ref(0),
      max: ref(0),
      step: ref(0),
      direction: ref("horizontal"),
      disabled: ref(false),
      showTooltip: ref(true),
      trackRef: ref(),
      normalizeValue: (value) => {
        return value;
      },
      denormalizeValue: (value) => {
        return value;
      }
    });
  };
  return {
    inject: inject$1,
    provide: provide$1
  };
};

// node_modules/yc-design-vue/es/Slider/SliderTicks.vue2.js
var _hoisted_182 = ["onClick"];
var _sfc_main165 = defineComponent({
  __name: "SliderTicks",
  props: {
    type: {},
    data: {}
  },
  emits: ["labelClick"],
  setup(__props) {
    const props = __props;
    const { type } = toRefs(props);
    const { min, max, startValue, endValue, range, direction, normalizeValue } = useContext21().inject();
    const getPosition = (value) => {
      const curValue = normalizeValue(value);
      if (type.value == "ticks") {
        return `calc(${curValue}% - 0.5px)`;
      } else if (type.value == "dots") {
        return `calc(${curValue}% - 4px)`;
      } else {
        return `calc(${curValue}% - 7px)`;
      }
    };
    const isInRange = (value) => {
      const curValue = normalizeValue(value);
      const start2 = normalizeValue(startValue.value);
      const end = normalizeValue(endValue.value);
      const rangeMin = normalizeValue(min.value);
      const rangeMax = normalizeValue(max.value);
      if (!range.value) {
        return start2 >= curValue && curValue >= rangeMin && curValue <= rangeMax;
      } else {
        const minVal = Math.min(start2, end);
        const maxVal = Math.max(start2, end);
        return curValue >= minVal && curValue <= maxVal;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([`yc-slider-${unref(type)}`])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, ({ label, value }) => {
          return openBlock(), createElementBlock("span", {
            key: value,
            style: normalizeStyle({
              left: unref(direction) == "horizontal" ? getPosition(value) : "",
              bottom: unref(direction) == "vertical" ? getPosition(value) : ""
            }),
            class: normalizeClass([
              `yc-slider-${unref(type).replace("s", "")}`,
              {
                "yc-slider-dot-active": unref(type) == "dots" && isInRange(value),
                "yc-slider-tick-active": unref(type) == "ticks" && isInRange(value)
              }
            ]),
            onClick: ($event) => _ctx.$emit("labelClick", value)
          }, toDisplayString(unref(type) == "marks" ? label : ""), 15, _hoisted_182);
        }), 128))
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Slider/SliderTicks.vue.js
var SliderTicks = _export_sfc(_sfc_main165, [["__scopeId", "data-v-fc1f66f9"]]);

// node_modules/yc-design-vue/es/Slider/hooks/useSliderDraggable.js
var useSliderDraggable = (params) => {
  const {
    trackRef,
    triggerRef,
    computedValue,
    direction,
    max,
    min,
    step,
    disabled,
    normalizeValue,
    denormalizeValue
  } = params;
  const { x, y, isDragging } = useDraggable(triggerRef, {
    disabled,
    onMove() {
      const { minTop, maxTop, minLeft, maxLeft } = moveRange;
      let value;
      if (direction.value == "vertical") {
        y.value = y.value > minTop ? minTop : y.value;
        y.value = y.value < maxTop ? maxTop : y.value;
        value = calcValueFromPosition(y.value);
      } else {
        x.value = x.value < minLeft ? minLeft : x.value;
        x.value = x.value > maxLeft ? maxLeft : x.value;
        value = calcValueFromPosition(x.value);
      }
      value = denormalizeValue(value);
      setPositionFromValue(value);
      if (value == computedValue.value) {
        return;
      }
      computedValue.value = value;
    }
  });
  const normalizeMax = computed(() => normalizeValue(max.value));
  const normalizeStep = computed(() => normalizeValue(step.value));
  const position = reactive({
    bottom: 0,
    left: 0,
    top: 0,
    right: 0
  });
  const moveRange = reactive({
    minLeft: 0,
    maxLeft: 0,
    minTop: 0,
    maxTop: 0
  });
  const calcValueFromPosition = (distance) => {
    const {
      left: sliderLeft,
      bottom: sliderBottom,
      width: sliderWidth,
      height: sliderHeight
    } = trackRef.value.getBoundingClientRect();
    const rate = direction.value == "vertical" ? (sliderBottom - distance) / sliderHeight * normalizeMax.value : (distance - sliderLeft) / sliderWidth * normalizeMax.value;
    return Math.floor(rate / normalizeStep.value) * normalizeStep.value;
  };
  const calcPositionFromValue = (distance) => {
    distance = normalizeValue(distance);
    const {
      left: sliderLeft,
      bottom: sliderBottom,
      width: sliderWidth,
      height: sliderHeight
    } = trackRef.value.getBoundingClientRect();
    distance = Math.floor(distance / normalizeStep.value) * normalizeStep.value;
    return direction.value == "vertical" ? sliderBottom - distance / normalizeMax.value * sliderHeight : distance / normalizeMax.value * sliderWidth + sliderLeft;
  };
  const setPositionFromValue = (distance) => {
    distance = normalizeValue(distance);
    const { width: sliderWidth, height: sliderHeight } = trackRef.value.getBoundingClientRect();
    const translateY = normalizeValue(computedValue.value) / normalizeMax.value * sliderHeight;
    const translateX = normalizeValue(computedValue.value) / normalizeMax.value * sliderWidth;
    if (direction.value == "vertical") {
      position.top = 100 - distance;
      position.bottom = distance;
      position.transform = `translate(-50%,calc(${valueToPx(-translateY)} + 50%))`;
    } else {
      position.left = distance;
      position.right = 100 - distance;
      position.transform = `translate(calc(${valueToPx(translateX)} - 50%),-50%)`;
    }
  };
  watch(
    [min, max],
    async () => {
      await nextTick();
      moveRange.minTop = calcPositionFromValue(min.value);
      moveRange.maxTop = calcPositionFromValue(max.value);
      moveRange.minLeft = calcPositionFromValue(min.value);
      moveRange.maxLeft = calcPositionFromValue(max.value);
      if (computedValue.value > max.value) {
        computedValue.value = max.value;
      } else if (computedValue.value < min.value) {
        computedValue.value = min.value;
      }
      setPositionFromValue(computedValue.value);
    },
    {
      immediate: true
    }
  );
  watch(
    () => computedValue.value,
    async (v) => {
      if (isDragging.value) {
        return;
      }
      await nextTick();
      setPositionFromValue(v);
    }
  );
  return {
    isDragging,
    position
  };
};

// node_modules/yc-design-vue/es/Slider/SliderBtn.vue2.js
var _sfc_main166 = defineComponent({
  __name: "SliderBtn",
  props: {
    type: {},
    position: {}
  },
  emits: ["update:position"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { type } = toRefs(props);
    const triggerRef = ref();
    const {
      trackRef,
      min,
      max,
      direction,
      disabled,
      step,
      showTooltip,
      startValue,
      endValue,
      formatTooltip,
      normalizeValue,
      denormalizeValue
    } = useContext21().inject();
    const computedValue = computed({
      get() {
        return type.value == "start" ? startValue.value : endValue.value;
      },
      set(val) {
        if (type.value == "start") {
          startValue.value = val;
        } else {
          endValue.value = val;
        }
      }
    });
    const { position, isDragging } = useSliderDraggable({
      trackRef,
      triggerRef,
      computedValue,
      direction,
      step,
      min,
      max,
      disabled,
      denormalizeValue,
      normalizeValue
    });
    const computedVisible = useControlValue(
      ref(),
      false,
      () => {
      },
      (val) => {
        return isDragging.value || val;
      }
    );
    watch(position, () => {
      emits("update:position", position);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Tooltip), {
        "popup-visible": unref(computedVisible),
        "onUpdate:popupVisible": _cache[0] || (_cache[0] = ($event) => isRef(computedVisible) ? computedVisible.value = $event : null),
        disabled: !unref(showTooltip),
        position: unref(direction) == "vertical" ? "right" : "bottom",
        content: unref(formatTooltip) ? unref(formatTooltip)(computedValue.value) : String(computedValue.value)
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: "yc-slider-btn",
            ref_key: "triggerRef",
            ref: triggerRef,
            style: normalizeStyle({
              transform: unref(position).transform
            })
          }, null, 4)
        ]),
        _: 1
      }, 8, ["popup-visible", "disabled", "position", "content"]);
    };
  }
});

// node_modules/yc-design-vue/es/Slider/SliderBtn.vue.js
var SliderBtn = _export_sfc(_sfc_main166, [["__scopeId", "data-v-9135a42c"]]);

// node_modules/yc-design-vue/es/Slider/SliderInput.vue2.js
var _sfc_main167 = defineComponent({
  __name: "SliderInput",
  props: {
    type: {}
  },
  setup(__props) {
    const props = __props;
    const { type } = toRefs(props);
    const {
      min,
      max,
      disabled,
      startValue,
      endValue,
      tempStartValue,
      tempEndValue
    } = useContext21().inject();
    const computedValue = computed({
      get() {
        return type.value == "start" ? tempStartValue.value : tempEndValue.value;
      },
      set(val) {
        if (type.value == "start") {
          tempStartValue.value = val;
        } else {
          tempEndValue.value = val;
        }
      }
    });
    const handleSet = () => {
      if (type.value == "start") {
        startValue.value = computedValue.value;
      } else {
        endValue.value = computedValue.value;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(InputNumber), {
        modelValue: computedValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => computedValue.value = $event),
        min: unref(min),
        max: unref(max),
        disabled: unref(disabled),
        "hide-button": "",
        onBlur: handleSet,
        onPressEnter: handleSet
      }, null, 8, ["modelValue", "min", "max", "disabled"]);
    };
  }
});

// node_modules/yc-design-vue/es/Slider/SliderInput.vue.js
var SliderInput = _export_sfc(_sfc_main167, [["__scopeId", "data-v-1666bdc8"]]);

// node_modules/yc-design-vue/es/Slider/Slider.vue2.js
var _hoisted_183 = ["aria-disabled"];
var _hoisted_257 = {
  key: 0,
  class: "yc-slider-input"
};
var _hoisted_337 = {
  key: 0,
  class: "yc-slider-input-divider"
};
var _sfc_main168 = defineComponent({
  ...{
    name: "Slider"
  },
  __name: "Slider",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: 0 },
    step: { default: 1 },
    min: { default: 0 },
    marks: { default: () => {
      return {};
    } },
    max: { default: 100 },
    direction: { default: "horizontal" },
    disabled: { type: Boolean, default: false },
    showTicks: { type: Boolean, default: false },
    showInput: { type: Boolean, default: false },
    range: { type: Boolean, default: false },
    showTooltip: { type: Boolean, default: true },
    formatTooltip: { type: Function, default: (val) => {
      return val + "";
    } }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const trackRef = ref();
    const { ticks, marks, range, direction, min, normalizeValue } = useContext21().provide(props, emits, trackRef);
    const startPosition = ref({
      bottom: 0,
      left: 0,
      top: 0,
      right: 0
    });
    const endPosition = ref({
      bottom: 0,
      left: 0,
      top: 0,
      right: 0
    });
    const position = computed(() => {
      const { left, right, top, bottom } = startPosition.value;
      if (!range.value) {
        return direction.value == "vertical" ? {
          top: top + "%",
          bottom: normalizeValue(min.value) + "%"
        } : {
          left: normalizeValue(min.value) + "%",
          right: right + "%"
        };
      }
      const {
        left: left1,
        right: right1,
        top: top1,
        bottom: bottom1
      } = endPosition.value;
      return direction.value == "vertical" ? {
        top: `${top < top1 ? top : top1}%`,
        bottom: `${bottom < bottom1 ? bottom : bottom1}%`
      } : {
        left: `${left < left1 ? left : left1}%`,
        right: `${right < right1 ? right : right1}%`
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-slider",
          `yc-slider-direction-${unref(direction)}`,
          {
            "yc-slider-disabled": _ctx.disabled
          }
        ])
      }, [
        createBaseVNode("div", {
          class: "yc-slider-track",
          ref_key: "trackRef",
          ref: trackRef
        }, [
          _ctx.showTicks ? (openBlock(), createBlock(SliderTicks, {
            key: 0,
            type: "ticks",
            data: unref(ticks)
          }, null, 8, ["data"])) : createCommentVNode("", true),
          unref(marks).length ? (openBlock(), createBlock(SliderTicks, {
            key: 1,
            type: "dots",
            data: unref(marks)
          }, null, 8, ["data"])) : createCommentVNode("", true),
          unref(marks).length ? (openBlock(), createBlock(SliderTicks, {
            key: 2,
            type: "marks",
            data: unref(marks)
          }, null, 8, ["data"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: "yc-slider-bar",
            role: "slider",
            tabindex: "0",
            "aria-disabled": _ctx.disabled,
            style: normalizeStyle(position.value)
          }, null, 12, _hoisted_183),
          createVNode(SliderBtn, {
            position: startPosition.value,
            "onUpdate:position": _cache[0] || (_cache[0] = ($event) => startPosition.value = $event),
            type: "start"
          }, null, 8, ["position"]),
          unref(range) ? (openBlock(), createBlock(SliderBtn, {
            key: 3,
            position: endPosition.value,
            "onUpdate:position": _cache[1] || (_cache[1] = ($event) => endPosition.value = $event),
            type: "end"
          }, null, 8, ["position"])) : createCommentVNode("", true)
        ], 512),
        _ctx.showInput ? (openBlock(), createElementBlock("div", _hoisted_257, [
          createVNode(SliderInput, { type: "start" }),
          unref(range) ? (openBlock(), createElementBlock("div", _hoisted_337)) : createCommentVNode("", true),
          unref(range) ? (openBlock(), createBlock(SliderInput, {
            key: 1,
            type: "end"
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Slider/Slider.vue.js
var _Slider = _export_sfc(_sfc_main168, [["__scopeId", "data-v-66ebd5c2"]]);

// node_modules/yc-design-vue/es/Slider/index.js
var Slider = Object.assign(_Slider, {
  install: (app) => {
    app.component("Yc" + _Slider.name, _Slider);
  }
});

// node_modules/yc-design-vue/es/Space/index.vue2.js
var _hoisted_184 = { class: "yc-space-item" };
var _hoisted_258 = {
  key: 0,
  class: "yc-space-split"
};
var _sfc_main169 = defineComponent({
  ...{
    name: "Space"
  },
  __name: "index",
  props: {
    align: { default: void 0 },
    direction: { default: "horizontal" },
    wrap: { type: Boolean, default: false },
    fill: { type: Boolean, default: false },
    size: { default: "small" }
  },
  setup(__props) {
    const slots = useSlots();
    const props = __props;
    const { size, direction, align: _align } = toRefs(props);
    const gap = computed(() => {
      const map = {
        mini: 4,
        small: 8,
        medium: 16,
        large: 24
      };
      return valueToPx(isNumber(size.value) ? size.value : map[size.value]);
    });
    const align = computed(() => {
      if (!isUndefined(_align.value)) {
        return _align.value;
      }
      return direction.value == "horizontal" ? "center" : "start";
    });
    const nodes = computed(() => {
      var _a;
      if (!slots.split) return [];
      const result = [];
      (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).forEach((node) => {
        if (node.type === Fragment) {
          result.push(...node.children);
        } else if (node.type !== Comment) {
          result.push(node);
        }
      });
      return result;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-space",
          `yc-space-align-${align.value}`,
          `yc-space-direction-${unref(direction)}`,
          {
            "yc-space-wrap": _ctx.wrap,
            "yc-space-fill": _ctx.fill
          }
        ]),
        style: normalizeStyle({
          gap: gap.value
        })
      }, [
        !_ctx.$slots.split ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(nodes.value, (node, i) => {
          return openBlock(), createElementBlock(Fragment, { key: i }, [
            createBaseVNode("div", _hoisted_184, [
              (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(node))))
            ]),
            i < nodes.value.length - 1 ? (openBlock(), createElementBlock("div", _hoisted_258, [
              renderSlot(_ctx.$slots, "split", {}, void 0, true)
            ])) : createCommentVNode("", true)
          ], 64);
        }), 128))
      ], 6);
    };
  }
});

// node_modules/yc-design-vue/es/Space/index.vue.js
var _Space = _export_sfc(_sfc_main169, [["__scopeId", "data-v-7a9a36b0"]]);

// node_modules/yc-design-vue/es/Space/index.js
var Space = Object.assign(_Space, {
  install: (app) => {
    app.component("Yc" + _Space.name, _Space);
  }
});

// node_modules/yc-design-vue/es/Split/index.vue2.js
var _hoisted_185 = { class: "yc-split-trigger-icon-wrapper" };
var _hoisted_259 = { class: "yc-split-trigger-icon" };
var _hoisted_338 = { class: "yc-split-pane yc-split-pane-second" };
var _sfc_main170 = defineComponent({
  ...{
    name: "Split"
  },
  __name: "index",
  props: {
    component: { default: "div" },
    direction: { default: "horizontal" },
    size: { default: void 0 },
    defaultSize: { default: 0.5 },
    min: { default: 0 },
    max: { default: 1 },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:size", "moving-start", "moving", "moving-end"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { size, defaultSize, direction, min, max } = toRefs(props);
    const computedSize = useControlValue(
      size,
      defaultSize.value,
      (val) => {
        emits("update:size", val);
      }
    );
    const rate = computed(() => {
      const value = isNumber(computedSize.value) ? computedSize.value : getRate(computedSize.value);
      return `${value * 100}%`;
    });
    const splitRef = ref();
    const triggerRef = ref();
    const triggerSize = computed(() => {
      var _a, _b;
      const size2 = direction.value == "horizontal" ? (_a = triggerRef.value) == null ? void 0 : _a.offsetWidth : (_b = triggerRef.value) == null ? void 0 : _b.offsetHeight;
      return size2 ?? 6;
    });
    const splitSize = computed(() => {
      var _a;
      const rect = (_a = splitRef.value) == null ? void 0 : _a.getBoundingClientRect();
      const size2 = direction.value == "horizontal" ? rect == null ? void 0 : rect.width : rect == null ? void 0 : rect.height;
      return size2 ?? 0;
    });
    const { isDragging, x, y } = useDraggable(triggerRef, {
      onMove() {
        emits("moving");
        const { left, top } = splitRef.value.getBoundingClientRect();
        const pos = direction.value == "horizontal" ? left : top;
        const minValue = pos + getValue(min.value);
        const maxValue = pos + getValue(max.value) - triggerSize.value;
        let value = "";
        if (direction.value == "horizontal") {
          x.value = x.value < minValue ? minValue : x.value;
          x.value = x.value > maxValue ? maxValue : x.value;
          value = `${x.value - left}px`;
        } else {
          y.value = y.value < minValue ? minValue : y.value;
          y.value = y.value > maxValue ? maxValue : y.value;
          value = `${y.value - top}px`;
        }
        computedSize.value = isNumber(computedSize.value) ? getRate(value) : value;
      },
      onStart() {
        emits("moving-start");
      },
      onEnd() {
        emits("moving-end");
      }
    });
    const getValue = (value) => {
      return isNumber(value) ? value * splitSize.value : Number.parseFloat(value);
    };
    const getRate = (value) => {
      return Number.parseFloat(value) / splitSize.value;
    };
    watch(
      () => computedSize.value,
      async (val) => {
        if (isDragging.value) return;
        await sleep(0);
        const { left, top } = splitRef.value.getBoundingClientRect();
        x.value = left + getValue(val);
        y.value = top + getValue(val);
      },
      {
        immediate: true
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.component), {
        class: normalizeClass(["yc-split", `yc-split-direction-${unref(direction)}`]),
        ref_key: "splitRef",
        ref: splitRef
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: "yc-split-pane yc-split-pane-first",
            style: normalizeStyle({
              flex: `0 0 calc(${rate.value} - ${unref(valueToPx)(triggerSize.value / 2)}`
            })
          }, [
            renderSlot(_ctx.$slots, "first", {}, void 0, true)
          ], 4),
          createBaseVNode("div", {
            class: "yc-split-trigger",
            ref_key: "triggerRef",
            ref: triggerRef
          }, [
            renderSlot(_ctx.$slots, "resize-trigger", {}, () => [
              createBaseVNode("div", _hoisted_185, [
                createBaseVNode("div", _hoisted_259, [
                  renderSlot(_ctx.$slots, "resize-trigger-icon", {}, () => [
                    createVNode(unref(_sfc_main120), {
                      rotate: unref(direction) == "horizontal" ? 90 : 0,
                      size: 12
                    }, null, 8, ["rotate"])
                  ], true)
                ])
              ])
            ], true)
          ], 512),
          createBaseVNode("div", _hoisted_338, [
            renderSlot(_ctx.$slots, "second", {}, void 0, true)
          ])
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});

// node_modules/yc-design-vue/es/Split/index.vue.js
var _Split = _export_sfc(_sfc_main170, [["__scopeId", "data-v-23202c6e"]]);

// node_modules/yc-design-vue/es/Split/index.js
var Split = Object.assign(_Split, {
  install: (app) => {
    app.component("Yc" + _Split.name, _Split);
  }
});

// node_modules/yc-design-vue/es/Statistic/Statistic.vue2.js
var _hoisted_186 = { class: "yc-statistic yc-statistic-countdown" };
var _hoisted_260 = {
  key: 0,
  class: "yc-statistic-title"
};
var _hoisted_339 = { class: "yc-statistic-content" };
var _hoisted_425 = {
  key: 0,
  class: "yc-statistic-prefix"
};
var _hoisted_517 = {
  key: 1,
  class: "yc-statistic-suffix"
};
var _hoisted_610 = {
  key: 0,
  class: "yc-statistic-extra"
};
var _sfc_main171 = defineComponent({
  ...{
    name: "Statistic"
  },
  __name: "Statistic",
  props: {
    title: { default: "" },
    value: { default: 0 },
    format: { default: "HH:mm:ss" },
    extra: { default: "" },
    start: { type: Boolean, default: true },
    easeing: { default: "quadOut" },
    precision: { default: 0 },
    separator: { default: "" },
    showGroupSeparator: { type: Boolean, default: false },
    animation: { type: Boolean, default: false },
    animationDuration: { default: 2e3 },
    valueFrom: { default: void 0 },
    placeholder: { default: "" },
    valueStyle: { default: () => {
      return {};
    } },
    isCountdown: { type: Boolean, default: false }
  },
  emits: ["finish"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      value,
      precision,
      format,
      start: start2,
      valueFrom,
      placeholder,
      animation,
      animationDuration,
      easeing,
      isCountdown
    } = toRefs(props);
    const valueRef = ref();
    const showValue = computed(() => {
      return isUndefined(value.value) ? placeholder.value : getFormatValue(value.value);
    });
    watch(
      [start2, animation, valueFrom, value],
      () => {
        if (!start2.value || !animation.value || isUndefined(valueFrom.value) || !isNumber(value.value) || valueFrom.value - value.value == 0) {
          return;
        }
        const between = new Tween({
          from: {
            textContent: valueFrom.value
          },
          to: {
            textContent: value.value
          },
          duration: animationDuration.value,
          easeing: easeing.value,
          onUpdate: (current) => {
            valueRef.value.textContent = getFormatValue(current.textContent);
          },
          onFinish() {
            emits("finish");
          }
        });
        between.start();
      },
      {
        immediate: true
      }
    );
    function getFormatValue(value2) {
      if (isNumber(value2) && !isCountdown.value) {
        return value2.toFixed(precision.value);
      }
      if (isCountdown.value) {
        return formatSeconds(value2, format.value);
      }
      return formatDate(value2, format.value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_186, [
        _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_260, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(_ctx.title), 1)
          ], true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_339, [
          createBaseVNode("div", {
            class: "yc-statistic-value",
            style: normalizeStyle(_ctx.valueStyle)
          }, [
            _ctx.$slots.prefix ? (openBlock(), createElementBlock("span", _hoisted_425, [
              renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
            ])) : createCommentVNode("", true),
            createBaseVNode("span", {
              class: "yc-statistic-value-integer",
              ref_key: "valueRef",
              ref: valueRef
            }, [
              renderSlot(_ctx.$slots, "value", {}, () => [
                createTextVNode(toDisplayString(showValue.value), 1)
              ], true)
            ], 512),
            _ctx.$slots.suffix ? (openBlock(), createElementBlock("span", _hoisted_517, [
              renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
            ])) : createCommentVNode("", true)
          ], 4),
          _ctx.$slots.extra || _ctx.extra ? (openBlock(), createElementBlock("div", _hoisted_610, [
            renderSlot(_ctx.$slots, "extra", {}, () => [
              createTextVNode(toDisplayString(_ctx.extra), 1)
            ], true)
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Statistic/Statistic.vue.js
var _Statistic = _export_sfc(_sfc_main171, [["__scopeId", "data-v-86198234"]]);

// node_modules/yc-design-vue/es/Statistic/Countdown.vue.js
var _sfc_main172 = defineComponent({
  ...{
    name: "Countdown"
  },
  __name: "Countdown",
  props: {
    title: { default: "" },
    value: { default: void 0 },
    now: { default: void 0 },
    format: { default: "HH:mm:ss" },
    start: { type: Boolean, default: true },
    easeing: { default: "quadOut" },
    valueStyle: { default: () => {
      return {};
    } }
  },
  emits: ["finish"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { value: _value, now: _now, format, start: start2 } = toRefs(props);
    const value = ref(0);
    const now = ref(0);
    const startValue = ref(value.value);
    const animation = ref(false);
    const handleFinish = () => {
      if (startValue.value - 1e3 <= 0) {
        animation.value = false;
        return emits("finish");
      }
      startValue.value -= 1e3;
    };
    watch(
      () => start2.value,
      async (val) => {
        if (!animation.value) {
          value.value = isUndefined(_value.value) ? Date.now() + 5 * 60 * 1e3 : _value.value;
          now.value = isUndefined(_now.value) ? Date.now() : _now.value;
          startValue.value = value.value - now.value;
        }
        if (!val) return;
        await sleep(0);
        animation.value = true;
      },
      {
        immediate: true
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_Statistic, {
        title: _ctx.title,
        value: startValue.value - 1e3,
        "value-from": startValue.value,
        start: unref(start2),
        animation: animation.value,
        format: unref(format),
        "value-style": _ctx.valueStyle,
        easeing: _ctx.easeing,
        "animation-duration": 1e3,
        "is-countdown": "",
        onFinish: handleFinish
      }, {
        value: withCtx(() => [
          createTextVNode(toDisplayString(unref(formatSeconds)(value.value - now.value, unref(format))), 1)
        ]),
        _: 1
      }, 8, ["title", "value", "value-from", "start", "animation", "format", "value-style", "easeing"]);
    };
  }
});

// node_modules/yc-design-vue/es/Statistic/index.js
var Statistic = Object.assign(_Statistic, {
  countdown: _sfc_main172,
  install: (app) => {
    app.component("Yc" + _Statistic.name, _Statistic);
    app.component("Yc" + _sfc_main172.name, _sfc_main172);
  }
});

// node_modules/yc-design-vue/es/Steps/hooks/useContext.js
var STEPS_CONTEXT_KEY = "card-context";
var useContext22 = () => {
  const provide$1 = (props, emits) => {
    const {
      status,
      current,
      defaultCurrent,
      lineLess,
      labelPlacement: _labelPlacement,
      direction: _direction,
      small,
      type,
      changeable
    } = toRefs(props);
    const computedCurrent = useControlValue(
      current,
      defaultCurrent.value,
      (val) => {
        emits("update:current", val);
      }
    );
    const direction = computed(() => {
      if (["default", "dot"].includes(type.value)) {
        return _direction.value;
      } else {
        return "horizontal";
      }
    });
    const labelPlacement = computed(() => {
      if (type.value == "default" && direction.value == "horizontal") {
        return _labelPlacement.value;
      } else if (type.value == "dot") {
        return direction.value == "vertical" ? "horizontal" : "vertical";
      } else {
        return "horizontal";
      }
    });
    const stepMap = reactive(/* @__PURE__ */ new Map());
    const statusArr = ref([]);
    provide(STEPS_CONTEXT_KEY, {
      stepMap,
      computedCurrent,
      lineLess,
      direction,
      status,
      statusArr,
      small,
      type,
      changeable,
      labelPlacement,
      emits
    });
    return {
      direction,
      labelPlacement,
      type
    };
  };
  const inject$1 = (props) => {
    const { status: _status } = toRefs(props);
    const injection = inject(STEPS_CONTEXT_KEY, {
      stepMap: reactive(/* @__PURE__ */ new Map()),
      computedCurrent: ref(0),
      lineLess: ref(false),
      direction: ref("horizontal"),
      status: ref("process"),
      statusArr: ref([]),
      small: ref(false),
      type: ref("default"),
      changeable: ref(false),
      labelPlacement: ref("horizontal"),
      emits: () => {
      }
    });
    const collectStep = () => {
      const {
        stepMap,
        computedCurrent,
        statusArr,
        status: injectStatus
      } = injection;
      const id = nanoid();
      stepMap.set(id, id);
      const curStep2 = computed(() => {
        return [...stepMap.values()].findIndex((item) => item == id) + 1;
      });
      const status2 = computed(() => {
        if (!isUndefined(_status.value)) {
          return _status.value;
        }
        if (curStep2.value < computedCurrent.value) {
          return "finish";
        } else if (curStep2.value == computedCurrent.value) {
          return injectStatus.value ?? "process";
        } else {
          return "wait";
        }
      });
      const nextStatus2 = computed(() => {
        var _a;
        return (_a = statusArr.value[curStep2.value]) == null ? void 0 : _a.value;
      });
      statusArr.value[curStep2.value - 1] = status2;
      onBeforeUnmount(() => {
        stepMap.delete(id);
        statusArr.value.splice(curStep2.value - 1, 1);
      });
      return {
        curStep: curStep2,
        status: status2,
        nextStatus: nextStatus2
      };
    };
    const { curStep, status, nextStatus } = collectStep();
    return {
      ...injection,
      curStep,
      status,
      nextStatus
    };
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Steps/Step.vue2.js
var _hoisted_187 = {
  key: 0,
  class: "yc-steps-item-tail"
};
var _hoisted_261 = { class: "yc-steps-item-node" };
var _hoisted_340 = { class: "yc-steps-icon" };
var _hoisted_426 = { class: "yc-steps-item-content" };
var _hoisted_518 = { class: "yc-steps-item-title" };
var _hoisted_611 = {
  key: 0,
  class: "yc-steps-item-description"
};
var _sfc_main173 = defineComponent({
  ...{
    name: "Step"
  },
  __name: "Step",
  props: {
    title: { default: "" },
    description: { default: "" },
    status: { default: void 0 },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { disabled } = toRefs(props);
    const {
      curStep,
      stepMap,
      computedCurrent,
      type,
      changeable,
      status,
      nextStatus,
      direction,
      labelPlacement,
      lineLess: _lineLess,
      small: _small,
      emits
    } = useContext22().inject(props);
    const small = computed(() => {
      return type.value != "dot" ? _small.value : false;
    });
    const lineLess = computed(() => {
      return _lineLess.value || curStep.value == stepMap.size || ["arrow", "navigation"].includes(type.value);
    });
    const handleClick = (e) => {
      if (!changeable.value || disabled.value) return;
      computedCurrent.value = curStep.value;
      emits("change", curStep.value, e);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-steps-item",
          `yc-steps-item-${unref(direction)}`,
          `yc-steps-item-label-${unref(labelPlacement)}`,
          `yc-steps-item-${unref(status)}`,
          `yc-steps-item-next-${unref(nextStatus)}`,
          {
            "yc-steps-item-active": unref(curStep) == unref(computedCurrent) && unref(type) == "navigation",
            "yc-steps-item-line-less": lineLess.value,
            "yc-steps-item-size-small": small.value
          }
        ]),
        onClick: handleClick
      }, [
        unref(type) == "default" && (unref(direction) == "vertical" || unref(labelPlacement) == "vertical") || unref(type) == "dot" ? (openBlock(), createElementBlock("div", _hoisted_187)) : createCommentVNode("", true),
        unref(type) != "arrow" ? renderSlot(_ctx.$slots, "node", {
          key: 1,
          step: unref(curStep),
          status: unref(status)
        }, () => [
          createBaseVNode("div", _hoisted_261, [
            createBaseVNode("div", _hoisted_340, [
              ["default", "navigation"].includes(unref(type)) ? renderSlot(_ctx.$slots, "icon", {
                key: 0,
                status: unref(status),
                step: unref(curStep)
              }, () => [
                unref(status) == "finish" ? (openBlock(), createBlock(unref(_sfc_main5), { key: 0 })) : unref(status) == "error" ? (openBlock(), createBlock(unref(_sfc_main6), { key: 1 })) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                  createTextVNode(toDisplayString(unref(curStep)), 1)
                ], 64))
              ], true) : createCommentVNode("", true)
            ])
          ])
        ], true) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_426, [
          createBaseVNode("div", _hoisted_518, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ], true)
          ]),
          _ctx.$slots.description || _ctx.description ? (openBlock(), createElementBlock("div", _hoisted_611, [
            renderSlot(_ctx.$slots, "description", {}, () => [
              createTextVNode(toDisplayString(_ctx.description), 1)
            ], true)
          ])) : createCommentVNode("", true)
        ])
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Steps/Step.vue.js
var Step = _export_sfc(_sfc_main173, [["__scopeId", "data-v-7632fb49"]]);

// node_modules/yc-design-vue/es/Steps/Steps.vue2.js
var _sfc_main174 = defineComponent({
  ...{
    name: "Steps"
  },
  __name: "Steps",
  props: {
    type: { default: "default" },
    direction: { default: "horizontal" },
    labelPlacement: { default: "horizontal" },
    current: { default: void 0 },
    defaultCurrent: { default: 1 },
    status: { default: "process" },
    lineLess: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    changeable: { type: Boolean, default: false }
  },
  emits: ["change", "update:current"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { type, labelPlacement, direction } = useContext22().provide(props, emits);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-steps",
          `yc-steps-mode-${unref(type)}`,
          `yc-steps-${unref(direction)}`,
          `yc-steps-label-${unref(labelPlacement)}`,
          {
            "yc-steps-changeable": _ctx.changeable
          }
        ])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Steps/Steps.vue.js
var _Steps = _export_sfc(_sfc_main174, [["__scopeId", "data-v-96ebe941"]]);

// node_modules/yc-design-vue/es/Steps/index.js
var Steps = Object.assign(_Steps, {
  step: Step,
  install: (app) => {
    app.component("Yc" + Step.name, Step);
    app.component("Yc" + _Steps.name, _Steps);
  }
});

// node_modules/yc-design-vue/es/Switch/index.vue2.js
var _hoisted_188 = ["aria-checked"];
var _hoisted_262 = { class: "yc-switch-handle" };
var _hoisted_341 = { class: "yc-switch-handle-icon" };
var _hoisted_427 = {
  key: 0,
  class: "yc-switch-placeholder"
};
var _hoisted_519 = {
  key: 1,
  class: "yc-switch-text"
};
var _sfc_main175 = defineComponent({
  ...{
    name: "Switch"
  },
  __name: "index",
  props: {
    modelValue: { type: [String, Number, Boolean], default: void 0 },
    defaultChecked: { type: [String, Number, Boolean], default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    type: { default: "circle" },
    size: { default: void 0 },
    checkedValue: { type: [String, Number, Boolean], default: true },
    uncheckedValue: { type: [String, Number, Boolean], default: false },
    checkedColor: { default: "rgba(22, 93, 255)" },
    uncheckedColor: { default: "rgb(201, 205, 212)" },
    checkedText: { default: "" },
    uncheckedText: { default: "" },
    beforeChange: { type: Function, default: () => {
      return true;
    } }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(__props, { emit: __emit }) {
    useCssVars((_ctx) => ({
      "e55eb67a": background.value
    }));
    const slots = useSlots();
    const props = __props;
    const emits = __emit;
    const {
      modelValue,
      defaultChecked,
      checkedValue,
      uncheckedValue,
      disabled,
      type,
      checkedText,
      uncheckedText,
      checkedColor,
      uncheckedColor,
      loading: _loading
    } = toRefs(props);
    const { beforeChange } = props;
    const { size } = getGlobalConfig(props);
    const computedValue = useControlValue(
      modelValue,
      defaultChecked.value,
      (val) => {
        emits("update:modelValue", val);
      }
    );
    const compuedChecked = computed(() => {
      return computedValue.value == checkedValue.value;
    });
    const showText = computed(() => {
      const showCheckedText = compuedChecked.value && (checkedText.value || slots.checked);
      const showUncheckedText = !compuedChecked.value && (uncheckedText.value || slots.unchecked);
      return type.value != "line" && size.value != "small" && (showCheckedText || showUncheckedText);
    });
    const background = computed(
      () => compuedChecked.value ? checkedColor.value : uncheckedColor.value
    );
    const switchLoading = ref(false);
    const loading = computed(() => switchLoading.value || _loading.value);
    const handleBeforeChange = async (newValue) => {
      let isChange = true;
      switchLoading.value = true;
      const changeResult = beforeChange(newValue);
      if (isBoolean(changeResult)) {
        isChange = changeResult;
      } else if (changeResult instanceof Promise) {
        try {
          const _isChange = await changeResult;
          if (isBoolean(_isChange)) {
            isChange = _isChange;
          }
        } catch {
          isChange = false;
        }
      }
      switchLoading.value = false;
      return isChange;
    };
    const handleClick = async (e) => {
      if (loading.value || disabled.value) return;
      const newValue = compuedChecked.value ? uncheckedValue.value : checkedValue.value;
      const isChange = await handleBeforeChange(newValue);
      if (!isChange) return;
      computedValue.value = newValue;
      emits("change", newValue, e);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        class: normalizeClass([
          "yc-switch",
          `yc-switch-shape-${unref(type)}`,
          `yc-switch-size-${unref(size)}`,
          compuedChecked.value ? "yc-switch-checked" : "yc-switch-unchecked",
          {
            "yc-switch-loading": loading.value,
            "yc-switch-disabled": unref(disabled)
          }
        ]),
        "aria-checked": compuedChecked.value,
        role: "switch",
        onFocus: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("focus", $event)),
        onBlur: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("blur", $event)),
        onClick: handleClick
      }, [
        createBaseVNode("span", _hoisted_262, [
          createBaseVNode("span", _hoisted_341, [
            loading.value ? (openBlock(), createBlock(unref(Spin), {
              key: 0,
              "is-size-inherit": ""
            })) : renderSlot(_ctx.$slots, compuedChecked.value ? "checked-icon" : "unchecked-icon", { key: 1 }, void 0, true)
          ])
        ]),
        showText.value ? (openBlock(), createElementBlock("span", _hoisted_427, [
          renderSlot(_ctx.$slots, compuedChecked.value ? "checked" : "unchecked", {}, () => [
            createTextVNode(toDisplayString(compuedChecked.value ? unref(checkedText) : unref(uncheckedText)), 1)
          ], true)
        ])) : createCommentVNode("", true),
        showText.value ? (openBlock(), createElementBlock("span", _hoisted_519, [
          renderSlot(_ctx.$slots, compuedChecked.value ? "checked" : "unchecked", {}, () => [
            createTextVNode(toDisplayString(compuedChecked.value ? unref(checkedText) : unref(uncheckedText)), 1)
          ], true)
        ])) : createCommentVNode("", true)
      ], 42, _hoisted_188);
    };
  }
});

// node_modules/yc-design-vue/es/Switch/index.vue.js
var _Switch = _export_sfc(_sfc_main175, [["__scopeId", "data-v-be8dccd4"]]);

// node_modules/yc-design-vue/es/Switch/index.js
var Switch = Object.assign(_Switch, {
  install: (app) => {
    app.component("Yc" + _Switch.name, _Switch);
  }
});

// node_modules/yc-design-vue/es/Timeline/TimelineItem.vue2.js
var _hoisted_189 = { class: "yc-timeline-item-dot-wrapper" };
var _hoisted_263 = { class: "yc-timeline-item-dot-content" };
var _hoisted_342 = {
  key: 0,
  class: "yc-timeline-item-dot-custom"
};
var _hoisted_428 = { class: "yc-timeline-item-content-wrapper" };
var _hoisted_520 = { class: "yc-timeline-item-content" };
var _hoisted_612 = {
  key: 0,
  class: "yc-timeline-item-label"
};
var _hoisted_78 = {
  key: 0,
  class: "yc-timeline-item-label"
};
var _sfc_main176 = defineComponent({
  ...{
    name: "TimelineItem"
  },
  __name: "TimelineItem",
  props: {
    dotColor: { default: "" },
    dotType: { default: "solid" },
    lineType: { default: "solid" },
    lineColor: { default: "" },
    label: { default: "" },
    position: { default: "top" },
    isGhost: { type: Boolean, default: false }
  },
  setup(__props) {
    const { direction, labelPosition, reverse } = useContext23().inject();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "listitem",
        class: normalizeClass([
          "yc-timeline-item",
          `yc-timeline-item-${_ctx.$attrs.mode}`,
          `yc-timeline-item-direction-${unref(direction)}`,
          {
            "yc-timeline-item-label-is-relative": unref(labelPosition) == "relative",
            "yc-timeline-item-ghost": _ctx.isGhost,
            "yc-timeline-item-reverse": unref(reverse)
          }
        ])
      }, [
        createBaseVNode("div", _hoisted_189, [
          createBaseVNode("div", {
            class: "yc-timeline-item-dot-line",
            style: normalizeStyle({
              "border-style": _ctx.lineType
            })
          }, null, 4),
          createBaseVNode("div", _hoisted_263, [
            _ctx.$slots.dot ? (openBlock(), createElementBlock("div", _hoisted_342, [
              renderSlot(_ctx.$slots, "dot", {}, void 0, true)
            ])) : (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["yc-timeline-item-dot", `yc-timeline-item-dot-${_ctx.dotType}`]),
              style: normalizeStyle({
                backgroundColor: _ctx.dotColor
              })
            }, null, 6))
          ])
        ]),
        createBaseVNode("div", _hoisted_428, [
          createBaseVNode("div", _hoisted_520, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ]),
          unref(labelPosition) == "same" ? (openBlock(), createElementBlock("div", _hoisted_612, [
            renderSlot(_ctx.$slots, "label", {}, () => [
              createTextVNode(toDisplayString(_ctx.label), 1)
            ], true)
          ])) : createCommentVNode("", true)
        ]),
        unref(labelPosition) == "relative" ? (openBlock(), createElementBlock("div", _hoisted_78, [
          renderSlot(_ctx.$slots, "label", {}, () => [
            createTextVNode(toDisplayString(_ctx.label), 1)
          ], true)
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Timeline/TimelineItem.vue.js
var TimelineItem = _export_sfc(_sfc_main176, [["__scopeId", "data-v-8342e0a8"]]);

// node_modules/yc-design-vue/es/Timeline/hooks/useContext.js
var TIMELINE_CONTEXT_KEY = "timeline-context";
var useContext23 = () => {
  const provide$1 = (props) => {
    const {
      direction,
      labelPosition,
      reverse,
      mode: _mode
    } = toRefs(props);
    const slots = useSlots();
    const mode = computed(() => {
      if (direction.value == "vertical") {
        return ["left", "right", "alternate"].includes(_mode.value) ? _mode.value : "left";
      }
      {
        return ["top", "bottom", "alternate"].includes(_mode.value) ? _mode.value : "bottom";
      }
    });
    const timelineItems = computed(() => {
      var _a;
      return findComponentsFromVnodes(
        ((_a = slots.default) == null ? void 0 : _a.call(slots)) || [],
        TimelineItem.name
      );
    });
    provide(TIMELINE_CONTEXT_KEY, {
      direction,
      mode,
      labelPosition,
      reverse
    });
    return {
      direction,
      mode,
      timelineItems
    };
  };
  const inject$1 = () => {
    return inject(TIMELINE_CONTEXT_KEY, {
      direction: ref("vertical"),
      mode: ref("left"),
      labelPosition: ref("same"),
      reverse: ref(false)
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Timeline/Timeline.vue2.js
var _hoisted_190 = { key: 0 };
var _sfc_main177 = defineComponent({
  ...{
    name: "Timeline"
  },
  __name: "Timeline",
  props: {
    reverse: { type: Boolean, default: false },
    direction: { default: "vertical" },
    mode: { default: (props) => {
      return props.direction == "horizontal" ? "top" : "left";
    } },
    pending: { type: [Boolean, String], default: false },
    labelPosition: { default: "same" }
  },
  setup(__props) {
    const props = __props;
    const { direction, mode, timelineItems } = useContext23().provide(props);
    const getPoistion = (i) => {
      if (mode.value != "alternate") {
        return mode.value;
      }
      if (direction.value == "horizontal") {
        return i % 2 == 0 ? "top" : "bottom";
      } else {
        return i % 2 == 0 ? "left" : "right";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "list",
        class: normalizeClass([
          "yc-timeline",
          `yc-timeline-direction-${unref(direction)}`,
          `yc-timeline-${unref(mode)}`,
          {
            "yc-timeline-reverse": _ctx.reverse
          }
        ])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(timelineItems), (node, i) => {
          return openBlock(), createBlock(resolveDynamicComponent(node), {
            key: i,
            mode: getPoistion(i)
          }, null, 8, ["mode"]);
        }), 128)),
        _ctx.pending ? (openBlock(), createBlock(TimelineItem, {
          key: 0,
          "is-ghost": ""
        }, {
          dot: withCtx(() => [
            renderSlot(_ctx.$slots, "dot", {}, () => [
              createVNode(unref(Spin), { size: 12 })
            ], true)
          ]),
          default: withCtx(() => [
            unref(isString)(_ctx.pending) ? (openBlock(), createElementBlock("span", _hoisted_190, toDisplayString(_ctx.pending), 1)) : createCommentVNode("", true)
          ]),
          _: 3
        })) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Timeline/Timeline.vue.js
var _Timeline = _export_sfc(_sfc_main177, [["__scopeId", "data-v-cf2690e2"]]);

// node_modules/yc-design-vue/es/Timeline/index.js
var Timeline = Object.assign(_Timeline, {
  item: TimelineItem,
  install: (app) => {
    app.component("Yc" + _Timeline.name, _Timeline);
    app.component("Yc" + TimelineItem.name, TimelineItem);
  }
});

// node_modules/yc-design-vue/es/TimePicker/hooks/useContext.js
var TIME_PICKER_CONTEXT_KEY = "time-picker-context";
var useContext24 = () => {
  const provide$1 = (props, emits) => {
    const {
      modelValue,
      defaultValue,
      popupVisible,
      defaultPopupVisible,
      disabled,
      readonly: readonly2,
      allowClear,
      format,
      type,
      disableConfirm,
      hideDisabledOptions,
      step
    } = toRefs(props);
    const { disabledHours, disabledMinutes, disabledSeconds } = props;
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
      }
    );
    const curIndex = ref(0);
    const curValue = ref([]);
    const computedVisible = useControlValue(
      popupVisible,
      defaultPopupVisible.value,
      (val) => {
        emits("update:popupVisible", val);
        emits("popup-visible-change", val);
      }
    );
    const showClearBtn = computed(() => {
      const base = !disabled.value && !readonly2.value && allowClear.value;
      if (isArray(computedValue.value)) {
        return computedValue.value[0] && computedValue.value[1] && base;
      } else {
        return computedValue.value && base;
      }
    });
    const timeColumn = computed(() => {
      const formatStr = format.value.toLowerCase().replace(/[^a-z]/g, "");
      const units = [];
      if (formatStr.includes("h")) units.push("hour");
      if (formatStr.includes("m")) units.push("minute");
      if (formatStr.includes("s")) units.push("second");
      return units.length > 0 ? units : ["hour", "minute", "second"];
    });
    const timeColumnCells = computed(() => {
      return timeColumn.value.map((unit) => {
        var _a;
        const unitStep = ((_a = step.value) == null ? void 0 : _a[unit]) || 1;
        const cellCount = Math.ceil((unit === "hour" ? 24 : 60) / unitStep);
        return {
          unit,
          cells: Array.from({ length: cellCount }, (_, i) => {
            const value = i * unitStep;
            return {
              label: `${value <= 9 ? "0" : ""}${value}`,
              value
            };
          })
        };
      });
    });
    const inputRefs = ref([]);
    provide(TIME_PICKER_CONTEXT_KEY, {
      computedValue,
      computedVisible,
      timeColumn,
      timeColumnCells,
      curValue,
      format,
      type,
      curIndex,
      inputRefs,
      disableConfirm,
      hideDisabledOptions,
      disabledHours,
      disabledMinutes,
      disabledSeconds
    });
    return {
      computedValue,
      computedVisible,
      showClearBtn,
      curValue,
      readonly: readonly2,
      disabled,
      type,
      curIndex,
      inputRefs,
      format
    };
  };
  const inject$1 = () => {
    return inject(TIME_PICKER_CONTEXT_KEY, {
      type: ref("time"),
      format: ref("HH:mm:ss"),
      curValue: ref([]),
      computedValue: ref(""),
      computedVisible: ref(false),
      curIndex: ref(0),
      timeColumn: ref([]),
      timeColumnCells: ref([]),
      inputRefs: ref([]),
      disableConfirm: ref(false),
      hideDisabledOptions: ref(false),
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => []
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/_shared/icons/IconTime.vue.js
var _sfc_main178 = defineComponent({
  __name: "IconTime",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M24 14v10h9.5m8.5 0c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6s18 8.059 18 18Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/TimePicker/TimePickerPanel.vue2.js
var _hoisted_191 = { class: "yc-timepicker-container" };
var _hoisted_264 = { class: "yc-timepicker" };
var _hoisted_343 = ["onClick"];
var _hoisted_429 = { class: "yc-timepicker-cell-inner" };
var _hoisted_521 = {
  key: 0,
  class: "yc-timepicker-footer-extra-wrapper"
};
var _hoisted_613 = {
  key: 1,
  class: "yc-timepicker-footer-btn-wrapper"
};
var _sfc_main179 = defineComponent({
  __name: "TimePickerPanel",
  setup(__props, { expose: __expose }) {
    const {
      timeColumn,
      timeColumnCells,
      curValue,
      format,
      computedValue,
      computedVisible,
      disableConfirm,
      hideDisabledOptions,
      curIndex,
      inputRefs,
      disabledHours,
      disabledMinutes,
      disabledSeconds
    } = useContext24().inject();
    const scrollRefs = ref([]);
    const disabled = computed(() => {
      return !curValue.value.length || curValue.value.some((val) => !`${val}`);
    });
    const disabledTime = (value, unit) => {
      var _a, _b, _c;
      if (unit == "hour") {
        return (_a = disabledHours == null ? void 0 : disabledHours()) == null ? void 0 : _a.includes(value);
      } else if (unit == "minute") {
        return (_b = disabledMinutes == null ? void 0 : disabledMinutes(...curValue.value)) == null ? void 0 : _b.includes(value);
      } else {
        return (_c = disabledSeconds == null ? void 0 : disabledSeconds(...curValue.value)) == null ? void 0 : _c.includes(value);
      }
    };
    const handleClick = (val, i, target) => {
      curValue.value[i] = val;
      timeColumn.value.forEach((_, i1) => {
        curValue.value[i1] = isUndefined(curValue.value[i1]) ? 0 : curValue.value[i1];
      });
      const scrollContainer = scrollRefs.value[i].getScrollRef();
      new Tween({
        from: { scroll: scrollContainer.scrollTop },
        to: { scroll: target.offsetTop },
        duration: 300,
        easing: "quadOut",
        onUpdate: (current) => {
          scrollContainer.scrollTo({
            top: current.scroll,
            behavior: "instant"
          });
        }
      }).start();
      if (!disableConfirm.value) {
        return;
      }
      handleConfirm();
    };
    const hanldeJump = (timeMap) => {
      const cells = scrollRefs.value.map((el) => {
        return el.getScrollRef().querySelectorAll(".yc-timepicker-cell");
      });
      timeColumn.value.map((v, i) => {
        const time = timeMap[v];
        handleClick(time, i, Array.from(cells[i])[time]);
      });
    };
    const handleConfirm = () => {
      var _a;
      let date = dayjs();
      timeColumn.value.forEach((v, i) => {
        date = date.set(v, curValue.value[i]);
      });
      const formatValue = date.format(format.value);
      if (!isArray(computedValue.value)) {
        computedVisible.value = false;
        computedValue.value = formatValue;
      } else {
        computedValue.value[curIndex.value] = formatValue;
        if (disableConfirm.value) {
          return;
        }
        if (curIndex.value || computedValue.value[curIndex.value + 1]) {
          return computedVisible.value = false;
        }
        curIndex.value++;
        (_a = inputRefs.value[curIndex.value]) == null ? void 0 : _a.focus();
        curValue.value = [];
      }
    };
    __expose({
      async scroll(value) {
        if (!computedVisible.value || !value) return;
        await sleep(0);
        const date = dayjs(value, format.value);
        const timeMap = {
          hour: date.hour(),
          minute: date.minute(),
          second: date.second()
        };
        curValue.value = timeColumn.value.map((v) => timeMap[v]);
        hanldeJump(timeMap);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_191, [
        createBaseVNode("div", _hoisted_264, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(timeColumnCells), (column, i) => {
            return openBlock(), createElementBlock("div", {
              key: i,
              class: "yc-timepicker-column"
            }, [
              createVNode(unref(Scrollbar), {
                "outer-style": {
                  height: "100%"
                },
                style: {
                  height: "100%",
                  overflow: "auto"
                },
                ref_for: true,
                ref: (el) => scrollRefs.value[i] = el
              }, {
                default: withCtx(() => [
                  createBaseVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(column.cells, (cell) => {
                      return withDirectives((openBlock(), createElementBlock("li", {
                        key: cell.value,
                        class: normalizeClass([
                          "yc-timepicker-cell",
                          {
                            "yc-timepicker-cell-selected": cell.value == unref(curValue)[i],
                            "yc-timepicker-cell-disabled": disabledTime(
                              cell.value,
                              column.unit
                            )
                          }
                        ]),
                        onClick: ($event) => !disabledTime(cell.value, column.unit) && handleClick(cell.value, i, $event.target)
                      }, [
                        createBaseVNode("div", _hoisted_429, toDisplayString(cell.label), 1)
                      ], 10, _hoisted_343)), [
                        [
                          vShow,
                          !unref(hideDisabledOptions) || !disabledTime(cell.value, column.unit)
                        ]
                      ]);
                    }), 128))
                  ])
                ]),
                _: 2
              }, 1536)
            ]);
          }), 128))
        ]),
        _ctx.$slots.extra ? (openBlock(), createElementBlock("div", _hoisted_521, [
          renderSlot(_ctx.$slots, "extra", {}, void 0, true)
        ])) : createCommentVNode("", true),
        !unref(disableConfirm) ? (openBlock(), createElementBlock("div", _hoisted_613, [
          createVNode(unref(Button), {
            size: "mini",
            onClick: _cache[0] || (_cache[0] = () => {
              const date = /* @__PURE__ */ new Date();
              hanldeJump({
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
              });
            })
          }, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createTextVNode("此刻", -1)
            ])),
            _: 1,
            __: [1]
          }),
          createVNode(unref(Button), {
            type: "primary",
            size: "mini",
            disabled: disabled.value,
            onClick: handleConfirm
          }, {
            default: withCtx(() => _cache[2] || (_cache[2] = [
              createTextVNode(" 确定 ", -1)
            ])),
            _: 1,
            __: [2]
          }, 8, ["disabled"])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/TimePicker/TimePickerPanel.vue.js
var TimePickerPanel = _export_sfc(_sfc_main179, [["__scopeId", "data-v-e972f31f"]]);

// node_modules/yc-design-vue/es/TimePicker/TimePicker.vue2.js
var _hoisted_192 = {
  key: 0,
  class: "yc-picker-prefix"
};
var _hoisted_265 = ["value", "placeholder", "disabled", "readonly"];
var _hoisted_344 = ["value", "placeholder", "disabled", "readonly"];
var _hoisted_430 = { class: "yc-picker-suffix" };
var _hoisted_522 = { class: "yc-picker-suffix-icon" };
var _sfc_main180 = defineComponent({
  ...{
    name: "TimePicker",
    inheritAttrs: false
  },
  __name: "TimePicker",
  props: {
    type: { default: "time" },
    modelValue: { default: void 0 },
    defaultValue: { default: (props) => {
      return props.type == "time-range" ? [] : "";
    } },
    disabled: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: true },
    readonly: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    format: { default: "HH:mm:ss" },
    placeholder: { default: (props) => {
      return props.type == "time-range" ? ["开始时间", "结束时间"] : "请选择时间";
    } },
    size: { default: void 0 },
    popupContainer: { default: void 0 },
    step: {},
    disabledHours: { type: Function, default: () => [] },
    disabledMinutes: { type: Function, default: () => [] },
    disabledSeconds: { type: Function, default: () => [] },
    hideDisabledOptions: { type: Boolean, default: false },
    disableConfirm: { type: Boolean },
    position: { default: "bl" },
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    triggerProps: { default: () => {
      return {};
    } },
    unmountOnClose: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:popupVisible", "change", "select", "clear", "popup-visible-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { popupContainer, size } = getGlobalConfig(props);
    const {
      type,
      computedValue,
      computedVisible,
      showClearBtn,
      readonly: readonly2,
      disabled,
      curIndex,
      inputRefs,
      format
    } = useContext24().provide(props, emits);
    const panelRef = ref();
    const handleClear = () => {
      computedValue.value = type.value == "time-range" ? [] : "";
      emits("clear");
    };
    const handleOpenPicker = (i) => {
      var _a;
      curIndex.value = i;
      computedVisible.value = true;
      (_a = panelRef.value) == null ? void 0 : _a.scroll(
        isArray(computedValue.value) ? computedValue.value[i] : computedValue.value
      );
    };
    const handleClickOutSide = () => {
      computedVisible.value = false;
      if (!isArray(computedValue.value)) {
        return;
      }
      const startTime = computedValue.value[0];
      const endTime = computedValue.value[1];
      if (startTime && endTime) {
        if (!isValidTimeRange(startTime, endTime, format.value)) {
          computedValue.value = computedValue.value.reverse();
        }
        return;
      }
      computedValue.value = [];
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Trigger), mergeProps({
        "popup-visible": unref(computedVisible),
        position: _ctx.position,
        "popup-container": unref(popupContainer),
        "popup-offset": 4,
        "unmount-on-close": _ctx.unmountOnClose,
        disabled: unref(disabled) || unref(readonly2),
        "on-click-out-side": handleClickOutSide,
        "auto-fit-popup-min-width": false,
        "auto-fit-popup-width": false,
        trigger: "click",
        "animation-name": "slide-dynamic-origin",
        "prevent-focus": ""
      }, _ctx.triggerProps), {
        content: withCtx(() => [
          createVNode(TimePickerPanel, {
            ref_key: "panelRef",
            ref: panelRef
          }, createSlots({ _: 2 }, [
            _ctx.$slots.extra ? {
              name: "extra",
              fn: withCtx(() => [
                renderSlot(_ctx.$slots, "extra", {}, void 0, true)
              ]),
              key: "0"
            } : void 0
          ]), 1536)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass([
              "yc-picker",
              `yc-picker-size-${unref(size)}`,
              _ctx.$attrs.class,
              {
                "yc-picker-disabled": unref(disabled),
                "yc-picker-error": _ctx.error,
                "yc-picker-focus": unref(computedVisible),
                "yc-picker-has-prefix": _ctx.$slots.prefix,
                "yc-picker-allow-clear": unref(showClearBtn)
              }
            ]),
            style: normalizeStyle({
              ..._ctx.$attrs.style || {}
            })
          }, [
            _ctx.$slots.prefix ? (openBlock(), createElementBlock("div", _hoisted_192, [
              renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass([
                "yc-picker-input",
                {
                  "yc-picker-input-active": !unref(curIndex) && unref(computedVisible)
                }
              ]),
              onClick: _cache[0] || (_cache[0] = withModifiers(($event) => handleOpenPicker(0), ["stop"]))
            }, [
              createBaseVNode("input", {
                value: unref(isArray)(unref(computedValue)) ? unref(computedValue)[0] : unref(computedValue),
                placeholder: unref(isArray)(_ctx.placeholder) ? _ctx.placeholder[0] : _ctx.placeholder,
                disabled: unref(disabled),
                readonly: unref(readonly2),
                ref: (el) => unref(inputRefs)[0] = el,
                class: "yc-picker-start-time"
              }, null, 8, _hoisted_265)
            ], 2),
            unref(type) == "time-range" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              _cache[2] || (_cache[2] = createBaseVNode("span", { class: "yc-picker-separator" }, " - ", -1)),
              createBaseVNode("div", {
                class: normalizeClass([
                  "yc-picker-input",
                  {
                    "yc-picker-input-active": unref(curIndex) && unref(computedVisible)
                  }
                ]),
                onClick: _cache[1] || (_cache[1] = withModifiers(($event) => handleOpenPicker(1), ["stop"]))
              }, [
                createBaseVNode("input", {
                  value: unref(isArray)(unref(computedValue)) ? unref(computedValue)[1] : unref(computedValue),
                  placeholder: unref(isArray)(_ctx.placeholder) ? _ctx.placeholder[1] : _ctx.placeholder,
                  disabled: unref(disabled),
                  readonly: unref(readonly2),
                  ref: (el) => unref(inputRefs)[1] = el,
                  class: "yc-picker-start-time"
                }, null, 8, _hoisted_344)
              ], 2)
            ], 64)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_430, [
              unref(showClearBtn) ? (openBlock(), createBlock(unref(IconButton), {
                key: 0,
                size: 14,
                class: "yc-picker-clear-icon",
                onClick: handleClear
              })) : createCommentVNode("", true),
              createBaseVNode("span", _hoisted_522, [
                renderSlot(_ctx.$slots, "suffix-icon", {}, () => [
                  createVNode(unref(_sfc_main178))
                ], true)
              ])
            ])
          ], 6)
        ]),
        _: 3
      }, 16, ["popup-visible", "position", "popup-container", "unmount-on-close", "disabled"]);
    };
  }
});

// node_modules/yc-design-vue/es/TimePicker/TimePicker.vue.js
var _TimePicker = _export_sfc(_sfc_main180, [["__scopeId", "data-v-6dc1f2f2"]]);

// node_modules/yc-design-vue/es/TimePicker/index.js
var TimePicker = Object.assign(_TimePicker, {
  install: (app) => {
    app.component("Yc" + _TimePicker.name, _TimePicker);
  }
});

// node_modules/yc-design-vue/es/Transfer/hooks/useContext.js
var TRANSFER_CONTEXT_KEY = "transfer-context";
var useContext25 = () => {
  const provide$1 = (props, emits) => {
    const {
      modelValue,
      defaultValue,
      selected,
      defaultSelected,
      data,
      oneWay,
      simple,
      sourceInputSearchProps,
      targetInputSearchProps,
      showSearch,
      showSelectAll,
      disabled,
      title
    } = toRefs(props);
    const slots = useSlots();
    const dataMap = computed(() => {
      return Object.fromEntries(data.value.map((item) => [item.value, item]));
    });
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
        emits("change", val);
      }
    );
    const computedValueMap = computed(() => {
      return new Map(
        computedValue.value.map((item) => {
          return [item, item];
        })
      );
    });
    const computedSelected = useControlValue(
      selected,
      defaultSelected.value,
      (val) => {
        emits("update:selected", val);
      }
    );
    const sourceOptions = computed(() => {
      return data.value.filter((item) => {
        return !computedValueMap.value.has(item.value);
      });
    });
    const targetOptions = computed(() => {
      return computedValue.value.map((item) => {
        const target = dataMap.value[item];
        return target;
      });
    });
    const sourceChecked = computed(() => {
      return computedSelected.value.filter(
        (item) => !computedValueMap.value.has(item)
      );
    });
    const targetChecked = computed(() => {
      return computedSelected.value.filter(
        (item) => computedValueMap.value.has(item)
      );
    });
    provide(TRANSFER_CONTEXT_KEY, {
      computedValue,
      computedSelected,
      targetChecked,
      sourceChecked,
      sourceOptions,
      targetOptions,
      oneWay,
      simple,
      sourceInputSearchProps,
      targetInputSearchProps,
      showSearch,
      showSelectAll,
      disabled,
      title,
      slots,
      emits
    });
    return {
      computedValue,
      targetChecked,
      computedSelected,
      sourceChecked
    };
  };
  const inject$1 = () => {
    return inject(TRANSFER_CONTEXT_KEY, {
      computedValue: ref([]),
      computedSelected: ref([]),
      targetChecked: ref([]),
      sourceChecked: ref([]),
      sourceOptions: ref([]),
      targetOptions: ref([]),
      disabled: ref(false),
      oneWay: ref(false),
      simple: ref(false),
      title: ref([]),
      showSearch: ref(false),
      showSelectAll: ref(false),
      sourceInputSearchProps: ref({}),
      targetInputSearchProps: ref({}),
      slots: {},
      emits: () => {
      }
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/_shared/icons/IconDelete.vue.js
var _sfc_main181 = defineComponent({
  __name: "IconDelete",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M5 11h5.5m0 0v29a1 1 0 0 0 1 1h25a1 1 0 0 0 1-1V11m-27 0H16m21.5 0H43m-5.5 0H32m-16 0V7h16v4m-16 0h16M20 18v15m8-15v15" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconSearch.vue.js
var _sfc_main182 = defineComponent({
  __name: "IconSearch",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M33.072 33.071c6.248-6.248 6.248-16.379 0-22.627-6.249-6.249-16.38-6.249-22.628 0-6.248 6.248-6.248 16.379 0 22.627 6.248 6.248 16.38 6.248 22.628 0Zm0 0 8.485 8.485" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Transfer/TransferPanel.vue2.js
var _hoisted_193 = { class: "yc-transfer-view" };
var _hoisted_266 = { class: "yc-transfer-view-header" };
var _hoisted_345 = { class: "yc-transfer-view-header-title" };
var _hoisted_431 = { class: "yc-transfer-view-header-count" };
var _hoisted_523 = {
  key: 0,
  class: "yc-transfer-view-search"
};
var _hoisted_614 = { class: "yc-transfer-view-body" };
var _hoisted_79 = {
  key: 1,
  role: "list",
  class: "yc-transfer-list"
};
var _hoisted_86 = ["onClick"];
var _hoisted_93 = { class: "yc-transfer-list-item-content text-ellipsis" };
var _sfc_main183 = defineComponent({
  __name: "TransferPanel",
  props: {
    type: {}
  },
  setup(__props) {
    const props = __props;
    const { type } = toRefs(props);
    const { renderEmpty } = getGlobalConfig();
    const {
      computedValue,
      computedSelected,
      targetChecked,
      sourceChecked,
      sourceOptions,
      targetOptions,
      disabled,
      oneWay,
      showSearch,
      showSelectAll,
      simple,
      sourceInputSearchProps,
      targetInputSearchProps,
      slots,
      title: _title,
      emits
    } = useContext25().inject();
    const keywords = ref("");
    const curData = computed(() => {
      const options = type.value == "source" ? sourceOptions.value : targetOptions.value;
      return options.filter((item) => {
        var _a;
        return (_a = item.label) == null ? void 0 : _a.toLowerCase().includes(keywords.value.toLowerCase());
      });
    });
    const curSeleced = computed(() => {
      return type.value == "source" ? sourceChecked.value : targetChecked.value;
    });
    const inputProps = computed(() => {
      return type.value == "source" ? sourceInputSearchProps.value : targetInputSearchProps.value;
    });
    const title = computed(() => {
      return type.value == "source" ? _title.value[0] : _title.value[1];
    });
    const selectedAll = computed({
      get() {
        return !!curSeleced.value.length && curSeleced.value.length == curData.value.length;
      },
      set(isSelected) {
        if (isSelected) {
          computedSelected.value = [
            .../* @__PURE__ */ new Set([
              ...computedSelected.value,
              ...curData.value.map((item) => item.value)
            ])
          ];
        } else {
          const dataMap = Object.fromEntries(
            curData.value.map((item) => [item.value, item])
          );
          computedSelected.value = computedSelected.value.filter(
            (item) => !dataMap[item]
          );
        }
      }
    });
    const indeterminate = computed(() => {
      return !!curSeleced.value.length && curSeleced.value.length <= curData.value.length;
    });
    const handleCheck = (isSelected, value) => {
      computedSelected.value = isSelected ? [...computedSelected.value, value] : computedSelected.value.filter((v) => v != value);
      emits("select", computedSelected.value);
    };
    const handleClick = (item) => {
      const { value } = item;
      if (disabled.value || item.disabled) return;
      if ((!oneWay.value || type.value == "source") && !simple.value) {
        return;
      }
      computedValue.value = type.value == "source" ? [...computedValue.value, value] : computedValue.value.filter((v) => v != value);
    };
    const handleClear = () => {
      if (disabled.value || !computedValue.value.length) return;
      computedValue.value = [];
    };
    const renderTitle = () => {
      var _a;
      return (_a = slots[type.value == "source" ? "source-title" : "target-title"]) == null ? void 0 : _a.call(slots, {
        countTotal: type.value == "source" ? sourceOptions.value.length : targetOptions.value.length,
        countSelected: type.value == "source" ? sourceChecked.value.length : targetChecked.value.length,
        searchValue: keywords.value,
        checked: selectedAll.value,
        indeterminate: indeterminate.value,
        onSelectAllChange: (v) => {
          selectedAll.value = v;
        },
        onClear: handleClear
      });
    };
    const renderList$1 = () => {
      var _a;
      return (_a = slots[type.value]) == null ? void 0 : _a.call(slots, {
        selectedKeys: curSeleced.value,
        data: curData.value,
        onSelect: (val) => {
          computedSelected.value = val;
        }
      });
    };
    const renderItem = (item) => {
      return () => {
        var _a;
        return (_a = slots.item) == null ? void 0 : _a.call(slots, item);
      };
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_193, [
        createBaseVNode("div", _hoisted_266, [
          unref(slots)[`${unref(type)}-title`] ? (openBlock(), createBlock(resolveDynamicComponent(renderTitle), { key: 0 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createBaseVNode("span", _hoisted_345, [
              unref(showSelectAll) && !unref(simple) && (!unref(oneWay) || unref(type) != "target") ? (openBlock(), createBlock(unref(Checkbox), {
                key: 0,
                modelValue: selectedAll.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedAll.value = $event),
                indeterminate: indeterminate.value,
                disabled: !curData.value.length || unref(disabled)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(title.value), 1)
                ]),
                _: 1
              }, 8, ["modelValue", "indeterminate", "disabled"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(title.value), 1)
              ], 64))
            ]),
            createBaseVNode("span", _hoisted_431, [
              !unref(simple) && (!unref(oneWay) || unref(type) != "target") ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString(curSeleced.value.length) + " / " + toDisplayString(curData.value.length), 1)
              ], 64)) : unref(type) == "target" && !unref(simple) ? (openBlock(), createBlock(unref(IconButton), {
                key: 1,
                size: 14,
                onClick: handleClear
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main181))
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ])
          ], 64))
        ]),
        unref(showSearch) ? (openBlock(), createElementBlock("div", _hoisted_523, [
          createVNode(unref(Input), mergeProps({
            modelValue: keywords.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => keywords.value = $event)
          }, inputProps.value, {
            onInput: _cache[2] || (_cache[2] = (v) => unref(emits)("search", v, unref(type)))
          }), {
            suffix: withCtx(() => [
              createVNode(unref(_sfc_main182))
            ]),
            _: 1
          }, 16, ["modelValue"])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_614, [
          curData.value.length ? (openBlock(), createBlock(unref(Scrollbar), { key: 0 }, {
            default: withCtx(() => [
              unref(slots)[unref(type)] ? (openBlock(), createBlock(resolveDynamicComponent(renderList$1), { key: 0 })) : (openBlock(), createElementBlock("div", _hoisted_79, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(curData.value, (item) => {
                  return openBlock(), createElementBlock("div", {
                    key: item.value,
                    role: "listitem",
                    class: normalizeClass([
                      "yc-transfer-list-item",
                      {
                        "yc-transfer-list-item-disabled": item.disabled || unref(disabled)
                      }
                    ]),
                    onClick: ($event) => handleClick(item)
                  }, [
                    (!unref(oneWay) || unref(oneWay) && unref(type) == "source") && !unref(simple) ? (openBlock(), createBlock(unref(Checkbox), {
                      key: 0,
                      "model-value": curSeleced.value.includes(item.value),
                      disabled: item.disabled || unref(disabled),
                      onChange: (isSelected) => handleCheck(isSelected, item.value)
                    }, {
                      default: withCtx(() => [
                        unref(slots).item ? (openBlock(), createBlock(resolveDynamicComponent(renderItem(item)), { key: 0 })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(unref(slots).item ? "" : item.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["model-value", "disabled", "onChange"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createBaseVNode("span", _hoisted_93, [
                        unref(slots).item ? (openBlock(), createBlock(resolveDynamicComponent(renderItem(item)), { key: 0 })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(unref(slots).item ? "" : item.label), 1)
                      ]),
                      unref(type) == "target" && !unref(simple) ? (openBlock(), createBlock(unref(IconButton), {
                        key: 0,
                        "hover-size": 20
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main6))
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ], 64))
                  ], 10, _hoisted_86);
                }), 128))
              ]))
            ]),
            _: 1
          })) : createCommentVNode("", true),
          (openBlock(), createBlock(resolveDynamicComponent(unref(renderEmpty)("Transfer"))))
        ])
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Transfer/TransferPanel.vue.js
var TransferPanel = _export_sfc(_sfc_main183, [["__scopeId", "data-v-453f39e0"]]);

// node_modules/yc-design-vue/es/Transfer/Transfer.vue2.js
var _hoisted_194 = {
  key: 0,
  class: "yc-transfer-operations"
};
var _sfc_main184 = defineComponent({
  ...{
    name: "Transfer"
  },
  __name: "Transfer",
  props: {
    data: { default: () => [] },
    modelValue: { default: void 0 },
    defaultValue: { default: () => [] },
    selected: { default: void 0 },
    defaultSelected: { default: () => [] },
    disabled: { type: Boolean, default: false },
    simple: { type: Boolean, default: false },
    oneWay: { type: Boolean, default: false },
    showSearch: { type: Boolean, default: false },
    showSelectAll: { type: Boolean, default: true },
    title: { default: () => ["Source", "Target"] },
    sourceInputSearchProps: { default: () => {
      return {};
    } },
    targetInputSearchProps: { default: () => {
      return {};
    } }
  },
  emits: ["update:selected", "update:modelValue", "change", "select", "search"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { computedValue, targetChecked, computedSelected, sourceChecked } = useContext25().provide(props, emits);
    const handleAdd = () => {
      const checked = [...sourceChecked.value];
      computedValue.value = [...computedValue.value, ...sourceChecked.value];
      computedSelected.value = computedSelected.value.filter(
        (item) => !checked.includes(item)
      );
    };
    const handleDel = () => {
      const checked = [...targetChecked.value];
      computedValue.value = computedValue.value.filter(
        (item) => !checked.includes(item)
      );
      computedSelected.value = computedSelected.value.filter(
        (item) => !checked.includes(item)
      );
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-transfer",
          {
            "yc-transfer-simple": _ctx.simple,
            "yc-transfer-has-search": _ctx.showSearch
          }
        ])
      }, [
        createVNode(TransferPanel, { type: "source" }),
        !_ctx.simple ? (openBlock(), createElementBlock("div", _hoisted_194, [
          createVNode(unref(Button), {
            disabled: !unref(sourceChecked).length || _ctx.disabled,
            shape: "circle",
            onClick: handleAdd
          }, {
            icon: withCtx(() => [
              renderSlot(_ctx.$slots, "to-target-icon", {}, () => [
                createVNode(unref(_sfc_main57))
              ], true)
            ]),
            _: 3
          }, 8, ["disabled"]),
          !_ctx.oneWay ? (openBlock(), createBlock(unref(Button), {
            key: 0,
            disabled: !unref(targetChecked).length || _ctx.disabled,
            shape: "circle",
            onClick: handleDel
          }, {
            icon: withCtx(() => [
              renderSlot(_ctx.$slots, "to-source-icon", {}, () => [
                createVNode(unref(_sfc_main57), { rotate: 180 })
              ], true)
            ]),
            _: 3
          }, 8, ["disabled"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createVNode(TransferPanel, { type: "target" })
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Transfer/Transfer.vue.js
var _Transfer = _export_sfc(_sfc_main184, [["__scopeId", "data-v-5d0bc10e"]]);

// node_modules/yc-design-vue/es/Transfer/index.js
var Transfer = Object.assign(_Transfer, {
  install: (app) => {
    app.component("Yc" + _Transfer.name, _Transfer);
  }
});

// node_modules/yc-design-vue/es/Typography/Typography.vue.js
var _hoisted_195 = { class: "yc-typography" };
var _sfc_main185 = defineComponent({
  ...{
    name: "Typography"
  },
  __name: "Typography",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("article", _hoisted_195, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconCopy.vue.js
var _sfc_main186 = defineComponent({
  __name: "IconCopy",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "M20 6h18a2 2 0 0 1 2 2v22M8 16v24c0 1.105.891 2 1.996 2h20.007A1.99 1.99 0 0 0 32 40.008V15.997A1.997 1.997 0 0 0 30 14H10a2 2 0 0 0-2 2Z" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/_shared/icons/IconEdit.vue.js
var _sfc_main187 = defineComponent({
  __name: "IconEdit",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcIcon, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("path", { d: "m30.48 19.038 5.733-5.734a1 1 0 0 0 0-1.414l-5.586-5.586a1 1 0 0 0-1.414 0l-5.734 5.734m7 7L15.763 33.754a1 1 0 0 1-.59.286l-6.048.708a1 1 0 0 1-1.113-1.069l.477-6.31a1 1 0 0 1 .29-.631l14.7-14.7m7 7-7-7M6 42h36" }, null, -1)
        ])),
        _: 1,
        __: [0]
      }, 16);
    };
  }
});

// node_modules/yc-design-vue/es/Typography/TypographyBase.vue2.js
var _sfc_main188 = defineComponent({
  ...{
    name: "TypographyBase"
  },
  __name: "TypographyBase",
  props: {
    tag: { default: "span" },
    type: { default: void 0 },
    bold: { type: Boolean, default: false },
    disabled: { type: Boolean },
    mark: { type: Boolean, default: false },
    underline: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
    code: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    editing: { type: Boolean, default: void 0 },
    defaultEditing: { type: Boolean, default: false },
    editText: { default: "" },
    copyable: { type: Boolean, default: false },
    copyText: { default: "" },
    copyDelay: { default: 3e3 },
    ellipsis: { type: [Boolean, Object], default: true },
    editTooltiProps: { default: () => {
      return {};
    } },
    copyTooltiProps: { default: () => {
      return {};
    } }
  },
  emits: ["update:editing", "update:editText", "edit-start", "change", "copy", "edit-end", "ellipsis", "expand"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      editing,
      defaultEditing,
      editText,
      copyText,
      copyable,
      copyDelay,
      code,
      mark,
      delete: deletable,
      underline,
      ellipsis,
      bold
    } = toRefs(props);
    const { isSupported, copy } = useClipboard();
    const isCopied = ref(false);
    const contentRef = ref();
    const inputRef = ref();
    const computedEditing = useControlValue(
      editing,
      defaultEditing.value,
      (val) => {
        emits("update:editing", val);
      }
    );
    const computedText = useControlValue(editText, "", (val) => {
      emits("update:editText", val);
      emits("change", val);
    });
    ref({});
    const tags = computed(() => {
      const tags2 = ["mark", "code", "del", "u", "b"];
      const attrs = [
        mark.value,
        code.value,
        deletable.value,
        underline.value,
        bold.value
      ];
      return tags2.filter((_, i) => attrs[i]);
    });
    const DynamicTag = defineComponent({
      props: {
        tags: { type: Array, default: () => [] }
      },
      setup(props2, { slots }) {
        return () => {
          var _a;
          const { tags: tags2 } = toRefs(props2);
          const renderContent = (content, index2) => {
            return index2 >= tags2.value.length ? content : h(tags2.value[index2], null, renderContent(content, index2 + 1));
          };
          return renderContent((_a = slots.default) == null ? void 0 : _a.call(slots), 0);
        };
      }
    });
    const handleEdit = async () => {
      var _a;
      computedEditing.value = true;
      computedText.value = computedText.value ? computedText.value : getDomText(contentRef);
      emits("edit-start");
      await sleep(0);
      (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const handleEditEnd = () => {
      computedEditing.value = false;
      emits("edit-end");
    };
    const handleCopy = async () => {
      if (!copyable.value || !isSupported.value || isCopied.value) return;
      const value = copyText.value || getDomText(contentRef);
      copy(value);
      emits("copy", value);
      isCopied.value = true;
      await sleep(copyDelay.value);
      isCopied.value = false;
    };
    onMounted(() => {
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        class: normalizeClass([
          "yc-typography",
          {
            [`yc-typography-${_ctx.type}`]: _ctx.type,
            "yc-typography-bold": unref(bold),
            "yc-typography-disabled": _ctx.disabled,
            "yc-typography-underline": unref(underline),
            "yc-typography-delete": unref(deletable)
          }
        ]),
        ref_key: "contentRef",
        ref: contentRef
      }, {
        default: withCtx(() => [
          unref(computedEditing) ? (openBlock(), createBlock(unref(Input), {
            key: 0,
            modelValue: unref(computedText),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(computedText) ? computedText.value = $event : null),
            ref_key: "inputRef",
            ref: inputRef,
            onBlur: handleEditEnd
          }, null, 8, ["modelValue"])) : (openBlock(), createBlock(unref(DynamicTag), {
            key: 1,
            tags: tags.value
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ]),
            _: 3
          }, 8, ["tags"])),
          _ctx.editable && !unref(computedEditing) ? (openBlock(), createElementBlock("span", {
            key: 2,
            class: "yc-typography-operation-edit",
            onClick: handleEdit
          }, [
            createVNode(unref(Tooltip), mergeProps({
              content: "编辑",
              position: "top"
            }, _ctx.editTooltiProps), {
              default: withCtx(() => [
                createBaseVNode("span", null, [
                  createVNode(unref(_sfc_main187))
                ])
              ]),
              _: 1
            }, 16)
          ])) : createCommentVNode("", true),
          unref(copyable) ? (openBlock(), createElementBlock("span", {
            key: 3,
            class: "yc-typography-operation-copy",
            onClick: handleCopy
          }, [
            createVNode(unref(Tooltip), mergeProps({ position: "top" }, _ctx.copyTooltiProps), {
              content: withCtx(() => [
                renderSlot(_ctx.$slots, "copy-tooltip", { copied: isCopied.value }, () => [
                  createTextVNode(toDisplayString(`${isCopied.value ? "已复制" : "复制"}`), 1)
                ], true)
              ]),
              default: withCtx(() => [
                createBaseVNode("span", null, [
                  renderSlot(_ctx.$slots, "copy-icon", { copied: isCopied.value }, () => [
                    isCopied.value ? (openBlock(), createBlock(unref(_sfc_main8), {
                      key: 0,
                      color: "rgb(0, 180, 42)"
                    })) : (openBlock(), createBlock(unref(_sfc_main186), { key: 1 }))
                  ], true)
                ])
              ]),
              _: 3
            }, 16)
          ])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});

// node_modules/yc-design-vue/es/Typography/TypographyBase.vue.js
var TypographyBase = _export_sfc(_sfc_main188, [["__scopeId", "data-v-7d88f5c6"]]);

// node_modules/yc-design-vue/es/Typography/TypographyParagraph.vue2.js
var _sfc_main189 = defineComponent({
  ...{
    name: "TypographyParagraph"
  },
  __name: "TypographyParagraph",
  props: {
    blockquote: { type: Boolean, default: false },
    spacing: { default: "default" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TypographyBase, mergeProps(_ctx.$attrs, {
        tag: _ctx.blockquote ? "blockquote" : "div",
        class: [`yc-typography-spacing-${_ctx.spacing}`]
      }), createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 2
      }, [
        _ctx.$slots["copy-icon"] ? {
          name: "copy-icon",
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, "copy-icon", normalizeProps(guardReactiveProps(scope)), void 0, true)
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots["copy-tooltip"] ? {
          name: "copy-tooltip",
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, "copy-tooltip", normalizeProps(guardReactiveProps(scope)), void 0, true)
          ]),
          key: "1"
        } : void 0,
        _ctx.$slots["expand-node"] ? {
          name: "expand-node",
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, "expand-node", normalizeProps(guardReactiveProps(scope)), void 0, true)
          ]),
          key: "2"
        } : void 0
      ]), 1040, ["tag", "class"]);
    };
  }
});

// node_modules/yc-design-vue/es/Typography/TypographyParagraph.vue.js
var TypographyParagraph = _export_sfc(_sfc_main189, [["__scopeId", "data-v-4255e4b4"]]);

// node_modules/yc-design-vue/es/Typography/TypographyTitle.vue2.js
var _sfc_main190 = defineComponent({
  ...{
    name: "TypographyTitle"
  },
  __name: "TypographyTitle",
  props: {
    heading: { default: 1 }
  },
  setup(__props) {
    const props = __props;
    const { heading } = toRefs(props);
    const tag = computed(() => {
      return [1, 2, 3, 4, 5, 6].includes(heading.value) ? `h${heading.value}` : "h1";
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TypographyBase, mergeProps({ tag: tag.value }, _ctx.$attrs), createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 2
      }, [
        _ctx.$slots["copy-icon"] ? {
          name: "copy-icon",
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, "copy-icon", normalizeProps(guardReactiveProps(scope)), void 0, true)
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots["copy-tooltip"] ? {
          name: "copy-tooltip",
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, "copy-tooltip", normalizeProps(guardReactiveProps(scope)), void 0, true)
          ]),
          key: "1"
        } : void 0,
        _ctx.$slots["expand-node"] ? {
          name: "expand-node",
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, "expand-node", normalizeProps(guardReactiveProps(scope)), void 0, true)
          ]),
          key: "2"
        } : void 0
      ]), 1040, ["tag"]);
    };
  }
});

// node_modules/yc-design-vue/es/Typography/TypographyTitle.vue.js
var TypographyTitle = _export_sfc(_sfc_main190, [["__scopeId", "data-v-8073ffe7"]]);

// node_modules/yc-design-vue/es/Typography/TypographyText.vue.js
var _sfc_main191 = defineComponent({
  ...{
    name: "TypographyText"
  },
  __name: "TypographyText",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TypographyBase, normalizeProps(guardReactiveProps(_ctx.$attrs)), createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 2
      }, [
        _ctx.$slots["copy-icon"] ? {
          name: "copy-icon",
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, "copy-icon", normalizeProps(guardReactiveProps(scope)))
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots["copy-tooltip"] ? {
          name: "copy-tooltip",
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, "copy-tooltip", normalizeProps(guardReactiveProps(scope)))
          ]),
          key: "1"
        } : void 0,
        _ctx.$slots["expand-node"] ? {
          name: "expand-node",
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, "expand-node", normalizeProps(guardReactiveProps(scope)))
          ]),
          key: "2"
        } : void 0
      ]), 1040);
    };
  }
});

// node_modules/yc-design-vue/es/Typography/index.js
var Typography = Object.assign(_sfc_main185, {
  install: (app) => {
    app.component("Yc" + _sfc_main185.name, _sfc_main185);
    app.component("Yc" + TypographyParagraph.name, TypographyParagraph);
    app.component("Yc" + TypographyTitle.name, TypographyTitle);
    app.component("Yc" + _sfc_main191.name, _sfc_main191);
  }
});

// node_modules/yc-design-vue/es/Tabs/hooks/useContext.js
var TABS_CONTEXT_KEY = "tabs-context";
var useContext26 = () => {
  const provide$1 = (props, emits, listRef) => {
    const { size } = getGlobalConfig(props);
    const {
      activeKey,
      defaultActiveKey,
      position,
      trigger,
      autoSwitch,
      type,
      editable,
      headerPadding,
      destoryOnHide,
      direction: _direction
    } = toRefs(props);
    const computedActiveKey = useControlValue(
      activeKey,
      defaultActiveKey.value,
      (val) => {
        emits("update:activeKey", val);
      }
    );
    const titleRefs = ref([]);
    const tabRefs = ref([]);
    const direction = computed(() => {
      if (["top", "bottom"].includes(position.value)) {
        return "horizontal";
      } else if (["left", "right"].includes(position.value)) {
        return "vertical";
      }
      return _direction.value;
    });
    provide(TABS_CONTEXT_KEY, {
      computedActiveKey,
      editable,
      direction,
      trigger,
      type,
      destoryOnHide,
      position,
      headerPadding,
      size,
      listRef,
      titleRefs,
      tabRefs,
      emits
    });
    return {
      computedActiveKey,
      size,
      direction,
      position,
      autoSwitch,
      titleRefs,
      tabRefs
    };
  };
  const inject$1 = () => {
    return inject(TABS_CONTEXT_KEY, {
      computedActiveKey: ref(""),
      editable: ref(false),
      headerPadding: ref(false),
      trigger: ref("click"),
      type: ref("line"),
      direction: ref("horizontal"),
      destoryOnHide: ref(false),
      position: ref("top"),
      size: ref("medium"),
      titleRefs: ref([]),
      listRef: ref(),
      tabRefs: ref([]),
      emits: () => {
      }
    });
  };
  return {
    provide: provide$1,
    inject: inject$1
  };
};

// node_modules/yc-design-vue/es/Tabs/hooks/useTabsScroll.js
var useTabsScroll = (params) => {
  const { direction, panes, listRef } = params;
  const isScrollable = ref(false);
  const scrollDis = ref(0);
  const listWidth = ref(0);
  const listHeight = ref(0);
  const containerWidth = ref(0);
  const containerHeight = ref(0);
  const navHeight = ref(0);
  const preDisabled = computed(() => {
    return !scrollDis.value;
  });
  const nextDisabled = computed(() => {
    return direction.value == "horizontal" ? Math.abs(scrollDis.value) + containerWidth.value >= listWidth.value : Math.abs(scrollDis.value) + containerHeight.value >= listHeight.value;
  });
  useResizeObserver(listRef, () => calcScrollable());
  watch(
    () => panes.value.length,
    async () => {
      await sleep(0);
      calcScrollable();
    }
  );
  const getElementSize = () => {
    listHeight.value = listRef.value.scrollHeight;
    listWidth.value = listRef.value.scrollWidth;
    containerWidth.value = listRef.value.parentElement.offsetWidth;
    containerHeight.value = listRef.value.parentElement.offsetHeight;
    navHeight.value = listRef.value.parentElement.parentElement.offsetHeight;
  };
  const calcScrollable = () => {
    getElementSize();
    if (direction.value == "horizontal") {
      isScrollable.value = listWidth.value > containerWidth.value;
    } else {
      isScrollable.value = listHeight.value > containerHeight.value;
    }
  };
  const handleScroll = (type) => {
    getElementSize();
    const containerSize = direction.value === "horizontal" ? containerWidth.value : containerHeight.value;
    const listSize = direction.value === "horizontal" ? listWidth.value : listHeight.value;
    const scrollStep = containerSize * 0.8;
    let newscrollDis = scrollDis.value;
    if (type === "next") {
      newscrollDis = Math.max(
        scrollDis.value - scrollStep,
        containerSize - listSize
      );
    } else {
      newscrollDis = Math.min(scrollDis.value + scrollStep, 0);
    }
    scrollDis.value = newscrollDis;
  };
  return {
    navHeight,
    scrollDis,
    isScrollable,
    preDisabled,
    nextDisabled,
    handleScroll
  };
};

// node_modules/yc-design-vue/es/Tabs/TabPane.vue.js
var _hoisted_196 = { class: "yc-tabs-content-item" };
var _hoisted_267 = {
  key: 0,
  class: "yc-tabs-pane"
};
var _sfc_main192 = defineComponent({
  ...{
    name: "TabPane"
  },
  __name: "TabPane",
  props: {
    title: { default: "" },
    path: { default: "" },
    disabled: { type: Boolean, default: false },
    closable: { type: Boolean, default: void 0 },
    destoryOnHide: { type: Boolean, default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { computedActiveKey, destoryOnHide: _destoryOnHide } = useContext26().inject();
    const destoryOnHide = computed(() => {
      return !isUndefined(props.destoryOnHide) ? props.destoryOnHide : _destoryOnHide.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_196, [
        !destoryOnHide.value || unref(computedActiveKey) == _ctx.path ? (openBlock(), createElementBlock("div", _hoisted_267, [
          renderSlot(_ctx.$slots, "default")
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

// node_modules/yc-design-vue/es/Tabs/TabButton.vue2.js
var _sfc_main193 = defineComponent({
  __name: "TabButton",
  props: {
    className: { type: Boolean, default: true },
    type: {},
    direction: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(IconButton), mergeProps({
        size: 14,
        class: [
          `yc-tabs-nav-${_ctx.type ? `${_ctx.type}-` : ""}button`,
          {
            [`yc-tabs-nav-button-${_ctx.direction}`]: _ctx.direction
          }
        ],
        "hover-color": "rgb(242,243,245)"
      }, _ctx.$attrs), {
        default: withCtx(() => [
          _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
});

// node_modules/yc-design-vue/es/Tabs/TabButton.vue.js
var TabButton = _export_sfc(_sfc_main193, [["__scopeId", "data-v-602c0f50"]]);

// node_modules/yc-design-vue/es/Tabs/TabsTab.vue2.js
var _sfc_main194 = defineComponent({
  __name: "TabsTab",
  props: {
    node: {},
    index: {}
  },
  setup(__props) {
    const props = __props;
    const { node, index: index2 } = toRefs(props);
    const {
      computedActiveKey,
      titleRefs,
      tabRefs,
      trigger,
      editable,
      type,
      direction,
      position,
      headerPadding,
      size,
      emits
    } = useContext26().inject();
    const renderTitle = (node2) => {
      const { slots, title } = node2;
      return slots.title ?? (() => title);
    };
    const handleChange = (node2, triggerType) => {
      const { disabled, path } = node2;
      if (computedActiveKey.value == path || disabled || triggerType != trigger.value) {
        return;
      }
      computedActiveKey.value = path;
      emits("change", path);
      emits("tab-click", path);
    };
    const handleDel = async (node2) => {
      emits("delete", node2.path);
    };
    onMounted(() => {
      if (computedActiveKey.value != node.value.path) {
        if (computedActiveKey.value || index2.value) return;
        computedActiveKey.value = node.value.path;
        return;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        tabindex: "0",
        class: normalizeClass([
          "yc-tabs-tab",
          `yc-tabs-tab-type-${unref(type)}`,
          `yc-tabs-tab-${unref(direction)}`,
          `yc-tabs-tab-size-${unref(size)}`,
          {
            [`yc-tabs-tab-${unref(position)}`]: unref(position),
            "yc-tabs-tab-no-padding": !unref(headerPadding) && unref(direction) == "horizontal" && ["line", "text"].includes(unref(type)),
            "yc-tabs-tab-active": unref(computedActiveKey) == unref(node).path,
            "yc-tabs-tab-disabled": unref(node).disabled
          }
        ]),
        ref: (el) => unref(tabRefs)[unref(index2)] = el,
        onMouseenter: _cache[1] || (_cache[1] = ($event) => handleChange(unref(node), "hover")),
        onClick: _cache[2] || (_cache[2] = ($event) => handleChange(unref(node), "click"))
      }, [
        createBaseVNode("span", {
          class: "yc-tabs-tab-title",
          ref: (el) => unref(titleRefs)[unref(index2)] = el
        }, [
          (openBlock(), createBlock(resolveDynamicComponent(renderTitle(unref(node)))))
        ], 512),
        unref(editable) && (unref(isUndefined)(unref(node).closable) || unref(node).closable) ? (openBlock(), createBlock(TabButton, {
          key: 0,
          type: "close",
          onClick: _cache[0] || (_cache[0] = ($event) => handleDel(unref(node)))
        })) : createCommentVNode("", true)
      ], 34);
    };
  }
});

// node_modules/yc-design-vue/es/Tabs/TabsTab.vue.js
var TabsTab = _export_sfc(_sfc_main194, [["__scopeId", "data-v-ef3205ae"]]);

// node_modules/yc-design-vue/es/Tabs/TabsNavInk.vue2.js
var _sfc_main195 = defineComponent({
  __name: "TabsNavInk",
  props: {
    curIndex: {},
    panes: {}
  },
  setup(__props) {
    const props = __props;
    const { curIndex, panes } = toRefs(props);
    const { titleRefs, listRef, direction, editable } = useContext26().inject();
    const sliderStyle = computed(() => {
      var _a, _b, _c;
      const curPane = panes.value[curIndex.value];
      const closeWidth = editable.value && (isUndefined(curPane.closable) || curPane.closable) ? 22 : 0;
      const titleRef = titleRefs.value[curIndex.value];
      const { left, top } = ((_b = (_a = listRef.value) == null ? void 0 : _a.getBoundingClientRect) == null ? void 0 : _b.call(_a)) ?? {
        left: 0,
        top: 0
      };
      const { scrollLeft, scrollTop } = listRef.value ?? {
        scrollLeft: 0,
        scrollTop: 0
      };
      const { left: curLeft, top: curTop } = ((_c = titleRef == null ? void 0 : titleRef.getBoundingClientRect) == null ? void 0 : _c.call(titleRef)) ?? {
        left: 0,
        top: 0
      };
      const { offsetHeight, offsetWidth } = titleRef ?? {
        offsetHeight: 0,
        offsetWidth: 0
      };
      if (direction.value == "horizontal") {
        return {
          width: valueToPx(offsetWidth + closeWidth),
          left: valueToPx(curLeft - left + scrollLeft)
        };
      } else {
        return {
          height: valueToPx(offsetHeight),
          top: valueToPx(curTop - top + scrollTop)
        };
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "yc-tabs-nav-ink",
        style: normalizeStyle(sliderStyle.value)
      }, null, 4);
    };
  }
});

// node_modules/yc-design-vue/es/Tabs/TabsNavInk.vue.js
var TabsNavInk = _export_sfc(_sfc_main195, [["__scopeId", "data-v-cb869c14"]]);

// node_modules/yc-design-vue/es/Tabs/Tabs.vue2.js
var _hoisted_197 = { class: "yc-tabs-nav" };
var _hoisted_268 = {
  key: 3,
  class: "yc-tabs-nav-extra"
};
var _sfc_main196 = defineComponent({
  ...{
    name: "Tabs"
  },
  __name: "Tabs",
  props: {
    activeKey: { default: void 0 },
    defaultActiveKey: { default: "" },
    position: { default: void 0 },
    size: { default: void 0 },
    type: { default: "line" },
    direction: { default: "horizontal" },
    editable: { type: Boolean, default: false },
    showAddButton: { type: Boolean, default: false },
    destoryOnHide: { type: Boolean, default: false },
    justify: { type: Boolean, default: false },
    animation: { type: Boolean, default: false },
    headerPadding: { type: Boolean, default: true },
    autoSwitch: { type: Boolean, default: false },
    hideContent: { type: Boolean, default: false },
    trigger: { default: "click" }
  },
  emits: ["update:activeKey", "change", "tab-click", "add", "delete"],
  setup(__props, { emit: __emit }) {
    const slots = useSlots();
    const props = __props;
    const emits = __emit;
    const listRef = ref();
    const { computedActiveKey, size, direction, autoSwitch, position } = useContext26().provide(props, emits, listRef);
    const tabPanes = computed(
      () => {
        var _a;
        return findComponentsFromVnodes(((_a = slots.default) == null ? void 0 : _a.call(slots)) || [], _sfc_main192.name);
      }
    );
    const panes = computed(() => {
      return tabPanes.value.map((item) => {
        return {
          title: "",
          path: "",
          disabled: false,
          ...item.props || {},
          slots: item.children
        };
      });
    });
    const showAddButton = computed(() => {
      return props.showAddButton && ["line", "card", "card-gutter"].includes(props.type);
    });
    const curIndex = computed(() => {
      const index2 = panes.value.findIndex((item) => {
        return item.path == computedActiveKey.value;
      });
      return index2 < 0 ? 0 : index2;
    });
    const {
      scrollDis,
      isScrollable,
      preDisabled,
      nextDisabled,
      navHeight,
      handleScroll
    } = useTabsScroll({
      listRef,
      panes,
      direction
    });
    const handleAdd = async () => {
      emits("add");
      if (!autoSwitch.value) return;
      await nextTick();
      computedActiveKey.value = panes.value[panes.value.length - 1].path;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-tabs",
          `yc-tabs-${unref(direction)}`,
          `yc-tabs-type-${_ctx.type}`,
          `yc-tabs-size-${unref(size)}`,
          {
            "yc-tabs-animation": _ctx.animation,
            "yc-tabs-justify": unref(direction) == "horizontal" && _ctx.justify,
            "yc-tabs-no-padding": _ctx.headerPadding && ["line", "text"].includes(_ctx.type) && props.direction === "horizontal",
            [`yc-tabs-${unref(position)}`]: unref(position)
          }
        ])
      }, [
        createBaseVNode("div", _hoisted_197, [
          unref(isScrollable) ? (openBlock(), createBlock(TabButton, {
            key: 0,
            disabled: unref(preDisabled),
            direction: unref(direction) == "horizontal" ? "left" : "up",
            onClick: _cache[0] || (_cache[0] = ($event) => unref(handleScroll)("pre"))
          }, {
            default: withCtx(() => [
              createVNode(unref(_sfc_main57), {
                rotate: unref(direction) == "horizontal" ? 180 : -90,
                size: 14
              }, null, 8, ["rotate"])
            ]),
            _: 1
          }, 8, ["disabled", "direction"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass([
              "yc-tabs-nav-tab",
              {
                "yc-tabs-nav-tab-scroll": unref(isScrollable)
              }
            ])
          }, [
            createBaseVNode("div", {
              class: "yc-tabs-nav-tab-list",
              style: normalizeStyle({
                transform: `translate${unref(direction) == "horizontal" ? "X" : "Y"}(${unref(valueToPx)(unref(scrollDis))})`
              }),
              ref_key: "listRef",
              ref: listRef
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(panes.value, (item, i) => {
                return openBlock(), createBlock(TabsTab, {
                  key: i,
                  index: i,
                  node: item
                }, null, 8, ["index", "node"]);
              }), 128)),
              _ctx.type == "line" ? (openBlock(), createBlock(TabsNavInk, {
                key: 0,
                "cur-index": curIndex.value,
                panes: panes.value
              }, null, 8, ["cur-index", "panes"])) : createCommentVNode("", true)
            ], 4)
          ], 2),
          unref(isScrollable) ? (openBlock(), createBlock(TabButton, {
            key: 1,
            disabled: unref(nextDisabled),
            direction: unref(direction) == "horizontal" ? "right" : "down",
            onClick: _cache[1] || (_cache[1] = ($event) => unref(handleScroll)("next"))
          }, {
            default: withCtx(() => [
              createVNode(unref(_sfc_main57), {
                rotate: unref(direction) == "horizontal" ? 0 : 90,
                size: 14
              }, null, 8, ["rotate"])
            ]),
            _: 1
          }, 8, ["disabled", "direction"])) : createCommentVNode("", true),
          showAddButton.value ? (openBlock(), createBlock(TabButton, {
            key: 2,
            type: "add",
            size: "12",
            onClick: handleAdd
          }, {
            default: withCtx(() => [
              createVNode(unref(_sfc_main80), { size: 12 })
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.$slots.extra ? (openBlock(), createElementBlock("div", _hoisted_268, [
            renderSlot(_ctx.$slots, "extra", {}, void 0, true)
          ])) : createCommentVNode("", true)
        ]),
        !_ctx.hideContent ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "yc-tabs-content",
          style: normalizeStyle({
            height: unref(direction) == "vertical" ? `${unref(valueToPx)(unref(navHeight))}` : ""
          })
        }, [
          createBaseVNode("div", {
            class: "yc-tabs-content-list",
            style: normalizeStyle({
              transform: `translate${unref(direction) == "horizontal" ? "X" : "Y"}(${-curIndex.value * 100}%)`
            })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(tabPanes.value, (node, i) => {
              return openBlock(), createBlock(resolveDynamicComponent(node), { key: i });
            }), 128))
          ], 4)
        ], 4)) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/Tabs/Tabs.vue.js
var _Tabs = _export_sfc(_sfc_main196, [["__scopeId", "data-v-d4474e51"]]);

// node_modules/yc-design-vue/es/Tabs/index.js
var Tabs = Object.assign(_Tabs, {
  install: (app) => {
    app.component("Yc" + _Tabs.name, _Tabs);
    app.component("Yc" + _sfc_main192.name, _sfc_main192);
  }
});

// node_modules/yc-design-vue/es/VerificationCode/index.vue2.js
var _sfc_main197 = defineComponent({
  ...{
    name: "VerificationCode"
  },
  __name: "index",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: "" },
    length: { default: 6 },
    size: { default: void 0 },
    disabled: { type: Boolean, default: false },
    masked: { type: Boolean },
    readonly: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    separator: {},
    formatter: {}
  },
  emits: ["update:modelValue", "input", "change", "finish"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { modelValue, defaultValue, length: _length } = toRefs(props);
    const { formatter } = props;
    const { size } = getGlobalConfig(props);
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        if (val.length == _length.value) {
          emits("finish", val);
        }
        emits("update:modelValue", val);
      }
    );
    const length = computed(
      () => new Array(_length.value).fill("").map(() => nanoid())
    );
    const formatValue = ref([]);
    const inputValue = computed(() => {
      const base = [...computedValue.value];
      for (let i = base.length; i < _length.value; i++) {
        base[i] = "";
      }
      return base.map((item, i) => {
        const format = formatter == null ? void 0 : formatter(item, i, formatValue.value.join(""));
        return item && (isNumber(format) || isString(format)) ? format : item;
      });
    });
    const inputList = ref([]);
    const isWritable = (i) => {
      for (let k = 1; k < i; k++) {
        if (!inputValue.value[k]) return false;
      }
      return true;
    };
    const handleInput = async (v, ev, i) => {
      const value = v ? v.at(v.length - 1) : " ";
      const format = formatter == null ? void 0 : formatter(value, i, formatValue.value.join(""));
      if (isFunction(formatter) && !isNumber(format) && !isString(format)) {
        return;
      }
      emits("input", value, ev, i);
      computedValue.value = computedValue.value.slice(0, i) + value + computedValue.value.slice(i + 1);
      if (v && !inputValue.value[i + 1] && i < _length.value - 1) {
        inputList.value[i].blur();
        await sleep(0);
        inputList.value[i + 1].focus();
      }
    };
    const handleMousedown = (e, i) => {
      if (isWritable(i)) return;
      e.preventDefault();
    };
    const handleClick = async (i) => {
      var _a;
      if (isWritable(i)) return;
      const index2 = inputValue.value.findIndex((item) => !item);
      await sleep(0);
      (_a = inputList.value[index2]) == null ? void 0 : _a.focus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["yc-verification-code", `yc-verification-code-size-${unref(size)}`])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(length.value, (v, i) => {
          var _a;
          return openBlock(), createElementBlock(Fragment, { key: v }, [
            createVNode(unref(Input), {
              "model-value": inputValue.value[i],
              size: unref(size),
              disabled: _ctx.disabled,
              error: _ctx.error,
              "invisible-button": false,
              visibility: _ctx.masked,
              readonly: _ctx.readonly || !isWritable(i),
              class: normalizeClass([
                {
                  "yc-input-disabled-write": !isWritable(i)
                }
              ]),
              ref_for: true,
              ref: (el) => inputList.value[i] = el,
              onClick: ($event) => handleClick(i),
              onMousedown: ($event) => handleMousedown($event, i),
              onInput: (v2, ev) => handleInput(v2, ev, i),
              onChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("change", unref(computedValue)))
            }, null, 8, ["model-value", "size", "disabled", "error", "visibility", "readonly", "class", "onClick", "onMousedown", "onInput"]),
            ((_a = _ctx.separator) == null ? void 0 : _a.call(_ctx, i, inputValue.value[i])) ? (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(_ctx.separator(i, inputValue.value[i]))), { key: 0 })) : createCommentVNode("", true)
          ], 64);
        }), 128))
      ], 2);
    };
  }
});

// node_modules/yc-design-vue/es/VerificationCode/index.vue.js
var _VerificationCode = _export_sfc(_sfc_main197, [["__scopeId", "data-v-b458a923"]]);

// node_modules/yc-design-vue/es/VerificationCode/index.js
var VerificationCode = Object.assign(_VerificationCode, {
  install: (app) => {
    app.component("Yc" + _VerificationCode.name, _VerificationCode);
  }
});

// node_modules/yc-design-vue/es/Watermark/index.vue2.js
var _sfc_main198 = defineComponent({
  ...{
    name: "Watermark"
  },
  __name: "index",
  props: {
    content: { default: "" },
    image: { default: "" },
    width: { default: void 0 },
    height: { default: void 0 },
    gap: { default: () => [90, 90] },
    offset: { default: () => [45, 45] },
    rotate: { default: -22 },
    font: { default: () => {
      return {
        color: "rgba(0, 0, 0, 0.15)",
        fontSize: 16,
        fontFamily: "sans-serif",
        fontStyle: "normal",
        textAlign: "center",
        fontWeight: "normal"
      };
    } },
    zIndex: { default: 6 },
    alpha: { default: 1 },
    grayscale: { type: Boolean, default: false },
    repeat: { type: Boolean, default: true },
    staggered: { type: Boolean, default: true },
    antiTamper: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const {
      width,
      height,
      alpha,
      image,
      grayscale,
      rotate,
      repeat,
      staggered,
      antiTamper,
      zIndex
    } = toRefs(props);
    const containerRef = ref();
    const ratio = window.devicePixelRatio || 1;
    const watermarkMap = ref(/* @__PURE__ */ new Map());
    const color = computed(() => {
      var _a;
      return (_a = props.font) == null ? void 0 : _a.color;
    });
    const fontSize = computed(() => {
      var _a;
      return ((_a = props.font) == null ? void 0 : _a.fontSize) ?? 16;
    });
    const fontWeight = computed(() => {
      var _a;
      return ((_a = props.font) == null ? void 0 : _a.fontWeight) ?? "normal";
    });
    const fontStyle = computed(() => {
      var _a;
      return ((_a = props.font) == null ? void 0 : _a.fontStyle) ?? "normal";
    });
    const fontFamily = computed(() => {
      var _a;
      return ((_a = props.font) == null ? void 0 : _a.fontFamily) ?? "sans-serif";
    });
    const textAlign = computed(() => {
      var _a;
      return ((_a = props.font) == null ? void 0 : _a.textAlign) ?? "center";
    });
    const contents = computed(
      () => isArray(props.content) ? props.content : [props.content]
    );
    const gapX = computed(() => {
      var _a;
      return ((_a = props.gap) == null ? void 0 : _a[0]) ?? 90;
    });
    const gapY = computed(() => {
      var _a;
      return ((_a = props.gap) == null ? void 0 : _a[1]) ?? 90;
    });
    const gapXCenter = computed(() => gapX.value / 2);
    const gapYCenter = computed(() => gapY.value / 2);
    const offsetLeft = computed(() => {
      var _a;
      return ((_a = props.offset) == null ? void 0 : _a[0]) ?? gapXCenter.value;
    });
    const offsetTop = computed(() => {
      var _a;
      return ((_a = props.offset) == null ? void 0 : _a[1]) ?? gapYCenter.value;
    });
    const markStyle = computed(() => {
      const left = offsetLeft.value - gapXCenter.value;
      const top = offsetTop.value - gapYCenter.value;
      return {
        position: "absolute",
        left: left > 0 ? `${left}px` : 0,
        top: top > 0 ? `${top}px` : 0,
        width: left > 0 ? `calc(100% - ${left}px)` : "100%",
        height: top > 0 ? `calc(100% - ${top}px)` : "100%",
        pointerEvents: "none",
        backgroundRepeat: props.repeat ? "repeat" : "no-repeat",
        backgroundPosition: `${left > 0 ? 0 : left}px ${top > 0 ? 0 : top}px`,
        zIndex: zIndex.value ?? 6
      };
    });
    const isStaggered = computed(() => staggered.value && repeat.value);
    function camelToKebab(camelCase) {
      return camelCase.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    }
    function styleToString(style) {
      return Object.entries(style).map(([key, value]) => `${camelToKebab(key)}:${value}`).join(";");
    }
    function canvasToGray(canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = imageData;
      for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = brightness;
        data[i + 1] = brightness;
        data[i + 2] = brightness;
      }
      ctx.putImageData(imageData, 0, 0);
    }
    const appendWatermark = (base64, width2) => {
      var _a;
      if (containerRef.value) {
        const watermarkEle = watermarkMap.value.get(containerRef.value);
        if (watermarkEle) {
          if (containerRef.value.contains(watermarkEle)) {
            containerRef.value.removeChild(watermarkEle);
          }
          watermarkMap.value.delete(containerRef.value);
        }
        const newWatermarkEle = document.createElement("div");
        newWatermarkEle.setAttribute(
          "style",
          styleToString({
            ...markStyle.value,
            backgroundImage: `url('${base64}')`,
            backgroundSize: `${width2}px`
          })
        );
        (_a = containerRef.value) == null ? void 0 : _a.append(newWatermarkEle);
        watermarkMap.value.set(containerRef.value, newWatermarkEle);
      }
    };
    const getMarkSize = (ctx) => {
      let defaultWidth = 120;
      let defaultHeight = 28;
      if (!image.value && ctx.measureText) {
        ctx.font = `${fontSize.value}px ${fontFamily.value}`;
        const widths = contents.value.map((item) => ctx.measureText(item).width);
        defaultWidth = Math.ceil(Math.max(...widths));
        defaultHeight = fontSize.value * contents.value.length + (contents.value.length - 1) * 3;
      }
      return [width.value ?? defaultWidth, height.value ?? defaultHeight];
    };
    const renderWatermark = () => {
      var _a;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const [markWidth, markheight] = getMarkSize(ctx);
      const realMarkWidth = markWidth * ratio;
      const realMarkHeight = markheight * ratio;
      const canvasWidth = (gapX.value + markWidth) * ratio;
      const canvasHeight = (gapY.value + markheight) * ratio;
      const drawX = gapX.value / 2 * ratio;
      const drawY = gapY.value / 2 * ratio;
      const rotateX = canvasWidth / 2;
      const rotateY = canvasHeight / 2;
      const baseSize = isStaggered.value ? 2 : 1;
      const fillWidth = (gapX.value + markWidth) * baseSize;
      canvas.width = canvasWidth * baseSize;
      canvas.height = canvasHeight * baseSize;
      ctx.globalAlpha = alpha.value;
      ctx.save();
      ctx.translate(rotateX, rotateY);
      ctx.rotate(Math.PI / 180 * rotate.value);
      ctx.translate(-rotateX, -rotateY);
      const drawImage = () => {
        ctx.restore();
        if (isStaggered.value) {
          ctx.drawImage(
            canvas,
            0,
            0,
            canvasWidth,
            canvasHeight,
            canvasWidth,
            canvasHeight,
            canvasWidth,
            canvasHeight
          );
        }
        grayscale.value && canvasToGray(canvas);
        appendWatermark(canvas.toDataURL(), fillWidth);
      };
      if (image.value) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, drawX, drawY, realMarkWidth, realMarkHeight);
          drawImage();
        };
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        img.src = image.value;
      } else {
        const mergedFontSize = Number(fontSize.value) * ratio;
        ctx.font = `${fontStyle.value} normal ${fontWeight.value} ${mergedFontSize}px/${markheight}px ${fontFamily.value}`;
        ctx.fillStyle = color.value;
        ctx.textAlign = textAlign.value;
        ctx.textBaseline = "top";
        ctx.translate(realMarkWidth / 2, 0);
        (_a = contents.value) == null ? void 0 : _a.forEach((item, index2) => {
          ctx.fillText(
            item ?? "",
            drawX,
            drawY + index2 * (mergedFontSize + 3 * ratio)
          );
        });
        drawImage();
      }
    };
    const isWatermarkEle = (ele) => {
      return Array.from(watermarkMap.value.values()).includes(ele);
    };
    const handleMutations = (mutations) => {
      if (!antiTamper.value) return;
      for (const mutation of mutations) {
        const isRemoved = Array.from(mutation.removedNodes).some(
          (node) => isWatermarkEle(node)
        );
        const isModified = mutation.type === "attributes" && isWatermarkEle(mutation.target);
        if (isRemoved || isModified) {
          renderWatermark();
          break;
        }
      }
    };
    watch(props, renderWatermark, { deep: true, flush: "post" });
    useMutationObserver(containerRef, handleMutations, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });
    onMounted(() => {
      renderWatermark();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "yc-watermark",
        ref_key: "containerRef",
        ref: containerRef
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 512);
    };
  }
});

// node_modules/yc-design-vue/es/Watermark/index.vue.js
var _Watermark = _export_sfc(_sfc_main198, [["__scopeId", "data-v-2c1dbccf"]]);

// node_modules/yc-design-vue/es/Watermark/index.js
var Watermark = Object.assign(_Watermark, {
  install: (app) => {
    app.component("Yc" + _Watermark.name, _Watermark);
  }
});

// node_modules/yc-design-vue/es/index.js
var components = {
  Affix,
  Alert,
  Anchor,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Button,
  Breadcrumb,
  Card,
  Calendar,
  Carousel,
  Checkbox,
  Collapse,
  ColorPicker,
  Cascader,
  Comment: Comment2,
  ConfigProvider,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Grid,
  Icon,
  Image: Image2,
  Input,
  InputNumber,
  InputTag,
  Layout,
  Link,
  List,
  Menu,
  Mention,
  Modal,
  Message,
  Notification,
  OverflowList,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  ResizeBox,
  Result,
  Scrollbar,
  Select,
  Skeleton,
  Slider,
  Space,
  Split,
  Statistic,
  Steps,
  Spin,
  Switch,
  Tag,
  Timeline,
  Textarea,
  TimePicker,
  Tooltip,
  Transfer,
  Trigger,
  Typography,
  Tabs,
  VerificationCode,
  Watermark
};
var index = {
  ...components,
  AnchorLink,
  AvatarGroup,
  ButtonGroup: _sfc_main47,
  BreadcrumbItem,
  CardGrid,
  CardMeta,
  CarouselItem,
  CheckboxGroup: _sfc_main22,
  CollapseItem,
  Countdown: _sfc_main172,
  DescriptionsItem: _sfc_main95,
  DropdownButton: _sfc_main56,
  Doption,
  Dgroup,
  Dsubmenu,
  GridCol: _sfc_main102,
  GridItem: _sfc_main105,
  GridRow,
  ImagePreview,
  ImagePreviewAction,
  ImagePreviewGroup: _sfc_main119,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
  ListItem,
  ListItemMeta,
  MenuItem,
  MenuItemGroup,
  Option,
  Optgroup,
  RadioGroup: _sfc_main66,
  SkeletonLine,
  SkeletonShape,
  Step,
  SubMenu,
  TabPane: _sfc_main192,
  TimelineItem,
  TypographyText: _sfc_main191,
  TypographyTitle,
  TypographyParagraph,
  install: (app) => {
    for (const key of Object.keys(components)) {
      app.use(components[key]);
    }
  }
};
export {
  Affix,
  Alert,
  Anchor,
  AnchorLink,
  AutoComplete,
  Avatar,
  AvatarGroup,
  BackTop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  _sfc_main47 as ButtonGroup,
  Calendar,
  Card,
  CardGrid,
  CardMeta,
  Carousel,
  CarouselItem,
  Cascader,
  Checkbox,
  _sfc_main22 as CheckboxGroup,
  Collapse,
  CollapseItem,
  ColorPicker,
  Comment2 as Comment,
  ConfigProvider,
  _sfc_main172 as Countdown,
  Descriptions,
  _sfc_main95 as DescriptionsItem,
  Dgroup,
  Divider,
  Doption,
  Drawer,
  Dropdown,
  _sfc_main56 as DropdownButton,
  Dsubmenu,
  Empty,
  Grid,
  _sfc_main102 as GridCol,
  _sfc_main105 as GridItem,
  GridRow,
  Icon,
  Image2 as Image,
  ImagePreview,
  ImagePreviewAction,
  _sfc_main119 as ImagePreviewGroup,
  Input,
  InputNumber,
  InputTag,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
  Link,
  List,
  ListItem,
  ListItemMeta,
  Mention,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  Modal,
  Notification,
  Optgroup,
  Option,
  OverflowList,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  _sfc_main66 as RadioGroup,
  Rate,
  ResizeBox,
  Result,
  Scrollbar,
  Select,
  Skeleton,
  SkeletonLine,
  SkeletonShape,
  Slider,
  Space,
  Spin,
  Split,
  Statistic,
  Step,
  Steps,
  SubMenu,
  Switch,
  _sfc_main192 as TabPane,
  Tabs,
  Tag,
  Textarea,
  TimePicker,
  Timeline,
  TimelineItem,
  Tooltip,
  Transfer,
  Trigger,
  Typography,
  TypographyParagraph,
  _sfc_main191 as TypographyText,
  TypographyTitle,
  VerificationCode,
  Watermark,
  components,
  index as default
};
//# sourceMappingURL=yc-design-vue.js.map
