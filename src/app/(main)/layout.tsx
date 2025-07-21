import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-1 sm:mx-8 2xl:mx-40">
        <Header />
        <div className="min-h-screen pt-28">{children}</div>
      </div>
      <Footer />
    </>
  );
}
