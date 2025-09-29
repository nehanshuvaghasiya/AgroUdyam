'use client';

import { Suspense } from 'react';
import { AppHeader } from '@/components/common/AppHeader';
import { AppFooter } from '@/components/common/AppFooter';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { StatsSection } from '@/components/home/StatsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
        </Suspense>

        {/* Featured Products */}
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedProducts />
        </Suspense>

        {/* Categories Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <CategoriesSection />
        </Suspense>

        {/* Why Choose Us */}
        <Suspense fallback={<LoadingSpinner />}>
          <WhyChooseUs />
        </Suspense>

        {/* Stats Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <StatsSection />
        </Suspense>

        {/* Testimonials */}
        <Suspense fallback={<LoadingSpinner />}>
          <TestimonialsSection />
        </Suspense>
      </main>

      <AppFooter />
    </div>
  );
}