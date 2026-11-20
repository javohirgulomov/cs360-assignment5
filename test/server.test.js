import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import { createAppServer } from "../src/server.js";

describe("HTTP API", () => {
  let server;
  let baseUrl;

  before(async () => {
    server = createAppServer();
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  });

  after(() => {
    server.closeAllConnections();
    server.close();
  });

  test("grade request for a deleted student returns 404", async () => {
    const created = await fetch(`${baseUrl}/transcripts`, {
      method: "POST",
      body: JSON.stringify({ name: "Mira" }),
    });
    const { studentID } = await created.json();

    await fetch(`${baseUrl}/transcripts/${studentID}/CS360`, {
      method: "POST",
      body: JSON.stringify({ grade: 90 }),
    });
    await fetch(`${baseUrl}/transcripts/${studentID}`, { method: "DELETE" });

    const response = await fetch(`${baseUrl}/transcripts/${studentID}/CS360`);
    assert.equal(response.status, 404);
  });
});