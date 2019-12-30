
type KeyOfType<TObj, T> = keyof { [K in keyof TObj]: TObj[K] extends T ? K : never } & string;

function createError(message: string) {
  return new Error(message);
}

function createRelationError(prop: string, relation: string, value: unknown, target: unknown) {
  return createError(`Invalid ${prop}: must be ${relation} ${target}, but is ${value}`);
}

export function assertGreaterThan<T extends {}>(
  obj: T,
  name: KeyOfType<T, number>,
  treshold: number,
) {
  const value = obj[name] as unknown as number;
  if (value <= treshold) {
    throw createRelationError(name, 'greater than', value, treshold);
  }
}
export function assertGreaterThanOther<T extends {}>(
  obj: T,
  name: KeyOfType<T, number>,
  other: KeyOfType<T, number>,
) {
  const value = obj[name] as unknown as number;
  const treshold = obj[other] as unknown as number;
  if (value <= treshold) {
    throw createRelationError(name, 'greater than', value, other);
  }
}

export function assertGreaterThanOrEqual<T extends {}>(
  obj: T,
  name: KeyOfType<T, number>,
  treshold: number,
) {
  const value = obj[name] as unknown as number;
  if (value < treshold) {
    throw createRelationError(name, 'greater than or equal', value, treshold);
  }
}
export function assertGreaterThanOrEqualOther<T extends {}>(
  obj: T,
  name: KeyOfType<T, number>,
  other: KeyOfType<T, number>,
) {
  const value = obj[name] as unknown as number;
  const treshold = obj[other] as unknown as number;
  if (value < treshold) {
    throw createRelationError(name, 'greater than or equal', value, other);
  }
}

export function assertLessThan<T extends {}>(
  obj: T,
  name: KeyOfType<T, number>,
  treshold: number,
) {
  const value = obj[name] as unknown as number;
  if (value >= treshold) {
    throw createRelationError(name, 'less than', value, treshold);
  }
}
export function assertLessThanOther<T extends {}>(
  obj: T,
  name: KeyOfType<T, number>,
  other: KeyOfType<T, number>,
) {
  const value = obj[name] as unknown as number;
  const treshold = obj[other] as unknown as number;
  if (value >= treshold) {
    throw createRelationError(name, 'less than', value, other);
  }
}

export function assertLessThanOrEqual<T extends {}>(
  obj: T,
  name: KeyOfType<T, number>,
  treshold: number,
) {
  const value = obj[name] as unknown as number;
  if (value > treshold) {
    throw createRelationError(name, 'less than or equal', value, treshold);
  }
}
export function assertLessThanOrEqualOther<T extends {}>(
  obj: T,
  name: KeyOfType<T, number>,
  other: KeyOfType<T, number>,
) {
  const value = obj[name] as unknown as number;
  const treshold = obj[other] as unknown as number;
  if (value > treshold) {
    throw createRelationError(name, 'less than or equal', value, other);
  }
}
