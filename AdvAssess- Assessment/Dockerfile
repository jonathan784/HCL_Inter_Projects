FROM openjdk:11.0.10-jdk

ADD target/projectexample-0.0.1-SNAPSHOT.jar /tmp/projectexample-0.0.1-SNAPSHOT.jar

RUN sh -c 'touch projectexample-0.0.1-SNAPSHOT.jar'

VOLUME /tmp

EXPOSE 58080

#ENTRYPOINT ["sh","-c","pwd"]
ENTRYPOINT ["sh", "-c", "java -jar /tmp/projectexample-0.0.1-SNAPSHOT.jar"]