import axios from 'axios'
export async function getQuestionList(params) {
  const url = '/driverexamQuery' + params
  const { data: res } = await axios.get(url)
  return res.result.result
}
