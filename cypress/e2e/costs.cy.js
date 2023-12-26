/* eslint-disable no-undef */
const existedEmail = "hello@mail.ru";

describe('costs specs', () => {
  it('go to cost page', () => {
    cy.visit('/');
    cy.contains('SignIn').click();
    cy.get('[data-test="userEmail"]').type(existedEmail);
    cy.get('[data-test="userPass"]').type(`123456`);
    cy.get('.signIn__form__btn').not('.desibled').click();
    cy.contains('Ok').click();
    cy.get('[data-test="menuBtn"]').click();
    cy.get('[data-test="costsLink"]').click();
    cy.contains('Ok').click();
    cy.contains('Expenses');
    cy.url().should('include', '/costs');
  });

  it('add cost', () => {
    cy.visit('/');
    cy.contains('SignIn').click();
    cy.get('[data-test="userEmail"]').type(existedEmail);
    cy.get('[data-test="userPass"]').type(`123456`);
    cy.get('.signIn__form__btn').not('.desibled').click();
    cy.contains('Ok').click();
    cy.get('[data-test="menuBtn"]').click();
    cy.get('[data-test="costsLink"]').click();
    cy.contains('Ok').click();
    cy.get('[data-test="addBtn"]').click();
    cy.get('[data-test="title"]').type(`TEst1`);
    cy.get('[data-test="amount"]').type(`1000`);
    cy.get('[data-test="addCostsBtn"]').not('.desibled').click();
    cy.contains('TEst1');
  });


  it('add and delete cost', () => {
    cy.visit('/');
    cy.contains('SignIn').click();
    cy.get('[data-test="userEmail"]').type(existedEmail);
    cy.get('[data-test="userPass"]').type(`123456`);
    cy.get('.signIn__form__btn').not('.desibled').click();
    cy.contains('Ok').click();
    cy.get('[data-test="menuBtn"]').click();
    cy.get('[data-test="costsLink"]').click();
    cy.contains('Ok').click();
    cy.get('[data-test="addBtn"]').click();
    cy.get('[data-test="title"]').type(`For delete`);
    cy.get('[data-test="amount"]').type(`1000`);
    cy.get('[data-test="addCostsBtn"]').not('.desibled').click();
    cy.contains('For delete').parent().find('.delIcon').click();
    cy.contains('Ok').click();
    cy.contains('For delete').should('not.exist');
  });
});