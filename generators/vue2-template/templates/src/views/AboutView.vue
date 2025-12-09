<template>
  <div class="about">
    <button @click="changeTheme">changeTheme</button>
    <h1 class="title">This is an about page</h1>
    <van-button type="info" @click="showDevicePicker = true">DevicePicker</van-button>
    <NoDevice text="没有设备!没有设备!没有设备!" />
    <DevicePicker
      v-if="showDevicePicker"
      :title="'选择设备'"
      :showPickerModal="showDevicePicker"
      :deviceList="deviceList"
      :deviceId="deviceId"
      @confirm="deviceConfirm"
      @close="deviceChooseClose"
    />
    <button @click="loadingFanish = true">AutoManger</button>
    <AutoManger :loadingFanish="loadingFanish" :renewData="renewData" />

    <button @click="showLoading">Loading</button>
    <div style="margin-top: 40px; display: flex; gap: 20px; justify-content: center">
      <gw-tooltip content="支付超时，订单已关闭" placement="top" :offset="-200">
        <van-icon size="40px" name="question-o" />
      </gw-tooltip>
      <gw-tooltip content="支付超时，订单已关闭" placement="bottom" :offset="200">
        <van-icon size="40px" name="question-o" />
      </gw-tooltip>
    </div>
    <div style="margin-top: 40px; display: flex; gap: 20px; justify-content: center">
      <gw-tooltip content="支付超时，订单已关闭支付超时" placement="left" :offset="-200">
        <van-icon size="40px" name="question-o" />
      </gw-tooltip>
      <gw-tooltip content="支付超时，订单已关闭" placement="right" :offset="200">
        <van-icon size="40px" name="question-o" />
      </gw-tooltip>
    </div>
  </div>
</template>
<script>
import GwTooltip from '@/components/GwTooltip.vue'
import { theme } from 'gwell-ui/lib/es/util'
export default {
  name: 'AboutView',
  components: {
    GwTooltip
  },
  data() {
    return {
      // device picker
      showDevicePicker: false,
      deviceId: '4323360712',
      deviceList: [
        {
          fourCard: {
            fgRenew: 0,
            support: 1,
            fgExpireTime: 1745206157,
            purchaseUrl: 'https://saas-trade-develop.cloudlinks.cn/h5/4g/default/#/?iccid=89861120258037616321',
            third: false,
            surplusFlow: 10240,
            factoryId: 4,
            cornerUrl: ''
          },
          iis: {},
          accessWay: '1',
          version: '30.00.00.34',
          support_4g: '1',
          uniqueId: '43B8B7C4-239E-4CA9-8EE8-C0C8E4D0B550',
          permission: '573',
          aiBox: {},
          deviceId: '19897916',
          devFuncCfg: 0,
          deviceName: '国内',
          entId: '1000000101',
          isIoTDevice: '0',
          addType: 'share',
          deviceVesion: '30.00.00.34',
          online: '1',
          vss: {
            vssExpireTime: 1742459032,
            vssRenew: 0,
            support: 0,
            storageDuration: 3,
            type: 3,
            cornerUrl: '',
            accessWay: 1
          }
        },
        {
          fourCard: {},
          iis: {
            endTime: 0,
            status: 0,
            support: 0
          },
          accessWay: '1',
          version: '33.0.18',
          support_4g: '0',
          uniqueId: '43B8B7C4-239E-4CA9-8EE8-C0C8E4D0B550',
          permission: '117',
          aiBox: {
            support: 0,
            enableFunc: 0,
            supportFunc: 0,
            unlockFunc: 0
          },
          deviceId: '4323360712',
          devFuncCfg: 64,
          deviceName: '店铺',
          entId: '',
          isIoTDevice: '1',
          addType: 'share',
          deviceVesion: '33.0.18',
          online: '0',
          vss: {
            vssExpireTime: 1742978015,
            vssRenew: 0,
            support: 1,
            storageDuration: 3,
            type: 3,
            cornerUrl: '',
            accessWay: 1
          }
        },
        {
          fourCard: {},
          iis: {
            endTime: 0,
            status: 0,
            support: 0
          },
          accessWay: '1',
          version: '44.0.18',
          support_4g: '0',
          uniqueId: '43B8B7C4-239E-4CA9-8EE8-C0C8E4D0B550',
          permission: '3',
          aiBox: {
            support: 0,
            enableFunc: 0,
            supportFunc: 0,
            unlockFunc: 0
          },
          deviceId: '4762237760',
          devFuncCfg: 1759257612,
          deviceName: 'wifi低功耗',
          entId: '',
          isIoTDevice: '1',
          addType: 'master',
          deviceVesion: '44.0.18',
          online: '0',
          vss: {
            vssExpireTime: 1743470730,
            vssRenew: 0,
            support: 1,
            storageDuration: 3,
            type: 1,
            cornerUrl: '',
            accessWay: 1
          }
        }
      ],

      // auto manger
      loadingFanish: false,
      renewData: {
        state: 'NONE'
      }
    }
  },
  methods: {
    back() {
      console.log('length', window.history.length)
      console.log('state', window.history.state)

      window.history.back()
    },
    deviceConfirm(index) {
      this.currentDevice = this.deviceList[index]
      const { deviceId } = this.currentDevice
      this.deviceId = deviceId
      this.showDevicePicker = false
    },
    deviceChooseClose() {
      this.showDevicePicker = false
    },
    showLoading() {
      this.$loading.show({ showLoadingMask: true })
      setTimeout(() => {
        this.$loading.hide()
      }, 3000)
    },
    changeTheme() {
      theme.toggleTheme()
    }
  }
}
</script>
<style lang="scss">
.title {
  background-color: $button-bg;
}
</style>
