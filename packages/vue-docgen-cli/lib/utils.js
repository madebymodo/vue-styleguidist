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
exports.findFileCaseInsensitive = exports.getDocMap = exports.writeDownMdFile = void 0;
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var util_1 = require("util");
var mkdirp_1 = __importDefault(require("mkdirp"));
var prettier_1 = __importDefault(require("prettier"));
var mkdirp = util_1.promisify(mkdirp_1.default);
/**
 * Prettify then save a markdown content
 * If the needed directory does not exist, create it
 * @param content dirty looking markdown content to be saved
 * @param destFilePath destination absolute file path
 */
function writeDownMdFile(content, destFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var conf, prettyMd, destFolder, writeStream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prettier_1.default.resolveConfig(destFilePath)];
                case 1:
                    conf = _a.sent();
                    prettyMd = function (cont) {
                        return prettier_1.default.format(cont, Object.assign(conf || {}, { parser: 'markdown' }));
                    };
                    destFolder = path.dirname(destFilePath);
                    return [4 /*yield*/, mkdirp(destFolder)];
                case 2:
                    _a.sent();
                    writeStream = fs.createWriteStream(destFilePath);
                    if (Array.isArray(content)) {
                        content.forEach(function (cont) {
                            writeStream.write(prettyMd(cont));
                        });
                    }
                    else {
                        writeStream.write(prettyMd(content));
                    }
                    // close the stream
                    writeStream.close();
                    return [2 /*return*/];
            }
        });
    });
}
exports.writeDownMdFile = writeDownMdFile;
/**
 * retrun an object matching document relative file path
 * with their corresponding components, it's inteded to be use
 * with watchers to update the right documentation on update of
 * Readme.md files
 * @param files file paths of the matched comeponents
 * @param getDocFileName way to transform a comopnent path into it's Readme.md
 * @param root componentRoot to de-absolutize the DocFileName path
 */
function getDocMap(files, getDocFileName, root) {
    var docMap = {};
    files.forEach(function (f) {
        var docFilePath = getDocFileName(path.join(root, f));
        if (docFilePath) {
            docMap[path.relative(root, docFilePath)] = f;
        }
    });
    return docMap;
}
exports.getDocMap = getDocMap;
/**
 * Find a file in a directory, case-insensitive
 *
 * @param {string} filepath
 * @return {string|undefined} File path with correct case
 */
function findFileCaseInsensitive(filepath) {
    var dir = path.dirname(filepath);
    var fileNameLower = path.basename(filepath).toLowerCase();
    var files = fs.readdirSync(dir);
    var found = files.find(function (file) { return file.toLowerCase() === fileNameLower; });
    return found && path.join(dir, found);
}
exports.findFileCaseInsensitive = findFileCaseInsensitive;
//# sourceMappingURL=utils.js.map