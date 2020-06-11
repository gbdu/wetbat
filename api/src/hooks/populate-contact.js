module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context;
    
    // Function that adds the user to a single quotes object
    const addContact = async quote => {
      // Get the contact based on their id, pass the `params` along so
      // that we get a safe version of the user data
      const contact = await app.service('contacts').get(quote.contactId, params);

      // Merge the quote content to include the `contact` object
      return {
        ...quote,
        contact
      };
    };

    // In a find method we need to process the entire page
    if (method === 'find') {
      // Map all data to include the `user` information
      context.result.data = await Promise.all(result.data.map(addContact));
    } else {
      // Otherwise just update the single result
      context.result = await addContact(result);
    }

    return context;
  };
};

