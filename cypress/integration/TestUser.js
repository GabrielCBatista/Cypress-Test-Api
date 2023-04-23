import data from '../fixtures/data.json';
const API_URL = 'http://localhost:3000';

describe('Teste Add User', () => {
  let userId;

  it('Adicionar usuário', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/usuarios`,
      body: {
        nome: data.addUser.user.nome,
        email: data.addUser.user.email,
        password: data.addUser.user.password,
        administrador: data.addUser.user.administrador,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
      userId = response.body._id;
    });
  });

  it('E-mail já cadastrado', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/usuarios`,
      body: {
        nome: data.addUser.user.nome,
        email: data.addUser.user.email,
        password: data.addUser.user.password,
        administrador: data.addUser.user.administrador,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Este email já está sendo usado');
    });
  });

  it('Excluir usuário', function () {
    const token = this.token;

    cy.request({
      method: 'DELETE',
      url: `${API_URL}/usuarios/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro excluído com sucesso');
    });
  });
});
