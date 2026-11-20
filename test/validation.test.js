import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { normalizeCourse, requireCourse, requireGrade } from "../src/validation.js";

describe("validation helpers", () => {
  test("normalizeCourse trims and uppercases", () => {
    assert.equal(normalizeCourse("  cs360 "), "CS360");
    assert.equal(normalizeCourse(undefined), "");
  });

  test("requireCourse rejects empty course names", () => {
    assert.equal(requireCourse(" cs360"), "CS360");
    assert.throws(() => requireCourse("   "), /Course name is required/);
  });

  test("requireGrade accepts integers from 0 to 100 only", () => {
    assert.equal(requireGrade("85"), 85);
    assert.throws(() => requireGrade(101), /Grade must be an integer from 0 to 100/);
    assert.throws(() => requireGrade(-1), /Grade must be an integer from 0 to 100/);
    assert.throws(() => requireGrade(7.5), /Grade must be an integer from 0 to 100/);
  });
});