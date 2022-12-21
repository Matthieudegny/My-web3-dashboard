const perf2021 = 10;
export const getAnnualPerf = (setannualPerf, accountBalance) => {
  let perfThisYear = accountBalance - perf2021;
  let perfThisYearPercent = (perfThisYear * 100) / perf2021;
  setannualPerf(`${perfThisYear}$/${perfThisYearPercent}%`);
};

export const getMonthlyPerf = (Orders, setMonthlyPerf) => {
  let month = new Date();
  month = month.getMonth() + 1;
  let monthlyPerf = 0;
  Orders?.map((order) => {
    if (order.date.slice(5, 7) == month.toString()) monthlyPerf += order.profit;
  });
  setMonthlyPerf(`${monthlyPerf}$`);
};

export const getPricesAndTransformToPerc = (
  arrayPrices,
  arrayPerc,
  setFunction,
  result
) => {
  result.values?.map((resultOneMonth, index) => {
    if (arrayPrices.length < 7) {
      arrayPrices.push(Math.round(resultOneMonth.open));
    }
  });
  if (arrayPrices.length > 0) {
    //transform price to %
    const tranformPricetoPerc = (x, y) => {
      let difference = x - y;
      let result = (difference * 100) / y;
      // result = Math.round(result);
      result = result.toFixed(2);
      arrayPerc.push(result);
    };
    arrayPrices?.map((price, index) => {
      if (index === 0) return;
      tranformPricetoPerc(arrayPrices[index - 1], arrayPrices[index]);
    });
    const resultTodisplay = arrayPerc.reverse();

    setFunction(resultTodisplay);
  }
};

export const sortTradeWonOrLostOrBE = (
  Orders,
  setnumberOfTradesWon,
  setnumberOfTradesLost,
  setnumberOfTradesBE
) => {
  let totalTradesWon = 0;
  let totalTradesLost = 0;
  let totalTradesBE = 0;
  Orders.map((order) => {
    if (order.profit < -500) {
      totalTradesLost++;
    } else if (order.profit >= -500 && order.profit <= 500) {
      totalTradesBE++;
    } else if (order.profit > 500) {
      totalTradesWon++;
    }
  });

  setnumberOfTradesWon(totalTradesWon);
  setnumberOfTradesLost(totalTradesLost);
  setnumberOfTradesBE(totalTradesBE);
};

let balancesArray = [];
export const getBalance = (Orders, setbalances, setAccountBalance) => {
  const ordersReversed = [...Orders].reverse();
  ordersReversed.map((order, index) => {
    if (balancesArray.length === 0) balancesArray.push(order.profit);
    else {
      let lastBalance = balancesArray[index - 1] + order.profit;
      balancesArray.push(lastBalance);
    }
  });
  setbalances(balancesArray.reverse());
  setAccountBalance(balancesArray[0]);
};

export const GetDateFormatString = (value) => {
  let day = value.slice(8, 10);
  let month = value.slice(5, 7);
  let year = value.slice(0, 4);
  let hour = value.slice(11, 16);
  return `${day}/${month}/${year} ${hour} `;
};
