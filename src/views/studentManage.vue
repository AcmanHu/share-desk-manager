<template>
  <!-- 学生管理  -->
  <div class="m-content">
    <div class="m-wrap">
      <div class="search_box">
        <el-input v-model="search" size="small" placeholder="输入姓名或寝室号" class="search_input" />
        <el-button type="primary" size="small" plain>添加</el-button>
      </div>
      <div class="table_box">
        <el-table
          :data="tableList.filter(data => !search || data.name.includes(search) || data.bedroomNum.includes(search)) "
          style="width: 100%"
          height="100%"
        >
          <el-table-column label="ID" prop="id" align="center" sortable></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="电话" prop="phone" align="center" sortable></el-table-column>
          <el-table-column label="寝室号" prop="bedroomNum" align="center"></el-table-column>
          <el-table-column label="合同日期" prop="date" align="center" sortable></el-table-column>
          <!-- <el-table-column label="是否申请退桌" prop="deskBack" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.deskBack === '是' ? 'primary' : 'danger'"
                disable-transitions
              >{{scope.row.deskBack}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="优惠券数量" prop="ticketNum" align="center"></el-table-column>-->
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
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" center width="500px">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="寝室号" :label-width="formLabelWidth">
          <el-input v-model="form.houseId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="合同时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.pactTime"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onEditUser(form)">确 定</el-button>
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
          name: "刘小虎",
          bedroomNum: "8532",
          date: "2016-05-02",
          deskBack: "是",
          phone: "123",
          ticketNum: 10,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "002",
          name: "刘小虎",
          bedroomNum: "8532",
          date: "2016-05-20",
          deskBack: "否",
          phone: "123",
          ticketNum: 10,
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      // 表格搜索数据
      search: "",
      // 分页当前页数
      currentPage: 1,
      // 每页显示条目个数
      pagesize: 30,
      // 分页总数
      pageTotal: 10,
      // 新增表单
      dialogFormVisible: false,
      form: {
        id: "",
        userName: "",
        houseId: "",
        phone: "",
        pactTime: ""
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    tableList() {
      return this.tableData;
    }
  },
  mounted() {
    this.onGetUserInfo(1);
  },
  methods: {
    // 获取学生信息
    onGetUserInfo(num) {
      this.$http
        .get("/user", {
          params: {
            pageNum: num
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            if (res.data.data.list.length !== 0) {
              this.pageTotal = res.data.data.total;
              let arr = [];
              for (const item of res.data.data.list) {
                arr.push({
                  id: item.id,
                  name: item.userName,
                  phone: item.phone,
                  bedroomNum: item.houseId,
                  date: item.pactTime.split("T")[0] || "",
                  deskBack: "是",
                  ticketNum: 10
                });
              }
              this.tableData = arr;
            }
          } else {
            this.$message.error("网络错误，请稍后再试哦");
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("网络错误，请稍后再试哦");
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.form.id = row.id;
      this.form.userName = row.name;
      this.form.houseId = row.bedroomNum;
      this.form.phone = row.phone;
      this.form.pactTime = row.date;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除学生
    onDeleteStu(id) {
      this.$http
        .delete(`/user/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
          this.$message.error("网络错误，请稍后再试哦");
        });
    },
    //  分页每页条目改变时会触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页改变时会触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.onGetUserInfo(val);
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
