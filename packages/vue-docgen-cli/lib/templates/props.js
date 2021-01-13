"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var tmpl = function (props) {
    var ret = '';
    props.forEach(function (pr) {
        var p = pr.name;
        var n = pr.type && pr.type.name ? pr.type.name : '';
        var d = pr.defaultValue && pr.defaultValue.value ? pr.defaultValue.value : '';
        var v = pr.values ? pr.values.map(function (pv) { return "`" + pv + "`"; }).join(', ') : '-';
        var t = pr.description ? pr.description : '';
        ret += "| " + utils_1.mdclean(p) + " | " + utils_1.mdclean(t) + " | " + utils_1.mdclean(n) + " | " + utils_1.mdclean(v) + " | " + utils_1.mdclean(d) + " |\n";
    });
    return ret;
};
exports.default = (function (props, opt) {
    if (opt === void 0) { opt = {}; }
    return "\n" + (opt.isSubComponent || opt.hasSubComponents ? '#' : '') + "## Props\n\n  | Prop name     | Description | Type      | Values      | Default     |\n  | ------------- |-------------| --------- | ----------- | ----------- |\n  " + tmpl(props) + "\n  ";
});
//# sourceMappingURL=props.js.map