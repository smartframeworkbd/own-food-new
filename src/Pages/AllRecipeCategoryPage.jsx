import React, { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";
const AllRecipeCategoryComponent = React.lazy(() =>
  import("../Components/RootComponents/AllRecipeCategoryComponent")
);
const AllRecipeCategoryPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loader></Loader>}>
        <Helmet>
          <title>Home || OwnFood</title>
          <meta name='description' content='Our OwnFood' />
        </Helmet>
        <AllRecipeCategoryComponent />
      </Suspense>
    </Fragment>
  );
};

export default AllRecipeCategoryPage;
