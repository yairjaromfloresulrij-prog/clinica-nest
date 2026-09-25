<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

API de la Clínica Salud Integral, migrada de Express a NestJS + Prisma + PostgreSQL. Gestiona Pacientes, Médicos, Citas y Reportes de Gerencia.

## Recorrido del pipeline: `POST /citas`

Este es el mapa mental que me llevo después de tres semanas migrando la API a NestJS: el camino completo que recorre un request a `POST /citas`, en el orden en que Nest lo ejecuta.

Cuando alguien manda un `POST /citas`, ese request no llega directo al código que crea la cita. Antes pasa por varias "postas" de control, una después de la otra. Así es el recorrido:

1. **`JwtAuthGuard`** — es el primer portero. Revisa si el request trae un token (algo así como una credencial digital) en el header `Authorization`. Si no lo trae, o está mal, ahí termina todo con un error `401` (no autorizado) y el request nunca llega más lejos.
2. **`RolesGuard`** — es el segundo portero. Ya sabemos quién es el usuario (gracias al paso anterior), así que ahora se fija si ese usuario tiene el rol correcto para crear una cita (en este caso, `RECEPCIONISTA`). Si no le corresponde, corta con un `403` (prohibido).
3. **`LoggingInterceptor` (parte de entrada)** — este no bloquea nada, solo anota la hora en que arrancó el request, para más adelante calcular cuánto tardó todo el proceso.
4. **`ValidationPipe`** — revisa que los datos que mandaron en el body (fecha, paciente, médico, etc.) tengan el formato correcto, según las reglas que definimos en el DTO. Si falta un dato o está mal escrito, corta con un `400` (mal pedido) antes de que el controller vea siquiera el request.
5. **`CitasController` → `CitasService`** — recién acá se ejecuta la lógica real: primero se fija si el paciente existe (llamando a `PacientesService`); si no existe, se corta con un `404` (no encontrado). Si existe, ahí sí se crea la cita en la base de datos.
6. **`PrismaExceptionFilter`** — si en el paso anterior algo sale mal del lado de la base de datos (por ejemplo, el médico que se puso no existe), este filtro "atrapa" ese error técnico y lo convierte en una respuesta clara y prolija, en vez de mostrar un error feo de Prisma.
7. **`LoggingInterceptor` (parte de salida)** — antes de que la respuesta final salga para el usuario, este interceptor calcula cuánto tiempo pasó desde que arrancó (paso 3) hasta ahora, y lo deja anotado en la consola del servidor.

Lo que más me costó entender al principio es la diferencia entre estas piezas: los Guards y el Interceptor "envuelven" todo el proceso de punta a punta (entran antes de todo y el interceptor también cierra al final), mientras que el Pipe actúa en un momento puntual (antes de que el controller reciba los datos) y el Filter solo aparece si algo sale mal. Pensarlo como capas que van filtrando el request, una por una, hasta llegar al corazón de la lógica (el Service), fue lo que me ayudó a entenderlo de verdad.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Observability

In production applications, observability is essential for understanding how your system behaves, detecting issues early, and maintaining reliable performance.

[NestJS Observe](https://observe.nestjs.com) automatically instruments your NestJS application, giving you deep visibility into your system with minimal setup:

- **Distributed tracing:** Follow requests across services and understand how they flow through your system.
- **Waterfall analysis:** Visualize request execution and identify slow operations, bottlenecks, and unexpected delays.
- **Performance analysis:** Analyze application performance in real time and quickly pinpoint areas that need optimization.
- **Metrics:** Track key application and infrastructure metrics to understand system health and performance trends.
- **Logging:** Centralize and correlate logs with traces and other telemetry to make debugging easier.
- **Error tracking:** Detect errors quickly and investigate their root causes with the surrounding context.
- **SLA monitoring:** Track service-level objectives and identify when your application is approaching or exceeding defined thresholds.
- **Alarms and alerts:** Set up alerts for critical errors, performance degradation, SLA violations, and other anomalies so your team can react quickly.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Auto-instrument your application with [NestJS Observer](https://observer.nestjs.com). Distributed tracing, metrics, and logging made easy. Error tracking and performance monitoring for your NestJS applications.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
