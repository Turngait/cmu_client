/* eslint-disable no-undef */
const existedEmail = "hello@mail.ru";
const pass = '123456';

describe('signIn specs', () => {
  it('open sign in modal', () => {
    cy.visit('/');
    cy.contains('SignIn').click();
    cy.get('.signIn__form__btn').should('have.class', 'desibled');
  });

  it('sign in in app', () => {
    cy.visit('/');
    cy.contains('SignIn').click();
    cy.get('[data-test="userEmail"]').type(existedEmail);
    cy.get('[data-test="userPass"]').type(pass);
    cy.get('.signIn__form__btn').not('.desibled').click();
    cy.get('.topMenu__title');
    cy.url().should('include', '/dashboard');
  });

  it('sign in wrong pass', () => {
    cy.visit('/');
    cy.contains('SignIn').click();
    cy.get('[data-test="userEmail"]').type(existedEmail);
    cy.get('[data-test="userPass"]').type('pass');
    cy.get('.signIn__form__btn').not('.desibled').click();
    cy.contains('Wrong password or email');
  });

  it('sign in wrong email', () => {
    cy.visit('/');
    cy.contains('SignIn').click();
    cy.get('[data-test="userEmail"]').type('sdsds@ddsdsds.com');
    cy.get('[data-test="userPass"]').type(pass);
    cy.get('.signIn__form__btn').not('.desibled').click();
    cy.contains('Wrong password or email');
  });
});