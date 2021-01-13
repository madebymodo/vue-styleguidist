"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.findFileCaseInsensitive = exports.mdclean = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var lodash_memoize_1 = __importDefault(require("lodash.memoize"));
/**
 * replaces returns and tubes to make the input compatible with markdown
 * @param input
 */
function mdclean(input) {
    return input.replace(/\r?\n/g, '<br>').replace(/\|/g, '\\|');
}
exports.mdclean = mdclean;
var readdirSync = lodash_memoize_1.default(fs_1.default.readdirSync);
/**
 * Find a file in a directory, case-insensitive
 *
 * @param {string} filepath
 * @return {string|undefined} File path with correct case
 */
function findFileCaseInsensitive(filepath) {
    var dir = path_1.default.dirname(filepath);
    var fileNameLower = path_1.default.basename(filepath).toLowerCase();
    var files = readdirSync(dir);
    var found = files.find(function (file) { return file.toLowerCase() === fileNameLower; });
    return found && path_1.default.join(dir, found);
}
exports.findFileCaseInsensitive = findFileCaseInsensitive;
/**
 * Clear cache.
 */
function clearCache() {
    var sync = readdirSync.cache;
    sync.clear();
}
exports.clearCache = clearCache;
//# sourceMappingURL=utils.js.map