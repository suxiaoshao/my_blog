// import { MD5 } from 'crypto-js'
import md5 from 'blueimp-md5'
function string_to_md5_3(str) {
    // str = MD5(str).toString().slice(0, 16)
    // str = MD5(str).toString().slice(16, 32)
    // str = MD5(str).toString()
    str = md5(str).slice(0, 16)
    str = md5(str).slice(16, 32)
    str = md5(str)
    return str
}
export {
    string_to_md5_3
}