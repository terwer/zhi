import { IndexedAccessType } from 'typedoc';
import { MarkdownThemeRenderContext } from '../../theme-render-context';

export function indexAccessType(
  context: MarkdownThemeRenderContext,
  model: IndexedAccessType,
) {
  const md: string[] = [];
  if (model.objectType) {
    md.push(context.partials.someType(model.objectType));
  }
  if (model.indexType) {
    md.push(`[${context.partials.someType(model.indexType)}]`);
  }
  return md.join('');
}
