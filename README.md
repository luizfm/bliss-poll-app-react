# bliss-poll-app-react
Application developed using ReactJS for the position of Web Frontend Developer.

![image](https://user-images.githubusercontent.com/45155140/167242415-75b19cbd-56af-4b45-ade2-fd0baea39083.png)


## About the project main stuff version and requirements:

Node version: 16.13.0
React: 17.0.2
Webpack: 5.61.0

## How to run the project

Open the main folder and run `yarn` or `npm install` to install the project dependencies. 

Once it finishes, create an `.env` file into your project and place the env variables there like below example:

```
API_URL=https://private-bbbe9-blissrecruitmentapi.apiary-mock.com
APPLICATION_URL=http://localhost:3000
```

Now you can run `yarn start` or `npm start`.
The project will be running on your http://localhost:3000 port. 
We will also receive a message from webpack showing what ip can be used to access it from another devices.


![Screen Shot 2022-05-07 at 3 53 27 AM](https://user-images.githubusercontent.com/45155140/167242656-f6df5eff-77a3-41b8-b6aa-dd5047faed1a.png)

## How to build the project

Open the main folder and run `yarn build`. Wait until your files are being compiled. Once it finishes, a `dist` folder will be showed on top. This
folder is the one that can be used to deploy the application to production using any service of your wish.

## Project architecture and Folder structures

On this project the SoC (Separation of Concerns) was used to structure the folders and files, 
in order to keep the code easy to read and maintain in the future.

```
.
└── src/
    ├── assets/
    │   ├── images
    │   ├── icons
    │   └── lotties
    ├── components
    ├── config
    ├── hooks
    ├── modules
    ├── routes
    ├── services
    ├── store
    ├── styles
    ├── utils
    └── views
```

## Modules

The main modules of the project are the questions list and the question details.

### Questions List

On questions list the user can see 10 question cards rendered. Once he reaches the end of the list / page, the waypoint will trigger a function
to get more 10 question cards and render them as well. Since the API was not returning more than 10 cards, we are just dispatching the action
and returning the same list of cards there.
<img width="1231" alt="Screen Shot 2022-05-07 at 4 27 02 AM" src="https://user-images.githubusercontent.com/45155140/167243773-06f270d4-9c85-4776-a9de-f5600a52de81.png">

The user can search for an specific card and that will be debounced dispatched to BE, in order to avoid unnecessary BE calls while the user doesn't
finish type in the search. Once he gets the results, a share button will be showed on the right side, which when clicked will open a modal / dialog
containing the search information and an input to inform an email. The button to share the information will only be available once an email is informed
<img width="1220" alt="Screen Shot 2022-05-07 at 4 27 25 AM" src="https://user-images.githubusercontent.com/45155140/167243789-0fa6c357-29b5-4581-aa9f-77115b8d09df.png">
<img width="1280" alt="Screen Shot 2022-05-07 at 4 28 33 AM" src="https://user-images.githubusercontent.com/45155140/167243834-a0720234-ce4c-4ed1-a1f3-5f7f711786b2.png">

If the user opens url already containing a filter paramenter, the search input will be automatically filled and focused. If there is no value for the
filter query param, the input will be only focused.

Clicking on any of those cards, will navigate the user to Question Details screen. The view is whole responsive.

### Question Details

Question details view contains the information about the clicked card. The user will be able to see the question title, when it was published, and the
choices to vote on. Every time the user votes on one of the available choices, he will dispatch an action to BE, passing the updated information.
The user also can share this view with another user by using the share button on the left side.
<img width="1187" alt="Screen Shot 2022-05-07 at 4 30 03 AM" src="https://user-images.githubusercontent.com/45155140/167243897-6fdd3611-35b2-4733-9cb1-29cb2a5935ff.png">
<img width="1165" alt="Screen Shot 2022-05-07 at 4 30 28 AM" src="https://user-images.githubusercontent.com/45155140/167243905-8b1f0ae7-53cb-4ff8-80aa-37d41bcbb4cb.png">

If necessary, he can navigate back to questions list using the top left arrow back button.

This view is also fully responsive.

## Special details

### Error

If the server status returned from health endpoint is `Not Ok` the user will receive a feedback on the page and will have an option to retry check
the server health. Once it updates to `Ok` he will be redirected to Questions list.
<img width="1274" alt="Screen Shot 2022-05-07 at 4 31 35 AM" src="https://user-images.githubusercontent.com/45155140/167243938-bb52863b-d9d2-4726-a640-9da628861e3f.png">

### No conectivity

In case that the user's internet is unstable and he loses connection, an offline screen will be showed. Once he gets back online, he will be redirected
to the last page he was before lose connection.
<img width="1351" alt="Screen Shot 2022-05-07 at 4 32 33 AM" src="https://user-images.githubusercontent.com/45155140/167243977-75a8d84c-c319-4c44-81e0-ea3fe12d4c48.png">


---

Any feedbacks or questions, few free to contact me directly by email. Thanks for the opportunity of show my skills and also improve them while working on
this project.

Email: luiz.ado@hotmail.com
