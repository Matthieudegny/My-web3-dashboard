import { useMutation, useQuery } from "react-query";

const fetchOrders = async () => {
  const orders = await fetch("/api/dashboard");
  const result = await orders.json();
  return result;
};
export const useFetchOrders = (onSuccessOrders, onErrorOrder) => {
  return useQuery("getOrders", fetchOrders, {
    onSuccess: onSuccessOrders,
    onError: onErrorOrder,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

const fetchBTCprices = async () => {
  const BTCprices = await fetch(
    "https://api.twelvedata.com/time_series?start_date=2022-05-01&symbol=BTC/USD&interval=1month&apikey=43f166af4d42424fb77e7988214e7c7e"
  );
  const result = await BTCprices.json();
  return result;
};
export const useFetchBTCPrices = (onSuccessOrders, onErrorOrder) => {
  return useQuery("getBTCPrices", fetchBTCprices, {
    onSuccess: onSuccessOrders,
    onError: onErrorOrder,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

const fetchNSQPrices = async () => {
  const NSQPrices = await fetch(
    "https://api.twelvedata.com/time_series?start_date=2022-05-01&symbol=NDX&interval=1month&apikey=43f166af4d42424fb77e7988214e7c7e"
  );
  const result = await NSQPrices.json();
  return result;
};
export const useFetchNSQPrices = (onSuccessOrders, onErrorOrder) => {
  return useQuery("getNSQPrices", fetchNSQPrices, {
    onSuccess: onSuccessOrders,
    onError: onErrorOrder,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

const saveOrder = (orderObject) => {
  return fetch("/api/dashboard", {
    method: "POST",
    body: JSON.stringify(orderObject),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const useSaveOrder = (onSuccessSaveOrder, onErrorSaveOrder) => {
  return useMutation(saveOrder, {
    onSuccess: onSuccessSaveOrder,
    onError: onErrorSaveOrder,
  });
};

const deleteOrder = (id) => {
  return fetch(`/api/dashboard/${id}`, {
    method: "DELETE",
  });
};
export const useDeleteOrder = (onSuccessDeleteOrder, onErrorDeleteOrder) => {
  return useMutation(deleteOrder, {
    onSuccess: onSuccessDeleteOrder,
    onError: onErrorDeleteOrder,
  });
};

const updateOrder = (objetIdANdOrder) => {
  console.log("id in request", objetIdANdOrder[0]);
  console.log("order in request", objetIdANdOrder[1]);
  return fetch(`/api/dashboard/${objetIdANdOrder[0]}`, {
    method: "PATCH",
    body: JSON.stringify(objetIdANdOrder[1]),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const useUpdateOrder = (onSuccessUpdateOrder, onErrorUpdateOrder) => {
  return useMutation(updateOrder, {
    onSuccess: onSuccessUpdateOrder,
    onError: onErrorUpdateOrder,
  });
};
