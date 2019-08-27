<template>
  <!-- 学生管理  -->
  <div class="m-content">
    <div class="m-wrap">
      <div class="search_box">
        <el-input v-model="search" size="small" placeholder="输入姓名或寝室号" class="search_input" />
        <el-button type="primary" size="small" plain @click="addBusinessForm = true">添加</el-button>
      </div>
      <div class="table_box">
        <el-table
          :data="tableList.filter(data => !search || data.name.includes(search) || data.bedroomNum.includes(search)) "
          style="width: 100%"
          height="100%"
        >
          <el-table-column label="ID" prop="id" align="center" sortable></el-table-column>
          <el-table-column label="商家名称" prop="name" align="center"></el-table-column>
          <el-table-column label="地址" prop="site" align="center"></el-table-column>
          <el-table-column label="联系人" prop="contact" align="center"></el-table-column>
          <el-table-column label="联系电话" prop="number" align="center"></el-table-column>
          <el-table-column label="创建日期" prop="createTime" align="center" sortable></el-table-column>
          <el-table-column label="登录账户" prop="account" align="center"></el-table-column>
          <el-table-column label="登录密码" prop="password" align="center"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="m_footer_page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[30, 60, 90, 120]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      ></el-pagination>
    </div>
    <!-- 弹出层位置 -->
    <el-dialog title="新增商家" :visible.sync="addBusinessForm" center width="500px">
      <el-form :model="form">
        <el-form-item label="商家名称" :label-width="formLabelWidth">
          <el-input v-model="form.shopName"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="登录账户" :label-width="formLabelWidth">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBusinessForm = false">取 消</el-button>
        <el-button type="primary" @click="onAddMerchant(form)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑优惠券 -->
    <el-dialog title="编辑" :visible.sync="editForm" center width="500px">
      <el-form :model="formCoupon">
        <el-form-item label="商家名称" :label-width="formLabelWidth">
          <el-input v-model="formCoupon.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="formCoupon.site" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="formCoupon.contact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系号码" :label-width="formLabelWidth">
          <el-input v-model="formCoupon.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户" :label-width="formLabelWidth">
          <el-input v-model="formCoupon.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formCoupon.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editForm = false">取 消</el-button>
        <el-button type="primary" @click="onEditBusiness(formCoupon)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'StudentManage',
  data () {
    return {
      // 表格数据
      tableData: [
        // {
        //   id: "001",
        //   shopName: "商家名称",
        //   address: "九龙坡",
        //   contact: "联系人",
        //   phone: "联系电话",
        //   createDate: "2019-08-20",
        //   username: "用户名",
        //   password: "888888"
        // }
      ],
      rowOne: {},
      // 表格搜索数据
      search: '',
      // 分页当前页数
      currentPage: 1,
      // 每页显示条目个数
      pagesize: 30,
      // 分页所有总数
      pageTotal: 10,
      // 弹出层显示与隐藏
      addBusinessForm: false,
      editForm: false,
      formLabelWidth: '120px',
      // 弹出层form表单的数据
      form: {
        shopName: '',
        address: '',
        contact: '',
        date: '',
        phone: '',
        username: '',
        password: ''
      },
      formCoupon: {}
    }
  },
  computed: {
    tableList () {
      return this.tableData
    }
  },
  mounted () {
    this.onGetInfo()
  },
  methods: {
    // 获取商家信息
    onGetInfo (num = 1) {
      this.$http
        .get('/merchant', {
          params: {
            pageNum: num
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 0) {
            if (res.data.data.list.length !== 0) {
              this.pageTotal = res.data.data.list.length
              let arr = []
              for (const item of res.data.data.list) {
                item.createTime = item.createTime
                  ? item.createTime.split('T')[0]
                  : ''
                arr.push(item)
              }
              this.tableData = arr
            }
          } else {
            this.$message.error('网络错误，请稍后再试哦')
          }
        })
        .catch(error => {
          console.log(error)
          this.$message.error('网络错误，请稍后再试哦')
        })
    },
    // 增加商家
    onAddMerchant (data) {
      console.log(data)
      let postData = {
        name: data.shopName,
        site: data.address,
        contact: data.contact,
        number: data.phone,
        account: data.username,
        password: data.password
      }
      this.$http
        .post('/merchant', postData, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.onGetInfo()
            this.addBusinessForm = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(error => {
          console.log(error)
          this.$message.error('网络错误，请稍后再试哦')
        })
    },
    // 编辑
    handleEdit (index, row) {
      this.formCoupon = Object.assign({}, row)
      this.editForm = true
    },
    // 确定修改
    onEditBusiness (data) {
      let oData = Object.assign({}, data)
      delete oData.createTime
      console.log(oData)
      console.log(data)
      this.$http
        .put(`/merchant`, oData, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.onGetInfo()
            this.editForm = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(error => {
          console.log(error)
          this.$message.error('网络错误，请稍后再试哦')
        })
    },
    // 删除
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该商家, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.onDeleteBusiness(row.id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除商家
    onDeleteBusiness (id) {
      this.$http
        .delete(`/merchant`, {
          params: {
            id: id
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.onGetInfo()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(error => {
          console.log(error)
          this.$message.error('网络错误，请稍后再试哦')
        })
    },
    //  分页每页条目改变时会触发
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    // 当前页改变时会触发
    handleCurrentChange (val) {
      this.currentPage = val
      this.onGetInfo(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .el-input {
//   width: 200px;
// }
.dialog-footer {
  display: flex;
  justify-content: space-around;
}
</style>
