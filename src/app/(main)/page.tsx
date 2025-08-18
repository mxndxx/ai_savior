import LectureSection from "@/components/LectureSection";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";
import MarketingSection from "@/components/MarketingSection";
import CoachesSection from "@/components/CoachesSection";
import SuccessStories from "@/components/SuccessStories";
import ClientRef from "@/components/ClientRef";

export default function Home() {
  return (
    <main>
      <ClientRef />
      <HeroSection />
      <LectureSection />
      {/* <MarketingSection /> */}
      <FAQSection />
      <CoachesSection />
      <SuccessStories />
    </main>
  );
}
