<template>
  <!-- 消息通知  -->
  <div class="m-content">
    <div class="m-wrap">
      <div class="search_box">
        <el-input v-model="search" size="small" placeholder="输入姓名或寝室号" class="search_input" />
        <el-button type="primary" size="small" plain @click="dialogFormVisible = true">群发</el-button>
      </div>
      <div class="table_box">
        <el-table
          :data="tableList.filter(data => !search || data.name.includes(search) || data.bedroomNum.includes(search)) "
          style="width: 100%"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column label="ID" prop="id" align="center" sortable></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="寝室号" prop="bedroomNum" align="center"></el-table-column>
          <el-table-column label="合同日期" prop="date" align="center" sortable></el-table-column>
          <el-table-column label="是否申请退桌" prop="deskBack" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.deskBack === '是' ? 'primary' : 'danger'"
                disable-transitions
              >{{scope.row.deskBack}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="优惠券数量" prop="couponNum" align="center"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
              >发送短信</el-button>
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
      ></el-pagination>
    </div>
    <!-- 弹出层位置 -->
    <el-dialog title="新增商家" :visible.sync="dialogFormVisible" center width="500px">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StudentManage",
  data() {
    return {
      // 表格数据
      tableData: [
        {
          id: "001",
          name: "张三",
          bedroomNum: "8532",
          date: "2019-08-26",
          deskBack: "是",
          couponNum: "20"
        },
        {
          id: "002",
          name: "李四",
          bedroomNum: "8532",
          date: "2019-08-26",
          deskBack: "否",
          couponNum: "20"
        }
      ],
      // 表格搜索数据
      search: "",
      // 分页当前页数
      currentPage: 1,
      // 每页显示条目个数
      pagesize: 10,
      // 弹出层显示与隐藏
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // 弹出层form表单的数据
      form: {
        shopName: "",
        address: "",
        contact: "",
        date: "",
        phone: "",
        username: "",
        password: ""
      }
    };
  },
  computed: {
    tableList() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //  分页每页条目改变时会触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页改变时会触发
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    // 表格选中
    handleSelectionChange(val) {
      console.log(val);

      // this.multipleSelection = val;
    }
  }
};
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
