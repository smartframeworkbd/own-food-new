import React, { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";
const CustomerLoginComponent = React.lazy(() =>
  import("../Components/RootComponents/CustomerLoginComponent")
);
const CustomerLoginPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loader></Loader>}>
        <Helmet>
          <title>Customer Login || OwnFood</title>
          <meta name='description' content='Our OwnFood' />
        </Helmet>
        <CustomerLoginComponent />
      </Suspense>
    </Fragment>
  );
};

export default CustomerLoginPage;
