import { z } from "zod";

const halfPointScore = (maximum: number) =>
  z.coerce.number().min(0).max(maximum).multipleOf(0.5);

export const voteInputSchema = z.object({
  taste: halfPointScore(6),
  design: halfPointScore(6),
  bonus: halfPointScore(3),
  note: z.string().trim().max(1_000).optional(),
});

export type VoteInput = z.infer<typeof voteInputSchema>;

export const totalScore = ({ taste, design, bonus }: VoteInput) =>
  taste + design + bonus;