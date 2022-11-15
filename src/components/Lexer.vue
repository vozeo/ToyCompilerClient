<script setup lang="ts">
import {onMounted, ref, inject} from 'vue';
import * as echarts from 'echarts'

const textarea = ref('')
const result = ref('')

const file = ref<File | null>();

function readFile(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    file.value = target.files[0];
  }
  if (!file.value) {
    return;
  }
  const reader = new FileReader();
  reader.readAsText(file.value);
  reader.onload = () => {
    let readResult = reader.result;
    if (!readResult) {
      readResult = "Empty File!";
    }
    textarea.value = readResult.toString();
  };
}

let myChart: any
onMounted(() => {
  myChart = echarts.init(document.getElementById('myChart')!!)
})

let webSocket = new WebSocket(
    'ws://127.0.0.1:40800/compile'
)
const axios: any = inject('axios')
webSocket.onmessage = function (e) {
  result.value = e.data;
  let parserData = JSON.parse(e.data).parser;
  myChart.setOption({
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'tree',
        data: [parserData],
        left: '2%',
        right: '2%',
        top: '8%',
        bottom: '20%',
        symbol: 'emptyCircle',
        orient: 'vertical',
        initialTreeDepth: -1,
        expandAndCollapse: true,
        label: {
          position: 'top',
          fontSize: 9
        },
        leaves: {
          label: {
            position: 'bottom',
            align: 'left'
          }
        },
        animationDurationUpdate: 750
      }
    ]
  })
  axios.get('/file', {responseType: 'blob'})
      .then((res: { data: any; }) => {
        let data = res.data
        let url = window.URL.createObjectURL(new Blob([data]))
        let a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.setAttribute('download', 'parser.pdf')
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(a.href)
        document.body.removeChild(a)
      })
}

function execute() {
  webSocket.send(textarea.value);
}

</script>

<template>
  <h1>Lexer</h1>

  <div id="wrap">
    <el-row class="tac">
      <el-col :span="25">
        <h2 class="mb-2">Menu</h2>
        <el-menu
            router
            :default-active="$route.path"
        >
          <el-menu-item index="/">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>Home</span>
          </el-menu-item>
          <el-menu-item index="/lexer">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>Lexer</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-input
        id="inputs"
        v-model="textarea"
        :rows="23"
        type="textarea"
        placeholder="请输入代码或点击右边按钮读取代码文件   （不支持包含中文字符的代码文件）"
    />

    <div id="buttons">
      <input ref="files" @change="readFile($event)" type="file">
      <el-button type="success" @click="execute">开始语法分析</el-button>
    </div>

    <!--    <el-input-->
    <!--        v-model="result"-->
    <!--        :rows="23"-->
    <!--        type="textarea"-->
    <!--        readonly="readonly"-->
    <!--    />-->

    <div id="myChart" :style="{width: '1000px', height: '1000px'}"></div>
  </div>
</template>

<style scoped>

#inputs {
  width: 300px;
}

#wrap {
  display: flex;
  margin-right: 200px;
}

#buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 20px;
  width: 150px;
}
</style>