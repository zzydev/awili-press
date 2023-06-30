import pluginMdx from '@mdx-js/rollup';
import type { Plugin } from 'vite';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMDXFrontMatter from 'remark-mdx-frontmatter';
import { rehypePluginPreWrapper } from './rehypePlugins/preWrapper';
import { rehypePluginCodeHighLight } from './rehypePlugins/codeHighLight';
import shiki from 'shiki';
export async function pluginMdxRollup(): Promise<Plugin> {
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
      ],
      rehypePluginPreWrapper,
      [
        rehypePluginCodeHighLight,
        {
          highlighter: await shiki.getHighlighter({
            theme: 'github-dark-dimmed'
          })
        }
      ]
    ]
  }) as unknown as Plugin;
}
