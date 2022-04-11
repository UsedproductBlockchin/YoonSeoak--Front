import http from "./axios";
//import store from "@/store";

export async function requestDeliveryAccept(deliverymanID, itemID) {
  const response = await http.post("/deliveryman_acceptdeliveryreq", {
    deliverymanID,
    itemID,
  });

  if (response === 200) {
    // let result = response.data;
    // store.dispatch("registerItem", result.itemInfo);
  }

  return response;
}

export async function completeDelivery(deliverymanID, itemID) {
  const response = await http.post("/deliveryman_completeDelivery", {
    deliverymanID,
    itemID,
  });

  if (response === 200) {
    // let result = response.data;
    // store.dispatch("registerItem", result.itemInfo);
  }

  return response;
}
