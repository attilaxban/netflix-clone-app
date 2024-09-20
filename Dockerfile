FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common
RUN curl -fsSL https://get.docker.com -o get-docker.sh
RUN sh get-docker.sh

RUN apt-get install -y curl unzip && \
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
unzip awscliv2.zip && \
./aws/install && \
rm -rf awscliv2.zip aws

EXPOSE 8080
