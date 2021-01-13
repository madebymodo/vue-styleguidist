import { TransformOptions } from 'buble';
interface EvaluableComponent {
    script: string;
    template?: string;
    style?: string;
}
/**
 * Reads the code in string and separates the javascript part and the html part
 * then sets the nameVarComponent variable with the value of the component parameters
 * @param code
 * @param config buble config to be used when transforming
 *
 */
export default function compileVueCodeForEvalFunction(code: string, config?: TransformOptions): EvaluableComponent;
export {};
