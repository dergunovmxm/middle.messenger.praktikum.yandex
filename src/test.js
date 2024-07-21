// @ts-ignore
const s = 'aaaaaddddddddddbnbkdkfnnkbfkgkbnfkfkaaaaaaakfnbkfndkaaaankbaaaankbndfkaaa'

let ans = ''
let anscnt = 0

let symcnt = {}

for (let i = 0; i < s.length; i++) {
  let now = s[i]
  if (!symcnt[now]) {
    symcnt[now] = 0
  }
  symcnt[now] += 1
  if (symcnt[now] > anscnt) {
    ans = now
    anscnt = symcnt[now]
  }
}

console.log('anscnt', anscnt)
