"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { restaurantConfig } from "@/config/restaurant";

const HeroImageSequence = () => {
    const { animation, image } = restaurantConfig.hero.media;

    const {
        framesPath,
        filePrefix,
        fileExtension,
        frameStep,
        startAngle,
        endAngle,
        frameDuration,
        autoPlay,
        autoPlayDelay,
        interaction,
    } = animation;

    /* =========================
       GENERATE FRAMES
    ========================== */

    const frames = Array.from(
        {
            length:
                Math.floor(
                    (endAngle - startAngle) / frameStep
                ) + 1,
        },
        (_, index) => {
            const angle =
                startAngle + index * frameStep;

            const formattedAngle = String(angle).padStart(
                3,
                "0"
            );

            return `${framesPath}/${filePrefix}-${formattedAngle}.${fileExtension}`;
        }
    );

    /* =========================
       STATE
    ========================== */

    const [currentFrame, setCurrentFrame] = useState(0);

    const currentFrameRef = useRef(0);
    const directionRef = useRef<1 | -1>(1);
    const isAnimatingRef = useRef(false);

    /* =========================
       ROTATION
    ========================== */

    const rotate = () => {
        if (isAnimatingRef.current) return;

        isAnimatingRef.current = true;

        const interval = setInterval(() => {
            const nextFrame =
                currentFrameRef.current +
                directionRef.current;

            currentFrameRef.current = nextFrame;
            setCurrentFrame(nextFrame);

            // Reached the last frame
            if (nextFrame === frames.length - 1) {
                clearInterval(interval);

                directionRef.current = -1;
                isAnimatingRef.current = false;
            }

            // Returned to the first frame
            if (nextFrame === 0) {
                clearInterval(interval);

                directionRef.current = 1;
                isAnimatingRef.current = false;
            }
        }, frameDuration);
    };

    /* =========================
       AUTO PLAY
    ========================== */

    useEffect(() => {
        if (!autoPlay) return;

        const timeout = setTimeout(() => {
            rotate();
        }, autoPlayDelay);

        return () => clearTimeout(timeout);
    }, []);

    /* =========================
       RENDER
    ========================== */

    return (
        <div
            onMouseEnter={
                interaction.hover ? rotate : undefined
            }
            onClick={
                interaction.click ? rotate : undefined
            }
            className="cursor-pointer"
        >
            <Image
                src={frames[currentFrame]}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                draggable={false}
                className="
                    h-dvh
                    w-auto
                    max-w-none
                    select-none
                "
            />
        </div>
    );
};

export default HeroImageSequence;