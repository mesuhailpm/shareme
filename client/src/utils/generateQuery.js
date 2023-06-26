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


// export const feedQuery = `*[_type =='pin']{
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
//     }
//     ,save[]{
//         _id,
//         postedBy->{
//             _id,
//             userName,
//             image

//         }

//     }

// }`

export const feedQuery = `*[_type =='pin'] | order(_createdAt desc){
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
    },
    save[]{
        userId,
        postedBy->{
          _id,
          userName,
          image
        }
    }


}`

export const searchQuery = (keyword) => {
    const query = `*[_type =='pin' &&  title match '${keyword}' || category match '${keyword}' || about match '${keyword}']{
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
    console.log(query,' is query copy this to test on Sanity')
        return query
    }

    export const singlePinQuery = (pinId) => {
        console.log(pinId)
        const query = `*[_type =='pin' && _id == '${pinId}']{
            image{
                asset-> {
                    url
                }
            },
            _id,
            title,
            about,
            category,
            destination,
            postedBy -> {
                _id,
                userName,
                image
            },
            save[]{
                userId,
                postedBy->{
                    _id,
                    userName,
                    image
            }
        },
        comments[]{
            comment,
            _key,
            postedBy->{
            _id,
            userName,
            image
            }
        }
    }`
        return query
    }

    export const morePinsQuery = (pin) =>{
        const query = `*[_type == 'pin' && category == '${pin.category}' && _id != '${pin._id}' ]{
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
            },
            save[]{
                userId,
                postedBy->{
                  _id,
                  userName,
                  image
                }
            }
        }`

        return query
    }
