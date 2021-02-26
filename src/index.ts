import { options, defaultConfigurations, configuration } from './types';



const compileEmail = (email: string, option: options): string => {
    const {caseSensitive, periods, plusSign} = option;
    console.log(option)
    if (caseSensitive) email = email.toLowerCase();
    if (periods) email = email.replace(".", "");
    if (plusSign) email = email.replace(/\+[a-z0-9]+/i, "");
    return email;
};

const parseConfigurations = (newOptions: configuration, originalOptions: configuration = defaultConfigurations): configuration => {
    const endOptions: configuration = {...originalOptions, ...newOptions}
    endOptions.cases = newOptions.overrideDefaultCases? [...newOptions.cases!] : [...originalOptions.cases!]
    return endOptions;
};

const parseOptions = (emailDomain: string, settings: configuration = defaultConfigurations): options => {
    settings = parseConfigurations(settings);
    const domainCases = settings.cases?.map(({domain}) => domain);
    const indices = domainCases?.map(s => s.lastIndexOf(emailDomain)) || [];

    if (indices.length) {
        return settings.cases![indices.length -1].options
    }
    
    return settings.defaultOptions!
}

const cleanEmail = (email: string, options: configuration = defaultConfigurations): string | null => {
    options = parseConfigurations(options);
    const {excludedDomains, validateorRegex, validate} = options;

    if (excludedDomains!.indexOf(email.split("@")[1].toLowerCase()) === -1) {
        if (validate) {
            if (email.match(validateorRegex!)) {
                return compileEmail(email, parseOptions(email.split("@")[1].toLowerCase(), options));
            } else {
                return null;
            }
        }
        return compileEmail(email, parseOptions(email.split("@")[1].toLowerCase(), options))
    } 
    return email;
}

export default cleanEmail;