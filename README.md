# Email Cleaner

What's the difference between `johnsmith@gmail.com`, `JohnSmith@gmail.com`, `john.smith@gmail.com`, `J.o.h.n.S.m.i.t.h@gmail.com`, and `johnsmith+anything@gmail`? To the email server there is none! They'd all send to the same email addresses! However, most backend developer like myself are probably really lazy and check that stuff. They probably do `SELECT * FROM USER WHERE email=john.smith@gmail.com` or `User.find({email: req.body.email})` thus leazily allowing cheeky users to slip through the cracks. With Email Cleaner it'll prevent users from doing so.

# How to Use

Using this module is super simple! 

```javascript
const emailClean = require("email-cleaner"); //CommonJS
import emailClean from "email-cleaner"; //ES Module

emailClean("John.Smith@gmail.com") // johnsmith@gmail.com
```

# Documentation

```javascript
emailClean(email, [configuration])
```

## `email`
**Required**
email string for the function to clean

## `configuration`
**Optional**
**All configurations are optional and are set to the default if not defined**

set options that allows you to control how this module works

```typescript
    validate?: boolean,
    validatorRegex?: RegExp,
    excludedDomains?: string[],
    defaultOptions?: options,
    cases?: caseOptions[],
    overrideDefaultCases?: boolean,

```

### `validate: boolean`

**default:** `false`

Define whether or not you want the string to be validated. If set to true it's invalid from the regular expression it will return `null`, else return a string

### `validateorRegex: Regex`

**default:** `/^(?!\.)[a-z0-9\.\-\+]+@([a-z]+)(\.[a-z]+)+$/i`

**explaination**:
Includes case insensitivity
`^(?!\.)`: Cannot start with a `.`
`[a-z0-9\.\-\+]+`: Include all letters, numbers, `-`, `.`, and `+` one or more times
`@([a-z]+)`: an `@` followed by any letter
`(\.[a-z]+)+$`: followed by and/or end with a `.` and any letter. Eg. `.com`, `school.edu.com`, etc.

Set your own custom Regular Expression to validate, use custom at own risk. 

### `excludedDomains: string[]`

**default:** `[] (None)`

a string on domains to exclude from cleaning. 
**Note:** Don't include the `@` sign in array of strings 

### `defaultOptions:[options](#options)`
**default:**
```javascript
    defaultOptions: {
        caseSensitive: true,
        periods: false,
        plusSign: true,
    },
```
Set options for email cleaning. Applies to any domain unless if specified in `cases`

### `cases: caseOptions`
***default:**
```javascript
    cases: [
        {
            domains: ["gmail.com", "hotmail.com", "outlook.com"],
            options: {
                caseSensitive: true,
                periods: true,
                plusSign: true,
            }
        }
    ]
```
**Note:** After a few experiments on some corporate and school emails removing periods will result in sending an email to a user that doesn't exist, thus that wasn't in the default configuration and only applies to the most popular email domains on websites.


### Options (type)
(type used in `defaultOptions` and `caseOptions.options`)
```typescript
    caseSensitive?: boolean,
    periods?: boolean,
    plusSign?: boolean,
```
**`caseSensitive`**
cleans emails and converts letters all to lowercase

**Example**
```javascript
emailClean("JohnSmith@gmail.com", {
    defaultOptions: {
        caseSensitive: true //default
    }
}) // johnsmith@gmail.com

emailClean("JohnSmith@gmail.com", {
    defaultOptions: {
        caseSensitive: false
    }
}) // JohnSmith@gmail.com
```
**`periods`**
cleans emails and removes `.` if set to true

**Example**
```javascript
emailClean("john.smith@gmail.com", {
    defaultOptions: {
        periods: true
    }
}) // johnsmith@gmail.com

emailClean("john.smith@gmail.com", {
    defaultOptions: {
        periods: false //default
    }
}) // john.smith@gmail.com
```

**`plusSign`**
cleans emails and removes the `+` character and anything between it and an `@` if set to true

**Example**
```javascript
emailClean("johnsmith+anything@gmail.com", {
    defaultOptions: {
        plusSign: true //default
    }
}) // johnsmith@gmail.com

emailClean("john.smith+anything@gmail.com", {
    defaultOptions: {
        plusSign: false
    }
}) // john.smith+anything@gmail.com
```

### caseOptions (type)
Used in `cases` in the configuration
```typescript
    domains: string[],
    options: options
```

**`domains`**
A list of domains you want include and apply `options` for

**Example**
`domains: ["test.com", "other.com"]`


See the [options](#Options) type above to apply these options on the matching domain
