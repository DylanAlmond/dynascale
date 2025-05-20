![NPM Version](https://img.shields.io/npm/v/dynascale)
![NPM Last Update](https://img.shields.io/npm/last-update/dynascale)
![NPM Type Definitions](https://img.shields.io/npm/types/dynascale)
![NPM Downloads](https://img.shields.io/npm/dw/dynascale)

# Dynascale

A dynamic scaling component for React that automatically scales its children to fit within their container while maintaining aspect ratio.

## Table of Contents

- [Dynascale](#dynascale)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Props](#props)
  - [License](#license)

## Features

- **Automatic Scaling:** Scales content to always fit its container.
- **Aspect Ratio Preservation:** Maintains the original aspect ratio of the content.

## Installation

```bash
yarn add dynascale
# or
npm install dynascale
```

## Usage

```tsx
import React from 'react';
import { Dynascale } from 'dynascale';

const Example = () => (
  <div style={{ width: 400, height: 300, border: '1px solid #ccc' }}>
    <Dynascale margin={0.05} debug={true}>
      <div style={{ width: 600, height: 400, background: '#eee' }}>
        This content will always fit and scale!
      </div>
    </Dynascale>
  </div>
);

export default Example;
```

## Props

| Name           | Type        | Default | Description                                                      |
| -------------- | ----------- | ------- | ---------------------------------------------------------------- |
| `defaultScale` | `number`    | `0`     | Initial scale value.                                             |
| `minScale`     | `number`    | `0.1`   | Minimum allowed scale factor.                                    |
| `margin`       | `number`    | `0`     | Margin as a percentage (0–1) to leave around the scaled content. |
| `className`    | `string`    | `''`    | Additional class names for the container.                        |
| `debug`        | `boolean`   | `false` | Show debug information overlay.                                  |
| `children`     | `ReactNode` |         | Content to be scaled.                                            |

## License

This project is licensed under the [MIT License](LICENSE).

