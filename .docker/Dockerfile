FROM node:slim

COPY . .

ADD scripts/start.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]
