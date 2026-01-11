import React from "react";
import Hero from "../Hero/Hero";
import TopScholarships from "../TopScholarships/TopScholarships";
import Faq from "../Faq/Faq";
import SuccessStories from "../SuccessStory/SuccessStory";
import HighlightsSection from "../Highlightes/Highlites";
import StatisticsSection from "../Statistics/ Statistics";
import TestimonialsPage from "../Testmonial/Testimonial";
import FeaturesSection from "../Feature/Feature";
import ServicesSection from "../Service/Service";
import CallToActionSection from "../Call/Call";
import ScholarshipCalculatorSection from "../Calculator/Calculator";

const Home = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Hero></Hero>
      <TopScholarships></TopScholarships>
      <SuccessStories></SuccessStories>
      <HighlightsSection></HighlightsSection>
      <StatisticsSection></StatisticsSection>
      <TestimonialsPage></TestimonialsPage>
      <FeaturesSection></FeaturesSection>
      <CallToActionSection></CallToActionSection>
      <ScholarshipCalculatorSection></ScholarshipCalculatorSection>
      <ServicesSection></ServicesSection>
      <Faq></Faq>
    </div>
  );
};

export default Home;
