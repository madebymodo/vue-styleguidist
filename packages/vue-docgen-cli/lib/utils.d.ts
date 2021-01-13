/**
 * Prettify then save a markdown content
 * If the needed directory does not exist, create it
 * @param content dirty looking markdown content to be saved
 * @param destFilePath destination absolute file path
 */
export declare function writeDownMdFile(content: string | string[], destFilePath: string): Promise<void>;
/**
 * retrun an object matching document relative file path
 * with their corresponding components, it's inteded to be use
 * with watchers to update the right documentation on update of
 * Readme.md files
 * @param files file paths of the matched comeponents
 * @param getDocFileName way to transform a comopnent path into it's Readme.md
 * @param root componentRoot to de-absolutize the DocFileName path
 */
export declare function getDocMap(files: string[], getDocFileName: (file: string) => string | false, root: string): {
    [filepath: string]: string;
};
/**
 * Find a file in a directory, case-insensitive
 *
 * @param {string} filepath
 * @return {string|undefined} File path with correct case
 */
export declare function findFileCaseInsensitive(filepath: string): string | undefined;
