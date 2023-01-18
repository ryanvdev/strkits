import { pyRange } from 'py-range-ts';

export type Separator = ' ' | '-' | '_';

const EMPTY_STRING = '';
const SPACE_STRING = ' ';

const specialCharacterRanges = Object.freeze([
    [33, 47], // from ! to /
    [58, 64], // from : to @
    [92, 96], // from \ to `
] as [number, number][]);

const SEPARATORS = Object.freeze(['-'.charCodeAt(0), ' '.charCodeAt(0), '_'.charCodeAt(0)]);

function mkResult<T>(callbackFn: () => T) {
    return callbackFn();
}

function isSeparator(c: string): c is Separator {
    return SEPARATORS.includes(c.charCodeAt(0));
}

/**
 * Check if the subject is a special character ?
 */
function isSpaceOrSpecialCharacter(subject: string): boolean {
    const charCode = subject.charCodeAt(0);

    // if is space
    if (charCode === 32) return true;

    for (const [start, end] of specialCharacterRanges) {
        if (charCode >= start && charCode <= end) return true;
    }

    return false;
}

function transformToPascalCamelCase(subject: string, firstIsUpperCase: boolean): string {
    if (subject.length === 0) return EMPTY_STRING;

    if (subject.length === 1) {
        if (isSeparator(subject)) return EMPTY_STRING;

        if (firstIsUpperCase) return subject.toUpperCase();
        return subject.toLowerCase();
    }

    let beforeIsSeparator: boolean = true;
    let beforeIsUpperCase: boolean = false;
    const lengthMinus1 = subject.length - 1;

    const processedStrings: string[] = [];
    pyRange(lengthMinus1).forEach((i) => {
        const currentLetter = subject[i];

        // * Case: Special character
        if (isSpaceOrSpecialCharacter(currentLetter)) {
            beforeIsUpperCase = false;

            if (isSeparator(currentLetter)) {
                beforeIsSeparator = true;
                return;
            }

            return processedStrings.push(currentLetter);
        }

        // * Case Uppercase
        if (isUpperCase(currentLetter)) {
            if (beforeIsUpperCase && isUpperCase(subject[i + 1])) {
                beforeIsSeparator = false;
                beforeIsUpperCase = true;
                return processedStrings.push(currentLetter.toLowerCase());
            }
            beforeIsSeparator = false;
            beforeIsUpperCase = true;
            return processedStrings.push(currentLetter);
        }

        beforeIsUpperCase = false;

        if (beforeIsSeparator) {
            beforeIsSeparator = false;
            return processedStrings.push(currentLetter.toUpperCase());
        }

        return processedStrings.push(currentLetter);
    });

    processedStrings.push(
        mkResult(() => {
            const currentLetter = subject[lengthMinus1];

            // * Case: Special character
            if (isSpaceOrSpecialCharacter(currentLetter)) {
                if (isSeparator(currentLetter)) return EMPTY_STRING;
                return currentLetter;
            }

            // * Case: Upper case
            if (isUpperCase(currentLetter)) {
                if (beforeIsUpperCase) return currentLetter.toLowerCase();
                return currentLetter;
            }

            // * Case: Lower case
            if (beforeIsSeparator) return currentLetter.toUpperCase();
            return currentLetter;
        }),
    );

    if (firstIsUpperCase) {
        processedStrings[0] = processedStrings[0].toUpperCase();
    } else {
        processedStrings[0] = processedStrings[0].toLowerCase();
    }

    return processedStrings.join(EMPTY_STRING);
}

export function isSpecialCharacter(subject: string): boolean {
    if (subject.length !== 1) {
        throw new Error(
            `[isASpecialCharacter] Accepts only 1 character. But subject.length=${subject.length}`,
        );
    }

    const charCode = subject.charCodeAt(0);

    for (const [start, end] of specialCharacterRanges) {
        if (charCode >= start && charCode <= end) return true;
    }

    return false;
}

export function isUpperCase(subject: string) {
    return subject === subject.toUpperCase();
}

export function removedMultiplesCharacters(subject: string, characters: string) {
    if (subject.length === 0) return EMPTY_STRING;

    const processedStrings: string[] = [];
    let tmp: string | undefined = undefined;

    for (let i = 0; i < subject.length; i++) {
        const currentLetter = subject[i];

        if (tmp === currentLetter) {
            continue;
        }

        processedStrings.push(currentLetter);

        if (characters.includes(currentLetter)) {
            tmp = currentLetter;
            continue;
        }

        tmp = undefined;
    }

    return strip(processedStrings.join(EMPTY_STRING), characters);
}

/**
 * Works like strip() in python
 * @param subject The string that will be trimmed
 * @param characters A string or list of strings specifying the set of
 * characters to be removed from the left and right part of the string.
 * @returns The string with both leading and trailing characters stripped.
 */
export function strip(subject: string, characters: string | string[] | Readonly<string[]>) {
    if (subject.length === 0) return EMPTY_STRING;

    let start: number = -1;
    let end: number = -1;

    for (let i = 0; i < subject.length; i++) {
        if (!characters.includes(subject.charAt(i))) {
            start = i;
            break;
        }
    }

    if (start === -1 || start === subject.length - 1) return EMPTY_STRING;

    for (let i = subject.length - 1; i >= 0; i--) {
        if (!characters.includes(subject[i])) {
            end = i + 1;
            break;
        }
    }

    if (end <= start) return EMPTY_STRING;
    if (start === 0 && end === subject.length) return subject;

    return subject.slice(start, end);
}

export function transformToSpecialCase(subject: string, separator: Separator): string {
    if (separator.length !== 1 || !isSeparator(separator)) {
        throw new Error('[transformToSpecialCase] Invalid separator');
    }

    if (subject.length === 0) return EMPTY_STRING;

    if (subject.length === 1) {
        if (isSeparator(subject)) return EMPTY_STRING;
        return subject.toLowerCase();
    }

    let beforeIsSpecialCharacter: boolean = false;
    let beforeIsUpperCase: boolean = false;
    let beforeIsSeparator: boolean = true;
    const lengthMinus1 = subject.length - 1;

    const processedStrings: string[] = [];

    pyRange(lengthMinus1).forEach((i) => {
        const currentLetter = subject[i];

        // * Case: Special character
        if (isSpaceOrSpecialCharacter(currentLetter)) {
            beforeIsSpecialCharacter = true;
            beforeIsUpperCase = false;

            if (isSeparator(currentLetter)) {
                if (beforeIsSeparator) return;

                beforeIsSeparator = true;
                return processedStrings.push(separator);
            }

            beforeIsSeparator = false;
            return processedStrings.push(currentLetter);
        }

        beforeIsSeparator = false;

        // * Case: Lower case
        if (!isUpperCase(currentLetter)) {
            beforeIsSpecialCharacter = false;
            beforeIsUpperCase = false;
            return processedStrings.push(currentLetter);
        }

        // * Case: Upper case
        const letterLower = currentLetter.toLowerCase();

        if (beforeIsSpecialCharacter || (beforeIsUpperCase && isUpperCase(subject[i + 1]))) {
            beforeIsSpecialCharacter = false;
            beforeIsUpperCase = true;
            return processedStrings.push(letterLower);
        }

        beforeIsSpecialCharacter = false;
        beforeIsUpperCase = true;
        return processedStrings.push(separator + letterLower);
    });

    processedStrings.push(
        mkResult(() => {
            const currentLetter = subject[lengthMinus1];

            // * Case: Special character
            if (isSpaceOrSpecialCharacter(currentLetter)) {
                if (isSeparator(currentLetter)) return separator;
                return currentLetter;
            }

            // * Case: Lower case
            if (!isUpperCase(currentLetter)) return currentLetter;

            // * Case: Upper case
            const letterLower = currentLetter.toLowerCase();

            if (beforeIsSpecialCharacter || beforeIsUpperCase) return letterLower;

            return separator + letterLower;
        }),
    );

    return strip(processedStrings.join(EMPTY_STRING), separator);
}

export function transformToCamelCase(subject: string) {
    return transformToPascalCamelCase(subject, false);
}

export function transformToPascalCase(subject: string) {
    return transformToPascalCamelCase(subject, true);
}

export function transformToKebabCase(subject: string): string {
    return transformToSpecialCase(subject, '-');
}

export function transformToSnakeCase(subject: string): string {
    return transformToSpecialCase(subject, '_');
}

export function transformToTitleCase(subject: string, separator: ' ' | '-' | '_' = ' '): string {
    if (!isSeparator(separator) || separator.length !== 1) {
        throw new Error(
            `[transformToTitleCase] separator must be one of ${SEPARATORS.map((v) =>
                String.fromCharCode(v),
            ).join('|')} `,
        );
    }
    let beforeIsSeparator: boolean = true;

    const processedStrings: string[] = transformToSpecialCase(subject, separator).split(
        EMPTY_STRING,
    );

    for (let i = 0; i < processedStrings.length; i++) {
        if (processedStrings[i] === separator) {
            beforeIsSeparator = true;
            continue;
        }

        if (beforeIsSeparator) {
            processedStrings[i] = processedStrings[i].toUpperCase();
        }

        beforeIsSeparator = false;
    }

    return processedStrings.join(EMPTY_STRING);
}

export type ReplaceRangeConfig = {
    start: number;
    end: number;
    value: string;
};
function isValidReplaceRangeArgs(args: ReplaceRangeConfig[], max: number) {
    if (args[0].start < 0) return false;
    if (args[args.length - 1].end > max) return false;

    let previous: number = 0;

    for (const { start, end } of args) {
        if (start > end || previous > start) return false;

        previous = end;
    }

    return true;
}

export function replaceRange(subject: string, args: ReplaceRangeConfig[]) {
    if (args.length === 0) return subject;

    const argsCopy = [...args];

    argsCopy.sort(({ start: a }, { start: b }) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    if (!isValidReplaceRangeArgs(argsCopy, subject.length)) {
        throw new Error('[replaceRange] Invalid args');
    }

    const results: string[] = [];
    let previous: number = 0;

    for (const { start, end, value: newValue } of argsCopy) {
        results.push(subject.slice(previous, start));
        results.push(newValue);
        previous = end;
    }

    if (previous < subject.length) {
        results.push(subject.slice(previous, subject.length));
    }

    return results.join('');
}

export const StrKits = Object.freeze({
    isUpperCase,
    isSpecialCharacter,
    strip,
    removedMultiplesCharacters,
    replaceRange,
    transform: Object.freeze({
        toCamelCase: transformToCamelCase,
        toPascalCase: transformToPascalCase,
        toKebabCase: transformToKebabCase,
        toSnakeCase: transformToSnakeCase,
        toTitleCase: transformToTitleCase,
        toSpecialCase: transformToSpecialCase,
    }),
});

export default StrKits;
