
<template>
  <div class="table">
    <div class="search-bar">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input" class="input" clearable>
      </el-input>
      <el-button type="primary" class="search-btn">搜索</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%" size="small">
      <el-table-column fixed prop="date" label="日期" width="150"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="province" label="省份" width="120"> </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="{ row, $index }">
          <el-button type="text" size="small" @click="handleClick(row, $index)">编辑</el-button>
          <el-button type="text" size="small" @click="handleClick(row, $index)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination class="pagination-wrap" :page-size="10" :total="100" @change="pageChange"></pagination>

    <modal ref="dialog" title="这是一个标题" width="600px">
      <tableForm @submit="submit" @canel="canel"></tableForm>
    </modal>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import tableForm from './components/tableForm.vue'

export default {
  components: {
    tableForm,
  },
  setup() {
    const state = reactive({
      tableData: [],
      dialog: null,
      input: '',
      handleClick(row, index) {
        state.dialog.open()
        console.log(row, index)
      },
      pageChange(e) {
        console.log(e)
      },
      canel() {
        state.dialog.close()
      },
      submit() {
        state.dialog.close()
      },
    })

    onMounted(() => {
      for (let index = 0; index < 10; index++) {
        state.tableData.push({
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333,
        })
      }
    })

    return { ...toRefs(state) }
  },
}
</script>

<style lang="scss" scoped>
.table {
  .search-bar {
    margin-bottom: 20px;

    .input {
      width: 200px;
    }

    .search-btn {
      margin-left: 10px;
    }
  }

  .pagination-wrap {
    margin-top: 20px;
  }
}
</style>
