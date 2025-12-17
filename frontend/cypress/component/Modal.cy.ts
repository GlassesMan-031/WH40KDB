import Modal from "../../src/components/Modal.vue";

describe("Modal.cy.ts", () => {
  it("should mount", () => {
    cy.mount(Modal);

    cy.get("#modal").should("exist");
  });

  it("should have the correct structure", () => {
    cy.mount(Modal);

    cy.get(".modal-mask").should("exist");
    cy.get(".modal-mask > .modal-wrapper").should("exist");
    cy.get(".modal-mask > .modal-wrapper > .modal-container").should("exist");
  });

  it("should have the correct header", () => {
    const headerName = "header";
    cy.mount(Modal, {
      props: {
        show: true,
      },
      slots: {
        header: headerName,
      },
    });

    cy.get("#modal-header").should("exist");
    cy.get("#modal-header").should("have.text", headerName);
  });

  it("should have the correct body", () => {
    const bodyName = "body";
    cy.mount(Modal, {
      props: {
        show: true,
      },
      slots: {
        body: bodyName,
      },
    });

    cy.get("#modal-body").should("exist");
    cy.get("#modal-body").should("have.text", bodyName);
  });

  it("should have the correct footer", () => {
    const footerName = "header";
    cy.mount(Modal, {
      props: {
        show: true,
      },
      slots: {
        footer: footerName,
      },
    });

    cy.get("#modal-footer").should("exist");
    cy.get("#modal-footer").should("have.text", footerName);
  });
});

