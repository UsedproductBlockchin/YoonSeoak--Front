import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const onlyAuthUser = (to, from, next) => {
  console.log(JSON.stringify(to));
  if (store.state.isLogin === false && to.name !== "Login") {
    alert("먼저 로그인을 수행하세요!");
    next("/");
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/home_seller",
    name: "SellerHome",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SellerHome.vue"),
  },
  {
    path: "/home_buyer",
    name: "BuyerHome",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BuyerHome.vue"),
  },
  {
    path: "/home_deliveryman",
    name: "DeliverymanHome",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DeliverymanHome.vue"),
  },
  {
    path: "/seller_registernewitem",
    name: "SellerRegisterNewItem",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/SellerDetailItemInfo.vue"
      ),
  },
  {
    path: "/seller_edititem",
    name: "SellerEditItem",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/SellerDetailItemInfo.vue"
      ),
  },
  {
    path: "/seller_deliveryreq",
    name: "SellerDeliveryRequest",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/SellerDeliveryRequest.vue"
      ),
  },
  {
    path: "/seller_applyitemfee",
    name: "SellerApplyItemFee",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SellerApplyItemFee.vue"),
  },
  {
    path: "/seller_itemdenied",
    name: "SellerItemPurchaseDenied",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/SellerItemPurchaseDenied.vue"
      ),
  },
  {
    path: "/seller_salehistory",
    name: "QuerySaleHistory",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/QuerySaleHistory.vue"),
  },
  {
    path: "/buyer_itempurchase",
    name: "BuyerItemPurchase",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BuyerItemPurchase.vue"),
  },
  {
    path: "/buyer_detailitem",
    name: "BuyerDetailItem",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/BuyerDetailItemInfo.vue"
      ),
  },
  {
    path: "/buyer_getitem",
    name: "BuyerGetItem",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BuyerGetItem.vue"),
  },
  {
    path: "/buyer_confirmpurchase",
    name: "BuyerConfirmPurchase",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/BuyerConfirmPurchase.vue"
      ),
  },
  {
    path: "/buyer_purchasehistory",
    name: "QueryPurchaseHistory",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/QueryPurchaseHistory.vue"
      ),
  },
  {
    path: "/deliveryman_detailitem",
    name: "DeliverymanDetailItem",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/DeliverymanDetailItemInfo.vue"
      ),
  },
  {
    path: "*",
    name: "Else",
    beforeEnter: onlyAuthUser,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
