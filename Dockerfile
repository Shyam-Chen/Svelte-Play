FROM buildpack-deps:jessie

ENV HOME /Frontend-Starter-Kit

WORKDIR ${HOME}
ADD . $HOME

# node
RUN \
  curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  apt-get update && \
  apt-get install -y nodejs

ENV PATH $HOME/.yarn/bin:$PATH

# java
RUN \
  wget -nv -O /tmp/jdk.tgz --no-check-certificate --no-cookies \
    --header "Cookie: oraclelicense=accept-securebackup-cookie" \
    http://download.oracle.com/otn-pub/java/jdk/8u121-b13/e9e7ea248e2c4826b92b3f075a80e441/jdk-8u121-linux-x64.tar.gz && \
  tar zxf /tmp/jdk.tgz -C /opt && \
  update-alternatives --install /usr/bin/java java /opt/jdk1.8.0_121/bin/java 100 && \
  update-alternatives --install /usr/bin/javac javac /opt/jdk1.8.0_121/bin/javac 100

# cleanup
RUN rm -rf /var/lib/apt/lists/*

# install
RUN yarn

EXPOSE 8000 8080
