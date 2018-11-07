var expect = require('expect');
var {generateMessage} =require('./message');

describe('Testing generateMessage',()=>{

    it('should generate correct message obj',()=>{
          var from = "EN";
          var text = "Some data";
          var message = generateMessage(from, text);
          console.log(message);

          expect(typeof message.createdAt).toBe('number');
          expect(typeof message).toBe('object');
          expect(message).toMatchObject({from, text});
    });
});
