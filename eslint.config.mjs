import typescriptParser from '@typescript-eslint/parser';

export default [
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: typescriptParser
		},
        plugins: {
            '@typescript-eslint': import('@typescript-eslint/eslint-plugin'),
        },
		rules: {
			'@/no-unused-vars': 'warn',
		}
	}
];