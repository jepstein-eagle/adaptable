# Intro

The form layout has the concept of columns, which should be specified as the `columns` prop, which should be an array.
If you don't specify the prop, it defaults to `['label','children']`

For each row, you need to render a form row


```
import FormLayout, { FormRow } from ...

<FormLayout>
  <FormRow label="First Name">
    <input name="firstName" />
  </FormRow>

  <FormRow label="Last Name">
    <input name="lastName" />
  </FormRow>
</FormLayout>
```

So props in the FormRow correspond to the name of each column. So the above could be rewritten as


```
import FormLayout, { FormRow } from ...

<FormLayout columns={['label', 'children']}>
  <FormRow label="First Name" children={<input name="firstName" />} />
  <FormRow label="Last Name" children={<input name="lastName" />} />
</FormLayout>
```

or as

```
import FormLayout, { FormRow } from ...

<FormLayout columns={['first', 'second']}>
  <FormRow first="First Name" second={<input name="firstName" />} />
  <FormRow first="Last Name" second={<input name="lastName" />} />
</FormLayout>
```

Additionally, we can also use the children & the children order to be more succint about which components go in which cells, and assume children[0] goes into first col, children[1] goes into second, and so on (this can be disabled by specifying `childrenToColumns=false` on the FormLayout). So the above can become

```
import FormLayout, { FormRow } from ...

<FormLayout columns={[1,2]}>
  <FormRow>
    {"First Name"}
    <input name="firstName" />
  </FormRow>

  <FormRow>
    {"Last Name"}
    <input name="lastName" />
  </FormRow>
</FormLayout>
```
in which case, column names don't even matter. However, if the column name is found as a prop on the FormRow, that has precedence:

```
import FormLayout, { FormRow } from ...

<FormLayout columns={[1,'two']}>
  <FormRow two={<input name="firstName" />}>
    {"First Name"}
  </FormRow>

  <FormRow>
    {"Last Name"}
    <input name="lastName" />
  </FormRow>
</FormLayout>
```