import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl";

test("normalizeURL", () => {
  expect(normalizeURL("https://example.com/")).toBe("https://example.com");
  expect(normalizeURL("https://example.com")).toBe("https://example.com");
  expect(normalizeURL("https://example.com/foo/")).toBe(
    "https://example.com/foo"
  );
  expect(normalizeURL("https://example.com/foo")).toBe(
    "https://example.com/foo"
  );
});
