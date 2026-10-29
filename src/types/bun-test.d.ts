/**
 * The subset of `bun:test` the tests use. Replace with `@types/bun` once the lockfile can be
 * updated (`bun add -d @types/bun`); until then this keeps `tsc` happy without a new dependency.
 */
declare module "bun:test" {
  type TestFn = () => void | Promise<void>;
  export function describe(name: string, fn: () => void): void;
  export function test(name: string, fn: TestFn): void;
  export const it: typeof test;

  interface Matchers<T> {
    toBe(expected: T): void;
    toEqual(expected: unknown): void;
    toStrictEqual(expected: unknown): void;
    toBeNull(): void;
    toBeUndefined(): void;
    toBeTrue(): void;
    toBeFalse(): void;
    toHaveLength(length: number): void;
    toContain(item: unknown): void;
    toBeGreaterThan(n: number): void;
    toBeLessThan(n: number): void;
    toThrow(message?: string | RegExp): void;
    not: Matchers<T>;
  }
  export function expect<T>(actual: T): Matchers<T>;
}
