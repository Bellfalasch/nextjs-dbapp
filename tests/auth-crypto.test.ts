import { describe, expect, it } from "vitest";

import {
  createOpaqueToken,
  hashOpaqueToken,
  hashOrganizerPassword,
  verifyOrganizerPassword,
} from "@/lib/auth/crypto";

describe("opaque tokens", () => {
  it("creates high-entropy tokens and stores only stable hashes", () => {
    const first = createOpaqueToken();
    const second = createOpaqueToken();

    expect(first).toMatch(/^[\w-]{43}$/);
    expect(second).not.toBe(first);
    expect(hashOpaqueToken(first)).toMatch(/^[a-f\d]{64}$/);
    expect(hashOpaqueToken(first)).toBe(hashOpaqueToken(first));
    expect(hashOpaqueToken(first)).not.toBe(hashOpaqueToken(second));
  });
});

describe("organizer password hashes", () => {
  it("verifies the password without storing it or using deterministic salts", async () => {
    const firstHash = await hashOrganizerPassword("winter tasting 2026");
    const secondHash = await hashOrganizerPassword("winter tasting 2026");

    expect(firstHash).not.toBe(secondHash);
    await expect(
      verifyOrganizerPassword("winter tasting 2026", firstHash),
    ).resolves.toBe(true);
    await expect(
      verifyOrganizerPassword("incorrect", firstHash),
    ).resolves.toBe(false);
  });

  it("rejects malformed configured hashes", async () => {
    await expect(
      verifyOrganizerPassword("anything", "not-a-valid-hash"),
    ).resolves.toBe(false);
  });
});