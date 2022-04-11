<template>
  <v-container>
    <MainMenu />
    <v-row justify="center">
      <v-card style="background-color=#eeeeee">
        <v-app-bar color="secondary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text" v-if="!isEditMode()"
            >신규상품 등록</v-toolbar-title
          >
          <v-toolbar-title class="white--text" v-if="isEditMode()"
            >상품 상세 정보</v-toolbar-title
          >
          <v-spacer />
        </v-app-bar>
        <div style="min-width: 800px;background-color=#eeeeee" class="pa-10">
          <div class="pa-10" style="background-color=#eeeeee">
            <v-text-field
              v-model="itemName"
              label="상품명"
              outlined
              >{{
            }}</v-text-field>
            <v-text-field
              v-model="itemPrice"
              label="가격"
              outlined
              >{{
            }}</v-text-field>
            <v-text-field
              v-model="itemDesc"
              label="설명"
              outlined
              >{{
            }}</v-text-field>
          </div>
        </div>
      </v-card>
    </v-row>
    <v-row justify="center" class="pa-6">
      <v-col cols="2">
        <v-btn
          color="primary"
          width="200"
          large
          @click="confirmRegister()"
          v-if="!isEditMode()"
          >등록 완료</v-btn
        >
        <v-btn
          color="primary"
          width="200"
          large
          @click="confirmEdit()"
          v-if="isEditMode()"
          >수정 완료</v-btn
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
    itemDesc: null,
  }),
  mounted() {
    this.itemName = this.getCurItemName();
    this.itemPrice = this.getCurItemPrice();
    this.itemDesc = this.getCurItemDesc();
  },
  methods: {
    confirmRegister() {
      seller
        .registerItem(
          store.getters.getLoginID,
          this.itemName,
          this.itemPrice,
          this.itemDesc
        )
        .then((res) => {
          if (res.data.result === 0) {
            store.commit("updateItemList", res.data.data.itemList);
            this.$router.push("/home_seller");
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    },
    confirmEdit() {
      var curItem = store.getters.getCurItem;
      seller
        .modifyItem(
          curItem.sellerID,
          curItem.itemID,
          this.itemName,
          this.itemPrice,
          this.itemDesc
        )
        .then((res) => {
          if (res.data.result === 0) {
            store.commit("updateItemList", res.data.data.itemList);
            this.$router.push("/home_seller");
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    },
    cancel() {
      this.$router.push("/home_seller");
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
    getCurItemDesc() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return "";
      } else {
        return curItem.desc;
      }
    },
  },
};
</script>
