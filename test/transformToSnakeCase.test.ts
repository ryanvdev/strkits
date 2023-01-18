import { describe, test, expect } from 'vitest';
import { transformToSnakeCase } from '../src';

const subjects: [string, string][] = [
    ['transformToSpecialCase', 'transform_to_special_case'],
    ['TranSformTo__SpecialCasE', 'tran_sform_to_special_cas_e'],
    ['TRANSFORMtoSpecialCa#seTRAN---SF__ORM', 'transfor_mto_special_ca#se_tran_sf_orm'],
    ['TraNsform-To-Special-Case', 'tra_nsform_to_special_case'],
    ['TraNsform-to-special-casE', 'tra_nsform_to_special_cas_e'],
    ['Unicode@XinChàoCácBạn', 'unicode@xin_chào_các_bạn'],
    ['Unicode###皆さん、こんにちは', 'unicode###皆さん、こんにちは'],
];

describe('transformToSnakeCase', () => {
    for (const [subject, expected] of subjects) {
        test(subject, () => {
            expect(transformToSnakeCase(subject)).toBe(expected);
        });
    }
});
