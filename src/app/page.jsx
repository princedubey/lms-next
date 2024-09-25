import AboutSectionOne from "../components/About/AboutSectionOne";
import AboutSectionTwo from "../components/About/AboutSectionTwo";
import Courses from "../components/Courses";
import Brands from "../components/Brands";
import Contact from "../components/Contact";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import Video from "../components/Video";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Courses />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Contact />
    </>
  );
}
