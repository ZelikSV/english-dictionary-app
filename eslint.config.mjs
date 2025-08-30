import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'next-env.d.ts'
        ]
    },
    {
        rules: {
            semi: ['error', 'always'],
            quotes: ['error', 'single', {
                avoidEscape: true,
                allowTemplateLiterals: true
            }],
            'jsx-quotes': ['error', 'prefer-single'],
            'comma-dangle': 'error',
            'eol-last': 'error',
            'no-multiple-empty-lines': 'error',
            'object-curly-spacing': ['error', 'never'],
            'brace-style': ['error', '1tbs'],
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_'
            }],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-empty-function': 'error',
            '@typescript-eslint/no-shadow': ['error', {hoist: 'all'}],
            '@typescript-eslint/prefer-for-of': 'error',
            '@typescript-eslint/consistent-type-assertions': 'error',
            '@typescript-eslint/array-type': ['error', {default: 'array'}],
            'func-style': ['error', 'expression', {allowArrowFunctions: true}],
            'prefer-arrow-callback': ['error', {allowNamedFunctions: false}],
            'react/function-component-definition': ['error', {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function'
            }],
            'arrow-parens': ['error', 'as-needed'],
            'no-var': 'error',
            'prefer-const': ['warn', {ignoreReadBeforeAssign: false}],
            'prefer-template': 'error',
            'prefer-object-spread': 'error',
            'object-shorthand': 'error',
            'no-duplicate-imports': 'error',
            eqeqeq: ['error', 'always'],
            'no-eval': 'error',
            'no-new-func': 'error',
            'no-throw-literal': 'error',
            'no-return-await': 'error',
            curly: 'error',
            'default-case': 'error',
            'guard-for-in': 'error',
            'id-denylist': ['error', 'any', 'String', 'string', 'Boolean', 'boolean', 'Undefined', 'undefined'],
            'no-console': 'error',
            'no-debugger': 'error',
            'one-var': ['error', 'never'],
            'quote-props': ['error', 'as-needed'],
            'space-before-function-paren': ['error', {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }],
            'spaced-comment': ['error', 'always', {markers: ['/']}],
            'padding-line-between-statements': ['error', {
                blankLine: 'always',
                prev: '*',
                next: 'return'
            }],
            complexity: ['error', {max: 15}]
        }
    }
];

export default eslintConfig;
