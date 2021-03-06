/**
 * format a number as a clock value string minutes:seconds:miliseconds.
 * @param {number} time
 * @returns {string}
 *
 */

  export const format = (time) => {
    let mil = time % 100 | 0;
    if (mil / 10 < 1) mil = "0" + mil;
    let seg = (time / 100) % 60 | 0;
    if (seg / 10 < 1) seg = "0" + seg;
    let min = (time / 6000) % 60| 0;
    if (min / 10 < 1) min = "0" + min;
    let hr = (time/360000) % 24 | 0;
    if (hr / 10 < 1) hr = "0" + hr; 
    return `${hr}:${min}:${seg}`;
  };
 
