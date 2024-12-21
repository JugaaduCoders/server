// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serverLog(val: any, callee?: string) {
  if (Array.isArray(val)) console.log(...val, "Called by", callee);
  else console.log(val, "Called by", callee);
}
