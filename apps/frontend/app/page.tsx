import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";
import Header from "@/components/Header/Header";
import ServiceGrid from "@/components/ServiceGrid/ServiceGrid";
import WelcomeSection from "@/components/WelcomeSection/WelcomeSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <WelcomeSection />
        <ServiceGrid />
      </main>
      <BottomNavbar />
    </div>
  );
}
