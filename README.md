# pow_index
Guide you from other ports to any of your `pow.io` projects

# Senarios

As a user of [pow.cx](//pow.cx), you might be already comfortable to use `project_name.dev` to do the development. But there are some occassions links are still be generated on `http://localhost:3000`, e.g. in the emails where complete host name and port configuration are not known by the application. So you might want to start this little server to intercept all incoming request on port 3000 to display links to all your possible `.pow` config.

# Usage

```
npm install pow_index -g
PORT=3000 pow_index
```

![image](https://cloud.githubusercontent.com/assets/1559832/14971918/13637176-112b-11e6-83c5-9190952d2c8a.png)
