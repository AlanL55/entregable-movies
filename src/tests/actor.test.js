const request = require("supertest");
const app = require("../app");
let id;

test('GET /actors debe traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () => {
    const actor = {
        firstName: "Enrique ",
        lastName: "Segoviano",
        nationality: "Mexico",
        image: "text.jpg",
        birthday: "1990-10-10"
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(actor.name);
});

test('PUT /actors/:id debe actualizar un actor', async () => {
    const actor = {
        firstName: "Beto"
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actor.name);
});

test('DELETE /actors/:id debe eliminar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});