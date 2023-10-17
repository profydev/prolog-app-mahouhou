const menuItems = [
  { text: "Docs", href: "#" },
  { text: "API", href: "#" },
  { text: "Help", href: "#" },
  { text: "Community", href: "#" },
];

describe("Footer", () => {
  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);

      //visit the dashboard where footer is visible
      cy.visit("http://localhost:3000/dashboard");
    });

    it("renders correctly", () => {
      //check for footer element
      cy.get("footer").should("exist");

      //check for correct number of menu items
      cy.get("footer").find("li").should("have.length", menuItems.length);

      //check for correct links
      menuItems.forEach((item) => {
        cy.get("footer")
          .contains(item.text)
          .should("have.attr", "href", item.href);
      });

      //check for logo
      cy.get("footer")
        .find("img")
        .should("have.attr", "src", "/icons/logo-small.svg");

      //check for version number
      cy.get("footer").find("span").contains("14.5.2");
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");

      //visit the dashboard where footer is visible
      cy.visit("http://localhost:3000/dashboard");
    });

    it("renders correctly", () => {
      //check for footer element
      cy.get("footer").should("exist");

      //check for correct number of menu items
      cy.get("footer").find("li").should("have.length", menuItems.length);

      //check for correct links
      menuItems.forEach((item) => {
        cy.get("footer")
          .contains(item.text)
          .should("have.attr", "href", item.href);
      });

      //check for logo
      cy.get("footer")
        .find("img")
        .should("have.attr", "src", "/icons/logo-small.svg");

      //check for version number
      cy.get("footer").find("span").contains("14.5.2");
    });
  });
});
