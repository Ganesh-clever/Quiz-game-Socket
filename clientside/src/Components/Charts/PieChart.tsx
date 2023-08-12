import React from 'react'
import { Pie } from '@ant-design/plots';
import { IPiechart } from '../../interfaces/interface';

const PieChart : React.FC<IPiechart> = ({className,data}) => {
      const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
    }
  return (
    <>
    <Pie className={className} {...config} />
    </>
  )
}

export default PieChart;
