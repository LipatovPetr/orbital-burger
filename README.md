# Orbital Burger App

## Description

A web application for a burger restaurant, built with React, TypeScript, Redux, React Router, WebSocket, and React DND (Drag and Drop).

## Tech Stack

- React
- TypeScript
- Redux
- React Router
- WebSocket
- React DND (Drag and Drop)

## Features

- Only the desktop version is available.
- React DND: Users can build their burgers by dragging and dropping ingredients from the menu.
- WebSocket: Users can track the status of their order on the orders page.
- Authentication:
  + Users have to register to place an order.
  + After logging in, accessToken and refreshToken are saved in local storage.
  + When the app reloads, it checks for the accessToken in local storage and automatically logs the user in if found.

[Link to the application](https://react-burger-git-main-lipatovpetr.vercel.app/)
