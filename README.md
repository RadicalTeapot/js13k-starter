# Simple setup for JS13K using Typescript

Bare bones setup to start a [JS13K game](https://js13kgames.com/).

## Node scripts

- dev : Start dev server (using webpack-dev-server)
- build:dev : Build app to `public` folder (without optimizations)
- build:prod : Build app to `public` folder (with minimization and tree shaking)
- package: Build prod and pack `public/index.html` and `public/main.js` to a zip file, checking for the size to be below 13K

## Links

### Graphics

- [Kontra](https://straker.github.io/kontra/getting-started)
- [TinyCanvas](https://github.com/bitnenfer/tiny-canvas)

### Music

- [TinyMusic](https://github.com/kevincennis/TinyMusic)

### ECS

- [JS13K-ECS](https://github.com/kutuluk/js13k-ecs)

### Misc

- [Tutorial](https://www.barbarianmeetscoding.com/blog/2018/09/19/how-to-write-a-game-under-13k-while-taking-care-of-a-baby)
- [WebGL](https://xem.github.io/articles/webgl-guide.html)

## Notes

- module in `tsconfig.json` cannot be `commonjs` for tree-shaking to work
- The example app uses Kontra, TinyMusic and JS13K-ECS
- To have the chrome debugger work with the dev server in visual studio code add the following to the configurations in `launch.json`

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Launch Chrome",
  "url": "http://localhost:8080",
  "sourceMaps": true,
  "sourceMapPathOverrides": {
      "webpack:///./*": "${workspaceRoot}/*",
      "webpack:///src/*": "${workspaceRoot}/*",
  }
}
```

## To do

- Finish the types definitions for JS13K-ECS
- Add types definitions for TinyMusic and either Kontra or TinyCanvas (depending on the used one)
