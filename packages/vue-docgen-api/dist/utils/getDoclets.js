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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var matchRecursiveRegexp_1 = __importDefault(require("./matchRecursiveRegexp"));
var DOCLET_PATTERN = /^(?:\s+)?@(\w+)(?:$|\s((?:[^](?!^(?:\s+)?@\w))*))/gim;
function getParamInfo(content, hasName) {
    content = content || '';
    var typeSlice = matchRecursiveRegexp_1.default(content, '{', '}')[0] || '';
    var param = hasName || typeSlice.length ? { type: getTypeObjectFromTypeString(typeSlice) } : {};
    content = content.replace("{" + typeSlice + "}", '');
    if (hasName) {
        var nameSliceArray = /^ *(\w+)?/.exec(content);
        if (nameSliceArray) {
            param.name = nameSliceArray[1];
        }
        if (param.name) {
            content = content.replace(new RegExp("^ *" + param.name), '');
        }
    }
    content = content.replace(/^ *-/, '');
    if (content.length) {
        param.description = content.trim();
    }
    return param;
}
function getTypeObjectFromTypeString(typeSlice) {
    if (typeSlice === '' || typeSlice === '*') {
        return { name: 'mixed' };
    }
    else if (/\w+\|\w+/.test(typeSlice)) {
        return {
            name: 'union',
            elements: typeSlice.split('|').map(function (type) { return getTypeObjectFromTypeString(type); })
        };
    }
    else {
        return {
            name: typeSlice
        };
    }
}
var UNNAMED_TAG_TITLES = ['returns', 'throws', 'type'];
var TYPED_TAG_TITLES = [
    'param',
    'arg',
    'argument',
    'property',
    'type',
    'returns',
    'throws',
    'prop',
    'binding',
    'type'
];
var ACCESS_TAG_TITLES = ['private', 'public'];
/**
 * Given a string, this functions returns an object with
 * two keys:
 * - `tags` an array of tags {title: tagname, content: }
 * - `description` whatever is left once the tags are removed
 */
function getDocblockTags(str) {
    var tags = [];
    var match = DOCLET_PATTERN.exec(str);
    for (; match; match = DOCLET_PATTERN.exec(str)) {
        var title = match[1];
        if (TYPED_TAG_TITLES.indexOf(title) > -1) {
            tags.push(__assign({ title: title }, getParamInfo(match[2], UNNAMED_TAG_TITLES.indexOf(title) < 0)));
        }
        else if (ACCESS_TAG_TITLES.indexOf(title) > -1) {
            tags.push({ title: 'access', content: title });
        }
        else {
            tags.push({ title: title, content: match[2] || true });
        }
    }
    var description = str.replace(DOCLET_PATTERN, '').trim();
    return { description: description, tags: tags };
}
exports.default = getDocblockTags;
