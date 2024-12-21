// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serverLog(val: any, callee?: string) {
  if (process.env.NODE_ENV === 'development') {
    const isCallee = callee ? `Called by ${callee}` : '';
    return console.log(...(Array.isArray(val) ? val : [val]), isCallee);
  }
}
