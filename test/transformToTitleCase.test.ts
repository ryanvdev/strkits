import { describe, test, expect } from 'vitest';
import { transformToTitleCase } from '../src';

const subjects: [string, string, string][] = [
    ['-', 'transformToSpecialCase', 'Transform-To-Special-Case'],
    [' ', 'TranSformTo__SpecialCasE', 'Tran Sform To Special Cas E'],
    ['_', 'TRANSFORMtoSpecialCa#seTRAN---SF__ORM', 'Transfor_Mto_Special_Ca#se_Tran_Sf_Orm'],
    [' ', 'TraNsform-To-Special-Case', 'Tra Nsform To Special Case'],
    [' ', 'TraNsform-to-special-casE', 'Tra Nsform To Special Cas E'],
    [' ', 'Unicode@XinChàoCácBạn', 'Unicode@xin Chào Các Bạn'],
    [' ', 'Unicode###皆さん、こんにちは', 'Unicode###皆さん、こんにちは'],
    [' ', '----TraNsform-to-special-casE----', 'Tra Nsform To Special Cas E'],
    [' ', '----Transform-to   -special-case----', 'Transform To Special Case'],
];

describe('transformToTitleCase', () => {
    for (const [separator, subject, expected] of subjects) {
        test(subject, () => {
            expect(transformToTitleCase(subject, separator as any)).toBe(expected);
        });
    }
});
