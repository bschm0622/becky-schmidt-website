"use client"
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Mail } from "lucide-react";

export function Socials() {
    return (
        <div className="flex flex-row items-center justify-center gap-4 mt-6">
            <a
                href="https://www.linkedin.com/in/becky--schmidt/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button variant="linkedin">
                    <Linkedin />
                </Button>
            </a>

            <a
                href="https://github.com/bschm0622"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button variant="github">
                    <Github />
                </Button>
            </a>

            <a
                href="https://wellspringarchive.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button variant="substack">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 50 50"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect
                            width="33"
                            height="4"
                            x="9"
                            y="6"
                            rx="2"
                            strokeWidth="3.5"></rect>
                        <rect
                            width="33"
                            height="4"
                            x="9"
                            y="14"
                            rx="2"
                            strokeWidth="3.5"></rect>
                        <path
                            d="M9,22 C9,22 9,22 9,22 L42,22 C42,22 42,22 42,22 L42,41 C42,42.1 41.2,42.7 40.2,42.2 L26,33 L11.8,42.2 C10.8,42.7 9,42.1 9,41 L9,22 Z"
                            strokeWidth="3.5"></path>
                    </svg>
                </Button>
            </a>
            <a
                href="mailto:beckyschmidt0622@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button variant="email">
                    <Mail />
                </Button>
            </a>
        </div>
    );
}