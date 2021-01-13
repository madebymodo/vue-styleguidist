import { ComponentDoc, Tag, ParamTag } from 'vue-docgen-api';
export declare function getExamplesFilePaths(tags: {
    [key: string]: (Tag | ParamTag)[];
}, componentDirname: string): string[];
export default function getDocsBlocks(absolutePath: string, doc: Pick<ComponentDoc, 'tags' | 'docsBlocks'>, getDocFileName: (file: string) => string | false, rootPath: string, editLinkLabel: string, getRepoEditUrl?: (path: string) => string): Promise<string[]>;
export declare function isParamTag(tag: ParamTag | Tag): tag is ParamTag;
