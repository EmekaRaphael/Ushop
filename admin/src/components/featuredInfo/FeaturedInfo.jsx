import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { userRequest } from "../../requestMethod";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [revenuePerc, setRevenuePerc] = useState(0);

  const [salesData, setSalesData] = useState([]);
  const [salesPerc, setSalesPerc] = useState(0);

  const [costData, setCostData] = useState([]);
  const [costPerc, setCostPerc] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await userRequest.get("/orders/income");
        setIncome(incomeRes.data);
        if (incomeRes.data.length >= 2) {
          const perc = ((incomeRes.data[1].total * 100) / incomeRes.data[0].total) - 100;
          setRevenuePerc(perc);
        }

        const salesRes = await userRequest.get("/orders/monthly-sales-stats");
        setSalesData(salesRes.data);
        if (salesRes.data.length >= 2) {
          const perc = ((salesRes.data[1].totalSold * 100) / salesRes.data[0].totalSold) - 100;
          setSalesPerc(perc);
        }

        const costRes = await userRequest.get("/orders/monthly-cost-stats");
        setCostData(costRes.data);
        if (costRes.data.length >= 2) {
          const perc = ((costRes.data[1].totalCost * 100) / costRes.data[0].totalCost) - 100;
          setCostPerc(perc);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total ?? 0}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(revenuePerc)}{" "}
            {revenuePerc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {salesData[1]?.totalSold ?? 0} units
          </span>
          <span className="featuredMoneyRate">
            {Math.floor(salesPerc)}{" "}
            {salesPerc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ${costData[1]?.totalCost ?? 0}
          </span>
          <span className="featuredMoneyRate">
            {Math.floor(costPerc)}{" "}
            {costPerc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}