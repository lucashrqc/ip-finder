import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Instagram } from "lucide-react";
import Link from "next/link";

export default function CreatedBy() {
  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="link" className="self-center">
          <Link href="https://github.com/LucasHrqc" target="_blank" rel="noopener noreferrer">
            created by
          </Link>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4 space-x-2">
          <Avatar>
            <AvatarImage loading="lazy" src="https://github.com/lucashrqc.png" />
            <AvatarFallback>LHC</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-semibold">.lucashrqc</h4>
            <span className="text-xs text-muted-foreground">Frontend developer.</span>
            <div className="flex space-x-1">
              <Instagram size={16} className="text-xs text-muted-foreground" />
              <Button variant="link" className="p-0 m-0 w-fit h-fit">
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground"
                >
                  @lucashrqc
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
