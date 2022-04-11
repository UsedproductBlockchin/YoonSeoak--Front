import http from "./axios";
//import store from "@/store";

export async function queryPurchasedItemList(buyerID) {
  var listType = "PURCHASED";
  const response = await http.post("/buyer_getitemlist", {
    buyerID,
    listType,
  });

  if (response === 200) {
    // let result = response.data;
    // store.commit("updateItemList", result.itemList);
  }
  return response;
}

export async function queryOnSaleItemList(buyerID) {
  var listType = "ONSALE";
  const response = await http.post("/buyer_getitemlist", {
    buyerID,
    listType,
  });

  if (response === 200) {
    // let result = response.data;
    // store.commit("updateItemList", result.itemList);
  }
  return response;
}

export async function purchaseItem(itemID, buyerID, deliveryAddress) {
  const response = await http.post("/buyer_requestpurchase", {
    itemID,
    buyerID,
    deliveryAddress,
  });

  if (response === 200) {
    // let result = response.data;
    // store.dispatch("registerItem", result.itemInfo);
  }
  return response;
}

export async function confirmItemGet(itemID, buyerID) {
  const response = await http.post("/buyer_confirmitemget", {
    itemID,
    buyerID,
  });

  if (response === 200) {
    // let result = response.data;
    // store.dispatch("registerItem", result.itemInfo);
  }
  return response;
}

export async function confirmPurchase(itemID, buyerID) {
  const response = await http.post("/buyer_confirmpurchase", {
    itemID,
    buyerID,
  });

  if (response === 200) {
    // let result = response.data;
    // store.dispatch("registerItem", result.itemInfo);
  }
  return response;
}

export async function denyPurchase(itemID, buyerID, denialReason) {
  const response = await http.post("/buyer_denypurchase", {
    itemID,
    buyerID,
    denialReason,
  });

  if (response === 200) {
    // let result = response.data;
    // store.dispatch("registerItem", result.itemInfo);
  }
  return response;
}

export async function queryPurchaseHistory(buyerID) {
  const response = await http.post("/buyer_purchasehistory", {
    buyerID,
  });

  if (response === 200) {
    // let result = response.data;
    // store.dispatch("registerItem", result.itemInfo);
  }
  return response;
}
