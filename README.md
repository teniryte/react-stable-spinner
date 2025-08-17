[![npm version](https://img.shields.io/npm/v/react-stable-spinner.svg?color=blue)](https://www.npmjs.com/package/react-stable-spinner) [![npm downloads](https://img.shields.io/npm/dm/react-stable-spinner.svg?color=brightgreen)](https://www.npmjs.com/package/react-stable-spinner) [![GitHub stars](https://img.shields.io/github/stars/teniryte/react-stable-spinner?style=social)](https://github.com/teniryte/react-stable-spinner) [![License](https://img.shields.io/github/license/teniryte/react-stable-spinner)](LICENSE)

# react-stable-spinner

A React hook that delays loading spinner display to improve user experience by preventing flickering for quick operations.

If the loading time is less than `options.after`, the hook returns false. If the loading time is more than `options.after`, the hook returns true for at least `options.minDuration` milliseconds.

## Installation

```bash
npm install react-stable-spinner
# or
yarn add react-stable-spinner
# or
bun add react-stable-spinner
```

## Usage

```tsx
import { useStableSpinner } from 'react-stable-spinner';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);
  
  const showLoading = useStableSpinner(isLoading, {
    after: 300,        // Show spinner if loading takes longer than 300 milliseconds
    minDuration: 500   // Keep spinner visible for at least 500ms
  });

  return (
    <div>
      {showLoading && <Spinner />}
      {/* Your content */}
    </div>
  );
}
```

## API

### `useStableSpinner(isLoading, options)`

**Parameters:**
- `isLoading` (boolean): Current loading state
- `options` (object):
  - `after` (number): Delay before showing spinner (default: 300ms)
  - `minDuration` (number): Minimum time to keep spinner visible (default: 500ms)

**Returns:**
- `boolean`: Whether to show the spinner

## Features

- **Prevents flickering**: Only shows spinner for operations that take longer than the specified delay
- **Minimum duration**: Ensures spinner is visible for a minimum time to avoid jarring transitions
- **Performance optimized**: Uses `performance.now()` for precise timing
- **TypeScript support**: Fully typed with TypeScript

## License

MIT
