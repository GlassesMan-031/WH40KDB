describe("WH40K Builder", () => {
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
});
