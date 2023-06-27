export const userQuery = (userId) => {
    const query = `*[_type =='user' && _id == '${userId}']`
    return query
}

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
        return query
    }

export const singlePinQuery = (pinId) => {
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

export const userProfileQuery = (userId) => {
    const query = `*[_type == 'user' && _id == '${userId}']`
    return query
}
export const savedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId] | order(_createdAt desc){
        _id,
          
        image {
          asset->
            {url} 
        },
        userId,
        save[]{
            userId,
            postedBy->{
              _id,
              userName,
              image
            }
        },
        category,
        title
        
      
        
      }`

    return query

}
export const createdPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && userId == '${userId}'] | order(_createdAt desc)`

    return query
}
