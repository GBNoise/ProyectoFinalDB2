/// <reference types="cypress" />
describe("productores", () => {
  it("can get all productores", () => {
    cy.request("localhost:8000/productor").then((response) => {
      expect(response.status).to.eq(200);
      assert.isArray(response.body.object.rows);
    });
  });
});
