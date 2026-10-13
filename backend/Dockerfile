FROM node:24-alpine
WORKDIR /app
COPY --chown=node:node src ./src
USER node
ENV NODE_ENV=production PORT=7070 APP_DELAY=false APP_ERROR=false
EXPOSE 7070
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD node -e "fetch('http://127.0.0.1:7070/api/categories').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "src/index.mjs"]
