import { transformToSpecialCase } from '../src';

const testFn = transformToSpecialCase;

const subjects: [string, string][] = [
    ['transformToSpecialCase', 'transform-to-special-case'],
    ['TranSformTo__SpecialCasE', 'tran-sform-to-special-cas-e'],
    ['TRANSFORMtoSpecialCa#seTRAN---SF__ORM', 'transfor-mto-special-ca#se-tran-sf-orm'],
    ['TraNsform-To-Special-Case', 'tra-nsform-to-special-case'],
    ['TraNsform-to-special-casE', 'tra-nsform-to-special-cas-e'],
    ['Unicode@XinChàoCácBạn', 'unicode@xin-chào-các-bạn'],
    ['Unicode###皆さん、こんにちは', 'unicode###皆さん、こんにちは'],
    ['----TraNsform-to-special-casE----', 'tra-nsform-to-special-cas-e'],
    ['----Transform-to   -special-case----', 'transform-to-special-case'],
];

describe('transformToSpecialCase', () => {
    for (const [subject, expected] of subjects) {
        test(subject, () => {
            expect(testFn(subject, '-')).toBe(expected);
        });
    }
});
