<template>
  <v-container>
    <MainMenu />
    <v-row justify="center">
      <v-card style="min-height: 600px">
        <v-app-bar color="secondary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text" v-if="itemListOnSale"
            >판매중인 상품 목록</v-toolbar-title
          >

          <v-toolbar-title class="white--text" v-if="!itemListOnSale"
            >구매한 상품 목록</v-toolbar-title
          >
          <v-spacer />
        </v-app-bar>
        <div style="min-width: 800px; background-color: #eeeeee" class="pa-10">
          <v-col
            align-self="center"
            v-if="$store.getters.getItemList.length === 0"
            ><div class="ddd">구매한 상품이 없습니다!</div></v-col
          >
          <v-virtual-scroll
            :bench="0"
            :items="$store.getters.getItemList"
            height="500"
            item-height="74"
          >
            <template v-slot:default="{ item }">
              <v-card v-if="isItemAvail(item.state)" :key="index" class="ma-3">
                <v-divider :key="index"></v-divider>

                <v-list-item :key="item.itemID">
                  <v-list-item-content>
                    <v-list-item-title
                      >상품명: {{ item.name }} 가격: {{ item.price }}원
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >판매자ID: {{ item.sellerID }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-btn
                    color="error"
                    large
                    @click="showDetailItemInfo(item)"
                    v-if="itemListOnSale"
                    >상세보기</v-btn
                  >
                  <v-btn
                    color="error"
                    large
                    @click="showDetailItemInfo(item)"
                    v-if="!itemListOnSale"
                    >{{ getItemStateString("buyer", item.state) }}</v-btn
                  >
                </v-list-item>
              </v-card>
            </template>
          </v-virtual-scroll>
        </div>
      </v-card>
    </v-row>
    <v-row justify="center" class="pa-6">
      <v-col cols="2" class="pr-3">
        <v-btn
          :disabled="!itemListOnSale"
          color="primary"
          large
          @click="showPurchasedItemList()"
          >구매한 상품 조회하기</v-btn
        >
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="2" class="pl-3">
        <v-btn
          :disabled="itemListOnSale"
          color="primary"
          large
          @click="showOnSaleItemList()"
          >판매중인 상품 조회하기</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";
import * as buyer from "@/serverapi/buyer";
import store from "@/store";
import { common } from "@/mixins/common";
import constants from "@/store/constants";

export default {
  name: "BuyerHome",
  components: {
    MainMenu,
  },
  data: () => ({
    itemListOnSale: true,
  }),
  created() {
    this.itemListOnSale = this.$route.query.onSaleItemList;
  },
  mixins: [common],
  methods: {
    registerNewItem() {
      this.$store.commit("setCurItem", null);
      this.$router.push("/seller_registernewitem");
    },
    showDetailItemInfo(item) {
      this.$store.commit("setCurItem", item);

      if (this.itemListOnSale === true) {
        console.log("isListOnSale == true");
        this.$router.push({ name: "BuyerItemPurchase" });
      } else {
        console.log("isListOnSale == false");

        if (item.state === constants.ITEM_STATE_ONDELIVERYCOMPLETE_REQ) {
          this.$router.push({ name: "BuyerGetItem" });
        } else if (item.state === constants.ITEM_STATE_DELIVERYCOMPLETE) {
          this.$router.push({ name: "BuyerConfirmPurchase" });
        } else {
          this.$router.push("/buyer_detailitem");
        }
      }
    },
    isItemAvail(itemState) {
      if (itemState == this.$store.getters.CONSTANTS.ITEM_STATE_CYCLEFINISHED) {
        return false;
      } else {
        return true;
      }
    },
    showPurchasedItemList() {
      buyer
        .queryPurchasedItemList(store.getters.getLoginID)
        .then((res) => {
          console.log("res=" + JSON.stringify(res));
          if (res.data.result === 0) {
            store.commit("updateItemList", res.data.data.itemList);
            this.itemListOnSale = false;
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    },
    showOnSaleItemList() {
      buyer
        .queryOnSaleItemList(store.getters.getLoginID)
        .then((res) => {
          console.log("res=" + JSON.stringify(res));
          if (res.data.result === 0) {
            store.commit("updateItemList", res.data.data.itemList);
            this.itemListOnSale = true;
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    },
  },
};
</script>

<style scoped>
.ddd {
  text-align: center;
}
</style>
