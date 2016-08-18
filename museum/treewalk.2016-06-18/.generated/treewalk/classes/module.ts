"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class T_APP_Application {
    private fController: T_CTRL_Controller;

    private fScene: T_SCN_Scene;

    public constructor(idCanvas: string)  {
        this.fScene = new T_SCN_Scene(this, idCanvas);
    }

    /**
     * 
     */
    public GFX_Refresh()  {
        this.fScene.GFX_Refresh();
    }

    public Resource_Img_Add(id: string, url: string, idLayer: string)  {
        var ico: T_GFX_Primitive_Icon;
        ico = new T_GFX_Primitive_Icon(id, url);
        this.fScene.Resource_GFX_Add(ico, idLayer);
    }

    /**
     * @param key
     * @param x
     * @param y
     */
    public Resource_Img_Pos_Set(key: string, x: number, y: number)  {
        this.fScene.Resource_Img_Pos_Set(key, x, y);
    }

    /**
     * @param key
     * @param isVisible
     */
    public Resource_Img_Visible_Set(key: string, isVisible: boolean)  {
        this.fScene.Resource_Img_Visible_Set(key, isVisible);
    }

    /**
     * 
     */
    public Resources_Load()  {
        this.fScene.Resources_Load();
    }

    public View_Layer_Add(name: string)  {
        this.fScene.View_Layer_Add(name);
    }
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class T_AUX_Geom_Coord2D {
    public fX: number;

    public fY: number;

    public constructor(x: number, y: number)  {
        this.fX = x;
        this.fY = y;
    }

    public GetCopy() : T_AUX_Geom_Coord2D {
        var ret: T_AUX_Geom_Coord2D;
        ret = new T_AUX_Geom_Coord2D(this.fX, this.fY);
        return ret;
    }
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class T_AUX_Geom_Vector2D {
    private fHasChanged: boolean;

    private fLen: number;

    private fP0: T_AUX_Geom_Coord2D;

    private fP1: T_AUX_Geom_Coord2D;

    private fPNorm: T_AUX_Geom_Coord2D;

    public constructor(x: number, y: number)  {
        this.fP0 = new T_AUX_Geom_Coord2D(x, y);
        this.fP1 = new T_AUX_Geom_Coord2D(x, y);
        this.fHasChanged = true;
        this._ReInit();
    }

    public GetLen() : number {
        return this.fLen;
    }

    public GetP0() : T_AUX_Geom_Coord2D {
        var ret: T_AUX_Geom_Coord2D;
        ret = this.fP0.GetCopy();
        return ret;
    }

    public GetP1() : T_AUX_Geom_Coord2D {
        var ret: T_AUX_Geom_Coord2D;
        ret = this.fP1.GetCopy();
        return ret;
    }

    public GetPNormalized() : T_AUX_Geom_Coord2D {
        var ret: T_AUX_Geom_Coord2D;
        ret = this.fPNorm.GetCopy();
        return ret;
    }

    private _ReInit()  {
        var xDiff: number;
        var yDiff: number;
        if((this.fHasChanged)) {
            this.fHasChanged = false;
            xDiff = this.fP1.fX - this.fP0.fX;
            yDiff = this.fP1.fY = this.fP0.fY;
            this.fPNorm = new T_AUX_Geom_Coord2D(xDiff, yDiff);
            this.fLen = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        }
    }
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class T_AUX_Storage_Collection<T> {
    private fHashMap: Object;

    private fValues: Object[];

    public constructor()  {
        this.fHashMap = <Object>new Object();
        this.fValues = [];
    }

    public Add(key: string, obj: T)  {
        var node: Object;
        this._AssertExistsByKey(key, true);
        node = <Object>new Object();
        node["value"] = obj;
        node["i"] = this.fValues.length;
        node["key"] = key;
        this.fHashMap[key] = node;
        this.fValues[this.fValues.length] = node;
    }

    public GetElementByIndex(i: number) : T {
        var node: Object;
        var ret: T;
        this._AssertExistsByIndex(i);
        node = this.fValues[i];
        ret = (<T>node["value"]);
        return ret;
    }

    public GetElementByKey(key: string) : T {
        var node: Object;
        var ret: T;
        this._AssertExistsByKey(key, false);
        node = (<Object>this.fHashMap[key]);
        ret = (<T>node["value"]);
        return ret;
    }

    public GetLookup_IndexByKey(key: string) : number {
        var node: Object;
        var ret: number;
        this._AssertExistsByKey(key, false);
        node = (<Object>this.fHashMap[key]);
        ret = <number>node["i"];
        return ret;
    }

    public GetLookup_KeyByIndex(i: number) : string {
        var node: Object;
        var ret: string;
        this._AssertExistsByIndex(i);
        node = (<Object>this.fValues[i]);
        ret = (<string>node["key"]);
        return ret;
    }

    public GetNumElements() : number {
        return this.fValues.length;
    }

    private _AssertExistsByIndex(i: number)  {
        if(((i < 0) || (i >= this.fValues.length))) {
            throw new RangeError("Index must be an integer in range: [0, " + this.fValues.length + "[. Given: " + i);
        }
    }

    private _AssertExistsByKey(key: string, doInvert: boolean)  {
        var err: string;
        var isOK: boolean;
        isOK = this.fHashMap.hasOwnProperty(key);
        isOK = doInvert?(!isOK):(isOK);
        if((!isOK)) {
            err = doInvert?("Duplicate key: \'" + key + "\'"):("Non-existant key: \'" + key + "\'");
            throw new ReferenceError(err);
        }
    }
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class T_CTRL_Controller {
    private static kTCycle: number = 100;

    private fScene: T_SCN_Scene;

    public constructor(scene: T_SCN_Scene)  {
        this.fScene = scene;
    }

    public OnFinishedLoad(i: number)  {
    }

    public Run()  {
        this._DoCycle();
        window.setTimeout((() => {
            this.Run();
        }), T_CTRL_Controller.kTCycle);
    }

    private _DoCycle()  {
    }
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class T_GFX_Primitive_Icon extends V_GFX_Resource {
    private fBitmap: HTMLImageElement;

    private fHeight: number;

    private fIsVisible: boolean;

    private fOffsetX: number;

    private fOffsetY: number;

    private fURL: string;

    private fWidth: number;

    public constructor(id: string, url: string)  {
        super(id);
        this.fID = id;
        this.fURL = url;
        this.fOffsetX = 0;
        this.fOffsetY = 0;
        this.fIsVisible = false;
        this.fBitmap = <HTMLImageElement>document.createElement("img");
    }

    public Draw(graphics: CanvasRenderingContext2D)  {
        if((this.fIsVisible)) {
            graphics.drawImage(this.fBitmap, this.fOffsetX, this.fOffsetY, this.fWidth, this.fHeight);
        }
    }

    public Load()  {
        this.fBitmap.onload = (event) => {
            this.fHeight = this.fBitmap.clientHeight;
            this.fWidth = this.fBitmap.clientWidth;
            this.fHost.OnLoadResource();
            return true;
        };
        this.fBitmap.src = this.fURL;
    }

    public SetPosition(x: number, y: number)  {
        this.fOffsetX = x;
        this.fOffsetY = y;
    }

    /**
     * @param isVisible
     */
    public SetVisible(isVisible: boolean)  {
        this.fIsVisible = isVisible;
    }
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class T_GFX_Sys_Layer {
    private fHost: T_GFX_Sys_View;

    private fID: string;

    private fResources: T_AUX_Storage_Collection<V_GFX_Resource>;

    public constructor(host: T_GFX_Sys_View, id: string)  {
        this.fHost = host;
        this.fID = id;
        this.fResources = new T_AUX_Storage_Collection<V_GFX_Resource>();
    }

    /**
     * @param res
     */
    public Resource_GFX_Add(res: V_GFX_Resource)  {
        var key: string;
        key = res.GetID();
        this.fResources.Add(key, res);
    }
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class T_GFX_Sys_View {
    private fCanvas: T_GFX_Sys_Viewport;

    private fLayers: T_AUX_Storage_Collection<T_GFX_Sys_Layer>;

    public constructor(idCanvas: string)  {
        this.fLayers = new T_AUX_Storage_Collection<T_GFX_Sys_Layer>();
        this.fCanvas = new T_GFX_Sys_Viewport(idCanvas);
    }

    public Draw()  {
    }

    public Layer_Add(id: string)  {
        var layer: T_GFX_Sys_Layer;
        layer = new T_GFX_Sys_Layer(this, id);
        this.fLayers.Add(id, layer);
    }

    /**
     * @param res
     * @param idLayer
     */
    public Resource_GFX_Add(res: V_GFX_Resource, idLayer: string)  {
        var l: T_GFX_Sys_Layer;
        l = this.fLayers.GetElementByKey(idLayer);
        l.Resource_GFX_Add(res);
    }
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class T_GFX_Sys_Viewport {
    private fCanvas: HTMLCanvasElement;

    private fGraphics: CanvasRenderingContext2D;

    private fHeight: number;

    private fWidth: number;

    public constructor(id: string)  {
        this.fCanvas = <HTMLCanvasElement>document.getElementById(id);
        if((this.fCanvas == null)) {
            throw new Error("Canvas element does not exist: " + id);
        }
        this.fGraphics = this.fCanvas.getContext("2d");
        this.fHeight = this.fCanvas.height;
        this.fWidth = this.fCanvas.width;
    }

    public Draw(p: V_GFX_Resource)  {
        p.Draw(this.fGraphics);
    }
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
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
export class T_SCN_ResourcePack {
    private static giResLoading: number = -1;

    private fHost: T_SCN_Scene;

    private fResources: T_AUX_Storage_Collection<V_SCN_Resource>;

    private fState: T_SCN_ResourcePack_State;

    public constructor(t_SCN_Scene: T_SCN_Scene)  {
        T_SCN_ResourcePack.giResLoading = 0;
        this.fHost = t_SCN_Scene;
        this.fResources = new T_AUX_Storage_Collection<V_SCN_Resource>();
        this.fState = T_SCN_ResourcePack_State.kInit;
    }

    public Add(r: V_SCN_Resource)  {
        var k: string;
        k = r.GetID();
        if((this.fState == T_SCN_ResourcePack_State.kInit)) {
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
    public GetElementByID(key: string) : V_SCN_Resource {
        var ret: V_SCN_Resource;
        ret = this.fResources.GetElementByKey(key);
        return ret;
    }

    public GetElementByIndex(i: number) : V_SCN_Resource {
        var ret: V_SCN_Resource;
        ret = this.fResources.GetElementByIndex(i);
        return ret;
    }

    public Load()  {
        this._LoadNextResource();
    }

    /**
     * Event handler (package internal): Resource has loaded.
     * Will be called by each resource (i.e. from outside this class)
     * when it has finished loading.  See [100]
     */
    OnLoadResource()  {
        this._LoadNextResource();
    }

    /**
     * Loads the next-to-be-loaded resource. See [100].
     */
    private _LoadNextResource()  {
        var n: number;
        var r: V_SCN_Resource;
        if((this.fState != T_SCN_ResourcePack_State.kInit)) {
            throw new Error("Resources can only be loaded once. You must Add(...) all resources before calling Load ().");
        }
        n = this.fResources.GetNumElements();
        if((T_SCN_ResourcePack.giResLoading < n)) {
            r = this.fResources.GetElementByIndex(T_SCN_ResourcePack.giResLoading);
            T_SCN_ResourcePack.giResLoading++;
            r.Load();
        } else {
            this.fHost.OnLoadResources();
        }
    }
}

export enum T_SCN_ResourcePack_State {
    kInit, kLoading, kWait
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class T_SCN_Scene {
    private fHost: T_APP_Application;

    private fResources: T_SCN_ResourcePack;

    private fView: T_GFX_Sys_View;

    public constructor(host: T_APP_Application, idCanvas: string)  {
        this.fHost = host;
        this.fResources = new T_SCN_ResourcePack(this);
        this.fView = new T_GFX_Sys_View(idCanvas);
    }

    /**
     * 
     */
    public GFX_Refresh()  {
        this.fView.Draw();
    }

    public Resource_GFX_Add(res: V_GFX_Resource, idLayer: string)  {
        this.fResources.Add(res);
        this.fView.Resource_GFX_Add(res, idLayer);
    }

    public Resource_Img_Pos_Set(key: string, x: number, y: number)  {
        var img: T_GFX_Primitive_Icon;
        img = <T_GFX_Primitive_Icon>this.fResources.GetElementByID(key);
        img.SetPosition(x, y);
    }

    /**
     * @param key
     * @param isVisible
     */
    public Resource_Img_Visible_Set(key: string, isVisible: boolean)  {
        var img: T_GFX_Primitive_Icon;
        img = <T_GFX_Primitive_Icon>this.fResources.GetElementByID(key);
        img.SetVisible(isVisible);
    }

    public Resources_Load()  {
        this.fResources.Load();
    }

    public View_Layer_Add(name: string)  {
        this.fView.Layer_Add(name);
    }

    /**
     * Event handler: Resource pack has finished loading all resources.
     */
    OnLoadResources()  {
        alert("All resources loaded");
    }
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class V_GFX_Resource extends V_SCN_Resource {
    /**
     * @param id
     */
    public constructor(id: string)  {
        super(id);
    }

    public Draw(graphics: CanvasRenderingContext2D)  {
        throw new Error("Please override Draw (CanvasRenderingContext2D graphics)");
    }
}

"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
export class V_SCN_Resource {
    fID: string;

    fHost: T_SCN_ResourcePack;

    public constructor(id: string)  {
        this.fID = id;
        this.fHost = null;
    }

    public GetID() : string {
        return this.fID;
    }

    public Load()  {
        throw new Error("Please override Load()");
    }

    public SetHost(host: T_SCN_ResourcePack)  {
        if((this.fHost == null)) {
            this.fHost = host;
        } else {
            throw new Error("Host is already set.");
        }
    }
}


