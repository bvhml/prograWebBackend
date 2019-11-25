# PrograWeb BACKEND

This project was developed during the second half of the year 2019 in the course called Programacion Web.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node v10.13.0 (LTS)
npm
Docker

### Installing

If you want to run this project in a local enviroment use:
```
npm run start-dev
```
If you want to run this project using docker-compose version 3, use:
```
npm run docker:dev
```
## Running the tests

To run jasmine tests, please run this code:

```
npm run test
```
## Deployment

You can deploy using docker-compose and ECS from AWS. See step by step this AWS documentation to deploy an FARGATE cluster using this project:
```
https://docs.aws.amazon.com/es_es/AmazonECS/latest/developerguide/ecs-cli-tutorial-fargate.html
```
## Built With

* [Node](https://nodejs.org/es/) - JavaScript runtime built.
* [Express.js](http://expressjs.com/) - web framework for Node.js.
* [TypeScript](http://expressjs.com/) - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
* [Mongo](https://www.mongodb.com/) - Document-based, distributed database.
* [Redis](https://redis.io/) - open source (BSD licensed), in-memory data structure store.
* [NPM](https://www.npmjs.com/) - Software registry
* [Jasmine](https://jasmine.github.io/) - Jasmine is a behavior-driven development framework for testing JavaScript code. 

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Byron Victor Hugo Morales Lemus** - *Full work* - [bvhml](https://github.com/bvhml)

See also the list of [contributors](https://github.com/bvhml/prograWebBackend/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Happy hacking :)
