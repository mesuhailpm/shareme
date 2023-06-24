import {createClient} from '@sanity/client'

import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID ,// add project id form sanity manage using env
    dataset:'production',
    apiVersion:'2021-11-16',
    useCdn: false, // made this edit because fetch() was returning old data
    token: process.env.REACT_APP_SANITY_TOKEN //token from sanity using env
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
