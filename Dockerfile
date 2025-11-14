FROM node:20-alpine

WORKDIR /app

COPY . .

EXPOSE 9080

# Run MAM dev server for the whole workspace
# Добро будет доступно по /bog/dobro/app/-/test.html
CMD ["npm", "exec", "mam", "."]
