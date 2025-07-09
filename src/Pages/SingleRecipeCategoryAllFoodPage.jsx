import React, { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";
const SingleRecipeCategoryAllFoodComponent = React.lazy(() =>
  import("../Components/RootComponents/SingleRecipeCategoryAllFoodComponent")
);
const SingleRecipeCategoryAllFoodPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loader></Loader>}>
        <Helmet>
          <title>Home || OwnFood</title>
          <meta name='description' content='Our OwnFood' />
        </Helmet>
        <SingleRecipeCategoryAllFoodComponent />
      </Suspense>
    </Fragment>
  );
};

export default SingleRecipeCategoryAllFoodPage;
