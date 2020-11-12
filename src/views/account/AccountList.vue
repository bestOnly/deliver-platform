<template>
  <div>
    <panel>
      <template #title>
        <span>账户列表</span>
      </template>
      <template #content>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="account" label="账户" width="150">
            <!-- <template slot-scope="scope">{{ scope.row.admin }}</template> -->
          </el-table-column>
          <el-table-column
            prop="userGroup"
            label="用户类型"
            width="150"
          ></el-table-column>
          <el-table-column label="创建时间" width="300">
            <template v-slot="{ row }">{{ row.ctime | createTime }}</template>
          </el-table-column>
          <el-table-column
            prop="imgUrl"
            label="用户头像"
            width="180"
          ></el-table-column>
          <el-table-column prop="manage" label="操作">
            <template v-slot="{ row }">
              <el-button type="primary" @click="openUpdate(row)"
                >编辑</el-button
              >
              <el-button type="danger" @click="delUser(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        ></el-pagination>
        <div style="margin-top: 20px">
          <el-button type="danger" @click="delSome">批量删除</el-button>
          <el-button type="primary" @click="toggleSelection()"
            >取消选择</el-button
          >
        </div>
        <!-- 模态框 -->
        <el-dialog title="编辑账户" :visible.sync="dialogFormVisible">
          <el-form :model="modUser">
            <el-form-item label="账户名称" :label-width="formLabelWidth">
              <el-input v-model="modUser.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" :label-width="formLabelWidth">
              <el-select
                v-model="modUser.userGroup"
                placeholder="请选择用户类型"
              >
                <el-option label="普通管理员" value="普通管理员"></el-option>
                <el-option label="超级管理员" value="超级管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveUpdate">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 模态框结束 -->
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import createTime from '@/utils/filter.js'
import { userList, delUser, updateUser, delSomeUser } from '@/api/account.js'
export default {
  components: {
    panel
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      check: [],
      modUser: {
        account: '',
        userGroup: ''
      },
      // 模态框相关
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /* 用户列表 */
    async getList() {
      // 如果当前页没有数据就返回前一页
      if (this.tableData.length === 1 && this.currentPage > 1) {
        this.currentPage--
      }
      const { data, total } = await userList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.total = total
      this.tableData = data
    },
    /* 删除 */
    delUser(id) {
      this.$confirm('亲，你要想清楚', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delUser({ id })
        this.getList()
      })
    },
    /*  打开修改的弹框 */
    openUpdate(row) {
      this.dialogFormVisible = true
      this.modUser = row
    },
    /* 修改用户 */
    async saveUpdate() {
      const data = await updateUser(this.modUser)
      this.dialogFormVisible = false
      console.log(data)
    },
    /* 批量删除 */
    delSome() {
      this.$confirm('亲，你要想清楚', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delSomeUser({
          ids: JSON.stringify(this.check)
        })
        this.getList()
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 保存点击的数据
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.check = []
      val.forEach((item) => {
        this.check.push(item.id)
      })
      console.log(this.check)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    }
  },
  filters: {
    createTime
  }
}
</script>

<style lang="less" scoped></style>
