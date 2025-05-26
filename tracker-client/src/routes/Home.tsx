import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BackgroundLines } from "@/components/ui/background-lines";

function Home() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            Tracker
          </h2>
          <div className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            <p>A MERN stack application for Project Management.</p>
            <p>This is my capstone project to showcase my fullstack skills.<br />Feel free to explore</p>
          </div>
        </BackgroundLines>
        <div className="max-w-2xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          <p>Tracker is a MERN stack application for managing Projects, Teams, and Features.</p>
          {/* <p><Button variant="link">Click here</Button> to Login or Register</p> */}
          <div className="text-muted-foreground text-sm">
            Created by
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">@sandeep-menon</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/sandeep-menon.png" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Sandeep Menon</h4>
                    <p className="text-sm">
                      <a href="https://sandeep-menon.github.io/" target="_blank" className="-ml-8 hover:underline text-primary">Learn more</a>
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

      </div>
    </>
  );
}

export default Home;
