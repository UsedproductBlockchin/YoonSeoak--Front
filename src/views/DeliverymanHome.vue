<template>
  <v-container>
    <MainMenu />
    <v-row justify="center">
      <v-card>
        <v-app-bar color="secondary" flat>
          <v-spacer />
          <v-toolbar-title class="white--text"
            >배송할 상품 목록</v-toolbar-title
          >
          <v-spacer />
        </v-app-bar>
        <div style="min-width: 800px; background-color: #eeeeee" class="pa-10">
          <v-col
            align-self="center"
            v-if="$store.getters.getItemList.length === 0"
            ><div class="ddd">배송할 물품이 없습니다!</div></v-col
          >
          <v-list
            three-line
            style="background-color: #eeeeee"
            v-if="$store.getters.getItemList.length > 0"
          >
            <template v-for="(item, index) in $store.getters.getItemList">
              <v-card v-if="isItemAvail(item.state)" :key="index" class="ma-3">
                <v-divider :key="index"></v-divider>

                <v-list-item :key="item.itemID">
                  <v-list-item-content>
                    <v-list-item-title
                      >상품명: {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >배송지: {{ item.address }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-btn color="error" large @click="showItemDetail(item)"
                    >{{ getItemStateString("deliveryman", item.state) }}
                  </v-btn>
                </v-list-item>
              </v-card>
            </template>
          </v-list>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";
import { common } from "@/mixins/common";
import constants from "@/store/constants";
import store from "@/store";

export default {
  name: "SellerHome",
  components: {
    MainMenu,
  },
  data: () => ({}),
  mixins: [common],
  mounted() {
    console.log("itemList=" + JSON.stringify(store.getters.getItemList));
  },
  methods: {
    registerNewItem() {
      this.$store.commit("setCurItem", null);
      this.$router.push("/seller_registernewitem");
    },
    showItemDetail(item) {
      this.$store.commit("setCurItem", item);

      if (
        item.state === constants.ITEM_STATE_ONDELIVERY_REQ ||
        item.state === constants.ITEM_STATE_ONDELIVERY ||
        item.state === constants.ITEM_STATE_ONDELIVERYCOMPLETE_REQ
      ) {
        this.$router.push({ name: "DeliverymanDetailItem", query: {} });
      } else {
        this.$router.push("/seller_edititem");
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
