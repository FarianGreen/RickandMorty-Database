import React, { useState, useEffect } from "react";
import "./header.css";

const Header = (props) => {
  const [info, setInfo] = useState();

  useEffect(() => {
    updateInfo();
  }, [props.page]);

  function updateInfo() {
    const { data } = props;
    const { page } = props;

    if (!page) {
      return;
    }

    return data(page).then((info) => {
      setInfo(info);
    });
  }

  if (!info) {
    return;
  }
  return (
    <div className="header">
      <div className="header-title">Welcome to R&M database</div>
      <div className="pagination">
        <div className="btn-prev" onClick={() => props.updatePage(info.prev)}>
          (-)
        </div>
        <div className="count-pages">{info.pages}</div>
        <div className="btn-next" onClick={() => props.updatePage(info.next)}>
          (+){info.next}
        </div>
      </div>
    </div>
  );
};
export default Header;
