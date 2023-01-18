import { describe, test, expect, it } from 'vitest';
import { replaceRange, ReplaceRangeConfig } from '../src';
import { pyRange } from 'py-range-ts';

interface TestReplaceRange {
    subject: string;
    args: ReplaceRangeConfig[];
    expected: string;
}

const subjects: TestReplaceRange[] = [
    {
        subject: 'Imagination is more important than knowledge',
        args: [],
        expected: 'Imagination is more important than knowledge',
    },
    {
        subject: 'Imagination is more important than knowledge',
        args: [
            {
                start: 0,
                end: 1,
                value: 'new-value ',
            },
        ],
        expected: 'new-value magination is more important than knowledge',
    },
    {
        subject: 'Imagination is more important than knowledge',
        args: [
            {
                start: 0,
                end: 0,
                value: 'new-value ',
            },
        ],
        expected: 'new-value Imagination is more important than knowledge',
    },
    {
        subject: 'Imagination is more important than knowledge',
        args: [
            ...pyRange(4).fill({
                start: 11,
                end: 11,
                value: 'xxx',
            }),
            {
                start: 44,
                end: 44,
                value: ' OOO',
            },
            {
                start: 0,
                end: 0,
                value: 'HHH ',
            },
        ],
        expected: `HHH Imagination${pyRange(4)
            .fill('xxx')
            .join('')} is more important than knowledge OOO`,
    },
    {
        subject: 'Imagination is more important than knowledge',
        args: [
            {
                start: 44,
                end: 44,
                value: '===',
            },
            {
                start: 0,
                end: 11,
                value: 'xxx',
            },
            {
                start: 34,
                end: 35,
                value: '---',
            },
            {
                start: 20,
                end: 29,
                value: 'sss',
            },
            {
                start: 11,
                end: 12,
                value: '___',
            },
        ],
        expected: 'xxx___is more sss than---knowledge===',
    },
    {
        subject: 'Imagination is more important than knowledge',
        args: [
            {
                start: 0,
                end: 11,
                value: 'new-value',
            },
        ],
        expected: 'new-value is more important than knowledge',
    },
    {
        subject: 'Imagination is more important than knowledge',
        args: [
            {
                start: 12,
                end: 14,
                value: 'new-value',
            },
        ],
        expected: 'Imagination new-value more important than knowledge',
    },
];

describe('replaceRange', () => {
    for (const { subject, args, expected } of subjects) {
        test(subject, () => {
            expect(replaceRange(subject, args)).toBe(expected);
        });
    }

    test('Replace all with empty string', () => {
        const subject: string = '';
        const expected: string = 'Imagination is more important than knowledge';
        expect(
            replaceRange(subject, [
                {
                    start: 0,
                    end: subject.length,
                    value: expected,
                },
            ]),
        ).toBe(expected);
    });

    test('Replace empty string with multiple range(0,0)', () => {
        const subject: string = '';
        const expected: string = pyRange(4).fill('__Imagination__').join('');
        expect(
            replaceRange(
                subject,
                pyRange(4).fill({
                    end: 0,
                    start: 0,
                    value: '__Imagination__',
                }),
            ),
        ).toBe(expected);
    });

    test('Replace all with non-empty string', () => {
        const subject: string = 'subject';
        const expected: string = 'Imagination is more important than knowledge';
        expect(
            replaceRange(subject, [
                {
                    start: 0,
                    end: subject.length,
                    value: expected,
                },
            ]),
        ).toBe(expected);
    });

    test('It should throw error with start > end', () => {
        expect(() => {
            replaceRange('subject', [{ start: 5, end: 3, value: 'new-value' }]);
        }).toThrow();
    });

    test('It should throw error with start < 0', () => {
        expect(() => {
            replaceRange('subject', [{ start: -1, end: 2, value: 'new-value' }]);
        }).toThrow();
    });

    test('It should throw error with end > length', () => {
        expect(() => {
            replaceRange('subject', [{ start: 0, end: 1000, value: 'new-value' }]);
        }).toThrow();
    });
});
