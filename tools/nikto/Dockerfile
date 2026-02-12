FROM ubuntu:22.04

RUN apt update && \
    apt install -y nikto perl && \
    rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["nikto"]
