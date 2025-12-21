describe("Sidebar UI E2E (No API Calls)", () => {
  beforeEach(() => {
    // Start on a page where sidebar is always rendered
    cy.visit("http://localhost:5173/profile");
  });

  it("renders the sidebar and toggle button", () => {
    cy.get('[data-cy="sidebar"]').should("exist");
    cy.get('[data-cy="sidebar-toggle"]').should("exist");
    cy.get('[data-cy="sidebar-title"]').should("contain.text", "Menu");
  });

  it("collapses and expands the sidebar", () => {
    // Collapse sidebar
    cy.get('[data-cy="sidebar-toggle"]').click();
    cy.get('[data-cy="sidebar-title"]').should("not.exist");

    // Expand sidebar
    cy.get('[data-cy="sidebar-toggle"]').click();
    cy.get('[data-cy="sidebar-title"]').should("exist");
  });

  it("navigates between Profile, Army Roster", () => {
    // Navigate to Profile
    cy.get('[data-cy="nav-profile"]').click();
    cy.url().should("include", "/profile");

    // Navigate to Army Roster
    cy.get('[data-cy="nav-army-roster"]').click();
    cy.url().should("include", "/army-roster");

    // Navigate while collapsed
    cy.get('[data-cy="nav-army-roster"]').click();
    cy.url().should("include", "/army-roster");

    // Expand sidebar
    cy.get('[data-cy="sidebar-toggle"]').click();
    cy.get('[data-cy="sidebar-title"]').should("exist");
  });
});
