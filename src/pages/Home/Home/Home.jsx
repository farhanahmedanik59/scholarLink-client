import React from "react";
import Hero from "../Hero/Hero";
import TopScholarships from "../TopScholarships/TopScholarships";
import Faq from "../Faq/Faq";
import SuccessStories from "../SuccessStory/SuccessStory";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <TopScholarships></TopScholarships>
      <SuccessStories></SuccessStories>
      <Faq></Faq>
    </div>
  );
};

export default Home;
