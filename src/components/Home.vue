<script setup lang="ts">
defineProps<{ msg: string }>()

</script>

<template>
  <h1>Home</h1>
  <el-row class="tac">
    <el-col :span="5">
      <h2 class="mb-2">Menu</h2>
      <el-menu
      router

      :default-active="$route.path"
        class="el-menu-vertical-demo"
      >
      <el-menu-item index="/">
          <el-icon><icon-menu /></el-icon>
          <span>Home</span>
        </el-menu-item>
        <el-menu-item index="/lexer">
          <el-icon><icon-menu /></el-icon>
          <span>Lexer</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    </el-row>
    <h3>ToyCompile编译器--点击左侧菜单Lexer开始使用</h3>
  <div id="wrap">
    
    <div id="myChart" :style="{width: '1000px', height: '1000px'}"></div>
  </div>
  
</template>

<style scoped>

#inputs {
  width: 300px;
}

#wrap {
  display: flex;
}

#buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 20px;
  width: 150px;
}
.read-the-docs {
  color: #888;
}
</style>
