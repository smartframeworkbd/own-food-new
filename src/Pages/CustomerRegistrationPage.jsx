import React, { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";
const CustomerRegistrationComponent = React.lazy(() =>
  import("../Components/RootComponents/CustomerRegistrationComponent")
);
const CustomerRegistrationPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loader></Loader>}>
        <Helmet>
          <title>Customer Registration || OwnFood</title>
          <meta name='description' content='Our OwnFood' />
        </Helmet>
        <CustomerRegistrationComponent />
      </Suspense>
    </Fragment>
  );
};

export default CustomerRegistrationPage;
