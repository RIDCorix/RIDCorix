"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Code, Coffee, Zap, Heart } from "lucide-react"

const achievements = [
  { icon: Code, label: "Projects Completed", value: "50+" },
  { icon: Coffee, label: "Cups of Coffee", value: "1000+" },
  { icon: Zap, label: "Years Experience", value: "3+" },
  { icon: Heart, label: "Happy Clients", value: "25+" },
]

const timeline = [
  {
    year: "2024",
    title: "Senior Developer",
    company: "Tech Innovation",
    description: "Led development of scalable web applications using modern technologies."
  },
  {
    year: "2023",
    title: "Full Stack Developer",
    company: "Digital Solutions",
    description: "Built responsive web applications with React and Node.js."
  },
  {
    year: "2022",
    title: "Junior Developer",
    company: "StartUp Inc",
    description: "Started my professional journey in software development."
  },
]

export function AboutSection() {
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My Introduction
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-80 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg flex items-center justify-center text-6xl">
                🧑‍💻
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                I'm a passionate software developer with a love for creating innovative solutions.
              </h3>
              <p className="text-muted-foreground mb-4">
                My journey in tech is driven by curiosity and a desire to build amazing experiences. 
                I specialize in modern web technologies and enjoy tackling complex problems with 
                creative solutions.
              </p>
              <p className="text-muted-foreground mb-6">
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-background rounded-lg"
                >
                  <achievement.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{achievement.value}</div>
                  <div className="text-sm text-muted-foreground">{achievement.label}</div>
                </motion.div>
              ))}
            </div>

            <Button onClick={handleContactClick} className="mt-6">
              Contact Me
            </Button>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">My Journey</h3>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.year}
                      </Badge>
                      <div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          {item.company}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}