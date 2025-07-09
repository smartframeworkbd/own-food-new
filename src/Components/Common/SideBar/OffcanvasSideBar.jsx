import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import getTranslation from "../../../Helper/getTranslationUtility";
import { useContext } from "react";
import labels from "../../../translationData/menu.json";
import { LanguageContext } from "../../../Context/LanguageContext";


const OffcanvasSideBar = ({
  show,
  toggleOffcanvas,
  handleCloseSidebar,
  data,
}) => {

  const { currentLanguage } = useContext(LanguageContext);

  return (
    <>
      {" "}
      <Offcanvas
        show={show}
        toggleOffcanvas={toggleOffcanvas}
        onHide={handleCloseSidebar}
        style={{ width: 319 }}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            <div className='d-flex align-items-center ms-4'>
              <div onClick={toggleOffcanvas}>
                {" "}
                <FaArrowLeft />
              </div>
              <div className='ms-5'>
                {" "}
                <h4 style={{fontSize:"16px", fontWeight:"bold"}}>{getTranslation("Categry", currentLanguage, labels)}</h4>
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {data.map((item) => (
            <div className='sidebar-item'>
                {" "}
                <Link className="sidebar-titleinside" to={`/Category/${item?._id}`}>{item.categoryName}</Link>
            </div>
          ))}
          {/* <div className='secoundTitle'> ALL FOOD</div> */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffcanvasSideBar;
