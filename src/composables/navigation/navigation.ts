export const gotoHome = () => {
  uni.switchTab({
    url: '/pages/merchant_end/index/index',
  })
}

export const gotoLoginAndRegister = () => {
  uni.navigateTo({
    url: '/pages/login_register/login_register',
  })
}

export const gotoForget = () => {
  uni.navigateTo({
    url: '/pages/login_register/merchant/forget/forget',
  })
}

export const gotoPhonelogin = () => {
  uni.navigateTo({
    url: '/pages/login_register/merchant/phonelogin',
  })
}

export const gotoRegister = () => {
  uni.navigateTo({
    url: '/pages/login_register/merchant/register/register_1',
  })
}
