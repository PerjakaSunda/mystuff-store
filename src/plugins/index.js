/* eslint-disable */
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(VueAxios, axios)

Vue.axios.interceptors.request.use(function (config) {
  config.headers.common.Authorization = 'Bearer ' + localStorage.getItem('access_token')
  return config
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$copyText = function (element) {
  let range
  let selection
  if (document.body.createTextRange) {
    range = document.body.createTextRange()
    range.moveToElementText(element)
    range.select()
  } else if (window.getSelection) {
    selection = window.getSelection();       
    range = document.createRange()
    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  try {
    return document.execCommand('copy')
  }
  catch (err) {
    console.log(err)
  }
}

Vue.prototype.$setTitle = function (str) {
  if (str) {
    return (str.charAt(0).toUpperCase() + str.slice(1)).replace('-', ' ')
  } else {
    return '-'
  }
}

Vue.prototype.$strLimit = function (str, limit) {
  if (str && parseInt(limit)) {
    return str.substring(0, limit) + (str.length > limit ? '...' : '')
  } else {
    return str.substring(0, 10)
  }
}

Vue.prototype.$price = function (price) {
  if (parseInt(price)) {
    return 'Rp.' + parseInt(price).toLocaleString()
  } else {
    return 'Rp.0'
  }
}

Vue.prototype.$uuid = function () {
  const navigatorInfo = window.navigator
  const screenInfo = window.screen
  let uid = navigatorInfo.mimeTypes.length
  uid += navigatorInfo.userAgent.replace(/\D+/g, '')
  uid += navigatorInfo.plugins.length
  uid += screenInfo.height || ''
  uid += screenInfo.width || ''
  uid += screenInfo.pixelDepth || ''
  return uid
}

Vue.prototype.$device = function () {
  return (navigator.userAgent.match(/iPad/i)) == 'iPad' ? 'ios' : (navigator.userAgent.match(/iPhone/i)) == 'iPhone' ? 'ios' : (navigator.userAgent.match(/Android/i)) == 'Android' ? 'android' : (navigator.userAgent.match(/BlackBerry/i)) == 'BlackBerry' ? 'blackberry' : null
}

Vue.prototype.$totalWeight = function (mycarts) {
  if (mycarts) {
    let tWeight = 0
    mycarts.map(r => {
      tWeight += (r.berat * r.jumlah)
    })
    tWeight = Math.ceil(tWeight / 1000)
    return tWeight
  } else {
    return '-'
  }
}

Vue.prototype.$getTotalPrice = function (carts) {
  if (typeof carts === 'object') {
    let totalHarga = 0
    carts.map((r) => {
      totalHarga += r.harga
    })
    return totalHarga
  } else {
    return 0
  }
}
Vue.prototype.$getTotalPriceReseller = function (carts, resellerPrice) {
  if (typeof carts === 'object') {
    let totalHarga = 0
    carts.map((r) => {
      const afterDiscount = parseInt(r.discount) ? parseInt(r.discount) : parseInt(r.harga)
      const afterDiscountReseller = afterDiscount - (afterDiscount * resellerPrice / 100)
      totalHarga += afterDiscountReseller * parseInt(r.jumlah)
    })
    return totalHarga
  } else {
    return 0
  }
}

Vue.prototype.$reformatTanggal = function (tanggal) {
  if (tanggal && typeof tanggal === 'string') {
    return tanggal.substr(0, 10)
  } else {
    return '-'
  }
}

Vue.prototype.$getStatus = function (status) {
  status = parseInt(status)
  switch (status) {
    case 0:
      return 'unpaid'
    case 1:
      return 'pending'
    case 2:
      return 'processed'
    case 3:
      return 'shipping'
    case 4:
      return 'complete'
    case 99:
      return 'canceled'
    default:
      return '-'
  }
}

Vue.prototype.$imgtoBase64 = function (event, callback) {
  /* eslint-disable */
  function getType(ext) {
    if (ext === 'mov' || ext === 'mp4' || ext === 'avi' || ext === 'flv') {
      return 'video'
    } else if (ext === 'doc' || ext === 'docx' || ext === 'ppt' || ext === 'pptx' || ext === 'xls' || ext === 'xlsx' || ext === 'csv' || ext === 'txt' || ext === 'pdf' || ext === 'psd') {
      return 'doc'
    } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'gif' || ext === 'png' || ext === 'svg') {
      return 'photo'
    } else if (ext === 'mp3' || ext === 'wav') {
      return 'audio'
    } else {
      return 'unknown'
    }
  }
  let r = {
    status: false,
    ext: '',
    type: '',
    data: null
  }
  let f = event.target.files || event.dataTransfer.files

  const reader = new FileReader()
  if (f[0]) {
    const fname = event.target.files[0].name
    const lastDot = fname.lastIndexOf('.')
    r.ext = fname.substring(lastDot + 1)
    r.type = getType(r.ext)

    const fSize = r.ext === 'mov' || r.ext === 'mp4' || r.ext === 'avi' || r.ext === 'flv' ? 20000000 : 3000000 // 10MB : 3MB

    if (f[0].size <= fSize) {
      reader.readAsDataURL(f[0])
      reader.onload = function (ev) {
        r.status = true
        r.data = ev.target.result
        callback(r)
      }
      reader.onerror = function (error) {
        r.status = false
        r.data = error
        callback(r)
      }
    } else {
      r.status = false
      r.data = 'file_size'
      callback(r)
    }
  } else {
    r.status = false
    r.data = 'canceled'
    callback(r)
  }
}

Vue.prototype.$getExt = function (str) {
  const lastDot = str.lastIndexOf('.')
  return str.substring(lastDot + 1)
}

Vue.prototype.$correctWhatsapp = function (phone) {
  if (!phone) {
    return false
  }
  if (phone.substring(0, 1) === '8') {
    phone = '628' + phone.substring(1, phone.length)
  }
  if (phone.substring(0, 1) === '0') {
    phone = '62' + phone.substring(1, phone.length)
  }
  if (phone.substring(0, 3) === '+62') {
    phone = phone.replace('+62', '62')
  }
  return phone
}

Vue.prototype.$NumberOnly = function (e) {
  const key = e.keyCode ? e.keyCode : e.which
  if (isNaN(String.fromCharCode(key)) && key !== 8 && key !== 46 && key !== 37 && key !== 39) {
    e.preventDefault()
    return false
  }
}

Vue.prototype.$validateEmail = function (email) {
  // eslint-disable-next-line
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

Vue.prototype.$reformatPhone = function (phone) {
  if (phone) {
    if (phone.substring(0, 1) === '8') {
      return '62' + phone
    } else if (phone.substring(0, 2) === '08') {
      return '62' + phone.substring(1, phone.length)
    } else if (phone.substring(0, 2) === '62') {
      return phone
    } else if (phone.substring(0, 3) === '+62') {
      return phone.substring(1, phone.length)
    } else {
      return false
    }
  } else {
    return false
  }
}

Vue.prototype.$validatePhone = function (phone, arePhone) {
  if (phone) {
    if (phone.length > 7 && phone.length < 15) {
      if (arePhone === '0' && phone.length > 9 && phone.length < 14) {
        if (phone.substring(0, 1) === '0') {
          return true
        } else {
          return false
        }
      } else if (arePhone) {
        if (phone.substring(0, 1) === '2' || phone.substring(0, 2) === '02' || phone.substring(0, 2) === '62' || phone.substring(0, 3) === '+62') {
          return true
        } else {
          return false
        }
      } else if (phone.substring(0, 1) === '8' || phone.substring(0, 2) === '08' || phone.substring(0, 2) === '62' || phone.substring(0, 3) === '+62') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

Vue.prototype.$convertTime = function (str) {
  const date = new Date(str)
  return date.toString()
}

Vue.prototype.$setTime = function (str) {
  const date = new Date(str)
  const year = date.getFullYear()
  const month = parseInt(date.getMonth()) < 10 ? '0' + (parseInt(date.getMonth()) + 1) : date.getMonth()
  const day = parseInt(date.getDate()) < 10 ? '0' + parseInt(date.getDate()) : date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  const newDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + seconds
  return newDate.substr(11, 5)
}
