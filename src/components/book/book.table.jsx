import { Table } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import BookViewDetail from "./book.view.detail";
import BookForm from "./book.form";
import { fetchCategoryAPI } from "../services/service.book";
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
  const fetchCategory = async () => {
    const resCategory = await fetchCategoryAPI();
    if (resCategory.data) {
      setDataCategory(resCategory.data);
    }
    resCategory.map((items) => setDataCategory(items));
    console.log(">>>check dataCategory", dataCategory);
  };

  //Drawer
  const [isViewBook, setIsViewBook] = useState(false);
  const [dataViewBook, setDataViewBook] = useState({});

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      render: () => (
        <div style={{ display: "Flex", gap: "20px" }}>
          <EditOutlined style={{ cursor: "pointer", color: "orange" }} />
          <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
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
      <BookForm
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        dataViewBook={dataViewBook}
        dataCategory={dataCategory}
        setDataCategory={setDataCategory}
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
