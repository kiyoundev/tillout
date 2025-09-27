import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for Jest (node environment)
import { TextEncoder, TextDecoder } from 'util';

if (!global.TextEncoder) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}

if (!global.TextDecoder) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}
