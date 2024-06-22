import React from "react";
import Weather from "../../components/Weather";
import News from "../../components/News";

interface HomeProps {
  country: string;
  topic: string;
  icon: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ country, topic, icon }) => {
  return (
    <div className="news-container m-auto">
      <div className="home-container py-2">
        <Weather />
        {topic === "all" ? (
          <News country={country} icon={icon} />
        ) : (
          <News country={country} topic={topic} icon={icon} />
        )}
      </div>
    </div>
  );
};

export default Home;
