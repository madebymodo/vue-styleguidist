"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_map_1 = __importDefault(require("ts-map"));
var Documentation = /** @class */ (function () {
    function Documentation(fullFilePath) {
        this.componentFullfilePath = fullFilePath;
        this.propsMap = new ts_map_1.default();
        this.methodsMap = new ts_map_1.default();
        this.slotsMap = new ts_map_1.default();
        this.eventsMap = new ts_map_1.default();
        this.originExtendsMixin = {};
        this.dataMap = new ts_map_1.default();
    }
    Documentation.prototype.setOrigin = function (origin) {
        this.originExtendsMixin = origin.extends ? { extends: origin.extends } : {};
        this.originExtendsMixin = origin.mixin ? { mixin: origin.mixin } : {};
    };
    Documentation.prototype.setDocsBlocks = function (docsBlocks) {
        this.docsBlocks = docsBlocks;
    };
    Documentation.prototype.set = function (key, value) {
        this.dataMap.set(key, value);
    };
    Documentation.prototype.get = function (key) {
        return this.dataMap.get(key);
    };
    Documentation.prototype.getPropDescriptor = function (propName) {
        var vModelDescriptor = this.propsMap.get('v-model');
        return vModelDescriptor && vModelDescriptor.name === propName
            ? vModelDescriptor
            : this.getDescriptor(propName, this.propsMap, function () { return ({
                name: propName
            }); });
    };
    Documentation.prototype.getMethodDescriptor = function (methodName) {
        return this.getDescriptor(methodName, this.methodsMap, function () { return ({
            name: methodName
        }); });
    };
    Documentation.prototype.getEventDescriptor = function (eventName) {
        return this.getDescriptor(eventName, this.eventsMap, function () { return ({
            name: eventName
        }); });
    };
    Documentation.prototype.getSlotDescriptor = function (slotName) {
        return this.getDescriptor(slotName, this.slotsMap, function () { return ({
            name: slotName
        }); });
    };
    Documentation.prototype.toObject = function () {
        var props = this.getObjectFromDescriptor(this.propsMap);
        var methods = this.getObjectFromDescriptor(this.methodsMap);
        var events = this.getObjectFromDescriptor(this.eventsMap);
        var slots = this.getObjectFromDescriptor(this.slotsMap);
        var obj = {};
        this.dataMap.forEach(function (value, key) {
            if (key) {
                obj[key] = value;
            }
        });
        if (this.docsBlocks) {
            obj.docsBlocks = this.docsBlocks;
        }
        return __assign(__assign({}, obj), { 
            // initialize non null params
            description: obj.description || '', tags: obj.tags || {}, 
            // set all the static properties
            exportName: obj.exportName, displayName: obj.displayName, props: props,
            events: events,
            methods: methods,
            slots: slots });
    };
    Documentation.prototype.getDescriptor = function (name, map, init) {
        var descriptor = map.get(name);
        if (!descriptor) {
            descriptor = init();
            descriptor = __assign(__assign({}, descriptor), this.originExtendsMixin);
            map.set(name, descriptor);
        }
        return descriptor;
    };
    Documentation.prototype.getObjectFromDescriptor = function (map) {
        if (map.size > 0) {
            var obj_1 = [];
            map.forEach(function (descriptor, name) {
                if (name && descriptor) {
                    obj_1.push(descriptor);
                }
            });
            return obj_1;
        }
        else {
            return undefined;
        }
    };
    return Documentation;
}());
exports.default = Documentation;
