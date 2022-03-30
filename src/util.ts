export function timetrans(date: number) {
  let dateObj = new Date(date * 1000); //如果date为13位不需要乘1000
  let Y = dateObj.getFullYear() + "-";
  let M =
    (dateObj.getMonth() + 1 < 10
      ? "0" + (dateObj.getMonth() + 1)
      : dateObj.getMonth() + 1) + "-";
  let D =
    (dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate()) +
    " ";
  let h =
    (dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours()) +
    ":";
  let m =
    (dateObj.getMinutes() < 10
      ? "0" + dateObj.getMinutes()
      : dateObj.getMinutes()) + ":";
  let s =
    dateObj.getSeconds() < 10
      ? "0" + dateObj.getSeconds()
      : dateObj.getSeconds();
  return Y + M + D + h + m + s;
}
