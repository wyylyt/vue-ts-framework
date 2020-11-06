/** 短横线转驼峰 */
export function underlineToHump(str: string) {
  const strList = str.split('-')
  return strList
    .map(item => {
      item = item.slice(0, 1).toUpperCase() + item.slice(1)
      return item
    })
    .join('')
}
