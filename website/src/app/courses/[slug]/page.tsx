'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import courseData from '@/data/music_courses.json'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { Button } from '@/components/ui/moving-border'
import { Spotlight } from '@/components/ui/Spotlight'

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

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="ml-2 text-gray-400">{rating}</span>
        </div>
    )
}

export default function CoursePage({ params }: { params: { slug: string } }) {
    const course = courseData.courses.find(
        (c: Course) => c.slug === params.slug
    ) as Course | undefined

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

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="teal" />
            
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Course Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <BackgroundGradient className="rounded-2xl overflow-hidden">
                            <Image
                                src={course.image}
                                alt={course.title}
                                width={600}
                                height={400}
                                className="w-full h-[400px] object-cover"
                            />
                        </BackgroundGradient>
                    </motion.div>

                    {/* Course Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-medium mb-4">
                            {course.level}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {course.title}
                        </h1>
                        <p className="text-gray-400 text-lg mb-6">
                            {course.longDescription}
                        </p>

                        <div className="flex items-center gap-4 mb-6">
                            <StarRating rating={course.rating} />
                            <span className="text-gray-500">|</span>
                            <span className="text-gray-400">{course.students.toLocaleString()} students</span>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="flex items-center gap-2 text-gray-300">
                                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span>{course.lessons} lessons</span>
                            </div>
                        </div>

                        <BackgroundGradient className="rounded-2xl p-6 bg-gray-900/80 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-400">Course Price</span>
                                <span className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                                    ${course.price}
                                </span>
                            </div>
                            <Link href={`/checkout?course=${course.slug}`}>
                                <Button
                                    borderRadius="1rem"
                                    containerClassName="w-full h-14"
                                    className="bg-slate-900 text-white border-slate-800 font-bold text-lg"
                                >
                                    Buy Course
                                </Button>
                            </Link>
                        </BackgroundGradient>

                        <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl">
                            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {course.instructor.charAt(0)}
                            </div>
                            <div>
                                <p className="text-white font-semibold">{course.instructor}</p>
                                <p className="text-gray-400 text-sm">{course.instructorBio}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Course Details Sections */}
                <div className="grid lg:grid-cols-3 gap-8 mt-16">
                    {/* What You'll Learn */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <BackgroundGradient className="rounded-2xl p-6 bg-gray-900/80 h-full">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                What You&apos;ll Learn
                            </h2>
                            <ul className="space-y-3">
                                {course.whatYouLearn.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-300">
                                        <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </BackgroundGradient>
                    </motion.div>

                    {/* Course Syllabus */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <BackgroundGradient className="rounded-2xl p-6 bg-gray-900/80 h-full">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Course Syllabus
                            </h2>
                            <ul className="space-y-3">
                                {course.syllabus.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-300">
                                        <span className="w-6 h-6 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                            {index + 1}
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </BackgroundGradient>
                    </motion.div>

                    {/* Course Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <BackgroundGradient className="rounded-2xl p-6 bg-gray-900/80 h-full">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                Course Includes
                            </h2>
                            <ul className="space-y-3">
                                {course.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-300">
                                        <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </BackgroundGradient>
                    </motion.div>
                </div>

                {/* Back to Courses */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <Link href="/courses">
                        <Button
                            borderRadius="1.75rem"
                            className="bg-slate-900 text-white border-slate-800"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to All Courses
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

