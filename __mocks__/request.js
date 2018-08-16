// __mocks__/request.js
const places= [
  {"title":"Garden District","coord":"Point(-90.0847 29.9278)","dist":"0.118"},
  {"title":"Washington Theatre","coord":"Point(-90.082542 29.9263218)","dist":"0.318"},
  {"title":"Christ Church Cathedral","coord":"Point(-90.0878 29.9303)","dist":"0.384"},
  {"title":"George Washington Cable House","coord":"Point(-90.087167 29.926353)","dist":"0.392"},
  {"title":"Protestant Home for Babies","coord":"Point(-90.0862 29.9257)","dist":"0.392"},
  {"title":"McGehee School","coord":"Point(-90.08179444 29.93203611)","dist":"0.431"},
  {"title":"Touro Infirmary Foundation","coord":"Point(-90.088866 29.925778)","dist":"0.558"},
  {"title":"Q49505355","coord":"Point(-90.08063 29.92382)","dist":"0.651"},
  {"title":"Anshe Sfard","coord":"Point(-90.08184 29.93432)","dist":"0.657"},
  {"title":"Irish Channel","coord":"Point(-90.0819 29.9231)","dist":"0.67"}]
  
  export default function request(url) {
    return new Promise((resolve, reject) => {
      const userID = parseInt(url.substr('/users/'.length), 10);
      process.nextTick(
        () =>
          users[userID]
            ? resolve(users[userID])
            : reject({
                error: 'User with ' + userID + ' not found.',
              }),
      );
    });
  }