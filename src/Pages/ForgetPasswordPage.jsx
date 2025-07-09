import React, { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";
const ForgetPasswordComponent = React.lazy(() =>
  import("../Components/RootComponents/ForgetPasswordComponent")
);
const ForgetPasswordPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loader></Loader>}>
        <Helmet>
          <title>Home || OwnFood</title>
          <meta name='description' content='Our OwnFood' />
        </Helmet>
        <ForgetPasswordComponent />
      </Suspense>
    </Fragment>
  );
};

export default ForgetPasswordPage;
