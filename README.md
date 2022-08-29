# ShortCut - Blazingly fast URL Shortener with great analytics built in

- Provides a great visual analytics of your short links.
- Fastest redirects to your original URL.
- No need to wait for the page to load.



[Insert app screenshots](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#uploading-assets)

# Overview video 

![Home Screen](https://i.imgur.com/V0wctEo.png)

![Analytics](https://i.imgur.com/ulqR4Hj.png)


Here's a short video that explains the project and how it uses Redis:

https://youtu.be/FvetxMf6msY

[![Tada](https://img.youtube.com/vi/FvetxMf6msY/0.jpg)](https://www.youtube.com/watch?v=FvetxMf6msY)

>How is it blazingly fast?

It gets the required information that is necessary for redirect directly from `redis`.
With the help of `redis-search` the time taken for retrieval is super fast. Along with this excellent retrieval time, I deployed `serverless` functions on the `edge` so the redirects are faster.
So as a combination of both redis and next js we were able to achieve it.

>Future scopes that will be added
On a higher level, these are the future scopes that are possible to add.

- Using `redis` for saving and fetching analytics.
- Ability to share links dashboard with others.
- Protected links, with passwords.
- Time based analytics, to know at what time the link was clicked the most.
- Developer API to create the links.
- Marketplace to add `widgets` to the application.
- More ways for user to sign in.
