import React from "react";
import { appDevelopmentServices, webDevelopmentServices } from "../../constant";
import { developmentServiceDetails } from "../../data/servicesPageDetalls";

const LandingServices = ({ page }) => {
  const services =
    page === "web-development"
      ? webDevelopmentServices
      : appDevelopmentServices;

  const service = developmentServiceDetails.find((item) => item.type === page);
  const isOddCount = service?.services?.length % 2 !== 0;
  const lastItem = services[services.length - 1];

  return (
    <div id="services" className="flex justify-center relative bg-[#101010]">
      <div className="wrapper py-16 flex flex-col items-center gap-5 z-10 text-white">
        <div data-aos="fade-up" className="gradient-rounded-text-box mx-auto">
          {/* {page === "web-development" ? "Web Solutions" : "Mobile Solutions"} */}
          {service.title}
        </div>

        <h1 data-aos="fade-up" className="heading-2 text-center max-w-3xl mx-auto px-4">
          {/* {page === "web-development"
            ? "Transform Your Digital Presence With Cutting-Edge Web Solutions"
            : "Powerful Mobile Experiences That Drive Engagement And Growth"} */}
          {service.tagline}
        </h1>

        <p
          data-aos="fade-up"
          className="text-center max-w-2xl mx-auto desc text-white/80 px-4"
        >
          {/* {page === "web-development"
            ? "We craft high-performance websites that combine stunning design with robust functionality to elevate your brand and drive conversions."
            : "We develop intuitive, high-performance mobile applications that deliver seamless user experiences across all platforms and devices."} */}
          {service.description}
        </p>

        <div
          data-aos="fade-up"
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 py-8 w-full max-w-6xl mx-auto`}
        >
          {service.services.map((item) => (
            <div
              key={item.id}
              className={`shadow-2xl transition-all will-change-transform border-2 border-primary/50 bg-primary/20 hover:-translate-y-2 hover:shadow-primary/30 hover:bg-primary/25 duration-300 ease-out rounded-xl
                ${isOddCount && item.id === lastItem.id
                  ? "sm:col-span-2 max-w-2xl mx-auto w-full"
                  : ""
                }`}
            >
              <div className="flex h-full flex-col gap-3 items-center justify-start text-center p-6 sm:p-8 rounded-xl">
                <item.icon className="w-14 h-14 sm:w-16 sm:h-16 fill-primary flex-shrink-0" />
                <h6 className="font-bold text-xl sm:text-2xl font-raleway mt-2">
                  {item.title}
                </h6>
                <p className="text-sm sm:text-md text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingServices;
