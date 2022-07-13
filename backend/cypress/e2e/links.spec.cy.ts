/// <reference types="cypress" />
import { Link } from "../../src/Models/models";

const baseURL = "localhost:8000";

describe("linkstable testing", () => {
  it("can get all links", () => {
    cy.request(`${baseURL}/links`).as("linkRequest");
    cy.get("@linkRequest").then((response: any) => {
      expect(response.status).to.eq(200);
      const thing = response.body.object.rows;
      assert.isArray(thing, "rows in an array");
    });
  });

  it("can get user links", () => {
    cy.request(`${baseURL}/links/user/1`).as("userLinksReq");
    cy.get("@userLinksReq").then((res: any) => {
      expect(res.status).to.eq(200);
      const thing = res.body.object.rows;
      assert.isArray(thing);
    });
  });

  it("can create a link", () => {
    const link: Link = {
      Link: "testingfromcypress.com",
      AppUserID: 1,
    };
    cy.request("post", `${baseURL}/links`, link).then((res) => {
      const thing = res.body.message;
      assert.equal(thing, "Sucessfully inserted into Link");
    });
  });

  it("fails to create a link to a nonexistent user", () => {
    const link: Link = {
      Link: "testingfromcy.com",
      AppUserID: 12132,
    };

    cy.request({
      url: `${baseURL}/links`,
      method: "post",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(500);
    });
  });

  it("can delete a link", () => {
    cy.request(`${baseURL}/links/user/1`).as("userLinksReq");
    cy.get("@userLinksReq").then((res: any) => {
      expect(res.status).to.eq(200);
      const thing = res.body.object.rows;
      assert.isArray(thing);

      const random = Math.floor(Math.random() * thing.length);

      cy.request("delete", `${baseURL}/links/${random}`).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });

  it("can update a link", () => {
    cy.request("put", `${baseURL}/links`).then((res) => {
      expect(res.body).to.eq("update link route");
    });
  });
});
