import { strip } from '../src';

const subjects: [string, string, string][] = [
    [',.grt', ',,,,,rrttgg.....banana....rrr', 'banana'],
    [' ', '                  banana                ', 'banana'],
    [
        ' ',
        '        Remove       spaces at   the beginning and at the end of the string                ',
        'Remove       spaces at   the beginning and at the end of the string',
    ],
    [
        '!@#$%^&*() ',
        '      @#^  @#$Remove       spaces at   the beginning and at the end of the string   ()    *!   &%      ',
        'Remove       spaces at   the beginning and at the end of the string',
    ],
];

describe('strip', () => {
    for (const [character, subject, expected] of subjects) {
        test(subject, () => {
            expect(strip(subject, character)).toBe(expected);
        });
    }
});
