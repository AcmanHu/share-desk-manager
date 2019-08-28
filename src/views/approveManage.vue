<template>
  <!-- 审批管理  -->
  <div class="m-content">
    <div class="m-wrap">
      <div class="search_box">
        <el-input v-model="search" size="small" placeholder="输入姓名或寝室号" class="search_input" />
        <!-- <el-button type="primary" size="small" plain>添加</el-button> -->
      </div>
      <div class="table_box">
        <el-table
          :data="tableList.filter(data => !search || data.name.includes(search) || data.bedroomNum.includes(search)) "
          style="width: 100%"
          height="100%"
        >
          <el-table-column label="ID" prop="id" align="center" sortable></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="寝室号" prop="bedroomNum" align="center"></el-table-column>
          <el-table-column label="合同日期" prop="date" align="center" sortable></el-table-column>
          <el-table-column label="申请日期" prop="applyDate" align="center" sortable></el-table-column>
          <el-table-column label="申请类型" prop="applyType" align="center"></el-table-column>
          <el-table-column
            label="当前状态"
            prop="status"
            align="center"
            :filters="tableFilterData"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '支付宝' ? 'primary' : 'danger'"
                disable-transitions
              >{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button>
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
    <!-- 弹出层 -->
    <el-drawer
      title="审批"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <div class="demo-drawer__wrap">
          <p>姓名：{{oneTabData.name}}</p>
          <p>电话：{{oneDetailData.number}}</p>
          <p>寝室号：{{oneTabData.bedroomNum}}</p>
          <p>申请日期：{{oneDetailData.submitDate}}</p>
          <p>退款类型：{{oneDetailData.way==1?"支付宝":"优惠券"}}</p>
          <p>{{oneDetailData.way == 1?"支付宝账户":"优惠卷码"}}: {{oneDetailData.accountId}}</p>
          <div style="border-top:1px solid #ccc;margin-top: 5px;">
            <p>学生证照片</p>
            <img :src="$imgUrl+ oneDetailData.studentUrl" style="width: 200px;" alt />
          </div>
          <div>
            <p>合同照片</p>
            <img :src="$imgUrl+ oneDetailData.protocolUrl" style="width: 200px;" alt />
          </div>
          <div>
            <p>书桌照片</p>
            <img :src="$imgUrl+ oneDetailData.desk1Url" style="width: 200px;" alt />
            <img :src="$imgUrl+ oneDetailData.desk2Url" style="width: 200px;" alt />
          </div>
        </div>
        <div class="demo-drawer__footer">
          <el-button @click="isPass('agree')" type="primary" plain>同意</el-button>
          <el-button type="danger" plain @click="onDisagree">不同意</el-button>
          <!-- <el-input placeholder="请输入内容"></el-input> -->
        </div>
      </div>
    </el-drawer>
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
          applyDate: "2019-08-20",
          applyType: "支付宝",
          status: "未审批"
        }
      ],
      // 一条表格数据
      oneTabData: {},
      // 一条详细数据
      oneDetailData: {},
      // 表格筛选
      tableFilterData: [
        { text: "未审批", value: "未审批" },
        { text: "已审批", value: "已审批" },
        { text: "未通过", value: "未通过" }
      ],
      // 表格搜索数据
      search: "",
      // 分页当前页数
      currentPage: 1,
      // 每页显示条目个数
      pagesize: 30,
      // 分页总数
      pageTotal: 10,
      // 弹出层
      dialog: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  computed: {
    tableList() {
      return this.tableData;
    }
  },
  mounted() {
    this.getApproveInfo();
  },
  methods: {
    // 获取审核数据
    getApproveInfo(num = 1) {
      this.$http
        .get("/audit/getAll", {
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
                  bedroomNum: item.houseId,
                  date: item.pactTime,
                  applyDate: item.submitDate,
                  applyType: item.way === 1 ? "支付宝" : "优惠券",
                  status:
                    item.state == 2
                      ? "未审批"
                      : item.state == 3
                      ? "已通过"
                      : "未通过"
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
    // 获取某一个审核
    onGetOneInfo(id) {
      this.$http
        .get(`/audit/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.oneDetailData = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("网络错误，请稍后再试哦");
        });
    },
    // 表格详情
    handleDetail(index, row) {
      this.oneTabData = row;
      this.dialog = true;
      this.onGetOneInfo(row.id);
    },
    // 表格中状态的筛选
    filterTag(value, row) {
      return row.status === value;
    },
    //  分页每页条目改变时会触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页改变时会触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getApproveInfo(val);
    },
    // 关闭弹出层
    handleClose(done) {
      this.dialog = false;
    },
    // 不同意审核
    onDisagree() {
      let data = {
        id: this.oneTabData.id,
        state: "4",
        cause: ""
      };
      this.$prompt("请输入理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          data.cause = value;
          this.isPass(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 是否通过审核
    isPass(data) {
      let oData = {};
      if (data === "agree") {
        oData.id = this.oneTabData.id;
        oData.state = "3";
      } else {
        oData = data;
      }
      console.log(oData);
      this.$http
        .put("/audit", oData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "审核成功",
              type: "success"
            });
            this.dialog = false;
            this.getApproveInfo();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络错误，请稍后再试哦");
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/deep/ .el-drawer__body {
  height: calc(100% - 45px);
}
.demo-drawer__content {
  height: 100%;
  position: relative;
}
.demo-drawer__wrap {
  padding: 0 20px;
  box-sizing: border-box;
  height: calc(100% - 60px);
  overflow: auto;
  img {
    margin-right: 10px;
  }
}
.demo-drawer__footer {
  position: absolute;
  width: 100%;
  background: #fff;
  bottom: 0;
  height: 40px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 2px 2px 6px #000;
}
</style>
