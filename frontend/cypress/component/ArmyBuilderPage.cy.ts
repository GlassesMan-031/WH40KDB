import ArmyBuilderPage from "../../src/pages/BuilderPage.vue";

describe("ArmyBuilderPage", () => {
  const dummyUnits = [
    { id: 1, name: "Necron Warrior" },
    { id: 2, name: "Immortal" },
    { id: 3, name: "Lychguard" },
  ];

  beforeEach(() => {
    cy.intercept("GET", "/api/units", {
      statusCode: 200,
      body: dummyUnits,
    }).as("getUnits");
  });

  it("renders without crashing", () => {
    cy.mount(ArmyBuilderPage);
    cy.get("body").should("exist");
  });

  it("renders the sidebar", () => {
    cy.mount(ArmyBuilderPage);
    cy.get("aside").should("exist");
  });

  it("renders the UnitSelectionCard", () => {
    cy.mount(ArmyBuilderPage);
    cy.get('[data-cy="unit-selection-card"]').should("exist");
  });

  it("loads units successfully and displays them inside the card", () => {
    cy.mount(ArmyBuilderPage);

    cy.wait("@getUnits");

    dummyUnits.forEach((unit) => {
      cy.contains(unit.name).should("exist");
    });
  });
});
