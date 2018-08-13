# Readme

To run both the Sails server and Angular frontend, you can run `node run.js`.
The server looks for a `mongodb` connection running at `mongodb://root@localhost/veryconnect-test`.

To run tests for the Angular frontend, you can run `npx ng test` inside the `frontend` folder.

The Sails codebase makes use of their `blueprint` feature, as it does
everything needed for this test.

The Angular codebase makes extensive use of Typescript's static typing
(although it doesn't do anything advanced or complicated,
such as sum types or generics),
and RXJS Observables,
which makes the code easier to follow and allows easier separation of concerns.

# Task Description

The aim of the task is to create a simple single-page application allowing users to create a message timeline where
users post and reply to messages.
The frontend part should be developed using AngularJS 1.5+ and Twitter Bootstrap,
the backend using Sails node.js framework and a MongoDB database.
The backend should be kept as simple as possible to provide the necessary functions but more complex functions
such as user authentications, sessions and anything unrelated to the task should be omitted.

The application should show a list (timeline) of messages and provide users' the ability to add new messages to
the timeline or comment on existing messages.
The form should be kept simple, allowing users to post new messages with a user name and simple text message.
Each message in the timeline should display who wrote the message, when the message was sent and the content of the message itself.

Technology requirements:
* Angular 6.x.x
* Bootstrap 4.x.x
* Sails 1.x.x

Assessment:
* Overall quality of the code (style, comments, ...)
* Design of the REST API
* Use of Angular best practices (components, directives, filters, controllerAs, form validation)
