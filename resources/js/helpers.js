export function toSnakeCase(str) {
    return str.replace(/[^A-Za-z0-9]+/g, ' ').toLowerCase().trim().replaceAll(' ', '_');
}

export function labelsToFieldConfig(labels) {
    return labels.map(labelEntry => {
        let key = '';
        let label = '';
        if (typeof labelEntry == 'object') {
            key = labelEntry.key;
            label = labelEntry.label;
        } else {
            key = toSnakeCase(labelEntry);
            label = labelEntry;
        }

        return {
            key,
            label,
        };
    });
}

export function fieldsToFormObject(fields) {
    return fields.reduce((fields, field) => {
        fields[field.key] = '';
        return fields;
    }, {});
}