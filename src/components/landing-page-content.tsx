import React from "react";
import Container from "./layout/container";
import { TestimonialsData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

const LandingPageContent = () => {
  return (
    <Container>
      <div className="space-y-10">
        <h2 className="text-center text-3xl font-extrabold">Testimonials</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {TestimonialsData.map((item) => (
            <Card key={item.name} className="bg-muted">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-x-2.5">
                  <div>
                    <p className="text-lg">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.title}
                    </p>
                  </div>
                  <Avatar>
                    <AvatarFallback className="bg-muted-foreground/10 text-base font-normal">
                      {item.avatar}
                    </AvatarFallback>
                  </Avatar>
                </CardTitle>
                <CardContent className="px-0 pt-4">
                  {item.description}
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default LandingPageContent;
