FROM ubuntu/apache2:2.4-20.04_beta
MAINTAINER "sm.yoo@testworks.co.kr"

CMD ["bash"]

RUN a2enmod proxy
RUN a2enmod proxy_http
RUN a2enmod ssl
RUN a2enmod rewrite

EXPOSE 80
EXPOSE 443

CMD ["apache2-foreground"]