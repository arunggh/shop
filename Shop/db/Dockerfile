FROM microsoft/windowsservercore

MAINTAINER me

ENV MYSQL_DATABASE=shop \
    MYSQL_ROOT_PASSWORD=root

ADD database.sql /docker-entrypoint-initdb.d

EXPOSE 3306