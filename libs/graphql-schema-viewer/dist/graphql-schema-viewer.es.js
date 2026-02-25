import de, { useState as H, useMemo as ce } from "react";
var N = { exports: {} }, W = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var F, X;
function pe() {
  if (X) return F;
  X = 1;
  var x = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, g = Object.prototype.propertyIsEnumerable;
  function O(m) {
    if (m == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(m);
  }
  function l() {
    try {
      if (!Object.assign)
        return !1;
      var m = new String("abc");
      if (m[5] = "de", Object.getOwnPropertyNames(m)[0] === "5")
        return !1;
      for (var b = {}, s = 0; s < 10; s++)
        b["_" + String.fromCharCode(s)] = s;
      var a = Object.getOwnPropertyNames(b).map(function(i) {
        return b[i];
      });
      if (a.join("") !== "0123456789")
        return !1;
      var d = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(i) {
        d[i] = i;
      }), Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return F = l() ? Object.assign : function(m, b) {
    for (var s, a = O(m), d, i = 1; i < arguments.length; i++) {
      s = Object(arguments[i]);
      for (var u in s)
        r.call(s, u) && (a[u] = s[u]);
      if (x) {
        d = x(s);
        for (var h = 0; h < d.length; h++)
          g.call(s, d[h]) && (a[d[h]] = s[d[h]]);
      }
    }
    return a;
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
var Z;
function xe() {
  if (Z) return W;
  Z = 1, pe();
  var x = de, r = 60103;
  if (W.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var g = Symbol.for;
    r = g("react.element"), W.Fragment = g("react.fragment");
  }
  var O = x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = Object.prototype.hasOwnProperty, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function b(s, a, d) {
    var i, u = {}, h = null, S = null;
    d !== void 0 && (h = "" + d), a.key !== void 0 && (h = "" + a.key), a.ref !== void 0 && (S = a.ref);
    for (i in a) l.call(a, i) && !m.hasOwnProperty(i) && (u[i] = a[i]);
    if (s && s.defaultProps) for (i in a = s.defaultProps, a) u[i] === void 0 && (u[i] = a[i]);
    return { $$typeof: r, type: s, key: h, ref: S, props: u, _owner: O.current };
  }
  return W.jsx = b, W.jsxs = b, W;
}
var ee;
function ue() {
  return ee || (ee = 1, N.exports = xe()), N.exports;
}
var e = ue();
const t = {
  container: {
    padding: "24px",
    backgroundColor: "#f6f8fa",
    minHeight: "100vh",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
  },
  contentWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    overflow: "hidden"
  },
  header: {
    padding: "24px",
    borderBottom: "1px solid #e1e4e8",
    backgroundColor: "#fafbfc"
  },
  title: {
    margin: "0 0 20px 0",
    color: "#24292e",
    fontSize: "24px",
    fontWeight: 600
  },
  version: {
    fontSize: "18px",
    fontWeight: 400,
    color: "#6a737d",
    marginLeft: "12px"
  },
  endpointsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  endpointCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px 16px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    border: "1px solid #e6e8eb",
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
    cursor: "pointer",
    position: "relative",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
  },
  endpointBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  endpointBadgeProduction: {
    backgroundColor: "#ddf4e4",
    color: "#1a7f37"
  },
  endpointBadgeSandbox: {
    backgroundColor: "#fff3e0",
    color: "#e65c00"
  },
  endpointDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    flexShrink: 0
  },
  endpointDotProduction: {
    backgroundColor: "#1a7f37"
  },
  endpointDotSandbox: {
    backgroundColor: "#e65c00"
  },
  endpointUrl: {
    flex: 1,
    minWidth: 0,
    fontSize: "13px",
    color: "#1f2328",
    fontFamily: "'SF Mono', 'Monaco', 'Menlo', 'Courier New', monospace",
    wordBreak: "break-all",
    lineHeight: "1.5"
  },
  copyIcon: {
    flexShrink: 0,
    color: "#8c959f",
    transition: "color 0.15s ease"
  },
  copiedTooltip: {
    position: "absolute",
    top: "-36px",
    right: 0,
    padding: "5px 10px",
    backgroundColor: "#1f2328",
    color: "white",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 600,
    whiteSpace: "nowrap",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    zIndex: 1e3,
    pointerEvents: "none",
    letterSpacing: "0.3px"
  },
  tooltipArrow: {
    position: "absolute",
    bottom: "-4px",
    right: "10px",
    width: 0,
    height: 0,
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    borderTop: "4px solid #1f2328"
  },
  content: {
    padding: "16px"
  },
  section: {
    marginBottom: "24px",
    border: "1px solid #e1e4e8",
    borderRadius: "6px",
    overflow: "hidden"
  },
  sectionHeader: {
    padding: "16px",
    backgroundColor: "#fafbfc",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    userSelect: "none"
  },
  sectionHeaderContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  sectionIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "bold"
  },
  sectionTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#24292e"
  },
  sectionSubtitle: {
    fontSize: "13px",
    color: "#6a737d",
    marginTop: "4px"
  },
  sectionToggle: {
    fontSize: "20px",
    color: "#6a737d",
    transition: "transform 0.2s"
  },
  sectionContent: {
    padding: "16px"
  },
  emptyState: {
    padding: "20px",
    textAlign: "center",
    color: "#6a737d"
  },
  operationCard: {
    marginBottom: "12px",
    border: "1px solid #e1e4e8",
    borderRadius: "6px",
    overflow: "hidden"
  },
  operationHeader: {
    padding: "12px 16px",
    backgroundColor: "#fafbfc",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    userSelect: "none"
  },
  operationName: {
    fontWeight: 600,
    color: "#24292e",
    fontSize: "16px"
  },
  operationToggle: {
    fontSize: "18px",
    color: "#6a737d",
    transition: "transform 0.2s"
  },
  operationDetails: {
    padding: "16px",
    backgroundColor: "white",
    borderTop: "1px solid #e1e4e8"
  },
  parametersTitle: {
    margin: "0 0 8px 0",
    fontSize: "14px",
    fontWeight: 600,
    color: "#24292e"
  },
  parametersList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  parameterItem: {
    padding: "8px 12px",
    backgroundColor: "#f6f8fa",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  parameterName: {
    fontWeight: 600,
    color: "#24292e",
    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
  },
  parameterType: {
    color: "#005cc5",
    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
  },
  parameterRequired: {
    color: "#d73a49",
    fontSize: "12px"
  },
  schemaTitle: {
    margin: "0 0 8px 0",
    fontSize: "14px",
    fontWeight: 600,
    color: "#24292e"
  },
  schemaCode: {
    margin: 0,
    padding: "12px",
    backgroundColor: "#f6f8fa",
    borderRadius: "6px",
    fontSize: "13px",
    lineHeight: "1.6",
    overflow: "auto",
    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
    color: "#24292e"
  },
  typeCard: {
    marginBottom: "12px",
    border: "1px solid #e1e4e8",
    borderRadius: "6px",
    overflow: "hidden"
  },
  typeHeader: {
    padding: "12px 16px",
    backgroundColor: "#fafbfc",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    userSelect: "none"
  },
  typeIcon: {
    width: "24px",
    height: "24px",
    borderRadius: "4px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "bold"
  },
  typeInfo: {
    flex: 1
  },
  typeName: {
    fontWeight: 600,
    color: "#24292e",
    fontSize: "16px",
    marginBottom: "4px"
  },
  typeDescription: {
    fontSize: "13px",
    color: "#6a737d",
    marginBottom: "4px"
  },
  typeBadge: {
    fontSize: "12px",
    color: "#6a737d",
    padding: "2px 8px",
    backgroundColor: "white",
    borderRadius: "12px",
    border: "1px solid #e1e4e8"
  }
}, he = (x) => ({
  query: "#0066cc",
  mutation: "#d73a49",
  type: "#0066cc",
  interface: "#6f42c1",
  enum: "#22863a",
  scalar: "#6a737d",
  union: "#d73a49",
  input: "#005cc5"
})[x] || "#24292e", fe = (x) => ({
  query: "Q",
  mutation: "M",
  type: "T",
  interface: "I",
  enum: "E",
  scalar: "S",
  union: "U",
  input: "IN"
})[x] || "?", ge = ({ schema: x, apiMetadata: r }) => {
  var M, A, Q, J;
  const [g, O] = H(/* @__PURE__ */ new Set()), [l, m] = H(/* @__PURE__ */ new Set()), [b, s] = H(null), { operations: a, types: d } = ce(() => {
    if (!x || typeof x != "string") return { operations: [], types: [] };
    const n = [], o = [], j = x.split(`
`), K = (C, v) => {
      const c = [];
      let k = !1, y = 0, w = "", I = [], L = !1;
      for (let U = 0; U < j.length; U++) {
        const D = j[U], p = D.trim();
        if (!p) {
          L || (w = "", I = []);
          continue;
        }
        if (p === `type ${C}` || p.startsWith(`type ${C} `) || p.startsWith(`type ${C}{`)) {
          k = !0, y = 0, w = "", I = [], L = !1, D.includes("{") && y++;
          continue;
        }
        if (k) {
          D.includes("{") && y++, D.includes("}") && y--;
          const _ = p.startsWith('"""') || p.startsWith("#");
          if (_ && y > 0) {
            L = !0;
            const T = p.replace(/^("""|#)/, "").replace(/"""$/, "").trim();
            T && I.push(T), p.endsWith('"""') && p.startsWith('"""') && p.length > 3 && (L = !1);
            continue;
          }
          if (L && !_ && y > 0 && (w = I.join(" ").trim(), L = !1), y > 0 && !_) {
            const T = p.match(/^\s*(\w+)\s*(\([^)]*\))?\s*:\s*(.+?)(\s*\{|\s*$)/);
            if (T) {
              const oe = T[1], V = T[2] || "";
              let $ = T[3].trim();
              $ = $.replace(/\s*\{.*$/, "").trim();
              const z = [];
              if (V) {
                const ie = V.replace(/[()]/g, ""), se = Array.from(ie.matchAll(/(\w+)\s*:\s*([^,]+)/g));
                for (const G of se) {
                  const ae = G[1], Y = G[2].trim(), le = Y.includes("!");
                  z.push({
                    name: ae,
                    type: Y.replace(/!/g, "").trim(),
                    required: le
                  });
                }
              }
              const re = w.trim() || void 0;
              c.push({
                name: oe,
                type: v,
                description: re,
                parameters: z.length > 0 ? z : void 0,
                returnType: $.replace(/[!,]/g, "").trim(),
                content: D.trim()
              }), w = "", I = [];
            } else
              w && !p.startsWith("#") && !p.startsWith('"""') && (w = "", I = []);
          }
          if (y === 0 && p.includes("}")) {
            k = !1;
            break;
          }
        }
      }
      return c;
    }, te = K("Query", "query");
    n.push(...te);
    const ne = K("Mutation", "mutation");
    n.push(...ne);
    let f = null, P = "", R = 0, B = !1, q = [];
    for (let C = 0; C < j.length; C++) {
      const v = j[C], c = v.trim();
      if (c) {
        if ((c.startsWith('"""') || c.startsWith("#")) && !B) {
          P += c.replace(/^("""|#)/, "").replace(/"""$/, "").trim() + " ";
          continue;
        }
        if (c.startsWith("type ") || c.startsWith("interface ") || c.startsWith("enum ") || c.startsWith("scalar ") || c.startsWith("union ") || c.startsWith("input ")) {
          const k = c.match(/^(type|interface|enum|scalar|union|input)\s+(\w+)/);
          if (k) {
            const y = k[2];
            if (y === "Query" || y === "Mutation" || y === "Subscription")
              continue;
            f && (f.content = q.join(`
`), o.push(f));
            const w = k[1];
            f = {
              name: y,
              kind: w,
              description: P.trim() || void 0,
              content: ""
            }, q = [v], P = "", B = !0, R = 0, v.includes("{") && R++, v.includes("}") && R--;
          }
        } else B && f ? (q.push(v), v.includes("{") && R++, v.includes("}") && R--, R === 0 && (v.includes("}") || f.kind === "scalar" || f.kind === "union") && (f.content = q.join(`
`), o.push(f), f = null, q = [], B = !1)) : P = "";
      }
    }
    return f && (f.content = q.join(`
`), o.push(f)), { operations: n, types: o };
  }, [x]), i = a.filter((n) => n.type === "query"), u = a.filter((n) => n.type === "mutation"), h = (n) => {
    const o = new Set(g);
    o.has(n) ? o.delete(n) : o.add(n), O(o);
  }, S = (n) => {
    const o = new Set(l);
    o.has(n) ? o.delete(n) : o.add(n), m(o);
  }, E = async (n, o) => {
    if (o)
      try {
        await navigator.clipboard.writeText(o), s(n), setTimeout(() => s(null), 2e3);
      } catch (j) {
        console.error("Failed to copy endpoint URL:", j);
      }
  };
  return /* @__PURE__ */ e.jsx("div", { style: t.container, children: /* @__PURE__ */ e.jsxs("div", { style: t.contentWrapper, children: [
    /* @__PURE__ */ e.jsxs("div", { style: t.header, children: [
      /* @__PURE__ */ e.jsxs("h2", { style: t.title, children: [
        ((M = r == null ? void 0 : r.apiInfo) == null ? void 0 : M.apiName) || "GraphQL Schema Documentation",
        ((A = r == null ? void 0 : r.apiInfo) == null ? void 0 : A.apiVersion) && /* @__PURE__ */ e.jsx("span", { style: t.version, children: r.apiInfo.apiVersion })
      ] }),
      r && (((Q = r.endPoints) == null ? void 0 : Q.productionURL) || ((J = r.endPoints) == null ? void 0 : J.sandboxURL)) && /* @__PURE__ */ e.jsxs("div", { style: t.endpointsContainer, children: [
        r.endPoints.productionURL && /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: t.endpointCard,
            role: "button",
            tabIndex: 0,
            "aria-label": "Copy production endpoint URL to clipboard",
            onMouseEnter: (n) => {
              n.currentTarget.style.borderColor = "#1a7f37", n.currentTarget.style.boxShadow = "0 2px 10px rgba(26, 127, 55, 0.12)";
            },
            onMouseLeave: (n) => {
              n.currentTarget.style.borderColor = "#e6e8eb", n.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
            },
            onClick: () => {
              var n;
              return E("production", (n = r.endPoints) == null ? void 0 : n.productionURL);
            },
            onKeyDown: (n) => {
              var o;
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), E("production", (o = r.endPoints) == null ? void 0 : o.productionURL));
            },
            children: [
              /* @__PURE__ */ e.jsxs("span", { style: { ...t.endpointBadge, ...t.endpointBadgeProduction }, children: [
                /* @__PURE__ */ e.jsx("span", { style: { ...t.endpointDot, ...t.endpointDotProduction } }),
                "Production"
              ] }),
              /* @__PURE__ */ e.jsx("div", { style: t.endpointUrl, children: r.endPoints.productionURL }),
              /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", flexShrink: 0 }, children: [
                b === "production" && /* @__PURE__ */ e.jsxs("div", { style: t.copiedTooltip, children: [
                  "Copied!",
                  /* @__PURE__ */ e.jsx("div", { style: t.tooltipArrow })
                ] }),
                /* @__PURE__ */ e.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: t.copyIcon, children: [
                  /* @__PURE__ */ e.jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                  /* @__PURE__ */ e.jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
                ] })
              ] })
            ]
          }
        ),
        r.endPoints.sandboxURL && /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: t.endpointCard,
            role: "button",
            tabIndex: 0,
            "aria-label": "Copy sandbox endpoint URL to clipboard",
            onMouseEnter: (n) => {
              n.currentTarget.style.borderColor = "#e65c00", n.currentTarget.style.boxShadow = "0 2px 10px rgba(230, 92, 0, 0.12)";
            },
            onMouseLeave: (n) => {
              n.currentTarget.style.borderColor = "#e6e8eb", n.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
            },
            onClick: () => {
              var n;
              return E("sandbox", (n = r.endPoints) == null ? void 0 : n.sandboxURL);
            },
            onKeyDown: (n) => {
              var o;
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), E("sandbox", (o = r.endPoints) == null ? void 0 : o.sandboxURL));
            },
            children: [
              /* @__PURE__ */ e.jsxs("span", { style: { ...t.endpointBadge, ...t.endpointBadgeSandbox }, children: [
                /* @__PURE__ */ e.jsx("span", { style: { ...t.endpointDot, ...t.endpointDotSandbox } }),
                "Sandbox"
              ] }),
              /* @__PURE__ */ e.jsx("div", { style: t.endpointUrl, children: r.endPoints.sandboxURL }),
              /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", flexShrink: 0 }, children: [
                b === "sandbox" && /* @__PURE__ */ e.jsxs("div", { style: t.copiedTooltip, children: [
                  "Copied!",
                  /* @__PURE__ */ e.jsx("div", { style: t.tooltipArrow })
                ] }),
                /* @__PURE__ */ e.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: t.copyIcon, children: [
                  /* @__PURE__ */ e.jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                  /* @__PURE__ */ e.jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { style: t.content, children: [
      /* @__PURE__ */ e.jsxs("div", { style: t.section, children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            role: "button",
            tabIndex: 0,
            "aria-expanded": l.has("queries"),
            "aria-controls": "graphql-queries-content",
            onClick: () => S("queries"),
            onKeyDown: (n) => {
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), S("queries"));
            },
            style: {
              ...t.sectionHeader,
              borderBottom: l.has("queries") ? "1px solid #e1e4e8" : "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: t.sectionHeaderContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...t.sectionIcon, backgroundColor: "#0066cc" }, children: "Q" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: t.sectionTitle, children: "Queries" }),
                  /* @__PURE__ */ e.jsxs("div", { style: t.sectionSubtitle, children: [
                    i.length,
                    " operation",
                    i.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                ...t.sectionToggle,
                transform: l.has("queries") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        l.has("queries") && /* @__PURE__ */ e.jsx(
          "div",
          {
            id: "graphql-queries-content",
            style: t.sectionContent,
            children: i.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: t.emptyState, children: "No queries found" }) : i.map((n) => /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: t.operationCard,
                onMouseEnter: (o) => o.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
                onMouseLeave: (o) => o.currentTarget.style.boxShadow = "none",
                children: [
                  /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      onClick: () => h(`query-${n.name}`),
                      style: t.operationHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx("div", { style: t.operationName, children: n.name }) }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...t.operationToggle,
                          transform: g.has(`query-${n.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  g.has(`query-${n.name}`) && /* @__PURE__ */ e.jsxs("div", { style: t.operationDetails, children: [
                    n.parameters && n.parameters.length > 0 && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "16px" }, children: [
                      /* @__PURE__ */ e.jsx("h4", { style: t.parametersTitle, children: "Parameters" }),
                      /* @__PURE__ */ e.jsx("div", { style: t.parametersList, children: n.parameters.map((o, j) => /* @__PURE__ */ e.jsxs("div", { style: t.parameterItem, children: [
                        /* @__PURE__ */ e.jsx("span", { style: t.parameterName, children: o.name }),
                        /* @__PURE__ */ e.jsx("span", { style: { color: "#6a737d" }, children: ":" }),
                        /* @__PURE__ */ e.jsx("span", { style: t.parameterType, children: o.type }),
                        o.required && /* @__PURE__ */ e.jsx("span", { style: t.parameterRequired, children: "(required)" })
                      ] }, j)) })
                    ] }),
                    /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("h4", { style: t.schemaTitle, children: "Schema Definition" }),
                      /* @__PURE__ */ e.jsx("pre", { style: t.schemaCode, children: n.content })
                    ] })
                  ] })
                ]
              },
              `query-${n.name}`
            ))
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("div", { style: t.section, children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            role: "button",
            tabIndex: 0,
            "aria-expanded": l.has("mutations"),
            "aria-controls": "graphql-mutations-content",
            onClick: () => S("mutations"),
            onKeyDown: (n) => {
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), S("mutations"));
            },
            style: {
              ...t.sectionHeader,
              borderBottom: l.has("mutations") ? "1px solid #e1e4e8" : "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: t.sectionHeaderContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...t.sectionIcon, backgroundColor: "#d73a49" }, children: "M" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: t.sectionTitle, children: "Mutations" }),
                  /* @__PURE__ */ e.jsxs("div", { style: t.sectionSubtitle, children: [
                    u.length,
                    " operation",
                    u.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                ...t.sectionToggle,
                transform: l.has("mutations") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        l.has("mutations") && /* @__PURE__ */ e.jsx(
          "div",
          {
            id: "graphql-mutations-content",
            style: t.sectionContent,
            children: u.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: t.emptyState, children: "No mutations found" }) : u.map((n) => /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: t.operationCard,
                onMouseEnter: (o) => o.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
                onMouseLeave: (o) => o.currentTarget.style.boxShadow = "none",
                children: [
                  /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      onClick: () => h(`mutation-${n.name}`),
                      style: t.operationHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx("div", { style: t.operationName, children: n.name }) }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...t.operationToggle,
                          transform: g.has(`mutation-${n.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  g.has(`mutation-${n.name}`) && /* @__PURE__ */ e.jsxs("div", { style: t.operationDetails, children: [
                    n.parameters && n.parameters.length > 0 && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "16px" }, children: [
                      /* @__PURE__ */ e.jsx("h4", { style: t.parametersTitle, children: "Parameters" }),
                      /* @__PURE__ */ e.jsx("div", { style: t.parametersList, children: n.parameters.map((o, j) => /* @__PURE__ */ e.jsxs("div", { style: t.parameterItem, children: [
                        /* @__PURE__ */ e.jsx("span", { style: t.parameterName, children: o.name }),
                        /* @__PURE__ */ e.jsx("span", { style: { color: "#6a737d" }, children: ":" }),
                        /* @__PURE__ */ e.jsx("span", { style: t.parameterType, children: o.type }),
                        o.required && /* @__PURE__ */ e.jsx("span", { style: t.parameterRequired, children: "(required)" })
                      ] }, j)) })
                    ] }),
                    /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("h4", { style: t.schemaTitle, children: "Schema Definition" }),
                      /* @__PURE__ */ e.jsx("pre", { style: t.schemaCode, children: n.content })
                    ] })
                  ] })
                ]
              },
              `mutation-${n.name}`
            ))
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("div", { style: t.section, children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            role: "button",
            tabIndex: 0,
            "aria-expanded": l.has("types"),
            "aria-controls": "graphql-types-content",
            onClick: () => S("types"),
            onKeyDown: (n) => {
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), S("types"));
            },
            style: {
              ...t.sectionHeader,
              borderBottom: l.has("types") ? "1px solid #e1e4e8" : "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: t.sectionHeaderContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...t.sectionIcon, backgroundColor: "#6a737d" }, children: "T" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: t.sectionTitle, children: "Types" }),
                  /* @__PURE__ */ e.jsxs("div", { style: t.sectionSubtitle, children: [
                    d.length,
                    " type",
                    d.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                ...t.sectionToggle,
                transform: l.has("types") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        l.has("types") && /* @__PURE__ */ e.jsx(
          "div",
          {
            id: "graphql-types-content",
            style: t.sectionContent,
            children: d.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: t.emptyState, children: "No types found" }) : d.map((n) => /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: t.typeCard,
                onMouseEnter: (o) => o.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
                onMouseLeave: (o) => o.currentTarget.style.boxShadow = "none",
                children: [
                  /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      onClick: () => h(`type-${n.name}`),
                      style: t.typeHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: {
                          ...t.typeIcon,
                          backgroundColor: he(n.kind)
                        }, children: fe(n.kind) }),
                        /* @__PURE__ */ e.jsxs("div", { style: t.typeInfo, children: [
                          /* @__PURE__ */ e.jsx("div", { style: t.typeName, children: n.name }),
                          n.description && /* @__PURE__ */ e.jsx("div", { style: t.typeDescription, children: n.description }),
                          /* @__PURE__ */ e.jsx("span", { style: t.typeBadge, children: n.kind })
                        ] }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...t.operationToggle,
                          transform: g.has(`type-${n.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  g.has(`type-${n.name}`) && /* @__PURE__ */ e.jsx("div", { style: t.operationDetails, children: /* @__PURE__ */ e.jsx("pre", { style: t.schemaCode, children: n.content }) })
                ]
              },
              `type-${n.name}`
            ))
          }
        )
      ] })
    ] })
  ] }) });
};
export {
  ge as GraphQLSchemaViewer,
  ge as default
};
