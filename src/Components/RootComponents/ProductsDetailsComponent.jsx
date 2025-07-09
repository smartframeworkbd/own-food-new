import React, { useEffect, useState } from "react";
import InstantFood from "../ChildComponents/InstantFood";
import ProductsDetails from "../ChildComponents/ProductsDetails";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import axios from "axios";
import { BaseURL } from "../../Helper/config";
import RelatedFood from "../ChildComponents/RelatedFood";

const ProductsDetailsComponent = () => {
  const [productCategoryId, setProductCategoryId] = useState("")
  const [productType, setProductType] = useState("")
  const [relatedFoodData, setRelatedFoodData] = useState([])
  const token = localStorage.getItem("Token");
  const getRelatedFood = async () => {

    if (productCategoryId !== undefined) {
      const url = `${BaseURL}/related-food?categoryId=${productCategoryId}&foodType=${productType || 'PREORDER'}`;
      const response = await axios.get(URL, {
        headers: {
          token: `${token}`,
        },
      });
      if (response.data.status == "Success") {
        setRelatedFoodData(response?.data?.data)
      }

    }



  }
  useEffect(() => {
    getRelatedFood()
  }, [productCategoryId])
  return (
    <>
      <Header />
      <div className="Space__For__Header"></div>
      <ProductsDetails setProductType={setProductType} setProductCategoryId={setProductCategoryId} />

      <RelatedFood data={relatedFoodData} />
      {/* <InstantFood title={"Related"} /> */}
      {/* <Footer /> */}
    </>
  );
};

export default ProductsDetailsComponent;
