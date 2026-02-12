FROM ubuntu:22.04

RUN apt update && \
    apt install -y nmap && \
    rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["nmap"]
