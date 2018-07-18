<template>
  <section class="home-page">
    <el-row :gutter="15">
      <!-- 用户信息 -->
      <el-col :md="8" :sm="24">
        <el-card class="info-card" :shadow="cardShadow">
          <!-- avator -->
          <el-row slot="header" class="info-card-header">
            <el-col :span="10">
              <img src="/static/images/batman.png" class="info-card-header-avator">
            </el-col>
            <el-col :span="12" class="info-card-header-content">
              <h2>Admin</h2>
              <p>super admin</p>
            </el-col>
          </el-row>

          <!-- 信息 -->
          <el-row :gutter="15" class="info-card-content">
            <el-col :span="10">上次登陆时间：</el-col>
            <el-col :span="12">2018-07-17 10:31:20</el-col>
          </el-row>
          <el-row :gutter="15" class="info-card-content">
            <el-col :span="10">上次登陆IP：</el-col>
            <el-col :span="12">192.168.199.201</el-col>
          </el-row>
          <el-row :gutter="15" class="info-card-content">
            <el-col :span="10">我的权限：</el-col>
            <el-col :span="12">
              <el-button type="text" size="mini">查看</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 访问量之类的 响应式 -->
      <el-col :md="16" :sm="24">
        <el-row :gutter="10">
          <el-col :md="6" :sm="12" v-for="(item, i) in infos"
              :key="i">
            <!-- 卡片 -->
            <info-card
              :shadow="cardShadow"
              :id-name="'info' + i"
              :end-val="item.endVal"
              :icon="item.icon"
              :color="item.color"
              :intro-text="item.introText"
              :cardHeight="90"></info-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import infoCard from './components/infoCard.vue'

export default {
  name: 'home',
  data () {
    return {
      cardShadow: 'always', // 统一控制卡片的shadow显示模式 always / hover / never
      infos: [
        {
          endVal: 168,
          icon: 'icon-ios-eye',
          color: '#409EFF',
          introText: '今日访问量'
        },
        {
          endVal: 18,
          icon: 'icon-md-document',
          color: '#67C23A',
          introText: '文档数量'
        },
        {
          endVal: 1001,
          icon: 'icon-ios-chatboxes',
          color: '#E6A23C',
          introText: '留言数'
        },
        {
          endVal: 2,
          icon: 'icon-md-person',
          color: '#F56C6C',
          introText: '管理员数'
        }
      ]
    }
  },
  components: {
    infoCard
  }
}
</script>

<style lang="scss">
  @import './home.scss';
</style>
