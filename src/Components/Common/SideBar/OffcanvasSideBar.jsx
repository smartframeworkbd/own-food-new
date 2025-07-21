import { Offcanvas } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import getTranslation from "../../../Helper/getTranslationUtility";
import { useContext } from "react";
import labels from "../../../translationData/menu.json";
import { LanguageContext } from "../../../Context/LanguageContext";

const OffcanvasSideBar = ({ show, handleCloseSidebar, data }) => {
  const { currentLanguage } = useContext(LanguageContext);

  return (
    <Offcanvas
      show={show}
      onHide={handleCloseSidebar}
      placement="start"
      style={{ width: 319 }}
    >
      <Offcanvas.Header>
        <Offcanvas.Title>
          <div className="d-flex align-items-center ms-4">
            <div onClick={handleCloseSidebar}>
              <FaArrowLeft />
            </div>
            <div className="ms-5">
              <h4 style={{ fontSize: "16px", fontWeight: "bold" }}>
                {getTranslation("Categry", currentLanguage, labels)}
              </h4>
            </div>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {data.map((item) => (
          <div className="sidebar-item" key={item?._id}>
            <Link
              className="sidebar-titleinside"
              to={`/all-food?categoryId=${item?._id}`}
              onClick={handleCloseSidebar}
            >
              {item.categoryName}
            </Link>
          </div>
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasSideBar;
