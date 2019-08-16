export function timeFormat (val, options) {
  const sym = options.type
  const y = val.getFullYear()
  const m = val.getMonth() + 1
  const d = val.getDate()
  return y + sym + m + sym + d
}
