module.exports = {
  /**
   * 将文件名改成驼峰，并首字母大写
   * @param str   'cell-swipe'
   * @returns {string} 'CellSwipe'
   */
  tranformStr(str){
    var strArr = str.split('-')
    for(var i=0; i<strArr.length; i++){
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
    }
    return strArr.join('')
  }
}