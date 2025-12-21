describe("Sidebar + Army Selection E2E (Login Showcase, No API Calls)", () => {
  const showcaseUser = {
    username: "showcase",
    password: "showcase",
  };

  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.get("button").click();
    cy.url().should("include", "/login");

    cy.get("#username").type(showcaseUser.username);
    cy.get("#password").type(showcaseUser.password);

    cy.get("button").click();

    cy.url().should("include", "/army-roster");
  });

  it("renders sidebar and toggles correctly", () => {
    cy.get('[data-cy="sidebar"]').should("exist");
    cy.get('[data-cy="sidebar-toggle"]').should("exist");
    cy.get('[data-cy="sidebar-title"]').should("contain.text", "Menu");

    cy.get('[data-cy="sidebar-toggle"]').click();
    cy.get('[data-cy="sidebar-title"]').should("not.exist");

    cy.get('[data-cy="sidebar-toggle"]').click();
    cy.get('[data-cy="sidebar-title"]').should("exist");
  });

  it("navigates to Army Builder when an existing army card is clicked", () => {
    cy.url().should("include", "/army-roster");

    cy.get('[data-cy="army-list-item"]').first().click();

    cy.url().should("include", "/army-builder/1");
  });
});
