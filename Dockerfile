FROM node:18

# Create app directory
WORKDIR /usr/src/app
RUN npm i -g pnpm

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY pnpm*.yaml ./

RUN pnpm install 
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

RUN pnpm build

ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "server.js" ]

USER node