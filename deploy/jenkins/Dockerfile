FROM jenkins/jenkins:lts

USER root

RUN apt-get update

# TODO install ansible here

#RUN apt-get update && apt-get install -y ruby make more-thing-here

COPY basic-security.groovy /var/jenkins_home/init.groovy.d/basic-security.groovy

USER jenkins

RUN /usr/local/bin/install-plugins.sh github ansible



