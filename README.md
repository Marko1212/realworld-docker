# realworld-docker

Email sending can be tested for example with : 

```
curl -X POST http://realworld-docker.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to": "someone@example.com", "subject": "Test email", "text": "Hello from Node.js!"}'
```

or

```
curl -X POST http://realworld-docker.local/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to": "someone@example.com", "subject": "Test email", "text": "Hello from Node.js!"}'
```

