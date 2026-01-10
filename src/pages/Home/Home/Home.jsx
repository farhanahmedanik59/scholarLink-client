import React from "react";
import Hero from "../Hero/Hero";
import TopScholarships from "../TopScholarships/TopScholarships";
import Faq from "../Faq/Faq";
import SuccessStories from "../SuccessStory/SuccessStory";
import HighlightsSection from "../Highlightes/Highlites";
import StatisticsSection from "../Statistics/ Statistics";
import TestimonialsPage from "../Testmonial/Testimonial";

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
      <Faq></Faq>
    </div>
  );
};

export default Home;
