# Email Cleaner

What's the difference between `johnsmith@gmail.com`, `john.smith@gmail.com`, `J.o.h.n.S.m.i.t.h@gmail.com`, and `johnsmith+anything@gmail`? To the email server, there is none! They'd all send to the same email addresses! 

Users can take advantage of these tricks to create multiple account with email addresses that will still send to the same account.

However, most backend developer like myself are probably really lazy to even check that stuff. They probably do `SELECT * FROM USER WHERE email=johnsmith@gmail.com` or `User.find({email: req.body.email})` thus sneakily allowing cheeky users to slip through the cracks. With Email Cleaner it'll prevent users from doing so. Just use it before you send a request to the server, or before you insert it into the database

Feel free to contribute to this project! It's open for pull requests and issues!
https://github.com/destroyer22719/email-cleaner

# Table of Contents
- [How to Use](#how-to-use)
- [Documentation](#documentation)
    - [email: string](#email-string)
    - [configuration](#configuration)
        - [validate: boolean](#validate-boolean)
        - [validator: Regex](#validatorregex-regex)
        - [defaultOptions: options](#defaultoptions-options)
        - [excluedDomains: string[]](#excludeddomains-string)
        - [cases: caseOptions[]](#cases-caseoptions)
        - [overrideDefaultCases: boolean](#overridedefaultcases-boolean)
        - [options (type)](#options-type)
        - [caseOptions (type)](#caseoptions-type)
# How to Use

Using this module is super simple! It has been tested on NodeJS version `12.0.0` and above.

installation:

npm: `npm install email-cleaner`

yarn: `yarn add email-cleaner`

```javascript
const emailCleaner = require("email-cleaner"); //CommonJS
import emailCleaner from "email-cleaner"; //ES Module

emailCleaner("John.Smith@gmail.com") // johnsmith@gmail.com
emailCleaner("john.smith@gmail.com") //returns johnsmith@gmail.com
emailCleaner("John.Smith+123@gmail.com") //returns johnsmith@gmail.com
emailCleaner("J.o.h.n.S.m.i.t.h+123@gmail.com") //returns johnsmith@gmail.com
```

# Documentation

```javascript
emailCleaner(email, [configuration])
```
returns type `string`, or `null` when email address doesn't match Regex and `validate` configuration has been set to true (by default it's set to false)

**Reminder:** By default it won't clean email addresses with periods unless if it's `gmail.com`. Since it appears in `outlook.com`/`hotmail.com`, and `yahoo.com` emails periods do matter. You can override this by setting [defaultOptions](#defaultoptions-options). `+` signs also won't be cleaned by default on `yahoo.com` as it seems to not work. 
## `email: string`
**Required**

email/string for the function to clean

## `configuration`
**Optional**

**All configurations are optional and are set to the default if not defined, see below for more details**

set options that allows you to control how this module works

```javascript
    validate?: boolean,
    validatorRegex?: RegExp,
    excludedDomains?: string[],
    defaultOptions?: options,
    cases?: caseOptions[],
    overrideDefaultCases?: boolean,
```

### `validate: boolean`

**default:** `false`

Define whether or not you want the string to be validated. If it doesn't match, it'll return null. Else returns string.

### `validatorRegex: Regex`

**default:** `/^(?!\.)[a-z0-9\.\-\+]+@([a-z]+)(\.[a-z]+)+$/i`

**explaination**:
Includes case insensitivity*,

`^(?!\.)`: Cannot start with a `.`

`[a-z0-9\.\-\+]+`: Include all letters, numbers, `-`, `.`, and `+` one or more times

`@([a-z]+)`: an `@` followed by any letter one or more times

`(\.[a-z]+)+$`: proceeding and/or end with a `.` and any letter. Eg. `.com`, `school.edu.com`, etc.


Set your own custom Regular Expression to validate
### `defaultOptions: options`
See the `options` type [here](#options-type)

Set options for email cleaning. Applies to any domain unless if specified in [cases](#cases-caseoptions)
### `excludedDomains: string[]`

**default:** `[]`

a string on domains to exclude from cleaning. 
**Note:** Don't include the `@` sign in array of strings 

**default:**
```javascript
    defaultOptions: {
        caseSensitive: true,
        periods: false,
        plusSign: true,
    },
```
### `cases: caseOptions[]`

Sets the options on what should be cleaned if there are any matches of email domain. See [caseOptions](#caseoptions-type) for further information on configuring. 

**default:**
```javascript
    defaultCases: [
        {
            domains: ["gmail.com"],
            options: {
                caseSensitive: true,
                periods: true,
                plusSign: true,
            }
        },
        {
            domains: ["outlook.com, hotmail.com"],
            options: {
                caseSensitive: true,
                periods: false,
                plusSign: true,
            }
        },
        {
            domains: ["yahoo.com"],
            options: {
                caseSensitive: true,
                periods: false,
                plusSign: false,
            }
        }
    ]
```

Any domains written on the `cases` array that matches the `defaultCases` array will be overwitten, with the larger the index of the index having their option specified to their domain used. **DO NOT** change the `defaultCases` array. If you want to remove it look at [overrideDefaultCases](#overridedefaultcases-boolean)

**Note:** After a few experiments. Removing the `.` for email providers doesn't work for email providers that aren't `gmail.com`. Thus the `periods` option has been set to gmail domains only. It appears with yahoo a `youremail+anything@yahoo.com` doesn't work either, thus `plusSign` has been set to false as well as `periods`.

### `overrideDefaultCases: boolean`
**default:** `false`

This will remove the [defaultCases](#cases-caseoptions) above. Set to `true` if you wish to remove them.
### `options` (type)
(type used in [defaultOptions](#defaultoptions-options) and [caseOptions.options](#caseoptions-type))
```javascript
    caseSensitive?: boolean,
    periods?: boolean,
    plusSign?: boolean,
```
**`caseSensitive:`**
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
**`periods:`**
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

**`plusSign:`**
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

### `caseOptions` (type)
Used in `cases` in the [configuration](#cases-caseoptions)
```javascript
    domains: string[],
    options: options
```

**`domains:`**
A list of domains you want include and apply `options` for, do not use the `@` sign.

**Example**
`domains: ["test.com", "other.com"]`


See the [options](#options-type) type above to apply these options on the matching domain
