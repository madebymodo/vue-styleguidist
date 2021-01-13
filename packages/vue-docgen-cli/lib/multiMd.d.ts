import { FSWatcher } from 'chokidar';
import { DocgenCLIConfigWithComponents } from './docgen';
/**
 * Build one md file per given compnent and save it respecting original scaffolding
 * if `config.watch` is true will jkeep on watch file changes
 * and update all needed files
 * @param files
 * @param config
 */
export default function (files: string[], watcher: FSWatcher, config: DocgenCLIConfigWithComponents, docMap: {
    [filepath: string]: string;
}, _compile?: typeof compile): Promise<void>;
/**
 * Compile a markdown file from a components and save it
 * This will use the filePath to know where to save
 * @param config config passed to the current chunk
 * @param docMap a map of each documentation file to the component they refer to
 * @param watcher
 * @param filePath relative path where the MD file is going to be saved
 */
export declare function compile(config: DocgenCLIConfigWithComponents, docMap: {
    [filepath: string]: string;
}, watcher: FSWatcher, filePath: string): Promise<void>;
