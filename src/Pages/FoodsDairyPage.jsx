import React from "react";
import { Suspense } from "react";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import FoodsDairyComponent from "../Components/RootComponents/FoodsDairyComponent";
import Loader from "../Components/Elements/Loader";

const FoodsDairyPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loader></Loader>}>
        <Helmet>
          <title>Faq || OwnFood</title>
          <meta name='description' content='Our OwnFood' />
        </Helmet>
        <FoodsDairyComponent />
      </Suspense>
    </Fragment>
  );
};

export default FoodsDairyPage;
