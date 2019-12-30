# builder stage
FROM node:10-alpine as builder
WORKDIR /opt/builder

# setting default NPM registry if provided
ARG NPM_REGISTRY=""
RUN if [ -n "${NPM_REGISTRY}" ]; then yarn config set registry "${NPM_REGISTRY}"; fi

# copying only files required for yarn install to better utilize cache
# unfortunatelly we cannot copy all packages/*/package.json files with glob,
# but copying only global package.json and yarn.lock will handle at least common dependencies
COPY package.json yarn.lock ./
RUN yarn --ignore-scripts

# copying all files
# we must run yarn install once again, but now it should be much faster
COPY . .
RUN yarn --frozen-lockfile && yarn build:storybook

# final stage
FROM nginx:alpine as storybook
COPY --from=builder /opt/builder/storybook-static /usr/share/nginx/html

# Build arguments for metadata
ARG NAME=unknown
ARG VERSION=0.0.0
ARG GIT_REPO=unknown
ARG GIT_COMMIT=unknown
ARG BUILD_DATE=unknown

# Metadata
LABEL maintainer="relayr." \
      org.label-schema.vendor="relayr." \
      org.label-schema.url="https://relayr.io" \
      org.label-schema.name=$NAME \
      org.label-schema.version=$VERSION \
      org.label-schema.vcs-url=$GIT_REPO \
      org.label-schema.vcs-ref=$GIT_COMMIT \
      org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.docker.schema-version="1.0" \
      org.label-schema.license="Commercial"
