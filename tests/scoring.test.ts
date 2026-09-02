import { describe, expect, it } from "vitest";

import { totalScore, voteInputSchema } from "@/lib/scoring";

describe("voteInputSchema", () => {
  it("accepts the exact legacy score ranges in half-point increments", () => {
    const vote = voteInputSchema.parse({
      taste: "5.5",
      design: 4,
      bonus: 2.5,
      note: "  Roasted malt and orange peel.  ",
    });

    expect(vote).toEqual({
      taste: 5.5,
      design: 4,
      bonus: 2.5,
      note: "Roasted malt and orange peel.",
    });
    expect(totalScore(vote)).toBe(12);
  });

  it.each([
    { taste: 6.5, design: 4, bonus: 2 },
    { taste: 5, design: -0.5, bonus: 2 },
    { taste: 5, design: 4, bonus: 3.5 },
    { taste: 5.25, design: 4, bonus: 2 },
  ])("rejects an invalid vote: %o", (vote) => {
    expect(voteInputSchema.safeParse(vote).success).toBe(false);
  });
});