import CourseSection from "@/components/CourseSection";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";
import MarketingSection from "@/components/MarketingSection";
import MentorsSection from "@/components/MentorsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CourseSection />
      {/* <MarketingSection /> */}
      <FAQSection />
      <MentorsSection />
    </main>
  );
}
