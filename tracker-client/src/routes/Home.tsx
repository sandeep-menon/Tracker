import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function Home() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="scroll-m-20 text-4xl font-extrabold tracking-wider lg:text-5xl">
          Tracker
        </div>
        <div className="text-xl text-muted-foreground">
          <p>Tracker is a MERN stack application for Bug and Task tracking.</p>
          <p>This is a personal hobby project. Feel free to explore.</p>
        </div>
        <div className="text-lg text-muted-foreground">The application includes:</div>
        <ul className="ml-6 list-disc text-muted-foreground">
          <li>MongoDB cloud database</li>
          <li>Express web application framework</li>
          <li>React front-end</li>
          <li>NodeJS runtime</li>
          <li>shadcn UI library</li>
          <li>JSON Web Tokens for Authentication</li>
        </ul>
        <div><a href="/login">Click here</a> to Login or Register</div>
        <div className="text-muted-foreground">
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
                  <a href="https://sandeep-menon.github.io/" target="_blank">Learn more</a>
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        </div>
      </div>
    </>
  );
}

export default Home;
