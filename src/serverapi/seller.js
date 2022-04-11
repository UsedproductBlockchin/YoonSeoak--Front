import http from "./axios";
import store from "@/store";

export async function registerItem(sellerID, itemName, itemPrice, itemDesc) {
  const response = await http.post("/seller_registeritem", {
    sellerID,
    itemName,
    itemPrice,
    itemDesc,
  });

  if (response === 200) {
    let result = response.data;
    store.dispatch("registerItem", result.itemInfo);
  }
  return response;
}

export async function modifyItem(
  sellerID,
  itemID,
  itemName,
  itemPrice,
  itemDesc
) {
  const response = await http.post("/seller_modifyitem", {
    sellerID,
    itemID,
    itemName,
    itemPrice,
    itemDesc,
  });

  if (response === 200) {
    let result = response.data;
    store.dispatch("modifyItem", result.itemInfo);
  }
  return response;
}

export async function getDeliverymanList() {
  const response = await http.post("/seller_getdeliverymanlist", {});

  if (response === 200) {
    // let result = response.data;
    // store.dispatch("registerItem", result.itemInfo);
  }

  return response;
}

export async function requestDelivery(itemID, deliverymanID) {
  const response = await http.post("/seller_requestdelivery", {
    itemID,
    deliverymanID,
  });

  if (response === 200) {
    // let result = response.data;
    // store.dispatch("registerItem", result.itemInfo);
  }

  return response;
}

export async function requestItemFee(itemID, sellerID) {
  const response = await http.post("/seller_requestitemfee", {
    itemID,
    sellerID,
  });

  if (response === 200) {
    // let result = response.data;
    // store.dispatch("modifyItem", result.itemInfo);
  }
  return response;
}

export async function querySaleHistory(sellerID) {
  const response = await http.post("/seller_salehistory", {
    sellerID,
  });

  if (response === 200) {
    // let result = response.data;
    // store.dispatch("registerItem", result.itemInfo);
  }
  return response;
}
