# realworld-docker

Email sending can be tested with ```curl```.

In production environment:

```
curl -X POST http://realworld-docker.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to": "someone@example.com", "subject": "Test email", "text": "Hello from Node.js!"}'
```

In development environment:

```
curl -X POST http://realworld-docker.local/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to": "someone@example.com", "subject": "Test email", "text": "Hello from Node.js!"}'
```

