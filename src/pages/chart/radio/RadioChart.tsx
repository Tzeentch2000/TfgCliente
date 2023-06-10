import React from "react";
import { RadioChartComponent } from "../../../components/UI/chart/radio/RadioChartComponent";
import {
  getCategories,
  getOrdersByCategory,
} from "../../../assets/functions/api";
import {
  ICategory,
  IOrderByCategory,
  IOrders,
  IRadioChartData,
} from "../../../interfaces/Interfaces";
import { getCookie } from "../../../assets/functions/cookie";
import { useLoaderData, useNavigation } from "react-router-dom";
import Spinner from "../../../components/UI/spinner/Spinner";

const RadioChart = () => {
  const navigation = useNavigation();
  const orders = useLoaderData() as IRadioChartData;

  return navigation.state === "loading" ? (
    <Spinner />
  ) : (
    <div>
      <RadioChartComponent data={orders} />
    </div>
  );
};

export default RadioChart;

export async function loader() {
  const token = getCookie("token");
  let error = "";
  if (token === null) {
    error = "Cant load orders";
    return error;
  }
  const totalOrders: IOrderByCategory = { name: [], total: [], colorCode: [] };
  const categories: ICategory[] = await getCategories();
  if (categories === null) throw { message: "Could not fetch events" };

  await Promise.all(
    categories.map(async (c) => {
      const totalOrdersByCategory: IOrderByCategory[] =
        await getOrdersByCategory(c.id, token);
      if (totalOrdersByCategory === null)
        throw { message: "Could not fetch events" };
      totalOrders.name.push(c.name);
      totalOrders.total.push(totalOrdersByCategory.length);
      totalOrders.colorCode.push(c.colorCode);
    })
  );

  return {
    labels: totalOrders.name,
    datasets: [
      {
        data: totalOrders.total,
        backgroundColor: totalOrders.colorCode,
        borderColor: totalOrders.colorCode,
        borderWidth: 1,
      },
    ],
  };
}
