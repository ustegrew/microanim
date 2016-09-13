/**
 * Default test corpus for MAL
 */
if (typeof window.MAL == "undefined")
{
    window.MAL = 
    {
        test:
        {
            defaultCorpus: []
        }
    };
}

window.MAL.test.defaultCorpus =
[
    {
        "title":             "a=0",
        "program":           "a=0",
        "expectedResult":    {"a":0},
        "expectToFail":      false
    },
    {
        "title":             "a=1",
        "program":           "a=1",
        "expectedResult":    {"a":1},
        "expectToFail":      false
    },
    {
        "title":             "a=10",
        "program":           "a=10",
        "expectedResult":    {"a":10},
        "expectToFail":      false
    },
    {
        "title":             "a=-0",
        "program":           "a=-0",
        "expectedResult":    {"a":0},
        "expectToFail":      false
    },
    {
        "title":             "a=-1",
        "program":           "a=-1",
        "expectedResult":    {"a":-1},
        "expectToFail":      false
    },
    {
        "title":             "a=-10",
        "program":           "a=-10",
        "expectedResult":    {"a":-10},
        "expectToFail":      false
    },
    {
        "title":             "a=0x0",
        "program":           "a=0x0",
        "expectedResult":    {"a":0},
        "expectToFail":      false
    },
    {
        "title":             "a=0x1",
        "program":           "a=0x1",
        "expectedResult":    {"a":1},
        "expectToFail":      false
    },
    {
        "title":             "a=0x2",
        "program":           "a=0x2",
        "expectedResult":    {"a":2},
        "expectToFail":      false
    },
    {
        "title":             "a=0x4",
        "program":           "a=0x4",
        "expectedResult":    {"a":4},
        "expectToFail":      false
    },
    {
        "title":             "a=0xa",
        "program":           "a=0xa",
        "expectedResult":    {"a":10},
        "expectToFail":      false
    },
    {
        "title":             "a=0xA",
        "program":           "a=0xA",
        "expectedResult":    {"a":10},
        "expectToFail":      false
    },
    {
        "title":             "a=0x10",
        "program":           "a=0x10",
        "expectedResult":    {"a":16},
        "expectToFail":      false
    },

    {
        "title":             "a=3+1",
        "program":           "a=3+1",
        "expectedResult":    {"a":4},
        "expectToFail":      false
    }
]