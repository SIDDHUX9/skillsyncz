'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { MapPin, Search, Star, Users, Calendar, CreditCard, BookOpen, Heart, Trophy, Sparkles } from 'lucide-react'
import { AuthModal } from '@/components/auth/auth-modal'
import { UserProfile } from '@/components/auth/user-profile'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuthStore } from '@/stores/auth'
import Link from 'next/link'

// 3D Components
import { ThreeDBackground } from '@/components/3d/three-d-background'
import { ParticleBackground } from '@/components/3d/particle-background'
import { HeroSection3D } from '@/components/3d/hero-section-3d'
import { FeatureCard3D } from '@/components/3d/feature-card-3d'
import { HowItWorks3D } from '@/components/3d/how-it-works-3d'
import { Stats3D } from '@/components/3d/stats-3d'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  
  const { isAuthenticated, user } = useAuthStore()

  const categories = [
    { id: 'all', name: 'All Skills', icon: Sparkles },
    { id: 'academic', name: 'Academic', icon: BookOpen },
    { id: 'arts', name: 'Arts', icon: Heart },
    { id: 'business', name: 'Business', icon: Trophy },
    { id: 'cooking', name: 'Cooking', icon: Heart },
    { id: 'fitness', name: 'Fitness', icon: Trophy },
    { id: 'language', name: 'Language', icon: BookOpen },
    { id: 'music', name: 'Music', icon: Heart },
    { id: 'tech', name: 'Tech', icon: Sparkles },
    { id: 'trades', name: 'Trades', icon: Trophy },
  ]

  const featuredSkills = [
    {
      id: 1,
      title: 'Guitar Lessons for Beginners',
      category: 'Music',
      price: 30,
      rating: 4.8,
      reviews: 12,
      distance: '0.5 km',
      instructor: 'Sarah M.',
      avatar: '👩‍🎤',
      description: 'Learn guitar basics in a relaxed environment',
      duration: '1 hour',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Web Development Mentorship',
      category: 'Tech',
      price: 50,
      rating: 4.9,
      reviews: 23,
      distance: '1.2 km',
      instructor: 'John D.',
      avatar: '👨‍💻',
      description: 'Full-stack development guidance',
      duration: '2 hours',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'French Conversation Practice',
      category: 'Language',
      price: 25,
      rating: 4.7,
      reviews: 8,
      distance: '0.8 km',
      instructor: 'Marie L.',
      avatar: '👩‍🏫',
      description: 'Improve your French speaking skills',
      duration: '1 hour',
      level: 'All Levels'
    },
    {
      id: 4,
      title: 'Home Cooking Basics',
      category: 'Cooking',
      price: 35,
      rating: 4.9,
      reviews: 15,
      distance: '2.0 km',
      instructor: 'Carlos R.',
      avatar: '👨‍🍳',
      description: 'Learn essential cooking techniques',
      duration: '1.5 hours',
      level: 'Beginner'
    }
  ]

  const howItWorks = [
    {
      step: 1,
      title: 'Discover Skills',
      description: 'Find talented neighbors offering skills within walking distance',
      icon: Search
    },
    {
      step: 2,
      title: 'Book & Pay',
      description: 'Schedule sessions that work for you and pay securely with credits',
      icon: Calendar
    },
    {
      step: 3,
      title: 'Learn & Connect',
      description: 'Meet amazing people in your community and learn something new',
      icon: Users
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* 3D Backgrounds */}
      <ThreeDBackground />
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="relative z-20 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/70 rounded-lg flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">SkillSwap</span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/skills">
                <Button variant="ghost" className="hover:bg-primary/10 transition-colors">Skills</Button>
              </Link>
              <Link href="/community">
                <Button variant="ghost" className="hover:bg-primary/10 transition-colors">Community</Button>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="hover:bg-primary/10 transition-colors">Dashboard</Button>
                  </Link>
                  <UserProfile />
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setIsAuthModalOpen(true)} className="hover:bg-primary/10 transition-colors">
                    Sign In
                  </Button>
                  <Button onClick={() => setIsAuthModalOpen(true)} className="hover:scale-105 transition-transform">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 3D Hero Section */}
      <HeroSection3D
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Featured Skills */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Featured Skills Near You</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Popular skills from verified instructors in your neighborhood
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredSkills.map((skill, index) => (
            <FeatureCard3D key={skill.id} skill={skill} index={index} />
          ))}
        </div>
      </section>

      {/* 3D How It Works */}
      <HowItWorks3D steps={howItWorks} />

      {/* Stats Section */}
      <Stats3D stats={[
        { value: '500+', label: 'Active Skills', icon: BookOpen },
        { value: '1,200+', label: 'Happy Learners', icon: Users },
        { value: '50+', label: 'Neighborhoods', icon: MapPin },
        { value: '4.9★', label: 'Average Rating', icon: Star }
      ]} />

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to Start Learning?
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of neighbors sharing skills and building community.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/skills">
              <motion.button 
                className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg rounded-xl text-primary-foreground font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning
              </motion.button>
            </Link>
            <Link href="/create-skill">
              <motion.button 
                className="text-lg px-8 py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-xl font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Share Your Skills
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}
