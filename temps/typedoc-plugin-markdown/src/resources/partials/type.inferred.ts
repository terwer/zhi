import { InferredType } from 'typedoc';
import { escapeChars } from '../../support/utils';
import { MarkdownThemeRenderContext } from '../../theme-render-context';

export function inferredType(
  context: MarkdownThemeRenderContext,
  model: InferredType,
) {
  return `infer ${escapeChars(model.name)}`;
}
