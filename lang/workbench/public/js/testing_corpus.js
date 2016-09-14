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

window.MAL.test.corpus =
[
    /* Assignment: Decimal integer / unary negation */
    {"title": "a=0",            "program": "a=0",           "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=1",            "program": "a=1",           "expectedResult": {"a":1},      "expectToFail": false},
    {"title": "a=10",           "program": "a=10",          "expectedResult": {"a":10},     "expectToFail": false},
    {"title": "a=-0",           "program": "a=-0",          "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=-1",           "program": "a=-1",          "expectedResult": {"a":-1},     "expectToFail": false},
    {"title": "a=-10",          "program": "a=-10",         "expectedResult": {"a":-10},    "expectToFail": false},
    
    {"title": "a=00",           "program": "a=00",          "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=01",           "program": "a=01",          "expectedResult": {"a":1},      "expectToFail": false},
    {"title": "a=001",          "program": "a=001",         "expectedResult": {"a":1},      "expectToFail": false},
    {"title": "a=-00",          "program": "a=-00",         "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=-01",          "program": "a=-01",         "expectedResult": {"a":-1},     "expectToFail": false},
    {"title": "a=-001",         "program": "a=-001",        "expectedResult": {"a":-1},     "expectToFail": false},
    
    /* Assignment: Hexadecimal integer / unary negation */
    {"title": "a=0x0",          "program": "a=0x0",         "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=0x1",          "program": "a=0x1",         "expectedResult": {"a":1},      "expectToFail": false},
    {"title": "a=0x2",          "program": "a=0x2",         "expectedResult": {"a":2},      "expectToFail": false},
    {"title": "a=0x4",          "program": "a=0x4",         "expectedResult": {"a":4},      "expectToFail": false},
    {"title": "a=0xa",          "program": "a=0xa",         "expectedResult": {"a":10},     "expectToFail": false},
    {"title": "a=0xA",          "program": "a=0xA",         "expectedResult": {"a":10},     "expectToFail": false},
    {"title": "a=0xAa",         "program": "a=0xAa",        "expectedResult": {"a":170},    "expectToFail": false},
    {"title": "a=0xaA",         "program": "a=0xaA",        "expectedResult": {"a":170},    "expectToFail": false},
    {"title": "a=0x10",         "program": "a=0x10",        "expectedResult": {"a":16},     "expectToFail": false},
    
    {"title": "a=-0x0",         "program": "a=-0x0",        "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=-0x1",         "program": "a=-0x1",        "expectedResult": {"a":-1},     "expectToFail": false},
    {"title": "a=-0x2",         "program": "a=-0x2",        "expectedResult": {"a":-2},     "expectToFail": false},
    {"title": "a=-0x4",         "program": "a=-0x4",        "expectedResult": {"a":-4},     "expectToFail": false},
    {"title": "a=-0xa",         "program": "a=-0xa",        "expectedResult": {"a":-10},    "expectToFail": false},
    {"title": "a=-0xA",         "program": "a=-0xA",        "expectedResult": {"a":-10},    "expectToFail": false},
    {"title": "a=-0xAa",        "program": "a=-0xAa",       "expectedResult": {"a":-170},   "expectToFail": false},
    {"title": "a=-0xaA",        "program": "a=-0xaA",       "expectedResult": {"a":-170},   "expectToFail": false},
    {"title": "a=-0x10",        "program": "a=-0x10",       "expectedResult": {"a":-16},    "expectToFail": false},
    
    {"title": "a=0x00",         "program": "a=0x00",        "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=0x000",        "program": "a=0x000",       "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=0x01",         "program": "a=0x01",        "expectedResult": {"a":1},      "expectToFail": false},
    {"title": "a=0x001",        "program": "a=0x001",       "expectedResult": {"a":1},      "expectToFail": false},
    {"title": "a=0x0a",         "program": "a=0x0a",        "expectedResult": {"a":10},     "expectToFail": false},
    {"title": "a=0x00a",        "program": "a=0x00a",       "expectedResult": {"a":10},     "expectToFail": false},
    {"title": "a=0x0A",         "program": "a=0x0A",        "expectedResult": {"a":10},     "expectToFail": false},
    {"title": "a=0x00A",        "program": "a=0x00A",       "expectedResult": {"a":10},     "expectToFail": false},
    
    {"title": "a=-0x00",        "program": "a=-0x00",       "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=-0x000",       "program": "a=-0x000",      "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=-0x01",        "program": "a=-0x01",       "expectedResult": {"a":-1},     "expectToFail": false},
    {"title": "a=-0x001",       "program": "a=-0x001",      "expectedResult": {"a":-1},     "expectToFail": false},
    {"title": "a=-0x0a",        "program": "a=-0x0a",       "expectedResult": {"a":-10},    "expectToFail": false},
    {"title": "a=-0x00a",       "program": "a=-0x00a",      "expectedResult": {"a":-10},    "expectToFail": false},
    {"title": "a=-0x0A",        "program": "a=-0x0A",       "expectedResult": {"a":-10},    "expectToFail": false},
    {"title": "a=-0x00A",       "program": "a=-0x00A",      "expectedResult": {"a":-10},    "expectToFail": false},
    
    /* Assignment: Binary integer / unary negation*/
    {"title": "a=0b0",          "program": "a=0b0",         "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=0b1",          "program": "a=0b1",         "expectedResult": {"a":1},      "expectToFail": false},
    {"title": "a=0b10",         "program": "a=0b10",        "expectedResult": {"a":2},      "expectToFail": false},
    {"title": "a=0b11",         "program": "a=0b11",        "expectedResult": {"a":3},      "expectToFail": false},
    {"title": "a=0b100",        "program": "a=0b100",       "expectedResult": {"a":4},      "expectToFail": false},
    {"title": "a=0b101",        "program": "a=0b101",       "expectedResult": {"a":5},      "expectToFail": false},
    {"title": "a=0b110",        "program": "a=0b110",       "expectedResult": {"a":6},      "expectToFail": false},
    {"title": "a=0b111",        "program": "a=0b111",       "expectedResult": {"a":7},      "expectToFail": false},

    {"title": "a=-0b0",         "program": "a=-0b0",        "expectedResult": {"a":0},      "expectToFail": false},
    {"title": "a=-0b1",         "program": "a=-0b1",        "expectedResult": {"a":-1},     "expectToFail": false},
    {"title": "a=-0b10",        "program": "a=-0b10",       "expectedResult": {"a":-2},     "expectToFail": false},
    {"title": "a=-0b11",        "program": "a=-0b11",       "expectedResult": {"a":-3},     "expectToFail": false},
    {"title": "a=-0b100",       "program": "a=-0b100",      "expectedResult": {"a":-4},     "expectToFail": false},
    {"title": "a=-0b101",       "program": "a=-0b101",      "expectedResult": {"a":-5},     "expectToFail": false},
    {"title": "a=-0b110",       "program": "a=-0b110",      "expectedResult": {"a":-6},     "expectToFail": false},
    {"title": "a=-0b111",       "program": "a=-0b111",      "expectedResult": {"a":-7},     "expectToFail": false},

    /* Assignment: Invalid integer numbers */
    {"title": "a=2a",           "program": "a=2a",          "expectedResult": null,         "expectToFail": true},
    {"title": "a=a2",           "program": "a=a2",          "expectedResult": null,         "expectToFail": true},
    {"title": "a=2 1",          "program": "a=2 1",         "expectedResult": null,         "expectToFail": true},
    {"title": "a=2x1",          "program": "a=2x1",         "expectedResult": null,         "expectToFail": true},
    
    /* Assignment: Floating point numbers */
    
    /* Assignment: Invalid floating point numbers */
    
    /* Assignment: Space insertion */
    
    /* Assignment: Invalid space insertion */
    
    /* Assignment: Operator: + */
    {"title": "a=3+1",          "program": "a=3+1",         "expectedResult": {"a":4},      "expectToFail": false}
]
