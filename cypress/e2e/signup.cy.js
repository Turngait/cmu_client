/* eslint-disable no-undef */
const existedEmail = "hello@mail.ru";

describe('signUp specs', () => {
  it('open sign up modal', () => {
    cy.visit('/');
    cy.contains('SignUp').click();
    cy.get('.signUp__form__btn').should('have.class', 'desibled');
  });


  // it('sign up in app', () => {
  //   cy.visit('/');
  //   cy.contains('SignUp').click();
  //   cy.get('[data-test="userName"]').type('John');
  //   cy.get('[data-test="userEmail"]').type(`${Date.now()}@email.com`);
  //   cy.get('[data-test="userPass"]').type(`123456`);
  //   cy.get('[data-test="userAcc"]').type(`First`);
  //   cy.get('[data-test="userBalance"]').type(`1000`);
  //   cy.get('.signUp__form__btn').not('.desibled').click();
  //   cy.contains('Ok').click();
  //   cy.get('.topMenu__title');
  // });

  it('email exist', () => {
    cy.visit('/');
    cy.contains('SignUp').click();
    cy.get('[data-test="userName"]').type('John');
    cy.get('[data-test="userEmail"]').type(existedEmail);
    cy.get('[data-test="userPass"]').type(`123456`);
    cy.get('[data-test="userAcc"]').type(`First`);
    cy.get('[data-test="userBalance"]').type(`1000`);
    cy.get('.signUp__form__btn').not('.desibled').click();
    cy.contains('Such email is exist already');
  });
});