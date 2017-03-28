FROM hub.c.163.com/library/nginx:latest

ADD nginx.conf /etc/nginx/
ADD  apps /etc/nginx/apps/



EXPOSE 80 443

CMD ["/usr/sbin/nginx"]
