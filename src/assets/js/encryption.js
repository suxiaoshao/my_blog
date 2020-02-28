import { MD5 } from 'crypto-js'
function string_to_md5_3(str) {
    str = MD5(str).toString().slice(0, 16)
    str = MD5(str).toString().slice(16, 32)
    str = MD5(str).toString()
    return str
}
export {
    string_to_md5_3
}