import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  logoSrc?: string;
  logoAlt?: string;
  techStack?: string;
  projectUrl?: string;
}

export function ProjectCard({
  title,
  description,
  logoSrc,
  logoAlt = "Project Logo",
  techStack = "",
  projectUrl,
  className,
  ...props
}: ProjectCardProps) {
  // Split the comma-separated string into an array
  const techStackArray = techStack ? techStack.split(',').map(item => item.trim()) : [];

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md flex flex-col h-full relative", className)} {...props}>
      {projectUrl && (
        <a 
          href={projectUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute top-3 right-3 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
      
      <CardHeader className="flex flex-col items-start gap-4">
        <div className="flex w-full items-center gap-4">
          {logoSrc && (
            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-muted flex items-center justify-center">
              <img src={logoSrc} alt={logoAlt} className="w-full h-full object-contain bg-white" />
            </div>
          )}
          <CardTitle className="flex-1">{title}</CardTitle>
        </div>
        <CardDescription className="mt-1">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow pb-3">
        {techStackArray.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techStackArray.map((tech, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-foreground border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 