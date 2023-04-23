import data from '../fixtures/data.json';
const API_URL = 'http://localhost:3000';

export function fazerLogin(email, password) {
  return cy.request({
    method: 'POST',
    url: `${API_URL}/login`,
    body: {
      email,
      password,
    }
  });
}

export function fazerLoginValido() {
  return fazerLogin(data.login.valid.email, data.login.valid.password);
}

export function fazerLoginInvalido() {
  return fazerLogin(data.login.invalid.email, data.login.invalid.password);
}
