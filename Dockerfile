FROM fedora:27

LABEL maintainer = "Ushakov Pavel <pushakovv@yandex.ru>"

ENV APPPATH /var/www/node

RUN yum -y install nodejs

WORKDIR $APPPATH

RUN mkdir -p $APPPATH

ADD . $APPATH

EXPOSE 8080

CMD ["npm", "start"]