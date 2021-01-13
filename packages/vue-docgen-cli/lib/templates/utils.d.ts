/**
 * replaces returns and tubes to make the input compatible with markdown
 * @param input
 */
export declare function mdclean(input: string): string;
/**
 * Find a file in a directory, case-insensitive
 *
 * @param {string} filepath
 * @return {string|undefined} File path with correct case
 */
export declare function findFileCaseInsensitive(filepath: string): string | undefined;
/**
 * Clear cache.
 */
export declare function clearCache(): void;
