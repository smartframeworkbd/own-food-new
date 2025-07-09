import React, { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";
import ProductsDetailsComponent from "../Components/RootComponents/ProductsDetailsComponent";

const ProductsDetailsPage = () => {
  return (
    <>
  <ProductsDetailsComponent/>
    </>
    // <Fragment>
    //   <Suspense fallback={<Loader></Loader>}>
    //     <Helmet>
    //       <title>Products Details || OwnFood</title>
    //       <meta name='Products Details Page' content='Our OwnFood' />
    //     </Helmet>
    //     <ProductsDetailsComponent />
    //   </Suspense>
    // </Fragment>
  );
};

export default ProductsDetailsPage;
