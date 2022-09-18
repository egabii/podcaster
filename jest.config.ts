export default {
	moduleDirectories: ['node_modules', 'src'],
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'^/(.*)$': '<rootDir>/src/$1',
	},
	setupFilesAfterEnv: ['./jest.setup.ts'],
	modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/dist/'],
};
