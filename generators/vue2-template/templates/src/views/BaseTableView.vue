<template>
  <div>
    <mac-range-input v-model="formData.macRange"></mac-range-input>

    <el-date-picker v-model="formData.timestamp1" type="daterange" value-format="timestamp"></el-date-picker>

    <el-date-picker v-model="formData.timestamp2" type="daterange" value-format="timestamp"></el-date-picker>
    <base-table
      style="margin-top: 40px"
      :columns="columns"
      :data="tableData"
      :tableProps="{ border: true, stripe: true }"
      :pagination="pagination"
      @selection-change="onSelectionChange"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script>
import MacRangeInput from '@/components/MacRangeInput.vue'
import BaseTable from '@/components/BaseTable.vue'

export default {
  components: { BaseTable, MacRangeInput },
  data() {
    return {
      formData: {
        macRange: null,
        timestamp1: null,
        timestamp2: null
      },
      tableData: [
        { id: 1, name: '张三', age: 20 },
        { id: 2, name: '李四', age: 25 },
        { id: 3, name: '王五', age: 30 },
        { id: 4, name: '赵六', age: 35 },
        { id: 5, name: '钱七', age: 40 },
        { id: 6, name: '孙八', age: 45 },
        { id: 7, name: '周九', age: 50 }
      ],
      columns: [
        { type: 'selection', width: '50', visible: true },
        { label: '姓名', prop: 'name', visible: true },
        { label: '年龄', prop: 'age', align: 'center', visible: true },
        {
          label: '操作',
          visible: true,
          render: (h, scope) => {
            return h(
              'button',
              {
                on: {
                  click: () => alert(`操作：${scope.row.name}`)
                }
              },
              '操作'
            )
          }
        }
      ],
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 7,
        pageSizes: [5, 10, 20, 50]
      },
      macRange: null
    }
  },
  watch: {
    formData: {
      handler(newVal, oldVal) {
        console.log('formData 变化了', newVal, oldVal)
      },
      deep: true
    }
  },
  methods: {
    onSelectionChange(selection) {
      console.log('选中项：', selection)
    },
    onSizeChange(size) {
      this.pagination.pageSize = size
      console.log('每页条数：', size)
    },
    onCurrentChange(page) {
      this.pagination.currentPage = page
      console.log('当前页：', page)
    }
  }
}
</script>
