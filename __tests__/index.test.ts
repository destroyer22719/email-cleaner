import { cleanEmailSync } from "../src/index";
import { configuration } from "../src/types";

describe("testing default configurations", () => {
    test("invalid email", () => {
        expect(cleanEmailSync("John.Smith+helloworld")).toEqual("john.smith")
    })
    test("normal", () => {
        expect(cleanEmailSync("johnsmith@test.com")).toEqual("johnsmith@test.com");
    });

    test("capital", () => {
        expect(cleanEmailSync("JohnSmith@test.com")).toEqual("johnsmith@test.com");    
    });

    test("periods", () => {
        expect(cleanEmailSync("john.smith@test.com")).toEqual("john.smith@test.com");
    });

    test("plus signs", () => {
        expect(cleanEmailSync("johnsmith+helloworld@test.com")).toEqual("johnsmith@test.com");
    });

    test("capital, periods", () => {
        expect(cleanEmailSync("John.Smith@test.com")).toEqual("john.smith@test.com");
    });

    test("capital, plus signs", () => {
        expect(cleanEmailSync("JohnSmith+helloworld@test.com")).toEqual("johnsmith@test.com");
    });

    test("periods, plus signs", () => {
        expect(cleanEmailSync("john.smith+helloworld@test.com")).toEqual("john.smith@test.com")
    });

    test("capital, periods, plus signs", () => {
        expect(cleanEmailSync("John.Smith+helloworld@test.com")).toEqual("john.smith@test.com");
    });
});

describe("testing default domainCases", () => {
    describe("testing on default gmail domains", () => {
        test("invalid email", () => {
            expect(cleanEmailSync("!John.Smith+helloworld@gmail.com")).toEqual("!johnsmith@gmail.com")
        });
    
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@gmail.com")).toEqual("johnsmith@gmail.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@gmail.com")).toEqual("johnsmith@gmail.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@gmail.com")).toEqual("johnsmith@gmail.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@gmail.com")).toEqual("johnsmith@gmail.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@gmail.com")).toEqual("johnsmith@gmail.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("JohnSmith+helloworld@gmail.com")).toEqual("johnsmith@gmail.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("john.smith+helloworld@gmail.com")).toEqual("johnsmith@gmail.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@gmail.com")).toEqual("johnsmith@gmail.com");
        });
    });

    describe("testing on outlook and hotmail domains", () => {
        test("invalid email", () => {
            expect(cleanEmailSync("!John.Smith+helloworld@hotmail.com")).toEqual("!john.smith@hotmail.com")
        });
    
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@hotmail.com")).toEqual("johnsmith@hotmail.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@hotmail.com")).toEqual("johnsmith@hotmail.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@hotmail.com")).toEqual("john.smith@hotmail.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@hotmail.com")).toEqual("johnsmith@hotmail.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@hotmail.com")).toEqual("john.smith@hotmail.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("JohnSmith+helloworld@hotmail.com")).toEqual("johnsmith@hotmail.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("john.smith+helloworld@hotmail.com")).toEqual("john.smith@hotmail.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@hotmail.com")).toEqual("john.smith@hotmail.com");
        });
        test("invalid email", () => {
            expect(cleanEmailSync("!John.Smith+helloworld@hotmail.com")).toEqual("!john.smith@hotmail.com")
        });
    
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@hotmail.com")).toEqual("johnsmith@hotmail.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@hotmail.com")).toEqual("johnsmith@hotmail.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@hotmail.com")).toEqual("john.smith@hotmail.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@hotmail.com")).toEqual("johnsmith@hotmail.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@hotmail.com")).toEqual("john.smith@hotmail.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("JohnSmith+helloworld@hotmail.com")).toEqual("johnsmith@hotmail.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("john.smith+helloworld@hotmail.com")).toEqual("john.smith@hotmail.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@hotmail.com")).toEqual("john.smith@hotmail.com");
        });
    });

    describe("testing on yahoo domains", () => {
        test("invalid email", () => {
            expect(cleanEmailSync("!John.Smith+helloworld@yahoo.com")).toEqual("!john.smith+helloworld@yahoo.com")
        });
    
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@yahoo.com")).toEqual("johnsmith@yahoo.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@yahoo.com")).toEqual("johnsmith@yahoo.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@yahoo.com")).toEqual("john.smith@yahoo.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@yahoo.com")).toEqual("johnsmith+helloworld@yahoo.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@yahoo.com")).toEqual("john.smith@yahoo.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("JohnSmith+helloworld@yahoo.com")).toEqual("johnsmith+helloworld@yahoo.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("john.smith+helloworld@yahoo.com")).toEqual("john.smith+helloworld@yahoo.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@yahoo.com")).toEqual("john.smith+helloworld@yahoo.com");
        });
    });
});

describe("testing configuration {validate: true}", () => {
    const settings: configuration = {validate: true}; 

    test("invalid email", () => {
        expect(cleanEmailSync("!John.Smith+helloworld@gmail.com", settings)).toBeNull()
    });

    test("normal", () => {
        expect(cleanEmailSync("johnsmith@gmail.com", settings)).toEqual("johnsmith@gmail.com");
    });

    test("capital", () => {
        expect(cleanEmailSync("JohnSmith@gmail.com", settings)).toEqual("johnsmith@gmail.com");    
    });

    test("periods", () => {
        expect(cleanEmailSync("john.smith@gmail.com", settings)).toEqual("johnsmith@gmail.com");
    });

    test("plus signs", () => {
        expect(cleanEmailSync("johnsmith+helloworld@gmail.com", settings)).toEqual("johnsmith@gmail.com");
    });

    test("capital, periods", () => {
        expect(cleanEmailSync("John.Smith@gmail.com", settings)).toEqual("johnsmith@gmail.com");
    });

    test("capital, plus signs", () => {
        expect(cleanEmailSync("JohnSmith+helloworld@gmail.com", settings)).toEqual("johnsmith@gmail.com");
    });

    test("periods, plus signs", () => {
        expect(cleanEmailSync("john.smith+helloworld@gmail.com", settings)).toEqual("johnsmith@gmail.com")
    });

    test("capital, periods, plus signs", () => {
        expect(cleanEmailSync("John.Smith+helloworld@gmail.com", settings)).toEqual("johnsmith@gmail.com");
    });
});

describe("testing defaultOptions configuration changes", () => {
    describe("testing caseSensitive: false, periods: false, plusSign: false", () => {
        const settings: configuration = {
            defaultOptions: {
                caseSensitive: false,
                periods: false,
                plusSign: false,
            },
        };

        test("invalid email", () => {
            expect(cleanEmailSync("John.Smith+helloworld", settings)).toEqual("John.Smith+helloworld")
        })
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@test.com", settings)).toEqual("JohnSmith@test.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@test.com", settings)).toEqual("john.smith@test.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@test.com", settings)).toEqual("johnsmith+helloworld@test.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@test.com", settings)).toEqual("John.Smith@test.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("JohnSmith+helloworld@test.com", settings)).toEqual("JohnSmith+helloworld@test.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("john.smith+helloworld@test.com", settings)).toEqual("john.smith+helloworld@test.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@test.com", settings)).toEqual("John.Smith+helloworld@test.com");
        });
    });

    describe("testing caseSensitive: false, periods: true, plusSign: false", () => {
        const settings: configuration = {
            defaultOptions: {
                caseSensitive: false,
                periods: true,
                plusSign: false,
            },
        };
        
        test("invalid email", () => {
            expect(cleanEmailSync("John.Smith+helloworld", settings)).toEqual("JohnSmith+helloworld")
        })
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@test.com", settings)).toEqual("JohnSmith@test.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@test.com", settings)).toEqual("johnsmith+helloworld@test.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@test.com", settings)).toEqual("JohnSmith@test.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("JohnSmith+helloworld@test.com", settings)).toEqual("JohnSmith+helloworld@test.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("john.smith+helloworld@test.com", settings)).toEqual("johnsmith+helloworld@test.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@test.com", settings)).toEqual("JohnSmith+helloworld@test.com");
        });
    });

    describe("testing caseSensitive: false, periods: false, plusSign: true", () => {
        const settings: configuration = {
            defaultOptions: {
                caseSensitive: false,
                periods: false,
                plusSign: true,
            },
        };

        test("invalid email", () => {
            expect(cleanEmailSync("John.Smith+helloworld", settings)).toEqual("John.Smith")
        })
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@test.com", settings)).toEqual("JohnSmith@test.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@test.com", settings)).toEqual("john.smith@test.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@test.com", settings)).toEqual("John.Smith@test.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("JohnSmith+helloworld@test.com", settings)).toEqual("JohnSmith@test.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("john.smith+helloworld@test.com", settings)).toEqual("john.smith@test.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@test.com", settings)).toEqual("John.Smith@test.com");
        });
    });

    describe("testing caseSensitive: true, periods: true, plusSign: false", () => {
        const settings: configuration = {
            defaultOptions: {
                caseSensitive: true,
                periods: true,
                plusSign: false,
            },
        };

        test("invalid email", () => {
            expect(cleanEmailSync("John.Smith+helloworld", settings)).toEqual("johnsmith+helloworld")
        })
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@test.com", settings)).toEqual("johnsmith@test.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@test.com", settings)).toEqual("johnsmith+helloworld@test.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("JohnSmith+helloworld@test.com", settings)).toEqual("johnsmith+helloworld@test.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("john.smith+helloworld@test.com", settings)).toEqual("johnsmith+helloworld@test.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@test.com", settings)).toEqual("johnsmith+helloworld@test.com");
        });
    });

    describe("testing caseSensitive: true, periods: true, plusSign: true", () => {
        const settings: configuration = {
            defaultOptions: {
                caseSensitive: true,
                periods: true,
                plusSign: true,
            },
        };

        test("invalid email", () => {
            expect(cleanEmailSync("!John.Smith+helloworld@test.com", settings)).toEqual("!johnsmith@test.com")
        });
    
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@test.com", settings)).toEqual("johnsmith@test.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("JohnSmith+helloworld@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("john.smith+helloworld@test.com", settings)).toEqual("johnsmith@test.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@test.com", settings)).toEqual("johnsmith@test.com");
        });
    });

    describe("testing caseSensitive: true, periods: false, plusSign: true", () => {
        const settings: configuration = {
            defaultOptions: {
                caseSensitive: true,
                periods: false,
                plusSign: true,
            },
        };

        test("invalid email", () => {
            expect(cleanEmailSync("!John.Smith+helloworld@test.com", settings)).toEqual("!john.smith@test.com")
        });
    
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@test.com", settings)).toEqual("johnsmith@test.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@test.com", settings)).toEqual("john.smith@test.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@test.com", settings)).toEqual("john.smith@test.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("JohnSmith+helloworld@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("john.smith+helloworld@test.com", settings)).toEqual("john.smith@test.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@test.com", settings)).toEqual("john.smith@test.com");
        });
    });
});

describe("testing excludedDoains changes", () => {
    const settings: configuration = {
        excludedDomains: ["test.com"]
    };

    test("invalid email", () => {
        expect(cleanEmailSync("John.Smith+helloworld", settings)).toEqual("john.smith")
    })
    test("normal", () => {
        expect(cleanEmailSync("johnsmith@test.com", settings)).toEqual("johnsmith@test.com");
    });

    test("capital", () => {
        expect(cleanEmailSync("JohnSmith@test.com", settings)).toEqual("JohnSmith@test.com");    
    });

    test("periods", () => {
        expect(cleanEmailSync("john.smith@test.com", settings)).toEqual("john.smith@test.com");
    });

    test("plus signs", () => {
        expect(cleanEmailSync("johnsmith+helloworld@test.com", settings)).toEqual("johnsmith+helloworld@test.com");
    });

    test("capital, periods", () => {
        expect(cleanEmailSync("John.Smith@test.com", settings)).toEqual("John.Smith@test.com");
    });

    test("capital, plus signs", () => {
        expect(cleanEmailSync("JohnSmith+helloworld@test.com", settings)).toEqual("JohnSmith+helloworld@test.com");
    });

    test("periods, plus signs", () => {
        expect(cleanEmailSync("john.smith+helloworld@test.com", settings)).toEqual("john.smith+helloworld@test.com")
    });

    test("capital, periods, plus signs", () => {
        expect(cleanEmailSync("John.Smith+helloworld@test.com", settings)).toEqual("John.Smith+helloworld@test.com");
    });
});

describe("testing overrideDefaultCases changes", () => {
    const settings: configuration = {
        overrideDefaultCases: true
    }

    test("invalid email", () => {
        expect(cleanEmailSync("John.Smith+helloworld", settings)).toEqual("john.smith")
    })
    test("normal", () => {
        expect(cleanEmailSync("johnsmith@gmail.com", settings)).toEqual("johnsmith@gmail.com");
    });

    test("capital", () => {
        expect(cleanEmailSync("JohnSmith@gmail.com", settings)).toEqual("johnsmith@gmail.com");    
    });

    test("periods", () => {
        expect(cleanEmailSync("john.smith@gmail.com", settings)).toEqual("john.smith@gmail.com");
    });

    test("plus signs", () => {
        expect(cleanEmailSync("johnsmith+helloworld@gmail.com", settings)).toEqual("johnsmith@gmail.com");
    });

    test("capital, periods", () => {
        expect(cleanEmailSync("John.Smith@gmail.com", settings)).toEqual("john.smith@gmail.com");
    });

    test("capital, plus signs", () => {
        expect(cleanEmailSync("JohnSmith+helloworld@gmail.com", settings)).toEqual("johnsmith@gmail.com");
    });

    test("periods, plus signs", () => {
        expect(cleanEmailSync("john.smith+helloworld@gmail.com", settings)).toEqual("john.smith@gmail.com")
    });

    test("capital, periods, plus signs", () => {
        expect(cleanEmailSync("John.Smith+helloworld@gmail.com", settings)).toEqual("john.smith@gmail.com");
    });
})

describe("testing email domain cases", () => {
    describe("new domain", () => {
        const settings: configuration = {
            cases: [
                {
                    domains: ["test.com"],
                    options: {
                        caseSensitive: false,
                        periods: false,
                        plusSign: false,
                    }
                }
            ]
        }
    
        test("invalid email", () => {
            expect(cleanEmailSync("John.Smith+helloworld", settings)).toEqual("john.smith")
        })
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@test.com", settings)).toEqual("johnsmith@test.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@test.com", settings)).toEqual("JohnSmith@test.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@test.com", settings)).toEqual("john.smith@test.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@test.com", settings)).toEqual("johnsmith+helloworld@test.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@test.com", settings)).toEqual("John.Smith@test.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("John.Smith@test.com", settings)).toEqual("John.Smith@test.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith@test.com", settings)).toEqual("John.Smith@test.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@test.com", settings)).toEqual("John.Smith+helloworld@test.com");
        });
    });

    describe("overriding domain cases", () => {
        const settings: configuration = {
            cases: [
                {
                    domains: ["gmail.com"],
                    options: {
                        caseSensitive: false,
                        periods: false,
                        plusSign: false,
                    }
                }
            ]
        }
    
        test("invalid email", () => {
            expect(cleanEmailSync("John.Smith+helloworld", settings)).toEqual("john.smith")
        })
        test("normal", () => {
            expect(cleanEmailSync("johnsmith@gmail.com", settings)).toEqual("johnsmith@gmail.com");
        });
    
        test("capital", () => {
            expect(cleanEmailSync("JohnSmith@gmail.com", settings)).toEqual("JohnSmith@gmail.com");    
        });
    
        test("periods", () => {
            expect(cleanEmailSync("john.smith@gmail.com", settings)).toEqual("john.smith@gmail.com");
        });
    
        test("plus signs", () => {
            expect(cleanEmailSync("johnsmith+helloworld@gmail.com", settings)).toEqual("johnsmith+helloworld@gmail.com");
        });
    
        test("capital, periods", () => {
            expect(cleanEmailSync("John.Smith@gmail.com", settings)).toEqual("John.Smith@gmail.com");
        });
    
        test("capital, plus signs", () => {
            expect(cleanEmailSync("John.Smith@gmail.com", settings)).toEqual("John.Smith@gmail.com");
        });
    
        test("periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith@gmail.com", settings)).toEqual("John.Smith@gmail.com")
        });
    
        test("capital, periods, plus signs", () => {
            expect(cleanEmailSync("John.Smith+helloworld@gmail.com", settings)).toEqual("John.Smith+helloworld@gmail.com");
        });
    });
    
});