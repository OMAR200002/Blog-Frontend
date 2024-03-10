import Container from "@mui/material/Container";
import ImageSlideshow from "@/components/images/image-slideshow";
import classes from "./hero-section.module.css";
import Link from "next/link";
import GoDown from "@/components/go-down/go-down";
import { useSelector } from "react-redux";

function HeroSection() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div style={{ position: "relative" }}>
      <Container maxWidth="lg" className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div className={classes["hero-container"]}>
          <div className={classes.hero}>
            <h1>
              TechTrends Hub: Exploring the Latest in Web Development, AI
              Advancements, and Cyber security Solutions
            </h1>
            <p>
              Dive into the World of Cutting-Edge Technologies, Stay Ahead with
              Expert Insights and Updates
            </p>
          </div>
          <div className={classes.cta}>
            <Link href="/login">Join the Community</Link>
            <Link href="/posts">Explore Posts</Link>
          </div>
        </div>
      </Container>
      <GoDown />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ height: "80px" }}
      >
        <path
          fill="#f8f9fa"
          fillOpacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,128C384,117,480,139,576,144C672,149,768,139,864,138.7C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}

export default HeroSection;
