const statuses = (status) => {
    switch (status) {
        case 'TO_BE_EXAMINED':
            return 'Wartet auf Untersuchung'
            break;
        case 'CONTACT_OWNER':
            return 'Wird abgeholt'
            break;
        case 'TO_BE_ADOPTED':
            return 'Zur Adoption'
            break;
        case 'TO_BE_EUTHANISED':
            return 'Wird eingeschläfert'
            break;
        case 'PICKED_UP':
            return 'Abgeholt'
            break;
        case 'ADOPTED':
            return 'Adoptiert'
            break;
        case 'EUTHANISED':
            return 'Eingeschläfert'
            break;
        default:
            return ''
            break;
    }
};

export default statuses;