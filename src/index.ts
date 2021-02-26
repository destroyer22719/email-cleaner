import { options, defaultConfigurations, configuration } from './types';



const compileEmail = (email: string, option: options): string => {
    const {caseSensitive, periods, plusSign} = option;
    if (caseSensitive) email = email.toLowerCase();
    if (periods) {
        let newEmail = email.split("@");
        email
        newEmail[0] = newEmail[0].replace(/\./g, "");
        email = newEmail.join("@");
    };
    if (plusSign) email = email.replace(/\+[a-z0-9]+/i, "");
    return email;
};

const parseConfigurations = (newOptions: configuration, originalOptions: configuration = defaultConfigurations): configuration => {
    const endOptions: configuration = {...originalOptions, ...newOptions}
    endOptions.cases = newOptions.overrideDefaultCases? [...newOptions.cases!] : [...originalOptions.cases!, ...newOptions.cases || []]
    return endOptions;
};

const parseOptions = (emailDomain: string | undefined, settings: configuration = defaultConfigurations): options => {
    settings = parseConfigurations(settings);
    const domainCases = settings.cases?.map(({domains}) => domains);
    const indices = domainCases?.map(s => s.lastIndexOf(emailDomain!)) || [];
    const match = indices.filter(x => x !== -1);
    if (match.length) {
        return settings.cases![indices.length -1].options;
    };
    return settings.defaultOptions!;
}

const cleanEmail = (email: string, options: configuration = defaultConfigurations): string | null => {
    options = parseConfigurations(options);
    const {excludedDomains, validatorRegex, validate, defaultOptions} = options;


    if (!email.match(validatorRegex!) && validate) return null
    if (!email.match("@")) return compileEmail(email, defaultOptions!);
    if (excludedDomains!.indexOf(email.split("@")[1].toLowerCase()) === -1) {
        if (validate) {
            if (email.match(validatorRegex!)) {
                return compileEmail(email, parseOptions(email.split("@")[1].toLowerCase(), options));
            } else {
                return null;
            }
        }
        return compileEmail(email, parseOptions(email.split("@")[1].toLowerCase(), options))
    } 
    return email;
}

export = cleanEmail;