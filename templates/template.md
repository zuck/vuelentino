# {{displayName}}

> {{description}}

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |

{{#props}}
| `{{name}}` | `{{type.name}}` | {{description}} | `{{^defaultValue.func}}{{{defaultValue.value}}}{{/defaultValue.func}}` |
{{/props}}

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |

{{#slots}}
| `{{name}}` | {{description}} | {{scoped}} |
{{/slots}}

## Events

| Name |
| ---- |

{{#events}}
| `{{name}}` |
{{/events}}

## Methods

{{#methods}}

### `{{name}}({{args}})`

{{description}}

#### Params

| Name | Type | Description |
| ---- | ---- | ----------- |

{{#params}}
| `{{name}}` | `{{type}}` | {{description}} |
{{/params}}

#### Returns

{{#returns}}
`{{type.name}}` {{description}}
{{/returns}}
{{/methods}}
