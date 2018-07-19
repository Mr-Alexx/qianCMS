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
              <el-button
                type="text" size="mini"
                @click="mypurview = true">查看</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 计数和快捷操作 -->
      <el-col :md="16" :sm="24">
        <!-- 计数 -->
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
              :cardHeight="80"></info-card>
          </el-col>
        </el-row>
        <!-- 快捷操作 -->
        <el-card class="quick-operation">
          <header slot="header" class="quick-operation-header">快捷操作</header>
          <div class="quick-operation-body">
            <el-button plain round type="primary" size="mini">
              <i class="iconfont icon-new"></i>
              新增管理员
            </el-button>
            <el-button plain round type="success" size="mini">
              <i class="iconfont icon-add-document"></i>
              添加文档
            </el-button>
            <el-button plain round type="warning" size="mini">
              <i class="iconfont icon-ios-settings"></i>
              系统配置
            </el-button>
            <el-button plain round type="danger" size="mini">
              <i class="iconfont icon-ios-apps"></i>
              数据备份
            </el-button>
          </div>
        </el-card>
      </el-col>

      <!-- 权限的dialog -->
      <el-dialog
        title="我的权限"
        :visible.sync="mypurview"
        center>
        这是权限dialog
      </el-dialog>
    </el-row>

    <!-- 访问量和错误监测图表 -->
    <el-row :gutter="15" class="separate-box">
      <el-col :md="12" :xs="24">
        <view-chart :renderData="[10, 20, 30, 40, 30, 20, 10]"></view-chart>
      </el-col>
      <el-col :md="12" :xs="24"></el-col>
    </el-row>
  </section>
</template>

<script>
import infoCard from './components/infoCard.vue'
import viewChart from './components/charts/viewChart.vue'

export default {
  name: 'home',
  data () {
    return {
      cardShadow: 'always', // 统一控制卡片的shadow显示模式 always / hover / never
      mypurview: false,
      infos: [
        {
          endVal: 168,
          icon: 'icon-ios-eye',
          color: '#409EFF',
          introText: '今日访问量'
        },
        {
          endVal: 18,
          icon: 'icon-document',
          color: '#67C23A',
          introText: '文档数量'
        },
        {
          endVal: 1001,
          icon: 'icon-comment',
          color: '#E6A23C',
          introText: '留言数'
        },
        {
          endVal: 2,
          icon: 'icon-fashion-manager',
          color: '#F56C6C',
          introText: '管理员数'
        }
      ]
    }
  },
  components: {
    infoCard,
    viewChart
  }
}
</script>

<style lang="scss">
  @import './home.scss';
</style>
