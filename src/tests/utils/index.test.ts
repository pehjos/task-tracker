import { describe, it, expect } from "vitest";
import { formatDate } from "../../utils";

describe("formatDate utility", () => {
  it("returns 'Today' for the current date", () => {
    const today = new Date();
    expect(formatDate(today.toISOString())).toBe("Today");
  });

  it("returns 'Yesterday' for a date one day ago", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatDate(yesterday.toISOString())).toBe("Yesterday");
  });

  it("returns a formatted date for past dates", () => {
    const pastDate = new Date("2023-12-01");
    expect(formatDate(pastDate.toISOString())).toBe(pastDate.toLocaleDateString());
  });

  it("returns a formatted date for future dates", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    expect(formatDate(futureDate.toISOString())).toBe(futureDate.toLocaleDateString());
  });

  it("handles invalid date inputs gracefully", () => {
    expect(formatDate("invalid-date")).toBe("Invalid date");
  });

  it("handles Date object inputs correctly", () => {
    const dateObj = new Date("2025-12-31");
    expect(formatDate(dateObj)).toBe(dateObj.toLocaleDateString());
  });
});
