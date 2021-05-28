FROM openjdk:11.0.10-jdk

ADD target/QuestionService-0.0.1-SNAPSHOT.jar /tmp/QuestionService-0.0.1-SNAPSHOT.jar

RUN sh -c 'touch QuestionService-0.0.1-SNAPSHOT.jar'

VOLUME /tmp

EXPOSE 58082

ENTRYPOINT ["sh","-c","java -jar /tmp/QuestionService-0.0.1-SNAPSHOT.jar"]
