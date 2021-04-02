beforeEach(async () => {
  await cy.task("seedFirestoreData");
});

afterEach(async () => {
  await cy.task("clearFirestoreData");
});

it("renders score form", () => {
  cy.visit("/");
  cy.contains(/enter your score/i).should("exist");

  cy.get(`input[id=name]`).type("Peter");
  cy.get(`input[id=score]`).type("99");
  cy.get(`button`).click();

  cy.visit("/top-scores");
  cy.contains(/peter/i).should("exist");
});
