import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchBookAPI } from "../components/services/service.book";
const Bookpage = () => {
  const [dataBooks, setDataBooks] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    loadbook();
  }, [current, pageSize]);

  const loadbook = async () => {
    const res = await fetchBookAPI(current, pageSize);
    if (res.data) {
      console.log("check data books", res);
      setDataBooks(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <BookTable
          current={current}
          setCurrent={setCurrent}
          pageSize={pageSize}
          setPageSize={setPageSize}
          dataBooks={dataBooks}
          setDataBooks={setDataBooks}
          loadbook={loadbook}
          total={total}
          setTotal={setTotal}
        />
      </div>
    </>
  );
};

export default Bookpage;
