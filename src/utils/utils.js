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
  if (Orders.length > 0) {
    Orders?.map((order) => {
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
  }
};

//goals : obtain the total balance at each order, the toal balance at the last order,
//and the % realized for the each last 6 months, compare to its previous month
let balancesArray = [];
export const getBalance = (
  Orders,
  setbalances,
  setAccountBalance,
  setPercPF
) => {
  let allMonthsTraded = [];

  //creation of an array with all the dates (month + year) traded and a value set initaly to 0
  //ex: ['janvier',2022,0]
  const creationArrayFromtheFirstTrade = () => {
    if (Orders.length > 0) {
      let date1 = new Date(Orders.at(-1).date);
      let date2 = new Date();

      const difference =
        date2.getMonth() -
        date1.getMonth() +
        12 * (date2.getFullYear() - date1.getFullYear());

      //+1 to difference
      for (let i = 0; i < difference + 1; i++) {
        const newDate = new Date();
        newDate.setMonth(newDate.getMonth() - i);
        //take off one day more, because the months doesnt change for some of them -> 31 days NO // 32 days YES
        newDate.setDate(newDate.getDate() - 1);
        const monthToPush = newDate.toLocaleString("default", {
          month: "long",
        });
        const yearToPush = newDate.getFullYear();
        const objectToPush = [monthToPush, yearToPush, 0];
        allMonthsTraded.push(objectToPush);
      }

      //i need to check that the lenght of the array is min 7 without the actual month
      //i check if the actual month is inside
      let actualMonthisTrading = false;
      if (allMonthsTraded.length > 0) {
        allMonthsTraded?.map((month) => {
          const monthToCheck = date2.toLocaleString("default", {
            month: "long",
          });
          const yearToCheck = date2.getFullYear();
          if (month.includes(monthToCheck) && month.includes(yearToCheck))
            actualMonthisTrading = true;
        });
        if (actualMonthisTrading) {
          if (allMonthsTraded.length < 8) {
            while (allMonthsTraded.length < 8) {
              allMonthsTraded.push([0, 0, 0]);
            }
          }
        } else {
          if (allMonthsTraded.length < 7) {
            while (allMonthsTraded.length < 7) {
              allMonthsTraded.push([0, 0, 0]);
            }
          }
        }
      }
    }
  };
  creationArrayFromtheFirstTrade();

  //here i obtain the last balance, and for each month i save the current balance
  if (Orders.length > 0) {
    const ordersReversed = [...Orders].reverse();
    //for every order i need to add each profit to obtain the total balance
    ordersReversed?.map((order, index) => {
      let lastBalance;
      if (balancesArray.length === 0) {
        balancesArray.push(order.profit);
        lastBalance = order.profit;
      } else {
        lastBalance = balancesArray[index - 1] + order.profit;
        balancesArray.push(lastBalance);
      }
      //for each month i save the current balance (i use lastBalance)
      allMonthsTraded?.map((oneMonth, index) => {
        let newDate = new Date(order.date);
        let monthOrder = newDate.toLocaleString("default", {
          month: "long",
        });
        let yearOrder = newDate.getFullYear();
        if (monthOrder === oneMonth[0] && yearOrder === oneMonth[1]) {
          allMonthsTraded[index][2] = lastBalance;
        }
      });
    });
  }

  //function set for the last total balance, and all the balances part ->
  setbalances(balancesArray.reverse());
  setAccountBalance(balancesArray[0]);
  balancesArray = [];

  //the % realized for the each last 6 months, compare to its previous month part ->

  //i need the last 6 months + 1 for Line
  const lastSevenMonth = allMonthsTraded.slice(1, 8);

  //in case the last month of lastSevenMonth has a value of 0, i take back the last balance !==0 from
  // the previous months
  if (lastSevenMonth.length > 0) {
    if (lastSevenMonth.at(-1)[2] === 0) {
      let restMonthsTraded = allMonthsTraded.slice(7);
      let valueToSet = 0;
      for (let i = 0; i < restMonthsTraded.length; i++) {
        if (valueToSet === 0) {
          if (restMonthsTraded[i][2] !== 0) valueToSet = restMonthsTraded[i][2];
        }
      }
      lastSevenMonth.at(-1)[2] = valueToSet;
    }
  }

  //in lastSevenMonth i need every month with a balance !== 0
  //the last month has already been managed previously
  //BUT if lastSevenMonth[i][0] === 0 it is some month add manualy because the activity of trading is < 7months
  if (lastSevenMonth.length > 0 && lastSevenMonth.length < 8) {
    for (let i = lastSevenMonth.length - 1; i > -1; i--) {
      if (lastSevenMonth[i][2] === 0 && lastSevenMonth[i][0] != 0) {
        lastSevenMonth[i][2] = lastSevenMonth[i + 1][2];
      }
    }
  }

  //i dont need anymore the value month and year in my array lastSevenMonth
  let resultArray = [];
  if (lastSevenMonth.length > 0) {
    lastSevenMonth?.map((month) => {
      resultArray.push(month[2]);
    });
  }

  //here i obtain the %
  let resultWithPercToPush = [];
  if (resultArray.length > 0) {
    const tranformPricetoPerc = (x, y) => {
      let difference = x - y;
      let result;
      if (x === 0) result = y;
      else if (y === 0) result = x;
      else {
        result = (difference * 100) / y;
        result = result.toFixed(2);
      }
      resultWithPercToPush.push(result);
    };
    resultArray?.map((price, index) => {
      if (index === 0) return;
      tranformPricetoPerc(resultArray[index - 1], resultArray[index]);
    });
  }
  const resultTodisplay = resultWithPercToPush.reverse();

  //set result for the % part ->
  setPercPF(resultTodisplay);
};

export const GetDateFormatString = (value) => {
  let day = value.slice(8, 10);
  let month = value.slice(5, 7);
  let year = value.slice(0, 4);
  let hour = value.slice(11, 16);
  return `${day}/${month}/${year} ${hour} `;
};

//chart synthese
//i need to display the month traded, one time for all the orders traded in the same month
export const checkIfMonthhasToBeDisplayed = (
  dateOrder,
  monthsAlreadyToDisplay
) => {
  let monthToDisplay = "";

  //collect the month of the order
  const date = new Date(dateOrder);
  const monthToCompare = date.toLocaleString("default", {
    month: "long",
  });

  //format texte
  monthToDisplay =
    monthToCompare.charAt(0).toUpperCase() + monthToCompare.slice(1);

  //i need to return the month to diplay it
  let valuesToReturn = [monthToDisplay];

  //if the month is already in monthsAlreadyToDisplay, so month already display
  //return true to display it, and false to pass next
  if (monthsAlreadyToDisplay.includes(monthToCompare)) {
    valuesToReturn.push(false);
    return valuesToReturn;
  } else {
    monthsAlreadyToDisplay.push(monthToCompare);
    valuesToReturn.push(true);
    return valuesToReturn;
  }
};

export const getLabelsChart1 = (percBTC, percNSQ, percPF) => {
  //labelsGraph-> i am looking for an array with the last 6 months with string format
  //labelsArray  = labelsGraph
  //valuesArray difference betwween PF/BTC and PF/NSQ

  //i collect the last 6 months format string and french
  let labelsChart1 = [];
  let today = new Date();
  let result;
  for (let i = 6; i > 0; i -= 1) {
    result = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthToPush = result.toLocaleString("default", {
      month: "long",
    });
    labelsChart1.push(monthToPush);
  }
  let LabelsArrayChart1 = ["Différence par mois", ...labelsChart1];

  //for every month in percPF i need to compare each iteration[X]  with percBTC and percNSQ iteration[X]
  let ValuesArrayChart1 = [];
  ValuesArrayChart1.push("PF-BTC / PF-NSQ");
  if (percPF.length > 0) {
    percPF?.map((monthPF, index) => {
      let valueToPushBTC = Math.round(monthPF - percBTC[index]);
      let valueToPushNSQ = Math.round(monthPF - percNSQ[index]);

      if (valueToPushBTC > 0) valueToPushBTC = `+${valueToPushBTC}%`;
      else {
        valueToPushBTC = `${valueToPushBTC}%`;
      }
      if (valueToPushNSQ > 0) valueToPushNSQ = `+${valueToPushNSQ}%`;
      else {
        valueToPushNSQ = `${valueToPushNSQ}%`;
      }

      ValuesArrayChart1[index + 1] = `${valueToPushBTC} / ${valueToPushNSQ}`;
    });
  }

  const objectToReturn = [LabelsArrayChart1, ValuesArrayChart1, labelsChart1];

  return objectToReturn;
};

export const getDatasChart2 = (
  numberOfTradesWon,
  numberOfTradesLost,
  numberOfTradesBE,
  numberOfTrades,
  Orders
) => {
  let percTradesWon = (numberOfTradesWon * 100) / numberOfTrades;
  let percTradesBE = (numberOfTradesBE * 100) / numberOfTrades;
  let percTradesLost = (numberOfTradesLost * 100) / numberOfTrades;

  //labelsGraph -> i am looking for an array with all the months traded
  //valuesArray -> and the average of trade by month
  let months = [];
  let averageTradesByMonth;
  const createArrayMonths = () => {
    let arrayMonths = [];
    Orders.map((order) => {
      const date = new Date(order.date);
      const month = date.toLocaleString("default", { month: "long" });
      if (!arrayMonths.includes(month)) arrayMonths.push(month);
    });
    months = arrayMonths.reverse();

    let monthDiffValue;
    if (Orders.length > 0) {
      const firstTradeDate = Orders.slice(-1)[0].date;
      const dateFrom = new Date(firstTradeDate);
      function monthDiff() {
        const now = new Date();
        if (firstTradeDate) {
          monthDiffValue =
            now.getMonth() -
            dateFrom.getMonth() +
            1 +
            12 * (now.getFullYear() - dateFrom.getFullYear());
        }
      }
      monthDiff();
    }

    let result = numberOfTrades / monthDiffValue;
    averageTradesByMonth = result.toFixed(1);
  };
  createArrayMonths();

  //i need three arrays, with each one the number of trades won, lost, and BE
  let tradeWonByMonth = [];
  let tradeLostByMonth = [];
  let tradeBEByMonth = [];
  const getResultSortedinWonLostBE = () => {
    //initailize arrays with the numbers of month
    months?.map(() => {
      tradeWonByMonth.push(0);
      tradeLostByMonth.push(0);
      tradeBEByMonth.push(0);
    });
    Orders?.map((order) => {
      //dynamize each index of each arrays
      months?.map((month, index) => {
        const date = new Date(order.date);
        const monthToCompare = date.toLocaleString("default", {
          month: "long",
        });
        if (monthToCompare === month) {
          if (order.profit < -500) {
            tradeLostByMonth[index]++;
          } else if (order.profit >= -500 && order.profit <= 500) {
            tradeBEByMonth[index]++;
          } else if (order.profit > 500) {
            tradeWonByMonth[index]++;
          }
        }
      });
    });
  };
  getResultSortedinWonLostBE();

  let valueChart2 = [
    numberOfTrades.toString(),
    averageTradesByMonth.toString(),
    `${Math.round(percTradesWon.toString())} %`,
    `${Math.round(percTradesBE.toString())} %`,
    `${Math.round(percTradesLost.toString())} %`,
  ];

  let dataChart2 = [tradeWonByMonth, tradeLostByMonth, tradeBEByMonth];

  const objectToReturn = [valueChart2, months, dataChart2];

  return objectToReturn;
};

export const getDatasChart3 = (Orders, numberOfTrades) => {
  let datasToDisplay = [0, 0, 0, 0, 0, 0, 0, 0];

  Orders?.map((order) => {
    if (order.profit < -5000) datasToDisplay[0] += 1;
    if (order.profit > -5000 && order.profit < -2500) datasToDisplay[1] += 1;
    if (order.profit > -2500 && order.profit < -500) datasToDisplay[2] += 1;
    if (order.profit > -500 && order.profit < 0) datasToDisplay[3] += 1;
    if (order.profit > 0 && order.profit < 500) datasToDisplay[4] += 1;
    if (order.profit > 500 && order.profit < 2500) datasToDisplay[5] += 1;
    if (order.profit > 2500 && order.profit < 5000) datasToDisplay[6] += 1;
    if (order.profit > 5000) datasToDisplay[7] += 1;
  });

  let percsResultByRange = [];
  datasToDisplay?.map((numberOfTradesByRange, index) => {
    percsResultByRange[index] = `${Math.round(
      (numberOfTradesByRange * 100) / numberOfTrades
    )}%`;
  });

  const objectToreturn = [datasToDisplay, percsResultByRange];

  return objectToreturn;
};
