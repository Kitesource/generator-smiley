<template>
  <section>
    <span class="title">Vant</span>
    <div class="demo">
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
  </section>
  <section>
    <span class="title">Modal</span>
    <div class="demo">
      <van-button type="primary" @click="openLargeModal">Open large Modal</van-button>
      <van-button type="success" @click="openSmallModal">Open Normal Modal</van-button>
    </div>
  </section>
</template>

<script setup name="DemoPage" lang="tsx">
  import { openFactoryModal } from '@/components/Modal/index'

  const openLargeModal = () => {
    openFactoryModal({
      renderComp: function () {
        return <div>自定义内容</div>
      },
    }).then((res) => {
      console.log('确认成功', res)
    })
  }
  const openSmallModal = () => {
    openFactoryModal({
      size: 'normal',
      renderComp: function () {
        return <div>自定义内容</div>
      },
    }).then((res) => {
      console.log('确认成功', res)
    })
  }
</script>

<style lang="scss" scoped>
  section {
    .title {
      display: inline-block;
      margin-bottom: 40px;
      font-size: 40px;
      font-weight: 500;
    }

    &:nth-child(n) {
      .title {
        margin-top: 20px;
      }
    }

    &:first-child {
      .title {
        margin-top: 0;
      }
    }

    ::v-deep(.var-space) {
      margin-bottom: 10px !important;
    }
  }

  .demo {
    > :nth-child(n) {
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
</style>
