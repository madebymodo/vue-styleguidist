import { ComponentDoc } from 'vue-docgen-api';
import { RenderedUsage, SafeDocgenCLIConfig, ContentAndDependencies } from '../config';
import { SubTemplateOptions } from '../compileTemplates';
declare const _default: (renderedUsage: RenderedUsage, doc: ComponentDoc, config: SafeDocgenCLIConfig, fileName: string, requiresMd: ContentAndDependencies[], { isSubComponent, hasSubComponents }: SubTemplateOptions) => string;
export default _default;
