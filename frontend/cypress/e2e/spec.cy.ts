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

  it("User can login", () => {
    cy.intercept("POST", "/api/account/login", {
      statusCode: 200,
      body: {
        id: 3,
        username: "test1",
        email: "test1",
      },
    });
    cy.intercept("GET", "/api/army/*", {
      statusCode: 200,
      body: [],
    });
    cy.get("button").should("exist");
    cy.get("button").click();

    cy.url().should("eq", "http://localhost:5173/login");

    cy.get("#username").type("test1");
    cy.get("#password").type("test1");

    cy.get("button").click();

    cy.url().should("eq", "http://localhost:5173/army-roster");
  });
});

