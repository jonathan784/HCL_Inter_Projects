FROM openjdk:11.0.10-jdk

COPY target/userServiceApplication-0.0.1-SNAPSHOT.jar /tmp/userServiceApplication-0.0.1-SNAPSHOT.jar

RUN sh -c 'touch userServiceApplication-0.0.1-SNAPSHOT.jar'

VOLUME /tmp

EXPOSE 58081

#ENTRYPOINT ["sh","-c","pwd"]
ENTRYPOINT ["sh", "-c", "java -jar /tmp/userServiceApplication-0.0.1-SNAPSHOT.jar"]