import { mount } from "cypress/vue";
import UnitSelectionCard from "../../src/components/UnitSelectionCard.vue";

describe("UnitSelectionCard", () => {
  const mockCat = [
    {
      id: "u1",
      name: "Necron Warrior",
      type: "unit",
      costs: [{ name: "pts", value: 13 }],
    },
    {
      id: "u2",
      name: "Immortal",
      type: "unit",
      costs: [{ name: "pts", value: 18 }],
    },
    {
      id: "m1",
      name: "Lychguard",
      type: "model",
      costs: [{ name: "pts", value: 25 }],
    },
  ];

  const mountComponent = () => {
    mount(UnitSelectionCard, {
      props: {
        id: 1,
        length: 0,
        cat: mockCat,
      },
    });
  };

  it("renders the component", () => {
    mountComponent();
    cy.get('[data-cy="unit-selection-card"]').should("exist");
  });

  it("renders the correct number of units", () => {
    mountComponent();
    cy.get('[data-cy="unit-button"]').should("have.length", 3);
  });

  it("shows model tag for model-type units", () => {
    mountComponent();
    cy.get('[data-cy="unit-model-tag"]')
      .should("exist")
      .and("contain", "model");
  });

  it("emits select event when a unit is clicked", () => {
    const onSelect = cy.spy().as("onSelect");

    mount(UnitSelectionCard, {
      props: {
        id: 1,
        length: 0,
        cat: mockCat,
        onSelect,
      },
    });

    cy.get('[data-cy="unit-button"]').first().click();

    cy.get("@onSelect").should("have.been.calledOnce");

    cy.get("@onSelect").its("firstCall.args.0").should("include", {
      name: "Necron Warrior",
    });
  });

  it("applies selected styling when clicked", () => {
    mountComponent();

    cy.get('[data-cy="unit-button"]')
      .first()
      .click()
      .should("have.class", "bg-blue-400");
  });
});
