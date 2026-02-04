'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { Button } from '@/components/ui/moving-border'
import { Spotlight } from '@/components/ui/Spotlight'
import courseData from '@/data/music_courses.json'

interface Course {
    id: number
    title: string
    slug: string
    description: string
    longDescription: string
    price: number
    instructor: string
    instructorBio: string
    isFeatured: boolean
    image: string
    duration: string
    lessons: number
    level: string
    rating: number
    students: number
    features: string[]
    syllabus: string[]
    whatYouLearn: string[]
}

export default function CheckoutPage() {
    return (
        <React.Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl font-bold">Loading...</div>
            </div>
        }>
            <CheckoutContent />
        </React.Suspense>
    )
}

function CheckoutContent() {
    const searchParams = useSearchParams()
    const courseSlug = searchParams.get('course')
    
    const course = courseData.courses.find(
        (c: Course) => c.slug === courseSlug
    ) as Course | undefined

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            const response = await fetch('/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    courseSlug: course?.slug,
                    courseTitle: course?.title,
                    coursePrice: course?.price,
                }),
            })
            
            if (response.ok) {
                setIsSubmitted(true)
            }
        } catch {
            // For demo purposes, still show success
            setIsSubmitted(true)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
                <div className="text-center relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-4">Course Not Found</h1>
                    <p className="text-gray-400 mb-8">The course you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/courses">
                        <Button
                            borderRadius="1.75rem"
                            className="bg-slate-900 text-white border-slate-800"
                        >
                            View All Courses
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="teal" />
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="text-center relative z-10"
                >
                    <BackgroundGradient className="rounded-3xl p-8 bg-gray-900">
                        <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Purchase Successful!</h1>
                        <p className="text-gray-400 mb-2">Thank you for enrolling in</p>
                        <p className="text-xl font-semibold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-8">
                            {course.title}
                        </p>
                        <p className="text-gray-500 text-sm mb-8">
                            A confirmation email has been sent to {formData.email}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={`/courses/${course.slug}`}>
                                <Button
                                    borderRadius="1.75rem"
                                    className="bg-slate-900 text-white border-slate-800"
                                >
                                    Start Learning
                                </Button>
                            </Link>
                            <Link href="/courses">
                                <Button
                                    borderRadius="1.75rem"
                                    className="bg-slate-900 text-white border-slate-800"
                                    containerClassName="bg-transparent"
                                >
                                    Browse More Courses
                                </Button>
                            </Link>
                        </div>
                    </BackgroundGradient>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="teal" />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Complete Your Enrollment</h1>
                    <p className="text-gray-400">You&apos;re just one step away from starting your musical journey</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Course Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <BackgroundGradient className="rounded-3xl overflow-hidden bg-gray-900 p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                            
                            <div className="flex gap-4 mb-6">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    width={120}
                                    height={80}
                                    className="rounded-xl object-cover w-28 h-20"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                                    <p className="text-gray-400 text-sm">by {course.instructor}</p>
                                    <span className="inline-block px-2 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs font-medium mt-2">
                                        {course.level}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4 space-y-3">
                                <div className="flex justify-between text-gray-400">
                                    <span>Duration</span>
                                    <span className="text-white">{course.duration}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Lessons</span>
                                    <span className="text-white">{course.lessons} lessons</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Students Enrolled</span>
                                    <span className="text-white">{course.students.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 mt-4 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg text-gray-300">Total</span>
                                    <span className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                                        ${course.price}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
                                <h4 className="text-sm font-semibold text-white mb-3">What&apos;s Included:</h4>
                                <ul className="space-y-2">
                                    {course.features.slice(0, 4).map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                                            <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </BackgroundGradient>
                    </motion.div>

                    {/* Enrollment Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <BackgroundGradient className="rounded-3xl bg-gray-900 p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Your Details</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/70 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/70 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/70 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>

                                <Button
                                    borderRadius="1rem"
                                    as="button"
                                    type="submit"
                                    containerClassName="w-full h-14 mt-6"
                                    className="bg-slate-900 text-white border-slate-800 font-bold text-lg"
                                >
                                    {isLoading ? 'Processing...' : `Enroll Now - $${course.price}`}
                                </Button>
                            </form>

                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>Secure enrollment - Your data is protected</span>
                            </div>
                        </BackgroundGradient>

                        <div className="mt-6 text-center">
                            <Link 
                                href={`/courses/${course.slug}`}
                                className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Course
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
