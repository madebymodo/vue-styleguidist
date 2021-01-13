import { ComponentDoc } from 'vue-docgen-api';
import events from './templates/events';
import methods from './templates/methods';
import slots from './templates/slots';
import props from './templates/props';
import component from './templates/component';
import defaultExample from './templates/defaultExample';
import functionalTag from './templates/functionalTag';
import { SafeDocgenCLIConfig } from './config';
export { mdclean } from './templates/utils';
export { events, methods, slots, props, component, defaultExample, functionalTag };
export { default as docgen } from './docgen';
export interface ContentAndDependencies {
    content: string;
    dependencies: string[];
}
export interface SubTemplateOptions {
    isSubComponent?: boolean;
    hasSubComponents?: boolean;
}
export declare function getDependencies(doc: Pick<ComponentDoc, 'tags'>, compDirName: string): string[];
/**
 * Umbrella that calls docgen
 * Calls each template provided by the user
 * And generates a markdown string + the list of dependencies
 * @param absolutePath
 * @param config
 * @param componentRelativePath
 * @param extraMd
 * @returns content will contain the markdown text, dependencies contains
 * an array of path to files that should trigger the update of this file
 */
export default function compileTemplates(absolutePath: string, config: SafeDocgenCLIConfig, componentRelativePath: string, subComponent?: boolean): Promise<ContentAndDependencies>;
