/**
 *  @param {string} default 默认选中路由
 *  @param {string} title 菜单标题
 *  @param {string,Array} permission 权限
 *  @param {string} icon 图标地址
 *  @param {string} route 路由地址
 *  @param {string} divider 菜单组之间的间隔
 *  @param {string} group 所属菜单组
 *  @param {Array} subMenu 子菜单数组
 *  @param {string,Number} badge 消息数 badge=='dot'(只显示红点)；badge==1'(提示数量1)
 */
export const menu_nav = {
  default: 1,
  data: [
    {title: "数据统计", route: 1, permission: 11},
    {title: "转诊筛查", route: 2, permission: [6, 7, 8, 10]},
    {title: "APP设置", route: 3, permission: [2, 5, 8]},
    {title: "财务", route: 4, permission: 4},
    {title: "人员管理", route: 5, permission: [1, 3]}
  ]
};

export const menu_sjtj = {
  default: "data-situation",
  data: [
    {title: "数据概况", route: "data-situation"},
    "divider",
    {title: "数据对比", route: "data-contrast"},
    "divider",
    {title: "医院转诊金额", route: "ref-amount"},
    {title: "推荐注册", route: "registration"},
    "divider",
    {title: "用户转诊详情", route: "ref-details"},
    {title: "用户积分兑换", route: "exchange"},
    {title: "用户活跃值", route: "active-value"}
  ]
};

export const menu_zzsc = {
  default: "ref-person-details",
  data: [
    {title: "转诊人信息", route: "ref-person-details", permission: 10},
    "divider",
    {title: "转诊单管理", route: "ref-management", permission: 6},
    "divider",
    {title: "筛查发送", route: "screening-sending", permission: 7},
    {title: "我的筛查", route: "screening-mine", permission: 9}
  ]
};

export const menu_app = {
  default: "audit-doctor",
  data: [
    {title: "审核医生", route: "audit-doctor", permission: 2},
    "divider",
    {title: "首页推荐", route: "recommend", permission: 5},
    {title: "标签设置", route: "tags-setting", permission: 8},
  ]
};

export const menu_cw = {
  default: "ref-adjust",
  data: [
    {title: "转诊核算", route: "ref-adjust"},
    "divider",
    {title: "积分拨付", route: "score-appropriation"},
    "divider",
    {title: "提成设置", route: "percentage-setting", permission: 4},
  ]
};

export const menu_rygl = {
  default: "staff-management",
  data: [
    {title: "员工管理", route: "staff-management", permission: 1},
    "divider",
    {title: "筛查组管理", route: "group-management", permission: 1},
    "divider",
    {title: "客服管理", route: "customer-management", permission: 3},
  ]
};

export default [menu_nav, menu_sjtj, menu_zzsc, menu_app, menu_cw, menu_rygl];
