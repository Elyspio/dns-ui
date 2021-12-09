module.exports = {
	roots: ["<rootDir>/tests"],
	testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|dns).+(ts|tsx|js)"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
};
