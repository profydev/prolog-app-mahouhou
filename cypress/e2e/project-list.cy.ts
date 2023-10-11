import mockProjects from "../fixtures/projects.json";

const statusMessage = {
  info: "Stable",
  warning: "Warning",
  error: "Critical",
};

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
      delayMs: 2000, //delay response
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("displays the loading state", () => {
      cy.get('[data-testid="loading-spinner"]').should("be.visible");
      //wait for request to resolve
      cy.wait("@getProjects");
      cy.get('[data-testid="loading-spinner"]').should("not.exist");
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(
            statusMessage[
              mockProjects[index].status as keyof typeof statusMessage
            ],
          );
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });
});
