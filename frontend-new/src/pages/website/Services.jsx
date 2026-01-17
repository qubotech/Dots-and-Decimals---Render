import React, { lazy, Suspense } from "react";
import OurServices from "../../componets/website/OurServices";
import Banner from "../../componets/website/Banner";

// Lazy load heavy component
const UnlockEfficiency = lazy(() => import("../../componets/common/UnlockEfficiency"));

const Services = () => {
  return (
    <>
      <Banner page="Services" />
      <OurServices />
      <Suspense fallback={<div className="h-20 bg-black"></div>}>
        <UnlockEfficiency />
      </Suspense>
    </>
  );
};

export default Services;
