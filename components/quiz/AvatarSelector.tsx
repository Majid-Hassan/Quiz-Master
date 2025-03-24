"use client";

import { useProfileStore } from "@/store/profileStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const avatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
];

export default function AvatarSelector() {
  const { avatar, setAvatar } = useProfileStore();

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {avatars.map((avt, index) => (
        <Button
          key={index}
          variant={avatar === avt ? "default" : "outline"}
          onClick={() => setAvatar(avt)}
          className={`p-2 ${avatar === avt ? "ring-2 ring-green-500" : ""}`}
        >
          <Avatar className="w-16 h-16">
            <AvatarImage src={avt} alt={`Avatar ${index + 1}`} />
            <AvatarFallback>{`A${index + 1}`}</AvatarFallback>
          </Avatar>
        </Button>
      ))}
    </div>
  );
}
