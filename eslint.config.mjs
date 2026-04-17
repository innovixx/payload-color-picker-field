import payloadEsLintConfig from '@payloadcms/eslint-config'
import payloadPlugin from '@payloadcms/eslint-plugin'

const config = [
	...payloadEsLintConfig,
	{
		files: ['src/**/*.{js,jsx,ts,tsx}'],
		plugins: {
			payload: payloadPlugin,
		},
		languageOptions: {
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
				project: ['./tsconfig.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'payload/no-jsx-import-statements': 'warn',
			'payload/no-relative-monorepo-imports': 'error',
			'payload/no-imports-from-exports-dir': 'error',
			'payload/no-imports-from-self': 'error',
			'payload/proper-payload-logger-usage': 'error',
		},
	},
]

export default config