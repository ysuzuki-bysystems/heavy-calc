export function calc(n: number): void {
  const begin = Date.now();
  let now: number;

  do {
    now = Date.now();
  } while ((now - begin) < n);
}
