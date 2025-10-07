# AsyncAPI Viewer

A React component library for viewing and testing AsyncAPI specifications with support for both JSON and YAML formats.

## Features

- WebSocket API testing
- YAML and JSON support

## Installation

```bash
npm install @wso2/async-api-viewer
```

## Usage

### Basic Usage

```tsx
import React from 'react';
import { WebSocketViewer } from '@wso2/async-api-viewer';

const MyComponent = () => {
  const asyncAPISpec = {
    asyncapi: '2.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A sample AsyncAPI specification'
    },
    // ... rest of the spec
  };

  return (
    <WebSocketViewer 
      schema={asyncAPISpec}
      targetUrl="https://api.example.com"
      token="your-token"
    />
  );
};
```

### With YAML String

```tsx
import React from 'react';
import { WebSocketViewer } from '@wso2/async-api-viewer';

const MyComponent = () => {
  const yamlSpec = `
asyncapi: 2.0.0
info:
  title: My API
  version: 1.0.0
  description: A sample AsyncAPI specification
  `;

  return (
    <WebSocketViewer 
      schema={yamlSpec}
      targetUrl="https://api.example.com"
      token="your-token"
    />
  );
};
```

## Props

### WebSocketViewer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `schema` | `string \| AsyncAPISpec` | - | AsyncAPI specification as JSON string, YAML string, or parsed object |
| `targetUrl` | `string` | - | Target URL for the API |
| `token` | `string` | - | Token for the API |


## Development

```bash
# Install dependencies
rush install

# Build the package
rushx build

# Watch for changes
rushx dev

# Lint code
rushx lint

# Format code
rushx format
```

## Dependencies

This package depends on:
- `react-monaco-editor`: For the Monaco editor
- `lodash`: For utility functions
- `@material-ui/core`: For UI components
- `@material-ui/icons`: For icons
- `lodash.clonedeep`: For utility functions
- `clsx`: For class name management
- `react-intl`: For internationalization (minimal usage)
- `react-window`: For the infinite logs panel
- `react-lottie`: For the text pre loader

## License

Licensed under the WSO2 Commercial License. 

