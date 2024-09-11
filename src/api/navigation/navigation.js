const gotoHome = () => {
  uni.switchTab({ url: '/pages/merchant_end/index/index' })
}

const gotoPhonelogin = () => {
  uni.navigateTo({ url: '/pages/login_regitser/merchant/phonelogin' })
}

const gotoForget = () => {
  uni.navigateTo({ url: '/pages/login_regitser/merchant/forget/forget' })
}

const gotoRegister = () => {
  uni.navigateTo({ url: '/pages/login_regitser/merchant/register/register_1' })
}

export { gotoHome, gotoForget, gotoPhonelogin, gotoRegister }
