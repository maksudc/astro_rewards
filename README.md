# Description

The repository is a mirrror of [Astro rewards](https://rewards.astro.com.my/).
Unlike original site it can be browsed via web browsers in Desktop and other screens.

Technologies used are {Nodejs}, {ReactJs}, {Mysql}, {Bootstrap}

Browse at [Site link](http://172.104.167.246:3001/) to see the demo.

# Set Up

- clone the repository
- install `node(v10.16.0)`
- Install mysql
- Update the `PROJECT_ROOT/config/default.json` or `PROJECT_ROOT/config/production.json`
  based on your choice for database configurations.
- `cd` to `PROJECT_ROOT` and run `npm install --save`
- RUN the migrations. `node_modules/sequelize-cli/lib/sequelize db:migrate`
- RUN the seeds `node_modules/sequelize-cli/lib/sequelize db:seed:all`
- RUN `npm start` while at `PROJECT_ROOT`
- `cd `to` PROJECT_ROOT/client` and run `npm install --save`
- RUN `npm start` while at `PROJECT_ROOT/client`
- Browse to `http://localhost:3001`

# Api Collection

[Postman Collection](https://www.getpostman.com/collections/a800022f0501c8e62301)

# Demo User credentials

- [Demo users](https://github.com/maksudc/astro_rewards/blob/master/infrastructure/db/fixtures/subscribers.js)

# Incomplete features

- Remember me while verification and session association
- If verification fails exactly what mismatched is not shown currently

# License

May be freely distributed under the [MIT license](https://raw.githubusercontent.com/maksudc/astro_rewards/master/LICENSE)

Copyright (c) 2019 Md. Maksud Alam Chowdhury & Astro Malaysia
