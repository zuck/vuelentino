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

| Name | Description |
| ---- | ----------- |

{{#methods}}
| `{{name}}` | {{description}} |
{{/methods}}
