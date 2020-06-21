FROM node:12.15.0-alpine

# Create Directory for the Container
WORKDIR /src

# Only copy the package.json file to work directory
COPY package.json .

# Install all Packages
RUN yarn install

# Copy all other source code to work directory
ADD . /src

# Copy .env.example to .env
RUN cp env.example .env
# build the app

RUN yarn build

CMD [ "yarn", "start" ]
EXPOSE 3000
