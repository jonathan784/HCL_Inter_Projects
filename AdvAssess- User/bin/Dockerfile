FROM openjdk:11.0.10-jdk
# add directly the jar

COPY target/mongo1-0.0.1-SNAPSHOT.jar /tmp/mongo1-0.0.1-SNAPSHOT.jar
RUN sh -c 'touch /mongo1-0.0.1-SNAPSHOT.jar'
VOLUME /tmp
EXPOSE 58081 
# COPY ${JAR_FILE}  UserManagement-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["sh", "-c", "pwd"]
# ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar /tmp/UserManagement-service-0.0.1-SNAPSHOT.jar"]
