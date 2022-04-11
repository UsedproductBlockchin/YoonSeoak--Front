<template>
  <v-container>
    <MainMenu />
    <v-row justify="center">
      <v-card style="background-color=#eeeeee">
        <v-app-bar color="secondary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text"
            >판매상품 상세 정보</v-toolbar-title
          >
          <v-spacer />
        </v-app-bar>
        <div style="min-width: 800px;background-color=#eeeeee" class="pa-10">
          <div class="pa-10" style="background-color=#eeeeee">
            <template>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="itemName"
                    label="상품명"
                    outlined
                    disabled
                    >{{
                  }}</v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="itemPrice"
                    label="가격"
                    outlined
                    disabled
                    >{{
                  }}</v-text-field>
                </v-col>
              </v-row>
            </template>
            <v-divider />
            <br />
            <template>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="confirmDueDate"
                    label="확정기한"
                    outlined
                    disabled
                    >{{
                  }}</v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="creditPoint"
                    label="획득 신용점수"
                    outlined
                    disabled
                    >{{
                  }}</v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="purchaseDenialReason"
                    label="구매 거부사유"
                    outlined
                    >{{
                  }}</v-text-field>
                </v-col>
              </v-row>
            </template>
          </div>
        </div>
      </v-card>
    </v-row>
    <v-row justify="center" class="pa-6">
      <v-col cols="2">
        <v-btn color="primary" min-width="200" large @click="confirmPurchase()"
          >구매 확정하기</v-btn
        >
      </v-col>
      <v-col cols="1" />
      <v-col cols="2">
        <v-btn color="error" min-width="200" large @click="denyPurchase()"
          >구매 거부하기</v-btn
        >
      </v-col>
      <v-col cols="1" />
      <v-col cols="2">
        <v-btn color="primary" min-width="200" large @click="cancel()"
          >취소</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as buyer from "@/serverapi/buyer";
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
    confirmDueDate: null,
    creditPoint: null,
    purchaseDenialReason: null,
  }),
  mounted() {
    this.itemName = this.getCurItemName();
    this.itemPrice = this.getCurItemPrice();
    this.confirmDueDate = "2일 12시간 56분 30초";
    this.creditPoint = "15점";
    this.purchaseDenialReason = "";
  },
  methods: {
    confirmPurchase() {
      var curItem = store.getters.getCurItem;
      buyer
        .confirmPurchase(curItem.itemID, store.getters.getLoginID)
        .then((res) => {
          if (res.data.result === 0) {
            alert("구매가 확정되었습니다.감사합니다!");
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
    denyPurchase() {
      if (
        this.purchaseDenialReason === null ||
        this.purchaseDenialReason === ""
      ) {
        alert("구매거부 사유를 입력해주세요!");
        return;
      }
      var curItem = store.getters.getCurItem;
      buyer
        .denyPurchase(
          curItem.itemID,
          store.getters.getLoginID,
          this.purchaseDenialReason
        )
        .then((res) => {
          if (res.data.result === 0) {
            alert("구매거부 처리가 완료되었습니다!");
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
    getCurItemSeller() {
      var curItem = store.getters.getCurItem;
      console.log("curItem=" + JSON.stringify(curItem));
      if (curItem === null) {
        return "";
      } else {
        return curItem.sellerID;
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
