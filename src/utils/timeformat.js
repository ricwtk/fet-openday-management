import { Temporal } from "@js-temporal/polyfill";

// Fallback assignment if native Temporal is missing
if (typeof globalThis.Temporal === "undefined") {
  globalThis.Temporal = Temporal;
}

export const zpad = (v,n=2) => ("0".repeat(n-1) + v).slice(-n)
export const getDateString = (tprl) => { return `${tprl.year}-${zpad(tprl.month)}-${zpad(tprl.day)}` }
export const getTimeString = (tprl) => { return `${zpad(tprl.hour)}:${zpad(tprl.minute)}` }
export const getDateTimeString = (tprl) => { return `${getDateString(tprl)} ${getTimeString(tprl)}` }
export const formatTimingForDisplay = (timingobj) => {
  let timing
  if (typeof timingobj[0] === 'string') {
    timing = timingobj.map(t => Temporal.PlainDateTime.from(t))
  } else {
    timing = timingobj
  }
  if (timing.length == 1) { return getDateString(timing[0])}
  else {
    let startstring = getDateTimeString(timing[0])
    let endstring = getDateTimeString(timing[1])
    let start = timing[0].toPlainDate()
    let end = timing[1].toPlainDate()
    if (start.equals(end)) { endstring = getTimeString(timing[1]) }
    return `${startstring} - ${endstring}`
  }
}