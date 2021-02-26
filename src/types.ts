export interface configuration {
    validate?: boolean,
    validateorRegex?: RegExp,
    overrideDefaultCases?: boolean,
    excludedDomains?: string[],
    defaultOptions?: options,
    cases?: caseOptions[],
}

export interface caseOptions {
    domain: string[],
    options: options
}

export interface options {
    caseSensitive?: boolean,
    periods?: boolean,
    plusSign?: boolean,
}

export const defaultConfigurations: configuration = {
    validate: false,
    validateorRegex: /^[a-z0-9\.\-\+]+@([a-z]+)(\.[a-z]+)+$/i,
    overrideDefaultCases: false,
    excludedDomains: [],
    defaultOptions: {
        caseSensitive: true,
        periods: false,
        plusSign: false,
    },
    cases: [
        {
            domain: ["gmail.com", "hotmail.com", "outlook.com"],
            options: {
                caseSensitive: true,
                periods: true,
                plusSign: true,
            }
        }
    ]
}