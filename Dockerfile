# pull the official base image for node
FROM node AS builder

# set working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copy files 
COPY package.json ./
COPY package-lock.json ./

# copy client app code
COPY ./ ./

# install application dependencies
RUN npm i

# run the build command to generate the static build files
RUN npm run build

# pull the official base image for nginx server
FROM nginx as production

# copy from build assets and set up the nginx config file
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80 for the server
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]