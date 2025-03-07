import Fastify from 'fastify';
import cors from '@fastify/cors'
import { eventApi } from './routers/eventApi';
import { registrarDependencias } from './config/RegistrarDependencias.config';

const fastify = Fastify({
    // logger: true
    bodyLimit: 52428800
})

registrarDependencias();

fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true
});

// fastify.register(fastifyMultipart);

fastify.register(eventApi, { prefix: '/api/v1' });


const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});
