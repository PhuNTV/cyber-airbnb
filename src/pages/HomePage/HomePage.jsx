import React, { Fragment, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function HomePage() {
  return (
    <Fragment>
      <Header />
      <div>
        <Suspense fallback={<>Loading...</>}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </Fragment>
  );
}

export default HomePage;
