# **Nxt Watch**

[https://prakashntwatch.ccbp.tech/](https://prakashntwatch.ccbp.tech/)


##### Implemented Nxt Watch application which is a clone for YouTube where users can log in and can see a list of videos like Trending, Gaming, Saved videos, and also can search videos and view specific video details, and users can toggle the theme (Light/Dark).

##### ● Implemented Different pages like Login, Home, Trending, Gaming, Saved videos using React components, props, state, lists, event handlers, form inputs.
![Home](https://res.cloudinary.com/dp8ggbibl/image/upload/v1678965425/dibuy/Home_lcbwnt.png)


##### ● Authenticating by taking username, password and doing login post HTTP API Call.
##### ● Persisted user login state by keeping jwt token in local storage, Sending it in headers of further API calls to authorize the user.
![Login](https://res.cloudinary.com/dp8ggbibl/image/upload/v1678965401/dibuy/nxtWatchLogin_ugivem.png)



● Implemented different routes for Login, Home, Trending, Gaming, Saved videos, Video item details pages by using React Router components Route, Switch, Link.


![Trending](https://res.cloudinary.com/dp8ggbibl/image/upload/v1678965410/dibuy/trendingPage_stzoze.png)

![Gaming](https://res.cloudinary.com/dp8ggbibl/image/upload/v1678965418/dibuy/gaminingPage_jj7wk7.png)

![SavedVideos](https://res.cloudinary.com/dp8ggbibl/image/upload/v1678965409/dibuy/savedVideosPage_xrlups.png)

● Redirecting to the login page if the user tries to open Home, Trending, Gaming, Saved videos, Video item details routes which need authentication by implementing protected Route.
