<template>
  <v-container>
    <MainMenu />
    <v-row justify="center">
      <v-card>
        <v-app-bar color="secondary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text"
            >{{ sellerName }}님의 판매이력</v-toolbar-title
          >
          <v-spacer />
        </v-app-bar>
        <div style="min-width: 800px; background-color: #eeeeee" class="pa-10">
          <v-col align-self="center" v-if="historyList.length === 0"
            ><div class="ddd">판매이력이 없습니다!</div></v-col
          >
          <v-col v-if="historyList.length > 0">
            <template v-for="(history, index) in historyList">
              <v-card :key="index" class="ma-3">
                <v-divider :key="index"></v-divider>

                <v-row justify="space-between" class="pt-6">
                  <v-col class="pl-6"
                    ><p class="text-left">갱신일자: {{ history.lastDate }}</p>
                  </v-col>

                  <v-col cols="3" class="pr-6">
                    <p class="text-right">구매자: {{ history.buyerName }}</p>
                  </v-col>
                </v-row>
                <v-row justify="space-between">
                  <v-col class="pl-6"
                    ><p class="text-left">
                      거래물품: {{ history.itemName }}
                    </p></v-col
                  >

                  <v-col cols="3" class="pr-6">
                    <p class="text-right">
                      거래결과: {{ getHistoryResultString(history.result) }}
                    </p>
                  </v-col>
                </v-row>
              </v-card>
            </template>
          </v-col>
        </div>
      </v-card>
    </v-row>
    <v-row justify="center" class="pa-6">
      <v-col cols="2">
        <v-btn color="primary" width="200" large @click="confirm()">확인</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";
import { common } from "@/mixins/common";
//import constants from "@/store/constants";
import store from "@/store";
import * as seller from "@/serverapi/seller";

export default {
  name: "",
  components: {
    MainMenu,
  },
  data: () => ({
    sellerName: null,
    historyList: [],
  }),
  mixins: [common],
  created() {
    seller
      .querySaleHistory(this.$route.query.sellerID)
      .then((res) => {
        if (res.data.result === 0) {
          this.historyList = res.data.data.historyList;
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  },
  mounted() {
    console.log("itemList=" + JSON.stringify(store.getters.getItemList));

    this.sellerName = this.$route.query.sellerName;
  },
  methods: {
    getHistoryResultString(resultID) {
      if (resultID === "SALE_COMPLETE") {
        return "판매완료";
      } else {
        return "판매취소";
      }
    },
    confirm() {
      this.$router.push({
        name: "BuyerItemPurchase",
      });
    },
  },
};
</script>

<style scoped>
.v-list-item-subtitle {
  color: #f4f400 !important;
}
</style>
