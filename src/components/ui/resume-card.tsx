import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Promotion {
  title: string;
  duration: string;
  bullets?: string[];
}

interface ResumeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  company: string;
  duration: string;
  skills?: string;
  bullets: string[];
  promotions?: Promotion[];
}

export function ResumeCard({
  title,
  company,
  duration,
  skills = "",
  bullets = [],
  promotions = [],
  className,
  ...props
}: ResumeCardProps) {
  // Split the comma-separated string into an array
  const skillsArray = skills ? skills.split(',').map(item => item.trim()) : [];

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-sm flex flex-col bg-background", className)} {...props}>
      <CardHeader className="pb-3">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <CardDescription className="text-base font-medium text-foreground/80">
              {company}
            </CardDescription>
            <CardDescription className="text-sm text-muted-foreground">
              {duration}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {skillsArray.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {skillsArray.map((skill, index) => (
              <span 
                key={index} 
                className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-foreground/80 border border-border/50"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        
        {bullets.length > 0 && (
          <ul className="space-y-1 list-disc pl-5 text-sm">
            {bullets.map((bullet, index) => (
              <li key={index} className="text-foreground/90">
                {bullet}
              </li>
            ))}
          </ul>
        )}
        
        {promotions.length > 0 && (
          <div className="mt-4 border-t border-border/30 pt-3">
            {promotions.map((promotion, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                  <h4 className="text-sm font-medium text-foreground/90">
                    {promotion.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {promotion.duration}
                  </span>
                </div>
                
                {promotion.bullets && promotion.bullets.length > 0 && (
                  <ul className="space-y-1 list-disc pl-5 text-sm mt-1">
                    {promotion.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="text-foreground/90">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 