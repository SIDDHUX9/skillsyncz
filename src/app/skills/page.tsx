'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Search, Star, Users, Calendar, Clock, Filter, Plus } from 'lucide-react'
import { DatabaseService } from '@/lib/db'
import { useAuthStore } from '@/stores/auth'
import Link from 'next/link'

interface Skill {
  id: string
  title: string
  description: string
  category: string
  price_credits: number
  duration: string
  level: string
  avatar: string
  rating: number
  reviews: number
  owner: {
    id: string
    name: string
    avatar_url?: string
    karma: number
    is_id_verified: boolean
  }
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)
  
  const { isAuthenticated, user } = useAuthStore()

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'ACADEMIC', label: 'Academic' },
    { value: 'ARTS', label: 'Arts' },
    { value: 'BUSINESS', label: 'Business' },
    { value: 'COOKING', label: 'Cooking' },
    { value: 'FITNESS', label: 'Fitness' },
    { value: 'LANGUAGE', label: 'Language' },
    { value: 'MUSIC', label: 'Music' },
    { value: 'TECH', label: 'Tech' },
    { value: 'TRADES', label: 'Trades' },
    { value: 'OTHER', label: 'Other' }
  ]

  useEffect(() => {
    fetchSkills()
  }, [selectedCategory, searchQuery])

  const fetchSkills = async () => {
    try {
      setLoading(true)
      const filters: any = {}
      
      if (selectedCategory !== 'all') {
        filters.category = selectedCategory
      }
      
      const data = await DatabaseService.getSkills(filters)
      setSkills(data || [])
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = skill.price_credits >= priceRange[0] && skill.price_credits <= priceRange[1]
    return matchesSearch && matchesPrice
  })

  const handleBookSkill = async (skillId: string) => {
    if (!isAuthenticated) {
      alert('Please sign in to book a skill')
      return
    }

    try {
      // Create booking logic here
      alert('Booking functionality will be implemented next!')
    } catch (error) {
      console.error('Failed to book skill:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/70 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SkillSwap</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              {isAuthenticated && (
                <Link href="/create-skill">
                  <Button className="bg-gradient-to-r from-primary to-primary/80">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Skill
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: {priceRange[0]} - {priceRange[1]} credits
                  </label>
                  <div className="space-y-2">
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* User Credits */}
                {isAuthenticated && user && (
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium">Your Credits</p>
                    <p className="text-2xl font-bold text-primary">{user.credits}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Skills Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Available Skills</h1>
              <p className="text-muted-foreground">
                Discover and learn from talented individuals in your community
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted rounded-t-lg" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded mb-2" />
                      <div className="h-3 bg-muted rounded mb-4" />
                      <div className="h-8 bg-muted rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredSkills.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No skills found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-3xl">{skill.avatar || '🎓'}</div>
                          <Badge variant="secondary">{skill.category}</Badge>
                        </div>
                        
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {skill.title}
                        </CardTitle>
                        
                        <CardDescription className="line-clamp-2">
                          {skill.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Instructor Info */}
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {skill.owner.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {skill.owner.name || 'Anonymous'}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{skill.rating}</span>
                              <span>•</span>
                              <span>{skill.reviews} reviews</span>
                            </div>
                          </div>
                          {skill.owner.is_id_verified && (
                            <div className="text-blue-500" title="Verified">
                              ✓
                            </div>
                          )}
                        </div>

                        {/* Skill Details */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{skill.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{skill.level}</span>
                          </div>
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="text-lg font-bold text-primary">
                            {skill.price_credits} credits
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleBookSkill(skill.id)}
                            disabled={!isAuthenticated}
                            className="bg-gradient-to-r from-primary to-primary/80"
                          >
                            {isAuthenticated ? 'Book Now' : 'Sign In to Book'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}