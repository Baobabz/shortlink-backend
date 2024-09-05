testdb:
	docker run -d --name db -p 3306:3306 \
	-e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=shortlink \
	-v $(PWD)/db:/var/lib/mysql \
	mysql:8.0.39
