import { FSWatcher } from 'chokidar';
import { DocgenCLIConfigWithComponents } from './docgen';
export interface DocgenCLIConfigWithOutFile extends DocgenCLIConfigWithComponents {
    outFile: string;
}
/**
 * Build one md file combining all documentations for components in files
 * if `config.watch` is true will keep on watch file changes
 * and update the current file if needed
 * @param files
 * @param watcher
 * @param config
 * @param _compile
 */
export default function (files: string[], watcher: FSWatcher, config: DocgenCLIConfigWithOutFile, docMap: {
    [filepath: string]: string;
}, _compile?: typeof compile): Promise<void>;
/**
 * Compile all components in `files` into one single
 * markdown file and save it to the `config.outFile`
 * @param files the component files relative paths
 * @param config config passed to the current chunk
 * @param cachedContent in order to avoid reparsing unchanged components pass an object wher to store for future reference
 * @param docMap a map of each documentation file to the component they refer to
 * @param changedFilePath When in wtch mode, provide the relative path of the file that changes to only re-parse this file
 */
export declare function compile(config: DocgenCLIConfigWithOutFile, files: string[], cachedContent: {
    [filepath: string]: string;
}, docMap: {
    [filepath: string]: string;
}, watcher: FSWatcher, changedFilePath?: string): Promise<void>;
