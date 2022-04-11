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
              <v-row justify="space-around">
                <v-col cols="8">
                  <v-text-field
                    v-model="itemSeller"
                    label="판매자"
                    outlined
                    disabled
                    >{{
                  }}</v-text-field>
                </v-col>
                <v-col />
                <v-col />
                <v-col>
                  <v-btn color="primary" large @click="querySaleHistory()"
                    >판매 이력</v-btn
                  >
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
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="itemDesc"
                    label="설명"
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
                    v-model="itemBuyer"
                    label="구매자"
                    outlined
                    disabled
                    >{{
                  }}</v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="deliveryAddress"
                    label="배송지"
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
      <v-col cols="1"></v-col>
      <v-col cols="2">
        <v-btn color="primary" min-width="260" large @click="purchaseItem()"
          >구매 하기</v-btn
        >
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="2">
        <v-btn color="primary" min-width="260" large @click="cancel()"
          >취소</v-btn
        >
      </v-col>
      <v-col cols="1"></v-col>
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
    itemSeller: null,
    itemPrice: null,
    itemDesc: null,
    itemBuyer: null,
    deliveryAddress: null,
  }),
  mounted() {
    this.itemName = this.getCurItemName();
    this.itemSeller = this.getCurItemSeller();
    this.itemPrice = this.getCurItemPrice();
    this.itemDesc = this.getCurItemDesc();
    this.itemBuyer = store.getters.getLoginID;
  },
  methods: {
    querySaleHistory() {
      var curItem = store.getters.getCurItem;
      this.$router.push({
        name: "QuerySaleHistory",
        query: {
          sellerID: this.itemSeller,
          sellerName: curItem.sellerName,
          itemState: curItem.tate,
        },
      });
    },
    purchaseItem() {
      if (this.deliveryAddress === null || this.deliveryAddress === "") {
        alert("배송지를 입력하세요!");
        return;
      }

      var curItem = store.getters.getCurItem;
      buyer
        .purchaseItem(curItem.itemID, this.itemBuyer, this.deliveryAddress)
        .then((res) => {
          if (res.data.result === 0) {
            alert("구매가 완료되었습니다!");
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
      this.$router.push("/home_seller");
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
