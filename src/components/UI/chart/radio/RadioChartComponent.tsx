import React from 'react';
import style from './RadioChartComponent.module.scss'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { IRadioChartData } from '../../../../interfaces/Interfaces';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props{
  data:IRadioChartData
}

export function RadioChartComponent(props:Props) {
  return <Pie data={props.data} className={style.radio}/>;
}
