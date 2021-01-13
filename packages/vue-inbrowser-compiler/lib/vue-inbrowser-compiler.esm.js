import { parseComponent, isCodeVueSfc } from 'vue-inbrowser-compiler-utils';
export { adaptCreateElement, addScopedStyle, concatenate, isCodeVueSfc } from 'vue-inbrowser-compiler-utils';
import { transform } from 'buble';
import walkes from 'walkes';
import { Parser } from 'acorn';
import { detect } from 'detect-browser';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var UNNAMED = /import\s*['"]([^'"]+)['"];?/gi;
var NAMED = /import\s*(\*\s*as)?\s*(\w*?)\s*,?\s*(?:\{([\s\S]*?)\})?\s*from\s*['"]([^'"]+)['"];?/gi;
function alias(previousKey) {
    var key = previousKey.trim();
    var name = key.split(' as ');
    if (name.length > 1) {
        key = name.shift() || '';
    }
    return { key: key, name: name[0] };
}
function generate(keys, dep, base, fn, offset) {
    if (offset === void 0) { offset = 0; }
    var depEnd = dep.split('/').pop();
    var tmp = depEnd
        ? depEnd.replace(/\W/g, '_') + '$' + offset // uniqueness
        : '';
    var name = alias(tmp).name;
    dep = fn + "('" + dep + "')";
    var obj;
    var out = "const " + name + " = " + dep + ";";
    if (base) {
        out += "const " + base + " = " + tmp + ".default || " + tmp + ";";
    }
    keys.forEach(function (key) {
        obj = alias(key);
        out += "const " + obj.name + " = " + tmp + "." + obj.key + ";";
    });
    return out;
}
function rewriteImports (str, offset, fn) {
    if (fn === void 0) { fn = 'require'; }
    return str
        .replace(NAMED, function (_, asterisk, base, req, dep) {
        return generate(req ? req.split(',').filter(function (d) { return d.trim(); }) : [], dep, base, fn, offset);
    })
        .replace(UNNAMED, function (_, dep) { return fn + "('" + dep + "');"; });
}

function transformOneImport(node, code, offset) {
    var start = node.start + offset;
    var end = node.end + offset;
    var statement = code.substring(start, end);
    var transpiledStatement = rewriteImports(statement, offset);
    code = code.substring(0, start) + transpiledStatement + code.substring(end);
    offset += transpiledStatement.length - statement.length;
    return { code: code, offset: offset };
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
var jsx = require('acorn-jsx');
var extendedParser = Parser.extend(jsx());
function getAst(code) {
    return extendedParser.parse(code, {
        ecmaVersion: 2019,
        sourceType: 'module'
    });
}

var buildStyles = function (styles) {
    var _styles = '';
    if (styles) {
        styles.forEach(function (it) {
            if (it) {
                _styles += it;
            }
        });
    }
    if (_styles !== '') {
        return _styles.trim();
    }
    return undefined;
};
function getSingleFileComponentParts(code) {
    var parts = parseComponent(code);
    if (parts.script) {
        parts.script = parts.script.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
    }
    return parts;
}
function injectTemplateAndParseExport(parts) {
    var templateString = parts.template ? parts.template.replace(/`/g, '\\`') : undefined;
    if (!parts.script) {
        return { component: "{template: `" + templateString + "` }" };
    }
    var comp = parseScriptCode(parts.script);
    if (templateString) {
        comp.component = "{template: `" + templateString + "`, " + comp.component + "}";
    }
    else {
        comp.component = "{" + comp.component + "}";
    }
    return comp;
}
function parseScriptCode(code) {
    var preprocessing = '';
    var startIndex = -1;
    var endIndex = -1;
    var offset = 0;
    var renderFunctionStart = -1;
    walkes(getAst(code), {
        //export const MyComponent = {}
        ExportNamedDeclaration: function (node) {
            preprocessing = code.slice(0, node.start + offset);
            startIndex = node.declaration.declarations[0].init.start + offset;
            endIndex = node.declaration.declarations[0].init.end + offset;
            if (node.declarations) {
                renderFunctionStart = getRenderFunctionStart(node.declarations[0]);
            }
        },
        //export default {}
        ExportDefaultDeclaration: function (node) {
            preprocessing = code.slice(0, node.start + offset);
            startIndex = node.declaration.start + offset;
            endIndex = node.declaration.end + offset;
            renderFunctionStart = getRenderFunctionStart(node.declaration);
        },
        //module.exports = {}
        AssignmentExpression: function (node) {
            if (/exports/.test(node.left.name) ||
                (node.left.object &&
                    /module/.test(node.left.object.name) &&
                    /exports/.test(node.left.property.name))) {
                preprocessing = code.slice(0, node.start + offset);
                startIndex = node.right.start + offset;
                endIndex = node.right.end + offset;
            }
        },
        // and transform import statements into require
        ImportDeclaration: function (node) {
            var ret = transformOneImport(node, code, offset);
            offset = ret.offset;
            code = ret.code;
        }
    });
    if (startIndex === -1) {
        throw new Error('Failed to parse single file component: ' + code);
    }
    if (renderFunctionStart > 0) {
        renderFunctionStart += offset;
        code = insertCreateElementFunction(code.slice(0, renderFunctionStart + 1), code.slice(renderFunctionStart + 1));
        endIndex += JSX_ADDON_LENGTH;
    }
    var component = code.slice(startIndex + 1, endIndex - 1);
    return {
        preprocessing: preprocessing,
        component: component,
        postprocessing: code.slice(endIndex)
    };
}
var JSX_ADDON_LENGTH = 31;
function getRenderFunctionStart(objectExpression) {
    if (objectExpression && objectExpression.properties) {
        var nodeProperties = objectExpression.properties;
        var renderFunctionObj = nodeProperties.find(function (p) { return p.key && p.key.type === 'Identifier' && p.key.name === 'render'; });
        if (renderFunctionObj && renderFunctionObj.value.body) {
            return renderFunctionObj.value.body.start;
        }
    }
    return -1;
}
function insertCreateElementFunction(before, after) {
    return before + ";const h = this.$createElement;" + after;
}
/**
 * Coming out of this function all SFC should be in the `new Vue()` format
 * it should as well have been stripped of exports and all imports should have been
 * transformed into requires
 */
function normalizeSfcComponent(code) {
    var parts = getSingleFileComponentParts(code);
    var extractedComponent = injectTemplateAndParseExport(parts);
    return {
        script: [
            extractedComponent.preprocessing,
            "return " + extractedComponent.component,
            extractedComponent.postprocessing
        ].join(';'),
        style: buildStyles(parts.styles)
    };
}

var browser = detect();
var BROWSERS = {
    chrome: 71,
    firefox: 64,
    safari: 12,
    ie: 11,
    edge: 19
};
function isBubleBrowser(name) {
    return name in BROWSERS;
}
function getTargetFromBrowser() {
    var _a;
    if ((browser === null || browser === void 0 ? void 0 : browser.version) && (browser === null || browser === void 0 ? void 0 : browser.name)) {
        if (isBubleBrowser(browser.name)) {
            var version = parseInt(browser.version, 10);
            return _a = {},
                _a[browser.name] = version <= BROWSERS[browser.name] ? version : BROWSERS[browser.name],
                _a;
        }
    }
    return {};
}

/**
 * Reads the code in string and separates the javascript part and the html part
 * then sets the nameVarComponent variable with the value of the component parameters
 * @param code
 * @param config buble config to be used when transforming
 *
 */
function compileVueCodeForEvalFunction(code, config) {
    if (config === void 0) { config = {}; }
    var nonCompiledComponent = prepareVueCodeForEvalFunction(code, config);
    var target = typeof window !== 'undefined' ? getTargetFromBrowser() : {};
    return __assign(__assign({}, nonCompiledComponent), { script: transform(nonCompiledComponent.script, __assign({ target: target }, config)).code });
}
function prepareVueCodeForEvalFunction(code, config) {
    var style;
    var vsgMode = false;
    var template;
    // if the component is written as a Vue sfc,
    // transform it in to a "return"
    // even if jsx is used in an sfc we still use this use case
    if (isCodeVueSfc(code)) {
        return normalizeSfcComponent(code);
    }
    // if it's not a new Vue, it must be a simple template or a vsg format
    // lets separate the template from the script
    if (!/new Vue\(/.test(code)) {
        // this for jsx examples without the SFC shell
        // export default {render: (h) => <Button>}
        if (config.jsx) {
            var _a = parseScriptCode(code), preprocessing = _a.preprocessing, component = _a.component, postprocessing = _a.postprocessing;
            return {
                script: preprocessing + ";return {" + component + "};" + postprocessing
            };
        }
        var findStartTemplateMatch = /^\W*</.test(code) ? { index: 0 } : code.match(/\n[\t ]*</);
        var limitScript = findStartTemplateMatch && findStartTemplateMatch.index !== undefined
            ? findStartTemplateMatch.index
            : -1;
        template = limitScript > -1 ? code.slice(limitScript) : undefined;
        code = limitScript > -1 ? code.slice(0, limitScript) : code;
        vsgMode = true;
    }
    var ast = getAst(code);
    var offset = 0;
    var varNames = [];
    walkes(ast, __assign({ 
        // replace `new Vue({data})` by `return {data}`
        ExpressionStatement: function (node) {
            if (node.expression.type === 'NewExpression' && node.expression.callee.name === 'Vue') {
                var before = code.slice(0, node.expression.start + offset);
                var optionsNode = node.expression.arguments && node.expression.arguments.length
                    ? node.expression.arguments[0]
                    : undefined;
                var renderIndex = getRenderFunctionStart(optionsNode);
                var endIndex = optionsNode.end;
                if (renderIndex > 0) {
                    code = insertCreateElementFunction(code.slice(0, renderIndex + 1), code.slice(renderIndex + 1));
                    endIndex += JSX_ADDON_LENGTH;
                }
                var after = optionsNode ? code.slice(optionsNode.start + offset, endIndex + offset) : '';
                code = before + ';return ' + after;
            }
        },
        // transform all imports into require function calls
        ImportDeclaration: function (node) {
            var ret = transformOneImport(node, code, offset);
            offset = ret.offset;
            code = ret.code;
            if (vsgMode && node.specifiers) {
                node.specifiers.forEach(function (s) { return varNames.push(s.local.name); });
            }
        } }, (vsgMode
        ? {
            VariableDeclaration: function (node) {
                node.declarations.forEach(function (declaration) {
                    if (declaration.id.name) {
                        // simple variable declaration
                        varNames.push(declaration.id.name);
                    }
                    else if (declaration.id.properties) {
                        // spread variable declaration
                        // const { all:names } = {all: 'foo'}
                        declaration.id.properties.forEach(function (p) {
                            varNames.push(p.value.name);
                        });
                    }
                });
            },
            FunctionDeclaration: function (node) {
                varNames.push(node.id.name);
            }
        }
        : {})));
    if (vsgMode) {
        code += ";return {data:function(){return {" + 
        // add local vars in data
        // this is done through an object like {varName: varName}
        // since each varName is defined in compiledCode, it can be used to init
        // the data object here
        varNames.map(function (varName) { return varName + ":" + varName; }).join(',') + "};}}";
    }
    return {
        script: code,
        style: style,
        template: template
    };
}

export { compileVueCodeForEvalFunction as compile };
