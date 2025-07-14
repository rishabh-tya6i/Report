import { useMemo } from 'react';

export const useReportData = (data = [], buyData = [], sellData = []) => {
  const totalPnL = useMemo(() => {
    return data.reduce((sum, item) => sum + item.profit_loss, 0);
  }, [data]);

  const totalQuantity = useMemo(() => {
    return data.reduce((sum, item) => sum + item.quantity, 0);
  }, [data]);

  const totalSell = useMemo(() => {
    return sellData.reduce((sum, item) => sum + item.sell_value, 0);
  }, [sellData]);

  const totalBuy = useMemo(() => {
    return buyData.reduce((sum, item) => sum + item.buy_value, 0);
  }, [buyData]);

  const results = useMemo(() => {
    return Object.entries(
      data.reduce((acc, item) => {
        const key = item.underlying;
        const profit = parseFloat(item.profit_loss) || 0;
        acc[key] = (acc[key] || 0) + profit;
        return acc;
      }, {})
    );
  }, [data]);

  const top_algos = useMemo(() => {
    return Object.entries(
      data.reduce((acc, item) => {
        const key = item.algo_name;
        const profit = parseFloat(item.profit_loss) || 0;
        acc[key] = (acc[key] || 0) + profit;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1]);
  }, [data]);

  const bottom_algos = useMemo(() => {
    return [...top_algos].sort((a, b) => a[1] - b[1]);
  }, [top_algos]);

  const dayWisePnL = useMemo(() => {
    return Object.values(
      data.reduce((acc, item) => {
        const date = item.date;
        const profit = parseFloat(item.profit_loss) || 0;
        if (!acc[date]) {
          acc[date] = { date, totalProfit: 0 };
        }
        acc[date].totalProfit += profit;
        return acc;
      }, {})
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data]);

  const monthWisePnL = useMemo(() => {
    return Object.values(
      data.reduce((acc, item) => {
        const month = item.Month;
        const profit = parseFloat(item.profit_loss) || 0;
        if (!acc[month]) {
          acc[month] = { month, totalProfit: 0 };
        }
        acc[month].totalProfit += profit;
        return acc;
      }, {})
    );
  }, [data]);

  const maxProfit = useMemo(() => {
    const profits = data.filter(item => item.profit_loss > 0);
    return profits.length ? Math.max(...profits.map(item => item.profit_loss)) : 0;
  }, [data]);

  const maxLoss = useMemo(() => {
    const losses = data.filter(item => item.profit_loss < 0);
    return losses.length ? Math.min(...losses.map(item => item.profit_loss)) : 0;
  }, [data]);


  return {
    totalPnL,
    totalQuantity,
    totalSell,
    totalBuy,
    results,
    top_algos,
    bottom_algos,
    dayWisePnL,
    monthWisePnL,
    maxProfit,
    maxLoss
  };
};
