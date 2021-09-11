function getOptionList(item) {
  const option = []
  if ('option1' in item) {
    Object.keys(item)
      .filter(key => !(key.indexOf('option') === -1))
      .forEach(key => {
        option.push(item[key])
      })
  } else {
    option.push('A、对')
    option.push('B、错')
  }
  return option
}
// 数据规范化
function getNormalContent(item) {
  const res = {}
  res.question = item.question
  res.optionList = getOptionList(item)
  res.answer = item.answer
  res.explain = item.explain
  if (item.pic) {
    res.pic = item.pic
  }
  return res
}
// 判断题目类型
function getQuestionType(item) {
  if (item.answer.indexOf('对') !== -1 || item.answer.indexOf('错') !== -1) {
    return 'judge'
  } else if (item.answer.length > 1) {
    return 'm-choice'
  }
  return 'choice'
}

export { getOptionList, getNormalContent, getQuestionType }
