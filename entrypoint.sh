#!/bin/bash

# create databse if not exists
sequelize db:create

# Apply migration files
sequelize db:migrate

# Apply seeders
# sequelize db:seed:all

# Run Server
npm start
