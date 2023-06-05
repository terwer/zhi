import { DeclarationReflection, PageEvent } from 'typedoc';
import { heading } from '../../support/els';
import { MarkdownThemeRenderContext } from '../../theme-render-context';

export function reflectionTemplate(
  context: MarkdownThemeRenderContext,
  page: PageEvent<DeclarationReflection>,
) {
  const md: string[] = [];

  if (!context.getOption('hidePageHeader')) {
    md.push(context.partials.pageHeader(page));
  }

  if (!context.getOption('hideBreadcrumbs')) {
    md.push(context.partials.breadcrumbs(page));
  }

  if (!context.getOption('hidePageTitle')) {
    md.push(heading(1, context.partials.pageTitle(page)));
  }

  if (!context.getOption('hideKindTag')) {
    md.push(context.partials.memberKindTag(page.model));
  }

  md.push(context.partials.reflectionMember(page.model, 2));

  return md.join('\n\n');
}
