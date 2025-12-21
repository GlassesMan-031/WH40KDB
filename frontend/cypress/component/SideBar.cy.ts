import { mount } from "cypress/vue";
import { createRouter, createWebHistory } from "vue-router";
import Sidebar from "../../src/components/Sidebar.vue";
import {
  isSidebarCollapsed,
  currentArmyId,
} from "../../src/stores/SideBarState";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/profile", component: { template: "<div>Profile</div>" } },
    { path: "/army-roster", component: { template: "<div>Army Roster</div>" } },
    {
      path: "/army-builder/:id",
      component: { template: "<div>Army Builder</div>" },
    },
  ],
});

describe("Sidebar component", () => {
  beforeEach(() => {
    isSidebarCollapsed.value = false;
    currentArmyId.value = 1;
  });

  it("renders the sidebar", () => {
    mount(Sidebar, {
      global: {
        plugins: [router],
      },
    });

    cy.get('[data-cy="sidebar"]').should("exist");
    cy.get('[data-cy="sidebar-title"]').should("contain", "Menu");
  });

  it("renders navigation links", () => {
    mount(Sidebar, {
      global: {
        plugins: [router],
      },
    });

    cy.get('[data-cy="nav-profile"]').should("exist");
    cy.get('[data-cy="nav-army-roster"]').should("exist");
    cy.get('[data-cy="nav-army-builder"]').should("exist");
  });

  it("hides Army Builder link when no army is selected", () => {
    currentArmyId.value = 0;

    mount(Sidebar, {
      global: {
        plugins: [router],
      },
    });

    cy.get('[data-cy="nav-army-builder"]').should("not.exist");
  });

  it("collapses and expands the sidebar", () => {
    mount(Sidebar, {
      global: {
        plugins: [router],
      },
    });

    cy.get('[data-cy="sidebar-title"]').should("exist");

    cy.get('[data-cy="sidebar-toggle"]').click();
    cy.get('[data-cy="sidebar-title"]').should("not.exist");

    cy.get('[data-cy="sidebar-toggle"]').click();
    cy.get('[data-cy="sidebar-title"]').should("exist");
  });
});
