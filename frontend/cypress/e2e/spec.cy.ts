describe("WH40K Builder", () => {
  let accountID = 0;

  beforeEach(() => {
    // cy.origin("http://localhost:5173", () => {
    cy.visit("http://localhost:5173/");
    // });
  });

  it("User can see the welcome page", () => {
    cy.contains("h1", "WH40K ARMY BUILDER");
  });

  it("User can travel to login page then signup", () => {
    cy.get("button").should("exist");
    cy.get("button").click();

    cy.url().should("eq", "http://localhost:5173/login");

    cy.get("#register-button").should("exist");
    cy.get("#register-button").click();

    cy.url().should("eq", "http://localhost:5173/register");
  });

  it("User can register and login", () => {
    cy.get("button").should("exist");
    cy.get("button").click();

    cy.url().should("eq", "http://localhost:5173/login");

    cy.get("#register-button").should("exist");
    cy.get("#register-button").click();

    cy.url().should("eq", "http://localhost:5173/register");

    cy.get("#username").type("cypresstest");
    cy.get("#email").type("cypresstest@test.test");
    cy.get("#password").type("cypresstest");

    cy.get("button").click();

    cy.url().should("eq", "http://localhost:5173/login");

    cy.get("#username").type("cypresstest");
    cy.get("#password").type("cypresstest");

    cy.get("button").click();

    cy.url().should("eq", "http://localhost:5173/army-roster");
  });

  it("User can create new Roster", () => {
    // Login
    cy.get("button").should("exist");
    cy.get("button").click();

    cy.url().should("eq", "http://localhost:5173/login");

    cy.get("#username").type("cypresstest");
    cy.get("#password").type("cypresstest");

    cy.get("button").click();

    cy.url().should("eq", "http://localhost:5173/army-roster");

    // create new army roster
    cy.get("#roster-create").click();

    // army modal
    cy.get(".modal-mask").should("exist");
    cy.get("#army-name").type("cypressArmy1");
    cy.get("#army-number").type("2000");

    cy.get("#army-create").click();

    // army card
    cy.get("#roster-card > h3").first().should("have.text", "cypressArmy1");
    cy.get("#roster-card > p").first().should("have.text", "Points: 2000");
  });

  it("should delete account after tests", () => {
    cy.request("DELETE", "http://localhost:5173/api/account", {
      username_or_email: "cypresstest",
      password: "cypresstest",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
