import { FSWatcher } from 'chokidar';
import { DocGenOptions } from 'vue-docgen-api';
/**
 *
 * @param components glob or globs to watch
 * @param cwd option to pass chokidar
 * @param getDocFileName a function to go from component to doc file
 */
export default function getSources(components: string | string[], cwd: string, getDocFileName: (componentPath: string) => string | false, optionsApi?: DocGenOptions): Promise<{
    watcher: FSWatcher;
    docMap: {
        [filepath: string]: string;
    };
    componentFiles: string[];
}>;
