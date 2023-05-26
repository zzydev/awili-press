import pluginMdx from '@mdx-js/rollup';
import type { Plugin } from 'vite';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMDXFrontMatter from 'remark-mdx-frontmatter';
export function pluginMdxRollup(): Plugin {
  return pluginMdx({
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMDXFrontMatter],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            class: 'header-anchor'
          },
          content: {
            type: 'text',
            value: '#'
          }
        }
      ]
    ]
  }) as unknown as Plugin;
}
