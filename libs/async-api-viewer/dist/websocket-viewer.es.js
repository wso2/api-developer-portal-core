import * as b from "react";
import ht, { isValidElement as ka, cloneElement as $a, Children as Ad, lazy as Md, Suspense as hi, forwardRef as Tc, useContext as Nd, useState as At, createElement as Ld, useEffect as Da, useRef as Dd, useMemo as Oc } from "react";
import * as Xt from "react-dom";
import ga from "react-dom";
var va = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Or(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var To = { exports: {} }, tn = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Oo, Ns;
function Bd() {
  if (Ns) return Oo;
  Ns = 1;
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
  return Oo = n() ? Object.assign : function(o, i) {
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
  }, Oo;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ls;
function Fd() {
  if (Ls) return tn;
  Ls = 1, Bd();
  var t = ht, e = 60103;
  if (tn.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var a = Symbol.for;
    e = a("react.element"), tn.Fragment = a("react.fragment");
  }
  var r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(s, l, u) {
    var c, d = {}, p = null, h = null;
    u !== void 0 && (p = "" + u), l.key !== void 0 && (p = "" + l.key), l.ref !== void 0 && (h = l.ref);
    for (c in l) n.call(l, c) && !o.hasOwnProperty(c) && (d[c] = l[c]);
    if (s && s.defaultProps) for (c in l = s.defaultProps, l) d[c] === void 0 && (d[c] = l[c]);
    return { $$typeof: e, type: s, key: p, ref: h, props: d, _owner: r.current };
  }
  return tn.jsx = i, tn.jsxs = i, tn;
}
var Ds;
function zd() {
  return Ds || (Ds = 1, To.exports = Fd()), To.exports;
}
var B = zd(), Ba = {
  black: "#000",
  white: "#fff"
}, _o = {
  300: "#e57373",
  500: "#f44336",
  700: "#d32f2f"
}, Po = {
  A200: "#ff4081",
  A400: "#f50057",
  A700: "#c51162"
}, jo = {
  300: "#7986cb",
  500: "#3f51b5",
  700: "#303f9f"
}, Io = {
  300: "#64b5f6",
  500: "#2196f3",
  700: "#1976d2"
}, Ao = {
  300: "#81c784",
  500: "#4caf50",
  700: "#388e3c"
}, Mo = {
  300: "#ffb74d",
  500: "#ff9800",
  700: "#f57c00"
}, Ki = {
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
function wr(t) {
  "@babel/helpers - typeof";
  return wr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, wr(t);
}
function No(t) {
  return t && wr(t) === "object" && t.constructor === Object;
}
function Er(t, e) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    clone: !0
  }, r = a.clone ? Y({}, t) : t;
  return No(t) && No(e) && Object.keys(e).forEach(function(n) {
    n !== "__proto__" && (No(e[n]) && n in t ? r[n] = Er(t[n], e[n], a) : r[n] = e[n]);
  }), r;
}
function Wd(t, e) {
  if (wr(t) != "object" || !t) return t;
  var a = t[Symbol.toPrimitive];
  if (a !== void 0) {
    var r = a.call(t, e);
    if (wr(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function _c(t) {
  var e = Wd(t, "string");
  return wr(e) == "symbol" ? e : e + "";
}
function Ot(t, e, a) {
  return (e = _c(e)) in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}
function bn(t) {
  for (var e = "https://mui.com/production-error/?code=" + t, a = 1; a < arguments.length; a += 1)
    e += "&args[]=" + encodeURIComponent(arguments[a]);
  return "Minified Material-UI error #" + t + "; visit " + e + " for the full message.";
}
var Lo = { exports: {} }, gt = {};
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bs;
function Vd() {
  if (Bs) return gt;
  Bs = 1;
  var t = 60103, e = 60106, a = 60107, r = 60108, n = 60114, o = 60109, i = 60110, s = 60112, l = 60113, u = 60120, c = 60115, d = 60116, p = 60121, h = 60122, g = 60117, m = 60129, y = 60131;
  if (typeof Symbol == "function" && Symbol.for) {
    var w = Symbol.for;
    t = w("react.element"), e = w("react.portal"), a = w("react.fragment"), r = w("react.strict_mode"), n = w("react.profiler"), o = w("react.provider"), i = w("react.context"), s = w("react.forward_ref"), l = w("react.suspense"), u = w("react.suspense_list"), c = w("react.memo"), d = w("react.lazy"), p = w("react.block"), h = w("react.server.block"), g = w("react.fundamental"), m = w("react.debug_trace_mode"), y = w("react.legacy_hidden");
  }
  function k(C) {
    if (typeof C == "object" && C !== null) {
      var M = C.$$typeof;
      switch (M) {
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
                  return M;
              }
          }
        case e:
          return M;
      }
    }
  }
  var I = o, f = t, x = s, E = a, L = d, W = c, O = e, P = n, A = r, v = l;
  return gt.ContextConsumer = i, gt.ContextProvider = I, gt.Element = f, gt.ForwardRef = x, gt.Fragment = E, gt.Lazy = L, gt.Memo = W, gt.Portal = O, gt.Profiler = P, gt.StrictMode = A, gt.Suspense = v, gt.isAsyncMode = function() {
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
var Fs;
function Hd() {
  return Fs || (Fs = 1, Lo.exports = Vd()), Lo.exports;
}
Hd();
function Ui(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.min(Math.max(e, t), a);
}
function Kd(t) {
  t = t.substr(1);
  var e = new RegExp(".{1,".concat(t.length >= 6 ? 2 : 1, "}"), "g"), a = t.match(e);
  return a && a[0].length === 1 && (a = a.map(function(r) {
    return r + r;
  })), a ? "rgb".concat(a.length === 4 ? "a" : "", "(").concat(a.map(function(r, n) {
    return n < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3;
  }).join(", "), ")") : "";
}
function Ud(t) {
  t = Vr(t);
  var e = t, a = e.values, r = a[0], n = a[1] / 100, o = a[2] / 100, i = n * Math.min(o, 1 - o), s = function(d) {
    var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (d + r / 30) % 12;
    return o - i * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  }, l = "rgb", u = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return t.type === "hsla" && (l += "a", u.push(a[3])), Ya({
    type: l,
    values: u
  });
}
function Vr(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
    return Vr(Kd(t));
  var e = t.indexOf("("), a = t.substring(0, e);
  if (["rgb", "rgba", "hsl", "hsla"].indexOf(a) === -1)
    throw new Error(bn(3, t));
  var r = t.substring(e + 1, t.length - 1).split(",");
  return r = r.map(function(n) {
    return parseFloat(n);
  }), {
    type: a,
    values: r
  };
}
function Ya(t) {
  var e = t.type, a = t.values;
  return e.indexOf("rgb") !== -1 ? a = a.map(function(r, n) {
    return n < 3 ? parseInt(r, 10) : r;
  }) : e.indexOf("hsl") !== -1 && (a[1] = "".concat(a[1], "%"), a[2] = "".concat(a[2], "%")), "".concat(e, "(").concat(a.join(", "), ")");
}
function qd(t, e) {
  var a = mi(t), r = mi(e);
  return (Math.max(a, r) + 0.05) / (Math.min(a, r) + 0.05);
}
function mi(t) {
  t = Vr(t);
  var e = t.type === "hsl" ? Vr(Ud(t)).values : t.values;
  return e = e.map(function(a) {
    return a /= 255, a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  }), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function rn(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.15;
  return mi(t) > 0.5 ? Pc(t, e) : jc(t, e);
}
function Je(t, e) {
  return t = Vr(t), e = Ui(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.values[3] = e, Ya(t);
}
function Pc(t, e) {
  if (t = Vr(t), e = Ui(e), t.type.indexOf("hsl") !== -1)
    t.values[2] *= 1 - e;
  else if (t.type.indexOf("rgb") !== -1)
    for (var a = 0; a < 3; a += 1)
      t.values[a] *= 1 - e;
  return Ya(t);
}
function jc(t, e) {
  if (t = Vr(t), e = Ui(e), t.type.indexOf("hsl") !== -1)
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.indexOf("rgb") !== -1)
    for (var a = 0; a < 3; a += 1)
      t.values[a] += (255 - t.values[a]) * e;
  return Ya(t);
}
function Xa(t, e) {
  if (t == null) return {};
  var a = {};
  for (var r in t) if ({}.hasOwnProperty.call(t, r)) {
    if (e.indexOf(r) !== -1) continue;
    a[r] = t[r];
  }
  return a;
}
function Ne(t, e) {
  if (t == null) return {};
  var a, r, n = Xa(t, e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (r = 0; r < o.length; r++) a = o[r], e.indexOf(a) === -1 && {}.propertyIsEnumerable.call(t, a) && (n[a] = t[a]);
  }
  return n;
}
var gr = ["xs", "sm", "md", "lg", "xl"];
function Gd(t) {
  var e = t.values, a = e === void 0 ? {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  } : e, r = t.unit, n = r === void 0 ? "px" : r, o = t.step, i = o === void 0 ? 5 : o, s = Ne(t, ["values", "unit", "step"]);
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
function Yd(t, e, a) {
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
var zs = {
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
    paper: Ba.white,
    default: Ki[50]
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
}, Do = {
  text: {
    primary: Ba.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    hint: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: Ki[800],
    default: "#303030"
  },
  action: {
    active: Ba.white,
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
function Ws(t, e, a, r) {
  var n = r.light || r, o = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(a) ? t[e] = t[a] : e === "light" ? t.light = jc(t.main, n) : e === "dark" && (t.dark = Pc(t.main, o)));
}
function Xd(t) {
  var e = t.primary, a = e === void 0 ? {
    light: jo[300],
    main: jo[500],
    dark: jo[700]
  } : e, r = t.secondary, n = r === void 0 ? {
    light: Po.A200,
    main: Po.A400,
    dark: Po.A700
  } : r, o = t.error, i = o === void 0 ? {
    light: _o[300],
    main: _o[500],
    dark: _o[700]
  } : o, s = t.warning, l = s === void 0 ? {
    light: Mo[300],
    main: Mo[500],
    dark: Mo[700]
  } : s, u = t.info, c = u === void 0 ? {
    light: Io[300],
    main: Io[500],
    dark: Io[700]
  } : u, d = t.success, p = d === void 0 ? {
    light: Ao[300],
    main: Ao[500],
    dark: Ao[700]
  } : d, h = t.type, g = h === void 0 ? "light" : h, m = t.contrastThreshold, y = m === void 0 ? 3 : m, w = t.tonalOffset, k = w === void 0 ? 0.2 : w, I = Ne(t, ["primary", "secondary", "error", "warning", "info", "success", "type", "contrastThreshold", "tonalOffset"]);
  function f(W) {
    var O = qd(W, Do.text.primary) >= y ? Do.text.primary : zs.text.primary;
    return O;
  }
  var x = function(O) {
    var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 500, A = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 300, v = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 700;
    if (O = Y({}, O), !O.main && O[P] && (O.main = O[P]), !O.main)
      throw new Error(bn(4, P));
    if (typeof O.main != "string")
      throw new Error(bn(5, JSON.stringify(O.main)));
    return Ws(O, "light", A, k), Ws(O, "dark", v, k), O.contrastText || (O.contrastText = f(O.main)), O;
  }, E = {
    dark: Do,
    light: zs
  }, L = Er(Y({
    // A collection of common colors.
    common: Ba,
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
    grey: Ki,
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
  return L;
}
function Ic(t) {
  return Math.round(t * 1e5) / 1e5;
}
function Jd(t) {
  return Ic(t);
}
var Vs = {
  textTransform: "uppercase"
}, Hs = '"Roboto", "Helvetica", "Arial", sans-serif';
function Zd(t, e) {
  var a = typeof e == "function" ? e(t) : e, r = a.fontFamily, n = r === void 0 ? Hs : r, o = a.fontSize, i = o === void 0 ? 14 : o, s = a.fontWeightLight, l = s === void 0 ? 300 : s, u = a.fontWeightRegular, c = u === void 0 ? 400 : u, d = a.fontWeightMedium, p = d === void 0 ? 500 : d, h = a.fontWeightBold, g = h === void 0 ? 700 : h, m = a.htmlFontSize, y = m === void 0 ? 16 : m, w = a.allVariants, k = a.pxToRem, I = Ne(a, ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"]), f = i / 14, x = k || function(W) {
    return "".concat(W / y * f, "rem");
  }, E = function(O, P, A, v, C) {
    return Y({
      fontFamily: n,
      fontWeight: O,
      fontSize: x(P),
      // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
      lineHeight: A
    }, n === Hs ? {
      letterSpacing: "".concat(Ic(v / P), "em")
    } : {}, C, w);
  }, L = {
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
    button: E(p, 14, 1.75, 0.4, Vs),
    caption: E(c, 12, 1.66, 0.4),
    overline: E(c, 12, 2.66, 1, Vs)
  };
  return Er(Y({
    htmlFontSize: y,
    pxToRem: x,
    round: Jd,
    // TODO v5: remove
    fontFamily: n,
    fontSize: i,
    fontWeightLight: l,
    fontWeightRegular: c,
    fontWeightMedium: p,
    fontWeightBold: g
  }, L), I, {
    clone: !1
    // No need to clone deep
  });
}
var Qd = 0.2, ef = 0.14, tf = 0.12;
function xt() {
  return ["".concat(arguments.length <= 0 ? void 0 : arguments[0], "px ").concat(arguments.length <= 1 ? void 0 : arguments[1], "px ").concat(arguments.length <= 2 ? void 0 : arguments[2], "px ").concat(arguments.length <= 3 ? void 0 : arguments[3], "px rgba(0,0,0,").concat(Qd, ")"), "".concat(arguments.length <= 4 ? void 0 : arguments[4], "px ").concat(arguments.length <= 5 ? void 0 : arguments[5], "px ").concat(arguments.length <= 6 ? void 0 : arguments[6], "px ").concat(arguments.length <= 7 ? void 0 : arguments[7], "px rgba(0,0,0,").concat(ef, ")"), "".concat(arguments.length <= 8 ? void 0 : arguments[8], "px ").concat(arguments.length <= 9 ? void 0 : arguments[9], "px ").concat(arguments.length <= 10 ? void 0 : arguments[10], "px ").concat(arguments.length <= 11 ? void 0 : arguments[11], "px rgba(0,0,0,").concat(tf, ")")].join(",");
}
var rf = ["none", xt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), xt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), xt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), xt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), xt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), xt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), xt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), xt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), xt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), xt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), xt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), xt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), xt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), xt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), xt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), xt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), xt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), xt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), xt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), xt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), xt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), xt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), xt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), xt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], nf = {
  borderRadius: 4
};
function gi(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var a = 0, r = Array(e); a < e; a++) r[a] = t[a];
  return r;
}
function af(t) {
  if (Array.isArray(t)) return gi(t);
}
function Ac(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function qi(t, e) {
  if (t) {
    if (typeof t == "string") return gi(t, e);
    var a = {}.toString.call(t).slice(8, -1);
    return a === "Object" && t.constructor && (a = t.constructor.name), a === "Map" || a === "Set" ? Array.from(t) : a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? gi(t, e) : void 0;
  }
}
function of() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ja(t) {
  return af(t) || Ac(t) || qi(t) || of();
}
function Fa(t, e) {
  return e ? Er(t, e, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : t;
}
var sf = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
}, Ks = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: function(e) {
    return "@media (min-width:".concat(sf[e], "px)");
  }
};
function Mc(t, e, a) {
  if (Array.isArray(e)) {
    var r = t.theme.breakpoints || Ks;
    return e.reduce(function(i, s, l) {
      return i[r.up(r.keys[l])] = a(e[l]), i;
    }, {});
  }
  if (wr(e) === "object") {
    var n = t.theme.breakpoints || Ks;
    return Object.keys(e).reduce(function(i, s) {
      return i[n.up(s)] = a(e[s]), i;
    }, {});
  }
  var o = a(e);
  return o;
}
function Us(t, e) {
  return !e || typeof e != "string" ? null : e.split(".").reduce(function(a, r) {
    return a && a[r] ? a[r] : null;
  }, t);
}
function Re(t) {
  var e = t.prop, a = t.cssProperty, r = a === void 0 ? t.prop : a, n = t.themeKey, o = t.transform, i = function(l) {
    if (l[e] == null)
      return null;
    var u = l[e], c = l.theme, d = Us(c, n) || {}, p = function(g) {
      var m;
      return typeof d == "function" ? m = d(g) : Array.isArray(d) ? m = d[g] || g : (m = Us(d, g) || g, o && (m = o(m))), r === !1 ? m : Ot({}, r, m);
    };
    return Mc(l, u, p);
  };
  return i.propTypes = {}, i.filterProps = [e], i;
}
function dr() {
  for (var t = arguments.length, e = new Array(t), a = 0; a < t; a++)
    e[a] = arguments[a];
  var r = function(o) {
    return e.reduce(function(i, s) {
      var l = s(o);
      return l ? Fa(i, l) : i;
    }, {});
  };
  return r.propTypes = {}, r.filterProps = e.reduce(function(n, o) {
    return n.concat(o.filterProps);
  }, []), r;
}
function ta(t) {
  return typeof t != "number" ? t : "".concat(t, "px solid");
}
var lf = Re({
  prop: "border",
  themeKey: "borders",
  transform: ta
}), cf = Re({
  prop: "borderTop",
  themeKey: "borders",
  transform: ta
}), uf = Re({
  prop: "borderRight",
  themeKey: "borders",
  transform: ta
}), df = Re({
  prop: "borderBottom",
  themeKey: "borders",
  transform: ta
}), ff = Re({
  prop: "borderLeft",
  themeKey: "borders",
  transform: ta
}), pf = Re({
  prop: "borderColor",
  themeKey: "palette"
}), hf = Re({
  prop: "borderRadius",
  themeKey: "shape"
}), mf = dr(lf, cf, uf, df, ff, pf, hf);
function qs(t, e) {
  var a = {};
  return Object.keys(t).forEach(function(r) {
    e.indexOf(r) === -1 && (a[r] = t[r]);
  }), a;
}
function gf(t) {
  var e = function(r) {
    var n = t(r);
    return r.css ? Y({}, Fa(n, t(Y({
      theme: r.theme
    }, r.css))), qs(r.css, [t.filterProps])) : r.sx ? Y({}, Fa(n, t(Y({
      theme: r.theme
    }, r.sx))), qs(r.sx, [t.filterProps])) : n;
  };
  return e.propTypes = {}, e.filterProps = ["css", "sx"].concat(Ja(t.filterProps)), e;
}
var vf = Re({
  prop: "displayPrint",
  cssProperty: !1,
  transform: function(e) {
    return {
      "@media print": {
        display: e
      }
    };
  }
}), bf = Re({
  prop: "display"
}), yf = Re({
  prop: "overflow"
}), xf = Re({
  prop: "textOverflow"
}), Cf = Re({
  prop: "visibility"
}), Sf = Re({
  prop: "whiteSpace"
});
const wf = dr(vf, bf, yf, xf, Cf, Sf);
var Ef = Re({
  prop: "flexBasis"
}), kf = Re({
  prop: "flexDirection"
}), $f = Re({
  prop: "flexWrap"
}), Rf = Re({
  prop: "justifyContent"
}), Tf = Re({
  prop: "alignItems"
}), Of = Re({
  prop: "alignContent"
}), _f = Re({
  prop: "order"
}), Pf = Re({
  prop: "flex"
}), jf = Re({
  prop: "flexGrow"
}), If = Re({
  prop: "flexShrink"
}), Af = Re({
  prop: "alignSelf"
}), Mf = Re({
  prop: "justifyItems"
}), Nf = Re({
  prop: "justifySelf"
}), Lf = dr(Ef, kf, $f, Rf, Tf, Of, _f, Pf, jf, If, Af, Mf, Nf), Df = Re({
  prop: "gridGap"
}), Bf = Re({
  prop: "gridColumnGap"
}), Ff = Re({
  prop: "gridRowGap"
}), zf = Re({
  prop: "gridColumn"
}), Wf = Re({
  prop: "gridRow"
}), Vf = Re({
  prop: "gridAutoFlow"
}), Hf = Re({
  prop: "gridAutoColumns"
}), Kf = Re({
  prop: "gridAutoRows"
}), Uf = Re({
  prop: "gridTemplateColumns"
}), qf = Re({
  prop: "gridTemplateRows"
}), Gf = Re({
  prop: "gridTemplateAreas"
}), Yf = Re({
  prop: "gridArea"
}), Xf = dr(Df, Bf, Ff, zf, Wf, Vf, Hf, Kf, Uf, qf, Gf, Yf), Jf = Re({
  prop: "color",
  themeKey: "palette"
}), Zf = Re({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette"
}), Qf = dr(Jf, Zf), ep = Re({
  prop: "position"
}), tp = Re({
  prop: "zIndex",
  themeKey: "zIndex"
}), rp = Re({
  prop: "top"
}), np = Re({
  prop: "right"
}), ap = Re({
  prop: "bottom"
}), op = Re({
  prop: "left"
});
const ip = dr(ep, tp, rp, np, ap, op);
var sp = Re({
  prop: "boxShadow",
  themeKey: "shadows"
});
function _r(t) {
  return t <= 1 ? "".concat(t * 100, "%") : t;
}
var lp = Re({
  prop: "width",
  transform: _r
}), cp = Re({
  prop: "maxWidth",
  transform: _r
}), up = Re({
  prop: "minWidth",
  transform: _r
}), dp = Re({
  prop: "height",
  transform: _r
}), fp = Re({
  prop: "maxHeight",
  transform: _r
}), pp = Re({
  prop: "minHeight",
  transform: _r
});
Re({
  prop: "size",
  cssProperty: "width",
  transform: _r
});
Re({
  prop: "size",
  cssProperty: "height",
  transform: _r
});
var hp = Re({
  prop: "boxSizing"
}), mp = dr(lp, cp, up, dp, fp, pp, hp);
function Nc(t) {
  if (Array.isArray(t)) return t;
}
function gp(t, e) {
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
function Lc() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kn(t, e) {
  return Nc(t) || gp(t, e) || qi(t, e) || Lc();
}
function vp(t) {
  var e = {};
  return function(a) {
    return e[a] === void 0 && (e[a] = t(a)), e[a];
  };
}
var bp = {
  m: "margin",
  p: "padding"
}, yp = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Gs = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, xp = vp(function(t) {
  if (t.length > 2)
    if (Gs[t])
      t = Gs[t];
    else
      return [t];
  var e = t.split(""), a = kn(e, 2), r = a[0], n = a[1], o = bp[r], i = yp[n] || "";
  return Array.isArray(i) ? i.map(function(s) {
    return o + s;
  }) : [o + i];
}), Dc = ["m", "mt", "mr", "mb", "ml", "mx", "my", "p", "pt", "pr", "pb", "pl", "px", "py", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY"];
function Bc(t) {
  var e = t.spacing || 8;
  return typeof e == "number" ? function(a) {
    return e * a;
  } : Array.isArray(e) ? function(a) {
    return e[a];
  } : typeof e == "function" ? e : function() {
  };
}
function Cp(t, e) {
  if (typeof e == "string" || e == null)
    return e;
  var a = Math.abs(e), r = t(a);
  return e >= 0 ? r : typeof r == "number" ? -r : "-".concat(r);
}
function Sp(t, e) {
  return function(a) {
    return t.reduce(function(r, n) {
      return r[n] = Cp(e, a), r;
    }, {});
  };
}
function Gi(t) {
  var e = t.theme, a = Bc(e);
  return Object.keys(t).map(function(r) {
    if (Dc.indexOf(r) === -1)
      return null;
    var n = xp(r), o = Sp(n, a), i = t[r];
    return Mc(t, i, o);
  }).reduce(Fa, {});
}
Gi.propTypes = {};
Gi.filterProps = Dc;
var wp = Re({
  prop: "fontFamily",
  themeKey: "typography"
}), Ep = Re({
  prop: "fontSize",
  themeKey: "typography"
}), kp = Re({
  prop: "fontStyle",
  themeKey: "typography"
}), $p = Re({
  prop: "fontWeight",
  themeKey: "typography"
}), Rp = Re({
  prop: "letterSpacing"
}), Tp = Re({
  prop: "lineHeight"
}), Op = Re({
  prop: "textAlign"
}), _p = dr(wp, Ep, kp, $p, Rp, Tp, Op);
function Pp() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 8;
  if (t.mui)
    return t;
  var e = Bc({
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
var Ys = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, vi = {
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
function Xs(t) {
  return "".concat(Math.round(t), "ms");
}
const jp = {
  easing: Ys,
  duration: vi,
  create: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["all"], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = a.duration, n = r === void 0 ? vi.standard : r, o = a.easing, i = o === void 0 ? Ys.easeInOut : o, s = a.delay, l = s === void 0 ? 0 : s;
    return Ne(a, ["duration", "easing", "delay"]), (Array.isArray(e) ? e : [e]).map(function(u) {
      return "".concat(u, " ").concat(typeof n == "string" ? n : Xs(n), " ").concat(i, " ").concat(typeof l == "string" ? l : Xs(l));
    }).join(",");
  },
  getAutoHeightDuration: function(e) {
    if (!e)
      return 0;
    var a = e / 36;
    return Math.round((4 + 15 * Math.pow(a, 0.25) + a / 5) * 10);
  }
};
var Fc = {
  mobileStepper: 1e3,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function Ip() {
  for (var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = t.breakpoints, a = e === void 0 ? {} : e, r = t.mixins, n = r === void 0 ? {} : r, o = t.palette, i = o === void 0 ? {} : o, s = t.spacing, l = t.typography, u = l === void 0 ? {} : l, c = Ne(t, ["breakpoints", "mixins", "palette", "spacing", "typography"]), d = Xd(i), p = Gd(a), h = Pp(s), g = Er({
    breakpoints: p,
    direction: "ltr",
    mixins: Yd(p, h, n),
    overrides: {},
    // Inject custom styles
    palette: d,
    props: {},
    // Provide default props
    shadows: rf,
    typography: Zd(d, u),
    spacing: h,
    shape: nf,
    transitions: jp,
    zIndex: Fc
  }, c), m = arguments.length, y = new Array(m > 1 ? m - 1 : 0), w = 1; w < m; w++)
    y[w - 1] = arguments[w];
  return g = y.reduce(function(k, I) {
    return Er(k, I);
  }, g), g;
}
var Ap = typeof Symbol == "function" && Symbol.for;
const Mp = Ap ? Symbol.for("mui.nested") : "__THEME_NESTED__";
var Np = ["checked", "disabled", "error", "focused", "focusVisible", "required", "expanded", "selected"];
function Lp() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = t.disableGlobal, a = e === void 0 ? !1 : e, r = t.productionPrefix, n = r === void 0 ? "jss" : r, o = t.seed, i = o === void 0 ? "" : o, s = i === "" ? "" : "".concat(i, "-"), l = 0, u = function() {
    return l += 1, l;
  };
  return function(c, d) {
    var p = d.options.name;
    if (p && p.indexOf("Mui") === 0 && !d.options.link && !a) {
      if (Np.indexOf(c.key) !== -1)
        return "Mui-".concat(c.key);
      var h = "".concat(s).concat(p, "-").concat(c.key);
      return !d.options.theme[Mp] || i !== "" ? h : "".concat(h, "-").concat(u());
    }
    return "".concat(s).concat(n).concat(u());
  };
}
function zc(t) {
  var e = t.theme, a = t.name, r = t.props;
  if (!e || !e.props || !e.props[a])
    return r;
  var n = e.props[a], o;
  for (o in n)
    r[o] === void 0 && (r[o] = n[o]);
  return r;
}
var Js = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
  return typeof t;
} : function(t) {
  return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, ra = (typeof window > "u" ? "undefined" : Js(window)) === "object" && (typeof document > "u" ? "undefined" : Js(document)) === "object" && document.nodeType === 9;
function Dp(t, e) {
  for (var a = 0; a < e.length; a++) {
    var r = e[a];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, _c(r.key), r);
  }
}
function Yi(t, e, a) {
  return e && Dp(t.prototype, e), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function bi(t, e) {
  return bi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, r) {
    return a.__proto__ = r, a;
  }, bi(t, e);
}
function Za(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, bi(t, e);
}
function yi(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
var Bp = {}.constructor;
function xi(t) {
  if (t == null || typeof t != "object") return t;
  if (Array.isArray(t)) return t.map(xi);
  if (t.constructor !== Bp) return t;
  var e = {};
  for (var a in t)
    e[a] = xi(t[a]);
  return e;
}
function Xi(t, e, a) {
  t === void 0 && (t = "unnamed");
  var r = a.jss, n = xi(e), o = r.plugins.onCreateRule(t, n, a);
  return o || (t[0], null);
}
var Zs = function(e, a) {
  for (var r = "", n = 0; n < e.length && e[n] !== "!important"; n++)
    r && (r += a), r += e[n];
  return r;
}, zr = function(e) {
  if (!Array.isArray(e)) return e;
  var a = "";
  if (Array.isArray(e[0]))
    for (var r = 0; r < e.length && e[r] !== "!important"; r++)
      a && (a += ", "), a += Zs(e[r], " ");
  else a = Zs(e, ", ");
  return e[e.length - 1] === "!important" && (a += " !important"), a;
};
function $n(t) {
  return t && t.format === !1 ? {
    linebreak: "",
    space: ""
  } : {
    linebreak: `
`,
    space: " "
  };
}
function In(t, e) {
  for (var a = "", r = 0; r < e; r++)
    a += "  ";
  return a + t;
}
function qn(t, e, a) {
  a === void 0 && (a = {});
  var r = "";
  if (!e) return r;
  var n = a, o = n.indent, i = o === void 0 ? 0 : o, s = e.fallbacks;
  a.format === !1 && (i = -1 / 0);
  var l = $n(a), u = l.linebreak, c = l.space;
  if (t && i++, s)
    if (Array.isArray(s))
      for (var d = 0; d < s.length; d++) {
        var p = s[d];
        for (var h in p) {
          var g = p[h];
          g != null && (r && (r += u), r += In(h + ":" + c + zr(g) + ";", i));
        }
      }
    else
      for (var m in s) {
        var y = s[m];
        y != null && (r && (r += u), r += In(m + ":" + c + zr(y) + ";", i));
      }
  for (var w in e) {
    var k = e[w];
    k != null && w !== "fallbacks" && (r && (r += u), r += In(w + ":" + c + zr(k) + ";", i));
  }
  return !r && !a.allowEmpty || !t ? r : (i--, r && (r = "" + u + r + u), In("" + t + c + "{" + r, i) + In("}", i));
}
var Fp = /([[\].#*$><+~=|^:(),"'`\s])/g, Qs = typeof CSS < "u" && CSS.escape, Ji = (function(t) {
  return Qs ? Qs(t) : t.replace(Fp, "\\$1");
}), Wc = /* @__PURE__ */ (function() {
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
})(), Ci = /* @__PURE__ */ (function(t) {
  Za(e, t);
  function e(r, n, o) {
    var i;
    i = t.call(this, r, n, o) || this;
    var s = o.selector, l = o.scoped, u = o.sheet, c = o.generateId;
    return s ? i.selectorText = s : l !== !1 && (i.id = c(yi(yi(i)), u), i.selectorText = "." + Ji(i.id)), i;
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
      typeof i != "object" ? n[o] = i : Array.isArray(i) && (n[o] = zr(i));
    }
    return n;
  }, a.toString = function(n) {
    var o = this.options.sheet, i = o ? o.options.link : !1, s = i ? Y({}, n, {
      allowEmpty: !0
    }) : n;
    return qn(this.selectorText, this.style, s);
  }, Yi(e, [{
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
})(Wc), zp = {
  onCreateRule: function(e, a, r) {
    return e[0] === "@" || r.parent && r.parent.type === "keyframes" ? null : new Ci(e, a, r);
  }
}, Bo = {
  indent: 1,
  children: !0
}, Wp = /@([\w-]+)/, Vp = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "conditional", this.isProcessed = !1, this.key = a;
    var o = a.match(Wp);
    this.at = o ? o[1] : "unknown", this.query = n.name || "@" + this.at, this.options = n, this.rules = new Qa(Y({}, n, {
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
    r === void 0 && (r = Bo);
    var n = $n(r), o = n.linebreak;
    if (r.indent == null && (r.indent = Bo.indent), r.children == null && (r.children = Bo.children), r.children === !1)
      return this.query + " {}";
    var i = this.rules.toString(r);
    return i ? this.query + " {" + o + i + o + "}" : "";
  }, t;
})(), Hp = /@container|@media|@supports\s+/, Kp = {
  onCreateRule: function(e, a, r) {
    return Hp.test(e) ? new Vp(e, a, r) : null;
  }
}, Fo = {
  indent: 1,
  children: !0
}, Up = /@keyframes\s+([\w-]+)/, Si = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "keyframes", this.at = "@keyframes", this.isProcessed = !1;
    var o = a.match(Up);
    o && o[1] ? this.name = o[1] : this.name = "noname", this.key = this.type + "-" + this.name, this.options = n;
    var i = n.scoped, s = n.sheet, l = n.generateId;
    this.id = i === !1 ? this.name : Ji(l(this, s)), this.rules = new Qa(Y({}, n, {
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
    r === void 0 && (r = Fo);
    var n = $n(r), o = n.linebreak;
    if (r.indent == null && (r.indent = Fo.indent), r.children == null && (r.children = Fo.children), r.children === !1)
      return this.at + " " + this.id + " {}";
    var i = this.rules.toString(r);
    return i && (i = "" + o + i + o), this.at + " " + this.id + " {" + i + "}";
  }, t;
})(), qp = /@keyframes\s+/, Gp = /\$([\w-]+)/g, wi = function(e, a) {
  return typeof e == "string" ? e.replace(Gp, function(r, n) {
    return n in a ? a[n] : r;
  }) : e;
}, el = function(e, a, r) {
  var n = e[a], o = wi(n, r);
  o !== n && (e[a] = o);
}, Yp = {
  onCreateRule: function(e, a, r) {
    return typeof e == "string" && qp.test(e) ? new Si(e, a, r) : null;
  },
  // Animation name ref replacer.
  onProcessStyle: function(e, a, r) {
    return a.type !== "style" || !r || ("animation-name" in e && el(e, "animation-name", r.keyframes), "animation" in e && el(e, "animation", r.keyframes)), e;
  },
  onChangeValue: function(e, a, r) {
    var n = r.options.sheet;
    if (!n)
      return e;
    switch (a) {
      case "animation":
        return wi(e, n.keyframes);
      case "animation-name":
        return wi(e, n.keyframes);
      default:
        return e;
    }
  }
}, Xp = /* @__PURE__ */ (function(t) {
  Za(e, t);
  function e() {
    return t.apply(this, arguments) || this;
  }
  var a = e.prototype;
  return a.toString = function(n) {
    var o = this.options.sheet, i = o ? o.options.link : !1, s = i ? Y({}, n, {
      allowEmpty: !0
    }) : n;
    return qn(this.key, this.style, s);
  }, e;
})(Wc), Jp = {
  onCreateRule: function(e, a, r) {
    return r.parent && r.parent.type === "keyframes" ? new Xp(e, a, r) : null;
  }
}, Zp = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "font-face", this.at = "@font-face", this.isProcessed = !1, this.key = a, this.style = r, this.options = n;
  }
  var e = t.prototype;
  return e.toString = function(r) {
    var n = $n(r), o = n.linebreak;
    if (Array.isArray(this.style)) {
      for (var i = "", s = 0; s < this.style.length; s++)
        i += qn(this.at, this.style[s]), this.style[s + 1] && (i += o);
      return i;
    }
    return qn(this.at, this.style, r);
  }, t;
})(), Qp = /@font-face/, eh = {
  onCreateRule: function(e, a, r) {
    return Qp.test(e) ? new Zp(e, a, r) : null;
  }
}, th = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "viewport", this.at = "@viewport", this.isProcessed = !1, this.key = a, this.style = r, this.options = n;
  }
  var e = t.prototype;
  return e.toString = function(r) {
    return qn(this.key, this.style, r);
  }, t;
})(), rh = {
  onCreateRule: function(e, a, r) {
    return e === "@viewport" || e === "@-ms-viewport" ? new th(e, a, r) : null;
  }
}, nh = /* @__PURE__ */ (function() {
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
})(), ah = {
  "@charset": !0,
  "@import": !0,
  "@namespace": !0
}, oh = {
  onCreateRule: function(e, a, r) {
    return e in ah ? new nh(e, a, r) : null;
  }
}, tl = [zp, Kp, Yp, Jp, eh, rh, oh], ih = {
  process: !0
}, rl = {
  force: !0,
  process: !0
  /**
   * Contains rules objects and allows adding/removing etc.
   * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
   */
}, Qa = /* @__PURE__ */ (function() {
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
    r in this.raw && (g = r + "-d" + this.counter++), this.raw[g] = n, g in this.classes && (h.selector = "." + Ji(this.classes[g]));
    var m = Xi(g, n, h);
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
    this.map[r.key] = r, r instanceof Ci ? (this.map[r.selector] = r, r.id && (this.classes[r.key] = r.id)) : r instanceof Si && this.keyframes && (this.keyframes[r.name] = r.id);
  }, e.unregister = function(r) {
    delete this.map[r.key], r instanceof Ci ? (delete this.map[r.selector], delete this.classes[r.key]) : r instanceof Si && delete this.keyframes[r.name];
  }, e.update = function() {
    var r, n, o;
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) == "string" ? (r = arguments.length <= 0 ? void 0 : arguments[0], n = arguments.length <= 1 ? void 0 : arguments[1], o = arguments.length <= 2 ? void 0 : arguments[2]) : (n = arguments.length <= 0 ? void 0 : arguments[0], o = arguments.length <= 1 ? void 0 : arguments[1], r = null), r)
      this.updateOne(this.get(r), n, o);
    else
      for (var i = 0; i < this.index.length; i++)
        this.updateOne(this.index[i], n, o);
  }, e.updateOne = function(r, n, o) {
    o === void 0 && (o = ih);
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
        d !== p && r.prop(c, d, rl);
      }
      for (var h in u) {
        var g = r.style[h], m = u[h];
        g == null && g !== m && r.prop(h, null, rl);
      }
    }
  }, e.toString = function(r) {
    for (var n = "", o = this.options.sheet, i = o ? o.options.link : !1, s = $n(r), l = s.linebreak, u = 0; u < this.index.length; u++) {
      var c = this.index[u], d = c.toString(r);
      !d && !i || (n && (n += l), n += d);
    }
    return n;
  }, t;
})(), Vc = /* @__PURE__ */ (function() {
  function t(a, r) {
    this.attached = !1, this.deployed = !1, this.classes = {}, this.keyframes = {}, this.options = Y({}, r, {
      sheet: this,
      parent: this,
      classes: this.classes,
      keyframes: this.keyframes
    }), r.Renderer && (this.renderer = new r.Renderer(this)), this.rules = new Qa(this.options);
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
})(), sh = /* @__PURE__ */ (function() {
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
})(), lh = /* @__PURE__ */ (function() {
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
    for (var n = r === void 0 ? {} : r, o = n.attached, i = Xa(n, ["attached"]), s = $n(i), l = s.linebreak, u = "", c = 0; c < this.registry.length; c++) {
      var d = this.registry[c];
      o != null && d.attached !== o || (u && (u += l), u += d.toString(i));
    }
    return u;
  }, Yi(t, [{
    key: "index",
    /**
     * Current highest index number.
     */
    get: function() {
      return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
    }
  }]), t;
})(), Vn = new lh(), Ei = typeof globalThis < "u" ? globalThis : typeof window < "u" && window.Math === Math ? window : typeof self < "u" && self.Math === Math ? self : Function("return this")(), ki = "2f1acc6c3a606b082e5eef5e54414ffb";
Ei[ki] == null && (Ei[ki] = 0);
var nl = Ei[ki]++, al = function(e) {
  e === void 0 && (e = {});
  var a = 0, r = function(o, i) {
    a += 1;
    var s = "", l = "";
    return i && (i.options.classNamePrefix && (l = i.options.classNamePrefix), i.options.jss.id != null && (s = String(i.options.jss.id))), e.minify ? "" + (l || "c") + nl + s + a : l + o.key + "-" + nl + (s ? "-" + s : "") + "-" + a;
  };
  return r;
}, Hc = function(e) {
  var a;
  return function() {
    return a || (a = e()), a;
  };
}, ch = function(e, a) {
  try {
    return e.attributeStyleMap ? e.attributeStyleMap.get(a) : e.style.getPropertyValue(a);
  } catch {
    return "";
  }
}, uh = function(e, a, r) {
  try {
    var n = r;
    if (Array.isArray(r) && (n = zr(r)), e.attributeStyleMap)
      e.attributeStyleMap.set(a, n);
    else {
      var o = n ? n.indexOf("!important") : -1, i = o > -1 ? n.substr(0, o - 1) : n;
      e.style.setProperty(a, i, o > -1 ? "important" : "");
    }
  } catch {
    return !1;
  }
  return !0;
}, dh = function(e, a) {
  try {
    e.attributeStyleMap ? e.attributeStyleMap.delete(a) : e.style.removeProperty(a);
  } catch {
  }
}, fh = function(e, a) {
  return e.selectorText = a, e.selectorText === a;
}, Kc = Hc(function() {
  return document.querySelector("head");
});
function ph(t, e) {
  for (var a = 0; a < t.length; a++) {
    var r = t[a];
    if (r.attached && r.options.index > e.index && r.options.insertionPoint === e.insertionPoint)
      return r;
  }
  return null;
}
function hh(t, e) {
  for (var a = t.length - 1; a >= 0; a--) {
    var r = t[a];
    if (r.attached && r.options.insertionPoint === e.insertionPoint)
      return r;
  }
  return null;
}
function mh(t) {
  for (var e = Kc(), a = 0; a < e.childNodes.length; a++) {
    var r = e.childNodes[a];
    if (r.nodeType === 8 && r.nodeValue.trim() === t)
      return r;
  }
  return null;
}
function gh(t) {
  var e = Vn.registry;
  if (e.length > 0) {
    var a = ph(e, t);
    if (a && a.renderer)
      return {
        parent: a.renderer.element.parentNode,
        node: a.renderer.element
      };
    if (a = hh(e, t), a && a.renderer)
      return {
        parent: a.renderer.element.parentNode,
        node: a.renderer.element.nextSibling
      };
  }
  var r = t.insertionPoint;
  if (r && typeof r == "string") {
    var n = mh(r);
    if (n)
      return {
        parent: n.parentNode,
        node: n.nextSibling
      };
  }
  return !1;
}
function vh(t, e) {
  var a = e.insertionPoint, r = gh(e);
  if (r !== !1 && r.parent) {
    r.parent.insertBefore(t, r.node);
    return;
  }
  if (a && typeof a.nodeType == "number") {
    var n = a, o = n.parentNode;
    o && o.insertBefore(t, n.nextSibling);
    return;
  }
  Kc().appendChild(t);
}
var bh = Hc(function() {
  var t = document.querySelector('meta[property="csp-nonce"]');
  return t ? t.getAttribute("content") : null;
}), ol = function(e, a, r) {
  try {
    "insertRule" in e ? e.insertRule(a, r) : "appendRule" in e && e.appendRule(a);
  } catch {
    return !1;
  }
  return e.cssRules[r];
}, il = function(e, a) {
  var r = e.cssRules.length;
  return a === void 0 || a > r ? r : a;
}, yh = function() {
  var e = document.createElement("style");
  return e.textContent = `
`, e;
}, xh = /* @__PURE__ */ (function() {
  function t(a) {
    this.getPropertyValue = ch, this.setProperty = uh, this.removeProperty = dh, this.setSelector = fh, this.hasInsertedRules = !1, this.cssRules = [], a && Vn.add(a), this.sheet = a;
    var r = this.sheet ? this.sheet.options : {}, n = r.media, o = r.meta, i = r.element;
    this.element = i || yh(), this.element.setAttribute("data-jss", ""), n && this.element.setAttribute("media", n), o && this.element.setAttribute("data-meta", o);
    var s = bh();
    s && this.element.setAttribute("nonce", s);
  }
  var e = t.prototype;
  return e.attach = function() {
    if (!(this.element.parentNode || !this.sheet)) {
      vh(this.element, this.sheet.options);
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
        var l = il(o, n);
        if (s = ol(o, i.toString({
          children: !1
        }), l), s === !1)
          return !1;
        this.refCssRule(r, l, s);
      }
      return this.insertRules(i.rules, s), s;
    }
    var u = r.toString();
    if (!u) return !1;
    var c = il(o, n), d = ol(o, u, c);
    return d === !1 ? !1 : (this.hasInsertedRules = !0, this.refCssRule(r, c, d), d);
  }, e.refCssRule = function(r, n, o) {
    r.renderable = o, r.options.parent instanceof Vc && this.cssRules.splice(n, 0, o);
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
})(), Ch = 0, Sh = /* @__PURE__ */ (function() {
  function t(a) {
    this.id = Ch++, this.version = "10.10.0", this.plugins = new sh(), this.options = {
      id: {
        minify: !1
      },
      createGenerateId: al,
      Renderer: ra ? xh : null,
      plugins: []
    }, this.generateId = al({
      minify: !1
    });
    for (var r = 0; r < tl.length; r++)
      this.plugins.use(tl[r], {
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
    typeof i != "number" && (i = Vn.index === 0 ? 0 : Vn.index + 1);
    var s = new Vc(r, Y({}, n, {
      jss: this,
      generateId: n.generateId || this.generateId,
      insertionPoint: this.options.insertionPoint,
      Renderer: this.options.Renderer,
      index: i
    }));
    return this.plugins.onProcessSheet(s), s;
  }, e.removeStyleSheet = function(r) {
    return r.detach(), Vn.remove(r), this;
  }, e.createRule = function(r, n, o) {
    if (n === void 0 && (n = {}), o === void 0 && (o = {}), typeof r == "object")
      return this.createRule(void 0, r, n);
    var i = Y({}, o, {
      name: r,
      jss: this,
      Renderer: this.options.Renderer
    });
    i.generateId || (i.generateId = this.generateId), i.classes || (i.classes = {}), i.keyframes || (i.keyframes = {});
    var s = Xi(r, n, i);
    return s && this.plugins.onProcessRule(s), s;
  }, e.use = function() {
    for (var r = this, n = arguments.length, o = new Array(n), i = 0; i < n; i++)
      o[i] = arguments[i];
    return o.forEach(function(s) {
      r.plugins.use(s);
    }), this;
  }, t;
})(), Uc = function(e) {
  return new Sh(e);
}, Zi = typeof CSS == "object" && CSS != null && "number" in CSS;
function qc(t) {
  var e = null;
  for (var a in t) {
    var r = t[a], n = typeof r;
    if (n === "function")
      e || (e = {}), e[a] = r;
    else if (n === "object" && r !== null && !Array.isArray(r)) {
      var o = qc(r);
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
Uc();
var Gc = Date.now(), zo = "fnValues" + Gc, Wo = "fnStyle" + ++Gc, wh = function() {
  return {
    onCreateRule: function(a, r, n) {
      if (typeof r != "function") return null;
      var o = Xi(a, {}, n);
      return o[Wo] = r, o;
    },
    onProcessStyle: function(a, r) {
      if (zo in r || Wo in r) return a;
      var n = {};
      for (var o in a) {
        var i = a[o];
        typeof i == "function" && (delete a[o], n[o] = i);
      }
      return r[zo] = n, a;
    },
    onUpdate: function(a, r, n, o) {
      var i = r, s = i[Wo];
      s && (i.style = s(a) || {});
      var l = i[zo];
      if (l)
        for (var u in l)
          i.prop(u, l[u](a), o);
    }
  };
}, Sr = "@global", $i = "@global ", Eh = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "global", this.at = Sr, this.isProcessed = !1, this.key = a, this.options = n, this.rules = new Qa(Y({}, n, {
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
})(), kh = /* @__PURE__ */ (function() {
  function t(a, r, n) {
    this.type = "global", this.at = Sr, this.isProcessed = !1, this.key = a, this.options = n;
    var o = a.substr($i.length);
    this.rule = n.jss.createRule(o, r, Y({}, n, {
      parent: this
    }));
  }
  var e = t.prototype;
  return e.toString = function(r) {
    return this.rule ? this.rule.toString(r) : "";
  }, t;
})(), $h = /\s*,\s*/g;
function Yc(t, e) {
  for (var a = t.split($h), r = "", n = 0; n < a.length; n++)
    r += e + " " + a[n].trim(), a[n + 1] && (r += ", ");
  return r;
}
function Rh(t, e) {
  var a = t.options, r = t.style, n = r ? r[Sr] : null;
  if (n) {
    for (var o in n)
      e.addRule(o, n[o], Y({}, a, {
        selector: Yc(o, t.selector)
      }));
    delete r[Sr];
  }
}
function Th(t, e) {
  var a = t.options, r = t.style;
  for (var n in r)
    if (!(n[0] !== "@" || n.substr(0, Sr.length) !== Sr)) {
      var o = Yc(n.substr(Sr.length), t.selector);
      e.addRule(o, r[n], Y({}, a, {
        selector: o
      })), delete r[n];
    }
}
function Oh() {
  function t(a, r, n) {
    if (!a) return null;
    if (a === Sr)
      return new Eh(a, r, n);
    if (a[0] === "@" && a.substr(0, $i.length) === $i)
      return new kh(a, r, n);
    var o = n.parent;
    return o && (o.type === "global" || o.options.parent && o.options.parent.type === "global") && (n.scoped = !1), !n.selector && n.scoped === !1 && (n.selector = a), null;
  }
  function e(a, r) {
    a.type !== "style" || !r || (Rh(a, r), Th(a, r));
  }
  return {
    onCreateRule: t,
    onProcessRule: e
  };
}
var sl = /\s*,\s*/g, _h = /&/g, Ph = /\$([\w-]+)/g;
function jh() {
  function t(n, o) {
    return function(i, s) {
      var l = n.getRule(s) || o && o.getRule(s);
      return l ? l.selector : s;
    };
  }
  function e(n, o) {
    for (var i = o.split(sl), s = n.split(sl), l = "", u = 0; u < i.length; u++)
      for (var c = i[u], d = 0; d < s.length; d++) {
        var p = s[d];
        l && (l += ", "), l += p.indexOf("&") !== -1 ? p.replace(_h, c) : c + " " + p;
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
          c || (c = t(l, i)), g = g.replace(Ph, c);
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
var Ih = /[A-Z]/g, Ah = /^ms-/, Vo = {};
function Mh(t) {
  return "-" + t.toLowerCase();
}
function Xc(t) {
  if (Vo.hasOwnProperty(t))
    return Vo[t];
  var e = t.replace(Ih, Mh);
  return Vo[t] = Ah.test(e) ? "-" + e : e;
}
function za(t) {
  var e = {};
  for (var a in t) {
    var r = a.indexOf("--") === 0 ? a : Xc(a);
    e[r] = t[a];
  }
  return t.fallbacks && (Array.isArray(t.fallbacks) ? e.fallbacks = t.fallbacks.map(za) : e.fallbacks = za(t.fallbacks)), e;
}
function Nh() {
  function t(a) {
    if (Array.isArray(a)) {
      for (var r = 0; r < a.length; r++)
        a[r] = za(a[r]);
      return a;
    }
    return za(a);
  }
  function e(a, r, n) {
    if (r.indexOf("--") === 0)
      return a;
    var o = Xc(r);
    return r === o ? a : (n.prop(o, a), null);
  }
  return {
    onProcessStyle: t,
    onChangeValue: e
  };
}
var ae = Zi && CSS ? CSS.px : "px", ba = Zi && CSS ? CSS.ms : "ms", nn = Zi && CSS ? CSS.percent : "%", Lh = {
  // Animation properties
  "animation-delay": ba,
  "animation-duration": ba,
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
  "perspective-origin-x": nn,
  "perspective-origin-y": nn,
  // Transform properties
  "transform-origin": nn,
  "transform-origin-x": nn,
  "transform-origin-y": nn,
  "transform-origin-z": nn,
  // Transition properties
  "transition-delay": ba,
  "transition-duration": ba,
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
function Jc(t) {
  var e = /(-[a-z])/g, a = function(i) {
    return i[1].toUpperCase();
  }, r = {};
  for (var n in t)
    r[n] = t[n], r[n.replace(e, a)] = t[n];
  return r;
}
var Dh = Jc(Lh);
function Hn(t, e, a) {
  if (e == null) return e;
  if (Array.isArray(e))
    for (var r = 0; r < e.length; r++)
      e[r] = Hn(t, e[r], a);
  else if (typeof e == "object")
    if (t === "fallbacks")
      for (var n in e)
        e[n] = Hn(n, e[n], a);
    else
      for (var o in e)
        e[o] = Hn(t + "-" + o, e[o], a);
  else if (typeof e == "number" && isNaN(e) === !1) {
    var i = a[t] || Dh[t];
    return i && !(e === 0 && i === ae) ? typeof i == "function" ? i(e).toString() : "" + e + i : e.toString();
  }
  return e;
}
function Bh(t) {
  t === void 0 && (t = {});
  var e = Jc(t);
  function a(n, o) {
    if (o.type !== "style") return n;
    for (var i in n)
      n[i] = Hn(i, n[i], e);
    return n;
  }
  function r(n, o) {
    return Hn(o, n, e);
  }
  return {
    onProcessStyle: a,
    onChangeValue: r
  };
}
var Ln = "", Ri = "", Zc = "", Qc = "", Fh = ra && "ontouchstart" in document.documentElement;
if (ra) {
  var Ho = {
    Moz: "-moz-",
    ms: "-ms-",
    O: "-o-",
    Webkit: "-webkit-"
  }, zh = document.createElement("p"), Ko = zh.style, Wh = "Transform";
  for (var Uo in Ho)
    if (Uo + Wh in Ko) {
      Ln = Uo, Ri = Ho[Uo];
      break;
    }
  Ln === "Webkit" && "msHyphens" in Ko && (Ln = "ms", Ri = Ho.ms, Qc = "edge"), Ln === "Webkit" && "-apple-trailing-word" in Ko && (Zc = "apple");
}
var Ue = {
  js: Ln,
  css: Ri,
  vendor: Zc,
  browser: Qc,
  isTouch: Fh
};
function Vh(t) {
  return t[1] === "-" || Ue.js === "ms" ? t : "@" + Ue.css + "keyframes" + t.substr(10);
}
var Hh = {
  noPrefill: ["appearance"],
  supportedProperty: function(e) {
    return e !== "appearance" ? !1 : Ue.js === "ms" ? "-webkit-" + e : Ue.css + e;
  }
}, Kh = {
  noPrefill: ["color-adjust"],
  supportedProperty: function(e) {
    return e !== "color-adjust" ? !1 : Ue.js === "Webkit" ? Ue.css + "print-" + e : e;
  }
}, Uh = /[-\s]+(.)?/g;
function qh(t, e) {
  return e ? e.toUpperCase() : "";
}
function Qi(t) {
  return t.replace(Uh, qh);
}
function kr(t) {
  return Qi("-" + t);
}
var Gh = {
  noPrefill: ["mask"],
  supportedProperty: function(e, a) {
    if (!/^mask/.test(e)) return !1;
    if (Ue.js === "Webkit") {
      var r = "mask-image";
      if (Qi(r) in a)
        return e;
      if (Ue.js + kr(r) in a)
        return Ue.css + e;
    }
    return e;
  }
}, Yh = {
  noPrefill: ["text-orientation"],
  supportedProperty: function(e) {
    return e !== "text-orientation" ? !1 : Ue.vendor === "apple" && !Ue.isTouch ? Ue.css + e : e;
  }
}, Xh = {
  noPrefill: ["transform"],
  supportedProperty: function(e, a, r) {
    return e !== "transform" ? !1 : r.transform ? e : Ue.css + e;
  }
}, Jh = {
  noPrefill: ["transition"],
  supportedProperty: function(e, a, r) {
    return e !== "transition" ? !1 : r.transition ? e : Ue.css + e;
  }
}, Zh = {
  noPrefill: ["writing-mode"],
  supportedProperty: function(e) {
    return e !== "writing-mode" ? !1 : Ue.js === "Webkit" || Ue.js === "ms" && Ue.browser !== "edge" ? Ue.css + e : e;
  }
}, Qh = {
  noPrefill: ["user-select"],
  supportedProperty: function(e) {
    return e !== "user-select" ? !1 : Ue.js === "Moz" || Ue.js === "ms" || Ue.vendor === "apple" ? Ue.css + e : e;
  }
}, em = {
  supportedProperty: function(e, a) {
    if (!/^break-/.test(e)) return !1;
    if (Ue.js === "Webkit") {
      var r = "WebkitColumn" + kr(e);
      return r in a ? Ue.css + "column-" + e : !1;
    }
    if (Ue.js === "Moz") {
      var n = "page" + kr(e);
      return n in a ? "page-" + e : !1;
    }
    return !1;
  }
}, tm = {
  supportedProperty: function(e, a) {
    if (!/^(border|margin|padding)-inline/.test(e)) return !1;
    if (Ue.js === "Moz") return e;
    var r = e.replace("-inline", "");
    return Ue.js + kr(r) in a ? Ue.css + r : !1;
  }
}, rm = {
  supportedProperty: function(e, a) {
    return Qi(e) in a ? e : !1;
  }
}, nm = {
  supportedProperty: function(e, a) {
    var r = kr(e);
    return e[0] === "-" || e[0] === "-" && e[1] === "-" ? e : Ue.js + r in a ? Ue.css + e : Ue.js !== "Webkit" && "Webkit" + r in a ? "-webkit-" + e : !1;
  }
}, am = {
  supportedProperty: function(e) {
    return e.substring(0, 11) !== "scroll-snap" ? !1 : Ue.js === "ms" ? "" + Ue.css + e : e;
  }
}, om = {
  supportedProperty: function(e) {
    return e !== "overscroll-behavior" ? !1 : Ue.js === "ms" ? Ue.css + "scroll-chaining" : e;
  }
}, im = {
  "flex-grow": "flex-positive",
  "flex-shrink": "flex-negative",
  "flex-basis": "flex-preferred-size",
  "justify-content": "flex-pack",
  order: "flex-order",
  "align-items": "flex-align",
  "align-content": "flex-line-pack"
  // 'align-self' is handled by 'align-self' plugin.
}, sm = {
  supportedProperty: function(e, a) {
    var r = im[e];
    return r && Ue.js + kr(r) in a ? Ue.css + r : !1;
  }
}, eu = {
  flex: "box-flex",
  "flex-grow": "box-flex",
  "flex-direction": ["box-orient", "box-direction"],
  order: "box-ordinal-group",
  "align-items": "box-align",
  "flex-flow": ["box-orient", "box-direction"],
  "justify-content": "box-pack"
}, lm = Object.keys(eu), cm = function(e) {
  return Ue.css + e;
}, um = {
  supportedProperty: function(e, a, r) {
    var n = r.multiple;
    if (lm.indexOf(e) > -1) {
      var o = eu[e];
      if (!Array.isArray(o))
        return Ue.js + kr(o) in a ? Ue.css + o : !1;
      if (!n) return !1;
      for (var i = 0; i < o.length; i++)
        if (!(Ue.js + kr(o[0]) in a))
          return !1;
      return o.map(cm);
    }
    return !1;
  }
}, tu = [Hh, Kh, Gh, Yh, Xh, Jh, Zh, Qh, em, tm, rm, nm, am, om, sm, um], ll = tu.filter(function(t) {
  return t.supportedProperty;
}).map(function(t) {
  return t.supportedProperty;
}), dm = tu.filter(function(t) {
  return t.noPrefill;
}).reduce(function(t, e) {
  return t.push.apply(t, Ja(e.noPrefill)), t;
}, []), Dn, Dr = {};
if (ra) {
  Dn = document.createElement("p");
  var qo = window.getComputedStyle(document.documentElement, "");
  for (var Go in qo)
    isNaN(Go) || (Dr[qo[Go]] = qo[Go]);
  dm.forEach(function(t) {
    return delete Dr[t];
  });
}
function Ti(t, e) {
  if (e === void 0 && (e = {}), !Dn) return t;
  if (Dr[t] != null)
    return Dr[t];
  (t === "transition" || t === "transform") && (e[t] = t in Dn.style);
  for (var a = 0; a < ll.length && (Dr[t] = ll[a](t, Dn.style, e), !Dr[t]); a++)
    ;
  try {
    Dn.style[t] = "";
  } catch {
    return !1;
  }
  return Dr[t];
}
var an = {}, fm = {
  transition: 1,
  "transition-property": 1,
  "-webkit-transition": 1,
  "-webkit-transition-property": 1
}, pm = /(^\s*[\w-]+)|, (\s*[\w-]+)(?![^()]*\))/g, br;
function hm(t, e, a) {
  if (e === "var") return "var";
  if (e === "all") return "all";
  if (a === "all") return ", all";
  var r = e ? Ti(e) : ", " + Ti(a);
  return r || e || a;
}
ra && (br = document.createElement("p"));
function cl(t, e) {
  var a = e;
  if (!br || t === "content") return e;
  if (typeof a != "string" || !isNaN(parseInt(a, 10)))
    return a;
  var r = t + a;
  if (an[r] != null)
    return an[r];
  try {
    br.style[t] = a;
  } catch {
    return an[r] = !1, !1;
  }
  if (fm[t])
    a = a.replace(pm, hm);
  else if (br.style[t] === "" && (a = Ue.css + a, a === "-ms-flex" && (br.style[t] = "-ms-flexbox"), br.style[t] = a, br.style[t] === ""))
    return an[r] = !1, !1;
  return br.style[t] = "", an[r] = a, an[r];
}
function mm() {
  function t(n) {
    if (n.type === "keyframes") {
      var o = n;
      o.at = Vh(o.at);
    }
  }
  function e(n) {
    for (var o in n) {
      var i = n[o];
      if (o === "fallbacks" && Array.isArray(i)) {
        n[o] = i.map(e);
        continue;
      }
      var s = !1, l = Ti(o);
      l && l !== o && (s = !0);
      var u = !1, c = cl(l, zr(i));
      c && c !== i && (u = !0), (s || u) && (s && delete n[o], n[l || o] = c || i);
    }
    return n;
  }
  function a(n, o) {
    return o.type !== "style" ? n : e(n);
  }
  function r(n, o) {
    return cl(o, zr(n)) || n;
  }
  return {
    onProcessRule: t,
    onProcessStyle: a,
    onChangeValue: r
  };
}
function gm() {
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
function vm() {
  return {
    plugins: [
      wh(),
      Oh(),
      jh(),
      Nh(),
      Bh(),
      // Disable the vendor prefixer server-side, it does nothing.
      // This way, we can get a performance boost.
      // In the documentation, we are using `autoprefixer` to solve this problem.
      typeof window > "u" ? null : mm(),
      gm()
    ]
  };
}
function es() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = t.baseClasses, a = t.newClasses;
  if (t.Component, !a)
    return e;
  var r = Y({}, e);
  return Object.keys(a).forEach(function(n) {
    a[n] && (r[n] = "".concat(e[n], " ").concat(a[n]));
  }), r;
}
var mn = {
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
}, bm = ht.createContext(null);
function na() {
  var t = ht.useContext(bm);
  return t;
}
var ym = Uc(vm()), xm = Lp(), Cm = /* @__PURE__ */ new Map(), Sm = {
  disableGeneration: !1,
  generateClassName: xm,
  jss: ym,
  sheetsCache: null,
  sheetsManager: Cm,
  sheetsRegistry: null
}, wm = ht.createContext(Sm), ul = -1e9;
function Em() {
  return ul += 1, ul;
}
var km = {};
function $m(t) {
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
        s[l] = Er(s[l], i[l]);
      }), s;
    },
    options: {}
  };
}
function Rm(t, e, a) {
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
  return r.classes !== r.cacheClasses.lastJSS && (r.cacheClasses.lastJSS = r.classes, o = !0), e !== r.cacheClasses.lastProp && (r.cacheClasses.lastProp = e, o = !0), o && (r.cacheClasses.value = es({
    baseClasses: r.cacheClasses.lastJSS,
    newClasses: e,
    Component: a
  })), r.cacheClasses.value;
}
function Tm(t, e) {
  var a = t.state, r = t.theme, n = t.stylesOptions, o = t.stylesCreator, i = t.name;
  if (!n.disableGeneration) {
    var s = mn.get(n.sheetsManager, o, r);
    s || (s = {
      refs: 0,
      staticSheet: null,
      dynamicStyles: null
    }, mn.set(n.sheetsManager, o, r, s));
    var l = Y({}, o.options, n, {
      theme: r,
      flip: typeof n.flip == "boolean" ? n.flip : r.direction === "rtl"
    });
    l.generateId = l.serverGenerateClassName || l.generateClassName;
    var u = n.sheetsRegistry;
    if (s.refs === 0) {
      var c;
      n.sheetsCache && (c = mn.get(n.sheetsCache, o, r));
      var d = o.create(r, i);
      c || (c = n.jss.createStyleSheet(d, Y({
        link: !1
      }, l)), c.attach(), n.sheetsCache && mn.set(n.sheetsCache, o, r, c)), u && u.add(c), s.staticSheet = c, s.dynamicStyles = qc(d);
    }
    if (s.dynamicStyles) {
      var p = n.jss.createStyleSheet(s.dynamicStyles, Y({
        link: !0
      }, l));
      p.update(e), p.attach(), a.dynamicSheet = p, a.classes = es({
        baseClasses: s.staticSheet.classes,
        newClasses: p.classes
      }), u && u.add(p);
    } else
      a.classes = s.staticSheet.classes;
    s.refs += 1;
  }
}
function Om(t, e) {
  var a = t.state;
  a.dynamicSheet && a.dynamicSheet.update(e);
}
function _m(t) {
  var e = t.state, a = t.theme, r = t.stylesOptions, n = t.stylesCreator;
  if (!r.disableGeneration) {
    var o = mn.get(r.sheetsManager, n, a);
    o.refs -= 1;
    var i = r.sheetsRegistry;
    o.refs === 0 && (mn.delete(r.sheetsManager, n, a), r.jss.removeStyleSheet(o.staticSheet), i && i.remove(o.staticSheet)), e.dynamicSheet && (r.jss.removeStyleSheet(e.dynamicSheet), i && i.remove(e.dynamicSheet));
  }
}
function Pm(t, e) {
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
function ts(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = e.name, r = e.classNamePrefix, n = e.Component, o = e.defaultTheme, i = o === void 0 ? km : o, s = Ne(e, ["name", "classNamePrefix", "Component", "defaultTheme"]), l = $m(t), u = a || r || "makeStyles";
  l.options = {
    index: Em(),
    name: a,
    meta: u,
    classNamePrefix: u
  };
  var c = function() {
    var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, h = na() || i, g = Y({}, ht.useContext(wm), s), m = ht.useRef(), y = ht.useRef();
    Pm(function() {
      var k = {
        name: a,
        state: {},
        stylesCreator: l,
        stylesOptions: g,
        theme: h
      };
      return Tm(k, p), y.current = !1, m.current = k, function() {
        _m(k);
      };
    }, [h, l]), ht.useEffect(function() {
      y.current && Om(m.current, p), y.current = !0;
    });
    var w = Rm(m.current, p.classes, n);
    return w;
  };
  return c;
}
function jm(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function ru(t) {
  var e, a, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) for (e = 0; e < t.length; e++) t[e] && (a = ru(t[e])) && (r && (r += " "), r += a);
  else for (e in t) t[e] && (r && (r += " "), r += e);
  return r;
}
function he() {
  for (var t, e, a = 0, r = ""; a < arguments.length; ) (t = arguments[a++]) && (e = ru(t)) && (r && (r += " "), r += e);
  return r;
}
var Yo = { exports: {} }, ut = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dl;
function Im() {
  if (dl) return ut;
  dl = 1;
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
var fl;
function Am() {
  return fl || (fl = 1, Yo.exports = Im()), Yo.exports;
}
var Xo, pl;
function Mm() {
  if (pl) return Xo;
  pl = 1;
  var t = Am(), e = {
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
          var L = c(m, E);
          try {
            s(g, E, L);
          } catch {
          }
        }
      }
    }
    return g;
  }
  return Xo = h, Xo;
}
var Nm = Mm();
const nu = /* @__PURE__ */ Or(Nm);
function Lm(t, e) {
  var a = {};
  return Object.keys(t).forEach(function(r) {
    e.indexOf(r) === -1 && (a[r] = t[r]);
  }), a;
}
function Dm(t) {
  var e = function(r) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = n.name, i = Ne(n, ["name"]), s = o, l = typeof r == "function" ? function(p) {
      return {
        root: function(g) {
          return r(Y({
            theme: p
          }, g));
        }
      };
    } : {
      root: r
    }, u = ts(l, Y({
      Component: t,
      name: o || t.displayName,
      classNamePrefix: s
    }, i)), c;
    r.filterProps && (c = r.filterProps, delete r.filterProps), r.propTypes && (r.propTypes, delete r.propTypes);
    var d = /* @__PURE__ */ ht.forwardRef(function(h, g) {
      var m = h.children, y = h.className, w = h.clone, k = h.component, I = Ne(h, ["children", "className", "clone", "component"]), f = u(h), x = he(f.root, y), E = I;
      if (c && (E = Lm(E, c)), w)
        return /* @__PURE__ */ ht.cloneElement(m, Y({
          className: he(m.props.className, x)
        }, E));
      if (typeof m == "function")
        return m(Y({
          className: x
        }, E));
      var L = k || t;
      return /* @__PURE__ */ ht.createElement(L, Y({
        ref: g,
        className: x
      }, E), m);
    });
    return nu(d, t), d;
  };
  return e;
}
var Bm = function(e) {
  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return function(r) {
    var n = a.defaultTheme, o = a.withTheme, i = o === void 0 ? !1 : o, s = a.name, l = Ne(a, ["defaultTheme", "withTheme", "name"]), u = s, c = ts(e, Y({
      defaultTheme: n,
      Component: r,
      name: s || r.displayName,
      classNamePrefix: u
    }, l)), d = /* @__PURE__ */ ht.forwardRef(function(h, g) {
      h.classes;
      var m = h.innerRef, y = Ne(h, ["classes", "innerRef"]), w = c(Y({}, r.defaultProps, h)), k, I = y;
      return (typeof s == "string" || i) && (k = na() || n, s && (I = zc({
        theme: k,
        name: s,
        props: y
      })), i && !I.theme && (I.theme = k)), /* @__PURE__ */ ht.createElement(r, Y({
        ref: m || g,
        classes: w
      }, I));
    });
    return nu(d, r), d;
  };
};
function fr(t) {
  return t;
}
var eo = Ip();
function ar(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return ts(t, Y({
    defaultTheme: eo
  }, e));
}
var rs = function(e) {
  var a = Dm(e);
  return function(r, n) {
    return a(r, Y({
      defaultTheme: eo
    }, n));
  };
};
function Rn() {
  var t = na() || eo;
  return t;
}
function tt(t, e) {
  return Bm(t, Y({
    defaultTheme: eo
  }, e));
}
function pt(t) {
  if (typeof t != "string")
    throw new Error(bn(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Gn() {
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
var Fm = function(e) {
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
}, au = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.color, s = i === void 0 ? "inherit" : i, l = e.component, u = l === void 0 ? "svg" : l, c = e.fontSize, d = c === void 0 ? "medium" : c, p = e.htmlColor, h = e.titleAccess, g = e.viewBox, m = g === void 0 ? "0 0 24 24" : g, y = Ne(e, ["children", "classes", "className", "color", "component", "fontSize", "htmlColor", "titleAccess", "viewBox"]);
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
au.muiName = "SvgIcon";
const hl = tt(Fm, {
  name: "MuiSvgIcon"
})(au);
function Jt(t, e) {
  var a = function(n, o) {
    return /* @__PURE__ */ ht.createElement(hl, Y({
      ref: o
    }, n), t);
  };
  return a.muiName = hl.muiName, /* @__PURE__ */ ht.memo(/* @__PURE__ */ ht.forwardRef(a));
}
function Yn(t) {
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
function Ra(t, e) {
  return /* @__PURE__ */ b.isValidElement(t) && e.indexOf(t.type.muiName) !== -1;
}
function cr(t) {
  return t && t.ownerDocument || document;
}
function ns(t) {
  var e = cr(t);
  return e.defaultView || window;
}
function Hr(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
function as(t) {
  var e = t.controlled, a = t.default;
  t.name, t.state;
  var r = b.useRef(e !== void 0), n = r.current, o = b.useState(a), i = o[0], s = o[1], l = n ? e : i, u = b.useCallback(function(c) {
    n || s(c);
  }, []);
  return [l, u];
}
var zm = typeof window < "u" ? b.useLayoutEffect : b.useEffect;
function rr(t) {
  var e = b.useRef(t);
  return zm(function() {
    e.current = t;
  }), b.useCallback(function() {
    return e.current.apply(void 0, arguments);
  }, []);
}
function St(t, e) {
  return b.useMemo(function() {
    return t == null && e == null ? null : function(a) {
      Hr(t, a), Hr(e, a);
    };
  }, [t, e]);
}
function Wm(t) {
  var e = b.useState(t), a = e[0], r = e[1], n = t || a;
  return b.useEffect(function() {
    a == null && r("mui-".concat(Math.round(Math.random() * 1e5)));
  }, [a]), n;
}
var to = !0, Oi = !1, ml = null, Vm = {
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
function Hm(t) {
  var e = t.type, a = t.tagName;
  return !!(a === "INPUT" && Vm[e] && !t.readOnly || a === "TEXTAREA" && !t.readOnly || t.isContentEditable);
}
function Km(t) {
  t.metaKey || t.altKey || t.ctrlKey || (to = !0);
}
function Jo() {
  to = !1;
}
function Um() {
  this.visibilityState === "hidden" && Oi && (to = !0);
}
function qm(t) {
  t.addEventListener("keydown", Km, !0), t.addEventListener("mousedown", Jo, !0), t.addEventListener("pointerdown", Jo, !0), t.addEventListener("touchstart", Jo, !0), t.addEventListener("visibilitychange", Um, !0);
}
function Gm(t) {
  var e = t.target;
  try {
    return e.matches(":focus-visible");
  } catch {
  }
  return to || Hm(e);
}
function Ym() {
  Oi = !0, window.clearTimeout(ml), ml = window.setTimeout(function() {
    Oi = !1;
  }, 100);
}
function os() {
  var t = b.useCallback(function(e) {
    var a = Xt.findDOMNode(e);
    a != null && qm(a.ownerDocument);
  }, []);
  return {
    isFocusVisible: Gm,
    onBlurVisible: Ym,
    ref: t
  };
}
function Xm(t) {
  return Nc(t) || Ac(t) || qi(t) || Lc();
}
const gl = {
  disabled: !1
}, Wa = ht.createContext(null);
var Jm = function(e) {
  return e.scrollTop;
}, Bn = "unmounted", Nr = "exited", Lr = "entering", hn = "entered", _i = "exiting", or = /* @__PURE__ */ (function(t) {
  Za(e, t);
  function e(r, n) {
    var o;
    o = t.call(this, r, n) || this;
    var i = n, s = i && !i.isMounting ? r.enter : r.appear, l;
    return o.appearStatus = null, r.in ? s ? (l = Nr, o.appearStatus = Lr) : l = hn : r.unmountOnExit || r.mountOnEnter ? l = Bn : l = Nr, o.state = {
      status: l
    }, o.nextCallback = null, o;
  }
  e.getDerivedStateFromProps = function(n, o) {
    var i = n.in;
    return i && o.status === Bn ? {
      status: Nr
    } : null;
  };
  var a = e.prototype;
  return a.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, a.componentDidUpdate = function(n) {
    var o = null;
    if (n !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== Lr && i !== hn && (o = Lr) : (i === Lr || i === hn) && (o = _i);
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
      if (this.cancelNextCallback(), o === Lr) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : ga.findDOMNode(this);
          i && Jm(i);
        }
        this.performEnter(n);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === Nr && this.setState({
      status: Bn
    });
  }, a.performEnter = function(n) {
    var o = this, i = this.props.enter, s = this.context ? this.context.isMounting : n, l = this.props.nodeRef ? [s] : [ga.findDOMNode(this), s], u = l[0], c = l[1], d = this.getTimeouts(), p = s ? d.appear : d.enter;
    if (!n && !i || gl.disabled) {
      this.safeSetState({
        status: hn
      }, function() {
        o.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, c), this.safeSetState({
      status: Lr
    }, function() {
      o.props.onEntering(u, c), o.onTransitionEnd(p, function() {
        o.safeSetState({
          status: hn
        }, function() {
          o.props.onEntered(u, c);
        });
      });
    });
  }, a.performExit = function() {
    var n = this, o = this.props.exit, i = this.getTimeouts(), s = this.props.nodeRef ? void 0 : ga.findDOMNode(this);
    if (!o || gl.disabled) {
      this.safeSetState({
        status: Nr
      }, function() {
        n.props.onExited(s);
      });
      return;
    }
    this.props.onExit(s), this.safeSetState({
      status: _i
    }, function() {
      n.props.onExiting(s), n.onTransitionEnd(i.exit, function() {
        n.safeSetState({
          status: Nr
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : ga.findDOMNode(this), s = n == null && !this.props.addEndListener;
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
    if (n === Bn)
      return null;
    var o = this.props, i = o.children;
    o.in, o.mountOnEnter, o.unmountOnExit, o.appear, o.enter, o.exit, o.timeout, o.addEndListener, o.onEnter, o.onEntering, o.onEntered, o.onExit, o.onExiting, o.onExited, o.nodeRef;
    var s = Xa(o, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ ht.createElement(Wa.Provider, {
        value: null
      }, typeof i == "function" ? i(n, s) : ht.cloneElement(ht.Children.only(i), s))
    );
  }, e;
})(ht.Component);
or.contextType = Wa;
or.propTypes = {};
function on() {
}
or.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: on,
  onEntering: on,
  onEntered: on,
  onExit: on,
  onExiting: on,
  onExited: on
};
or.UNMOUNTED = Bn;
or.EXITED = Nr;
or.ENTERING = Lr;
or.ENTERED = hn;
or.EXITING = _i;
function is(t, e) {
  var a = function(o) {
    return e && ka(o) ? e(o) : o;
  }, r = /* @__PURE__ */ Object.create(null);
  return t && Ad.map(t, function(n) {
    return n;
  }).forEach(function(n) {
    r[n.key] = a(n);
  }), r;
}
function Zm(t, e) {
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
function Br(t, e, a) {
  return a[e] != null ? a[e] : t.props[e];
}
function Qm(t, e) {
  return is(t.children, function(a) {
    return $a(a, {
      onExited: e.bind(null, a),
      in: !0,
      appear: Br(a, "appear", t),
      enter: Br(a, "enter", t),
      exit: Br(a, "exit", t)
    });
  });
}
function eg(t, e, a) {
  var r = is(t.children), n = Zm(e, r);
  return Object.keys(n).forEach(function(o) {
    var i = n[o];
    if (ka(i)) {
      var s = o in e, l = o in r, u = e[o], c = ka(u) && !u.props.in;
      l && (!s || c) ? n[o] = $a(i, {
        onExited: a.bind(null, i),
        in: !0,
        exit: Br(i, "exit", t),
        enter: Br(i, "enter", t)
      }) : !l && s && !c ? n[o] = $a(i, {
        in: !1
      }) : l && s && ka(u) && (n[o] = $a(i, {
        onExited: a.bind(null, i),
        in: u.props.in,
        exit: Br(i, "exit", t),
        enter: Br(i, "enter", t)
      }));
    }
  }), n;
}
var tg = Object.values || function(t) {
  return Object.keys(t).map(function(e) {
    return t[e];
  });
}, rg = {
  component: "div",
  childFactory: function(e) {
    return e;
  }
}, ss = /* @__PURE__ */ (function(t) {
  Za(e, t);
  function e(r, n) {
    var o;
    o = t.call(this, r, n) || this;
    var i = o.handleExited.bind(yi(o));
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
      children: l ? Qm(n, s) : eg(n, i, s),
      firstRender: !1
    };
  }, a.handleExited = function(n, o) {
    var i = is(this.props.children);
    n.key in i || (n.props.onExited && n.props.onExited(o), this.mounted && this.setState(function(s) {
      var l = Y({}, s.children);
      return delete l[n.key], {
        children: l
      };
    }));
  }, a.render = function() {
    var n = this.props, o = n.component, i = n.childFactory, s = Xa(n, ["component", "childFactory"]), l = this.state.contextValue, u = tg(this.state.children).map(i);
    return delete s.appear, delete s.enter, delete s.exit, o === null ? /* @__PURE__ */ ht.createElement(Wa.Provider, {
      value: l
    }, u) : /* @__PURE__ */ ht.createElement(Wa.Provider, {
      value: l
    }, /* @__PURE__ */ ht.createElement(o, s, u));
  }, e;
})(ht.Component);
ss.propTypes = {};
ss.defaultProps = rg;
var ng = function(e) {
  return e.scrollTop;
};
function Va(t, e) {
  var a = t.timeout, r = t.style, n = r === void 0 ? {} : r;
  return {
    duration: n.transitionDuration || typeof a == "number" ? a : a[e.mode] || 0,
    delay: n.transitionDelay
  };
}
var ag = function(e) {
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
}, ou = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.collapsedHeight, s = e.collapsedSize, l = s === void 0 ? "0px" : s, u = e.component, c = u === void 0 ? "div" : u, d = e.disableStrictModeCompat, p = d === void 0 ? !1 : d, h = e.in, g = e.onEnter, m = e.onEntered, y = e.onEntering, w = e.onExit, k = e.onExited, I = e.onExiting, f = e.style, x = e.timeout, E = x === void 0 ? vi.standard : x, L = e.TransitionComponent, W = L === void 0 ? or : L, O = Ne(e, ["children", "classes", "className", "collapsedHeight", "collapsedSize", "component", "disableStrictModeCompat", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"]), P = Rn(), A = b.useRef(), v = b.useRef(null), C = b.useRef(), M = typeof (i || l) == "number" ? "".concat(i || l, "px") : i || l;
  b.useEffect(function() {
    return function() {
      clearTimeout(A.current);
    };
  }, []);
  var D = P.unstable_strictMode && !p, $ = b.useRef(null), V = St(a, D ? $ : void 0), F = function(be) {
    return function(ye, we) {
      if (be) {
        var ke = D ? [$.current, ye] : [ye, we], ge = kn(ke, 2), Ee = ge[0], Ae = ge[1];
        Ae === void 0 ? be(Ee) : be(Ee, Ae);
      }
    };
  }, q = F(function(de, be) {
    de.style.height = M, g && g(de, be);
  }), z = F(function(de, be) {
    var ye = v.current ? v.current.clientHeight : 0, we = Va({
      style: f,
      timeout: E
    }, {
      mode: "enter"
    }), ke = we.duration;
    if (E === "auto") {
      var ge = P.transitions.getAutoHeightDuration(ye);
      de.style.transitionDuration = "".concat(ge, "ms"), C.current = ge;
    } else
      de.style.transitionDuration = typeof ke == "string" ? ke : "".concat(ke, "ms");
    de.style.height = "".concat(ye, "px"), y && y(de, be);
  }), J = F(function(de, be) {
    de.style.height = "auto", m && m(de, be);
  }), Z = F(function(de) {
    var be = v.current ? v.current.clientHeight : 0;
    de.style.height = "".concat(be, "px"), w && w(de);
  }), ce = F(k), ue = F(function(de) {
    var be = v.current ? v.current.clientHeight : 0, ye = Va({
      style: f,
      timeout: E
    }, {
      mode: "exit"
    }), we = ye.duration;
    if (E === "auto") {
      var ke = P.transitions.getAutoHeightDuration(be);
      de.style.transitionDuration = "".concat(ke, "ms"), C.current = ke;
    } else
      de.style.transitionDuration = typeof we == "string" ? we : "".concat(we, "ms");
    de.style.height = M, I && I(de);
  }), xe = function(be, ye) {
    var we = D ? be : ye;
    E === "auto" && (A.current = setTimeout(we, C.current || 0));
  };
  return /* @__PURE__ */ b.createElement(W, Y({
    in: h,
    onEnter: q,
    onEntered: J,
    onEntering: z,
    onExit: Z,
    onExited: ce,
    onExiting: ue,
    addEndListener: xe,
    nodeRef: D ? $ : void 0,
    timeout: E === "auto" ? null : E
  }, O), function(de, be) {
    return /* @__PURE__ */ b.createElement(c, Y({
      className: he(n.root, n.container, o, {
        entered: n.entered,
        exited: !h && M === "0px" && n.hidden
      }[de]),
      style: Y({
        minHeight: M
      }, f),
      ref: V
    }, be), /* @__PURE__ */ b.createElement("div", {
      className: n.wrapper,
      ref: v
    }, /* @__PURE__ */ b.createElement("div", {
      className: n.wrapperInner
    }, r)));
  });
});
ou.muiSupportAuto = !0;
const og = tt(ag, {
  name: "MuiCollapse"
})(ou);
var ig = function(e) {
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
}, sg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.component, i = o === void 0 ? "div" : o, s = e.square, l = s === void 0 ? !1 : s, u = e.elevation, c = u === void 0 ? 1 : u, d = e.variant, p = d === void 0 ? "elevation" : d, h = Ne(e, ["classes", "className", "component", "square", "elevation", "variant"]);
  return /* @__PURE__ */ b.createElement(i, Y({
    className: he(r.root, n, p === "outlined" ? r.outlined : r["elevation".concat(c)], !l && r.rounded),
    ref: a
  }, h));
});
const iu = tt(ig, {
  name: "MuiPaper"
})(sg);
var su = b.createContext({}), lg = function(e) {
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
}, cg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.defaultExpanded, s = i === void 0 ? !1 : i, l = e.disabled, u = l === void 0 ? !1 : l, c = e.expanded, d = e.onChange, p = e.square, h = p === void 0 ? !1 : p, g = e.TransitionComponent, m = g === void 0 ? og : g, y = e.TransitionProps, w = Ne(e, ["children", "classes", "className", "defaultExpanded", "disabled", "expanded", "onChange", "square", "TransitionComponent", "TransitionProps"]), k = as({
    controlled: c,
    default: s,
    name: "Accordion",
    state: "expanded"
  }), I = kn(k, 2), f = I[0], x = I[1], E = b.useCallback(function(v) {
    x(!f), d && d(v, !f);
  }, [f, d, x]), L = b.Children.toArray(r), W = Xm(L), O = W[0], P = W.slice(1), A = b.useMemo(function() {
    return {
      expanded: f,
      disabled: u,
      toggle: E
    };
  }, [f, u, E]);
  return /* @__PURE__ */ b.createElement(iu, Y({
    className: he(n.root, o, f && n.expanded, u && n.disabled, !h && n.rounded),
    ref: a,
    square: h
  }, w), /* @__PURE__ */ b.createElement(su.Provider, {
    value: A
  }, O), /* @__PURE__ */ b.createElement(m, Y({
    in: f,
    timeout: "auto"
  }, y), /* @__PURE__ */ b.createElement("div", {
    "aria-labelledby": O.props.id,
    id: O.props["aria-controls"],
    role: "region"
  }, P)));
});
const ug = tt(lg, {
  name: "MuiAccordion"
})(cg);
var dg = function(e) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: "flex",
      padding: e.spacing(1, 2, 2)
    }
  };
}, fg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = Ne(e, ["classes", "className"]);
  return /* @__PURE__ */ b.createElement("div", Y({
    className: he(r.root, n),
    ref: a
  }, o));
});
const pg = tt(dg, {
  name: "MuiAccordionDetails"
})(fg);
var hg = typeof window > "u" ? b.useEffect : b.useLayoutEffect;
function mg(t) {
  var e = t.classes, a = t.pulsate, r = a === void 0 ? !1 : a, n = t.rippleX, o = t.rippleY, i = t.rippleSize, s = t.in, l = t.onExited, u = l === void 0 ? function() {
  } : l, c = t.timeout, d = b.useState(!1), p = d[0], h = d[1], g = he(e.ripple, e.rippleVisible, r && e.ripplePulsate), m = {
    width: i,
    height: i,
    top: -(i / 2) + o,
    left: -(i / 2) + n
  }, y = he(e.child, p && e.childLeaving, r && e.childPulsate), w = rr(u);
  return hg(function() {
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
var Pi = 550, gg = 80, vg = function(e) {
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
      animation: "$enter ".concat(Pi, "ms ").concat(e.transitions.easing.easeInOut)
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
      animation: "$exit ".concat(Pi, "ms ").concat(e.transitions.easing.easeInOut)
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
}, bg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.center, n = r === void 0 ? !1 : r, o = e.classes, i = e.className, s = Ne(e, ["center", "classes", "className"]), l = b.useState([]), u = l[0], c = l[1], d = b.useRef(0), p = b.useRef(null);
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
    var E = x.pulsate, L = x.rippleX, W = x.rippleY, O = x.rippleSize, P = x.cb;
    c(function(A) {
      return [].concat(Ja(A), [/* @__PURE__ */ b.createElement(mg, {
        key: d.current,
        classes: o,
        timeout: Pi,
        pulsate: E,
        rippleX: L,
        rippleY: W,
        rippleSize: O
      })]);
    }), d.current += 1, p.current = P;
  }, [o]), k = b.useCallback(function() {
    var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, L = arguments.length > 2 ? arguments[2] : void 0, W = E.pulsate, O = W === void 0 ? !1 : W, P = E.center, A = P === void 0 ? n || E.pulsate : P, v = E.fakeElement, C = v === void 0 ? !1 : v;
    if (x.type === "mousedown" && h.current) {
      h.current = !1;
      return;
    }
    x.type === "touchstart" && (h.current = !0);
    var M = C ? null : y.current, D = M ? M.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    }, $, V, F;
    if (A || x.clientX === 0 && x.clientY === 0 || !x.clientX && !x.touches)
      $ = Math.round(D.width / 2), V = Math.round(D.height / 2);
    else {
      var q = x.touches ? x.touches[0] : x, z = q.clientX, J = q.clientY;
      $ = Math.round(z - D.left), V = Math.round(J - D.top);
    }
    if (A)
      F = Math.sqrt((2 * Math.pow(D.width, 2) + Math.pow(D.height, 2)) / 3), F % 2 === 0 && (F += 1);
    else {
      var Z = Math.max(Math.abs((M ? M.clientWidth : 0) - $), $) * 2 + 2, ce = Math.max(Math.abs((M ? M.clientHeight : 0) - V), V) * 2 + 2;
      F = Math.sqrt(Math.pow(Z, 2) + Math.pow(ce, 2));
    }
    x.touches ? m.current === null && (m.current = function() {
      w({
        pulsate: O,
        rippleX: $,
        rippleY: V,
        rippleSize: F,
        cb: L
      });
    }, g.current = setTimeout(function() {
      m.current && (m.current(), m.current = null);
    }, gg)) : w({
      pulsate: O,
      rippleX: $,
      rippleY: V,
      rippleSize: F,
      cb: L
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
    m.current = null, c(function(L) {
      return L.length > 0 ? L.slice(1) : L;
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
  }, s), /* @__PURE__ */ b.createElement(ss, {
    component: null,
    exit: !0
  }, u));
});
const yg = tt(vg, {
  flip: !1,
  name: "MuiTouchRipple"
})(/* @__PURE__ */ b.memo(bg));
var xg = {
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
}, Cg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.action, n = e.buttonRef, o = e.centerRipple, i = o === void 0 ? !1 : o, s = e.children, l = e.classes, u = e.className, c = e.component, d = c === void 0 ? "button" : c, p = e.disabled, h = p === void 0 ? !1 : p, g = e.disableRipple, m = g === void 0 ? !1 : g, y = e.disableTouchRipple, w = y === void 0 ? !1 : y, k = e.focusRipple, I = k === void 0 ? !1 : k, f = e.focusVisibleClassName, x = e.onBlur, E = e.onClick, L = e.onFocus, W = e.onFocusVisible, O = e.onKeyDown, P = e.onKeyUp, A = e.onMouseDown, v = e.onMouseLeave, C = e.onMouseUp, M = e.onTouchEnd, D = e.onTouchMove, $ = e.onTouchStart, V = e.onDragLeave, F = e.tabIndex, q = F === void 0 ? 0 : F, z = e.TouchRippleProps, J = e.type, Z = J === void 0 ? "button" : J, ce = Ne(e, ["action", "buttonRef", "centerRipple", "children", "classes", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "onBlur", "onClick", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "onDragLeave", "tabIndex", "TouchRippleProps", "type"]), ue = b.useRef(null);
  function xe() {
    return Xt.findDOMNode(ue.current);
  }
  var de = b.useRef(null), be = b.useState(!1), ye = be[0], we = be[1];
  h && ye && we(!1);
  var ke = os(), ge = ke.isFocusVisible, Ee = ke.onBlurVisible, Ae = ke.ref;
  b.useImperativeHandle(r, function() {
    return {
      focusVisible: function() {
        we(!0), ue.current.focus();
      }
    };
  }, []), b.useEffect(function() {
    ye && I && !m && de.current.pulsate();
  }, [m, I, ye]);
  function _e(ie, $e) {
    var Ye = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : w;
    return rr(function(Qe) {
      $e && $e(Qe);
      var at = Ye;
      return !at && de.current && de.current[ie](Qe), !0;
    });
  }
  var qe = _e("start", A), Te = _e("stop", V), We = _e("stop", C), Ke = _e("stop", function(ie) {
    ye && ie.preventDefault(), v && v(ie);
  }), Ge = _e("start", $), fe = _e("stop", M), pe = _e("stop", D), je = _e("stop", function(ie) {
    ye && (Ee(ie), we(!1)), x && x(ie);
  }, !1), Ie = rr(function(ie) {
    ue.current || (ue.current = ie.currentTarget), ge(ie) && (we(!0), W && W(ie)), L && L(ie);
  }), Ve = function() {
    var $e = xe();
    return d && d !== "button" && !($e.tagName === "A" && $e.href);
  }, ee = b.useRef(!1), K = rr(function(ie) {
    I && !ee.current && ye && de.current && ie.key === " " && (ee.current = !0, ie.persist(), de.current.stop(ie, function() {
      de.current.start(ie);
    })), ie.target === ie.currentTarget && Ve() && ie.key === " " && ie.preventDefault(), O && O(ie), ie.target === ie.currentTarget && Ve() && ie.key === "Enter" && !h && (ie.preventDefault(), E && E(ie));
  }), U = rr(function(ie) {
    I && ie.key === " " && de.current && ye && !ie.defaultPrevented && (ee.current = !1, ie.persist(), de.current.stop(ie, function() {
      de.current.pulsate(ie);
    })), P && P(ie), E && ie.target === ie.currentTarget && Ve() && ie.key === " " && !ie.defaultPrevented && E(ie);
  }), te = d;
  te === "button" && ce.href && (te = "a");
  var oe = {};
  te === "button" ? (oe.type = Z, oe.disabled = h) : ((te !== "a" || !ce.href) && (oe.role = "button"), oe["aria-disabled"] = h);
  var Ce = St(n, a), Le = St(Ae, ue), Se = St(Ce, Le), me = b.useState(!1), Fe = me[0], He = me[1];
  b.useEffect(function() {
    He(!0);
  }, []);
  var Pe = Fe && !m && !h;
  return /* @__PURE__ */ b.createElement(te, Y({
    className: he(l.root, u, ye && [l.focusVisible, f], h && l.disabled),
    onBlur: je,
    onClick: E,
    onFocus: Ie,
    onKeyDown: K,
    onKeyUp: U,
    onMouseDown: qe,
    onMouseLeave: Ke,
    onMouseUp: We,
    onDragLeave: Te,
    onTouchEnd: fe,
    onTouchMove: pe,
    onTouchStart: Ge,
    ref: Se,
    tabIndex: h ? -1 : q
  }, oe, ce), s, Pe ? (
    /* TouchRipple is only needed client-side, x2 boost on the server. */
    /* @__PURE__ */ b.createElement(yg, Y({
      ref: de,
      center: i
    }, z))
  ) : null);
});
const $r = tt(xg, {
  name: "MuiButtonBase"
})(Cg);
var Sg = function(e) {
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
        backgroundColor: Je(e.palette.action.active, e.palette.action.hoverOpacity),
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
        backgroundColor: Je(e.palette.primary.main, e.palette.action.hoverOpacity),
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
        backgroundColor: Je(e.palette.secondary.main, e.palette.action.hoverOpacity),
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
}, wg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.edge, n = r === void 0 ? !1 : r, o = e.children, i = e.classes, s = e.className, l = e.color, u = l === void 0 ? "default" : l, c = e.disabled, d = c === void 0 ? !1 : c, p = e.disableFocusRipple, h = p === void 0 ? !1 : p, g = e.size, m = g === void 0 ? "medium" : g, y = Ne(e, ["edge", "children", "classes", "className", "color", "disabled", "disableFocusRipple", "size"]);
  return /* @__PURE__ */ b.createElement($r, Y({
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
const lu = tt(Sg, {
  name: "MuiIconButton"
})(wg);
var Eg = function(e) {
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
}, kg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.expandIcon, s = e.focusVisibleClassName, l = e.IconButtonProps, u = l === void 0 ? {} : l, c = e.onClick, d = Ne(e, ["children", "classes", "className", "expandIcon", "focusVisibleClassName", "IconButtonProps", "onClick"]), p = b.useContext(su), h = p.disabled, g = h === void 0 ? !1 : h, m = p.expanded, y = p.toggle, w = function(I) {
    y && y(I), c && c(I);
  };
  return /* @__PURE__ */ b.createElement($r, Y({
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
  }, r), i && /* @__PURE__ */ b.createElement(lu, Y({
    className: he(n.expandIcon, m && n.expanded),
    edge: "end",
    component: "div",
    tabIndex: null,
    role: null,
    "aria-hidden": !0
  }, u), i));
});
const $g = tt(Eg, {
  name: "MuiAccordionSummary"
})(kg);
var Rg = gf(dr(mf, wf, Lf, Xf, ip, Qf, sp, mp, Gi, _p)), ve = rs("div")(Rg, {
  name: "MuiBox"
}), Tg = function(e) {
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
}, vl = {
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
}, Og = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.align, n = r === void 0 ? "inherit" : r, o = e.classes, i = e.className, s = e.color, l = s === void 0 ? "initial" : s, u = e.component, c = e.display, d = c === void 0 ? "initial" : c, p = e.gutterBottom, h = p === void 0 ? !1 : p, g = e.noWrap, m = g === void 0 ? !1 : g, y = e.paragraph, w = y === void 0 ? !1 : y, k = e.variant, I = k === void 0 ? "body1" : k, f = e.variantMapping, x = f === void 0 ? vl : f, E = Ne(e, ["align", "classes", "className", "color", "component", "display", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"]), L = u || (w ? "p" : x[I] || vl[I]) || "span";
  return /* @__PURE__ */ b.createElement(L, Y({
    className: he(o.root, i, I !== "inherit" && o[I], l !== "initial" && o["color".concat(pt(l))], m && o.noWrap, h && o.gutterBottom, w && o.paragraph, n !== "inherit" && o["align".concat(pt(n))], d !== "initial" && o["display".concat(pt(d))]),
    ref: a
  }, E));
});
const Mt = tt(Tg, {
  name: "MuiTypography"
})(Og);
var _g = function(e) {
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
        backgroundColor: Je(e.palette.text.primary, e.palette.action.hoverOpacity),
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
        backgroundColor: Je(e.palette.primary.main, e.palette.action.hoverOpacity),
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
        backgroundColor: Je(e.palette.secondary.main, e.palette.action.hoverOpacity),
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
      border: "1px solid ".concat(Je(e.palette.primary.main, 0.5)),
      "&:hover": {
        border: "1px solid ".concat(e.palette.primary.main),
        backgroundColor: Je(e.palette.primary.main, e.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      color: e.palette.secondary.main,
      border: "1px solid ".concat(Je(e.palette.secondary.main, 0.5)),
      "&:hover": {
        border: "1px solid ".concat(e.palette.secondary.main),
        backgroundColor: Je(e.palette.secondary.main, e.palette.action.hoverOpacity),
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
}, Pg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.color, s = i === void 0 ? "default" : i, l = e.component, u = l === void 0 ? "button" : l, c = e.disabled, d = c === void 0 ? !1 : c, p = e.disableElevation, h = p === void 0 ? !1 : p, g = e.disableFocusRipple, m = g === void 0 ? !1 : g, y = e.endIcon, w = e.focusVisibleClassName, k = e.fullWidth, I = k === void 0 ? !1 : k, f = e.size, x = f === void 0 ? "medium" : f, E = e.startIcon, L = e.type, W = L === void 0 ? "button" : L, O = e.variant, P = O === void 0 ? "text" : O, A = Ne(e, ["children", "classes", "className", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"]), v = E && /* @__PURE__ */ b.createElement("span", {
    className: he(n.startIcon, n["iconSize".concat(pt(x))])
  }, E), C = y && /* @__PURE__ */ b.createElement("span", {
    className: he(n.endIcon, n["iconSize".concat(pt(x))])
  }, y);
  return /* @__PURE__ */ b.createElement($r, Y({
    className: he(n.root, n[P], o, s === "inherit" ? n.colorInherit : s !== "default" && n["".concat(P).concat(pt(s))], x !== "medium" && [n["".concat(P, "Size").concat(pt(x))], n["size".concat(pt(x))]], h && n.disableElevation, d && n.disabled, I && n.fullWidth),
    component: u,
    disabled: d,
    focusRipple: !m,
    focusVisibleClassName: he(n.focusVisible, w),
    ref: a,
    type: W
  }, A), /* @__PURE__ */ b.createElement("span", {
    className: n.label
  }, v, r, C));
});
const jg = tt(_g, {
  name: "MuiButton"
})(Pg);
var aa = b.createContext();
function cu() {
  return b.useContext(aa);
}
function ls() {
  return b.useContext(aa);
}
const Ig = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}));
var Ag = function(e) {
  var a = e.palette.type === "light" ? e.palette.grey[300] : e.palette.grey[700], r = Je(e.palette.text.primary, 0.26);
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
        backgroundColor: rn(a, 0.08)
      },
      "&:active": {
        boxShadow: e.shadows[1]
      }
    },
    /* Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`. */
    clickableColorPrimary: {
      "&:hover, &:focus": {
        backgroundColor: rn(e.palette.primary.main, 0.08)
      }
    },
    /* Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`. */
    clickableColorSecondary: {
      "&:hover, &:focus": {
        backgroundColor: rn(e.palette.secondary.main, 0.08)
      }
    },
    /* Styles applied to the root element if `onDelete` is defined. */
    deletable: {
      "&:focus": {
        backgroundColor: rn(a, 0.08)
      }
    },
    /* Styles applied to the root element if `onDelete` and `color="primary"` is defined. */
    deletableColorPrimary: {
      "&:focus": {
        backgroundColor: rn(e.palette.primary.main, 0.2)
      }
    },
    /* Styles applied to the root element if `onDelete` and `color="secondary"` is defined. */
    deletableColorSecondary: {
      "&:focus": {
        backgroundColor: rn(e.palette.secondary.main, 0.2)
      }
    },
    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      backgroundColor: "transparent",
      border: "1px solid ".concat(e.palette.type === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"),
      "$clickable&:hover, $clickable&:focus, $deletable&:focus": {
        backgroundColor: Je(e.palette.text.primary, e.palette.action.hoverOpacity)
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
        backgroundColor: Je(e.palette.primary.main, e.palette.action.hoverOpacity)
      }
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      color: e.palette.secondary.main,
      border: "1px solid ".concat(e.palette.secondary.main),
      "$clickable&:hover, $clickable&:focus, $deletable&:focus": {
        backgroundColor: Je(e.palette.secondary.main, e.palette.action.hoverOpacity)
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
        color: Je(r, 0.4)
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
      color: Je(e.palette.primary.contrastText, 0.7),
      "&:hover, &:active": {
        color: e.palette.primary.contrastText
      }
    },
    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="default"`. */
    deleteIconColorSecondary: {
      color: Je(e.palette.secondary.contrastText, 0.7),
      "&:hover, &:active": {
        color: e.palette.secondary.contrastText
      }
    },
    /* Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`. */
    deleteIconOutlinedColorPrimary: {
      color: Je(e.palette.primary.main, 0.7),
      "&:hover, &:active": {
        color: e.palette.primary.main
      }
    },
    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`. */
    deleteIconOutlinedColorSecondary: {
      color: Je(e.palette.secondary.main, 0.7),
      "&:hover, &:active": {
        color: e.palette.secondary.main
      }
    }
  };
};
function bl(t) {
  return t.key === "Backspace" || t.key === "Delete";
}
var Mg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.avatar, n = e.classes, o = e.className, i = e.clickable, s = e.color, l = s === void 0 ? "default" : s, u = e.component, c = e.deleteIcon, d = e.disabled, p = d === void 0 ? !1 : d, h = e.icon, g = e.label, m = e.onClick, y = e.onDelete, w = e.onKeyDown, k = e.onKeyUp, I = e.size, f = I === void 0 ? "medium" : I, x = e.variant, E = x === void 0 ? "default" : x, L = Ne(e, ["avatar", "classes", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant"]), W = b.useRef(null), O = St(W, a), P = function(Z) {
    Z.stopPropagation(), y && y(Z);
  }, A = function(Z) {
    Z.currentTarget === Z.target && bl(Z) && Z.preventDefault(), w && w(Z);
  }, v = function(Z) {
    Z.currentTarget === Z.target && (y && bl(Z) ? y(Z) : Z.key === "Escape" && W.current && W.current.blur()), k && k(Z);
  }, C = i !== !1 && m ? !0 : i, M = f === "small", D = u || (C ? $r : "div"), $ = D === $r ? {
    component: "div"
  } : {}, V = null;
  if (y) {
    var F = he(l !== "default" && (E === "default" ? n["deleteIconColor".concat(pt(l))] : n["deleteIconOutlinedColor".concat(pt(l))]), M && n.deleteIconSmall);
    V = c && /* @__PURE__ */ b.isValidElement(c) ? /* @__PURE__ */ b.cloneElement(c, {
      className: he(c.props.className, n.deleteIcon, F),
      onClick: P
    }) : /* @__PURE__ */ b.createElement(Ig, {
      className: he(n.deleteIcon, F),
      onClick: P
    });
  }
  var q = null;
  r && /* @__PURE__ */ b.isValidElement(r) && (q = /* @__PURE__ */ b.cloneElement(r, {
    className: he(n.avatar, r.props.className, M && n.avatarSmall, l !== "default" && n["avatarColor".concat(pt(l))])
  }));
  var z = null;
  return h && /* @__PURE__ */ b.isValidElement(h) && (z = /* @__PURE__ */ b.cloneElement(h, {
    className: he(n.icon, h.props.className, M && n.iconSmall, l !== "default" && n["iconColor".concat(pt(l))])
  })), /* @__PURE__ */ b.createElement(D, Y({
    role: C || y ? "button" : void 0,
    className: he(n.root, o, l !== "default" && [n["color".concat(pt(l))], C && n["clickableColor".concat(pt(l))], y && n["deletableColor".concat(pt(l))]], E !== "default" && [n.outlined, {
      primary: n.outlinedPrimary,
      secondary: n.outlinedSecondary
    }[l]], p && n.disabled, M && n.sizeSmall, C && n.clickable, y && n.deletable),
    "aria-disabled": p ? !0 : void 0,
    tabIndex: C || y ? 0 : void 0,
    onClick: m,
    onKeyDown: A,
    onKeyUp: v,
    ref: O
  }, $, L), q || z, /* @__PURE__ */ b.createElement("span", {
    className: he(n.label, M && n.labelSmall)
  }, g), V);
});
const Ng = tt(Ag, {
  name: "MuiChip"
})(Mg);
var vr = 44, Lg = function(e) {
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
}, Dg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.color, i = o === void 0 ? "primary" : o, s = e.disableShrink, l = s === void 0 ? !1 : s, u = e.size, c = u === void 0 ? 40 : u, d = e.style, p = e.thickness, h = p === void 0 ? 3.6 : p, g = e.value, m = g === void 0 ? 0 : g, y = e.variant, w = y === void 0 ? "indeterminate" : y, k = Ne(e, ["classes", "className", "color", "disableShrink", "size", "style", "thickness", "value", "variant"]), I = {}, f = {}, x = {};
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
const Xn = tt(Lg, {
  name: "MuiCircularProgress",
  flip: !1
})(Dg);
function Bg(t) {
  return t = typeof t == "function" ? t() : t, Xt.findDOMNode(t);
}
var Zo = typeof window < "u" ? b.useLayoutEffect : b.useEffect, uu = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.container, o = e.disablePortal, i = o === void 0 ? !1 : o, s = e.onRendered, l = b.useState(null), u = l[0], c = l[1], d = St(/* @__PURE__ */ b.isValidElement(r) ? r.ref : null, a);
  return Zo(function() {
    i || c(Bg(n) || document.body);
  }, [n, i]), Zo(function() {
    if (u && !i)
      return Hr(a, u), function() {
        Hr(a, null);
      };
  }, [a, u, i]), Zo(function() {
    s && (u || i) && s();
  }, [s, u, i]), i ? /* @__PURE__ */ b.isValidElement(r) ? /* @__PURE__ */ b.cloneElement(r, {
    ref: d
  }) : r : u && /* @__PURE__ */ Xt.createPortal(r, u);
});
function du() {
  var t = document.createElement("div");
  t.style.width = "99px", t.style.height = "99px", t.style.position = "absolute", t.style.top = "-9999px", t.style.overflow = "scroll", document.body.appendChild(t);
  var e = t.offsetWidth - t.clientWidth;
  return document.body.removeChild(t), e;
}
function Fg(t) {
  var e = cr(t);
  return e.body === t ? ns(e).innerWidth > e.documentElement.clientWidth : t.scrollHeight > t.clientHeight;
}
function Kn(t, e) {
  e ? t.setAttribute("aria-hidden", "true") : t.removeAttribute("aria-hidden");
}
function yl(t) {
  return parseInt(window.getComputedStyle(t)["padding-right"], 10) || 0;
}
function xl(t, e, a) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [], n = arguments.length > 4 ? arguments[4] : void 0, o = [e, a].concat(Ja(r)), i = ["TEMPLATE", "SCRIPT", "STYLE"];
  [].forEach.call(t.children, function(s) {
    s.nodeType === 1 && o.indexOf(s) === -1 && i.indexOf(s.tagName) === -1 && Kn(s, n);
  });
}
function Qo(t, e) {
  var a = -1;
  return t.some(function(r, n) {
    return e(r) ? (a = n, !0) : !1;
  }), a;
}
function zg(t, e) {
  var a = [], r = [], n = t.container, o;
  if (!e.disableScrollLock) {
    if (Fg(n)) {
      var i = du();
      a.push({
        value: n.style.paddingRight,
        key: "padding-right",
        el: n
      }), n.style["padding-right"] = "".concat(yl(n) + i, "px"), o = cr(n).querySelectorAll(".mui-fixed"), [].forEach.call(o, function(c) {
        r.push(c.style.paddingRight), c.style.paddingRight = "".concat(yl(c) + i, "px");
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
function Wg(t) {
  var e = [];
  return [].forEach.call(t.children, function(a) {
    a.getAttribute && a.getAttribute("aria-hidden") === "true" && e.push(a);
  }), e;
}
var Vg = /* @__PURE__ */ (function() {
  function t() {
    jm(this, t), this.modals = [], this.containers = [];
  }
  return Yi(t, [{
    key: "add",
    value: function(a, r) {
      var n = this.modals.indexOf(a);
      if (n !== -1)
        return n;
      n = this.modals.length, this.modals.push(a), a.modalRef && Kn(a.modalRef, !1);
      var o = Wg(r);
      xl(r, a.mountNode, a.modalRef, o, !0);
      var i = Qo(this.containers, function(s) {
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
      var n = Qo(this.containers, function(i) {
        return i.modals.indexOf(a) !== -1;
      }), o = this.containers[n];
      o.restore || (o.restore = zg(o, r));
    }
  }, {
    key: "remove",
    value: function(a) {
      var r = this.modals.indexOf(a);
      if (r === -1)
        return r;
      var n = Qo(this.containers, function(s) {
        return s.modals.indexOf(a) !== -1;
      }), o = this.containers[n];
      if (o.modals.splice(o.modals.indexOf(a), 1), this.modals.splice(r, 1), o.modals.length === 0)
        o.restore && o.restore(), a.modalRef && Kn(a.modalRef, !0), xl(o.container, a.mountNode, a.modalRef, o.hiddenSiblingNodes, !1), this.containers.splice(n, 1);
      else {
        var i = o.modals[o.modals.length - 1];
        i.modalRef && Kn(i.modalRef, !1);
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
function Hg(t) {
  var e = t.children, a = t.disableAutoFocus, r = a === void 0 ? !1 : a, n = t.disableEnforceFocus, o = n === void 0 ? !1 : n, i = t.disableRestoreFocus, s = i === void 0 ? !1 : i, l = t.getDoc, u = t.isEnabled, c = t.open, d = b.useRef(), p = b.useRef(null), h = b.useRef(null), g = b.useRef(), m = b.useRef(null), y = b.useCallback(function(I) {
    m.current = Xt.findDOMNode(I);
  }, []), w = St(e.ref, y), k = b.useRef();
  return b.useEffect(function() {
    k.current = c;
  }, [c]), !k.current && c && typeof window < "u" && (g.current = l().activeElement), b.useEffect(function() {
    if (c) {
      var I = cr(m.current);
      !r && m.current && !m.current.contains(I.activeElement) && (m.current.hasAttribute("tabIndex") || m.current.setAttribute("tabIndex", -1), m.current.focus());
      var f = function() {
        var W = m.current;
        if (W !== null) {
          if (!I.hasFocus() || o || !u() || d.current) {
            d.current = !1;
            return;
          }
          m.current && !m.current.contains(I.activeElement) && m.current.focus();
        }
      }, x = function(W) {
        o || !u() || W.keyCode !== 9 || I.activeElement === m.current && (d.current = !0, W.shiftKey ? h.current.focus() : p.current.focus());
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
var Cl = {
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
}, Kg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.invisible, n = r === void 0 ? !1 : r, o = e.open, i = Ne(e, ["invisible", "open"]);
  return o ? /* @__PURE__ */ b.createElement("div", Y({
    "aria-hidden": !0,
    ref: a
  }, i, {
    style: Y({}, Cl.root, n ? Cl.invisible : {}, i.style)
  })) : null;
});
function Ug(t) {
  return t = typeof t == "function" ? t() : t, Xt.findDOMNode(t);
}
function qg(t) {
  return t.children ? t.children.props.hasOwnProperty("in") : !1;
}
var Gg = new Vg(), Yg = function(e) {
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
}, Xg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = na(), n = zc({
    name: "MuiModal",
    props: Y({}, e),
    theme: r
  }), o = n.BackdropComponent, i = o === void 0 ? Kg : o, s = n.BackdropProps, l = n.children, u = n.closeAfterTransition, c = u === void 0 ? !1 : u, d = n.container, p = n.disableAutoFocus, h = p === void 0 ? !1 : p, g = n.disableBackdropClick, m = g === void 0 ? !1 : g, y = n.disableEnforceFocus, w = y === void 0 ? !1 : y, k = n.disableEscapeKeyDown, I = k === void 0 ? !1 : k, f = n.disablePortal, x = f === void 0 ? !1 : f, E = n.disableRestoreFocus, L = E === void 0 ? !1 : E, W = n.disableScrollLock, O = W === void 0 ? !1 : W, P = n.hideBackdrop, A = P === void 0 ? !1 : P, v = n.keepMounted, C = v === void 0 ? !1 : v, M = n.manager, D = M === void 0 ? Gg : M, $ = n.onBackdropClick, V = n.onClose, F = n.onEscapeKeyDown, q = n.onRendered, z = n.open, J = Ne(n, ["BackdropComponent", "BackdropProps", "children", "closeAfterTransition", "container", "disableAutoFocus", "disableBackdropClick", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onEscapeKeyDown", "onRendered", "open"]), Z = b.useState(!0), ce = Z[0], ue = Z[1], xe = b.useRef({}), de = b.useRef(null), be = b.useRef(null), ye = St(be, a), we = qg(n), ke = function() {
    return cr(de.current);
  }, ge = function() {
    return xe.current.modalRef = be.current, xe.current.mountNode = de.current, xe.current;
  }, Ee = function() {
    D.mount(ge(), {
      disableScrollLock: O
    }), be.current.scrollTop = 0;
  }, Ae = rr(function() {
    var Ie = Ug(d) || ke().body;
    D.add(ge(), Ie), be.current && Ee();
  }), _e = b.useCallback(function() {
    return D.isTopModal(ge());
  }, [D]), qe = rr(function(Ie) {
    de.current = Ie, Ie && (q && q(), z && _e() ? Ee() : Kn(be.current, !0));
  }), Te = b.useCallback(function() {
    D.remove(ge());
  }, [D]);
  if (b.useEffect(function() {
    return function() {
      Te();
    };
  }, [Te]), b.useEffect(function() {
    z ? Ae() : (!we || !c) && Te();
  }, [z, Te, we, c, Ae]), !C && !z && (!we || ce))
    return null;
  var We = function() {
    ue(!1);
  }, Ke = function() {
    ue(!0), c && Te();
  }, Ge = function(Ve) {
    Ve.target === Ve.currentTarget && ($ && $(Ve), !m && V && V(Ve, "backdropClick"));
  }, fe = function(Ve) {
    Ve.key !== "Escape" || !_e() || (F && F(Ve), I || (Ve.stopPropagation(), V && V(Ve, "escapeKeyDown")));
  }, pe = Yg(r || {
    zIndex: Fc
  }), je = {};
  return l.props.tabIndex === void 0 && (je.tabIndex = l.props.tabIndex || "-1"), we && (je.onEnter = Gn(We, l.props.onEnter), je.onExited = Gn(Ke, l.props.onExited)), /* @__PURE__ */ b.createElement(uu, {
    ref: qe,
    container: d,
    disablePortal: x
  }, /* @__PURE__ */ b.createElement("div", Y({
    ref: ye,
    onKeyDown: fe,
    role: "presentation"
  }, J, {
    style: Y({}, pe.root, !z && ce ? pe.hidden : {}, J.style)
  }), A ? null : /* @__PURE__ */ b.createElement(i, Y({
    open: z,
    onClick: Ge
  }, s)), /* @__PURE__ */ b.createElement(Hg, {
    disableEnforceFocus: w,
    disableAutoFocus: h,
    disableRestoreFocus: L,
    getDoc: ke,
    isEnabled: _e,
    open: z
  }, /* @__PURE__ */ b.cloneElement(l, je))));
}), Jg = function(e) {
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
      backgroundColor: Je(e.palette.divider, 0.08)
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
}, Zg = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.absolute, n = r === void 0 ? !1 : r, o = e.classes, i = e.className, s = e.component, l = s === void 0 ? "hr" : s, u = e.flexItem, c = u === void 0 ? !1 : u, d = e.light, p = d === void 0 ? !1 : d, h = e.orientation, g = h === void 0 ? "horizontal" : h, m = e.role, y = m === void 0 ? l !== "hr" ? "separator" : void 0 : m, w = e.variant, k = w === void 0 ? "fullWidth" : w, I = Ne(e, ["absolute", "classes", "className", "component", "flexItem", "light", "orientation", "role", "variant"]);
  return /* @__PURE__ */ b.createElement(l, Y({
    className: he(o.root, i, k !== "fullWidth" && o[k], n && o.absolute, c && o.flexItem, p && o.light, g === "vertical" && o.vertical),
    role: y,
    ref: a
  }, I));
});
const Qg = tt(Jg, {
  name: "MuiDivider"
})(Zg);
function ro(t) {
  var e = t.props, a = t.states, r = t.muiFormControl;
  return a.reduce(function(n, o) {
    return n[o] = e[o], r && typeof e[o] > "u" && (n[o] = r[o]), n;
  }, {});
}
function ya(t, e) {
  return parseInt(t[e], 10) || 0;
}
var e0 = typeof window < "u" ? b.useLayoutEffect : b.useEffect, t0 = {
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
}, r0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.onChange, n = e.rows, o = e.rowsMax, i = e.rowsMin, s = e.maxRows, l = e.minRows, u = l === void 0 ? 1 : l, c = e.style, d = e.value, p = Ne(e, ["onChange", "rows", "rowsMax", "rowsMin", "maxRows", "minRows", "style", "value"]), h = s || o, g = n || i || u, m = b.useRef(d != null), y = m.current, w = b.useRef(null), k = St(a, w), I = b.useRef(null), f = b.useRef(0), x = b.useState({}), E = x[0], L = x[1], W = b.useCallback(function() {
    var P = w.current, A = window.getComputedStyle(P), v = I.current;
    v.style.width = A.width, v.value = P.value || e.placeholder || "x", v.value.slice(-1) === `
` && (v.value += " ");
    var C = A["box-sizing"], M = ya(A, "padding-bottom") + ya(A, "padding-top"), D = ya(A, "border-bottom-width") + ya(A, "border-top-width"), $ = v.scrollHeight - M;
    v.value = "x";
    var V = v.scrollHeight - M, F = $;
    g && (F = Math.max(Number(g) * V, F)), h && (F = Math.min(Number(h) * V, F)), F = Math.max(F, V);
    var q = F + (C === "border-box" ? M + D : 0), z = Math.abs(F - $) <= 1;
    L(function(J) {
      return f.current < 20 && (q > 0 && Math.abs((J.outerHeightStyle || 0) - q) > 1 || J.overflow !== z) ? (f.current += 1, {
        overflow: z,
        outerHeightStyle: q
      }) : J;
    });
  }, [h, g, e.placeholder]);
  b.useEffect(function() {
    var P = Yn(function() {
      f.current = 0, W();
    });
    return window.addEventListener("resize", P), function() {
      P.clear(), window.removeEventListener("resize", P);
    };
  }, [W]), e0(function() {
    W();
  }), b.useEffect(function() {
    f.current = 0;
  }, [d]);
  var O = function(A) {
    f.current = 0, y || W(), r && r(A);
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
    style: Y({}, t0.shadow, c)
  }));
});
function Sl(t) {
  return t != null && !(Array.isArray(t) && t.length === 0);
}
function cs(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  return t && (Sl(t.value) && t.value !== "" || e && Sl(t.defaultValue) && t.defaultValue !== "");
}
function n0(t) {
  return t.startAdornment;
}
var a0 = function(e) {
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
}, o0 = typeof window > "u" ? b.useEffect : b.useLayoutEffect, i0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e["aria-describedby"], n = e.autoComplete, o = e.autoFocus, i = e.classes, s = e.className;
  e.color;
  var l = e.defaultValue, u = e.disabled, c = e.endAdornment;
  e.error;
  var d = e.fullWidth, p = d === void 0 ? !1 : d, h = e.id, g = e.inputComponent, m = g === void 0 ? "input" : g, y = e.inputProps, w = y === void 0 ? {} : y, k = e.inputRef;
  e.margin;
  var I = e.multiline, f = I === void 0 ? !1 : I, x = e.name, E = e.onBlur, L = e.onChange, W = e.onClick, O = e.onFocus, P = e.onKeyDown, A = e.onKeyUp, v = e.placeholder, C = e.readOnly, M = e.renderSuffix, D = e.rows, $ = e.rowsMax, V = e.rowsMin, F = e.maxRows, q = e.minRows, z = e.startAdornment, J = e.type, Z = J === void 0 ? "text" : J, ce = e.value, ue = Ne(e, ["aria-describedby", "autoComplete", "autoFocus", "classes", "className", "color", "defaultValue", "disabled", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "rowsMax", "rowsMin", "maxRows", "minRows", "startAdornment", "type", "value"]), xe = w.value != null ? w.value : ce, de = b.useRef(xe != null), be = de.current, ye = b.useRef(), we = b.useCallback(function(te) {
  }, []), ke = St(w.ref, we), ge = St(k, ke), Ee = St(ye, ge), Ae = b.useState(!1), _e = Ae[0], qe = Ae[1], Te = cu(), We = ro({
    props: e,
    muiFormControl: Te,
    states: ["color", "disabled", "error", "hiddenLabel", "margin", "required", "filled"]
  });
  We.focused = Te ? Te.focused : _e, b.useEffect(function() {
    !Te && u && _e && (qe(!1), E && E());
  }, [Te, u, _e, E]);
  var Ke = Te && Te.onFilled, Ge = Te && Te.onEmpty, fe = b.useCallback(function(te) {
    cs(te) ? Ke && Ke() : Ge && Ge();
  }, [Ke, Ge]);
  o0(function() {
    be && fe({
      value: xe
    });
  }, [xe, fe, be]);
  var pe = function(oe) {
    if (We.disabled) {
      oe.stopPropagation();
      return;
    }
    O && O(oe), w.onFocus && w.onFocus(oe), Te && Te.onFocus ? Te.onFocus(oe) : qe(!0);
  }, je = function(oe) {
    E && E(oe), w.onBlur && w.onBlur(oe), Te && Te.onBlur ? Te.onBlur(oe) : qe(!1);
  }, Ie = function(oe) {
    if (!be) {
      var Ce = oe.target || ye.current;
      if (Ce == null)
        throw new Error(bn(1));
      fe({
        value: Ce.value
      });
    }
    for (var Le = arguments.length, Se = new Array(Le > 1 ? Le - 1 : 0), me = 1; me < Le; me++)
      Se[me - 1] = arguments[me];
    w.onChange && w.onChange.apply(w, [oe].concat(Se)), L && L.apply(void 0, [oe].concat(Se));
  };
  b.useEffect(function() {
    fe(ye.current);
  }, []);
  var Ve = function(oe) {
    ye.current && oe.currentTarget === oe.target && ye.current.focus(), W && W(oe);
  }, ee = m, K = Y({}, w, {
    ref: Ee
  });
  typeof ee != "string" ? K = Y({
    // Rename ref to inputRef as we don't know the
    // provided `inputComponent` structure.
    inputRef: Ee,
    type: Z
  }, K, {
    ref: null
  }) : f ? D && !F && !q && !$ && !V ? ee = "textarea" : (K = Y({
    minRows: D || q,
    rowsMax: $,
    maxRows: F
  }, K), ee = r0) : K = Y({
    type: Z
  }, K);
  var U = function(oe) {
    fe(oe.animationName === "mui-auto-fill-cancel" ? ye.current : {
      value: "x"
    });
  };
  return b.useEffect(function() {
    Te && Te.setAdornedStart(!!z);
  }, [Te, z]), /* @__PURE__ */ b.createElement("div", Y({
    className: he(i.root, i["color".concat(pt(We.color || "primary"))], s, We.disabled && i.disabled, We.error && i.error, p && i.fullWidth, We.focused && i.focused, Te && i.formControl, f && i.multiline, z && i.adornedStart, c && i.adornedEnd, We.margin === "dense" && i.marginDense),
    onClick: Ve,
    ref: a
  }, ue), z, /* @__PURE__ */ b.createElement(aa.Provider, {
    value: null
  }, /* @__PURE__ */ b.createElement(ee, Y({
    "aria-invalid": We.error,
    "aria-describedby": r,
    autoComplete: n,
    autoFocus: o,
    defaultValue: l,
    disabled: We.disabled,
    id: h,
    onAnimationStart: U,
    name: x,
    placeholder: v,
    readOnly: C,
    required: We.required,
    rows: D,
    value: xe,
    onKeyDown: P,
    onKeyUp: A
  }, K, {
    className: he(i.input, w.className, We.disabled && i.disabled, f && i.inputMultiline, We.hiddenLabel && i.inputHiddenLabel, z && i.inputAdornedStart, c && i.inputAdornedEnd, Z === "search" && i.inputTypeSearch, We.margin === "dense" && i.inputMarginDense),
    onBlur: je,
    onChange: Ie,
    onFocus: pe
  }))), c, M ? M(Y({}, We, {
    startAdornment: z
  })) : null);
});
const no = tt(a0, {
  name: "MuiInputBase"
})(i0);
var s0 = function(e) {
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
}, fu = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.disableUnderline, n = e.classes, o = e.fullWidth, i = o === void 0 ? !1 : o, s = e.inputComponent, l = s === void 0 ? "input" : s, u = e.multiline, c = u === void 0 ? !1 : u, d = e.type, p = d === void 0 ? "text" : d, h = Ne(e, ["disableUnderline", "classes", "fullWidth", "inputComponent", "multiline", "type"]);
  return /* @__PURE__ */ b.createElement(no, Y({
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
fu.muiName = "Input";
const l0 = tt(s0, {
  name: "MuiFilledInput"
})(fu);
var c0 = {
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
}, u0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.color, s = i === void 0 ? "primary" : i, l = e.component, u = l === void 0 ? "div" : l, c = e.disabled, d = c === void 0 ? !1 : c, p = e.error, h = p === void 0 ? !1 : p, g = e.fullWidth, m = g === void 0 ? !1 : g, y = e.focused, w = e.hiddenLabel, k = w === void 0 ? !1 : w, I = e.margin, f = I === void 0 ? "none" : I, x = e.required, E = x === void 0 ? !1 : x, L = e.size, W = e.variant, O = W === void 0 ? "standard" : W, P = Ne(e, ["children", "classes", "className", "color", "component", "disabled", "error", "fullWidth", "focused", "hiddenLabel", "margin", "required", "size", "variant"]), A = b.useState(function() {
    var xe = !1;
    return r && b.Children.forEach(r, function(de) {
      if (Ra(de, ["Input", "Select"])) {
        var be = Ra(de, ["Select"]) ? de.props.input : de;
        be && n0(be.props) && (xe = !0);
      }
    }), xe;
  }), v = A[0], C = A[1], M = b.useState(function() {
    var xe = !1;
    return r && b.Children.forEach(r, function(de) {
      Ra(de, ["Input", "Select"]) && cs(de.props, !0) && (xe = !0);
    }), xe;
  }), D = M[0], $ = M[1], V = b.useState(!1), F = V[0], q = V[1], z = y !== void 0 ? y : F;
  d && z && q(!1);
  var J, Z = b.useCallback(function() {
    $(!0);
  }, []), ce = b.useCallback(function() {
    $(!1);
  }, []), ue = {
    adornedStart: v,
    setAdornedStart: C,
    color: s,
    disabled: d,
    error: h,
    filled: D,
    focused: z,
    fullWidth: m,
    hiddenLabel: k,
    margin: (L === "small" ? "dense" : void 0) || f,
    onBlur: function() {
      q(!1);
    },
    onEmpty: ce,
    onFilled: Z,
    onFocus: function() {
      q(!0);
    },
    registerEffect: J,
    required: E,
    variant: O
  };
  return /* @__PURE__ */ b.createElement(aa.Provider, {
    value: ue
  }, /* @__PURE__ */ b.createElement(u, Y({
    className: he(n.root, o, f !== "none" && n["margin".concat(pt(f))], m && n.fullWidth),
    ref: a
  }, P), r));
});
const wl = tt(c0, {
  name: "MuiFormControl"
})(u0);
var d0 = function(e) {
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
}, f0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.component, s = i === void 0 ? "p" : i;
  e.disabled, e.error, e.filled, e.focused, e.margin, e.required, e.variant;
  var l = Ne(e, ["children", "classes", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"]), u = ls(), c = ro({
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
const El = tt(d0, {
  name: "MuiFormHelperText"
})(f0);
var p0 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], h0 = ["auto", !0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function m0(t, e, a) {
  var r = {};
  h0.forEach(function(n) {
    var o = "grid-".concat(a, "-").concat(n);
    if (n === !0) {
      r[o] = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: "100%"
      };
      return;
    }
    if (n === "auto") {
      r[o] = {
        flexBasis: "auto",
        flexGrow: 0,
        maxWidth: "none"
      };
      return;
    }
    var i = "".concat(Math.round(n / 12 * 1e8) / 1e6, "%");
    r[o] = {
      flexBasis: i,
      flexGrow: 0,
      maxWidth: i
    };
  }), a === "xs" ? Y(t, r) : t[e.breakpoints.up(a)] = r;
}
function ei(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, a = parseFloat(t);
  return "".concat(a / e).concat(String(t).replace(String(a), "") || "px");
}
function g0(t, e) {
  var a = {};
  return p0.forEach(function(r) {
    var n = t.spacing(r);
    n !== 0 && (a["spacing-".concat(e, "-").concat(r)] = {
      margin: "-".concat(ei(n, 2)),
      width: "calc(100% + ".concat(ei(n), ")"),
      "& > $item": {
        padding: ei(n, 2)
      }
    });
  }), a;
}
var v0 = function(e) {
  return Y({
    /* Styles applied to the root element. */
    root: {},
    /* Styles applied to the root element if `container={true}`. */
    container: {
      boxSizing: "border-box",
      display: "flex",
      flexWrap: "wrap",
      width: "100%"
    },
    /* Styles applied to the root element if `item={true}`. */
    item: {
      boxSizing: "border-box",
      margin: "0"
      // For instance, it's useful when used with a `figure` element.
    },
    /* Styles applied to the root element if `zeroMinWidth={true}`. */
    zeroMinWidth: {
      minWidth: 0
    },
    /* Styles applied to the root element if `direction="column"`. */
    "direction-xs-column": {
      flexDirection: "column"
    },
    /* Styles applied to the root element if `direction="column-reverse"`. */
    "direction-xs-column-reverse": {
      flexDirection: "column-reverse"
    },
    /* Styles applied to the root element if `direction="row-reverse"`. */
    "direction-xs-row-reverse": {
      flexDirection: "row-reverse"
    },
    /* Styles applied to the root element if `wrap="nowrap"`. */
    "wrap-xs-nowrap": {
      flexWrap: "nowrap"
    },
    /* Styles applied to the root element if `wrap="reverse"`. */
    "wrap-xs-wrap-reverse": {
      flexWrap: "wrap-reverse"
    },
    /* Styles applied to the root element if `alignItems="center"`. */
    "align-items-xs-center": {
      alignItems: "center"
    },
    /* Styles applied to the root element if `alignItems="flex-start"`. */
    "align-items-xs-flex-start": {
      alignItems: "flex-start"
    },
    /* Styles applied to the root element if `alignItems="flex-end"`. */
    "align-items-xs-flex-end": {
      alignItems: "flex-end"
    },
    /* Styles applied to the root element if `alignItems="baseline"`. */
    "align-items-xs-baseline": {
      alignItems: "baseline"
    },
    /* Styles applied to the root element if `alignContent="center"`. */
    "align-content-xs-center": {
      alignContent: "center"
    },
    /* Styles applied to the root element if `alignContent="flex-start"`. */
    "align-content-xs-flex-start": {
      alignContent: "flex-start"
    },
    /* Styles applied to the root element if `alignContent="flex-end"`. */
    "align-content-xs-flex-end": {
      alignContent: "flex-end"
    },
    /* Styles applied to the root element if `alignContent="space-between"`. */
    "align-content-xs-space-between": {
      alignContent: "space-between"
    },
    /* Styles applied to the root element if `alignContent="space-around"`. */
    "align-content-xs-space-around": {
      alignContent: "space-around"
    },
    /* Styles applied to the root element if `justifyContent="center"`. */
    "justify-content-xs-center": {
      justifyContent: "center"
    },
    /* Styles applied to the root element if `justifyContent="flex-end"`. */
    "justify-content-xs-flex-end": {
      justifyContent: "flex-end"
    },
    /* Styles applied to the root element if `justifyContent="space-between"`. */
    "justify-content-xs-space-between": {
      justifyContent: "space-between"
    },
    /* Styles applied to the root element if `justifyContent="space-around"`. */
    "justify-content-xs-space-around": {
      justifyContent: "space-around"
    },
    /* Styles applied to the root element if `justifyContent="space-evenly"`. */
    "justify-content-xs-space-evenly": {
      justifyContent: "space-evenly"
    }
  }, g0(e, "xs"), e.breakpoints.keys.reduce(function(a, r) {
    return m0(a, e, r), a;
  }, {}));
}, b0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.alignContent, n = r === void 0 ? "stretch" : r, o = e.alignItems, i = o === void 0 ? "stretch" : o, s = e.classes, l = e.className, u = e.component, c = u === void 0 ? "div" : u, d = e.container, p = d === void 0 ? !1 : d, h = e.direction, g = h === void 0 ? "row" : h, m = e.item, y = m === void 0 ? !1 : m, w = e.justify, k = e.justifyContent, I = k === void 0 ? "flex-start" : k, f = e.lg, x = f === void 0 ? !1 : f, E = e.md, L = E === void 0 ? !1 : E, W = e.sm, O = W === void 0 ? !1 : W, P = e.spacing, A = P === void 0 ? 0 : P, v = e.wrap, C = v === void 0 ? "wrap" : v, M = e.xl, D = M === void 0 ? !1 : M, $ = e.xs, V = $ === void 0 ? !1 : $, F = e.zeroMinWidth, q = F === void 0 ? !1 : F, z = Ne(e, ["alignContent", "alignItems", "classes", "className", "component", "container", "direction", "item", "justify", "justifyContent", "lg", "md", "sm", "spacing", "wrap", "xl", "xs", "zeroMinWidth"]), J = he(s.root, l, p && [s.container, A !== 0 && s["spacing-xs-".concat(String(A))]], y && s.item, q && s.zeroMinWidth, g !== "row" && s["direction-xs-".concat(String(g))], C !== "wrap" && s["wrap-xs-".concat(String(C))], i !== "stretch" && s["align-items-xs-".concat(String(i))], n !== "stretch" && s["align-content-xs-".concat(String(n))], (w || I) !== "flex-start" && s["justify-content-xs-".concat(String(w || I))], V !== !1 && s["grid-xs-".concat(String(V))], O !== !1 && s["grid-sm-".concat(String(O))], L !== !1 && s["grid-md-".concat(String(L))], x !== !1 && s["grid-lg-".concat(String(x))], D !== !1 && s["grid-xl-".concat(String(D))]);
  return /* @__PURE__ */ b.createElement(c, Y({
    className: J,
    ref: a
  }, z));
}), y0 = tt(v0, {
  name: "MuiGrid"
})(b0);
function ji(t) {
  return "scale(".concat(t, ", ").concat(Math.pow(t, 2), ")");
}
var x0 = {
  entering: {
    opacity: 1,
    transform: ji(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, us = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.disableStrictModeCompat, o = n === void 0 ? !1 : n, i = e.in, s = e.onEnter, l = e.onEntered, u = e.onEntering, c = e.onExit, d = e.onExited, p = e.onExiting, h = e.style, g = e.timeout, m = g === void 0 ? "auto" : g, y = e.TransitionComponent, w = y === void 0 ? or : y, k = Ne(e, ["children", "disableStrictModeCompat", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"]), I = b.useRef(), f = b.useRef(), x = Rn(), E = x.unstable_strictMode && !o, L = b.useRef(null), W = St(r.ref, a), O = St(E ? L : void 0, W), P = function(q) {
    return function(z, J) {
      if (q) {
        var Z = E ? [L.current, z] : [z, J], ce = kn(Z, 2), ue = ce[0], xe = ce[1];
        xe === void 0 ? q(ue) : q(ue, xe);
      }
    };
  }, A = P(u), v = P(function(F, q) {
    ng(F);
    var z = Va({
      style: h,
      timeout: m
    }, {
      mode: "enter"
    }), J = z.duration, Z = z.delay, ce;
    m === "auto" ? (ce = x.transitions.getAutoHeightDuration(F.clientHeight), f.current = ce) : ce = J, F.style.transition = [x.transitions.create("opacity", {
      duration: ce,
      delay: Z
    }), x.transitions.create("transform", {
      duration: ce * 0.666,
      delay: Z
    })].join(","), s && s(F, q);
  }), C = P(l), M = P(p), D = P(function(F) {
    var q = Va({
      style: h,
      timeout: m
    }, {
      mode: "exit"
    }), z = q.duration, J = q.delay, Z;
    m === "auto" ? (Z = x.transitions.getAutoHeightDuration(F.clientHeight), f.current = Z) : Z = z, F.style.transition = [x.transitions.create("opacity", {
      duration: Z,
      delay: J
    }), x.transitions.create("transform", {
      duration: Z * 0.666,
      delay: J || Z * 0.333
    })].join(","), F.style.opacity = "0", F.style.transform = ji(0.75), c && c(F);
  }), $ = P(d), V = function(q, z) {
    var J = E ? q : z;
    m === "auto" && (I.current = setTimeout(J, f.current || 0));
  };
  return b.useEffect(function() {
    return function() {
      clearTimeout(I.current);
    };
  }, []), /* @__PURE__ */ b.createElement(w, Y({
    appear: !0,
    in: i,
    nodeRef: E ? L : void 0,
    onEnter: v,
    onEntered: C,
    onEntering: A,
    onExit: D,
    onExited: $,
    onExiting: M,
    addEndListener: V,
    timeout: m === "auto" ? null : m
  }, k), function(F, q) {
    return /* @__PURE__ */ b.cloneElement(r, Y({
      style: Y({
        opacity: 0,
        transform: ji(0.75),
        visibility: F === "exited" && !i ? "hidden" : void 0
      }, x0[F], h, r.props.style),
      ref: O
    }, q));
  });
});
us.muiSupportAuto = !0;
var C0 = function(e) {
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
}, pu = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.disableUnderline, n = e.classes, o = e.fullWidth, i = o === void 0 ? !1 : o, s = e.inputComponent, l = s === void 0 ? "input" : s, u = e.multiline, c = u === void 0 ? !1 : u, d = e.type, p = d === void 0 ? "text" : d, h = Ne(e, ["disableUnderline", "classes", "fullWidth", "inputComponent", "multiline", "type"]);
  return /* @__PURE__ */ b.createElement(no, Y({
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
pu.muiName = "Input";
const hu = tt(C0, {
  name: "MuiInput"
})(pu);
var S0 = {
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
}, w0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.component, s = i === void 0 ? "div" : i, l = e.disablePointerEvents, u = l === void 0 ? !1 : l, c = e.disableTypography, d = c === void 0 ? !1 : c, p = e.position, h = e.variant, g = Ne(e, ["children", "classes", "className", "component", "disablePointerEvents", "disableTypography", "position", "variant"]), m = cu() || {}, y = h;
  return h && m.variant, m && !y && (y = m.variant), /* @__PURE__ */ b.createElement(aa.Provider, {
    value: null
  }, /* @__PURE__ */ b.createElement(s, Y({
    className: he(n.root, o, p === "end" ? n.positionEnd : n.positionStart, u && n.disablePointerEvents, m.hiddenLabel && n.hiddenLabel, y === "filled" && n.filled, m.margin === "dense" && n.marginDense),
    ref: a
  }, g), typeof r == "string" && !d ? /* @__PURE__ */ b.createElement(Mt, {
    color: "textSecondary"
  }, r) : r));
});
const E0 = tt(S0, {
  name: "MuiInputAdornment"
})(w0);
var k0 = {
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
}, $0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.color, i = o === void 0 ? "primary" : o, s = e.component, l = s === void 0 ? "a" : s, u = e.onBlur, c = e.onFocus, d = e.TypographyClasses, p = e.underline, h = p === void 0 ? "hover" : p, g = e.variant, m = g === void 0 ? "inherit" : g, y = Ne(e, ["classes", "className", "color", "component", "onBlur", "onFocus", "TypographyClasses", "underline", "variant"]), w = os(), k = w.isFocusVisible, I = w.onBlurVisible, f = w.ref, x = b.useState(!1), E = x[0], L = x[1], W = St(a, f), O = function(v) {
    E && (I(), L(!1)), u && u(v);
  }, P = function(v) {
    k(v) && L(!0), c && c(v);
  };
  return /* @__PURE__ */ b.createElement(Mt, Y({
    className: he(r.root, r["underline".concat(pt(h))], n, E && r.focusVisible, l === "button" && r.button),
    classes: d,
    color: i,
    component: l,
    onBlur: O,
    onFocus: P,
    ref: W,
    variant: m
  }, y));
});
const R0 = tt(k0, {
  name: "MuiLink"
})($0);
var Ta = b.createContext({}), T0 = {
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
}, O0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.className, i = e.component, s = i === void 0 ? "ul" : i, l = e.dense, u = l === void 0 ? !1 : l, c = e.disablePadding, d = c === void 0 ? !1 : c, p = e.subheader, h = Ne(e, ["children", "classes", "className", "component", "dense", "disablePadding", "subheader"]), g = b.useMemo(function() {
    return {
      dense: u
    };
  }, [u]);
  return /* @__PURE__ */ b.createElement(Ta.Provider, {
    value: g
  }, /* @__PURE__ */ b.createElement(s, Y({
    className: he(n.root, o, u && n.dense, !d && n.padding, p && n.subheader),
    ref: a
  }, h), p, r));
});
const _0 = tt(T0, {
  name: "MuiList"
})(O0);
var P0 = function(e) {
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
}, j0 = typeof window > "u" ? b.useEffect : b.useLayoutEffect, I0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.alignItems, n = r === void 0 ? "center" : r, o = e.autoFocus, i = o === void 0 ? !1 : o, s = e.button, l = s === void 0 ? !1 : s, u = e.children, c = e.classes, d = e.className, p = e.component, h = e.ContainerComponent, g = h === void 0 ? "li" : h, m = e.ContainerProps;
  m = m === void 0 ? {} : m;
  var y = m.className, w = Ne(m, ["className"]), k = e.dense, I = k === void 0 ? !1 : k, f = e.disabled, x = f === void 0 ? !1 : f, E = e.disableGutters, L = E === void 0 ? !1 : E, W = e.divider, O = W === void 0 ? !1 : W, P = e.focusVisibleClassName, A = e.selected, v = A === void 0 ? !1 : A, C = Ne(e, ["alignItems", "autoFocus", "button", "children", "classes", "className", "component", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "divider", "focusVisibleClassName", "selected"]), M = b.useContext(Ta), D = {
    dense: I || M.dense || !1,
    alignItems: n
  }, $ = b.useRef(null);
  j0(function() {
    i && $.current && $.current.focus();
  }, [i]);
  var V = b.Children.toArray(u), F = V.length && Ra(V[V.length - 1], ["ListItemSecondaryAction"]), q = b.useCallback(function(ce) {
    $.current = Xt.findDOMNode(ce);
  }, []), z = St(q, a), J = Y({
    className: he(c.root, d, D.dense && c.dense, !L && c.gutters, O && c.divider, x && c.disabled, l && c.button, n !== "center" && c.alignItemsFlexStart, F && c.secondaryAction, v && c.selected),
    disabled: x
  }, C), Z = p || "li";
  return l && (J.component = p || "div", J.focusVisibleClassName = he(c.focusVisible, P), Z = $r), F ? (Z = !J.component && !p ? "div" : Z, g === "li" && (Z === "li" ? Z = "div" : J.component === "li" && (J.component = "div")), /* @__PURE__ */ b.createElement(Ta.Provider, {
    value: D
  }, /* @__PURE__ */ b.createElement(g, Y({
    className: he(c.container, y),
    ref: z
  }, w), /* @__PURE__ */ b.createElement(Z, J, V), V.pop()))) : /* @__PURE__ */ b.createElement(Ta.Provider, {
    value: D
  }, /* @__PURE__ */ b.createElement(Z, Y({
    ref: z
  }, J), V));
});
const A0 = tt(P0, {
  name: "MuiListItem"
})(I0);
function kl(t, e) {
  var a = 0;
  return typeof e == "number" ? a = e : e === "center" ? a = t.height / 2 : e === "bottom" && (a = t.height), a;
}
function $l(t, e) {
  var a = 0;
  return typeof e == "number" ? a = e : e === "center" ? a = t.width / 2 : e === "right" && (a = t.width), a;
}
function Rl(t) {
  return [t.horizontal, t.vertical].map(function(e) {
    return typeof e == "number" ? "".concat(e, "px") : e;
  }).join(" ");
}
function M0(t, e) {
  for (var a = e, r = 0; a && a !== t; )
    a = a.parentElement, r += a.scrollTop;
  return r;
}
function ti(t) {
  return typeof t == "function" ? t() : t;
}
var N0 = {
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
}, L0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.action, n = e.anchorEl, o = e.anchorOrigin, i = o === void 0 ? {
    vertical: "top",
    horizontal: "left"
  } : o, s = e.anchorPosition, l = e.anchorReference, u = l === void 0 ? "anchorEl" : l, c = e.children, d = e.classes, p = e.className, h = e.container, g = e.elevation, m = g === void 0 ? 8 : g, y = e.getContentAnchorEl, w = e.marginThreshold, k = w === void 0 ? 16 : w, I = e.onEnter, f = e.onEntered, x = e.onEntering, E = e.onExit, L = e.onExited, W = e.onExiting, O = e.open, P = e.PaperProps, A = P === void 0 ? {} : P, v = e.transformOrigin, C = v === void 0 ? {
    vertical: "top",
    horizontal: "left"
  } : v, M = e.TransitionComponent, D = M === void 0 ? us : M, $ = e.transitionDuration, V = $ === void 0 ? "auto" : $, F = e.TransitionProps, q = F === void 0 ? {} : F, z = Ne(e, ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "classes", "className", "container", "elevation", "getContentAnchorEl", "marginThreshold", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "open", "PaperProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps"]), J = b.useRef(), Z = b.useCallback(function(ge) {
    if (u === "anchorPosition")
      return s;
    var Ee = ti(n), Ae = Ee && Ee.nodeType === 1 ? Ee : cr(J.current).body, _e = Ae.getBoundingClientRect(), qe = ge === 0 ? i.vertical : "center";
    return {
      top: _e.top + kl(_e, qe),
      left: _e.left + $l(_e, i.horizontal)
    };
  }, [n, i.horizontal, i.vertical, s, u]), ce = b.useCallback(function(ge) {
    var Ee = 0;
    if (y && u === "anchorEl") {
      var Ae = y(ge);
      if (Ae && ge.contains(Ae)) {
        var _e = M0(ge, Ae);
        Ee = Ae.offsetTop + Ae.clientHeight / 2 - _e || 0;
      }
    }
    return Ee;
  }, [i.vertical, u, y]), ue = b.useCallback(function(ge) {
    var Ee = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return {
      vertical: kl(ge, C.vertical) + Ee,
      horizontal: $l(ge, C.horizontal)
    };
  }, [C.horizontal, C.vertical]), xe = b.useCallback(function(ge) {
    var Ee = ce(ge), Ae = {
      width: ge.offsetWidth,
      height: ge.offsetHeight
    }, _e = ue(Ae, Ee);
    if (u === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Rl(_e)
      };
    var qe = Z(Ee), Te = qe.top - _e.vertical, We = qe.left - _e.horizontal, Ke = Te + Ae.height, Ge = We + Ae.width, fe = ns(ti(n)), pe = fe.innerHeight - k, je = fe.innerWidth - k;
    if (Te < k) {
      var Ie = Te - k;
      Te -= Ie, _e.vertical += Ie;
    } else if (Ke > pe) {
      var Ve = Ke - pe;
      Te -= Ve, _e.vertical += Ve;
    }
    if (We < k) {
      var ee = We - k;
      We -= ee, _e.horizontal += ee;
    } else if (Ge > je) {
      var K = Ge - je;
      We -= K, _e.horizontal += K;
    }
    return {
      top: "".concat(Math.round(Te), "px"),
      left: "".concat(Math.round(We), "px"),
      transformOrigin: Rl(_e)
    };
  }, [n, u, Z, ce, ue, k]), de = b.useCallback(function() {
    var ge = J.current;
    if (ge) {
      var Ee = xe(ge);
      Ee.top !== null && (ge.style.top = Ee.top), Ee.left !== null && (ge.style.left = Ee.left), ge.style.transformOrigin = Ee.transformOrigin;
    }
  }, [xe]), be = function(Ee, Ae) {
    x && x(Ee, Ae), de();
  }, ye = b.useCallback(function(ge) {
    J.current = Xt.findDOMNode(ge);
  }, []);
  b.useEffect(function() {
    O && de();
  }), b.useImperativeHandle(r, function() {
    return O ? {
      updatePosition: function() {
        de();
      }
    } : null;
  }, [O, de]), b.useEffect(function() {
    if (O) {
      var ge = Yn(function() {
        de();
      });
      return window.addEventListener("resize", ge), function() {
        ge.clear(), window.removeEventListener("resize", ge);
      };
    }
  }, [O, de]);
  var we = V;
  V === "auto" && !D.muiSupportAuto && (we = void 0);
  var ke = h || (n ? cr(ti(n)).body : void 0);
  return /* @__PURE__ */ b.createElement(Xg, Y({
    container: ke,
    open: O,
    ref: a,
    BackdropProps: {
      invisible: !0
    },
    className: he(d.root, p)
  }, z), /* @__PURE__ */ b.createElement(D, Y({
    appear: !0,
    in: O,
    onEnter: I,
    onEntered: f,
    onExit: E,
    onExited: L,
    onExiting: W,
    timeout: we
  }, q, {
    onEntering: Gn(be, q.onEntering)
  }), /* @__PURE__ */ b.createElement(iu, Y({
    elevation: m,
    ref: ye
  }, A, {
    className: he(d.paper, A.className)
  }), c)));
});
const D0 = tt(N0, {
  name: "MuiPopover"
})(L0);
function ri(t, e, a) {
  return t === e ? t.firstChild : e && e.nextElementSibling ? e.nextElementSibling : a ? null : t.firstChild;
}
function Tl(t, e, a) {
  return t === e ? a ? t.firstChild : t.lastChild : e && e.previousElementSibling ? e.previousElementSibling : a ? null : t.lastChild;
}
function mu(t, e) {
  if (e === void 0)
    return !0;
  var a = t.innerText;
  return a === void 0 && (a = t.textContent), a = a.trim().toLowerCase(), a.length === 0 ? !1 : e.repeating ? a[0] === e.keys[0] : a.indexOf(e.keys.join("")) === 0;
}
function An(t, e, a, r, n, o) {
  for (var i = !1, s = n(t, e, e ? a : !1); s; ) {
    if (s === t.firstChild) {
      if (i)
        return;
      i = !0;
    }
    var l = r ? !1 : s.disabled || s.getAttribute("aria-disabled") === "true";
    if (!s.hasAttribute("tabindex") || !mu(s, o) || l)
      s = n(t, s, a);
    else {
      s.focus();
      return;
    }
  }
}
var B0 = typeof window > "u" ? b.useEffect : b.useLayoutEffect, F0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.actions, n = e.autoFocus, o = n === void 0 ? !1 : n, i = e.autoFocusItem, s = i === void 0 ? !1 : i, l = e.children, u = e.className, c = e.disabledItemsFocusable, d = c === void 0 ? !1 : c, p = e.disableListWrap, h = p === void 0 ? !1 : p, g = e.onKeyDown, m = e.variant, y = m === void 0 ? "selectedMenu" : m, w = Ne(e, ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"]), k = b.useRef(null), I = b.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  B0(function() {
    o && k.current.focus();
  }, [o]), b.useImperativeHandle(r, function() {
    return {
      adjustStyleForScrollbar: function(P, A) {
        var v = !k.current.style.width;
        if (P.clientHeight < k.current.clientHeight && v) {
          var C = "".concat(du(), "px");
          k.current.style[A.direction === "rtl" ? "paddingLeft" : "paddingRight"] = C, k.current.style.width = "calc(100% + ".concat(C, ")");
        }
        return k.current;
      }
    };
  }, []);
  var f = function(P) {
    var A = k.current, v = P.key, C = cr(A).activeElement;
    if (v === "ArrowDown")
      P.preventDefault(), An(A, C, h, d, ri);
    else if (v === "ArrowUp")
      P.preventDefault(), An(A, C, h, d, Tl);
    else if (v === "Home")
      P.preventDefault(), An(A, null, h, d, ri);
    else if (v === "End")
      P.preventDefault(), An(A, null, h, d, Tl);
    else if (v.length === 1) {
      var M = I.current, D = v.toLowerCase(), $ = performance.now();
      M.keys.length > 0 && ($ - M.lastTime > 500 ? (M.keys = [], M.repeating = !0, M.previousKeyMatched = !0) : M.repeating && D !== M.keys[0] && (M.repeating = !1)), M.lastTime = $, M.keys.push(D);
      var V = C && !M.repeating && mu(C, M);
      M.previousKeyMatched && (V || An(A, C, !1, d, ri, M)) ? P.preventDefault() : M.previousKeyMatched = !1;
    }
    g && g(P);
  }, x = b.useCallback(function(O) {
    k.current = Xt.findDOMNode(O);
  }, []), E = St(x, a), L = -1;
  b.Children.forEach(l, function(O, P) {
    /* @__PURE__ */ b.isValidElement(O) && (O.props.disabled || (y === "selectedMenu" && O.props.selected || L === -1) && (L = P));
  });
  var W = b.Children.map(l, function(O, P) {
    if (P === L) {
      var A = {};
      return s && (A.autoFocus = !0), O.props.tabIndex === void 0 && y === "selectedMenu" && (A.tabIndex = 0), /* @__PURE__ */ b.cloneElement(O, A);
    }
    return O;
  });
  return /* @__PURE__ */ b.createElement(_0, Y({
    role: "menu",
    ref: E,
    className: u,
    onKeyDown: f,
    tabIndex: o ? 0 : -1
  }, w), W);
}), Ol = {
  vertical: "top",
  horizontal: "right"
}, _l = {
  vertical: "top",
  horizontal: "left"
}, z0 = {
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
}, W0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.autoFocus, n = r === void 0 ? !0 : r, o = e.children, i = e.classes, s = e.disableAutoFocusItem, l = s === void 0 ? !1 : s, u = e.MenuListProps, c = u === void 0 ? {} : u, d = e.onClose, p = e.onEntering, h = e.open, g = e.PaperProps, m = g === void 0 ? {} : g, y = e.PopoverClasses, w = e.transitionDuration, k = w === void 0 ? "auto" : w, I = e.TransitionProps;
  I = I === void 0 ? {} : I;
  var f = I.onEntering, x = Ne(I, ["onEntering"]), E = e.variant, L = E === void 0 ? "selectedMenu" : E, W = Ne(e, ["autoFocus", "children", "classes", "disableAutoFocusItem", "MenuListProps", "onClose", "onEntering", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant"]), O = Rn(), P = n && !l && h, A = b.useRef(null), v = b.useRef(null), C = function() {
    return v.current;
  }, M = function(q, z) {
    A.current && A.current.adjustStyleForScrollbar(q, O), p && p(q, z), f && f(q, z);
  }, D = function(q) {
    q.key === "Tab" && (q.preventDefault(), d && d(q, "tabKeyDown"));
  }, $ = -1;
  b.Children.map(o, function(F, q) {
    /* @__PURE__ */ b.isValidElement(F) && (F.props.disabled || (L !== "menu" && F.props.selected || $ === -1) && ($ = q));
  });
  var V = b.Children.map(o, function(F, q) {
    return q === $ ? /* @__PURE__ */ b.cloneElement(F, {
      ref: function(J) {
        v.current = Xt.findDOMNode(J), Hr(F.ref, J);
      }
    }) : F;
  });
  return /* @__PURE__ */ b.createElement(D0, Y({
    getContentAnchorEl: C,
    classes: y,
    onClose: d,
    TransitionProps: Y({
      onEntering: M
    }, x),
    anchorOrigin: O.direction === "rtl" ? Ol : _l,
    transformOrigin: O.direction === "rtl" ? Ol : _l,
    PaperProps: Y({}, m, {
      classes: Y({}, m.classes, {
        root: i.paper
      })
    }),
    open: h,
    ref: a,
    transitionDuration: k
  }, W), /* @__PURE__ */ b.createElement(F0, Y({
    onKeyDown: D,
    actions: A,
    autoFocus: n && ($ === -1 || l),
    autoFocusItem: P,
    variant: L
  }, c, {
    className: he(i.list, c.className)
  }), V));
});
const V0 = tt(z0, {
  name: "MuiMenu"
})(W0);
var H0 = function(e) {
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
}, K0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.component, i = o === void 0 ? "li" : o, s = e.disableGutters, l = s === void 0 ? !1 : s, u = e.ListItemClasses, c = e.role, d = c === void 0 ? "menuitem" : c, p = e.selected, h = e.tabIndex, g = Ne(e, ["classes", "className", "component", "disableGutters", "ListItemClasses", "role", "selected", "tabIndex"]), m;
  return e.disabled || (m = h !== void 0 ? h : -1), /* @__PURE__ */ b.createElement(A0, Y({
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
const xa = tt(H0, {
  name: "MuiMenuItem"
})(K0);
var gu = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.disabled, i = e.IconComponent, s = e.inputRef, l = e.variant, u = l === void 0 ? "standard" : l, c = Ne(e, ["classes", "className", "disabled", "IconComponent", "inputRef", "variant"]);
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
const vu = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M7 10l5 5 5-5z"
}));
var bu = function(e) {
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
}, U0 = /* @__PURE__ */ b.createElement(hu, null), yu = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.children, n = e.classes, o = e.IconComponent, i = o === void 0 ? vu : o, s = e.input, l = s === void 0 ? U0 : s, u = e.inputProps;
  e.variant;
  var c = Ne(e, ["children", "classes", "IconComponent", "input", "inputProps", "variant"]), d = ls(), p = ro({
    props: e,
    muiFormControl: d,
    states: ["variant"]
  });
  return /* @__PURE__ */ b.cloneElement(l, Y({
    // Most of the logic is implemented in `NativeSelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: gu,
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
yu.muiName = "Select";
tt(bu, {
  name: "MuiNativeSelect"
})(yu);
var q0 = function(e) {
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
}, G0 = /* @__PURE__ */ b.forwardRef(function(e, a) {
  e.children;
  var r = e.classes, n = e.className, o = e.label, i = e.labelWidth, s = e.notched, l = e.style, u = Ne(e, ["children", "classes", "className", "label", "labelWidth", "notched", "style"]), c = Rn(), d = c.direction === "rtl" ? "right" : "left";
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
const Y0 = tt(q0, {
  name: "PrivateNotchedOutline"
})(G0);
var X0 = function(e) {
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
}, xu = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.fullWidth, o = n === void 0 ? !1 : n, i = e.inputComponent, s = i === void 0 ? "input" : i, l = e.label, u = e.labelWidth, c = u === void 0 ? 0 : u, d = e.multiline, p = d === void 0 ? !1 : d, h = e.notched, g = e.type, m = g === void 0 ? "text" : g, y = Ne(e, ["classes", "fullWidth", "inputComponent", "label", "labelWidth", "multiline", "notched", "type"]);
  return /* @__PURE__ */ b.createElement(no, Y({
    renderSuffix: function(k) {
      return /* @__PURE__ */ b.createElement(Y0, {
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
xu.muiName = "Input";
const J0 = tt(X0, {
  name: "MuiOutlinedInput"
})(xu);
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
var oa = typeof window < "u" && typeof document < "u" && typeof navigator < "u", Z0 = (function() {
  for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1)
    if (oa && navigator.userAgent.indexOf(t[e]) >= 0)
      return 1;
  return 0;
})();
function Q0(t) {
  var e = !1;
  return function() {
    e || (e = !0, window.Promise.resolve().then(function() {
      e = !1, t();
    }));
  };
}
function ev(t) {
  var e = !1;
  return function() {
    e || (e = !0, setTimeout(function() {
      e = !1, t();
    }, Z0));
  };
}
var tv = oa && window.Promise, rv = tv ? Q0 : ev;
function Cu(t) {
  var e = {};
  return t && e.toString.call(t) === "[object Function]";
}
function Ur(t, e) {
  if (t.nodeType !== 1)
    return [];
  var a = t.ownerDocument.defaultView, r = a.getComputedStyle(t, null);
  return e ? r[e] : r;
}
function ds(t) {
  return t.nodeName === "HTML" ? t : t.parentNode || t.host;
}
function ia(t) {
  if (!t)
    return document.body;
  switch (t.nodeName) {
    case "HTML":
    case "BODY":
      return t.ownerDocument.body;
    case "#document":
      return t.body;
  }
  var e = Ur(t), a = e.overflow, r = e.overflowX, n = e.overflowY;
  return /(auto|scroll|overlay)/.test(a + n + r) ? t : ia(ds(t));
}
function Su(t) {
  return t && t.referenceNode ? t.referenceNode : t;
}
var Pl = oa && !!(window.MSInputMethodContext && document.documentMode), jl = oa && /MSIE 10/.test(navigator.userAgent);
function Tn(t) {
  return t === 11 ? Pl : t === 10 ? jl : Pl || jl;
}
function yn(t) {
  if (!t)
    return document.documentElement;
  for (var e = Tn(10) ? document.body : null, a = t.offsetParent || null; a === e && t.nextElementSibling; )
    a = (t = t.nextElementSibling).offsetParent;
  var r = a && a.nodeName;
  return !r || r === "BODY" || r === "HTML" ? t ? t.ownerDocument.documentElement : document.documentElement : ["TH", "TD", "TABLE"].indexOf(a.nodeName) !== -1 && Ur(a, "position") === "static" ? yn(a) : a;
}
function nv(t) {
  var e = t.nodeName;
  return e === "BODY" ? !1 : e === "HTML" || yn(t.firstElementChild) === t;
}
function Ii(t) {
  return t.parentNode !== null ? Ii(t.parentNode) : t;
}
function Ha(t, e) {
  if (!t || !t.nodeType || !e || !e.nodeType)
    return document.documentElement;
  var a = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING, r = a ? t : e, n = a ? e : t, o = document.createRange();
  o.setStart(r, 0), o.setEnd(n, 0);
  var i = o.commonAncestorContainer;
  if (t !== i && e !== i || r.contains(n))
    return nv(i) ? i : yn(i);
  var s = Ii(t);
  return s.host ? Ha(s.host, e) : Ha(t, Ii(e).host);
}
function xn(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top", a = e === "top" ? "scrollTop" : "scrollLeft", r = t.nodeName;
  if (r === "BODY" || r === "HTML") {
    var n = t.ownerDocument.documentElement, o = t.ownerDocument.scrollingElement || n;
    return o[a];
  }
  return t[a];
}
function av(t, e) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = xn(e, "top"), n = xn(e, "left"), o = a ? -1 : 1;
  return t.top += r * o, t.bottom += r * o, t.left += n * o, t.right += n * o, t;
}
function Il(t, e) {
  var a = e === "x" ? "Left" : "Top", r = a === "Left" ? "Right" : "Bottom";
  return parseFloat(t["border" + a + "Width"]) + parseFloat(t["border" + r + "Width"]);
}
function Al(t, e, a, r) {
  return Math.max(e["offset" + t], e["scroll" + t], a["client" + t], a["offset" + t], a["scroll" + t], Tn(10) ? parseInt(a["offset" + t]) + parseInt(r["margin" + (t === "Height" ? "Top" : "Left")]) + parseInt(r["margin" + (t === "Height" ? "Bottom" : "Right")]) : 0);
}
function wu(t) {
  var e = t.body, a = t.documentElement, r = Tn(10) && getComputedStyle(a);
  return {
    height: Al("Height", e, a, r),
    width: Al("Width", e, a, r)
  };
}
var ov = function(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}, iv = /* @__PURE__ */ (function() {
  function t(e, a) {
    for (var r = 0; r < a.length; r++) {
      var n = a[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }
  return function(e, a, r) {
    return a && t(e.prototype, a), r && t(e, r), e;
  };
})(), Cn = function(t, e, a) {
  return e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}, Kt = Object.assign || function(t) {
  for (var e = 1; e < arguments.length; e++) {
    var a = arguments[e];
    for (var r in a)
      Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]);
  }
  return t;
};
function Rr(t) {
  return Kt({}, t, {
    right: t.left + t.width,
    bottom: t.top + t.height
  });
}
function Ai(t) {
  var e = {};
  try {
    if (Tn(10)) {
      e = t.getBoundingClientRect();
      var a = xn(t, "top"), r = xn(t, "left");
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
  }, o = t.nodeName === "HTML" ? wu(t.ownerDocument) : {}, i = o.width || t.clientWidth || n.width, s = o.height || t.clientHeight || n.height, l = t.offsetWidth - i, u = t.offsetHeight - s;
  if (l || u) {
    var c = Ur(t);
    l -= Il(c, "x"), u -= Il(c, "y"), n.width -= l, n.height -= u;
  }
  return Rr(n);
}
function fs(t, e) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = Tn(10), n = e.nodeName === "HTML", o = Ai(t), i = Ai(e), s = ia(t), l = Ur(e), u = parseFloat(l.borderTopWidth), c = parseFloat(l.borderLeftWidth);
  a && n && (i.top = Math.max(i.top, 0), i.left = Math.max(i.left, 0));
  var d = Rr({
    top: o.top - i.top - u,
    left: o.left - i.left - c,
    width: o.width,
    height: o.height
  });
  if (d.marginTop = 0, d.marginLeft = 0, !r && n) {
    var p = parseFloat(l.marginTop), h = parseFloat(l.marginLeft);
    d.top -= u - p, d.bottom -= u - p, d.left -= c - h, d.right -= c - h, d.marginTop = p, d.marginLeft = h;
  }
  return (r && !a ? e.contains(s) : e === s && s.nodeName !== "BODY") && (d = av(d, e)), d;
}
function sv(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, a = t.ownerDocument.documentElement, r = fs(t, a), n = Math.max(a.clientWidth, window.innerWidth || 0), o = Math.max(a.clientHeight, window.innerHeight || 0), i = e ? 0 : xn(a), s = e ? 0 : xn(a, "left"), l = {
    top: i - r.top + r.marginTop,
    left: s - r.left + r.marginLeft,
    width: n,
    height: o
  };
  return Rr(l);
}
function Eu(t) {
  var e = t.nodeName;
  if (e === "BODY" || e === "HTML")
    return !1;
  if (Ur(t, "position") === "fixed")
    return !0;
  var a = ds(t);
  return a ? Eu(a) : !1;
}
function ku(t) {
  if (!t || !t.parentElement || Tn())
    return document.documentElement;
  for (var e = t.parentElement; e && Ur(e, "transform") === "none"; )
    e = e.parentElement;
  return e || document.documentElement;
}
function ps(t, e, a, r) {
  var n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, o = { top: 0, left: 0 }, i = n ? ku(t) : Ha(t, Su(e));
  if (r === "viewport")
    o = sv(i, n);
  else {
    var s = void 0;
    r === "scrollParent" ? (s = ia(ds(e)), s.nodeName === "BODY" && (s = t.ownerDocument.documentElement)) : r === "window" ? s = t.ownerDocument.documentElement : s = r;
    var l = fs(s, i, n);
    if (s.nodeName === "HTML" && !Eu(i)) {
      var u = wu(t.ownerDocument), c = u.height, d = u.width;
      o.top += l.top - l.marginTop, o.bottom = c + l.top, o.left += l.left - l.marginLeft, o.right = d + l.left;
    } else
      o = l;
  }
  a = a || 0;
  var p = typeof a == "number";
  return o.left += p ? a : a.left || 0, o.top += p ? a : a.top || 0, o.right -= p ? a : a.right || 0, o.bottom -= p ? a : a.bottom || 0, o;
}
function lv(t) {
  var e = t.width, a = t.height;
  return e * a;
}
function $u(t, e, a, r, n) {
  var o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
  if (t.indexOf("auto") === -1)
    return t;
  var i = ps(a, r, o, n), s = {
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
    return Kt({
      key: p
    }, s[p], {
      area: lv(s[p])
    });
  }).sort(function(p, h) {
    return h.area - p.area;
  }), u = l.filter(function(p) {
    var h = p.width, g = p.height;
    return h >= a.clientWidth && g >= a.clientHeight;
  }), c = u.length > 0 ? u[0].key : l[0].key, d = t.split("-")[1];
  return c + (d ? "-" + d : "");
}
function Ru(t, e, a) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, n = r ? ku(e) : Ha(e, Su(a));
  return fs(a, n, r);
}
function Tu(t) {
  var e = t.ownerDocument.defaultView, a = e.getComputedStyle(t), r = parseFloat(a.marginTop || 0) + parseFloat(a.marginBottom || 0), n = parseFloat(a.marginLeft || 0) + parseFloat(a.marginRight || 0), o = {
    width: t.offsetWidth + n,
    height: t.offsetHeight + r
  };
  return o;
}
function Ka(t) {
  var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
  return t.replace(/left|right|bottom|top/g, function(a) {
    return e[a];
  });
}
function Ou(t, e, a) {
  a = a.split("-")[0];
  var r = Tu(t), n = {
    width: r.width,
    height: r.height
  }, o = ["right", "left"].indexOf(a) !== -1, i = o ? "top" : "left", s = o ? "left" : "top", l = o ? "height" : "width", u = o ? "width" : "height";
  return n[i] = e[i] + e[l] / 2 - r[l] / 2, a === s ? n[s] = e[s] - r[u] : n[s] = e[Ka(s)], n;
}
function sa(t, e) {
  return Array.prototype.find ? t.find(e) : t.filter(e)[0];
}
function cv(t, e, a) {
  if (Array.prototype.findIndex)
    return t.findIndex(function(n) {
      return n[e] === a;
    });
  var r = sa(t, function(n) {
    return n[e] === a;
  });
  return t.indexOf(r);
}
function _u(t, e, a) {
  var r = a === void 0 ? t : t.slice(0, cv(t, "name", a));
  return r.forEach(function(n) {
    n.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
    var o = n.function || n.fn;
    n.enabled && Cu(o) && (e.offsets.popper = Rr(e.offsets.popper), e.offsets.reference = Rr(e.offsets.reference), e = o(e, n));
  }), e;
}
function uv() {
  if (!this.state.isDestroyed) {
    var t = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: !1,
      offsets: {}
    };
    t.offsets.reference = Ru(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = $u(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = Ou(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = _u(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t));
  }
}
function Pu(t, e) {
  return t.some(function(a) {
    var r = a.name, n = a.enabled;
    return n && r === e;
  });
}
function hs(t) {
  for (var e = [!1, "ms", "Webkit", "Moz", "O"], a = t.charAt(0).toUpperCase() + t.slice(1), r = 0; r < e.length; r++) {
    var n = e[r], o = n ? "" + n + a : t;
    if (typeof document.body.style[o] < "u")
      return o;
  }
  return null;
}
function dv() {
  return this.state.isDestroyed = !0, Pu(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[hs("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
}
function ju(t) {
  var e = t.ownerDocument;
  return e ? e.defaultView : window;
}
function Iu(t, e, a, r) {
  var n = t.nodeName === "BODY", o = n ? t.ownerDocument.defaultView : t;
  o.addEventListener(e, a, { passive: !0 }), n || Iu(ia(o.parentNode), e, a, r), r.push(o);
}
function fv(t, e, a, r) {
  a.updateBound = r, ju(t).addEventListener("resize", a.updateBound, { passive: !0 });
  var n = ia(t);
  return Iu(n, "scroll", a.updateBound, a.scrollParents), a.scrollElement = n, a.eventsEnabled = !0, a;
}
function pv() {
  this.state.eventsEnabled || (this.state = fv(this.reference, this.options, this.state, this.scheduleUpdate));
}
function hv(t, e) {
  return ju(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(a) {
    a.removeEventListener("scroll", e.updateBound);
  }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e;
}
function mv() {
  this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = hv(this.reference, this.state));
}
function ms(t) {
  return t !== "" && !isNaN(parseFloat(t)) && isFinite(t);
}
function Mi(t, e) {
  Object.keys(e).forEach(function(a) {
    var r = "";
    ["width", "height", "top", "right", "bottom", "left"].indexOf(a) !== -1 && ms(e[a]) && (r = "px"), t.style[a] = e[a] + r;
  });
}
function gv(t, e) {
  Object.keys(e).forEach(function(a) {
    var r = e[a];
    r !== !1 ? t.setAttribute(a, e[a]) : t.removeAttribute(a);
  });
}
function vv(t) {
  return Mi(t.instance.popper, t.styles), gv(t.instance.popper, t.attributes), t.arrowElement && Object.keys(t.arrowStyles).length && Mi(t.arrowElement, t.arrowStyles), t;
}
function bv(t, e, a, r, n) {
  var o = Ru(n, e, t, a.positionFixed), i = $u(a.placement, o, e, t, a.modifiers.flip.boundariesElement, a.modifiers.flip.padding);
  return e.setAttribute("x-placement", i), Mi(e, { position: a.positionFixed ? "fixed" : "absolute" }), a;
}
function yv(t, e) {
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
var xv = oa && /Firefox/i.test(navigator.userAgent);
function Cv(t, e) {
  var a = e.x, r = e.y, n = t.offsets.popper, o = sa(t.instance.modifiers, function(I) {
    return I.name === "applyStyle";
  }).gpuAcceleration;
  o !== void 0 && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
  var i = o !== void 0 ? o : e.gpuAcceleration, s = yn(t.instance.popper), l = Ai(s), u = {
    position: n.position
  }, c = yv(t, window.devicePixelRatio < 2 || !xv), d = a === "bottom" ? "top" : "bottom", p = r === "right" ? "left" : "right", h = hs("transform"), g = void 0, m = void 0;
  if (d === "bottom" ? s.nodeName === "HTML" ? m = -s.clientHeight + c.bottom : m = -l.height + c.bottom : m = c.top, p === "right" ? s.nodeName === "HTML" ? g = -s.clientWidth + c.right : g = -l.width + c.right : g = c.left, i && h)
    u[h] = "translate3d(" + g + "px, " + m + "px, 0)", u[d] = 0, u[p] = 0, u.willChange = "transform";
  else {
    var y = d === "bottom" ? -1 : 1, w = p === "right" ? -1 : 1;
    u[d] = m * y, u[p] = g * w, u.willChange = d + ", " + p;
  }
  var k = {
    "x-placement": t.placement
  };
  return t.attributes = Kt({}, k, t.attributes), t.styles = Kt({}, u, t.styles), t.arrowStyles = Kt({}, t.offsets.arrow, t.arrowStyles), t;
}
function Au(t, e, a) {
  var r = sa(t, function(s) {
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
function Sv(t, e) {
  var a;
  if (!Au(t.instance.modifiers, "arrow", "keepTogether"))
    return t;
  var r = e.element;
  if (typeof r == "string") {
    if (r = t.instance.popper.querySelector(r), !r)
      return t;
  } else if (!t.instance.popper.contains(r))
    return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
  var n = t.placement.split("-")[0], o = t.offsets, i = o.popper, s = o.reference, l = ["left", "right"].indexOf(n) !== -1, u = l ? "height" : "width", c = l ? "Top" : "Left", d = c.toLowerCase(), p = l ? "left" : "top", h = l ? "bottom" : "right", g = Tu(r)[u];
  s[h] - g < i[d] && (t.offsets.popper[d] -= i[d] - (s[h] - g)), s[d] + g > i[h] && (t.offsets.popper[d] += s[d] + g - i[h]), t.offsets.popper = Rr(t.offsets.popper);
  var m = s[d] + s[u] / 2 - g / 2, y = Ur(t.instance.popper), w = parseFloat(y["margin" + c]), k = parseFloat(y["border" + c + "Width"]), I = m - t.offsets.popper[d] - w - k;
  return I = Math.max(Math.min(i[u] - g, I), 0), t.arrowElement = r, t.offsets.arrow = (a = {}, Cn(a, d, Math.round(I)), Cn(a, p, ""), a), t;
}
function wv(t) {
  return t === "end" ? "start" : t === "start" ? "end" : t;
}
var Mu = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], ni = Mu.slice(3);
function Ml(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, a = ni.indexOf(t), r = ni.slice(a + 1).concat(ni.slice(0, a));
  return e ? r.reverse() : r;
}
var ai = {
  FLIP: "flip",
  CLOCKWISE: "clockwise",
  COUNTERCLOCKWISE: "counterclockwise"
};
function Ev(t, e) {
  if (Pu(t.instance.modifiers, "inner") || t.flipped && t.placement === t.originalPlacement)
    return t;
  var a = ps(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed), r = t.placement.split("-")[0], n = Ka(r), o = t.placement.split("-")[1] || "", i = [];
  switch (e.behavior) {
    case ai.FLIP:
      i = [r, n];
      break;
    case ai.CLOCKWISE:
      i = Ml(r);
      break;
    case ai.COUNTERCLOCKWISE:
      i = Ml(r, !0);
      break;
    default:
      i = e.behavior;
  }
  return i.forEach(function(s, l) {
    if (r !== s || i.length === l + 1)
      return t;
    r = t.placement.split("-")[0], n = Ka(r);
    var u = t.offsets.popper, c = t.offsets.reference, d = Math.floor, p = r === "left" && d(u.right) > d(c.left) || r === "right" && d(u.left) < d(c.right) || r === "top" && d(u.bottom) > d(c.top) || r === "bottom" && d(u.top) < d(c.bottom), h = d(u.left) < d(a.left), g = d(u.right) > d(a.right), m = d(u.top) < d(a.top), y = d(u.bottom) > d(a.bottom), w = r === "left" && h || r === "right" && g || r === "top" && m || r === "bottom" && y, k = ["top", "bottom"].indexOf(r) !== -1, I = !!e.flipVariations && (k && o === "start" && h || k && o === "end" && g || !k && o === "start" && m || !k && o === "end" && y), f = !!e.flipVariationsByContent && (k && o === "start" && g || k && o === "end" && h || !k && o === "start" && y || !k && o === "end" && m), x = I || f;
    (p || w || x) && (t.flipped = !0, (p || w) && (r = i[l + 1]), x && (o = wv(o)), t.placement = r + (o ? "-" + o : ""), t.offsets.popper = Kt({}, t.offsets.popper, Ou(t.instance.popper, t.offsets.reference, t.placement)), t = _u(t.instance.modifiers, t, "flip"));
  }), t;
}
function kv(t) {
  var e = t.offsets, a = e.popper, r = e.reference, n = t.placement.split("-")[0], o = Math.floor, i = ["top", "bottom"].indexOf(n) !== -1, s = i ? "right" : "bottom", l = i ? "left" : "top", u = i ? "width" : "height";
  return a[s] < o(r[l]) && (t.offsets.popper[l] = o(r[l]) - a[u]), a[l] > o(r[s]) && (t.offsets.popper[l] = o(r[s])), t;
}
function $v(t, e, a, r) {
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
    var l = Rr(s);
    return l[e] / 100 * o;
  } else if (i === "vh" || i === "vw") {
    var u = void 0;
    return i === "vh" ? u = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : u = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), u / 100 * o;
  } else
    return o;
}
function Rv(t, e, a, r) {
  var n = [0, 0], o = ["right", "left"].indexOf(r) !== -1, i = t.split(/(\+|\-)/).map(function(c) {
    return c.trim();
  }), s = i.indexOf(sa(i, function(c) {
    return c.search(/,|\s/) !== -1;
  }));
  i[s] && i[s].indexOf(",") === -1 && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
  var l = /\s*,\s*|\s+/, u = s !== -1 ? [i.slice(0, s).concat([i[s].split(l)[0]]), [i[s].split(l)[1]].concat(i.slice(s + 1))] : [i];
  return u = u.map(function(c, d) {
    var p = (d === 1 ? !o : o) ? "height" : "width", h = !1;
    return c.reduce(function(g, m) {
      return g[g.length - 1] === "" && ["+", "-"].indexOf(m) !== -1 ? (g[g.length - 1] = m, h = !0, g) : h ? (g[g.length - 1] += m, h = !1, g) : g.concat(m);
    }, []).map(function(g) {
      return $v(g, p, e, a);
    });
  }), u.forEach(function(c, d) {
    c.forEach(function(p, h) {
      ms(p) && (n[d] += p * (c[h - 1] === "-" ? -1 : 1));
    });
  }), n;
}
function Tv(t, e) {
  var a = e.offset, r = t.placement, n = t.offsets, o = n.popper, i = n.reference, s = r.split("-")[0], l = void 0;
  return ms(+a) ? l = [+a, 0] : l = Rv(a, o, i, s), s === "left" ? (o.top += l[0], o.left -= l[1]) : s === "right" ? (o.top += l[0], o.left += l[1]) : s === "top" ? (o.left += l[0], o.top -= l[1]) : s === "bottom" && (o.left += l[0], o.top += l[1]), t.popper = o, t;
}
function Ov(t, e) {
  var a = e.boundariesElement || yn(t.instance.popper);
  t.instance.reference === a && (a = yn(a));
  var r = hs("transform"), n = t.instance.popper.style, o = n.top, i = n.left, s = n[r];
  n.top = "", n.left = "", n[r] = "";
  var l = ps(t.instance.popper, t.instance.reference, e.padding, a, t.positionFixed);
  n.top = o, n.left = i, n[r] = s, e.boundaries = l;
  var u = e.priority, c = t.offsets.popper, d = {
    primary: function(h) {
      var g = c[h];
      return c[h] < l[h] && !e.escapeWithReference && (g = Math.max(c[h], l[h])), Cn({}, h, g);
    },
    secondary: function(h) {
      var g = h === "right" ? "left" : "top", m = c[g];
      return c[h] > l[h] && !e.escapeWithReference && (m = Math.min(c[g], l[h] - (h === "right" ? c.width : c.height))), Cn({}, g, m);
    }
  };
  return u.forEach(function(p) {
    var h = ["left", "top"].indexOf(p) !== -1 ? "primary" : "secondary";
    c = Kt({}, c, d[h](p));
  }), t.offsets.popper = c, t;
}
function _v(t) {
  var e = t.placement, a = e.split("-")[0], r = e.split("-")[1];
  if (r) {
    var n = t.offsets, o = n.reference, i = n.popper, s = ["bottom", "top"].indexOf(a) !== -1, l = s ? "left" : "top", u = s ? "width" : "height", c = {
      start: Cn({}, l, o[l]),
      end: Cn({}, l, o[l] + o[u] - i[u])
    };
    t.offsets.popper = Kt({}, i, c[r]);
  }
  return t;
}
function Pv(t) {
  if (!Au(t.instance.modifiers, "hide", "preventOverflow"))
    return t;
  var e = t.offsets.reference, a = sa(t.instance.modifiers, function(r) {
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
function jv(t) {
  var e = t.placement, a = e.split("-")[0], r = t.offsets, n = r.popper, o = r.reference, i = ["left", "right"].indexOf(a) !== -1, s = ["top", "left"].indexOf(a) === -1;
  return n[i ? "left" : "top"] = o[a] - (s ? n[i ? "width" : "height"] : 0), t.placement = Ka(e), t.offsets.popper = Rr(n), t;
}
var Iv = {
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
    fn: _v
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
    fn: Tv,
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
    fn: Ov,
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
    fn: kv
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
    fn: Sv,
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
    fn: Ev,
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
    fn: jv
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
    fn: Pv
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
    fn: Cv,
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
    fn: vv,
    /** @prop {Function} */
    onLoad: bv,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: void 0
  }
}, Av = {
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
  modifiers: Iv
}, ao = (function() {
  function t(e, a) {
    var r = this, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    ov(this, t), this.scheduleUpdate = function() {
      return requestAnimationFrame(r.update);
    }, this.update = rv(this.update.bind(this)), this.options = Kt({}, t.Defaults, n), this.state = {
      isDestroyed: !1,
      isCreated: !1,
      scrollParents: []
    }, this.reference = e && e.jquery ? e[0] : e, this.popper = a && a.jquery ? a[0] : a, this.options.modifiers = {}, Object.keys(Kt({}, t.Defaults.modifiers, n.modifiers)).forEach(function(i) {
      r.options.modifiers[i] = Kt({}, t.Defaults.modifiers[i] || {}, n.modifiers ? n.modifiers[i] : {});
    }), this.modifiers = Object.keys(this.options.modifiers).map(function(i) {
      return Kt({
        name: i
      }, r.options.modifiers[i]);
    }).sort(function(i, s) {
      return i.order - s.order;
    }), this.modifiers.forEach(function(i) {
      i.enabled && Cu(i.onLoad) && i.onLoad(r.reference, r.popper, r.options, i, r.state);
    }), this.update();
    var o = this.options.eventsEnabled;
    o && this.enableEventListeners(), this.state.eventsEnabled = o;
  }
  return iv(t, [{
    key: "update",
    value: function() {
      return uv.call(this);
    }
  }, {
    key: "destroy",
    value: function() {
      return dv.call(this);
    }
  }, {
    key: "enableEventListeners",
    value: function() {
      return pv.call(this);
    }
  }, {
    key: "disableEventListeners",
    value: function() {
      return mv.call(this);
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
ao.Utils = (typeof window < "u" ? window : global).PopperUtils;
ao.placements = Mu;
ao.Defaults = Av;
function Mv(t, e) {
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
function Nl(t) {
  return typeof t == "function" ? t() : t;
}
var Nv = typeof window < "u" ? b.useLayoutEffect : b.useEffect, Lv = {}, Dv = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.anchorEl, n = e.children, o = e.container, i = e.disablePortal, s = i === void 0 ? !1 : i, l = e.keepMounted, u = l === void 0 ? !1 : l, c = e.modifiers, d = e.open, p = e.placement, h = p === void 0 ? "bottom" : p, g = e.popperOptions, m = g === void 0 ? Lv : g, y = e.popperRef, w = e.style, k = e.transition, I = k === void 0 ? !1 : k, f = Ne(e, ["anchorEl", "children", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"]), x = b.useRef(null), E = St(x, a), L = b.useRef(null), W = St(L, y), O = b.useRef(W);
  Nv(function() {
    O.current = W;
  }, [W]), b.useImperativeHandle(y, function() {
    return L.current;
  }, []);
  var P = b.useState(!0), A = P[0], v = P[1], C = na(), M = Mv(h, C), D = b.useState(M), $ = D[0], V = D[1];
  b.useEffect(function() {
    L.current && L.current.update();
  });
  var F = b.useCallback(function() {
    if (!(!x.current || !r || !d)) {
      L.current && (L.current.destroy(), O.current(null));
      var ue = function(be) {
        V(be.placement);
      };
      Nl(r);
      var xe = new ao(Nl(r), x.current, Y({
        placement: M
      }, m, {
        modifiers: Y({}, s ? {} : {
          // It's using scrollParent by default, we can use the viewport when using a portal.
          preventOverflow: {
            boundariesElement: "window"
          }
        }, c, m.modifiers),
        // We could have been using a custom modifier like react-popper is doing.
        // But it seems this is the best public API for this use case.
        onCreate: Gn(ue, m.onCreate),
        onUpdate: Gn(ue, m.onUpdate)
      }));
      O.current(xe);
    }
  }, [r, s, c, d, M, m]), q = b.useCallback(function(ue) {
    Hr(E, ue), F();
  }, [E, F]), z = function() {
    v(!1);
  }, J = function() {
    L.current && (L.current.destroy(), O.current(null));
  }, Z = function() {
    v(!0), J();
  };
  if (b.useEffect(function() {
    return function() {
      J();
    };
  }, []), b.useEffect(function() {
    !d && !I && J();
  }, [d, I]), !u && !d && (!I || A))
    return null;
  var ce = {
    placement: $
  };
  return I && (ce.TransitionProps = {
    in: d,
    onEnter: z,
    onExited: Z
  }), /* @__PURE__ */ b.createElement(uu, {
    disablePortal: s,
    container: o
  }, /* @__PURE__ */ b.createElement("div", Y({
    ref: q,
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
  }), typeof n == "function" ? n(ce) : n));
});
function Ll(t, e) {
  return wr(e) === "object" && e !== null ? t === e : String(t) === String(e);
}
function Bv(t) {
  return t == null || typeof t == "string" && !t.trim();
}
var Fv = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e["aria-label"], n = e.autoFocus, o = e.autoWidth, i = e.children, s = e.classes, l = e.className, u = e.defaultValue, c = e.disabled, d = e.displayEmpty, p = e.IconComponent, h = e.inputRef, g = e.labelId, m = e.MenuProps, y = m === void 0 ? {} : m, w = e.multiple, k = e.name, I = e.onBlur, f = e.onChange, x = e.onClose, E = e.onFocus, L = e.onOpen, W = e.open, O = e.readOnly, P = e.renderValue, A = e.SelectDisplayProps, v = A === void 0 ? {} : A, C = e.tabIndex;
  e.type;
  var M = e.value, D = e.variant, $ = D === void 0 ? "standard" : D, V = Ne(e, ["aria-label", "autoFocus", "autoWidth", "children", "classes", "className", "defaultValue", "disabled", "displayEmpty", "IconComponent", "inputRef", "labelId", "MenuProps", "multiple", "name", "onBlur", "onChange", "onClose", "onFocus", "onOpen", "open", "readOnly", "renderValue", "SelectDisplayProps", "tabIndex", "type", "value", "variant"]), F = as({
    controlled: M,
    default: u,
    name: "Select"
  }), q = kn(F, 2), z = q[0], J = q[1], Z = b.useRef(null), ce = b.useState(null), ue = ce[0], xe = ce[1], de = b.useRef(W != null), be = de.current, ye = b.useState(), we = ye[0], ke = ye[1], ge = b.useState(!1), Ee = ge[0], Ae = ge[1], _e = St(a, h);
  b.useImperativeHandle(_e, function() {
    return {
      focus: function() {
        ue.focus();
      },
      node: Z.current,
      value: z
    };
  }, [ue, z]), b.useEffect(function() {
    n && ue && ue.focus();
  }, [n, ue]), b.useEffect(function() {
    if (ue) {
      var Se = cr(ue).getElementById(g);
      if (Se) {
        var me = function() {
          getSelection().isCollapsed && ue.focus();
        };
        return Se.addEventListener("click", me), function() {
          Se.removeEventListener("click", me);
        };
      }
    }
  }, [g, ue]);
  var qe = function(me, Fe) {
    me ? L && L(Fe) : x && x(Fe), be || (ke(o ? null : ue.clientWidth), Ae(me));
  }, Te = function(me) {
    me.button === 0 && (me.preventDefault(), ue.focus(), qe(!0, me));
  }, We = function(me) {
    qe(!1, me);
  }, Ke = b.Children.toArray(i), Ge = function(me) {
    var Fe = Ke.map(function(Pe) {
      return Pe.props.value;
    }).indexOf(me.target.value);
    if (Fe !== -1) {
      var He = Ke[Fe];
      J(He.props.value), f && f(me, He);
    }
  }, fe = function(me) {
    return function(Fe) {
      w || qe(!1, Fe);
      var He;
      if (w) {
        He = Array.isArray(z) ? z.slice() : [];
        var Pe = z.indexOf(me.props.value);
        Pe === -1 ? He.push(me.props.value) : He.splice(Pe, 1);
      } else
        He = me.props.value;
      me.props.onClick && me.props.onClick(Fe), z !== He && (J(He), f && (Fe.persist(), Object.defineProperty(Fe, "target", {
        writable: !0,
        value: {
          value: He,
          name: k
        }
      }), f(Fe, me)));
    };
  }, pe = function(me) {
    if (!O) {
      var Fe = [
        " ",
        "ArrowUp",
        "ArrowDown",
        // The native select doesn't respond to enter on MacOS, but it's recommended by
        // https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
        "Enter"
      ];
      Fe.indexOf(me.key) !== -1 && (me.preventDefault(), qe(!0, me));
    }
  }, je = ue !== null && (be ? W : Ee), Ie = function(me) {
    !je && I && (me.persist(), Object.defineProperty(me, "target", {
      writable: !0,
      value: {
        value: z,
        name: k
      }
    }), I(me));
  };
  delete V["aria-invalid"];
  var Ve, ee, K = [], U = !1;
  (cs({
    value: z
  }) || d) && (P ? Ve = P(z) : U = !0);
  var te = Ke.map(function(Se) {
    if (!/* @__PURE__ */ b.isValidElement(Se))
      return null;
    var me;
    if (w) {
      if (!Array.isArray(z))
        throw new Error(bn(2));
      me = z.some(function(Fe) {
        return Ll(Fe, Se.props.value);
      }), me && U && K.push(Se.props.children);
    } else
      me = Ll(z, Se.props.value), me && U && (ee = Se.props.children);
    return /* @__PURE__ */ b.cloneElement(Se, {
      "aria-selected": me ? "true" : void 0,
      onClick: fe(Se),
      onKeyUp: function(He) {
        He.key === " " && He.preventDefault(), Se.props.onKeyUp && Se.props.onKeyUp(He);
      },
      role: "option",
      selected: me,
      value: void 0,
      // The value is most likely not a valid HTML attribute.
      "data-value": Se.props.value
      // Instead, we provide it as a data attribute.
    });
  });
  U && (Ve = w ? K.join(", ") : ee);
  var oe = we;
  !o && be && ue && (oe = ue.clientWidth);
  var Ce;
  typeof C < "u" ? Ce = C : Ce = c ? null : 0;
  var Le = v.id || (k ? "mui-component-select-".concat(k) : void 0);
  return /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("div", Y({
    className: he(
      s.root,
      // TODO v5: merge root and select
      s.select,
      s.selectMenu,
      s[$],
      l,
      c && s.disabled
    ),
    ref: xe,
    tabIndex: Ce,
    role: "button",
    "aria-disabled": c ? "true" : void 0,
    "aria-expanded": je ? "true" : void 0,
    "aria-haspopup": "listbox",
    "aria-label": r,
    "aria-labelledby": [g, Le].filter(Boolean).join(" ") || void 0,
    onKeyDown: pe,
    onMouseDown: c || O ? null : Te,
    onBlur: Ie,
    onFocus: E
  }, v, {
    // The id is required for proper a11y
    id: Le
  }), Bv(Ve) ? (
    // eslint-disable-next-line react/no-danger
    /* @__PURE__ */ b.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: "&#8203;"
      }
    })
  ) : Ve), /* @__PURE__ */ b.createElement("input", Y({
    value: Array.isArray(z) ? z.join(",") : z,
    name: k,
    ref: Z,
    "aria-hidden": !0,
    onChange: Ge,
    tabIndex: -1,
    className: s.nativeInput,
    autoFocus: n
  }, V)), /* @__PURE__ */ b.createElement(p, {
    className: he(s.icon, s["icon".concat(pt($))], je && s.iconOpen, c && s.disabled)
  }), /* @__PURE__ */ b.createElement(V0, Y({
    id: "menu-".concat(k || ""),
    anchorEl: ue,
    open: je,
    onClose: We
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
}), zv = bu, Wv = /* @__PURE__ */ b.createElement(hu, null), Vv = /* @__PURE__ */ b.createElement(l0, null), Nu = /* @__PURE__ */ b.forwardRef(function t(e, a) {
  var r = e.autoWidth, n = r === void 0 ? !1 : r, o = e.children, i = e.classes, s = e.displayEmpty, l = s === void 0 ? !1 : s, u = e.IconComponent, c = u === void 0 ? vu : u, d = e.id, p = e.input, h = e.inputProps, g = e.label, m = e.labelId, y = e.labelWidth, w = y === void 0 ? 0 : y, k = e.MenuProps, I = e.multiple, f = I === void 0 ? !1 : I, x = e.native, E = x === void 0 ? !1 : x, L = e.onClose, W = e.onOpen, O = e.open, P = e.renderValue, A = e.SelectDisplayProps, v = e.variant, C = v === void 0 ? "standard" : v, M = Ne(e, ["autoWidth", "children", "classes", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "labelWidth", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"]), D = E ? gu : Fv, $ = ls(), V = ro({
    props: e,
    muiFormControl: $,
    states: ["variant"]
  }), F = V.variant || C, q = p || {
    standard: Wv,
    outlined: /* @__PURE__ */ b.createElement(J0, {
      label: g,
      labelWidth: w
    }),
    filled: Vv
  }[F];
  return /* @__PURE__ */ b.cloneElement(q, Y({
    // Most of the logic is implemented in `SelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: D,
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
      onClose: L,
      onOpen: W,
      open: O,
      renderValue: P,
      SelectDisplayProps: Y({
        id: d
      }, A)
    }, h, {
      classes: h ? es({
        baseClasses: i,
        newClasses: h.classes,
        Component: t
      }) : i
    }, p ? p.props.inputProps : {}),
    ref: a
  }, M));
});
Nu.muiName = "Select";
const Dl = tt(zv, {
  name: "MuiSelect"
})(Nu);
var Hv = function(e) {
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
}, Kv = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.disabled, i = o === void 0 ? !1 : o, s = e.disableFocusRipple, l = s === void 0 ? !1 : s, u = e.fullWidth, c = e.icon, d = e.indicator, p = e.label, h = e.onChange, g = e.onClick, m = e.onFocus, y = e.selected, w = e.selectionFollowsFocus, k = e.textColor, I = k === void 0 ? "inherit" : k, f = e.value, x = e.wrapped, E = x === void 0 ? !1 : x, L = Ne(e, ["classes", "className", "disabled", "disableFocusRipple", "fullWidth", "icon", "indicator", "label", "onChange", "onClick", "onFocus", "selected", "selectionFollowsFocus", "textColor", "value", "wrapped"]), W = function(A) {
    h && h(A, f), g && g(A);
  }, O = function(A) {
    w && !y && h && h(A, f), m && m(A);
  };
  return /* @__PURE__ */ b.createElement($r, Y({
    focusRipple: !l,
    className: he(r.root, r["textColor".concat(pt(I))], n, i && r.disabled, y && r.selected, p && c && r.labelIcon, u && r.fullWidth, E && r.wrapped),
    ref: a,
    role: "tab",
    "aria-selected": y,
    disabled: i,
    onClick: W,
    onFocus: O,
    tabIndex: y ? 0 : -1
  }, L), /* @__PURE__ */ b.createElement("span", {
    className: r.wrapper
  }, c, p), d);
});
const Uv = tt(Hv, {
  name: "MuiTab"
})(Kv), qv = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
})), Gv = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}));
var sn;
function Lu() {
  if (sn)
    return sn;
  var t = document.createElement("div"), e = document.createElement("div");
  return e.style.width = "10px", e.style.height = "1px", t.appendChild(e), t.dir = "rtl", t.style.fontSize = "14px", t.style.width = "4px", t.style.height = "1px", t.style.position = "absolute", t.style.top = "-1000px", t.style.overflow = "scroll", document.body.appendChild(t), sn = "reverse", t.scrollLeft > 0 ? sn = "default" : (t.scrollLeft = 1, t.scrollLeft === 0 && (sn = "negative")), document.body.removeChild(t), sn;
}
function Bl(t, e) {
  var a = t.scrollLeft;
  if (e !== "rtl")
    return a;
  var r = Lu();
  switch (r) {
    case "negative":
      return t.scrollWidth - t.clientWidth + a;
    case "reverse":
      return t.scrollWidth - t.clientWidth - a;
    default:
      return a;
  }
}
function Yv(t) {
  return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
}
function Xv(t, e, a) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : function() {
  }, o = r.ease, i = o === void 0 ? Yv : o, s = r.duration, l = s === void 0 ? 300 : s, u = null, c = e[t], d = !1, p = function() {
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
var Jv = {
  width: 99,
  height: 99,
  position: "absolute",
  top: -9999,
  overflow: "scroll"
};
function Zv(t) {
  var e = t.onChange, a = Ne(t, ["onChange"]), r = b.useRef(), n = b.useRef(null), o = function() {
    r.current = n.current.offsetHeight - n.current.clientHeight;
  };
  return b.useEffect(function() {
    var i = Yn(function() {
      var s = r.current;
      o(), s !== r.current && e(r.current);
    });
    return window.addEventListener("resize", i), function() {
      i.clear(), window.removeEventListener("resize", i);
    };
  }, [e]), b.useEffect(function() {
    o(), e(r.current);
  }, [e]), /* @__PURE__ */ b.createElement("div", Y({
    style: Jv,
    ref: n
  }, a));
}
var Qv = function(e) {
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
}, eb = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.color, i = e.orientation, s = Ne(e, ["classes", "className", "color", "orientation"]);
  return /* @__PURE__ */ b.createElement("span", Y({
    className: he(r.root, r["color".concat(pt(o))], n, i === "vertical" && r.vertical),
    ref: a
  }, s));
});
const tb = tt(Qv, {
  name: "PrivateTabIndicator"
})(eb);
var rb = {
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
}, nb = /* @__PURE__ */ b.createElement(qv, {
  fontSize: "small"
}), ab = /* @__PURE__ */ b.createElement(Gv, {
  fontSize: "small"
}), ob = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.classes, n = e.className, o = e.direction, i = e.orientation, s = e.disabled, l = Ne(e, ["classes", "className", "direction", "orientation", "disabled"]);
  return /* @__PURE__ */ b.createElement($r, Y({
    component: "div",
    className: he(r.root, n, s && r.disabled, i === "vertical" && r.vertical),
    ref: a,
    role: null,
    tabIndex: null
  }, l), o === "left" ? nb : ab);
});
const ib = tt(rb, {
  name: "MuiTabScrollButton"
})(ob);
var sb = function(e) {
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
}, lb = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e["aria-label"], n = e["aria-labelledby"], o = e.action, i = e.centered, s = i === void 0 ? !1 : i, l = e.children, u = e.classes, c = e.className, d = e.component, p = d === void 0 ? "div" : d, h = e.indicatorColor, g = h === void 0 ? "secondary" : h, m = e.onChange, y = e.orientation, w = y === void 0 ? "horizontal" : y, k = e.ScrollButtonComponent, I = k === void 0 ? ib : k, f = e.scrollButtons, x = f === void 0 ? "auto" : f, E = e.selectionFollowsFocus, L = e.TabIndicatorProps, W = L === void 0 ? {} : L, O = e.TabScrollButtonProps, P = e.textColor, A = P === void 0 ? "inherit" : P, v = e.value, C = e.variant, M = C === void 0 ? "standard" : C, D = Ne(e, ["aria-label", "aria-labelledby", "action", "centered", "children", "classes", "className", "component", "indicatorColor", "onChange", "orientation", "ScrollButtonComponent", "scrollButtons", "selectionFollowsFocus", "TabIndicatorProps", "TabScrollButtonProps", "textColor", "value", "variant"]), $ = Rn(), V = M === "scrollable", F = $.direction === "rtl", q = w === "vertical", z = q ? "scrollTop" : "scrollLeft", J = q ? "top" : "left", Z = q ? "bottom" : "right", ce = q ? "clientHeight" : "clientWidth", ue = q ? "height" : "width", xe = b.useState(!1), de = xe[0], be = xe[1], ye = b.useState({}), we = ye[0], ke = ye[1], ge = b.useState({
    start: !1,
    end: !1
  }), Ee = ge[0], Ae = ge[1], _e = b.useState({
    overflow: "hidden",
    marginBottom: null
  }), qe = _e[0], Te = _e[1], We = /* @__PURE__ */ new Map(), Ke = b.useRef(null), Ge = b.useRef(null), fe = function() {
    var ie = Ke.current, $e;
    if (ie) {
      var Ye = ie.getBoundingClientRect();
      $e = {
        clientWidth: ie.clientWidth,
        scrollLeft: ie.scrollLeft,
        scrollTop: ie.scrollTop,
        scrollLeftNormalized: Bl(ie, $.direction),
        scrollWidth: ie.scrollWidth,
        top: Ye.top,
        bottom: Ye.bottom,
        left: Ye.left,
        right: Ye.right
      };
    }
    var Qe;
    if (ie && v !== !1) {
      var at = Ge.current.children;
      if (at.length > 0) {
        var De = at[We.get(v)];
        Qe = De ? De.getBoundingClientRect() : null;
      }
    }
    return {
      tabsMeta: $e,
      tabMeta: Qe
    };
  }, pe = rr(function() {
    var Pe, ie = fe(), $e = ie.tabsMeta, Ye = ie.tabMeta, Qe = 0;
    if (Ye && $e)
      if (q)
        Qe = Ye.top - $e.top + $e.scrollTop;
      else {
        var at = F ? $e.scrollLeftNormalized + $e.clientWidth - $e.scrollWidth : $e.scrollLeft;
        Qe = Ye.left - $e.left + at;
      }
    var De = (Pe = {}, Ot(Pe, J, Qe), Ot(Pe, ue, Ye ? Ye[ue] : 0), Pe);
    if (isNaN(we[J]) || isNaN(we[ue]))
      ke(De);
    else {
      var Be = Math.abs(we[J] - De[J]), mt = Math.abs(we[ue] - De[ue]);
      (Be >= 1 || mt >= 1) && ke(De);
    }
  }), je = function(ie) {
    Xv(z, Ke.current, ie);
  }, Ie = function(ie) {
    var $e = Ke.current[z];
    q ? $e += ie : ($e += ie * (F ? -1 : 1), $e *= F && Lu() === "reverse" ? -1 : 1), je($e);
  }, Ve = function() {
    Ie(-Ke.current[ce]);
  }, ee = function() {
    Ie(Ke.current[ce]);
  }, K = b.useCallback(function(Pe) {
    Te({
      overflow: null,
      marginBottom: -Pe
    });
  }, []), U = function() {
    var ie = {};
    ie.scrollbarSizeListener = V ? /* @__PURE__ */ b.createElement(Zv, {
      className: u.scrollable,
      onChange: K
    }) : null;
    var $e = Ee.start || Ee.end, Ye = V && (x === "auto" && $e || x === "desktop" || x === "on");
    return ie.scrollButtonStart = Ye ? /* @__PURE__ */ b.createElement(I, Y({
      orientation: w,
      direction: F ? "right" : "left",
      onClick: Ve,
      disabled: !Ee.start,
      className: he(u.scrollButtons, x !== "on" && u.scrollButtonsDesktop)
    }, O)) : null, ie.scrollButtonEnd = Ye ? /* @__PURE__ */ b.createElement(I, Y({
      orientation: w,
      direction: F ? "left" : "right",
      onClick: ee,
      disabled: !Ee.end,
      className: he(u.scrollButtons, x !== "on" && u.scrollButtonsDesktop)
    }, O)) : null, ie;
  }, te = rr(function() {
    var Pe = fe(), ie = Pe.tabsMeta, $e = Pe.tabMeta;
    if (!(!$e || !ie)) {
      if ($e[J] < ie[J]) {
        var Ye = ie[z] + ($e[J] - ie[J]);
        je(Ye);
      } else if ($e[Z] > ie[Z]) {
        var Qe = ie[z] + ($e[Z] - ie[Z]);
        je(Qe);
      }
    }
  }), oe = rr(function() {
    if (V && x !== "off") {
      var Pe = Ke.current, ie = Pe.scrollTop, $e = Pe.scrollHeight, Ye = Pe.clientHeight, Qe = Pe.scrollWidth, at = Pe.clientWidth, De, Be;
      if (q)
        De = ie > 1, Be = ie < $e - Ye - 1;
      else {
        var mt = Bl(Ke.current, $.direction);
        De = F ? mt < Qe - at - 1 : mt > 1, Be = F ? mt > 1 : mt < Qe - at - 1;
      }
      (De !== Ee.start || Be !== Ee.end) && Ae({
        start: De,
        end: Be
      });
    }
  });
  b.useEffect(function() {
    var Pe = Yn(function() {
      pe(), oe();
    }), ie = ns(Ke.current);
    return ie.addEventListener("resize", Pe), function() {
      Pe.clear(), ie.removeEventListener("resize", Pe);
    };
  }, [pe, oe]);
  var Ce = b.useCallback(Yn(function() {
    oe();
  }));
  b.useEffect(function() {
    return function() {
      Ce.clear();
    };
  }, [Ce]), b.useEffect(function() {
    be(!0);
  }, []), b.useEffect(function() {
    pe(), oe();
  }), b.useEffect(function() {
    te();
  }, [te, we]), b.useImperativeHandle(o, function() {
    return {
      updateIndicator: pe,
      updateScrollButtons: oe
    };
  }, [pe, oe]);
  var Le = /* @__PURE__ */ b.createElement(tb, Y({
    className: u.indicator,
    orientation: w,
    color: g
  }, W, {
    style: Y({}, we, W.style)
  })), Se = 0, me = b.Children.map(l, function(Pe) {
    if (!/* @__PURE__ */ b.isValidElement(Pe))
      return null;
    var ie = Pe.props.value === void 0 ? Se : Pe.props.value;
    We.set(ie, Se);
    var $e = ie === v;
    return Se += 1, /* @__PURE__ */ b.cloneElement(Pe, {
      fullWidth: M === "fullWidth",
      indicator: $e && !de && Le,
      selected: $e,
      selectionFollowsFocus: E,
      onChange: m,
      textColor: A,
      value: ie
    });
  }), Fe = function(ie) {
    var $e = ie.target, Ye = $e.getAttribute("role");
    if (Ye === "tab") {
      var Qe = null, at = w !== "vertical" ? "ArrowLeft" : "ArrowUp", De = w !== "vertical" ? "ArrowRight" : "ArrowDown";
      switch (w !== "vertical" && $.direction === "rtl" && (at = "ArrowRight", De = "ArrowLeft"), ie.key) {
        case at:
          Qe = $e.previousElementSibling || Ge.current.lastChild;
          break;
        case De:
          Qe = $e.nextElementSibling || Ge.current.firstChild;
          break;
        case "Home":
          Qe = Ge.current.firstChild;
          break;
        case "End":
          Qe = Ge.current.lastChild;
          break;
      }
      Qe !== null && (Qe.focus(), ie.preventDefault());
    }
  }, He = U();
  return /* @__PURE__ */ b.createElement(p, Y({
    className: he(u.root, c, q && u.vertical),
    ref: a
  }, D), He.scrollButtonStart, He.scrollbarSizeListener, /* @__PURE__ */ b.createElement("div", {
    className: he(u.scroller, V ? u.scrollable : u.fixed),
    style: qe,
    ref: Ke,
    onScroll: Ce
  }, /* @__PURE__ */ b.createElement("div", {
    "aria-label": r,
    "aria-labelledby": n,
    className: he(u.flexContainer, q && u.flexContainerVertical, s && !V && u.centered),
    onKeyDown: Fe,
    ref: Ge,
    role: "tablist"
  }, me), de && Le), He.scrollButtonEnd);
});
const cb = tt(sb, {
  name: "MuiTabs"
})(lb);
function Fl(t) {
  return Math.round(t * 1e5) / 1e5;
}
function ub() {
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
var db = function(e) {
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
    popperArrow: ub(),
    /* Styles applied to the tooltip (label wrapper) element. */
    tooltip: {
      backgroundColor: Je(e.palette.grey[700], 0.9),
      borderRadius: e.shape.borderRadius,
      color: e.palette.common.white,
      fontFamily: e.typography.fontFamily,
      padding: "4px 8px",
      fontSize: e.typography.pxToRem(10),
      lineHeight: "".concat(Fl(14 / 10), "em"),
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
      color: Je(e.palette.grey[700], 0.9),
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
      lineHeight: "".concat(Fl(16 / 14), "em"),
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
}, Ca = !1, oi = null, fb = /* @__PURE__ */ b.forwardRef(function(e, a) {
  var r = e.arrow, n = r === void 0 ? !1 : r, o = e.children, i = e.classes, s = e.disableFocusListener, l = s === void 0 ? !1 : s, u = e.disableHoverListener, c = u === void 0 ? !1 : u, d = e.disableTouchListener, p = d === void 0 ? !1 : d, h = e.enterDelay, g = h === void 0 ? 100 : h, m = e.enterNextDelay, y = m === void 0 ? 0 : m, w = e.enterTouchDelay, k = w === void 0 ? 700 : w, I = e.id, f = e.interactive, x = f === void 0 ? !1 : f, E = e.leaveDelay, L = E === void 0 ? 0 : E, W = e.leaveTouchDelay, O = W === void 0 ? 1500 : W, P = e.onClose, A = e.onOpen, v = e.open, C = e.placement, M = C === void 0 ? "bottom" : C, D = e.PopperComponent, $ = D === void 0 ? Dv : D, V = e.PopperProps, F = e.title, q = e.TransitionComponent, z = q === void 0 ? us : q, J = e.TransitionProps, Z = Ne(e, ["arrow", "children", "classes", "disableFocusListener", "disableHoverListener", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "id", "interactive", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"]), ce = Rn(), ue = b.useState(), xe = ue[0], de = ue[1], be = b.useState(null), ye = be[0], we = be[1], ke = b.useRef(!1), ge = b.useRef(), Ee = b.useRef(), Ae = b.useRef(), _e = b.useRef(), qe = as({
    controlled: v,
    default: !1,
    name: "Tooltip",
    state: "open"
  }), Te = kn(qe, 2), We = Te[0], Ke = Te[1], Ge = We, fe = Wm(I);
  b.useEffect(function() {
    return function() {
      clearTimeout(ge.current), clearTimeout(Ee.current), clearTimeout(Ae.current), clearTimeout(_e.current);
    };
  }, []);
  var pe = function(rt) {
    clearTimeout(oi), Ca = !0, Ke(!0), A && A(rt);
  }, je = function() {
    var rt = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return function(et) {
      var bt = o.props;
      et.type === "mouseover" && bt.onMouseOver && rt && bt.onMouseOver(et), !(ke.current && et.type !== "touchstart") && (xe && xe.removeAttribute("title"), clearTimeout(Ee.current), clearTimeout(Ae.current), g || Ca && y ? (et.persist(), Ee.current = setTimeout(function() {
        pe(et);
      }, Ca ? y : g)) : pe(et));
    };
  }, Ie = os(), Ve = Ie.isFocusVisible, ee = Ie.onBlurVisible, K = Ie.ref, U = b.useState(!1), te = U[0], oe = U[1], Ce = function() {
    te && (oe(!1), ee());
  }, Le = function() {
    var rt = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return function(et) {
      xe || de(et.currentTarget), Ve(et) && (oe(!0), je()(et));
      var bt = o.props;
      bt.onFocus && rt && bt.onFocus(et);
    };
  }, Se = function(rt) {
    clearTimeout(oi), oi = setTimeout(function() {
      Ca = !1;
    }, 800 + L), Ke(!1), P && P(rt), clearTimeout(ge.current), ge.current = setTimeout(function() {
      ke.current = !1;
    }, ce.transitions.duration.shortest);
  }, me = function() {
    var rt = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return function(et) {
      var bt = o.props;
      et.type === "blur" && (bt.onBlur && rt && bt.onBlur(et), Ce()), et.type === "mouseleave" && bt.onMouseLeave && et.currentTarget === xe && bt.onMouseLeave(et), clearTimeout(Ee.current), clearTimeout(Ae.current), et.persist(), Ae.current = setTimeout(function() {
        Se(et);
      }, L);
    };
  }, Fe = function(rt) {
    ke.current = !0;
    var et = o.props;
    et.onTouchStart && et.onTouchStart(rt);
  }, He = function(rt) {
    Fe(rt), clearTimeout(Ae.current), clearTimeout(ge.current), clearTimeout(_e.current), rt.persist(), _e.current = setTimeout(function() {
      je()(rt);
    }, k);
  }, Pe = function(rt) {
    o.props.onTouchEnd && o.props.onTouchEnd(rt), clearTimeout(_e.current), clearTimeout(Ae.current), rt.persist(), Ae.current = setTimeout(function() {
      Se(rt);
    }, O);
  }, ie = St(de, a), $e = St(K, ie), Ye = b.useCallback(function(ot) {
    Hr($e, Xt.findDOMNode(ot));
  }, [$e]), Qe = St(o.ref, Ye);
  F === "" && (Ge = !1);
  var at = !Ge && !c, De = Y({
    "aria-describedby": Ge ? fe : null,
    title: at && typeof F == "string" ? F : null
  }, Z, o.props, {
    className: he(Z.className, o.props.className),
    onTouchStart: Fe,
    ref: Qe
  }), Be = {};
  p || (De.onTouchStart = He, De.onTouchEnd = Pe), c || (De.onMouseOver = je(), De.onMouseLeave = me(), x && (Be.onMouseOver = je(!1), Be.onMouseLeave = me(!1))), l || (De.onFocus = Le(), De.onBlur = me(), x && (Be.onFocus = Le(!1), Be.onBlur = me(!1)));
  var mt = b.useMemo(function() {
    return Er({
      popperOptions: {
        modifiers: {
          arrow: {
            enabled: !!ye,
            element: ye
          }
        }
      }
    }, V);
  }, [ye, V]);
  return /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.cloneElement(o, De), /* @__PURE__ */ b.createElement($, Y({
    className: he(i.popper, x && i.popperInteractive, n && i.popperArrow),
    placement: M,
    anchorEl: xe,
    open: xe ? Ge : !1,
    id: De["aria-describedby"],
    transition: !0
  }, Be, mt), function(ot) {
    var rt = ot.placement, et = ot.TransitionProps;
    return /* @__PURE__ */ b.createElement(z, Y({
      timeout: ce.transitions.duration.shorter
    }, et, J), /* @__PURE__ */ b.createElement("div", {
      className: he(i.tooltip, i["tooltipPlacement".concat(pt(rt.split("-")[0]))], ke.current && i.touch, n && i.tooltipArrow)
    }, F, n ? /* @__PURE__ */ b.createElement("span", {
      className: i.arrow,
      ref: we
    }) : null));
  }));
});
const Ua = tt(db, {
  name: "MuiTooltip",
  flip: !1
})(fb);
var Fn = { exports: {} };
Fn.exports;
var zl;
function pb() {
  return zl || (zl = 1, (function(t, e) {
    var a = 200, r = "__lodash_hash_undefined__", n = 9007199254740991, o = "[object Arguments]", i = "[object Array]", s = "[object Boolean]", l = "[object Date]", u = "[object Error]", c = "[object Function]", d = "[object GeneratorFunction]", p = "[object Map]", h = "[object Number]", g = "[object Object]", m = "[object Promise]", y = "[object RegExp]", w = "[object Set]", k = "[object String]", I = "[object Symbol]", f = "[object WeakMap]", x = "[object ArrayBuffer]", E = "[object DataView]", L = "[object Float32Array]", W = "[object Float64Array]", O = "[object Int8Array]", P = "[object Int16Array]", A = "[object Int32Array]", v = "[object Uint8Array]", C = "[object Uint8ClampedArray]", M = "[object Uint16Array]", D = "[object Uint32Array]", $ = /[\\^$.*+?()[\]{}|]/g, V = /\w*$/, F = /^\[object .+?Constructor\]$/, q = /^(?:0|[1-9]\d*)$/, z = {};
    z[o] = z[i] = z[x] = z[E] = z[s] = z[l] = z[L] = z[W] = z[O] = z[P] = z[A] = z[p] = z[h] = z[g] = z[y] = z[w] = z[k] = z[I] = z[v] = z[C] = z[M] = z[D] = !0, z[u] = z[c] = z[f] = !1;
    var J = typeof va == "object" && va && va.Object === Object && va, Z = typeof self == "object" && self && self.Object === Object && self, ce = J || Z || Function("return this")(), ue = e && !e.nodeType && e, xe = ue && !0 && t && !t.nodeType && t, de = xe && xe.exports === ue;
    function be(T, X) {
      return T.set(X[0], X[1]), T;
    }
    function ye(T, X) {
      return T.add(X), T;
    }
    function we(T, X) {
      for (var le = -1, Me = T ? T.length : 0; ++le < Me && X(T[le], le, T) !== !1; )
        ;
      return T;
    }
    function ke(T, X) {
      for (var le = -1, Me = X.length, Pt = T.length; ++le < Me; )
        T[Pt + le] = X[le];
      return T;
    }
    function ge(T, X, le, Me) {
      for (var Pt = -1, Dt = T ? T.length : 0; ++Pt < Dt; )
        le = X(le, T[Pt], Pt, T);
      return le;
    }
    function Ee(T, X) {
      for (var le = -1, Me = Array(T); ++le < T; )
        Me[le] = X(le);
      return Me;
    }
    function Ae(T, X) {
      return T == null ? void 0 : T[X];
    }
    function _e(T) {
      var X = !1;
      if (T != null && typeof T.toString != "function")
        try {
          X = !!(T + "");
        } catch {
        }
      return X;
    }
    function qe(T) {
      var X = -1, le = Array(T.size);
      return T.forEach(function(Me, Pt) {
        le[++X] = [Pt, Me];
      }), le;
    }
    function Te(T, X) {
      return function(le) {
        return T(X(le));
      };
    }
    function We(T) {
      var X = -1, le = Array(T.size);
      return T.forEach(function(Me) {
        le[++X] = Me;
      }), le;
    }
    var Ke = Array.prototype, Ge = Function.prototype, fe = Object.prototype, pe = ce["__core-js_shared__"], je = (function() {
      var T = /[^.]+$/.exec(pe && pe.keys && pe.keys.IE_PROTO || "");
      return T ? "Symbol(src)_1." + T : "";
    })(), Ie = Ge.toString, Ve = fe.hasOwnProperty, ee = fe.toString, K = RegExp(
      "^" + Ie.call(Ve).replace($, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), U = de ? ce.Buffer : void 0, te = ce.Symbol, oe = ce.Uint8Array, Ce = Te(Object.getPrototypeOf, Object), Le = Object.create, Se = fe.propertyIsEnumerable, me = Ke.splice, Fe = Object.getOwnPropertySymbols, He = U ? U.isBuffer : void 0, Pe = Te(Object.keys, Object), ie = Qr(ce, "DataView"), $e = Qr(ce, "Map"), Ye = Qr(ce, "Promise"), Qe = Qr(ce, "Set"), at = Qr(ce, "WeakMap"), De = Qr(Object, "create"), Be = Ar(ie), mt = Ar($e), ot = Ar(Ye), rt = Ar(Qe), et = Ar(at), bt = te ? te.prototype : void 0, Nt = bt ? bt.valueOf : void 0;
    function Lt(T) {
      var X = -1, le = T ? T.length : 0;
      for (this.clear(); ++X < le; ) {
        var Me = T[X];
        this.set(Me[0], Me[1]);
      }
    }
    function Pr() {
      this.__data__ = De ? De(null) : {};
    }
    function Co(T) {
      return this.has(T) && delete this.__data__[T];
    }
    function qr(T) {
      var X = this.__data__;
      if (De) {
        var le = X[T];
        return le === r ? void 0 : le;
      }
      return Ve.call(X, T) ? X[T] : void 0;
    }
    function So(T) {
      var X = this.__data__;
      return De ? X[T] !== void 0 : Ve.call(X, T);
    }
    function wo(T, X) {
      var le = this.__data__;
      return le[T] = De && X === void 0 ? r : X, this;
    }
    Lt.prototype.clear = Pr, Lt.prototype.delete = Co, Lt.prototype.get = qr, Lt.prototype.has = So, Lt.prototype.set = wo;
    function qt(T) {
      var X = -1, le = T ? T.length : 0;
      for (this.clear(); ++X < le; ) {
        var Me = T[X];
        this.set(Me[0], Me[1]);
      }
    }
    function Eo() {
      this.__data__ = [];
    }
    function Gr(T) {
      var X = this.__data__, le = ze(X, T);
      if (le < 0)
        return !1;
      var Me = X.length - 1;
      return le == Me ? X.pop() : me.call(X, le, 1), !0;
    }
    function j(T) {
      var X = this.__data__, le = ze(X, T);
      return le < 0 ? void 0 : X[le][1];
    }
    function N(T) {
      return ze(this.__data__, T) > -1;
    }
    function S(T, X) {
      var le = this.__data__, Me = ze(le, T);
      return Me < 0 ? le.push([T, X]) : le[Me][1] = X, this;
    }
    qt.prototype.clear = Eo, qt.prototype.delete = Gr, qt.prototype.get = j, qt.prototype.has = N, qt.prototype.set = S;
    function R(T) {
      var X = -1, le = T ? T.length : 0;
      for (this.clear(); ++X < le; ) {
        var Me = T[X];
        this.set(Me[0], Me[1]);
      }
    }
    function _() {
      this.__data__ = {
        hash: new Lt(),
        map: new ($e || qt)(),
        string: new Lt()
      };
    }
    function G(T) {
      return pa(this, T).delete(T);
    }
    function re(T) {
      return pa(this, T).get(T);
    }
    function Q(T) {
      return pa(this, T).has(T);
    }
    function H(T, X) {
      return pa(this, T).set(T, X), this;
    }
    R.prototype.clear = _, R.prototype.delete = G, R.prototype.get = re, R.prototype.has = Q, R.prototype.set = H;
    function se(T) {
      this.__data__ = new qt(T);
    }
    function Oe() {
      this.__data__ = new qt();
    }
    function Ze(T) {
      return this.__data__.delete(T);
    }
    function nt(T) {
      return this.__data__.get(T);
    }
    function lt(T) {
      return this.__data__.has(T);
    }
    function Xe(T, X) {
      var le = this.__data__;
      if (le instanceof qt) {
        var Me = le.__data__;
        if (!$e || Me.length < a - 1)
          return Me.push([T, X]), this;
        le = this.__data__ = new R(Me);
      }
      return le.set(T, X), this;
    }
    se.prototype.clear = Oe, se.prototype.delete = Ze, se.prototype.get = nt, se.prototype.has = lt, se.prototype.set = Xe;
    function ct(T, X) {
      var le = ko(T) || Rd(T) ? Ee(T.length, String) : [], Me = le.length, Pt = !!Me;
      for (var Dt in T)
        Ve.call(T, Dt) && !(Pt && (Dt == "length" || wd(Dt, Me))) && le.push(Dt);
      return le;
    }
    function yt(T, X, le) {
      var Me = T[X];
      (!(Ve.call(T, X) && Os(Me, le)) || le === void 0 && !(X in T)) && (T[X] = le);
    }
    function ze(T, X) {
      for (var le = T.length; le--; )
        if (Os(T[le][0], X))
          return le;
      return -1;
    }
    function $t(T, X) {
      return T && Zr(X, $o(X), T);
    }
    function _t(T, X, le, Me, Pt, Dt, ir) {
      var Bt;
      if (Me && (Bt = Dt ? Me(T, Pt, Dt, ir) : Me(T)), Bt !== void 0)
        return Bt;
      if (!ha(T))
        return T;
      var js = ko(T);
      if (js) {
        if (Bt = xd(T), !X)
          return jn(T, Bt);
      } else {
        var en = Ir(T), Is = en == c || en == d;
        if (Od(T))
          return Tt(T, X);
        if (en == g || en == o || Is && !Dt) {
          if (_e(T))
            return Dt ? T : {};
          if (Bt = Cd(Is ? {} : T), !X)
            return mr(T, $t(Bt, T));
        } else {
          if (!z[en])
            return Dt ? T : {};
          Bt = Sd(T, en, _t, X);
        }
      }
      ir || (ir = new se());
      var As = ir.get(T);
      if (As)
        return As;
      if (ir.set(T, Bt), !js)
        var Ms = le ? fa(T) : $o(T);
      return we(Ms || T, function(Ro, ma) {
        Ms && (ma = Ro, Ro = T[ma]), yt(Bt, ma, _t(Ro, X, le, Me, ma, T, ir));
      }), Bt;
    }
    function Gt(T) {
      return ha(T) ? Le(T) : {};
    }
    function Yr(T, X, le) {
      var Me = X(T);
      return ko(T) ? Me : ke(Me, le(T));
    }
    function Yt(T) {
      return ee.call(T);
    }
    function Xr(T) {
      if (!ha(T) || kd(T))
        return !1;
      var X = Ps(T) || _e(T) ? K : F;
      return X.test(Ar(T));
    }
    function pr(T) {
      if (!Ts(T))
        return Pe(T);
      var X = [];
      for (var le in Object(T))
        Ve.call(T, le) && le != "constructor" && X.push(le);
      return X;
    }
    function Tt(T, X) {
      if (X)
        return T.slice();
      var le = new T.constructor(T.length);
      return T.copy(le), le;
    }
    function Zt(T) {
      var X = new T.constructor(T.byteLength);
      return new oe(X).set(new oe(T)), X;
    }
    function jr(T, X) {
      var le = X ? Zt(T.buffer) : T.buffer;
      return new T.constructor(le, T.byteOffset, T.byteLength);
    }
    function hr(T, X, le) {
      var Me = X ? le(qe(T), !0) : qe(T);
      return ge(Me, be, new T.constructor());
    }
    function da(T) {
      var X = new T.constructor(T.source, V.exec(T));
      return X.lastIndex = T.lastIndex, X;
    }
    function Jr(T, X, le) {
      var Me = X ? le(We(T), !0) : We(T);
      return ge(Me, ye, new T.constructor());
    }
    function _n(T) {
      return Nt ? Object(Nt.call(T)) : {};
    }
    function Pn(T, X) {
      var le = X ? Zt(T.buffer) : T.buffer;
      return new T.constructor(le, T.byteOffset, T.length);
    }
    function jn(T, X) {
      var le = -1, Me = T.length;
      for (X || (X = Array(Me)); ++le < Me; )
        X[le] = T[le];
      return X;
    }
    function Zr(T, X, le, Me) {
      le || (le = {});
      for (var Pt = -1, Dt = X.length; ++Pt < Dt; ) {
        var ir = X[Pt], Bt = void 0;
        yt(le, ir, Bt === void 0 ? T[ir] : Bt);
      }
      return le;
    }
    function mr(T, X) {
      return Zr(T, Rs(T), X);
    }
    function fa(T) {
      return Yr(T, $o, Rs);
    }
    function pa(T, X) {
      var le = T.__data__;
      return Ed(X) ? le[typeof X == "string" ? "string" : "hash"] : le.map;
    }
    function Qr(T, X) {
      var le = Ae(T, X);
      return Xr(le) ? le : void 0;
    }
    var Rs = Fe ? Te(Fe, Object) : jd, Ir = Yt;
    (ie && Ir(new ie(new ArrayBuffer(1))) != E || $e && Ir(new $e()) != p || Ye && Ir(Ye.resolve()) != m || Qe && Ir(new Qe()) != w || at && Ir(new at()) != f) && (Ir = function(T) {
      var X = ee.call(T), le = X == g ? T.constructor : void 0, Me = le ? Ar(le) : void 0;
      if (Me)
        switch (Me) {
          case Be:
            return E;
          case mt:
            return p;
          case ot:
            return m;
          case rt:
            return w;
          case et:
            return f;
        }
      return X;
    });
    function xd(T) {
      var X = T.length, le = T.constructor(X);
      return X && typeof T[0] == "string" && Ve.call(T, "index") && (le.index = T.index, le.input = T.input), le;
    }
    function Cd(T) {
      return typeof T.constructor == "function" && !Ts(T) ? Gt(Ce(T)) : {};
    }
    function Sd(T, X, le, Me) {
      var Pt = T.constructor;
      switch (X) {
        case x:
          return Zt(T);
        case s:
        case l:
          return new Pt(+T);
        case E:
          return jr(T, Me);
        case L:
        case W:
        case O:
        case P:
        case A:
        case v:
        case C:
        case M:
        case D:
          return Pn(T, Me);
        case p:
          return hr(T, Me, le);
        case h:
        case k:
          return new Pt(T);
        case y:
          return da(T);
        case w:
          return Jr(T, Me, le);
        case I:
          return _n(T);
      }
    }
    function wd(T, X) {
      return X = X ?? n, !!X && (typeof T == "number" || q.test(T)) && T > -1 && T % 1 == 0 && T < X;
    }
    function Ed(T) {
      var X = typeof T;
      return X == "string" || X == "number" || X == "symbol" || X == "boolean" ? T !== "__proto__" : T === null;
    }
    function kd(T) {
      return !!je && je in T;
    }
    function Ts(T) {
      var X = T && T.constructor, le = typeof X == "function" && X.prototype || fe;
      return T === le;
    }
    function Ar(T) {
      if (T != null) {
        try {
          return Ie.call(T);
        } catch {
        }
        try {
          return T + "";
        } catch {
        }
      }
      return "";
    }
    function $d(T) {
      return _t(T, !0, !0);
    }
    function Os(T, X) {
      return T === X || T !== T && X !== X;
    }
    function Rd(T) {
      return Td(T) && Ve.call(T, "callee") && (!Se.call(T, "callee") || ee.call(T) == o);
    }
    var ko = Array.isArray;
    function _s(T) {
      return T != null && _d(T.length) && !Ps(T);
    }
    function Td(T) {
      return Pd(T) && _s(T);
    }
    var Od = He || Id;
    function Ps(T) {
      var X = ha(T) ? ee.call(T) : "";
      return X == c || X == d;
    }
    function _d(T) {
      return typeof T == "number" && T > -1 && T % 1 == 0 && T <= n;
    }
    function ha(T) {
      var X = typeof T;
      return !!T && (X == "object" || X == "function");
    }
    function Pd(T) {
      return !!T && typeof T == "object";
    }
    function $o(T) {
      return _s(T) ? ct(T) : pr(T);
    }
    function jd() {
      return [];
    }
    function Id() {
      return !1;
    }
    t.exports = $d;
  })(Fn, Fn.exports)), Fn.exports;
}
var hb = pb();
const Wl = /* @__PURE__ */ Or(hb);
var Oa = { exports: {} }, mb = Oa.exports, Vl;
function gb() {
  return Vl || (Vl = 1, (function(t, e) {
    (function(a, r) {
      t.exports = r();
    })(mb, (function() {
      var a = 1e3, r = 6e4, n = 36e5, o = "millisecond", i = "second", s = "minute", l = "hour", u = "day", c = "week", d = "month", p = "quarter", h = "year", g = "date", m = "Invalid Date", y = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, w = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, k = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(M) {
        var D = ["th", "st", "nd", "rd"], $ = M % 100;
        return "[" + M + (D[($ - 20) % 10] || D[$] || D[0]) + "]";
      } }, I = function(M, D, $) {
        var V = String(M);
        return !V || V.length >= D ? M : "" + Array(D + 1 - V.length).join($) + M;
      }, f = { s: I, z: function(M) {
        var D = -M.utcOffset(), $ = Math.abs(D), V = Math.floor($ / 60), F = $ % 60;
        return (D <= 0 ? "+" : "-") + I(V, 2, "0") + ":" + I(F, 2, "0");
      }, m: function M(D, $) {
        if (D.date() < $.date()) return -M($, D);
        var V = 12 * ($.year() - D.year()) + ($.month() - D.month()), F = D.clone().add(V, d), q = $ - F < 0, z = D.clone().add(V + (q ? -1 : 1), d);
        return +(-(V + ($ - F) / (q ? F - z : z - F)) || 0);
      }, a: function(M) {
        return M < 0 ? Math.ceil(M) || 0 : Math.floor(M);
      }, p: function(M) {
        return { M: d, y: h, w: c, d: u, D: g, h: l, m: s, s: i, ms: o, Q: p }[M] || String(M || "").toLowerCase().replace(/s$/, "");
      }, u: function(M) {
        return M === void 0;
      } }, x = "en", E = {};
      E[x] = k;
      var L = "$isDayjsObject", W = function(M) {
        return M instanceof v || !(!M || !M[L]);
      }, O = function M(D, $, V) {
        var F;
        if (!D) return x;
        if (typeof D == "string") {
          var q = D.toLowerCase();
          E[q] && (F = q), $ && (E[q] = $, F = q);
          var z = D.split("-");
          if (!F && z.length > 1) return M(z[0]);
        } else {
          var J = D.name;
          E[J] = D, F = J;
        }
        return !V && F && (x = F), F || !V && x;
      }, P = function(M, D) {
        if (W(M)) return M.clone();
        var $ = typeof D == "object" ? D : {};
        return $.date = M, $.args = arguments, new v($);
      }, A = f;
      A.l = O, A.i = W, A.w = function(M, D) {
        return P(M, { locale: D.$L, utc: D.$u, x: D.$x, $offset: D.$offset });
      };
      var v = (function() {
        function M($) {
          this.$L = O($.locale, null, !0), this.parse($), this.$x = this.$x || $.x || {}, this[L] = !0;
        }
        var D = M.prototype;
        return D.parse = function($) {
          this.$d = (function(V) {
            var F = V.date, q = V.utc;
            if (F === null) return /* @__PURE__ */ new Date(NaN);
            if (A.u(F)) return /* @__PURE__ */ new Date();
            if (F instanceof Date) return new Date(F);
            if (typeof F == "string" && !/Z$/i.test(F)) {
              var z = F.match(y);
              if (z) {
                var J = z[2] - 1 || 0, Z = (z[7] || "0").substring(0, 3);
                return q ? new Date(Date.UTC(z[1], J, z[3] || 1, z[4] || 0, z[5] || 0, z[6] || 0, Z)) : new Date(z[1], J, z[3] || 1, z[4] || 0, z[5] || 0, z[6] || 0, Z);
              }
            }
            return new Date(F);
          })($), this.init();
        }, D.init = function() {
          var $ = this.$d;
          this.$y = $.getFullYear(), this.$M = $.getMonth(), this.$D = $.getDate(), this.$W = $.getDay(), this.$H = $.getHours(), this.$m = $.getMinutes(), this.$s = $.getSeconds(), this.$ms = $.getMilliseconds();
        }, D.$utils = function() {
          return A;
        }, D.isValid = function() {
          return this.$d.toString() !== m;
        }, D.isSame = function($, V) {
          var F = P($);
          return this.startOf(V) <= F && F <= this.endOf(V);
        }, D.isAfter = function($, V) {
          return P($) < this.startOf(V);
        }, D.isBefore = function($, V) {
          return this.endOf(V) < P($);
        }, D.$g = function($, V, F) {
          return A.u($) ? this[V] : this.set(F, $);
        }, D.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, D.valueOf = function() {
          return this.$d.getTime();
        }, D.startOf = function($, V) {
          var F = this, q = !!A.u(V) || V, z = A.p($), J = function(we, ke) {
            var ge = A.w(F.$u ? Date.UTC(F.$y, ke, we) : new Date(F.$y, ke, we), F);
            return q ? ge : ge.endOf(u);
          }, Z = function(we, ke) {
            return A.w(F.toDate()[we].apply(F.toDate("s"), (q ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ke)), F);
          }, ce = this.$W, ue = this.$M, xe = this.$D, de = "set" + (this.$u ? "UTC" : "");
          switch (z) {
            case h:
              return q ? J(1, 0) : J(31, 11);
            case d:
              return q ? J(1, ue) : J(0, ue + 1);
            case c:
              var be = this.$locale().weekStart || 0, ye = (ce < be ? ce + 7 : ce) - be;
              return J(q ? xe - ye : xe + (6 - ye), ue);
            case u:
            case g:
              return Z(de + "Hours", 0);
            case l:
              return Z(de + "Minutes", 1);
            case s:
              return Z(de + "Seconds", 2);
            case i:
              return Z(de + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, D.endOf = function($) {
          return this.startOf($, !1);
        }, D.$set = function($, V) {
          var F, q = A.p($), z = "set" + (this.$u ? "UTC" : ""), J = (F = {}, F[u] = z + "Date", F[g] = z + "Date", F[d] = z + "Month", F[h] = z + "FullYear", F[l] = z + "Hours", F[s] = z + "Minutes", F[i] = z + "Seconds", F[o] = z + "Milliseconds", F)[q], Z = q === u ? this.$D + (V - this.$W) : V;
          if (q === d || q === h) {
            var ce = this.clone().set(g, 1);
            ce.$d[J](Z), ce.init(), this.$d = ce.set(g, Math.min(this.$D, ce.daysInMonth())).$d;
          } else J && this.$d[J](Z);
          return this.init(), this;
        }, D.set = function($, V) {
          return this.clone().$set($, V);
        }, D.get = function($) {
          return this[A.p($)]();
        }, D.add = function($, V) {
          var F, q = this;
          $ = Number($);
          var z = A.p(V), J = function(ue) {
            var xe = P(q);
            return A.w(xe.date(xe.date() + Math.round(ue * $)), q);
          };
          if (z === d) return this.set(d, this.$M + $);
          if (z === h) return this.set(h, this.$y + $);
          if (z === u) return J(1);
          if (z === c) return J(7);
          var Z = (F = {}, F[s] = r, F[l] = n, F[i] = a, F)[z] || 1, ce = this.$d.getTime() + $ * Z;
          return A.w(ce, this);
        }, D.subtract = function($, V) {
          return this.add(-1 * $, V);
        }, D.format = function($) {
          var V = this, F = this.$locale();
          if (!this.isValid()) return F.invalidDate || m;
          var q = $ || "YYYY-MM-DDTHH:mm:ssZ", z = A.z(this), J = this.$H, Z = this.$m, ce = this.$M, ue = F.weekdays, xe = F.months, de = F.meridiem, be = function(ke, ge, Ee, Ae) {
            return ke && (ke[ge] || ke(V, q)) || Ee[ge].slice(0, Ae);
          }, ye = function(ke) {
            return A.s(J % 12 || 12, ke, "0");
          }, we = de || function(ke, ge, Ee) {
            var Ae = ke < 12 ? "AM" : "PM";
            return Ee ? Ae.toLowerCase() : Ae;
          };
          return q.replace(w, (function(ke, ge) {
            return ge || (function(Ee) {
              switch (Ee) {
                case "YY":
                  return String(V.$y).slice(-2);
                case "YYYY":
                  return A.s(V.$y, 4, "0");
                case "M":
                  return ce + 1;
                case "MM":
                  return A.s(ce + 1, 2, "0");
                case "MMM":
                  return be(F.monthsShort, ce, xe, 3);
                case "MMMM":
                  return be(xe, ce);
                case "D":
                  return V.$D;
                case "DD":
                  return A.s(V.$D, 2, "0");
                case "d":
                  return String(V.$W);
                case "dd":
                  return be(F.weekdaysMin, V.$W, ue, 2);
                case "ddd":
                  return be(F.weekdaysShort, V.$W, ue, 3);
                case "dddd":
                  return ue[V.$W];
                case "H":
                  return String(J);
                case "HH":
                  return A.s(J, 2, "0");
                case "h":
                  return ye(1);
                case "hh":
                  return ye(2);
                case "a":
                  return we(J, Z, !0);
                case "A":
                  return we(J, Z, !1);
                case "m":
                  return String(Z);
                case "mm":
                  return A.s(Z, 2, "0");
                case "s":
                  return String(V.$s);
                case "ss":
                  return A.s(V.$s, 2, "0");
                case "SSS":
                  return A.s(V.$ms, 3, "0");
                case "Z":
                  return z;
              }
              return null;
            })(ke) || z.replace(":", "");
          }));
        }, D.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, D.diff = function($, V, F) {
          var q, z = this, J = A.p(V), Z = P($), ce = (Z.utcOffset() - this.utcOffset()) * r, ue = this - Z, xe = function() {
            return A.m(z, Z);
          };
          switch (J) {
            case h:
              q = xe() / 12;
              break;
            case d:
              q = xe();
              break;
            case p:
              q = xe() / 3;
              break;
            case c:
              q = (ue - ce) / 6048e5;
              break;
            case u:
              q = (ue - ce) / 864e5;
              break;
            case l:
              q = ue / n;
              break;
            case s:
              q = ue / r;
              break;
            case i:
              q = ue / a;
              break;
            default:
              q = ue;
          }
          return F ? q : A.a(q);
        }, D.daysInMonth = function() {
          return this.endOf(d).$D;
        }, D.$locale = function() {
          return E[this.$L];
        }, D.locale = function($, V) {
          if (!$) return this.$L;
          var F = this.clone(), q = O($, V, !0);
          return q && (F.$L = q), F;
        }, D.clone = function() {
          return A.w(this.$d, this);
        }, D.toDate = function() {
          return new Date(this.valueOf());
        }, D.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, D.toISOString = function() {
          return this.$d.toISOString();
        }, D.toString = function() {
          return this.$d.toUTCString();
        }, M;
      })(), C = v.prototype;
      return P.prototype = C, [["$ms", o], ["$s", i], ["$m", s], ["$H", l], ["$W", u], ["$M", d], ["$y", h], ["$D", g]].forEach((function(M) {
        C[M[1]] = function(D) {
          return this.$g(D, M[0], M[1]);
        };
      })), P.extend = function(M, D) {
        return M.$i || (M(D, v, P), M.$i = !0), P;
      }, P.locale = O, P.isDayjs = W, P.unix = function(M) {
        return P(1e3 * M);
      }, P.en = E[x], P.Ls = E, P.p = {}, P;
    }));
  })(Oa)), Oa.exports;
}
var vb = gb();
const oo = /* @__PURE__ */ Or(vb);
var _a = { exports: {} }, bb = _a.exports, Hl;
function yb() {
  return Hl || (Hl = 1, (function(t, e) {
    (function(a, r) {
      t.exports = r();
    })(bb, (function() {
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
        for (var I = (y = w.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(P, A, v) {
          var C = v && v.toUpperCase();
          return A || k[v] || a[v] || k[C].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(M, D, $) {
            return D || $.slice(1);
          }));
        }))).match(r), f = I.length, x = 0; x < f; x += 1) {
          var E = I[x], L = g[E], W = L && L[0], O = L && L[1];
          I[x] = O ? { regex: W, parser: O } : E.replace(/^\[|\]$/g, "");
        }
        return function(P) {
          for (var A = {}, v = 0, C = 0; v < f; v += 1) {
            var M = I[v];
            if (typeof M == "string") C += M.length;
            else {
              var D = M.regex, $ = M.parser, V = P.slice(C), F = D.exec(V)[0];
              $.call(A, F), P = P.replace(F, "");
            }
          }
          return (function(q) {
            var z = q.afternoon;
            if (z !== void 0) {
              var J = q.hours;
              z ? J < 12 && (q.hours += 12) : J === 12 && (q.hours = 0), delete q.afternoon;
            }
          })(A), A;
        };
      }
      return function(y, w, k) {
        k.p.customParseFormat = !0, y && y.parseTwoDigitYear && (u = y.parseTwoDigitYear);
        var I = w.prototype, f = I.parse;
        I.parse = function(x) {
          var E = x.date, L = x.utc, W = x.args;
          this.$u = L;
          var O = W[1];
          if (typeof O == "string") {
            var P = W[2] === !0, A = W[3] === !0, v = P || A, C = W[2];
            A && (C = W[2]), l = this.$locale(), !P && C && (l = k.Ls[C]), this.$d = (function(V, F, q, z) {
              try {
                if (["x", "X"].indexOf(F) > -1) return new Date((F === "X" ? 1e3 : 1) * V);
                var J = m(F)(V), Z = J.year, ce = J.month, ue = J.day, xe = J.hours, de = J.minutes, be = J.seconds, ye = J.milliseconds, we = J.zone, ke = J.week, ge = /* @__PURE__ */ new Date(), Ee = ue || (Z || ce ? 1 : ge.getDate()), Ae = Z || ge.getFullYear(), _e = 0;
                Z && !ce || (_e = ce > 0 ? ce - 1 : ge.getMonth());
                var qe, Te = xe || 0, We = de || 0, Ke = be || 0, Ge = ye || 0;
                return we ? new Date(Date.UTC(Ae, _e, Ee, Te, We, Ke, Ge + 60 * we.offset * 1e3)) : q ? new Date(Date.UTC(Ae, _e, Ee, Te, We, Ke, Ge)) : (qe = new Date(Ae, _e, Ee, Te, We, Ke, Ge), ke && (qe = z(qe).week(ke).toDate()), qe);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(E, O, L, k), this.init(), C && C !== !0 && (this.$L = this.locale(C).$L), v && E != this.format(O) && (this.$d = /* @__PURE__ */ new Date("")), l = {};
          } else if (O instanceof Array) for (var M = O.length, D = 1; D <= M; D += 1) {
            W[1] = O[D - 1];
            var $ = k.apply(this, W);
            if ($.isValid()) {
              this.$d = $.$d, this.$L = $.$L, this.init();
              break;
            }
            D === M && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else f.call(this, x);
        };
      };
    }));
  })(_a)), _a.exports;
}
var xb = yb();
const Cb = /* @__PURE__ */ Or(xb);
var Pa = { exports: {} }, Sb = Pa.exports, Kl;
function wb() {
  return Kl || (Kl = 1, (function(t, e) {
    (function(a, r) {
      t.exports = r();
    })(Sb, (function() {
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
          var x = m[3], E = x === 24 ? 0 : x, L = m[0] + "-" + m[1] + "-" + m[2] + " " + E + ":" + m[4] + ":" + m[5] + ":000", W = +p;
          return (i.utc(L).valueOf() - (W -= W % 1e3)) / 6e4;
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
          var k = (function(E, L, W) {
            var O = E - 60 * L * 1e3, P = u(O, W);
            if (L === P) return [O, L];
            var A = u(O -= 60 * (P - L) * 1e3, W);
            return P === A ? [O, P] : [E - 60 * Math.min(P, A) * 1e3, Math.max(P, A)];
          })(i.utc(p, m).valueOf(), w, y), I = k[0], f = k[1], x = i(I).utcOffset(f);
          return x.$x.$timezone = y, x;
        }, i.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, i.tz.setDefault = function(p) {
          s = p;
        };
      };
    }));
  })(Pa)), Pa.exports;
}
var Eb = wb();
const kb = /* @__PURE__ */ Or(Eb);
var ja = { exports: {} }, $b = ja.exports, Ul;
function Rb() {
  return Ul || (Ul = 1, (function(t, e) {
    (function(a, r) {
      t.exports = r();
    })($b, (function() {
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
            var L = ("" + E[0]).match(n) || ["-", 0, 0], W = L[0], O = 60 * +L[1] + +L[2];
            return O === 0 ? 0 : W === "+" ? O : -O;
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
  })(ja)), ja.exports;
}
var Tb = Rb();
const Ob = /* @__PURE__ */ Or(Tb);
oo.extend(kb);
oo.extend(Ob);
oo.extend(Cb);
function _b(t, e, a = "HH:mm:ss") {
  return oo(t).tz(e).format(a);
}
var Rc;
const Pb = ((Rc = Intl.DateTimeFormat().resolvedOptions().timeZone) == null ? void 0 : Rc.toString()) || "UTC", jb = (t) => typeof t == "string" ? t === "" ? /* @__PURE__ */ new Date() : new Date(t) : t, Ib = (t, e = Pb) => {
  const a = jb(t);
  return `${_b(
    a,
    e,
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  )}`;
}, Ab = "INFO", Mb = "INFO", Nb = "WARN", Lb = "ERROR", Db = "FAILED", Bb = "SUCCEEDED", Du = ar(
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
      backgroundColor: Je("#ccd1f2", 1)
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
        background: Je("#E5E4E2", 1)
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
      backgroundColor: Je(t.palette.common.white, 0),
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
var Ia = { exports: {} }, Fb = Ia.exports, ql;
function zb() {
  return ql || (ql = 1, (function(t, e) {
    (function(a, r) {
      t.exports = r(ht);
    })(Fb, (function(a) {
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
          var m, y, w, k = p & d.F, I = p & d.G, f = p & d.S, x = p & d.P, E = p & d.B, L = p & d.W, W = I ? s : s[h] || (s[h] = {}), O = W.prototype, P = I ? i : f ? i[h] : (i[h] || {}).prototype;
          for (m in I && (g = h), g) (y = !k && P && P[m] !== void 0) && c(W, m) || (w = y ? P[m] : g[m], W[m] = I && typeof P[m] != "function" ? g[m] : E && y ? l(w, i) : L && P[m] == w ? (function(A) {
            var v = function(C, M, D) {
              if (this instanceof A) {
                switch (arguments.length) {
                  case 0:
                    return new A();
                  case 1:
                    return new A(C);
                  case 2:
                    return new A(C, M);
                }
                return new A(C, M, D);
              }
              return A.apply(this, arguments);
            };
            return v.prototype = A.prototype, v;
          })(w) : x && typeof w == "function" ? l(Function.call, w) : w, x && ((W.virtual || (W.virtual = {}))[m] = w, p & d.R && O && !O[m] && u(O, m, w)));
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
        r.exports = function(w, k, I, f, x, E, L) {
          d(I, k, f);
          var W, O, P, A = function(z) {
            if (!m && z in D) return D[z];
            switch (z) {
              case "keys":
              case "values":
                return function() {
                  return new I(this, z);
                };
            }
            return function() {
              return new I(this, z);
            };
          }, v = k + " Iterator", C = x == "values", M = !1, D = w.prototype, $ = D[g] || D["@@iterator"] || x && D[x], V = $ || A(x), F = x ? C ? A("entries") : V : void 0, q = k == "Array" && D.entries || $;
          if (q && (P = h(q.call(new w()))) !== Object.prototype && P.next && (p(P, v, !0), i || typeof P[g] == "function" || u(P, g, y)), C && $ && $.name !== "values" && (M = !0, V = function() {
            return $.call(this);
          }), i && !L || !m && !M && D[g] || u(D, g, V), c[k] = V, c[v] = y, x) if (W = { values: C ? V : A("values"), keys: E ? V : A("keys"), entries: F }, L) for (O in W) O in D || l(D, O, W[O]);
          else s(s.P + s.F * (m || M), k, W);
          return W;
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
          if (O != null) for (var A in O) Object.prototype.hasOwnProperty.call(O, A) && (P[A] = O[A]);
          return P.default = O, P;
        })(o(94)), p = y(o(132)), h = y(o(133)), g = y(o(138)), m = o(139);
        function y(O) {
          return O && O.__esModule ? O : { default: O };
        }
        var w = d.default, k = (0, u.default)(w), I = (0, g.default)(h.default, m.rgb2yuv, (function(O) {
          var P, A = (0, l.default)(O, 3), v = A[0], C = A[1], M = A[2];
          return [(P = v, P < 0.25 ? 1 : P < 0.5 ? 0.9 - P : 1.1 - P), C, M];
        }), m.yuv2rgb, p.default), f = function(O) {
          return function(P) {
            return { className: [P.className, O.className].filter(Boolean).join(" "), style: (0, s.default)({}, P.style || {}, O.style || {}) };
          };
        }, x = function(O, P) {
          var A = (0, u.default)(P);
          for (var v in O) A.indexOf(v) === -1 && A.push(v);
          return A.reduce((function(C, M) {
            return C[M] = (function(D, $) {
              if (D === void 0) return $;
              if ($ === void 0) return D;
              var V = D === void 0 ? "undefined" : (0, i.default)(D), F = $ === void 0 ? "undefined" : (0, i.default)($);
              switch (V) {
                case "string":
                  switch (F) {
                    case "string":
                      return [$, D].filter(Boolean).join(" ");
                    case "object":
                      return f({ className: D, style: $ });
                    case "function":
                      return function(q) {
                        for (var z = arguments.length, J = Array(z > 1 ? z - 1 : 0), Z = 1; Z < z; Z++) J[Z - 1] = arguments[Z];
                        return f({ className: D })($.apply(void 0, [q].concat(J)));
                      };
                  }
                case "object":
                  switch (F) {
                    case "string":
                      return f({ className: $, style: D });
                    case "object":
                      return (0, s.default)({}, $, D);
                    case "function":
                      return function(q) {
                        for (var z = arguments.length, J = Array(z > 1 ? z - 1 : 0), Z = 1; Z < z; Z++) J[Z - 1] = arguments[Z];
                        return f({ style: D })($.apply(void 0, [q].concat(J)));
                      };
                  }
                case "function":
                  switch (F) {
                    case "string":
                      return function(q) {
                        for (var z = arguments.length, J = Array(z > 1 ? z - 1 : 0), Z = 1; Z < z; Z++) J[Z - 1] = arguments[Z];
                        return D.apply(void 0, [f(q)({ className: $ })].concat(J));
                      };
                    case "object":
                      return function(q) {
                        for (var z = arguments.length, J = Array(z > 1 ? z - 1 : 0), Z = 1; Z < z; Z++) J[Z - 1] = arguments[Z];
                        return D.apply(void 0, [f(q)({ style: $ })].concat(J));
                      };
                    case "function":
                      return function(q) {
                        for (var z = arguments.length, J = Array(z > 1 ? z - 1 : 0), Z = 1; Z < z; Z++) J[Z - 1] = arguments[Z];
                        return D.apply(void 0, [$.apply(void 0, [q].concat(J))].concat(J));
                      };
                  }
              }
            })(O[M], P[M]), C;
          }), {});
        }, E = function(O, P) {
          for (var A = arguments.length, v = Array(A > 2 ? A - 2 : 0), C = 2; C < A; C++) v[C - 2] = arguments[C];
          if (P === null) return O;
          Array.isArray(P) || (P = [P]);
          var M = P.map((function($) {
            return O[$];
          })).filter(Boolean), D = M.reduce((function($, V) {
            return typeof V == "string" ? $.className = [$.className, V].filter(Boolean).join(" ") : (V === void 0 ? "undefined" : (0, i.default)(V)) === "object" ? $.style = (0, s.default)({}, $.style, V) : typeof V == "function" && ($ = (0, s.default)({}, $, V.apply(void 0, [$].concat(v)))), $;
          }), { className: "", style: {} });
          return D.className || delete D.className, (0, u.default)(D.style).length === 0 && delete D.style, D;
        }, L = n.invertTheme = function(O) {
          return (0, u.default)(O).reduce((function(P, A) {
            return P[A] = /^base/.test(A) ? I(O[A]) : A === "scheme" ? O[A] + ":inverted" : O[A], P;
          }), {});
        }, W = (n.createStyling = (0, c.default)((function(O) {
          for (var P = arguments.length, A = Array(P > 3 ? P - 3 : 0), v = 3; v < P; v++) A[v - 3] = arguments[v];
          var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, D = C.defaultBase16, $ = D === void 0 ? w : D, V = C.base16Themes, F = V === void 0 ? null : V, q = W(M, F);
          q && (M = (0, s.default)({}, q, M));
          var z = k.reduce((function(ue, xe) {
            return ue[xe] = M[xe] || $[xe], ue;
          }), {}), J = (0, u.default)(M).reduce((function(ue, xe) {
            return k.indexOf(xe) === -1 && (ue[xe] = M[xe]), ue;
          }), {}), Z = O(z), ce = x(J, Z);
          return (0, c.default)(E, 2).apply(void 0, [ce].concat(A));
        }), 3), n.getBase16Theme = function(O, P) {
          if (O && O.extend && (O = O.extend), typeof O == "string") {
            var A = O.split(":"), v = (0, l.default)(A, 2), C = v[0], M = v[1];
            O = (P || {})[C] || d[C], M === "inverted" && (O = L(O));
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
          return new Promise((function(E, L) {
            function W() {
              O !== void 0 && f.removeListener("error", O), E([].slice.call(arguments));
            }
            var O;
            x !== "error" && (O = function(P) {
              f.removeListener(x, W), L(P);
            }, f.once("error", O)), f.once(x, W);
          }));
        }, c.EventEmitter = c, c.prototype._events = void 0, c.prototype._eventsCount = 0, c.prototype._maxListeners = void 0;
        var d = 10;
        function p(f) {
          if (typeof f != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof f);
        }
        function h(f) {
          return f._maxListeners === void 0 ? c.defaultMaxListeners : f._maxListeners;
        }
        function g(f, x, E, L) {
          var W, O, P, A;
          if (p(E), (O = f._events) === void 0 ? (O = f._events = /* @__PURE__ */ Object.create(null), f._eventsCount = 0) : (O.newListener !== void 0 && (f.emit("newListener", x, E.listener ? E.listener : E), O = f._events), P = O[x]), P === void 0) P = O[x] = E, ++f._eventsCount;
          else if (typeof P == "function" ? P = O[x] = L ? [E, P] : [P, E] : L ? P.unshift(E) : P.push(E), (W = h(f)) > 0 && P.length > W && !P.warned) {
            P.warned = !0;
            var v = new Error("Possible EventEmitter memory leak detected. " + P.length + " " + String(x) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            v.name = "MaxListenersExceededWarning", v.emitter = f, v.type = x, v.count = P.length, A = v, console && console.warn && console.warn(A);
          }
          return f;
        }
        function m() {
          if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
        }
        function y(f, x, E) {
          var L = { fired: !1, wrapFn: void 0, target: f, type: x, listener: E }, W = m.bind(L);
          return W.listener = E, L.wrapFn = W, W;
        }
        function w(f, x, E) {
          var L = f._events;
          if (L === void 0) return [];
          var W = L[x];
          return W === void 0 ? [] : typeof W == "function" ? E ? [W.listener || W] : [W] : E ? (function(O) {
            for (var P = new Array(O.length), A = 0; A < P.length; ++A) P[A] = O[A].listener || O[A];
            return P;
          })(W) : I(W, W.length);
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
          for (var E = new Array(x), L = 0; L < x; ++L) E[L] = f[L];
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
          var L = f === "error", W = this._events;
          if (W !== void 0) L = L && W.error === void 0;
          else if (!L) return !1;
          if (L) {
            var O;
            if (x.length > 0 && (O = x[0]), O instanceof Error) throw O;
            var P = new Error("Unhandled error." + (O ? " (" + O.message + ")" : ""));
            throw P.context = O, P;
          }
          var A = W[f];
          if (A === void 0) return !1;
          if (typeof A == "function") l(A, this, x);
          else {
            var v = A.length, C = I(A, v);
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
          var E, L, W, O, P;
          if (p(x), (L = this._events) === void 0) return this;
          if ((E = L[f]) === void 0) return this;
          if (E === x || E.listener === x) --this._eventsCount == 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete L[f], L.removeListener && this.emit("removeListener", f, E.listener || x));
          else if (typeof E != "function") {
            for (W = -1, O = E.length - 1; O >= 0; O--) if (E[O] === x || E[O].listener === x) {
              P = E[O].listener, W = O;
              break;
            }
            if (W < 0) return this;
            W === 0 ? E.shift() : (function(A, v) {
              for (; v + 1 < A.length; v++) A[v] = A[v + 1];
              A.pop();
            })(E, W), E.length === 1 && (L[f] = E[0]), L.removeListener !== void 0 && this.emit("removeListener", f, P || x);
          }
          return this;
        }, c.prototype.off = c.prototype.removeListener, c.prototype.removeAllListeners = function(f) {
          var x, E, L;
          if ((E = this._events) === void 0) return this;
          if (E.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : E[f] !== void 0 && (--this._eventsCount == 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete E[f]), this;
          if (arguments.length === 0) {
            var W, O = Object.keys(E);
            for (L = 0; L < O.length; ++L) (W = O[L]) !== "removeListener" && this.removeAllListeners(W);
            return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
          }
          if (typeof (x = E[f]) == "function") this.removeListener(f, x);
          else if (x !== void 0) for (L = x.length - 1; L >= 0; L--) this.removeListener(f, x[L]);
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
        var i = o(3), s = o(5), l = o(4), u = o(15), c = o(37), d = o(68).KEY, p = o(8), h = o(26), g = o(28), m = o(17), y = o(2), w = o(30), k = o(31), I = o(69), f = o(70), x = o(10), E = o(11), L = o(18), W = o(9), O = o(23), P = o(16), A = o(38), v = o(71), C = o(72), M = o(32), D = o(7), $ = o(13), V = C.f, F = D.f, q = v.f, z = i.Symbol, J = i.JSON, Z = J && J.stringify, ce = y("_hidden"), ue = y("toPrimitive"), xe = {}.propertyIsEnumerable, de = h("symbol-registry"), be = h("symbols"), ye = h("op-symbols"), we = Object.prototype, ke = typeof z == "function" && !!M.f, ge = i.QObject, Ee = !ge || !ge.prototype || !ge.prototype.findChild, Ae = l && p((function() {
          return A(F({}, "a", { get: function() {
            return F(this, "a", { value: 7 }).a;
          } })).a != 7;
        })) ? function(U, te, oe) {
          var Ce = V(we, te);
          Ce && delete we[te], F(U, te, oe), Ce && U !== we && F(we, te, Ce);
        } : F, _e = function(U) {
          var te = be[U] = A(z.prototype);
          return te._k = U, te;
        }, qe = ke && typeof z.iterator == "symbol" ? function(U) {
          return typeof U == "symbol";
        } : function(U) {
          return U instanceof z;
        }, Te = function(U, te, oe) {
          return U === we && Te(ye, te, oe), x(U), te = O(te, !0), x(oe), s(be, te) ? (oe.enumerable ? (s(U, ce) && U[ce][te] && (U[ce][te] = !1), oe = A(oe, { enumerable: P(0, !1) })) : (s(U, ce) || F(U, ce, P(1, {})), U[ce][te] = !0), Ae(U, te, oe)) : F(U, te, oe);
        }, We = function(U, te) {
          x(U);
          for (var oe, Ce = I(te = W(te)), Le = 0, Se = Ce.length; Se > Le; ) Te(U, oe = Ce[Le++], te[oe]);
          return U;
        }, Ke = function(U) {
          var te = xe.call(this, U = O(U, !0));
          return !(this === we && s(be, U) && !s(ye, U)) && (!(te || !s(this, U) || !s(be, U) || s(this, ce) && this[ce][U]) || te);
        }, Ge = function(U, te) {
          if (U = W(U), te = O(te, !0), U !== we || !s(be, te) || s(ye, te)) {
            var oe = V(U, te);
            return !oe || !s(be, te) || s(U, ce) && U[ce][te] || (oe.enumerable = !0), oe;
          }
        }, fe = function(U) {
          for (var te, oe = q(W(U)), Ce = [], Le = 0; oe.length > Le; ) s(be, te = oe[Le++]) || te == ce || te == d || Ce.push(te);
          return Ce;
        }, pe = function(U) {
          for (var te, oe = U === we, Ce = q(oe ? ye : W(U)), Le = [], Se = 0; Ce.length > Se; ) !s(be, te = Ce[Se++]) || oe && !s(we, te) || Le.push(be[te]);
          return Le;
        };
        ke || (c((z = function() {
          if (this instanceof z) throw TypeError("Symbol is not a constructor!");
          var U = m(arguments.length > 0 ? arguments[0] : void 0), te = function(oe) {
            this === we && te.call(ye, oe), s(this, ce) && s(this[ce], U) && (this[ce][U] = !1), Ae(this, U, P(1, oe));
          };
          return l && Ee && Ae(we, U, { configurable: !0, set: te }), _e(U);
        }).prototype, "toString", (function() {
          return this._k;
        })), C.f = Ge, D.f = Te, o(41).f = v.f = fe, o(19).f = Ke, M.f = pe, l && !o(14) && c(we, "propertyIsEnumerable", Ke, !0), w.f = function(U) {
          return _e(y(U));
        }), u(u.G + u.W + u.F * !ke, { Symbol: z });
        for (var je = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), Ie = 0; je.length > Ie; ) y(je[Ie++]);
        for (var Ve = $(y.store), ee = 0; Ve.length > ee; ) k(Ve[ee++]);
        u(u.S + u.F * !ke, "Symbol", { for: function(U) {
          return s(de, U += "") ? de[U] : de[U] = z(U);
        }, keyFor: function(U) {
          if (!qe(U)) throw TypeError(U + " is not a symbol!");
          for (var te in de) if (de[te] === U) return te;
        }, useSetter: function() {
          Ee = !0;
        }, useSimple: function() {
          Ee = !1;
        } }), u(u.S + u.F * !ke, "Object", { create: function(U, te) {
          return te === void 0 ? A(U) : We(A(U), te);
        }, defineProperty: Te, defineProperties: We, getOwnPropertyDescriptor: Ge, getOwnPropertyNames: fe, getOwnPropertySymbols: pe });
        var K = p((function() {
          M.f(1);
        }));
        u(u.S + u.F * K, "Object", { getOwnPropertySymbols: function(U) {
          return M.f(L(U));
        } }), J && u(u.S + u.F * (!ke || p((function() {
          var U = z();
          return Z([U]) != "[null]" || Z({ a: U }) != "{}" || Z(Object(U)) != "{}";
        }))), "JSON", { stringify: function(U) {
          for (var te, oe, Ce = [U], Le = 1; arguments.length > Le; ) Ce.push(arguments[Le++]);
          if (oe = te = Ce[1], (E(te) || U !== void 0) && !qe(U)) return f(te) || (te = function(Se, me) {
            if (typeof oe == "function" && (me = oe.call(this, Se, me)), !qe(me)) return me;
          }), Ce[1] = te, Z.apply(J, Ce);
        } }), z.prototype[ue] || o(6)(z.prototype, ue, z.prototype.valueOf), g(z, "Symbol"), g(Math, "Math", !0), g(i.JSON, "JSON", !0);
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
          for (var m = c(h), y = arguments.length, w = 1, k = l.f, I = u.f; y > w; ) for (var f, x = d(arguments[w++]), E = k ? s(x).concat(k(x)) : s(x), L = E.length, W = 0; L > W; ) f = E[W++], i && !I.call(x, f) || (m[f] = x[f]);
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
          function x(ee, K, U) {
            switch (U.length) {
              case 0:
                return ee.call(K);
              case 1:
                return ee.call(K, U[0]);
              case 2:
                return ee.call(K, U[0], U[1]);
              case 3:
                return ee.call(K, U[0], U[1], U[2]);
            }
            return ee.apply(K, U);
          }
          function E(ee, K) {
            return !!(ee && ee.length) && (function(U, te, oe) {
              if (te != te) return (function(Se, me, Fe, He) {
                for (var Pe = Se.length, ie = Fe + -1; ++ie < Pe; ) if (me(Se[ie], ie, Se)) return ie;
                return -1;
              })(U, L, oe);
              for (var Ce = oe - 1, Le = U.length; ++Ce < Le; ) if (U[Ce] === te) return Ce;
              return -1;
            })(ee, K, 0) > -1;
          }
          function L(ee) {
            return ee != ee;
          }
          function W(ee, K) {
            for (var U = ee.length, te = 0; U--; ) ee[U] === K && te++;
            return te;
          }
          function O(ee, K) {
            for (var U = -1, te = ee.length, oe = 0, Ce = []; ++U < te; ) {
              var Le = ee[U];
              Le !== K && Le !== "__lodash_placeholder__" || (ee[U] = "__lodash_placeholder__", Ce[oe++] = U);
            }
            return Ce;
          }
          var P, A, v, C = Function.prototype, M = Object.prototype, D = f["__core-js_shared__"], $ = (P = /[^.]+$/.exec(D && D.keys && D.keys.IE_PROTO || "")) ? "Symbol(src)_1." + P : "", V = C.toString, F = M.hasOwnProperty, q = M.toString, z = RegExp("^" + V.call(F).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), J = Object.create, Z = Math.max, ce = Math.min, ue = (A = _e(Object, "defineProperty"), (v = _e.name) && v.length > 2 ? A : void 0);
          function xe(ee) {
            return je(ee) ? J(ee) : {};
          }
          function de(ee) {
            return !(!je(ee) || (function(K) {
              return !!$ && $ in K;
            })(ee)) && ((function(K) {
              var U = je(K) ? q.call(K) : "";
              return U == "[object Function]" || U == "[object GeneratorFunction]";
            })(ee) || (function(K) {
              var U = !1;
              if (K != null && typeof K.toString != "function") try {
                U = !!(K + "");
              } catch {
              }
              return U;
            })(ee) ? z : g).test((function(K) {
              if (K != null) {
                try {
                  return V.call(K);
                } catch {
                }
                try {
                  return K + "";
                } catch {
                }
              }
              return "";
            })(ee));
          }
          function be(ee, K, U, te) {
            for (var oe = -1, Ce = ee.length, Le = U.length, Se = -1, me = K.length, Fe = Z(Ce - Le, 0), He = Array(me + Fe), Pe = !te; ++Se < me; ) He[Se] = K[Se];
            for (; ++oe < Le; ) (Pe || oe < Ce) && (He[U[oe]] = ee[oe]);
            for (; Fe--; ) He[Se++] = ee[oe++];
            return He;
          }
          function ye(ee, K, U, te) {
            for (var oe = -1, Ce = ee.length, Le = -1, Se = U.length, me = -1, Fe = K.length, He = Z(Ce - Se, 0), Pe = Array(He + Fe), ie = !te; ++oe < He; ) Pe[oe] = ee[oe];
            for (var $e = oe; ++me < Fe; ) Pe[$e + me] = K[me];
            for (; ++Le < Se; ) (ie || oe < Ce) && (Pe[$e + U[Le]] = ee[oe++]);
            return Pe;
          }
          function we(ee) {
            return function() {
              var K = arguments;
              switch (K.length) {
                case 0:
                  return new ee();
                case 1:
                  return new ee(K[0]);
                case 2:
                  return new ee(K[0], K[1]);
                case 3:
                  return new ee(K[0], K[1], K[2]);
                case 4:
                  return new ee(K[0], K[1], K[2], K[3]);
                case 5:
                  return new ee(K[0], K[1], K[2], K[3], K[4]);
                case 6:
                  return new ee(K[0], K[1], K[2], K[3], K[4], K[5]);
                case 7:
                  return new ee(K[0], K[1], K[2], K[3], K[4], K[5], K[6]);
              }
              var U = xe(ee.prototype), te = ee.apply(U, K);
              return je(te) ? te : U;
            };
          }
          function ke(ee, K, U, te, oe, Ce, Le, Se, me, Fe) {
            var He = 128 & K, Pe = 1 & K, ie = 2 & K, $e = 24 & K, Ye = 512 & K, Qe = ie ? void 0 : we(ee);
            return function at() {
              for (var De = arguments.length, Be = Array(De), mt = De; mt--; ) Be[mt] = arguments[mt];
              if ($e) var ot = Ae(at), rt = W(Be, ot);
              if (te && (Be = be(Be, te, oe, $e)), Ce && (Be = ye(Be, Ce, Le, $e)), De -= rt, $e && De < Fe) {
                var et = O(Be, ot);
                return ge(ee, K, ke, at.placeholder, U, Be, et, Se, me, Fe - De);
              }
              var bt = Pe ? U : this, Nt = ie ? bt[ee] : ee;
              return De = Be.length, Se ? Be = Ke(Be, Se) : Ye && De > 1 && Be.reverse(), He && me < De && (Be.length = me), this && this !== f && this instanceof at && (Nt = Qe || we(Nt)), Nt.apply(bt, Be);
            };
          }
          function ge(ee, K, U, te, oe, Ce, Le, Se, me, Fe) {
            var He = 8 & K;
            K |= He ? 32 : 64, 4 & (K &= ~(He ? 64 : 32)) || (K &= -4);
            var Pe = U(ee, K, oe, He ? Ce : void 0, He ? Le : void 0, He ? void 0 : Ce, He ? void 0 : Le, Se, me, Fe);
            return Pe.placeholder = te, Ge(Pe, ee, K);
          }
          function Ee(ee, K, U, te, oe, Ce, Le, Se) {
            var me = 2 & K;
            if (!me && typeof ee != "function") throw new TypeError("Expected a function");
            var Fe = te ? te.length : 0;
            if (Fe || (K &= -97, te = oe = void 0), Le = Le === void 0 ? Le : Z(Ve(Le), 0), Se = Se === void 0 ? Se : Ve(Se), Fe -= oe ? oe.length : 0, 64 & K) {
              var He = te, Pe = oe;
              te = oe = void 0;
            }
            var ie = [ee, K, U, te, oe, He, Pe, Ce, Le, Se];
            if (ee = ie[0], K = ie[1], U = ie[2], te = ie[3], oe = ie[4], !(Se = ie[9] = ie[9] == null ? me ? 0 : ee.length : Z(ie[9] - Fe, 0)) && 24 & K && (K &= -25), K && K != 1) $e = K == 8 || K == 16 ? (function(Ye, Qe, at) {
              var De = we(Ye);
              return function Be() {
                for (var mt = arguments.length, ot = Array(mt), rt = mt, et = Ae(Be); rt--; ) ot[rt] = arguments[rt];
                var bt = mt < 3 && ot[0] !== et && ot[mt - 1] !== et ? [] : O(ot, et);
                if ((mt -= bt.length) < at) return ge(Ye, Qe, ke, Be.placeholder, void 0, ot, bt, void 0, void 0, at - mt);
                var Nt = this && this !== f && this instanceof Be ? De : Ye;
                return x(Nt, this, ot);
              };
            })(ee, K, Se) : K != 32 && K != 33 || oe.length ? ke.apply(void 0, ie) : (function(Ye, Qe, at, De) {
              var Be = 1 & Qe, mt = we(Ye);
              return function ot() {
                for (var rt = -1, et = arguments.length, bt = -1, Nt = De.length, Lt = Array(Nt + et), Pr = this && this !== f && this instanceof ot ? mt : Ye; ++bt < Nt; ) Lt[bt] = De[bt];
                for (; et--; ) Lt[bt++] = arguments[++rt];
                return x(Pr, Be ? at : this, Lt);
              };
            })(ee, K, U, te);
            else var $e = (function(Ye, Qe, at) {
              var De = 1 & Qe, Be = we(Ye);
              return function mt() {
                var ot = this && this !== f && this instanceof mt ? Be : Ye;
                return ot.apply(De ? at : this, arguments);
              };
            })(ee, K, U);
            return Ge($e, ee, K);
          }
          function Ae(ee) {
            return ee.placeholder;
          }
          function _e(ee, K) {
            var U = (function(te, oe) {
              return te == null ? void 0 : te[oe];
            })(ee, K);
            return de(U) ? U : void 0;
          }
          function qe(ee) {
            var K = ee.match(c);
            return K ? K[1].split(d) : [];
          }
          function Te(ee, K) {
            var U = K.length, te = U - 1;
            return K[te] = (U > 1 ? "& " : "") + K[te], K = K.join(U > 2 ? ", " : " "), ee.replace(u, `{
/* [wrapped with ` + K + `] */
`);
          }
          function We(ee, K) {
            return !!(K = K ?? 9007199254740991) && (typeof ee == "number" || y.test(ee)) && ee > -1 && ee % 1 == 0 && ee < K;
          }
          function Ke(ee, K) {
            for (var U = ee.length, te = ce(K.length, U), oe = (function(Le, Se) {
              var me = -1, Fe = Le.length;
              for (Se || (Se = Array(Fe)); ++me < Fe; ) Se[me] = Le[me];
              return Se;
            })(ee); te--; ) {
              var Ce = K[te];
              ee[te] = We(Ce, U) ? oe[Ce] : void 0;
            }
            return ee;
          }
          var Ge = ue ? function(ee, K, U) {
            var te, oe = K + "";
            return ue(ee, "toString", { configurable: !0, enumerable: !1, value: (te = Te(oe, fe(qe(oe), U)), function() {
              return te;
            }) });
          } : function(ee) {
            return ee;
          };
          function fe(ee, K) {
            return (function(U, te) {
              for (var oe = -1, Ce = U ? U.length : 0; ++oe < Ce && te(U[oe], oe, U) !== !1; ) ;
            })(s, (function(U) {
              var te = "_." + U[0];
              K & U[1] && !E(ee, te) && ee.push(te);
            })), ee.sort();
          }
          function pe(ee, K, U) {
            var te = Ee(ee, 8, void 0, void 0, void 0, void 0, void 0, K = U ? void 0 : K);
            return te.placeholder = pe.placeholder, te;
          }
          function je(ee) {
            var K = typeof ee;
            return !!ee && (K == "object" || K == "function");
          }
          function Ie(ee) {
            return ee ? (ee = (function(K) {
              if (typeof K == "number") return K;
              if ((function(oe) {
                return typeof oe == "symbol" || /* @__PURE__ */ (function(Ce) {
                  return !!Ce && typeof Ce == "object";
                })(oe) && q.call(oe) == "[object Symbol]";
              })(K)) return NaN;
              if (je(K)) {
                var U = typeof K.valueOf == "function" ? K.valueOf() : K;
                K = je(U) ? U + "" : U;
              }
              if (typeof K != "string") return K === 0 ? K : +K;
              K = K.replace(l, "");
              var te = h.test(K);
              return te || m.test(K) ? w(K.slice(2), te ? 2 : 8) : p.test(K) ? NaN : +K;
            })(ee)) === 1 / 0 || ee === -1 / 0 ? 17976931348623157e292 * (ee < 0 ? -1 : 1) : ee == ee ? ee : 0 : ee === 0 ? ee : 0;
          }
          function Ve(ee) {
            var K = Ie(ee), U = K % 1;
            return K == K ? U ? K - U : K : 0;
          }
          pe.placeholder = {}, r.exports = pe;
        }).call(this, o(43));
      }, function(r, n, o) {
        function i(ye) {
          return ye && ye.__esModule ? ye.default : ye;
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
        var L = o(111);
        n.embers = i(L);
        var W = o(112);
        n.flat = i(W);
        var O = o(113);
        n.google = i(O);
        var P = o(114);
        n.grayscale = i(P);
        var A = o(115);
        n.greenscreen = i(A);
        var v = o(116);
        n.harmonic = i(v);
        var C = o(117);
        n.hopscotch = i(C);
        var M = o(118);
        n.isotope = i(M);
        var D = o(119);
        n.marrakesh = i(D);
        var $ = o(120);
        n.mocha = i($);
        var V = o(121);
        n.monokai = i(V);
        var F = o(122);
        n.ocean = i(F);
        var q = o(123);
        n.paraiso = i(q);
        var z = o(124);
        n.pop = i(z);
        var J = o(125);
        n.railscasts = i(J);
        var Z = o(126);
        n.shapeshifter = i(Z);
        var ce = o(127);
        n.solarized = i(ce);
        var ue = o(128);
        n.summerfruit = i(ue);
        var xe = o(129);
        n.tomorrow = i(xe);
        var de = o(130);
        n.tube = i(de);
        var be = o(131);
        n.twilight = i(be);
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
          function c(O, P, A) {
            switch (A.length) {
              case 0:
                return O.call(P);
              case 1:
                return O.call(P, A[0]);
              case 2:
                return O.call(P, A[0], A[1]);
              case 3:
                return O.call(P, A[0], A[1], A[2]);
            }
            return O.apply(P, A);
          }
          function d(O, P) {
            for (var A = -1, v = P.length, C = O.length; ++A < v; ) O[C + A] = P[A];
            return O;
          }
          var p = Object.prototype, h = p.hasOwnProperty, g = p.toString, m = u.Symbol, y = p.propertyIsEnumerable, w = m ? m.isConcatSpreadable : void 0, k = Math.max;
          function I(O) {
            return f(O) || (function(P) {
              return (function(A) {
                return /* @__PURE__ */ (function(v) {
                  return !!v && typeof v == "object";
                })(A) && (function(v) {
                  return v != null && (function(C) {
                    return typeof C == "number" && C > -1 && C % 1 == 0 && C <= 9007199254740991;
                  })(v.length) && !(function(C) {
                    var M = (function(D) {
                      var $ = typeof D;
                      return !!D && ($ == "object" || $ == "function");
                    })(C) ? g.call(C) : "";
                    return M == "[object Function]" || M == "[object GeneratorFunction]";
                  })(v);
                })(A);
              })(P) && h.call(P, "callee") && (!y.call(P, "callee") || g.call(P) == "[object Arguments]");
            })(O) || !!(w && O && O[w]);
          }
          var f = Array.isArray, x, E, L, W = (E = function(O) {
            var P = (O = (function(C, M, D, $, V) {
              var F = -1, q = C.length;
              for (D || (D = I), V || (V = []); ++F < q; ) {
                var z = C[F];
                D(z) ? d(V, z) : V[V.length] = z;
              }
              return V;
            })(O)).length, A = P;
            for (x; A--; ) if (typeof O[A] != "function") throw new TypeError("Expected a function");
            return function() {
              for (var v = 0, C = P ? O[v].apply(this, arguments) : arguments[0]; ++v < P; ) C = O[v].call(this, C);
              return C;
            };
          }, L = k(L === void 0 ? E.length - 1 : L, 0), function() {
            for (var O = arguments, P = -1, A = k(O.length - L, 0), v = Array(A); ++P < A; ) v[P] = O[L + P];
            P = -1;
            for (var C = Array(L + 1); ++P < L; ) C[P] = O[P];
            return C[L] = v, c(E, this, C);
          });
          r.exports = W;
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
        function i(j, N, S) {
          return N in j ? Object.defineProperty(j, N, { value: S, enumerable: !0, configurable: !0, writable: !0 }) : j[N] = S, j;
        }
        function s(j, N) {
          var S = Object.keys(j);
          if (Object.getOwnPropertySymbols) {
            var R = Object.getOwnPropertySymbols(j);
            N && (R = R.filter((function(_) {
              return Object.getOwnPropertyDescriptor(j, _).enumerable;
            }))), S.push.apply(S, R);
          }
          return S;
        }
        function l(j) {
          for (var N = 1; N < arguments.length; N++) {
            var S = arguments[N] != null ? arguments[N] : {};
            N % 2 ? s(Object(S), !0).forEach((function(R) {
              i(j, R, S[R]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(j, Object.getOwnPropertyDescriptors(S)) : s(Object(S)).forEach((function(R) {
              Object.defineProperty(j, R, Object.getOwnPropertyDescriptor(S, R));
            }));
          }
          return j;
        }
        function u(j, N) {
          if (!(j instanceof N)) throw new TypeError("Cannot call a class as a function");
        }
        function c(j, N) {
          for (var S = 0; S < N.length; S++) {
            var R = N[S];
            R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(j, R.key, R);
          }
        }
        function d(j, N, S) {
          return N && c(j.prototype, N), S && c(j, S), j;
        }
        function p(j, N) {
          return (p = Object.setPrototypeOf || function(S, R) {
            return S.__proto__ = R, S;
          })(j, N);
        }
        function h(j, N) {
          if (typeof N != "function" && N !== null) throw new TypeError("Super expression must either be null or a function");
          j.prototype = Object.create(N && N.prototype, { constructor: { value: j, writable: !0, configurable: !0 } }), N && p(j, N);
        }
        function g(j) {
          return (g = Object.setPrototypeOf ? Object.getPrototypeOf : function(N) {
            return N.__proto__ || Object.getPrototypeOf(N);
          })(j);
        }
        function m(j) {
          return (m = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(N) {
            return typeof N;
          } : function(N) {
            return N && typeof Symbol == "function" && N.constructor === Symbol && N !== Symbol.prototype ? "symbol" : typeof N;
          })(j);
        }
        function y(j) {
          if (j === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return j;
        }
        function w(j, N) {
          return !N || m(N) !== "object" && typeof N != "function" ? y(j) : N;
        }
        function k(j) {
          var N = (function() {
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
            var S, R = g(j);
            if (N) {
              var _ = g(this).constructor;
              S = Reflect.construct(R, arguments, _);
            } else S = R.apply(this, arguments);
            return w(this, S);
          };
        }
        o.r(n);
        var I = o(0), f = o.n(I);
        function x() {
          var j = this.constructor.getDerivedStateFromProps(this.props, this.state);
          j != null && this.setState(j);
        }
        function E(j) {
          this.setState((function(N) {
            var S = this.constructor.getDerivedStateFromProps(j, N);
            return S ?? null;
          }).bind(this));
        }
        function L(j, N) {
          try {
            var S = this.props, R = this.state;
            this.props = j, this.state = N, this.__reactInternalSnapshotFlag = !0, this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(S, R);
          } finally {
            this.props = S, this.state = R;
          }
        }
        function W(j) {
          var N = j.prototype;
          if (!N || !N.isReactComponent) throw new Error("Can only polyfill class components");
          if (typeof j.getDerivedStateFromProps != "function" && typeof N.getSnapshotBeforeUpdate != "function") return j;
          var S = null, R = null, _ = null;
          if (typeof N.componentWillMount == "function" ? S = "componentWillMount" : typeof N.UNSAFE_componentWillMount == "function" && (S = "UNSAFE_componentWillMount"), typeof N.componentWillReceiveProps == "function" ? R = "componentWillReceiveProps" : typeof N.UNSAFE_componentWillReceiveProps == "function" && (R = "UNSAFE_componentWillReceiveProps"), typeof N.componentWillUpdate == "function" ? _ = "componentWillUpdate" : typeof N.UNSAFE_componentWillUpdate == "function" && (_ = "UNSAFE_componentWillUpdate"), S !== null || R !== null || _ !== null) {
            var G = j.displayName || j.name, re = typeof j.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            throw Error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

` + G + " uses " + re + " but also contains the following legacy lifecycles:" + (S !== null ? `
  ` + S : "") + (R !== null ? `
  ` + R : "") + (_ !== null ? `
  ` + _ : "") + `

The above lifecycles should be removed. Learn more about this warning here:
https://fb.me/react-async-component-lifecycle-hooks`);
          }
          if (typeof j.getDerivedStateFromProps == "function" && (N.componentWillMount = x, N.componentWillReceiveProps = E), typeof N.getSnapshotBeforeUpdate == "function") {
            if (typeof N.componentDidUpdate != "function") throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");
            N.componentWillUpdate = L;
            var Q = N.componentDidUpdate;
            N.componentDidUpdate = function(H, se, Oe) {
              var Ze = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : Oe;
              Q.call(this, H, se, Ze);
            };
          }
          return j;
        }
        function O(j, N) {
          if (j == null) return {};
          var S, R, _ = (function(re, Q) {
            if (re == null) return {};
            var H, se, Oe = {}, Ze = Object.keys(re);
            for (se = 0; se < Ze.length; se++) H = Ze[se], Q.indexOf(H) >= 0 || (Oe[H] = re[H]);
            return Oe;
          })(j, N);
          if (Object.getOwnPropertySymbols) {
            var G = Object.getOwnPropertySymbols(j);
            for (R = 0; R < G.length; R++) S = G[R], N.indexOf(S) >= 0 || Object.prototype.propertyIsEnumerable.call(j, S) && (_[S] = j[S]);
          }
          return _;
        }
        function P(j) {
          var N = (function(S) {
            return {}.toString.call(S).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
          })(j);
          return N === "number" && (N = isNaN(j) ? "nan" : (0 | j) != j ? "float" : "integer"), N;
        }
        x.__suppressDeprecationWarning = !0, E.__suppressDeprecationWarning = !0, L.__suppressDeprecationWarning = !0;
        var A = { scheme: "rjv-default", author: "mac gainor", base00: "rgba(0, 0, 0, 0)", base01: "rgb(245, 245, 245)", base02: "rgb(235, 235, 235)", base03: "#93a1a1", base04: "rgba(0, 0, 0, 0.3)", base05: "#586e75", base06: "#073642", base07: "#002b36", base08: "#d33682", base09: "#cb4b16", base0A: "#dc322f", base0B: "#859900", base0C: "#6c71c4", base0D: "#586e75", base0E: "#2aa198", base0F: "#268bd2" }, v = { scheme: "rjv-grey", author: "mac gainor", base00: "rgba(1, 1, 1, 0)", base01: "rgba(1, 1, 1, 0.1)", base02: "rgba(0, 0, 0, 0.2)", base03: "rgba(1, 1, 1, 0.3)", base04: "rgba(0, 0, 0, 0.4)", base05: "rgba(1, 1, 1, 0.5)", base06: "rgba(1, 1, 1, 0.6)", base07: "rgba(1, 1, 1, 0.7)", base08: "rgba(1, 1, 1, 0.8)", base09: "rgba(1, 1, 1, 0.8)", base0A: "rgba(1, 1, 1, 0.8)", base0B: "rgba(1, 1, 1, 0.8)", base0C: "rgba(1, 1, 1, 0.8)", base0D: "rgba(1, 1, 1, 0.8)", base0E: "rgba(1, 1, 1, 0.8)", base0F: "rgba(1, 1, 1, 0.8)" }, C = { globalFontFamily: "monospace", globalCursor: "default", braceFontWeight: "bold", braceCursor: "pointer", ellipsisFontSize: "18px", ellipsisLineHeight: "10px", ellipsisCursor: "pointer", keyMargin: "0px 5px", keyLetterSpacing: "0.5px", keyFontStyle: "none", keyVerticalAlign: "top", keyOpacity: "0.85", keyOpacityHover: "1", keyValPaddingTop: "3px", keyValPaddingBottom: "3px", keyValPaddingRight: "5px", keyValBorderLeft: "1px solid", keyValBorderHover: "2px solid", pushedContentMarginLeft: "6px", variableValuePaddingRight: "6px", nullFontSize: "11px", nullFontWeight: "bold", nullPadding: "1px 2px", nullBorderRadius: "3px", nanFontSize: "11px", nanFontWeight: "bold", nanPadding: "1px 2px", nanBorderRadius: "3px", undefinedFontSize: "11px", undefinedPadding: "1px 2px", undefinedBorderRadius: "3px", dataTypeFontSize: "11px", dataTypeMarginRight: "4px", datatypeOpacity: "0.8", objectSizeBorderRadius: "3px", objectSizeFontStyle: "italic", objectSizeMargin: "0px 6px 0px 0px", clipboardCursor: "pointer", clipboardCheckMarginLeft: "-12px", metaDataPadding: "0px 0px 0px 10px", arrayGroupMetaPadding: "0px 0px 0px 4px", iconContainerWidth: "17px", tooltipPadding: "4px", editInputMinWidth: "130px", editInputBorderRadius: "2px", editInputPadding: "5px", editInputMarginRight: "4px", editInputFontFamily: "monospace", iconCursor: "pointer", iconFontSize: "15px", iconPaddingRight: "1px", dateValueMarginLeft: "2px", iconMarginRight: "3px", detectedRowPaddingTop: "3px", addKeyCoverBackground: "rgba(255, 255, 255, 0.3)", addKeyCoverPosition: "absolute", addKeyCoverPositionPx: "0px", addKeyModalWidth: "200px", addKeyModalMargin: "auto", addKeyModalPadding: "10px", addKeyModalRadius: "3px" }, M = o(45), D = function(j) {
          var N = (function(S) {
            return { backgroundColor: S.base00, ellipsisColor: S.base09, braceColor: S.base07, expandedIcon: S.base0D, collapsedIcon: S.base0E, keyColor: S.base07, arrayKeyColor: S.base0C, objectSize: S.base04, copyToClipboard: S.base0F, copyToClipboardCheck: S.base0D, objectBorder: S.base02, dataTypes: { boolean: S.base0E, date: S.base0D, float: S.base0B, function: S.base0D, integer: S.base0F, string: S.base09, nan: S.base08, null: S.base0A, undefined: S.base05, regexp: S.base0A, background: S.base02 }, editVariable: { editIcon: S.base0E, cancelIcon: S.base09, removeIcon: S.base09, addIcon: S.base0E, checkIcon: S.base0E, background: S.base01, color: S.base0A, border: S.base07 }, addKeyModal: { background: S.base05, border: S.base04, color: S.base0A, labelColor: S.base01 }, validationFailure: { background: S.base09, iconColor: S.base01, fontColor: S.base01 } };
          })(j);
          return { "app-container": { fontFamily: C.globalFontFamily, cursor: C.globalCursor, backgroundColor: N.backgroundColor, position: "relative" }, ellipsis: { display: "inline-block", color: N.ellipsisColor, fontSize: C.ellipsisFontSize, lineHeight: C.ellipsisLineHeight, cursor: C.ellipsisCursor }, "brace-row": { display: "inline-block", cursor: "pointer" }, brace: { display: "inline-block", cursor: C.braceCursor, fontWeight: C.braceFontWeight, color: N.braceColor }, "expanded-icon": { color: N.expandedIcon }, "collapsed-icon": { color: N.collapsedIcon }, colon: { display: "inline-block", margin: C.keyMargin, color: N.keyColor, verticalAlign: "top" }, objectKeyVal: function(S, R) {
            return { style: l({ paddingTop: C.keyValPaddingTop, paddingRight: C.keyValPaddingRight, paddingBottom: C.keyValPaddingBottom, borderLeft: C.keyValBorderLeft + " " + N.objectBorder, ":hover": { paddingLeft: R.paddingLeft - 1 + "px", borderLeft: C.keyValBorderHover + " " + N.objectBorder } }, R) };
          }, "object-key-val-no-border": { padding: C.keyValPadding }, "pushed-content": { marginLeft: C.pushedContentMarginLeft }, variableValue: function(S, R) {
            return { style: l({ display: "inline-block", paddingRight: C.variableValuePaddingRight, position: "relative" }, R) };
          }, "object-name": { display: "inline-block", color: N.keyColor, letterSpacing: C.keyLetterSpacing, fontStyle: C.keyFontStyle, verticalAlign: C.keyVerticalAlign, opacity: C.keyOpacity, ":hover": { opacity: C.keyOpacityHover } }, "array-key": { display: "inline-block", color: N.arrayKeyColor, letterSpacing: C.keyLetterSpacing, fontStyle: C.keyFontStyle, verticalAlign: C.keyVerticalAlign, opacity: C.keyOpacity, ":hover": { opacity: C.keyOpacityHover } }, "object-size": { color: N.objectSize, borderRadius: C.objectSizeBorderRadius, fontStyle: C.objectSizeFontStyle, margin: C.objectSizeMargin, cursor: "default" }, "data-type-label": { fontSize: C.dataTypeFontSize, marginRight: C.dataTypeMarginRight, opacity: C.datatypeOpacity }, boolean: { display: "inline-block", color: N.dataTypes.boolean }, date: { display: "inline-block", color: N.dataTypes.date }, "date-value": { marginLeft: C.dateValueMarginLeft }, float: { display: "inline-block", color: N.dataTypes.float }, function: { display: "inline-block", color: N.dataTypes.function, cursor: "pointer", whiteSpace: "pre-line" }, "function-value": { fontStyle: "italic" }, integer: { display: "inline-block", color: N.dataTypes.integer }, string: { display: "inline-block", color: N.dataTypes.string }, nan: { display: "inline-block", color: N.dataTypes.nan, fontSize: C.nanFontSize, fontWeight: C.nanFontWeight, backgroundColor: N.dataTypes.background, padding: C.nanPadding, borderRadius: C.nanBorderRadius }, null: { display: "inline-block", color: N.dataTypes.null, fontSize: C.nullFontSize, fontWeight: C.nullFontWeight, backgroundColor: N.dataTypes.background, padding: C.nullPadding, borderRadius: C.nullBorderRadius }, undefined: { display: "inline-block", color: N.dataTypes.undefined, fontSize: C.undefinedFontSize, padding: C.undefinedPadding, borderRadius: C.undefinedBorderRadius, backgroundColor: N.dataTypes.background }, regexp: { display: "inline-block", color: N.dataTypes.regexp }, "copy-to-clipboard": { cursor: C.clipboardCursor }, "copy-icon": { color: N.copyToClipboard, fontSize: C.iconFontSize, marginRight: C.iconMarginRight, verticalAlign: "top" }, "copy-icon-copied": { color: N.copyToClipboardCheck, marginLeft: C.clipboardCheckMarginLeft }, "array-group-meta-data": { display: "inline-block", padding: C.arrayGroupMetaPadding }, "object-meta-data": { display: "inline-block", padding: C.metaDataPadding }, "icon-container": { display: "inline-block", width: C.iconContainerWidth }, tooltip: { padding: C.tooltipPadding }, removeVarIcon: { verticalAlign: "top", display: "inline-block", color: N.editVariable.removeIcon, cursor: C.iconCursor, fontSize: C.iconFontSize, marginRight: C.iconMarginRight }, addVarIcon: { verticalAlign: "top", display: "inline-block", color: N.editVariable.addIcon, cursor: C.iconCursor, fontSize: C.iconFontSize, marginRight: C.iconMarginRight }, editVarIcon: { verticalAlign: "top", display: "inline-block", color: N.editVariable.editIcon, cursor: C.iconCursor, fontSize: C.iconFontSize, marginRight: C.iconMarginRight }, "edit-icon-container": { display: "inline-block", verticalAlign: "top" }, "check-icon": { display: "inline-block", cursor: C.iconCursor, color: N.editVariable.checkIcon, fontSize: C.iconFontSize, paddingRight: C.iconPaddingRight }, "cancel-icon": { display: "inline-block", cursor: C.iconCursor, color: N.editVariable.cancelIcon, fontSize: C.iconFontSize, paddingRight: C.iconPaddingRight }, "edit-input": { display: "inline-block", minWidth: C.editInputMinWidth, borderRadius: C.editInputBorderRadius, backgroundColor: N.editVariable.background, color: N.editVariable.color, padding: C.editInputPadding, marginRight: C.editInputMarginRight, fontFamily: C.editInputFontFamily }, "detected-row": { paddingTop: C.detectedRowPaddingTop }, "key-modal-request": { position: C.addKeyCoverPosition, top: C.addKeyCoverPositionPx, left: C.addKeyCoverPositionPx, right: C.addKeyCoverPositionPx, bottom: C.addKeyCoverPositionPx, backgroundColor: C.addKeyCoverBackground }, "key-modal": { width: C.addKeyModalWidth, backgroundColor: N.addKeyModal.background, marginLeft: C.addKeyModalMargin, marginRight: C.addKeyModalMargin, padding: C.addKeyModalPadding, borderRadius: C.addKeyModalRadius, marginTop: "15px", position: "relative" }, "key-modal-label": { color: N.addKeyModal.labelColor, marginLeft: "2px", marginBottom: "5px", fontSize: "11px" }, "key-modal-input-container": { overflow: "hidden" }, "key-modal-input": { width: "100%", padding: "3px 6px", fontFamily: "monospace", color: N.addKeyModal.color, border: "none", boxSizing: "border-box", borderRadius: "2px" }, "key-modal-cancel": { backgroundColor: N.editVariable.removeIcon, position: "absolute", top: "0px", right: "0px", borderRadius: "0px 3px 0px 3px", cursor: "pointer" }, "key-modal-cancel-icon": { color: N.addKeyModal.labelColor, fontSize: C.iconFontSize, transform: "rotate(45deg)" }, "key-modal-submit": { color: N.editVariable.addIcon, fontSize: C.iconFontSize, position: "absolute", right: "2px", top: "3px", cursor: "pointer" }, "function-ellipsis": { display: "inline-block", color: N.ellipsisColor, fontSize: C.ellipsisFontSize, lineHeight: C.ellipsisLineHeight, cursor: C.ellipsisCursor }, "validation-failure": { float: "right", padding: "3px 6px", borderRadius: "2px", cursor: "pointer", color: N.validationFailure.fontColor, backgroundColor: N.validationFailure.background }, "validation-failure-label": { marginRight: "6px" }, "validation-failure-clear": { position: "relative", verticalAlign: "top", cursor: "pointer", color: N.validationFailure.iconColor, fontSize: C.iconFontSize, transform: "rotate(45deg)" } };
        };
        function $(j, N, S) {
          return j || console.error("theme has not been set"), (function(R) {
            var _ = A;
            return R !== !1 && R !== "none" || (_ = v), Object(M.createStyling)(D, { defaultBase16: _ })(R);
          })(j)(N, S);
        }
        var V = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = (R.rjvId, R.type_name), G = R.displayDataTypes, re = R.theme;
            return G ? f.a.createElement("span", Object.assign({ className: "data-type-label" }, $(re, "data-type-label")), _) : null;
          } }]), S;
        })(f.a.PureComponent), F = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props;
            return f.a.createElement("div", $(R.theme, "boolean"), f.a.createElement(V, Object.assign({ type_name: "bool" }, R)), R.value ? "true" : "false");
          } }]), S;
        })(f.a.PureComponent), q = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props;
            return f.a.createElement("div", $(R.theme, "date"), f.a.createElement(V, Object.assign({ type_name: "date" }, R)), f.a.createElement("span", Object.assign({ className: "date-value" }, $(R.theme, "date-value")), R.value.toLocaleTimeString("en-us", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })));
          } }]), S;
        })(f.a.PureComponent), z = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props;
            return f.a.createElement("div", $(R.theme, "float"), f.a.createElement(V, Object.assign({ type_name: "float" }, R)), this.props.value);
          } }]), S;
        })(f.a.PureComponent);
        function J(j, N) {
          (N == null || N > j.length) && (N = j.length);
          for (var S = 0, R = new Array(N); S < N; S++) R[S] = j[S];
          return R;
        }
        function Z(j, N) {
          if (j) {
            if (typeof j == "string") return J(j, N);
            var S = Object.prototype.toString.call(j).slice(8, -1);
            return S === "Object" && j.constructor && (S = j.constructor.name), S === "Map" || S === "Set" ? Array.from(j) : S === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(S) ? J(j, N) : void 0;
          }
        }
        function ce(j, N) {
          var S;
          if (typeof Symbol > "u" || j[Symbol.iterator] == null) {
            if (Array.isArray(j) || (S = Z(j)) || N) {
              S && (j = S);
              var R = 0, _ = function() {
              };
              return { s: _, n: function() {
                return R >= j.length ? { done: !0 } : { done: !1, value: j[R++] };
              }, e: function(H) {
                throw H;
              }, f: _ };
            }
            throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          var G, re = !0, Q = !1;
          return { s: function() {
            S = j[Symbol.iterator]();
          }, n: function() {
            var H = S.next();
            return re = H.done, H;
          }, e: function(H) {
            Q = !0, G = H;
          }, f: function() {
            try {
              re || S.return == null || S.return();
            } finally {
              if (Q) throw G;
            }
          } };
        }
        function ue(j) {
          return (function(N) {
            if (Array.isArray(N)) return J(N);
          })(j) || (function(N) {
            if (typeof Symbol < "u" && Symbol.iterator in Object(N)) return Array.from(N);
          })(j) || Z(j) || (function() {
            throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          })();
        }
        var xe = o(46), de = new (o(47)).Dispatcher(), be = new ((function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            var R;
            u(this, S);
            for (var _ = arguments.length, G = new Array(_), re = 0; re < _; re++) G[re] = arguments[re];
            return (R = N.call.apply(N, [this].concat(G))).objects = {}, R.set = function(Q, H, se, Oe) {
              R.objects[Q] === void 0 && (R.objects[Q] = {}), R.objects[Q][H] === void 0 && (R.objects[Q][H] = {}), R.objects[Q][H][se] = Oe;
            }, R.get = function(Q, H, se, Oe) {
              return R.objects[Q] === void 0 || R.objects[Q][H] === void 0 || R.objects[Q][H][se] == null ? Oe : R.objects[Q][H][se];
            }, R.handleAction = function(Q) {
              var H = Q.rjvId, se = Q.data;
              switch (Q.name) {
                case "RESET":
                  R.emit("reset-" + H);
                  break;
                case "VARIABLE_UPDATED":
                  Q.data.updated_src = R.updateSrc(H, se), R.set(H, "action", "variable-update", l(l({}, se), {}, { type: "variable-edited" })), R.emit("variable-update-" + H);
                  break;
                case "VARIABLE_REMOVED":
                  Q.data.updated_src = R.updateSrc(H, se), R.set(H, "action", "variable-update", l(l({}, se), {}, { type: "variable-removed" })), R.emit("variable-update-" + H);
                  break;
                case "VARIABLE_ADDED":
                  Q.data.updated_src = R.updateSrc(H, se), R.set(H, "action", "variable-update", l(l({}, se), {}, { type: "variable-added" })), R.emit("variable-update-" + H);
                  break;
                case "ADD_VARIABLE_KEY_REQUEST":
                  R.set(H, "action", "new-key-request", se), R.emit("add-key-request-" + H);
              }
            }, R.updateSrc = function(Q, H) {
              var se = H.name, Oe = H.namespace, Ze = H.new_value, nt = (H.existing_value, H.variable_removed);
              Oe.shift();
              var lt, Xe = R.get(Q, "global", "src"), ct = R.deepCopy(Xe, ue(Oe)), yt = ct, ze = ce(Oe);
              try {
                for (ze.s(); !(lt = ze.n()).done; )
                  yt = yt[lt.value];
              } catch ($t) {
                ze.e($t);
              } finally {
                ze.f();
              }
              return nt ? P(yt) == "array" ? yt.splice(se, 1) : delete yt[se] : se !== null ? yt[se] = Ze : ct = Ze, R.set(Q, "global", "src", ct), ct;
            }, R.deepCopy = function(Q, H) {
              var se, Oe = P(Q), Ze = H.shift();
              return Oe == "array" ? se = ue(Q) : Oe == "object" && (se = l({}, Q)), Ze !== void 0 && (se[Ze] = R.deepCopy(Q[Ze], H)), se;
            }, R;
          }
          return S;
        })(xe.EventEmitter))();
        de.register(be.handleAction.bind(be));
        var ye = be, we = (function(j) {
          h(S, j);
          var N = k(S);
          function S(R) {
            var _;
            return u(this, S), (_ = N.call(this, R)).toggleCollapsed = function() {
              _.setState({ collapsed: !_.state.collapsed }, (function() {
                ye.set(_.props.rjvId, _.props.namespace, "collapsed", _.state.collapsed);
              }));
            }, _.getFunctionDisplay = function(G) {
              var re = y(_).props;
              return G ? f.a.createElement("span", null, _.props.value.toString().slice(9, -1).replace(/\{[\s\S]+/, ""), f.a.createElement("span", { className: "function-collapsed", style: { fontWeight: "bold" } }, f.a.createElement("span", null, "{"), f.a.createElement("span", $(re.theme, "ellipsis"), "..."), f.a.createElement("span", null, "}"))) : _.props.value.toString().slice(9, -1);
            }, _.state = { collapsed: ye.get(R.rjvId, R.namespace, "collapsed", !0) }, _;
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = this.state.collapsed;
            return f.a.createElement("div", $(R.theme, "function"), f.a.createElement(V, Object.assign({ type_name: "function" }, R)), f.a.createElement("span", Object.assign({}, $(R.theme, "function-value"), { className: "rjv-function-container", onClick: this.toggleCollapsed }), this.getFunctionDisplay(_)));
          } }]), S;
        })(f.a.PureComponent), ke = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            return f.a.createElement("div", $(this.props.theme, "nan"), "NaN");
          } }]), S;
        })(f.a.PureComponent), ge = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            return f.a.createElement("div", $(this.props.theme, "null"), "NULL");
          } }]), S;
        })(f.a.PureComponent), Ee = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props;
            return f.a.createElement("div", $(R.theme, "integer"), f.a.createElement(V, Object.assign({ type_name: "int" }, R)), this.props.value);
          } }]), S;
        })(f.a.PureComponent), Ae = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props;
            return f.a.createElement("div", $(R.theme, "regexp"), f.a.createElement(V, Object.assign({ type_name: "regexp" }, R)), this.props.value.toString());
          } }]), S;
        })(f.a.PureComponent), _e = (function(j) {
          h(S, j);
          var N = k(S);
          function S(R) {
            var _;
            return u(this, S), (_ = N.call(this, R)).toggleCollapsed = function() {
              _.setState({ collapsed: !_.state.collapsed }, (function() {
                ye.set(_.props.rjvId, _.props.namespace, "collapsed", _.state.collapsed);
              }));
            }, _.state = { collapsed: ye.get(R.rjvId, R.namespace, "collapsed", !0) }, _;
          }
          return d(S, [{ key: "render", value: function() {
            this.state.collapsed;
            var R = this.props, _ = R.collapseStringsAfterLength, G = R.theme, re = R.value, Q = { style: { cursor: "default" } };
            return P(_) === "integer" && re.length > _ && (Q.style.cursor = "pointer", this.state.collapsed && (re = f.a.createElement("span", null, re.substring(0, _), f.a.createElement("span", $(G, "ellipsis"), " ...")))), f.a.createElement("div", $(G, "string"), f.a.createElement(V, Object.assign({ type_name: "string" }, R)), f.a.createElement("span", Object.assign({ className: "string-value" }, Q, { onClick: this.toggleCollapsed }), '"', re, '"'));
          } }]), S;
        })(f.a.PureComponent), qe = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            return f.a.createElement("div", $(this.props.theme, "undefined"), "undefined");
          } }]), S;
        })(f.a.PureComponent);
        function Te() {
          return (Te = Object.assign || function(j) {
            for (var N = 1; N < arguments.length; N++) {
              var S = arguments[N];
              for (var R in S) Object.prototype.hasOwnProperty.call(S, R) && (j[R] = S[R]);
            }
            return j;
          }).apply(this, arguments);
        }
        var We = I.useLayoutEffect, Ke = function(j) {
          var N = Object(I.useRef)(j);
          return We((function() {
            N.current = j;
          })), N;
        }, Ge = function(j, N) {
          typeof j != "function" ? j.current = N : j(N);
        }, fe = function(j, N) {
          var S = Object(I.useRef)();
          return Object(I.useCallback)((function(R) {
            j.current = R, S.current && Ge(S.current, null), S.current = N, N && Ge(N, R);
          }), [N]);
        }, pe = { "min-height": "0", "max-height": "none", height: "0", visibility: "hidden", overflow: "hidden", position: "absolute", "z-index": "-1000", top: "0", right: "0" }, je = function(j) {
          Object.keys(pe).forEach((function(N) {
            j.style.setProperty(N, pe[N], "important");
          }));
        }, Ie = null, Ve = function() {
        }, ee = ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "boxSizing", "fontFamily", "fontSize", "fontStyle", "fontWeight", "letterSpacing", "lineHeight", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "tabSize", "textIndent", "textRendering", "textTransform", "width"], K = !!document.documentElement.currentStyle, U = function(j, N) {
          var S = j.cacheMeasurements, R = j.maxRows, _ = j.minRows, G = j.onChange, re = G === void 0 ? Ve : G, Q = j.onHeightChange, H = Q === void 0 ? Ve : Q, se = (function(ze, $t) {
            if (ze == null) return {};
            var _t, Gt, Yr = {}, Yt = Object.keys(ze);
            for (Gt = 0; Gt < Yt.length; Gt++) _t = Yt[Gt], $t.indexOf(_t) >= 0 || (Yr[_t] = ze[_t]);
            return Yr;
          })(j, ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"]), Oe, Ze = se.value !== void 0, nt = Object(I.useRef)(null), lt = fe(nt, N), Xe = Object(I.useRef)(0), ct = Object(I.useRef)(), yt = function() {
            var ze = nt.current, $t = S && ct.current ? ct.current : (function(Yt) {
              var Xr = window.getComputedStyle(Yt);
              if (Xr === null) return null;
              var pr, Tt = (pr = Xr, ee.reduce((function(jr, hr) {
                return jr[hr] = pr[hr], jr;
              }), {})), Zt = Tt.boxSizing;
              return Zt === "" ? null : (K && Zt === "border-box" && (Tt.width = parseFloat(Tt.width) + parseFloat(Tt.borderRightWidth) + parseFloat(Tt.borderLeftWidth) + parseFloat(Tt.paddingRight) + parseFloat(Tt.paddingLeft) + "px"), { sizingStyle: Tt, paddingSize: parseFloat(Tt.paddingBottom) + parseFloat(Tt.paddingTop), borderSize: parseFloat(Tt.borderBottomWidth) + parseFloat(Tt.borderTopWidth) });
            })(ze);
            if ($t) {
              ct.current = $t;
              var _t = (function(Yt, Xr, pr, Tt) {
                pr === void 0 && (pr = 1), Tt === void 0 && (Tt = 1 / 0), Ie || ((Ie = document.createElement("textarea")).setAttribute("tab-index", "-1"), Ie.setAttribute("aria-hidden", "true"), je(Ie)), Ie.parentNode === null && document.body.appendChild(Ie);
                var Zt = Yt.paddingSize, jr = Yt.borderSize, hr = Yt.sizingStyle, da = hr.boxSizing;
                Object.keys(hr).forEach((function(Zr) {
                  var mr = Zr;
                  Ie.style[mr] = hr[mr];
                })), je(Ie), Ie.value = Xr;
                var Jr = (function(Zr, mr) {
                  var fa = Zr.scrollHeight;
                  return mr.sizingStyle.boxSizing === "border-box" ? fa + mr.borderSize : fa - mr.paddingSize;
                })(Ie, Yt);
                Ie.value = "x";
                var _n = Ie.scrollHeight - Zt, Pn = _n * pr;
                da === "border-box" && (Pn = Pn + Zt + jr), Jr = Math.max(Pn, Jr);
                var jn = _n * Tt;
                return da === "border-box" && (jn = jn + Zt + jr), [Jr = Math.min(jn, Jr), _n];
              })($t, ze.value || ze.placeholder || "x", _, R), Gt = _t[0], Yr = _t[1];
              Xe.current !== Gt && (Xe.current = Gt, ze.style.setProperty("height", Gt + "px", "important"), H(Gt, { rowHeight: Yr }));
            }
          };
          return Object(I.useLayoutEffect)(yt), Oe = Ke(yt), Object(I.useLayoutEffect)((function() {
            var ze = function($t) {
              Oe.current($t);
            };
            return window.addEventListener("resize", ze), function() {
              window.removeEventListener("resize", ze);
            };
          }), []), Object(I.createElement)("textarea", Te({}, se, { onChange: function(ze) {
            Ze || yt(), re(ze);
          }, ref: lt }));
        }, te = Object(I.forwardRef)(U);
        function oe(j) {
          j = j.trim();
          try {
            if ((j = JSON.stringify(JSON.parse(j)))[0] === "[") return Ce("array", JSON.parse(j));
            if (j[0] === "{") return Ce("object", JSON.parse(j));
            if (j.match(/\-?\d+\.\d+/) && j.match(/\-?\d+\.\d+/)[0] === j) return Ce("float", parseFloat(j));
            if (j.match(/\-?\d+e-\d+/) && j.match(/\-?\d+e-\d+/)[0] === j) return Ce("float", Number(j));
            if (j.match(/\-?\d+/) && j.match(/\-?\d+/)[0] === j) return Ce("integer", parseInt(j));
            if (j.match(/\-?\d+e\+\d+/) && j.match(/\-?\d+e\+\d+/)[0] === j) return Ce("integer", Number(j));
          } catch {
          }
          switch (j = j.toLowerCase()) {
            case "undefined":
              return Ce("undefined", void 0);
            case "nan":
              return Ce("nan", NaN);
            case "null":
              return Ce("null", null);
            case "true":
              return Ce("boolean", !0);
            case "false":
              return Ce("boolean", !1);
            default:
              if (j = Date.parse(j)) return Ce("date", new Date(j));
          }
          return Ce(!1, null);
        }
        function Ce(j, N) {
          return { type: j, value: N };
        }
        var Le = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]);
            return f.a.createElement("span", G, f.a.createElement("svg", Object.assign({}, Be(_), { viewBox: "0 0 24 24", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("path", { d: "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" })));
          } }]), S;
        })(f.a.PureComponent), Se = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]);
            return f.a.createElement("span", G, f.a.createElement("svg", Object.assign({}, Be(_), { viewBox: "0 0 24 24", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("path", { d: "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" })));
          } }]), S;
        })(f.a.PureComponent), me = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]), re = Be(_).style;
            return f.a.createElement("span", G, f.a.createElement("svg", { fill: re.color, width: re.height, height: re.width, style: re, viewBox: "0 0 1792 1792" }, f.a.createElement("path", { d: "M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z" })));
          } }]), S;
        })(f.a.PureComponent), Fe = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]), re = Be(_).style;
            return f.a.createElement("span", G, f.a.createElement("svg", { fill: re.color, width: re.height, height: re.width, style: re, viewBox: "0 0 1792 1792" }, f.a.createElement("path", { d: "M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z" })));
          } }]), S;
        })(f.a.PureComponent), He = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]);
            return f.a.createElement("span", G, f.a.createElement("svg", { style: l(l({}, Be(_).style), {}, { paddingLeft: "2px", verticalAlign: "top" }), viewBox: "0 0 15 15", fill: "currentColor" }, f.a.createElement("path", { d: "M0 14l6-6-6-6z" })));
          } }]), S;
        })(f.a.PureComponent), Pe = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]);
            return f.a.createElement("span", G, f.a.createElement("svg", { style: l(l({}, Be(_).style), {}, { paddingLeft: "2px", verticalAlign: "top" }), viewBox: "0 0 15 15", fill: "currentColor" }, f.a.createElement("path", { d: "M0 5l6 6 6-6z" })));
          } }]), S;
        })(f.a.PureComponent), ie = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]);
            return f.a.createElement("span", G, f.a.createElement("svg", Object.assign({}, Be(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m30 35h-25v-22.5h25v7.5h2.5v-12.5c0-1.4-1.1-2.5-2.5-2.5h-7.5c0-2.8-2.2-5-5-5s-5 2.2-5 5h-7.5c-1.4 0-2.5 1.1-2.5 2.5v27.5c0 1.4 1.1 2.5 2.5 2.5h25c1.4 0 2.5-1.1 2.5-2.5v-5h-2.5v5z m-20-27.5h2.5s2.5-1.1 2.5-2.5 1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5 1.3 2.5 2.5 2.5h2.5s2.5 1.1 2.5 2.5h-20c0-1.5 1.1-2.5 2.5-2.5z m-2.5 20h5v-2.5h-5v2.5z m17.5-5v-5l-10 7.5 10 7.5v-5h12.5v-5h-12.5z m-17.5 10h7.5v-2.5h-7.5v2.5z m12.5-17.5h-12.5v2.5h12.5v-2.5z m-7.5 5h-5v2.5h5v-2.5z" }))));
          } }]), S;
        })(f.a.PureComponent), $e = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]);
            return f.a.createElement("span", G, f.a.createElement("svg", Object.assign({}, Be(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m28.6 25q0-0.5-0.4-1l-4-4 4-4q0.4-0.5 0.4-1 0-0.6-0.4-1.1l-2-2q-0.4-0.4-1-0.4-0.6 0-1 0.4l-4.1 4.1-4-4.1q-0.4-0.4-1-0.4-0.6 0-1 0.4l-2 2q-0.5 0.5-0.5 1.1 0 0.5 0.5 1l4 4-4 4q-0.5 0.5-0.5 1 0 0.7 0.5 1.1l2 2q0.4 0.4 1 0.4 0.6 0 1-0.4l4-4.1 4.1 4.1q0.4 0.4 1 0.4 0.6 0 1-0.4l2-2q0.4-0.4 0.4-1z m8.7-5q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" }))));
          } }]), S;
        })(f.a.PureComponent), Ye = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]);
            return f.a.createElement("span", G, f.a.createElement("svg", Object.assign({}, Be(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m30.1 21.4v-2.8q0-0.6-0.4-1t-1-0.5h-5.7v-5.7q0-0.6-0.4-1t-1-0.4h-2.9q-0.6 0-1 0.4t-0.4 1v5.7h-5.7q-0.6 0-1 0.5t-0.5 1v2.8q0 0.6 0.5 1t1 0.5h5.7v5.7q0 0.5 0.4 1t1 0.4h2.9q0.6 0 1-0.4t0.4-1v-5.7h5.7q0.6 0 1-0.5t0.4-1z m7.2-1.4q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" }))));
          } }]), S;
        })(f.a.PureComponent), Qe = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]);
            return f.a.createElement("span", G, f.a.createElement("svg", Object.assign({}, Be(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m31.6 21.6h-10v10h-3.2v-10h-10v-3.2h10v-10h3.2v10h10v3.2z" }))));
          } }]), S;
        })(f.a.PureComponent), at = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]);
            return f.a.createElement("span", G, f.a.createElement("svg", Object.assign({}, Be(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m19.8 26.4l2.6-2.6-3.4-3.4-2.6 2.6v1.3h2.2v2.1h1.2z m9.8-16q-0.3-0.4-0.7 0l-7.8 7.8q-0.4 0.4 0 0.7t0.7 0l7.8-7.8q0.4-0.4 0-0.7z m1.8 13.2v4.3q0 2.6-1.9 4.5t-4.5 1.9h-18.6q-2.6 0-4.5-1.9t-1.9-4.5v-18.6q0-2.7 1.9-4.6t4.5-1.8h18.6q1.4 0 2.6 0.5 0.3 0.2 0.4 0.5 0.1 0.4-0.2 0.7l-1.1 1.1q-0.3 0.3-0.7 0.1-0.5-0.1-1-0.1h-18.6q-1.4 0-2.5 1.1t-1 2.5v18.6q0 1.4 1 2.5t2.5 1h18.6q1.5 0 2.5-1t1.1-2.5v-2.9q0-0.2 0.2-0.4l1.4-1.5q0.3-0.3 0.8-0.1t0.4 0.6z m-2.1-16.5l6.4 6.5-15 15h-6.4v-6.5z m9.9 3l-2.1 2-6.4-6.4 2.1-2q0.6-0.7 1.5-0.7t1.5 0.7l3.4 3.4q0.6 0.6 0.6 1.5t-0.6 1.5z" }))));
          } }]), S;
        })(f.a.PureComponent), De = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.style, G = O(R, ["style"]);
            return f.a.createElement("span", G, f.a.createElement("svg", Object.assign({}, Be(_), { viewBox: "0 0 40 40", fill: "currentColor", preserveAspectRatio: "xMidYMid meet" }), f.a.createElement("g", null, f.a.createElement("path", { d: "m31.7 16.4q0-0.6-0.4-1l-2.1-2.1q-0.4-0.4-1-0.4t-1 0.4l-9.1 9.1-5-5q-0.5-0.4-1-0.4t-1 0.4l-2.1 2q-0.4 0.4-0.4 1 0 0.6 0.4 1l8.1 8.1q0.4 0.4 1 0.4 0.6 0 1-0.4l12.2-12.1q0.4-0.4 0.4-1z m5.6 3.6q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" }))));
          } }]), S;
        })(f.a.PureComponent);
        function Be(j) {
          return j || (j = {}), { style: l(l({ verticalAlign: "middle" }, j), {}, { color: j.color ? j.color : "#000000", height: "1em", width: "1em" }) };
        }
        var mt = (function(j) {
          h(S, j);
          var N = k(S);
          function S(R) {
            var _;
            return u(this, S), (_ = N.call(this, R)).copiedTimer = null, _.handleCopy = function() {
              var G = document.createElement("textarea"), re = _.props, Q = re.clickCallback, H = re.src, se = re.namespace;
              G.innerHTML = JSON.stringify(_.clipboardValue(H), null, "  "), document.body.appendChild(G), G.select(), document.execCommand("copy"), document.body.removeChild(G), _.copiedTimer = setTimeout((function() {
                _.setState({ copied: !1 });
              }), 5500), _.setState({ copied: !0 }, (function() {
                typeof Q == "function" && Q({ src: H, namespace: se, name: se[se.length - 1] });
              }));
            }, _.getClippyIcon = function() {
              var G = _.props.theme;
              return _.state.copied ? f.a.createElement("span", null, f.a.createElement(ie, Object.assign({ className: "copy-icon" }, $(G, "copy-icon"))), f.a.createElement("span", $(G, "copy-icon-copied"), "✔")) : f.a.createElement(ie, Object.assign({ className: "copy-icon" }, $(G, "copy-icon")));
            }, _.clipboardValue = function(G) {
              switch (P(G)) {
                case "function":
                case "regexp":
                  return G.toString();
                default:
                  return G;
              }
            }, _.state = { copied: !1 }, _;
          }
          return d(S, [{ key: "componentWillUnmount", value: function() {
            this.copiedTimer && (clearTimeout(this.copiedTimer), this.copiedTimer = null);
          } }, { key: "render", value: function() {
            var R = this.props, _ = (R.src, R.theme), G = R.hidden, re = R.rowHovered, Q = $(_, "copy-to-clipboard").style, H = "inline";
            return G && (H = "none"), f.a.createElement("span", { className: "copy-to-clipboard-container", title: "Copy to clipboard", style: { verticalAlign: "top", display: re ? "inline-block" : "none" } }, f.a.createElement("span", { style: l(l({}, Q), {}, { display: H }), onClick: this.handleCopy }, this.getClippyIcon()));
          } }]), S;
        })(f.a.PureComponent), ot = (function(j) {
          h(S, j);
          var N = k(S);
          function S(R) {
            var _;
            return u(this, S), (_ = N.call(this, R)).getEditIcon = function() {
              var G = _.props, re = G.variable, Q = G.theme;
              return f.a.createElement("div", { className: "click-to-edit", style: { verticalAlign: "top", display: _.state.hovered ? "inline-block" : "none" } }, f.a.createElement(at, Object.assign({ className: "click-to-edit-icon" }, $(Q, "editVarIcon"), { onClick: function() {
                _.prepopInput(re);
              } })));
            }, _.prepopInput = function(G) {
              if (_.props.onEdit !== !1) {
                var re = (function(H) {
                  var se;
                  switch (P(H)) {
                    case "undefined":
                      se = "undefined";
                      break;
                    case "nan":
                      se = "NaN";
                      break;
                    case "string":
                      se = H;
                      break;
                    case "date":
                    case "function":
                    case "regexp":
                      se = H.toString();
                      break;
                    default:
                      try {
                        se = JSON.stringify(H, null, "  ");
                      } catch {
                        se = "";
                      }
                  }
                  return se;
                })(G.value), Q = oe(re);
                _.setState({ editMode: !0, editValue: re, parsedInput: { type: Q.type, value: Q.value } });
              }
            }, _.getRemoveIcon = function() {
              var G = _.props, re = G.variable, Q = G.namespace, H = G.theme, se = G.rjvId;
              return f.a.createElement("div", { className: "click-to-remove", style: { verticalAlign: "top", display: _.state.hovered ? "inline-block" : "none" } }, f.a.createElement($e, Object.assign({ className: "click-to-remove-icon" }, $(H, "removeVarIcon"), { onClick: function() {
                de.dispatch({ name: "VARIABLE_REMOVED", rjvId: se, data: { name: re.name, namespace: Q, existing_value: re.value, variable_removed: !0 } });
              } })));
            }, _.getValue = function(G, re) {
              var Q = !re && G.type, H = y(_).props;
              switch (Q) {
                case !1:
                  return _.getEditInput();
                case "string":
                  return f.a.createElement(_e, Object.assign({ value: G.value }, H));
                case "integer":
                  return f.a.createElement(Ee, Object.assign({ value: G.value }, H));
                case "float":
                  return f.a.createElement(z, Object.assign({ value: G.value }, H));
                case "boolean":
                  return f.a.createElement(F, Object.assign({ value: G.value }, H));
                case "function":
                  return f.a.createElement(we, Object.assign({ value: G.value }, H));
                case "null":
                  return f.a.createElement(ge, H);
                case "nan":
                  return f.a.createElement(ke, H);
                case "undefined":
                  return f.a.createElement(qe, H);
                case "date":
                  return f.a.createElement(q, Object.assign({ value: G.value }, H));
                case "regexp":
                  return f.a.createElement(Ae, Object.assign({ value: G.value }, H));
                default:
                  return f.a.createElement("div", { className: "object-value" }, JSON.stringify(G.value));
              }
            }, _.getEditInput = function() {
              var G = _.props.theme, re = _.state.editValue;
              return f.a.createElement("div", null, f.a.createElement(te, Object.assign({ type: "text", inputRef: function(Q) {
                return Q && Q.focus();
              }, value: re, className: "variable-editor", onChange: function(Q) {
                var H = Q.target.value, se = oe(H);
                _.setState({ editValue: H, parsedInput: { type: se.type, value: se.value } });
              }, onKeyDown: function(Q) {
                switch (Q.key) {
                  case "Escape":
                    _.setState({ editMode: !1, editValue: "" });
                    break;
                  case "Enter":
                    (Q.ctrlKey || Q.metaKey) && _.submitEdit(!0);
                }
                Q.stopPropagation();
              }, placeholder: "update this value", minRows: 2 }, $(G, "edit-input"))), f.a.createElement("div", $(G, "edit-icon-container"), f.a.createElement($e, Object.assign({ className: "edit-cancel" }, $(G, "cancel-icon"), { onClick: function() {
                _.setState({ editMode: !1, editValue: "" });
              } })), f.a.createElement(De, Object.assign({ className: "edit-check string-value" }, $(G, "check-icon"), { onClick: function() {
                _.submitEdit();
              } })), f.a.createElement("div", null, _.showDetected())));
            }, _.submitEdit = function(G) {
              var re = _.props, Q = re.variable, H = re.namespace, se = re.rjvId, Oe = _.state, Ze = Oe.editValue, nt = Oe.parsedInput, lt = Ze;
              G && nt.type && (lt = nt.value), _.setState({ editMode: !1 }), de.dispatch({ name: "VARIABLE_UPDATED", rjvId: se, data: { name: Q.name, namespace: H, existing_value: Q.value, new_value: lt, variable_removed: !1 } });
            }, _.showDetected = function() {
              var G = _.props, re = G.theme, Q = (G.variable, G.namespace, G.rjvId, _.state.parsedInput), H = (Q.type, Q.value, _.getDetectedInput());
              if (H) return f.a.createElement("div", null, f.a.createElement("div", $(re, "detected-row"), H, f.a.createElement(De, { className: "edit-check detected", style: l({ verticalAlign: "top", paddingLeft: "3px" }, $(re, "check-icon").style), onClick: function() {
                _.submitEdit(!0);
              } })));
            }, _.getDetectedInput = function() {
              var G = _.state.parsedInput, re = G.type, Q = G.value, H = y(_).props, se = H.theme;
              if (re !== !1) switch (re.toLowerCase()) {
                case "object":
                  return f.a.createElement("span", null, f.a.createElement("span", { style: l(l({}, $(se, "brace").style), {}, { cursor: "default" }) }, "{"), f.a.createElement("span", { style: l(l({}, $(se, "ellipsis").style), {}, { cursor: "default" }) }, "..."), f.a.createElement("span", { style: l(l({}, $(se, "brace").style), {}, { cursor: "default" }) }, "}"));
                case "array":
                  return f.a.createElement("span", null, f.a.createElement("span", { style: l(l({}, $(se, "brace").style), {}, { cursor: "default" }) }, "["), f.a.createElement("span", { style: l(l({}, $(se, "ellipsis").style), {}, { cursor: "default" }) }, "..."), f.a.createElement("span", { style: l(l({}, $(se, "brace").style), {}, { cursor: "default" }) }, "]"));
                case "string":
                  return f.a.createElement(_e, Object.assign({ value: Q }, H));
                case "integer":
                  return f.a.createElement(Ee, Object.assign({ value: Q }, H));
                case "float":
                  return f.a.createElement(z, Object.assign({ value: Q }, H));
                case "boolean":
                  return f.a.createElement(F, Object.assign({ value: Q }, H));
                case "function":
                  return f.a.createElement(we, Object.assign({ value: Q }, H));
                case "null":
                  return f.a.createElement(ge, H);
                case "nan":
                  return f.a.createElement(ke, H);
                case "undefined":
                  return f.a.createElement(qe, H);
                case "date":
                  return f.a.createElement(q, Object.assign({ value: new Date(Q) }, H));
              }
            }, _.state = { editMode: !1, editValue: "", hovered: !1, renameKey: !1, parsedInput: { type: !1, value: null } }, _;
          }
          return d(S, [{ key: "render", value: function() {
            var R = this, _ = this.props, G = _.variable, re = _.singleIndent, Q = _.type, H = _.theme, se = _.namespace, Oe = _.indentWidth, Ze = _.enableClipboard, nt = _.onEdit, lt = _.onDelete, Xe = _.onSelect, ct = _.displayArrayKey, yt = _.quotesOnKeys, ze = this.state.editMode;
            return f.a.createElement("div", Object.assign({}, $(H, "objectKeyVal", { paddingLeft: Oe * re }), { onMouseEnter: function() {
              return R.setState(l(l({}, R.state), {}, { hovered: !0 }));
            }, onMouseLeave: function() {
              return R.setState(l(l({}, R.state), {}, { hovered: !1 }));
            }, className: "variable-row", key: G.name }), Q == "array" ? ct ? f.a.createElement("span", Object.assign({}, $(H, "array-key"), { key: G.name + "_" + se }), G.name, f.a.createElement("div", $(H, "colon"), ":")) : null : f.a.createElement("span", null, f.a.createElement("span", Object.assign({}, $(H, "object-name"), { className: "object-key", key: G.name + "_" + se }), !!yt && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"'), f.a.createElement("span", { style: { display: "inline-block" } }, G.name), !!yt && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"')), f.a.createElement("span", $(H, "colon"), ":")), f.a.createElement("div", Object.assign({ className: "variable-value", onClick: Xe === !1 && nt === !1 ? null : function($t) {
              var _t = ue(se);
              ($t.ctrlKey || $t.metaKey) && nt !== !1 ? R.prepopInput(G) : Xe !== !1 && (_t.shift(), Xe(l(l({}, G), {}, { namespace: _t })));
            } }, $(H, "variableValue", { cursor: Xe === !1 ? "default" : "pointer" })), this.getValue(G, ze)), Ze ? f.a.createElement(mt, { rowHovered: this.state.hovered, hidden: ze, src: G.value, clickCallback: Ze, theme: H, namespace: [].concat(ue(se), [G.name]) }) : null, nt !== !1 && ze == 0 ? this.getEditIcon() : null, lt !== !1 && ze == 0 ? this.getRemoveIcon() : null);
          } }]), S;
        })(f.a.PureComponent), rt = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            var R;
            u(this, S);
            for (var _ = arguments.length, G = new Array(_), re = 0; re < _; re++) G[re] = arguments[re];
            return (R = N.call.apply(N, [this].concat(G))).getObjectSize = function() {
              var Q = R.props, H = Q.size, se = Q.theme;
              if (Q.displayObjectSize) return f.a.createElement("span", Object.assign({ className: "object-size" }, $(se, "object-size")), H, " item", H === 1 ? "" : "s");
            }, R.getAddAttribute = function(Q) {
              var H = R.props, se = H.theme, Oe = H.namespace, Ze = H.name, nt = H.src, lt = H.rjvId, Xe = H.depth;
              return f.a.createElement("span", { className: "click-to-add", style: { verticalAlign: "top", display: Q ? "inline-block" : "none" } }, f.a.createElement(Ye, Object.assign({ className: "click-to-add-icon" }, $(se, "addVarIcon"), { onClick: function() {
                var ct = { name: Xe > 0 ? Ze : null, namespace: Oe.splice(0, Oe.length - 1), existing_value: nt, variable_removed: !1, key_name: null };
                P(nt) === "object" ? de.dispatch({ name: "ADD_VARIABLE_KEY_REQUEST", rjvId: lt, data: ct }) : de.dispatch({ name: "VARIABLE_ADDED", rjvId: lt, data: l(l({}, ct), {}, { new_value: [].concat(ue(nt), [null]) }) });
              } })));
            }, R.getRemoveObject = function(Q) {
              var H = R.props, se = H.theme, Oe = (H.hover, H.namespace), Ze = H.name, nt = H.src, lt = H.rjvId;
              if (Oe.length !== 1) return f.a.createElement("span", { className: "click-to-remove", style: { display: Q ? "inline-block" : "none" } }, f.a.createElement($e, Object.assign({ className: "click-to-remove-icon" }, $(se, "removeVarIcon"), { onClick: function() {
                de.dispatch({ name: "VARIABLE_REMOVED", rjvId: lt, data: { name: Ze, namespace: Oe.splice(0, Oe.length - 1), existing_value: nt, variable_removed: !0 } });
              } })));
            }, R.render = function() {
              var Q = R.props, H = Q.theme, se = Q.onDelete, Oe = Q.onAdd, Ze = Q.enableClipboard, nt = Q.src, lt = Q.namespace, Xe = Q.rowHovered;
              return f.a.createElement("div", Object.assign({}, $(H, "object-meta-data"), { className: "object-meta-data", onClick: function(ct) {
                ct.stopPropagation();
              } }), R.getObjectSize(), Ze ? f.a.createElement(mt, { rowHovered: Xe, clickCallback: Ze, src: nt, theme: H, namespace: lt }) : null, Oe !== !1 ? R.getAddAttribute(Xe) : null, se !== !1 ? R.getRemoveObject(Xe) : null);
            }, R;
          }
          return S;
        })(f.a.PureComponent);
        function et(j) {
          var N = j.parent_type, S = j.namespace, R = j.quotesOnKeys, _ = j.theme, G = j.jsvRoot, re = j.name, Q = j.displayArrayKey, H = j.name ? j.name : "";
          return !G || re !== !1 && re !== null ? N == "array" ? Q ? f.a.createElement("span", Object.assign({}, $(_, "array-key"), { key: S }), f.a.createElement("span", { className: "array-key" }, H), f.a.createElement("span", $(_, "colon"), ":")) : f.a.createElement("span", null) : f.a.createElement("span", Object.assign({}, $(_, "object-name"), { key: S }), f.a.createElement("span", { className: "object-key" }, R && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"'), f.a.createElement("span", null, H), R && f.a.createElement("span", { style: { verticalAlign: "top" } }, '"')), f.a.createElement("span", $(_, "colon"), ":")) : f.a.createElement("span", null);
        }
        function bt(j) {
          var N = j.theme;
          switch (j.iconStyle) {
            case "triangle":
              return f.a.createElement(Pe, Object.assign({}, $(N, "expanded-icon"), { className: "expanded-icon" }));
            case "square":
              return f.a.createElement(me, Object.assign({}, $(N, "expanded-icon"), { className: "expanded-icon" }));
            default:
              return f.a.createElement(Le, Object.assign({}, $(N, "expanded-icon"), { className: "expanded-icon" }));
          }
        }
        function Nt(j) {
          var N = j.theme;
          switch (j.iconStyle) {
            case "triangle":
              return f.a.createElement(He, Object.assign({}, $(N, "collapsed-icon"), { className: "collapsed-icon" }));
            case "square":
              return f.a.createElement(Fe, Object.assign({}, $(N, "collapsed-icon"), { className: "collapsed-icon" }));
            default:
              return f.a.createElement(Se, Object.assign({}, $(N, "collapsed-icon"), { className: "collapsed-icon" }));
          }
        }
        var Lt = (function(j) {
          h(S, j);
          var N = k(S);
          function S(R) {
            var _;
            return u(this, S), (_ = N.call(this, R)).toggleCollapsed = function(G) {
              var re = [];
              for (var Q in _.state.expanded) re.push(_.state.expanded[Q]);
              re[G] = !re[G], _.setState({ expanded: re });
            }, _.state = { expanded: [] }, _;
          }
          return d(S, [{ key: "getExpandedIcon", value: function(R) {
            var _ = this.props, G = _.theme, re = _.iconStyle;
            return this.state.expanded[R] ? f.a.createElement(bt, { theme: G, iconStyle: re }) : f.a.createElement(Nt, { theme: G, iconStyle: re });
          } }, { key: "render", value: function() {
            var R = this, _ = this.props, G = _.src, re = _.groupArraysAfterLength, Q = (_.depth, _.name), H = _.theme, se = _.jsvRoot, Oe = _.namespace, Ze = (_.parent_type, O(_, ["src", "groupArraysAfterLength", "depth", "name", "theme", "jsvRoot", "namespace", "parent_type"])), nt = 0, lt = 5 * this.props.indentWidth;
            se || (nt = 5 * this.props.indentWidth);
            var Xe = re, ct = Math.ceil(G.length / Xe);
            return f.a.createElement("div", Object.assign({ className: "object-key-val" }, $(H, se ? "jsv-root" : "objectKeyVal", { paddingLeft: nt })), f.a.createElement(et, this.props), f.a.createElement("span", null, f.a.createElement(rt, Object.assign({ size: G.length }, this.props))), ue(Array(ct)).map((function(yt, ze) {
              return f.a.createElement("div", Object.assign({ key: ze, className: "object-key-val array-group" }, $(H, "objectKeyVal", { marginLeft: 6, paddingLeft: lt })), f.a.createElement("span", $(H, "brace-row"), f.a.createElement("div", Object.assign({ className: "icon-container" }, $(H, "icon-container"), { onClick: function($t) {
                R.toggleCollapsed(ze);
              } }), R.getExpandedIcon(ze)), R.state.expanded[ze] ? f.a.createElement(qr, Object.assign({ key: Q + ze, depth: 0, name: !1, collapsed: !1, groupArraysAfterLength: Xe, index_offset: ze * Xe, src: G.slice(ze * Xe, ze * Xe + Xe), namespace: Oe, type: "array", parent_type: "array_group", theme: H }, Ze)) : f.a.createElement("span", Object.assign({}, $(H, "brace"), { onClick: function($t) {
                R.toggleCollapsed(ze);
              }, className: "array-group-brace" }), "[", f.a.createElement("div", Object.assign({}, $(H, "array-group-meta-data"), { className: "array-group-meta-data" }), f.a.createElement("span", Object.assign({ className: "object-size" }, $(H, "object-size")), ze * Xe, " - ", ze * Xe + Xe > G.length ? G.length : ze * Xe + Xe)), "]")));
            })));
          } }]), S;
        })(f.a.PureComponent), Pr = (function(j) {
          h(S, j);
          var N = k(S);
          function S(R) {
            var _;
            u(this, S), (_ = N.call(this, R)).toggleCollapsed = function() {
              _.setState({ expanded: !_.state.expanded }, (function() {
                ye.set(_.props.rjvId, _.props.namespace, "expanded", _.state.expanded);
              }));
            }, _.getObjectContent = function(re, Q, H) {
              return f.a.createElement("div", { className: "pushed-content object-container" }, f.a.createElement("div", Object.assign({ className: "object-content" }, $(_.props.theme, "pushed-content")), _.renderObjectContents(Q, H)));
            }, _.getEllipsis = function() {
              return _.state.size === 0 ? null : f.a.createElement("div", Object.assign({}, $(_.props.theme, "ellipsis"), { className: "node-ellipsis", onClick: _.toggleCollapsed }), "...");
            }, _.getObjectMetaData = function(re) {
              var Q = _.props, H = (Q.rjvId, Q.theme, _.state), se = H.size, Oe = H.hovered;
              return f.a.createElement(rt, Object.assign({ rowHovered: Oe, size: se }, _.props));
            }, _.renderObjectContents = function(re, Q) {
              var H, se = _.props, Oe = se.depth, Ze = se.parent_type, nt = se.index_offset, lt = se.groupArraysAfterLength, Xe = se.namespace, ct = _.state.object_type, yt = [], ze = Object.keys(re || {});
              return _.props.sortKeys && ct !== "array" && (ze = ze.sort()), ze.forEach((function($t) {
                if (H = new Co($t, re[$t]), Ze === "array_group" && nt && (H.name = parseInt(H.name) + nt), re.hasOwnProperty($t)) if (H.type === "object") yt.push(f.a.createElement(qr, Object.assign({ key: H.name, depth: Oe + 1, name: H.name, src: H.value, namespace: Xe.concat(H.name), parent_type: ct }, Q)));
                else if (H.type === "array") {
                  var _t = qr;
                  lt && H.value.length > lt && (_t = Lt), yt.push(f.a.createElement(_t, Object.assign({ key: H.name, depth: Oe + 1, name: H.name, src: H.value, namespace: Xe.concat(H.name), type: "array", parent_type: ct }, Q)));
                } else yt.push(f.a.createElement(ot, Object.assign({ key: H.name + "_" + Xe, variable: H, singleIndent: 5, namespace: Xe, type: _.props.type }, Q)));
              })), yt;
            };
            var G = S.getState(R);
            return _.state = l(l({}, G), {}, { prevProps: {} }), _;
          }
          return d(S, [{ key: "getBraceStart", value: function(R, _) {
            var G = this, re = this.props, Q = re.src, H = re.theme, se = re.iconStyle;
            if (re.parent_type === "array_group") return f.a.createElement("span", null, f.a.createElement("span", $(H, "brace"), R === "array" ? "[" : "{"), _ ? this.getObjectMetaData(Q) : null);
            var Oe = _ ? bt : Nt;
            return f.a.createElement("span", null, f.a.createElement("span", Object.assign({ onClick: function(Ze) {
              G.toggleCollapsed();
            } }, $(H, "brace-row")), f.a.createElement("div", Object.assign({ className: "icon-container" }, $(H, "icon-container")), f.a.createElement(Oe, { theme: H, iconStyle: se })), f.a.createElement(et, this.props), f.a.createElement("span", $(H, "brace"), R === "array" ? "[" : "{")), _ ? this.getObjectMetaData(Q) : null);
          } }, { key: "render", value: function() {
            var R = this, _ = this.props, G = _.depth, re = _.src, Q = (_.namespace, _.name, _.type, _.parent_type), H = _.theme, se = _.jsvRoot, Oe = _.iconStyle, Ze = O(_, ["depth", "src", "namespace", "name", "type", "parent_type", "theme", "jsvRoot", "iconStyle"]), nt = this.state, lt = nt.object_type, Xe = nt.expanded, ct = {};
            return se || Q === "array_group" ? Q === "array_group" && (ct.borderLeft = 0, ct.display = "inline") : ct.paddingLeft = 5 * this.props.indentWidth, f.a.createElement("div", Object.assign({ className: "object-key-val", onMouseEnter: function() {
              return R.setState(l(l({}, R.state), {}, { hovered: !0 }));
            }, onMouseLeave: function() {
              return R.setState(l(l({}, R.state), {}, { hovered: !1 }));
            } }, $(H, se ? "jsv-root" : "objectKeyVal", ct)), this.getBraceStart(lt, Xe), Xe ? this.getObjectContent(G, re, l({ theme: H, iconStyle: Oe }, Ze)) : this.getEllipsis(), f.a.createElement("span", { className: "brace-row" }, f.a.createElement("span", { style: l(l({}, $(H, "brace").style), {}, { paddingLeft: Xe ? "3px" : "0px" }) }, lt === "array" ? "]" : "}"), Xe ? null : this.getObjectMetaData(re)));
          } }], [{ key: "getDerivedStateFromProps", value: function(R, _) {
            var G = _.prevProps;
            return R.src !== G.src || R.collapsed !== G.collapsed || R.name !== G.name || R.namespace !== G.namespace || R.rjvId !== G.rjvId ? l(l({}, S.getState(R)), {}, { prevProps: R }) : null;
          } }]), S;
        })(f.a.PureComponent);
        Pr.getState = function(j) {
          var N = Object.keys(j.src).length, S = (j.collapsed === !1 || j.collapsed !== !0 && j.collapsed > j.depth) && (!j.shouldCollapse || j.shouldCollapse({ name: j.name, src: j.src, type: P(j.src), namespace: j.namespace }) === !1) && N !== 0;
          return { expanded: ye.get(j.rjvId, j.namespace, "expanded", S), object_type: j.type === "array" ? "array" : "object", parent_type: j.type === "array" ? "array" : "object", size: N, hovered: !1 };
        };
        var Co = function j(N, S) {
          u(this, j), this.name = N, this.value = S, this.type = P(S);
        };
        W(Pr);
        var qr = Pr, So = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            var R;
            u(this, S);
            for (var _ = arguments.length, G = new Array(_), re = 0; re < _; re++) G[re] = arguments[re];
            return (R = N.call.apply(N, [this].concat(G))).render = function() {
              var Q = y(R).props, H = [Q.name], se = qr;
              return Array.isArray(Q.src) && Q.groupArraysAfterLength && Q.src.length > Q.groupArraysAfterLength && (se = Lt), f.a.createElement("div", { className: "pretty-json-container object-container" }, f.a.createElement("div", { className: "object-content" }, f.a.createElement(se, Object.assign({ namespace: H, depth: 0, jsvRoot: !0 }, Q))));
            }, R;
          }
          return S;
        })(f.a.PureComponent), wo = (function(j) {
          h(S, j);
          var N = k(S);
          function S(R) {
            var _;
            return u(this, S), (_ = N.call(this, R)).closeModal = function() {
              de.dispatch({ rjvId: _.props.rjvId, name: "RESET" });
            }, _.submit = function() {
              _.props.submit(_.state.input);
            }, _.state = { input: R.input ? R.input : "" }, _;
          }
          return d(S, [{ key: "render", value: function() {
            var R = this, _ = this.props, G = _.theme, re = _.rjvId, Q = _.isValid, H = this.state.input, se = Q(H);
            return f.a.createElement("div", Object.assign({ className: "key-modal-request" }, $(G, "key-modal-request"), { onClick: this.closeModal }), f.a.createElement("div", Object.assign({}, $(G, "key-modal"), { onClick: function(Oe) {
              Oe.stopPropagation();
            } }), f.a.createElement("div", $(G, "key-modal-label"), "Key Name:"), f.a.createElement("div", { style: { position: "relative" } }, f.a.createElement("input", Object.assign({}, $(G, "key-modal-input"), { className: "key-modal-input", ref: function(Oe) {
              return Oe && Oe.focus();
            }, spellCheck: !1, value: H, placeholder: "...", onChange: function(Oe) {
              R.setState({ input: Oe.target.value });
            }, onKeyPress: function(Oe) {
              se && Oe.key === "Enter" ? R.submit() : Oe.key === "Escape" && R.closeModal();
            } })), se ? f.a.createElement(De, Object.assign({}, $(G, "key-modal-submit"), { className: "key-modal-submit", onClick: function(Oe) {
              return R.submit();
            } })) : null), f.a.createElement("span", $(G, "key-modal-cancel"), f.a.createElement(Qe, Object.assign({}, $(G, "key-modal-cancel-icon"), { className: "key-modal-cancel", onClick: function() {
              de.dispatch({ rjvId: re, name: "RESET" });
            } })))));
          } }]), S;
        })(f.a.PureComponent), qt = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            var R;
            u(this, S);
            for (var _ = arguments.length, G = new Array(_), re = 0; re < _; re++) G[re] = arguments[re];
            return (R = N.call.apply(N, [this].concat(G))).isValid = function(Q) {
              var H = R.props.rjvId, se = ye.get(H, "action", "new-key-request");
              return Q != "" && Object.keys(se.existing_value).indexOf(Q) === -1;
            }, R.submit = function(Q) {
              var H = R.props.rjvId, se = ye.get(H, "action", "new-key-request");
              se.new_value = l({}, se.existing_value), se.new_value[Q] = R.props.defaultValue, de.dispatch({ name: "VARIABLE_ADDED", rjvId: H, data: se });
            }, R;
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.active, G = R.theme, re = R.rjvId;
            return _ ? f.a.createElement(wo, { rjvId: re, theme: G, isValid: this.isValid, submit: this.submit }) : null;
          } }]), S;
        })(f.a.PureComponent), Eo = (function(j) {
          h(S, j);
          var N = k(S);
          function S() {
            return u(this, S), N.apply(this, arguments);
          }
          return d(S, [{ key: "render", value: function() {
            var R = this.props, _ = R.message, G = R.active, re = R.theme, Q = R.rjvId;
            return G ? f.a.createElement("div", Object.assign({ className: "validation-failure" }, $(re, "validation-failure"), { onClick: function() {
              de.dispatch({ rjvId: Q, name: "RESET" });
            } }), f.a.createElement("span", $(re, "validation-failure-label"), _), f.a.createElement(Qe, $(re, "validation-failure-clear"))) : null;
          } }]), S;
        })(f.a.PureComponent), Gr = (function(j) {
          h(S, j);
          var N = k(S);
          function S(R) {
            var _;
            return u(this, S), (_ = N.call(this, R)).rjvId = Date.now().toString(), _.getListeners = function() {
              return { reset: _.resetState, "variable-update": _.updateSrc, "add-key-request": _.addKeyRequest };
            }, _.updateSrc = function() {
              var G, re = ye.get(_.rjvId, "action", "variable-update"), Q = re.name, H = re.namespace, se = re.new_value, Oe = re.existing_value, Ze = (re.variable_removed, re.updated_src), nt = re.type, lt = _.props, Xe = lt.onEdit, ct = lt.onDelete, yt = lt.onAdd, ze = { existing_src: _.state.src, new_value: se, updated_src: Ze, name: Q, namespace: H, existing_value: Oe };
              switch (nt) {
                case "variable-added":
                  G = yt(ze);
                  break;
                case "variable-edited":
                  G = Xe(ze);
                  break;
                case "variable-removed":
                  G = ct(ze);
              }
              G !== !1 ? (ye.set(_.rjvId, "global", "src", Ze), _.setState({ src: Ze })) : _.setState({ validationFailure: !0 });
            }, _.addKeyRequest = function() {
              _.setState({ addKeyRequest: !0 });
            }, _.resetState = function() {
              _.setState({ validationFailure: !1, addKeyRequest: !1 });
            }, _.state = { addKeyRequest: !1, editKeyRequest: !1, validationFailure: !1, src: S.defaultProps.src, name: S.defaultProps.name, theme: S.defaultProps.theme, validationMessage: S.defaultProps.validationMessage, prevSrc: S.defaultProps.src, prevName: S.defaultProps.name, prevTheme: S.defaultProps.theme }, _;
          }
          return d(S, [{ key: "componentDidMount", value: function() {
            ye.set(this.rjvId, "global", "src", this.state.src);
            var R = this.getListeners();
            for (var _ in R) ye.on(_ + "-" + this.rjvId, R[_]);
            this.setState({ addKeyRequest: !1, editKeyRequest: !1 });
          } }, { key: "componentDidUpdate", value: function(R, _) {
            _.addKeyRequest !== !1 && this.setState({ addKeyRequest: !1 }), _.editKeyRequest !== !1 && this.setState({ editKeyRequest: !1 }), R.src !== this.state.src && ye.set(this.rjvId, "global", "src", this.state.src);
          } }, { key: "componentWillUnmount", value: function() {
            var R = this.getListeners();
            for (var _ in R) ye.removeListener(_ + "-" + this.rjvId, R[_]);
          } }, { key: "render", value: function() {
            var R = this.state, _ = R.validationFailure, G = R.validationMessage, re = R.addKeyRequest, Q = R.theme, H = R.src, se = R.name, Oe = this.props, Ze = Oe.style, nt = Oe.defaultValue;
            return f.a.createElement("div", { className: "react-json-view", style: l(l({}, $(Q, "app-container").style), Ze) }, f.a.createElement(Eo, { message: G, active: _, theme: Q, rjvId: this.rjvId }), f.a.createElement(So, Object.assign({}, this.props, { src: H, name: se, theme: Q, type: P(H), rjvId: this.rjvId })), f.a.createElement(qt, { active: re, theme: Q, rjvId: this.rjvId, defaultValue: nt }));
          } }], [{ key: "getDerivedStateFromProps", value: function(R, _) {
            if (R.src !== _.prevSrc || R.name !== _.prevName || R.theme !== _.prevTheme) {
              var G = { src: R.src, name: R.name, theme: R.theme, validationMessage: R.validationMessage, prevSrc: R.src, prevName: R.name, prevTheme: R.theme };
              return S.validateState(G);
            }
            return null;
          } }]), S;
        })(f.a.PureComponent);
        Gr.defaultProps = { src: {}, name: "root", theme: "rjv-default", collapsed: !1, collapseStringsAfterLength: !1, shouldCollapse: !1, sortKeys: !1, quotesOnKeys: !0, groupArraysAfterLength: 100, indentWidth: 4, enableClipboard: !0, displayObjectSize: !0, displayDataTypes: !0, onEdit: !1, onDelete: !1, onAdd: !1, onSelect: !1, iconStyle: "triangle", style: {}, validationMessage: "Validation Error", defaultValue: null, displayArrayKey: !0 }, Gr.validateState = function(j) {
          var N = {};
          return P(j.theme) !== "object" || (function(S) {
            var R = ["base00", "base01", "base02", "base03", "base04", "base05", "base06", "base07", "base08", "base09", "base0A", "base0B", "base0C", "base0D", "base0E", "base0F"];
            if (P(S) === "object") {
              for (var _ = 0; _ < R.length; _++) if (!(R[_] in S)) return !1;
              return !0;
            }
            return !1;
          })(j.theme) || (console.error("react-json-view error:", "theme prop must be a theme name or valid base-16 theme object.", 'defaulting to "rjv-default" theme'), N.theme = "rjv-default"), P(j.src) !== "object" && P(j.src) !== "array" && (console.error("react-json-view error:", "src property must be a valid json object"), N.name = "ERROR", N.src = { message: "src property must be a valid json object" }), l(l({}, j), N);
        }, W(Gr), n.default = Gr;
      }]);
    }));
  })(Ia)), Ia.exports;
}
var Wb = zb();
const Vb = /* @__PURE__ */ Or(Wb);
function Hb(t) {
  const { maxHeight: e = "initial" } = t;
  return /* @__PURE__ */ B.jsx(ve, { maxHeight: e, overflow: "auto", width: "100%", children: /* @__PURE__ */ B.jsx(Vb, { ...t }) });
}
const Ni = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
})), Bu = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91c.48.22 1.05.34 1.7.34.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
})), Kb = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
})), Ub = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
})), qb = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M8 5v14l11-7z"
})), Gb = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"
})), Gl = Jt(/* @__PURE__ */ b.createElement("path", {
  d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
})), Yb = "Message", Fu = (t) => (t == null ? void 0 : t.replace(/\s/g, " ")) ?? "";
function Xb(t) {
  const { title: e, value: a } = t, r = Du(), o = (() => {
    switch (typeof a) {
      case "string":
        return Fu(a);
      case "number":
      case "boolean":
      case "bigint":
        return a.toString();
      case "object":
        return a ? /* @__PURE__ */ B.jsx(
          Hb,
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
  return !o || e === "randomKey" || e === "isNewLog" || e === "traceAvailable" || e === "displayTimeStamp" || e === "apiName" || !e ? null : /* @__PURE__ */ B.jsxs("div", { className: r.expandedLogRow, children: [
    /* @__PURE__ */ B.jsx("span", { className: r.expandedLogKey, children: e }),
    /* @__PURE__ */ B.jsx("span", { children: o })
  ] });
}
function Jb(t) {
  var m;
  const {
    logEntry: e,
    timeZone: a,
    onCopy: r,
    getColor: n,
    isHeiglighted: o,
    isExpanded: i,
    isExpandable: s
  } = t, l = Du(), u = "Copy", c = "Copy Selection", d = (y) => {
    const w = parseInt(y, 10);
    return w >= 200 && w < 300 ? l.infoLogs : w >= 300 && w < 400 ? l.warnLogs : w >= 400 && w < 600 ? l.errorLogs : l.logOther;
  }, p = (y) => {
    const w = y.toUpperCase();
    return w === Mb ? l.infoLogs : w === Nb ? l.warningLogs : w === Lb || w === Db ? l.errorLogs : w === Bb ? l.infoLogs : d(w);
  }, h = () => {
    r(e);
  }, g = (y) => {
    y.preventDefault(), y.stopPropagation();
  };
  return /* @__PURE__ */ B.jsxs("div", { children: [
    /* @__PURE__ */ B.jsxs(
      "div",
      {
        className: he(l.defaultLogLine, {
          [l.highlightedLogLine]: e.isNewLog && !o,
          [l.selectedLogLine]: o,
          [l.whiteBackground]: !(o || e.isNewLog)
        }),
        "data-testid": "log-panel-entry",
        children: [
          s ? /* @__PURE__ */ B.jsx("div", { className: l.arrow, children: i ? /* @__PURE__ */ B.jsx(Ni, { fontSize: "inherit", rotate: 90 }) : /* @__PURE__ */ B.jsx(Ni, { fontSize: "inherit" }) }) : /* @__PURE__ */ B.jsx("div", { className: l.arrow }),
          /* @__PURE__ */ B.jsxs("div", { className: l.logLineWrapper, children: [
            /* @__PURE__ */ B.jsxs("span", { className: l.infoSection, children: [
              /* @__PURE__ */ B.jsxs(
                "span",
                {
                  className: he(
                    p(Ab),
                    l.toolTipParent
                  ),
                  children: [
                    Ib(new Date(e.timestamp), a),
                    " "
                  ]
                }
              ),
              (e == null ? void 0 : e.message) && /* @__PURE__ */ B.jsxs(
                "span",
                {
                  className: he(
                    (m = e == null ? void 0 : e.message) != null && m.includes("Error") ? l.errorLogs : n(e == null ? void 0 : e.message),
                    l.toolTipParent
                  ),
                  children: [
                    e == null ? void 0 : e.message,
                    " ",
                    /* @__PURE__ */ B.jsx("span", { className: l.toolTipChild, children: Yb })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ B.jsx("span", { className: l.logMsg, children: /* @__PURE__ */ B.jsx(
              "span",
              {
                className: he(
                  l.disableUserSelect,
                  l.logEntryActions
                ),
                children: /* @__PURE__ */ B.jsx("span", { className: l.actionContainer, children: /* @__PURE__ */ B.jsxs(
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
                      /* @__PURE__ */ B.jsx(Bu, { className: l.actionIcon }),
                      /* @__PURE__ */ B.jsx("span", { className: l.actionLabel, children: o ? c : u })
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
    i && /* @__PURE__ */ B.jsx("div", { className: l.tableContainer, children: Object.entries(e).map(([y, w]) => /* @__PURE__ */ B.jsx(
      Xb,
      {
        title: y,
        value: y === "logLine" ? Fu(String(w ?? "")) : w
      },
      y
    )) })
  ] });
}
/*! clipboard-copy. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var ii, Yl;
function Zb() {
  if (Yl) return ii;
  Yl = 1, ii = r;
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
  return ii;
}
var Qb = Zb();
const zu = /* @__PURE__ */ Or(Qb), gs = ar(
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
    label: {
      color: t.palette.secondary.dark,
      fontWeight: 400,
      minWidth: t.spacing(12.5),
      marginTop: "10px"
    },
    textArea: {
      borderRadius: 5,
      "& .MuiOutlinedInput-root": {
        borderRadius: 5,
        padding: 0,
        "& .MuiOutlinedInput-input": {
          backgroundColor: t.palette.common.white,
          borderRadius: 5,
          boxShadow: "inset 0 0 0 1px rgba(85,103,213,0.4), inset 0 1px 1px 0 rgba(0,0,0,0.07), 0 0 0 0 rgba(50,50,77,0.07)",
          padding: t.spacing(2.0375),
          "&:active, &:focus": {
            borderRadius: 5,
            borderColor: "transparent",
            boxShadow: "inset 0 0 0 1px rgba(85,103,213,0.4), inset 0 1px 1px 0 rgba(0,0,0,0.07), 0 0 0 0 rgba(50,50,77,0.07)"
          },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 4
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#e6e7ec",
            borderRadius: 2
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent"
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#eee"
          }
        }
      }
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
    callbackURLTextInput: {
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
), ey = ar(
  (t) => fr({
    commons: {
      boxShadow: `0 1px 2px  ${Je(t.palette.common.black, 0.15)}`,
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
        boxShadow: `0 1px 3px ${Je(t.palette.common.black, 0.1)}`
      },
      "&:focus": {
        boxShadow: `0 1px 6px 2px ${Je(t.palette.common.black, 0.1)}`
      }
    },
    outlined: {
      backgroundColor: "transparent",
      boxShadow: `0 1px 2px ${Je(t.palette.common.black, 0.05)}`,
      "&:hover, &:focus": {
        backgroundColor: "transparent",
        boxShadow: `0 1px 6px 2px ${Je(t.palette.common.black, 0.1)}`
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
      boxShadow: `0 1px 3px ${Je(t.palette.common.black, 0.05)}`,
      backgroundColor: "#E5E4E2",
      "&:hover": {
        backgroundColor: "#E5E4E2",
        boxShadow: `0 1px 3px ${Je(t.palette.common.black, 0.1)}`
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
      boxShadow: `0 1px 2px  ${Je(t.palette.common.black, 0.05)}`,
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
      boxShadow: `0 1px 2px ${Je(t.palette.common.black, 0.05)}`,
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
), Cr = (t) => {
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
  } = t, c = ey(), d = a === "primary", p = a === "secondary", h = a === "error", g = a === "success", m = a === "warning", y = r === "text", w = r === "outlined", k = r === "contained", I = r === "subtle", f = r === "link", x = i === "small", E = i === "tiny";
  return /* @__PURE__ */ B.jsx(
    jg,
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
}, ty = (t) => {
  const e = gs(), { messages: a, clearLogs: r, isDisabled: n } = t, o = () => {
    const i = a.map((s) => `${s.timestamp} ${s.message}`).join(`
`);
    zu(i);
  };
  return /* @__PURE__ */ B.jsxs(ve, { className: e.outputConsoleContainer, children: [
    /* @__PURE__ */ B.jsx(Mt, { variant: "body1", children: "Output" }),
    /* @__PURE__ */ B.jsxs(ve, { children: [
      /* @__PURE__ */ B.jsx(
        Cr,
        {
          testId: "copy-output",
          variant: "link",
          disabled: n,
          onClick: o,
          startIcon: /* @__PURE__ */ B.jsx(Bu, {}),
          color: "primary",
          size: "small",
          className: e.copyButton,
          children: "Copy Output"
        }
      ),
      /* @__PURE__ */ B.jsx(
        Cr,
        {
          testId: "clear-output",
          variant: "link",
          onClick: r,
          disabled: n,
          startIcon: /* @__PURE__ */ B.jsx(Kb, {}),
          color: "error",
          size: "small",
          children: "Clear"
        }
      )
    ] })
  ] });
}, ry = Md(() => import("./index-DTebFONq.mjs")), ny = {
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
function Xl({
  fileContent: t,
  language: e,
  width: a = "100%",
  height: r = "70vh",
  setFileContent: n
}) {
  const o = gs();
  return /* @__PURE__ */ B.jsx(ve, { className: o.editorContainer, children: /* @__PURE__ */ B.jsx(hi, { fallback: /* @__PURE__ */ B.jsx(Xn, {}), children: /* @__PURE__ */ B.jsx(
    ry,
    {
      width: a,
      height: r,
      theme: "choreoRequestLightTheme",
      language: e,
      options: ny,
      onChange: (i) => n(i),
      value: t
    }
  ) }) });
}
const Wu = ar(
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
), ay = rs(ug)(({ theme: t }) => ({
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
})), Jl = (t) => {
  const { children: e, testId: a, contained: r = !0, bordered: n, ...o } = t, i = r ? void 0 : "outlined", s = Wu();
  return /* @__PURE__ */ B.jsx(
    ay,
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
}, oy = rs(pg)(() => ({
  padding: 0
})), Zl = (t) => {
  const { testId: e, children: a, ...r } = t;
  return /* @__PURE__ */ B.jsx(oy, { "data-cyid": e, ...r, children: a });
}, Ql = (t) => {
  const {
    children: e,
    testId: a,
    noPadding: r = !1,
    expandIcon: n,
    backgroundFilled: o = !1,
    className: i,
    ...s
  } = t, l = Wu();
  return /* @__PURE__ */ B.jsx(
    $g,
    {
      expandIcon: n || /* @__PURE__ */ B.jsx(Ni, { fontSize: "inherit", rotate: 90 }),
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
}, iy = ar(
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
        backgroundColor: Je("#0095ff", 0.1)
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
function si(t) {
  const {
    label: e,
    color: a = "default",
    variant: r = "contained",
    size: n = "medium",
    icon: o,
    testId: i,
    ...s
  } = t, l = iy();
  return /* @__PURE__ */ B.jsx(
    Ng,
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
const ec = (t) => t, sy = () => {
  let t = ec;
  return {
    configure(e) {
      t = e;
    },
    generate(e) {
      return t(e);
    },
    reset() {
      t = ec;
    }
  };
}, ly = sy();
function Kr(t, ...e) {
  const a = new URL(`https://mui.com/production-error/?code=${t}`);
  return e.forEach((r) => a.searchParams.append("args[]", r)), `Minified MUI error #${t}; visit ${a} for the full message.`;
}
function Sn(t) {
  if (typeof t != "string")
    throw new Error(Kr(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Vu(t) {
  var e, a, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var n = t.length;
    for (e = 0; e < n; e++) t[e] && (a = Vu(t[e])) && (r && (r += " "), r += a);
  } else for (a in t) t[a] && (r && (r += " "), r += a);
  return r;
}
function cy() {
  for (var t, e, a = 0, r = "", n = arguments.length; a < n; a++) (t = arguments[a]) && (e = Vu(t)) && (r && (r += " "), r += e);
  return r;
}
function uy(t, e, a = void 0) {
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
var li = { exports: {} }, vt = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tc;
function dy() {
  if (tc) return vt;
  tc = 1;
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
var rc;
function fy() {
  return rc || (rc = 1, li.exports = /* @__PURE__ */ dy()), li.exports;
}
var Hu = /* @__PURE__ */ fy();
function lr(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function Ku(t) {
  if (/* @__PURE__ */ b.isValidElement(t) || Hu.isValidElementType(t) || !lr(t))
    return t;
  const e = {};
  return Object.keys(t).forEach((a) => {
    e[a] = Ku(t[a]);
  }), e;
}
function Wt(t, e, a = {
  clone: !0
}) {
  const r = a.clone ? {
    ...t
  } : t;
  return lr(t) && lr(e) && Object.keys(e).forEach((n) => {
    /* @__PURE__ */ b.isValidElement(e[n]) || Hu.isValidElementType(e[n]) ? r[n] = e[n] : lr(e[n]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(t, n) && lr(t[n]) ? r[n] = Wt(t[n], e[n], a) : a.clone ? r[n] = lr(e[n]) ? Ku(e[n]) : e[n] : r[n] = e[n];
  }), r;
}
function Un(t, e) {
  return e ? Wt(t, e, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : t;
}
function nc(t, e) {
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
function py(t, e) {
  return e === "@" || e.startsWith("@") && (t.some((a) => e.startsWith(`@${a}`)) || !!e.match(/^@\d/));
}
function hy(t, e) {
  const a = e.match(/^@([^/]+)?\/?(.+)?$/);
  if (!a)
    return null;
  const [, r, n] = a, o = Number.isNaN(+r) ? r || 0 : +r;
  return t.containerQueries(n).up(o);
}
function my(t) {
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
const io = {
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
}, ac = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (t) => `@media (min-width:${io[t]}px)`
}, gy = {
  containerQueries: (t) => ({
    up: (e) => {
      let a = typeof e == "number" ? e : io[e] || e;
      return typeof a == "number" && (a = `${a}px`), t ? `@container ${t} (min-width:${a})` : `@container (min-width:${a})`;
    }
  })
};
function ur(t, e, a) {
  const r = t.theme || {};
  if (Array.isArray(e)) {
    const o = r.breakpoints || ac;
    return e.reduce((i, s, l) => (i[o.up(o.keys[l])] = a(e[l]), i), {});
  }
  if (typeof e == "object") {
    const o = r.breakpoints || ac;
    return Object.keys(e).reduce((i, s) => {
      if (py(o.keys, s)) {
        const l = hy(r.containerQueries ? r : gy, s);
        l && (i[l] = a(e[s], s));
      } else if (Object.keys(o.values || io).includes(s)) {
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
function vy(t = {}) {
  var a;
  return ((a = t.keys) == null ? void 0 : a.reduce((r, n) => {
    const o = t.up(n);
    return r[o] = {}, r;
  }, {})) || {};
}
function oc(t, e) {
  return t.reduce((a, r) => {
    const n = a[r];
    return (!n || Object.keys(n).length === 0) && delete a[r], a;
  }, e);
}
function so(t, e, a = !0) {
  if (!e || typeof e != "string")
    return null;
  if (t && t.vars && a) {
    const r = `vars.${e}`.split(".").reduce((n, o) => n && n[o] ? n[o] : null, t);
    if (r != null)
      return r;
  }
  return e.split(".").reduce((r, n) => r && r[n] != null ? r[n] : null, t);
}
function qa(t, e, a, r = a) {
  let n;
  return typeof t == "function" ? n = t(a) : Array.isArray(t) ? n = t[a] || r : n = so(t, a) || r, e && (n = e(n, r, t)), n;
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
    const s = i[e], l = i.theme, u = so(l, r) || {};
    return ur(i, s, (d) => {
      let p = qa(u, n, d);
      return d === p && typeof d == "string" && (p = qa(u, n, `${e}${d === "default" ? "" : Sn(d)}`, d)), a === !1 ? p : {
        [a]: p
      };
    });
  };
  return o.propTypes = {}, o.filterProps = [e], o;
}
function by(t) {
  const e = {};
  return (a) => (e[a] === void 0 && (e[a] = t(a)), e[a]);
}
const yy = {
  m: "margin",
  p: "padding"
}, xy = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, ic = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Cy = by((t) => {
  if (t.length > 2)
    if (ic[t])
      t = ic[t];
    else
      return [t];
  const [e, a] = t.split(""), r = yy[e], n = xy[a] || "";
  return Array.isArray(n) ? n.map((o) => r + o) : [r + n];
}), vs = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], bs = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
[...vs, ...bs];
function la(t, e, a, r) {
  const n = so(t, e, !0) ?? a;
  return typeof n == "number" || typeof n == "string" ? (o) => typeof o == "string" ? o : typeof n == "string" ? n.startsWith("var(") && o === 0 ? 0 : n.startsWith("var(") && o === 1 ? n : `calc(${o} * ${n})` : n * o : Array.isArray(n) ? (o) => {
    if (typeof o == "string")
      return o;
    const i = Math.abs(o), s = n[i];
    return o >= 0 ? s : typeof s == "number" ? -s : typeof s == "string" && s.startsWith("var(") ? `calc(-1 * ${s})` : `-${s}`;
  } : typeof n == "function" ? n : () => {
  };
}
function ys(t) {
  return la(t, "spacing", 8);
}
function ca(t, e) {
  return typeof e == "string" || e == null ? e : t(e);
}
function Sy(t, e) {
  return (a) => t.reduce((r, n) => (r[n] = ca(e, a), r), {});
}
function wy(t, e, a, r) {
  if (!e.includes(a))
    return null;
  const n = Cy(a), o = Sy(n, r), i = t[a];
  return ur(t, i, o);
}
function Uu(t, e) {
  const a = ys(t.theme);
  return Object.keys(t).map((r) => wy(t, e, r, a)).reduce(Un, {});
}
function wt(t) {
  return Uu(t, vs);
}
wt.propTypes = {};
wt.filterProps = vs;
function Et(t) {
  return Uu(t, bs);
}
Et.propTypes = {};
Et.filterProps = bs;
function lo(...t) {
  const e = t.reduce((r, n) => (n.filterProps.forEach((o) => {
    r[o] = n;
  }), r), {}), a = (r) => Object.keys(r).reduce((n, o) => e[o] ? Un(n, e[o](r)) : n, {});
  return a.propTypes = {}, a.filterProps = t.reduce((r, n) => r.concat(n.filterProps), []), a;
}
function Ht(t) {
  return typeof t != "number" ? t : `${t}px solid`;
}
function Ut(t, e) {
  return kt({
    prop: t,
    themeKey: "borders",
    transform: e
  });
}
const Ey = Ut("border", Ht), ky = Ut("borderTop", Ht), $y = Ut("borderRight", Ht), Ry = Ut("borderBottom", Ht), Ty = Ut("borderLeft", Ht), Oy = Ut("borderColor"), _y = Ut("borderTopColor"), Py = Ut("borderRightColor"), jy = Ut("borderBottomColor"), Iy = Ut("borderLeftColor"), Ay = Ut("outline", Ht), My = Ut("outlineColor"), co = (t) => {
  if (t.borderRadius !== void 0 && t.borderRadius !== null) {
    const e = la(t.theme, "shape.borderRadius", 4), a = (r) => ({
      borderRadius: ca(e, r)
    });
    return ur(t, t.borderRadius, a);
  }
  return null;
};
co.propTypes = {};
co.filterProps = ["borderRadius"];
lo(Ey, ky, $y, Ry, Ty, Oy, _y, Py, jy, Iy, co, Ay, My);
const uo = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const e = la(t.theme, "spacing", 8), a = (r) => ({
      gap: ca(e, r)
    });
    return ur(t, t.gap, a);
  }
  return null;
};
uo.propTypes = {};
uo.filterProps = ["gap"];
const fo = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const e = la(t.theme, "spacing", 8), a = (r) => ({
      columnGap: ca(e, r)
    });
    return ur(t, t.columnGap, a);
  }
  return null;
};
fo.propTypes = {};
fo.filterProps = ["columnGap"];
const po = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const e = la(t.theme, "spacing", 8), a = (r) => ({
      rowGap: ca(e, r)
    });
    return ur(t, t.rowGap, a);
  }
  return null;
};
po.propTypes = {};
po.filterProps = ["rowGap"];
const Ny = kt({
  prop: "gridColumn"
}), Ly = kt({
  prop: "gridRow"
}), Dy = kt({
  prop: "gridAutoFlow"
}), By = kt({
  prop: "gridAutoColumns"
}), Fy = kt({
  prop: "gridAutoRows"
}), zy = kt({
  prop: "gridTemplateColumns"
}), Wy = kt({
  prop: "gridTemplateRows"
}), Vy = kt({
  prop: "gridTemplateAreas"
}), Hy = kt({
  prop: "gridArea"
});
lo(uo, fo, po, Ny, Ly, Dy, By, Fy, zy, Wy, Vy, Hy);
function gn(t, e) {
  return e === "grey" ? e : t;
}
const Ky = kt({
  prop: "color",
  themeKey: "palette",
  transform: gn
}), Uy = kt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: gn
}), qy = kt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: gn
});
lo(Ky, Uy, qy);
function zt(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const Gy = kt({
  prop: "width",
  transform: zt
}), xs = (t) => {
  if (t.maxWidth !== void 0 && t.maxWidth !== null) {
    const e = (a) => {
      var n, o, i, s, l;
      const r = ((i = (o = (n = t.theme) == null ? void 0 : n.breakpoints) == null ? void 0 : o.values) == null ? void 0 : i[a]) || io[a];
      return r ? ((l = (s = t.theme) == null ? void 0 : s.breakpoints) == null ? void 0 : l.unit) !== "px" ? {
        maxWidth: `${r}${t.theme.breakpoints.unit}`
      } : {
        maxWidth: r
      } : {
        maxWidth: zt(a)
      };
    };
    return ur(t, t.maxWidth, e);
  }
  return null;
};
xs.filterProps = ["maxWidth"];
const Yy = kt({
  prop: "minWidth",
  transform: zt
}), Xy = kt({
  prop: "height",
  transform: zt
}), Jy = kt({
  prop: "maxHeight",
  transform: zt
}), Zy = kt({
  prop: "minHeight",
  transform: zt
});
kt({
  prop: "size",
  cssProperty: "width",
  transform: zt
});
kt({
  prop: "size",
  cssProperty: "height",
  transform: zt
});
const Qy = kt({
  prop: "boxSizing"
});
lo(Gy, xs, Yy, Xy, Jy, Zy, Qy);
const ho = {
  // borders
  border: {
    themeKey: "borders",
    transform: Ht
  },
  borderTop: {
    themeKey: "borders",
    transform: Ht
  },
  borderRight: {
    themeKey: "borders",
    transform: Ht
  },
  borderBottom: {
    themeKey: "borders",
    transform: Ht
  },
  borderLeft: {
    themeKey: "borders",
    transform: Ht
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
    transform: Ht
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: co
  },
  // palette
  color: {
    themeKey: "palette",
    transform: gn
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: gn
  },
  backgroundColor: {
    themeKey: "palette",
    transform: gn
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
    style: uo
  },
  rowGap: {
    style: po
  },
  columnGap: {
    style: fo
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
    transform: zt
  },
  maxWidth: {
    style: xs
  },
  minWidth: {
    transform: zt
  },
  height: {
    transform: zt
  },
  maxHeight: {
    transform: zt
  },
  minHeight: {
    transform: zt
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
function e1(...t) {
  const e = t.reduce((r, n) => r.concat(Object.keys(n)), []), a = new Set(e);
  return t.every((r) => a.size === Object.keys(r).length);
}
function t1(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function r1() {
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
    const p = so(n, u) || {};
    return d ? d(i) : ur(i, r, (g) => {
      let m = qa(p, c, g);
      return g === m && typeof g == "string" && (m = qa(p, c, `${a}${g === "default" ? "" : Sn(g)}`, g)), l === !1 ? m : {
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
    const i = n.unstable_sxConfig ?? ho;
    function s(l) {
      let u = l;
      if (typeof l == "function")
        u = l(n);
      else if (typeof l != "object")
        return l;
      if (!u)
        return null;
      const c = vy(n.breakpoints), d = Object.keys(c);
      let p = c;
      return Object.keys(u).forEach((h) => {
        const g = t1(u[h], n);
        if (g != null)
          if (typeof g == "object")
            if (i[h])
              p = Un(p, t(h, g, n, i));
            else {
              const m = ur({
                theme: n
              }, g, (y) => ({
                [h]: y
              }));
              e1(m, g) ? p[h] = e({
                sx: g,
                theme: n,
                nested: !0
              }) : p = Un(p, m);
            }
          else
            p = Un(p, t(h, g, n, i));
      }), !o && n.modularCssLayers ? {
        "@layer sx": nc(n, oc(d, p))
      } : nc(n, oc(d, p));
    }
    return Array.isArray(r) ? r.map(s) : s(r);
  }
  return e;
}
const wn = r1();
wn.filterProps = ["sx"];
function n1(t) {
  if (t.sheet)
    return t.sheet;
  for (var e = 0; e < document.styleSheets.length; e++)
    if (document.styleSheets[e].ownerNode === t)
      return document.styleSheets[e];
}
function a1(t) {
  var e = document.createElement("style");
  return e.setAttribute("data-emotion", t.key), t.nonce !== void 0 && e.setAttribute("nonce", t.nonce), e.appendChild(document.createTextNode("")), e.setAttribute("data-s", ""), e;
}
var o1 = /* @__PURE__ */ (function() {
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
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(a1(this));
    var n = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var o = n1(n);
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
})(), It = "-ms-", Ga = "-moz-", it = "-webkit-", qu = "comm", Cs = "rule", Ss = "decl", i1 = "@import", Gu = "@keyframes", s1 = "@layer", l1 = Math.abs, mo = String.fromCharCode, c1 = Object.assign;
function u1(t, e) {
  return jt(t, 0) ^ 45 ? (((e << 2 ^ jt(t, 0)) << 2 ^ jt(t, 1)) << 2 ^ jt(t, 2)) << 2 ^ jt(t, 3) : 0;
}
function Yu(t) {
  return t.trim();
}
function d1(t, e) {
  return (t = e.exec(t)) ? t[0] : t;
}
function st(t, e, a) {
  return t.replace(e, a);
}
function Li(t, e) {
  return t.indexOf(e);
}
function jt(t, e) {
  return t.charCodeAt(e) | 0;
}
function Jn(t, e, a) {
  return t.slice(e, a);
}
function er(t) {
  return t.length;
}
function ws(t) {
  return t.length;
}
function Sa(t, e) {
  return e.push(t), t;
}
function f1(t, e) {
  return t.map(e).join("");
}
var go = 1, En = 1, Xu = 0, Ft = 0, Rt = 0, On = "";
function vo(t, e, a, r, n, o, i) {
  return { value: t, root: e, parent: a, type: r, props: n, children: o, line: go, column: En, length: i, return: "" };
}
function Mn(t, e) {
  return c1(vo("", null, null, "", null, null, 0), t, { length: -t.length }, e);
}
function p1() {
  return Rt;
}
function h1() {
  return Rt = Ft > 0 ? jt(On, --Ft) : 0, En--, Rt === 10 && (En = 1, go--), Rt;
}
function Vt() {
  return Rt = Ft < Xu ? jt(On, Ft++) : 0, En++, Rt === 10 && (En = 1, go++), Rt;
}
function nr() {
  return jt(On, Ft);
}
function Aa() {
  return Ft;
}
function ua(t, e) {
  return Jn(On, t, e);
}
function Zn(t) {
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
function Ju(t) {
  return go = En = 1, Xu = er(On = t), Ft = 0, [];
}
function Zu(t) {
  return On = "", t;
}
function Ma(t) {
  return Yu(ua(Ft - 1, Di(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function m1(t) {
  for (; (Rt = nr()) && Rt < 33; )
    Vt();
  return Zn(t) > 2 || Zn(Rt) > 3 ? "" : " ";
}
function g1(t, e) {
  for (; --e && Vt() && !(Rt < 48 || Rt > 102 || Rt > 57 && Rt < 65 || Rt > 70 && Rt < 97); )
    ;
  return ua(t, Aa() + (e < 6 && nr() == 32 && Vt() == 32));
}
function Di(t) {
  for (; Vt(); )
    switch (Rt) {
      // ] ) " '
      case t:
        return Ft;
      // " '
      case 34:
      case 39:
        t !== 34 && t !== 39 && Di(Rt);
        break;
      // (
      case 40:
        t === 41 && Di(t);
        break;
      // \
      case 92:
        Vt();
        break;
    }
  return Ft;
}
function v1(t, e) {
  for (; Vt() && t + Rt !== 57; )
    if (t + Rt === 84 && nr() === 47)
      break;
  return "/*" + ua(e, Ft - 1) + "*" + mo(t === 47 ? t : Vt());
}
function b1(t) {
  for (; !Zn(nr()); )
    Vt();
  return ua(t, Ft);
}
function y1(t) {
  return Zu(Na("", null, null, null, [""], t = Ju(t), 0, [0], t));
}
function Na(t, e, a, r, n, o, i, s, l) {
  for (var u = 0, c = 0, d = i, p = 0, h = 0, g = 0, m = 1, y = 1, w = 1, k = 0, I = "", f = n, x = o, E = r, L = I; y; )
    switch (g = k, k = Vt()) {
      // (
      case 40:
        if (g != 108 && jt(L, d - 1) == 58) {
          Li(L += st(Ma(k), "&", "&\f"), "&\f") != -1 && (w = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        L += Ma(k);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        L += m1(g);
        break;
      // \
      case 92:
        L += g1(Aa() - 1, 7);
        continue;
      // /
      case 47:
        switch (nr()) {
          case 42:
          case 47:
            Sa(x1(v1(Vt(), Aa()), e, a), l);
            break;
          default:
            L += "/";
        }
        break;
      // {
      case 123 * m:
        s[u++] = er(L) * w;
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
            w == -1 && (L = st(L, /\f/g, "")), h > 0 && er(L) - d && Sa(h > 32 ? lc(L + ";", r, a, d - 1) : lc(st(L, " ", "") + ";", r, a, d - 2), l);
            break;
          // @ ;
          case 59:
            L += ";";
          // { rule/at-rule
          default:
            if (Sa(E = sc(L, e, a, u, c, n, s, I, f = [], x = [], d), o), k === 123)
              if (c === 0)
                Na(L, e, E, E, f, o, d, s, x);
              else
                switch (p === 99 && jt(L, 3) === 110 ? 100 : p) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Na(t, E, E, r && Sa(sc(t, E, E, 0, 0, n, s, I, n, f = [], d), x), n, x, d, s, r ? f : x);
                    break;
                  default:
                    Na(L, E, E, E, [""], x, 0, s, x);
                }
        }
        u = c = h = 0, m = w = 1, I = L = "", d = i;
        break;
      // :
      case 58:
        d = 1 + er(L), h = g;
      default:
        if (m < 1) {
          if (k == 123)
            --m;
          else if (k == 125 && m++ == 0 && h1() == 125)
            continue;
        }
        switch (L += mo(k), k * m) {
          // &
          case 38:
            w = c > 0 ? 1 : (L += "\f", -1);
            break;
          // ,
          case 44:
            s[u++] = (er(L) - 1) * w, w = 1;
            break;
          // @
          case 64:
            nr() === 45 && (L += Ma(Vt())), p = nr(), c = d = er(I = L += b1(Aa())), k++;
            break;
          // -
          case 45:
            g === 45 && er(L) == 2 && (m = 0);
        }
    }
  return o;
}
function sc(t, e, a, r, n, o, i, s, l, u, c) {
  for (var d = n - 1, p = n === 0 ? o : [""], h = ws(p), g = 0, m = 0, y = 0; g < r; ++g)
    for (var w = 0, k = Jn(t, d + 1, d = l1(m = i[g])), I = t; w < h; ++w)
      (I = Yu(m > 0 ? p[w] + " " + k : st(k, /&\f/g, p[w]))) && (l[y++] = I);
  return vo(t, e, a, n === 0 ? Cs : s, l, u, c);
}
function x1(t, e, a) {
  return vo(t, e, a, qu, mo(p1()), Jn(t, 2, -2), 0);
}
function lc(t, e, a, r) {
  return vo(t, e, a, Ss, Jn(t, 0, r), Jn(t, r + 1, -1), r);
}
function vn(t, e) {
  for (var a = "", r = ws(t), n = 0; n < r; n++)
    a += e(t[n], n, t, e) || "";
  return a;
}
function C1(t, e, a, r) {
  switch (t.type) {
    case s1:
      if (t.children.length) break;
    case i1:
    case Ss:
      return t.return = t.return || t.value;
    case qu:
      return "";
    case Gu:
      return t.return = t.value + "{" + vn(t.children, r) + "}";
    case Cs:
      t.value = t.props.join(",");
  }
  return er(a = vn(t.children, r)) ? t.return = t.value + "{" + a + "}" : "";
}
function S1(t) {
  var e = ws(t);
  return function(a, r, n, o) {
    for (var i = "", s = 0; s < e; s++)
      i += t[s](a, r, n, o) || "";
    return i;
  };
}
function w1(t) {
  return function(e) {
    e.root || (e = e.return) && t(e);
  };
}
function Qu(t) {
  var e = /* @__PURE__ */ Object.create(null);
  return function(a) {
    return e[a] === void 0 && (e[a] = t(a)), e[a];
  };
}
var E1 = function(e, a, r) {
  for (var n = 0, o = 0; n = o, o = nr(), n === 38 && o === 12 && (a[r] = 1), !Zn(o); )
    Vt();
  return ua(e, Ft);
}, k1 = function(e, a) {
  var r = -1, n = 44;
  do
    switch (Zn(n)) {
      case 0:
        n === 38 && nr() === 12 && (a[r] = 1), e[r] += E1(Ft - 1, a, r);
        break;
      case 2:
        e[r] += Ma(n);
        break;
      case 4:
        if (n === 44) {
          e[++r] = nr() === 58 ? "&\f" : "", a[r] = e[r].length;
          break;
        }
      // fallthrough
      default:
        e[r] += mo(n);
    }
  while (n = Vt());
  return e;
}, $1 = function(e, a) {
  return Zu(k1(Ju(e), a));
}, cc = /* @__PURE__ */ new WeakMap(), R1 = function(e) {
  if (!(e.type !== "rule" || !e.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  e.length < 1)) {
    for (var a = e.value, r = e.parent, n = e.column === r.column && e.line === r.line; r.type !== "rule"; )
      if (r = r.parent, !r) return;
    if (!(e.props.length === 1 && a.charCodeAt(0) !== 58 && !cc.get(r)) && !n) {
      cc.set(e, !0);
      for (var o = [], i = $1(a, o), s = r.props, l = 0, u = 0; l < i.length; l++)
        for (var c = 0; c < s.length; c++, u++)
          e.props[u] = o[l] ? i[l].replace(/&\f/g, s[c]) : s[c] + " " + i[l];
    }
  }
}, T1 = function(e) {
  if (e.type === "decl") {
    var a = e.value;
    // charcode for l
    a.charCodeAt(0) === 108 && // charcode for b
    a.charCodeAt(2) === 98 && (e.return = "", e.value = "");
  }
};
function ed(t, e) {
  switch (u1(t, e)) {
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
      return it + t + Ga + t + It + t + t;
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
      if (er(t) - 1 - e > 6) switch (jt(t, e + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (jt(t, e + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return st(t, /(.+:)(.+)-([^]+)/, "$1" + it + "$2-$3$1" + Ga + (jt(t, e + 3) == 108 ? "$3" : "$2-$3")) + t;
        // (s)tretch
        case 115:
          return ~Li(t, "stretch") ? ed(st(t, "stretch", "fill-available"), e) + t : t;
      }
      break;
    // position: sticky
    case 4949:
      if (jt(t, e + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (jt(t, er(t) - 3 - (~Li(t, "!important") && 10))) {
        // stic(k)y
        case 107:
          return st(t, ":", ":" + it) + t;
        // (inline-)?fl(e)x
        case 101:
          return st(t, /(.+:)([^;!]+)(;|!.+)?/, "$1" + it + (jt(t, 14) === 45 ? "inline-" : "") + "box$3$1" + it + "$2$3$1" + It + "$2box$3") + t;
      }
      break;
    // writing-mode
    case 5936:
      switch (jt(t, e + 11)) {
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
var O1 = function(e, a, r, n) {
  if (e.length > -1 && !e.return) switch (e.type) {
    case Ss:
      e.return = ed(e.value, e.length);
      break;
    case Gu:
      return vn([Mn(e, {
        value: st(e.value, "@", "@" + it)
      })], n);
    case Cs:
      if (e.length) return f1(e.props, function(o) {
        switch (d1(o, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return vn([Mn(e, {
              props: [st(o, /:(read-\w+)/, ":" + Ga + "$1")]
            })], n);
          // :placeholder
          case "::placeholder":
            return vn([Mn(e, {
              props: [st(o, /:(plac\w+)/, ":" + it + "input-$1")]
            }), Mn(e, {
              props: [st(o, /:(plac\w+)/, ":" + Ga + "$1")]
            }), Mn(e, {
              props: [st(o, /:(plac\w+)/, It + "input-$1")]
            })], n);
        }
        return "";
      });
  }
}, _1 = [O1], P1 = function(e) {
  var a = e.key;
  if (a === "css") {
    var r = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(r, function(m) {
      var y = m.getAttribute("data-emotion");
      y.indexOf(" ") !== -1 && (document.head.appendChild(m), m.setAttribute("data-s", ""));
    });
  }
  var n = e.stylisPlugins || _1, o = {}, i, s = [];
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
  var l, u = [R1, T1];
  {
    var c, d = [C1, w1(function(m) {
      c.insert(m);
    })], p = S1(u.concat(n, d)), h = function(y) {
      return vn(y1(y), p);
    };
    l = function(y, w, k, I) {
      c = k, h(y ? y + "{" + w.styles + "}" : w.styles), I && (g.inserted[w.name] = !0);
    };
  }
  var g = {
    key: a,
    sheet: new o1({
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
}, j1 = !0;
function I1(t, e, a) {
  var r = "";
  return a.split(" ").forEach(function(n) {
    t[n] !== void 0 ? e.push(t[n] + ";") : n && (r += n + " ");
  }), r;
}
var td = function(e, a, r) {
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
  j1 === !1) && e.registered[n] === void 0 && (e.registered[n] = a.styles);
}, A1 = function(e, a, r) {
  td(e, a, r);
  var n = e.key + "-" + a.name;
  if (e.inserted[a.name] === void 0) {
    var o = a;
    do
      e.insert(a === o ? "." + n : "", o, e.sheet, !0), o = o.next;
    while (o !== void 0);
  }
};
function M1(t) {
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
var N1 = {
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
}, L1 = /[A-Z]|^ms/g, D1 = /_EMO_([^_]+?)_([^]*?)_EMO_/g, rd = function(e) {
  return e.charCodeAt(1) === 45;
}, uc = function(e) {
  return e != null && typeof e != "boolean";
}, ci = /* @__PURE__ */ Qu(function(t) {
  return rd(t) ? t : t.replace(L1, "-$&").toLowerCase();
}), dc = function(e, a) {
  switch (e) {
    case "animation":
    case "animationName":
      if (typeof a == "string")
        return a.replace(D1, function(r, n, o) {
          return tr = {
            name: n,
            styles: o,
            next: tr
          }, n;
        });
  }
  return N1[e] !== 1 && !rd(e) && typeof a == "number" && a !== 0 ? a + "px" : a;
};
function Qn(t, e, a) {
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
      return B1(t, e, a);
    }
    case "function": {
      if (t !== void 0) {
        var l = tr, u = a(t);
        return tr = l, Qn(t, e, u);
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
function B1(t, e, a) {
  var r = "";
  if (Array.isArray(a))
    for (var n = 0; n < a.length; n++)
      r += Qn(t, e, a[n]) + ";";
  else
    for (var o in a) {
      var i = a[o];
      if (typeof i != "object") {
        var s = i;
        e != null && e[s] !== void 0 ? r += o + "{" + e[s] + "}" : uc(s) && (r += ci(o) + ":" + dc(o, s) + ";");
      } else if (Array.isArray(i) && typeof i[0] == "string" && (e == null || e[i[0]] === void 0))
        for (var l = 0; l < i.length; l++)
          uc(i[l]) && (r += ci(o) + ":" + dc(o, i[l]) + ";");
      else {
        var u = Qn(t, e, i);
        switch (o) {
          case "animation":
          case "animationName": {
            r += ci(o) + ":" + u + ";";
            break;
          }
          default:
            r += o + "{" + u + "}";
        }
      }
    }
  return r;
}
var fc = /label:\s*([^\s;{]+)\s*(;|$)/g, tr;
function nd(t, e, a) {
  if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0)
    return t[0];
  var r = !0, n = "";
  tr = void 0;
  var o = t[0];
  if (o == null || o.raw === void 0)
    r = !1, n += Qn(a, e, o);
  else {
    var i = o;
    n += i[0];
  }
  for (var s = 1; s < t.length; s++)
    if (n += Qn(a, e, t[s]), r) {
      var l = o;
      n += l[s];
    }
  fc.lastIndex = 0;
  for (var u = "", c; (c = fc.exec(n)) !== null; )
    u += "-" + c[1];
  var d = M1(n) + u;
  return {
    name: d,
    styles: n,
    next: tr
  };
}
var F1 = function(e) {
  return e();
}, z1 = b.useInsertionEffect ? b.useInsertionEffect : !1, W1 = z1 || F1, ad = /* @__PURE__ */ b.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ P1({
    key: "css"
  }) : null
);
ad.Provider;
var V1 = function(e) {
  return /* @__PURE__ */ Tc(function(a, r) {
    var n = Nd(ad);
    return e(a, n, r);
  });
}, H1 = /* @__PURE__ */ b.createContext({}), K1 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, U1 = /* @__PURE__ */ Qu(
  function(t) {
    return K1.test(t) || t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) < 91;
  }
  /* Z+1 */
), q1 = U1, G1 = function(e) {
  return e !== "theme";
}, pc = function(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96 ? q1 : G1;
}, hc = function(e, a, r) {
  var n;
  if (a) {
    var o = a.shouldForwardProp;
    n = e.__emotion_forwardProp && o ? function(i) {
      return e.__emotion_forwardProp(i) && o(i);
    } : o;
  }
  return typeof n != "function" && r && (n = e.__emotion_forwardProp), n;
}, Y1 = function(e) {
  var a = e.cache, r = e.serialized, n = e.isStringTag;
  return td(a, r, n), W1(function() {
    return A1(a, r, n);
  }), null;
}, X1 = function t(e, a) {
  var r = e.__emotion_real === e, n = r && e.__emotion_base || e, o, i;
  a !== void 0 && (o = a.label, i = a.target);
  var s = hc(e, a, r), l = s || pc(n), u = !l("as");
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
    var m = V1(function(y, w, k) {
      var I = u && y.as || n, f = "", x = [], E = y;
      if (y.theme == null) {
        E = {};
        for (var L in y)
          E[L] = y[L];
        E.theme = b.useContext(H1);
      }
      typeof y.className == "string" ? f = I1(w.registered, x, y.className) : y.className != null && (f = y.className + " ");
      var W = nd(d.concat(x), w.registered, E);
      f += w.key + "-" + W.name, i !== void 0 && (f += " " + i);
      var O = u && s === void 0 ? pc(I) : l, P = {};
      for (var A in y)
        u && A === "as" || O(A) && (P[A] = y[A]);
      return P.className = f, k && (P.ref = k), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement(Y1, {
        cache: w,
        serialized: W,
        isStringTag: typeof I == "string"
      }), /* @__PURE__ */ b.createElement(I, P));
    });
    return m.displayName = o !== void 0 ? o : "Styled(" + (typeof n == "string" ? n : n.displayName || n.name || "Component") + ")", m.defaultProps = e.defaultProps, m.__emotion_real = m, m.__emotion_base = n, m.__emotion_styles = d, m.__emotion_forwardProp = s, Object.defineProperty(m, "toString", {
      value: function() {
        return "." + i;
      }
    }), m.withComponent = function(y, w) {
      var k = t(y, Y({}, a, w, {
        shouldForwardProp: hc(m, w, !0)
      }));
      return k.apply(void 0, d);
    }, m;
  };
}, J1 = [
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
], Bi = X1.bind(null);
J1.forEach(function(t) {
  Bi[t] = Bi(t);
});
function Z1(t, e) {
  return Bi(t, e);
}
function Q1(t, e) {
  Array.isArray(t.__emotion_styles) && (t.__emotion_styles = e(t.__emotion_styles));
}
const mc = [];
function Wr(t) {
  return mc[0] = t, nd(mc);
}
const ex = (t) => {
  const e = Object.keys(t).map((a) => ({
    key: a,
    val: t[a]
  })) || [];
  return e.sort((a, r) => a.val - r.val), e.reduce((a, r) => ({
    ...a,
    [r.key]: r.val
  }), {});
};
function tx(t) {
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
  } = t, o = ex(e), i = Object.keys(o);
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
const rx = {
  borderRadius: 4
};
function od(t = 8, e = ys({
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
function nx(t, e) {
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
function id(t = {}, ...e) {
  const {
    breakpoints: a = {},
    palette: r = {},
    spacing: n,
    shape: o = {},
    ...i
  } = t, s = tx(a), l = od(n);
  let u = Wt({
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
      ...rx,
      ...o
    }
  }, i);
  return u = my(u), u.applyStyles = nx, u = e.reduce((c, d) => Wt(c, d), u), u.unstable_sxConfig = {
    ...ho,
    ...i == null ? void 0 : i.unstable_sxConfig
  }, u.unstable_sx = function(d) {
    return wn({
      sx: d,
      theme: this
    });
  }, u;
}
const ax = {
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
function sd(t, e, a = "Mui") {
  const r = ax[e];
  return r ? `${a}-${r}` : `${ly.generate(t)}-${e}`;
}
function ox(t, e, a = "Mui") {
  const r = {};
  return e.forEach((n) => {
    r[n] = sd(t, n, a);
  }), r;
}
function ld(t) {
  const {
    variants: e,
    ...a
  } = t, r = {
    variants: e,
    style: Wr(a),
    isProcessed: !0
  };
  return r.style === a || e && e.forEach((n) => {
    typeof n.style != "function" && (n.style = Wr(n.style));
  }), r;
}
const ix = id();
function ui(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
function Fr(t, e) {
  return e && t && typeof t == "object" && t.styles && !t.styles.startsWith("@layer") && (t.styles = `@layer ${e}{${String(t.styles)}}`), t;
}
function sx(t) {
  return t ? (e, a) => a[t] : null;
}
function lx(t, e, a) {
  t.theme = dx(t.theme) ? a : t.theme[e] || t.theme;
}
function La(t, e, a) {
  const r = typeof e == "function" ? e(t) : e;
  if (Array.isArray(r))
    return r.flatMap((n) => La(t, n, a));
  if (Array.isArray(r == null ? void 0 : r.variants)) {
    let n;
    if (r.isProcessed)
      n = a ? Fr(r.style, a) : r.style;
    else {
      const {
        variants: o,
        ...i
      } = r;
      n = a ? Fr(Wr(i), a) : i;
    }
    return cd(t, r.variants, [n], a);
  }
  return r != null && r.isProcessed ? a ? Fr(Wr(r.style), a) : r.style : a ? Fr(Wr(r), a) : r;
}
function cd(t, e, a = [], r = void 0) {
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
    }), a.push(r ? Fr(Wr(s.style(n)), r) : s.style(n))) : a.push(r ? Fr(Wr(s.style), r) : s.style);
  }
  return a;
}
function cx(t = {}) {
  const {
    themeId: e,
    defaultTheme: a = ix,
    rootShouldForwardProp: r = ui,
    slotShouldForwardProp: n = ui
  } = t;
  function o(s) {
    lx(s, e, a);
  }
  return (s, l = {}) => {
    Q1(s, (E) => E.filter((L) => L !== wn));
    const {
      name: u,
      slot: c,
      skipVariantsResolver: d,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: h = sx(px(c)),
      ...g
    } = l, m = u && u.startsWith("Mui") || c ? "components" : "custom", y = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      c && c !== "Root" && c !== "root" || !1
    ), w = p || !1;
    let k = ui;
    c === "Root" || c === "root" ? k = r : c ? k = n : fx(s) && (k = void 0);
    const I = Z1(s, {
      shouldForwardProp: k,
      label: ux(),
      ...g
    }), f = (E) => {
      if (E.__emotion_real === E)
        return E;
      if (typeof E == "function")
        return function(W) {
          return La(W, E, W.theme.modularCssLayers ? m : void 0);
        };
      if (lr(E)) {
        const L = ld(E);
        return function(O) {
          return L.variants ? La(O, L, O.theme.modularCssLayers ? m : void 0) : O.theme.modularCssLayers ? Fr(L.style, m) : L.style;
        };
      }
      return E;
    }, x = (...E) => {
      const L = [], W = E.map(f), O = [];
      if (L.push(o), u && h && O.push(function(C) {
        var V, F;
        const D = (F = (V = C.theme.components) == null ? void 0 : V[u]) == null ? void 0 : F.styleOverrides;
        if (!D)
          return null;
        const $ = {};
        for (const q in D)
          $[q] = La(C, D[q], C.theme.modularCssLayers ? "theme" : void 0);
        return h(C, $);
      }), u && !y && O.push(function(C) {
        var $, V;
        const M = C.theme, D = (V = ($ = M == null ? void 0 : M.components) == null ? void 0 : $[u]) == null ? void 0 : V.variants;
        return D ? cd(C, D, [], C.theme.modularCssLayers ? "theme" : void 0) : null;
      }), w || O.push(wn), Array.isArray(W[0])) {
        const v = W.shift(), C = new Array(L.length).fill(""), M = new Array(O.length).fill("");
        let D;
        D = [...C, ...v, ...M], D.raw = [...C, ...v.raw, ...M], L.unshift(D);
      }
      const P = [...L, ...W, ...O], A = I(...P);
      return s.muiName && (A.muiName = s.muiName), A;
    };
    return I.withConfig && (x.withConfig = I.withConfig), x;
  };
}
function ux(t, e) {
  return void 0;
}
function dx(t) {
  for (const e in t)
    return !1;
  return !0;
}
function fx(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96;
}
function px(t) {
  return t && t.charAt(0).toLowerCase() + t.slice(1);
}
function ud(t) {
  var e, a, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var n = t.length;
    for (e = 0; e < n; e++) t[e] && (a = ud(t[e])) && (r && (r += " "), r += a);
  } else for (a in t) t[a] && (r && (r += " "), r += a);
  return r;
}
function hx() {
  for (var t, e, a = 0, r = "", n = arguments.length; a < n; a++) (t = arguments[a]) && (e = ud(t)) && (r && (r += " "), r += e);
  return r;
}
function Fi(t, e, a = !1) {
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
              r[o][u] = Fi(i[u], s[u], a);
            }
        }
      } else o === "className" && a && e.className ? r.className = hx(t == null ? void 0 : t.className, e == null ? void 0 : e.className) : o === "style" && a && e.style ? r.style = {
        ...t == null ? void 0 : t.style,
        ...e == null ? void 0 : e.style
      } : r[o] === void 0 && (r[o] = t[o]);
    }
  return r;
}
function mx(t, e = Number.MIN_SAFE_INTEGER, a = Number.MAX_SAFE_INTEGER) {
  return Math.max(e, Math.min(t, a));
}
function Es(t, e = 0, a = 1) {
  return mx(t, e, a);
}
function gx(t) {
  t = t.slice(1);
  const e = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, "g");
  let a = t.match(e);
  return a && a[0].length === 1 && (a = a.map((r) => r + r)), a ? `rgb${a.length === 4 ? "a" : ""}(${a.map((r, n) => n < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Tr(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
    return Tr(gx(t));
  const e = t.indexOf("("), a = t.substring(0, e);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(a))
    throw new Error(Kr(9, t));
  let r = t.substring(e + 1, t.length - 1), n;
  if (a === "color") {
    if (r = r.split(" "), n = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(n))
      throw new Error(Kr(10, n));
  } else
    r = r.split(",");
  return r = r.map((o) => parseFloat(o)), {
    type: a,
    values: r,
    colorSpace: n
  };
}
const vx = (t) => {
  const e = Tr(t);
  return e.values.slice(0, 3).map((a, r) => e.type.includes("hsl") && r !== 0 ? `${a}%` : a).join(" ");
}, zn = (t, e) => {
  try {
    return vx(t);
  } catch {
    return t;
  }
};
function bo(t) {
  const {
    type: e,
    colorSpace: a
  } = t;
  let {
    values: r
  } = t;
  return e.includes("rgb") ? r = r.map((n, o) => o < 3 ? parseInt(n, 10) : n) : e.includes("hsl") && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), e.includes("color") ? r = `${a} ${r.join(" ")}` : r = `${r.join(", ")}`, `${e}(${r})`;
}
function dd(t) {
  t = Tr(t);
  const {
    values: e
  } = t, a = e[0], r = e[1] / 100, n = e[2] / 100, o = r * Math.min(n, 1 - n), i = (u, c = (u + a / 30) % 12) => n - o * Math.max(Math.min(c - 3, 9 - c, 1), -1);
  let s = "rgb";
  const l = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return t.type === "hsla" && (s += "a", l.push(e[3])), bo({
    type: s,
    values: l
  });
}
function zi(t) {
  t = Tr(t);
  let e = t.type === "hsl" || t.type === "hsla" ? Tr(dd(t)).values : t.values;
  return e = e.map((a) => (t.type !== "color" && (a /= 255), a <= 0.03928 ? a / 12.92 : ((a + 0.055) / 1.055) ** 2.4)), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function bx(t, e) {
  const a = zi(t), r = zi(e);
  return (Math.max(a, r) + 0.05) / (Math.min(a, r) + 0.05);
}
function fd(t, e) {
  return t = Tr(t), e = Es(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.type === "color" ? t.values[3] = `/${e}` : t.values[3] = e, bo(t);
}
function Mr(t, e, a) {
  try {
    return fd(t, e);
  } catch {
    return t;
  }
}
function yo(t, e) {
  if (t = Tr(t), e = Es(e), t.type.includes("hsl"))
    t.values[2] *= 1 - e;
  else if (t.type.includes("rgb") || t.type.includes("color"))
    for (let a = 0; a < 3; a += 1)
      t.values[a] *= 1 - e;
  return bo(t);
}
function dt(t, e, a) {
  try {
    return yo(t, e);
  } catch {
    return t;
  }
}
function xo(t, e) {
  if (t = Tr(t), e = Es(e), t.type.includes("hsl"))
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.includes("rgb"))
    for (let a = 0; a < 3; a += 1)
      t.values[a] += (255 - t.values[a]) * e;
  else if (t.type.includes("color"))
    for (let a = 0; a < 3; a += 1)
      t.values[a] += (1 - t.values[a]) * e;
  return bo(t);
}
function ft(t, e, a) {
  try {
    return xo(t, e);
  } catch {
    return t;
  }
}
function yx(t, e = 0.15) {
  return zi(t) > 0.5 ? yo(t, e) : xo(t, e);
}
function wa(t, e, a) {
  try {
    return yx(t, e);
  } catch {
    return t;
  }
}
const xx = /* @__PURE__ */ b.createContext(void 0);
function Cx(t) {
  const {
    theme: e,
    name: a,
    props: r
  } = t;
  if (!e || !e.components || !e.components[a])
    return r;
  const n = e.components[a];
  return n.defaultProps ? Fi(n.defaultProps, r, e.components.mergeClassNameAndStyle) : !n.styleOverrides && !n.variants ? Fi(n, r, e.components.mergeClassNameAndStyle) : r;
}
function Sx({
  props: t,
  name: e
}) {
  const a = b.useContext(xx);
  return Cx({
    props: t,
    name: e,
    theme: {
      components: a
    }
  });
}
const gc = {
  theme: void 0
};
function wx(t) {
  let e, a;
  return function(n) {
    let o = e;
    return (o === void 0 || n.theme !== a) && (gc.theme = n.theme, o = ld(t(gc)), e = o, a = n.theme), o;
  };
}
function Ex(t = "") {
  function e(...r) {
    if (!r.length)
      return "";
    const n = r[0];
    return typeof n == "string" && !n.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${t ? `${t}-` : ""}${n}${e(...r.slice(1))})` : `, ${n}`;
  }
  return (r, ...n) => `var(--${t ? `${t}-` : ""}${r}${e(...n)})`;
}
const vc = (t, e, a, r = []) => {
  let n = t;
  e.forEach((o, i) => {
    i === e.length - 1 ? Array.isArray(n) ? n[Number(o)] = a : n && typeof n == "object" && (n[o] = a) : n && typeof n == "object" && (n[o] || (n[o] = r.includes(o) ? [] : {}), n = n[o]);
  });
}, kx = (t, e, a) => {
  function r(n, o = [], i = []) {
    Object.entries(n).forEach(([s, l]) => {
      (!a || a && !a([...o, s])) && l != null && (typeof l == "object" && Object.keys(l).length > 0 ? r(l, [...o, s], Array.isArray(l) ? [...i, s] : i) : e([...o, s], l, i));
    });
  }
  r(t);
}, $x = (t, e) => typeof e == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((r) => t.includes(r)) || t[t.length - 1].toLowerCase().includes("opacity") ? e : `${e}px` : e;
function di(t, e) {
  const {
    prefix: a,
    shouldSkipGeneratingVar: r
  } = e || {}, n = {}, o = {}, i = {};
  return kx(
    t,
    (s, l, u) => {
      if ((typeof l == "string" || typeof l == "number") && (!r || !r(s, l))) {
        const c = `--${a ? `${a}-` : ""}${s.join("-")}`, d = $x(s, l);
        Object.assign(n, {
          [c]: d
        }), vc(o, s, `var(${c})`, u), vc(i, s, `var(${c}, ${d})`, u);
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
function Rx(t, e = {}) {
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
  } = di(u, e);
  let h = p;
  const g = {}, {
    [l]: m,
    ...y
  } = i;
  if (Object.entries(y || {}).forEach(([f, x]) => {
    const {
      vars: E,
      css: L,
      varsWithDefaults: W
    } = di(x, e);
    h = Wt(h, W), g[f] = {
      css: L,
      vars: E
    };
  }), m) {
    const {
      css: f,
      vars: x,
      varsWithDefaults: E
    } = di(m, e);
    h = Wt(h, E), g[l] = {
      css: f,
      vars: x
    };
  }
  function w(f, x) {
    var L, W;
    let E = n;
    if (n === "class" && (E = ".%s"), n === "data" && (E = "[data-%s]"), n != null && n.startsWith("data-") && !n.includes("%s") && (E = `[${n}="%s"]`), f) {
      if (E === "media")
        return t.defaultColorScheme === f ? ":root" : {
          [`@media (prefers-color-scheme: ${((W = (L = i[f]) == null ? void 0 : L.palette) == null ? void 0 : W.mode) || f})`]: {
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
        f = Wt(f, x);
      }), f;
    },
    generateStyleSheets: () => {
      var O, P;
      const f = [], x = t.defaultColorScheme || "light";
      function E(A, v) {
        Object.keys(v).length && f.push(typeof A == "string" ? {
          [A]: {
            ...v
          }
        } : A);
      }
      E(a(void 0, {
        ...d
      }), d);
      const {
        [x]: L,
        ...W
      } = g;
      if (L) {
        const {
          css: A
        } = L, v = (P = (O = i[x]) == null ? void 0 : O.palette) == null ? void 0 : P.mode, C = !r && v ? {
          colorScheme: v,
          ...A
        } : {
          ...A
        };
        E(a(x, {
          ...C
        }), C);
      }
      return Object.entries(W).forEach(([A, {
        css: v
      }]) => {
        var D, $;
        const C = ($ = (D = i[A]) == null ? void 0 : D.palette) == null ? void 0 : $.mode, M = !r && C ? {
          colorScheme: C,
          ...v
        } : {
          ...v
        };
        E(a(A, {
          ...M
        }), M);
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
function Tx(t) {
  return function(a) {
    return t === "media" ? `@media (prefers-color-scheme: ${a})` : t ? t.startsWith("data-") && !t.includes("%s") ? `[${t}="${a}"] &` : t === "class" ? `.${a} &` : t === "data" ? `[data-${a}] &` : `${t.replace("%s", a)} &` : "&";
  };
}
const ea = {
  black: "#000",
  white: "#fff"
}, Ox = {
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
}, ln = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, cn = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, Nn = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, un = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, dn = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, fn = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
};
function pd() {
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
      paper: ea.white,
      default: ea.white
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
const hd = pd();
function md() {
  return {
    text: {
      primary: ea.white,
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
      active: ea.white,
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
const Wi = md();
function bc(t, e, a, r) {
  const n = r.light || r, o = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(a) ? t[e] = t[a] : e === "light" ? t.light = xo(t.main, n) : e === "dark" && (t.dark = yo(t.main, o)));
}
function yc(t, e, a, r, n) {
  const o = n.light || n, i = n.dark || n * 1.5;
  e[a] || (e.hasOwnProperty(r) ? e[a] = e[r] : a === "light" ? e.light = `color-mix(in ${t}, ${e.main}, #fff ${(o * 100).toFixed(0)}%)` : a === "dark" && (e.dark = `color-mix(in ${t}, ${e.main}, #000 ${(i * 100).toFixed(0)}%)`));
}
function _x(t = "light") {
  return t === "dark" ? {
    main: un[200],
    light: un[50],
    dark: un[400]
  } : {
    main: un[700],
    light: un[400],
    dark: un[800]
  };
}
function Px(t = "light") {
  return t === "dark" ? {
    main: ln[200],
    light: ln[50],
    dark: ln[400]
  } : {
    main: ln[500],
    light: ln[300],
    dark: ln[700]
  };
}
function jx(t = "light") {
  return t === "dark" ? {
    main: cn[500],
    light: cn[300],
    dark: cn[700]
  } : {
    main: cn[700],
    light: cn[400],
    dark: cn[800]
  };
}
function Ix(t = "light") {
  return t === "dark" ? {
    main: dn[400],
    light: dn[300],
    dark: dn[700]
  } : {
    main: dn[700],
    light: dn[500],
    dark: dn[900]
  };
}
function Ax(t = "light") {
  return t === "dark" ? {
    main: fn[400],
    light: fn[300],
    dark: fn[700]
  } : {
    main: fn[800],
    light: fn[500],
    dark: fn[900]
  };
}
function Mx(t = "light") {
  return t === "dark" ? {
    main: Nn[400],
    light: Nn[300],
    dark: Nn[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Nn[500],
    dark: Nn[900]
  };
}
function Nx(t) {
  return `oklch(from ${t} var(--__l) 0 h / var(--__a))`;
}
function ks(t) {
  const {
    mode: e = "light",
    contrastThreshold: a = 3,
    tonalOffset: r = 0.2,
    colorSpace: n,
    ...o
  } = t, i = t.primary || _x(e), s = t.secondary || Px(e), l = t.error || jx(e), u = t.info || Ix(e), c = t.success || Ax(e), d = t.warning || Mx(e);
  function p(y) {
    return n ? Nx(y) : bx(y, Wi.text.primary) >= a ? Wi.text.primary : hd.text.primary;
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
      throw new Error(Kr(11, w ? ` (${w})` : "", k));
    if (typeof y.main != "string")
      throw new Error(Kr(12, w ? ` (${w})` : "", JSON.stringify(y.main)));
    return n ? (yc(n, y, "light", I, r), yc(n, y, "dark", f, r)) : (bc(y, "light", I, r), bc(y, "dark", f, r)), y.contrastText || (y.contrastText = p(y.main)), y;
  };
  let g;
  return e === "light" ? g = pd() : e === "dark" && (g = md()), Wt({
    // A collection of common colors.
    common: {
      ...ea
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
    grey: Ox,
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
function Lx(t) {
  const e = {};
  return Object.entries(t).forEach((r) => {
    const [n, o] = r;
    typeof o == "object" && (e[n] = `${o.fontStyle ? `${o.fontStyle} ` : ""}${o.fontVariant ? `${o.fontVariant} ` : ""}${o.fontWeight ? `${o.fontWeight} ` : ""}${o.fontStretch ? `${o.fontStretch} ` : ""}${o.fontSize || ""}${o.lineHeight ? `/${o.lineHeight} ` : ""}${o.fontFamily || ""}`);
  }), e;
}
function Dx(t, e) {
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
function Bx(t) {
  return Math.round(t * 1e5) / 1e5;
}
const xc = {
  textTransform: "uppercase"
}, Cc = '"Roboto", "Helvetica", "Arial", sans-serif';
function Fx(t, e) {
  const {
    fontFamily: a = Cc,
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
    ...a === Cc ? {
      letterSpacing: `${Bx(I / w)}em`
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
    button: g(i, 14, 1.75, 0.4, xc),
    caption: g(o, 12, 1.66, 0.4),
    overline: g(o, 12, 2.66, 1, xc),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Wt({
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
const zx = 0.2, Wx = 0.14, Vx = 0.12;
function Ct(...t) {
  return [`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${zx})`, `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${Wx})`, `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${Vx})`].join(",");
}
const Hx = ["none", Ct(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), Ct(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), Ct(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), Ct(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), Ct(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), Ct(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), Ct(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), Ct(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), Ct(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), Ct(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), Ct(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), Ct(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), Ct(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), Ct(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), Ct(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), Ct(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), Ct(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), Ct(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), Ct(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), Ct(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), Ct(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), Ct(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), Ct(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), Ct(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Kx = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Ux = {
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
function Sc(t) {
  return `${Math.round(t)}ms`;
}
function qx(t) {
  if (!t)
    return 0;
  const e = t / 36;
  return Math.min(Math.round((4 + 15 * e ** 0.25 + e / 5) * 10), 3e3);
}
function Gx(t) {
  const e = {
    ...Kx,
    ...t.easing
  }, a = {
    ...Ux,
    ...t.duration
  };
  return {
    getAutoHeightDuration: qx,
    create: (n = ["all"], o = {}) => {
      const {
        duration: i = a.standard,
        easing: s = e.easeInOut,
        delay: l = 0,
        ...u
      } = o;
      return (Array.isArray(n) ? n : [n]).map((c) => `${c} ${typeof i == "string" ? i : Sc(i)} ${s} ${typeof l == "string" ? l : Sc(l)}`).join(",");
    },
    ...t,
    easing: e,
    duration: a
  };
}
const Yx = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function Xx(t) {
  return lr(t) || typeof t > "u" || typeof t == "string" || typeof t == "boolean" || typeof t == "number" || Array.isArray(t);
}
function gd(t = {}) {
  const e = {
    ...t
  };
  function a(r) {
    const n = Object.entries(r);
    for (let o = 0; o < n.length; o++) {
      const [i, s] = n[o];
      !Xx(s) || i.startsWith("unstable_") ? delete r[i] : lr(s) && (r[i] = {
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
function wc(t) {
  return typeof t == "number" ? `${(t * 100).toFixed(0)}%` : `calc((${t}) * 100%)`;
}
const Jx = (t) => {
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
function Zx(t) {
  Object.assign(t, {
    alpha(e, a) {
      const r = this || t;
      return r.colorSpace ? `oklch(from ${e} l c h / ${typeof a == "string" ? `calc(${a})` : a})` : r.vars ? `rgba(${e.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, "var(--$1Channel)")} / ${typeof a == "string" ? `calc(${a})` : a})` : fd(e, Jx(a));
    },
    lighten(e, a) {
      const r = this || t;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${e}, #fff ${wc(a)})` : xo(e, a);
    },
    darken(e, a) {
      const r = this || t;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${e}, #000 ${wc(a)})` : yo(e, a);
    }
  });
}
function Vi(t = {}, ...e) {
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
    throw new Error(Kr(20));
  const d = ks({
    ...o,
    colorSpace: u
  }), p = id(t);
  let h = Wt(p, {
    mixins: Dx(p.breakpoints, r),
    palette: d,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Hx.slice(),
    typography: Fx(d, s),
    transitions: Gx(i),
    zIndex: {
      ...Yx
    }
  });
  return h = Wt(h, c), h = e.reduce((g, m) => Wt(g, m), h), h.unstable_sxConfig = {
    ...ho,
    ...c == null ? void 0 : c.unstable_sxConfig
  }, h.unstable_sx = function(m) {
    return wn({
      sx: m,
      theme: this
    });
  }, h.toRuntimeSource = gd, Zx(h), h;
}
function Qx(t) {
  let e;
  return t < 1 ? e = 5.11916 * t ** 2 : e = 4.5 * Math.log(t + 1) + 2, Math.round(e * 10) / 1e3;
}
const e2 = [...Array(25)].map((t, e) => {
  if (e === 0)
    return "none";
  const a = Qx(e);
  return `linear-gradient(rgba(255 255 255 / ${a}), rgba(255 255 255 / ${a}))`;
});
function vd(t) {
  return {
    inputPlaceholder: t === "dark" ? 0.5 : 0.42,
    inputUnderline: t === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: t === "dark" ? 0.2 : 0.12,
    switchTrack: t === "dark" ? 0.3 : 0.38
  };
}
function bd(t) {
  return t === "dark" ? e2 : [];
}
function t2(t) {
  const {
    palette: e = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: a,
    overlays: r,
    colorSpace: n,
    ...o
  } = t, i = ks({
    ...e,
    colorSpace: n
  });
  return {
    palette: i,
    opacity: {
      ...vd(i.mode),
      ...a
    },
    overlays: r || bd(i.mode),
    ...o
  };
}
function r2(t) {
  var e;
  return !!t[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!t[0].match(/sxConfig$/) || // ends with sxConfig
  t[0] === "palette" && !!((e = t[1]) != null && e.match(/(mode|contrastThreshold|tonalOffset)/));
}
const n2 = (t) => [...[...Array(25)].map((e, a) => `--${t ? `${t}-` : ""}overlays-${a}`), `--${t ? `${t}-` : ""}palette-AppBar-darkBg`, `--${t ? `${t}-` : ""}palette-AppBar-darkColor`], a2 = (t) => (e, a) => {
  const r = t.rootSelector || ":root", n = t.colorSchemeSelector;
  let o = n;
  if (n === "class" && (o = ".%s"), n === "data" && (o = "[data-%s]"), n != null && n.startsWith("data-") && !n.includes("%s") && (o = `[${n}="%s"]`), t.defaultColorScheme === e) {
    if (e === "dark") {
      const i = {};
      return n2(t.cssVarPrefix).forEach((s) => {
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
function o2(t, e) {
  e.forEach((a) => {
    t[a] || (t[a] = {});
  });
}
function ne(t, e, a) {
  !t[e] && a && (t[e] = a);
}
function Wn(t) {
  return typeof t != "string" || !t.startsWith("hsl") ? t : dd(t);
}
function sr(t, e) {
  `${e}Channel` in t || (t[`${e}Channel`] = zn(Wn(t[e])));
}
function i2(t) {
  return typeof t == "number" ? `${t}px` : typeof t == "string" || typeof t == "function" || Array.isArray(t) ? t : "8px";
}
const Qt = (t) => {
  try {
    return t();
  } catch {
  }
}, s2 = (t = "mui") => Ex(t);
function fi(t, e, a, r, n) {
  if (!a)
    return;
  a = a === !0 ? {} : a;
  const o = n === "dark" ? "dark" : "light";
  if (!r) {
    e[n] = t2({
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
  } = Vi({
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
      ...vd(o),
      ...a == null ? void 0 : a.opacity
    },
    overlays: (a == null ? void 0 : a.overlays) || bd(o)
  }, s;
}
function l2(t = {}, ...e) {
  const {
    colorSchemes: a = {
      light: !0
    },
    defaultColorScheme: r,
    disableCssColorScheme: n = !1,
    cssVarPrefix: o = "mui",
    nativeColor: i = !1,
    shouldSkipGeneratingVar: s = r2,
    colorSchemeSelector: l = a.light && a.dark ? "media" : void 0,
    rootSelector: u = ":root",
    ...c
  } = t, d = Object.keys(a)[0], p = r || (a.light && d !== "light" ? "light" : d), h = s2(o), {
    [p]: g,
    light: m,
    dark: y,
    ...w
  } = a, k = {
    ...w
  };
  let I = g;
  if ((p === "dark" && !("dark" in a) || p === "light" && !("light" in a)) && (I = !0), !I)
    throw new Error(Kr(21, p));
  let f;
  i && (f = "oklch");
  const x = fi(f, k, I, c, p);
  m && !k.light && fi(f, k, m, void 0, "light"), y && !k.dark && fi(f, k, y, void 0, "dark");
  let E = {
    defaultColorScheme: p,
    ...x,
    cssVarPrefix: o,
    colorSchemeSelector: l,
    rootSelector: u,
    getCssVar: h,
    colorSchemes: k,
    font: {
      ...Lx(x.typography),
      ...x.font
    },
    spacing: i2(c.spacing)
  };
  Object.keys(E.colorSchemes).forEach((A) => {
    const v = E.colorSchemes[A].palette, C = (D) => {
      const $ = D.split("-"), V = $[1], F = $[2];
      return h(D, v[V][F]);
    };
    v.mode === "light" && (ne(v.common, "background", "#fff"), ne(v.common, "onBackground", "#000")), v.mode === "dark" && (ne(v.common, "background", "#000"), ne(v.common, "onBackground", "#fff"));
    function M(D, $, V) {
      if (f) {
        let F;
        return D === Mr && (F = `transparent ${((1 - V) * 100).toFixed(0)}%`), D === dt && (F = `#000 ${(V * 100).toFixed(0)}%`), D === ft && (F = `#fff ${(V * 100).toFixed(0)}%`), `color-mix(in ${f}, ${$}, ${F})`;
      }
      return D($, V);
    }
    if (o2(v, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), v.mode === "light") {
      ne(v.Alert, "errorColor", M(dt, v.error.light, 0.6)), ne(v.Alert, "infoColor", M(dt, v.info.light, 0.6)), ne(v.Alert, "successColor", M(dt, v.success.light, 0.6)), ne(v.Alert, "warningColor", M(dt, v.warning.light, 0.6)), ne(v.Alert, "errorFilledBg", C("palette-error-main")), ne(v.Alert, "infoFilledBg", C("palette-info-main")), ne(v.Alert, "successFilledBg", C("palette-success-main")), ne(v.Alert, "warningFilledBg", C("palette-warning-main")), ne(v.Alert, "errorFilledColor", Qt(() => v.getContrastText(v.error.main))), ne(v.Alert, "infoFilledColor", Qt(() => v.getContrastText(v.info.main))), ne(v.Alert, "successFilledColor", Qt(() => v.getContrastText(v.success.main))), ne(v.Alert, "warningFilledColor", Qt(() => v.getContrastText(v.warning.main))), ne(v.Alert, "errorStandardBg", M(ft, v.error.light, 0.9)), ne(v.Alert, "infoStandardBg", M(ft, v.info.light, 0.9)), ne(v.Alert, "successStandardBg", M(ft, v.success.light, 0.9)), ne(v.Alert, "warningStandardBg", M(ft, v.warning.light, 0.9)), ne(v.Alert, "errorIconColor", C("palette-error-main")), ne(v.Alert, "infoIconColor", C("palette-info-main")), ne(v.Alert, "successIconColor", C("palette-success-main")), ne(v.Alert, "warningIconColor", C("palette-warning-main")), ne(v.AppBar, "defaultBg", C("palette-grey-100")), ne(v.Avatar, "defaultBg", C("palette-grey-400")), ne(v.Button, "inheritContainedBg", C("palette-grey-300")), ne(v.Button, "inheritContainedHoverBg", C("palette-grey-A100")), ne(v.Chip, "defaultBorder", C("palette-grey-400")), ne(v.Chip, "defaultAvatarColor", C("palette-grey-700")), ne(v.Chip, "defaultIconColor", C("palette-grey-700")), ne(v.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), ne(v.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), ne(v.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), ne(v.LinearProgress, "primaryBg", M(ft, v.primary.main, 0.62)), ne(v.LinearProgress, "secondaryBg", M(ft, v.secondary.main, 0.62)), ne(v.LinearProgress, "errorBg", M(ft, v.error.main, 0.62)), ne(v.LinearProgress, "infoBg", M(ft, v.info.main, 0.62)), ne(v.LinearProgress, "successBg", M(ft, v.success.main, 0.62)), ne(v.LinearProgress, "warningBg", M(ft, v.warning.main, 0.62)), ne(v.Skeleton, "bg", f ? M(Mr, v.text.primary, 0.11) : `rgba(${C("palette-text-primaryChannel")} / 0.11)`), ne(v.Slider, "primaryTrack", M(ft, v.primary.main, 0.62)), ne(v.Slider, "secondaryTrack", M(ft, v.secondary.main, 0.62)), ne(v.Slider, "errorTrack", M(ft, v.error.main, 0.62)), ne(v.Slider, "infoTrack", M(ft, v.info.main, 0.62)), ne(v.Slider, "successTrack", M(ft, v.success.main, 0.62)), ne(v.Slider, "warningTrack", M(ft, v.warning.main, 0.62));
      const D = f ? M(dt, v.background.default, 0.6825) : wa(v.background.default, 0.8);
      ne(v.SnackbarContent, "bg", D), ne(v.SnackbarContent, "color", Qt(() => f ? Wi.text.primary : v.getContrastText(D))), ne(v.SpeedDialAction, "fabHoverBg", wa(v.background.paper, 0.15)), ne(v.StepConnector, "border", C("palette-grey-400")), ne(v.StepContent, "border", C("palette-grey-400")), ne(v.Switch, "defaultColor", C("palette-common-white")), ne(v.Switch, "defaultDisabledColor", C("palette-grey-100")), ne(v.Switch, "primaryDisabledColor", M(ft, v.primary.main, 0.62)), ne(v.Switch, "secondaryDisabledColor", M(ft, v.secondary.main, 0.62)), ne(v.Switch, "errorDisabledColor", M(ft, v.error.main, 0.62)), ne(v.Switch, "infoDisabledColor", M(ft, v.info.main, 0.62)), ne(v.Switch, "successDisabledColor", M(ft, v.success.main, 0.62)), ne(v.Switch, "warningDisabledColor", M(ft, v.warning.main, 0.62)), ne(v.TableCell, "border", M(ft, M(Mr, v.divider, 1), 0.88)), ne(v.Tooltip, "bg", M(Mr, v.grey[700], 0.92));
    }
    if (v.mode === "dark") {
      ne(v.Alert, "errorColor", M(ft, v.error.light, 0.6)), ne(v.Alert, "infoColor", M(ft, v.info.light, 0.6)), ne(v.Alert, "successColor", M(ft, v.success.light, 0.6)), ne(v.Alert, "warningColor", M(ft, v.warning.light, 0.6)), ne(v.Alert, "errorFilledBg", C("palette-error-dark")), ne(v.Alert, "infoFilledBg", C("palette-info-dark")), ne(v.Alert, "successFilledBg", C("palette-success-dark")), ne(v.Alert, "warningFilledBg", C("palette-warning-dark")), ne(v.Alert, "errorFilledColor", Qt(() => v.getContrastText(v.error.dark))), ne(v.Alert, "infoFilledColor", Qt(() => v.getContrastText(v.info.dark))), ne(v.Alert, "successFilledColor", Qt(() => v.getContrastText(v.success.dark))), ne(v.Alert, "warningFilledColor", Qt(() => v.getContrastText(v.warning.dark))), ne(v.Alert, "errorStandardBg", M(dt, v.error.light, 0.9)), ne(v.Alert, "infoStandardBg", M(dt, v.info.light, 0.9)), ne(v.Alert, "successStandardBg", M(dt, v.success.light, 0.9)), ne(v.Alert, "warningStandardBg", M(dt, v.warning.light, 0.9)), ne(v.Alert, "errorIconColor", C("palette-error-main")), ne(v.Alert, "infoIconColor", C("palette-info-main")), ne(v.Alert, "successIconColor", C("palette-success-main")), ne(v.Alert, "warningIconColor", C("palette-warning-main")), ne(v.AppBar, "defaultBg", C("palette-grey-900")), ne(v.AppBar, "darkBg", C("palette-background-paper")), ne(v.AppBar, "darkColor", C("palette-text-primary")), ne(v.Avatar, "defaultBg", C("palette-grey-600")), ne(v.Button, "inheritContainedBg", C("palette-grey-800")), ne(v.Button, "inheritContainedHoverBg", C("palette-grey-700")), ne(v.Chip, "defaultBorder", C("palette-grey-700")), ne(v.Chip, "defaultAvatarColor", C("palette-grey-300")), ne(v.Chip, "defaultIconColor", C("palette-grey-300")), ne(v.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), ne(v.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), ne(v.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), ne(v.LinearProgress, "primaryBg", M(dt, v.primary.main, 0.5)), ne(v.LinearProgress, "secondaryBg", M(dt, v.secondary.main, 0.5)), ne(v.LinearProgress, "errorBg", M(dt, v.error.main, 0.5)), ne(v.LinearProgress, "infoBg", M(dt, v.info.main, 0.5)), ne(v.LinearProgress, "successBg", M(dt, v.success.main, 0.5)), ne(v.LinearProgress, "warningBg", M(dt, v.warning.main, 0.5)), ne(v.Skeleton, "bg", f ? M(Mr, v.text.primary, 0.13) : `rgba(${C("palette-text-primaryChannel")} / 0.13)`), ne(v.Slider, "primaryTrack", M(dt, v.primary.main, 0.5)), ne(v.Slider, "secondaryTrack", M(dt, v.secondary.main, 0.5)), ne(v.Slider, "errorTrack", M(dt, v.error.main, 0.5)), ne(v.Slider, "infoTrack", M(dt, v.info.main, 0.5)), ne(v.Slider, "successTrack", M(dt, v.success.main, 0.5)), ne(v.Slider, "warningTrack", M(dt, v.warning.main, 0.5));
      const D = f ? M(ft, v.background.default, 0.985) : wa(v.background.default, 0.98);
      ne(v.SnackbarContent, "bg", D), ne(v.SnackbarContent, "color", Qt(() => f ? hd.text.primary : v.getContrastText(D))), ne(v.SpeedDialAction, "fabHoverBg", wa(v.background.paper, 0.15)), ne(v.StepConnector, "border", C("palette-grey-600")), ne(v.StepContent, "border", C("palette-grey-600")), ne(v.Switch, "defaultColor", C("palette-grey-300")), ne(v.Switch, "defaultDisabledColor", C("palette-grey-600")), ne(v.Switch, "primaryDisabledColor", M(dt, v.primary.main, 0.55)), ne(v.Switch, "secondaryDisabledColor", M(dt, v.secondary.main, 0.55)), ne(v.Switch, "errorDisabledColor", M(dt, v.error.main, 0.55)), ne(v.Switch, "infoDisabledColor", M(dt, v.info.main, 0.55)), ne(v.Switch, "successDisabledColor", M(dt, v.success.main, 0.55)), ne(v.Switch, "warningDisabledColor", M(dt, v.warning.main, 0.55)), ne(v.TableCell, "border", M(dt, M(Mr, v.divider, 1), 0.68)), ne(v.Tooltip, "bg", M(Mr, v.grey[700], 0.92));
    }
    sr(v.background, "default"), sr(v.background, "paper"), sr(v.common, "background"), sr(v.common, "onBackground"), sr(v, "divider"), Object.keys(v).forEach((D) => {
      const $ = v[D];
      D !== "tonalOffset" && $ && typeof $ == "object" && ($.main && ne(v[D], "mainChannel", zn(Wn($.main))), $.light && ne(v[D], "lightChannel", zn(Wn($.light))), $.dark && ne(v[D], "darkChannel", zn(Wn($.dark))), $.contrastText && ne(v[D], "contrastTextChannel", zn(Wn($.contrastText))), D === "text" && (sr(v[D], "primary"), sr(v[D], "secondary")), D === "action" && ($.active && sr(v[D], "active"), $.selected && sr(v[D], "selected")));
    });
  }), E = e.reduce((A, v) => Wt(A, v), E);
  const L = {
    prefix: o,
    disableCssColorScheme: n,
    shouldSkipGeneratingVar: s,
    getSelector: a2(E),
    enableContrastVars: i
  }, {
    vars: W,
    generateThemeVars: O,
    generateStyleSheets: P
  } = Rx(E, L);
  return E.vars = W, Object.entries(E.colorSchemes[E.defaultColorScheme]).forEach(([A, v]) => {
    E[A] = v;
  }), E.generateThemeVars = O, E.generateStyleSheets = P, E.generateSpacing = function() {
    return od(c.spacing, ys(this));
  }, E.getColorSchemeSelector = Tx(l), E.spacing = E.generateSpacing(), E.shouldSkipGeneratingVar = s, E.unstable_sxConfig = {
    ...ho,
    ...c == null ? void 0 : c.unstable_sxConfig
  }, E.unstable_sx = function(v) {
    return wn({
      sx: v,
      theme: this
    });
  }, E.toRuntimeSource = gd, E;
}
function Ec(t, e, a) {
  t.colorSchemes && a && (t.colorSchemes[e] = {
    ...a !== !0 && a,
    palette: ks({
      ...a === !0 ? {} : a.palette,
      mode: e
    })
    // cast type to skip module augmentation test
  });
}
function c2(t = {}, ...e) {
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
      return Vi(t, ...e);
    let c = a;
    "palette" in t || u[s] && (u[s] !== !0 ? c = u[s].palette : s === "dark" && (c = {
      mode: "dark"
    }));
    const d = Vi({
      ...t,
      palette: c
    }, ...e);
    return d.defaultColorScheme = s, d.colorSchemes = u, d.palette.mode === "light" && (d.colorSchemes.light = {
      ...u.light !== !0 && u.light,
      palette: d.palette
    }, Ec(d, "dark", u.dark)), d.palette.mode === "dark" && (d.colorSchemes.dark = {
      ...u.dark !== !0 && u.dark,
      palette: d.palette
    }, Ec(d, "light", u.light)), d;
  }
  return !a && !("light" in u) && s === "light" && (u.light = !0), l2({
    ...i,
    colorSchemes: u,
    defaultColorScheme: s,
    ...typeof r != "boolean" && r
  }, ...e);
}
const u2 = c2(), d2 = "$$material";
function f2(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const p2 = (t) => f2(t) && t !== "classes", h2 = cx({
  themeId: d2,
  defaultTheme: u2,
  rootShouldForwardProp: p2
}), m2 = wx;
function g2(t) {
  return Sx(t);
}
function v2(t) {
  return sd("MuiSvgIcon", t);
}
ox("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const b2 = (t) => {
  const {
    color: e,
    fontSize: a,
    classes: r
  } = t, n = {
    root: ["root", e !== "inherit" && `color${Sn(e)}`, `fontSize${Sn(a)}`]
  };
  return uy(n, v2, r);
}, y2 = h2("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (t, e) => {
    const {
      ownerState: a
    } = t;
    return [e.root, a.color !== "inherit" && e[`color${Sn(a.color)}`], e[`fontSize${Sn(a.fontSize)}`]];
  }
})(m2(({
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
})), Hi = /* @__PURE__ */ b.forwardRef(function(e, a) {
  const r = g2({
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
  const w = b2(m);
  return /* @__PURE__ */ B.jsxs(y2, {
    as: s,
    className: cy(w.root, o),
    focusable: "false",
    color: u,
    "aria-hidden": d ? void 0 : !0,
    role: d ? "img" : void 0,
    ref: a,
    ...y,
    ...h,
    ...g && n.props,
    ownerState: m,
    children: [g ? n.props.children : n, d ? /* @__PURE__ */ B.jsx("title", {
      children: d
    }) : null]
  });
});
Hi.muiName = "SvgIcon";
function x2(t, e) {
  function a(r, n) {
    return /* @__PURE__ */ B.jsx(Hi, {
      "data-testid": void 0,
      ref: n,
      ...r,
      children: t
    });
  }
  return a.muiName = Hi.muiName, /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(a));
}
const C2 = x2(/* @__PURE__ */ B.jsx("path", {
  d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"
})), S2 = (t) => {
  const { value: e, testId: a, size: r, stopPropagation: n } = t, o = e, i = "Copy to Clipboard", s = "Copied", [l, u] = At(i), c = () => {
    u(i);
  }, d = (p) => {
    u(s), zu(o), n && p.stopPropagation();
  };
  return /* @__PURE__ */ B.jsx(
    Ua,
    {
      title: l,
      onClose: c,
      placement: "top-end",
      children: /* @__PURE__ */ B.jsx(ve, { component: "span", children: /* @__PURE__ */ B.jsx(lu, { size: "small", color: "primary", onClick: (p) => d(p), children: /* @__PURE__ */ B.jsx(C2, {}) }) })
    }
  );
}, w2 = ar(
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
), E2 = ar(
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
function k2(t) {
  const { children: e, classes: a, disabled: r, title: n, ...o } = t;
  return r ? /* @__PURE__ */ B.jsx(B.Fragment, { children: e }) : /* @__PURE__ */ B.jsx(B.Fragment, { children: e && n && /* @__PURE__ */ B.jsx(
    Ua,
    {
      ...o,
      classes: a,
      interactive: !0,
      title: n,
      children: e
    }
  ) });
}
function kc(t) {
  const {
    children: e,
    heading: a,
    disabled: r,
    content: n,
    example: o,
    action: i,
    darken: s = !0,
    ...l
  } = t, u = E2(), c = w2(), d = /* @__PURE__ */ B.jsxs(ve, { p: 0.5, children: [
    a && /* @__PURE__ */ B.jsx(ve, { mb: n ? 1 : 0, children: /* @__PURE__ */ B.jsx(Mt, { variant: "h5", children: a }) }),
    n && /* @__PURE__ */ B.jsx(Mt, { variant: "body2", children: n }),
    (i || o) && /* @__PURE__ */ B.jsx(Qg, { className: u.divider }),
    o && /* @__PURE__ */ B.jsxs(
      Mt,
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
    i && /* @__PURE__ */ B.jsx(
      R0,
      {
        href: i.link,
        className: u.buttonLink,
        target: "_blank",
        rel: "noreferrer",
        children: i.text
      }
    )
  ] });
  return e ? /* @__PURE__ */ B.jsx(
    k2,
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
const yd = ar((t) => ({
  root: {
    padding: t.spacing(0.5, 1.5),
    width: "100%",
    minHeight: t.spacing(5),
    backgroundColor: t.palette.common.white,
    border: `1px solid ${t.palette.grey[100]}`,
    boxShadow: `0 1px 2px -1px ${Je(
      t.palette.common.black,
      0.08
    )}, 0 -3px 9px 0 ${Je(t.palette.common.black, 0.04)} inset`,
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
    boxShadow: `0 -3px 9px 0 ${Je(
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
    boxShadow: `0 0 0 1px ${t.palette.error.light}, inset 0 2px 2px ${Je(
      t.palette.error.light,
      0.07
    )}`,
    "&:hover": {
      borderColor: t.palette.error.main
    }
  },
  readOnlyDefault: {
    boxShadow: `0 0 0 1px ${Je(
      t.palette.common.black,
      0.05
    )}, inset 0 2px 2px ${Je(t.palette.common.black, 0.05)}`,
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
})), $2 = (t, e) => {
  const a = yd(t), {
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
  } = t, L = p && /* @__PURE__ */ B.jsx(
    kc,
    {
      darken: !0,
      title: p,
      disabled: !p,
      placement: h,
      children: /* @__PURE__ */ B.jsx(ve, { className: a.tooltipIcon, children: /* @__PURE__ */ B.jsx(ve, { className: a.textInputInfoIcon, children: /* @__PURE__ */ B.jsx(Gb, { fontSize: "inherit" }) }) })
    }
  );
  return /* @__PURE__ */ B.jsxs(ve, { width: n, children: [
    (r || L || y || c || w) && /* @__PURE__ */ B.jsxs(ve, { className: a.formLabel, children: [
      r && /* @__PURE__ */ B.jsx(Mt, { component: "h6", variant: "body1", children: r }),
      y && /* @__PURE__ */ B.jsx(ve, { className: a.formLabelInfo, children: y }),
      L && /* @__PURE__ */ B.jsx(ve, { className: a.formLabelTooltip, children: L }),
      c && /* @__PURE__ */ B.jsx(Mt, { variant: "body2", className: a.formOptional, children: "(Optional)" }),
      w && /* @__PURE__ */ B.jsx(ve, { className: a.formLabelAction, children: w })
    ] }),
    /* @__PURE__ */ B.jsx(
      kc,
      {
        darken: !0,
        heading: g,
        disabled: !g,
        placement: h,
        children: /* @__PURE__ */ B.jsx(ve, { className: a.inputGroup, children: /* @__PURE__ */ B.jsx(
          no,
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
    i && s && /* @__PURE__ */ B.jsx(El, { error: i, children: /* @__PURE__ */ B.jsxs(ve, { display: "flex", alignItems: "center", children: [
      /* @__PURE__ */ B.jsx(ve, { className: a.textInputInfoIcon, children: /* @__PURE__ */ B.jsx(Ub, { fontSize: "inherit" }) }),
      /* @__PURE__ */ B.jsx(ve, { ml: 1, children: s })
    ] }) }),
    d && s && /* @__PURE__ */ B.jsx(El, { children: /* @__PURE__ */ B.jsxs(ve, { display: "flex", alignItems: "center", children: [
      /* @__PURE__ */ B.jsx(Xn, { size: 12 }),
      /* @__PURE__ */ B.jsx(ve, { ml: 1, children: s })
    ] }) })
  ] });
}, yr = Tc($2), R2 = ar(
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
), pi = (t) => {
  const e = R2(), a = yd(t), {
    size: r,
    value: n,
    component: o = "textInput",
    endAdornment: i,
    testId: s,
    ...l
  } = t, u = n;
  return /* @__PURE__ */ B.jsxs(
    ve,
    {
      className: e.copyToClipboard,
      "data-cyid": `${s}-copy-to-clipboard`,
      children: [
        o === "textInput" && /* @__PURE__ */ B.jsx(ve, { className: e.copyToClipboardInputWrap, children: /* @__PURE__ */ B.jsx(
          yr,
          {
            value: n,
            readOnly: !0,
            className: a.copyToClipboardInput,
            ...l,
            size: r,
            testId: s,
            endAdornment: /* @__PURE__ */ B.jsx(E0, { position: "end", children: i })
          }
        ) }),
        o === "card" && /* @__PURE__ */ B.jsx(ve, { className: e.copyToClipboardCard, children: n }),
        /* @__PURE__ */ B.jsx(
          ve,
          {
            className: he({
              [e.copyIconWrap]: !0,
              [e.copyIconWrapCard]: o === "card"
            }),
            children: /* @__PURE__ */ B.jsx(
              S2,
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
}, $s = ar(
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
), T2 = (t) => {
  const {
    children: e,
    testId: a,
    size: r = "medium",
    actions: n,
    iconPosition: o = "left",
    ...i
  } = t, s = $s();
  return /* @__PURE__ */ B.jsxs(ve, { className: s.tabBox, children: [
    /* @__PURE__ */ B.jsx(
      Uv,
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
    n && /* @__PURE__ */ B.jsx(ve, { className: s.tabAction, children: n })
  ] });
};
function O2(t) {
  return {
    id: `simple-tab-${t}`,
    "aria-controls": `simple-tabpanel-${t}`
  };
}
const $c = (t) => {
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
  } = t, p = $s();
  return /* @__PURE__ */ B.jsxs(
    ve,
    {
      className: he(p.tabCard, u, {
        [p.fullHeight]: c
      }),
      children: [
        /* @__PURE__ */ B.jsxs(ve, { className: p.tabHeading, children: [
          s && /* @__PURE__ */ B.jsx(ve, { textAlign: o && "center", mb: 3, children: /* @__PURE__ */ B.jsx(Mt, { variant: "h2", gutterBottom: !0, children: s }) }),
          /* @__PURE__ */ B.jsxs(
            ve,
            {
              className: he(p.tabActionsWrap, {
                [p.tabActionsWrapCenter]: o
              }),
              children: [
                /* @__PURE__ */ B.jsx(
                  cb,
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
                      return h.hidden ? null : h.buttonProps ? /* @__PURE__ */ B.jsx(
                        Cr,
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
                      ) : /* @__PURE__ */ Ld(
                        T2,
                        {
                          label: h.name,
                          ...O2(g),
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
                i && /* @__PURE__ */ B.jsx(ve, { className: p.tabActions, children: i })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ B.jsxs(ve, { className: p.tabBody, children: [
          " ",
          a
        ] })
      ]
    }
  );
};
function pn(t) {
  const { children: e, value: a, index: r, ...n } = t, o = $s();
  return /* @__PURE__ */ B.jsx(
    ve,
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
const _2 = "choreo-test-key", P2 = "choreo-oauth2-token", j2 = (t) => {
  const { token: e, apiEndpoint: a, sandboxEndpoint: r, topic: n, publish: o, subscribe: i, parameters: s, isDevportal: l, asyncType: u, payload: c } = t, d = gs(), [p, h] = At(null), [g, m] = At([]), [y, w] = At(c || ""), [k, I] = At(a), [f, x] = At("production"), [E, L] = At({}), [W, O] = At(!1), [P, A] = At("Connect"), [v, C] = At(0), [M, D] = At(e), [$, V] = At("http://example.com/callback"), [F, q] = At("864000"), [z, J] = At("xxxxxxxxx"), Z = (fe, pe) => {
    let je;
    pe === 0 ? je = "subscribe" : pe === 1 && (je = "unsubscribe"), console.log("subEvent", je), w(ce(n, je, $, F, z)), C(pe);
  };
  function ce(fe, pe, je, Ie, Ve) {
    if (u === xr.WEBSUB) {
      if (pe === "unsubscribe")
        return JSON.stringify({
          "hub.mode": "unsubscribe",
          "hub.topic": fe,
          "hub.callback": je || $
        }, null, 2);
      if (pe === "subscribe")
        return JSON.stringify({
          "hub.mode": "subscribe",
          "hub.topic": fe || "sample-topic",
          "hub.callback": je || $,
          "hub.secret": Ve || z,
          "hub.lease_seconds": parseInt(Ie || F)
        }, null, 2);
    }
    return '{ "message": "Hello Server" }';
  }
  function ue() {
    const fe = v === 0 ? "subscribe" : v === 1 ? "unsubscribe" : "subscribe";
    let pe = `curl -X POST ${k} -H 'Content-Type: application/x-www-form-urlencoded'`;
    return pe += ` -d 'hub.topic=${n}'`, fe === "subscribe" && (pe += ` -d 'hub.callback=${$}'`), pe += ` -d 'hub.mode=${fe}'`, fe === "subscribe" && (pe += ` -d 'hub.lease_seconds=${F}'`, pe += ` -d 'hub.secret=${z}'`), M && M.trim() && (pe += ` -H 'Authorization: Bearer ${M}'`), pe;
  }
  Da(() => {
    const fe = f === "production" ? a : r;
    if (n !== "/*") {
      const pe = n.startsWith("/") || fe.endsWith("/") ? n === "/" ? "" : n : `/${n}`;
      I(`${fe}${pe}`);
    } else
      I(fe + "/");
    s != null && L(
      Object.keys(s).reduce((pe, je) => (pe[je] = "", pe), {})
    );
  }, [a, r, f, n]), Da(() => {
    u === xr.WEBSUB && v === 0 && w(ce(n, "subscribe", $, F, z));
  }, [$, F, z]);
  const xe = (fe) => {
    const pe = fe.target.value;
    if (pe === "sandbox" && (!r || r === "")) {
      x("production");
      return;
    }
    x(pe);
  }, de = () => {
    u !== xr.WEBSUB && p && y && p.readyState === p.OPEN && (p.send(y), m((fe) => [
      ...fe,
      {
        message: `Sent: ${y}`,
        timestamp: (/* @__PURE__ */ new Date()).toString(),
        randomKey: g.length
      }
    ]), w(""), p.onmessage = (fe) => m((pe) => [
      ...pe,
      {
        message: `Received: ${fe.data}`,
        timestamp: (/* @__PURE__ */ new Date()).toString(),
        randomKey: g.length
      }
    ]));
  }, be = () => {
    A("Connecting...");
    let fe = k;
    for (const Ie in E)
      fe = fe.replace(`{${Ie}}`, E[Ie]);
    const pe = [];
    l ? pe.push(P2) : pe.push(_2), M && M.trim() && pe.push(M);
    const je = new WebSocket(fe, pe);
    h(je), je.onopen = () => {
      O(!0), m((Ie) => [
        ...Ie,
        {
          message: `Connected to ${fe}`,
          timestamp: (/* @__PURE__ */ new Date()).toString(),
          randomKey: g.length
        }
      ]), A("Disconnect");
    }, je.onerror = () => {
      O(!1), m((Ie) => [
        ...Ie,
        {
          message: "Error while connecting to the server. Please check the endpoint and try again.",
          timestamp: (/* @__PURE__ */ new Date()).toString(),
          randomKey: g.length
        }
      ]), A("Connect");
    };
  }, ye = () => {
    A("Disconnecting..."), setTimeout(() => {
      A("Connect"), O(!1), p == null || p.close(), p != null && p.CLOSED && (m((fe) => [
        ...fe,
        { message: "Disconnected", timestamp: (/* @__PURE__ */ new Date()).toString() }
      ]), A("Connect"));
    }, 1e3);
  }, we = () => {
    m([]);
  };
  function ke(fe) {
    return fe.split("").reduce((pe, je, Ie) => pe + je.charCodeAt(0) * Ie, 1);
  }
  const ge = [
    d.logColor1,
    d.logColor2,
    d.logColor3,
    d.logColor4
  ], { current: Ee } = Dd(/* @__PURE__ */ new Map()), Ae = (fe) => {
    if (Ee.has(fe))
      return Ee.get(fe) || "";
    const pe = ge[ke(fe) % ge.length];
    return Ee.set(fe, pe), pe;
  }, _e = (fe) => /* @__PURE__ */ B.jsx(
    Jb,
    {
      getColor: Ae,
      logEntry: fe,
      timeZone: "UTC",
      onCopy: () => {
      },
      isExpanded: !1,
      isHeiglighted: !1,
      isExpandable: !1
    }
  );
  function qe(fe) {
    switch (fe) {
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
  const Te = Oc(
    () => P === "Connect" ? "Connect to the server to start sending messages." : "Enter your message to send.",
    [P]
  ), We = [{ name: "Parameters" }, { name: "Payload" }, { name: "Headers" }], Ke = [{ name: "Payload" }, { name: "Headers" }], Ge = [{ name: "Subscribe" }, { name: "Unsubscribe" }, { name: "Headers" }];
  return u === xr.WEBSUB ? /* @__PURE__ */ B.jsx(ve, { className: d.topicContainer, children: /* @__PURE__ */ B.jsxs(Jl, { square: !0, testId: "topic-accordion", bordered: !0, children: [
    /* @__PURE__ */ B.jsx(
      Ql,
      {
        "aria-controls": "panel1a-content",
        testId: "topic-accordion-summary",
        children: /* @__PURE__ */ B.jsxs(ve, { className: d.topicTypeContainer, children: [
          /* @__PURE__ */ B.jsx(ve, { className: d.typeChipContainer, children: /* @__PURE__ */ B.jsx(
            si,
            {
              label: "SUB",
              testId: "default",
              variant: "contained",
              color: "success",
              size: "medium",
              disabled: !i
            }
          ) }),
          /* @__PURE__ */ B.jsx(ve, { className: d.typeChipContainer, children: /* @__PURE__ */ B.jsx(Mt, { variant: "body2", children: n }) })
        ] })
      }
    ),
    /* @__PURE__ */ B.jsx(Zl, { testId: "topic-accordion-details", children: /* @__PURE__ */ B.jsx(ve, { width: "100%", style: { maxWidth: "100%", boxSizing: "border-box", overflow: "hidden" }, children: n && /* @__PURE__ */ B.jsxs(
      hi,
      {
        fallback: /* @__PURE__ */ B.jsx(
          ve,
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            children: /* @__PURE__ */ B.jsx(Xn, { size: 25 })
          }
        ),
        children: [
          /* @__PURE__ */ B.jsxs(ve, { className: d.endpointContainer, children: [
            /* @__PURE__ */ B.jsx(
              wl,
              {
                size: "small",
                variant: "outlined",
                style: {
                  width: 150,
                  flexShrink: 0,
                  height: 40
                },
                children: /* @__PURE__ */ B.jsxs(
                  Dl,
                  {
                    value: f,
                    onChange: xe,
                    disabled: W,
                    "data-testid": "endpoint-type-select",
                    inputProps: { "aria-label": "Endpoint type" },
                    style: {
                      height: 40,
                      borderRadius: 4,
                      backgroundColor: "#ffffff",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)"
                    },
                    children: [
                      /* @__PURE__ */ B.jsx(xa, { value: "production", children: "Production" }),
                      /* @__PURE__ */ B.jsx(xa, { value: "sandbox", disabled: !r || r === "", children: "Sandbox" })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ B.jsx(ve, { className: d.textInput, children: /* @__PURE__ */ B.jsx(
              pi,
              {
                value: k,
                size: "small",
                testId: "endpoint-url"
              }
            ) }),
            /* @__PURE__ */ B.jsx(
              Cr,
              {
                color: W ? "secondary" : "primary",
                variant: "contained",
                pill: !1,
                size: "small",
                disabled: u === xr.WEBSUB,
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
                onClick: () => W ? ye() : be(),
                children: qe(P)
              }
            )
          ] }),
          /* @__PURE__ */ B.jsx(ve, { style: { width: "100%", maxWidth: "100%", boxSizing: "border-box" }, children: /* @__PURE__ */ B.jsxs(
            $c,
            {
              className: d.tabs,
              tabItems: Ge,
              handleChange: Z,
              value: v,
              testId: "env-tab-card",
              fullHeight: !0,
              children: [
                /* @__PURE__ */ B.jsx(
                  pn,
                  {
                    value: v,
                    index: 0,
                    children: /* @__PURE__ */ B.jsxs(ve, { className: d.tabPanelContent, children: [
                      /* @__PURE__ */ B.jsx(ve, { className: d.parameterContainerWrapper, children: /* @__PURE__ */ B.jsxs(ve, { className: d.parameterContainer, children: [
                        /* @__PURE__ */ B.jsx(
                          yr,
                          {
                            testId: "input-callbackurl",
                            className: d.callbackURLTextInput,
                            type: "text",
                            placeholder: "Callback URL",
                            label: "Callback URL",
                            value: $,
                            onChange: (fe) => {
                              const pe = fe.target.value;
                              V(pe);
                            },
                            helperText: "Enter Callback URL"
                          }
                        ),
                        /* @__PURE__ */ B.jsx(
                          yr,
                          {
                            testId: "input-leaseseconds",
                            className: d.callbackURLTextInput,
                            type: "text",
                            placeholder: "Lease Seconds",
                            label: "Lease Seconds",
                            value: F,
                            onChange: (fe) => {
                              const pe = fe.target.value;
                              q(pe);
                            },
                            helperText: "Enter Lease Seconds"
                          }
                        ),
                        /* @__PURE__ */ B.jsx(
                          yr,
                          {
                            testId: "input-secret",
                            className: d.callbackURLTextInput,
                            type: "text",
                            placeholder: "Secret",
                            label: "Secret",
                            value: z,
                            onChange: (fe) => {
                              const pe = fe.target.value;
                              J(pe);
                            },
                            helperText: "Enter Secret"
                          }
                        )
                      ] }) }),
                      /* @__PURE__ */ B.jsxs(y0, { children: [
                        /* @__PURE__ */ B.jsx(
                          Mt,
                          {
                            "data-testid": "curl-command-txt",
                            variant: "body1",
                            className: d.label,
                            display: "block",
                            children: "Command"
                          }
                        ),
                        /* @__PURE__ */ B.jsx(ve, { className: d.payloadContainer, children: /* @__PURE__ */ B.jsx(
                          pi,
                          {
                            value: ue(),
                            size: "small",
                            testId: "curl-command"
                          }
                        ) })
                      ] })
                    ] })
                  }
                ),
                /* @__PURE__ */ B.jsx(
                  pn,
                  {
                    value: v,
                    index: 1,
                    children: /* @__PURE__ */ B.jsxs(ve, { className: d.tabPanelContent, children: [
                      /* @__PURE__ */ B.jsx(ve, { className: d.parameterContainerWrapper, children: /* @__PURE__ */ B.jsx(ve, { className: d.parameterContainer, children: /* @__PURE__ */ B.jsx(
                        yr,
                        {
                          testId: "input-callbackurl",
                          className: d.callbackURLTextInput,
                          type: "text",
                          placeholder: "Callback URL",
                          label: "Callback URL",
                          value: $,
                          onChange: (fe) => {
                            const pe = fe.target.value;
                            V(pe);
                          },
                          helperText: "Enter Callback URL"
                        }
                      ) }) }),
                      /* @__PURE__ */ B.jsx(ve, { className: d.payloadContainer, children: /* @__PURE__ */ B.jsx(
                        Xl,
                        {
                          fileContent: y,
                          language: "json",
                          height: "170px",
                          width: "100%",
                          setFileContent: w
                        }
                      ) }),
                      /* @__PURE__ */ B.jsx(ve, { mt: 5, children: /* @__PURE__ */ B.jsx(Ua, { title: Te, placement: "top-start", children: /* @__PURE__ */ B.jsx(ve, { className: d.sendIcon, children: /* @__PURE__ */ B.jsx(
                        Cr,
                        {
                          testId: "payload-send",
                          disabled: y.length === 0 || !W,
                          variant: "outlined",
                          startIcon: /* @__PURE__ */ B.jsx(Gl, {}),
                          onClick: de,
                          size: "small",
                          children: /* @__PURE__ */ B.jsx(Mt, { variant: "body1", align: "center", children: "Send" })
                        }
                      ) }) }) })
                    ] })
                  }
                ),
                /* @__PURE__ */ B.jsx(
                  pn,
                  {
                    value: v,
                    index: 2,
                    children: /* @__PURE__ */ B.jsx(ve, { className: d.tabPanelContent, children: /* @__PURE__ */ B.jsx(ve, { className: d.parameterContainerWrapper, children: /* @__PURE__ */ B.jsx(
                      ve,
                      {
                        className: d.parameterContainer,
                        children: /* @__PURE__ */ B.jsx(
                          yr,
                          {
                            testId: "input-headers",
                            className: d.apiTokenTextInput,
                            type: "text",
                            placeholder: "API Token",
                            label: "API Token",
                            value: M,
                            onChange: (fe) => {
                              const pe = fe.target.value;
                              D(pe);
                            },
                            error: M === "",
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
          ) })
        ]
      }
    ) }) })
  ] }) }) : /* @__PURE__ */ B.jsx(ve, { className: d.topicContainer, children: /* @__PURE__ */ B.jsxs(Jl, { square: !0, testId: "topic-accordion", bordered: !0, children: [
    /* @__PURE__ */ B.jsx(
      Ql,
      {
        "aria-controls": "panel1a-content",
        testId: "topic-accordion-summary",
        children: /* @__PURE__ */ B.jsxs(ve, { className: d.topicTypeContainer, children: [
          u === xr.WS && /* @__PURE__ */ B.jsx(ve, { className: d.typeChipContainer, children: /* @__PURE__ */ B.jsx(
            si,
            {
              label: "PUB",
              testId: "default",
              variant: "contained",
              color: "info",
              size: "medium",
              disabled: !o
            }
          ) }),
          /* @__PURE__ */ B.jsx(ve, { className: d.typeChipContainer, children: /* @__PURE__ */ B.jsx(
            si,
            {
              label: "SUB",
              testId: "default",
              variant: "contained",
              color: "success",
              size: "medium",
              disabled: !i
            }
          ) }),
          /* @__PURE__ */ B.jsx(ve, { className: d.typeChipContainer, children: /* @__PURE__ */ B.jsx(Mt, { variant: "body2", children: n }) })
        ] })
      }
    ),
    /* @__PURE__ */ B.jsx(Zl, { testId: "topic-accordion-details", children: /* @__PURE__ */ B.jsx(ve, { width: "100%", style: { maxWidth: "100%", boxSizing: "border-box", overflow: "hidden" }, children: n && /* @__PURE__ */ B.jsxs(
      hi,
      {
        fallback: /* @__PURE__ */ B.jsx(
          ve,
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            children: /* @__PURE__ */ B.jsx(Xn, { size: 25 })
          }
        ),
        children: [
          u === xr.WS && /* @__PURE__ */ B.jsxs(ve, { className: d.endpointContainer, children: [
            /* @__PURE__ */ B.jsx(
              wl,
              {
                size: "small",
                variant: "outlined",
                style: {
                  width: 150,
                  flexShrink: 0,
                  height: 40
                },
                children: /* @__PURE__ */ B.jsxs(
                  Dl,
                  {
                    value: f,
                    onChange: xe,
                    disabled: W,
                    "data-testid": "endpoint-type-select",
                    inputProps: { "aria-label": "Endpoint type" },
                    style: {
                      height: 40,
                      borderRadius: 4,
                      backgroundColor: "#ffffff",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)"
                    },
                    children: [
                      /* @__PURE__ */ B.jsx(xa, { value: "production", children: "Production" }),
                      /* @__PURE__ */ B.jsx(xa, { value: "sandbox", disabled: !r || r === "", children: "Sandbox" })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ B.jsx(ve, { className: d.textInput, children: /* @__PURE__ */ B.jsx(
              pi,
              {
                value: k,
                size: "small",
                testId: "endpoint-url"
              }
            ) }),
            /* @__PURE__ */ B.jsx(
              Cr,
              {
                color: W ? "secondary" : "primary",
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
                onClick: () => W ? ye() : be(),
                children: qe(P)
              }
            )
          ] }),
          /* @__PURE__ */ B.jsxs(ve, { style: { width: "100%", maxWidth: "100%", boxSizing: "border-box" }, children: [
            /* @__PURE__ */ B.jsxs(
              $c,
              {
                className: d.tabs,
                tabItems: Object.keys(E).length === 0 ? Ke : We,
                handleChange: Z,
                value: v,
                testId: "env-tab-card",
                fullHeight: !0,
                children: [
                  Object.keys(E).length !== 0 && /* @__PURE__ */ B.jsx(pn, { value: v, index: 0, children: /* @__PURE__ */ B.jsx(ve, { className: d.tabPanelContent, children: /* @__PURE__ */ B.jsxs(ve, { className: d.parameterContainerWrapper, children: [
                    /* @__PURE__ */ B.jsx(ve, { className: d.parameterContainer, children: Object.keys(E).map((fe) => /* @__PURE__ */ B.jsx(ve, { children: /* @__PURE__ */ B.jsx(
                      yr,
                      {
                        testId: `input-${fe}`,
                        className: d.paramTextInput,
                        type: "text",
                        placeholder: fe,
                        label: fe,
                        value: E[fe],
                        onChange: (pe) => {
                          const je = {
                            ...E,
                            [fe]: pe.target.value
                          };
                          L(je);
                        },
                        error: E[fe] === "",
                        helperText: "Enter parameter value"
                      }
                    ) }, fe)) }),
                    /* @__PURE__ */ B.jsx(ve, { className: d.executeButton, children: /* @__PURE__ */ B.jsx(
                      Cr,
                      {
                        testId: "execute",
                        disabled: W,
                        variant: "outlined",
                        onClick: be,
                        startIcon: /* @__PURE__ */ B.jsx(qb, {}),
                        size: "small",
                        children: /* @__PURE__ */ B.jsx(Mt, { variant: "body1", align: "center", children: "Execute" })
                      }
                    ) })
                  ] }) }) }),
                  /* @__PURE__ */ B.jsx(
                    pn,
                    {
                      value: v,
                      index: Object.keys(E).length === 0 ? 0 : 1,
                      children: /* @__PURE__ */ B.jsxs(ve, { className: d.tabPanelContent, children: [
                        /* @__PURE__ */ B.jsx(ve, { className: d.payloadContainer, children: /* @__PURE__ */ B.jsx(
                          Xl,
                          {
                            fileContent: y,
                            language: "json",
                            height: "170px",
                            width: "100%",
                            setFileContent: w
                          }
                        ) }),
                        /* @__PURE__ */ B.jsx(ve, { mt: 5, children: /* @__PURE__ */ B.jsx(Ua, { title: Te, placement: "top-start", children: /* @__PURE__ */ B.jsx(ve, { className: d.sendIcon, children: /* @__PURE__ */ B.jsx(
                          Cr,
                          {
                            testId: "payload-send",
                            disabled: y.length === 0 || !W,
                            variant: "outlined",
                            startIcon: /* @__PURE__ */ B.jsx(Gl, {}),
                            onClick: de,
                            size: "small",
                            children: /* @__PURE__ */ B.jsx(Mt, { variant: "body1", align: "center", children: "Send" })
                          }
                        ) }) }) })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ B.jsx(
                    pn,
                    {
                      value: v,
                      index: Object.keys(E).length === 0 ? 1 : 2,
                      children: /* @__PURE__ */ B.jsx(ve, { className: d.tabPanelContent, children: /* @__PURE__ */ B.jsx(ve, { className: d.parameterContainerWrapper, children: /* @__PURE__ */ B.jsx(
                        ve,
                        {
                          className: d.parameterContainer,
                          children: /* @__PURE__ */ B.jsx(
                            yr,
                            {
                              testId: "input-headers",
                              className: d.apiTokenTextInput,
                              type: "text",
                              placeholder: "API Token",
                              label: "API Token",
                              value: M,
                              onChange: (fe) => {
                                const pe = fe.target.value;
                                D(pe);
                              },
                              error: M === "",
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
            /* @__PURE__ */ B.jsx(
              ty,
              {
                messages: g,
                clearLogs: we,
                isDisabled: g.length < 1
              }
            ),
            /* @__PURE__ */ B.jsx(ve, { children: /* @__PURE__ */ B.jsx(ve, { className: d.outputContainer, children: g.map(
              (fe, pe) => _e({
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
var xr = /* @__PURE__ */ ((t) => (t.WS = "WS", t.WEBSUB = "WEBSUB", t))(xr || {});
function Ea(t) {
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
function M2(t) {
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
  } = t, [s, l] = At([
    { name: "/*", subscribe: !0, publish: !0, parameters: {} }
  ]);
  Da(() => {
    n != null && n.channels && l(Ea(n));
  }, [n]);
  const u = Oc(() => {
    var d, p;
    if (n && Object.keys(n).length > 0 && a) {
      let h = Wl(n);
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
      }), h != null && h.channels && l(Ea(h)), h;
    } else {
      let h = Wl(n);
      l(Ea(h));
    }
    return null;
  }, [n, a, r]);
  Da(() => {
    u != null && u.channels && l(Ea(u));
  }, [u]);
  function c(d) {
    return i === "WEBSUB" ? JSON.stringify({
      "hub.mode": "subscribe",
      "hub.topic": d || "sample-topic",
      "hub.callback": "http://example.com/callback",
      "hub.secret": "xxxxxxxxx",
      "hub.lease_seconds": 864e3
    }) : '{ "message": "Hello Server" }';
  }
  return !s || !(n != null && n.channels) ? /* @__PURE__ */ B.jsx(
    ve,
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      children: /* @__PURE__ */ B.jsx(Xn, { size: 25 })
    }
  ) : a ? /* @__PURE__ */ B.jsx(ve, { children: s.map(({ name: d, publish: p, subscribe: h, parameters: g }) => /* @__PURE__ */ B.jsx(
    j2,
    {
      token: e,
      apiEndpoint: a,
      sandboxEndpoint: r || "",
      topic: d,
      publish: p,
      subscribe: h,
      parameters: g,
      isDevportal: o,
      payload: c(d),
      asyncType: i || "WS"
      /* WS */
    },
    d
  )) }) : /* @__PURE__ */ B.jsx(B.Fragment, {});
}
export {
  M2 as WebSocketViewer,
  M2 as default
};
