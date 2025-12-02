import ae, { useState as $, useMemo as ce } from "react";
var P = { exports: {} }, z = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var F, Z;
function pe() {
  if (Z) return F;
  Z = 1;
  var b = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, f = Object.prototype.propertyIsEnumerable;
  function M(g) {
    if (g == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(g);
  }
  function d() {
    try {
      if (!Object.assign)
        return !1;
      var g = new String("abc");
      if (g[5] = "de", Object.getOwnPropertyNames(g)[0] === "5")
        return !1;
      for (var m = {}, i = 0; i < 10; i++)
        m["_" + String.fromCharCode(i)] = i;
      var s = Object.getOwnPropertyNames(m).map(function(o) {
        return m[o];
      });
      if (s.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(o) {
        l[o] = o;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return F = d() ? Object.assign : function(g, m) {
    for (var i, s = M(g), l, o = 1; o < arguments.length; o++) {
      i = Object(arguments[o]);
      for (var p in i)
        r.call(i, p) && (s[p] = i[p]);
      if (b) {
        l = b(i);
        for (var x = 0; x < l.length; x++)
          f.call(i, l[x]) && (s[l[x]] = i[l[x]]);
      }
    }
    return s;
  }, F;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var G;
function xe() {
  if (G) return z;
  G = 1, pe();
  var b = ae, r = 60103;
  if (z.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var f = Symbol.for;
    r = f("react.element"), z.Fragment = f("react.fragment");
  }
  var M = b.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = Object.prototype.hasOwnProperty, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(i, s, l) {
    var o, p = {}, x = null, C = null;
    l !== void 0 && (x = "" + l), s.key !== void 0 && (x = "" + s.key), s.ref !== void 0 && (C = s.ref);
    for (o in s) d.call(s, o) && !g.hasOwnProperty(o) && (p[o] = s[o]);
    if (i && i.defaultProps) for (o in s = i.defaultProps, s) p[o] === void 0 && (p[o] = s[o]);
    return { $$typeof: r, type: i, key: x, ref: C, props: p, _owner: M.current };
  }
  return z.jsx = m, z.jsxs = m, z;
}
var Y;
function he() {
  return Y || (Y = 1, P.exports = xe()), P.exports;
}
var e = he();
const fe = ({ schema: b, apiMetadata: r }) => {
  var H, D, A, N;
  const [f, M] = $(/* @__PURE__ */ new Set()), [d, g] = $(/* @__PURE__ */ new Set()), [m, i] = $(null), { operations: s, types: l } = ce(() => {
    if (!b || typeof b != "string") return { operations: [], types: [] };
    const t = [], n = [], v = b.split(`
`), Q = (w, y) => {
      const a = [];
      let S = !1, u = 0, j = "", W = [], T = !1;
      for (let E = 0; E < v.length; E++) {
        const O = v[E], c = O.trim();
        if (!c) {
          T || (j = "", W = []);
          continue;
        }
        if (c === `type ${w}` || c.startsWith(`type ${w} `) || c.startsWith(`type ${w}{`)) {
          S = !0, u = 0, j = "", W = [], T = !1, O.includes("{") && u++;
          continue;
        }
        if (S) {
          O.includes("{") && u++, O.includes("}") && u--;
          const B = c.startsWith('"""') || c.startsWith("#");
          if (B && u > 0) {
            T = !0;
            const k = c.replace(/^("""|#)/, "").replace(/"""$/, "").trim();
            k && W.push(k), c.endsWith('"""') && c.startsWith('"""') && c.length > 3 && (T = !1);
            continue;
          }
          if (T && !B && u > 0 && (j = W.join(" ").trim(), T = !1), u > 0 && !B) {
            const k = c.match(/^\s*(\w+)\s*(\([^)]*\))?\s*:\s*(.+?)(\s*\{|\s*$)/);
            if (k) {
              const oe = k[1], V = k[2] || "";
              let U = k[3].trim();
              U = U.replace(/\s*\{.*$/, "").trim();
              const _ = [];
              if (V) {
                const ie = V.replace(/[()]/g, ""), se = Array.from(ie.matchAll(/(\w+)\s*:\s*([^,]+)/g));
                for (const J of se) {
                  const le = J[1], X = J[2].trim(), de = X.includes("!");
                  _.push({
                    name: le,
                    type: X.replace(/!/g, "").trim(),
                    required: de
                  });
                }
              }
              const re = j.trim() || void 0;
              a.push({
                name: oe,
                type: y,
                description: re,
                parameters: _.length > 0 ? _ : void 0,
                returnType: U.replace(/[!,]/g, "").trim(),
                content: O.trim()
              }), j = "", W = [];
            } else
              j && !c.startsWith("#") && !c.startsWith('"""') && (j = "", W = []);
          }
          if (u === 0 && c.includes("}")) {
            S = !1;
            break;
          }
        }
      }
      return a;
    }, te = Q("Query", "query");
    t.push(...te);
    const ne = Q("Mutation", "mutation");
    t.push(...ne);
    let h = null, I = "", L = 0, q = !1, R = [];
    for (let w = 0; w < v.length; w++) {
      const y = v[w], a = y.trim();
      if (a) {
        if ((a.startsWith('"""') || a.startsWith("#")) && !q) {
          I += a.replace(/^("""|#)/, "").replace(/"""$/, "").trim() + " ";
          continue;
        }
        if (a.startsWith("type ") || a.startsWith("interface ") || a.startsWith("enum ") || a.startsWith("scalar ") || a.startsWith("union ") || a.startsWith("input ")) {
          const S = a.match(/^(type|interface|enum|scalar|union|input)\s+(\w+)/);
          if (S) {
            const u = S[2];
            if (u === "Query" || u === "Mutation" || u === "Subscription")
              continue;
            h && (h.content = R.join(`
`), n.push(h));
            const j = S[1];
            h = {
              name: u,
              kind: j,
              description: I.trim() || void 0,
              content: ""
            }, R = [y], I = "", q = !0, L = 0, y.includes("{") && L++, y.includes("}") && L--;
          }
        } else q && h ? (R.push(y), y.includes("{") && L++, y.includes("}") && L--, L === 0 && (y.includes("}") || h.kind === "scalar" || h.kind === "union") && (h.content = R.join(`
`), n.push(h), h = null, R = [], q = !1)) : I = "";
      }
    }
    return h && (h.content = R.join(`
`), n.push(h)), { operations: t, types: n };
  }, [b]), o = s.filter((t) => t.type === "query"), p = s.filter((t) => t.type === "mutation"), x = (t) => {
    const n = new Set(f);
    n.has(t) ? n.delete(t) : n.add(t), M(n);
  }, C = (t) => {
    const n = new Set(d);
    n.has(t) ? n.delete(t) : n.add(t), g(n);
  }, K = (t) => ({
    query: "#0066cc",
    mutation: "#d73a49",
    type: "#0066cc",
    interface: "#6f42c1",
    enum: "#22863a",
    scalar: "#6a737d",
    union: "#d73a49",
    input: "#005cc5"
  })[t] || "#24292e", ee = (t) => ({
    query: "Q",
    mutation: "M",
    type: "T",
    interface: "I",
    enum: "E",
    scalar: "S",
    union: "U",
    input: "IN"
  })[t] || "?";
  return /* @__PURE__ */ e.jsx("div", { style: {
    padding: "24px",
    backgroundColor: "#f6f8fa",
    minHeight: "100vh",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
  }, children: /* @__PURE__ */ e.jsxs("div", { style: {
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: {
      padding: "24px",
      borderBottom: "1px solid #e1e4e8",
      backgroundColor: "#fafbfc"
    }, children: [
      /* @__PURE__ */ e.jsxs("h2", { style: {
        margin: "0 0 20px 0",
        color: "#24292e",
        fontSize: "24px",
        fontWeight: 600
      }, children: [
        ((H = r == null ? void 0 : r.apiInfo) == null ? void 0 : H.apiName) || "GraphQL Schema Documentation",
        ((D = r == null ? void 0 : r.apiInfo) == null ? void 0 : D.apiVersion) && /* @__PURE__ */ e.jsx("span", { style: {
          fontSize: "18px",
          fontWeight: 400,
          color: "#6a737d",
          marginLeft: "12px"
        }, children: r.apiInfo.apiVersion })
      ] }),
      r && (((A = r.endPoints) == null ? void 0 : A.productionURL) || ((N = r.endPoints) == null ? void 0 : N.sandboxURL)) && /* @__PURE__ */ e.jsxs("div", { style: {
        display: "flex",
        gap: "12px",
        flexWrap: "wrap"
      }, children: [
        r.endPoints.productionURL && /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              flex: "1 1 300px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 16px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e1e4e8",
              transition: "all 0.2s",
              cursor: "pointer",
              position: "relative"
            },
            onMouseEnter: (t) => {
              t.currentTarget.style.borderColor = "#22863a", t.currentTarget.style.boxShadow = "0 2px 8px rgba(34, 134, 58, 0.15)";
            },
            onMouseLeave: (t) => {
              t.currentTarget.style.borderColor = "#e1e4e8", t.currentTarget.style.boxShadow = "none";
            },
            onClick: async () => {
              var t;
              try {
                (t = r.endPoints) != null && t.productionURL && (await navigator.clipboard.writeText(r.endPoints.productionURL), i("production"), setTimeout(() => i(null), 2e3));
              } catch (n) {
                console.error("Failed to copy:", n);
              }
            },
            title: "Click to copy",
            children: [
              /* @__PURE__ */ e.jsx("div", { style: {
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "#22863a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }, children: /* @__PURE__ */ e.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
                /* @__PURE__ */ e.jsx("path", { d: "M10 2L2 7L10 12L18 7L10 2Z", fill: "white" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 13L10 18L18 13", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 10L10 15L18 10", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
              ] }) }),
              /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: {
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#22863a",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "4px"
                }, children: "Endpoint" }),
                /* @__PURE__ */ e.jsx("div", { style: {
                  fontSize: "14px",
                  color: "#24292e",
                  fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                  wordBreak: "break-all",
                  lineHeight: "1.4"
                }, children: r.endPoints.productionURL })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", flexShrink: 0 }, children: [
                m === "production" && /* @__PURE__ */ e.jsxs("div", { style: {
                  position: "absolute",
                  top: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "6px 12px",
                  backgroundColor: "#24292e",
                  color: "white",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  zIndex: 1e3,
                  pointerEvents: "none"
                }, children: [
                  "Copied!",
                  /* @__PURE__ */ e.jsx("div", { style: {
                    position: "absolute",
                    bottom: "-4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: "4px solid #24292e"
                  } })
                ] }),
                /* @__PURE__ */ e.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { flexShrink: 0, opacity: 0.5 }, children: [
                  /* @__PURE__ */ e.jsx("path", { d: "M4 2H12C13.1 2 14 2.9 14 4V12C14 13.1 13.1 14 12 14H4C2.9 14 2 13.1 2 12V4C2 2.9 2.9 2 4 2Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
                  /* @__PURE__ */ e.jsx("path", { d: "M6 6H10M6 10H10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
                ] })
              ] })
            ]
          }
        ),
        r.endPoints.sandboxURL && /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              flex: "1 1 300px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 16px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e1e4e8",
              transition: "all 0.2s",
              cursor: "pointer",
              position: "relative"
            },
            onMouseEnter: (t) => {
              t.currentTarget.style.borderColor = "#d73a49", t.currentTarget.style.boxShadow = "0 2px 8px rgba(215, 58, 73, 0.15)";
            },
            onMouseLeave: (t) => {
              t.currentTarget.style.borderColor = "#e1e4e8", t.currentTarget.style.boxShadow = "none";
            },
            onClick: async () => {
              var t;
              try {
                (t = r.endPoints) != null && t.sandboxURL && (await navigator.clipboard.writeText(r.endPoints.sandboxURL), i("sandbox"), setTimeout(() => i(null), 2e3));
              } catch (n) {
                console.error("Failed to copy:", n);
              }
            },
            title: "Click to copy",
            children: [
              /* @__PURE__ */ e.jsx("div", { style: {
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "#d73a49",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }, children: /* @__PURE__ */ e.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
                /* @__PURE__ */ e.jsx("path", { d: "M10 2L2 7L10 12L18 7L10 2Z", fill: "white" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 13L10 18L18 13", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 10L10 15L18 10", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
              ] }) }),
              /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: {
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#d73a49",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "4px"
                }, children: "Sandbox" }),
                /* @__PURE__ */ e.jsx("div", { style: {
                  fontSize: "14px",
                  color: "#24292e",
                  fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                  wordBreak: "break-all",
                  lineHeight: "1.4"
                }, children: r.endPoints.sandboxURL })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", flexShrink: 0 }, children: [
                m === "sandbox" && /* @__PURE__ */ e.jsxs("div", { style: {
                  position: "absolute",
                  top: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "6px 12px",
                  backgroundColor: "#24292e",
                  color: "white",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  zIndex: 1e3,
                  pointerEvents: "none"
                }, children: [
                  "Copied!",
                  /* @__PURE__ */ e.jsx("div", { style: {
                    position: "absolute",
                    bottom: "-4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: "4px solid #24292e"
                  } })
                ] }),
                /* @__PURE__ */ e.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { flexShrink: 0, opacity: 0.5 }, children: [
                  /* @__PURE__ */ e.jsx("path", { d: "M4 2H12C13.1 2 14 2.9 14 4V12C14 13.1 13.1 14 12 14H4C2.9 14 2 13.1 2 12V4C2 2.9 2.9 2 4 2Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
                  /* @__PURE__ */ e.jsx("path", { d: "M6 6H10M6 10H10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { style: { padding: "16px" }, children: [
      /* @__PURE__ */ e.jsxs("div", { style: {
        marginBottom: "24px",
        border: "1px solid #e1e4e8",
        borderRadius: "6px",
        overflow: "hidden"
      }, children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            onClick: () => C("queries"),
            style: {
              padding: "16px",
              backgroundColor: "#fafbfc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: d.has("queries") ? "1px solid #e1e4e8" : "none",
              userSelect: "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
                /* @__PURE__ */ e.jsx("div", { style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  backgroundColor: "#0066cc",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "bold"
                }, children: "Q" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: {
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#24292e"
                  }, children: "Queries" }),
                  /* @__PURE__ */ e.jsxs("div", { style: {
                    fontSize: "13px",
                    color: "#6a737d",
                    marginTop: "4px"
                  }, children: [
                    o.length,
                    " operation",
                    o.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                fontSize: "20px",
                color: "#6a737d",
                transition: "transform 0.2s",
                transform: d.has("queries") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        d.has("queries") && /* @__PURE__ */ e.jsx("div", { style: { padding: "16px" }, children: o.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { padding: "20px", textAlign: "center", color: "#6a737d" }, children: "No queries found" }) : o.map((t) => /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              marginBottom: "12px",
              border: "1px solid #e1e4e8",
              borderRadius: "6px",
              overflow: "hidden"
            },
            onMouseEnter: (n) => n.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
            onMouseLeave: (n) => n.currentTarget.style.boxShadow = "none",
            children: [
              /* @__PURE__ */ e.jsxs(
                "div",
                {
                  onClick: () => x(`query-${t.name}`),
                  style: {
                    padding: "12px 16px",
                    backgroundColor: "#fafbfc",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    userSelect: "none"
                  },
                  children: [
                    /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx("div", { style: {
                      fontWeight: 600,
                      color: "#24292e",
                      fontSize: "16px"
                    }, children: t.name }) }),
                    /* @__PURE__ */ e.jsx("span", { style: {
                      fontSize: "18px",
                      color: "#6a737d",
                      transition: "transform 0.2s",
                      transform: f.has(`query-${t.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                    }, children: "›" })
                  ]
                }
              ),
              f.has(`query-${t.name}`) && /* @__PURE__ */ e.jsxs("div", { style: {
                padding: "16px",
                backgroundColor: "white",
                borderTop: "1px solid #e1e4e8"
              }, children: [
                t.parameters && t.parameters.length > 0 && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "16px" }, children: [
                  /* @__PURE__ */ e.jsx("h4", { style: {
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#24292e"
                  }, children: "Parameters" }),
                  /* @__PURE__ */ e.jsx("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }, children: t.parameters.map((n, v) => /* @__PURE__ */ e.jsxs("div", { style: {
                    padding: "8px 12px",
                    backgroundColor: "#f6f8fa",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }, children: [
                    /* @__PURE__ */ e.jsx("span", { style: {
                      fontWeight: 600,
                      color: "#24292e",
                      fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
                    }, children: n.name }),
                    /* @__PURE__ */ e.jsx("span", { style: { color: "#6a737d" }, children: ":" }),
                    /* @__PURE__ */ e.jsx("span", { style: {
                      color: "#005cc5",
                      fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
                    }, children: n.type }),
                    n.required && /* @__PURE__ */ e.jsx("span", { style: {
                      color: "#d73a49",
                      fontSize: "12px"
                    }, children: "(required)" })
                  ] }, v)) })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h4", { style: {
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#24292e"
                  }, children: "Schema Definition" }),
                  /* @__PURE__ */ e.jsx("pre", { style: {
                    margin: 0,
                    padding: "12px",
                    backgroundColor: "#f6f8fa",
                    borderRadius: "6px",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    overflow: "auto",
                    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                    color: "#24292e"
                  }, children: t.content })
                ] })
              ] })
            ]
          },
          `query-${t.name}`
        )) })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { style: {
        marginBottom: "24px",
        border: "1px solid #e1e4e8",
        borderRadius: "6px",
        overflow: "hidden"
      }, children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            onClick: () => C("mutations"),
            style: {
              padding: "16px",
              backgroundColor: "#fafbfc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: d.has("mutations") ? "1px solid #e1e4e8" : "none",
              userSelect: "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
                /* @__PURE__ */ e.jsx("div", { style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  backgroundColor: "#d73a49",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "bold"
                }, children: "M" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: {
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#24292e"
                  }, children: "Mutations" }),
                  /* @__PURE__ */ e.jsxs("div", { style: {
                    fontSize: "13px",
                    color: "#6a737d",
                    marginTop: "4px"
                  }, children: [
                    p.length,
                    " operation",
                    p.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                fontSize: "20px",
                color: "#6a737d",
                transition: "transform 0.2s",
                transform: d.has("mutations") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        d.has("mutations") && /* @__PURE__ */ e.jsx("div", { style: { padding: "16px" }, children: p.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { padding: "20px", textAlign: "center", color: "#6a737d" }, children: "No mutations found" }) : p.map((t) => /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              marginBottom: "12px",
              border: "1px solid #e1e4e8",
              borderRadius: "6px",
              overflow: "hidden"
            },
            onMouseEnter: (n) => n.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
            onMouseLeave: (n) => n.currentTarget.style.boxShadow = "none",
            children: [
              /* @__PURE__ */ e.jsxs(
                "div",
                {
                  onClick: () => x(`mutation-${t.name}`),
                  style: {
                    padding: "12px 16px",
                    backgroundColor: "#fafbfc",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    userSelect: "none"
                  },
                  children: [
                    /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx("div", { style: {
                      fontWeight: 600,
                      color: "#24292e",
                      fontSize: "16px"
                    }, children: t.name }) }),
                    /* @__PURE__ */ e.jsx("span", { style: {
                      fontSize: "18px",
                      color: "#6a737d",
                      transition: "transform 0.2s",
                      transform: f.has(`mutation-${t.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                    }, children: "›" })
                  ]
                }
              ),
              f.has(`mutation-${t.name}`) && /* @__PURE__ */ e.jsxs("div", { style: {
                padding: "16px",
                backgroundColor: "white",
                borderTop: "1px solid #e1e4e8"
              }, children: [
                t.parameters && t.parameters.length > 0 && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "16px" }, children: [
                  /* @__PURE__ */ e.jsx("h4", { style: {
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#24292e"
                  }, children: "Parameters" }),
                  /* @__PURE__ */ e.jsx("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }, children: t.parameters.map((n, v) => /* @__PURE__ */ e.jsxs("div", { style: {
                    padding: "8px 12px",
                    backgroundColor: "#f6f8fa",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }, children: [
                    /* @__PURE__ */ e.jsx("span", { style: {
                      fontWeight: 600,
                      color: "#24292e",
                      fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
                    }, children: n.name }),
                    /* @__PURE__ */ e.jsx("span", { style: { color: "#6a737d" }, children: ":" }),
                    /* @__PURE__ */ e.jsx("span", { style: {
                      color: "#005cc5",
                      fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
                    }, children: n.type }),
                    n.required && /* @__PURE__ */ e.jsx("span", { style: {
                      color: "#d73a49",
                      fontSize: "12px"
                    }, children: "(required)" })
                  ] }, v)) })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h4", { style: {
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#24292e"
                  }, children: "Schema Definition" }),
                  /* @__PURE__ */ e.jsx("pre", { style: {
                    margin: 0,
                    padding: "12px",
                    backgroundColor: "#f6f8fa",
                    borderRadius: "6px",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    overflow: "auto",
                    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                    color: "#24292e"
                  }, children: t.content })
                ] })
              ] })
            ]
          },
          `mutation-${t.name}`
        )) })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { style: {
        marginBottom: "24px",
        border: "1px solid #e1e4e8",
        borderRadius: "6px",
        overflow: "hidden"
      }, children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            onClick: () => C("types"),
            style: {
              padding: "16px",
              backgroundColor: "#fafbfc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: d.has("types") ? "1px solid #e1e4e8" : "none",
              userSelect: "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
                /* @__PURE__ */ e.jsx("div", { style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  backgroundColor: "#6a737d",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "bold"
                }, children: "T" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: {
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#24292e"
                  }, children: "Types" }),
                  /* @__PURE__ */ e.jsxs("div", { style: {
                    fontSize: "13px",
                    color: "#6a737d",
                    marginTop: "4px"
                  }, children: [
                    l.length,
                    " type",
                    l.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                fontSize: "20px",
                color: "#6a737d",
                transition: "transform 0.2s",
                transform: d.has("types") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        d.has("types") && /* @__PURE__ */ e.jsx("div", { style: { padding: "16px" }, children: l.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { padding: "20px", textAlign: "center", color: "#6a737d" }, children: "No types found" }) : l.map((t) => /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              marginBottom: "12px",
              border: "1px solid #e1e4e8",
              borderRadius: "6px",
              overflow: "hidden"
            },
            onMouseEnter: (n) => n.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
            onMouseLeave: (n) => n.currentTarget.style.boxShadow = "none",
            children: [
              /* @__PURE__ */ e.jsxs(
                "div",
                {
                  onClick: () => x(`type-${t.name}`),
                  style: {
                    padding: "12px 16px",
                    backgroundColor: "#fafbfc",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    userSelect: "none"
                  },
                  children: [
                    /* @__PURE__ */ e.jsx("div", { style: {
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      backgroundColor: K(t.kind),
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold"
                    }, children: ee(t.kind) }),
                    /* @__PURE__ */ e.jsxs("div", { style: { flex: 1 }, children: [
                      /* @__PURE__ */ e.jsx("div", { style: {
                        fontWeight: 600,
                        color: "#24292e",
                        fontSize: "16px",
                        marginBottom: "4px"
                      }, children: t.name }),
                      t.description && /* @__PURE__ */ e.jsx("div", { style: {
                        fontSize: "13px",
                        color: "#6a737d",
                        marginBottom: "4px"
                      }, children: t.description }),
                      /* @__PURE__ */ e.jsx("span", { style: {
                        fontSize: "12px",
                        color: "#6a737d",
                        padding: "2px 8px",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        border: "1px solid #e1e4e8"
                      }, children: t.kind })
                    ] }),
                    /* @__PURE__ */ e.jsx("span", { style: {
                      fontSize: "18px",
                      color: "#6a737d",
                      transition: "transform 0.2s",
                      transform: f.has(`type-${t.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                    }, children: "›" })
                  ]
                }
              ),
              f.has(`type-${t.name}`) && /* @__PURE__ */ e.jsx("div", { style: {
                padding: "16px",
                backgroundColor: "white",
                borderTop: "1px solid #e1e4e8"
              }, children: /* @__PURE__ */ e.jsx("pre", { style: {
                margin: 0,
                padding: "12px",
                backgroundColor: "#f6f8fa",
                borderRadius: "6px",
                fontSize: "13px",
                lineHeight: "1.6",
                overflow: "auto",
                fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                color: "#24292e"
              }, children: t.content }) })
            ]
          },
          `type-${t.name}`
        )) })
      ] })
    ] })
  ] }) });
};
export {
  fe as GraphQLSchemaViewer,
  fe as default
};
