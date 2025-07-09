import React, { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";
const SingleRecipeFoodComponent = React.lazy(() =>
  import("../Components/RootComponents/SingleRecipeFoodComponent")
);
const SingleRecipeFoodPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loader></Loader>}>
        <Helmet>
          <title>Home || OwnFood</title>
          <meta name='description' content='Our OwnFood' />
        </Helmet>
        <SingleRecipeFoodComponent />
      </Suspense>
    </Fragment>
  );
};

export default SingleRecipeFoodPage;
