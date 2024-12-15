"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("group relative p-[4px]", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 z-[1] rounded-3xl opacity-60 blur-xl transition duration-700 will-change-transform group-hover:opacity-100",
          "bg-[radial-gradient(ellipse_at_top_left,#b25e39,transparent_50%),radial-gradient(ellipse_at_bottom_right,#8b4513,transparent_50%),linear-gradient(135deg,#d2691e,#a0522d,#b25e39,#8b4513)]",
          "bg-blend-overlay",
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 z-[1] rounded-3xl will-change-transform",
          "bg-[radial-gradient(ellipse_at_top_left,#b25e39,transparent_50%),radial-gradient(ellipse_at_bottom_right,#8b4513,transparent_50%),linear-gradient(135deg,#d2691e,#a0522d,#b25e39,#8b4513)]",
          "bg-blend-soft-light",
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
