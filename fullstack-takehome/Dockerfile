# Build angular
FROM node:23 AS ng-build

#check what this does
WORKDIR /src

RUN npm i -g @angular/cli

COPY client/public public
COPY client/src src
COPY client/*.json .

RUN npm ci
RUN ng build


#Build spring boot
FROM openjdk:23-jdk AS j-build

WORKDIR /src
COPY server/.mvn .mvn
COPY server/src src
COPY server/mvnw .
COPY server/pom.xml .

# copy from angular 
COPY --from=ng-build /src/dist/client/browser/* src/main/resources/static

#compile mvn project and run as executable
RUN chmod a+x ./mvnw && ./mvnw package -Dmaven.test.skip=true

#copy the JAR file over to the final container
FROM openjdk:23-jdk

WORKDIR /app
COPY --from=j-build /src/target/server-0.0.1-SNAPSHOT.jar app.jar

ENV SERVER_PORT=8080
# ENV SPRING_DATA_MONGODB_URI=mongodb://localhost:27017/bgg
# localhost reffers to the container not local machine
# ENV SPRING_DATA_MONGODB_URI=mongodb://host.docker.internal:27017/bgg

ENV SPRING_DATA_REDIS_HOST=host.docker.internal
ENV SPRING_DATA_REDIS_PASSWORD=
ENV SPRING_DATA_REDIS_PORT=6379
ENV SPRING_DATA_REDIS_USERNAME=




EXPOSE ${SERVER_PORT}

SHELL ["/bin/sh", "-c"]

ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar




# docker image build -t sphuar/csf-day35:v1.0.0 .
# docker run -d -p 12345:8080 sphuar/csf-day35:v1.0.0