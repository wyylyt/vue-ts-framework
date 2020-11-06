/*
 * @Description:
 * @Author: wanjikun
 * @Date: 2020-11-06 09:42:37
 * @LastEditTime: 2020-11-06 15:02:23
 * @LastEditors: wanjikun
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    ['import', {
      'libraryName': 'vant',
      'libraryDirectory': 'es',
      'style': true
    }, 'vant']
  ]
}
