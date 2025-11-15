const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Todo = require('../models/Todo');
const {MongoMemoryServer} = require('mongodb-memory-server');

let mongodb;

beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongodb.stop();
});

afterEach(async () => {
    await Todo.deleteMany();
});

describe('Todo API', () => {
    test("POST /api/todos - create a todo", async () => {
        const res = await request(app).post('/api/todos').send({title: 'Testing'});
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject({title: 'Testing', completed: false});
    });

    test("GET /api/todos - get all todos", async () => {
        await Todo.create([{title: 'Test1'}, {title: 'Test2'}]);
        const res = await request(app).get('/api/todos');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });

    test("PUT /api/todos/:id - toggles completed", async () => {
        const todo = await Todo.create({title: 'Toggle Me'});
        const res = await request(app).put(`/api/todos/${todo._id}`).send({ completed: true });
        expect(res.statusCode).toBe(200);
        expect(res.body.completed).toBe(true);
    });

    test("DELETE /api/todos/:id - deletes a todo", async () => {
        const todo = await Todo.create({title: 'Delete Me'});
        const res = await request(app).delete(`/api/todos/${todo._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Todo deleted' });
        const remain = await Todo.findById(todo._id);
        expect(remain).toBeNull();
    });
})