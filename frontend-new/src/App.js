import { Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { LandingPage } from "./pages/landingPages/LandingPage";
import WebsiteHeader from "./componets/website/WebsiteHeader";
import WebsiteFooter from "./componets/website/WebsiteFooter";
import { routes, QuickLinks } from "./constant";
import { lazy, Suspense, useEffect } from "react";
import { LoadingSpinner } from "./componets/common/LoadingSpinner";
import SpinnerContextProvider, {
  LoadingSpinnerContext,
} from "./componets/SpinnerContext";
import ScrollToTop from "./componets/common/ScrollToTop";
import WhatsAppIconPopUp from "./componets/common/WhatsAppIconPopUp";
import { landingPageContent } from "./data/servicesPageDetalls";
import { Toaster } from "react-hot-toast";

// Lazy load e-commerce and user pages for better performance
const ProductDetail = lazy(() => import("./pages/website/ProductDetail"));
const Cart = lazy(() => import("./pages/website/Cart"));
const Orders = lazy(() => import("./pages/website/Orders"));
const ProfilePage = lazy(() => import("./pages/website/ProfilePage"));
const Thankyou = lazy(() => import("./pages/Thankyou"));

export default function App() {
  // Defer AOS initialization to avoid blocking render
  useEffect(() => {
    AOS.init({
      once: true,
      duration: window.innerWidth > 768 ? 500 : 300,
      offset: window.innerWidth > 768 ? 120 : 50,
      delay: 0,
      easing: 'ease-out',
    });
  }, []);

  return (
    <SpinnerContextProvider>
      <LoadingSpinnerContext />
      <Suspense fallback={<LoadingSpinner />}>
        <ScrollToTop />
        <WhatsAppIconPopUp />
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          {/* Website Pages */}
          {routes.map(({ component, name, path }, index) => (
            <Route
              key={`route-${path}-${index}`}
              path={path}
              element={
                <>
                  <WebsiteHeader name={name} />
                  {component}
                  <WebsiteFooter />
                </>
              }
            />
          ))}

          {/* Quick Links (like Privacy Policy, Terms, etc.) */}
          {QuickLinks.map(({ component, name, path }) => (
            <Route
              key={`quick-${path}`}
              path={path}
              element={
                <>
                  <WebsiteHeader name={name} />
                  {component}
                  <WebsiteFooter />
                </>
              }
            />
          ))}

          {/* Thankyou page */}
          <Route
            path="/thankyou"
            element={
              <>
                <Thankyou />
              </>
            }
          />

          {landingPageContent.map((obj) => (
            <Route
              key={`landing-${obj.id}`}
              path={`/${obj.id}`}
              element={
                <>
                  <WebsiteHeader />
                  <LandingPage page={obj.id} />
                  <WebsiteFooter />
                </>
              }
            />
          ))}

          <Route
            path="/product/:id"
            element={
              <>
                <WebsiteHeader name="Product Detail" />
                <ProductDetail />
                <WebsiteFooter />
              </>
            }
          />

          <Route
            path="/cart"
            element={
              <>
                <WebsiteHeader name="Your Cart" />
                <Cart />
                <WebsiteFooter />
              </>
            }
          />

          <Route
            path="/orders"
            element={
              <>
                <WebsiteHeader name="My Orders" />
                <Orders />
                <WebsiteFooter />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <WebsiteHeader name="My profile" />
                <ProfilePage />
                <WebsiteFooter />
              </>
            }
          />
        </Routes>
      </Suspense>
    </SpinnerContextProvider>
  );
}
