import UnitEditor from "../../src/components/UnitEditor.vue";

describe("UnitEditor.cy.ts", () => {
  it("playground", () => {
    // cy.mount()
  });

  // it should load the component with the correct bare minimums parts
  it("component", () => {
    cy.mount(UnitEditor);
    cy.get("#uniteditor").should("exist");
  });
  // it should have the correct mock data
  const unit = {
    name: "Royal Warden",
    xml_id: "379b-d6a0-cd05-ef89",
  };
  it("mocked", () => {
    cy.mount(UnitEditor, {
      props: {
        unitData: unit,
      },
    });
    cy.get("#unitname").should("have.value", unit.name);
  });

  // maybe have a beforeeach here

  // it should be able to show stats of unit
  it("show stats", () => {
    cy.mount(UnitEditor, {
      props: unit,
    });

    cy.get("#unitselections > li").should("exist");
  });
  //
  // it should be able to check a checkbox on a unit
  it("check equipment", () => {
    cy.mount(UnitEditor, {
      props: unit,
    });

    cy.get("#unitstats > input").should("exist");
  });
  // it should be able to load description of equipent or abilites
  it("load description", () => {
    cy.mount(UnitEditor, {
      props: unit,
    });

    cy.get("#unitdescription").should("exist");
  });
});

