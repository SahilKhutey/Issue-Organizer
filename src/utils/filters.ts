import { Issue, FilterOptions } from '../types';

export function applyFilters(issues: Issue[], filters: FilterOptions): Issue[] {
  return issues.filter(issue => {
    // Priority filter
    if (filters.priority.length > 0 && !filters.priority.includes(issue.priority)) {
      return false;
    }

    // Tags filter
    if (filters.tags.length > 0) {
      const issueTags = [...issue.tags, ...(issue.aiTags || [])];
      if (!filters.tags.some(tag => issueTags.includes(tag))) {
        return false;
      }
    }

    // Assignee filter
    if (filters.assignee.length > 0) {
      if (!issue.assignee || !filters.assignee.includes(issue.assignee.login)) {
        return false;
      }
    }

    // State filter
    if (filters.state.length > 0 && !filters.state.includes(issue.state)) {
      return false;
    }

    // Repository filter
    if (filters.repository.length > 0 && !filters.repository.includes(issue.repository.name)) {
      return false;
    }

    return true;
  });
}

export function getUniqueValues(issues: Issue[], field: keyof Issue): string[] {
  const values = new Set<string>();
  
  issues.forEach(issue => {
    const value = issue[field];
    if (typeof value === 'string') {
      values.add(value);
    } else if (Array.isArray(value)) {
      value.forEach(v => values.add(v));
    } else if (value && typeof value === 'object' && 'login' in value) {
      values.add((value as any).login);
    } else if (value && typeof value === 'object' && 'name' in value) {
      values.add((value as any).name);
    }
  });
  
  return Array.from(values).sort();
}