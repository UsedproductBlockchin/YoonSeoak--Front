<template>
  <v-container>
    <MainMenu />
    <v-row justify="center">
      <v-card>
        <v-app-bar color="secondary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text">판매 상품 목록</v-toolbar-title>
          <v-spacer />
        </v-app-bar>
        <div style="min-width: 800px; background-color: #eeeeee" class="pa-10">
          <v-list three-line style="background-color: #eeeeee">
            <template v-for="(item, index) in $store.getters.getItemList">
              <v-card v-if="isItemAvail(item.state)" :key="index" class="ma-3">
                <v-divider :key="index"></v-divider>

                <v-list-item :key="item.itemID">
                  <v-list-item-content>
                    <v-list-item-title
                      >상품명: {{ item.name }} 가격:
                      {{ item.price }}원</v-list-item-title
                    >
                    <v-list-item-subtitle
                      >판매 상태:
                      {{
                        getItemStateString("seller", item.state)
                      }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-btn color="error" large @click="showItemDetail(item)"
                    >상세보기</v-btn
                  >
                </v-list-item>
              </v-card>
            </template>
          </v-list>
          <!-- <v-row
            v-for="item in $store.getters.getItemList"
            :key="item.id"
            justify="space-getween"
          >
            <v-col cols="10"> {{ item.name }} - {{ item.price }}원 </v-col>
            <v-col cols="1">
              <v-btn>상세보기</v-btn>
            </v-col>
          </v-row> -->
        </div>
      </v-card>
    </v-row>
    <v-row justify="center" class="pa-6">
      <v-btn color="primary" width="300" large @click="registerNewItem()"
        >신규상품 등록</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";
import { common } from "@/mixins/common";
import constants from "@/store/constants";

export default {
  name: "SellerHome",
  components: {
    MainMenu,
  },
  data: () => ({}),
  mixins: [common],
  mounted() {
    console.log("itemList=" + JSON.stringify(this.$store.getters.getItemList));
  },
  methods: {
    registerNewItem() {
      this.$store.commit("setCurItem", null);
      this.$router.push("/seller_registernewitem");
    },
    showItemDetail(item) {
      this.$store.commit("setCurItem", item);

      if (
        item.state === constants.ITEM_STATE_PURCHASECOMPLETE ||
        item.state === constants.ITEM_STATE_ONDELIVERY_REQ ||
        item.state === constants.ITEM_STATE_ONDELIVERY
      ) {
        this.$router.push({
          name: "SellerDeliveryRequest",
          query: { itemState: item.state },
        });
      } else if (item.state === constants.ITEM_STATE_PURCHASECONFIRMED) {
        this.$router.push({
          name: "SellerApplyItemFee",
        });
      } else if (item.state === constants.ITEM_STATE_PURCHASEDENIED) {
        this.$router.push({
          name: "SellerItemPurchaseDenied",
        });
      } else {
        this.$router.push({
          name: "SellerEditItem",
          query: { itemState: item.state },
        });
      }
    },
    isItemAvail(itemState) {
      if (itemState == this.$store.getters.CONSTANTS.ITEM_STATE_CYCLEFINISHED) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.v-list-item-subtitle {
  color: #f4f400 !important;
}
</style>
