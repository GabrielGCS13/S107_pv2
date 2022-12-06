# Environment Variables

We have a [.env-example](./../.env.example), that you can use to configure your local environment. Just make a copy and rename it to `.env`

```bash
cp .env.example .env
```

## Our variables are splitted into some types

The config file is available [here](./../src/infra/config/index.ts)


`app`: Includes general variables about our service, like the port that is running, the environment, etc.