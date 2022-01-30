const statuses = (status) => {
    switch (status) {
        case 'TO_BE_EXAMINED':
            return 'Wartet auf Untersuchung'
        case 'CONTACT_OWNER':
            return 'Besitzer kontaktieren'
        case 'TO_BE_ADOPTED':
            return 'Zur Adoption'
        case 'TO_BE_EUTHANISED':
            return 'Wird eingeschläfert'
        case 'PICKED_UP':
            return 'Abgeholt'
        case 'TO_BE_PICKED_UP':
            return 'Wird abgeholt'
        case 'ADOPTED':
            return 'Adoptiert'
        case 'EUTHANISED':
            return 'Eingeschläfert'
        default:
            return ''
    }
};

export default statuses;