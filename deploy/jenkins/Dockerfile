FROM jenkins/jenkins:lts

USER root

RUN apt-get update

# TODO install ansible here

#RUN apt-get update && apt-get install -y ruby make more-thing-here

#MKDIR /var/jenkins_home/init.groovy.d
#RUN mkdir /var/jenkins_home/init.groovy.d
COPY basic-security.groovy /var/jenkins_home/init.groovy.d/basic-security.groovy

USER jenkins



