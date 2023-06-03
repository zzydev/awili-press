import { pluginIndexHtml } from './plugin-awili/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { pluginConfig } from './plugin-awili/config';
import { pluginRoutes } from './plugin-routes';
import { SiteConfig } from 'shared/types';
import { pluginMdx } from './plugin-mdx';

export function createVitePlugins(
  config: SiteConfig,
  restartServer?: () => Promise<void>
) {
  return [
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: 'automatic'
    }),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root
    }),
    // 这里返回的是插件数组，vite的 plugins 配置本身也是支持数组的形式
    pluginMdx()
  ];
}