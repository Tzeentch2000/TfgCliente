import React from "react";
import style from "./RadioChartComponent.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { IRadioChartData } from "../../../../interfaces/Interfaces";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: IRadioChartData;
}

export function RadioChartComponent(props: Props) {
  const legendOptions = {
    title: {
      display: true,
      text: "Legend",
      font: {
        size: 16,
      },
    },
    labels: {
      font: {
        size: 16,
      },
      color: "black", // Color de las letras de la leyenda
      background: "blue", // Color de fondo de las letras de la leyenda
    },
  };

  return (
    <Pie
      data={props.data}
      className={style.radio}
      options={{ plugins: { legend: legendOptions } }}
    />
  );
}
