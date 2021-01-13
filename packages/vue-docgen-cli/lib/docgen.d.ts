import { SafeDocgenCLIConfig, Templates, RenderedUsage } from './config';
import extractConfig from './extractConfig';
export { SafeDocgenCLIConfig as DocgenCLIConfig, Templates, RenderedUsage, extractConfig };
export interface DocgenCLIConfigWithComponents extends SafeDocgenCLIConfig {
    components: string | string[];
}
declare const _default: (config: SafeDocgenCLIConfig) => Promise<void>;
export default _default;
