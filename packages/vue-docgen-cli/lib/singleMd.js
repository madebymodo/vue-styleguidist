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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
var path = __importStar(require("path"));
var utils_1 = require("./utils");
var compileTemplates_1 = __importDefault(require("./compileTemplates"));
/**
 * Build one md file combining all documentations for components in files
 * if `config.watch` is true will keep on watch file changes
 * and update the current file if needed
 * @param files
 * @param watcher
 * @param config
 * @param _compile
 */
function default_1(files, watcher, config, docMap, _compile) {
    if (_compile === void 0) { _compile = compile; }
    return __awaiter(this, void 0, void 0, function () {
        var fileCache, compileSingleDocWithConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileCache = {};
                    compileSingleDocWithConfig = _compile.bind(null, config, files, fileCache, docMap, watcher);
                    return [4 /*yield*/, compileSingleDocWithConfig()];
                case 1:
                    _a.sent();
                    if (config.watch) {
                        watcher.on('add', compileSingleDocWithConfig).on('change', compileSingleDocWithConfig);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = default_1;
/**
 * Compile all components in `files` into one single
 * markdown file and save it to the `config.outFile`
 * @param files the component files relative paths
 * @param config config passed to the current chunk
 * @param cachedContent in order to avoid reparsing unchanged components pass an object wher to store for future reference
 * @param docMap a map of each documentation file to the component they refer to
 * @param changedFilePath When in wtch mode, provide the relative path of the file that changes to only re-parse this file
 */
function compile(config, files, cachedContent, docMap, watcher, changedFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var cacheMarkDownContent, e_1, e_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cacheMarkDownContent = function (filePath) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, content, dependencies;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, compileTemplates_1.default(path.join(config.componentsRoot, filePath), config, filePath)];
                                case 1:
                                    _a = _b.sent(), content = _a.content, dependencies = _a.dependencies;
                                    dependencies.forEach(function (d) {
                                        watcher.add(d);
                                        docMap[d] = filePath;
                                    });
                                    cachedContent[filePath] = content;
                                    return [2 /*return*/, true];
                            }
                        });
                    }); };
                    if (!changedFilePath) return [3 /*break*/, 5];
                    // resolve the real component file path before updating if needed
                    changedFilePath = docMap[changedFilePath] || changedFilePath;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // if in chokidar mode (watch), the path of the file that was just changed
                    // is passed as an argument. We only affect the changed file and avoid re-parsing the rest
                    return [4 /*yield*/, cacheMarkDownContent(changedFilePath)];
                case 2:
                    // if in chokidar mode (watch), the path of the file that was just changed
                    // is passed as an argument. We only affect the changed file and avoid re-parsing the rest
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    throw new Error("Error compiling file " + config.outFile + " when file " + changedFilePath + " has changed: " + e_1.message);
                case 4: return [3 /*break*/, 8];
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    // if we are initializing the current file, parse all components
                    return [4 /*yield*/, Promise.all(files.map(cacheMarkDownContent))];
                case 6:
                    // if we are initializing the current file, parse all components
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_2 = _a.sent();
                    throw new Error("Error compiling file " + config.outFile + ": " + e_2.message);
                case 8:
                    // and finally save all concatenated values to the markdown file
                    utils_1.writeDownMdFile(Object.values(cachedContent), config.outFile);
                    return [2 /*return*/];
            }
        });
    });
}
exports.compile = compile;
//# sourceMappingURL=singleMd.js.map