import { Drawer } from "antd";
const UserViewDetail = (props) => {
  const { isopenDrawer, setIsOpenDrawer, dataDetail, setDataDetail } = props;
  
  return (
    <Drawer
      title="Close Detail"
      onClose={() => {
        setIsOpenDrawer(false);
        setDataDetail(null);
      }}
      open={isopenDrawer}
    >
      {dataDetail ? (
        <>
          <p>Id: {dataDetail._id}</p>
          <p>Full Name: {dataDetail.fullName}</p>
          <p>Phone: {dataDetail.phone}</p>
        </>
      ) : (
        <>
          <p>Không tìm thấy dữ liệu</p>
        </>
      )}
    </Drawer>
  );
};
export default UserViewDetail;
