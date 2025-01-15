"use client";

import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Props {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

export function CardTools({ name, description, tags }: Props) {
  return (
    <Card>
      <CardContent className="w-full min-w-[1100px]">
        <CardHeader>
          <CardTitle className="w-full text-lg">{name}</CardTitle>
          <div className="w-full flex justify-end">
            <Button size="icon" variant="ghost">
              <PencilIcon />
            </Button>
            <Button size="icon" variant="ghost">
              <TrashIcon />
            </Button>
          </div>
        </CardHeader>
        <CardDescription className="mb-5 px-6 text-md">{description}</CardDescription>
        <CardFooter>
          {tags.map((tag, idx) => (
            <div key={idx}>
              <span className="mx-1 font-bold">#{tag}</span>
            </div>
          ))}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
