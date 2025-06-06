// export default {
// 	preset: 'ts-jest',
// 	testEnvironment: 'jest-environment-jsdom',
// 	transform: {
// 		'^.+\\.(ts|tsx)?$': 'ts-jest'
// 		// process `*.tsx` files with `ts-jest`
// 	},
// 	// globals: {
// 	// 	'ts-jest': {
// 	// 		isolatedModules: true // Optional: speeds up tests by compiling files in isolation
// 	// 	}
// 	// },
// 	moduleNameMapper: {
// 		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js'
// 	}
// };

export default {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.(ts|tsx)?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.app.json' // Explicitly specify your tsconfig file
			}
		]
	},
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js'
	},
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts']
};
