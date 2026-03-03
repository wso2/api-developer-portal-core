import le, { useState as P, useMemo as de } from "react";
var O = { exports: {} }, q = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var G;
function ae() {
  if (G) return q;
  G = 1;
  var x = le, r = Symbol.for("react.element"), y = Symbol.for("react.fragment"), U = Object.prototype.hasOwnProperty, i = x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, $ = { key: !0, ref: !0, __self: !0, __source: !0 };
  function R(b, a, j) {
    var s, m = {}, v = null, f = null;
    j !== void 0 && (v = "" + j), a.key !== void 0 && (v = "" + a.key), a.ref !== void 0 && (f = a.ref);
    for (s in a) U.call(a, s) && !$.hasOwnProperty(s) && (m[s] = a[s]);
    if (b && b.defaultProps) for (s in a = b.defaultProps, a) m[s] === void 0 && (m[s] = a[s]);
    return { $$typeof: r, type: b, key: v, ref: f, props: m, _owner: i.current };
  }
  return q.Fragment = y, q.jsx = R, q.jsxs = R, q;
}
var X;
function ce() {
  return X || (X = 1, O.exports = ae()), O.exports;
}
var e = ce();
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
}, pe = (x) => ({
  query: "#0066cc",
  mutation: "#d73a49",
  type: "#0066cc",
  interface: "#6f42c1",
  enum: "#22863a",
  scalar: "#6a737d",
  union: "#d73a49",
  input: "#005cc5"
})[x] || "#24292e", xe = (x) => ({
  query: "Q",
  mutation: "M",
  type: "T",
  interface: "I",
  enum: "E",
  scalar: "S",
  union: "U",
  input: "IN"
})[x] || "?", ue = ({ schema: x, apiMetadata: r }) => {
  var N, F, A, Q;
  const [y, U] = P(/* @__PURE__ */ new Set()), [i, $] = P(/* @__PURE__ */ new Set()), [R, b] = P(null), { operations: a, types: j } = de(() => {
    if (!x || typeof x != "string") return { operations: [], types: [] };
    const n = [], o = [], h = x.split(`
`), V = (k, u) => {
      const l = [];
      let w = !1, p = 0, g = "", T = [], I = !1;
      for (let B = 0; B < h.length; B++) {
        const W = h[B], d = W.trim();
        if (!d) {
          I || (g = "", T = []);
          continue;
        }
        if (d === `type ${k}` || d.startsWith(`type ${k} `) || d.startsWith(`type ${k}{`)) {
          w = !0, p = 0, g = "", T = [], I = !1, W.includes("{") && p++;
          continue;
        }
        if (w) {
          W.includes("{") && p++, W.includes("}") && p--;
          const M = d.startsWith('"""') || d.startsWith("#");
          if (M && p > 0) {
            I = !0;
            const C = d.replace(/^("""|#)/, "").replace(/"""$/, "").trim();
            C && T.push(C), d.endsWith('"""') && d.startsWith('"""') && d.length > 3 && (I = !1);
            continue;
          }
          if (I && !M && p > 0 && (g = T.join(" ").trim(), I = !1), p > 0 && !M) {
            const C = d.match(/^\s*(\w+)\s*(\([^)]*\))?\s*:\s*(.+?)(\s*\{|\s*$)/);
            if (C) {
              const te = C[1], J = C[2] || "";
              let _ = C[3].trim();
              _ = _.replace(/\s*\{.*$/, "").trim();
              const z = [];
              if (J) {
                const oe = J.replace(/[()]/g, ""), re = Array.from(oe.matchAll(/(\w+)\s*:\s*([^,]+)/g));
                for (const K of re) {
                  const ie = K[1], Z = K[2].trim(), se = Z.includes("!");
                  z.push({
                    name: ie,
                    type: Z.replace(/!/g, "").trim(),
                    required: se
                  });
                }
              }
              const ne = g.trim() || void 0;
              l.push({
                name: te,
                type: u,
                description: ne,
                parameters: z.length > 0 ? z : void 0,
                returnType: _.replace(/[!,]/g, "").trim(),
                content: W.trim()
              }), g = "", T = [];
            } else
              g && !d.startsWith("#") && !d.startsWith('"""') && (g = "", T = []);
          }
          if (p === 0 && d.includes("}")) {
            w = !1;
            break;
          }
        }
      }
      return l;
    }, Y = V("Query", "query");
    n.push(...Y);
    const ee = V("Mutation", "mutation");
    n.push(...ee);
    let c = null, E = "", S = 0, H = !1, L = [];
    for (let k = 0; k < h.length; k++) {
      const u = h[k], l = u.trim();
      if (l) {
        if ((l.startsWith('"""') || l.startsWith("#")) && !H) {
          E += l.replace(/^("""|#)/, "").replace(/"""$/, "").trim() + " ";
          continue;
        }
        if (l.startsWith("type ") || l.startsWith("interface ") || l.startsWith("enum ") || l.startsWith("scalar ") || l.startsWith("union ") || l.startsWith("input ")) {
          const w = l.match(/^(type|interface|enum|scalar|union|input)\s+(\w+)/);
          if (w) {
            const p = w[2];
            if (p === "Query" || p === "Mutation" || p === "Subscription")
              continue;
            c && (c.content = L.join(`
`), o.push(c));
            const g = w[1];
            c = {
              name: p,
              kind: g,
              description: E.trim() || void 0,
              content: ""
            }, L = [u], E = "", H = !0, S = 0, u.includes("{") && S++, u.includes("}") && S--;
          }
        } else H && c ? (L.push(u), u.includes("{") && S++, u.includes("}") && S--, S === 0 && (u.includes("}") || c.kind === "scalar" || c.kind === "union") && (c.content = L.join(`
`), o.push(c), c = null, L = [], H = !1)) : E = "";
      }
    }
    return c && (c.content = L.join(`
`), o.push(c)), { operations: n, types: o };
  }, [x]), s = a.filter((n) => n.type === "query"), m = a.filter((n) => n.type === "mutation"), v = (n) => {
    const o = new Set(y);
    o.has(n) ? o.delete(n) : o.add(n), U(o);
  }, f = (n) => {
    const o = new Set(i);
    o.has(n) ? o.delete(n) : o.add(n), $(o);
  }, D = async (n, o) => {
    if (o)
      try {
        await navigator.clipboard.writeText(o), b(n), setTimeout(() => b(null), 2e3);
      } catch (h) {
        console.error("Failed to copy endpoint URL:", h);
      }
  };
  return /* @__PURE__ */ e.jsx("div", { style: t.container, children: /* @__PURE__ */ e.jsxs("div", { style: t.contentWrapper, children: [
    /* @__PURE__ */ e.jsxs("div", { style: t.header, children: [
      /* @__PURE__ */ e.jsxs("h2", { style: t.title, children: [
        ((N = r == null ? void 0 : r.apiInfo) == null ? void 0 : N.apiName) || "GraphQL Schema Documentation",
        ((F = r == null ? void 0 : r.apiInfo) == null ? void 0 : F.apiVersion) && /* @__PURE__ */ e.jsx("span", { style: t.version, children: r.apiInfo.apiVersion })
      ] }),
      r && (((A = r.endPoints) == null ? void 0 : A.productionURL) || ((Q = r.endPoints) == null ? void 0 : Q.sandboxURL)) && /* @__PURE__ */ e.jsxs("div", { style: t.endpointsContainer, children: [
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
                R === "production" && /* @__PURE__ */ e.jsxs("div", { style: t.copiedTooltip, children: [
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
                R === "sandbox" && /* @__PURE__ */ e.jsxs("div", { style: t.copiedTooltip, children: [
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
            "aria-expanded": i.has("queries"),
            "aria-controls": "graphql-queries-content",
            onClick: () => f("queries"),
            onKeyDown: (n) => {
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), f("queries"));
            },
            style: {
              ...t.sectionHeader,
              borderBottom: i.has("queries") ? "1px solid #e1e4e8" : "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: t.sectionHeaderContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...t.sectionIcon, backgroundColor: "#0066cc" }, children: "Q" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: t.sectionTitle, children: "Queries" }),
                  /* @__PURE__ */ e.jsxs("div", { style: t.sectionSubtitle, children: [
                    s.length,
                    " operation",
                    s.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                ...t.sectionToggle,
                transform: i.has("queries") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        i.has("queries") && /* @__PURE__ */ e.jsx(
          "div",
          {
            id: "graphql-queries-content",
            style: t.sectionContent,
            children: s.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: t.emptyState, children: "No queries found" }) : s.map((n) => /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: t.operationCard,
                onMouseEnter: (o) => o.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
                onMouseLeave: (o) => o.currentTarget.style.boxShadow = "none",
                children: [
                  /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      onClick: () => v(`query-${n.name}`),
                      style: t.operationHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx("div", { style: t.operationName, children: n.name }) }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...t.operationToggle,
                          transform: y.has(`query-${n.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  y.has(`query-${n.name}`) && /* @__PURE__ */ e.jsxs("div", { style: t.operationDetails, children: [
                    n.parameters && n.parameters.length > 0 && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "16px" }, children: [
                      /* @__PURE__ */ e.jsx("h4", { style: t.parametersTitle, children: "Parameters" }),
                      /* @__PURE__ */ e.jsx("div", { style: t.parametersList, children: n.parameters.map((o, h) => /* @__PURE__ */ e.jsxs("div", { style: t.parameterItem, children: [
                        /* @__PURE__ */ e.jsx("span", { style: t.parameterName, children: o.name }),
                        /* @__PURE__ */ e.jsx("span", { style: { color: "#6a737d" }, children: ":" }),
                        /* @__PURE__ */ e.jsx("span", { style: t.parameterType, children: o.type }),
                        o.required && /* @__PURE__ */ e.jsx("span", { style: t.parameterRequired, children: "(required)" })
                      ] }, h)) })
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
            "aria-expanded": i.has("mutations"),
            "aria-controls": "graphql-mutations-content",
            onClick: () => f("mutations"),
            onKeyDown: (n) => {
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), f("mutations"));
            },
            style: {
              ...t.sectionHeader,
              borderBottom: i.has("mutations") ? "1px solid #e1e4e8" : "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: t.sectionHeaderContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...t.sectionIcon, backgroundColor: "#d73a49" }, children: "M" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: t.sectionTitle, children: "Mutations" }),
                  /* @__PURE__ */ e.jsxs("div", { style: t.sectionSubtitle, children: [
                    m.length,
                    " operation",
                    m.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                ...t.sectionToggle,
                transform: i.has("mutations") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        i.has("mutations") && /* @__PURE__ */ e.jsx(
          "div",
          {
            id: "graphql-mutations-content",
            style: t.sectionContent,
            children: m.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: t.emptyState, children: "No mutations found" }) : m.map((n) => /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: t.operationCard,
                onMouseEnter: (o) => o.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
                onMouseLeave: (o) => o.currentTarget.style.boxShadow = "none",
                children: [
                  /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      onClick: () => v(`mutation-${n.name}`),
                      style: t.operationHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx("div", { style: t.operationName, children: n.name }) }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...t.operationToggle,
                          transform: y.has(`mutation-${n.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  y.has(`mutation-${n.name}`) && /* @__PURE__ */ e.jsxs("div", { style: t.operationDetails, children: [
                    n.parameters && n.parameters.length > 0 && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "16px" }, children: [
                      /* @__PURE__ */ e.jsx("h4", { style: t.parametersTitle, children: "Parameters" }),
                      /* @__PURE__ */ e.jsx("div", { style: t.parametersList, children: n.parameters.map((o, h) => /* @__PURE__ */ e.jsxs("div", { style: t.parameterItem, children: [
                        /* @__PURE__ */ e.jsx("span", { style: t.parameterName, children: o.name }),
                        /* @__PURE__ */ e.jsx("span", { style: { color: "#6a737d" }, children: ":" }),
                        /* @__PURE__ */ e.jsx("span", { style: t.parameterType, children: o.type }),
                        o.required && /* @__PURE__ */ e.jsx("span", { style: t.parameterRequired, children: "(required)" })
                      ] }, h)) })
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
            "aria-expanded": i.has("types"),
            "aria-controls": "graphql-types-content",
            onClick: () => f("types"),
            onKeyDown: (n) => {
              (n.key === "Enter" || n.key === " ") && (n.preventDefault(), f("types"));
            },
            style: {
              ...t.sectionHeader,
              borderBottom: i.has("types") ? "1px solid #e1e4e8" : "none"
            },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: t.sectionHeaderContent, children: [
                /* @__PURE__ */ e.jsx("div", { style: { ...t.sectionIcon, backgroundColor: "#6a737d" }, children: "T" }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("h3", { style: t.sectionTitle, children: "Types" }),
                  /* @__PURE__ */ e.jsxs("div", { style: t.sectionSubtitle, children: [
                    j.length,
                    " type",
                    j.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: {
                ...t.sectionToggle,
                transform: i.has("types") ? "rotate(90deg)" : "rotate(0deg)"
              }, children: "›" })
            ]
          }
        ),
        i.has("types") && /* @__PURE__ */ e.jsx(
          "div",
          {
            id: "graphql-types-content",
            style: t.sectionContent,
            children: j.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: t.emptyState, children: "No types found" }) : j.map((n) => /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: t.typeCard,
                onMouseEnter: (o) => o.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
                onMouseLeave: (o) => o.currentTarget.style.boxShadow = "none",
                children: [
                  /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      onClick: () => v(`type-${n.name}`),
                      style: t.typeHeader,
                      children: [
                        /* @__PURE__ */ e.jsx("div", { style: {
                          ...t.typeIcon,
                          backgroundColor: pe(n.kind)
                        }, children: xe(n.kind) }),
                        /* @__PURE__ */ e.jsxs("div", { style: t.typeInfo, children: [
                          /* @__PURE__ */ e.jsx("div", { style: t.typeName, children: n.name }),
                          n.description && /* @__PURE__ */ e.jsx("div", { style: t.typeDescription, children: n.description }),
                          /* @__PURE__ */ e.jsx("span", { style: t.typeBadge, children: n.kind })
                        ] }),
                        /* @__PURE__ */ e.jsx("span", { style: {
                          ...t.operationToggle,
                          transform: y.has(`type-${n.name}`) ? "rotate(90deg)" : "rotate(0deg)"
                        }, children: "›" })
                      ]
                    }
                  ),
                  y.has(`type-${n.name}`) && /* @__PURE__ */ e.jsx("div", { style: t.operationDetails, children: /* @__PURE__ */ e.jsx("pre", { style: t.schemaCode, children: n.content }) })
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
  ue as GraphQLSchemaViewer,
  ue as default
};
