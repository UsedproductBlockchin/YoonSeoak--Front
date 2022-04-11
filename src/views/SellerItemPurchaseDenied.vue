<template>
  <v-container>
    <MainMenu />
    <v-row justify="center">
      <v-card style="background-color=#eeeeee">
        <v-app-bar color="secondary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text"
            >다음의 상품이 구매거부되었습니다!</v-toolbar-title
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
            <v-text-field
              v-model="itemDenialReason"
              label="구매거부 사유"
              outlined
              disabled
              >{{
            }}</v-text-field>
            <br />
          </div>
        </div>
        <v-app-bar color="error" flat>
          <v-spacer />
          <v-toolbar-title class="white--text"
            >제품판매에 더 신경을 써주시길바랍니다!</v-toolbar-title
          >
          <v-spacer />
        </v-app-bar>
        <br />
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
    itemDenialReason: null,
  }),
  mounted() {
    this.itemName = this.getCurItemName();
    this.itemPrice = this.getCurItemPrice();
    this.itemBuyer = this.$store.getLoginID;
    this.itemDenialReason = this.getCurItemDenialReason();
  },
  methods: {
    confirm() {
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
    getCurItemDenialReason() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return "";
      } else {
        return curItem.denialReason;
      }
    },
  },
};
</script>
