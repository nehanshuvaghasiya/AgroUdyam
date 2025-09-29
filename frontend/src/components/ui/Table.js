// Table Component Wrapper
import React from 'react';
import { Table as AntTable } from 'antd';

const Table = ({ 
  columns = [],
  dataSource = [],
  loading = false,
  pagination = true,
  size = 'middle',
  bordered = false,
  showHeader = true,
  scroll,
  rowKey = 'id',
  rowSelection,
  className = '',
  style = {},
  onRow,
  ...props 
}) => {
  return (
    <AntTable
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      size={size}
      bordered={bordered}
      showHeader={showHeader}
      scroll={scroll}
      rowKey={rowKey}
      rowSelection={rowSelection}
      className={`krishi-table ${className}`}
      style={style}
      onRow={onRow}
      {...props}
    />
  );
};

export default Table;
