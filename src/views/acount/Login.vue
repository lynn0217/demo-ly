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
        <label class="style = wordStyle">用户名</label>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <label class="style = wordStyle">密码</label>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <label class="style = wordStyle">验证码</label>
        <el-form-item prop="age">
          <el-row>
            <el-col :span="16">
              <el-input v-model.number="ruleForm.age"></el-input>
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
export default {
  name: "Login",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true },
        { txt: "注册", current: false }
      ],
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
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
