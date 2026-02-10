"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import PropertiesSection from "@/components/PropertiesSection";
import UsefulInfoSection from "@/components/UsefulInfoSection";
import BirdDecoration from "@/components/BirdDecoration";
import BusinessSection from "@/components/BusinessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <HeroSection />
      <main className={styles.main}>
        <IntroSection />
        <PropertiesSection />
        <UsefulInfoSection />
        <BirdDecoration />
        <BusinessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
