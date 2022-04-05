import { computed } from "vue";
import { Router } from "vue-router";

/* 导出 computed 变量 */
// 如果有 token 那么以前登录过, 判断为在线状态
export const isOnline = computed(() => {
  if (localStorage.getItem("token") == null) return false;
  else return true;
});

/* 导出函数 */
// 将时间戳转换成时间
export function timetrans(date: number) {
  let dateObj = new Date(date); //如果date为13位不需要乘1000
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

// 获取时间戳的函数
export function getTimeStamp() {
  return new Date().getTime();
}

export function redirect(router: Router, path: string, delay: number = 1000) {
  setTimeout(() => {
    router.push(path);
  }, delay);
}
