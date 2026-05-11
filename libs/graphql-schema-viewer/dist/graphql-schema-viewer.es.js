import ce, { useState as z, useMemo as pe } from "react";
var N = { exports: {} }, W = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var A, Y;
function he() {
  if (Y) return A;
  Y = 1;
  var h = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, m = Object.prototype.propertyIsEnumerable;
  function O(g) {
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
      for (var j = {}, s = 0; s < 10; s++)
        j["_" + String.fromCharCode(s)] = s;
      var l = Object.getOwnPropertyNames(j).map(function(i) {
        return j[i];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var a = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(i) {
        a[i] = i;
      }), Object.keys(Object.assign({}, a)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return A = d() ? Object.assign : function(g, j) {
    for (var s, l = O(g), a, i = 1; i < arguments.length; i++) {
      s = Object(arguments[i]);
      for (var x in s)
        r.call(s, x) && (l[x] = s[x]);
      if (h) {
        a = h(s);
        for (var u = 0; u < a.length; u++)
          m.call(s, a[u]) && (l[a[u]] = s[a[u]]);
      }
    }
    return l;
  }, A;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ee;
function xe() {
  if (ee) return W;
  ee = 1, he();
  var h = ce, r = 60103;
  if (W.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var m = Symbol.for;
    r = m("react.element"), W.Fragment = m("react.fragment");
  }
  var O = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = Object.prototype.hasOwnProperty, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function j(s, l, a) {
    var i, x = {}, u = null, w = null;
    a !== void 0 && (u = "" + a), l.key !== void 0 && (u = "" + l.key), l.ref !== void 0 && (w = l.ref);
    for (i in l) d.call(l, i) && !g.hasOwnProperty(i) && (x[i] = l[i]);
    if (s && s.defaultProps) for (i in l = s.defaultProps, l) x[i] === void 0 && (x[i] = l[i]);
    return { $$typeof: r, type: s, key: u, ref: w, props: x, _owner: O.current };
  }
  return W.jsx = j, W.jsxs = j, W;
}
var te;
function ue() {
  return te || (te = 1, N.exports = xe()), N.exports;
}
var e = ue();
const n = {
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
    gap: "8px"
  },
  endpointCard: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    backgroundColor: "white",
    borderRadius: "6px",
    border: "1px solid #e1e4e8",
    transition: "all 0.2s",
    cursor: "pointer",
    position: "relative"
  },
  endpointIcon: {
    width: "28px",
    height: "28px",
    borderRadius: "6px",
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
    fontSize: "13px",
    color: "#24292e",
    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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
}, ye = (h) => ({
  query: "#0066cc",
  mutation: "#d73a49",
  type: "#0066cc",
  interface: "#6f42c1",
  enum: "#22863a",
  scalar: "#6a737d",
  union: "#d73a49",
  input: "#005cc5"
})[h] || "#24292e", fe = (h) => ({
  query: "Q",
  mutation: "M",
  type: "T",
  interface: "I",
  enum: "E",
  scalar: "S",
  union: "U",
  input: "IN"
})[h] || "?", ge = ({ schema: h, apiMetadata: r }) => {
  var Q, V, J, K;
  const [m, O] = z(/* @__PURE__ */ new Set()), [d, g] = z(/* @__PURE__ */ new Set()), [j, s] = z(null), { operations: l, types: a } = pe(() => {
    if (!h || typeof h != "string") return { operations: [], types: [] };
    const t = [], o = [], b = h.split(`
`), P = (k, v) => {
      const c = [];
      let S = !1, f = 0, C = "", R = [], q = !1;
      for (let $ = 0; $ < b.length; $++) {
        const E = b[$], p = E.trim();
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
              const re = L[1], Z = L[2] || "";
              let M = L[3].trim();
              M = M.replace(/\s*\{.*$/, "").trim();
              const B = [];
              if (Z) {
                const se = Z.replace(/[()]/g, ""), le = Array.from(se.matchAll(/(\w+)\s*:\s*([^,]+)/g));
                for (const G of le) {
                  const de = G[1], X = G[2].trim(), ae = X.includes("!");
                  B.push({
                    name: de,
                    type: X.replace(/!/g, "").trim(),
                    required: ae
                  });
                }
              }
              const ie = C.trim() || void 0;
              c.push({
                name: re,
                type: v,
                description: ie,
                parameters: B.length > 0 ? B : void 0,
                returnType: M.replace(/[!,]/g, "").trim(),
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
    }, ne = P("Query", "query");
    t.push(...ne);
    const oe = P("Mutation", "mutation");
    t.push(...oe);
    let y = null, U = "", T = 0, H = !1, I = [];
    for (let k = 0; k < b.length; k++) {
      const v = b[k], c = v.trim();
      if (c) {
        if ((c.startsWith('"""') || c.startsWith("#")) && !H) {
          U += c.replace(/^("""|#)/, "").replace(/"""$/, "").trim() + " ";
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
              description: U.trim() || void 0,
              content: ""
            }, I = [v], U = "", H = !0, T = 0, v.includes("{") && T++, v.includes("}") && T--;
          }
        } else H && y ? (I.push(v), v.includes("{") && T++, v.includes("}") && T--, T === 0 && (v.includes("}") || y.kind === "scalar" || y.kind === "union") && (y.content = I.join(`
`), o.push(y), y = null, I = [], H = !1)) : U = "";
      }
    }
    return y && (y.content = I.join(`
`), o.push(y)), { operations: t, types: o };
  }, [h]), i = l.filter((t) => t.type === "query"), x = l.filter((t) => t.type === "mutation"), u = (t) => {
    const o = new Set(m);
    o.has(t) ? o.delete(t) : o.add(t), O(o);
  }, w = (t) => {
    const o = new Set(d);
    o.has(t) ? o.delete(t) : o.add(t), g(o);
  }, F = (t, o = 95) => {
    if (!t || t.length <= o) return t;
    const b = t.slice(0, Math.floor(o * 0.6)), P = t.slice(-Math.floor(o * 0.3));
    return `${b}...${P}`;
  }, D = async (t, o) => {
    if (o)
      try {
        await navigator.clipboard.writeText(o), s(t), setTimeout(() => s(null), 2e3);
      } catch (b) {
        console.error("Failed to copy endpoint URL:", b);
      }
  };
  return /* @__PURE__ */ e.jsx("div", { style: n.container, children: /* @__PURE__ */ e.jsxs("div", { style: n.contentWrapper, children: [
    /* @__PURE__ */ e.jsxs("div", { style: n.header, children: [
      /* @__PURE__ */ e.jsxs("h2", { style: n.title, children: [
        ((Q = r == null ? void 0 : r.apiInfo) == null ? void 0 : Q.apiName) || "GraphQL Schema Documentation",
        ((V = r == null ? void 0 : r.apiInfo) == null ? void 0 : V.apiVersion) && /* @__PURE__ */ e.jsx("span", { style: n.version, children: r.apiInfo.apiVersion })
      ] }),
      r && (((J = r.endPoints) == null ? void 0 : J.productionURL) || ((K = r.endPoints) == null ? void 0 : K.sandboxURL)) && /* @__PURE__ */ e.jsxs("div", { style: n.endpointsContainer, children: [
        r.endPoints.productionURL && /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: n.endpointCard,
            role: "button",
            tabIndex: 0,
            "aria-label": "Copy production endpoint URL to clipboard",
            onMouseEnter: (t) => {
              t.currentTarget.style.borderColor = "#22863a", t.currentTarget.style.boxShadow = "0 2px 8px rgba(34, 134, 58, 0.15)";
            },
            onMouseLeave: (t) => {
              t.currentTarget.style.borderColor = "#e1e4e8", t.currentTarget.style.boxShadow = "none";
            },
            onClick: () => {
              var t;
              return D("production", (t = r.endPoints) == null ? void 0 : t.productionURL);
            },
            onKeyDown: (t) => {
              var o;
              (t.key === "Enter" || t.key === " ") && (t.preventDefault(), D("production", (o = r.endPoints) == null ? void 0 : o.productionURL));
            },
            title: "Click to copy",
            children: [
              /* @__PURE__ */ e.jsx("div", { style: { ...n.endpointIcon, ...n.endpointIconProduction }, children: /* @__PURE__ */ e.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
                /* @__PURE__ */ e.jsx("path", { d: "M10 2L2 7L10 12L18 7L10 2Z", fill: "white" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 13L10 18L18 13", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 10L10 15L18 10", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
              ] }) }),
              /* @__PURE__ */ e.jsxs("div", { style: n.endpointContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...n.endpointLabel, ...n.endpointLabelProduction }, children: "Endpoint" }),
                /* @__PURE__ */ e.jsx("div", { style: n.endpointUrl, title: r.endPoints.productionURL, children: F(r.endPoints.productionURL) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", flexShrink: 0 }, children: [
                j === "production" && /* @__PURE__ */ e.jsxs("div", { style: n.copiedTooltip, children: [
                  "Copied!",
                  /* @__PURE__ */ e.jsx("div", { style: n.tooltipArrow })
                ] }),
                /* @__PURE__ */ e.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: n.copyIcon, children: [
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
            style: n.endpointCard,
            role: "button",
            tabIndex: 0,
            "aria-label": "Copy sandbox endpoint URL to clipboard",
            onMouseEnter: (t) => {
              t.currentTarget.style.borderColor = "#d73a49", t.currentTarget.style.boxShadow = "0 2px 8px rgba(215, 58, 73, 0.15)";
            },
            onMouseLeave: (t) => {
              t.currentTarget.style.borderColor = "#e1e4e8", t.currentTarget.style.boxShadow = "none";
            },
            onClick: () => {
              var t;
              return D("sandbox", (t = r.endPoints) == null ? void 0 : t.sandboxURL);
            },
            onKeyDown: (t) => {
              var o;
              (t.key === "Enter" || t.key === " ") && (t.preventDefault(), D("sandbox", (o = r.endPoints) == null ? void 0 : o.sandboxURL));
            },
            title: "Click to copy",
            children: [
              /* @__PURE__ */ e.jsx("div", { style: { ...n.endpointIcon, ...n.endpointIconSandbox }, children: /* @__PURE__ */ e.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
                /* @__PURE__ */ e.jsx("path", { d: "M10 2L2 7L10 12L18 7L10 2Z", fill: "white" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 13L10 18L18 13", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                /* @__PURE__ */ e.jsx("path", { d: "M2 10L10 15L18 10", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
              ] }) }),
              /* @__PURE__ */ e.jsxs("div", { style: n.endpointContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...n.endpointLabel, ...n.endpointLabelSandbox }, children: "Sandbox" }),
                /* @__PURE__ */ e.jsx("div", { style: n.endpointUrl, title: r.endPoints.sandboxURL, children: F(r.endPoints.sandboxURL) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", flexShrink: 0 }, children: [
                j === "sandbox" && /* @__PURE__ */ e.jsxs("div", { style: n.copiedTooltip, children: [
                  "Copied!",
                  /* @__PURE__ */ e.jsx("div", { style: n.tooltipArrow })
                ] }),
                /* @__PURE__ */ e.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: n.copyIcon, children: [
                  /* @__PURE__ */ e.jsx("path", { d: "M4 2H12C13.1 2 14 2.9 14 4V12C14 13.1 13.1 14 12 14H4C2.9 14 2 13.1 2 12V4C2 2.9 2.9 2 4 2Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
                  /* @__PURE__ */ e.jsx("path", { d: "M6 6H10M6 10H10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { style: n.content, children: [
      /* @__PURE__ */ e.jsxs("div", { style: n.section, children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            role: "button",
            tabIndex: 0,
            "aria-expanded": d.has("queries"),
            "aria-controls": "graphql-queries-content",
            onClick: () => w("queries"),
            onKeyDown: (t) => {
              (t.key === "Enter" || t.key === " ") && (t.preventDefault(), w("queries"));
            },
            style: {
              ...n.sectionHeader,
              borderBottom: d.has("queries") ? "1px solid #e1e4e8" : "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: n.sectionHeaderContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...n.sectionIcon, backgroundColor: "#0066cc" }, children: "Q" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: n.sectionTitle, children: "Queries" }),
                  /* @__PURE__ */ e.jsxs("div", { style: n.sectionSubtitle, children: [
                    i.length,
                    " operation",
                    i.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                ...n.sectionToggle,
                transform: d.has("queries") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        d.has("queries") && /* @__PURE__ */ e.jsx(
          "div",
          {
            id: "graphql-queries-content",
            style: n.sectionContent,
            children: i.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: n.emptyState, children: "No queries found" }) : i.map((t) => /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: n.operationCard,
                onMouseEnter: (o) => o.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
                onMouseLeave: (o) => o.currentTarget.style.boxShadow = "none",
                children: [
                  /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      onClick: () => u(`query-${t.name}`),
                      style: n.operationHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx("div", { style: n.operationName, children: t.name }) }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...n.operationToggle,
                          transform: m.has(`query-${t.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  m.has(`query-${t.name}`) && /* @__PURE__ */ e.jsxs("div", { style: n.operationDetails, children: [
                    t.parameters && t.parameters.length > 0 && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "16px" }, children: [
                      /* @__PURE__ */ e.jsx("h4", { style: n.parametersTitle, children: "Parameters" }),
                      /* @__PURE__ */ e.jsx("div", { style: n.parametersList, children: t.parameters.map((o, b) => /* @__PURE__ */ e.jsxs("div", { style: n.parameterItem, children: [
                        /* @__PURE__ */ e.jsx("span", { style: n.parameterName, children: o.name }),
                        /* @__PURE__ */ e.jsx("span", { style: { color: "#6a737d" }, children: ":" }),
                        /* @__PURE__ */ e.jsx("span", { style: n.parameterType, children: o.type }),
                        o.required && /* @__PURE__ */ e.jsx("span", { style: n.parameterRequired, children: "(required)" })
                      ] }, b)) })
                    ] }),
                    /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("h4", { style: n.schemaTitle, children: "Schema Definition" }),
                      /* @__PURE__ */ e.jsx("pre", { style: n.schemaCode, children: t.content })
                    ] })
                  ] })
                ]
              },
              `query-${t.name}`
            ))
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("div", { style: n.section, children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            role: "button",
            tabIndex: 0,
            "aria-expanded": d.has("mutations"),
            "aria-controls": "graphql-mutations-content",
            onClick: () => w("mutations"),
            onKeyDown: (t) => {
              (t.key === "Enter" || t.key === " ") && (t.preventDefault(), w("mutations"));
            },
            style: {
              ...n.sectionHeader,
              borderBottom: d.has("mutations") ? "1px solid #e1e4e8" : "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: n.sectionHeaderContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...n.sectionIcon, backgroundColor: "#d73a49" }, children: "M" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: n.sectionTitle, children: "Mutations" }),
                  /* @__PURE__ */ e.jsxs("div", { style: n.sectionSubtitle, children: [
                    x.length,
                    " operation",
                    x.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                ...n.sectionToggle,
                transform: d.has("mutations") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        d.has("mutations") && /* @__PURE__ */ e.jsx(
          "div",
          {
            id: "graphql-mutations-content",
            style: n.sectionContent,
            children: x.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: n.emptyState, children: "No mutations found" }) : x.map((t) => /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: n.operationCard,
                onMouseEnter: (o) => o.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
                onMouseLeave: (o) => o.currentTarget.style.boxShadow = "none",
                children: [
                  /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      onClick: () => u(`mutation-${t.name}`),
                      style: n.operationHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx("div", { style: n.operationName, children: t.name }) }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...n.operationToggle,
                          transform: m.has(`mutation-${t.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  m.has(`mutation-${t.name}`) && /* @__PURE__ */ e.jsxs("div", { style: n.operationDetails, children: [
                    t.parameters && t.parameters.length > 0 && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "16px" }, children: [
                      /* @__PURE__ */ e.jsx("h4", { style: n.parametersTitle, children: "Parameters" }),
                      /* @__PURE__ */ e.jsx("div", { style: n.parametersList, children: t.parameters.map((o, b) => /* @__PURE__ */ e.jsxs("div", { style: n.parameterItem, children: [
                        /* @__PURE__ */ e.jsx("span", { style: n.parameterName, children: o.name }),
                        /* @__PURE__ */ e.jsx("span", { style: { color: "#6a737d" }, children: ":" }),
                        /* @__PURE__ */ e.jsx("span", { style: n.parameterType, children: o.type }),
                        o.required && /* @__PURE__ */ e.jsx("span", { style: n.parameterRequired, children: "(required)" })
                      ] }, b)) })
                    ] }),
                    /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("h4", { style: n.schemaTitle, children: "Schema Definition" }),
                      /* @__PURE__ */ e.jsx("pre", { style: n.schemaCode, children: t.content })
                    ] })
                  ] })
                ]
              },
              `mutation-${t.name}`
            ))
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("div", { style: n.section, children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            role: "button",
            tabIndex: 0,
            "aria-expanded": d.has("types"),
            "aria-controls": "graphql-types-content",
            onClick: () => w("types"),
            onKeyDown: (t) => {
              (t.key === "Enter" || t.key === " ") && (t.preventDefault(), w("types"));
            },
            style: {
              ...n.sectionHeader,
              borderBottom: d.has("types") ? "1px solid #e1e4e8" : "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: n.sectionHeaderContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...n.sectionIcon, backgroundColor: "#6a737d" }, children: "T" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: n.sectionTitle, children: "Types" }),
                  /* @__PURE__ */ e.jsxs("div", { style: n.sectionSubtitle, children: [
                    a.length,
                    " type",
                    a.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                ...n.sectionToggle,
                transform: d.has("types") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        d.has("types") && /* @__PURE__ */ e.jsx(
          "div",
          {
            id: "graphql-types-content",
            style: n.sectionContent,
            children: a.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: n.emptyState, children: "No types found" }) : a.map((t) => /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: n.typeCard,
                onMouseEnter: (o) => o.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
                onMouseLeave: (o) => o.currentTarget.style.boxShadow = "none",
                children: [
                  /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      onClick: () => u(`type-${t.name}`),
                      style: n.typeHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: {
                          ...n.typeIcon,
                          backgroundColor: ye(t.kind)
                        }, children: fe(t.kind) }),
                        /* @__PURE__ */ e.jsxs("div", { style: n.typeInfo, children: [
                          /* @__PURE__ */ e.jsx("div", { style: n.typeName, children: t.name }),
                          t.description && /* @__PURE__ */ e.jsx("div", { style: n.typeDescription, children: t.description }),
                          /* @__PURE__ */ e.jsx("span", { style: n.typeBadge, children: t.kind })
                        ] }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...n.operationToggle,
                          transform: m.has(`type-${t.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  m.has(`type-${t.name}`) && /* @__PURE__ */ e.jsx("div", { style: n.operationDetails, children: /* @__PURE__ */ e.jsx("pre", { style: n.schemaCode, children: t.content }) })
                ]
              },
              `type-${t.name}`
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
