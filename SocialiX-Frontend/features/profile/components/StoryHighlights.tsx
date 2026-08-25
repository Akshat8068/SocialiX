"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { dummyHighlights } from "../data";
export default function StoryHighlights() {
    return (
        <section className="mt-8">

            <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">

                {dummyHighlights.map((highlight) => (
                    <div
                        key={highlight.id}
                        className="flex min-w-18 flex-col items-center gap-2"
                    >
                        <div
                            className={`rounded-full p-0.5 transition
                                     ${highlight.active
                                    ? "bg-gradient-to-tr from-primary to-secondary"
                                    : "bg-outline-variant/30"
                                }`}
                        >
                            <div className="overflow-hidden rounded-full border-2 border-surface">

                                <Image
                                    src={highlight.image || "/Hero.jpg"}
                                    alt={highlight.title}
                                    width={72}
                                    height={72}
                                    className=" h-16 w-16 object-cover md:h-20 md:w-20 lg:h-24 lg:w-24"
                                />

                            </div>
                        </div>

                        <span className="max-w-20 truncate text-center text-xs font-medium md:text-lg xl:text-3xl">
                            {highlight.title}
                        </span>
                    </div>
                ))}

                {/* Add Highlight */}

                <button className="flex min-w-18 flex-col items-center gap-2">

                    <div
                        className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              border-dashed
              border-outline
              bg-surface-container
              transition
              hover:bg-surface-container-high
              md:h-20
              md:w-20
              lg:h-24
              lg:w-24
            "
                    >
                        <Plus size={26} />
                    </div>

                    <span className="text-xs font-medium md:text-lg lg:text-3xl">
                        New
                    </span>

                </button>

            </div>

        </section>
    );
}