"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var aux;
        (function (aux) {
            var storage;
            (function (storage) {
                /**
                 * -----------
                 * Head notes:
                 * <pre>
                 * [TArray_100]:    Quickest way according to http://stackoverflow.com/a/1232046. In general,
                 * clearing an array by re-assigning the reference to a new (empty) one won't
                 * actually clear the array elements. Consider this:
                 * var a1 = [0, 1, 2];
                 * var a2 = a1;
                 * a1 = [];
                 * console.log (a2) // Will show: "[0,1,2]"
                 * This would be bad here - however:
                 * -  In this class we ensure that there's ever only one copy of the data store.
                 * -  We declare data store private and don't allow direct access to the store
                 * from outside the class. Whilst this doesn't protect the class when someone
                 * modifies the trans-piled javascript code, it does prevent programmer errors
                 * within the dev environment (which uses Java). If I violate the "private"
                 * qualifier there, then the java environment will flag such attempts as a
                 * compiler error. Meaning - insiginificant security when dealing with the
                 * javascript output, but significant safety during dev. We are protected from
                 * the developer's mistakes, but not from the developer's irresponsibility.
                 * </pre>
                 * @author Peter Hoppe
                 */
                var TArray = (function () {
                    function TArray() {
                        this.fValues = new Array(0);
                    }
                    TArray.prototype.Clear = function () {
                        this.fValues = new Array(0);
                    };
                    TArray.prototype.Dequeue = function () {
                        var ar;
                        var ret;
                        this._AssertHasElements();
                        ar = this.fValues;
                        ret = ar.shift();
                        return ret;
                    };
                    TArray.prototype.Enqueue = function (obj) {
                        var ar;
                        ar = this.fValues;
                        ar.unshift(obj);
                    };
                    TArray.prototype.GetElementByIndex = function (i) {
                        var ret;
                        this._AssertInRange(i);
                        ret = this.fValues[i];
                        return ret;
                    };
                    TArray.prototype.GetNumElements = function () {
                        return this.fValues.length;
                    };
                    TArray.prototype.Pop = function () {
                        var ar;
                        var ret;
                        this._AssertHasElements();
                        ar = this.fValues;
                        ret = ar.pop();
                        return ret;
                    };
                    TArray.prototype.Push = function (obj) {
                        var ar;
                        ar = this.fValues;
                        ar.push(obj);
                    };
                    /**
                     *
                     */
                    TArray.prototype._AssertHasElements = function () {
                        if (this.fValues.length <= 0) {
                            throw new RangeError("Array is empty. Can\'t delete any elements.");
                        }
                    };
                    TArray.prototype._AssertInRange = function (i) {
                        if (this.fValues.length <= 0) {
                            throw new RangeError("Array is empty. Can\'t retrieve any elements.");
                        }
                        else if (i < 0) {
                            throw new RangeError("Index too small. Must be in range: [0, " + this.fValues.length + "[. Given: " + i);
                        }
                        else if (i >= this.fValues.length) {
                            throw new RangeError("Index too large. Must be in range: [0, " + this.fValues.length + "[. Given: " + i);
                        }
                    };
                    return TArray;
                }());
                storage.TArray = TArray;
            })(storage = aux.storage || (aux.storage = {}));
        })(aux = framework.aux || (framework.aux = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var aux;
        (function (aux) {
            var json;
            (function (json) {
                var validation;
                (function (validation) {
                    /**
                     * @author peter
                     * @see    https://github.com/cincheo/jsweet/issues/144
                     */
                    var TValidatorJSON = (function () {
                        function TValidatorJSON(schema) {
                            var imjv;
                            microanim.framework.system.TExtDependency.AssertHasGlobalDependency("isMyJsonValid", "Is-My-Json-Valid");
                            this.fOptions = new Object();
                            this.fOptions["verbose"] = true;
                            this.fSchema = schema;
                            imjv = window["isMyJsonValid"];
                            this.fValidator = imjv.call(window, this.fSchema, this.fOptions);
                        }
                        TValidatorJSON.prototype.Validate = function (oJS) {
                            var hasPassed;
                            var i;
                            var errors;
                            var erx;
                            var ret;
                            ret = new microanim.framework.aux.storage.TArray();
                            hasPassed = this.fValidator.call(window, oJS);
                            if (!hasPassed) {
                                errors = this.fValidator["errors"];
                                for (i = 0; i < errors.length; i++) {
                                    erx = new microanim.framework.aux.json.validation.TValidatorJSONErr(errors[i]);
                                    ret.Enqueue(erx);
                                }
                            }
                            return ret;
                        };
                        return TValidatorJSON;
                    }());
                    validation.TValidatorJSON = TValidatorJSON;
                })(validation = json.validation || (json.validation = {}));
            })(json = aux.json || (aux.json = {}));
        })(aux = framework.aux || (framework.aux = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var gfx;
        (function (gfx) {
            var sys;
            (function (sys) {
                /**
                 * The graphics viewport. Binds to a a HTML element on the hosting web page.
                 * It's best to bind this viewport to a <code>DIV</code> element. Graphics will
                 * be drawn inside the hosting element, i.e. any graphics (part) outside
                 * the geometric bounds of the hosting element will not draw.
                 *
                 * @author Peter Hoppe
                 */
                var TViewport = (function () {
                    function TViewport(id) {
                        var h;
                        var w;
                        this.fGraphics = document.getElementById(id);
                        if (this.fGraphics == null) {
                            this.fDimensions = new microanim.framework.gfx.geom.primitives.TRectangle(0, 0, this.fGraphics.clientWidth, this.fGraphics.clientHeight);
                        }
                        else {
                            throw new Error("Canvas element does not exist: " + id);
                        }
                    }
                    TViewport.prototype.Clear = function () {
                    };
                    TViewport.prototype.Draw = function (res) {
                    };
                    return TViewport;
                }());
                sys.TViewport = TViewport;
            })(sys = gfx.sys || (gfx.sys = {}));
        })(gfx = framework.gfx || (framework.gfx = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var program;
        (function (program) {
            /**
             * @author peter
             */
            var TCompiler = (function () {
                function TCompiler() {
                }
                TCompiler.Parse = function (prog, sProg, sLang) {
                    var ret;
                    ret = TCompiler._Parse(prog, sProg, sLang);
                    return ret;
                };
                TCompiler._Parse = function (prog, sProg, sLang) {
                    var globalValidator;
                    var localValidators;
                    var v;
                    var sl;
                    var i;
                    var keys;
                    var k;
                    var p;
                    var cSchema;
                    var ret;
                    microanim.framework.system.TLogger.Message("TCompiler::_Parse", "Reading JSON schemata...");
                    globalValidator = new microanim.framework.aux.json.validation.TValidatorJSON(sProg);
                    localValidators = new microanim.framework.aux.storage.TCollection();
                    sl = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(sLang, "$.commands");
                    keys = Object.getOwnPropertyNames(sl);
                    if (keys.length >= 1) {
                        for (i = 0; i < keys.length; i++) {
                            k = keys[i];
                            p = "$.commands." + k;
                            cSchema = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(sLang, p);
                            v = new microanim.framework.aux.json.validation.TValidatorJSON(cSchema);
                            localValidators.Add(k, v);
                        }
                    }
                    microanim.framework.system.TLogger.Message("TCompiler::_Parse", "Parsing program...");
                    TCompiler._AssertValid(prog, globalValidator, localValidators);
                    ret = new microanim.framework.program.TProgram();
                    TCompiler._ReadResources(ret, prog);
                    TCompiler._ReadSteps(ret, prog);
                    return ret;
                };
                TCompiler._AssertValid = function (prog, globalValidator, localValidators) {
                    var descr;
                    var i;
                    var d;
                    var k;
                    var v;
                    TCompiler._AssertValid_Work(globalValidator, prog);
                    descr = microanim.framework.aux.json.path.TJSONPathQuery.Query(prog, "$.program.*");
                    if (descr.length >= 1) {
                        for (i = 0; i < descr.length; i++) {
                            d = descr[i];
                            k = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(d, "$.cmd");
                            v = localValidators.GetElementByKey(k);
                            TCompiler._AssertValid_Work(v, d);
                        }
                    }
                };
                TCompiler._AssertValid_Work = function (v, o) {
                    var i;
                    var err;
                    var erx;
                    var msg;
                    var nErr;
                    err = v.Validate(o);
                    nErr = err.GetNumElements();
                    if (nErr >= 1) {
                        microanim.framework.system.TLogger.Fatal("TCompiler::_AssertValid_Work", "Validation error on object", o, false);
                        msg = "TCompiler::_AssertValid_DumpErrors: Given program failed validation. Specifics:\n";
                        for (i = 0; i < nErr; i++) {
                            erx = err.GetElementByIndex(i);
                            msg += erx.GetDump();
                            if (i < nErr - 1) {
                                msg += "\n";
                            }
                        }
                        throw new SyntaxError(msg);
                    }
                };
                TCompiler._ReadResources = function (oProg, prog) {
                    var descr;
                    descr = microanim.framework.aux.json.path.TJSONPathQuery.Query(prog, "$.resources.images.*");
                    microanim.framework.system.TLogger.Message("TCompiler::_ReadResources", "Got image descriptors", descr);
                    TCompiler._ReadResources_Add(oProg, descr, microanim.framework.program.res.EResType.kImage);
                };
                TCompiler._ReadResources_Add = function (oProg, descr, type) {
                    var i;
                    var dRef;
                    var vrRef;
                    var store;
                    var typeID;
                    typeID = microanim.framework.program.res.VResourceRef.GetResTypeID(type);
                    store = new microanim.framework.aux.storage.TArray();
                    if (descr.length >= 1) {
                        for (i = 0; i < descr.length; i++) {
                            dRef = descr[i];
                            vrRef = microanim.framework.program.res.VResourceRef.Create(type, dRef);
                            store.Push(vrRef);
                        }
                    }
                    oProg.AddRefStore(typeID, store);
                };
                TCompiler._ReadSteps = function (oProg, prog) {
                    var descr;
                    var i;
                    var d;
                    var c;
                    descr = microanim.framework.aux.json.path.TJSONPathQuery.Query(prog, "$.program.*");
                    microanim.framework.system.TLogger.Message("TCompiler::_ReadSteps", "Got program descriptor", descr);
                    if (descr.length >= 1) {
                        for (i = 0; i < descr.length; i++) {
                            d = descr[i];
                            c = microanim.framework.program.lang.VCommand.Create(d);
                            oProg.AddStep(c);
                        }
                    }
                };
                return TCompiler;
            }());
            program.TCompiler = TCompiler;
        })(program = framework.program || (framework.program = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var system;
        (function (system) {
            /**
             * @author peter
             */
            var TLogger = (function () {
                function TLogger() {
                }
                TLogger.Fatal$java_lang_String$java_lang_String$boolean = function (origin, msg, showMsgBox) {
                    TLogger._Fatal(origin, msg, null, null, showMsgBox);
                };
                TLogger.Fatal$java_lang_String$java_lang_String$java_lang_Object$boolean = function (origin, msg, err, showMsgBox) {
                    TLogger._Fatal(origin, msg, err, null, showMsgBox);
                };
                TLogger.Fatal = function (origin, msg, oSubject, err, showMsgBox) {
                    if (((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && ((oSubject != null) || oSubject === null) && ((err != null) || err === null) && ((typeof showMsgBox === 'boolean') || showMsgBox === null)) {
                        return (function () {
                            TLogger._Fatal(origin, msg, err, oSubject, showMsgBox);
                        })();
                    }
                    else if (((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && ((oSubject != null) || oSubject === null) && ((typeof err === 'boolean') || err === null) && showMsgBox === undefined) {
                        return microanim.framework.system.TLogger.Fatal$java_lang_String$java_lang_String$java_lang_Object$boolean(origin, msg, oSubject, err);
                    }
                    else if (((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && ((typeof oSubject === 'boolean') || oSubject === null) && err === undefined && showMsgBox === undefined) {
                        return microanim.framework.system.TLogger.Fatal$java_lang_String$java_lang_String$boolean(origin, msg, oSubject);
                    }
                    else
                        throw new Error('invalid overload');
                };
                TLogger.Message$java_lang_String$java_lang_String = function (origin, msg) {
                    var m;
                    m = TLogger._GetMsg(origin, msg, "LOG", null, null);
                    console.log(m);
                };
                TLogger.Message = function (origin, msg, oSubject) {
                    if (((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && ((oSubject != null) || oSubject === null)) {
                        return (function () {
                            var m;
                            m = TLogger._GetMsg(origin, msg, "LOG", oSubject, null);
                            console.log(m);
                        })();
                    }
                    else if (((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && oSubject === undefined) {
                        return microanim.framework.system.TLogger.Message$java_lang_String$java_lang_String(origin, msg);
                    }
                    else
                        throw new Error('invalid overload');
                };
                TLogger.Warn$java_lang_String$java_lang_String = function (origin, msg) {
                    var m;
                    m = TLogger._GetMsg(origin, msg, "WARNING", null, null);
                    console.warn(m);
                };
                TLogger.Warn = function (origin, msg, oSubject) {
                    if (((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && ((oSubject != null) || oSubject === null)) {
                        return (function () {
                            var m;
                            m = TLogger._GetMsg(origin, msg, "WARNING", oSubject, null);
                            console.warn(m);
                        })();
                    }
                    else if (((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && oSubject === undefined) {
                        return microanim.framework.system.TLogger.Warn$java_lang_String$java_lang_String(origin, msg);
                    }
                    else
                        throw new Error('invalid overload');
                };
                TLogger._Fatal = function (origin, msg, err, oSubject, showMsgBox) {
                    var mTerse;
                    var mDetail;
                    mDetail = TLogger._GetMsg(origin, msg, "FATAL", oSubject, err);
                    console.error(mDetail);
                    if (showMsgBox) {
                        mTerse = TLogger._GetMsg(origin, msg, "FATAL", null, null);
                        mTerse += "\n\nSee your browser\'s web console for further details.\n";
                        alert(mTerse);
                    }
                };
                TLogger._GetMsg = function (origin, msg, prologue, oSubject, err) {
                    var now;
                    var dt;
                    var ret;
                    now = new Date();
                    dt = now.toISOString();
                    if (origin != null) {
                        ret = origin + ": " + prologue + ": " + dt + ": " + msg;
                    }
                    else {
                        ret = prologue + ": " + dt + ": " + msg;
                    }
                    if (err != null) {
                        ret += "\n--------------\n";
                        ret += "Error details:\n";
                        ret += "--------------\n";
                        ret += microanim.framework.system.TDebug.GetStringified(err, false);
                    }
                    if (oSubject != null) {
                        ret += "\n-------\n";
                        ret += "Object:\n";
                        ret += "-------\n";
                        ret += microanim.framework.system.TDebug.GetStringified(oSubject);
                    }
                    return ret;
                };
                return TLogger;
            }());
            system.TLogger = TLogger;
        })(system = framework.system || (framework.system = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var system;
        (function (system) {
            /**
             * @author peter
             */
            var TDebug = (function () {
                function TDebug() {
                }
                TDebug.DebuggerTrap = function () {
                    eval("debugger;");
                };
                TDebug.GetStringified$java_lang_Object = function (o) {
                    var ret;
                    ret = TDebug._GetStringified(o, false);
                    return ret;
                };
                TDebug.GetStringified = function (o, doSuppressNull) {
                    if (((o != null) || o === null) && ((typeof doSuppressNull === 'boolean') || doSuppressNull === null)) {
                        return (function () {
                            var ret;
                            ret = TDebug._GetStringified(o, doSuppressNull);
                            return ret;
                        })();
                    }
                    else if (((o != null) || o === null) && doSuppressNull === undefined) {
                        return microanim.framework.system.TDebug.GetStringified$java_lang_Object(o);
                    }
                    else
                        throw new Error('invalid overload');
                };
                /**
                 * Returns a dump of an object as string. Dump is pretty printed.
                 * Method will also stringify objects of type Error.
                 *
                 * @param o     The error object to be dumped.
                 * @return      The dump, in JSON format.
                 * @see         http://stackoverflow.com/a/20405830
                 */
                TDebug._GetStringified = function (o, doSuppressNull) {
                    var kReplEv = ["bubbles", "cancelBubble", "cancelable", "defaultPrevented", "eventPhase", "isTrusted", "returnValue", "target", "timeStamp", "type"];
                    var copy;
                    var eCast;
                    var nullO;
                    var ret;
                    nullO = null;
                    if (o == null) {
                        ret = doSuppressNull ? "" : "null";
                    }
                    else if (o != null && o instanceof Error) {
                        eCast = o;
                        copy = new Object();
                        copy["message"] = eCast.message;
                        copy["name"] = eCast.name;
                        ret = JSON.stringify(copy, nullO, TDebug.kIndentSpaces);
                    }
                    else if (o != null && o instanceof Event) {
                        ret = JSON.stringify(o, kReplEv, TDebug.kIndentSpaces);
                    }
                    else {
                        ret = JSON.stringify(o, nullO, TDebug.kIndentSpaces);
                    }
                    return ret;
                };
                TDebug.kIndentSpaces = 4;
                return TDebug;
            }());
            system.TDebug = TDebug;
        })(system = framework.system || (framework.system = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var gfx;
        (function (gfx) {
            var sys;
            (function (sys) {
                /**
                 * @author Peter Hoppe
                 */
                var TLayer = (function () {
                    function TLayer(host, id) {
                        this.fResources = new microanim.framework.aux.storage.TCollection();
                    }
                    TLayer.prototype.Draw = function (canvas) {
                        var nR;
                        var iR;
                        var r;
                        nR = this.fResources.GetNumElements();
                        if (nR >= 1) {
                            for (iR = 0; iR < nR; iR++) {
                                r = this.fResources.GetElementByIndex(iR);
                                canvas.Draw(r);
                            }
                        }
                    };
                    TLayer.prototype.GetNumResources = function () {
                        return this.fResources.GetNumElements();
                    };
                    TLayer.prototype.GetResourceByIndex = function (i) {
                        var ret;
                        ret = this.fResources.GetElementByIndex(i);
                        return ret;
                    };
                    /**
                     * @param res
                     */
                    TLayer.prototype.Resource_GFX_Add = function (res) {
                        var key;
                        key = res.GetID();
                        this.fResources.Add(key, res);
                    };
                    return TLayer;
                }());
                sys.TLayer = TLayer;
            })(sys = gfx.sys || (gfx.sys = {}));
        })(gfx = framework.gfx || (framework.gfx = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var program;
        (function (program) {
            var res;
            (function (res) {
                (function (EResType) {
                    EResType[EResType["kImage"] = 0] = "kImage";
                })(res.EResType || (res.EResType = {}));
                var EResType = res.EResType;
            })(res = program.res || (program.res = {}));
        })(program = framework.program || (framework.program = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var res;
        (function (res) {
            (function (EResType) {
                EResType[EResType["kImage"] = 0] = "kImage";
            })(res.EResType || (res.EResType = {}));
            var EResType = res.EResType;
        })(res = framework.res || (framework.res = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var controller;
        (function (controller) {
            /**
             * @author Peter Hoppe
             */
            var TController = (function () {
                function TController(host) {
                    this.fHost = host;
                    this.fQueue = new microanim.framework.aux.storage.TArray();
                    this.fState = TController.EState.kNull;
                }
                TController.prototype.OnProgramStart = function () {
                    if (this.fState === TController.EState.kNull) {
                        this.fState = TController.EState.kStart;
                        this._Run();
                    }
                };
                TController.prototype._Dbg_ReportEvent = function (stateOld, stateNew, event, isValid) {
                    if (TController.kDoDebug) {
                        if (isValid) {
                            console.log("T_CTRL_Controller::Transition (valid)  : " + stateOld + " (" + event + ") -> " + stateNew);
                        }
                        else {
                            console.log("T_CTRL_Controller::Transition (invalid): " + stateOld + " (" + event + ")");
                        }
                    }
                };
                TController.prototype._DoCycle = function () {
                    var ev;
                    var nEv;
                    var stO;
                    var isValid;
                    nEv = this.fQueue.GetNumElements();
                    ev = TController.EEvent.kNull;
                    if (nEv >= 1) {
                        ev = this.fQueue.Dequeue();
                        stO = this.fState;
                        switch ((ev)) {
                            default:
                                isValid = true;
                        }
                        this._Dbg_ReportEvent(stO, this.fState, ev, isValid);
                    }
                };
                TController.prototype._Run = function () {
                    var _this = this;
                    this._DoCycle();
                    window.setTimeout((function () {
                        _this._Run();
                    }), TController.kTCycle);
                };
                TController.kDoDebug = true;
                TController.kTCycle = 100;
                return TController;
            }());
            controller.TController = TController;
            var TController;
            (function (TController) {
                (function (EEvent) {
                    EEvent[EEvent["kNull"] = 0] = "kNull";
                })(TController.EEvent || (TController.EEvent = {}));
                var EEvent = TController.EEvent;
                (function (EState) {
                    EState[EState["kAnimRunning"] = 0] = "kAnimRunning";
                    EState[EState["kNull"] = 1] = "kNull";
                    EState[EState["kStart"] = 2] = "kStart";
                })(TController.EState || (TController.EState = {}));
                var EState = TController.EState;
            })(TController = controller.TController || (controller.TController = {}));
        })(controller = framework.controller || (framework.controller = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var aux;
        (function (aux) {
            var json;
            (function (json) {
                var path;
                (function (path_1) {
                    /**
                     * @author peter
                     */
                    var TJSONPathQuery = (function () {
                        function TJSONPathQuery() {
                        }
                        TJSONPathQuery.Query = function (oSubject, path) {
                            var ret;
                            ret = TJSONPathQuery._Apply("query", oSubject, path);
                            return ret;
                        };
                        TJSONPathQuery.ValueOf = function (oSubject, path) {
                            var ret;
                            ret = TJSONPathQuery._Apply("value", oSubject, path);
                            return ret;
                        };
                        TJSONPathQuery._Apply = function (method, oSubject, arg) {
                            var jp;
                            var func;
                            var ret;
                            microanim.framework.system.TExtDependency.AssertHasGlobalDependency("jsonpath", "JSONPath");
                            jp = window["jsonpath"];
                            func = jp[method];
                            ret = func.call(jp, oSubject, arg);
                            return ret;
                        };
                        return TJSONPathQuery;
                    }());
                    path_1.TJSONPathQuery = TJSONPathQuery;
                })(path = json.path || (json.path = {}));
            })(json = aux.json || (aux.json = {}));
        })(aux = framework.aux || (framework.aux = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var res;
        (function (res) {
            /**
             * @author     Peter Hoppe
             *
             * [100]       Resource loading is asynchronous; therefore we can't handle it the old-style
             * synchronous way ("for each res in resources do: res.Load ()"). Instead we need to
             * issue a LOAD request for each resource and wait for that resource's onLoad
             * confirmation event that it has finished loading. Upon the confirmation event we
             * load the next-in-line resource. Once all resources have loaded we issue a confirmation
             * event to the next higher object (client hosting this resource pack, i.e. the host).
             *
             */
            var TResourcePack = (function () {
                function TResourcePack(t_SCN_Scene) {
                    this.fResources = new microanim.framework.aux.storage.TCollection();
                    this.fState = microanim.framework.res.E_SCN_ResourcePack_State.kInit;
                }
                TResourcePack.prototype.Add = function (r) {
                    var k;
                    k = r.GetID();
                    if (this.fState === microanim.framework.res.E_SCN_ResourcePack_State.kInit) {
                        r.SetHost(this);
                        this.fResources.Add(k, r);
                    }
                    else {
                        throw new Error("Can\'t add more resources once we have called Load ().");
                    }
                };
                /**
                 * @param key
                 * @return
                 */
                TResourcePack.prototype.GetElementByID = function (key) {
                    var ret;
                    ret = this.fResources.GetElementByKey(key);
                    return ret;
                };
                TResourcePack.prototype.GetElementByIndex = function (i) {
                    var ret;
                    ret = this.fResources.GetElementByIndex(i);
                    return ret;
                };
                /**
                 * @return
                 */
                TResourcePack.prototype.GetNumElements = function () {
                    var ret;
                    ret = this.fResources.GetNumElements();
                    return ret;
                };
                TResourcePack.prototype.Load_Exec = function () {
                    var _this = this;
                    var ret;
                    ret = new Promise(function (resolve, reject) {
                        _this._Load().then(function (e) {
                            microanim.framework.system.TLogger.Message("TResourcePack::_Load", "Successfully loaded resources.");
                            resolve(e);
                            return null;
                        }).catch(function (error) {
                            microanim.framework.system.TLogger.Fatal("TResourcePack::_Load", "FAILED to load resources.", error, true);
                            reject(error);
                            return null;
                        });
                    });
                    return ret;
                };
                TResourcePack.prototype._Load = function () {
                    var pR;
                    var p;
                    var i;
                    var n;
                    var r;
                    var ret;
                    n = this.fResources.GetNumElements();
                    pR = new Array();
                    if (n >= 1) {
                        for (i = 0; i < n; i++) {
                            r = this.fResources.GetElementByIndex(i);
                            p = r.Load_Exec();
                            pR.push(p);
                        }
                    }
                    ret = Promise.all((pR));
                    return ret;
                };
                return TResourcePack;
            }());
            res.TResourcePack = TResourcePack;
            (function (E_SCN_ResourcePack_State) {
                E_SCN_ResourcePack_State[E_SCN_ResourcePack_State["kInit"] = 0] = "kInit";
                E_SCN_ResourcePack_State[E_SCN_ResourcePack_State["kLoading"] = 1] = "kLoading";
                E_SCN_ResourcePack_State[E_SCN_ResourcePack_State["kWait"] = 2] = "kWait";
            })(res.E_SCN_ResourcePack_State || (res.E_SCN_ResourcePack_State = {}));
            var E_SCN_ResourcePack_State = res.E_SCN_ResourcePack_State;
        })(res = framework.res || (framework.res = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var program;
        (function (program) {
            /**
             * @author Peter Hoppe
             */
            var TProgram = (function () {
                function TProgram() {
                    this.fSteps = new microanim.framework.aux.storage.TArray();
                    this.fResDescriptors = new microanim.framework.aux.storage.TCollection();
                }
                TProgram.prototype.GetResources = function () {
                    return this.fResDescriptors;
                };
                TProgram.prototype.AddRefStore = function (typeID, store) {
                    this.fResDescriptors.Add(typeID, store);
                };
                TProgram.prototype.AddStep = function (c) {
                    this.fSteps.Push(c);
                };
                return TProgram;
            }());
            program.TProgram = TProgram;
        })(program = framework.program || (framework.program = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var gfx;
        (function (gfx) {
            var geom;
            (function (geom) {
                var primitives;
                (function (primitives) {
                    /**
                     * @author Peter Hoppe
                     */
                    var TCoord2D = (function () {
                        function TCoord2D(x, y) {
                            this.fX = 0;
                            this.fY = 0;
                            this.fX = x;
                            this.fY = y;
                        }
                        TCoord2D.prototype.GetCopy = function () {
                            var ret;
                            ret = new TCoord2D(this.fX, this.fY);
                            return ret;
                        };
                        return TCoord2D;
                    }());
                    primitives.TCoord2D = TCoord2D;
                })(primitives = geom.primitives || (geom.primitives = {}));
            })(geom = gfx.geom || (gfx.geom = {}));
        })(gfx = framework.gfx || (framework.gfx = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var system;
        (function (system) {
            (function (EMimeType) {
                EMimeType[EMimeType["kApplicationJSON"] = 0] = "kApplicationJSON";
                EMimeType[EMimeType["kTextPlain"] = 1] = "kTextPlain";
            })(system.EMimeType || (system.EMimeType = {}));
            var EMimeType = system.EMimeType;
        })(system = framework.system || (framework.system = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var system;
        (function (system) {
            (function (EResponseType) {
                EResponseType[EResponseType["kArrayBuffer"] = 0] = "kArrayBuffer";
                EResponseType[EResponseType["kBlob"] = 1] = "kBlob";
                EResponseType[EResponseType["kDocument"] = 2] = "kDocument";
                EResponseType[EResponseType["kText"] = 3] = "kText";
            })(system.EResponseType || (system.EResponseType = {}));
            var EResponseType = system.EResponseType;
        })(system = framework.system || (framework.system = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var gfx;
        (function (gfx) {
            var sys;
            (function (sys) {
                /**
                 * @author Peter Hoppe
                 */
                var TView = (function () {
                    function TView(idCanvas) {
                        this.fLayers = new microanim.framework.aux.storage.TCollection();
                        this.fCanvas = new microanim.framework.gfx.sys.TViewport(idCanvas);
                    }
                    TView.prototype.Draw = function () {
                        var nL;
                        var iL;
                        var l;
                        this.fCanvas.Clear();
                        nL = this.fLayers.GetNumElements();
                        if (nL >= 1) {
                            for (iL = 0; iL < nL; iL++) {
                                l = this.fLayers.GetElementByIndex(iL);
                                l.Draw(this.fCanvas);
                            }
                        }
                    };
                    /**
                     * @param img
                     * @param idLayer
                     */
                    TView.prototype.Image_Add = function (img, idLayer) {
                        var hasLayer;
                        var l;
                        hasLayer = this.fLayers.HasElement(idLayer);
                        if (!hasLayer) {
                            l = new microanim.framework.gfx.sys.TLayer(this, idLayer);
                            this.fLayers.Add(idLayer, l);
                        }
                        else {
                            l = this.fLayers.GetElementByKey(idLayer);
                        }
                        l.Resource_GFX_Add(img);
                    };
                    TView.prototype.Image_SetPos = function (id, target, isRelative) {
                    };
                    TView.prototype.Image_SetRot = function (id, angle, isRelative) {
                    };
                    TView.prototype.Image_SetScale = function (id, factor, isRelative) {
                    };
                    TView.prototype.Image_SetVisible = function (id, isVisible) {
                    };
                    return TView;
                }());
                sys.TView = TView;
            })(sys = gfx.sys || (gfx.sys = {}));
        })(gfx = framework.gfx || (framework.gfx = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var application;
        (function (application) {
            /**
             * @author Peter Hoppe
             */
            var TApplication = (function () {
                function TApplication(idCanvas) {
                    this.fScene = new microanim.framework.scene.TScene(this, idCanvas);
                    this.fController = new microanim.framework.controller.TController(this);
                    this.fProgram = null;
                }
                TApplication.CreateInstance = function (idCanvas) {
                    if (TApplication.gApplication == null) {
                        TApplication.gApplication = new TApplication(idCanvas);
                    }
                    else {
                        throw new Error("Can\'t create multiple instances of the TApplication class");
                    }
                };
                TApplication.Program_Load = function (prog, sProg, sLang) {
                    return TApplication.gApplication._Program_Load(prog, sProg, sLang);
                };
                TApplication.Resources_Load_Exec = function () {
                    return TApplication.gApplication._Resources_Load_Exec();
                };
                TApplication.prototype._Resources_Load_Exec = function () {
                    return this.fScene.Resources_Load_Exec();
                };
                TApplication.prototype._Program_Load = function (prog, sProg, sLang) {
                    var _this = this;
                    var ret;
                    ret = new Promise(function (resolve, reject) {
                        var descriptors;
                        var dStore;
                        var dTypes;
                        var typeID;
                        var i;
                        var n;
                        if (_this.fProgram == null) {
                            try {
                                _this.fProgram = microanim.framework.program.TCompiler.Parse(prog, sProg, sLang);
                                descriptors = _this.fProgram.GetResources();
                                dTypes = descriptors.GetKeys();
                                n = dTypes.GetNumElements();
                                if (n >= 1) {
                                    for (i = 0; i < n; i++) {
                                        typeID = dTypes.GetElementByIndex(i);
                                        dStore = descriptors.GetElementByKey(typeID);
                                        _this.fScene.RegisterResources(dStore);
                                    }
                                }
                                resolve(null);
                            }
                            catch (e) {
                                microanim.framework.system.TLogger.Fatal("TApplication::Program_Load", "Error whilst loading program", e, false);
                                reject(e);
                            }
                            ;
                        }
                        else {
                            microanim.framework.system.TLogger.Fatal("TApplication::Program_Load", "This application can\'t load a program more than once.", false);
                            reject(null);
                        }
                    });
                    return ret;
                };
                /**
                 *
                 */
                TApplication.prototype.GFX_Refresh = function () {
                    this.fScene.GFX_Refresh();
                };
                TApplication.gApplication = null;
                return TApplication;
            }());
            application.TApplication = TApplication;
        })(application = framework.application || (framework.application = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var res;
        (function (res) {
            /**
             * Please note: The name is prepended with 'A0', so the name of this class
             * is at the top up the alphabet. Thus, JSweet will put this class at the
             * beginning of the compiled Javascript unit. A0_XXXX classes are at the
             * root of our class hierarchy.
             *
             * If we don't have base classes at the top of the Javascript unit then
             * the Javascript unit will throw a rather obscure exception when it's executed:
             *
             * <code>Uncaught TypeError: Cannot read property 'prototype' of undefined</code>
             *
             * I assume, this is because there's some call to x.prototype in the Javascript file,
             * with x being undefined because this class is located below the child class in the
             * generated Javascript file.
             *
             * @author Peter Hoppe
             */
            var VSceneResource = (function () {
                function VSceneResource(id) {
                    this.fID = id;
                    this.fHost = null;
                }
                VSceneResource.prototype.GetID = function () {
                    return this.fID;
                };
                VSceneResource.prototype.SetHost = function (host) {
                    if (this.fHost == null) {
                        this.fHost = host;
                    }
                    else {
                        throw new Error("Host is already set.");
                    }
                };
                return VSceneResource;
            }());
            res.VSceneResource = VSceneResource;
        })(res = framework.res || (framework.res = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var gfx;
        (function (gfx) {
            var primitives;
            (function (primitives) {
                /**
                 * Please note: The name is prepended with 'A1', so the name of this class
                 * is high up the alphabet. Thus, JSweet will put this class at the beginning of the
                 * compiled Javascript unit. A1_XXXX classes inherit from A0_XXXX classes.
                 *
                 * @author Peter Hoppe
                 */
                var VResourceGFX = (function (_super) {
                    __extends(VResourceGFX, _super);
                    /**
                     * @param id
                     */
                    function VResourceGFX(id) {
                        _super.call(this, id);
                    }
                    VResourceGFX.prototype.Draw = function (graphics) {
                        throw new Error("Please override Draw (CanvasRenderingContext2D graphics)");
                    };
                    return VResourceGFX;
                }(microanim.framework.res.VSceneResource));
                primitives.VResourceGFX = VResourceGFX;
            })(primitives = gfx.primitives || (gfx.primitives = {}));
        })(gfx = framework.gfx || (framework.gfx = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var gfx;
        (function (gfx) {
            var primitives;
            (function (primitives) {
                /**
                 * @author Peter Hoppe
                 */
                var TImage = (function (_super) {
                    __extends(TImage, _super);
                    function TImage(id, url) {
                        _super.call(this, id);
                        this.fIsVisible = false;
                        this.fID = id;
                        this.fURL = url;
                        this.fDimensions = new microanim.framework.gfx.geom.primitives.TRectangle(0, 0, 0, 0);
                        this.fIsVisible = false;
                        this.fBitmap = document.createElement("img");
                    }
                    TImage.prototype.Draw = function (graphics) {
                        var lTop;
                        if (this.fIsVisible) {
                            lTop = this.fDimensions.GetCornerLeftTop();
                            graphics.drawImage(this.fBitmap, lTop.fX, lTop.fY);
                        }
                    };
                    TImage.prototype.Load_Exec = function () {
                        var _this = this;
                        var ret;
                        ret = new Promise(function (resolve, reject) {
                            _this.fBitmap.onload = function (e) {
                                _this.fDimensions.SetHeight(_this.fBitmap.naturalHeight);
                                _this.fDimensions.SetWidth(_this.fBitmap.naturalWidth);
                                microanim.framework.system.TLogger.Message("TImage::Load_Exec", "LoadSuccess: \'" + _this.fURL + "\'");
                                resolve(e);
                                return null;
                            };
                            _this.fBitmap.onerror = function (e) {
                                microanim.framework.system.TLogger.Fatal("TImage::Load_Exec", "LoadFailure: \'" + _this.fURL + "\'", e, false);
                                reject(e);
                                return null;
                            };
                            _this.fBitmap.src = _this.fURL;
                        });
                        return ret;
                    };
                    TImage.prototype.SetPosLeftTop = function (x, y) {
                        this.fDimensions.SetLeftTop(x, y);
                    };
                    /**
                     * @param isVisible
                     */
                    TImage.prototype.SetVisible = function (isVisible) {
                        this.fIsVisible = isVisible;
                    };
                    return TImage;
                }(microanim.framework.gfx.primitives.VResourceGFX));
                primitives.TImage = TImage;
            })(primitives = gfx.primitives || (gfx.primitives = {}));
        })(gfx = framework.gfx || (framework.gfx = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var aux;
        (function (aux) {
            var storage;
            (function (storage) {
                /**
                 * @author Peter Hoppe
                 */
                var TCollection = (function () {
                    function TCollection() {
                        this.fHashMap = new Object();
                        this.fValues = new Array(0);
                    }
                    TCollection.prototype.Add = function (key, obj) {
                        var node;
                        this._AssertExistsByKey(key, true);
                        node = new Object();
                        node["value"] = obj;
                        node["i"] = this.fValues.length;
                        node["key"] = key;
                        this.fHashMap[key] = node;
                        this.fValues[this.fValues.length] = node;
                    };
                    TCollection.prototype.Clear = function () {
                        this.fHashMap = new Object();
                        this.fValues = new Array(0);
                    };
                    TCollection.prototype.GetElementByIndex = function (i) {
                        var node;
                        var ret;
                        this._AssertExistsByIndex(i);
                        node = this.fValues[i];
                        ret = node["value"];
                        return ret;
                    };
                    TCollection.prototype.GetElementByKey = function (key) {
                        var node;
                        var ret;
                        this._AssertExistsByKey(key, false);
                        node = this.fHashMap[key];
                        ret = node["value"];
                        return ret;
                    };
                    TCollection.prototype.GetLookup_IndexByKey = function (key) {
                        var node;
                        var ret;
                        this._AssertExistsByKey(key, false);
                        node = this.fHashMap[key];
                        ret = node["i"];
                        return ret;
                    };
                    TCollection.prototype.GetLookup_KeyByIndex = function (i) {
                        var node;
                        var ret;
                        this._AssertExistsByIndex(i);
                        node = this.fValues[i];
                        ret = node["key"];
                        return ret;
                    };
                    TCollection.prototype.GetKeys = function () {
                        var i;
                        var node;
                        var k;
                        var ret;
                        ret = new microanim.framework.aux.storage.TArray();
                        if (this.fValues.length >= 1) {
                            for (i = 0; i < this.fValues.length; i++) {
                                node = this.fValues[i];
                                k = node["key"];
                                ret.Push(k);
                            }
                        }
                        return ret;
                    };
                    TCollection.prototype.GetNumElements = function () {
                        return this.fValues.length;
                    };
                    TCollection.prototype.HasElement = function (key) {
                        var ret;
                        ret = this.fHashMap.hasOwnProperty(key);
                        return ret;
                    };
                    TCollection.prototype._AssertExistsByIndex = function (i) {
                        if ((i < 0) || (i >= this.fValues.length)) {
                            throw new RangeError("Index must be an integer in range: [0, " + this.fValues.length + "[. Given: " + i);
                        }
                    };
                    TCollection.prototype._AssertExistsByKey = function (key, doInvert) {
                        var err;
                        var isOK;
                        isOK = this.fHashMap.hasOwnProperty(key);
                        isOK = doInvert ? (!isOK) : (isOK);
                        if (!isOK) {
                            err = doInvert ? ("Duplicate key: \'" + key + "\'") : ("Non-existant key: \'" + key + "\'");
                            throw new ReferenceError(err);
                        }
                    };
                    return TCollection;
                }());
                storage.TCollection = TCollection;
            })(storage = aux.storage || (aux.storage = {}));
        })(aux = framework.aux || (framework.aux = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var system;
        (function (system) {
            /**
             * @author peter
             */
            var TExtDependency = (function () {
                function TExtDependency() {
                }
                TExtDependency.AssertHasGlobalDependency = function (libID, libName) {
                    var has;
                    has = window.hasOwnProperty(libID);
                    if (!has) {
                        throw new Error("Missing ext. library: \'" + libName + "\'. Needs to be loaded at the start of this program (microanim.framework.system.TExtDependency.LoadJSLibrary()).");
                    }
                };
                TExtDependency.LoadJSLibrary = function (url) {
                    var host;
                    var head;
                    var newScript;
                    var ret;
                    host = window.document;
                    head = host.head;
                    newScript = host.createElement("script");
                    ret = new Promise((function (head, newScript) {
                        return function (resolve, reject) {
                            newScript.onload = function (e) {
                                microanim.framework.system.TLogger.Message("TExtDependencyLoader::LoadJSLibrary", "LoadSuccess: \'" + url + "\'");
                                resolve(e);
                                return null;
                            };
                            newScript.onerror = function (e) {
                                microanim.framework.system.TLogger.Fatal("TExtDependencyLoader::LoadJSLibrary", "Recource: LoadFailure: \'" + url + "\'", e, false);
                                reject(e);
                                return null;
                            };
                            head.appendChild(newScript);
                            newScript.src = url;
                        };
                    })(head, newScript));
                    return ret;
                };
                TExtDependency.LoadText = function (url, mimeType, timeout) {
                    var tout;
                    var xhr;
                    var mt;
                    var ret;
                    tout = (timeout >= 1) ? timeout : TExtDependency.kDefaultTimeout;
                    mt = TExtDependency._GetMimeType(mimeType);
                    xhr = new XMLHttpRequest();
                    xhr.timeout = tout;
                    xhr.overrideMimeType(mt);
                    xhr.open("GET", url);
                    xhr.responseType = "text";
                    ret = new Promise((function (xhr) {
                        return function (resolve, reject) {
                            xhr.onreadystatechange = function (e) {
                                if (xhr.readyState === 4) {
                                    if (xhr.status === 200) {
                                        microanim.framework.system.TLogger.Message("TExtDependencyLoader::LoadText", "Resource: LoadSuccess: \'" + url + "\'");
                                        resolve(xhr.responseText);
                                    }
                                    else {
                                        microanim.framework.system.TLogger.Fatal("TExtDependencyLoader::LoadText", "Recource: LoadFailure (" + xhr.status + "): \'" + url + "\'", e, false);
                                        reject(e);
                                    }
                                }
                                return null;
                            };
                            xhr.onerror = function (e) {
                                microanim.framework.system.TLogger.Fatal("TExtDependencyLoader::LoadText", "Recource: LoadFailure (" + xhr.status + "): \'" + url + "\'", e, false);
                                reject(e);
                                return null;
                            };
                            xhr.ontimeout = function (e) {
                                microanim.framework.system.TLogger.Fatal("TExtDependencyLoader::LoadText", "Recource: LoadFailure (timeout): \'" + url + "\'. Max Load time [ms]: " + tout, e, false);
                                return null;
                            };
                            xhr.send();
                        };
                    })(xhr));
                    return ret;
                };
                TExtDependency._GetMimeType = function (t) {
                    var ret;
                    ret = null;
                    switch ((t)) {
                        case microanim.framework.system.EMimeType.kApplicationJSON:
                            ret = "application/json";
                            break;
                        case microanim.framework.system.EMimeType.kTextPlain:
                            ret = "text/plain";
                            break;
                        default:
                            throw new Error("Unrecognized mime type. ID = " + t);
                    }
                    return ret;
                };
                /**
                 * Reserved for later use.
                 *
                 * @param t
                 * @return
                 */
                TExtDependency._GetResponseType = function (t) {
                    var ret;
                    ret = null;
                    switch ((t)) {
                        case microanim.framework.system.EResponseType.kArrayBuffer:
                            ret = "arraybuffer";
                            break;
                        case microanim.framework.system.EResponseType.kBlob:
                            ret = "blob";
                            break;
                        case microanim.framework.system.EResponseType.kDocument:
                            ret = "document";
                            break;
                        case microanim.framework.system.EResponseType.kText:
                            ret = "text";
                            break;
                        default:
                            throw new Error("Unrecognized response type. ID = " + t);
                    }
                    return ret;
                };
                TExtDependency.kDefaultTimeout = 2000;
                return TExtDependency;
            }());
            system.TExtDependency = TExtDependency;
        })(system = framework.system || (framework.system = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var gfx;
        (function (gfx) {
            var geom;
            (function (geom) {
                var primitives;
                (function (primitives) {
                    /**
                     * @author Peter Hoppe
                     */
                    var TVector2D = (function () {
                        function TVector2D(x, y) {
                            this.fHasChanged = false;
                            this.fLen = 0;
                            this.fP0 = new microanim.framework.gfx.geom.primitives.TCoord2D(x, y);
                            this.fP1 = new microanim.framework.gfx.geom.primitives.TCoord2D(x, y);
                            this.fHasChanged = true;
                            this._ReInit();
                        }
                        TVector2D.prototype.GetLen = function () {
                            return this.fLen;
                        };
                        TVector2D.prototype.GetP0 = function () {
                            var ret;
                            ret = this.fP0.GetCopy();
                            return ret;
                        };
                        TVector2D.prototype.GetP1 = function () {
                            var ret;
                            ret = this.fP1.GetCopy();
                            return ret;
                        };
                        TVector2D.prototype.GetPZeroed = function () {
                            var ret;
                            ret = this.fPZeroed.GetCopy();
                            return ret;
                        };
                        TVector2D.prototype._ReInit = function () {
                            var xDiff;
                            var yDiff;
                            if (this.fHasChanged) {
                                this.fHasChanged = false;
                                xDiff = this.fP1.fX - this.fP0.fX;
                                yDiff = this.fP1.fY = this.fP0.fY;
                                this.fPZeroed = new microanim.framework.gfx.geom.primitives.TCoord2D(xDiff, yDiff);
                                this.fLen = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
                            }
                        };
                        return TVector2D;
                    }());
                    primitives.TVector2D = TVector2D;
                })(primitives = geom.primitives || (geom.primitives = {}));
            })(geom = gfx.geom || (gfx.geom = {}));
        })(gfx = framework.gfx || (framework.gfx = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var aux;
        (function (aux) {
            var json;
            (function (json) {
                var validation;
                (function (validation) {
                    /**
                     * @author peter
                     */
                    var TValidatorJSONErr = (function () {
                        function TValidatorJSONErr(err) {
                            this.fField = err["field"];
                            this.fMessage = err["message"];
                        }
                        TValidatorJSONErr.prototype.GetField = function () {
                            return this.fField;
                        };
                        TValidatorJSONErr.prototype.GetMessage = function () {
                            return this.fMessage;
                        };
                        TValidatorJSONErr.prototype.GetDump = function () {
                            var ret;
                            ret = "\'" + this.fField + "\': " + this.fMessage;
                            return ret;
                        };
                        return TValidatorJSONErr;
                    }());
                    validation.TValidatorJSONErr = TValidatorJSONErr;
                })(validation = json.validation || (json.validation = {}));
            })(json = aux.json || (aux.json = {}));
        })(aux = framework.aux || (framework.aux = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var program;
        (function (program) {
            var res;
            (function (res) {
                /**
                 * @author peter
                 */
                var VResourceRef = (function () {
                    function VResourceRef(t) {
                        this.fType = t;
                    }
                    VResourceRef.GetResTypeID = function (t) {
                        var ret;
                        switch ((t)) {
                            case microanim.framework.program.res.EResType.kImage:
                                ret = "image";
                                break;
                            default:
                                ret = "unknown";
                        }
                        return ret;
                    };
                    VResourceRef.Create = function (t, oRef) {
                        var sD;
                        var ret;
                        switch ((t)) {
                            case microanim.framework.program.res.EResType.kImage:
                                ret = new microanim.framework.program.res.TResourceRefImage(oRef);
                                break;
                            default:
                                sD = microanim.framework.system.TDebug.GetStringified(oRef, false);
                                throw new Error("Unknown resource type (" + t + ") for resource descriptor:\n" + sD);
                        }
                        return ret;
                    };
                    VResourceRef.prototype.GetType = function () {
                        return this.fType;
                    };
                    return VResourceRef;
                }());
                res.VResourceRef = VResourceRef;
            })(res = program.res || (program.res = {}));
        })(program = framework.program || (framework.program = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var program;
        (function (program) {
            var res;
            (function (res) {
                /**
                 * @author peter
                 */
                var TResourceRefImage = (function (_super) {
                    __extends(TResourceRefImage, _super);
                    function TResourceRefImage(descriptor) {
                        _super.call(this, microanim.framework.program.res.EResType.kImage);
                        var d;
                        d = descriptor;
                        this.fKey = d["key"];
                        this.fURI = d["uri"];
                        this.fIDLayer = d["targetLayer"];
                    }
                    TResourceRefImage.prototype.GetKey = function () {
                        return this.fKey;
                    };
                    TResourceRefImage.prototype.GetURI = function () {
                        return this.fURI;
                    };
                    TResourceRefImage.prototype.GetIDLayer = function () {
                        return this.fIDLayer;
                    };
                    return TResourceRefImage;
                }(microanim.framework.program.res.VResourceRef));
                res.TResourceRefImage = TResourceRefImage;
            })(res = program.res || (program.res = {}));
        })(program = framework.program || (framework.program = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var scene;
        (function (scene) {
            /**
             * @author Peter Hoppe
             */
            var TScene = (function () {
                function TScene(host, idCanvas) {
                    this.fHost = host;
                    this.fResources = new microanim.framework.res.TResourcePack(this);
                    this.fView = new microanim.framework.gfx.sys.TView(idCanvas);
                }
                TScene.prototype.GetNumResources = function () {
                    var ret;
                    ret = this.fResources.GetNumElements();
                    return ret;
                };
                /**
                 *
                 */
                TScene.prototype.GFX_Refresh = function () {
                    this.fView.Draw();
                };
                TScene.prototype.RegisterResources = function (descriptors) {
                    var nRes;
                    var i;
                    var r;
                    nRes = descriptors.GetNumElements();
                    if (nRes >= 1) {
                        for (i = 0; i < nRes; i++) {
                            r = descriptors.GetElementByIndex(i);
                            this._RegisterResource(r);
                        }
                    }
                };
                TScene.prototype.Resources_Load_Exec = function () {
                    return this.fResources.Load_Exec();
                };
                TScene.prototype._RegisterResource = function (descr) {
                    var rt;
                    rt = descr.GetType();
                    microanim.framework.system.TLogger.Message("TScene::_RegisterResource", "Registering resource:\n", descr);
                    switch ((rt)) {
                        case microanim.framework.program.res.EResType.kImage:
                            this._RegisterResource_Image(descr);
                            break;
                        default:
                            throw new Error("Unknown resource type (" + rt + ") for descriptor " + microanim.framework.system.TDebug.GetStringified(descr));
                    }
                };
                TScene.prototype._RegisterResource_Image = function (descr) {
                    var dImg;
                    var key;
                    var url;
                    var idLayer;
                    var img;
                    dImg = descr;
                    key = dImg.GetKey();
                    url = dImg.GetURI();
                    idLayer = dImg.GetIDLayer();
                    img = new microanim.framework.gfx.primitives.TImage(key, url);
                    this.fResources.Add(img);
                    this.fView.Image_Add(img, idLayer);
                };
                return TScene;
            }());
            scene.TScene = TScene;
        })(scene = framework.scene || (framework.scene = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var gfx;
        (function (gfx) {
            var geom;
            (function (geom) {
                var primitives;
                (function (primitives) {
                    /**
                     * @author Peter Hoppe
                     *
                     * head notes:
                     * [100]:   In mathematics, larger y-coordinates are above smaller ones (e.g. [0, 10] is ABOVE [0, -1]).
                     * By contrast, the HTML5 canvas is mirrored about the x axis, so higher y-coordinates are
                     * BELOW smaller ones.
                     * Our rectangle follows this design, i.e. the y-coordinate of the left TOP corner is smaller than
                     * (or equal to) the y-coordinate of the right BOTTOM corner.
                     */
                    var TRectangle = (function () {
                        function TRectangle(x0, y0, x1, y1) {
                            this.fHeight = 0;
                            this.fWidth = 0;
                            this._AssertCornersOK(x0, y0, x1, y1);
                            this.fCornerLeftTop = new microanim.framework.gfx.geom.primitives.TCoord2D(x0, y0);
                            this.fCornerRightBot = new microanim.framework.gfx.geom.primitives.TCoord2D(x1, y1);
                            this.fWidth = this.fCornerRightBot.fX - this.fCornerLeftTop.fX;
                            this.fHeight = this.fCornerRightBot.fY - this.fCornerLeftTop.fY;
                        }
                        TRectangle.prototype.GetCornerLeftTop = function () {
                            var ret;
                            ret = this.fCornerLeftTop.GetCopy();
                            return ret;
                        };
                        TRectangle.prototype.GetCornerRightBottom = function () {
                            var ret;
                            ret = this.fCornerRightBot.GetCopy();
                            return ret;
                        };
                        TRectangle.prototype.GetHeight = function () {
                            return this.fHeight;
                        };
                        TRectangle.prototype.GetWidth = function () {
                            return this.fWidth;
                        };
                        /**
                         * Simple box test.
                         *
                         * @param other
                         * @return
                         */
                        TRectangle.prototype.IsIntersectWith = function (other) {
                            var isOut;
                            var ret;
                            isOut = (this.fCornerRightBot.fX < other.fCornerLeftTop.fX) || (this.fCornerLeftTop.fX > other.fCornerRightBot.fX) || (this.fCornerRightBot.fY < other.fCornerLeftTop.fY) || (this.fCornerLeftTop.fY > other.fCornerRightBot.fY);
                            ret = !isOut;
                            return ret;
                        };
                        TRectangle.prototype.SetHeight = function (h) {
                            this._AssertIsNotNegative(h);
                            this.fHeight = h;
                            this.fCornerRightBot.fY = this.fCornerLeftTop.fY + h;
                        };
                        /**
                         * @param x
                         * @param y
                         */
                        TRectangle.prototype.SetLeftTop = function (x, y) {
                            this.fCornerLeftTop.fX = x;
                            this.fCornerLeftTop.fY = y;
                        };
                        TRectangle.prototype.SetWidth = function (w) {
                            this._AssertIsNotNegative(w);
                            this.fWidth = w;
                            this.fCornerRightBot.fX = this.fCornerLeftTop.fX + w;
                        };
                        TRectangle.prototype._AssertCornersOK = function (x0, y0, x1, y1) {
                            var hasError;
                            var msg;
                            hasError = false;
                            msg = "Required: ";
                            if (x0 > x1) {
                                hasError = true;
                                msg += "x0 < x1";
                            }
                            else if (y0 > y1) {
                                hasError = true;
                                msg += "y0 < y1";
                            }
                            if (hasError) {
                                msg += ". Given: x0=" + x0 + "y0=" + y0 + "x1=" + x1 + "y1=" + y1;
                                throw new RangeError(msg);
                            }
                        };
                        TRectangle.prototype._AssertIsNotNegative = function (x) {
                            if (x < 0) {
                                throw new RangeError("Required: x >= 0. Given: " + x);
                            }
                        };
                        return TRectangle;
                    }());
                    primitives.TRectangle = TRectangle;
                })(primitives = geom.primitives || (geom.primitives = {}));
            })(geom = gfx.geom || (gfx.geom = {}));
        })(gfx = framework.gfx || (framework.gfx = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    /**
     * Headnotes:
     * -------------------
     * [TMain_100]      Eek, awful double cast! We need this to satisfy the Java compiler, but
     * we know that x is in fact of type String at runtime. JSweet will tran-spile it
     * to working Javascript code. Remember - this program won't run in a Java
     * environment!
     *
     * @author Peter Hoppe
     */
    var TMain = (function () {
        function TMain() {
        }
        TMain.main = function (args) {
            var kOrigin = "TMain::main";
            window.onload = (function (kOrigin) {
                return function (e) {
                    microanim.framework.application.TApplication.CreateInstance("cnv");
                    microanim.framework.system.TLogger.Message(kOrigin, "Loading JSON validator library...");
                    microanim.framework.system.TExtDependency.LoadJSLibrary(TMain.kURLLibIsMyJSONValid).then(function (x) {
                        microanim.framework.system.TLogger.Message(kOrigin, "Loading JSONpath library...");
                        return microanim.framework.system.TExtDependency.LoadJSLibrary(TMain.kURLLibJSONPath);
                    }).then(function (x) {
                        microanim.framework.system.TLogger.Message(kOrigin, "Loading anim language library...");
                        return microanim.framework.system.TExtDependency.LoadJSLibrary(TMain.kURLLibParserLangAnim);
                    }).then(function (x) {
                        microanim.framework.system.TLogger.Message(kOrigin, "Loading JSON validation schemata for animation program...");
                        return microanim.framework.system.TExtDependency.LoadText(TMain.kURLJSONSchemata, microanim.framework.system.EMimeType.kApplicationJSON, TMain.kTimeoutLoading);
                    }).then(function (x) {
                        var sSchem;
                        var oSchem;
                        sSchem = x;
                        oSchem = JSON.parse(sSchem);
                        TMain.gJSONSchemaProgram = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(oSchem, "$.program");
                        TMain.gJSONSchemataLanguage = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(oSchem, "$.language");
                        microanim.framework.system.TLogger.Message(kOrigin, "Loading program object...");
                        return microanim.framework.system.TExtDependency.LoadText(TMain.kURLProgram, microanim.framework.system.EMimeType.kApplicationJSON, TMain.kTimeoutLoading);
                    }).then(function (x) {
                        var pFunc;
                        var parser;
                        var sPr;
                        microanim.framework.system.TLogger.Message(kOrigin, "Parsing and validating program...", x);
                        sPr = x;
                        parser = window["lang_anim"];
                        pFunc = parser["parse"];
                        TMain.gProgram = pFunc.call(window, sPr);
                        return microanim.framework.application.TApplication.Program_Load(TMain.gProgram, TMain.gJSONSchemaProgram, TMain.gJSONSchemataLanguage);
                    }).then(function (x) {
                        microanim.framework.system.TLogger.Message(kOrigin, "Initializing system...");
                        return TMain._InitApp();
                    }).then(function (x) {
                        microanim.framework.system.TLogger.Message(kOrigin, "Running animation...");
                        return TMain._Run();
                    }).then(function (x) {
                        TMain._Cleanup();
                        return null;
                    }).catch(function (err) {
                        microanim.framework.system.TLogger.Fatal("TMain::main", "Serious problem... Bailing out", err, true);
                        return null;
                    });
                    return true;
                };
            })(kOrigin);
        };
        TMain._InitApp = function () {
            return microanim.framework.application.TApplication.Resources_Load_Exec();
        };
        TMain._Run = function () {
            var ret;
            ret = new Promise(function (resolve, reject) {
                microanim.framework.system.TLogger.Message("TMain::_Run", "Executing: _04_Run ()");
                resolve(null);
            });
            return ret;
        };
        TMain._Cleanup = function () {
            microanim.framework.system.TLogger.Message("TMain::_Cleanup", "Program finished");
        };
        TMain.kTimeoutLoading = 2000;
        TMain.kURLLibIsMyJSONValid = "../../target/lib/is-my-json-valid/is-my-json-valid_standalone.js";
        TMain.kURLLibParserLangAnim = "../../target/lib/lang_anim/parser.js";
        TMain.kURLLibJSONPath = "../../target/lib/jsonpath/jsonpath.js";
        TMain.kURLProgram = "../../target/prog/microanim.p";
        TMain.kURLJSONSchemata = "../../target/dist/schemata.json";
        TMain.gJSONSchemaProgram = null;
        TMain.gJSONSchemataLanguage = null;
        TMain.gProgram = null;
        return TMain;
    }());
    microanim.TMain = TMain;
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var program;
        (function (program) {
            var lang;
            (function (lang) {
                /**
                 * @author peter
                 */
                var VCommand = (function () {
                    function VCommand() {
                    }
                    VCommand.Create = function (descriptor) {
                        var verb;
                        var ret;
                        verb = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(descriptor, "$.cmd");
                        if (verb === "moveTo") {
                            ret = new microanim.framework.program.lang.TCmdMoveTo(descriptor);
                        }
                        else if (verb === "setTransparency") {
                            ret = new microanim.framework.program.lang.TCmdSetTransparency(descriptor);
                        }
                        else {
                            microanim.framework.system.TLogger.Fatal("VCommand::Create", "Can\'t recognize given descriptor", descriptor, false);
                            throw new SyntaxError("VCommand::Create(): ");
                        }
                        return ret;
                    };
                    return VCommand;
                }());
                lang.VCommand = VCommand;
            })(lang = program.lang || (program.lang = {}));
        })(program = framework.program || (framework.program = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var program;
        (function (program) {
            var lang;
            (function (lang) {
                var TCmdSetTransparency = (function (_super) {
                    __extends(TCmdSetTransparency, _super);
                    function TCmdSetTransparency(descriptor) {
                        _super.call(this);
                        this.fAlpha = 0;
                        this.fTime = 0;
                        this.fIDSubject = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(descriptor, "$.args.subject");
                        this.fAlpha = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(descriptor, "$.args.alpha");
                        this.fTime = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(descriptor, "$.args.time");
                        this._AssertOK();
                        microanim.framework.system.TLogger.Message("TCmdSetTransparency::cTor", "Created new command. Details: ", this);
                    }
                    TCmdSetTransparency.prototype._AssertOK = function () {
                        if (this.fAlpha < 0.0 || this.fAlpha > 1.0) {
                            microanim.framework.system.TLogger.Fatal("TCmdMoveTo::_AssertOK", "Alpha must be in [0.0, 1.0]. Given: " + this.fAlpha, this, false);
                            throw new SyntaxError("Faulty initialization parameters.");
                        }
                        if (this.fTime < 0) {
                            microanim.framework.system.TLogger.Fatal("TCmdMoveTo::_AssertOK", "Transition time must be in [0, maxInt]. Given: " + this.fTime, this, false);
                            throw new SyntaxError("Faulty initialization parameters.");
                        }
                    };
                    return TCmdSetTransparency;
                }(microanim.framework.program.lang.VCommand));
                lang.TCmdSetTransparency = TCmdSetTransparency;
            })(lang = program.lang || (program.lang = {}));
        })(program = framework.program || (framework.program = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var program;
        (function (program) {
            var lang;
            (function (lang) {
                /**
                 * @author peter
                 */
                var TCmdMoveTo = (function (_super) {
                    __extends(TCmdMoveTo, _super);
                    function TCmdMoveTo(descriptor) {
                        _super.call(this);
                        this.fX = 0;
                        this.fY = 0;
                        this.fTime = 0;
                        this.fIDSubject = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(descriptor, "$.args.subject");
                        this.fX = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(descriptor, "$.args.x");
                        this.fY = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(descriptor, "$.args.y");
                        this.fTime = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf(descriptor, "$.args.time");
                        this._AssertOK();
                        microanim.framework.system.TLogger.Message("TCmdMoveTo::cTor", "Created new command. Details: ", this);
                    }
                    TCmdMoveTo.prototype._AssertOK = function () {
                        if (this.fTime < 0) {
                            microanim.framework.system.TLogger.Fatal("TCmdMoveTo::_AssertOK", "Transition time must be in [0, maxInt]. Given: " + this.fTime, this, false);
                            throw new SyntaxError("Faulty initialization parameters.");
                        }
                    };
                    return TCmdMoveTo;
                }(microanim.framework.program.lang.VCommand));
                lang.TCmdMoveTo = TCmdMoveTo;
            })(lang = program.lang || (program.lang = {}));
        })(program = framework.program || (framework.program = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var microanim;
(function (microanim) {
    var framework;
    (function (framework) {
        var program;
        (function (program) {
            var exec;
            (function (exec) {
                var TProgStep = (function () {
                    function TProgStep() {
                    }
                    return TProgStep;
                }());
                exec.TProgStep = TProgStep;
            })(exec = program.exec || (program.exec = {}));
        })(program = framework.program || (framework.program = {}));
    })(framework = microanim.framework || (microanim.framework = {}));
})(microanim || (microanim = {}));
microanim.TMain.main(null);
