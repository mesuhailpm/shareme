on client.js useCdn set to false as fetch() was returning old data.

it's taking a little more time might be better to use true and update front end even before fetching the data from backend.
for example( changing the `savingPost` to false inside .then() function)