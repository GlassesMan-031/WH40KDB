import { mount } from "cypress/vue";
import UnitSelectionCard from "../../src/components/UnitSelectionCard.vue";

describe("UnitSelectionCard Component", () => {
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

  it("renders the card on screen", () => {
    mount(UnitSelectionCard);
    cy.get('[data-cy="unit-selection-card"]').should("exist");
  });

  it("renders a list of selectable units", () => {
    mount(UnitSelectionCard);
    cy.wait("@getUnits");
    cy.get('[data-cy="unit-list"] li').should("have.length", dummyUnits.length);
  });

  it("fetches units and displays them from axios", () => {
    mount(UnitSelectionCard);
    cy.wait("@getUnits");

    dummyUnits.forEach((unit) => {
      cy.get('[data-cy="unit-list-item"]').contains(unit.name).should("exist");
    });
  });
});
