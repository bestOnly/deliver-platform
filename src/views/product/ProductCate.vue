<template>
  <panel>
    <template #title>
      <div class="title">
        <span>商品分类</span>
        <el-button type="primary" @click="openBox">添加分类</el-button>
      </div>
    </template>
    <template #content>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="index"
          width="130"
          label="序号"
        ></el-table-column>
        <el-table-column label="分类名称" width="300">
          <template v-slot="{ row }">
            <span v-if="row.isEdit === true">{{ row.cateName }}</span>
            <el-input v-else size="mini" v-model="row.cateName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="350">
          <template v-slot="{ row }">
            <el-switch
              v-model="row.state"
              :disabled= row.isEdit
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot="{ row }">
            <el-button :type="row.isEdit ? 'success' : 'primary'" size="small" @click="editCate(row)">
              {{ row.isEdit ? '编辑' : '确定'}}
            </el-button>
            <el-button type="danger" size="small" @click="delCate(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
        background
      ></el-pagination>

      <!-- 模态框 -->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="addCate">
          <el-form-item
            label="分类名称"
            :label-width="formLabelWidth"
            class="cateName"
          >
            <el-input
              v-model="addCate.cateName"
              autocomplete="off"
              placeholder="请输入分类名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否启用" class="btnslide">
            <el-switch
              v-model="addCate.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveCate">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </panel>
</template>

<script>
import panel from '@/components/panel/Index'
import { getCateList, addCate, delCate, updateCate } from '@/api/product.js'
export default {
  components: {
    panel
  },
  data() {
    return {
      // 小滑块
      value: true,
      addCate: {
        cateName: '',
        state: true
      },
      total: 0,
      tableData: [],
      currentPage: 1,
      pageSize: 6,
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
    this.getCate()
  },
  methods: {
    async getCate() {
      if (this.tableData.length === 1 && this.currentPage > 1) {
        this.currentPage--
      }
      const { data, total } = await getCateList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = []
      data.forEach((item) => {
        // 给每项添加编辑属性
        item.isEdit = true
        item.state = Boolean(item.state)
        this.tableData.push(item)
      })
      this.total = total
    },
    openBox() {
      this.dialogFormVisible = true
    },
    /* 添加 */
    async saveCate() {
      await addCate(this.addCate)
      this.dialogFormVisible = false
      this.getCate()
      this.addCate.cateName = ''
    },
    /* 编辑 */
    async editCate(row) {
      const i = this.tableData.find((item) => item.id === row.id)
      if (i.isEdit) {
        i.isEdit = false
      } else {
        await updateCate(row)
        i.isEdit = true
      }
    },
    /* 删除 */
    async delCate(id) {
      await delCate({ id })
      this.getCate()
    },
    // 分页左右
    handleSizeChange(val) {
      this.pageSize = val
      this.getCate()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCate()
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cateName {
  margin-left: -40px;
}
.btnslide {
  margin-left: 10px;
}
</style>
