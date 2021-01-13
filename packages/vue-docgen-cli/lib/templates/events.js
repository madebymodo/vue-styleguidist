"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function formatProperties(properties) {
    if (!properties) {
        return '';
    }
    return properties
        .map(function (property) {
        var name = property.name, description = property.description, type = property.type;
        if (!type) {
            return '';
        }
        return "**" + name + "** `" + (type.names.length ? type.names.join(', ') : '') + "` - " + description;
    })
        .join('\n');
}
var tmpl = function (events) {
    var ret = '';
    events.forEach(function (evt) {
        var _a = evt.description, description = _a === void 0 ? '' : _a, e = __rest(evt, ["description"]);
        var readableProperties = e.properties ? "" + formatProperties(e.properties) : '';
        ret += "| " + utils_1.mdclean(e.name) + " | " + utils_1.mdclean(readableProperties) + " | " + utils_1.mdclean(description) + "\n";
    });
    return ret;
};
exports.default = (function (events, opt) {
    if (opt === void 0) { opt = {}; }
    return "\n" + (opt.isSubComponent || opt.hasSubComponents ? '#' : '') + "## Events\n\n  | Event name     | Properties     | Description  |\n  | -------------- |--------------- | -------------|\n  " + tmpl(events) + "\n  ";
});
//# sourceMappingURL=events.js.map