FROM nostressmeister/node:latest
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT npx sequelize db:migrate
ENTRYPOINT node start
EXPOSE 3111