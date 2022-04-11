import constants from "@/store/constants";

export const common = {
  methods: {
    getItemStateString(partyType, state) {
      console.log("partyType=" + partyType + ", state=" + state);

      var result = "";
      if (partyType === "buyer") {
        if (state === constants.ITEM_STATE_PURCHASECOMPLETE) {
          result = "배송준비중";
        } else if (state === constants.ITEM_STATE_ONDELIVERYCOMPLETE_REQ) {
          result = "배송완료 요청중";
        } else if (state === constants.ITEM_STATE_DELIVERYCOMPLETE) {
          result = "구매확정";
        } else if (state === "") {
          result = "판매중";
        }
      } else if (partyType === "seller") {
        if (state === constants.ITEM_STATE_PURCHASECOMPLETE) {
          result = "판매완료";
        } else if (state === constants.ITEM_STATE_ONDELIVERY_REQ) {
          result = "배송요청중";
        } else if (state === constants.ITEM_STATE_ONDELIVERY) {
          result = "배송중";
        } else if (state === constants.ITEM_STATE_PURCHASECONFIRMED) {
          result = "구매확정";
        } else if (state === constants.ITEM_STATE_PURCHASEDENIED) {
          result = "구매거부";
        } else {
          result = "판매중";
        }
      } else if (partyType === "deliveryman") {
        if (state === constants.ITEM_STATE_ONDELIVERY_REQ) {
          result = "배송 요청중";
        } else if (state === constants.ITEM_STATE_ONDELIVERY) {
          result = "배송중";
        } else if (state === constants.ITEM_STATE_ONDELIVERYCOMPLETE_REQ) {
          result = "배송완료 요청중";
        } else if (state === constants.ITEM_STATE_ONDELIVERYCOMPLETE) {
          result = "배송완료";
        }
      }

      return result;
    },
  },
};
