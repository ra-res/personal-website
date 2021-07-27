## Hello

This is my not yet finished portfolio application.

## Tech Stack at the moment:

[React, TypeScript, Node.js, Scss]

## Work log

### Learned about TypeScript and how to use it within React.

TypeScript vs JavaScript

Pros:

- compiler catches errors
- smaller feedback loop
- makes refactoring easier
- autocompletion/autoimports

Cons

- Error messages
- Library support
- More time to learn

### Creating components

```typescript
interface IProps {
  text: string;
  ok: boolean;
  n?: number;
  fn?: (param: string) => number;
  obj?: {
    f1: string;
  };
  person: Person;
}
interface Person {
  firstName: string;
  lastName: string;
}

interface IState {
  name: string;
  email: string;
  message: string;
}

export default class ComponentExample extends React.Component<IProps, IState> {}
```

Props are properties that are being used to pass data from one component to another. e.g. when using <ComponentExample /> in <App>, I will have to pass the Props specified to avoid errors such as: <ComponentExample text="Text" ok="True" person={{firstName:"Jane", lastName:"Doe"}} />
Declaring Optional props using ? :

```typescript
interface Example {
  ok?: boolean;
}
```

### Hooks

```typescript

export default class ComponentExample extends React.Component<IProps, IState> {
    const [count, setCount] = useState<number | null >(5);
    setCount(5);
    const inputRef = useRef<HTMLInputElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={divRef}>
            <input ref={inputRef} />
        </div>
    )
}

```

Hooks allow us to use state and other features without writing a class.
In the example above, I am declaring count as a number or null variable, and setCount as a setter function to set the count variable to different values. In the next line of code, I am setting the count to 5. I can also use interfaces when declaring the type of useState<>.

## If you wish to run this locally:

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

```

```
