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

//generates configurations based on new and old configurations
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
        return settings.defaultCases![defaultMatch[defaultMatch.length - 1].index].options;
    };
    return settings.defaultOptions!;
}

//main synchronous function, takes in an email as a string and configuration

/**
 * Function to output cleaned email and prevent different email inputs going to the same email address
 * @param {string} email Email to clean
 * @param {object} options  Object to configure the behaviour of function, see documentation at https://github.com/destroyer22719/email-cleaner#documentation
 * @returns {(string|null)} returns string, null if email is invalid
 * 
 * @example 
 * emailCleaner("john.smith@gmail.com") //returns johnsmith@gmail.com
 * emailCleaner("John.Smith+123@gmail.com") //returns johnsmith@gmail.com
 * emailCleaner("J.o.h.n.S.m.i.t.h+123@gmail.com") //returns johnsmith@gmail.com
 */

export const cleanEmailSync = (email: string, options: configuration = defaultConfigurations): string | null => {
    options = parseConfigurations(options);
    const {excludedDomains, validatorRegex, validate, defaultOptions} = options;

    if (!email.match(validatorRegex!) && validate) return null;
    if (!email.match("@")) return compileEmail(email, defaultOptions!);
    if (excludedDomains!.indexOf(email.split("@")[1].toLowerCase()) === -1) {
        if (validate && email.match(validatorRegex!)) {
            return compileEmail(email, parseOptions(email.split("@")[1].toLowerCase(), options));
        }
        return compileEmail(email, parseOptions(email.split("@")[1].toLowerCase(), options));
    } 
    return email;
}

//main asynchronous function, takes in an email as a string and configuration and returns a promise with either the cleaned email or rejects if invalid email if settings verify email

/**
 * Function to output cleaned email and prevent different email inputs going to the same email address
 * @param {string} email Email to clean
 * @param {object} options  Object to configure the behaviour of function, see documentation at https://github.com/destroyer22719/email-cleaner#documentation
 * @returns {Promise<(string|null)>} returns string, null if email is invalid
 * 
 * @example 
 * //using async/await
 * await emailCleanerAsync("john.smith@gmail.com") //returns johnsmith@gmail.com
 * 
 * //using then/catch
 * emailCleaner("John.Smith+123@gmail.com")
 *  .then(email => console.log(email))
 *  .catch(() => console.log("Invalid email"))
 * //returns johnsmith@gmail.com
 */


export const cleanEmailAsync = (email: string, options: configuration = defaultConfigurations): Promise<string | null> => {
    options = parseConfigurations(options);
    const {excludedDomains, validatorRegex, validate, defaultOptions} = options;

    return new Promise((resolve, reject) => {
        if (!email.match(validatorRegex!) && validate) reject(null);
        if (!email.match("@")) return compileEmail(email, defaultOptions!);
        if (excludedDomains!.indexOf(email.split("@")[1].toLowerCase()) === -1) {
            if (validate && email.match(validatorRegex!)) {
                return compileEmail(email, parseOptions(email.split("@")[1].toLowerCase(), options));
            }
            return compileEmail(email, parseOptions(email.split("@")[1].toLowerCase(), options));
        } 
        resolve(email);
    })
}