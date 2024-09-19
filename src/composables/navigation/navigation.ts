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
