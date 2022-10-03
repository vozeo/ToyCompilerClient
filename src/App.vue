<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
            mode="horizontal"
            router
        >
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/lexer">Lexer</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>