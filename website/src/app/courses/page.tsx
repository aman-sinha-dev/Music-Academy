'use client'
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/moving-border";
import courseData from "@/data/music_courses.json"

interface Course {
  id: number
  title: string
  slug: string
  description: string
  price: number
  instructor: string
  isFeatured: boolean
  image: string
  level?: string
  duration?: string
  lessons?: number
  rating?: number
}

function CoursesPage() {
  return (
    <div className="min-h-screen bg-black py-12 pt-36">
      <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">All courses ({courseData.courses.length})</h1>
      <div className="flex flex-wrap justify-center">
        {courseData.courses.map((course: Course, index: number) => (
          <CardContainer key={index} className="inter-var m-4">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {course.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {course.description}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Link href={`/courses/${course.slug}`}>
                  <Image
                    src={course.image}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl cursor-pointer"
                    alt={course.title}
                  />
                </Link>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  className="flex items-center gap-4"
                >
                  <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                    ${course.price}
                  </span>
                  {course.level && (
                    <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs font-medium">
                      {course.level}
                    </span>
                  )}
                </CardItem>
                <CardItem translateZ={20}>
                  <Link href={`/checkout?course=${course.slug}`}>
                    <Button
                      borderRadius="0.75rem"
                      containerClassName="h-10"
                      className="bg-slate-900 text-white border-slate-800 text-sm font-bold px-4"
                    >
                      Buy Course
                    </Button>
                  </Link>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  )
}

export default CoursesPage
