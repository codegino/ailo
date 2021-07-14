FROM node:14.17-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copy configs to /app folder
COPY package*.json ./
COPY tsconfig*.json ./
# copy source code to /app/src folder
COPY src ./app/src

# check files list
RUN ls -a

RUN npm install
# If you are building your code for production

RUN npm run build

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "./build/src/main.js" ]
