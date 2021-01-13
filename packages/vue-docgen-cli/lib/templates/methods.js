"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var paramsTmpl = function (params, subComponent) {
    var ret = "\n" + (subComponent ? '#' : '') + "#### Params\n\n  | Param name     | Type        | Description  |\n  | ------------- |------------- | -------------|\n  ";
    params.forEach(function (p) {
        var t = p.type && p.type.name ? p.type.name : '';
        var n = p.name ? p.name : '';
        var d = typeof p.description === 'string' ? p.description : '';
        ret += "| " + utils_1.mdclean(n) + " | " + utils_1.mdclean(t) + " | " + utils_1.mdclean(d) + " |\n";
    });
    return ret;
};
var returnsTemplate = function (ret, subComponent) {
    var p = ret;
    var t = p.type && p.type.name ? p.type.name : '';
    var d = p.description ? p.description : '';
    return "\n" + (subComponent ? '#' : '') + "#### Return\n\n  | Type        | Description  |\n  | ------------- | -------------|\n  | " + t + " | " + d + " |\n  ";
};
var tmpl = function (methods, subComponent) {
    var ret = '';
    methods.forEach(function (m) {
        ret += "\n" + (subComponent ? '#' : '') + "### " + (m.name ? m.name : '') + "\n  > " + (m.description || '') + "\n\n  " + (m.params ? paramsTmpl(m.params, subComponent) : '') + "\n  " + (m.returns ? returnsTemplate(m.returns, subComponent) : '') + "\n  ";
    });
    return ret;
};
exports.default = (function (methods, opt) {
    if (opt === void 0) { opt = {}; }
    if (Object.keys(methods).length === 0) {
        return '';
    }
    return "\n" + (opt.isSubComponent || opt.hasSubComponents ? '#' : '') + "## Methods\n\n  " + tmpl(methods, opt.isSubComponent || opt.hasSubComponents || false) + "\n  ";
});
//# sourceMappingURL=methods.js.map