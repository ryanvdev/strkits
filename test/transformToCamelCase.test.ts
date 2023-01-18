import { describe, test, expect } from 'vitest';
import StrKits from '../src';

const subjects: [string, string][] = [
    ['transformToCamelCase', 'transformToCamelCase'],
    ['transform-to-camel-case', 'transformToCamelCase'],
    ['transform---To_CAMEL-case', 'transformToCamelCase'],
    ['Transform@ToCamel-case', 'transform@ToCamelCase'],
    ['transform@To-Camel_case--', 'transform@ToCamelCase'],
    ['transform-to-camel-case', 'transformToCamelCase'],
    ['TransformTo-CAMELCasE', 'transformToCamelCasE'],
    ['Unicode@Xin-chàoCÁCBạn_Á', 'unicode@XinChàoCácBạnÁ'],
    ['Unicode###皆さん、こんにちは', 'unicode###皆さん、こんにちは'],
    ['----transform-to-camel-case------', 'transformToCamelCase'],
    ['Ta aa', 'taAa'],
    ['t', 't'],
    ['', ''],
];

describe('transformToCamelCase', () => {
    for (const [subject, expected] of subjects) {
        test(subject, () => {
            expect(StrKits.transform.toCamelCase(subject)).toBe(expected);
        });
    }
});

describe('transformToPascalCase', () => {
    for (const [subject, _expected] of subjects) {
        const expected =
            _expected.length === 0 ? '' : _expected[0].toUpperCase() + _expected.slice(1);
        test(subject, () => {
            expect(StrKits.transform.toPascalCase(subject)).toBe(expected);
        });
    }
});
