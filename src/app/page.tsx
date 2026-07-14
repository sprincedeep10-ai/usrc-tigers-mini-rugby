import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { HomeClient } from "@/components/home-client";
import { AboutSection } from "@/components/sections/about";
import { FAQSection } from "@/components/sections/faq";
import { FinalCTASection } from "@/components/sections/final-cta";
import { InstagramSection } from "@/components/sections/instagram";
import { JoiningSection } from "@/components/sections/joining";
import { MissionSection } from "@/components/sections/mission";
import { ParentsSection } from "@/components/sections/parents";
import { ScheduleSection } from "@/components/sections/schedule";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <HomeClient />
        <InstagramSection />
        <AboutSection />
        <ParentsSection />
        <ScheduleSection />
        <JoiningSection />
        <MissionSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
