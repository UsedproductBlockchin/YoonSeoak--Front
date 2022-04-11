<template>
  <v-container>
    <MainMenu />
    <v-row justify="center">
      <v-card style="background-color=#eeeeee">
        <v-app-bar color="secondary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text" v-if="!isDeliveryReqMode()"
            >배송 요청</v-toolbar-title
          >
          <v-toolbar-title class="white--text" v-if="isDeliveryReqMode()"
            >상세 보기</v-toolbar-title
          >
          <v-spacer />
        </v-app-bar>
        <div style="min-width: 800px;background-color=#eeeeee" class="pa-10">
          <div class="pa-10" style="background-color=#eeeeee">
            <template>
              <v-row justify="center">
                <v-col cols="4"
                  ><div>상품명: {{ itemName }}</div></v-col
                >
              </v-row>
              <br />
              <v-divider></v-divider>
              <br />
              <v-row justify="center">
                <v-col cols="2"><div>배송 정보</div></v-col>
              </v-row>
              <br />
              <v-row justify="space-around">
                <v-col cols="8">
                  <v-text-field
                    v-model="itemBuyer"
                    label="구매자"
                    outlined
                    disabled
                    >{{
                  }}</v-text-field>
                </v-col>
                <v-col />
                <v-col />
                <v-col>
                  <v-btn color="primary" large @click="queryPurchaseHistory()"
                    >구매 이력</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="deliveryAddress"
                    label="배송지"
                    outlined
                    disabled
                    >{{
                  }}</v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-combobox
                    v-model="selectedDeliverman"
                    :items="deliverymanList"
                    label="운송자"
                    outlined
                    dense
                    v-if="!isDeliveryReqMode()"
                  ></v-combobox>
                  <v-text-field
                    v-model="selectedDeliverman"
                    label="운송자"
                    outlined
                    disabled
                    v-if="isDeliveryReqMode()"
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
      <v-col cols="2" v-if="!isDeliveryReqMode()" />
      <v-col cols="3">
        <v-btn
          color="primary"
          min-width="200"
          large
          @click="requestDelivery()"
          v-if="!isDeliveryReqMode()"
          >배송 요청하기</v-btn
        >
      </v-col>
      <v-col cols="2" v-if="!isDeliveryReqMode()" />
      <v-col cols="3">
        <v-btn color="primary" min-width="200" large @click="cancel()"
          >취소</v-btn
        >
      </v-col>
      <v-col cols="2" />
    </v-row>
  </v-container>
</template>

<script>
import * as seller from "@/serverapi/seller";
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
    itemSeller: null,
    itemPrice: null,
    itemDesc: null,
    itemBuyer: null,
    deliveryAddress: null,
    selectedDeliverman: null,
    deliverymanList: [],
    deliverymanInfoList: null,
  }),
  created() {
    seller
      .getDeliverymanList()
      .then((res) => {
        if (res.data.result === 0) {
          this.deliverymanInfoList = res.data.data.deliverymanList;
          this.deliverymanList = [];
          for (var i = 0; i < this.deliverymanInfoList.length; i++) {
            this.deliverymanList.push(this.deliverymanInfoList[i].name);

            if (
              this.$route.query.itemState ===
              constants.ITEM_STATE_ONDELIVERY_REQ
            ) {
              if (
                this.deliverymanInfoList[i].partyID ===
                this.getCurItemDeliverymanID()
              ) {
                this.selectedDeliverman = this.deliverymanInfoList[i].name;
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  },
  mounted() {
    this.itemName = this.getCurItemName();
    this.itemSeller = this.getCurItemSeller();
    this.itemPrice = this.getCurItemPrice();
    this.itemDesc = this.getCurItemDesc();
    this.itemBuyer = this.getCurItemBuyerName();
    this.deliveryAddress = this.getCurItemAddress();
  },
  methods: {
    isDeliveryReqMode() {
      if (
        this.$route.query.itemState === constants.ITEM_STATE_ONDELIVERY_REQ ||
        this.$route.query.itemState === constants.ITEM_STATE_ONDELIVERY
      ) {
        return true;
      } else {
        return false;
      }
    },
    queryPurchaseHistory() {
      this.$router.push({
        name: "QueryPurchaseHistory",
        query: {
          buyerID: this.getCurItemBuyerID(),
          buyerName: this.itemBuyer,
          itemState: this.$route.query.itemState,
        },
      });
    },
    requestDelivery() {
      if (this.selectedDeliverman === null || this.selectedDeliverman === "") {
        alert("운송자를 지정하세요!");
        return;
      }

      var deliverymanID = null;
      for (var i = 0; i < this.deliverymanInfoList.length; i++) {
        console.log(
          "name=" +
            this.deliverymanInfoList[i].name +
            ", selectedName=" +
            this.selectedDeliverman +
            ", deliveryManInfo=" +
            JSON.stringify(this.deliverymanInfoList[i])
        );
        if (this.deliverymanInfoList[i].name === this.selectedDeliverman) {
          deliverymanID = this.deliverymanInfoList[i].partyID;
          break;
        }
      }
      var curItem = store.getters.getCurItem;
      seller
        .requestDelivery(curItem.itemID, deliverymanID)
        .then((res) => {
          if (res.data.result === 0) {
            alert("배송요청이 완료되었습니다!");
            store.commit("updateItemList", res.data.data.itemList);
            this.$router.push({
              name: "SellerHome",
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
    getCurItemBuyerID() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return "없음";
      } else {
        return curItem.buyerID;
      }
    },
    getCurItemBuyerName() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return "없음";
      } else {
        return curItem.buyerName;
      }
    },
    getCurItemAddress() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return "없음";
      } else {
        return curItem.address;
      }
    },
    getCurItemDeliverymanID() {
      var curItem = store.getters.getCurItem;
      if (curItem === null) {
        return "없음";
      } else {
        return curItem.deliverymanID;
      }
    },
  },
};
</script>
