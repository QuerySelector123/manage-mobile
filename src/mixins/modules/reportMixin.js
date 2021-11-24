/**
 * @name: 报告共享混入
 * @author: xulujin
 * @msg:
 * @param {*}
 * @return {*}
 * @Date: 2021-05-19 15:27:09
 */

import {
  getCategoryByLazyLoad,
  selectSectorArea,
  insertReportShare,
  findReportShare,
  selectByReportId,
  deleteReportShare,
  updateReportShare,
  authorize,
} from '@/api/reportToShare.js';
import datetime from '@/utils/date';
import { de } from 'date-fns/locale';
import { mapGetters, mapActions } from 'vuex';

const reportMixin = {
  data() {
    return {
      // googleMenu 数据
      gogData: {
        gogList: [],
        activatedIndex: 0,
      },

      // slideMenu数据
      selectorData: {
        selector: [],
        selectorActiveProp: 0,
      },
      slideSelectShow: true,

      // 第一层分类参数
      firstCategory: {
        code: '',
        level: 2,
      },

      // 第二层分类参数
      secondCategory: {
        code: '',
        level: 3,
      },

      // 第三层分类参数
      thirdCategory: {
        code: '',
        level: 4,
      },

      // 圆点选项卡
      pointeTabControlData: {
        active: 0,
        data: [],
        code: [],
      },

      // 表格选中的个数
      moreThanTwoselection: 0,
      handleSelectionArr: [],
      // 模糊查询表单数据
      formInline: {
        dateValue: ['', ''],
        reportSectorArea: '',
        reportName: '',
      },
      reportOptions: [],

      // 表格数据
      headerList: [
        {
          label: '上传日期',
          prop: 'uploadTime',
          align: 'center',
          width: '13%',
        },
        {
          label: '报告名称',
          prop: 'fileName',
          align: 'center',
          link: '',
          width: '21%',
        },
        {
          label: '报告简介',
          prop: 'reportSummary',
          align: 'center',
          width: '36%',
          omit: '',
        },
        {
          label: '报告发布部门/区域',
          prop: 'reportSectorArea',
          align: 'center',
          width: '15%',
        },
        {
          label: '报告负责人',
          prop: 'reportPerson',
          align: 'center',
          width: '12%',
        },
      ],
      tableData: [],
      tableShow: true,
      returnReportId: '',
      roleIds: [],
      userIds: [],
      pageNum: 1,
      pageSize: 20,

      // <编辑> <查看> ... 表单数据
      dialogTitle: '',
      isAdd: '0',
      form: {
        fileName: '', // 报告名称(报告发布部门/区域)
        reportPerson: sessionStorage.getItem('userName'), // 报告负责人
        reportSectorArea: '', // 上传单位
        reportSummary: '', // 报告简介
        role: '', //角色
        user: '', //用户
      },

      dialogFormVisible: false,
      rules: {
        fileName: { required: true, trigger: 'blur', message: '请上传文件' },
        reportPerson: { required: true, trigger: 'blur', message: '请填写负责人' },
        reportSectorArea: { required: true, trigger: 'blur', message: '请填写上传单位' },
        reportSummary: { required: true, trigger: 'blur', message: '请填写报告简介' },
      },

      // anyshare 控件数据
      filedata: {},
      filemsg: {},
      previewlist: [],
      nationflag: false,
      fileUploadShow: true,
      choiceShow: true,
      routerName: '',
      slideName: '',
      tabName: '',
    };
  },
  methods: {
    ...mapActions(['setBusinessLog']),
    getBusinessLogPreview(operationContent, operationType) {
      let params = {
        appId: JSON.parse(sessionStorage.getItem('authRoute'))[0].appId,
        operationContent: operationContent,
        operationType: operationType,
      };
      this.setBusinessLog(params);
    },
    fatherMethod(type, data, data1, data2) {
      // this.slideName = data1.menuName;
      if (type == 'slideSelect') {
        this.pageNum = 1;
        this.secondCategory = {
          code: '',
          level: 3,
        };

        this.thirdCategory = {
          code: '',
          level: 4,
        };
        this.selectorData.selectorActiveProp = data1.menuCode;
        this.getCategoryByLazyLoadSecond();
      }
    },

    fileInputReload() {
      this.fileUploadShow = false;
      this.$nextTick(() => {
        this.fileUploadShow = true;
      });
    },

    // 加载更多函数
    tableLoadMore() {
      this.pageNum++;
      this.findReportShare(true, this.nationflag);
    },

    // 右边内容样式
    rightContentStyle() {
      if (this.selectorData.selector.length > 0) {
        return 'width: 90%; float: right; padding: 0 1%';
      } else {
        return 'width: 100%; float: right; padding: 0 1%';
      }
    },

    pointeTabClick(index) {
      if (this.pointeTabControlData.active != index) {
        this.pointeTabControlData.active = index;
        this.thirdCategory.code = this.pointeTabControlData.code[index];
        this.pageNum = 1;
        this.findReportShare();
      }
    },

    slideSelectReload() {
      this.slideSelectShow = false;
      this.$nextTick(() => {
        this.slideSelectShow = true;
      });
    },

    googleStyleMenuClick(val) {
      this.slideSelectReload();
      this.pageNum = 1;
      this.firstCategory = {
        code: '',
        level: 2,
      };

      this.secondCategory = {
        code: '',
        level: 3,
      };

      this.thirdCategory = {
        code: '',
        level: 4,
      };
      this.gogData.activatedIndex = val.activatedIndex;
      this.firstCategory.code = this.gogData.gogList[this.gogData.activatedIndex].firstCode;
      this.getCategoryByLazyLoadFirst(true);
      this.slideName = '';
    },

    getMessage(data) {
      this.filemsg = data;
      this.form.fileName = data.file.name;
    },
    choiceReload() {
      this.choiceShow = false;
      this.$nextTick(() => {
        this.choiceShow = true;
      });
    },
    getRoleCheckList(data) {
      this.form.role = data.roleNames.join('、');
      this.roleIds = data.roleIds;
    },
    getUserCheckList(data) {
      this.form.user = data.userNames.join('、');
      this.userIds = data.userIds;
    },
    reloadTable() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    },

    resetForm() {
      this.form = {
        fileName: '', // 报告名称(报告发布部门/区域)
        reportPerson: sessionStorage.getItem('userName'), // 报告负责人
        reportSectorArea: '', // 上传单位
        reportSummary: '', // 报告简介
        role: '',
        user: '',
      };
      this.filemsg = {};
      this.filedata = {};
      this.$refs['form'].resetFields();
      this.choiceReload();
    },

    search() {
      this.findReportShare();
    },
    upload() {
      (this.dialogFormVisible = true), (this.isAdd = '1'), (this.dialogTitle = '新增');
      this.getBusinessLogPreview(`${this.routerName}新增表格数据`, '数据操作');
    },
    edit() {
      (this.dialogFormVisible = true), (this.isAdd = '4'), (this.dialogTitle = '编辑');
      this.getBusinessLogPreview(`${this.routerName}编辑表格数据`, '数据操作');
      if (this.handleSelectionArr.length > 0) {
        this.form = this.$deepClone(this.handleSelectionArr[0]);
      }
      this.returnReportId = this.form.reportId;

      this.$set(this.form, 'user', '');
      this.$set(this.form, 'role', '');
      setTimeout(() => {
        this.$refs.roleChoice.getRoleCheckList();
      }, 0);
      setTimeout(() => {
        this.$refs.userChoice.getUserCheckList();
      }, 0);
      // this.selectByReportId(this.handleSelectionArr[0].reportId);
    },

    // tableControl 控件操作函数
    onUpload(fileValue) {
      // this.form.fileName = fileValue[0].name;
      this.filedata = fileValue;
      this.$nextTick(() => {
        this.$refs['anyshare-upload'].upload();
        this.fileInputReload();
      });
    },
    onCancel() {
      this.dialogFormVisible = false;
      this.resetForm();
    },
    onSumbit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (this.isAdd) {
            // 如果是新增
            case '1':
              this.insertReportShare();
              break;

            // 如果是编辑
            case '4':
              this.updateReportShare();
              break;

            default:
              return false;
          }
          this.dialogFormVisible = false;
          this.resetForm();
        } else {
          return false;
        }
      });
    },
    onPreview(item) {
      (this.dialogFormVisible = true), (this.isAdd = '2'), (this.dialogTitle = '');

      // 如果是单个点击查看
      if (item) {
        this.previewlist = [
          {
            docid: item.docId,
            name: item.fileName,
            rev: item.rev,
            size: item.size,
          },
        ];
        // this.dialogTitle = item.fileName;
      } else {
        this.previewlist = this.handleSelectionArr.map((item1) => {
          return {
            docid: item1.docId,
            name: item1.fileName,
            rev: item1.rev,
            size: item1.size,
          };
        });
      }
      this.getBusinessLogPreview(`${this.routerName}查看表格数据`, '数据操作');
      this.$nextTick(() => {
        this.$refs['anyshare-preview'].getToken();
      });
    },
    onDelete() {
      (this.isAdd = '5'), (this.dialogTitle = '警告！！！');
      this.$confirm('此操作后将不能撤回, 请仔细确认是否删除?', this.dialogTitle, {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'error',
      }).then(() => {
        this.deleteReportShare();
        this.getBusinessLogPreview(`${this.routerName}删除表格数据`, '数据操作');
        // this.reloadTable();
      });
    },
    onDownload() {
      (this.dialogFormVisible = false), (this.isAdd = '3'), (this.dialogTitle = '下载');
      this.handleSelectionArr = this.handleSelectionArr.map((item) => {
        item.docid = item.docId;
        return item;
      });
      this.getBusinessLogPreview(`${this.routerName}下载表格数据`, '数据操作');
      this.$refs['anyshare-download'].download();
    },

    // 表格勾选事件函数
    handleSelectionChange(val) {
      this.handleSelectionArr = val;
      this.moreThanTwoselection = val.length;
    },

    changeMonth(date) {
      this.formInline.dateValue = date;
    },
    //报告授权
    authorize() {
      const params = {
        reportId: this.returnReportId,
        roleIds: this.roleIds,
        userIds: this.userIds,
      };
      authorize(params).then((res) => {
        if (res.status === 1) {
          // this.$message({
          //   type: 'success',
          //   message: res.msg,
          // });
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
          });
        }
      });
    },
    /**
     * @name:
     * @author: xulujin
     * @msg:
     * @param {*}
     * @return {*}
     * @Date: 2021-05-17 14:34:57
     */
    selectSectorArea() {
      const params = {
        areaCode: this.zeroCategory.areaCode,
        cityCode: '',
        firstCategory: this.firstCategory.code,
        includeAll: true,
        secondCategory: this.secondCategory.code,
        thirdCategory: this.thirdCategory.code,
      };
      selectSectorArea(params).then((res) => {
        if (res.status === 1) {
          this.reportOptions = res.data;
          this.formInline.reportSectorArea = res.data[0].code;
        } else {
          this.reportOptions = [];
        }
      });
    },

    /**
     * @name: 查询报告共享类别(懒加载)第一层
     * @author: xulujin
     * @msg:
     * @param {*}
     * @return {*}
     * @Date: 2021-05-17 10:36:30
     */
    getCategoryByLazyLoadFirst(resetSelect) {
      getCategoryByLazyLoad({ code: this.zeroCategory.code, level: this.zeroCategory.level }).then((res) => {
        if (res.status === 1) {
          this.gogData.gogList = res.data;
          if (!this.tabName) {
            this.slideName = '';
            this.tabName = this.gogData.gogList[0].firstCategory;
          }
          this.firstCategory.code = res.data[this.gogData.activatedIndex].firstCode;
        } else {
          this.gogData.gogList = [];
          this.firstCategory.code = '';
        }
        this.getCategoryByLazyLoadSecond(resetSelect);
      });
    },

    /**
     * @name: 查询报告共享类别(懒加载)第二层
     * @author: xulujin
     * @msg:
     * @param {*} resetSelect
     * @return {*}
     * @Date: 2021-05-17 11:47:07
     */
    getCategoryByLazyLoadSecond(resetSelect) {
      getCategoryByLazyLoad({ code: this.firstCategory.code, level: this.firstCategory.level }).then((res) => {
        if (res.status === 1) {
          res.data.forEach((element) => {
            element.menuName = element.secondCategory;
            element.menuCode = element.secondCode;
          });
          this.selectorData.selector = res.data;
          if (!this.slideName) {
            this.slideName = res.data[0].secondCategory;
          }
          this.secondCategory.code = this.selectorData.selectorActiveProp;

          if (resetSelect) {
            this.selectorData.selectorActiveProp = res.data[0].menuCode;
            this.secondCategory.code = res.data[0].menuCode;
          }
        } else {
          this.selectorData.selector = [];
        }
        this.getCategoryByLazyLoadThird(resetSelect);
      });
    },

    /**
     * @name: 查询报告共享类别(懒加载)第三层
     * @author: xulujin
     * @msg:
     * @param {*}
     * @return {*}
     * @Date: 2021-05-17 11:47:07
     */
    getCategoryByLazyLoadThird(resetSelect) {
      getCategoryByLazyLoad({ code: this.secondCategory.code, level: this.secondCategory.level }).then((res) => {
        if (res.status === 1) {
          let pointData = [],
            pointCode = [];
          res.data.forEach((element) => {
            element.menuName = element.thirdCategory;
            element.menuCode = element.threeCode;
            pointData.push(element.thirdCategory);
            pointCode.push(element.threeCode);
          });
          this.pointeTabControlData.data = pointData;
          this.pointeTabControlData.code = pointCode;

          // this.selectorData.selector = this.selectorData.selector.map((item) => {
          //   if (item.menuCode == this.secondCategory.code) {
          //     item.children = res.data;
          //   }
          //   return item;
          // });
          this.thirdCategory.code = this.pointeTabControlData.code[this.pointeTabControlData.active];

          // if (resetSelect) {
          //   this.selectorData.selectorActiveProp = res.data[0].menuCode;
          // }
        } else {
          this.pointeTabControlData.data = [];
          this.pointeTabControlData.code = [];
        }
        this.selectSectorArea();
        this.findReportShare();
      });
    },

    /**
     * @name:
     * @author: xulujin
     * @msg:
     * @param {*}
     * @return {*}
     * @Date: 2021-05-17 15:34:25
     */
    insertReportShare() {
      const params = {
        appCode: this.getAppCode,
        areaCode: this.zeroCategory.areaCode,
        areaName: this.zeroCategory.code,
        cityCode: '',
        cityName: '',
        docId: this.filemsg.file.docid,
        fileName: this.form.fileName,
        firstCategory: this.firstCategory.code,
        reportPerson: this.form.reportPerson,
        reportSectorArea: this.form.reportSectorArea,
        reportSummary: this.form.reportSummary,
        rev: this.filemsg.file.rev,
        secondCategory: this.secondCategory.code,
        size: this.filemsg.file.size,
        thirdCategory: this.thirdCategory.code,
      };
      insertReportShare(params).then((res) => {
        if (res.status === 1) {
          this.pageNum = 1;
          this.returnReportId = res.data;
          this.authorize();
          this.findReportShare();
          this.$message({
            type: 'success',
            message: res.msg,
          });
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
          });
        }
      });
    },

    /**
     * @name: 分页查找报告
     * @author: xulujin
     * @msg:
     * @param {Boolean} loadMore 是否为加载更多
     * @return {*}
     * @Date: 2021-05-17 17:47:12
     */
    findReportShare(loadMore, nationflag) {
      if (nationflag) {
        this.nationflag = nationflag;
      }
      const params = {
        areaCode: this.zeroCategory.areaCode,
        cityCode: '',
        firstCategory: this.firstCategory.code,
        nationwide: nationflag,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        reportName: this.formInline.reportName,
        reportSectorArea: this.formInline.reportSectorArea,
        secondCategory: this.secondCategory.code,
        startTime: this.formInline.dateValue[0].replace('-', ''),
        endTime: this.formInline.dateValue[1].replace('-', ''),
        thirdCategory: this.thirdCategory.code,
      };
      findReportShare(params).then((res) => {
        if (res.status === 1) {
          if (loadMore) {
            res.data.list.forEach((item) => {
              this.tableData.push(item);
            });
          } else {
            this.tableData = res.data.list;
          }
        } else {
          if (loadMore) {
          } else {
            this.tableData = [];
          }
        }
      });
    },

    /**
     * @name: 根据报告ID查询报告信息
     * @author: xulujin
     * @msg:
     * @param {*}
     * @return {*}
     * @Date: 2021-05-18 12:22:53
     */
    selectByReportId(reportId) {
      if (reportId)
        selectByReportId({ reportId }).then((res) => {
          if (res.data) {
            let data = res.data;
            this.form = {
              fileName: data.fileName, // 报告名称(报告发布部门/区域)
              reportPerson: data.reportPerson, // 报告负责人
              reportSectorArea: data.reportSectorArea, // 上传单位
              reportSummary: data.reportSummary, // 报告简介
            };
          } else {
            this.resetForm();
          }
        });
    },

    /**
     * @name: 根据ID批量删除报告共享
     * @author: xulujin
     * @msg:
     * @param {*} reportIdList reportId 集合
     * @param {*} resIdList resId 集合
     * @return {*}
     * @Date: 2021-05-18 11:16:03
     */
    deleteReportShare() {
      let resIdList = [],
        reportIdList = [];
      this.handleSelectionArr.forEach((item) => {
        resIdList.push(item.resId);
        reportIdList.push(item.reportId);
      });
      const params = {
        reportIdList: reportIdList.join(','),
        resIdList: resIdList.join(','),
      };
      deleteReportShare(params).then((res) => {
        if (res.status === 1) {
          this.pageNum = 1;
          this.findReportShare();
          this.$message({
            type: 'success',
            message: res.msg,
          });
        }
      });
    },

    /**
     * @name:
     * @author: xulujin
     * @msg:
     * @param {*}
     * @return {*}
     * @Date: 2021-05-18 12:17:16
     */
    updateReportShare() {
      const params = {
        appCode: this.getAppCode,
        docId: this.form.docId,
        fileName: this.form.fileName,
        reportId: this.form.reportId,
        reportPerson: this.form.reportPerson,
        reportSectorArea: this.form.reportSectorArea,
        reportSummary: this.form.reportSummary,
        resId: this.form.resId,
        rev: this.form.rev,
        size: this.form.size,
      };
      updateReportShare(params).then((res) => {
        if (res.status === 1) {
          this.pageNum = 1;
          this.authorize();
          this.findReportShare();
          this.$message({
            type: 'success',
            message: res.msg,
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters('competitor', ['getEnterpriseCode', 'getEnterpriseName']),
    ...mapGetters('general', ['getAppCode']),
  },
  created() {
    let date = new Date();
    this.formInline.dateValue = [date.getFullYear() + '-01', date.getFullYear() + (date.getMonth() + 1 < 10 ? '-0' : '-') + (date.getMonth() + 1)];
    // this.formInline.startTime = datetime.format(new Date(this.formInline.dateValue[0]), 'YYYY-MM').replace('-', '');
    // this.formInline.endTime = datetime.format(new Date(this.formInline.dateValue[1]), 'YYYY-MM').replace('-', '');
    this.selectSectorArea();
    let current = this.$router.history.current;
    if (current.fullPath === '/economic/research/otherReport/exReport') {
      this.routerName = `宏观经济金融分析情况-${current.meta.menuName}`;
    } else if (current.fullPath === '/economic/research/otherReport/interReport') {
      this.routerName = `宏观经济金融分析情况-${current.meta.menuName}`;
    } else if (current.fullPath === '/urbanmarket/urbanmarketDetail/landMarket/researchReport/inPReportUrban') {
      this.routerName = `城市多维情况概览-${current.meta.menuName}`;
    } else if (current.fullPath === '/urbanmarket/urbanmarketDetail/landMarket/researchReport/expReportUrban') {
      this.routerName = `城市多维情况概览-${current.meta.menuName}`;
    } else if (
      current.fullPath === '/competitor/wanke/researchReport/interResearchReport' ||
      current.fullPath === '/competitor/all/researchReport/interResearchReport'
    ) {
      this.routerName = `竞争同行分析-${current.meta.menuName}`;
    } else if (
      current.fullPath === '/competitor/wanke/researchReport/exterResearchReport' ||
      current.fullPath === '/competitor/all/researchReport/exterResearchReport'
    ) {
      this.routerName = `竞争同行分析-${current.meta.menuName}`;
    }
  },
};

export default reportMixin;
