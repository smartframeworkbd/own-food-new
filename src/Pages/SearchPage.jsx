import React, { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";
const SearchComponent = React.lazy(() =>
  import("../Components/RootComponents/SearchComponent")
);
const SearchPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loader></Loader>}>
        <Helmet>
          <title>Ownfood - Taste of food</title>
          <meta name="description" content="OwnFood - searching..." />
        </Helmet>
        <SearchComponent />
      </Suspense>
    </Fragment>
  );
};

export default SearchPage;
