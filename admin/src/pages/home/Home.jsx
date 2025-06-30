import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethod";

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo (
    () => [
      "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
    ],[]
  );

  useEffect(() => {
  const getStat = async () => {
    try {
      const res = await userRequest.get("/users/stats");
      const formattedStats = res.data.map(item => ({
        name: MONTHS[item._id - 1],
        "Active User": item.total
      }));
      setUserStats(formattedStats);
    } catch (err) {
      console.log(err);
    }
  };
  getStat();
}, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  )
};