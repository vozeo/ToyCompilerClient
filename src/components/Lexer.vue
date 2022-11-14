<script setup lang="ts">
import {ref} from 'vue';

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

let webSocket = new WebSocket(
    'ws://127.0.0.1:40800/compile'
)
webSocket.onmessage = function (e) {
  result.value = e.data;
}

function execute() {
  webSocket.send(textarea.value);
}

</script>

<template>
  <h2>Lexer</h2>
  <div id="wrap">
    <el-input
        v-model="textarea"
        :rows="23"
        type="textarea"
        placeholder="请输入代码或点击右边按钮读取代码文件   （不支持包含中文字符的代码文件）"
    />

    <div id="buttons">
      <input ref="files" @change="readFile($event)" type="file">

      <el-button type="success" @click="execute">开始语法分析</el-button>
    </div>

    <el-input
        v-model="result"
        :rows="23"
        type="textarea"
        readonly="readonly"
    />
  </div>
</template>

<style scoped>

#wrap {
  display: flex;
  justify-content: space-around;
}

#buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 20px;
}
</style>
