export default {
	moduleDirectories: ['node_modules', 'src'],
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'^/(.*)$': '<rootDir>/src/$1',
	},
	modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/dist/'],
};
