import { pluginMdxHMR } from './pluginMdxHmr';
import { pluginMdxRollup } from './pluginMdxRollup';

export async function pluginMdx() {
  return [await pluginMdxRollup(), pluginMdxHMR()];
}
