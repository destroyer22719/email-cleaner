import { options, defaultConfigurations, configuration } from './types';

//cleans the email with the given options
const compileEmail = (email: string, option: options): string => {
    const {caseSensitive, periods, plusSign} = option;
    if (caseSensitive) email = email.toLowerCase();
    if (periods) {
        let newEmail = email.split("@");
        newEmail[0] = newEmail[0].replace(/\./g, "");
        email = newEmail.join("@");
    };
    if (plusSign) email = email.replace(/\+[a-z0-9\-]+/i, "");
    return email;
};

//generates configurations based new and old configurations
const parseConfigurations = (newOptions: configuration, originalOptions: configuration = defaultConfigurations): configuration => {
    const endOptions: configuration = {...originalOptions, ...newOptions}
    endOptions.defaultCases = newOptions.overrideDefaultCases ? [] : [...originalOptions.defaultCases!]
    endOptions.cases = newOptions.cases || undefined;
    return endOptions;
};

//returns options when domain match case, else returns default options
const parseOptions = (emailDomain: string | undefined, settings: configuration = defaultConfigurations): options => {
    settings = parseConfigurations(settings);
    
    const defaultCases = settings.defaultCases?.map(({domains}) => domains);
    const defaultIndices = defaultCases?.map((domain, index) => ({
        match: domain.lastIndexOf(emailDomain!),
        index
    })) || [];

    const defaultMatch = defaultIndices.filter(({match}) => match !== -1);
    
    const domainCases = settings.cases?.map(({domains}) => domains);
    const indices = domainCases?.map((domain, index) => ({
        match: domain.lastIndexOf(emailDomain!),
        index
    })) || [];

    const match = indices.filter(({match}) => match !== -1);

    if (match.length) {
        return settings.cases![indices.length -1].options;
    } else if (defaultMatch.length) {
        return settings.defaultCases![defaultMatch[defaultMatch.length - 1].index].options
    };
    return settings.defaultOptions!;
}

//main function, takes in an email as a string and configuration

/**
 * Function to output cleaned email
 * @param {string} email Email to clean
 * @param {object} options  Object to configure the behaviour of function, see documentation at https://github.com/destroyer22719/email-cleaner#documentation
 * @returns {(string|null)} returns string, null if email is invalid
 */

const cleanEmail = (email: string, options: configuration = defaultConfigurations): string | null => {
    options = parseConfigurations(options);
    const {excludedDomains, validatorRegex, validate, defaultOptions} = options;

    if (!email.match(validatorRegex!) && validate) return null
    if (!email.match("@")) return compileEmail(email, defaultOptions!);
    if (excludedDomains!.indexOf(email.split("@")[1].toLowerCase()) === -1) {
        if (validate && email.match(validatorRegex!)) {
            return compileEmail(email, parseOptions(email.split("@")[1].toLowerCase(), options));
        }
        return compileEmail(email, parseOptions(email.split("@")[1].toLowerCase(), options))
    } 
    return email;
}

export = cleanEmail;