import React from "react";
import data from "@/dummydata.json";
import { Packages } from "@/types";
import { DirectionAwareHover } from "../ui/direction-aware-hover";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

type Props = {
  top10Destinations: Packages[];
  isLoading: boolean;
};

function TopDestinations({ top10Destinations, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="container mx-auto mt-8 w-screen px-8">
        <h2 className="container mt-8 font-dm-serif-display text-2xl font-bold md:text-4xl">
          Top Destinations
        </h2>
        <div className="flex gap-16 overflow-y-scroll py-8">
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 w-screen px-8">
      <h2 className="container mt-8 font-dm-serif-display text-2xl font-bold md:text-4xl">
        Top Destinations
      </h2>
      <div className="flex gap-16 overflow-y-scroll py-8">
        {top10Destinations.map((destination) => {
          return (
            <div className="relative flex items-center justify-center">
              <DirectionAwareHover imageUrl={destination.imageUrl}>
                <div className="flex flex-col gap-2">
                  <p className="font-dm-serif-display text-6xl font-bold">
                    {destination.destination}
                  </p>
                  <p className="text-2xl font-normal">
                    $
                    <span className="font-dm-serif-display">
                      {" "}
                      {destination.price}
                    </span>
                  </p>
                  <div className="flex gap-4">
                    <Link href={`/booking?id=${destination._id}`}>
                      <Button className="w-fit">Book Now</Button>
                    </Link>
                    <Link href={`/package/${destination._id}`}>
                      <Button
                        className="w-fit bg-transparent"
                        variant={"outline"}
                      >
                        Know More
                      </Button>
                    </Link>
                  </div>
                </div>
              </DirectionAwareHover>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopDestinations;
