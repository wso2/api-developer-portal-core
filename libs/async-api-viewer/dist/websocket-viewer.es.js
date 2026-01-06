import * as _ from "react";
import st, { isValidElement as fa, cloneElement as pa, Children as Fu, lazy as zu, Suspense as Vl, forwardRef as Hl, useContext as Wu, useState as Yt, createElement as Vu, useEffect as Yo, useRef as Hu, useMemo as Kl } from "react";
import * as Vn from "react-dom";
import aa from "react-dom";
var oa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function wr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ho = { exports: {} }, Yr = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var mo, ps;
function Ku() {
  if (ps) return mo;
  ps = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, a = Object.prototype.propertyIsEnumerable;
  function r(o) {
    if (o == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(o);
  }
  function n() {
    try {
      if (!Object.assign)
        return !1;
      var o = new String("abc");
      if (o[5] = "de", Object.getOwnPropertyNames(o)[0] === "5")
        return !1;
      for (var i = {}, s = 0; s < 10; s++)
        i["_" + String.fromCharCode(s)] = s;
      var l = Object.getOwnPropertyNames(i).map(function(c) {
        return i[c];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(c) {
        u[c] = c;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return mo = n() ? Object.assign : function(o, i) {
    for (var s, l = r(o), u, c = 1; c < arguments.length; c++) {
      s = Object(arguments[c]);
      for (var d in s)
        t.call(s, d) && (l[d] = s[d]);
      if (e) {
        u = e(s);
        for (var p = 0; p < u.length; p++)
          a.call(s, u[p]) && (l[u[p]] = s[u[p]]);
      }
    }
    return l;
  }, mo;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hs;
function qu() {
  if (hs) return Yr;
  hs = 1, Ku();
  var e = st, t = 60103;
  if (Yr.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var a = Symbol.for;
    t = a("react.element"), Yr.Fragment = a("react.fragment");
  }
  var r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(s, l, u) {
    var c, d = {}, p = null, h = null;
    u !== void 0 && (p = "" + u), l.key !== void 0 && (p = "" + l.key), l.ref !== void 0 && (h = l.ref);
    for (c in l) n.call(l, c) && !o.hasOwnProperty(c) && (d[c] = l[c]);
    if (s && s.defaultProps) for (c in l = s.defaultProps, l) d[c] === void 0 && (d[c] = l[c]);
    return { $$typeof: t, type: s, key: p, ref: h, props: d, _owner: r.current };
  }
  return Yr.jsx = i, Yr.jsxs = i, Yr;
}
var ms;
function Uu() {
  return ms || (ms = 1, ho.exports = qu()), ho.exports;
}
var q = Uu(), Ea = {
  black: "#000",
  white: "#fff"
}, go = {
  300: "#e57373",
  500: "#f44336",
  700: "#d32f2f"
}, bo = {
  A200: "#ff4081",
  A400: "#f50057",
  A700: "#c51162"
}, vo = {
  300: "#7986cb",
  500: "#3f51b5",
  700: "#303f9f"
}, yo = {
  300: "#64b5f6",
  500: "#2196f3",
  700: "#1976d2"
}, xo = {
  300: "#81c784",
  500: "#4caf50",
  700: "#388e3c"
}, So = {
  300: "#ffb74d",
  500: "#ff9800",
  700: "#f57c00"
}, Ri = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#d5d5d5",
  A200: "#aaaaaa",
  A400: "#303030",
  A700: "#616161"
};
function se() {
  return se = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var r in a) ({}).hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
  }, se.apply(null, arguments);
}
function Lr(e) {
  "@babel/helpers - typeof";
  return Lr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Lr(e);
}
function wo(e) {
  return e && Lr(e) === "object" && e.constructor === Object;
}
function vr(e, t) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    clone: !0
  }, r = a.clone ? se({}, e) : e;
  return wo(e) && wo(t) && Object.keys(t).forEach(function(n) {
    n !== "__proto__" && (wo(t[n]) && n in e ? r[n] = vr(e[n], t[n], a) : r[n] = t[n]);
  }), r;
}
function Gu(e, t) {
  if (Lr(e) != "object" || !e) return e;
  var a = e[Symbol.toPrimitive];
  if (a !== void 0) {
    var r = a.call(e, t);
    if (Lr(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ql(e) {
  var t = Gu(e, "string");
  return Lr(t) == "symbol" ? t : t + "";
}
function At(e, t, a) {
  return (t = ql(t)) in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e;
}
function Dn(e) {
  for (var t = "https://mui.com/production-error/?code=" + e, a = 1; a < arguments.length; a += 1)
    t += "&args[]=" + encodeURIComponent(arguments[a]);
  return "Minified Material-UI error #" + e + "; visit " + t + " for the full message.";
}
var Co = { exports: {} }, ut = {};
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gs;
function Yu() {
  if (gs) return ut;
  gs = 1;
  var e = 60103, t = 60106, a = 60107, r = 60108, n = 60114, o = 60109, i = 60110, s = 60112, l = 60113, u = 60120, c = 60115, d = 60116, p = 60121, h = 60122, g = 60117, m = 60129, v = 60131;
  if (typeof Symbol == "function" && Symbol.for) {
    var C = Symbol.for;
    e = C("react.element"), t = C("react.portal"), a = C("react.fragment"), r = C("react.strict_mode"), n = C("react.profiler"), o = C("react.provider"), i = C("react.context"), s = C("react.forward_ref"), l = C("react.suspense"), u = C("react.suspense_list"), c = C("react.memo"), d = C("react.lazy"), p = C("react.block"), h = C("react.server.block"), g = C("react.fundamental"), m = C("react.debug_trace_mode"), v = C("react.legacy_hidden");
  }
  function T(S) {
    if (typeof S == "object" && S !== null) {
      var L = S.$$typeof;
      switch (L) {
        case e:
          switch (S = S.type, S) {
            case a:
            case n:
            case r:
            case l:
            case u:
              return S;
            default:
              switch (S = S && S.$$typeof, S) {
                case i:
                case s:
                case d:
                case c:
                case o:
                  return S;
                default:
                  return L;
              }
          }
        case t:
          return L;
      }
    }
  }
  var A = o, f = e, x = s, k = a, D = d, V = c, j = t, M = n, I = r, b = l;
  return ut.ContextConsumer = i, ut.ContextProvider = A, ut.Element = f, ut.ForwardRef = x, ut.Fragment = k, ut.Lazy = D, ut.Memo = V, ut.Portal = j, ut.Profiler = M, ut.StrictMode = I, ut.Suspense = b, ut.isAsyncMode = function() {
    return !1;
  }, ut.isConcurrentMode = function() {
    return !1;
  }, ut.isContextConsumer = function(S) {
    return T(S) === i;
  }, ut.isContextProvider = function(S) {
    return T(S) === o;
  }, ut.isElement = function(S) {
    return typeof S == "object" && S !== null && S.$$typeof === e;
  }, ut.isForwardRef = function(S) {
    return T(S) === s;
  }, ut.isFragment = function(S) {
    return T(S) === a;
  }, ut.isLazy = function(S) {
    return T(S) === d;
  }, ut.isMemo = function(S) {
    return T(S) === c;
  }, ut.isPortal = function(S) {
    return T(S) === t;
  }, ut.isProfiler = function(S) {
    return T(S) === n;
  }, ut.isStrictMode = function(S) {
    return T(S) === r;
  }, ut.isSuspense = function(S) {
    return T(S) === l;
  }, ut.isValidElementType = function(S) {
    return typeof S == "string" || typeof S == "function" || S === a || S === n || S === m || S === r || S === l || S === u || S === v || typeof S == "object" && S !== null && (S.$$typeof === d || S.$$typeof === c || S.$$typeof === o || S.$$typeof === i || S.$$typeof === s || S.$$typeof === g || S.$$typeof === p || S[0] === h);
  }, ut.typeOf = T, ut;
}
var bs;
function Xu() {
  return bs || (bs = 1, Co.exports = Yu()), Co.exports;
}
Xu();
function Ti(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.min(Math.max(t, e), a);
}
function Ju(e) {
  e = e.substr(1);
  var t = new RegExp(".{1,".concat(e.length >= 6 ? 2 : 1, "}"), "g"), a = e.match(t);
  return a && a[0].length === 1 && (a = a.map(function(r) {
    return r + r;
  })), a ? "rgb".concat(a.length === 4 ? "a" : "", "(").concat(a.map(function(r, n) {
    return n < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3;
  }).join(", "), ")") : "";
}
function Zu(e) {
  e = Dr(e);
  var t = e, a = t.values, r = a[0], n = a[1] / 100, o = a[2] / 100, i = n * Math.min(o, 1 - o), s = function(d) {
    var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (d + r / 30) % 12;
    return o - i * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  }, l = "rgb", u = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", u.push(a[3])), Ma({
    type: l,
    values: u
  });
}
function Dr(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Dr(Ju(e));
  var t = e.indexOf("("), a = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla"].indexOf(a) === -1)
    throw new Error(Dn(3, e));
  var r = e.substring(t + 1, e.length - 1).split(",");
  return r = r.map(function(n) {
    return parseFloat(n);
  }), {
    type: a,
    values: r
  };
}
function Ma(e) {
  var t = e.type, a = e.values;
  return t.indexOf("rgb") !== -1 ? a = a.map(function(r, n) {
    return n < 3 ? parseInt(r, 10) : r;
  }) : t.indexOf("hsl") !== -1 && (a[1] = "".concat(a[1], "%"), a[2] = "".concat(a[2], "%")), "".concat(t, "(").concat(a.join(", "), ")");
}
function Qu(e, t) {
  var a = Xo(e), r = Xo(t);
  return (Math.max(a, r) + 0.05) / (Math.min(a, r) + 0.05);
}
function Xo(e) {
  e = Dr(e);
  var t = e.type === "hsl" ? Dr(Zu(e)).values : e.values;
  return t = t.map(function(a) {
    return a /= 255, a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  }), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Xr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.15;
  return Xo(e) > 0.5 ? Ul(e, t) : Gl(e, t);
}
function Le(e, t) {
  return e = Dr(e), t = Ti(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.values[3] = t, Ma(e);
}
function Ul(e, t) {
  if (e = Dr(e), t = Ti(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1)
    for (var a = 0; a < 3; a += 1)
      e.values[a] *= 1 - t;
  return Ma(e);
}
function Gl(e, t) {
  if (e = Dr(e), t = Ti(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (var a = 0; a < 3; a += 1)
      e.values[a] += (255 - e.values[a]) * t;
  return Ma(e);
}
function Ia(e, t) {
  if (e == null) return {};
  var a = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    a[r] = e[r];
  }
  return a;
}
function Ve(e, t) {
  if (e == null) return {};
  var a, r, n = Ia(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (r = 0; r < o.length; r++) a = o[r], t.indexOf(a) === -1 && {}.propertyIsEnumerable.call(e, a) && (n[a] = e[a]);
  }
  return n;
}
var pr = ["xs", "sm", "md", "lg", "xl"];
function ed(e) {
  var t = e.values, a = t === void 0 ? {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  } : t, r = e.unit, n = r === void 0 ? "px" : r, o = e.step, i = o === void 0 ? 5 : o, s = Ve(e, ["values", "unit", "step"]);
  function l(h) {
    var g = typeof a[h] == "number" ? a[h] : h;
    return "@media (min-width:".concat(g).concat(n, ")");
  }
  function u(h) {
    var g = pr.indexOf(h) + 1, m = a[pr[g]];
    if (g === pr.length)
      return l("xs");
    var v = typeof m == "number" && g > 0 ? m : h;
    return "@media (max-width:".concat(v - i / 100).concat(n, ")");
  }
  function c(h, g) {
    var m = pr.indexOf(g);
    return m === pr.length - 1 ? l(h) : "@media (min-width:".concat(typeof a[h] == "number" ? a[h] : h).concat(n, ") and ") + "(max-width:".concat((m !== -1 && typeof a[pr[m + 1]] == "number" ? a[pr[m + 1]] : g) - i / 100).concat(n, ")");
  }
  function d(h) {
    return c(h, h);
  }
  function p(h) {
    return a[h];
  }
  return se({
    keys: pr,
    values: a,
    up: l,
    down: u,
    between: c,
    only: d,
    width: p
  }, s);
}
function td(e, t, a) {
  var r;
  return se({
    gutters: function() {
      var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return console.warn(["Material-UI: theme.mixins.gutters() is deprecated.", "You can use the source of the mixin directly:", `
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
      `].join(`
`)), se({
        paddingLeft: t(2),
        paddingRight: t(2)
      }, o, At({}, e.up("sm"), se({
        paddingLeft: t(3),
        paddingRight: t(3)
      }, o[e.up("sm")])));
    },
    toolbar: (r = {
      minHeight: 56
    }, At(r, "".concat(e.up("xs"), " and (orientation: landscape)"), {
      minHeight: 48
    }), At(r, e.up("sm"), {
      minHeight: 64
    }), r)
  }, a);
}
var vs = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: "rgba(0, 0, 0, 0.87)",
    // Secondary text.
    secondary: "rgba(0, 0, 0, 0.54)",
    // Disabled text have even lower visual prominence.
    disabled: "rgba(0, 0, 0, 0.38)",
    // Text hints.
    hint: "rgba(0, 0, 0, 0.38)"
  },
  // The color used to divide different elements.
  divider: "rgba(0, 0, 0, 0.12)",
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: Ea.white,
    default: Ri[50]
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: "rgba(0, 0, 0, 0.54)",
    // The color of an hovered action.
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: "rgba(0, 0, 0, 0.26)",
    // The background color of a disabled action.
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
}, Eo = {
  text: {
    primary: Ea.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    hint: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: Ri[800],
    default: "#303030"
  },
  action: {
    active: Ea.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function ys(e, t, a, r) {
  var n = r.light || r, o = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(a) ? e[t] = e[a] : t === "light" ? e.light = Gl(e.main, n) : t === "dark" && (e.dark = Ul(e.main, o)));
}
function rd(e) {
  var t = e.primary, a = t === void 0 ? {
    light: vo[300],
    main: vo[500],
    dark: vo[700]
  } : t, r = e.secondary, n = r === void 0 ? {
    light: bo.A200,
    main: bo.A400,
    dark: bo.A700
  } : r, o = e.error, i = o === void 0 ? {
    light: go[300],
    main: go[500],
    dark: go[700]
  } : o, s = e.warning, l = s === void 0 ? {
    light: So[300],
    main: So[500],
    dark: So[700]
  } : s, u = e.info, c = u === void 0 ? {
    light: yo[300],
    main: yo[500],
    dark: yo[700]
  } : u, d = e.success, p = d === void 0 ? {
    light: xo[300],
    main: xo[500],
    dark: xo[700]
  } : d, h = e.type, g = h === void 0 ? "light" : h, m = e.contrastThreshold, v = m === void 0 ? 3 : m, C = e.tonalOffset, T = C === void 0 ? 0.2 : C, A = Ve(e, ["primary", "secondary", "error", "warning", "info", "success", "type", "contrastThreshold", "tonalOffset"]);
  function f(V) {
    var j = Qu(V, Eo.text.primary) >= v ? Eo.text.primary : vs.text.primary;
    return j;
  }
  var x = function(j) {
    var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 500, I = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 300, b = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 700;
    if (j = se({}, j), !j.main && j[M] && (j.main = j[M]), !j.main)
      throw new Error(Dn(4, M));
    if (typeof j.main != "string")
      throw new Error(Dn(5, JSON.stringify(j.main)));
    return ys(j, "light", I, T), ys(j, "dark", b, T), j.contrastText || (j.contrastText = f(j.main)), j;
  }, k = {
    dark: Eo,
    light: vs
  }, D = vr(se({
    // A collection of common colors.
    common: Ea,
    // The palette type, can be light or dark.
    type: g,
    // The colors used to represent primary interface elements for a user.
    primary: x(a),
    // The colors used to represent secondary interface elements for a user.
    secondary: x(n, "A400", "A200", "A700"),
    // The colors used to represent interface elements that the user should be made aware of.
    error: x(i),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: x(l),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: x(c),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: x(p),
    // The grey colors.
    grey: Ri,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: v,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: x,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: T
  }, k[g]), A);
  return D;
}
function Yl(e) {
  return Math.round(e * 1e5) / 1e5;
}
function nd(e) {
  return Yl(e);
}
var xs = {
  textTransform: "uppercase"
}, Ss = '"Roboto", "Helvetica", "Arial", sans-serif';
function ad(e, t) {
  var a = typeof t == "function" ? t(e) : t, r = a.fontFamily, n = r === void 0 ? Ss : r, o = a.fontSize, i = o === void 0 ? 14 : o, s = a.fontWeightLight, l = s === void 0 ? 300 : s, u = a.fontWeightRegular, c = u === void 0 ? 400 : u, d = a.fontWeightMedium, p = d === void 0 ? 500 : d, h = a.fontWeightBold, g = h === void 0 ? 700 : h, m = a.htmlFontSize, v = m === void 0 ? 16 : m, C = a.allVariants, T = a.pxToRem, A = Ve(a, ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"]), f = i / 14, x = T || function(V) {
    return "".concat(V / v * f, "rem");
  }, k = function(j, M, I, b, S) {
    return se({
      fontFamily: n,
      fontWeight: j,
      fontSize: x(M),
      // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
      lineHeight: I
    }, n === Ss ? {
      letterSpacing: "".concat(Yl(b / M), "em")
    } : {}, S, C);
  }, D = {
    h1: k(l, 96, 1.167, -1.5),
    h2: k(l, 60, 1.2, -0.5),
    h3: k(c, 48, 1.167, 0),
    h4: k(c, 34, 1.235, 0.25),
    h5: k(c, 24, 1.334, 0),
    h6: k(p, 20, 1.6, 0.15),
    subtitle1: k(c, 16, 1.75, 0.15),
    subtitle2: k(p, 14, 1.57, 0.1),
    body1: k(c, 16, 1.5, 0.15),
    body2: k(c, 14, 1.43, 0.15),
    button: k(p, 14, 1.75, 0.4, xs),
    caption: k(c, 12, 1.66, 0.4),
    overline: k(c, 12, 2.66, 1, xs)
  };
  return vr(se({
    htmlFontSize: v,
    pxToRem: x,
    round: nd,
    // TODO v5: remove
    fontFamily: n,
    fontSize: i,
    fontWeightLight: l,
    fontWeightRegular: c,
    fontWeightMedium: p,
    fontWeightBold: g
  }, D), A, {
    clone: !1
    // No need to clone deep
  });
}
var od = 0.2, id = 0.14, sd = 0.12;
function yt() {
  return ["".concat(arguments.length <= 0 ? void 0 : arguments[0], "px ").concat(arguments.length <= 1 ? void 0 : arguments[1], "px ").concat(arguments.length <= 2 ? void 0 : arguments[2], "px ").concat(arguments.length <= 3 ? void 0 : arguments[3], "px rgba(0,0,0,").concat(od, ")"), "".concat(arguments.length <= 4 ? void 0 : arguments[4], "px ").concat(arguments.length <= 5 ? void 0 : arguments[5], "px ").concat(arguments.length <= 6 ? void 0 : arguments[6], "px ").concat(arguments.length <= 7 ? void 0 : arguments[7], "px rgba(0,0,0,").concat(id, ")"), "".concat(arguments.length <= 8 ? void 0 : arguments[8], "px ").concat(arguments.length <= 9 ? void 0 : arguments[9], "px ").concat(arguments.length <= 10 ? void 0 : arguments[10], "px ").concat(arguments.length <= 11 ? void 0 : arguments[11], "px rgba(0,0,0,").concat(sd, ")")].join(",");
}
var ld = ["none", yt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), yt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), yt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), yt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), yt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), yt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), yt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), yt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), yt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), yt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), yt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), yt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), yt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), yt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), yt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), yt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), yt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), yt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), yt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), yt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), yt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), yt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), yt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), yt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], cd = {
  borderRadius: 4
};
function Jo(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var a = 0, r = Array(t); a < t; a++) r[a] = e[a];
  return r;
}
function ud(e) {
  if (Array.isArray(e)) return Jo(e);
}
function Xl(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Oi(e, t) {
  if (e) {
    if (typeof e == "string") return Jo(e, t);
    var a = {}.toString.call(e).slice(8, -1);
    return a === "Object" && e.constructor && (a = e.constructor.name), a === "Map" || a === "Set" ? Array.from(e) : a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? Jo(e, t) : void 0;
  }
}
function dd() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _i(e) {
  return ud(e) || Xl(e) || Oi(e) || dd();
}
function ka(e, t) {
  return t ? vr(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
var fd = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
}, ws = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: function(t) {
    return "@media (min-width:".concat(fd[t], "px)");
  }
};
function Jl(e, t, a) {
  if (Array.isArray(t)) {
    var r = e.theme.breakpoints || ws;
    return t.reduce(function(i, s, l) {
      return i[r.up(r.keys[l])] = a(t[l]), i;
    }, {});
  }
  if (Lr(t) === "object") {
    var n = e.theme.breakpoints || ws;
    return Object.keys(t).reduce(function(i, s) {
      return i[n.up(s)] = a(t[s]), i;
    }, {});
  }
  var o = a(t);
  return o;
}
function Cs(e, t) {
  return !t || typeof t != "string" ? null : t.split(".").reduce(function(a, r) {
    return a && a[r] ? a[r] : null;
  }, e);
}
function ye(e) {
  var t = e.prop, a = e.cssProperty, r = a === void 0 ? e.prop : a, n = e.themeKey, o = e.transform, i = function(l) {
    if (l[t] == null)
      return null;
    var u = l[t], c = l.theme, d = Cs(c, n) || {}, p = function(g) {
      var m;
      return typeof d == "function" ? m = d(g) : Array.isArray(d) ? m = d[g] || g : (m = Cs(d, g) || g, o && (m = o(m))), r === !1 ? m : At({}, r, m);
    };
    return Jl(l, u, p);
  };
  return i.propTypes = {}, i.filterProps = [t], i;
}
function lr() {
  for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
    t[a] = arguments[a];
  var r = function(o) {
    return t.reduce(function(i, s) {
      var l = s(o);
      return l ? ka(i, l) : i;
    }, {});
  };
  return r.propTypes = {}, r.filterProps = t.reduce(function(n, o) {
    return n.concat(o.filterProps);
  }, []), r;
}
function Hn(e) {
  return typeof e != "number" ? e : "".concat(e, "px solid");
}
var pd = ye({
  prop: "border",
  themeKey: "borders",
  transform: Hn
}), hd = ye({
  prop: "borderTop",
  themeKey: "borders",
  transform: Hn
}), md = ye({
  prop: "borderRight",
  themeKey: "borders",
  transform: Hn
}), gd = ye({
  prop: "borderBottom",
  themeKey: "borders",
  transform: Hn
}), bd = ye({
  prop: "borderLeft",
  themeKey: "borders",
  transform: Hn
}), vd = ye({
  prop: "borderColor",
  themeKey: "palette"
}), yd = ye({
  prop: "borderRadius",
  themeKey: "shape"
}), xd = lr(pd, hd, md, gd, bd, vd, yd);
function Es(e, t) {
  var a = {};
  return Object.keys(e).forEach(function(r) {
    t.indexOf(r) === -1 && (a[r] = e[r]);
  }), a;
}
function Sd(e) {
  var t = function(r) {
    var n = e(r);
    return r.css ? se({}, ka(n, e(se({
      theme: r.theme
    }, r.css))), Es(r.css, [e.filterProps])) : r.sx ? se({}, ka(n, e(se({
      theme: r.theme
    }, r.sx))), Es(r.sx, [e.filterProps])) : n;
  };
  return t.propTypes = {}, t.filterProps = ["css", "sx"].concat(_i(e.filterProps)), t;
}
var wd = ye({
  prop: "displayPrint",
  cssProperty: !1,
  transform: function(t) {
    return {
      "@media print": {
        display: t
      }
    };
  }
}), Cd = ye({
  prop: "display"
}), Ed = ye({
  prop: "overflow"
}), kd = ye({
  prop: "textOverflow"
}), $d = ye({
  prop: "visibility"
}), Rd = ye({
  prop: "whiteSpace"
});
const Td = lr(wd, Cd, Ed, kd, $d, Rd);
var Od = ye({
  prop: "flexBasis"
}), _d = ye({
  prop: "flexDirection"
}), Pd = ye({
  prop: "flexWrap"
}), jd = ye({
  prop: "justifyContent"
}), Ad = ye({
  prop: "alignItems"
}), Md = ye({
  prop: "alignContent"
}), Id = ye({
  prop: "order"
}), Ld = ye({
  prop: "flex"
}), Dd = ye({
  prop: "flexGrow"
}), Nd = ye({
  prop: "flexShrink"
}), Bd = ye({
  prop: "alignSelf"
}), Fd = ye({
  prop: "justifyItems"
}), zd = ye({
  prop: "justifySelf"
}), Wd = lr(Od, _d, Pd, jd, Ad, Md, Id, Ld, Dd, Nd, Bd, Fd, zd), Vd = ye({
  prop: "gridGap"
}), Hd = ye({
  prop: "gridColumnGap"
}), Kd = ye({
  prop: "gridRowGap"
}), qd = ye({
  prop: "gridColumn"
}), Ud = ye({
  prop: "gridRow"
}), Gd = ye({
  prop: "gridAutoFlow"
}), Yd = ye({
  prop: "gridAutoColumns"
}), Xd = ye({
  prop: "gridAutoRows"
}), Jd = ye({
  prop: "gridTemplateColumns"
}), Zd = ye({
  prop: "gridTemplateRows"
}), Qd = ye({
  prop: "gridTemplateAreas"
}), ef = ye({
  prop: "gridArea"
}), tf = lr(Vd, Hd, Kd, qd, Ud, Gd, Yd, Xd, Jd, Zd, Qd, ef), rf = ye({
  prop: "color",
  themeKey: "palette"
}), nf = ye({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette"
}), af = lr(rf, nf), of = ye({
  prop: "position"
}), sf = ye({
  prop: "zIndex",
  themeKey: "zIndex"
}), lf = ye({
  prop: "top"
}), cf = ye({
  prop: "right"
}), uf = ye({
  prop: "bottom"
}), df = ye({
  prop: "left"
});
const ff = lr(of, sf, lf, cf, uf, df);
var pf = ye({
  prop: "boxShadow",
  themeKey: "shadows"
});
function Cr(e) {
  return e <= 1 ? "".concat(e * 100, "%") : e;
}
var hf = ye({
  prop: "width",
  transform: Cr
}), mf = ye({
  prop: "maxWidth",
  transform: Cr
}), gf = ye({
  prop: "minWidth",
  transform: Cr
}), bf = ye({
  prop: "height",
  transform: Cr
}), vf = ye({
  prop: "maxHeight",
  transform: Cr
}), yf = ye({
  prop: "minHeight",
  transform: Cr
});
ye({
  prop: "size",
  cssProperty: "width",
  transform: Cr
});
ye({
  prop: "size",
  cssProperty: "height",
  transform: Cr
});
var xf = ye({
  prop: "boxSizing"
}), Sf = lr(hf, mf, gf, bf, vf, yf, xf);
function Zl(e) {
  if (Array.isArray(e)) return e;
}
function wf(e, t) {
  var a = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (a != null) {
    var r, n, o, i, s = [], l = !0, u = !1;
    try {
      if (o = (a = a.call(e)).next, t !== 0) for (; !(l = (r = o.call(a)).done) && (s.push(r.value), s.length !== t); l = !0) ;
    } catch (c) {
      u = !0, n = c;
    } finally {
      try {
        if (!l && a.return != null && (i = a.return(), Object(i) !== i)) return;
      } finally {
        if (u) throw n;
      }
    }
    return s;
  }
}
function Ql() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Kn(e, t) {
  return Zl(e) || wf(e, t) || Oi(e, t) || Ql();
}
function Cf(e) {
  var t = {};
  return function(a) {
    return t[a] === void 0 && (t[a] = e(a)), t[a];
  };
}
var Ef = {
  m: "margin",
  p: "padding"
}, kf = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, ks = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, $f = Cf(function(e) {
  if (e.length > 2)
    if (ks[e])
      e = ks[e];
    else
      return [e];
  var t = e.split(""), a = Kn(t, 2), r = a[0], n = a[1], o = Ef[r], i = kf[n] || "";
  return Array.isArray(i) ? i.map(function(s) {
    return o + s;
  }) : [o + i];
}), ec = ["m", "mt", "mr", "mb", "ml", "mx", "my", "p", "pt", "pr", "pb", "pl", "px", "py", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY"];
function tc(e) {
  var t = e.spacing || 8;
  return typeof t == "number" ? function(a) {
    return t * a;
  } : Array.isArray(t) ? function(a) {
    return t[a];
  } : typeof t == "function" ? t : function() {
  };
}
function Rf(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  var a = Math.abs(t), r = e(a);
  return t >= 0 ? r : typeof r == "number" ? -r : "-".concat(r);
}
function Tf(e, t) {
  return function(a) {
    return e.reduce(function(r, n) {
      return r[n] = Rf(t, a), r;
    }, {});
  };
}
function Pi(e) {
  var t = e.theme, a = tc(t);
  return Object.keys(e).map(function(r) {
    if (ec.indexOf(r) === -1)
      return null;
    var n = $f(r), o = Tf(n, a), i = e[r];
    return Jl(e, i, o);
  }).reduce(ka, {});
}
Pi.propTypes = {};
Pi.filterProps = ec;
var Of = ye({
  prop: "fontFamily",
  themeKey: "typography"
}), _f = ye({
  prop: "fontSize",
  themeKey: "typography"
}), Pf = ye({
  prop: "fontStyle",
  themeKey: "typography"
}), jf = ye({
  prop: "fontWeight",
  themeKey: "typography"
}), Af = ye({
  prop: "letterSpacing"
}), Mf = ye({
  prop: "lineHeight"
}), If = ye({
  prop: "textAlign"
}), Lf = lr(Of, _f, Pf, jf, Af, Mf, If);
function Df() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 8;
  if (e.mui)
    return e;
  var t = tc({
    spacing: e
  }), a = function() {
    for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++)
      o[i] = arguments[i];
    return o.length === 0 ? t(1) : o.length === 1 ? t(o[0]) : o.map(function(s) {
      if (typeof s == "string")
        return s;
      var l = t(s);
      return typeof l == "number" ? "".concat(l, "px") : l;
    }).join(" ");
  };
  return Object.defineProperty(a, "unit", {
    get: function() {
      return e;
    }
  }), a.mui = !0, a;
}
var $s = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Zo = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function Rs(e) {
  return "".concat(Math.round(e), "ms");
}
const Nf = {
  easing: $s,
  duration: Zo,
  create: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["all"], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = a.duration, n = r === void 0 ? Zo.standard : r, o = a.easing, i = o === void 0 ? $s.easeInOut : o, s = a.delay, l = s === void 0 ? 0 : s;
    return Ve(a, ["duration", "easing", "delay"]), (Array.isArray(t) ? t : [t]).map(function(u) {
      return "".concat(u, " ").concat(typeof n == "string" ? n : Rs(n), " ").concat(i, " ").concat(typeof l == "string" ? l : Rs(l));
    }).join(",");
  },
  getAutoHeightDuration: function(t) {
    if (!t)
      return 0;
    var a = t / 36;
    return Math.round((4 + 15 * Math.pow(a, 0.25) + a / 5) * 10);
  }
};
var Bf = {
  mobileStepper: 1e3,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function Ff() {
  for (var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.breakpoints, a = t === void 0 ? {} : t, r = e.mixins, n = r === void 0 ? {} : r, o = e.palette, i = o === void 0 ? {} : o, s = e.spacing, l = e.typography, u = l === void 0 ? {} : l, c = Ve(e, ["breakpoints", "mixins", "palette", "spacing", "typography"]), d = rd(i), p = ed(a), h = Df(s), g = vr({
    breakpoints: p,
    direction: "ltr",
    mixins: td(p, h, n),
    overrides: {},
    // Inject custom styles
    palette: d,
    props: {},
    // Provide default props
    shadows: ld,
    typography: ad(d, u),
    spacing: h,
    shape: cd,
    transitions: Nf,
    zIndex: Bf
  }, c), m = arguments.length, v = new Array(m > 1 ? m - 1 : 0), C = 1; C < m; C++)
    v[C - 1] = arguments[C];
  return g = v.reduce(function(T, A) {
    return vr(T, A);
  }, g), g;
}
var zf = typeof Symbol == "function" && Symbol.for;
const Wf = zf ? Symbol.for("mui.nested") : "__THEME_NESTED__";
var Vf = ["checked", "disabled", "error", "focused", "focusVisible", "required", "expanded", "selected"];
function Hf() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.disableGlobal, a = t === void 0 ? !1 : t, r = e.productionPrefix, n = r === void 0 ? "jss" : r, o = e.seed, i = o === void 0 ? "" : o, s = i === "" ? "" : "".concat(i, "-"), l = 0, u = function() {
    return l += 1, l;
  };
  return function(c, d) {
    var p = d.options.name;
    if (p && p.indexOf("Mui") === 0 && !d.options.link && !a) {
      if (Vf.indexOf(c.key) !== -1)
        return "Mui-".concat(c.key);
      var h = "".concat(s).concat(p, "-").concat(c.key);
      return !d.options.theme[Wf] || i !== "" ? h : "".concat(h, "-").concat(u());
    }
    return "".concat(s).concat(n).concat(u());
  };
}
function Kf(e) {
  var t = e.theme, a = e.name, r = e.props;
  if (!t || !t.props || !t.props[a])
    return r;
  var n = t.props[a], o;
  for (o in n)
    r[o] === void 0 && (r[o] = n[o]);
  return r;
}
var Ts = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
  return typeof e;
} : function(e) {
  return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, qn = (typeof window > "u" ? "undefined" : Ts(window)) === "object" && (typeof document > "u" ? "undefined" : Ts(document)) === "object" && document.nodeType === 9;
function qf(e, t) {
  for (var a = 0; a < t.length; a++) {
    var r = t[a];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, ql(r.key), r);
  }
}
function rc(e, t, a) {
  return t && qf(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function Qo(e, t) {
  return Qo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, r) {
    return a.__proto__ = r, a;
  }, Qo(e, t);
}
function La(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Qo(e, t);
}
function ei(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
var Uf = {}.constructor;
function ti(e) {
  if (e == null || typeof e != "object") return e;
  if (Array.isArray(e)) return e.map(ti);
  if (e.constructor !== Uf) return e;
  var t = {};
  for (var a in e)
    t[a] = ti(e[a]);
  return t;
}
function ji(e, t, a) {
  e === void 0 && (e = "unnamed");
  var r = a.jss, n = ti(t), o = r.plugins.onCreateRule(e, n, a);
  return o || (e[0], null);
}
var Os = function(t, a) {
  for (var r = "", n = 0; n < t.length && t[n] !== "!important"; n++)
    r && (r += a), r += t[n];
  return r;
}, Mr = function(t) {
  if (!Array.isArray(t)) return t;
  var a = "";
  if (Array.isArray(t[0]))
    for (var r = 0; r < t.length && t[r] !== "!important"; r++)
      a && (a += ", "), a += Os(t[r], " ");
  else a = Os(t, ", ");
  return t[t.length - 1] === "!important" && (a += " !important"), a;
};
function yn(e) {
  return e && e.format === !1 ? {
    linebreak: "",
    space: ""
  } : {
    linebreak: `
`,
    space: " "
  };
}
function kn(e, t) {
  for (var a = "", r = 0; r < t; r++)
    a += "  ";
  return a + e;
}
function Nn(e, t, a) {
  a === void 0 && (a = {});
  var r = "";
  if (!t) return r;
  var n = a, o = n.indent, i = o === void 0 ? 0 : o, s = t.fallbacks;
  a.format === !1 && (i = -1 / 0);
  var l = yn(a), u = l.linebreak, c = l.space;
  if (e && i++, s)
    if (Array.isArray(s))
      for (var d = 0; d < s.length; d++) {
        var p = s[d];
        for (var h in p) {
          var g = p[h];
          g != null && (r && (r += u), r += kn(h + ":" + c + Mr(g) + ";", i));
        }
      }
    else
      for (var m in s) {
        var v = s[m];
        v != null && (r && (r += u), r += kn(m + ":" + c + Mr(v) + ";", i));
      }
  for (var C in t) {
    var T = t[C];
    T != null && C !== "fallbacks" && (r && (r += u), r += kn(C + ":" + c + Mr(T) + ";", i));
  }
  return !r && !a.allowEmpty || !e ? r : (i--, r && (r = "" + u + r + u), kn("" + e + c + "{" + r, i) + kn("}", i));
}
var Gf = /([[\].#*$><+~=|^:(),"'`\s])/g, _s = typeof CSS < "u" && CSS.escape, Ai = (function(e) {
  return _s ? _s(e) : e.replace(Gf, "\\$1");
}), nc = /* @__PURE__ */ (function() {
  function e(a, r, n) {
    this.type = "style", this.isProcessed = !1;
    var o = n.sheet, i = n.Renderer;
    this.key = a, this.options = n, this.style = r, o ? this.renderer = o.renderer : i && (this.renderer = new i());
  }
  var t = e.prototype;
  return t.prop = function(r, n, o) {
    if (n === void 0) return this.style[r];
    var i = o ? o.force : !1;
    if (!i && this.style[r] === n) return this;
    var s = n;
    (!o || o.process !== !1) && (s = this.options.jss.plugins.onChangeValue(n, r, this));
    var l = s == null || s === !1, u = r in this.style;
    if (l && !u && !i) return this;
    var c = l && u;
    if (c ? delete this.style[r] : this.style[r] = s, this.renderable && this.renderer)
      return c ? this.renderer.removeProperty(this.renderable, r) : this.renderer.setProperty(this.renderable, r, s), this;
    var d = this.options.sheet;
    return d && d.attached, this;
  }, e;
})(), ri = /* @__PURE__ */ (function(e) {
  La(t, e);
  function t(r, n, o) {
    var i;
    i = e.call(this, r, n, o) || this;
    var s = o.selector, l = o.scoped, u = o.sheet, c = o.generateId;
    return s ? i.selectorText = s : l !== !1 && (i.id = c(ei(ei(i)), u), i.selectorText = "." + Ai(i.id)), i;
  }
  var a = t.prototype;
  return a.applyTo = function(n) {
    var o = this.renderer;
    if (o) {
      var i = this.toJSON();
      for (var s in i)
        o.setProperty(n, s, i[s]);
    }
    return this;
  }, a.toJSON = function() {
    var n = {};
    for (var o in this.style) {
      var i = this.style[o];
      typeof i != "object" ? n[o] = i : Array.isArray(i) && (n[o] = Mr(i));
    }
    return n;
  }, a.toString = function(n) {
    var o = this.options.sheet, i = o ? o.options.link : !1, s = i ? se({}, n, {
      allowEmpty: !0
    }) : n;
    return Nn(this.selectorText, this.style, s);
  }, rc(t, [{
    key: "selector",
    set: function(n) {
      if (n !== this.selectorText) {
        this.selectorText = n;
        var o = this.renderer, i = this.renderable;
        if (!(!i || !o)) {
          var s = o.setSelector(i, n);
          s || o.replaceRule(i, this);
        }
      }
    },
    get: function() {
      return this.selectorText;
    }
  }]), t;
})(nc), Yf = {
  onCreateRule: function(t, a, r) {
    return t[0] === "@" || r.parent && r.parent.type === "keyframes" ? null : new ri(t, a, r);
  }
}, ko = {
  indent: 1,
  children: !0
}, Xf = /@([\w-]+)/, Jf = /* @__PURE__ */ (function() {
  function e(a, r, n) {
    this.type = "conditional", this.isProcessed = !1, this.key = a;
    var o = a.match(Xf);
    this.at = o ? o[1] : "unknown", this.query = n.name || "@" + this.at, this.options = n, this.rules = new Da(se({}, n, {
      parent: this
    }));
    for (var i in r)
      this.rules.add(i, r[i]);
    this.rules.process();
  }
  var t = e.prototype;
  return t.getRule = function(r) {
    return this.rules.get(r);
  }, t.indexOf = function(r) {
    return this.rules.indexOf(r);
  }, t.addRule = function(r, n, o) {
    var i = this.rules.add(r, n, o);
    return i ? (this.options.jss.plugins.onProcessRule(i), i) : null;
  }, t.replaceRule = function(r, n, o) {
    var i = this.rules.replace(r, n, o);
    return i && this.options.jss.plugins.onProcessRule(i), i;
  }, t.toString = function(r) {
    r === void 0 && (r = ko);
    var n = yn(r), o = n.linebreak;
    if (r.indent == null && (r.indent = ko.indent), r.children == null && (r.children = ko.children), r.children === !1)
      return this.query + " {}";
    var i = this.rules.toString(r);
    return i ? this.query + " {" + o + i + o + "}" : "";
  }, e;
})(), Zf = /@container|@media|@supports\s+/, Qf = {
  onCreateRule: function(t, a, r) {
    return Zf.test(t) ? new Jf(t, a, r) : null;
  }
}, $o = {
  indent: 1,
  children: !0
}, ep = /@keyframes\s+([\w-]+)/, ni = /* @__PURE__ */ (function() {
  function e(a, r, n) {
    this.type = "keyframes", this.at = "@keyframes", this.isProcessed = !1;
    var o = a.match(ep);
    o && o[1] ? this.name = o[1] : this.name = "noname", this.key = this.type + "-" + this.name, this.options = n;
    var i = n.scoped, s = n.sheet, l = n.generateId;
    this.id = i === !1 ? this.name : Ai(l(this, s)), this.rules = new Da(se({}, n, {
      parent: this
    }));
    for (var u in r)
      this.rules.add(u, r[u], se({}, n, {
        parent: this
      }));
    this.rules.process();
  }
  var t = e.prototype;
  return t.toString = function(r) {
    r === void 0 && (r = $o);
    var n = yn(r), o = n.linebreak;
    if (r.indent == null && (r.indent = $o.indent), r.children == null && (r.children = $o.children), r.children === !1)
      return this.at + " " + this.id + " {}";
    var i = this.rules.toString(r);
    return i && (i = "" + o + i + o), this.at + " " + this.id + " {" + i + "}";
  }, e;
})(), tp = /@keyframes\s+/, rp = /\$([\w-]+)/g, ai = function(t, a) {
  return typeof t == "string" ? t.replace(rp, function(r, n) {
    return n in a ? a[n] : r;
  }) : t;
}, Ps = function(t, a, r) {
  var n = t[a], o = ai(n, r);
  o !== n && (t[a] = o);
}, np = {
  onCreateRule: function(t, a, r) {
    return typeof t == "string" && tp.test(t) ? new ni(t, a, r) : null;
  },
  // Animation name ref replacer.
  onProcessStyle: function(t, a, r) {
    return a.type !== "style" || !r || ("animation-name" in t && Ps(t, "animation-name", r.keyframes), "animation" in t && Ps(t, "animation", r.keyframes)), t;
  },
  onChangeValue: function(t, a, r) {
    var n = r.options.sheet;
    if (!n)
      return t;
    switch (a) {
      case "animation":
        return ai(t, n.keyframes);
      case "animation-name":
        return ai(t, n.keyframes);
      default:
        return t;
    }
  }
}, ap = /* @__PURE__ */ (function(e) {
  La(t, e);
  function t() {
    return e.apply(this, arguments) || this;
  }
  var a = t.prototype;
  return a.toString = function(n) {
    var o = this.options.sheet, i = o ? o.options.link : !1, s = i ? se({}, n, {
      allowEmpty: !0
    }) : n;
    return Nn(this.key, this.style, s);
  }, t;
})(nc), op = {
  onCreateRule: function(t, a, r) {
    return r.parent && r.parent.type === "keyframes" ? new ap(t, a, r) : null;
  }
}, ip = /* @__PURE__ */ (function() {
  function e(a, r, n) {
    this.type = "font-face", this.at = "@font-face", this.isProcessed = !1, this.key = a, this.style = r, this.options = n;
  }
  var t = e.prototype;
  return t.toString = function(r) {
    var n = yn(r), o = n.linebreak;
    if (Array.isArray(this.style)) {
      for (var i = "", s = 0; s < this.style.length; s++)
        i += Nn(this.at, this.style[s]), this.style[s + 1] && (i += o);
      return i;
    }
    return Nn(this.at, this.style, r);
  }, e;
})(), sp = /@font-face/, lp = {
  onCreateRule: function(t, a, r) {
    return sp.test(t) ? new ip(t, a, r) : null;
  }
}, cp = /* @__PURE__ */ (function() {
  function e(a, r, n) {
    this.type = "viewport", this.at = "@viewport", this.isProcessed = !1, this.key = a, this.style = r, this.options = n;
  }
  var t = e.prototype;
  return t.toString = function(r) {
    return Nn(this.key, this.style, r);
  }, e;
})(), up = {
  onCreateRule: function(t, a, r) {
    return t === "@viewport" || t === "@-ms-viewport" ? new cp(t, a, r) : null;
  }
}, dp = /* @__PURE__ */ (function() {
  function e(a, r, n) {
    this.type = "simple", this.isProcessed = !1, this.key = a, this.value = r, this.options = n;
  }
  var t = e.prototype;
  return t.toString = function(r) {
    if (Array.isArray(this.value)) {
      for (var n = "", o = 0; o < this.value.length; o++)
        n += this.key + " " + this.value[o] + ";", this.value[o + 1] && (n += `
`);
      return n;
    }
    return this.key + " " + this.value + ";";
  }, e;
})(), fp = {
  "@charset": !0,
  "@import": !0,
  "@namespace": !0
}, pp = {
  onCreateRule: function(t, a, r) {
    return t in fp ? new dp(t, a, r) : null;
  }
}, js = [Yf, Qf, np, op, lp, up, pp], hp = {
  process: !0
}, As = {
  force: !0,
  process: !0
  /**
   * Contains rules objects and allows adding/removing etc.
   * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
   */
}, Da = /* @__PURE__ */ (function() {
  function e(a) {
    this.map = {}, this.raw = {}, this.index = [], this.counter = 0, this.options = a, this.classes = a.classes, this.keyframes = a.keyframes;
  }
  var t = e.prototype;
  return t.add = function(r, n, o) {
    var i = this.options, s = i.parent, l = i.sheet, u = i.jss, c = i.Renderer, d = i.generateId, p = i.scoped, h = se({
      classes: this.classes,
      parent: s,
      sheet: l,
      jss: u,
      Renderer: c,
      generateId: d,
      scoped: p,
      name: r,
      keyframes: this.keyframes,
      selector: void 0
    }, o), g = r;
    r in this.raw && (g = r + "-d" + this.counter++), this.raw[g] = n, g in this.classes && (h.selector = "." + Ai(this.classes[g]));
    var m = ji(g, n, h);
    if (!m) return null;
    this.register(m);
    var v = h.index === void 0 ? this.index.length : h.index;
    return this.index.splice(v, 0, m), m;
  }, t.replace = function(r, n, o) {
    var i = this.get(r), s = this.index.indexOf(i);
    i && this.remove(i);
    var l = o;
    return s !== -1 && (l = se({}, o, {
      index: s
    })), this.add(r, n, l);
  }, t.get = function(r) {
    return this.map[r];
  }, t.remove = function(r) {
    this.unregister(r), delete this.raw[r.key], this.index.splice(this.index.indexOf(r), 1);
  }, t.indexOf = function(r) {
    return this.index.indexOf(r);
  }, t.process = function() {
    var r = this.options.jss.plugins;
    this.index.slice(0).forEach(r.onProcessRule, r);
  }, t.register = function(r) {
    this.map[r.key] = r, r instanceof ri ? (this.map[r.selector] = r, r.id && (this.classes[r.key] = r.id)) : r instanceof ni && this.keyframes && (this.keyframes[r.name] = r.id);
  }, t.unregister = function(r) {
    delete this.map[r.key], r instanceof ri ? (delete this.map[r.selector], delete this.classes[r.key]) : r instanceof ni && delete this.keyframes[r.name];
  }, t.update = function() {
    var r, n, o;
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) == "string" ? (r = arguments.length <= 0 ? void 0 : arguments[0], n = arguments.length <= 1 ? void 0 : arguments[1], o = arguments.length <= 2 ? void 0 : arguments[2]) : (n = arguments.length <= 0 ? void 0 : arguments[0], o = arguments.length <= 1 ? void 0 : arguments[1], r = null), r)
      this.updateOne(this.get(r), n, o);
    else
      for (var i = 0; i < this.index.length; i++)
        this.updateOne(this.index[i], n, o);
  }, t.updateOne = function(r, n, o) {
    o === void 0 && (o = hp);
    var i = this.options, s = i.jss.plugins, l = i.sheet;
    if (r.rules instanceof e) {
      r.rules.update(n, o);
      return;
    }
    var u = r.style;
    if (s.onUpdate(n, r, l, o), o.process && u && u !== r.style) {
      s.onProcessStyle(r.style, r, l);
      for (var c in r.style) {
        var d = r.style[c], p = u[c];
        d !== p && r.prop(c, d, As);
      }
      for (var h in u) {
        var g = r.style[h], m = u[h];
        g == null && g !== m && r.prop(h, null, As);
      }
    }
  }, t.toString = function(r) {
    for (var n = "", o = this.options.sheet, i = o ? o.options.link : !1, s = yn(r), l = s.linebreak, u = 0; u < this.index.length; u++) {
      var c = this.index[u], d = c.toString(r);
      !d && !i || (n && (n += l), n += d);
    }
    return n;
  }, e;
})(), ac = /* @__PURE__ */ (function() {
  function e(a, r) {
    this.attached = !1, this.deployed = !1, this.classes = {}, this.keyframes = {}, this.options = se({}, r, {
      sheet: this,
      parent: this,
      classes: this.classes,
      keyframes: this.keyframes
    }), r.Renderer && (this.renderer = new r.Renderer(this)), this.rules = new Da(this.options);
    for (var n in a)
      this.rules.add(n, a[n]);
    this.rules.process();
  }
  var t = e.prototype;
  return t.attach = function() {
    return this.attached ? this : (this.renderer && this.renderer.attach(), this.attached = !0, this.deployed || this.deploy(), this);
  }, t.detach = function() {
    return this.attached ? (this.renderer && this.renderer.detach(), this.attached = !1, this) : this;
  }, t.addRule = function(r, n, o) {
    var i = this.queue;
    this.attached && !i && (this.queue = []);
    var s = this.rules.add(r, n, o);
    return s ? (this.options.jss.plugins.onProcessRule(s), this.attached ? (this.deployed && (i ? i.push(s) : (this.insertRule(s), this.queue && (this.queue.forEach(this.insertRule, this), this.queue = void 0))), s) : (this.deployed = !1, s)) : null;
  }, t.replaceRule = function(r, n, o) {
    var i = this.rules.get(r);
    if (!i) return this.addRule(r, n, o);
    var s = this.rules.replace(r, n, o);
    return s && this.options.jss.plugins.onProcessRule(s), this.attached ? (this.deployed && this.renderer && (s ? i.renderable && this.renderer.replaceRule(i.renderable, s) : this.renderer.deleteRule(i)), s) : (this.deployed = !1, s);
  }, t.insertRule = function(r) {
    this.renderer && this.renderer.insertRule(r);
  }, t.addRules = function(r, n) {
    var o = [];
    for (var i in r) {
      var s = this.addRule(i, r[i], n);
      s && o.push(s);
    }
    return o;
  }, t.getRule = function(r) {
    return this.rules.get(r);
  }, t.deleteRule = function(r) {
    var n = typeof r == "object" ? r : this.rules.get(r);
    return !n || // Style sheet was created without link: true and attached, in this case we
    // won't be able to remove the CSS rule from the DOM.
    this.attached && !n.renderable ? !1 : (this.rules.remove(n), this.attached && n.renderable && this.renderer ? this.renderer.deleteRule(n.renderable) : !0);
  }, t.indexOf = function(r) {
    return this.rules.indexOf(r);
  }, t.deploy = function() {
    return this.renderer && this.renderer.deploy(), this.deployed = !0, this;
  }, t.update = function() {
    var r;
    return (r = this.rules).update.apply(r, arguments), this;
  }, t.updateOne = function(r, n, o) {
    return this.rules.updateOne(r, n, o), this;
  }, t.toString = function(r) {
    return this.rules.toString(r);
  }, e;
})(), mp = /* @__PURE__ */ (function() {
  function e() {
    this.plugins = {
      internal: [],
      external: []
    }, this.registry = {};
  }
  var t = e.prototype;
  return t.onCreateRule = function(r, n, o) {
    for (var i = 0; i < this.registry.onCreateRule.length; i++) {
      var s = this.registry.onCreateRule[i](r, n, o);
      if (s) return s;
    }
    return null;
  }, t.onProcessRule = function(r) {
    if (!r.isProcessed) {
      for (var n = r.options.sheet, o = 0; o < this.registry.onProcessRule.length; o++)
        this.registry.onProcessRule[o](r, n);
      r.style && this.onProcessStyle(r.style, r, n), r.isProcessed = !0;
    }
  }, t.onProcessStyle = function(r, n, o) {
    for (var i = 0; i < this.registry.onProcessStyle.length; i++)
      n.style = this.registry.onProcessStyle[i](n.style, n, o);
  }, t.onProcessSheet = function(r) {
    for (var n = 0; n < this.registry.onProcessSheet.length; n++)
      this.registry.onProcessSheet[n](r);
  }, t.onUpdate = function(r, n, o, i) {
    for (var s = 0; s < this.registry.onUpdate.length; s++)
      this.registry.onUpdate[s](r, n, o, i);
  }, t.onChangeValue = function(r, n, o) {
    for (var i = r, s = 0; s < this.registry.onChangeValue.length; s++)
      i = this.registry.onChangeValue[s](i, n, o);
    return i;
  }, t.use = function(r, n) {
    n === void 0 && (n = {
      queue: "external"
    });
    var o = this.plugins[n.queue];
    o.indexOf(r) === -1 && (o.push(r), this.registry = [].concat(this.plugins.external, this.plugins.internal).reduce(function(i, s) {
      for (var l in s)
        l in i && i[l].push(s[l]);
      return i;
    }, {
      onCreateRule: [],
      onProcessRule: [],
      onProcessStyle: [],
      onProcessSheet: [],
      onChangeValue: [],
      onUpdate: []
    }));
  }, e;
})(), gp = /* @__PURE__ */ (function() {
  function e() {
    this.registry = [];
  }
  var t = e.prototype;
  return t.add = function(r) {
    var n = this.registry, o = r.options.index;
    if (n.indexOf(r) === -1) {
      if (n.length === 0 || o >= this.index) {
        n.push(r);
        return;
      }
      for (var i = 0; i < n.length; i++)
        if (n[i].options.index > o) {
          n.splice(i, 0, r);
          return;
        }
    }
  }, t.reset = function() {
    this.registry = [];
  }, t.remove = function(r) {
    var n = this.registry.indexOf(r);
    this.registry.splice(n, 1);
  }, t.toString = function(r) {
    for (var n = r === void 0 ? {} : r, o = n.attached, i = Ia(n, ["attached"]), s = yn(i), l = s.linebreak, u = "", c = 0; c < this.registry.length; c++) {
      var d = this.registry[c];
      o != null && d.attached !== o || (u && (u += l), u += d.toString(i));
    }
    return u;
  }, rc(e, [{
    key: "index",
    /**
     * Current highest index number.
     */
    get: function() {
      return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
    }
  }]), e;
})(), Mn = new gp(), oi = typeof globalThis < "u" ? globalThis : typeof window < "u" && window.Math === Math ? window : typeof self < "u" && self.Math === Math ? self : Function("return this")(), ii = "2f1acc6c3a606b082e5eef5e54414ffb";
oi[ii] == null && (oi[ii] = 0);
var Ms = oi[ii]++, Is = function(t) {
  t === void 0 && (t = {});
  var a = 0, r = function(o, i) {
    a += 1;
    var s = "", l = "";
    return i && (i.options.classNamePrefix && (l = i.options.classNamePrefix), i.options.jss.id != null && (s = String(i.options.jss.id))), t.minify ? "" + (l || "c") + Ms + s + a : l + o.key + "-" + Ms + (s ? "-" + s : "") + "-" + a;
  };
  return r;
}, oc = function(t) {
  var a;
  return function() {
    return a || (a = t()), a;
  };
}, bp = function(t, a) {
  try {
    return t.attributeStyleMap ? t.attributeStyleMap.get(a) : t.style.getPropertyValue(a);
  } catch {
    return "";
  }
}, vp = function(t, a, r) {
  try {
    var n = r;
    if (Array.isArray(r) && (n = Mr(r)), t.attributeStyleMap)
      t.attributeStyleMap.set(a, n);
    else {
      var o = n ? n.indexOf("!important") : -1, i = o > -1 ? n.substr(0, o - 1) : n;
      t.style.setProperty(a, i, o > -1 ? "important" : "");
    }
  } catch {
    return !1;
  }
  return !0;
}, yp = function(t, a) {
  try {
    t.attributeStyleMap ? t.attributeStyleMap.delete(a) : t.style.removeProperty(a);
  } catch {
  }
}, xp = function(t, a) {
  return t.selectorText = a, t.selectorText === a;
}, ic = oc(function() {
  return document.querySelector("head");
});
function Sp(e, t) {
  for (var a = 0; a < e.length; a++) {
    var r = e[a];
    if (r.attached && r.options.index > t.index && r.options.insertionPoint === t.insertionPoint)
      return r;
  }
  return null;
}
function wp(e, t) {
  for (var a = e.length - 1; a >= 0; a--) {
    var r = e[a];
    if (r.attached && r.options.insertionPoint === t.insertionPoint)
      return r;
  }
  return null;
}
function Cp(e) {
  for (var t = ic(), a = 0; a < t.childNodes.length; a++) {
    var r = t.childNodes[a];
    if (r.nodeType === 8 && r.nodeValue.trim() === e)
      return r;
  }
  return null;
}
function Ep(e) {
  var t = Mn.registry;
  if (t.length > 0) {
    var a = Sp(t, e);
    if (a && a.renderer)
      return {
        parent: a.renderer.element.parentNode,
        node: a.renderer.element
      };
    if (a = wp(t, e), a && a.renderer)
      return {
        parent: a.renderer.element.parentNode,
        node: a.renderer.element.nextSibling
      };
  }
  var r = e.insertionPoint;
  if (r && typeof r == "string") {
    var n = Cp(r);
    if (n)
      return {
        parent: n.parentNode,
        node: n.nextSibling
      };
  }
  return !1;
}
function kp(e, t) {
  var a = t.insertionPoint, r = Ep(t);
  if (r !== !1 && r.parent) {
    r.parent.insertBefore(e, r.node);
    return;
  }
  if (a && typeof a.nodeType == "number") {
    var n = a, o = n.parentNode;
    o && o.insertBefore(e, n.nextSibling);
    return;
  }
  ic().appendChild(e);
}
var $p = oc(function() {
  var e = document.querySelector('meta[property="csp-nonce"]');
  return e ? e.getAttribute("content") : null;
}), Ls = function(t, a, r) {
  try {
    "insertRule" in t ? t.insertRule(a, r) : "appendRule" in t && t.appendRule(a);
  } catch {
    return !1;
  }
  return t.cssRules[r];
}, Ds = function(t, a) {
  var r = t.cssRules.length;
  return a === void 0 || a > r ? r : a;
}, Rp = function() {
  var t = document.createElement("style");
  return t.textContent = `
`, t;
}, Tp = /* @__PURE__ */ (function() {
  function e(a) {
    this.getPropertyValue = bp, this.setProperty = vp, this.removeProperty = yp, this.setSelector = xp, this.hasInsertedRules = !1, this.cssRules = [], a && Mn.add(a), this.sheet = a;
    var r = this.sheet ? this.sheet.options : {}, n = r.media, o = r.meta, i = r.element;
    this.element = i || Rp(), this.element.setAttribute("data-jss", ""), n && this.element.setAttribute("media", n), o && this.element.setAttribute("data-meta", o);
    var s = $p();
    s && this.element.setAttribute("nonce", s);
  }
  var t = e.prototype;
  return t.attach = function() {
    if (!(this.element.parentNode || !this.sheet)) {
      kp(this.element, this.sheet.options);
      var r = !!(this.sheet && this.sheet.deployed);
      this.hasInsertedRules && r && (this.hasInsertedRules = !1, this.deploy());
    }
  }, t.detach = function() {
    if (this.sheet) {
      var r = this.element.parentNode;
      r && r.removeChild(this.element), this.sheet.options.link && (this.cssRules = [], this.element.textContent = `
`);
    }
  }, t.deploy = function() {
    var r = this.sheet;
    if (r) {
      if (r.options.link) {
        this.insertRules(r.rules);
        return;
      }
      this.element.textContent = `
` + r.toString() + `
`;
    }
  }, t.insertRules = function(r, n) {
    for (var o = 0; o < r.index.length; o++)
      this.insertRule(r.index[o], o, n);
  }, t.insertRule = function(r, n, o) {
    if (o === void 0 && (o = this.element.sheet), r.rules) {
      var i = r, s = o;
      if (r.type === "conditional" || r.type === "keyframes") {
        var l = Ds(o, n);
        if (s = Ls(o, i.toString({
          children: !1
        }), l), s === !1)
          return !1;
        this.refCssRule(r, l, s);
      }
      return this.insertRules(i.rules, s), s;
    }
    var u = r.toString();
    if (!u) return !1;
    var c = Ds(o, n), d = Ls(o, u, c);
    return d === !1 ? !1 : (this.hasInsertedRules = !0, this.refCssRule(r, c, d), d);
  }, t.refCssRule = function(r, n, o) {
    r.renderable = o, r.options.parent instanceof ac && this.cssRules.splice(n, 0, o);
  }, t.deleteRule = function(r) {
    var n = this.element.sheet, o = this.indexOf(r);
    return o === -1 ? !1 : (n.deleteRule(o), this.cssRules.splice(o, 1), !0);
  }, t.indexOf = function(r) {
    return this.cssRules.indexOf(r);
  }, t.replaceRule = function(r, n) {
    var o = this.indexOf(r);
    return o === -1 ? !1 : (this.element.sheet.deleteRule(o), this.cssRules.splice(o, 1), this.insertRule(n, o));
  }, t.getRules = function() {
    return this.element.sheet.cssRules;
  }, e;
})(), Op = 0, _p = /* @__PURE__ */ (function() {
  function e(a) {
    this.id = Op++, this.version = "10.10.0", this.plugins = new mp(), this.options = {
      id: {
        minify: !1
      },
      createGenerateId: Is,
      Renderer: qn ? Tp : null,
      plugins: []
    }, this.generateId = Is({
      minify: !1
    });
    for (var r = 0; r < js.length; r++)
      this.plugins.use(js[r], {
        queue: "internal"
      });
    this.setup(a);
  }
  var t = e.prototype;
  return t.setup = function(r) {
    return r === void 0 && (r = {}), r.createGenerateId && (this.options.createGenerateId = r.createGenerateId), r.id && (this.options.id = se({}, this.options.id, r.id)), (r.createGenerateId || r.id) && (this.generateId = this.options.createGenerateId(this.options.id)), r.insertionPoint != null && (this.options.insertionPoint = r.insertionPoint), "Renderer" in r && (this.options.Renderer = r.Renderer), r.plugins && this.use.apply(this, r.plugins), this;
  }, t.createStyleSheet = function(r, n) {
    n === void 0 && (n = {});
    var o = n, i = o.index;
    typeof i != "number" && (i = Mn.index === 0 ? 0 : Mn.index + 1);
    var s = new ac(r, se({}, n, {
      jss: this,
      generateId: n.generateId || this.generateId,
      insertionPoint: this.options.insertionPoint,
      Renderer: this.options.Renderer,
      index: i
    }));
    return this.plugins.onProcessSheet(s), s;
  }, t.removeStyleSheet = function(r) {
    return r.detach(), Mn.remove(r), this;
  }, t.createRule = function(r, n, o) {
    if (n === void 0 && (n = {}), o === void 0 && (o = {}), typeof r == "object")
      return this.createRule(void 0, r, n);
    var i = se({}, o, {
      name: r,
      jss: this,
      Renderer: this.options.Renderer
    });
    i.generateId || (i.generateId = this.generateId), i.classes || (i.classes = {}), i.keyframes || (i.keyframes = {});
    var s = ji(r, n, i);
    return s && this.plugins.onProcessRule(s), s;
  }, t.use = function() {
    for (var r = this, n = arguments.length, o = new Array(n), i = 0; i < n; i++)
      o[i] = arguments[i];
    return o.forEach(function(s) {
      r.plugins.use(s);
    }), this;
  }, e;
})(), sc = function(t) {
  return new _p(t);
}, Mi = typeof CSS == "object" && CSS != null && "number" in CSS;
function lc(e) {
  var t = null;
  for (var a in e) {
    var r = e[a], n = typeof r;
    if (n === "function")
      t || (t = {}), t[a] = r;
    else if (n === "object" && r !== null && !Array.isArray(r)) {
      var o = lc(r);
      o && (t || (t = {}), t[a] = o);
    }
  }
  return t;
}
/**
 * A better abstraction over CSS.
 *
 * @copyright Oleg Isonen (Slobodskoi) / Isonen 2014-present
 * @website https://github.com/cssinjs/jss
 * @license MIT
 */
sc();
var cc = Date.now(), Ro = "fnValues" + cc, To = "fnStyle" + ++cc, Pp = function() {
  return {
    onCreateRule: function(a, r, n) {
      if (typeof r != "function") return null;
      var o = ji(a, {}, n);
      return o[To] = r, o;
    },
    onProcessStyle: function(a, r) {
      if (Ro in r || To in r) return a;
      var n = {};
      for (var o in a) {
        var i = a[o];
        typeof i == "function" && (delete a[o], n[o] = i);
      }
      return r[Ro] = n, a;
    },
    onUpdate: function(a, r, n, o) {
      var i = r, s = i[To];
      s && (i.style = s(a) || {});
      var l = i[Ro];
      if (l)
        for (var u in l)
          i.prop(u, l[u](a), o);
    }
  };
}, br = "@global", si = "@global ", jp = /* @__PURE__ */ (function() {
  function e(a, r, n) {
    this.type = "global", this.at = br, this.isProcessed = !1, this.key = a, this.options = n, this.rules = new Da(se({}, n, {
      parent: this
    }));
    for (var o in r)
      this.rules.add(o, r[o]);
    this.rules.process();
  }
  var t = e.prototype;
  return t.getRule = function(r) {
    return this.rules.get(r);
  }, t.addRule = function(r, n, o) {
    var i = this.rules.add(r, n, o);
    return i && this.options.jss.plugins.onProcessRule(i), i;
  }, t.replaceRule = function(r, n, o) {
    var i = this.rules.replace(r, n, o);
    return i && this.options.jss.plugins.onProcessRule(i), i;
  }, t.indexOf = function(r) {
    return this.rules.indexOf(r);
  }, t.toString = function(r) {
    return this.rules.toString(r);
  }, e;
})(), Ap = /* @__PURE__ */ (function() {
  function e(a, r, n) {
    this.type = "global", this.at = br, this.isProcessed = !1, this.key = a, this.options = n;
    var o = a.substr(si.length);
    this.rule = n.jss.createRule(o, r, se({}, n, {
      parent: this
    }));
  }
  var t = e.prototype;
  return t.toString = function(r) {
    return this.rule ? this.rule.toString(r) : "";
  }, e;
})(), Mp = /\s*,\s*/g;
function uc(e, t) {
  for (var a = e.split(Mp), r = "", n = 0; n < a.length; n++)
    r += t + " " + a[n].trim(), a[n + 1] && (r += ", ");
  return r;
}
function Ip(e, t) {
  var a = e.options, r = e.style, n = r ? r[br] : null;
  if (n) {
    for (var o in n)
      t.addRule(o, n[o], se({}, a, {
        selector: uc(o, e.selector)
      }));
    delete r[br];
  }
}
function Lp(e, t) {
  var a = e.options, r = e.style;
  for (var n in r)
    if (!(n[0] !== "@" || n.substr(0, br.length) !== br)) {
      var o = uc(n.substr(br.length), e.selector);
      t.addRule(o, r[n], se({}, a, {
        selector: o
      })), delete r[n];
    }
}
function Dp() {
  function e(a, r, n) {
    if (!a) return null;
    if (a === br)
      return new jp(a, r, n);
    if (a[0] === "@" && a.substr(0, si.length) === si)
      return new Ap(a, r, n);
    var o = n.parent;
    return o && (o.type === "global" || o.options.parent && o.options.parent.type === "global") && (n.scoped = !1), !n.selector && n.scoped === !1 && (n.selector = a), null;
  }
  function t(a, r) {
    a.type !== "style" || !r || (Ip(a, r), Lp(a, r));
  }
  return {
    onCreateRule: e,
    onProcessRule: t
  };
}
var Ns = /\s*,\s*/g, Np = /&/g, Bp = /\$([\w-]+)/g;
function Fp() {
  function e(n, o) {
    return function(i, s) {
      var l = n.getRule(s) || o && o.getRule(s);
      return l ? l.selector : s;
    };
  }
  function t(n, o) {
    for (var i = o.split(Ns), s = n.split(Ns), l = "", u = 0; u < i.length; u++)
      for (var c = i[u], d = 0; d < s.length; d++) {
        var p = s[d];
        l && (l += ", "), l += p.indexOf("&") !== -1 ? p.replace(Np, c) : c + " " + p;
      }
    return l;
  }
  function a(n, o, i) {
    if (i) return se({}, i, {
      index: i.index + 1
    });
    var s = n.options.nestingLevel;
    s = s === void 0 ? 1 : s + 1;
    var l = se({}, n.options, {
      nestingLevel: s,
      index: o.indexOf(n) + 1
      // We don't need the parent name to be set options for chlid.
    });
    return delete l.name, l;
  }
  function r(n, o, i) {
    if (o.type !== "style") return n;
    var s = o, l = s.options.parent, u, c;
    for (var d in n) {
      var p = d.indexOf("&") !== -1, h = d[0] === "@";
      if (!(!p && !h)) {
        if (u = a(s, l, u), p) {
          var g = t(d, s.selector);
          c || (c = e(l, i)), g = g.replace(Bp, c);
          var m = s.key + "-" + d;
          "replaceRule" in l ? l.replaceRule(m, n[d], se({}, u, {
            selector: g
          })) : l.addRule(m, n[d], se({}, u, {
            selector: g
          }));
        } else h && l.addRule(d, {}, u).addRule(s.key, n[d], {
          selector: s.selector
        });
        delete n[d];
      }
    }
    return n;
  }
  return {
    onProcessStyle: r
  };
}
var zp = /[A-Z]/g, Wp = /^ms-/, Oo = {};
function Vp(e) {
  return "-" + e.toLowerCase();
}
function dc(e) {
  if (Oo.hasOwnProperty(e))
    return Oo[e];
  var t = e.replace(zp, Vp);
  return Oo[e] = Wp.test(t) ? "-" + t : t;
}
function $a(e) {
  var t = {};
  for (var a in e) {
    var r = a.indexOf("--") === 0 ? a : dc(a);
    t[r] = e[a];
  }
  return e.fallbacks && (Array.isArray(e.fallbacks) ? t.fallbacks = e.fallbacks.map($a) : t.fallbacks = $a(e.fallbacks)), t;
}
function Hp() {
  function e(a) {
    if (Array.isArray(a)) {
      for (var r = 0; r < a.length; r++)
        a[r] = $a(a[r]);
      return a;
    }
    return $a(a);
  }
  function t(a, r, n) {
    if (r.indexOf("--") === 0)
      return a;
    var o = dc(r);
    return r === o ? a : (n.prop(o, a), null);
  }
  return {
    onProcessStyle: e,
    onChangeValue: t
  };
}
var te = Mi && CSS ? CSS.px : "px", ia = Mi && CSS ? CSS.ms : "ms", Jr = Mi && CSS ? CSS.percent : "%", Kp = {
  // Animation properties
  "animation-delay": ia,
  "animation-duration": ia,
  // Background properties
  "background-position": te,
  "background-position-x": te,
  "background-position-y": te,
  "background-size": te,
  // Border Properties
  border: te,
  "border-bottom": te,
  "border-bottom-left-radius": te,
  "border-bottom-right-radius": te,
  "border-bottom-width": te,
  "border-left": te,
  "border-left-width": te,
  "border-radius": te,
  "border-right": te,
  "border-right-width": te,
  "border-top": te,
  "border-top-left-radius": te,
  "border-top-right-radius": te,
  "border-top-width": te,
  "border-width": te,
  "border-block": te,
  "border-block-end": te,
  "border-block-end-width": te,
  "border-block-start": te,
  "border-block-start-width": te,
  "border-block-width": te,
  "border-inline": te,
  "border-inline-end": te,
  "border-inline-end-width": te,
  "border-inline-start": te,
  "border-inline-start-width": te,
  "border-inline-width": te,
  "border-start-start-radius": te,
  "border-start-end-radius": te,
  "border-end-start-radius": te,
  "border-end-end-radius": te,
  // Margin properties
  margin: te,
  "margin-bottom": te,
  "margin-left": te,
  "margin-right": te,
  "margin-top": te,
  "margin-block": te,
  "margin-block-end": te,
  "margin-block-start": te,
  "margin-inline": te,
  "margin-inline-end": te,
  "margin-inline-start": te,
  // Padding properties
  padding: te,
  "padding-bottom": te,
  "padding-left": te,
  "padding-right": te,
  "padding-top": te,
  "padding-block": te,
  "padding-block-end": te,
  "padding-block-start": te,
  "padding-inline": te,
  "padding-inline-end": te,
  "padding-inline-start": te,
  // Mask properties
  "mask-position-x": te,
  "mask-position-y": te,
  "mask-size": te,
  // Width and height properties
  height: te,
  width: te,
  "min-height": te,
  "max-height": te,
  "min-width": te,
  "max-width": te,
  // Position properties
  bottom: te,
  left: te,
  top: te,
  right: te,
  inset: te,
  "inset-block": te,
  "inset-block-end": te,
  "inset-block-start": te,
  "inset-inline": te,
  "inset-inline-end": te,
  "inset-inline-start": te,
  // Shadow properties
  "box-shadow": te,
  "text-shadow": te,
  // Column properties
  "column-gap": te,
  "column-rule": te,
  "column-rule-width": te,
  "column-width": te,
  // Font and text properties
  "font-size": te,
  "font-size-delta": te,
  "letter-spacing": te,
  "text-decoration-thickness": te,
  "text-indent": te,
  "text-stroke": te,
  "text-stroke-width": te,
  "word-spacing": te,
  // Motion properties
  motion: te,
  "motion-offset": te,
  // Outline properties
  outline: te,
  "outline-offset": te,
  "outline-width": te,
  // Perspective properties
  perspective: te,
  "perspective-origin-x": Jr,
  "perspective-origin-y": Jr,
  // Transform properties
  "transform-origin": Jr,
  "transform-origin-x": Jr,
  "transform-origin-y": Jr,
  "transform-origin-z": Jr,
  // Transition properties
  "transition-delay": ia,
  "transition-duration": ia,
  // Alignment properties
  "vertical-align": te,
  "flex-basis": te,
  // Some random properties
  "shape-margin": te,
  size: te,
  gap: te,
  // Grid properties
  grid: te,
  "grid-gap": te,
  "row-gap": te,
  "grid-row-gap": te,
  "grid-column-gap": te,
  "grid-template-rows": te,
  "grid-template-columns": te,
  "grid-auto-rows": te,
  "grid-auto-columns": te,
  // Not existing properties.
  // Used to avoid issues with jss-plugin-expand integration.
  "box-shadow-x": te,
  "box-shadow-y": te,
  "box-shadow-blur": te,
  "box-shadow-spread": te,
  "font-line-height": te,
  "text-shadow-x": te,
  "text-shadow-y": te,
  "text-shadow-blur": te
};
function fc(e) {
  var t = /(-[a-z])/g, a = function(i) {
    return i[1].toUpperCase();
  }, r = {};
  for (var n in e)
    r[n] = e[n], r[n.replace(t, a)] = e[n];
  return r;
}
var qp = fc(Kp);
function In(e, t, a) {
  if (t == null) return t;
  if (Array.isArray(t))
    for (var r = 0; r < t.length; r++)
      t[r] = In(e, t[r], a);
  else if (typeof t == "object")
    if (e === "fallbacks")
      for (var n in t)
        t[n] = In(n, t[n], a);
    else
      for (var o in t)
        t[o] = In(e + "-" + o, t[o], a);
  else if (typeof t == "number" && isNaN(t) === !1) {
    var i = a[e] || qp[e];
    return i && !(t === 0 && i === te) ? typeof i == "function" ? i(t).toString() : "" + t + i : t.toString();
  }
  return t;
}
function Up(e) {
  e === void 0 && (e = {});
  var t = fc(e);
  function a(n, o) {
    if (o.type !== "style") return n;
    for (var i in n)
      n[i] = In(i, n[i], t);
    return n;
  }
  function r(n, o) {
    return In(o, n, t);
  }
  return {
    onProcessStyle: a,
    onChangeValue: r
  };
}
var Tn = "", li = "", pc = "", hc = "", Gp = qn && "ontouchstart" in document.documentElement;
if (qn) {
  var _o = {
    Moz: "-moz-",
    ms: "-ms-",
    O: "-o-",
    Webkit: "-webkit-"
  }, Yp = document.createElement("p"), Po = Yp.style, Xp = "Transform";
  for (var jo in _o)
    if (jo + Xp in Po) {
      Tn = jo, li = _o[jo];
      break;
    }
  Tn === "Webkit" && "msHyphens" in Po && (Tn = "ms", li = _o.ms, hc = "edge"), Tn === "Webkit" && "-apple-trailing-word" in Po && (pc = "apple");
}
var Ae = {
  js: Tn,
  css: li,
  vendor: pc,
  browser: hc,
  isTouch: Gp
};
function Jp(e) {
  return e[1] === "-" || Ae.js === "ms" ? e : "@" + Ae.css + "keyframes" + e.substr(10);
}
var Zp = {
  noPrefill: ["appearance"],
  supportedProperty: function(t) {
    return t !== "appearance" ? !1 : Ae.js === "ms" ? "-webkit-" + t : Ae.css + t;
  }
}, Qp = {
  noPrefill: ["color-adjust"],
  supportedProperty: function(t) {
    return t !== "color-adjust" ? !1 : Ae.js === "Webkit" ? Ae.css + "print-" + t : t;
  }
}, eh = /[-\s]+(.)?/g;
function th(e, t) {
  return t ? t.toUpperCase() : "";
}
function Ii(e) {
  return e.replace(eh, th);
}
function yr(e) {
  return Ii("-" + e);
}
var rh = {
  noPrefill: ["mask"],
  supportedProperty: function(t, a) {
    if (!/^mask/.test(t)) return !1;
    if (Ae.js === "Webkit") {
      var r = "mask-image";
      if (Ii(r) in a)
        return t;
      if (Ae.js + yr(r) in a)
        return Ae.css + t;
    }
    return t;
  }
}, nh = {
  noPrefill: ["text-orientation"],
  supportedProperty: function(t) {
    return t !== "text-orientation" ? !1 : Ae.vendor === "apple" && !Ae.isTouch ? Ae.css + t : t;
  }
}, ah = {
  noPrefill: ["transform"],
  supportedProperty: function(t, a, r) {
    return t !== "transform" ? !1 : r.transform ? t : Ae.css + t;
  }
}, oh = {
  noPrefill: ["transition"],
  supportedProperty: function(t, a, r) {
    return t !== "transition" ? !1 : r.transition ? t : Ae.css + t;
  }
}, ih = {
  noPrefill: ["writing-mode"],
  supportedProperty: function(t) {
    return t !== "writing-mode" ? !1 : Ae.js === "Webkit" || Ae.js === "ms" && Ae.browser !== "edge" ? Ae.css + t : t;
  }
}, sh = {
  noPrefill: ["user-select"],
  supportedProperty: function(t) {
    return t !== "user-select" ? !1 : Ae.js === "Moz" || Ae.js === "ms" || Ae.vendor === "apple" ? Ae.css + t : t;
  }
}, lh = {
  supportedProperty: function(t, a) {
    if (!/^break-/.test(t)) return !1;
    if (Ae.js === "Webkit") {
      var r = "WebkitColumn" + yr(t);
      return r in a ? Ae.css + "column-" + t : !1;
    }
    if (Ae.js === "Moz") {
      var n = "page" + yr(t);
      return n in a ? "page-" + t : !1;
    }
    return !1;
  }
}, ch = {
  supportedProperty: function(t, a) {
    if (!/^(border|margin|padding)-inline/.test(t)) return !1;
    if (Ae.js === "Moz") return t;
    var r = t.replace("-inline", "");
    return Ae.js + yr(r) in a ? Ae.css + r : !1;
  }
}, uh = {
  supportedProperty: function(t, a) {
    return Ii(t) in a ? t : !1;
  }
}, dh = {
  supportedProperty: function(t, a) {
    var r = yr(t);
    return t[0] === "-" || t[0] === "-" && t[1] === "-" ? t : Ae.js + r in a ? Ae.css + t : Ae.js !== "Webkit" && "Webkit" + r in a ? "-webkit-" + t : !1;
  }
}, fh = {
  supportedProperty: function(t) {
    return t.substring(0, 11) !== "scroll-snap" ? !1 : Ae.js === "ms" ? "" + Ae.css + t : t;
  }
}, ph = {
  supportedProperty: function(t) {
    return t !== "overscroll-behavior" ? !1 : Ae.js === "ms" ? Ae.css + "scroll-chaining" : t;
  }
}, hh = {
  "flex-grow": "flex-positive",
  "flex-shrink": "flex-negative",
  "flex-basis": "flex-preferred-size",
  "justify-content": "flex-pack",
  order: "flex-order",
  "align-items": "flex-align",
  "align-content": "flex-line-pack"
  // 'align-self' is handled by 'align-self' plugin.
}, mh = {
  supportedProperty: function(t, a) {
    var r = hh[t];
    return r && Ae.js + yr(r) in a ? Ae.css + r : !1;
  }
}, mc = {
  flex: "box-flex",
  "flex-grow": "box-flex",
  "flex-direction": ["box-orient", "box-direction"],
  order: "box-ordinal-group",
  "align-items": "box-align",
  "flex-flow": ["box-orient", "box-direction"],
  "justify-content": "box-pack"
}, gh = Object.keys(mc), bh = function(t) {
  return Ae.css + t;
}, vh = {
  supportedProperty: function(t, a, r) {
    var n = r.multiple;
    if (gh.indexOf(t) > -1) {
      var o = mc[t];
      if (!Array.isArray(o))
        return Ae.js + yr(o) in a ? Ae.css + o : !1;
      if (!n) return !1;
      for (var i = 0; i < o.length; i++)
        if (!(Ae.js + yr(o[0]) in a))
          return !1;
      return o.map(bh);
    }
    return !1;
  }
}, gc = [Zp, Qp, rh, nh, ah, oh, ih, sh, lh, ch, uh, dh, fh, ph, mh, vh], Bs = gc.filter(function(e) {
  return e.supportedProperty;
}).map(function(e) {
  return e.supportedProperty;
}), yh = gc.filter(function(e) {
  return e.noPrefill;
}).reduce(function(e, t) {
  return e.push.apply(e, _i(t.noPrefill)), e;
}, []), On, Pr = {};
if (qn) {
  On = document.createElement("p");
  var Ao = window.getComputedStyle(document.documentElement, "");
  for (var Mo in Ao)
    isNaN(Mo) || (Pr[Ao[Mo]] = Ao[Mo]);
  yh.forEach(function(e) {
    return delete Pr[e];
  });
}
function ci(e, t) {
  if (t === void 0 && (t = {}), !On) return e;
  if (Pr[e] != null)
    return Pr[e];
  (e === "transition" || e === "transform") && (t[e] = e in On.style);
  for (var a = 0; a < Bs.length && (Pr[e] = Bs[a](e, On.style, t), !Pr[e]); a++)
    ;
  try {
    On.style[e] = "";
  } catch {
    return !1;
  }
  return Pr[e];
}
var Zr = {}, xh = {
  transition: 1,
  "transition-property": 1,
  "-webkit-transition": 1,
  "-webkit-transition-property": 1
}, Sh = /(^\s*[\w-]+)|, (\s*[\w-]+)(?![^()]*\))/g, mr;
function wh(e, t, a) {
  if (t === "var") return "var";
  if (t === "all") return "all";
  if (a === "all") return ", all";
  var r = t ? ci(t) : ", " + ci(a);
  return r || t || a;
}
qn && (mr = document.createElement("p"));
function Fs(e, t) {
  var a = t;
  if (!mr || e === "content") return t;
  if (typeof a != "string" || !isNaN(parseInt(a, 10)))
    return a;
  var r = e + a;
  if (Zr[r] != null)
    return Zr[r];
  try {
    mr.style[e] = a;
  } catch {
    return Zr[r] = !1, !1;
  }
  if (xh[e])
    a = a.replace(Sh, wh);
  else if (mr.style[e] === "" && (a = Ae.css + a, a === "-ms-flex" && (mr.style[e] = "-ms-flexbox"), mr.style[e] = a, mr.style[e] === ""))
    return Zr[r] = !1, !1;
  return mr.style[e] = "", Zr[r] = a, Zr[r];
}
function Ch() {
  function e(n) {
    if (n.type === "keyframes") {
      var o = n;
      o.at = Jp(o.at);
    }
  }
  function t(n) {
    for (var o in n) {
      var i = n[o];
      if (o === "fallbacks" && Array.isArray(i)) {
        n[o] = i.map(t);
        continue;
      }
      var s = !1, l = ci(o);
      l && l !== o && (s = !0);
      var u = !1, c = Fs(l, Mr(i));
      c && c !== i && (u = !0), (s || u) && (s && delete n[o], n[l || o] = c || i);
    }
    return n;
  }
  function a(n, o) {
    return o.type !== "style" ? n : t(n);
  }
  function r(n, o) {
    return Fs(o, Mr(n)) || n;
  }
  return {
    onProcessRule: e,
    onProcessStyle: a,
    onChangeValue: r
  };
}
function Eh() {
  var e = function(a, r) {
    return a.length === r.length ? a > r ? 1 : -1 : a.length - r.length;
  };
  return {
    onProcessStyle: function(a, r) {
      if (r.type !== "style") return a;
      for (var n = {}, o = Object.keys(a).sort(e), i = 0; i < o.length; i++)
        n[o[i]] = a[o[i]];
      return n;
    }
  };
}
function kh() {
  return {
    plugins: [
      Pp(),
      Dp(),
      Fp(),
      Hp(),
      Up(),
      // Disable the vendor prefixer server-side, it does nothing.
      // This way, we can get a performance boost.
      // In the documentation, we are using `autoprefixer` to solve this problem.
      typeof window > "u" ? null : Ch(),
      Eh()
    ]
  };
}
function bc() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.baseClasses, a = e.newClasses;
  if (e.Component, !a)
    return t;
  var r = se({}, t);
  return Object.keys(a).forEach(function(n) {
    a[n] && (r[n] = "".concat(t[n], " ").concat(a[n]));
  }), r;
}
var ln = {
  set: function(t, a, r, n) {
    var o = t.get(a);
    o || (o = /* @__PURE__ */ new Map(), t.set(a, o)), o.set(r, n);
  },
  get: function(t, a, r) {
    var n = t.get(a);
    return n ? n.get(r) : void 0;
  },
  delete: function(t, a, r) {
    var n = t.get(a);
    n.delete(r);
  }
}, $h = st.createContext(null);
function Na() {
  var e = st.useContext($h);
  return e;
}
var Rh = sc(kh()), Th = Hf(), Oh = /* @__PURE__ */ new Map(), _h = {
  disableGeneration: !1,
  generateClassName: Th,
  jss: Rh,
  sheetsCache: null,
  sheetsManager: Oh,
  sheetsRegistry: null
}, Ph = st.createContext(_h), zs = -1e9;
function jh() {
  return zs += 1, zs;
}
var Ah = {};
function Mh(e) {
  var t = typeof e == "function";
  return {
    create: function(r, n) {
      var o;
      try {
        o = t ? e(r) : e;
      } catch (l) {
        throw l;
      }
      if (!n || !r.overrides || !r.overrides[n])
        return o;
      var i = r.overrides[n], s = se({}, o);
      return Object.keys(i).forEach(function(l) {
        s[l] = vr(s[l], i[l]);
      }), s;
    },
    options: {}
  };
}
function Ih(e, t, a) {
  var r = e.state, n = e.stylesOptions;
  if (n.disableGeneration)
    return t || {};
  r.cacheClasses || (r.cacheClasses = {
    // Cache for the finalized classes value.
    value: null,
    // Cache for the last used classes prop pointer.
    lastProp: null,
    // Cache for the last used rendered classes pointer.
    lastJSS: {}
  });
  var o = !1;
  return r.classes !== r.cacheClasses.lastJSS && (r.cacheClasses.lastJSS = r.classes, o = !0), t !== r.cacheClasses.lastProp && (r.cacheClasses.lastProp = t, o = !0), o && (r.cacheClasses.value = bc({
    baseClasses: r.cacheClasses.lastJSS,
    newClasses: t,
    Component: a
  })), r.cacheClasses.value;
}
function Lh(e, t) {
  var a = e.state, r = e.theme, n = e.stylesOptions, o = e.stylesCreator, i = e.name;
  if (!n.disableGeneration) {
    var s = ln.get(n.sheetsManager, o, r);
    s || (s = {
      refs: 0,
      staticSheet: null,
      dynamicStyles: null
    }, ln.set(n.sheetsManager, o, r, s));
    var l = se({}, o.options, n, {
      theme: r,
      flip: typeof n.flip == "boolean" ? n.flip : r.direction === "rtl"
    });
    l.generateId = l.serverGenerateClassName || l.generateClassName;
    var u = n.sheetsRegistry;
    if (s.refs === 0) {
      var c;
      n.sheetsCache && (c = ln.get(n.sheetsCache, o, r));
      var d = o.create(r, i);
      c || (c = n.jss.createStyleSheet(d, se({
        link: !1
      }, l)), c.attach(), n.sheetsCache && ln.set(n.sheetsCache, o, r, c)), u && u.add(c), s.staticSheet = c, s.dynamicStyles = lc(d);
    }
    if (s.dynamicStyles) {
      var p = n.jss.createStyleSheet(s.dynamicStyles, se({
        link: !0
      }, l));
      p.update(t), p.attach(), a.dynamicSheet = p, a.classes = bc({
        baseClasses: s.staticSheet.classes,
        newClasses: p.classes
      }), u && u.add(p);
    } else
      a.classes = s.staticSheet.classes;
    s.refs += 1;
  }
}
function Dh(e, t) {
  var a = e.state;
  a.dynamicSheet && a.dynamicSheet.update(t);
}
function Nh(e) {
  var t = e.state, a = e.theme, r = e.stylesOptions, n = e.stylesCreator;
  if (!r.disableGeneration) {
    var o = ln.get(r.sheetsManager, n, a);
    o.refs -= 1;
    var i = r.sheetsRegistry;
    o.refs === 0 && (ln.delete(r.sheetsManager, n, a), r.jss.removeStyleSheet(o.staticSheet), i && i.remove(o.staticSheet)), t.dynamicSheet && (r.jss.removeStyleSheet(t.dynamicSheet), i && i.remove(t.dynamicSheet));
  }
}
function Bh(e, t) {
  var a = st.useRef([]), r, n = st.useMemo(function() {
    return {};
  }, t);
  a.current !== n && (a.current = n, r = e()), st.useEffect(
    function() {
      return function() {
        r && r();
      };
    },
    [n]
    // eslint-disable-line react-hooks/exhaustive-deps
  );
}
function Li(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = t.name, r = t.classNamePrefix, n = t.Component, o = t.defaultTheme, i = o === void 0 ? Ah : o, s = Ve(t, ["name", "classNamePrefix", "Component", "defaultTheme"]), l = Mh(e), u = a || r || "makeStyles";
  l.options = {
    index: jh(),
    name: a,
    meta: u,
    classNamePrefix: u
  };
  var c = function() {
    var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, h = Na() || i, g = se({}, st.useContext(Ph), s), m = st.useRef(), v = st.useRef();
    Bh(function() {
      var T = {
        name: a,
        state: {},
        stylesCreator: l,
        stylesOptions: g,
        theme: h
      };
      return Lh(T, p), v.current = !1, m.current = T, function() {
        Nh(T);
      };
    }, [h, l]), st.useEffect(function() {
      v.current && Dh(m.current, p), v.current = !0;
    });
    var C = Ih(m.current, p.classes, n);
    return C;
  };
  return c;
}
function vc(e) {
  var t, a, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (a = vc(e[t])) && (r && (r += " "), r += a);
  else for (t in e) e[t] && (r && (r += " "), r += t);
  return r;
}
function ge() {
  for (var e, t, a = 0, r = ""; a < arguments.length; ) (e = arguments[a++]) && (t = vc(e)) && (r && (r += " "), r += t);
  return r;
}
var Io = { exports: {} }, at = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ws;
function Fh() {
  if (Ws) return at;
  Ws = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, a = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, n = e ? Symbol.for("react.strict_mode") : 60108, o = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, c = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, g = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, C = e ? Symbol.for("react.responder") : 60118, T = e ? Symbol.for("react.scope") : 60119;
  function A(x) {
    if (typeof x == "object" && x !== null) {
      var k = x.$$typeof;
      switch (k) {
        case t:
          switch (x = x.type, x) {
            case l:
            case u:
            case r:
            case o:
            case n:
            case d:
              return x;
            default:
              switch (x = x && x.$$typeof, x) {
                case s:
                case c:
                case g:
                case h:
                case i:
                  return x;
                default:
                  return k;
              }
          }
        case a:
          return k;
      }
    }
  }
  function f(x) {
    return A(x) === u;
  }
  return at.AsyncMode = l, at.ConcurrentMode = u, at.ContextConsumer = s, at.ContextProvider = i, at.Element = t, at.ForwardRef = c, at.Fragment = r, at.Lazy = g, at.Memo = h, at.Portal = a, at.Profiler = o, at.StrictMode = n, at.Suspense = d, at.isAsyncMode = function(x) {
    return f(x) || A(x) === l;
  }, at.isConcurrentMode = f, at.isContextConsumer = function(x) {
    return A(x) === s;
  }, at.isContextProvider = function(x) {
    return A(x) === i;
  }, at.isElement = function(x) {
    return typeof x == "object" && x !== null && x.$$typeof === t;
  }, at.isForwardRef = function(x) {
    return A(x) === c;
  }, at.isFragment = function(x) {
    return A(x) === r;
  }, at.isLazy = function(x) {
    return A(x) === g;
  }, at.isMemo = function(x) {
    return A(x) === h;
  }, at.isPortal = function(x) {
    return A(x) === a;
  }, at.isProfiler = function(x) {
    return A(x) === o;
  }, at.isStrictMode = function(x) {
    return A(x) === n;
  }, at.isSuspense = function(x) {
    return A(x) === d;
  }, at.isValidElementType = function(x) {
    return typeof x == "string" || typeof x == "function" || x === r || x === u || x === o || x === n || x === d || x === p || typeof x == "object" && x !== null && (x.$$typeof === g || x.$$typeof === h || x.$$typeof === i || x.$$typeof === s || x.$$typeof === c || x.$$typeof === v || x.$$typeof === C || x.$$typeof === T || x.$$typeof === m);
  }, at.typeOf = A, at;
}
var Vs;
function zh() {
  return Vs || (Vs = 1, Io.exports = Fh()), Io.exports;
}
var Lo, Hs;
function Wh() {
  if (Hs) return Lo;
  Hs = 1;
  var e = zh(), t = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0
  }, a = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  }, r = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  }, n = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  }, o = {};
  o[e.ForwardRef] = r, o[e.Memo] = n;
  function i(g) {
    return e.isMemo(g) ? n : o[g.$$typeof] || t;
  }
  var s = Object.defineProperty, l = Object.getOwnPropertyNames, u = Object.getOwnPropertySymbols, c = Object.getOwnPropertyDescriptor, d = Object.getPrototypeOf, p = Object.prototype;
  function h(g, m, v) {
    if (typeof m != "string") {
      if (p) {
        var C = d(m);
        C && C !== p && h(g, C, v);
      }
      var T = l(m);
      u && (T = T.concat(u(m)));
      for (var A = i(g), f = i(m), x = 0; x < T.length; ++x) {
        var k = T[x];
        if (!a[k] && !(v && v[k]) && !(f && f[k]) && !(A && A[k])) {
          var D = c(m, k);
          try {
            s(g, k, D);
          } catch {
          }
        }
      }
    }
    return g;
  }
  return Lo = h, Lo;
}
var Vh = Wh();
const yc = /* @__PURE__ */ wr(Vh);
function Hh(e, t) {
  var a = {};
  return Object.keys(e).forEach(function(r) {
    t.indexOf(r) === -1 && (a[r] = e[r]);
  }), a;
}
function Kh(e) {
  var t = function(r) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = n.name, i = Ve(n, ["name"]), s = o, l = typeof r == "function" ? function(p) {
      return {
        root: function(g) {
          return r(se({
            theme: p
          }, g));
        }
      };
    } : {
      root: r
    }, u = Li(l, se({
      Component: e,
      name: o || e.displayName,
      classNamePrefix: s
    }, i)), c;
    r.filterProps && (c = r.filterProps, delete r.filterProps), r.propTypes && (r.propTypes, delete r.propTypes);
    var d = /* @__PURE__ */ st.forwardRef(function(h, g) {
      var m = h.children, v = h.className, C = h.clone, T = h.component, A = Ve(h, ["children", "className", "clone", "component"]), f = u(h), x = ge(f.root, v), k = A;
      if (c && (k = Hh(k, c)), C)
        return /* @__PURE__ */ st.cloneElement(m, se({
          className: ge(m.props.className, x)
        }, k));
      if (typeof m == "function")
        return m(se({
          className: x
        }, k));
      var D = T || e;
      return /* @__PURE__ */ st.createElement(D, se({
        ref: g,
        className: x
      }, k), m);
    });
    return yc(d, e), d;
  };
  return t;
}
var qh = function(t) {
  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return function(r) {
    var n = a.defaultTheme, o = a.withTheme, i = o === void 0 ? !1 : o, s = a.name, l = Ve(a, ["defaultTheme", "withTheme", "name"]), u = s, c = Li(t, se({
      defaultTheme: n,
      Component: r,
      name: s || r.displayName,
      classNamePrefix: u
    }, l)), d = /* @__PURE__ */ st.forwardRef(function(h, g) {
      h.classes;
      var m = h.innerRef, v = Ve(h, ["classes", "innerRef"]), C = c(se({}, r.defaultProps, h)), T, A = v;
      return (typeof s == "string" || i) && (T = Na() || n, s && (A = Kf({
        theme: T,
        name: s,
        props: v
      })), i && !A.theme && (A.theme = T)), /* @__PURE__ */ st.createElement(r, se({
        ref: m || g,
        classes: C
      }, A));
    });
    return yc(d, r), d;
  };
};
function cr(e) {
  return e;
}
var Ba = Ff();
function tr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return Li(e, se({
    defaultTheme: Ba
  }, t));
}
var Di = function(t) {
  var a = Kh(t);
  return function(r, n) {
    return a(r, se({
      defaultTheme: Ba
    }, n));
  };
};
function Fa() {
  var e = Na() || Ba;
  return e;
}
function St(e, t) {
  return qh(e, se({
    defaultTheme: Ba
  }, t));
}
function bt(e) {
  if (typeof e != "string")
    throw new Error(Dn(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ks() {
  for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
    t[a] = arguments[a];
  return t.reduce(function(r, n) {
    return n == null ? r : function() {
      for (var i = arguments.length, s = new Array(i), l = 0; l < i; l++)
        s[l] = arguments[l];
      r.apply(this, s), n.apply(this, s);
    };
  }, function() {
  });
}
var Uh = function(t) {
  return {
    /* Styles applied to the root element. */
    root: {
      userSelect: "none",
      width: "1em",
      height: "1em",
      display: "inline-block",
      fill: "currentColor",
      flexShrink: 0,
      fontSize: t.typography.pxToRem(24),
      transition: t.transitions.create("fill", {
        duration: t.transitions.duration.shorter
      })
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      color: t.palette.primary.main
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: t.palette.secondary.main
    },
    /* Styles applied to the root element if `color="action"`. */
    colorAction: {
      color: t.palette.action.active
    },
    /* Styles applied to the root element if `color="error"`. */
    colorError: {
      color: t.palette.error.main
    },
    /* Styles applied to the root element if `color="disabled"`. */
    colorDisabled: {
      color: t.palette.action.disabled
    },
    /* Styles applied to the root element if `fontSize="inherit"`. */
    fontSizeInherit: {
      fontSize: "inherit"
    },
    /* Styles applied to the root element if `fontSize="small"`. */
    fontSizeSmall: {
      fontSize: t.typography.pxToRem(20)
    },
    /* Styles applied to the root element if `fontSize="large"`. */
    fontSizeLarge: {
      fontSize: t.typography.pxToRem(35)
    }
  };
}, xc = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.children, n = t.classes, o = t.className, i = t.color, s = i === void 0 ? "inherit" : i, l = t.component, u = l === void 0 ? "svg" : l, c = t.fontSize, d = c === void 0 ? "medium" : c, p = t.htmlColor, h = t.titleAccess, g = t.viewBox, m = g === void 0 ? "0 0 24 24" : g, v = Ve(t, ["children", "classes", "className", "color", "component", "fontSize", "htmlColor", "titleAccess", "viewBox"]);
  return /* @__PURE__ */ _.createElement(u, se({
    className: ge(n.root, o, s !== "inherit" && n["color".concat(bt(s))], d !== "default" && d !== "medium" && n["fontSize".concat(bt(d))]),
    focusable: "false",
    viewBox: m,
    color: p,
    "aria-hidden": h ? void 0 : !0,
    role: h ? "img" : void 0,
    ref: a
  }, v), r, h ? /* @__PURE__ */ _.createElement("title", null, h) : null);
});
xc.muiName = "SvgIcon";
const qs = St(Uh, {
  name: "MuiSvgIcon"
})(xc);
function rr(e, t) {
  var a = function(n, o) {
    return /* @__PURE__ */ st.createElement(qs, se({
      ref: o
    }, n), e);
  };
  return a.muiName = qs.muiName, /* @__PURE__ */ st.memo(/* @__PURE__ */ st.forwardRef(a));
}
function Ra(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 166, a;
  function r() {
    for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++)
      o[i] = arguments[i];
    var s = this, l = function() {
      e.apply(s, o);
    };
    clearTimeout(a), a = setTimeout(l, t);
  }
  return r.clear = function() {
    clearTimeout(a);
  }, r;
}
function Gh(e) {
  return e && e.ownerDocument || document;
}
function Yh(e) {
  var t = Gh(e);
  return t.defaultView || window;
}
function fn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function Sc(e) {
  var t = e.controlled, a = e.default;
  e.name, e.state;
  var r = _.useRef(t !== void 0), n = r.current, o = _.useState(a), i = o[0], s = o[1], l = n ? t : i, u = _.useCallback(function(c) {
    n || s(c);
  }, []);
  return [l, u];
}
var Xh = typeof window < "u" ? _.useLayoutEffect : _.useEffect;
function gr(e) {
  var t = _.useRef(e);
  return Xh(function() {
    t.current = e;
  }), _.useCallback(function() {
    return t.current.apply(void 0, arguments);
  }, []);
}
function Tt(e, t) {
  return _.useMemo(function() {
    return e == null && t == null ? null : function(a) {
      fn(e, a), fn(t, a);
    };
  }, [e, t]);
}
function Jh(e) {
  var t = _.useState(e), a = t[0], r = t[1], n = e || a;
  return _.useEffect(function() {
    a == null && r("mui-".concat(Math.round(Math.random() * 1e5)));
  }, [a]), n;
}
var za = !0, ui = !1, Us = null, Zh = {
  text: !0,
  search: !0,
  url: !0,
  tel: !0,
  email: !0,
  password: !0,
  number: !0,
  date: !0,
  month: !0,
  week: !0,
  time: !0,
  datetime: !0,
  "datetime-local": !0
};
function Qh(e) {
  var t = e.type, a = e.tagName;
  return !!(a === "INPUT" && Zh[t] && !e.readOnly || a === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function em(e) {
  e.metaKey || e.altKey || e.ctrlKey || (za = !0);
}
function Do() {
  za = !1;
}
function tm() {
  this.visibilityState === "hidden" && ui && (za = !0);
}
function rm(e) {
  e.addEventListener("keydown", em, !0), e.addEventListener("mousedown", Do, !0), e.addEventListener("pointerdown", Do, !0), e.addEventListener("touchstart", Do, !0), e.addEventListener("visibilitychange", tm, !0);
}
function nm(e) {
  var t = e.target;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return za || Qh(t);
}
function am() {
  ui = !0, window.clearTimeout(Us), Us = window.setTimeout(function() {
    ui = !1;
  }, 100);
}
function Ni() {
  var e = _.useCallback(function(t) {
    var a = Vn.findDOMNode(t);
    a != null && rm(a.ownerDocument);
  }, []);
  return {
    isFocusVisible: nm,
    onBlurVisible: am,
    ref: e
  };
}
function om(e) {
  return Zl(e) || Xl(e) || Oi(e) || Ql();
}
const Gs = {
  disabled: !1
}, Ta = st.createContext(null);
var im = function(t) {
  return t.scrollTop;
}, _n = "unmounted", Or = "exited", _r = "entering", sn = "entered", di = "exiting", nr = /* @__PURE__ */ (function(e) {
  La(t, e);
  function t(r, n) {
    var o;
    o = e.call(this, r, n) || this;
    var i = n, s = i && !i.isMounting ? r.enter : r.appear, l;
    return o.appearStatus = null, r.in ? s ? (l = Or, o.appearStatus = _r) : l = sn : r.unmountOnExit || r.mountOnEnter ? l = _n : l = Or, o.state = {
      status: l
    }, o.nextCallback = null, o;
  }
  t.getDerivedStateFromProps = function(n, o) {
    var i = n.in;
    return i && o.status === _n ? {
      status: Or
    } : null;
  };
  var a = t.prototype;
  return a.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, a.componentDidUpdate = function(n) {
    var o = null;
    if (n !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== _r && i !== sn && (o = _r) : (i === _r || i === sn) && (o = di);
    }
    this.updateStatus(!1, o);
  }, a.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, a.getTimeouts = function() {
    var n = this.props.timeout, o, i, s;
    return o = i = s = n, n != null && typeof n != "number" && (o = n.exit, i = n.enter, s = n.appear !== void 0 ? n.appear : i), {
      exit: o,
      enter: i,
      appear: s
    };
  }, a.updateStatus = function(n, o) {
    if (n === void 0 && (n = !1), o !== null)
      if (this.cancelNextCallback(), o === _r) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : aa.findDOMNode(this);
          i && im(i);
        }
        this.performEnter(n);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === Or && this.setState({
      status: _n
    });
  }, a.performEnter = function(n) {
    var o = this, i = this.props.enter, s = this.context ? this.context.isMounting : n, l = this.props.nodeRef ? [s] : [aa.findDOMNode(this), s], u = l[0], c = l[1], d = this.getTimeouts(), p = s ? d.appear : d.enter;
    if (!n && !i || Gs.disabled) {
      this.safeSetState({
        status: sn
      }, function() {
        o.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, c), this.safeSetState({
      status: _r
    }, function() {
      o.props.onEntering(u, c), o.onTransitionEnd(p, function() {
        o.safeSetState({
          status: sn
        }, function() {
          o.props.onEntered(u, c);
        });
      });
    });
  }, a.performExit = function() {
    var n = this, o = this.props.exit, i = this.getTimeouts(), s = this.props.nodeRef ? void 0 : aa.findDOMNode(this);
    if (!o || Gs.disabled) {
      this.safeSetState({
        status: Or
      }, function() {
        n.props.onExited(s);
      });
      return;
    }
    this.props.onExit(s), this.safeSetState({
      status: di
    }, function() {
      n.props.onExiting(s), n.onTransitionEnd(i.exit, function() {
        n.safeSetState({
          status: Or
        }, function() {
          n.props.onExited(s);
        });
      });
    });
  }, a.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, a.safeSetState = function(n, o) {
    o = this.setNextCallback(o), this.setState(n, o);
  }, a.setNextCallback = function(n) {
    var o = this, i = !0;
    return this.nextCallback = function(s) {
      i && (i = !1, o.nextCallback = null, n(s));
    }, this.nextCallback.cancel = function() {
      i = !1;
    }, this.nextCallback;
  }, a.onTransitionEnd = function(n, o) {
    this.setNextCallback(o);
    var i = this.props.nodeRef ? this.props.nodeRef.current : aa.findDOMNode(this), s = n == null && !this.props.addEndListener;
    if (!i || s) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var l = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], u = l[0], c = l[1];
      this.props.addEndListener(u, c);
    }
    n != null && setTimeout(this.nextCallback, n);
  }, a.render = function() {
    var n = this.state.status;
    if (n === _n)
      return null;
    var o = this.props, i = o.children;
    o.in, o.mountOnEnter, o.unmountOnExit, o.appear, o.enter, o.exit, o.timeout, o.addEndListener, o.onEnter, o.onEntering, o.onEntered, o.onExit, o.onExiting, o.onExited, o.nodeRef;
    var s = Ia(o, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ st.createElement(Ta.Provider, {
        value: null
      }, typeof i == "function" ? i(n, s) : st.cloneElement(st.Children.only(i), s))
    );
  }, t;
})(st.Component);
nr.contextType = Ta;
nr.propTypes = {};
function Qr() {
}
nr.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Qr,
  onEntering: Qr,
  onEntered: Qr,
  onExit: Qr,
  onExiting: Qr,
  onExited: Qr
};
nr.UNMOUNTED = _n;
nr.EXITED = Or;
nr.ENTERING = _r;
nr.ENTERED = sn;
nr.EXITING = di;
function Bi(e, t) {
  var a = function(o) {
    return t && fa(o) ? t(o) : o;
  }, r = /* @__PURE__ */ Object.create(null);
  return e && Fu.map(e, function(n) {
    return n;
  }).forEach(function(n) {
    r[n.key] = a(n);
  }), r;
}
function sm(e, t) {
  e = e || {}, t = t || {};
  function a(c) {
    return c in t ? t[c] : e[c];
  }
  var r = /* @__PURE__ */ Object.create(null), n = [];
  for (var o in e)
    o in t ? n.length && (r[o] = n, n = []) : n.push(o);
  var i, s = {};
  for (var l in t) {
    if (r[l])
      for (i = 0; i < r[l].length; i++) {
        var u = r[l][i];
        s[r[l][i]] = a(u);
      }
    s[l] = a(l);
  }
  for (i = 0; i < n.length; i++)
    s[n[i]] = a(n[i]);
  return s;
}
function jr(e, t, a) {
  return a[t] != null ? a[t] : e.props[t];
}
function lm(e, t) {
  return Bi(e.children, function(a) {
    return pa(a, {
      onExited: t.bind(null, a),
      in: !0,
      appear: jr(a, "appear", e),
      enter: jr(a, "enter", e),
      exit: jr(a, "exit", e)
    });
  });
}
function cm(e, t, a) {
  var r = Bi(e.children), n = sm(t, r);
  return Object.keys(n).forEach(function(o) {
    var i = n[o];
    if (fa(i)) {
      var s = o in t, l = o in r, u = t[o], c = fa(u) && !u.props.in;
      l && (!s || c) ? n[o] = pa(i, {
        onExited: a.bind(null, i),
        in: !0,
        exit: jr(i, "exit", e),
        enter: jr(i, "enter", e)
      }) : !l && s && !c ? n[o] = pa(i, {
        in: !1
      }) : l && s && fa(u) && (n[o] = pa(i, {
        onExited: a.bind(null, i),
        in: u.props.in,
        exit: jr(i, "exit", e),
        enter: jr(i, "enter", e)
      }));
    }
  }), n;
}
var um = Object.values || function(e) {
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}, dm = {
  component: "div",
  childFactory: function(t) {
    return t;
  }
}, Fi = /* @__PURE__ */ (function(e) {
  La(t, e);
  function t(r, n) {
    var o;
    o = e.call(this, r, n) || this;
    var i = o.handleExited.bind(ei(o));
    return o.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: i,
      firstRender: !0
    }, o;
  }
  var a = t.prototype;
  return a.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, a.componentWillUnmount = function() {
    this.mounted = !1;
  }, t.getDerivedStateFromProps = function(n, o) {
    var i = o.children, s = o.handleExited, l = o.firstRender;
    return {
      children: l ? lm(n, s) : cm(n, i, s),
      firstRender: !1
    };
  }, a.handleExited = function(n, o) {
    var i = Bi(this.props.children);
    n.key in i || (n.props.onExited && n.props.onExited(o), this.mounted && this.setState(function(s) {
      var l = se({}, s.children);
      return delete l[n.key], {
        children: l
      };
    }));
  }, a.render = function() {
    var n = this.props, o = n.component, i = n.childFactory, s = Ia(n, ["component", "childFactory"]), l = this.state.contextValue, u = um(this.state.children).map(i);
    return delete s.appear, delete s.enter, delete s.exit, o === null ? /* @__PURE__ */ st.createElement(Ta.Provider, {
      value: l
    }, u) : /* @__PURE__ */ st.createElement(Ta.Provider, {
      value: l
    }, /* @__PURE__ */ st.createElement(o, s, u));
  }, t;
})(st.Component);
Fi.propTypes = {};
Fi.defaultProps = dm;
var fm = function(t) {
  return t.scrollTop;
};
function Oa(e, t) {
  var a = e.timeout, r = e.style, n = r === void 0 ? {} : r;
  return {
    duration: n.transitionDuration || typeof a == "number" ? a : a[t.mode] || 0,
    delay: n.transitionDelay
  };
}
var pm = function(t) {
  return {
    /* Styles applied to the root element. */
    root: {
      height: 0,
      overflow: "hidden",
      transition: t.transitions.create("height")
    },
    /* Styles applied to the root element when the transition has entered. */
    entered: {
      height: "auto",
      overflow: "visible"
    },
    /* Styles applied to the root element when the transition has exited and `collapsedSize` != 0px. */
    hidden: {
      visibility: "hidden"
    },
    /* Styles applied to the outer wrapper element. */
    wrapper: {
      // Hack to get children with a negative margin to not falsify the height computation.
      display: "flex"
    },
    /* Styles applied to the inner wrapper element. */
    wrapperInner: {
      width: "100%"
    }
  };
}, wc = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.children, n = t.classes, o = t.className, i = t.collapsedHeight, s = t.collapsedSize, l = s === void 0 ? "0px" : s, u = t.component, c = u === void 0 ? "div" : u, d = t.disableStrictModeCompat, p = d === void 0 ? !1 : d, h = t.in, g = t.onEnter, m = t.onEntered, v = t.onEntering, C = t.onExit, T = t.onExited, A = t.onExiting, f = t.style, x = t.timeout, k = x === void 0 ? Zo.standard : x, D = t.TransitionComponent, V = D === void 0 ? nr : D, j = Ve(t, ["children", "classes", "className", "collapsedHeight", "collapsedSize", "component", "disableStrictModeCompat", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"]), M = Fa(), I = _.useRef(), b = _.useRef(null), S = _.useRef(), L = typeof (i || l) == "number" ? "".concat(i || l, "px") : i || l;
  _.useEffect(function() {
    return function() {
      clearTimeout(I.current);
    };
  }, []);
  var N = M.unstable_strictMode && !p, R = _.useRef(null), U = Tt(a, N ? R : void 0), B = function(ce) {
    return function(ue, me) {
      if (ce) {
        var be = N ? [R.current, ue] : [ue, me], Pe = Kn(be, 2), De = Pe[0], ze = Pe[1];
        ze === void 0 ? ce(De) : ce(De, ze);
      }
    };
  }, J = B(function(fe, ce) {
    fe.style.height = L, g && g(fe, ce);
  }), W = B(function(fe, ce) {
    var ue = b.current ? b.current.clientHeight : 0, me = Oa({
      style: f,
      timeout: k
    }, {
      mode: "enter"
    }), be = me.duration;
    if (k === "auto") {
      var Pe = M.transitions.getAutoHeightDuration(ue);
      fe.style.transitionDuration = "".concat(Pe, "ms"), S.current = Pe;
    } else
      fe.style.transitionDuration = typeof be == "string" ? be : "".concat(be, "ms");
    fe.style.height = "".concat(ue, "px"), v && v(fe, ce);
  }), ae = B(function(fe, ce) {
    fe.style.height = "auto", m && m(fe, ce);
  }), re = B(function(fe) {
    var ce = b.current ? b.current.clientHeight : 0;
    fe.style.height = "".concat(ce, "px"), C && C(fe);
  }), de = B(T), pe = B(function(fe) {
    var ce = b.current ? b.current.clientHeight : 0, ue = Oa({
      style: f,
      timeout: k
    }, {
      mode: "exit"
    }), me = ue.duration;
    if (k === "auto") {
      var be = M.transitions.getAutoHeightDuration(ce);
      fe.style.transitionDuration = "".concat(be, "ms"), S.current = be;
    } else
      fe.style.transitionDuration = typeof me == "string" ? me : "".concat(me, "ms");
    fe.style.height = L, A && A(fe);
  }), Se = function(ce, ue) {
    var me = N ? ce : ue;
    k === "auto" && (I.current = setTimeout(me, S.current || 0));
  };
  return /* @__PURE__ */ _.createElement(V, se({
    in: h,
    onEnter: J,
    onEntered: ae,
    onEntering: W,
    onExit: re,
    onExited: de,
    onExiting: pe,
    addEndListener: Se,
    nodeRef: N ? R : void 0,
    timeout: k === "auto" ? null : k
  }, j), function(fe, ce) {
    return /* @__PURE__ */ _.createElement(c, se({
      className: ge(n.root, n.container, o, {
        entered: n.entered,
        exited: !h && L === "0px" && n.hidden
      }[fe]),
      style: se({
        minHeight: L
      }, f),
      ref: U
    }, ce), /* @__PURE__ */ _.createElement("div", {
      className: n.wrapper,
      ref: b
    }, /* @__PURE__ */ _.createElement("div", {
      className: n.wrapperInner
    }, r)));
  });
});
wc.muiSupportAuto = !0;
const hm = St(pm, {
  name: "MuiCollapse"
})(wc);
var mm = function(t) {
  var a = {};
  return t.shadows.forEach(function(r, n) {
    a["elevation".concat(n)] = {
      boxShadow: r
    };
  }), se({
    /* Styles applied to the root element. */
    root: {
      backgroundColor: t.palette.background.paper,
      color: t.palette.text.primary,
      transition: t.transitions.create("box-shadow")
    },
    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: t.shape.borderRadius
    },
    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      border: "1px solid ".concat(t.palette.divider)
    }
  }, a);
}, gm = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.classes, n = t.className, o = t.component, i = o === void 0 ? "div" : o, s = t.square, l = s === void 0 ? !1 : s, u = t.elevation, c = u === void 0 ? 1 : u, d = t.variant, p = d === void 0 ? "elevation" : d, h = Ve(t, ["classes", "className", "component", "square", "elevation", "variant"]);
  return /* @__PURE__ */ _.createElement(i, se({
    className: ge(r.root, n, p === "outlined" ? r.outlined : r["elevation".concat(c)], !l && r.rounded),
    ref: a
  }, h));
});
const bm = St(mm, {
  name: "MuiPaper"
})(gm);
var Cc = _.createContext({}), vm = function(t) {
  var a = {
    duration: t.transitions.duration.shortest
  };
  return {
    /* Styles applied to the root element. */
    root: {
      position: "relative",
      transition: t.transitions.create(["margin"], a),
      "&:before": {
        position: "absolute",
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: t.palette.divider,
        transition: t.transitions.create(["opacity", "background-color"], a)
      },
      "&:first-child": {
        "&:before": {
          display: "none"
        }
      },
      "&$expanded": {
        margin: "16px 0",
        "&:first-child": {
          marginTop: 0
        },
        "&:last-child": {
          marginBottom: 0
        },
        "&:before": {
          opacity: 0
        }
      },
      "&$expanded + &": {
        "&:before": {
          display: "none"
        }
      },
      "&$disabled": {
        backgroundColor: t.palette.action.disabledBackground
      }
    },
    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: 0,
      "&:first-child": {
        borderTopLeftRadius: t.shape.borderRadius,
        borderTopRightRadius: t.shape.borderRadius
      },
      "&:last-child": {
        borderBottomLeftRadius: t.shape.borderRadius,
        borderBottomRightRadius: t.shape.borderRadius,
        // Fix a rendering issue on Edge
        "@supports (-ms-ime-align: auto)": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      }
    },
    /* Styles applied to the root element if `expanded={true}`. */
    expanded: {},
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {}
  };
}, ym = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.children, n = t.classes, o = t.className, i = t.defaultExpanded, s = i === void 0 ? !1 : i, l = t.disabled, u = l === void 0 ? !1 : l, c = t.expanded, d = t.onChange, p = t.square, h = p === void 0 ? !1 : p, g = t.TransitionComponent, m = g === void 0 ? hm : g, v = t.TransitionProps, C = Ve(t, ["children", "classes", "className", "defaultExpanded", "disabled", "expanded", "onChange", "square", "TransitionComponent", "TransitionProps"]), T = Sc({
    controlled: c,
    default: s,
    name: "Accordion",
    state: "expanded"
  }), A = Kn(T, 2), f = A[0], x = A[1], k = _.useCallback(function(b) {
    x(!f), d && d(b, !f);
  }, [f, d, x]), D = _.Children.toArray(r), V = om(D), j = V[0], M = V.slice(1), I = _.useMemo(function() {
    return {
      expanded: f,
      disabled: u,
      toggle: k
    };
  }, [f, u, k]);
  return /* @__PURE__ */ _.createElement(bm, se({
    className: ge(n.root, o, f && n.expanded, u && n.disabled, !h && n.rounded),
    ref: a,
    square: h
  }, C), /* @__PURE__ */ _.createElement(Cc.Provider, {
    value: I
  }, j), /* @__PURE__ */ _.createElement(m, se({
    in: f,
    timeout: "auto"
  }, v), /* @__PURE__ */ _.createElement("div", {
    "aria-labelledby": j.props.id,
    id: j.props["aria-controls"],
    role: "region"
  }, M)));
});
const xm = St(vm, {
  name: "MuiAccordion"
})(ym);
var Sm = function(t) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: "flex",
      padding: t.spacing(1, 2, 2)
    }
  };
}, wm = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.classes, n = t.className, o = Ve(t, ["classes", "className"]);
  return /* @__PURE__ */ _.createElement("div", se({
    className: ge(r.root, n),
    ref: a
  }, o));
});
const Cm = St(Sm, {
  name: "MuiAccordionDetails"
})(wm);
var Em = typeof window > "u" ? _.useEffect : _.useLayoutEffect;
function km(e) {
  var t = e.classes, a = e.pulsate, r = a === void 0 ? !1 : a, n = e.rippleX, o = e.rippleY, i = e.rippleSize, s = e.in, l = e.onExited, u = l === void 0 ? function() {
  } : l, c = e.timeout, d = _.useState(!1), p = d[0], h = d[1], g = ge(t.ripple, t.rippleVisible, r && t.ripplePulsate), m = {
    width: i,
    height: i,
    top: -(i / 2) + o,
    left: -(i / 2) + n
  }, v = ge(t.child, p && t.childLeaving, r && t.childPulsate), C = gr(u);
  return Em(function() {
    if (!s) {
      h(!0);
      var T = setTimeout(C, c);
      return function() {
        clearTimeout(T);
      };
    }
  }, [C, s, c]), /* @__PURE__ */ _.createElement("span", {
    className: g,
    style: m
  }, /* @__PURE__ */ _.createElement("span", {
    className: v
  }));
}
var fi = 550, $m = 80, Rm = function(t) {
  return {
    /* Styles applied to the root element. */
    root: {
      overflow: "hidden",
      pointerEvents: "none",
      position: "absolute",
      zIndex: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: "inherit"
    },
    /* Styles applied to the internal `Ripple` components `ripple` class. */
    ripple: {
      opacity: 0,
      position: "absolute"
    },
    /* Styles applied to the internal `Ripple` components `rippleVisible` class. */
    rippleVisible: {
      opacity: 0.3,
      transform: "scale(1)",
      animation: "$enter ".concat(fi, "ms ").concat(t.transitions.easing.easeInOut)
    },
    /* Styles applied to the internal `Ripple` components `ripplePulsate` class. */
    ripplePulsate: {
      animationDuration: "".concat(t.transitions.duration.shorter, "ms")
    },
    /* Styles applied to the internal `Ripple` components `child` class. */
    child: {
      opacity: 1,
      display: "block",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      backgroundColor: "currentColor"
    },
    /* Styles applied to the internal `Ripple` components `childLeaving` class. */
    childLeaving: {
      opacity: 0,
      animation: "$exit ".concat(fi, "ms ").concat(t.transitions.easing.easeInOut)
    },
    /* Styles applied to the internal `Ripple` components `childPulsate` class. */
    childPulsate: {
      position: "absolute",
      left: 0,
      top: 0,
      animation: "$pulsate 2500ms ".concat(t.transitions.easing.easeInOut, " 200ms infinite")
    },
    "@keyframes enter": {
      "0%": {
        transform: "scale(0)",
        opacity: 0.1
      },
      "100%": {
        transform: "scale(1)",
        opacity: 0.3
      }
    },
    "@keyframes exit": {
      "0%": {
        opacity: 1
      },
      "100%": {
        opacity: 0
      }
    },
    "@keyframes pulsate": {
      "0%": {
        transform: "scale(1)"
      },
      "50%": {
        transform: "scale(0.92)"
      },
      "100%": {
        transform: "scale(1)"
      }
    }
  };
}, Tm = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.center, n = r === void 0 ? !1 : r, o = t.classes, i = t.className, s = Ve(t, ["center", "classes", "className"]), l = _.useState([]), u = l[0], c = l[1], d = _.useRef(0), p = _.useRef(null);
  _.useEffect(function() {
    p.current && (p.current(), p.current = null);
  }, [u]);
  var h = _.useRef(!1), g = _.useRef(null), m = _.useRef(null), v = _.useRef(null);
  _.useEffect(function() {
    return function() {
      clearTimeout(g.current);
    };
  }, []);
  var C = _.useCallback(function(x) {
    var k = x.pulsate, D = x.rippleX, V = x.rippleY, j = x.rippleSize, M = x.cb;
    c(function(I) {
      return [].concat(_i(I), [/* @__PURE__ */ _.createElement(km, {
        key: d.current,
        classes: o,
        timeout: fi,
        pulsate: k,
        rippleX: D,
        rippleY: V,
        rippleSize: j
      })]);
    }), d.current += 1, p.current = M;
  }, [o]), T = _.useCallback(function() {
    var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, k = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, D = arguments.length > 2 ? arguments[2] : void 0, V = k.pulsate, j = V === void 0 ? !1 : V, M = k.center, I = M === void 0 ? n || k.pulsate : M, b = k.fakeElement, S = b === void 0 ? !1 : b;
    if (x.type === "mousedown" && h.current) {
      h.current = !1;
      return;
    }
    x.type === "touchstart" && (h.current = !0);
    var L = S ? null : v.current, N = L ? L.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    }, R, U, B;
    if (I || x.clientX === 0 && x.clientY === 0 || !x.clientX && !x.touches)
      R = Math.round(N.width / 2), U = Math.round(N.height / 2);
    else {
      var J = x.touches ? x.touches[0] : x, W = J.clientX, ae = J.clientY;
      R = Math.round(W - N.left), U = Math.round(ae - N.top);
    }
    if (I)
      B = Math.sqrt((2 * Math.pow(N.width, 2) + Math.pow(N.height, 2)) / 3), B % 2 === 0 && (B += 1);
    else {
      var re = Math.max(Math.abs((L ? L.clientWidth : 0) - R), R) * 2 + 2, de = Math.max(Math.abs((L ? L.clientHeight : 0) - U), U) * 2 + 2;
      B = Math.sqrt(Math.pow(re, 2) + Math.pow(de, 2));
    }
    x.touches ? m.current === null && (m.current = function() {
      C({
        pulsate: j,
        rippleX: R,
        rippleY: U,
        rippleSize: B,
        cb: D
      });
    }, g.current = setTimeout(function() {
      m.current && (m.current(), m.current = null);
    }, $m)) : C({
      pulsate: j,
      rippleX: R,
      rippleY: U,
      rippleSize: B,
      cb: D
    });
  }, [n, C]), A = _.useCallback(function() {
    T({}, {
      pulsate: !0
    });
  }, [T]), f = _.useCallback(function(x, k) {
    if (clearTimeout(g.current), x.type === "touchend" && m.current) {
      x.persist(), m.current(), m.current = null, g.current = setTimeout(function() {
        f(x, k);
      });
      return;
    }
    m.current = null, c(function(D) {
      return D.length > 0 ? D.slice(1) : D;
    }), p.current = k;
  }, []);
  return _.useImperativeHandle(a, function() {
    return {
      pulsate: A,
      start: T,
      stop: f
    };
  }, [A, T, f]), /* @__PURE__ */ _.createElement("span", se({
    className: ge(o.root, i),
    ref: v
  }, s), /* @__PURE__ */ _.createElement(Fi, {
    component: null,
    exit: !0
  }, u));
});
const Om = St(Rm, {
  flip: !1,
  name: "MuiTouchRipple"
})(/* @__PURE__ */ _.memo(Tm));
var _m = {
  /* Styles applied to the root element. */
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    WebkitTapHighlightColor: "transparent",
    backgroundColor: "transparent",
    // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0,
    // Remove the margin in Safari
    borderRadius: 0,
    padding: 0,
    // Remove the padding in Firefox
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    "-moz-appearance": "none",
    // Reset
    "-webkit-appearance": "none",
    // Reset
    textDecoration: "none",
    // So we take precedent over the style of a native <a /> element.
    color: "inherit",
    "&::-moz-focus-inner": {
      borderStyle: "none"
      // Remove Firefox dotted outline.
    },
    "&$disabled": {
      pointerEvents: "none",
      // Disable link interactions
      cursor: "default"
    },
    "@media print": {
      colorAdjust: "exact"
    }
  },
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Pseudo-class applied to the root element if keyboard focused. */
  focusVisible: {}
}, Pm = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.action, n = t.buttonRef, o = t.centerRipple, i = o === void 0 ? !1 : o, s = t.children, l = t.classes, u = t.className, c = t.component, d = c === void 0 ? "button" : c, p = t.disabled, h = p === void 0 ? !1 : p, g = t.disableRipple, m = g === void 0 ? !1 : g, v = t.disableTouchRipple, C = v === void 0 ? !1 : v, T = t.focusRipple, A = T === void 0 ? !1 : T, f = t.focusVisibleClassName, x = t.onBlur, k = t.onClick, D = t.onFocus, V = t.onFocusVisible, j = t.onKeyDown, M = t.onKeyUp, I = t.onMouseDown, b = t.onMouseLeave, S = t.onMouseUp, L = t.onTouchEnd, N = t.onTouchMove, R = t.onTouchStart, U = t.onDragLeave, B = t.tabIndex, J = B === void 0 ? 0 : B, W = t.TouchRippleProps, ae = t.type, re = ae === void 0 ? "button" : ae, de = Ve(t, ["action", "buttonRef", "centerRipple", "children", "classes", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "onBlur", "onClick", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "onDragLeave", "tabIndex", "TouchRippleProps", "type"]), pe = _.useRef(null);
  function Se() {
    return Vn.findDOMNode(pe.current);
  }
  var fe = _.useRef(null), ce = _.useState(!1), ue = ce[0], me = ce[1];
  h && ue && me(!1);
  var be = Ni(), Pe = be.isFocusVisible, De = be.onBlurVisible, ze = be.ref;
  _.useImperativeHandle(r, function() {
    return {
      focusVisible: function() {
        me(!0), pe.current.focus();
      }
    };
  }, []), _.useEffect(function() {
    ue && A && !m && fe.current.pulsate();
  }, [m, A, ue]);
  function We(oe, ve) {
    var Me = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : C;
    return gr(function(Be) {
      ve && ve(Be);
      var Ze = Me;
      return !Ze && fe.current && fe.current[oe](Be), !0;
    });
  }
  var ht = We("start", I), je = We("stop", U), He = We("stop", S), Ge = We("stop", function(oe) {
    ue && oe.preventDefault(), b && b(oe);
  }), Ue = We("start", R), gt = We("stop", L), mt = We("stop", N), lt = We("stop", function(oe) {
    ue && (De(oe), me(!1)), x && x(oe);
  }, !1), Ye = gr(function(oe) {
    pe.current || (pe.current = oe.currentTarget), Pe(oe) && (me(!0), V && V(oe)), D && D(oe);
  }), ft = function() {
    var ve = Se();
    return d && d !== "button" && !(ve.tagName === "A" && ve.href);
  }, Z = _.useRef(!1), z = gr(function(oe) {
    A && !Z.current && ue && fe.current && oe.key === " " && (Z.current = !0, oe.persist(), fe.current.stop(oe, function() {
      fe.current.start(oe);
    })), oe.target === oe.currentTarget && ft() && oe.key === " " && oe.preventDefault(), j && j(oe), oe.target === oe.currentTarget && ft() && oe.key === "Enter" && !h && (oe.preventDefault(), k && k(oe));
  }), H = gr(function(oe) {
    A && oe.key === " " && fe.current && ue && !oe.defaultPrevented && (Z.current = !1, oe.persist(), fe.current.stop(oe, function() {
      fe.current.pulsate(oe);
    })), M && M(oe), k && oe.target === oe.currentTarget && ft() && oe.key === " " && !oe.defaultPrevented && k(oe);
  }), X = d;
  X === "button" && de.href && (X = "a");
  var ne = {};
  X === "button" ? (ne.type = re, ne.disabled = h) : ((X !== "a" || !de.href) && (ne.role = "button"), ne["aria-disabled"] = h);
  var he = Tt(n, a), $e = Tt(ze, pe), ke = Tt(he, $e), _e = _.useState(!1), Xe = _e[0], Je = _e[1];
  _.useEffect(function() {
    Je(!0);
  }, []);
  var Ee = Xe && !m && !h;
  return /* @__PURE__ */ _.createElement(X, se({
    className: ge(l.root, u, ue && [l.focusVisible, f], h && l.disabled),
    onBlur: lt,
    onClick: k,
    onFocus: Ye,
    onKeyDown: z,
    onKeyUp: H,
    onMouseDown: ht,
    onMouseLeave: Ge,
    onMouseUp: He,
    onDragLeave: je,
    onTouchEnd: gt,
    onTouchMove: mt,
    onTouchStart: Ue,
    ref: ke,
    tabIndex: h ? -1 : J
  }, ne, de), s, Ee ? (
    /* TouchRipple is only needed client-side, x2 boost on the server. */
    /* @__PURE__ */ _.createElement(Om, se({
      ref: fe,
      center: i
    }, W))
  ) : null);
});
const Nr = St(_m, {
  name: "MuiButtonBase"
})(Pm);
var jm = function(t) {
  return {
    /* Styles applied to the root element. */
    root: {
      textAlign: "center",
      flex: "0 0 auto",
      fontSize: t.typography.pxToRem(24),
      padding: 12,
      borderRadius: "50%",
      overflow: "visible",
      // Explicitly set the default value to solve a bug on IE 11.
      color: t.palette.action.active,
      transition: t.transitions.create("background-color", {
        duration: t.transitions.duration.shortest
      }),
      "&:hover": {
        backgroundColor: Le(t.palette.action.active, t.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      },
      "&$disabled": {
        backgroundColor: "transparent",
        color: t.palette.action.disabled
      }
    },
    /* Styles applied to the root element if `edge="start"`. */
    edgeStart: {
      marginLeft: -12,
      "$sizeSmall&": {
        marginLeft: -3
      }
    },
    /* Styles applied to the root element if `edge="end"`. */
    edgeEnd: {
      marginRight: -12,
      "$sizeSmall&": {
        marginRight: -3
      }
    },
    /* Styles applied to the root element if `color="inherit"`. */
    colorInherit: {
      color: "inherit"
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      color: t.palette.primary.main,
      "&:hover": {
        backgroundColor: Le(t.palette.primary.main, t.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: t.palette.secondary.main,
      "&:hover": {
        backgroundColor: Le(t.palette.secondary.main, t.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      padding: 3,
      fontSize: t.typography.pxToRem(18)
    },
    /* Styles applied to the children container element. */
    label: {
      width: "100%",
      display: "flex",
      alignItems: "inherit",
      justifyContent: "inherit"
    }
  };
}, Am = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.edge, n = r === void 0 ? !1 : r, o = t.children, i = t.classes, s = t.className, l = t.color, u = l === void 0 ? "default" : l, c = t.disabled, d = c === void 0 ? !1 : c, p = t.disableFocusRipple, h = p === void 0 ? !1 : p, g = t.size, m = g === void 0 ? "medium" : g, v = Ve(t, ["edge", "children", "classes", "className", "color", "disabled", "disableFocusRipple", "size"]);
  return /* @__PURE__ */ _.createElement(Nr, se({
    className: ge(i.root, s, u !== "default" && i["color".concat(bt(u))], d && i.disabled, m === "small" && i["size".concat(bt(m))], {
      start: i.edgeStart,
      end: i.edgeEnd
    }[n]),
    centerRipple: !0,
    focusRipple: !h,
    disabled: d,
    ref: a
  }, v), /* @__PURE__ */ _.createElement("span", {
    className: i.label
  }, o));
});
const Ec = St(jm, {
  name: "MuiIconButton"
})(Am);
var Mm = function(t) {
  var a = {
    duration: t.transitions.duration.shortest
  };
  return {
    /* Styles applied to the root element. */
    root: {
      display: "flex",
      minHeight: 48,
      transition: t.transitions.create(["min-height", "background-color"], a),
      padding: t.spacing(0, 2),
      "&:hover:not($disabled)": {
        cursor: "pointer"
      },
      "&$expanded": {
        minHeight: 64
      },
      "&$focused, &$focusVisible": {
        backgroundColor: t.palette.action.focus
      },
      "&$disabled": {
        opacity: t.palette.action.disabledOpacity
      }
    },
    /* Pseudo-class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
    expanded: {},
    /* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
    focused: {},
    /* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
    focusVisible: {},
    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the children wrapper element. */
    content: {
      display: "flex",
      flexGrow: 1,
      transition: t.transitions.create(["margin"], a),
      margin: "12px 0",
      "&$expanded": {
        margin: "20px 0"
      }
    },
    /* Styles applied to the `IconButton` component when `expandIcon` is supplied. */
    expandIcon: {
      transform: "rotate(0deg)",
      transition: t.transitions.create("transform", a),
      "&:hover": {
        // Disable the hover effect for the IconButton,
        // because a hover effect should apply to the entire Expand button and
        // not only to the IconButton.
        backgroundColor: "transparent"
      },
      "&$expanded": {
        transform: "rotate(180deg)"
      }
    }
  };
}, Im = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.children, n = t.classes, o = t.className, i = t.expandIcon, s = t.focusVisibleClassName, l = t.IconButtonProps, u = l === void 0 ? {} : l, c = t.onClick, d = Ve(t, ["children", "classes", "className", "expandIcon", "focusVisibleClassName", "IconButtonProps", "onClick"]), p = _.useContext(Cc), h = p.disabled, g = h === void 0 ? !1 : h, m = p.expanded, v = p.toggle, C = function(A) {
    v && v(A), c && c(A);
  };
  return /* @__PURE__ */ _.createElement(Nr, se({
    focusRipple: !1,
    disableRipple: !0,
    disabled: g,
    component: "div",
    "aria-expanded": m,
    className: ge(n.root, o, g && n.disabled, m && n.expanded),
    focusVisibleClassName: ge(n.focusVisible, n.focused, s),
    onClick: C,
    ref: a
  }, d), /* @__PURE__ */ _.createElement("div", {
    className: ge(n.content, m && n.expanded)
  }, r), i && /* @__PURE__ */ _.createElement(Ec, se({
    className: ge(n.expandIcon, m && n.expanded),
    edge: "end",
    component: "div",
    tabIndex: null,
    role: null,
    "aria-hidden": !0
  }, u), i));
});
const Lm = St(Mm, {
  name: "MuiAccordionSummary"
})(Im);
var Dm = Sd(lr(xd, Td, Wd, tf, ff, af, pf, Sf, Pi, Lf)), Ce = Di("div")(Dm, {
  name: "MuiBox"
}), Nm = function(t) {
  return {
    /* Styles applied to the root element. */
    root: {
      margin: 0
    },
    /* Styles applied to the root element if `variant="body2"`. */
    body2: t.typography.body2,
    /* Styles applied to the root element if `variant="body1"`. */
    body1: t.typography.body1,
    /* Styles applied to the root element if `variant="caption"`. */
    caption: t.typography.caption,
    /* Styles applied to the root element if `variant="button"`. */
    button: t.typography.button,
    /* Styles applied to the root element if `variant="h1"`. */
    h1: t.typography.h1,
    /* Styles applied to the root element if `variant="h2"`. */
    h2: t.typography.h2,
    /* Styles applied to the root element if `variant="h3"`. */
    h3: t.typography.h3,
    /* Styles applied to the root element if `variant="h4"`. */
    h4: t.typography.h4,
    /* Styles applied to the root element if `variant="h5"`. */
    h5: t.typography.h5,
    /* Styles applied to the root element if `variant="h6"`. */
    h6: t.typography.h6,
    /* Styles applied to the root element if `variant="subtitle1"`. */
    subtitle1: t.typography.subtitle1,
    /* Styles applied to the root element if `variant="subtitle2"`. */
    subtitle2: t.typography.subtitle2,
    /* Styles applied to the root element if `variant="overline"`. */
    overline: t.typography.overline,
    /* Styles applied to the root element if `variant="srOnly"`. Only accessible to screen readers. */
    srOnly: {
      position: "absolute",
      height: 1,
      width: 1,
      overflow: "hidden"
    },
    /* Styles applied to the root element if `align="left"`. */
    alignLeft: {
      textAlign: "left"
    },
    /* Styles applied to the root element if `align="center"`. */
    alignCenter: {
      textAlign: "center"
    },
    /* Styles applied to the root element if `align="right"`. */
    alignRight: {
      textAlign: "right"
    },
    /* Styles applied to the root element if `align="justify"`. */
    alignJustify: {
      textAlign: "justify"
    },
    /* Styles applied to the root element if `nowrap={true}`. */
    noWrap: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    /* Styles applied to the root element if `gutterBottom={true}`. */
    gutterBottom: {
      marginBottom: "0.35em"
    },
    /* Styles applied to the root element if `paragraph={true}`. */
    paragraph: {
      marginBottom: 16
    },
    /* Styles applied to the root element if `color="inherit"`. */
    colorInherit: {
      color: "inherit"
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      color: t.palette.primary.main
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: t.palette.secondary.main
    },
    /* Styles applied to the root element if `color="textPrimary"`. */
    colorTextPrimary: {
      color: t.palette.text.primary
    },
    /* Styles applied to the root element if `color="textSecondary"`. */
    colorTextSecondary: {
      color: t.palette.text.secondary
    },
    /* Styles applied to the root element if `color="error"`. */
    colorError: {
      color: t.palette.error.main
    },
    /* Styles applied to the root element if `display="inline"`. */
    displayInline: {
      display: "inline"
    },
    /* Styles applied to the root element if `display="block"`. */
    displayBlock: {
      display: "block"
    }
  };
}, Ys = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p"
}, Bm = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.align, n = r === void 0 ? "inherit" : r, o = t.classes, i = t.className, s = t.color, l = s === void 0 ? "initial" : s, u = t.component, c = t.display, d = c === void 0 ? "initial" : c, p = t.gutterBottom, h = p === void 0 ? !1 : p, g = t.noWrap, m = g === void 0 ? !1 : g, v = t.paragraph, C = v === void 0 ? !1 : v, T = t.variant, A = T === void 0 ? "body1" : T, f = t.variantMapping, x = f === void 0 ? Ys : f, k = Ve(t, ["align", "classes", "className", "color", "component", "display", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"]), D = u || (C ? "p" : x[A] || Ys[A]) || "span";
  return /* @__PURE__ */ _.createElement(D, se({
    className: ge(o.root, i, A !== "inherit" && o[A], l !== "initial" && o["color".concat(bt(l))], m && o.noWrap, h && o.gutterBottom, C && o.paragraph, n !== "inherit" && o["align".concat(bt(n))], d !== "initial" && o["display".concat(bt(d))]),
    ref: a
  }, k));
});
const Ht = St(Nm, {
  name: "MuiTypography"
})(Bm);
var Fm = function(t) {
  return {
    /* Styles applied to the root element. */
    root: se({}, t.typography.button, {
      boxSizing: "border-box",
      minWidth: 64,
      padding: "6px 16px",
      borderRadius: t.shape.borderRadius,
      color: t.palette.text.primary,
      transition: t.transitions.create(["background-color", "box-shadow", "border"], {
        duration: t.transitions.duration.short
      }),
      "&:hover": {
        textDecoration: "none",
        backgroundColor: Le(t.palette.text.primary, t.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        },
        "&$disabled": {
          backgroundColor: "transparent"
        }
      },
      "&$disabled": {
        color: t.palette.action.disabled
      }
    }),
    /* Styles applied to the span element that wraps the children. */
    label: {
      width: "100%",
      // Ensure the correct width for iOS Safari
      display: "inherit",
      alignItems: "inherit",
      justifyContent: "inherit"
    },
    /* Styles applied to the root element if `variant="text"`. */
    text: {
      padding: "6px 8px"
    },
    /* Styles applied to the root element if `variant="text"` and `color="primary"`. */
    textPrimary: {
      color: t.palette.primary.main,
      "&:hover": {
        backgroundColor: Le(t.palette.primary.main, t.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    /* Styles applied to the root element if `variant="text"` and `color="secondary"`. */
    textSecondary: {
      color: t.palette.secondary.main,
      "&:hover": {
        backgroundColor: Le(t.palette.secondary.main, t.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      padding: "5px 15px",
      border: "1px solid ".concat(t.palette.type === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"),
      "&$disabled": {
        border: "1px solid ".concat(t.palette.action.disabledBackground)
      }
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
    outlinedPrimary: {
      color: t.palette.primary.main,
      border: "1px solid ".concat(Le(t.palette.primary.main, 0.5)),
      "&:hover": {
        border: "1px solid ".concat(t.palette.primary.main),
        backgroundColor: Le(t.palette.primary.main, t.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      color: t.palette.secondary.main,
      border: "1px solid ".concat(Le(t.palette.secondary.main, 0.5)),
      "&:hover": {
        border: "1px solid ".concat(t.palette.secondary.main),
        backgroundColor: Le(t.palette.secondary.main, t.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      },
      "&$disabled": {
        border: "1px solid ".concat(t.palette.action.disabled)
      }
    },
    /* Styles applied to the root element if `variant="contained"`. */
    contained: {
      color: t.palette.getContrastText(t.palette.grey[300]),
      backgroundColor: t.palette.grey[300],
      boxShadow: t.shadows[2],
      "&:hover": {
        backgroundColor: t.palette.grey.A100,
        boxShadow: t.shadows[4],
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          boxShadow: t.shadows[2],
          backgroundColor: t.palette.grey[300]
        },
        "&$disabled": {
          backgroundColor: t.palette.action.disabledBackground
        }
      },
      "&$focusVisible": {
        boxShadow: t.shadows[6]
      },
      "&:active": {
        boxShadow: t.shadows[8]
      },
      "&$disabled": {
        color: t.palette.action.disabled,
        boxShadow: t.shadows[0],
        backgroundColor: t.palette.action.disabledBackground
      }
    },
    /* Styles applied to the root element if `variant="contained"` and `color="primary"`. */
    containedPrimary: {
      color: t.palette.primary.contrastText,
      backgroundColor: t.palette.primary.main,
      "&:hover": {
        backgroundColor: t.palette.primary.dark,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: t.palette.primary.main
        }
      }
    },
    /* Styles applied to the root element if `variant="contained"` and `color="secondary"`. */
    containedSecondary: {
      color: t.palette.secondary.contrastText,
      backgroundColor: t.palette.secondary.main,
      "&:hover": {
        backgroundColor: t.palette.secondary.dark,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: t.palette.secondary.main
        }
      }
    },
    /* Styles applied to the root element if `disableElevation={true}`. */
    disableElevation: {
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none"
      },
      "&$focusVisible": {
        boxShadow: "none"
      },
      "&:active": {
        boxShadow: "none"
      },
      "&$disabled": {
        boxShadow: "none"
      }
    },
    /* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
    focusVisible: {},
    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `color="inherit"`. */
    colorInherit: {
      color: "inherit",
      borderColor: "currentColor"
    },
    /* Styles applied to the root element if `size="small"` and `variant="text"`. */
    textSizeSmall: {
      padding: "4px 5px",
      fontSize: t.typography.pxToRem(13)
    },
    /* Styles applied to the root element if `size="large"` and `variant="text"`. */
    textSizeLarge: {
      padding: "8px 11px",
      fontSize: t.typography.pxToRem(15)
    },
    /* Styles applied to the root element if `size="small"` and `variant="outlined"`. */
    outlinedSizeSmall: {
      padding: "3px 9px",
      fontSize: t.typography.pxToRem(13)
    },
    /* Styles applied to the root element if `size="large"` and `variant="outlined"`. */
    outlinedSizeLarge: {
      padding: "7px 21px",
      fontSize: t.typography.pxToRem(15)
    },
    /* Styles applied to the root element if `size="small"` and `variant="contained"`. */
    containedSizeSmall: {
      padding: "4px 10px",
      fontSize: t.typography.pxToRem(13)
    },
    /* Styles applied to the root element if `size="large"` and `variant="contained"`. */
    containedSizeLarge: {
      padding: "8px 22px",
      fontSize: t.typography.pxToRem(15)
    },
    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {},
    /* Styles applied to the root element if `size="large"`. */
    sizeLarge: {},
    /* Styles applied to the root element if `fullWidth={true}`. */
    fullWidth: {
      width: "100%"
    },
    /* Styles applied to the startIcon element if supplied. */
    startIcon: {
      display: "inherit",
      marginRight: 8,
      marginLeft: -4,
      "&$iconSizeSmall": {
        marginLeft: -2
      }
    },
    /* Styles applied to the endIcon element if supplied. */
    endIcon: {
      display: "inherit",
      marginRight: -4,
      marginLeft: 8,
      "&$iconSizeSmall": {
        marginRight: -2
      }
    },
    /* Styles applied to the icon element if supplied and `size="small"`. */
    iconSizeSmall: {
      "& > *:first-child": {
        fontSize: 18
      }
    },
    /* Styles applied to the icon element if supplied and `size="medium"`. */
    iconSizeMedium: {
      "& > *:first-child": {
        fontSize: 20
      }
    },
    /* Styles applied to the icon element if supplied and `size="large"`. */
    iconSizeLarge: {
      "& > *:first-child": {
        fontSize: 22
      }
    }
  };
}, zm = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.children, n = t.classes, o = t.className, i = t.color, s = i === void 0 ? "default" : i, l = t.component, u = l === void 0 ? "button" : l, c = t.disabled, d = c === void 0 ? !1 : c, p = t.disableElevation, h = p === void 0 ? !1 : p, g = t.disableFocusRipple, m = g === void 0 ? !1 : g, v = t.endIcon, C = t.focusVisibleClassName, T = t.fullWidth, A = T === void 0 ? !1 : T, f = t.size, x = f === void 0 ? "medium" : f, k = t.startIcon, D = t.type, V = D === void 0 ? "button" : D, j = t.variant, M = j === void 0 ? "text" : j, I = Ve(t, ["children", "classes", "className", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"]), b = k && /* @__PURE__ */ _.createElement("span", {
    className: ge(n.startIcon, n["iconSize".concat(bt(x))])
  }, k), S = v && /* @__PURE__ */ _.createElement("span", {
    className: ge(n.endIcon, n["iconSize".concat(bt(x))])
  }, v);
  return /* @__PURE__ */ _.createElement(Nr, se({
    className: ge(n.root, n[M], o, s === "inherit" ? n.colorInherit : s !== "default" && n["".concat(M).concat(bt(s))], x !== "medium" && [n["".concat(M, "Size").concat(bt(x))], n["size".concat(bt(x))]], h && n.disableElevation, d && n.disabled, A && n.fullWidth),
    component: u,
    disabled: d,
    focusRipple: !m,
    focusVisibleClassName: ge(n.focusVisible, C),
    ref: a,
    type: V
  }, I), /* @__PURE__ */ _.createElement("span", {
    className: n.label
  }, b, r, S));
});
const Wm = St(Fm, {
  name: "MuiButton"
})(zm);
var Wa = _.createContext();
function kc() {
  return _.useContext(Wa);
}
function Vm() {
  return _.useContext(Wa);
}
const Hm = rr(/* @__PURE__ */ _.createElement("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}));
var Km = function(t) {
  var a = t.palette.type === "light" ? t.palette.grey[300] : t.palette.grey[700], r = Le(t.palette.text.primary, 0.26);
  return {
    /* Styles applied to the root element. */
    root: {
      fontFamily: t.typography.fontFamily,
      fontSize: t.typography.pxToRem(13),
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: 32,
      color: t.palette.getContrastText(a),
      backgroundColor: a,
      borderRadius: 32 / 2,
      whiteSpace: "nowrap",
      transition: t.transitions.create(["background-color", "box-shadow"]),
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: "default",
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      textDecoration: "none",
      border: "none",
      // Remove `button` border
      padding: 0,
      // Remove `button` padding
      verticalAlign: "middle",
      boxSizing: "border-box",
      "&$disabled": {
        opacity: 0.5,
        pointerEvents: "none"
      },
      "& $avatar": {
        marginLeft: 5,
        marginRight: -6,
        width: 24,
        height: 24,
        color: t.palette.type === "light" ? t.palette.grey[700] : t.palette.grey[300],
        fontSize: t.typography.pxToRem(12)
      },
      "& $avatarColorPrimary": {
        color: t.palette.primary.contrastText,
        backgroundColor: t.palette.primary.dark
      },
      "& $avatarColorSecondary": {
        color: t.palette.secondary.contrastText,
        backgroundColor: t.palette.secondary.dark
      },
      "& $avatarSmall": {
        marginLeft: 4,
        marginRight: -4,
        width: 18,
        height: 18,
        fontSize: t.typography.pxToRem(10)
      }
    },
    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      height: 24
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      backgroundColor: t.palette.primary.main,
      color: t.palette.primary.contrastText
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      backgroundColor: t.palette.secondary.main,
      color: t.palette.secondary.contrastText
    },
    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `onClick` is defined or `clickable={true}`. */
    clickable: {
      userSelect: "none",
      WebkitTapHighlightColor: "transparent",
      cursor: "pointer",
      "&:hover, &:focus": {
        backgroundColor: Xr(a, 0.08)
      },
      "&:active": {
        boxShadow: t.shadows[1]
      }
    },
    /* Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`. */
    clickableColorPrimary: {
      "&:hover, &:focus": {
        backgroundColor: Xr(t.palette.primary.main, 0.08)
      }
    },
    /* Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`. */
    clickableColorSecondary: {
      "&:hover, &:focus": {
        backgroundColor: Xr(t.palette.secondary.main, 0.08)
      }
    },
    /* Styles applied to the root element if `onDelete` is defined. */
    deletable: {
      "&:focus": {
        backgroundColor: Xr(a, 0.08)
      }
    },
    /* Styles applied to the root element if `onDelete` and `color="primary"` is defined. */
    deletableColorPrimary: {
      "&:focus": {
        backgroundColor: Xr(t.palette.primary.main, 0.2)
      }
    },
    /* Styles applied to the root element if `onDelete` and `color="secondary"` is defined. */
    deletableColorSecondary: {
      "&:focus": {
        backgroundColor: Xr(t.palette.secondary.main, 0.2)
      }
    },
    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      backgroundColor: "transparent",
      border: "1px solid ".concat(t.palette.type === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"),
      "$clickable&:hover, $clickable&:focus, $deletable&:focus": {
        backgroundColor: Le(t.palette.text.primary, t.palette.action.hoverOpacity)
      },
      "& $avatar": {
        marginLeft: 4
      },
      "& $avatarSmall": {
        marginLeft: 2
      },
      "& $icon": {
        marginLeft: 4
      },
      "& $iconSmall": {
        marginLeft: 2
      },
      "& $deleteIcon": {
        marginRight: 5
      },
      "& $deleteIconSmall": {
        marginRight: 3
      }
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
    outlinedPrimary: {
      color: t.palette.primary.main,
      border: "1px solid ".concat(t.palette.primary.main),
      "$clickable&:hover, $clickable&:focus, $deletable&:focus": {
        backgroundColor: Le(t.palette.primary.main, t.palette.action.hoverOpacity)
      }
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      color: t.palette.secondary.main,
      border: "1px solid ".concat(t.palette.secondary.main),
      "$clickable&:hover, $clickable&:focus, $deletable&:focus": {
        backgroundColor: Le(t.palette.secondary.main, t.palette.action.hoverOpacity)
      }
    },
    // TODO v5: remove
    /* Styles applied to the `avatar` element. */
    avatar: {},
    /* Styles applied to the `avatar` element if `size="small"`. */
    avatarSmall: {},
    /* Styles applied to the `avatar` element if `color="primary"`. */
    avatarColorPrimary: {},
    /* Styles applied to the `avatar` element if `color="secondary"`. */
    avatarColorSecondary: {},
    /* Styles applied to the `icon` element. */
    icon: {
      color: t.palette.type === "light" ? t.palette.grey[700] : t.palette.grey[300],
      marginLeft: 5,
      marginRight: -6
    },
    /* Styles applied to the `icon` element if `size="small"`. */
    iconSmall: {
      width: 18,
      height: 18,
      marginLeft: 4,
      marginRight: -4
    },
    /* Styles applied to the `icon` element if `color="primary"`. */
    iconColorPrimary: {
      color: "inherit"
    },
    /* Styles applied to the `icon` element if `color="secondary"`. */
    iconColorSecondary: {
      color: "inherit"
    },
    /* Styles applied to the label `span` element. */
    label: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      paddingLeft: 12,
      paddingRight: 12,
      whiteSpace: "nowrap"
    },
    /* Styles applied to the label `span` element if `size="small"`. */
    labelSmall: {
      paddingLeft: 8,
      paddingRight: 8
    },
    /* Styles applied to the `deleteIcon` element. */
    deleteIcon: {
      WebkitTapHighlightColor: "transparent",
      color: r,
      height: 22,
      width: 22,
      cursor: "pointer",
      margin: "0 5px 0 -6px",
      "&:hover": {
        color: Le(r, 0.4)
      }
    },
    /* Styles applied to the `deleteIcon` element if `size="small"`. */
    deleteIconSmall: {
      height: 16,
      width: 16,
      marginRight: 4,
      marginLeft: -4
    },
    /* Styles applied to the deleteIcon element if `color="primary"` and `variant="default"`. */
    deleteIconColorPrimary: {
      color: Le(t.palette.primary.contrastText, 0.7),
      "&:hover, &:active": {
        color: t.palette.primary.contrastText
      }
    },
    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="default"`. */
    deleteIconColorSecondary: {
      color: Le(t.palette.secondary.contrastText, 0.7),
      "&:hover, &:active": {
        color: t.palette.secondary.contrastText
      }
    },
    /* Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`. */
    deleteIconOutlinedColorPrimary: {
      color: Le(t.palette.primary.main, 0.7),
      "&:hover, &:active": {
        color: t.palette.primary.main
      }
    },
    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`. */
    deleteIconOutlinedColorSecondary: {
      color: Le(t.palette.secondary.main, 0.7),
      "&:hover, &:active": {
        color: t.palette.secondary.main
      }
    }
  };
};
function Xs(e) {
  return e.key === "Backspace" || e.key === "Delete";
}
var qm = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.avatar, n = t.classes, o = t.className, i = t.clickable, s = t.color, l = s === void 0 ? "default" : s, u = t.component, c = t.deleteIcon, d = t.disabled, p = d === void 0 ? !1 : d, h = t.icon, g = t.label, m = t.onClick, v = t.onDelete, C = t.onKeyDown, T = t.onKeyUp, A = t.size, f = A === void 0 ? "medium" : A, x = t.variant, k = x === void 0 ? "default" : x, D = Ve(t, ["avatar", "classes", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant"]), V = _.useRef(null), j = Tt(V, a), M = function(re) {
    re.stopPropagation(), v && v(re);
  }, I = function(re) {
    re.currentTarget === re.target && Xs(re) && re.preventDefault(), C && C(re);
  }, b = function(re) {
    re.currentTarget === re.target && (v && Xs(re) ? v(re) : re.key === "Escape" && V.current && V.current.blur()), T && T(re);
  }, S = i !== !1 && m ? !0 : i, L = f === "small", N = u || (S ? Nr : "div"), R = N === Nr ? {
    component: "div"
  } : {}, U = null;
  if (v) {
    var B = ge(l !== "default" && (k === "default" ? n["deleteIconColor".concat(bt(l))] : n["deleteIconOutlinedColor".concat(bt(l))]), L && n.deleteIconSmall);
    U = c && /* @__PURE__ */ _.isValidElement(c) ? /* @__PURE__ */ _.cloneElement(c, {
      className: ge(c.props.className, n.deleteIcon, B),
      onClick: M
    }) : /* @__PURE__ */ _.createElement(Hm, {
      className: ge(n.deleteIcon, B),
      onClick: M
    });
  }
  var J = null;
  r && /* @__PURE__ */ _.isValidElement(r) && (J = /* @__PURE__ */ _.cloneElement(r, {
    className: ge(n.avatar, r.props.className, L && n.avatarSmall, l !== "default" && n["avatarColor".concat(bt(l))])
  }));
  var W = null;
  return h && /* @__PURE__ */ _.isValidElement(h) && (W = /* @__PURE__ */ _.cloneElement(h, {
    className: ge(n.icon, h.props.className, L && n.iconSmall, l !== "default" && n["iconColor".concat(bt(l))])
  })), /* @__PURE__ */ _.createElement(N, se({
    role: S || v ? "button" : void 0,
    className: ge(n.root, o, l !== "default" && [n["color".concat(bt(l))], S && n["clickableColor".concat(bt(l))], v && n["deletableColor".concat(bt(l))]], k !== "default" && [n.outlined, {
      primary: n.outlinedPrimary,
      secondary: n.outlinedSecondary
    }[l]], p && n.disabled, L && n.sizeSmall, S && n.clickable, v && n.deletable),
    "aria-disabled": p ? !0 : void 0,
    tabIndex: S || v ? 0 : void 0,
    onClick: m,
    onKeyDown: I,
    onKeyUp: b,
    ref: j
  }, R, D), J || W, /* @__PURE__ */ _.createElement("span", {
    className: ge(n.label, L && n.labelSmall)
  }, g), U);
});
const Um = St(Km, {
  name: "MuiChip"
})(qm);
var hr = 44, Gm = function(t) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: "inline-block"
    },
    /* Styles applied to the root element if `variant="static"`. */
    static: {
      transition: t.transitions.create("transform")
    },
    /* Styles applied to the root element if `variant="indeterminate"`. */
    indeterminate: {
      animation: "$circular-rotate 1.4s linear infinite"
    },
    /* Styles applied to the root element if `variant="determinate"`. */
    determinate: {
      transition: t.transitions.create("transform")
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      color: t.palette.primary.main
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: t.palette.secondary.main
    },
    /* Styles applied to the `svg` element. */
    svg: {
      display: "block"
      // Keeps the progress centered
    },
    /* Styles applied to the `circle` svg path. */
    circle: {
      stroke: "currentColor"
      // Use butt to follow the specification, by chance, it's already the default CSS value.
      // strokeLinecap: 'butt',
    },
    /* Styles applied to the `circle` svg path if `variant="static"`. */
    circleStatic: {
      transition: t.transitions.create("stroke-dashoffset")
    },
    /* Styles applied to the `circle` svg path if `variant="indeterminate"`. */
    circleIndeterminate: {
      animation: "$circular-dash 1.4s ease-in-out infinite",
      // Some default value that looks fine waiting for the animation to kicks in.
      strokeDasharray: "80px, 200px",
      strokeDashoffset: "0px"
      // Add the unit to fix a Edge 16 and below bug.
    },
    /* Styles applied to the `circle` svg path if `variant="determinate"`. */
    circleDeterminate: {
      transition: t.transitions.create("stroke-dashoffset")
    },
    "@keyframes circular-rotate": {
      "0%": {
        // Fix IE 11 wobbly
        transformOrigin: "50% 50%"
      },
      "100%": {
        transform: "rotate(360deg)"
      }
    },
    "@keyframes circular-dash": {
      "0%": {
        strokeDasharray: "1px, 200px",
        strokeDashoffset: "0px"
      },
      "50%": {
        strokeDasharray: "100px, 200px",
        strokeDashoffset: "-15px"
      },
      "100%": {
        strokeDasharray: "100px, 200px",
        strokeDashoffset: "-125px"
      }
    },
    /* Styles applied to the `circle` svg path if `disableShrink={true}`. */
    circleDisableShrink: {
      animation: "none"
    }
  };
}, Ym = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.classes, n = t.className, o = t.color, i = o === void 0 ? "primary" : o, s = t.disableShrink, l = s === void 0 ? !1 : s, u = t.size, c = u === void 0 ? 40 : u, d = t.style, p = t.thickness, h = p === void 0 ? 3.6 : p, g = t.value, m = g === void 0 ? 0 : g, v = t.variant, C = v === void 0 ? "indeterminate" : v, T = Ve(t, ["classes", "className", "color", "disableShrink", "size", "style", "thickness", "value", "variant"]), A = {}, f = {}, x = {};
  if (C === "determinate" || C === "static") {
    var k = 2 * Math.PI * ((hr - h) / 2);
    A.strokeDasharray = k.toFixed(3), x["aria-valuenow"] = Math.round(m), A.strokeDashoffset = "".concat(((100 - m) / 100 * k).toFixed(3), "px"), f.transform = "rotate(-90deg)";
  }
  return /* @__PURE__ */ _.createElement("div", se({
    className: ge(r.root, n, i !== "inherit" && r["color".concat(bt(i))], {
      determinate: r.determinate,
      indeterminate: r.indeterminate,
      static: r.static
    }[C]),
    style: se({
      width: c,
      height: c
    }, f, d),
    ref: a,
    role: "progressbar"
  }, x, T), /* @__PURE__ */ _.createElement("svg", {
    className: r.svg,
    viewBox: "".concat(hr / 2, " ").concat(hr / 2, " ").concat(hr, " ").concat(hr)
  }, /* @__PURE__ */ _.createElement("circle", {
    className: ge(r.circle, l && r.circleDisableShrink, {
      determinate: r.circleDeterminate,
      indeterminate: r.circleIndeterminate,
      static: r.circleStatic
    }[C]),
    style: A,
    cx: hr,
    cy: hr,
    r: (hr - h) / 2,
    fill: "none",
    strokeWidth: h
  })));
});
const Va = St(Gm, {
  name: "MuiCircularProgress",
  flip: !1
})(Ym);
function Xm(e) {
  return e = typeof e == "function" ? e() : e, Vn.findDOMNode(e);
}
var No = typeof window < "u" ? _.useLayoutEffect : _.useEffect, Jm = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.children, n = t.container, o = t.disablePortal, i = o === void 0 ? !1 : o, s = t.onRendered, l = _.useState(null), u = l[0], c = l[1], d = Tt(/* @__PURE__ */ _.isValidElement(r) ? r.ref : null, a);
  return No(function() {
    i || c(Xm(n) || document.body);
  }, [n, i]), No(function() {
    if (u && !i)
      return fn(a, u), function() {
        fn(a, null);
      };
  }, [a, u, i]), No(function() {
    s && (u || i) && s();
  }, [s, u, i]), i ? /* @__PURE__ */ _.isValidElement(r) ? /* @__PURE__ */ _.cloneElement(r, {
    ref: d
  }) : r : u && /* @__PURE__ */ Vn.createPortal(r, u);
}), Zm = function(t) {
  return {
    /* Styles applied to the root element. */
    root: {
      height: 1,
      margin: 0,
      // Reset browser default style.
      border: "none",
      flexShrink: 0,
      backgroundColor: t.palette.divider
    },
    /* Styles applied to the root element if `absolute={true}`. */
    absolute: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%"
    },
    /* Styles applied to the root element if `variant="inset"`. */
    inset: {
      marginLeft: 72
    },
    /* Styles applied to the root element if `light={true}`. */
    light: {
      backgroundColor: Le(t.palette.divider, 0.08)
    },
    /* Styles applied to the root element if `variant="middle"`. */
    middle: {
      marginLeft: t.spacing(2),
      marginRight: t.spacing(2)
    },
    /* Styles applied to the root element if `orientation="vertical"`. */
    vertical: {
      height: "100%",
      width: 1
    },
    /* Styles applied to the root element if `flexItem={true}`. */
    flexItem: {
      alignSelf: "stretch",
      height: "auto"
    }
  };
}, Qm = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.absolute, n = r === void 0 ? !1 : r, o = t.classes, i = t.className, s = t.component, l = s === void 0 ? "hr" : s, u = t.flexItem, c = u === void 0 ? !1 : u, d = t.light, p = d === void 0 ? !1 : d, h = t.orientation, g = h === void 0 ? "horizontal" : h, m = t.role, v = m === void 0 ? l !== "hr" ? "separator" : void 0 : m, C = t.variant, T = C === void 0 ? "fullWidth" : C, A = Ve(t, ["absolute", "classes", "className", "component", "flexItem", "light", "orientation", "role", "variant"]);
  return /* @__PURE__ */ _.createElement(l, se({
    className: ge(o.root, i, T !== "fullWidth" && o[T], n && o.absolute, c && o.flexItem, p && o.light, g === "vertical" && o.vertical),
    role: v,
    ref: a
  }, A));
});
const eg = St(Zm, {
  name: "MuiDivider"
})(Qm);
function $c(e) {
  var t = e.props, a = e.states, r = e.muiFormControl;
  return a.reduce(function(n, o) {
    return n[o] = t[o], r && typeof t[o] > "u" && (n[o] = r[o]), n;
  }, {});
}
function sa(e, t) {
  return parseInt(e[t], 10) || 0;
}
var tg = typeof window < "u" ? _.useLayoutEffect : _.useEffect, rg = {
  /* Styles applied to the shadow textarea element. */
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: "hidden",
    // Remove from the content flow
    position: "absolute",
    // Ignore the scrollbar width
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: "translateZ(0)"
  }
}, ng = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.onChange, n = t.rows, o = t.rowsMax, i = t.rowsMin, s = t.maxRows, l = t.minRows, u = l === void 0 ? 1 : l, c = t.style, d = t.value, p = Ve(t, ["onChange", "rows", "rowsMax", "rowsMin", "maxRows", "minRows", "style", "value"]), h = s || o, g = n || i || u, m = _.useRef(d != null), v = m.current, C = _.useRef(null), T = Tt(a, C), A = _.useRef(null), f = _.useRef(0), x = _.useState({}), k = x[0], D = x[1], V = _.useCallback(function() {
    var M = C.current, I = window.getComputedStyle(M), b = A.current;
    b.style.width = I.width, b.value = M.value || t.placeholder || "x", b.value.slice(-1) === `
` && (b.value += " ");
    var S = I["box-sizing"], L = sa(I, "padding-bottom") + sa(I, "padding-top"), N = sa(I, "border-bottom-width") + sa(I, "border-top-width"), R = b.scrollHeight - L;
    b.value = "x";
    var U = b.scrollHeight - L, B = R;
    g && (B = Math.max(Number(g) * U, B)), h && (B = Math.min(Number(h) * U, B)), B = Math.max(B, U);
    var J = B + (S === "border-box" ? L + N : 0), W = Math.abs(B - R) <= 1;
    D(function(ae) {
      return f.current < 20 && (J > 0 && Math.abs((ae.outerHeightStyle || 0) - J) > 1 || ae.overflow !== W) ? (f.current += 1, {
        overflow: W,
        outerHeightStyle: J
      }) : ae;
    });
  }, [h, g, t.placeholder]);
  _.useEffect(function() {
    var M = Ra(function() {
      f.current = 0, V();
    });
    return window.addEventListener("resize", M), function() {
      M.clear(), window.removeEventListener("resize", M);
    };
  }, [V]), tg(function() {
    V();
  }), _.useEffect(function() {
    f.current = 0;
  }, [d]);
  var j = function(I) {
    f.current = 0, v || V(), r && r(I);
  };
  return /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("textarea", se({
    value: d,
    onChange: j,
    ref: T,
    rows: g,
    style: se({
      height: k.outerHeightStyle,
      // Need a large enough difference to allow scrolling.
      // This prevents infinite rendering loop.
      overflow: k.overflow ? "hidden" : null
    }, c)
  }, p)), /* @__PURE__ */ _.createElement("textarea", {
    "aria-hidden": !0,
    className: t.className,
    readOnly: !0,
    ref: A,
    tabIndex: -1,
    style: se({}, rg.shadow, c)
  }));
});
function Js(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function ag(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  return e && (Js(e.value) && e.value !== "" || t && Js(e.defaultValue) && e.defaultValue !== "");
}
var og = function(t) {
  var a = t.palette.type === "light", r = {
    color: "currentColor",
    opacity: a ? 0.42 : 0.5,
    transition: t.transitions.create("opacity", {
      duration: t.transitions.duration.shorter
    })
  }, n = {
    opacity: "0 !important"
  }, o = {
    opacity: a ? 0.42 : 0.5
  };
  return {
    "@global": {
      "@keyframes mui-auto-fill": {},
      "@keyframes mui-auto-fill-cancel": {}
    },
    /* Styles applied to the root element. */
    root: se({}, t.typography.body1, {
      color: t.palette.text.primary,
      lineHeight: "1.1876em",
      // Reset (19px), match the native input line-height
      boxSizing: "border-box",
      // Prevent padding issue with fullWidth.
      position: "relative",
      cursor: "text",
      display: "inline-flex",
      alignItems: "center",
      "&$disabled": {
        color: t.palette.text.disabled,
        cursor: "default"
      }
    }),
    /* Styles applied to the root element if the component is a descendant of `FormControl`. */
    formControl: {},
    /* Styles applied to the root element if the component is focused. */
    focused: {},
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `startAdornment` is provided. */
    adornedStart: {},
    /* Styles applied to the root element if `endAdornment` is provided. */
    adornedEnd: {},
    /* Pseudo-class applied to the root element if `error={true}`. */
    error: {},
    /* Styles applied to the `input` element if `margin="dense"`. */
    marginDense: {},
    /* Styles applied to the root element if `multiline={true}`. */
    multiline: {
      padding: "".concat(6, "px 0 ").concat(7, "px"),
      "&$marginDense": {
        paddingTop: 3
      }
    },
    /* Styles applied to the root element if the color is secondary. */
    colorSecondary: {},
    /* Styles applied to the root element if `fullWidth={true}`. */
    fullWidth: {
      width: "100%"
    },
    /* Styles applied to the `input` element. */
    input: {
      font: "inherit",
      letterSpacing: "inherit",
      color: "currentColor",
      padding: "".concat(6, "px 0 ").concat(7, "px"),
      border: 0,
      boxSizing: "content-box",
      background: "none",
      height: "1.1876em",
      // Reset (19px), match the native input line-height
      margin: 0,
      // Reset for Safari
      WebkitTapHighlightColor: "transparent",
      display: "block",
      // Make the flex item shrink with Firefox
      minWidth: 0,
      width: "100%",
      // Fix IE 11 width issue
      animationName: "mui-auto-fill-cancel",
      animationDuration: "10ms",
      "&::-webkit-input-placeholder": r,
      "&::-moz-placeholder": r,
      // Firefox 19+
      "&:-ms-input-placeholder": r,
      // IE 11
      "&::-ms-input-placeholder": r,
      // Edge
      "&:focus": {
        outline: 0
      },
      // Reset Firefox invalid required input style
      "&:invalid": {
        boxShadow: "none"
      },
      "&::-webkit-search-decoration": {
        // Remove the padding when type=search.
        "-webkit-appearance": "none"
      },
      // Show and hide the placeholder logic
      "label[data-shrink=false] + $formControl &": {
        "&::-webkit-input-placeholder": n,
        "&::-moz-placeholder": n,
        // Firefox 19+
        "&:-ms-input-placeholder": n,
        // IE 11
        "&::-ms-input-placeholder": n,
        // Edge
        "&:focus::-webkit-input-placeholder": o,
        "&:focus::-moz-placeholder": o,
        // Firefox 19+
        "&:focus:-ms-input-placeholder": o,
        // IE 11
        "&:focus::-ms-input-placeholder": o
        // Edge
      },
      "&$disabled": {
        opacity: 1
        // Reset iOS opacity
      },
      "&:-webkit-autofill": {
        animationDuration: "5000s",
        animationName: "mui-auto-fill"
      }
    },
    /* Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense: {
      paddingTop: 3
    },
    /* Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline: {
      height: "auto",
      resize: "none",
      padding: 0
    },
    /* Styles applied to the `input` element if `type="search"`. */
    inputTypeSearch: {
      // Improve type search style.
      "-moz-appearance": "textfield",
      "-webkit-appearance": "textfield"
    },
    /* Styles applied to the `input` element if `startAdornment` is provided. */
    inputAdornedStart: {},
    /* Styles applied to the `input` element if `endAdornment` is provided. */
    inputAdornedEnd: {},
    /* Styles applied to the `input` element if `hiddenLabel={true}`. */
    inputHiddenLabel: {}
  };
}, ig = typeof window > "u" ? _.useEffect : _.useLayoutEffect, sg = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t["aria-describedby"], n = t.autoComplete, o = t.autoFocus, i = t.classes, s = t.className;
  t.color;
  var l = t.defaultValue, u = t.disabled, c = t.endAdornment;
  t.error;
  var d = t.fullWidth, p = d === void 0 ? !1 : d, h = t.id, g = t.inputComponent, m = g === void 0 ? "input" : g, v = t.inputProps, C = v === void 0 ? {} : v, T = t.inputRef;
  t.margin;
  var A = t.multiline, f = A === void 0 ? !1 : A, x = t.name, k = t.onBlur, D = t.onChange, V = t.onClick, j = t.onFocus, M = t.onKeyDown, I = t.onKeyUp, b = t.placeholder, S = t.readOnly, L = t.renderSuffix, N = t.rows, R = t.rowsMax, U = t.rowsMin, B = t.maxRows, J = t.minRows, W = t.startAdornment, ae = t.type, re = ae === void 0 ? "text" : ae, de = t.value, pe = Ve(t, ["aria-describedby", "autoComplete", "autoFocus", "classes", "className", "color", "defaultValue", "disabled", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "rowsMax", "rowsMin", "maxRows", "minRows", "startAdornment", "type", "value"]), Se = C.value != null ? C.value : de, fe = _.useRef(Se != null), ce = fe.current, ue = _.useRef(), me = _.useCallback(function(X) {
  }, []), be = Tt(C.ref, me), Pe = Tt(T, be), De = Tt(ue, Pe), ze = _.useState(!1), We = ze[0], ht = ze[1], je = kc(), He = $c({
    props: t,
    muiFormControl: je,
    states: ["color", "disabled", "error", "hiddenLabel", "margin", "required", "filled"]
  });
  He.focused = je ? je.focused : We, _.useEffect(function() {
    !je && u && We && (ht(!1), k && k());
  }, [je, u, We, k]);
  var Ge = je && je.onFilled, Ue = je && je.onEmpty, gt = _.useCallback(function(X) {
    ag(X) ? Ge && Ge() : Ue && Ue();
  }, [Ge, Ue]);
  ig(function() {
    ce && gt({
      value: Se
    });
  }, [Se, gt, ce]);
  var mt = function(ne) {
    if (He.disabled) {
      ne.stopPropagation();
      return;
    }
    j && j(ne), C.onFocus && C.onFocus(ne), je && je.onFocus ? je.onFocus(ne) : ht(!0);
  }, lt = function(ne) {
    k && k(ne), C.onBlur && C.onBlur(ne), je && je.onBlur ? je.onBlur(ne) : ht(!1);
  }, Ye = function(ne) {
    if (!ce) {
      var he = ne.target || ue.current;
      if (he == null)
        throw new Error(Dn(1));
      gt({
        value: he.value
      });
    }
    for (var $e = arguments.length, ke = new Array($e > 1 ? $e - 1 : 0), _e = 1; _e < $e; _e++)
      ke[_e - 1] = arguments[_e];
    C.onChange && C.onChange.apply(C, [ne].concat(ke)), D && D.apply(void 0, [ne].concat(ke));
  };
  _.useEffect(function() {
    gt(ue.current);
  }, []);
  var ft = function(ne) {
    ue.current && ne.currentTarget === ne.target && ue.current.focus(), V && V(ne);
  }, Z = m, z = se({}, C, {
    ref: De
  });
  typeof Z != "string" ? z = se({
    // Rename ref to inputRef as we don't know the
    // provided `inputComponent` structure.
    inputRef: De,
    type: re
  }, z, {
    ref: null
  }) : f ? N && !B && !J && !R && !U ? Z = "textarea" : (z = se({
    minRows: N || J,
    rowsMax: R,
    maxRows: B
  }, z), Z = ng) : z = se({
    type: re
  }, z);
  var H = function(ne) {
    gt(ne.animationName === "mui-auto-fill-cancel" ? ue.current : {
      value: "x"
    });
  };
  return _.useEffect(function() {
    je && je.setAdornedStart(!!W);
  }, [je, W]), /* @__PURE__ */ _.createElement("div", se({
    className: ge(i.root, i["color".concat(bt(He.color || "primary"))], s, He.disabled && i.disabled, He.error && i.error, p && i.fullWidth, He.focused && i.focused, je && i.formControl, f && i.multiline, W && i.adornedStart, c && i.adornedEnd, He.margin === "dense" && i.marginDense),
    onClick: ft,
    ref: a
  }, pe), W, /* @__PURE__ */ _.createElement(Wa.Provider, {
    value: null
  }, /* @__PURE__ */ _.createElement(Z, se({
    "aria-invalid": He.error,
    "aria-describedby": r,
    autoComplete: n,
    autoFocus: o,
    defaultValue: l,
    disabled: He.disabled,
    id: h,
    onAnimationStart: H,
    name: x,
    placeholder: b,
    readOnly: S,
    required: He.required,
    rows: N,
    value: Se,
    onKeyDown: M,
    onKeyUp: I
  }, z, {
    className: ge(i.input, C.className, He.disabled && i.disabled, f && i.inputMultiline, He.hiddenLabel && i.inputHiddenLabel, W && i.inputAdornedStart, c && i.inputAdornedEnd, re === "search" && i.inputTypeSearch, He.margin === "dense" && i.inputMarginDense),
    onBlur: lt,
    onChange: Ye,
    onFocus: mt
  }))), c, L ? L(se({}, He, {
    startAdornment: W
  })) : null);
});
const lg = St(og, {
  name: "MuiInputBase"
})(sg);
var cg = function(t) {
  return {
    /* Styles applied to the root element. */
    root: se({
      color: t.palette.text.secondary
    }, t.typography.caption, {
      textAlign: "left",
      marginTop: 3,
      margin: 0,
      "&$disabled": {
        color: t.palette.text.disabled
      },
      "&$error": {
        color: t.palette.error.main
      }
    }),
    /* Pseudo-class applied to the root element if `error={true}`. */
    error: {},
    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `margin="dense"`. */
    marginDense: {
      marginTop: 4
    },
    /* Styles applied to the root element if `variant="filled"` or `variant="outlined"`. */
    contained: {
      marginLeft: 14,
      marginRight: 14
    },
    /* Pseudo-class applied to the root element if `focused={true}`. */
    focused: {},
    /* Pseudo-class applied to the root element if `filled={true}`. */
    filled: {},
    /* Pseudo-class applied to the root element if `required={true}`. */
    required: {}
  };
}, ug = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.children, n = t.classes, o = t.className, i = t.component, s = i === void 0 ? "p" : i;
  t.disabled, t.error, t.filled, t.focused, t.margin, t.required, t.variant;
  var l = Ve(t, ["children", "classes", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"]), u = Vm(), c = $c({
    props: t,
    muiFormControl: u,
    states: ["variant", "margin", "disabled", "error", "filled", "focused", "required"]
  });
  return /* @__PURE__ */ _.createElement(s, se({
    className: ge(n.root, (c.variant === "filled" || c.variant === "outlined") && n.contained, o, c.disabled && n.disabled, c.error && n.error, c.filled && n.filled, c.focused && n.focused, c.required && n.required, c.margin === "dense" && n.marginDense),
    ref: a
  }, l), r === " " ? (
    // eslint-disable-next-line react/no-danger
    /* @__PURE__ */ _.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: "&#8203;"
      }
    })
  ) : r);
});
const Zs = St(cg, {
  name: "MuiFormHelperText"
})(ug);
function pi(e) {
  return "scale(".concat(e, ", ").concat(Math.pow(e, 2), ")");
}
var dg = {
  entering: {
    opacity: 1,
    transform: pi(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Rc = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.children, n = t.disableStrictModeCompat, o = n === void 0 ? !1 : n, i = t.in, s = t.onEnter, l = t.onEntered, u = t.onEntering, c = t.onExit, d = t.onExited, p = t.onExiting, h = t.style, g = t.timeout, m = g === void 0 ? "auto" : g, v = t.TransitionComponent, C = v === void 0 ? nr : v, T = Ve(t, ["children", "disableStrictModeCompat", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"]), A = _.useRef(), f = _.useRef(), x = Fa(), k = x.unstable_strictMode && !o, D = _.useRef(null), V = Tt(r.ref, a), j = Tt(k ? D : void 0, V), M = function(J) {
    return function(W, ae) {
      if (J) {
        var re = k ? [D.current, W] : [W, ae], de = Kn(re, 2), pe = de[0], Se = de[1];
        Se === void 0 ? J(pe) : J(pe, Se);
      }
    };
  }, I = M(u), b = M(function(B, J) {
    fm(B);
    var W = Oa({
      style: h,
      timeout: m
    }, {
      mode: "enter"
    }), ae = W.duration, re = W.delay, de;
    m === "auto" ? (de = x.transitions.getAutoHeightDuration(B.clientHeight), f.current = de) : de = ae, B.style.transition = [x.transitions.create("opacity", {
      duration: de,
      delay: re
    }), x.transitions.create("transform", {
      duration: de * 0.666,
      delay: re
    })].join(","), s && s(B, J);
  }), S = M(l), L = M(p), N = M(function(B) {
    var J = Oa({
      style: h,
      timeout: m
    }, {
      mode: "exit"
    }), W = J.duration, ae = J.delay, re;
    m === "auto" ? (re = x.transitions.getAutoHeightDuration(B.clientHeight), f.current = re) : re = W, B.style.transition = [x.transitions.create("opacity", {
      duration: re,
      delay: ae
    }), x.transitions.create("transform", {
      duration: re * 0.666,
      delay: ae || re * 0.333
    })].join(","), B.style.opacity = "0", B.style.transform = pi(0.75), c && c(B);
  }), R = M(d), U = function(J, W) {
    var ae = k ? J : W;
    m === "auto" && (A.current = setTimeout(ae, f.current || 0));
  };
  return _.useEffect(function() {
    return function() {
      clearTimeout(A.current);
    };
  }, []), /* @__PURE__ */ _.createElement(C, se({
    appear: !0,
    in: i,
    nodeRef: k ? D : void 0,
    onEnter: b,
    onEntered: S,
    onEntering: I,
    onExit: N,
    onExited: R,
    onExiting: L,
    addEndListener: U,
    timeout: m === "auto" ? null : m
  }, T), function(B, J) {
    return /* @__PURE__ */ _.cloneElement(r, se({
      style: se({
        opacity: 0,
        transform: pi(0.75),
        visibility: B === "exited" && !i ? "hidden" : void 0
      }, dg[B], h, r.props.style),
      ref: j
    }, J));
  });
});
Rc.muiSupportAuto = !0;
var fg = {
  /* Styles applied to the root element. */
  root: {
    display: "flex",
    height: "0.01em",
    // Fix IE 11 flexbox alignment. To remove at some point.
    maxHeight: "2em",
    alignItems: "center",
    whiteSpace: "nowrap"
  },
  /* Styles applied to the root element if `variant="filled"`. */
  filled: {
    "&$positionStart:not($hiddenLabel)": {
      marginTop: 16
    }
  },
  /* Styles applied to the root element if `position="start"`. */
  positionStart: {
    marginRight: 8
  },
  /* Styles applied to the root element if `position="end"`. */
  positionEnd: {
    marginLeft: 8
  },
  /* Styles applied to the root element if `disablePointerEvents=true`. */
  disablePointerEvents: {
    pointerEvents: "none"
  },
  /* Styles applied if the adornment is used inside <FormControl hiddenLabel />. */
  hiddenLabel: {},
  /* Styles applied if the adornment is used inside <FormControl margin="dense" />. */
  marginDense: {}
}, pg = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.children, n = t.classes, o = t.className, i = t.component, s = i === void 0 ? "div" : i, l = t.disablePointerEvents, u = l === void 0 ? !1 : l, c = t.disableTypography, d = c === void 0 ? !1 : c, p = t.position, h = t.variant, g = Ve(t, ["children", "classes", "className", "component", "disablePointerEvents", "disableTypography", "position", "variant"]), m = kc() || {}, v = h;
  return h && m.variant, m && !v && (v = m.variant), /* @__PURE__ */ _.createElement(Wa.Provider, {
    value: null
  }, /* @__PURE__ */ _.createElement(s, se({
    className: ge(n.root, o, p === "end" ? n.positionEnd : n.positionStart, u && n.disablePointerEvents, m.hiddenLabel && n.hiddenLabel, v === "filled" && n.filled, m.margin === "dense" && n.marginDense),
    ref: a
  }, g), typeof r == "string" && !d ? /* @__PURE__ */ _.createElement(Ht, {
    color: "textSecondary"
  }, r) : r));
});
const hg = St(fg, {
  name: "MuiInputAdornment"
})(pg);
var mg = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `underline="none"`. */
  underlineNone: {
    textDecoration: "none"
  },
  /* Styles applied to the root element if `underline="hover"`. */
  underlineHover: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  /* Styles applied to the root element if `underline="always"`. */
  underlineAlways: {
    textDecoration: "underline"
  },
  // Same reset as ButtonBase.root
  /* Styles applied to the root element if `component="button"`. */
  button: {
    position: "relative",
    WebkitTapHighlightColor: "transparent",
    backgroundColor: "transparent",
    // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0,
    // Remove the margin in Safari
    borderRadius: 0,
    padding: 0,
    // Remove the padding in Firefox
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    "-moz-appearance": "none",
    // Reset
    "-webkit-appearance": "none",
    // Reset
    "&::-moz-focus-inner": {
      borderStyle: "none"
      // Remove Firefox dotted outline.
    },
    "&$focusVisible": {
      outline: "auto"
    }
  },
  /* Pseudo-class applied to the root element if the link is keyboard focused. */
  focusVisible: {}
}, gg = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.classes, n = t.className, o = t.color, i = o === void 0 ? "primary" : o, s = t.component, l = s === void 0 ? "a" : s, u = t.onBlur, c = t.onFocus, d = t.TypographyClasses, p = t.underline, h = p === void 0 ? "hover" : p, g = t.variant, m = g === void 0 ? "inherit" : g, v = Ve(t, ["classes", "className", "color", "component", "onBlur", "onFocus", "TypographyClasses", "underline", "variant"]), C = Ni(), T = C.isFocusVisible, A = C.onBlurVisible, f = C.ref, x = _.useState(!1), k = x[0], D = x[1], V = Tt(a, f), j = function(b) {
    k && (A(), D(!1)), u && u(b);
  }, M = function(b) {
    T(b) && D(!0), c && c(b);
  };
  return /* @__PURE__ */ _.createElement(Ht, se({
    className: ge(r.root, r["underline".concat(bt(h))], n, k && r.focusVisible, l === "button" && r.button),
    classes: d,
    color: i,
    component: l,
    onBlur: j,
    onFocus: M,
    ref: V,
    variant: m
  }, v));
});
const bg = St(mg, {
  name: "MuiLink"
})(gg);
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1-lts
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var Un = typeof window < "u" && typeof document < "u" && typeof navigator < "u", vg = (function() {
  for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
    if (Un && navigator.userAgent.indexOf(e[t]) >= 0)
      return 1;
  return 0;
})();
function yg(e) {
  var t = !1;
  return function() {
    t || (t = !0, window.Promise.resolve().then(function() {
      t = !1, e();
    }));
  };
}
function xg(e) {
  var t = !1;
  return function() {
    t || (t = !0, setTimeout(function() {
      t = !1, e();
    }, vg));
  };
}
var Sg = Un && window.Promise, wg = Sg ? yg : xg;
function Tc(e) {
  var t = {};
  return e && t.toString.call(e) === "[object Function]";
}
function Fr(e, t) {
  if (e.nodeType !== 1)
    return [];
  var a = e.ownerDocument.defaultView, r = a.getComputedStyle(e, null);
  return t ? r[t] : r;
}
function zi(e) {
  return e.nodeName === "HTML" ? e : e.parentNode || e.host;
}
function Gn(e) {
  if (!e)
    return document.body;
  switch (e.nodeName) {
    case "HTML":
    case "BODY":
      return e.ownerDocument.body;
    case "#document":
      return e.body;
  }
  var t = Fr(e), a = t.overflow, r = t.overflowX, n = t.overflowY;
  return /(auto|scroll|overlay)/.test(a + n + r) ? e : Gn(zi(e));
}
function Oc(e) {
  return e && e.referenceNode ? e.referenceNode : e;
}
var Qs = Un && !!(window.MSInputMethodContext && document.documentMode), el = Un && /MSIE 10/.test(navigator.userAgent);
function xn(e) {
  return e === 11 ? Qs : e === 10 ? el : Qs || el;
}
function pn(e) {
  if (!e)
    return document.documentElement;
  for (var t = xn(10) ? document.body : null, a = e.offsetParent || null; a === t && e.nextElementSibling; )
    a = (e = e.nextElementSibling).offsetParent;
  var r = a && a.nodeName;
  return !r || r === "BODY" || r === "HTML" ? e ? e.ownerDocument.documentElement : document.documentElement : ["TH", "TD", "TABLE"].indexOf(a.nodeName) !== -1 && Fr(a, "position") === "static" ? pn(a) : a;
}
function Cg(e) {
  var t = e.nodeName;
  return t === "BODY" ? !1 : t === "HTML" || pn(e.firstElementChild) === e;
}
function hi(e) {
  return e.parentNode !== null ? hi(e.parentNode) : e;
}
function _a(e, t) {
  if (!e || !e.nodeType || !t || !t.nodeType)
    return document.documentElement;
  var a = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, r = a ? e : t, n = a ? t : e, o = document.createRange();
  o.setStart(r, 0), o.setEnd(n, 0);
  var i = o.commonAncestorContainer;
  if (e !== i && t !== i || r.contains(n))
    return Cg(i) ? i : pn(i);
  var s = hi(e);
  return s.host ? _a(s.host, t) : _a(e, hi(t).host);
}
function hn(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top", a = t === "top" ? "scrollTop" : "scrollLeft", r = e.nodeName;
  if (r === "BODY" || r === "HTML") {
    var n = e.ownerDocument.documentElement, o = e.ownerDocument.scrollingElement || n;
    return o[a];
  }
  return e[a];
}
function Eg(e, t) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = hn(t, "top"), n = hn(t, "left"), o = a ? -1 : 1;
  return e.top += r * o, e.bottom += r * o, e.left += n * o, e.right += n * o, e;
}
function tl(e, t) {
  var a = t === "x" ? "Left" : "Top", r = a === "Left" ? "Right" : "Bottom";
  return parseFloat(e["border" + a + "Width"]) + parseFloat(e["border" + r + "Width"]);
}
function rl(e, t, a, r) {
  return Math.max(t["offset" + e], t["scroll" + e], a["client" + e], a["offset" + e], a["scroll" + e], xn(10) ? parseInt(a["offset" + e]) + parseInt(r["margin" + (e === "Height" ? "Top" : "Left")]) + parseInt(r["margin" + (e === "Height" ? "Bottom" : "Right")]) : 0);
}
function _c(e) {
  var t = e.body, a = e.documentElement, r = xn(10) && getComputedStyle(a);
  return {
    height: rl("Height", t, a, r),
    width: rl("Width", t, a, r)
  };
}
var kg = function(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}, $g = /* @__PURE__ */ (function() {
  function e(t, a) {
    for (var r = 0; r < a.length; r++) {
      var n = a[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }
  return function(t, a, r) {
    return a && e(t.prototype, a), r && e(t, r), t;
  };
})(), mn = function(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e;
}, Vt = Object.assign || function(e) {
  for (var t = 1; t < arguments.length; t++) {
    var a = arguments[t];
    for (var r in a)
      Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
  }
  return e;
};
function xr(e) {
  return Vt({}, e, {
    right: e.left + e.width,
    bottom: e.top + e.height
  });
}
function mi(e) {
  var t = {};
  try {
    if (xn(10)) {
      t = e.getBoundingClientRect();
      var a = hn(e, "top"), r = hn(e, "left");
      t.top += a, t.left += r, t.bottom += a, t.right += r;
    } else
      t = e.getBoundingClientRect();
  } catch {
  }
  var n = {
    left: t.left,
    top: t.top,
    width: t.right - t.left,
    height: t.bottom - t.top
  }, o = e.nodeName === "HTML" ? _c(e.ownerDocument) : {}, i = o.width || e.clientWidth || n.width, s = o.height || e.clientHeight || n.height, l = e.offsetWidth - i, u = e.offsetHeight - s;
  if (l || u) {
    var c = Fr(e);
    l -= tl(c, "x"), u -= tl(c, "y"), n.width -= l, n.height -= u;
  }
  return xr(n);
}
function Wi(e, t) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = xn(10), n = t.nodeName === "HTML", o = mi(e), i = mi(t), s = Gn(e), l = Fr(t), u = parseFloat(l.borderTopWidth), c = parseFloat(l.borderLeftWidth);
  a && n && (i.top = Math.max(i.top, 0), i.left = Math.max(i.left, 0));
  var d = xr({
    top: o.top - i.top - u,
    left: o.left - i.left - c,
    width: o.width,
    height: o.height
  });
  if (d.marginTop = 0, d.marginLeft = 0, !r && n) {
    var p = parseFloat(l.marginTop), h = parseFloat(l.marginLeft);
    d.top -= u - p, d.bottom -= u - p, d.left -= c - h, d.right -= c - h, d.marginTop = p, d.marginLeft = h;
  }
  return (r && !a ? t.contains(s) : t === s && s.nodeName !== "BODY") && (d = Eg(d, t)), d;
}
function Rg(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, a = e.ownerDocument.documentElement, r = Wi(e, a), n = Math.max(a.clientWidth, window.innerWidth || 0), o = Math.max(a.clientHeight, window.innerHeight || 0), i = t ? 0 : hn(a), s = t ? 0 : hn(a, "left"), l = {
    top: i - r.top + r.marginTop,
    left: s - r.left + r.marginLeft,
    width: n,
    height: o
  };
  return xr(l);
}
function Pc(e) {
  var t = e.nodeName;
  if (t === "BODY" || t === "HTML")
    return !1;
  if (Fr(e, "position") === "fixed")
    return !0;
  var a = zi(e);
  return a ? Pc(a) : !1;
}
function jc(e) {
  if (!e || !e.parentElement || xn())
    return document.documentElement;
  for (var t = e.parentElement; t && Fr(t, "transform") === "none"; )
    t = t.parentElement;
  return t || document.documentElement;
}
function Vi(e, t, a, r) {
  var n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, o = { top: 0, left: 0 }, i = n ? jc(e) : _a(e, Oc(t));
  if (r === "viewport")
    o = Rg(i, n);
  else {
    var s = void 0;
    r === "scrollParent" ? (s = Gn(zi(t)), s.nodeName === "BODY" && (s = e.ownerDocument.documentElement)) : r === "window" ? s = e.ownerDocument.documentElement : s = r;
    var l = Wi(s, i, n);
    if (s.nodeName === "HTML" && !Pc(i)) {
      var u = _c(e.ownerDocument), c = u.height, d = u.width;
      o.top += l.top - l.marginTop, o.bottom = c + l.top, o.left += l.left - l.marginLeft, o.right = d + l.left;
    } else
      o = l;
  }
  a = a || 0;
  var p = typeof a == "number";
  return o.left += p ? a : a.left || 0, o.top += p ? a : a.top || 0, o.right -= p ? a : a.right || 0, o.bottom -= p ? a : a.bottom || 0, o;
}
function Tg(e) {
  var t = e.width, a = e.height;
  return t * a;
}
function Ac(e, t, a, r, n) {
  var o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
  if (e.indexOf("auto") === -1)
    return e;
  var i = Vi(a, r, o, n), s = {
    top: {
      width: i.width,
      height: t.top - i.top
    },
    right: {
      width: i.right - t.right,
      height: i.height
    },
    bottom: {
      width: i.width,
      height: i.bottom - t.bottom
    },
    left: {
      width: t.left - i.left,
      height: i.height
    }
  }, l = Object.keys(s).map(function(p) {
    return Vt({
      key: p
    }, s[p], {
      area: Tg(s[p])
    });
  }).sort(function(p, h) {
    return h.area - p.area;
  }), u = l.filter(function(p) {
    var h = p.width, g = p.height;
    return h >= a.clientWidth && g >= a.clientHeight;
  }), c = u.length > 0 ? u[0].key : l[0].key, d = e.split("-")[1];
  return c + (d ? "-" + d : "");
}
function Mc(e, t, a) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, n = r ? jc(t) : _a(t, Oc(a));
  return Wi(a, n, r);
}
function Ic(e) {
  var t = e.ownerDocument.defaultView, a = t.getComputedStyle(e), r = parseFloat(a.marginTop || 0) + parseFloat(a.marginBottom || 0), n = parseFloat(a.marginLeft || 0) + parseFloat(a.marginRight || 0), o = {
    width: e.offsetWidth + n,
    height: e.offsetHeight + r
  };
  return o;
}
function Pa(e) {
  var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
  return e.replace(/left|right|bottom|top/g, function(a) {
    return t[a];
  });
}
function Lc(e, t, a) {
  a = a.split("-")[0];
  var r = Ic(e), n = {
    width: r.width,
    height: r.height
  }, o = ["right", "left"].indexOf(a) !== -1, i = o ? "top" : "left", s = o ? "left" : "top", l = o ? "height" : "width", u = o ? "width" : "height";
  return n[i] = t[i] + t[l] / 2 - r[l] / 2, a === s ? n[s] = t[s] - r[u] : n[s] = t[Pa(s)], n;
}
function Yn(e, t) {
  return Array.prototype.find ? e.find(t) : e.filter(t)[0];
}
function Og(e, t, a) {
  if (Array.prototype.findIndex)
    return e.findIndex(function(n) {
      return n[t] === a;
    });
  var r = Yn(e, function(n) {
    return n[t] === a;
  });
  return e.indexOf(r);
}
function Dc(e, t, a) {
  var r = a === void 0 ? e : e.slice(0, Og(e, "name", a));
  return r.forEach(function(n) {
    n.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
    var o = n.function || n.fn;
    n.enabled && Tc(o) && (t.offsets.popper = xr(t.offsets.popper), t.offsets.reference = xr(t.offsets.reference), t = o(t, n));
  }), t;
}
function _g() {
  if (!this.state.isDestroyed) {
    var e = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: !1,
      offsets: {}
    };
    e.offsets.reference = Mc(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = Ac(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = Lc(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = Dc(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
  }
}
function Nc(e, t) {
  return e.some(function(a) {
    var r = a.name, n = a.enabled;
    return n && r === t;
  });
}
function Hi(e) {
  for (var t = [!1, "ms", "Webkit", "Moz", "O"], a = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length; r++) {
    var n = t[r], o = n ? "" + n + a : e;
    if (typeof document.body.style[o] < "u")
      return o;
  }
  return null;
}
function Pg() {
  return this.state.isDestroyed = !0, Nc(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[Hi("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
}
function Bc(e) {
  var t = e.ownerDocument;
  return t ? t.defaultView : window;
}
function Fc(e, t, a, r) {
  var n = e.nodeName === "BODY", o = n ? e.ownerDocument.defaultView : e;
  o.addEventListener(t, a, { passive: !0 }), n || Fc(Gn(o.parentNode), t, a, r), r.push(o);
}
function jg(e, t, a, r) {
  a.updateBound = r, Bc(e).addEventListener("resize", a.updateBound, { passive: !0 });
  var n = Gn(e);
  return Fc(n, "scroll", a.updateBound, a.scrollParents), a.scrollElement = n, a.eventsEnabled = !0, a;
}
function Ag() {
  this.state.eventsEnabled || (this.state = jg(this.reference, this.options, this.state, this.scheduleUpdate));
}
function Mg(e, t) {
  return Bc(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(a) {
    a.removeEventListener("scroll", t.updateBound);
  }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
}
function Ig() {
  this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = Mg(this.reference, this.state));
}
function Ki(e) {
  return e !== "" && !isNaN(parseFloat(e)) && isFinite(e);
}
function gi(e, t) {
  Object.keys(t).forEach(function(a) {
    var r = "";
    ["width", "height", "top", "right", "bottom", "left"].indexOf(a) !== -1 && Ki(t[a]) && (r = "px"), e.style[a] = t[a] + r;
  });
}
function Lg(e, t) {
  Object.keys(t).forEach(function(a) {
    var r = t[a];
    r !== !1 ? e.setAttribute(a, t[a]) : e.removeAttribute(a);
  });
}
function Dg(e) {
  return gi(e.instance.popper, e.styles), Lg(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && gi(e.arrowElement, e.arrowStyles), e;
}
function Ng(e, t, a, r, n) {
  var o = Mc(n, t, e, a.positionFixed), i = Ac(a.placement, o, t, e, a.modifiers.flip.boundariesElement, a.modifiers.flip.padding);
  return t.setAttribute("x-placement", i), gi(t, { position: a.positionFixed ? "fixed" : "absolute" }), a;
}
function Bg(e, t) {
  var a = e.offsets, r = a.popper, n = a.reference, o = Math.round, i = Math.floor, s = function(C) {
    return C;
  }, l = o(n.width), u = o(r.width), c = ["left", "right"].indexOf(e.placement) !== -1, d = e.placement.indexOf("-") !== -1, p = l % 2 === u % 2, h = l % 2 === 1 && u % 2 === 1, g = t ? c || d || p ? o : i : s, m = t ? o : s;
  return {
    left: g(h && !d && t ? r.left - 1 : r.left),
    top: m(r.top),
    bottom: m(r.bottom),
    right: g(r.right)
  };
}
var Fg = Un && /Firefox/i.test(navigator.userAgent);
function zg(e, t) {
  var a = t.x, r = t.y, n = e.offsets.popper, o = Yn(e.instance.modifiers, function(A) {
    return A.name === "applyStyle";
  }).gpuAcceleration;
  o !== void 0 && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
  var i = o !== void 0 ? o : t.gpuAcceleration, s = pn(e.instance.popper), l = mi(s), u = {
    position: n.position
  }, c = Bg(e, window.devicePixelRatio < 2 || !Fg), d = a === "bottom" ? "top" : "bottom", p = r === "right" ? "left" : "right", h = Hi("transform"), g = void 0, m = void 0;
  if (d === "bottom" ? s.nodeName === "HTML" ? m = -s.clientHeight + c.bottom : m = -l.height + c.bottom : m = c.top, p === "right" ? s.nodeName === "HTML" ? g = -s.clientWidth + c.right : g = -l.width + c.right : g = c.left, i && h)
    u[h] = "translate3d(" + g + "px, " + m + "px, 0)", u[d] = 0, u[p] = 0, u.willChange = "transform";
  else {
    var v = d === "bottom" ? -1 : 1, C = p === "right" ? -1 : 1;
    u[d] = m * v, u[p] = g * C, u.willChange = d + ", " + p;
  }
  var T = {
    "x-placement": e.placement
  };
  return e.attributes = Vt({}, T, e.attributes), e.styles = Vt({}, u, e.styles), e.arrowStyles = Vt({}, e.offsets.arrow, e.arrowStyles), e;
}
function zc(e, t, a) {
  var r = Yn(e, function(s) {
    var l = s.name;
    return l === t;
  }), n = !!r && e.some(function(s) {
    return s.name === a && s.enabled && s.order < r.order;
  });
  if (!n) {
    var o = "`" + t + "`", i = "`" + a + "`";
    console.warn(i + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!");
  }
  return n;
}
function Wg(e, t) {
  var a;
  if (!zc(e.instance.modifiers, "arrow", "keepTogether"))
    return e;
  var r = t.element;
  if (typeof r == "string") {
    if (r = e.instance.popper.querySelector(r), !r)
      return e;
  } else if (!e.instance.popper.contains(r))
    return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
  var n = e.placement.split("-")[0], o = e.offsets, i = o.popper, s = o.reference, l = ["left", "right"].indexOf(n) !== -1, u = l ? "height" : "width", c = l ? "Top" : "Left", d = c.toLowerCase(), p = l ? "left" : "top", h = l ? "bottom" : "right", g = Ic(r)[u];
  s[h] - g < i[d] && (e.offsets.popper[d] -= i[d] - (s[h] - g)), s[d] + g > i[h] && (e.offsets.popper[d] += s[d] + g - i[h]), e.offsets.popper = xr(e.offsets.popper);
  var m = s[d] + s[u] / 2 - g / 2, v = Fr(e.instance.popper), C = parseFloat(v["margin" + c]), T = parseFloat(v["border" + c + "Width"]), A = m - e.offsets.popper[d] - C - T;
  return A = Math.max(Math.min(i[u] - g, A), 0), e.arrowElement = r, e.offsets.arrow = (a = {}, mn(a, d, Math.round(A)), mn(a, p, ""), a), e;
}
function Vg(e) {
  return e === "end" ? "start" : e === "start" ? "end" : e;
}
var Wc = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], Bo = Wc.slice(3);
function nl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, a = Bo.indexOf(e), r = Bo.slice(a + 1).concat(Bo.slice(0, a));
  return t ? r.reverse() : r;
}
var Fo = {
  FLIP: "flip",
  CLOCKWISE: "clockwise",
  COUNTERCLOCKWISE: "counterclockwise"
};
function Hg(e, t) {
  if (Nc(e.instance.modifiers, "inner") || e.flipped && e.placement === e.originalPlacement)
    return e;
  var a = Vi(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed), r = e.placement.split("-")[0], n = Pa(r), o = e.placement.split("-")[1] || "", i = [];
  switch (t.behavior) {
    case Fo.FLIP:
      i = [r, n];
      break;
    case Fo.CLOCKWISE:
      i = nl(r);
      break;
    case Fo.COUNTERCLOCKWISE:
      i = nl(r, !0);
      break;
    default:
      i = t.behavior;
  }
  return i.forEach(function(s, l) {
    if (r !== s || i.length === l + 1)
      return e;
    r = e.placement.split("-")[0], n = Pa(r);
    var u = e.offsets.popper, c = e.offsets.reference, d = Math.floor, p = r === "left" && d(u.right) > d(c.left) || r === "right" && d(u.left) < d(c.right) || r === "top" && d(u.bottom) > d(c.top) || r === "bottom" && d(u.top) < d(c.bottom), h = d(u.left) < d(a.left), g = d(u.right) > d(a.right), m = d(u.top) < d(a.top), v = d(u.bottom) > d(a.bottom), C = r === "left" && h || r === "right" && g || r === "top" && m || r === "bottom" && v, T = ["top", "bottom"].indexOf(r) !== -1, A = !!t.flipVariations && (T && o === "start" && h || T && o === "end" && g || !T && o === "start" && m || !T && o === "end" && v), f = !!t.flipVariationsByContent && (T && o === "start" && g || T && o === "end" && h || !T && o === "start" && v || !T && o === "end" && m), x = A || f;
    (p || C || x) && (e.flipped = !0, (p || C) && (r = i[l + 1]), x && (o = Vg(o)), e.placement = r + (o ? "-" + o : ""), e.offsets.popper = Vt({}, e.offsets.popper, Lc(e.instance.popper, e.offsets.reference, e.placement)), e = Dc(e.instance.modifiers, e, "flip"));
  }), e;
}
function Kg(e) {
  var t = e.offsets, a = t.popper, r = t.reference, n = e.placement.split("-")[0], o = Math.floor, i = ["top", "bottom"].indexOf(n) !== -1, s = i ? "right" : "bottom", l = i ? "left" : "top", u = i ? "width" : "height";
  return a[s] < o(r[l]) && (e.offsets.popper[l] = o(r[l]) - a[u]), a[l] > o(r[s]) && (e.offsets.popper[l] = o(r[s])), e;
}
function qg(e, t, a, r) {
  var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), o = +n[1], i = n[2];
  if (!o)
    return e;
  if (i.indexOf("%") === 0) {
    var s = void 0;
    switch (i) {
      case "%p":
        s = a;
        break;
      case "%":
      case "%r":
      default:
        s = r;
    }
    var l = xr(s);
    return l[t] / 100 * o;
  } else if (i === "vh" || i === "vw") {
    var u = void 0;
    return i === "vh" ? u = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : u = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), u / 100 * o;
  } else
    return o;
}
function Ug(e, t, a, r) {
  var n = [0, 0], o = ["right", "left"].indexOf(r) !== -1, i = e.split(/(\+|\-)/).map(function(c) {
    return c.trim();
  }), s = i.indexOf(Yn(i, function(c) {
    return c.search(/,|\s/) !== -1;
  }));
  i[s] && i[s].indexOf(",") === -1 && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
  var l = /\s*,\s*|\s+/, u = s !== -1 ? [i.slice(0, s).concat([i[s].split(l)[0]]), [i[s].split(l)[1]].concat(i.slice(s + 1))] : [i];
  return u = u.map(function(c, d) {
    var p = (d === 1 ? !o : o) ? "height" : "width", h = !1;
    return c.reduce(function(g, m) {
      return g[g.length - 1] === "" && ["+", "-"].indexOf(m) !== -1 ? (g[g.length - 1] = m, h = !0, g) : h ? (g[g.length - 1] += m, h = !1, g) : g.concat(m);
    }, []).map(function(g) {
      return qg(g, p, t, a);
    });
  }), u.forEach(function(c, d) {
    c.forEach(function(p, h) {
      Ki(p) && (n[d] += p * (c[h - 1] === "-" ? -1 : 1));
    });
  }), n;
}
function Gg(e, t) {
  var a = t.offset, r = e.placement, n = e.offsets, o = n.popper, i = n.reference, s = r.split("-")[0], l = void 0;
  return Ki(+a) ? l = [+a, 0] : l = Ug(a, o, i, s), s === "left" ? (o.top += l[0], o.left -= l[1]) : s === "right" ? (o.top += l[0], o.left += l[1]) : s === "top" ? (o.left += l[0], o.top -= l[1]) : s === "bottom" && (o.left += l[0], o.top += l[1]), e.popper = o, e;
}
function Yg(e, t) {
  var a = t.boundariesElement || pn(e.instance.popper);
  e.instance.reference === a && (a = pn(a));
  var r = Hi("transform"), n = e.instance.popper.style, o = n.top, i = n.left, s = n[r];
  n.top = "", n.left = "", n[r] = "";
  var l = Vi(e.instance.popper, e.instance.reference, t.padding, a, e.positionFixed);
  n.top = o, n.left = i, n[r] = s, t.boundaries = l;
  var u = t.priority, c = e.offsets.popper, d = {
    primary: function(h) {
      var g = c[h];
      return c[h] < l[h] && !t.escapeWithReference && (g = Math.max(c[h], l[h])), mn({}, h, g);
    },
    secondary: function(h) {
      var g = h === "right" ? "left" : "top", m = c[g];
      return c[h] > l[h] && !t.escapeWithReference && (m = Math.min(c[g], l[h] - (h === "right" ? c.width : c.height))), mn({}, g, m);
    }
  };
  return u.forEach(function(p) {
    var h = ["left", "top"].indexOf(p) !== -1 ? "primary" : "secondary";
    c = Vt({}, c, d[h](p));
  }), e.offsets.popper = c, e;
}
function Xg(e) {
  var t = e.placement, a = t.split("-")[0], r = t.split("-")[1];
  if (r) {
    var n = e.offsets, o = n.reference, i = n.popper, s = ["bottom", "top"].indexOf(a) !== -1, l = s ? "left" : "top", u = s ? "width" : "height", c = {
      start: mn({}, l, o[l]),
      end: mn({}, l, o[l] + o[u] - i[u])
    };
    e.offsets.popper = Vt({}, i, c[r]);
  }
  return e;
}
function Jg(e) {
  if (!zc(e.instance.modifiers, "hide", "preventOverflow"))
    return e;
  var t = e.offsets.reference, a = Yn(e.instance.modifiers, function(r) {
    return r.name === "preventOverflow";
  }).boundaries;
  if (t.bottom < a.top || t.left > a.right || t.top > a.bottom || t.right < a.left) {
    if (e.hide === !0)
      return e;
    e.hide = !0, e.attributes["x-out-of-boundaries"] = "";
  } else {
    if (e.hide === !1)
      return e;
    e.hide = !1, e.attributes["x-out-of-boundaries"] = !1;
  }
  return e;
}
function Zg(e) {
  var t = e.placement, a = t.split("-")[0], r = e.offsets, n = r.popper, o = r.reference, i = ["left", "right"].indexOf(a) !== -1, s = ["top", "left"].indexOf(a) === -1;
  return n[i ? "left" : "top"] = o[a] - (s ? n[i ? "width" : "height"] : 0), e.placement = Pa(t), e.offsets.popper = xr(n), e;
}
var Qg = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: Xg
  },
  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: Gg,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },
  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: Yg,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ["left", "right", "top", "bottom"],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: "scrollParent"
  },
  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: Kg
  },
  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: Wg,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: "[x-arrow]"
  },
  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: Hg,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: "flip",
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: "viewport",
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: !1,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: !1
  },
  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: !1,
    /** @prop {ModifierFn} */
    fn: Zg
  },
  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: Jg
  },
  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: zg,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: !0,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: "bottom",
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: "right"
  },
  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: Dg,
    /** @prop {Function} */
    onLoad: Ng,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: void 0
  }
}, e0 = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: "bottom",
  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: !1,
  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: !0,
  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: !1,
  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function() {
  },
  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function() {
  },
  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: Qg
}, Ha = (function() {
  function e(t, a) {
    var r = this, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    kg(this, e), this.scheduleUpdate = function() {
      return requestAnimationFrame(r.update);
    }, this.update = wg(this.update.bind(this)), this.options = Vt({}, e.Defaults, n), this.state = {
      isDestroyed: !1,
      isCreated: !1,
      scrollParents: []
    }, this.reference = t && t.jquery ? t[0] : t, this.popper = a && a.jquery ? a[0] : a, this.options.modifiers = {}, Object.keys(Vt({}, e.Defaults.modifiers, n.modifiers)).forEach(function(i) {
      r.options.modifiers[i] = Vt({}, e.Defaults.modifiers[i] || {}, n.modifiers ? n.modifiers[i] : {});
    }), this.modifiers = Object.keys(this.options.modifiers).map(function(i) {
      return Vt({
        name: i
      }, r.options.modifiers[i]);
    }).sort(function(i, s) {
      return i.order - s.order;
    }), this.modifiers.forEach(function(i) {
      i.enabled && Tc(i.onLoad) && i.onLoad(r.reference, r.popper, r.options, i, r.state);
    }), this.update();
    var o = this.options.eventsEnabled;
    o && this.enableEventListeners(), this.state.eventsEnabled = o;
  }
  return $g(e, [{
    key: "update",
    value: function() {
      return _g.call(this);
    }
  }, {
    key: "destroy",
    value: function() {
      return Pg.call(this);
    }
  }, {
    key: "enableEventListeners",
    value: function() {
      return Ag.call(this);
    }
  }, {
    key: "disableEventListeners",
    value: function() {
      return Ig.call(this);
    }
    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */
    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */
  }]), e;
})();
Ha.Utils = (typeof window < "u" ? window : global).PopperUtils;
Ha.placements = Wc;
Ha.Defaults = e0;
function t0(e, t) {
  var a = t && t.direction || "ltr";
  if (a === "ltr")
    return e;
  switch (e) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return e;
  }
}
function al(e) {
  return typeof e == "function" ? e() : e;
}
var r0 = typeof window < "u" ? _.useLayoutEffect : _.useEffect, n0 = {}, a0 = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.anchorEl, n = t.children, o = t.container, i = t.disablePortal, s = i === void 0 ? !1 : i, l = t.keepMounted, u = l === void 0 ? !1 : l, c = t.modifiers, d = t.open, p = t.placement, h = p === void 0 ? "bottom" : p, g = t.popperOptions, m = g === void 0 ? n0 : g, v = t.popperRef, C = t.style, T = t.transition, A = T === void 0 ? !1 : T, f = Ve(t, ["anchorEl", "children", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"]), x = _.useRef(null), k = Tt(x, a), D = _.useRef(null), V = Tt(D, v), j = _.useRef(V);
  r0(function() {
    j.current = V;
  }, [V]), _.useImperativeHandle(v, function() {
    return D.current;
  }, []);
  var M = _.useState(!0), I = M[0], b = M[1], S = Na(), L = t0(h, S), N = _.useState(L), R = N[0], U = N[1];
  _.useEffect(function() {
    D.current && D.current.update();
  });
  var B = _.useCallback(function() {
    if (!(!x.current || !r || !d)) {
      D.current && (D.current.destroy(), j.current(null));
      var pe = function(ce) {
        U(ce.placement);
      };
      al(r);
      var Se = new Ha(al(r), x.current, se({
        placement: L
      }, m, {
        modifiers: se({}, s ? {} : {
          // It's using scrollParent by default, we can use the viewport when using a portal.
          preventOverflow: {
            boundariesElement: "window"
          }
        }, c, m.modifiers),
        // We could have been using a custom modifier like react-popper is doing.
        // But it seems this is the best public API for this use case.
        onCreate: Ks(pe, m.onCreate),
        onUpdate: Ks(pe, m.onUpdate)
      }));
      j.current(Se);
    }
  }, [r, s, c, d, L, m]), J = _.useCallback(function(pe) {
    fn(k, pe), B();
  }, [k, B]), W = function() {
    b(!1);
  }, ae = function() {
    D.current && (D.current.destroy(), j.current(null));
  }, re = function() {
    b(!0), ae();
  };
  if (_.useEffect(function() {
    return function() {
      ae();
    };
  }, []), _.useEffect(function() {
    !d && !A && ae();
  }, [d, A]), !u && !d && (!A || I))
    return null;
  var de = {
    placement: R
  };
  return A && (de.TransitionProps = {
    in: d,
    onEnter: W,
    onExited: re
  }), /* @__PURE__ */ _.createElement(Jm, {
    disablePortal: s,
    container: o
  }, /* @__PURE__ */ _.createElement("div", se({
    ref: J,
    role: "tooltip"
  }, f, {
    style: se({
      // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
      position: "fixed",
      // Fix Popper.js display issue
      top: 0,
      left: 0,
      display: !d && u && !A ? "none" : null
    }, C)
  }), typeof n == "function" ? n(de) : n));
}), o0 = function(t) {
  var a;
  return {
    /* Styles applied to the root element. */
    root: se({}, t.typography.button, (a = {
      maxWidth: 264,
      minWidth: 72,
      position: "relative",
      boxSizing: "border-box",
      minHeight: 48,
      flexShrink: 0,
      padding: "6px 12px"
    }, At(a, t.breakpoints.up("sm"), {
      padding: "6px 24px"
    }), At(a, "overflow", "hidden"), At(a, "whiteSpace", "normal"), At(a, "textAlign", "center"), At(a, t.breakpoints.up("sm"), {
      minWidth: 160
    }), a)),
    /* Styles applied to the root element if both `icon` and `label` are provided. */
    labelIcon: {
      minHeight: 72,
      paddingTop: 9,
      "& $wrapper > *:first-child": {
        marginBottom: 6
      }
    },
    /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="inherit"`. */
    textColorInherit: {
      color: "inherit",
      opacity: 0.7,
      "&$selected": {
        opacity: 1
      },
      "&$disabled": {
        opacity: 0.5
      }
    },
    /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="primary"`. */
    textColorPrimary: {
      color: t.palette.text.secondary,
      "&$selected": {
        color: t.palette.primary.main
      },
      "&$disabled": {
        color: t.palette.text.disabled
      }
    },
    /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="secondary"`. */
    textColorSecondary: {
      color: t.palette.text.secondary,
      "&$selected": {
        color: t.palette.secondary.main
      },
      "&$disabled": {
        color: t.palette.text.disabled
      }
    },
    /* Pseudo-class applied to the root element if `selected={true}` (controlled by the Tabs component). */
    selected: {},
    /* Pseudo-class applied to the root element if `disabled={true}` (controlled by the Tabs component). */
    disabled: {},
    /* Styles applied to the root element if `fullWidth={true}` (controlled by the Tabs component). */
    fullWidth: {
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: 0,
      maxWidth: "none"
    },
    /* Styles applied to the root element if `wrapped={true}`. */
    wrapped: {
      fontSize: t.typography.pxToRem(12),
      lineHeight: 1.5
    },
    /* Styles applied to the `icon` and `label`'s wrapper element. */
    wrapper: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      flexDirection: "column"
    }
  };
}, i0 = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.classes, n = t.className, o = t.disabled, i = o === void 0 ? !1 : o, s = t.disableFocusRipple, l = s === void 0 ? !1 : s, u = t.fullWidth, c = t.icon, d = t.indicator, p = t.label, h = t.onChange, g = t.onClick, m = t.onFocus, v = t.selected, C = t.selectionFollowsFocus, T = t.textColor, A = T === void 0 ? "inherit" : T, f = t.value, x = t.wrapped, k = x === void 0 ? !1 : x, D = Ve(t, ["classes", "className", "disabled", "disableFocusRipple", "fullWidth", "icon", "indicator", "label", "onChange", "onClick", "onFocus", "selected", "selectionFollowsFocus", "textColor", "value", "wrapped"]), V = function(I) {
    h && h(I, f), g && g(I);
  }, j = function(I) {
    C && !v && h && h(I, f), m && m(I);
  };
  return /* @__PURE__ */ _.createElement(Nr, se({
    focusRipple: !l,
    className: ge(r.root, r["textColor".concat(bt(A))], n, i && r.disabled, v && r.selected, p && c && r.labelIcon, u && r.fullWidth, k && r.wrapped),
    ref: a,
    role: "tab",
    "aria-selected": v,
    disabled: i,
    onClick: V,
    onFocus: j,
    tabIndex: v ? 0 : -1
  }, D), /* @__PURE__ */ _.createElement("span", {
    className: r.wrapper
  }, c, p), d);
});
const s0 = St(o0, {
  name: "MuiTab"
})(i0), l0 = rr(/* @__PURE__ */ _.createElement("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
})), c0 = rr(/* @__PURE__ */ _.createElement("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}));
var en;
function Vc() {
  if (en)
    return en;
  var e = document.createElement("div"), t = document.createElement("div");
  return t.style.width = "10px", t.style.height = "1px", e.appendChild(t), e.dir = "rtl", e.style.fontSize = "14px", e.style.width = "4px", e.style.height = "1px", e.style.position = "absolute", e.style.top = "-1000px", e.style.overflow = "scroll", document.body.appendChild(e), en = "reverse", e.scrollLeft > 0 ? en = "default" : (e.scrollLeft = 1, e.scrollLeft === 0 && (en = "negative")), document.body.removeChild(e), en;
}
function ol(e, t) {
  var a = e.scrollLeft;
  if (t !== "rtl")
    return a;
  var r = Vc();
  switch (r) {
    case "negative":
      return e.scrollWidth - e.clientWidth + a;
    case "reverse":
      return e.scrollWidth - e.clientWidth - a;
    default:
      return a;
  }
}
function u0(e) {
  return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2;
}
function d0(e, t, a) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : function() {
  }, o = r.ease, i = o === void 0 ? u0 : o, s = r.duration, l = s === void 0 ? 300 : s, u = null, c = t[e], d = !1, p = function() {
    d = !0;
  }, h = function g(m) {
    if (d) {
      n(new Error("Animation cancelled"));
      return;
    }
    u === null && (u = m);
    var v = Math.min(1, (m - u) / l);
    if (t[e] = i(v) * (a - c) + c, v >= 1) {
      requestAnimationFrame(function() {
        n(null);
      });
      return;
    }
    requestAnimationFrame(g);
  };
  return c === a ? (n(new Error("Element already at target position")), p) : (requestAnimationFrame(h), p);
}
var f0 = {
  width: 99,
  height: 99,
  position: "absolute",
  top: -9999,
  overflow: "scroll"
};
function p0(e) {
  var t = e.onChange, a = Ve(e, ["onChange"]), r = _.useRef(), n = _.useRef(null), o = function() {
    r.current = n.current.offsetHeight - n.current.clientHeight;
  };
  return _.useEffect(function() {
    var i = Ra(function() {
      var s = r.current;
      o(), s !== r.current && t(r.current);
    });
    return window.addEventListener("resize", i), function() {
      i.clear(), window.removeEventListener("resize", i);
    };
  }, [t]), _.useEffect(function() {
    o(), t(r.current);
  }, [t]), /* @__PURE__ */ _.createElement("div", se({
    style: f0,
    ref: n
  }, a));
}
var h0 = function(t) {
  return {
    root: {
      position: "absolute",
      height: 2,
      bottom: 0,
      width: "100%",
      transition: t.transitions.create()
    },
    colorPrimary: {
      backgroundColor: t.palette.primary.main
    },
    colorSecondary: {
      backgroundColor: t.palette.secondary.main
    },
    vertical: {
      height: "100%",
      width: 2,
      right: 0
    }
  };
}, m0 = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.classes, n = t.className, o = t.color, i = t.orientation, s = Ve(t, ["classes", "className", "color", "orientation"]);
  return /* @__PURE__ */ _.createElement("span", se({
    className: ge(r.root, r["color".concat(bt(o))], n, i === "vertical" && r.vertical),
    ref: a
  }, s));
});
const g0 = St(h0, {
  name: "PrivateTabIndicator"
})(m0);
var b0 = {
  /* Styles applied to the root element. */
  root: {
    width: 40,
    flexShrink: 0,
    opacity: 0.8,
    "&$disabled": {
      opacity: 0
    }
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    width: "100%",
    height: 40,
    "& svg": {
      transform: "rotate(90deg)"
    }
  },
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {}
}, v0 = /* @__PURE__ */ _.createElement(l0, {
  fontSize: "small"
}), y0 = /* @__PURE__ */ _.createElement(c0, {
  fontSize: "small"
}), x0 = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.classes, n = t.className, o = t.direction, i = t.orientation, s = t.disabled, l = Ve(t, ["classes", "className", "direction", "orientation", "disabled"]);
  return /* @__PURE__ */ _.createElement(Nr, se({
    component: "div",
    className: ge(r.root, n, s && r.disabled, i === "vertical" && r.vertical),
    ref: a,
    role: null,
    tabIndex: null
  }, l), o === "left" ? v0 : y0);
});
const S0 = St(b0, {
  name: "MuiTabScrollButton"
})(x0);
var w0 = function(t) {
  return {
    /* Styles applied to the root element. */
    root: {
      overflow: "hidden",
      minHeight: 48,
      WebkitOverflowScrolling: "touch",
      // Add iOS momentum scrolling.
      display: "flex"
    },
    /* Styles applied to the root element if `orientation="vertical"`. */
    vertical: {
      flexDirection: "column"
    },
    /* Styles applied to the flex container element. */
    flexContainer: {
      display: "flex"
    },
    /* Styles applied to the flex container element if `orientation="vertical"`. */
    flexContainerVertical: {
      flexDirection: "column"
    },
    /* Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`. */
    centered: {
      justifyContent: "center"
    },
    /* Styles applied to the tablist element. */
    scroller: {
      position: "relative",
      display: "inline-block",
      flex: "1 1 auto",
      whiteSpace: "nowrap"
    },
    /* Styles applied to the tablist element if `!variant="scrollable"`. */
    fixed: {
      overflowX: "hidden",
      width: "100%"
    },
    /* Styles applied to the tablist element if `variant="scrollable"`. */
    scrollable: {
      overflowX: "scroll",
      // Hide dimensionless scrollbar on MacOS
      scrollbarWidth: "none",
      // Firefox
      "&::-webkit-scrollbar": {
        display: "none"
        // Safari + Chrome
      }
    },
    /* Styles applied to the `ScrollButtonComponent` component. */
    scrollButtons: {},
    /* Styles applied to the `ScrollButtonComponent` component if `scrollButtons="auto"` or scrollButtons="desktop"`. */
    scrollButtonsDesktop: At({}, t.breakpoints.down("xs"), {
      display: "none"
    }),
    /* Styles applied to the `TabIndicator` component. */
    indicator: {}
  };
}, C0 = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t["aria-label"], n = t["aria-labelledby"], o = t.action, i = t.centered, s = i === void 0 ? !1 : i, l = t.children, u = t.classes, c = t.className, d = t.component, p = d === void 0 ? "div" : d, h = t.indicatorColor, g = h === void 0 ? "secondary" : h, m = t.onChange, v = t.orientation, C = v === void 0 ? "horizontal" : v, T = t.ScrollButtonComponent, A = T === void 0 ? S0 : T, f = t.scrollButtons, x = f === void 0 ? "auto" : f, k = t.selectionFollowsFocus, D = t.TabIndicatorProps, V = D === void 0 ? {} : D, j = t.TabScrollButtonProps, M = t.textColor, I = M === void 0 ? "inherit" : M, b = t.value, S = t.variant, L = S === void 0 ? "standard" : S, N = Ve(t, ["aria-label", "aria-labelledby", "action", "centered", "children", "classes", "className", "component", "indicatorColor", "onChange", "orientation", "ScrollButtonComponent", "scrollButtons", "selectionFollowsFocus", "TabIndicatorProps", "TabScrollButtonProps", "textColor", "value", "variant"]), R = Fa(), U = L === "scrollable", B = R.direction === "rtl", J = C === "vertical", W = J ? "scrollTop" : "scrollLeft", ae = J ? "top" : "left", re = J ? "bottom" : "right", de = J ? "clientHeight" : "clientWidth", pe = J ? "height" : "width", Se = _.useState(!1), fe = Se[0], ce = Se[1], ue = _.useState({}), me = ue[0], be = ue[1], Pe = _.useState({
    start: !1,
    end: !1
  }), De = Pe[0], ze = Pe[1], We = _.useState({
    overflow: "hidden",
    marginBottom: null
  }), ht = We[0], je = We[1], He = /* @__PURE__ */ new Map(), Ge = _.useRef(null), Ue = _.useRef(null), gt = function() {
    var oe = Ge.current, ve;
    if (oe) {
      var Me = oe.getBoundingClientRect();
      ve = {
        clientWidth: oe.clientWidth,
        scrollLeft: oe.scrollLeft,
        scrollTop: oe.scrollTop,
        scrollLeftNormalized: ol(oe, R.direction),
        scrollWidth: oe.scrollWidth,
        top: Me.top,
        bottom: Me.bottom,
        left: Me.left,
        right: Me.right
      };
    }
    var Be;
    if (oe && b !== !1) {
      var Ze = Ue.current.children;
      if (Ze.length > 0) {
        var Re = Ze[He.get(b)];
        Be = Re ? Re.getBoundingClientRect() : null;
      }
    }
    return {
      tabsMeta: ve,
      tabMeta: Be
    };
  }, mt = gr(function() {
    var Ee, oe = gt(), ve = oe.tabsMeta, Me = oe.tabMeta, Be = 0;
    if (Me && ve)
      if (J)
        Be = Me.top - ve.top + ve.scrollTop;
      else {
        var Ze = B ? ve.scrollLeftNormalized + ve.clientWidth - ve.scrollWidth : ve.scrollLeft;
        Be = Me.left - ve.left + Ze;
      }
    var Re = (Ee = {}, At(Ee, ae, Be), At(Ee, pe, Me ? Me[pe] : 0), Ee);
    if (isNaN(me[ae]) || isNaN(me[pe]))
      be(Re);
    else {
      var Te = Math.abs(me[ae] - Re[ae]), ct = Math.abs(me[pe] - Re[pe]);
      (Te >= 1 || ct >= 1) && be(Re);
    }
  }), lt = function(oe) {
    d0(W, Ge.current, oe);
  }, Ye = function(oe) {
    var ve = Ge.current[W];
    J ? ve += oe : (ve += oe * (B ? -1 : 1), ve *= B && Vc() === "reverse" ? -1 : 1), lt(ve);
  }, ft = function() {
    Ye(-Ge.current[de]);
  }, Z = function() {
    Ye(Ge.current[de]);
  }, z = _.useCallback(function(Ee) {
    je({
      overflow: null,
      marginBottom: -Ee
    });
  }, []), H = function() {
    var oe = {};
    oe.scrollbarSizeListener = U ? /* @__PURE__ */ _.createElement(p0, {
      className: u.scrollable,
      onChange: z
    }) : null;
    var ve = De.start || De.end, Me = U && (x === "auto" && ve || x === "desktop" || x === "on");
    return oe.scrollButtonStart = Me ? /* @__PURE__ */ _.createElement(A, se({
      orientation: C,
      direction: B ? "right" : "left",
      onClick: ft,
      disabled: !De.start,
      className: ge(u.scrollButtons, x !== "on" && u.scrollButtonsDesktop)
    }, j)) : null, oe.scrollButtonEnd = Me ? /* @__PURE__ */ _.createElement(A, se({
      orientation: C,
      direction: B ? "left" : "right",
      onClick: Z,
      disabled: !De.end,
      className: ge(u.scrollButtons, x !== "on" && u.scrollButtonsDesktop)
    }, j)) : null, oe;
  }, X = gr(function() {
    var Ee = gt(), oe = Ee.tabsMeta, ve = Ee.tabMeta;
    if (!(!ve || !oe)) {
      if (ve[ae] < oe[ae]) {
        var Me = oe[W] + (ve[ae] - oe[ae]);
        lt(Me);
      } else if (ve[re] > oe[re]) {
        var Be = oe[W] + (ve[re] - oe[re]);
        lt(Be);
      }
    }
  }), ne = gr(function() {
    if (U && x !== "off") {
      var Ee = Ge.current, oe = Ee.scrollTop, ve = Ee.scrollHeight, Me = Ee.clientHeight, Be = Ee.scrollWidth, Ze = Ee.clientWidth, Re, Te;
      if (J)
        Re = oe > 1, Te = oe < ve - Me - 1;
      else {
        var ct = ol(Ge.current, R.direction);
        Re = B ? ct < Be - Ze - 1 : ct > 1, Te = B ? ct > 1 : ct < Be - Ze - 1;
      }
      (Re !== De.start || Te !== De.end) && ze({
        start: Re,
        end: Te
      });
    }
  });
  _.useEffect(function() {
    var Ee = Ra(function() {
      mt(), ne();
    }), oe = Yh(Ge.current);
    return oe.addEventListener("resize", Ee), function() {
      Ee.clear(), oe.removeEventListener("resize", Ee);
    };
  }, [mt, ne]);
  var he = _.useCallback(Ra(function() {
    ne();
  }));
  _.useEffect(function() {
    return function() {
      he.clear();
    };
  }, [he]), _.useEffect(function() {
    ce(!0);
  }, []), _.useEffect(function() {
    mt(), ne();
  }), _.useEffect(function() {
    X();
  }, [X, me]), _.useImperativeHandle(o, function() {
    return {
      updateIndicator: mt,
      updateScrollButtons: ne
    };
  }, [mt, ne]);
  var $e = /* @__PURE__ */ _.createElement(g0, se({
    className: u.indicator,
    orientation: C,
    color: g
  }, V, {
    style: se({}, me, V.style)
  })), ke = 0, _e = _.Children.map(l, function(Ee) {
    if (!/* @__PURE__ */ _.isValidElement(Ee))
      return null;
    var oe = Ee.props.value === void 0 ? ke : Ee.props.value;
    He.set(oe, ke);
    var ve = oe === b;
    return ke += 1, /* @__PURE__ */ _.cloneElement(Ee, {
      fullWidth: L === "fullWidth",
      indicator: ve && !fe && $e,
      selected: ve,
      selectionFollowsFocus: k,
      onChange: m,
      textColor: I,
      value: oe
    });
  }), Xe = function(oe) {
    var ve = oe.target, Me = ve.getAttribute("role");
    if (Me === "tab") {
      var Be = null, Ze = C !== "vertical" ? "ArrowLeft" : "ArrowUp", Re = C !== "vertical" ? "ArrowRight" : "ArrowDown";
      switch (C !== "vertical" && R.direction === "rtl" && (Ze = "ArrowRight", Re = "ArrowLeft"), oe.key) {
        case Ze:
          Be = ve.previousElementSibling || Ue.current.lastChild;
          break;
        case Re:
          Be = ve.nextElementSibling || Ue.current.firstChild;
          break;
        case "Home":
          Be = Ue.current.firstChild;
          break;
        case "End":
          Be = Ue.current.lastChild;
          break;
      }
      Be !== null && (Be.focus(), oe.preventDefault());
    }
  }, Je = H();
  return /* @__PURE__ */ _.createElement(p, se({
    className: ge(u.root, c, J && u.vertical),
    ref: a
  }, N), Je.scrollButtonStart, Je.scrollbarSizeListener, /* @__PURE__ */ _.createElement("div", {
    className: ge(u.scroller, U ? u.scrollable : u.fixed),
    style: ht,
    ref: Ge,
    onScroll: he
  }, /* @__PURE__ */ _.createElement("div", {
    "aria-label": r,
    "aria-labelledby": n,
    className: ge(u.flexContainer, J && u.flexContainerVertical, s && !U && u.centered),
    onKeyDown: Xe,
    ref: Ue,
    role: "tablist"
  }, _e), fe && $e), Je.scrollButtonEnd);
});
const E0 = St(w0, {
  name: "MuiTabs"
})(C0);
function il(e) {
  return Math.round(e * 1e5) / 1e5;
}
function k0() {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.71em",
      marginLeft: 4,
      marginRight: 4,
      "&::before": {
        transformOrigin: "0 100%"
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.71em",
      marginLeft: 4,
      marginRight: 4,
      "&::before": {
        transformOrigin: "100% 0"
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.71em",
      height: "1em",
      width: "0.71em",
      marginTop: 4,
      marginBottom: 4,
      "&::before": {
        transformOrigin: "100% 100%"
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.71em",
      height: "1em",
      width: "0.71em",
      marginTop: 4,
      marginBottom: 4,
      "&::before": {
        transformOrigin: "0 0"
      }
    }
  };
}
var $0 = function(t) {
  return {
    /* Styles applied to the Popper component. */
    popper: {
      zIndex: t.zIndex.tooltip,
      pointerEvents: "none"
      // disable jss-rtl plugin
    },
    /* Styles applied to the Popper component if `interactive={true}`. */
    popperInteractive: {
      pointerEvents: "auto"
    },
    /* Styles applied to the Popper component if `arrow={true}`. */
    popperArrow: k0(),
    /* Styles applied to the tooltip (label wrapper) element. */
    tooltip: {
      backgroundColor: Le(t.palette.grey[700], 0.9),
      borderRadius: t.shape.borderRadius,
      color: t.palette.common.white,
      fontFamily: t.typography.fontFamily,
      padding: "4px 8px",
      fontSize: t.typography.pxToRem(10),
      lineHeight: "".concat(il(14 / 10), "em"),
      maxWidth: 300,
      wordWrap: "break-word",
      fontWeight: t.typography.fontWeightMedium
    },
    /* Styles applied to the tooltip (label wrapper) element if `arrow={true}`. */
    tooltipArrow: {
      position: "relative",
      margin: "0"
    },
    /* Styles applied to the arrow element. */
    arrow: {
      overflow: "hidden",
      position: "absolute",
      width: "1em",
      height: "0.71em",
      boxSizing: "border-box",
      color: Le(t.palette.grey[700], 0.9),
      "&::before": {
        content: '""',
        margin: "auto",
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: "currentColor",
        transform: "rotate(45deg)"
      }
    },
    /* Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
    touch: {
      padding: "8px 16px",
      fontSize: t.typography.pxToRem(14),
      lineHeight: "".concat(il(16 / 14), "em"),
      fontWeight: t.typography.fontWeightRegular
    },
    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
    tooltipPlacementLeft: At({
      transformOrigin: "right center",
      margin: "0 24px "
    }, t.breakpoints.up("sm"), {
      margin: "0 14px"
    }),
    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
    tooltipPlacementRight: At({
      transformOrigin: "left center",
      margin: "0 24px"
    }, t.breakpoints.up("sm"), {
      margin: "0 14px"
    }),
    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
    tooltipPlacementTop: At({
      transformOrigin: "center bottom",
      margin: "24px 0"
    }, t.breakpoints.up("sm"), {
      margin: "14px 0"
    }),
    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
    tooltipPlacementBottom: At({
      transformOrigin: "center top",
      margin: "24px 0"
    }, t.breakpoints.up("sm"), {
      margin: "14px 0"
    })
  };
}, la = !1, zo = null, R0 = /* @__PURE__ */ _.forwardRef(function(t, a) {
  var r = t.arrow, n = r === void 0 ? !1 : r, o = t.children, i = t.classes, s = t.disableFocusListener, l = s === void 0 ? !1 : s, u = t.disableHoverListener, c = u === void 0 ? !1 : u, d = t.disableTouchListener, p = d === void 0 ? !1 : d, h = t.enterDelay, g = h === void 0 ? 100 : h, m = t.enterNextDelay, v = m === void 0 ? 0 : m, C = t.enterTouchDelay, T = C === void 0 ? 700 : C, A = t.id, f = t.interactive, x = f === void 0 ? !1 : f, k = t.leaveDelay, D = k === void 0 ? 0 : k, V = t.leaveTouchDelay, j = V === void 0 ? 1500 : V, M = t.onClose, I = t.onOpen, b = t.open, S = t.placement, L = S === void 0 ? "bottom" : S, N = t.PopperComponent, R = N === void 0 ? a0 : N, U = t.PopperProps, B = t.title, J = t.TransitionComponent, W = J === void 0 ? Rc : J, ae = t.TransitionProps, re = Ve(t, ["arrow", "children", "classes", "disableFocusListener", "disableHoverListener", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "id", "interactive", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"]), de = Fa(), pe = _.useState(), Se = pe[0], fe = pe[1], ce = _.useState(null), ue = ce[0], me = ce[1], be = _.useRef(!1), Pe = _.useRef(), De = _.useRef(), ze = _.useRef(), We = _.useRef(), ht = Sc({
    controlled: b,
    default: !1,
    name: "Tooltip",
    state: "open"
  }), je = Kn(ht, 2), He = je[0], Ge = je[1], Ue = He, gt = Jh(A);
  _.useEffect(function() {
    return function() {
      clearTimeout(Pe.current), clearTimeout(De.current), clearTimeout(ze.current), clearTimeout(We.current);
    };
  }, []);
  var mt = function(Ke) {
    clearTimeout(zo), la = !0, Ge(!0), I && I(Ke);
  }, lt = function() {
    var Ke = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return function(Fe) {
      var pt = o.props;
      Fe.type === "mouseover" && pt.onMouseOver && Ke && pt.onMouseOver(Fe), !(be.current && Fe.type !== "touchstart") && (Se && Se.removeAttribute("title"), clearTimeout(De.current), clearTimeout(ze.current), g || la && v ? (Fe.persist(), De.current = setTimeout(function() {
        mt(Fe);
      }, la ? v : g)) : mt(Fe));
    };
  }, Ye = Ni(), ft = Ye.isFocusVisible, Z = Ye.onBlurVisible, z = Ye.ref, H = _.useState(!1), X = H[0], ne = H[1], he = function() {
    X && (ne(!1), Z());
  }, $e = function() {
    var Ke = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return function(Fe) {
      Se || fe(Fe.currentTarget), ft(Fe) && (ne(!0), lt()(Fe));
      var pt = o.props;
      pt.onFocus && Ke && pt.onFocus(Fe);
    };
  }, ke = function(Ke) {
    clearTimeout(zo), zo = setTimeout(function() {
      la = !1;
    }, 800 + D), Ge(!1), M && M(Ke), clearTimeout(Pe.current), Pe.current = setTimeout(function() {
      be.current = !1;
    }, de.transitions.duration.shortest);
  }, _e = function() {
    var Ke = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return function(Fe) {
      var pt = o.props;
      Fe.type === "blur" && (pt.onBlur && Ke && pt.onBlur(Fe), he()), Fe.type === "mouseleave" && pt.onMouseLeave && Fe.currentTarget === Se && pt.onMouseLeave(Fe), clearTimeout(De.current), clearTimeout(ze.current), Fe.persist(), ze.current = setTimeout(function() {
        ke(Fe);
      }, D);
    };
  }, Xe = function(Ke) {
    be.current = !0;
    var Fe = o.props;
    Fe.onTouchStart && Fe.onTouchStart(Ke);
  }, Je = function(Ke) {
    Xe(Ke), clearTimeout(ze.current), clearTimeout(Pe.current), clearTimeout(We.current), Ke.persist(), We.current = setTimeout(function() {
      lt()(Ke);
    }, T);
  }, Ee = function(Ke) {
    o.props.onTouchEnd && o.props.onTouchEnd(Ke), clearTimeout(We.current), clearTimeout(ze.current), Ke.persist(), ze.current = setTimeout(function() {
      ke(Ke);
    }, j);
  }, oe = Tt(fe, a), ve = Tt(z, oe), Me = _.useCallback(function(Qe) {
    fn(ve, Vn.findDOMNode(Qe));
  }, [ve]), Be = Tt(o.ref, Me);
  B === "" && (Ue = !1);
  var Ze = !Ue && !c, Re = se({
    "aria-describedby": Ue ? gt : null,
    title: Ze && typeof B == "string" ? B : null
  }, re, o.props, {
    className: ge(re.className, o.props.className),
    onTouchStart: Xe,
    ref: Be
  }), Te = {};
  p || (Re.onTouchStart = Je, Re.onTouchEnd = Ee), c || (Re.onMouseOver = lt(), Re.onMouseLeave = _e(), x && (Te.onMouseOver = lt(!1), Te.onMouseLeave = _e(!1))), l || (Re.onFocus = $e(), Re.onBlur = _e(), x && (Te.onFocus = $e(!1), Te.onBlur = _e(!1)));
  var ct = _.useMemo(function() {
    return vr({
      popperOptions: {
        modifiers: {
          arrow: {
            enabled: !!ue,
            element: ue
          }
        }
      }
    }, U);
  }, [ue, U]);
  return /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.cloneElement(o, Re), /* @__PURE__ */ _.createElement(R, se({
    className: ge(i.popper, x && i.popperInteractive, n && i.popperArrow),
    placement: L,
    anchorEl: Se,
    open: Se ? Ue : !1,
    id: Re["aria-describedby"],
    transition: !0
  }, Te, ct), function(Qe) {
    var Ke = Qe.placement, Fe = Qe.TransitionProps;
    return /* @__PURE__ */ _.createElement(W, se({
      timeout: de.transitions.duration.shorter
    }, Fe, ae), /* @__PURE__ */ _.createElement("div", {
      className: ge(i.tooltip, i["tooltipPlacement".concat(bt(Ke.split("-")[0]))], be.current && i.touch, n && i.tooltipArrow)
    }, B, n ? /* @__PURE__ */ _.createElement("span", {
      className: i.arrow,
      ref: me
    }) : null));
  }));
});
const qi = St($0, {
  name: "MuiTooltip",
  flip: !1
})(R0);
var Pn = { exports: {} };
Pn.exports;
var sl;
function T0() {
  return sl || (sl = 1, (function(e, t) {
    var a = 200, r = "__lodash_hash_undefined__", n = 9007199254740991, o = "[object Arguments]", i = "[object Array]", s = "[object Boolean]", l = "[object Date]", u = "[object Error]", c = "[object Function]", d = "[object GeneratorFunction]", p = "[object Map]", h = "[object Number]", g = "[object Object]", m = "[object Promise]", v = "[object RegExp]", C = "[object Set]", T = "[object String]", A = "[object Symbol]", f = "[object WeakMap]", x = "[object ArrayBuffer]", k = "[object DataView]", D = "[object Float32Array]", V = "[object Float64Array]", j = "[object Int8Array]", M = "[object Int16Array]", I = "[object Int32Array]", b = "[object Uint8Array]", S = "[object Uint8ClampedArray]", L = "[object Uint16Array]", N = "[object Uint32Array]", R = /[\\^$.*+?()[\]{}|]/g, U = /\w*$/, B = /^\[object .+?Constructor\]$/, J = /^(?:0|[1-9]\d*)$/, W = {};
    W[o] = W[i] = W[x] = W[k] = W[s] = W[l] = W[D] = W[V] = W[j] = W[M] = W[I] = W[p] = W[h] = W[g] = W[v] = W[C] = W[T] = W[A] = W[b] = W[S] = W[L] = W[N] = !0, W[u] = W[c] = W[f] = !1;
    var ae = typeof oa == "object" && oa && oa.Object === Object && oa, re = typeof self == "object" && self && self.Object === Object && self, de = ae || re || Function("return this")(), pe = t && !t.nodeType && t, Se = pe && !0 && e && !e.nodeType && e, fe = Se && Se.exports === pe;
    function ce(E, G) {
      return E.set(G[0], G[1]), E;
    }
    function ue(E, G) {
      return E.add(G), E;
    }
    function me(E, G) {
      for (var le = -1, we = E ? E.length : 0; ++le < we && G(E[le], le, E) !== !1; )
        ;
      return E;
    }
    function be(E, G) {
      for (var le = -1, we = G.length, _t = E.length; ++le < we; )
        E[_t + le] = G[le];
      return E;
    }
    function Pe(E, G, le, we) {
      for (var _t = -1, Lt = E ? E.length : 0; ++_t < Lt; )
        le = G(le, E[_t], _t, E);
      return le;
    }
    function De(E, G) {
      for (var le = -1, we = Array(E); ++le < E; )
        we[le] = G(le);
      return we;
    }
    function ze(E, G) {
      return E == null ? void 0 : E[G];
    }
    function We(E) {
      var G = !1;
      if (E != null && typeof E.toString != "function")
        try {
          G = !!(E + "");
        } catch {
        }
      return G;
    }
    function ht(E) {
      var G = -1, le = Array(E.size);
      return E.forEach(function(we, _t) {
        le[++G] = [_t, we];
      }), le;
    }
    function je(E, G) {
      return function(le) {
        return E(G(le));
      };
    }
    function He(E) {
      var G = -1, le = Array(E.size);
      return E.forEach(function(we) {
        le[++G] = we;
      }), le;
    }
    var Ge = Array.prototype, Ue = Function.prototype, gt = Object.prototype, mt = de["__core-js_shared__"], lt = (function() {
      var E = /[^.]+$/.exec(mt && mt.keys && mt.keys.IE_PROTO || "");
      return E ? "Symbol(src)_1." + E : "";
    })(), Ye = Ue.toString, ft = gt.hasOwnProperty, Z = gt.toString, z = RegExp(
      "^" + Ye.call(ft).replace(R, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), H = fe ? de.Buffer : void 0, X = de.Symbol, ne = de.Uint8Array, he = je(Object.getPrototypeOf, Object), $e = Object.create, ke = gt.propertyIsEnumerable, _e = Ge.splice, Xe = Object.getOwnPropertySymbols, Je = H ? H.isBuffer : void 0, Ee = je(Object.keys, Object), oe = Ur(de, "DataView"), ve = Ur(de, "Map"), Me = Ur(de, "Promise"), Be = Ur(de, "Set"), Ze = Ur(de, "WeakMap"), Re = Ur(Object, "create"), Te = Rr(oe), ct = Rr(ve), Qe = Rr(Me), Ke = Rr(Be), Fe = Rr(Ze), pt = X ? X.prototype : void 0, Mt = pt ? pt.valueOf : void 0;
    function It(E) {
      var G = -1, le = E ? E.length : 0;
      for (this.clear(); ++G < le; ) {
        var we = E[G];
        this.set(we[0], we[1]);
      }
    }
    function Er() {
      this.__data__ = Re ? Re(null) : {};
    }
    function io(E) {
      return this.has(E) && delete this.__data__[E];
    }
    function zr(E) {
      var G = this.__data__;
      if (Re) {
        var le = G[E];
        return le === r ? void 0 : le;
      }
      return ft.call(G, E) ? G[E] : void 0;
    }
    function so(E) {
      var G = this.__data__;
      return Re ? G[E] !== void 0 : ft.call(G, E);
    }
    function lo(E, G) {
      var le = this.__data__;
      return le[E] = Re && G === void 0 ? r : G, this;
    }
    It.prototype.clear = Er, It.prototype.delete = io, It.prototype.get = zr, It.prototype.has = so, It.prototype.set = lo;
    function qt(E) {
      var G = -1, le = E ? E.length : 0;
      for (this.clear(); ++G < le; ) {
        var we = E[G];
        this.set(we[0], we[1]);
      }
    }
    function co() {
      this.__data__ = [];
    }
    function Wr(E) {
      var G = this.__data__, le = Oe(G, E);
      if (le < 0)
        return !1;
      var we = G.length - 1;
      return le == we ? G.pop() : _e.call(G, le, 1), !0;
    }
    function O(E) {
      var G = this.__data__, le = Oe(G, E);
      return le < 0 ? void 0 : G[le][1];
    }
    function P(E) {
      return Oe(this.__data__, E) > -1;
    }
    function y(E, G) {
      var le = this.__data__, we = Oe(le, E);
      return we < 0 ? le.push([E, G]) : le[we][1] = G, this;
    }
    qt.prototype.clear = co, qt.prototype.delete = Wr, qt.prototype.get = O, qt.prototype.has = P, qt.prototype.set = y;
    function w(E) {
      var G = -1, le = E ? E.length : 0;
      for (this.clear(); ++G < le; ) {
        var we = E[G];
        this.set(we[0], we[1]);
      }
    }
    function $() {
      this.__data__ = {
        hash: new It(),
        map: new (ve || qt)(),
        string: new It()
      };
    }
    function K(E) {
      return ta(this, E).delete(E);
    }
    function Q(E) {
      return ta(this, E).get(E);
    }
    function Y(E) {
      return ta(this, E).has(E);
    }
    function F(E, G) {
      return ta(this, E).set(E, G), this;
    }
    w.prototype.clear = $, w.prototype.delete = K, w.prototype.get = Q, w.prototype.has = Y, w.prototype.set = F;
    function ie(E) {
      this.__data__ = new qt(E);
    }
    function xe() {
      this.__data__ = new qt();
    }
    function Ne(E) {
      return this.__data__.delete(E);
    }
    function qe(E) {
      return this.__data__.get(E);
    }
    function rt(E) {
      return this.__data__.has(E);
    }
    function Ie(E, G) {
      var le = this.__data__;
      if (le instanceof qt) {
        var we = le.__data__;
        if (!ve || we.length < a - 1)
          return we.push([E, G]), this;
        le = this.__data__ = new w(we);
      }
      return le.set(E, G), this;
    }
    ie.prototype.clear = xe, ie.prototype.delete = Ne, ie.prototype.get = qe, ie.prototype.has = rt, ie.prototype.set = Ie;
    function nt(E, G) {
      var le = uo(E) || Au(E) ? De(E.length, String) : [], we = le.length, _t = !!we;
      for (var Lt in E)
        ft.call(E, Lt) && !(_t && (Lt == "length" || Ou(Lt, we))) && le.push(Lt);
      return le;
    }
    function vt(E, G, le) {
      var we = E[G];
      (!(ft.call(E, G) && is(we, le)) || le === void 0 && !(G in E)) && (E[G] = le);
    }
    function Oe(E, G) {
      for (var le = E.length; le--; )
        if (is(E[le][0], G))
          return le;
      return -1;
    }
    function kt(E, G) {
      return E && qr(G, fo(G), E);
    }
    function Ot(E, G, le, we, _t, Lt, ar) {
      var Dt;
      if (we && (Dt = Lt ? we(E, _t, Lt, ar) : we(E)), Dt !== void 0)
        return Dt;
      if (!ra(E))
        return E;
      var cs = uo(E);
      if (cs) {
        if (Dt = $u(E), !G)
          return En(E, Dt);
      } else {
        var Gr = $r(E), us = Gr == c || Gr == d;
        if (Iu(E))
          return Rt(E, G);
        if (Gr == g || Gr == o || us && !Lt) {
          if (We(E))
            return Lt ? E : {};
          if (Dt = Ru(us ? {} : E), !G)
            return fr(E, kt(Dt, E));
        } else {
          if (!W[Gr])
            return Lt ? E : {};
          Dt = Tu(E, Gr, Ot, G);
        }
      }
      ar || (ar = new ie());
      var ds = ar.get(E);
      if (ds)
        return ds;
      if (ar.set(E, Dt), !cs)
        var fs = le ? ea(E) : fo(E);
      return me(fs || E, function(po, na) {
        fs && (na = po, po = E[na]), vt(Dt, na, Ot(po, G, le, we, na, E, ar));
      }), Dt;
    }
    function Ut(E) {
      return ra(E) ? $e(E) : {};
    }
    function Vr(E, G, le) {
      var we = G(E);
      return uo(E) ? we : be(we, le(E));
    }
    function Gt(E) {
      return Z.call(E);
    }
    function Hr(E) {
      if (!ra(E) || Pu(E))
        return !1;
      var G = ls(E) || We(E) ? z : B;
      return G.test(Rr(E));
    }
    function ur(E) {
      if (!os(E))
        return Ee(E);
      var G = [];
      for (var le in Object(E))
        ft.call(E, le) && le != "constructor" && G.push(le);
      return G;
    }
    function Rt(E, G) {
      if (G)
        return E.slice();
      var le = new E.constructor(E.length);
      return E.copy(le), le;
    }
    function Xt(E) {
      var G = new E.constructor(E.byteLength);
      return new ne(G).set(new ne(E)), G;
    }
    function kr(E, G) {
      var le = G ? Xt(E.buffer) : E.buffer;
      return new E.constructor(le, E.byteOffset, E.byteLength);
    }
    function dr(E, G, le) {
      var we = G ? le(ht(E), !0) : ht(E);
      return Pe(we, ce, new E.constructor());
    }
    function Qn(E) {
      var G = new E.constructor(E.source, U.exec(E));
      return G.lastIndex = E.lastIndex, G;
    }
    function Kr(E, G, le) {
      var we = G ? le(He(E), !0) : He(E);
      return Pe(we, ue, new E.constructor());
    }
    function wn(E) {
      return Mt ? Object(Mt.call(E)) : {};
    }
    function Cn(E, G) {
      var le = G ? Xt(E.buffer) : E.buffer;
      return new E.constructor(le, E.byteOffset, E.length);
    }
    function En(E, G) {
      var le = -1, we = E.length;
      for (G || (G = Array(we)); ++le < we; )
        G[le] = E[le];
      return G;
    }
    function qr(E, G, le, we) {
      le || (le = {});
      for (var _t = -1, Lt = G.length; ++_t < Lt; ) {
        var ar = G[_t], Dt = void 0;
        vt(le, ar, Dt === void 0 ? E[ar] : Dt);
      }
      return le;
    }
    function fr(E, G) {
      return qr(E, as(E), G);
    }
    function ea(E) {
      return Vr(E, fo, as);
    }
    function ta(E, G) {
      var le = E.__data__;
      return _u(G) ? le[typeof G == "string" ? "string" : "hash"] : le.map;
    }
    function Ur(E, G) {
      var le = ze(E, G);
      return Hr(le) ? le : void 0;
    }
    var as = Xe ? je(Xe, Object) : Nu, $r = Gt;
    (oe && $r(new oe(new ArrayBuffer(1))) != k || ve && $r(new ve()) != p || Me && $r(Me.resolve()) != m || Be && $r(new Be()) != C || Ze && $r(new Ze()) != f) && ($r = function(E) {
      var G = Z.call(E), le = G == g ? E.constructor : void 0, we = le ? Rr(le) : void 0;
      if (we)
        switch (we) {
          case Te:
            return k;
          case ct:
            return p;
          case Qe:
            return m;
          case Ke:
            return C;
          case Fe:
            return f;
        }
      return G;
    });
    function $u(E) {
      var G = E.length, le = E.constructor(G);
      return G && typeof E[0] == "string" && ft.call(E, "index") && (le.index = E.index, le.input = E.input), le;
    }
    function Ru(E) {
      return typeof E.constructor == "function" && !os(E) ? Ut(he(E)) : {};
    }
    function Tu(E, G, le, we) {
      var _t = E.constructor;
      switch (G) {
        case x:
          return Xt(E);
        case s:
        case l:
          return new _t(+E);
        case k:
          return kr(E, we);
        case D:
        case V:
        case j:
        case M:
        case I:
        case b:
        case S:
        case L:
        case N:
          return Cn(E, we);
        case p:
          return dr(E, we, le);
        case h:
        case T:
          return new _t(E);
        case v:
          return Qn(E);
        case C:
          return Kr(E, we, le);
        case A:
          return wn(E);
      }
    }
    function Ou(E, G) {
      return G = G ?? n, !!G && (typeof E == "number" || J.test(E)) && E > -1 && E % 1 == 0 && E < G;
    }
    function _u(E) {
      var G = typeof E;
      return G == "string" || G == "number" || G == "symbol" || G == "boolean" ? E !== "__proto__" : E === null;
    }
    function Pu(E) {
      return !!lt && lt in E;
    }
    function os(E) {
      var G = E && E.constructor, le = typeof G == "function" && G.prototype || gt;
      return E === le;
    }
    function Rr(E) {
      if (E != null) {
        try {
          return Ye.call(E);
        } catch {
        }
        try {
          return E + "";
        } catch {
        }
      }
      return "";
    }
    function ju(E) {
      return Ot(E, !0, !0);
    }
    function is(E, G) {
      return E === G || E !== E && G !== G;
    }
    function Au(E) {
      return Mu(E) && ft.call(E, "callee") && (!ke.call(E, "callee") || Z.call(E) == o);
    }
    var uo = Array.isArray;
    function ss(E) {
      return E != null && Lu(E.length) && !ls(E);
    }
    function Mu(E) {
      return Du(E) && ss(E);
    }
    var Iu = Je || Bu;
    function ls(E) {
      var G = ra(E) ? Z.call(E) : "";
      return G == c || G == d;
    }
    function Lu(E) {
      return typeof E == "number" && E > -1 && E % 1 == 0 && E <= n;
    }
    function ra(E) {
      var G = typeof E;
      return !!E && (G == "object" || G == "function");
    }
    function Du(E) {
      return !!E && typeof E == "object";
    }
    function fo(E) {
      return ss(E) ? nt(E) : ur(E);
    }
    function Nu() {
      return [];
    }
    function Bu() {
      return !1;
    }
    e.exports = ju;
  })(Pn, Pn.exports)), Pn.exports;
}
var O0 = T0();
const ll = /* @__PURE__ */ wr(O0);
var ha = { exports: {} }, _0 = ha.exports, cl;
function P0() {
  return cl || (cl = 1, (function(e, t) {
    (function(a, r) {
      e.exports = r();
    })(_0, (function() {
      var a = 1e3, r = 6e4, n = 36e5, o = "millisecond", i = "second", s = "minute", l = "hour", u = "day", c = "week", d = "month", p = "quarter", h = "year", g = "date", m = "Invalid Date", v = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, C = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, T = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(L) {
        var N = ["th", "st", "nd", "rd"], R = L % 100;
        return "[" + L + (N[(R - 20) % 10] || N[R] || N[0]) + "]";
      } }, A = function(L, N, R) {
        var U = String(L);
        return !U || U.length >= N ? L : "" + Array(N + 1 - U.length).join(R) + L;
      }, f = { s: A, z: function(L) {
        var N = -L.utcOffset(), R = Math.abs(N), U = Math.floor(R / 60), B = R % 60;
        return (N <= 0 ? "+" : "-") + A(U, 2, "0") + ":" + A(B, 2, "0");
      }, m: function L(N, R) {
        if (N.date() < R.date()) return -L(R, N);
        var U = 12 * (R.year() - N.year()) + (R.month() - N.month()), B = N.clone().add(U, d), J = R - B < 0, W = N.clone().add(U + (J ? -1 : 1), d);
        return +(-(U + (R - B) / (J ? B - W : W - B)) || 0);
      }, a: function(L) {
        return L < 0 ? Math.ceil(L) || 0 : Math.floor(L);
      }, p: function(L) {
        return { M: d, y: h, w: c, d: u, D: g, h: l, m: s, s: i, ms: o, Q: p }[L] || String(L || "").toLowerCase().replace(/s$/, "");
      }, u: function(L) {
        return L === void 0;
      } }, x = "en", k = {};
      k[x] = T;
      var D = "$isDayjsObject", V = function(L) {
        return L instanceof b || !(!L || !L[D]);
      }, j = function L(N, R, U) {
        var B;
        if (!N) return x;
        if (typeof N == "string") {
          var J = N.toLowerCase();
          k[J] && (B = J), R && (k[J] = R, B = J);
          var W = N.split("-");
          if (!B && W.length > 1) return L(W[0]);
        } else {
          var ae = N.name;
          k[ae] = N, B = ae;
        }
        return !U && B && (x = B), B || !U && x;
      }, M = function(L, N) {
        if (V(L)) return L.clone();
        var R = typeof N == "object" ? N : {};
        return R.date = L, R.args = arguments, new b(R);
      }, I = f;
      I.l = j, I.i = V, I.w = function(L, N) {
        return M(L, { locale: N.$L, utc: N.$u, x: N.$x, $offset: N.$offset });
      };
      var b = (function() {
        function L(R) {
          this.$L = j(R.locale, null, !0), this.parse(R), this.$x = this.$x || R.x || {}, this[D] = !0;
        }
        var N = L.prototype;
        return N.parse = function(R) {
          this.$d = (function(U) {
            var B = U.date, J = U.utc;
            if (B === null) return /* @__PURE__ */ new Date(NaN);
            if (I.u(B)) return /* @__PURE__ */ new Date();
            if (B instanceof Date) return new Date(B);
            if (typeof B == "string" && !/Z$/i.test(B)) {
              var W = B.match(v);
              if (W) {
                var ae = W[2] - 1 || 0, re = (W[7] || "0").substring(0, 3);
                return J ? new Date(Date.UTC(W[1], ae, W[3] || 1, W[4] || 0, W[5] || 0, W[6] || 0, re)) : new Date(W[1], ae, W[3] || 1, W[4] || 0, W[5] || 0, W[6] || 0, re);
              }
            }
            return new Date(B);
          })(R), this.init();
        }, N.init = function() {
          var R = this.$d;
          this.$y = R.getFullYear(), this.$M = R.getMonth(), this.$D = R.getDate(), this.$W = R.getDay(), this.$H = R.getHours(), this.$m = R.getMinutes(), this.$s = R.getSeconds(), this.$ms = R.getMilliseconds();
        }, N.$utils = function() {
          return I;
        }, N.isValid = function() {
          return this.$d.toString() !== m;
        }, N.isSame = function(R, U) {
          var B = M(R);
          return this.startOf(U) <= B && B <= this.endOf(U);
        }, N.isAfter = function(R, U) {
          return M(R) < this.startOf(U);
        }, N.isBefore = function(R, U) {
          return this.endOf(U) < M(R);
        }, N.$g = function(R, U, B) {
          return I.u(R) ? this[U] : this.set(B, R);
        }, N.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, N.valueOf = function() {
          return this.$d.getTime();
        }, N.startOf = function(R, U) {
          var B = this, J = !!I.u(U) || U, W = I.p(R), ae = function(me, be) {
            var Pe = I.w(B.$u ? Date.UTC(B.$y, be, me) : new Date(B.$y, be, me), B);
            return J ? Pe : Pe.endOf(u);
          }, re = function(me, be) {
            return I.w(B.toDate()[me].apply(B.toDate("s"), (J ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(be)), B);
          }, de = this.$W, pe = this.$M, Se = this.$D, fe = "set" + (this.$u ? "UTC" : "");
          switch (W) {
            case h:
              return J ? ae(1, 0) : ae(31, 11);
            case d:
              return J ? ae(1, pe) : ae(0, pe + 1);
            case c:
              var ce = this.$locale().weekStart || 0, ue = (de < ce ? de + 7 : de) - ce;
              return ae(J ? Se - ue : Se + (6 - ue), pe);
            case u:
            case g:
              return re(fe + "Hours", 0);
            case l:
              return re(fe + "Minutes", 1);
            case s:
              return re(fe + "Seconds", 2);
            case i:
              return re(fe + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, N.endOf = function(R) {
          return this.startOf(R, !1);
        }, N.$set = function(R, U) {
          var B, J = I.p(R), W = "set" + (this.$u ? "UTC" : ""), ae = (B = {}, B[u] = W + "Date", B[g] = W + "Date", B[d] = W + "Month", B[h] = W + "FullYear", B[l] = W + "Hours", B[s] = W + "Minutes", B[i] = W + "Seconds", B[o] = W + "Milliseconds", B)[J], re = J === u ? this.$D + (U - this.$W) : U;
          if (J === d || J === h) {
            var de = this.clone().set(g, 1);
            de.$d[ae](re), de.init(), this.$d = de.set(g, Math.min(this.$D, de.daysInMonth())).$d;
          } else ae && this.$d[ae](re);
          return this.init(), this;
        }, N.set = function(R, U) {
          return this.clone().$set(R, U);
        }, N.get = function(R) {
          return this[I.p(R)]();
        }, N.add = function(R, U) {
          var B, J = this;
          R = Number(R);
          var W = I.p(U), ae = function(pe) {
            var Se = M(J);
            return I.w(Se.date(Se.date() + Math.round(pe * R)), J);
          };
          if (W === d) return this.set(d, this.$M + R);
          if (W === h) return this.set(h, this.$y + R);
          if (W === u) return ae(1);
          if (W === c) return ae(7);
          var re = (B = {}, B[s] = r, B[l] = n, B[i] = a, B)[W] || 1, de = this.$d.getTime() + R * re;
          return I.w(de, this);
        }, N.subtract = function(R, U) {
          return this.add(-1 * R, U);
        }, N.format = function(R) {
          var U = this, B = this.$locale();
          if (!this.isValid()) return B.invalidDate || m;
          var J = R || "YYYY-MM-DDTHH:mm:ssZ", W = I.z(this), ae = this.$H, re = this.$m, de = this.$M, pe = B.weekdays, Se = B.months, fe = B.meridiem, ce = function(be, Pe, De, ze) {
            return be && (be[Pe] || be(U, J)) || De[Pe].slice(0, ze);
          }, ue = function(be) {
            return I.s(ae % 12 || 12, be, "0");
          }, me = fe || function(be, Pe, De) {
            var ze = be < 12 ? "AM" : "PM";
            return De ? ze.toLowerCase() : ze;
          };
          return J.replace(C, (function(be, Pe) {
            return Pe || (function(De) {
              switch (De) {
                case "YY":
                  return String(U.$y).slice(-2);
                case "YYYY":
                  return I.s(U.$y, 4, "0");
                case "M":
                  return de + 1;
                case "MM":
                  return I.s(de + 1, 2, "0");
                case "MMM":
                  return ce(B.monthsShort, de, Se, 3);
                case "MMMM":
                  return ce(Se, de);
                case "D":
                  return U.$D;
                case "DD":
                  return I.s(U.$D, 2, "0");
                case "d":
                  return String(U.$W);
                case "dd":
                  return ce(B.weekdaysMin, U.$W, pe, 2);
                case "ddd":
                  return ce(B.weekdaysShort, U.$W, pe, 3);
                case "dddd":
                  return pe[U.$W];
                case "H":
                  return String(ae);
                case "HH":
                  return I.s(ae, 2, "0");
                case "h":
                  return ue(1);
                case "hh":
                  return ue(2);
                case "a":
                  return me(ae, re, !0);
                case "A":
                  return me(ae, re, !1);
                case "m":
                  return String(re);
                case "mm":
                  return I.s(re, 2, "0");
                case "s":
                  return String(U.$s);
                case "ss":
                  return I.s(U.$s, 2, "0");
                case "SSS":
                  return I.s(U.$ms, 3, "0");
                case "Z":
                  return W;
              }
              return null;
            })(be) || W.replace(":", "");
          }));
        }, N.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, N.diff = function(R, U, B) {
          var J, W = this, ae = I.p(U), re = M(R), de = (re.utcOffset() - this.utcOffset()) * r, pe = this - re, Se = function() {
            return I.m(W, re);
          };
          switch (ae) {
            case h:
              J = Se() / 12;
              break;
            case d:
              J = Se();
              break;
            case p:
              J = Se() / 3;
              break;
            case c:
              J = (pe - de) / 6048e5;
              break;
            case u:
              J = (pe - de) / 864e5;
              break;
            case l:
              J = pe / n;
              break;
            case s:
              J = pe / r;
              break;
            case i:
              J = pe / a;
              break;
            default:
              J = pe;
          }
          return B ? J : I.a(J);
        }, N.daysInMonth = function() {
          return this.endOf(d).$D;
        }, N.$locale = function() {
          return k[this.$L];
        }, N.locale = function(R, U) {
          if (!R) return this.$L;
          var B = this.clone(), J = j(R, U, !0);
          return J && (B.$L = J), B;
        }, N.clone = function() {
          return I.w(this.$d, this);
        }, N.toDate = function() {
          return new Date(this.valueOf());
        }, N.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, N.toISOString = function() {
          return this.$d.toISOString();
        }, N.toString = function() {
          return this.$d.toUTCString();
        }, L;
      })(), S = b.prototype;
      return M.prototype = S, [["$ms", o], ["$s", i], ["$m", s], ["$H", l], ["$W", u], ["$M", d], ["$y", h], ["$D", g]].forEach((function(L) {
        S[L[1]] = function(N) {
          return this.$g(N, L[0], L[1]);
        };
      })), M.extend = function(L, N) {
        return L.$i || (L(N, b, M), L.$i = !0), M;
      }, M.locale = j, M.isDayjs = V, M.unix = function(L) {
        return M(1e3 * L);
      }, M.en = k[x], M.Ls = k, M.p = {}, M;
    }));
  })(ha)), ha.exports;
}
var j0 = P0();
const Ka = /* @__PURE__ */ wr(j0);
var ma = { exports: {} }, A0 = ma.exports, ul;
function M0() {
  return ul || (ul = 1, (function(e, t) {
    (function(a, r) {
      e.exports = r();
    })(A0, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, r = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, o = /\d\d/, i = /\d\d?/, s = /\d*[^-_:/,()\s\d]+/, l = {}, u = function(v) {
        return (v = +v) + (v > 68 ? 1900 : 2e3);
      }, c = function(v) {
        return function(C) {
          this[v] = +C;
        };
      }, d = [/[+-]\d\d:?(\d\d)?|Z/, function(v) {
        (this.zone || (this.zone = {})).offset = (function(C) {
          if (!C || C === "Z") return 0;
          var T = C.match(/([+-]|\d\d)/g), A = 60 * T[1] + (+T[2] || 0);
          return A === 0 ? 0 : T[0] === "+" ? -A : A;
        })(v);
      }], p = function(v) {
        var C = l[v];
        return C && (C.indexOf ? C : C.s.concat(C.f));
      }, h = function(v, C) {
        var T, A = l.meridiem;
        if (A) {
          for (var f = 1; f <= 24; f += 1) if (v.indexOf(A(f, 0, C)) > -1) {
            T = f > 12;
            break;
          }
        } else T = v === (C ? "pm" : "PM");
        return T;
      }, g = { A: [s, function(v) {
        this.afternoon = h(v, !1);
      }], a: [s, function(v) {
        this.afternoon = h(v, !0);
      }], Q: [n, function(v) {
        this.month = 3 * (v - 1) + 1;
      }], S: [n, function(v) {
        this.milliseconds = 100 * +v;
      }], SS: [o, function(v) {
        this.milliseconds = 10 * +v;
      }], SSS: [/\d{3}/, function(v) {
        this.milliseconds = +v;
      }], s: [i, c("seconds")], ss: [i, c("seconds")], m: [i, c("minutes")], mm: [i, c("minutes")], H: [i, c("hours")], h: [i, c("hours")], HH: [i, c("hours")], hh: [i, c("hours")], D: [i, c("day")], DD: [o, c("day")], Do: [s, function(v) {
        var C = l.ordinal, T = v.match(/\d+/);
        if (this.day = T[0], C) for (var A = 1; A <= 31; A += 1) C(A).replace(/\[|\]/g, "") === v && (this.day = A);
      }], w: [i, c("week")], ww: [o, c("week")], M: [i, c("month")], MM: [o, c("month")], MMM: [s, function(v) {
        var C = p("months"), T = (p("monthsShort") || C.map((function(A) {
          return A.slice(0, 3);
        }))).indexOf(v) + 1;
        if (T < 1) throw new Error();
        this.month = T % 12 || T;
      }], MMMM: [s, function(v) {
        var C = p("months").indexOf(v) + 1;
        if (C < 1) throw new Error();
        this.month = C % 12 || C;
      }], Y: [/[+-]?\d+/, c("year")], YY: [o, function(v) {
        this.year = u(v);
      }], YYYY: [/\d{4}/, c("year")], Z: d, ZZ: d };
      function m(v) {
        var C, T;
        C = v, T = l && l.formats;
        for (var A = (v = C.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(M, I, b) {
          var S = b && b.toUpperCase();
          return I || T[b] || a[b] || T[S].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(L, N, R) {
            return N || R.slice(1);
          }));
        }))).match(r), f = A.length, x = 0; x < f; x += 1) {
          var k = A[x], D = g[k], V = D && D[0], j = D && D[1];
          A[x] = j ? { regex: V, parser: j } : k.replace(/^\[|\]$/g, "");
        }
        return function(M) {
          for (var I = {}, b = 0, S = 0; b < f; b += 1) {
            var L = A[b];
            if (typeof L == "string") S += L.length;
            else {
              var N = L.regex, R = L.parser, U = M.slice(S), B = N.exec(U)[0];
              R.call(I, B), M = M.replace(B, "");
            }
          }
          return (function(J) {
            var W = J.afternoon;
            if (W !== void 0) {
              var ae = J.hours;
              W ? ae < 12 && (J.hours += 12) : ae === 12 && (J.hours = 0), delete J.afternoon;
            }
          })(I), I;
        };
      }
      return function(v, C, T) {
        T.p.customParseFormat = !0, v && v.parseTwoDigitYear && (u = v.parseTwoDigitYear);
        var A = C.prototype, f = A.parse;
        A.parse = function(x) {
          var k = x.date, D = x.utc, V = x.args;
          this.$u = D;
          var j = V[1];
          if (typeof j == "string") {
            var M = V[2] === !0, I = V[3] === !0, b = M || I, S = V[2];
            I && (S = V[2]), l = this.$locale(), !M && S && (l = T.Ls[S]), this.$d = (function(U, B, J, W) {
              try {
                if (["x", "X"].indexOf(B) > -1) return new Date((B === "X" ? 1e3 : 1) * U);
                var ae = m(B)(U), re = ae.year, de = ae.month, pe = ae.day, Se = ae.hours, fe = ae.minutes, ce = ae.seconds, ue = ae.milliseconds, me = ae.zone, be = ae.week, Pe = /* @__PURE__ */ new Date(), De = pe || (re || de ? 1 : Pe.getDate()), ze = re || Pe.getFullYear(), We = 0;
                re && !de || (We = de > 0 ? de - 1 : Pe.getMonth());
                var ht, je = Se || 0, He = fe || 0, Ge = ce || 0, Ue = ue || 0;
                return me ? new Date(Date.UTC(ze, We, De, je, He, Ge, Ue + 60 * me.offset * 1e3)) : J ? new Date(Date.UTC(ze, We, De, je, He, Ge, Ue)) : (ht = new Date(ze, We, De, je, He, Ge, Ue), be && (ht = W(ht).week(be).toDate()), ht);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(k, j, D, T), this.init(), S && S !== !0 && (this.$L = this.locale(S).$L), b && k != this.format(j) && (this.$d = /* @__PURE__ */ new Date("")), l = {};
          } else if (j instanceof Array) for (var L = j.length, N = 1; N <= L; N += 1) {
            V[1] = j[N - 1];
            var R = T.apply(this, V);
            if (R.isValid()) {
              this.$d = R.$d, this.$L = R.$L, this.init();
              break;
            }
            N === L && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else f.call(this, x);
        };
      };
    }));
  })(ma)), ma.exports;
}
var I0 = M0();
const L0 = /* @__PURE__ */ wr(I0);
var ga = { exports: {} }, D0 = ga.exports, dl;
function N0() {
  return dl || (dl = 1, (function(e, t) {
    (function(a, r) {
      e.exports = r();
    })(D0, (function() {
      var a = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, r = {};
      return function(n, o, i) {
        var s, l = function(p, h, g) {
          g === void 0 && (g = {});
          var m = new Date(p), v = (function(C, T) {
            T === void 0 && (T = {});
            var A = T.timeZoneName || "short", f = C + "|" + A, x = r[f];
            return x || (x = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: C, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: A }), r[f] = x), x;
          })(h, g);
          return v.formatToParts(m);
        }, u = function(p, h) {
          for (var g = l(p, h), m = [], v = 0; v < g.length; v += 1) {
            var C = g[v], T = C.type, A = C.value, f = a[T];
            f >= 0 && (m[f] = parseInt(A, 10));
          }
          var x = m[3], k = x === 24 ? 0 : x, D = m[0] + "-" + m[1] + "-" + m[2] + " " + k + ":" + m[4] + ":" + m[5] + ":000", V = +p;
          return (i.utc(D).valueOf() - (V -= V % 1e3)) / 6e4;
        }, c = o.prototype;
        c.tz = function(p, h) {
          p === void 0 && (p = s);
          var g, m = this.utcOffset(), v = this.toDate(), C = v.toLocaleString("en-US", { timeZone: p }), T = Math.round((v - new Date(C)) / 1e3 / 60), A = 15 * -Math.round(v.getTimezoneOffset() / 15) - T;
          if (!Number(A)) g = this.utcOffset(0, h);
          else if (g = i(C, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(A, !0), h) {
            var f = g.utcOffset();
            g = g.add(m - f, "minute");
          }
          return g.$x.$timezone = p, g;
        }, c.offsetName = function(p) {
          var h = this.$x.$timezone || i.tz.guess(), g = l(this.valueOf(), h, { timeZoneName: p }).find((function(m) {
            return m.type.toLowerCase() === "timezonename";
          }));
          return g && g.value;
        };
        var d = c.startOf;
        c.startOf = function(p, h) {
          if (!this.$x || !this.$x.$timezone) return d.call(this, p, h);
          var g = i(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return d.call(g, p, h).tz(this.$x.$timezone, !0);
        }, i.tz = function(p, h, g) {
          var m = g && h, v = g || h || s, C = u(+i(), v);
          if (typeof p != "string") return i(p).tz(v);
          var T = (function(k, D, V) {
            var j = k - 60 * D * 1e3, M = u(j, V);
            if (D === M) return [j, D];
            var I = u(j -= 60 * (M - D) * 1e3, V);
            return M === I ? [j, M] : [k - 60 * Math.min(M, I) * 1e3, Math.max(M, I)];
          })(i.utc(p, m).valueOf(), C, v), A = T[0], f = T[1], x = i(A).utcOffset(f);
          return x.$x.$timezone = v, x;
        }, i.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, i.tz.setDefault = function(p) {
          s = p;
        };
      };
    }));
  })(ga)), ga.exports;
}
var B0 = N0();
const F0 = /* @__PURE__ */ wr(B0);
var ba = { exports: {} }, z0 = ba.exports, fl;
function W0() {
  return fl || (fl = 1, (function(e, t) {
    (function(a, r) {
      e.exports = r();
    })(z0, (function() {
      var a = "minute", r = /[+-]\d\d(?::?\d\d)?/g, n = /([+-]|\d\d)/g;
      return function(o, i, s) {
        var l = i.prototype;
        s.utc = function(m) {
          var v = { date: m, utc: !0, args: arguments };
          return new i(v);
        }, l.utc = function(m) {
          var v = s(this.toDate(), { locale: this.$L, utc: !0 });
          return m ? v.add(this.utcOffset(), a) : v;
        }, l.local = function() {
          return s(this.toDate(), { locale: this.$L, utc: !1 });
        };
        var u = l.parse;
        l.parse = function(m) {
          m.utc && (this.$u = !0), this.$utils().u(m.$offset) || (this.$offset = m.$offset), u.call(this, m);
        };
        var c = l.init;
        l.init = function() {
          if (this.$u) {
            var m = this.$d;
            this.$y = m.getUTCFullYear(), this.$M = m.getUTCMonth(), this.$D = m.getUTCDate(), this.$W = m.getUTCDay(), this.$H = m.getUTCHours(), this.$m = m.getUTCMinutes(), this.$s = m.getUTCSeconds(), this.$ms = m.getUTCMilliseconds();
          } else c.call(this);
        };
        var d = l.utcOffset;
        l.utcOffset = function(m, v) {
          var C = this.$utils().u;
          if (C(m)) return this.$u ? 0 : C(this.$offset) ? d.call(this) : this.$offset;
          if (typeof m == "string" && (m = (function(x) {
            x === void 0 && (x = "");
            var k = x.match(r);
            if (!k) return null;
            var D = ("" + k[0]).match(n) || ["-", 0, 0], V = D[0], j = 60 * +D[1] + +D[2];
            return j === 0 ? 0 : V === "+" ? j : -j;
          })(m), m === null)) return this;
          var T = Math.abs(m) <= 16 ? 60 * m : m;
          if (T === 0) return this.utc(v);
          var A = this.clone();
          if (v) return A.$offset = T, A.$u = !1, A;
          var f = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          return (A = this.local().add(T + f, a)).$offset = T, A.$x.$localOffset = f, A;
        };
        var p = l.format;
        l.format = function(m) {
          var v = m || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return p.call(this, v);
        }, l.valueOf = function() {
          var m = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * m;
        }, l.isUTC = function() {
          return !!this.$u;
        }, l.toISOString = function() {
          return this.toDate().toISOString();
        }, l.toString = function() {
          return this.toDate().toUTCString();
        };
        var h = l.toDate;
        l.toDate = function(m) {
          return m === "s" && this.$offset ? s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : h.call(this);
        };
        var g = l.diff;
        l.diff = function(m, v, C) {
          if (m && this.$u === m.$u) return g.call(this, m, v, C);
          var T = this.local(), A = s(m).local();
          return g.call(T, A, v, C);
        };
      };
    }));
  })(ba)), ba.exports;
}
var V0 = W0();
const H0 = /* @__PURE__ */ wr(V0);
Ka.extend(F0);
Ka.extend(H0);
Ka.extend(L0);
function K0(e, t, a = "HH:mm:ss") {
  return Ka(e).tz(t).format(a);
}
var Wl;
const q0 = ((Wl = Intl.DateTimeFormat().resolvedOptions().timeZone) == null ? void 0 : Wl.toString()) || "UTC", U0 = (e) => typeof e == "string" ? e === "" ? /* @__PURE__ */ new Date() : new Date(e) : e, G0 = (e, t = q0) => {
  const a = U0(e);
  return `${K0(
    a,
    t,
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  )}`;
}, Y0 = "INFO", X0 = "INFO", J0 = "WARN", Z0 = "ERROR", Q0 = "FAILED", eb = "SUCCEEDED", Hc = tr(
  (e) => cr({
    disableUserSelect: {
      userSelect: "none"
    },
    "@global": {
      "@keyframes refreshRotation": {
        from: {
          transform: "rotate(0deg)"
        },
        to: {
          transform: "rotate(360deg)"
        }
      }
    },
    highlightedLogLine: {
      backgroundColor: "#D8E1E8"
    },
    selectedLogLine: {
      backgroundColor: Le("#ccd1f2", 1)
    },
    traceIdAvailableLogLine: {
      backgroundColor: "#E5E4E2",
      cursor: "point"
    },
    whiteBackground: {
      backgroundColor: e.palette.common.white
    },
    logLineWrapper: { display: "flex" },
    expandedLogKey: {
      width: e.spacing(35),
      paddingLeft: e.spacing(0.5)
    },
    defaultLogLine: {
      fontFamily: "Droid Sans Mono",
      minWidth: "100%",
      paddingLeft: e.spacing(0.4),
      fontSize: e.spacing(1.375),
      transitionDuration: "0.25s",
      transitionProperty: "background-color",
      overflow: "visible",
      minHeight: e.spacing(3),
      display: "inline-flex",
      diplayDirection: "row",
      "& $actionContainer": {
        visibility: "hidden"
      },
      "&:hover": {
        background: Le("#E5E4E2", 1)
      }
    },
    "@keyframes animFade": {
      from: {
        opacity: 0
      },
      to: { opacity: 1 }
    },
    toolTipParent: {
      display: "inline-flex",
      lineHeight: e.spacing(0.25),
      "& $toolTipChild": {
        visibility: "hidden"
      },
      "&:hover": {
        "& $toolTipChild": {
          visibility: "visible",
          animation: "$animFade 250ms 1"
        }
      }
    },
    toolTipChild: {
      top: e.spacing(-4),
      padding: e.spacing(0.5),
      color: e.palette.primary.main,
      display: "flex",
      background: e.palette.common.white,
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.19)",
      userSelect: "none",
      borderRadius: e.spacing(0.625),
      position: "absolute",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: e.palette.common.white
      }
    },
    logEntryActions: {
      position: "relative",
      display: "flex",
      paddingRight: e.spacing(1.25)
    },
    actionContainer: {
      top: e.spacing(-6),
      padding: e.spacing(0.5),
      display: "flex",
      width: "max-content",
      background: e.palette.common.white,
      position: "absolute",
      cursor: "pointer",
      border: `1px solid ${e.palette.grey[100]}`,
      borderColor: e.palette.grey[100],
      borderRadius: e.spacing(0.625),
      backgroundColor: e.palette.common.white,
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.19)"
    },
    actionButton: {
      display: "flex",
      alignItems: "center",
      padding: `${e.spacing(0.5)}px ${e.spacing(1)}px`,
      gap: e.spacing(0.5),
      height: e.spacing(3),
      backgroundColor: Le(e.palette.common.white, 0),
      flex: "none",
      border: e.palette.grey[100],
      cursor: "pointer",
      "&:hover": {
        "& $actionIcon": {
          color: e.palette.primary.light
        },
        "& $actionLabel": {
          color: e.palette.primary.light
        }
      }
    },
    actionIcon: {
      width: e.spacing(1.625),
      height: e.spacing(1.625),
      color: e.palette.primary.main
    },
    actionLabel: {
      fontFamily: e.typography.fontFamily,
      fontWeight: 400,
      fontSize: e.spacing(1.625),
      lineHeight: e.spacing(0.23),
      color: e.palette.primary.main
    },
    errorLogs: {
      color: "#EA4C4D",
      lineHeight: e.spacing(0.25)
    },
    infoLogs: {
      color: "#53C08A",
      lineHeight: e.spacing(0.25)
    },
    warningLogs: {
      color: "#FF9D52",
      lineHeight: e.spacing(0.25)
    },
    logOther: {
      color: e.palette.secondary.dark,
      lineHeight: e.spacing(0.25)
    },
    logContextKeyValue: {
      color: "#0095ff"
    },
    logMsg: {
      lineHeight: e.spacing(0.25),
      display: "inline",
      overflow: "visible",
      whiteSpace: "nowrap",
      "&:hover": {
        "& $actionContainer": {
          visibility: "visible",
          animation: "$animFade 250ms 1",
          backgroundColor: e.palette.common.white
        }
      }
    },
    infoSection: {
      display: "inline",
      whiteSpace: "nowrap"
    },
    arrow: {
      color: e.palette.primary.main,
      fontSize: e.spacing(1),
      lineHeight: e.spacing(0.25),
      padding: e.spacing(0.5),
      cursor: "pointer"
    },
    logContextDivider: {
      color: e.palette.divider
    },
    lastLogTimeStamp: {
      borderBottom: `1px dashed ${e.palette.primary.main}`
    },
    // Note: Added important to avoid overriding by virtualize lib
    // Note: Added type casting to 'auto !important' as 'auto' to avoid type error
    logsList: {
      overflowX: "auto !important"
    },
    expandedLogRow: {
      width: "fit-content",
      borderBottom: "1px solid #E5E4E2",
      padding: e.spacing(0.5, 0),
      display: "flex",
      backgroundColor: e.palette.common.white
    },
    tableContainer: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: e.spacing(8),
      overflowX: "visible",
      whiteSpace: "nowrap"
    },
    logsListContainer: {
      width: "100%",
      height: "100%",
      paddingLeft: e.spacing(2),
      backgroundColor: e.palette.common.white
    },
    logColor1: {
      color: "#745BCC"
    },
    logColor2: {
      color: "#2366CC"
    },
    logColor3: {
      color: "#2366CC"
    },
    logColor4: {
      color: "#0095ff"
    },
    alertMetric: {
      filter: "hue-rotate(45deg)"
    }
  })
);
var va = { exports: {} }, tb = va.exports, pl;
function rb() {
  return pl || (pl = 1, (function(e, t) {
    (function(a, r) {
      e.exports = r(st);
    })(tb, (function(a) {
      return (function(r) {
        var n = {};
        function o(i) {
          if (n[i]) return n[i].exports;
          var s = n[i] = { i, l: !1, exports: {} };
          return r[i].call(s.exports, s, s.exports, o), s.l = !0, s.exports;
        }
        return o.m = r, o.c = n, o.d = function(i, s, l) {
          o.o(i, s) || Object.defineProperty(i, s, { enumerable: !0, get: l });
        }, o.r = function(i) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
        }, o.t = function(i, s) {
          if (1 & s && (i = o(i)), 8 & s || 4 & s && typeof i == "object" && i && i.__esModule) return i;
          var l = /* @__PURE__ */ Object.create(null);
          if (o.r(l), Object.defineProperty(l, "default", { enumerable: !0, value: i }), 2 & s && typeof i != "string") for (var u in i) o.d(l, u, (function(c) {
            return i[c];
          }).bind(null, u));
          return l;
        }, o.n = function(i) {
          var s = i && i.__esModule ? function() {
            return i.default;
          } : function() {
            return i;
          };
          return o.d(s, "a", s), s;
        }, o.o = function(i, s) {
          return Object.prototype.hasOwnProperty.call(i, s);
        }, o.p = "", o(o.s = 48);
      })([function(r, n) {
        r.exports = a;
      }, function(r, n) {
        var o = r.exports = { version: "2.6.12" };
        typeof __e == "number" && (__e = o);
      }, function(r, n, o) {
        var i = o(26)("wks"), s = o(17), l = o(3).Symbol, u = typeof l == "function";
        (r.exports = function(c) {
          return i[c] || (i[c] = u && l[c] || (u ? l : s)("Symbol." + c));
        }).store = i;
      }, function(r, n) {
        var o = r.exports = typeof window < "u" && window.Math == Math ? window : typeof self < "u" && self.Math == Math ? self : Function("return this")();
        typeof __g == "number" && (__g = o);
      }, function(r, n, o) {
        r.exports = !o(8)((function() {
          return Object.defineProperty({}, "a", { get: function() {
            return 7;
          } }).a != 7;
        }));
      }, function(r, n) {
        var o = {}.hasOwnProperty;
        r.exports = function(i, s) {
          return o.call(i, s);
        };
      }, function(r, n, o) {
        var i = o(7), s = o(16);
        r.exports = o(4) ? function(l, u, c) {
          return i.f(l, u, s(1, c));
        } : function(l, u, c) {
          return l[u] = c, l;
        };
      }, function(r, n, o) {
        var i = o(10), s = o(35), l = o(23), u = Object.defineProperty;
        n.f = o(4) ? Object.defineProperty : function(c, d, p) {
          if (i(c), d = l(d, !0), i(p), s) try {
            return u(c, d, p);
          } catch {
          }
          if ("get" in p || "set" in p) throw TypeError("Accessors not supported!");
          return "value" in p && (c[d] = p.value), c;
        };
      }, function(r, n) {
        r.exports = function(o) {
          try {
            return !!o();
          } catch {
            return !0;
          }
        };
      }, function(r, n, o) {
        var i = o(40), s = o(22);
        r.exports = function(l) {
          return i(s(l));
        };
      }, function(r, n, o) {
        var i = o(11);
        r.exports = function(s) {
          if (!i(s)) throw TypeError(s + " is not an object!");
          return s;
        };
      }, function(r, n) {
        r.exports = function(o) {
          return typeof o == "object" ? o !== null : typeof o == "function";
        };
      }, function(r, n) {
        r.exports = {};
      }, function(r, n, o) {
        var i = o(39), s = o(27);
        r.exports = Object.keys || function(l) {
          return i(l, s);
        };
      }, function(r, n) {
        r.exports = !0;
      }, function(r, n, o) {
        var i = o(3), s = o(1), l = o(53), u = o(6), c = o(5), d = function(p, h, g) {
          var m, v, C, T = p & d.F, A = p & d.G, f = p & d.S, x = p & d.P, k = p & d.B, D = p & d.W, V = A ? s : s[h] || (s[h] = {}), j = V.prototype, M = A ? i : f ? i[h] : (i[h] || {}).prototype;
          for (m in A && (g = h), g) (v = !T && M && M[m] !== void 0) && c(V, m) || (C = v ? M[m] : g[m], V[m] = A && typeof M[m] != "function" ? g[m] : k && v ? l(C, i) : D && M[m] == C ? (function(I) {
            var b = function(S, L, N) {
              if (this instanceof I) {
                switch (arguments.length) {
                  case 0:
                    return new I();
                  case 1:
                    return new I(S);
                  case 2:
                    return new I(S, L);
                }
                return new I(S, L, N);
              }
              return I.apply(this, arguments);
            };
            return b.prototype = I.prototype, b;
          })(C) : x && typeof C == "function" ? l(Function.call, C) : C, x && ((V.virtual || (V.virtual = {}))[m] = C, p & d.R && j && !j[m] && u(j, m, C)));
        };
        d.F = 1, d.G = 2, d.S = 4, d.P = 8, d.B = 16, d.W = 32, d.U = 64, d.R = 128, r.exports = d;
      }, function(r, n) {
        r.exports = function(o, i) {
          return { enumerable: !(1 & o), configurable: !(2 & o), writable: !(4 & o), value: i };
        };
      }, function(r, n) {
        var o = 0, i = Math.random();
        r.exports = function(s) {
          return "Symbol(".concat(s === void 0 ? "" : s, ")_", (++o + i).toString(36));
        };
      }, function(r, n, o) {
        var i = o(22);
        r.exports = function(s) {
          return Object(i(s));
        };
      }, function(r, n) {
        n.f = {}.propertyIsEnumerable;
      }, function(r, n, o) {
        var i = o(52)(!0);
        o(34)(String, "String", (function(s) {
          this._t = String(s), this._i = 0;
        }), (function() {
          var s, l = this._t, u = this._i;
          return u >= l.length ? { value: void 0, done: !0 } : (s = i(l, u), this._i += s.length, { value: s, done: !1 });
        }));
      }, function(r, n) {
        var o = Math.ceil, i = Math.floor;
        r.exports = function(s) {
          return isNaN(s = +s) ? 0 : (s > 0 ? i : o)(s);
        };
      }, function(r, n) {
        r.exports = function(o) {
          if (o == null) throw TypeError("Can't call method on  " + o);
          return o;
        };
      }, function(r, n, o) {
        var i = o(11);
        r.exports = function(s, l) {
          if (!i(s)) return s;
          var u, c;
          if (l && typeof (u = s.toString) == "function" && !i(c = u.call(s)) || typeof (u = s.valueOf) == "function" && !i(c = u.call(s)) || !l && typeof (u = s.toString) == "function" && !i(c = u.call(s))) return c;
          throw TypeError("Can't convert object to primitive value");
        };
      }, function(r, n) {
        var o = {}.toString;
        r.exports = function(i) {
          return o.call(i).slice(8, -1);
        };
      }, function(r, n, o) {
        var i = o(26)("keys"), s = o(17);
        r.exports = function(l) {
          return i[l] || (i[l] = s(l));
        };
      }, function(r, n, o) {
        var i = o(1), s = o(3), l = s["__core-js_shared__"] || (s["__core-js_shared__"] = {});
        (r.exports = function(u, c) {
          return l[u] || (l[u] = c !== void 0 ? c : {});
        })("versions", []).push({ version: i.version, mode: o(14) ? "pure" : "global", copyright: "© 2020 Denis Pushkarev (zloirock.ru)" });
      }, function(r, n) {
        r.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
      }, function(r, n, o) {
        var i = o(7).f, s = o(5), l = o(2)("toStringTag");
        r.exports = function(u, c, d) {
          u && !s(u = d ? u : u.prototype, l) && i(u, l, { configurable: !0, value: c });
        };
      }, function(r, n, o) {
        o(62);
        for (var i = o(3), s = o(6), l = o(12), u = o(2)("toStringTag"), c = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), d = 0; d < c.length; d++) {
          var p = c[d], h = i[p], g = h && h.prototype;
          g && !g[u] && s(g, u, p), l[p] = l.Array;
        }
      }, function(r, n, o) {
        n.f = o(2);
      }, function(r, n, o) {
        var i = o(3), s = o(1), l = o(14), u = o(30), c = o(7).f;
        r.exports = function(d) {
          var p = s.Symbol || (s.Symbol = l ? {} : i.Symbol || {});
          d.charAt(0) == "_" || d in p || c(p, d, { value: u.f(d) });
        };
      }, function(r, n) {
        n.f = Object.getOwnPropertySymbols;
      }, function(r, n) {
        r.exports = function(o, i, s) {
          return Math.min(Math.max(o, i), s);
        };
      }, function(r, n, o) {
        var i = o(14), s = o(15), l = o(37), u = o(6), c = o(12), d = o(55), p = o(28), h = o(61), g = o(2)("iterator"), m = !([].keys && "next" in [].keys()), v = function() {
          return this;
        };
        r.exports = function(C, T, A, f, x, k, D) {
          d(A, T, f);
          var V, j, M, I = function(W) {
            if (!m && W in N) return N[W];
            switch (W) {
              case "keys":
              case "values":
                return function() {
                  return new A(this, W);
                };
            }
            return function() {
              return new A(this, W);
            };
          }, b = T + " Iterator", S = x == "values", L = !1, N = C.prototype, R = N[g] || N["@@iterator"] || x && N[x], U = R || I(x), B = x ? S ? I("entries") : U : void 0, J = T == "Array" && N.entries || R;
          if (J && (M = h(J.call(new C()))) !== Object.prototype && M.next && (p(M, b, !0), i || typeof M[g] == "function" || u(M, g, v)), S && R && R.name !== "values" && (L = !0, U = function() {
            return R.call(this);
          }), i && !D || !m && !L && N[g] || u(N, g, U), c[T] = U, c[b] = v, x) if (V = { values: S ? U : I("values"), keys: k ? U : I("keys"), entries: B }, D) for (j in V) j in N || l(N, j, V[j]);
          else s(s.P + s.F * (m || L), T, V);
          return V;
        };
      }, function(r, n, o) {
        r.exports = !o(4) && !o(8)((function() {
          return Object.defineProperty(o(36)("div"), "a", { get: function() {
            return 7;
          } }).a != 7;
        }));
      }, function(r, n, o) {
        var i = o(11), s = o(3).document, l = i(s) && i(s.createElement);
        r.exports = function(u) {
          return l ? s.createElement(u) : {};
        };
      }, function(r, n, o) {
        r.exports = o(6);
      }, function(r, n, o) {
        var i = o(10), s = o(56), l = o(27), u = o(25)("IE_PROTO"), c = function() {
        }, d = function() {
          var p, h = o(36)("iframe"), g = l.length;
          for (h.style.display = "none", o(60).appendChild(h), h.src = "javascript:", (p = h.contentWindow.document).open(), p.write("<script>document.F=Object<\/script>"), p.close(), d = p.F; g--; ) delete d.prototype[l[g]];
          return d();
        };
        r.exports = Object.create || function(p, h) {
          var g;
          return p !== null ? (c.prototype = i(p), g = new c(), c.prototype = null, g[u] = p) : g = d(), h === void 0 ? g : s(g, h);
        };
      }, function(r, n, o) {
        var i = o(5), s = o(9), l = o(57)(!1), u = o(25)("IE_PROTO");
        r.exports = function(c, d) {
          var p, h = s(c), g = 0, m = [];
          for (p in h) p != u && i(h, p) && m.push(p);
          for (; d.length > g; ) i(h, p = d[g++]) && (~l(m, p) || m.push(p));
          return m;
        };
      }, function(r, n, o) {
        var i = o(24);
        r.exports = Object("z").propertyIsEnumerable(0) ? Object : function(s) {
          return i(s) == "String" ? s.split("") : Object(s);
        };
      }, function(r, n, o) {
        var i = o(39), s = o(27).concat("length", "prototype");
        n.f = Object.getOwnPropertyNames || function(l) {
          return i(l, s);
        };
      }, function(r, n, o) {
        var i = o(24), s = o(2)("toStringTag"), l = i(/* @__PURE__ */ (function() {
          return arguments;
        })()) == "Arguments";
        r.exports = function(u) {
          var c, d, p;
          return u === void 0 ? "Undefined" : u === null ? "Null" : typeof (d = (function(h, g) {
            try {
              return h[g];
            } catch {
            }
          })(c = Object(u), s)) == "string" ? d : l ? i(c) : (p = i(c)) == "Object" && typeof c.callee == "function" ? "Arguments" : p;
        };
      }, function(r, n) {
        var o;
        o = /* @__PURE__ */ (function() {
          return this;
        })();
        try {
          o = o || new Function("return this")();
        } catch {
          typeof window == "object" && (o = window);
        }
        r.exports = o;
      }, function(r, n) {
        var o = /-?\d+(\.\d+)?%?/g;
        r.exports = function(i) {
          return i.match(o);
        };
      }, function(r, n, o) {
        Object.defineProperty(n, "__esModule", { value: !0 }), n.getBase16Theme = n.createStyling = n.invertTheme = void 0;
        var i = v(o(49)), s = v(o(76)), l = v(o(81)), u = v(o(89)), c = v(o(93)), d = (function(j) {
          if (j && j.__esModule) return j;
          var M = {};
          if (j != null) for (var I in j) Object.prototype.hasOwnProperty.call(j, I) && (M[I] = j[I]);
          return M.default = j, M;
        })(o(94)), p = v(o(132)), h = v(o(133)), g = v(o(138)), m = o(139);
        function v(j) {
          return j && j.__esModule ? j : { default: j };
        }
        var C = d.default, T = (0, u.default)(C), A = (0, g.default)(h.default, m.rgb2yuv, (function(j) {
          var M, I = (0, l.default)(j, 3), b = I[0], S = I[1], L = I[2];
          return [(M = b, M < 0.25 ? 1 : M < 0.5 ? 0.9 - M : 1.1 - M), S, L];
        }), m.yuv2rgb, p.default), f = function(j) {
          return function(M) {
            return { className: [M.className, j.className].filter(Boolean).join(" "), style: (0, s.default)({}, M.style || {}, j.style || {}) };
          };
        }, x = function(j, M) {
          var I = (0, u.default)(M);
          for (var b in j) I.indexOf(b) === -1 && I.push(b);
          return I.reduce((function(S, L) {
            return S[L] = (function(N, R) {
              if (N === void 0) return R;
              if (R === void 0) return N;
              var U = N === void 0 ? "undefined" : (0, i.default)(N), B = R === void 0 ? "undefined" : (0, i.default)(R);
              switch (U) {
                case "string":
                  switch (B) {
                    case "string":
                      return [R, N].filter(Boolean).join(" ");
                    case "object":
                      return f({ className: N, style: R });
                    case "function":
                      return function(J) {
                        for (var W = arguments.length, ae = Array(W > 1 ? W - 1 : 0), re = 1; re < W; re++) ae[re - 1] = arguments[re];
                        return f({ className: N })(R.apply(void 0, [J].concat(ae)));
                      };
                  }
                case "object":
                  switch (B) {
                    case "string":
                      return f({ className: R, style: N });
                    case "object":
                      return (0, s.default)({}, R, N);
                    case "function":
                      return function(J) {
                        for (var W = arguments.length, ae = Array(W > 1 ? W - 1 : 0), re = 1; re < W; re++) ae[re - 1] = arguments[re];
                        return f({ style: N })(R.apply(void 0, [J].concat(ae)));
                      };
                  }
                case "function":
                  switch (B) {
                    case "string":
                      return function(J) {
                        for (var W = arguments.length, ae = Array(W > 1 ? W - 1 : 0), re = 1; re < W; re++) ae[re - 1] = arguments[re];
                        return N.apply(void 0, [f(J)({ className: R })].concat(ae));
                      };
                    case "object":
                      return function(J) {
                        for (var W = arguments.length, ae = Array(W > 1 ? W - 1 : 0), re = 1; re < W; re++) ae[re - 1] = arguments[re];
                        return N.apply(void 0, [f(J)({ style: R })].concat(ae));
                      };
                    case "function":
                      return function(J) {
                        for (var W = arguments.length, ae = Array(W > 1 ? W - 1 : 0), re = 1; re < W; re++) ae[re - 1] = arguments[re];
                        return N.apply(void 0, [R.apply(void 0, [J].concat(ae))].concat(ae));
                      };
                  }
              }
            })(j[L], M[L]), S;
          }), {});
        }, k = function(j, M) {
          for (var I = arguments.length, b = Array(I > 2 ? I - 2 : 0), S = 2; S < I; S++) b[S - 2] = arguments[S];
          if (M === null) return j;
          Array.isArray(M) || (M = [M]);
          var L = M.map((function(R) {
            return j[R];
          })).filter(Boolean), N = L.reduce((function(R, U) {
            return typeof U == "string" ? R.className = [R.className, U].filter(Boolean).join(" ") : (U === void 0 ? "undefined" : (0, i.default)(U)) === "object" ? R.style = (0, s.default)({}, R.style, U) : typeof U == "function" && (R = (0, s.default)({}, R, U.apply(void 0, [R].concat(b)))), R;
          }), { className: "", style: {} });
          return N.className || delete N.className, (0, u.default)(N.style).length === 0 && delete N.style, N;
        }, D = n.invertTheme = function(j) {
          return (0, u.default)(j).reduce((function(M, I) {
            return M[I] = /^base/.test(I) ? A(j[I]) : I === "scheme" ? j[I] + ":inverted" : j[I], M;
          }), {});
        }, V = (n.createStyling = (0, c.default)((function(j) {
          for (var M = arguments.length, I = Array(M > 3 ? M - 3 : 0), b = 3; b < M; b++) I[b - 3] = arguments[b];
          var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, L = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, N = S.defaultBase16, R = N === void 0 ? C : N, U = S.base16Themes, B = U === void 0 ? null : U, J = V(L, B);
          J && (L = (0, s.default)({}, J, L));
          var W = T.reduce((function(pe, Se) {
            return pe[Se] = L[Se] || R[Se], pe;
          }), {}), ae = (0, u.default)(L).reduce((function(pe, Se) {
            return T.indexOf(Se) === -1 && (pe[Se] = L[Se]), pe;
          }), {}), re = j(W), de = x(ae, re);
          return (0, c.default)(k, 2).apply(void 0, [de].concat(I));
        }), 3), n.getBase16Theme = function(j, M) {
          if (j && j.extend && (j = j.extend), typeof j == "string") {
            var I = j.split(":"), b = (0, l.default)(I, 2), S = b[0], L = b[1];
            j = (M || {})[S] || d[S], L === "inverted" && (j = D(j));
          }
          return j && j.hasOwnProperty("base00") ? j : void 0;
        });
      }, function(r, n, o) {
        var i, s = typeof Reflect == "object" ? Reflect : null, l = s && typeof s.apply == "function" ? s.apply : function(f, x, k) {
          return Function.prototype.apply.call(f, x, k);
        };
        i = s && typeof s.ownKeys == "function" ? s.ownKeys : Object.getOwnPropertySymbols ? function(f) {
          return Object.getOwnPropertyNames(f).concat(Object.getOwnPropertySymbols(f));
        } : function(f) {
          return Object.getOwnPropertyNames(f);
        };
        var u = Number.isNaN || function(f) {
          return f != f;
        };
        function c() {
          c.init.call(this);
        }
        r.exports = c, r.exports.once = function(f, x) {
          return new Promise((function(k, D) {
            function V() {
              j !== void 0 && f.removeListener("error", j), k([].slice.call(arguments));
            }
            var j;
            x !== "error" && (j = function(M) {
              f.removeListener(x, V), D(M);
            }, f.once("error", j)), f.once(x, V);
          }));
        }, c.EventEmitter = c, c.prototype._events = void 0, c.prototype._eventsCount = 0, c.prototype._maxListeners = void 0;
        var d = 10;
        function p(f) {
          if (typeof f != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof f);
        }
        function h(f) {
          return f._maxListeners === void 0 ? c.defaultMaxListeners : f._maxListeners;
        }
        function g(f, x, k, D) {
          var V, j, M, I;
          if (p(k), (j = f._events) === void 0 ? (j = f._events = /* @__PURE__ */ Object.create(null), f._eventsCount = 0) : (j.newListener !== void 0 && (f.emit("newListener", x, k.listener ? k.listener : k), j = f._events), M = j[x]), M === void 0) M = j[x] = k, ++f._eventsCount;
          else if (typeof M == "function" ? M = j[x] = D ? [k, M] : [M, k] : D ? M.unshift(k) : M.push(k), (V = h(f)) > 0 && M.length > V && !M.warned) {
            M.warned = !0;
            var b = new Error("Possible EventEmitter memory leak detected. " + M.length + " " + String(x) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            b.name = "MaxListenersExceededWarning", b.emitter = f, b.type = x, b.count = M.length, I = b, console && console.warn && console.warn(I);
          }
          return f;
        }
        function m() {
          if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
        }
        function v(f, x, k) {
          var D = { fired: !1, wrapFn: void 0, target: f, type: x, listener: k }, V = m.bind(D);
          return V.listener = k, D.wrapFn = V, V;
        }
        function C(f, x, k) {
          var D = f._events;
          if (D === void 0) return [];
          var V = D[x];
          return V === void 0 ? [] : typeof V == "function" ? k ? [V.listener || V] : [V] : k ? (function(j) {
            for (var M = new Array(j.length), I = 0; I < M.length; ++I) M[I] = j[I].listener || j[I];
            return M;
          })(V) : A(V, V.length);
        }
        function T(f) {
          var x = this._events;
          if (x !== void 0) {
            var k = x[f];
            if (typeof k == "function") return 1;
            if (k !== void 0) return k.length;
          }
          return 0;
        }
        function A(f, x) {
          for (var k = new Array(x), D = 0; D < x; ++D) k[D] = f[D];
          return k;
        }
        Object.defineProperty(c, "defaultMaxListeners", { enumerable: !0, get: function() {
          return d;
        }, set: function(f) {
          if (typeof f != "number" || f < 0 || u(f)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + f + ".");
          d = f;
        } }), c.init = function() {
          this._events !== void 0 && this._events !== Object.getPrototypeOf(this)._events || (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
        }, c.prototype.setMaxListeners = function(f) {
          if (typeof f != "number" || f < 0 || u(f)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + f + ".");
          return this._maxListeners = f, this;
        }, c.prototype.getMaxListeners = function() {
          return h(this);
        }, c.prototype.emit = function(f) {
          for (var x = [], k = 1; k < arguments.length; k++) x.push(arguments[k]);
          var D = f === "error", V = this._events;
          if (V !== void 0) D = D && V.error === void 0;
          else if (!D) return !1;
          if (D) {
            var j;
            if (x.length > 0 && (j = x[0]), j instanceof Error) throw j;
            var M = new Error("Unhandled error." + (j ? " (" + j.message + ")" : ""));
            throw M.context = j, M;
          }
          var I = V[f];
          if (I === void 0) return !1;
          if (typeof I == "function") l(I, this, x);
          else {
            var b = I.length, S = A(I, b);
            for (k = 0; k < b; ++k) l(S[k], this, x);
          }
          return !0;
        }, c.prototype.addListener = function(f, x) {
          return g(this, f, x, !1);
        }, c.prototype.on = c.prototype.addListener, c.prototype.prependListener = function(f, x) {
          return g(this, f, x, !0);
        }, c.prototype.once = function(f, x) {
          return p(x), this.on(f, v(this, f, x)), this;
        }, c.prototype.prependOnceListener = function(f, x) {
          return p(x), this.prependListener(f, v(this, f, x)), this;
        }, c.prototype.removeListener = function(f, x) {
          var k, D, V, j, M;
          if (p(x), (D = this._events) === void 0) return this;
          if ((k = D[f]) === void 0) return this;
          if (k === x || k.listener === x) --this._eventsCount == 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete D[f], D.removeListener && this.emit("removeListener", f, k.listener || x));
          else if (typeof k != "function") {
            for (V = -1, j = k.length - 1; j >= 0; j--) if (k[j] === x || k[j].listener === x) {
              M = k[j].listener, V = j;
              break;
            }
            if (V < 0) return this;
            V === 0 ? k.shift() : (function(I, b) {
              for (; b + 1 < I.length; b++) I[b] = I[b + 1];
              I.pop();
            })(k, V), k.length === 1 && (D[f] = k[0]), D.removeListener !== void 0 && this.emit("removeListener", f, M || x);
          }
          return this;
        }, c.prototype.off = c.prototype.removeListener, c.prototype.removeAllListeners = function(f) {
          var x, k, D;
          if ((k = this._events) === void 0) return this;
          if (k.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : k[f] !== void 0 && (--this._eventsCount == 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete k[f]), this;
          if (arguments.length === 0) {
            var V, j = Object.keys(k);
            for (D = 0; D < j.length; ++D) (V = j[D]) !== "removeListener" && this.removeAllListeners(V);
            return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
          }
          if (typeof (x = k[f]) == "function") this.removeListener(f, x);
          else if (x !== void 0) for (D = x.length - 1; D >= 0; D--) this.removeListener(f, x[D]);
          return this;
        }, c.prototype.listeners = function(f) {
          return C(this, f, !0);
        }, c.prototype.rawListeners = function(f) {
          return C(this, f, !1);
        }, c.listenerCount = function(f, x) {
          return typeof f.listenerCount == "function" ? f.listenerCount(x) : T.call(f, x);
        }, c.prototype.listenerCount = T, c.prototype.eventNames = function() {
          return this._eventsCount > 0 ? i(this._events) : [];
        };
      }, function(r, n, o) {
        r.exports.Dispatcher = o(140);
      }, function(r, n, o) {
        r.exports = o(142);
      }, function(r, n, o) {
        n.__esModule = !0;
        var i = u(o(50)), s = u(o(65)), l = typeof s.default == "function" && typeof i.default == "symbol" ? function(c) {
          return typeof c;
        } : function(c) {
          return c && typeof s.default == "function" && c.constructor === s.default && c !== s.default.prototype ? "symbol" : typeof c;
        };
        function u(c) {
          return c && c.__esModule ? c : { default: c };
        }
        n.default = typeof s.default == "function" && l(i.default) === "symbol" ? function(c) {
          return c === void 0 ? "undefined" : l(c);
        } : function(c) {
          return c && typeof s.default == "function" && c.constructor === s.default && c !== s.default.prototype ? "symbol" : c === void 0 ? "undefined" : l(c);
        };
      }, function(r, n, o) {
        r.exports = { default: o(51), __esModule: !0 };
      }, function(r, n, o) {
        o(20), o(29), r.exports = o(30).f("iterator");
      }, function(r, n, o) {
        var i = o(21), s = o(22);
        r.exports = function(l) {
          return function(u, c) {
            var d, p, h = String(s(u)), g = i(c), m = h.length;
            return g < 0 || g >= m ? l ? "" : void 0 : (d = h.charCodeAt(g)) < 55296 || d > 56319 || g + 1 === m || (p = h.charCodeAt(g + 1)) < 56320 || p > 57343 ? l ? h.charAt(g) : d : l ? h.slice(g, g + 2) : p - 56320 + (d - 55296 << 10) + 65536;
          };
        };
      }, function(r, n, o) {
        var i = o(54);
        r.exports = function(s, l, u) {
          if (i(s), l === void 0) return s;
          switch (u) {
            case 1:
              return function(c) {
                return s.call(l, c);
              };
            case 2:
              return function(c, d) {
                return s.call(l, c, d);
              };
            case 3:
              return function(c, d, p) {
                return s.call(l, c, d, p);
              };
          }
          return function() {
            return s.apply(l, arguments);
          };
        };
      }, function(r, n) {
        r.exports = function(o) {
          if (typeof o != "function") throw TypeError(o + " is not a function!");
          return o;
        };
      }, function(r, n, o) {
        var i = o(38), s = o(16), l = o(28), u = {};
        o(6)(u, o(2)("iterator"), (function() {
          return this;
        })), r.exports = function(c, d, p) {
          c.prototype = i(u, { next: s(1, p) }), l(c, d + " Iterator");
        };
      }, function(r, n, o) {
        var i = o(7), s = o(10), l = o(13);
        r.exports = o(4) ? Object.defineProperties : function(u, c) {
          s(u);
          for (var d, p = l(c), h = p.length, g = 0; h > g; ) i.f(u, d = p[g++], c[d]);
          return u;
        };
      }, function(r, n, o) {
        var i = o(9), s = o(58), l = o(59);
        r.exports = function(u) {
          return function(c, d, p) {
            var h, g = i(c), m = s(g.length), v = l(p, m);
            if (u && d != d) {
              for (; m > v; ) if ((h = g[v++]) != h) return !0;
            } else for (; m > v; v++) if ((u || v in g) && g[v] === d) return u || v || 0;
            return !u && -1;
          };
        };
      }, function(r, n, o) {
        var i = o(21), s = Math.min;
        r.exports = function(l) {
          return l > 0 ? s(i(l), 9007199254740991) : 0;
        };
      }, function(r, n, o) {
        var i = o(21), s = Math.max, l = Math.min;
        r.exports = function(u, c) {
          return (u = i(u)) < 0 ? s(u + c, 0) : l(u, c);
        };
      }, function(r, n, o) {
        var i = o(3).document;
        r.exports = i && i.documentElement;
      }, function(r, n, o) {
        var i = o(5), s = o(18), l = o(25)("IE_PROTO"), u = Object.prototype;
        r.exports = Object.getPrototypeOf || function(c) {
          return c = s(c), i(c, l) ? c[l] : typeof c.constructor == "function" && c instanceof c.constructor ? c.constructor.prototype : c instanceof Object ? u : null;
        };
      }, function(r, n, o) {
        var i = o(63), s = o(64), l = o(12), u = o(9);
        r.exports = o(34)(Array, "Array", (function(c, d) {
          this._t = u(c), this._i = 0, this._k = d;
        }), (function() {
          var c = this._t, d = this._k, p = this._i++;
          return !c || p >= c.length ? (this._t = void 0, s(1)) : s(0, d == "keys" ? p : d == "values" ? c[p] : [p, c[p]]);
        }), "values"), l.Arguments = l.Array, i("keys"), i("values"), i("entries");
      }, function(r, n) {
        r.exports = function() {
        };
      }, function(r, n) {
        r.exports = function(o, i) {
          return { value: i, done: !!o };
        };
      }, function(r, n, o) {
        r.exports = { default: o(66), __esModule: !0 };
      }, function(r, n, o) {
        o(67), o(73), o(74), o(75), r.exports = o(1).Symbol;
      }, function(r, n, o) {
        var i = o(3), s = o(5), l = o(4), u = o(15), c = o(37), d = o(68).KEY, p = o(8), h = o(26), g = o(28), m = o(17), v = o(2), C = o(30), T = o(31), A = o(69), f = o(70), x = o(10), k = o(11), D = o(18), V = o(9), j = o(23), M = o(16), I = o(38), b = o(71), S = o(72), L = o(32), N = o(7), R = o(13), U = S.f, B = N.f, J = b.f, W = i.Symbol, ae = i.JSON, re = ae && ae.stringify, de = v("_hidden"), pe = v("toPrimitive"), Se = {}.propertyIsEnumerable, fe = h("symbol-registry"), ce = h("symbols"), ue = h("op-symbols"), me = Object.prototype, be = typeof W == "function" && !!L.f, Pe = i.QObject, De = !Pe || !Pe.prototype || !Pe.prototype.findChild, ze = l && p((function() {
          return I(B({}, "a", { get: function() {
            return B(this, "a", { value: 7 }).a;
          } })).a != 7;
        })) ? function(H, X, ne) {
          var he = U(me, X);
          he && delete me[X], B(H, X, ne), he && H !== me && B(me, X, he);
        } : B, We = function(H) {
          var X = ce[H] = I(W.prototype);
          return X._k = H, X;
        }, ht = be && typeof W.iterator == "symbol" ? function(H) {
          return typeof H == "symbol";
        } : function(H) {
          return H instanceof W;
        }, je = function(H, X, ne) {
          return H === me && je(ue, X, ne), x(H), X = j(X, !0), x(ne), s(ce, X) ? (ne.enumerable ? (s(H, de) && H[de][X] && (H[de][X] = !1), ne = I(ne, { enumerable: M(0, !1) })) : (s(H, de) || B(H, de, M(1, {})), H[de][X] = !0), ze(H, X, ne)) : B(H, X, ne);
        }, He = function(H, X) {
          x(H);
          for (var ne, he = A(X = V(X)), $e = 0, ke = he.length; ke > $e; ) je(H, ne = he[$e++], X[ne]);
          return H;
        }, Ge = function(H) {
          var X = Se.call(this, H = j(H, !0));
          return !(this === me && s(ce, H) && !s(ue, H)) && (!(X || !s(this, H) || !s(ce, H) || s(this, de) && this[de][H]) || X);
        }, Ue = function(H, X) {
          if (H = V(H), X = j(X, !0), H !== me || !s(ce, X) || s(ue, X)) {
            var ne = U(H, X);
            return !ne || !s(ce, X) || s(H, de) && H[de][X] || (ne.enumerable = !0), ne;
          }
        }, gt = function(H) {
          for (var X, ne = J(V(H)), he = [], $e = 0; ne.length > $e; ) s(ce, X = ne[$e++]) || X == de || X == d || he.push(X);
          return he;
        }, mt = function(H) {
          for (var X, ne = H === me, he = J(ne ? ue : V(H)), $e = [], ke = 0; he.length > ke; ) !s(ce, X = he[ke++]) || ne && !s(me, X) || $e.push(ce[X]);
          return $e;
        };
        be || (c((W = function() {
          if (this instanceof W) throw TypeError("Symbol is not a constructor!");
          var H = m(arguments.length > 0 ? arguments[0] : void 0), X = function(ne) {
            this === me && X.call(ue, ne), s(this, de) && s(this[de], H) && (this[de][H] = !1), ze(this, H, M(1, ne));
          };
          return l && De && ze(me, H, { configurable: !0, set: X }), We(H);
        }).prototype, "toString", (function() {
          return this._k;
        })), S.f = Ue, N.f = je, o(41).f = b.f = gt, o(19).f = Ge, L.f = mt, l && !o(14) && c(me, "propertyIsEnumerable", Ge, !0), C.f = function(H) {
          return We(v(H));
        }), u(u.G + u.W + u.F * !be, { Symbol: W });
        for (var lt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), Ye = 0; lt.length > Ye; ) v(lt[Ye++]);
        for (var ft = R(v.store), Z = 0; ft.length > Z; ) T(ft[Z++]);
        u(u.S + u.F * !be, "Symbol", { for: function(H) {
          return s(fe, H += "") ? fe[H] : fe[H] = W(H);
        }, keyFor: function(H) {
          if (!ht(H)) throw TypeError(H + " is not a symbol!");
          for (var X in fe) if (fe[X] === H) return X;
        }, useSetter: function() {
          De = !0;
        }, useSimple: function() {
          De = !1;
        } }), u(u.S + u.F * !be, "Object", { create: function(H, X) {
          return X === void 0 ? I(H) : He(I(H), X);
        }, defineProperty: je, defineProperties: He, getOwnPropertyDescriptor: Ue, getOwnPropertyNames: gt, getOwnPropertySymbols: mt });
        var z = p((function() {
          L.f(1);
        }));
        u(u.S + u.F * z, "Object", { getOwnPropertySymbols: function(H) {
          return L.f(D(H));
        } }), ae && u(u.S + u.F * (!be || p((function() {
          var H = W();
          return re([H]) != "[null]" || re({ a: H }) != "{}" || re(Object(H)) != "{}";
        }))), "JSON", { stringify: function(H) {
          for (var X, ne, he = [H], $e = 1; arguments.length > $e; ) he.push(arguments[$e++]);
          if (ne = X = he[1], (k(X) || H !== void 0) && !ht(H)) return f(X) || (X = function(ke, _e) {
            if (typeof ne == "function" && (_e = ne.call(this, ke, _e)), !ht(_e)) return _e;
          }), he[1] = X, re.apply(ae, he);
        } }), W.prototype[pe] || o(6)(W.prototype, pe, W.prototype.valueOf), g(W, "Symbol"), g(Math, "Math", !0), g(i.JSON, "JSON", !0);
      }, function(r, n, o) {
        var i = o(17)("meta"), s = o(11), l = o(5), u = o(7).f, c = 0, d = Object.isExtensible || function() {
          return !0;
        }, p = !o(8)((function() {
          return d(Object.preventExtensions({}));
        })), h = function(m) {
          u(m, i, { value: { i: "O" + ++c, w: {} } });
        }, g = r.exports = { KEY: i, NEED: !1, fastKey: function(m, v) {
          if (!s(m)) return typeof m == "symbol" ? m : (typeof m == "string" ? "S" : "P") + m;
          if (!l(m, i)) {
            if (!d(m)) return "F";
            if (!v) return "E";
            h(m);
          }
          return m[i].i;
        }, getWeak: function(m, v) {
          if (!l(m, i)) {
            if (!d(m)) return !0;
            if (!v) return !1;
            h(m);
          }
          return m[i].w;
        }, onFreeze: function(m) {
          return p && g.NEED && d(m) && !l(m, i) && h(m), m;
        } };
      }, function(r, n, o) {
        var i = o(13), s = o(32), l = o(19);
        r.exports = function(u) {
          var c = i(u), d = s.f;
          if (d) for (var p, h = d(u), g = l.f, m = 0; h.length > m; ) g.call(u, p = h[m++]) && c.push(p);
          return c;
        };
      }, function(r, n, o) {
        var i = o(24);
        r.exports = Array.isArray || function(s) {
          return i(s) == "Array";
        };
      }, function(r, n, o) {
        var i = o(9), s = o(41).f, l = {}.toString, u = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        r.exports.f = function(c) {
          return u && l.call(c) == "[object Window]" ? (function(d) {
            try {
              return s(d);
            } catch {
              return u.slice();
            }
          })(c) : s(i(c));
        };
      }, function(r, n, o) {
        var i = o(19), s = o(16), l = o(9), u = o(23), c = o(5), d = o(35), p = Object.getOwnPropertyDescriptor;
        n.f = o(4) ? p : function(h, g) {
          if (h = l(h), g = u(g, !0), d) try {
            return p(h, g);
          } catch {
          }
          if (c(h, g)) return s(!i.f.call(h, g), h[g]);
        };
      }, function(r, n) {
      }, function(r, n, o) {
        o(31)("asyncIterator");
      }, function(r, n, o) {
        o(31)("observable");
      }, function(r, n, o) {
        n.__esModule = !0;
        var i, s = o(77), l = (i = s) && i.__esModule ? i : { default: i };
        n.default = l.default || function(u) {
          for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            for (var p in d) Object.prototype.hasOwnProperty.call(d, p) && (u[p] = d[p]);
          }
          return u;
        };
      }, function(r, n, o) {
        r.exports = { default: o(78), __esModule: !0 };
      }, function(r, n, o) {
        o(79), r.exports = o(1).Object.assign;
      }, function(r, n, o) {
        var i = o(15);
        i(i.S + i.F, "Object", { assign: o(80) });
      }, function(r, n, o) {
        var i = o(4), s = o(13), l = o(32), u = o(19), c = o(18), d = o(40), p = Object.assign;
        r.exports = !p || o(8)((function() {
          var h = {}, g = {}, m = Symbol(), v = "abcdefghijklmnopqrst";
          return h[m] = 7, v.split("").forEach((function(C) {
            g[C] = C;
          })), p({}, h)[m] != 7 || Object.keys(p({}, g)).join("") != v;
        })) ? function(h, g) {
          for (var m = c(h), v = arguments.length, C = 1, T = l.f, A = u.f; v > C; ) for (var f, x = d(arguments[C++]), k = T ? s(x).concat(T(x)) : s(x), D = k.length, V = 0; D > V; ) f = k[V++], i && !A.call(x, f) || (m[f] = x[f]);
          return m;
        } : p;
      }, function(r, n, o) {
        n.__esModule = !0;
        var i = l(o(82)), s = l(o(85));
        function l(u) {
          return u && u.__esModule ? u : { default: u };
        }
        n.default = function(u, c) {
          if (Array.isArray(u)) return u;
          if ((0, i.default)(Object(u))) return (function(d, p) {
            var h = [], g = !0, m = !1, v = void 0;
            try {
              for (var C, T = (0, s.default)(d); !(g = (C = T.next()).done) && (h.push(C.value), !p || h.length !== p); g = !0) ;
            } catch (A) {
              m = !0, v = A;
            } finally {
              try {
                !g && T.return && T.return();
              } finally {
                if (m) throw v;
              }
            }
            return h;
          })(u, c);
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
      }, function(r, n, o) {
        r.exports = { default: o(83), __esModule: !0 };
      }, function(r, n, o) {
        o(29), o(20), r.exports = o(84);
      }, function(r, n, o) {
        var i = o(42), s = o(2)("iterator"), l = o(12);
        r.exports = o(1).isIterable = function(u) {
          var c = Object(u);
          return c[s] !== void 0 || "@@iterator" in c || l.hasOwnProperty(i(c));
        };
      }, function(r, n, o) {
        r.exports = { default: o(86), __esModule: !0 };
      }, function(r, n, o) {
        o(29), o(20), r.exports = o(87);
      }, function(r, n, o) {
        var i = o(10), s = o(88);
        r.exports = o(1).getIterator = function(l) {
          var u = s(l);
          if (typeof u != "function") throw TypeError(l + " is not iterable!");
          return i(u.call(l));
        };
      }, function(r, n, o) {
        var i = o(42), s = o(2)("iterator"), l = o(12);
        r.exports = o(1).getIteratorMethod = function(u) {
          if (u != null) return u[s] || u["@@iterator"] || l[i(u)];
        };
      }, function(r, n, o) {
        r.exports = { default: o(90), __esModule: !0 };
      }, function(r, n, o) {
        o(91), r.exports = o(1).Object.keys;
      }, function(r, n, o) {
        var i = o(18), s = o(13);
        o(92)("keys", (function() {
          return function(l) {
            return s(i(l));
          };
        }));
      }, function(r, n, o) {
        var i = o(15), s = o(1), l = o(8);
        r.exports = function(u, c) {
          var d = (s.Object || {})[u] || Object[u], p = {};
          p[u] = c(d), i(i.S + i.F * l((function() {
            d(1);
          })), "Object", p);
        };
      }, function(r, n, o) {
        (function(i) {
          var s = [["ary", 128], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", 32], ["partialRight", 64], ["rearg", 256]], l = /^\s+|\s+$/g, u = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, c = /\{\n\/\* \[wrapped with (.+)\] \*/, d = /,? & /, p = /^[-+]0x[0-9a-f]+$/i, h = /^0b[01]+$/i, g = /^\[object .+?Constructor\]$/, m = /^0o[0-7]+$/i, v = /^(?:0|[1-9]\d*)$/, C = parseInt, T = typeof i == "object" && i && i.Object === Object && i, A = typeof self == "object" && self && self.Object === Object && self, f = T || A || Function("return this")();
          function x(Z, z, H) {
            switch (H.length) {
              case 0:
                return Z.call(z);
              case 1:
                return Z.call(z, H[0]);
              case 2:
                return Z.call(z, H[0], H[1]);
              case 3:
                return Z.call(z, H[0], H[1], H[2]);
            }
            return Z.apply(z, H);
          }
          function k(Z, z) {
            return !!(Z && Z.length) && (function(H, X, ne) {
              if (X != X) return (function(ke, _e, Xe, Je) {
                for (var Ee = ke.length, oe = Xe + -1; ++oe < Ee; ) if (_e(ke[oe], oe, ke)) return oe;
                return -1;
              })(H, D, ne);
              for (var he = ne - 1, $e = H.length; ++he < $e; ) if (H[he] === X) return he;
              return -1;
            })(Z, z, 0) > -1;
          }
          function D(Z) {
            return Z != Z;
          }
          function V(Z, z) {
            for (var H = Z.length, X = 0; H--; ) Z[H] === z && X++;
            return X;
          }
          function j(Z, z) {
            for (var H = -1, X = Z.length, ne = 0, he = []; ++H < X; ) {
              var $e = Z[H];
              $e !== z && $e !== "__lodash_placeholder__" || (Z[H] = "__lodash_placeholder__", he[ne++] = H);
            }
            return he;
          }
          var M, I, b, S = Function.prototype, L = Object.prototype, N = f["__core-js_shared__"], R = (M = /[^.]+$/.exec(N && N.keys && N.keys.IE_PROTO || "")) ? "Symbol(src)_1." + M : "", U = S.toString, B = L.hasOwnProperty, J = L.toString, W = RegExp("^" + U.call(B).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), ae = Object.create, re = Math.max, de = Math.min, pe = (I = We(Object, "defineProperty"), (b = We.name) && b.length > 2 ? I : void 0);
          function Se(Z) {
            return lt(Z) ? ae(Z) : {};
          }
          function fe(Z) {
            return !(!lt(Z) || (function(z) {
              return !!R && R in z;
            })(Z)) && ((function(z) {
              var H = lt(z) ? J.call(z) : "";
              return H == "[object Function]" || H == "[object GeneratorFunction]";
            })(Z) || (function(z) {
              var H = !1;
              if (z != null && typeof z.toString != "function") try {
                H = !!(z + "");
              } catch {
              }
              return H;
            })(Z) ? W : g).test((function(z) {
              if (z != null) {
                try {
                  return U.call(z);
                } catch {
                }
                try {
                  return z + "";
                } catch {
                }
              }
              return "";
            })(Z));
          }
          function ce(Z, z, H, X) {
            for (var ne = -1, he = Z.length, $e = H.length, ke = -1, _e = z.length, Xe = re(he - $e, 0), Je = Array(_e + Xe), Ee = !X; ++ke < _e; ) Je[ke] = z[ke];
            for (; ++ne < $e; ) (Ee || ne < he) && (Je[H[ne]] = Z[ne]);
            for (; Xe--; ) Je[ke++] = Z[ne++];
            return Je;
          }
          function ue(Z, z, H, X) {
            for (var ne = -1, he = Z.length, $e = -1, ke = H.length, _e = -1, Xe = z.length, Je = re(he - ke, 0), Ee = Array(Je + Xe), oe = !X; ++ne < Je; ) Ee[ne] = Z[ne];
            for (var ve = ne; ++_e < Xe; ) Ee[ve + _e] = z[_e];
            for (; ++$e < ke; ) (oe || ne < he) && (Ee[ve + H[$e]] = Z[ne++]);
            return Ee;
          }
          function me(Z) {
            return function() {
              var z = arguments;
              switch (z.length) {
                case 0:
                  return new Z();
                case 1:
                  return new Z(z[0]);
                case 2:
                  return new Z(z[0], z[1]);
                case 3:
                  return new Z(z[0], z[1], z[2]);
                case 4:
                  return new Z(z[0], z[1], z[2], z[3]);
                case 5:
                  return new Z(z[0], z[1], z[2], z[3], z[4]);
                case 6:
                  return new Z(z[0], z[1], z[2], z[3], z[4], z[5]);
                case 7:
                  return new Z(z[0], z[1], z[2], z[3], z[4], z[5], z[6]);
              }
              var H = Se(Z.prototype), X = Z.apply(H, z);
              return lt(X) ? X : H;
            };
          }
          function be(Z, z, H, X, ne, he, $e, ke, _e, Xe) {
            var Je = 128 & z, Ee = 1 & z, oe = 2 & z, ve = 24 & z, Me = 512 & z, Be = oe ? void 0 : me(Z);
            return function Ze() {
              for (var Re = arguments.length, Te = Array(Re), ct = Re; ct--; ) Te[ct] = arguments[ct];
              if (ve) var Qe = ze(Ze), Ke = V(Te, Qe);
              if (X && (Te = ce(Te, X, ne, ve)), he && (Te = ue(Te, he, $e, ve)), Re -= Ke, ve && Re < Xe) {
                var Fe = j(Te, Qe);
                return Pe(Z, z, be, Ze.placeholder, H, Te, Fe, ke, _e, Xe - Re);
              }
              var pt = Ee ? H : this, Mt = oe ? pt[Z] : Z;
              return Re = Te.length, ke ? Te = Ge(Te, ke) : Me && Re > 1 && Te.reverse(), Je && _e < Re && (Te.length = _e), this && this !== f && this instanceof Ze && (Mt = Be || me(Mt)), Mt.apply(pt, Te);
            };
          }
          function Pe(Z, z, H, X, ne, he, $e, ke, _e, Xe) {
            var Je = 8 & z;
            z |= Je ? 32 : 64, 4 & (z &= ~(Je ? 64 : 32)) || (z &= -4);
            var Ee = H(Z, z, ne, Je ? he : void 0, Je ? $e : void 0, Je ? void 0 : he, Je ? void 0 : $e, ke, _e, Xe);
            return Ee.placeholder = X, Ue(Ee, Z, z);
          }
          function De(Z, z, H, X, ne, he, $e, ke) {
            var _e = 2 & z;
            if (!_e && typeof Z != "function") throw new TypeError("Expected a function");
            var Xe = X ? X.length : 0;
            if (Xe || (z &= -97, X = ne = void 0), $e = $e === void 0 ? $e : re(ft($e), 0), ke = ke === void 0 ? ke : ft(ke), Xe -= ne ? ne.length : 0, 64 & z) {
              var Je = X, Ee = ne;
              X = ne = void 0;
            }
            var oe = [Z, z, H, X, ne, Je, Ee, he, $e, ke];
            if (Z = oe[0], z = oe[1], H = oe[2], X = oe[3], ne = oe[4], !(ke = oe[9] = oe[9] == null ? _e ? 0 : Z.length : re(oe[9] - Xe, 0)) && 24 & z && (z &= -25), z && z != 1) ve = z == 8 || z == 16 ? (function(Me, Be, Ze) {
              var Re = me(Me);
              return function Te() {
                for (var ct = arguments.length, Qe = Array(ct), Ke = ct, Fe = ze(Te); Ke--; ) Qe[Ke] = arguments[Ke];
                var pt = ct < 3 && Qe[0] !== Fe && Qe[ct - 1] !== Fe ? [] : j(Qe, Fe);
                if ((ct -= pt.length) < Ze) return Pe(Me, Be, be, Te.placeholder, void 0, Qe, pt, void 0, void 0, Ze - ct);
                var Mt = this && this !== f && this instanceof Te ? Re : Me;
                return x(Mt, this, Qe);
              };
            })(Z, z, ke) : z != 32 && z != 33 || ne.length ? be.apply(void 0, oe) : (function(Me, Be, Ze, Re) {
              var Te = 1 & Be, ct = me(Me);
              return function Qe() {
                for (var Ke = -1, Fe = arguments.length, pt = -1, Mt = Re.length, It = Array(Mt + Fe), Er = this && this !== f && this instanceof Qe ? ct : Me; ++pt < Mt; ) It[pt] = Re[pt];
                for (; Fe--; ) It[pt++] = arguments[++Ke];
                return x(Er, Te ? Ze : this, It);
              };
            })(Z, z, H, X);
            else var ve = (function(Me, Be, Ze) {
              var Re = 1 & Be, Te = me(Me);
              return function ct() {
                var Qe = this && this !== f && this instanceof ct ? Te : Me;
                return Qe.apply(Re ? Ze : this, arguments);
              };
            })(Z, z, H);
            return Ue(ve, Z, z);
          }
          function ze(Z) {
            return Z.placeholder;
          }
          function We(Z, z) {
            var H = (function(X, ne) {
              return X == null ? void 0 : X[ne];
            })(Z, z);
            return fe(H) ? H : void 0;
          }
          function ht(Z) {
            var z = Z.match(c);
            return z ? z[1].split(d) : [];
          }
          function je(Z, z) {
            var H = z.length, X = H - 1;
            return z[X] = (H > 1 ? "& " : "") + z[X], z = z.join(H > 2 ? ", " : " "), Z.replace(u, `{
/* [wrapped with ` + z + `] */
`);
          }
          function He(Z, z) {
            return !!(z = z ?? 9007199254740991) && (typeof Z == "number" || v.test(Z)) && Z > -1 && Z % 1 == 0 && Z < z;
          }
          function Ge(Z, z) {
            for (var H = Z.length, X = de(z.length, H), ne = (function($e, ke) {
              var _e = -1, Xe = $e.length;
              for (ke || (ke = Array(Xe)); ++_e < Xe; ) ke[_e] = $e[_e];
              return ke;
            })(Z); X--; ) {
              var he = z[X];
              Z[X] = He(he, H) ? ne[he] : void 0;
            }
            return Z;
          }
          var Ue = pe ? function(Z, z, H) {
            var X, ne = z + "";
            return pe(Z, "toString", { configurable: !0, enumerable: !1, value: (X = je(ne, gt(ht(ne), H)), function() {
              return X;
            }) });
          } : function(Z) {
            return Z;
          };
          function gt(Z, z) {
            return (function(H, X) {
              for (var ne = -1, he = H ? H.length : 0; ++ne < he && X(H[ne], ne, H) !== !1; ) ;
            })(s, (function(H) {
              var X = "_." + H[0];
              z & H[1] && !k(Z, X) && Z.push(X);
            })), Z.sort();
          }
          function mt(Z, z, H) {
            var X = De(Z, 8, void 0, void 0, void 0, void 0, void 0, z = H ? void 0 : z);
            return X.placeholder = mt.placeholder, X;
          }
          function lt(Z) {
            var z = typeof Z;
            return !!Z && (z == "object" || z == "function");
          }
          function Ye(Z) {
            return Z ? (Z = (function(z) {
              if (typeof z == "number") return z;
              if ((function(ne) {
                return typeof ne == "symbol" || /* @__PURE__ */ (function(he) {
                  return !!he && typeof he == "object";
                })(ne) && J.call(ne) == "[object Symbol]";
              })(z)) return NaN;
              if (lt(z)) {
                var H = typeof z.valueOf == "function" ? z.valueOf() : z;
                z = lt(H) ? H + "" : H;
              }
              if (typeof z != "string") return z === 0 ? z : +z;
              z = z.replace(l, "");
              var X = h.test(z);
              return X || m.test(z) ? C(z.slice(2), X ? 2 : 8) : p.test(z) ? NaN : +z;
            })(Z)) === 1 / 0 || Z === -1 / 0 ? 17976931348623157e292 * (Z < 0 ? -1 : 1) : Z == Z ? Z : 0 : Z === 0 ? Z : 0;
          }
          function ft(Z) {
            var z = Ye(Z), H = z % 1;
            return z == z ? H ? z - H : z : 0;
          }
          mt.placeholder = {}, r.exports = mt;
        }).call(this, o(43));
      }, function(r, n, o) {
        function i(ue) {
          return ue && ue.__esModule ? ue.default : ue;
        }
        n.__esModule = !0;
        var s = o(95);
        n.threezerotwofour = i(s);
        var l = o(96);
        n.apathy = i(l);
        var u = o(97);
        n.ashes = i(u);
        var c = o(98);
        n.atelierDune = i(c);
        var d = o(99);
        n.atelierForest = i(d);
        var p = o(100);
        n.atelierHeath = i(p);
        var h = o(101);
        n.atelierLakeside = i(h);
        var g = o(102);
        n.atelierSeaside = i(g);
        var m = o(103);
        n.bespin = i(m);
        var v = o(104);
        n.brewer = i(v);
        var C = o(105);
        n.bright = i(C);
        var T = o(106);
        n.chalk = i(T);
        var A = o(107);
        n.codeschool = i(A);
        var f = o(108);
        n.colors = i(f);
        var x = o(109);
        n.default = i(x);
        var k = o(110);
        n.eighties = i(k);
        var D = o(111);
        n.embers = i(D);
        var V = o(112);
        n.flat = i(V);
        var j = o(113);
        n.google = i(j);
        var M = o(114);
        n.grayscale = i(M);
        var I = o(115);
        n.greenscreen = i(I);
        var b = o(116);
        n.harmonic = i(b);
        var S = o(117);
        n.hopscotch = i(S);
        var L = o(118);
        n.isotope = i(L);
        var N = o(119);
        n.marrakesh = i(N);
        var R = o(120);
        n.mocha = i(R);
        var U = o(121);
        n.monokai = i(U);
        var B = o(122);
        n.ocean = i(B);
        var J = o(123);
        n.paraiso = i(J);
        var W = o(124);
        n.pop = i(W);
        var ae = o(125);
        n.railscasts = i(ae);
        var re = o(126);
        n.shapeshifter = i(re);
        var de = o(127);
        n.solarized = i(de);
        var pe = o(128);
        n.summerfruit = i(pe);
        var Se = o(129);
        n.tomorrow = i(Se);
        var fe = o(130);
        n.tube = i(fe);
        var ce = o(131);
        n.twilight = i(ce);
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "threezerotwofour", author: "jan t. sott (http://github.com/idleberg)", base00: "#090300", base01: "#3a3432", base02: "#4a4543", base03: "#5c5855", base04: "#807d7c", base05: "#a5a2a2", base06: "#d6d5d4", base07: "#f7f7f7", base08: "#db2d20", base09: "#e8bbd0", base0A: "#fded02", base0B: "#01a252", base0C: "#b5e4f4", base0D: "#01a0e4", base0E: "#a16a94", base0F: "#cdab53" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "apathy", author: "jannik siebert (https://github.com/janniks)", base00: "#031A16", base01: "#0B342D", base02: "#184E45", base03: "#2B685E", base04: "#5F9C92", base05: "#81B5AC", base06: "#A7CEC8", base07: "#D2E7E4", base08: "#3E9688", base09: "#3E7996", base0A: "#3E4C96", base0B: "#883E96", base0C: "#963E4C", base0D: "#96883E", base0E: "#4C963E", base0F: "#3E965B" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "ashes", author: "jannik siebert (https://github.com/janniks)", base00: "#1C2023", base01: "#393F45", base02: "#565E65", base03: "#747C84", base04: "#ADB3BA", base05: "#C7CCD1", base06: "#DFE2E5", base07: "#F3F4F5", base08: "#C7AE95", base09: "#C7C795", base0A: "#AEC795", base0B: "#95C7AE", base0C: "#95AEC7", base0D: "#AE95C7", base0E: "#C795AE", base0F: "#C79595" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "atelier dune", author: "bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/dune)", base00: "#20201d", base01: "#292824", base02: "#6e6b5e", base03: "#7d7a68", base04: "#999580", base05: "#a6a28c", base06: "#e8e4cf", base07: "#fefbec", base08: "#d73737", base09: "#b65611", base0A: "#cfb017", base0B: "#60ac39", base0C: "#1fad83", base0D: "#6684e1", base0E: "#b854d4", base0F: "#d43552" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "atelier forest", author: "bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/forest)", base00: "#1b1918", base01: "#2c2421", base02: "#68615e", base03: "#766e6b", base04: "#9c9491", base05: "#a8a19f", base06: "#e6e2e0", base07: "#f1efee", base08: "#f22c40", base09: "#df5320", base0A: "#d5911a", base0B: "#5ab738", base0C: "#00ad9c", base0D: "#407ee7", base0E: "#6666ea", base0F: "#c33ff3" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "atelier heath", author: "bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/heath)", base00: "#1b181b", base01: "#292329", base02: "#695d69", base03: "#776977", base04: "#9e8f9e", base05: "#ab9bab", base06: "#d8cad8", base07: "#f7f3f7", base08: "#ca402b", base09: "#a65926", base0A: "#bb8a35", base0B: "#379a37", base0C: "#159393", base0D: "#516aec", base0E: "#7b59c0", base0F: "#cc33cc" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "atelier lakeside", author: "bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/lakeside/)", base00: "#161b1d", base01: "#1f292e", base02: "#516d7b", base03: "#5a7b8c", base04: "#7195a8", base05: "#7ea2b4", base06: "#c1e4f6", base07: "#ebf8ff", base08: "#d22d72", base09: "#935c25", base0A: "#8a8a0f", base0B: "#568c3b", base0C: "#2d8f6f", base0D: "#257fad", base0E: "#5d5db1", base0F: "#b72dd2" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "atelier seaside", author: "bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/seaside/)", base00: "#131513", base01: "#242924", base02: "#5e6e5e", base03: "#687d68", base04: "#809980", base05: "#8ca68c", base06: "#cfe8cf", base07: "#f0fff0", base08: "#e6193c", base09: "#87711d", base0A: "#c3c322", base0B: "#29a329", base0C: "#1999b3", base0D: "#3d62f5", base0E: "#ad2bee", base0F: "#e619c3" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "bespin", author: "jan t. sott", base00: "#28211c", base01: "#36312e", base02: "#5e5d5c", base03: "#666666", base04: "#797977", base05: "#8a8986", base06: "#9d9b97", base07: "#baae9e", base08: "#cf6a4c", base09: "#cf7d34", base0A: "#f9ee98", base0B: "#54be0d", base0C: "#afc4db", base0D: "#5ea6ea", base0E: "#9b859d", base0F: "#937121" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "brewer", author: "timothée poisot (http://github.com/tpoisot)", base00: "#0c0d0e", base01: "#2e2f30", base02: "#515253", base03: "#737475", base04: "#959697", base05: "#b7b8b9", base06: "#dadbdc", base07: "#fcfdfe", base08: "#e31a1c", base09: "#e6550d", base0A: "#dca060", base0B: "#31a354", base0C: "#80b1d3", base0D: "#3182bd", base0E: "#756bb1", base0F: "#b15928" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "bright", author: "chris kempson (http://chriskempson.com)", base00: "#000000", base01: "#303030", base02: "#505050", base03: "#b0b0b0", base04: "#d0d0d0", base05: "#e0e0e0", base06: "#f5f5f5", base07: "#ffffff", base08: "#fb0120", base09: "#fc6d24", base0A: "#fda331", base0B: "#a1c659", base0C: "#76c7b7", base0D: "#6fb3d2", base0E: "#d381c3", base0F: "#be643c" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "chalk", author: "chris kempson (http://chriskempson.com)", base00: "#151515", base01: "#202020", base02: "#303030", base03: "#505050", base04: "#b0b0b0", base05: "#d0d0d0", base06: "#e0e0e0", base07: "#f5f5f5", base08: "#fb9fb1", base09: "#eda987", base0A: "#ddb26f", base0B: "#acc267", base0C: "#12cfc0", base0D: "#6fc2ef", base0E: "#e1a3ee", base0F: "#deaf8f" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "codeschool", author: "brettof86", base00: "#232c31", base01: "#1c3657", base02: "#2a343a", base03: "#3f4944", base04: "#84898c", base05: "#9ea7a6", base06: "#a7cfa3", base07: "#b5d8f6", base08: "#2a5491", base09: "#43820d", base0A: "#a03b1e", base0B: "#237986", base0C: "#b02f30", base0D: "#484d79", base0E: "#c59820", base0F: "#c98344" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "colors", author: "mrmrs (http://clrs.cc)", base00: "#111111", base01: "#333333", base02: "#555555", base03: "#777777", base04: "#999999", base05: "#bbbbbb", base06: "#dddddd", base07: "#ffffff", base08: "#ff4136", base09: "#ff851b", base0A: "#ffdc00", base0B: "#2ecc40", base0C: "#7fdbff", base0D: "#0074d9", base0E: "#b10dc9", base0F: "#85144b" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "default", author: "chris kempson (http://chriskempson.com)", base00: "#181818", base01: "#282828", base02: "#383838", base03: "#585858", base04: "#b8b8b8", base05: "#d8d8d8", base06: "#e8e8e8", base07: "#f8f8f8", base08: "#ab4642", base09: "#dc9656", base0A: "#f7ca88", base0B: "#a1b56c", base0C: "#86c1b9", base0D: "#7cafc2", base0E: "#ba8baf", base0F: "#a16946" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "eighties", author: "chris kempson (http://chriskempson.com)", base00: "#2d2d2d", base01: "#393939", base02: "#515151", base03: "#747369", base04: "#a09f93", base05: "#d3d0c8", base06: "#e8e6df", base07: "#f2f0ec", base08: "#f2777a", base09: "#f99157", base0A: "#ffcc66", base0B: "#99cc99", base0C: "#66cccc", base0D: "#6699cc", base0E: "#cc99cc", base0F: "#d27b53" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "embers", author: "jannik siebert (https://github.com/janniks)", base00: "#16130F", base01: "#2C2620", base02: "#433B32", base03: "#5A5047", base04: "#8A8075", base05: "#A39A90", base06: "#BEB6AE", base07: "#DBD6D1", base08: "#826D57", base09: "#828257", base0A: "#6D8257", base0B: "#57826D", base0C: "#576D82", base0D: "#6D5782", base0E: "#82576D", base0F: "#825757" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "flat", author: "chris kempson (http://chriskempson.com)", base00: "#2C3E50", base01: "#34495E", base02: "#7F8C8D", base03: "#95A5A6", base04: "#BDC3C7", base05: "#e0e0e0", base06: "#f5f5f5", base07: "#ECF0F1", base08: "#E74C3C", base09: "#E67E22", base0A: "#F1C40F", base0B: "#2ECC71", base0C: "#1ABC9C", base0D: "#3498DB", base0E: "#9B59B6", base0F: "#be643c" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "google", author: "seth wright (http://sethawright.com)", base00: "#1d1f21", base01: "#282a2e", base02: "#373b41", base03: "#969896", base04: "#b4b7b4", base05: "#c5c8c6", base06: "#e0e0e0", base07: "#ffffff", base08: "#CC342B", base09: "#F96A38", base0A: "#FBA922", base0B: "#198844", base0C: "#3971ED", base0D: "#3971ED", base0E: "#A36AC7", base0F: "#3971ED" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "grayscale", author: "alexandre gavioli (https://github.com/alexx2/)", base00: "#101010", base01: "#252525", base02: "#464646", base03: "#525252", base04: "#ababab", base05: "#b9b9b9", base06: "#e3e3e3", base07: "#f7f7f7", base08: "#7c7c7c", base09: "#999999", base0A: "#a0a0a0", base0B: "#8e8e8e", base0C: "#868686", base0D: "#686868", base0E: "#747474", base0F: "#5e5e5e" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "green screen", author: "chris kempson (http://chriskempson.com)", base00: "#001100", base01: "#003300", base02: "#005500", base03: "#007700", base04: "#009900", base05: "#00bb00", base06: "#00dd00", base07: "#00ff00", base08: "#007700", base09: "#009900", base0A: "#007700", base0B: "#00bb00", base0C: "#005500", base0D: "#009900", base0E: "#00bb00", base0F: "#005500" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "harmonic16", author: "jannik siebert (https://github.com/janniks)", base00: "#0b1c2c", base01: "#223b54", base02: "#405c79", base03: "#627e99", base04: "#aabcce", base05: "#cbd6e2", base06: "#e5ebf1", base07: "#f7f9fb", base08: "#bf8b56", base09: "#bfbf56", base0A: "#8bbf56", base0B: "#56bf8b", base0C: "#568bbf", base0D: "#8b56bf", base0E: "#bf568b", base0F: "#bf5656" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "hopscotch", author: "jan t. sott", base00: "#322931", base01: "#433b42", base02: "#5c545b", base03: "#797379", base04: "#989498", base05: "#b9b5b8", base06: "#d5d3d5", base07: "#ffffff", base08: "#dd464c", base09: "#fd8b19", base0A: "#fdcc59", base0B: "#8fc13e", base0C: "#149b93", base0D: "#1290bf", base0E: "#c85e7c", base0F: "#b33508" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "isotope", author: "jan t. sott", base00: "#000000", base01: "#404040", base02: "#606060", base03: "#808080", base04: "#c0c0c0", base05: "#d0d0d0", base06: "#e0e0e0", base07: "#ffffff", base08: "#ff0000", base09: "#ff9900", base0A: "#ff0099", base0B: "#33ff00", base0C: "#00ffff", base0D: "#0066ff", base0E: "#cc00ff", base0F: "#3300ff" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "marrakesh", author: "alexandre gavioli (http://github.com/alexx2/)", base00: "#201602", base01: "#302e00", base02: "#5f5b17", base03: "#6c6823", base04: "#86813b", base05: "#948e48", base06: "#ccc37a", base07: "#faf0a5", base08: "#c35359", base09: "#b36144", base0A: "#a88339", base0B: "#18974e", base0C: "#75a738", base0D: "#477ca1", base0E: "#8868b3", base0F: "#b3588e" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "mocha", author: "chris kempson (http://chriskempson.com)", base00: "#3B3228", base01: "#534636", base02: "#645240", base03: "#7e705a", base04: "#b8afad", base05: "#d0c8c6", base06: "#e9e1dd", base07: "#f5eeeb", base08: "#cb6077", base09: "#d28b71", base0A: "#f4bc87", base0B: "#beb55b", base0C: "#7bbda4", base0D: "#8ab3b5", base0E: "#a89bb9", base0F: "#bb9584" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "monokai", author: "wimer hazenberg (http://www.monokai.nl)", base00: "#272822", base01: "#383830", base02: "#49483e", base03: "#75715e", base04: "#a59f85", base05: "#f8f8f2", base06: "#f5f4f1", base07: "#f9f8f5", base08: "#f92672", base09: "#fd971f", base0A: "#f4bf75", base0B: "#a6e22e", base0C: "#a1efe4", base0D: "#66d9ef", base0E: "#ae81ff", base0F: "#cc6633" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "ocean", author: "chris kempson (http://chriskempson.com)", base00: "#2b303b", base01: "#343d46", base02: "#4f5b66", base03: "#65737e", base04: "#a7adba", base05: "#c0c5ce", base06: "#dfe1e8", base07: "#eff1f5", base08: "#bf616a", base09: "#d08770", base0A: "#ebcb8b", base0B: "#a3be8c", base0C: "#96b5b4", base0D: "#8fa1b3", base0E: "#b48ead", base0F: "#ab7967" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "paraiso", author: "jan t. sott", base00: "#2f1e2e", base01: "#41323f", base02: "#4f424c", base03: "#776e71", base04: "#8d8687", base05: "#a39e9b", base06: "#b9b6b0", base07: "#e7e9db", base08: "#ef6155", base09: "#f99b15", base0A: "#fec418", base0B: "#48b685", base0C: "#5bc4bf", base0D: "#06b6ef", base0E: "#815ba4", base0F: "#e96ba8" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "pop", author: "chris kempson (http://chriskempson.com)", base00: "#000000", base01: "#202020", base02: "#303030", base03: "#505050", base04: "#b0b0b0", base05: "#d0d0d0", base06: "#e0e0e0", base07: "#ffffff", base08: "#eb008a", base09: "#f29333", base0A: "#f8ca12", base0B: "#37b349", base0C: "#00aabb", base0D: "#0e5a94", base0E: "#b31e8d", base0F: "#7a2d00" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "railscasts", author: "ryan bates (http://railscasts.com)", base00: "#2b2b2b", base01: "#272935", base02: "#3a4055", base03: "#5a647e", base04: "#d4cfc9", base05: "#e6e1dc", base06: "#f4f1ed", base07: "#f9f7f3", base08: "#da4939", base09: "#cc7833", base0A: "#ffc66d", base0B: "#a5c261", base0C: "#519f50", base0D: "#6d9cbe", base0E: "#b6b3eb", base0F: "#bc9458" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "shapeshifter", author: "tyler benziger (http://tybenz.com)", base00: "#000000", base01: "#040404", base02: "#102015", base03: "#343434", base04: "#555555", base05: "#ababab", base06: "#e0e0e0", base07: "#f9f9f9", base08: "#e92f2f", base09: "#e09448", base0A: "#dddd13", base0B: "#0ed839", base0C: "#23edda", base0D: "#3b48e3", base0E: "#f996e2", base0F: "#69542d" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "solarized", author: "ethan schoonover (http://ethanschoonover.com/solarized)", base00: "#002b36", base01: "#073642", base02: "#586e75", base03: "#657b83", base04: "#839496", base05: "#93a1a1", base06: "#eee8d5", base07: "#fdf6e3", base08: "#dc322f", base09: "#cb4b16", base0A: "#b58900", base0B: "#859900", base0C: "#2aa198", base0D: "#268bd2", base0E: "#6c71c4", base0F: "#d33682" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "summerfruit", author: "christopher corley (http://cscorley.github.io/)", base00: "#151515", base01: "#202020", base02: "#303030", base03: "#505050", base04: "#B0B0B0", base05: "#D0D0D0", base06: "#E0E0E0", base07: "#FFFFFF", base08: "#FF0086", base09: "#FD8900", base0A: "#ABA800", base0B: "#00C918", base0C: "#1faaaa", base0D: "#3777E6", base0E: "#AD00A1", base0F: "#cc6633" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "tomorrow", author: "chris kempson (http://chriskempson.com)", base00: "#1d1f21", base01: "#282a2e", base02: "#373b41", base03: "#969896", base04: "#b4b7b4", base05: "#c5c8c6", base06: "#e0e0e0", base07: "#ffffff", base08: "#cc6666", base09: "#de935f", base0A: "#f0c674", base0B: "#b5bd68", base0C: "#8abeb7", base0D: "#81a2be", base0E: "#b294bb", base0F: "#a3685a" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "london tube", author: "jan t. sott", base00: "#231f20", base01: "#1c3f95", base02: "#5a5758", base03: "#737171", base04: "#959ca1", base05: "#d9d8d8", base06: "#e7e7e8", base07: "#ffffff", base08: "#ee2e24", base09: "#f386a1", base0A: "#ffd204", base0B: "#00853e", base0C: "#85cebc", base0D: "#009ddc", base0E: "#98005d", base0F: "#b06110" }, r.exports = n.default;
      }, function(r, n, o) {
        n.__esModule = !0, n.default = { scheme: "twilight", author: "david hart (http://hart-dev.com)", base00: "#1e1e1e", base01: "#323537", base02: "#464b50", base03: "#5f5a60", base04: "#838184", base05: "#a7a7a7", base06: "#c3c3c3", base07: "#ffffff", base08: "#cf6a4c", base09: "#cda869", base0A: "#f9ee98", base0B: "#8f9d6a", base0C: "#afc4db", base0D: "#7587a6", base0E: "#9b859d", base0F: "#9b703f" }, r.exports = n.default;
      }, function(r, n, o) {
        var i = o(33);
        function s(l) {
          var u = Math.round(i(l, 0, 255)).toString(16);
          return u.length == 1 ? "0" + u : u;
        }
        r.exports = function(l) {
          var u = l.length === 4 ? s(255 * l[3]) : "";
          return "#" + s(l[0]) + s(l[1]) + s(l[2]) + u;
        };
      }, function(r, n, o) {
        var i = o(134), s = o(135), l = o(136), u = o(137), c = { "#": s, hsl: function(p) {
          var h = i(p), g = u(h);
          return h.length === 4 && g.push(h[3]), g;
        }, rgb: l };
        function d(p) {
          for (var h in c) if (p.indexOf(h) === 0) return c[h](p);
        }
        d.rgb = l, d.hsl = i, d.hex = s, r.exports = d;
      }, function(r, n, o) {
        var i = o(44), s = o(33);
        function l(u, c) {
          switch (u = parseFloat(u), c) {
            case 0:
              return s(u, 0, 360);
            case 1:
            case 2:
              return s(u, 0, 100);
            case 3:
              return s(u, 0, 1);
          }
        }
        r.exports = function(u) {
          return i(u).map(l);
        };
      }, function(r, n) {
        r.exports = function(o) {
          o.length !== 4 && o.length !== 5 || (o = (function(l) {
            for (var u = "#", c = 1; c < l.length; c++) {
              var d = l.charAt(c);
              u += d + d;
            }
            return u;
          })(o));
          var i = [parseInt(o.substring(1, 3), 16), parseInt(o.substring(3, 5), 16), parseInt(o.substring(5, 7), 16)];
          if (o.length === 9) {
            var s = parseFloat((parseInt(o.substring(7, 9), 16) / 255).toFixed(2));
            i.push(s);
          }
          return i;
        };
      }, function(r, n, o) {
        var i = o(44), s = o(33);
        function l(u, c) {
          return c < 3 ? u.indexOf("%") != -1 ? Math.round(255 * s(parseInt(u, 10), 0, 100) / 100) : s(parseInt(u, 10), 0, 255) : s(parseFloat(u), 0, 1);
        }
        r.exports = function(u) {
          return i(u).map(l);
        };
      }, function(r, n) {
        r.exports = function(o) {
          var i, s, l, u, c, d = o[0] / 360, p = o[1] / 100, h = o[2] / 100;
          if (p == 0) return [c = 255 * h, c, c];
          i = 2 * h - (s = h < 0.5 ? h * (1 + p) : h + p - h * p), u = [0, 0, 0];
          for (var g = 0; g < 3; g++) (l = d + 1 / 3 * -(g - 1)) < 0 && l++, l > 1 && l--, c = 6 * l < 1 ? i + 6 * (s - i) * l : 2 * l < 1 ? s : 3 * l < 2 ? i + (s - i) * (2 / 3 - l) * 6 : i, u[g] = 255 * c;
          return u;
        };
      }, function(r, n, o) {
        (function(i) {
          var s = typeof i == "object" && i && i.Object === Object && i, l = typeof self == "object" && self && self.Object === Object && self, u = s || l || Function("return this")();
          function c(j, M, I) {
            switch (I.length) {
              case 0:
                return j.call(M);
              case 1:
                return j.call(M, I[0]);
              case 2:
                return j.call(M, I[0], I[1]);
              case 3:
                return j.call(M, I[0], I[1], I[2]);
            }
            return j.apply(M, I);
          }
          function d(j, M) {
            for (var I = -1, b = M.length, S = j.length; ++I < b; ) j[S + I] = M[I];
            return j;
          }
          var p = Object.prototype, h = p.hasOwnProperty, g = p.toString, m = u.Symbol, v = p.propertyIsEnumerable, C = m ? m.isConcatSpreadable : void 0, T = Math.max;
          function A(j) {
            return f(j) || (function(M) {
              return (function(I) {
                return /* @__PURE__ */ (function(b) {
                  return !!b && typeof b == "object";
                })(I) && (function(b) {
                  return b != null && (function(S) {
                    return typeof S == "number" && S > -1 && S % 1 == 0 && S <= 9007199254740991;
                  })(b.length) && !(function(S) {
                    var L = (function(N) {
                      var R = typeof N;
                      return !!N && (R == "object" || R == "function");
                    })(S) ? g.call(S) : "";
                    return L == "[object Function]" || L == "[object GeneratorFunction]";
                  })(b);
                })(I);
              })(M) && h.call(M, "callee") && (!v.call(M, "callee") || g.call(M) == "[object Arguments]");
            })(j) || !!(C && j && j[C]);
          }
          var f = Array.isArray, x, k, D, V = (k = function(j) {
            var M = (j = (function(S, L, N, R, U) {
              var B = -1, J = S.length;
              for (N || (N = A), U || (U = []); ++B < J; ) {
                var W = S[B];
                N(W) ? d(U, W) : U[U.length] = W;
              }
              return U;
            })(j)).length, I = M;
            for (x; I--; ) if (typeof j[I] != "function") throw new TypeError("Expected a function");
            return function() {
              for (var b = 0, S = M ? j[b].apply(this, arguments) : arguments[0]; ++b < M; ) S = j[b].call(this, S);
              return S;
            };
          }, D = T(D === void 0 ? k.length - 1 : D, 0), function() {
            for (var j = arguments, M = -1, I = T(j.length - D, 0), b = Array(I); ++M < I; ) b[M] = j[D + M];
            M = -1;
            for (var S = Array(D + 1); ++M < D; ) S[M] = j[M];
            return S[D] = b, c(k, this, S);
          });
          r.exports = V;
        }).call(this, o(43));
      }, function(r, n, o) {
        Object.defineProperty(n, "__esModule", { value: !0 }), n.yuv2rgb = function(i) {
          var s, l, u, c = i[0], d = i[1], p = i[2];
          return s = 1 * c + 0 * d + 1.13983 * p, l = 1 * c + -0.39465 * d + -0.5806 * p, u = 1 * c + 2.02311 * d + 0 * p, s = Math.min(Math.max(0, s), 1), l = Math.min(Math.max(0, l), 1), u = Math.min(Math.max(0, u), 1), [255 * s, 255 * l, 255 * u];
        }, n.rgb2yuv = function(i) {
          var s = i[0] / 255, l = i[1] / 255, u = i[2] / 255;
          return [0.299 * s + 0.587 * l + 0.114 * u, -0.14713 * s + -0.28886 * l + 0.436 * u, 0.615 * s + -0.51499 * l + -0.10001 * u];
        };
      }, function(r, n, o) {
        function i(u, c, d) {
          return c in u ? Object.defineProperty(u, c, { value: d, enumerable: !0, configurable: !0, writable: !0 }) : u[c] = d, u;
        }
        var s = o(141), l = (function() {
          function u() {
            i(this, "_callbacks", void 0), i(this, "_isDispatching", void 0), i(this, "_isHandled", void 0), i(this, "_isPending", void 0), i(this, "_lastID", void 0), i(this, "_pendingPayload", void 0), this._callbacks = {}, this._isDispatching = !1, this._isHandled = {}, this._isPending = {}, this._lastID = 1;
          }
          var c = u.prototype;
          return c.register = function(d) {
            var p = "ID_" + this._lastID++;
            return this._callbacks[p] = d, p;
          }, c.unregister = function(d) {
            this._callbacks[d] || s(!1), delete this._callbacks[d];
          }, c.waitFor = function(d) {
            this._isDispatching || s(!1);
            for (var p = 0; p < d.length; p++) {
              var h = d[p];
              this._isPending[h] ? this._isHandled[h] || s(!1) : (this._callbacks[h] || s(!1), this._invokeCallback(h));
            }
          }, c.dispatch = function(d) {
            this._isDispatching && s(!1), this._startDispatching(d);
            try {
              for (var p in this._callbacks) this._isPending[p] || this._invokeCallback(p);
            } finally {
              this._stopDispatching();
            }
          }, c.isDispatching = function() {
            return this._isDispatching;
          }, c._invokeCallback = function(d) {
            this._isPending[d] = !0, this._callbacks[d](this._pendingPayload), this._isHandled[d] = !0;
          }, c._startDispatching = function(d) {
            for (var p in this._callbacks) this._isPending[p] = !1, this._isHandled[p] = !1;
            this._pendingPayload = d, this._isDispatching = !0;
          }, c._stopDispatching = function() {
            delete this._pendingPayload, this._isDispatching = !1;
          }, u;
        })();
        r.exports = l;
      }, function(r, n, o) {
        r.exports = function(i, s) {
          for (var l = arguments.length, u = new Array(l > 2 ? l - 2 : 0), c = 2; c < l; c++) u[c - 2] = arguments[c];
          if (!i) {
            var d;
            if (s === void 0) d = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
              var p = 0;
              (d = new Error(s.replace(/%s/g, (function() {
                return String(u[p++]);
              })))).name = "Invariant Violation";
            }
            throw d.framesToPop = 1, d;
          }
        };
      }, function(r, n, o) {
        function i(O, P, y) {
          return P in O ? Object.defineProperty(O, P, { value: y, enumerable: !0, configurable: !0, writable: !0 }) : O[P] = y, O;
        }
        function s(O, P) {
          var y = Object.keys(O);
          if (Object.getOwnPropertySymbols) {
            var w = Object.getOwnPropertySymbols(O);
            P && (w = w.filter((function($) {
              return Object.getOwnPropertyDescriptor(O, $).enumerable;
            }))), y.push.apply(y, w);
          }
          return y;
        }
        function l(O) {
          for (var P = 1; P < arguments.length; P++) {
            var y = arguments[P] != null ? arguments[P] : {};
            P % 2 ? s(Object(y), !0).forEach((function(w) {
              i(O, w, y[w]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(O, Object.getOwnPropertyDescriptors(y)) : s(Object(y)).forEach((function(w) {
              Object.defineProperty(O, w, Object.getOwnPropertyDescriptor(y, w));
            }));
          }
          return O;
        }
        function u(O, P) {
          if (!(O instanceof P)) throw new TypeError("Cannot call a class as a function");
        }
        function c(O, P) {
          for (var y = 0; y < P.length; y++) {
            var w = P[y];
            w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(O, w.key, w);
          }
        }
        function d(O, P, y) {
          return P && c(O.prototype, P), y && c(O, y), O;
        }
        function p(O, P) {
          return (p = Object.setPrototypeOf || function(y, w) {
            return y.__proto__ = w, y;
          })(O, P);
        }
        function h(O, P) {
          if (typeof P != "function" && P !== null) throw new TypeError("Super expression must either be null or a function");
          O.prototype = Object.create(P && P.prototype, { constructor: { value: O, writable: !0, configurable: !0 } }), P && p(O, P);
        }
        function g(O) {
          return (g = Object.setPrototypeOf ? Object.getPrototypeOf : function(P) {
            return P.__proto__ || Object.getPrototypeOf(P);
          })(O);
        }
        function m(O) {
          return (m = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(P) {
            return typeof P;
          } : function(P) {
            return P && typeof Symbol == "function" && P.constructor === Symbol && P !== Symbol.prototype ? "symbol" : typeof P;
          })(O);
        }
        function v(O) {
          if (O === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return O;
        }
        function C(O, P) {
          return !P || m(P) !== "object" && typeof P != "function" ? v(O) : P;
        }
        function T(O) {
          var P = (function() {
            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
            if (typeof Proxy == "function") return !0;
            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {
              }))), !0;
            } catch {
              return !1;
            }
          })();
          return function() {
            var y, w = g(O);
            if (P) {
              var $ = g(this).constructor;
              y = Reflect.construct(w, arguments, $);
            } else y = w.apply(this, arguments);
            return C(this, y);
          };
        }
        o.r(n);
        var A = o(0), f = o.n(A);
        function x() {
          var O = this.constructor.getDerivedStateFromProps(this.props, this.state);
          O != null && this.setState(O);
        }
        function k(O) {
          this.setState((function(P) {
            var y = this.constructor.getDerivedStateFromProps(O, P);
            return y ?? null;
          }).bind(this));
        }
        function D(O, P) {
          try {
            var y = this.props, w = this.state;
            this.props = O, this.state = P, this.__reactInternalSnapshotFlag = !0, this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(y, w);
          } finally {
            this.props = y, this.state = w;
          }
        }
        function V(O) {
          var P = O.prototype;
          if (!P || !P.isReactComponent) throw new Error("Can only polyfill class components");
          if (typeof O.getDerivedStateFromProps != "function" && typeof P.getSnapshotBeforeUpdate != "function") return O;
          var y = null, w = null, $ = null;
          if (typeof P.componentWillMount == "function" ? y = "componentWillMount" : typeof P.UNSAFE_componentWillMount == "function" && (y = "UNSAFE_componentWillMount"), typeof P.componentWillReceiveProps == "function" ? w = "componentWillReceiveProps" : typeof P.UNSAFE_componentWillReceiveProps == "function" && (w = "UNSAFE_componentWillReceiveProps"), typeof P.componentWillUpdate == "function" ? $ = "componentWillUpdate" : typeof P.UNSAFE_componentWillUpdate == "function" && ($ = "UNSAFE_componentWillUpdate"), y !== null || w !== null || $ !== null) {
            var K = O.displayName || O.name, Q = typeof O.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            throw Error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

` + K + " uses " + Q + " but also contains the following legacy lifecycles:" + (y !== null ? `
  ` + y : "") + (w !== null ? `
  ` + w : "") + ($ !== null ? `
  ` + $ : "") + `

The above lifecycles should be removed. Learn more about this warning here:
https://fb.me/react-async-component-lifecycle-hooks`);
          }
          if (typeof O.getDerivedStateFromProps == "function" && (P.componentWillMount = x, P.componentWillReceiveProps = k), typeof P.getSnapshotBeforeUpdate == "function") {
            if (typeof P.componentDidUpdate != "function") throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");
            P.componentWillUpdate = D;
            var Y = P.componentDidUpdate;
            P.componentDidUpdate = function(F, ie, xe) {
              var Ne = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : xe;
              Y.call(this, F, ie, Ne);
            };
          }
          return O;
        }
        function j(O, P) {
          if (O == null) return {};
          var y, w, $ = (function(Q, Y) {
            if (Q == null) return {};
            var F, ie, xe = {}, Ne = Object.keys(Q);
            for (ie = 0; ie < Ne.length; ie++) F = Ne[ie], Y.indexOf(F) >= 0 || (xe[F] = Q[F]);
            return xe;
          })(O, P);
          if (Object.getOwnPropertySymbols) {
            var K = Object.getOwnPropertySymbols(O);
            for (w = 0; w < K.length; w++) y = K[w], P.indexOf(y) >= 0 || Object.prototype.propertyIsEnumerable.call(O, y) && ($[y] = O[y]);
          }
          return $;
        }
        function M(O) {
          var P = (function(y) {
            return {}.toString.call(y).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
          })(O);
          return P === "number" && (P = isNaN(O) ? "nan" : (0 | O) != O ? "float" : "integer"), P;
        }
        x.__suppressDeprecationWarning = !0, k.__suppressDeprecationWarning = !0, D.__suppressDeprecationWarning = !0;
        var I = { scheme: "rjv-default", author: "mac gainor", base00: "rgba(0, 0, 0, 0)", base01: "rgb(245, 245, 245)", base02: "rgb(235, 235, 235)", base03: "#93a1a1", base04: "rgba(0, 0, 0, 0.3)", base05: "#586e75", base06: "#073642", base07: "#002b36", base08: "#d33682", base09: "#cb4b16", base0A: "#dc322f", base0B: "#859900", base0C: "#6c71c4", base0D: "#586e75", base0E: "#2aa198", base0F: "#268bd2" }, b = { scheme: "rjv-grey", author: "mac gainor", base00: "rgba(1, 1, 1, 0)", base01: "rgba(1, 1, 1, 0.1)", base02: "rgba(0, 0, 0, 0.2)", base03: "rgba(1, 1, 1, 0.3)", base04: "rgba(0, 0, 0, 0.4)", base05: "rgba(1, 1, 1, 0.5)", base06: "rgba(1, 1, 1, 0.6)", base07: "rgba(1, 1, 1, 0.7)", base08: "rgba(1, 1, 1, 0.8)", base09: "rgba(1, 1, 1, 0.8)", base0A: "rgba(1, 1, 1, 0.8)", base0B: "rgba(1, 1, 1, 0.8)", base0C: "rgba(1, 1, 1, 0.8)", base0D: "rgba(1, 1, 1, 0.8)", base0E: "rgba(1, 1, 1, 0.8)", base0F: "rgba(1, 1, 1, 0.8)" }, S = { globalFontFamily: "monospace", globalCursor: "default", braceFontWeight: "bold", braceCursor: "pointer", ellipsisFontSize: "18px", ellipsisLineHeight: "10px", ellipsisCursor: "pointer", keyMargin: "0px 5px", keyLetterSpacing: "0.5px", keyFontStyle: "none", keyVerticalAlign: "top", keyOpacity: "0.85", keyOpacityHover: "1", keyValPaddingTop: "3px", keyValPaddingBottom: "3px", keyValPaddingRight: "5px", keyValBorderLeft: "1px solid", keyValBorderHover: "2px solid", pushedContentMarginLeft: "6px", variableValuePaddingRight: "6px", nullFontSize: "11px", nullFontWeight: "bold", nullPadding: "1px 2px", nullBorderRadius: "3px", nanFontSize: "11px", nanFontWeight: "bold", nanPadding: "1px 2px", nanBorderRadius: "3px", undefinedFontSize: "11px", undefinedPadding: "1px 2px", undefinedBorderRadius: "3px", dataTypeFontSize: "11px", dataTypeMarginRight: "4px", datatypeOpacity: "0.8", objectSizeBorderRadius: "3px", objectSizeFontStyle: "italic", objectSizeMargin: "0px 6px 0px 0px", clipboardCursor: "pointer", clipboardCheckMarginLeft: "-12px", metaDataPadding: "0px 0px 0px 10px", arrayGroupMetaPadding: "0px 0px 0px 4px", iconContainerWidth: "17px", tooltipPadding: "4px", editInputMinWidth: "130px", editInputBorderRadius: "2px", editInputPadding: "5px", editInputMarginRight: "4px", editInputFontFamily: "monospace", iconCursor: "pointer", iconFontSize: "15px", iconPaddingRight: "1px", dateValueMarginLeft: "2px", iconMarginRight: "3px", detectedRowPaddingTop: "3px", addKeyCoverBackground: "rgba(255, 255, 255, 0.3)", addKeyCoverPosition: "absolute", addKeyCoverPositionPx: "0px", addKeyModalWidth: "200px", addKeyModalMargin: "auto", addKeyModalPadding: "10px", addKeyModalRadius: "3px" }, L = o(45), N = function(O) {
          var P = (function(y) {
            return { backgroundColor: y.base00, ellipsisColor: y.base09, braceColor: y.base07, expandedIcon: y.base0D, collapsedIcon: y.base0E, keyColor: y.base07, arrayKeyColor: y.base0C, objectSize: y.base04, copyToClipboard: y.base0F, copyToClipboardCheck: y.base0D, objectBorder: y.base02, dataTypes: { boolean: y.base0E, date: y.base0D, float: y.base0B, function: y.base0D, integer: y.base0F, string: y.base09, nan: y.base08, null: y.base0A, undefined: y.base05, regexp: y.base0A, background: y.base02 }, editVariable: { editIcon: y.base0E, cancelIcon: y.base09, removeIcon: y.base09, addIcon: y.base0E, checkIcon: y.base0E, background: y.base01, color: y.base0A, border: y.base07 }, addKeyModal: { background: y.base05, border: y.base04, color: y.base0A, labelColor: y.base01 }, validationFailure: { background: y.base09, iconColor: y.base01, fontColor: y.base01 } };
          })(O);
          return { "app-container": { fontFamily: S.globalFontFamily, cursor: S.globalCursor, backgroundColor: P.backgroundColor, position: "relative" }, ellipsis: { display: "inline-block", color: P.ellipsisColor, fontSize: S.ellipsisFontSize, lineHeight: S.ellipsisLineHeight, cursor: S.ellipsisCursor }, "brace-row": { display: "inline-block", cursor: "pointer" }, brace: { display: "inline-block", cursor: S.braceCursor, fontWeight: S.braceFontWeight, color: P.braceColor }, "expanded-icon": { color: P.expandedIcon }, "collapsed-icon": { color: P.collapsedIcon }, colon: { display: "inline-block", margin: S.keyMargin, color: P.keyColor, verticalAlign: "top" }, objectKeyVal: function(y, w) {
            return { style: l({ paddingTop: S.keyValPaddingTop, paddingRight: S.keyValPaddingRight, paddingBottom: S.keyValPaddingBottom, borderLeft: S.keyValBorderLeft + " " + P.objectBorder, ":hover": { paddingLeft: w.paddingLeft - 1 + "px", borderLeft: S.keyValBorderHover + " " + P.objectBorder } }, w) };
          }, "object-key-val-no-border": { padding: S.keyValPadding }, "pushed-content": { marginLeft: S.pushedContentMarginLeft }, variableValue: function(y, w) {
            return { style: l({ display: "inline-block", paddingRight: S.variableValuePaddingRight, position: "relative" }, w) };
          }, "object-name": { display: "inline-block", color: P.keyColor, letterSpacing: S.keyLetterSpacing, fontStyle: S.keyFontStyle, verticalAlign: S.keyVerticalAlign, opacity: S.keyOpacity, ":hover": { opacity: S.keyOpacityHover } }, "array-key": { display: "inline-block", color: P.arrayKeyColor, letterSpacing: S.keyLetterSpacing, fontStyle: S.keyFontStyle, verticalAlign: S.keyVerticalAlign, opacity: S.keyOpacity, ":hover": { opacity: S.keyOpacityHover } }, "object-size": { color: P.objectSize, borderRadius: S.objectSizeBorderRadius, fontStyle: S.objectSizeFontStyle, margin: S.objectSizeMargin, cursor: "default" }, "data-type-label": { fontSize: S.dataTypeFontSize, marginRight: S.dataTypeMarginRight, opacity: S.datatypeOpacity }, boolean: { display: "inline-block", color: P.dataTypes.boolean }, date: { display: "inline-block", color: P.dataTypes.date }, "date-value": { marginLeft: S.dateValueMarginLeft }, float: { display: "inline-block", color: P.dataTypes.float }, function: { display: "inline-block", color: P.dataTypes.function, cursor: "pointer", whiteSpace: "pre-line" }, "function-value": { fontStyle: "italic" }, integer: { display: "inline-block", color: P.dataTypes.integer }, string: { display: "inline-block", color: P.dataTypes.string }, nan: { display: "inline-block", color: P.dataTypes.nan, fontSize: S.nanFontSize, fontWeight: S.nanFontWeight, backgroundColor: P.dataTypes.background, padding: S.nanPadding, borderRadius: S.nanBorderRadius }, null: { display: "inline-block", color: P.dataTypes.null, fontSize: S.nullFontSize, fontWeight: S.nullFontWeight, backgroundColor: P.dataTypes.background, padding: S.nullPadding, borderRadius: S.nullBorderRadius }, undefined: { display: "inline-block", color: P.dataTypes.undefined, fontSize: S.undefinedFontSize, padding: S.undefinedPadding, borderRadius: S.undefinedBorderRadius, backgroundColor: P.dataTypes.background }, regexp: { display: "inline-block", color: P.dataTypes.regexp }, "copy-to-clipboard": { cursor: S.clipboardCursor }, "copy-icon": { color: P.copyToClipboard, fontSize: S.iconFontSize, marginRight: S.iconMarginRight, verticalAlign: "top" }, "copy-icon-copied": { color: P.copyToClipboardCheck, marginLeft: S.clipboardCheckMarginLeft }, "array-group-meta-data": { display: "inline-block", padding: S.arrayGroupMetaPadding }, "object-meta-data": { display: "inline-block", padding: S.metaDataPadding }, "icon-container": { display: "inline-block", width: S.iconContainerWidth }, tooltip: { padding: S.tooltipPadding }, removeVarIcon: { verticalAlign: "top", display: "inline-block", color: P.editVariable.removeIcon, cursor: S.iconCursor, fontSize: S.iconFontSize, marginRight: S.iconMarginRight }, addVarIcon: { verticalAlign: "top", display: "inline-block", color: P.editVariable.addIcon, cursor: S.iconCursor, fontSize: S.iconFontSize, marginRight: S.iconMarginRight }, editVarIcon: { verticalAlign: "top", display: "inline-block", color: P.editVariable.editIcon, cursor: S.iconCursor, fontSize: S.iconFontSize, marginRight: S.iconMarginRight }, "edit-icon-container": { display: "inline-block", verticalAlign: "top" }, "check-icon": { display: "inline-block", cursor: S.iconCursor, color: P.editVariable.checkIcon, fontSize: S.iconFontSize, paddingRight: S.iconPaddingRight }, "cancel-icon": { display: "inline-block", cursor: S.iconCursor, color: P.editVariable.cancelIcon, fontSize: S.iconFontSize, paddingRight: S.iconPaddingRight }, "edit-input": { display: "inline-block", minWidth: S.editInputMinWidth, borderRadius: S.editInputBorderRadius, backgroundColor: P.editVariable.background, color: P.editVariable.color, padding: S.editInputPadding, marginRight: S.editInputMarginRight, fontFamily: S.editInputFontFamily }, "detected-row": { paddingTop: S.detectedRowPaddingTop }, "key-modal-request": { position: S.addKeyCoverPosition, top: S.addKeyCoverPositionPx, left: S.addKeyCoverPositionPx, right: S.addKeyCoverPositionPx, bottom: S.addKeyCoverPositionPx, backgroundColor: S.addKeyCoverBackground }, "key-modal": { width: S.addKeyModalWidth, backgroundColor: P.addKeyModal.background, marginLeft: S.addKeyModalMargin, marginRight: S.addKeyModalMargin, padding: S.addKeyModalPadding, borderRadius: S.addKeyModalRadius, marginTop: "15px", position: "relative" }, "key-modal-label": { color: P.addKeyModal.labelColor, marginLeft: "2px", marginBottom: "5px", fontSize: "11px" }, "key-modal-input-container": { overflow: "hidden" }, "key-modal-input": { width: "100%", padding: "3px 6px", fontFamily: "monospace", color: P.addKeyModal.color, border: "none", boxSizing: "border-box", borderRadius: "2px" }, "key-modal-cancel": { backgroundColor: P.editVariable.removeIcon, position: "absolute", top: "0px", right: "0px", borderRadius: "0px 3px 0px 3px", cursor: "pointer" }, "key-modal-cancel-icon": { color: P.addKeyModal.labelColor, fontSize: S.iconFontSize, transform: "rotate(45deg)" }, "key-modal-submit": { color: P.editVariable.addIcon, fontSize: S.iconFontSize, position: "absolute", right: "2px", top: "3px", cursor: "pointer" }, "function-ellipsis": { display: "inline-block", color: P.ellipsisColor, fontSize: S.ellipsisFontSize, lineHeight: S.ellipsisLineHeight, cursor: S.ellipsisCursor }, "validation-failure": { float: "right", padding: "3px 6px", borderRadius: "2px", cursor: "pointer", color: P.validationFailure.fontColor, backgroundColor: P.validationFailure.background }, "validation-failure-label": { marginRight: "6px" }, "validation-failure-clear": { position: "relative", verticalAlign: "top", cursor: "pointer", color: P.validationFailure.iconColor, fontSize: S.iconFontSize, transform: "rotate(45deg)" } };
        };
        function R(O, P, y) {
          return O || console.error("theme has not been set"), (function(w) {
            var $ = I;
            return w !== !1 && w !== "none" || ($ = b), Object(L.createStyling)(N, { defaultBase16: $ })(w);
          })(O)(P, y);
        }
        var U = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = (w.rjvId, w.type_name), K = w.displayDataTypes, Q = w.theme;
            return K ? f.a.createElement("span", Object.assign({ className: "data-type-label" }, R(Q, "data-type-label")), $) : null;
          } }]), y;
        })(f.a.PureComponent), B = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props;
            return f.a.createElement("div", R(w.theme, "boolean"), f.a.createElement(U, Object.assign({ type_name: "bool" }, w)), w.value ? "true" : "false");
          } }]), y;
        })(f.a.PureComponent), J = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props;
            return f.a.createElement("div", R(w.theme, "date"), f.a.createElement(U, Object.assign({ type_name: "date" }, w)), f.a.createElement("span", Object.assign({ className: "date-value" }, R(w.theme, "date-value")), w.value.toLocaleTimeString("en-us", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })));
          } }]), y;
        })(f.a.PureComponent), W = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props;
            return f.a.createElement("div", R(w.theme, "float"), f.a.createElement(U, Object.assign({ type_name: "float" }, w)), this.props.value);
          } }]), y;
        })(f.a.PureComponent);
        function ae(O, P) {
          (P == null || P > O.length) && (P = O.length);
          for (var y = 0, w = new Array(P); y < P; y++) w[y] = O[y];
          return w;
        }
        function re(O, P) {
          if (O) {
            if (typeof O == "string") return ae(O, P);
            var y = Object.prototype.toString.call(O).slice(8, -1);
            return y === "Object" && O.constructor && (y = O.constructor.name), y === "Map" || y === "Set" ? Array.from(O) : y === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(y) ? ae(O, P) : void 0;
          }
        }
        function de(O, P) {
          var y;
          if (typeof Symbol > "u" || O[Symbol.iterator] == null) {
            if (Array.isArray(O) || (y = re(O)) || P) {
              y && (O = y);
              var w = 0, $ = function() {
              };
              return { s: $, n: function() {
                return w >= O.length ? { done: !0 } : { done: !1, value: O[w++] };
              }, e: function(F) {
                throw F;
              }, f: $ };
            }
            throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          var K, Q = !0, Y = !1;
          return { s: function() {
            y = O[Symbol.iterator]();
          }, n: function() {
            var F = y.next();
            return Q = F.done, F;
          }, e: function(F) {
            Y = !0, K = F;
          }, f: function() {
            try {
              Q || y.return == null || y.return();
            } finally {
              if (Y) throw K;
            }
          } };
        }
        function pe(O) {
          return (function(P) {
            if (Array.isArray(P)) return ae(P);
          })(O) || (function(P) {
            if (typeof Symbol < "u" && Symbol.iterator in Object(P)) return Array.from(P);
          })(O) || re(O) || (function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          })();
        }
        var Se = o(46), fe = new (o(47)).Dispatcher(), ce = new ((function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            var w;
            u(this, y);
            for (var $ = arguments.length, K = new Array($), Q = 0; Q < $; Q++) K[Q] = arguments[Q];
            return (w = P.call.apply(P, [this].concat(K))).objects = {}, w.set = function(Y, F, ie, xe) {
              w.objects[Y] === void 0 && (w.objects[Y] = {}), w.objects[Y][F] === void 0 && (w.objects[Y][F] = {}), w.objects[Y][F][ie] = xe;
            }, w.get = function(Y, F, ie, xe) {
              return w.objects[Y] === void 0 || w.objects[Y][F] === void 0 || w.objects[Y][F][ie] == null ? xe : w.objects[Y][F][ie];
            }, w.handleAction = function(Y) {
              var F = Y.rjvId, ie = Y.data;
              switch (Y.name) {
                case "RESET":
                  w.emit("reset-" + F);
                  break;
                case "VARIABLE_UPDATED":
                  Y.data.updated_src = w.updateSrc(F, ie), w.set(F, "action", "variable-update", l(l({}, ie), {}, { type: "variable-edited" })), w.emit("variable-update-" + F);
                  break;
                case "VARIABLE_REMOVED":
                  Y.data.updated_src = w.updateSrc(F, ie), w.set(F, "action", "variable-update", l(l({}, ie), {}, { type: "variable-removed" })), w.emit("variable-update-" + F);
                  break;
                case "VARIABLE_ADDED":
                  Y.data.updated_src = w.updateSrc(F, ie), w.set(F, "action", "variable-update", l(l({}, ie), {}, { type: "variable-added" })), w.emit("variable-update-" + F);
                  break;
                case "ADD_VARIABLE_KEY_REQUEST":
                  w.set(F, "action", "new-key-request", ie), w.emit("add-key-request-" + F);
              }
            }, w.updateSrc = function(Y, F) {
              var ie = F.name, xe = F.namespace, Ne = F.new_value, qe = (F.existing_value, F.variable_removed);
              xe.shift();
              var rt, Ie = w.get(Y, "global", "src"), nt = w.deepCopy(Ie, pe(xe)), vt = nt, Oe = de(xe);
              try {
                for (Oe.s(); !(rt = Oe.n()).done; )
                  vt = vt[rt.value];
              } catch (kt) {
                Oe.e(kt);
              } finally {
                Oe.f();
              }
              return qe ? M(vt) == "array" ? vt.splice(ie, 1) : delete vt[ie] : ie !== null ? vt[ie] = Ne : nt = Ne, w.set(Y, "global", "src", nt), nt;
            }, w.deepCopy = function(Y, F) {
              var ie, xe = M(Y), Ne = F.shift();
              return xe == "array" ? ie = pe(Y) : xe == "object" && (ie = l({}, Y)), Ne !== void 0 && (ie[Ne] = w.deepCopy(Y[Ne], F)), ie;
            }, w;
          }
          return y;
        })(Se.EventEmitter))();
        fe.register(ce.handleAction.bind(ce));
        var ue = ce, me = (function(O) {
          h(y, O);
          var P = T(y);
          function y(w) {
            var $;
            return u(this, y), ($ = P.call(this, w)).toggleCollapsed = function() {
              $.setState({ collapsed: !$.state.collapsed }, (function() {
                ue.set($.props.rjvId, $.props.namespace, "collapsed", $.state.collapsed);
              }));
            }, $.getFunctionDisplay = function(K) {
              var Q = v($).props;
              return K ? f.a.createElement("span", null, $.props.value.toString().slice(9, -1).replace(/\{[\s\S]+/, ""), f.a.createElement("span", { className: "function-collapsed", style: { fontWeight: "bold" } }, f.a.createElement("span", null, "{"), f.a.createElement("span", R(Q.theme, "ellipsis"), "..."), f.a.createElement("span", null, "}"))) : $.props.value.toString().slice(9, -1);
            }, $.state = { collapsed: ue.get(w.rjvId, w.namespace, "collapsed", !0) }, $;
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = this.state.collapsed;
            return f.a.createElement("div", R(w.theme, "function"), f.a.createElement(U, Object.assign({ type_name: "function" }, w)), f.a.createElement("span", Object.assign({}, R(w.theme, "function-value"), { className: "rjv-function-container", onClick: this.toggleCollapsed }), this.getFunctionDisplay($)));
          } }]), y;
        })(f.a.PureComponent), be = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            return f.a.createElement("div", R(this.props.theme, "nan"), "NaN");
          } }]), y;
        })(f.a.PureComponent), Pe = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            return f.a.createElement("div", R(this.props.theme, "null"), "NULL");
          } }]), y;
        })(f.a.PureComponent), De = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props;
            return f.a.createElement("div", R(w.theme, "integer"), f.a.createElement(U, Object.assign({ type_name: "int" }, w)), this.props.value);
          } }]), y;
        })(f.a.PureComponent), ze = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props;
            return f.a.createElement("div", R(w.theme, "regexp"), f.a.createElement(U, Object.assign({ type_name: "regexp" }, w)), this.props.value.toString());
          } }]), y;
        })(f.a.PureComponent), We = (function(O) {
          h(y, O);
          var P = T(y);
          function y(w) {
            var $;
            return u(this, y), ($ = P.call(this, w)).toggleCollapsed = function() {
              $.setState({ collapsed: !$.state.collapsed }, (function() {
                ue.set($.props.rjvId, $.props.namespace, "collapsed", $.state.collapsed);
              }));
            }, $.state = { collapsed: ue.get(w.rjvId, w.namespace, "collapsed", !0) }, $;
          }
          return d(y, [{ key: "render", value: function() {
            this.state.collapsed;
            var w = this.props, $ = w.collapseStringsAfterLength, K = w.theme, Q = w.value, Y = { style: { cursor: "default" } };
            return M($) === "integer" && Q.length > $ && (Y.style.cursor = "pointer", this.state.collapsed && (Q = f.a.createElement("span", null, Q.substring(0, $), f.a.createElement("span", R(K, "ellipsis"), " ...")))), f.a.createElement("div", R(K, "string"), f.a.createElement(U, Object.assign({ type_name: "string" }, w)), f.a.createElement("span", Object.assign({ className: "string-value" }, Y, { onClick: this.toggleCollapsed }), '"', Q, '"'));
          } }]), y;
        })(f.a.PureComponent), ht = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            return f.a.createElement("div", R(this.props.theme, "undefined"), "undefined");
          } }]), y;
        })(f.a.PureComponent);
        function je() {
          return (je = Object.assign || function(O) {
            for (var P = 1; P < arguments.length; P++) {
              var y = arguments[P];
              for (var w in y) Object.prototype.hasOwnProperty.call(y, w) && (O[w] = y[w]);
            }
            return O;
          }).apply(this, arguments);
        }
        var He = A.useLayoutEffect, Ge = function(O) {
          var P = Object(A.useRef)(O);
          return He((function() {
            P.current = O;
          })), P;
        }, Ue = function(O, P) {
          typeof O != "function" ? O.current = P : O(P);
        }, gt = function(O, P) {
          var y = Object(A.useRef)();
          return Object(A.useCallback)((function(w) {
            O.current = w, y.current && Ue(y.current, null), y.current = P, P && Ue(P, w);
          }), [P]);
        }, mt = { "min-height": "0", "max-height": "none", height: "0", visibility: "hidden", overflow: "hidden", position: "absolute", "z-index": "-1000", top: "0", right: "0" }, lt = function(O) {
          Object.keys(mt).forEach((function(P) {
            O.style.setProperty(P, mt[P], "important");
          }));
        }, Ye = null, ft = function() {
        }, Z = ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "boxSizing", "fontFamily", "fontSize", "fontStyle", "fontWeight", "letterSpacing", "lineHeight", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "tabSize", "textIndent", "textRendering", "textTransform", "width"], z = !!document.documentElement.currentStyle, H = function(O, P) {
          var y = O.cacheMeasurements, w = O.maxRows, $ = O.minRows, K = O.onChange, Q = K === void 0 ? ft : K, Y = O.onHeightChange, F = Y === void 0 ? ft : Y, ie = (function(Oe, kt) {
            if (Oe == null) return {};
            var Ot, Ut, Vr = {}, Gt = Object.keys(Oe);
            for (Ut = 0; Ut < Gt.length; Ut++) Ot = Gt[Ut], kt.indexOf(Ot) >= 0 || (Vr[Ot] = Oe[Ot]);
            return Vr;
          })(O, ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"]), xe, Ne = ie.value !== void 0, qe = Object(A.useRef)(null), rt = gt(qe, P), Ie = Object(A.useRef)(0), nt = Object(A.useRef)(), vt = function() {
            var Oe = qe.current, kt = y && nt.current ? nt.current : (function(Gt) {
              var Hr = window.getComputedStyle(Gt);
              if (Hr === null) return null;
              var ur, Rt = (ur = Hr, Z.reduce((function(kr, dr) {
                return kr[dr] = ur[dr], kr;
              }), {})), Xt = Rt.boxSizing;
              return Xt === "" ? null : (z && Xt === "border-box" && (Rt.width = parseFloat(Rt.width) + parseFloat(Rt.borderRightWidth) + parseFloat(Rt.borderLeftWidth) + parseFloat(Rt.paddingRight) + parseFloat(Rt.paddingLeft) + "px"), { sizingStyle: Rt, paddingSize: parseFloat(Rt.paddingBottom) + parseFloat(Rt.paddingTop), borderSize: parseFloat(Rt.borderBottomWidth) + parseFloat(Rt.borderTopWidth) });
            })(Oe);
            if (kt) {
              nt.current = kt;
              var Ot = (function(Gt, Hr, ur, Rt) {
                ur === void 0 && (ur = 1), Rt === void 0 && (Rt = 1 / 0), Ye || ((Ye = document.createElement("textarea")).setAttribute("tab-index", "-1"), Ye.setAttribute("aria-hidden", "true"), lt(Ye)), Ye.parentNode === null && document.body.appendChild(Ye);
                var Xt = Gt.paddingSize, kr = Gt.borderSize, dr = Gt.sizingStyle, Qn = dr.boxSizing;
                Object.keys(dr).forEach((function(qr) {
                  var fr = qr;
                  Ye.style[fr] = dr[fr];
                })), lt(Ye), Ye.value = Hr;
                var Kr = (function(qr, fr) {
                  var ea = qr.scrollHeight;
                  return fr.sizingStyle.boxSizing === "border-box" ? ea + fr.borderSize : ea - fr.paddingSize;
                })(Ye, Gt);
                Ye.value = "x";
                var wn = Ye.scrollHeight - Xt, Cn = wn * ur;
                Qn === "border-box" && (Cn = Cn + Xt + kr), Kr = Math.max(Cn, Kr);
                var En = wn * Rt;
                return Qn === "border-box" && (En = En + Xt + kr), [Kr = Math.min(En, Kr), wn];
              })(kt, Oe.value || Oe.placeholder || "x", $, w), Ut = Ot[0], Vr = Ot[1];
              Ie.current !== Ut && (Ie.current = Ut, Oe.style.setProperty("height", Ut + "px", "important"), F(Ut, { rowHeight: Vr }));
            }
          };
          return Object(A.useLayoutEffect)(vt), xe = Ge(vt), Object(A.useLayoutEffect)((function() {
            var Oe = function(kt) {
              xe.current(kt);
            };
            return window.addEventListener("resize", Oe), function() {
              window.removeEventListener("resize", Oe);
            };
          }), []), Object(A.createElement)("textarea", je({}, ie, { onChange: function(Oe) {
            Ne || vt(), Q(Oe);
          }, ref: rt }));
        }, X = Object(A.forwardRef)(H);
        function ne(O) {
          O = O.trim();
          try {
            if ((O = JSON.stringify(JSON.parse(O)))[0] === "[") return he("array", JSON.parse(O));
            if (O[0] === "{") return he("object", JSON.parse(O));
            if (O.match(/\-?\d+\.\d+/) && O.match(/\-?\d+\.\d+/)[0] === O) return he("float", parseFloat(O));
            if (O.match(/\-?\d+e-\d+/) && O.match(/\-?\d+e-\d+/)[0] === O) return he("float", Number(O));
            if (O.match(/\-?\d+/) && O.match(/\-?\d+/)[0] === O) return he("integer", parseInt(O));
            if (O.match(/\-?\d+e\+\d+/) && O.match(/\-?\d+e\+\d+/)[0] === O) return he("integer", Number(O));
          } catch {
          }
          switch (O = O.toLowerCase()) {
            case "undefined":
              return he("undefined", void 0);
            case "nan":
              return he("nan", NaN);
            case "null":
              return he("null", null);
            case "true":
              return he("boolean", !0);
            case "false":
              return he("boolean", !1);
            default:
              if (O = Date.parse(O)) return he("date", new Date(O));
          }
          return he(!1, null);
        }
        function he(O, P) {
          return { type: O, value: P };
        }
        var $e = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]);
            return f.a.createElement("span", K, f.a.createElement("svg", Object.assign({}, Te($), { viewBox: "0 0 24 24", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("path", { d: "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" })));
          } }]), y;
        })(f.a.PureComponent), ke = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]);
            return f.a.createElement("span", K, f.a.createElement("svg", Object.assign({}, Te($), { viewBox: "0 0 24 24", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("path", { d: "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" })));
          } }]), y;
        })(f.a.PureComponent), _e = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]), Q = Te($).style;
            return f.a.createElement("span", K, f.a.createElement("svg", { fill: Q.color, width: Q.height, height: Q.width, style: Q, viewBox: "0 0 1792 1792" }, f.a.createElement("path", { d: "M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z" })));
          } }]), y;
        })(f.a.PureComponent), Xe = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]), Q = Te($).style;
            return f.a.createElement("span", K, f.a.createElement("svg", { fill: Q.color, width: Q.height, height: Q.width, style: Q, viewBox: "0 0 1792 1792" }, f.a.createElement("path", { d: "M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z" })));
          } }]), y;
        })(f.a.PureComponent), Je = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]);
            return f.a.createElement("span", K, f.a.createElement("svg", { style: l(l({}, Te($).style), {}, { paddingLeft: "2px", verticalAlign: "top" }), viewBox: "0 0 15 15", fill: "currentColor" }, f.a.createElement("path", { d: "M0 14l6-6-6-6z" })));
          } }]), y;
        })(f.a.PureComponent), Ee = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]);
            return f.a.createElement("span", K, f.a.createElement("svg", { style: l(l({}, Te($).style), {}, { paddingLeft: "2px", verticalAlign: "top" }), viewBox: "0 0 15 15", fill: "currentColor" }, f.a.createElement("path", { d: "M0 5l6 6 6-6z" })));
          } }]), y;
        })(f.a.PureComponent), oe = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]);
            return f.a.createElement("span", K, f.a.createElement("svg", Object.assign({}, Te($), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m30 35h-25v-22.5h25v7.5h2.5v-12.5c0-1.4-1.1-2.5-2.5-2.5h-7.5c0-2.8-2.2-5-5-5s-5 2.2-5 5h-7.5c-1.4 0-2.5 1.1-2.5 2.5v27.5c0 1.4 1.1 2.5 2.5 2.5h25c1.4 0 2.5-1.1 2.5-2.5v-5h-2.5v5z m-20-27.5h2.5s2.5-1.1 2.5-2.5 1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5 1.3 2.5 2.5 2.5h2.5s2.5 1.1 2.5 2.5h-20c0-1.5 1.1-2.5 2.5-2.5z m-2.5 20h5v-2.5h-5v2.5z m17.5-5v-5l-10 7.5 10 7.5v-5h12.5v-5h-12.5z m-17.5 10h7.5v-2.5h-7.5v2.5z m12.5-17.5h-12.5v2.5h12.5v-2.5z m-7.5 5h-5v2.5h5v-2.5z" }))));
          } }]), y;
        })(f.a.PureComponent), ve = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]);
            return f.a.createElement("span", K, f.a.createElement("svg", Object.assign({}, Te($), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m28.6 25q0-0.5-0.4-1l-4-4 4-4q0.4-0.5 0.4-1 0-0.6-0.4-1.1l-2-2q-0.4-0.4-1-0.4-0.6 0-1 0.4l-4.1 4.1-4-4.1q-0.4-0.4-1-0.4-0.6 0-1 0.4l-2 2q-0.5 0.5-0.5 1.1 0 0.5 0.5 1l4 4-4 4q-0.5 0.5-0.5 1 0 0.7 0.5 1.1l2 2q0.4 0.4 1 0.4 0.6 0 1-0.4l4-4.1 4.1 4.1q0.4 0.4 1 0.4 0.6 0 1-0.4l2-2q0.4-0.4 0.4-1z m8.7-5q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" }))));
          } }]), y;
        })(f.a.PureComponent), Me = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]);
            return f.a.createElement("span", K, f.a.createElement("svg", Object.assign({}, Te($), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m30.1 21.4v-2.8q0-0.6-0.4-1t-1-0.5h-5.7v-5.7q0-0.6-0.4-1t-1-0.4h-2.9q-0.6 0-1 0.4t-0.4 1v5.7h-5.7q-0.6 0-1 0.5t-0.5 1v2.8q0 0.6 0.5 1t1 0.5h5.7v5.7q0 0.5 0.4 1t1 0.4h2.9q0.6 0 1-0.4t0.4-1v-5.7h5.7q0.6 0 1-0.5t0.4-1z m7.2-1.4q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" }))));
          } }]), y;
        })(f.a.PureComponent), Be = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]);
            return f.a.createElement("span", K, f.a.createElement("svg", Object.assign({}, Te($), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m31.6 21.6h-10v10h-3.2v-10h-10v-3.2h10v-10h3.2v10h10v3.2z" }))));
          } }]), y;
        })(f.a.PureComponent), Ze = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]);
            return f.a.createElement("span", K, f.a.createElement("svg", Object.assign({}, Te($), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m19.8 26.4l2.6-2.6-3.4-3.4-2.6 2.6v1.3h2.2v2.1h1.2z m9.8-16q-0.3-0.4-0.7 0l-7.8 7.8q-0.4 0.4 0 0.7t0.7 0l7.8-7.8q0.4-0.4 0-0.7z m1.8 13.2v4.3q0 2.6-1.9 4.5t-4.5 1.9h-18.6q-2.6 0-4.5-1.9t-1.9-4.5v-18.6q0-2.7 1.9-4.6t4.5-1.8h18.6q1.4 0 2.6 0.5 0.3 0.2 0.4 0.5 0.1 0.4-0.2 0.7l-1.1 1.1q-0.3 0.3-0.7 0.1-0.5-0.1-1-0.1h-18.6q-1.4 0-2.5 1.1t-1 2.5v18.6q0 1.4 1 2.5t2.5 1h18.6q1.5 0 2.5-1t1.1-2.5v-2.9q0-0.2 0.2-0.4l1.4-1.5q0.3-0.3 0.8-0.1t0.4 0.6z m-2.1-16.5l6.4 6.5-15 15h-6.4v-6.5z m9.9 3l-2.1 2-6.4-6.4 2.1-2q0.6-0.7 1.5-0.7t1.5 0.7l3.4 3.4q0.6 0.6 0.6 1.5t-0.6 1.5z" }))));
          } }]), y;
        })(f.a.PureComponent), Re = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.style, K = j(w, ["style"]);
            return f.a.createElement("span", K, f.a.createElement("svg", Object.assign({}, Te($), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m31.7 16.4q0-0.6-0.4-1l-2.1-2.1q-0.4-0.4-1-0.4t-1 0.4l-9.1 9.1-5-5q-0.5-0.4-1-0.4t-1 0.4l-2.1 2q-0.4 0.4-0.4 1 0 0.6 0.4 1l8.1 8.1q0.4 0.4 1 0.4 0.6 0 1-0.4l12.2-12.1q0.4-0.4 0.4-1z m5.6 3.6q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" }))));
          } }]), y;
        })(f.a.PureComponent);
        function Te(O) {
          return O || (O = {}), { style: l(l({ verticalAlign: "middle" }, O), {}, { color: O.color ? O.color : "#000000", height: "1em", width: "1em" }) };
        }
        var ct = (function(O) {
          h(y, O);
          var P = T(y);
          function y(w) {
            var $;
            return u(this, y), ($ = P.call(this, w)).copiedTimer = null, $.handleCopy = function() {
              var K = document.createElement("textarea"), Q = $.props, Y = Q.clickCallback, F = Q.src, ie = Q.namespace;
              K.innerHTML = JSON.stringify($.clipboardValue(F), null, "  "), document.body.appendChild(K), K.select(), document.execCommand("copy"), document.body.removeChild(K), $.copiedTimer = setTimeout((function() {
                $.setState({ copied: !1 });
              }), 5500), $.setState({ copied: !0 }, (function() {
                typeof Y == "function" && Y({ src: F, namespace: ie, name: ie[ie.length - 1] });
              }));
            }, $.getClippyIcon = function() {
              var K = $.props.theme;
              return $.state.copied ? f.a.createElement("span", null, f.a.createElement(oe, Object.assign({ className: "copy-icon" }, R(K, "copy-icon"))), f.a.createElement("span", R(K, "copy-icon-copied"), "✔")) : f.a.createElement(oe, Object.assign({ className: "copy-icon" }, R(K, "copy-icon")));
            }, $.clipboardValue = function(K) {
              switch (M(K)) {
                case "function":
                case "regexp":
                  return K.toString();
                default:
                  return K;
              }
            }, $.state = { copied: !1 }, $;
          }
          return d(y, [{ key: "componentWillUnmount", value: function() {
            this.copiedTimer && (clearTimeout(this.copiedTimer), this.copiedTimer = null);
          } }, { key: "render", value: function() {
            var w = this.props, $ = (w.src, w.theme), K = w.hidden, Q = w.rowHovered, Y = R($, "copy-to-clipboard").style, F = "inline";
            return K && (F = "none"), f.a.createElement("span", { className: "copy-to-clipboard-container", title: "Copy to clipboard", style: { verticalAlign: "top", display: Q ? "inline-block" : "none" } }, f.a.createElement("span", { style: l(l({}, Y), {}, { display: F }), onClick: this.handleCopy }, this.getClippyIcon()));
          } }]), y;
        })(f.a.PureComponent), Qe = (function(O) {
          h(y, O);
          var P = T(y);
          function y(w) {
            var $;
            return u(this, y), ($ = P.call(this, w)).getEditIcon = function() {
              var K = $.props, Q = K.variable, Y = K.theme;
              return f.a.createElement("div", { className: "click-to-edit", style: { verticalAlign: "top", display: $.state.hovered ? "inline-block" : "none" } }, f.a.createElement(Ze, Object.assign({ className: "click-to-edit-icon" }, R(Y, "editVarIcon"), { onClick: function() {
                $.prepopInput(Q);
              } })));
            }, $.prepopInput = function(K) {
              if ($.props.onEdit !== !1) {
                var Q = (function(F) {
                  var ie;
                  switch (M(F)) {
                    case "undefined":
                      ie = "undefined";
                      break;
                    case "nan":
                      ie = "NaN";
                      break;
                    case "string":
                      ie = F;
                      break;
                    case "date":
                    case "function":
                    case "regexp":
                      ie = F.toString();
                      break;
                    default:
                      try {
                        ie = JSON.stringify(F, null, "  ");
                      } catch {
                        ie = "";
                      }
                  }
                  return ie;
                })(K.value), Y = ne(Q);
                $.setState({ editMode: !0, editValue: Q, parsedInput: { type: Y.type, value: Y.value } });
              }
            }, $.getRemoveIcon = function() {
              var K = $.props, Q = K.variable, Y = K.namespace, F = K.theme, ie = K.rjvId;
              return f.a.createElement("div", { className: "click-to-remove", style: { verticalAlign: "top", display: $.state.hovered ? "inline-block" : "none" } }, f.a.createElement(ve, Object.assign({ className: "click-to-remove-icon" }, R(F, "removeVarIcon"), { onClick: function() {
                fe.dispatch({ name: "VARIABLE_REMOVED", rjvId: ie, data: { name: Q.name, namespace: Y, existing_value: Q.value, variable_removed: !0 } });
              } })));
            }, $.getValue = function(K, Q) {
              var Y = !Q && K.type, F = v($).props;
              switch (Y) {
                case !1:
                  return $.getEditInput();
                case "string":
                  return f.a.createElement(We, Object.assign({ value: K.value }, F));
                case "integer":
                  return f.a.createElement(De, Object.assign({ value: K.value }, F));
                case "float":
                  return f.a.createElement(W, Object.assign({ value: K.value }, F));
                case "boolean":
                  return f.a.createElement(B, Object.assign({ value: K.value }, F));
                case "function":
                  return f.a.createElement(me, Object.assign({ value: K.value }, F));
                case "null":
                  return f.a.createElement(Pe, F);
                case "nan":
                  return f.a.createElement(be, F);
                case "undefined":
                  return f.a.createElement(ht, F);
                case "date":
                  return f.a.createElement(J, Object.assign({ value: K.value }, F));
                case "regexp":
                  return f.a.createElement(ze, Object.assign({ value: K.value }, F));
                default:
                  return f.a.createElement("div", { className: "object-value" }, JSON.stringify(K.value));
              }
            }, $.getEditInput = function() {
              var K = $.props.theme, Q = $.state.editValue;
              return f.a.createElement("div", null, f.a.createElement(X, Object.assign({ type: "text", inputRef: function(Y) {
                return Y && Y.focus();
              }, value: Q, className: "variable-editor", onChange: function(Y) {
                var F = Y.target.value, ie = ne(F);
                $.setState({ editValue: F, parsedInput: { type: ie.type, value: ie.value } });
              }, onKeyDown: function(Y) {
                switch (Y.key) {
                  case "Escape":
                    $.setState({ editMode: !1, editValue: "" });
                    break;
                  case "Enter":
                    (Y.ctrlKey || Y.metaKey) && $.submitEdit(!0);
                }
                Y.stopPropagation();
              }, placeholder: "update this value", minRows: 2 }, R(K, "edit-input"))), f.a.createElement("div", R(K, "edit-icon-container"), f.a.createElement(ve, Object.assign({ className: "edit-cancel" }, R(K, "cancel-icon"), { onClick: function() {
                $.setState({ editMode: !1, editValue: "" });
              } })), f.a.createElement(Re, Object.assign({ className: "edit-check string-value" }, R(K, "check-icon"), { onClick: function() {
                $.submitEdit();
              } })), f.a.createElement("div", null, $.showDetected())));
            }, $.submitEdit = function(K) {
              var Q = $.props, Y = Q.variable, F = Q.namespace, ie = Q.rjvId, xe = $.state, Ne = xe.editValue, qe = xe.parsedInput, rt = Ne;
              K && qe.type && (rt = qe.value), $.setState({ editMode: !1 }), fe.dispatch({ name: "VARIABLE_UPDATED", rjvId: ie, data: { name: Y.name, namespace: F, existing_value: Y.value, new_value: rt, variable_removed: !1 } });
            }, $.showDetected = function() {
              var K = $.props, Q = K.theme, Y = (K.variable, K.namespace, K.rjvId, $.state.parsedInput), F = (Y.type, Y.value, $.getDetectedInput());
              if (F) return f.a.createElement("div", null, f.a.createElement("div", R(Q, "detected-row"), F, f.a.createElement(Re, { className: "edit-check detected", style: l({ verticalAlign: "top", paddingLeft: "3px" }, R(Q, "check-icon").style), onClick: function() {
                $.submitEdit(!0);
              } })));
            }, $.getDetectedInput = function() {
              var K = $.state.parsedInput, Q = K.type, Y = K.value, F = v($).props, ie = F.theme;
              if (Q !== !1) switch (Q.toLowerCase()) {
                case "object":
                  return f.a.createElement("span", null, f.a.createElement("span", { style: l(l({}, R(ie, "brace").style), {}, { cursor: "default" }) }, "{"), f.a.createElement("span", { style: l(l({}, R(ie, "ellipsis").style), {}, { cursor: "default" }) }, "..."), f.a.createElement("span", { style: l(l({}, R(ie, "brace").style), {}, { cursor: "default" }) }, "}"));
                case "array":
                  return f.a.createElement("span", null, f.a.createElement("span", { style: l(l({}, R(ie, "brace").style), {}, { cursor: "default" }) }, "["), f.a.createElement("span", { style: l(l({}, R(ie, "ellipsis").style), {}, { cursor: "default" }) }, "..."), f.a.createElement("span", { style: l(l({}, R(ie, "brace").style), {}, { cursor: "default" }) }, "]"));
                case "string":
                  return f.a.createElement(We, Object.assign({ value: Y }, F));
                case "integer":
                  return f.a.createElement(De, Object.assign({ value: Y }, F));
                case "float":
                  return f.a.createElement(W, Object.assign({ value: Y }, F));
                case "boolean":
                  return f.a.createElement(B, Object.assign({ value: Y }, F));
                case "function":
                  return f.a.createElement(me, Object.assign({ value: Y }, F));
                case "null":
                  return f.a.createElement(Pe, F);
                case "nan":
                  return f.a.createElement(be, F);
                case "undefined":
                  return f.a.createElement(ht, F);
                case "date":
                  return f.a.createElement(J, Object.assign({ value: new Date(Y) }, F));
              }
            }, $.state = { editMode: !1, editValue: "", hovered: !1, renameKey: !1, parsedInput: { type: !1, value: null } }, $;
          }
          return d(y, [{ key: "render", value: function() {
            var w = this, $ = this.props, K = $.variable, Q = $.singleIndent, Y = $.type, F = $.theme, ie = $.namespace, xe = $.indentWidth, Ne = $.enableClipboard, qe = $.onEdit, rt = $.onDelete, Ie = $.onSelect, nt = $.displayArrayKey, vt = $.quotesOnKeys, Oe = this.state.editMode;
            return f.a.createElement("div", Object.assign({}, R(F, "objectKeyVal", { paddingLeft: xe * Q }), { onMouseEnter: function() {
              return w.setState(l(l({}, w.state), {}, { hovered: !0 }));
            }, onMouseLeave: function() {
              return w.setState(l(l({}, w.state), {}, { hovered: !1 }));
            }, className: "variable-row", key: K.name }), Y == "array" ? nt ? f.a.createElement("span", Object.assign({}, R(F, "array-key"), { key: K.name + "_" + ie }), K.name, f.a.createElement("div", R(F, "colon"), ":")) : null : f.a.createElement("span", null, f.a.createElement("span", Object.assign({}, R(F, "object-name"), { className: "object-key", key: K.name + "_" + ie }), !!vt && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"'), f.a.createElement("span", { style: { display: "inline-block" } }, K.name), !!vt && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"')), f.a.createElement("span", R(F, "colon"), ":")), f.a.createElement("div", Object.assign({ className: "variable-value", onClick: Ie === !1 && qe === !1 ? null : function(kt) {
              var Ot = pe(ie);
              (kt.ctrlKey || kt.metaKey) && qe !== !1 ? w.prepopInput(K) : Ie !== !1 && (Ot.shift(), Ie(l(l({}, K), {}, { namespace: Ot })));
            } }, R(F, "variableValue", { cursor: Ie === !1 ? "default" : "pointer" })), this.getValue(K, Oe)), Ne ? f.a.createElement(ct, { rowHovered: this.state.hovered, hidden: Oe, src: K.value, clickCallback: Ne, theme: F, namespace: [].concat(pe(ie), [K.name]) }) : null, qe !== !1 && Oe == 0 ? this.getEditIcon() : null, rt !== !1 && Oe == 0 ? this.getRemoveIcon() : null);
          } }]), y;
        })(f.a.PureComponent), Ke = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            var w;
            u(this, y);
            for (var $ = arguments.length, K = new Array($), Q = 0; Q < $; Q++) K[Q] = arguments[Q];
            return (w = P.call.apply(P, [this].concat(K))).getObjectSize = function() {
              var Y = w.props, F = Y.size, ie = Y.theme;
              if (Y.displayObjectSize) return f.a.createElement("span", Object.assign({ className: "object-size" }, R(ie, "object-size")), F, " item", F === 1 ? "" : "s");
            }, w.getAddAttribute = function(Y) {
              var F = w.props, ie = F.theme, xe = F.namespace, Ne = F.name, qe = F.src, rt = F.rjvId, Ie = F.depth;
              return f.a.createElement("span", { className: "click-to-add", style: { verticalAlign: "top", display: Y ? "inline-block" : "none" } }, f.a.createElement(Me, Object.assign({ className: "click-to-add-icon" }, R(ie, "addVarIcon"), { onClick: function() {
                var nt = { name: Ie > 0 ? Ne : null, namespace: xe.splice(0, xe.length - 1), existing_value: qe, variable_removed: !1, key_name: null };
                M(qe) === "object" ? fe.dispatch({ name: "ADD_VARIABLE_KEY_REQUEST", rjvId: rt, data: nt }) : fe.dispatch({ name: "VARIABLE_ADDED", rjvId: rt, data: l(l({}, nt), {}, { new_value: [].concat(pe(qe), [null]) }) });
              } })));
            }, w.getRemoveObject = function(Y) {
              var F = w.props, ie = F.theme, xe = (F.hover, F.namespace), Ne = F.name, qe = F.src, rt = F.rjvId;
              if (xe.length !== 1) return f.a.createElement("span", { className: "click-to-remove", style: { display: Y ? "inline-block" : "none" } }, f.a.createElement(ve, Object.assign({ className: "click-to-remove-icon" }, R(ie, "removeVarIcon"), { onClick: function() {
                fe.dispatch({ name: "VARIABLE_REMOVED", rjvId: rt, data: { name: Ne, namespace: xe.splice(0, xe.length - 1), existing_value: qe, variable_removed: !0 } });
              } })));
            }, w.render = function() {
              var Y = w.props, F = Y.theme, ie = Y.onDelete, xe = Y.onAdd, Ne = Y.enableClipboard, qe = Y.src, rt = Y.namespace, Ie = Y.rowHovered;
              return f.a.createElement("div", Object.assign({}, R(F, "object-meta-data"), { className: "object-meta-data", onClick: function(nt) {
                nt.stopPropagation();
              } }), w.getObjectSize(), Ne ? f.a.createElement(ct, { rowHovered: Ie, clickCallback: Ne, src: qe, theme: F, namespace: rt }) : null, xe !== !1 ? w.getAddAttribute(Ie) : null, ie !== !1 ? w.getRemoveObject(Ie) : null);
            }, w;
          }
          return y;
        })(f.a.PureComponent);
        function Fe(O) {
          var P = O.parent_type, y = O.namespace, w = O.quotesOnKeys, $ = O.theme, K = O.jsvRoot, Q = O.name, Y = O.displayArrayKey, F = O.name ? O.name : "";
          return !K || Q !== !1 && Q !== null ? P == "array" ? Y ? f.a.createElement("span", Object.assign({}, R($, "array-key"), { key: y }), f.a.createElement("span", { className: "array-key" }, F), f.a.createElement("span", R($, "colon"), ":")) : f.a.createElement("span", null) : f.a.createElement("span", Object.assign({}, R($, "object-name"), { key: y }), f.a.createElement("span", { className: "object-key" }, w && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"'), f.a.createElement("span", null, F), w && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"')), f.a.createElement("span", R($, "colon"), ":")) : f.a.createElement("span", null);
        }
        function pt(O) {
          var P = O.theme;
          switch (O.iconStyle) {
            case "triangle":
              return f.a.createElement(Ee, Object.assign({}, R(P, "expanded-icon"), { className: "expanded-icon" }));
            case "square":
              return f.a.createElement(_e, Object.assign({}, R(P, "expanded-icon"), { className: "expanded-icon" }));
            default:
              return f.a.createElement($e, Object.assign({}, R(P, "expanded-icon"), { className: "expanded-icon" }));
          }
        }
        function Mt(O) {
          var P = O.theme;
          switch (O.iconStyle) {
            case "triangle":
              return f.a.createElement(Je, Object.assign({}, R(P, "collapsed-icon"), { className: "collapsed-icon" }));
            case "square":
              return f.a.createElement(Xe, Object.assign({}, R(P, "collapsed-icon"), { className: "collapsed-icon" }));
            default:
              return f.a.createElement(ke, Object.assign({}, R(P, "collapsed-icon"), { className: "collapsed-icon" }));
          }
        }
        var It = (function(O) {
          h(y, O);
          var P = T(y);
          function y(w) {
            var $;
            return u(this, y), ($ = P.call(this, w)).toggleCollapsed = function(K) {
              var Q = [];
              for (var Y in $.state.expanded) Q.push($.state.expanded[Y]);
              Q[K] = !Q[K], $.setState({ expanded: Q });
            }, $.state = { expanded: [] }, $;
          }
          return d(y, [{ key: "getExpandedIcon", value: function(w) {
            var $ = this.props, K = $.theme, Q = $.iconStyle;
            return this.state.expanded[w] ? f.a.createElement(pt, { theme: K, iconStyle: Q }) : f.a.createElement(Mt, { theme: K, iconStyle: Q });
          } }, { key: "render", value: function() {
            var w = this, $ = this.props, K = $.src, Q = $.groupArraysAfterLength, Y = ($.depth, $.name), F = $.theme, ie = $.jsvRoot, xe = $.namespace, Ne = ($.parent_type, j($, ["src", "groupArraysAfterLength", "depth", "name", "theme", "jsvRoot", "namespace", "parent_type"])), qe = 0, rt = 5 * this.props.indentWidth;
            ie || (qe = 5 * this.props.indentWidth);
            var Ie = Q, nt = Math.ceil(K.length / Ie);
            return f.a.createElement("div", Object.assign({ className: "object-key-val" }, R(F, ie ? "jsv-root" : "objectKeyVal", { paddingLeft: qe })), f.a.createElement(Fe, this.props), f.a.createElement("span", null, f.a.createElement(Ke, Object.assign({ size: K.length }, this.props))), pe(Array(nt)).map((function(vt, Oe) {
              return f.a.createElement("div", Object.assign({ key: Oe, className: "object-key-val array-group" }, R(F, "objectKeyVal", { marginLeft: 6, paddingLeft: rt })), f.a.createElement("span", R(F, "brace-row"), f.a.createElement("div", Object.assign({ className: "icon-container" }, R(F, "icon-container"), { onClick: function(kt) {
                w.toggleCollapsed(Oe);
              } }), w.getExpandedIcon(Oe)), w.state.expanded[Oe] ? f.a.createElement(zr, Object.assign({ key: Y + Oe, depth: 0, name: !1, collapsed: !1, groupArraysAfterLength: Ie, index_offset: Oe * Ie, src: K.slice(Oe * Ie, Oe * Ie + Ie), namespace: xe, type: "array", parent_type: "array_group", theme: F }, Ne)) : f.a.createElement("span", Object.assign({}, R(F, "brace"), { onClick: function(kt) {
                w.toggleCollapsed(Oe);
              }, className: "array-group-brace" }), "[", f.a.createElement("div", Object.assign({}, R(F, "array-group-meta-data"), { className: "array-group-meta-data" }), f.a.createElement("span", Object.assign({ className: "object-size" }, R(F, "object-size")), Oe * Ie, " - ", Oe * Ie + Ie > K.length ? K.length : Oe * Ie + Ie)), "]")));
            })));
          } }]), y;
        })(f.a.PureComponent), Er = (function(O) {
          h(y, O);
          var P = T(y);
          function y(w) {
            var $;
            u(this, y), ($ = P.call(this, w)).toggleCollapsed = function() {
              $.setState({ expanded: !$.state.expanded }, (function() {
                ue.set($.props.rjvId, $.props.namespace, "expanded", $.state.expanded);
              }));
            }, $.getObjectContent = function(Q, Y, F) {
              return f.a.createElement("div", { className: "pushed-content object-container" }, f.a.createElement("div", Object.assign({ className: "object-content" }, R($.props.theme, "pushed-content")), $.renderObjectContents(Y, F)));
            }, $.getEllipsis = function() {
              return $.state.size === 0 ? null : f.a.createElement("div", Object.assign({}, R($.props.theme, "ellipsis"), { className: "node-ellipsis", onClick: $.toggleCollapsed }), "...");
            }, $.getObjectMetaData = function(Q) {
              var Y = $.props, F = (Y.rjvId, Y.theme, $.state), ie = F.size, xe = F.hovered;
              return f.a.createElement(Ke, Object.assign({ rowHovered: xe, size: ie }, $.props));
            }, $.renderObjectContents = function(Q, Y) {
              var F, ie = $.props, xe = ie.depth, Ne = ie.parent_type, qe = ie.index_offset, rt = ie.groupArraysAfterLength, Ie = ie.namespace, nt = $.state.object_type, vt = [], Oe = Object.keys(Q || {});
              return $.props.sortKeys && nt !== "array" && (Oe = Oe.sort()), Oe.forEach((function(kt) {
                if (F = new io(kt, Q[kt]), Ne === "array_group" && qe && (F.name = parseInt(F.name) + qe), Q.hasOwnProperty(kt)) if (F.type === "object") vt.push(f.a.createElement(zr, Object.assign({ key: F.name, depth: xe + 1, name: F.name, src: F.value, namespace: Ie.concat(F.name), parent_type: nt }, Y)));
                else if (F.type === "array") {
                  var Ot = zr;
                  rt && F.value.length > rt && (Ot = It), vt.push(f.a.createElement(Ot, Object.assign({ key: F.name, depth: xe + 1, name: F.name, src: F.value, namespace: Ie.concat(F.name), type: "array", parent_type: nt }, Y)));
                } else vt.push(f.a.createElement(Qe, Object.assign({ key: F.name + "_" + Ie, variable: F, singleIndent: 5, namespace: Ie, type: $.props.type }, Y)));
              })), vt;
            };
            var K = y.getState(w);
            return $.state = l(l({}, K), {}, { prevProps: {} }), $;
          }
          return d(y, [{ key: "getBraceStart", value: function(w, $) {
            var K = this, Q = this.props, Y = Q.src, F = Q.theme, ie = Q.iconStyle;
            if (Q.parent_type === "array_group") return f.a.createElement("span", null, f.a.createElement("span", R(F, "brace"), w === "array" ? "[" : "{"), $ ? this.getObjectMetaData(Y) : null);
            var xe = $ ? pt : Mt;
            return f.a.createElement("span", null, f.a.createElement("span", Object.assign({ onClick: function(Ne) {
              K.toggleCollapsed();
            } }, R(F, "brace-row")), f.a.createElement("div", Object.assign({ className: "icon-container" }, R(F, "icon-container")), f.a.createElement(xe, { theme: F, iconStyle: ie })), f.a.createElement(Fe, this.props), f.a.createElement("span", R(F, "brace"), w === "array" ? "[" : "{")), $ ? this.getObjectMetaData(Y) : null);
          } }, { key: "render", value: function() {
            var w = this, $ = this.props, K = $.depth, Q = $.src, Y = ($.namespace, $.name, $.type, $.parent_type), F = $.theme, ie = $.jsvRoot, xe = $.iconStyle, Ne = j($, ["depth", "src", "namespace", "name", "type", "parent_type", "theme", "jsvRoot", "iconStyle"]), qe = this.state, rt = qe.object_type, Ie = qe.expanded, nt = {};
            return ie || Y === "array_group" ? Y === "array_group" && (nt.borderLeft = 0, nt.display = "inline") : nt.paddingLeft = 5 * this.props.indentWidth, f.a.createElement("div", Object.assign({ className: "object-key-val", onMouseEnter: function() {
              return w.setState(l(l({}, w.state), {}, { hovered: !0 }));
            }, onMouseLeave: function() {
              return w.setState(l(l({}, w.state), {}, { hovered: !1 }));
            } }, R(F, ie ? "jsv-root" : "objectKeyVal", nt)), this.getBraceStart(rt, Ie), Ie ? this.getObjectContent(K, Q, l({ theme: F, iconStyle: xe }, Ne)) : this.getEllipsis(), f.a.createElement("span", { className: "brace-row" }, f.a.createElement("span", { style: l(l({}, R(F, "brace").style), {}, { paddingLeft: Ie ? "3px" : "0px" }) }, rt === "array" ? "]" : "}"), Ie ? null : this.getObjectMetaData(Q)));
          } }], [{ key: "getDerivedStateFromProps", value: function(w, $) {
            var K = $.prevProps;
            return w.src !== K.src || w.collapsed !== K.collapsed || w.name !== K.name || w.namespace !== K.namespace || w.rjvId !== K.rjvId ? l(l({}, y.getState(w)), {}, { prevProps: w }) : null;
          } }]), y;
        })(f.a.PureComponent);
        Er.getState = function(O) {
          var P = Object.keys(O.src).length, y = (O.collapsed === !1 || O.collapsed !== !0 && O.collapsed > O.depth) && (!O.shouldCollapse || O.shouldCollapse({ name: O.name, src: O.src, type: M(O.src), namespace: O.namespace }) === !1) && P !== 0;
          return { expanded: ue.get(O.rjvId, O.namespace, "expanded", y), object_type: O.type === "array" ? "array" : "object", parent_type: O.type === "array" ? "array" : "object", size: P, hovered: !1 };
        };
        var io = function O(P, y) {
          u(this, O), this.name = P, this.value = y, this.type = M(y);
        };
        V(Er);
        var zr = Er, so = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            var w;
            u(this, y);
            for (var $ = arguments.length, K = new Array($), Q = 0; Q < $; Q++) K[Q] = arguments[Q];
            return (w = P.call.apply(P, [this].concat(K))).render = function() {
              var Y = v(w).props, F = [Y.name], ie = zr;
              return Array.isArray(Y.src) && Y.groupArraysAfterLength && Y.src.length > Y.groupArraysAfterLength && (ie = It), f.a.createElement("div", { className: "pretty-json-container object-container" }, f.a.createElement("div", { className: "object-content" }, f.a.createElement(ie, Object.assign({ namespace: F, depth: 0, jsvRoot: !0 }, Y))));
            }, w;
          }
          return y;
        })(f.a.PureComponent), lo = (function(O) {
          h(y, O);
          var P = T(y);
          function y(w) {
            var $;
            return u(this, y), ($ = P.call(this, w)).closeModal = function() {
              fe.dispatch({ rjvId: $.props.rjvId, name: "RESET" });
            }, $.submit = function() {
              $.props.submit($.state.input);
            }, $.state = { input: w.input ? w.input : "" }, $;
          }
          return d(y, [{ key: "render", value: function() {
            var w = this, $ = this.props, K = $.theme, Q = $.rjvId, Y = $.isValid, F = this.state.input, ie = Y(F);
            return f.a.createElement("div", Object.assign({ className: "key-modal-request" }, R(K, "key-modal-request"), { onClick: this.closeModal }), f.a.createElement("div", Object.assign({}, R(K, "key-modal"), { onClick: function(xe) {
              xe.stopPropagation();
            } }), f.a.createElement("div", R(K, "key-modal-label"), "Key Name:"), f.a.createElement("div", { style: { position: "relative" } }, f.a.createElement("input", Object.assign({}, R(K, "key-modal-input"), { className: "key-modal-input", ref: function(xe) {
              return xe && xe.focus();
            }, spellCheck: !1, value: F, placeholder: "...", onChange: function(xe) {
              w.setState({ input: xe.target.value });
            }, onKeyPress: function(xe) {
              ie && xe.key === "Enter" ? w.submit() : xe.key === "Escape" && w.closeModal();
            } })), ie ? f.a.createElement(Re, Object.assign({}, R(K, "key-modal-submit"), { className: "key-modal-submit", onClick: function(xe) {
              return w.submit();
            } })) : null), f.a.createElement("span", R(K, "key-modal-cancel"), f.a.createElement(Be, Object.assign({}, R(K, "key-modal-cancel-icon"), { className: "key-modal-cancel", onClick: function() {
              fe.dispatch({ rjvId: Q, name: "RESET" });
            } })))));
          } }]), y;
        })(f.a.PureComponent), qt = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            var w;
            u(this, y);
            for (var $ = arguments.length, K = new Array($), Q = 0; Q < $; Q++) K[Q] = arguments[Q];
            return (w = P.call.apply(P, [this].concat(K))).isValid = function(Y) {
              var F = w.props.rjvId, ie = ue.get(F, "action", "new-key-request");
              return Y != "" && Object.keys(ie.existing_value).indexOf(Y) === -1;
            }, w.submit = function(Y) {
              var F = w.props.rjvId, ie = ue.get(F, "action", "new-key-request");
              ie.new_value = l({}, ie.existing_value), ie.new_value[Y] = w.props.defaultValue, fe.dispatch({ name: "VARIABLE_ADDED", rjvId: F, data: ie });
            }, w;
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.active, K = w.theme, Q = w.rjvId;
            return $ ? f.a.createElement(lo, { rjvId: Q, theme: K, isValid: this.isValid, submit: this.submit }) : null;
          } }]), y;
        })(f.a.PureComponent), co = (function(O) {
          h(y, O);
          var P = T(y);
          function y() {
            return u(this, y), P.apply(this, arguments);
          }
          return d(y, [{ key: "render", value: function() {
            var w = this.props, $ = w.message, K = w.active, Q = w.theme, Y = w.rjvId;
            return K ? f.a.createElement("div", Object.assign({ className: "validation-failure" }, R(Q, "validation-failure"), { onClick: function() {
              fe.dispatch({ rjvId: Y, name: "RESET" });
            } }), f.a.createElement("span", R(Q, "validation-failure-label"), $), f.a.createElement(Be, R(Q, "validation-failure-clear"))) : null;
          } }]), y;
        })(f.a.PureComponent), Wr = (function(O) {
          h(y, O);
          var P = T(y);
          function y(w) {
            var $;
            return u(this, y), ($ = P.call(this, w)).rjvId = Date.now().toString(), $.getListeners = function() {
              return { reset: $.resetState, "variable-update": $.updateSrc, "add-key-request": $.addKeyRequest };
            }, $.updateSrc = function() {
              var K, Q = ue.get($.rjvId, "action", "variable-update"), Y = Q.name, F = Q.namespace, ie = Q.new_value, xe = Q.existing_value, Ne = (Q.variable_removed, Q.updated_src), qe = Q.type, rt = $.props, Ie = rt.onEdit, nt = rt.onDelete, vt = rt.onAdd, Oe = { existing_src: $.state.src, new_value: ie, updated_src: Ne, name: Y, namespace: F, existing_value: xe };
              switch (qe) {
                case "variable-added":
                  K = vt(Oe);
                  break;
                case "variable-edited":
                  K = Ie(Oe);
                  break;
                case "variable-removed":
                  K = nt(Oe);
              }
              K !== !1 ? (ue.set($.rjvId, "global", "src", Ne), $.setState({ src: Ne })) : $.setState({ validationFailure: !0 });
            }, $.addKeyRequest = function() {
              $.setState({ addKeyRequest: !0 });
            }, $.resetState = function() {
              $.setState({ validationFailure: !1, addKeyRequest: !1 });
            }, $.state = { addKeyRequest: !1, editKeyRequest: !1, validationFailure: !1, src: y.defaultProps.src, name: y.defaultProps.name, theme: y.defaultProps.theme, validationMessage: y.defaultProps.validationMessage, prevSrc: y.defaultProps.src, prevName: y.defaultProps.name, prevTheme: y.defaultProps.theme }, $;
          }
          return d(y, [{ key: "componentDidMount", value: function() {
            ue.set(this.rjvId, "global", "src", this.state.src);
            var w = this.getListeners();
            for (var $ in w) ue.on($ + "-" + this.rjvId, w[$]);
            this.setState({ addKeyRequest: !1, editKeyRequest: !1 });
          } }, { key: "componentDidUpdate", value: function(w, $) {
            $.addKeyRequest !== !1 && this.setState({ addKeyRequest: !1 }), $.editKeyRequest !== !1 && this.setState({ editKeyRequest: !1 }), w.src !== this.state.src && ue.set(this.rjvId, "global", "src", this.state.src);
          } }, { key: "componentWillUnmount", value: function() {
            var w = this.getListeners();
            for (var $ in w) ue.removeListener($ + "-" + this.rjvId, w[$]);
          } }, { key: "render", value: function() {
            var w = this.state, $ = w.validationFailure, K = w.validationMessage, Q = w.addKeyRequest, Y = w.theme, F = w.src, ie = w.name, xe = this.props, Ne = xe.style, qe = xe.defaultValue;
            return f.a.createElement("div", { className: "react-json-view", style: l(l({}, R(Y, "app-container").style), Ne) }, f.a.createElement(co, { message: K, active: $, theme: Y, rjvId: this.rjvId }), f.a.createElement(so, Object.assign({}, this.props, { src: F, name: ie, theme: Y, type: M(F), rjvId: this.rjvId })), f.a.createElement(qt, { active: Q, theme: Y, rjvId: this.rjvId, defaultValue: qe }));
          } }], [{ key: "getDerivedStateFromProps", value: function(w, $) {
            if (w.src !== $.prevSrc || w.name !== $.prevName || w.theme !== $.prevTheme) {
              var K = { src: w.src, name: w.name, theme: w.theme, validationMessage: w.validationMessage, prevSrc: w.src, prevName: w.name, prevTheme: w.theme };
              return y.validateState(K);
            }
            return null;
          } }]), y;
        })(f.a.PureComponent);
        Wr.defaultProps = { src: {}, name: "root", theme: "rjv-default", collapsed: !1, collapseStringsAfterLength: !1, shouldCollapse: !1, sortKeys: !1, quotesOnKeys: !0, groupArraysAfterLength: 100, indentWidth: 4, enableClipboard: !0, displayObjectSize: !0, displayDataTypes: !0, onEdit: !1, onDelete: !1, onAdd: !1, onSelect: !1, iconStyle: "triangle", style: {}, validationMessage: "Validation Error", defaultValue: null, displayArrayKey: !0 }, Wr.validateState = function(O) {
          var P = {};
          return M(O.theme) !== "object" || (function(y) {
            var w = ["base00", "base01", "base02", "base03", "base04", "base05", "base06", "base07", "base08", "base09", "base0A", "base0B", "base0C", "base0D", "base0E", "base0F"];
            if (M(y) === "object") {
              for (var $ = 0; $ < w.length; $++) if (!(w[$] in y)) return !1;
              return !0;
            }
            return !1;
          })(O.theme) || (console.error("react-json-view error:", "theme prop must be a theme name or valid base-16 theme object.", 'defaulting to "rjv-default" theme'), P.theme = "rjv-default"), M(O.src) !== "object" && M(O.src) !== "array" && (console.error("react-json-view error:", "src property must be a valid json object"), P.name = "ERROR", P.src = { message: "src property must be a valid json object" }), l(l({}, O), P);
        }, V(Wr), n.default = Wr;
      }]);
    }));
  })(va)), va.exports;
}
var nb = rb();
const ab = /* @__PURE__ */ wr(nb);
function ob(e) {
  const { maxHeight: t = "initial" } = e;
  return /* @__PURE__ */ q.jsx(Ce, { maxHeight: t, overflow: "auto", width: "100%", children: /* @__PURE__ */ q.jsx(ab, { ...e }) });
}
const bi = rr(/* @__PURE__ */ _.createElement("path", {
  d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
})), Kc = rr(/* @__PURE__ */ _.createElement("path", {
  d: "M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91c.48.22 1.05.34 1.7.34.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
})), ib = rr(/* @__PURE__ */ _.createElement("path", {
  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
})), sb = rr(/* @__PURE__ */ _.createElement("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
})), lb = rr(/* @__PURE__ */ _.createElement("path", {
  d: "M8 5v14l11-7z"
})), cb = rr(/* @__PURE__ */ _.createElement("path", {
  d: "M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"
})), ub = rr(/* @__PURE__ */ _.createElement("path", {
  d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
})), db = "Message", qc = (e) => (e == null ? void 0 : e.replace(/\s/g, " ")) ?? "";
function fb(e) {
  const { title: t, value: a } = e, r = Hc(), o = (() => {
    switch (typeof a) {
      case "string":
        return qc(a);
      case "number":
      case "boolean":
      case "bigint":
        return a.toString();
      case "object":
        return a ? /* @__PURE__ */ q.jsx(
          ob,
          {
            displayDataTypes: !1,
            displayObjectSize: !1,
            shouldCollapse: !1,
            src: a,
            maxHeight: "100%",
            name: !1,
            enableClipboard: !1
          }
        ) : null;
      default:
        return "";
    }
  })();
  return !o || t === "randomKey" || t === "isNewLog" || t === "traceAvailable" || t === "displayTimeStamp" || t === "apiName" || !t ? null : /* @__PURE__ */ q.jsxs("div", { className: r.expandedLogRow, children: [
    /* @__PURE__ */ q.jsx("span", { className: r.expandedLogKey, children: t }),
    /* @__PURE__ */ q.jsx("span", { children: o })
  ] });
}
function pb(e) {
  var m;
  const {
    logEntry: t,
    timeZone: a,
    onCopy: r,
    getColor: n,
    isHeiglighted: o,
    isExpanded: i,
    isExpandable: s
  } = e, l = Hc(), u = "Copy", c = "Copy Selection", d = (v) => {
    const C = parseInt(v, 10);
    return C >= 200 && C < 300 ? l.infoLogs : C >= 300 && C < 400 ? l.warnLogs : C >= 400 && C < 600 ? l.errorLogs : l.logOther;
  }, p = (v) => {
    const C = v.toUpperCase();
    return C === X0 ? l.infoLogs : C === J0 ? l.warningLogs : C === Z0 || C === Q0 ? l.errorLogs : C === eb ? l.infoLogs : d(C);
  }, h = () => {
    r(t);
  }, g = (v) => {
    v.preventDefault(), v.stopPropagation();
  };
  return /* @__PURE__ */ q.jsxs("div", { children: [
    /* @__PURE__ */ q.jsxs(
      "div",
      {
        className: ge(l.defaultLogLine, {
          [l.highlightedLogLine]: t.isNewLog && !o,
          [l.selectedLogLine]: o,
          [l.whiteBackground]: !(o || t.isNewLog)
        }),
        "data-testid": "log-panel-entry",
        children: [
          s ? /* @__PURE__ */ q.jsx("div", { className: l.arrow, children: i ? /* @__PURE__ */ q.jsx(bi, { fontSize: "inherit", rotate: 90 }) : /* @__PURE__ */ q.jsx(bi, { fontSize: "inherit" }) }) : /* @__PURE__ */ q.jsx("div", { className: l.arrow }),
          /* @__PURE__ */ q.jsxs("div", { className: l.logLineWrapper, children: [
            /* @__PURE__ */ q.jsxs("span", { className: l.infoSection, children: [
              /* @__PURE__ */ q.jsxs(
                "span",
                {
                  className: ge(
                    p(Y0),
                    l.toolTipParent
                  ),
                  children: [
                    G0(new Date(t.timestamp), a),
                    " "
                  ]
                }
              ),
              (t == null ? void 0 : t.message) && /* @__PURE__ */ q.jsxs(
                "span",
                {
                  className: ge(
                    (m = t == null ? void 0 : t.message) != null && m.includes("Error") ? l.errorLogs : n(t == null ? void 0 : t.message),
                    l.toolTipParent
                  ),
                  children: [
                    t == null ? void 0 : t.message,
                    " ",
                    /* @__PURE__ */ q.jsx("span", { className: l.toolTipChild, children: db })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ q.jsx("span", { className: l.logMsg, children: /* @__PURE__ */ q.jsx(
              "span",
              {
                className: ge(
                  l.disableUserSelect,
                  l.logEntryActions
                ),
                children: /* @__PURE__ */ q.jsx("span", { className: l.actionContainer, children: /* @__PURE__ */ q.jsxs(
                  "button",
                  {
                    onClick: (v) => {
                      g(v), h();
                    },
                    onMouseDown: g,
                    onMouseUp: g,
                    onMouseEnter: g,
                    type: "button",
                    className: l.actionButton,
                    children: [
                      /* @__PURE__ */ q.jsx(Kc, { className: l.actionIcon }),
                      /* @__PURE__ */ q.jsx("span", { className: l.actionLabel, children: o ? c : u })
                    ]
                  }
                ) })
              }
            ) })
          ] })
        ]
      },
      t.randomKey
    ),
    i && /* @__PURE__ */ q.jsx("div", { className: l.tableContainer, children: Object.entries(t).map(([v, C]) => /* @__PURE__ */ q.jsx(
      fb,
      {
        title: v,
        value: v === "logLine" ? qc(String(C ?? "")) : C
      },
      v
    )) })
  ] });
}
/*! clipboard-copy. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var Wo, hl;
function hb() {
  if (hl) return Wo;
  hl = 1, Wo = r;
  function e() {
    return new DOMException("The request is not allowed", "NotAllowedError");
  }
  async function t(n) {
    if (!navigator.clipboard)
      throw e();
    return navigator.clipboard.writeText(n);
  }
  async function a(n) {
    const o = document.createElement("span");
    o.textContent = n, o.style.whiteSpace = "pre", o.style.webkitUserSelect = "auto", o.style.userSelect = "all", document.body.appendChild(o);
    const i = window.getSelection(), s = window.document.createRange();
    i.removeAllRanges(), s.selectNode(o), i.addRange(s);
    let l = !1;
    try {
      l = window.document.execCommand("copy");
    } finally {
      i.removeAllRanges(), window.document.body.removeChild(o);
    }
    if (!l) throw e();
  }
  async function r(n) {
    try {
      await t(n);
    } catch (o) {
      try {
        await a(n);
      } catch (i) {
        throw i || o || e();
      }
    }
  }
  return Wo;
}
var mb = hb();
const Uc = /* @__PURE__ */ wr(mb), Ui = tr(
  (e) => cr({
    topicContainer: {
      width: "90%",
      marginTop: e.spacing(2),
      marginBottom: e.spacing(2),
      marginLeft: e.spacing(1),
      borderBottom: 0
    },
    topicTypeContainer: {
      height: e.spacing(3),
      display: "flex"
    },
    typeChipContainer: {
      display: "flex",
      height: e.spacing(3),
      marginRight: e.spacing(1),
      alignItems: "center"
    },
    endpointContainer: {
      display: "flex",
      width: "100%",
      padding: e.spacing(1, 1),
      border: 1,
      borderBottom: `1px solid ${e.palette.grey[200]}`,
      gap: e.spacing(1),
      marginRight: e.spacing(1)
    },
    textInput: {
      width: "88%",
      backgroundColor: "#f5f5f5"
    },
    payloadText: {
      borderTop: 1,
      height: e.spacing(5),
      marginLeft: e.spacing(1)
    },
    tabs: {
      padding: e.spacing(1, 1.5),
      marginLeft: e.spacing(1)
    },
    payloadContainer: {
      display: "flex",
      flexDirection: "column",
      height: e.spacing(15),
      borderRadius: "none",
      marginBottom: e.spacing(2),
      marginLeft: e.spacing(1)
    },
    sendIcon: {
      marginLeft: e.spacing(0),
      marginBottom: e.spacing(2)
    },
    parameterContainerWrapper: {
      width: "100%",
      height: e.spacing(27.5),
      overflow: "scroll"
    },
    parameterContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: e.spacing(1),
      width: "100%",
      height: e.spacing(22),
      borderRadius: "none",
      overflow: "scroll"
    },
    paramTextInput: {
      size: "small",
      width: e.spacing(30)
    },
    apiTokenTextInput: {
      size: "small",
      width: "80%"
    },
    executeButton: {
      marginLeft: e.spacing(0),
      marginBottom: e.spacing(1)
    },
    outputConsoleContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: e.spacing(1, 2),
      alignItems: "center",
      borderTop: `1px solid ${e.palette.grey[200]}`
    },
    outputContainer: {
      height: e.spacing(20),
      overflow: "scroll",
      borderTop: `1px solid ${e.palette.grey[200]}`,
      borderBottomRightRadius: e.spacing(1),
      borderBottomLeftRadius: e.spacing(1)
    },
    logColor1: {
      color: "#745BCC"
    },
    logColor2: {
      color: "#2366CC"
    },
    logColor3: {
      color: "#2366CC"
    },
    logColor4: {
      color: "#0095ff"
    },
    logColor5: {
      color: "#f8c2c2"
    },
    editorContainer: {
      display: "flex",
      width: "100%",
      overflowY: "auto",
      position: "absolute",
      "& .react-monaco-editor-container": {
        "& .monaco-editor": {
          "& .monaco-scrollable-element": {
            left: "0 !important"
          }
        }
      }
    },
    copyButton: {
      marginRight: e.spacing(1)
    }
  })
), gb = tr(
  (e) => cr({
    commons: {
      boxShadow: `0 1px 2px  ${Le(e.palette.common.black, 0.15)}`,
      borderRadius: 5,
      color: e.palette.common.white,
      padding: e.spacing(0.875, 2),
      gap: e.spacing(1),
      fontWeight: 400,
      fontSize: e.spacing(1.625),
      lineHeight: `${e.spacing(3)}px`,
      "&$disabled": {
        color: e.palette.common.white
      },
      "& $startIcon": {
        "& *:first-child": {
          fontSize: e.spacing(2)
        },
        "&$startIconSmall": {
          "& *:first-child": {
            fontSize: e.spacing(1.75)
          }
        },
        "&$startIconTiny": {
          "& *:first-child": {
            fontSize: e.spacing(1.5)
          }
        }
      },
      "& $endIcon": {
        "& *:first-child": {
          fontSize: e.spacing(2)
        },
        "&$endIconSmall": {
          "& *:first-child": {
            fontSize: e.spacing(1.75)
          }
        },
        "&$endIconTiny": {
          "& *:first-child": {
            fontSize: e.spacing(1.5)
          }
        }
      }
    },
    contained: {
      border: "1px solid transparent",
      "&:hover": {
        boxShadow: `0 1px 3px ${Le(e.palette.common.black, 0.1)}`
      },
      "&:focus": {
        boxShadow: `0 1px 6px 2px ${Le(e.palette.common.black, 0.1)}`
      }
    },
    outlined: {
      backgroundColor: "transparent",
      boxShadow: `0 1px 2px ${Le(e.palette.common.black, 0.05)}`,
      "&:hover, &:focus": {
        backgroundColor: "transparent",
        boxShadow: `0 1px 6px 2px ${Le(e.palette.common.black, 0.1)}`
      }
    },
    fullWidth: { width: "100%" },
    text: {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none"
    },
    subtle: {
      border: `1px solid ${e.palette.grey[100]}`,
      boxShadow: `0 1px 3px ${Le(e.palette.common.black, 0.05)}`,
      backgroundColor: "#E5E4E2",
      "&:hover": {
        backgroundColor: "#E5E4E2",
        boxShadow: `0 1px 3px ${Le(e.palette.common.black, 0.1)}`
      },
      "&:focus": {
        backgroundColor: "#E5E4E2",
        boxShadow: "none"
      }
    },
    link: {
      borderColor: "transparent",
      boxShadow: "none",
      paddingLeft: 0,
      paddingRight: 0,
      minWidth: "initial",
      backgroundColor: "transparent",
      "& $startIcon": {
        marginLeft: 0
      },
      "& $endIcon": {
        marginRight: 0
      },
      "&:hover": {
        opacity: 0.6
      },
      "&:hover, &:focus": {
        backgroundColor: "transparent",
        boxShadow: "none"
      }
    },
    primaryContained: {
      backgroundColor: e.palette.primary.main,
      borderColor: e.palette.primary.main,
      "&:hover": {
        backgroundColor: e.palette.primary.dark,
        borderColor: e.palette.primary.dark
      }
    },
    primaryText: {
      color: e.palette.primary.main,
      "&$disabled": {
        color: e.palette.primary.main
      }
    },
    primaryOutlined: {
      color: e.palette.primary.main,
      border: `1px solid ${e.palette.primary.main}`,
      boxShadow: `0 1px 2px  ${Le(e.palette.common.black, 0.05)}`,
      "&$disabled": {
        color: e.palette.primary.main
      }
    },
    primarySubtle: {
      color: e.palette.primary.main,
      "&$disabled": {
        color: e.palette.primary.main
      }
    },
    primaryLink: {
      color: e.palette.primary.main,
      borderColor: "transparent",
      boxShadow: "none",
      "&$disabled": {
        color: e.palette.primary.main,
        borderColor: "transparent",
        boxShadow: "none"
      }
    },
    secondaryContained: {
      backgroundColor: "#E5E4E2",
      color: e.palette.common.black,
      border: `1px solid ${e.palette.grey[100]}`,
      boxShadow: `0 1px 2px ${Le(e.palette.common.black, 0.05)}`,
      "&:hover": {
        backgroundColor: "#E5E4E2",
        color: e.palette.common.black
      },
      "&$disabled": {
        color: e.palette.common.black
      }
    },
    secondaryText: {
      color: e.palette.common.black,
      "&$disabled": {
        color: e.palette.common.black
      }
    },
    secondaryOutlined: {
      color: e.palette.secondary.main,
      border: `1px solid ${e.palette.secondary.main}`,
      "&:hover": {
        borderColor: e.palette.secondary.dark
      },
      "&$disabled": {
        color: e.palette.secondary.main
      }
    },
    secondarySubtle: {
      color: e.palette.common.black,
      "&$disabled": {
        color: e.palette.common.black
      }
    },
    secondaryLink: {
      color: e.palette.common.black,
      borderColor: "transparent",
      boxShadow: "none",
      "&$disabled": {
        color: e.palette.common.black,
        borderColor: "transparent",
        boxShadow: "none"
      }
    },
    errorContained: {
      backgroundColor: e.palette.error.main,
      borderColor: e.palette.error.main,
      "&:hover": {
        backgroundColor: e.palette.error.dark,
        borderColor: e.palette.error.dark
      }
    },
    errorOutlined: {
      color: e.palette.error.main,
      border: `1px solid ${e.palette.error.main}`,
      "&:hover": {
        borderColor: e.palette.error.dark
      },
      "&$disabled": {
        color: e.palette.error.main
      }
    },
    errorText: {
      color: e.palette.error.main,
      "&$disabled": {
        color: e.palette.error.main
      }
    },
    errorSubtle: {
      color: e.palette.error.main,
      "&$disabled": {
        color: e.palette.error.main
      }
    },
    errorLink: {
      color: e.palette.error.main,
      borderColor: "transparent",
      boxShadow: "none",
      "&$disabled": {
        color: e.palette.error.main,
        borderColor: "transparent",
        boxShadow: "none"
      }
    },
    successContained: {
      backgroundColor: e.palette.success.main,
      borderColor: e.palette.success.main,
      "&:hover": {
        backgroundColor: e.palette.success.dark,
        borderColor: e.palette.success.dark
      }
    },
    successOutlined: {
      color: e.palette.success.main,
      border: `1px solid ${e.palette.success.main}`,
      "&:hover": {
        borderColor: e.palette.success.dark
      },
      "&$disabled": {
        color: e.palette.success.main
      }
    },
    successText: {
      color: e.palette.success.main,
      "&$disabled": {
        color: e.palette.success.main
      }
    },
    successSubtle: {
      color: e.palette.success.main,
      "&$disabled": {
        color: e.palette.success.main
      }
    },
    successLink: {
      color: e.palette.success.main,
      borderColor: "transparent",
      boxShadow: "none",
      "&$disabled": {
        color: e.palette.success.main,
        borderColor: "transparent",
        boxShadow: "none"
      }
    },
    warningContained: {
      backgroundColor: e.palette.warning.main,
      borderColor: e.palette.warning.main,
      "&:hover": {
        backgroundColor: e.palette.warning.dark,
        borderColor: e.palette.warning.dark
      }
    },
    warningOutlined: {
      color: e.palette.warning.main,
      border: `1px solid ${e.palette.warning.main}`,
      "&:hover": {
        borderColor: e.palette.warning.dark
      },
      "&$disabled": {
        color: e.palette.warning.main
      }
    },
    warningText: {
      color: e.palette.warning.main,
      "&$disabled": {
        color: e.palette.warning.main
      }
    },
    warningSubtle: {
      color: e.palette.warning.main,
      "&$disabled": {
        color: e.palette.warning.main
      }
    },
    warningLink: {
      color: e.palette.warning.main,
      borderColor: "transparent",
      boxShadow: "none",
      "&$disabled": {
        color: e.palette.warning.main,
        borderColor: "transparent",
        boxShadow: "none"
      }
    },
    pill: {
      borderRadius: e.spacing(3.125)
    },
    small: {
      padding: e.spacing(0.375, 2),
      gap: e.spacing(0.75)
    },
    smallPill: {},
    smallLink: {
      padding: e.spacing(0.375, 0)
    },
    tiny: {
      padding: e.spacing(0, 1.5),
      gap: e.spacing(0.5)
    },
    tinyLink: {
      padding: e.spacing(0)
    },
    tinyPill: {},
    disabled: {
      opacity: 0.5,
      cursor: "default",
      pointerEvents: "none",
      color: e.palette.common.white,
      "&:hover": {
        textDecoration: "none"
      }
    },
    startIcon: {},
    startIconSmall: {},
    startIconTiny: {},
    endIcon: {},
    endIconSmall: {},
    endIconTiny: {}
  })
), cn = (e) => {
  const {
    children: t,
    color: a = "primary",
    variant: r = "contained",
    pill: n = !1,
    fullWidth: o = !1,
    size: i = "medium",
    disabled: s = !1,
    testId: l,
    ...u
  } = e, c = gb(), d = a === "primary", p = a === "secondary", h = a === "error", g = a === "success", m = a === "warning", v = r === "text", C = r === "outlined", T = r === "contained", A = r === "subtle", f = r === "link", x = i === "small", k = i === "tiny";
  return /* @__PURE__ */ q.jsx(
    Wm,
    {
      classes: {
        root: ge({
          [c.commons]: !0,
          [c.fullWidth]: o,
          [c.disabled]: s,
          [c.outlined]: C,
          [c.contained]: T,
          [c.text]: v,
          [c.subtle]: A,
          [c.link]: f,
          [c.pill]: n,
          [c.smallPill]: n && x,
          [c.small]: x,
          [c.smallLink]: x && f,
          [c.tinyPill]: n && k,
          [c.tiny]: k,
          [c.tinyLink]: k && f,
          [c.primaryContained]: d && T,
          [c.primaryText]: d && v,
          [c.primaryOutlined]: d && C,
          [c.primarySubtle]: d && A,
          [c.primaryLink]: d && f,
          [c.secondaryContained]: p && T,
          [c.secondaryText]: p && v,
          [c.secondaryOutlined]: p && C,
          [c.secondarySubtle]: p && A,
          [c.secondaryLink]: p && f,
          [c.successContained]: g && T,
          [c.successText]: g && v,
          [c.successOutlined]: g && C,
          [c.successSubtle]: g && A,
          [c.successLink]: g && f,
          [c.errorContained]: h && T,
          [c.errorText]: h && v,
          [c.errorOutlined]: h && C,
          [c.errorSubtle]: h && A,
          [c.errorLink]: h && f,
          [c.warningContained]: m && T,
          [c.warningText]: m && v,
          [c.warningOutlined]: m && C,
          [c.warningSubtle]: m && A,
          [c.warningLink]: m && f
        }),
        startIcon: ge({
          [c.startIcon]: !0,
          [c.startIconSmall]: x,
          [c.startIconTiny]: k
        }),
        endIcon: ge({
          [c.endIcon]: !0,
          [c.endIconSmall]: x,
          [c.endIconTiny]: k
        })
      },
      disableFocusRipple: !0,
      disableRipple: !0,
      centerRipple: !1,
      "data-cyid": `${l}-button`,
      disabled: s,
      ...u,
      children: t
    }
  );
}, bb = (e) => {
  const t = Ui(), { messages: a, clearLogs: r, isDisabled: n } = e, o = () => {
    const i = a.map((s) => `${s.timestamp} ${s.message}`).join(`
`);
    Uc(i);
  };
  return /* @__PURE__ */ q.jsxs(Ce, { className: t.outputConsoleContainer, children: [
    /* @__PURE__ */ q.jsx(Ht, { variant: "body1", children: "Output" }),
    /* @__PURE__ */ q.jsxs(Ce, { children: [
      /* @__PURE__ */ q.jsx(
        cn,
        {
          testId: "copy-output",
          variant: "link",
          disabled: n,
          onClick: o,
          startIcon: /* @__PURE__ */ q.jsx(Kc, {}),
          color: "primary",
          size: "small",
          className: t.copyButton,
          children: "Copy Output"
        }
      ),
      /* @__PURE__ */ q.jsx(
        cn,
        {
          testId: "clear-output",
          variant: "link",
          onClick: r,
          disabled: n,
          startIcon: /* @__PURE__ */ q.jsx(ib, {}),
          color: "error",
          size: "small",
          children: "Clear"
        }
      )
    ] })
  ] });
}, vb = zu(() => import("./index-DTebFONq.mjs")), yb = {
  autoIndent: "full",
  automaticLayout: !0,
  contextmenu: !0,
  fontFamily: '"Droid Sans Mono", Monaco, monospace',
  hideCursorInOverviewRuler: !0,
  matchBrackets: "always",
  minimap: {
    enabled: !1
  },
  overviewRulerLanes: 0,
  scrollbar: {
    vertical: "hidden",
    horizontal: "hidden",
    handleMouseWheel: !1
  },
  lineNumbers: !1,
  readOnly: !1,
  renderLineHighlight: "none",
  padding: {
    top: 8
  }
};
function xb({
  fileContent: e,
  language: t,
  width: a = "100%",
  height: r = "70vh",
  setFileContent: n
}) {
  const o = Ui();
  return /* @__PURE__ */ q.jsx(Ce, { className: o.editorContainer, children: /* @__PURE__ */ q.jsx(Vl, { fallback: /* @__PURE__ */ q.jsx(Va, {}), children: /* @__PURE__ */ q.jsx(
    vb,
    {
      width: a,
      height: r,
      theme: "choreoRequestLightTheme",
      language: t,
      options: yb,
      onChange: (i) => n(i),
      value: e
    }
  ) }) });
}
const Gc = tr(
  (e) => cr({
    accordion: {
      "&$accordionBordered": {
        border: `1px solid ${e.palette.grey[100]}`,
        marginBottom: e.spacing(1),
        borderRadius: 8,
        "&.Mui-expanded": {
          marginBottom: e.spacing(1)
        },
        "&:last-child": {
          borderBottomColor: e.palette.grey[100],
          marginBottom: 0
        }
      }
    },
    accordionBordered: {
      "& $accordionSummaryBackgroundFilled": {
        borderRadius: 8
      }
    },
    nestedAccordionContent: {
      width: "100%",
      padding: e.spacing(1, 3)
    },
    accordionSummaryRoot: {
      minHeight: "initial",
      padding: e.spacing(0.5, 2),
      borderBottom: "1px solid transparent",
      "&$accordionSummaryBackgroundFilled": {
        background: "#E5E4E2"
      },
      "&.Mui-expanded": {
        minHeight: "initial",
        borderBottomColor: e.palette.grey[100],
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      },
      "& .MuiIconButton-label": {
        fontSize: e.spacing(1.5),
        color: e.palette.common.black
      },
      "& .MuiAccordionSummary-content": {
        margin: 0,
        flexGrow: 1,
        overflow: "hidden",
        "&.Mui-expanded": {
          margin: 0
        }
      },
      "&$accordionSummaryNoPaddingRoot": {
        padding: e.spacing(0.5, 0)
      }
    },
    accordionSummaryNoPaddingRoot: {},
    accordionSummaryBackgroundFilled: {}
  })
), Sb = Di(xm)(({ theme: e }) => ({
  boxShadow: "none",
  borderBottom: `1px solid ${e.palette.grey[100]}`,
  "&.MuiAccordion-rounded": {
    "&:first-child": {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
    },
    "&:last-child": {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
    }
  },
  "&.MuiPaper-outlined": {
    border: "none",
    borderTop: `1px solid ${e.palette.grey[100]}`,
    backgroundColor: "transparent",
    "&:first-child": {
      borderTop: "none"
    },
    "& .MuiAccordionSummary-root": {
      padding: e.spacing(1, 0)
    }
  },
  "&.Mui-expanded": {
    margin: 0
  },
  "&:before": {
    backgroundColor: "transparent"
  },
  "&:last-child": {
    borderBottomColor: "transparent"
  }
})), wb = (e) => {
  const { children: t, testId: a, contained: r = !0, bordered: n, ...o } = e, i = r ? void 0 : "outlined", s = Gc();
  return /* @__PURE__ */ q.jsx(
    Sb,
    {
      "data-cyid": a,
      variant: i,
      ...o,
      classes: {
        root: ge({
          [s.accordion]: !0,
          [s.accordionBordered]: n
        })
      },
      children: t
    }
  );
}, Cb = Di(Cm)(() => ({
  padding: 0
})), Eb = (e) => {
  const { testId: t, children: a, ...r } = e;
  return /* @__PURE__ */ q.jsx(Cb, { "data-cyid": t, ...r, children: a });
}, kb = (e) => {
  const {
    children: t,
    testId: a,
    noPadding: r = !1,
    expandIcon: n,
    backgroundFilled: o = !1,
    className: i,
    ...s
  } = e, l = Gc();
  return /* @__PURE__ */ q.jsx(
    Lm,
    {
      expandIcon: n || /* @__PURE__ */ q.jsx(bi, { fontSize: "inherit", rotate: 90 }),
      "data-cyid": a,
      className: ge(
        {
          [l.accordionSummaryRoot]: !0,
          [l.accordionSummaryNoPaddingRoot]: r,
          [l.accordionSummaryBackgroundFilled]: o
        },
        i
      ),
      ...s,
      children: t
    }
  );
}, $b = tr(
  (e) => cr({
    root: {
      "& .MuiChip-icon": {
        color: "inherit"
      },
      "&$small": {
        fontSize: e.spacing(1.25),
        borderRadius: e.spacing(0.375),
        lineHeight: 1.2,
        height: e.spacing(2),
        "& .MuiChip-label": {
          padding: e.spacing(0, 0.5, 0.125, 0.5)
        },
        "& .MuiChip-icon": {
          marginLeft: e.spacing(0.5),
          marginRight: 0
        }
      },
      "&$medium": {
        fontSize: e.spacing(1.625),
        borderRadius: e.spacing(0.625),
        lineHeight: 1.23,
        height: e.spacing(3),
        "& .MuiChip-label": {
          padding: e.spacing(0.1, 1)
        },
        "& .MuiChip-icon": {
          marginLeft: e.spacing(1),
          marginRight: 0
        }
      },
      "&$large": {
        fontSize: e.spacing(1.625),
        borderRadius: e.spacing(0.625),
        lineHeight: 1.23,
        "& .MuiChip-label": {
          padding: e.spacing(1, 1.5)
        },
        "& .MuiChip-icon": {
          marginLeft: e.spacing(1.5),
          marginRight: 0
        }
      }
    },
    small: {},
    medium: {},
    large: {},
    contained: {
      "&$info": {
        backgroundColor: "#0095ff",
        color: e.palette.common.white
      },
      "&$primary": {
        backgroundColor: e.palette.primary.main,
        color: e.palette.common.white
      },
      "&$secondary": {
        background: "#E5E4E2"
      },
      "&$success": {
        backgroundColor: e.palette.success.main,
        color: e.palette.common.white
      },
      "&$default": {
        backgroundColor: e.palette.grey[200]
      },
      "&$warning": {
        backgroundColor: e.palette.warning.dark,
        color: e.palette.common.white
      },
      "&$error": {
        backgroundColor: e.palette.error.main,
        color: e.palette.common.white
      }
    },
    outlined: {
      "&$info": {
        color: "#0095ff",
        border: "1px solid 0095ff",
        backgroundColor: Le("#0095ff", 0.1)
      },
      "&$primary": {
        border: `1px solid ${e.palette.primary.main}`,
        color: e.palette.primary.main,
        backgroundColor: "#D8E1E8"
      },
      "&$secondary": {
        backgroundColor: e.palette.common.white,
        border: `1px solid ${e.palette.grey[200]}`
      },
      "&$success": {
        border: `1px solid ${e.palette.success.main}`,
        color: e.palette.success.main,
        backgroundColor: e.palette.success.light
      },
      "&$default": {
        backgroundColor: e.palette.grey[100],
        border: `1px solid ${e.palette.grey[200]}`
      },
      "&$warning": {
        border: `1px solid ${e.palette.warning.dark}`,
        color: e.palette.warning.dark,
        backgroundColor: e.palette.warning.light
      },
      "&$error": {
        border: `1px solid ${e.palette.error.main}`,
        color: e.palette.error.main,
        backgroundColor: e.palette.error.light
      }
    },
    info: {},
    primary: {},
    secondary: {},
    success: {},
    default: {},
    warning: {},
    error: {}
  })
);
function ml(e) {
  const {
    label: t,
    color: a = "default",
    variant: r = "contained",
    size: n = "medium",
    icon: o,
    testId: i,
    ...s
  } = e, l = $b();
  return /* @__PURE__ */ q.jsx(
    Um,
    {
      classes: {
        root: ge(
          l.root,
          l[n],
          l[r],
          l[a]
        )
      },
      icon: o,
      label: t,
      "data-cyid": `${i}-chip`,
      ...s
    }
  );
}
const gl = (e) => e, Rb = () => {
  let e = gl;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = gl;
    }
  };
}, Tb = Rb();
function Br(e, ...t) {
  const a = new URL(`https://mui.com/production-error/?code=${e}`);
  return t.forEach((r) => a.searchParams.append("args[]", r)), `Minified MUI error #${e}; visit ${a} for the full message.`;
}
function gn(e) {
  if (typeof e != "string")
    throw new Error(Br(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Yc(e) {
  var t, a, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (t = 0; t < n; t++) e[t] && (a = Yc(e[t])) && (r && (r += " "), r += a);
  } else for (a in e) e[a] && (r && (r += " "), r += a);
  return r;
}
function Ob() {
  for (var e, t, a = 0, r = "", n = arguments.length; a < n; a++) (e = arguments[a]) && (t = Yc(e)) && (r && (r += " "), r += t);
  return r;
}
function _b(e, t, a = void 0) {
  const r = {};
  for (const n in e) {
    const o = e[n];
    let i = "", s = !0;
    for (let l = 0; l < o.length; l += 1) {
      const u = o[l];
      u && (i += (s === !0 ? "" : " ") + t(u), s = !1, a && a[u] && (i += " " + a[u]));
    }
    r[n] = i;
  }
  return r;
}
var Vo = { exports: {} }, dt = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bl;
function Pb() {
  if (bl) return dt;
  bl = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), n = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), i = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), c = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), p = Symbol.for("react.view_transition"), h = Symbol.for("react.client.reference");
  function g(m) {
    if (typeof m == "object" && m !== null) {
      var v = m.$$typeof;
      switch (v) {
        case e:
          switch (m = m.type, m) {
            case a:
            case n:
            case r:
            case l:
            case u:
            case p:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case i:
                case s:
                case d:
                case c:
                  return m;
                case o:
                  return m;
                default:
                  return v;
              }
          }
        case t:
          return v;
      }
    }
  }
  return dt.ContextConsumer = o, dt.ContextProvider = i, dt.Element = e, dt.ForwardRef = s, dt.Fragment = a, dt.Lazy = d, dt.Memo = c, dt.Portal = t, dt.Profiler = n, dt.StrictMode = r, dt.Suspense = l, dt.SuspenseList = u, dt.isContextConsumer = function(m) {
    return g(m) === o;
  }, dt.isContextProvider = function(m) {
    return g(m) === i;
  }, dt.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === e;
  }, dt.isForwardRef = function(m) {
    return g(m) === s;
  }, dt.isFragment = function(m) {
    return g(m) === a;
  }, dt.isLazy = function(m) {
    return g(m) === d;
  }, dt.isMemo = function(m) {
    return g(m) === c;
  }, dt.isPortal = function(m) {
    return g(m) === t;
  }, dt.isProfiler = function(m) {
    return g(m) === n;
  }, dt.isStrictMode = function(m) {
    return g(m) === r;
  }, dt.isSuspense = function(m) {
    return g(m) === l;
  }, dt.isSuspenseList = function(m) {
    return g(m) === u;
  }, dt.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === a || m === n || m === r || m === l || m === u || typeof m == "object" && m !== null && (m.$$typeof === d || m.$$typeof === c || m.$$typeof === i || m.$$typeof === o || m.$$typeof === s || m.$$typeof === h || m.getModuleId !== void 0);
  }, dt.typeOf = g, dt;
}
var vl;
function jb() {
  return vl || (vl = 1, Vo.exports = /* @__PURE__ */ Pb()), Vo.exports;
}
var Xc = /* @__PURE__ */ jb();
function ir(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Jc(e) {
  if (/* @__PURE__ */ _.isValidElement(e) || Xc.isValidElementType(e) || !ir(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((a) => {
    t[a] = Jc(e[a]);
  }), t;
}
function Ft(e, t, a = {
  clone: !0
}) {
  const r = a.clone ? {
    ...e
  } : e;
  return ir(e) && ir(t) && Object.keys(t).forEach((n) => {
    /* @__PURE__ */ _.isValidElement(t[n]) || Xc.isValidElementType(t[n]) ? r[n] = t[n] : ir(t[n]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, n) && ir(e[n]) ? r[n] = Ft(e[n], t[n], a) : a.clone ? r[n] = ir(t[n]) ? Jc(t[n]) : t[n] : r[n] = t[n];
  }), r;
}
function Ln(e, t) {
  return t ? Ft(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
function yl(e, t) {
  if (!e.containerQueries)
    return t;
  const a = Object.keys(t).filter((r) => r.startsWith("@container")).sort((r, n) => {
    var i, s;
    const o = /min-width:\s*([0-9.]+)/;
    return +(((i = r.match(o)) == null ? void 0 : i[1]) || 0) - +(((s = n.match(o)) == null ? void 0 : s[1]) || 0);
  });
  return a.length ? a.reduce((r, n) => {
    const o = t[n];
    return delete r[n], r[n] = o, r;
  }, {
    ...t
  }) : t;
}
function Ab(e, t) {
  return t === "@" || t.startsWith("@") && (e.some((a) => t.startsWith(`@${a}`)) || !!t.match(/^@\d/));
}
function Mb(e, t) {
  const a = t.match(/^@([^/]+)?\/?(.+)?$/);
  if (!a)
    return null;
  const [, r, n] = a, o = Number.isNaN(+r) ? r || 0 : +r;
  return e.containerQueries(n).up(o);
}
function Ib(e) {
  const t = (o, i) => o.replace("@media", i ? `@container ${i}` : "@container");
  function a(o, i) {
    o.up = (...s) => t(e.breakpoints.up(...s), i), o.down = (...s) => t(e.breakpoints.down(...s), i), o.between = (...s) => t(e.breakpoints.between(...s), i), o.only = (...s) => t(e.breakpoints.only(...s), i), o.not = (...s) => {
      const l = t(e.breakpoints.not(...s), i);
      return l.includes("not all and") ? l.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : l;
    };
  }
  const r = {}, n = (o) => (a(r, o), r);
  return a(n), {
    ...e,
    containerQueries: n
  };
}
const qa = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
}, xl = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${qa[e]}px)`
}, Lb = {
  containerQueries: (e) => ({
    up: (t) => {
      let a = typeof t == "number" ? t : qa[t] || t;
      return typeof a == "number" && (a = `${a}px`), e ? `@container ${e} (min-width:${a})` : `@container (min-width:${a})`;
    }
  })
};
function sr(e, t, a) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const o = r.breakpoints || xl;
    return t.reduce((i, s, l) => (i[o.up(o.keys[l])] = a(t[l]), i), {});
  }
  if (typeof t == "object") {
    const o = r.breakpoints || xl;
    return Object.keys(t).reduce((i, s) => {
      if (Ab(o.keys, s)) {
        const l = Mb(r.containerQueries ? r : Lb, s);
        l && (i[l] = a(t[s], s));
      } else if (Object.keys(o.values || qa).includes(s)) {
        const l = o.up(s);
        i[l] = a(t[s], s);
      } else {
        const l = s;
        i[l] = t[l];
      }
      return i;
    }, {});
  }
  return a(t);
}
function Db(e = {}) {
  var a;
  return ((a = e.keys) == null ? void 0 : a.reduce((r, n) => {
    const o = e.up(n);
    return r[o] = {}, r;
  }, {})) || {};
}
function Sl(e, t) {
  return e.reduce((a, r) => {
    const n = a[r];
    return (!n || Object.keys(n).length === 0) && delete a[r], a;
  }, t);
}
function Ua(e, t, a = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && a) {
    const r = `vars.${t}`.split(".").reduce((n, o) => n && n[o] ? n[o] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, n) => r && r[n] != null ? r[n] : null, e);
}
function ja(e, t, a, r = a) {
  let n;
  return typeof e == "function" ? n = e(a) : Array.isArray(e) ? n = e[a] || r : n = Ua(e, a) || r, t && (n = t(n, r, e)), n;
}
function Et(e) {
  const {
    prop: t,
    cssProperty: a = e.prop,
    themeKey: r,
    transform: n
  } = e, o = (i) => {
    if (i[t] == null)
      return null;
    const s = i[t], l = i.theme, u = Ua(l, r) || {};
    return sr(i, s, (d) => {
      let p = ja(u, n, d);
      return d === p && typeof d == "string" && (p = ja(u, n, `${t}${d === "default" ? "" : gn(d)}`, d)), a === !1 ? p : {
        [a]: p
      };
    });
  };
  return o.propTypes = {}, o.filterProps = [t], o;
}
function Nb(e) {
  const t = {};
  return (a) => (t[a] === void 0 && (t[a] = e(a)), t[a]);
}
const Bb = {
  m: "margin",
  p: "padding"
}, Fb = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, wl = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, zb = Nb((e) => {
  if (e.length > 2)
    if (wl[e])
      e = wl[e];
    else
      return [e];
  const [t, a] = e.split(""), r = Bb[t], n = Fb[a] || "";
  return Array.isArray(n) ? n.map((o) => r + o) : [r + n];
}), Gi = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Yi = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
[...Gi, ...Yi];
function Xn(e, t, a, r) {
  const n = Ua(e, t, !0) ?? a;
  return typeof n == "number" || typeof n == "string" ? (o) => typeof o == "string" ? o : typeof n == "string" ? n.startsWith("var(") && o === 0 ? 0 : n.startsWith("var(") && o === 1 ? n : `calc(${o} * ${n})` : n * o : Array.isArray(n) ? (o) => {
    if (typeof o == "string")
      return o;
    const i = Math.abs(o), s = n[i];
    return o >= 0 ? s : typeof s == "number" ? -s : typeof s == "string" && s.startsWith("var(") ? `calc(-1 * ${s})` : `-${s}`;
  } : typeof n == "function" ? n : () => {
  };
}
function Xi(e) {
  return Xn(e, "spacing", 8);
}
function Jn(e, t) {
  return typeof t == "string" || t == null ? t : e(t);
}
function Wb(e, t) {
  return (a) => e.reduce((r, n) => (r[n] = Jn(t, a), r), {});
}
function Vb(e, t, a, r) {
  if (!t.includes(a))
    return null;
  const n = zb(a), o = Wb(n, r), i = e[a];
  return sr(e, i, o);
}
function Zc(e, t) {
  const a = Xi(e.theme);
  return Object.keys(e).map((r) => Vb(e, t, r, a)).reduce(Ln, {});
}
function wt(e) {
  return Zc(e, Gi);
}
wt.propTypes = {};
wt.filterProps = Gi;
function Ct(e) {
  return Zc(e, Yi);
}
Ct.propTypes = {};
Ct.filterProps = Yi;
function Ga(...e) {
  const t = e.reduce((r, n) => (n.filterProps.forEach((o) => {
    r[o] = n;
  }), r), {}), a = (r) => Object.keys(r).reduce((n, o) => t[o] ? Ln(n, t[o](r)) : n, {});
  return a.propTypes = {}, a.filterProps = e.reduce((r, n) => r.concat(n.filterProps), []), a;
}
function Wt(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Kt(e, t) {
  return Et({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Hb = Kt("border", Wt), Kb = Kt("borderTop", Wt), qb = Kt("borderRight", Wt), Ub = Kt("borderBottom", Wt), Gb = Kt("borderLeft", Wt), Yb = Kt("borderColor"), Xb = Kt("borderTopColor"), Jb = Kt("borderRightColor"), Zb = Kt("borderBottomColor"), Qb = Kt("borderLeftColor"), ev = Kt("outline", Wt), tv = Kt("outlineColor"), Ya = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Xn(e.theme, "shape.borderRadius", 4), a = (r) => ({
      borderRadius: Jn(t, r)
    });
    return sr(e, e.borderRadius, a);
  }
  return null;
};
Ya.propTypes = {};
Ya.filterProps = ["borderRadius"];
Ga(Hb, Kb, qb, Ub, Gb, Yb, Xb, Jb, Zb, Qb, Ya, ev, tv);
const Xa = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Xn(e.theme, "spacing", 8), a = (r) => ({
      gap: Jn(t, r)
    });
    return sr(e, e.gap, a);
  }
  return null;
};
Xa.propTypes = {};
Xa.filterProps = ["gap"];
const Ja = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Xn(e.theme, "spacing", 8), a = (r) => ({
      columnGap: Jn(t, r)
    });
    return sr(e, e.columnGap, a);
  }
  return null;
};
Ja.propTypes = {};
Ja.filterProps = ["columnGap"];
const Za = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Xn(e.theme, "spacing", 8), a = (r) => ({
      rowGap: Jn(t, r)
    });
    return sr(e, e.rowGap, a);
  }
  return null;
};
Za.propTypes = {};
Za.filterProps = ["rowGap"];
const rv = Et({
  prop: "gridColumn"
}), nv = Et({
  prop: "gridRow"
}), av = Et({
  prop: "gridAutoFlow"
}), ov = Et({
  prop: "gridAutoColumns"
}), iv = Et({
  prop: "gridAutoRows"
}), sv = Et({
  prop: "gridTemplateColumns"
}), lv = Et({
  prop: "gridTemplateRows"
}), cv = Et({
  prop: "gridTemplateAreas"
}), uv = Et({
  prop: "gridArea"
});
Ga(Xa, Ja, Za, rv, nv, av, ov, iv, sv, lv, cv, uv);
function un(e, t) {
  return t === "grey" ? t : e;
}
const dv = Et({
  prop: "color",
  themeKey: "palette",
  transform: un
}), fv = Et({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: un
}), pv = Et({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: un
});
Ga(dv, fv, pv);
function Bt(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const hv = Et({
  prop: "width",
  transform: Bt
}), Ji = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (a) => {
      var n, o, i, s, l;
      const r = ((i = (o = (n = e.theme) == null ? void 0 : n.breakpoints) == null ? void 0 : o.values) == null ? void 0 : i[a]) || qa[a];
      return r ? ((l = (s = e.theme) == null ? void 0 : s.breakpoints) == null ? void 0 : l.unit) !== "px" ? {
        maxWidth: `${r}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: r
      } : {
        maxWidth: Bt(a)
      };
    };
    return sr(e, e.maxWidth, t);
  }
  return null;
};
Ji.filterProps = ["maxWidth"];
const mv = Et({
  prop: "minWidth",
  transform: Bt
}), gv = Et({
  prop: "height",
  transform: Bt
}), bv = Et({
  prop: "maxHeight",
  transform: Bt
}), vv = Et({
  prop: "minHeight",
  transform: Bt
});
Et({
  prop: "size",
  cssProperty: "width",
  transform: Bt
});
Et({
  prop: "size",
  cssProperty: "height",
  transform: Bt
});
const yv = Et({
  prop: "boxSizing"
});
Ga(hv, Ji, mv, gv, bv, vv, yv);
const Qa = {
  // borders
  border: {
    themeKey: "borders",
    transform: Wt
  },
  borderTop: {
    themeKey: "borders",
    transform: Wt
  },
  borderRight: {
    themeKey: "borders",
    transform: Wt
  },
  borderBottom: {
    themeKey: "borders",
    transform: Wt
  },
  borderLeft: {
    themeKey: "borders",
    transform: Wt
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: Wt
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Ya
  },
  // palette
  color: {
    themeKey: "palette",
    transform: un
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: un
  },
  backgroundColor: {
    themeKey: "palette",
    transform: un
  },
  // spacing
  p: {
    style: Ct
  },
  pt: {
    style: Ct
  },
  pr: {
    style: Ct
  },
  pb: {
    style: Ct
  },
  pl: {
    style: Ct
  },
  px: {
    style: Ct
  },
  py: {
    style: Ct
  },
  padding: {
    style: Ct
  },
  paddingTop: {
    style: Ct
  },
  paddingRight: {
    style: Ct
  },
  paddingBottom: {
    style: Ct
  },
  paddingLeft: {
    style: Ct
  },
  paddingX: {
    style: Ct
  },
  paddingY: {
    style: Ct
  },
  paddingInline: {
    style: Ct
  },
  paddingInlineStart: {
    style: Ct
  },
  paddingInlineEnd: {
    style: Ct
  },
  paddingBlock: {
    style: Ct
  },
  paddingBlockStart: {
    style: Ct
  },
  paddingBlockEnd: {
    style: Ct
  },
  m: {
    style: wt
  },
  mt: {
    style: wt
  },
  mr: {
    style: wt
  },
  mb: {
    style: wt
  },
  ml: {
    style: wt
  },
  mx: {
    style: wt
  },
  my: {
    style: wt
  },
  margin: {
    style: wt
  },
  marginTop: {
    style: wt
  },
  marginRight: {
    style: wt
  },
  marginBottom: {
    style: wt
  },
  marginLeft: {
    style: wt
  },
  marginX: {
    style: wt
  },
  marginY: {
    style: wt
  },
  marginInline: {
    style: wt
  },
  marginInlineStart: {
    style: wt
  },
  marginInlineEnd: {
    style: wt
  },
  marginBlock: {
    style: wt
  },
  marginBlockStart: {
    style: wt
  },
  marginBlockEnd: {
    style: wt
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (e) => ({
      "@media print": {
        display: e
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: Xa
  },
  rowGap: {
    style: Za
  },
  columnGap: {
    style: Ja
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: Bt
  },
  maxWidth: {
    style: Ji
  },
  minWidth: {
    transform: Bt
  },
  height: {
    transform: Bt
  },
  maxHeight: {
    transform: Bt
  },
  minHeight: {
    transform: Bt
  },
  boxSizing: {},
  // typography
  font: {
    themeKey: "font"
  },
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: !1,
    themeKey: "typography"
  }
};
function xv(...e) {
  const t = e.reduce((r, n) => r.concat(Object.keys(n)), []), a = new Set(t);
  return e.every((r) => a.size === Object.keys(r).length);
}
function Sv(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function wv() {
  function e(a, r, n, o) {
    const i = {
      [a]: r,
      theme: n
    }, s = o[a];
    if (!s)
      return {
        [a]: r
      };
    const {
      cssProperty: l = a,
      themeKey: u,
      transform: c,
      style: d
    } = s;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [a]: r
      };
    const p = Ua(n, u) || {};
    return d ? d(i) : sr(i, r, (g) => {
      let m = ja(p, c, g);
      return g === m && typeof g == "string" && (m = ja(p, c, `${a}${g === "default" ? "" : gn(g)}`, g)), l === !1 ? m : {
        [l]: m
      };
    });
  }
  function t(a) {
    const {
      sx: r,
      theme: n = {},
      nested: o
    } = a || {};
    if (!r)
      return null;
    const i = n.unstable_sxConfig ?? Qa;
    function s(l) {
      let u = l;
      if (typeof l == "function")
        u = l(n);
      else if (typeof l != "object")
        return l;
      if (!u)
        return null;
      const c = Db(n.breakpoints), d = Object.keys(c);
      let p = c;
      return Object.keys(u).forEach((h) => {
        const g = Sv(u[h], n);
        if (g != null)
          if (typeof g == "object")
            if (i[h])
              p = Ln(p, e(h, g, n, i));
            else {
              const m = sr({
                theme: n
              }, g, (v) => ({
                [h]: v
              }));
              xv(m, g) ? p[h] = t({
                sx: g,
                theme: n,
                nested: !0
              }) : p = Ln(p, m);
            }
          else
            p = Ln(p, e(h, g, n, i));
      }), !o && n.modularCssLayers ? {
        "@layer sx": yl(n, Sl(d, p))
      } : yl(n, Sl(d, p));
    }
    return Array.isArray(r) ? r.map(s) : s(r);
  }
  return t;
}
const bn = wv();
bn.filterProps = ["sx"];
function Cv(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function Ev(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var kv = /* @__PURE__ */ (function() {
  function e(a) {
    var r = this;
    this._insertTag = function(n) {
      var o;
      r.tags.length === 0 ? r.insertionPoint ? o = r.insertionPoint.nextSibling : r.prepend ? o = r.container.firstChild : o = r.before : o = r.tags[r.tags.length - 1].nextSibling, r.container.insertBefore(n, o), r.tags.push(n);
    }, this.isSpeedy = a.speedy === void 0 ? !0 : a.speedy, this.tags = [], this.ctr = 0, this.nonce = a.nonce, this.key = a.key, this.container = a.container, this.prepend = a.prepend, this.insertionPoint = a.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(r) {
    r.forEach(this._insertTag);
  }, t.insert = function(r) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Ev(this));
    var n = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var o = Cv(n);
      try {
        o.insertRule(r, o.cssRules.length);
      } catch {
      }
    } else
      n.appendChild(document.createTextNode(r));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(r) {
      var n;
      return (n = r.parentNode) == null ? void 0 : n.removeChild(r);
    }), this.tags = [], this.ctr = 0;
  }, e;
})(), jt = "-ms-", Aa = "-moz-", et = "-webkit-", Qc = "comm", Zi = "rule", Qi = "decl", $v = "@import", eu = "@keyframes", Rv = "@layer", Tv = Math.abs, eo = String.fromCharCode, Ov = Object.assign;
function _v(e, t) {
  return Pt(e, 0) ^ 45 ? (((t << 2 ^ Pt(e, 0)) << 2 ^ Pt(e, 1)) << 2 ^ Pt(e, 2)) << 2 ^ Pt(e, 3) : 0;
}
function tu(e) {
  return e.trim();
}
function Pv(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function tt(e, t, a) {
  return e.replace(t, a);
}
function vi(e, t) {
  return e.indexOf(t);
}
function Pt(e, t) {
  return e.charCodeAt(t) | 0;
}
function Bn(e, t, a) {
  return e.slice(t, a);
}
function Zt(e) {
  return e.length;
}
function es(e) {
  return e.length;
}
function ca(e, t) {
  return t.push(e), e;
}
function jv(e, t) {
  return e.map(t).join("");
}
var to = 1, vn = 1, ru = 0, Nt = 0, $t = 0, Sn = "";
function ro(e, t, a, r, n, o, i) {
  return { value: e, root: t, parent: a, type: r, props: n, children: o, line: to, column: vn, length: i, return: "" };
}
function $n(e, t) {
  return Ov(ro("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function Av() {
  return $t;
}
function Mv() {
  return $t = Nt > 0 ? Pt(Sn, --Nt) : 0, vn--, $t === 10 && (vn = 1, to--), $t;
}
function zt() {
  return $t = Nt < ru ? Pt(Sn, Nt++) : 0, vn++, $t === 10 && (vn = 1, to++), $t;
}
function er() {
  return Pt(Sn, Nt);
}
function ya() {
  return Nt;
}
function Zn(e, t) {
  return Bn(Sn, e, t);
}
function Fn(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function nu(e) {
  return to = vn = 1, ru = Zt(Sn = e), Nt = 0, [];
}
function au(e) {
  return Sn = "", e;
}
function xa(e) {
  return tu(Zn(Nt - 1, yi(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Iv(e) {
  for (; ($t = er()) && $t < 33; )
    zt();
  return Fn(e) > 2 || Fn($t) > 3 ? "" : " ";
}
function Lv(e, t) {
  for (; --t && zt() && !($t < 48 || $t > 102 || $t > 57 && $t < 65 || $t > 70 && $t < 97); )
    ;
  return Zn(e, ya() + (t < 6 && er() == 32 && zt() == 32));
}
function yi(e) {
  for (; zt(); )
    switch ($t) {
      // ] ) " '
      case e:
        return Nt;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && yi($t);
        break;
      // (
      case 40:
        e === 41 && yi(e);
        break;
      // \
      case 92:
        zt();
        break;
    }
  return Nt;
}
function Dv(e, t) {
  for (; zt() && e + $t !== 57; )
    if (e + $t === 84 && er() === 47)
      break;
  return "/*" + Zn(t, Nt - 1) + "*" + eo(e === 47 ? e : zt());
}
function Nv(e) {
  for (; !Fn(er()); )
    zt();
  return Zn(e, Nt);
}
function Bv(e) {
  return au(Sa("", null, null, null, [""], e = nu(e), 0, [0], e));
}
function Sa(e, t, a, r, n, o, i, s, l) {
  for (var u = 0, c = 0, d = i, p = 0, h = 0, g = 0, m = 1, v = 1, C = 1, T = 0, A = "", f = n, x = o, k = r, D = A; v; )
    switch (g = T, T = zt()) {
      // (
      case 40:
        if (g != 108 && Pt(D, d - 1) == 58) {
          vi(D += tt(xa(T), "&", "&\f"), "&\f") != -1 && (C = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        D += xa(T);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        D += Iv(g);
        break;
      // \
      case 92:
        D += Lv(ya() - 1, 7);
        continue;
      // /
      case 47:
        switch (er()) {
          case 42:
          case 47:
            ca(Fv(Dv(zt(), ya()), t, a), l);
            break;
          default:
            D += "/";
        }
        break;
      // {
      case 123 * m:
        s[u++] = Zt(D) * C;
      // } ; \0
      case 125 * m:
      case 59:
      case 0:
        switch (T) {
          // \0 }
          case 0:
          case 125:
            v = 0;
          // ;
          case 59 + c:
            C == -1 && (D = tt(D, /\f/g, "")), h > 0 && Zt(D) - d && ca(h > 32 ? El(D + ";", r, a, d - 1) : El(tt(D, " ", "") + ";", r, a, d - 2), l);
            break;
          // @ ;
          case 59:
            D += ";";
          // { rule/at-rule
          default:
            if (ca(k = Cl(D, t, a, u, c, n, s, A, f = [], x = [], d), o), T === 123)
              if (c === 0)
                Sa(D, t, k, k, f, o, d, s, x);
              else
                switch (p === 99 && Pt(D, 3) === 110 ? 100 : p) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Sa(e, k, k, r && ca(Cl(e, k, k, 0, 0, n, s, A, n, f = [], d), x), n, x, d, s, r ? f : x);
                    break;
                  default:
                    Sa(D, k, k, k, [""], x, 0, s, x);
                }
        }
        u = c = h = 0, m = C = 1, A = D = "", d = i;
        break;
      // :
      case 58:
        d = 1 + Zt(D), h = g;
      default:
        if (m < 1) {
          if (T == 123)
            --m;
          else if (T == 125 && m++ == 0 && Mv() == 125)
            continue;
        }
        switch (D += eo(T), T * m) {
          // &
          case 38:
            C = c > 0 ? 1 : (D += "\f", -1);
            break;
          // ,
          case 44:
            s[u++] = (Zt(D) - 1) * C, C = 1;
            break;
          // @
          case 64:
            er() === 45 && (D += xa(zt())), p = er(), c = d = Zt(A = D += Nv(ya())), T++;
            break;
          // -
          case 45:
            g === 45 && Zt(D) == 2 && (m = 0);
        }
    }
  return o;
}
function Cl(e, t, a, r, n, o, i, s, l, u, c) {
  for (var d = n - 1, p = n === 0 ? o : [""], h = es(p), g = 0, m = 0, v = 0; g < r; ++g)
    for (var C = 0, T = Bn(e, d + 1, d = Tv(m = i[g])), A = e; C < h; ++C)
      (A = tu(m > 0 ? p[C] + " " + T : tt(T, /&\f/g, p[C]))) && (l[v++] = A);
  return ro(e, t, a, n === 0 ? Zi : s, l, u, c);
}
function Fv(e, t, a) {
  return ro(e, t, a, Qc, eo(Av()), Bn(e, 2, -2), 0);
}
function El(e, t, a, r) {
  return ro(e, t, a, Qi, Bn(e, 0, r), Bn(e, r + 1, -1), r);
}
function dn(e, t) {
  for (var a = "", r = es(e), n = 0; n < r; n++)
    a += t(e[n], n, e, t) || "";
  return a;
}
function zv(e, t, a, r) {
  switch (e.type) {
    case Rv:
      if (e.children.length) break;
    case $v:
    case Qi:
      return e.return = e.return || e.value;
    case Qc:
      return "";
    case eu:
      return e.return = e.value + "{" + dn(e.children, r) + "}";
    case Zi:
      e.value = e.props.join(",");
  }
  return Zt(a = dn(e.children, r)) ? e.return = e.value + "{" + a + "}" : "";
}
function Wv(e) {
  var t = es(e);
  return function(a, r, n, o) {
    for (var i = "", s = 0; s < t; s++)
      i += e[s](a, r, n, o) || "";
    return i;
  };
}
function Vv(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function ou(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(a) {
    return t[a] === void 0 && (t[a] = e(a)), t[a];
  };
}
var Hv = function(t, a, r) {
  for (var n = 0, o = 0; n = o, o = er(), n === 38 && o === 12 && (a[r] = 1), !Fn(o); )
    zt();
  return Zn(t, Nt);
}, Kv = function(t, a) {
  var r = -1, n = 44;
  do
    switch (Fn(n)) {
      case 0:
        n === 38 && er() === 12 && (a[r] = 1), t[r] += Hv(Nt - 1, a, r);
        break;
      case 2:
        t[r] += xa(n);
        break;
      case 4:
        if (n === 44) {
          t[++r] = er() === 58 ? "&\f" : "", a[r] = t[r].length;
          break;
        }
      // fallthrough
      default:
        t[r] += eo(n);
    }
  while (n = zt());
  return t;
}, qv = function(t, a) {
  return au(Kv(nu(t), a));
}, kl = /* @__PURE__ */ new WeakMap(), Uv = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var a = t.value, r = t.parent, n = t.column === r.column && t.line === r.line; r.type !== "rule"; )
      if (r = r.parent, !r) return;
    if (!(t.props.length === 1 && a.charCodeAt(0) !== 58 && !kl.get(r)) && !n) {
      kl.set(t, !0);
      for (var o = [], i = qv(a, o), s = r.props, l = 0, u = 0; l < i.length; l++)
        for (var c = 0; c < s.length; c++, u++)
          t.props[u] = o[l] ? i[l].replace(/&\f/g, s[c]) : s[c] + " " + i[l];
    }
  }
}, Gv = function(t) {
  if (t.type === "decl") {
    var a = t.value;
    // charcode for l
    a.charCodeAt(0) === 108 && // charcode for b
    a.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function iu(e, t) {
  switch (_v(e, t)) {
    // color-adjust
    case 5103:
      return et + "print-" + e + e;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return et + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return et + e + Aa + e + jt + e + e;
    // flex, flex-direction
    case 6828:
    case 4268:
      return et + e + jt + e + e;
    // order
    case 6165:
      return et + e + jt + "flex-" + e + e;
    // align-items
    case 5187:
      return et + e + tt(e, /(\w+).+(:[^]+)/, et + "box-$1$2" + jt + "flex-$1$2") + e;
    // align-self
    case 5443:
      return et + e + jt + "flex-item-" + tt(e, /flex-|-self/, "") + e;
    // align-content
    case 4675:
      return et + e + jt + "flex-line-pack" + tt(e, /align-content|flex-|-self/, "") + e;
    // flex-shrink
    case 5548:
      return et + e + jt + tt(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return et + e + jt + tt(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return et + "box-" + tt(e, "-grow", "") + et + e + jt + tt(e, "grow", "positive") + e;
    // transition
    case 4554:
      return et + tt(e, /([^-])(transform)/g, "$1" + et + "$2") + e;
    // cursor
    case 6187:
      return tt(tt(tt(e, /(zoom-|grab)/, et + "$1"), /(image-set)/, et + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return tt(e, /(image-set\([^]*)/, et + "$1$`$1");
    // justify-content
    case 4968:
      return tt(tt(e, /(.+:)(flex-)?(.*)/, et + "box-pack:$3" + jt + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + et + e + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return tt(e, /(.+)-inline(.+)/, et + "$1$2") + e;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Zt(e) - 1 - t > 6) switch (Pt(e, t + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (Pt(e, t + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return tt(e, /(.+:)(.+)-([^]+)/, "$1" + et + "$2-$3$1" + Aa + (Pt(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        // (s)tretch
        case 115:
          return ~vi(e, "stretch") ? iu(tt(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    // position: sticky
    case 4949:
      if (Pt(e, t + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (Pt(e, Zt(e) - 3 - (~vi(e, "!important") && 10))) {
        // stic(k)y
        case 107:
          return tt(e, ":", ":" + et) + e;
        // (inline-)?fl(e)x
        case 101:
          return tt(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + et + (Pt(e, 14) === 45 ? "inline-" : "") + "box$3$1" + et + "$2$3$1" + jt + "$2box$3") + e;
      }
      break;
    // writing-mode
    case 5936:
      switch (Pt(e, t + 11)) {
        // vertical-l(r)
        case 114:
          return et + e + jt + tt(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return et + e + jt + tt(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return et + e + jt + tt(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return et + e + jt + e + e;
  }
  return e;
}
var Yv = function(t, a, r, n) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case Qi:
      t.return = iu(t.value, t.length);
      break;
    case eu:
      return dn([$n(t, {
        value: tt(t.value, "@", "@" + et)
      })], n);
    case Zi:
      if (t.length) return jv(t.props, function(o) {
        switch (Pv(o, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return dn([$n(t, {
              props: [tt(o, /:(read-\w+)/, ":" + Aa + "$1")]
            })], n);
          // :placeholder
          case "::placeholder":
            return dn([$n(t, {
              props: [tt(o, /:(plac\w+)/, ":" + et + "input-$1")]
            }), $n(t, {
              props: [tt(o, /:(plac\w+)/, ":" + Aa + "$1")]
            }), $n(t, {
              props: [tt(o, /:(plac\w+)/, jt + "input-$1")]
            })], n);
        }
        return "";
      });
  }
}, Xv = [Yv], Jv = function(t) {
  var a = t.key;
  if (a === "css") {
    var r = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(r, function(m) {
      var v = m.getAttribute("data-emotion");
      v.indexOf(" ") !== -1 && (document.head.appendChild(m), m.setAttribute("data-s", ""));
    });
  }
  var n = t.stylisPlugins || Xv, o = {}, i, s = [];
  i = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + a + ' "]'),
    function(m) {
      for (var v = m.getAttribute("data-emotion").split(" "), C = 1; C < v.length; C++)
        o[v[C]] = !0;
      s.push(m);
    }
  );
  var l, u = [Uv, Gv];
  {
    var c, d = [zv, Vv(function(m) {
      c.insert(m);
    })], p = Wv(u.concat(n, d)), h = function(v) {
      return dn(Bv(v), p);
    };
    l = function(v, C, T, A) {
      c = T, h(v ? v + "{" + C.styles + "}" : C.styles), A && (g.inserted[C.name] = !0);
    };
  }
  var g = {
    key: a,
    sheet: new kv({
      key: a,
      container: i,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: o,
    registered: {},
    insert: l
  };
  return g.sheet.hydrate(s), g;
}, Zv = !0;
function Qv(e, t, a) {
  var r = "";
  return a.split(" ").forEach(function(n) {
    e[n] !== void 0 ? t.push(e[n] + ";") : n && (r += n + " ");
  }), r;
}
var su = function(t, a, r) {
  var n = t.key + "-" + a.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (r === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  Zv === !1) && t.registered[n] === void 0 && (t.registered[n] = a.styles);
}, ey = function(t, a, r) {
  su(t, a, r);
  var n = t.key + "-" + a.name;
  if (t.inserted[a.name] === void 0) {
    var o = a;
    do
      t.insert(a === o ? "." + n : "", o, t.sheet, !0), o = o.next;
    while (o !== void 0);
  }
};
function ty(e) {
  for (var t = 0, a, r = 0, n = e.length; n >= 4; ++r, n -= 4)
    a = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, a = /* Math.imul(k, m): */
    (a & 65535) * 1540483477 + ((a >>> 16) * 59797 << 16), a ^= /* k >>> r: */
    a >>> 24, t = /* Math.imul(k, m): */
    (a & 65535) * 1540483477 + ((a >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (n) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(r) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var ry = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, ny = /[A-Z]|^ms/g, ay = /_EMO_([^_]+?)_([^]*?)_EMO_/g, lu = function(t) {
  return t.charCodeAt(1) === 45;
}, $l = function(t) {
  return t != null && typeof t != "boolean";
}, Ho = /* @__PURE__ */ ou(function(e) {
  return lu(e) ? e : e.replace(ny, "-$&").toLowerCase();
}), Rl = function(t, a) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof a == "string")
        return a.replace(ay, function(r, n, o) {
          return Qt = {
            name: n,
            styles: o,
            next: Qt
          }, n;
        });
  }
  return ry[t] !== 1 && !lu(t) && typeof a == "number" && a !== 0 ? a + "px" : a;
};
function zn(e, t, a) {
  if (a == null)
    return "";
  var r = a;
  if (r.__emotion_styles !== void 0)
    return r;
  switch (typeof a) {
    case "boolean":
      return "";
    case "object": {
      var n = a;
      if (n.anim === 1)
        return Qt = {
          name: n.name,
          styles: n.styles,
          next: Qt
        }, n.name;
      var o = a;
      if (o.styles !== void 0) {
        var i = o.next;
        if (i !== void 0)
          for (; i !== void 0; )
            Qt = {
              name: i.name,
              styles: i.styles,
              next: Qt
            }, i = i.next;
        var s = o.styles + ";";
        return s;
      }
      return oy(e, t, a);
    }
    case "function": {
      if (e !== void 0) {
        var l = Qt, u = a(e);
        return Qt = l, zn(e, t, u);
      }
      break;
    }
  }
  var c = a;
  if (t == null)
    return c;
  var d = t[c];
  return d !== void 0 ? d : c;
}
function oy(e, t, a) {
  var r = "";
  if (Array.isArray(a))
    for (var n = 0; n < a.length; n++)
      r += zn(e, t, a[n]) + ";";
  else
    for (var o in a) {
      var i = a[o];
      if (typeof i != "object") {
        var s = i;
        t != null && t[s] !== void 0 ? r += o + "{" + t[s] + "}" : $l(s) && (r += Ho(o) + ":" + Rl(o, s) + ";");
      } else if (Array.isArray(i) && typeof i[0] == "string" && (t == null || t[i[0]] === void 0))
        for (var l = 0; l < i.length; l++)
          $l(i[l]) && (r += Ho(o) + ":" + Rl(o, i[l]) + ";");
      else {
        var u = zn(e, t, i);
        switch (o) {
          case "animation":
          case "animationName": {
            r += Ho(o) + ":" + u + ";";
            break;
          }
          default:
            r += o + "{" + u + "}";
        }
      }
    }
  return r;
}
var Tl = /label:\s*([^\s;{]+)\s*(;|$)/g, Qt;
function cu(e, t, a) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var r = !0, n = "";
  Qt = void 0;
  var o = e[0];
  if (o == null || o.raw === void 0)
    r = !1, n += zn(a, t, o);
  else {
    var i = o;
    n += i[0];
  }
  for (var s = 1; s < e.length; s++)
    if (n += zn(a, t, e[s]), r) {
      var l = o;
      n += l[s];
    }
  Tl.lastIndex = 0;
  for (var u = "", c; (c = Tl.exec(n)) !== null; )
    u += "-" + c[1];
  var d = ty(n) + u;
  return {
    name: d,
    styles: n,
    next: Qt
  };
}
var iy = function(t) {
  return t();
}, sy = _.useInsertionEffect ? _.useInsertionEffect : !1, ly = sy || iy, uu = /* @__PURE__ */ _.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ Jv({
    key: "css"
  }) : null
);
uu.Provider;
var cy = function(t) {
  return /* @__PURE__ */ Hl(function(a, r) {
    var n = Wu(uu);
    return t(a, n, r);
  });
}, uy = /* @__PURE__ */ _.createContext({}), dy = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, fy = /* @__PURE__ */ ou(
  function(e) {
    return dy.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), py = fy, hy = function(t) {
  return t !== "theme";
}, Ol = function(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96 ? py : hy;
}, _l = function(t, a, r) {
  var n;
  if (a) {
    var o = a.shouldForwardProp;
    n = t.__emotion_forwardProp && o ? function(i) {
      return t.__emotion_forwardProp(i) && o(i);
    } : o;
  }
  return typeof n != "function" && r && (n = t.__emotion_forwardProp), n;
}, my = function(t) {
  var a = t.cache, r = t.serialized, n = t.isStringTag;
  return su(a, r, n), ly(function() {
    return ey(a, r, n);
  }), null;
}, gy = function e(t, a) {
  var r = t.__emotion_real === t, n = r && t.__emotion_base || t, o, i;
  a !== void 0 && (o = a.label, i = a.target);
  var s = _l(t, a, r), l = s || Ol(n), u = !l("as");
  return function() {
    var c = arguments, d = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
    if (o !== void 0 && d.push("label:" + o + ";"), c[0] == null || c[0].raw === void 0)
      d.push.apply(d, c);
    else {
      var p = c[0];
      d.push(p[0]);
      for (var h = c.length, g = 1; g < h; g++)
        d.push(c[g], p[g]);
    }
    var m = cy(function(v, C, T) {
      var A = u && v.as || n, f = "", x = [], k = v;
      if (v.theme == null) {
        k = {};
        for (var D in v)
          k[D] = v[D];
        k.theme = _.useContext(uy);
      }
      typeof v.className == "string" ? f = Qv(C.registered, x, v.className) : v.className != null && (f = v.className + " ");
      var V = cu(d.concat(x), C.registered, k);
      f += C.key + "-" + V.name, i !== void 0 && (f += " " + i);
      var j = u && s === void 0 ? Ol(A) : l, M = {};
      for (var I in v)
        u && I === "as" || j(I) && (M[I] = v[I]);
      return M.className = f, T && (M.ref = T), /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(my, {
        cache: C,
        serialized: V,
        isStringTag: typeof A == "string"
      }), /* @__PURE__ */ _.createElement(A, M));
    });
    return m.displayName = o !== void 0 ? o : "Styled(" + (typeof n == "string" ? n : n.displayName || n.name || "Component") + ")", m.defaultProps = t.defaultProps, m.__emotion_real = m, m.__emotion_base = n, m.__emotion_styles = d, m.__emotion_forwardProp = s, Object.defineProperty(m, "toString", {
      value: function() {
        return "." + i;
      }
    }), m.withComponent = function(v, C) {
      var T = e(v, se({}, a, C, {
        shouldForwardProp: _l(m, C, !0)
      }));
      return T.apply(void 0, d);
    }, m;
  };
}, by = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
], xi = gy.bind(null);
by.forEach(function(e) {
  xi[e] = xi(e);
});
function vy(e, t) {
  return xi(e, t);
}
function yy(e, t) {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
const Pl = [];
function Ir(e) {
  return Pl[0] = e, cu(Pl);
}
const xy = (e) => {
  const t = Object.keys(e).map((a) => ({
    key: a,
    val: e[a]
  })) || [];
  return t.sort((a, r) => a.val - r.val), t.reduce((a, r) => ({
    ...a,
    [r.key]: r.val
  }), {});
};
function Sy(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: t = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit: a = "px",
    step: r = 5,
    ...n
  } = e, o = xy(t), i = Object.keys(o);
  function s(p) {
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${a})`;
  }
  function l(p) {
    return `@media (max-width:${(typeof t[p] == "number" ? t[p] : p) - r / 100}${a})`;
  }
  function u(p, h) {
    const g = i.indexOf(h);
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${a}) and (max-width:${(g !== -1 && typeof t[i[g]] == "number" ? t[i[g]] : h) - r / 100}${a})`;
  }
  function c(p) {
    return i.indexOf(p) + 1 < i.length ? u(p, i[i.indexOf(p) + 1]) : s(p);
  }
  function d(p) {
    const h = i.indexOf(p);
    return h === 0 ? s(i[1]) : h === i.length - 1 ? l(i[h]) : u(p, i[i.indexOf(p) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys: i,
    values: o,
    up: s,
    down: l,
    between: u,
    only: c,
    not: d,
    unit: a,
    ...n
  };
}
const wy = {
  borderRadius: 4
};
function du(e = 8, t = Xi({
  spacing: e
})) {
  if (e.mui)
    return e;
  const a = (...r) => (r.length === 0 ? [1] : r).map((o) => {
    const i = t(o);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" ");
  return a.mui = !0, a;
}
function Cy(e, t) {
  var r;
  const a = this;
  if (a.vars) {
    if (!((r = a.colorSchemes) != null && r[e]) || typeof a.getColorSchemeSelector != "function")
      return {};
    let n = a.getColorSchemeSelector(e);
    return n === "&" ? t : ((n.includes("data-") || n.includes(".")) && (n = `*:where(${n.replace(/\s*&$/, "")}) &`), {
      [n]: t
    });
  }
  return a.palette.mode === e ? t : {};
}
function fu(e = {}, ...t) {
  const {
    breakpoints: a = {},
    palette: r = {},
    spacing: n,
    shape: o = {},
    ...i
  } = e, s = Sy(a), l = du(n);
  let u = Ft({
    breakpoints: s,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...r
    },
    spacing: l,
    shape: {
      ...wy,
      ...o
    }
  }, i);
  return u = Ib(u), u.applyStyles = Cy, u = t.reduce((c, d) => Ft(c, d), u), u.unstable_sxConfig = {
    ...Qa,
    ...i == null ? void 0 : i.unstable_sxConfig
  }, u.unstable_sx = function(d) {
    return bn({
      sx: d,
      theme: this
    });
  }, u;
}
const Ey = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function pu(e, t, a = "Mui") {
  const r = Ey[t];
  return r ? `${a}-${r}` : `${Tb.generate(e)}-${t}`;
}
function ky(e, t, a = "Mui") {
  const r = {};
  return t.forEach((n) => {
    r[n] = pu(e, n, a);
  }), r;
}
function hu(e) {
  const {
    variants: t,
    ...a
  } = e, r = {
    variants: t,
    style: Ir(a),
    isProcessed: !0
  };
  return r.style === a || t && t.forEach((n) => {
    typeof n.style != "function" && (n.style = Ir(n.style));
  }), r;
}
const $y = fu();
function Ko(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function Ar(e, t) {
  return t && e && typeof e == "object" && e.styles && !e.styles.startsWith("@layer") && (e.styles = `@layer ${t}{${String(e.styles)}}`), e;
}
function Ry(e) {
  return e ? (t, a) => a[e] : null;
}
function Ty(e, t, a) {
  e.theme = Py(e.theme) ? a : e.theme[t] || e.theme;
}
function wa(e, t, a) {
  const r = typeof t == "function" ? t(e) : t;
  if (Array.isArray(r))
    return r.flatMap((n) => wa(e, n, a));
  if (Array.isArray(r == null ? void 0 : r.variants)) {
    let n;
    if (r.isProcessed)
      n = a ? Ar(r.style, a) : r.style;
    else {
      const {
        variants: o,
        ...i
      } = r;
      n = a ? Ar(Ir(i), a) : i;
    }
    return mu(e, r.variants, [n], a);
  }
  return r != null && r.isProcessed ? a ? Ar(Ir(r.style), a) : r.style : a ? Ar(Ir(r), a) : r;
}
function mu(e, t, a = [], r = void 0) {
  var o;
  let n;
  e: for (let i = 0; i < t.length; i += 1) {
    const s = t[i];
    if (typeof s.props == "function") {
      if (n ?? (n = {
        ...e,
        ...e.ownerState,
        ownerState: e.ownerState
      }), !s.props(n))
        continue;
    } else
      for (const l in s.props)
        if (e[l] !== s.props[l] && ((o = e.ownerState) == null ? void 0 : o[l]) !== s.props[l])
          continue e;
    typeof s.style == "function" ? (n ?? (n = {
      ...e,
      ...e.ownerState,
      ownerState: e.ownerState
    }), a.push(r ? Ar(Ir(s.style(n)), r) : s.style(n))) : a.push(r ? Ar(Ir(s.style), r) : s.style);
  }
  return a;
}
function Oy(e = {}) {
  const {
    themeId: t,
    defaultTheme: a = $y,
    rootShouldForwardProp: r = Ko,
    slotShouldForwardProp: n = Ko
  } = e;
  function o(s) {
    Ty(s, t, a);
  }
  return (s, l = {}) => {
    yy(s, (k) => k.filter((D) => D !== bn));
    const {
      name: u,
      slot: c,
      skipVariantsResolver: d,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: h = Ry(Ay(c)),
      ...g
    } = l, m = u && u.startsWith("Mui") || c ? "components" : "custom", v = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      c && c !== "Root" && c !== "root" || !1
    ), C = p || !1;
    let T = Ko;
    c === "Root" || c === "root" ? T = r : c ? T = n : jy(s) && (T = void 0);
    const A = vy(s, {
      shouldForwardProp: T,
      label: _y(),
      ...g
    }), f = (k) => {
      if (k.__emotion_real === k)
        return k;
      if (typeof k == "function")
        return function(V) {
          return wa(V, k, V.theme.modularCssLayers ? m : void 0);
        };
      if (ir(k)) {
        const D = hu(k);
        return function(j) {
          return D.variants ? wa(j, D, j.theme.modularCssLayers ? m : void 0) : j.theme.modularCssLayers ? Ar(D.style, m) : D.style;
        };
      }
      return k;
    }, x = (...k) => {
      const D = [], V = k.map(f), j = [];
      if (D.push(o), u && h && j.push(function(S) {
        var U, B;
        const N = (B = (U = S.theme.components) == null ? void 0 : U[u]) == null ? void 0 : B.styleOverrides;
        if (!N)
          return null;
        const R = {};
        for (const J in N)
          R[J] = wa(S, N[J], S.theme.modularCssLayers ? "theme" : void 0);
        return h(S, R);
      }), u && !v && j.push(function(S) {
        var R, U;
        const L = S.theme, N = (U = (R = L == null ? void 0 : L.components) == null ? void 0 : R[u]) == null ? void 0 : U.variants;
        return N ? mu(S, N, [], S.theme.modularCssLayers ? "theme" : void 0) : null;
      }), C || j.push(bn), Array.isArray(V[0])) {
        const b = V.shift(), S = new Array(D.length).fill(""), L = new Array(j.length).fill("");
        let N;
        N = [...S, ...b, ...L], N.raw = [...S, ...b.raw, ...L], D.unshift(N);
      }
      const M = [...D, ...V, ...j], I = A(...M);
      return s.muiName && (I.muiName = s.muiName), I;
    };
    return A.withConfig && (x.withConfig = A.withConfig), x;
  };
}
function _y(e, t) {
  return void 0;
}
function Py(e) {
  for (const t in e)
    return !1;
  return !0;
}
function jy(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Ay(e) {
  return e && e.charAt(0).toLowerCase() + e.slice(1);
}
function gu(e) {
  var t, a, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (t = 0; t < n; t++) e[t] && (a = gu(e[t])) && (r && (r += " "), r += a);
  } else for (a in e) e[a] && (r && (r += " "), r += a);
  return r;
}
function My() {
  for (var e, t, a = 0, r = "", n = arguments.length; a < n; a++) (e = arguments[a]) && (t = gu(e)) && (r && (r += " "), r += t);
  return r;
}
function Si(e, t, a = !1) {
  const r = {
    ...t
  };
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      const o = n;
      if (o === "components" || o === "slots")
        r[o] = {
          ...e[o],
          ...r[o]
        };
      else if (o === "componentsProps" || o === "slotProps") {
        const i = e[o], s = t[o];
        if (!s)
          r[o] = i || {};
        else if (!i)
          r[o] = s;
        else {
          r[o] = {
            ...s
          };
          for (const l in i)
            if (Object.prototype.hasOwnProperty.call(i, l)) {
              const u = l;
              r[o][u] = Si(i[u], s[u], a);
            }
        }
      } else o === "className" && a && t.className ? r.className = My(e == null ? void 0 : e.className, t == null ? void 0 : t.className) : o === "style" && a && t.style ? r.style = {
        ...e == null ? void 0 : e.style,
        ...t == null ? void 0 : t.style
      } : r[o] === void 0 && (r[o] = e[o]);
    }
  return r;
}
function Iy(e, t = Number.MIN_SAFE_INTEGER, a = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, a));
}
function ts(e, t = 0, a = 1) {
  return Iy(e, t, a);
}
function Ly(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let a = e.match(t);
  return a && a[0].length === 1 && (a = a.map((r) => r + r)), a ? `rgb${a.length === 4 ? "a" : ""}(${a.map((r, n) => n < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Sr(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Sr(Ly(e));
  const t = e.indexOf("("), a = e.substring(0, t);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(a))
    throw new Error(Br(9, e));
  let r = e.substring(t + 1, e.length - 1), n;
  if (a === "color") {
    if (r = r.split(" "), n = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(n))
      throw new Error(Br(10, n));
  } else
    r = r.split(",");
  return r = r.map((o) => parseFloat(o)), {
    type: a,
    values: r,
    colorSpace: n
  };
}
const Dy = (e) => {
  const t = Sr(e);
  return t.values.slice(0, 3).map((a, r) => t.type.includes("hsl") && r !== 0 ? `${a}%` : a).join(" ");
}, jn = (e, t) => {
  try {
    return Dy(e);
  } catch {
    return e;
  }
};
function no(e) {
  const {
    type: t,
    colorSpace: a
  } = e;
  let {
    values: r
  } = e;
  return t.includes("rgb") ? r = r.map((n, o) => o < 3 ? parseInt(n, 10) : n) : t.includes("hsl") && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.includes("color") ? r = `${a} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function bu(e) {
  e = Sr(e);
  const {
    values: t
  } = e, a = t[0], r = t[1] / 100, n = t[2] / 100, o = r * Math.min(n, 1 - n), i = (u, c = (u + a / 30) % 12) => n - o * Math.max(Math.min(c - 3, 9 - c, 1), -1);
  let s = "rgb";
  const l = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (s += "a", l.push(t[3])), no({
    type: s,
    values: l
  });
}
function wi(e) {
  e = Sr(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Sr(bu(e)).values : e.values;
  return t = t.map((a) => (e.type !== "color" && (a /= 255), a <= 0.03928 ? a / 12.92 : ((a + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ny(e, t) {
  const a = wi(e), r = wi(t);
  return (Math.max(a, r) + 0.05) / (Math.min(a, r) + 0.05);
}
function vu(e, t) {
  return e = Sr(e), t = ts(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, no(e);
}
function Tr(e, t, a) {
  try {
    return vu(e, t);
  } catch {
    return e;
  }
}
function ao(e, t) {
  if (e = Sr(e), t = ts(t), e.type.includes("hsl"))
    e.values[2] *= 1 - t;
  else if (e.type.includes("rgb") || e.type.includes("color"))
    for (let a = 0; a < 3; a += 1)
      e.values[a] *= 1 - t;
  return no(e);
}
function ot(e, t, a) {
  try {
    return ao(e, t);
  } catch {
    return e;
  }
}
function oo(e, t) {
  if (e = Sr(e), t = ts(t), e.type.includes("hsl"))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.includes("rgb"))
    for (let a = 0; a < 3; a += 1)
      e.values[a] += (255 - e.values[a]) * t;
  else if (e.type.includes("color"))
    for (let a = 0; a < 3; a += 1)
      e.values[a] += (1 - e.values[a]) * t;
  return no(e);
}
function it(e, t, a) {
  try {
    return oo(e, t);
  } catch {
    return e;
  }
}
function By(e, t = 0.15) {
  return wi(e) > 0.5 ? ao(e, t) : oo(e, t);
}
function ua(e, t, a) {
  try {
    return By(e, t);
  } catch {
    return e;
  }
}
const Fy = /* @__PURE__ */ _.createContext(void 0);
function zy(e) {
  const {
    theme: t,
    name: a,
    props: r
  } = e;
  if (!t || !t.components || !t.components[a])
    return r;
  const n = t.components[a];
  return n.defaultProps ? Si(n.defaultProps, r, t.components.mergeClassNameAndStyle) : !n.styleOverrides && !n.variants ? Si(n, r, t.components.mergeClassNameAndStyle) : r;
}
function Wy({
  props: e,
  name: t
}) {
  const a = _.useContext(Fy);
  return zy({
    props: e,
    name: t,
    theme: {
      components: a
    }
  });
}
const jl = {
  theme: void 0
};
function Vy(e) {
  let t, a;
  return function(n) {
    let o = t;
    return (o === void 0 || n.theme !== a) && (jl.theme = n.theme, o = hu(e(jl)), t = o, a = n.theme), o;
  };
}
function Hy(e = "") {
  function t(...r) {
    if (!r.length)
      return "";
    const n = r[0];
    return typeof n == "string" && !n.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${n}${t(...r.slice(1))})` : `, ${n}`;
  }
  return (r, ...n) => `var(--${e ? `${e}-` : ""}${r}${t(...n)})`;
}
const Al = (e, t, a, r = []) => {
  let n = e;
  t.forEach((o, i) => {
    i === t.length - 1 ? Array.isArray(n) ? n[Number(o)] = a : n && typeof n == "object" && (n[o] = a) : n && typeof n == "object" && (n[o] || (n[o] = r.includes(o) ? [] : {}), n = n[o]);
  });
}, Ky = (e, t, a) => {
  function r(n, o = [], i = []) {
    Object.entries(n).forEach(([s, l]) => {
      (!a || a && !a([...o, s])) && l != null && (typeof l == "object" && Object.keys(l).length > 0 ? r(l, [...o, s], Array.isArray(l) ? [...i, s] : i) : t([...o, s], l, i));
    });
  }
  r(e);
}, qy = (e, t) => typeof t == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((r) => e.includes(r)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function qo(e, t) {
  const {
    prefix: a,
    shouldSkipGeneratingVar: r
  } = t || {}, n = {}, o = {}, i = {};
  return Ky(
    e,
    (s, l, u) => {
      if ((typeof l == "string" || typeof l == "number") && (!r || !r(s, l))) {
        const c = `--${a ? `${a}-` : ""}${s.join("-")}`, d = qy(s, l);
        Object.assign(n, {
          [c]: d
        }), Al(o, s, `var(${c})`, u), Al(i, s, `var(${c}, ${d})`, u);
      }
    },
    (s) => s[0] === "vars"
    // skip 'vars/*' paths
  ), {
    css: n,
    vars: o,
    varsWithDefaults: i
  };
}
function Uy(e, t = {}) {
  const {
    getSelector: a = C,
    disableCssColorScheme: r,
    colorSchemeSelector: n,
    enableContrastVars: o
  } = t, {
    colorSchemes: i = {},
    components: s,
    defaultColorScheme: l = "light",
    ...u
  } = e, {
    vars: c,
    css: d,
    varsWithDefaults: p
  } = qo(u, t);
  let h = p;
  const g = {}, {
    [l]: m,
    ...v
  } = i;
  if (Object.entries(v || {}).forEach(([f, x]) => {
    const {
      vars: k,
      css: D,
      varsWithDefaults: V
    } = qo(x, t);
    h = Ft(h, V), g[f] = {
      css: D,
      vars: k
    };
  }), m) {
    const {
      css: f,
      vars: x,
      varsWithDefaults: k
    } = qo(m, t);
    h = Ft(h, k), g[l] = {
      css: f,
      vars: x
    };
  }
  function C(f, x) {
    var D, V;
    let k = n;
    if (n === "class" && (k = ".%s"), n === "data" && (k = "[data-%s]"), n != null && n.startsWith("data-") && !n.includes("%s") && (k = `[${n}="%s"]`), f) {
      if (k === "media")
        return e.defaultColorScheme === f ? ":root" : {
          [`@media (prefers-color-scheme: ${((V = (D = i[f]) == null ? void 0 : D.palette) == null ? void 0 : V.mode) || f})`]: {
            ":root": x
          }
        };
      if (k)
        return e.defaultColorScheme === f ? `:root, ${k.replace("%s", String(f))}` : k.replace("%s", String(f));
    }
    return ":root";
  }
  return {
    vars: h,
    generateThemeVars: () => {
      let f = {
        ...c
      };
      return Object.entries(g).forEach(([, {
        vars: x
      }]) => {
        f = Ft(f, x);
      }), f;
    },
    generateStyleSheets: () => {
      var j, M;
      const f = [], x = e.defaultColorScheme || "light";
      function k(I, b) {
        Object.keys(b).length && f.push(typeof I == "string" ? {
          [I]: {
            ...b
          }
        } : I);
      }
      k(a(void 0, {
        ...d
      }), d);
      const {
        [x]: D,
        ...V
      } = g;
      if (D) {
        const {
          css: I
        } = D, b = (M = (j = i[x]) == null ? void 0 : j.palette) == null ? void 0 : M.mode, S = !r && b ? {
          colorScheme: b,
          ...I
        } : {
          ...I
        };
        k(a(x, {
          ...S
        }), S);
      }
      return Object.entries(V).forEach(([I, {
        css: b
      }]) => {
        var N, R;
        const S = (R = (N = i[I]) == null ? void 0 : N.palette) == null ? void 0 : R.mode, L = !r && S ? {
          colorScheme: S,
          ...b
        } : {
          ...b
        };
        k(a(I, {
          ...L
        }), L);
      }), o && f.push({
        ":root": {
          // use double underscore to indicate that these are private variables
          "--__l-threshold": "0.7",
          "--__l": "clamp(0, (l / var(--__l-threshold) - 1) * -infinity, 1)",
          "--__a": "clamp(0.87, (l / var(--__l-threshold) - 1) * -infinity, 1)"
          // 0.87 is the default alpha value for black text.
        }
      }), f;
    }
  };
}
function Gy(e) {
  return function(a) {
    return e === "media" ? `@media (prefers-color-scheme: ${a})` : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${a}"] &` : e === "class" ? `.${a} &` : e === "data" ? `[data-${a}] &` : `${e.replace("%s", a)} &` : "&";
  };
}
const Wn = {
  black: "#000",
  white: "#fff"
}, Yy = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
}, tn = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, rn = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, Rn = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, nn = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, an = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, on = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
};
function yu() {
  return {
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: "rgba(0, 0, 0, 0.87)",
      // Secondary text.
      secondary: "rgba(0, 0, 0, 0.6)",
      // Disabled text have even lower visual prominence.
      disabled: "rgba(0, 0, 0, 0.38)"
    },
    // The color used to divide different elements.
    divider: "rgba(0, 0, 0, 0.12)",
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: Wn.white,
      default: Wn.white
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: "rgba(0, 0, 0, 0.54)",
      // The color of an hovered action.
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      // The color of a selected action.
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: "rgba(0, 0, 0, 0.26)",
      // The background color of a disabled action.
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  };
}
const xu = yu();
function Su() {
  return {
    text: {
      primary: Wn.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)"
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#121212",
      default: "#121212"
    },
    action: {
      active: Wn.white,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24
    }
  };
}
const Ci = Su();
function Ml(e, t, a, r) {
  const n = r.light || r, o = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(a) ? e[t] = e[a] : t === "light" ? e.light = oo(e.main, n) : t === "dark" && (e.dark = ao(e.main, o)));
}
function Il(e, t, a, r, n) {
  const o = n.light || n, i = n.dark || n * 1.5;
  t[a] || (t.hasOwnProperty(r) ? t[a] = t[r] : a === "light" ? t.light = `color-mix(in ${e}, ${t.main}, #fff ${(o * 100).toFixed(0)}%)` : a === "dark" && (t.dark = `color-mix(in ${e}, ${t.main}, #000 ${(i * 100).toFixed(0)}%)`));
}
function Xy(e = "light") {
  return e === "dark" ? {
    main: nn[200],
    light: nn[50],
    dark: nn[400]
  } : {
    main: nn[700],
    light: nn[400],
    dark: nn[800]
  };
}
function Jy(e = "light") {
  return e === "dark" ? {
    main: tn[200],
    light: tn[50],
    dark: tn[400]
  } : {
    main: tn[500],
    light: tn[300],
    dark: tn[700]
  };
}
function Zy(e = "light") {
  return e === "dark" ? {
    main: rn[500],
    light: rn[300],
    dark: rn[700]
  } : {
    main: rn[700],
    light: rn[400],
    dark: rn[800]
  };
}
function Qy(e = "light") {
  return e === "dark" ? {
    main: an[400],
    light: an[300],
    dark: an[700]
  } : {
    main: an[700],
    light: an[500],
    dark: an[900]
  };
}
function e1(e = "light") {
  return e === "dark" ? {
    main: on[400],
    light: on[300],
    dark: on[700]
  } : {
    main: on[800],
    light: on[500],
    dark: on[900]
  };
}
function t1(e = "light") {
  return e === "dark" ? {
    main: Rn[400],
    light: Rn[300],
    dark: Rn[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Rn[500],
    dark: Rn[900]
  };
}
function r1(e) {
  return `oklch(from ${e} var(--__l) 0 h / var(--__a))`;
}
function rs(e) {
  const {
    mode: t = "light",
    contrastThreshold: a = 3,
    tonalOffset: r = 0.2,
    colorSpace: n,
    ...o
  } = e, i = e.primary || Xy(t), s = e.secondary || Jy(t), l = e.error || Zy(t), u = e.info || Qy(t), c = e.success || e1(t), d = e.warning || t1(t);
  function p(v) {
    return n ? r1(v) : Ny(v, Ci.text.primary) >= a ? Ci.text.primary : xu.text.primary;
  }
  const h = ({
    color: v,
    name: C,
    mainShade: T = 500,
    lightShade: A = 300,
    darkShade: f = 700
  }) => {
    if (v = {
      ...v
    }, !v.main && v[T] && (v.main = v[T]), !v.hasOwnProperty("main"))
      throw new Error(Br(11, C ? ` (${C})` : "", T));
    if (typeof v.main != "string")
      throw new Error(Br(12, C ? ` (${C})` : "", JSON.stringify(v.main)));
    return n ? (Il(n, v, "light", A, r), Il(n, v, "dark", f, r)) : (Ml(v, "light", A, r), Ml(v, "dark", f, r)), v.contrastText || (v.contrastText = p(v.main)), v;
  };
  let g;
  return t === "light" ? g = yu() : t === "dark" && (g = Su()), Ft({
    // A collection of common colors.
    common: {
      ...Wn
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: h({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: h({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: h({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: h({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: h({
      color: u,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: h({
      color: c,
      name: "success"
    }),
    // The grey colors.
    grey: Yy,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: a,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: p,
    // Generate a rich color object.
    augmentColor: h,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r,
    // The light and dark mode object.
    ...g
  }, o);
}
function n1(e) {
  const t = {};
  return Object.entries(e).forEach((r) => {
    const [n, o] = r;
    typeof o == "object" && (t[n] = `${o.fontStyle ? `${o.fontStyle} ` : ""}${o.fontVariant ? `${o.fontVariant} ` : ""}${o.fontWeight ? `${o.fontWeight} ` : ""}${o.fontStretch ? `${o.fontStretch} ` : ""}${o.fontSize || ""}${o.lineHeight ? `/${o.lineHeight} ` : ""}${o.fontFamily || ""}`);
  }), t;
}
function a1(e, t) {
  return {
    toolbar: {
      minHeight: 56,
      [e.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [e.up("sm")]: {
        minHeight: 64
      }
    },
    ...t
  };
}
function o1(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ll = {
  textTransform: "uppercase"
}, Dl = '"Roboto", "Helvetica", "Arial", sans-serif';
function i1(e, t) {
  const {
    fontFamily: a = Dl,
    // The default font size of the Material Specification.
    fontSize: r = 14,
    // px
    fontWeightLight: n = 300,
    fontWeightRegular: o = 400,
    fontWeightMedium: i = 500,
    fontWeightBold: s = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: l = 16,
    // Apply the CSS properties to all the variants.
    allVariants: u,
    pxToRem: c,
    ...d
  } = typeof t == "function" ? t(e) : t, p = r / 14, h = c || ((v) => `${v / l * p}rem`), g = (v, C, T, A, f) => ({
    fontFamily: a,
    fontWeight: v,
    fontSize: h(C),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: T,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...a === Dl ? {
      letterSpacing: `${o1(A / C)}em`
    } : {},
    ...f,
    ...u
  }), m = {
    h1: g(n, 96, 1.167, -1.5),
    h2: g(n, 60, 1.2, -0.5),
    h3: g(o, 48, 1.167, 0),
    h4: g(o, 34, 1.235, 0.25),
    h5: g(o, 24, 1.334, 0),
    h6: g(i, 20, 1.6, 0.15),
    subtitle1: g(o, 16, 1.75, 0.15),
    subtitle2: g(i, 14, 1.57, 0.1),
    body1: g(o, 16, 1.5, 0.15),
    body2: g(o, 14, 1.43, 0.15),
    button: g(i, 14, 1.75, 0.4, Ll),
    caption: g(o, 12, 1.66, 0.4),
    overline: g(o, 12, 2.66, 1, Ll),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Ft({
    htmlFontSize: l,
    pxToRem: h,
    fontFamily: a,
    fontSize: r,
    fontWeightLight: n,
    fontWeightRegular: o,
    fontWeightMedium: i,
    fontWeightBold: s,
    ...m
  }, d, {
    clone: !1
    // No need to clone deep
  });
}
const s1 = 0.2, l1 = 0.14, c1 = 0.12;
function xt(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${s1})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${l1})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${c1})`].join(",");
}
const u1 = ["none", xt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), xt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), xt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), xt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), xt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), xt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), xt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), xt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), xt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), xt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), xt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), xt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), xt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), xt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), xt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), xt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), xt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), xt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), xt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), xt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), xt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), xt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), xt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), xt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], d1 = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, f1 = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function Nl(e) {
  return `${Math.round(e)}ms`;
}
function p1(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.min(Math.round((4 + 15 * t ** 0.25 + t / 5) * 10), 3e3);
}
function h1(e) {
  const t = {
    ...d1,
    ...e.easing
  }, a = {
    ...f1,
    ...e.duration
  };
  return {
    getAutoHeightDuration: p1,
    create: (n = ["all"], o = {}) => {
      const {
        duration: i = a.standard,
        easing: s = t.easeInOut,
        delay: l = 0,
        ...u
      } = o;
      return (Array.isArray(n) ? n : [n]).map((c) => `${c} ${typeof i == "string" ? i : Nl(i)} ${s} ${typeof l == "string" ? l : Nl(l)}`).join(",");
    },
    ...e,
    easing: t,
    duration: a
  };
}
const m1 = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function g1(e) {
  return ir(e) || typeof e > "u" || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function wu(e = {}) {
  const t = {
    ...e
  };
  function a(r) {
    const n = Object.entries(r);
    for (let o = 0; o < n.length; o++) {
      const [i, s] = n[o];
      !g1(s) || i.startsWith("unstable_") ? delete r[i] : ir(s) && (r[i] = {
        ...s
      }, a(r[i]));
    }
  }
  return a(t), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(t, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function Bl(e) {
  return typeof e == "number" ? `${(e * 100).toFixed(0)}%` : `calc((${e}) * 100%)`;
}
const b1 = (e) => {
  if (!Number.isNaN(+e))
    return +e;
  const t = e.match(/\d*\.?\d+/g);
  if (!t)
    return 0;
  let a = 0;
  for (let r = 0; r < t.length; r += 1)
    a += +t[r];
  return a;
};
function v1(e) {
  Object.assign(e, {
    alpha(t, a) {
      const r = this || e;
      return r.colorSpace ? `oklch(from ${t} l c h / ${typeof a == "string" ? `calc(${a})` : a})` : r.vars ? `rgba(${t.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, "var(--$1Channel)")} / ${typeof a == "string" ? `calc(${a})` : a})` : vu(t, b1(a));
    },
    lighten(t, a) {
      const r = this || e;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #fff ${Bl(a)})` : oo(t, a);
    },
    darken(t, a) {
      const r = this || e;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #000 ${Bl(a)})` : ao(t, a);
    }
  });
}
function Ei(e = {}, ...t) {
  const {
    breakpoints: a,
    mixins: r = {},
    spacing: n,
    palette: o = {},
    transitions: i = {},
    typography: s = {},
    shape: l,
    colorSpace: u,
    ...c
  } = e;
  if (e.vars && // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
  // `generateThemeVars` is the closest identifier for checking that the `options` is a result of `createTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
  e.generateThemeVars === void 0)
    throw new Error(Br(20));
  const d = rs({
    ...o,
    colorSpace: u
  }), p = fu(e);
  let h = Ft(p, {
    mixins: a1(p.breakpoints, r),
    palette: d,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: u1.slice(),
    typography: i1(d, s),
    transitions: h1(i),
    zIndex: {
      ...m1
    }
  });
  return h = Ft(h, c), h = t.reduce((g, m) => Ft(g, m), h), h.unstable_sxConfig = {
    ...Qa,
    ...c == null ? void 0 : c.unstable_sxConfig
  }, h.unstable_sx = function(m) {
    return bn({
      sx: m,
      theme: this
    });
  }, h.toRuntimeSource = wu, v1(h), h;
}
function y1(e) {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
const x1 = [...Array(25)].map((e, t) => {
  if (t === 0)
    return "none";
  const a = y1(t);
  return `linear-gradient(rgba(255 255 255 / ${a}), rgba(255 255 255 / ${a}))`;
});
function Cu(e) {
  return {
    inputPlaceholder: e === "dark" ? 0.5 : 0.42,
    inputUnderline: e === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: e === "dark" ? 0.2 : 0.12,
    switchTrack: e === "dark" ? 0.3 : 0.38
  };
}
function Eu(e) {
  return e === "dark" ? x1 : [];
}
function S1(e) {
  const {
    palette: t = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: a,
    overlays: r,
    colorSpace: n,
    ...o
  } = e, i = rs({
    ...t,
    colorSpace: n
  });
  return {
    palette: i,
    opacity: {
      ...Cu(i.mode),
      ...a
    },
    overlays: r || Eu(i.mode),
    ...o
  };
}
function w1(e) {
  var t;
  return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || // ends with sxConfig
  e[0] === "palette" && !!((t = e[1]) != null && t.match(/(mode|contrastThreshold|tonalOffset)/));
}
const C1 = (e) => [...[...Array(25)].map((t, a) => `--${e ? `${e}-` : ""}overlays-${a}`), `--${e ? `${e}-` : ""}palette-AppBar-darkBg`, `--${e ? `${e}-` : ""}palette-AppBar-darkColor`], E1 = (e) => (t, a) => {
  const r = e.rootSelector || ":root", n = e.colorSchemeSelector;
  let o = n;
  if (n === "class" && (o = ".%s"), n === "data" && (o = "[data-%s]"), n != null && n.startsWith("data-") && !n.includes("%s") && (o = `[${n}="%s"]`), e.defaultColorScheme === t) {
    if (t === "dark") {
      const i = {};
      return C1(e.cssVarPrefix).forEach((s) => {
        i[s] = a[s], delete a[s];
      }), o === "media" ? {
        [r]: a,
        "@media (prefers-color-scheme: dark)": {
          [r]: i
        }
      } : o ? {
        [o.replace("%s", t)]: i,
        [`${r}, ${o.replace("%s", t)}`]: a
      } : {
        [r]: {
          ...a,
          ...i
        }
      };
    }
    if (o && o !== "media")
      return `${r}, ${o.replace("%s", String(t))}`;
  } else if (t) {
    if (o === "media")
      return {
        [`@media (prefers-color-scheme: ${String(t)})`]: {
          [r]: a
        }
      };
    if (o)
      return o.replace("%s", String(t));
  }
  return r;
};
function k1(e, t) {
  t.forEach((a) => {
    e[a] || (e[a] = {});
  });
}
function ee(e, t, a) {
  !e[t] && a && (e[t] = a);
}
function An(e) {
  return typeof e != "string" || !e.startsWith("hsl") ? e : bu(e);
}
function or(e, t) {
  `${t}Channel` in e || (e[`${t}Channel`] = jn(An(e[t])));
}
function $1(e) {
  return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
const Jt = (e) => {
  try {
    return e();
  } catch {
  }
}, R1 = (e = "mui") => Hy(e);
function Uo(e, t, a, r, n) {
  if (!a)
    return;
  a = a === !0 ? {} : a;
  const o = n === "dark" ? "dark" : "light";
  if (!r) {
    t[n] = S1({
      ...a,
      palette: {
        mode: o,
        ...a == null ? void 0 : a.palette
      },
      colorSpace: e
    });
    return;
  }
  const {
    palette: i,
    ...s
  } = Ei({
    ...r,
    palette: {
      mode: o,
      ...a == null ? void 0 : a.palette
    },
    colorSpace: e
  });
  return t[n] = {
    ...a,
    palette: i,
    opacity: {
      ...Cu(o),
      ...a == null ? void 0 : a.opacity
    },
    overlays: (a == null ? void 0 : a.overlays) || Eu(o)
  }, s;
}
function T1(e = {}, ...t) {
  const {
    colorSchemes: a = {
      light: !0
    },
    defaultColorScheme: r,
    disableCssColorScheme: n = !1,
    cssVarPrefix: o = "mui",
    nativeColor: i = !1,
    shouldSkipGeneratingVar: s = w1,
    colorSchemeSelector: l = a.light && a.dark ? "media" : void 0,
    rootSelector: u = ":root",
    ...c
  } = e, d = Object.keys(a)[0], p = r || (a.light && d !== "light" ? "light" : d), h = R1(o), {
    [p]: g,
    light: m,
    dark: v,
    ...C
  } = a, T = {
    ...C
  };
  let A = g;
  if ((p === "dark" && !("dark" in a) || p === "light" && !("light" in a)) && (A = !0), !A)
    throw new Error(Br(21, p));
  let f;
  i && (f = "oklch");
  const x = Uo(f, T, A, c, p);
  m && !T.light && Uo(f, T, m, void 0, "light"), v && !T.dark && Uo(f, T, v, void 0, "dark");
  let k = {
    defaultColorScheme: p,
    ...x,
    cssVarPrefix: o,
    colorSchemeSelector: l,
    rootSelector: u,
    getCssVar: h,
    colorSchemes: T,
    font: {
      ...n1(x.typography),
      ...x.font
    },
    spacing: $1(c.spacing)
  };
  Object.keys(k.colorSchemes).forEach((I) => {
    const b = k.colorSchemes[I].palette, S = (N) => {
      const R = N.split("-"), U = R[1], B = R[2];
      return h(N, b[U][B]);
    };
    b.mode === "light" && (ee(b.common, "background", "#fff"), ee(b.common, "onBackground", "#000")), b.mode === "dark" && (ee(b.common, "background", "#000"), ee(b.common, "onBackground", "#fff"));
    function L(N, R, U) {
      if (f) {
        let B;
        return N === Tr && (B = `transparent ${((1 - U) * 100).toFixed(0)}%`), N === ot && (B = `#000 ${(U * 100).toFixed(0)}%`), N === it && (B = `#fff ${(U * 100).toFixed(0)}%`), `color-mix(in ${f}, ${R}, ${B})`;
      }
      return N(R, U);
    }
    if (k1(b, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), b.mode === "light") {
      ee(b.Alert, "errorColor", L(ot, b.error.light, 0.6)), ee(b.Alert, "infoColor", L(ot, b.info.light, 0.6)), ee(b.Alert, "successColor", L(ot, b.success.light, 0.6)), ee(b.Alert, "warningColor", L(ot, b.warning.light, 0.6)), ee(b.Alert, "errorFilledBg", S("palette-error-main")), ee(b.Alert, "infoFilledBg", S("palette-info-main")), ee(b.Alert, "successFilledBg", S("palette-success-main")), ee(b.Alert, "warningFilledBg", S("palette-warning-main")), ee(b.Alert, "errorFilledColor", Jt(() => b.getContrastText(b.error.main))), ee(b.Alert, "infoFilledColor", Jt(() => b.getContrastText(b.info.main))), ee(b.Alert, "successFilledColor", Jt(() => b.getContrastText(b.success.main))), ee(b.Alert, "warningFilledColor", Jt(() => b.getContrastText(b.warning.main))), ee(b.Alert, "errorStandardBg", L(it, b.error.light, 0.9)), ee(b.Alert, "infoStandardBg", L(it, b.info.light, 0.9)), ee(b.Alert, "successStandardBg", L(it, b.success.light, 0.9)), ee(b.Alert, "warningStandardBg", L(it, b.warning.light, 0.9)), ee(b.Alert, "errorIconColor", S("palette-error-main")), ee(b.Alert, "infoIconColor", S("palette-info-main")), ee(b.Alert, "successIconColor", S("palette-success-main")), ee(b.Alert, "warningIconColor", S("palette-warning-main")), ee(b.AppBar, "defaultBg", S("palette-grey-100")), ee(b.Avatar, "defaultBg", S("palette-grey-400")), ee(b.Button, "inheritContainedBg", S("palette-grey-300")), ee(b.Button, "inheritContainedHoverBg", S("palette-grey-A100")), ee(b.Chip, "defaultBorder", S("palette-grey-400")), ee(b.Chip, "defaultAvatarColor", S("palette-grey-700")), ee(b.Chip, "defaultIconColor", S("palette-grey-700")), ee(b.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), ee(b.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), ee(b.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), ee(b.LinearProgress, "primaryBg", L(it, b.primary.main, 0.62)), ee(b.LinearProgress, "secondaryBg", L(it, b.secondary.main, 0.62)), ee(b.LinearProgress, "errorBg", L(it, b.error.main, 0.62)), ee(b.LinearProgress, "infoBg", L(it, b.info.main, 0.62)), ee(b.LinearProgress, "successBg", L(it, b.success.main, 0.62)), ee(b.LinearProgress, "warningBg", L(it, b.warning.main, 0.62)), ee(b.Skeleton, "bg", f ? L(Tr, b.text.primary, 0.11) : `rgba(${S("palette-text-primaryChannel")} / 0.11)`), ee(b.Slider, "primaryTrack", L(it, b.primary.main, 0.62)), ee(b.Slider, "secondaryTrack", L(it, b.secondary.main, 0.62)), ee(b.Slider, "errorTrack", L(it, b.error.main, 0.62)), ee(b.Slider, "infoTrack", L(it, b.info.main, 0.62)), ee(b.Slider, "successTrack", L(it, b.success.main, 0.62)), ee(b.Slider, "warningTrack", L(it, b.warning.main, 0.62));
      const N = f ? L(ot, b.background.default, 0.6825) : ua(b.background.default, 0.8);
      ee(b.SnackbarContent, "bg", N), ee(b.SnackbarContent, "color", Jt(() => f ? Ci.text.primary : b.getContrastText(N))), ee(b.SpeedDialAction, "fabHoverBg", ua(b.background.paper, 0.15)), ee(b.StepConnector, "border", S("palette-grey-400")), ee(b.StepContent, "border", S("palette-grey-400")), ee(b.Switch, "defaultColor", S("palette-common-white")), ee(b.Switch, "defaultDisabledColor", S("palette-grey-100")), ee(b.Switch, "primaryDisabledColor", L(it, b.primary.main, 0.62)), ee(b.Switch, "secondaryDisabledColor", L(it, b.secondary.main, 0.62)), ee(b.Switch, "errorDisabledColor", L(it, b.error.main, 0.62)), ee(b.Switch, "infoDisabledColor", L(it, b.info.main, 0.62)), ee(b.Switch, "successDisabledColor", L(it, b.success.main, 0.62)), ee(b.Switch, "warningDisabledColor", L(it, b.warning.main, 0.62)), ee(b.TableCell, "border", L(it, L(Tr, b.divider, 1), 0.88)), ee(b.Tooltip, "bg", L(Tr, b.grey[700], 0.92));
    }
    if (b.mode === "dark") {
      ee(b.Alert, "errorColor", L(it, b.error.light, 0.6)), ee(b.Alert, "infoColor", L(it, b.info.light, 0.6)), ee(b.Alert, "successColor", L(it, b.success.light, 0.6)), ee(b.Alert, "warningColor", L(it, b.warning.light, 0.6)), ee(b.Alert, "errorFilledBg", S("palette-error-dark")), ee(b.Alert, "infoFilledBg", S("palette-info-dark")), ee(b.Alert, "successFilledBg", S("palette-success-dark")), ee(b.Alert, "warningFilledBg", S("palette-warning-dark")), ee(b.Alert, "errorFilledColor", Jt(() => b.getContrastText(b.error.dark))), ee(b.Alert, "infoFilledColor", Jt(() => b.getContrastText(b.info.dark))), ee(b.Alert, "successFilledColor", Jt(() => b.getContrastText(b.success.dark))), ee(b.Alert, "warningFilledColor", Jt(() => b.getContrastText(b.warning.dark))), ee(b.Alert, "errorStandardBg", L(ot, b.error.light, 0.9)), ee(b.Alert, "infoStandardBg", L(ot, b.info.light, 0.9)), ee(b.Alert, "successStandardBg", L(ot, b.success.light, 0.9)), ee(b.Alert, "warningStandardBg", L(ot, b.warning.light, 0.9)), ee(b.Alert, "errorIconColor", S("palette-error-main")), ee(b.Alert, "infoIconColor", S("palette-info-main")), ee(b.Alert, "successIconColor", S("palette-success-main")), ee(b.Alert, "warningIconColor", S("palette-warning-main")), ee(b.AppBar, "defaultBg", S("palette-grey-900")), ee(b.AppBar, "darkBg", S("palette-background-paper")), ee(b.AppBar, "darkColor", S("palette-text-primary")), ee(b.Avatar, "defaultBg", S("palette-grey-600")), ee(b.Button, "inheritContainedBg", S("palette-grey-800")), ee(b.Button, "inheritContainedHoverBg", S("palette-grey-700")), ee(b.Chip, "defaultBorder", S("palette-grey-700")), ee(b.Chip, "defaultAvatarColor", S("palette-grey-300")), ee(b.Chip, "defaultIconColor", S("palette-grey-300")), ee(b.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), ee(b.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), ee(b.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), ee(b.LinearProgress, "primaryBg", L(ot, b.primary.main, 0.5)), ee(b.LinearProgress, "secondaryBg", L(ot, b.secondary.main, 0.5)), ee(b.LinearProgress, "errorBg", L(ot, b.error.main, 0.5)), ee(b.LinearProgress, "infoBg", L(ot, b.info.main, 0.5)), ee(b.LinearProgress, "successBg", L(ot, b.success.main, 0.5)), ee(b.LinearProgress, "warningBg", L(ot, b.warning.main, 0.5)), ee(b.Skeleton, "bg", f ? L(Tr, b.text.primary, 0.13) : `rgba(${S("palette-text-primaryChannel")} / 0.13)`), ee(b.Slider, "primaryTrack", L(ot, b.primary.main, 0.5)), ee(b.Slider, "secondaryTrack", L(ot, b.secondary.main, 0.5)), ee(b.Slider, "errorTrack", L(ot, b.error.main, 0.5)), ee(b.Slider, "infoTrack", L(ot, b.info.main, 0.5)), ee(b.Slider, "successTrack", L(ot, b.success.main, 0.5)), ee(b.Slider, "warningTrack", L(ot, b.warning.main, 0.5));
      const N = f ? L(it, b.background.default, 0.985) : ua(b.background.default, 0.98);
      ee(b.SnackbarContent, "bg", N), ee(b.SnackbarContent, "color", Jt(() => f ? xu.text.primary : b.getContrastText(N))), ee(b.SpeedDialAction, "fabHoverBg", ua(b.background.paper, 0.15)), ee(b.StepConnector, "border", S("palette-grey-600")), ee(b.StepContent, "border", S("palette-grey-600")), ee(b.Switch, "defaultColor", S("palette-grey-300")), ee(b.Switch, "defaultDisabledColor", S("palette-grey-600")), ee(b.Switch, "primaryDisabledColor", L(ot, b.primary.main, 0.55)), ee(b.Switch, "secondaryDisabledColor", L(ot, b.secondary.main, 0.55)), ee(b.Switch, "errorDisabledColor", L(ot, b.error.main, 0.55)), ee(b.Switch, "infoDisabledColor", L(ot, b.info.main, 0.55)), ee(b.Switch, "successDisabledColor", L(ot, b.success.main, 0.55)), ee(b.Switch, "warningDisabledColor", L(ot, b.warning.main, 0.55)), ee(b.TableCell, "border", L(ot, L(Tr, b.divider, 1), 0.68)), ee(b.Tooltip, "bg", L(Tr, b.grey[700], 0.92));
    }
    or(b.background, "default"), or(b.background, "paper"), or(b.common, "background"), or(b.common, "onBackground"), or(b, "divider"), Object.keys(b).forEach((N) => {
      const R = b[N];
      N !== "tonalOffset" && R && typeof R == "object" && (R.main && ee(b[N], "mainChannel", jn(An(R.main))), R.light && ee(b[N], "lightChannel", jn(An(R.light))), R.dark && ee(b[N], "darkChannel", jn(An(R.dark))), R.contrastText && ee(b[N], "contrastTextChannel", jn(An(R.contrastText))), N === "text" && (or(b[N], "primary"), or(b[N], "secondary")), N === "action" && (R.active && or(b[N], "active"), R.selected && or(b[N], "selected")));
    });
  }), k = t.reduce((I, b) => Ft(I, b), k);
  const D = {
    prefix: o,
    disableCssColorScheme: n,
    shouldSkipGeneratingVar: s,
    getSelector: E1(k),
    enableContrastVars: i
  }, {
    vars: V,
    generateThemeVars: j,
    generateStyleSheets: M
  } = Uy(k, D);
  return k.vars = V, Object.entries(k.colorSchemes[k.defaultColorScheme]).forEach(([I, b]) => {
    k[I] = b;
  }), k.generateThemeVars = j, k.generateStyleSheets = M, k.generateSpacing = function() {
    return du(c.spacing, Xi(this));
  }, k.getColorSchemeSelector = Gy(l), k.spacing = k.generateSpacing(), k.shouldSkipGeneratingVar = s, k.unstable_sxConfig = {
    ...Qa,
    ...c == null ? void 0 : c.unstable_sxConfig
  }, k.unstable_sx = function(b) {
    return bn({
      sx: b,
      theme: this
    });
  }, k.toRuntimeSource = wu, k;
}
function Fl(e, t, a) {
  e.colorSchemes && a && (e.colorSchemes[t] = {
    ...a !== !0 && a,
    palette: rs({
      ...a === !0 ? {} : a.palette,
      mode: t
    })
    // cast type to skip module augmentation test
  });
}
function O1(e = {}, ...t) {
  const {
    palette: a,
    cssVariables: r = !1,
    colorSchemes: n = a ? void 0 : {
      light: !0
    },
    defaultColorScheme: o = a == null ? void 0 : a.mode,
    ...i
  } = e, s = o || "light", l = n == null ? void 0 : n[s], u = {
    ...n,
    ...a ? {
      [s]: {
        ...typeof l != "boolean" && l,
        palette: a
      }
    } : void 0
  };
  if (r === !1) {
    if (!("colorSchemes" in e))
      return Ei(e, ...t);
    let c = a;
    "palette" in e || u[s] && (u[s] !== !0 ? c = u[s].palette : s === "dark" && (c = {
      mode: "dark"
    }));
    const d = Ei({
      ...e,
      palette: c
    }, ...t);
    return d.defaultColorScheme = s, d.colorSchemes = u, d.palette.mode === "light" && (d.colorSchemes.light = {
      ...u.light !== !0 && u.light,
      palette: d.palette
    }, Fl(d, "dark", u.dark)), d.palette.mode === "dark" && (d.colorSchemes.dark = {
      ...u.dark !== !0 && u.dark,
      palette: d.palette
    }, Fl(d, "light", u.light)), d;
  }
  return !a && !("light" in u) && s === "light" && (u.light = !0), T1({
    ...i,
    colorSchemes: u,
    defaultColorScheme: s,
    ...typeof r != "boolean" && r
  }, ...t);
}
const _1 = O1(), P1 = "$$material";
function j1(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const A1 = (e) => j1(e) && e !== "classes", M1 = Oy({
  themeId: P1,
  defaultTheme: _1,
  rootShouldForwardProp: A1
}), I1 = Vy;
function L1(e) {
  return Wy(e);
}
function D1(e) {
  return pu("MuiSvgIcon", e);
}
ky("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const N1 = (e) => {
  const {
    color: t,
    fontSize: a,
    classes: r
  } = e, n = {
    root: ["root", t !== "inherit" && `color${gn(t)}`, `fontSize${gn(a)}`]
  };
  return _b(n, D1, r);
}, B1 = M1("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: a
    } = e;
    return [t.root, a.color !== "inherit" && t[`color${gn(a.color)}`], t[`fontSize${gn(a.fontSize)}`]];
  }
})(I1(({
  theme: e
}) => {
  var t, a, r, n, o, i, s, l, u, c, d, p, h, g;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    flexShrink: 0,
    transition: (n = (t = e.transitions) == null ? void 0 : t.create) == null ? void 0 : n.call(t, "fill", {
      duration: (r = (a = (e.vars ?? e).transitions) == null ? void 0 : a.duration) == null ? void 0 : r.shorter
    }),
    variants: [
      {
        props: (m) => !m.hasSvgAsChild,
        style: {
          // the <svg> will define the property that has `currentColor`
          // for example heroicons uses fill="none" and stroke="currentColor"
          fill: "currentColor"
        }
      },
      {
        props: {
          fontSize: "inherit"
        },
        style: {
          fontSize: "inherit"
        }
      },
      {
        props: {
          fontSize: "small"
        },
        style: {
          fontSize: ((i = (o = e.typography) == null ? void 0 : o.pxToRem) == null ? void 0 : i.call(o, 20)) || "1.25rem"
        }
      },
      {
        props: {
          fontSize: "medium"
        },
        style: {
          fontSize: ((l = (s = e.typography) == null ? void 0 : s.pxToRem) == null ? void 0 : l.call(s, 24)) || "1.5rem"
        }
      },
      {
        props: {
          fontSize: "large"
        },
        style: {
          fontSize: ((c = (u = e.typography) == null ? void 0 : u.pxToRem) == null ? void 0 : c.call(u, 35)) || "2.1875rem"
        }
      },
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((e.vars ?? e).palette).filter(([, m]) => m && m.main).map(([m]) => {
        var v, C;
        return {
          props: {
            color: m
          },
          style: {
            color: (C = (v = (e.vars ?? e).palette) == null ? void 0 : v[m]) == null ? void 0 : C.main
          }
        };
      }),
      {
        props: {
          color: "action"
        },
        style: {
          color: (p = (d = (e.vars ?? e).palette) == null ? void 0 : d.action) == null ? void 0 : p.active
        }
      },
      {
        props: {
          color: "disabled"
        },
        style: {
          color: (g = (h = (e.vars ?? e).palette) == null ? void 0 : h.action) == null ? void 0 : g.disabled
        }
      },
      {
        props: {
          color: "inherit"
        },
        style: {
          color: void 0
        }
      }
    ]
  };
})), ki = /* @__PURE__ */ _.forwardRef(function(t, a) {
  const r = L1({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: n,
    className: o,
    color: i = "inherit",
    component: s = "svg",
    fontSize: l = "medium",
    htmlColor: u,
    inheritViewBox: c = !1,
    titleAccess: d,
    viewBox: p = "0 0 24 24",
    ...h
  } = r, g = /* @__PURE__ */ _.isValidElement(n) && n.type === "svg", m = {
    ...r,
    color: i,
    component: s,
    fontSize: l,
    instanceFontSize: t.fontSize,
    inheritViewBox: c,
    viewBox: p,
    hasSvgAsChild: g
  }, v = {};
  c || (v.viewBox = p);
  const C = N1(m);
  return /* @__PURE__ */ q.jsxs(B1, {
    as: s,
    className: Ob(C.root, o),
    focusable: "false",
    color: u,
    "aria-hidden": d ? void 0 : !0,
    role: d ? "img" : void 0,
    ref: a,
    ...v,
    ...h,
    ...g && n.props,
    ownerState: m,
    children: [g ? n.props.children : n, d ? /* @__PURE__ */ q.jsx("title", {
      children: d
    }) : null]
  });
});
ki.muiName = "SvgIcon";
function F1(e, t) {
  function a(r, n) {
    return /* @__PURE__ */ q.jsx(ki, {
      "data-testid": void 0,
      ref: n,
      ...r,
      children: e
    });
  }
  return a.muiName = ki.muiName, /* @__PURE__ */ _.memo(/* @__PURE__ */ _.forwardRef(a));
}
const z1 = F1(/* @__PURE__ */ q.jsx("path", {
  d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"
})), W1 = (e) => {
  const { value: t, testId: a, size: r, stopPropagation: n } = e, o = t, i = "Copy to Clipboard", s = "Copied", [l, u] = Yt(i), c = () => {
    u(i);
  }, d = (p) => {
    u(s), Uc(o), n && p.stopPropagation();
  };
  return /* @__PURE__ */ q.jsx(
    qi,
    {
      title: l,
      onClose: c,
      placement: "top-end",
      children: /* @__PURE__ */ q.jsx(Ce, { component: "span", children: /* @__PURE__ */ q.jsx(Ec, { size: "small", color: "primary", onClick: (p) => d(p), children: /* @__PURE__ */ q.jsx(z1, {}) }) })
    }
  );
}, V1 = tr(
  (e) => cr({
    infoTooltipDark: {
      color: e.palette.grey[100],
      backgroundColor: e.palette.secondary.dark,
      borderRadius: 5
    },
    infoArrowDark: {
      color: e.palette.secondary.dark
    },
    infoTooltipLight: {
      color: e.palette.secondary.dark,
      backgroundColor: e.palette.common.white,
      borderRadius: 5,
      maxWidth: e.spacing(53)
    },
    infoArrowLight: {
      color: e.palette.common.white
    }
  })
), H1 = tr(
  (e) => cr({
    divider: {
      marginTop: e.spacing(1),
      marginBottom: e.spacing(1),
      backgroundColor: e.palette.grey[100]
    },
    buttonLink: {
      color: e.palette.primary.main,
      cursor: "pointer",
      marginTop: e.spacing(1.5),
      textDecoration: "none"
    },
    dividerDark: {
      backgroundColor: e.palette.grey[100]
    },
    exampleContent: {
      fontWeight: 100,
      marginTop: e.spacing(1),
      marginBottom: e.spacing(1)
    },
    exampleContentDark: {
      color: e.palette.grey[100]
    },
    exampleContentLight: {
      color: e.palette.secondary.dark
    }
  })
);
function K1(e) {
  const { children: t, classes: a, disabled: r, title: n, ...o } = e;
  return r ? /* @__PURE__ */ q.jsx(q.Fragment, { children: t }) : /* @__PURE__ */ q.jsx(q.Fragment, { children: t && n && /* @__PURE__ */ q.jsx(
    qi,
    {
      ...o,
      classes: a,
      interactive: !0,
      title: n,
      children: t
    }
  ) });
}
function zl(e) {
  const {
    children: t,
    heading: a,
    disabled: r,
    content: n,
    example: o,
    action: i,
    darken: s = !0,
    ...l
  } = e, u = H1(), c = V1(), d = /* @__PURE__ */ q.jsxs(Ce, { p: 0.5, children: [
    a && /* @__PURE__ */ q.jsx(Ce, { mb: n ? 1 : 0, children: /* @__PURE__ */ q.jsx(Ht, { variant: "h5", children: a }) }),
    n && /* @__PURE__ */ q.jsx(Ht, { variant: "body2", children: n }),
    (i || o) && /* @__PURE__ */ q.jsx(eg, { className: u.divider }),
    o && /* @__PURE__ */ q.jsxs(
      Ht,
      {
        className: ge({
          [u.exampleContent]: !0,
          [u.exampleContentDark]: s,
          [u.exampleContentLight]: !s
        }),
        variant: "body2",
        children: [
          "Eg: ",
          o
        ]
      }
    ),
    i && /* @__PURE__ */ q.jsx(
      bg,
      {
        href: i.link,
        className: u.buttonLink,
        target: "_blank",
        rel: "noreferrer",
        children: i.text
      }
    )
  ] });
  return t ? /* @__PURE__ */ q.jsx(
    K1,
    {
      title: d,
      disabled: r,
      classes: s ? {
        tooltip: c.infoTooltipDark,
        arrow: c.infoArrowDark
      } : {
        tooltip: c.infoTooltipLight,
        arrow: c.infoArrowLight
      },
      ...l,
      children: t
    }
  ) : null;
}
const ku = tr((e) => ({
  root: {
    padding: e.spacing(0.5, 1.5),
    width: "100%",
    minHeight: e.spacing(5),
    backgroundColor: e.palette.common.white,
    border: `1px solid ${e.palette.grey[100]}`,
    boxShadow: `0 1px 2px -1px ${Le(
      e.palette.common.black,
      0.08
    )}, 0 -3px 9px 0 ${Le(e.palette.common.black, 0.04)} inset`,
    borderRadius: 5,
    "&$multiline": {
      height: "auto",
      resize: "auto"
    },
    "&$multilineReadonly": {
      height: "auto",
      resize: "none",
      "& $textarea": {
        height: "auto",
        resize: "none"
      }
    },
    "&$multilineResizeIndicator": {
      height: "auto",
      resize: "none",
      "& $textarea": {
        height: "auto",
        resize: "none"
      }
    },
    "&$rounded": {
      paddingLeft: e.spacing(2)
    },
    "&:hover": {
      borderColor: "#ccd1f2"
    }
  },
  rootSmall: {
    minHeight: e.spacing(4)
  },
  rootLarge: {
    minHeight: e.spacing(7),
    borderRadius: 12,
    padding: e.spacing(1, 1, 1, 3)
  },
  textInput: (t) => ({
    minHeight: e.spacing(2.5),
    padding: e.spacing(0.125, 0),
    fontSize: e.typography[t.typography || "body1"].fontSize,
    fontWeight: e.typography[t.typography || "body1"].fontWeight,
    lineHeight: e.typography[t.typography || "body1"].lineHeight
  }),
  textInputLarge: (t) => ({
    fontSize: e.typography[t.typography || "overline"].fontSize,
    fontWeight: e.typography[t.typography || "overline"].fontWeight,
    lineHeight: e.typography[t.typography || "overline"].lineHeight
  }),
  textInputDisabled: {
    "&:hover": {
      borderColor: e.palette.grey[100]
    }
  },
  inputAdornedEnd: {
    "& .MuiInputAdornment-root": {
      marginRight: e.spacing(-1)
    }
  },
  inputAdornedEndAlignTop: {
    "& .MuiInputAdornment-root": {
      alignSelf: "flex-end",
      height: "auto",
      marginBottom: e.spacing(0.25)
    }
  },
  multiline: {},
  multilineReadonly: {},
  multilineResizeIndicator: {},
  rounded: {
    borderRadius: e.spacing(2.5)
  },
  focused: {
    borderColor: e.palette.primary.light,
    borderWidth: 1,
    boxShadow: `0 -3px 9px 0 ${Le(
      e.palette.common.black,
      0.04
    )} inset, 0 0 0 2px #D8E1E8`,
    "&:hover": {
      borderColor: e.palette.primary.light
    }
  },
  error: {
    background: e.palette.error.light,
    borderColor: e.palette.error.main,
    boxShadow: `0 0 0 1px ${e.palette.error.light}, inset 0 2px 2px ${Le(
      e.palette.error.light,
      0.07
    )}`,
    "&:hover": {
      borderColor: e.palette.error.main
    }
  },
  readOnlyDefault: {
    boxShadow: `0 0 0 1px ${Le(
      e.palette.common.black,
      0.05
    )}, inset 0 2px 2px ${Le(e.palette.common.black, 0.05)}`,
    border: "none",
    backgroundColor: "#E5E4E2"
  },
  readOnlyPlain: {
    boxShadow: "none",
    border: "none",
    backgroundColor: e.palette.common.white,
    paddingLeft: 0,
    paddingRight: 0
  },
  formLabel: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginBottom: e.spacing(0.5)
  },
  formLabelAction: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center"
  },
  formLabelInfo: {
    marginLeft: e.spacing(1),
    display: "flex",
    alignItems: "center"
  },
  formOptional: {
    color: e.palette.grey[200],
    fontSize: e.spacing(1.4),
    marginLeft: e.spacing(1)
  },
  formLabelTooltip: {
    marginLeft: e.spacing(1),
    display: "flex",
    alignItems: "center"
  },
  inputGroup: {
    position: "relative"
  },
  tooltipIcon: {
    display: "flex",
    alignItems: "center",
    color: e.palette.secondary.main,
    cursor: "help",
    fontSize: e.spacing(1.75)
  },
  textarea: {
    resize: "both"
  },
  copyToClipboardInput: {
    backgroundColor: "#f5f5f5",
    border: `1px solid ${e.palette.grey[100]}`,
    boxShadow: "none",
    paddingRight: e.spacing(5)
  },
  textInputInfoIcon: {
    display: "flex",
    alignItems: "center",
    fontSize: e.spacing(1.75)
  }
})), q1 = (e, t) => {
  const a = ku(e), {
    label: r,
    width: n,
    readOnly: o,
    error: i,
    helperText: s,
    rows: l,
    multiline: u,
    optional: c,
    loading: d,
    tooltip: p,
    tooltipPlacement: h = "top",
    inputTooltip: g,
    size: m = "medium",
    info: v,
    actions: C,
    testId: T,
    variant: A = "default",
    rounded: f = !1,
    resizeIndicator: x = !0,
    ...k
  } = e, D = p && /* @__PURE__ */ q.jsx(
    zl,
    {
      darken: !0,
      title: p,
      disabled: !p,
      placement: h,
      children: /* @__PURE__ */ q.jsx(Ce, { className: a.tooltipIcon, children: /* @__PURE__ */ q.jsx(Ce, { className: a.textInputInfoIcon, children: /* @__PURE__ */ q.jsx(cb, { fontSize: "inherit" }) }) })
    }
  );
  return /* @__PURE__ */ q.jsxs(Ce, { width: n, children: [
    (r || D || v || c || C) && /* @__PURE__ */ q.jsxs(Ce, { className: a.formLabel, children: [
      r && /* @__PURE__ */ q.jsx(Ht, { component: "h6", variant: "body1", children: r }),
      v && /* @__PURE__ */ q.jsx(Ce, { className: a.formLabelInfo, children: v }),
      D && /* @__PURE__ */ q.jsx(Ce, { className: a.formLabelTooltip, children: D }),
      c && /* @__PURE__ */ q.jsx(Ht, { variant: "body2", className: a.formOptional, children: "(Optional)" }),
      C && /* @__PURE__ */ q.jsx(Ce, { className: a.formLabelAction, children: C })
    ] }),
    /* @__PURE__ */ q.jsx(
      zl,
      {
        darken: !0,
        heading: g,
        disabled: !g,
        placement: h,
        children: /* @__PURE__ */ q.jsx(Ce, { className: a.inputGroup, children: /* @__PURE__ */ q.jsx(
          lg,
          {
            ref: t,
            classes: {
              root: ge({
                [a.root]: !0,
                [a.rootSmall]: m === "small",
                [a.rootLarge]: m === "large",
                [a.readOnlyDefault]: o && A === "default",
                [a.readOnlyPlain]: o && A === "plain",
                [a.multiline]: u,
                [a.multilineReadonly]: u && o,
                [a.multilineResizeIndicator]: u && !x,
                [a.rounded]: f
              }),
              focused: a.focused,
              error: a.error,
              inputMultiline: a.textarea,
              input: ge({
                [a.textInput]: !0,
                [a.textInputLarge]: m === "large"
              }),
              disabled: a.textInputDisabled,
              adornedEnd: ge({
                [a.inputAdornedEnd]: !0,
                [a.inputAdornedEndAlignTop]: u
              })
            },
            readOnly: o,
            ...k,
            error: i,
            rows: l,
            multiline: u,
            "data-cyid": T
          }
        ) })
      }
    ),
    i && s && /* @__PURE__ */ q.jsx(Zs, { error: i, children: /* @__PURE__ */ q.jsxs(Ce, { display: "flex", alignItems: "center", children: [
      /* @__PURE__ */ q.jsx(Ce, { className: a.textInputInfoIcon, children: /* @__PURE__ */ q.jsx(sb, { fontSize: "inherit" }) }),
      /* @__PURE__ */ q.jsx(Ce, { ml: 1, children: s })
    ] }) }),
    d && s && /* @__PURE__ */ q.jsx(Zs, { children: /* @__PURE__ */ q.jsxs(Ce, { display: "flex", alignItems: "center", children: [
      /* @__PURE__ */ q.jsx(Va, { size: 12 }),
      /* @__PURE__ */ q.jsx(Ce, { ml: 1, children: s })
    ] }) })
  ] });
}, $i = Hl(q1), U1 = tr(
  (e) => cr({
    copyToClipboard: {
      display: "flex",
      width: "100%",
      position: "relative"
    },
    copyToClipboardInputWrap: {
      flexGrow: 1
    },
    copyToClipboardCard: {
      padding: e.spacing(2),
      borderRadius: e.spacing(1),
      flexGrow: 1
    },
    copyIconWrap: {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      bottom: e.spacing(0.625),
      right: e.spacing(0.5)
    },
    copyIconWrapCard: {
      top: e.spacing(1.25),
      right: e.spacing(1)
    }
  })
), G1 = (e) => {
  const t = U1(), a = ku(e), {
    size: r,
    value: n,
    component: o = "textInput",
    endAdornment: i,
    testId: s,
    ...l
  } = e, u = n;
  return /* @__PURE__ */ q.jsxs(
    Ce,
    {
      className: t.copyToClipboard,
      "data-cyid": `${s}-copy-to-clipboard`,
      children: [
        o === "textInput" && /* @__PURE__ */ q.jsx(Ce, { className: t.copyToClipboardInputWrap, children: /* @__PURE__ */ q.jsx(
          $i,
          {
            value: n,
            readOnly: !0,
            className: a.copyToClipboardInput,
            ...l,
            size: r,
            testId: s,
            endAdornment: /* @__PURE__ */ q.jsx(hg, { position: "end", children: i })
          }
        ) }),
        o === "card" && /* @__PURE__ */ q.jsx(Ce, { className: t.copyToClipboardCard, children: n }),
        /* @__PURE__ */ q.jsx(
          Ce,
          {
            className: ge({
              [t.copyIconWrap]: !0,
              [t.copyIconWrapCard]: o === "card"
            }),
            children: /* @__PURE__ */ q.jsx(
              W1,
              {
                value: u,
                size: r === "small" ? "tiny" : "small",
                testId: "copy-to-clipboard"
              }
            )
          }
        )
      ]
    }
  );
}, ns = tr(
  (e) => cr({
    tabCard: {
      padding: 0
    },
    fullHeight: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%"
    },
    tabHeading: {
      borderBottom: `1px solid ${e.palette.grey[100]}`
    },
    tabBody: {
      flexGrow: 1,
      overflow: "auto",
      display: "flex",
      flexDirection: "column"
    },
    tabs: {
      minHeight: "initial",
      "& .MuiTabs-flexContainer": {
        gap: e.spacing(3)
      }
    },
    tab: {
      padding: 0,
      minWidth: "auto",
      textTransform: "initial",
      minHeight: "initial",
      paddingTop: e.spacing(1),
      paddingBottom: e.spacing(1),
      color: e.palette.secondary.dark,
      fontWeight: 400,
      "&.Mui-selected": {
        color: e.palette.primary.main,
        fontWeight: 600
      },
      "&.Mui-disabled": {
        color: e.palette.grey[200]
      }
    },
    tabSmall: {
      fontSize: e.spacing(1.5),
      paddingTop: e.spacing(0.5),
      paddingBottom: e.spacing(0.5)
    },
    tabMedium: {
      fontSize: e.spacing(1.75),
      paddingTop: e.spacing(1),
      paddingBottom: e.spacing(1)
    },
    tabLarge: {
      fontSize: e.spacing(2),
      paddingBottom: e.spacing(1.25)
    },
    iconLeft: {
      "& .MuiTab-wrapper": {
        flexDirection: "row",
        "& .MuiSvgIcon-root": {
          marginBottom: 0,
          marginRight: e.spacing(1)
        }
      }
    },
    iconRight: {
      "& .MuiTab-wrapper": {
        flexDirection: "row-reverse",
        "& .MuiSvgIcon-root": {
          marginBottom: 0,
          marginLeft: e.spacing(1)
        }
      }
    },
    iconBottom: {
      "& .MuiTab-wrapper": {
        flexDirection: "column-reverse",
        "& .MuiSvgIcon-root": {
          marginBottom: 0,
          marginTop: e.spacing(1)
        }
      }
    },
    iconTop: {},
    tabBox: {
      display: "flex",
      alignItems: "center"
    },
    tabAction: {
      marginLeft: e.spacing(1)
    },
    tabActionsWrap: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between"
    },
    tabActionsWrapCenter: {
      justifyContent: "center"
    },
    tabActions: {
      marginLeft: e.spacing(2),
      paddingBottom: e.spacing(1)
    },
    tabPanel: {
      paddingTop: e.spacing(2),
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    tabPanelHide: {
      display: "none"
    },
    menuPaper: {
      border: `1px solid ${e.palette.grey[100]}`,
      borderRadius: 5
    },
    menuList: {
      paddingTop: 0,
      paddingBottom: 0
    },
    menuItemRoot: {
      "&:hover": {
        backgroundColor: "#E5E4E2"
      }
    },
    menuItemContent: {
      display: "flex",
      alignItems: "center",
      gridGap: e.spacing(1)
    },
    menuItemIcon: {
      display: "flex",
      alignItems: "center"
    },
    menuItemText: {}
  })
), Y1 = (e) => {
  const {
    children: t,
    testId: a,
    size: r = "medium",
    actions: n,
    iconPosition: o = "left",
    ...i
  } = e, s = ns();
  return /* @__PURE__ */ q.jsxs(Ce, { className: s.tabBox, children: [
    /* @__PURE__ */ q.jsx(
      s0,
      {
        disableFocusRipple: !0,
        disableTouchRipple: !0,
        ...i,
        "data-cyid": a,
        className: ge({
          [s.tab]: !0,
          [s.tabSmall]: r === "small",
          [s.tabMedium]: r === "medium",
          [s.tabLarge]: r === "large",
          [s.iconLeft]: o === "left",
          [s.iconRight]: o === "right",
          [s.iconBottom]: o === "bottom",
          [s.iconTop]: o === "top"
        }),
        children: t
      }
    ),
    n && /* @__PURE__ */ q.jsx(Ce, { className: s.tabAction, children: n })
  ] });
};
function X1(e) {
  return {
    id: `simple-tab-${e}`,
    "aria-controls": `simple-tabpanel-${e}`
  };
}
const J1 = (e) => {
  const {
    tabItems: t,
    children: a,
    handleChange: r,
    value: n,
    centered: o = !1,
    tabActions: i,
    title: s,
    testId: l,
    className: u,
    fullHeight: c,
    size: d = "medium"
  } = e, p = ns();
  return /* @__PURE__ */ q.jsxs(
    Ce,
    {
      className: ge(p.tabCard, u, {
        [p.fullHeight]: c
      }),
      children: [
        /* @__PURE__ */ q.jsxs(Ce, { className: p.tabHeading, children: [
          s && /* @__PURE__ */ q.jsx(Ce, { textAlign: o && "center", mb: 3, children: /* @__PURE__ */ q.jsx(Ht, { variant: "h2", gutterBottom: !0, children: s }) }),
          /* @__PURE__ */ q.jsxs(
            Ce,
            {
              className: ge(p.tabActionsWrap, {
                [p.tabActionsWrapCenter]: o
              }),
              children: [
                /* @__PURE__ */ q.jsx(
                  E0,
                  {
                    value: n,
                    onChange: r,
                    centered: o,
                    indicatorColor: "primary",
                    textColor: "primary",
                    className: p.tabs,
                    "data-cyid": l,
                    children: t.map((h, g) => {
                      const m = h.name.toLowerCase().replace(/\s+/g, "-");
                      return h.hidden ? null : h.buttonProps ? /* @__PURE__ */ q.jsx(
                        cn,
                        {
                          variant: "link",
                          startIcon: h.buttonProps.startIcon,
                          onClick: h.buttonProps.onClick,
                          color: "primary",
                          testId: `${l}-${m}`,
                          disabled: h.disabled,
                          children: h.name
                        },
                        h.name
                      ) : /* @__PURE__ */ Vu(
                        Y1,
                        {
                          label: h.name,
                          ...X1(g),
                          key: h.name,
                          disabled: h.disabled,
                          actions: h.actions,
                          testId: `${l}-${m}`,
                          onClick: h.onClick,
                          size: d,
                          icon: h == null ? void 0 : h.icon,
                          iconPosition: h == null ? void 0 : h.iconPosition
                        }
                      );
                    })
                  }
                ),
                i && /* @__PURE__ */ q.jsx(Ce, { className: p.tabActions, children: i })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ q.jsxs(Ce, { className: p.tabBody, children: [
          " ",
          a
        ] })
      ]
    }
  );
};
function Go(e) {
  const { children: t, value: a, index: r, ...n } = e, o = ns();
  return /* @__PURE__ */ q.jsx(
    Ce,
    {
      role: "tabpanel",
      hidden: a !== r,
      id: `simple-tabpanel-${r}`,
      "aria-labelledby": `simple-tab-${r}`,
      ...n,
      className: ge(o.tabPanel, {
        [o.tabPanelHide]: a !== r
      }),
      children: a === r && t
    }
  );
}
const Z1 = "choreo-test-key", Q1 = "choreo-oauth2-token", ex = (e) => {
  const { token: t, apiEndpoint: a, topic: r, publish: n, subscribe: o, parameters: i, payload: s, isDevportal: l, asyncType: u } = e, c = Ui(), [d, p] = Yt(null), [h, g] = Yt([]), [m, v] = Yt(s || ""), [C, T] = Yt(a), [A, f] = Yt({}), [x, k] = Yt(!1), [D, V] = Yt("Connect"), [j, M] = Yt(0), [I, b] = Yt(t), S = (ce, ue) => {
    M(ue);
  };
  Yo(() => {
    if (r !== "/*") {
      const ce = r.startsWith("/") || a.endsWith("/") ? r === "/" ? "" : r : `/${r}`;
      T(`${a}${ce}`);
    }
    i != null && f(
      Object.keys(i).reduce((ce, ue) => (ce[ue] = "", ce), {})
    );
  }, [a, r]);
  const L = () => {
    u !== Ca.WEBSUB && d && m && d.readyState === d.OPEN && (d.send(m), g((ce) => [
      ...ce,
      {
        message: `Sent: ${m}`,
        timestamp: (/* @__PURE__ */ new Date()).toString(),
        randomKey: h.length
      }
    ]), v(""), d.onmessage = (ce) => g((ue) => [
      ...ue,
      {
        message: `Received: ${ce.data}`,
        timestamp: (/* @__PURE__ */ new Date()).toString(),
        randomKey: h.length
      }
    ]));
  }, N = () => {
    V("Connecting...");
    let ce = C;
    for (const be in A)
      ce = ce.replace(`{${be}}`, A[be]);
    const ue = [];
    l ? ue.push(Q1) : ue.push(Z1), I && I.trim() && ue.push(I);
    const me = new WebSocket(ce, ue);
    p(me), me.onopen = () => {
      k(!0), g((be) => [
        ...be,
        {
          message: `Connected to ${ce}`,
          timestamp: (/* @__PURE__ */ new Date()).toString(),
          randomKey: h.length
        }
      ]), V("Disconnect");
    }, me.onerror = () => {
      k(!1), g((be) => [
        ...be,
        {
          message: "Error while connecting to the server. Please check the endpoint and try again.",
          timestamp: (/* @__PURE__ */ new Date()).toString(),
          randomKey: h.length
        }
      ]), V("Connect");
    };
  }, R = () => {
    V("Disconnecting..."), setTimeout(() => {
      V("Connect"), k(!1), d == null || d.close(), d != null && d.CLOSED && (g((ce) => [
        ...ce,
        { message: "Disconnected", timestamp: (/* @__PURE__ */ new Date()).toString() }
      ]), V("Connect"));
    }, 1e3);
  }, U = () => {
    g([]);
  };
  function B(ce) {
    return ce.split("").reduce((ue, me, be) => ue + me.charCodeAt(0) * be, 1);
  }
  const J = [
    c.logColor1,
    c.logColor2,
    c.logColor3,
    c.logColor4
  ], { current: W } = Hu(/* @__PURE__ */ new Map()), ae = (ce) => {
    if (W.has(ce))
      return W.get(ce) || "";
    const ue = J[B(ce) % J.length];
    return W.set(ce, ue), ue;
  }, re = (ce) => /* @__PURE__ */ q.jsx(
    pb,
    {
      getColor: ae,
      logEntry: ce,
      timeZone: "UTC",
      onCopy: () => {
      },
      isExpanded: !1,
      isHeiglighted: !1,
      isExpandable: !1
    }
  );
  function de(ce) {
    switch (ce) {
      case "Connecting...":
        return "Connecting...";
      case "Connect":
        return "Connect";
      case "Disconnect":
        return "Disconnect";
      case "Disconnecting...":
        return "Disconnecting...";
      default:
        return "Connect";
    }
  }
  const pe = Kl(
    () => D === "Connect" ? "Connect to the server to start sending messages." : "Enter your message to send.",
    [D]
  ), Se = [{ name: "Parameters" }, { name: "Payload" }, { name: "Headers" }], fe = [{ name: "Payload" }, { name: "Headers" }];
  return /* @__PURE__ */ q.jsx(Ce, { className: c.topicContainer, children: /* @__PURE__ */ q.jsxs(wb, { square: !0, testId: "topic-accordion", bordered: !0, children: [
    /* @__PURE__ */ q.jsx(
      kb,
      {
        "aria-controls": "panel1a-content",
        testId: "topic-accordion-summary",
        children: /* @__PURE__ */ q.jsxs(Ce, { className: c.topicTypeContainer, children: [
          u === Ca.WEBSUB && /* @__PURE__ */ q.jsx(Ce, { className: c.typeChipContainer, children: /* @__PURE__ */ q.jsx(
            ml,
            {
              label: "PUB",
              testId: "default",
              variant: "contained",
              color: "info",
              size: "medium",
              disabled: !n
            }
          ) }),
          /* @__PURE__ */ q.jsx(Ce, { className: c.typeChipContainer, children: /* @__PURE__ */ q.jsx(
            ml,
            {
              label: "SUB",
              testId: "default",
              variant: "contained",
              color: "success",
              size: "medium",
              disabled: !o
            }
          ) }),
          /* @__PURE__ */ q.jsx(Ce, { className: c.typeChipContainer, children: /* @__PURE__ */ q.jsx(Ht, { variant: "body2", children: r }) })
        ] })
      }
    ),
    /* @__PURE__ */ q.jsx(Eb, { testId: "topic-accordion-details", children: /* @__PURE__ */ q.jsx(Ce, { width: "100%", children: r && /* @__PURE__ */ q.jsxs(
      Vl,
      {
        fallback: /* @__PURE__ */ q.jsx(
          Ce,
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            children: /* @__PURE__ */ q.jsx(Va, { size: 25 })
          }
        ),
        children: [
          u === Ca.WS && /* @__PURE__ */ q.jsxs(Ce, { className: c.endpointContainer, children: [
            /* @__PURE__ */ q.jsx(Ce, { className: c.textInput, children: /* @__PURE__ */ q.jsx(
              G1,
              {
                value: C,
                size: "small",
                testId: "endpoint-url"
              }
            ) }),
            /* @__PURE__ */ q.jsx(
              cn,
              {
                color: x ? "secondary" : "primary",
                variant: "contained",
                pill: !1,
                size: "small",
                testId: "disconnect",
                onClick: () => x ? R() : N(),
                children: de(D)
              }
            )
          ] }),
          /* @__PURE__ */ q.jsxs(Ce, { children: [
            /* @__PURE__ */ q.jsxs(
              J1,
              {
                className: c.tabs,
                tabItems: Object.keys(A).length === 0 ? fe : Se,
                handleChange: S,
                value: j,
                testId: "env-tab-card",
                fullHeight: !0,
                children: [
                  Object.keys(A).length !== 0 && /* @__PURE__ */ q.jsx(Go, { value: j, index: 0, children: /* @__PURE__ */ q.jsxs(Ce, { className: c.parameterContainerWrapper, children: [
                    /* @__PURE__ */ q.jsx(Ce, { className: c.parameterContainer, children: Object.keys(A).map((ce) => /* @__PURE__ */ q.jsx(Ce, { children: /* @__PURE__ */ q.jsx(
                      $i,
                      {
                        testId: `input-${ce}`,
                        className: c.paramTextInput,
                        type: "text",
                        placeholder: ce,
                        label: ce,
                        value: A[ce],
                        onChange: (ue) => {
                          const me = {
                            ...A,
                            [ce]: ue.target.value
                          };
                          f(me);
                        },
                        error: A[ce] === "",
                        helperText: "Enter parameter value"
                      }
                    ) }, ce)) }),
                    /* @__PURE__ */ q.jsx(Ce, { className: c.executeButton, children: /* @__PURE__ */ q.jsx(
                      cn,
                      {
                        testId: "execute",
                        disabled: x,
                        variant: "outlined",
                        onClick: N,
                        startIcon: /* @__PURE__ */ q.jsx(lb, {}),
                        size: "small",
                        children: /* @__PURE__ */ q.jsx(Ht, { variant: "body1", align: "center", children: "Execute" })
                      }
                    ) })
                  ] }) }),
                  /* @__PURE__ */ q.jsxs(
                    Go,
                    {
                      value: j,
                      index: Object.keys(A).length === 0 ? 0 : 1,
                      children: [
                        /* @__PURE__ */ q.jsx(Ce, { className: c.payloadContainer, children: /* @__PURE__ */ q.jsx(
                          xb,
                          {
                            fileContent: m,
                            language: "json",
                            height: "170px",
                            width: "1104px",
                            setFileContent: v
                          }
                        ) }),
                        /* @__PURE__ */ q.jsx(Ce, { mt: 5, children: /* @__PURE__ */ q.jsx(qi, { title: pe, placement: "top-start", children: /* @__PURE__ */ q.jsx(Ce, { className: c.sendIcon, children: /* @__PURE__ */ q.jsx(
                          cn,
                          {
                            testId: "payload-send",
                            disabled: m.length === 0 || !x,
                            variant: "outlined",
                            startIcon: /* @__PURE__ */ q.jsx(ub, {}),
                            onClick: L,
                            size: "small",
                            children: /* @__PURE__ */ q.jsx(Ht, { variant: "body1", align: "center", children: "Send" })
                          }
                        ) }) }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ q.jsx(Go, { value: j, index: Object.keys(A).length === 0 ? 1 : 2, children: /* @__PURE__ */ q.jsx(Ce, { className: c.parameterContainerWrapper, children: /* @__PURE__ */ q.jsx(Ce, { className: c.parameterContainer, children: /* @__PURE__ */ q.jsx(
                    $i,
                    {
                      testId: "input-headers",
                      className: c.apiTokenTextInput,
                      type: "text",
                      placeholder: "API Token",
                      label: "API Token",
                      value: I,
                      onChange: (ce) => {
                        const ue = ce.target.value;
                        b(ue);
                      },
                      error: I === "",
                      helperText: "Enter API Token"
                    }
                  ) }, "api-token") }) })
                ]
              }
            ),
            /* @__PURE__ */ q.jsx(
              bb,
              {
                messages: h,
                clearLogs: U,
                isDisabled: h.length < 1
              }
            ),
            /* @__PURE__ */ q.jsx(Ce, { children: /* @__PURE__ */ q.jsx(Ce, { className: c.outputContainer, children: h.map(
              (ce, ue) => re({
                timestamp: h[ue].timestamp,
                message: h[ue].message,
                randomKey: ue,
                isNewLog: !1
              })
            ) }) })
          ] })
        ]
      }
    ) }) })
  ] }) });
};
var Ca = /* @__PURE__ */ ((e) => (e.WS = "WS", e.WEBSUB = "WEBSUB", e))(Ca || {});
function da(e) {
  const { channels: t } = e;
  return Object.entries(t).map(
    ([r, n]) => ({
      name: r,
      subscribe: !!(n != null && n.subscribe),
      publish: !!(n != null && n.publish),
      parameters: n.parameters
    })
  );
}
function nx(e = {}) {
  const {
    token: t = "",
    apiEndpoint: a = "",
    asyncapi: r = {
      asyncapi: "2.0.0",
      info: {
        title: "WebSocket API",
        version: "1.0.0"
      },
      channels: {
        "/": {
          subscribe: {
            message: "A sample message",
            operationId: "test"
          },
          publish: {
            message: "A sample message",
            operationId: "test"
          }
        }
      }
    },
    isDevportal: n = !1,
    asyncApiType: o = void 0
  } = e, [i, s] = Yt([
    { name: "/*", subscribe: !0, publish: !0, parameters: {} }
  ]);
  Yo(() => {
    r != null && r.channels && s(da(r));
  }, [r]);
  const l = Kl(() => {
    var c, d;
    if (r && Object.keys(r).length > 0 && a) {
      let p = ll(r);
      return (c = p.asyncapi) != null && c.startsWith("2") ? p = {
        ...p,
        servers: {
          default: { url: a, protocol: "ws" }
        }
      } : (d = p.asyncapi) != null && d.startsWith("3") && (p = {
        ...p,
        servers: {
          default: { url: a, protocol: "ws" }
        }
      }), p != null && p.channels && s(da(p)), p;
    } else {
      let p = ll(r);
      s(da(p));
    }
    return null;
  }, [r, a]);
  Yo(() => {
    l != null && l.channels && s(da(l));
  }, [l]);
  function u(c) {
    return o === "WEBSUB" ? JSON.stringify({
      "hub.mode": "subscribe",
      "hub.topic": c || "sample-topic",
      "hub.callback": "http://example.com/callback"
    }) : '{ "message": "Hello Server" }';
  }
  return !i || !(r != null && r.channels) ? /* @__PURE__ */ q.jsx(
    Ce,
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      children: /* @__PURE__ */ q.jsx(Va, { size: 25 })
    }
  ) : a ? /* @__PURE__ */ q.jsx(Ce, { children: i.map(({ name: c, publish: d, subscribe: p, parameters: h }) => /* @__PURE__ */ q.jsx(
    ex,
    {
      token: t,
      apiEndpoint: a,
      topic: c,
      publish: d,
      subscribe: p,
      parameters: h,
      payload: u(c),
      isDevportal: n,
      asyncType: o
    },
    c
  )) }) : /* @__PURE__ */ q.jsx(q.Fragment, {});
}
export {
  nx as WebSocketViewer,
  nx as default
};
