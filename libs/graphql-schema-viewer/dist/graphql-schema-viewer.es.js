import de, { useState as M, useMemo as ce } from "react";
var z = { exports: {} }, W = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var N, X;
function pe() {
  if (X) return N;
  X = 1;
  var x = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, m = Object.prototype.propertyIsEnumerable;
  function O(g) {
    if (g == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(g);
  }
  function a() {
    try {
      if (!Object.assign)
        return !1;
      var g = new String("abc");
      if (g[5] = "de", Object.getOwnPropertyNames(g)[0] === "5")
        return !1;
      for (var b = {}, s = 0; s < 10; s++)
        b["_" + String.fromCharCode(s)] = s;
      var l = Object.getOwnPropertyNames(b).map(function(i) {
        return b[i];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var d = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(i) {
        d[i] = i;
      }), Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return N = a() ? Object.assign : function(g, b) {
    for (var s, l = O(g), d, i = 1; i < arguments.length; i++) {
      s = Object(arguments[i]);
      for (var h in s)
        r.call(s, h) && (l[h] = s[h]);
      if (x) {
        d = x(s);
        for (var u = 0; u < d.length; u++)
          m.call(s, d[u]) && (l[d[u]] = s[d[u]]);
      }
    }
    return l;
  }, N;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Y;
function xe() {
  if (Y) return W;
  Y = 1, pe();
  var x = de, r = 60103;
  if (W.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var m = Symbol.for;
    r = m("react.element"), W.Fragment = m("react.fragment");
  }
  var O = x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = Object.prototype.hasOwnProperty, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function b(s, l, d) {
    var i, h = {}, u = null, w = null;
    d !== void 0 && (u = "" + d), l.key !== void 0 && (u = "" + l.key), l.ref !== void 0 && (w = l.ref);
    for (i in l) a.call(l, i) && !g.hasOwnProperty(i) && (h[i] = l[i]);
    if (s && s.defaultProps) for (i in l = s.defaultProps, l) h[i] === void 0 && (h[i] = l[i]);
    return { $$typeof: r, type: s, key: u, ref: w, props: h, _owner: O.current };
  }
  return W.jsx = b, W.jsxs = b, W;
}
var ee;
function he() {
  return ee || (ee = 1, z.exports = xe()), z.exports;
}
var e = he();
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
    gap: "12px",
    flexWrap: "wrap"
  },
  endpointCard: {
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
  endpointIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  endpointIconProduction: {
    backgroundColor: "#22863a"
  },
  endpointIconSandbox: {
    backgroundColor: "#d73a49"
  },
  endpointContent: {
    flex: 1,
    minWidth: 0
  },
  endpointLabel: {
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px"
  },
  endpointLabelProduction: {
    color: "#22863a"
  },
  endpointLabelSandbox: {
    color: "#d73a49"
  },
  endpointUrl: {
    fontSize: "14px",
    color: "#24292e",
    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
    wordBreak: "break-all",
    lineHeight: "1.4"
  },
  copyIcon: {
    flexShrink: 0,
    opacity: 0.5
  },
  copiedTooltip: {
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
  },
  tooltipArrow: {
    position: "absolute",
    bottom: "-4px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    borderTop: "4px solid #24292e"
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
}, ue = (x) => ({
  query: "#0066cc",
  mutation: "#d73a49",
  type: "#0066cc",
  interface: "#6f42c1",
  enum: "#22863a",
  scalar: "#6a737d",
  union: "#d73a49",
  input: "#005cc5"
})[x] || "#24292e", ye = (x) => ({
  query: "Q",
  mutation: "M",
  type: "T",
  interface: "I",
  enum: "E",
  scalar: "S",
  union: "U",
  input: "IN"
})[x] || "?", me = ({ schema: x, apiMetadata: r }) => {
  var A, F, Q, V;
  const [m, O] = M(/* @__PURE__ */ new Set()), [a, g] = M(/* @__PURE__ */ new Set()), [b, s] = M(null), { operations: l, types: d } = ce(() => {
    if (!x || typeof x != "string") return { operations: [], types: [] };
    const n = [], o = [], j = x.split(`
`), J = (k, v) => {
      const c = [];
      let S = !1, f = 0, C = "", R = [], q = !1;
      for (let U = 0; U < j.length; U++) {
        const E = j[U], p = E.trim();
        if (!p) {
          q || (C = "", R = []);
          continue;
        }
        if (p === `type ${k}` || p.startsWith(`type ${k} `) || p.startsWith(`type ${k}{`)) {
          S = !0, f = 0, C = "", R = [], q = !1, E.includes("{") && f++;
          continue;
        }
        if (S) {
          E.includes("{") && f++, E.includes("}") && f--;
          const _ = p.startsWith('"""') || p.startsWith("#");
          if (_ && f > 0) {
            q = !0;
            const L = p.replace(/^("""|#)/, "").replace(/"""$/, "").trim();
            L && R.push(L), p.endsWith('"""') && p.startsWith('"""') && p.length > 3 && (q = !1);
            continue;
          }
          if (q && !_ && f > 0 && (C = R.join(" ").trim(), q = !1), f > 0 && !_) {
            const L = p.match(/^\s*(\w+)\s*(\([^)]*\))?\s*:\s*(.+?)(\s*\{|\s*$)/);
            if (L) {
              const oe = L[1], K = L[2] || "";
              let $ = L[3].trim();
              $ = $.replace(/\s*\{.*$/, "").trim();
              const B = [];
              if (K) {
                const ie = K.replace(/[()]/g, ""), se = Array.from(ie.matchAll(/(\w+)\s*:\s*([^,]+)/g));
                for (const Z of se) {
                  const le = Z[1], G = Z[2].trim(), ae = G.includes("!");
                  B.push({
                    name: le,
                    type: G.replace(/!/g, "").trim(),
                    required: ae
                  });
                }
              }
              const re = C.trim() || void 0;
              c.push({
                name: oe,
                type: v,
                description: re,
                parameters: B.length > 0 ? B : void 0,
                returnType: $.replace(/[!,]/g, "").trim(),
                content: E.trim()
              }), C = "", R = [];
            } else
              C && !p.startsWith("#") && !p.startsWith('"""') && (C = "", R = []);
          }
          if (f === 0 && p.includes("}")) {
            S = !1;
            break;
          }
        }
      }
      return c;
    }, te = J("Query", "query");
    n.push(...te);
    const ne = J("Mutation", "mutation");
    n.push(...ne);
    let y = null, P = "", T = 0, H = !1, I = [];
    for (let k = 0; k < j.length; k++) {
      const v = j[k], c = v.trim();
      if (c) {
        if ((c.startsWith('"""') || c.startsWith("#")) && !H) {
          P += c.replace(/^("""|#)/, "").replace(/"""$/, "").trim() + " ";
          continue;
        }
        if (c.startsWith("type ") || c.startsWith("interface ") || c.startsWith("enum ") || c.startsWith("scalar ") || c.startsWith("union ") || c.startsWith("input ")) {
          const S = c.match(/^(type|interface|enum|scalar|union|input)\s+(\w+)/);
          if (S) {
            const f = S[2];
            if (f === "Query" || f === "Mutation" || f === "Subscription")
              continue;
            y && (y.content = I.join(`
`), o.push(y));
            const C = S[1];
            y = {
              name: f,
              kind: C,
              description: P.trim() || void 0,
              content: ""
            }, I = [v], P = "", H = !0, T = 0, v.includes("{") && T++, v.includes("}") && T--;
          }
        } else H && y ? (I.push(v), v.includes("{") && T++, v.includes("}") && T--, T === 0 && (v.includes("}") || y.kind === "scalar" || y.kind === "union") && (y.content = I.join(`
`), o.push(y), y = null, I = [], H = !1)) : P = "";
      }
    }
    return y && (y.content = I.join(`
`), o.push(y)), { operations: n, types: o };
  }, [x]), i = l.filter((n) => n.type === "query"), h = l.filter((n) => n.type === "mutation"), u = (n) => {
    const o = new Set(m);
    o.has(n) ? o.delete(n) : o.add(n), O(o);
  }, w = (n) => {
    const o = new Set(a);
    o.has(n) ? o.delete(n) : o.add(n), g(o);
  }, D = async (n, o) => {
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
        ((A = r == null ? void 0 : r.apiInfo) == null ? void 0 : A.apiName) || "GraphQL Schema Documentation",
        ((F = r == null ? void 0 : r.apiInfo) == null ? void 0 : F.apiVersion) && /* @__PURE__ */ e.jsx("span", { style: t.version, children: r.apiInfo.apiVersion })
      ] }),
      r && (((Q = r.endPoints) == null ? void 0 : Q.productionURL) || ((V = r.endPoints) == null ? void 0 : V.sandboxURL)) && /* @__PURE__ */ e.jsxs("div", { style: t.endpointsContainer, children: [
        r.endPoints.productionURL && /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: t.endpointCard,
            role: "button",
            tabIndex: 0,
            "aria-label": "Copy production endpoint URL to clipboard",
            onMouseEnter: (n) => {
              n.currentTarget.style.borderColor = "#22863a", n.currentTarget.style.boxShadow = "0 2px 8px rgba(34, 134, 58, 0.15)";
            },
            onMouseLeave: (n) => {
              n.currentTarget.style.borderColor = "#e1e4e8", n.currentTarget.style.boxShadow = "none";
            },
            onClick: () => {
              var n;
              return D("production", (n = r.endPoints) == null ? void 0 : n.productionURL);
            },
            onKeyDown: (n) => {
              var o;
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), D("production", (o = r.endPoints) == null ? void 0 : o.productionURL));
            },
            title: "Click to copy",
            children: [
              /* @__PURE__ */ e.jsx("div", { style: { ...t.endpointIcon, ...t.endpointIconProduction }, children: /* @__PURE__ */ e.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
                /* @__PURE__ */ e.jsx("path", { d: "M10 2L2 7L10 12L18 7L10 2Z", fill: "white" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 13L10 18L18 13", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 10L10 15L18 10", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
              ] }) }),
              /* @__PURE__ */ e.jsxs("div", { style: t.endpointContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...t.endpointLabel, ...t.endpointLabelProduction }, children: "Endpoint" }),
                /* @__PURE__ */ e.jsx("div", { style: t.endpointUrl, children: r.endPoints.productionURL })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", flexShrink: 0 }, children: [
                b === "production" && /* @__PURE__ */ e.jsxs("div", { style: t.copiedTooltip, children: [
                  "Copied!",
                  /* @__PURE__ */ e.jsx("div", { style: t.tooltipArrow })
                ] }),
                /* @__PURE__ */ e.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: t.copyIcon, children: [
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
            style: t.endpointCard,
            role: "button",
            tabIndex: 0,
            "aria-label": "Copy sandbox endpoint URL to clipboard",
            onMouseEnter: (n) => {
              n.currentTarget.style.borderColor = "#d73a49", n.currentTarget.style.boxShadow = "0 2px 8px rgba(215, 58, 73, 0.15)";
            },
            onMouseLeave: (n) => {
              n.currentTarget.style.borderColor = "#e1e4e8", n.currentTarget.style.boxShadow = "none";
            },
            onClick: () => {
              var n;
              return D("sandbox", (n = r.endPoints) == null ? void 0 : n.sandboxURL);
            },
            onKeyDown: (n) => {
              var o;
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), D("sandbox", (o = r.endPoints) == null ? void 0 : o.sandboxURL));
            },
            title: "Click to copy",
            children: [
              /* @__PURE__ */ e.jsx("div", { style: { ...t.endpointIcon, ...t.endpointIconSandbox }, children: /* @__PURE__ */ e.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
                /* @__PURE__ */ e.jsx("path", { d: "M10 2L2 7L10 12L18 7L10 2Z", fill: "white" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 13L10 18L18 13", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 10L10 15L18 10", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
              ] }) }),
              /* @__PURE__ */ e.jsxs("div", { style: t.endpointContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...t.endpointLabel, ...t.endpointLabelSandbox }, children: "Sandbox" }),
                /* @__PURE__ */ e.jsx("div", { style: t.endpointUrl, children: r.endPoints.sandboxURL })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", flexShrink: 0 }, children: [
                b === "sandbox" && /* @__PURE__ */ e.jsxs("div", { style: t.copiedTooltip, children: [
                  "Copied!",
                  /* @__PURE__ */ e.jsx("div", { style: t.tooltipArrow })
                ] }),
                /* @__PURE__ */ e.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: t.copyIcon, children: [
                  /* @__PURE__ */ e.jsx("path", { d: "M4 2H12C13.1 2 14 2.9 14 4V12C14 13.1 13.1 14 12 14H4C2.9 14 2 13.1 2 12V4C2 2.9 2.9 2 4 2Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
                  /* @__PURE__ */ e.jsx("path", { d: "M6 6H10M6 10H10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
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
            "aria-expanded": a.has("queries"),
            "aria-controls": "graphql-queries-content",
            onClick: () => w("queries"),
            onKeyDown: (n) => {
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), w("queries"));
            },
            style: {
              ...t.sectionHeader,
              borderBottom: a.has("queries") ? "1px solid #e1e4e8" : "none"
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
                transform: a.has("queries") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        a.has("queries") && /* @__PURE__ */ e.jsx(
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
                      onClick: () => u(`query-${n.name}`),
                      style: t.operationHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx("div", { style: t.operationName, children: n.name }) }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...t.operationToggle,
                          transform: m.has(`query-${n.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  m.has(`query-${n.name}`) && /* @__PURE__ */ e.jsxs("div", { style: t.operationDetails, children: [
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
            "aria-expanded": a.has("mutations"),
            "aria-controls": "graphql-mutations-content",
            onClick: () => w("mutations"),
            onKeyDown: (n) => {
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), w("mutations"));
            },
            style: {
              ...t.sectionHeader,
              borderBottom: a.has("mutations") ? "1px solid #e1e4e8" : "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: t.sectionHeaderContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...t.sectionIcon, backgroundColor: "#d73a49" }, children: "M" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: t.sectionTitle, children: "Mutations" }),
                  /* @__PURE__ */ e.jsxs("div", { style: t.sectionSubtitle, children: [
                    h.length,
                    " operation",
                    h.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                ...t.sectionToggle,
                transform: a.has("mutations") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        a.has("mutations") && /* @__PURE__ */ e.jsx(
          "div",
          {
            id: "graphql-mutations-content",
            style: t.sectionContent,
            children: h.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: t.emptyState, children: "No mutations found" }) : h.map((n) => /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: t.operationCard,
                onMouseEnter: (o) => o.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
                onMouseLeave: (o) => o.currentTarget.style.boxShadow = "none",
                children: [
                  /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      onClick: () => u(`mutation-${n.name}`),
                      style: t.operationHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx("div", { style: t.operationName, children: n.name }) }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...t.operationToggle,
                          transform: m.has(`mutation-${n.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  m.has(`mutation-${n.name}`) && /* @__PURE__ */ e.jsxs("div", { style: t.operationDetails, children: [
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
            "aria-expanded": a.has("types"),
            "aria-controls": "graphql-types-content",
            onClick: () => w("types"),
            onKeyDown: (n) => {
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), w("types"));
            },
            style: {
              ...t.sectionHeader,
              borderBottom: a.has("types") ? "1px solid #e1e4e8" : "none"
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
                transform: a.has("types") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        a.has("types") && /* @__PURE__ */ e.jsx(
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
                      onClick: () => u(`type-${n.name}`),
                      style: t.typeHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: {
                          ...t.typeIcon,
                          backgroundColor: ue(n.kind)
                        }, children: ye(n.kind) }),
                        /* @__PURE__ */ e.jsxs("div", { style: t.typeInfo, children: [
                          /* @__PURE__ */ e.jsx("div", { style: t.typeName, children: n.name }),
                          n.description && /* @__PURE__ */ e.jsx("div", { style: t.typeDescription, children: n.description }),
                          /* @__PURE__ */ e.jsx("span", { style: t.typeBadge, children: n.kind })
                        ] }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...t.operationToggle,
                          transform: m.has(`type-${n.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  m.has(`type-${n.name}`) && /* @__PURE__ */ e.jsx("div", { style: t.operationDetails, children: /* @__PURE__ */ e.jsx("pre", { style: t.schemaCode, children: n.content }) })
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
  me as GraphQLSchemaViewer,
  me as default
};
