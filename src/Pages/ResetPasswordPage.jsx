import React, { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";
const ResetPasswordComponent = React.lazy(() =>
  import("../Components/RootComponents/ResetPasswordComponent")
);
const ResetPasswordPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loader></Loader>}>
        <Helmet>
          <title>Customer Login || OwnFood</title>
          <meta name='description' content='Our OwnFood' />
        </Helmet>
        <ResetPasswordComponent />
      </Suspense>
    </Fragment>
  );
};

export default ResetPasswordPage;
