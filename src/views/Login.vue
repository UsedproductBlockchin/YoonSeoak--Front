<template>
  <v-container fill-height style="max-width: 550px">
    <v-row justify="center">
      <div align="center">
        <h1>중고 택배거래 시스템</h1>
        <br />
      </div>
      <v-card>
        <v-app-bar color="primary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text">로그인</v-toolbar-title>
          <v-spacer />
        </v-app-bar>
        <div class="pa-10">
          <v-text-field v-model="loginID" label="아이디"></v-text-field>
          <v-text-field
            v-model="loginPW"
            label="암호"
            type="password"
          ></v-text-field>
          <br />
          <div class="pa-3" align="center">
            <v-btn
              color="secondary"
              min-width="400"
              min-height="50"
              @click="processLogin('seller')"
              >판매자로 로그인</v-btn
            >
          </div>
          <div class="pa-3" align="center">
            <v-btn
              color="secondary"
              min-width="400"
              min-height="50"
              @click="processLogin('buyer')"
              >구매자로 로그인</v-btn
            >
          </div>
          <div class="pa-3" align="center">
            <v-btn
              color="secondary"
              min-width="400"
              min-height="50"
              @click="processLogin('deliveryman')"
              >운송자로 로그인</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import * as auth from "@/serverapi/auth";

export default {
  name: "Login",
  data: () => ({
    loginID: null,
    loginPW: null,
  }),
  methods: {
    processLogin(party) {
      if (
        this.loginID === null ||
        this.loginPW === null ||
        this.loginID === "" ||
        this.loginPW === ""
      ) {
        alert("아이디 또는 암호를 입력하세요!");
        return;
      }

      auth
        .login(party, this.loginID, this.loginPW)
        .then((res) => {
          console.log(JSON.stringify(res));

          if (res.result === 0) {
            console.log("partyInfo=" + JSON.stringify(res.data.partyInfo));

            res.data.partyInfo["partyType"] = res.data.partyType;
            this.$store.commit("loginSuccess", res.data.partyInfo);
            this.$store.commit("updateItemList", res.data.itemList);

            if (res.data.partyType === "seller") {
              this.$router.push("/home_seller");
            } else if (res.data.partyType === "buyer") {
              this.$router.push({
                name: "BuyerHome",
                query: { onSaleItemList: true },
              });
            } else if (res.data.partyType === "deliveryman") {
              this.$router.push("/home_deliveryman");
            }
          } else {
            alert("아이디 또는 암호가 잘못되었습니다!");
            this.loginID = "";
            this.loginPW = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.v-toolbar-title input {
  font-size: 1.5em;
}

.login-box {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 2px;
  transform: translate(-50%, -50%);
}
</style>
