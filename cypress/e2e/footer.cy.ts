const menuItems = [
  { text: "Docs", href: "#" },
  { text: "API", href: "#" },
  { text: "Help", href: "#" },
  { text: "Community", href: "#" },
];

describe("Footer", () => {
  it("renders correctly", () => {
    //visit the page
    cy.visit("http://localhost:3000/dashboard");

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
    cy.get("footer").find("span").should("have.attr", "data-version");
  });
});
