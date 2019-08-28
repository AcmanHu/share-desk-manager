<template>
  <!-- 学生管理  -->
  <div class="m-content">
    <div class="m-wrap">
      <div class="search_box">
        <el-input v-model="search" size="small" placeholder="输入姓名或寝室号" class="search_input" />
        <el-button type="primary" size="small" plain @click="addCoupon">添加</el-button>
      </div>
      <div class="table_box">
        <el-table
          :data="tableList.filter(data => !search || data.name.includes(search) || data.bedroomNum.includes(search)) "
          style="width: 100%"
          height="100%"
        >
          <el-table-column label="ID" prop="id" align="center" sortable></el-table-column>
          <el-table-column label="优惠券名称" prop="name" align="center"></el-table-column>
          <el-table-column label="描述" prop="describe" align="center"></el-table-column>
          <el-table-column label="面额" prop="denomination" align="center"></el-table-column>
          <el-table-column label="开始日期" prop="startTime" align="center" sortable></el-table-column>
          <el-table-column label="结束日期" prop="endTime" align="center" sortable></el-table-column>
          <el-table-column label="所属商家" prop="merchantId" align="center"></el-table-column>
          <el-table-column label="总量" prop="quantity" align="center"></el-table-column>
          <el-table-column label="剩余数量" prop="count" align="center"></el-table-column>
          <el-table-column label="标签" prop="enable" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.enable === '1' ? 'primary' : 'danger'"
                disable-transitions
              >{{scope.row.enable === '1' ? '启用' : '禁用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <!-- <el-button size="mini" type="success" plain>开始使用</el-button>
              <el-button size="mini" type="danger" plain>暂停使用</el-button>-->
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
        :total="pageTotal"
      ></el-pagination>
    </div>
    <!-- 新增优惠券 -->
    <el-dialog title="新增优惠券" :visible.sync="addCouponForm" center width="500px">
      <el-form :model="form">
        <el-form-item label="优惠券名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="面额" :label-width="formLabelWidth">
          <el-input v-model="form.denomination"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.quantity"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="满减条件" :label-width="formLabelWidth">
          <el-input v-model="form.condition" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家" :label-width="formLabelWidth">
          <el-select v-model="form.merchantId" placeholder="选择商家" style="width: 100%;">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, key) in selectList"
              :key="key"
            ></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="标签" :label-width="formLabelWidth">
          <el-input v-model="form.tag"></el-input>
        </el-form-item>-->
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="form.enable" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCouponForm = false">取 消</el-button>
        <el-button type="primary" @click="onAddCoupon(form)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑优惠券 -->
    <el-dialog title="编辑" :visible.sync="editForm" center width="500px">
      <el-form :model="formCoupon">
        <el-form-item label="优惠券名称" :label-width="formLabelWidth">
          <el-input v-model="formCoupon.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="formCoupon.describe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="面额" :label-width="formLabelWidth">
          <el-input v-model="formCoupon.denomination" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="满减条件" :label-width="formLabelWidth">
          <el-input v-model="formCoupon.condition" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="formCoupon.startTime"
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="formCoupon.endTime"
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="商家" :label-width="formLabelWidth">
          <el-input v-model="formCoupon.merchant" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="formCoupon.enable" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editForm = false">取 消</el-button>
        <el-button type="primary" @click="onEditCoupon(formCoupon)">确 定</el-button>
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
        // {
        //   id: "001",
        //   couponName: "优惠券",
        //   tips: "这里是描述",
        //   money: "100",
        //   startDate: "2016-05-02",
        //   endDate: "2018-08-20",
        //   tag: "是",
        //   quantity: 0,
        //   count: 0,
        //   shopName: "啦啦啦"
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
      // -----------------弹出层-----------------
      // 弹出层显示与隐藏
      addCouponForm: false,
      editForm: false,
      formLabelWidth: "120px",
      // 弹出层form表单的数据
      form: {
        name: "",
        describe: "",
        denomination: "",
        quantity: "",
        condition: "",
        count: "",
        quantity: "",
        startTime: "",
        endTime: "",
        merchantId: "",
        enable: ""
      },
      // 所有商家list
      selectList: [],
      // 编辑页面form表单数据
      formCoupon: {
        id: "",
        name: "",
        describe: "",
        denomination: "",
        condition: "",
        count: "",
        quantity: "",
        startTime: "",
        endTime: "",
        merchant: "",
        enable: ""
      }
    };
  },
  computed: {
    tableList() {
      return this.tableData;
    }
  },
  mounted() {
    this.getCouponInfo();
  },
  methods: {
    // 获取所有优惠券
    getCouponInfo(num = 1) {
      this.$http
        .get("/coupon/all", {
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
                arr.push(item);
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
    // 增加优惠券
    onAddCoupon(data) {
      console.log(data);
      data.count = data.quantity;
      this.$http
        .post("/coupon", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.getCouponInfo();
            this.addCouponForm = false;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("网络错误，请稍后再试哦");
        });
    },
    // 获取商家信息
    onGetInfo(num = 1) {
      this.$http
        .get("/merchant", {
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
              this.pageTotal = res.data.data.list.length;
              let arr = [];
              for (const item of res.data.data.list) {
                arr.push({ id: item.id, name: item.name });
              }
              this.selectList = arr;
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
    // 新增优惠卷事件
    addCoupon() {
      this.onGetInfo();
      this.addCouponForm = true;
    },
    // 修改
    handleEdit(index, row) {
      this.formCoupon = Object.assign({}, row);
      this.editForm = true;
    },
    // 确定修改
    onEditCoupon(data) {
      let oData = Object.assign({}, data);
      delete oData.code;
      console.log(data);
      console.log(oData);
      this.$http
        .put(`/coupon`, oData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.getCouponInfo();
            this.editForm = false;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("网络错误，请稍后再试哦");
        });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该优惠券, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.onDeleteCoupon(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除优惠券
    onDeleteCoupon(id) {
      this.$http
        .delete(`/coupon`, {
          params: {
            id: id
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getCouponInfo();
          } else {
            this.$message.error(res.data.msg);
          }
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
      this.getCouponInfo(val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
