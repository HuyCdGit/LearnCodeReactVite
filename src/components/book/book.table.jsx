import { Table, Popconfirm, App as AntdApp } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import BookViewDetail from "./book.view.detail";
import BookForm from "./book.form";
import { fetchCategoryAPI, deleteBookAPI } from "../services/service.book";
import UpdateBookUncontrolled from "./book.update.uncontrolled";
const BookTable = (props) => {
  const {
    current,
    setCurrent,
    pageSize,
    setPageSize,
    dataBooks,
    total,
    loadbook,
  } = props;
  const { notification } = AntdApp.useApxp();
  // convert VND
  const toVND = (value) => {
    value = value.toString().replace(/\./g, "");
    const formatted = new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replace("₫", "")
      .trim();

    return formatted;
  };
  //call API
  useEffect(() => {
    fetchCategory();
  }, []);
  const [dataCategory, setDataCategory] = useState([]);
  const handleDeleteBook = async (_id) => {
    const res = await deleteBookAPI(_id);
    console.log(">>> check res delete book", res);
    if (res.data) {
      notification.success({
        message: "Delete Success",
        description: "Xóa book thành công",
      });
    } else {
      notification.error({
        message: "Delete Success",
        description: "Xóa book không thành công",
      });
    }
    await loadbook();
  };
  const fetchCategory = async () => {
    const resCategory = await fetchCategoryAPI();
    if (resCategory.data) {
      setDataCategory(resCategory.data);
    }
    resCategory.map((items) => setDataCategory(items));
  };
  //Popconfirm
  const cancel = (Event) => {
    console.log(Event);
  };
  ///

  //Drawer
  const [isViewBook, setIsViewBook] = useState(false);
  const [dataViewBook, setDataViewBook] = useState({});

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdateBook, setIsModalOpenUpdateBook] = useState(false);
  //data update book
  const [dataUpdateBook, setDataUpdateBook] = useState();
  // pagination
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return index + 1 + (current - 1) * pageSize;
      },
    },
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <div>
            <Link
              onClick={() => {
                setIsViewBook(true);
                setDataViewBook(record);
              }}
            >
              {record._id}
            </Link>
          </div>
        );
      },

      key: "_id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
      key: "mainText",
    },
    {
      title: "Giá tiền",
      key: "price",
      render: (_, record) => {
        return <div>{toVND(record.price)}</div>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <div style={{ display: "Flex", gap: "20px" }}>
          <EditOutlined
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              setIsModalOpenUpdateBook(true);
              setDataUpdateBook(record);
            }}
          />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDeleteBook(record._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handleOnchange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current)
      if (pagination.current !== current) {
        setCurrent(pagination.current);
      }

    if (pagination && pagination.pageSize)
      if (pagination.pageSize !== pageSize) {
        setPageSize(pagination.pageSize);
      }
    console.log(
      ">>> check onchange pagination",
      pagination,
      filters,
      sorter,
      extra,
      dataBooks.meta.total
    );
  };
  return (
    <>
      {/* <UpdateBook
        setDataUpdateBook={setDataUpdateBook}
        dataUpdateBook={dataUpdateBook}
        setIsModalOpenUpdateBook={setIsModalOpenUpdateBook}
        isModalOpenUpdateBook={isModalOpenUpdateBook}
        loadbook={loadbook}
      /> */}
      <UpdateBookUncontrolled
        setDataUpdateBook={setDataUpdateBook}
        dataUpdateBook={dataUpdateBook}
        setIsModalOpenUpdateBook={setIsModalOpenUpdateBook}
        isModalOpenUpdateBook={isModalOpenUpdateBook}
        loadbook={loadbook}
      />
      <BookForm
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        dataViewBook={dataViewBook}
        dataCategory={dataCategory}
        setDataCategory={setDataCategory}
        loadbook={loadbook}
      />
      <BookViewDetail
        isViewBook={isViewBook}
        setIsViewBook={setIsViewBook}
        dataViewBook={dataViewBook}
        setDataViewBook={setDataViewBook}
        toVND={toVND}
      />
      <Table
        dataSource={dataBooks}
        columns={columns}
        pagination={{
          total: total,
          defaultCurrent: current,
          defaultPageSize: pageSize,
          showSizeChanger: true,
          position: ["bottomCenter"],
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} of {total} items
              </div>
            );
          },
        }}
        onChange={handleOnchange}
      />
    </>
  );
};
export default BookTable;
