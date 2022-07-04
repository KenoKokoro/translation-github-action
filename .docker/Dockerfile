FROM node:slim

RUN apt-get update && apt-get install -y git

ADD scripts/start.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
