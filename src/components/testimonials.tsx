"use client";

import { Star } from "lucide-react";

type Review = {
  id: string;
  name: string;
  text: string;
  highlighted?: boolean;
};

const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "ক্রান্তি",
    text: "It’s really an amazing artistic effort.",
    highlighted: true,
  },
  {
    id: "r2",
    name: "Umme Azra",
    text: "Awww cute tooo",
    highlighted: true,
  },
  { id: "r3", name: "Ayesha", text: "Absolutely love the quality and detail! 💕" },
  { id: "r4", name: "Fatima", text: "Fast shipping and beautiful packaging — thank you!" },
  { id: "r5", name: "Nusrat", text: "Perfect gift for my sister, she adored it." },
  { id: "r6", name: "Sadia", text: "Colors are vibrant and the stitches are so neat." },
];

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            What customers say
          </h3>
          <p className="text-muted-foreground text-sm mt-2">
            Real messages and sweet notes from our customers in Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.id}
              className={`p-5 rounded-2xl border ${
                r.highlighted
                  ? "border-primary/30 bg-gradient-to-br from-primary/4 to-accent/4 shadow-md"
                  : "border-border/40 bg-card/80"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-semibold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Star className="h-3 w-3 text-primary" />
                    <span>5.0</span>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-foreground">{r.text}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
