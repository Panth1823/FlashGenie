import React, { lazy, Suspense } from "react";

const LazyHome = lazy(() => import("./components/Home"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyHome />
    </Suspense>
  );
};

export default App;
