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
          <el-table-column label="优惠券数量" prop="ticketNum" align="center"></el-table-column>
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
  </div>
</template>

<script>
export default {
  name: 'StudentManage',
  data () {
    return {
      // 表格数据
      tableData: [
        {
          id: '001',
          name: '刘小虎',
          bedroomNum: '8532',
          date: '2016-05-02',
          deskBack: '是',
          ticketNum: 10,
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: '002',
          name: '刘小虎',
          bedroomNum: '8532',
          date: '2016-05-20',
          deskBack: '否',
          ticketNum: 10,
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      // 表格搜索数据
      search: '',
      // 分页当前页数
      currentPage: 1,
      // 每页显示条目个数
      pagesize: 10
    }
  },
  computed: {
    tableList () {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      )
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    //  分页每页条目改变时会触发
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    // 当前页改变时会触发
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
