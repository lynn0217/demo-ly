<template>
  <div class="login">
    <div class="login_wrap">
      <ul class="menu_top">
        <li
          :class="{'current ':item.current}"
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
          <label class="style = wordStyle">邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label class="style = wordStyle">密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords">
          <label class="style = wordStyle">重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" v-if="model === 'resgister'">
          <label class="style = wordStyle">验证码</label>
          <el-row>
            <el-col :span="16">
              <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>

            <el-col :span="8">
              <el-button type="primary" class="block margin-left-15px">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="block">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
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
    var validateUsername = (rule, value, callback) => {
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
    var validatePassword = (rule, value, callback) => {
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
    var validatePasswords = (rule, value, callback) => {
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
    var validateCode = (rule, value, callback) => {
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
      }
    };
  },
  created() {},
  mounted() {},
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
    }
  }
};
</script>
<style lang="less" scoped>
@import "./styles.less";
</style>
