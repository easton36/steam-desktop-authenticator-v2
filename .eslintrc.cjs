module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript'
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react'
	],
	rules: {
		semi: [2, 'always'],
		'func-call-spacing': [2, 'never'],
		'keyword-spacing': [2, {
			before: false,
			after: false,
			overrides: {
				catch: {
					before: true,
					after: false
				},
				const: {
					before: false,
					after: true
				},
				return: {
					before: true,
					after: true
				},
				case: {
					before: false,
					after: true
				},
				else: {
					before: true,
					after: false
				},
				async: {
					before: false,
					after: true
				},
				of: {
					before: true,
					after: true
				},
				continue: {
					before: true,
					after: false
				},
				throw: {
					before: true,
					after: true
				},
				await: {
					before: true,
					after: true
				},
				break: {
					before: true,
					after: false
				},
				finally: {
					before: true,
					after: false
				},
				default: {
					before: true,
					after: true
				}
			}
		}],
		'space-before-blocks': [2, 'never'],
		'newline-before-return': 2,
		'eol-last': [2, 'never'],
		indent: ['error', 'tab'],
		'no-tabs': 0,
		camelcase: 0,
		'prefer-regex-literals': 0,
		'no-useless-escape': 0,
		'no-unused-vars': 0,
		'n/no-callback-literal': 0,
		'space-before-function-paren': ['error', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always'
		}],
		'no-return-assign': 0
	}
};