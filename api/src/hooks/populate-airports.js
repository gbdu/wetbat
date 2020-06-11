module.exports = (options = {}) => {
  return async context => {
    const { app, method, result, params } = context;
    
    // Function that adds the airports to a single quotes object
    const addAirports = async quote => {
      const [departure] = await app.service('airports').find({
        query: {
          code: quote.departure,
        }});
      const [destination] = await app.service('airports').find({
        query: {
          code: quote.destination,
        }});
      
      return {
        ...quote,
        departure,
        destination
      };
    };

    if(method === 'find'){
      context.result.data = await Promise.all(result.data.map(addAirports));
    }
    else{
      context.result = await addAirports(result); 
    }
    return context;
  };
};
