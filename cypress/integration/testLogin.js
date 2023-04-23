import data from '../fixtures/data.json';
const API_URL = 'http://localhost:3000';

describe('API Login', () => {
  it('Teste E-mail e senha valido Status Code 200', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/login`,
      body: {
        email: data.login.valid.email,
        password: data.login.valid.password,
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.authorization).to.exist;
    });
  });

  it('Teste E-mail e Senha Invalido Status Code 401', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/login`,
      body: {
        email: data.login.invalid.email,
        password: data.login.invalid.password
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Email e/ou senha inválidos');
    }, (err) => {
      throw new Error(err);
    });
  });
});
