export function toSnakeCase(str) {
    return str.replace(/[^A-Za-z0-9]+/g, ' ').toLowerCase().trim().replaceAll(' ', '_')
}

export function labelsToFieldConfig(labels) {
    return labels.map(labelEntry => {
        let key = ''
        let label = ''
        let inputType = 'text'
        let selectOptions = []
        let allowNA = false
        if (typeof labelEntry == 'object') {
            label = labelEntry?.label || ''
            key = labelEntry?.key || toSnakeCase(label)
            inputType = labelEntry?.inputType || inputType
            selectOptions = labelEntry?.selectOptions || selectOptions
            allowNA = labelEntry?.allowNA || allowNA
        } else {
            key = toSnakeCase(labelEntry)
            label = labelEntry
        }

        return {
            key,
            label,
            inputType,
            selectOptions,
            allowNA,
        }
    })
}

export function fieldsToFormObject(fields) {
    return fields.reduce((fields, field) => {
        fields[field.key] = ''
        return fields
    }, {})
}