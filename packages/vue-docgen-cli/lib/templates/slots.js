"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var formatBindings = function (bindings) {
    if (!bindings) {
        return '';
    }
    return bindings
        .map(function (binding) {
        var name = binding.name, description = binding.description, type = binding.type;
        if (!type) {
            return '';
        }
        return "**" + name + "** `" + (type.name === 'union' && type.elements
            ? type.elements.map(function (_a) {
                var insideName = _a.name;
                return insideName;
            }).join(', ')
            : type.name) + "` - " + description;
    })
        .join('\n');
};
exports.default = (function (slots, opt) {
    if (opt === void 0) { opt = {}; }
    return "\n" + (opt.isSubComponent || opt.hasSubComponents ? '#' : '') + "## Slots\n\n  | Name          | Description  | Bindings |\n  | ------------- | ------------ | -------- |\n  " + slots
        .map(function (slot) {
        var description = slot.description, bindings = slot.bindings, name = slot.name;
        var readableBindings = bindings ? "" + formatBindings(bindings) : '';
        return "| " + utils_1.mdclean(name) + " | " + utils_1.mdclean(description || '') + " | " + utils_1.mdclean(readableBindings) + " |"; // replace returns by <br> to allow them in a table cell
    })
        .join('\n') + "\n";
});
//# sourceMappingURL=slots.js.map