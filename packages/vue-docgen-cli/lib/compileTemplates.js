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
exports.getDependencies = exports.functionalTag = exports.defaultExample = exports.component = exports.props = exports.slots = exports.methods = exports.events = void 0;
var path = __importStar(require("path"));
var vue_docgen_api_1 = require("vue-docgen-api");
var events_1 = __importDefault(require("./templates/events"));
exports.events = events_1.default;
var methods_1 = __importDefault(require("./templates/methods"));
exports.methods = methods_1.default;
var slots_1 = __importDefault(require("./templates/slots"));
exports.slots = slots_1.default;
var props_1 = __importDefault(require("./templates/props"));
exports.props = props_1.default;
var component_1 = __importDefault(require("./templates/component"));
exports.component = component_1.default;
var defaultExample_1 = __importDefault(require("./templates/defaultExample"));
exports.defaultExample = defaultExample_1.default;
var functionalTag_1 = __importDefault(require("./templates/functionalTag"));
exports.functionalTag = functionalTag_1.default;
var getDocsBlocks_1 = __importStar(require("./getDocsBlocks"));
var utils_1 = require("./templates/utils");
Object.defineProperty(exports, "mdclean", { enumerable: true, get: function () { return utils_1.mdclean; } });
var docgen_1 = require("./docgen");
Object.defineProperty(exports, "docgen", { enumerable: true, get: function () { return docgen_1.default; } });
function getDependencies(doc, compDirName) {
    var _a;
    if (!doc.tags) {
        return [];
    }
    var requireDep = ((_a = doc.tags.requires) === null || _a === void 0 ? void 0 : _a.map(function (t) { return path.join(compDirName, t.description); })) || [];
    var examplesDep = getDocsBlocks_1.getExamplesFilePaths(doc.tags, compDirName);
    return __spreadArrays(requireDep, examplesDep);
}
exports.getDependencies = getDependencies;
/**
 * Umbrella that calls docgen
 * Calls each template provided by the user
 * And generates a markdown string + the list of dependencies
 * @param absolutePath
 * @param config
 * @param componentRelativePath
 * @param extraMd
 * @returns content will contain the markdown text, dependencies contains
 * an array of path to files that should trigger the update of this file
 */
function compileTemplates(absolutePath, config, componentRelativePath, subComponent) {
    var _a, _b, _c;
    if (subComponent === void 0) { subComponent = false; }
    return __awaiter(this, void 0, void 0, function () {
        var options, templates, cwd, doc, p, e, m, s, isSubComponent, hasSubComponents, subComponentOptions, renderedUsage, _d, componentRelativeDirectoryPath_1, componentAbsoluteDirectoryPath_1, requiresMd, _e, e_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    options = config.apiOptions, templates = config.templates, cwd = config.cwd;
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, vue_docgen_api_1.parse(absolutePath, options)];
                case 2:
                    doc = _f.sent();
                    p = doc.props, e = doc.events, m = doc.methods, s = doc.slots;
                    isSubComponent = subComponent;
                    hasSubComponents = !!((_a = doc.tags) === null || _a === void 0 ? void 0 : _a.requires);
                    subComponentOptions = { isSubComponent: isSubComponent, hasSubComponents: hasSubComponents };
                    renderedUsage = {
                        props: p ? templates.props(p, subComponentOptions) : '',
                        slots: s ? templates.slots(s, subComponentOptions) : '',
                        methods: m ? templates.methods(m, subComponentOptions) : '',
                        events: e ? templates.events(e, subComponentOptions) : '',
                        functionalTag: templates.functionalTag
                    };
                    if (!!subComponent) return [3 /*break*/, 4];
                    _d = doc;
                    return [4 /*yield*/, getDocsBlocks_1.default(absolutePath, doc, config.getDocFileName, cwd, config.editLinkLabel, config.getRepoEditUrl)];
                case 3:
                    _d.docsBlocks = _f.sent();
                    if (!((_b = doc.docsBlocks) === null || _b === void 0 ? void 0 : _b.length) && config.defaultExamples) {
                        doc.docsBlocks = [templates.defaultExample(doc)];
                    }
                    _f.label = 4;
                case 4:
                    componentRelativeDirectoryPath_1 = path.dirname(componentRelativePath);
                    componentAbsoluteDirectoryPath_1 = path.dirname(absolutePath);
                    if (!((_c = doc.tags) === null || _c === void 0 ? void 0 : _c.requires)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Promise.all(doc.tags.requires.map(function (requireTag) {
                            return compileTemplates(path.join(componentAbsoluteDirectoryPath_1, requireTag.description), config, path.join(componentRelativeDirectoryPath_1, requireTag.description), true);
                        }))];
                case 5:
                    _e = _f.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _e = [];
                    _f.label = 7;
                case 7:
                    requiresMd = _e;
                    return [2 /*return*/, {
                            content: templates.component(renderedUsage, doc, config, componentRelativePath, requiresMd, subComponentOptions),
                            dependencies: getDependencies(doc, componentRelativeDirectoryPath_1)
                        }];
                case 8:
                    e_1 = _f.sent();
                    throw new Error("Error parsing file " + absolutePath + ":" + e_1.message);
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.default = compileTemplates;
//# sourceMappingURL=compileTemplates.js.map