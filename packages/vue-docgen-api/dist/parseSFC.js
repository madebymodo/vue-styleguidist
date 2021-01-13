"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var compiler_sfc_1 = require("@vue/compiler-sfc");
var path = __importStar(require("path"));
var fs_1 = require("fs");
var util_1 = require("util");
var template_handlers_1 = __importDefault(require("./template-handlers"));
var cacher_1 = __importDefault(require("./utils/cacher"));
var parse_template_1 = __importDefault(require("./parse-template"));
var Documentation_1 = __importDefault(require("./Documentation"));
var parse_script_1 = __importDefault(require("./parse-script"));
var script_handlers_1 = __importStar(require("./script-handlers"));
var read = util_1.promisify(fs_1.readFile);
function parseSFC(initialDoc, source, opt) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var documentation, parts, extTemplSrc, extTemplSource, _c, addTemplateHandlers, extSrc, extSource, _d, scriptSource, docsBlocks, scriptHandlers, docs, _e, displayName, dirName;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    documentation = initialDoc;
                    parts = cacher_1.default(function () { return compiler_sfc_1.parse(source, { pad: 'line' }); }, source).descriptor;
                    if (!parts.template) return [3 /*break*/, 4];
                    extTemplSrc = (_b = (_a = parts === null || parts === void 0 ? void 0 : parts.template) === null || _a === void 0 ? void 0 : _a.attrs) === null || _b === void 0 ? void 0 : _b.src;
                    // resolve aliases (does not support context and module resolution as in webpack,
                    // which would require the enhanced-resolve package)
                    if (opt.alias && Object.keys(opt.alias).length && typeof extTemplSrc === 'string') {
                        extTemplSrc = Object.entries(opt.alias).reduce(function (resolvedPath, _a) {
                            var alias = _a[0], aliasMapping = _a[1];
                            return resolvedPath.replace(alias, aliasMapping);
                        }, extTemplSrc);
                    }
                    if (!(extTemplSrc && typeof extTemplSrc === 'string' && extTemplSrc.length)) return [3 /*break*/, 2];
                    return [4 /*yield*/, read(path.resolve(path.dirname(opt.filePath), extTemplSrc), {
                            encoding: 'utf-8'
                        })];
                case 1:
                    _c = _f.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _c = '';
                    _f.label = 3;
                case 3:
                    extTemplSource = _c;
                    if (extTemplSource.length) {
                        parts.template.content = extTemplSource;
                    }
                    addTemplateHandlers = opt.addTemplateHandlers || [];
                    documentation = initialDoc || new Documentation_1.default(opt.filePath);
                    parse_template_1.default(parts.template, documentation, __spreadArrays(template_handlers_1.default, addTemplateHandlers), opt);
                    _f.label = 4;
                case 4:
                    extSrc = (parts && parts.script && parts.script.attrs
                        ? parts.script.attrs.src
                        : '');
                    if (!(extSrc && extSrc.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, read(path.resolve(path.dirname(opt.filePath), extSrc), {
                            encoding: 'utf-8'
                        })];
                case 5:
                    _d = _f.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _d = '';
                    _f.label = 7;
                case 7:
                    extSource = _d;
                    scriptSource = extSource.length
                        ? extSource
                        : parts.script
                            ? parts.script.content
                            : undefined;
                    opt.lang =
                        (parts.script && parts.script.attrs && /^tsx?$/.test(parts.script.attrs.lang)) ||
                            /\.tsx?$/i.test(extSrc)
                            ? 'ts'
                            : 'js';
                    if (parts.customBlocks) {
                        documentation = documentation || new Documentation_1.default(opt.filePath);
                        docsBlocks = parts.customBlocks
                            .filter(function (block) { return block.type === 'docs' && block.content && block.content.length; })
                            .map(function (block) { return block.content.trim(); });
                        if (docsBlocks.length) {
                            documentation.setDocsBlocks(docsBlocks);
                        }
                    }
                    scriptHandlers = opt.scriptHandlers || __spreadArrays(script_handlers_1.default, (opt.addScriptHandlers || []));
                    if (!scriptSource) return [3 /*break*/, 9];
                    return [4 /*yield*/, parse_script_1.default(scriptSource, opt.scriptPreHandlers || script_handlers_1.preHandlers, scriptHandlers, opt, documentation, initialDoc !== undefined)];
                case 8:
                    _e = (_f.sent()) || [];
                    return [3 /*break*/, 10];
                case 9:
                    _e = documentation
                        ? [documentation]
                        : [];
                    _f.label = 10;
                case 10:
                    docs = _e;
                    if (documentation && !documentation.get('displayName')) {
                        displayName = path.basename(opt.filePath).replace(/\.\w+$/, '');
                        dirName = path.basename(path.dirname(opt.filePath));
                        documentation.set('displayName', displayName.toLowerCase() === 'index' ? dirName : displayName);
                    }
                    return [2 /*return*/, docs];
            }
        });
    });
}
exports.default = parseSFC;
