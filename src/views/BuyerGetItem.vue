<template>
  <v-container>
    <MainMenu />
    <v-row justify="center">
      <v-card style="background-color=#eeeeee">
        <v-app-bar color="secondary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text"
            >구매상품 상세정보</v-toolbar-title
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
              v-model="itemPrice"
              label="가격"
              outlined
              disabled
              >{{
            }}</v-text-field>
            <v-text-field
              v-model="itemDesc"
              label="설명"
              outlined
              disabled
              >{{
            }}</v-text-field>
            <v-text-field
              v-model="itemDeliveryState"
              label="배송상태"
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
        <v-btn color="primary" width="200" large @click="getItem()"
          >물품 수령</v-btn
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
import * as buyer from "@/serverapi/buyer";
import MainMenu from "@/components/MainMenu.vue";
import store from "@/store";
import { common } from "@/mixins/common";

export default {
  name: "SellerHome",
  components: {
    MainMenu,
  },
  data: () => ({
    itemName: null,
    itemPrice: null,
    itemDesc: null,
    itemDeliveryState: null,
  }),
  mounted() {
    this.itemName = this.getCurItemName();
    this.itemPrice = this.getCurItemPrice();
    this.itemDesc = this.getCurItemDesc();
    this.itemDeliveryState = this.getCurItemDeliveryState();
  },
  mixins: [common],
  methods: {
    getItem() {
      buyer
        .confirmItemGet(
          store.getters.getCurItem.itemID,
          store.getters.getLoginID
        )
        .then((res) => {
          if (res.data.result === 0) {
            alert("물품수령을 완료하였습니다. 반드시 구매확정을 해주세요!");
            store.commit("updateItemList", res.data.data.itemList);
            this.$router.push({
              name: "BuyerHome",
              query: { onSaleItemList: false },
            });
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    },
    cancel() {
      this.$router.push({
        name: "BuyerHome",
        query: { onSaleItemList: false },
      });
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
    getCurItemDesc() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return "";
      } else {
        return curItem.desc;
      }
    },
    getCurItemDeliveryState() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return "";
      } else {
        return this.getItemStateString("buyer", curItem.state);
      }
    },
  },
};
</script>
