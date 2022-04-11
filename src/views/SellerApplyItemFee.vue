<template>
  <v-container>
    <MainMenu />
    <v-row justify="center">
      <v-card style="background-color=#eeeeee">
        <v-app-bar color="secondary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text"
            >상품대금 지불요청</v-toolbar-title
          >
          <v-spacer />
        </v-app-bar>
        <div style="min-width: 800px;background-color=#eeeeee" class="pa-10">
          <div class="pa-10" style="background-color=#eeeeee">
            <v-text-field
              v-model="itemName"
              label="상품명"
              outlined
              disabled
              >{{
            }}</v-text-field>
            <v-text-field
              v-model="itemBuyer"
              label="구매자"
              outlined
              disabled
              >{{
            }}</v-text-field>
            <v-text-field
              v-model="itemPrice"
              label="구매가격"
              outlined
              disabled
              >{{
            }}</v-text-field>
          </div>
        </div>
      </v-card>
    </v-row>
    <v-row justify="center" class="pa-6">
      <v-col cols="2">
        <v-btn color="primary" width="200" large @click="requestItemFee()"
          >지불 요청</v-btn
        >
      </v-col>
      <v-col cols="1" />
      <v-col cols="2">
        <v-btn color="primary" width="200" large @click="cancel()">취소</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as seller from "@/serverapi/seller";
import MainMenu from "@/components/MainMenu.vue";
import store from "@/store";

export default {
  name: "SellerHome",
  components: {
    MainMenu,
  },
  data: () => ({
    itemName: null,
    itemPrice: null,
    itemBuyer: null,
  }),
  mounted() {
    this.itemName = this.getCurItemName();
    this.itemPrice = this.getCurItemPrice();
    this.itemBuyer = this.$store.getLoginID;
  },
  methods: {
    requestItemFee() {
      var curItem = store.getters.getCurItem;
      seller
        .requestItemFee(curItem.itemID, store.getters.getLoginID)
        .then((res) => {
          if (res.data.result === 0) {
            alert("대금이 지급되었습니다!");

            res.data.data.partyInfo["partyType"] = "seller";
            store.commit("loginSuccess", res.data.data.partyInfo);
            store.commit("updateItemList", res.data.data.itemList);
            this.$router.push({ name: "SellerHome" });
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    },
    cancel() {
      this.$router.push({ name: "SellerHome" });
    },
    isEditMode() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return false;
      } else {
        return true;
      }
    },
    getCurItemName() {
      var curItem = store.getters.getCurItem;
      console.log("curItem=" + JSON.stringify(curItem));
      if (curItem === null) {
        return "";
      } else {
        return curItem.name;
      }
    },
    getCurItemPrice() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return "";
      } else {
        return curItem.price;
      }
    },
  },
};
</script>
