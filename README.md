# Bizzabo Events Calendar (Interview Assignment)

This project was an assignment for an interview with [Bizzabo](http://bizzabo.com/). It's a Calendar application that utilizies Bizzabo's event API to fetch and populate events within the calendar. It is built with the following technologies:

- [React.js](https://reactjs.org/)
- [React Big Calendar](https://github.com/jquense/react-big-calendar)
- [Axios](https://www.npmjs.com/package/react-axios)
- [Moment.js](https://momentjs.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)

## To Launch This Project Locally, Follow These Steps:

Clone and install:

```
git clone https://github.com/tuckermullen/bizzabo-interview-calendar
cd bizzabo-interview-calendar
npm i
```

Start your development server:

```
npm start
```

The app should open in a browser automatically. If it doesn't, visit [http://localhost:3000](http://localhost.com:3000).

## Event Data Troubleshooting:

If you do not see any events populating on the calendar, it's most likely caused by a CORS issue. There is code included in this project to proxy around that issue but occasionally, the Heroku proxy server that I set up goes down, preventing the data from populating as the API is blocking access. If you run into this issue, follow the steps below:

- Open the project in your text editor
- Open `src/App.jsx`
- On line #69, you'll see this line of code: `const proxyURL = 'https://sleepy-refuge-91522.herokuapp.com/'`
- Change the `proxyURL` line of code to look like this: `const proxyURL = 'https://https://cors-anywhere.herokuapp.com/'`
- Stop your local server and restart it again: `npm start`

This is simply just switching out the proxy URL to a different one to get around the CORS issue when the proxy URL rarely goes down.

If you run into any other issues, you can email me directly at [mullentucker@gmail.com](mailto:mullentucker@gmail.com).

```

```
