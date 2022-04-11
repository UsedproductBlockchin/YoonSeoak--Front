<template>
  <v-container>
    <v-app-bar color="primary" height="70" flat fixed>
      <v-toolbar-title class="white--text"
        ><h2>중고물품 거래 시스템</h2></v-toolbar-title
      >
      <div class="pl-15">
        <v-toolbar-title class="white--text"
          >{{ getPartyTypeName() }}: {{ getPartyName() }}</v-toolbar-title
        >
      </div>
      <div class="pl-15">
        <v-toolbar-title class="white--text"
          >잔고: {{ getPartyBalance() }}원</v-toolbar-title
        >
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="processLogout()">로그아웃</v-btn>
    </v-app-bar>
    <br /><br /><br />
  </v-container>
</template>

<script>
import * as auth from "@/serverapi/auth";
import { mapGetters } from "vuex";

export default {
  name: "MainMenu",
  data: () => ({}),
  methods: {
    ...mapGetters([
      "getLoginID",
      "getPartyType",
      "getPartyName",
      "getPartyBalance",
    ]),
    getPartyTypeName() {
      if (this.getPartyType() === "seller") {
        return "판매자";
      } else if (this.getPartyType() === "buyer") {
        return "구매자";
      } else {
        return "운송자";
      }
    },
    processLogout() {
      auth
        .logout(this.getLoginID())
        .then((res) => {
          console.log(JSON.stringify(res));

          this.$store.commit("logout");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
