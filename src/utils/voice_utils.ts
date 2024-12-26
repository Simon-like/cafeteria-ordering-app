/**
 * @description 文字语音转换
 * @author 应东林
 * @date 2024-12-24
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-24
 */

export default class BATTS {
  tts
  constructor() {
    if (!this.tts) this.tts = uni.requireNativePlugin('Ba-TTS') //引入组件
  }
  speak(text: string) {
    //播放声音
    this.tts.speak(
      {
        text, //文本； 注意：如果是数字单读（如叫号1001），可用空格隔开，如“1 0 0 1”）
        //pitch: 0.6, // 设置音调，值越大声音越尖（女生），值越小则变成男声,默认是1
        //speed: 1 //设定语速 ，默认1正常语速
      },
      (res) => {
        console.log(res)
      },
    )
  }
  stopSpeak() {
    //停止播放
    this.tts.stopSpeak((res) => {
      console.log(res)
    })
  }
  playVibrate() {
    //震动
    //let params = {};//默认 500
    let params = {
      repeat: 0, //重复 -1：表示不重复 0：循环的震动 >1：表示从哪里开始重复
      pattern: [500, 200, 500, 100], //震动规则，传递一个整型数组作为关闭和开启震动的持续时间，以毫秒为单位。第一个值表示等待震动开启的毫秒数，下一个值表示保持震动的毫秒数，这个序列值交替表示震动关闭和开启的毫秒数
    } //自定义规则

    this.tts.playVibrate(params, (res) => {
      console.log(res)
    })
    setTimeout(() => {
      this.cancelVibrate()
    }, 2000)
  }
  cancelVibrate() {
    //取消震动
    this.tts.cancelVibrate((res) => {
      console.log(res)
    })
  }
}
