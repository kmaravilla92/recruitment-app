export function toSnakeCase(str) {
    return str.replace(/[^A-Za-z0-9]+/g, ' ').toLowerCase().trim().replaceAll(' ', '_')
}

export function labelsToFieldConfig(labels) {
    return labels.map(labelEntry => {
        let key = ''
        let label = ''
        let inputType = ''
        if (typeof labelEntry == 'object') {
            label = labelEntry?.label || ''
            key = labelEntry?.key || toSnakeCase(label)
            inputType = labelEntry?.inputType || 'text'
        } else {
            key = toSnakeCase(labelEntry)
            label = labelEntry
            inputType = 'text'
        }

        return {
            key,
            label,
            inputType
        }
    })
}

export function fieldsToFormObject(fields) {
    return fields.reduce((fields, field) => {
        fields[field.key] = ''
        return fields
    }, {})
}