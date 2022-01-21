<template>
  <div class="login">
    <div class="login_wrap">
      <ul class="menu_top">
        <!-- class的绑定方式 :class="{'active':isActive}  isActive为true则执行active，否则不执行 -->
        <li
          :class="{'current':item.current}"
          v-for="item in menuTab"
          :key="item.id"
          @click="changeTab(item)"
        >{{item.txt}}</li>
      </ul>
      <!-- form表单start -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        size="medium"
        class="form_login"
      >
        <el-form-item prop="username">
          <label class="style = wordStyle" for="username">邮箱</label>
          <el-input type="text" id="username" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label class="style = wordStyle" for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" v-if="model === 'resgister'">
          <label class="style = wordStyle" for="passwords">重复密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label class="style = wordStyle" for="code">验证码</label>
          <el-row>
            <el-col :span="16">
              <el-input id="code" v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>

            <el-col :span="8">
              <el-button type="primary" class="block margin-left-15px" @click="getSms()">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="block"
            :disabled="buttonStatus"
          >{{model === 'login' ? '登录' : '注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { GetSms } from "@/api/login.js";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateCode1
} from "@/tools/check.js";
export default {
  name: "login",
  data() {
    //验证用户名
    let validateUsername = (rule, value, callback) => {
      // let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
        //邮箱验证check.js
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式错误"));
      } else {
        callback();
      }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {
      // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码应该为6-20位的数字和字母!"));
      } else {
        callback();
      }
    };
    //重复密码
    let validatePasswords = (rule, value, callback) => {
      // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("与第一次密码不相同"));
      } else {
        callback();
      }
    };
    //验证码
    let validateCode = (rule, value, callback) => {
      // let reg = /^[a-z0-9]{6}$/;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateCode1(value)) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };

    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "resgister" }
      ],
      model: "login",
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      },
      buttonStatus: true
    };
  },
  created() {},
  mounted() {
    //
  },
  methods: {
    //vue 数据驱动视频渲染

    //用data接受点击事件传递而来的参数item
    changeTab(data) {
      //es6语法forEach循环遍历
      this.menuTab.forEach(element => {
        element.current = false;
      });
      //再给传入的data加入高光
      data.current = true;
      //修改模块的值，切换login和resgister
      this.model = data.type;
      //重置表单,不用中括号[]
      // this.$refs[ruleForm].resetFields();
      this.$refs.ruleForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取验证码
    getSms() {
      //邮箱为空弹出提示（前端
      //加了拦截就不会请求接口，而是先做判断，条件成立才跑接口
      if (this.ruleForm.username == "") {
        this.$message.error("邮箱不能为空!");
        //return false  不再执行以下代码
        return false;
      }
      if (validateEmail(this.ruleForm.username)) {
        this.$message.error("邮箱格式有误!");
        return false;
      }
      //请求接口
      let data = {
        username: this.ruleForm.username
      };
      GetSms(data)
        .then(response => {})
        .catch(error => {});
    }
  }
};
</script>
<style lang="less" scoped>
@import "./styles.less";
</style>
