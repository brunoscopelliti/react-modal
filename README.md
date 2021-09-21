# react-modal

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/brunoscopelliti/react-modal/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@bscop/react-modal.svg?style=flat)](https://www.npmjs.com/package/@bscop/react-modal)
[![CircleCI Status](https://circleci.com/gh/brunoscopelliti/react-modal.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/brunoscopelliti/react-modal)
[![Coverage](https://img.shields.io/codecov/c/github/brunoscopelliti/react-modal)](https://app.codecov.io/gh/brunoscopelliti/react-modal/)

Accessible modal (in React).

[View in Storybook](https://brunoscopelliti.github.io/react-modal).

## Install

```
npm i @bscop/react-modal
```

## Usage

```js
import Modal from "@bscop/react-modal";

function App () {
  return (
    <Modal 
      renderContent={
        () => {
          return (
            <div>
              <p>This is the content of the modal ...</p>
            </div>
          );
        }
      }
      renderHook={
        (props) => {
          return (
            <button type="button" {...props}>Show modal</button>
          );
        }
      }
      rootId="modal-root"
      title="About"
    />
  );
}
```

### CSS Custom properties

You can set the following CSS Custom properties to customize the look of the dropdown component:

```css
:root {
  --main-color: black;
  --main-bg-color: white;

  --modal-backdrop-bg-color: rgba(0, 0, 0, .2);
  --modal-border-color: rgba(0, 0, 0, .2);
  --modal-internal-border-color: #dee2e6;
}
```

## Contribute

Read the [guidelines](./CONTRIBUTING.md).

### Run tests

```
npm test
```

### Coverage

Coverage reports are hosted on [codecov](https://codecov.io/).

```
npm run badge:coverage -- --token=<guid>
```

---

Bruno Scopelliti\
www.brunoscopelliti.com
