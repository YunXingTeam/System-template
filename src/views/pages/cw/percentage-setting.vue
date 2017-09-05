<template>
  <div>
    <head-bar label="提成设置"></head-bar>
    <el-tabs v-model="sflx" type="card">
      <el-tab-pane label="医疗机构" name="2">
        <head-bar label="机构列表" line="dashed" :size="1" :gutter="1"></head-bar>
        <el-table :data="hosList" style="width: 100%">
          <el-table-column prop="brxm" label="机构"></el-table-column>
          <el-table-column label="机构-平台">
            <template scope="scope">
              <div class="horizontal-bar">
                <div class="item">
                  <span>门诊</span>
                  <input v-model="scope.row.jgptmztcbl" placeholder="比例">%
                </div>
                <div class="item bl ml" style="padding-left: 0.5rem">
                  <span>住院</span>
                  <input v-model="scope.row.jgptzytcbl" placeholder="比例">%
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="平台">
            <template scope="scope">
              <div class="horizontal-bar">
                <div class="item">
                  <span>门诊</span>
                  <span :class="{'warn':scope.row.jgptmztcbl-scope.row.ptcymztcbl<0}">
                    {{scope.row.jgptmztcbl - scope.row.ptcymztcbl}}%
                  </span>
                </div>
                <div class="item bl ml" style="padding-left: 0.5rem">
                  <span>住院</span>
                  <span :class="{'warn':scope.row.jgptzytcbl-scope.row.ptcyzytcbl<0}">
                    {{scope.row.jgptzytcbl - scope.row.ptcyzytcbl}}%
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="平台-医生(用于医生提成上限)">
            <template scope="scope">
              <div class="horizontal-bar">
                <div class="item">
                  <span>门诊</span>
                  <input v-model="scope.row.ptcymztcbl" placeholder="比例">%
                </div>
                <div class="item bl ml" style="padding-left: 0.5rem">
                  <span>住院</span>
                  <input v-model="scope.row.ptcyzytcbl" placeholder="比例">%
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="结算方式" width="120">
            <template scope="scope">
              <el-select v-model="scope.row.jsfs" placeholder="请选择">
                <el-option label="总收" :value="1"></el-option>
                <el-option label="利润" :value="2"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template scope="scope">
              <el-button type="text" size="small" @click.native="submit(scope.row)">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="医生" name="1">
        <head-bar label="医生列表" line="dashed" :size="1" :gutter="1"></head-bar>
        <el-table :data="docList" style="width: 100%">
          <el-table-column label="医生">
            <template scope="scope"></template>
          </el-table-column>
          <el-table-column label="手机号码">
            <template scope="scope"></template>
          </el-table-column>
          <el-table-column label="注册时间">
            <template scope="scope"></template>
          </el-table-column>
          <el-table-column label="状态">
            <template scope="scope"></template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template scope="scope">
              <el-button type="text" size="small">设置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import {HeadBar} from '../../components'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    components: {
      HeadBar,
    },
    data () {
      return {
        sflx: '2',
        hosList: [],
        docList: []
      }
    },
    mounted(){
      let ctx = this;
      ctx.getPercentageList({
        sflx: ctx.sflx, callback: lst => {
          switch (ctx.sflx) {
            case '1':
              ctx.docList = lst;
              break;
            case '2':
              ctx.hosList = lst;
              break;
          }
        }
      })
    },
    methods: {
      ...mapActions(['getPercentageList', 'percentageSubmit']),
      submit(item){
        let ctx = this;
        switch (ctx.sflx) {
          case '1':
            let mztcbl = item.ysmztcbl / 100.0,
              zytcbl = item.yszytcbl / 100.0;
            if (Number(mztcbl) > Number(item.cymzzdtcbl) || Number(zytcbl) > Number(item.cyzyzdtcbl)) {
              Utils.warningToast(ctx, null, '医生的提成比例不能超过上限');
              return;
            }
            if (Number(mztcbl) < 0 || Number(zytcbl) < 0) {
              Utils.warningToast(ctx, null, '医生的提成比例不能小于0');
              return;
            }
            break;
          case '2':
            if (Number(item.ptcymztcbl) > Number(item.jgptmztcbl) || Number(item.ptcyzytcbl) > Number(item.jgptzytcbl)) {
              Utils.warningToast(ctx, null, '平台—医生设置的提成比例不能大于机构—平台的比例');
              return;
            }
            if (Number(item.ptcymztcbl) < 0 || Number(item.ptcyzytcbl) < 0) {
              Utils.warningToast(ctx, null, '平台—医生的提成比例不能小于0');
              return;
            }
            break;
        }
        ctx.percentageSubmit({item: item, sflx: ctx.sflx})
      }
    },
    computed: {}
  }
</script>
