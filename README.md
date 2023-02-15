# DAS FEST 2018 Crowd Heatmap

This is a front-end JavaScript application that uses the Leaflet library to display a heatmap layer of the crowd at DAS FEST 2018 over the corresponding map location. The app takes as input the coordinates of several RPis (located in the area) and uses the trilateration method to locate every user location using measures from these RPis.

## Requirements

To run this application, you will need:

* A modern web browser that supports ES6 JavaScript
* A server to host the application, for example the VS Code Live Server extension

## Usage

To get started with the application, open the `index.html` file in a web browser after hosting the application on a server. This will load the application and display the map.

Once the application is loaded, you should see a map of the DAS FEST 2018 location. The heatmap layer will not be displayed until the RPis are fetched and incoming data of detected devices starts to come through the Web socket connection.

The application heavily relies on two URLs to fetch the RPis and detected devices of the crowd. The RPis are loaded by making a GET request to the `http://62.217.127.19:8080/rpi` URL, while the detected devices are streamed through the WebSocket connection to the `ws://62.217.127.19:8080/stream` URL.

**Note: This project has no control over the functionality of the URLs used to fetch the RPis and detected devices of the crowd.**

The trilateration method is used to calculate the locations of the detected devices on the map, using the coordinates of the RPis that detected each device. The located devices are displayed on the map as points and the heatmap layer is updated accordingly.

**Note: The data coming from the WebSocket connection is a simulation of the real-time crowd movement and gathering on the day of the event of Das Fest 2018. The data is not a reflection of the current crowd density or location at the event.**
