<template>
  <!-- 学生管理  -->
  <div class="m-content">
    <div class="m-wrap">
      <div class="search_box">
        <el-input v-model="search" size="small" placeholder="输入姓名或寝室号" class="search_input" />
        <el-button type="primary" size="small" plain @click="dialogFormVisible = true">添加</el-button>
      </div>
      <div class="table_box">
        <el-table
          :data="tableList.filter(data => !search || data.name.includes(search) || data.bedroomNum.includes(search)) "
          style="width: 100%"
          height="100%"
        >
          <el-table-column label="ID" prop="id" align="center" sortable></el-table-column>
          <el-table-column label="优惠券名称" prop="couponName" align="center"></el-table-column>
          <el-table-column label="描述" prop="tips" align="center"></el-table-column>
          <el-table-column label="面额" prop="money" align="center"></el-table-column>
          <el-table-column label="开始日期" prop="startDate" align="center" sortable></el-table-column>
          <el-table-column label="结束日期" prop="endDate" align="center" sortable></el-table-column>
          <el-table-column label="标签" prop="tag" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '是' ? 'primary' : 'danger'"
                disable-transitions
              >{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="所属商家" prop="shopName" align="center"></el-table-column>
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
      ></el-pagination>
    </div>
    <!-- 弹出层位置 -->
    <el-dialog title="新增商家" :visible.sync="dialogFormVisible" center width="500px">
      <el-form :model="form">
        <el-form-item label="优惠券名称" :label-width="formLabelWidth">
          <el-input v-model="form.couponName"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.tips"></el-input>
        </el-form-item>
        <el-form-item label="面额" :label-width="formLabelWidth">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.endDate" type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-input v-model="form.tag"></el-input>
        </el-form-item>
        <el-form-item label="所属商家" :label-width="formLabelWidth">
          <el-input v-model="form.shopName"></el-input>
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
          couponName: "优惠券",
          tips: "这里是描述",
          money: "100",
          startDate: "2016-05-02",
          endDate: "2018-08-20",
          tag: "是",
          shopName: "啦啦啦"
        }
      ],
      // 表格搜索数据
      search: "",
      // 分页当前页数
      currentPage: 1,
      // 每页显示条目个数
      pagesize: 10,
      // -----------------弹出层-----------------
      // 弹出层显示与隐藏
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // 弹出层form表单的数据
      form: {
        couponName: "",
        tips: "",
        money: "",
        startDate: "",
        endDate: "",
        tag: "",
        shopName: ""
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
  mounted() {
    this.getCouponInfo();
  },
  methods: {
    // 获取所有优惠券
    getCouponInfo() {
      this.$http
        .get("/coupon/couponList", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          // if (res.data.code === 0) {
          //   if (res.data.data.list.length !== 0) {
          //     this.pageTotal = res.data.data.list.length;
          //     let arr = [];
          //     for (const item of res.data.data.list) {
          //       arr.push({
          //         id: item.id,
          //         name: item.userName,
          //         bedroomNum: item.houseId,
          //         date: item.pactTime.split("T")[0] || "",
          //         applyDate: item.submitDate.split("T")[0] || "",
          //         applyType: item.way === 1 ? "支付宝" : "优惠券",
          //         status:
          //           item.state == 2
          //             ? "未审批"
          //             : item.state == 3
          //             ? "已通过"
          //             : "未通过"
          //       });
          //     }
          //     this.tableData = arr;
          //   }
          // } else {
          //   this.$message.error("网络错误，请稍后再试哦");
          // }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("网络错误，请稍后再试哦");
        });
    },
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
