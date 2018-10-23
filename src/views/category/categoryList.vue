<template>
    <div>
      <el-card>
        <div slot="header">
          <span>分类列表</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 500px;margin: 0 auto">
          <el-table-column
            prop="title"
            header-align="center"
            label="分类名">
          </el-table-column>
          <el-table-column
            label="分类图标"
            header-align="center"
            width="100">
            <template slot-scope="scope">
              <img style="width: 80px; height: 80px" :src="scope.row.icon"/>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: right;margin-top: 20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page.sync="page"
          :page-sizes="[5, 10, 30]"
          layout="sizes,total, prev, pager, next"
          :total="total">
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      total: 100,
      rows: 10,
      page: 1
    }
  },
  methods: {
    getDate () {
      this.$axios.get(`/category/?page=${this.page}&rows=${this.rows}`).then(res => {
        console.log(res)
        this.tableData = res.data.data
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.rows = val
      this.getDate()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getDate()
    }
  },
  created () {
    this.getDate()
  }
}
</script>

<style scoped>

</style>
