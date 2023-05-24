import { relative } from 'path';
import { Plugin } from 'vite';
import { SiteConfig } from 'shared/types/index';
import { join } from 'path';
import { PACKAGE_ROOT } from 'node/constants';

const SITE_DATA_ID = 'awili:site-data';

export function pluginConfig(
  config: SiteConfig,
  restartServer?: () => Promise<void>
): Plugin {
  return {
    name: 'awili:config',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    config() {
      return {
        root: PACKAGE_ROOT,
        resolve: {
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime', 'index.ts')
          }
        }
      };
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath];
      const include = (id: string) =>
        customWatchedFiles.some((file) => id.includes(file));

      if (include(ctx.file)) {
        console.log(
          `\n${relative(config.root, ctx.file)} changed, restarting server...`
        );
        //方法一： 重启 Dev Server
        //await ctx.server.restart();
        // 没有作用，因为并没有进行Awili框架配置的重新读取
        //方法二： 重新执行dev.ts 中的 createServer
        await restartServer();
      }
    }
  };
}
