<template>
  <div class="custom-table">
    <el-table :data="paginatedData" v-bind="tableProps" @selection-change="handleSelectionChange">
      <!-- 动态生成列 -->
      <el-table-column
        v-for="column in visibleColumns"
        :key="column.prop || column.label"
        v-bind="getColumnProps(column)"
      >
        <!-- 动态渲染单元格 -->
        <template v-if="column.render" #default="scope">
          <div v-if="column.render">
            <BaseColumnRender :render="column.render" :scope="scope" />
          </div>
          <div v-else>{{ scope.row[column.prop] }}</div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="pagination"
      class="pagination"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :page-sizes="pagination.pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import BaseColumnRender from '@/components/BaseColumnRender.vue'
export default {
  name: 'CustomTable',
  components: {
    BaseColumnRender
  },
  props: {
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    tableProps: {
      type: Object,
      default: () => ({})
    },
    pagination: {
      type: Object,
      default: null
    }
  },
  computed: {
    visibleColumns() {
      // 过滤掉 visible 为 false 的列
      return this.columns.filter((column) => column.visible !== false)
    },
    paginatedData() {
      if (this.pagination) {
        const start = (this.pagination.currentPage - 1) * this.pagination.pageSize
        const end = start + this.pagination.pageSize
        return this.data.slice(start, end)
      }
      return this.data
    }
  },
  methods: {
    getColumnProps(column) {
      // eslint-disable-next-line no-unused-vars
      const { render, visible, ...restProps } = column
      return restProps
    },
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    handleSizeChange(size) {
      this.$emit('size-change', size)
    },
    handleCurrentChange(page) {
      this.$emit('current-change', page)
    }
  }
}
</script>

<style>
.custom-table {
  display: flex;
  flex-direction: column;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
