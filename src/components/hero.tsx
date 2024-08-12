"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import TypeWriterComponent from "typewriter-effect";

import Container from "./layout/container";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  const { isSignedIn } = useAuth();

  return (
    <Container>
      <div className="space-y-5 text-center">
        <div className="text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl">
          <h1>The Best AI Tool for</h1>
          <div className="bg-transparent bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
            <TypeWriterComponent
              options={{
                strings: ["Chatbot", "Code Generation", "Photo Generation"],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className="text-sm font-normal text-muted-foreground md:text-lg">
          Create content with the magic of AI 10x faster.
        </div>
        <div>
          <Button asChild variant="gradient" className="p-4 md:p-6 md:text-lg">
            <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
              Start Generating for Free
            </Link>
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Try it out for free. No credit card required.
        </div>
      </div>
    </Container>
  );
};

export default Hero;
