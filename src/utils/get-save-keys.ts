export function getSafeKeys<T extends Object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as any as Array<keyof T>;
}
