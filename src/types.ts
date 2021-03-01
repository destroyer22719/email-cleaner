export interface configuration {
    validate?: boolean,
    validatorRegex?: RegExp,
    overrideDefaultCases?: boolean,
    excludedDomains?: string[],
    defaultOptions?: options,
    defaultCases?: caseOptions[],
    cases?: caseOptions[],
}

export interface caseOptions {
    domains: string[],
    options: options
}

export interface options {
    caseSensitive?: boolean,
    periods?: boolean,
    plusSign?: boolean,
}

export const defaultConfigurations: configuration = {
    validate: false,
    validatorRegex: /^(?!\.)[a-z0-9\.\-\+]+@([a-z]+)(\.[a-z]+)+$/i,
    overrideDefaultCases: false,
    excludedDomains: [],
    defaultOptions: {
        caseSensitive: true,
        periods: false,
        plusSign: true,
    },
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
    ],
    cases: []
}