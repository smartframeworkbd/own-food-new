import React, { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";
const FaqComponent = React.lazy(() =>
  import("../Components/RootComponents/FaqComponent")
);
const FaqPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loader></Loader>}>
        <Helmet>
          <title>Faq || OwnFood</title>
          <meta name='description' content='Our OwnFood' />
        </Helmet>
        <FaqComponent />
      </Suspense>
    </Fragment>
  );
};

export default FaqPage;
