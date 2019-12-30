# ui-elements-core

## Add to project

via npm:

```bash
npm install --save @relayr/ui-elements-core
```

or Yarn:
```bash
yarn add @relayr/ui-elements-core
```

## Utils

### withUncontrolledValue (HOC)

Allows to wrap controlled (stateless) component exposing `value` into uncontrolled (stateful) component,
storing value in state.
Component props must be compatible with:
```typescript
type InputProps<TValue> = {
  value?: TValue,
  onValueChange?(value: TValue, ...args: unknown[]): void;
};
```

#### Example
```tsx
type ControlledComponentProps = {
  value: string;
  onValueChange(newValue: string, e: React.SyntheticEvent): void;
}
const ControlledComponent = (props: ControlledComponentProps) => {
  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.onValueChange && props.onValueChange(value, e);
  }
  return (
    <input value={props.value} onChange={handleChange}/>
  );
};

const UncontrolledComponent = withUncontrolledValue()(ControlledComponent);
```
