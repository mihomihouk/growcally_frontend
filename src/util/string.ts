export const pluralize = (
  value: number,
  singular: string,
  plural?: string
): string => {
  if (value === 1) {
    return singular;
  }

  if (plural) {
    return plural;
  }

  return singular + "s";
};
