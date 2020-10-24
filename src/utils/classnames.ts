
type NameMap = { [name: string]: boolean | undefined | null };
type ClassNames = string | NameMap | undefined | null;

const parseNameMap = (nameMap: NameMap): string[] => {
  return Object.entries(nameMap)
    .filter(([name, enabled]) => !!enabled)
    .map(([name]) => name);
};

export const cn = (...names: ClassNames[]): string => {
  const nameList = names.reduce((finalNames, name) => {
    if (typeof name === 'string') {
      return finalNames.concat(name);
    } else if (typeof name === 'object' && name) {
      return finalNames.concat(parseNameMap(name));
    }
    return finalNames;
  }, [] as string[]);

  return nameList
    .filter(name => name != null && name !== '')
    .join(' ');
};
