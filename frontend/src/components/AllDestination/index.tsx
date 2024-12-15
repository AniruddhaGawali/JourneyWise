"use client";
import React, { useState } from "react";
import { Packages } from "@/types";
import data from "@/dummydata.json";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";
import Link from "next/link";
import { Input } from "../ui/input";

type Props = { allDestination: Packages[]; isLoading: boolean };

function AllDestination({ allDestination, isLoading }: Props) {
  const [search, setSearch] = useState("");

  const currentDestination = allDestination.filter((destination) => {
    if (search === "") return destination;
    return (
      destination.title.toLowerCase().includes(search.toLowerCase()) ||
      destination.price.toString().includes(search.toLowerCase())
    );
  });

  if (isLoading) {
    return (
      <div className="container mx-auto mt-8 px-8">
        <h2 className="container mt-8 font-dm-serif-display text-2xl font-bold md:text-4xl">
          <Skeleton className="h-10 w-1/2" />
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-8 rounded-lg sm:grid-cols-2 md:grid-cols-3">
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
          <Skeleton className="h-96 w-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-8">
      <h2 className="container mt-8 font-dm-serif-display text-2xl font-bold md:text-4xl">
        All List Destinations
      </h2>
      <div className="mt-8 flex w-full max-w-lg items-center justify-between gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        <Button>Search</Button>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 rounded-lg sm:grid-cols-2 lg:grid-cols-3">
        {currentDestination.map((destination) => {
          return (
            <div className="relative h-[50vh] w-full max-w-lg rounded-lg">
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image
                  src={destination.imageUrl}
                  alt={destination.title}
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 flex h-full w-full flex-col items-start justify-end rounded-lg bg-gradient-to-r from-foreground/40 to-transparent p-4 text-background sm:p-10">
                <h5 className="mb-2 mt-4 font-dm-serif-display text-xl sm:text-5xl">
                  {destination.title}
                </h5>

                <p className="text-lg">{destination.description}</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Link href={`/booking?id=${destination._id}`}>
                    <Button variant="default">Book Now</Button>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllDestination;
