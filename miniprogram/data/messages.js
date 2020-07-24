let messages = () => {
  let hour = new Date().getHours()
  switch(hour) {
    case 6:
    case 7:
    case 8:
    case 9:
      return '早上好，这么早就醒了,今天也要加油哦'
    case 10:
    case 11:
      return '歇会儿吧，等会就该吃饭了'
    case 12:
    case 13:
      return '中午好，工作再忙也要适当休息哦'
    case 14:
    case 15:
    case 16:
    case 17:
      return '下午好，长时间敲代码，能让你的腰间盘更加突出噢'
    case 18:
    case 19:
      return '还没下班？不要担心，以后这样的日子还多得是呢'
    case 20:
    case 21:
      return '晚上好，明天再继续加油吧'
    case 22:
    case 23:
      return '很晚啦，要早点休息哦'
    case 0:
    case 1:
    case 2:
    case 3:
      return '这个点儿了还在看手机？'
    case 4:
    case 5:
      return '你在肝神魔'
  }
}
module.exports = {
  messages,
}