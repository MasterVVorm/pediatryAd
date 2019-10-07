FROM jenkins/jenkins:lts

USER root

RUN apt-get update

# install ansible here
RUN echo "deb http://ppa.launchpad.net/ansible/ansible/ubuntu trusty main" >> /etc/apt/sources.list
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 93C4A3FD7BB9C367
RUN apt update && apt install -y ansible

COPY basic-security.groovy /var/jenkins_home/init.groovy.d/basic-security.groovy

RUN apt install -y rsync

USER jenkins

RUN /usr/local/bin/install-plugins.sh github ansible



