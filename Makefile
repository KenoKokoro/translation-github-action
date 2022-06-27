start-docker:
	@docker-compose up -d --build

stop-docker:
	@docker-compose down -v

build:
	@docker-compose exec --user=node action npm run build

install:
	@docker-compose exec --user=node action npm install

test:
	@docker-compose exec --user=node action npm test

act:
	@./bin/act
