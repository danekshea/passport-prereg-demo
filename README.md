# Immutable Passport Preregistration Demo 

An example of a pre-registration app leveraging Immutable Passport. The exact same stack that Shardbound and Guild of Guardians use for their pre-registration campaigns. The user authenticates and is loaded into a mailchimp audience. The app is built to be deployed with Vercel using serverless functions.

## Setup & Installation

1. Clone the repository:
```
git clone https://github.com/danekshea/passport-prereg-demo.git
```

2. Navigate into the cloned repository:
```
cd passport-prereg-demo
```

3. Install dependencies:
```
npm install
```

## Environment Variables

Make a copy of the `.env.example` file and rename it to `.env`. You'll see something like this:

```
VITE_PASSPORT_CLIENT_ID=
VITE_PASSPORT_REDIRECT_URL=
VITE_PASSPORT_LOGOUT_URL=
VITE_API_REGISTER_URL=
MAILCHIMP_API_KEY=
MAILCHIMP_SERVER_PREFIX=
MAILCHIMP_AUDIENCE_ID=
```

Replace the placeholders with the actual values:

- `VITE_PASSPORT_CLIENT_ID` is your Immutable Passport client ID. This can be obtained from the [Immutable Hub](https://hub.immutable.com/) by going through the signup flow.
- `VITE_PASSPORT_REDIRECT_URL` is your application's redirect URL. This should be the route that the user will be redirected to after successful login and is set in the Immutable Hub as well.
- `VITE_PASSPORT_LOGOUT_URL` is your application's logout URL. This is also set in the Immutable Hub.
- `VITE_API_REGISTER_URL` is the URL where you want to send your user's data upon successful authentication. This should point to the backend/serverless function that registers the user into Mailchimp.
- `MAILCHIMP_API_KEY` is your Mailchimp API key. This can be obtained from your Mailchimp account under Account -> Extras -> API keys.
- `MAILCHIMP_SERVER_PREFIX` is the server prefix associated with your Mailchimp account. This is the part of your Mailchimp API key after the dash (-).
- `MAILCHIMP_AUDIENCE_ID` is your Mailchimp audience ID. This can be obtained from your Mailchimp account under Audience -> Manage Audience -> Settings -> Audience name and defaults. The Audience ID is listed under the 'Audience ID' section.

In the Vercel dashboard, navigate to your project settings and go to the "Environment Variables" section. Add the following variables:

- Name: `VITE_PASSPORT_CLIENT_ID`
- Value: `<client_id>`

- Name: `VITE_PASSPORT_REDIRECT_URL`
- Value: `<redirect_url>`

- Name: `VITE_PASSPORT_LOGOUT_URL`
- Value: `<logout_url>`

- Name: `VITE_API_REGISTER_URL`
- Value: `<register_url>`

- Name: `MAILCHIMP_API_KEY`
- Value: `<mailchimp_api_key>`

- Name: `MAILCHIMP_SERVER_PREFIX`
- Value: `<mailchimp_server_prefix>`

- Name: `MAILCHIMP_AUDIENCE_ID`
- Value: `<mailchimp_audience_id>`

Ensure the "Environment" is set to "Production" if this is not a test deployment.

## Running Locally

After setting up your environment variables, you can start the project locally using Vercel:

```
vercel dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deploying to Vercel

1. Commit and push your local changes to your GitHub repository.

2. Login to your Vercel account and click on the "Import Project" button.

3. Choose "Import Git Repository".

4. Provide the link to your GitHub repo and click "Continue".

5. In the configuration page, make sure the project name, root directory, and other build settings are correct, then click "Deploy".

Vercel will then build and deploy your application. 

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Tech Stack

- [Svelte](https://svelte.dev/)
- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
- [Passport](https://www.immutable.com/products/passport)
- [Mailchimp](https://mailchimp.com/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
