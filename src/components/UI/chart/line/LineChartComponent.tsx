import React from 'react';
import style from './LineChartComponent.module.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IChartData, IChartOptions } from '../../../../interfaces/Interfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props{
  options:IChartOptions,
  data:IChartData
}

export function LineChartComponent(props:Props) {
  const { options,data } = props
  return <Line options={options} data={data} className={style.chart} />;
}
