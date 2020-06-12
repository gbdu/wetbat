from node:lts-alpine

WORKDIR /usr/src/app

# Copy this first to ensure caching
COPY package*.json ./ 

RUN npm install

COPY . .

# Build 
RUN npm run build --production

# Install server to serve our build
RUN npm install -g serve

# Run serve when image is run
CMD serve -s build

# Let docker know what port serve runs on
EXPOSE 5000




