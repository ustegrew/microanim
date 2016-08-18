"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author Peter Hoppe
 */
var T_APP_Application = (function () {
    function T_APP_Application(idCanvas) {
        this.fScene = new T_SCN_Scene(this, idCanvas);
    }
    /**
     *
     */
    T_APP_Application.prototype.GFX_Refresh = function () {
        this.fScene.GFX_Refresh();
    };
    T_APP_Application.prototype.Resource_Img_Add = function (id, url, idLayer) {
        var ico;
        ico = new T_GFX_Primitive_Icon(id, url);
        this.fScene.Resource_GFX_Add(ico, idLayer);
    };
    /**
     * @param key
     * @param x
     * @param y
     */
    T_APP_Application.prototype.Resource_Img_Pos_Set = function (key, x, y) {
        this.fScene.Resource_Img_Pos_Set(key, x, y);
    };
    /**
     * @param key
     * @param isVisible
     */
    T_APP_Application.prototype.Resource_Img_Visible_Set = function (key, isVisible) {
        this.fScene.Resource_Img_Visible_Set(key, isVisible);
    };
    /**
     *
     */
    T_APP_Application.prototype.Resources_Load = function () {
        this.fScene.Resources_Load();
    };
    T_APP_Application.prototype.View_Layer_Add = function (name) {
        this.fScene.View_Layer_Add(name);
    };
    return T_APP_Application;
}());
exports.T_APP_Application = T_APP_Application;
"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
var T_AUX_Geom_Coord2D = (function () {
    function T_AUX_Geom_Coord2D(x, y) {
        this.fX = x;
        this.fY = y;
    }
    T_AUX_Geom_Coord2D.prototype.GetCopy = function () {
        var ret;
        ret = new T_AUX_Geom_Coord2D(this.fX, this.fY);
        return ret;
    };
    return T_AUX_Geom_Coord2D;
}());
exports.T_AUX_Geom_Coord2D = T_AUX_Geom_Coord2D;
"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
var T_AUX_Geom_Vector2D = (function () {
    function T_AUX_Geom_Vector2D(x, y) {
        this.fP0 = new T_AUX_Geom_Coord2D(x, y);
        this.fP1 = new T_AUX_Geom_Coord2D(x, y);
        this.fHasChanged = true;
        this._ReInit();
    }
    T_AUX_Geom_Vector2D.prototype.GetLen = function () {
        return this.fLen;
    };
    T_AUX_Geom_Vector2D.prototype.GetP0 = function () {
        var ret;
        ret = this.fP0.GetCopy();
        return ret;
    };
    T_AUX_Geom_Vector2D.prototype.GetP1 = function () {
        var ret;
        ret = this.fP1.GetCopy();
        return ret;
    };
    T_AUX_Geom_Vector2D.prototype.GetPNormalized = function () {
        var ret;
        ret = this.fPNorm.GetCopy();
        return ret;
    };
    T_AUX_Geom_Vector2D.prototype._ReInit = function () {
        var xDiff;
        var yDiff;
        if ((this.fHasChanged)) {
            this.fHasChanged = false;
            xDiff = this.fP1.fX - this.fP0.fX;
            yDiff = this.fP1.fY = this.fP0.fY;
            this.fPNorm = new T_AUX_Geom_Coord2D(xDiff, yDiff);
            this.fLen = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        }
    };
    return T_AUX_Geom_Vector2D;
}());
exports.T_AUX_Geom_Vector2D = T_AUX_Geom_Vector2D;
"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
var T_AUX_Storage_Collection = (function () {
    function T_AUX_Storage_Collection() {
        this.fHashMap = new Object();
        this.fValues = [];
    }
    T_AUX_Storage_Collection.prototype.Add = function (key, obj) {
        var node;
        this._AssertExistsByKey(key, true);
        node = new Object();
        node["value"] = obj;
        node["i"] = this.fValues.length;
        node["key"] = key;
        this.fHashMap[key] = node;
        this.fValues[this.fValues.length] = node;
    };
    T_AUX_Storage_Collection.prototype.GetElementByIndex = function (i) {
        var node;
        var ret;
        this._AssertExistsByIndex(i);
        node = this.fValues[i];
        ret = node["value"];
        return ret;
    };
    T_AUX_Storage_Collection.prototype.GetElementByKey = function (key) {
        var node;
        var ret;
        this._AssertExistsByKey(key, false);
        node = this.fHashMap[key];
        ret = node["value"];
        return ret;
    };
    T_AUX_Storage_Collection.prototype.GetLookup_IndexByKey = function (key) {
        var node;
        var ret;
        this._AssertExistsByKey(key, false);
        node = this.fHashMap[key];
        ret = node["i"];
        return ret;
    };
    T_AUX_Storage_Collection.prototype.GetLookup_KeyByIndex = function (i) {
        var node;
        var ret;
        this._AssertExistsByIndex(i);
        node = this.fValues[i];
        ret = node["key"];
        return ret;
    };
    T_AUX_Storage_Collection.prototype.GetNumElements = function () {
        return this.fValues.length;
    };
    T_AUX_Storage_Collection.prototype._AssertExistsByIndex = function (i) {
        if (((i < 0) || (i >= this.fValues.length))) {
            throw new RangeError("Index must be an integer in range: [0, " + this.fValues.length + "[. Given: " + i);
        }
    };
    T_AUX_Storage_Collection.prototype._AssertExistsByKey = function (key, doInvert) {
        var err;
        var isOK;
        isOK = this.fHashMap.hasOwnProperty(key);
        isOK = doInvert ? (!isOK) : (isOK);
        if ((!isOK)) {
            err = doInvert ? ("Duplicate key: \'" + key + "\'") : ("Non-existant key: \'" + key + "\'");
            throw new ReferenceError(err);
        }
    };
    return T_AUX_Storage_Collection;
}());
exports.T_AUX_Storage_Collection = T_AUX_Storage_Collection;
"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
var T_CTRL_Controller = (function () {
    function T_CTRL_Controller(scene) {
        this.fScene = scene;
    }
    T_CTRL_Controller.prototype.OnFinishedLoad = function (i) {
    };
    T_CTRL_Controller.prototype.Run = function () {
        var _this = this;
        this._DoCycle();
        window.setTimeout((function () {
            _this.Run();
        }), T_CTRL_Controller.kTCycle);
    };
    T_CTRL_Controller.prototype._DoCycle = function () {
    };
    T_CTRL_Controller.kTCycle = 100;
    return T_CTRL_Controller;
}());
exports.T_CTRL_Controller = T_CTRL_Controller;
"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
var T_GFX_Primitive_Icon = (function (_super) {
    __extends(T_GFX_Primitive_Icon, _super);
    function T_GFX_Primitive_Icon(id, url) {
        _super.call(this, id);
        this.fID = id;
        this.fURL = url;
        this.fOffsetX = 0;
        this.fOffsetY = 0;
        this.fIsVisible = false;
        this.fBitmap = document.createElement("img");
    }
    T_GFX_Primitive_Icon.prototype.Draw = function (graphics) {
        if ((this.fIsVisible)) {
            graphics.drawImage(this.fBitmap, this.fOffsetX, this.fOffsetY, this.fWidth, this.fHeight);
        }
    };
    T_GFX_Primitive_Icon.prototype.Load = function () {
        var _this = this;
        this.fBitmap.onload = function (event) {
            _this.fHeight = _this.fBitmap.clientHeight;
            _this.fWidth = _this.fBitmap.clientWidth;
            _this.fHost.OnLoadResource();
            return true;
        };
        this.fBitmap.src = this.fURL;
    };
    T_GFX_Primitive_Icon.prototype.SetPosition = function (x, y) {
        this.fOffsetX = x;
        this.fOffsetY = y;
    };
    /**
     * @param isVisible
     */
    T_GFX_Primitive_Icon.prototype.SetVisible = function (isVisible) {
        this.fIsVisible = isVisible;
    };
    return T_GFX_Primitive_Icon;
}(V_GFX_Resource));
exports.T_GFX_Primitive_Icon = T_GFX_Primitive_Icon;
"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
var T_GFX_Sys_Layer = (function () {
    function T_GFX_Sys_Layer(host, id) {
        this.fHost = host;
        this.fID = id;
        this.fResources = new T_AUX_Storage_Collection();
    }
    /**
     * @param res
     */
    T_GFX_Sys_Layer.prototype.Resource_GFX_Add = function (res) {
        var key;
        key = res.GetID();
        this.fResources.Add(key, res);
    };
    return T_GFX_Sys_Layer;
}());
exports.T_GFX_Sys_Layer = T_GFX_Sys_Layer;
"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
var T_GFX_Sys_View = (function () {
    function T_GFX_Sys_View(idCanvas) {
        this.fLayers = new T_AUX_Storage_Collection();
        this.fCanvas = new T_GFX_Sys_Viewport(idCanvas);
    }
    T_GFX_Sys_View.prototype.Draw = function () {
    };
    T_GFX_Sys_View.prototype.Layer_Add = function (id) {
        var layer;
        layer = new T_GFX_Sys_Layer(this, id);
        this.fLayers.Add(id, layer);
    };
    /**
     * @param res
     * @param idLayer
     */
    T_GFX_Sys_View.prototype.Resource_GFX_Add = function (res, idLayer) {
        var l;
        l = this.fLayers.GetElementByKey(idLayer);
        l.Resource_GFX_Add(res);
    };
    return T_GFX_Sys_View;
}());
exports.T_GFX_Sys_View = T_GFX_Sys_View;
"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
var T_GFX_Sys_Viewport = (function () {
    function T_GFX_Sys_Viewport(id) {
        this.fCanvas = document.getElementById(id);
        if ((this.fCanvas == null)) {
            throw new Error("Canvas element does not exist: " + id);
        }
        this.fGraphics = this.fCanvas.getContext("2d");
        this.fHeight = this.fCanvas.height;
        this.fWidth = this.fCanvas.width;
    }
    T_GFX_Sys_Viewport.prototype.Draw = function (p) {
        p.Draw(this.fGraphics);
    };
    return T_GFX_Sys_Viewport;
}());
exports.T_GFX_Sys_Viewport = T_GFX_Sys_Viewport;
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
var T_SCN_ResourcePack = (function () {
    function T_SCN_ResourcePack(t_SCN_Scene) {
        T_SCN_ResourcePack.giResLoading = 0;
        this.fHost = t_SCN_Scene;
        this.fResources = new T_AUX_Storage_Collection();
        this.fState = T_SCN_ResourcePack_State.kInit;
    }
    T_SCN_ResourcePack.prototype.Add = function (r) {
        var k;
        k = r.GetID();
        if ((this.fState == T_SCN_ResourcePack_State.kInit)) {
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
    T_SCN_ResourcePack.prototype.GetElementByID = function (key) {
        var ret;
        ret = this.fResources.GetElementByKey(key);
        return ret;
    };
    T_SCN_ResourcePack.prototype.GetElementByIndex = function (i) {
        var ret;
        ret = this.fResources.GetElementByIndex(i);
        return ret;
    };
    T_SCN_ResourcePack.prototype.Load = function () {
        this._LoadNextResource();
    };
    /**
     * Event handler (package internal): Resource has loaded.
     * Will be called by each resource (i.e. from outside this class)
     * when it has finished loading.  See [100]
     */
    T_SCN_ResourcePack.prototype.OnLoadResource = function () {
        this._LoadNextResource();
    };
    /**
     * Loads the next-to-be-loaded resource. See [100].
     */
    T_SCN_ResourcePack.prototype._LoadNextResource = function () {
        var n;
        var r;
        if ((this.fState != T_SCN_ResourcePack_State.kInit)) {
            throw new Error("Resources can only be loaded once. You must Add(...) all resources before calling Load ().");
        }
        n = this.fResources.GetNumElements();
        if ((T_SCN_ResourcePack.giResLoading < n)) {
            r = this.fResources.GetElementByIndex(T_SCN_ResourcePack.giResLoading);
            T_SCN_ResourcePack.giResLoading++;
            r.Load();
        }
        else {
            this.fHost.OnLoadResources();
        }
    };
    T_SCN_ResourcePack.giResLoading = -1;
    return T_SCN_ResourcePack;
}());
exports.T_SCN_ResourcePack = T_SCN_ResourcePack;
(function (T_SCN_ResourcePack_State) {
    T_SCN_ResourcePack_State[T_SCN_ResourcePack_State["kInit"] = 0] = "kInit";
    T_SCN_ResourcePack_State[T_SCN_ResourcePack_State["kLoading"] = 1] = "kLoading";
    T_SCN_ResourcePack_State[T_SCN_ResourcePack_State["kWait"] = 2] = "kWait";
})(exports.T_SCN_ResourcePack_State || (exports.T_SCN_ResourcePack_State = {}));
var T_SCN_ResourcePack_State = exports.T_SCN_ResourcePack_State;
"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
var T_SCN_Scene = (function () {
    function T_SCN_Scene(host, idCanvas) {
        this.fHost = host;
        this.fResources = new T_SCN_ResourcePack(this);
        this.fView = new T_GFX_Sys_View(idCanvas);
    }
    /**
     *
     */
    T_SCN_Scene.prototype.GFX_Refresh = function () {
        this.fView.Draw();
    };
    T_SCN_Scene.prototype.Resource_GFX_Add = function (res, idLayer) {
        this.fResources.Add(res);
        this.fView.Resource_GFX_Add(res, idLayer);
    };
    T_SCN_Scene.prototype.Resource_Img_Pos_Set = function (key, x, y) {
        var img;
        img = this.fResources.GetElementByID(key);
        img.SetPosition(x, y);
    };
    /**
     * @param key
     * @param isVisible
     */
    T_SCN_Scene.prototype.Resource_Img_Visible_Set = function (key, isVisible) {
        var img;
        img = this.fResources.GetElementByID(key);
        img.SetVisible(isVisible);
    };
    T_SCN_Scene.prototype.Resources_Load = function () {
        this.fResources.Load();
    };
    T_SCN_Scene.prototype.View_Layer_Add = function (name) {
        this.fView.Layer_Add(name);
    };
    /**
     * Event handler: Resource pack has finished loading all resources.
     */
    T_SCN_Scene.prototype.OnLoadResources = function () {
        alert("All resources loaded");
    };
    return T_SCN_Scene;
}());
exports.T_SCN_Scene = T_SCN_Scene;
"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
var V_GFX_Resource = (function (_super) {
    __extends(V_GFX_Resource, _super);
    /**
     * @param id
     */
    function V_GFX_Resource(id) {
        _super.call(this, id);
    }
    V_GFX_Resource.prototype.Draw = function (graphics) {
        throw new Error("Please override Draw (CanvasRenderingContext2D graphics)");
    };
    return V_GFX_Resource;
}(V_SCN_Resource));
exports.V_GFX_Resource = V_GFX_Resource;
"Generated from Java with JSweet 1.0.0 - http://www.jsweet.org";
/**
 * @author Peter Hoppe
 */
var V_SCN_Resource = (function () {
    function V_SCN_Resource(id) {
        this.fID = id;
        this.fHost = null;
    }
    V_SCN_Resource.prototype.GetID = function () {
        return this.fID;
    };
    V_SCN_Resource.prototype.Load = function () {
        throw new Error("Please override Load()");
    };
    V_SCN_Resource.prototype.SetHost = function (host) {
        if ((this.fHost == null)) {
            this.fHost = host;
        }
        else {
            throw new Error("Host is already set.");
        }
    };
    return V_SCN_Resource;
}());
exports.V_SCN_Resource = V_SCN_Resource;
