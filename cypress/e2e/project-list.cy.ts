import mockProjects from "../fixtures/projects.json";

const statusMessage = {
  info: "Stable",
  warning: "Warning",
  error: "Critical",
};
const languageNames = ["React", "Node.js", "Python"];

describe("Error Alert", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      statusCode: 500, //force error
      body: {
        error: "Something went wrong!",
      },
    }).as("getProjectsError");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");
  });

  it("displays error message and try again button", () => {
    cy.wait("@getProjectsError");

    // error message
    cy.get('span[data-testid="error-message"]').should(
      "contain.text",
      "There was a problem loading the project data",
    );

    // try again button
    cy.get('button[data-testid="try-again-button"]').should("be.visible");
  });

  it("refetches data when try again button is clicked", () => {
    cy.wait("@getProjectsError");

    // initiate successful request
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // click try again button and wait for request to resolve
    cy.get('button[data-testid="try-again-button"]').click();
    cy.wait("@getProjects");
    cy.get('button[data-testid="try-again-button"]').should("not.exist");
  });
});

describe("Project List", () => {
  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);

      // initiate successful request
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
        delayMs: 2000, //delay response
      }).as("getProjects");

      // open projects page
      cy.visit("http://localhost:3000/dashboard");
    });

    it("displays loading spinner", () => {
      // check for loading spinner
      cy.get('[data-testid="loading-spinner"]').should("be.visible");

      // wait for request to resolve
      cy.wait("@getProjects");
      cy.get('[data-testid="loading-spinner"]').should("not.exist");
    });

    it("displays projects", () => {
      cy.wait("@getProjects");

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
