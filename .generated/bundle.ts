"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.res {
    export enum EResType {
        kImage
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.application {
    /**
     * @author Peter Hoppe
     */
    export class TApplication {
        private static gApplication : TApplication = null;

        public static CreateInstance(idCanvas : string) {
            if(TApplication.gApplication == null) {
                TApplication.gApplication = new TApplication(idCanvas);
            } else {
                throw new Error("Can\'t create multiple instances of the TApplication class");
            }
        }

        public static Program_Load(prog : any, sProg : any, sLang : any) : Promise<any> {
            return TApplication.gApplication._Program_Load(prog, sProg, sLang);
        }

        public static Resources_Load_Exec() : Promise<any> {
            return TApplication.gApplication._Resources_Load_Exec();
        }

        private fController : microanim.framework.controller.TController;

        private fScene : microanim.framework.scene.TScene;

        private fProgram : microanim.framework.program.TProgram;

        constructor(idCanvas : string) {
            this.fScene = new microanim.framework.scene.TScene(this, idCanvas);
            this.fController = new microanim.framework.controller.TController(this);
            this.fProgram = null;
        }

        private _Resources_Load_Exec() : Promise<any> {
            return this.fScene.Resources_Load_Exec();
        }

        private _Program_Load(prog : any, sProg : any, sLang : any) : Promise<any> {
            var ret : Promise<any>;
            ret = new Promise<any>((resolve, reject) => {
                var descriptors : microanim.framework.aux.storage.TCollection<microanim.framework.aux.storage.TArray<microanim.framework.program.res.VResourceRef>>;
                var dStore : microanim.framework.aux.storage.TArray<microanim.framework.program.res.VResourceRef>;
                var dTypes : microanim.framework.aux.storage.TArray<string>;
                var typeID : string;
                var i : number;
                var n : number;
                if(this.fProgram == null) {
                    try {
                        this.fProgram = microanim.framework.program.TCompiler.Parse(prog, sProg, sLang);
                        descriptors = this.fProgram.GetResources();
                        dTypes = descriptors.GetKeys();
                        n = dTypes.GetNumElements();
                        if(n >= 1) {
                            for(i = 0; i < n; i++) {
                                typeID = dTypes.GetElementByIndex(i);
                                dStore = descriptors.GetElementByKey(typeID);
                                this.fScene.RegisterResources(dStore);
                            }
                        }
                        resolve(null);
                    } catch(e) {
                        microanim.framework.system.TLogger.Fatal("TApplication::Program_Load", "Error whilst loading program", e, false);
                        reject(e);
                    };
                } else {
                    microanim.framework.system.TLogger.Fatal("TApplication::Program_Load", "This application can\'t load a program more than once.", false);
                    reject(null);
                }
            });
            return ret;
        }

        /**
         * 
         */
        public GFX_Refresh() {
            this.fScene.GFX_Refresh();
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.system {
    /**
     * @author peter
     */
    export class TLogger {
        public static Fatal$java_lang_String$java_lang_String$boolean(origin : string, msg : string, showMsgBox : boolean) {
            TLogger._Fatal(origin, msg, null, null, showMsgBox);
        }

        public static Fatal$java_lang_String$java_lang_String$java_lang_Object$boolean(origin : string, msg : string, err : any, showMsgBox : boolean) {
            TLogger._Fatal(origin, msg, err, null, showMsgBox);
        }

        public static Fatal(origin? : any, msg? : any, oSubject? : any, err? : any, showMsgBox? : any) : any {
            if(((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && ((oSubject != null) || oSubject === null) && ((err != null) || err === null) && ((typeof showMsgBox === 'boolean') || showMsgBox === null)) {
                return <any>(() => {
                    TLogger._Fatal(origin, msg, err, oSubject, showMsgBox);
                })();
            } else if(((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && ((oSubject != null) || oSubject === null) && ((typeof err === 'boolean') || err === null) && showMsgBox === undefined) {
                return <any>microanim.framework.system.TLogger.Fatal$java_lang_String$java_lang_String$java_lang_Object$boolean(origin, msg, oSubject, err);
            } else if(((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && ((typeof oSubject === 'boolean') || oSubject === null) && err === undefined && showMsgBox === undefined) {
                return <any>microanim.framework.system.TLogger.Fatal$java_lang_String$java_lang_String$boolean(origin, msg, oSubject);
            } else throw new Error('invalid overload');
        }

        public static Message$java_lang_String$java_lang_String(origin : string, msg : string) {
            var m : string;
            m = TLogger._GetMsg(origin, msg, "LOG", null, null);
            console.log(m);
        }

        public static Message(origin? : any, msg? : any, oSubject? : any) : any {
            if(((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && ((oSubject != null) || oSubject === null)) {
                return <any>(() => {
                    var m : string;
                    m = TLogger._GetMsg(origin, msg, "LOG", oSubject, null);
                    console.log(m);
                })();
            } else if(((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && oSubject === undefined) {
                return <any>microanim.framework.system.TLogger.Message$java_lang_String$java_lang_String(origin, msg);
            } else throw new Error('invalid overload');
        }

        public static Warn$java_lang_String$java_lang_String(origin : string, msg : string) {
            var m : string;
            m = TLogger._GetMsg(origin, msg, "WARNING", null, null);
            console.warn(m);
        }

        public static Warn(origin? : any, msg? : any, oSubject? : any) : any {
            if(((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && ((oSubject != null) || oSubject === null)) {
                return <any>(() => {
                    var m : string;
                    m = TLogger._GetMsg(origin, msg, "WARNING", oSubject, null);
                    console.warn(m);
                })();
            } else if(((typeof origin === 'string') || origin === null) && ((typeof msg === 'string') || msg === null) && oSubject === undefined) {
                return <any>microanim.framework.system.TLogger.Warn$java_lang_String$java_lang_String(origin, msg);
            } else throw new Error('invalid overload');
        }

        private static _Fatal(origin : string, msg : string, err : any, oSubject : any, showMsgBox : boolean) {
            var mTerse : string;
            var mDetail : string;
            mDetail = TLogger._GetMsg(origin, msg, "FATAL", oSubject, err);
            console.error(mDetail);
            if(showMsgBox) {
                mTerse = TLogger._GetMsg(origin, msg, "FATAL", null, null);
                mTerse += "\n\nSee your browser\'s web console for further details.\n";
                alert(mTerse);
            }
        }

        private static _GetMsg(origin : string, msg : string, prologue : string, oSubject : any, err : any) : string {
            var now : Date;
            var dt : string;
            var ret : string;
            now = new Date();
            dt = now.toISOString();
            if(origin != null) {
                ret = origin + ": " + prologue + ": " + dt + ": " + msg;
            } else {
                ret = prologue + ": " + dt + ": " + msg;
            }
            if(err != null) {
                ret += "\n--------------\n";
                ret += "Error details:\n";
                ret += "--------------\n";
                ret += microanim.framework.system.TDebug.GetStringified(err, false);
            }
            if(oSubject != null) {
                ret += "\n-------\n";
                ret += "Object:\n";
                ret += "-------\n";
                ret += microanim.framework.system.TDebug.GetStringified(oSubject);
            }
            return ret;
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.program.res {
    export enum EResType {
        kImage
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.aux.storage {
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
    export class TArray<T> {
        private fValues : Object[];

        public constructor() {
            this.fValues = new Array(0);
        }

        public Clear() {
            this.fValues = new Array(0);
        }

        public Dequeue() : T {
            var ar : Array<Object>;
            var ret : T;
            this._AssertHasElements();
            ar = this.fValues;
            ret = (<T>ar.shift());
            return ret;
        }

        public Enqueue(obj : T) {
            var ar : Array<Object>;
            ar = this.fValues;
            ar.unshift(<Object>obj);
        }

        public GetElementByIndex(i : number) : T {
            var ret : T;
            this._AssertInRange(i);
            ret = (<T>this.fValues[i]);
            return ret;
        }

        public GetNumElements() : number {
            return this.fValues.length;
        }

        public Pop() : T {
            var ar : Array<Object>;
            var ret : T;
            this._AssertHasElements();
            ar = this.fValues;
            ret = (<T>ar.pop());
            return ret;
        }

        public Push(obj : T) {
            var ar : Array<Object>;
            ar = this.fValues;
            ar.push(<Object>obj);
        }

        /**
         * 
         */
        private _AssertHasElements() {
            if(this.fValues.length <= 0) {
                throw new RangeError("Array is empty. Can\'t delete any elements.");
            }
        }

        private _AssertInRange(i : number) {
            if(this.fValues.length <= 0) {
                throw new RangeError("Array is empty. Can\'t retrieve any elements.");
            } else if(i < 0) {
                throw new RangeError("Index too small. Must be in range: [0, " + this.fValues.length + "[. Given: " + i);
            } else if(i >= this.fValues.length) {
                throw new RangeError("Index too large. Must be in range: [0, " + this.fValues.length + "[. Given: " + i);
            }
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.aux.json.path {
    /**
     * @author peter
     */
    export class TJSONPathQuery {
        public static Query(oSubject : any, path : string) : any[] {
            var ret : any[];
            ret = TJSONPathQuery._Apply<any>("query", oSubject, path);
            return ret;
        }

        public static ValueOf<T>(oSubject : any, path : string) : T {
            var ret : T;
            ret = TJSONPathQuery._Apply<any>("value", oSubject, path);
            return ret;
        }

        private static _Apply<T>(method : string, oSubject : any, arg : string) : T {
            var jp : any;
            var func : Function;
            var ret : T;
            microanim.framework.system.TExtDependency.AssertHasGlobalDependency("jsonpath", "JSONPath");
            jp = window["jsonpath"];
            func = jp[method];
            ret = <T>func.call(jp, oSubject, arg);
            return ret;
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.program.exec {
    export class TProgStep {    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.gfx.sys {
    /**
     * The graphics viewport. Binds to a a HTML element on the hosting web page.
     * It's best to bind this viewport to a <code>DIV</code> element. Graphics will
     * be drawn inside the hosting element, i.e. any graphics (part) outside
     * the geometric bounds of the hosting element will not draw.
     * 
     * @author Peter Hoppe
     */
    export class TViewport {
        fDimensions : microanim.framework.gfx.geom.primitives.TRectangle;

        private fGraphics : HTMLElement;

        public constructor(id : string) {
            var h : number;
            var w : number;
            this.fGraphics = <HTMLCanvasElement>document.getElementById(id);
            if(this.fGraphics == null) {
                this.fDimensions = new microanim.framework.gfx.geom.primitives.TRectangle(0, 0, this.fGraphics.clientWidth, this.fGraphics.clientHeight);
            } else {
                throw new Error("Canvas element does not exist: " + id);
            }
        }

        public Clear() {
        }

        public Draw(res : microanim.framework.gfx.primitives.VResourceGFX) {
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.gfx.geom.primitives {
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
    export class TRectangle {
        private fCornerLeftTop : microanim.framework.gfx.geom.primitives.TCoord2D;

        private fCornerRightBot : microanim.framework.gfx.geom.primitives.TCoord2D;

        private fHeight : number;

        private fWidth : number;

        public constructor(x0 : number, y0 : number, x1 : number, y1 : number) {
            this.fHeight = 0;
            this.fWidth = 0;
            this._AssertCornersOK(x0, y0, x1, y1);
            this.fCornerLeftTop = new microanim.framework.gfx.geom.primitives.TCoord2D(x0, y0);
            this.fCornerRightBot = new microanim.framework.gfx.geom.primitives.TCoord2D(x1, y1);
            this.fWidth = this.fCornerRightBot.fX - this.fCornerLeftTop.fX;
            this.fHeight = this.fCornerRightBot.fY - this.fCornerLeftTop.fY;
        }

        public GetCornerLeftTop() : microanim.framework.gfx.geom.primitives.TCoord2D {
            var ret : microanim.framework.gfx.geom.primitives.TCoord2D;
            ret = this.fCornerLeftTop.GetCopy();
            return ret;
        }

        public GetCornerRightBottom() : microanim.framework.gfx.geom.primitives.TCoord2D {
            var ret : microanim.framework.gfx.geom.primitives.TCoord2D;
            ret = this.fCornerRightBot.GetCopy();
            return ret;
        }

        public GetHeight() : number {
            return this.fHeight;
        }

        public GetWidth() : number {
            return this.fWidth;
        }

        /**
         * Simple box test.
         * 
         * @param other
         * @return
         */
        public IsIntersectWith(other : TRectangle) : boolean {
            var isOut : boolean;
            var ret : boolean;
            isOut = (this.fCornerRightBot.fX < other.fCornerLeftTop.fX) || (this.fCornerLeftTop.fX > other.fCornerRightBot.fX) || (this.fCornerRightBot.fY < other.fCornerLeftTop.fY) || (this.fCornerLeftTop.fY > other.fCornerRightBot.fY);
            ret = !isOut;
            return ret;
        }

        public SetHeight(h : number) {
            this._AssertIsNotNegative(h);
            this.fHeight = h;
            this.fCornerRightBot.fY = this.fCornerLeftTop.fY + h;
        }

        /**
         * @param x
         * @param y
         */
        public SetLeftTop(x : number, y : number) {
            this.fCornerLeftTop.fX = x;
            this.fCornerLeftTop.fY = y;
        }

        public SetWidth(w : number) {
            this._AssertIsNotNegative(w);
            this.fWidth = w;
            this.fCornerRightBot.fX = this.fCornerLeftTop.fX + w;
        }

        private _AssertCornersOK(x0 : number, y0 : number, x1 : number, y1 : number) {
            var hasError : boolean;
            var msg : string;
            hasError = false;
            msg = "Required: ";
            if(x0 > x1) {
                hasError = true;
                msg += "x0 < x1";
            } else if(y0 > y1) {
                hasError = true;
                msg += "y0 < y1";
            }
            if(hasError) {
                msg += ". Given: x0=" + x0 + "y0=" + y0 + "x1=" + x1 + "y1=" + y1;
                throw new RangeError(msg);
            }
        }

        private _AssertIsNotNegative(x : number) {
            if(x < 0) {
                throw new RangeError("Required: x >= 0. Given: " + x);
            }
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.program.res {
    /**
     * @author peter
     */
    export abstract class VResourceRef {
        public static GetResTypeID(t : microanim.framework.program.res.EResType) : string {
            var ret : string;
            switch((t)) {
            case microanim.framework.program.res.EResType.kImage:
                ret = "image";
                break;
            default:
                ret = "unknown";
            }
            return ret;
        }

        public static Create(t : microanim.framework.program.res.EResType, oRef : any) : VResourceRef {
            var sD : string;
            var ret : VResourceRef;
            switch((t)) {
            case microanim.framework.program.res.EResType.kImage:
                ret = new microanim.framework.program.res.TResourceRefImage(oRef);
                break;
            default:
                sD = microanim.framework.system.TDebug.GetStringified(oRef, false);
                throw new Error("Unknown resource type (" + t + ") for resource descriptor:\n" + sD);
            }
            return ret;
        }

        private fType : microanim.framework.program.res.EResType;

        constructor(t : microanim.framework.program.res.EResType) {
            this.fType = t;
        }

        public GetType() : microanim.framework.program.res.EResType {
            return this.fType;
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.program.res {
    /**
     * @author peter
     */
    export class TResourceRefImage extends microanim.framework.program.res.VResourceRef {
        private fKey : string;

        private fURI : string;

        private fIDLayer : string;

        public constructor(descriptor : any) {
            super(microanim.framework.program.res.EResType.kImage);
            var d : Object;
            d = <Object>descriptor;
            this.fKey = <string>d["key"];
            this.fURI = <string>d["uri"];
            this.fIDLayer = <string>d["targetLayer"];
        }

        public GetKey() : string {
            return this.fKey;
        }

        public GetURI() : string {
            return this.fURI;
        }

        public GetIDLayer() : string {
            return this.fIDLayer;
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.res {
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
    export abstract class VSceneResource {
        fHost : microanim.framework.res.TResourcePack;

        fID : string;

        public constructor(id : string) {
            this.fID = id;
            this.fHost = null;
        }

        public GetID() : string {
            return this.fID;
        }

        public abstract Load_Exec() : Promise<any>;

        public SetHost(host : microanim.framework.res.TResourcePack) {
            if(this.fHost == null) {
                this.fHost = host;
            } else {
                throw new Error("Host is already set.");
            }
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.aux.json.validation {
    /**
     * @author peter
     * @see    https://github.com/cincheo/jsweet/issues/144
     */
    export class TValidatorJSON {
        private fSchema : any;

        private fValidator : Function;

        private fOptions : Object;

        public constructor(schema : any) {
            var imjv : Function;
            microanim.framework.system.TExtDependency.AssertHasGlobalDependency("isMyJsonValid", "Is-My-Json-Valid");
            this.fOptions = <Object>new Object();
            this.fOptions["verbose"] = true;
            this.fSchema = schema;
            imjv = <Function>window["isMyJsonValid"];
            this.fValidator = <Function>imjv.call(window, this.fSchema, this.fOptions);
        }

        public Validate(oJS : any) : microanim.framework.aux.storage.TArray<microanim.framework.aux.json.validation.TValidatorJSONErr> {
            var hasPassed : boolean;
            var i : number;
            var errors : Object[];
            var erx : microanim.framework.aux.json.validation.TValidatorJSONErr;
            var ret : microanim.framework.aux.storage.TArray<microanim.framework.aux.json.validation.TValidatorJSONErr>;
            ret = new microanim.framework.aux.storage.TArray<microanim.framework.aux.json.validation.TValidatorJSONErr>();
            hasPassed = <boolean>this.fValidator.call(window, oJS);
            if(!hasPassed) {
                errors = <Object[]>this.fValidator["errors"];
                for(i = 0; i < errors.length; i++) {
                    erx = new microanim.framework.aux.json.validation.TValidatorJSONErr(errors[i]);
                    ret.Enqueue(erx);
                }
            }
            return ret;
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.res {
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
    export class TResourcePack {
        private fResources : microanim.framework.aux.storage.TCollection<microanim.framework.res.VSceneResource>;

        private fState : microanim.framework.res.E_SCN_ResourcePack_State;

        public constructor(t_SCN_Scene : microanim.framework.scene.TScene) {
            this.fResources = new microanim.framework.aux.storage.TCollection<microanim.framework.res.VSceneResource>();
            this.fState = microanim.framework.res.E_SCN_ResourcePack_State.kInit;
        }

        public Add(r : microanim.framework.res.VSceneResource) {
            var k : string;
            k = r.GetID();
            if(this.fState === microanim.framework.res.E_SCN_ResourcePack_State.kInit) {
                r.SetHost(this);
                this.fResources.Add(k, r);
            } else {
                throw new Error("Can\'t add more resources once we have called Load ().");
            }
        }

        /**
         * @param key
         * @return
         */
        public GetElementByID(key : string) : microanim.framework.res.VSceneResource {
            var ret : microanim.framework.res.VSceneResource;
            ret = this.fResources.GetElementByKey(key);
            return ret;
        }

        public GetElementByIndex(i : number) : microanim.framework.res.VSceneResource {
            var ret : microanim.framework.res.VSceneResource;
            ret = this.fResources.GetElementByIndex(i);
            return ret;
        }

        /**
         * @return
         */
        public GetNumElements() : number {
            var ret : number;
            ret = this.fResources.GetNumElements();
            return ret;
        }

        public Load_Exec() : Promise<any> {
            var ret : Promise<any>;
            ret = new Promise<any>((resolve, reject) => {
                this._Load().then<any>((e) => {
                    microanim.framework.system.TLogger.Message("TResourcePack::_Load", "Successfully loaded resources.");
                    resolve(e);
                    return null;
                }).catch<any>((error) => {
                    microanim.framework.system.TLogger.Fatal("TResourcePack::_Load", "FAILED to load resources.", error, true);
                    reject(error);
                    return null;
                });
            });
            return ret;
        }

        private _Load() : Promise<any[]> {
            var pR : Array<Promise<any>>;
            var p : Promise<any>;
            var i : number;
            var n : number;
            var r : microanim.framework.res.VSceneResource;
            var ret : Promise<any[]>;
            n = this.fResources.GetNumElements();
            pR = new Array<Promise<any>>();
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    r = this.fResources.GetElementByIndex(i);
                    p = r.Load_Exec();
                    pR.push(p);
                }
            }
            ret = Promise.all<any>((pR));
            return ret;
        }
    }

    export enum E_SCN_ResourcePack_State {
        kInit, kLoading, kWait
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim {
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
    export class TMain {
        private static kTimeoutLoading : number = 2000;

        private static kURLLibIsMyJSONValid : string = "../../target/lib/is-my-json-valid/is-my-json-valid_standalone.js";

        private static kURLLibParserLangAnim : string = "../../target/lib/lang_anim/parser.js";

        private static kURLLibJSONPath : string = "../../target/lib/jsonpath/jsonpath.js";

        private static kURLProgram : string = "../../target/prog/microanim.p";

        private static kURLJSONSchemata : string = "../../target/dist/schemata.json";

        private static gJSONSchemaProgram : any = null;

        private static gJSONSchemataLanguage : any = null;

        private static gProgram : any = null;

        public static main(args : string[]) {
            var kOrigin : string = "TMain::main";
            window.onload = ((kOrigin) => {
                return (e) => {
                    microanim.framework.application.TApplication.CreateInstance("cnv");
                    microanim.framework.system.TLogger.Message(kOrigin, "Loading JSON validator library...");
                    microanim.framework.system.TExtDependency.LoadJSLibrary(TMain.kURLLibIsMyJSONValid).then<any>((x) => {
                        microanim.framework.system.TLogger.Message(kOrigin, "Loading JSONpath library...");
                        return microanim.framework.system.TExtDependency.LoadJSLibrary(TMain.kURLLibJSONPath);
                    }).then<any>((x) => {
                        microanim.framework.system.TLogger.Message(kOrigin, "Loading anim language library...");
                        return microanim.framework.system.TExtDependency.LoadJSLibrary(TMain.kURLLibParserLangAnim);
                    }).then<any>((x) => {
                        microanim.framework.system.TLogger.Message(kOrigin, "Loading JSON validation schemata for animation program...");
                        return microanim.framework.system.TExtDependency.LoadText(TMain.kURLJSONSchemata, microanim.framework.system.EMimeType.kApplicationJSON, TMain.kTimeoutLoading);
                    }).then<any>((x) => {
                        var sSchem : string;
                        var oSchem : any;
                        sSchem = <string><any>x;
                        oSchem = JSON.parse(sSchem);
                        TMain.gJSONSchemaProgram = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(oSchem, "$.program");
                        TMain.gJSONSchemataLanguage = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(oSchem, "$.language");
                        microanim.framework.system.TLogger.Message(kOrigin, "Loading program object...");
                        return microanim.framework.system.TExtDependency.LoadText(TMain.kURLProgram, microanim.framework.system.EMimeType.kApplicationJSON, TMain.kTimeoutLoading);
                    }).then<any>((x) => {
                        var pFunc : Function;
                        var parser : Object;
                        var sPr : string;
                        microanim.framework.system.TLogger.Message(kOrigin, "Parsing and validating program...", x);
                        sPr = <string><any>x;
                        parser = <Object>window["lang_anim"];
                        pFunc = <Function>parser["parse"];
                        TMain.gProgram = pFunc.call(window, sPr);
                        return microanim.framework.application.TApplication.Program_Load(TMain.gProgram, TMain.gJSONSchemaProgram, TMain.gJSONSchemataLanguage);
                    }).then<any>((x) => {
                        microanim.framework.system.TLogger.Message(kOrigin, "Initializing system...");
                        return TMain._InitApp();
                    }).then<any>((x) => {
                        microanim.framework.system.TLogger.Message(kOrigin, "Running animation...");
                        return TMain._Run();
                    }).then<any>((x) => {
                        TMain._Cleanup();
                        return null;
                    }).catch<any>((err) => {
                        microanim.framework.system.TLogger.Fatal("TMain::main", "Serious problem... Bailing out", err, true);
                        return null;
                    });
                    return true;
                }
            })(kOrigin);
        }

        private static _InitApp() : Promise<any> {
            return microanim.framework.application.TApplication.Resources_Load_Exec();
        }

        private static _Run() : Promise<any> {
            var ret : Promise<any>;
            ret = new Promise<any>((resolve, reject) => {
                microanim.framework.system.TLogger.Message("TMain::_Run", "Executing: _04_Run ()");
                resolve(null);
            });
            return ret;
        }

        private static _Cleanup() {
            microanim.framework.system.TLogger.Message("TMain::_Cleanup", "Program finished");
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.program {
    /**
     * @author Peter Hoppe
     */
    export class TProgram {
        private fResDescriptors : microanim.framework.aux.storage.TCollection<microanim.framework.aux.storage.TArray<microanim.framework.program.res.VResourceRef>>;

        private fSteps : microanim.framework.aux.storage.TArray<microanim.framework.program.lang.VCommand>;

        public constructor() {
            this.fSteps = new microanim.framework.aux.storage.TArray<microanim.framework.program.lang.VCommand>();
            this.fResDescriptors = new microanim.framework.aux.storage.TCollection<microanim.framework.aux.storage.TArray<microanim.framework.program.res.VResourceRef>>();
        }

        public GetResources() : microanim.framework.aux.storage.TCollection<microanim.framework.aux.storage.TArray<microanim.framework.program.res.VResourceRef>> {
            return this.fResDescriptors;
        }

        AddRefStore(typeID : string, store : microanim.framework.aux.storage.TArray<microanim.framework.program.res.VResourceRef>) {
            this.fResDescriptors.Add(typeID, store);
        }

        AddStep(c : microanim.framework.program.lang.VCommand) {
            this.fSteps.Push(c);
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.system {
    /**
     * @author peter
     */
    export class TDebug {
        private static kIndentSpaces : number = 4;

        public static DebuggerTrap() {
            eval("debugger;");
        }

        public static GetStringified$java_lang_Object(o : any) : string {
            var ret : string;
            ret = TDebug._GetStringified(o, false);
            return ret;
        }

        public static GetStringified(o? : any, doSuppressNull? : any) : any {
            if(((o != null) || o === null) && ((typeof doSuppressNull === 'boolean') || doSuppressNull === null)) {
                return <any>(() => {
                    var ret : string;
                    ret = TDebug._GetStringified(o, doSuppressNull);
                    return ret;
                })();
            } else if(((o != null) || o === null) && doSuppressNull === undefined) {
                return <any>microanim.framework.system.TDebug.GetStringified$java_lang_Object(o);
            } else throw new Error('invalid overload');
        }

        /**
         * Returns a dump of an object as string. Dump is pretty printed.
         * Method will also stringify objects of type Error.
         * 
         * @param o     The error object to be dumped.
         * @return      The dump, in JSON format.
         * @see         http://stackoverflow.com/a/20405830
         */
        private static _GetStringified(o : any, doSuppressNull : boolean) : string {
            var kReplEv : string[] = ["bubbles", "cancelBubble", "cancelable", "defaultPrevented", "eventPhase", "isTrusted", "returnValue", "target", "timeStamp", "type"];
            var copy : Object;
            var eCast : Error;
            var nullO : any[];
            var ret : string;
            nullO = null;
            if(o == null) {
                ret = doSuppressNull?"":"null";
            } else if(o != null && o instanceof Error) {
                eCast = <Error>o;
                copy = <Object>new Object();
                copy["message"] = eCast.message;
                copy["name"] = eCast.name;
                ret = JSON.stringify(copy, nullO, TDebug.kIndentSpaces);
            } else if(o != null && o instanceof Event) {
                ret = JSON.stringify(o, kReplEv, TDebug.kIndentSpaces);
            } else {
                ret = JSON.stringify(o, nullO, TDebug.kIndentSpaces);
            }
            return ret;
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.program {
    /**
     * @author peter
     */
    export class TCompiler {
        public static Parse(prog : any, sProg : any, sLang : any) : microanim.framework.program.TProgram {
            var ret : microanim.framework.program.TProgram;
            ret = TCompiler._Parse(prog, sProg, sLang);
            return ret;
        }

        private static _Parse(prog : any, sProg : any, sLang : any) : microanim.framework.program.TProgram {
            var globalValidator : microanim.framework.aux.json.validation.TValidatorJSON;
            var localValidators : microanim.framework.aux.storage.TCollection<microanim.framework.aux.json.validation.TValidatorJSON>;
            var v : microanim.framework.aux.json.validation.TValidatorJSON;
            var sl : any;
            var i : number;
            var keys : string[];
            var k : string;
            var p : string;
            var cSchema : any;
            var ret : microanim.framework.program.TProgram;
            microanim.framework.system.TLogger.Message("TCompiler::_Parse", "Reading JSON schemata...");
            globalValidator = new microanim.framework.aux.json.validation.TValidatorJSON(sProg);
            localValidators = new microanim.framework.aux.storage.TCollection<microanim.framework.aux.json.validation.TValidatorJSON>();
            sl = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(sLang, "$.commands");
            keys = Object.getOwnPropertyNames(sl);
            if(keys.length >= 1) {
                for(i = 0; i < keys.length; i++) {
                    k = keys[i];
                    p = "$.commands." + k;
                    cSchema = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(sLang, p);
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
        }

        private static _AssertValid(prog : any, globalValidator : microanim.framework.aux.json.validation.TValidatorJSON, localValidators : microanim.framework.aux.storage.TCollection<microanim.framework.aux.json.validation.TValidatorJSON>) {
            var descr : any[];
            var i : number;
            var d : any;
            var k : string;
            var v : microanim.framework.aux.json.validation.TValidatorJSON;
            TCompiler._AssertValid_Work(globalValidator, prog);
            descr = microanim.framework.aux.json.path.TJSONPathQuery.Query(prog, "$.program.*");
            if(descr.length >= 1) {
                for(i = 0; i < descr.length; i++) {
                    d = descr[i];
                    k = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(d, "$.cmd");
                    v = localValidators.GetElementByKey(k);
                    TCompiler._AssertValid_Work(v, d);
                }
            }
        }

        private static _AssertValid_Work(v : microanim.framework.aux.json.validation.TValidatorJSON, o : any) {
            var i : number;
            var err : microanim.framework.aux.storage.TArray<microanim.framework.aux.json.validation.TValidatorJSONErr>;
            var erx : microanim.framework.aux.json.validation.TValidatorJSONErr;
            var msg : string;
            var nErr : number;
            err = v.Validate(o);
            nErr = err.GetNumElements();
            if(nErr >= 1) {
                microanim.framework.system.TLogger.Fatal("TCompiler::_AssertValid_Work", "Validation error on object", o, false);
                msg = "TCompiler::_AssertValid_DumpErrors: Given program failed validation. Specifics:\n";
                for(i = 0; i < nErr; i++) {
                    erx = err.GetElementByIndex(i);
                    msg += erx.GetDump();
                    if(i < nErr - 1) {
                        msg += "\n";
                    }
                }
                throw new SyntaxError(msg);
            }
        }

        private static _ReadResources(oProg : microanim.framework.program.TProgram, prog : any) {
            var descr : any[];
            descr = microanim.framework.aux.json.path.TJSONPathQuery.Query(prog, "$.resources.images.*");
            microanim.framework.system.TLogger.Message("TCompiler::_ReadResources", "Got image descriptors", descr);
            TCompiler._ReadResources_Add(oProg, descr, microanim.framework.program.res.EResType.kImage);
        }

        private static _ReadResources_Add(oProg : microanim.framework.program.TProgram, descr : any[], type : microanim.framework.program.res.EResType) {
            var i : number;
            var dRef : any;
            var vrRef : microanim.framework.program.res.VResourceRef;
            var store : microanim.framework.aux.storage.TArray<microanim.framework.program.res.VResourceRef>;
            var typeID : string;
            typeID = microanim.framework.program.res.VResourceRef.GetResTypeID(type);
            store = new microanim.framework.aux.storage.TArray<microanim.framework.program.res.VResourceRef>();
            if(descr.length >= 1) {
                for(i = 0; i < descr.length; i++) {
                    dRef = descr[i];
                    vrRef = microanim.framework.program.res.VResourceRef.Create(type, dRef);
                    store.Push(vrRef);
                }
            }
            oProg.AddRefStore(typeID, store);
        }

        private static _ReadSteps(oProg : microanim.framework.program.TProgram, prog : any) {
            var descr : any[];
            var i : number;
            var d : any;
            var c : microanim.framework.program.lang.VCommand;
            descr = microanim.framework.aux.json.path.TJSONPathQuery.Query(prog, "$.program.*");
            microanim.framework.system.TLogger.Message("TCompiler::_ReadSteps", "Got program descriptor", descr);
            if(descr.length >= 1) {
                for(i = 0; i < descr.length; i++) {
                    d = descr[i];
                    c = microanim.framework.program.lang.VCommand.Create(d);
                    oProg.AddStep(c);
                }
            }
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.gfx.primitives {
    /**
     * Please note: The name is prepended with 'A1', so the name of this class
     * is high up the alphabet. Thus, JSweet will put this class at the beginning of the
     * compiled Javascript unit. A1_XXXX classes inherit from A0_XXXX classes.
     * 
     * @author Peter Hoppe
     */
    export abstract class VResourceGFX extends microanim.framework.res.VSceneResource {
        /**
         * @param id
         */
        public constructor(id : string) {
            super(id);
        }

        public Draw(graphics : CanvasRenderingContext2D) {
            throw new Error("Please override Draw (CanvasRenderingContext2D graphics)");
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.gfx.primitives {
    /**
     * @author Peter Hoppe
     */
    export class TImage extends microanim.framework.gfx.primitives.VResourceGFX {
        private fBitmap : HTMLImageElement;

        private fDimensions : microanim.framework.gfx.geom.primitives.TRectangle;

        private fIsVisible : boolean;

        private fURL : string;

        public constructor(id : string, url : string) {
            super(id);
            this.fIsVisible = false;
            this.fID = id;
            this.fURL = url;
            this.fDimensions = new microanim.framework.gfx.geom.primitives.TRectangle(0, 0, 0, 0);
            this.fIsVisible = false;
            this.fBitmap = <HTMLImageElement>document.createElement("img");
        }

        public Draw(graphics : CanvasRenderingContext2D) {
            var lTop : microanim.framework.gfx.geom.primitives.TCoord2D;
            if(this.fIsVisible) {
                lTop = this.fDimensions.GetCornerLeftTop();
                graphics.drawImage(this.fBitmap, lTop.fX, lTop.fY);
            }
        }

        public Load_Exec() : Promise<any> {
            var ret : Promise<any>;
            ret = new Promise<any>((resolve, reject) => {
                this.fBitmap.onload = (e) => {
                    this.fDimensions.SetHeight(this.fBitmap.naturalHeight);
                    this.fDimensions.SetWidth(this.fBitmap.naturalWidth);
                    microanim.framework.system.TLogger.Message("TImage::Load_Exec", "LoadSuccess: \'" + this.fURL + "\'");
                    resolve(e);
                    return null;
                };
                this.fBitmap.onerror = (e) => {
                    microanim.framework.system.TLogger.Fatal("TImage::Load_Exec", "LoadFailure: \'" + this.fURL + "\'", e, false);
                    reject(e);
                    return null;
                };
                this.fBitmap.src = this.fURL;
            });
            return ret;
        }

        public SetPosLeftTop(x : number, y : number) {
            this.fDimensions.SetLeftTop(x, y);
        }

        /**
         * @param isVisible
         */
        public SetVisible(isVisible : boolean) {
            this.fIsVisible = isVisible;
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.gfx.sys {
    /**
     * @author Peter Hoppe
     */
    export class TView {
        private fCanvas : microanim.framework.gfx.sys.TViewport;

        private fLayers : microanim.framework.aux.storage.TCollection<microanim.framework.gfx.sys.TLayer>;

        public constructor(idCanvas : string) {
            this.fLayers = new microanim.framework.aux.storage.TCollection<microanim.framework.gfx.sys.TLayer>();
            this.fCanvas = new microanim.framework.gfx.sys.TViewport(idCanvas);
        }

        public Draw() {
            var nL : number;
            var iL : number;
            var l : microanim.framework.gfx.sys.TLayer;
            this.fCanvas.Clear();
            nL = this.fLayers.GetNumElements();
            if(nL >= 1) {
                for(iL = 0; iL < nL; iL++) {
                    l = this.fLayers.GetElementByIndex(iL);
                    l.Draw(this.fCanvas);
                }
            }
        }

        /**
         * @param img
         * @param idLayer
         */
        public Image_Add(img : microanim.framework.gfx.primitives.TImage, idLayer : string) {
            var hasLayer : boolean;
            var l : microanim.framework.gfx.sys.TLayer;
            hasLayer = this.fLayers.HasElement(idLayer);
            if(!hasLayer) {
                l = new microanim.framework.gfx.sys.TLayer(this, idLayer);
                this.fLayers.Add(idLayer, l);
            } else {
                l = this.fLayers.GetElementByKey(idLayer);
            }
            l.Resource_GFX_Add(img);
        }

        public Image_SetPos(id : string, target : microanim.framework.gfx.geom.primitives.TVector2D, isRelative : boolean) {
        }

        public Image_SetRot(id : string, angle : number, isRelative : boolean) {
        }

        public Image_SetScale(id : string, factor : number, isRelative : boolean) {
        }

        public Image_SetVisible(id : string, isVisible : boolean) {
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.aux.storage {
    /**
     * @author Peter Hoppe
     */
    export class TCollection<T> {
        private fHashMap : Object;

        private fValues : Object[];

        public constructor() {
            this.fHashMap = <Object>new Object();
            this.fValues = new Array(0);
        }

        public Add(key : string, obj : T) {
            var node : Object;
            this._AssertExistsByKey(key, true);
            node = <Object>new Object();
            node["value"] = obj;
            node["i"] = this.fValues.length;
            node["key"] = key;
            this.fHashMap[key] = node;
            this.fValues[this.fValues.length] = node;
        }

        public Clear() {
            this.fHashMap = <Object>new Object();
            this.fValues = new Array(0);
        }

        public GetElementByIndex(i : number) : T {
            var node : Object;
            var ret : T;
            this._AssertExistsByIndex(i);
            node = this.fValues[i];
            ret = (<T>node["value"]);
            return ret;
        }

        public GetElementByKey(key : string) : T {
            var node : Object;
            var ret : T;
            this._AssertExistsByKey(key, false);
            node = (<Object>this.fHashMap[key]);
            ret = (<T>node["value"]);
            return ret;
        }

        public GetLookup_IndexByKey(key : string) : number {
            var node : Object;
            var ret : number;
            this._AssertExistsByKey(key, false);
            node = (<Object>this.fHashMap[key]);
            ret = <number>node["i"];
            return ret;
        }

        public GetLookup_KeyByIndex(i : number) : string {
            var node : Object;
            var ret : string;
            this._AssertExistsByIndex(i);
            node = <Object>this.fValues[i];
            ret = <string>node["key"];
            return ret;
        }

        public GetKeys() : microanim.framework.aux.storage.TArray<string> {
            var i : number;
            var node : Object;
            var k : string;
            var ret : microanim.framework.aux.storage.TArray<string>;
            ret = new microanim.framework.aux.storage.TArray<string>();
            if(this.fValues.length >= 1) {
                for(i = 0; i < this.fValues.length; i++) {
                    node = this.fValues[i];
                    k = <string>node["key"];
                    ret.Push(k);
                }
            }
            return ret;
        }

        public GetNumElements() : number {
            return this.fValues.length;
        }

        public HasElement(key : string) : boolean {
            var ret : boolean;
            ret = this.fHashMap.hasOwnProperty(key);
            return ret;
        }

        private _AssertExistsByIndex(i : number) {
            if((i < 0) || (i >= this.fValues.length)) {
                throw new RangeError("Index must be an integer in range: [0, " + this.fValues.length + "[. Given: " + i);
            }
        }

        private _AssertExistsByKey(key : string, doInvert : boolean) {
            var err : string;
            var isOK : boolean;
            isOK = this.fHashMap.hasOwnProperty(key);
            isOK = doInvert?(!isOK):(isOK);
            if(!isOK) {
                err = doInvert?("Duplicate key: \'" + key + "\'"):("Non-existant key: \'" + key + "\'");
                throw new ReferenceError(err);
            }
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.system {
    export enum EMimeType {
        kApplicationJSON, kTextPlain
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.program.lang {
    /**
     * @author peter
     */
    export class VCommand {
        public static Create(descriptor : any) : VCommand {
            var verb : string;
            var ret : VCommand;
            verb = <string>microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(descriptor, "$.cmd");
            if(verb === "moveTo") {
                ret = new microanim.framework.program.lang.TCmdMoveTo(descriptor);
            } else if(verb === "setTransparency") {
                ret = new microanim.framework.program.lang.TCmdSetTransparency(descriptor);
            } else {
                microanim.framework.system.TLogger.Fatal("VCommand::Create", "Can\'t recognize given descriptor", descriptor, false);
                throw new SyntaxError("VCommand::Create(): ");
            }
            return ret;
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.program.lang {
    export class TCmdSetTransparency extends microanim.framework.program.lang.VCommand {
        private fIDSubject : string;

        private fAlpha : number;

        private fTime : number;

        public constructor(descriptor : any) {
            super();
            this.fAlpha = 0;
            this.fTime = 0;
            this.fIDSubject = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(descriptor, "$.args.subject");
            this.fAlpha = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(descriptor, "$.args.alpha");
            this.fTime = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(descriptor, "$.args.time");
            this._AssertOK();
            microanim.framework.system.TLogger.Message("TCmdSetTransparency::cTor", "Created new command. Details: ", this);
        }

        private _AssertOK() {
            if(this.fAlpha < 0.0 || this.fAlpha > 1.0) {
                microanim.framework.system.TLogger.Fatal("TCmdMoveTo::_AssertOK", "Alpha must be in [0.0, 1.0]. Given: " + this.fAlpha, this, false);
                throw new SyntaxError("Faulty initialization parameters.");
            }
            if(this.fTime < 0) {
                microanim.framework.system.TLogger.Fatal("TCmdMoveTo::_AssertOK", "Transition time must be in [0, maxInt]. Given: " + this.fTime, this, false);
                throw new SyntaxError("Faulty initialization parameters.");
            }
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.program.lang {
    /**
     * @author peter
     */
    export class TCmdMoveTo extends microanim.framework.program.lang.VCommand {
        private fIDSubject : string;

        private fX : number;

        private fY : number;

        private fTime : number;

        public constructor(descriptor : any) {
            super();
            this.fX = 0;
            this.fY = 0;
            this.fTime = 0;
            this.fIDSubject = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(descriptor, "$.args.subject");
            this.fX = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(descriptor, "$.args.x");
            this.fY = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(descriptor, "$.args.y");
            this.fTime = microanim.framework.aux.json.path.TJSONPathQuery.ValueOf<any>(descriptor, "$.args.time");
            this._AssertOK();
            microanim.framework.system.TLogger.Message("TCmdMoveTo::cTor", "Created new command. Details: ", this);
        }

        private _AssertOK() {
            if(this.fTime < 0) {
                microanim.framework.system.TLogger.Fatal("TCmdMoveTo::_AssertOK", "Transition time must be in [0, maxInt]. Given: " + this.fTime, this, false);
                throw new SyntaxError("Faulty initialization parameters.");
            }
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.gfx.geom.primitives {
    /**
     * @author Peter Hoppe
     */
    export class TVector2D {
        private fHasChanged : boolean;

        private fLen : number;

        private fP0 : microanim.framework.gfx.geom.primitives.TCoord2D;

        private fP1 : microanim.framework.gfx.geom.primitives.TCoord2D;

        private fPZeroed : microanim.framework.gfx.geom.primitives.TCoord2D;

        public constructor(x : number, y : number) {
            this.fHasChanged = false;
            this.fLen = 0;
            this.fP0 = new microanim.framework.gfx.geom.primitives.TCoord2D(x, y);
            this.fP1 = new microanim.framework.gfx.geom.primitives.TCoord2D(x, y);
            this.fHasChanged = true;
            this._ReInit();
        }

        public GetLen() : number {
            return this.fLen;
        }

        public GetP0() : microanim.framework.gfx.geom.primitives.TCoord2D {
            var ret : microanim.framework.gfx.geom.primitives.TCoord2D;
            ret = this.fP0.GetCopy();
            return ret;
        }

        public GetP1() : microanim.framework.gfx.geom.primitives.TCoord2D {
            var ret : microanim.framework.gfx.geom.primitives.TCoord2D;
            ret = this.fP1.GetCopy();
            return ret;
        }

        public GetPZeroed() : microanim.framework.gfx.geom.primitives.TCoord2D {
            var ret : microanim.framework.gfx.geom.primitives.TCoord2D;
            ret = this.fPZeroed.GetCopy();
            return ret;
        }

        private _ReInit() {
            var xDiff : number;
            var yDiff : number;
            if(this.fHasChanged) {
                this.fHasChanged = false;
                xDiff = this.fP1.fX - this.fP0.fX;
                yDiff = this.fP1.fY = this.fP0.fY;
                this.fPZeroed = new microanim.framework.gfx.geom.primitives.TCoord2D(xDiff, yDiff);
                this.fLen = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
            }
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.gfx.sys {
    /**
     * @author Peter Hoppe
     */
    export class TLayer {
        private fResources : microanim.framework.aux.storage.TCollection<microanim.framework.gfx.primitives.VResourceGFX>;

        public constructor(host : microanim.framework.gfx.sys.TView, id : string) {
            this.fResources = new microanim.framework.aux.storage.TCollection<microanim.framework.gfx.primitives.VResourceGFX>();
        }

        public Draw(canvas : microanim.framework.gfx.sys.TViewport) {
            var nR : number;
            var iR : number;
            var r : microanim.framework.gfx.primitives.VResourceGFX;
            nR = this.fResources.GetNumElements();
            if(nR >= 1) {
                for(iR = 0; iR < nR; iR++) {
                    r = this.fResources.GetElementByIndex(iR);
                    canvas.Draw(r);
                }
            }
        }

        public GetNumResources() : number {
            return this.fResources.GetNumElements();
        }

        public GetResourceByIndex(i : number) : microanim.framework.gfx.primitives.VResourceGFX {
            var ret : microanim.framework.gfx.primitives.VResourceGFX;
            ret = this.fResources.GetElementByIndex(i);
            return ret;
        }

        /**
         * @param res
         */
        public Resource_GFX_Add(res : microanim.framework.gfx.primitives.VResourceGFX) {
            var key : string;
            key = res.GetID();
            this.fResources.Add(key, res);
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.gfx.geom.primitives {
    /**
     * @author Peter Hoppe
     */
    export class TCoord2D {
        public fX : number;

        public fY : number;

        public constructor(x : number, y : number) {
            this.fX = 0;
            this.fY = 0;
            this.fX = x;
            this.fY = y;
        }

        public GetCopy() : TCoord2D {
            var ret : TCoord2D;
            ret = new TCoord2D(this.fX, this.fY);
            return ret;
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.controller {
    /**
     * @author Peter Hoppe
     */
    export class TController {
        private static kDoDebug : boolean = true;

        private static kTCycle : number = 100;

        private fHost : microanim.framework.application.TApplication;

        private fQueue : microanim.framework.aux.storage.TArray<TController.EEvent>;

        private fState : TController.EState;

        public constructor(host : microanim.framework.application.TApplication) {
            this.fHost = host;
            this.fQueue = new microanim.framework.aux.storage.TArray<TController.EEvent>();
            this.fState = TController.EState.kNull;
        }

        public OnProgramStart() {
            if(this.fState === TController.EState.kNull) {
                this.fState = TController.EState.kStart;
                this._Run();
            }
        }

        _Dbg_ReportEvent(stateOld : TController.EState, stateNew : TController.EState, event : TController.EEvent, isValid : boolean) {
            if(TController.kDoDebug) {
                if(isValid) {
                    console.log("T_CTRL_Controller::Transition (valid)  : " + stateOld + " (" + event + ") -> " + stateNew);
                } else {
                    console.log("T_CTRL_Controller::Transition (invalid): " + stateOld + " (" + event + ")");
                }
            }
        }

        _DoCycle() {
            var ev : TController.EEvent;
            var nEv : number;
            var stO : TController.EState;
            var isValid : boolean;
            nEv = this.fQueue.GetNumElements();
            ev = TController.EEvent.kNull;
            if(nEv >= 1) {
                ev = this.fQueue.Dequeue();
                stO = this.fState;
                switch((ev)) {
                default:
                    isValid = true;
                }
                this._Dbg_ReportEvent(stO, this.fState, ev, isValid);
            }
        }

        _Run() {
            this._DoCycle();
            window.setTimeout((() => {
                this._Run();
            }), TController.kTCycle);
        }
    }

    export namespace TController {

        export enum EEvent {
            kNull
        }

        export enum EState {
            kAnimRunning, kNull, kStart
        }
    }

}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.system {
    /**
     * @author peter
     */
    export class TExtDependency {
        private static kDefaultTimeout : number = 2000;

        public static AssertHasGlobalDependency(libID : string, libName : string) {
            var has : boolean;
            has = window.hasOwnProperty(libID);
            if(!has) {
                throw new Error("Missing ext. library: \'" + libName + "\'. Needs to be loaded at the start of this program (microanim.framework.system.TExtDependency.LoadJSLibrary()).");
            }
        }

        public static LoadJSLibrary(url : string) : Promise<any> {
            var host : Document;
            var head : HTMLHeadElement;
            var newScript : HTMLScriptElement;
            var ret : Promise<any>;
            host = window.document;
            head = host.head;
            newScript = <HTMLScriptElement>host.createElement("script");
            ret = new Promise<any>(((head,newScript) => {
                return (resolve, reject) => {
                    newScript.onload = (e) => {
                        microanim.framework.system.TLogger.Message("TExtDependencyLoader::LoadJSLibrary", "LoadSuccess: \'" + url + "\'");
                        resolve(e);
                        return null;
                    };
                    newScript.onerror = (e) => {
                        microanim.framework.system.TLogger.Fatal("TExtDependencyLoader::LoadJSLibrary", "Recource: LoadFailure: \'" + url + "\'", e, false);
                        reject(e);
                        return null;
                    };
                    head.appendChild(newScript);
                    newScript.src = url;
                }
            })(head,newScript));
            return ret;
        }

        public static LoadText(url : string, mimeType : microanim.framework.system.EMimeType, timeout : number) : Promise<string> {
            var tout : number;
            var xhr : XMLHttpRequest;
            var mt : string;
            var ret : Promise<string>;
            tout = (timeout >= 1)?timeout:TExtDependency.kDefaultTimeout;
            mt = TExtDependency._GetMimeType(mimeType);
            xhr = new XMLHttpRequest();
            xhr.timeout = tout;
            xhr.overrideMimeType(mt);
            xhr.open("GET", url);
            xhr.responseType = "text";
            ret = new Promise<string>(((xhr) => {
                return (resolve, reject) => {
                    xhr.onreadystatechange = (e) => {
                        if(xhr.readyState === 4) {
                            if(xhr.status === 200) {
                                microanim.framework.system.TLogger.Message("TExtDependencyLoader::LoadText", "Resource: LoadSuccess: \'" + url + "\'");
                                resolve(xhr.responseText);
                            } else {
                                microanim.framework.system.TLogger.Fatal("TExtDependencyLoader::LoadText", "Recource: LoadFailure (" + xhr.status + "): \'" + url + "\'", e, false);
                                reject(e);
                            }
                        }
                        return null;
                    };
                    xhr.onerror = (e) => {
                        microanim.framework.system.TLogger.Fatal("TExtDependencyLoader::LoadText", "Recource: LoadFailure (" + xhr.status + "): \'" + url + "\'", e, false);
                        reject(e);
                        return null;
                    };
                    xhr.ontimeout = (e) => {
                        microanim.framework.system.TLogger.Fatal("TExtDependencyLoader::LoadText", "Recource: LoadFailure (timeout): \'" + url + "\'. Max Load time [ms]: " + tout, e, false);
                        return null;
                    };
                    xhr.send();
                }
            })(xhr));
            return ret;
        }

        private static _GetMimeType(t : microanim.framework.system.EMimeType) : string {
            var ret : string;
            ret = null;
            switch((t)) {
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
        }

        /**
         * Reserved for later use.
         * 
         * @param t
         * @return
         */
        private static _GetResponseType(t : microanim.framework.system.EResponseType) : string {
            var ret : string;
            ret = null;
            switch((t)) {
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
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.scene {
    /**
     * @author Peter Hoppe
     */
    export class TScene {
        private fHost : microanim.framework.application.TApplication;

        private fResources : microanim.framework.res.TResourcePack;

        private fView : microanim.framework.gfx.sys.TView;

        public constructor(host : microanim.framework.application.TApplication, idCanvas : string) {
            this.fHost = host;
            this.fResources = new microanim.framework.res.TResourcePack(this);
            this.fView = new microanim.framework.gfx.sys.TView(idCanvas);
        }

        public GetNumResources() : number {
            var ret : number;
            ret = this.fResources.GetNumElements();
            return ret;
        }

        /**
         * 
         */
        public GFX_Refresh() {
            this.fView.Draw();
        }

        public RegisterResources(descriptors : microanim.framework.aux.storage.TArray<microanim.framework.program.res.VResourceRef>) {
            var nRes : number;
            var i : number;
            var r : microanim.framework.program.res.VResourceRef;
            nRes = descriptors.GetNumElements();
            if(nRes >= 1) {
                for(i = 0; i < nRes; i++) {
                    r = descriptors.GetElementByIndex(i);
                    this._RegisterResource(r);
                }
            }
        }

        public Resources_Load_Exec() : Promise<any> {
            return this.fResources.Load_Exec();
        }

        private _RegisterResource(descr : microanim.framework.program.res.VResourceRef) {
            var rt : microanim.framework.program.res.EResType;
            rt = descr.GetType();
            microanim.framework.system.TLogger.Message("TScene::_RegisterResource", "Registering resource:\n", descr);
            switch((rt)) {
            case microanim.framework.program.res.EResType.kImage:
                this._RegisterResource_Image(descr);
                break;
            default:
                throw new Error("Unknown resource type (" + rt + ") for descriptor " + microanim.framework.system.TDebug.GetStringified(descr));
            }
        }

        private _RegisterResource_Image(descr : microanim.framework.program.res.VResourceRef) {
            var dImg : microanim.framework.program.res.TResourceRefImage;
            var key : string;
            var url : string;
            var idLayer : string;
            var img : microanim.framework.gfx.primitives.TImage;
            dImg = <microanim.framework.program.res.TResourceRefImage>descr;
            key = dImg.GetKey();
            url = dImg.GetURI();
            idLayer = dImg.GetIDLayer();
            img = new microanim.framework.gfx.primitives.TImage(key, url);
            this.fResources.Add(img);
            this.fView.Image_Add(img, idLayer);
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.aux.json.validation {
    /**
     * @author peter
     */
    export class TValidatorJSONErr {
        private fField : string;

        private fMessage : string;

        constructor(err : Object) {
            this.fField = <string>err["field"];
            this.fMessage = <string>err["message"];
        }

        public GetField() : string {
            return this.fField;
        }

        public GetMessage() : string {
            return this.fMessage;
        }

        public GetDump() : string {
            var ret : string;
            ret = "\'" + this.fField + "\': " + this.fMessage;
            return ret;
        }
    }
}
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
namespace microanim.framework.system {
    export enum EResponseType {
        kArrayBuffer, kBlob, kDocument, kText
    }
}


microanim.TMain.main(null);
