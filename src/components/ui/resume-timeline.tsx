"use client"

import React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Briefcase, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface TimelineEvent {
    id: string
    company: string
    title: string
    duration: string
    summary: string
    details?: string[]
    type: string
}

interface TimelineProps {
    events: TimelineEvent[]
    className?: string
}

export default function HorizontalTimeline({ events, className }: TimelineProps) {
    const [activeEvent, setActiveEvent] = useState<string>(events[0]?.id)
    const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
    const scrollRef = React.useRef<HTMLDivElement>(null)

    const handleScroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return

        const scrollAmount = 300
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        })
    }

    const getEventIcon = (type: string) => {
        switch (type) {
            case "education":
                return <GraduationCap className="h-5 w-5 text-background" />
            case "work":
                return <Briefcase className="h-5 w-5 text-background" />
            default:
                return <Briefcase className="h-5 w-5 text-background" />
        }
    }

    const handleCardClick = (e: React.MouseEvent, eventId: string) => {
        e.stopPropagation()
        setActiveEvent(eventId)
        setExpandedEvent(expandedEvent === eventId ? null : eventId)
    }

    return (
        <div className={cn("w-full space-y-6 px-4 md:px-0", className)}>
            <div className="flex items-center justify-between mb-2">
                <div className="flex space-x-2 md:block hidden">
                    <Button variant="outline" size="icon" onClick={() => handleScroll("left")} aria-label="Scroll left">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleScroll("right")} aria-label="Scroll right">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="overflow-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent" ref={scrollRef}>
                <div className="relative flex flex-col md:flex-row md:min-w-max md:space-x-8 space-y-8 md:space-y-0 pb-6 pt-2 px-2 md:px-0">
                    {/* Timeline line - visible only on desktop */}
                    <div className="absolute left-0 right-0 top-[25px] h-0.5 bg-border hidden md:block" />

                    {/* Vertical timeline line for mobile */}
                    <div className="absolute top-0 bottom-0 left-[31px] w-0.5 bg-border md:hidden" />

                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            className="relative flex md:flex-col md:items-center group"
                        >
                            {/* Timeline node */}
                            <div
                                className={cn(
                                    "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-background bg-primary transition-all group-hover:ring-2 group-hover:ring-primary group-hover:ring-offset-2",
                                    activeEvent === event.id ? "ring-2 ring-primary ring-offset-2" : "",
                                )}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveEvent(event.id)
                                }}
                            >
                                {getEventIcon(event.type)}
                            </div>

                            {/* Event card */}
                            <Card
                                className={cn(
                                    "md:mt-4 ml-4 md:ml-0 transition-all duration-300 flex-1 cursor-pointer hover:border-primary hover:shadow-md",
                                    activeEvent === event.id ? "border-primary shadow-md" : "opacity-90 hover:opacity-100",
                                    expandedEvent === event.id 
                                        ? "md:w-[400px] md:min-h-[250px]" 
                                        : "md:w-[400px] md:min-h-[180px]",
                                    "w-full max-w-[calc(100%-3rem)] md:max-w-none"
                                )}
                                onClick={(e) => handleCardClick(e, event.id)}
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex flex-col space-y-1">
                                        <CardTitle className="text-sm font-semibold">{event.company}</CardTitle>
                                        <CardDescription className="text-xs font-medium text-foreground/80">{event.title}</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="mt-1 self-start text-xs">
                                        {event.duration}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {event.summary}
                                    </p>
                                    {expandedEvent === event.id && event.details && (
                                        <div className="mt-3 pt-3 border-t text-sm animate-in fade-in duration-200">
                                            <ul className="list-disc pl-5 space-y-2">
                                                {event.details.map((detail, idx) => (
                                                    <li key={idx} className="text-muted-foreground text-sm">
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                                {event.details && event.details.length > 0 && (
                                    <CardFooter className="pt-0">
                                        <div className="w-full text-center text-xs text-foreground/10 hover:text-primary/80 font-medium">
                                            {expandedEvent === event.id ? "Show less" : "Show more"}
                                        </div>
                                    </CardFooter>
                                )}
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

