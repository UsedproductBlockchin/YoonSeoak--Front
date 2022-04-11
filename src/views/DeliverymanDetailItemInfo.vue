<template>
  <v-container>
    <MainMenu />
    <v-row justify="center">
      <v-card style="background-color=#eeeeee">
        <v-app-bar color="secondary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text"
            >배송상품 상세정보</v-toolbar-title
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
              v-model="itemBuyer"
              label="구매자"
              outlined
              disabled
              >{{
            }}</v-text-field>
            <v-text-field
              v-model="itemAddress"
              label="배송지"
              outlined
              disabled
              >{{
            }}</v-text-field>
          </div>
        </div>
      </v-card>
    </v-row>
    <v-row justify="center" class="pa-6">
      <v-col cols="2" v-if="!isDeliveryCompleteReq()">
        <v-btn
          color="primary"
          width="200"
          large
          @click="acceptDeliveryReq()"
          v-if="!isOnDelivery()"
          >배송 접수</v-btn
        >
        <v-btn
          color="primary"
          width="200"
          large
          @click="requestDeliveryComplete()"
          v-if="isOnDelivery()"
          >배송완료 요청</v-btn
        >
      </v-col>
      <v-col cols="1" v-if="!isDeliveryCompleteReq()" />
      <v-col cols="2">
        <v-btn color="primary" width="200" large @click="cancel()">취소</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as deliver from "@/serverapi/deliver";
import MainMenu from "@/components/MainMenu.vue";
import store from "@/store";
import constants from "@/store/constants";

export default {
  name: "SellerHome",
  components: {
    MainMenu,
  },
  data: () => ({
    itemName: null,
    itemPrice: null,
    itemDesc: null,
    itemBuyer: null,
    itemAddress: null,
  }),
  mounted() {
    this.itemName = this.getCurItemName();
    this.itemPrice = this.getCurItemPrice();
    this.itemDesc = this.getCurItemDesc();
    this.itemBuyer = this.getCurItemBuyer();
    this.itemAddress = this.getCurItemAddress();
  },
  methods: {
    isDeliveryCompleteReq() {
      if (
        store.getters.getCurItem.state ===
        constants.ITEM_STATE_ONDELIVERYCOMPLETE_REQ
      ) {
        return true;
      } else {
        return false;
      }
    },
    isOnDelivery() {
      if (store.getters.getCurItem.state === constants.ITEM_STATE_ONDELIVERY) {
        return true;
      } else {
        return false;
      }
    },
    acceptDeliveryReq() {
      deliver
        .requestDeliveryAccept(
          store.getters.getLoginID,
          store.getters.getCurItem.itemID
        )
        .then((res) => {
          if (res.data.result === 0) {
            alert("배송접수가 완료되었습니다!");
            store.commit("updateItemList", res.data.data.itemList);
            this.$router.push("/home_deliveryman");
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    },
    requestDeliveryComplete() {
      deliver
        .completeDelivery(
          store.getters.getLoginID,
          store.getters.getCurItem.itemID
        )
        .then((res) => {
          if (res.data.result === 0) {
            alert("배송완료가 요청되었습니다!");
            store.commit("updateItemList", res.data.data.itemList);
            this.$router.push("/home_deliveryman");
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    },
    cancel() {
      this.$router.push("/home_deliveryman");
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
    getCurItemBuyer() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return "";
      } else {
        return curItem.buyerName;
      }
    },
    getCurItemAddress() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return "";
      } else {
        return curItem.address;
      }
    },
  },
};
</script>
