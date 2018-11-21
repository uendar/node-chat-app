var expect = require('expect');
var {generateMessage, generateLocationMessage} =require('./message');

describe('Testing generateMessage',()=>{

    it('should generate correct message obj',()=>{
          var from = "EN";
          var text = "Some data";
          var message = generateMessage(from, text);
          expect(typeof message.createdAt).toBe('number');
          expect(typeof message).toBe('object');
          expect(message).toMatchObject({from, text});
    });
});




describe('Testing generateLocationMessage', ()=>{
    it('should correctly generate location message',()=>{
        var from = "EN";
        var longtitud =14.115546;
        var latitud =19.332564;
        var url =`https://www.google.com/maps?q=${14.115546},${19.332564}`;
        var message = generateLocationMessage(from,longtitud,latitud);
        expect(typeof message.createdAt).toBe('number');
        expect(typeof message).toBe('object');
        expect(message).toMatchObject({from, url});

    });
});