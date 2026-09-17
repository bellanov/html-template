const request = require("supertest");
const app = require("../src/server");

describe("HTML Template Server", () => {
  describe("GET /", () => {
    it("should return the simplified home page", async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain("<!doctype html>");
      expect(res.text).toContain("<h1>HTML Template</h1>");
      expect(res.text).toContain("<p>Various examples of HTML and HTMX usage.</p>");
    });

    it("should not include the old HTMX demo script", async () => {
      const res = await request(app).get("/");
      expect(res.text).not.toContain("htmx.org");
    });
  });

  describe("Static Files", () => {
    it("should serve the CSS stylesheet", async () => {
      const res = await request(app).get("/styles.css");
      expect(res.statusCode).toBe(200);
      expect(res.type).toContain("css");
    });
  });

  describe("Content Type Headers", () => {
    it("should return HTML content for the home page", async () => {
      const res = await request(app).get("/");
      expect(res.headers["content-type"]).toContain("text/html");
    });
  });
});
