import { NIcon } from "naive-ui";
import { Component, computed, h } from "vue";
import { Router } from "vue-router";
import { ProductDetail } from "./define/Product";

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

/* 延迟路由跳转 */
export function redirect(router: Router, path: string, delay: number = 1000) {
  setTimeout(() => {
    router.push(path);
  }, delay);
}

/* 图标渲染 */
export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export function price2Chinese(n: number) {
  const fraction = ["角", "分"];
  const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const unit = [
    ["元", "万", "亿"],
    ["", "拾", "佰", "仟"],
  ];
  let head = n < 0 ? "欠" : "";
  n = Math.abs(n);
  let s = "";
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(shiftRight(n, 1 + i)) % 10] + fraction[i]).replace(
      /零./,
      ""
    );
  }
  s = s || "整";
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = "";
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(shiftLeft(n, 1));
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  }
  return (
    "人民币" +
    head +
    s
      .replace(/(零.)*零元/, "元")
      .replace(/(零.)+/g, "零")
      .replace(/^整$/, "零元整")
  );
}

// 向右移位
function shiftRight(n: number, digit: number) {
  let value = n.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + digit : digit));
}
// 向左移位
function shiftLeft(n: number, digit: number) {
  let value = n.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] - digit : -digit));
}

export function getDateToday(): string {
  let date = new Date(); //当前时间
  let year = date.getFullYear(); //返回指定日期的年份
  let month = repair(date.getMonth() + 1); //月
  let day = repair(date.getDate()); //日

  //当前时间
  return year + "-" + month + "-" + day;
}

function repair(i: number) {
  if (i >= 0 && i <= 9) {
    return "0" + i;
  } else {
    return i;
  }
}

export function transProductEditedData(source: ProductDetail) {
  source.price *= 100;
  source.money_rate *= 100;
}
