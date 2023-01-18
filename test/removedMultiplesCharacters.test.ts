import { describe, test, expect } from 'vitest';
import StrKits from '../lib';

const subjects: [string, string, string][] = [
    [' ', '  transform       To     Camel      Case          ', 'transform To Camel Case'],
    [
        '@-',
        'trans@-form@@@@----To@------@Camel@@@@@@@Case@@@@@@----',
        'trans@-form@-To@-@Camel@Case',
    ],
    [
        ' 0#',
        '####transform0000000To0000000     Camel0000000Case          ',
        'transform0To0 Camel0Case',
    ],
];

describe('removedMultiplesCharacters', () => {
    for (const [character, subject, expected] of subjects) {
        test(subject, () => {
            expect(StrKits.removedMultiplesCharacters(subject, character)).toBe(expected);
        });
    }
});
