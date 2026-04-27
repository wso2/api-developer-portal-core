/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses.
 * For specific language governing the permissions and limitations under
 * this license, please see the license as well as any agreement you've
 * entered into with WSO2 governing the purchase of this software and any
 * associated services.
 */

export const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#f6f8fa',
    minHeight: '100vh',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
  },
  contentWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    overflow: 'hidden'
  },
  header: {
    padding: '24px',
    borderBottom: '1px solid #e1e4e8',
    backgroundColor: '#fafbfc'
  },
  title: {
    margin: '0 0 20px 0',
    color: '#24292e',
    fontSize: '24px',
    fontWeight: 600
  },
  version: {
    fontSize: '18px',
    fontWeight: 400,
    color: '#6a737d',
    marginLeft: '12px'
  },
  endpointsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  endpointCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '12px 16px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    border: '1px solid #e6e8eb',
    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
    cursor: 'pointer',
    position: 'relative' as const,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  endpointBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.6px',
    flexShrink: 0,
    whiteSpace: 'nowrap' as const,
  },
  endpointBadgeProduction: {
    backgroundColor: '#ddf4e4',
    color: '#1a7f37',
  },
  endpointBadgeSandbox: {
    backgroundColor: '#fff3e0',
    color: '#e65c00',
  },
  endpointDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  endpointDotProduction: {
    backgroundColor: '#1a7f37',
  },
  endpointDotSandbox: {
    backgroundColor: '#e65c00',
  },
  endpointUrl: {
    flex: 1,
    minWidth: 0,
    fontSize: '13px',
    color: '#1f2328',
    fontFamily: "'SF Mono', 'Monaco', 'Menlo', 'Courier New', monospace",
    wordBreak: 'break-all' as const,
    lineHeight: '1.5',
  },
  copyIcon: {
    flexShrink: 0,
    color: '#8c959f',
    transition: 'color 0.15s ease',
  },
  copiedTooltip: {
    position: 'absolute' as const,
    top: '-36px',
    right: 0,
    padding: '5px 10px',
    backgroundColor: '#1f2328',
    color: 'white',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    whiteSpace: 'nowrap' as const,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
    pointerEvents: 'none' as const,
    letterSpacing: '0.3px',
  },
  tooltipArrow: {
    position: 'absolute' as const,
    bottom: '-4px',
    right: '10px',
    width: 0,
    height: 0,
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
    borderTop: '4px solid #1f2328',
  },
  content: {
    padding: '16px'
  },
  section: {
    marginBottom: '24px',
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  sectionHeader: {
    padding: '16px',
    backgroundColor: '#fafbfc',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    userSelect: 'none' as const
  },
  sectionHeaderContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  sectionIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  sectionTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 600,
    color: '#24292e'
  },
  sectionSubtitle: {
    fontSize: '13px',
    color: '#6a737d',
    marginTop: '4px'
  },
  sectionToggle: {
    fontSize: '20px',
    color: '#6a737d',
    transition: 'transform 0.2s'
  },
  sectionContent: {
    padding: '16px'
  },
  emptyState: {
    padding: '20px',
    textAlign: 'center' as const,
    color: '#6a737d'
  },
  operationCard: {
    marginBottom: '12px',
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  operationHeader: {
    padding: '12px 16px',
    backgroundColor: '#fafbfc',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    userSelect: 'none' as const
  },
  operationName: {
    fontWeight: 600,
    color: '#24292e',
    fontSize: '16px'
  },
  operationToggle: {
    fontSize: '18px',
    color: '#6a737d',
    transition: 'transform 0.2s'
  },
  operationDetails: {
    padding: '16px',
    backgroundColor: 'white',
    borderTop: '1px solid #e1e4e8'
  },
  parametersTitle: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    fontWeight: 600,
    color: '#24292e'
  },
  parametersList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  parameterItem: {
    padding: '8px 12px',
    backgroundColor: '#f6f8fa',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  parameterName: {
    fontWeight: 600,
    color: '#24292e',
    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
  },
  parameterType: {
    color: '#005cc5',
    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
  },
  parameterRequired: {
    color: '#d73a49',
    fontSize: '12px'
  },
  schemaTitle: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    fontWeight: 600,
    color: '#24292e'
  },
  schemaCode: {
    margin: 0,
    padding: '12px',
    backgroundColor: '#f6f8fa',
    borderRadius: '6px',
    fontSize: '13px',
    lineHeight: '1.6',
    overflow: 'auto',
    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
    color: '#24292e'
  },
  typeCard: {
    marginBottom: '12px',
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  typeHeader: {
    padding: '12px 16px',
    backgroundColor: '#fafbfc',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    userSelect: 'none' as const
  },
  typeIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold'
  },
  typeInfo: {
    flex: 1
  },
  typeName: {
    fontWeight: 600,
    color: '#24292e',
    fontSize: '16px',
    marginBottom: '4px'
  },
  typeDescription: {
    fontSize: '13px',
    color: '#6a737d',
    marginBottom: '4px'
  },
  typeBadge: {
    fontSize: '12px',
    color: '#6a737d',
    padding: '2px 8px',
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #e1e4e8'
  }
};

export const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    query: '#0066cc',
    mutation: '#d73a49',
    type: '#0066cc',
    interface: '#6f42c1',
    enum: '#22863a',
    scalar: '#6a737d',
    union: '#d73a49',
    input: '#005cc5'
  };
  return colors[type] || '#24292e';
};

export const getTypeIcon = (type: string): string => {
  const icons: Record<string, string> = {
    query: 'Q',
    mutation: 'M',
    type: 'T',
    interface: 'I',
    enum: 'E',
    scalar: 'S',
    union: 'U',
    input: 'IN'
  };
  return icons[type] || '?';
};


