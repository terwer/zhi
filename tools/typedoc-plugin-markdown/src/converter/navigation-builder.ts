import {
  DeclarationReflection,
  ProjectReflection,
  ReflectionGroup,
} from 'typedoc';

import { NavigationItem } from '../models';
import { MarkdownThemeRenderContext } from '../theme-render-context';

export class NavigationBuilder {
  navigation: NavigationItem[] = [];

  constructor(public context: MarkdownThemeRenderContext) {}

  getNavigation(project: ProjectReflection): NavigationItem[] {
    if (project.groups?.length) {
      project.groups?.forEach(() => {
        project.children?.forEach((child) => {
          this.navigation.push({
            title: child.name,
            url: child.url,
            children: this.getChildrenOrGroups(child) || [],
          });
        });
      });
    } else {
      project.children?.forEach((child) => {
        this.navigation.push({
          title: child.name,
          children: this.getChildrenOrGroups(child) || [],
        });
      });
    }

    return this.navigation;
  }

  getGroupChildren(group: ReflectionGroup) {
    if (group.categories) {
      return group.categories?.map((category) => {
        return {
          title: category.title,
          children: this.getGroupChildren(category) || [],
        };
      });
    }
    return group.children
      ?.filter((child) => child.hasOwnDocument)
      .map((child) => {
        return {
          title: child.name,
          url: child.url,
          children: this.getChildrenOrGroups(child) || [],
        };
      });
  }

  getChildrenOrGroups(reflection: DeclarationReflection) {
    if (this.context.getOption('excludeGroups')) {
      return reflection.children
        ?.filter((child) => child.hasOwnDocument)
        .map((child) => {
          return {
            title: child.name,
            url: child.url,
            children: this.getChildrenOrGroups(child),
          };
        });
    }
    return reflection.groups?.map((group) => {
      return {
        title: group.title,
        children: this.getGroupChildren(group) || [],
      };
    });
  }
}
