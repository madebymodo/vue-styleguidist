"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (renderedUsage, doc, config, fileName, requiresMd, _a) {
    var isSubComponent = _a.isSubComponent, hasSubComponents = _a.hasSubComponents;
    var displayName = doc.displayName, description = doc.description, docsBlocks = doc.docsBlocks, tags = doc.tags, functional = doc.functional;
    var _b = tags || {}, deprecated = _b.deprecated, author = _b.author, since = _b.since, version = _b.version, see = _b.see, link = _b.link;
    var frontMatter = [];
    if (!config.outFile && deprecated) {
        // to avoid having the squiggles in the left menu for deprecated items
        // use the frontmatter feature of vuepress
        frontMatter.push("title: " + displayName);
    }
    if (hasSubComponents) {
        // show more than one level on subcomponents
        frontMatter.push('sidebarDepth: 2');
    }
    return (frontMatter.length && !isSubComponent
        ? "\n---\n" + frontMatter.join('\n') + "\n---\n"
        : '') + "\n  " + (isSubComponent || hasSubComponents ? '#' : '') + "# " + (deprecated ? "~~" + displayName + "~~" : displayName) + "\n\n  " + (deprecated ? "> **Deprecated** " + deprecated[0].description + "\n" : '') + "\n  " + (description ? '> ' + description : '') + "\n  \n  " + (functional ? renderedUsage.functionalTag : '') + "\n  " + (author ? author.map(function (a) { return "Author: " + a.description + "\n"; }) : '') + "\n  " + (since ? "Since: " + since[0].description + "\n" : '') + "\n  " + (version ? "Version: " + version[0].description + "\n" : '') + "\n  " + (see ? see.map(function (s) { return "[See](" + s.description + ")\n"; }) : '') + "\n  " + (link ? link.map(function (l) { return "[See](" + l.description + ")\n"; }) : '') + "\n\n  " + renderedUsage.props + "\n  " + renderedUsage.methods + "\n  " + renderedUsage.events + "\n  " + renderedUsage.slots + "\n  " + (docsBlocks ? '---\n' + docsBlocks.join('\n---\n') : '') + "\n\n  " + (requiresMd.length
        ? '---\n' + requiresMd.map(function (component) { return component.content; }).join('\n---\n')
        : '') + "\n  ";
});
//# sourceMappingURL=component.js.map