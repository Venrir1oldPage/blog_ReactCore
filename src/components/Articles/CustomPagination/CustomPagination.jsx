import { ConfigProvider, Pagination } from 'antd'

const style = {
  colorBgContainer: '#1677ff',
  colorPrimary: '#e7eaf1',
  colorPrimaryHover: '#b7b7ff',
  fontSize:12,
}
  

const CustomPafination = ({ onChange, paginationCount, current }) => {
  return (
    <ConfigProvider theme={{ components: { Pagination: style } }}>
      <Pagination
        style={style}
        current={current}
        total={paginationCount}
        defaultCurrent={1}
        defaultPageSize={5}
        onChange={(el) => onChange(el)}
        showSizeChanger={false}
      />
    </ConfigProvider>
  )
}

export default CustomPafination
