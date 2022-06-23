<template>
  <div class="wrap">
    <form>
      <div class="left">
        <img src="@/assets/部分星空.jpg" alt="" />
        <svg class="icon" aria-hidden="true" @click="this.$router.push('/')">
          <use xlink:href="#icon-xitongfanhui"></use>
        </svg>
      </div>
      <div class="right">
        <div class="right-icon">
          <h1>NEW HERE SIGN UP</h1>
          <h3>PHONE</h3>
          <input class="text" type="text" v-model="phone" />
          <h3>PASSWORD</h3>
          <input class="text" type="password" v-model="password" />
          <input class="btn" type="button" value="LOGIN" @click="login" />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { getLogin } from "@/request/api/home.js";
import {getUserInfor} from '@/request/api/home.js';
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    login: async function () {
      let res = await getLogin({ phone: this.phone, password: this.password });
      console.log(res);
      this.$store.commit('updataToken',res.data.token);
      localStorage.setItem('token',res.data.token);//把token储存在localStorage
      let result =await getUserInfor(res.data.account.id);
      this.$store.commit('updataUserInfor',result.data.profile);
      // console.log(this.$store.state.UserInfor);
      if (res.data.code === 200) {
        this.$store.commit("updataIsLogin", true);
        this.$router.push("/userinfor");
      } else {
        alert("你的登录手机号或密码错误！请重试！");
        this.phone = "";
        this.password = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Times New Roman", Times, serif;
}

.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to right bottom,
    #093f90,
    #2b3995,
    #433197,
    #5a2596,
    #6f0b92
  );
}

form {
  width: 8rem;
  height: 13rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  // border-radius: .8rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 0.9rem rgba(0, 0, 0, 0.1);
}

.left {
  width: 7.2rem;
  height: 6rem;
  position:relative;
}

.left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.left .icon{
    position:absolute;
    top:.2rem;
    left:.2rem;
    width:.6rem;
    height:.6rem;
    fill:#fff;
    border:.04rem solid #fff;
    border-radius: 50%;
}
.right {
  width: 7.2rem;
  height: 7rem;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-icon {
  width: 70%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

h1 {
  font-size: 0.52rem;
  color: #70b4e3;
  font-weight: 400;
  padding-bottom: 0.2rem;
}

h3 {
  transition: all 0.3s;
  font-size: 0.24rem;
  font-weight: 400;
  color: #70b4e3;
  padding: 0.4rem 0;
}

.text {
  transition: all 0.3s;
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 0.02rem solid #70b4e3;
  color: #70b4e3;
  background-color: rgba(0, 0, 0, 0);
}

.btn {
  outline: none;
  width: 100%;
  height: 0.8rem;
  border-radius: 0.4rem;
  border: none;
  color: #fff;
  font-size: 0.32rem;
  cursor: pointer;
  margin-top: 1rem;
  background-image: linear-gradient(120deg, #76daec 0%, #c5a8de 100%);
}

.btn:hover {
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.1);
}
</style>