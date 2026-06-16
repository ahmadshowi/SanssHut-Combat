import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Categories from "@/components/sections/Categories";
import Fighters from "@/components/sections/Fighters";
import Versus from "@/components/sections/Versus";
import Schedule from "@/components/sections/Schedule";
import Venues from "@/components/sections/Venues";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Categories />
      <Fighters />
      <Versus />
      <Schedule />
      <Venues />
    </>
  );
}
