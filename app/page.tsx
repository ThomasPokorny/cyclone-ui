'use client'

import { useState } from "react";
import WaitlistModal from "@/components/WaitlistModal";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import IntegrationSection from "@/components/IntegrationSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleGetEarlyAccess = () => {
    setIsWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onGetEarlyAccess={handleGetEarlyAccess} />
      <HeroSection onGetEarlyAccess={handleGetEarlyAccess} />
      <StatsSection />
      <FeaturesSection />
      <IntegrationSection />
      <CTASection onGetEarlyAccess={handleGetEarlyAccess} />
      <Footer />
      <WaitlistModal open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </div>
  );
}