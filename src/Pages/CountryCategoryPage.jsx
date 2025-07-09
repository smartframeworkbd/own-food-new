import React, { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";
const CountryCategoryComponent = React.lazy(() =>
  import("../Components/RootComponents/CountryCategoryComponent")
);
const CountryCategoryPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loader></Loader>}>
        <Helmet>
          <title>Country Category || OwnFood</title>
          <meta name='description' content='Our OwnFood' />
        </Helmet>
        <CountryCategoryComponent />
      </Suspense>
    </Fragment>
  );
};

export default CountryCategoryPage;
