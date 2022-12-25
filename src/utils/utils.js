export const getMonthlyPerf = (Orders, setMonthlyPerf) => {
  let month = new Date();
  month = month.getMonth() + 1;
  let monthlyPerf = 0;
  let allMonths = [];
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
export const getBalance = (
  Orders,
  setbalances,
  setAccountBalance,
  setannualPerf
) => {
  let lastSevenMonthBalancesPF = [];

  //creation of an array with all the month traded and a value set initaly to 0
  const creationArrayFromtheFirstTrade = () => {
    let date1 = new Date(Orders.at(-1).date);
    let date2 = new Date();

    const difference =
      date2.getMonth() -
      date1.getMonth() +
      12 * (date2.getFullYear() - date1.getFullYear());

    for (let i = 0; i < difference; i++) {
      const newDate = new Date();
      newDate.setMonth(newDate.getMonth() - i);
      const monthToPush = newDate.toLocaleString("default", { month: "long" });
      const objectToPush = [monthToPush, 0];
      lastSevenMonthBalancesPF.push(objectToPush);
    }
  };
  console.log("lastSevenMonthBalancesPF", lastSevenMonthBalancesPF);

  const ordersReversed = [...Orders].reverse();
  //for every order i nneed to add each profit to obtain the total balance
  ordersReversed.map((order, index) => {
    if (index === 0) {
      const firstTradeDate = order.createdAt;
      creationArrayFromtheFirstTrade(firstTradeDate);
    }
    if (balancesArray.length === 0) balancesArray.push(order.profit);
    else {
      let lastBalance = balancesArray[index - 1] + order.profit;
      balancesArray.push(lastBalance);

      //for each month i save the balance
      lastSevenMonthBalancesPF?.map((monthArray, index) => {
        let monthOrder = new Date(order.date);
        monthOrder = monthOrder.toLocaleString("default", {
          month: "long",
        });
        if (monthOrder === monthArray[0]) {
          lastSevenMonthBalancesPF[index][1] = lastBalance;
        }
      });
    }
  });

  //i need the last 7 months for LineEvolution
  const lastSevenMonth = lastSevenMonthBalancesPF.slice(0, 7);

  //i abolutly need to have a value for my last index in lastSevenMonthBalancesPF, so i gonna manage it
  //to looking for the nearest monst and get a value
  if (lastSevenMonth.at(-1)[1] != 0) {
    console.log("lllllllllll");
  }

  setbalances(balancesArray.reverse());
  setAccountBalance(balancesArray[0]);
  getAnnualPerf(setannualPerf, balancesArray[0]);
  balancesArray = [];

  //i dont need anymore the value month in my object
  let result = [];
  lastSevenMonthBalancesPF?.map((month) => {
    result.push(month[1]);
  });

  let resultWithPercToPush = [];
  //i push the value of the balance for the month traded, so some month are with a value of 0 (month no traded)
  //i need to loop and correct it
  result?.map((trade, index) => {
    if (trade === 0) console.log("0a modif");
  });

  // const tranformPricetoPerc = (x, y) => {
  //   console.log(x, y);
  //   let difference = x - y;
  //   let result = (difference * 100) / y;
  //   // result = Math.round(result);
  //   result = result.toFixed(2);
  //   resultWithPercToPush.push(result);
  // };
  // lastSevenMonthBalancesPF?.map((price, index) => {
  //   if (index === 0) return;
  //   tranformPricetoPerc(
  //     lastSevenMonthBalancesPF[index - 1][1],
  //     lastSevenMonthBalancesPF[index][1]
  //   );
  // });
};

export const GetDateFormatString = (value) => {
  let day = value.slice(8, 10);
  let month = value.slice(5, 7);
  let year = value.slice(0, 4);
  let hour = value.slice(11, 16);
  return `${day}/${month}/${year} ${hour} `;
};

const perf2021 = 1000;
const getAnnualPerf = (setannualPerf, accountBalance) => {
  let perfThisYear = accountBalance - perf2021;
  let perfThisYearPercent = (perfThisYear * 100) / perf2021;
  setannualPerf(`${perfThisYear}$/${perfThisYearPercent}%`);
};

export const getPFLastSevenMonthsResults = (Orders, setPercPF) => {
  // let lastSevenMonthBalancesPF = [];
  // //i obtain an array with 7 objects, one object is one month, and an initial value to 0
  // for (let i = 0; i < 7; i++) {
  //   const newDate = new Date();
  //   newDate.setMonth(newDate.getMonth() - i);
  //   const monthToPush = newDate.toLocaleString("default", { month: "long" });
  //   const objectToPush = [monthToPush, 0];
  //   lastSevenMonthBalancesPF.push(objectToPush);
  // }
  // //i fill lastSevenMonthBalancesPF depends on the orders.profits
  // Orders?.map((order) => {
  //   lastSevenMonthBalancesPF?.map((monthArray, index) => {
  //     let monthOrder = new Date(order.date);
  //     monthOrder = monthOrder.toLocaleString("default", {
  //       month: "long",
  //     });
  //     if (monthOrder === monthArray[0]) {
  //       lastSevenMonthBalancesPF[index][1] += order.profit;
  //     }
  //   });
  // });
  // //i return only an array with the values, not month in letter
  // let result = [];
  // let resultWithPercToPush = [];
  // lastSevenMonthBalancesPF?.map((month) => {
  //   result.push(month[1]);
  // });
  // console.log("result", result);
  // let balanceAccount = lastBalance;
  // let lastSevenMonthBalances = [];
  // result?.map((month, index) => {
  //   if (index === 0) lastSevenMonthBalances.push(balanceAccount);
  //   console.log("balanceAccount", lastBalance);
  //   let valueToPush = month - balanceAccount;
  //   lastSevenMonthBalances.push(valueToPush);
  //   balanceAccount = balanceAccount - month;
  // });
  // console.log("lastSevenMonthBalances", lastSevenMonthBalances);
  // const tranformPricetoPerc = (x, y) => {
  //   console.log(x, y);
  //   let difference = x - y;
  //   let result = (difference * 100) / y;
  //   // result = Math.round(result);
  //   result = result.toFixed(2);
  //   resultWithPercToPush.push(result);
  // };
  // result?.map((price, index) => {
  //   if (index === 0) return;
  //   tranformPricetoPerc(result[index - 1], result[index]);
  // });
  // getPricesAndTransformToPerc(pricesPf, percentagesPF, setPercPF, result);
};
