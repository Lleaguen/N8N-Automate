import {
  require_react
} from "./chunk-32E4H3EV.js";
import {
  __commonJS,
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var React = require_react();
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var assign = Object.assign;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        var didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function warnIfStringRefCannotBeAutoConverted(config, self) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        function defineKeyPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingKey = function() {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
        }
        function defineRefPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function jsxDEV(type, config, maybeKey, source, self) {
          {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            if (maybeKey !== void 0) {
              {
                checkKeyStringCoercion(maybeKey);
              }
              key = "" + maybeKey;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            if (hasValidRef(config)) {
              ref = config.ref;
              warnIfStringRefCannotBeAutoConverted(config, self);
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function isValidElement(object) {
          {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
        }
        function getDeclarationErrorAddendum() {
          {
            if (ReactCurrentOwner$1.current) {
              var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
        }
        function getSourceInfoErrorAddendum(source) {
          {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
        }
        function validateExplicitKey(element, parentType) {
          {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        var didWarnAboutKeySpread = {};
        function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
          {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendum(source);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = jsxDEV(type, props, key, source, self);
            if (element == null) {
              return element;
            }
            if (validType) {
              var children = props.children;
              if (children !== void 0) {
                if (isStaticChildren) {
                  if (isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                      validateChildKeys(children[i], type);
                    }
                    if (Object.freeze) {
                      Object.freeze(children);
                    }
                  } else {
                    error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                  }
                } else {
                  validateChildKeys(children, type);
                }
              }
            }
            {
              if (hasOwnProperty.call(props, "key")) {
                var componentName = getComponentNameFromType(type);
                var keys = Object.keys(props).filter(function(k) {
                  return k !== "key";
                });
                var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
                if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                  var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                  error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                  didWarnAboutKeySpread[componentName + beforeExample] = true;
                }
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
        }
        function jsxWithValidationStatic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, true);
          }
        }
        function jsxWithValidationDynamic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, false);
          }
        }
        var jsx29 = jsxWithValidationDynamic;
        var jsxs21 = jsxWithValidationStatic;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = jsx29;
        exports.jsxs = jsxs21;
      })();
    }
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/@weldjs/react/dist/index.js
var import_react = __toESM(require_react());
var import_react2 = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_react3 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_react4 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var import_react5 = __toESM(require_react());
var import_react6 = __toESM(require_react());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var import_react7 = __toESM(require_react());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var import_react8 = __toESM(require_react());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var import_react9 = __toESM(require_react());
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var import_jsx_runtime16 = __toESM(require_jsx_runtime());
var import_jsx_runtime17 = __toESM(require_jsx_runtime());
var import_jsx_runtime18 = __toESM(require_jsx_runtime());
var import_jsx_runtime19 = __toESM(require_jsx_runtime());
var import_react10 = __toESM(require_react());
var import_jsx_runtime20 = __toESM(require_jsx_runtime());
var import_react11 = __toESM(require_react());
var import_jsx_runtime21 = __toESM(require_jsx_runtime());
var import_react12 = __toESM(require_react());
var import_jsx_runtime22 = __toESM(require_jsx_runtime());
var import_react13 = __toESM(require_react());
var import_jsx_runtime23 = __toESM(require_jsx_runtime());
var import_jsx_runtime24 = __toESM(require_jsx_runtime());
var import_jsx_runtime25 = __toESM(require_jsx_runtime());
var import_jsx_runtime26 = __toESM(require_jsx_runtime());
var import_jsx_runtime27 = __toESM(require_jsx_runtime());
var import_react14 = __toESM(require_react());
var import_jsx_runtime28 = __toESM(require_jsx_runtime());
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
function useWeld(responseOrFactory, deps) {
  const response = (0, import_react.useMemo)(
    typeof responseOrFactory === "function" ? responseOrFactory : () => responseOrFactory,
    // If a factory + deps were passed use those deps.
    // If a direct response was passed, use the response itself as the dep
    // so a new object reference triggers a new subscription.
    deps ?? [responseOrFactory]
  );
  const { signal } = response;
  const data = (0, import_react.useSyncExternalStore)(
    (notify2) => signal.data.subscribe(notify2),
    () => signal.data.value,
    () => null
  );
  const status = (0, import_react.useSyncExternalStore)(
    (notify2) => signal.status.subscribe(notify2),
    () => signal.status.value,
    () => "idle"
  );
  const error = (0, import_react.useSyncExternalStore)(
    (notify2) => signal.error.subscribe(notify2),
    () => signal.error.value,
    () => null
  );
  return { data, status, error, loading: status === "loading" };
}
var defaultTokens = {
  // ── Backgrounds ────────────────────────────────────────────────────────────
  // Ultra dark, matte. No gradients at rest.
  "--weld-bg-base": "#09090b",
  // page background
  "--weld-bg-surface": "#0d0d10",
  // cards, panels
  "--weld-bg-elevated": "#111115",
  // dropdowns, tooltips, modals
  // ── Borders — extremely subtle, almost invisible ───────────────────────────
  "--weld-border": "rgba(255,255,255,0.06)",
  "--weld-border-hover": "rgba(255,255,255,0.10)",
  "--weld-border-focus": "rgba(0,212,255,0.40)",
  // neon only on focus
  // ── Weld Plasma — used ONLY on active/interactive states ──────────────────
  // Cyan: focused inputs, active buttons, online indicator
  "--weld-plasma-cyan": "#00d4ff",
  // Cobalt: accent, secondary active states
  "--weld-plasma-cobalt": "#3b6bff",
  // Glow — diffused, never harsh
  "--weld-glow-cyan": "0 0 0 1px rgba(0,212,255,0.20), 0 0 16px rgba(0,212,255,0.10)",
  "--weld-glow-cobalt": "0 0 0 1px rgba(59,107,255,0.25), 0 0 14px rgba(59,107,255,0.12)",
  // ── Text ───────────────────────────────────────────────────────────────────
  "--weld-text-primary": "#f4f4f5",
  // main content
  "--weld-text-secondary": "#a1a1aa",
  // labels, subtitles
  "--weld-text-muted": "#52525b",
  // placeholders, hints
  "--weld-text-disabled": "#3f3f46",
  // ── Semantic states — muted at rest, bright on trigger ────────────────────
  "--weld-state-online": "#00d4ff",
  // matches plasma-cyan: online = connected
  "--weld-state-offline": "#ef4444",
  "--weld-state-loading": "#00d4ff",
  // pulse animation, same cyan
  "--weld-state-success": "#22c55e",
  "--weld-state-error": "#ef4444",
  // ── Shape ──────────────────────────────────────────────────────────────────
  "--weld-radius": "5px",
  "--weld-radius-lg": "8px",
  "--weld-radius-xl": "12px",
  // ── Responsive breakpoints ─────────────────────────────────────────────────
  "--weld-bp-mobile": "768",
  "--weld-bp-tablet": "1024"
};
function injectTokens(overrides, target = document.documentElement) {
  const tokens = { ...defaultTokens, ...overrides };
  for (const [key, value] of Object.entries(tokens)) {
    target.style.setProperty(key, value);
  }
}
var defaultBreakpoints = { mobile: 768, tablet: 1024 };
var WeldContext = (0, import_react2.createContext)(null);
function useWeldContext() {
  const ctx = (0, import_react2.useContext)(WeldContext);
  if (!ctx) throw new Error(
    '[WELD] useWeldContext() called outside <WeldProvider>.\nWrap your app root with <WeldProvider>:\n\n  import { WeldProvider } from "@weldjs/react"\n\n  <WeldProvider>\n    <App />\n  </WeldProvider>'
  );
  return ctx;
}
var BASE_STYLE_ID = "__weld_base__";
function injectBaseStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(BASE_STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = BASE_STYLE_ID;
  s.textContent = `
    /* ── Weld base typography — scoped to shell ─────────────────────────── */
    [data-weld-shell] *,
    [data-weld-shell] *::before,
    [data-weld-shell] *::after {
      box-sizing: border-box;
    }

    [data-weld-shell] h1,
    [data-weld-shell] h2,
    [data-weld-shell] h3,
    [data-weld-shell] h4,
    [data-weld-shell] h5,
    [data-weld-shell] h6 {
      margin: 1.5em 0 0.4em;
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: -0.02em;
      color: var(--weld-text-primary, #f4f4f5);
    }

    /* First heading in a block shouldn't have top margin */
    [data-weld-shell] *:first-child > h1:first-child,
    [data-weld-shell] *:first-child > h2:first-child,
    [data-weld-shell] *:first-child > h3:first-child,
    [data-weld-shell] h1:first-child,
    [data-weld-shell] h2:first-child,
    [data-weld-shell] h3:first-child {
      margin-top: 0;
    }

    [data-weld-shell] h1 { font-size: 1.6rem;  letter-spacing: -0.03em; }
    [data-weld-shell] h2 { font-size: 1.15rem; }
    [data-weld-shell] h3 { font-size: 0.95rem; font-weight: 500; color: var(--weld-text-secondary, #a1a1aa); text-transform: uppercase; letter-spacing: 0.06em; font-size: 0.72rem; }
    [data-weld-shell] h4 { font-size: 0.875rem; font-weight: 500; }

    [data-weld-shell] p {
      margin: 0 0 1em;
      color: var(--weld-text-secondary, #a1a1aa);
      font-size: 0.875rem;
      line-height: 1.7;
    }

    [data-weld-shell] p:last-child { margin-bottom: 0; }

    [data-weld-shell] a {
      color: var(--weld-plasma-cyan, #00d4ff);
      text-decoration: none;
    }
    [data-weld-shell] a:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    [data-weld-shell] code,
    [data-weld-shell] kbd {
      font-family: "SF Mono", "Fira Code", "Cascadia Code", monospace;
      font-size: 0.8em;
      background: var(--weld-bg-elevated, #111115);
      border: 1px solid var(--weld-border, rgba(255,255,255,0.06));
      border-radius: 3px;
      padding: 0.15em 0.4em;
      color: var(--weld-plasma-cyan, #00d4ff);
    }

    [data-weld-shell] pre {
      background: var(--weld-bg-surface, #0d0d10);
      border: 1px solid var(--weld-border, rgba(255,255,255,0.06));
      border-radius: var(--weld-radius, 5px);
      padding: 16px;
      overflow-x: auto;
      font-size: 0.8rem;
    }

    [data-weld-shell] pre code {
      background: none;
      border: none;
      padding: 0;
      color: var(--weld-text-primary, #f4f4f5);
    }

    [data-weld-shell] hr {
      border: none;
      border-top: 1px solid var(--weld-border, rgba(255,255,255,0.06));
      margin: 20px 0;
    }

    [data-weld-shell] strong {
      font-weight: 600;
      color: var(--weld-text-primary, #f4f4f5);
    }

    [data-weld-shell] small {
      font-size: 0.75rem;
      color: var(--weld-text-muted, #52525b);
    }

    [data-weld-shell] ul,
    [data-weld-shell] ol {
      padding-left: 1.25em;
      margin: 0 0 0.75em;
      color: var(--weld-text-secondary, #a1a1aa);
      font-size: 0.875rem;
      line-height: 1.65;
    }

    [data-weld-shell] li + li { margin-top: 0.3em; }

    /* ── Sidebar nav layout ───────────────────────────────────────────────── */
    /* Buttons inside sidebar stack vertically with spacing */
    [data-weld-sidebar] > div > [data-weld-button],
    [data-weld-sidebar] > div > * > [data-weld-button] {
      width: 100%;
      justify-content: flex-start;
      margin-bottom: 2px;
    }

    /* ── Scrollbar — subtle ──────────────────────────────────────────────── */
    [data-weld-shell] ::-webkit-scrollbar { width: 4px; height: 4px; }
    [data-weld-shell] ::-webkit-scrollbar-track { background: transparent; }
    [data-weld-shell] ::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.08);
      border-radius: 4px;
    }
    [data-weld-shell] ::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.14);
    }

    /* ── Selection ───────────────────────────────────────────────────────── */
    [data-weld-shell] ::selection {
      background: rgba(0,212,255,0.18);
      color: var(--weld-text-primary, #f4f4f5);
    }
  `;
  document.head.appendChild(s);
}
function WeldProvider({
  children,
  routerAdapter,
  breakpoints,
  theme = {}
}) {
  const mergedBreakpoints = { ...defaultBreakpoints, ...breakpoints };
  (0, import_react2.useEffect)(() => {
    injectBaseStyles();
    const overrides = { ...theme.tokens };
    if (theme.primaryColor) {
      overrides["--weld-plasma-cyan"] = theme.primaryColor;
      overrides["--weld-state-online"] = theme.primaryColor;
      overrides["--weld-state-loading"] = theme.primaryColor;
    }
    if (theme.accentColor) {
      overrides["--weld-plasma-cobalt"] = theme.accentColor;
    }
    if (typeof document !== "undefined") {
      injectTokens(overrides);
    }
  }, [theme]);
  return (0, import_jsx_runtime.jsx)(WeldContext.Provider, { value: { routerAdapter, breakpoints: mergedBreakpoints, theme }, children });
}
if (typeof document !== "undefined") {
  const styleId = "__weld_btn__";
  if (!document.getElementById(styleId)) {
    const s = document.createElement("style");
    s.id = styleId;
    s.textContent = `
      @keyframes _weld-spin  { to { transform: rotate(360deg); } }
      @keyframes _weld-pulse { 0%,100% { opacity:1; } 50% { opacity:.45; } }
      @keyframes _weld-shake {
        0%,100% { transform:translateX(0); }
        20%      { transform:translateX(-3px); }
        40%      { transform:translateX(3px); }
        60%      { transform:translateX(-2px); }
        80%      { transform:translateX(2px); }
      }
    `;
    document.head.appendChild(s);
  }
}
function Button({
  action,
  children,
  neon = true,
  variant = "primary",
  size = "md",
  showSuccess = true,
  className,
  disabled,
  ...rest
}) {
  const [status, setStatus] = (0, import_react3.useState)("idle");
  const [hovered, setHovered] = (0, import_react3.useState)(false);
  const handleClick = (0, import_react3.useCallback)(async () => {
    if (!action || status === "loading") return;
    setStatus("loading");
    try {
      const result = action();
      await ("promise" in result ? result.promise : result);
      setStatus("success");
      if (showSuccess) setTimeout(() => setStatus("idle"), 1400);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2e3);
    }
  }, [action, status, showSuccess]);
  const isDisabled = disabled || status === "loading";
  const noStyle = neon === "none";
  const glowOff = neon === false;
  const plasma = !glowOff && typeof neon === "object" && neon !== null && "color" in neon ? neon.color ?? "var(--weld-plasma-cyan, #00d4ff)" : "var(--weld-plasma-cyan, #00d4ff)";
  const intensity = !glowOff && typeof neon === "object" && neon !== null && "intensity" in neon ? neon.intensity ?? 1 : 1;
  if (noStyle) {
    return (0, import_jsx_runtime2.jsx)("button", { ...rest, disabled: isDisabled, onClick: handleClick, className, children });
  }
  const base = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    fontFamily: "inherit",
    fontWeight: 500,
    letterSpacing: "0.01em",
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "background 0.12s ease, border-color 0.12s ease, box-shadow 0.15s ease, opacity 0.12s ease",
    outline: "none",
    userSelect: "none",
    whiteSpace: "nowrap",
    borderRadius: "var(--weld-radius, 5px)",
    opacity: isDisabled && status !== "loading" ? 0.45 : 1,
    ...sizeMap[size],
    ...getStateStyles({ variant, status, hovered, plasma, intensity, glowOff })
  };
  return (0, import_jsx_runtime2.jsxs)(
    "button",
    {
      ...rest,
      disabled: isDisabled,
      onClick: handleClick,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      className,
      style: base,
      "data-weld-button": true,
      "data-status": status,
      "data-variant": variant,
      children: [
        status === "loading" && (0, import_jsx_runtime2.jsx)(Spinner, {}),
        status === "success" && showSuccess && (0, import_jsx_runtime2.jsx)(CheckIcon, {}),
        status === "error" && (0, import_jsx_runtime2.jsx)(ErrorIcon, {}),
        (0, import_jsx_runtime2.jsx)("span", { style: status === "loading" ? { opacity: 0.55 } : void 0, children })
      ]
    }
  );
}
var sizeMap = {
  sm: { padding: "5px 11px", fontSize: "12px", height: "30px" },
  md: { padding: "7px 15px", fontSize: "13px", height: "36px" },
  lg: { padding: "9px 19px", fontSize: "14px", height: "42px" }
};
function getStateStyles(p) {
  const { variant, status, hovered, plasma, intensity, glowOff } = p;
  if (status === "loading") {
    return {
      background: "var(--weld-bg-elevated, #111115)",
      border: `1px solid ${plasma}`,
      color: plasma,
      boxShadow: `0 0 0 1px ${plasma}22, 0 0 ${14 * intensity}px ${plasma}18`,
      animation: "_weld-pulse 1.4s ease-in-out infinite"
    };
  }
  if (status === "success") {
    return {
      background: "rgba(34,197,94,0.07)",
      border: "1px solid rgba(34,197,94,0.35)",
      color: "var(--weld-state-success, #22c55e)",
      boxShadow: "0 0 10px rgba(34,197,94,0.08)"
    };
  }
  if (status === "error") {
    return {
      background: "rgba(239,68,68,0.07)",
      border: "1px solid rgba(239,68,68,0.35)",
      color: "var(--weld-state-error, #ef4444)",
      animation: "_weld-shake 0.35s ease"
    };
  }
  const variants = {
    primary: hovered ? {
      // hover: plasma activates
      background: plasma,
      border: `1px solid ${plasma}`,
      color: "#09090b",
      boxShadow: `0 0 0 1px ${plasma}22, 0 0 ${12 * intensity}px ${plasma}20`
    } : {
      // rest: solid but muted
      background: "rgba(0,212,255,0.10)",
      border: "1px solid rgba(0,212,255,0.18)",
      color: plasma
    },
    secondary: hovered ? {
      background: "var(--weld-bg-elevated, #111115)",
      border: "1px solid var(--weld-border-hover, rgba(255,255,255,0.10))",
      color: "var(--weld-text-primary, #f4f4f5)"
    } : {
      background: "var(--weld-bg-surface, #0d0d10)",
      border: "1px solid var(--weld-border, rgba(255,255,255,0.06))",
      color: "var(--weld-text-secondary, #a1a1aa)"
    },
    ghost: hovered ? {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid transparent",
      color: "var(--weld-text-primary, #f4f4f5)"
    } : {
      background: "transparent",
      border: "1px solid transparent",
      color: "var(--weld-text-muted, #52525b)"
    },
    danger: hovered ? {
      background: "rgba(239,68,68,0.10)",
      border: "1px solid rgba(239,68,68,0.45)",
      color: "#ef4444",
      boxShadow: "0 0 10px rgba(239,68,68,0.10)"
    } : {
      background: "transparent",
      border: "1px solid rgba(239,68,68,0.20)",
      color: "#ef4444"
    }
  };
  return variants[variant] ?? variants["primary"];
}
function Spinner() {
  return (0, import_jsx_runtime2.jsx)("span", { style: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "1.5px solid currentColor",
    borderTopColor: "transparent",
    display: "inline-block",
    flexShrink: 0,
    animation: "_weld-spin 0.55s linear infinite"
  } });
}
function CheckIcon() {
  return (0, import_jsx_runtime2.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", style: { flexShrink: 0 }, children: (0, import_jsx_runtime2.jsx)("path", { d: "M1.5 6l3 3 6-6", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ErrorIcon() {
  return (0, import_jsx_runtime2.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", style: { flexShrink: 0 }, children: (0, import_jsx_runtime2.jsx)("path", { d: "M6 2v4M6 9.5v.5", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
function Input({
  type = "text",
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  schema,
  error: externalError,
  hint,
  disabled,
  required,
  options = [],
  neon = true,
  className,
  name
}) {
  const id = (0, import_react4.useId)();
  const [touched, setTouched] = (0, import_react4.useState)(false);
  const [internalVal, setInternalVal] = (0, import_react4.useState)(defaultValue ?? "");
  const [validationErr, setValidationErr] = (0, import_react4.useState)(null);
  const [focused, setFocused] = (0, import_react4.useState)(false);
  const currentValue = value !== void 0 ? value : internalVal;
  const displayError = externalError ?? (touched ? validationErr : null);
  const noStyle = neon === "none" || neon === false;
  const plasma = typeof neon === "object" && neon !== null && "color" in neon ? neon.color ?? "var(--weld-plasma-cyan, #00d4ff)" : "var(--weld-plasma-cyan, #00d4ff)";
  const intensity = typeof neon === "object" && neon !== null && "intensity" in neon ? neon.intensity ?? 1 : 1;
  const handleChange = (e) => {
    var _a;
    const val = e.target.value;
    setInternalVal(val);
    onChange == null ? void 0 : onChange(val);
    if (schema) {
      const result = schema.safeParse(val);
      setValidationErr(result.success ? null : ((_a = result.error.issues[0]) == null ? void 0 : _a.message) ?? "Invalid value");
    }
  };
  if (noStyle) {
    const commonProps2 = { id, name, disabled, required, placeholder, className, onChange: handleChange, onBlur: () => setTouched(true) };
    let field2;
    if (type === "multiline") field2 = (0, import_jsx_runtime3.jsx)("textarea", { ...commonProps2, value: currentValue });
    else if (type === "select") field2 = (0, import_jsx_runtime3.jsxs)("select", { ...commonProps2, value: currentValue, children: [
      (0, import_jsx_runtime3.jsx)("option", { value: "", disabled: true, children: placeholder ?? "Select an option" }),
      options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return (0, import_jsx_runtime3.jsx)("option", { value: v, children: l }, v);
      })
    ] });
    else field2 = (0, import_jsx_runtime3.jsx)("input", { ...commonProps2, type, value: currentValue });
    return (0, import_jsx_runtime3.jsxs)("div", { className, children: [
      label && (0, import_jsx_runtime3.jsxs)("label", { htmlFor: id, children: [
        label,
        required && (0, import_jsx_runtime3.jsx)("span", { children: "*" })
      ] }),
      field2,
      displayError && (0, import_jsx_runtime3.jsx)("span", { role: "alert", children: displayError }),
      hint && !displayError && (0, import_jsx_runtime3.jsx)("span", { children: hint })
    ] });
  }
  const fieldStyles = {
    width: "100%",
    padding: type === "multiline" ? "10px 12px" : "0 12px",
    height: type === "multiline" ? "auto" : "36px",
    minHeight: type === "multiline" ? "96px" : void 0,
    fontSize: "13px",
    lineHeight: type === "multiline" ? "1.6" : void 0,
    fontFamily: "inherit",
    background: focused ? "var(--weld-bg-elevated, #111115)" : "var(--weld-bg-surface, #0d0d10)",
    color: "var(--weld-text-primary, #f4f4f5)",
    border: displayError ? "1px solid rgba(239,68,68,0.50)" : focused ? `1px solid ${plasma}` : "1px solid var(--weld-border, rgba(255,255,255,0.06))",
    borderRadius: "var(--weld-radius, 5px)",
    outline: "none",
    transition: "border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease",
    // The weld seam: glow only on focus, diffused and subtle
    boxShadow: displayError ? "0 0 0 1px rgba(239,68,68,0.15)" : focused ? `0 0 0 1px ${plasma}18, 0 0 ${14 * intensity}px ${plasma}0e` : "none",
    opacity: disabled ? 0.45 : 1,
    cursor: disabled ? "not-allowed" : type === "select" ? "pointer" : "text",
    resize: type === "multiline" ? "vertical" : void 0
  };
  const commonProps = {
    id,
    name,
    disabled,
    required,
    placeholder,
    style: fieldStyles,
    onChange: handleChange,
    onBlur: () => {
      setTouched(true);
      setFocused(false);
    },
    onFocus: () => setFocused(true),
    "data-weld-input": type
  };
  let field;
  if (type === "multiline") {
    field = (0, import_jsx_runtime3.jsx)("textarea", { ...commonProps, value: currentValue, rows: 4 });
  } else if (type === "select") {
    field = (0, import_jsx_runtime3.jsxs)("select", { ...commonProps, value: currentValue, children: [
      (0, import_jsx_runtime3.jsx)("option", { value: "", disabled: true, children: placeholder ?? "Select an option" }),
      options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return (0, import_jsx_runtime3.jsx)("option", { value: v, children: l }, v);
      })
    ] });
  } else {
    field = (0, import_jsx_runtime3.jsx)("input", { ...commonProps, type, value: currentValue });
  }
  return (0, import_jsx_runtime3.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "5px", width: "100%" }, children: [
    label && (0, import_jsx_runtime3.jsxs)("label", { htmlFor: id, style: { fontSize: "12px", fontWeight: 500, color: "var(--weld-text-secondary, #a1a1aa)", userSelect: "none", letterSpacing: "0.01em" }, children: [
      label,
      required && (0, import_jsx_runtime3.jsx)("span", { style: { color: "var(--weld-state-error, #ef4444)", marginLeft: "3px" }, children: "*" })
    ] }),
    field,
    displayError && (0, import_jsx_runtime3.jsx)("span", { role: "alert", style: { fontSize: "12px", color: "var(--weld-state-error, #ef4444)", letterSpacing: "0.005em" }, children: displayError }),
    hint && !displayError && (0, import_jsx_runtime3.jsx)("span", { style: { fontSize: "12px", color: "var(--weld-text-muted, #52525b)" }, children: hint })
  ] });
}
function useResponsive() {
  const { breakpoints } = useWeldContext();
  const getBreakpoint = () => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    if (w < breakpoints.mobile) return "mobile";
    if (w < breakpoints.tablet) return "tablet";
    return "desktop";
  };
  const [bp, setBp] = (0, import_react6.useState)(getBreakpoint);
  (0, import_react6.useEffect)(() => {
    const handler = () => setBp(getBreakpoint());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoints]);
  return bp;
}
var ShellContext = (0, import_react5.createContext)(null);
function useShell() {
  const ctx = (0, import_react5.useContext)(ShellContext);
  if (!ctx) throw new Error(
    "[WELD] Layout components must be used inside <Weld.Shell>.\nWrap your layout with <Weld.Shell>:\n\n  <Weld.Shell>\n    <Weld.Header />\n    <Weld.Main />\n  </Weld.Shell>"
  );
  return ctx;
}
function Shell({ children, className, style, noStyle }) {
  const bp = useResponsive();
  const [sidebarOpen, setSidebarOpen] = (0, import_react5.useState)(bp === "desktop");
  const [headerHeight, setHeaderHeight] = (0, import_react5.useState)(56);
  const [footerHeight, setFooterHeight] = (0, import_react5.useState)(0);
  const shellStyles = noStyle ? {} : {
    display: "flex",
    flexDirection: "column",
    minHeight: "100dvh",
    background: "var(--weld-bg-base, #09090b)",
    color: "var(--weld-text-primary, #f4f4f5)",
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: "14px",
    lineHeight: "1.5",
    ...style
  };
  return (0, import_jsx_runtime4.jsx)(ShellContext.Provider, { value: {
    sidebarOpen,
    setSidebarOpen,
    headerHeight,
    setHeaderHeight,
    footerHeight,
    setFooterHeight
  }, children: (0, import_jsx_runtime4.jsx)(
    "div",
    {
      className,
      style: shellStyles,
      "data-weld-shell": true,
      "data-breakpoint": bp,
      children
    }
  ) });
}
function Header({
  children,
  fixed = false,
  neon = true,
  position = "top",
  className,
  style
}) {
  const { setHeaderHeight, setSidebarOpen, sidebarOpen } = useShell();
  const bp = useResponsive();
  const ref = (0, import_react7.useRef)(null);
  const noStyle = neon === "none" || neon === false;
  const [online, setOnline] = (0, import_react7.useState)(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  (0, import_react7.useEffect)(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver(([e]) => {
      if (e) setHeaderHeight(e.contentRect.height);
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [setHeaderHeight]);
  (0, import_react7.useEffect)(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  const headerStyles = noStyle ? {} : {
    position: fixed ? "fixed" : "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: "56px",
    display: "flex",
    alignItems: "center",
    padding: "0 18px",
    gap: "12px",
    // Dark glass — barely translucent, not the shiny kind
    background: "rgba(9,9,11,0.88)",
    backdropFilter: "blur(12px) saturate(140%)",
    // Single pixel border, barely visible
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    ...style
  };
  return (0, import_jsx_runtime5.jsxs)(
    "header",
    {
      ref,
      className,
      style: headerStyles,
      "data-weld-header": true,
      "data-position": position,
      children: [
        bp !== "desktop" && !noStyle && (0, import_jsx_runtime5.jsxs)(
          "button",
          {
            onClick: () => setSidebarOpen(!sidebarOpen),
            style: {
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "var(--weld-text-secondary, #a1a1aa)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              flexShrink: 0
            },
            "aria-label": "Toggle menu",
            children: [
              (0, import_jsx_runtime5.jsx)("span", { style: { width: "16px", height: "1.5px", background: "currentColor", display: "block", transition: "transform 0.2s", transform: sidebarOpen ? "rotate(45deg) translate(3.5px, 3.5px)" : "none" } }),
              (0, import_jsx_runtime5.jsx)("span", { style: { width: "16px", height: "1.5px", background: "currentColor", display: "block", transition: "opacity 0.2s", opacity: sidebarOpen ? 0 : 1 } }),
              (0, import_jsx_runtime5.jsx)("span", { style: { width: "16px", height: "1.5px", background: "currentColor", display: "block", transition: "transform 0.2s", transform: sidebarOpen ? "rotate(-45deg) translate(3.5px, -3.5px)" : "none" } })
            ]
          }
        ),
        (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: "12px" }, children }),
        !noStyle && (0, import_jsx_runtime5.jsx)(
          "div",
          {
            title: online ? "Online" : "Offline — mutations queued",
            style: {
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              flexShrink: 0,
              background: online ? "var(--weld-plasma-cyan, #00d4ff)" : "var(--weld-state-offline, #ef4444)",
              // Glow only when online — the weld is active
              boxShadow: online ? "0 0 6px rgba(0,212,255,0.60)" : "none",
              transition: "background 0.4s ease, box-shadow 0.4s ease"
            }
          }
        )
      ]
    }
  );
}
var defaultResponsive = {
  mobile: "drawer",
  tablet: "collapsed",
  desktop: "expanded"
};
function Sidebar({
  children,
  position = "left",
  collapsible = true,
  neon = true,
  responsive,
  className,
  style,
  width = 232,
  collapsedWidth = 52
}) {
  const { sidebarOpen, setSidebarOpen, headerHeight } = useShell();
  const bp = useResponsive();
  const noStyle = neon === "none" || neon === false;
  const merged = { ...defaultResponsive, ...responsive };
  const plasma = typeof neon === "object" && neon !== null && "color" in neon ? neon.color ?? "#00d4ff" : "#00d4ff";
  const intensity = typeof neon === "object" && neon !== null && "intensity" in neon ? neon.intensity ?? 1 : 1;
  const [online, setOnline] = (0, import_react8.useState)(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  (0, import_react8.useEffect)(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  const mode = bp === "mobile" ? merged.mobile : bp === "tablet" ? merged.tablet : merged.desktop;
  const isDrawer = mode === "drawer";
  const isCollapsed = mode === "collapsed";
  if (mode === "hidden") return null;
  const currentWidth = isCollapsed ? collapsedWidth : width;
  const sidebarStyles = noStyle ? {} : {
    position: isDrawer ? "fixed" : "sticky",
    top: isDrawer ? 0 : headerHeight,
    [position]: isDrawer ? sidebarOpen ? 0 : -width : 0,
    height: isDrawer ? "100dvh" : `calc(100dvh - ${headerHeight}px)`,
    width: isDrawer ? width : currentWidth,
    zIndex: isDrawer ? 200 : 10,
    overflowY: "auto",
    overflowX: "hidden",
    flexShrink: 0,
    background: "#0a0a0c",
    // Single pixel border — very faint
    borderRight: position === "left" ? "1px solid rgba(255,255,255,0.04)" : "none",
    borderLeft: position === "right" ? "1px solid rgba(255,255,255,0.04)" : "none",
    transition: isDrawer ? `${position} 0.22s cubic-bezier(0.4,0,0.2,1)` : `width 0.18s ease`,
    display: "flex",
    flexDirection: "column",
    ...style
  };
  const accentLine = noStyle ? {} : {
    height: "1.5px",
    flexShrink: 0,
    background: online ? `linear-gradient(90deg, ${plasma} 0%, rgba(59,107,255,0.8) 60%, transparent 100%)` : "linear-gradient(90deg, #ef4444 0%, rgba(127,29,29,0.6) 60%, transparent 100%)",
    boxShadow: online ? `0 0 ${8 * intensity}px rgba(0,212,255,${0.35 * intensity})` : "none",
    transition: "background 0.5s ease, box-shadow 0.5s ease"
  };
  return (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    isDrawer && sidebarOpen && (0, import_jsx_runtime6.jsx)(
      "div",
      {
        onClick: () => setSidebarOpen(false),
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 199,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(3px)"
        }
      }
    ),
    (0, import_jsx_runtime6.jsxs)(
      "aside",
      {
        className,
        style: sidebarStyles,
        "data-weld-sidebar": true,
        "data-position": position,
        "data-mode": mode,
        children: [
          !noStyle && (0, import_jsx_runtime6.jsx)("div", { style: accentLine }),
          (0, import_jsx_runtime6.jsx)("div", { style: {
            flex: 1,
            padding: isCollapsed ? "10px 6px" : "12px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px"
          }, children }),
          collapsible && bp === "desktop" && !noStyle && (0, import_jsx_runtime6.jsx)(
            "button",
            {
              onClick: () => setSidebarOpen(!sidebarOpen),
              style: {
                margin: "6px",
                padding: "7px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "var(--weld-radius, 5px)",
                cursor: "pointer",
                color: "var(--weld-text-muted, #52525b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.15s, color 0.15s"
              },
              "aria-label": "Toggle sidebar",
              children: (0, import_jsx_runtime6.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: (0, import_jsx_runtime6.jsx)(
                "path",
                {
                  d: position === "left" ? isCollapsed ? "M4 2l4 4-4 4" : "M8 2L4 6l4 4" : isCollapsed ? "M8 2L4 6l4 4" : "M4 2l4 4-4 4",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              ) })
            }
          )
        ]
      }
    )
  ] });
}
function Main({
  children,
  className,
  style,
  neon = true,
  maxWidth,
  centered = false
}) {
  const { headerHeight } = useShell();
  const noStyle = neon === "none" || neon === false;
  const mainStyles = noStyle ? {} : {
    flex: 1,
    minWidth: 0,
    minHeight: `calc(100dvh - ${headerHeight}px)`,
    padding: "28px 24px",
    ...style
  };
  const innerStyles = centered || maxWidth ? {
    maxWidth: maxWidth ?? "820px",
    margin: centered ? "0 auto" : void 0,
    width: "100%"
  } : {};
  return (0, import_jsx_runtime7.jsx)("main", { className, style: mainStyles, "data-weld-main": true, children: centered || maxWidth ? (0, import_jsx_runtime7.jsx)("div", { style: innerStyles, children }) : children });
}
function Footer({ children, className, style, neon = true }) {
  const { setFooterHeight } = useShell();
  const ref = (0, import_react9.useRef)(null);
  const noStyle = neon === "none" || neon === false;
  (0, import_react9.useEffect)(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver(([e]) => {
      if (e) setFooterHeight(e.contentRect.height);
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [setFooterHeight]);
  const footerStyles = noStyle ? {} : {
    borderTop: "1px solid rgba(255,255,255,0.04)",
    padding: "14px 24px",
    color: "var(--weld-text-muted, #52525b)",
    fontSize: "12px",
    background: "#09090b",
    ...style
  };
  return (0, import_jsx_runtime8.jsx)("footer", { ref, className, style: footerStyles, "data-weld-footer": true, children });
}
function Section({
  children,
  title,
  description,
  divider = true,
  actions,
  className,
  style
}) {
  return (0, import_jsx_runtime9.jsxs)(
    "section",
    {
      className,
      style: {
        paddingTop: divider ? "32px" : "0",
        marginTop: divider ? "32px" : "0",
        borderTop: divider ? "1px solid var(--weld-border, rgba(255,255,255,0.06))" : "none",
        ...style
      },
      "data-weld-section": true,
      children: [
        (title || actions) && (0, import_jsx_runtime9.jsxs)("div", { style: {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: description ? "6px" : "20px"
        }, children: [
          title && (0, import_jsx_runtime9.jsx)("h2", { style: {
            margin: 0,
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--weld-text-primary, #f4f4f5)",
            lineHeight: 1.3
          }, children: title }),
          actions && (0, import_jsx_runtime9.jsx)("div", { style: { flexShrink: 0 }, children: actions })
        ] }),
        description && (0, import_jsx_runtime9.jsx)("p", { style: {
          margin: "0 0 20px",
          fontSize: "0.8125rem",
          color: "var(--weld-text-muted, #52525b)",
          lineHeight: 1.6
        }, children: description }),
        children
      ]
    }
  );
}
function Card({
  children,
  title,
  actions,
  footer,
  accent = false,
  className,
  style,
  onClick
}) {
  const clickable = !!onClick;
  return (0, import_jsx_runtime10.jsxs)(
    "div",
    {
      className,
      onClick,
      "data-weld-card": true,
      style: {
        background: "var(--weld-bg-surface, #0d0d10)",
        border: "1px solid var(--weld-border, rgba(255,255,255,0.06))",
        borderRadius: "var(--weld-radius-lg, 8px)",
        borderLeft: accent ? "2px solid var(--weld-plasma-cyan, #00d4ff)" : void 0,
        overflow: "hidden",
        cursor: clickable ? "pointer" : void 0,
        transition: clickable ? "border-color 0.15s ease, background 0.15s ease" : void 0,
        ...style
      },
      children: [
        (title || actions) && (0, import_jsx_runtime10.jsxs)("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          borderBottom: "1px solid var(--weld-border, rgba(255,255,255,0.06))",
          gap: "12px"
        }, children: [
          title && (0, import_jsx_runtime10.jsx)("span", { style: {
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--weld-text-primary, #f4f4f5)",
            letterSpacing: "-0.005em"
          }, children: title }),
          actions && (0, import_jsx_runtime10.jsx)("div", { style: { flexShrink: 0 }, children: actions })
        ] }),
        (0, import_jsx_runtime10.jsx)("div", { style: { padding: "16px" }, children }),
        footer && (0, import_jsx_runtime10.jsx)("div", { style: {
          padding: "12px 16px",
          borderTop: "1px solid var(--weld-border, rgba(255,255,255,0.06))",
          background: "rgba(255,255,255,0.01)"
        }, children: footer })
      ]
    }
  );
}
function Stack({
  children,
  direction = "column",
  gap = 12,
  align,
  justify,
  wrap = false,
  className,
  style
}) {
  return (0, import_jsx_runtime11.jsx)(
    "div",
    {
      className,
      "data-weld-stack": true,
      style: {
        display: "flex",
        flexDirection: direction,
        gap: `${gap}px`,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style
      },
      children
    }
  );
}
function Grid({
  children,
  cols,
  minWidth,
  gap = 16,
  className,
  style
}) {
  const templateColumns = minWidth ? `repeat(auto-fit, minmax(${minWidth}px, 1fr))` : `repeat(${cols ?? 2}, 1fr)`;
  return (0, import_jsx_runtime12.jsx)(
    "div",
    {
      className,
      "data-weld-grid": true,
      style: {
        display: "grid",
        gridTemplateColumns: templateColumns,
        gap: `${gap}px`,
        ...style
      },
      children
    }
  );
}
function Divider({ orientation = "horizontal", label, style }) {
  if (orientation === "vertical") {
    return (0, import_jsx_runtime13.jsx)(
      "div",
      {
        "data-weld-divider": true,
        style: {
          width: "1px",
          alignSelf: "stretch",
          background: "var(--weld-border, rgba(255,255,255,0.06))",
          flexShrink: 0,
          ...style
        }
      }
    );
  }
  if (label) {
    return (0, import_jsx_runtime13.jsxs)(
      "div",
      {
        "data-weld-divider": true,
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "20px 0",
          ...style
        },
        children: [
          (0, import_jsx_runtime13.jsx)("div", { style: { flex: 1, height: "1px", background: "var(--weld-border, rgba(255,255,255,0.06))" } }),
          (0, import_jsx_runtime13.jsx)("span", { style: { fontSize: "0.72rem", color: "var(--weld-text-muted, #52525b)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }, children: label }),
          (0, import_jsx_runtime13.jsx)("div", { style: { flex: 1, height: "1px", background: "var(--weld-border, rgba(255,255,255,0.06))" } })
        ]
      }
    );
  }
  return (0, import_jsx_runtime13.jsx)(
    "hr",
    {
      "data-weld-divider": true,
      style: {
        border: "none",
        borderTop: "1px solid var(--weld-border, rgba(255,255,255,0.06))",
        margin: "20px 0",
        ...style
      }
    }
  );
}
var maxWidths = { sm: "480px", md: "640px", lg: "860px", xl: "1100px", full: "100%" };
function Container({ children, size = "lg", className, style }) {
  return (0, import_jsx_runtime14.jsx)(
    "div",
    {
      className,
      "data-weld-container": true,
      style: {
        width: "100%",
        maxWidth: maxWidths[size],
        margin: "0 auto",
        ...style
      },
      children
    }
  );
}
var textColors = {
  primary: "var(--weld-text-primary, #f4f4f5)",
  secondary: "var(--weld-text-secondary, #a1a1aa)",
  muted: "var(--weld-text-muted, #52525b)",
  code: "var(--weld-plasma-cyan, #00d4ff)",
  label: "var(--weld-text-secondary, #a1a1aa)",
  caption: "var(--weld-text-muted, #52525b)"
};
var textSizes = {
  xs: "0.7rem",
  sm: "0.8125rem",
  md: "0.875rem",
  lg: "1rem"
};
var textWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};
function Text({
  children,
  variant = "secondary",
  size = "md",
  weight = "normal",
  truncate = false,
  as: Tag = "p",
  className,
  style
}) {
  const isCode = variant === "code";
  const isCaption = variant === "caption" || variant === "label";
  return (0, import_jsx_runtime15.jsx)(
    Tag,
    {
      className,
      "data-weld-text": true,
      style: {
        margin: Tag === "p" ? "0 0 0.75em" : 0,
        fontSize: isCaption ? "0.75rem" : textSizes[size],
        fontWeight: isCaption ? 500 : textWeights[weight],
        color: textColors[variant],
        lineHeight: 1.65,
        fontFamily: isCode ? '"SF Mono","Fira Code","Cascadia Code",monospace' : "inherit",
        background: isCode ? "var(--weld-bg-elevated, #111115)" : void 0,
        border: isCode ? "1px solid var(--weld-border, rgba(255,255,255,0.06))" : void 0,
        borderRadius: isCode ? "3px" : void 0,
        padding: isCode ? "0.15em 0.4em" : void 0,
        display: isCode ? "inline" : void 0,
        letterSpacing: isCaption ? "0.04em" : void 0,
        textTransform: variant === "label" ? "uppercase" : void 0,
        whiteSpace: truncate ? "nowrap" : void 0,
        overflow: truncate ? "hidden" : void 0,
        textOverflow: truncate ? "ellipsis" : void 0,
        ...style
      },
      children
    }
  );
}
var headingSizes = { 1: "1.6rem", 2: "1.15rem", 3: "0.875rem", 4: "0.8125rem" };
var headingWeights = { 1: 700, 2: 600, 3: 600, 4: 500 };
var headingTracking = { 1: "-0.03em", 2: "-0.015em", 3: "-0.01em", 4: "0" };
function Heading({
  children,
  level = 2,
  className,
  style
}) {
  const Tag = `h${level}`;
  return (0, import_jsx_runtime15.jsx)(
    Tag,
    {
      className,
      "data-weld-heading": true,
      style: {
        margin: "0 0 0.4em",
        fontSize: headingSizes[level],
        fontWeight: headingWeights[level],
        letterSpacing: headingTracking[level],
        lineHeight: 1.25,
        color: "var(--weld-text-primary, #f4f4f5)",
        ...style
      },
      children
    }
  );
}
var badgeStyles = {
  default: { bg: "rgba(255,255,255,0.05)", color: "var(--weld-text-secondary, #a1a1aa)", border: "rgba(255,255,255,0.08)", dot: "#a1a1aa" },
  primary: { bg: "rgba(0,212,255,0.08)", color: "var(--weld-plasma-cyan, #00d4ff)", border: "rgba(0,212,255,0.20)", dot: "#00d4ff" },
  success: { bg: "rgba(34,197,94,0.08)", color: "#22c55e", border: "rgba(34,197,94,0.20)", dot: "#22c55e" },
  warning: { bg: "rgba(245,158,11,0.08)", color: "#f59e0b", border: "rgba(245,158,11,0.20)", dot: "#f59e0b" },
  error: { bg: "rgba(239,68,68,0.08)", color: "#ef4444", border: "rgba(239,68,68,0.20)", dot: "#ef4444" },
  info: { bg: "rgba(59,107,255,0.08)", color: "var(--weld-plasma-cobalt, #3b6bff)", border: "rgba(59,107,255,0.20)", dot: "#3b6bff" }
};
function Badge({
  children,
  variant = "default",
  dot = false,
  className,
  style
}) {
  const s = badgeStyles[variant];
  return (0, import_jsx_runtime16.jsxs)(
    "span",
    {
      className,
      "data-weld-badge": true,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "2px 8px",
        fontSize: "0.7rem",
        fontWeight: 500,
        letterSpacing: "0.03em",
        borderRadius: "999px",
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        whiteSpace: "nowrap",
        ...style
      },
      children: [
        dot && (0, import_jsx_runtime16.jsx)("span", { style: {
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: s.dot,
          flexShrink: 0
        } }),
        children
      ]
    }
  );
}
var alertStyles = {
  info: { bg: "rgba(59,107,255,0.06)", border: "rgba(59,107,255,0.18)", accent: "#3b6bff", icon: "ℹ", color: "var(--weld-plasma-cobalt, #3b6bff)" },
  success: { bg: "rgba(34,197,94,0.06)", border: "rgba(34,197,94,0.18)", accent: "#22c55e", icon: "✓", color: "#22c55e" },
  warning: { bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.18)", accent: "#f59e0b", icon: "⚠", color: "#f59e0b" },
  error: { bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.18)", accent: "#ef4444", icon: "✕", color: "#ef4444" }
};
function Alert({
  children,
  variant = "info",
  title,
  accent = true,
  className,
  style
}) {
  const s = alertStyles[variant];
  return (0, import_jsx_runtime17.jsxs)(
    "div",
    {
      className,
      role: "alert",
      "data-weld-alert": true,
      "data-variant": variant,
      style: {
        display: "flex",
        gap: "10px",
        padding: "12px 14px",
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderLeft: accent ? `2px solid ${s.accent}` : void 0,
        borderRadius: "var(--weld-radius, 5px)",
        ...style
      },
      children: [
        (0, import_jsx_runtime17.jsx)("span", { style: {
          fontSize: "0.8rem",
          color: s.color,
          fontWeight: 600,
          flexShrink: 0,
          marginTop: "1px"
        }, children: s.icon }),
        (0, import_jsx_runtime17.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
          title && (0, import_jsx_runtime17.jsx)("p", { style: {
            margin: "0 0 3px",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: s.color
          }, children: title }),
          children && (0, import_jsx_runtime17.jsx)("div", { style: {
            fontSize: "0.8125rem",
            color: "var(--weld-text-secondary, #a1a1aa)",
            lineHeight: 1.55
          }, children })
        ] })
      ]
    }
  );
}
if (typeof document !== "undefined") {
  const id = "__weld_spinner__";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes _weld-rotate { to { transform: rotate(360deg); } }
      @keyframes _weld-shimmer {
        0%   { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `;
    document.head.appendChild(s);
  }
}
var spinnerSizes = { sm: 14, md: 20, lg: 28 };
function Spinner2({ size = "md", label, style }) {
  const px = spinnerSizes[size];
  return (0, import_jsx_runtime18.jsxs)(
    "div",
    {
      "data-weld-spinner": true,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        ...style
      },
      children: [
        (0, import_jsx_runtime18.jsx)("span", { style: {
          width: `${px}px`,
          height: `${px}px`,
          borderRadius: "50%",
          border: `${size === "lg" ? 2.5 : 2}px solid rgba(255,255,255,0.08)`,
          borderTopColor: "var(--weld-plasma-cyan, #00d4ff)",
          display: "inline-block",
          flexShrink: 0,
          animation: "_weld-rotate 0.65s linear infinite"
        } }),
        label && (0, import_jsx_runtime18.jsx)("span", { style: {
          fontSize: size === "sm" ? "0.75rem" : "0.8125rem",
          color: "var(--weld-text-muted, #52525b)"
        }, children: label })
      ]
    }
  );
}
function Skeleton({ width, height, variant = "rect", lines = 3, style }) {
  const shimmer = {
    background: "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)",
    backgroundSize: "200% 100%",
    animation: "_weld-shimmer 1.6s ease-in-out infinite",
    borderRadius: variant === "circle" ? "50%" : "var(--weld-radius, 5px)"
  };
  if (variant === "text") {
    return (0, import_jsx_runtime18.jsx)("div", { "data-weld-skeleton": true, style: { display: "flex", flexDirection: "column", gap: "8px", ...style }, children: Array.from({ length: lines }).map((_, i) => (0, import_jsx_runtime18.jsx)("div", { style: {
      ...shimmer,
      height: "13px",
      width: i === lines - 1 ? "60%" : "100%"
    } }, i)) });
  }
  return (0, import_jsx_runtime18.jsx)(
    "div",
    {
      "data-weld-skeleton": true,
      style: {
        ...shimmer,
        width: width ?? "100%",
        height: height ?? "16px",
        ...style
      }
    }
  );
}
function Empty({ icon = "○", title = "Nothing here", description, action, style }) {
  return (0, import_jsx_runtime19.jsxs)(
    "div",
    {
      "data-weld-empty": true,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        gap: "10px",
        textAlign: "center",
        ...style
      },
      children: [
        (0, import_jsx_runtime19.jsx)("span", { style: { fontSize: "2rem", opacity: 0.25, lineHeight: 1 }, children: icon }),
        (0, import_jsx_runtime19.jsx)("p", { style: {
          margin: 0,
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "var(--weld-text-secondary, #a1a1aa)"
        }, children: title }),
        description && (0, import_jsx_runtime19.jsx)("p", { style: {
          margin: 0,
          fontSize: "0.8rem",
          color: "var(--weld-text-muted, #52525b)",
          maxWidth: "280px",
          lineHeight: 1.55
        }, children: description }),
        action && (0, import_jsx_runtime19.jsx)("div", { style: { marginTop: "4px" }, children: action })
      ]
    }
  );
}
var _toasts = [];
var _listeners = [];
function notify() {
  _listeners.forEach((l) => l([..._toasts]));
}
function addToast(item) {
  const id = Math.random().toString(36).slice(2);
  _toasts = [..._toasts, { ...item, id }];
  notify();
  if (item.duration > 0) {
    setTimeout(() => removeToast(id), item.duration);
  }
  return id;
}
function removeToast(id) {
  _toasts = _toasts.filter((t) => t.id !== id);
  notify();
}
function updateToast(id, update) {
  _toasts = _toasts.map((t) => t.id === id ? { ...t, ...update } : t);
  notify();
}
var toast = {
  success: (message, duration = 3500) => addToast({ variant: "success", message, duration }),
  error: (message, duration = 4500) => addToast({ variant: "error", message, duration }),
  warning: (message, duration = 4e3) => addToast({ variant: "warning", message, duration }),
  info: (message, duration = 3500) => addToast({ variant: "info", message, duration }),
  loading: (message) => addToast({ variant: "loading", message, duration: 0 }),
  dismiss: (id) => removeToast(id),
  promise: async (promise, messages) => {
    const id = toast.loading(messages.loading);
    try {
      const result = await promise;
      updateToast(id, { variant: "success", message: messages.success, duration: 3500 });
      setTimeout(() => removeToast(id), 3500);
      return result;
    } catch (err) {
      updateToast(id, { variant: "error", message: messages.error, duration: 4500 });
      setTimeout(() => removeToast(id), 4500);
      throw err;
    }
  }
};
if (typeof document !== "undefined") {
  const id = "__weld_toast__";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes _weld-toast-in {
        from { opacity: 0; transform: translateX(12px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes _weld-toast-out {
        from { opacity: 1; transform: translateX(0); max-height: 80px; margin-bottom: 8px; }
        to   { opacity: 0; transform: translateX(12px); max-height: 0; margin-bottom: 0; }
      }
    `;
    document.head.appendChild(s);
  }
}
var toastConfig = {
  success: { icon: "✓", color: "#22c55e", border: "rgba(34,197,94,0.20)", bg: "rgba(34,197,94,0.06)" },
  error: { icon: "✕", color: "#ef4444", border: "rgba(239,68,68,0.20)", bg: "rgba(239,68,68,0.06)" },
  warning: { icon: "⚠", color: "#f59e0b", border: "rgba(245,158,11,0.20)", bg: "rgba(245,158,11,0.06)" },
  info: { icon: "ℹ", color: "var(--weld-plasma-cyan, #00d4ff)", border: "rgba(0,212,255,0.20)", bg: "rgba(0,212,255,0.06)" },
  loading: { icon: null, color: "var(--weld-text-secondary, #a1a1aa)", border: "rgba(255,255,255,0.08)", bg: "var(--weld-bg-elevated, #111115)" }
};
function ToastProvider({ position = "bottom-right" }) {
  const [toasts, setToasts] = (0, import_react10.useState)([]);
  (0, import_react10.useEffect)(() => {
    const listener = (t) => setToasts(t);
    _listeners.push(listener);
    return () => {
      _listeners = _listeners.filter((l) => l !== listener);
    };
  }, []);
  const posStyles = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: position.startsWith("bottom") ? "column-reverse" : "column",
    gap: "8px",
    ...position.includes("right") ? { right: "20px" } : {},
    ...position.includes("left") ? { left: "20px" } : {},
    ...position.includes("center") ? { left: "50%", transform: "translateX(-50%)" } : {},
    ...position.startsWith("top") ? { top: "20px" } : {},
    ...position.startsWith("bottom") ? { bottom: "20px" } : {},
    pointerEvents: "none"
  };
  return (0, import_jsx_runtime20.jsx)("div", { "data-weld-toast-provider": true, style: posStyles, children: toasts.map((t) => (0, import_jsx_runtime20.jsx)(ToastItem, { item: t, onDismiss: () => removeToast(t.id) }, t.id)) });
}
function ToastItem({ item, onDismiss }) {
  const cfg = toastConfig[item.variant];
  return (0, import_jsx_runtime20.jsxs)(
    "div",
    {
      "data-weld-toast": true,
      "data-variant": item.variant,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "11px 14px",
        minWidth: "260px",
        maxWidth: "360px",
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: "var(--weld-radius-lg, 8px)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        animation: "_weld-toast-in 0.2s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: "all",
        cursor: "pointer"
      },
      onClick: onDismiss,
      children: [
        (0, import_jsx_runtime20.jsx)("span", { style: { fontSize: "0.8rem", color: cfg.color, fontWeight: 600, flexShrink: 0 }, children: item.variant === "loading" ? (0, import_jsx_runtime20.jsx)("span", { style: {
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.15)",
          borderTopColor: "var(--weld-plasma-cyan, #00d4ff)",
          display: "inline-block",
          animation: "_weld-rotate 0.65s linear infinite"
        } }) : cfg.icon }),
        (0, import_jsx_runtime20.jsx)("span", { style: {
          flex: 1,
          fontSize: "0.8125rem",
          color: "var(--weld-text-primary, #f4f4f5)",
          lineHeight: 1.4
        }, children: item.message }),
        (0, import_jsx_runtime20.jsx)(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              onDismiss();
            },
            style: {
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--weld-text-muted, #52525b)",
              padding: "2px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center"
            },
            "aria-label": "Dismiss",
            children: (0, import_jsx_runtime20.jsx)("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: (0, import_jsx_runtime20.jsx)("path", { d: "M1 1l8 8M9 1L1 9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) })
          }
        )
      ]
    }
  );
}
if (typeof document !== "undefined") {
  const id = "__weld_modal__";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes _weld-modal-in {
        from { opacity: 0; transform: translateY(8px) scale(0.98); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes _weld-backdrop-in {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
    `;
    document.head.appendChild(s);
  }
}
function Modal({
  open,
  onClose,
  title,
  children,
  width = 480,
  hideClose = false,
  style
}) {
  (0, import_react11.useEffect)(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);
  (0, import_react11.useEffect)(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  if (!open) return null;
  return (0, import_jsx_runtime21.jsx)(
    "div",
    {
      "data-weld-modal-backdrop": true,
      onClick: onClose,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 1e3,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "_weld-backdrop-in 0.18s ease"
      },
      children: (0, import_jsx_runtime21.jsxs)(
        "div",
        {
          "data-weld-modal": true,
          onClick: (e) => e.stopPropagation(),
          style: {
            width: "100%",
            maxWidth: `${width}px`,
            background: "var(--weld-bg-elevated, #111115)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "var(--weld-radius-xl, 12px)",
            overflow: "hidden",
            animation: "_weld-modal-in 0.2s cubic-bezier(0.16,1,0.3,1)",
            ...style
          },
          children: [
            (title || !hideClose) && (0, import_jsx_runtime21.jsxs)("div", { style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderBottom: "1px solid var(--weld-border, rgba(255,255,255,0.06))"
            }, children: [
              title && (0, import_jsx_runtime21.jsx)("span", { style: {
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "var(--weld-text-primary, #f4f4f5)",
                letterSpacing: "-0.01em"
              }, children: title }),
              !hideClose && (0, import_jsx_runtime21.jsx)(
                "button",
                {
                  onClick: onClose,
                  style: {
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--weld-text-muted, #52525b)",
                    padding: "4px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                    transition: "color 0.15s"
                  },
                  "aria-label": "Close",
                  children: (0, import_jsx_runtime21.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: (0, import_jsx_runtime21.jsx)("path", { d: "M1 1l12 12M13 1L1 13", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) })
                }
              )
            ] }),
            (0, import_jsx_runtime21.jsx)("div", { style: { padding: "20px" }, children })
          ]
        }
      )
    }
  );
}
if (typeof document !== "undefined") {
  const id = "__weld_tooltip__";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes _weld-tooltip-in {
        from { opacity: 0; transform: translateY(3px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(s);
  }
}
function Tooltip({
  content,
  children,
  position = "top",
  delay = 400
}) {
  const [visible, setVisible] = (0, import_react12.useState)(false);
  const timer = (0, import_react12.useRef)(null);
  const show = () => {
    timer.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
  };
  const posStyles = {
    top: { bottom: "calc(100% + 7px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 7px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 7px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 7px)", top: "50%", transform: "translateY(-50%)" }
  };
  return (0, import_jsx_runtime22.jsxs)(
    "div",
    {
      style: { position: "relative", display: "inline-flex" },
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
      children: [
        children,
        visible && (0, import_jsx_runtime22.jsx)(
          "div",
          {
            role: "tooltip",
            "data-weld-tooltip": true,
            style: {
              position: "absolute",
              ...posStyles[position],
              zIndex: 500,
              padding: "5px 9px",
              fontSize: "0.75rem",
              fontWeight: 500,
              lineHeight: 1.4,
              color: "var(--weld-text-primary, #f4f4f5)",
              background: "var(--weld-bg-elevated, #111115)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "var(--weld-radius, 5px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              animation: "_weld-tooltip-in 0.12s ease"
            },
            children: content
          }
        )
      ]
    }
  );
}
if (typeof document !== "undefined") {
  const id = "__weld_dropdown__";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes _weld-dropdown-in {
        from { opacity: 0; transform: translateY(-4px) scale(0.98); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
    `;
    document.head.appendChild(s);
  }
}
function Dropdown({ trigger, items, align = "left", style }) {
  const [open, setOpen] = (0, import_react13.useState)(false);
  const ref = (0, import_react13.useRef)(null);
  (0, import_react13.useEffect)(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const keyHandler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);
  return (0, import_jsx_runtime23.jsxs)("div", { ref, style: { position: "relative", display: "inline-flex", ...style }, "data-weld-dropdown": true, children: [
    (0, import_jsx_runtime23.jsx)("div", { onClick: () => setOpen((o) => !o), style: { cursor: "pointer" }, children: trigger }),
    open && (0, import_jsx_runtime23.jsx)(
      "div",
      {
        "data-weld-dropdown-menu": true,
        style: {
          position: "absolute",
          top: "calc(100% + 6px)",
          ...align === "right" ? { right: 0 } : { left: 0 },
          zIndex: 400,
          minWidth: "160px",
          background: "var(--weld-bg-elevated, #111115)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "var(--weld-radius-lg, 8px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          padding: "4px",
          animation: "_weld-dropdown-in 0.15s cubic-bezier(0.16,1,0.3,1)"
        },
        children: items.map((item, i) => {
          if (item.divider) {
            return (0, import_jsx_runtime23.jsx)("div", { style: {
              height: "1px",
              background: "var(--weld-border, rgba(255,255,255,0.06))",
              margin: "4px 0"
            } }, i);
          }
          const isDanger = item.variant === "danger";
          return (0, import_jsx_runtime23.jsxs)(
            "button",
            {
              disabled: item.disabled,
              onClick: () => {
                var _a;
                if (!item.disabled) {
                  (_a = item.onClick) == null ? void 0 : _a.call(item);
                  setOpen(false);
                }
              },
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "7px 10px",
                background: "transparent",
                border: "none",
                borderRadius: "var(--weld-radius, 5px)",
                cursor: item.disabled ? "not-allowed" : "pointer",
                fontSize: "0.8125rem",
                fontFamily: "inherit",
                color: isDanger ? "#ef4444" : "var(--weld-text-secondary, #a1a1aa)",
                opacity: item.disabled ? 0.4 : 1,
                textAlign: "left",
                transition: "background 0.1s, color 0.1s"
              },
              onMouseEnter: (e) => {
                if (!item.disabled) {
                  e.currentTarget.style.background = isDanger ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = isDanger ? "#ef4444" : "var(--weld-text-primary, #f4f4f5)";
                }
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = isDanger ? "#ef4444" : "var(--weld-text-secondary, #a1a1aa)";
              },
              children: [
                item.icon && (0, import_jsx_runtime23.jsx)("span", { style: { fontSize: "0.85em", flexShrink: 0 }, children: item.icon }),
                item.label
              ]
            },
            i
          );
        })
      }
    )
  ] });
}
function Breadcrumb({ items, separator = "/", style }) {
  return (0, import_jsx_runtime24.jsx)("nav", { "aria-label": "breadcrumb", "data-weld-breadcrumb": true, style, children: (0, import_jsx_runtime24.jsx)("ol", { style: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    listStyle: "none",
    margin: 0,
    padding: 0,
    flexWrap: "wrap"
  }, children: items.map((item, i) => {
    const isLast = i === items.length - 1;
    const isLink = !isLast && (item.href || item.onClick);
    return (0, import_jsx_runtime24.jsxs)(
      "li",
      {
        style: { display: "flex", alignItems: "center", gap: "6px" },
        "aria-current": isLast ? "page" : void 0,
        children: [
          isLink ? (0, import_jsx_runtime24.jsx)(
            "a",
            {
              href: item.href,
              onClick: item.onClick ? (e) => {
                e.preventDefault();
                item.onClick();
              } : void 0,
              style: {
                fontSize: "0.8125rem",
                color: "var(--weld-text-muted, #52525b)",
                textDecoration: "none",
                transition: "color 0.15s"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.color = "var(--weld-text-primary, #f4f4f5)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.color = "var(--weld-text-muted, #52525b)";
              },
              children: item.label
            }
          ) : (0, import_jsx_runtime24.jsx)("span", { style: {
            fontSize: "0.8125rem",
            color: isLast ? "var(--weld-text-primary, #f4f4f5)" : "var(--weld-text-muted, #52525b)",
            fontWeight: isLast ? 500 : 400
          }, children: item.label }),
          !isLast && (0, import_jsx_runtime24.jsx)("span", { style: {
            fontSize: "0.75rem",
            color: "var(--weld-text-muted, #52525b)",
            opacity: 0.5,
            userSelect: "none"
          }, children: separator })
        ]
      },
      i
    );
  }) }) });
}
var sizeMap2 = { xs: 24, sm: 28, md: 36, lg: 44, xl: 56 };
var fontMap = { xs: "0.6rem", sm: "0.65rem", md: "0.8rem", lg: "0.9rem", xl: "1.1rem" };
function getInitials(name) {
  return name.split(" ").slice(0, 2).map((n) => {
    var _a;
    return ((_a = n[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
  }).join("");
}
function getColor(name) {
  const colors = [
    "#3b6bff",
    "#00d4ff",
    "#22c55e",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#ef4444",
    "#06b6d4"
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}
var statusColors = {
  online: "#22c55e",
  offline: "var(--weld-text-muted, #52525b)",
  away: "#f59e0b"
};
function Avatar({ name = "", src, size = "md", status, style }) {
  const px = sizeMap2[size];
  const fontSize = fontMap[size];
  const initials = getInitials(name);
  const color = getColor(name);
  const statusPx = size === "xs" || size === "sm" ? 7 : 9;
  return (0, import_jsx_runtime25.jsxs)(
    "div",
    {
      "data-weld-avatar": true,
      style: { position: "relative", display: "inline-flex", flexShrink: 0, ...style },
      children: [
        (0, import_jsx_runtime25.jsx)("div", { style: {
          width: `${px}px`,
          height: `${px}px`,
          borderRadius: "50%",
          background: src ? void 0 : `${color}22`,
          border: `1px solid ${src ? "rgba(255,255,255,0.08)" : `${color}44`}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0
        }, children: src ? (0, import_jsx_runtime25.jsx)(
          "img",
          {
            src,
            alt: name,
            style: { width: "100%", height: "100%", objectFit: "cover" }
          }
        ) : (0, import_jsx_runtime25.jsx)("span", { style: {
          fontSize,
          fontWeight: 600,
          color,
          userSelect: "none",
          letterSpacing: "0.02em"
        }, children: initials || "?" }) }),
        status && (0, import_jsx_runtime25.jsx)("span", { style: {
          position: "absolute",
          bottom: 0,
          right: 0,
          width: `${statusPx}px`,
          height: `${statusPx}px`,
          borderRadius: "50%",
          background: statusColors[status],
          border: "2px solid var(--weld-bg-base, #09090b)",
          boxShadow: status === "online" ? `0 0 6px ${statusColors.online}80` : "none"
        } })
      ]
    }
  );
}
function Table({
  columns,
  data,
  keyField,
  loading,
  empty,
  onRowClick,
  style
}) {
  const clickable = !!onRowClick;
  return (0, import_jsx_runtime26.jsx)(
    "div",
    {
      "data-weld-table": true,
      style: {
        width: "100%",
        overflowX: "auto",
        border: "1px solid var(--weld-border, rgba(255,255,255,0.06))",
        borderRadius: "var(--weld-radius-lg, 8px)",
        ...style
      },
      children: (0, import_jsx_runtime26.jsxs)("table", { style: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "0.8125rem"
      }, children: [
        (0, import_jsx_runtime26.jsx)("thead", { children: (0, import_jsx_runtime26.jsx)("tr", { style: {
          borderBottom: "1px solid var(--weld-border, rgba(255,255,255,0.06))",
          background: "rgba(255,255,255,0.02)"
        }, children: columns.map((col) => (0, import_jsx_runtime26.jsx)(
          "th",
          {
            style: {
              padding: "10px 14px",
              textAlign: col.align ?? "left",
              fontSize: "0.7rem",
              fontWeight: 500,
              color: "var(--weld-text-muted, #52525b)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              width: col.width,
              whiteSpace: "nowrap"
            },
            children: col.label
          },
          String(col.key)
        )) }) }),
        (0, import_jsx_runtime26.jsx)("tbody", { children: loading ? Array.from({ length: 4 }).map((_, i) => (0, import_jsx_runtime26.jsx)("tr", { children: columns.map((col) => (0, import_jsx_runtime26.jsx)("td", { style: { padding: "10px 14px" }, children: (0, import_jsx_runtime26.jsx)("div", { style: {
          height: "12px",
          borderRadius: "3px",
          background: "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 75%)",
          backgroundSize: "200% 100%",
          animation: "_weld-shimmer 1.6s ease-in-out infinite",
          width: `${60 + Math.random() * 30}%`
        } }) }, String(col.key))) }, i)) : data.length === 0 ? (0, import_jsx_runtime26.jsx)("tr", { children: (0, import_jsx_runtime26.jsx)(
          "td",
          {
            colSpan: columns.length,
            style: { padding: "40px 14px", textAlign: "center", color: "var(--weld-text-muted, #52525b)", fontSize: "0.8125rem" },
            children: empty ?? "No data"
          }
        ) }) : data.map((row) => (0, import_jsx_runtime26.jsx)(
          "tr",
          {
            onClick: clickable ? () => onRowClick(row) : void 0,
            style: {
              borderBottom: "1px solid var(--weld-border, rgba(255,255,255,0.04))",
              cursor: clickable ? "pointer" : void 0,
              transition: clickable ? "background 0.1s" : void 0
            },
            onMouseEnter: clickable ? (e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            } : void 0,
            onMouseLeave: clickable ? (e) => {
              e.currentTarget.style.background = "transparent";
            } : void 0,
            children: columns.map((col) => {
              const value = row[col.key];
              return (0, import_jsx_runtime26.jsx)(
                "td",
                {
                  style: {
                    padding: "10px 14px",
                    textAlign: col.align ?? "left",
                    color: "var(--weld-text-secondary, #a1a1aa)"
                  },
                  children: col.render ? col.render(value, row) : String(value ?? "")
                },
                String(col.key)
              );
            })
          },
          String(row[keyField])
        )) })
      ] })
    }
  );
}
function Stat({ label, value, trend, trendUp, accent = false, style }) {
  return (0, import_jsx_runtime27.jsxs)(
    "div",
    {
      "data-weld-stat": true,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        ...style
      },
      children: [
        (0, import_jsx_runtime27.jsx)("span", { style: {
          fontSize: "0.72rem",
          fontWeight: 500,
          color: "var(--weld-text-muted, #52525b)",
          textTransform: "uppercase",
          letterSpacing: "0.06em"
        }, children: label }),
        (0, import_jsx_runtime27.jsxs)("div", { style: { display: "flex", alignItems: "baseline", gap: "8px" }, children: [
          (0, import_jsx_runtime27.jsx)("span", { style: {
            fontSize: "1.6rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: accent ? "var(--weld-plasma-cyan, #00d4ff)" : "var(--weld-text-primary, #f4f4f5)"
          }, children: value }),
          trend && (0, import_jsx_runtime27.jsx)("span", { style: {
            fontSize: "0.75rem",
            fontWeight: 500,
            color: trendUp ? "#22c55e" : "#ef4444"
          }, children: trend })
        ] })
      ]
    }
  );
}
function Tabs({ items, value, onChange, style }) {
  var _a;
  const [internal, setInternal] = (0, import_react14.useState)(((_a = items[0]) == null ? void 0 : _a.id) ?? "");
  const active = value ?? internal;
  const handleChange = (id) => {
    if (!value) setInternal(id);
    onChange == null ? void 0 : onChange(id);
  };
  const activeItem = items.find((i) => i.id === active);
  return (0, import_jsx_runtime28.jsxs)("div", { "data-weld-tabs": true, style, children: [
    (0, import_jsx_runtime28.jsx)("div", { style: {
      display: "flex",
      gap: "2px",
      borderBottom: "1px solid var(--weld-border, rgba(255,255,255,0.06))",
      marginBottom: "20px",
      overflowX: "auto"
    }, children: items.map((item) => {
      const isActive = item.id === active;
      return (0, import_jsx_runtime28.jsxs)(
        "button",
        {
          onClick: () => !item.disabled && handleChange(item.id),
          disabled: item.disabled,
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            fontSize: "0.8125rem",
            fontWeight: isActive ? 500 : 400,
            fontFamily: "inherit",
            background: "transparent",
            border: "none",
            borderBottom: isActive ? "1.5px solid var(--weld-plasma-cyan, #00d4ff)" : "1.5px solid transparent",
            marginBottom: "-1px",
            color: isActive ? "var(--weld-text-primary, #f4f4f5)" : "var(--weld-text-muted, #52525b)",
            cursor: item.disabled ? "not-allowed" : "pointer",
            opacity: item.disabled ? 0.4 : 1,
            transition: "color 0.15s, border-color 0.15s",
            whiteSpace: "nowrap",
            outline: "none"
          },
          children: [
            item.icon && (0, import_jsx_runtime28.jsx)("span", { style: { fontSize: "0.9em" }, children: item.icon }),
            item.label,
            item.badge !== void 0 && (0, import_jsx_runtime28.jsx)("span", { style: {
              padding: "1px 6px",
              fontSize: "0.65rem",
              fontWeight: 500,
              borderRadius: "999px",
              background: isActive ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.06)",
              color: isActive ? "var(--weld-plasma-cyan, #00d4ff)" : "var(--weld-text-muted, #52525b)"
            }, children: item.badge })
          ]
        },
        item.id
      );
    }) }),
    (activeItem == null ? void 0 : activeItem.content) && (0, import_jsx_runtime28.jsx)("div", { "data-weld-tab-panel": true, children: activeItem.content })
  ] });
}
var Weld_exports = {};
__export(Weld_exports, {
  Alert: () => Alert,
  Avatar: () => Avatar,
  Badge: () => Badge,
  Breadcrumb: () => Breadcrumb,
  Button: () => Button,
  Card: () => Card,
  Container: () => Container,
  Divider: () => Divider,
  Dropdown: () => Dropdown,
  Empty: () => Empty,
  Footer: () => Footer,
  Grid: () => Grid,
  Header: () => Header,
  Heading: () => Heading,
  Input: () => Input,
  Main: () => Main,
  Modal: () => Modal,
  Section: () => Section,
  Shell: () => Shell,
  Sidebar: () => Sidebar,
  Skeleton: () => Skeleton,
  Spinner: () => Spinner2,
  Stack: () => Stack,
  Stat: () => Stat,
  Table: () => Table,
  Tabs: () => Tabs,
  Text: () => Text,
  ToastProvider: () => ToastProvider,
  Tooltip: () => Tooltip,
  toast: () => toast
});
var Weld = Weld_exports;
export {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Container,
  Divider,
  Dropdown,
  Empty,
  Footer,
  Grid,
  Header,
  Heading,
  Input,
  Main,
  Modal,
  Section,
  Shell,
  Sidebar,
  Skeleton,
  Spinner2 as Spinner,
  Stack,
  Stat,
  Table,
  Tabs,
  Text,
  ToastProvider,
  Tooltip,
  Weld,
  WeldProvider,
  toast,
  useResponsive,
  useWeld
};
/*! Bundled license information:

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=@weldjs_react.js.map
