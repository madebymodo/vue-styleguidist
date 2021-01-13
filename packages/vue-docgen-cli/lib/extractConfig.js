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
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var compileTemplates_1 = require("./compileTemplates");
var utils_1 = require("./utils");
exports.default = (function (cwd, watch, configFileFromCmd, pathArray) {
    if (watch === void 0) { watch = false; }
    if (pathArray === void 0) { pathArray = []; }
    var configFilePath = configFileFromCmd
        ? path.resolve(cwd, configFileFromCmd)
        : path.join(cwd, 'docgen.config.js');
    var componentsFromCmd = pathArray[0], outDirFromCmd = pathArray[1];
    var config = __assign({ cwd: cwd,
        watch: watch, componentsRoot: path.dirname(configFilePath), components: componentsFromCmd || 'src/components/**/[a-zA-Z]*.{vue,js,jsx,ts,tsx}', outDir: outDirFromCmd, getDocFileName: function (componentPath) {
            var files = [
                path.join(path.dirname(componentPath), 'Readme.md'),
                // ComponentName.md
                componentPath.replace(path.extname(componentPath), '.md'),
                // FolderName.md when component definition file is index.js
                path.join(path.dirname(componentPath), path.basename(path.dirname(componentPath)) + '.md')
            ];
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                var existingFile = utils_1.findFileCaseInsensitive(file);
                if (existingFile) {
                    return existingFile;
                }
            }
            return false;
        }, getDestFile: function (file, conf) {
            return path.resolve(conf.outDir, file).replace(/\.\w+$/, '.md');
        }, editLinkLabel: 'edit on github' }, (fs.existsSync(configFilePath) ? require(configFilePath) : undefined));
    if (!config.getRepoEditUrl && config.docsRepo) {
        var branch_1 = config.docsBranch || 'master';
        var dir_1 = config.docsFolder || '';
        config.getRepoEditUrl = function (p) { return "https://github.com/" + config.docsRepo + "/edit/" + branch_1 + "/" + dir_1 + "/" + p; };
    }
    // only default outDir if `outFile` is null to avoid confusion
    config.outDir = config.outDir || (config.outFile ? '.' : 'docs');
    config.templates = __assign({ component: compileTemplates_1.component,
        events: compileTemplates_1.events,
        methods: compileTemplates_1.methods,
        props: compileTemplates_1.props,
        slots: compileTemplates_1.slots,
        defaultExample: compileTemplates_1.defaultExample,
        functionalTag: compileTemplates_1.functionalTag }, config.templates);
    return config;
});
//# sourceMappingURL=extractConfig.js.map