<template>
  <!-- 消息通知  -->
  <div class="m-content">
    <div class="m-wrap">
      <div class="search_box">
        <el-input v-model="search" size="small" placeholder="输入姓名或寝室号" class="search_input" />
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
          <el-table-column label="学号" prop="studentNumber" align="center"></el-table-column>
          <el-table-column label="电话" prop="phone" align="center" sortable></el-table-column>
          <el-table-column label="寝室号" prop="houseId" align="center"></el-table-column>
          <el-table-column label="类型" prop="type" align="center"></el-table-column>
          <el-table-column label="下单时间" prop="orderTime" align="center"></el-table-column>
          <el-table-column label="推销员id" prop="referrerId" align="center"></el-table-column>
          <el-table-column label="配送员id" prop="deliverymanId" align="center"></el-table-column>
          <el-table-column label="是否配送" prop="deskBack" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === null || scope.row.status == 0 ? 'danger' : 'primary'"
                disable-transitions
              >{{scope.row.status === null || scope.row.status == 0 ? '否':'是'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
              >立即配送</el-button>
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
  </div>
</template>

<script>
export default {
  name: "StudentManage",
  data() {
    return {
      // 表格数据
      numberPhone: [],
      tableData: [
        // {
        //   id: "001",
        //   name: "张三",
        //   bedroomNum: "8532",
        //   date: "2019-08-26",
        //   deskBack: "是",
        //   couponNum: "20"
        // },
        // {
        //   id: "002",
        //   name: "李四",
        //   bedroomNum: "8532",
        //   date: "2019-08-26",
        //   deskBack: "否",
        //   couponNum: "20"
        // }
      ],
      // 表格搜索数据
      search: "",
      // 分页当前页数
      currentPage: 1,
      // 每页显示条目个数
      pagesize: 30,
      // 分页总数
      pageTotal: 10,
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
      return this.tableData;
    }
  },
  mounted() {
    this.onGetUserInfo(1);
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      if(row.status === 1){
        return
      }
      this.$prompt("请输入配送员ID", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.sendOrder(row.id,value)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
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
      this.onGetUserInfo(val);
      console.log(`当前页: ${val}`);
    },
    // 表格选中
    handleSelectionChange(val) {
      console.log(val);
      for (let index = 0; index < val.length; index++) {
        this.numberPhone[index] = val[index].phone;
      }
    },
    // 获取学生信息
    onGetUserInfo(num) {
      this.$http
        .get("/common/orders/all", {
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
                  deliverymanId:item.deliverymanId,
                  houseId:item.houseId,
                  id: item.id,
                  name: item.name,
                  phone: item.number,
                  referrerId:item.referrerId,
                  orderTime: item.orderTime,
                  status:item.status,
                  studentNumber:item.studentNumber,
                  ticketNum: 10,
                  type:item.type
                });
              }
              console.log("XXXXXXX");

              this.tableData = arr;
              console.log(this.tableData);
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
    sendOrder(orderId, deliverymanId) {
      this.$http
        .put(
          "/common/orders/distribution",
          {
            orderId: orderId,
            deliverymanId: deliverymanId
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log(res);
          this.$message({
            type: "info",
            message: "提交成功"
          });
          this.onGetUserInfo(1);
          if (res) {
          } else {
            this.$message.error("网络错误，请稍后再试哦");
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("网络错误，请稍后再试哦");
        });
    },
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
