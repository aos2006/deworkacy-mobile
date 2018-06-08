# Set the base image to Ubuntu
FROM ubuntu:16.04


# Install Node.js and other dependencies
RUN apt-get update
RUN apt-get -y install sudo
RUN apt-get -y install curl
RUN apt-get -y install git
RUN apt-get -y install wget
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash
RUN sudo -E apt-get install --yes nodejs
RUN npm install -g yarn
RUN npm install -g babel-cli babel-core
RUN npm install babel-preset-env babel-preset-stage-2 babel-preset-react babel-preset-react-optimize
RUN apt-get install -y autoconf
RUN apt-get install -y automake
RUN apt-get install -y g++
RUN apt-get install -y libpng-dev
RUN apt-get install -y libtool
RUN apt-get install -y make
RUN apt-get install -y nasm
RUN apt-get install -y python
# Installing deps
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /var/www/dwy && cp -a /tmp/node_modules /var/www/dwy
# Wokr dir
WORKDIR /var/www/dwy
ADD . /var/www/dwy
RUN npm run build
# Working commands
RUN npm -v && node -v
RUN ls -la

# Expose port
EXPOSE 8080-4000

# Run app
CMD HOST="localhost" node ./dist/server.js
