import React, { Fragment, Suspense, useState } from "react";
// import Loader from "../Components/Elements/Loader";
import { Helmet } from "react-helmet";
import Loader from "../Components/Elements/Loader";

const CategoryComponent = React.lazy(() =>
  import("../Components/RootComponents/CategoryComponent")
);

const CategoryPage = () => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error) => {
    if (error.name === "ChunkLoadError") {
      setHasError(true);
    }
  };

  return (
    <Fragment>
      <Suspense
        fallback={
          <Loader />
        }
      >
        <Helmet>
          <title>Home || OwnFood</title>
          <meta name="description" content="Our OwnFood" />
        </Helmet>
        {!hasError ? (
          <CategoryComponent />
        ) : (
          <div>
            <p>Error loading component. Please try again later.</p>
          </div>
        )}
      </Suspense>
    </Fragment>
  );
};

export default CategoryPage;
