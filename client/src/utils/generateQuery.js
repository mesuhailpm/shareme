export const userQuery = (userId) => {
    const query = `*[_type =='user' && _id == '${userId}']`
    return query
}
// export const feedQuery = `*[_type == 'pin']{
//     image {
//         asset-> {
//             url
//         }
//     },
//     _id,
//     destination,
//     postedBy -> {
//         _id,
//         userName,
//         image
//     },
//     'save': save[]._userId


// }`
export const feedQuery = `*[_type =='pin']{
    image {
        asset-> {
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    }
    ,save[]{
        _id,
        postedBy->{
            _id,
            userName,
            image

        }
        
    }

}`
export const searchQuery = (keyword) => {
    const query = `*[_type =='pin' &&  title match '${keyword}' && category match '${keyword}' && about match '${keyword}']{
        image {
            asset-> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        }
        ,
        'save': save[]._userId
            

    }
    `
        return query
    }

