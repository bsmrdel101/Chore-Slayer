const hand = (state = [{id: 1, name: 'shield', type: 'block', token: 'https://media.istockphoto.com/photos/wooden-medieval-shield-viking-shield-painted-red-and-white-picture-id1180956047', description: 'This card is capable of adding 3 shield to your shield modifier. Can also do other things that are cool too!', cost: 1, block_amount: 3}, {id: 2, name: 'shield', type: 'block', token: 'https://media.istockphoto.com/photos/wooden-medieval-shield-viking-shield-painted-red-and-white-picture-id1180956047', description: 'This card is capable of adding 3 shield to your shield modifier. Can also do other things that are cool too!', cost: 1, block_amount: 3}, {id: 3, name: 'shield', type: 'block', token: 'https://media.istockphoto.com/photos/wooden-medieval-shield-viking-shield-painted-red-and-white-picture-id1180956047', description: 'This card is capable of adding 3 shield to your shield modifier. Can also do other things that are cool too!', cost: 1, block_amount: 3}, {id: 4, name: 'shield', type: 'block', token: 'https://media.istockphoto.com/photos/wooden-medieval-shield-viking-shield-painted-red-and-white-picture-id1180956047', description: 'This card is capable of adding 3 shield to your shield modifier. Can also do other things that are cool too!', cost: 1, block_amount: 3}, {id: 5, name: 'shield', type: 'block', token: 'https://media.istockphoto.com/photos/wooden-medieval-shield-viking-shield-painted-red-and-white-picture-id1180956047', description: 'This card is capable of adding 3 shield to your shield modifier. Can also do other things that are cool too!', cost: 1, block_amount: 3}], action) => {
    switch (action.type) {
        case 'GET_CARDS':
            return action.payload;
        default:
            return state;
    }
  };

export default hand;
  