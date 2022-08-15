# App Platform - SIGTERM cleanup example

This is a sample app that demonstrates on how to gracefully handle app shutdowns and run _small_ amounts of cleanup code.

# Usage

1. Fork this repository
2. Deploy to App Platform
3. Open the app, you should see "connection opened" and then "connection healthy" every 3 seconds
4. In a separate browser window, trigger an App Platform deploy for your app
5. In the original window note the message saying the SIGTERM was caught and handled


# Note: this example doesn't work on Kubernetes (App Platform) because the user traffic is diverted to the new instance before the sigterm is triggered.
