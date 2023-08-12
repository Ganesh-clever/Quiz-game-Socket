import React from 'react'
import { Table } from 'antd';
import { ITable } from '../../interfaces/interface';

const TableContainer: React.FC<ITable> = ({className,columns,dataSource,loading,pageSize}) => {
  return (
    <>
    <Table 
    className={className} 
    loading={loading} 
    columns={columns}
    pagination={pageSize} 
    dataSource={dataSource} />
    </>
  )
}

export default TableContainer;
