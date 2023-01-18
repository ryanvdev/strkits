# Table of contents

1. [Table of contents](#table-of-contents)
2. [API](#api)
3. [`StrKits.isUpperCase()`](#strkitsisuppercase)
4. [`StrKits.isSpecialCharacter()`](#strkitsisspecialcharacter)
5. [`StrKits.strip(subject: string, characters: string | string[] | Readonly<string[]>)`](#strkitsstripsubject-string-characters-string--string--readonlystring)
6. [`StrKits.removedMultiplesCharacters()`](#strkitsremovedmultiplescharacters)
7. [`StrKits.replaceRange()`](#strkitsreplacerange)
8. [`StrKits.transform`](#strkitstransform)
   1. [`StrKits.transform.toCamelCase()`](#strkitstransformtocamelcase)
   2. [`StrKits.transform.toPascalCase()`](#strkitstransformtopascalcase)
   3. [`StrKits.transform.toKebabCase()`](#strkitstransformtokebabcase)
   4. [`StrKits.transform.toSnakeCase()`](#strkitstransformtosnakecase)
   5. [`StrKits.transform.toTitleCase()`](#strkitstransformtotitlecase)
   6. [`StrKits.transform.toSpecialCase()`](#strkitstransformtospecialcase)



# API

# `StrKits.isUpperCase()`

```ts

```

# `StrKits.isSpecialCharacter()`

```ts

```

# `StrKits.strip(subject: string, characters: string | string[] | Readonly<string[]>)`

Work like `String strip()` in `python`. See [Python String strip() Method](https://www.w3schools.com/python/ref_string_strip.asp)

```ts
import StrKits, { strip } from 'strkits';
const txt:string = ",,,,,rrttgg.....banana....rrr"

console.log(StrKits.strip(txt, ",.grt"));
// banana

console.log(strip(txt, ",.grt"));
// banana

```

# `StrKits.removedMultiplesCharacters()`

```ts

```

# `StrKits.replaceRange()`

```ts

```


# `StrKits.transform`

## `StrKits.transform.toCamelCase()`

```ts

```

## `StrKits.transform.toPascalCase()`

```ts

```

## `StrKits.transform.toKebabCase()`

```ts

```

## `StrKits.transform.toSnakeCase()`

```ts

```

## `StrKits.transform.toTitleCase()`

```ts

```

## `StrKits.transform.toSpecialCase()`

```ts

```