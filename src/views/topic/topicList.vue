<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>新闻列表</span>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="user.nickname"
          header-align="center"
          align="center"
          width="150"
          label="发帖人">
        </el-table-column>
        <el-table-column
          prop="content"
          header-align="center"
          align="center"
          label="帖子内容">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          width="200"
          label="详情">
          <template slot-scope="scope">
            <el-badge :value="scope.row.countNum" :max="99" class="item" style="height: 40px">
              <el-button  @click="show(scope.row)" size="small">评论数</el-button>
            </el-badge>
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
        :total="count">
      </el-pagination>
    </el-card>
    <el-dialog title="评论详情" :visible.sync="dialogTableVisible" width="40%" center>
      <el-table :data="commentList">
        <el-table-column
          header-align="center"
          align="center"
          property="content"
          label="内容"
          width="300">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="详情">
          <el-dialog
            width="30%"
            title="评论详情"
            :visible.sync="innerVisible"
            append-to-body>
            <el-card>
              <div></div>
            </el-card>
          </el-dialog>
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="getComment(scope.row)">详情</el-button>
            <el-button type="danger" size="small" @click="dialogTableVisible = false">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      rows: 10,
      page: 1,
      count: 10,
      dialogTableVisible: false,
      innerVisible: false,
      commentList: [],
      comment: {}
    }
  },
  methods: {
    getDate () {
      this.$axios.get(`/topic?page=${this.page}&rows=${this.rows}`).then(res => {
        this.tableData = res.data.data
        this.count = res.data.count
      })
    },
    handleSizeChange (val) {
      this.rows = val
      this.getDate()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getDate()
    },
    handleEdit (row) {
      this.$router.push({name: 'editNews', params: {id: row._id}})
    },
    handleDelete (row) {
      this.$message.info('此功能未制作')
      console.log(row)
    },
    show (row) {
      this.dialogTableVisible = true
      this.commentList = row.comments
    },
    getComment (row) {
      this.innerVisible = true
      this.get(`/comment/id=${row._id}`).then(res => {
        this.comment = res.data.data
      })
    }
  },
  created () {
    this.getDate()
  }
}
</script>

<style scoped>
  .item {
    margin-top: 10px;
  }
</style>
