import test from "node:test";
import assert from "node:assert/strict";
import { prepareInquiry as prepare } from "../src/inquiry.js";

const valid = { name: "Robin Example", email: "robin@example.org", service: "film", idea: "A portrait film for an exhibition." };

test("a blank project brief identifies every required field", async () => {
  const result = await prepare({ name: "  ", email: "", idea: "\n" });
  assert.deepEqual(Object.keys(result.errors).sort(), ["email", "idea", "name"]);
  assert.equal(result.mailto, undefined);
});

test("an invalid reply address cannot prepare an email draft", async () => {
  const result = await prepare({ ...valid, email: "robin.example.org" });
  assert.ok(result.errors.email);
  assert.equal(result.mailto, undefined);
});

test("the email draft safely preserves a multiline brief and optional context", async () => {
  const result = await prepare({ ...valid, name: "  Robin\nExample  ", idea: "A film about café culture.\nMotion & stills?", context: "https://example.org/reference?a=1&b=2", timing: "Spring", budget: "To discuss" });
  assert.deepEqual(result.errors, {});
  const draft = new URL(result.mailto);
  assert.equal(draft.pathname, "info@ranbensimon.com");
  assert.equal(draft.searchParams.get("subject").includes("\n"), false);
  assert.ok(draft.searchParams.get("body").includes("A film about café culture.\nMotion & stills?"));
  assert.ok(draft.searchParams.get("body").includes("https://example.org/reference?a=1&b=2"));
  assert.ok(result.brief.includes("Timing: Spring"));
  assert.ok(result.brief.includes("Budget: To discuss"));
});

test("an unknown offer falls back to an exploratory brief", async () => {
  const result = await prepare({ ...valid, service: "made-up" });
  assert.deepEqual(result.errors, {});
  assert.ok(result.brief.includes("Service: Not sure yet"));
  assert.equal(result.brief.includes("undefined"), false);
});

test("optional blank fields are omitted from the prepared brief", async () => {
  const result = await prepare({ ...valid, timing: "  ", budget: "", context: "" });
  assert.equal(result.brief.includes("Timing:"), false);
  assert.equal(result.brief.includes("Budget:"), false);
  assert.equal(result.brief.includes("Links & context"), false);
});
