/// <reference types="cypress" />

const baseURL = "localhost:8000";

describe("testing", () => {
  it("can get all users", () => {
    cy.request("localhost:8000/users").as("userRequest");

    cy.get("@userRequest").then((response: any) => {
      cy.log(response);
      expect(response.status).to.eq(200);
      const thing = response.body.object.rows;
      assert.isArray(thing, "Rows is an array");
    });
  });

  it("can get a single user", () => {
    cy.request("localhost:8000/users/1").as("singleUserRequest");

    cy.get("@singleUserRequest").then((response: any) => {
      expect(response.status).to.eq(200);
      const thing = JSON.stringify(response.body.object.rows[0]);

      assert.equal(
        thing,
        JSON.stringify({
          AppUserID: 1,
          Username: "noisexy",
          Email: "noisexy@gmail.com",
          Pass: "$2b$10$TEkNvPa2S1xrHTGVSpnpSe76tvEpRaMDZCrNVip/QUfxmGRsGca2K",
          IsVerified: false,
          IsActivated: false,
          IsBlocked: false,
        })
      );
    });
  });
});
