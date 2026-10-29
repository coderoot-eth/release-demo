# @coderoot-eth/release-demo

A tiny library, `hello(name)`, released through CodeRoot.

- `.github/workflows/release.yml`: a tag `v1.2.3` publishes the package from the `npm-publish`
  environment with npm trusted publishing and provenance, then submits it to CodeRoot, where a
  person approves it.
- `.github/workflows/deploy.yml`: deploys a version only when CodeRoot answers `verified` for the
  bytes npm serves.

```js
const { hello } = require('@coderoot-eth/release-demo');
hello('Ada'); // 'Hello, Ada!'
```

License: Apache-2.0.
