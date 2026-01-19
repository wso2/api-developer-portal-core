import * as b from "react";
import ht, { isValidElement as xa, cloneElement as Sa, Children as Ed, lazy as kd, Suspense as vc, forwardRef as bc, useContext as $d, useState as Wt, createElement as Rd, useEffect as si, useRef as Td, useMemo as yc } from "react";
import * as Xt from "react-dom";
import fa from "react-dom";
var pa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $r(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var wo = { exports: {} }, Zr = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Eo, Ps;
function Od() {
  if (Ps) return Eo;
  Ps = 1;
  var t = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, a = Object.prototype.propertyIsEnumerable;
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
  return Eo = n() ? Object.assign : function(o, i) {
    for (var s, l = r(o), u, c = 1; c < arguments.length; c++) {
      s = Object(arguments[c]);
      for (var d in s)
        e.call(s, d) && (l[d] = s[d]);
      if (t) {
        u = t(s);
        for (var p = 0; p < u.length; p++)
          a.call(s, u[p]) && (l[u[p]] = s[u[p]]);
      }
    }
    return l;
  }, Eo;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var As;
function _d() {
  if (As) return Zr;
  As = 1, Od();
  var t = ht, e = 60103;
  if (Zr.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var a = Symbol.for;
    e = a("react.element"), Zr.Fragment = a("react.fragment");
  }
  var r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(s, l, u) {
    var c, d = {}, p = null, h = null;
    u !== void 0 && (p = "" + u), l.key !== void 0 && (p = "" + l.key), l.ref !== void 0 && (h = l.ref);
    for (c in l) n.call(l, c) && !o.hasOwnProperty(c) && (d[c] = l[c]);
    if (s && s.defaultProps) for (c in l = s.defaultProps, l) d[c] === void 0 && (d[c] = l[c]);
    return { $$typeof: e, type: s, key: p, ref: h, props: d, _owner: r.current };
  }
  return Zr.jsx = i, Zr.jsxs = i, Zr;
}
var Is;
function Pd() {
  return Is || (Is = 1, wo.exports = _d()), wo.exports;
}
var U = Pd(), Ma = {
  black: "#000",
  white: "#fff"
}, ko = {
  300: "#e57373",
  500: "#f44336",
  700: "#d32f2f"
}, $o = {
  A200: "#ff4081",
  A400: "#f50057",
  A700: "#c51162"
}, Ro = {
  300: "#7986cb",
  500: "#3f51b5",
  700: "#303f9f"
}, To = {
  300: "#64b5f6",
  500: "#2196f3",
  700: "#1976d2"
}, Oo = {
  300: "#81c784",
  500: "#4caf50",
  700: "#388e3c"
}, _o = {
  300: "#ffb74d",
  500: "#ff9800",
  700: "#f57c00"
}, Fi = {
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
function Y() {
  return Y = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var a = arguments[e];
      for (var r in a) ({}).hasOwnProperty.call(a, r) && (t[r] = a[r]);
    }
    return t;
  }, Y.apply(null, arguments);
}
function xr(t) {
  "@babel/helpers - typeof";
  return xr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, xr(t);
}
function Po(t) {
  return t && xr(t) === "object" && t.constructor === Object;
}
function Sr(t, e) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    clone: !0
  }, r = a.clone ? Y({}, t) : t;
  return Po(t) && Po(e) && Object.keys(e).forEach(function(n) {
    n !== "__proto__" && (Po(e[n]) && n in t ? r[n] = Sr(t[n], e[n], a) : r[n] = e[n]);
  }), r;
}
function Ad(t, e) {
  if (xr(t) != "object" || !t) return t;
  var a = t[Symbol.toPrimitive];
  if (a !== void 0) {
    var r = a.call(t, e);
    if (xr(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function xc(t) {
  var e = Ad(t, "string");
  return xr(e) == "symbol" ? e : e + "";
}
function Ot(t, e, a) {
  return (e = xc(e)) in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}
function mn(t) {
  for (var e = "https://mui.com/production-error/?code=" + t, a = 1; a < arguments.length; a += 1)
    e += "&args[]=" + encodeURIComponent(arguments[a]);
  return "Minified Material-UI error #" + t + "; visit " + e + " for the full message.";
}
var Ao = { exports: {} }, gt = {};
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ms;
function Id() {
  if (Ms) return gt;
  Ms = 1;
  var t = 60103, e = 60106, a = 60107, r = 60108, n = 60114, o = 60109, i = 60110, s = 60112, l = 60113, u = 60120, c = 60115, d = 60116, p = 60121, h = 60122, g = 60117, m = 60129, y = 60131;
  if (typeof Symbol == "function" && Symbol.for) {
    var w = Symbol.for;
    t = w("react.element"), e = w("react.portal"), a = w("react.fragment"), r = w("react.strict_mode"), n = w("react.profiler"), o = w("react.provider"), i = w("react.context"), s = w("react.forward_ref"), l = w("react.suspense"), u = w("react.suspense_list"), c = w("react.memo"), d = w("react.lazy"), p = w("react.block"), h = w("react.server.block"), g = w("react.fundamental"), m = w("react.debug_trace_mode"), y = w("react.legacy_hidden");
  }
  function k(C) {
    if (typeof C == "object" && C !== null) {
      var D = C.$$typeof;
      switch (D) {
        case t:
          switch (C = C.type, C) {
            case a:
            case n:
            case r:
            case l:
            case u:
              return C;
            default:
              switch (C = C && C.$$typeof, C) {
                case i:
                case s:
                case d:
                case c:
                case o:
                  return C;
                default:
                  return D;
              }
          }
        case e:
          return D;
      }
    }
  }
  var I = o, f = t, x = s, E = a, N = d, z = c, O = e, P = n, M = r, v = l;
  return gt.ContextConsumer = i, gt.ContextProvider = I, gt.Element = f, gt.ForwardRef = x, gt.Fragment = E, gt.Lazy = N, gt.Memo = z, gt.Portal = O, gt.Profiler = P, gt.StrictMode = M, gt.Suspense = v, gt.isAsyncMode = function() {
    return !1;
  }, gt.isConcurrentMode = function() {
    return !1;
  }, gt.isContextConsumer = function(C) {
    return k(C) === i;
  }, gt.isContextProvider = function(C) {
    return k(C) === o;
  }, gt.isElement = function(C) {
    return typeof C == "object" && C !== null && C.$$typeof === t;
  }, gt.isForwardRef = function(C) {
    return k(C) === s;
  }, gt.isFragment = function(C) {
    return k(C) === a;
  }, gt.isLazy = function(C) {
    return k(C) === d;
  }, gt.isMemo = function(C) {
    return k(C) === c;
  }, gt.isPortal = function(C) {
    return k(C) === e;
  }, gt.isProfiler = function(C) {
    return k(C) === n;
  }, gt.isStrictMode = function(C) {
    return k(C) === r;
  }, gt.isSuspense = function(C) {
    return k(C) === l;
  }, gt.isValidElementType = function(C) {
    return typeof C == "string" || typeof C == "function" || C === a || C === n || C === m || C === r || C === l || C === u || C === y || typeof C == "object" && C !== null && (C.$$typeof === d || C.$$typeof === c || C.$$typeof === o || C.$$typeof === i || C.$$typeof === s || C.$$typeof === g || C.$$typeof === p || C[0] === h);
  }, gt.typeOf = k, gt;
}
var js;
function Md() {
  return js || (js = 1, Ao.exports = Id()), Ao.exports;
}
Md();
function Bi(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.min(Math.max(e, t), a);
}
function jd(t) {
  t = t.substr(1);
  var e = new RegExp(".{1,".concat(t.length >= 6 ? 2 : 1, "}"), "g"), a = t.match(e);
  return a && a[0].length === 1 && (a = a.map(function(r) {
    return r + r;
  })), a ? "rgb".concat(a.length === 4 ? "a" : "", "(").concat(a.map(function(r, n) {
    return n < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3;
  }).join(", "), ")") : "";
}
function Dd(t) {
  t = Br(t);
  var e = t, a = e.values, r = a[0], n = a[1] / 100, o = a[2] / 100, i = n * Math.min(o, 1 - o), s = function(d) {
    var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (d + r / 30) % 12;
    return o - i * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  }, l = "rgb", u = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return t.type === "hsla" && (l += "a", u.push(a[3])), Va({
    type: l,
    values: u
  });
}
function Br(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
    return Br(jd(t));
  var e = t.indexOf("("), a = t.substring(0, e);
  if (["rgb", "rgba", "hsl", "hsla"].indexOf(a) === -1)
    throw new Error(mn(3, t));
  var r = t.substring(e + 1, t.length - 1).split(",");
  return r = r.map(function(n) {
    return parseFloat(n);
  }), {
    type: a,
    values: r
  };
}
function Va(t) {
  var e = t.type, a = t.values;
  return e.indexOf("rgb") !== -1 ? a = a.map(function(r, n) {
    return n < 3 ? parseInt(r, 10) : r;
  }) : e.indexOf("hsl") !== -1 && (a[1] = "".concat(a[1], "%"), a[2] = "".concat(a[2], "%")), "".concat(e, "(").concat(a.join(", "), ")");
}
function Nd(t, e) {
  var a = li(t), r = li(e);
  return (Math.max(a, r) + 0.05) / (Math.min(a, r) + 0.05);
}
function li(t) {
  t = Br(t);
  var e = t.type === "hsl" ? Br(Dd(t)).values : t.values;
  return e = e.map(function(a) {
    return a /= 255, a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  }), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function Qr(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.15;
  return li(t) > 0.5 ? Sc(t, e) : Cc(t, e);
}
function Ue(t, e) {
  return t = Br(t), e = Bi(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.values[3] = e, Va(t);
}
function Sc(t, e) {
  if (t = Br(t), e = Bi(e), t.type.indexOf("hsl") !== -1)
    t.values[2] *= 1 - e;
  else if (t.type.indexOf("rgb") !== -1)
    for (var a = 0; a < 3; a += 1)
      t.values[a] *= 1 - e;
  return Va(t);
}
function Cc(t, e) {
  if (t = Br(t), e = Bi(e), t.type.indexOf("hsl") !== -1)
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.indexOf("rgb") !== -1)
    for (var a = 0; a < 3; a += 1)
      t.values[a] += (255 - t.values[a]) * e;
  return Va(t);
}
function Ha(t, e) {
  if (t == null) return {};
  var a = {};
  for (var r in t) if ({}.hasOwnProperty.call(t, r)) {
    if (e.indexOf(r) !== -1) continue;
    a[r] = t[r];
  }
  return a;
}
function Ae(t, e) {
  if (t == null) return {};
  var a, r, n = Ha(t, e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (r = 0; r < o.length; r++) a = o[r], e.indexOf(a) === -1 && {}.propertyIsEnumerable.call(t, a) && (n[a] = t[a]);
  }
  return n;
}
var gr = ["xs", "sm", "md", "lg", "xl"];
function Ld(t) {
  var e = t.values, a = e === void 0 ? {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  } : e, r = t.unit, n = r === void 0 ? "px" : r, o = t.step, i = o === void 0 ? 5 : o, s = Ae(t, ["values", "unit", "step"]);
  function l(h) {
    var g = typeof a[h] == "number" ? a[h] : h;
    return "@media (min-width:".concat(g).concat(n, ")");
  }
  function u(h) {
    var g = gr.indexOf(h) + 1, m = a[gr[g]];
    if (g === gr.length)
      return l("xs");
    var y = typeof m == "number" && g > 0 ? m : h;
    return "@media (max-width:".concat(y - i / 100).concat(n, ")");
  }
  function c(h, g) {
    var m = gr.indexOf(g);
    return m === gr.length - 1 ? l(h) : "@media (min-width:".concat(typeof a[h] == "number" ? a[h] : h).concat(n, ") and ") + "(max-width:".concat((m !== -1 && typeof a[gr[m + 1]] == "number" ? a[gr[m + 1]] : g) - i / 100).concat(n, ")");
  }
  function d(h) {
    return c(h, h);
  }
  function p(h) {
    return a[h];
  }
  return Y({
    keys: gr,
    values: a,
    up: l,
    down: u,
    between: c,
    only: d,
    width: p
  }, s);
}
function Fd(t, e, a) {
  var r;
  return Y({
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
`)), Y({
        paddingLeft: e(2),
        paddingRight: e(2)
      }, o, Ot({}, t.up("sm"), Y({
        paddingLeft: e(3),
        paddingRight: e(3)
      }, o[t.up("sm")])));
    },
    toolbar: (r = {
      minHeight: 56
    }, Ot(r, "".concat(t.up("xs"), " and (orientation: landscape)"), {
      minHeight: 48
    }), Ot(r, t.up("sm"), {
      minHeight: 64
    }), r)
  }, a);
}
var Ds = {
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
    paper: Ma.white,
    default: Fi[50]
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
}, Io = {
  text: {
    primary: Ma.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    hint: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: Fi[800],
    default: "#303030"
  },
  action: {
    active: Ma.white,
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
function Ns(t, e, a, r) {
  var n = r.light || r, o = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(a) ? t[e] = t[a] : e === "light" ? t.light = Cc(t.main, n) : e === "dark" && (t.dark = Sc(t.main, o)));
}
function Bd(t) {
  var e = t.primary, a = e === void 0 ? {
    light: Ro[300],
    main: Ro[500],
    dark: Ro[700]
  } : e, r = t.secondary, n = r === void 0 ? {
    light: $o.A200,
    main: $o.A400,
    dark: $o.A700
  } : r, o = t.error, i = o === void 0 ? {
    light: ko[300],
    main: ko[500],
    dark: ko[700]
  } : o, s = t.warning, l = s === void 0 ? {
    light: _o[300],
    main: _o[500],
    dark: _o[700]
  } : s, u = t.info, c = u === void 0 ? {
    light: To[300],
    main: To[500],
    dark: To[700]
  } : u, d = t.success, p = d === void 0 ? {
    light: Oo[300],
    main: Oo[500],
    dark: Oo[700]
  } : d, h = t.type, g = h === void 0 ? "light" : h, m = t.contrastThreshold, y = m === void 0 ? 3 : m, w = t.tonalOffset, k = w === void 0 ? 0.2 : w, I = Ae(t, ["primary", "secondary", "error", "warning", "info", "success", "type", "contrastThreshold", "tonalOffset"]);
  function f(z) {
    var O = Nd(z, Io.text.primary) >= y ? Io.text.primary : Ds.text.primary;
    return O;
  }
  var x = function(O) {
    var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 500, M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 300, v = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 700;
    if (O = Y({}, O), !O.main && O[P] && (O.main = O[P]), !O.main)
      throw new Error(mn(4, P));
    if (typeof O.main != "string")
      throw new Error(mn(5, JSON.stringify(O.main)));
    return Ns(O, "light", M, k), Ns(O, "dark", v, k), O.contrastText || (O.contrastText = f(O.main)), O;
  }, E = {
    dark: Io,
    light: Ds
  }, N = Sr(Y({
    // A collection of common colors.
    common: Ma,
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
    grey: Fi,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: y,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: x,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: k
  }, E[g]), I);
  return N;
}
function wc(t) {
  return Math.round(t * 1e5) / 1e5;
}
function zd(t) {
  return wc(t);
}
var Ls = {
  textTransform: "uppercase"
}, Fs = '"Roboto", "Helvetica", "Arial", sans-serif';
function Wd(t, e) {
  var a = typeof e == "function" ? e(t) : e, r = a.fontFamily, n = r === void 0 ? Fs : r, o = a.fontSize, i = o === void 0 ? 14 : o, s = a.fontWeightLight, l = s === void 0 ? 300 : s, u = a.fontWeightRegular, c = u === void 0 ? 400 : u, d = a.fontWeightMedium, p = d === void 0 ? 500 : d, h = a.fontWeightBold, g = h === void 0 ? 700 : h, m = a.htmlFontSize, y = m === void 0 ? 16 : m, w = a.allVariants, k = a.pxToRem, I = Ae(a, ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"]), f = i / 14, x = k || function(z) {
    return "".concat(z / y * f, "rem");
  }, E = function(O, P, M, v, C) {
    return Y({
      fontFamily: n,
      fontWeight: O,
      fontSize: x(P),
      // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
      lineHeight: M
    }, n === Fs ? {
      letterSpacing: "".concat(wc(v / P), "em")
    } : {}, C, w);
  }, N = {
    h1: E(l, 96, 1.167, -1.5),
    h2: E(l, 60, 1.2, -0.5),
    h3: E(c, 48, 1.167, 0),
    h4: E(c, 34, 1.235, 0.25),
    h5: E(c, 24, 1.334, 0),
    h6: E(p, 20, 1.6, 0.15),
    subtitle1: E(c, 16, 1.75, 0.15),
    subtitle2: E(p, 14, 1.57, 0.1),
    body1: E(c, 16, 1.5, 0.15),
    body2: E(c, 14, 1.43, 0.15),
    button: E(p, 14, 1.75, 0.4, Ls),
    caption: E(c, 12, 1.66, 0.4),
    overline: E(c, 12, 2.66, 1, Ls)
  };
  return Sr(Y({
    htmlFontSize: y,
    pxToRem: x,
    round: zd,
    // TODO v5: remove
    fontFamily: n,
    fontSize: i,
    fontWeightLight: l,
    fontWeightRegular: c,
    fontWeightMedium: p,
    fontWeightBold: g
  }, N), I, {
    clone: !1
    // No need to clone deep
  });
}
var Vd = 0.2, Hd = 0.14, Kd = 0.12;
function xt() {
  return ["".concat(arguments.length <= 0 ? void 0 : arguments[0], "px ").concat(arguments.length <= 1 ? void 0 : arguments[1], "px ").concat(arguments.length <= 2 ? void 0 : arguments[2], "px ").concat(arguments.length <= 3 ? void 0 : arguments[3], "px rgba(0,0,0,").concat(Vd, ")"), "".concat(arguments.length <= 4 ? void 0 : arguments[4], "px ").concat(arguments.length <= 5 ? void 0 : arguments[5], "px ").concat(arguments.length <= 6 ? void 0 : arguments[6], "px ").concat(arguments.length <= 7 ? void 0 : arguments[7], "px rgba(0,0,0,").concat(Hd, ")"), "".concat(arguments.length <= 8 ? void 0 : arguments[8], "px ").concat(arguments.length <= 9 ? void 0 : arguments[9], "px ").concat(arguments.length <= 10 ? void 0 : arguments[10], "px ").concat(arguments.length <= 11 ? void 0 : arguments[11], "px rgba(0,0,0,").concat(Kd, ")")].join(",");
}
var Ud = ["none", xt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), xt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), xt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), xt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), xt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), xt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), xt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), xt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), xt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), xt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), xt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), xt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), xt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), xt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), xt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), xt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), xt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), xt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), xt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), xt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), xt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), xt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), xt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), xt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], qd = {
  borderRadius: 4
};
function ci(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var a = 0, r = Array(e); a < e; a++) r[a] = t[a];
  return r;
}
function Gd(t) {
  if (Array.isArray(t)) return ci(t);
}
function Ec(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function zi(t, e) {
  if (t) {
    if (typeof t == "string") return ci(t, e);
    var a = {}.toString.call(t).slice(8, -1);
    return a === "Object" && t.constructor && (a = t.constructor.name), a === "Map" || a === "Set" ? Array.from(t) : a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? ci(t, e) : void 0;
  }
}
function Yd() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ka(t) {
  return Gd(t) || Ec(t) || zi(t) || Yd();
}
function ja(t, e) {
  return e ? Sr(t, e, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : t;
}
var Xd = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
}, Bs = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: function(e) {
    return "@media (min-width:".concat(Xd[e], "px)");
  }
};
function kc(t, e, a) {
  if (Array.isArray(e)) {
    var r = t.theme.breakpoints || Bs;
    return e.reduce(function(i, s, l) {
      return i[r.up(r.keys[l])] = a(e[l]), i;
    }, {});
  }
  if (xr(e) === "object") {
    var n = t.theme.breakpoints || Bs;
    return Object.keys(e).reduce(function(i, s) {
      return i[n.up(s)] = a(e[s]), i;
    }, {});
  }
  var o = a(e);
  return o;
}
function zs(t, e) {
  return !e || typeof e != "string" ? null : e.split(".").reduce(function(a, r) {
    return a && a[r] ? a[r] : null;
  }, t);
}
function $e(t) {
  var e = t.prop, a = t.cssProperty, r = a === void 0 ? t.prop : a, n = t.themeKey, o = t.transform, i = function(l) {
    if (l[e] == null)
      return null;
    var u = l[e], c = l.theme, d = zs(c, n) || {}, p = function(g) {
      var m;
      return typeof d == "function" ? m = d(g) : Array.isArray(d) ? m = d[g] || g : (m = zs(d, g) || g, o && (m = o(m))), r === !1 ? m : Ot({}, r, m);
    };
    return kc(l, u, p);
  };
  return i.propTypes = {}, i.filterProps = [e], i;
}
function dr() {
  for (var t = arguments.length, e = new Array(t), a = 0; a < t; a++)
    e[a] = arguments[a];
  var r = function(o) {
    return e.reduce(function(i, s) {
      var l = s(o);
      return l ? ja(i, l) : i;
    }, {});
  };
  return r.propTypes = {}, r.filterProps = e.reduce(function(n, o) {
    return n.concat(o.filterProps);
  }, []), r;
}
function Jn(t) {
  return typeof t != "number" ? t : "".concat(t, "px solid");
}
var Jd = $e({
  prop: "border",
  themeKey: "borders",
  transform: Jn
}), Zd = $e({
  prop: "borderTop",
  themeKey: "borders",
  transform: Jn
}), Qd = $e({
  prop: "borderRight",
  themeKey: "borders",
  transform: Jn
}), ef = $e({
  prop: "borderBottom",
  themeKey: "borders",
  transform: Jn
}), tf = $e({
  prop: "borderLeft",
  themeKey: "borders",
  transform: Jn
}), rf = $e({
  prop: "borderColor",
  themeKey: "palette"
}), nf = $e({
  prop: "borderRadius",
  themeKey: "shape"
}), af = dr(Jd, Zd, Qd, ef, tf, rf, nf);
function Ws(t, e) {
  var a = {};
  return Object.keys(t).forEach(function(r) {
    e.indexOf(r) === -1 && (a[r] = t[r]);
  }), a;
}
function of(t) {
  var e = function(r) {
    var n = t(r);
    return r.css ? Y({}, ja(n, t(Y({
      theme: r.theme
    }, r.css))), Ws(r.css, [t.filterProps])) : r.sx ? Y({}, ja(n, t(Y({
      theme: r.theme
    }, r.sx))), Ws(r.sx, [t.filterProps])) : n;
  };
  return e.propTypes = {}, e.filterProps = ["css", "sx"].concat(Ka(t.filterProps)), e;
}
var sf = $e({
  prop: "displayPrint",
  cssProperty: !1,
  transform: function(e) {
    return {
      "@media print": {
        display: e
      }
    };
  }
}), lf = $e({
  prop: "display"
}), cf = $e({
  prop: "overflow"
}), uf = $e({
  prop: "textOverflow"
}), df = $e({
  prop: "visibility"
}), ff = $e({
  prop: "whiteSpace"
});
const pf = dr(sf, lf, cf, uf, df, ff);
var hf = $e({
  prop: "flexBasis"
}), mf = $e({
  prop: "flexDirection"
}), gf = $e({
  prop: "flexWrap"
}), vf = $e({
  prop: "justifyContent"
}), bf = $e({
  prop: "alignItems"
}), yf = $e({
  prop: "alignContent"
}), xf = $e({
  prop: "order"
}), Sf = $e({
  prop: "flex"
}), Cf = $e({
  prop: "flexGrow"
}), wf = $e({
  prop: "flexShrink"
}), Ef = $e({
  prop: "alignSelf"
}), kf = $e({
  prop: "justifyItems"
}), $f = $e({
  prop: "justifySelf"
}), Rf = dr(hf, mf, gf, vf, bf, yf, xf, Sf, Cf, wf, Ef, kf, $f), Tf = $e({
  prop: "gridGap"
}), Of = $e({
  prop: "gridColumnGap"
}), _f = $e({
  prop: "gridRowGap"
}), Pf = $e({
  prop: "gridColumn"
}), Af = $e({
  prop: "gridRow"
}), If = $e({
  prop: "gridAutoFlow"
}), Mf = $e({
  prop: "gridAutoColumns"
}), jf = $e({
  prop: "gridAutoRows"
}), Df = $e({
  prop: "gridTemplateColumns"
}), Nf = $e({
  prop: "gridTemplateRows"
}), Lf = $e({
  prop: "gridTemplateAreas"
}), Ff = $e({
  prop: "gridArea"
}), Bf = dr(Tf, Of, _f, Pf, Af, If, Mf, jf, Df, Nf, Lf, Ff), zf = $e({
  prop: "color",
  themeKey: "palette"
}), Wf = $e({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette"
}), Vf = dr(zf, Wf), Hf = $e({
  prop: "position"
}), Kf = $e({
  prop: "zIndex",
  themeKey: "zIndex"
}), Uf = $e({
  prop: "top"
}), qf = $e({
  prop: "right"
}), Gf = $e({
  prop: "bottom"
}), Yf = $e({
  prop: "left"
});
const Xf = dr(Hf, Kf, Uf, qf, Gf, Yf);
var Jf = $e({
  prop: "boxShadow",
  themeKey: "shadows"
});
function Rr(t) {
  return t <= 1 ? "".concat(t * 100, "%") : t;
}
var Zf = $e({
  prop: "width",
  transform: Rr
}), Qf = $e({
  prop: "maxWidth",
  transform: Rr
}), ep = $e({
  prop: "minWidth",
  transform: Rr
}), tp = $e({
  prop: "height",
  transform: Rr
}), rp = $e({
  prop: "maxHeight",
  transform: Rr
}), np = $e({
  prop: "minHeight",
  transform: Rr
});
$e({
  prop: "size",
  cssProperty: "width",
  transform: Rr
});
$e({
  prop: "size",
  cssProperty: "height",
  transform: Rr
});
var ap = $e({
  prop: "boxSizing"
}), op = dr(Zf, Qf, ep, tp, rp, np, ap);
function $c(t) {
  if (Array.isArray(t)) return t;
}
function ip(t, e) {
  var a = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (a != null) {
    var r, n, o, i, s = [], l = !0, u = !1;
    try {
      if (o = (a = a.call(t)).next, e !== 0) for (; !(l = (r = o.call(a)).done) && (s.push(r.value), s.length !== e); l = !0) ;
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
function Rc() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Cn(t, e) {
  return $c(t) || ip(t, e) || zi(t, e) || Rc();
}
function sp(t) {
  var e = {};
  return function(a) {
    return e[a] === void 0 && (e[a] = t(a)), e[a];
  };
}
var lp = {
  m: "margin",
  p: "padding"
}, cp = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Vs = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, up = sp(function(t) {
  if (t.length > 2)
    if (Vs[t])
      t = Vs[t];
    else
      return [t];
  var e = t.split(""), a = Cn(e, 2), r = a[0], n = a[1], o = lp[r], i = cp[n] || "";
  return Array.isArray(i) ? i.map(function(s) {
    return o + s;
  }) : [o + i];
}), Tc = ["m", "mt", "mr", "mb", "ml", "mx", "my", "p", "pt", "pr", "pb", "pl", "px", "py", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY"];
function Oc(t) {
  var e = t.spacing || 8;
  return typeof e == "number" ? function(a) {
    return e * a;
  } : Array.isArray(e) ? function(a) {
    return e[a];
  } : typeof e == "function" ? e : function() {
  };
}
function dp(t, e) {
  if (typeof e == "string" || e == null)
    return e;
  var a = Math.abs(e), r = t(a);
  return e >= 0 ? r : typeof r == "number" ? -r : "-".concat(r);
}
function fp(t, e) {
  return function(a) {
    return t.reduce(function(r, n) {
      return r[n] = dp(e, a), r;
    }, {});
  };
}
function Wi(t) {
  var e = t.theme, a = Oc(e);
  return Object.keys(t).map(function(r) {
    if (Tc.indexOf(r) === -1)
      return null;
    var n = up(r), o = fp(n, a), i = t[r];
    return kc(t, i, o);
  }).reduce(ja, {});
}
Wi.propTypes = {};
Wi.filterProps = Tc;
var pp = $e({
  prop: "fontFamily",
  themeKey: "typography"
}), hp = $e({
  prop: "fontSize",
  themeKey: "typography"
}), mp = $e({
  prop: "fontStyle",
  themeKey: "typography"
}), gp = $e({
  prop: "fontWeight",
  themeKey: "typography"
}), vp = $e({
  prop: "letterSpacing"
}), bp = $e({
  prop: "lineHeight"
}), yp = $e({
  prop: "textAlign"
}), xp = dr(pp, hp, mp, gp, vp, bp, yp);
function Sp() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 8;
  if (t.mui)
    return t;
  var e = Oc({
    spacing: t
  }), a = function() {
    for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++)
      o[i] = arguments[i];
    return o.length === 0 ? e(1) : o.length === 1 ? e(o[0]) : o.map(function(s) {
      if (typeof s == "string")
        return s;
      var l = e(s);
      return typeof l == "number" ? "".concat(l, "px") : l;
    }).join(" ");
  };
  return Object.defineProperty(a, "unit", {
    get: function() {
      return t;
    }
  }), a.mui = !0, a;
}
var Hs = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, ui = {
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
function Ks(t) {
  return "".concat(Math.round(t), "ms");
}
const Cp = {
  easing: Hs,
  duration: ui,
  create: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["all"], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = a.duration, n = r === void 0 ? ui.standard : r, o = a.easing, i = o === void 0 ? Hs.easeInOut : o, s = a.delay, l = s === void 0 ? 0 : s;
    return Ae(a, ["duration", "easing", "delay"]), (Array.isArray(e) ? e : [e]).map(function(u) {
      return "".concat(u, " ").concat(typeof n == "string" ? n : Ks(n), " ").concat(i, " ").concat(typeof l == "string" ? l : Ks(l));
    }).join(",");
  },
  getAutoHeightDuration: function(e) {
    if (!e)
      return 0;
    var a = e / 36;
    return Math.round((4 + 15 * Math.pow(a, 0.25) + a / 5) * 10);
  }
};
var _c = {
  mobileStepper: 1e3,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function wp() {
  for (var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = t.breakpoints, a = e === void 0 ? {} : e, r = t.mixins, n = r === void 0 ? {} : r, o = t.palette, i = o === void 0 ? {} : o, s = t.spacing, l = t.typography, u = l === void 0 ? {} : l, c = Ae(t, ["breakpoints", "mixins", "palette", "spacing", "typography"]), d = Bd(i), p = Ld(a), h = Sp(s), g = Sr({
    breakpoints: p,
    direction: "ltr",
    mixins: Fd(p, h, n),
    overrides: {},
    // Inject custom styles
    palette: d,
    props: {},
    // Provide default props
    shadows: Ud,
    typography: Wd(d, u),
    spacing: h,
    shape: qd,
    transitions: Cp,
    zIndex: _c
  }, c), m = arguments.length, y = new Array(m > 1 ? m - 1 : 0), w = 1; w < m; w++)
    y[w - 1] = arguments[w];
  return g = y.reduce(function(k, I) {
    return Sr(k, I);
  }, g), g;
}
var Ep = typeof Symbol == "function" && Symbol.for;
const kp = Ep ? Symbol.for("mui.nested") : "__THEME_NESTED__";
var $p = ["checked", "disabled", "error", "focused", "focusVisible", "required", "expanded", "selected"];
function Rp() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = t.disableGlobal, a = e === void 0 ? !1 : e, r = t.productionPrefix, n = r === void 0 ? "jss" : r, o = t.seed, i = o === void 0 ? "" : o, s = i === "" ? "" : "".concat(i, "-"), l = 0, u = function() {
    return l += 1, l;
  };
  return function(c, d) {
    var p = d.options.name;
    if (p && p.indexOf("Mui") === 0 && !d.options.link && !a) {
      if ($p.indexOf(c.key) !== -1)
        return "Mui-".concat(c.key);
      var h = "".concat(s).concat(p, "-").concat(c.key);
      return !d.options.theme[kp] || i !== "" ? h : "".concat(h, "-").concat(u());
    }
    return "".concat(s).concat(n).concat(u());
  };
}
function Pc(t) {
  var e = t.theme, a = t.name, r = t.props;
  if (!e || !e.props || !e.props[a])
    return r;
  var n = e.props[a], o;
  for (o in n)
    r[o] === void 0 && (r[o] = n[o]);
  return r;
}
var Us = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
  return typeof t;
} : function(t) {
  return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, Zn = (typeof window > "u" ? "undefined" : Us(window)) === "object" && (typeof document > "u" ? "undefined" : Us(document)) === "object" && document.nodeType === 9;
function Tp(t, e) {
  for (var a = 0; a < e.length; a++) {
    var r = e[a];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, xc(r.key), r);
  }
}
function Vi(t, e, a) {
  return e && Tp(t.prototype, e), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function di(t, e) {
  return di = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, r) {
    return a.__proto__ = r, a;
  }, di(t, e);
}
function Ua(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, di(t, e);
}
function fi(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
var Op = {}.constructor;
function pi(t) {
  if (t == null || typeof t != "object") return t;
  if (Array.isArray(t)) return t.map(pi);
  if (t.constructor !== Op) return t;
  var e = {};
  for (var a in t)
    e[a] = pi(t[a]);
  return e;
}
function Hi(t, e, a) {
  t === void 0 && (t = "unnamed");
  var r = a.jss, n = pi(e), o = r.plugins.onCreateRule(t, n, a);
  return o || (t[0], null);
}
var qs = function(e, a) {
  for (var r = "", n = 0; n < e.length && e[n] !== "!important"; n++)
    r && (r += a), r += e[n];
  return r;
}, Lr = function(e) {
  if (!Array.isArray(e)) return e;
  var a = "";
  if (Array.isArray(e[0]))
    for (var r = 0; r < e.length && e[r] !== "!important"; r++)
      a && (a += ", "), a += qs(e[r], " ");
  else a = qs(e, ", ");
  return e[e.length - 1] === "!important" && (a += " !important"), a;
};
function wn(t) {
  return t && t.format === !1 ? {
    linebreak: "",
    space: ""
  } : {
    linebreak: `
`,
    space: " "
  };
}
function _n(t, e) {
  for (var a = "", r = 0; r < e; r++)
    a += "  ";
  return a + t;
}
function Hn(t, e, a) {
  a === void 0 && (a = {});
  var r = "";
  if (!e) return r;
  var n = a, o = n.indent, i = o === void 0 ? 0 : o, s = e.fallbacks;
  a.format === !1 && (i = -1 / 0);
  var l = wn(a), u = l.linebreak, c = l.space;
  if (t && i++, s)
    if (Array.isArray(s))
      for (var d = 0; d < s.length; d++) {
        var p = s[d];
        for (var h in p) {
          var g = p[h];
          g != null && (r && (r += u), r += _n(h + ":" + c + Lr(g) + ";", i));
        }
      }
    else
      for (var m in s) {
        var y = s[m];
        y != null && (r && (r += u), r += _n(m + ":" + c + Lr(y) + ";", i));
      }
  for (var w in e) {
    var k = e[w];
    k != null && w !== "fallbacks" && (r && (r += u), r += _n(w + ":" + c + Lr(k) + ";", i));
  }
  return !r && !a.allowEmpty || !t ? r : (i--, r && (r = "" + u + r + u), _n("" + t + c + "{" + r, i) + _n("}", i));
}
var _p = /([[\].#*$><+~=|^:(),"'`\s])/g, Gs = typeof CSS < "u" && CSS.escape, Ki = (function(t) {
  return Gs ? Gs(t) : t.replace(_p, "\\$1");
}), Ac = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "style", this.isProcessed = !1;
    var o = n.sheet, i = n.Renderer;
    this.key = a, this.options = n, this.style = r, o ? this.renderer = o.renderer : i && (this.renderer = new i());
  }
  var e = t.prototype;
  return e.prop = function(r, n, o) {
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
  }, t;
})(), hi = /* @__PURE__ */ (function(t) {
  Ua(e, t);
  function e(r, n, o) {
    var i;
    i = t.call(this, r, n, o) || this;
    var s = o.selector, l = o.scoped, u = o.sheet, c = o.generateId;
    return s ? i.selectorText = s : l !== !1 && (i.id = c(fi(fi(i)), u), i.selectorText = "." + Ki(i.id)), i;
  }
  var a = e.prototype;
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
      typeof i != "object" ? n[o] = i : Array.isArray(i) && (n[o] = Lr(i));
    }
    return n;
  }, a.toString = function(n) {
    var o = this.options.sheet, i = o ? o.options.link : !1, s = i ? Y({}, n, {
      allowEmpty: !0
    }) : n;
    return Hn(this.selectorText, this.style, s);
  }, Vi(e, [{
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
  }]), e;
})(Ac), Pp = {
  onCreateRule: function(e, a, r) {
    return e[0] === "@" || r.parent && r.parent.type === "keyframes" ? null : new hi(e, a, r);
  }
}, Mo = {
  indent: 1,
  children: !0
}, Ap = /@([\w-]+)/, Ip = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "conditional", this.isProcessed = !1, this.key = a;
    var o = a.match(Ap);
    this.at = o ? o[1] : "unknown", this.query = n.name || "@" + this.at, this.options = n, this.rules = new qa(Y({}, n, {
      parent: this
    }));
    for (var i in r)
      this.rules.add(i, r[i]);
    this.rules.process();
  }
  var e = t.prototype;
  return e.getRule = function(r) {
    return this.rules.get(r);
  }, e.indexOf = function(r) {
    return this.rules.indexOf(r);
  }, e.addRule = function(r, n, o) {
    var i = this.rules.add(r, n, o);
    return i ? (this.options.jss.plugins.onProcessRule(i), i) : null;
  }, e.replaceRule = function(r, n, o) {
    var i = this.rules.replace(r, n, o);
    return i && this.options.jss.plugins.onProcessRule(i), i;
  }, e.toString = function(r) {
    r === void 0 && (r = Mo);
    var n = wn(r), o = n.linebreak;
    if (r.indent == null && (r.indent = Mo.indent), r.children == null && (r.children = Mo.children), r.children === !1)
      return this.query + " {}";
    var i = this.rules.toString(r);
    return i ? this.query + " {" + o + i + o + "}" : "";
  }, t;
})(), Mp = /@container|@media|@supports\s+/, jp = {
  onCreateRule: function(e, a, r) {
    return Mp.test(e) ? new Ip(e, a, r) : null;
  }
}, jo = {
  indent: 1,
  children: !0
}, Dp = /@keyframes\s+([\w-]+)/, mi = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "keyframes", this.at = "@keyframes", this.isProcessed = !1;
    var o = a.match(Dp);
    o && o[1] ? this.name = o[1] : this.name = "noname", this.key = this.type + "-" + this.name, this.options = n;
    var i = n.scoped, s = n.sheet, l = n.generateId;
    this.id = i === !1 ? this.name : Ki(l(this, s)), this.rules = new qa(Y({}, n, {
      parent: this
    }));
    for (var u in r)
      this.rules.add(u, r[u], Y({}, n, {
        parent: this
      }));
    this.rules.process();
  }
  var e = t.prototype;
  return e.toString = function(r) {
    r === void 0 && (r = jo);
    var n = wn(r), o = n.linebreak;
    if (r.indent == null && (r.indent = jo.indent), r.children == null && (r.children = jo.children), r.children === !1)
      return this.at + " " + this.id + " {}";
    var i = this.rules.toString(r);
    return i && (i = "" + o + i + o), this.at + " " + this.id + " {" + i + "}";
  }, t;
})(), Np = /@keyframes\s+/, Lp = /\$([\w-]+)/g, gi = function(e, a) {
  return typeof e == "string" ? e.replace(Lp, function(r, n) {
    return n in a ? a[n] : r;
  }) : e;
}, Ys = function(e, a, r) {
  var n = e[a], o = gi(n, r);
  o !== n && (e[a] = o);
}, Fp = {
  onCreateRule: function(e, a, r) {
    return typeof e == "string" && Np.test(e) ? new mi(e, a, r) : null;
  },
  // Animation name ref replacer.
  onProcessStyle: function(e, a, r) {
    return a.type !== "style" || !r || ("animation-name" in e && Ys(e, "animation-name", r.keyframes), "animation" in e && Ys(e, "animation", r.keyframes)), e;
  },
  onChangeValue: function(e, a, r) {
    var n = r.options.sheet;
    if (!n)
      return e;
    switch (a) {
      case "animation":
        return gi(e, n.keyframes);
      case "animation-name":
        return gi(e, n.keyframes);
      default:
        return e;
    }
  }
}, Bp = /* @__PURE__ */ (function(t) {
  Ua(e, t);
  function e() {
    return t.apply(this, arguments) || this;
  }
  var a = e.prototype;
  return a.toString = function(n) {
    var o = this.options.sheet, i = o ? o.options.link : !1, s = i ? Y({}, n, {
      allowEmpty: !0
    }) : n;
    return Hn(this.key, this.style, s);
  }, e;
})(Ac), zp = {
  onCreateRule: function(e, a, r) {
    return r.parent && r.parent.type === "keyframes" ? new Bp(e, a, r) : null;
  }
}, Wp = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "font-face", this.at = "@font-face", this.isProcessed = !1, this.key = a, this.style = r, this.options = n;
  }
  var e = t.prototype;
  return e.toString = function(r) {
    var n = wn(r), o = n.linebreak;
    if (Array.isArray(this.style)) {
      for (var i = "", s = 0; s < this.style.length; s++)
        i += Hn(this.at, this.style[s]), this.style[s + 1] && (i += o);
      return i;
    }
    return Hn(this.at, this.style, r);
  }, t;
})(), Vp = /@font-face/, Hp = {
  onCreateRule: function(e, a, r) {
    return Vp.test(e) ? new Wp(e, a, r) : null;
  }
}, Kp = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "viewport", this.at = "@viewport", this.isProcessed = !1, this.key = a, this.style = r, this.options = n;
  }
  var e = t.prototype;
  return e.toString = function(r) {
    return Hn(this.key, this.style, r);
  }, t;
})(), Up = {
  onCreateRule: function(e, a, r) {
    return e === "@viewport" || e === "@-ms-viewport" ? new Kp(e, a, r) : null;
  }
}, qp = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "simple", this.isProcessed = !1, this.key = a, this.value = r, this.options = n;
  }
  var e = t.prototype;
  return e.toString = function(r) {
    if (Array.isArray(this.value)) {
      for (var n = "", o = 0; o < this.value.length; o++)
        n += this.key + " " + this.value[o] + ";", this.value[o + 1] && (n += `
`);
      return n;
    }
    return this.key + " " + this.value + ";";
  }, t;
})(), Gp = {
  "@charset": !0,
  "@import": !0,
  "@namespace": !0
}, Yp = {
  onCreateRule: function(e, a, r) {
    return e in Gp ? new qp(e, a, r) : null;
  }
}, Xs = [Pp, jp, Fp, zp, Hp, Up, Yp], Xp = {
  process: !0
}, Js = {
  force: !0,
  process: !0
  /**
   * Contains rules objects and allows adding/removing etc.
   * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
   */
}, qa = /* @__PURE__ */ (function() {
  function t(a) {
    this.map = {}, this.raw = {}, this.index = [], this.counter = 0, this.options = a, this.classes = a.classes, this.keyframes = a.keyframes;
  }
  var e = t.prototype;
  return e.add = function(r, n, o) {
    var i = this.options, s = i.parent, l = i.sheet, u = i.jss, c = i.Renderer, d = i.generateId, p = i.scoped, h = Y({
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
    r in this.raw && (g = r + "-d" + this.counter++), this.raw[g] = n, g in this.classes && (h.selector = "." + Ki(this.classes[g]));
    var m = Hi(g, n, h);
    if (!m) return null;
    this.register(m);
    var y = h.index === void 0 ? this.index.length : h.index;
    return this.index.splice(y, 0, m), m;
  }, e.replace = function(r, n, o) {
    var i = this.get(r), s = this.index.indexOf(i);
    i && this.remove(i);
    var l = o;
    return s !== -1 && (l = Y({}, o, {
      index: s
    })), this.add(r, n, l);
  }, e.get = function(r) {
    return this.map[r];
  }, e.remove = function(r) {
    this.unregister(r), delete this.raw[r.key], this.index.splice(this.index.indexOf(r), 1);
  }, e.indexOf = function(r) {
    return this.index.indexOf(r);
  }, e.process = function() {
    var r = this.options.jss.plugins;
    this.index.slice(0).forEach(r.onProcessRule, r);
  }, e.register = function(r) {
    this.map[r.key] = r, r instanceof hi ? (this.map[r.selector] = r, r.id && (this.classes[r.key] = r.id)) : r instanceof mi && this.keyframes && (this.keyframes[r.name] = r.id);
  }, e.unregister = function(r) {
    delete this.map[r.key], r instanceof hi ? (delete this.map[r.selector], delete this.classes[r.key]) : r instanceof mi && delete this.keyframes[r.name];
  }, e.update = function() {
    var r, n, o;
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) == "string" ? (r = arguments.length <= 0 ? void 0 : arguments[0], n = arguments.length <= 1 ? void 0 : arguments[1], o = arguments.length <= 2 ? void 0 : arguments[2]) : (n = arguments.length <= 0 ? void 0 : arguments[0], o = arguments.length <= 1 ? void 0 : arguments[1], r = null), r)
      this.updateOne(this.get(r), n, o);
    else
      for (var i = 0; i < this.index.length; i++)
        this.updateOne(this.index[i], n, o);
  }, e.updateOne = function(r, n, o) {
    o === void 0 && (o = Xp);
    var i = this.options, s = i.jss.plugins, l = i.sheet;
    if (r.rules instanceof t) {
      r.rules.update(n, o);
      return;
    }
    var u = r.style;
    if (s.onUpdate(n, r, l, o), o.process && u && u !== r.style) {
      s.onProcessStyle(r.style, r, l);
      for (var c in r.style) {
        var d = r.style[c], p = u[c];
        d !== p && r.prop(c, d, Js);
      }
      for (var h in u) {
        var g = r.style[h], m = u[h];
        g == null && g !== m && r.prop(h, null, Js);
      }
    }
  }, e.toString = function(r) {
    for (var n = "", o = this.options.sheet, i = o ? o.options.link : !1, s = wn(r), l = s.linebreak, u = 0; u < this.index.length; u++) {
      var c = this.index[u], d = c.toString(r);
      !d && !i || (n && (n += l), n += d);
    }
    return n;
  }, t;
})(), Ic = /* @__PURE__ */ (function() {
  function t(a, r) {
    this.attached = !1, this.deployed = !1, this.classes = {}, this.keyframes = {}, this.options = Y({}, r, {
      sheet: this,
      parent: this,
      classes: this.classes,
      keyframes: this.keyframes
    }), r.Renderer && (this.renderer = new r.Renderer(this)), this.rules = new qa(this.options);
    for (var n in a)
      this.rules.add(n, a[n]);
    this.rules.process();
  }
  var e = t.prototype;
  return e.attach = function() {
    return this.attached ? this : (this.renderer && this.renderer.attach(), this.attached = !0, this.deployed || this.deploy(), this);
  }, e.detach = function() {
    return this.attached ? (this.renderer && this.renderer.detach(), this.attached = !1, this) : this;
  }, e.addRule = function(r, n, o) {
    var i = this.queue;
    this.attached && !i && (this.queue = []);
    var s = this.rules.add(r, n, o);
    return s ? (this.options.jss.plugins.onProcessRule(s), this.attached ? (this.deployed && (i ? i.push(s) : (this.insertRule(s), this.queue && (this.queue.forEach(this.insertRule, this), this.queue = void 0))), s) : (this.deployed = !1, s)) : null;
  }, e.replaceRule = function(r, n, o) {
    var i = this.rules.get(r);
    if (!i) return this.addRule(r, n, o);
    var s = this.rules.replace(r, n, o);
    return s && this.options.jss.plugins.onProcessRule(s), this.attached ? (this.deployed && this.renderer && (s ? i.renderable && this.renderer.replaceRule(i.renderable, s) : this.renderer.deleteRule(i)), s) : (this.deployed = !1, s);
  }, e.insertRule = function(r) {
    this.renderer && this.renderer.insertRule(r);
  }, e.addRules = function(r, n) {
    var o = [];
    for (var i in r) {
      var s = this.addRule(i, r[i], n);
      s && o.push(s);
    }
    return o;
  }, e.getRule = function(r) {
    return this.rules.get(r);
  }, e.deleteRule = function(r) {
    var n = typeof r == "object" ? r : this.rules.get(r);
    return !n || // Style sheet was created without link: true and attached, in this case we
    // won't be able to remove the CSS rule from the DOM.
    this.attached && !n.renderable ? !1 : (this.rules.remove(n), this.attached && n.renderable && this.renderer ? this.renderer.deleteRule(n.renderable) : !0);
  }, e.indexOf = function(r) {
    return this.rules.indexOf(r);
  }, e.deploy = function() {
    return this.renderer && this.renderer.deploy(), this.deployed = !0, this;
  }, e.update = function() {
    var r;
    return (r = this.rules).update.apply(r, arguments), this;
  }, e.updateOne = function(r, n, o) {
    return this.rules.updateOne(r, n, o), this;
  }, e.toString = function(r) {
    return this.rules.toString(r);
  }, t;
})(), Jp = /* @__PURE__ */ (function() {
  function t() {
    this.plugins = {
      internal: [],
      external: []
    }, this.registry = {};
  }
  var e = t.prototype;
  return e.onCreateRule = function(r, n, o) {
    for (var i = 0; i < this.registry.onCreateRule.length; i++) {
      var s = this.registry.onCreateRule[i](r, n, o);
      if (s) return s;
    }
    return null;
  }, e.onProcessRule = function(r) {
    if (!r.isProcessed) {
      for (var n = r.options.sheet, o = 0; o < this.registry.onProcessRule.length; o++)
        this.registry.onProcessRule[o](r, n);
      r.style && this.onProcessStyle(r.style, r, n), r.isProcessed = !0;
    }
  }, e.onProcessStyle = function(r, n, o) {
    for (var i = 0; i < this.registry.onProcessStyle.length; i++)
      n.style = this.registry.onProcessStyle[i](n.style, n, o);
  }, e.onProcessSheet = function(r) {
    for (var n = 0; n < this.registry.onProcessSheet.length; n++)
      this.registry.onProcessSheet[n](r);
  }, e.onUpdate = function(r, n, o, i) {
    for (var s = 0; s < this.registry.onUpdate.length; s++)
      this.registry.onUpdate[s](r, n, o, i);
  }, e.onChangeValue = function(r, n, o) {
    for (var i = r, s = 0; s < this.registry.onChangeValue.length; s++)
      i = this.registry.onChangeValue[s](i, n, o);
    return i;
  }, e.use = function(r, n) {
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
  }, t;
})(), Zp = /* @__PURE__ */ (function() {
  function t() {
    this.registry = [];
  }
  var e = t.prototype;
  return e.add = function(r) {
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
  }, e.reset = function() {
    this.registry = [];
  }, e.remove = function(r) {
    var n = this.registry.indexOf(r);
    this.registry.splice(n, 1);
  }, e.toString = function(r) {
    for (var n = r === void 0 ? {} : r, o = n.attached, i = Ha(n, ["attached"]), s = wn(i), l = s.linebreak, u = "", c = 0; c < this.registry.length; c++) {
      var d = this.registry[c];
      o != null && d.attached !== o || (u && (u += l), u += d.toString(i));
    }
    return u;
  }, Vi(t, [{
    key: "index",
    /**
     * Current highest index number.
     */
    get: function() {
      return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
    }
  }]), t;
})(), Bn = new Zp(), vi = typeof globalThis < "u" ? globalThis : typeof window < "u" && window.Math === Math ? window : typeof self < "u" && self.Math === Math ? self : Function("return this")(), bi = "2f1acc6c3a606b082e5eef5e54414ffb";
vi[bi] == null && (vi[bi] = 0);
var Zs = vi[bi]++, Qs = function(e) {
  e === void 0 && (e = {});
  var a = 0, r = function(o, i) {
    a += 1;
    var s = "", l = "";
    return i && (i.options.classNamePrefix && (l = i.options.classNamePrefix), i.options.jss.id != null && (s = String(i.options.jss.id))), e.minify ? "" + (l || "c") + Zs + s + a : l + o.key + "-" + Zs + (s ? "-" + s : "") + "-" + a;
  };
  return r;
}, Mc = function(e) {
  var a;
  return function() {
    return a || (a = e()), a;
  };
}, Qp = function(e, a) {
  try {
    return e.attributeStyleMap ? e.attributeStyleMap.get(a) : e.style.getPropertyValue(a);
  } catch {
    return "";
  }
}, eh = function(e, a, r) {
  try {
    var n = r;
    if (Array.isArray(r) && (n = Lr(r)), e.attributeStyleMap)
      e.attributeStyleMap.set(a, n);
    else {
      var o = n ? n.indexOf("!important") : -1, i = o > -1 ? n.substr(0, o - 1) : n;
      e.style.setProperty(a, i, o > -1 ? "important" : "");
    }
  } catch {
    return !1;
  }
  return !0;
}, th = function(e, a) {
  try {
    e.attributeStyleMap ? e.attributeStyleMap.delete(a) : e.style.removeProperty(a);
  } catch {
  }
}, rh = function(e, a) {
  return e.selectorText = a, e.selectorText === a;
}, jc = Mc(function() {
  return document.querySelector("head");
});
function nh(t, e) {
  for (var a = 0; a < t.length; a++) {
    var r = t[a];
    if (r.attached && r.options.index > e.index && r.options.insertionPoint === e.insertionPoint)
      return r;
  }
  return null;
}
function ah(t, e) {
  for (var a = t.length - 1; a >= 0; a--) {
    var r = t[a];
    if (r.attached && r.options.insertionPoint === e.insertionPoint)
      return r;
  }
  return null;
}
function oh(t) {
  for (var e = jc(), a = 0; a < e.childNodes.length; a++) {
    var r = e.childNodes[a];
    if (r.nodeType === 8 && r.nodeValue.trim() === t)
      return r;
  }
  return null;
}
function ih(t) {
  var e = Bn.registry;
  if (e.length > 0) {
    var a = nh(e, t);
    if (a && a.renderer)
      return {
        parent: a.renderer.element.parentNode,
        node: a.renderer.element
      };
    if (a = ah(e, t), a && a.renderer)
      return {
        parent: a.renderer.element.parentNode,
        node: a.renderer.element.nextSibling
      };
  }
  var r = t.insertionPoint;
  if (r && typeof r == "string") {
    var n = oh(r);
    if (n)
      return {
        parent: n.parentNode,
        node: n.nextSibling
      };
  }
  return !1;
}
function sh(t, e) {
  var a = e.insertionPoint, r = ih(e);
  if (r !== !1 && r.parent) {
    r.parent.insertBefore(t, r.node);
    return;
  }
  if (a && typeof a.nodeType == "number") {
    var n = a, o = n.parentNode;
    o && o.insertBefore(t, n.nextSibling);
    return;
  }
  jc().appendChild(t);
}
var lh = Mc(function() {
  var t = document.querySelector('meta[property="csp-nonce"]');
  return t ? t.getAttribute("content") : null;
}), el = function(e, a, r) {
  try {
    "insertRule" in e ? e.insertRule(a, r) : "appendRule" in e && e.appendRule(a);
  } catch {
    return !1;
  }
  return e.cssRules[r];
}, tl = function(e, a) {
  var r = e.cssRules.length;
  return a === void 0 || a > r ? r : a;
}, ch = function() {
  var e = document.createElement("style");
  return e.textContent = `
`, e;
}, uh = /* @__PURE__ */ (function() {
  function t(a) {
    this.getPropertyValue = Qp, this.setProperty = eh, this.removeProperty = th, this.setSelector = rh, this.hasInsertedRules = !1, this.cssRules = [], a && Bn.add(a), this.sheet = a;
    var r = this.sheet ? this.sheet.options : {}, n = r.media, o = r.meta, i = r.element;
    this.element = i || ch(), this.element.setAttribute("data-jss", ""), n && this.element.setAttribute("media", n), o && this.element.setAttribute("data-meta", o);
    var s = lh();
    s && this.element.setAttribute("nonce", s);
  }
  var e = t.prototype;
  return e.attach = function() {
    if (!(this.element.parentNode || !this.sheet)) {
      sh(this.element, this.sheet.options);
      var r = !!(this.sheet && this.sheet.deployed);
      this.hasInsertedRules && r && (this.hasInsertedRules = !1, this.deploy());
    }
  }, e.detach = function() {
    if (this.sheet) {
      var r = this.element.parentNode;
      r && r.removeChild(this.element), this.sheet.options.link && (this.cssRules = [], this.element.textContent = `
`);
    }
  }, e.deploy = function() {
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
  }, e.insertRules = function(r, n) {
    for (var o = 0; o < r.index.length; o++)
      this.insertRule(r.index[o], o, n);
  }, e.insertRule = function(r, n, o) {
    if (o === void 0 && (o = this.element.sheet), r.rules) {
      var i = r, s = o;
      if (r.type === "conditional" || r.type === "keyframes") {
        var l = tl(o, n);
        if (s = el(o, i.toString({
          children: !1
        }), l), s === !1)
          return !1;
        this.refCssRule(r, l, s);
      }
      return this.insertRules(i.rules, s), s;
    }
    var u = r.toString();
    if (!u) return !1;
    var c = tl(o, n), d = el(o, u, c);
    return d === !1 ? !1 : (this.hasInsertedRules = !0, this.refCssRule(r, c, d), d);
  }, e.refCssRule = function(r, n, o) {
    r.renderable = o, r.options.parent instanceof Ic && this.cssRules.splice(n, 0, o);
  }, e.deleteRule = function(r) {
    var n = this.element.sheet, o = this.indexOf(r);
    return o === -1 ? !1 : (n.deleteRule(o), this.cssRules.splice(o, 1), !0);
  }, e.indexOf = function(r) {
    return this.cssRules.indexOf(r);
  }, e.replaceRule = function(r, n) {
    var o = this.indexOf(r);
    return o === -1 ? !1 : (this.element.sheet.deleteRule(o), this.cssRules.splice(o, 1), this.insertRule(n, o));
  }, e.getRules = function() {
    return this.element.sheet.cssRules;
  }, t;
})(), dh = 0, fh = /* @__PURE__ */ (function() {
  function t(a) {
    this.id = dh++, this.version = "10.10.0", this.plugins = new Jp(), this.options = {
      id: {
        minify: !1
      },
      createGenerateId: Qs,
      Renderer: Zn ? uh : null,
      plugins: []
    }, this.generateId = Qs({
      minify: !1
    });
    for (var r = 0; r < Xs.length; r++)
      this.plugins.use(Xs[r], {
        queue: "internal"
      });
    this.setup(a);
  }
  var e = t.prototype;
  return e.setup = function(r) {
    return r === void 0 && (r = {}), r.createGenerateId && (this.options.createGenerateId = r.createGenerateId), r.id && (this.options.id = Y({}, this.options.id, r.id)), (r.createGenerateId || r.id) && (this.generateId = this.options.createGenerateId(this.options.id)), r.insertionPoint != null && (this.options.insertionPoint = r.insertionPoint), "Renderer" in r && (this.options.Renderer = r.Renderer), r.plugins && this.use.apply(this, r.plugins), this;
  }, e.createStyleSheet = function(r, n) {
    n === void 0 && (n = {});
    var o = n, i = o.index;
    typeof i != "number" && (i = Bn.index === 0 ? 0 : Bn.index + 1);
    var s = new Ic(r, Y({}, n, {
      jss: this,
      generateId: n.generateId || this.generateId,
      insertionPoint: this.options.insertionPoint,
      Renderer: this.options.Renderer,
      index: i
    }));
    return this.plugins.onProcessSheet(s), s;
  }, e.removeStyleSheet = function(r) {
    return r.detach(), Bn.remove(r), this;
  }, e.createRule = function(r, n, o) {
    if (n === void 0 && (n = {}), o === void 0 && (o = {}), typeof r == "object")
      return this.createRule(void 0, r, n);
    var i = Y({}, o, {
      name: r,
      jss: this,
      Renderer: this.options.Renderer
    });
    i.generateId || (i.generateId = this.generateId), i.classes || (i.classes = {}), i.keyframes || (i.keyframes = {});
    var s = Hi(r, n, i);
    return s && this.plugins.onProcessRule(s), s;
  }, e.use = function() {
    for (var r = this, n = arguments.length, o = new Array(n), i = 0; i < n; i++)
      o[i] = arguments[i];
    return o.forEach(function(s) {
      r.plugins.use(s);
    }), this;
  }, t;
})(), Dc = function(e) {
  return new fh(e);
}, Ui = typeof CSS == "object" && CSS != null && "number" in CSS;
function Nc(t) {
  var e = null;
  for (var a in t) {
    var r = t[a], n = typeof r;
    if (n === "function")
      e || (e = {}), e[a] = r;
    else if (n === "object" && r !== null && !Array.isArray(r)) {
      var o = Nc(r);
      o && (e || (e = {}), e[a] = o);
    }
  }
  return e;
}
/**
 * A better abstraction over CSS.
 *
 * @copyright Oleg Isonen (Slobodskoi) / Isonen 2014-present
 * @website https://github.com/cssinjs/jss
 * @license MIT
 */
Dc();
var Lc = Date.now(), Do = "fnValues" + Lc, No = "fnStyle" + ++Lc, ph = function() {
  return {
    onCreateRule: function(a, r, n) {
      if (typeof r != "function") return null;
      var o = Hi(a, {}, n);
      return o[No] = r, o;
    },
    onProcessStyle: function(a, r) {
      if (Do in r || No in r) return a;
      var n = {};
      for (var o in a) {
        var i = a[o];
        typeof i == "function" && (delete a[o], n[o] = i);
      }
      return r[Do] = n, a;
    },
    onUpdate: function(a, r, n, o) {
      var i = r, s = i[No];
      s && (i.style = s(a) || {});
      var l = i[Do];
      if (l)
        for (var u in l)
          i.prop(u, l[u](a), o);
    }
  };
}, yr = "@global", yi = "@global ", hh = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "global", this.at = yr, this.isProcessed = !1, this.key = a, this.options = n, this.rules = new qa(Y({}, n, {
      parent: this
    }));
    for (var o in r)
      this.rules.add(o, r[o]);
    this.rules.process();
  }
  var e = t.prototype;
  return e.getRule = function(r) {
    return this.rules.get(r);
  }, e.addRule = function(r, n, o) {
    var i = this.rules.add(r, n, o);
    return i && this.options.jss.plugins.onProcessRule(i), i;
  }, e.replaceRule = function(r, n, o) {
    var i = this.rules.replace(r, n, o);
    return i && this.options.jss.plugins.onProcessRule(i), i;
  }, e.indexOf = function(r) {
    return this.rules.indexOf(r);
  }, e.toString = function(r) {
    return this.rules.toString(r);
  }, t;
})(), mh = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "global", this.at = yr, this.isProcessed = !1, this.key = a, this.options = n;
    var o = a.substr(yi.length);
    this.rule = n.jss.createRule(o, r, Y({}, n, {
      parent: this
    }));
  }
  var e = t.prototype;
  return e.toString = function(r) {
    return this.rule ? this.rule.toString(r) : "";
  }, t;
})(), gh = /\s*,\s*/g;
function Fc(t, e) {
  for (var a = t.split(gh), r = "", n = 0; n < a.length; n++)
    r += e + " " + a[n].trim(), a[n + 1] && (r += ", ");
  return r;
}
function vh(t, e) {
  var a = t.options, r = t.style, n = r ? r[yr] : null;
  if (n) {
    for (var o in n)
      e.addRule(o, n[o], Y({}, a, {
        selector: Fc(o, t.selector)
      }));
    delete r[yr];
  }
}
function bh(t, e) {
  var a = t.options, r = t.style;
  for (var n in r)
    if (!(n[0] !== "@" || n.substr(0, yr.length) !== yr)) {
      var o = Fc(n.substr(yr.length), t.selector);
      e.addRule(o, r[n], Y({}, a, {
        selector: o
      })), delete r[n];
    }
}
function yh() {
  function t(a, r, n) {
    if (!a) return null;
    if (a === yr)
      return new hh(a, r, n);
    if (a[0] === "@" && a.substr(0, yi.length) === yi)
      return new mh(a, r, n);
    var o = n.parent;
    return o && (o.type === "global" || o.options.parent && o.options.parent.type === "global") && (n.scoped = !1), !n.selector && n.scoped === !1 && (n.selector = a), null;
  }
  function e(a, r) {
    a.type !== "style" || !r || (vh(a, r), bh(a, r));
  }
  return {
    onCreateRule: t,
    onProcessRule: e
  };
}
var rl = /\s*,\s*/g, xh = /&/g, Sh = /\$([\w-]+)/g;
function Ch() {
  function t(n, o) {
    return function(i, s) {
      var l = n.getRule(s) || o && o.getRule(s);
      return l ? l.selector : s;
    };
  }
  function e(n, o) {
    for (var i = o.split(rl), s = n.split(rl), l = "", u = 0; u < i.length; u++)
      for (var c = i[u], d = 0; d < s.length; d++) {
        var p = s[d];
        l && (l += ", "), l += p.indexOf("&") !== -1 ? p.replace(xh, c) : c + " " + p;
      }
    return l;
  }
  function a(n, o, i) {
    if (i) return Y({}, i, {
      index: i.index + 1
    });
    var s = n.options.nestingLevel;
    s = s === void 0 ? 1 : s + 1;
    var l = Y({}, n.options, {
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
          var g = e(d, s.selector);
          c || (c = t(l, i)), g = g.replace(Sh, c);
          var m = s.key + "-" + d;
          "replaceRule" in l ? l.replaceRule(m, n[d], Y({}, u, {
            selector: g
          })) : l.addRule(m, n[d], Y({}, u, {
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
var wh = /[A-Z]/g, Eh = /^ms-/, Lo = {};
function kh(t) {
  return "-" + t.toLowerCase();
}
function Bc(t) {
  if (Lo.hasOwnProperty(t))
    return Lo[t];
  var e = t.replace(wh, kh);
  return Lo[t] = Eh.test(e) ? "-" + e : e;
}
function Da(t) {
  var e = {};
  for (var a in t) {
    var r = a.indexOf("--") === 0 ? a : Bc(a);
    e[r] = t[a];
  }
  return t.fallbacks && (Array.isArray(t.fallbacks) ? e.fallbacks = t.fallbacks.map(Da) : e.fallbacks = Da(t.fallbacks)), e;
}
function $h() {
  function t(a) {
    if (Array.isArray(a)) {
      for (var r = 0; r < a.length; r++)
        a[r] = Da(a[r]);
      return a;
    }
    return Da(a);
  }
  function e(a, r, n) {
    if (r.indexOf("--") === 0)
      return a;
    var o = Bc(r);
    return r === o ? a : (n.prop(o, a), null);
  }
  return {
    onProcessStyle: t,
    onChangeValue: e
  };
}
var ae = Ui && CSS ? CSS.px : "px", ha = Ui && CSS ? CSS.ms : "ms", en = Ui && CSS ? CSS.percent : "%", Rh = {
  // Animation properties
  "animation-delay": ha,
  "animation-duration": ha,
  // Background properties
  "background-position": ae,
  "background-position-x": ae,
  "background-position-y": ae,
  "background-size": ae,
  // Border Properties
  border: ae,
  "border-bottom": ae,
  "border-bottom-left-radius": ae,
  "border-bottom-right-radius": ae,
  "border-bottom-width": ae,
  "border-left": ae,
  "border-left-width": ae,
  "border-radius": ae,
  "border-right": ae,
  "border-right-width": ae,
  "border-top": ae,
  "border-top-left-radius": ae,
  "border-top-right-radius": ae,
  "border-top-width": ae,
  "border-width": ae,
  "border-block": ae,
  "border-block-end": ae,
  "border-block-end-width": ae,
  "border-block-start": ae,
  "border-block-start-width": ae,
  "border-block-width": ae,
  "border-inline": ae,
  "border-inline-end": ae,
  "border-inline-end-width": ae,
  "border-inline-start": ae,
  "border-inline-start-width": ae,
  "border-inline-width": ae,
  "border-start-start-radius": ae,
  "border-start-end-radius": ae,
  "border-end-start-radius": ae,
  "border-end-end-radius": ae,
  // Margin properties
  margin: ae,
  "margin-bottom": ae,
  "margin-left": ae,
  "margin-right": ae,
  "margin-top": ae,
  "margin-block": ae,
  "margin-block-end": ae,
  "margin-block-start": ae,
  "margin-inline": ae,
  "margin-inline-end": ae,
  "margin-inline-start": ae,
  // Padding properties
  padding: ae,
  "padding-bottom": ae,
  "padding-left": ae,
  "padding-right": ae,
  "padding-top": ae,
  "padding-block": ae,
  "padding-block-end": ae,
  "padding-block-start": ae,
  "padding-inline": ae,
  "padding-inline-end": ae,
  "padding-inline-start": ae,
  // Mask properties
  "mask-position-x": ae,
  "mask-position-y": ae,
  "mask-size": ae,
  // Width and height properties
  height: ae,
  width: ae,
  "min-height": ae,
  "max-height": ae,
  "min-width": ae,
  "max-width": ae,
  // Position properties
  bottom: ae,
  left: ae,
  top: ae,
  right: ae,
  inset: ae,
  "inset-block": ae,
  "inset-block-end": ae,
  "inset-block-start": ae,
  "inset-inline": ae,
  "inset-inline-end": ae,
  "inset-inline-start": ae,
  // Shadow properties
  "box-shadow": ae,
  "text-shadow": ae,
  // Column properties
  "column-gap": ae,
  "column-rule": ae,
  "column-rule-width": ae,
  "column-width": ae,
  // Font and text properties
  "font-size": ae,
  "font-size-delta": ae,
  "letter-spacing": ae,
  "text-decoration-thickness": ae,
  "text-indent": ae,
  "text-stroke": ae,
  "text-stroke-width": ae,
  "word-spacing": ae,
  // Motion properties
  motion: ae,
  "motion-offset": ae,
  // Outline properties
  outline: ae,
  "outline-offset": ae,
  "outline-width": ae,
  // Perspective properties
  perspective: ae,
  "perspective-origin-x": en,
  "perspective-origin-y": en,
  // Transform properties
  "transform-origin": en,
  "transform-origin-x": en,
  "transform-origin-y": en,
  "transform-origin-z": en,
  // Transition properties
  "transition-delay": ha,
  "transition-duration": ha,
  // Alignment properties
  "vertical-align": ae,
  "flex-basis": ae,
  // Some random properties
  "shape-margin": ae,
  size: ae,
  gap: ae,
  // Grid properties
  grid: ae,
  "grid-gap": ae,
  "row-gap": ae,
  "grid-row-gap": ae,
  "grid-column-gap": ae,
  "grid-template-rows": ae,
  "grid-template-columns": ae,
  "grid-auto-rows": ae,
  "grid-auto-columns": ae,
  // Not existing properties.
  // Used to avoid issues with jss-plugin-expand integration.
  "box-shadow-x": ae,
  "box-shadow-y": ae,
  "box-shadow-blur": ae,
  "box-shadow-spread": ae,
  "font-line-height": ae,
  "text-shadow-x": ae,
  "text-shadow-y": ae,
  "text-shadow-blur": ae
};
function zc(t) {
  var e = /(-[a-z])/g, a = function(i) {
    return i[1].toUpperCase();
  }, r = {};
  for (var n in t)
    r[n] = t[n], r[n.replace(e, a)] = t[n];
  return r;
}
var Th = zc(Rh);
function zn(t, e, a) {
  if (e == null) return e;
  if (Array.isArray(e))
    for (var r = 0; r < e.length; r++)
      e[r] = zn(t, e[r], a);
  else if (typeof e == "object")
    if (t === "fallbacks")
      for (var n in e)
        e[n] = zn(n, e[n], a);
    else
      for (var o in e)
        e[o] = zn(t + "-" + o, e[o], a);
  else if (typeof e == "number" && isNaN(e) === !1) {
    var i = a[t] || Th[t];
    return i && !(e === 0 && i === ae) ? typeof i == "function" ? i(e).toString() : "" + e + i : e.toString();
  }
  return e;
}
function Oh(t) {
  t === void 0 && (t = {});
  var e = zc(t);
  function a(n, o) {
    if (o.type !== "style") return n;
    for (var i in n)
      n[i] = zn(i, n[i], e);
    return n;
  }
  function r(n, o) {
    return zn(o, n, e);
  }
  return {
    onProcessStyle: a,
    onChangeValue: r
  };
}
var Mn = "", xi = "", Wc = "", Vc = "", _h = Zn && "ontouchstart" in document.documentElement;
if (Zn) {
  var Fo = {
    Moz: "-moz-",
    ms: "-ms-",
    O: "-o-",
    Webkit: "-webkit-"
  }, Ph = document.createElement("p"), Bo = Ph.style, Ah = "Transform";
  for (var zo in Fo)
    if (zo + Ah in Bo) {
      Mn = zo, xi = Fo[zo];
      break;
    }
  Mn === "Webkit" && "msHyphens" in Bo && (Mn = "ms", xi = Fo.ms, Vc = "edge"), Mn === "Webkit" && "-apple-trailing-word" in Bo && (Wc = "apple");
}
var We = {
  js: Mn,
  css: xi,
  vendor: Wc,
  browser: Vc,
  isTouch: _h
};
function Ih(t) {
  return t[1] === "-" || We.js === "ms" ? t : "@" + We.css + "keyframes" + t.substr(10);
}
var Mh = {
  noPrefill: ["appearance"],
  supportedProperty: function(e) {
    return e !== "appearance" ? !1 : We.js === "ms" ? "-webkit-" + e : We.css + e;
  }
}, jh = {
  noPrefill: ["color-adjust"],
  supportedProperty: function(e) {
    return e !== "color-adjust" ? !1 : We.js === "Webkit" ? We.css + "print-" + e : e;
  }
}, Dh = /[-\s]+(.)?/g;
function Nh(t, e) {
  return e ? e.toUpperCase() : "";
}
function qi(t) {
  return t.replace(Dh, Nh);
}
function Cr(t) {
  return qi("-" + t);
}
var Lh = {
  noPrefill: ["mask"],
  supportedProperty: function(e, a) {
    if (!/^mask/.test(e)) return !1;
    if (We.js === "Webkit") {
      var r = "mask-image";
      if (qi(r) in a)
        return e;
      if (We.js + Cr(r) in a)
        return We.css + e;
    }
    return e;
  }
}, Fh = {
  noPrefill: ["text-orientation"],
  supportedProperty: function(e) {
    return e !== "text-orientation" ? !1 : We.vendor === "apple" && !We.isTouch ? We.css + e : e;
  }
}, Bh = {
  noPrefill: ["transform"],
  supportedProperty: function(e, a, r) {
    return e !== "transform" ? !1 : r.transform ? e : We.css + e;
  }
}, zh = {
  noPrefill: ["transition"],
  supportedProperty: function(e, a, r) {
    return e !== "transition" ? !1 : r.transition ? e : We.css + e;
  }
}, Wh = {
  noPrefill: ["writing-mode"],
  supportedProperty: function(e) {
    return e !== "writing-mode" ? !1 : We.js === "Webkit" || We.js === "ms" && We.browser !== "edge" ? We.css + e : e;
  }
}, Vh = {
  noPrefill: ["user-select"],
  supportedProperty: function(e) {
    return e !== "user-select" ? !1 : We.js === "Moz" || We.js === "ms" || We.vendor === "apple" ? We.css + e : e;
  }
}, Hh = {
  supportedProperty: function(e, a) {
    if (!/^break-/.test(e)) return !1;
    if (We.js === "Webkit") {
      var r = "WebkitColumn" + Cr(e);
      return r in a ? We.css + "column-" + e : !1;
    }
    if (We.js === "Moz") {
      var n = "page" + Cr(e);
      return n in a ? "page-" + e : !1;
    }
    return !1;
  }
}, Kh = {
  supportedProperty: function(e, a) {
    if (!/^(border|margin|padding)-inline/.test(e)) return !1;
    if (We.js === "Moz") return e;
    var r = e.replace("-inline", "");
    return We.js + Cr(r) in a ? We.css + r : !1;
  }
}, Uh = {
  supportedProperty: function(e, a) {
    return qi(e) in a ? e : !1;
  }
}, qh = {
  supportedProperty: function(e, a) {
    var r = Cr(e);
    return e[0] === "-" || e[0] === "-" && e[1] === "-" ? e : We.js + r in a ? We.css + e : We.js !== "Webkit" && "Webkit" + r in a ? "-webkit-" + e : !1;
  }
}, Gh = {
  supportedProperty: function(e) {
    return e.substring(0, 11) !== "scroll-snap" ? !1 : We.js === "ms" ? "" + We.css + e : e;
  }
}, Yh = {
  supportedProperty: function(e) {
    return e !== "overscroll-behavior" ? !1 : We.js === "ms" ? We.css + "scroll-chaining" : e;
  }
}, Xh = {
  "flex-grow": "flex-positive",
  "flex-shrink": "flex-negative",
  "flex-basis": "flex-preferred-size",
  "justify-content": "flex-pack",
  order: "flex-order",
  "align-items": "flex-align",
  "align-content": "flex-line-pack"
  // 'align-self' is handled by 'align-self' plugin.
}, Jh = {
  supportedProperty: function(e, a) {
    var r = Xh[e];
    return r && We.js + Cr(r) in a ? We.css + r : !1;
  }
}, Hc = {
  flex: "box-flex",
  "flex-grow": "box-flex",
  "flex-direction": ["box-orient", "box-direction"],
  order: "box-ordinal-group",
  "align-items": "box-align",
  "flex-flow": ["box-orient", "box-direction"],
  "justify-content": "box-pack"
}, Zh = Object.keys(Hc), Qh = function(e) {
  return We.css + e;
}, em = {
  supportedProperty: function(e, a, r) {
    var n = r.multiple;
    if (Zh.indexOf(e) > -1) {
      var o = Hc[e];
      if (!Array.isArray(o))
        return We.js + Cr(o) in a ? We.css + o : !1;
      if (!n) return !1;
      for (var i = 0; i < o.length; i++)
        if (!(We.js + Cr(o[0]) in a))
          return !1;
      return o.map(Qh);
    }
    return !1;
  }
}, Kc = [Mh, jh, Lh, Fh, Bh, zh, Wh, Vh, Hh, Kh, Uh, qh, Gh, Yh, Jh, em], nl = Kc.filter(function(t) {
  return t.supportedProperty;
}).map(function(t) {
  return t.supportedProperty;
}), tm = Kc.filter(function(t) {
  return t.noPrefill;
}).reduce(function(t, e) {
  return t.push.apply(t, Ka(e.noPrefill)), t;
}, []), jn, jr = {};
if (Zn) {
  jn = document.createElement("p");
  var Wo = window.getComputedStyle(document.documentElement, "");
  for (var Vo in Wo)
    isNaN(Vo) || (jr[Wo[Vo]] = Wo[Vo]);
  tm.forEach(function(t) {
    return delete jr[t];
  });
}
function Si(t, e) {
  if (e === void 0 && (e = {}), !jn) return t;
  if (jr[t] != null)
    return jr[t];
  (t === "transition" || t === "transform") && (e[t] = t in jn.style);
  for (var a = 0; a < nl.length && (jr[t] = nl[a](t, jn.style, e), !jr[t]); a++)
    ;
  try {
    jn.style[t] = "";
  } catch {
    return !1;
  }
  return jr[t];
}
var tn = {}, rm = {
  transition: 1,
  "transition-property": 1,
  "-webkit-transition": 1,
  "-webkit-transition-property": 1
}, nm = /(^\s*[\w-]+)|, (\s*[\w-]+)(?![^()]*\))/g, br;
function am(t, e, a) {
  if (e === "var") return "var";
  if (e === "all") return "all";
  if (a === "all") return ", all";
  var r = e ? Si(e) : ", " + Si(a);
  return r || e || a;
}
Zn && (br = document.createElement("p"));
function al(t, e) {
  var a = e;
  if (!br || t === "content") return e;
  if (typeof a != "string" || !isNaN(parseInt(a, 10)))
    return a;
  var r = t + a;
  if (tn[r] != null)
    return tn[r];
  try {
    br.style[t] = a;
  } catch {
    return tn[r] = !1, !1;
  }
  if (rm[t])
    a = a.replace(nm, am);
  else if (br.style[t] === "" && (a = We.css + a, a === "-ms-flex" && (br.style[t] = "-ms-flexbox"), br.style[t] = a, br.style[t] === ""))
    return tn[r] = !1, !1;
  return br.style[t] = "", tn[r] = a, tn[r];
}
function om() {
  function t(n) {
    if (n.type === "keyframes") {
      var o = n;
      o.at = Ih(o.at);
    }
  }
  function e(n) {
    for (var o in n) {
      var i = n[o];
      if (o === "fallbacks" && Array.isArray(i)) {
        n[o] = i.map(e);
        continue;
      }
      var s = !1, l = Si(o);
      l && l !== o && (s = !0);
      var u = !1, c = al(l, Lr(i));
      c && c !== i && (u = !0), (s || u) && (s && delete n[o], n[l || o] = c || i);
    }
    return n;
  }
  function a(n, o) {
    return o.type !== "style" ? n : e(n);
  }
  function r(n, o) {
    return al(o, Lr(n)) || n;
  }
  return {
    onProcessRule: t,
    onProcessStyle: a,
    onChangeValue: r
  };
}
function im() {
  var t = function(a, r) {
    return a.length === r.length ? a > r ? 1 : -1 : a.length - r.length;
  };
  return {
    onProcessStyle: function(a, r) {
      if (r.type !== "style") return a;
      for (var n = {}, o = Object.keys(a).sort(t), i = 0; i < o.length; i++)
        n[o[i]] = a[o[i]];
      return n;
    }
  };
}
function sm() {
  return {
    plugins: [
      ph(),
      yh(),
      Ch(),
      $h(),
      Oh(),
      // Disable the vendor prefixer server-side, it does nothing.
      // This way, we can get a performance boost.
      // In the documentation, we are using `autoprefixer` to solve this problem.
      typeof window > "u" ? null : om(),
      im()
    ]
  };
}
function Gi() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = t.baseClasses, a = t.newClasses;
  if (t.Component, !a)
    return e;
  var r = Y({}, e);
  return Object.keys(a).forEach(function(n) {
    a[n] && (r[n] = "".concat(e[n], " ").concat(a[n]));
  }), r;
}
var dn = {
  set: function(e, a, r, n) {
    var o = e.get(a);
    o || (o = /* @__PURE__ */ new Map(), e.set(a, o)), o.set(r, n);
  },
  get: function(e, a, r) {
    var n = e.get(a);
    return n ? n.get(r) : void 0;
  },
  delete: function(e, a, r) {
    var n = e.get(a);
    n.delete(r);
  }
}, lm = ht.createContext(null);
function Qn() {
  var t = ht.useContext(lm);
  return t;
}
var cm = Dc(sm()), um = Rp(), dm = /* @__PURE__ */ new Map(), fm = {
  disableGeneration: !1,
  generateClassName: um,
  jss: cm,
  sheetsCache: null,
  sheetsManager: dm,
  sheetsRegistry: null
}, pm = ht.createContext(fm), ol = -1e9;
function hm() {
  return ol += 1, ol;
}
var mm = {};
function gm(t) {
  var e = typeof t == "function";
  return {
    create: function(r, n) {
      var o;
      try {
        o = e ? t(r) : t;
      } catch (l) {
        throw l;
      }
      if (!n || !r.overrides || !r.overrides[n])
        return o;
      var i = r.overrides[n], s = Y({}, o);
      return Object.keys(i).forEach(function(l) {
        s[l] = Sr(s[l], i[l]);
      }), s;
    },
    options: {}
  };
}
function vm(t, e, a) {
  var r = t.state, n = t.stylesOptions;
  if (n.disableGeneration)
    return e || {};
  r.cacheClasses || (r.cacheClasses = {
    // Cache for the finalized classes value.
    value: null,
    // Cache for the last used classes prop pointer.
    lastProp: null,
    // Cache for the last used rendered classes pointer.
    lastJSS: {}
  });
  var o = !1;
  return r.classes !== r.cacheClasses.lastJSS && (r.cacheClasses.lastJSS = r.classes, o = !0), e !== r.cacheClasses.lastProp && (r.cacheClasses.lastProp = e, o = !0), o && (r.cacheClasses.value = Gi({
    baseClasses: r.cacheClasses.lastJSS,
    newClasses: e,
    Component: a
  })), r.cacheClasses.value;
}
function bm(t, e) {
  var a = t.state, r = t.theme, n = t.stylesOptions, o = t.stylesCreator, i = t.name;
  if (!n.disableGeneration) {
    var s = dn.get(n.sheetsManager, o, r);
    s || (s = {
      refs: 0,
      staticSheet: null,
      dynamicStyles: null
    }, dn.set(n.sheetsManager, o, r, s));
    var l = Y({}, o.options, n, {
      theme: r,
      flip: typeof n.flip == "boolean" ? n.flip : r.direction === "rtl"
    });
    l.generateId = l.serverGenerateClassName || l.generateClassName;
    var u = n.sheetsRegistry;
    if (s.refs === 0) {
      var c;
      n.sheetsCache && (c = dn.get(n.sheetsCache, o, r));
      var d = o.create(r, i);
      c || (c = n.jss.createStyleSheet(d, Y({
        link: !1
      }, l)), c.attach(), n.sheetsCache && dn.set(n.sheetsCache, o, r, c)), u && u.add(c), s.staticSheet = c, s.dynamicStyles = Nc(d);
    }
    if (s.dynamicStyles) {
      var p = n.jss.createStyleSheet(s.dynamicStyles, Y({
        link: !0
      }, l));
      p.update(e), p.attach(), a.dynamicSheet = p, a.classes = Gi({
        baseClasses: s.staticSheet.classes,
        newClasses: p.classes
      }), u && u.add(p);
    } else
      a.classes = s.staticSheet.classes;
    s.refs += 1;
  }
}
function ym(t, e) {
  var a = t.state;
  a.dynamicSheet && a.dynamicSheet.update(e);
}
function xm(t) {
  var e = t.state, a = t.theme, r = t.stylesOptions, n = t.stylesCreator;
  if (!r.disableGeneration) {
    var o = dn.get(r.sheetsManager, n, a);
    o.refs -= 1;
    var i = r.sheetsRegistry;
    o.refs === 0 && (dn.delete(r.sheetsManager, n, a), r.jss.removeStyleSheet(o.staticSheet), i && i.remove(o.staticSheet)), e.dynamicSheet && (r.jss.removeStyleSheet(e.dynamicSheet), i && i.remove(e.dynamicSheet));
  }
}
function Sm(t, e) {
  var a = ht.useRef([]), r, n = ht.useMemo(function() {
    return {};
  }, e);
  a.current !== n && (a.current = n, r = t()), ht.useEffect(
    function() {
      return function() {
        r && r();
      };
    },
    [n]
    // eslint-disable-line react-hooks/exhaustive-deps
  );
}
function Yi(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = e.name, r = e.classNamePrefix, n = e.Component, o = e.defaultTheme, i = o === void 0 ? mm : o, s = Ae(e, ["name", "classNamePrefix", "Component", "defaultTheme"]), l = gm(t), u = a || r || "makeStyles";
  l.options = {
    index: hm(),
    name: a,
    meta: u,
    classNamePrefix: u
  };
  var c = function() {
    var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, h = Qn() || i, g = Y({}, ht.useContext(pm), s), m = ht.useRef(), y = ht.useRef();
    Sm(function() {
      var k = {
        name: a,
        state: {},
        stylesCreator: l,
        stylesOptions: g,
        theme: h
      };
      return bm(k, p), y.current = !1, m.current = k, function() {
        xm(k);
      };
    }, [h, l]), ht.useEffect(function() {
      y.current && ym(m.current, p), y.current = !0;
    });
    var w = vm(m.current, p.classes, n);
    return w;
  };
  return c;
}
function Cm(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function Uc(t) {
  var e, a, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) for (e = 0; e < t.length; e++) t[e] && (a = Uc(t[e])) && (r && (r += " "), r += a);
  else for (e in t) t[e] && (r && (r += " "), r += e);
  return r;
}
function he() {
  for (var t, e, a = 0, r = ""; a < arguments.length; ) (t = arguments[a++]) && (e = Uc(t)) && (r && (r += " "), r += e);
  return r;
}
var Ho = { exports: {} }, ut = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var il;
function wm() {
  if (il) return ut;
  il = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, a = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, n = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, i = t ? Symbol.for("react.provider") : 60109, s = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, u = t ? Symbol.for("react.concurrent_mode") : 60111, c = t ? Symbol.for("react.forward_ref") : 60112, d = t ? Symbol.for("react.suspense") : 60113, p = t ? Symbol.for("react.suspense_list") : 60120, h = t ? Symbol.for("react.memo") : 60115, g = t ? Symbol.for("react.lazy") : 60116, m = t ? Symbol.for("react.block") : 60121, y = t ? Symbol.for("react.fundamental") : 60117, w = t ? Symbol.for("react.responder") : 60118, k = t ? Symbol.for("react.scope") : 60119;
  function I(x) {
    if (typeof x == "object" && x !== null) {
      var E = x.$$typeof;
      switch (E) {
        case e:
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
                  return E;
              }
          }
        case a:
          return E;
      }
    }
  }
  function f(x) {
    return I(x) === u;
  }
  return ut.AsyncMode = l, ut.ConcurrentMode = u, ut.ContextConsumer = s, ut.ContextProvider = i, ut.Element = e, ut.ForwardRef = c, ut.Fragment = r, ut.Lazy = g, ut.Memo = h, ut.Portal = a, ut.Profiler = o, ut.StrictMode = n, ut.Suspense = d, ut.isAsyncMode = function(x) {
    return f(x) || I(x) === l;
  }, ut.isConcurrentMode = f, ut.isContextConsumer = function(x) {
    return I(x) === s;
  }, ut.isContextProvider = function(x) {
    return I(x) === i;
  }, ut.isElement = function(x) {
    return typeof x == "object" && x !== null && x.$$typeof === e;
  }, ut.isForwardRef = function(x) {
    return I(x) === c;
  }, ut.isFragment = function(x) {
    return I(x) === r;
  }, ut.isLazy = function(x) {
    return I(x) === g;
  }, ut.isMemo = function(x) {
    return I(x) === h;
  }, ut.isPortal = function(x) {
    return I(x) === a;
  }, ut.isProfiler = function(x) {
    return I(x) === o;
  }, ut.isStrictMode = function(x) {
    return I(x) === n;
  }, ut.isSuspense = function(x) {
    return I(x) === d;
  }, ut.isValidElementType = function(x) {
    return typeof x == "string" || typeof x == "function" || x === r || x === u || x === o || x === n || x === d || x === p || typeof x == "object" && x !== null && (x.$$typeof === g || x.$$typeof === h || x.$$typeof === i || x.$$typeof === s || x.$$typeof === c || x.$$typeof === y || x.$$typeof === w || x.$$typeof === k || x.$$typeof === m);
  }, ut.typeOf = I, ut;
}
var sl;
function Em() {
  return sl || (sl = 1, Ho.exports = wm()), Ho.exports;
}
var Ko, ll;
function km() {
  if (ll) return Ko;
  ll = 1;
  var t = Em(), e = {
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
  o[t.ForwardRef] = r, o[t.Memo] = n;
  function i(g) {
    return t.isMemo(g) ? n : o[g.$$typeof] || e;
  }
  var s = Object.defineProperty, l = Object.getOwnPropertyNames, u = Object.getOwnPropertySymbols, c = Object.getOwnPropertyDescriptor, d = Object.getPrototypeOf, p = Object.prototype;
  function h(g, m, y) {
    if (typeof m != "string") {
      if (p) {
        var w = d(m);
        w && w !== p && h(g, w, y);
      }
      var k = l(m);
      u && (k = k.concat(u(m)));
      for (var I = i(g), f = i(m), x = 0; x < k.length; ++x) {
        var E = k[x];
        if (!a[E] && !(y && y[E]) && !(f && f[E]) && !(I && I[E])) {
          var N = c(m, E);
          try {
            s(g, E, N);
          } catch {
          }
        }
      }
    }
    return g;
  }
  return Ko = h, Ko;
}
var $m = km();
const qc = /* @__PURE__ */ $r($m);
function Rm(t, e) {
  var a = {};
  return Object.keys(t).forEach(function(r) {
    e.indexOf(r) === -1 && (a[r] = t[r]);
  }), a;
}
function Tm(t) {
  var e = function(r) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = n.name, i = Ae(n, ["name"]), s = o, l = typeof r == "function" ? function(p) {
      return {
        root: function(g) {
          return r(Y({
            theme: p
          }, g));
        }
      };
    } : {
      root: r
    }, u = Yi(l, Y({
      Component: t,
      name: o || t.displayName,
      classNamePrefix: s
    }, i)), c;
    r.filterProps && (c = r.filterProps, delete r.filterProps), r.propTypes && (r.propTypes, delete r.propTypes);
    var d = /* @__PURE__ */ ht.forwardRef(function(h, g) {
      var m = h.children, y = h.className, w = h.clone, k = h.component, I = Ae(h, ["children", "className", "clone", "component"]), f = u(h), x = he(f.root, y), E = I;
      if (c && (E = Rm(E, c)), w)
        return /* @__PURE__ */ ht.cloneElement(m, Y({
          className: he(m.props.className, x)
        }, E));
      if (typeof m == "function")
        return m(Y({
          className: x
        }, E));
      var N = k || t;
      return /* @__PURE__ */ ht.createElement(N, Y({
        ref: g,
        className: x
      }, E), m);
    });
    return qc(d, t), d;
  };
  return e;
}
var Om = function(e) {
  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return function(r) {
    var n = a.defaultTheme, o = a.withTheme, i = o === void 0 ? !1 : o, s = a.name, l = Ae(a, ["defaultTheme", "withTheme", "name"]), u = s, c = Yi(e, Y({
      defaultTheme: n,
      Component: r,
      name: s || r.displayName,
      classNamePrefix: u
    }, l)), d = /* @__PURE__ */ ht.forwardRef(function(h, g) {
      h.classes;
      var m = h.innerRef, y = Ae(h, ["classes", "innerRef"]), w = c(Y({}, r.defaultProps, h)), k, I = y;
      return (typeof s == "string" || i) && (k = Qn() || n, s && (I = Pc({
        theme: k,
        name: s,
        props: y
      })), i && !I.theme && (I.theme = k)), /* @__PURE__ */ ht.createElement(r, Y({
        ref: m || g,
        classes: w
      }, I));
    });
    return qc(d, r), d;
  };
};
function fr(t) {
  return t;
}
var Ga = wp();
function ar(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return Yi(t, Y({
    defaultTheme: Ga
  }, e));
}
var Xi = function(e) {
  var a = Tm(e);
  return function(r, n) {
    return a(r, Y({
      defaultTheme: Ga
    }, n));
  };
};
function En() {
  var t = Qn() || Ga;
  return t;
}
function Qe(t, e) {
  return Om(t, Y({
    defaultTheme: Ga
  }, e));
}
function pt(t) {
  if (typeof t != "string")
    throw new Error(mn(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Kn() {
  for (var t = arguments.length, e = new Array(t), a = 0; a < t; a++)
    e[a] = arguments[a];
  return e.reduce(function(r, n) {
    return n == null ? r : function() {
      for (var i = arguments.length, s = new Array(i), l = 0; l < i; l++)
        s[l] = arguments[l];
      r.apply(this, s), n.apply(this, s);
    };
  }, function() {
  });
}
var _m = function(e) {
  return {
    /* Styles applied to the root element. */
    root: {
      userSelect: "none",
      width: "1em",
      height: "1em",
      display: "inline-block",
      fill: "currentColor",
      flexShrink: 0,
      fontSize: e.typography.pxToRem(24),
      transition: e.transitions.create("fill", {
        duration: e.transitions.duration.shorter
      })
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      color: e.palette.primary.main
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: e.palette.secondary.main
    },
    /* Styles applied to the root element if `color="action"`. */
    colorAction: {
      color: e.palette.action.active
    },
    /* Styles applied to the root element if `color="error"`. */
    colorError: {
      color: e.palette.error.main
    },
    /* Styles applied to the root element if `color="disabled"`. */
    colorDisabled: {
      color: e.palette.action.disabled
    },
    /* Styles applied to the root element if `fontSize="inherit"`. */
    fontSizeInherit: {
      fontSize: "inherit"
    },
    /* Styles applied to the root element if `fontSize="small"`. */
    fontSizeSmall: {
      fontSize: e.typography.pxToRem(20)
    },
    /* Styles applied to the root element if `fontSize="large"`. */
    fontSizeLarge: {
      fontSize: e.typography.pxToRem(35)
    }
  };
}, Gc = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.color, s = i === void 0 ? "inherit" : i, l = e.component, u = l === void 0 ? "svg" : l, c = e.fontSize, d = c === void 0 ? "medium" : c, p = e.htmlColor, h = e.titleAccess, g = e.viewBox, m = g === void 0 ? "0 0 24 24" : g, y = Ae(e, ["children", "classes", "className", "color", "component", "fontSize", "htmlColor", "titleAccess", "viewBox"]);
  return /* @__PURE__ */ b.createElement(u, Y({
    className: he(n.root, o, s !== "inherit" && n["color".concat(pt(s))], d !== "default" && d !== "medium" && n["fontSize".concat(pt(d))]),
    focusable: "false",
    viewBox: m,
    color: p,
    "aria-hidden": h ? void 0 : !0,
    role: h ? "img" : void 0,
    ref: a
  }, y), r, h ? /* @__PURE__ */ b.createElement("title", null, h) : null);
});
Gc.muiName = "SvgIcon";
const cl = Qe(_m, {
  name: "MuiSvgIcon"
})(Gc);
function Jt(t, e) {
  var a = function(n, o) {
    return /* @__PURE__ */ ht.createElement(cl, Y({
      ref: o
    }, n), t);
  };
  return a.muiName = cl.muiName, /* @__PURE__ */ ht.memo(/* @__PURE__ */ ht.forwardRef(a));
}
function Un(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 166, a;
  function r() {
    for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++)
      o[i] = arguments[i];
    var s = this, l = function() {
      t.apply(s, o);
    };
    clearTimeout(a), a = setTimeout(l, e);
  }
  return r.clear = function() {
    clearTimeout(a);
  }, r;
}
function Ca(t, e) {
  return /* @__PURE__ */ b.isValidElement(t) && e.indexOf(t.type.muiName) !== -1;
}
function cr(t) {
  return t && t.ownerDocument || document;
}
function Ji(t) {
  var e = cr(t);
  return e.defaultView || window;
}
function zr(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
function Zi(t) {
  var e = t.controlled, a = t.default;
  t.name, t.state;
  var r = b.useRef(e !== void 0), n = r.current, o = b.useState(a), i = o[0], s = o[1], l = n ? e : i, u = b.useCallback(function(c) {
    n || s(c);
  }, []);
  return [l, u];
}
var Pm = typeof window < "u" ? b.useLayoutEffect : b.useEffect;
function rr(t) {
  var e = b.useRef(t);
  return Pm(function() {
    e.current = t;
  }), b.useCallback(function() {
    return e.current.apply(void 0, arguments);
  }, []);
}
function Ct(t, e) {
  return b.useMemo(function() {
    return t == null && e == null ? null : function(a) {
      zr(t, a), zr(e, a);
    };
  }, [t, e]);
}
function Am(t) {
  var e = b.useState(t), a = e[0], r = e[1], n = t || a;
  return b.useEffect(function() {
    a == null && r("mui-".concat(Math.round(Math.random() * 1e5)));
  }, [a]), n;
}
var Ya = !0, Ci = !1, ul = null, Im = {
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
function Mm(t) {
  var e = t.type, a = t.tagName;
  return !!(a === "INPUT" && Im[e] && !t.readOnly || a === "TEXTAREA" && !t.readOnly || t.isContentEditable);
}
function jm(t) {
  t.metaKey || t.altKey || t.ctrlKey || (Ya = !0);
}
function Uo() {
  Ya = !1;
}
function Dm() {
  this.visibilityState === "hidden" && Ci && (Ya = !0);
}
function Nm(t) {
  t.addEventListener("keydown", jm, !0), t.addEventListener("mousedown", Uo, !0), t.addEventListener("pointerdown", Uo, !0), t.addEventListener("touchstart", Uo, !0), t.addEventListener("visibilitychange", Dm, !0);
}
function Lm(t) {
  var e = t.target;
  try {
    return e.matches(":focus-visible");
  } catch {
  }
  return Ya || Mm(e);
}
function Fm() {
  Ci = !0, window.clearTimeout(ul), ul = window.setTimeout(function() {
    Ci = !1;
  }, 100);
}
function Qi() {
  var t = b.useCallback(function(e) {
    var a = Xt.findDOMNode(e);
    a != null && Nm(a.ownerDocument);
  }, []);
  return {
    isFocusVisible: Lm,
    onBlurVisible: Fm,
    ref: t
  };
}
function Bm(t) {
  return $c(t) || Ec(t) || zi(t) || Rc();
}
const dl = {
  disabled: !1
}, Na = ht.createContext(null);
var zm = function(e) {
  return e.scrollTop;
}, Dn = "unmounted", Ir = "exited", Mr = "entering", un = "entered", wi = "exiting", or = /* @__PURE__ */ (function(t) {
  Ua(e, t);
  function e(r, n) {
    var o;
    o = t.call(this, r, n) || this;
    var i = n, s = i && !i.isMounting ? r.enter : r.appear, l;
    return o.appearStatus = null, r.in ? s ? (l = Ir, o.appearStatus = Mr) : l = un : r.unmountOnExit || r.mountOnEnter ? l = Dn : l = Ir, o.state = {
      status: l
    }, o.nextCallback = null, o;
  }
  e.getDerivedStateFromProps = function(n, o) {
    var i = n.in;
    return i && o.status === Dn ? {
      status: Ir
    } : null;
  };
  var a = e.prototype;
  return a.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, a.componentDidUpdate = function(n) {
    var o = null;
    if (n !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== Mr && i !== un && (o = Mr) : (i === Mr || i === un) && (o = wi);
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
      if (this.cancelNextCallback(), o === Mr) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : fa.findDOMNode(this);
          i && zm(i);
        }
        this.performEnter(n);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === Ir && this.setState({
      status: Dn
    });
  }, a.performEnter = function(n) {
    var o = this, i = this.props.enter, s = this.context ? this.context.isMounting : n, l = this.props.nodeRef ? [s] : [fa.findDOMNode(this), s], u = l[0], c = l[1], d = this.getTimeouts(), p = s ? d.appear : d.enter;
    if (!n && !i || dl.disabled) {
      this.safeSetState({
        status: un
      }, function() {
        o.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, c), this.safeSetState({
      status: Mr
    }, function() {
      o.props.onEntering(u, c), o.onTransitionEnd(p, function() {
        o.safeSetState({
          status: un
        }, function() {
          o.props.onEntered(u, c);
        });
      });
    });
  }, a.performExit = function() {
    var n = this, o = this.props.exit, i = this.getTimeouts(), s = this.props.nodeRef ? void 0 : fa.findDOMNode(this);
    if (!o || dl.disabled) {
      this.safeSetState({
        status: Ir
      }, function() {
        n.props.onExited(s);
      });
      return;
    }
    this.props.onExit(s), this.safeSetState({
      status: wi
    }, function() {
      n.props.onExiting(s), n.onTransitionEnd(i.exit, function() {
        n.safeSetState({
          status: Ir
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : fa.findDOMNode(this), s = n == null && !this.props.addEndListener;
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
    if (n === Dn)
      return null;
    var o = this.props, i = o.children;
    o.in, o.mountOnEnter, o.unmountOnExit, o.appear, o.enter, o.exit, o.timeout, o.addEndListener, o.onEnter, o.onEntering, o.onEntered, o.onExit, o.onExiting, o.onExited, o.nodeRef;
    var s = Ha(o, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ ht.createElement(Na.Provider, {
        value: null
      }, typeof i == "function" ? i(n, s) : ht.cloneElement(ht.Children.only(i), s))
    );
  }, e;
})(ht.Component);
or.contextType = Na;
or.propTypes = {};
function rn() {
}
or.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: rn,
  onEntering: rn,
  onEntered: rn,
  onExit: rn,
  onExiting: rn,
  onExited: rn
};
or.UNMOUNTED = Dn;
or.EXITED = Ir;
or.ENTERING = Mr;
or.ENTERED = un;
or.EXITING = wi;
function es(t, e) {
  var a = function(o) {
    return e && xa(o) ? e(o) : o;
  }, r = /* @__PURE__ */ Object.create(null);
  return t && Ed.map(t, function(n) {
    return n;
  }).forEach(function(n) {
    r[n.key] = a(n);
  }), r;
}
function Wm(t, e) {
  t = t || {}, e = e || {};
  function a(c) {
    return c in e ? e[c] : t[c];
  }
  var r = /* @__PURE__ */ Object.create(null), n = [];
  for (var o in t)
    o in e ? n.length && (r[o] = n, n = []) : n.push(o);
  var i, s = {};
  for (var l in e) {
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
function Dr(t, e, a) {
  return a[e] != null ? a[e] : t.props[e];
}
function Vm(t, e) {
  return es(t.children, function(a) {
    return Sa(a, {
      onExited: e.bind(null, a),
      in: !0,
      appear: Dr(a, "appear", t),
      enter: Dr(a, "enter", t),
      exit: Dr(a, "exit", t)
    });
  });
}
function Hm(t, e, a) {
  var r = es(t.children), n = Wm(e, r);
  return Object.keys(n).forEach(function(o) {
    var i = n[o];
    if (xa(i)) {
      var s = o in e, l = o in r, u = e[o], c = xa(u) && !u.props.in;
      l && (!s || c) ? n[o] = Sa(i, {
        onExited: a.bind(null, i),
        in: !0,
        exit: Dr(i, "exit", t),
        enter: Dr(i, "enter", t)
      }) : !l && s && !c ? n[o] = Sa(i, {
        in: !1
      }) : l && s && xa(u) && (n[o] = Sa(i, {
        onExited: a.bind(null, i),
        in: u.props.in,
        exit: Dr(i, "exit", t),
        enter: Dr(i, "enter", t)
      }));
    }
  }), n;
}
var Km = Object.values || function(t) {
  return Object.keys(t).map(function(e) {
    return t[e];
  });
}, Um = {
  component: "div",
  childFactory: function(e) {
    return e;
  }
}, ts = /* @__PURE__ */ (function(t) {
  Ua(e, t);
  function e(r, n) {
    var o;
    o = t.call(this, r, n) || this;
    var i = o.handleExited.bind(fi(o));
    return o.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: i,
      firstRender: !0
    }, o;
  }
  var a = e.prototype;
  return a.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, a.componentWillUnmount = function() {
    this.mounted = !1;
  }, e.getDerivedStateFromProps = function(n, o) {
    var i = o.children, s = o.handleExited, l = o.firstRender;
    return {
      children: l ? Vm(n, s) : Hm(n, i, s),
      firstRender: !1
    };
  }, a.handleExited = function(n, o) {
    var i = es(this.props.children);
    n.key in i || (n.props.onExited && n.props.onExited(o), this.mounted && this.setState(function(s) {
      var l = Y({}, s.children);
      return delete l[n.key], {
        children: l
      };
    }));
  }, a.render = function() {
    var n = this.props, o = n.component, i = n.childFactory, s = Ha(n, ["component", "childFactory"]), l = this.state.contextValue, u = Km(this.state.children).map(i);
    return delete s.appear, delete s.enter, delete s.exit, o === null ? /* @__PURE__ */ ht.createElement(Na.Provider, {
      value: l
    }, u) : /* @__PURE__ */ ht.createElement(Na.Provider, {
      value: l
    }, /* @__PURE__ */ ht.createElement(o, s, u));
  }, e;
})(ht.Component);
ts.propTypes = {};
ts.defaultProps = Um;
var qm = function(e) {
  return e.scrollTop;
};
function La(t, e) {
  var a = t.timeout, r = t.style, n = r === void 0 ? {} : r;
  return {
    duration: n.transitionDuration || typeof a == "number" ? a : a[e.mode] || 0,
    delay: n.transitionDelay
  };
}
var Gm = function(e) {
  return {
    /* Styles applied to the root element. */
    root: {
      height: 0,
      overflow: "hidden",
      transition: e.transitions.create("height")
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
}, Yc = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.collapsedHeight, s = e.collapsedSize, l = s === void 0 ? "0px" : s, u = e.component, c = u === void 0 ? "div" : u, d = e.disableStrictModeCompat, p = d === void 0 ? !1 : d, h = e.in, g = e.onEnter, m = e.onEntered, y = e.onEntering, w = e.onExit, k = e.onExited, I = e.onExiting, f = e.style, x = e.timeout, E = x === void 0 ? ui.standard : x, N = e.TransitionComponent, z = N === void 0 ? or : N, O = Ae(e, ["children", "classes", "className", "collapsedHeight", "collapsedSize", "component", "disableStrictModeCompat", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"]), P = En(), M = b.useRef(), v = b.useRef(null), C = b.useRef(), D = typeof (i || l) == "number" ? "".concat(i || l, "px") : i || l;
  b.useEffect(function() {
    return function() {
      clearTimeout(M.current);
    };
  }, []);
  var L = P.unstable_strictMode && !p, R = b.useRef(null), W = Ct(a, L ? R : void 0), F = function(ve) {
    return function(ge, Se) {
      if (ve) {
        var Ee = L ? [R.current, ge] : [ge, Se], ie = Cn(Ee, 2), pe = ie[0], we = ie[1];
        we === void 0 ? ve(pe) : ve(pe, we);
      }
    };
  }, G = F(function(fe, ve) {
    fe.style.height = D, g && g(fe, ve);
  }), B = F(function(fe, ve) {
    var ge = v.current ? v.current.clientHeight : 0, Se = La({
      style: f,
      timeout: E
    }, {
      mode: "enter"
    }), Ee = Se.duration;
    if (E === "auto") {
      var ie = P.transitions.getAutoHeightDuration(ge);
      fe.style.transitionDuration = "".concat(ie, "ms"), C.current = ie;
    } else
      fe.style.transitionDuration = typeof Ee == "string" ? Ee : "".concat(Ee, "ms");
    fe.style.height = "".concat(ge, "px"), y && y(fe, ve);
  }), Z = F(function(fe, ve) {
    fe.style.height = "auto", m && m(fe, ve);
  }), Q = F(function(fe) {
    var ve = v.current ? v.current.clientHeight : 0;
    fe.style.height = "".concat(ve, "px"), w && w(fe);
  }), de = F(k), ue = F(function(fe) {
    var ve = v.current ? v.current.clientHeight : 0, ge = La({
      style: f,
      timeout: E
    }, {
      mode: "exit"
    }), Se = ge.duration;
    if (E === "auto") {
      var Ee = P.transitions.getAutoHeightDuration(ve);
      fe.style.transitionDuration = "".concat(Ee, "ms"), C.current = Ee;
    } else
      fe.style.transitionDuration = typeof Se == "string" ? Se : "".concat(Se, "ms");
    fe.style.height = D, I && I(fe);
  }), xe = function(ve, ge) {
    var Se = L ? ve : ge;
    E === "auto" && (M.current = setTimeout(Se, C.current || 0));
  };
  return /* @__PURE__ */ b.createElement(z, Y({
    in: h,
    onEnter: G,
    onEntered: Z,
    onEntering: B,
    onExit: Q,
    onExited: de,
    onExiting: ue,
    addEndListener: xe,
    nodeRef: L ? R : void 0,
    timeout: E === "auto" ? null : E
  }, O), function(fe, ve) {
    return /* @__PURE__ */ b.createElement(c, Y({
      className: he(n.root, n.container, o, {
        entered: n.entered,
        exited: !h && D === "0px" && n.hidden
      }[fe]),
      style: Y({
        minHeight: D
      }, f),
      ref: W
    }, ve), /* @__PURE__ */ b.createElement("div", {
      className: n.wrapper,
      ref: v
    }, /* @__PURE__ */ b.createElement("div", {
      className: n.wrapperInner
    }, r)));
  });
});
Yc.muiSupportAuto = !0;
const Ym = Qe(Gm, {
  name: "MuiCollapse"
})(Yc);
var Xm = function(e) {
  var a = {};
  return e.shadows.forEach(function(r, n) {
    a["elevation".concat(n)] = {
      boxShadow: r
    };
  }), Y({
    /* Styles applied to the root element. */
    root: {
      backgroundColor: e.palette.background.paper,
      color: e.palette.text.primary,
      transition: e.transitions.create("box-shadow")
    },
    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: e.shape.borderRadius
    },
    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      border: "1px solid ".concat(e.palette.divider)
    }
  }, a);
}, Jm = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.component, i = o === void 0 ? "div" : o, s = e.square, l = s === void 0 ? !1 : s, u = e.elevation, c = u === void 0 ? 1 : u, d = e.variant, p = d === void 0 ? "elevation" : d, h = Ae(e, ["classes", "className", "component", "square", "elevation", "variant"]);
  return /* @__PURE__ */ b.createElement(i, Y({
    className: he(r.root, n, p === "outlined" ? r.outlined : r["elevation".concat(c)], !l && r.rounded),
    ref: a
  }, h));
});
const Xc = Qe(Xm, {
  name: "MuiPaper"
})(Jm);
var Jc = b.createContext({}), Zm = function(e) {
  var a = {
    duration: e.transitions.duration.shortest
  };
  return {
    /* Styles applied to the root element. */
    root: {
      position: "relative",
      transition: e.transitions.create(["margin"], a),
      "&:before": {
        position: "absolute",
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: e.palette.divider,
        transition: e.transitions.create(["opacity", "background-color"], a)
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
        backgroundColor: e.palette.action.disabledBackground
      }
    },
    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: 0,
      "&:first-child": {
        borderTopLeftRadius: e.shape.borderRadius,
        borderTopRightRadius: e.shape.borderRadius
      },
      "&:last-child": {
        borderBottomLeftRadius: e.shape.borderRadius,
        borderBottomRightRadius: e.shape.borderRadius,
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
}, Qm = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.defaultExpanded, s = i === void 0 ? !1 : i, l = e.disabled, u = l === void 0 ? !1 : l, c = e.expanded, d = e.onChange, p = e.square, h = p === void 0 ? !1 : p, g = e.TransitionComponent, m = g === void 0 ? Ym : g, y = e.TransitionProps, w = Ae(e, ["children", "classes", "className", "defaultExpanded", "disabled", "expanded", "onChange", "square", "TransitionComponent", "TransitionProps"]), k = Zi({
    controlled: c,
    default: s,
    name: "Accordion",
    state: "expanded"
  }), I = Cn(k, 2), f = I[0], x = I[1], E = b.useCallback(function(v) {
    x(!f), d && d(v, !f);
  }, [f, d, x]), N = b.Children.toArray(r), z = Bm(N), O = z[0], P = z.slice(1), M = b.useMemo(function() {
    return {
      expanded: f,
      disabled: u,
      toggle: E
    };
  }, [f, u, E]);
  return /* @__PURE__ */ b.createElement(Xc, Y({
    className: he(n.root, o, f && n.expanded, u && n.disabled, !h && n.rounded),
    ref: a,
    square: h
  }, w), /* @__PURE__ */ b.createElement(Jc.Provider, {
    value: M
  }, O), /* @__PURE__ */ b.createElement(m, Y({
    in: f,
    timeout: "auto"
  }, y), /* @__PURE__ */ b.createElement("div", {
    "aria-labelledby": O.props.id,
    id: O.props["aria-controls"],
    role: "region"
  }, P)));
});
const eg = Qe(Zm, {
  name: "MuiAccordion"
})(Qm);
var tg = function(e) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: "flex",
      padding: e.spacing(1, 2, 2)
    }
  };
}, rg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = Ae(e, ["classes", "className"]);
  return /* @__PURE__ */ b.createElement("div", Y({
    className: he(r.root, n),
    ref: a
  }, o));
});
const ng = Qe(tg, {
  name: "MuiAccordionDetails"
})(rg);
var ag = typeof window > "u" ? b.useEffect : b.useLayoutEffect;
function og(t) {
  var e = t.classes, a = t.pulsate, r = a === void 0 ? !1 : a, n = t.rippleX, o = t.rippleY, i = t.rippleSize, s = t.in, l = t.onExited, u = l === void 0 ? function() {
  } : l, c = t.timeout, d = b.useState(!1), p = d[0], h = d[1], g = he(e.ripple, e.rippleVisible, r && e.ripplePulsate), m = {
    width: i,
    height: i,
    top: -(i / 2) + o,
    left: -(i / 2) + n
  }, y = he(e.child, p && e.childLeaving, r && e.childPulsate), w = rr(u);
  return ag(function() {
    if (!s) {
      h(!0);
      var k = setTimeout(w, c);
      return function() {
        clearTimeout(k);
      };
    }
  }, [w, s, c]), /* @__PURE__ */ b.createElement("span", {
    className: g,
    style: m
  }, /* @__PURE__ */ b.createElement("span", {
    className: y
  }));
}
var Ei = 550, ig = 80, sg = function(e) {
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
      animation: "$enter ".concat(Ei, "ms ").concat(e.transitions.easing.easeInOut)
    },
    /* Styles applied to the internal `Ripple` components `ripplePulsate` class. */
    ripplePulsate: {
      animationDuration: "".concat(e.transitions.duration.shorter, "ms")
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
      animation: "$exit ".concat(Ei, "ms ").concat(e.transitions.easing.easeInOut)
    },
    /* Styles applied to the internal `Ripple` components `childPulsate` class. */
    childPulsate: {
      position: "absolute",
      left: 0,
      top: 0,
      animation: "$pulsate 2500ms ".concat(e.transitions.easing.easeInOut, " 200ms infinite")
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
}, lg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.center, n = r === void 0 ? !1 : r, o = e.classes, i = e.className, s = Ae(e, ["center", "classes", "className"]), l = b.useState([]), u = l[0], c = l[1], d = b.useRef(0), p = b.useRef(null);
  b.useEffect(function() {
    p.current && (p.current(), p.current = null);
  }, [u]);
  var h = b.useRef(!1), g = b.useRef(null), m = b.useRef(null), y = b.useRef(null);
  b.useEffect(function() {
    return function() {
      clearTimeout(g.current);
    };
  }, []);
  var w = b.useCallback(function(x) {
    var E = x.pulsate, N = x.rippleX, z = x.rippleY, O = x.rippleSize, P = x.cb;
    c(function(M) {
      return [].concat(Ka(M), [/* @__PURE__ */ b.createElement(og, {
        key: d.current,
        classes: o,
        timeout: Ei,
        pulsate: E,
        rippleX: N,
        rippleY: z,
        rippleSize: O
      })]);
    }), d.current += 1, p.current = P;
  }, [o]), k = b.useCallback(function() {
    var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, N = arguments.length > 2 ? arguments[2] : void 0, z = E.pulsate, O = z === void 0 ? !1 : z, P = E.center, M = P === void 0 ? n || E.pulsate : P, v = E.fakeElement, C = v === void 0 ? !1 : v;
    if (x.type === "mousedown" && h.current) {
      h.current = !1;
      return;
    }
    x.type === "touchstart" && (h.current = !0);
    var D = C ? null : y.current, L = D ? D.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    }, R, W, F;
    if (M || x.clientX === 0 && x.clientY === 0 || !x.clientX && !x.touches)
      R = Math.round(L.width / 2), W = Math.round(L.height / 2);
    else {
      var G = x.touches ? x.touches[0] : x, B = G.clientX, Z = G.clientY;
      R = Math.round(B - L.left), W = Math.round(Z - L.top);
    }
    if (M)
      F = Math.sqrt((2 * Math.pow(L.width, 2) + Math.pow(L.height, 2)) / 3), F % 2 === 0 && (F += 1);
    else {
      var Q = Math.max(Math.abs((D ? D.clientWidth : 0) - R), R) * 2 + 2, de = Math.max(Math.abs((D ? D.clientHeight : 0) - W), W) * 2 + 2;
      F = Math.sqrt(Math.pow(Q, 2) + Math.pow(de, 2));
    }
    x.touches ? m.current === null && (m.current = function() {
      w({
        pulsate: O,
        rippleX: R,
        rippleY: W,
        rippleSize: F,
        cb: N
      });
    }, g.current = setTimeout(function() {
      m.current && (m.current(), m.current = null);
    }, ig)) : w({
      pulsate: O,
      rippleX: R,
      rippleY: W,
      rippleSize: F,
      cb: N
    });
  }, [n, w]), I = b.useCallback(function() {
    k({}, {
      pulsate: !0
    });
  }, [k]), f = b.useCallback(function(x, E) {
    if (clearTimeout(g.current), x.type === "touchend" && m.current) {
      x.persist(), m.current(), m.current = null, g.current = setTimeout(function() {
        f(x, E);
      });
      return;
    }
    m.current = null, c(function(N) {
      return N.length > 0 ? N.slice(1) : N;
    }), p.current = E;
  }, []);
  return b.useImperativeHandle(a, function() {
    return {
      pulsate: I,
      start: k,
      stop: f
    };
  }, [I, k, f]), /* @__PURE__ */ b.createElement("span", Y({
    className: he(o.root, i),
    ref: y
  }, s), /* @__PURE__ */ b.createElement(ts, {
    component: null,
    exit: !0
  }, u));
});
const cg = Qe(sg, {
  flip: !1,
  name: "MuiTouchRipple"
})(/* @__PURE__ */ b.memo(lg));
var ug = {
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
}, dg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.action, n = e.buttonRef, o = e.centerRipple, i = o === void 0 ? !1 : o, s = e.children, l = e.classes, u = e.className, c = e.component, d = c === void 0 ? "button" : c, p = e.disabled, h = p === void 0 ? !1 : p, g = e.disableRipple, m = g === void 0 ? !1 : g, y = e.disableTouchRipple, w = y === void 0 ? !1 : y, k = e.focusRipple, I = k === void 0 ? !1 : k, f = e.focusVisibleClassName, x = e.onBlur, E = e.onClick, N = e.onFocus, z = e.onFocusVisible, O = e.onKeyDown, P = e.onKeyUp, M = e.onMouseDown, v = e.onMouseLeave, C = e.onMouseUp, D = e.onTouchEnd, L = e.onTouchMove, R = e.onTouchStart, W = e.onDragLeave, F = e.tabIndex, G = F === void 0 ? 0 : F, B = e.TouchRippleProps, Z = e.type, Q = Z === void 0 ? "button" : Z, de = Ae(e, ["action", "buttonRef", "centerRipple", "children", "classes", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "onBlur", "onClick", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "onDragLeave", "tabIndex", "TouchRippleProps", "type"]), ue = b.useRef(null);
  function xe() {
    return Xt.findDOMNode(ue.current);
  }
  var fe = b.useRef(null), ve = b.useState(!1), ge = ve[0], Se = ve[1];
  h && ge && Se(!1);
  var Ee = Qi(), ie = Ee.isFocusVisible, pe = Ee.onBlurVisible, we = Ee.ref;
  b.useImperativeHandle(r, function() {
    return {
      focusVisible: function() {
        Se(!0), ue.current.focus();
      }
    };
  }, []), b.useEffect(function() {
    ge && I && !m && fe.current.pulsate();
  }, [m, I, ge]);
  function Ce(se, ke) {
    var He = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : w;
    return rr(function(Je) {
      ke && ke(Je);
      var at = He;
      return !at && fe.current && fe.current[se](Je), !0;
    });
  }
  var Ye = Ce("start", M), Oe = Ce("stop", W), Fe = Ce("stop", C), qe = Ce("stop", function(se) {
    ge && se.preventDefault(), v && v(se);
  }), Xe = Ce("start", R), nt = Ce("stop", D), et = Ce("stop", L), Ve = Ce("stop", function(se) {
    ge && (pe(se), Se(!1)), x && x(se);
  }, !1), Le = rr(function(se) {
    ue.current || (ue.current = se.currentTarget), ie(se) && (Se(!0), z && z(se)), N && N(se);
  }), ze = function() {
    var ke = xe();
    return d && d !== "button" && !(ke.tagName === "A" && ke.href);
  }, ee = b.useRef(!1), H = rr(function(se) {
    I && !ee.current && ge && fe.current && se.key === " " && (ee.current = !0, se.persist(), fe.current.stop(se, function() {
      fe.current.start(se);
    })), se.target === se.currentTarget && ze() && se.key === " " && se.preventDefault(), O && O(se), se.target === se.currentTarget && ze() && se.key === "Enter" && !h && (se.preventDefault(), E && E(se));
  }), K = rr(function(se) {
    I && se.key === " " && fe.current && ge && !se.defaultPrevented && (ee.current = !1, se.persist(), fe.current.stop(se, function() {
      fe.current.pulsate(se);
    })), P && P(se), E && se.target === se.currentTarget && ze() && se.key === " " && !se.defaultPrevented && E(se);
  }), te = d;
  te === "button" && de.href && (te = "a");
  var oe = {};
  te === "button" ? (oe.type = Q, oe.disabled = h) : ((te !== "a" || !de.href) && (oe.role = "button"), oe["aria-disabled"] = h);
  var be = Ct(n, a), Ie = Ct(we, ue), ye = Ct(be, Ie), me = b.useState(!1), De = me[0], Be = me[1];
  b.useEffect(function() {
    Be(!0);
  }, []);
  var Te = De && !m && !h;
  return /* @__PURE__ */ b.createElement(te, Y({
    className: he(l.root, u, ge && [l.focusVisible, f], h && l.disabled),
    onBlur: Ve,
    onClick: E,
    onFocus: Le,
    onKeyDown: H,
    onKeyUp: K,
    onMouseDown: Ye,
    onMouseLeave: qe,
    onMouseUp: Fe,
    onDragLeave: Oe,
    onTouchEnd: nt,
    onTouchMove: et,
    onTouchStart: Xe,
    ref: ye,
    tabIndex: h ? -1 : G
  }, oe, de), s, Te ? (
    /* TouchRipple is only needed client-side, x2 boost on the server. */
    /* @__PURE__ */ b.createElement(cg, Y({
      ref: fe,
      center: i
    }, B))
  ) : null);
});
const wr = Qe(ug, {
  name: "MuiButtonBase"
})(dg);
var fg = function(e) {
  return {
    /* Styles applied to the root element. */
    root: {
      textAlign: "center",
      flex: "0 0 auto",
      fontSize: e.typography.pxToRem(24),
      padding: 12,
      borderRadius: "50%",
      overflow: "visible",
      // Explicitly set the default value to solve a bug on IE 11.
      color: e.palette.action.active,
      transition: e.transitions.create("background-color", {
        duration: e.transitions.duration.shortest
      }),
      "&:hover": {
        backgroundColor: Ue(e.palette.action.active, e.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      },
      "&$disabled": {
        backgroundColor: "transparent",
        color: e.palette.action.disabled
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
      color: e.palette.primary.main,
      "&:hover": {
        backgroundColor: Ue(e.palette.primary.main, e.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: e.palette.secondary.main,
      "&:hover": {
        backgroundColor: Ue(e.palette.secondary.main, e.palette.action.hoverOpacity),
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
      fontSize: e.typography.pxToRem(18)
    },
    /* Styles applied to the children container element. */
    label: {
      width: "100%",
      display: "flex",
      alignItems: "inherit",
      justifyContent: "inherit"
    }
  };
}, pg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.edge, n = r === void 0 ? !1 : r, o = e.children, i = e.classes, s = e.className, l = e.color, u = l === void 0 ? "default" : l, c = e.disabled, d = c === void 0 ? !1 : c, p = e.disableFocusRipple, h = p === void 0 ? !1 : p, g = e.size, m = g === void 0 ? "medium" : g, y = Ae(e, ["edge", "children", "classes", "className", "color", "disabled", "disableFocusRipple", "size"]);
  return /* @__PURE__ */ b.createElement(wr, Y({
    className: he(i.root, s, u !== "default" && i["color".concat(pt(u))], d && i.disabled, m === "small" && i["size".concat(pt(m))], {
      start: i.edgeStart,
      end: i.edgeEnd
    }[n]),
    centerRipple: !0,
    focusRipple: !h,
    disabled: d,
    ref: a
  }, y), /* @__PURE__ */ b.createElement("span", {
    className: i.label
  }, o));
});
const Zc = Qe(fg, {
  name: "MuiIconButton"
})(pg);
var hg = function(e) {
  var a = {
    duration: e.transitions.duration.shortest
  };
  return {
    /* Styles applied to the root element. */
    root: {
      display: "flex",
      minHeight: 48,
      transition: e.transitions.create(["min-height", "background-color"], a),
      padding: e.spacing(0, 2),
      "&:hover:not($disabled)": {
        cursor: "pointer"
      },
      "&$expanded": {
        minHeight: 64
      },
      "&$focused, &$focusVisible": {
        backgroundColor: e.palette.action.focus
      },
      "&$disabled": {
        opacity: e.palette.action.disabledOpacity
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
      transition: e.transitions.create(["margin"], a),
      margin: "12px 0",
      "&$expanded": {
        margin: "20px 0"
      }
    },
    /* Styles applied to the `IconButton` component when `expandIcon` is supplied. */
    expandIcon: {
      transform: "rotate(0deg)",
      transition: e.transitions.create("transform", a),
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
}, mg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.expandIcon, s = e.focusVisibleClassName, l = e.IconButtonProps, u = l === void 0 ? {} : l, c = e.onClick, d = Ae(e, ["children", "classes", "className", "expandIcon", "focusVisibleClassName", "IconButtonProps", "onClick"]), p = b.useContext(Jc), h = p.disabled, g = h === void 0 ? !1 : h, m = p.expanded, y = p.toggle, w = function(I) {
    y && y(I), c && c(I);
  };
  return /* @__PURE__ */ b.createElement(wr, Y({
    focusRipple: !1,
    disableRipple: !0,
    disabled: g,
    component: "div",
    "aria-expanded": m,
    className: he(n.root, o, g && n.disabled, m && n.expanded),
    focusVisibleClassName: he(n.focusVisible, n.focused, s),
    onClick: w,
    ref: a
  }, d), /* @__PURE__ */ b.createElement("div", {
    className: he(n.content, m && n.expanded)
  }, r), i && /* @__PURE__ */ b.createElement(Zc, Y({
    className: he(n.expandIcon, m && n.expanded),
    edge: "end",
    component: "div",
    tabIndex: null,
    role: null,
    "aria-hidden": !0
  }, u), i));
});
const gg = Qe(hg, {
  name: "MuiAccordionSummary"
})(mg);
var vg = of(dr(af, pf, Rf, Bf, Xf, Vf, Jf, op, Wi, xp)), _e = Xi("div")(vg, {
  name: "MuiBox"
}), bg = function(e) {
  return {
    /* Styles applied to the root element. */
    root: {
      margin: 0
    },
    /* Styles applied to the root element if `variant="body2"`. */
    body2: e.typography.body2,
    /* Styles applied to the root element if `variant="body1"`. */
    body1: e.typography.body1,
    /* Styles applied to the root element if `variant="caption"`. */
    caption: e.typography.caption,
    /* Styles applied to the root element if `variant="button"`. */
    button: e.typography.button,
    /* Styles applied to the root element if `variant="h1"`. */
    h1: e.typography.h1,
    /* Styles applied to the root element if `variant="h2"`. */
    h2: e.typography.h2,
    /* Styles applied to the root element if `variant="h3"`. */
    h3: e.typography.h3,
    /* Styles applied to the root element if `variant="h4"`. */
    h4: e.typography.h4,
    /* Styles applied to the root element if `variant="h5"`. */
    h5: e.typography.h5,
    /* Styles applied to the root element if `variant="h6"`. */
    h6: e.typography.h6,
    /* Styles applied to the root element if `variant="subtitle1"`. */
    subtitle1: e.typography.subtitle1,
    /* Styles applied to the root element if `variant="subtitle2"`. */
    subtitle2: e.typography.subtitle2,
    /* Styles applied to the root element if `variant="overline"`. */
    overline: e.typography.overline,
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
      color: e.palette.primary.main
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: e.palette.secondary.main
    },
    /* Styles applied to the root element if `color="textPrimary"`. */
    colorTextPrimary: {
      color: e.palette.text.primary
    },
    /* Styles applied to the root element if `color="textSecondary"`. */
    colorTextSecondary: {
      color: e.palette.text.secondary
    },
    /* Styles applied to the root element if `color="error"`. */
    colorError: {
      color: e.palette.error.main
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
}, fl = {
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
}, yg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.align, n = r === void 0 ? "inherit" : r, o = e.classes, i = e.className, s = e.color, l = s === void 0 ? "initial" : s, u = e.component, c = e.display, d = c === void 0 ? "initial" : c, p = e.gutterBottom, h = p === void 0 ? !1 : p, g = e.noWrap, m = g === void 0 ? !1 : g, y = e.paragraph, w = y === void 0 ? !1 : y, k = e.variant, I = k === void 0 ? "body1" : k, f = e.variantMapping, x = f === void 0 ? fl : f, E = Ae(e, ["align", "classes", "className", "color", "component", "display", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"]), N = u || (w ? "p" : x[I] || fl[I]) || "span";
  return /* @__PURE__ */ b.createElement(N, Y({
    className: he(o.root, i, I !== "inherit" && o[I], l !== "initial" && o["color".concat(pt(l))], m && o.noWrap, h && o.gutterBottom, w && o.paragraph, n !== "inherit" && o["align".concat(pt(n))], d !== "initial" && o["display".concat(pt(d))]),
    ref: a
  }, E));
});
const Kt = Qe(bg, {
  name: "MuiTypography"
})(yg);
var xg = function(e) {
  return {
    /* Styles applied to the root element. */
    root: Y({}, e.typography.button, {
      boxSizing: "border-box",
      minWidth: 64,
      padding: "6px 16px",
      borderRadius: e.shape.borderRadius,
      color: e.palette.text.primary,
      transition: e.transitions.create(["background-color", "box-shadow", "border"], {
        duration: e.transitions.duration.short
      }),
      "&:hover": {
        textDecoration: "none",
        backgroundColor: Ue(e.palette.text.primary, e.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        },
        "&$disabled": {
          backgroundColor: "transparent"
        }
      },
      "&$disabled": {
        color: e.palette.action.disabled
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
      color: e.palette.primary.main,
      "&:hover": {
        backgroundColor: Ue(e.palette.primary.main, e.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    /* Styles applied to the root element if `variant="text"` and `color="secondary"`. */
    textSecondary: {
      color: e.palette.secondary.main,
      "&:hover": {
        backgroundColor: Ue(e.palette.secondary.main, e.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      padding: "5px 15px",
      border: "1px solid ".concat(e.palette.type === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"),
      "&$disabled": {
        border: "1px solid ".concat(e.palette.action.disabledBackground)
      }
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
    outlinedPrimary: {
      color: e.palette.primary.main,
      border: "1px solid ".concat(Ue(e.palette.primary.main, 0.5)),
      "&:hover": {
        border: "1px solid ".concat(e.palette.primary.main),
        backgroundColor: Ue(e.palette.primary.main, e.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      color: e.palette.secondary.main,
      border: "1px solid ".concat(Ue(e.palette.secondary.main, 0.5)),
      "&:hover": {
        border: "1px solid ".concat(e.palette.secondary.main),
        backgroundColor: Ue(e.palette.secondary.main, e.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      },
      "&$disabled": {
        border: "1px solid ".concat(e.palette.action.disabled)
      }
    },
    /* Styles applied to the root element if `variant="contained"`. */
    contained: {
      color: e.palette.getContrastText(e.palette.grey[300]),
      backgroundColor: e.palette.grey[300],
      boxShadow: e.shadows[2],
      "&:hover": {
        backgroundColor: e.palette.grey.A100,
        boxShadow: e.shadows[4],
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          boxShadow: e.shadows[2],
          backgroundColor: e.palette.grey[300]
        },
        "&$disabled": {
          backgroundColor: e.palette.action.disabledBackground
        }
      },
      "&$focusVisible": {
        boxShadow: e.shadows[6]
      },
      "&:active": {
        boxShadow: e.shadows[8]
      },
      "&$disabled": {
        color: e.palette.action.disabled,
        boxShadow: e.shadows[0],
        backgroundColor: e.palette.action.disabledBackground
      }
    },
    /* Styles applied to the root element if `variant="contained"` and `color="primary"`. */
    containedPrimary: {
      color: e.palette.primary.contrastText,
      backgroundColor: e.palette.primary.main,
      "&:hover": {
        backgroundColor: e.palette.primary.dark,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: e.palette.primary.main
        }
      }
    },
    /* Styles applied to the root element if `variant="contained"` and `color="secondary"`. */
    containedSecondary: {
      color: e.palette.secondary.contrastText,
      backgroundColor: e.palette.secondary.main,
      "&:hover": {
        backgroundColor: e.palette.secondary.dark,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: e.palette.secondary.main
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
      fontSize: e.typography.pxToRem(13)
    },
    /* Styles applied to the root element if `size="large"` and `variant="text"`. */
    textSizeLarge: {
      padding: "8px 11px",
      fontSize: e.typography.pxToRem(15)
    },
    /* Styles applied to the root element if `size="small"` and `variant="outlined"`. */
    outlinedSizeSmall: {
      padding: "3px 9px",
      fontSize: e.typography.pxToRem(13)
    },
    /* Styles applied to the root element if `size="large"` and `variant="outlined"`. */
    outlinedSizeLarge: {
      padding: "7px 21px",
      fontSize: e.typography.pxToRem(15)
    },
    /* Styles applied to the root element if `size="small"` and `variant="contained"`. */
    containedSizeSmall: {
      padding: "4px 10px",
      fontSize: e.typography.pxToRem(13)
    },
    /* Styles applied to the root element if `size="large"` and `variant="contained"`. */
    containedSizeLarge: {
      padding: "8px 22px",
      fontSize: e.typography.pxToRem(15)
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
}, Sg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.color, s = i === void 0 ? "default" : i, l = e.component, u = l === void 0 ? "button" : l, c = e.disabled, d = c === void 0 ? !1 : c, p = e.disableElevation, h = p === void 0 ? !1 : p, g = e.disableFocusRipple, m = g === void 0 ? !1 : g, y = e.endIcon, w = e.focusVisibleClassName, k = e.fullWidth, I = k === void 0 ? !1 : k, f = e.size, x = f === void 0 ? "medium" : f, E = e.startIcon, N = e.type, z = N === void 0 ? "button" : N, O = e.variant, P = O === void 0 ? "text" : O, M = Ae(e, ["children", "classes", "className", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"]), v = E && /* @__PURE__ */ b.createElement("span", {
    className: he(n.startIcon, n["iconSize".concat(pt(x))])
  }, E), C = y && /* @__PURE__ */ b.createElement("span", {
    className: he(n.endIcon, n["iconSize".concat(pt(x))])
  }, y);
  return /* @__PURE__ */ b.createElement(wr, Y({
    className: he(n.root, n[P], o, s === "inherit" ? n.colorInherit : s !== "default" && n["".concat(P).concat(pt(s))], x !== "medium" && [n["".concat(P, "Size").concat(pt(x))], n["size".concat(pt(x))]], h && n.disableElevation, d && n.disabled, I && n.fullWidth),
    component: u,
    disabled: d,
    focusRipple: !m,
    focusVisibleClassName: he(n.focusVisible, w),
    ref: a,
    type: z
  }, M), /* @__PURE__ */ b.createElement("span", {
    className: n.label
  }, v, r, C));
});
const Cg = Qe(xg, {
  name: "MuiButton"
})(Sg);
var ea = b.createContext();
function Qc() {
  return b.useContext(ea);
}
function rs() {
  return b.useContext(ea);
}
const wg = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}));
var Eg = function(e) {
  var a = e.palette.type === "light" ? e.palette.grey[300] : e.palette.grey[700], r = Ue(e.palette.text.primary, 0.26);
  return {
    /* Styles applied to the root element. */
    root: {
      fontFamily: e.typography.fontFamily,
      fontSize: e.typography.pxToRem(13),
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: 32,
      color: e.palette.getContrastText(a),
      backgroundColor: a,
      borderRadius: 32 / 2,
      whiteSpace: "nowrap",
      transition: e.transitions.create(["background-color", "box-shadow"]),
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
        color: e.palette.type === "light" ? e.palette.grey[700] : e.palette.grey[300],
        fontSize: e.typography.pxToRem(12)
      },
      "& $avatarColorPrimary": {
        color: e.palette.primary.contrastText,
        backgroundColor: e.palette.primary.dark
      },
      "& $avatarColorSecondary": {
        color: e.palette.secondary.contrastText,
        backgroundColor: e.palette.secondary.dark
      },
      "& $avatarSmall": {
        marginLeft: 4,
        marginRight: -4,
        width: 18,
        height: 18,
        fontSize: e.typography.pxToRem(10)
      }
    },
    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      height: 24
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      backgroundColor: e.palette.primary.main,
      color: e.palette.primary.contrastText
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      backgroundColor: e.palette.secondary.main,
      color: e.palette.secondary.contrastText
    },
    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `onClick` is defined or `clickable={true}`. */
    clickable: {
      userSelect: "none",
      WebkitTapHighlightColor: "transparent",
      cursor: "pointer",
      "&:hover, &:focus": {
        backgroundColor: Qr(a, 0.08)
      },
      "&:active": {
        boxShadow: e.shadows[1]
      }
    },
    /* Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`. */
    clickableColorPrimary: {
      "&:hover, &:focus": {
        backgroundColor: Qr(e.palette.primary.main, 0.08)
      }
    },
    /* Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`. */
    clickableColorSecondary: {
      "&:hover, &:focus": {
        backgroundColor: Qr(e.palette.secondary.main, 0.08)
      }
    },
    /* Styles applied to the root element if `onDelete` is defined. */
    deletable: {
      "&:focus": {
        backgroundColor: Qr(a, 0.08)
      }
    },
    /* Styles applied to the root element if `onDelete` and `color="primary"` is defined. */
    deletableColorPrimary: {
      "&:focus": {
        backgroundColor: Qr(e.palette.primary.main, 0.2)
      }
    },
    /* Styles applied to the root element if `onDelete` and `color="secondary"` is defined. */
    deletableColorSecondary: {
      "&:focus": {
        backgroundColor: Qr(e.palette.secondary.main, 0.2)
      }
    },
    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      backgroundColor: "transparent",
      border: "1px solid ".concat(e.palette.type === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"),
      "$clickable&:hover, $clickable&:focus, $deletable&:focus": {
        backgroundColor: Ue(e.palette.text.primary, e.palette.action.hoverOpacity)
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
      color: e.palette.primary.main,
      border: "1px solid ".concat(e.palette.primary.main),
      "$clickable&:hover, $clickable&:focus, $deletable&:focus": {
        backgroundColor: Ue(e.palette.primary.main, e.palette.action.hoverOpacity)
      }
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      color: e.palette.secondary.main,
      border: "1px solid ".concat(e.palette.secondary.main),
      "$clickable&:hover, $clickable&:focus, $deletable&:focus": {
        backgroundColor: Ue(e.palette.secondary.main, e.palette.action.hoverOpacity)
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
      color: e.palette.type === "light" ? e.palette.grey[700] : e.palette.grey[300],
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
        color: Ue(r, 0.4)
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
      color: Ue(e.palette.primary.contrastText, 0.7),
      "&:hover, &:active": {
        color: e.palette.primary.contrastText
      }
    },
    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="default"`. */
    deleteIconColorSecondary: {
      color: Ue(e.palette.secondary.contrastText, 0.7),
      "&:hover, &:active": {
        color: e.palette.secondary.contrastText
      }
    },
    /* Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`. */
    deleteIconOutlinedColorPrimary: {
      color: Ue(e.palette.primary.main, 0.7),
      "&:hover, &:active": {
        color: e.palette.primary.main
      }
    },
    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`. */
    deleteIconOutlinedColorSecondary: {
      color: Ue(e.palette.secondary.main, 0.7),
      "&:hover, &:active": {
        color: e.palette.secondary.main
      }
    }
  };
};
function pl(t) {
  return t.key === "Backspace" || t.key === "Delete";
}
var kg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.avatar, n = e.classes, o = e.className, i = e.clickable, s = e.color, l = s === void 0 ? "default" : s, u = e.component, c = e.deleteIcon, d = e.disabled, p = d === void 0 ? !1 : d, h = e.icon, g = e.label, m = e.onClick, y = e.onDelete, w = e.onKeyDown, k = e.onKeyUp, I = e.size, f = I === void 0 ? "medium" : I, x = e.variant, E = x === void 0 ? "default" : x, N = Ae(e, ["avatar", "classes", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant"]), z = b.useRef(null), O = Ct(z, a), P = function(Q) {
    Q.stopPropagation(), y && y(Q);
  }, M = function(Q) {
    Q.currentTarget === Q.target && pl(Q) && Q.preventDefault(), w && w(Q);
  }, v = function(Q) {
    Q.currentTarget === Q.target && (y && pl(Q) ? y(Q) : Q.key === "Escape" && z.current && z.current.blur()), k && k(Q);
  }, C = i !== !1 && m ? !0 : i, D = f === "small", L = u || (C ? wr : "div"), R = L === wr ? {
    component: "div"
  } : {}, W = null;
  if (y) {
    var F = he(l !== "default" && (E === "default" ? n["deleteIconColor".concat(pt(l))] : n["deleteIconOutlinedColor".concat(pt(l))]), D && n.deleteIconSmall);
    W = c && /* @__PURE__ */ b.isValidElement(c) ? /* @__PURE__ */ b.cloneElement(c, {
      className: he(c.props.className, n.deleteIcon, F),
      onClick: P
    }) : /* @__PURE__ */ b.createElement(wg, {
      className: he(n.deleteIcon, F),
      onClick: P
    });
  }
  var G = null;
  r && /* @__PURE__ */ b.isValidElement(r) && (G = /* @__PURE__ */ b.cloneElement(r, {
    className: he(n.avatar, r.props.className, D && n.avatarSmall, l !== "default" && n["avatarColor".concat(pt(l))])
  }));
  var B = null;
  return h && /* @__PURE__ */ b.isValidElement(h) && (B = /* @__PURE__ */ b.cloneElement(h, {
    className: he(n.icon, h.props.className, D && n.iconSmall, l !== "default" && n["iconColor".concat(pt(l))])
  })), /* @__PURE__ */ b.createElement(L, Y({
    role: C || y ? "button" : void 0,
    className: he(n.root, o, l !== "default" && [n["color".concat(pt(l))], C && n["clickableColor".concat(pt(l))], y && n["deletableColor".concat(pt(l))]], E !== "default" && [n.outlined, {
      primary: n.outlinedPrimary,
      secondary: n.outlinedSecondary
    }[l]], p && n.disabled, D && n.sizeSmall, C && n.clickable, y && n.deletable),
    "aria-disabled": p ? !0 : void 0,
    tabIndex: C || y ? 0 : void 0,
    onClick: m,
    onKeyDown: M,
    onKeyUp: v,
    ref: O
  }, R, N), G || B, /* @__PURE__ */ b.createElement("span", {
    className: he(n.label, D && n.labelSmall)
  }, g), W);
});
const $g = Qe(Eg, {
  name: "MuiChip"
})(kg);
var vr = 44, Rg = function(e) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: "inline-block"
    },
    /* Styles applied to the root element if `variant="static"`. */
    static: {
      transition: e.transitions.create("transform")
    },
    /* Styles applied to the root element if `variant="indeterminate"`. */
    indeterminate: {
      animation: "$circular-rotate 1.4s linear infinite"
    },
    /* Styles applied to the root element if `variant="determinate"`. */
    determinate: {
      transition: e.transitions.create("transform")
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      color: e.palette.primary.main
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      color: e.palette.secondary.main
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
      transition: e.transitions.create("stroke-dashoffset")
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
      transition: e.transitions.create("stroke-dashoffset")
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
}, Tg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.color, i = o === void 0 ? "primary" : o, s = e.disableShrink, l = s === void 0 ? !1 : s, u = e.size, c = u === void 0 ? 40 : u, d = e.style, p = e.thickness, h = p === void 0 ? 3.6 : p, g = e.value, m = g === void 0 ? 0 : g, y = e.variant, w = y === void 0 ? "indeterminate" : y, k = Ae(e, ["classes", "className", "color", "disableShrink", "size", "style", "thickness", "value", "variant"]), I = {}, f = {}, x = {};
  if (w === "determinate" || w === "static") {
    var E = 2 * Math.PI * ((vr - h) / 2);
    I.strokeDasharray = E.toFixed(3), x["aria-valuenow"] = Math.round(m), I.strokeDashoffset = "".concat(((100 - m) / 100 * E).toFixed(3), "px"), f.transform = "rotate(-90deg)";
  }
  return /* @__PURE__ */ b.createElement("div", Y({
    className: he(r.root, n, i !== "inherit" && r["color".concat(pt(i))], {
      determinate: r.determinate,
      indeterminate: r.indeterminate,
      static: r.static
    }[w]),
    style: Y({
      width: c,
      height: c
    }, f, d),
    ref: a,
    role: "progressbar"
  }, x, k), /* @__PURE__ */ b.createElement("svg", {
    className: r.svg,
    viewBox: "".concat(vr / 2, " ").concat(vr / 2, " ").concat(vr, " ").concat(vr)
  }, /* @__PURE__ */ b.createElement("circle", {
    className: he(r.circle, l && r.circleDisableShrink, {
      determinate: r.circleDeterminate,
      indeterminate: r.circleIndeterminate,
      static: r.circleStatic
    }[w]),
    style: I,
    cx: vr,
    cy: vr,
    r: (vr - h) / 2,
    fill: "none",
    strokeWidth: h
  })));
});
const Xa = Qe(Rg, {
  name: "MuiCircularProgress",
  flip: !1
})(Tg);
function Og(t) {
  return t = typeof t == "function" ? t() : t, Xt.findDOMNode(t);
}
var qo = typeof window < "u" ? b.useLayoutEffect : b.useEffect, eu = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.container, o = e.disablePortal, i = o === void 0 ? !1 : o, s = e.onRendered, l = b.useState(null), u = l[0], c = l[1], d = Ct(/* @__PURE__ */ b.isValidElement(r) ? r.ref : null, a);
  return qo(function() {
    i || c(Og(n) || document.body);
  }, [n, i]), qo(function() {
    if (u && !i)
      return zr(a, u), function() {
        zr(a, null);
      };
  }, [a, u, i]), qo(function() {
    s && (u || i) && s();
  }, [s, u, i]), i ? /* @__PURE__ */ b.isValidElement(r) ? /* @__PURE__ */ b.cloneElement(r, {
    ref: d
  }) : r : u && /* @__PURE__ */ Xt.createPortal(r, u);
});
function tu() {
  var t = document.createElement("div");
  t.style.width = "99px", t.style.height = "99px", t.style.position = "absolute", t.style.top = "-9999px", t.style.overflow = "scroll", document.body.appendChild(t);
  var e = t.offsetWidth - t.clientWidth;
  return document.body.removeChild(t), e;
}
function _g(t) {
  var e = cr(t);
  return e.body === t ? Ji(e).innerWidth > e.documentElement.clientWidth : t.scrollHeight > t.clientHeight;
}
function Wn(t, e) {
  e ? t.setAttribute("aria-hidden", "true") : t.removeAttribute("aria-hidden");
}
function hl(t) {
  return parseInt(window.getComputedStyle(t)["padding-right"], 10) || 0;
}
function ml(t, e, a) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [], n = arguments.length > 4 ? arguments[4] : void 0, o = [e, a].concat(Ka(r)), i = ["TEMPLATE", "SCRIPT", "STYLE"];
  [].forEach.call(t.children, function(s) {
    s.nodeType === 1 && o.indexOf(s) === -1 && i.indexOf(s.tagName) === -1 && Wn(s, n);
  });
}
function Go(t, e) {
  var a = -1;
  return t.some(function(r, n) {
    return e(r) ? (a = n, !0) : !1;
  }), a;
}
function Pg(t, e) {
  var a = [], r = [], n = t.container, o;
  if (!e.disableScrollLock) {
    if (_g(n)) {
      var i = tu();
      a.push({
        value: n.style.paddingRight,
        key: "padding-right",
        el: n
      }), n.style["padding-right"] = "".concat(hl(n) + i, "px"), o = cr(n).querySelectorAll(".mui-fixed"), [].forEach.call(o, function(c) {
        r.push(c.style.paddingRight), c.style.paddingRight = "".concat(hl(c) + i, "px");
      });
    }
    var s = n.parentElement, l = s.nodeName === "HTML" && window.getComputedStyle(s)["overflow-y"] === "scroll" ? s : n;
    a.push({
      value: l.style.overflow,
      key: "overflow",
      el: l
    }), l.style.overflow = "hidden";
  }
  var u = function() {
    o && [].forEach.call(o, function(d, p) {
      r[p] ? d.style.paddingRight = r[p] : d.style.removeProperty("padding-right");
    }), a.forEach(function(d) {
      var p = d.value, h = d.el, g = d.key;
      p ? h.style.setProperty(g, p) : h.style.removeProperty(g);
    });
  };
  return u;
}
function Ag(t) {
  var e = [];
  return [].forEach.call(t.children, function(a) {
    a.getAttribute && a.getAttribute("aria-hidden") === "true" && e.push(a);
  }), e;
}
var Ig = /* @__PURE__ */ (function() {
  function t() {
    Cm(this, t), this.modals = [], this.containers = [];
  }
  return Vi(t, [{
    key: "add",
    value: function(a, r) {
      var n = this.modals.indexOf(a);
      if (n !== -1)
        return n;
      n = this.modals.length, this.modals.push(a), a.modalRef && Wn(a.modalRef, !1);
      var o = Ag(r);
      ml(r, a.mountNode, a.modalRef, o, !0);
      var i = Go(this.containers, function(s) {
        return s.container === r;
      });
      return i !== -1 ? (this.containers[i].modals.push(a), n) : (this.containers.push({
        modals: [a],
        container: r,
        restore: null,
        hiddenSiblingNodes: o
      }), n);
    }
  }, {
    key: "mount",
    value: function(a, r) {
      var n = Go(this.containers, function(i) {
        return i.modals.indexOf(a) !== -1;
      }), o = this.containers[n];
      o.restore || (o.restore = Pg(o, r));
    }
  }, {
    key: "remove",
    value: function(a) {
      var r = this.modals.indexOf(a);
      if (r === -1)
        return r;
      var n = Go(this.containers, function(s) {
        return s.modals.indexOf(a) !== -1;
      }), o = this.containers[n];
      if (o.modals.splice(o.modals.indexOf(a), 1), this.modals.splice(r, 1), o.modals.length === 0)
        o.restore && o.restore(), a.modalRef && Wn(a.modalRef, !0), ml(o.container, a.mountNode, a.modalRef, o.hiddenSiblingNodes, !1), this.containers.splice(n, 1);
      else {
        var i = o.modals[o.modals.length - 1];
        i.modalRef && Wn(i.modalRef, !1);
      }
      return r;
    }
  }, {
    key: "isTopModal",
    value: function(a) {
      return this.modals.length > 0 && this.modals[this.modals.length - 1] === a;
    }
  }]), t;
})();
function Mg(t) {
  var e = t.children, a = t.disableAutoFocus, r = a === void 0 ? !1 : a, n = t.disableEnforceFocus, o = n === void 0 ? !1 : n, i = t.disableRestoreFocus, s = i === void 0 ? !1 : i, l = t.getDoc, u = t.isEnabled, c = t.open, d = b.useRef(), p = b.useRef(null), h = b.useRef(null), g = b.useRef(), m = b.useRef(null), y = b.useCallback(function(I) {
    m.current = Xt.findDOMNode(I);
  }, []), w = Ct(e.ref, y), k = b.useRef();
  return b.useEffect(function() {
    k.current = c;
  }, [c]), !k.current && c && typeof window < "u" && (g.current = l().activeElement), b.useEffect(function() {
    if (c) {
      var I = cr(m.current);
      !r && m.current && !m.current.contains(I.activeElement) && (m.current.hasAttribute("tabIndex") || m.current.setAttribute("tabIndex", -1), m.current.focus());
      var f = function() {
        var z = m.current;
        if (z !== null) {
          if (!I.hasFocus() || o || !u() || d.current) {
            d.current = !1;
            return;
          }
          m.current && !m.current.contains(I.activeElement) && m.current.focus();
        }
      }, x = function(z) {
        o || !u() || z.keyCode !== 9 || I.activeElement === m.current && (d.current = !0, z.shiftKey ? h.current.focus() : p.current.focus());
      };
      I.addEventListener("focus", f, !0), I.addEventListener("keydown", x, !0);
      var E = setInterval(function() {
        f();
      }, 50);
      return function() {
        clearInterval(E), I.removeEventListener("focus", f, !0), I.removeEventListener("keydown", x, !0), s || (g.current && g.current.focus && g.current.focus(), g.current = null);
      };
    }
  }, [r, o, s, u, c]), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("div", {
    tabIndex: 0,
    ref: p,
    "data-test": "sentinelStart"
  }), /* @__PURE__ */ b.cloneElement(e, {
    ref: w
  }), /* @__PURE__ */ b.createElement("div", {
    tabIndex: 0,
    ref: h,
    "data-test": "sentinelEnd"
  }));
}
var gl = {
  /* Styles applied to the root element. */
  root: {
    zIndex: -1,
    position: "fixed",
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    WebkitTapHighlightColor: "transparent"
  },
  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: "transparent"
  }
}, jg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.invisible, n = r === void 0 ? !1 : r, o = e.open, i = Ae(e, ["invisible", "open"]);
  return o ? /* @__PURE__ */ b.createElement("div", Y({
    "aria-hidden": !0,
    ref: a
  }, i, {
    style: Y({}, gl.root, n ? gl.invisible : {}, i.style)
  })) : null;
});
function Dg(t) {
  return t = typeof t == "function" ? t() : t, Xt.findDOMNode(t);
}
function Ng(t) {
  return t.children ? t.children.props.hasOwnProperty("in") : !1;
}
var Lg = new Ig(), Fg = function(e) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: "fixed",
      zIndex: e.zIndex.modal,
      right: 0,
      bottom: 0,
      top: 0,
      left: 0
    },
    /* Styles applied to the root element if the `Modal` has exited. */
    hidden: {
      visibility: "hidden"
    }
  };
}, Bg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = Qn(), n = Pc({
    name: "MuiModal",
    props: Y({}, e),
    theme: r
  }), o = n.BackdropComponent, i = o === void 0 ? jg : o, s = n.BackdropProps, l = n.children, u = n.closeAfterTransition, c = u === void 0 ? !1 : u, d = n.container, p = n.disableAutoFocus, h = p === void 0 ? !1 : p, g = n.disableBackdropClick, m = g === void 0 ? !1 : g, y = n.disableEnforceFocus, w = y === void 0 ? !1 : y, k = n.disableEscapeKeyDown, I = k === void 0 ? !1 : k, f = n.disablePortal, x = f === void 0 ? !1 : f, E = n.disableRestoreFocus, N = E === void 0 ? !1 : E, z = n.disableScrollLock, O = z === void 0 ? !1 : z, P = n.hideBackdrop, M = P === void 0 ? !1 : P, v = n.keepMounted, C = v === void 0 ? !1 : v, D = n.manager, L = D === void 0 ? Lg : D, R = n.onBackdropClick, W = n.onClose, F = n.onEscapeKeyDown, G = n.onRendered, B = n.open, Z = Ae(n, ["BackdropComponent", "BackdropProps", "children", "closeAfterTransition", "container", "disableAutoFocus", "disableBackdropClick", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onEscapeKeyDown", "onRendered", "open"]), Q = b.useState(!0), de = Q[0], ue = Q[1], xe = b.useRef({}), fe = b.useRef(null), ve = b.useRef(null), ge = Ct(ve, a), Se = Ng(n), Ee = function() {
    return cr(fe.current);
  }, ie = function() {
    return xe.current.modalRef = ve.current, xe.current.mountNode = fe.current, xe.current;
  }, pe = function() {
    L.mount(ie(), {
      disableScrollLock: O
    }), ve.current.scrollTop = 0;
  }, we = rr(function() {
    var Le = Dg(d) || Ee().body;
    L.add(ie(), Le), ve.current && pe();
  }), Ce = b.useCallback(function() {
    return L.isTopModal(ie());
  }, [L]), Ye = rr(function(Le) {
    fe.current = Le, Le && (G && G(), B && Ce() ? pe() : Wn(ve.current, !0));
  }), Oe = b.useCallback(function() {
    L.remove(ie());
  }, [L]);
  if (b.useEffect(function() {
    return function() {
      Oe();
    };
  }, [Oe]), b.useEffect(function() {
    B ? we() : (!Se || !c) && Oe();
  }, [B, Oe, Se, c, we]), !C && !B && (!Se || de))
    return null;
  var Fe = function() {
    ue(!1);
  }, qe = function() {
    ue(!0), c && Oe();
  }, Xe = function(ze) {
    ze.target === ze.currentTarget && (R && R(ze), !m && W && W(ze, "backdropClick"));
  }, nt = function(ze) {
    ze.key !== "Escape" || !Ce() || (F && F(ze), I || (ze.stopPropagation(), W && W(ze, "escapeKeyDown")));
  }, et = Fg(r || {
    zIndex: _c
  }), Ve = {};
  return l.props.tabIndex === void 0 && (Ve.tabIndex = l.props.tabIndex || "-1"), Se && (Ve.onEnter = Kn(Fe, l.props.onEnter), Ve.onExited = Kn(qe, l.props.onExited)), /* @__PURE__ */ b.createElement(eu, {
    ref: Ye,
    container: d,
    disablePortal: x
  }, /* @__PURE__ */ b.createElement("div", Y({
    ref: ge,
    onKeyDown: nt,
    role: "presentation"
  }, Z, {
    style: Y({}, et.root, !B && de ? et.hidden : {}, Z.style)
  }), M ? null : /* @__PURE__ */ b.createElement(i, Y({
    open: B,
    onClick: Xe
  }, s)), /* @__PURE__ */ b.createElement(Mg, {
    disableEnforceFocus: w,
    disableAutoFocus: h,
    disableRestoreFocus: N,
    getDoc: Ee,
    isEnabled: Ce,
    open: B
  }, /* @__PURE__ */ b.cloneElement(l, Ve))));
}), zg = function(e) {
  return {
    /* Styles applied to the root element. */
    root: {
      height: 1,
      margin: 0,
      // Reset browser default style.
      border: "none",
      flexShrink: 0,
      backgroundColor: e.palette.divider
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
      backgroundColor: Ue(e.palette.divider, 0.08)
    },
    /* Styles applied to the root element if `variant="middle"`. */
    middle: {
      marginLeft: e.spacing(2),
      marginRight: e.spacing(2)
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
}, Wg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.absolute, n = r === void 0 ? !1 : r, o = e.classes, i = e.className, s = e.component, l = s === void 0 ? "hr" : s, u = e.flexItem, c = u === void 0 ? !1 : u, d = e.light, p = d === void 0 ? !1 : d, h = e.orientation, g = h === void 0 ? "horizontal" : h, m = e.role, y = m === void 0 ? l !== "hr" ? "separator" : void 0 : m, w = e.variant, k = w === void 0 ? "fullWidth" : w, I = Ae(e, ["absolute", "classes", "className", "component", "flexItem", "light", "orientation", "role", "variant"]);
  return /* @__PURE__ */ b.createElement(l, Y({
    className: he(o.root, i, k !== "fullWidth" && o[k], n && o.absolute, c && o.flexItem, p && o.light, g === "vertical" && o.vertical),
    role: y,
    ref: a
  }, I));
});
const Vg = Qe(zg, {
  name: "MuiDivider"
})(Wg);
function Ja(t) {
  var e = t.props, a = t.states, r = t.muiFormControl;
  return a.reduce(function(n, o) {
    return n[o] = e[o], r && typeof e[o] > "u" && (n[o] = r[o]), n;
  }, {});
}
function ma(t, e) {
  return parseInt(t[e], 10) || 0;
}
var Hg = typeof window < "u" ? b.useLayoutEffect : b.useEffect, Kg = {
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
}, Ug = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.onChange, n = e.rows, o = e.rowsMax, i = e.rowsMin, s = e.maxRows, l = e.minRows, u = l === void 0 ? 1 : l, c = e.style, d = e.value, p = Ae(e, ["onChange", "rows", "rowsMax", "rowsMin", "maxRows", "minRows", "style", "value"]), h = s || o, g = n || i || u, m = b.useRef(d != null), y = m.current, w = b.useRef(null), k = Ct(a, w), I = b.useRef(null), f = b.useRef(0), x = b.useState({}), E = x[0], N = x[1], z = b.useCallback(function() {
    var P = w.current, M = window.getComputedStyle(P), v = I.current;
    v.style.width = M.width, v.value = P.value || e.placeholder || "x", v.value.slice(-1) === `
` && (v.value += " ");
    var C = M["box-sizing"], D = ma(M, "padding-bottom") + ma(M, "padding-top"), L = ma(M, "border-bottom-width") + ma(M, "border-top-width"), R = v.scrollHeight - D;
    v.value = "x";
    var W = v.scrollHeight - D, F = R;
    g && (F = Math.max(Number(g) * W, F)), h && (F = Math.min(Number(h) * W, F)), F = Math.max(F, W);
    var G = F + (C === "border-box" ? D + L : 0), B = Math.abs(F - R) <= 1;
    N(function(Z) {
      return f.current < 20 && (G > 0 && Math.abs((Z.outerHeightStyle || 0) - G) > 1 || Z.overflow !== B) ? (f.current += 1, {
        overflow: B,
        outerHeightStyle: G
      }) : Z;
    });
  }, [h, g, e.placeholder]);
  b.useEffect(function() {
    var P = Un(function() {
      f.current = 0, z();
    });
    return window.addEventListener("resize", P), function() {
      P.clear(), window.removeEventListener("resize", P);
    };
  }, [z]), Hg(function() {
    z();
  }), b.useEffect(function() {
    f.current = 0;
  }, [d]);
  var O = function(M) {
    f.current = 0, y || z(), r && r(M);
  };
  return /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("textarea", Y({
    value: d,
    onChange: O,
    ref: k,
    rows: g,
    style: Y({
      height: E.outerHeightStyle,
      // Need a large enough difference to allow scrolling.
      // This prevents infinite rendering loop.
      overflow: E.overflow ? "hidden" : null
    }, c)
  }, p)), /* @__PURE__ */ b.createElement("textarea", {
    "aria-hidden": !0,
    className: e.className,
    readOnly: !0,
    ref: I,
    tabIndex: -1,
    style: Y({}, Kg.shadow, c)
  }));
});
function vl(t) {
  return t != null && !(Array.isArray(t) && t.length === 0);
}
function ns(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  return t && (vl(t.value) && t.value !== "" || e && vl(t.defaultValue) && t.defaultValue !== "");
}
function qg(t) {
  return t.startAdornment;
}
var Gg = function(e) {
  var a = e.palette.type === "light", r = {
    color: "currentColor",
    opacity: a ? 0.42 : 0.5,
    transition: e.transitions.create("opacity", {
      duration: e.transitions.duration.shorter
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
    root: Y({}, e.typography.body1, {
      color: e.palette.text.primary,
      lineHeight: "1.1876em",
      // Reset (19px), match the native input line-height
      boxSizing: "border-box",
      // Prevent padding issue with fullWidth.
      position: "relative",
      cursor: "text",
      display: "inline-flex",
      alignItems: "center",
      "&$disabled": {
        color: e.palette.text.disabled,
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
}, Yg = typeof window > "u" ? b.useEffect : b.useLayoutEffect, Xg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e["aria-describedby"], n = e.autoComplete, o = e.autoFocus, i = e.classes, s = e.className;
  e.color;
  var l = e.defaultValue, u = e.disabled, c = e.endAdornment;
  e.error;
  var d = e.fullWidth, p = d === void 0 ? !1 : d, h = e.id, g = e.inputComponent, m = g === void 0 ? "input" : g, y = e.inputProps, w = y === void 0 ? {} : y, k = e.inputRef;
  e.margin;
  var I = e.multiline, f = I === void 0 ? !1 : I, x = e.name, E = e.onBlur, N = e.onChange, z = e.onClick, O = e.onFocus, P = e.onKeyDown, M = e.onKeyUp, v = e.placeholder, C = e.readOnly, D = e.renderSuffix, L = e.rows, R = e.rowsMax, W = e.rowsMin, F = e.maxRows, G = e.minRows, B = e.startAdornment, Z = e.type, Q = Z === void 0 ? "text" : Z, de = e.value, ue = Ae(e, ["aria-describedby", "autoComplete", "autoFocus", "classes", "className", "color", "defaultValue", "disabled", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "rowsMax", "rowsMin", "maxRows", "minRows", "startAdornment", "type", "value"]), xe = w.value != null ? w.value : de, fe = b.useRef(xe != null), ve = fe.current, ge = b.useRef(), Se = b.useCallback(function(te) {
  }, []), Ee = Ct(w.ref, Se), ie = Ct(k, Ee), pe = Ct(ge, ie), we = b.useState(!1), Ce = we[0], Ye = we[1], Oe = Qc(), Fe = Ja({
    props: e,
    muiFormControl: Oe,
    states: ["color", "disabled", "error", "hiddenLabel", "margin", "required", "filled"]
  });
  Fe.focused = Oe ? Oe.focused : Ce, b.useEffect(function() {
    !Oe && u && Ce && (Ye(!1), E && E());
  }, [Oe, u, Ce, E]);
  var qe = Oe && Oe.onFilled, Xe = Oe && Oe.onEmpty, nt = b.useCallback(function(te) {
    ns(te) ? qe && qe() : Xe && Xe();
  }, [qe, Xe]);
  Yg(function() {
    ve && nt({
      value: xe
    });
  }, [xe, nt, ve]);
  var et = function(oe) {
    if (Fe.disabled) {
      oe.stopPropagation();
      return;
    }
    O && O(oe), w.onFocus && w.onFocus(oe), Oe && Oe.onFocus ? Oe.onFocus(oe) : Ye(!0);
  }, Ve = function(oe) {
    E && E(oe), w.onBlur && w.onBlur(oe), Oe && Oe.onBlur ? Oe.onBlur(oe) : Ye(!1);
  }, Le = function(oe) {
    if (!ve) {
      var be = oe.target || ge.current;
      if (be == null)
        throw new Error(mn(1));
      nt({
        value: be.value
      });
    }
    for (var Ie = arguments.length, ye = new Array(Ie > 1 ? Ie - 1 : 0), me = 1; me < Ie; me++)
      ye[me - 1] = arguments[me];
    w.onChange && w.onChange.apply(w, [oe].concat(ye)), N && N.apply(void 0, [oe].concat(ye));
  };
  b.useEffect(function() {
    nt(ge.current);
  }, []);
  var ze = function(oe) {
    ge.current && oe.currentTarget === oe.target && ge.current.focus(), z && z(oe);
  }, ee = m, H = Y({}, w, {
    ref: pe
  });
  typeof ee != "string" ? H = Y({
    // Rename ref to inputRef as we don't know the
    // provided `inputComponent` structure.
    inputRef: pe,
    type: Q
  }, H, {
    ref: null
  }) : f ? L && !F && !G && !R && !W ? ee = "textarea" : (H = Y({
    minRows: L || G,
    rowsMax: R,
    maxRows: F
  }, H), ee = Ug) : H = Y({
    type: Q
  }, H);
  var K = function(oe) {
    nt(oe.animationName === "mui-auto-fill-cancel" ? ge.current : {
      value: "x"
    });
  };
  return b.useEffect(function() {
    Oe && Oe.setAdornedStart(!!B);
  }, [Oe, B]), /* @__PURE__ */ b.createElement("div", Y({
    className: he(i.root, i["color".concat(pt(Fe.color || "primary"))], s, Fe.disabled && i.disabled, Fe.error && i.error, p && i.fullWidth, Fe.focused && i.focused, Oe && i.formControl, f && i.multiline, B && i.adornedStart, c && i.adornedEnd, Fe.margin === "dense" && i.marginDense),
    onClick: ze,
    ref: a
  }, ue), B, /* @__PURE__ */ b.createElement(ea.Provider, {
    value: null
  }, /* @__PURE__ */ b.createElement(ee, Y({
    "aria-invalid": Fe.error,
    "aria-describedby": r,
    autoComplete: n,
    autoFocus: o,
    defaultValue: l,
    disabled: Fe.disabled,
    id: h,
    onAnimationStart: K,
    name: x,
    placeholder: v,
    readOnly: C,
    required: Fe.required,
    rows: L,
    value: xe,
    onKeyDown: P,
    onKeyUp: M
  }, H, {
    className: he(i.input, w.className, Fe.disabled && i.disabled, f && i.inputMultiline, Fe.hiddenLabel && i.inputHiddenLabel, B && i.inputAdornedStart, c && i.inputAdornedEnd, Q === "search" && i.inputTypeSearch, Fe.margin === "dense" && i.inputMarginDense),
    onBlur: Ve,
    onChange: Le,
    onFocus: et
  }))), c, D ? D(Y({}, Fe, {
    startAdornment: B
  })) : null);
});
const Za = Qe(Gg, {
  name: "MuiInputBase"
})(Xg);
var Jg = function(e) {
  var a = e.palette.type === "light", r = a ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)", n = a ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.09)";
  return {
    /* Styles applied to the root element. */
    root: {
      position: "relative",
      backgroundColor: n,
      borderTopLeftRadius: e.shape.borderRadius,
      borderTopRightRadius: e.shape.borderRadius,
      transition: e.transitions.create("background-color", {
        duration: e.transitions.duration.shorter,
        easing: e.transitions.easing.easeOut
      }),
      "&:hover": {
        backgroundColor: a ? "rgba(0, 0, 0, 0.13)" : "rgba(255, 255, 255, 0.13)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: n
        }
      },
      "&$focused": {
        backgroundColor: a ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.09)"
      },
      "&$disabled": {
        backgroundColor: a ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)"
      }
    },
    /* Styles applied to the root element if color secondary. */
    colorSecondary: {
      "&$underline:after": {
        borderBottomColor: e.palette.secondary.main
      }
    },
    /* Styles applied to the root element if `disableUnderline={false}`. */
    underline: {
      "&:after": {
        borderBottom: "2px solid ".concat(e.palette.primary.main),
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        position: "absolute",
        right: 0,
        transform: "scaleX(0)",
        transition: e.transitions.create("transform", {
          duration: e.transitions.duration.shorter,
          easing: e.transitions.easing.easeOut
        }),
        pointerEvents: "none"
        // Transparent to the hover style.
      },
      "&$focused:after": {
        transform: "scaleX(1)"
      },
      "&$error:after": {
        borderBottomColor: e.palette.error.main,
        transform: "scaleX(1)"
        // error is always underlined in red
      },
      "&:before": {
        borderBottom: "1px solid ".concat(r),
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
        content: '"\\00a0"',
        position: "absolute",
        right: 0,
        transition: e.transitions.create("border-bottom-color", {
          duration: e.transitions.duration.shorter
        }),
        pointerEvents: "none"
        // Transparent to the hover style.
      },
      "&:hover:before": {
        borderBottom: "1px solid ".concat(e.palette.text.primary)
      },
      "&$disabled:before": {
        borderBottomStyle: "dotted"
      }
    },
    /* Pseudo-class applied to the root element if the component is focused. */
    focused: {},
    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `startAdornment` is provided. */
    adornedStart: {
      paddingLeft: 12
    },
    /* Styles applied to the root element if `endAdornment` is provided. */
    adornedEnd: {
      paddingRight: 12
    },
    /* Pseudo-class applied to the root element if `error={true}`. */
    error: {},
    /* Styles applied to the `input` element if `margin="dense"`. */
    marginDense: {},
    /* Styles applied to the root element if `multiline={true}`. */
    multiline: {
      padding: "27px 12px 10px",
      "&$marginDense": {
        paddingTop: 23,
        paddingBottom: 6
      }
    },
    /* Styles applied to the `input` element. */
    input: {
      padding: "27px 12px 10px",
      "&:-webkit-autofill": {
        WebkitBoxShadow: e.palette.type === "light" ? null : "0 0 0 100px #266798 inset",
        WebkitTextFillColor: e.palette.type === "light" ? null : "#fff",
        caretColor: e.palette.type === "light" ? null : "#fff",
        borderTopLeftRadius: "inherit",
        borderTopRightRadius: "inherit"
      }
    },
    /* Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense: {
      paddingTop: 23,
      paddingBottom: 6
    },
    /* Styles applied to the `input` if in `<FormControl hiddenLabel />`. */
    inputHiddenLabel: {
      paddingTop: 18,
      paddingBottom: 19,
      "&$inputMarginDense": {
        paddingTop: 10,
        paddingBottom: 11
      }
    },
    /* Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline: {
      padding: 0
    },
    /* Styles applied to the `input` element if `startAdornment` is provided. */
    inputAdornedStart: {
      paddingLeft: 0
    },
    /* Styles applied to the `input` element if `endAdornment` is provided. */
    inputAdornedEnd: {
      paddingRight: 0
    }
  };
}, ru = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.disableUnderline, n = e.classes, o = e.fullWidth, i = o === void 0 ? !1 : o, s = e.inputComponent, l = s === void 0 ? "input" : s, u = e.multiline, c = u === void 0 ? !1 : u, d = e.type, p = d === void 0 ? "text" : d, h = Ae(e, ["disableUnderline", "classes", "fullWidth", "inputComponent", "multiline", "type"]);
  return /* @__PURE__ */ b.createElement(Za, Y({
    classes: Y({}, n, {
      root: he(n.root, !r && n.underline),
      underline: null
    }),
    fullWidth: i,
    inputComponent: l,
    multiline: c,
    ref: a,
    type: p
  }, h));
});
ru.muiName = "Input";
const Zg = Qe(Jg, {
  name: "MuiFilledInput"
})(ru);
var Qg = {
  /* Styles applied to the root element. */
  root: {
    display: "inline-flex",
    flexDirection: "column",
    position: "relative",
    // Reset fieldset default style.
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0,
    verticalAlign: "top"
    // Fix alignment issue on Safari.
  },
  /* Styles applied to the root element if `margin="normal"`. */
  marginNormal: {
    marginTop: 16,
    marginBottom: 8
  },
  /* Styles applied to the root element if `margin="dense"`. */
  marginDense: {
    marginTop: 8,
    marginBottom: 4
  },
  /* Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: {
    width: "100%"
  }
}, e0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.color, s = i === void 0 ? "primary" : i, l = e.component, u = l === void 0 ? "div" : l, c = e.disabled, d = c === void 0 ? !1 : c, p = e.error, h = p === void 0 ? !1 : p, g = e.fullWidth, m = g === void 0 ? !1 : g, y = e.focused, w = e.hiddenLabel, k = w === void 0 ? !1 : w, I = e.margin, f = I === void 0 ? "none" : I, x = e.required, E = x === void 0 ? !1 : x, N = e.size, z = e.variant, O = z === void 0 ? "standard" : z, P = Ae(e, ["children", "classes", "className", "color", "component", "disabled", "error", "fullWidth", "focused", "hiddenLabel", "margin", "required", "size", "variant"]), M = b.useState(function() {
    var xe = !1;
    return r && b.Children.forEach(r, function(fe) {
      if (Ca(fe, ["Input", "Select"])) {
        var ve = Ca(fe, ["Select"]) ? fe.props.input : fe;
        ve && qg(ve.props) && (xe = !0);
      }
    }), xe;
  }), v = M[0], C = M[1], D = b.useState(function() {
    var xe = !1;
    return r && b.Children.forEach(r, function(fe) {
      Ca(fe, ["Input", "Select"]) && ns(fe.props, !0) && (xe = !0);
    }), xe;
  }), L = D[0], R = D[1], W = b.useState(!1), F = W[0], G = W[1], B = y !== void 0 ? y : F;
  d && B && G(!1);
  var Z, Q = b.useCallback(function() {
    R(!0);
  }, []), de = b.useCallback(function() {
    R(!1);
  }, []), ue = {
    adornedStart: v,
    setAdornedStart: C,
    color: s,
    disabled: d,
    error: h,
    filled: L,
    focused: B,
    fullWidth: m,
    hiddenLabel: k,
    margin: (N === "small" ? "dense" : void 0) || f,
    onBlur: function() {
      G(!1);
    },
    onEmpty: de,
    onFilled: Q,
    onFocus: function() {
      G(!0);
    },
    registerEffect: Z,
    required: E,
    variant: O
  };
  return /* @__PURE__ */ b.createElement(ea.Provider, {
    value: ue
  }, /* @__PURE__ */ b.createElement(u, Y({
    className: he(n.root, o, f !== "none" && n["margin".concat(pt(f))], m && n.fullWidth),
    ref: a
  }, P), r));
});
const t0 = Qe(Qg, {
  name: "MuiFormControl"
})(e0);
var r0 = function(e) {
  return {
    /* Styles applied to the root element. */
    root: Y({
      color: e.palette.text.secondary
    }, e.typography.caption, {
      textAlign: "left",
      marginTop: 3,
      margin: 0,
      "&$disabled": {
        color: e.palette.text.disabled
      },
      "&$error": {
        color: e.palette.error.main
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
}, n0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.component, s = i === void 0 ? "p" : i;
  e.disabled, e.error, e.filled, e.focused, e.margin, e.required, e.variant;
  var l = Ae(e, ["children", "classes", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"]), u = rs(), c = Ja({
    props: e,
    muiFormControl: u,
    states: ["variant", "margin", "disabled", "error", "filled", "focused", "required"]
  });
  return /* @__PURE__ */ b.createElement(s, Y({
    className: he(n.root, (c.variant === "filled" || c.variant === "outlined") && n.contained, o, c.disabled && n.disabled, c.error && n.error, c.filled && n.filled, c.focused && n.focused, c.required && n.required, c.margin === "dense" && n.marginDense),
    ref: a
  }, l), r === " " ? (
    // eslint-disable-next-line react/no-danger
    /* @__PURE__ */ b.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: "&#8203;"
      }
    })
  ) : r);
});
const bl = Qe(r0, {
  name: "MuiFormHelperText"
})(n0);
function ki(t) {
  return "scale(".concat(t, ", ").concat(Math.pow(t, 2), ")");
}
var a0 = {
  entering: {
    opacity: 1,
    transform: ki(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, as = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.disableStrictModeCompat, o = n === void 0 ? !1 : n, i = e.in, s = e.onEnter, l = e.onEntered, u = e.onEntering, c = e.onExit, d = e.onExited, p = e.onExiting, h = e.style, g = e.timeout, m = g === void 0 ? "auto" : g, y = e.TransitionComponent, w = y === void 0 ? or : y, k = Ae(e, ["children", "disableStrictModeCompat", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"]), I = b.useRef(), f = b.useRef(), x = En(), E = x.unstable_strictMode && !o, N = b.useRef(null), z = Ct(r.ref, a), O = Ct(E ? N : void 0, z), P = function(G) {
    return function(B, Z) {
      if (G) {
        var Q = E ? [N.current, B] : [B, Z], de = Cn(Q, 2), ue = de[0], xe = de[1];
        xe === void 0 ? G(ue) : G(ue, xe);
      }
    };
  }, M = P(u), v = P(function(F, G) {
    qm(F);
    var B = La({
      style: h,
      timeout: m
    }, {
      mode: "enter"
    }), Z = B.duration, Q = B.delay, de;
    m === "auto" ? (de = x.transitions.getAutoHeightDuration(F.clientHeight), f.current = de) : de = Z, F.style.transition = [x.transitions.create("opacity", {
      duration: de,
      delay: Q
    }), x.transitions.create("transform", {
      duration: de * 0.666,
      delay: Q
    })].join(","), s && s(F, G);
  }), C = P(l), D = P(p), L = P(function(F) {
    var G = La({
      style: h,
      timeout: m
    }, {
      mode: "exit"
    }), B = G.duration, Z = G.delay, Q;
    m === "auto" ? (Q = x.transitions.getAutoHeightDuration(F.clientHeight), f.current = Q) : Q = B, F.style.transition = [x.transitions.create("opacity", {
      duration: Q,
      delay: Z
    }), x.transitions.create("transform", {
      duration: Q * 0.666,
      delay: Z || Q * 0.333
    })].join(","), F.style.opacity = "0", F.style.transform = ki(0.75), c && c(F);
  }), R = P(d), W = function(G, B) {
    var Z = E ? G : B;
    m === "auto" && (I.current = setTimeout(Z, f.current || 0));
  };
  return b.useEffect(function() {
    return function() {
      clearTimeout(I.current);
    };
  }, []), /* @__PURE__ */ b.createElement(w, Y({
    appear: !0,
    in: i,
    nodeRef: E ? N : void 0,
    onEnter: v,
    onEntered: C,
    onEntering: M,
    onExit: L,
    onExited: R,
    onExiting: D,
    addEndListener: W,
    timeout: m === "auto" ? null : m
  }, k), function(F, G) {
    return /* @__PURE__ */ b.cloneElement(r, Y({
      style: Y({
        opacity: 0,
        transform: ki(0.75),
        visibility: F === "exited" && !i ? "hidden" : void 0
      }, a0[F], h, r.props.style),
      ref: O
    }, G));
  });
});
as.muiSupportAuto = !0;
var o0 = function(e) {
  var a = e.palette.type === "light", r = a ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  return {
    /* Styles applied to the root element. */
    root: {
      position: "relative"
    },
    /* Styles applied to the root element if the component is a descendant of `FormControl`. */
    formControl: {
      "label + &": {
        marginTop: 16
      }
    },
    /* Styles applied to the root element if the component is focused. */
    focused: {},
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if color secondary. */
    colorSecondary: {
      "&$underline:after": {
        borderBottomColor: e.palette.secondary.main
      }
    },
    /* Styles applied to the root element if `disableUnderline={false}`. */
    underline: {
      "&:after": {
        borderBottom: "2px solid ".concat(e.palette.primary.main),
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        position: "absolute",
        right: 0,
        transform: "scaleX(0)",
        transition: e.transitions.create("transform", {
          duration: e.transitions.duration.shorter,
          easing: e.transitions.easing.easeOut
        }),
        pointerEvents: "none"
        // Transparent to the hover style.
      },
      "&$focused:after": {
        transform: "scaleX(1)"
      },
      "&$error:after": {
        borderBottomColor: e.palette.error.main,
        transform: "scaleX(1)"
        // error is always underlined in red
      },
      "&:before": {
        borderBottom: "1px solid ".concat(r),
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
        content: '"\\00a0"',
        position: "absolute",
        right: 0,
        transition: e.transitions.create("border-bottom-color", {
          duration: e.transitions.duration.shorter
        }),
        pointerEvents: "none"
        // Transparent to the hover style.
      },
      "&:hover:not($disabled):before": {
        borderBottom: "2px solid ".concat(e.palette.text.primary),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          borderBottom: "1px solid ".concat(r)
        }
      },
      "&$disabled:before": {
        borderBottomStyle: "dotted"
      }
    },
    /* Pseudo-class applied to the root element if `error={true}`. */
    error: {},
    /* Styles applied to the `input` element if `margin="dense"`. */
    marginDense: {},
    /* Styles applied to the root element if `multiline={true}`. */
    multiline: {},
    /* Styles applied to the root element if `fullWidth={true}`. */
    fullWidth: {},
    /* Styles applied to the `input` element. */
    input: {},
    /* Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense: {},
    /* Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline: {},
    /* Styles applied to the `input` element if `type="search"`. */
    inputTypeSearch: {}
  };
}, nu = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.disableUnderline, n = e.classes, o = e.fullWidth, i = o === void 0 ? !1 : o, s = e.inputComponent, l = s === void 0 ? "input" : s, u = e.multiline, c = u === void 0 ? !1 : u, d = e.type, p = d === void 0 ? "text" : d, h = Ae(e, ["disableUnderline", "classes", "fullWidth", "inputComponent", "multiline", "type"]);
  return /* @__PURE__ */ b.createElement(Za, Y({
    classes: Y({}, n, {
      root: he(n.root, !r && n.underline),
      underline: null
    }),
    fullWidth: i,
    inputComponent: l,
    multiline: c,
    ref: a,
    type: p
  }, h));
});
nu.muiName = "Input";
const au = Qe(o0, {
  name: "MuiInput"
})(nu);
var i0 = {
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
}, s0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.component, s = i === void 0 ? "div" : i, l = e.disablePointerEvents, u = l === void 0 ? !1 : l, c = e.disableTypography, d = c === void 0 ? !1 : c, p = e.position, h = e.variant, g = Ae(e, ["children", "classes", "className", "component", "disablePointerEvents", "disableTypography", "position", "variant"]), m = Qc() || {}, y = h;
  return h && m.variant, m && !y && (y = m.variant), /* @__PURE__ */ b.createElement(ea.Provider, {
    value: null
  }, /* @__PURE__ */ b.createElement(s, Y({
    className: he(n.root, o, p === "end" ? n.positionEnd : n.positionStart, u && n.disablePointerEvents, m.hiddenLabel && n.hiddenLabel, y === "filled" && n.filled, m.margin === "dense" && n.marginDense),
    ref: a
  }, g), typeof r == "string" && !d ? /* @__PURE__ */ b.createElement(Kt, {
    color: "textSecondary"
  }, r) : r));
});
const l0 = Qe(i0, {
  name: "MuiInputAdornment"
})(s0);
var c0 = {
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
}, u0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.color, i = o === void 0 ? "primary" : o, s = e.component, l = s === void 0 ? "a" : s, u = e.onBlur, c = e.onFocus, d = e.TypographyClasses, p = e.underline, h = p === void 0 ? "hover" : p, g = e.variant, m = g === void 0 ? "inherit" : g, y = Ae(e, ["classes", "className", "color", "component", "onBlur", "onFocus", "TypographyClasses", "underline", "variant"]), w = Qi(), k = w.isFocusVisible, I = w.onBlurVisible, f = w.ref, x = b.useState(!1), E = x[0], N = x[1], z = Ct(a, f), O = function(v) {
    E && (I(), N(!1)), u && u(v);
  }, P = function(v) {
    k(v) && N(!0), c && c(v);
  };
  return /* @__PURE__ */ b.createElement(Kt, Y({
    className: he(r.root, r["underline".concat(pt(h))], n, E && r.focusVisible, l === "button" && r.button),
    classes: d,
    color: i,
    component: l,
    onBlur: O,
    onFocus: P,
    ref: z,
    variant: m
  }, y));
});
const d0 = Qe(c0, {
  name: "MuiLink"
})(u0);
var wa = b.createContext({}), f0 = {
  /* Styles applied to the root element. */
  root: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    position: "relative"
  },
  /* Styles applied to the root element if `disablePadding={false}`. */
  padding: {
    paddingTop: 8,
    paddingBottom: 8
  },
  /* Styles applied to the root element if dense. */
  dense: {},
  /* Styles applied to the root element if a `subheader` is provided. */
  subheader: {
    paddingTop: 0
  }
}, p0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.component, s = i === void 0 ? "ul" : i, l = e.dense, u = l === void 0 ? !1 : l, c = e.disablePadding, d = c === void 0 ? !1 : c, p = e.subheader, h = Ae(e, ["children", "classes", "className", "component", "dense", "disablePadding", "subheader"]), g = b.useMemo(function() {
    return {
      dense: u
    };
  }, [u]);
  return /* @__PURE__ */ b.createElement(wa.Provider, {
    value: g
  }, /* @__PURE__ */ b.createElement(s, Y({
    className: he(n.root, o, u && n.dense, !d && n.padding, p && n.subheader),
    ref: a
  }, h), p, r));
});
const h0 = Qe(f0, {
  name: "MuiList"
})(p0);
var m0 = function(e) {
  return {
    /* Styles applied to the (normally root) `component` element. May be wrapped by a `container`. */
    root: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      position: "relative",
      textDecoration: "none",
      width: "100%",
      boxSizing: "border-box",
      textAlign: "left",
      paddingTop: 8,
      paddingBottom: 8,
      "&$focusVisible": {
        backgroundColor: e.palette.action.selected
      },
      "&$selected, &$selected:hover": {
        backgroundColor: e.palette.action.selected
      },
      "&$disabled": {
        opacity: 0.5
      }
    },
    /* Styles applied to the `container` element if `children` includes `ListItemSecondaryAction`. */
    container: {
      position: "relative"
    },
    /* Pseudo-class applied to the `component`'s `focusVisibleClassName` prop if `button={true}`. */
    focusVisible: {},
    /* Styles applied to the `component` element if dense. */
    dense: {
      paddingTop: 4,
      paddingBottom: 4
    },
    /* Styles applied to the `component` element if `alignItems="flex-start"`. */
    alignItemsFlexStart: {
      alignItems: "flex-start"
    },
    /* Pseudo-class applied to the inner `component` element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the inner `component` element if `divider={true}`. */
    divider: {
      borderBottom: "1px solid ".concat(e.palette.divider),
      backgroundClip: "padding-box"
    },
    /* Styles applied to the inner `component` element if `disableGutters={false}`. */
    gutters: {
      paddingLeft: 16,
      paddingRight: 16
    },
    /* Styles applied to the inner `component` element if `button={true}`. */
    button: {
      transition: e.transitions.create("background-color", {
        duration: e.transitions.duration.shortest
      }),
      "&:hover": {
        textDecoration: "none",
        backgroundColor: e.palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    /* Styles applied to the `component` element if `children` includes `ListItemSecondaryAction`. */
    secondaryAction: {
      // Add some space to avoid collision as `ListItemSecondaryAction`
      // is absolutely positioned.
      paddingRight: 48
    },
    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {}
  };
}, g0 = typeof window > "u" ? b.useEffect : b.useLayoutEffect, v0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.alignItems, n = r === void 0 ? "center" : r, o = e.autoFocus, i = o === void 0 ? !1 : o, s = e.button, l = s === void 0 ? !1 : s, u = e.children, c = e.classes, d = e.className, p = e.component, h = e.ContainerComponent, g = h === void 0 ? "li" : h, m = e.ContainerProps;
  m = m === void 0 ? {} : m;
  var y = m.className, w = Ae(m, ["className"]), k = e.dense, I = k === void 0 ? !1 : k, f = e.disabled, x = f === void 0 ? !1 : f, E = e.disableGutters, N = E === void 0 ? !1 : E, z = e.divider, O = z === void 0 ? !1 : z, P = e.focusVisibleClassName, M = e.selected, v = M === void 0 ? !1 : M, C = Ae(e, ["alignItems", "autoFocus", "button", "children", "classes", "className", "component", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "divider", "focusVisibleClassName", "selected"]), D = b.useContext(wa), L = {
    dense: I || D.dense || !1,
    alignItems: n
  }, R = b.useRef(null);
  g0(function() {
    i && R.current && R.current.focus();
  }, [i]);
  var W = b.Children.toArray(u), F = W.length && Ca(W[W.length - 1], ["ListItemSecondaryAction"]), G = b.useCallback(function(de) {
    R.current = Xt.findDOMNode(de);
  }, []), B = Ct(G, a), Z = Y({
    className: he(c.root, d, L.dense && c.dense, !N && c.gutters, O && c.divider, x && c.disabled, l && c.button, n !== "center" && c.alignItemsFlexStart, F && c.secondaryAction, v && c.selected),
    disabled: x
  }, C), Q = p || "li";
  return l && (Z.component = p || "div", Z.focusVisibleClassName = he(c.focusVisible, P), Q = wr), F ? (Q = !Z.component && !p ? "div" : Q, g === "li" && (Q === "li" ? Q = "div" : Z.component === "li" && (Z.component = "div")), /* @__PURE__ */ b.createElement(wa.Provider, {
    value: L
  }, /* @__PURE__ */ b.createElement(g, Y({
    className: he(c.container, y),
    ref: B
  }, w), /* @__PURE__ */ b.createElement(Q, Z, W), W.pop()))) : /* @__PURE__ */ b.createElement(wa.Provider, {
    value: L
  }, /* @__PURE__ */ b.createElement(Q, Y({
    ref: B
  }, Z), W));
});
const b0 = Qe(m0, {
  name: "MuiListItem"
})(v0);
function yl(t, e) {
  var a = 0;
  return typeof e == "number" ? a = e : e === "center" ? a = t.height / 2 : e === "bottom" && (a = t.height), a;
}
function xl(t, e) {
  var a = 0;
  return typeof e == "number" ? a = e : e === "center" ? a = t.width / 2 : e === "right" && (a = t.width), a;
}
function Sl(t) {
  return [t.horizontal, t.vertical].map(function(e) {
    return typeof e == "number" ? "".concat(e, "px") : e;
  }).join(" ");
}
function y0(t, e) {
  for (var a = e, r = 0; a && a !== t; )
    a = a.parentElement, r += a.scrollTop;
  return r;
}
function Yo(t) {
  return typeof t == "function" ? t() : t;
}
var x0 = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the `Paper` component. */
  paper: {
    position: "absolute",
    overflowY: "auto",
    overflowX: "hidden",
    // So we see the popover when it's empty.
    // It's most likely on issue on userland.
    minWidth: 16,
    minHeight: 16,
    maxWidth: "calc(100% - 32px)",
    maxHeight: "calc(100% - 32px)",
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0
  }
}, S0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.action, n = e.anchorEl, o = e.anchorOrigin, i = o === void 0 ? {
    vertical: "top",
    horizontal: "left"
  } : o, s = e.anchorPosition, l = e.anchorReference, u = l === void 0 ? "anchorEl" : l, c = e.children, d = e.classes, p = e.className, h = e.container, g = e.elevation, m = g === void 0 ? 8 : g, y = e.getContentAnchorEl, w = e.marginThreshold, k = w === void 0 ? 16 : w, I = e.onEnter, f = e.onEntered, x = e.onEntering, E = e.onExit, N = e.onExited, z = e.onExiting, O = e.open, P = e.PaperProps, M = P === void 0 ? {} : P, v = e.transformOrigin, C = v === void 0 ? {
    vertical: "top",
    horizontal: "left"
  } : v, D = e.TransitionComponent, L = D === void 0 ? as : D, R = e.transitionDuration, W = R === void 0 ? "auto" : R, F = e.TransitionProps, G = F === void 0 ? {} : F, B = Ae(e, ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "classes", "className", "container", "elevation", "getContentAnchorEl", "marginThreshold", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "open", "PaperProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps"]), Z = b.useRef(), Q = b.useCallback(function(ie) {
    if (u === "anchorPosition")
      return s;
    var pe = Yo(n), we = pe && pe.nodeType === 1 ? pe : cr(Z.current).body, Ce = we.getBoundingClientRect(), Ye = ie === 0 ? i.vertical : "center";
    return {
      top: Ce.top + yl(Ce, Ye),
      left: Ce.left + xl(Ce, i.horizontal)
    };
  }, [n, i.horizontal, i.vertical, s, u]), de = b.useCallback(function(ie) {
    var pe = 0;
    if (y && u === "anchorEl") {
      var we = y(ie);
      if (we && ie.contains(we)) {
        var Ce = y0(ie, we);
        pe = we.offsetTop + we.clientHeight / 2 - Ce || 0;
      }
    }
    return pe;
  }, [i.vertical, u, y]), ue = b.useCallback(function(ie) {
    var pe = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return {
      vertical: yl(ie, C.vertical) + pe,
      horizontal: xl(ie, C.horizontal)
    };
  }, [C.horizontal, C.vertical]), xe = b.useCallback(function(ie) {
    var pe = de(ie), we = {
      width: ie.offsetWidth,
      height: ie.offsetHeight
    }, Ce = ue(we, pe);
    if (u === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Sl(Ce)
      };
    var Ye = Q(pe), Oe = Ye.top - Ce.vertical, Fe = Ye.left - Ce.horizontal, qe = Oe + we.height, Xe = Fe + we.width, nt = Ji(Yo(n)), et = nt.innerHeight - k, Ve = nt.innerWidth - k;
    if (Oe < k) {
      var Le = Oe - k;
      Oe -= Le, Ce.vertical += Le;
    } else if (qe > et) {
      var ze = qe - et;
      Oe -= ze, Ce.vertical += ze;
    }
    if (Fe < k) {
      var ee = Fe - k;
      Fe -= ee, Ce.horizontal += ee;
    } else if (Xe > Ve) {
      var H = Xe - Ve;
      Fe -= H, Ce.horizontal += H;
    }
    return {
      top: "".concat(Math.round(Oe), "px"),
      left: "".concat(Math.round(Fe), "px"),
      transformOrigin: Sl(Ce)
    };
  }, [n, u, Q, de, ue, k]), fe = b.useCallback(function() {
    var ie = Z.current;
    if (ie) {
      var pe = xe(ie);
      pe.top !== null && (ie.style.top = pe.top), pe.left !== null && (ie.style.left = pe.left), ie.style.transformOrigin = pe.transformOrigin;
    }
  }, [xe]), ve = function(pe, we) {
    x && x(pe, we), fe();
  }, ge = b.useCallback(function(ie) {
    Z.current = Xt.findDOMNode(ie);
  }, []);
  b.useEffect(function() {
    O && fe();
  }), b.useImperativeHandle(r, function() {
    return O ? {
      updatePosition: function() {
        fe();
      }
    } : null;
  }, [O, fe]), b.useEffect(function() {
    if (O) {
      var ie = Un(function() {
        fe();
      });
      return window.addEventListener("resize", ie), function() {
        ie.clear(), window.removeEventListener("resize", ie);
      };
    }
  }, [O, fe]);
  var Se = W;
  W === "auto" && !L.muiSupportAuto && (Se = void 0);
  var Ee = h || (n ? cr(Yo(n)).body : void 0);
  return /* @__PURE__ */ b.createElement(Bg, Y({
    container: Ee,
    open: O,
    ref: a,
    BackdropProps: {
      invisible: !0
    },
    className: he(d.root, p)
  }, B), /* @__PURE__ */ b.createElement(L, Y({
    appear: !0,
    in: O,
    onEnter: I,
    onEntered: f,
    onExit: E,
    onExited: N,
    onExiting: z,
    timeout: Se
  }, G, {
    onEntering: Kn(ve, G.onEntering)
  }), /* @__PURE__ */ b.createElement(Xc, Y({
    elevation: m,
    ref: ge
  }, M, {
    className: he(d.paper, M.className)
  }), c)));
});
const C0 = Qe(x0, {
  name: "MuiPopover"
})(S0);
function Xo(t, e, a) {
  return t === e ? t.firstChild : e && e.nextElementSibling ? e.nextElementSibling : a ? null : t.firstChild;
}
function Cl(t, e, a) {
  return t === e ? a ? t.firstChild : t.lastChild : e && e.previousElementSibling ? e.previousElementSibling : a ? null : t.lastChild;
}
function ou(t, e) {
  if (e === void 0)
    return !0;
  var a = t.innerText;
  return a === void 0 && (a = t.textContent), a = a.trim().toLowerCase(), a.length === 0 ? !1 : e.repeating ? a[0] === e.keys[0] : a.indexOf(e.keys.join("")) === 0;
}
function Pn(t, e, a, r, n, o) {
  for (var i = !1, s = n(t, e, e ? a : !1); s; ) {
    if (s === t.firstChild) {
      if (i)
        return;
      i = !0;
    }
    var l = r ? !1 : s.disabled || s.getAttribute("aria-disabled") === "true";
    if (!s.hasAttribute("tabindex") || !ou(s, o) || l)
      s = n(t, s, a);
    else {
      s.focus();
      return;
    }
  }
}
var w0 = typeof window > "u" ? b.useEffect : b.useLayoutEffect, E0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.actions, n = e.autoFocus, o = n === void 0 ? !1 : n, i = e.autoFocusItem, s = i === void 0 ? !1 : i, l = e.children, u = e.className, c = e.disabledItemsFocusable, d = c === void 0 ? !1 : c, p = e.disableListWrap, h = p === void 0 ? !1 : p, g = e.onKeyDown, m = e.variant, y = m === void 0 ? "selectedMenu" : m, w = Ae(e, ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"]), k = b.useRef(null), I = b.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  w0(function() {
    o && k.current.focus();
  }, [o]), b.useImperativeHandle(r, function() {
    return {
      adjustStyleForScrollbar: function(P, M) {
        var v = !k.current.style.width;
        if (P.clientHeight < k.current.clientHeight && v) {
          var C = "".concat(tu(), "px");
          k.current.style[M.direction === "rtl" ? "paddingLeft" : "paddingRight"] = C, k.current.style.width = "calc(100% + ".concat(C, ")");
        }
        return k.current;
      }
    };
  }, []);
  var f = function(P) {
    var M = k.current, v = P.key, C = cr(M).activeElement;
    if (v === "ArrowDown")
      P.preventDefault(), Pn(M, C, h, d, Xo);
    else if (v === "ArrowUp")
      P.preventDefault(), Pn(M, C, h, d, Cl);
    else if (v === "Home")
      P.preventDefault(), Pn(M, null, h, d, Xo);
    else if (v === "End")
      P.preventDefault(), Pn(M, null, h, d, Cl);
    else if (v.length === 1) {
      var D = I.current, L = v.toLowerCase(), R = performance.now();
      D.keys.length > 0 && (R - D.lastTime > 500 ? (D.keys = [], D.repeating = !0, D.previousKeyMatched = !0) : D.repeating && L !== D.keys[0] && (D.repeating = !1)), D.lastTime = R, D.keys.push(L);
      var W = C && !D.repeating && ou(C, D);
      D.previousKeyMatched && (W || Pn(M, C, !1, d, Xo, D)) ? P.preventDefault() : D.previousKeyMatched = !1;
    }
    g && g(P);
  }, x = b.useCallback(function(O) {
    k.current = Xt.findDOMNode(O);
  }, []), E = Ct(x, a), N = -1;
  b.Children.forEach(l, function(O, P) {
    /* @__PURE__ */ b.isValidElement(O) && (O.props.disabled || (y === "selectedMenu" && O.props.selected || N === -1) && (N = P));
  });
  var z = b.Children.map(l, function(O, P) {
    if (P === N) {
      var M = {};
      return s && (M.autoFocus = !0), O.props.tabIndex === void 0 && y === "selectedMenu" && (M.tabIndex = 0), /* @__PURE__ */ b.cloneElement(O, M);
    }
    return O;
  });
  return /* @__PURE__ */ b.createElement(h0, Y({
    role: "menu",
    ref: E,
    className: u,
    onKeyDown: f,
    tabIndex: o ? 0 : -1
  }, w), z);
}), wl = {
  vertical: "top",
  horizontal: "right"
}, El = {
  vertical: "top",
  horizontal: "left"
}, k0 = {
  /* Styles applied to the `Paper` component. */
  paper: {
    // specZ: The maximum height of a simple menu should be one or more rows less than the view
    // height. This ensures a tapable area outside of the simple menu with which to dismiss
    // the menu.
    maxHeight: "calc(100% - 96px)",
    // Add iOS momentum scrolling.
    WebkitOverflowScrolling: "touch"
  },
  /* Styles applied to the `List` component via `MenuList`. */
  list: {
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0
  }
}, $0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.autoFocus, n = r === void 0 ? !0 : r, o = e.children, i = e.classes, s = e.disableAutoFocusItem, l = s === void 0 ? !1 : s, u = e.MenuListProps, c = u === void 0 ? {} : u, d = e.onClose, p = e.onEntering, h = e.open, g = e.PaperProps, m = g === void 0 ? {} : g, y = e.PopoverClasses, w = e.transitionDuration, k = w === void 0 ? "auto" : w, I = e.TransitionProps;
  I = I === void 0 ? {} : I;
  var f = I.onEntering, x = Ae(I, ["onEntering"]), E = e.variant, N = E === void 0 ? "selectedMenu" : E, z = Ae(e, ["autoFocus", "children", "classes", "disableAutoFocusItem", "MenuListProps", "onClose", "onEntering", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant"]), O = En(), P = n && !l && h, M = b.useRef(null), v = b.useRef(null), C = function() {
    return v.current;
  }, D = function(G, B) {
    M.current && M.current.adjustStyleForScrollbar(G, O), p && p(G, B), f && f(G, B);
  }, L = function(G) {
    G.key === "Tab" && (G.preventDefault(), d && d(G, "tabKeyDown"));
  }, R = -1;
  b.Children.map(o, function(F, G) {
    /* @__PURE__ */ b.isValidElement(F) && (F.props.disabled || (N !== "menu" && F.props.selected || R === -1) && (R = G));
  });
  var W = b.Children.map(o, function(F, G) {
    return G === R ? /* @__PURE__ */ b.cloneElement(F, {
      ref: function(Z) {
        v.current = Xt.findDOMNode(Z), zr(F.ref, Z);
      }
    }) : F;
  });
  return /* @__PURE__ */ b.createElement(C0, Y({
    getContentAnchorEl: C,
    classes: y,
    onClose: d,
    TransitionProps: Y({
      onEntering: D
    }, x),
    anchorOrigin: O.direction === "rtl" ? wl : El,
    transformOrigin: O.direction === "rtl" ? wl : El,
    PaperProps: Y({}, m, {
      classes: Y({}, m.classes, {
        root: i.paper
      })
    }),
    open: h,
    ref: a,
    transitionDuration: k
  }, z), /* @__PURE__ */ b.createElement(E0, Y({
    onKeyDown: L,
    actions: M,
    autoFocus: n && (R === -1 || l),
    autoFocusItem: P,
    variant: N
  }, c, {
    className: he(i.list, c.className)
  }), W));
});
const R0 = Qe(k0, {
  name: "MuiMenu"
})($0);
var T0 = function(e) {
  return {
    /* Styles applied to the root element. */
    root: Y({}, e.typography.body1, Ot({
      minHeight: 48,
      paddingTop: 6,
      paddingBottom: 6,
      boxSizing: "border-box",
      width: "auto",
      overflow: "hidden",
      whiteSpace: "nowrap"
    }, e.breakpoints.up("sm"), {
      minHeight: "auto"
    })),
    // TODO v5: remove
    /* Styles applied to the root element if `disableGutters={false}`. */
    gutters: {},
    /* Styles applied to the root element if `selected={true}`. */
    selected: {},
    /* Styles applied to the root element if dense. */
    dense: Y({}, e.typography.body2, {
      minHeight: "auto"
    })
  };
}, O0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.component, i = o === void 0 ? "li" : o, s = e.disableGutters, l = s === void 0 ? !1 : s, u = e.ListItemClasses, c = e.role, d = c === void 0 ? "menuitem" : c, p = e.selected, h = e.tabIndex, g = Ae(e, ["classes", "className", "component", "disableGutters", "ListItemClasses", "role", "selected", "tabIndex"]), m;
  return e.disabled || (m = h !== void 0 ? h : -1), /* @__PURE__ */ b.createElement(b0, Y({
    button: !0,
    role: d,
    tabIndex: m,
    component: i,
    selected: p,
    disableGutters: l,
    classes: Y({
      dense: r.dense
    }, u),
    className: he(r.root, n, p && r.selected, !l && r.gutters),
    ref: a
  }, g));
});
const kl = Qe(T0, {
  name: "MuiMenuItem"
})(O0);
var iu = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.disabled, i = e.IconComponent, s = e.inputRef, l = e.variant, u = l === void 0 ? "standard" : l, c = Ae(e, ["classes", "className", "disabled", "IconComponent", "inputRef", "variant"]);
  return /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("select", Y({
    className: he(
      r.root,
      // TODO v5: merge root and select
      r.select,
      r[u],
      n,
      o && r.disabled
    ),
    disabled: o,
    ref: s || a
  }, c)), e.multiple ? null : /* @__PURE__ */ b.createElement(i, {
    className: he(r.icon, r["icon".concat(pt(u))], o && r.disabled)
  }));
});
const su = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M7 10l5 5 5-5z"
}));
var lu = function(e) {
  return {
    /* Styles applied to the select component `root` class. */
    root: {},
    /* Styles applied to the select component `select` class. */
    select: {
      "-moz-appearance": "none",
      // Reset
      "-webkit-appearance": "none",
      // Reset
      // When interacting quickly, the text can end up selected.
      // Native select can't be selected either.
      userSelect: "none",
      borderRadius: 0,
      // Reset
      minWidth: 16,
      // So it doesn't collapse.
      cursor: "pointer",
      "&:focus": {
        // Show that it's not an text input
        backgroundColor: e.palette.type === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)",
        borderRadius: 0
        // Reset Chrome style
      },
      // Remove IE 11 arrow
      "&::-ms-expand": {
        display: "none"
      },
      "&$disabled": {
        cursor: "default"
      },
      "&[multiple]": {
        height: "auto"
      },
      "&:not([multiple]) option, &:not([multiple]) optgroup": {
        backgroundColor: e.palette.background.paper
      },
      "&&": {
        paddingRight: 24
      }
    },
    /* Styles applied to the select component if `variant="filled"`. */
    filled: {
      "&&": {
        paddingRight: 32
      }
    },
    /* Styles applied to the select component if `variant="outlined"`. */
    outlined: {
      borderRadius: e.shape.borderRadius,
      "&&": {
        paddingRight: 32
      }
    },
    /* Styles applied to the select component `selectMenu` class. */
    selectMenu: {
      height: "auto",
      // Resets for multpile select with chips
      minHeight: "1.1876em",
      // Required for select\text-field height consistency
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden"
    },
    /* Pseudo-class applied to the select component `disabled` class. */
    disabled: {},
    /* Styles applied to the icon component. */
    icon: {
      // We use a position absolute over a flexbox in order to forward the pointer events
      // to the input and to support wrapping tags..
      position: "absolute",
      right: 0,
      top: "calc(50% - 12px)",
      // Center vertically
      pointerEvents: "none",
      // Don't block pointer events on the select under the icon.
      color: e.palette.action.active,
      "&$disabled": {
        color: e.palette.action.disabled
      }
    },
    /* Styles applied to the icon component if the popup is open. */
    iconOpen: {
      transform: "rotate(180deg)"
    },
    /* Styles applied to the icon component if `variant="filled"`. */
    iconFilled: {
      right: 7
    },
    /* Styles applied to the icon component if `variant="outlined"`. */
    iconOutlined: {
      right: 7
    },
    /* Styles applied to the underlying native input component. */
    nativeInput: {
      bottom: 0,
      left: 0,
      position: "absolute",
      opacity: 0,
      pointerEvents: "none",
      width: "100%"
    }
  };
}, _0 = /* @__PURE__ */ b.createElement(au, null), cu = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.IconComponent, i = o === void 0 ? su : o, s = e.input, l = s === void 0 ? _0 : s, u = e.inputProps;
  e.variant;
  var c = Ae(e, ["children", "classes", "IconComponent", "input", "inputProps", "variant"]), d = rs(), p = Ja({
    props: e,
    muiFormControl: d,
    states: ["variant"]
  });
  return /* @__PURE__ */ b.cloneElement(l, Y({
    // Most of the logic is implemented in `NativeSelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: iu,
    inputProps: Y({
      children: r,
      classes: n,
      IconComponent: i,
      variant: p.variant,
      type: void 0
    }, u, l ? l.props.inputProps : {}),
    ref: a
  }, c));
});
cu.muiName = "Select";
Qe(lu, {
  name: "MuiNativeSelect"
})(cu);
var P0 = function(e) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: "absolute",
      bottom: 0,
      right: 0,
      top: -5,
      left: 0,
      margin: 0,
      padding: "0 8px",
      pointerEvents: "none",
      borderRadius: "inherit",
      borderStyle: "solid",
      borderWidth: 1,
      overflow: "hidden"
    },
    /* Styles applied to the legend element when `labelWidth` is provided. */
    legend: {
      textAlign: "left",
      padding: 0,
      lineHeight: "11px",
      // sync with `height` in `legend` styles
      transition: e.transitions.create("width", {
        duration: 150,
        easing: e.transitions.easing.easeOut
      })
    },
    /* Styles applied to the legend element. */
    legendLabelled: {
      display: "block",
      width: "auto",
      textAlign: "left",
      padding: 0,
      height: 11,
      // sync with `lineHeight` in `legend` styles
      fontSize: "0.75em",
      visibility: "hidden",
      maxWidth: 0.01,
      transition: e.transitions.create("max-width", {
        duration: 50,
        easing: e.transitions.easing.easeOut
      }),
      "& > span": {
        paddingLeft: 5,
        paddingRight: 5,
        display: "inline-block"
      }
    },
    /* Styles applied to the legend element is notched. */
    legendNotched: {
      maxWidth: 1e3,
      transition: e.transitions.create("max-width", {
        duration: 100,
        easing: e.transitions.easing.easeOut,
        delay: 50
      })
    }
  };
}, A0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  e.children;
  var r = e.classes, n = e.className, o = e.label, i = e.labelWidth, s = e.notched, l = e.style, u = Ae(e, ["children", "classes", "className", "label", "labelWidth", "notched", "style"]), c = En(), d = c.direction === "rtl" ? "right" : "left";
  if (o !== void 0)
    return /* @__PURE__ */ b.createElement("fieldset", Y({
      "aria-hidden": !0,
      className: he(r.root, n),
      ref: a,
      style: l
    }, u), /* @__PURE__ */ b.createElement("legend", {
      className: he(r.legendLabelled, s && r.legendNotched)
    }, o ? /* @__PURE__ */ b.createElement("span", null, o) : /* @__PURE__ */ b.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: "&#8203;"
      }
    })));
  var p = i > 0 ? i * 0.75 + 8 : 0.01;
  return /* @__PURE__ */ b.createElement("fieldset", Y({
    "aria-hidden": !0,
    style: Y(Ot({}, "padding".concat(pt(d)), 8), l),
    className: he(r.root, n),
    ref: a
  }, u), /* @__PURE__ */ b.createElement("legend", {
    className: r.legend,
    style: {
      // IE 11: fieldset with legend does not render
      // a border radius. This maintains consistency
      // by always having a legend rendered
      width: s ? p : 0.01
    }
  }, /* @__PURE__ */ b.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: "&#8203;"
    }
  })));
});
const I0 = Qe(P0, {
  name: "PrivateNotchedOutline"
})(A0);
var M0 = function(e) {
  var a = e.palette.type === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    /* Styles applied to the root element. */
    root: {
      position: "relative",
      borderRadius: e.shape.borderRadius,
      "&:hover $notchedOutline": {
        borderColor: e.palette.text.primary
      },
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        "&:hover $notchedOutline": {
          borderColor: a
        }
      },
      "&$focused $notchedOutline": {
        borderColor: e.palette.primary.main,
        borderWidth: 2
      },
      "&$error $notchedOutline": {
        borderColor: e.palette.error.main
      },
      "&$disabled $notchedOutline": {
        borderColor: e.palette.action.disabled
      }
    },
    /* Styles applied to the root element if the color is secondary. */
    colorSecondary: {
      "&$focused $notchedOutline": {
        borderColor: e.palette.secondary.main
      }
    },
    /* Styles applied to the root element if the component is focused. */
    focused: {},
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `startAdornment` is provided. */
    adornedStart: {
      paddingLeft: 14
    },
    /* Styles applied to the root element if `endAdornment` is provided. */
    adornedEnd: {
      paddingRight: 14
    },
    /* Pseudo-class applied to the root element if `error={true}`. */
    error: {},
    /* Styles applied to the `input` element if `margin="dense"`. */
    marginDense: {},
    /* Styles applied to the root element if `multiline={true}`. */
    multiline: {
      padding: "18.5px 14px",
      "&$marginDense": {
        paddingTop: 10.5,
        paddingBottom: 10.5
      }
    },
    /* Styles applied to the `NotchedOutline` element. */
    notchedOutline: {
      borderColor: a
    },
    /* Styles applied to the `input` element. */
    input: {
      padding: "18.5px 14px",
      "&:-webkit-autofill": {
        WebkitBoxShadow: e.palette.type === "light" ? null : "0 0 0 100px #266798 inset",
        WebkitTextFillColor: e.palette.type === "light" ? null : "#fff",
        caretColor: e.palette.type === "light" ? null : "#fff",
        borderRadius: "inherit"
      }
    },
    /* Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense: {
      paddingTop: 10.5,
      paddingBottom: 10.5
    },
    /* Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline: {
      padding: 0
    },
    /* Styles applied to the `input` element if `startAdornment` is provided. */
    inputAdornedStart: {
      paddingLeft: 0
    },
    /* Styles applied to the `input` element if `endAdornment` is provided. */
    inputAdornedEnd: {
      paddingRight: 0
    }
  };
}, uu = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.fullWidth, o = n === void 0 ? !1 : n, i = e.inputComponent, s = i === void 0 ? "input" : i, l = e.label, u = e.labelWidth, c = u === void 0 ? 0 : u, d = e.multiline, p = d === void 0 ? !1 : d, h = e.notched, g = e.type, m = g === void 0 ? "text" : g, y = Ae(e, ["classes", "fullWidth", "inputComponent", "label", "labelWidth", "multiline", "notched", "type"]);
  return /* @__PURE__ */ b.createElement(Za, Y({
    renderSuffix: function(k) {
      return /* @__PURE__ */ b.createElement(I0, {
        className: r.notchedOutline,
        label: l,
        labelWidth: c,
        notched: typeof h < "u" ? h : !!(k.startAdornment || k.filled || k.focused)
      });
    },
    classes: Y({}, r, {
      root: he(r.root, r.underline),
      notchedOutline: null
    }),
    fullWidth: o,
    inputComponent: s,
    multiline: p,
    ref: a,
    type: m
  }, y));
});
uu.muiName = "Input";
const j0 = Qe(M0, {
  name: "MuiOutlinedInput"
})(uu);
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
var ta = typeof window < "u" && typeof document < "u" && typeof navigator < "u", D0 = (function() {
  for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1)
    if (ta && navigator.userAgent.indexOf(t[e]) >= 0)
      return 1;
  return 0;
})();
function N0(t) {
  var e = !1;
  return function() {
    e || (e = !0, window.Promise.resolve().then(function() {
      e = !1, t();
    }));
  };
}
function L0(t) {
  var e = !1;
  return function() {
    e || (e = !0, setTimeout(function() {
      e = !1, t();
    }, D0));
  };
}
var F0 = ta && window.Promise, B0 = F0 ? N0 : L0;
function du(t) {
  var e = {};
  return t && e.toString.call(t) === "[object Function]";
}
function Vr(t, e) {
  if (t.nodeType !== 1)
    return [];
  var a = t.ownerDocument.defaultView, r = a.getComputedStyle(t, null);
  return e ? r[e] : r;
}
function os(t) {
  return t.nodeName === "HTML" ? t : t.parentNode || t.host;
}
function ra(t) {
  if (!t)
    return document.body;
  switch (t.nodeName) {
    case "HTML":
    case "BODY":
      return t.ownerDocument.body;
    case "#document":
      return t.body;
  }
  var e = Vr(t), a = e.overflow, r = e.overflowX, n = e.overflowY;
  return /(auto|scroll|overlay)/.test(a + n + r) ? t : ra(os(t));
}
function fu(t) {
  return t && t.referenceNode ? t.referenceNode : t;
}
var $l = ta && !!(window.MSInputMethodContext && document.documentMode), Rl = ta && /MSIE 10/.test(navigator.userAgent);
function kn(t) {
  return t === 11 ? $l : t === 10 ? Rl : $l || Rl;
}
function gn(t) {
  if (!t)
    return document.documentElement;
  for (var e = kn(10) ? document.body : null, a = t.offsetParent || null; a === e && t.nextElementSibling; )
    a = (t = t.nextElementSibling).offsetParent;
  var r = a && a.nodeName;
  return !r || r === "BODY" || r === "HTML" ? t ? t.ownerDocument.documentElement : document.documentElement : ["TH", "TD", "TABLE"].indexOf(a.nodeName) !== -1 && Vr(a, "position") === "static" ? gn(a) : a;
}
function z0(t) {
  var e = t.nodeName;
  return e === "BODY" ? !1 : e === "HTML" || gn(t.firstElementChild) === t;
}
function $i(t) {
  return t.parentNode !== null ? $i(t.parentNode) : t;
}
function Fa(t, e) {
  if (!t || !t.nodeType || !e || !e.nodeType)
    return document.documentElement;
  var a = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING, r = a ? t : e, n = a ? e : t, o = document.createRange();
  o.setStart(r, 0), o.setEnd(n, 0);
  var i = o.commonAncestorContainer;
  if (t !== i && e !== i || r.contains(n))
    return z0(i) ? i : gn(i);
  var s = $i(t);
  return s.host ? Fa(s.host, e) : Fa(t, $i(e).host);
}
function vn(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top", a = e === "top" ? "scrollTop" : "scrollLeft", r = t.nodeName;
  if (r === "BODY" || r === "HTML") {
    var n = t.ownerDocument.documentElement, o = t.ownerDocument.scrollingElement || n;
    return o[a];
  }
  return t[a];
}
function W0(t, e) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = vn(e, "top"), n = vn(e, "left"), o = a ? -1 : 1;
  return t.top += r * o, t.bottom += r * o, t.left += n * o, t.right += n * o, t;
}
function Tl(t, e) {
  var a = e === "x" ? "Left" : "Top", r = a === "Left" ? "Right" : "Bottom";
  return parseFloat(t["border" + a + "Width"]) + parseFloat(t["border" + r + "Width"]);
}
function Ol(t, e, a, r) {
  return Math.max(e["offset" + t], e["scroll" + t], a["client" + t], a["offset" + t], a["scroll" + t], kn(10) ? parseInt(a["offset" + t]) + parseInt(r["margin" + (t === "Height" ? "Top" : "Left")]) + parseInt(r["margin" + (t === "Height" ? "Bottom" : "Right")]) : 0);
}
function pu(t) {
  var e = t.body, a = t.documentElement, r = kn(10) && getComputedStyle(a);
  return {
    height: Ol("Height", e, a, r),
    width: Ol("Width", e, a, r)
  };
}
var V0 = function(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}, H0 = /* @__PURE__ */ (function() {
  function t(e, a) {
    for (var r = 0; r < a.length; r++) {
      var n = a[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }
  return function(e, a, r) {
    return a && t(e.prototype, a), r && t(e, r), e;
  };
})(), bn = function(t, e, a) {
  return e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}, Ht = Object.assign || function(t) {
  for (var e = 1; e < arguments.length; e++) {
    var a = arguments[e];
    for (var r in a)
      Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]);
  }
  return t;
};
function Er(t) {
  return Ht({}, t, {
    right: t.left + t.width,
    bottom: t.top + t.height
  });
}
function Ri(t) {
  var e = {};
  try {
    if (kn(10)) {
      e = t.getBoundingClientRect();
      var a = vn(t, "top"), r = vn(t, "left");
      e.top += a, e.left += r, e.bottom += a, e.right += r;
    } else
      e = t.getBoundingClientRect();
  } catch {
  }
  var n = {
    left: e.left,
    top: e.top,
    width: e.right - e.left,
    height: e.bottom - e.top
  }, o = t.nodeName === "HTML" ? pu(t.ownerDocument) : {}, i = o.width || t.clientWidth || n.width, s = o.height || t.clientHeight || n.height, l = t.offsetWidth - i, u = t.offsetHeight - s;
  if (l || u) {
    var c = Vr(t);
    l -= Tl(c, "x"), u -= Tl(c, "y"), n.width -= l, n.height -= u;
  }
  return Er(n);
}
function is(t, e) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = kn(10), n = e.nodeName === "HTML", o = Ri(t), i = Ri(e), s = ra(t), l = Vr(e), u = parseFloat(l.borderTopWidth), c = parseFloat(l.borderLeftWidth);
  a && n && (i.top = Math.max(i.top, 0), i.left = Math.max(i.left, 0));
  var d = Er({
    top: o.top - i.top - u,
    left: o.left - i.left - c,
    width: o.width,
    height: o.height
  });
  if (d.marginTop = 0, d.marginLeft = 0, !r && n) {
    var p = parseFloat(l.marginTop), h = parseFloat(l.marginLeft);
    d.top -= u - p, d.bottom -= u - p, d.left -= c - h, d.right -= c - h, d.marginTop = p, d.marginLeft = h;
  }
  return (r && !a ? e.contains(s) : e === s && s.nodeName !== "BODY") && (d = W0(d, e)), d;
}
function K0(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, a = t.ownerDocument.documentElement, r = is(t, a), n = Math.max(a.clientWidth, window.innerWidth || 0), o = Math.max(a.clientHeight, window.innerHeight || 0), i = e ? 0 : vn(a), s = e ? 0 : vn(a, "left"), l = {
    top: i - r.top + r.marginTop,
    left: s - r.left + r.marginLeft,
    width: n,
    height: o
  };
  return Er(l);
}
function hu(t) {
  var e = t.nodeName;
  if (e === "BODY" || e === "HTML")
    return !1;
  if (Vr(t, "position") === "fixed")
    return !0;
  var a = os(t);
  return a ? hu(a) : !1;
}
function mu(t) {
  if (!t || !t.parentElement || kn())
    return document.documentElement;
  for (var e = t.parentElement; e && Vr(e, "transform") === "none"; )
    e = e.parentElement;
  return e || document.documentElement;
}
function ss(t, e, a, r) {
  var n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, o = { top: 0, left: 0 }, i = n ? mu(t) : Fa(t, fu(e));
  if (r === "viewport")
    o = K0(i, n);
  else {
    var s = void 0;
    r === "scrollParent" ? (s = ra(os(e)), s.nodeName === "BODY" && (s = t.ownerDocument.documentElement)) : r === "window" ? s = t.ownerDocument.documentElement : s = r;
    var l = is(s, i, n);
    if (s.nodeName === "HTML" && !hu(i)) {
      var u = pu(t.ownerDocument), c = u.height, d = u.width;
      o.top += l.top - l.marginTop, o.bottom = c + l.top, o.left += l.left - l.marginLeft, o.right = d + l.left;
    } else
      o = l;
  }
  a = a || 0;
  var p = typeof a == "number";
  return o.left += p ? a : a.left || 0, o.top += p ? a : a.top || 0, o.right -= p ? a : a.right || 0, o.bottom -= p ? a : a.bottom || 0, o;
}
function U0(t) {
  var e = t.width, a = t.height;
  return e * a;
}
function gu(t, e, a, r, n) {
  var o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
  if (t.indexOf("auto") === -1)
    return t;
  var i = ss(a, r, o, n), s = {
    top: {
      width: i.width,
      height: e.top - i.top
    },
    right: {
      width: i.right - e.right,
      height: i.height
    },
    bottom: {
      width: i.width,
      height: i.bottom - e.bottom
    },
    left: {
      width: e.left - i.left,
      height: i.height
    }
  }, l = Object.keys(s).map(function(p) {
    return Ht({
      key: p
    }, s[p], {
      area: U0(s[p])
    });
  }).sort(function(p, h) {
    return h.area - p.area;
  }), u = l.filter(function(p) {
    var h = p.width, g = p.height;
    return h >= a.clientWidth && g >= a.clientHeight;
  }), c = u.length > 0 ? u[0].key : l[0].key, d = t.split("-")[1];
  return c + (d ? "-" + d : "");
}
function vu(t, e, a) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, n = r ? mu(e) : Fa(e, fu(a));
  return is(a, n, r);
}
function bu(t) {
  var e = t.ownerDocument.defaultView, a = e.getComputedStyle(t), r = parseFloat(a.marginTop || 0) + parseFloat(a.marginBottom || 0), n = parseFloat(a.marginLeft || 0) + parseFloat(a.marginRight || 0), o = {
    width: t.offsetWidth + n,
    height: t.offsetHeight + r
  };
  return o;
}
function Ba(t) {
  var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
  return t.replace(/left|right|bottom|top/g, function(a) {
    return e[a];
  });
}
function yu(t, e, a) {
  a = a.split("-")[0];
  var r = bu(t), n = {
    width: r.width,
    height: r.height
  }, o = ["right", "left"].indexOf(a) !== -1, i = o ? "top" : "left", s = o ? "left" : "top", l = o ? "height" : "width", u = o ? "width" : "height";
  return n[i] = e[i] + e[l] / 2 - r[l] / 2, a === s ? n[s] = e[s] - r[u] : n[s] = e[Ba(s)], n;
}
function na(t, e) {
  return Array.prototype.find ? t.find(e) : t.filter(e)[0];
}
function q0(t, e, a) {
  if (Array.prototype.findIndex)
    return t.findIndex(function(n) {
      return n[e] === a;
    });
  var r = na(t, function(n) {
    return n[e] === a;
  });
  return t.indexOf(r);
}
function xu(t, e, a) {
  var r = a === void 0 ? t : t.slice(0, q0(t, "name", a));
  return r.forEach(function(n) {
    n.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
    var o = n.function || n.fn;
    n.enabled && du(o) && (e.offsets.popper = Er(e.offsets.popper), e.offsets.reference = Er(e.offsets.reference), e = o(e, n));
  }), e;
}
function G0() {
  if (!this.state.isDestroyed) {
    var t = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: !1,
      offsets: {}
    };
    t.offsets.reference = vu(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = gu(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = yu(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = xu(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t));
  }
}
function Su(t, e) {
  return t.some(function(a) {
    var r = a.name, n = a.enabled;
    return n && r === e;
  });
}
function ls(t) {
  for (var e = [!1, "ms", "Webkit", "Moz", "O"], a = t.charAt(0).toUpperCase() + t.slice(1), r = 0; r < e.length; r++) {
    var n = e[r], o = n ? "" + n + a : t;
    if (typeof document.body.style[o] < "u")
      return o;
  }
  return null;
}
function Y0() {
  return this.state.isDestroyed = !0, Su(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[ls("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
}
function Cu(t) {
  var e = t.ownerDocument;
  return e ? e.defaultView : window;
}
function wu(t, e, a, r) {
  var n = t.nodeName === "BODY", o = n ? t.ownerDocument.defaultView : t;
  o.addEventListener(e, a, { passive: !0 }), n || wu(ra(o.parentNode), e, a, r), r.push(o);
}
function X0(t, e, a, r) {
  a.updateBound = r, Cu(t).addEventListener("resize", a.updateBound, { passive: !0 });
  var n = ra(t);
  return wu(n, "scroll", a.updateBound, a.scrollParents), a.scrollElement = n, a.eventsEnabled = !0, a;
}
function J0() {
  this.state.eventsEnabled || (this.state = X0(this.reference, this.options, this.state, this.scheduleUpdate));
}
function Z0(t, e) {
  return Cu(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(a) {
    a.removeEventListener("scroll", e.updateBound);
  }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e;
}
function Q0() {
  this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = Z0(this.reference, this.state));
}
function cs(t) {
  return t !== "" && !isNaN(parseFloat(t)) && isFinite(t);
}
function Ti(t, e) {
  Object.keys(e).forEach(function(a) {
    var r = "";
    ["width", "height", "top", "right", "bottom", "left"].indexOf(a) !== -1 && cs(e[a]) && (r = "px"), t.style[a] = e[a] + r;
  });
}
function ev(t, e) {
  Object.keys(e).forEach(function(a) {
    var r = e[a];
    r !== !1 ? t.setAttribute(a, e[a]) : t.removeAttribute(a);
  });
}
function tv(t) {
  return Ti(t.instance.popper, t.styles), ev(t.instance.popper, t.attributes), t.arrowElement && Object.keys(t.arrowStyles).length && Ti(t.arrowElement, t.arrowStyles), t;
}
function rv(t, e, a, r, n) {
  var o = vu(n, e, t, a.positionFixed), i = gu(a.placement, o, e, t, a.modifiers.flip.boundariesElement, a.modifiers.flip.padding);
  return e.setAttribute("x-placement", i), Ti(e, { position: a.positionFixed ? "fixed" : "absolute" }), a;
}
function nv(t, e) {
  var a = t.offsets, r = a.popper, n = a.reference, o = Math.round, i = Math.floor, s = function(w) {
    return w;
  }, l = o(n.width), u = o(r.width), c = ["left", "right"].indexOf(t.placement) !== -1, d = t.placement.indexOf("-") !== -1, p = l % 2 === u % 2, h = l % 2 === 1 && u % 2 === 1, g = e ? c || d || p ? o : i : s, m = e ? o : s;
  return {
    left: g(h && !d && e ? r.left - 1 : r.left),
    top: m(r.top),
    bottom: m(r.bottom),
    right: g(r.right)
  };
}
var av = ta && /Firefox/i.test(navigator.userAgent);
function ov(t, e) {
  var a = e.x, r = e.y, n = t.offsets.popper, o = na(t.instance.modifiers, function(I) {
    return I.name === "applyStyle";
  }).gpuAcceleration;
  o !== void 0 && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
  var i = o !== void 0 ? o : e.gpuAcceleration, s = gn(t.instance.popper), l = Ri(s), u = {
    position: n.position
  }, c = nv(t, window.devicePixelRatio < 2 || !av), d = a === "bottom" ? "top" : "bottom", p = r === "right" ? "left" : "right", h = ls("transform"), g = void 0, m = void 0;
  if (d === "bottom" ? s.nodeName === "HTML" ? m = -s.clientHeight + c.bottom : m = -l.height + c.bottom : m = c.top, p === "right" ? s.nodeName === "HTML" ? g = -s.clientWidth + c.right : g = -l.width + c.right : g = c.left, i && h)
    u[h] = "translate3d(" + g + "px, " + m + "px, 0)", u[d] = 0, u[p] = 0, u.willChange = "transform";
  else {
    var y = d === "bottom" ? -1 : 1, w = p === "right" ? -1 : 1;
    u[d] = m * y, u[p] = g * w, u.willChange = d + ", " + p;
  }
  var k = {
    "x-placement": t.placement
  };
  return t.attributes = Ht({}, k, t.attributes), t.styles = Ht({}, u, t.styles), t.arrowStyles = Ht({}, t.offsets.arrow, t.arrowStyles), t;
}
function Eu(t, e, a) {
  var r = na(t, function(s) {
    var l = s.name;
    return l === e;
  }), n = !!r && t.some(function(s) {
    return s.name === a && s.enabled && s.order < r.order;
  });
  if (!n) {
    var o = "`" + e + "`", i = "`" + a + "`";
    console.warn(i + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!");
  }
  return n;
}
function iv(t, e) {
  var a;
  if (!Eu(t.instance.modifiers, "arrow", "keepTogether"))
    return t;
  var r = e.element;
  if (typeof r == "string") {
    if (r = t.instance.popper.querySelector(r), !r)
      return t;
  } else if (!t.instance.popper.contains(r))
    return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
  var n = t.placement.split("-")[0], o = t.offsets, i = o.popper, s = o.reference, l = ["left", "right"].indexOf(n) !== -1, u = l ? "height" : "width", c = l ? "Top" : "Left", d = c.toLowerCase(), p = l ? "left" : "top", h = l ? "bottom" : "right", g = bu(r)[u];
  s[h] - g < i[d] && (t.offsets.popper[d] -= i[d] - (s[h] - g)), s[d] + g > i[h] && (t.offsets.popper[d] += s[d] + g - i[h]), t.offsets.popper = Er(t.offsets.popper);
  var m = s[d] + s[u] / 2 - g / 2, y = Vr(t.instance.popper), w = parseFloat(y["margin" + c]), k = parseFloat(y["border" + c + "Width"]), I = m - t.offsets.popper[d] - w - k;
  return I = Math.max(Math.min(i[u] - g, I), 0), t.arrowElement = r, t.offsets.arrow = (a = {}, bn(a, d, Math.round(I)), bn(a, p, ""), a), t;
}
function sv(t) {
  return t === "end" ? "start" : t === "start" ? "end" : t;
}
var ku = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], Jo = ku.slice(3);
function _l(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, a = Jo.indexOf(t), r = Jo.slice(a + 1).concat(Jo.slice(0, a));
  return e ? r.reverse() : r;
}
var Zo = {
  FLIP: "flip",
  CLOCKWISE: "clockwise",
  COUNTERCLOCKWISE: "counterclockwise"
};
function lv(t, e) {
  if (Su(t.instance.modifiers, "inner") || t.flipped && t.placement === t.originalPlacement)
    return t;
  var a = ss(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed), r = t.placement.split("-")[0], n = Ba(r), o = t.placement.split("-")[1] || "", i = [];
  switch (e.behavior) {
    case Zo.FLIP:
      i = [r, n];
      break;
    case Zo.CLOCKWISE:
      i = _l(r);
      break;
    case Zo.COUNTERCLOCKWISE:
      i = _l(r, !0);
      break;
    default:
      i = e.behavior;
  }
  return i.forEach(function(s, l) {
    if (r !== s || i.length === l + 1)
      return t;
    r = t.placement.split("-")[0], n = Ba(r);
    var u = t.offsets.popper, c = t.offsets.reference, d = Math.floor, p = r === "left" && d(u.right) > d(c.left) || r === "right" && d(u.left) < d(c.right) || r === "top" && d(u.bottom) > d(c.top) || r === "bottom" && d(u.top) < d(c.bottom), h = d(u.left) < d(a.left), g = d(u.right) > d(a.right), m = d(u.top) < d(a.top), y = d(u.bottom) > d(a.bottom), w = r === "left" && h || r === "right" && g || r === "top" && m || r === "bottom" && y, k = ["top", "bottom"].indexOf(r) !== -1, I = !!e.flipVariations && (k && o === "start" && h || k && o === "end" && g || !k && o === "start" && m || !k && o === "end" && y), f = !!e.flipVariationsByContent && (k && o === "start" && g || k && o === "end" && h || !k && o === "start" && y || !k && o === "end" && m), x = I || f;
    (p || w || x) && (t.flipped = !0, (p || w) && (r = i[l + 1]), x && (o = sv(o)), t.placement = r + (o ? "-" + o : ""), t.offsets.popper = Ht({}, t.offsets.popper, yu(t.instance.popper, t.offsets.reference, t.placement)), t = xu(t.instance.modifiers, t, "flip"));
  }), t;
}
function cv(t) {
  var e = t.offsets, a = e.popper, r = e.reference, n = t.placement.split("-")[0], o = Math.floor, i = ["top", "bottom"].indexOf(n) !== -1, s = i ? "right" : "bottom", l = i ? "left" : "top", u = i ? "width" : "height";
  return a[s] < o(r[l]) && (t.offsets.popper[l] = o(r[l]) - a[u]), a[l] > o(r[s]) && (t.offsets.popper[l] = o(r[s])), t;
}
function uv(t, e, a, r) {
  var n = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), o = +n[1], i = n[2];
  if (!o)
    return t;
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
    var l = Er(s);
    return l[e] / 100 * o;
  } else if (i === "vh" || i === "vw") {
    var u = void 0;
    return i === "vh" ? u = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : u = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), u / 100 * o;
  } else
    return o;
}
function dv(t, e, a, r) {
  var n = [0, 0], o = ["right", "left"].indexOf(r) !== -1, i = t.split(/(\+|\-)/).map(function(c) {
    return c.trim();
  }), s = i.indexOf(na(i, function(c) {
    return c.search(/,|\s/) !== -1;
  }));
  i[s] && i[s].indexOf(",") === -1 && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
  var l = /\s*,\s*|\s+/, u = s !== -1 ? [i.slice(0, s).concat([i[s].split(l)[0]]), [i[s].split(l)[1]].concat(i.slice(s + 1))] : [i];
  return u = u.map(function(c, d) {
    var p = (d === 1 ? !o : o) ? "height" : "width", h = !1;
    return c.reduce(function(g, m) {
      return g[g.length - 1] === "" && ["+", "-"].indexOf(m) !== -1 ? (g[g.length - 1] = m, h = !0, g) : h ? (g[g.length - 1] += m, h = !1, g) : g.concat(m);
    }, []).map(function(g) {
      return uv(g, p, e, a);
    });
  }), u.forEach(function(c, d) {
    c.forEach(function(p, h) {
      cs(p) && (n[d] += p * (c[h - 1] === "-" ? -1 : 1));
    });
  }), n;
}
function fv(t, e) {
  var a = e.offset, r = t.placement, n = t.offsets, o = n.popper, i = n.reference, s = r.split("-")[0], l = void 0;
  return cs(+a) ? l = [+a, 0] : l = dv(a, o, i, s), s === "left" ? (o.top += l[0], o.left -= l[1]) : s === "right" ? (o.top += l[0], o.left += l[1]) : s === "top" ? (o.left += l[0], o.top -= l[1]) : s === "bottom" && (o.left += l[0], o.top += l[1]), t.popper = o, t;
}
function pv(t, e) {
  var a = e.boundariesElement || gn(t.instance.popper);
  t.instance.reference === a && (a = gn(a));
  var r = ls("transform"), n = t.instance.popper.style, o = n.top, i = n.left, s = n[r];
  n.top = "", n.left = "", n[r] = "";
  var l = ss(t.instance.popper, t.instance.reference, e.padding, a, t.positionFixed);
  n.top = o, n.left = i, n[r] = s, e.boundaries = l;
  var u = e.priority, c = t.offsets.popper, d = {
    primary: function(h) {
      var g = c[h];
      return c[h] < l[h] && !e.escapeWithReference && (g = Math.max(c[h], l[h])), bn({}, h, g);
    },
    secondary: function(h) {
      var g = h === "right" ? "left" : "top", m = c[g];
      return c[h] > l[h] && !e.escapeWithReference && (m = Math.min(c[g], l[h] - (h === "right" ? c.width : c.height))), bn({}, g, m);
    }
  };
  return u.forEach(function(p) {
    var h = ["left", "top"].indexOf(p) !== -1 ? "primary" : "secondary";
    c = Ht({}, c, d[h](p));
  }), t.offsets.popper = c, t;
}
function hv(t) {
  var e = t.placement, a = e.split("-")[0], r = e.split("-")[1];
  if (r) {
    var n = t.offsets, o = n.reference, i = n.popper, s = ["bottom", "top"].indexOf(a) !== -1, l = s ? "left" : "top", u = s ? "width" : "height", c = {
      start: bn({}, l, o[l]),
      end: bn({}, l, o[l] + o[u] - i[u])
    };
    t.offsets.popper = Ht({}, i, c[r]);
  }
  return t;
}
function mv(t) {
  if (!Eu(t.instance.modifiers, "hide", "preventOverflow"))
    return t;
  var e = t.offsets.reference, a = na(t.instance.modifiers, function(r) {
    return r.name === "preventOverflow";
  }).boundaries;
  if (e.bottom < a.top || e.left > a.right || e.top > a.bottom || e.right < a.left) {
    if (t.hide === !0)
      return t;
    t.hide = !0, t.attributes["x-out-of-boundaries"] = "";
  } else {
    if (t.hide === !1)
      return t;
    t.hide = !1, t.attributes["x-out-of-boundaries"] = !1;
  }
  return t;
}
function gv(t) {
  var e = t.placement, a = e.split("-")[0], r = t.offsets, n = r.popper, o = r.reference, i = ["left", "right"].indexOf(a) !== -1, s = ["top", "left"].indexOf(a) === -1;
  return n[i ? "left" : "top"] = o[a] - (s ? n[i ? "width" : "height"] : 0), t.placement = Ba(e), t.offsets.popper = Er(n), t;
}
var vv = {
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
    fn: hv
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
    fn: fv,
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
    fn: pv,
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
    fn: cv
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
    fn: iv,
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
    fn: lv,
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
    fn: gv
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
    fn: mv
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
    fn: ov,
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
    fn: tv,
    /** @prop {Function} */
    onLoad: rv,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: void 0
  }
}, bv = {
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
  modifiers: vv
}, Qa = (function() {
  function t(e, a) {
    var r = this, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    V0(this, t), this.scheduleUpdate = function() {
      return requestAnimationFrame(r.update);
    }, this.update = B0(this.update.bind(this)), this.options = Ht({}, t.Defaults, n), this.state = {
      isDestroyed: !1,
      isCreated: !1,
      scrollParents: []
    }, this.reference = e && e.jquery ? e[0] : e, this.popper = a && a.jquery ? a[0] : a, this.options.modifiers = {}, Object.keys(Ht({}, t.Defaults.modifiers, n.modifiers)).forEach(function(i) {
      r.options.modifiers[i] = Ht({}, t.Defaults.modifiers[i] || {}, n.modifiers ? n.modifiers[i] : {});
    }), this.modifiers = Object.keys(this.options.modifiers).map(function(i) {
      return Ht({
        name: i
      }, r.options.modifiers[i]);
    }).sort(function(i, s) {
      return i.order - s.order;
    }), this.modifiers.forEach(function(i) {
      i.enabled && du(i.onLoad) && i.onLoad(r.reference, r.popper, r.options, i, r.state);
    }), this.update();
    var o = this.options.eventsEnabled;
    o && this.enableEventListeners(), this.state.eventsEnabled = o;
  }
  return H0(t, [{
    key: "update",
    value: function() {
      return G0.call(this);
    }
  }, {
    key: "destroy",
    value: function() {
      return Y0.call(this);
    }
  }, {
    key: "enableEventListeners",
    value: function() {
      return J0.call(this);
    }
  }, {
    key: "disableEventListeners",
    value: function() {
      return Q0.call(this);
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
  }]), t;
})();
Qa.Utils = (typeof window < "u" ? window : global).PopperUtils;
Qa.placements = ku;
Qa.Defaults = bv;
function yv(t, e) {
  var a = e && e.direction || "ltr";
  if (a === "ltr")
    return t;
  switch (t) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return t;
  }
}
function Pl(t) {
  return typeof t == "function" ? t() : t;
}
var xv = typeof window < "u" ? b.useLayoutEffect : b.useEffect, Sv = {}, Cv = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.anchorEl, n = e.children, o = e.container, i = e.disablePortal, s = i === void 0 ? !1 : i, l = e.keepMounted, u = l === void 0 ? !1 : l, c = e.modifiers, d = e.open, p = e.placement, h = p === void 0 ? "bottom" : p, g = e.popperOptions, m = g === void 0 ? Sv : g, y = e.popperRef, w = e.style, k = e.transition, I = k === void 0 ? !1 : k, f = Ae(e, ["anchorEl", "children", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"]), x = b.useRef(null), E = Ct(x, a), N = b.useRef(null), z = Ct(N, y), O = b.useRef(z);
  xv(function() {
    O.current = z;
  }, [z]), b.useImperativeHandle(y, function() {
    return N.current;
  }, []);
  var P = b.useState(!0), M = P[0], v = P[1], C = Qn(), D = yv(h, C), L = b.useState(D), R = L[0], W = L[1];
  b.useEffect(function() {
    N.current && N.current.update();
  });
  var F = b.useCallback(function() {
    if (!(!x.current || !r || !d)) {
      N.current && (N.current.destroy(), O.current(null));
      var ue = function(ve) {
        W(ve.placement);
      };
      Pl(r);
      var xe = new Qa(Pl(r), x.current, Y({
        placement: D
      }, m, {
        modifiers: Y({}, s ? {} : {
          // It's using scrollParent by default, we can use the viewport when using a portal.
          preventOverflow: {
            boundariesElement: "window"
          }
        }, c, m.modifiers),
        // We could have been using a custom modifier like react-popper is doing.
        // But it seems this is the best public API for this use case.
        onCreate: Kn(ue, m.onCreate),
        onUpdate: Kn(ue, m.onUpdate)
      }));
      O.current(xe);
    }
  }, [r, s, c, d, D, m]), G = b.useCallback(function(ue) {
    zr(E, ue), F();
  }, [E, F]), B = function() {
    v(!1);
  }, Z = function() {
    N.current && (N.current.destroy(), O.current(null));
  }, Q = function() {
    v(!0), Z();
  };
  if (b.useEffect(function() {
    return function() {
      Z();
    };
  }, []), b.useEffect(function() {
    !d && !I && Z();
  }, [d, I]), !u && !d && (!I || M))
    return null;
  var de = {
    placement: R
  };
  return I && (de.TransitionProps = {
    in: d,
    onEnter: B,
    onExited: Q
  }), /* @__PURE__ */ b.createElement(eu, {
    disablePortal: s,
    container: o
  }, /* @__PURE__ */ b.createElement("div", Y({
    ref: G,
    role: "tooltip"
  }, f, {
    style: Y({
      // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
      position: "fixed",
      // Fix Popper.js display issue
      top: 0,
      left: 0,
      display: !d && u && !I ? "none" : null
    }, w)
  }), typeof n == "function" ? n(de) : n));
});
function Al(t, e) {
  return xr(e) === "object" && e !== null ? t === e : String(t) === String(e);
}
function wv(t) {
  return t == null || typeof t == "string" && !t.trim();
}
var Ev = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e["aria-label"], n = e.autoFocus, o = e.autoWidth, i = e.children, s = e.classes, l = e.className, u = e.defaultValue, c = e.disabled, d = e.displayEmpty, p = e.IconComponent, h = e.inputRef, g = e.labelId, m = e.MenuProps, y = m === void 0 ? {} : m, w = e.multiple, k = e.name, I = e.onBlur, f = e.onChange, x = e.onClose, E = e.onFocus, N = e.onOpen, z = e.open, O = e.readOnly, P = e.renderValue, M = e.SelectDisplayProps, v = M === void 0 ? {} : M, C = e.tabIndex;
  e.type;
  var D = e.value, L = e.variant, R = L === void 0 ? "standard" : L, W = Ae(e, ["aria-label", "autoFocus", "autoWidth", "children", "classes", "className", "defaultValue", "disabled", "displayEmpty", "IconComponent", "inputRef", "labelId", "MenuProps", "multiple", "name", "onBlur", "onChange", "onClose", "onFocus", "onOpen", "open", "readOnly", "renderValue", "SelectDisplayProps", "tabIndex", "type", "value", "variant"]), F = Zi({
    controlled: D,
    default: u,
    name: "Select"
  }), G = Cn(F, 2), B = G[0], Z = G[1], Q = b.useRef(null), de = b.useState(null), ue = de[0], xe = de[1], fe = b.useRef(z != null), ve = fe.current, ge = b.useState(), Se = ge[0], Ee = ge[1], ie = b.useState(!1), pe = ie[0], we = ie[1], Ce = Ct(a, h);
  b.useImperativeHandle(Ce, function() {
    return {
      focus: function() {
        ue.focus();
      },
      node: Q.current,
      value: B
    };
  }, [ue, B]), b.useEffect(function() {
    n && ue && ue.focus();
  }, [n, ue]), b.useEffect(function() {
    if (ue) {
      var ye = cr(ue).getElementById(g);
      if (ye) {
        var me = function() {
          getSelection().isCollapsed && ue.focus();
        };
        return ye.addEventListener("click", me), function() {
          ye.removeEventListener("click", me);
        };
      }
    }
  }, [g, ue]);
  var Ye = function(me, De) {
    me ? N && N(De) : x && x(De), ve || (Ee(o ? null : ue.clientWidth), we(me));
  }, Oe = function(me) {
    me.button === 0 && (me.preventDefault(), ue.focus(), Ye(!0, me));
  }, Fe = function(me) {
    Ye(!1, me);
  }, qe = b.Children.toArray(i), Xe = function(me) {
    var De = qe.map(function(Te) {
      return Te.props.value;
    }).indexOf(me.target.value);
    if (De !== -1) {
      var Be = qe[De];
      Z(Be.props.value), f && f(me, Be);
    }
  }, nt = function(me) {
    return function(De) {
      w || Ye(!1, De);
      var Be;
      if (w) {
        Be = Array.isArray(B) ? B.slice() : [];
        var Te = B.indexOf(me.props.value);
        Te === -1 ? Be.push(me.props.value) : Be.splice(Te, 1);
      } else
        Be = me.props.value;
      me.props.onClick && me.props.onClick(De), B !== Be && (Z(Be), f && (De.persist(), Object.defineProperty(De, "target", {
        writable: !0,
        value: {
          value: Be,
          name: k
        }
      }), f(De, me)));
    };
  }, et = function(me) {
    if (!O) {
      var De = [
        " ",
        "ArrowUp",
        "ArrowDown",
        // The native select doesn't respond to enter on MacOS, but it's recommended by
        // https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
        "Enter"
      ];
      De.indexOf(me.key) !== -1 && (me.preventDefault(), Ye(!0, me));
    }
  }, Ve = ue !== null && (ve ? z : pe), Le = function(me) {
    !Ve && I && (me.persist(), Object.defineProperty(me, "target", {
      writable: !0,
      value: {
        value: B,
        name: k
      }
    }), I(me));
  };
  delete W["aria-invalid"];
  var ze, ee, H = [], K = !1;
  (ns({
    value: B
  }) || d) && (P ? ze = P(B) : K = !0);
  var te = qe.map(function(ye) {
    if (!/* @__PURE__ */ b.isValidElement(ye))
      return null;
    var me;
    if (w) {
      if (!Array.isArray(B))
        throw new Error(mn(2));
      me = B.some(function(De) {
        return Al(De, ye.props.value);
      }), me && K && H.push(ye.props.children);
    } else
      me = Al(B, ye.props.value), me && K && (ee = ye.props.children);
    return /* @__PURE__ */ b.cloneElement(ye, {
      "aria-selected": me ? "true" : void 0,
      onClick: nt(ye),
      onKeyUp: function(Be) {
        Be.key === " " && Be.preventDefault(), ye.props.onKeyUp && ye.props.onKeyUp(Be);
      },
      role: "option",
      selected: me,
      value: void 0,
      // The value is most likely not a valid HTML attribute.
      "data-value": ye.props.value
      // Instead, we provide it as a data attribute.
    });
  });
  K && (ze = w ? H.join(", ") : ee);
  var oe = Se;
  !o && ve && ue && (oe = ue.clientWidth);
  var be;
  typeof C < "u" ? be = C : be = c ? null : 0;
  var Ie = v.id || (k ? "mui-component-select-".concat(k) : void 0);
  return /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("div", Y({
    className: he(
      s.root,
      // TODO v5: merge root and select
      s.select,
      s.selectMenu,
      s[R],
      l,
      c && s.disabled
    ),
    ref: xe,
    tabIndex: be,
    role: "button",
    "aria-disabled": c ? "true" : void 0,
    "aria-expanded": Ve ? "true" : void 0,
    "aria-haspopup": "listbox",
    "aria-label": r,
    "aria-labelledby": [g, Ie].filter(Boolean).join(" ") || void 0,
    onKeyDown: et,
    onMouseDown: c || O ? null : Oe,
    onBlur: Le,
    onFocus: E
  }, v, {
    // The id is required for proper a11y
    id: Ie
  }), wv(ze) ? (
    // eslint-disable-next-line react/no-danger
    /* @__PURE__ */ b.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: "&#8203;"
      }
    })
  ) : ze), /* @__PURE__ */ b.createElement("input", Y({
    value: Array.isArray(B) ? B.join(",") : B,
    name: k,
    ref: Q,
    "aria-hidden": !0,
    onChange: Xe,
    tabIndex: -1,
    className: s.nativeInput,
    autoFocus: n
  }, W)), /* @__PURE__ */ b.createElement(p, {
    className: he(s.icon, s["icon".concat(pt(R))], Ve && s.iconOpen, c && s.disabled)
  }), /* @__PURE__ */ b.createElement(R0, Y({
    id: "menu-".concat(k || ""),
    anchorEl: ue,
    open: Ve,
    onClose: Fe
  }, y, {
    MenuListProps: Y({
      "aria-labelledby": g,
      role: "listbox",
      disableListWrap: !0
    }, y.MenuListProps),
    PaperProps: Y({}, y.PaperProps, {
      style: Y({
        minWidth: oe
      }, y.PaperProps != null ? y.PaperProps.style : null)
    })
  }), te));
}), kv = lu, $v = /* @__PURE__ */ b.createElement(au, null), Rv = /* @__PURE__ */ b.createElement(Zg, null), $u = /* @__PURE__ */ b.forwardRef(function t(e, a) {
  var r = e.autoWidth, n = r === void 0 ? !1 : r, o = e.children, i = e.classes, s = e.displayEmpty, l = s === void 0 ? !1 : s, u = e.IconComponent, c = u === void 0 ? su : u, d = e.id, p = e.input, h = e.inputProps, g = e.label, m = e.labelId, y = e.labelWidth, w = y === void 0 ? 0 : y, k = e.MenuProps, I = e.multiple, f = I === void 0 ? !1 : I, x = e.native, E = x === void 0 ? !1 : x, N = e.onClose, z = e.onOpen, O = e.open, P = e.renderValue, M = e.SelectDisplayProps, v = e.variant, C = v === void 0 ? "standard" : v, D = Ae(e, ["autoWidth", "children", "classes", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "labelWidth", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"]), L = E ? iu : Ev, R = rs(), W = Ja({
    props: e,
    muiFormControl: R,
    states: ["variant"]
  }), F = W.variant || C, G = p || {
    standard: $v,
    outlined: /* @__PURE__ */ b.createElement(j0, {
      label: g,
      labelWidth: w
    }),
    filled: Rv
  }[F];
  return /* @__PURE__ */ b.cloneElement(G, Y({
    // Most of the logic is implemented in `SelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: L,
    inputProps: Y({
      children: o,
      IconComponent: c,
      variant: F,
      type: void 0,
      // We render a select. We can ignore the type provided by the `Input`.
      multiple: f
    }, E ? {
      id: d
    } : {
      autoWidth: n,
      displayEmpty: l,
      labelId: m,
      MenuProps: k,
      onClose: N,
      onOpen: z,
      open: O,
      renderValue: P,
      SelectDisplayProps: Y({
        id: d
      }, M)
    }, h, {
      classes: h ? Gi({
        baseClasses: i,
        newClasses: h.classes,
        Component: t
      }) : i
    }, p ? p.props.inputProps : {}),
    ref: a
  }, D));
});
$u.muiName = "Select";
const Tv = Qe(kv, {
  name: "MuiSelect"
})($u);
var Ov = function(e) {
  var a;
  return {
    /* Styles applied to the root element. */
    root: Y({}, e.typography.button, (a = {
      maxWidth: 264,
      minWidth: 72,
      position: "relative",
      boxSizing: "border-box",
      minHeight: 48,
      flexShrink: 0,
      padding: "6px 12px"
    }, Ot(a, e.breakpoints.up("sm"), {
      padding: "6px 24px"
    }), Ot(a, "overflow", "hidden"), Ot(a, "whiteSpace", "normal"), Ot(a, "textAlign", "center"), Ot(a, e.breakpoints.up("sm"), {
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
      color: e.palette.text.secondary,
      "&$selected": {
        color: e.palette.primary.main
      },
      "&$disabled": {
        color: e.palette.text.disabled
      }
    },
    /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="secondary"`. */
    textColorSecondary: {
      color: e.palette.text.secondary,
      "&$selected": {
        color: e.palette.secondary.main
      },
      "&$disabled": {
        color: e.palette.text.disabled
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
      fontSize: e.typography.pxToRem(12),
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
}, _v = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.disabled, i = o === void 0 ? !1 : o, s = e.disableFocusRipple, l = s === void 0 ? !1 : s, u = e.fullWidth, c = e.icon, d = e.indicator, p = e.label, h = e.onChange, g = e.onClick, m = e.onFocus, y = e.selected, w = e.selectionFollowsFocus, k = e.textColor, I = k === void 0 ? "inherit" : k, f = e.value, x = e.wrapped, E = x === void 0 ? !1 : x, N = Ae(e, ["classes", "className", "disabled", "disableFocusRipple", "fullWidth", "icon", "indicator", "label", "onChange", "onClick", "onFocus", "selected", "selectionFollowsFocus", "textColor", "value", "wrapped"]), z = function(M) {
    h && h(M, f), g && g(M);
  }, O = function(M) {
    w && !y && h && h(M, f), m && m(M);
  };
  return /* @__PURE__ */ b.createElement(wr, Y({
    focusRipple: !l,
    className: he(r.root, r["textColor".concat(pt(I))], n, i && r.disabled, y && r.selected, p && c && r.labelIcon, u && r.fullWidth, E && r.wrapped),
    ref: a,
    role: "tab",
    "aria-selected": y,
    disabled: i,
    onClick: z,
    onFocus: O,
    tabIndex: y ? 0 : -1
  }, N), /* @__PURE__ */ b.createElement("span", {
    className: r.wrapper
  }, c, p), d);
});
const Pv = Qe(Ov, {
  name: "MuiTab"
})(_v), Av = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
})), Iv = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}));
var nn;
function Ru() {
  if (nn)
    return nn;
  var t = document.createElement("div"), e = document.createElement("div");
  return e.style.width = "10px", e.style.height = "1px", t.appendChild(e), t.dir = "rtl", t.style.fontSize = "14px", t.style.width = "4px", t.style.height = "1px", t.style.position = "absolute", t.style.top = "-1000px", t.style.overflow = "scroll", document.body.appendChild(t), nn = "reverse", t.scrollLeft > 0 ? nn = "default" : (t.scrollLeft = 1, t.scrollLeft === 0 && (nn = "negative")), document.body.removeChild(t), nn;
}
function Il(t, e) {
  var a = t.scrollLeft;
  if (e !== "rtl")
    return a;
  var r = Ru();
  switch (r) {
    case "negative":
      return t.scrollWidth - t.clientWidth + a;
    case "reverse":
      return t.scrollWidth - t.clientWidth - a;
    default:
      return a;
  }
}
function Mv(t) {
  return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
}
function jv(t, e, a) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : function() {
  }, o = r.ease, i = o === void 0 ? Mv : o, s = r.duration, l = s === void 0 ? 300 : s, u = null, c = e[t], d = !1, p = function() {
    d = !0;
  }, h = function g(m) {
    if (d) {
      n(new Error("Animation cancelled"));
      return;
    }
    u === null && (u = m);
    var y = Math.min(1, (m - u) / l);
    if (e[t] = i(y) * (a - c) + c, y >= 1) {
      requestAnimationFrame(function() {
        n(null);
      });
      return;
    }
    requestAnimationFrame(g);
  };
  return c === a ? (n(new Error("Element already at target position")), p) : (requestAnimationFrame(h), p);
}
var Dv = {
  width: 99,
  height: 99,
  position: "absolute",
  top: -9999,
  overflow: "scroll"
};
function Nv(t) {
  var e = t.onChange, a = Ae(t, ["onChange"]), r = b.useRef(), n = b.useRef(null), o = function() {
    r.current = n.current.offsetHeight - n.current.clientHeight;
  };
  return b.useEffect(function() {
    var i = Un(function() {
      var s = r.current;
      o(), s !== r.current && e(r.current);
    });
    return window.addEventListener("resize", i), function() {
      i.clear(), window.removeEventListener("resize", i);
    };
  }, [e]), b.useEffect(function() {
    o(), e(r.current);
  }, [e]), /* @__PURE__ */ b.createElement("div", Y({
    style: Dv,
    ref: n
  }, a));
}
var Lv = function(e) {
  return {
    root: {
      position: "absolute",
      height: 2,
      bottom: 0,
      width: "100%",
      transition: e.transitions.create()
    },
    colorPrimary: {
      backgroundColor: e.palette.primary.main
    },
    colorSecondary: {
      backgroundColor: e.palette.secondary.main
    },
    vertical: {
      height: "100%",
      width: 2,
      right: 0
    }
  };
}, Fv = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.color, i = e.orientation, s = Ae(e, ["classes", "className", "color", "orientation"]);
  return /* @__PURE__ */ b.createElement("span", Y({
    className: he(r.root, r["color".concat(pt(o))], n, i === "vertical" && r.vertical),
    ref: a
  }, s));
});
const Bv = Qe(Lv, {
  name: "PrivateTabIndicator"
})(Fv);
var zv = {
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
}, Wv = /* @__PURE__ */ b.createElement(Av, {
  fontSize: "small"
}), Vv = /* @__PURE__ */ b.createElement(Iv, {
  fontSize: "small"
}), Hv = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.direction, i = e.orientation, s = e.disabled, l = Ae(e, ["classes", "className", "direction", "orientation", "disabled"]);
  return /* @__PURE__ */ b.createElement(wr, Y({
    component: "div",
    className: he(r.root, n, s && r.disabled, i === "vertical" && r.vertical),
    ref: a,
    role: null,
    tabIndex: null
  }, l), o === "left" ? Wv : Vv);
});
const Kv = Qe(zv, {
  name: "MuiTabScrollButton"
})(Hv);
var Uv = function(e) {
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
    scrollButtonsDesktop: Ot({}, e.breakpoints.down("xs"), {
      display: "none"
    }),
    /* Styles applied to the `TabIndicator` component. */
    indicator: {}
  };
}, qv = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e["aria-label"], n = e["aria-labelledby"], o = e.action, i = e.centered, s = i === void 0 ? !1 : i, l = e.children, u = e.classes, c = e.className, d = e.component, p = d === void 0 ? "div" : d, h = e.indicatorColor, g = h === void 0 ? "secondary" : h, m = e.onChange, y = e.orientation, w = y === void 0 ? "horizontal" : y, k = e.ScrollButtonComponent, I = k === void 0 ? Kv : k, f = e.scrollButtons, x = f === void 0 ? "auto" : f, E = e.selectionFollowsFocus, N = e.TabIndicatorProps, z = N === void 0 ? {} : N, O = e.TabScrollButtonProps, P = e.textColor, M = P === void 0 ? "inherit" : P, v = e.value, C = e.variant, D = C === void 0 ? "standard" : C, L = Ae(e, ["aria-label", "aria-labelledby", "action", "centered", "children", "classes", "className", "component", "indicatorColor", "onChange", "orientation", "ScrollButtonComponent", "scrollButtons", "selectionFollowsFocus", "TabIndicatorProps", "TabScrollButtonProps", "textColor", "value", "variant"]), R = En(), W = D === "scrollable", F = R.direction === "rtl", G = w === "vertical", B = G ? "scrollTop" : "scrollLeft", Z = G ? "top" : "left", Q = G ? "bottom" : "right", de = G ? "clientHeight" : "clientWidth", ue = G ? "height" : "width", xe = b.useState(!1), fe = xe[0], ve = xe[1], ge = b.useState({}), Se = ge[0], Ee = ge[1], ie = b.useState({
    start: !1,
    end: !1
  }), pe = ie[0], we = ie[1], Ce = b.useState({
    overflow: "hidden",
    marginBottom: null
  }), Ye = Ce[0], Oe = Ce[1], Fe = /* @__PURE__ */ new Map(), qe = b.useRef(null), Xe = b.useRef(null), nt = function() {
    var se = qe.current, ke;
    if (se) {
      var He = se.getBoundingClientRect();
      ke = {
        clientWidth: se.clientWidth,
        scrollLeft: se.scrollLeft,
        scrollTop: se.scrollTop,
        scrollLeftNormalized: Il(se, R.direction),
        scrollWidth: se.scrollWidth,
        top: He.top,
        bottom: He.bottom,
        left: He.left,
        right: He.right
      };
    }
    var Je;
    if (se && v !== !1) {
      var at = Xe.current.children;
      if (at.length > 0) {
        var Me = at[Fe.get(v)];
        Je = Me ? Me.getBoundingClientRect() : null;
      }
    }
    return {
      tabsMeta: ke,
      tabMeta: Je
    };
  }, et = rr(function() {
    var Te, se = nt(), ke = se.tabsMeta, He = se.tabMeta, Je = 0;
    if (He && ke)
      if (G)
        Je = He.top - ke.top + ke.scrollTop;
      else {
        var at = F ? ke.scrollLeftNormalized + ke.clientWidth - ke.scrollWidth : ke.scrollLeft;
        Je = He.left - ke.left + at;
      }
    var Me = (Te = {}, Ot(Te, Z, Je), Ot(Te, ue, He ? He[ue] : 0), Te);
    if (isNaN(Se[Z]) || isNaN(Se[ue]))
      Ee(Me);
    else {
      var je = Math.abs(Se[Z] - Me[Z]), mt = Math.abs(Se[ue] - Me[ue]);
      (je >= 1 || mt >= 1) && Ee(Me);
    }
  }), Ve = function(se) {
    jv(B, qe.current, se);
  }, Le = function(se) {
    var ke = qe.current[B];
    G ? ke += se : (ke += se * (F ? -1 : 1), ke *= F && Ru() === "reverse" ? -1 : 1), Ve(ke);
  }, ze = function() {
    Le(-qe.current[de]);
  }, ee = function() {
    Le(qe.current[de]);
  }, H = b.useCallback(function(Te) {
    Oe({
      overflow: null,
      marginBottom: -Te
    });
  }, []), K = function() {
    var se = {};
    se.scrollbarSizeListener = W ? /* @__PURE__ */ b.createElement(Nv, {
      className: u.scrollable,
      onChange: H
    }) : null;
    var ke = pe.start || pe.end, He = W && (x === "auto" && ke || x === "desktop" || x === "on");
    return se.scrollButtonStart = He ? /* @__PURE__ */ b.createElement(I, Y({
      orientation: w,
      direction: F ? "right" : "left",
      onClick: ze,
      disabled: !pe.start,
      className: he(u.scrollButtons, x !== "on" && u.scrollButtonsDesktop)
    }, O)) : null, se.scrollButtonEnd = He ? /* @__PURE__ */ b.createElement(I, Y({
      orientation: w,
      direction: F ? "left" : "right",
      onClick: ee,
      disabled: !pe.end,
      className: he(u.scrollButtons, x !== "on" && u.scrollButtonsDesktop)
    }, O)) : null, se;
  }, te = rr(function() {
    var Te = nt(), se = Te.tabsMeta, ke = Te.tabMeta;
    if (!(!ke || !se)) {
      if (ke[Z] < se[Z]) {
        var He = se[B] + (ke[Z] - se[Z]);
        Ve(He);
      } else if (ke[Q] > se[Q]) {
        var Je = se[B] + (ke[Q] - se[Q]);
        Ve(Je);
      }
    }
  }), oe = rr(function() {
    if (W && x !== "off") {
      var Te = qe.current, se = Te.scrollTop, ke = Te.scrollHeight, He = Te.clientHeight, Je = Te.scrollWidth, at = Te.clientWidth, Me, je;
      if (G)
        Me = se > 1, je = se < ke - He - 1;
      else {
        var mt = Il(qe.current, R.direction);
        Me = F ? mt < Je - at - 1 : mt > 1, je = F ? mt > 1 : mt < Je - at - 1;
      }
      (Me !== pe.start || je !== pe.end) && we({
        start: Me,
        end: je
      });
    }
  });
  b.useEffect(function() {
    var Te = Un(function() {
      et(), oe();
    }), se = Ji(qe.current);
    return se.addEventListener("resize", Te), function() {
      Te.clear(), se.removeEventListener("resize", Te);
    };
  }, [et, oe]);
  var be = b.useCallback(Un(function() {
    oe();
  }));
  b.useEffect(function() {
    return function() {
      be.clear();
    };
  }, [be]), b.useEffect(function() {
    ve(!0);
  }, []), b.useEffect(function() {
    et(), oe();
  }), b.useEffect(function() {
    te();
  }, [te, Se]), b.useImperativeHandle(o, function() {
    return {
      updateIndicator: et,
      updateScrollButtons: oe
    };
  }, [et, oe]);
  var Ie = /* @__PURE__ */ b.createElement(Bv, Y({
    className: u.indicator,
    orientation: w,
    color: g
  }, z, {
    style: Y({}, Se, z.style)
  })), ye = 0, me = b.Children.map(l, function(Te) {
    if (!/* @__PURE__ */ b.isValidElement(Te))
      return null;
    var se = Te.props.value === void 0 ? ye : Te.props.value;
    Fe.set(se, ye);
    var ke = se === v;
    return ye += 1, /* @__PURE__ */ b.cloneElement(Te, {
      fullWidth: D === "fullWidth",
      indicator: ke && !fe && Ie,
      selected: ke,
      selectionFollowsFocus: E,
      onChange: m,
      textColor: M,
      value: se
    });
  }), De = function(se) {
    var ke = se.target, He = ke.getAttribute("role");
    if (He === "tab") {
      var Je = null, at = w !== "vertical" ? "ArrowLeft" : "ArrowUp", Me = w !== "vertical" ? "ArrowRight" : "ArrowDown";
      switch (w !== "vertical" && R.direction === "rtl" && (at = "ArrowRight", Me = "ArrowLeft"), se.key) {
        case at:
          Je = ke.previousElementSibling || Xe.current.lastChild;
          break;
        case Me:
          Je = ke.nextElementSibling || Xe.current.firstChild;
          break;
        case "Home":
          Je = Xe.current.firstChild;
          break;
        case "End":
          Je = Xe.current.lastChild;
          break;
      }
      Je !== null && (Je.focus(), se.preventDefault());
    }
  }, Be = K();
  return /* @__PURE__ */ b.createElement(p, Y({
    className: he(u.root, c, G && u.vertical),
    ref: a
  }, L), Be.scrollButtonStart, Be.scrollbarSizeListener, /* @__PURE__ */ b.createElement("div", {
    className: he(u.scroller, W ? u.scrollable : u.fixed),
    style: Ye,
    ref: qe,
    onScroll: be
  }, /* @__PURE__ */ b.createElement("div", {
    "aria-label": r,
    "aria-labelledby": n,
    className: he(u.flexContainer, G && u.flexContainerVertical, s && !W && u.centered),
    onKeyDown: De,
    ref: Xe,
    role: "tablist"
  }, me), fe && Ie), Be.scrollButtonEnd);
});
const Gv = Qe(Uv, {
  name: "MuiTabs"
})(qv);
function Ml(t) {
  return Math.round(t * 1e5) / 1e5;
}
function Yv() {
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
var Xv = function(e) {
  return {
    /* Styles applied to the Popper component. */
    popper: {
      zIndex: e.zIndex.tooltip,
      pointerEvents: "none"
      // disable jss-rtl plugin
    },
    /* Styles applied to the Popper component if `interactive={true}`. */
    popperInteractive: {
      pointerEvents: "auto"
    },
    /* Styles applied to the Popper component if `arrow={true}`. */
    popperArrow: Yv(),
    /* Styles applied to the tooltip (label wrapper) element. */
    tooltip: {
      backgroundColor: Ue(e.palette.grey[700], 0.9),
      borderRadius: e.shape.borderRadius,
      color: e.palette.common.white,
      fontFamily: e.typography.fontFamily,
      padding: "4px 8px",
      fontSize: e.typography.pxToRem(10),
      lineHeight: "".concat(Ml(14 / 10), "em"),
      maxWidth: 300,
      wordWrap: "break-word",
      fontWeight: e.typography.fontWeightMedium
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
      color: Ue(e.palette.grey[700], 0.9),
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
      fontSize: e.typography.pxToRem(14),
      lineHeight: "".concat(Ml(16 / 14), "em"),
      fontWeight: e.typography.fontWeightRegular
    },
    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
    tooltipPlacementLeft: Ot({
      transformOrigin: "right center",
      margin: "0 24px "
    }, e.breakpoints.up("sm"), {
      margin: "0 14px"
    }),
    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
    tooltipPlacementRight: Ot({
      transformOrigin: "left center",
      margin: "0 24px"
    }, e.breakpoints.up("sm"), {
      margin: "0 14px"
    }),
    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
    tooltipPlacementTop: Ot({
      transformOrigin: "center bottom",
      margin: "24px 0"
    }, e.breakpoints.up("sm"), {
      margin: "14px 0"
    }),
    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
    tooltipPlacementBottom: Ot({
      transformOrigin: "center top",
      margin: "24px 0"
    }, e.breakpoints.up("sm"), {
      margin: "14px 0"
    })
  };
}, ga = !1, Qo = null, Jv = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.arrow, n = r === void 0 ? !1 : r, o = e.children, i = e.classes, s = e.disableFocusListener, l = s === void 0 ? !1 : s, u = e.disableHoverListener, c = u === void 0 ? !1 : u, d = e.disableTouchListener, p = d === void 0 ? !1 : d, h = e.enterDelay, g = h === void 0 ? 100 : h, m = e.enterNextDelay, y = m === void 0 ? 0 : m, w = e.enterTouchDelay, k = w === void 0 ? 700 : w, I = e.id, f = e.interactive, x = f === void 0 ? !1 : f, E = e.leaveDelay, N = E === void 0 ? 0 : E, z = e.leaveTouchDelay, O = z === void 0 ? 1500 : z, P = e.onClose, M = e.onOpen, v = e.open, C = e.placement, D = C === void 0 ? "bottom" : C, L = e.PopperComponent, R = L === void 0 ? Cv : L, W = e.PopperProps, F = e.title, G = e.TransitionComponent, B = G === void 0 ? as : G, Z = e.TransitionProps, Q = Ae(e, ["arrow", "children", "classes", "disableFocusListener", "disableHoverListener", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "id", "interactive", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"]), de = En(), ue = b.useState(), xe = ue[0], fe = ue[1], ve = b.useState(null), ge = ve[0], Se = ve[1], Ee = b.useRef(!1), ie = b.useRef(), pe = b.useRef(), we = b.useRef(), Ce = b.useRef(), Ye = Zi({
    controlled: v,
    default: !1,
    name: "Tooltip",
    state: "open"
  }), Oe = Cn(Ye, 2), Fe = Oe[0], qe = Oe[1], Xe = Fe, nt = Am(I);
  b.useEffect(function() {
    return function() {
      clearTimeout(ie.current), clearTimeout(pe.current), clearTimeout(we.current), clearTimeout(Ce.current);
    };
  }, []);
  var et = function(tt) {
    clearTimeout(Qo), ga = !0, qe(!0), M && M(tt);
  }, Ve = function() {
    var tt = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return function(Ze) {
      var bt = o.props;
      Ze.type === "mouseover" && bt.onMouseOver && tt && bt.onMouseOver(Ze), !(Ee.current && Ze.type !== "touchstart") && (xe && xe.removeAttribute("title"), clearTimeout(pe.current), clearTimeout(we.current), g || ga && y ? (Ze.persist(), pe.current = setTimeout(function() {
        et(Ze);
      }, ga ? y : g)) : et(Ze));
    };
  }, Le = Qi(), ze = Le.isFocusVisible, ee = Le.onBlurVisible, H = Le.ref, K = b.useState(!1), te = K[0], oe = K[1], be = function() {
    te && (oe(!1), ee());
  }, Ie = function() {
    var tt = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return function(Ze) {
      xe || fe(Ze.currentTarget), ze(Ze) && (oe(!0), Ve()(Ze));
      var bt = o.props;
      bt.onFocus && tt && bt.onFocus(Ze);
    };
  }, ye = function(tt) {
    clearTimeout(Qo), Qo = setTimeout(function() {
      ga = !1;
    }, 800 + N), qe(!1), P && P(tt), clearTimeout(ie.current), ie.current = setTimeout(function() {
      Ee.current = !1;
    }, de.transitions.duration.shortest);
  }, me = function() {
    var tt = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return function(Ze) {
      var bt = o.props;
      Ze.type === "blur" && (bt.onBlur && tt && bt.onBlur(Ze), be()), Ze.type === "mouseleave" && bt.onMouseLeave && Ze.currentTarget === xe && bt.onMouseLeave(Ze), clearTimeout(pe.current), clearTimeout(we.current), Ze.persist(), we.current = setTimeout(function() {
        ye(Ze);
      }, N);
    };
  }, De = function(tt) {
    Ee.current = !0;
    var Ze = o.props;
    Ze.onTouchStart && Ze.onTouchStart(tt);
  }, Be = function(tt) {
    De(tt), clearTimeout(we.current), clearTimeout(ie.current), clearTimeout(Ce.current), tt.persist(), Ce.current = setTimeout(function() {
      Ve()(tt);
    }, k);
  }, Te = function(tt) {
    o.props.onTouchEnd && o.props.onTouchEnd(tt), clearTimeout(Ce.current), clearTimeout(we.current), tt.persist(), we.current = setTimeout(function() {
      ye(tt);
    }, O);
  }, se = Ct(fe, a), ke = Ct(H, se), He = b.useCallback(function(ot) {
    zr(ke, Xt.findDOMNode(ot));
  }, [ke]), Je = Ct(o.ref, He);
  F === "" && (Xe = !1);
  var at = !Xe && !c, Me = Y({
    "aria-describedby": Xe ? nt : null,
    title: at && typeof F == "string" ? F : null
  }, Q, o.props, {
    className: he(Q.className, o.props.className),
    onTouchStart: De,
    ref: Je
  }), je = {};
  p || (Me.onTouchStart = Be, Me.onTouchEnd = Te), c || (Me.onMouseOver = Ve(), Me.onMouseLeave = me(), x && (je.onMouseOver = Ve(!1), je.onMouseLeave = me(!1))), l || (Me.onFocus = Ie(), Me.onBlur = me(), x && (je.onFocus = Ie(!1), je.onBlur = me(!1)));
  var mt = b.useMemo(function() {
    return Sr({
      popperOptions: {
        modifiers: {
          arrow: {
            enabled: !!ge,
            element: ge
          }
        }
      }
    }, W);
  }, [ge, W]);
  return /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.cloneElement(o, Me), /* @__PURE__ */ b.createElement(R, Y({
    className: he(i.popper, x && i.popperInteractive, n && i.popperArrow),
    placement: D,
    anchorEl: xe,
    open: xe ? Xe : !1,
    id: Me["aria-describedby"],
    transition: !0
  }, je, mt), function(ot) {
    var tt = ot.placement, Ze = ot.TransitionProps;
    return /* @__PURE__ */ b.createElement(B, Y({
      timeout: de.transitions.duration.shorter
    }, Ze, Z), /* @__PURE__ */ b.createElement("div", {
      className: he(i.tooltip, i["tooltipPlacement".concat(pt(tt.split("-")[0]))], Ee.current && i.touch, n && i.tooltipArrow)
    }, F, n ? /* @__PURE__ */ b.createElement("span", {
      className: i.arrow,
      ref: Se
    }) : null));
  }));
});
const us = Qe(Xv, {
  name: "MuiTooltip",
  flip: !1
})(Jv);
var Nn = { exports: {} };
Nn.exports;
var jl;
function Zv() {
  return jl || (jl = 1, (function(t, e) {
    var a = 200, r = "__lodash_hash_undefined__", n = 9007199254740991, o = "[object Arguments]", i = "[object Array]", s = "[object Boolean]", l = "[object Date]", u = "[object Error]", c = "[object Function]", d = "[object GeneratorFunction]", p = "[object Map]", h = "[object Number]", g = "[object Object]", m = "[object Promise]", y = "[object RegExp]", w = "[object Set]", k = "[object String]", I = "[object Symbol]", f = "[object WeakMap]", x = "[object ArrayBuffer]", E = "[object DataView]", N = "[object Float32Array]", z = "[object Float64Array]", O = "[object Int8Array]", P = "[object Int16Array]", M = "[object Int32Array]", v = "[object Uint8Array]", C = "[object Uint8ClampedArray]", D = "[object Uint16Array]", L = "[object Uint32Array]", R = /[\\^$.*+?()[\]{}|]/g, W = /\w*$/, F = /^\[object .+?Constructor\]$/, G = /^(?:0|[1-9]\d*)$/, B = {};
    B[o] = B[i] = B[x] = B[E] = B[s] = B[l] = B[N] = B[z] = B[O] = B[P] = B[M] = B[p] = B[h] = B[g] = B[y] = B[w] = B[k] = B[I] = B[v] = B[C] = B[D] = B[L] = !0, B[u] = B[c] = B[f] = !1;
    var Z = typeof pa == "object" && pa && pa.Object === Object && pa, Q = typeof self == "object" && self && self.Object === Object && self, de = Z || Q || Function("return this")(), ue = e && !e.nodeType && e, xe = ue && !0 && t && !t.nodeType && t, fe = xe && xe.exports === ue;
    function ve(T, X) {
      return T.set(X[0], X[1]), T;
    }
    function ge(T, X) {
      return T.add(X), T;
    }
    function Se(T, X) {
      for (var ce = -1, Pe = T ? T.length : 0; ++ce < Pe && X(T[ce], ce, T) !== !1; )
        ;
      return T;
    }
    function Ee(T, X) {
      for (var ce = -1, Pe = X.length, Pt = T.length; ++ce < Pe; )
        T[Pt + ce] = X[ce];
      return T;
    }
    function ie(T, X, ce, Pe) {
      for (var Pt = -1, Dt = T ? T.length : 0; ++Pt < Dt; )
        ce = X(ce, T[Pt], Pt, T);
      return ce;
    }
    function pe(T, X) {
      for (var ce = -1, Pe = Array(T); ++ce < T; )
        Pe[ce] = X(ce);
      return Pe;
    }
    function we(T, X) {
      return T == null ? void 0 : T[X];
    }
    function Ce(T) {
      var X = !1;
      if (T != null && typeof T.toString != "function")
        try {
          X = !!(T + "");
        } catch {
        }
      return X;
    }
    function Ye(T) {
      var X = -1, ce = Array(T.size);
      return T.forEach(function(Pe, Pt) {
        ce[++X] = [Pt, Pe];
      }), ce;
    }
    function Oe(T, X) {
      return function(ce) {
        return T(X(ce));
      };
    }
    function Fe(T) {
      var X = -1, ce = Array(T.size);
      return T.forEach(function(Pe) {
        ce[++X] = Pe;
      }), ce;
    }
    var qe = Array.prototype, Xe = Function.prototype, nt = Object.prototype, et = de["__core-js_shared__"], Ve = (function() {
      var T = /[^.]+$/.exec(et && et.keys && et.keys.IE_PROTO || "");
      return T ? "Symbol(src)_1." + T : "";
    })(), Le = Xe.toString, ze = nt.hasOwnProperty, ee = nt.toString, H = RegExp(
      "^" + Le.call(ze).replace(R, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), K = fe ? de.Buffer : void 0, te = de.Symbol, oe = de.Uint8Array, be = Oe(Object.getPrototypeOf, Object), Ie = Object.create, ye = nt.propertyIsEnumerable, me = qe.splice, De = Object.getOwnPropertySymbols, Be = K ? K.isBuffer : void 0, Te = Oe(Object.keys, Object), se = Xr(de, "DataView"), ke = Xr(de, "Map"), He = Xr(de, "Promise"), Je = Xr(de, "Set"), at = Xr(de, "WeakMap"), Me = Xr(Object, "create"), je = Pr(se), mt = Pr(ke), ot = Pr(He), tt = Pr(Je), Ze = Pr(at), bt = te ? te.prototype : void 0, Mt = bt ? bt.valueOf : void 0;
    function jt(T) {
      var X = -1, ce = T ? T.length : 0;
      for (this.clear(); ++X < ce; ) {
        var Pe = T[X];
        this.set(Pe[0], Pe[1]);
      }
    }
    function Tr() {
      this.__data__ = Me ? Me(null) : {};
    }
    function go(T) {
      return this.has(T) && delete this.__data__[T];
    }
    function Hr(T) {
      var X = this.__data__;
      if (Me) {
        var ce = X[T];
        return ce === r ? void 0 : ce;
      }
      return ze.call(X, T) ? X[T] : void 0;
    }
    function vo(T) {
      var X = this.__data__;
      return Me ? X[T] !== void 0 : ze.call(X, T);
    }
    function bo(T, X) {
      var ce = this.__data__;
      return ce[T] = Me && X === void 0 ? r : X, this;
    }
    jt.prototype.clear = Tr, jt.prototype.delete = go, jt.prototype.get = Hr, jt.prototype.has = vo, jt.prototype.set = bo;
    function qt(T) {
      var X = -1, ce = T ? T.length : 0;
      for (this.clear(); ++X < ce; ) {
        var Pe = T[X];
        this.set(Pe[0], Pe[1]);
      }
    }
    function yo() {
      this.__data__ = [];
    }
    function Kr(T) {
      var X = this.__data__, ce = Ne(X, T);
      if (ce < 0)
        return !1;
      var Pe = X.length - 1;
      return ce == Pe ? X.pop() : me.call(X, ce, 1), !0;
    }
    function A(T) {
      var X = this.__data__, ce = Ne(X, T);
      return ce < 0 ? void 0 : X[ce][1];
    }
    function j(T) {
      return Ne(this.__data__, T) > -1;
    }
    function S(T, X) {
      var ce = this.__data__, Pe = Ne(ce, T);
      return Pe < 0 ? ce.push([T, X]) : ce[Pe][1] = X, this;
    }
    qt.prototype.clear = yo, qt.prototype.delete = Kr, qt.prototype.get = A, qt.prototype.has = j, qt.prototype.set = S;
    function $(T) {
      var X = -1, ce = T ? T.length : 0;
      for (this.clear(); ++X < ce; ) {
        var Pe = T[X];
        this.set(Pe[0], Pe[1]);
      }
    }
    function _() {
      this.__data__ = {
        hash: new jt(),
        map: new (ke || qt)(),
        string: new jt()
      };
    }
    function q(T) {
      return ca(this, T).delete(T);
    }
    function re(T) {
      return ca(this, T).get(T);
    }
    function J(T) {
      return ca(this, T).has(T);
    }
    function V(T, X) {
      return ca(this, T).set(T, X), this;
    }
    $.prototype.clear = _, $.prototype.delete = q, $.prototype.get = re, $.prototype.has = J, $.prototype.set = V;
    function le(T) {
      this.__data__ = new qt(T);
    }
    function Re() {
      this.__data__ = new qt();
    }
    function Ge(T) {
      return this.__data__.delete(T);
    }
    function rt(T) {
      return this.__data__.get(T);
    }
    function lt(T) {
      return this.__data__.has(T);
    }
    function Ke(T, X) {
      var ce = this.__data__;
      if (ce instanceof qt) {
        var Pe = ce.__data__;
        if (!ke || Pe.length < a - 1)
          return Pe.push([T, X]), this;
        ce = this.__data__ = new $(Pe);
      }
      return ce.set(T, X), this;
    }
    le.prototype.clear = Re, le.prototype.delete = Ge, le.prototype.get = rt, le.prototype.has = lt, le.prototype.set = Ke;
    function ct(T, X) {
      var ce = xo(T) || vd(T) ? pe(T.length, String) : [], Pe = ce.length, Pt = !!Pe;
      for (var Dt in T)
        ze.call(T, Dt) && !(Pt && (Dt == "length" || pd(Dt, Pe))) && ce.push(Dt);
      return ce;
    }
    function yt(T, X, ce) {
      var Pe = T[X];
      (!(ze.call(T, X) && Es(Pe, ce)) || ce === void 0 && !(X in T)) && (T[X] = ce);
    }
    function Ne(T, X) {
      for (var ce = T.length; ce--; )
        if (Es(T[ce][0], X))
          return ce;
      return -1;
    }
    function $t(T, X) {
      return T && Yr(X, So(X), T);
    }
    function _t(T, X, ce, Pe, Pt, Dt, ir) {
      var Nt;
      if (Pe && (Nt = Dt ? Pe(T, Pt, Dt, ir) : Pe(T)), Nt !== void 0)
        return Nt;
      if (!ua(T))
        return T;
      var Rs = xo(T);
      if (Rs) {
        if (Nt = ud(T), !X)
          return On(T, Nt);
      } else {
        var Jr = _r(T), Ts = Jr == c || Jr == d;
        if (yd(T))
          return Tt(T, X);
        if (Jr == g || Jr == o || Ts && !Dt) {
          if (Ce(T))
            return Dt ? T : {};
          if (Nt = dd(Ts ? {} : T), !X)
            return mr(T, $t(Nt, T));
        } else {
          if (!B[Jr])
            return Dt ? T : {};
          Nt = fd(T, Jr, _t, X);
        }
      }
      ir || (ir = new le());
      var Os = ir.get(T);
      if (Os)
        return Os;
      if (ir.set(T, Nt), !Rs)
        var _s = ce ? la(T) : So(T);
      return Se(_s || T, function(Co, da) {
        _s && (da = Co, Co = T[da]), yt(Nt, da, _t(Co, X, ce, Pe, da, T, ir));
      }), Nt;
    }
    function Gt(T) {
      return ua(T) ? Ie(T) : {};
    }
    function Ur(T, X, ce) {
      var Pe = X(T);
      return xo(T) ? Pe : Ee(Pe, ce(T));
    }
    function Yt(T) {
      return ee.call(T);
    }
    function qr(T) {
      if (!ua(T) || md(T))
        return !1;
      var X = $s(T) || Ce(T) ? H : F;
      return X.test(Pr(T));
    }
    function pr(T) {
      if (!ws(T))
        return Te(T);
      var X = [];
      for (var ce in Object(T))
        ze.call(T, ce) && ce != "constructor" && X.push(ce);
      return X;
    }
    function Tt(T, X) {
      if (X)
        return T.slice();
      var ce = new T.constructor(T.length);
      return T.copy(ce), ce;
    }
    function Zt(T) {
      var X = new T.constructor(T.byteLength);
      return new oe(X).set(new oe(T)), X;
    }
    function Or(T, X) {
      var ce = X ? Zt(T.buffer) : T.buffer;
      return new T.constructor(ce, T.byteOffset, T.byteLength);
    }
    function hr(T, X, ce) {
      var Pe = X ? ce(Ye(T), !0) : Ye(T);
      return ie(Pe, ve, new T.constructor());
    }
    function sa(T) {
      var X = new T.constructor(T.source, W.exec(T));
      return X.lastIndex = T.lastIndex, X;
    }
    function Gr(T, X, ce) {
      var Pe = X ? ce(Fe(T), !0) : Fe(T);
      return ie(Pe, ge, new T.constructor());
    }
    function Rn(T) {
      return Mt ? Object(Mt.call(T)) : {};
    }
    function Tn(T, X) {
      var ce = X ? Zt(T.buffer) : T.buffer;
      return new T.constructor(ce, T.byteOffset, T.length);
    }
    function On(T, X) {
      var ce = -1, Pe = T.length;
      for (X || (X = Array(Pe)); ++ce < Pe; )
        X[ce] = T[ce];
      return X;
    }
    function Yr(T, X, ce, Pe) {
      ce || (ce = {});
      for (var Pt = -1, Dt = X.length; ++Pt < Dt; ) {
        var ir = X[Pt], Nt = void 0;
        yt(ce, ir, Nt === void 0 ? T[ir] : Nt);
      }
      return ce;
    }
    function mr(T, X) {
      return Yr(T, Cs(T), X);
    }
    function la(T) {
      return Ur(T, So, Cs);
    }
    function ca(T, X) {
      var ce = T.__data__;
      return hd(X) ? ce[typeof X == "string" ? "string" : "hash"] : ce.map;
    }
    function Xr(T, X) {
      var ce = we(T, X);
      return qr(ce) ? ce : void 0;
    }
    var Cs = De ? Oe(De, Object) : Cd, _r = Yt;
    (se && _r(new se(new ArrayBuffer(1))) != E || ke && _r(new ke()) != p || He && _r(He.resolve()) != m || Je && _r(new Je()) != w || at && _r(new at()) != f) && (_r = function(T) {
      var X = ee.call(T), ce = X == g ? T.constructor : void 0, Pe = ce ? Pr(ce) : void 0;
      if (Pe)
        switch (Pe) {
          case je:
            return E;
          case mt:
            return p;
          case ot:
            return m;
          case tt:
            return w;
          case Ze:
            return f;
        }
      return X;
    });
    function ud(T) {
      var X = T.length, ce = T.constructor(X);
      return X && typeof T[0] == "string" && ze.call(T, "index") && (ce.index = T.index, ce.input = T.input), ce;
    }
    function dd(T) {
      return typeof T.constructor == "function" && !ws(T) ? Gt(be(T)) : {};
    }
    function fd(T, X, ce, Pe) {
      var Pt = T.constructor;
      switch (X) {
        case x:
          return Zt(T);
        case s:
        case l:
          return new Pt(+T);
        case E:
          return Or(T, Pe);
        case N:
        case z:
        case O:
        case P:
        case M:
        case v:
        case C:
        case D:
        case L:
          return Tn(T, Pe);
        case p:
          return hr(T, Pe, ce);
        case h:
        case k:
          return new Pt(T);
        case y:
          return sa(T);
        case w:
          return Gr(T, Pe, ce);
        case I:
          return Rn(T);
      }
    }
    function pd(T, X) {
      return X = X ?? n, !!X && (typeof T == "number" || G.test(T)) && T > -1 && T % 1 == 0 && T < X;
    }
    function hd(T) {
      var X = typeof T;
      return X == "string" || X == "number" || X == "symbol" || X == "boolean" ? T !== "__proto__" : T === null;
    }
    function md(T) {
      return !!Ve && Ve in T;
    }
    function ws(T) {
      var X = T && T.constructor, ce = typeof X == "function" && X.prototype || nt;
      return T === ce;
    }
    function Pr(T) {
      if (T != null) {
        try {
          return Le.call(T);
        } catch {
        }
        try {
          return T + "";
        } catch {
        }
      }
      return "";
    }
    function gd(T) {
      return _t(T, !0, !0);
    }
    function Es(T, X) {
      return T === X || T !== T && X !== X;
    }
    function vd(T) {
      return bd(T) && ze.call(T, "callee") && (!ye.call(T, "callee") || ee.call(T) == o);
    }
    var xo = Array.isArray;
    function ks(T) {
      return T != null && xd(T.length) && !$s(T);
    }
    function bd(T) {
      return Sd(T) && ks(T);
    }
    var yd = Be || wd;
    function $s(T) {
      var X = ua(T) ? ee.call(T) : "";
      return X == c || X == d;
    }
    function xd(T) {
      return typeof T == "number" && T > -1 && T % 1 == 0 && T <= n;
    }
    function ua(T) {
      var X = typeof T;
      return !!T && (X == "object" || X == "function");
    }
    function Sd(T) {
      return !!T && typeof T == "object";
    }
    function So(T) {
      return ks(T) ? ct(T) : pr(T);
    }
    function Cd() {
      return [];
    }
    function wd() {
      return !1;
    }
    t.exports = gd;
  })(Nn, Nn.exports)), Nn.exports;
}
var Qv = Zv();
const Dl = /* @__PURE__ */ $r(Qv);
var Ea = { exports: {} }, eb = Ea.exports, Nl;
function tb() {
  return Nl || (Nl = 1, (function(t, e) {
    (function(a, r) {
      t.exports = r();
    })(eb, (function() {
      var a = 1e3, r = 6e4, n = 36e5, o = "millisecond", i = "second", s = "minute", l = "hour", u = "day", c = "week", d = "month", p = "quarter", h = "year", g = "date", m = "Invalid Date", y = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, w = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, k = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(D) {
        var L = ["th", "st", "nd", "rd"], R = D % 100;
        return "[" + D + (L[(R - 20) % 10] || L[R] || L[0]) + "]";
      } }, I = function(D, L, R) {
        var W = String(D);
        return !W || W.length >= L ? D : "" + Array(L + 1 - W.length).join(R) + D;
      }, f = { s: I, z: function(D) {
        var L = -D.utcOffset(), R = Math.abs(L), W = Math.floor(R / 60), F = R % 60;
        return (L <= 0 ? "+" : "-") + I(W, 2, "0") + ":" + I(F, 2, "0");
      }, m: function D(L, R) {
        if (L.date() < R.date()) return -D(R, L);
        var W = 12 * (R.year() - L.year()) + (R.month() - L.month()), F = L.clone().add(W, d), G = R - F < 0, B = L.clone().add(W + (G ? -1 : 1), d);
        return +(-(W + (R - F) / (G ? F - B : B - F)) || 0);
      }, a: function(D) {
        return D < 0 ? Math.ceil(D) || 0 : Math.floor(D);
      }, p: function(D) {
        return { M: d, y: h, w: c, d: u, D: g, h: l, m: s, s: i, ms: o, Q: p }[D] || String(D || "").toLowerCase().replace(/s$/, "");
      }, u: function(D) {
        return D === void 0;
      } }, x = "en", E = {};
      E[x] = k;
      var N = "$isDayjsObject", z = function(D) {
        return D instanceof v || !(!D || !D[N]);
      }, O = function D(L, R, W) {
        var F;
        if (!L) return x;
        if (typeof L == "string") {
          var G = L.toLowerCase();
          E[G] && (F = G), R && (E[G] = R, F = G);
          var B = L.split("-");
          if (!F && B.length > 1) return D(B[0]);
        } else {
          var Z = L.name;
          E[Z] = L, F = Z;
        }
        return !W && F && (x = F), F || !W && x;
      }, P = function(D, L) {
        if (z(D)) return D.clone();
        var R = typeof L == "object" ? L : {};
        return R.date = D, R.args = arguments, new v(R);
      }, M = f;
      M.l = O, M.i = z, M.w = function(D, L) {
        return P(D, { locale: L.$L, utc: L.$u, x: L.$x, $offset: L.$offset });
      };
      var v = (function() {
        function D(R) {
          this.$L = O(R.locale, null, !0), this.parse(R), this.$x = this.$x || R.x || {}, this[N] = !0;
        }
        var L = D.prototype;
        return L.parse = function(R) {
          this.$d = (function(W) {
            var F = W.date, G = W.utc;
            if (F === null) return /* @__PURE__ */ new Date(NaN);
            if (M.u(F)) return /* @__PURE__ */ new Date();
            if (F instanceof Date) return new Date(F);
            if (typeof F == "string" && !/Z$/i.test(F)) {
              var B = F.match(y);
              if (B) {
                var Z = B[2] - 1 || 0, Q = (B[7] || "0").substring(0, 3);
                return G ? new Date(Date.UTC(B[1], Z, B[3] || 1, B[4] || 0, B[5] || 0, B[6] || 0, Q)) : new Date(B[1], Z, B[3] || 1, B[4] || 0, B[5] || 0, B[6] || 0, Q);
              }
            }
            return new Date(F);
          })(R), this.init();
        }, L.init = function() {
          var R = this.$d;
          this.$y = R.getFullYear(), this.$M = R.getMonth(), this.$D = R.getDate(), this.$W = R.getDay(), this.$H = R.getHours(), this.$m = R.getMinutes(), this.$s = R.getSeconds(), this.$ms = R.getMilliseconds();
        }, L.$utils = function() {
          return M;
        }, L.isValid = function() {
          return this.$d.toString() !== m;
        }, L.isSame = function(R, W) {
          var F = P(R);
          return this.startOf(W) <= F && F <= this.endOf(W);
        }, L.isAfter = function(R, W) {
          return P(R) < this.startOf(W);
        }, L.isBefore = function(R, W) {
          return this.endOf(W) < P(R);
        }, L.$g = function(R, W, F) {
          return M.u(R) ? this[W] : this.set(F, R);
        }, L.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, L.valueOf = function() {
          return this.$d.getTime();
        }, L.startOf = function(R, W) {
          var F = this, G = !!M.u(W) || W, B = M.p(R), Z = function(Se, Ee) {
            var ie = M.w(F.$u ? Date.UTC(F.$y, Ee, Se) : new Date(F.$y, Ee, Se), F);
            return G ? ie : ie.endOf(u);
          }, Q = function(Se, Ee) {
            return M.w(F.toDate()[Se].apply(F.toDate("s"), (G ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Ee)), F);
          }, de = this.$W, ue = this.$M, xe = this.$D, fe = "set" + (this.$u ? "UTC" : "");
          switch (B) {
            case h:
              return G ? Z(1, 0) : Z(31, 11);
            case d:
              return G ? Z(1, ue) : Z(0, ue + 1);
            case c:
              var ve = this.$locale().weekStart || 0, ge = (de < ve ? de + 7 : de) - ve;
              return Z(G ? xe - ge : xe + (6 - ge), ue);
            case u:
            case g:
              return Q(fe + "Hours", 0);
            case l:
              return Q(fe + "Minutes", 1);
            case s:
              return Q(fe + "Seconds", 2);
            case i:
              return Q(fe + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, L.endOf = function(R) {
          return this.startOf(R, !1);
        }, L.$set = function(R, W) {
          var F, G = M.p(R), B = "set" + (this.$u ? "UTC" : ""), Z = (F = {}, F[u] = B + "Date", F[g] = B + "Date", F[d] = B + "Month", F[h] = B + "FullYear", F[l] = B + "Hours", F[s] = B + "Minutes", F[i] = B + "Seconds", F[o] = B + "Milliseconds", F)[G], Q = G === u ? this.$D + (W - this.$W) : W;
          if (G === d || G === h) {
            var de = this.clone().set(g, 1);
            de.$d[Z](Q), de.init(), this.$d = de.set(g, Math.min(this.$D, de.daysInMonth())).$d;
          } else Z && this.$d[Z](Q);
          return this.init(), this;
        }, L.set = function(R, W) {
          return this.clone().$set(R, W);
        }, L.get = function(R) {
          return this[M.p(R)]();
        }, L.add = function(R, W) {
          var F, G = this;
          R = Number(R);
          var B = M.p(W), Z = function(ue) {
            var xe = P(G);
            return M.w(xe.date(xe.date() + Math.round(ue * R)), G);
          };
          if (B === d) return this.set(d, this.$M + R);
          if (B === h) return this.set(h, this.$y + R);
          if (B === u) return Z(1);
          if (B === c) return Z(7);
          var Q = (F = {}, F[s] = r, F[l] = n, F[i] = a, F)[B] || 1, de = this.$d.getTime() + R * Q;
          return M.w(de, this);
        }, L.subtract = function(R, W) {
          return this.add(-1 * R, W);
        }, L.format = function(R) {
          var W = this, F = this.$locale();
          if (!this.isValid()) return F.invalidDate || m;
          var G = R || "YYYY-MM-DDTHH:mm:ssZ", B = M.z(this), Z = this.$H, Q = this.$m, de = this.$M, ue = F.weekdays, xe = F.months, fe = F.meridiem, ve = function(Ee, ie, pe, we) {
            return Ee && (Ee[ie] || Ee(W, G)) || pe[ie].slice(0, we);
          }, ge = function(Ee) {
            return M.s(Z % 12 || 12, Ee, "0");
          }, Se = fe || function(Ee, ie, pe) {
            var we = Ee < 12 ? "AM" : "PM";
            return pe ? we.toLowerCase() : we;
          };
          return G.replace(w, (function(Ee, ie) {
            return ie || (function(pe) {
              switch (pe) {
                case "YY":
                  return String(W.$y).slice(-2);
                case "YYYY":
                  return M.s(W.$y, 4, "0");
                case "M":
                  return de + 1;
                case "MM":
                  return M.s(de + 1, 2, "0");
                case "MMM":
                  return ve(F.monthsShort, de, xe, 3);
                case "MMMM":
                  return ve(xe, de);
                case "D":
                  return W.$D;
                case "DD":
                  return M.s(W.$D, 2, "0");
                case "d":
                  return String(W.$W);
                case "dd":
                  return ve(F.weekdaysMin, W.$W, ue, 2);
                case "ddd":
                  return ve(F.weekdaysShort, W.$W, ue, 3);
                case "dddd":
                  return ue[W.$W];
                case "H":
                  return String(Z);
                case "HH":
                  return M.s(Z, 2, "0");
                case "h":
                  return ge(1);
                case "hh":
                  return ge(2);
                case "a":
                  return Se(Z, Q, !0);
                case "A":
                  return Se(Z, Q, !1);
                case "m":
                  return String(Q);
                case "mm":
                  return M.s(Q, 2, "0");
                case "s":
                  return String(W.$s);
                case "ss":
                  return M.s(W.$s, 2, "0");
                case "SSS":
                  return M.s(W.$ms, 3, "0");
                case "Z":
                  return B;
              }
              return null;
            })(Ee) || B.replace(":", "");
          }));
        }, L.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, L.diff = function(R, W, F) {
          var G, B = this, Z = M.p(W), Q = P(R), de = (Q.utcOffset() - this.utcOffset()) * r, ue = this - Q, xe = function() {
            return M.m(B, Q);
          };
          switch (Z) {
            case h:
              G = xe() / 12;
              break;
            case d:
              G = xe();
              break;
            case p:
              G = xe() / 3;
              break;
            case c:
              G = (ue - de) / 6048e5;
              break;
            case u:
              G = (ue - de) / 864e5;
              break;
            case l:
              G = ue / n;
              break;
            case s:
              G = ue / r;
              break;
            case i:
              G = ue / a;
              break;
            default:
              G = ue;
          }
          return F ? G : M.a(G);
        }, L.daysInMonth = function() {
          return this.endOf(d).$D;
        }, L.$locale = function() {
          return E[this.$L];
        }, L.locale = function(R, W) {
          if (!R) return this.$L;
          var F = this.clone(), G = O(R, W, !0);
          return G && (F.$L = G), F;
        }, L.clone = function() {
          return M.w(this.$d, this);
        }, L.toDate = function() {
          return new Date(this.valueOf());
        }, L.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, L.toISOString = function() {
          return this.$d.toISOString();
        }, L.toString = function() {
          return this.$d.toUTCString();
        }, D;
      })(), C = v.prototype;
      return P.prototype = C, [["$ms", o], ["$s", i], ["$m", s], ["$H", l], ["$W", u], ["$M", d], ["$y", h], ["$D", g]].forEach((function(D) {
        C[D[1]] = function(L) {
          return this.$g(L, D[0], D[1]);
        };
      })), P.extend = function(D, L) {
        return D.$i || (D(L, v, P), D.$i = !0), P;
      }, P.locale = O, P.isDayjs = z, P.unix = function(D) {
        return P(1e3 * D);
      }, P.en = E[x], P.Ls = E, P.p = {}, P;
    }));
  })(Ea)), Ea.exports;
}
var rb = tb();
const eo = /* @__PURE__ */ $r(rb);
var ka = { exports: {} }, nb = ka.exports, Ll;
function ab() {
  return Ll || (Ll = 1, (function(t, e) {
    (function(a, r) {
      t.exports = r();
    })(nb, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, r = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, o = /\d\d/, i = /\d\d?/, s = /\d*[^-_:/,()\s\d]+/, l = {}, u = function(y) {
        return (y = +y) + (y > 68 ? 1900 : 2e3);
      }, c = function(y) {
        return function(w) {
          this[y] = +w;
        };
      }, d = [/[+-]\d\d:?(\d\d)?|Z/, function(y) {
        (this.zone || (this.zone = {})).offset = (function(w) {
          if (!w || w === "Z") return 0;
          var k = w.match(/([+-]|\d\d)/g), I = 60 * k[1] + (+k[2] || 0);
          return I === 0 ? 0 : k[0] === "+" ? -I : I;
        })(y);
      }], p = function(y) {
        var w = l[y];
        return w && (w.indexOf ? w : w.s.concat(w.f));
      }, h = function(y, w) {
        var k, I = l.meridiem;
        if (I) {
          for (var f = 1; f <= 24; f += 1) if (y.indexOf(I(f, 0, w)) > -1) {
            k = f > 12;
            break;
          }
        } else k = y === (w ? "pm" : "PM");
        return k;
      }, g = { A: [s, function(y) {
        this.afternoon = h(y, !1);
      }], a: [s, function(y) {
        this.afternoon = h(y, !0);
      }], Q: [n, function(y) {
        this.month = 3 * (y - 1) + 1;
      }], S: [n, function(y) {
        this.milliseconds = 100 * +y;
      }], SS: [o, function(y) {
        this.milliseconds = 10 * +y;
      }], SSS: [/\d{3}/, function(y) {
        this.milliseconds = +y;
      }], s: [i, c("seconds")], ss: [i, c("seconds")], m: [i, c("minutes")], mm: [i, c("minutes")], H: [i, c("hours")], h: [i, c("hours")], HH: [i, c("hours")], hh: [i, c("hours")], D: [i, c("day")], DD: [o, c("day")], Do: [s, function(y) {
        var w = l.ordinal, k = y.match(/\d+/);
        if (this.day = k[0], w) for (var I = 1; I <= 31; I += 1) w(I).replace(/\[|\]/g, "") === y && (this.day = I);
      }], w: [i, c("week")], ww: [o, c("week")], M: [i, c("month")], MM: [o, c("month")], MMM: [s, function(y) {
        var w = p("months"), k = (p("monthsShort") || w.map((function(I) {
          return I.slice(0, 3);
        }))).indexOf(y) + 1;
        if (k < 1) throw new Error();
        this.month = k % 12 || k;
      }], MMMM: [s, function(y) {
        var w = p("months").indexOf(y) + 1;
        if (w < 1) throw new Error();
        this.month = w % 12 || w;
      }], Y: [/[+-]?\d+/, c("year")], YY: [o, function(y) {
        this.year = u(y);
      }], YYYY: [/\d{4}/, c("year")], Z: d, ZZ: d };
      function m(y) {
        var w, k;
        w = y, k = l && l.formats;
        for (var I = (y = w.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(P, M, v) {
          var C = v && v.toUpperCase();
          return M || k[v] || a[v] || k[C].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(D, L, R) {
            return L || R.slice(1);
          }));
        }))).match(r), f = I.length, x = 0; x < f; x += 1) {
          var E = I[x], N = g[E], z = N && N[0], O = N && N[1];
          I[x] = O ? { regex: z, parser: O } : E.replace(/^\[|\]$/g, "");
        }
        return function(P) {
          for (var M = {}, v = 0, C = 0; v < f; v += 1) {
            var D = I[v];
            if (typeof D == "string") C += D.length;
            else {
              var L = D.regex, R = D.parser, W = P.slice(C), F = L.exec(W)[0];
              R.call(M, F), P = P.replace(F, "");
            }
          }
          return (function(G) {
            var B = G.afternoon;
            if (B !== void 0) {
              var Z = G.hours;
              B ? Z < 12 && (G.hours += 12) : Z === 12 && (G.hours = 0), delete G.afternoon;
            }
          })(M), M;
        };
      }
      return function(y, w, k) {
        k.p.customParseFormat = !0, y && y.parseTwoDigitYear && (u = y.parseTwoDigitYear);
        var I = w.prototype, f = I.parse;
        I.parse = function(x) {
          var E = x.date, N = x.utc, z = x.args;
          this.$u = N;
          var O = z[1];
          if (typeof O == "string") {
            var P = z[2] === !0, M = z[3] === !0, v = P || M, C = z[2];
            M && (C = z[2]), l = this.$locale(), !P && C && (l = k.Ls[C]), this.$d = (function(W, F, G, B) {
              try {
                if (["x", "X"].indexOf(F) > -1) return new Date((F === "X" ? 1e3 : 1) * W);
                var Z = m(F)(W), Q = Z.year, de = Z.month, ue = Z.day, xe = Z.hours, fe = Z.minutes, ve = Z.seconds, ge = Z.milliseconds, Se = Z.zone, Ee = Z.week, ie = /* @__PURE__ */ new Date(), pe = ue || (Q || de ? 1 : ie.getDate()), we = Q || ie.getFullYear(), Ce = 0;
                Q && !de || (Ce = de > 0 ? de - 1 : ie.getMonth());
                var Ye, Oe = xe || 0, Fe = fe || 0, qe = ve || 0, Xe = ge || 0;
                return Se ? new Date(Date.UTC(we, Ce, pe, Oe, Fe, qe, Xe + 60 * Se.offset * 1e3)) : G ? new Date(Date.UTC(we, Ce, pe, Oe, Fe, qe, Xe)) : (Ye = new Date(we, Ce, pe, Oe, Fe, qe, Xe), Ee && (Ye = B(Ye).week(Ee).toDate()), Ye);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(E, O, N, k), this.init(), C && C !== !0 && (this.$L = this.locale(C).$L), v && E != this.format(O) && (this.$d = /* @__PURE__ */ new Date("")), l = {};
          } else if (O instanceof Array) for (var D = O.length, L = 1; L <= D; L += 1) {
            z[1] = O[L - 1];
            var R = k.apply(this, z);
            if (R.isValid()) {
              this.$d = R.$d, this.$L = R.$L, this.init();
              break;
            }
            L === D && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else f.call(this, x);
        };
      };
    }));
  })(ka)), ka.exports;
}
var ob = ab();
const ib = /* @__PURE__ */ $r(ob);
var $a = { exports: {} }, sb = $a.exports, Fl;
function lb() {
  return Fl || (Fl = 1, (function(t, e) {
    (function(a, r) {
      t.exports = r();
    })(sb, (function() {
      var a = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, r = {};
      return function(n, o, i) {
        var s, l = function(p, h, g) {
          g === void 0 && (g = {});
          var m = new Date(p), y = (function(w, k) {
            k === void 0 && (k = {});
            var I = k.timeZoneName || "short", f = w + "|" + I, x = r[f];
            return x || (x = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: w, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: I }), r[f] = x), x;
          })(h, g);
          return y.formatToParts(m);
        }, u = function(p, h) {
          for (var g = l(p, h), m = [], y = 0; y < g.length; y += 1) {
            var w = g[y], k = w.type, I = w.value, f = a[k];
            f >= 0 && (m[f] = parseInt(I, 10));
          }
          var x = m[3], E = x === 24 ? 0 : x, N = m[0] + "-" + m[1] + "-" + m[2] + " " + E + ":" + m[4] + ":" + m[5] + ":000", z = +p;
          return (i.utc(N).valueOf() - (z -= z % 1e3)) / 6e4;
        }, c = o.prototype;
        c.tz = function(p, h) {
          p === void 0 && (p = s);
          var g, m = this.utcOffset(), y = this.toDate(), w = y.toLocaleString("en-US", { timeZone: p }), k = Math.round((y - new Date(w)) / 1e3 / 60), I = 15 * -Math.round(y.getTimezoneOffset() / 15) - k;
          if (!Number(I)) g = this.utcOffset(0, h);
          else if (g = i(w, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(I, !0), h) {
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
          var m = g && h, y = g || h || s, w = u(+i(), y);
          if (typeof p != "string") return i(p).tz(y);
          var k = (function(E, N, z) {
            var O = E - 60 * N * 1e3, P = u(O, z);
            if (N === P) return [O, N];
            var M = u(O -= 60 * (P - N) * 1e3, z);
            return P === M ? [O, P] : [E - 60 * Math.min(P, M) * 1e3, Math.max(P, M)];
          })(i.utc(p, m).valueOf(), w, y), I = k[0], f = k[1], x = i(I).utcOffset(f);
          return x.$x.$timezone = y, x;
        }, i.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, i.tz.setDefault = function(p) {
          s = p;
        };
      };
    }));
  })($a)), $a.exports;
}
var cb = lb();
const ub = /* @__PURE__ */ $r(cb);
var Ra = { exports: {} }, db = Ra.exports, Bl;
function fb() {
  return Bl || (Bl = 1, (function(t, e) {
    (function(a, r) {
      t.exports = r();
    })(db, (function() {
      var a = "minute", r = /[+-]\d\d(?::?\d\d)?/g, n = /([+-]|\d\d)/g;
      return function(o, i, s) {
        var l = i.prototype;
        s.utc = function(m) {
          var y = { date: m, utc: !0, args: arguments };
          return new i(y);
        }, l.utc = function(m) {
          var y = s(this.toDate(), { locale: this.$L, utc: !0 });
          return m ? y.add(this.utcOffset(), a) : y;
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
        l.utcOffset = function(m, y) {
          var w = this.$utils().u;
          if (w(m)) return this.$u ? 0 : w(this.$offset) ? d.call(this) : this.$offset;
          if (typeof m == "string" && (m = (function(x) {
            x === void 0 && (x = "");
            var E = x.match(r);
            if (!E) return null;
            var N = ("" + E[0]).match(n) || ["-", 0, 0], z = N[0], O = 60 * +N[1] + +N[2];
            return O === 0 ? 0 : z === "+" ? O : -O;
          })(m), m === null)) return this;
          var k = Math.abs(m) <= 16 ? 60 * m : m;
          if (k === 0) return this.utc(y);
          var I = this.clone();
          if (y) return I.$offset = k, I.$u = !1, I;
          var f = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          return (I = this.local().add(k + f, a)).$offset = k, I.$x.$localOffset = f, I;
        };
        var p = l.format;
        l.format = function(m) {
          var y = m || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return p.call(this, y);
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
        l.diff = function(m, y, w) {
          if (m && this.$u === m.$u) return g.call(this, m, y, w);
          var k = this.local(), I = s(m).local();
          return g.call(k, I, y, w);
        };
      };
    }));
  })(Ra)), Ra.exports;
}
var pb = fb();
const hb = /* @__PURE__ */ $r(pb);
eo.extend(ub);
eo.extend(hb);
eo.extend(ib);
function mb(t, e, a = "HH:mm:ss") {
  return eo(t).tz(e).format(a);
}
var gc;
const gb = ((gc = Intl.DateTimeFormat().resolvedOptions().timeZone) == null ? void 0 : gc.toString()) || "UTC", vb = (t) => typeof t == "string" ? t === "" ? /* @__PURE__ */ new Date() : new Date(t) : t, bb = (t, e = gb) => {
  const a = vb(t);
  return `${mb(
    a,
    e,
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  )}`;
}, yb = "INFO", xb = "INFO", Sb = "WARN", Cb = "ERROR", wb = "FAILED", Eb = "SUCCEEDED", Tu = ar(
  (t) => fr({
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
      backgroundColor: Ue("#ccd1f2", 1)
    },
    traceIdAvailableLogLine: {
      backgroundColor: "#E5E4E2",
      cursor: "point"
    },
    whiteBackground: {
      backgroundColor: t.palette.common.white
    },
    logLineWrapper: { display: "flex" },
    expandedLogKey: {
      width: t.spacing(35),
      paddingLeft: t.spacing(0.5)
    },
    defaultLogLine: {
      fontFamily: "Droid Sans Mono",
      minWidth: "100%",
      paddingLeft: t.spacing(0.4),
      fontSize: t.spacing(1.375),
      transitionDuration: "0.25s",
      transitionProperty: "background-color",
      overflow: "visible",
      minHeight: t.spacing(3),
      display: "inline-flex",
      diplayDirection: "row",
      "& $actionContainer": {
        visibility: "hidden"
      },
      "&:hover": {
        background: Ue("#E5E4E2", 1)
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
      lineHeight: t.spacing(0.25),
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
      top: t.spacing(-4),
      padding: t.spacing(0.5),
      color: t.palette.primary.main,
      display: "flex",
      background: t.palette.common.white,
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.19)",
      userSelect: "none",
      borderRadius: t.spacing(0.625),
      position: "absolute",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: t.palette.common.white
      }
    },
    logEntryActions: {
      position: "relative",
      display: "flex",
      paddingRight: t.spacing(1.25)
    },
    actionContainer: {
      top: t.spacing(-6),
      padding: t.spacing(0.5),
      display: "flex",
      width: "max-content",
      background: t.palette.common.white,
      position: "absolute",
      cursor: "pointer",
      border: `1px solid ${t.palette.grey[100]}`,
      borderColor: t.palette.grey[100],
      borderRadius: t.spacing(0.625),
      backgroundColor: t.palette.common.white,
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.19)"
    },
    actionButton: {
      display: "flex",
      alignItems: "center",
      padding: `${t.spacing(0.5)}px ${t.spacing(1)}px`,
      gap: t.spacing(0.5),
      height: t.spacing(3),
      backgroundColor: Ue(t.palette.common.white, 0),
      flex: "none",
      border: t.palette.grey[100],
      cursor: "pointer",
      "&:hover": {
        "& $actionIcon": {
          color: t.palette.primary.light
        },
        "& $actionLabel": {
          color: t.palette.primary.light
        }
      }
    },
    actionIcon: {
      width: t.spacing(1.625),
      height: t.spacing(1.625),
      color: t.palette.primary.main
    },
    actionLabel: {
      fontFamily: t.typography.fontFamily,
      fontWeight: 400,
      fontSize: t.spacing(1.625),
      lineHeight: t.spacing(0.23),
      color: t.palette.primary.main
    },
    errorLogs: {
      color: "#EA4C4D",
      lineHeight: t.spacing(0.25)
    },
    infoLogs: {
      color: "#53C08A",
      lineHeight: t.spacing(0.25)
    },
    warningLogs: {
      color: "#FF9D52",
      lineHeight: t.spacing(0.25)
    },
    logOther: {
      color: t.palette.secondary.dark,
      lineHeight: t.spacing(0.25)
    },
    logContextKeyValue: {
      color: "#0095ff"
    },
    logMsg: {
      lineHeight: t.spacing(0.25),
      display: "inline",
      overflow: "visible",
      whiteSpace: "nowrap",
      "&:hover": {
        "& $actionContainer": {
          visibility: "visible",
          animation: "$animFade 250ms 1",
          backgroundColor: t.palette.common.white
        }
      }
    },
    infoSection: {
      display: "inline",
      whiteSpace: "nowrap"
    },
    arrow: {
      color: t.palette.primary.main,
      fontSize: t.spacing(1),
      lineHeight: t.spacing(0.25),
      padding: t.spacing(0.5),
      cursor: "pointer"
    },
    logContextDivider: {
      color: t.palette.divider
    },
    lastLogTimeStamp: {
      borderBottom: `1px dashed ${t.palette.primary.main}`
    },
    // Note: Added important to avoid overriding by virtualize lib
    // Note: Added type casting to 'auto !important' as 'auto' to avoid type error
    logsList: {
      overflowX: "auto !important"
    },
    expandedLogRow: {
      width: "fit-content",
      borderBottom: "1px solid #E5E4E2",
      padding: t.spacing(0.5, 0),
      display: "flex",
      backgroundColor: t.palette.common.white
    },
    tableContainer: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: t.spacing(8),
      overflowX: "visible",
      whiteSpace: "nowrap"
    },
    logsListContainer: {
      width: "100%",
      height: "100%",
      paddingLeft: t.spacing(2),
      backgroundColor: t.palette.common.white
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
var Ta = { exports: {} }, kb = Ta.exports, zl;
function $b() {
  return zl || (zl = 1, (function(t, e) {
    (function(a, r) {
      t.exports = r(ht);
    })(kb, (function(a) {
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
          var m, y, w, k = p & d.F, I = p & d.G, f = p & d.S, x = p & d.P, E = p & d.B, N = p & d.W, z = I ? s : s[h] || (s[h] = {}), O = z.prototype, P = I ? i : f ? i[h] : (i[h] || {}).prototype;
          for (m in I && (g = h), g) (y = !k && P && P[m] !== void 0) && c(z, m) || (w = y ? P[m] : g[m], z[m] = I && typeof P[m] != "function" ? g[m] : E && y ? l(w, i) : N && P[m] == w ? (function(M) {
            var v = function(C, D, L) {
              if (this instanceof M) {
                switch (arguments.length) {
                  case 0:
                    return new M();
                  case 1:
                    return new M(C);
                  case 2:
                    return new M(C, D);
                }
                return new M(C, D, L);
              }
              return M.apply(this, arguments);
            };
            return v.prototype = M.prototype, v;
          })(w) : x && typeof w == "function" ? l(Function.call, w) : w, x && ((z.virtual || (z.virtual = {}))[m] = w, p & d.R && O && !O[m] && u(O, m, w)));
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
        var i = o(14), s = o(15), l = o(37), u = o(6), c = o(12), d = o(55), p = o(28), h = o(61), g = o(2)("iterator"), m = !([].keys && "next" in [].keys()), y = function() {
          return this;
        };
        r.exports = function(w, k, I, f, x, E, N) {
          d(I, k, f);
          var z, O, P, M = function(B) {
            if (!m && B in L) return L[B];
            switch (B) {
              case "keys":
              case "values":
                return function() {
                  return new I(this, B);
                };
            }
            return function() {
              return new I(this, B);
            };
          }, v = k + " Iterator", C = x == "values", D = !1, L = w.prototype, R = L[g] || L["@@iterator"] || x && L[x], W = R || M(x), F = x ? C ? M("entries") : W : void 0, G = k == "Array" && L.entries || R;
          if (G && (P = h(G.call(new w()))) !== Object.prototype && P.next && (p(P, v, !0), i || typeof P[g] == "function" || u(P, g, y)), C && R && R.name !== "values" && (D = !0, W = function() {
            return R.call(this);
          }), i && !N || !m && !D && L[g] || u(L, g, W), c[k] = W, c[v] = y, x) if (z = { values: C ? W : M("values"), keys: E ? W : M("keys"), entries: F }, N) for (O in z) O in L || l(L, O, z[O]);
          else s(s.P + s.F * (m || D), k, z);
          return z;
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
        var i = y(o(49)), s = y(o(76)), l = y(o(81)), u = y(o(89)), c = y(o(93)), d = (function(O) {
          if (O && O.__esModule) return O;
          var P = {};
          if (O != null) for (var M in O) Object.prototype.hasOwnProperty.call(O, M) && (P[M] = O[M]);
          return P.default = O, P;
        })(o(94)), p = y(o(132)), h = y(o(133)), g = y(o(138)), m = o(139);
        function y(O) {
          return O && O.__esModule ? O : { default: O };
        }
        var w = d.default, k = (0, u.default)(w), I = (0, g.default)(h.default, m.rgb2yuv, (function(O) {
          var P, M = (0, l.default)(O, 3), v = M[0], C = M[1], D = M[2];
          return [(P = v, P < 0.25 ? 1 : P < 0.5 ? 0.9 - P : 1.1 - P), C, D];
        }), m.yuv2rgb, p.default), f = function(O) {
          return function(P) {
            return { className: [P.className, O.className].filter(Boolean).join(" "), style: (0, s.default)({}, P.style || {}, O.style || {}) };
          };
        }, x = function(O, P) {
          var M = (0, u.default)(P);
          for (var v in O) M.indexOf(v) === -1 && M.push(v);
          return M.reduce((function(C, D) {
            return C[D] = (function(L, R) {
              if (L === void 0) return R;
              if (R === void 0) return L;
              var W = L === void 0 ? "undefined" : (0, i.default)(L), F = R === void 0 ? "undefined" : (0, i.default)(R);
              switch (W) {
                case "string":
                  switch (F) {
                    case "string":
                      return [R, L].filter(Boolean).join(" ");
                    case "object":
                      return f({ className: L, style: R });
                    case "function":
                      return function(G) {
                        for (var B = arguments.length, Z = Array(B > 1 ? B - 1 : 0), Q = 1; Q < B; Q++) Z[Q - 1] = arguments[Q];
                        return f({ className: L })(R.apply(void 0, [G].concat(Z)));
                      };
                  }
                case "object":
                  switch (F) {
                    case "string":
                      return f({ className: R, style: L });
                    case "object":
                      return (0, s.default)({}, R, L);
                    case "function":
                      return function(G) {
                        for (var B = arguments.length, Z = Array(B > 1 ? B - 1 : 0), Q = 1; Q < B; Q++) Z[Q - 1] = arguments[Q];
                        return f({ style: L })(R.apply(void 0, [G].concat(Z)));
                      };
                  }
                case "function":
                  switch (F) {
                    case "string":
                      return function(G) {
                        for (var B = arguments.length, Z = Array(B > 1 ? B - 1 : 0), Q = 1; Q < B; Q++) Z[Q - 1] = arguments[Q];
                        return L.apply(void 0, [f(G)({ className: R })].concat(Z));
                      };
                    case "object":
                      return function(G) {
                        for (var B = arguments.length, Z = Array(B > 1 ? B - 1 : 0), Q = 1; Q < B; Q++) Z[Q - 1] = arguments[Q];
                        return L.apply(void 0, [f(G)({ style: R })].concat(Z));
                      };
                    case "function":
                      return function(G) {
                        for (var B = arguments.length, Z = Array(B > 1 ? B - 1 : 0), Q = 1; Q < B; Q++) Z[Q - 1] = arguments[Q];
                        return L.apply(void 0, [R.apply(void 0, [G].concat(Z))].concat(Z));
                      };
                  }
              }
            })(O[D], P[D]), C;
          }), {});
        }, E = function(O, P) {
          for (var M = arguments.length, v = Array(M > 2 ? M - 2 : 0), C = 2; C < M; C++) v[C - 2] = arguments[C];
          if (P === null) return O;
          Array.isArray(P) || (P = [P]);
          var D = P.map((function(R) {
            return O[R];
          })).filter(Boolean), L = D.reduce((function(R, W) {
            return typeof W == "string" ? R.className = [R.className, W].filter(Boolean).join(" ") : (W === void 0 ? "undefined" : (0, i.default)(W)) === "object" ? R.style = (0, s.default)({}, R.style, W) : typeof W == "function" && (R = (0, s.default)({}, R, W.apply(void 0, [R].concat(v)))), R;
          }), { className: "", style: {} });
          return L.className || delete L.className, (0, u.default)(L.style).length === 0 && delete L.style, L;
        }, N = n.invertTheme = function(O) {
          return (0, u.default)(O).reduce((function(P, M) {
            return P[M] = /^base/.test(M) ? I(O[M]) : M === "scheme" ? O[M] + ":inverted" : O[M], P;
          }), {});
        }, z = (n.createStyling = (0, c.default)((function(O) {
          for (var P = arguments.length, M = Array(P > 3 ? P - 3 : 0), v = 3; v < P; v++) M[v - 3] = arguments[v];
          var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, D = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, L = C.defaultBase16, R = L === void 0 ? w : L, W = C.base16Themes, F = W === void 0 ? null : W, G = z(D, F);
          G && (D = (0, s.default)({}, G, D));
          var B = k.reduce((function(ue, xe) {
            return ue[xe] = D[xe] || R[xe], ue;
          }), {}), Z = (0, u.default)(D).reduce((function(ue, xe) {
            return k.indexOf(xe) === -1 && (ue[xe] = D[xe]), ue;
          }), {}), Q = O(B), de = x(Z, Q);
          return (0, c.default)(E, 2).apply(void 0, [de].concat(M));
        }), 3), n.getBase16Theme = function(O, P) {
          if (O && O.extend && (O = O.extend), typeof O == "string") {
            var M = O.split(":"), v = (0, l.default)(M, 2), C = v[0], D = v[1];
            O = (P || {})[C] || d[C], D === "inverted" && (O = N(O));
          }
          return O && O.hasOwnProperty("base00") ? O : void 0;
        });
      }, function(r, n, o) {
        var i, s = typeof Reflect == "object" ? Reflect : null, l = s && typeof s.apply == "function" ? s.apply : function(f, x, E) {
          return Function.prototype.apply.call(f, x, E);
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
          return new Promise((function(E, N) {
            function z() {
              O !== void 0 && f.removeListener("error", O), E([].slice.call(arguments));
            }
            var O;
            x !== "error" && (O = function(P) {
              f.removeListener(x, z), N(P);
            }, f.once("error", O)), f.once(x, z);
          }));
        }, c.EventEmitter = c, c.prototype._events = void 0, c.prototype._eventsCount = 0, c.prototype._maxListeners = void 0;
        var d = 10;
        function p(f) {
          if (typeof f != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof f);
        }
        function h(f) {
          return f._maxListeners === void 0 ? c.defaultMaxListeners : f._maxListeners;
        }
        function g(f, x, E, N) {
          var z, O, P, M;
          if (p(E), (O = f._events) === void 0 ? (O = f._events = /* @__PURE__ */ Object.create(null), f._eventsCount = 0) : (O.newListener !== void 0 && (f.emit("newListener", x, E.listener ? E.listener : E), O = f._events), P = O[x]), P === void 0) P = O[x] = E, ++f._eventsCount;
          else if (typeof P == "function" ? P = O[x] = N ? [E, P] : [P, E] : N ? P.unshift(E) : P.push(E), (z = h(f)) > 0 && P.length > z && !P.warned) {
            P.warned = !0;
            var v = new Error("Possible EventEmitter memory leak detected. " + P.length + " " + String(x) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            v.name = "MaxListenersExceededWarning", v.emitter = f, v.type = x, v.count = P.length, M = v, console && console.warn && console.warn(M);
          }
          return f;
        }
        function m() {
          if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
        }
        function y(f, x, E) {
          var N = { fired: !1, wrapFn: void 0, target: f, type: x, listener: E }, z = m.bind(N);
          return z.listener = E, N.wrapFn = z, z;
        }
        function w(f, x, E) {
          var N = f._events;
          if (N === void 0) return [];
          var z = N[x];
          return z === void 0 ? [] : typeof z == "function" ? E ? [z.listener || z] : [z] : E ? (function(O) {
            for (var P = new Array(O.length), M = 0; M < P.length; ++M) P[M] = O[M].listener || O[M];
            return P;
          })(z) : I(z, z.length);
        }
        function k(f) {
          var x = this._events;
          if (x !== void 0) {
            var E = x[f];
            if (typeof E == "function") return 1;
            if (E !== void 0) return E.length;
          }
          return 0;
        }
        function I(f, x) {
          for (var E = new Array(x), N = 0; N < x; ++N) E[N] = f[N];
          return E;
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
          for (var x = [], E = 1; E < arguments.length; E++) x.push(arguments[E]);
          var N = f === "error", z = this._events;
          if (z !== void 0) N = N && z.error === void 0;
          else if (!N) return !1;
          if (N) {
            var O;
            if (x.length > 0 && (O = x[0]), O instanceof Error) throw O;
            var P = new Error("Unhandled error." + (O ? " (" + O.message + ")" : ""));
            throw P.context = O, P;
          }
          var M = z[f];
          if (M === void 0) return !1;
          if (typeof M == "function") l(M, this, x);
          else {
            var v = M.length, C = I(M, v);
            for (E = 0; E < v; ++E) l(C[E], this, x);
          }
          return !0;
        }, c.prototype.addListener = function(f, x) {
          return g(this, f, x, !1);
        }, c.prototype.on = c.prototype.addListener, c.prototype.prependListener = function(f, x) {
          return g(this, f, x, !0);
        }, c.prototype.once = function(f, x) {
          return p(x), this.on(f, y(this, f, x)), this;
        }, c.prototype.prependOnceListener = function(f, x) {
          return p(x), this.prependListener(f, y(this, f, x)), this;
        }, c.prototype.removeListener = function(f, x) {
          var E, N, z, O, P;
          if (p(x), (N = this._events) === void 0) return this;
          if ((E = N[f]) === void 0) return this;
          if (E === x || E.listener === x) --this._eventsCount == 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete N[f], N.removeListener && this.emit("removeListener", f, E.listener || x));
          else if (typeof E != "function") {
            for (z = -1, O = E.length - 1; O >= 0; O--) if (E[O] === x || E[O].listener === x) {
              P = E[O].listener, z = O;
              break;
            }
            if (z < 0) return this;
            z === 0 ? E.shift() : (function(M, v) {
              for (; v + 1 < M.length; v++) M[v] = M[v + 1];
              M.pop();
            })(E, z), E.length === 1 && (N[f] = E[0]), N.removeListener !== void 0 && this.emit("removeListener", f, P || x);
          }
          return this;
        }, c.prototype.off = c.prototype.removeListener, c.prototype.removeAllListeners = function(f) {
          var x, E, N;
          if ((E = this._events) === void 0) return this;
          if (E.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : E[f] !== void 0 && (--this._eventsCount == 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete E[f]), this;
          if (arguments.length === 0) {
            var z, O = Object.keys(E);
            for (N = 0; N < O.length; ++N) (z = O[N]) !== "removeListener" && this.removeAllListeners(z);
            return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
          }
          if (typeof (x = E[f]) == "function") this.removeListener(f, x);
          else if (x !== void 0) for (N = x.length - 1; N >= 0; N--) this.removeListener(f, x[N]);
          return this;
        }, c.prototype.listeners = function(f) {
          return w(this, f, !0);
        }, c.prototype.rawListeners = function(f) {
          return w(this, f, !1);
        }, c.listenerCount = function(f, x) {
          return typeof f.listenerCount == "function" ? f.listenerCount(x) : k.call(f, x);
        }, c.prototype.listenerCount = k, c.prototype.eventNames = function() {
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
            var h, g = i(c), m = s(g.length), y = l(p, m);
            if (u && d != d) {
              for (; m > y; ) if ((h = g[y++]) != h) return !0;
            } else for (; m > y; y++) if ((u || y in g) && g[y] === d) return u || y || 0;
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
        var i = o(3), s = o(5), l = o(4), u = o(15), c = o(37), d = o(68).KEY, p = o(8), h = o(26), g = o(28), m = o(17), y = o(2), w = o(30), k = o(31), I = o(69), f = o(70), x = o(10), E = o(11), N = o(18), z = o(9), O = o(23), P = o(16), M = o(38), v = o(71), C = o(72), D = o(32), L = o(7), R = o(13), W = C.f, F = L.f, G = v.f, B = i.Symbol, Z = i.JSON, Q = Z && Z.stringify, de = y("_hidden"), ue = y("toPrimitive"), xe = {}.propertyIsEnumerable, fe = h("symbol-registry"), ve = h("symbols"), ge = h("op-symbols"), Se = Object.prototype, Ee = typeof B == "function" && !!D.f, ie = i.QObject, pe = !ie || !ie.prototype || !ie.prototype.findChild, we = l && p((function() {
          return M(F({}, "a", { get: function() {
            return F(this, "a", { value: 7 }).a;
          } })).a != 7;
        })) ? function(K, te, oe) {
          var be = W(Se, te);
          be && delete Se[te], F(K, te, oe), be && K !== Se && F(Se, te, be);
        } : F, Ce = function(K) {
          var te = ve[K] = M(B.prototype);
          return te._k = K, te;
        }, Ye = Ee && typeof B.iterator == "symbol" ? function(K) {
          return typeof K == "symbol";
        } : function(K) {
          return K instanceof B;
        }, Oe = function(K, te, oe) {
          return K === Se && Oe(ge, te, oe), x(K), te = O(te, !0), x(oe), s(ve, te) ? (oe.enumerable ? (s(K, de) && K[de][te] && (K[de][te] = !1), oe = M(oe, { enumerable: P(0, !1) })) : (s(K, de) || F(K, de, P(1, {})), K[de][te] = !0), we(K, te, oe)) : F(K, te, oe);
        }, Fe = function(K, te) {
          x(K);
          for (var oe, be = I(te = z(te)), Ie = 0, ye = be.length; ye > Ie; ) Oe(K, oe = be[Ie++], te[oe]);
          return K;
        }, qe = function(K) {
          var te = xe.call(this, K = O(K, !0));
          return !(this === Se && s(ve, K) && !s(ge, K)) && (!(te || !s(this, K) || !s(ve, K) || s(this, de) && this[de][K]) || te);
        }, Xe = function(K, te) {
          if (K = z(K), te = O(te, !0), K !== Se || !s(ve, te) || s(ge, te)) {
            var oe = W(K, te);
            return !oe || !s(ve, te) || s(K, de) && K[de][te] || (oe.enumerable = !0), oe;
          }
        }, nt = function(K) {
          for (var te, oe = G(z(K)), be = [], Ie = 0; oe.length > Ie; ) s(ve, te = oe[Ie++]) || te == de || te == d || be.push(te);
          return be;
        }, et = function(K) {
          for (var te, oe = K === Se, be = G(oe ? ge : z(K)), Ie = [], ye = 0; be.length > ye; ) !s(ve, te = be[ye++]) || oe && !s(Se, te) || Ie.push(ve[te]);
          return Ie;
        };
        Ee || (c((B = function() {
          if (this instanceof B) throw TypeError("Symbol is not a constructor!");
          var K = m(arguments.length > 0 ? arguments[0] : void 0), te = function(oe) {
            this === Se && te.call(ge, oe), s(this, de) && s(this[de], K) && (this[de][K] = !1), we(this, K, P(1, oe));
          };
          return l && pe && we(Se, K, { configurable: !0, set: te }), Ce(K);
        }).prototype, "toString", (function() {
          return this._k;
        })), C.f = Xe, L.f = Oe, o(41).f = v.f = nt, o(19).f = qe, D.f = et, l && !o(14) && c(Se, "propertyIsEnumerable", qe, !0), w.f = function(K) {
          return Ce(y(K));
        }), u(u.G + u.W + u.F * !Ee, { Symbol: B });
        for (var Ve = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), Le = 0; Ve.length > Le; ) y(Ve[Le++]);
        for (var ze = R(y.store), ee = 0; ze.length > ee; ) k(ze[ee++]);
        u(u.S + u.F * !Ee, "Symbol", { for: function(K) {
          return s(fe, K += "") ? fe[K] : fe[K] = B(K);
        }, keyFor: function(K) {
          if (!Ye(K)) throw TypeError(K + " is not a symbol!");
          for (var te in fe) if (fe[te] === K) return te;
        }, useSetter: function() {
          pe = !0;
        }, useSimple: function() {
          pe = !1;
        } }), u(u.S + u.F * !Ee, "Object", { create: function(K, te) {
          return te === void 0 ? M(K) : Fe(M(K), te);
        }, defineProperty: Oe, defineProperties: Fe, getOwnPropertyDescriptor: Xe, getOwnPropertyNames: nt, getOwnPropertySymbols: et });
        var H = p((function() {
          D.f(1);
        }));
        u(u.S + u.F * H, "Object", { getOwnPropertySymbols: function(K) {
          return D.f(N(K));
        } }), Z && u(u.S + u.F * (!Ee || p((function() {
          var K = B();
          return Q([K]) != "[null]" || Q({ a: K }) != "{}" || Q(Object(K)) != "{}";
        }))), "JSON", { stringify: function(K) {
          for (var te, oe, be = [K], Ie = 1; arguments.length > Ie; ) be.push(arguments[Ie++]);
          if (oe = te = be[1], (E(te) || K !== void 0) && !Ye(K)) return f(te) || (te = function(ye, me) {
            if (typeof oe == "function" && (me = oe.call(this, ye, me)), !Ye(me)) return me;
          }), be[1] = te, Q.apply(Z, be);
        } }), B.prototype[ue] || o(6)(B.prototype, ue, B.prototype.valueOf), g(B, "Symbol"), g(Math, "Math", !0), g(i.JSON, "JSON", !0);
      }, function(r, n, o) {
        var i = o(17)("meta"), s = o(11), l = o(5), u = o(7).f, c = 0, d = Object.isExtensible || function() {
          return !0;
        }, p = !o(8)((function() {
          return d(Object.preventExtensions({}));
        })), h = function(m) {
          u(m, i, { value: { i: "O" + ++c, w: {} } });
        }, g = r.exports = { KEY: i, NEED: !1, fastKey: function(m, y) {
          if (!s(m)) return typeof m == "symbol" ? m : (typeof m == "string" ? "S" : "P") + m;
          if (!l(m, i)) {
            if (!d(m)) return "F";
            if (!y) return "E";
            h(m);
          }
          return m[i].i;
        }, getWeak: function(m, y) {
          if (!l(m, i)) {
            if (!d(m)) return !0;
            if (!y) return !1;
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
          var h = {}, g = {}, m = Symbol(), y = "abcdefghijklmnopqrst";
          return h[m] = 7, y.split("").forEach((function(w) {
            g[w] = w;
          })), p({}, h)[m] != 7 || Object.keys(p({}, g)).join("") != y;
        })) ? function(h, g) {
          for (var m = c(h), y = arguments.length, w = 1, k = l.f, I = u.f; y > w; ) for (var f, x = d(arguments[w++]), E = k ? s(x).concat(k(x)) : s(x), N = E.length, z = 0; N > z; ) f = E[z++], i && !I.call(x, f) || (m[f] = x[f]);
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
            var h = [], g = !0, m = !1, y = void 0;
            try {
              for (var w, k = (0, s.default)(d); !(g = (w = k.next()).done) && (h.push(w.value), !p || h.length !== p); g = !0) ;
            } catch (I) {
              m = !0, y = I;
            } finally {
              try {
                !g && k.return && k.return();
              } finally {
                if (m) throw y;
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
          var s = [["ary", 128], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", 32], ["partialRight", 64], ["rearg", 256]], l = /^\s+|\s+$/g, u = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, c = /\{\n\/\* \[wrapped with (.+)\] \*/, d = /,? & /, p = /^[-+]0x[0-9a-f]+$/i, h = /^0b[01]+$/i, g = /^\[object .+?Constructor\]$/, m = /^0o[0-7]+$/i, y = /^(?:0|[1-9]\d*)$/, w = parseInt, k = typeof i == "object" && i && i.Object === Object && i, I = typeof self == "object" && self && self.Object === Object && self, f = k || I || Function("return this")();
          function x(ee, H, K) {
            switch (K.length) {
              case 0:
                return ee.call(H);
              case 1:
                return ee.call(H, K[0]);
              case 2:
                return ee.call(H, K[0], K[1]);
              case 3:
                return ee.call(H, K[0], K[1], K[2]);
            }
            return ee.apply(H, K);
          }
          function E(ee, H) {
            return !!(ee && ee.length) && (function(K, te, oe) {
              if (te != te) return (function(ye, me, De, Be) {
                for (var Te = ye.length, se = De + -1; ++se < Te; ) if (me(ye[se], se, ye)) return se;
                return -1;
              })(K, N, oe);
              for (var be = oe - 1, Ie = K.length; ++be < Ie; ) if (K[be] === te) return be;
              return -1;
            })(ee, H, 0) > -1;
          }
          function N(ee) {
            return ee != ee;
          }
          function z(ee, H) {
            for (var K = ee.length, te = 0; K--; ) ee[K] === H && te++;
            return te;
          }
          function O(ee, H) {
            for (var K = -1, te = ee.length, oe = 0, be = []; ++K < te; ) {
              var Ie = ee[K];
              Ie !== H && Ie !== "__lodash_placeholder__" || (ee[K] = "__lodash_placeholder__", be[oe++] = K);
            }
            return be;
          }
          var P, M, v, C = Function.prototype, D = Object.prototype, L = f["__core-js_shared__"], R = (P = /[^.]+$/.exec(L && L.keys && L.keys.IE_PROTO || "")) ? "Symbol(src)_1." + P : "", W = C.toString, F = D.hasOwnProperty, G = D.toString, B = RegExp("^" + W.call(F).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Z = Object.create, Q = Math.max, de = Math.min, ue = (M = Ce(Object, "defineProperty"), (v = Ce.name) && v.length > 2 ? M : void 0);
          function xe(ee) {
            return Ve(ee) ? Z(ee) : {};
          }
          function fe(ee) {
            return !(!Ve(ee) || (function(H) {
              return !!R && R in H;
            })(ee)) && ((function(H) {
              var K = Ve(H) ? G.call(H) : "";
              return K == "[object Function]" || K == "[object GeneratorFunction]";
            })(ee) || (function(H) {
              var K = !1;
              if (H != null && typeof H.toString != "function") try {
                K = !!(H + "");
              } catch {
              }
              return K;
            })(ee) ? B : g).test((function(H) {
              if (H != null) {
                try {
                  return W.call(H);
                } catch {
                }
                try {
                  return H + "";
                } catch {
                }
              }
              return "";
            })(ee));
          }
          function ve(ee, H, K, te) {
            for (var oe = -1, be = ee.length, Ie = K.length, ye = -1, me = H.length, De = Q(be - Ie, 0), Be = Array(me + De), Te = !te; ++ye < me; ) Be[ye] = H[ye];
            for (; ++oe < Ie; ) (Te || oe < be) && (Be[K[oe]] = ee[oe]);
            for (; De--; ) Be[ye++] = ee[oe++];
            return Be;
          }
          function ge(ee, H, K, te) {
            for (var oe = -1, be = ee.length, Ie = -1, ye = K.length, me = -1, De = H.length, Be = Q(be - ye, 0), Te = Array(Be + De), se = !te; ++oe < Be; ) Te[oe] = ee[oe];
            for (var ke = oe; ++me < De; ) Te[ke + me] = H[me];
            for (; ++Ie < ye; ) (se || oe < be) && (Te[ke + K[Ie]] = ee[oe++]);
            return Te;
          }
          function Se(ee) {
            return function() {
              var H = arguments;
              switch (H.length) {
                case 0:
                  return new ee();
                case 1:
                  return new ee(H[0]);
                case 2:
                  return new ee(H[0], H[1]);
                case 3:
                  return new ee(H[0], H[1], H[2]);
                case 4:
                  return new ee(H[0], H[1], H[2], H[3]);
                case 5:
                  return new ee(H[0], H[1], H[2], H[3], H[4]);
                case 6:
                  return new ee(H[0], H[1], H[2], H[3], H[4], H[5]);
                case 7:
                  return new ee(H[0], H[1], H[2], H[3], H[4], H[5], H[6]);
              }
              var K = xe(ee.prototype), te = ee.apply(K, H);
              return Ve(te) ? te : K;
            };
          }
          function Ee(ee, H, K, te, oe, be, Ie, ye, me, De) {
            var Be = 128 & H, Te = 1 & H, se = 2 & H, ke = 24 & H, He = 512 & H, Je = se ? void 0 : Se(ee);
            return function at() {
              for (var Me = arguments.length, je = Array(Me), mt = Me; mt--; ) je[mt] = arguments[mt];
              if (ke) var ot = we(at), tt = z(je, ot);
              if (te && (je = ve(je, te, oe, ke)), be && (je = ge(je, be, Ie, ke)), Me -= tt, ke && Me < De) {
                var Ze = O(je, ot);
                return ie(ee, H, Ee, at.placeholder, K, je, Ze, ye, me, De - Me);
              }
              var bt = Te ? K : this, Mt = se ? bt[ee] : ee;
              return Me = je.length, ye ? je = qe(je, ye) : He && Me > 1 && je.reverse(), Be && me < Me && (je.length = me), this && this !== f && this instanceof at && (Mt = Je || Se(Mt)), Mt.apply(bt, je);
            };
          }
          function ie(ee, H, K, te, oe, be, Ie, ye, me, De) {
            var Be = 8 & H;
            H |= Be ? 32 : 64, 4 & (H &= ~(Be ? 64 : 32)) || (H &= -4);
            var Te = K(ee, H, oe, Be ? be : void 0, Be ? Ie : void 0, Be ? void 0 : be, Be ? void 0 : Ie, ye, me, De);
            return Te.placeholder = te, Xe(Te, ee, H);
          }
          function pe(ee, H, K, te, oe, be, Ie, ye) {
            var me = 2 & H;
            if (!me && typeof ee != "function") throw new TypeError("Expected a function");
            var De = te ? te.length : 0;
            if (De || (H &= -97, te = oe = void 0), Ie = Ie === void 0 ? Ie : Q(ze(Ie), 0), ye = ye === void 0 ? ye : ze(ye), De -= oe ? oe.length : 0, 64 & H) {
              var Be = te, Te = oe;
              te = oe = void 0;
            }
            var se = [ee, H, K, te, oe, Be, Te, be, Ie, ye];
            if (ee = se[0], H = se[1], K = se[2], te = se[3], oe = se[4], !(ye = se[9] = se[9] == null ? me ? 0 : ee.length : Q(se[9] - De, 0)) && 24 & H && (H &= -25), H && H != 1) ke = H == 8 || H == 16 ? (function(He, Je, at) {
              var Me = Se(He);
              return function je() {
                for (var mt = arguments.length, ot = Array(mt), tt = mt, Ze = we(je); tt--; ) ot[tt] = arguments[tt];
                var bt = mt < 3 && ot[0] !== Ze && ot[mt - 1] !== Ze ? [] : O(ot, Ze);
                if ((mt -= bt.length) < at) return ie(He, Je, Ee, je.placeholder, void 0, ot, bt, void 0, void 0, at - mt);
                var Mt = this && this !== f && this instanceof je ? Me : He;
                return x(Mt, this, ot);
              };
            })(ee, H, ye) : H != 32 && H != 33 || oe.length ? Ee.apply(void 0, se) : (function(He, Je, at, Me) {
              var je = 1 & Je, mt = Se(He);
              return function ot() {
                for (var tt = -1, Ze = arguments.length, bt = -1, Mt = Me.length, jt = Array(Mt + Ze), Tr = this && this !== f && this instanceof ot ? mt : He; ++bt < Mt; ) jt[bt] = Me[bt];
                for (; Ze--; ) jt[bt++] = arguments[++tt];
                return x(Tr, je ? at : this, jt);
              };
            })(ee, H, K, te);
            else var ke = (function(He, Je, at) {
              var Me = 1 & Je, je = Se(He);
              return function mt() {
                var ot = this && this !== f && this instanceof mt ? je : He;
                return ot.apply(Me ? at : this, arguments);
              };
            })(ee, H, K);
            return Xe(ke, ee, H);
          }
          function we(ee) {
            return ee.placeholder;
          }
          function Ce(ee, H) {
            var K = (function(te, oe) {
              return te == null ? void 0 : te[oe];
            })(ee, H);
            return fe(K) ? K : void 0;
          }
          function Ye(ee) {
            var H = ee.match(c);
            return H ? H[1].split(d) : [];
          }
          function Oe(ee, H) {
            var K = H.length, te = K - 1;
            return H[te] = (K > 1 ? "& " : "") + H[te], H = H.join(K > 2 ? ", " : " "), ee.replace(u, `{
/* [wrapped with ` + H + `] */
`);
          }
          function Fe(ee, H) {
            return !!(H = H ?? 9007199254740991) && (typeof ee == "number" || y.test(ee)) && ee > -1 && ee % 1 == 0 && ee < H;
          }
          function qe(ee, H) {
            for (var K = ee.length, te = de(H.length, K), oe = (function(Ie, ye) {
              var me = -1, De = Ie.length;
              for (ye || (ye = Array(De)); ++me < De; ) ye[me] = Ie[me];
              return ye;
            })(ee); te--; ) {
              var be = H[te];
              ee[te] = Fe(be, K) ? oe[be] : void 0;
            }
            return ee;
          }
          var Xe = ue ? function(ee, H, K) {
            var te, oe = H + "";
            return ue(ee, "toString", { configurable: !0, enumerable: !1, value: (te = Oe(oe, nt(Ye(oe), K)), function() {
              return te;
            }) });
          } : function(ee) {
            return ee;
          };
          function nt(ee, H) {
            return (function(K, te) {
              for (var oe = -1, be = K ? K.length : 0; ++oe < be && te(K[oe], oe, K) !== !1; ) ;
            })(s, (function(K) {
              var te = "_." + K[0];
              H & K[1] && !E(ee, te) && ee.push(te);
            })), ee.sort();
          }
          function et(ee, H, K) {
            var te = pe(ee, 8, void 0, void 0, void 0, void 0, void 0, H = K ? void 0 : H);
            return te.placeholder = et.placeholder, te;
          }
          function Ve(ee) {
            var H = typeof ee;
            return !!ee && (H == "object" || H == "function");
          }
          function Le(ee) {
            return ee ? (ee = (function(H) {
              if (typeof H == "number") return H;
              if ((function(oe) {
                return typeof oe == "symbol" || /* @__PURE__ */ (function(be) {
                  return !!be && typeof be == "object";
                })(oe) && G.call(oe) == "[object Symbol]";
              })(H)) return NaN;
              if (Ve(H)) {
                var K = typeof H.valueOf == "function" ? H.valueOf() : H;
                H = Ve(K) ? K + "" : K;
              }
              if (typeof H != "string") return H === 0 ? H : +H;
              H = H.replace(l, "");
              var te = h.test(H);
              return te || m.test(H) ? w(H.slice(2), te ? 2 : 8) : p.test(H) ? NaN : +H;
            })(ee)) === 1 / 0 || ee === -1 / 0 ? 17976931348623157e292 * (ee < 0 ? -1 : 1) : ee == ee ? ee : 0 : ee === 0 ? ee : 0;
          }
          function ze(ee) {
            var H = Le(ee), K = H % 1;
            return H == H ? K ? H - K : H : 0;
          }
          et.placeholder = {}, r.exports = et;
        }).call(this, o(43));
      }, function(r, n, o) {
        function i(ge) {
          return ge && ge.__esModule ? ge.default : ge;
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
        var y = o(104);
        n.brewer = i(y);
        var w = o(105);
        n.bright = i(w);
        var k = o(106);
        n.chalk = i(k);
        var I = o(107);
        n.codeschool = i(I);
        var f = o(108);
        n.colors = i(f);
        var x = o(109);
        n.default = i(x);
        var E = o(110);
        n.eighties = i(E);
        var N = o(111);
        n.embers = i(N);
        var z = o(112);
        n.flat = i(z);
        var O = o(113);
        n.google = i(O);
        var P = o(114);
        n.grayscale = i(P);
        var M = o(115);
        n.greenscreen = i(M);
        var v = o(116);
        n.harmonic = i(v);
        var C = o(117);
        n.hopscotch = i(C);
        var D = o(118);
        n.isotope = i(D);
        var L = o(119);
        n.marrakesh = i(L);
        var R = o(120);
        n.mocha = i(R);
        var W = o(121);
        n.monokai = i(W);
        var F = o(122);
        n.ocean = i(F);
        var G = o(123);
        n.paraiso = i(G);
        var B = o(124);
        n.pop = i(B);
        var Z = o(125);
        n.railscasts = i(Z);
        var Q = o(126);
        n.shapeshifter = i(Q);
        var de = o(127);
        n.solarized = i(de);
        var ue = o(128);
        n.summerfruit = i(ue);
        var xe = o(129);
        n.tomorrow = i(xe);
        var fe = o(130);
        n.tube = i(fe);
        var ve = o(131);
        n.twilight = i(ve);
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
          function c(O, P, M) {
            switch (M.length) {
              case 0:
                return O.call(P);
              case 1:
                return O.call(P, M[0]);
              case 2:
                return O.call(P, M[0], M[1]);
              case 3:
                return O.call(P, M[0], M[1], M[2]);
            }
            return O.apply(P, M);
          }
          function d(O, P) {
            for (var M = -1, v = P.length, C = O.length; ++M < v; ) O[C + M] = P[M];
            return O;
          }
          var p = Object.prototype, h = p.hasOwnProperty, g = p.toString, m = u.Symbol, y = p.propertyIsEnumerable, w = m ? m.isConcatSpreadable : void 0, k = Math.max;
          function I(O) {
            return f(O) || (function(P) {
              return (function(M) {
                return /* @__PURE__ */ (function(v) {
                  return !!v && typeof v == "object";
                })(M) && (function(v) {
                  return v != null && (function(C) {
                    return typeof C == "number" && C > -1 && C % 1 == 0 && C <= 9007199254740991;
                  })(v.length) && !(function(C) {
                    var D = (function(L) {
                      var R = typeof L;
                      return !!L && (R == "object" || R == "function");
                    })(C) ? g.call(C) : "";
                    return D == "[object Function]" || D == "[object GeneratorFunction]";
                  })(v);
                })(M);
              })(P) && h.call(P, "callee") && (!y.call(P, "callee") || g.call(P) == "[object Arguments]");
            })(O) || !!(w && O && O[w]);
          }
          var f = Array.isArray, x, E, N, z = (E = function(O) {
            var P = (O = (function(C, D, L, R, W) {
              var F = -1, G = C.length;
              for (L || (L = I), W || (W = []); ++F < G; ) {
                var B = C[F];
                L(B) ? d(W, B) : W[W.length] = B;
              }
              return W;
            })(O)).length, M = P;
            for (x; M--; ) if (typeof O[M] != "function") throw new TypeError("Expected a function");
            return function() {
              for (var v = 0, C = P ? O[v].apply(this, arguments) : arguments[0]; ++v < P; ) C = O[v].call(this, C);
              return C;
            };
          }, N = k(N === void 0 ? E.length - 1 : N, 0), function() {
            for (var O = arguments, P = -1, M = k(O.length - N, 0), v = Array(M); ++P < M; ) v[P] = O[N + P];
            P = -1;
            for (var C = Array(N + 1); ++P < N; ) C[P] = O[P];
            return C[N] = v, c(E, this, C);
          });
          r.exports = z;
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
        function i(A, j, S) {
          return j in A ? Object.defineProperty(A, j, { value: S, enumerable: !0, configurable: !0, writable: !0 }) : A[j] = S, A;
        }
        function s(A, j) {
          var S = Object.keys(A);
          if (Object.getOwnPropertySymbols) {
            var $ = Object.getOwnPropertySymbols(A);
            j && ($ = $.filter((function(_) {
              return Object.getOwnPropertyDescriptor(A, _).enumerable;
            }))), S.push.apply(S, $);
          }
          return S;
        }
        function l(A) {
          for (var j = 1; j < arguments.length; j++) {
            var S = arguments[j] != null ? arguments[j] : {};
            j % 2 ? s(Object(S), !0).forEach((function($) {
              i(A, $, S[$]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(S)) : s(Object(S)).forEach((function($) {
              Object.defineProperty(A, $, Object.getOwnPropertyDescriptor(S, $));
            }));
          }
          return A;
        }
        function u(A, j) {
          if (!(A instanceof j)) throw new TypeError("Cannot call a class as a function");
        }
        function c(A, j) {
          for (var S = 0; S < j.length; S++) {
            var $ = j[S];
            $.enumerable = $.enumerable || !1, $.configurable = !0, "value" in $ && ($.writable = !0), Object.defineProperty(A, $.key, $);
          }
        }
        function d(A, j, S) {
          return j && c(A.prototype, j), S && c(A, S), A;
        }
        function p(A, j) {
          return (p = Object.setPrototypeOf || function(S, $) {
            return S.__proto__ = $, S;
          })(A, j);
        }
        function h(A, j) {
          if (typeof j != "function" && j !== null) throw new TypeError("Super expression must either be null or a function");
          A.prototype = Object.create(j && j.prototype, { constructor: { value: A, writable: !0, configurable: !0 } }), j && p(A, j);
        }
        function g(A) {
          return (g = Object.setPrototypeOf ? Object.getPrototypeOf : function(j) {
            return j.__proto__ || Object.getPrototypeOf(j);
          })(A);
        }
        function m(A) {
          return (m = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(j) {
            return typeof j;
          } : function(j) {
            return j && typeof Symbol == "function" && j.constructor === Symbol && j !== Symbol.prototype ? "symbol" : typeof j;
          })(A);
        }
        function y(A) {
          if (A === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return A;
        }
        function w(A, j) {
          return !j || m(j) !== "object" && typeof j != "function" ? y(A) : j;
        }
        function k(A) {
          var j = (function() {
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
            var S, $ = g(A);
            if (j) {
              var _ = g(this).constructor;
              S = Reflect.construct($, arguments, _);
            } else S = $.apply(this, arguments);
            return w(this, S);
          };
        }
        o.r(n);
        var I = o(0), f = o.n(I);
        function x() {
          var A = this.constructor.getDerivedStateFromProps(this.props, this.state);
          A != null && this.setState(A);
        }
        function E(A) {
          this.setState((function(j) {
            var S = this.constructor.getDerivedStateFromProps(A, j);
            return S ?? null;
          }).bind(this));
        }
        function N(A, j) {
          try {
            var S = this.props, $ = this.state;
            this.props = A, this.state = j, this.__reactInternalSnapshotFlag = !0, this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(S, $);
          } finally {
            this.props = S, this.state = $;
          }
        }
        function z(A) {
          var j = A.prototype;
          if (!j || !j.isReactComponent) throw new Error("Can only polyfill class components");
          if (typeof A.getDerivedStateFromProps != "function" && typeof j.getSnapshotBeforeUpdate != "function") return A;
          var S = null, $ = null, _ = null;
          if (typeof j.componentWillMount == "function" ? S = "componentWillMount" : typeof j.UNSAFE_componentWillMount == "function" && (S = "UNSAFE_componentWillMount"), typeof j.componentWillReceiveProps == "function" ? $ = "componentWillReceiveProps" : typeof j.UNSAFE_componentWillReceiveProps == "function" && ($ = "UNSAFE_componentWillReceiveProps"), typeof j.componentWillUpdate == "function" ? _ = "componentWillUpdate" : typeof j.UNSAFE_componentWillUpdate == "function" && (_ = "UNSAFE_componentWillUpdate"), S !== null || $ !== null || _ !== null) {
            var q = A.displayName || A.name, re = typeof A.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            throw Error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

` + q + " uses " + re + " but also contains the following legacy lifecycles:" + (S !== null ? `
  ` + S : "") + ($ !== null ? `
  ` + $ : "") + (_ !== null ? `
  ` + _ : "") + `

The above lifecycles should be removed. Learn more about this warning here:
https://fb.me/react-async-component-lifecycle-hooks`);
          }
          if (typeof A.getDerivedStateFromProps == "function" && (j.componentWillMount = x, j.componentWillReceiveProps = E), typeof j.getSnapshotBeforeUpdate == "function") {
            if (typeof j.componentDidUpdate != "function") throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");
            j.componentWillUpdate = N;
            var J = j.componentDidUpdate;
            j.componentDidUpdate = function(V, le, Re) {
              var Ge = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : Re;
              J.call(this, V, le, Ge);
            };
          }
          return A;
        }
        function O(A, j) {
          if (A == null) return {};
          var S, $, _ = (function(re, J) {
            if (re == null) return {};
            var V, le, Re = {}, Ge = Object.keys(re);
            for (le = 0; le < Ge.length; le++) V = Ge[le], J.indexOf(V) >= 0 || (Re[V] = re[V]);
            return Re;
          })(A, j);
          if (Object.getOwnPropertySymbols) {
            var q = Object.getOwnPropertySymbols(A);
            for ($ = 0; $ < q.length; $++) S = q[$], j.indexOf(S) >= 0 || Object.prototype.propertyIsEnumerable.call(A, S) && (_[S] = A[S]);
          }
          return _;
        }
        function P(A) {
          var j = (function(S) {
            return {}.toString.call(S).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
          })(A);
          return j === "number" && (j = isNaN(A) ? "nan" : (0 | A) != A ? "float" : "integer"), j;
        }
        x.__suppressDeprecationWarning = !0, E.__suppressDeprecationWarning = !0, N.__suppressDeprecationWarning = !0;
        var M = { scheme: "rjv-default", author: "mac gainor", base00: "rgba(0, 0, 0, 0)", base01: "rgb(245, 245, 245)", base02: "rgb(235, 235, 235)", base03: "#93a1a1", base04: "rgba(0, 0, 0, 0.3)", base05: "#586e75", base06: "#073642", base07: "#002b36", base08: "#d33682", base09: "#cb4b16", base0A: "#dc322f", base0B: "#859900", base0C: "#6c71c4", base0D: "#586e75", base0E: "#2aa198", base0F: "#268bd2" }, v = { scheme: "rjv-grey", author: "mac gainor", base00: "rgba(1, 1, 1, 0)", base01: "rgba(1, 1, 1, 0.1)", base02: "rgba(0, 0, 0, 0.2)", base03: "rgba(1, 1, 1, 0.3)", base04: "rgba(0, 0, 0, 0.4)", base05: "rgba(1, 1, 1, 0.5)", base06: "rgba(1, 1, 1, 0.6)", base07: "rgba(1, 1, 1, 0.7)", base08: "rgba(1, 1, 1, 0.8)", base09: "rgba(1, 1, 1, 0.8)", base0A: "rgba(1, 1, 1, 0.8)", base0B: "rgba(1, 1, 1, 0.8)", base0C: "rgba(1, 1, 1, 0.8)", base0D: "rgba(1, 1, 1, 0.8)", base0E: "rgba(1, 1, 1, 0.8)", base0F: "rgba(1, 1, 1, 0.8)" }, C = { globalFontFamily: "monospace", globalCursor: "default", braceFontWeight: "bold", braceCursor: "pointer", ellipsisFontSize: "18px", ellipsisLineHeight: "10px", ellipsisCursor: "pointer", keyMargin: "0px 5px", keyLetterSpacing: "0.5px", keyFontStyle: "none", keyVerticalAlign: "top", keyOpacity: "0.85", keyOpacityHover: "1", keyValPaddingTop: "3px", keyValPaddingBottom: "3px", keyValPaddingRight: "5px", keyValBorderLeft: "1px solid", keyValBorderHover: "2px solid", pushedContentMarginLeft: "6px", variableValuePaddingRight: "6px", nullFontSize: "11px", nullFontWeight: "bold", nullPadding: "1px 2px", nullBorderRadius: "3px", nanFontSize: "11px", nanFontWeight: "bold", nanPadding: "1px 2px", nanBorderRadius: "3px", undefinedFontSize: "11px", undefinedPadding: "1px 2px", undefinedBorderRadius: "3px", dataTypeFontSize: "11px", dataTypeMarginRight: "4px", datatypeOpacity: "0.8", objectSizeBorderRadius: "3px", objectSizeFontStyle: "italic", objectSizeMargin: "0px 6px 0px 0px", clipboardCursor: "pointer", clipboardCheckMarginLeft: "-12px", metaDataPadding: "0px 0px 0px 10px", arrayGroupMetaPadding: "0px 0px 0px 4px", iconContainerWidth: "17px", tooltipPadding: "4px", editInputMinWidth: "130px", editInputBorderRadius: "2px", editInputPadding: "5px", editInputMarginRight: "4px", editInputFontFamily: "monospace", iconCursor: "pointer", iconFontSize: "15px", iconPaddingRight: "1px", dateValueMarginLeft: "2px", iconMarginRight: "3px", detectedRowPaddingTop: "3px", addKeyCoverBackground: "rgba(255, 255, 255, 0.3)", addKeyCoverPosition: "absolute", addKeyCoverPositionPx: "0px", addKeyModalWidth: "200px", addKeyModalMargin: "auto", addKeyModalPadding: "10px", addKeyModalRadius: "3px" }, D = o(45), L = function(A) {
          var j = (function(S) {
            return { backgroundColor: S.base00, ellipsisColor: S.base09, braceColor: S.base07, expandedIcon: S.base0D, collapsedIcon: S.base0E, keyColor: S.base07, arrayKeyColor: S.base0C, objectSize: S.base04, copyToClipboard: S.base0F, copyToClipboardCheck: S.base0D, objectBorder: S.base02, dataTypes: { boolean: S.base0E, date: S.base0D, float: S.base0B, function: S.base0D, integer: S.base0F, string: S.base09, nan: S.base08, null: S.base0A, undefined: S.base05, regexp: S.base0A, background: S.base02 }, editVariable: { editIcon: S.base0E, cancelIcon: S.base09, removeIcon: S.base09, addIcon: S.base0E, checkIcon: S.base0E, background: S.base01, color: S.base0A, border: S.base07 }, addKeyModal: { background: S.base05, border: S.base04, color: S.base0A, labelColor: S.base01 }, validationFailure: { background: S.base09, iconColor: S.base01, fontColor: S.base01 } };
          })(A);
          return { "app-container": { fontFamily: C.globalFontFamily, cursor: C.globalCursor, backgroundColor: j.backgroundColor, position: "relative" }, ellipsis: { display: "inline-block", color: j.ellipsisColor, fontSize: C.ellipsisFontSize, lineHeight: C.ellipsisLineHeight, cursor: C.ellipsisCursor }, "brace-row": { display: "inline-block", cursor: "pointer" }, brace: { display: "inline-block", cursor: C.braceCursor, fontWeight: C.braceFontWeight, color: j.braceColor }, "expanded-icon": { color: j.expandedIcon }, "collapsed-icon": { color: j.collapsedIcon }, colon: { display: "inline-block", margin: C.keyMargin, color: j.keyColor, verticalAlign: "top" }, objectKeyVal: function(S, $) {
            return { style: l({ paddingTop: C.keyValPaddingTop, paddingRight: C.keyValPaddingRight, paddingBottom: C.keyValPaddingBottom, borderLeft: C.keyValBorderLeft + " " + j.objectBorder, ":hover": { paddingLeft: $.paddingLeft - 1 + "px", borderLeft: C.keyValBorderHover + " " + j.objectBorder } }, $) };
          }, "object-key-val-no-border": { padding: C.keyValPadding }, "pushed-content": { marginLeft: C.pushedContentMarginLeft }, variableValue: function(S, $) {
            return { style: l({ display: "inline-block", paddingRight: C.variableValuePaddingRight, position: "relative" }, $) };
          }, "object-name": { display: "inline-block", color: j.keyColor, letterSpacing: C.keyLetterSpacing, fontStyle: C.keyFontStyle, verticalAlign: C.keyVerticalAlign, opacity: C.keyOpacity, ":hover": { opacity: C.keyOpacityHover } }, "array-key": { display: "inline-block", color: j.arrayKeyColor, letterSpacing: C.keyLetterSpacing, fontStyle: C.keyFontStyle, verticalAlign: C.keyVerticalAlign, opacity: C.keyOpacity, ":hover": { opacity: C.keyOpacityHover } }, "object-size": { color: j.objectSize, borderRadius: C.objectSizeBorderRadius, fontStyle: C.objectSizeFontStyle, margin: C.objectSizeMargin, cursor: "default" }, "data-type-label": { fontSize: C.dataTypeFontSize, marginRight: C.dataTypeMarginRight, opacity: C.datatypeOpacity }, boolean: { display: "inline-block", color: j.dataTypes.boolean }, date: { display: "inline-block", color: j.dataTypes.date }, "date-value": { marginLeft: C.dateValueMarginLeft }, float: { display: "inline-block", color: j.dataTypes.float }, function: { display: "inline-block", color: j.dataTypes.function, cursor: "pointer", whiteSpace: "pre-line" }, "function-value": { fontStyle: "italic" }, integer: { display: "inline-block", color: j.dataTypes.integer }, string: { display: "inline-block", color: j.dataTypes.string }, nan: { display: "inline-block", color: j.dataTypes.nan, fontSize: C.nanFontSize, fontWeight: C.nanFontWeight, backgroundColor: j.dataTypes.background, padding: C.nanPadding, borderRadius: C.nanBorderRadius }, null: { display: "inline-block", color: j.dataTypes.null, fontSize: C.nullFontSize, fontWeight: C.nullFontWeight, backgroundColor: j.dataTypes.background, padding: C.nullPadding, borderRadius: C.nullBorderRadius }, undefined: { display: "inline-block", color: j.dataTypes.undefined, fontSize: C.undefinedFontSize, padding: C.undefinedPadding, borderRadius: C.undefinedBorderRadius, backgroundColor: j.dataTypes.background }, regexp: { display: "inline-block", color: j.dataTypes.regexp }, "copy-to-clipboard": { cursor: C.clipboardCursor }, "copy-icon": { color: j.copyToClipboard, fontSize: C.iconFontSize, marginRight: C.iconMarginRight, verticalAlign: "top" }, "copy-icon-copied": { color: j.copyToClipboardCheck, marginLeft: C.clipboardCheckMarginLeft }, "array-group-meta-data": { display: "inline-block", padding: C.arrayGroupMetaPadding }, "object-meta-data": { display: "inline-block", padding: C.metaDataPadding }, "icon-container": { display: "inline-block", width: C.iconContainerWidth }, tooltip: { padding: C.tooltipPadding }, removeVarIcon: { verticalAlign: "top", display: "inline-block", color: j.editVariable.removeIcon, cursor: C.iconCursor, fontSize: C.iconFontSize, marginRight: C.iconMarginRight }, addVarIcon: { verticalAlign: "top", display: "inline-block", color: j.editVariable.addIcon, cursor: C.iconCursor, fontSize: C.iconFontSize, marginRight: C.iconMarginRight }, editVarIcon: { verticalAlign: "top", display: "inline-block", color: j.editVariable.editIcon, cursor: C.iconCursor, fontSize: C.iconFontSize, marginRight: C.iconMarginRight }, "edit-icon-container": { display: "inline-block", verticalAlign: "top" }, "check-icon": { display: "inline-block", cursor: C.iconCursor, color: j.editVariable.checkIcon, fontSize: C.iconFontSize, paddingRight: C.iconPaddingRight }, "cancel-icon": { display: "inline-block", cursor: C.iconCursor, color: j.editVariable.cancelIcon, fontSize: C.iconFontSize, paddingRight: C.iconPaddingRight }, "edit-input": { display: "inline-block", minWidth: C.editInputMinWidth, borderRadius: C.editInputBorderRadius, backgroundColor: j.editVariable.background, color: j.editVariable.color, padding: C.editInputPadding, marginRight: C.editInputMarginRight, fontFamily: C.editInputFontFamily }, "detected-row": { paddingTop: C.detectedRowPaddingTop }, "key-modal-request": { position: C.addKeyCoverPosition, top: C.addKeyCoverPositionPx, left: C.addKeyCoverPositionPx, right: C.addKeyCoverPositionPx, bottom: C.addKeyCoverPositionPx, backgroundColor: C.addKeyCoverBackground }, "key-modal": { width: C.addKeyModalWidth, backgroundColor: j.addKeyModal.background, marginLeft: C.addKeyModalMargin, marginRight: C.addKeyModalMargin, padding: C.addKeyModalPadding, borderRadius: C.addKeyModalRadius, marginTop: "15px", position: "relative" }, "key-modal-label": { color: j.addKeyModal.labelColor, marginLeft: "2px", marginBottom: "5px", fontSize: "11px" }, "key-modal-input-container": { overflow: "hidden" }, "key-modal-input": { width: "100%", padding: "3px 6px", fontFamily: "monospace", color: j.addKeyModal.color, border: "none", boxSizing: "border-box", borderRadius: "2px" }, "key-modal-cancel": { backgroundColor: j.editVariable.removeIcon, position: "absolute", top: "0px", right: "0px", borderRadius: "0px 3px 0px 3px", cursor: "pointer" }, "key-modal-cancel-icon": { color: j.addKeyModal.labelColor, fontSize: C.iconFontSize, transform: "rotate(45deg)" }, "key-modal-submit": { color: j.editVariable.addIcon, fontSize: C.iconFontSize, position: "absolute", right: "2px", top: "3px", cursor: "pointer" }, "function-ellipsis": { display: "inline-block", color: j.ellipsisColor, fontSize: C.ellipsisFontSize, lineHeight: C.ellipsisLineHeight, cursor: C.ellipsisCursor }, "validation-failure": { float: "right", padding: "3px 6px", borderRadius: "2px", cursor: "pointer", color: j.validationFailure.fontColor, backgroundColor: j.validationFailure.background }, "validation-failure-label": { marginRight: "6px" }, "validation-failure-clear": { position: "relative", verticalAlign: "top", cursor: "pointer", color: j.validationFailure.iconColor, fontSize: C.iconFontSize, transform: "rotate(45deg)" } };
        };
        function R(A, j, S) {
          return A || console.error("theme has not been set"), (function($) {
            var _ = M;
            return $ !== !1 && $ !== "none" || (_ = v), Object(D.createStyling)(L, { defaultBase16: _ })($);
          })(A)(j, S);
        }
        var W = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = ($.rjvId, $.type_name), q = $.displayDataTypes, re = $.theme;
            return q ? f.a.createElement("span", Object.assign({ className: "data-type-label" }, R(re, "data-type-label")), _) : null;
          } }]), S;
        })(f.a.PureComponent), F = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props;
            return f.a.createElement("div", R($.theme, "boolean"), f.a.createElement(W, Object.assign({ type_name: "bool" }, $)), $.value ? "true" : "false");
          } }]), S;
        })(f.a.PureComponent), G = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props;
            return f.a.createElement("div", R($.theme, "date"), f.a.createElement(W, Object.assign({ type_name: "date" }, $)), f.a.createElement("span", Object.assign({ className: "date-value" }, R($.theme, "date-value")), $.value.toLocaleTimeString("en-us", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })));
          } }]), S;
        })(f.a.PureComponent), B = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props;
            return f.a.createElement("div", R($.theme, "float"), f.a.createElement(W, Object.assign({ type_name: "float" }, $)), this.props.value);
          } }]), S;
        })(f.a.PureComponent);
        function Z(A, j) {
          (j == null || j > A.length) && (j = A.length);
          for (var S = 0, $ = new Array(j); S < j; S++) $[S] = A[S];
          return $;
        }
        function Q(A, j) {
          if (A) {
            if (typeof A == "string") return Z(A, j);
            var S = Object.prototype.toString.call(A).slice(8, -1);
            return S === "Object" && A.constructor && (S = A.constructor.name), S === "Map" || S === "Set" ? Array.from(A) : S === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(S) ? Z(A, j) : void 0;
          }
        }
        function de(A, j) {
          var S;
          if (typeof Symbol > "u" || A[Symbol.iterator] == null) {
            if (Array.isArray(A) || (S = Q(A)) || j) {
              S && (A = S);
              var $ = 0, _ = function() {
              };
              return { s: _, n: function() {
                return $ >= A.length ? { done: !0 } : { done: !1, value: A[$++] };
              }, e: function(V) {
                throw V;
              }, f: _ };
            }
            throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          var q, re = !0, J = !1;
          return { s: function() {
            S = A[Symbol.iterator]();
          }, n: function() {
            var V = S.next();
            return re = V.done, V;
          }, e: function(V) {
            J = !0, q = V;
          }, f: function() {
            try {
              re || S.return == null || S.return();
            } finally {
              if (J) throw q;
            }
          } };
        }
        function ue(A) {
          return (function(j) {
            if (Array.isArray(j)) return Z(j);
          })(A) || (function(j) {
            if (typeof Symbol < "u" && Symbol.iterator in Object(j)) return Array.from(j);
          })(A) || Q(A) || (function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          })();
        }
        var xe = o(46), fe = new (o(47)).Dispatcher(), ve = new ((function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            var $;
            u(this, S);
            for (var _ = arguments.length, q = new Array(_), re = 0; re < _; re++) q[re] = arguments[re];
            return ($ = j.call.apply(j, [this].concat(q))).objects = {}, $.set = function(J, V, le, Re) {
              $.objects[J] === void 0 && ($.objects[J] = {}), $.objects[J][V] === void 0 && ($.objects[J][V] = {}), $.objects[J][V][le] = Re;
            }, $.get = function(J, V, le, Re) {
              return $.objects[J] === void 0 || $.objects[J][V] === void 0 || $.objects[J][V][le] == null ? Re : $.objects[J][V][le];
            }, $.handleAction = function(J) {
              var V = J.rjvId, le = J.data;
              switch (J.name) {
                case "RESET":
                  $.emit("reset-" + V);
                  break;
                case "VARIABLE_UPDATED":
                  J.data.updated_src = $.updateSrc(V, le), $.set(V, "action", "variable-update", l(l({}, le), {}, { type: "variable-edited" })), $.emit("variable-update-" + V);
                  break;
                case "VARIABLE_REMOVED":
                  J.data.updated_src = $.updateSrc(V, le), $.set(V, "action", "variable-update", l(l({}, le), {}, { type: "variable-removed" })), $.emit("variable-update-" + V);
                  break;
                case "VARIABLE_ADDED":
                  J.data.updated_src = $.updateSrc(V, le), $.set(V, "action", "variable-update", l(l({}, le), {}, { type: "variable-added" })), $.emit("variable-update-" + V);
                  break;
                case "ADD_VARIABLE_KEY_REQUEST":
                  $.set(V, "action", "new-key-request", le), $.emit("add-key-request-" + V);
              }
            }, $.updateSrc = function(J, V) {
              var le = V.name, Re = V.namespace, Ge = V.new_value, rt = (V.existing_value, V.variable_removed);
              Re.shift();
              var lt, Ke = $.get(J, "global", "src"), ct = $.deepCopy(Ke, ue(Re)), yt = ct, Ne = de(Re);
              try {
                for (Ne.s(); !(lt = Ne.n()).done; )
                  yt = yt[lt.value];
              } catch ($t) {
                Ne.e($t);
              } finally {
                Ne.f();
              }
              return rt ? P(yt) == "array" ? yt.splice(le, 1) : delete yt[le] : le !== null ? yt[le] = Ge : ct = Ge, $.set(J, "global", "src", ct), ct;
            }, $.deepCopy = function(J, V) {
              var le, Re = P(J), Ge = V.shift();
              return Re == "array" ? le = ue(J) : Re == "object" && (le = l({}, J)), Ge !== void 0 && (le[Ge] = $.deepCopy(J[Ge], V)), le;
            }, $;
          }
          return S;
        })(xe.EventEmitter))();
        fe.register(ve.handleAction.bind(ve));
        var ge = ve, Se = (function(A) {
          h(S, A);
          var j = k(S);
          function S($) {
            var _;
            return u(this, S), (_ = j.call(this, $)).toggleCollapsed = function() {
              _.setState({ collapsed: !_.state.collapsed }, (function() {
                ge.set(_.props.rjvId, _.props.namespace, "collapsed", _.state.collapsed);
              }));
            }, _.getFunctionDisplay = function(q) {
              var re = y(_).props;
              return q ? f.a.createElement("span", null, _.props.value.toString().slice(9, -1).replace(/\{[\s\S]+/, ""), f.a.createElement("span", { className: "function-collapsed", style: { fontWeight: "bold" } }, f.a.createElement("span", null, "{"), f.a.createElement("span", R(re.theme, "ellipsis"), "..."), f.a.createElement("span", null, "}"))) : _.props.value.toString().slice(9, -1);
            }, _.state = { collapsed: ge.get($.rjvId, $.namespace, "collapsed", !0) }, _;
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = this.state.collapsed;
            return f.a.createElement("div", R($.theme, "function"), f.a.createElement(W, Object.assign({ type_name: "function" }, $)), f.a.createElement("span", Object.assign({}, R($.theme, "function-value"), { className: "rjv-function-container", onClick: this.toggleCollapsed }), this.getFunctionDisplay(_)));
          } }]), S;
        })(f.a.PureComponent), Ee = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            return f.a.createElement("div", R(this.props.theme, "nan"), "NaN");
          } }]), S;
        })(f.a.PureComponent), ie = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            return f.a.createElement("div", R(this.props.theme, "null"), "NULL");
          } }]), S;
        })(f.a.PureComponent), pe = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props;
            return f.a.createElement("div", R($.theme, "integer"), f.a.createElement(W, Object.assign({ type_name: "int" }, $)), this.props.value);
          } }]), S;
        })(f.a.PureComponent), we = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props;
            return f.a.createElement("div", R($.theme, "regexp"), f.a.createElement(W, Object.assign({ type_name: "regexp" }, $)), this.props.value.toString());
          } }]), S;
        })(f.a.PureComponent), Ce = (function(A) {
          h(S, A);
          var j = k(S);
          function S($) {
            var _;
            return u(this, S), (_ = j.call(this, $)).toggleCollapsed = function() {
              _.setState({ collapsed: !_.state.collapsed }, (function() {
                ge.set(_.props.rjvId, _.props.namespace, "collapsed", _.state.collapsed);
              }));
            }, _.state = { collapsed: ge.get($.rjvId, $.namespace, "collapsed", !0) }, _;
          }
          return d(S, [{ key: "render", value: function() {
            this.state.collapsed;
            var $ = this.props, _ = $.collapseStringsAfterLength, q = $.theme, re = $.value, J = { style: { cursor: "default" } };
            return P(_) === "integer" && re.length > _ && (J.style.cursor = "pointer", this.state.collapsed && (re = f.a.createElement("span", null, re.substring(0, _), f.a.createElement("span", R(q, "ellipsis"), " ...")))), f.a.createElement("div", R(q, "string"), f.a.createElement(W, Object.assign({ type_name: "string" }, $)), f.a.createElement("span", Object.assign({ className: "string-value" }, J, { onClick: this.toggleCollapsed }), '"', re, '"'));
          } }]), S;
        })(f.a.PureComponent), Ye = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            return f.a.createElement("div", R(this.props.theme, "undefined"), "undefined");
          } }]), S;
        })(f.a.PureComponent);
        function Oe() {
          return (Oe = Object.assign || function(A) {
            for (var j = 1; j < arguments.length; j++) {
              var S = arguments[j];
              for (var $ in S) Object.prototype.hasOwnProperty.call(S, $) && (A[$] = S[$]);
            }
            return A;
          }).apply(this, arguments);
        }
        var Fe = I.useLayoutEffect, qe = function(A) {
          var j = Object(I.useRef)(A);
          return Fe((function() {
            j.current = A;
          })), j;
        }, Xe = function(A, j) {
          typeof A != "function" ? A.current = j : A(j);
        }, nt = function(A, j) {
          var S = Object(I.useRef)();
          return Object(I.useCallback)((function($) {
            A.current = $, S.current && Xe(S.current, null), S.current = j, j && Xe(j, $);
          }), [j]);
        }, et = { "min-height": "0", "max-height": "none", height: "0", visibility: "hidden", overflow: "hidden", position: "absolute", "z-index": "-1000", top: "0", right: "0" }, Ve = function(A) {
          Object.keys(et).forEach((function(j) {
            A.style.setProperty(j, et[j], "important");
          }));
        }, Le = null, ze = function() {
        }, ee = ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "boxSizing", "fontFamily", "fontSize", "fontStyle", "fontWeight", "letterSpacing", "lineHeight", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "tabSize", "textIndent", "textRendering", "textTransform", "width"], H = !!document.documentElement.currentStyle, K = function(A, j) {
          var S = A.cacheMeasurements, $ = A.maxRows, _ = A.minRows, q = A.onChange, re = q === void 0 ? ze : q, J = A.onHeightChange, V = J === void 0 ? ze : J, le = (function(Ne, $t) {
            if (Ne == null) return {};
            var _t, Gt, Ur = {}, Yt = Object.keys(Ne);
            for (Gt = 0; Gt < Yt.length; Gt++) _t = Yt[Gt], $t.indexOf(_t) >= 0 || (Ur[_t] = Ne[_t]);
            return Ur;
          })(A, ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"]), Re, Ge = le.value !== void 0, rt = Object(I.useRef)(null), lt = nt(rt, j), Ke = Object(I.useRef)(0), ct = Object(I.useRef)(), yt = function() {
            var Ne = rt.current, $t = S && ct.current ? ct.current : (function(Yt) {
              var qr = window.getComputedStyle(Yt);
              if (qr === null) return null;
              var pr, Tt = (pr = qr, ee.reduce((function(Or, hr) {
                return Or[hr] = pr[hr], Or;
              }), {})), Zt = Tt.boxSizing;
              return Zt === "" ? null : (H && Zt === "border-box" && (Tt.width = parseFloat(Tt.width) + parseFloat(Tt.borderRightWidth) + parseFloat(Tt.borderLeftWidth) + parseFloat(Tt.paddingRight) + parseFloat(Tt.paddingLeft) + "px"), { sizingStyle: Tt, paddingSize: parseFloat(Tt.paddingBottom) + parseFloat(Tt.paddingTop), borderSize: parseFloat(Tt.borderBottomWidth) + parseFloat(Tt.borderTopWidth) });
            })(Ne);
            if ($t) {
              ct.current = $t;
              var _t = (function(Yt, qr, pr, Tt) {
                pr === void 0 && (pr = 1), Tt === void 0 && (Tt = 1 / 0), Le || ((Le = document.createElement("textarea")).setAttribute("tab-index", "-1"), Le.setAttribute("aria-hidden", "true"), Ve(Le)), Le.parentNode === null && document.body.appendChild(Le);
                var Zt = Yt.paddingSize, Or = Yt.borderSize, hr = Yt.sizingStyle, sa = hr.boxSizing;
                Object.keys(hr).forEach((function(Yr) {
                  var mr = Yr;
                  Le.style[mr] = hr[mr];
                })), Ve(Le), Le.value = qr;
                var Gr = (function(Yr, mr) {
                  var la = Yr.scrollHeight;
                  return mr.sizingStyle.boxSizing === "border-box" ? la + mr.borderSize : la - mr.paddingSize;
                })(Le, Yt);
                Le.value = "x";
                var Rn = Le.scrollHeight - Zt, Tn = Rn * pr;
                sa === "border-box" && (Tn = Tn + Zt + Or), Gr = Math.max(Tn, Gr);
                var On = Rn * Tt;
                return sa === "border-box" && (On = On + Zt + Or), [Gr = Math.min(On, Gr), Rn];
              })($t, Ne.value || Ne.placeholder || "x", _, $), Gt = _t[0], Ur = _t[1];
              Ke.current !== Gt && (Ke.current = Gt, Ne.style.setProperty("height", Gt + "px", "important"), V(Gt, { rowHeight: Ur }));
            }
          };
          return Object(I.useLayoutEffect)(yt), Re = qe(yt), Object(I.useLayoutEffect)((function() {
            var Ne = function($t) {
              Re.current($t);
            };
            return window.addEventListener("resize", Ne), function() {
              window.removeEventListener("resize", Ne);
            };
          }), []), Object(I.createElement)("textarea", Oe({}, le, { onChange: function(Ne) {
            Ge || yt(), re(Ne);
          }, ref: lt }));
        }, te = Object(I.forwardRef)(K);
        function oe(A) {
          A = A.trim();
          try {
            if ((A = JSON.stringify(JSON.parse(A)))[0] === "[") return be("array", JSON.parse(A));
            if (A[0] === "{") return be("object", JSON.parse(A));
            if (A.match(/\-?\d+\.\d+/) && A.match(/\-?\d+\.\d+/)[0] === A) return be("float", parseFloat(A));
            if (A.match(/\-?\d+e-\d+/) && A.match(/\-?\d+e-\d+/)[0] === A) return be("float", Number(A));
            if (A.match(/\-?\d+/) && A.match(/\-?\d+/)[0] === A) return be("integer", parseInt(A));
            if (A.match(/\-?\d+e\+\d+/) && A.match(/\-?\d+e\+\d+/)[0] === A) return be("integer", Number(A));
          } catch {
          }
          switch (A = A.toLowerCase()) {
            case "undefined":
              return be("undefined", void 0);
            case "nan":
              return be("nan", NaN);
            case "null":
              return be("null", null);
            case "true":
              return be("boolean", !0);
            case "false":
              return be("boolean", !1);
            default:
              if (A = Date.parse(A)) return be("date", new Date(A));
          }
          return be(!1, null);
        }
        function be(A, j) {
          return { type: A, value: j };
        }
        var Ie = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]);
            return f.a.createElement("span", q, f.a.createElement("svg", Object.assign({}, je(_), { viewBox: "0 0 24 24", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("path", { d: "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" })));
          } }]), S;
        })(f.a.PureComponent), ye = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]);
            return f.a.createElement("span", q, f.a.createElement("svg", Object.assign({}, je(_), { viewBox: "0 0 24 24", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("path", { d: "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" })));
          } }]), S;
        })(f.a.PureComponent), me = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]), re = je(_).style;
            return f.a.createElement("span", q, f.a.createElement("svg", { fill: re.color, width: re.height, height: re.width, style: re, viewBox: "0 0 1792 1792" }, f.a.createElement("path", { d: "M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z" })));
          } }]), S;
        })(f.a.PureComponent), De = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]), re = je(_).style;
            return f.a.createElement("span", q, f.a.createElement("svg", { fill: re.color, width: re.height, height: re.width, style: re, viewBox: "0 0 1792 1792" }, f.a.createElement("path", { d: "M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z" })));
          } }]), S;
        })(f.a.PureComponent), Be = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]);
            return f.a.createElement("span", q, f.a.createElement("svg", { style: l(l({}, je(_).style), {}, { paddingLeft: "2px", verticalAlign: "top" }), viewBox: "0 0 15 15", fill: "currentColor" }, f.a.createElement("path", { d: "M0 14l6-6-6-6z" })));
          } }]), S;
        })(f.a.PureComponent), Te = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]);
            return f.a.createElement("span", q, f.a.createElement("svg", { style: l(l({}, je(_).style), {}, { paddingLeft: "2px", verticalAlign: "top" }), viewBox: "0 0 15 15", fill: "currentColor" }, f.a.createElement("path", { d: "M0 5l6 6 6-6z" })));
          } }]), S;
        })(f.a.PureComponent), se = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]);
            return f.a.createElement("span", q, f.a.createElement("svg", Object.assign({}, je(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m30 35h-25v-22.5h25v7.5h2.5v-12.5c0-1.4-1.1-2.5-2.5-2.5h-7.5c0-2.8-2.2-5-5-5s-5 2.2-5 5h-7.5c-1.4 0-2.5 1.1-2.5 2.5v27.5c0 1.4 1.1 2.5 2.5 2.5h25c1.4 0 2.5-1.1 2.5-2.5v-5h-2.5v5z m-20-27.5h2.5s2.5-1.1 2.5-2.5 1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5 1.3 2.5 2.5 2.5h2.5s2.5 1.1 2.5 2.5h-20c0-1.5 1.1-2.5 2.5-2.5z m-2.5 20h5v-2.5h-5v2.5z m17.5-5v-5l-10 7.5 10 7.5v-5h12.5v-5h-12.5z m-17.5 10h7.5v-2.5h-7.5v2.5z m12.5-17.5h-12.5v2.5h12.5v-2.5z m-7.5 5h-5v2.5h5v-2.5z" }))));
          } }]), S;
        })(f.a.PureComponent), ke = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]);
            return f.a.createElement("span", q, f.a.createElement("svg", Object.assign({}, je(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m28.6 25q0-0.5-0.4-1l-4-4 4-4q0.4-0.5 0.4-1 0-0.6-0.4-1.1l-2-2q-0.4-0.4-1-0.4-0.6 0-1 0.4l-4.1 4.1-4-4.1q-0.4-0.4-1-0.4-0.6 0-1 0.4l-2 2q-0.5 0.5-0.5 1.1 0 0.5 0.5 1l4 4-4 4q-0.5 0.5-0.5 1 0 0.7 0.5 1.1l2 2q0.4 0.4 1 0.4 0.6 0 1-0.4l4-4.1 4.1 4.1q0.4 0.4 1 0.4 0.6 0 1-0.4l2-2q0.4-0.4 0.4-1z m8.7-5q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" }))));
          } }]), S;
        })(f.a.PureComponent), He = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]);
            return f.a.createElement("span", q, f.a.createElement("svg", Object.assign({}, je(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m30.1 21.4v-2.8q0-0.6-0.4-1t-1-0.5h-5.7v-5.7q0-0.6-0.4-1t-1-0.4h-2.9q-0.6 0-1 0.4t-0.4 1v5.7h-5.7q-0.6 0-1 0.5t-0.5 1v2.8q0 0.6 0.5 1t1 0.5h5.7v5.7q0 0.5 0.4 1t1 0.4h2.9q0.6 0 1-0.4t0.4-1v-5.7h5.7q0.6 0 1-0.5t0.4-1z m7.2-1.4q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" }))));
          } }]), S;
        })(f.a.PureComponent), Je = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]);
            return f.a.createElement("span", q, f.a.createElement("svg", Object.assign({}, je(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m31.6 21.6h-10v10h-3.2v-10h-10v-3.2h10v-10h3.2v10h10v3.2z" }))));
          } }]), S;
        })(f.a.PureComponent), at = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]);
            return f.a.createElement("span", q, f.a.createElement("svg", Object.assign({}, je(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m19.8 26.4l2.6-2.6-3.4-3.4-2.6 2.6v1.3h2.2v2.1h1.2z m9.8-16q-0.3-0.4-0.7 0l-7.8 7.8q-0.4 0.4 0 0.7t0.7 0l7.8-7.8q0.4-0.4 0-0.7z m1.8 13.2v4.3q0 2.6-1.9 4.5t-4.5 1.9h-18.6q-2.6 0-4.5-1.9t-1.9-4.5v-18.6q0-2.7 1.9-4.6t4.5-1.8h18.6q1.4 0 2.6 0.5 0.3 0.2 0.4 0.5 0.1 0.4-0.2 0.7l-1.1 1.1q-0.3 0.3-0.7 0.1-0.5-0.1-1-0.1h-18.6q-1.4 0-2.5 1.1t-1 2.5v18.6q0 1.4 1 2.5t2.5 1h18.6q1.5 0 2.5-1t1.1-2.5v-2.9q0-0.2 0.2-0.4l1.4-1.5q0.3-0.3 0.8-0.1t0.4 0.6z m-2.1-16.5l6.4 6.5-15 15h-6.4v-6.5z m9.9 3l-2.1 2-6.4-6.4 2.1-2q0.6-0.7 1.5-0.7t1.5 0.7l3.4 3.4q0.6 0.6 0.6 1.5t-0.6 1.5z" }))));
          } }]), S;
        })(f.a.PureComponent), Me = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.style, q = O($, ["style"]);
            return f.a.createElement("span", q, f.a.createElement("svg", Object.assign({}, je(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m31.7 16.4q0-0.6-0.4-1l-2.1-2.1q-0.4-0.4-1-0.4t-1 0.4l-9.1 9.1-5-5q-0.5-0.4-1-0.4t-1 0.4l-2.1 2q-0.4 0.4-0.4 1 0 0.6 0.4 1l8.1 8.1q0.4 0.4 1 0.4 0.6 0 1-0.4l12.2-12.1q0.4-0.4 0.4-1z m5.6 3.6q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" }))));
          } }]), S;
        })(f.a.PureComponent);
        function je(A) {
          return A || (A = {}), { style: l(l({ verticalAlign: "middle" }, A), {}, { color: A.color ? A.color : "#000000", height: "1em", width: "1em" }) };
        }
        var mt = (function(A) {
          h(S, A);
          var j = k(S);
          function S($) {
            var _;
            return u(this, S), (_ = j.call(this, $)).copiedTimer = null, _.handleCopy = function() {
              var q = document.createElement("textarea"), re = _.props, J = re.clickCallback, V = re.src, le = re.namespace;
              q.innerHTML = JSON.stringify(_.clipboardValue(V), null, "  "), document.body.appendChild(q), q.select(), document.execCommand("copy"), document.body.removeChild(q), _.copiedTimer = setTimeout((function() {
                _.setState({ copied: !1 });
              }), 5500), _.setState({ copied: !0 }, (function() {
                typeof J == "function" && J({ src: V, namespace: le, name: le[le.length - 1] });
              }));
            }, _.getClippyIcon = function() {
              var q = _.props.theme;
              return _.state.copied ? f.a.createElement("span", null, f.a.createElement(se, Object.assign({ className: "copy-icon" }, R(q, "copy-icon"))), f.a.createElement("span", R(q, "copy-icon-copied"), "✔")) : f.a.createElement(se, Object.assign({ className: "copy-icon" }, R(q, "copy-icon")));
            }, _.clipboardValue = function(q) {
              switch (P(q)) {
                case "function":
                case "regexp":
                  return q.toString();
                default:
                  return q;
              }
            }, _.state = { copied: !1 }, _;
          }
          return d(S, [{ key: "componentWillUnmount", value: function() {
            this.copiedTimer && (clearTimeout(this.copiedTimer), this.copiedTimer = null);
          } }, { key: "render", value: function() {
            var $ = this.props, _ = ($.src, $.theme), q = $.hidden, re = $.rowHovered, J = R(_, "copy-to-clipboard").style, V = "inline";
            return q && (V = "none"), f.a.createElement("span", { className: "copy-to-clipboard-container", title: "Copy to clipboard", style: { verticalAlign: "top", display: re ? "inline-block" : "none" } }, f.a.createElement("span", { style: l(l({}, J), {}, { display: V }), onClick: this.handleCopy }, this.getClippyIcon()));
          } }]), S;
        })(f.a.PureComponent), ot = (function(A) {
          h(S, A);
          var j = k(S);
          function S($) {
            var _;
            return u(this, S), (_ = j.call(this, $)).getEditIcon = function() {
              var q = _.props, re = q.variable, J = q.theme;
              return f.a.createElement("div", { className: "click-to-edit", style: { verticalAlign: "top", display: _.state.hovered ? "inline-block" : "none" } }, f.a.createElement(at, Object.assign({ className: "click-to-edit-icon" }, R(J, "editVarIcon"), { onClick: function() {
                _.prepopInput(re);
              } })));
            }, _.prepopInput = function(q) {
              if (_.props.onEdit !== !1) {
                var re = (function(V) {
                  var le;
                  switch (P(V)) {
                    case "undefined":
                      le = "undefined";
                      break;
                    case "nan":
                      le = "NaN";
                      break;
                    case "string":
                      le = V;
                      break;
                    case "date":
                    case "function":
                    case "regexp":
                      le = V.toString();
                      break;
                    default:
                      try {
                        le = JSON.stringify(V, null, "  ");
                      } catch {
                        le = "";
                      }
                  }
                  return le;
                })(q.value), J = oe(re);
                _.setState({ editMode: !0, editValue: re, parsedInput: { type: J.type, value: J.value } });
              }
            }, _.getRemoveIcon = function() {
              var q = _.props, re = q.variable, J = q.namespace, V = q.theme, le = q.rjvId;
              return f.a.createElement("div", { className: "click-to-remove", style: { verticalAlign: "top", display: _.state.hovered ? "inline-block" : "none" } }, f.a.createElement(ke, Object.assign({ className: "click-to-remove-icon" }, R(V, "removeVarIcon"), { onClick: function() {
                fe.dispatch({ name: "VARIABLE_REMOVED", rjvId: le, data: { name: re.name, namespace: J, existing_value: re.value, variable_removed: !0 } });
              } })));
            }, _.getValue = function(q, re) {
              var J = !re && q.type, V = y(_).props;
              switch (J) {
                case !1:
                  return _.getEditInput();
                case "string":
                  return f.a.createElement(Ce, Object.assign({ value: q.value }, V));
                case "integer":
                  return f.a.createElement(pe, Object.assign({ value: q.value }, V));
                case "float":
                  return f.a.createElement(B, Object.assign({ value: q.value }, V));
                case "boolean":
                  return f.a.createElement(F, Object.assign({ value: q.value }, V));
                case "function":
                  return f.a.createElement(Se, Object.assign({ value: q.value }, V));
                case "null":
                  return f.a.createElement(ie, V);
                case "nan":
                  return f.a.createElement(Ee, V);
                case "undefined":
                  return f.a.createElement(Ye, V);
                case "date":
                  return f.a.createElement(G, Object.assign({ value: q.value }, V));
                case "regexp":
                  return f.a.createElement(we, Object.assign({ value: q.value }, V));
                default:
                  return f.a.createElement("div", { className: "object-value" }, JSON.stringify(q.value));
              }
            }, _.getEditInput = function() {
              var q = _.props.theme, re = _.state.editValue;
              return f.a.createElement("div", null, f.a.createElement(te, Object.assign({ type: "text", inputRef: function(J) {
                return J && J.focus();
              }, value: re, className: "variable-editor", onChange: function(J) {
                var V = J.target.value, le = oe(V);
                _.setState({ editValue: V, parsedInput: { type: le.type, value: le.value } });
              }, onKeyDown: function(J) {
                switch (J.key) {
                  case "Escape":
                    _.setState({ editMode: !1, editValue: "" });
                    break;
                  case "Enter":
                    (J.ctrlKey || J.metaKey) && _.submitEdit(!0);
                }
                J.stopPropagation();
              }, placeholder: "update this value", minRows: 2 }, R(q, "edit-input"))), f.a.createElement("div", R(q, "edit-icon-container"), f.a.createElement(ke, Object.assign({ className: "edit-cancel" }, R(q, "cancel-icon"), { onClick: function() {
                _.setState({ editMode: !1, editValue: "" });
              } })), f.a.createElement(Me, Object.assign({ className: "edit-check string-value" }, R(q, "check-icon"), { onClick: function() {
                _.submitEdit();
              } })), f.a.createElement("div", null, _.showDetected())));
            }, _.submitEdit = function(q) {
              var re = _.props, J = re.variable, V = re.namespace, le = re.rjvId, Re = _.state, Ge = Re.editValue, rt = Re.parsedInput, lt = Ge;
              q && rt.type && (lt = rt.value), _.setState({ editMode: !1 }), fe.dispatch({ name: "VARIABLE_UPDATED", rjvId: le, data: { name: J.name, namespace: V, existing_value: J.value, new_value: lt, variable_removed: !1 } });
            }, _.showDetected = function() {
              var q = _.props, re = q.theme, J = (q.variable, q.namespace, q.rjvId, _.state.parsedInput), V = (J.type, J.value, _.getDetectedInput());
              if (V) return f.a.createElement("div", null, f.a.createElement("div", R(re, "detected-row"), V, f.a.createElement(Me, { className: "edit-check detected", style: l({ verticalAlign: "top", paddingLeft: "3px" }, R(re, "check-icon").style), onClick: function() {
                _.submitEdit(!0);
              } })));
            }, _.getDetectedInput = function() {
              var q = _.state.parsedInput, re = q.type, J = q.value, V = y(_).props, le = V.theme;
              if (re !== !1) switch (re.toLowerCase()) {
                case "object":
                  return f.a.createElement("span", null, f.a.createElement("span", { style: l(l({}, R(le, "brace").style), {}, { cursor: "default" }) }, "{"), f.a.createElement("span", { style: l(l({}, R(le, "ellipsis").style), {}, { cursor: "default" }) }, "..."), f.a.createElement("span", { style: l(l({}, R(le, "brace").style), {}, { cursor: "default" }) }, "}"));
                case "array":
                  return f.a.createElement("span", null, f.a.createElement("span", { style: l(l({}, R(le, "brace").style), {}, { cursor: "default" }) }, "["), f.a.createElement("span", { style: l(l({}, R(le, "ellipsis").style), {}, { cursor: "default" }) }, "..."), f.a.createElement("span", { style: l(l({}, R(le, "brace").style), {}, { cursor: "default" }) }, "]"));
                case "string":
                  return f.a.createElement(Ce, Object.assign({ value: J }, V));
                case "integer":
                  return f.a.createElement(pe, Object.assign({ value: J }, V));
                case "float":
                  return f.a.createElement(B, Object.assign({ value: J }, V));
                case "boolean":
                  return f.a.createElement(F, Object.assign({ value: J }, V));
                case "function":
                  return f.a.createElement(Se, Object.assign({ value: J }, V));
                case "null":
                  return f.a.createElement(ie, V);
                case "nan":
                  return f.a.createElement(Ee, V);
                case "undefined":
                  return f.a.createElement(Ye, V);
                case "date":
                  return f.a.createElement(G, Object.assign({ value: new Date(J) }, V));
              }
            }, _.state = { editMode: !1, editValue: "", hovered: !1, renameKey: !1, parsedInput: { type: !1, value: null } }, _;
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this, _ = this.props, q = _.variable, re = _.singleIndent, J = _.type, V = _.theme, le = _.namespace, Re = _.indentWidth, Ge = _.enableClipboard, rt = _.onEdit, lt = _.onDelete, Ke = _.onSelect, ct = _.displayArrayKey, yt = _.quotesOnKeys, Ne = this.state.editMode;
            return f.a.createElement("div", Object.assign({}, R(V, "objectKeyVal", { paddingLeft: Re * re }), { onMouseEnter: function() {
              return $.setState(l(l({}, $.state), {}, { hovered: !0 }));
            }, onMouseLeave: function() {
              return $.setState(l(l({}, $.state), {}, { hovered: !1 }));
            }, className: "variable-row", key: q.name }), J == "array" ? ct ? f.a.createElement("span", Object.assign({}, R(V, "array-key"), { key: q.name + "_" + le }), q.name, f.a.createElement("div", R(V, "colon"), ":")) : null : f.a.createElement("span", null, f.a.createElement("span", Object.assign({}, R(V, "object-name"), { className: "object-key", key: q.name + "_" + le }), !!yt && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"'), f.a.createElement("span", { style: { display: "inline-block" } }, q.name), !!yt && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"')), f.a.createElement("span", R(V, "colon"), ":")), f.a.createElement("div", Object.assign({ className: "variable-value", onClick: Ke === !1 && rt === !1 ? null : function($t) {
              var _t = ue(le);
              ($t.ctrlKey || $t.metaKey) && rt !== !1 ? $.prepopInput(q) : Ke !== !1 && (_t.shift(), Ke(l(l({}, q), {}, { namespace: _t })));
            } }, R(V, "variableValue", { cursor: Ke === !1 ? "default" : "pointer" })), this.getValue(q, Ne)), Ge ? f.a.createElement(mt, { rowHovered: this.state.hovered, hidden: Ne, src: q.value, clickCallback: Ge, theme: V, namespace: [].concat(ue(le), [q.name]) }) : null, rt !== !1 && Ne == 0 ? this.getEditIcon() : null, lt !== !1 && Ne == 0 ? this.getRemoveIcon() : null);
          } }]), S;
        })(f.a.PureComponent), tt = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            var $;
            u(this, S);
            for (var _ = arguments.length, q = new Array(_), re = 0; re < _; re++) q[re] = arguments[re];
            return ($ = j.call.apply(j, [this].concat(q))).getObjectSize = function() {
              var J = $.props, V = J.size, le = J.theme;
              if (J.displayObjectSize) return f.a.createElement("span", Object.assign({ className: "object-size" }, R(le, "object-size")), V, " item", V === 1 ? "" : "s");
            }, $.getAddAttribute = function(J) {
              var V = $.props, le = V.theme, Re = V.namespace, Ge = V.name, rt = V.src, lt = V.rjvId, Ke = V.depth;
              return f.a.createElement("span", { className: "click-to-add", style: { verticalAlign: "top", display: J ? "inline-block" : "none" } }, f.a.createElement(He, Object.assign({ className: "click-to-add-icon" }, R(le, "addVarIcon"), { onClick: function() {
                var ct = { name: Ke > 0 ? Ge : null, namespace: Re.splice(0, Re.length - 1), existing_value: rt, variable_removed: !1, key_name: null };
                P(rt) === "object" ? fe.dispatch({ name: "ADD_VARIABLE_KEY_REQUEST", rjvId: lt, data: ct }) : fe.dispatch({ name: "VARIABLE_ADDED", rjvId: lt, data: l(l({}, ct), {}, { new_value: [].concat(ue(rt), [null]) }) });
              } })));
            }, $.getRemoveObject = function(J) {
              var V = $.props, le = V.theme, Re = (V.hover, V.namespace), Ge = V.name, rt = V.src, lt = V.rjvId;
              if (Re.length !== 1) return f.a.createElement("span", { className: "click-to-remove", style: { display: J ? "inline-block" : "none" } }, f.a.createElement(ke, Object.assign({ className: "click-to-remove-icon" }, R(le, "removeVarIcon"), { onClick: function() {
                fe.dispatch({ name: "VARIABLE_REMOVED", rjvId: lt, data: { name: Ge, namespace: Re.splice(0, Re.length - 1), existing_value: rt, variable_removed: !0 } });
              } })));
            }, $.render = function() {
              var J = $.props, V = J.theme, le = J.onDelete, Re = J.onAdd, Ge = J.enableClipboard, rt = J.src, lt = J.namespace, Ke = J.rowHovered;
              return f.a.createElement("div", Object.assign({}, R(V, "object-meta-data"), { className: "object-meta-data", onClick: function(ct) {
                ct.stopPropagation();
              } }), $.getObjectSize(), Ge ? f.a.createElement(mt, { rowHovered: Ke, clickCallback: Ge, src: rt, theme: V, namespace: lt }) : null, Re !== !1 ? $.getAddAttribute(Ke) : null, le !== !1 ? $.getRemoveObject(Ke) : null);
            }, $;
          }
          return S;
        })(f.a.PureComponent);
        function Ze(A) {
          var j = A.parent_type, S = A.namespace, $ = A.quotesOnKeys, _ = A.theme, q = A.jsvRoot, re = A.name, J = A.displayArrayKey, V = A.name ? A.name : "";
          return !q || re !== !1 && re !== null ? j == "array" ? J ? f.a.createElement("span", Object.assign({}, R(_, "array-key"), { key: S }), f.a.createElement("span", { className: "array-key" }, V), f.a.createElement("span", R(_, "colon"), ":")) : f.a.createElement("span", null) : f.a.createElement("span", Object.assign({}, R(_, "object-name"), { key: S }), f.a.createElement("span", { className: "object-key" }, $ && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"'), f.a.createElement("span", null, V), $ && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"')), f.a.createElement("span", R(_, "colon"), ":")) : f.a.createElement("span", null);
        }
        function bt(A) {
          var j = A.theme;
          switch (A.iconStyle) {
            case "triangle":
              return f.a.createElement(Te, Object.assign({}, R(j, "expanded-icon"), { className: "expanded-icon" }));
            case "square":
              return f.a.createElement(me, Object.assign({}, R(j, "expanded-icon"), { className: "expanded-icon" }));
            default:
              return f.a.createElement(Ie, Object.assign({}, R(j, "expanded-icon"), { className: "expanded-icon" }));
          }
        }
        function Mt(A) {
          var j = A.theme;
          switch (A.iconStyle) {
            case "triangle":
              return f.a.createElement(Be, Object.assign({}, R(j, "collapsed-icon"), { className: "collapsed-icon" }));
            case "square":
              return f.a.createElement(De, Object.assign({}, R(j, "collapsed-icon"), { className: "collapsed-icon" }));
            default:
              return f.a.createElement(ye, Object.assign({}, R(j, "collapsed-icon"), { className: "collapsed-icon" }));
          }
        }
        var jt = (function(A) {
          h(S, A);
          var j = k(S);
          function S($) {
            var _;
            return u(this, S), (_ = j.call(this, $)).toggleCollapsed = function(q) {
              var re = [];
              for (var J in _.state.expanded) re.push(_.state.expanded[J]);
              re[q] = !re[q], _.setState({ expanded: re });
            }, _.state = { expanded: [] }, _;
          }
          return d(S, [{ key: "getExpandedIcon", value: function($) {
            var _ = this.props, q = _.theme, re = _.iconStyle;
            return this.state.expanded[$] ? f.a.createElement(bt, { theme: q, iconStyle: re }) : f.a.createElement(Mt, { theme: q, iconStyle: re });
          } }, { key: "render", value: function() {
            var $ = this, _ = this.props, q = _.src, re = _.groupArraysAfterLength, J = (_.depth, _.name), V = _.theme, le = _.jsvRoot, Re = _.namespace, Ge = (_.parent_type, O(_, ["src", "groupArraysAfterLength", "depth", "name", "theme", "jsvRoot", "namespace", "parent_type"])), rt = 0, lt = 5 * this.props.indentWidth;
            le || (rt = 5 * this.props.indentWidth);
            var Ke = re, ct = Math.ceil(q.length / Ke);
            return f.a.createElement("div", Object.assign({ className: "object-key-val" }, R(V, le ? "jsv-root" : "objectKeyVal", { paddingLeft: rt })), f.a.createElement(Ze, this.props), f.a.createElement("span", null, f.a.createElement(tt, Object.assign({ size: q.length }, this.props))), ue(Array(ct)).map((function(yt, Ne) {
              return f.a.createElement("div", Object.assign({ key: Ne, className: "object-key-val array-group" }, R(V, "objectKeyVal", { marginLeft: 6, paddingLeft: lt })), f.a.createElement("span", R(V, "brace-row"), f.a.createElement("div", Object.assign({ className: "icon-container" }, R(V, "icon-container"), { onClick: function($t) {
                $.toggleCollapsed(Ne);
              } }), $.getExpandedIcon(Ne)), $.state.expanded[Ne] ? f.a.createElement(Hr, Object.assign({ key: J + Ne, depth: 0, name: !1, collapsed: !1, groupArraysAfterLength: Ke, index_offset: Ne * Ke, src: q.slice(Ne * Ke, Ne * Ke + Ke), namespace: Re, type: "array", parent_type: "array_group", theme: V }, Ge)) : f.a.createElement("span", Object.assign({}, R(V, "brace"), { onClick: function($t) {
                $.toggleCollapsed(Ne);
              }, className: "array-group-brace" }), "[", f.a.createElement("div", Object.assign({}, R(V, "array-group-meta-data"), { className: "array-group-meta-data" }), f.a.createElement("span", Object.assign({ className: "object-size" }, R(V, "object-size")), Ne * Ke, " - ", Ne * Ke + Ke > q.length ? q.length : Ne * Ke + Ke)), "]")));
            })));
          } }]), S;
        })(f.a.PureComponent), Tr = (function(A) {
          h(S, A);
          var j = k(S);
          function S($) {
            var _;
            u(this, S), (_ = j.call(this, $)).toggleCollapsed = function() {
              _.setState({ expanded: !_.state.expanded }, (function() {
                ge.set(_.props.rjvId, _.props.namespace, "expanded", _.state.expanded);
              }));
            }, _.getObjectContent = function(re, J, V) {
              return f.a.createElement("div", { className: "pushed-content object-container" }, f.a.createElement("div", Object.assign({ className: "object-content" }, R(_.props.theme, "pushed-content")), _.renderObjectContents(J, V)));
            }, _.getEllipsis = function() {
              return _.state.size === 0 ? null : f.a.createElement("div", Object.assign({}, R(_.props.theme, "ellipsis"), { className: "node-ellipsis", onClick: _.toggleCollapsed }), "...");
            }, _.getObjectMetaData = function(re) {
              var J = _.props, V = (J.rjvId, J.theme, _.state), le = V.size, Re = V.hovered;
              return f.a.createElement(tt, Object.assign({ rowHovered: Re, size: le }, _.props));
            }, _.renderObjectContents = function(re, J) {
              var V, le = _.props, Re = le.depth, Ge = le.parent_type, rt = le.index_offset, lt = le.groupArraysAfterLength, Ke = le.namespace, ct = _.state.object_type, yt = [], Ne = Object.keys(re || {});
              return _.props.sortKeys && ct !== "array" && (Ne = Ne.sort()), Ne.forEach((function($t) {
                if (V = new go($t, re[$t]), Ge === "array_group" && rt && (V.name = parseInt(V.name) + rt), re.hasOwnProperty($t)) if (V.type === "object") yt.push(f.a.createElement(Hr, Object.assign({ key: V.name, depth: Re + 1, name: V.name, src: V.value, namespace: Ke.concat(V.name), parent_type: ct }, J)));
                else if (V.type === "array") {
                  var _t = Hr;
                  lt && V.value.length > lt && (_t = jt), yt.push(f.a.createElement(_t, Object.assign({ key: V.name, depth: Re + 1, name: V.name, src: V.value, namespace: Ke.concat(V.name), type: "array", parent_type: ct }, J)));
                } else yt.push(f.a.createElement(ot, Object.assign({ key: V.name + "_" + Ke, variable: V, singleIndent: 5, namespace: Ke, type: _.props.type }, J)));
              })), yt;
            };
            var q = S.getState($);
            return _.state = l(l({}, q), {}, { prevProps: {} }), _;
          }
          return d(S, [{ key: "getBraceStart", value: function($, _) {
            var q = this, re = this.props, J = re.src, V = re.theme, le = re.iconStyle;
            if (re.parent_type === "array_group") return f.a.createElement("span", null, f.a.createElement("span", R(V, "brace"), $ === "array" ? "[" : "{"), _ ? this.getObjectMetaData(J) : null);
            var Re = _ ? bt : Mt;
            return f.a.createElement("span", null, f.a.createElement("span", Object.assign({ onClick: function(Ge) {
              q.toggleCollapsed();
            } }, R(V, "brace-row")), f.a.createElement("div", Object.assign({ className: "icon-container" }, R(V, "icon-container")), f.a.createElement(Re, { theme: V, iconStyle: le })), f.a.createElement(Ze, this.props), f.a.createElement("span", R(V, "brace"), $ === "array" ? "[" : "{")), _ ? this.getObjectMetaData(J) : null);
          } }, { key: "render", value: function() {
            var $ = this, _ = this.props, q = _.depth, re = _.src, J = (_.namespace, _.name, _.type, _.parent_type), V = _.theme, le = _.jsvRoot, Re = _.iconStyle, Ge = O(_, ["depth", "src", "namespace", "name", "type", "parent_type", "theme", "jsvRoot", "iconStyle"]), rt = this.state, lt = rt.object_type, Ke = rt.expanded, ct = {};
            return le || J === "array_group" ? J === "array_group" && (ct.borderLeft = 0, ct.display = "inline") : ct.paddingLeft = 5 * this.props.indentWidth, f.a.createElement("div", Object.assign({ className: "object-key-val", onMouseEnter: function() {
              return $.setState(l(l({}, $.state), {}, { hovered: !0 }));
            }, onMouseLeave: function() {
              return $.setState(l(l({}, $.state), {}, { hovered: !1 }));
            } }, R(V, le ? "jsv-root" : "objectKeyVal", ct)), this.getBraceStart(lt, Ke), Ke ? this.getObjectContent(q, re, l({ theme: V, iconStyle: Re }, Ge)) : this.getEllipsis(), f.a.createElement("span", { className: "brace-row" }, f.a.createElement("span", { style: l(l({}, R(V, "brace").style), {}, { paddingLeft: Ke ? "3px" : "0px" }) }, lt === "array" ? "]" : "}"), Ke ? null : this.getObjectMetaData(re)));
          } }], [{ key: "getDerivedStateFromProps", value: function($, _) {
            var q = _.prevProps;
            return $.src !== q.src || $.collapsed !== q.collapsed || $.name !== q.name || $.namespace !== q.namespace || $.rjvId !== q.rjvId ? l(l({}, S.getState($)), {}, { prevProps: $ }) : null;
          } }]), S;
        })(f.a.PureComponent);
        Tr.getState = function(A) {
          var j = Object.keys(A.src).length, S = (A.collapsed === !1 || A.collapsed !== !0 && A.collapsed > A.depth) && (!A.shouldCollapse || A.shouldCollapse({ name: A.name, src: A.src, type: P(A.src), namespace: A.namespace }) === !1) && j !== 0;
          return { expanded: ge.get(A.rjvId, A.namespace, "expanded", S), object_type: A.type === "array" ? "array" : "object", parent_type: A.type === "array" ? "array" : "object", size: j, hovered: !1 };
        };
        var go = function A(j, S) {
          u(this, A), this.name = j, this.value = S, this.type = P(S);
        };
        z(Tr);
        var Hr = Tr, vo = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            var $;
            u(this, S);
            for (var _ = arguments.length, q = new Array(_), re = 0; re < _; re++) q[re] = arguments[re];
            return ($ = j.call.apply(j, [this].concat(q))).render = function() {
              var J = y($).props, V = [J.name], le = Hr;
              return Array.isArray(J.src) && J.groupArraysAfterLength && J.src.length > J.groupArraysAfterLength && (le = jt), f.a.createElement("div", { className: "pretty-json-container object-container" }, f.a.createElement("div", { className: "object-content" }, f.a.createElement(le, Object.assign({ namespace: V, depth: 0, jsvRoot: !0 }, J))));
            }, $;
          }
          return S;
        })(f.a.PureComponent), bo = (function(A) {
          h(S, A);
          var j = k(S);
          function S($) {
            var _;
            return u(this, S), (_ = j.call(this, $)).closeModal = function() {
              fe.dispatch({ rjvId: _.props.rjvId, name: "RESET" });
            }, _.submit = function() {
              _.props.submit(_.state.input);
            }, _.state = { input: $.input ? $.input : "" }, _;
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this, _ = this.props, q = _.theme, re = _.rjvId, J = _.isValid, V = this.state.input, le = J(V);
            return f.a.createElement("div", Object.assign({ className: "key-modal-request" }, R(q, "key-modal-request"), { onClick: this.closeModal }), f.a.createElement("div", Object.assign({}, R(q, "key-modal"), { onClick: function(Re) {
              Re.stopPropagation();
            } }), f.a.createElement("div", R(q, "key-modal-label"), "Key Name:"), f.a.createElement("div", { style: { position: "relative" } }, f.a.createElement("input", Object.assign({}, R(q, "key-modal-input"), { className: "key-modal-input", ref: function(Re) {
              return Re && Re.focus();
            }, spellCheck: !1, value: V, placeholder: "...", onChange: function(Re) {
              $.setState({ input: Re.target.value });
            }, onKeyPress: function(Re) {
              le && Re.key === "Enter" ? $.submit() : Re.key === "Escape" && $.closeModal();
            } })), le ? f.a.createElement(Me, Object.assign({}, R(q, "key-modal-submit"), { className: "key-modal-submit", onClick: function(Re) {
              return $.submit();
            } })) : null), f.a.createElement("span", R(q, "key-modal-cancel"), f.a.createElement(Je, Object.assign({}, R(q, "key-modal-cancel-icon"), { className: "key-modal-cancel", onClick: function() {
              fe.dispatch({ rjvId: re, name: "RESET" });
            } })))));
          } }]), S;
        })(f.a.PureComponent), qt = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            var $;
            u(this, S);
            for (var _ = arguments.length, q = new Array(_), re = 0; re < _; re++) q[re] = arguments[re];
            return ($ = j.call.apply(j, [this].concat(q))).isValid = function(J) {
              var V = $.props.rjvId, le = ge.get(V, "action", "new-key-request");
              return J != "" && Object.keys(le.existing_value).indexOf(J) === -1;
            }, $.submit = function(J) {
              var V = $.props.rjvId, le = ge.get(V, "action", "new-key-request");
              le.new_value = l({}, le.existing_value), le.new_value[J] = $.props.defaultValue, fe.dispatch({ name: "VARIABLE_ADDED", rjvId: V, data: le });
            }, $;
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.active, q = $.theme, re = $.rjvId;
            return _ ? f.a.createElement(bo, { rjvId: re, theme: q, isValid: this.isValid, submit: this.submit }) : null;
          } }]), S;
        })(f.a.PureComponent), yo = (function(A) {
          h(S, A);
          var j = k(S);
          function S() {
            return u(this, S), j.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var $ = this.props, _ = $.message, q = $.active, re = $.theme, J = $.rjvId;
            return q ? f.a.createElement("div", Object.assign({ className: "validation-failure" }, R(re, "validation-failure"), { onClick: function() {
              fe.dispatch({ rjvId: J, name: "RESET" });
            } }), f.a.createElement("span", R(re, "validation-failure-label"), _), f.a.createElement(Je, R(re, "validation-failure-clear"))) : null;
          } }]), S;
        })(f.a.PureComponent), Kr = (function(A) {
          h(S, A);
          var j = k(S);
          function S($) {
            var _;
            return u(this, S), (_ = j.call(this, $)).rjvId = Date.now().toString(), _.getListeners = function() {
              return { reset: _.resetState, "variable-update": _.updateSrc, "add-key-request": _.addKeyRequest };
            }, _.updateSrc = function() {
              var q, re = ge.get(_.rjvId, "action", "variable-update"), J = re.name, V = re.namespace, le = re.new_value, Re = re.existing_value, Ge = (re.variable_removed, re.updated_src), rt = re.type, lt = _.props, Ke = lt.onEdit, ct = lt.onDelete, yt = lt.onAdd, Ne = { existing_src: _.state.src, new_value: le, updated_src: Ge, name: J, namespace: V, existing_value: Re };
              switch (rt) {
                case "variable-added":
                  q = yt(Ne);
                  break;
                case "variable-edited":
                  q = Ke(Ne);
                  break;
                case "variable-removed":
                  q = ct(Ne);
              }
              q !== !1 ? (ge.set(_.rjvId, "global", "src", Ge), _.setState({ src: Ge })) : _.setState({ validationFailure: !0 });
            }, _.addKeyRequest = function() {
              _.setState({ addKeyRequest: !0 });
            }, _.resetState = function() {
              _.setState({ validationFailure: !1, addKeyRequest: !1 });
            }, _.state = { addKeyRequest: !1, editKeyRequest: !1, validationFailure: !1, src: S.defaultProps.src, name: S.defaultProps.name, theme: S.defaultProps.theme, validationMessage: S.defaultProps.validationMessage, prevSrc: S.defaultProps.src, prevName: S.defaultProps.name, prevTheme: S.defaultProps.theme }, _;
          }
          return d(S, [{ key: "componentDidMount", value: function() {
            ge.set(this.rjvId, "global", "src", this.state.src);
            var $ = this.getListeners();
            for (var _ in $) ge.on(_ + "-" + this.rjvId, $[_]);
            this.setState({ addKeyRequest: !1, editKeyRequest: !1 });
          } }, { key: "componentDidUpdate", value: function($, _) {
            _.addKeyRequest !== !1 && this.setState({ addKeyRequest: !1 }), _.editKeyRequest !== !1 && this.setState({ editKeyRequest: !1 }), $.src !== this.state.src && ge.set(this.rjvId, "global", "src", this.state.src);
          } }, { key: "componentWillUnmount", value: function() {
            var $ = this.getListeners();
            for (var _ in $) ge.removeListener(_ + "-" + this.rjvId, $[_]);
          } }, { key: "render", value: function() {
            var $ = this.state, _ = $.validationFailure, q = $.validationMessage, re = $.addKeyRequest, J = $.theme, V = $.src, le = $.name, Re = this.props, Ge = Re.style, rt = Re.defaultValue;
            return f.a.createElement("div", { className: "react-json-view", style: l(l({}, R(J, "app-container").style), Ge) }, f.a.createElement(yo, { message: q, active: _, theme: J, rjvId: this.rjvId }), f.a.createElement(vo, Object.assign({}, this.props, { src: V, name: le, theme: J, type: P(V), rjvId: this.rjvId })), f.a.createElement(qt, { active: re, theme: J, rjvId: this.rjvId, defaultValue: rt }));
          } }], [{ key: "getDerivedStateFromProps", value: function($, _) {
            if ($.src !== _.prevSrc || $.name !== _.prevName || $.theme !== _.prevTheme) {
              var q = { src: $.src, name: $.name, theme: $.theme, validationMessage: $.validationMessage, prevSrc: $.src, prevName: $.name, prevTheme: $.theme };
              return S.validateState(q);
            }
            return null;
          } }]), S;
        })(f.a.PureComponent);
        Kr.defaultProps = { src: {}, name: "root", theme: "rjv-default", collapsed: !1, collapseStringsAfterLength: !1, shouldCollapse: !1, sortKeys: !1, quotesOnKeys: !0, groupArraysAfterLength: 100, indentWidth: 4, enableClipboard: !0, displayObjectSize: !0, displayDataTypes: !0, onEdit: !1, onDelete: !1, onAdd: !1, onSelect: !1, iconStyle: "triangle", style: {}, validationMessage: "Validation Error", defaultValue: null, displayArrayKey: !0 }, Kr.validateState = function(A) {
          var j = {};
          return P(A.theme) !== "object" || (function(S) {
            var $ = ["base00", "base01", "base02", "base03", "base04", "base05", "base06", "base07", "base08", "base09", "base0A", "base0B", "base0C", "base0D", "base0E", "base0F"];
            if (P(S) === "object") {
              for (var _ = 0; _ < $.length; _++) if (!($[_] in S)) return !1;
              return !0;
            }
            return !1;
          })(A.theme) || (console.error("react-json-view error:", "theme prop must be a theme name or valid base-16 theme object.", 'defaulting to "rjv-default" theme'), j.theme = "rjv-default"), P(A.src) !== "object" && P(A.src) !== "array" && (console.error("react-json-view error:", "src property must be a valid json object"), j.name = "ERROR", j.src = { message: "src property must be a valid json object" }), l(l({}, A), j);
        }, z(Kr), n.default = Kr;
      }]);
    }));
  })(Ta)), Ta.exports;
}
var Rb = $b();
const Tb = /* @__PURE__ */ $r(Rb);
function Ob(t) {
  const { maxHeight: e = "initial" } = t;
  return /* @__PURE__ */ U.jsx(_e, { maxHeight: e, overflow: "auto", width: "100%", children: /* @__PURE__ */ U.jsx(Tb, { ...t }) });
}
const Oi = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
})), Ou = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91c.48.22 1.05.34 1.7.34.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
})), _b = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
})), Pb = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
})), Ab = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M8 5v14l11-7z"
})), Ib = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"
})), Mb = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
})), jb = "Message", _u = (t) => (t == null ? void 0 : t.replace(/\s/g, " ")) ?? "";
function Db(t) {
  const { title: e, value: a } = t, r = Tu(), o = (() => {
    switch (typeof a) {
      case "string":
        return _u(a);
      case "number":
      case "boolean":
      case "bigint":
        return a.toString();
      case "object":
        return a ? /* @__PURE__ */ U.jsx(
          Ob,
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
  return !o || e === "randomKey" || e === "isNewLog" || e === "traceAvailable" || e === "displayTimeStamp" || e === "apiName" || !e ? null : /* @__PURE__ */ U.jsxs("div", { className: r.expandedLogRow, children: [
    /* @__PURE__ */ U.jsx("span", { className: r.expandedLogKey, children: e }),
    /* @__PURE__ */ U.jsx("span", { children: o })
  ] });
}
function Nb(t) {
  var m;
  const {
    logEntry: e,
    timeZone: a,
    onCopy: r,
    getColor: n,
    isHeiglighted: o,
    isExpanded: i,
    isExpandable: s
  } = t, l = Tu(), u = "Copy", c = "Copy Selection", d = (y) => {
    const w = parseInt(y, 10);
    return w >= 200 && w < 300 ? l.infoLogs : w >= 300 && w < 400 ? l.warnLogs : w >= 400 && w < 600 ? l.errorLogs : l.logOther;
  }, p = (y) => {
    const w = y.toUpperCase();
    return w === xb ? l.infoLogs : w === Sb ? l.warningLogs : w === Cb || w === wb ? l.errorLogs : w === Eb ? l.infoLogs : d(w);
  }, h = () => {
    r(e);
  }, g = (y) => {
    y.preventDefault(), y.stopPropagation();
  };
  return /* @__PURE__ */ U.jsxs("div", { children: [
    /* @__PURE__ */ U.jsxs(
      "div",
      {
        className: he(l.defaultLogLine, {
          [l.highlightedLogLine]: e.isNewLog && !o,
          [l.selectedLogLine]: o,
          [l.whiteBackground]: !(o || e.isNewLog)
        }),
        "data-testid": "log-panel-entry",
        children: [
          s ? /* @__PURE__ */ U.jsx("div", { className: l.arrow, children: i ? /* @__PURE__ */ U.jsx(Oi, { fontSize: "inherit", rotate: 90 }) : /* @__PURE__ */ U.jsx(Oi, { fontSize: "inherit" }) }) : /* @__PURE__ */ U.jsx("div", { className: l.arrow }),
          /* @__PURE__ */ U.jsxs("div", { className: l.logLineWrapper, children: [
            /* @__PURE__ */ U.jsxs("span", { className: l.infoSection, children: [
              /* @__PURE__ */ U.jsxs(
                "span",
                {
                  className: he(
                    p(yb),
                    l.toolTipParent
                  ),
                  children: [
                    bb(new Date(e.timestamp), a),
                    " "
                  ]
                }
              ),
              (e == null ? void 0 : e.message) && /* @__PURE__ */ U.jsxs(
                "span",
                {
                  className: he(
                    (m = e == null ? void 0 : e.message) != null && m.includes("Error") ? l.errorLogs : n(e == null ? void 0 : e.message),
                    l.toolTipParent
                  ),
                  children: [
                    e == null ? void 0 : e.message,
                    " ",
                    /* @__PURE__ */ U.jsx("span", { className: l.toolTipChild, children: jb })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ U.jsx("span", { className: l.logMsg, children: /* @__PURE__ */ U.jsx(
              "span",
              {
                className: he(
                  l.disableUserSelect,
                  l.logEntryActions
                ),
                children: /* @__PURE__ */ U.jsx("span", { className: l.actionContainer, children: /* @__PURE__ */ U.jsxs(
                  "button",
                  {
                    onClick: (y) => {
                      g(y), h();
                    },
                    onMouseDown: g,
                    onMouseUp: g,
                    onMouseEnter: g,
                    type: "button",
                    className: l.actionButton,
                    children: [
                      /* @__PURE__ */ U.jsx(Ou, { className: l.actionIcon }),
                      /* @__PURE__ */ U.jsx("span", { className: l.actionLabel, children: o ? c : u })
                    ]
                  }
                ) })
              }
            ) })
          ] })
        ]
      },
      e.randomKey
    ),
    i && /* @__PURE__ */ U.jsx("div", { className: l.tableContainer, children: Object.entries(e).map(([y, w]) => /* @__PURE__ */ U.jsx(
      Db,
      {
        title: y,
        value: y === "logLine" ? _u(String(w ?? "")) : w
      },
      y
    )) })
  ] });
}
/*! clipboard-copy. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var ei, Wl;
function Lb() {
  if (Wl) return ei;
  Wl = 1, ei = r;
  function t() {
    return new DOMException("The request is not allowed", "NotAllowedError");
  }
  async function e(n) {
    if (!navigator.clipboard)
      throw t();
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
    if (!l) throw t();
  }
  async function r(n) {
    try {
      await e(n);
    } catch (o) {
      try {
        await a(n);
      } catch (i) {
        throw i || o || t();
      }
    }
  }
  return ei;
}
var Fb = Lb();
const Pu = /* @__PURE__ */ $r(Fb), ds = ar(
  (t) => fr({
    topicContainer: {
      width: "95%",
      maxWidth: "95%",
      marginTop: t.spacing(2),
      marginBottom: t.spacing(2),
      marginLeft: t.spacing(1),
      borderBottom: 0,
      boxSizing: "border-box"
    },
    topicTypeContainer: {
      height: t.spacing(3),
      display: "flex"
    },
    typeChipContainer: {
      display: "flex",
      height: t.spacing(3),
      marginRight: t.spacing(1),
      alignItems: "center"
    },
    endpointContainer: {
      display: "flex",
      width: "100%",
      maxWidth: "100%",
      padding: t.spacing(2),
      border: 1,
      borderBottom: `1px solid ${t.palette.grey[200]}`,
      gap: t.spacing(1),
      alignItems: "center",
      boxSizing: "border-box",
      overflow: "hidden"
    },
    textInput: {
      flex: 1,
      minWidth: 200,
      backgroundColor: "#ffffff",
      height: 40,
      display: "flex",
      alignItems: "center",
      borderRadius: t.spacing(0.5),
      border: `1px solid ${t.palette.grey[200]}`,
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
      padding: t.spacing(0, 1),
      "&:hover": {
        borderColor: t.palette.primary.light
      }
    },
    payloadText: {
      borderTop: 1,
      height: t.spacing(5),
      marginLeft: t.spacing(1)
    },
    tabs: {
      padding: t.spacing(1),
      paddingLeft: t.spacing(1),
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box"
    },
    tabPanelContent: {
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box"
    },
    payloadContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: 170,
      height: "auto",
      borderRadius: "none",
      marginBottom: t.spacing(2),
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box",
      position: "relative"
    },
    sendIcon: {
      marginLeft: t.spacing(0),
      marginBottom: t.spacing(2),
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box"
    },
    parameterContainerWrapper: {
      width: "100%",
      maxWidth: "100%",
      height: t.spacing(27.5),
      overflow: "scroll",
      boxSizing: "border-box"
    },
    parameterContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: t.spacing(1),
      width: "100%",
      maxWidth: "100%",
      height: t.spacing(22),
      borderRadius: "none",
      overflow: "scroll",
      boxSizing: "border-box"
    },
    paramTextInput: {
      size: "small",
      width: "100%",
      maxWidth: "100%"
    },
    apiTokenTextInput: {
      size: "small",
      width: "100%",
      maxWidth: "100%"
    },
    executeButton: {
      marginLeft: t.spacing(0),
      marginBottom: t.spacing(1),
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box"
    },
    outputConsoleContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: t.spacing(1),
      paddingLeft: t.spacing(2),
      paddingRight: t.spacing(2),
      alignItems: "center",
      borderTop: `1px solid ${t.palette.grey[200]}`,
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box"
    },
    outputContainer: {
      height: t.spacing(20),
      overflow: "scroll",
      borderTop: `1px solid ${t.palette.grey[200]}`,
      borderBottomRightRadius: t.spacing(1),
      borderBottomLeftRadius: t.spacing(1),
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box",
      paddingLeft: t.spacing(1),
      paddingRight: t.spacing(1)
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
      height: 170,
      position: "relative",
      "& .react-monaco-editor-container": {
        width: "100%",
        height: "100%",
        "& .monaco-editor": {
          "& .monaco-scrollable-element": {
            left: "0 !important"
          }
        }
      }
    },
    copyButton: {
      marginRight: t.spacing(1)
    }
  })
), Bb = ar(
  (t) => fr({
    commons: {
      boxShadow: `0 1px 2px  ${Ue(t.palette.common.black, 0.15)}`,
      borderRadius: 5,
      color: t.palette.common.white,
      padding: t.spacing(0.875, 2),
      gap: t.spacing(1),
      fontWeight: 400,
      fontSize: t.spacing(1.625),
      lineHeight: `${t.spacing(3)}px`,
      "&$disabled": {
        color: t.palette.common.white
      },
      "& $startIcon": {
        "& *:first-child": {
          fontSize: t.spacing(2)
        },
        "&$startIconSmall": {
          "& *:first-child": {
            fontSize: t.spacing(1.75)
          }
        },
        "&$startIconTiny": {
          "& *:first-child": {
            fontSize: t.spacing(1.5)
          }
        }
      },
      "& $endIcon": {
        "& *:first-child": {
          fontSize: t.spacing(2)
        },
        "&$endIconSmall": {
          "& *:first-child": {
            fontSize: t.spacing(1.75)
          }
        },
        "&$endIconTiny": {
          "& *:first-child": {
            fontSize: t.spacing(1.5)
          }
        }
      }
    },
    contained: {
      border: "1px solid transparent",
      "&:hover": {
        boxShadow: `0 1px 3px ${Ue(t.palette.common.black, 0.1)}`
      },
      "&:focus": {
        boxShadow: `0 1px 6px 2px ${Ue(t.palette.common.black, 0.1)}`
      }
    },
    outlined: {
      backgroundColor: "transparent",
      boxShadow: `0 1px 2px ${Ue(t.palette.common.black, 0.05)}`,
      "&:hover, &:focus": {
        backgroundColor: "transparent",
        boxShadow: `0 1px 6px 2px ${Ue(t.palette.common.black, 0.1)}`
      }
    },
    fullWidth: { width: "100%" },
    text: {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none"
    },
    subtle: {
      border: `1px solid ${t.palette.grey[100]}`,
      boxShadow: `0 1px 3px ${Ue(t.palette.common.black, 0.05)}`,
      backgroundColor: "#E5E4E2",
      "&:hover": {
        backgroundColor: "#E5E4E2",
        boxShadow: `0 1px 3px ${Ue(t.palette.common.black, 0.1)}`
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
      backgroundColor: t.palette.primary.main,
      borderColor: t.palette.primary.main,
      "&:hover": {
        backgroundColor: t.palette.primary.dark,
        borderColor: t.palette.primary.dark
      }
    },
    primaryText: {
      color: t.palette.primary.main,
      "&$disabled": {
        color: t.palette.primary.main
      }
    },
    primaryOutlined: {
      color: t.palette.primary.main,
      border: `1px solid ${t.palette.primary.main}`,
      boxShadow: `0 1px 2px  ${Ue(t.palette.common.black, 0.05)}`,
      "&$disabled": {
        color: t.palette.primary.main
      }
    },
    primarySubtle: {
      color: t.palette.primary.main,
      "&$disabled": {
        color: t.palette.primary.main
      }
    },
    primaryLink: {
      color: t.palette.primary.main,
      borderColor: "transparent",
      boxShadow: "none",
      "&$disabled": {
        color: t.palette.primary.main,
        borderColor: "transparent",
        boxShadow: "none"
      }
    },
    secondaryContained: {
      backgroundColor: "#E5E4E2",
      color: t.palette.common.black,
      border: `1px solid ${t.palette.grey[100]}`,
      boxShadow: `0 1px 2px ${Ue(t.palette.common.black, 0.05)}`,
      "&:hover": {
        backgroundColor: "#E5E4E2",
        color: t.palette.common.black
      },
      "&$disabled": {
        color: t.palette.common.black
      }
    },
    secondaryText: {
      color: t.palette.common.black,
      "&$disabled": {
        color: t.palette.common.black
      }
    },
    secondaryOutlined: {
      color: t.palette.secondary.main,
      border: `1px solid ${t.palette.secondary.main}`,
      "&:hover": {
        borderColor: t.palette.secondary.dark
      },
      "&$disabled": {
        color: t.palette.secondary.main
      }
    },
    secondarySubtle: {
      color: t.palette.common.black,
      "&$disabled": {
        color: t.palette.common.black
      }
    },
    secondaryLink: {
      color: t.palette.common.black,
      borderColor: "transparent",
      boxShadow: "none",
      "&$disabled": {
        color: t.palette.common.black,
        borderColor: "transparent",
        boxShadow: "none"
      }
    },
    errorContained: {
      backgroundColor: t.palette.error.main,
      borderColor: t.palette.error.main,
      "&:hover": {
        backgroundColor: t.palette.error.dark,
        borderColor: t.palette.error.dark
      }
    },
    errorOutlined: {
      color: t.palette.error.main,
      border: `1px solid ${t.palette.error.main}`,
      "&:hover": {
        borderColor: t.palette.error.dark
      },
      "&$disabled": {
        color: t.palette.error.main
      }
    },
    errorText: {
      color: t.palette.error.main,
      "&$disabled": {
        color: t.palette.error.main
      }
    },
    errorSubtle: {
      color: t.palette.error.main,
      "&$disabled": {
        color: t.palette.error.main
      }
    },
    errorLink: {
      color: t.palette.error.main,
      borderColor: "transparent",
      boxShadow: "none",
      "&$disabled": {
        color: t.palette.error.main,
        borderColor: "transparent",
        boxShadow: "none"
      }
    },
    successContained: {
      backgroundColor: t.palette.success.main,
      borderColor: t.palette.success.main,
      "&:hover": {
        backgroundColor: t.palette.success.dark,
        borderColor: t.palette.success.dark
      }
    },
    successOutlined: {
      color: t.palette.success.main,
      border: `1px solid ${t.palette.success.main}`,
      "&:hover": {
        borderColor: t.palette.success.dark
      },
      "&$disabled": {
        color: t.palette.success.main
      }
    },
    successText: {
      color: t.palette.success.main,
      "&$disabled": {
        color: t.palette.success.main
      }
    },
    successSubtle: {
      color: t.palette.success.main,
      "&$disabled": {
        color: t.palette.success.main
      }
    },
    successLink: {
      color: t.palette.success.main,
      borderColor: "transparent",
      boxShadow: "none",
      "&$disabled": {
        color: t.palette.success.main,
        borderColor: "transparent",
        boxShadow: "none"
      }
    },
    warningContained: {
      backgroundColor: t.palette.warning.main,
      borderColor: t.palette.warning.main,
      "&:hover": {
        backgroundColor: t.palette.warning.dark,
        borderColor: t.palette.warning.dark
      }
    },
    warningOutlined: {
      color: t.palette.warning.main,
      border: `1px solid ${t.palette.warning.main}`,
      "&:hover": {
        borderColor: t.palette.warning.dark
      },
      "&$disabled": {
        color: t.palette.warning.main
      }
    },
    warningText: {
      color: t.palette.warning.main,
      "&$disabled": {
        color: t.palette.warning.main
      }
    },
    warningSubtle: {
      color: t.palette.warning.main,
      "&$disabled": {
        color: t.palette.warning.main
      }
    },
    warningLink: {
      color: t.palette.warning.main,
      borderColor: "transparent",
      boxShadow: "none",
      "&$disabled": {
        color: t.palette.warning.main,
        borderColor: "transparent",
        boxShadow: "none"
      }
    },
    pill: {
      borderRadius: t.spacing(3.125)
    },
    small: {
      padding: t.spacing(0.375, 2),
      gap: t.spacing(0.75)
    },
    smallPill: {},
    smallLink: {
      padding: t.spacing(0.375, 0)
    },
    tiny: {
      padding: t.spacing(0, 1.5),
      gap: t.spacing(0.5)
    },
    tinyLink: {
      padding: t.spacing(0)
    },
    tinyPill: {},
    disabled: {
      opacity: 0.5,
      cursor: "default",
      pointerEvents: "none",
      color: t.palette.common.white,
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
), fn = (t) => {
  const {
    children: e,
    color: a = "primary",
    variant: r = "contained",
    pill: n = !1,
    fullWidth: o = !1,
    size: i = "medium",
    disabled: s = !1,
    testId: l,
    ...u
  } = t, c = Bb(), d = a === "primary", p = a === "secondary", h = a === "error", g = a === "success", m = a === "warning", y = r === "text", w = r === "outlined", k = r === "contained", I = r === "subtle", f = r === "link", x = i === "small", E = i === "tiny";
  return /* @__PURE__ */ U.jsx(
    Cg,
    {
      classes: {
        root: he({
          [c.commons]: !0,
          [c.fullWidth]: o,
          [c.disabled]: s,
          [c.outlined]: w,
          [c.contained]: k,
          [c.text]: y,
          [c.subtle]: I,
          [c.link]: f,
          [c.pill]: n,
          [c.smallPill]: n && x,
          [c.small]: x,
          [c.smallLink]: x && f,
          [c.tinyPill]: n && E,
          [c.tiny]: E,
          [c.tinyLink]: E && f,
          [c.primaryContained]: d && k,
          [c.primaryText]: d && y,
          [c.primaryOutlined]: d && w,
          [c.primarySubtle]: d && I,
          [c.primaryLink]: d && f,
          [c.secondaryContained]: p && k,
          [c.secondaryText]: p && y,
          [c.secondaryOutlined]: p && w,
          [c.secondarySubtle]: p && I,
          [c.secondaryLink]: p && f,
          [c.successContained]: g && k,
          [c.successText]: g && y,
          [c.successOutlined]: g && w,
          [c.successSubtle]: g && I,
          [c.successLink]: g && f,
          [c.errorContained]: h && k,
          [c.errorText]: h && y,
          [c.errorOutlined]: h && w,
          [c.errorSubtle]: h && I,
          [c.errorLink]: h && f,
          [c.warningContained]: m && k,
          [c.warningText]: m && y,
          [c.warningOutlined]: m && w,
          [c.warningSubtle]: m && I,
          [c.warningLink]: m && f
        }),
        startIcon: he({
          [c.startIcon]: !0,
          [c.startIconSmall]: x,
          [c.startIconTiny]: E
        }),
        endIcon: he({
          [c.endIcon]: !0,
          [c.endIconSmall]: x,
          [c.endIconTiny]: E
        })
      },
      disableFocusRipple: !0,
      disableRipple: !0,
      centerRipple: !1,
      "data-cyid": `${l}-button`,
      disabled: s,
      ...u,
      children: e
    }
  );
}, zb = (t) => {
  const e = ds(), { messages: a, clearLogs: r, isDisabled: n } = t, o = () => {
    const i = a.map((s) => `${s.timestamp} ${s.message}`).join(`
`);
    Pu(i);
  };
  return /* @__PURE__ */ U.jsxs(_e, { className: e.outputConsoleContainer, children: [
    /* @__PURE__ */ U.jsx(Kt, { variant: "body1", children: "Output" }),
    /* @__PURE__ */ U.jsxs(_e, { children: [
      /* @__PURE__ */ U.jsx(
        fn,
        {
          testId: "copy-output",
          variant: "link",
          disabled: n,
          onClick: o,
          startIcon: /* @__PURE__ */ U.jsx(Ou, {}),
          color: "primary",
          size: "small",
          className: e.copyButton,
          children: "Copy Output"
        }
      ),
      /* @__PURE__ */ U.jsx(
        fn,
        {
          testId: "clear-output",
          variant: "link",
          onClick: r,
          disabled: n,
          startIcon: /* @__PURE__ */ U.jsx(_b, {}),
          color: "error",
          size: "small",
          children: "Clear"
        }
      )
    ] })
  ] });
}, Wb = kd(() => import("./index-DTebFONq.mjs")), Vb = {
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
function Hb({
  fileContent: t,
  language: e,
  width: a = "100%",
  height: r = "70vh",
  setFileContent: n
}) {
  const o = ds();
  return /* @__PURE__ */ U.jsx(_e, { className: o.editorContainer, children: /* @__PURE__ */ U.jsx(vc, { fallback: /* @__PURE__ */ U.jsx(Xa, {}), children: /* @__PURE__ */ U.jsx(
    Wb,
    {
      width: a,
      height: r,
      theme: "choreoRequestLightTheme",
      language: e,
      options: Vb,
      onChange: (i) => n(i),
      value: t
    }
  ) }) });
}
const Au = ar(
  (t) => fr({
    accordion: {
      "&$accordionBordered": {
        border: `1px solid ${t.palette.grey[100]}`,
        marginBottom: t.spacing(1),
        borderRadius: 8,
        "&.Mui-expanded": {
          marginBottom: t.spacing(1)
        },
        "&:last-child": {
          borderBottomColor: t.palette.grey[100],
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
      padding: t.spacing(1, 3)
    },
    accordionSummaryRoot: {
      minHeight: "initial",
      padding: t.spacing(0.5, 2),
      borderBottom: "1px solid transparent",
      "&$accordionSummaryBackgroundFilled": {
        background: "#E5E4E2"
      },
      "&.Mui-expanded": {
        minHeight: "initial",
        borderBottomColor: t.palette.grey[100],
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      },
      "& .MuiIconButton-label": {
        fontSize: t.spacing(1.5),
        color: t.palette.common.black
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
        padding: t.spacing(0.5, 0)
      }
    },
    accordionSummaryNoPaddingRoot: {},
    accordionSummaryBackgroundFilled: {}
  })
), Kb = Xi(eg)(({ theme: t }) => ({
  boxShadow: "none",
  borderBottom: `1px solid ${t.palette.grey[100]}`,
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
    borderTop: `1px solid ${t.palette.grey[100]}`,
    backgroundColor: "transparent",
    "&:first-child": {
      borderTop: "none"
    },
    "& .MuiAccordionSummary-root": {
      padding: t.spacing(1, 0)
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
})), Ub = (t) => {
  const { children: e, testId: a, contained: r = !0, bordered: n, ...o } = t, i = r ? void 0 : "outlined", s = Au();
  return /* @__PURE__ */ U.jsx(
    Kb,
    {
      "data-cyid": a,
      variant: i,
      ...o,
      classes: {
        root: he({
          [s.accordion]: !0,
          [s.accordionBordered]: n
        })
      },
      children: e
    }
  );
}, qb = Xi(ng)(() => ({
  padding: 0
})), Gb = (t) => {
  const { testId: e, children: a, ...r } = t;
  return /* @__PURE__ */ U.jsx(qb, { "data-cyid": e, ...r, children: a });
}, Yb = (t) => {
  const {
    children: e,
    testId: a,
    noPadding: r = !1,
    expandIcon: n,
    backgroundFilled: o = !1,
    className: i,
    ...s
  } = t, l = Au();
  return /* @__PURE__ */ U.jsx(
    gg,
    {
      expandIcon: n || /* @__PURE__ */ U.jsx(Oi, { fontSize: "inherit", rotate: 90 }),
      "data-cyid": a,
      className: he(
        {
          [l.accordionSummaryRoot]: !0,
          [l.accordionSummaryNoPaddingRoot]: r,
          [l.accordionSummaryBackgroundFilled]: o
        },
        i
      ),
      ...s,
      children: e
    }
  );
}, Xb = ar(
  (t) => fr({
    root: {
      "& .MuiChip-icon": {
        color: "inherit"
      },
      "&$small": {
        fontSize: t.spacing(1.25),
        borderRadius: t.spacing(0.375),
        lineHeight: 1.2,
        height: t.spacing(2),
        "& .MuiChip-label": {
          padding: t.spacing(0, 0.5, 0.125, 0.5)
        },
        "& .MuiChip-icon": {
          marginLeft: t.spacing(0.5),
          marginRight: 0
        }
      },
      "&$medium": {
        fontSize: t.spacing(1.625),
        borderRadius: t.spacing(0.625),
        lineHeight: 1.23,
        height: t.spacing(3),
        "& .MuiChip-label": {
          padding: t.spacing(0.1, 1)
        },
        "& .MuiChip-icon": {
          marginLeft: t.spacing(1),
          marginRight: 0
        }
      },
      "&$large": {
        fontSize: t.spacing(1.625),
        borderRadius: t.spacing(0.625),
        lineHeight: 1.23,
        "& .MuiChip-label": {
          padding: t.spacing(1, 1.5)
        },
        "& .MuiChip-icon": {
          marginLeft: t.spacing(1.5),
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
        color: t.palette.common.white
      },
      "&$primary": {
        backgroundColor: t.palette.primary.main,
        color: t.palette.common.white
      },
      "&$secondary": {
        background: "#E5E4E2"
      },
      "&$success": {
        backgroundColor: t.palette.success.main,
        color: t.palette.common.white
      },
      "&$default": {
        backgroundColor: t.palette.grey[200]
      },
      "&$warning": {
        backgroundColor: t.palette.warning.dark,
        color: t.palette.common.white
      },
      "&$error": {
        backgroundColor: t.palette.error.main,
        color: t.palette.common.white
      }
    },
    outlined: {
      "&$info": {
        color: "#0095ff",
        border: "1px solid 0095ff",
        backgroundColor: Ue("#0095ff", 0.1)
      },
      "&$primary": {
        border: `1px solid ${t.palette.primary.main}`,
        color: t.palette.primary.main,
        backgroundColor: "#D8E1E8"
      },
      "&$secondary": {
        backgroundColor: t.palette.common.white,
        border: `1px solid ${t.palette.grey[200]}`
      },
      "&$success": {
        border: `1px solid ${t.palette.success.main}`,
        color: t.palette.success.main,
        backgroundColor: t.palette.success.light
      },
      "&$default": {
        backgroundColor: t.palette.grey[100],
        border: `1px solid ${t.palette.grey[200]}`
      },
      "&$warning": {
        border: `1px solid ${t.palette.warning.dark}`,
        color: t.palette.warning.dark,
        backgroundColor: t.palette.warning.light
      },
      "&$error": {
        border: `1px solid ${t.palette.error.main}`,
        color: t.palette.error.main,
        backgroundColor: t.palette.error.light
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
function Vl(t) {
  const {
    label: e,
    color: a = "default",
    variant: r = "contained",
    size: n = "medium",
    icon: o,
    testId: i,
    ...s
  } = t, l = Xb();
  return /* @__PURE__ */ U.jsx(
    $g,
    {
      classes: {
        root: he(
          l.root,
          l[n],
          l[r],
          l[a]
        )
      },
      icon: o,
      label: e,
      "data-cyid": `${i}-chip`,
      ...s
    }
  );
}
const Hl = (t) => t, Jb = () => {
  let t = Hl;
  return {
    configure(e) {
      t = e;
    },
    generate(e) {
      return t(e);
    },
    reset() {
      t = Hl;
    }
  };
}, Zb = Jb();
function Wr(t, ...e) {
  const a = new URL(`https://mui.com/production-error/?code=${t}`);
  return e.forEach((r) => a.searchParams.append("args[]", r)), `Minified MUI error #${t}; visit ${a} for the full message.`;
}
function yn(t) {
  if (typeof t != "string")
    throw new Error(Wr(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Iu(t) {
  var e, a, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var n = t.length;
    for (e = 0; e < n; e++) t[e] && (a = Iu(t[e])) && (r && (r += " "), r += a);
  } else for (a in t) t[a] && (r && (r += " "), r += a);
  return r;
}
function Qb() {
  for (var t, e, a = 0, r = "", n = arguments.length; a < n; a++) (t = arguments[a]) && (e = Iu(t)) && (r && (r += " "), r += e);
  return r;
}
function ey(t, e, a = void 0) {
  const r = {};
  for (const n in t) {
    const o = t[n];
    let i = "", s = !0;
    for (let l = 0; l < o.length; l += 1) {
      const u = o[l];
      u && (i += (s === !0 ? "" : " ") + e(u), s = !1, a && a[u] && (i += " " + a[u]));
    }
    r[n] = i;
  }
  return r;
}
var ti = { exports: {} }, vt = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kl;
function ty() {
  if (Kl) return vt;
  Kl = 1;
  var t = Symbol.for("react.transitional.element"), e = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), n = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), i = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), c = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), p = Symbol.for("react.view_transition"), h = Symbol.for("react.client.reference");
  function g(m) {
    if (typeof m == "object" && m !== null) {
      var y = m.$$typeof;
      switch (y) {
        case t:
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
                  return y;
              }
          }
        case e:
          return y;
      }
    }
  }
  return vt.ContextConsumer = o, vt.ContextProvider = i, vt.Element = t, vt.ForwardRef = s, vt.Fragment = a, vt.Lazy = d, vt.Memo = c, vt.Portal = e, vt.Profiler = n, vt.StrictMode = r, vt.Suspense = l, vt.SuspenseList = u, vt.isContextConsumer = function(m) {
    return g(m) === o;
  }, vt.isContextProvider = function(m) {
    return g(m) === i;
  }, vt.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === t;
  }, vt.isForwardRef = function(m) {
    return g(m) === s;
  }, vt.isFragment = function(m) {
    return g(m) === a;
  }, vt.isLazy = function(m) {
    return g(m) === d;
  }, vt.isMemo = function(m) {
    return g(m) === c;
  }, vt.isPortal = function(m) {
    return g(m) === e;
  }, vt.isProfiler = function(m) {
    return g(m) === n;
  }, vt.isStrictMode = function(m) {
    return g(m) === r;
  }, vt.isSuspense = function(m) {
    return g(m) === l;
  }, vt.isSuspenseList = function(m) {
    return g(m) === u;
  }, vt.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === a || m === n || m === r || m === l || m === u || typeof m == "object" && m !== null && (m.$$typeof === d || m.$$typeof === c || m.$$typeof === i || m.$$typeof === o || m.$$typeof === s || m.$$typeof === h || m.getModuleId !== void 0);
  }, vt.typeOf = g, vt;
}
var Ul;
function ry() {
  return Ul || (Ul = 1, ti.exports = /* @__PURE__ */ ty()), ti.exports;
}
var Mu = /* @__PURE__ */ ry();
function lr(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function ju(t) {
  if (/* @__PURE__ */ b.isValidElement(t) || Mu.isValidElementType(t) || !lr(t))
    return t;
  const e = {};
  return Object.keys(t).forEach((a) => {
    e[a] = ju(t[a]);
  }), e;
}
function Bt(t, e, a = {
  clone: !0
}) {
  const r = a.clone ? {
    ...t
  } : t;
  return lr(t) && lr(e) && Object.keys(e).forEach((n) => {
    /* @__PURE__ */ b.isValidElement(e[n]) || Mu.isValidElementType(e[n]) ? r[n] = e[n] : lr(e[n]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(t, n) && lr(t[n]) ? r[n] = Bt(t[n], e[n], a) : a.clone ? r[n] = lr(e[n]) ? ju(e[n]) : e[n] : r[n] = e[n];
  }), r;
}
function Vn(t, e) {
  return e ? Bt(t, e, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : t;
}
function ql(t, e) {
  if (!t.containerQueries)
    return e;
  const a = Object.keys(e).filter((r) => r.startsWith("@container")).sort((r, n) => {
    var i, s;
    const o = /min-width:\s*([0-9.]+)/;
    return +(((i = r.match(o)) == null ? void 0 : i[1]) || 0) - +(((s = n.match(o)) == null ? void 0 : s[1]) || 0);
  });
  return a.length ? a.reduce((r, n) => {
    const o = e[n];
    return delete r[n], r[n] = o, r;
  }, {
    ...e
  }) : e;
}
function ny(t, e) {
  return e === "@" || e.startsWith("@") && (t.some((a) => e.startsWith(`@${a}`)) || !!e.match(/^@\d/));
}
function ay(t, e) {
  const a = e.match(/^@([^/]+)?\/?(.+)?$/);
  if (!a)
    return null;
  const [, r, n] = a, o = Number.isNaN(+r) ? r || 0 : +r;
  return t.containerQueries(n).up(o);
}
function oy(t) {
  const e = (o, i) => o.replace("@media", i ? `@container ${i}` : "@container");
  function a(o, i) {
    o.up = (...s) => e(t.breakpoints.up(...s), i), o.down = (...s) => e(t.breakpoints.down(...s), i), o.between = (...s) => e(t.breakpoints.between(...s), i), o.only = (...s) => e(t.breakpoints.only(...s), i), o.not = (...s) => {
      const l = e(t.breakpoints.not(...s), i);
      return l.includes("not all and") ? l.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : l;
    };
  }
  const r = {}, n = (o) => (a(r, o), r);
  return a(n), {
    ...t,
    containerQueries: n
  };
}
const to = {
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
}, Gl = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (t) => `@media (min-width:${to[t]}px)`
}, iy = {
  containerQueries: (t) => ({
    up: (e) => {
      let a = typeof e == "number" ? e : to[e] || e;
      return typeof a == "number" && (a = `${a}px`), t ? `@container ${t} (min-width:${a})` : `@container (min-width:${a})`;
    }
  })
};
function ur(t, e, a) {
  const r = t.theme || {};
  if (Array.isArray(e)) {
    const o = r.breakpoints || Gl;
    return e.reduce((i, s, l) => (i[o.up(o.keys[l])] = a(e[l]), i), {});
  }
  if (typeof e == "object") {
    const o = r.breakpoints || Gl;
    return Object.keys(e).reduce((i, s) => {
      if (ny(o.keys, s)) {
        const l = ay(r.containerQueries ? r : iy, s);
        l && (i[l] = a(e[s], s));
      } else if (Object.keys(o.values || to).includes(s)) {
        const l = o.up(s);
        i[l] = a(e[s], s);
      } else {
        const l = s;
        i[l] = e[l];
      }
      return i;
    }, {});
  }
  return a(e);
}
function sy(t = {}) {
  var a;
  return ((a = t.keys) == null ? void 0 : a.reduce((r, n) => {
    const o = t.up(n);
    return r[o] = {}, r;
  }, {})) || {};
}
function Yl(t, e) {
  return t.reduce((a, r) => {
    const n = a[r];
    return (!n || Object.keys(n).length === 0) && delete a[r], a;
  }, e);
}
function ro(t, e, a = !0) {
  if (!e || typeof e != "string")
    return null;
  if (t && t.vars && a) {
    const r = `vars.${e}`.split(".").reduce((n, o) => n && n[o] ? n[o] : null, t);
    if (r != null)
      return r;
  }
  return e.split(".").reduce((r, n) => r && r[n] != null ? r[n] : null, t);
}
function za(t, e, a, r = a) {
  let n;
  return typeof t == "function" ? n = t(a) : Array.isArray(t) ? n = t[a] || r : n = ro(t, a) || r, e && (n = e(n, r, t)), n;
}
function kt(t) {
  const {
    prop: e,
    cssProperty: a = t.prop,
    themeKey: r,
    transform: n
  } = t, o = (i) => {
    if (i[e] == null)
      return null;
    const s = i[e], l = i.theme, u = ro(l, r) || {};
    return ur(i, s, (d) => {
      let p = za(u, n, d);
      return d === p && typeof d == "string" && (p = za(u, n, `${e}${d === "default" ? "" : yn(d)}`, d)), a === !1 ? p : {
        [a]: p
      };
    });
  };
  return o.propTypes = {}, o.filterProps = [e], o;
}
function ly(t) {
  const e = {};
  return (a) => (e[a] === void 0 && (e[a] = t(a)), e[a]);
}
const cy = {
  m: "margin",
  p: "padding"
}, uy = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Xl = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, dy = ly((t) => {
  if (t.length > 2)
    if (Xl[t])
      t = Xl[t];
    else
      return [t];
  const [e, a] = t.split(""), r = cy[e], n = uy[a] || "";
  return Array.isArray(n) ? n.map((o) => r + o) : [r + n];
}), fs = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], ps = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
[...fs, ...ps];
function aa(t, e, a, r) {
  const n = ro(t, e, !0) ?? a;
  return typeof n == "number" || typeof n == "string" ? (o) => typeof o == "string" ? o : typeof n == "string" ? n.startsWith("var(") && o === 0 ? 0 : n.startsWith("var(") && o === 1 ? n : `calc(${o} * ${n})` : n * o : Array.isArray(n) ? (o) => {
    if (typeof o == "string")
      return o;
    const i = Math.abs(o), s = n[i];
    return o >= 0 ? s : typeof s == "number" ? -s : typeof s == "string" && s.startsWith("var(") ? `calc(-1 * ${s})` : `-${s}`;
  } : typeof n == "function" ? n : () => {
  };
}
function hs(t) {
  return aa(t, "spacing", 8);
}
function oa(t, e) {
  return typeof e == "string" || e == null ? e : t(e);
}
function fy(t, e) {
  return (a) => t.reduce((r, n) => (r[n] = oa(e, a), r), {});
}
function py(t, e, a, r) {
  if (!e.includes(a))
    return null;
  const n = dy(a), o = fy(n, r), i = t[a];
  return ur(t, i, o);
}
function Du(t, e) {
  const a = hs(t.theme);
  return Object.keys(t).map((r) => py(t, e, r, a)).reduce(Vn, {});
}
function wt(t) {
  return Du(t, fs);
}
wt.propTypes = {};
wt.filterProps = fs;
function Et(t) {
  return Du(t, ps);
}
Et.propTypes = {};
Et.filterProps = ps;
function no(...t) {
  const e = t.reduce((r, n) => (n.filterProps.forEach((o) => {
    r[o] = n;
  }), r), {}), a = (r) => Object.keys(r).reduce((n, o) => e[o] ? Vn(n, e[o](r)) : n, {});
  return a.propTypes = {}, a.filterProps = t.reduce((r, n) => r.concat(n.filterProps), []), a;
}
function Vt(t) {
  return typeof t != "number" ? t : `${t}px solid`;
}
function Ut(t, e) {
  return kt({
    prop: t,
    themeKey: "borders",
    transform: e
  });
}
const hy = Ut("border", Vt), my = Ut("borderTop", Vt), gy = Ut("borderRight", Vt), vy = Ut("borderBottom", Vt), by = Ut("borderLeft", Vt), yy = Ut("borderColor"), xy = Ut("borderTopColor"), Sy = Ut("borderRightColor"), Cy = Ut("borderBottomColor"), wy = Ut("borderLeftColor"), Ey = Ut("outline", Vt), ky = Ut("outlineColor"), ao = (t) => {
  if (t.borderRadius !== void 0 && t.borderRadius !== null) {
    const e = aa(t.theme, "shape.borderRadius", 4), a = (r) => ({
      borderRadius: oa(e, r)
    });
    return ur(t, t.borderRadius, a);
  }
  return null;
};
ao.propTypes = {};
ao.filterProps = ["borderRadius"];
no(hy, my, gy, vy, by, yy, xy, Sy, Cy, wy, ao, Ey, ky);
const oo = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const e = aa(t.theme, "spacing", 8), a = (r) => ({
      gap: oa(e, r)
    });
    return ur(t, t.gap, a);
  }
  return null;
};
oo.propTypes = {};
oo.filterProps = ["gap"];
const io = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const e = aa(t.theme, "spacing", 8), a = (r) => ({
      columnGap: oa(e, r)
    });
    return ur(t, t.columnGap, a);
  }
  return null;
};
io.propTypes = {};
io.filterProps = ["columnGap"];
const so = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const e = aa(t.theme, "spacing", 8), a = (r) => ({
      rowGap: oa(e, r)
    });
    return ur(t, t.rowGap, a);
  }
  return null;
};
so.propTypes = {};
so.filterProps = ["rowGap"];
const $y = kt({
  prop: "gridColumn"
}), Ry = kt({
  prop: "gridRow"
}), Ty = kt({
  prop: "gridAutoFlow"
}), Oy = kt({
  prop: "gridAutoColumns"
}), _y = kt({
  prop: "gridAutoRows"
}), Py = kt({
  prop: "gridTemplateColumns"
}), Ay = kt({
  prop: "gridTemplateRows"
}), Iy = kt({
  prop: "gridTemplateAreas"
}), My = kt({
  prop: "gridArea"
});
no(oo, io, so, $y, Ry, Ty, Oy, _y, Py, Ay, Iy, My);
function pn(t, e) {
  return e === "grey" ? e : t;
}
const jy = kt({
  prop: "color",
  themeKey: "palette",
  transform: pn
}), Dy = kt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: pn
}), Ny = kt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: pn
});
no(jy, Dy, Ny);
function Ft(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const Ly = kt({
  prop: "width",
  transform: Ft
}), ms = (t) => {
  if (t.maxWidth !== void 0 && t.maxWidth !== null) {
    const e = (a) => {
      var n, o, i, s, l;
      const r = ((i = (o = (n = t.theme) == null ? void 0 : n.breakpoints) == null ? void 0 : o.values) == null ? void 0 : i[a]) || to[a];
      return r ? ((l = (s = t.theme) == null ? void 0 : s.breakpoints) == null ? void 0 : l.unit) !== "px" ? {
        maxWidth: `${r}${t.theme.breakpoints.unit}`
      } : {
        maxWidth: r
      } : {
        maxWidth: Ft(a)
      };
    };
    return ur(t, t.maxWidth, e);
  }
  return null;
};
ms.filterProps = ["maxWidth"];
const Fy = kt({
  prop: "minWidth",
  transform: Ft
}), By = kt({
  prop: "height",
  transform: Ft
}), zy = kt({
  prop: "maxHeight",
  transform: Ft
}), Wy = kt({
  prop: "minHeight",
  transform: Ft
});
kt({
  prop: "size",
  cssProperty: "width",
  transform: Ft
});
kt({
  prop: "size",
  cssProperty: "height",
  transform: Ft
});
const Vy = kt({
  prop: "boxSizing"
});
no(Ly, ms, Fy, By, zy, Wy, Vy);
const lo = {
  // borders
  border: {
    themeKey: "borders",
    transform: Vt
  },
  borderTop: {
    themeKey: "borders",
    transform: Vt
  },
  borderRight: {
    themeKey: "borders",
    transform: Vt
  },
  borderBottom: {
    themeKey: "borders",
    transform: Vt
  },
  borderLeft: {
    themeKey: "borders",
    transform: Vt
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
    transform: Vt
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: ao
  },
  // palette
  color: {
    themeKey: "palette",
    transform: pn
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: pn
  },
  backgroundColor: {
    themeKey: "palette",
    transform: pn
  },
  // spacing
  p: {
    style: Et
  },
  pt: {
    style: Et
  },
  pr: {
    style: Et
  },
  pb: {
    style: Et
  },
  pl: {
    style: Et
  },
  px: {
    style: Et
  },
  py: {
    style: Et
  },
  padding: {
    style: Et
  },
  paddingTop: {
    style: Et
  },
  paddingRight: {
    style: Et
  },
  paddingBottom: {
    style: Et
  },
  paddingLeft: {
    style: Et
  },
  paddingX: {
    style: Et
  },
  paddingY: {
    style: Et
  },
  paddingInline: {
    style: Et
  },
  paddingInlineStart: {
    style: Et
  },
  paddingInlineEnd: {
    style: Et
  },
  paddingBlock: {
    style: Et
  },
  paddingBlockStart: {
    style: Et
  },
  paddingBlockEnd: {
    style: Et
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
    transform: (t) => ({
      "@media print": {
        display: t
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
    style: oo
  },
  rowGap: {
    style: so
  },
  columnGap: {
    style: io
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
    transform: Ft
  },
  maxWidth: {
    style: ms
  },
  minWidth: {
    transform: Ft
  },
  height: {
    transform: Ft
  },
  maxHeight: {
    transform: Ft
  },
  minHeight: {
    transform: Ft
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
function Hy(...t) {
  const e = t.reduce((r, n) => r.concat(Object.keys(n)), []), a = new Set(e);
  return t.every((r) => a.size === Object.keys(r).length);
}
function Ky(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Uy() {
  function t(a, r, n, o) {
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
    const p = ro(n, u) || {};
    return d ? d(i) : ur(i, r, (g) => {
      let m = za(p, c, g);
      return g === m && typeof g == "string" && (m = za(p, c, `${a}${g === "default" ? "" : yn(g)}`, g)), l === !1 ? m : {
        [l]: m
      };
    });
  }
  function e(a) {
    const {
      sx: r,
      theme: n = {},
      nested: o
    } = a || {};
    if (!r)
      return null;
    const i = n.unstable_sxConfig ?? lo;
    function s(l) {
      let u = l;
      if (typeof l == "function")
        u = l(n);
      else if (typeof l != "object")
        return l;
      if (!u)
        return null;
      const c = sy(n.breakpoints), d = Object.keys(c);
      let p = c;
      return Object.keys(u).forEach((h) => {
        const g = Ky(u[h], n);
        if (g != null)
          if (typeof g == "object")
            if (i[h])
              p = Vn(p, t(h, g, n, i));
            else {
              const m = ur({
                theme: n
              }, g, (y) => ({
                [h]: y
              }));
              Hy(m, g) ? p[h] = e({
                sx: g,
                theme: n,
                nested: !0
              }) : p = Vn(p, m);
            }
          else
            p = Vn(p, t(h, g, n, i));
      }), !o && n.modularCssLayers ? {
        "@layer sx": ql(n, Yl(d, p))
      } : ql(n, Yl(d, p));
    }
    return Array.isArray(r) ? r.map(s) : s(r);
  }
  return e;
}
const xn = Uy();
xn.filterProps = ["sx"];
function qy(t) {
  if (t.sheet)
    return t.sheet;
  for (var e = 0; e < document.styleSheets.length; e++)
    if (document.styleSheets[e].ownerNode === t)
      return document.styleSheets[e];
}
function Gy(t) {
  var e = document.createElement("style");
  return e.setAttribute("data-emotion", t.key), t.nonce !== void 0 && e.setAttribute("nonce", t.nonce), e.appendChild(document.createTextNode("")), e.setAttribute("data-s", ""), e;
}
var Yy = /* @__PURE__ */ (function() {
  function t(a) {
    var r = this;
    this._insertTag = function(n) {
      var o;
      r.tags.length === 0 ? r.insertionPoint ? o = r.insertionPoint.nextSibling : r.prepend ? o = r.container.firstChild : o = r.before : o = r.tags[r.tags.length - 1].nextSibling, r.container.insertBefore(n, o), r.tags.push(n);
    }, this.isSpeedy = a.speedy === void 0 ? !0 : a.speedy, this.tags = [], this.ctr = 0, this.nonce = a.nonce, this.key = a.key, this.container = a.container, this.prepend = a.prepend, this.insertionPoint = a.insertionPoint, this.before = null;
  }
  var e = t.prototype;
  return e.hydrate = function(r) {
    r.forEach(this._insertTag);
  }, e.insert = function(r) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Gy(this));
    var n = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var o = qy(n);
      try {
        o.insertRule(r, o.cssRules.length);
      } catch {
      }
    } else
      n.appendChild(document.createTextNode(r));
    this.ctr++;
  }, e.flush = function() {
    this.tags.forEach(function(r) {
      var n;
      return (n = r.parentNode) == null ? void 0 : n.removeChild(r);
    }), this.tags = [], this.ctr = 0;
  }, t;
})(), It = "-ms-", Wa = "-moz-", it = "-webkit-", Nu = "comm", gs = "rule", vs = "decl", Xy = "@import", Lu = "@keyframes", Jy = "@layer", Zy = Math.abs, co = String.fromCharCode, Qy = Object.assign;
function e1(t, e) {
  return At(t, 0) ^ 45 ? (((e << 2 ^ At(t, 0)) << 2 ^ At(t, 1)) << 2 ^ At(t, 2)) << 2 ^ At(t, 3) : 0;
}
function Fu(t) {
  return t.trim();
}
function t1(t, e) {
  return (t = e.exec(t)) ? t[0] : t;
}
function st(t, e, a) {
  return t.replace(e, a);
}
function _i(t, e) {
  return t.indexOf(e);
}
function At(t, e) {
  return t.charCodeAt(e) | 0;
}
function qn(t, e, a) {
  return t.slice(e, a);
}
function er(t) {
  return t.length;
}
function bs(t) {
  return t.length;
}
function va(t, e) {
  return e.push(t), t;
}
function r1(t, e) {
  return t.map(e).join("");
}
var uo = 1, Sn = 1, Bu = 0, Lt = 0, Rt = 0, $n = "";
function fo(t, e, a, r, n, o, i) {
  return { value: t, root: e, parent: a, type: r, props: n, children: o, line: uo, column: Sn, length: i, return: "" };
}
function An(t, e) {
  return Qy(fo("", null, null, "", null, null, 0), t, { length: -t.length }, e);
}
function n1() {
  return Rt;
}
function a1() {
  return Rt = Lt > 0 ? At($n, --Lt) : 0, Sn--, Rt === 10 && (Sn = 1, uo--), Rt;
}
function zt() {
  return Rt = Lt < Bu ? At($n, Lt++) : 0, Sn++, Rt === 10 && (Sn = 1, uo++), Rt;
}
function nr() {
  return At($n, Lt);
}
function Oa() {
  return Lt;
}
function ia(t, e) {
  return qn($n, t, e);
}
function Gn(t) {
  switch (t) {
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
function zu(t) {
  return uo = Sn = 1, Bu = er($n = t), Lt = 0, [];
}
function Wu(t) {
  return $n = "", t;
}
function _a(t) {
  return Fu(ia(Lt - 1, Pi(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function o1(t) {
  for (; (Rt = nr()) && Rt < 33; )
    zt();
  return Gn(t) > 2 || Gn(Rt) > 3 ? "" : " ";
}
function i1(t, e) {
  for (; --e && zt() && !(Rt < 48 || Rt > 102 || Rt > 57 && Rt < 65 || Rt > 70 && Rt < 97); )
    ;
  return ia(t, Oa() + (e < 6 && nr() == 32 && zt() == 32));
}
function Pi(t) {
  for (; zt(); )
    switch (Rt) {
      // ] ) " '
      case t:
        return Lt;
      // " '
      case 34:
      case 39:
        t !== 34 && t !== 39 && Pi(Rt);
        break;
      // (
      case 40:
        t === 41 && Pi(t);
        break;
      // \
      case 92:
        zt();
        break;
    }
  return Lt;
}
function s1(t, e) {
  for (; zt() && t + Rt !== 57; )
    if (t + Rt === 84 && nr() === 47)
      break;
  return "/*" + ia(e, Lt - 1) + "*" + co(t === 47 ? t : zt());
}
function l1(t) {
  for (; !Gn(nr()); )
    zt();
  return ia(t, Lt);
}
function c1(t) {
  return Wu(Pa("", null, null, null, [""], t = zu(t), 0, [0], t));
}
function Pa(t, e, a, r, n, o, i, s, l) {
  for (var u = 0, c = 0, d = i, p = 0, h = 0, g = 0, m = 1, y = 1, w = 1, k = 0, I = "", f = n, x = o, E = r, N = I; y; )
    switch (g = k, k = zt()) {
      // (
      case 40:
        if (g != 108 && At(N, d - 1) == 58) {
          _i(N += st(_a(k), "&", "&\f"), "&\f") != -1 && (w = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        N += _a(k);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        N += o1(g);
        break;
      // \
      case 92:
        N += i1(Oa() - 1, 7);
        continue;
      // /
      case 47:
        switch (nr()) {
          case 42:
          case 47:
            va(u1(s1(zt(), Oa()), e, a), l);
            break;
          default:
            N += "/";
        }
        break;
      // {
      case 123 * m:
        s[u++] = er(N) * w;
      // } ; \0
      case 125 * m:
      case 59:
      case 0:
        switch (k) {
          // \0 }
          case 0:
          case 125:
            y = 0;
          // ;
          case 59 + c:
            w == -1 && (N = st(N, /\f/g, "")), h > 0 && er(N) - d && va(h > 32 ? Zl(N + ";", r, a, d - 1) : Zl(st(N, " ", "") + ";", r, a, d - 2), l);
            break;
          // @ ;
          case 59:
            N += ";";
          // { rule/at-rule
          default:
            if (va(E = Jl(N, e, a, u, c, n, s, I, f = [], x = [], d), o), k === 123)
              if (c === 0)
                Pa(N, e, E, E, f, o, d, s, x);
              else
                switch (p === 99 && At(N, 3) === 110 ? 100 : p) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Pa(t, E, E, r && va(Jl(t, E, E, 0, 0, n, s, I, n, f = [], d), x), n, x, d, s, r ? f : x);
                    break;
                  default:
                    Pa(N, E, E, E, [""], x, 0, s, x);
                }
        }
        u = c = h = 0, m = w = 1, I = N = "", d = i;
        break;
      // :
      case 58:
        d = 1 + er(N), h = g;
      default:
        if (m < 1) {
          if (k == 123)
            --m;
          else if (k == 125 && m++ == 0 && a1() == 125)
            continue;
        }
        switch (N += co(k), k * m) {
          // &
          case 38:
            w = c > 0 ? 1 : (N += "\f", -1);
            break;
          // ,
          case 44:
            s[u++] = (er(N) - 1) * w, w = 1;
            break;
          // @
          case 64:
            nr() === 45 && (N += _a(zt())), p = nr(), c = d = er(I = N += l1(Oa())), k++;
            break;
          // -
          case 45:
            g === 45 && er(N) == 2 && (m = 0);
        }
    }
  return o;
}
function Jl(t, e, a, r, n, o, i, s, l, u, c) {
  for (var d = n - 1, p = n === 0 ? o : [""], h = bs(p), g = 0, m = 0, y = 0; g < r; ++g)
    for (var w = 0, k = qn(t, d + 1, d = Zy(m = i[g])), I = t; w < h; ++w)
      (I = Fu(m > 0 ? p[w] + " " + k : st(k, /&\f/g, p[w]))) && (l[y++] = I);
  return fo(t, e, a, n === 0 ? gs : s, l, u, c);
}
function u1(t, e, a) {
  return fo(t, e, a, Nu, co(n1()), qn(t, 2, -2), 0);
}
function Zl(t, e, a, r) {
  return fo(t, e, a, vs, qn(t, 0, r), qn(t, r + 1, -1), r);
}
function hn(t, e) {
  for (var a = "", r = bs(t), n = 0; n < r; n++)
    a += e(t[n], n, t, e) || "";
  return a;
}
function d1(t, e, a, r) {
  switch (t.type) {
    case Jy:
      if (t.children.length) break;
    case Xy:
    case vs:
      return t.return = t.return || t.value;
    case Nu:
      return "";
    case Lu:
      return t.return = t.value + "{" + hn(t.children, r) + "}";
    case gs:
      t.value = t.props.join(",");
  }
  return er(a = hn(t.children, r)) ? t.return = t.value + "{" + a + "}" : "";
}
function f1(t) {
  var e = bs(t);
  return function(a, r, n, o) {
    for (var i = "", s = 0; s < e; s++)
      i += t[s](a, r, n, o) || "";
    return i;
  };
}
function p1(t) {
  return function(e) {
    e.root || (e = e.return) && t(e);
  };
}
function Vu(t) {
  var e = /* @__PURE__ */ Object.create(null);
  return function(a) {
    return e[a] === void 0 && (e[a] = t(a)), e[a];
  };
}
var h1 = function(e, a, r) {
  for (var n = 0, o = 0; n = o, o = nr(), n === 38 && o === 12 && (a[r] = 1), !Gn(o); )
    zt();
  return ia(e, Lt);
}, m1 = function(e, a) {
  var r = -1, n = 44;
  do
    switch (Gn(n)) {
      case 0:
        n === 38 && nr() === 12 && (a[r] = 1), e[r] += h1(Lt - 1, a, r);
        break;
      case 2:
        e[r] += _a(n);
        break;
      case 4:
        if (n === 44) {
          e[++r] = nr() === 58 ? "&\f" : "", a[r] = e[r].length;
          break;
        }
      // fallthrough
      default:
        e[r] += co(n);
    }
  while (n = zt());
  return e;
}, g1 = function(e, a) {
  return Wu(m1(zu(e), a));
}, Ql = /* @__PURE__ */ new WeakMap(), v1 = function(e) {
  if (!(e.type !== "rule" || !e.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  e.length < 1)) {
    for (var a = e.value, r = e.parent, n = e.column === r.column && e.line === r.line; r.type !== "rule"; )
      if (r = r.parent, !r) return;
    if (!(e.props.length === 1 && a.charCodeAt(0) !== 58 && !Ql.get(r)) && !n) {
      Ql.set(e, !0);
      for (var o = [], i = g1(a, o), s = r.props, l = 0, u = 0; l < i.length; l++)
        for (var c = 0; c < s.length; c++, u++)
          e.props[u] = o[l] ? i[l].replace(/&\f/g, s[c]) : s[c] + " " + i[l];
    }
  }
}, b1 = function(e) {
  if (e.type === "decl") {
    var a = e.value;
    // charcode for l
    a.charCodeAt(0) === 108 && // charcode for b
    a.charCodeAt(2) === 98 && (e.return = "", e.value = "");
  }
};
function Hu(t, e) {
  switch (e1(t, e)) {
    // color-adjust
    case 5103:
      return it + "print-" + t + t;
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
      return it + t + t;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return it + t + Wa + t + It + t + t;
    // flex, flex-direction
    case 6828:
    case 4268:
      return it + t + It + t + t;
    // order
    case 6165:
      return it + t + It + "flex-" + t + t;
    // align-items
    case 5187:
      return it + t + st(t, /(\w+).+(:[^]+)/, it + "box-$1$2" + It + "flex-$1$2") + t;
    // align-self
    case 5443:
      return it + t + It + "flex-item-" + st(t, /flex-|-self/, "") + t;
    // align-content
    case 4675:
      return it + t + It + "flex-line-pack" + st(t, /align-content|flex-|-self/, "") + t;
    // flex-shrink
    case 5548:
      return it + t + It + st(t, "shrink", "negative") + t;
    // flex-basis
    case 5292:
      return it + t + It + st(t, "basis", "preferred-size") + t;
    // flex-grow
    case 6060:
      return it + "box-" + st(t, "-grow", "") + it + t + It + st(t, "grow", "positive") + t;
    // transition
    case 4554:
      return it + st(t, /([^-])(transform)/g, "$1" + it + "$2") + t;
    // cursor
    case 6187:
      return st(st(st(t, /(zoom-|grab)/, it + "$1"), /(image-set)/, it + "$1"), t, "") + t;
    // background, background-image
    case 5495:
    case 3959:
      return st(t, /(image-set\([^]*)/, it + "$1$`$1");
    // justify-content
    case 4968:
      return st(st(t, /(.+:)(flex-)?(.*)/, it + "box-pack:$3" + It + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + it + t + t;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return st(t, /(.+)-inline(.+)/, it + "$1$2") + t;
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
      if (er(t) - 1 - e > 6) switch (At(t, e + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (At(t, e + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return st(t, /(.+:)(.+)-([^]+)/, "$1" + it + "$2-$3$1" + Wa + (At(t, e + 3) == 108 ? "$3" : "$2-$3")) + t;
        // (s)tretch
        case 115:
          return ~_i(t, "stretch") ? Hu(st(t, "stretch", "fill-available"), e) + t : t;
      }
      break;
    // position: sticky
    case 4949:
      if (At(t, e + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (At(t, er(t) - 3 - (~_i(t, "!important") && 10))) {
        // stic(k)y
        case 107:
          return st(t, ":", ":" + it) + t;
        // (inline-)?fl(e)x
        case 101:
          return st(t, /(.+:)([^;!]+)(;|!.+)?/, "$1" + it + (At(t, 14) === 45 ? "inline-" : "") + "box$3$1" + it + "$2$3$1" + It + "$2box$3") + t;
      }
      break;
    // writing-mode
    case 5936:
      switch (At(t, e + 11)) {
        // vertical-l(r)
        case 114:
          return it + t + It + st(t, /[svh]\w+-[tblr]{2}/, "tb") + t;
        // vertical-r(l)
        case 108:
          return it + t + It + st(t, /[svh]\w+-[tblr]{2}/, "tb-rl") + t;
        // horizontal(-)tb
        case 45:
          return it + t + It + st(t, /[svh]\w+-[tblr]{2}/, "lr") + t;
      }
      return it + t + It + t + t;
  }
  return t;
}
var y1 = function(e, a, r, n) {
  if (e.length > -1 && !e.return) switch (e.type) {
    case vs:
      e.return = Hu(e.value, e.length);
      break;
    case Lu:
      return hn([An(e, {
        value: st(e.value, "@", "@" + it)
      })], n);
    case gs:
      if (e.length) return r1(e.props, function(o) {
        switch (t1(o, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return hn([An(e, {
              props: [st(o, /:(read-\w+)/, ":" + Wa + "$1")]
            })], n);
          // :placeholder
          case "::placeholder":
            return hn([An(e, {
              props: [st(o, /:(plac\w+)/, ":" + it + "input-$1")]
            }), An(e, {
              props: [st(o, /:(plac\w+)/, ":" + Wa + "$1")]
            }), An(e, {
              props: [st(o, /:(plac\w+)/, It + "input-$1")]
            })], n);
        }
        return "";
      });
  }
}, x1 = [y1], S1 = function(e) {
  var a = e.key;
  if (a === "css") {
    var r = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(r, function(m) {
      var y = m.getAttribute("data-emotion");
      y.indexOf(" ") !== -1 && (document.head.appendChild(m), m.setAttribute("data-s", ""));
    });
  }
  var n = e.stylisPlugins || x1, o = {}, i, s = [];
  i = e.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + a + ' "]'),
    function(m) {
      for (var y = m.getAttribute("data-emotion").split(" "), w = 1; w < y.length; w++)
        o[y[w]] = !0;
      s.push(m);
    }
  );
  var l, u = [v1, b1];
  {
    var c, d = [d1, p1(function(m) {
      c.insert(m);
    })], p = f1(u.concat(n, d)), h = function(y) {
      return hn(c1(y), p);
    };
    l = function(y, w, k, I) {
      c = k, h(y ? y + "{" + w.styles + "}" : w.styles), I && (g.inserted[w.name] = !0);
    };
  }
  var g = {
    key: a,
    sheet: new Yy({
      key: a,
      container: i,
      nonce: e.nonce,
      speedy: e.speedy,
      prepend: e.prepend,
      insertionPoint: e.insertionPoint
    }),
    nonce: e.nonce,
    inserted: o,
    registered: {},
    insert: l
  };
  return g.sheet.hydrate(s), g;
}, C1 = !0;
function w1(t, e, a) {
  var r = "";
  return a.split(" ").forEach(function(n) {
    t[n] !== void 0 ? e.push(t[n] + ";") : n && (r += n + " ");
  }), r;
}
var Ku = function(e, a, r) {
  var n = e.key + "-" + a.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (r === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  C1 === !1) && e.registered[n] === void 0 && (e.registered[n] = a.styles);
}, E1 = function(e, a, r) {
  Ku(e, a, r);
  var n = e.key + "-" + a.name;
  if (e.inserted[a.name] === void 0) {
    var o = a;
    do
      e.insert(a === o ? "." + n : "", o, e.sheet, !0), o = o.next;
    while (o !== void 0);
  }
};
function k1(t) {
  for (var e = 0, a, r = 0, n = t.length; n >= 4; ++r, n -= 4)
    a = t.charCodeAt(r) & 255 | (t.charCodeAt(++r) & 255) << 8 | (t.charCodeAt(++r) & 255) << 16 | (t.charCodeAt(++r) & 255) << 24, a = /* Math.imul(k, m): */
    (a & 65535) * 1540483477 + ((a >>> 16) * 59797 << 16), a ^= /* k >>> r: */
    a >>> 24, e = /* Math.imul(k, m): */
    (a & 65535) * 1540483477 + ((a >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (e & 65535) * 1540483477 + ((e >>> 16) * 59797 << 16);
  switch (n) {
    case 3:
      e ^= (t.charCodeAt(r + 2) & 255) << 16;
    case 2:
      e ^= (t.charCodeAt(r + 1) & 255) << 8;
    case 1:
      e ^= t.charCodeAt(r) & 255, e = /* Math.imul(h, m): */
      (e & 65535) * 1540483477 + ((e >>> 16) * 59797 << 16);
  }
  return e ^= e >>> 13, e = /* Math.imul(h, m): */
  (e & 65535) * 1540483477 + ((e >>> 16) * 59797 << 16), ((e ^ e >>> 15) >>> 0).toString(36);
}
var $1 = {
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
}, R1 = /[A-Z]|^ms/g, T1 = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Uu = function(e) {
  return e.charCodeAt(1) === 45;
}, ec = function(e) {
  return e != null && typeof e != "boolean";
}, ri = /* @__PURE__ */ Vu(function(t) {
  return Uu(t) ? t : t.replace(R1, "-$&").toLowerCase();
}), tc = function(e, a) {
  switch (e) {
    case "animation":
    case "animationName":
      if (typeof a == "string")
        return a.replace(T1, function(r, n, o) {
          return tr = {
            name: n,
            styles: o,
            next: tr
          }, n;
        });
  }
  return $1[e] !== 1 && !Uu(e) && typeof a == "number" && a !== 0 ? a + "px" : a;
};
function Yn(t, e, a) {
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
        return tr = {
          name: n.name,
          styles: n.styles,
          next: tr
        }, n.name;
      var o = a;
      if (o.styles !== void 0) {
        var i = o.next;
        if (i !== void 0)
          for (; i !== void 0; )
            tr = {
              name: i.name,
              styles: i.styles,
              next: tr
            }, i = i.next;
        var s = o.styles + ";";
        return s;
      }
      return O1(t, e, a);
    }
    case "function": {
      if (t !== void 0) {
        var l = tr, u = a(t);
        return tr = l, Yn(t, e, u);
      }
      break;
    }
  }
  var c = a;
  if (e == null)
    return c;
  var d = e[c];
  return d !== void 0 ? d : c;
}
function O1(t, e, a) {
  var r = "";
  if (Array.isArray(a))
    for (var n = 0; n < a.length; n++)
      r += Yn(t, e, a[n]) + ";";
  else
    for (var o in a) {
      var i = a[o];
      if (typeof i != "object") {
        var s = i;
        e != null && e[s] !== void 0 ? r += o + "{" + e[s] + "}" : ec(s) && (r += ri(o) + ":" + tc(o, s) + ";");
      } else if (Array.isArray(i) && typeof i[0] == "string" && (e == null || e[i[0]] === void 0))
        for (var l = 0; l < i.length; l++)
          ec(i[l]) && (r += ri(o) + ":" + tc(o, i[l]) + ";");
      else {
        var u = Yn(t, e, i);
        switch (o) {
          case "animation":
          case "animationName": {
            r += ri(o) + ":" + u + ";";
            break;
          }
          default:
            r += o + "{" + u + "}";
        }
      }
    }
  return r;
}
var rc = /label:\s*([^\s;{]+)\s*(;|$)/g, tr;
function qu(t, e, a) {
  if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0)
    return t[0];
  var r = !0, n = "";
  tr = void 0;
  var o = t[0];
  if (o == null || o.raw === void 0)
    r = !1, n += Yn(a, e, o);
  else {
    var i = o;
    n += i[0];
  }
  for (var s = 1; s < t.length; s++)
    if (n += Yn(a, e, t[s]), r) {
      var l = o;
      n += l[s];
    }
  rc.lastIndex = 0;
  for (var u = "", c; (c = rc.exec(n)) !== null; )
    u += "-" + c[1];
  var d = k1(n) + u;
  return {
    name: d,
    styles: n,
    next: tr
  };
}
var _1 = function(e) {
  return e();
}, P1 = b.useInsertionEffect ? b.useInsertionEffect : !1, A1 = P1 || _1, Gu = /* @__PURE__ */ b.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ S1({
    key: "css"
  }) : null
);
Gu.Provider;
var I1 = function(e) {
  return /* @__PURE__ */ bc(function(a, r) {
    var n = $d(Gu);
    return e(a, n, r);
  });
}, M1 = /* @__PURE__ */ b.createContext({}), j1 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, D1 = /* @__PURE__ */ Vu(
  function(t) {
    return j1.test(t) || t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) < 91;
  }
  /* Z+1 */
), N1 = D1, L1 = function(e) {
  return e !== "theme";
}, nc = function(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96 ? N1 : L1;
}, ac = function(e, a, r) {
  var n;
  if (a) {
    var o = a.shouldForwardProp;
    n = e.__emotion_forwardProp && o ? function(i) {
      return e.__emotion_forwardProp(i) && o(i);
    } : o;
  }
  return typeof n != "function" && r && (n = e.__emotion_forwardProp), n;
}, F1 = function(e) {
  var a = e.cache, r = e.serialized, n = e.isStringTag;
  return Ku(a, r, n), A1(function() {
    return E1(a, r, n);
  }), null;
}, B1 = function t(e, a) {
  var r = e.__emotion_real === e, n = r && e.__emotion_base || e, o, i;
  a !== void 0 && (o = a.label, i = a.target);
  var s = ac(e, a, r), l = s || nc(n), u = !l("as");
  return function() {
    var c = arguments, d = r && e.__emotion_styles !== void 0 ? e.__emotion_styles.slice(0) : [];
    if (o !== void 0 && d.push("label:" + o + ";"), c[0] == null || c[0].raw === void 0)
      d.push.apply(d, c);
    else {
      var p = c[0];
      d.push(p[0]);
      for (var h = c.length, g = 1; g < h; g++)
        d.push(c[g], p[g]);
    }
    var m = I1(function(y, w, k) {
      var I = u && y.as || n, f = "", x = [], E = y;
      if (y.theme == null) {
        E = {};
        for (var N in y)
          E[N] = y[N];
        E.theme = b.useContext(M1);
      }
      typeof y.className == "string" ? f = w1(w.registered, x, y.className) : y.className != null && (f = y.className + " ");
      var z = qu(d.concat(x), w.registered, E);
      f += w.key + "-" + z.name, i !== void 0 && (f += " " + i);
      var O = u && s === void 0 ? nc(I) : l, P = {};
      for (var M in y)
        u && M === "as" || O(M) && (P[M] = y[M]);
      return P.className = f, k && (P.ref = k), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement(F1, {
        cache: w,
        serialized: z,
        isStringTag: typeof I == "string"
      }), /* @__PURE__ */ b.createElement(I, P));
    });
    return m.displayName = o !== void 0 ? o : "Styled(" + (typeof n == "string" ? n : n.displayName || n.name || "Component") + ")", m.defaultProps = e.defaultProps, m.__emotion_real = m, m.__emotion_base = n, m.__emotion_styles = d, m.__emotion_forwardProp = s, Object.defineProperty(m, "toString", {
      value: function() {
        return "." + i;
      }
    }), m.withComponent = function(y, w) {
      var k = t(y, Y({}, a, w, {
        shouldForwardProp: ac(m, w, !0)
      }));
      return k.apply(void 0, d);
    }, m;
  };
}, z1 = [
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
], Ai = B1.bind(null);
z1.forEach(function(t) {
  Ai[t] = Ai(t);
});
function W1(t, e) {
  return Ai(t, e);
}
function V1(t, e) {
  Array.isArray(t.__emotion_styles) && (t.__emotion_styles = e(t.__emotion_styles));
}
const oc = [];
function Fr(t) {
  return oc[0] = t, qu(oc);
}
const H1 = (t) => {
  const e = Object.keys(t).map((a) => ({
    key: a,
    val: t[a]
  })) || [];
  return e.sort((a, r) => a.val - r.val), e.reduce((a, r) => ({
    ...a,
    [r.key]: r.val
  }), {});
};
function K1(t) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: e = {
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
  } = t, o = H1(e), i = Object.keys(o);
  function s(p) {
    return `@media (min-width:${typeof e[p] == "number" ? e[p] : p}${a})`;
  }
  function l(p) {
    return `@media (max-width:${(typeof e[p] == "number" ? e[p] : p) - r / 100}${a})`;
  }
  function u(p, h) {
    const g = i.indexOf(h);
    return `@media (min-width:${typeof e[p] == "number" ? e[p] : p}${a}) and (max-width:${(g !== -1 && typeof e[i[g]] == "number" ? e[i[g]] : h) - r / 100}${a})`;
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
const U1 = {
  borderRadius: 4
};
function Yu(t = 8, e = hs({
  spacing: t
})) {
  if (t.mui)
    return t;
  const a = (...r) => (r.length === 0 ? [1] : r).map((o) => {
    const i = e(o);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" ");
  return a.mui = !0, a;
}
function q1(t, e) {
  var r;
  const a = this;
  if (a.vars) {
    if (!((r = a.colorSchemes) != null && r[t]) || typeof a.getColorSchemeSelector != "function")
      return {};
    let n = a.getColorSchemeSelector(t);
    return n === "&" ? e : ((n.includes("data-") || n.includes(".")) && (n = `*:where(${n.replace(/\s*&$/, "")}) &`), {
      [n]: e
    });
  }
  return a.palette.mode === t ? e : {};
}
function Xu(t = {}, ...e) {
  const {
    breakpoints: a = {},
    palette: r = {},
    spacing: n,
    shape: o = {},
    ...i
  } = t, s = K1(a), l = Yu(n);
  let u = Bt({
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
      ...U1,
      ...o
    }
  }, i);
  return u = oy(u), u.applyStyles = q1, u = e.reduce((c, d) => Bt(c, d), u), u.unstable_sxConfig = {
    ...lo,
    ...i == null ? void 0 : i.unstable_sxConfig
  }, u.unstable_sx = function(d) {
    return xn({
      sx: d,
      theme: this
    });
  }, u;
}
const G1 = {
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
function Ju(t, e, a = "Mui") {
  const r = G1[e];
  return r ? `${a}-${r}` : `${Zb.generate(t)}-${e}`;
}
function Y1(t, e, a = "Mui") {
  const r = {};
  return e.forEach((n) => {
    r[n] = Ju(t, n, a);
  }), r;
}
function Zu(t) {
  const {
    variants: e,
    ...a
  } = t, r = {
    variants: e,
    style: Fr(a),
    isProcessed: !0
  };
  return r.style === a || e && e.forEach((n) => {
    typeof n.style != "function" && (n.style = Fr(n.style));
  }), r;
}
const X1 = Xu();
function ni(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
function Nr(t, e) {
  return e && t && typeof t == "object" && t.styles && !t.styles.startsWith("@layer") && (t.styles = `@layer ${e}{${String(t.styles)}}`), t;
}
function J1(t) {
  return t ? (e, a) => a[t] : null;
}
function Z1(t, e, a) {
  t.theme = tx(t.theme) ? a : t.theme[e] || t.theme;
}
function Aa(t, e, a) {
  const r = typeof e == "function" ? e(t) : e;
  if (Array.isArray(r))
    return r.flatMap((n) => Aa(t, n, a));
  if (Array.isArray(r == null ? void 0 : r.variants)) {
    let n;
    if (r.isProcessed)
      n = a ? Nr(r.style, a) : r.style;
    else {
      const {
        variants: o,
        ...i
      } = r;
      n = a ? Nr(Fr(i), a) : i;
    }
    return Qu(t, r.variants, [n], a);
  }
  return r != null && r.isProcessed ? a ? Nr(Fr(r.style), a) : r.style : a ? Nr(Fr(r), a) : r;
}
function Qu(t, e, a = [], r = void 0) {
  var o;
  let n;
  e: for (let i = 0; i < e.length; i += 1) {
    const s = e[i];
    if (typeof s.props == "function") {
      if (n ?? (n = {
        ...t,
        ...t.ownerState,
        ownerState: t.ownerState
      }), !s.props(n))
        continue;
    } else
      for (const l in s.props)
        if (t[l] !== s.props[l] && ((o = t.ownerState) == null ? void 0 : o[l]) !== s.props[l])
          continue e;
    typeof s.style == "function" ? (n ?? (n = {
      ...t,
      ...t.ownerState,
      ownerState: t.ownerState
    }), a.push(r ? Nr(Fr(s.style(n)), r) : s.style(n))) : a.push(r ? Nr(Fr(s.style), r) : s.style);
  }
  return a;
}
function Q1(t = {}) {
  const {
    themeId: e,
    defaultTheme: a = X1,
    rootShouldForwardProp: r = ni,
    slotShouldForwardProp: n = ni
  } = t;
  function o(s) {
    Z1(s, e, a);
  }
  return (s, l = {}) => {
    V1(s, (E) => E.filter((N) => N !== xn));
    const {
      name: u,
      slot: c,
      skipVariantsResolver: d,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: h = J1(nx(c)),
      ...g
    } = l, m = u && u.startsWith("Mui") || c ? "components" : "custom", y = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      c && c !== "Root" && c !== "root" || !1
    ), w = p || !1;
    let k = ni;
    c === "Root" || c === "root" ? k = r : c ? k = n : rx(s) && (k = void 0);
    const I = W1(s, {
      shouldForwardProp: k,
      label: ex(),
      ...g
    }), f = (E) => {
      if (E.__emotion_real === E)
        return E;
      if (typeof E == "function")
        return function(z) {
          return Aa(z, E, z.theme.modularCssLayers ? m : void 0);
        };
      if (lr(E)) {
        const N = Zu(E);
        return function(O) {
          return N.variants ? Aa(O, N, O.theme.modularCssLayers ? m : void 0) : O.theme.modularCssLayers ? Nr(N.style, m) : N.style;
        };
      }
      return E;
    }, x = (...E) => {
      const N = [], z = E.map(f), O = [];
      if (N.push(o), u && h && O.push(function(C) {
        var W, F;
        const L = (F = (W = C.theme.components) == null ? void 0 : W[u]) == null ? void 0 : F.styleOverrides;
        if (!L)
          return null;
        const R = {};
        for (const G in L)
          R[G] = Aa(C, L[G], C.theme.modularCssLayers ? "theme" : void 0);
        return h(C, R);
      }), u && !y && O.push(function(C) {
        var R, W;
        const D = C.theme, L = (W = (R = D == null ? void 0 : D.components) == null ? void 0 : R[u]) == null ? void 0 : W.variants;
        return L ? Qu(C, L, [], C.theme.modularCssLayers ? "theme" : void 0) : null;
      }), w || O.push(xn), Array.isArray(z[0])) {
        const v = z.shift(), C = new Array(N.length).fill(""), D = new Array(O.length).fill("");
        let L;
        L = [...C, ...v, ...D], L.raw = [...C, ...v.raw, ...D], N.unshift(L);
      }
      const P = [...N, ...z, ...O], M = I(...P);
      return s.muiName && (M.muiName = s.muiName), M;
    };
    return I.withConfig && (x.withConfig = I.withConfig), x;
  };
}
function ex(t, e) {
  return void 0;
}
function tx(t) {
  for (const e in t)
    return !1;
  return !0;
}
function rx(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96;
}
function nx(t) {
  return t && t.charAt(0).toLowerCase() + t.slice(1);
}
function ed(t) {
  var e, a, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var n = t.length;
    for (e = 0; e < n; e++) t[e] && (a = ed(t[e])) && (r && (r += " "), r += a);
  } else for (a in t) t[a] && (r && (r += " "), r += a);
  return r;
}
function ax() {
  for (var t, e, a = 0, r = "", n = arguments.length; a < n; a++) (t = arguments[a]) && (e = ed(t)) && (r && (r += " "), r += e);
  return r;
}
function Ii(t, e, a = !1) {
  const r = {
    ...e
  };
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      const o = n;
      if (o === "components" || o === "slots")
        r[o] = {
          ...t[o],
          ...r[o]
        };
      else if (o === "componentsProps" || o === "slotProps") {
        const i = t[o], s = e[o];
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
              r[o][u] = Ii(i[u], s[u], a);
            }
        }
      } else o === "className" && a && e.className ? r.className = ax(t == null ? void 0 : t.className, e == null ? void 0 : e.className) : o === "style" && a && e.style ? r.style = {
        ...t == null ? void 0 : t.style,
        ...e == null ? void 0 : e.style
      } : r[o] === void 0 && (r[o] = t[o]);
    }
  return r;
}
function ox(t, e = Number.MIN_SAFE_INTEGER, a = Number.MAX_SAFE_INTEGER) {
  return Math.max(e, Math.min(t, a));
}
function ys(t, e = 0, a = 1) {
  return ox(t, e, a);
}
function ix(t) {
  t = t.slice(1);
  const e = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, "g");
  let a = t.match(e);
  return a && a[0].length === 1 && (a = a.map((r) => r + r)), a ? `rgb${a.length === 4 ? "a" : ""}(${a.map((r, n) => n < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function kr(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
    return kr(ix(t));
  const e = t.indexOf("("), a = t.substring(0, e);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(a))
    throw new Error(Wr(9, t));
  let r = t.substring(e + 1, t.length - 1), n;
  if (a === "color") {
    if (r = r.split(" "), n = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(n))
      throw new Error(Wr(10, n));
  } else
    r = r.split(",");
  return r = r.map((o) => parseFloat(o)), {
    type: a,
    values: r,
    colorSpace: n
  };
}
const sx = (t) => {
  const e = kr(t);
  return e.values.slice(0, 3).map((a, r) => e.type.includes("hsl") && r !== 0 ? `${a}%` : a).join(" ");
}, Ln = (t, e) => {
  try {
    return sx(t);
  } catch {
    return t;
  }
};
function po(t) {
  const {
    type: e,
    colorSpace: a
  } = t;
  let {
    values: r
  } = t;
  return e.includes("rgb") ? r = r.map((n, o) => o < 3 ? parseInt(n, 10) : n) : e.includes("hsl") && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), e.includes("color") ? r = `${a} ${r.join(" ")}` : r = `${r.join(", ")}`, `${e}(${r})`;
}
function td(t) {
  t = kr(t);
  const {
    values: e
  } = t, a = e[0], r = e[1] / 100, n = e[2] / 100, o = r * Math.min(n, 1 - n), i = (u, c = (u + a / 30) % 12) => n - o * Math.max(Math.min(c - 3, 9 - c, 1), -1);
  let s = "rgb";
  const l = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return t.type === "hsla" && (s += "a", l.push(e[3])), po({
    type: s,
    values: l
  });
}
function Mi(t) {
  t = kr(t);
  let e = t.type === "hsl" || t.type === "hsla" ? kr(td(t)).values : t.values;
  return e = e.map((a) => (t.type !== "color" && (a /= 255), a <= 0.03928 ? a / 12.92 : ((a + 0.055) / 1.055) ** 2.4)), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function lx(t, e) {
  const a = Mi(t), r = Mi(e);
  return (Math.max(a, r) + 0.05) / (Math.min(a, r) + 0.05);
}
function rd(t, e) {
  return t = kr(t), e = ys(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.type === "color" ? t.values[3] = `/${e}` : t.values[3] = e, po(t);
}
function Ar(t, e, a) {
  try {
    return rd(t, e);
  } catch {
    return t;
  }
}
function ho(t, e) {
  if (t = kr(t), e = ys(e), t.type.includes("hsl"))
    t.values[2] *= 1 - e;
  else if (t.type.includes("rgb") || t.type.includes("color"))
    for (let a = 0; a < 3; a += 1)
      t.values[a] *= 1 - e;
  return po(t);
}
function dt(t, e, a) {
  try {
    return ho(t, e);
  } catch {
    return t;
  }
}
function mo(t, e) {
  if (t = kr(t), e = ys(e), t.type.includes("hsl"))
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.includes("rgb"))
    for (let a = 0; a < 3; a += 1)
      t.values[a] += (255 - t.values[a]) * e;
  else if (t.type.includes("color"))
    for (let a = 0; a < 3; a += 1)
      t.values[a] += (1 - t.values[a]) * e;
  return po(t);
}
function ft(t, e, a) {
  try {
    return mo(t, e);
  } catch {
    return t;
  }
}
function cx(t, e = 0.15) {
  return Mi(t) > 0.5 ? ho(t, e) : mo(t, e);
}
function ba(t, e, a) {
  try {
    return cx(t, e);
  } catch {
    return t;
  }
}
const ux = /* @__PURE__ */ b.createContext(void 0);
function dx(t) {
  const {
    theme: e,
    name: a,
    props: r
  } = t;
  if (!e || !e.components || !e.components[a])
    return r;
  const n = e.components[a];
  return n.defaultProps ? Ii(n.defaultProps, r, e.components.mergeClassNameAndStyle) : !n.styleOverrides && !n.variants ? Ii(n, r, e.components.mergeClassNameAndStyle) : r;
}
function fx({
  props: t,
  name: e
}) {
  const a = b.useContext(ux);
  return dx({
    props: t,
    name: e,
    theme: {
      components: a
    }
  });
}
const ic = {
  theme: void 0
};
function px(t) {
  let e, a;
  return function(n) {
    let o = e;
    return (o === void 0 || n.theme !== a) && (ic.theme = n.theme, o = Zu(t(ic)), e = o, a = n.theme), o;
  };
}
function hx(t = "") {
  function e(...r) {
    if (!r.length)
      return "";
    const n = r[0];
    return typeof n == "string" && !n.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${t ? `${t}-` : ""}${n}${e(...r.slice(1))})` : `, ${n}`;
  }
  return (r, ...n) => `var(--${t ? `${t}-` : ""}${r}${e(...n)})`;
}
const sc = (t, e, a, r = []) => {
  let n = t;
  e.forEach((o, i) => {
    i === e.length - 1 ? Array.isArray(n) ? n[Number(o)] = a : n && typeof n == "object" && (n[o] = a) : n && typeof n == "object" && (n[o] || (n[o] = r.includes(o) ? [] : {}), n = n[o]);
  });
}, mx = (t, e, a) => {
  function r(n, o = [], i = []) {
    Object.entries(n).forEach(([s, l]) => {
      (!a || a && !a([...o, s])) && l != null && (typeof l == "object" && Object.keys(l).length > 0 ? r(l, [...o, s], Array.isArray(l) ? [...i, s] : i) : e([...o, s], l, i));
    });
  }
  r(t);
}, gx = (t, e) => typeof e == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((r) => t.includes(r)) || t[t.length - 1].toLowerCase().includes("opacity") ? e : `${e}px` : e;
function ai(t, e) {
  const {
    prefix: a,
    shouldSkipGeneratingVar: r
  } = e || {}, n = {}, o = {}, i = {};
  return mx(
    t,
    (s, l, u) => {
      if ((typeof l == "string" || typeof l == "number") && (!r || !r(s, l))) {
        const c = `--${a ? `${a}-` : ""}${s.join("-")}`, d = gx(s, l);
        Object.assign(n, {
          [c]: d
        }), sc(o, s, `var(${c})`, u), sc(i, s, `var(${c}, ${d})`, u);
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
function vx(t, e = {}) {
  const {
    getSelector: a = w,
    disableCssColorScheme: r,
    colorSchemeSelector: n,
    enableContrastVars: o
  } = e, {
    colorSchemes: i = {},
    components: s,
    defaultColorScheme: l = "light",
    ...u
  } = t, {
    vars: c,
    css: d,
    varsWithDefaults: p
  } = ai(u, e);
  let h = p;
  const g = {}, {
    [l]: m,
    ...y
  } = i;
  if (Object.entries(y || {}).forEach(([f, x]) => {
    const {
      vars: E,
      css: N,
      varsWithDefaults: z
    } = ai(x, e);
    h = Bt(h, z), g[f] = {
      css: N,
      vars: E
    };
  }), m) {
    const {
      css: f,
      vars: x,
      varsWithDefaults: E
    } = ai(m, e);
    h = Bt(h, E), g[l] = {
      css: f,
      vars: x
    };
  }
  function w(f, x) {
    var N, z;
    let E = n;
    if (n === "class" && (E = ".%s"), n === "data" && (E = "[data-%s]"), n != null && n.startsWith("data-") && !n.includes("%s") && (E = `[${n}="%s"]`), f) {
      if (E === "media")
        return t.defaultColorScheme === f ? ":root" : {
          [`@media (prefers-color-scheme: ${((z = (N = i[f]) == null ? void 0 : N.palette) == null ? void 0 : z.mode) || f})`]: {
            ":root": x
          }
        };
      if (E)
        return t.defaultColorScheme === f ? `:root, ${E.replace("%s", String(f))}` : E.replace("%s", String(f));
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
        f = Bt(f, x);
      }), f;
    },
    generateStyleSheets: () => {
      var O, P;
      const f = [], x = t.defaultColorScheme || "light";
      function E(M, v) {
        Object.keys(v).length && f.push(typeof M == "string" ? {
          [M]: {
            ...v
          }
        } : M);
      }
      E(a(void 0, {
        ...d
      }), d);
      const {
        [x]: N,
        ...z
      } = g;
      if (N) {
        const {
          css: M
        } = N, v = (P = (O = i[x]) == null ? void 0 : O.palette) == null ? void 0 : P.mode, C = !r && v ? {
          colorScheme: v,
          ...M
        } : {
          ...M
        };
        E(a(x, {
          ...C
        }), C);
      }
      return Object.entries(z).forEach(([M, {
        css: v
      }]) => {
        var L, R;
        const C = (R = (L = i[M]) == null ? void 0 : L.palette) == null ? void 0 : R.mode, D = !r && C ? {
          colorScheme: C,
          ...v
        } : {
          ...v
        };
        E(a(M, {
          ...D
        }), D);
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
function bx(t) {
  return function(a) {
    return t === "media" ? `@media (prefers-color-scheme: ${a})` : t ? t.startsWith("data-") && !t.includes("%s") ? `[${t}="${a}"] &` : t === "class" ? `.${a} &` : t === "data" ? `[data-${a}] &` : `${t.replace("%s", a)} &` : "&";
  };
}
const Xn = {
  black: "#000",
  white: "#fff"
}, yx = {
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
}, an = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, on = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, In = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, sn = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, ln = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, cn = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
};
function nd() {
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
      paper: Xn.white,
      default: Xn.white
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
const ad = nd();
function od() {
  return {
    text: {
      primary: Xn.white,
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
      active: Xn.white,
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
const ji = od();
function lc(t, e, a, r) {
  const n = r.light || r, o = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(a) ? t[e] = t[a] : e === "light" ? t.light = mo(t.main, n) : e === "dark" && (t.dark = ho(t.main, o)));
}
function cc(t, e, a, r, n) {
  const o = n.light || n, i = n.dark || n * 1.5;
  e[a] || (e.hasOwnProperty(r) ? e[a] = e[r] : a === "light" ? e.light = `color-mix(in ${t}, ${e.main}, #fff ${(o * 100).toFixed(0)}%)` : a === "dark" && (e.dark = `color-mix(in ${t}, ${e.main}, #000 ${(i * 100).toFixed(0)}%)`));
}
function xx(t = "light") {
  return t === "dark" ? {
    main: sn[200],
    light: sn[50],
    dark: sn[400]
  } : {
    main: sn[700],
    light: sn[400],
    dark: sn[800]
  };
}
function Sx(t = "light") {
  return t === "dark" ? {
    main: an[200],
    light: an[50],
    dark: an[400]
  } : {
    main: an[500],
    light: an[300],
    dark: an[700]
  };
}
function Cx(t = "light") {
  return t === "dark" ? {
    main: on[500],
    light: on[300],
    dark: on[700]
  } : {
    main: on[700],
    light: on[400],
    dark: on[800]
  };
}
function wx(t = "light") {
  return t === "dark" ? {
    main: ln[400],
    light: ln[300],
    dark: ln[700]
  } : {
    main: ln[700],
    light: ln[500],
    dark: ln[900]
  };
}
function Ex(t = "light") {
  return t === "dark" ? {
    main: cn[400],
    light: cn[300],
    dark: cn[700]
  } : {
    main: cn[800],
    light: cn[500],
    dark: cn[900]
  };
}
function kx(t = "light") {
  return t === "dark" ? {
    main: In[400],
    light: In[300],
    dark: In[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: In[500],
    dark: In[900]
  };
}
function $x(t) {
  return `oklch(from ${t} var(--__l) 0 h / var(--__a))`;
}
function xs(t) {
  const {
    mode: e = "light",
    contrastThreshold: a = 3,
    tonalOffset: r = 0.2,
    colorSpace: n,
    ...o
  } = t, i = t.primary || xx(e), s = t.secondary || Sx(e), l = t.error || Cx(e), u = t.info || wx(e), c = t.success || Ex(e), d = t.warning || kx(e);
  function p(y) {
    return n ? $x(y) : lx(y, ji.text.primary) >= a ? ji.text.primary : ad.text.primary;
  }
  const h = ({
    color: y,
    name: w,
    mainShade: k = 500,
    lightShade: I = 300,
    darkShade: f = 700
  }) => {
    if (y = {
      ...y
    }, !y.main && y[k] && (y.main = y[k]), !y.hasOwnProperty("main"))
      throw new Error(Wr(11, w ? ` (${w})` : "", k));
    if (typeof y.main != "string")
      throw new Error(Wr(12, w ? ` (${w})` : "", JSON.stringify(y.main)));
    return n ? (cc(n, y, "light", I, r), cc(n, y, "dark", f, r)) : (lc(y, "light", I, r), lc(y, "dark", f, r)), y.contrastText || (y.contrastText = p(y.main)), y;
  };
  let g;
  return e === "light" ? g = nd() : e === "dark" && (g = od()), Bt({
    // A collection of common colors.
    common: {
      ...Xn
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: e,
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
    grey: yx,
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
function Rx(t) {
  const e = {};
  return Object.entries(t).forEach((r) => {
    const [n, o] = r;
    typeof o == "object" && (e[n] = `${o.fontStyle ? `${o.fontStyle} ` : ""}${o.fontVariant ? `${o.fontVariant} ` : ""}${o.fontWeight ? `${o.fontWeight} ` : ""}${o.fontStretch ? `${o.fontStretch} ` : ""}${o.fontSize || ""}${o.lineHeight ? `/${o.lineHeight} ` : ""}${o.fontFamily || ""}`);
  }), e;
}
function Tx(t, e) {
  return {
    toolbar: {
      minHeight: 56,
      [t.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [t.up("sm")]: {
        minHeight: 64
      }
    },
    ...e
  };
}
function Ox(t) {
  return Math.round(t * 1e5) / 1e5;
}
const uc = {
  textTransform: "uppercase"
}, dc = '"Roboto", "Helvetica", "Arial", sans-serif';
function _x(t, e) {
  const {
    fontFamily: a = dc,
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
  } = typeof e == "function" ? e(t) : e, p = r / 14, h = c || ((y) => `${y / l * p}rem`), g = (y, w, k, I, f) => ({
    fontFamily: a,
    fontWeight: y,
    fontSize: h(w),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: k,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...a === dc ? {
      letterSpacing: `${Ox(I / w)}em`
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
    button: g(i, 14, 1.75, 0.4, uc),
    caption: g(o, 12, 1.66, 0.4),
    overline: g(o, 12, 2.66, 1, uc),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Bt({
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
const Px = 0.2, Ax = 0.14, Ix = 0.12;
function St(...t) {
  return [`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${Px})`, `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${Ax})`, `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${Ix})`].join(",");
}
const Mx = ["none", St(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), St(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), St(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), St(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), St(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), St(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), St(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), St(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), St(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), St(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), St(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), St(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), St(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), St(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), St(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), St(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), St(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), St(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), St(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), St(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), St(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), St(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), St(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), St(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], jx = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Dx = {
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
function fc(t) {
  return `${Math.round(t)}ms`;
}
function Nx(t) {
  if (!t)
    return 0;
  const e = t / 36;
  return Math.min(Math.round((4 + 15 * e ** 0.25 + e / 5) * 10), 3e3);
}
function Lx(t) {
  const e = {
    ...jx,
    ...t.easing
  }, a = {
    ...Dx,
    ...t.duration
  };
  return {
    getAutoHeightDuration: Nx,
    create: (n = ["all"], o = {}) => {
      const {
        duration: i = a.standard,
        easing: s = e.easeInOut,
        delay: l = 0,
        ...u
      } = o;
      return (Array.isArray(n) ? n : [n]).map((c) => `${c} ${typeof i == "string" ? i : fc(i)} ${s} ${typeof l == "string" ? l : fc(l)}`).join(",");
    },
    ...t,
    easing: e,
    duration: a
  };
}
const Fx = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function Bx(t) {
  return lr(t) || typeof t > "u" || typeof t == "string" || typeof t == "boolean" || typeof t == "number" || Array.isArray(t);
}
function id(t = {}) {
  const e = {
    ...t
  };
  function a(r) {
    const n = Object.entries(r);
    for (let o = 0; o < n.length; o++) {
      const [i, s] = n[o];
      !Bx(s) || i.startsWith("unstable_") ? delete r[i] : lr(s) && (r[i] = {
        ...s
      }, a(r[i]));
    }
  }
  return a(e), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(e, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function pc(t) {
  return typeof t == "number" ? `${(t * 100).toFixed(0)}%` : `calc((${t}) * 100%)`;
}
const zx = (t) => {
  if (!Number.isNaN(+t))
    return +t;
  const e = t.match(/\d*\.?\d+/g);
  if (!e)
    return 0;
  let a = 0;
  for (let r = 0; r < e.length; r += 1)
    a += +e[r];
  return a;
};
function Wx(t) {
  Object.assign(t, {
    alpha(e, a) {
      const r = this || t;
      return r.colorSpace ? `oklch(from ${e} l c h / ${typeof a == "string" ? `calc(${a})` : a})` : r.vars ? `rgba(${e.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, "var(--$1Channel)")} / ${typeof a == "string" ? `calc(${a})` : a})` : rd(e, zx(a));
    },
    lighten(e, a) {
      const r = this || t;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${e}, #fff ${pc(a)})` : mo(e, a);
    },
    darken(e, a) {
      const r = this || t;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${e}, #000 ${pc(a)})` : ho(e, a);
    }
  });
}
function Di(t = {}, ...e) {
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
  } = t;
  if (t.vars && // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
  // `generateThemeVars` is the closest identifier for checking that the `options` is a result of `createTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
  t.generateThemeVars === void 0)
    throw new Error(Wr(20));
  const d = xs({
    ...o,
    colorSpace: u
  }), p = Xu(t);
  let h = Bt(p, {
    mixins: Tx(p.breakpoints, r),
    palette: d,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Mx.slice(),
    typography: _x(d, s),
    transitions: Lx(i),
    zIndex: {
      ...Fx
    }
  });
  return h = Bt(h, c), h = e.reduce((g, m) => Bt(g, m), h), h.unstable_sxConfig = {
    ...lo,
    ...c == null ? void 0 : c.unstable_sxConfig
  }, h.unstable_sx = function(m) {
    return xn({
      sx: m,
      theme: this
    });
  }, h.toRuntimeSource = id, Wx(h), h;
}
function Vx(t) {
  let e;
  return t < 1 ? e = 5.11916 * t ** 2 : e = 4.5 * Math.log(t + 1) + 2, Math.round(e * 10) / 1e3;
}
const Hx = [...Array(25)].map((t, e) => {
  if (e === 0)
    return "none";
  const a = Vx(e);
  return `linear-gradient(rgba(255 255 255 / ${a}), rgba(255 255 255 / ${a}))`;
});
function sd(t) {
  return {
    inputPlaceholder: t === "dark" ? 0.5 : 0.42,
    inputUnderline: t === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: t === "dark" ? 0.2 : 0.12,
    switchTrack: t === "dark" ? 0.3 : 0.38
  };
}
function ld(t) {
  return t === "dark" ? Hx : [];
}
function Kx(t) {
  const {
    palette: e = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: a,
    overlays: r,
    colorSpace: n,
    ...o
  } = t, i = xs({
    ...e,
    colorSpace: n
  });
  return {
    palette: i,
    opacity: {
      ...sd(i.mode),
      ...a
    },
    overlays: r || ld(i.mode),
    ...o
  };
}
function Ux(t) {
  var e;
  return !!t[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!t[0].match(/sxConfig$/) || // ends with sxConfig
  t[0] === "palette" && !!((e = t[1]) != null && e.match(/(mode|contrastThreshold|tonalOffset)/));
}
const qx = (t) => [...[...Array(25)].map((e, a) => `--${t ? `${t}-` : ""}overlays-${a}`), `--${t ? `${t}-` : ""}palette-AppBar-darkBg`, `--${t ? `${t}-` : ""}palette-AppBar-darkColor`], Gx = (t) => (e, a) => {
  const r = t.rootSelector || ":root", n = t.colorSchemeSelector;
  let o = n;
  if (n === "class" && (o = ".%s"), n === "data" && (o = "[data-%s]"), n != null && n.startsWith("data-") && !n.includes("%s") && (o = `[${n}="%s"]`), t.defaultColorScheme === e) {
    if (e === "dark") {
      const i = {};
      return qx(t.cssVarPrefix).forEach((s) => {
        i[s] = a[s], delete a[s];
      }), o === "media" ? {
        [r]: a,
        "@media (prefers-color-scheme: dark)": {
          [r]: i
        }
      } : o ? {
        [o.replace("%s", e)]: i,
        [`${r}, ${o.replace("%s", e)}`]: a
      } : {
        [r]: {
          ...a,
          ...i
        }
      };
    }
    if (o && o !== "media")
      return `${r}, ${o.replace("%s", String(e))}`;
  } else if (e) {
    if (o === "media")
      return {
        [`@media (prefers-color-scheme: ${String(e)})`]: {
          [r]: a
        }
      };
    if (o)
      return o.replace("%s", String(e));
  }
  return r;
};
function Yx(t, e) {
  e.forEach((a) => {
    t[a] || (t[a] = {});
  });
}
function ne(t, e, a) {
  !t[e] && a && (t[e] = a);
}
function Fn(t) {
  return typeof t != "string" || !t.startsWith("hsl") ? t : td(t);
}
function sr(t, e) {
  `${e}Channel` in t || (t[`${e}Channel`] = Ln(Fn(t[e])));
}
function Xx(t) {
  return typeof t == "number" ? `${t}px` : typeof t == "string" || typeof t == "function" || Array.isArray(t) ? t : "8px";
}
const Qt = (t) => {
  try {
    return t();
  } catch {
  }
}, Jx = (t = "mui") => hx(t);
function oi(t, e, a, r, n) {
  if (!a)
    return;
  a = a === !0 ? {} : a;
  const o = n === "dark" ? "dark" : "light";
  if (!r) {
    e[n] = Kx({
      ...a,
      palette: {
        mode: o,
        ...a == null ? void 0 : a.palette
      },
      colorSpace: t
    });
    return;
  }
  const {
    palette: i,
    ...s
  } = Di({
    ...r,
    palette: {
      mode: o,
      ...a == null ? void 0 : a.palette
    },
    colorSpace: t
  });
  return e[n] = {
    ...a,
    palette: i,
    opacity: {
      ...sd(o),
      ...a == null ? void 0 : a.opacity
    },
    overlays: (a == null ? void 0 : a.overlays) || ld(o)
  }, s;
}
function Zx(t = {}, ...e) {
  const {
    colorSchemes: a = {
      light: !0
    },
    defaultColorScheme: r,
    disableCssColorScheme: n = !1,
    cssVarPrefix: o = "mui",
    nativeColor: i = !1,
    shouldSkipGeneratingVar: s = Ux,
    colorSchemeSelector: l = a.light && a.dark ? "media" : void 0,
    rootSelector: u = ":root",
    ...c
  } = t, d = Object.keys(a)[0], p = r || (a.light && d !== "light" ? "light" : d), h = Jx(o), {
    [p]: g,
    light: m,
    dark: y,
    ...w
  } = a, k = {
    ...w
  };
  let I = g;
  if ((p === "dark" && !("dark" in a) || p === "light" && !("light" in a)) && (I = !0), !I)
    throw new Error(Wr(21, p));
  let f;
  i && (f = "oklch");
  const x = oi(f, k, I, c, p);
  m && !k.light && oi(f, k, m, void 0, "light"), y && !k.dark && oi(f, k, y, void 0, "dark");
  let E = {
    defaultColorScheme: p,
    ...x,
    cssVarPrefix: o,
    colorSchemeSelector: l,
    rootSelector: u,
    getCssVar: h,
    colorSchemes: k,
    font: {
      ...Rx(x.typography),
      ...x.font
    },
    spacing: Xx(c.spacing)
  };
  Object.keys(E.colorSchemes).forEach((M) => {
    const v = E.colorSchemes[M].palette, C = (L) => {
      const R = L.split("-"), W = R[1], F = R[2];
      return h(L, v[W][F]);
    };
    v.mode === "light" && (ne(v.common, "background", "#fff"), ne(v.common, "onBackground", "#000")), v.mode === "dark" && (ne(v.common, "background", "#000"), ne(v.common, "onBackground", "#fff"));
    function D(L, R, W) {
      if (f) {
        let F;
        return L === Ar && (F = `transparent ${((1 - W) * 100).toFixed(0)}%`), L === dt && (F = `#000 ${(W * 100).toFixed(0)}%`), L === ft && (F = `#fff ${(W * 100).toFixed(0)}%`), `color-mix(in ${f}, ${R}, ${F})`;
      }
      return L(R, W);
    }
    if (Yx(v, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), v.mode === "light") {
      ne(v.Alert, "errorColor", D(dt, v.error.light, 0.6)), ne(v.Alert, "infoColor", D(dt, v.info.light, 0.6)), ne(v.Alert, "successColor", D(dt, v.success.light, 0.6)), ne(v.Alert, "warningColor", D(dt, v.warning.light, 0.6)), ne(v.Alert, "errorFilledBg", C("palette-error-main")), ne(v.Alert, "infoFilledBg", C("palette-info-main")), ne(v.Alert, "successFilledBg", C("palette-success-main")), ne(v.Alert, "warningFilledBg", C("palette-warning-main")), ne(v.Alert, "errorFilledColor", Qt(() => v.getContrastText(v.error.main))), ne(v.Alert, "infoFilledColor", Qt(() => v.getContrastText(v.info.main))), ne(v.Alert, "successFilledColor", Qt(() => v.getContrastText(v.success.main))), ne(v.Alert, "warningFilledColor", Qt(() => v.getContrastText(v.warning.main))), ne(v.Alert, "errorStandardBg", D(ft, v.error.light, 0.9)), ne(v.Alert, "infoStandardBg", D(ft, v.info.light, 0.9)), ne(v.Alert, "successStandardBg", D(ft, v.success.light, 0.9)), ne(v.Alert, "warningStandardBg", D(ft, v.warning.light, 0.9)), ne(v.Alert, "errorIconColor", C("palette-error-main")), ne(v.Alert, "infoIconColor", C("palette-info-main")), ne(v.Alert, "successIconColor", C("palette-success-main")), ne(v.Alert, "warningIconColor", C("palette-warning-main")), ne(v.AppBar, "defaultBg", C("palette-grey-100")), ne(v.Avatar, "defaultBg", C("palette-grey-400")), ne(v.Button, "inheritContainedBg", C("palette-grey-300")), ne(v.Button, "inheritContainedHoverBg", C("palette-grey-A100")), ne(v.Chip, "defaultBorder", C("palette-grey-400")), ne(v.Chip, "defaultAvatarColor", C("palette-grey-700")), ne(v.Chip, "defaultIconColor", C("palette-grey-700")), ne(v.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), ne(v.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), ne(v.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), ne(v.LinearProgress, "primaryBg", D(ft, v.primary.main, 0.62)), ne(v.LinearProgress, "secondaryBg", D(ft, v.secondary.main, 0.62)), ne(v.LinearProgress, "errorBg", D(ft, v.error.main, 0.62)), ne(v.LinearProgress, "infoBg", D(ft, v.info.main, 0.62)), ne(v.LinearProgress, "successBg", D(ft, v.success.main, 0.62)), ne(v.LinearProgress, "warningBg", D(ft, v.warning.main, 0.62)), ne(v.Skeleton, "bg", f ? D(Ar, v.text.primary, 0.11) : `rgba(${C("palette-text-primaryChannel")} / 0.11)`), ne(v.Slider, "primaryTrack", D(ft, v.primary.main, 0.62)), ne(v.Slider, "secondaryTrack", D(ft, v.secondary.main, 0.62)), ne(v.Slider, "errorTrack", D(ft, v.error.main, 0.62)), ne(v.Slider, "infoTrack", D(ft, v.info.main, 0.62)), ne(v.Slider, "successTrack", D(ft, v.success.main, 0.62)), ne(v.Slider, "warningTrack", D(ft, v.warning.main, 0.62));
      const L = f ? D(dt, v.background.default, 0.6825) : ba(v.background.default, 0.8);
      ne(v.SnackbarContent, "bg", L), ne(v.SnackbarContent, "color", Qt(() => f ? ji.text.primary : v.getContrastText(L))), ne(v.SpeedDialAction, "fabHoverBg", ba(v.background.paper, 0.15)), ne(v.StepConnector, "border", C("palette-grey-400")), ne(v.StepContent, "border", C("palette-grey-400")), ne(v.Switch, "defaultColor", C("palette-common-white")), ne(v.Switch, "defaultDisabledColor", C("palette-grey-100")), ne(v.Switch, "primaryDisabledColor", D(ft, v.primary.main, 0.62)), ne(v.Switch, "secondaryDisabledColor", D(ft, v.secondary.main, 0.62)), ne(v.Switch, "errorDisabledColor", D(ft, v.error.main, 0.62)), ne(v.Switch, "infoDisabledColor", D(ft, v.info.main, 0.62)), ne(v.Switch, "successDisabledColor", D(ft, v.success.main, 0.62)), ne(v.Switch, "warningDisabledColor", D(ft, v.warning.main, 0.62)), ne(v.TableCell, "border", D(ft, D(Ar, v.divider, 1), 0.88)), ne(v.Tooltip, "bg", D(Ar, v.grey[700], 0.92));
    }
    if (v.mode === "dark") {
      ne(v.Alert, "errorColor", D(ft, v.error.light, 0.6)), ne(v.Alert, "infoColor", D(ft, v.info.light, 0.6)), ne(v.Alert, "successColor", D(ft, v.success.light, 0.6)), ne(v.Alert, "warningColor", D(ft, v.warning.light, 0.6)), ne(v.Alert, "errorFilledBg", C("palette-error-dark")), ne(v.Alert, "infoFilledBg", C("palette-info-dark")), ne(v.Alert, "successFilledBg", C("palette-success-dark")), ne(v.Alert, "warningFilledBg", C("palette-warning-dark")), ne(v.Alert, "errorFilledColor", Qt(() => v.getContrastText(v.error.dark))), ne(v.Alert, "infoFilledColor", Qt(() => v.getContrastText(v.info.dark))), ne(v.Alert, "successFilledColor", Qt(() => v.getContrastText(v.success.dark))), ne(v.Alert, "warningFilledColor", Qt(() => v.getContrastText(v.warning.dark))), ne(v.Alert, "errorStandardBg", D(dt, v.error.light, 0.9)), ne(v.Alert, "infoStandardBg", D(dt, v.info.light, 0.9)), ne(v.Alert, "successStandardBg", D(dt, v.success.light, 0.9)), ne(v.Alert, "warningStandardBg", D(dt, v.warning.light, 0.9)), ne(v.Alert, "errorIconColor", C("palette-error-main")), ne(v.Alert, "infoIconColor", C("palette-info-main")), ne(v.Alert, "successIconColor", C("palette-success-main")), ne(v.Alert, "warningIconColor", C("palette-warning-main")), ne(v.AppBar, "defaultBg", C("palette-grey-900")), ne(v.AppBar, "darkBg", C("palette-background-paper")), ne(v.AppBar, "darkColor", C("palette-text-primary")), ne(v.Avatar, "defaultBg", C("palette-grey-600")), ne(v.Button, "inheritContainedBg", C("palette-grey-800")), ne(v.Button, "inheritContainedHoverBg", C("palette-grey-700")), ne(v.Chip, "defaultBorder", C("palette-grey-700")), ne(v.Chip, "defaultAvatarColor", C("palette-grey-300")), ne(v.Chip, "defaultIconColor", C("palette-grey-300")), ne(v.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), ne(v.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), ne(v.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), ne(v.LinearProgress, "primaryBg", D(dt, v.primary.main, 0.5)), ne(v.LinearProgress, "secondaryBg", D(dt, v.secondary.main, 0.5)), ne(v.LinearProgress, "errorBg", D(dt, v.error.main, 0.5)), ne(v.LinearProgress, "infoBg", D(dt, v.info.main, 0.5)), ne(v.LinearProgress, "successBg", D(dt, v.success.main, 0.5)), ne(v.LinearProgress, "warningBg", D(dt, v.warning.main, 0.5)), ne(v.Skeleton, "bg", f ? D(Ar, v.text.primary, 0.13) : `rgba(${C("palette-text-primaryChannel")} / 0.13)`), ne(v.Slider, "primaryTrack", D(dt, v.primary.main, 0.5)), ne(v.Slider, "secondaryTrack", D(dt, v.secondary.main, 0.5)), ne(v.Slider, "errorTrack", D(dt, v.error.main, 0.5)), ne(v.Slider, "infoTrack", D(dt, v.info.main, 0.5)), ne(v.Slider, "successTrack", D(dt, v.success.main, 0.5)), ne(v.Slider, "warningTrack", D(dt, v.warning.main, 0.5));
      const L = f ? D(ft, v.background.default, 0.985) : ba(v.background.default, 0.98);
      ne(v.SnackbarContent, "bg", L), ne(v.SnackbarContent, "color", Qt(() => f ? ad.text.primary : v.getContrastText(L))), ne(v.SpeedDialAction, "fabHoverBg", ba(v.background.paper, 0.15)), ne(v.StepConnector, "border", C("palette-grey-600")), ne(v.StepContent, "border", C("palette-grey-600")), ne(v.Switch, "defaultColor", C("palette-grey-300")), ne(v.Switch, "defaultDisabledColor", C("palette-grey-600")), ne(v.Switch, "primaryDisabledColor", D(dt, v.primary.main, 0.55)), ne(v.Switch, "secondaryDisabledColor", D(dt, v.secondary.main, 0.55)), ne(v.Switch, "errorDisabledColor", D(dt, v.error.main, 0.55)), ne(v.Switch, "infoDisabledColor", D(dt, v.info.main, 0.55)), ne(v.Switch, "successDisabledColor", D(dt, v.success.main, 0.55)), ne(v.Switch, "warningDisabledColor", D(dt, v.warning.main, 0.55)), ne(v.TableCell, "border", D(dt, D(Ar, v.divider, 1), 0.68)), ne(v.Tooltip, "bg", D(Ar, v.grey[700], 0.92));
    }
    sr(v.background, "default"), sr(v.background, "paper"), sr(v.common, "background"), sr(v.common, "onBackground"), sr(v, "divider"), Object.keys(v).forEach((L) => {
      const R = v[L];
      L !== "tonalOffset" && R && typeof R == "object" && (R.main && ne(v[L], "mainChannel", Ln(Fn(R.main))), R.light && ne(v[L], "lightChannel", Ln(Fn(R.light))), R.dark && ne(v[L], "darkChannel", Ln(Fn(R.dark))), R.contrastText && ne(v[L], "contrastTextChannel", Ln(Fn(R.contrastText))), L === "text" && (sr(v[L], "primary"), sr(v[L], "secondary")), L === "action" && (R.active && sr(v[L], "active"), R.selected && sr(v[L], "selected")));
    });
  }), E = e.reduce((M, v) => Bt(M, v), E);
  const N = {
    prefix: o,
    disableCssColorScheme: n,
    shouldSkipGeneratingVar: s,
    getSelector: Gx(E),
    enableContrastVars: i
  }, {
    vars: z,
    generateThemeVars: O,
    generateStyleSheets: P
  } = vx(E, N);
  return E.vars = z, Object.entries(E.colorSchemes[E.defaultColorScheme]).forEach(([M, v]) => {
    E[M] = v;
  }), E.generateThemeVars = O, E.generateStyleSheets = P, E.generateSpacing = function() {
    return Yu(c.spacing, hs(this));
  }, E.getColorSchemeSelector = bx(l), E.spacing = E.generateSpacing(), E.shouldSkipGeneratingVar = s, E.unstable_sxConfig = {
    ...lo,
    ...c == null ? void 0 : c.unstable_sxConfig
  }, E.unstable_sx = function(v) {
    return xn({
      sx: v,
      theme: this
    });
  }, E.toRuntimeSource = id, E;
}
function hc(t, e, a) {
  t.colorSchemes && a && (t.colorSchemes[e] = {
    ...a !== !0 && a,
    palette: xs({
      ...a === !0 ? {} : a.palette,
      mode: e
    })
    // cast type to skip module augmentation test
  });
}
function Qx(t = {}, ...e) {
  const {
    palette: a,
    cssVariables: r = !1,
    colorSchemes: n = a ? void 0 : {
      light: !0
    },
    defaultColorScheme: o = a == null ? void 0 : a.mode,
    ...i
  } = t, s = o || "light", l = n == null ? void 0 : n[s], u = {
    ...n,
    ...a ? {
      [s]: {
        ...typeof l != "boolean" && l,
        palette: a
      }
    } : void 0
  };
  if (r === !1) {
    if (!("colorSchemes" in t))
      return Di(t, ...e);
    let c = a;
    "palette" in t || u[s] && (u[s] !== !0 ? c = u[s].palette : s === "dark" && (c = {
      mode: "dark"
    }));
    const d = Di({
      ...t,
      palette: c
    }, ...e);
    return d.defaultColorScheme = s, d.colorSchemes = u, d.palette.mode === "light" && (d.colorSchemes.light = {
      ...u.light !== !0 && u.light,
      palette: d.palette
    }, hc(d, "dark", u.dark)), d.palette.mode === "dark" && (d.colorSchemes.dark = {
      ...u.dark !== !0 && u.dark,
      palette: d.palette
    }, hc(d, "light", u.light)), d;
  }
  return !a && !("light" in u) && s === "light" && (u.light = !0), Zx({
    ...i,
    colorSchemes: u,
    defaultColorScheme: s,
    ...typeof r != "boolean" && r
  }, ...e);
}
const e2 = Qx(), t2 = "$$material";
function r2(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const n2 = (t) => r2(t) && t !== "classes", a2 = Q1({
  themeId: t2,
  defaultTheme: e2,
  rootShouldForwardProp: n2
}), o2 = px;
function i2(t) {
  return fx(t);
}
function s2(t) {
  return Ju("MuiSvgIcon", t);
}
Y1("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const l2 = (t) => {
  const {
    color: e,
    fontSize: a,
    classes: r
  } = t, n = {
    root: ["root", e !== "inherit" && `color${yn(e)}`, `fontSize${yn(a)}`]
  };
  return ey(n, s2, r);
}, c2 = a2("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (t, e) => {
    const {
      ownerState: a
    } = t;
    return [e.root, a.color !== "inherit" && e[`color${yn(a.color)}`], e[`fontSize${yn(a.fontSize)}`]];
  }
})(o2(({
  theme: t
}) => {
  var e, a, r, n, o, i, s, l, u, c, d, p, h, g;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    flexShrink: 0,
    transition: (n = (e = t.transitions) == null ? void 0 : e.create) == null ? void 0 : n.call(e, "fill", {
      duration: (r = (a = (t.vars ?? t).transitions) == null ? void 0 : a.duration) == null ? void 0 : r.shorter
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
          fontSize: ((i = (o = t.typography) == null ? void 0 : o.pxToRem) == null ? void 0 : i.call(o, 20)) || "1.25rem"
        }
      },
      {
        props: {
          fontSize: "medium"
        },
        style: {
          fontSize: ((l = (s = t.typography) == null ? void 0 : s.pxToRem) == null ? void 0 : l.call(s, 24)) || "1.5rem"
        }
      },
      {
        props: {
          fontSize: "large"
        },
        style: {
          fontSize: ((c = (u = t.typography) == null ? void 0 : u.pxToRem) == null ? void 0 : c.call(u, 35)) || "2.1875rem"
        }
      },
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((t.vars ?? t).palette).filter(([, m]) => m && m.main).map(([m]) => {
        var y, w;
        return {
          props: {
            color: m
          },
          style: {
            color: (w = (y = (t.vars ?? t).palette) == null ? void 0 : y[m]) == null ? void 0 : w.main
          }
        };
      }),
      {
        props: {
          color: "action"
        },
        style: {
          color: (p = (d = (t.vars ?? t).palette) == null ? void 0 : d.action) == null ? void 0 : p.active
        }
      },
      {
        props: {
          color: "disabled"
        },
        style: {
          color: (g = (h = (t.vars ?? t).palette) == null ? void 0 : h.action) == null ? void 0 : g.disabled
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
})), Ni = /* @__PURE__ */ b.forwardRef(function(e, a) {
  const r = i2({
    props: e,
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
  } = r, g = /* @__PURE__ */ b.isValidElement(n) && n.type === "svg", m = {
    ...r,
    color: i,
    component: s,
    fontSize: l,
    instanceFontSize: e.fontSize,
    inheritViewBox: c,
    viewBox: p,
    hasSvgAsChild: g
  }, y = {};
  c || (y.viewBox = p);
  const w = l2(m);
  return /* @__PURE__ */ U.jsxs(c2, {
    as: s,
    className: Qb(w.root, o),
    focusable: "false",
    color: u,
    "aria-hidden": d ? void 0 : !0,
    role: d ? "img" : void 0,
    ref: a,
    ...y,
    ...h,
    ...g && n.props,
    ownerState: m,
    children: [g ? n.props.children : n, d ? /* @__PURE__ */ U.jsx("title", {
      children: d
    }) : null]
  });
});
Ni.muiName = "SvgIcon";
function u2(t, e) {
  function a(r, n) {
    return /* @__PURE__ */ U.jsx(Ni, {
      "data-testid": void 0,
      ref: n,
      ...r,
      children: t
    });
  }
  return a.muiName = Ni.muiName, /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(a));
}
const d2 = u2(/* @__PURE__ */ U.jsx("path", {
  d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"
})), f2 = (t) => {
  const { value: e, testId: a, size: r, stopPropagation: n } = t, o = e, i = "Copy to Clipboard", s = "Copied", [l, u] = Wt(i), c = () => {
    u(i);
  }, d = (p) => {
    u(s), Pu(o), n && p.stopPropagation();
  };
  return /* @__PURE__ */ U.jsx(
    us,
    {
      title: l,
      onClose: c,
      placement: "top-end",
      children: /* @__PURE__ */ U.jsx(_e, { component: "span", children: /* @__PURE__ */ U.jsx(Zc, { size: "small", color: "primary", onClick: (p) => d(p), children: /* @__PURE__ */ U.jsx(d2, {}) }) })
    }
  );
}, p2 = ar(
  (t) => fr({
    infoTooltipDark: {
      color: t.palette.grey[100],
      backgroundColor: t.palette.secondary.dark,
      borderRadius: 5
    },
    infoArrowDark: {
      color: t.palette.secondary.dark
    },
    infoTooltipLight: {
      color: t.palette.secondary.dark,
      backgroundColor: t.palette.common.white,
      borderRadius: 5,
      maxWidth: t.spacing(53)
    },
    infoArrowLight: {
      color: t.palette.common.white
    }
  })
), h2 = ar(
  (t) => fr({
    divider: {
      marginTop: t.spacing(1),
      marginBottom: t.spacing(1),
      backgroundColor: t.palette.grey[100]
    },
    buttonLink: {
      color: t.palette.primary.main,
      cursor: "pointer",
      marginTop: t.spacing(1.5),
      textDecoration: "none"
    },
    dividerDark: {
      backgroundColor: t.palette.grey[100]
    },
    exampleContent: {
      fontWeight: 100,
      marginTop: t.spacing(1),
      marginBottom: t.spacing(1)
    },
    exampleContentDark: {
      color: t.palette.grey[100]
    },
    exampleContentLight: {
      color: t.palette.secondary.dark
    }
  })
);
function m2(t) {
  const { children: e, classes: a, disabled: r, title: n, ...o } = t;
  return r ? /* @__PURE__ */ U.jsx(U.Fragment, { children: e }) : /* @__PURE__ */ U.jsx(U.Fragment, { children: e && n && /* @__PURE__ */ U.jsx(
    us,
    {
      ...o,
      classes: a,
      interactive: !0,
      title: n,
      children: e
    }
  ) });
}
function mc(t) {
  const {
    children: e,
    heading: a,
    disabled: r,
    content: n,
    example: o,
    action: i,
    darken: s = !0,
    ...l
  } = t, u = h2(), c = p2(), d = /* @__PURE__ */ U.jsxs(_e, { p: 0.5, children: [
    a && /* @__PURE__ */ U.jsx(_e, { mb: n ? 1 : 0, children: /* @__PURE__ */ U.jsx(Kt, { variant: "h5", children: a }) }),
    n && /* @__PURE__ */ U.jsx(Kt, { variant: "body2", children: n }),
    (i || o) && /* @__PURE__ */ U.jsx(Vg, { className: u.divider }),
    o && /* @__PURE__ */ U.jsxs(
      Kt,
      {
        className: he({
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
    i && /* @__PURE__ */ U.jsx(
      d0,
      {
        href: i.link,
        className: u.buttonLink,
        target: "_blank",
        rel: "noreferrer",
        children: i.text
      }
    )
  ] });
  return e ? /* @__PURE__ */ U.jsx(
    m2,
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
      children: e
    }
  ) : null;
}
const cd = ar((t) => ({
  root: {
    padding: t.spacing(0.5, 1.5),
    width: "100%",
    minHeight: t.spacing(5),
    backgroundColor: t.palette.common.white,
    border: `1px solid ${t.palette.grey[100]}`,
    boxShadow: `0 1px 2px -1px ${Ue(
      t.palette.common.black,
      0.08
    )}, 0 -3px 9px 0 ${Ue(t.palette.common.black, 0.04)} inset`,
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
      paddingLeft: t.spacing(2)
    },
    "&:hover": {
      borderColor: "#ccd1f2"
    }
  },
  rootSmall: {
    minHeight: t.spacing(4)
  },
  rootLarge: {
    minHeight: t.spacing(7),
    borderRadius: 12,
    padding: t.spacing(1, 1, 1, 3)
  },
  textInput: (e) => ({
    minHeight: t.spacing(2.5),
    padding: t.spacing(0.125, 0),
    fontSize: t.typography[e.typography || "body1"].fontSize,
    fontWeight: t.typography[e.typography || "body1"].fontWeight,
    lineHeight: t.typography[e.typography || "body1"].lineHeight
  }),
  textInputLarge: (e) => ({
    fontSize: t.typography[e.typography || "overline"].fontSize,
    fontWeight: t.typography[e.typography || "overline"].fontWeight,
    lineHeight: t.typography[e.typography || "overline"].lineHeight
  }),
  textInputDisabled: {
    "&:hover": {
      borderColor: t.palette.grey[100]
    }
  },
  inputAdornedEnd: {
    "& .MuiInputAdornment-root": {
      marginRight: t.spacing(-1)
    }
  },
  inputAdornedEndAlignTop: {
    "& .MuiInputAdornment-root": {
      alignSelf: "flex-end",
      height: "auto",
      marginBottom: t.spacing(0.25)
    }
  },
  multiline: {},
  multilineReadonly: {},
  multilineResizeIndicator: {},
  rounded: {
    borderRadius: t.spacing(2.5)
  },
  focused: {
    borderColor: t.palette.primary.light,
    borderWidth: 1,
    boxShadow: `0 -3px 9px 0 ${Ue(
      t.palette.common.black,
      0.04
    )} inset, 0 0 0 2px #D8E1E8`,
    "&:hover": {
      borderColor: t.palette.primary.light
    }
  },
  error: {
    background: t.palette.error.light,
    borderColor: t.palette.error.main,
    boxShadow: `0 0 0 1px ${t.palette.error.light}, inset 0 2px 2px ${Ue(
      t.palette.error.light,
      0.07
    )}`,
    "&:hover": {
      borderColor: t.palette.error.main
    }
  },
  readOnlyDefault: {
    boxShadow: `0 0 0 1px ${Ue(
      t.palette.common.black,
      0.05
    )}, inset 0 2px 2px ${Ue(t.palette.common.black, 0.05)}`,
    border: "none",
    backgroundColor: "#E5E4E2"
  },
  readOnlyPlain: {
    boxShadow: "none",
    border: "none",
    backgroundColor: t.palette.common.white,
    paddingLeft: 0,
    paddingRight: 0
  },
  formLabel: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginBottom: t.spacing(0.5)
  },
  formLabelAction: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center"
  },
  formLabelInfo: {
    marginLeft: t.spacing(1),
    display: "flex",
    alignItems: "center"
  },
  formOptional: {
    color: t.palette.grey[200],
    fontSize: t.spacing(1.4),
    marginLeft: t.spacing(1)
  },
  formLabelTooltip: {
    marginLeft: t.spacing(1),
    display: "flex",
    alignItems: "center"
  },
  inputGroup: {
    position: "relative"
  },
  tooltipIcon: {
    display: "flex",
    alignItems: "center",
    color: t.palette.secondary.main,
    cursor: "help",
    fontSize: t.spacing(1.75)
  },
  textarea: {
    resize: "both"
  },
  copyToClipboardInput: {
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    paddingRight: t.spacing(5),
    minHeight: t.spacing(4.5),
    fontSize: t.typography.body2.fontSize,
    fontFamily: '"Roboto Mono", "Monaco", "Consolas", monospace',
    "&:hover": {
      borderColor: "transparent"
    }
  },
  textInputInfoIcon: {
    display: "flex",
    alignItems: "center",
    fontSize: t.spacing(1.75)
  }
})), g2 = (t, e) => {
  const a = cd(t), {
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
    info: y,
    actions: w,
    testId: k,
    variant: I = "default",
    rounded: f = !1,
    resizeIndicator: x = !0,
    ...E
  } = t, N = p && /* @__PURE__ */ U.jsx(
    mc,
    {
      darken: !0,
      title: p,
      disabled: !p,
      placement: h,
      children: /* @__PURE__ */ U.jsx(_e, { className: a.tooltipIcon, children: /* @__PURE__ */ U.jsx(_e, { className: a.textInputInfoIcon, children: /* @__PURE__ */ U.jsx(Ib, { fontSize: "inherit" }) }) })
    }
  );
  return /* @__PURE__ */ U.jsxs(_e, { width: n, children: [
    (r || N || y || c || w) && /* @__PURE__ */ U.jsxs(_e, { className: a.formLabel, children: [
      r && /* @__PURE__ */ U.jsx(Kt, { component: "h6", variant: "body1", children: r }),
      y && /* @__PURE__ */ U.jsx(_e, { className: a.formLabelInfo, children: y }),
      N && /* @__PURE__ */ U.jsx(_e, { className: a.formLabelTooltip, children: N }),
      c && /* @__PURE__ */ U.jsx(Kt, { variant: "body2", className: a.formOptional, children: "(Optional)" }),
      w && /* @__PURE__ */ U.jsx(_e, { className: a.formLabelAction, children: w })
    ] }),
    /* @__PURE__ */ U.jsx(
      mc,
      {
        darken: !0,
        heading: g,
        disabled: !g,
        placement: h,
        children: /* @__PURE__ */ U.jsx(_e, { className: a.inputGroup, children: /* @__PURE__ */ U.jsx(
          Za,
          {
            ref: e,
            classes: {
              root: he({
                [a.root]: !0,
                [a.rootSmall]: m === "small",
                [a.rootLarge]: m === "large",
                [a.readOnlyDefault]: o && I === "default",
                [a.readOnlyPlain]: o && I === "plain",
                [a.multiline]: u,
                [a.multilineReadonly]: u && o,
                [a.multilineResizeIndicator]: u && !x,
                [a.rounded]: f
              }),
              focused: a.focused,
              error: a.error,
              inputMultiline: a.textarea,
              input: he({
                [a.textInput]: !0,
                [a.textInputLarge]: m === "large"
              }),
              disabled: a.textInputDisabled,
              adornedEnd: he({
                [a.inputAdornedEnd]: !0,
                [a.inputAdornedEndAlignTop]: u
              })
            },
            readOnly: o,
            ...E,
            error: i,
            rows: l,
            multiline: u,
            "data-cyid": k
          }
        ) })
      }
    ),
    i && s && /* @__PURE__ */ U.jsx(bl, { error: i, children: /* @__PURE__ */ U.jsxs(_e, { display: "flex", alignItems: "center", children: [
      /* @__PURE__ */ U.jsx(_e, { className: a.textInputInfoIcon, children: /* @__PURE__ */ U.jsx(Pb, { fontSize: "inherit" }) }),
      /* @__PURE__ */ U.jsx(_e, { ml: 1, children: s })
    ] }) }),
    d && s && /* @__PURE__ */ U.jsx(bl, { children: /* @__PURE__ */ U.jsxs(_e, { display: "flex", alignItems: "center", children: [
      /* @__PURE__ */ U.jsx(Xa, { size: 12 }),
      /* @__PURE__ */ U.jsx(_e, { ml: 1, children: s })
    ] }) })
  ] });
}, Li = bc(g2), v2 = ar(
  (t) => fr({
    copyToClipboard: {
      display: "flex",
      width: "100%",
      position: "relative"
    },
    copyToClipboardInputWrap: {
      flexGrow: 1
    },
    copyToClipboardCard: {
      padding: t.spacing(2),
      borderRadius: t.spacing(1),
      flexGrow: 1
    },
    copyIconWrap: {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      bottom: t.spacing(0.625),
      right: t.spacing(0.5)
    },
    copyIconWrapCard: {
      top: t.spacing(1.25),
      right: t.spacing(1)
    }
  })
), b2 = (t) => {
  const e = v2(), a = cd(t), {
    size: r,
    value: n,
    component: o = "textInput",
    endAdornment: i,
    testId: s,
    ...l
  } = t, u = n;
  return /* @__PURE__ */ U.jsxs(
    _e,
    {
      className: e.copyToClipboard,
      "data-cyid": `${s}-copy-to-clipboard`,
      children: [
        o === "textInput" && /* @__PURE__ */ U.jsx(_e, { className: e.copyToClipboardInputWrap, children: /* @__PURE__ */ U.jsx(
          Li,
          {
            value: n,
            readOnly: !0,
            className: a.copyToClipboardInput,
            ...l,
            size: r,
            testId: s,
            endAdornment: /* @__PURE__ */ U.jsx(l0, { position: "end", children: i })
          }
        ) }),
        o === "card" && /* @__PURE__ */ U.jsx(_e, { className: e.copyToClipboardCard, children: n }),
        /* @__PURE__ */ U.jsx(
          _e,
          {
            className: he({
              [e.copyIconWrap]: !0,
              [e.copyIconWrapCard]: o === "card"
            }),
            children: /* @__PURE__ */ U.jsx(
              f2,
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
}, Ss = ar(
  (t) => fr({
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
      borderBottom: `1px solid ${t.palette.grey[100]}`,
      paddingLeft: t.spacing(2)
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
        gap: t.spacing(3)
      }
    },
    tab: {
      padding: 0,
      minWidth: "auto",
      textTransform: "initial",
      minHeight: "initial",
      paddingTop: t.spacing(1),
      paddingBottom: t.spacing(1),
      color: t.palette.secondary.dark,
      fontWeight: 400,
      "&.Mui-selected": {
        color: t.palette.primary.main,
        fontWeight: 600
      },
      "&.Mui-disabled": {
        color: t.palette.grey[200]
      }
    },
    tabSmall: {
      fontSize: t.spacing(1.5),
      paddingTop: t.spacing(0.5),
      paddingBottom: t.spacing(0.5)
    },
    tabMedium: {
      fontSize: t.spacing(1.75),
      paddingTop: t.spacing(1),
      paddingBottom: t.spacing(1)
    },
    tabLarge: {
      fontSize: t.spacing(2),
      paddingBottom: t.spacing(1.25)
    },
    iconLeft: {
      "& .MuiTab-wrapper": {
        flexDirection: "row",
        "& .MuiSvgIcon-root": {
          marginBottom: 0,
          marginRight: t.spacing(1)
        }
      }
    },
    iconRight: {
      "& .MuiTab-wrapper": {
        flexDirection: "row-reverse",
        "& .MuiSvgIcon-root": {
          marginBottom: 0,
          marginLeft: t.spacing(1)
        }
      }
    },
    iconBottom: {
      "& .MuiTab-wrapper": {
        flexDirection: "column-reverse",
        "& .MuiSvgIcon-root": {
          marginBottom: 0,
          marginTop: t.spacing(1)
        }
      }
    },
    iconTop: {},
    tabBox: {
      display: "flex",
      alignItems: "center"
    },
    tabAction: {
      marginLeft: t.spacing(1)
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
      marginLeft: t.spacing(2),
      paddingBottom: t.spacing(1)
    },
    tabPanel: {
      paddingTop: t.spacing(2),
      paddingLeft: t.spacing(2),
      paddingRight: t.spacing(2),
      overflow: "visible",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box"
    },
    tabPanelHide: {
      display: "none"
    },
    menuPaper: {
      border: `1px solid ${t.palette.grey[100]}`,
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
      gridGap: t.spacing(1)
    },
    menuItemIcon: {
      display: "flex",
      alignItems: "center"
    },
    menuItemText: {}
  })
), y2 = (t) => {
  const {
    children: e,
    testId: a,
    size: r = "medium",
    actions: n,
    iconPosition: o = "left",
    ...i
  } = t, s = Ss();
  return /* @__PURE__ */ U.jsxs(_e, { className: s.tabBox, children: [
    /* @__PURE__ */ U.jsx(
      Pv,
      {
        disableFocusRipple: !0,
        disableTouchRipple: !0,
        ...i,
        "data-cyid": a,
        className: he({
          [s.tab]: !0,
          [s.tabSmall]: r === "small",
          [s.tabMedium]: r === "medium",
          [s.tabLarge]: r === "large",
          [s.iconLeft]: o === "left",
          [s.iconRight]: o === "right",
          [s.iconBottom]: o === "bottom",
          [s.iconTop]: o === "top"
        }),
        children: e
      }
    ),
    n && /* @__PURE__ */ U.jsx(_e, { className: s.tabAction, children: n })
  ] });
};
function x2(t) {
  return {
    id: `simple-tab-${t}`,
    "aria-controls": `simple-tabpanel-${t}`
  };
}
const S2 = (t) => {
  const {
    tabItems: e,
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
  } = t, p = Ss();
  return /* @__PURE__ */ U.jsxs(
    _e,
    {
      className: he(p.tabCard, u, {
        [p.fullHeight]: c
      }),
      children: [
        /* @__PURE__ */ U.jsxs(_e, { className: p.tabHeading, children: [
          s && /* @__PURE__ */ U.jsx(_e, { textAlign: o && "center", mb: 3, children: /* @__PURE__ */ U.jsx(Kt, { variant: "h2", gutterBottom: !0, children: s }) }),
          /* @__PURE__ */ U.jsxs(
            _e,
            {
              className: he(p.tabActionsWrap, {
                [p.tabActionsWrapCenter]: o
              }),
              children: [
                /* @__PURE__ */ U.jsx(
                  Gv,
                  {
                    value: n,
                    onChange: r,
                    centered: o,
                    indicatorColor: "primary",
                    textColor: "primary",
                    className: p.tabs,
                    "data-cyid": l,
                    children: e.map((h, g) => {
                      const m = h.name.toLowerCase().replace(/\s+/g, "-");
                      return h.hidden ? null : h.buttonProps ? /* @__PURE__ */ U.jsx(
                        fn,
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
                      ) : /* @__PURE__ */ Rd(
                        y2,
                        {
                          label: h.name,
                          ...x2(g),
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
                i && /* @__PURE__ */ U.jsx(_e, { className: p.tabActions, children: i })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ U.jsxs(_e, { className: p.tabBody, children: [
          " ",
          a
        ] })
      ]
    }
  );
};
function ii(t) {
  const { children: e, value: a, index: r, ...n } = t, o = Ss();
  return /* @__PURE__ */ U.jsx(
    _e,
    {
      role: "tabpanel",
      hidden: a !== r,
      id: `simple-tabpanel-${r}`,
      "aria-labelledby": `simple-tab-${r}`,
      ...n,
      className: he(o.tabPanel, {
        [o.tabPanelHide]: a !== r
      }),
      children: a === r && e
    }
  );
}
const C2 = "choreo-test-key", w2 = "choreo-oauth2-token", E2 = (t) => {
  const { token: e, apiEndpoint: a, sandboxEndpoint: r, topic: n, publish: o, subscribe: i, parameters: s, payload: l, isDevportal: u, asyncType: c } = t, d = ds(), [p, h] = Wt(null), [g, m] = Wt([]), [y, w] = Wt(l || ""), [k, I] = Wt(a), [f, x] = Wt("production"), [E, N] = Wt({}), [z, O] = Wt(!1), [P, M] = Wt("Connect"), [v, C] = Wt(0), [D, L] = Wt(e), R = (ie, pe) => {
    C(pe);
  };
  si(() => {
    const ie = f === "production" ? a : r;
    if (n !== "/*") {
      const pe = n.startsWith("/") || ie.endsWith("/") ? n === "/" ? "" : n : `/${n}`;
      I(`${ie}${pe}`);
    } else
      I(ie + "/");
    s != null && N(
      Object.keys(s).reduce((pe, we) => (pe[we] = "", pe), {})
    );
  }, [a, r, f, n]);
  const W = (ie) => {
    x(ie.target.value);
  }, F = () => {
    c !== Ia.WEBSUB && p && y && p.readyState === p.OPEN && (p.send(y), m((ie) => [
      ...ie,
      {
        message: `Sent: ${y}`,
        timestamp: (/* @__PURE__ */ new Date()).toString(),
        randomKey: g.length
      }
    ]), w(""), p.onmessage = (ie) => m((pe) => [
      ...pe,
      {
        message: `Received: ${ie.data}`,
        timestamp: (/* @__PURE__ */ new Date()).toString(),
        randomKey: g.length
      }
    ]));
  }, G = () => {
    M("Connecting...");
    let ie = k;
    for (const Ce in E)
      ie = ie.replace(`{${Ce}}`, E[Ce]);
    const pe = [];
    u ? pe.push(w2) : pe.push(C2), D && D.trim() && pe.push(D);
    const we = new WebSocket(ie, pe);
    h(we), we.onopen = () => {
      O(!0), m((Ce) => [
        ...Ce,
        {
          message: `Connected to ${ie}`,
          timestamp: (/* @__PURE__ */ new Date()).toString(),
          randomKey: g.length
        }
      ]), M("Disconnect");
    }, we.onerror = () => {
      O(!1), m((Ce) => [
        ...Ce,
        {
          message: "Error while connecting to the server. Please check the endpoint and try again.",
          timestamp: (/* @__PURE__ */ new Date()).toString(),
          randomKey: g.length
        }
      ]), M("Connect");
    };
  }, B = () => {
    M("Disconnecting..."), setTimeout(() => {
      M("Connect"), O(!1), p == null || p.close(), p != null && p.CLOSED && (m((ie) => [
        ...ie,
        { message: "Disconnected", timestamp: (/* @__PURE__ */ new Date()).toString() }
      ]), M("Connect"));
    }, 1e3);
  }, Z = () => {
    m([]);
  };
  function Q(ie) {
    return ie.split("").reduce((pe, we, Ce) => pe + we.charCodeAt(0) * Ce, 1);
  }
  const de = [
    d.logColor1,
    d.logColor2,
    d.logColor3,
    d.logColor4
  ], { current: ue } = Td(/* @__PURE__ */ new Map()), xe = (ie) => {
    if (ue.has(ie))
      return ue.get(ie) || "";
    const pe = de[Q(ie) % de.length];
    return ue.set(ie, pe), pe;
  }, fe = (ie) => /* @__PURE__ */ U.jsx(
    Nb,
    {
      getColor: xe,
      logEntry: ie,
      timeZone: "UTC",
      onCopy: () => {
      },
      isExpanded: !1,
      isHeiglighted: !1,
      isExpandable: !1
    }
  );
  function ve(ie) {
    switch (ie) {
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
  const ge = yc(
    () => P === "Connect" ? "Connect to the server to start sending messages." : "Enter your message to send.",
    [P]
  ), Se = [{ name: "Parameters" }, { name: "Payload" }, { name: "Headers" }], Ee = [{ name: "Payload" }, { name: "Headers" }];
  return /* @__PURE__ */ U.jsx(_e, { className: d.topicContainer, children: /* @__PURE__ */ U.jsxs(Ub, { square: !0, testId: "topic-accordion", bordered: !0, children: [
    /* @__PURE__ */ U.jsx(
      Yb,
      {
        "aria-controls": "panel1a-content",
        testId: "topic-accordion-summary",
        children: /* @__PURE__ */ U.jsxs(_e, { className: d.topicTypeContainer, children: [
          c === Ia.WS && /* @__PURE__ */ U.jsx(_e, { className: d.typeChipContainer, children: /* @__PURE__ */ U.jsx(
            Vl,
            {
              label: "PUB",
              testId: "default",
              variant: "contained",
              color: "info",
              size: "medium",
              disabled: !o
            }
          ) }),
          /* @__PURE__ */ U.jsx(_e, { className: d.typeChipContainer, children: /* @__PURE__ */ U.jsx(
            Vl,
            {
              label: "SUB",
              testId: "default",
              variant: "contained",
              color: "success",
              size: "medium",
              disabled: !i
            }
          ) }),
          /* @__PURE__ */ U.jsx(_e, { className: d.typeChipContainer, children: /* @__PURE__ */ U.jsx(Kt, { variant: "body2", children: n }) })
        ] })
      }
    ),
    /* @__PURE__ */ U.jsx(Gb, { testId: "topic-accordion-details", children: /* @__PURE__ */ U.jsx(_e, { width: "100%", style: { maxWidth: "100%", boxSizing: "border-box", overflow: "hidden" }, children: n && /* @__PURE__ */ U.jsxs(
      vc,
      {
        fallback: /* @__PURE__ */ U.jsx(
          _e,
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            children: /* @__PURE__ */ U.jsx(Xa, { size: 25 })
          }
        ),
        children: [
          c === Ia.WS && /* @__PURE__ */ U.jsxs(_e, { className: d.endpointContainer, children: [
            /* @__PURE__ */ U.jsx(
              t0,
              {
                size: "small",
                variant: "outlined",
                style: {
                  width: 150,
                  flexShrink: 0,
                  height: 40
                },
                children: /* @__PURE__ */ U.jsxs(
                  Tv,
                  {
                    value: f,
                    onChange: W,
                    disabled: z,
                    "data-testid": "endpoint-type-select",
                    inputProps: { "aria-label": "Endpoint type" },
                    style: {
                      height: 40,
                      borderRadius: 4,
                      backgroundColor: "#ffffff",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)"
                    },
                    children: [
                      /* @__PURE__ */ U.jsx(kl, { value: "production", children: "Production" }),
                      /* @__PURE__ */ U.jsx(kl, { value: "sandbox", children: "Sandbox" })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ U.jsx(_e, { className: d.textInput, children: /* @__PURE__ */ U.jsx(
              b2,
              {
                value: k,
                size: "small",
                testId: "endpoint-url"
              }
            ) }),
            /* @__PURE__ */ U.jsx(
              fn,
              {
                color: z ? "secondary" : "primary",
                variant: "contained",
                pill: !1,
                size: "small",
                testId: "disconnect",
                style: {
                  flexShrink: 0,
                  height: 40,
                  minWidth: 120,
                  fontWeight: 500,
                  fontSize: 14,
                  textTransform: "none",
                  borderRadius: 4
                },
                onClick: () => z ? B() : G(),
                children: ve(P)
              }
            )
          ] }),
          /* @__PURE__ */ U.jsxs(_e, { style: { width: "100%", maxWidth: "100%", boxSizing: "border-box" }, children: [
            /* @__PURE__ */ U.jsxs(
              S2,
              {
                className: d.tabs,
                tabItems: Object.keys(E).length === 0 ? Ee : Se,
                handleChange: R,
                value: v,
                testId: "env-tab-card",
                fullHeight: !0,
                children: [
                  Object.keys(E).length !== 0 && /* @__PURE__ */ U.jsx(ii, { value: v, index: 0, children: /* @__PURE__ */ U.jsx(_e, { className: d.tabPanelContent, children: /* @__PURE__ */ U.jsxs(_e, { className: d.parameterContainerWrapper, children: [
                    /* @__PURE__ */ U.jsx(_e, { className: d.parameterContainer, children: Object.keys(E).map((ie) => /* @__PURE__ */ U.jsx(_e, { children: /* @__PURE__ */ U.jsx(
                      Li,
                      {
                        testId: `input-${ie}`,
                        className: d.paramTextInput,
                        type: "text",
                        placeholder: ie,
                        label: ie,
                        value: E[ie],
                        onChange: (pe) => {
                          const we = {
                            ...E,
                            [ie]: pe.target.value
                          };
                          N(we);
                        },
                        error: E[ie] === "",
                        helperText: "Enter parameter value"
                      }
                    ) }, ie)) }),
                    /* @__PURE__ */ U.jsx(_e, { className: d.executeButton, children: /* @__PURE__ */ U.jsx(
                      fn,
                      {
                        testId: "execute",
                        disabled: z,
                        variant: "outlined",
                        onClick: G,
                        startIcon: /* @__PURE__ */ U.jsx(Ab, {}),
                        size: "small",
                        children: /* @__PURE__ */ U.jsx(Kt, { variant: "body1", align: "center", children: "Execute" })
                      }
                    ) })
                  ] }) }) }),
                  /* @__PURE__ */ U.jsx(
                    ii,
                    {
                      value: v,
                      index: Object.keys(E).length === 0 ? 0 : 1,
                      children: /* @__PURE__ */ U.jsxs(_e, { className: d.tabPanelContent, children: [
                        /* @__PURE__ */ U.jsx(_e, { className: d.payloadContainer, children: /* @__PURE__ */ U.jsx(
                          Hb,
                          {
                            fileContent: y,
                            language: "json",
                            height: "170px",
                            width: "100%",
                            setFileContent: w
                          }
                        ) }),
                        /* @__PURE__ */ U.jsx(_e, { mt: 5, children: /* @__PURE__ */ U.jsx(us, { title: ge, placement: "top-start", children: /* @__PURE__ */ U.jsx(_e, { className: d.sendIcon, children: /* @__PURE__ */ U.jsx(
                          fn,
                          {
                            testId: "payload-send",
                            disabled: y.length === 0 || !z,
                            variant: "outlined",
                            startIcon: /* @__PURE__ */ U.jsx(Mb, {}),
                            onClick: F,
                            size: "small",
                            children: /* @__PURE__ */ U.jsx(Kt, { variant: "body1", align: "center", children: "Send" })
                          }
                        ) }) }) })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ U.jsx(
                    ii,
                    {
                      value: v,
                      index: Object.keys(E).length === 0 ? 1 : 2,
                      children: /* @__PURE__ */ U.jsx(_e, { className: d.tabPanelContent, children: /* @__PURE__ */ U.jsx(_e, { className: d.parameterContainerWrapper, children: /* @__PURE__ */ U.jsx(
                        _e,
                        {
                          className: d.parameterContainer,
                          children: /* @__PURE__ */ U.jsx(
                            Li,
                            {
                              testId: "input-headers",
                              className: d.apiTokenTextInput,
                              type: "text",
                              placeholder: "API Token",
                              label: "API Token",
                              value: D,
                              onChange: (ie) => {
                                const pe = ie.target.value;
                                L(pe);
                              },
                              error: D === "",
                              helperText: "Enter API Token"
                            }
                          )
                        },
                        "api-token"
                      ) }) })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ U.jsx(
              zb,
              {
                messages: g,
                clearLogs: Z,
                isDisabled: g.length < 1
              }
            ),
            /* @__PURE__ */ U.jsx(_e, { children: /* @__PURE__ */ U.jsx(_e, { className: d.outputContainer, children: g.map(
              (ie, pe) => fe({
                timestamp: g[pe].timestamp,
                message: g[pe].message,
                randomKey: pe,
                isNewLog: !1
              })
            ) }) })
          ] })
        ]
      }
    ) }) })
  ] }) });
};
var Ia = /* @__PURE__ */ ((t) => (t.WS = "WS", t.WEBSUB = "WEBSUB", t))(Ia || {});
function ya(t) {
  const { channels: e } = t;
  return Object.entries(e).map(
    ([r, n]) => ({
      name: r,
      subscribe: !!(n != null && n.subscribe),
      publish: !!(n != null && n.publish),
      parameters: n.parameters
    })
  );
}
function R2(t) {
  const {
    token: e = "",
    apiEndpoint: a = "",
    sandboxEndpoint: r = "",
    asyncapi: n = {
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
    isDevportal: o = !1,
    asyncApiType: i = "WS"
    /* WS */
  } = t, [s, l] = Wt([
    { name: "/*", subscribe: !0, publish: !0, parameters: {} }
  ]);
  si(() => {
    n != null && n.channels && l(ya(n));
  }, [n]);
  const u = yc(() => {
    var d, p;
    if (n && Object.keys(n).length > 0 && a) {
      let h = Dl(n);
      return (d = h.asyncapi) != null && d.startsWith("2") ? h = {
        ...h,
        servers: {
          default: { url: a, protocol: "ws" },
          sandbox: { url: r, protocol: "ws" }
        }
      } : (p = h.asyncapi) != null && p.startsWith("3") && (h = {
        ...h,
        servers: {
          default: { url: a, protocol: "ws" },
          sandbox: { url: r, protocol: "ws" }
        }
      }), h != null && h.channels && l(ya(h)), h;
    } else {
      let h = Dl(n);
      l(ya(h));
    }
    return null;
  }, [n, a, r]);
  si(() => {
    u != null && u.channels && l(ya(u));
  }, [u]);
  function c(d) {
    return i === "WEBSUB" ? JSON.stringify({
      "hub.mode": "subscribe",
      "hub.topic": d || "sample-topic",
      "hub.callback": "http://example.com/callback"
    }) : '{ "message": "Hello Server" }';
  }
  return !s || !(n != null && n.channels) ? /* @__PURE__ */ U.jsx(
    _e,
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      children: /* @__PURE__ */ U.jsx(Xa, { size: 25 })
    }
  ) : a ? /* @__PURE__ */ U.jsx(_e, { children: s.map(({ name: d, publish: p, subscribe: h, parameters: g }) => /* @__PURE__ */ U.jsx(
    E2,
    {
      token: e,
      apiEndpoint: a,
      sandboxEndpoint: r || "",
      topic: d,
      publish: p,
      subscribe: h,
      parameters: g,
      payload: c(d),
      isDevportal: o,
      asyncType: i || "WS"
      /* WS */
    },
    d
  )) }) : /* @__PURE__ */ U.jsx(U.Fragment, {});
}
export {
  R2 as WebSocketViewer,
  R2 as default
};
